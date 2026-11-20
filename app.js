(function () {
  const root = document.getElementById("appRoot");
  const btnHome = document.getElementById("btnHome");
  const btnResetHome = document.getElementById("btnResetHome");
  const btnHistory = document.getElementById("btnHistory");
  const btnAdmin = document.getElementById("btnAdmin");
  const btnLogout = document.getElementById("btnLogout");
  const userSessionBadge = document.getElementById("userSessionBadge");

  const GRADES = {
    "BOD-3": window.DATA_BOD3,
    "BOD-4": window.DATA_BOD4,
    "BOD-5": window.DATA_BOD5
  };

  const UNIT_OPTIONS = [
    { value: "Umum (Generik PortrAI)", label: "Standar PortrAI — Perusahaan Fiktif (Non-Asuransi)" },
    { value: "Branch Manager", label: "Branch Manager" },
    { value: "Technical Head", label: "Technical Head (Underwriting & Klaim)" },
    { value: "Underwriting", label: "Underwriting" },
    { value: "Klaim", label: "Klaim" },
    { value: "Subrogasi", label: "Subrogasi" },
    { value: "Keuangan", label: "Keuangan" },
    { value: "Bisnis & Pemasaran", label: "Bisnis & Pemasaran" },
    { value: "Manajemen Risiko", label: "Manajemen Risiko" }
  ];

  function renderUnitOptions(selectedVal, includeAll = false) {
    const allOpt = includeAll
      ? `<option value="Semua" ${selectedVal === "Semua" ? "selected" : ""}>In General — Semua Bidang (Campuran)</option>`
      : "";
    const opts = UNIT_OPTIONS.map(
      (u) => `<option value="${u.value}" ${selectedVal === u.value ? "selected" : ""}>${u.label}</option>`
    ).join("");
    const tailAll = !includeAll
      ? `<option value="Semua" ${selectedVal === "Semua" ? "selected" : ""}>Semua Bidang / Umum</option>`
      : "";
    return allOpt + opts + tailAll;
  }

  function filterPoolByUnit(pool, unitFilter) {
    if (!unitFilter || unitFilter === "Semua") return pool;
    const u = unitFilter.toLowerCase();
    const filtered = pool.filter((s) => {
      if (Array.isArray(s.units)) {
        return s.units.some((tag) => tag.toLowerCase() === u);
      }
      return (s.unit || "").toLowerCase().includes(u);
    });
    return filtered.length > 0 ? filtered : pool;
  }

  function loadSession() {
    try {
      return JSON.parse(localStorage.getItem("askrindo_session_v1") || "null");
    } catch {
      return null;
    }
  }

  let state = {
    view: "home",
    currentUser: loadSession(),
    selectedGrade: "BOD-4",
    unitFilter: "Umum (Generik PortrAI)",
    examMode: "quick", // quick | full
    preAssessment: { personalityDone: false, capDone: false, focusArea: null },
    participantName: "",
    participantNip: "",
    supaConnected: false,
    supaMessage: "",
    fullFlow: false,
    flowQueue: [],
    flowResults: {},
    timerInterval: null,
    secondsLeft: 0
  };

  if (state.currentUser) {
    state.selectedGrade = state.currentUser.grade || "BOD-4";
    state.unitFilter = "Umum (Generik PortrAI)";
    state.participantName = state.currentUser.full_name || "";
    state.participantNip = state.currentUser.nip || "";
  }

  function updateTopbarSession() {
    const u = state.currentUser;
    if (u) {
      const isAdmin = u.role === "admin";
      userSessionBadge.style.display = "inline-block";
      userSessionBadge.textContent = isAdmin
        ? `${u.full_name} (ADMIN)`
        : `${u.full_name} (${u.role.toUpperCase()} • ${u.grade})`;
      btnHistory.style.display = isAdmin ? "none" : "inline-flex";
      btnResetHome.style.display = isAdmin ? "none" : "inline-flex";
      btnLogout.style.display = "inline-flex";
      btnAdmin.style.display = isAdmin ? "inline-flex" : "none";
    } else {
      userSessionBadge.style.display = "none";
      btnHistory.style.display = "none";
      btnResetHome.style.display = "none";
      btnLogout.style.display = "none";
      btnAdmin.style.display = "none";
    }
  }

  async function initSupabaseStatus() {
    const badge = document.getElementById("supaStatusBadge");
    if (!window.SupabaseService) return;
    const res = await window.SupabaseService.checkConnection();
    state.supaConnected = res.ok;
    state.supaMessage = res.reason || "";
    if (badge) {
      if (res.ok) {
        badge.textContent = "● Server: Terhubung";
        badge.style.background = "#dcfce7";
        badge.style.color = "#047857";
        badge.style.border = "1px solid #86efac";
      } else {
        badge.textContent = "● Mode: Lokal";
        badge.title = res.reason || "Server database belum siap";
        badge.style.background = "#fef3c7";
        badge.style.color = "#b45309";
        badge.style.border = "1px solid #fcd34d";
      }
    }
  }

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function cleanupAllSessions() {
    clearTimer();
    if (typeof window.cleanupPortraiEngine === "function") {
      window.cleanupPortraiEngine();
    }
    if (typeof window.cleanupPreAssessmentCam === "function") {
      window.cleanupPreAssessmentCam();
    }
  }

  function startTimer(seconds, elId, onExpire) {
    clearTimer();
    state.secondsLeft = seconds;
    const update = () => {
      const el = document.getElementById(elId);
      if (!el) return;
      const m = Math.floor(state.secondsLeft / 60);
      const s = state.secondsLeft % 60;
      el.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      if (state.secondsLeft <= 60) el.classList.add("danger");
      else el.classList.remove("danger");
    };
    update();
    state.timerInterval = setInterval(() => {
      state.secondsLeft--;
      update();
      if (state.secondsLeft <= 0) {
        clearTimer();
        if (onExpire) onExpire();
      }
    }, 1000);
  }

  function saveHistory(entry) {
    const key = "askrindo_sim_history_v2";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.unshift(entry);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
  }

  function getHistory() {
    return JSON.parse(localStorage.getItem("askrindo_sim_history_v2") || "[]");
  }

  // ======================== LOGIN & REGISTER ========================
  function renderLogin() {
    cleanupAllSessions();
    updateTopbarSession();
    let mode = "login"; // login | register
    let msg = "";

    function draw() {
      root.innerHTML = `
        <div class="login-showcase">
          <!-- Left Visual Showcase Panel -->
          <div class="login-hero-panel">
            <div>
              <div class="hero-kicker">✨ AI-ENABLED ASSESSMENT CENTER</div>
              <div class="login-hero-title">Simulasi Assessment Terpadu &amp; Interaktif</div>
              <p class="login-hero-sub">
                Persiapkan diri Anda menghadapi asesmen kompetensi dengan simulasi <strong>Virtual Office 5-Modul</strong>,
                wawancara perilaku <strong>STAR</strong>, serta analitik kepribadian <strong>OCEAN &amp; Psychometric</strong>.
              </p>

              <div class="feature-bento-list">
                <div class="feature-bento-item">
                  <div class="feature-bento-icon">🏢</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">PortrAI Virtual Office &amp; Live Call</div>
                    <div style="font-size:12.5px;color:#cbd5e1;">Simulasi Email, Chat AI adaptif, interupsi Telepon Masuk bersuara natural, &amp; Dokumen Analisa Bisnis.</div>
                  </div>
                </div>
                <div class="feature-bento-item">
                  <div class="feature-bento-icon" style="background:linear-gradient(135deg,#0ea5e9,#2563eb);">🎯</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Career Achievement Portfolio &amp; Async Video</div>
                    <div style="font-size:12.5px;color:#cbd5e1;">Evaluasi bukti perilaku STAR serta perekaman presentasi video kamera + transkripsi suara otomatis.</div>
                  </div>
                </div>
                <div class="feature-bento-item">
                  <div class="feature-bento-icon" style="background:linear-gradient(135deg,#10b981,#059669);">📊</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Radar Kompetensi &amp; Bank Soal Acak</div>
                    <div style="font-size:12.5px;color:#cbd5e1;">Skenario spesifik unit maupun korporat umum yang diacak setiap sesi beserta laporan kesiapan instan.</div>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-top:24px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.16);display:flex;justify-content:space-between;font-size:12px;color:#bae6fd;">
              <span>SIMETA • BOD-3, BOD-4 &amp; BOD-5</span>
              <span>PortrAI • DIVE V.2 • CAP • Kompetensi IFG</span>
            </div>
          </div>

          <!-- Right Auth Card -->
          <div class="login-form-card">
            <div style="text-align:center;margin-bottom:16px;">
              <img src="ASKRINDO Assessment Logo.png" alt="Logo Assessment" style="display:block;margin:0 auto 12px;max-width:210px;width:100%;height:auto;object-fit:contain;" />
              <span class="grade-badge">SIMETA • Simulasi Assessment Terpadu</span>
              <h2 style="font-size:22px;color:var(--primary);margin-bottom:4px;">${mode === "login" ? "Masuk ke SIMETA" : "Registrasi Akun Pegawai"}</h2>
              <p style="font-size:12.5px;color:var(--text-muted);">Gunakan NIP / Username Anda untuk memulai sesi simulasi.</p>
            </div>

            <div class="auth-mode-tabs">
              <button class="auth-mode-tab ${mode === "login" ? "active" : ""}" id="tabSwitchLogin">Masuk Akun</button>
              <button class="auth-mode-tab ${mode === "register" ? "active" : ""}" id="tabSwitchReg">Daftar Baru</button>
            </div>

            ${msg ? `<div class="feedback-box warn" style="margin-bottom:14px;margin-top:0;">${msg}</div>` : ""}

            ${
              mode === "login"
                ? `
              <div style="display:flex;flex-direction:column;gap:12px;">
                <div>
                  <label style="font-size:13px;font-weight:700;display:block;margin-bottom:4px;">NIP / Username</label>
                  <input type="text" id="loginNip" class="select-input" style="width:100%;" placeholder="Masukkan NIP atau username" />
                </div>
                <div>
                  <label style="font-size:13px;font-weight:700;display:block;margin-bottom:4px;">Password</label>
                  <input type="password" id="loginPw" class="select-input" style="width:100%;" placeholder="Masukkan password" />
                </div>
                <button class="btn btn-primary" id="btnDoLogin" style="margin-top:6px;padding:12px;">Masuk ke Portal Simulasi →</button>
                <div style="text-align:center;font-size:12.5px;color:var(--text-muted);margin-top:4px;">
                  Belum punya akun pegawai? <a href="#" id="linkToReg" style="color:var(--primary-light);font-weight:700;">Daftar di sini</a>
                </div>
              </div>
            `
                : `
              <div style="display:flex;flex-direction:column;gap:11px;">
                <div>
                  <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">NIP / NPP Pegawai</label>
                  <input type="text" id="regNip" class="select-input" style="width:100%;" placeholder="Contoh: 19900123" />
                </div>
                <div>
                  <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">Nama Lengkap</label>
                  <input type="text" id="regName" class="select-input" style="width:100%;" placeholder="Nama lengkap pegawai" />
                </div>
                <div class="grid-2" style="gap:10px;grid-template-columns:1fr 1fr;">
                  <div>
                    <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">Level / Grade</label>
                    <select id="regGrade" class="select-input" style="width:100%;min-width:0;">
                      <option value="BOD-3">BOD-3 (Grade 15–16)</option>
                      <option value="BOD-4" selected>BOD-4 (Grade 12–14)</option>
                      <option value="BOD-5">BOD-5 (Grade 8–11)</option>
                    </select>
                  </div>
                  <div>
                    <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">Unit / Bidang</label>
                    <select id="regUnit" class="select-input" style="width:100%;min-width:0;">
                      ${renderUnitOptions("Underwriting", false)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">Password</label>
                  <input type="password" id="regPw" class="select-input" style="width:100%;" placeholder="Minimal 6 karakter" />
                </div>
                <button class="btn btn-emerald" id="btnDoReg" style="margin-top:6px;padding:12px;">Kirim Pendaftaran Pegawai</button>
                <div style="text-align:center;font-size:12.5px;color:var(--text-muted);margin-top:4px;">
                  Sudah punya akun? <a href="#" id="linkToLogin" style="color:var(--primary-light);font-weight:700;">Masuk di sini</a>
                </div>
              </div>
            `
            }
          </div>
        </div>
      `;

      document.getElementById("tabSwitchLogin").addEventListener("click", () => {
        mode = "login";
        msg = "";
        draw();
      });
      document.getElementById("tabSwitchReg").addEventListener("click", () => {
        mode = "register";
        msg = "";
        draw();
      });

      if (mode === "login") {
        const submitLogin = async () => {
          const nip = document.getElementById("loginNip").value.trim();
          const pw = document.getElementById("loginPw").value;
          if (!nip || !pw) {
            msg = "NIP/Username dan Password wajib diisi.";
            draw();
            return;
          }
          const btn = document.getElementById("btnDoLogin");
          btn.disabled = true;
          btn.textContent = "Memeriksa...";
          const res = await window.SupabaseService.login(nip, pw);
          if (!res.ok) {
            msg = res.reason;
            draw();
            return;
          }
          state.currentUser = res.user;
          state.selectedGrade = res.user.grade || "BOD-4";
          state.unitFilter = "Umum (Generik PortrAI)";
          state.participantName = res.user.full_name;
          state.participantNip = res.user.nip;
          localStorage.setItem("askrindo_session_v1", JSON.stringify(res.user));
          updateTopbarSession();
          if (res.user.role === "admin") renderAdminPanel();
          else renderHome();
        };
        document.getElementById("btnDoLogin").addEventListener("click", submitLogin);
        document.getElementById("loginPw").addEventListener("keydown", (e) => {
          if (e.key === "Enter") submitLogin();
        });
        document.getElementById("linkToReg").addEventListener("click", (e) => {
          e.preventDefault();
          mode = "register";
          msg = "";
          draw();
        });
      } else {
        document.getElementById("btnDoReg").addEventListener("click", async () => {
          const nip = document.getElementById("regNip").value.trim();
          const full_name = document.getElementById("regName").value.trim();
          const grade = document.getElementById("regGrade").value;
          const unit = document.getElementById("regUnit").value;
          const password = document.getElementById("regPw").value;
          if (!nip || !full_name || password.length < 6) {
            msg = "Mohon lengkapi NIP, Nama Lengkap, dan Password minimal 6 karakter.";
            draw();
            return;
          }
          const btn = document.getElementById("btnDoReg");
          btn.disabled = true;
          btn.textContent = "Mendaftar...";
          const res = await window.SupabaseService.createUser({
            nip,
            full_name,
            password,
            role: "pegawai",
            grade,
            unit,
            is_active: false,
            allow_all_grades: false
          });
          if (!res.ok) {
            msg = res.reason;
            draw();
            return;
          }
          mode = "login";
          msg = `✓ Pendaftaran untuk NIP ${nip} (${full_name}) berhasil! Akun Anda menunggu verifikasi & aktivasi oleh Admin sebelum dapat login.`;
          draw();
        });
        document.getElementById("linkToLogin").addEventListener("click", (e) => {
          e.preventDefault();
          mode = "login";
          msg = "";
          draw();
        });
      }
    }

    draw();
  }

  // ======================== HOME VIEW ========================
  function renderHome() {
    if (!state.currentUser) {
      renderLogin();
      return;
    }
    if (state.currentUser.role === "admin") {
      renderAdminPanel();
      return;
    }
    cleanupAllSessions();
    updateTopbarSession();
    state.view = "home";
    state.fullFlow = false;
    state.flowQueue = [];
    state.flowResults = {};

    root.innerHTML = `
      <div class="card hero-card">
        <div class="hero-kicker">🚀 SIMETA DASHBOARD • PORTAL SIMULASI KOMPETENSI</div>
        <h1>Selamat Datang, ${state.currentUser.full_name}</h1>
        <p>
          Pilih <strong>Fokus Unit / Skenario</strong> dan <strong>Mode Waktu</strong> di bawah ini, lalu mulai simulasi lengkap 3 metode atau latihan spesifik per instrumen asesmen.
        </p>

        <div class="hero-stats-strip">
          <div class="hero-stat-pill">
            <div class="hero-stat-label">Profil &amp; NIP Pegawai</div>
            <div class="hero-stat-val">${state.currentUser.nip} • ${state.currentUser.grade}</div>
          </div>
          <div class="hero-stat-pill">
            <div class="hero-stat-label">Unit Terdaftar</div>
            <div class="hero-stat-val">${state.currentUser.unit}</div>
          </div>
          <div class="hero-stat-pill">
            <div class="hero-stat-label">Hak Akses Simulasi</div>
            <div class="hero-stat-val">${state.currentUser.role === "admin" || state.currentUser.allow_all_grades ? "Semua Level (BOD 3–5)" : "Khusus " + state.currentUser.grade}</div>
          </div>
        </div>

        <div class="filter-bar">
          <label for="unitSelect">🎯 Fokus Soal / Unit:</label>
          <select id="unitSelect" class="select-input">
            ${renderUnitOptions(state.unitFilter, true)}
          </select>
          <label for="modeSelect">⏱️ Mode Waktu:</label>
          <select id="modeSelect" class="select-input">
            <option value="quick" ${state.examMode === "quick" ? "selected" : ""}>Latihan Cepat (Ringkas ~15–45 mnt)</option>
            <option value="full" ${state.examMode === "full" ? "selected" : ""}>Simulasi Penuh (Standar Asli 180–240 mnt)</option>
          </select>
        </div>
      </div>

      <div class="grid-3">
        ${
          state.currentUser.role === "admin" || state.currentUser.allow_all_grades
            ? `
              ${renderGradeCard("BOD-3", "Grade 15–16", "145 Pegawai", "amber")}
              ${renderGradeCard("BOD-4", "Grade 12–14", "523 Pegawai", "")}
              ${renderGradeCard("BOD-5", "Grade 8–11", "253 Pegawai", "emerald")}
            `
            : state.currentUser.grade === "BOD-3"
            ? renderGradeCard("BOD-3", "Grade 15–16", "145 Pegawai", "amber")
            : state.currentUser.grade === "BOD-5"
            ? renderGradeCard("BOD-5", "Grade 8–11", "253 Pegawai", "emerald")
            : renderGradeCard("BOD-4", "Grade 12–14", "523 Pegawai", "")
        }
      </div>
    `;

    document.getElementById("unitSelect").addEventListener("change", (e) => {
      state.unitFilter = e.target.value;
    });
    document.getElementById("modeSelect").addEventListener("change", (e) => {
      state.examMode = e.target.value;
    });

    document.querySelectorAll("[data-start-full]").forEach((btn) => {
      btn.addEventListener("click", () => startFullAssessment(btn.getAttribute("data-start-full")));
    });

    document.querySelectorAll("[data-start-method]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedGrade = btn.getAttribute("data-grade");
        state.fullFlow = false;
        state.flowResults = {};
        launchMethod(state.selectedGrade, btn.getAttribute("data-start-method"));
      });
    });
  }

  function renderGradeCard(gradeId, gradeRange, headcount, badgeColor) {
    const data = GRADES[gradeId];
    const methodsHtml = data.methods
      .map(
        (m, idx) => `
      <li>
        <div>
          <strong>${idx + 1}. ${m.name}</strong>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${m.desc}</div>
        </div>
        <button class="btn btn-outline-dark btn-sm" data-grade="${gradeId}" data-start-method="${m.id}">Latih</button>
      </li>
    `
      )
      .join("");

    const spHtml =
      Array.isArray(data.successProfile) && data.successProfile.length
        ? `
      <details style="margin-bottom:14px;background:#f8fafc;border:1px solid var(--border);border-radius:10px;padding:8px 12px;">
        <summary style="font-size:12px;font-weight:700;color:var(--primary);cursor:pointer;">
          📋 Lihat Success Profile (${data.successProfile.length} Kompetensi IFG)
        </summary>
        <div class="tag-row" style="margin-top:8px;">
          ${data.successProfile.map((c, i) => `<span class="tag" style="background:#e6f0f7;color:#002B49;">${i + 1}. ${c}</span>`).join("")}
        </div>
      </details>
    `
        : "";

    return `
      <div class="card grade-card">
        <div>
          <span class="grade-badge ${badgeColor}">${gradeRange} • ${headcount}</span>
          <div class="grade-title">${data.title}</div>
          <div class="grade-meta">${data.roleLabel}</div>
          ${spHtml}
          <ul class="method-list">${methodsHtml}</ul>
        </div>
        <button class="btn btn-primary" data-start-full="${gradeId}">
          Mulai Simulasi Lengkap (${gradeId})
        </button>
      </div>
    `;
  }

  function isGradeAllowed(gradeId) {
    if (!state.currentUser) return false;
    if (state.currentUser.role === "admin") return false;
    if (state.currentUser.allow_all_grades) return true;
    return state.currentUser.grade === gradeId;
  }

  async function persistPreProgress(gradeId) {
    if (!state.currentUser || !window.SupabaseService) return;
    const pfSafe = state.preFlow ? { ...state.preFlow, faceDataUrl: null } : null;
    await window.SupabaseService.savePreProgress({
      nip: state.currentUser.nip,
      fullName: state.currentUser.full_name,
      grade: gradeId || state.selectedGrade,
      unit: state.currentUser.unit || state.unitFilter,
      payload: {
        preAssessment: state.preAssessment,
        preFlow: pfSafe,
        flowResults: {
          personality: state.flowResults.personality || null,
          psychometric: typeof state.flowResults.psychometric === "number" ? state.flowResults.psychometric : null,
          psychometricTelemetry: state.flowResults.psychometricTelemetry || null,
          cap: typeof state.flowResults.cap === "number" ? state.flowResults.cap : null,
          capTelemetry: state.flowResults.capTelemetry || null,
          move: typeof state.flowResults.move === "number" ? state.flowResults.move : null,
          moveTelemetry: state.flowResults.moveTelemetry || null,
          casestudy: Array.isArray(state.flowResults.casestudy) ? state.flowResults.casestudy : null,
          casestudyTelemetry: state.flowResults.casestudyTelemetry || null,
          presentation: typeof state.flowResults.presentation === "number" ? state.flowResults.presentation : null,
          presentationTelemetry: state.flowResults.presentationTelemetry || null
        }
      }
    });
  }

  async function hydratePreProgress(gradeId) {
    if (!state.currentUser || !window.SupabaseService) return false;
    const res = await window.SupabaseService.loadPreProgress(state.currentUser.nip, gradeId);
    if (res && res.ok && res.data) {
      const d = res.data;
      if (d.preAssessment) {
        state.preAssessment = {
          personalityDone: Boolean(d.preAssessment.personalityDone),
          capDone: Boolean(d.preAssessment.capDone),
          focusArea: d.preAssessment.focusArea || null
        };
      }
      if (d.flowResults) {
        if (d.flowResults.personality) state.flowResults.personality = d.flowResults.personality;
        if (typeof d.flowResults.psychometric === "number") state.flowResults.psychometric = d.flowResults.psychometric;
        if (d.flowResults.psychometricTelemetry) state.flowResults.psychometricTelemetry = d.flowResults.psychometricTelemetry;
        if (typeof d.flowResults.cap === "number") state.flowResults.cap = d.flowResults.cap;
        if (d.flowResults.capTelemetry) state.flowResults.capTelemetry = d.flowResults.capTelemetry;
        if (typeof d.flowResults.move === "number") state.flowResults.move = d.flowResults.move;
        if (d.flowResults.moveTelemetry) state.flowResults.moveTelemetry = d.flowResults.moveTelemetry;
        if (Array.isArray(d.flowResults.casestudy)) state.flowResults.casestudy = d.flowResults.casestudy;
        if (d.flowResults.casestudyTelemetry) state.flowResults.casestudyTelemetry = d.flowResults.casestudyTelemetry;
        if (typeof d.flowResults.presentation === "number") state.flowResults.presentation = d.flowResults.presentation;
        if (d.flowResults.presentationTelemetry) state.flowResults.presentationTelemetry = d.flowResults.presentationTelemetry;
      }
      if (d.preFlow) {
        state.preFlow = { ...d.preFlow };
        if (state.preAssessment.personalityDone || state.preAssessment.capDone || typeof state.flowResults.psychometric === "number") {
          state.preFlow.step = "lobby";
        }
      } else if (state.preAssessment.personalityDone || state.preAssessment.capDone || typeof state.flowResults.psychometric === "number") {
        state.preFlow = {
          step: "lobby",
          email: localStorage.getItem("simeta_email") || "",
          dob: localStorage.getItem("simeta_dob") || "",
          consentAccepted: true,
          faceCaptured: true,
          faceDataUrl: null,
          diveStart: "-",
          diveEnd: state.preAssessment.personalityDone ? "Tersimpan" : "-",
          capStart: "-",
          capEnd: state.preAssessment.capDone ? "Tersimpan" : "-"
        };
      }
      return true;
    }
    return false;
  }

  function openPreAssessmentLobby(gradeId) {
    if (state.currentUser && state.currentUser.role === "admin") {
      alert("Akun Admin hanya berfungsi untuk mengelola user dan tidak dapat mengerjakan assessment.");
      renderAdminPanel();
      return;
    }
    state.selectedGrade = gradeId;
    state.inPreLobby = true;
    if (typeof window.renderPreAssessmentFlow === "function") {
      window.renderPreAssessmentFlow({
        root,
        gradeId,
        data: GRADES[gradeId],
        state,
        cleanupAllSessions,
        onLaunchPersonality: () => {
          state.fullFlow = false;
          renderOceanPersonality(gradeId);
        },
        onLaunchCap: () => {
          state.fullFlow = false;
          renderCapStar(gradeId);
        },
        onLaunchCognitive: () => {
          state.fullFlow = false;
          renderPsychometric(gradeId);
        },
        onLaunchMove: () => {
          state.fullFlow = false;
          renderMoveTest(gradeId);
        },
        onLaunchCaseStudy: () => {
          state.fullFlow = false;
          renderCaseStudy(gradeId, "written-only");
        },
        onLaunchPresentation: () => {
          state.fullFlow = false;
          renderSelfPresentation(gradeId);
        },
        onLaunchMainAssessment: () => {
          state.inPreLobby = false;
          state.fullFlow = true;
          state.flowQueue = [];
          if (gradeId === "BOD-5") renderCaseStudy(gradeId);
          else renderPotrai(gradeId);
        },
        onFinishBod5Report: () => {
          state.inPreLobby = false;
          state.fullFlow = false;
          renderReport();
        },
        onBackHome: () => {
          state.inPreLobby = false;
          renderHome();
        },
        onSaveProgress: () => {
          persistPreProgress(gradeId);
        },
        onResetProgress: async () => {
          if (state.currentUser && window.SupabaseService) {
            await window.SupabaseService.clearPreProgress({
              nip: state.currentUser.nip,
              fullName: state.currentUser.full_name,
              grade: gradeId,
              unit: state.currentUser.unit || state.unitFilter
            });
          }
          state.preAssessment = { personalityDone: false, capDone: false, focusArea: null };
          state.flowResults = {};
          state.preFlow = null;
          openPreAssessmentLobby(gradeId);
        }
      });
    }
  }

  async function startFullAssessment(gradeId) {
    if (state.currentUser && state.currentUser.role === "admin") {
      alert("Akun Admin hanya berfungsi untuk mengelola user dan tidak dapat mengerjakan assessment.");
      renderAdminPanel();
      return;
    }
    if (!isGradeAllowed(gradeId)) {
      alert(`Akun Anda hanya diizinkan mengakses simulasi untuk grade ${state.currentUser.grade}.`);
      return;
    }
    state.selectedGrade = gradeId;
    state.fullFlow = true;
    state.flowResults = {};
    state.preAssessment = { personalityDone: false, capDone: false, focusArea: null };
    state.preFlow = null;
    await hydratePreProgress(gradeId);
    openPreAssessmentLobby(gradeId);
  }

  function nextInFlow() {
    if (!state.fullFlow || state.flowQueue.length === 0) {
      renderReport();
      return;
    }
    launchMethod(state.selectedGrade, state.flowQueue.shift());
  }

  function launchMethod(gradeId, methodId) {
    if (state.currentUser && state.currentUser.role === "admin") {
      alert("Akun Admin hanya berfungsi untuk mengelola user dan tidak dapat mengerjakan assessment.");
      renderAdminPanel();
      return;
    }
    if (!isGradeAllowed(gradeId)) {
      alert(`Akun Anda hanya diizinkan mengakses simulasi untuk grade ${state.currentUser.grade}.`);
      return;
    }
    if (
      !state.fullFlow &&
      methodId === "potrai" &&
      (!state.preAssessment.personalityDone || !state.preAssessment.capDone)
    ) {
      const goPre = confirm(
        "Sesuai alur resmi DDI, peserta perlu menyelesaikan Pre-Assessment (Personality Test & CAP) terlebih dahulu untuk menentukan fokus kasus simulasi.\n\nKlik OK untuk mulai dari Pre-Assessment sekarang, atau Cancel untuk langsung latihan simulasi."
      );
      if (goPre) {
        startFullAssessment(gradeId);
        return;
      }
    }
    if (methodId === "potrai") renderPotrai(gradeId);
    else if (methodId === "casestudy") renderCaseStudy(gradeId, gradeId === "BOD-5" ? "written-only" : "full");
    else if (methodId === "presentation") renderSelfPresentation(gradeId);
    else if (methodId === "cap") renderCapStar(gradeId);
    else if (methodId === "personality") renderOceanPersonality(gradeId);
    else if (methodId === "cognitive" || methodId === "psychometric") renderPsychometric(gradeId);
    else if (methodId === "move") renderMoveTest(gradeId);
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function shuffleQuizOptions(q) {
    const indexed = q.options.map((text, idx) => ({ text, isCorrect: idx === q.answer }));
    const mixed = shuffleArray(indexed);
    return {
      ...q,
      options: mixed.map((x) => x.text),
      answer: mixed.findIndex((x) => x.isCorrect)
    };
  }

  // ======================== POTRAI 5-MODUL WORKSPACE (BOD-3 & BOD-4) ========================
  function renderPotrai(gradeId) {
    const data = GRADES[gradeId];
    const isFull = state.examMode === "full";
    const genPool =
      window.DATA_GENERAL && (gradeId === "BOD-3" ? window.DATA_GENERAL.potrai_bod3 : window.DATA_GENERAL.potrai_bod4)
        ? gradeId === "BOD-3"
          ? window.DATA_GENERAL.potrai_bod3
          : window.DATA_GENERAL.potrai_bod4
        : [];
    const combinedPool = [...data.potrai, ...genPool];
    let pool = shuffleArray(filterPoolByUnit(combinedPool, state.unitFilter)).slice(0, isFull ? 3 : 2);
    if (isFull) {
      pool = pool.map((p) => ({ ...p, durationSec: 3600 })); // 60 mnt/skenario x 3 = 180 mnt
    }
    if (typeof window.renderPortraiVirtualOffice === "function") {
      window.renderPortraiVirtualOffice({
        root,
        gradeId,
        data,
        pool,
        state,
        startTimer,
        clearTimer,
        nextInFlow,
        renderReport
      });
      return;
    }

    let idx = 0;
    let activeTab = "email"; // email | chat | call | documents | ai | eval
    let ws = createEmptyWorkspace(pool[0]);

    function createEmptyWorkspace(item) {
      return {
        emailReply: "",
        chatMessages: [{ sender: item.chat.partnerName, role: "ai", text: item.chat.opening }],
        chatTurn: 0,
        callResponse: "",
        docAnalysis: "",
        aiChat: [{ role: "ai", text: "Halo! Saya PotrAI Assistant. Gunakan tombol bantuan di bawah atau tanyakan hal teknis untuk membantu analisa Anda." }]
      };
    }

    function draw() {
      const item = pool[idx];
      const tabDone = {
        email: ws.emailReply.trim().length >= 20,
        chat: ws.chatMessages.filter((m) => m.role === "user").length >= 1,
        call: ws.callResponse.trim().length >= 20,
        documents: ws.docAnalysis.trim().length >= 20
      };

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">${data.title} • PotrAI Simulation</span>
              <h2 style="font-size:20px;color:var(--primary);">${item.title}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Skenario ${idx + 1}/${pool.length} • Unit: ${item.unit} • Selesaikan 4 modul kerja &amp; gunakan AI Assistant bila perlu</div>
            </div>
            <div class="timer-pill" id="potraiTimer">25:00</div>
          </div>

          ${
            activeTab !== "eval"
              ? `
            <div class="potrai-tabs">
              <button class="potrai-tab ${activeTab === "email" ? "active" : ""} ${tabDone.email ? "done" : ""}" data-tab="email"><span class="dot"></span> 1. Email (Operational Challenge)</button>
              <button class="potrai-tab ${activeTab === "chat" ? "active" : ""} ${tabDone.chat ? "done" : ""}" data-tab="chat"><span class="dot"></span> 2. Chat (Role Play AI)</button>
              <button class="potrai-tab ${activeTab === "call" ? "active" : ""} ${tabDone.call ? "done" : ""}" data-tab="call"><span class="dot"></span> 3. Call (Virtual Meeting)</button>
              <button class="potrai-tab ${activeTab === "documents" ? "active" : ""} ${tabDone.documents ? "done" : ""}" data-tab="documents"><span class="dot"></span> 4. Documents (Analisa Bisnis)</button>
              <button class="potrai-tab ${activeTab === "ai" ? "active" : ""}" data-tab="ai">AI Assistant</button>
            </div>

            <div id="potraiPanel">${renderTabContent(item, activeTab)}</div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:14px;border-top:1px solid var(--border);flex-wrap:wrap;gap:10px;">
              <span style="font-size:12px;color:var(--text-muted);">Indikator hijau menandakan modul sudah diisi.</span>
              <button class="btn btn-emerald" id="btnFinishPotrai">Selesaikan &amp; Evaluasi Simulasi PotrAI</button>
            </div>
          `
              : renderPotraiEval(item)
          }
        </div>
      `;

      if (activeTab !== "eval") {
        document.querySelectorAll("[data-tab]").forEach((b) => {
          b.addEventListener("click", () => {
            saveCurrentTabInput();
            activeTab = b.getAttribute("data-tab");
            draw();
          });
        });

        bindTabEvents(item);

        document.getElementById("btnFinishPotrai").addEventListener("click", () => {
          saveCurrentTabInput();
          if (!ws.emailReply && !ws.docAnalysis && !ws.callResponse) {
            alert("Mohon isi minimal beberapa modul kerja (Email / Chat / Call / Documents) sebelum evaluasi.");
            return;
          }
          clearTimer();
          activeTab = "eval";
          draw();
        });
      } else {
        document.getElementById("btnNextPotrai").addEventListener("click", () => {
          if (idx + 1 < pool.length) {
            idx++;
            ws = createEmptyWorkspace(pool[idx]);
            activeTab = "email";
            startTimer(pool[idx].durationSec, "potraiTimer", () => {
              activeTab = "eval";
              draw();
            });
            draw();
          } else {
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    function saveCurrentTabInput() {
      const em = document.getElementById("emailReplyInput");
      if (em) ws.emailReply = em.value;
      const cl = document.getElementById("callRespInput");
      if (cl) ws.callResponse = cl.value;
      const dc = document.getElementById("docAnalysisInput");
      if (dc) ws.docAnalysis = dc.value;
    }

    function renderTabContent(item, tab) {
      if (tab === "email") {
        return `
          <div class="memo-box">
            <div style="font-size:12px;color:var(--text-muted);"><strong>Dari:</strong> ${item.email.from}</div>
            <h4 style="margin-top:4px;">Subjek: ${item.email.subject}</h4>
            <div style="margin-top:8px;">${item.email.body}</div>
          </div>
          <label style="font-weight:700;font-size:13px;display:block;margin-bottom:6px;">Balasan Email Anda:</label>
          <textarea class="textarea-box" id="emailReplyInput" placeholder="Yth. Bapak/Ibu... Berikut keputusan dan arahan kami...">${ws.emailReply}</textarea>
        `;
      }
      if (tab === "chat") {
        return `
          <div class="chat-box" id="chatBox">
            ${ws.chatMessages
              .map(
                (m) => `
              <div class="chat-msg ${m.role}">
                <div class="chat-sender">${m.sender}</div>
                <div>${m.text}</div>
              </div>
            `
              )
              .join("")}
          </div>
          <div style="display:flex;gap:8px;">
            <input type="text" id="chatInput" class="select-input" style="flex:1;" placeholder="Ketik pesan balasan role-play Anda di sini..." />
            <button class="btn btn-primary" id="btnSendChat">Kirim</button>
          </div>
        `;
      }
      if (tab === "call") {
        return `
          <div class="memo-box" style="border-left-color:var(--indigo);background:#eef2ff;">
            <h4>Live Virtual Meeting / Call: ${item.call.partnerName}</h4>
            <p>${item.call.prompt}</p>
          </div>
          <label style="font-weight:700;font-size:13px;display:block;margin-bottom:6px;">Poin Arahan / Transkrip Respon Lisan Anda:</label>
          <textarea class="textarea-box" id="callRespInput" placeholder="Tuliskan apa yang Anda sampaikan secara langsung dalam virtual meeting ini...">${ws.callResponse}</textarea>
        `;
      }
      if (tab === "documents") {
        return `
          <div class="memo-box" style="border-left-color:var(--emerald);background:#f0fdf4;">
            <h4>${item.documents.title}</h4>
            <p>${item.documents.brief}</p>
          </div>
          <label style="font-weight:700;font-size:13px;display:block;margin-bottom:6px;">Dokumen Kerja / Analisa Bisnis Anda:</label>
          <textarea class="textarea-box" id="docAnalysisInput" style="min-height:170px;" placeholder="1. Analisa Data & Risiko:\n2. Opsi & Keputusan:\n3. Rencana Aksi & Mitigasi:">${ws.docAnalysis}</textarea>
        `;
      }
      if (tab === "ai") {
        return `
          <div class="feedback-box info" style="margin-top:0;margin-bottom:12px;">
            <strong>Built-in AI Assistant:</strong> Gunakan alat bantu ini untuk menghitung rasio cepat atau menguji ide mitigasi risiko.
          </div>
          <div class="tag-row" style="margin-bottom:12px;">
            ${item.aiHints.map((h, i) => `<button class="btn btn-outline-dark btn-sm" data-ai-hint="${i}">${h.q}</button>`).join("")}
          </div>
          <div class="chat-box">
            ${ws.aiChat
              .map(
                (m) => `
              <div class="chat-msg ${m.role}">
                <div class="chat-sender">${m.role === "ai" ? "PotrAI Assistant" : "Anda"}</div>
                <div>${m.text}</div>
              </div>
            `
              )
              .join("")}
          </div>
        `;
      }
      return "";
    }

    function bindTabEvents(item) {
      const btnChat = document.getElementById("btnSendChat");
      if (btnChat) {
        const send = () => {
          const inp = document.getElementById("chatInput");
          const txt = inp.value.trim();
          if (!txt) return;
          ws.chatMessages.push({ sender: "Anda", role: "user", text: txt });
          ws.chatTurn++;
          const lower = txt.toLowerCase();
          let aiReply = "";
          if (ws.chatTurn === 1) {
            aiReply = item.chat.followUp;
          } else if (ws.chatTurn === 2) {
            if (/(tolak|tunda|pending|tidak bisa|audit|sop|wajib)/.test(lower)) {
              aiReply = "Saya mengerti prinsip tata kelola yang Anda pegang. Namun apa komitmen waktu atau solusi alternatif konkret yang bisa Anda tawarkan agar hubungan kerja sama tetap berjalan?";
            } else if (/(setuju|oke|lanjut|langsung|cairkan)/.test(lower) && !/(syarat|audit|escrow|jaminan|verifikasi)/.test(lower)) {
              aiReply = "Baik, berarti Anda menyetujui tanpa syarat tambahan ya? Bagaimana Anda mempertanggungjawabkannya jika nanti ada temuan audit internal atau lonjakan klaim?";
            } else {
              aiReply = "Opsi bersyarat dan solusi kolaboratif yang Anda ajukan cukup masuk akal. Pastikan detail mekanisme dan PIC-nya Anda tuangkan juga di Email/Documents ya.";
            }
          } else {
            aiReply = "Terima kasih. Seluruh poin negosiasi dan komitmen Anda sudah terekam dalam log diskusi untuk evaluasi.";
          }
          ws.chatMessages.push({ sender: item.chat.partnerName, role: "ai", text: aiReply });
          draw();
        };
        btnChat.addEventListener("click", send);
        document.getElementById("chatInput").addEventListener("keydown", (e) => {
          if (e.key === "Enter") send();
        });
      }

      document.querySelectorAll("[data-ai-hint]").forEach((b) => {
        b.addEventListener("click", () => {
          const h = item.aiHints[Number(b.getAttribute("data-ai-hint"))];
          ws.aiChat.push({ role: "user", text: h.q });
          ws.aiChat.push({ role: "ai", text: h.a });
          draw();
        });
      });
    }

    function renderPotraiEval(item) {
      const userChatTxt = ws.chatMessages.filter((m) => m.role === "user").map((m) => m.text).join(" ");
      const combined = `${ws.emailReply} ${userChatTxt} ${ws.callResponse} ${ws.docAnalysis}`.toLowerCase();
      const matched = item.keywords.filter((k) => combined.includes(k));
      const modulesCompleted = [ws.emailReply, userChatTxt, ws.callResponse, ws.docAnalysis].filter((x) => x.trim().length >= 20).length;
      const score = Math.min(97, Math.max(45, Math.round((matched.length / 7) * 55 + modulesCompleted * 10 + 5)));

      if (!state.flowResults.potrai) state.flowResults.potrai = [];
      state.flowResults.potrai[idx] = score;

      const trails = [
        { name: "Operational Decision (Email)", ok: ws.emailReply.trim().length >= 25 },
        { name: "Stakeholder Role-Play (Chat AI)", ok: ws.chatMessages.filter((m) => m.role === "user").length >= 2 },
        { name: "People / Virtual Alignment (Call)", ok: ws.callResponse.trim().length >= 25 },
        { name: "Business Analysis (Documents)", ok: ws.docAnalysis.trim().length >= 25 }
      ];

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi PortrAI Simulation — Behavioral Trails (${modulesCompleted}/4 Modul Kerja)</strong>
              <div style="font-size:13px;color:var(--text-muted);">Indikator perilaku &amp; konsep kunci terpenuhi: ${matched.length} poin</div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
          <div class="tag-row">
            ${trails.map((t) => `<span class="tag" style="background:${t.ok ? "var(--emerald-soft)" : "var(--rose-soft)"};color:${t.ok ? "#065f46" : "#991b1b"};">${t.ok ? "✓" : "✕"} ${t.name}</span>`).join("")}
          </div>
          <div class="tag-row">${matched.map((m) => `<span class="tag">✓ ${m}</span>`).join("")}</div>
        </div>
        <div class="rubric-grid">
          ${item.rubric.map((r) => `<div class="rubric-item"><label>Dimensi Dinilai</label><div style="font-size:13px;">${r}</div></div>`).join("")}
        </div>
        <div class="memo-box" style="margin-top:16px;border-left-color:var(--emerald);background:#f0fdf4;">
          <h4>Benchmark Jawaban Ideal (${gradeId})</h4>
          <p>${item.benchmark}</p>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextPotrai">
            ${idx + 1 < pool.length ? "Skenario Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    startTimer(pool[0].durationSec, "potraiTimer", () => {
      activeTab = "eval";
      draw();
    });
    draw();
  }

  // ======================== 5. CASE STUDY (BOD-5) ========================
  function renderCaseStudy(gradeId, mode = "full") {
    const data = GRADES[gradeId];
    const isFull = state.examMode === "full";
    const isWrittenOnly = mode === "written-only";
    const genCases = window.DATA_GENERAL ? window.DATA_GENERAL.casestudy_bod5 : [];
    const combinedCases = [...data.casestudy, ...genCases];
    let pool = shuffleArray(filterPoolByUnit(combinedCases, state.unitFilter)).slice(0, isWrittenOnly ? 1 : 2);
    if (isFull) {
      pool = pool.map((c) => ({ ...c, prepSec: 4500, presentSec: 1200 }));
    }
    let idx = 0;
    let stage = "written"; // written | present | eval
    let writtenAnswers = [];
    let scriptText = "";
    let recordedAudioUrl = null;
    let recordedVideoUrl = null;
    let activeStream = null;
    let mediaRecorder = null;
    let isRecording = false;
    let recMode = "video"; // video | audio

    function draw() {
      const item = pool[idx];
      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge emerald">${data.title} • Case Study + Asynchronous Presentation</span>
              <h2 style="font-size:20px;color:var(--primary);">${item.title}</h2>
              <div style="font-size:13px;color:var(--text-muted);">
                Kasus ${idx + 1}/${pool.length} • Tahap: <strong>${stage === "written" ? "1. Jawaban Tertulis Studi Kasus" : stage === "present" ? "2. Presentasi Asinkron (Rekam Mandiri)" : "3. Evaluasi AI"}</strong>
              </div>
            </div>
            <div class="timer-pill" id="csTimer">10:00</div>
          </div>

          <div class="memo-box">${item.brief}</div>

          ${
            stage === "written"
              ? `
            <p style="font-weight:700;margin-bottom:10px;">Bagian A — Jawab Pertanyaan Studi Kasus Secara Tertulis:</p>
            ${item.writtenQuestions
              .map(
                (q, qi) => `
              <div style="margin-bottom:14px;">
                <label style="display:block;font-size:14px;font-weight:600;margin-bottom:6px;">${q}</label>
                <textarea class="textarea-box cs-written-q" data-qi="${qi}" placeholder="Tuliskan analisis dan solusi Anda secara terstruktur...">${writtenAnswers[qi] || ""}</textarea>
              </div>
            `
              )
              .join("")}
            <div style="display:flex;justify-content:flex-end;">
              <button class="btn btn-primary" id="btnToPresent">${isWrittenOnly ? "Simpan &amp; Evaluasi Case Study →" : "Lanjut ke Presentasi Asinkron"}</button>
            </div>
          `
              : stage === "present"
              ? `
            <div class="feedback-box info" style="margin-top:0;margin-bottom:14px;">
              <strong>Bagian B — Asynchronous Presentation (Kamera + Suara):</strong> Sampaikan hasil analisis &amp; rekomendasi Anda secara terstruktur (Pembukaan → Analisis → Rekomendasi → Penutup) menghadap kamera seperti ujian aslinya.
            </div>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <button class="btn ${isRecording && recMode === "video" ? "btn-danger" : "btn-primary"}" id="btnRecVideo" ${isRecording && recMode !== "video" ? "disabled" : ""}>
                ${isRecording && recMode === "video" ? "⏹ Stop Rekaman Video" : "🎥 Rekam Video Kamera + Suara"}
              </button>
              <button class="btn ${isRecording && recMode === "audio" ? "btn-danger" : "btn-outline-dark"}" id="btnRecAudio" ${isRecording && recMode !== "audio" ? "disabled" : ""}>
                ${isRecording && recMode === "audio" ? "⏹ Stop Rekaman Audio" : "🎙️ Rekam Audio Saja"}
              </button>
            </div>
            ${
              isRecording && recMode === "video"
                ? `<div style="margin-bottom:12px;text-align:center;background:#0f172a;padding:10px;border-radius:12px;">
                     <div style="color:#f87171;font-size:12px;font-weight:700;margin-bottom:6px;">● SEDANG MEREKAM VIDEO PRESENTASI...</div>
                     <video id="csLivePreview" autoplay muted playsinline style="max-width:420px;width:100%;border-radius:10px;background:#000;"></video>
                   </div>`
                : ""
            }
            ${
              recordedVideoUrl && !isRecording
                ? `<div style="margin-bottom:12px;background:#f8fafc;padding:10px;border-radius:12px;border:1px solid var(--border);">
                     <div style="font-size:12px;font-weight:700;color:var(--emerald-dark);margin-bottom:6px;">✓ Rekaman Video Presentasi Tersimpan (Pratinjau):</div>
                     <video controls src="${recordedVideoUrl}" style="max-width:420px;width:100%;border-radius:10px;background:#000;"></video>
                   </div>`
                : ""
            }
            ${
              recordedAudioUrl && !isRecording
                ? `<div style="margin-bottom:12px;">
                     <audio controls src="${recordedAudioUrl}" style="height:36px;width:100%;max-width:420px;"></audio>
                   </div>`
                : ""
            }
            <textarea class="textarea-box" id="csScript" style="min-height:150px;" placeholder="Tuliskan poin skrip / ringkasan presentasi Anda di sini...">${scriptText}</textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:14px;">
              <button class="btn btn-accent" id="btnSubmitPresent">Kirim Jawaban &amp; Presentasi</button>
            </div>
          `
              : renderCsEval(item)
          }
        </div>
      `;

      if (stage === "written") {
        startTimer(item.prepSec, "csTimer", () => {
          stage = isWrittenOnly ? "eval" : "present";
          draw();
        });
        document.getElementById("btnToPresent").addEventListener("click", () => {
          document.querySelectorAll(".cs-written-q").forEach((el) => {
            writtenAnswers[Number(el.getAttribute("data-qi"))] = el.value.trim();
          });
          if (writtenAnswers.join("").length < 25) {
            alert("Mohon isi jawaban tertulis terlebih dahulu.");
            return;
          }
          if (isWrittenOnly) clearTimer();
          stage = isWrittenOnly ? "eval" : "present";
          draw();
        });
      } else if (stage === "present") {
        startTimer(item.presentSec, "csTimer", () => {
          stage = "eval";
          draw();
        });
        let speechRec = null;
        let recTimerInt = null;
        let recSec = 0;

        if (isRecording && recMode === "video" && activeStream) {
          const vidEl = document.getElementById("csLivePreview");
          if (vidEl) vidEl.srcObject = activeStream;
        }

        async function toggleRecord(mode) {
          if (!isRecording) {
            try {
              const constraints = mode === "video" ? { video: true, audio: true } : { audio: true };
              const stream = await navigator.mediaDevices.getUserMedia(constraints);
              activeStream = stream;
              recMode = mode;
              const chunks = [];
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) chunks.push(e.data);
              };
              mediaRecorder.onstop = () => {
                if (recTimerInt) clearInterval(recTimerInt);
                if (speechRec) {
                  try { speechRec.stop(); } catch {}
                  speechRec = null;
                }
                const mime = mode === "video" ? "video/webm" : "audio/webm";
                const blob = new Blob(chunks, { type: mime });
                if (mode === "video") {
                  recordedVideoUrl = URL.createObjectURL(blob);
                  recordedAudioUrl = null;
                } else {
                  recordedAudioUrl = URL.createObjectURL(blob);
                  recordedVideoUrl = null;
                }
                stream.getTracks().forEach((t) => t.stop());
                activeStream = null;
                draw();
              };
              mediaRecorder.start();
              isRecording = true;

              // Transkripsi otomatis ucapan saat presentasi (jika didukung browser)
              const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
              if (SR) {
                try {
                  speechRec = new SR();
                  speechRec.lang = "id-ID";
                  speechRec.continuous = true;
                  speechRec.interimResults = false;
                  speechRec.onresult = (ev) => {
                    const last = ev.results[ev.results.length - 1][0].transcript;
                    scriptText = (scriptText ? scriptText + " " : "") + last;
                    const box = document.getElementById("csScript");
                    if (box) box.value = scriptText;
                  };
                  speechRec.start();
                } catch {}
              }

              recSec = 0;
              recTimerInt = setInterval(() => {
                recSec++;
              }, 1000);

              draw();
            } catch {
              alert(
                mode === "video"
                  ? "Kamera/Mikrofon tidak tersedia atau izin ditolak. Anda bisa mencoba Rekam Audio Saja atau menulis skrip."
                  : "Mikrofon tidak tersedia atau izin ditolak. Anda tetap dapat menggunakan skrip presentasi."
              );
            }
          } else {
            mediaRecorder.stop();
            isRecording = false;
          }
        }

        document.getElementById("btnRecVideo").addEventListener("click", () => toggleRecord("video"));
        document.getElementById("btnRecAudio").addEventListener("click", () => toggleRecord("audio"));

        document.getElementById("btnSubmitPresent").addEventListener("click", () => {
          scriptText = document.getElementById("csScript").value.trim();
          if (scriptText.length < 25 && !recordedAudioUrl && !recordedVideoUrl) {
            alert("Mohon tulis skrip presentasi atau rekam video/audio terlebih dahulu.");
            return;
          }
          clearTimer();
          stage = "eval";
          draw();
        });
      } else {
        document.getElementById("btnNextCs").addEventListener("click", () => {
          if (idx + 1 < pool.length) {
            idx++;
            stage = "written";
            writtenAnswers = [];
            scriptText = "";
            recordedAudioUrl = null;
            recordedVideoUrl = null;
            draw();
          } else {
            if (state.preFlow) state.preFlow.csEnd = new Date().toLocaleString("id-ID");
            persistPreProgress(gradeId);
            if (state.inPreLobby) {
              state.preFlow.step = "lobby";
              openPreAssessmentLobby(gradeId);
            } else if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    function renderCsEval(item) {
      const combined = (writtenAnswers.join(" ") + " " + scriptText).toLowerCase();
      const matched = item.keywords.filter((k) => combined.includes(k));
      const words = combined.split(/\s+/).filter(Boolean).length;
      const mediaBonus = isWrittenOnly ? 10 : recordedVideoUrl ? 10 : recordedAudioUrl ? 8 : 0;
      const score = Math.min(98, Math.max(48, Math.round((matched.length / 7) * 65 + (words >= 75 ? 20 : 10) + mediaBonus)));
      if (!state.flowResults.casestudy) state.flowResults.casestudy = [];
      state.flowResults.casestudy[idx] = score;
      if (!state.flowResults.casestudyTelemetry) state.flowResults.casestudyTelemetry = [];
      state.flowResults.casestudyTelemetry[idx] = {
        title: item.title,
        words,
        writtenOnly: isWrittenOnly,
        hasVideo: Boolean(recordedVideoUrl),
        hasAudio: Boolean(recordedAudioUrl),
        matchedKeywords: matched,
        missingKeywords: item.keywords.filter((k) => !combined.includes(k)).slice(0, 4),
        score
      };
      if (state.preFlow) state.preFlow.csEnd = new Date().toLocaleString("id-ID");
      persistPreProgress(gradeId);

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong>Evaluasi Case Study + Async Presentation</strong>
              <div style="font-size:13px;color:var(--text-muted);">Total kata: ${words} • Poin kunci: ${matched.length} ${recordedVideoUrl ? "• Rekaman Video Tersimpan ✓" : recordedAudioUrl ? "• Rekaman Audio Tersimpan ✓" : ""}</div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
        </div>
        <div class="rubric-grid">
          ${item.rubric.map((r) => `<div class="rubric-item"><label>Indikator AI Assessor</label><div style="font-size:13px;">${r}</div></div>`).join("")}
        </div>
        <div class="memo-box" style="margin-top:16px;border-left-color:var(--emerald);background:#f0fdf4;">
          <h4>Benchmark Jawaban &amp; Presentasi Ideal (BOD-5)</h4>
          <p>${item.benchmark}</p>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextCs">
            ${idx + 1 < pool.length ? "Kasus Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    draw();
  }

  // ======================== CAP — CAREER ACHIEVEMENT PORTFOLIO (DDI FORMAT) ========================
  function renderCapStar(gradeId) {
    clearTimer();
    const data = GRADES[gradeId];
    const isFull = state.examMode === "full";
    const items = shuffleArray(data.cap).slice(0, isFull ? 4 : 2);
    const startTimeStr = new Date().toLocaleString("id-ID");
    let idx = 0;
    let essayText = "";
    let evaluated = false;
    let finishedAll = false;
    let scores = [];

    startTimer(isFull ? 4500 : items.length * 900, "capTimer", () => {
      state.flowResults.cap = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 65;
      state.preAssessment.capDone = true;
      if (state.fullFlow) nextInFlow();
      else renderReport();
    });

    function draw() {
      if (finishedAll) {
        const endTimeStr = new Date().toLocaleString("id-ID");
        root.innerHTML = `
          <div class="card">
            <div class="feedback-box info" style="margin-top:0;margin-bottom:20px;">
              Jika Anda telah sampai pada halaman ini, berarti Anda telah berhasil menyelesaikan aktivitas <strong>Pre-Assessment: Career Achievement Portfolio (CAP)</strong>. Silakan klik <strong>Next →</strong> untuk melanjutkan aktivitas berikutnya.
            </div>
            <div class="ddi-done-card">
              <h2 style="color:var(--primary);margin-bottom:8px;">Selesai!</h2>
              <p style="font-size:14px;color:var(--text-muted);margin-bottom:18px;">
                Ini adalah akhir dari pengerjaan Career Achievement Portfolio (CAP).<br/>
                Jawaban Anda telah tersimpan dan digunakan untuk memetakan kasus Simulasi PortrAI / Case Study.
              </p>
              <div style="display:flex;justify-content:center;gap:36px;font-size:13px;color:var(--text);margin-bottom:24px;flex-wrap:wrap;">
                <div><strong>Mulai:</strong><br/>${startTimeStr}</div>
                <div><strong>Selesai:</strong><br/>${endTimeStr}</div>
              </div>
              <button class="btn btn-accent" id="btnCapFinalNext" style="min-width:160px;">Next →</button>
            </div>
          </div>
        `;
        document.getElementById("btnCapFinalNext").addEventListener("click", () => {
          if (state.preFlow) state.preFlow.capEnd = new Date().toLocaleString("id-ID");
          if (state.inPreLobby) {
            state.preFlow.step = "lobby";
            openPreAssessmentLobby(gradeId);
          } else if (state.fullFlow) nextInFlow();
          else renderReport();
        });
        return;
      }

      const item = items[idx];
      const pct = Math.round(((idx + (evaluated ? 1 : 0)) / items.length) * 100);

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">${data.title} • PRE-ASSESSMENT | CAP</span>
              <h2 style="font-size:20px;color:var(--primary);">Career Achievement Portofolio — ${item.competency}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Jawablah dengan contoh pengalaman kerja berdasarkan gambaran situasi, tindakan yang Anda lakukan saat itu, beserta hasilnya.</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <span class="pill ${navigator.onLine ? "pill-green" : "pill-red"}" style="border:1px solid currentColor;">📶 Connection: ${navigator.onLine ? "normal" : "terputus"}</span>
              <span class="pill" style="background:#f1f5f9;color:var(--primary);">${idx + (evaluated ? 1 : 0)} of ${items.length} Questions</span>
              <div class="timer-pill" id="capTimer">30:00</div>
            </div>
          </div>

          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>

          <div class="feedback-box info" style="margin-top:0;margin-bottom:16px;font-style:italic;font-size:13.5px;">
            <strong>Tips:</strong> Gunakan contoh pengalaman yang nyata dan relevan, serta ceritakan secara konkret apa yang terjadi, peran yang Anda jalankan, langkah yang Anda ambil, dan hasil yang berhasil dicapai. Semakin spesifik dan lengkap jawaban Anda, semakin baik gambaran yang dapat diperoleh dari pengalaman kerja Anda!
          </div>

          ${
            !evaluated
              ? `
            <div class="cap-ddi-box">
              <div>
                <div style="font-size:12px;font-weight:800;color:var(--accent);text-transform:uppercase;margin-bottom:6px;">Pertanyaan Pengalaman Kerja</div>
                <p style="font-size:14.5px;font-weight:600;color:var(--primary);line-height:1.65;">${item.prompt}</p>
              </div>
              <div>
                <label style="font-size:12.5px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:6px;">Gunakan kolom berikut untuk menceritakan pengalaman Anda (Situasi, Peran, Tindakan, &amp; Hasil):</label>
                <textarea class="textarea-box" id="capEssayInput" style="min-height:200px;" placeholder="Ceritakan secara konkret: situasi yang terjadi, peran Anda, tindakan nyata yang Anda lakukan ('Saya...'), serta hasil terukur yang dicapai...">${essayText}</textarea>
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnEvalCap">Simpan &amp; Evaluasi Jawaban</button>
            </div>
          `
              : renderCapEval(item)
          }
        </div>
      `;

      if (!evaluated) {
        document.getElementById("btnEvalCap").addEventListener("click", () => {
          essayText = document.getElementById("capEssayInput").value.trim();
          if (essayText.length < 40) {
            alert("Mohon ceritakan pengalaman kerja Anda minimal 40 karakter (mencakup situasi, tindakan, dan hasil).");
            return;
          }
          evaluated = true;
          draw();
        });
      } else {
        document.getElementById("btnNextCap").addEventListener("click", () => {
          if (idx + 1 < items.length) {
            idx++;
            essayText = "";
            evaluated = false;
            draw();
          } else {
            clearTimer();
            state.flowResults.cap = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            state.preAssessment.capDone = true;
            if (state.preFlow) state.preFlow.capEnd = new Date().toLocaleString("id-ID");
            persistPreProgress(gradeId);
            finishedAll = true;
            draw();
          }
        });
      }
    }

    function renderCapEval(item) {
      const hasFirstPerson = /\bsaya\b/i.test(essayText);
      const hasNumbers = /\d+/.test(essayText);
      const hasResultWord = /(hasil|dampak|meningkat|turun|berhasil|tercapai|efisien|solusi)/i.test(essayText);
      const totalWords = essayText.split(/\s+/).filter(Boolean).length;
      const score = Math.min(97, Math.max(52, (totalWords >= 70 ? 48 : totalWords >= 40 ? 36 : 24) + (hasFirstPerson ? 18 : 6) + (hasNumbers ? 16 : 6) + (hasResultWord ? 14 : 6)));
      scores[idx] = score;
      if (!state.flowResults.capTelemetry) state.flowResults.capTelemetry = [];
      state.flowResults.capTelemetry[idx] = {
        competency: item.competency,
        words: totalWords,
        hasFirstPerson,
        hasNumbers,
        hasResultWord,
        score
      };

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi Bukti Perilaku CAP</strong>
              <div style="font-size:13px;color:var(--text-muted);">
                Jumlah kata: ${totalWords} • Kepemilikan tindakan ("Saya"): ${hasFirstPerson ? "Jelas ✓" : "Perlu dipertegas"} • Hasil terukur (angka): ${hasNumbers ? "Ada ✓" : "Tambahkan metrik"}
              </div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
        </div>
        <div class="rubric-grid">
          ${item.indicators.map((ind) => `<div class="rubric-item"><label>Indikator Kompetensi</label><div style="font-size:13px;">${ind}</div></div>`).join("")}
        </div>
        ${
          !hasFirstPerson || !hasNumbers
            ? `<div class="feedback-box warn" style="margin-top:14px;">
                 <strong>Catatan Probing Asesor DDI:</strong>
                 <ul style="margin-left:18px;margin-top:6px;">
                   ${!hasFirstPerson ? "<li>Perjelas kontribusi pribadi Anda menggunakan kata <em>'Saya'</em> (bukan hanya 'kami/tim').</li>" : ""}
                   ${!hasNumbers ? "<li>Cantumkan angka dampak terukur (persentase perbaikan, rupiah, SLA hari, atau jumlah berkas).</li>" : ""}
                 </ul>
               </div>`
            : `<div class="feedback-box info" style="margin-top:14px;"><strong>✓ Bukti Perilaku Lengkap:</strong> Jawaban Anda sudah konkret mencakup situasi, tindakan pribadi, dan hasil terukur sesuai standar DDI.</div>`
        }
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextCap">
            ${idx + 1 < items.length ? "Pertanyaan CAP Berikutnya →" : "Selesaikan CAP →"}
          </button>
        </div>
      `;
    }

    draw();
  }

  // ======================== PRE-ASSESSMENT PERSONALITY TEST — DRAG & DROP OCEAN (DDI FORMAT) ========================
  function renderOceanPersonality(gradeId) {
    clearTimer();
    const data = GRADES[gradeId];
    const isFull = state.examMode === "full";
    const startTimeStr = new Date().toLocaleString("id-ID");

    // Susun menjadi 3 halaman x 5 pernyataan (tiap halaman 1 O, 1 C, 1 E, 1 A, 1 N)
    const byDim = { Openness: [], Conscientiousness: [], Extraversion: [], Agreeableness: [], Neuroticism: [] };
    shuffleArray(data.personality).forEach((it) => {
      if (byDim[it.dim]) byDim[it.dim].push(it);
    });
    const pages = [];
    for (let p = 0; p < 3; p++) {
      const group = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"]
        .map((d) => byDim[d][p])
        .filter(Boolean);
      if (group.length === 5) pages.push(shuffleArray(group));
    }

    let pageIdx = 0;
    let oceanPhase = "welcome"; // welcome | instructions | sample | test | done
    const sampleItems = [
      { id: "smp-1", text: "Saya mendengarkan musik setiap hari." },
      { id: "smp-2", text: "Setelah bangun tidur, saya membiasakan diri untuk minum air putih terlebih dahulu." },
      { id: "smp-3", text: "Untuk belajar saya perlu berada di ruangan yang sepi." },
      { id: "smp-4", text: "Banyak orang di sekitar saya yang mengira saya orang yang pendiam." },
      { id: "smp-5", text: "Saya selalu merapikan meja kerja sebelum meninggalkan kantor." }
    ];
    const sampleMap = { "smp-1": "pool", "smp-2": "pool", "smp-3": "pool", "smp-4": "pool", "smp-5": "pool" };
    // placements[pageIdx] = { id: 'pool' | 'most' | 'neutral' | 'least' }
    const placements = pages.map((grp) => {
      const map = {};
      grp.forEach((it) => (map[it.id] = "pool"));
      return map;
    });

    function computeOceanResults() {
      clearTimer();
      const dims = { Openness: [], Conscientiousness: [], Extraversion: [], Agreeableness: [], Neuroticism: [] };
      pages.forEach((grp, pi) => {
        grp.forEach((it) => {
          const z = placements[pi][it.id];
          const raw = z === "most" ? 5 : z === "least" ? 1 : 3;
          const val = it.reverse ? 6 - raw : raw;
          dims[it.dim].push(val);
        });
      });
      const dimScore = {};
      let total = 0;
      let lowestDim = "Conscientiousness";
      let lowestVal = 101;
      Object.keys(dims).forEach((d) => {
        const avg = dims[d].reduce((a, b) => a + b, 0) / dims[d].length;
        const pct = Math.round((avg / 5) * 100);
        const label = d === "Neuroticism" ? "Emotional Stability" : d;
        dimScore[label] = pct;
        total += pct;
        if (pct < lowestVal) {
          lowestVal = pct;
          lowestDim = label;
        }
      });
      state.flowResults.personality = {
        overall: Math.round(total / 5),
        dimensions: dimScore
      };
      state.preAssessment.personalityDone = true;
      state.preAssessment.focusArea = lowestDim;
      if (state.preFlow) state.preFlow.diveEnd = new Date().toLocaleString("id-ID");
      persistPreProgress(gradeId);
      oceanPhase = "done";
      draw();
    }

    function moveCard(itemId, targetZone) {
      const map = oceanPhase === "sample" ? sampleMap : placements[pageIdx];
      const counts = { most: 0, neutral: 0, least: 0 };
      Object.values(map).forEach((v) => {
        if (counts[v] !== undefined) counts[v]++;
      });
      const limits = { most: 1, neutral: 3, least: 1 };
      if (targetZone !== "pool" && map[itemId] !== targetZone && counts[targetZone] >= limits[targetZone]) {
        alert(`Kotak "${targetZone === "most" ? "Paling Menggambarkan Saya" : targetZone === "neutral" ? "Netral" : "Paling Sedikit Menggambarkan Saya"}" sudah penuh (maksimal ${limits[targetZone]} pernyataan). Pindahkan dulu pernyataan lain jika ingin mengganti.`);
        return;
      }
      map[itemId] = targetZone;
      draw();
    }

    function draw() {
      const connPill = `<span class="pill ${navigator.onLine ? "pill-green" : "pill-red"}" style="border:1px solid currentColor;">📶 Connection: ${navigator.onLine ? "normal" : "terputus"}</span>`;

      if (oceanPhase === "welcome") {
        root.innerHTML = `
          <div class="card" style="max-width:780px;margin:0 auto;">
            <div class="assess-header">
              <div><span class="grade-badge">PRE-ASSESSMENT | PERSONALITY TEST — LAMAN AWAL</span></div>
              ${connPill}
            </div>
            <div class="ddi-done-card" style="padding:32px 24px;">
              <h2 style="color:var(--primary);letter-spacing:0.5px;margin-bottom:10px;">SELAMAT DATANG</h2>
              <p style="font-size:14px;color:var(--text-muted);max-width:560px;margin:0 auto 20px;">
                Selamat datang di aktivitas <strong>Disposition-Five (DIVE) Inventory V.2 (Personality Test)</strong>.
                Tes ini bertujuan untuk memahami kecenderungan perilaku dan kepribadian Anda berdasarkan 5 dimensi <strong>OCEAN</strong>.
                Tidak ada jawaban benar atau salah — jawablah secara jujur sesuai diri Anda.
              </p>
              <button class="btn btn-accent" id="btnWelcomeNext">Lanjut ke Instruksi Pengerjaan →</button>
            </div>
          </div>
        `;
        document.getElementById("btnWelcomeNext").addEventListener("click", () => {
          oceanPhase = "instructions";
          draw();
        });
        return;
      }

      if (oceanPhase === "instructions") {
        root.innerHTML = `
          <div class="card" style="max-width:780px;margin:0 auto;">
            <div class="assess-header">
              <div><span class="grade-badge">PRE-ASSESSMENT | PERSONALITY TEST — LAMAN INSTRUKSI</span></div>
              ${connPill}
            </div>
            <div class="memo-box" style="margin-bottom:18px;">
              <h4 style="text-align:center;font-size:17px;margin-bottom:12px;">INSTRUKSI PENGERJAAN</h4>
              <ol style="margin-left:20px;line-height:1.75;font-size:14px;">
                <li>Pada setiap halaman terdapat <strong>5 pernyataan</strong> di kotak kiri (<em>Statement</em>).</li>
                <li>Pindahkan seluruh 5 pernyataan tersebut (dengan cara <em>drag &amp; drop</em> atau tombol cepat) ke <strong>3 kotak di sisi kanan</strong>:
                  <ul style="margin-left:18px;margin-top:4px;">
                    <li><strong>Paling Menggambarkan Saya:</strong> tepat <strong>1 pernyataan</strong></li>
                    <li><strong>Netral:</strong> tepat <strong>3 pernyataan</strong></li>
                    <li><strong>Paling Sedikit Menggambarkan Saya:</strong> tepat <strong>1 pernyataan</strong></li>
                  </ul>
                </li>
                <li>Anda <strong>tidak dapat melanjutkan</strong> ke halaman berikutnya sebelum seluruh 5 pernyataan ditempatkan sesuai kuota.</li>
              </ol>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <button class="btn btn-outline-dark" id="btnInstrBack">← Kembali</button>
              <button class="btn btn-accent" id="btnInstrNext">Coba Contoh Pengerjaan →</button>
            </div>
          </div>
        `;
        document.getElementById("btnInstrBack").addEventListener("click", () => {
          oceanPhase = "welcome";
          draw();
        });
        document.getElementById("btnInstrNext").addEventListener("click", () => {
          oceanPhase = "sample";
          draw();
        });
        return;
      }

      if (oceanPhase === "done") {
        const endTimeStr = new Date().toLocaleString("id-ID");
        root.innerHTML = `
          <div class="card">
            <div class="feedback-box info" style="margin-top:0;margin-bottom:20px;">
              Jika Anda telah sampai pada halaman ini, berarti Anda telah berhasil menyelesaikan aktivitas <strong>Pre-Assessment: Personality Test</strong>. Silakan klik <strong>Next →</strong> untuk melanjutkan ke aktivitas berikutnya.
            </div>
            <div class="ddi-done-card">
              <h2 style="color:var(--primary);margin-bottom:8px;">Selesai!</h2>
              <p style="font-size:14px;color:var(--text-muted);margin-bottom:18px;">
                Ini adalah akhir dari pengerjaan aktivitas Personality Test (OCEAN).<br/>
                Jawaban Anda telah tersimpan. Area prioritas observasi untuk simulasi: <strong>${state.preAssessment.focusArea}</strong>.
              </p>
              <div style="display:flex;justify-content:center;gap:36px;font-size:13px;color:var(--text);margin-bottom:24px;flex-wrap:wrap;">
                <div><strong>Mulai:</strong><br/>${startTimeStr}</div>
                <div><strong>Selesai:</strong><br/>${endTimeStr}</div>
              </div>
              <button class="btn btn-accent" id="btnOceanFinalNext" style="min-width:160px;">Next →</button>
            </div>
          </div>
        `;
        document.getElementById("btnOceanFinalNext").addEventListener("click", () => {
          if (state.preFlow) state.preFlow.diveEnd = new Date().toLocaleString("id-ID");
          if (state.inPreLobby) {
            state.preFlow.step = "lobby";
            persistPreProgress(gradeId);
            openPreAssessmentLobby(gradeId);
          } else if (state.fullFlow) nextInFlow();
          else renderReport();
        });
        return;
      }

      const isSample = oceanPhase === "sample";
      const grp = isSample ? sampleItems : pages[pageIdx];
      const map = isSample ? sampleMap : placements[pageIdx];
      const inPool = grp.filter((it) => map[it.id] === "pool");
      const inMost = grp.filter((it) => map[it.id] === "most");
      const inNeutral = grp.filter((it) => map[it.id] === "neutral");
      const inLeast = grp.filter((it) => map[it.id] === "least");
      const pageComplete = inMost.length === 1 && inNeutral.length === 3 && inLeast.length === 1;

      const renderCard = (it) => `
        <div class="dnd-card" draggable="true" data-drag-id="${it.id}">
          <div>${it.text}</div>
        </div>
      `;

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge ${isSample ? "amber" : ""}">${isSample ? "CONTOH PENGERJAAN (LATIHAN)" : `${data.title} • PRE-ASSESSMENT | PERSONALITY TEST`}</span>
              <h2 style="font-size:20px;color:var(--primary);">${isSample ? "Contoh Pengerjaan — Coba Pindahkan 5 Pernyataan" : `Memilih Pernyataan (Halaman ${pageIdx + 1} dari ${pages.length})`}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Geser (<em>drag &amp; drop</em>) 5 pernyataan di kiri ke 3 kotak kanan: <strong>1 Paling</strong>, <strong>3 Netral</strong>, <strong>1 Paling Sedikit</strong>.</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              ${connPill}
              ${!isSample ? `<span class="pill" style="background:#f1f5f9;color:var(--primary);">${pageIdx + (pageComplete ? 1 : 0)} of ${pages.length} Sets</span>` : ""}
              ${!isSample && isFull ? `<div class="timer-pill" id="oceanTimer">40:00</div>` : ""}
            </div>
          </div>

          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${Math.round(((pageIdx + (pageComplete ? 1 : 0)) / pages.length) * 100)}%"></div></div>

          <div class="dnd-layout">
            <div class="dnd-source-box" data-dropzone="pool">
              <div class="dnd-zone-header">
                <span>Statement (Pernyataan Tersisa)</span>
                <span class="pill ${inPool.length === 0 ? "pill-green" : "pill-amber"}">${inPool.length} / 5</span>
              </div>
              ${inPool.length === 0 ? `<div style="font-size:12.5px;color:var(--emerald-dark);font-weight:700;padding:14px 0;">✓ Semua 5 pernyataan sudah dipindahkan!</div>` : inPool.map((it) => renderCard(it, "pool")).join("")}
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
              <div class="dnd-dropzone" data-dropzone="most">
                <div class="dnd-zone-header">
                  <span>Paling Menggambarkan Saya</span>
                  <span class="pill ${inMost.length === 1 ? "pill-green" : "pill-amber"}">${inMost.length} / 1</span>
                </div>
                ${inMost.length === 0 ? `<div style="font-size:12px;color:var(--text-muted);">Tarik 1 pernyataan ke sini...</div>` : inMost.map((it) => renderCard(it, "most")).join("")}
              </div>

              <div class="dnd-dropzone" data-dropzone="neutral">
                <div class="dnd-zone-header">
                  <span>Netral</span>
                  <span class="pill ${inNeutral.length === 3 ? "pill-green" : "pill-amber"}">${inNeutral.length} / 3</span>
                </div>
                ${inNeutral.length === 0 ? `<div style="font-size:12px;color:var(--text-muted);">Tarik 3 pernyataan ke sini...</div>` : inNeutral.map((it) => renderCard(it, "neutral")).join("")}
              </div>

              <div class="dnd-dropzone" data-dropzone="least">
                <div class="dnd-zone-header">
                  <span>Paling Sedikit Menggambarkan Saya</span>
                  <span class="pill ${inLeast.length === 1 ? "pill-green" : "pill-amber"}">${inLeast.length} / 1</span>
                </div>
                ${inLeast.length === 0 ? `<div style="font-size:12px;color:var(--text-muted);">Tarik 1 pernyataan ke sini...</div>` : inLeast.map((it) => renderCard(it, "least")).join("")}
              </div>
            </div>
          </div>

          <div class="feedback-box warn" style="margin-top:16px;font-size:13px;">
            ⚠️ Pastikan Anda <strong>telah memindahkan semua pernyataan (5 pernyataan)</strong> ke dalam kotak kanan sesuai instruksi (1 Paling, 3 Netral, 1 Paling Sedikit). Jika belum lengkap, Anda tidak dapat melanjutkan ke halaman selanjutnya.
          </div>

          <div style="display:flex;justify-content:space-between;margin-top:16px;">
            <button class="btn btn-outline-dark" id="btnPrevOcean" ${!isSample && pageIdx === 0 ? "disabled" : ""}>← Sebelumnya</button>
            <button class="btn btn-accent" id="btnNextOcean" ${!pageComplete ? "disabled" : ""}>
              ${isSample ? "Mulai Soal Sebenarnya →" : pageIdx + 1 < pages.length ? "Halaman Selanjutnya →" : "Selesaikan Personality Test →"}
            </button>
          </div>
        </div>
      `;

      // Drag & Drop events
      document.querySelectorAll("[data-drag-id]").forEach((el) => {
        el.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", el.getAttribute("data-drag-id"));
        });
      });

      document.querySelectorAll("[data-dropzone]").forEach((zoneEl) => {
        zoneEl.addEventListener("dragover", (e) => {
          e.preventDefault();
          zoneEl.classList.add("drag-over");
        });
        zoneEl.addEventListener("dragleave", () => zoneEl.classList.remove("drag-over"));
        zoneEl.addEventListener("drop", (e) => {
          e.preventDefault();
          zoneEl.classList.remove("drag-over");
          const itemId = e.dataTransfer.getData("text/plain");
          if (itemId) moveCard(itemId, zoneEl.getAttribute("data-dropzone"));
        });
      });

      document.querySelectorAll("[data-move]").forEach((btn) => {
        btn.addEventListener("click", () => {
          moveCard(btn.getAttribute("data-move"), btn.getAttribute("data-zone"));
        });
      });

      document.getElementById("btnPrevOcean").addEventListener("click", () => {
        if (isSample) {
          oceanPhase = "instructions";
          draw();
        } else if (pageIdx > 0) {
          pageIdx--;
          draw();
        }
      });

      document.getElementById("btnNextOcean").addEventListener("click", () => {
        if (!pageComplete) return;
        if (isSample) {
          oceanPhase = "test";
          if (isFull) startTimer(2400, "oceanTimer", computeOceanResults);
          draw();
        } else if (pageIdx + 1 < pages.length) {
          pageIdx++;
          draw();
        } else {
          computeOceanResults();
        }
      });
    }

    draw();
  }

  // ======================== PSYCHOMETRIC TEST (BOD-5) ========================
  function renderPsychometric(gradeId) {
    const data = GRADES[gradeId];
    const isFull = state.examMode === "full";
    const genPsy = window.DATA_GENERAL ? window.DATA_GENERAL.psychometric_general : [];
    const sourcePsy =
      state.unitFilter === "Umum (Generik PortrAI)"
        ? genPsy
        : state.unitFilter === "Semua"
        ? [...data.psychometric, ...genPsy]
        : data.psychometric;
    const items = shuffleArray(sourcePsy).slice(0, isFull ? 10 : 6).map(shuffleQuizOptions);
    let idx = 0;
    let selected = null;
    let checked = false;
    let correctCount = 0;
    const missedAspects = [];

    startTimer(isFull ? 3600 : items.length * 90, "psyTimer", () => {
      state.flowResults.psychometric = Math.round((correctCount / items.length) * 100);
      state.flowResults.psychometricTelemetry = { correctCount, totalItems: items.length, missedAspects };
      if (state.preFlow) state.preFlow.coreEnd = new Date().toLocaleString("id-ID");
      persistPreProgress(gradeId);
      if (state.inPreLobby) {
        state.preFlow.step = "lobby";
        openPreAssessmentLobby(gradeId);
      } else if (state.fullFlow) nextInFlow();
      else renderReport();
    });

    function draw() {
      const q = items[idx];
      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge emerald">${data.title} • Cognitive Test (CORE — Profile V.4)</span>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Butir ${idx + 1}/${items.length} • Aspek: <strong>${q.aspect}</strong></div>
            </div>
            <div class="timer-pill" id="psyTimer">09:00</div>
          </div>

          <p style="font-size:16px;font-weight:600;margin-bottom:14px;">${q.question}</p>

          <div class="option-list">
            ${q.options
              .map((opt, i) => {
                let cls = "option-item";
                if (checked) {
                  if (i === q.answer) cls += " correct";
                  else if (i === selected) cls += " wrong";
                } else if (i === selected) {
                  cls += " selected";
                }
                return `
                  <div class="${cls}" data-opt="${i}">
                    <div class="option-key">${String.fromCharCode(65 + i)}</div>
                    <div>${opt}</div>
                  </div>
                `;
              })
              .join("")}
          </div>

          ${
            checked
              ? `
            <div class="feedback-box ${selected === q.answer ? "" : "warn"}">
              <strong>${selected === q.answer ? "✓ Tepat!" : "✕ Kurang Tepat."}</strong>
              <p style="margin-top:6px;">${q.explanation}</p>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnNextPsy">${idx + 1 < items.length ? "Butir Berikutnya" : "Lihat Hasil"}</button>
            </div>
          `
              : `
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnCheckPsy" ${selected === null ? "disabled" : ""}>Periksa</button>
            </div>
          `
          }
        </div>
      `;

      if (!checked) {
        document.querySelectorAll("[data-opt]").forEach((el) => {
          el.addEventListener("click", () => {
            selected = Number(el.getAttribute("data-opt"));
            draw();
          });
        });
        document.getElementById("btnCheckPsy").addEventListener("click", () => {
          checked = true;
          if (selected === q.answer) correctCount++;
          else missedAspects.push(q.aspect);
          draw();
        });
      } else {
        document.getElementById("btnNextPsy").addEventListener("click", () => {
          if (idx + 1 < items.length) {
            idx++;
            selected = null;
            checked = false;
            draw();
          } else {
            clearTimer();
            state.flowResults.psychometric = Math.round((correctCount / items.length) * 100);
            state.flowResults.psychometricTelemetry = { correctCount, totalItems: items.length, missedAspects };
            if (state.preFlow) state.preFlow.coreEnd = new Date().toLocaleString("id-ID");
            persistPreProgress(gradeId);
            if (state.inPreLobby) {
              state.preFlow.step = "lobby";
              openPreAssessmentLobby(gradeId);
            } else if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    draw();
  }

  // ======================== 4. MOTIVATION & VALUES TEST (MOVE) — BOD-5 ========================
  function renderMoveTest(gradeId) {
    clearTimer();
    const data = GRADES[gradeId];
    const items = data.move || [];
    const answers = {};
    let idx = 0;

    function finishMove() {
      const byDriver = {};
      let sum = 0;
      items.forEach((it) => {
        const val = answers[it.id] || 3;
        sum += val;
        if (!byDriver[it.driver]) byDriver[it.driver] = [];
        byDriver[it.driver].push(val);
      });
      const driverScores = {};
      Object.keys(byDriver).forEach((d) => {
        const avg = byDriver[d].reduce((a, b) => a + b, 0) / byDriver[d].length;
        driverScores[d] = Math.round((avg / 5) * 100);
      });
      const sorted = Object.entries(driverScores).sort((a, b) => b[1] - a[1]);
      const overall = Math.round((sum / (items.length * 5)) * 100);
      state.flowResults.move = overall;
      state.flowResults.moveTelemetry = {
        overall,
        driverScores,
        topDriver: sorted[0] ? `${sorted[0][0]} (${sorted[0][1]}/100)` : "-",
        lowDriver: sorted[sorted.length - 1] ? `${sorted[sorted.length - 1][0]} (${sorted[sorted.length - 1][1]}/100)` : "-"
      };
      if (state.preFlow) state.preFlow.moveEnd = new Date().toLocaleString("id-ID");
      persistPreProgress(gradeId);
      if (state.inPreLobby) {
        state.preFlow.step = "lobby";
        openPreAssessmentLobby(gradeId);
      } else {
        renderReport();
      }
    }

    function draw() {
      const it = items[idx];
      const curVal = answers[it.id] || null;
      const pct = Math.round(((idx + (curVal ? 1 : 0)) / items.length) * 100);
      const scaleLabels = [
        { v: 1, label: "1 — Sangat Tidak Sesuai" },
        { v: 2, label: "2 — Tidak Sesuai" },
        { v: 3, label: "3 — Netral / Cukup Sesuai" },
        { v: 4, label: "4 — Sesuai" },
        { v: 5, label: "5 — Sangat Sesuai / Mendorong Saya" }
      ];

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge emerald">${data.title} • Motivation &amp; Values Test (MOVE)</span>
              <h2 style="font-size:20px;color:var(--primary);">Motivation and Values at the Workplace</h2>
              <div style="font-size:13px;color:var(--text-muted);">Pernyataan ${idx + 1} dari ${items.length} • Pilih tingkat kesesuaian yang paling mencerminkan faktor motivasi &amp; nilai kerja Anda.</div>
            </div>
            <span class="pill" style="background:#f1f5f9;color:var(--primary);">${idx + 1} / ${items.length}</span>
          </div>

          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>

          <div class="memo-box" style="margin-top:16px;">
            <div style="font-size:12px;font-weight:700;color:var(--primary-light);text-transform:uppercase;margin-bottom:6px;">Dimensi Motivasi: ${it.driver}</div>
            <p style="font-size:16px;font-weight:700;color:var(--primary);line-height:1.6;">"${it.statement}"</p>
          </div>

          <div class="option-list" style="margin-top:14px;">
            ${scaleLabels
              .map(
                (s) => `
              <div class="option-item ${curVal === s.v ? "selected" : ""}" data-move-val="${s.v}">
                <div class="option-key">${s.v}</div>
                <div>${s.label}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div style="display:flex;justify-content:space-between;margin-top:18px;">
            <button class="btn btn-outline-dark" id="btnMovePrev" ${idx === 0 ? "disabled" : ""}>← Sebelumnya</button>
            <button class="btn btn-accent" id="btnMoveNext" ${!curVal ? "disabled" : ""}>
              ${idx + 1 < items.length ? "Pernyataan Berikutnya →" : "Selesaikan MOVE Test →"}
            </button>
          </div>
        </div>
      `;

      document.querySelectorAll("[data-move-val]").forEach((el) => {
        el.addEventListener("click", () => {
          answers[it.id] = Number(el.getAttribute("data-move-val"));
          draw();
        });
      });
      document.getElementById("btnMovePrev").addEventListener("click", () => {
        if (idx > 0) {
          idx--;
          draw();
        }
      });
      document.getElementById("btnMoveNext").addEventListener("click", () => {
        if (!answers[it.id]) return;
        if (idx + 1 < items.length) {
          idx++;
          draw();
        } else {
          finishMove();
        }
      });
    }

    draw();
  }

  // ======================== 6. SELF-PRESENTATION (BOD-5) ========================
  function renderSelfPresentation(gradeId) {
    clearTimer();
    const data = GRADES[gradeId];
    const lastCs =
      Array.isArray(state.flowResults.casestudyTelemetry) && state.flowResults.casestudyTelemetry[0]
        ? state.flowResults.casestudyTelemetry[0]
        : null;
    const topicTitle = lastCs
      ? `Presentasi Rekomendasi Solusi — ${lastCs.title}`
      : "Presentasi Mandiri: Profil Kontribusi, Analisis Masalah Kerja & Usulan Perbaikan Proses (BOD-5)";

    let scriptText = "";
    let recordedVideoUrl = null;
    let recordedAudioUrl = null;
    let activeStream = null;
    let mediaRecorder = null;
    let isRecording = false;
    let recMode = "video";
    let evaluated = false;

    function draw() {
      if (evaluated) {
        const words = scriptText.trim().split(/\s+/).filter(Boolean).length;
        const hasStruct = /(selamat|perkenalkan|masalah|analisis|solusi|rekomendasi|timeline|target|terima kasih)/i.test(scriptText);
        const hasNumbers = /\d+/.test(scriptText);
        const mediaBonus = recordedVideoUrl ? 22 : recordedAudioUrl ? 16 : 0;
        const score = Math.min(98, Math.max(48, (words >= 60 ? 45 : words >= 30 ? 32 : 18) + (hasStruct ? 18 : 6) + (hasNumbers ? 13 : 5) + mediaBonus));

        state.flowResults.presentation = score;
        state.flowResults.presentationTelemetry = {
          topicTitle,
          words,
          hasVideo: Boolean(recordedVideoUrl),
          hasAudio: Boolean(recordedAudioUrl),
          hasStruct,
          hasNumbers,
          score
        };
        if (state.preFlow) state.preFlow.presEnd = new Date().toLocaleString("id-ID");
        persistPreProgress(gradeId);

        root.innerHTML = `
          <div class="card">
            <div class="assess-header">
              <div>
                <span class="grade-badge emerald">${data.title} • Self-Presentation (Selesai)</span>
                <h2 style="font-size:20px;color:var(--primary);">Evaluasi Self-Presentation</h2>
              </div>
              <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
            </div>
            <div class="feedback-box info">
              <strong>Ringkasan Aktual Presentasi Anda:</strong>
              <ul style="margin-left:18px;margin-top:6px;font-size:13.5px;line-height:1.6;">
                <li>Media rekaman: <strong>${recordedVideoUrl ? "Video Kamera + Suara ✓" : recordedAudioUrl ? "Audio Saja ✓" : "Belum merekam kamera/suara (hanya skrip)"}</strong></li>
                <li>Panjang paparan/skrip: <strong>${words} kata</strong> • Struktur alur presentasi: <strong>${hasStruct ? "Terstruktur ✓" : "Perlu pembukaan–solusi–penutup"}</strong> • Angka/target: <strong>${hasNumbers ? "Ada ✓" : "Tambahkan metrik"}</strong></li>
              </ul>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-emerald" id="btnPresFinish">Selesai &amp; Kembali ke Daftar Aktivitas →</button>
            </div>
          </div>
        `;
        document.getElementById("btnPresFinish").addEventListener("click", () => {
          if (state.inPreLobby) {
            state.preFlow.step = "lobby";
            openPreAssessmentLobby(gradeId);
          } else {
            renderReport();
          }
        });
        return;
      }

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge emerald">${data.title} • 6. Self-Presentation</span>
              <h2 style="font-size:20px;color:var(--primary);">${topicTitle}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Sampaikan ide, analisis, dan rekomendasi Anda melalui rekaman kamera/suara secara tenang, runtut, dan meyakinkan (3–5 menit).</div>
            </div>
            <div class="timer-pill" id="presTimer">05:00</div>
          </div>

          <div class="feedback-box info" style="margin-top:0;margin-bottom:14px;font-size:13px;">
            <strong>Panduan Struktur Self-Presentation (3 Bagian):</strong>
            <ol style="margin-left:18px;margin-top:4px;">
              <li><strong>Pembukaan (30 dtk):</strong> Perkenalan singkat &amp; ringkasan inti masalah/tujuan.</li>
              <li><strong>Analisis &amp; Rekomendasi Solusi (90–120 dtk):</strong> Akar penyebab berbasis data, usulan perbaikan proses/digital, dan kolaborasi lintas tim.</li>
              <li><strong>Timeline, KPI &amp; Penutup (60 dtk):</strong> Target terukur, mitigasi kualitas, dan penutup yang percaya diri.</li>
            </ol>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
            <button class="btn ${isRecording && recMode === "video" ? "btn-danger" : "btn-primary"}" id="btnPresVideo" ${isRecording && recMode !== "video" ? "disabled" : ""}>
              ${isRecording && recMode === "video" ? "⏹ Stop Rekaman Video" : "🎥 Rekam Video Kamera + Suara"}
            </button>
            <button class="btn ${isRecording && recMode === "audio" ? "btn-danger" : "btn-outline-dark"}" id="btnPresAudio" ${isRecording && recMode !== "audio" ? "disabled" : ""}>
              ${isRecording && recMode === "audio" ? "⏹ Stop Rekaman Audio" : "🎙️ Rekam Audio Saja"}
            </button>
          </div>

          ${
            isRecording && recMode === "video"
              ? `<div style="margin-bottom:12px;"><video id="presLivePreview" autoplay muted playsinline style="width:100%;max-width:440px;border-radius:12px;border:2px solid #ef4444;background:#000;"></video><div style="font-size:12px;color:#dc2626;font-weight:700;margin-top:4px;">● Sedang merekam video &amp; transkripsi suara otomatis...</div></div>`
              : ""
          }
          ${recordedVideoUrl ? `<div style="margin-bottom:12px;"><video controls src="${recordedVideoUrl}" style="width:100%;max-width:440px;border-radius:12px;border:1px solid var(--border);"></video></div>` : ""}
          ${recordedAudioUrl ? `<div style="margin-bottom:12px;"><audio controls src="${recordedAudioUrl}" style="width:100%;max-width:440px;"></audio></div>` : ""}

          <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;">Transkrip Otomatis / Poin Skrip Presentasi Anda:</label>
          <textarea class="textarea-box" id="presScript" style="min-height:140px;" placeholder="Ucapan Anda saat merekam akan tertulis otomatis di sini, atau Anda dapat menuliskan poin presentasi secara langsung...">${scriptText}</textarea>

          <div style="display:flex;justify-content:flex-end;margin-top:14px;">
            <button class="btn btn-emerald" id="btnSubmitPres">Selesaikan &amp; Evaluasi Self-Presentation →</button>
          </div>
        </div>
      `;

      startTimer(300, "presTimer", () => {
        evaluated = true;
        draw();
      });

      if (isRecording && recMode === "video" && activeStream) {
        const vEl = document.getElementById("presLivePreview");
        if (vEl) vEl.srcObject = activeStream;
      }

      let speechRec = null;
      async function togglePresRec(mode) {
        if (!isRecording) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia(mode === "video" ? { video: true, audio: true } : { audio: true });
            activeStream = stream;
            recMode = mode;
            const chunks = [];
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };
            mediaRecorder.onstop = () => {
              if (speechRec) { try { speechRec.stop(); } catch {} speechRec = null; }
              const blob = new Blob(chunks, { type: mode === "video" ? "video/webm" : "audio/webm" });
              if (mode === "video") { recordedVideoUrl = URL.createObjectURL(blob); recordedAudioUrl = null; }
              else { recordedAudioUrl = URL.createObjectURL(blob); recordedVideoUrl = null; }
              stream.getTracks().forEach((t) => t.stop());
              activeStream = null;
              draw();
            };
            mediaRecorder.start();
            isRecording = true;

            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SR) {
              try {
                speechRec = new SR();
                speechRec.lang = "id-ID";
                speechRec.continuous = true;
                speechRec.interimResults = false;
                speechRec.onresult = (ev) => {
                  const last = ev.results[ev.results.length - 1][0].transcript;
                  scriptText = (scriptText ? scriptText + " " : "") + last;
                  const box = document.getElementById("presScript");
                  if (box) box.value = scriptText;
                };
                speechRec.start();
              } catch {}
            }
            draw();
          } catch {
            alert("Kamera/Mikrofon tidak tersedia atau izin ditolak. Anda tetap dapat menuliskan poin presentasi.");
          }
        } else {
          mediaRecorder.stop();
          isRecording = false;
        }
      }

      document.getElementById("btnPresVideo").addEventListener("click", () => togglePresRec("video"));
      document.getElementById("btnPresAudio").addEventListener("click", () => togglePresRec("audio"));
      document.getElementById("btnSubmitPres").addEventListener("click", () => {
        scriptText = document.getElementById("presScript").value.trim();
        if (scriptText.length < 25 && !recordedVideoUrl && !recordedAudioUrl) {
          alert("Mohon rekam video/audio presentasi atau tuliskan poin presentasi minimal 25 karakter.");
          return;
        }
        clearTimer();
        evaluated = true;
        draw();
      });
    }

    draw();
  }

  // ======================== REPORT & RADAR CHART ========================
  function renderReport() {
    clearTimer();
    const res = state.flowResults;
    const scores = [];

    if (res.potrai) {
      const avg = Math.round(res.potrai.reduce((a, b) => a + b, 0) / res.potrai.length);
      scores.push({ label: "PotrAI Simulation", score: avg });
    }
    if (typeof res.cap === "number") {
      scores.push({ label: "CAP (Career Achievement Portfolio)", score: res.cap });
    }
    if (typeof res.psychometric === "number") {
      scores.push({ label: "Cognitive Test (CORE)", score: res.psychometric });
    }
    if (res.personality) {
      scores.push({ label: "Personality Test (DIVE / OCEAN)", score: res.personality.overall });
    }
    if (typeof res.move === "number") {
      scores.push({ label: "Motivation & Values Test (MOVE)", score: res.move });
    }
    if (res.casestudy) {
      const avg = Math.round(res.casestudy.reduce((a, b) => a + b, 0) / res.casestudy.length);
      scores.push({ label: state.selectedGrade === "BOD-5" ? "Case Study (Tertulis)" : "Case Study + Async Presentation", score: avg });
    }
    if (typeof res.presentation === "number") {
      scores.push({ label: "Self-Presentation", score: res.presentation });
    }

    const totalAvg = scores.length ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0;
    const status =
      totalAvg >= 80
        ? { text: "Ready Now (Direkomendasikan)", cls: "pill-green" }
        : totalAvg >= 65
        ? { text: "Ready with Development", cls: "pill-amber" }
        : { text: "Need Strengthening", cls: "pill-red" };

    if (scores.length > 0) {
      const entry = {
        date: new Date().toLocaleString("id-ID"),
        participantName: state.participantName || "Anonim",
        participantNip: state.participantNip || "-",
        grade: state.selectedGrade,
        unit: state.unitFilter,
        score: totalAvg,
        status: status.text,
        details: scores
      };
      saveHistory(entry);
      if (window.SupabaseService) {
        window.SupabaseService.saveResult(entry).then((r) => {
          const el = document.getElementById("supaSaveInfo");
          if (el) {
            el.innerHTML = r.ok
              ? `<span class="pill pill-green">✓ Tersimpan di Server</span>`
              : `<span class="pill pill-amber">Tersimpan Lokal (${r.reason || "Server belum siap"})</span>`;
          }
        });
      }
    }

    // === BANGUN FEEDBACK 100% DARI BUKTI AKTUAL PENGERJAAN PESERTA ===
    const realStrengths = [];
    const realImprovements = [];

    // 1. Analisis Aktual Simulasi PortrAI
    if (Array.isArray(res.potraiTelemetry) && res.potraiTelemetry.length > 0) {
      res.potraiTelemetry.filter(Boolean).forEach((t) => {
        (t.strengths || []).forEach((s) => realStrengths.push(`[PortrAI] <strong>${s.area}:</strong> ${s.detail}`));
        (t.improvements || []).forEach((im) => realImprovements.push(`[PortrAI] <strong>${im.area}:</strong> ${im.detail}`));
      });
    }

    // 2. Analisis Aktual Career Achievement Portfolio (CAP)
    if (Array.isArray(res.capTelemetry) && res.capTelemetry.length > 0) {
      const capItems = res.capTelemetry.filter(Boolean);
      const avgCapWords = Math.round(capItems.reduce((a, c) => a + c.words, 0) / capItems.length);
      const fpOk = capItems.filter((c) => c.hasFirstPerson).length;
      const numOk = capItems.filter((c) => c.hasNumbers).length;
      const resOk = capItems.filter((c) => c.hasResultWord).length;
      const noNumComps = capItems.filter((c) => !c.hasNumbers).map((c) => c.competency);
      const noFpComps = capItems.filter((c) => !c.hasFirstPerson).map((c) => c.competency);

      if (avgCapWords >= 60 && fpOk === capItems.length && numOk === capItems.length) {
        realStrengths.push(
          `[CAP] <strong>Bukti Perilaku STAR Sangat Lengkap:</strong> Rata-rata ${avgCapWords} kata/soal, seluruh jawaban (${fpOk}/${capItems.length}) menegaskan peran pribadi ("Saya") dan menyertakan metrik angka terukur (${numOk}/${capItems.length}).`
        );
      } else {
        if (avgCapWords >= 50) {
          realStrengths.push(`[CAP] <strong>Elaborasi Cerita Baik:</strong> Rata-rata panjang jawaban Anda ${avgCapWords} kata per pertanyaan.`);
        } else {
          realImprovements.push(
            `[CAP] <strong>Jawaban Terlalu Singkat (Rata-rata ${avgCapWords} kata):</strong> Perdalam alur Situasi → Peran → Langkah Nyata → Hasil (idealnya minimal 70–100 kata per kasus) agar bukti perilaku mudah dinilai asesor.`
          );
        }
        if (fpOk < capItems.length) {
          realImprovements.push(
            `[CAP] <strong>Kepemilikan Tindakan ("Saya") Kurang Tegas (${fpOk}/${capItems.length}):</strong> Pada kompetensi <em>${noFpComps.join(", ")}</em>, perjelas kontribusi pribadi Anda dengan kata "Saya...", bukan hanya "Kami/Tim".`
          );
        }
        if (numOk < capItems.length) {
          realImprovements.push(
            `[CAP] <strong>Angka Dampak Terukur Belum Lengkap (${numOk}/${capItems.length}):</strong> Pada kompetensi <em>${noNumComps.join(", ")}</em>, belum ada angka konkret (%, Rp, target hari SLA, jumlah proyek).`
          );
        }
        if (resOk < capItems.length) {
          realImprovements.push(
            `[CAP] <strong>Penegasan Hasil Akhir (Result):</strong> Pastikan setiap cerita ditutup dengan dampak nyata yang dicapai bagi unit/perusahaan.`
          );
        }
      }
    }

    // 3. Analisis Aktual Personality Test (OCEAN)
    if (res.personality && res.personality.dimensions) {
      const dimEntries = Object.entries(res.personality.dimensions).sort((a, b) => b[1] - a[1]);
      const topDim = dimEntries[0];
      const lowDim = dimEntries[dimEntries.length - 1];
      const dimAdvice = {
        Openness: "Perkuat keberanian mengajukan inovasi proses, adaptasi teknologi digital, dan alternatif solusi di luar kebiasaan lama.",
        Conscientiousness: "Tingkatkan ketelitian terhadap detail SOP, struktur rencana kerja (PIC & timeline), serta disiplin evaluasi target.",
        Extraversion: "Perbanyak inisiatif komunikasi proaktif, keberanian memimpin diskusi stakeholder, dan energi dalam menginspirasi tim.",
        Agreeableness: "Perkuat empati saat merespon keluhan, bangun kesepakatan win-win lintas divisi, dan hindari nada terlalu konfrontatif.",
        "Emotional Stability": "Jaga ketenangan saat menerima interupsi/tekanan krisis (terutama saat Call & Chat mendesak) agar keputusan tetap objektif."
      };
      if (topDim) {
        realStrengths.push(
          `[Personality OCEAN] <strong>Dimensi Paling Menonjol — ${topDim[0]} (${topDim[1]}/100):</strong> Menjadi modal perilaku utama Anda dalam menjalankan peran ${state.selectedGrade}.`
        );
      }
      if (lowDim && lowDim[1] < 80) {
        realImprovements.push(
          `[Personality OCEAN] <strong>Area Prioritas Observasi — ${lowDim[0]} (${lowDim[1]}/100):</strong> ${dimAdvice[lowDim[0]] || "Selaraskan konsistensi perilaku dengan tuntutan kompetensi jabatan."}`
        );
      }
    }

    // 4. Analisis Aktual Case Study (BOD-5)
    if (Array.isArray(res.casestudyTelemetry) && res.casestudyTelemetry.length > 0) {
      res.casestudyTelemetry.filter(Boolean).forEach((cs) => {
        if (cs.writtenOnly) {
          if (cs.words >= 60 && cs.matchedKeywords.length >= 5) {
            realStrengths.push(
              `[Case Study] <strong>Analisis Tertulis Kuat (${cs.score}/100):</strong> ${cs.words} kata analisis mencakup ${cs.matchedKeywords.length} konsep kunci (${cs.matchedKeywords.slice(0, 5).join(", ")}).`
            );
          } else {
            realImprovements.push(
              `[Case Study] <strong>Kedalaman Analisis Tertulis (${cs.words} kata):</strong> Perdalam akar masalah berbasis data & solusi operasional; aspek yang belum tersentuh: ${(cs.missingKeywords || []).join(", ")}.`
            );
          }
        } else {
          if (cs.hasVideo || cs.hasAudio) {
            realStrengths.push(
              `[Case Study] <strong>Presentasi Asinkron Tercatat:</strong> Anda merekam ${cs.hasVideo ? "Video + Suara" : "Audio"} dengan total ${cs.words} kata analisis & ${cs.matchedKeywords.length} konsep kunci.`
            );
          } else {
            realImprovements.push(
              `[Case Study] <strong>Rekaman Presentasi Belum Dilakukan:</strong> Anda hanya mengisi teks (${cs.words} kata) tanpa rekaman video/audio.`
            );
          }
          if (cs.missingKeywords && cs.missingKeywords.length > 0 && cs.matchedKeywords.length < 5) {
            realImprovements.push(
              `[Case Study] <strong>Aspek Analisis yang Belum Disentuh:</strong> Pertimbangkan membahas poin berikut: ${cs.missingKeywords.join(", ")}.`
            );
          }
        }
      });
    }

    // 5. Analisis Aktual Cognitive Test (CORE) — BOD-5
    if (typeof res.psychometric === "number") {
      const pt = res.psychometricTelemetry;
      if (res.psychometric >= 80) {
        realStrengths.push(
          `[Cognitive Test CORE] <strong>Ketepatan Kognitif Tinggi (${res.psychometric}/100${pt ? ` • ${pt.correctCount}/${pt.totalItems} benar` : ""}):</strong> Logika analitis, numerik efisiensi, dan ketelitian data sudah sangat siap.`
        );
      } else {
        realImprovements.push(
          `[Cognitive Test CORE] <strong>Akurasi Kognitif Perlu Ditingkatkan (${res.psychometric}/100${pt ? ` • ${pt.correctCount}/${pt.totalItems} benar` : ""}):</strong>${pt && pt.missedAspects && pt.missedAspects.length ? ` Aspek yang masih keliru: <em>${[...new Set(pt.missedAspects)].join(", ")}</em>.` : " Latih ketelitian membaca angka, pola deret, dan manajemen waktu."}`
        );
      }
    }

    // 6. Analisis Aktual Motivation & Values Test (MOVE) — BOD-5
    if (res.moveTelemetry) {
      realStrengths.push(
        `[MOVE — Motivation & Values] <strong>Pendorong Motivasi Utama:</strong> ${res.moveTelemetry.topDriver} — selaraskan peran kerja harian dengan nilai ini agar energi kerja tetap optimal.`
      );
      if (res.moveTelemetry.lowDriver) {
        realImprovements.push(
          `[MOVE — Motivation & Values] <strong>Area Penguatan Nilai Kerja:</strong> ${res.moveTelemetry.lowDriver} — bangun kebiasaan positif pada dimensi ini untuk menunjang 10 Kompetensi IFG BOD-5.`
        );
      }
    }

    // 7. Analisis Aktual Self-Presentation — BOD-5
    if (res.presentationTelemetry) {
      const pr = res.presentationTelemetry;
      if (pr.hasVideo || pr.hasAudio) {
        realStrengths.push(
          `[Self-Presentation] <strong>Rekaman Presentasi Mandiri (${pr.score}/100):</strong> Anda merekam ${pr.hasVideo ? "Video Kamera + Suara" : "Audio"} (${pr.words} kata)${pr.hasStruct ? " dengan alur pembukaan–solusi–penutup yang runtut" : ""}.`
        );
      } else {
        realImprovements.push(
          `[Self-Presentation] <strong>Belum Merekam Kamera/Suara (${pr.words} kata skrip):</strong> Pada asesmen resmi BOD-5, artikulasi suara, kontak mata kamera, dan gestur presentasi dinilai langsung oleh asesor.`
        );
      }
      if (!pr.hasNumbers) {
        realImprovements.push(
          `[Self-Presentation] <strong>Tambahkan Metrik/Target dalam Paparan:</strong> Sebutkan angka target KPI, persentase efisiensi, atau batas waktu implementasi agar presentasi lebih meyakinkan.`
        );
      }
    }

    root.innerHTML = `
      <div class="card">
        <div class="assess-header">
          <div>
            <span class="grade-badge">${GRADES[state.selectedGrade].title}</span>
            <h2 style="font-size:22px;color:var(--primary);">Laporan Hasil Simulasi Asesmen</h2>
            <div style="font-size:13px;color:var(--text-muted);">Fokus Unit: ${state.unitFilter} • Evaluasi 100% Berbasis Bukti Pengerjaan Aktual</div>
          </div>
          <div style="text-align:right;">
            <div class="score-big">${totalAvg}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
            <span class="pill ${status.cls}">${status.text}</span>
            <div id="supaSaveInfo" style="margin-top:6px;"></div>
          </div>
        </div>

        <div class="grid-2">
          <div>
            <h3 style="font-size:16px;color:var(--primary);margin-bottom:10px;">Rincian Skor Metode</h3>
            <ul class="method-list">
              ${scores
                .map(
                  (s) => `
                <li>
                  <strong>${s.label}</strong>
                  <span class="pill ${s.score >= 80 ? "pill-green" : s.score >= 65 ? "pill-amber" : "pill-red"}">${s.score} / 100</span>
                </li>
              `
                )
                .join("")}
            </ul>

            <div class="feedback-box info" style="margin-top:12px;">
              <strong>✅ Kekuatan Nyata dari Pengerjaan Anda:</strong>
              <ul style="margin-left:18px;margin-top:8px;font-size:13px;line-height:1.65;">
                ${
                  realStrengths.length > 0
                    ? realStrengths.map((item) => `<li>${item}</li>`).join("")
                    : `<li>Belum cukup bukti pengerjaan yang tuntas pada sesi ini. Selesaikan seluruh modul agar kekuatan perilaku Anda dapat terpetakan.</li>`
                }
              </ul>
            </div>

            <div class="feedback-box warn" style="margin-top:12px;">
              <strong>🛠️ Perbaikan Spesifik Berdasarkan Aktivitas &amp; Jawaban Anda:</strong>
              <ul style="margin-left:18px;margin-top:8px;font-size:13px;line-height:1.65;">
                ${
                  realImprovements.length > 0
                    ? realImprovements.map((item) => `<li>${item}</li>`).join("")
                    : `<li>Luar biasa! Seluruh indikator utama pada modul yang Anda kerjakan sudah terpenuhi secara lengkap, cepat, dan terukur.</li>`
                }
              </ul>
            </div>
          </div>

          ${
            res.personality
              ? `
            <div style="text-align:center;">
              <h3 style="font-size:16px;color:var(--primary);margin-bottom:8px;">Profil 5 Dimensi OCEAN</h3>
              ${buildRadarSvg(res.personality.dimensions)}
            </div>
          `
              : `
            <div class="memo-box">
              <h4>Catatan Asesor</h4>
              <p>Jalankan <strong>Simulasi Lengkap (${state.selectedGrade})</strong> untuk melihat profil gabungan seluruh 3 metode asesmen.</p>
            </div>
          `
          }
        </div>

        <div class="memo-box" style="margin-top:22px;border-left-color:var(--accent);background:linear-gradient(135deg,#fffbf5 0%,#f8fafc 100%);">
          <h3 style="font-size:16px;color:var(--primary);margin-bottom:6px;">🎯 Tips &amp; Trik Strategi Pengerjaan Asesmen yang Benar (${state.selectedGrade})</h3>
          <p style="font-size:12.5px;color:var(--text-muted);margin-bottom:14px;">
            Panduan praktis berikut merangkum pola perilaku yang dinilai tinggi oleh asesor pada Assessment Center resmi (DDI × IFG):
          </p>
          <div class="grid-2" style="gap:12px;">
            <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;">
              <div style="font-weight:800;font-size:13.5px;color:var(--primary);margin-bottom:6px;">💬 1. Chat (Pesan Singkat) — Cepat &amp; To the Point</div>
              <ul style="margin-left:16px;font-size:12.5px;color:var(--text);line-height:1.6;">
                <li><strong>Jangan dibiarkan lama tanpa balasan</strong> saat notifikasi chat masuk — respon cepat menunjukkan <em>Customer Orientation</em> &amp; <em>Driving for Results</em>.</li>
                <li><strong>Jangan menulis terlalu panjang seperti email.</strong> Balas ringkas (2–4 kalimat), hangat, langsung sebutkan langkah tindak lanjut &amp; jam targetnya.</li>
                <li><em>Contoh baik:</em> "Baik Bu, terima kasih infonya. Saya segera koordinasikan dengan tim Operasional sekarang dan kirim opsi penyelesaiannya via email maksimal pukul 15.00 hari ini."</li>
              </ul>
            </div>

            <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;">
              <div style="font-weight:800;font-size:13.5px;color:var(--primary);margin-bottom:6px;">📧 2. Email (Inbox) — Tuntas, Terstruktur &amp; Berbasis Data</div>
              <ul style="margin-left:16px;font-size:12.5px;color:var(--text);line-height:1.6;">
                <li><strong>Wajib balas seluruh email masuk</strong> sebelum waktu habis — setiap email memetakan kompetensi berbeda (bahkan yang terlihat rutin).</li>
                <li>Prioritaskan email krisis/eskalasi terlebih dahulu, lalu gunakan struktur: <strong>Sikap/Keputusan → Dasar Data → Langkah Aksi → PIC &amp; Deadline</strong>.</li>
                <li>Hindari membalas hanya <em>"Baik, akan saya pelajari"</em> tanpa arah solusi atau keputusan konkret.</li>
              </ul>
            </div>

            <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;">
              <div style="font-weight:800;font-size:13.5px;color:var(--primary);margin-bottom:6px;">📞 3. Telepon Masuk (Call) — Tenang &amp; Solutif</div>
              <ul style="margin-left:16px;font-size:12.5px;color:var(--text);line-height:1.6;">
                <li><strong>Segera angkat panggilan masuk</strong> (jangan diabaikan/ditolak) agar tidak kehilangan poin kompetensi kepemimpinan saat krisis.</li>
                <li>Tetap tenang meski lawan bicara panik/mendesak: <strong>akui urgensi → tanyakan 1–2 fakta kunci → beri arahan sementara + komitmen follow-up</strong>.</li>
                <li>Jangan menyalahkan divisi lain atau membuat janji di luar kewenangan jabatan Anda.</li>
              </ul>
            </div>

            <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;">
              <div style="font-weight:800;font-size:13.5px;color:var(--primary);margin-bottom:6px;">📄 4. Dokumen Analisa &amp; AI Assistant</div>
              <ul style="margin-left:16px;font-size:12.5px;color:var(--text);line-height:1.6;">
                <li>Susun memo/laporan eksekutif dengan pola: <strong>Ringkasan Masalah → Akar Penyebab (Angka) → Rekomendasi &amp; Mitigasi Risiko → PIC &amp; Timeline</strong>.</li>
                <li>Gunakan <em>AI Assistant</em> untuk membantu merangkum data atau mengecek kerangka, <strong>jangan copy-paste mentah</strong> tanpa menyesuaikan angka &amp; konteks jabatan Anda.</li>
                <li>Cek folder <em>Documents</em> sejak awal agar keputusan Anda di Email/Chat konsisten dengan data perusahaan.</li>
              </ul>
            </div>

            <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;">
              <div style="font-weight:800;font-size:13.5px;color:var(--primary);margin-bottom:6px;">🧠 5. Personality Test &amp; CAP (Pre-Assessment)</div>
              <ul style="margin-left:16px;font-size:12.5px;color:var(--text);line-height:1.6;">
                <li><strong>Personality Test:</strong> Jawab spontan, jujur, dan konsisten sesuai kebiasaan kerja nyata. Jangan memanipulasi agar terlihat "sempurna" (<em>faking good</em>) karena terdeteksi oleh cek konsistensi.</li>
                <li><strong>CAP:</strong> Gunakan pola <strong>STAR</strong> (<em>Situation–Task–Action–Result</em>) dari pengalaman nyata 2 tahun terakhir, perbanyak kata <strong>"Saya..."</strong> (bukan hanya "Kami"), dan wajib cantumkan <strong>angka dampak terukur</strong> (%, Rp, SLA).</li>
              </ul>
            </div>

            <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;">
              <div style="font-weight:800;font-size:13.5px;color:var(--primary);margin-bottom:6px;">⏱️ 6. Manajemen Waktu &amp; Peran Jabatan</div>
              <ul style="margin-left:16px;font-size:12.5px;color:var(--text);line-height:1.6;">
                <li><strong>Selalu berpikir sesuai level jabatan (${state.selectedGrade}):</strong> ${
                  state.selectedGrade === "BOD-3"
                    ? "fokus pada arah strategis lintas divisi, dampak bisnis jangka panjang, tata kelola, dan coaching pimpinan unit."
                    : state.selectedGrade === "BOD-4"
                    ? "fokus pada eksekusi taktis, koordinasi lintas tim, kontrol SLA/KPI, dan pembinaan anggota tim secara langsung."
                    : "fokus pada akurasi analisis masalah, solusi operasional yang realistis, dan presentasi kamera yang terstruktur (30 dtk ringkasan, 90 dtk solusi, 60 dtk timeline)."
                }</li>
                <li>Sisakan <strong>10–15 menit terakhir</strong> untuk memastikan tidak ada email draft yang belum terkirim atau chat penting yang terlewat.</li>
              </ul>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;flex-wrap:wrap;">
          <button class="btn btn-outline-dark" id="btnPrintReport">Cetak / Simpan PDF</button>
          <button class="btn btn-primary" id="btnBackHome">Kembali ke Beranda</button>
        </div>
      </div>
    `;

    document.getElementById("btnBackHome").addEventListener("click", renderHome);
    document.getElementById("btnPrintReport").addEventListener("click", () => window.print());
  }

  function buildRadarSvg(dims) {
    const keys = Object.keys(dims);
    const n = keys.length;
    if (n < 3) return "";
    const cx = 165,
      cy = 140,
      r = 90;
    const angleStep = (Math.PI * 2) / n;

    const rings = [0.25, 0.5, 0.75, 1].map((scale) => {
      const pts = keys
        .map((_, i) => {
          const a = -Math.PI / 2 + i * angleStep;
          return `${cx + r * scale * Math.cos(a)},${cy + r * scale * Math.sin(a)}`;
        })
        .join(" ");
      return `<polygon points="${pts}" fill="none" stroke="#cbd5e1" stroke-width="1"/>`;
    });

    const axes = keys.map((k, i) => {
      const a = -Math.PI / 2 + i * angleStep;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      const lx = cx + (r + 26) * Math.cos(a);
      const ly = cy + (r + 18) * Math.sin(a);
      return `
        <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#cbd5e1" stroke-width="1"/>
        <text x="${lx}" y="${ly}" font-size="10" font-weight="600" fill="#1e293b" text-anchor="middle">${k} (${dims[k]})</text>
      `;
    });

    const dataPts = keys
      .map((k, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const val = (dims[k] / 100) * r;
        return `${cx + val * Math.cos(a)},${cy + val * Math.sin(a)}`;
      })
      .join(" ");

    return `
      <svg viewBox="0 0 330 280" style="max-width:350px;width:100%;">
        ${rings.join("")}
        ${axes.join("")}
        <polygon points="${dataPts}" fill="rgba(15, 44, 89, 0.25)" stroke="#0f2c59" stroke-width="2.5"/>
      </svg>
    `;
  }

  // ======================== HISTORY VIEW ========================
  async function renderHistory() {
    if (!state.currentUser) return renderLogin();
    clearTimer();
    let list = getHistory();
    let sourceLabel = "Penyimpanan Lokal Browser";

    if (window.SupabaseService) {
      const nipFilter = state.currentUser.role === "admin" ? null : state.currentUser.nip;
      const res = await window.SupabaseService.fetchResults(50, nipFilter);
      if (res.ok && res.data) {
        sourceLabel = state.currentUser.role === "admin" ? "Database Pusat (Semua Pegawai)" : `Database Pusat (NIP: ${state.currentUser.nip})`;
        list = res.data.map((row) => ({
          date: new Date(row.created_at).toLocaleString("id-ID"),
          participantName: row.participant_name,
          participantNip: row.participant_nip,
          grade: row.grade,
          unit: row.unit,
          score: row.score,
          status: row.status
        }));
      }
    }

    root.innerHTML = `
      <div class="card">
        <div class="assess-header">
          <div>
            <h2 style="font-size:20px;color:var(--primary);">Riwayat Skor Simulasi</h2>
            <div style="font-size:13px;color:var(--text-muted);">Sumber: <strong>${sourceLabel}</strong></div>
          </div>
          <button class="btn btn-outline-dark btn-sm" id="btnClearHist">Hapus Riwayat Lokal</button>
        </div>
        ${
          list.length === 0
            ? `<p style="color:var(--text-muted);">Belum ada riwayat simulasi. Silakan mulai latihan dari Beranda.</p>`
            : `
          <table class="data-table">
            <thead>
              <tr><th>Waktu</th><th>Peserta</th><th>Grade</th><th>Unit Fokus</th><th>Skor</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${list
                .map(
                  (it) => `
                <tr>
                  <td>${it.date}</td>
                  <td>${it.participantName || "Anonim"} (${it.participantNip || "-"})</td>
                  <td><strong>${it.grade}</strong></td>
                  <td>${it.unit}</td>
                  <td><strong>${it.score}/100</strong></td>
                  <td>${it.status}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `
        }
        <div style="margin-top:16px;">
          <button class="btn btn-primary" id="btnHistBack">Kembali ke Beranda</button>
        </div>
      </div>
    `;
    document.getElementById("btnHistBack").addEventListener("click", renderHome);
    document.getElementById("btnClearHist").addEventListener("click", () => {
      localStorage.removeItem("askrindo_sim_history_v2");
      renderHistory();
    });
  }

  // ======================== ADMIN PANEL (KELOLA PEGAWAI) ========================
  async function renderAdminPanel() {
    if (!state.currentUser || state.currentUser.role !== "admin") return renderHome();
    clearTimer();
    let adminTab = "users"; // users | results
    let users = [];
    let results = [];
    let searchQ = "";
    let gradeFilter = "Semua";
    let statusMsg = "";
    let editingId = null;

    async function loadData() {
      const uRes = await window.SupabaseService.fetchAllUsers();
      if (uRes.ok) users = uRes.data;
      const rRes = await window.SupabaseService.fetchResults(200, null);
      if (rRes.ok) results = rRes.data;
      draw();
    }

    function draw() {
      const filteredUsers = users.filter((u) => {
        const q = searchQ.toLowerCase();
        const matchQ = !q || u.nip.toLowerCase().includes(q) || u.full_name.toLowerCase().includes(q) || u.unit.toLowerCase().includes(q);
        const matchG =
          gradeFilter === "Semua"
            ? true
            : gradeFilter === "ADMIN"
            ? u.role === "admin"
            : u.role !== "admin" && u.grade === gradeFilter;
        return matchQ && matchG;
      });

      const filteredResults = results.filter((r) => gradeFilter === "Semua" || r.grade === gradeFilter);

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge amber">Panel Administrator SDM</span>
              <h2 style="font-size:22px;color:var(--primary);">Kelola Data User Pegawai &amp; Rekap Asesmen</h2>
              <p style="font-size:12.5px;color:var(--text-muted);margin-top:4px;">Akun Administrator khusus untuk pengelolaan user pegawai, verifikasi akun, dan pemantauan rekap hasil asesmen.</p>
            </div>
          </div>

          <div class="potrai-tabs">
            <button class="potrai-tab ${adminTab === "users" ? "active" : ""}" data-atab="users">Data User Pegawai (${users.length})</button>
            <button class="potrai-tab ${adminTab === "results" ? "active" : ""}" data-atab="results">Rekap Hasil Asesmen (${results.length})</button>
          </div>

          ${statusMsg ? `<div class="feedback-box info" style="margin-top:0;margin-bottom:14px;">${statusMsg}</div>` : ""}

          ${
            adminTab === "users"
              ? `
            <div class="memo-box" style="border-left-color:var(--emerald);background:#f0fdf4;">
              <h4>Tambah Akun Pegawai / Admin Baru</h4>
              <div class="grid-3" style="gap:10px;margin-top:10px;">
                <input type="text" id="newNip" class="select-input" style="min-width:0;" placeholder="NIP / Username *" />
                <input type="text" id="newName" class="select-input" style="min-width:0;" placeholder="Nama Lengkap *" />
                <input type="password" id="newPw" class="select-input" style="min-width:0;" placeholder="Password awal *" />
                <select id="newGrade" class="select-input" style="min-width:0;">
                  <option value="BOD-3">BOD-3 (Grade 15–16)</option>
                  <option value="BOD-4" selected>BOD-4 (Grade 12–14)</option>
                  <option value="BOD-5">BOD-5 (Grade 8–11)</option>
                </select>
                <select id="newUnit" class="select-input" style="min-width:0;">
                  ${renderUnitOptions("Underwriting", false)}
                </select>
                <select id="newRole" class="select-input" style="min-width:0;">
                  <option value="pegawai" selected>Role: Pegawai</option>
                  <option value="admin">Role: Admin</option>
                </select>
              </div>
              <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                <label id="newAllGradesWrap" style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;cursor:pointer;">
                  <input type="checkbox" id="newAllGrades" /> Izinkan akses semua grade (BOD-3, BOD-4, BOD-5)
                </label>
                <span id="newAdminNote" style="display:none;font-size:12.5px;color:#92400e;font-weight:600;">
                  🛡️ Akun Admin tidak memiliki grade dan hanya berfungsi mengelola user.
                </span>
                <button class="btn btn-emerald btn-sm" id="btnAddUser">+ Tambah User</button>
              </div>
            </div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
              <input type="text" id="adminSearch" class="select-input" style="flex:1;" placeholder="Cari NIP, nama, atau unit..." value="${searchQ}" />
              <select id="adminGradeFilter" class="select-input" style="min-width:160px;">
                <option value="Semua" ${gradeFilter === "Semua" ? "selected" : ""}>Semua Grade</option>
                <option value="ADMIN" ${gradeFilter === "ADMIN" ? "selected" : ""}>Admin</option>
                <option value="BOD-3" ${gradeFilter === "BOD-3" ? "selected" : ""}>BOD-3</option>
                <option value="BOD-4" ${gradeFilter === "BOD-4" ? "selected" : ""}>BOD-4</option>
                <option value="BOD-5" ${gradeFilter === "BOD-5" ? "selected" : ""}>BOD-5</option>
              </select>
            </div>

            <div style="overflow-x:auto;">
              <table class="data-table">
                <thead>
                  <tr><th>NIP</th><th>Nama Lengkap</th><th>Grade</th><th>Semua Grade</th><th>Unit</th><th>Role</th><th>Status</th><th>Aksi</th></tr>
                </thead>
                <tbody>
                  ${filteredUsers
                    .map((u) =>
                      editingId === u.id
                        ? `
                    <tr>
                      <td><strong>${u.nip}</strong></td>
                      <td><input type="text" id="editName" class="select-input" style="min-width:140px;padding:4px 8px;" value="${u.full_name}" /></td>
                      <td>
                        <select id="editGrade" class="select-input" style="min-width:95px;padding:4px 6px;${u.role === "admin" ? "display:none;" : ""}">
                          <option value="BOD-3" ${u.grade === "BOD-3" ? "selected" : ""}>BOD-3</option>
                          <option value="BOD-4" ${u.grade === "BOD-4" ? "selected" : ""}>BOD-4</option>
                          <option value="BOD-5" ${u.grade === "BOD-5" ? "selected" : ""}>BOD-5</option>
                        </select>
                        <span id="editGradeAdminBadge" class="pill pill-amber" style="${u.role === "admin" ? "" : "display:none;"}">Admin</span>
                      </td>
                      <td style="text-align:center;">
                        <input type="checkbox" id="editAllGrades" ${u.allow_all_grades ? "checked" : ""} title="Izinkan semua grade" style="${u.role === "admin" ? "display:none;" : ""}" />
                        <span id="editAllGradesAdminDash" style="color:var(--text-muted);${u.role === "admin" ? "" : "display:none;"}">—</span>
                      </td>
                      <td>
                        <select id="editUnit" class="select-input" style="min-width:140px;padding:4px 6px;">
                          ${renderUnitOptions(u.unit, false)}
                        </select>
                      </td>
                      <td>
                        <select id="editRole" class="select-input" style="min-width:95px;padding:4px 6px;">
                          <option value="pegawai" ${u.role === "pegawai" ? "selected" : ""}>pegawai</option>
                          <option value="admin" ${u.role === "admin" ? "selected" : ""}>admin</option>
                        </select>
                      </td>
                      <td>
                        <select id="editActive" class="select-input" style="min-width:85px;padding:4px 6px;">
                          <option value="true" ${u.is_active ? "selected" : ""}>Aktif</option>
                          <option value="false" ${!u.is_active ? "selected" : ""}>Nonaktif</option>
                        </select>
                      </td>
                      <td style="white-space:nowrap;">
                        <button class="btn btn-emerald btn-sm" data-save-user="${u.id}">Simpan</button>
                        <button class="btn btn-outline-dark btn-sm" id="btnCancelEdit">Batal</button>
                      </td>
                    </tr>
                  `
                        : `
                    <tr>
                      <td><strong>${u.nip}</strong></td>
                      <td>${u.full_name}</td>
                      <td>${u.role === "admin" ? `<span class="pill pill-amber">Admin</span>` : u.grade}</td>
                      <td style="text-align:center;">${
                        u.role === "admin"
                          ? `<span style="color:var(--text-muted);">— (Non-Asesi)</span>`
                          : u.allow_all_grades
                          ? `<span class="pill pill-green">✓ Ya</span>`
                          : `<span style="color:var(--text-muted);">Hanya ${u.grade}</span>`
                      }</td>
                      <td>${u.unit}</td>
                      <td><span class="pill ${u.role === "admin" ? "pill-amber" : "pill-green"}">${u.role}</span></td>
                      <td>${u.is_active ? `<span class="pill pill-green">Aktif</span>` : `<span class="pill pill-red">Menunggu Verifikasi</span>`}</td>
                      <td style="white-space:nowrap;">
                        ${!u.is_active ? `<button class="btn btn-emerald btn-sm" data-verify-user="${u.id}" data-nip="${u.nip}">✓ Verifikasi</button>` : ""}
                        <button class="btn btn-outline-dark btn-sm" data-edit-user="${u.id}">Edit</button>
                        <button class="btn btn-outline-dark btn-sm" data-reset-pw="${u.id}" data-nip="${u.nip}">Reset PW</button>
                        ${u.nip !== state.currentUser.nip ? `<button class="btn btn-danger btn-sm" data-del-user="${u.id}" data-nip="${u.nip}">Hapus</button>` : ""}
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `
              : `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">
              <select id="adminGradeFilter" class="select-input" style="min-width:160px;">
                <option value="Semua" ${gradeFilter === "Semua" ? "selected" : ""}>Semua Grade</option>
                <option value="BOD-3" ${gradeFilter === "BOD-3" ? "selected" : ""}>BOD-3</option>
                <option value="BOD-4" ${gradeFilter === "BOD-4" ? "selected" : ""}>BOD-4</option>
                <option value="BOD-5" ${gradeFilter === "BOD-5" ? "selected" : ""}>BOD-5</option>
              </select>
              <button class="btn btn-primary btn-sm" id="btnExportCsv">Export CSV Rekap</button>
            </div>
            <div style="overflow-x:auto;">
              <table class="data-table">
                <thead>
                  <tr><th>Waktu</th><th>NIP</th><th>Nama</th><th>Grade</th><th>Unit</th><th>Skor</th><th>Status</th></tr>
                </thead>
                <tbody>
                  ${filteredResults
                    .map(
                      (r) => `
                    <tr>
                      <td>${new Date(r.created_at).toLocaleString("id-ID")}</td>
                      <td>${r.participant_nip}</td>
                      <td>${r.participant_name}</td>
                      <td><strong>${r.grade}</strong></td>
                      <td>${r.unit}</td>
                      <td><strong>${r.score}/100</strong></td>
                      <td>${r.status}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `
          }
        </div>
      `;

      document.querySelectorAll("[data-atab]").forEach((b) => {
        b.addEventListener("click", () => {
          adminTab = b.getAttribute("data-atab");
          statusMsg = "";
          draw();
        });
      });

      const gf = document.getElementById("adminGradeFilter");
      if (gf) {
        gf.addEventListener("change", (e) => {
          gradeFilter = e.target.value;
          draw();
        });
      }

      if (adminTab === "users") {
        document.getElementById("adminSearch").addEventListener("input", (e) => {
          searchQ = e.target.value;
          draw();
        });

        const newRoleEl = document.getElementById("newRole");
        const newGradeEl = document.getElementById("newGrade");
        const newAllGradesWrap = document.getElementById("newAllGradesWrap");
        const newAdminNote = document.getElementById("newAdminNote");
        if (newRoleEl && newGradeEl) {
          const syncNewRoleUi = () => {
            const isAdm = newRoleEl.value === "admin";
            newGradeEl.disabled = isAdm;
            newGradeEl.style.opacity = isAdm ? "0.45" : "1";
            if (newAllGradesWrap) newAllGradesWrap.style.display = isAdm ? "none" : "flex";
            if (newAdminNote) newAdminNote.style.display = isAdm ? "inline" : "none";
          };
          newRoleEl.addEventListener("change", syncNewRoleUi);
          syncNewRoleUi();
        }

        document.getElementById("btnAddUser").addEventListener("click", async () => {
          const nip = document.getElementById("newNip").value.trim();
          const full_name = document.getElementById("newName").value.trim();
          const password = document.getElementById("newPw").value;
          const role = document.getElementById("newRole").value;
          const grade = role === "admin" ? "BOD-3" : document.getElementById("newGrade").value;
          const unit = document.getElementById("newUnit").value;
          const allow_all_grades = role === "admin" ? false : document.getElementById("newAllGrades").checked;
          if (!nip || !full_name || password.length < 6) {
            statusMsg = "NIP, Nama Lengkap, dan Password (min. 6 karakter) wajib diisi.";
            draw();
            return;
          }
          const res = await window.SupabaseService.createUser({ nip, full_name, password, role, grade, unit, is_active: true, allow_all_grades });
          statusMsg = res.ok ? `✓ User ${nip} (${full_name}) berhasil ditambahkan.` : `✕ Gagal: ${res.reason}`;
          await loadData();
        });

        document.querySelectorAll("[data-verify-user]").forEach((b) => {
          b.addEventListener("click", async () => {
            const id = b.getAttribute("data-verify-user");
            const nip = b.getAttribute("data-nip");
            const res = await window.SupabaseService.updateUser(id, { is_active: true });
            statusMsg = res.ok ? `✓ Akun ${nip} berhasil diverifikasi & diaktifkan.` : `✕ Gagal verifikasi: ${res.reason}`;
            await loadData();
          });
        });

        document.querySelectorAll("[data-edit-user]").forEach((b) => {
          b.addEventListener("click", () => {
            editingId = b.getAttribute("data-edit-user");
            draw();
          });
        });

        const btnCancel = document.getElementById("btnCancelEdit");
        if (btnCancel) {
          btnCancel.addEventListener("click", () => {
            editingId = null;
            draw();
          });
        }

        const editRoleEl = document.getElementById("editRole");
        if (editRoleEl) {
          editRoleEl.addEventListener("change", () => {
            const isAdm = editRoleEl.value === "admin";
            const eg = document.getElementById("editGrade");
            const egb = document.getElementById("editGradeAdminBadge");
            const eag = document.getElementById("editAllGrades");
            const eagd = document.getElementById("editAllGradesAdminDash");
            if (eg) eg.style.display = isAdm ? "none" : "";
            if (egb) egb.style.display = isAdm ? "" : "none";
            if (eag) eag.style.display = isAdm ? "none" : "";
            if (eagd) eagd.style.display = isAdm ? "" : "none";
          });
        }

        document.querySelectorAll("[data-save-user]").forEach((b) => {
          b.addEventListener("click", async () => {
            const id = b.getAttribute("data-save-user");
            const roleVal = document.getElementById("editRole").value;
            const res = await window.SupabaseService.updateUser(id, {
              full_name: document.getElementById("editName").value.trim(),
              grade: roleVal === "admin" ? "BOD-3" : document.getElementById("editGrade").value,
              allow_all_grades: roleVal === "admin" ? false : document.getElementById("editAllGrades").checked,
              unit: document.getElementById("editUnit").value.trim(),
              role: roleVal,
              is_active: document.getElementById("editActive").value === "true"
            });
            editingId = null;
            statusMsg = res.ok ? "✓ Data pegawai berhasil diperbarui." : `✕ Gagal update: ${res.reason}`;
            await loadData();
          });
        });

        document.querySelectorAll("[data-reset-pw]").forEach((b) => {
          b.addEventListener("click", async () => {
            const id = b.getAttribute("data-reset-pw");
            const nip = b.getAttribute("data-nip");
            const newPw = prompt(`Masukkan password baru untuk ${nip} (min. 6 karakter):`);
            if (!newPw || newPw.length < 6) return;
            const res = await window.SupabaseService.updateUser(id, { password: newPw });
            statusMsg = res.ok ? `✓ Password ${nip} berhasil direset.` : `✕ Gagal reset: ${res.reason}`;
            draw();
          });
        });

        document.querySelectorAll("[data-del-user]").forEach((b) => {
          b.addEventListener("click", async () => {
            const id = b.getAttribute("data-del-user");
            const nip = b.getAttribute("data-nip");
            if (!confirm(`Hapus permanen user ${nip}?`)) return;
            const res = await window.SupabaseService.deleteUser(id);
            statusMsg = res.ok ? `✓ User ${nip} berhasil dihapus.` : `✕ Gagal hapus: ${res.reason}`;
            await loadData();
          });
        });
      } else {
        document.getElementById("btnExportCsv").addEventListener("click", () => {
          const header = "Waktu,NIP,Nama,Grade,Unit,Skor,Status\n";
          const rows = filteredResults
            .map((r) => `"${new Date(r.created_at).toLocaleString("id-ID")}","${r.participant_nip}","${r.participant_name}","${r.grade}","${r.unit}",${r.score},"${r.status}"`)
            .join("\n");
          const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `rekap-asesmen-${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
        });
      }
    }

    await loadData();
  }

  btnHome.addEventListener("click", renderHome);
  btnResetHome.addEventListener("click", renderHome);
  btnHistory.addEventListener("click", renderHistory);
  btnAdmin.addEventListener("click", renderAdminPanel);
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("askrindo_session_v1");
    state.currentUser = null;
    renderLogin();
  });

  initSupabaseStatus();
  updateTopbarSession();
  if (state.currentUser) {
    if (state.currentUser.role === "admin") renderAdminPanel();
    else renderHome();
  } else {
    renderLogin();
  }
})();
