(function () {
  const root = document.getElementById("appRoot");
  const btnHome = document.getElementById("btnHome");
  const btnResetHome = document.getElementById("btnResetHome");
  const btnHistory = document.getElementById("btnHistory");

  const GRADES = {
    "BOD-3": window.DATA_BOD3,
    "BOD-4": window.DATA_BOD4,
    "BOD-5": window.DATA_BOD5
  };

  let state = {
    view: "home", // home | potrai | casestudy | cap | personality | psychometric | report | history
    selectedGrade: "BOD-4",
    unitFilter: "Semua",
    fullFlow: false,
    flowQueue: [],
    flowResults: {},
    timerInterval: null,
    secondsLeft: 0
  };

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
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
    const key = "askrindo_sim_history_v1";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.unshift(entry);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
  }

  function getHistory() {
    return JSON.parse(localStorage.getItem("askrindo_sim_history_v1") || "[]");
  }

  // ======================== HOME VIEW ========================
  function renderHome() {
    clearTimer();
    state.view = "home";
    state.fullFlow = false;
    state.flowQueue = [];
    state.flowResults = {};

    root.innerHTML = `
      <div class="card hero-card">
        <h1>Simulasi Asesmen Rutin — Asuransi Kredit Indonesia</h1>
        <p>
          Platform latihan mandiri berbasis skenario nyata <strong>KUR</strong> dan <strong>Non-KUR (Suretyship &amp; Asuransi Umum)</strong>.
          Pilih <strong>Level / Job Grade</strong> Anda di bawah ini untuk menjalankan simulasi lengkap (3 metode berurutan) atau berlatih per metode.
        </p>
        <div class="filter-bar">
          <label for="unitSelect">Fokus Unit / Bidang:</label>
          <select id="unitSelect" class="select-input">
            <option value="Semua" ${state.unitFilter === "Semua" ? "selected" : ""}>Semua Bidang (Campuran)</option>
            <option value="Underwriting & Klaim" ${state.unitFilter === "Underwriting & Klaim" ? "selected" : ""}>Underwriting / Penjaminan / Klaim &amp; Subrogasi</option>
            <option value="Bisnis & Pemasaran" ${state.unitFilter === "Bisnis & Pemasaran" ? "selected" : ""}>Bisnis / Pemasaran (KUR, Suretyship, Umum)</option>
            <option value="Manajemen Risiko" ${state.unitFilter === "Manajemen Risiko" ? "selected" : ""}>Manajemen Risiko &amp; Kepatuhan</option>
          </select>
        </div>
      </div>

      <div class="grid-3">
        ${renderGradeCard("BOD-3", "Grade 15–16", "145 Pegawai", "amber")}
        ${renderGradeCard("BOD-4", "Grade 12–14", "523 Pegawai", "")}
        ${renderGradeCard("BOD-5", "Grade 8–11", "253 Pegawai", "emerald")}
      </div>
    `;

    document.getElementById("unitSelect").addEventListener("change", (e) => {
      state.unitFilter = e.target.value;
    });

    document.querySelectorAll("[data-start-full]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const g = btn.getAttribute("data-start-full");
        startFullAssessment(g);
      });
    });

    document.querySelectorAll("[data-start-method]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const g = btn.getAttribute("data-grade");
        const m = btn.getAttribute("data-start-method");
        state.selectedGrade = g;
        state.fullFlow = false;
        state.flowResults = {};
        launchMethod(g, m);
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

    return `
      <div class="card grade-card">
        <div>
          <span class="grade-badge ${badgeColor}">${gradeRange} • ${headcount}</span>
          <div class="grade-title">${data.title}</div>
          <div class="grade-meta">${data.roleLabel}</div>
          <ul class="method-list">${methodsHtml}</ul>
        </div>
        <button class="btn btn-primary" data-start-full="${gradeId}">
          Mulai Simulasi Lengkap (${gradeId})
        </button>
      </div>
    `;
  }

  function startFullAssessment(gradeId) {
    state.selectedGrade = gradeId;
    state.fullFlow = true;
    state.flowResults = {};
    state.flowQueue = GRADES[gradeId].methods.map((m) => m.id);
    nextInFlow();
  }

  function nextInFlow() {
    if (!state.fullFlow || state.flowQueue.length === 0) {
      renderReport();
      return;
    }
    const nextMethod = state.flowQueue.shift();
    launchMethod(state.selectedGrade, nextMethod);
  }

  function launchMethod(gradeId, methodId) {
    if (methodId === "potrai") renderPotrai(gradeId);
    else if (methodId === "casestudy") renderCaseStudy(gradeId);
    else if (methodId === "cap") renderCap(gradeId);
    else if (methodId === "personality") renderPersonality(gradeId);
    else if (methodId === "psychometric") renderPsychometric(gradeId);
  }

  // ======================== POTRAI SIMULATION (BOD-3 & BOD-4) ========================
  function renderPotrai(gradeId) {
    const data = GRADES[gradeId];
    let pool = data.potrai;
    if (state.unitFilter !== "Semua") {
      const filtered = pool.filter((s) => s.unit.includes(state.unitFilter.split(" ")[0]));
      if (filtered.length > 0) pool = filtered;
    }
    let idx = 0;
    let phase = 1; // 1 = initial answer, 2 = follow-up probe, 3 = evaluation
    let ans1 = "";
    let ans2 = "";

    function draw() {
      const item = pool[idx];
      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">${data.title} • PotrAI Simulation</span>
              <h2 style="font-size:20px;color:var(--primary);">${item.title}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Skenario ${idx + 1} dari ${pool.length} • Unit: ${item.unit}</div>
            </div>
            <div class="timer-pill" id="potraiTimer">08:00</div>
          </div>

          <div class="memo-box">${item.memo}</div>

          ${
            phase === 1
              ? `
            <p style="font-weight:600;margin-bottom:10px;">${item.question}</p>
            <textarea class="textarea-box" id="potraiAns1" placeholder="Tuliskan keputusan, alasan risiko/bisnis, serta skrip komunikasi Anda secara terstruktur...">${ans1}</textarea>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;flex-wrap:wrap;gap:10px;">
              <span style="font-size:12px;color:var(--text-muted);">Tips: Sertakan aspek Risk Governance, SLA, dan solusi konkret.</span>
              <button class="btn btn-primary" id="btnSubmitP1">Kirim ke AI Assessor</button>
            </div>
          `
              : phase === 2
              ? `
            <div class="feedback-box info" style="margin-bottom:14px;">
              <strong>Jawaban Awal Anda Tercatat.</strong> AI Assessor memberikan pertanyaan lanjutan (<em>Probe</em>) untuk menguji ketahanan keputusan Anda:
            </div>
            <div class="memo-box" style="border-left-color:var(--accent);background:#fffbeb;">
              <h4>${item.followUpPrompt}</h4>
            </div>
            <textarea class="textarea-box" id="potraiAns2" placeholder="Tuliskan respons tegas & terukur Anda terhadap eskalasi lanjutan ini...">${ans2}</textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:14px;">
              <button class="btn btn-accent" id="btnSubmitP2">Selesaikan &amp; Lihat Evaluasi</button>
            </div>
          `
              : renderPotraiEval(item, ans1, ans2, pool.length, idx)
          }
        </div>
      `;

      if (phase === 1) {
        startTimer(item.durationSec, "potraiTimer", () => {
          ans1 = document.getElementById("potraiAns1")?.value || ans1;
          phase = 2;
          draw();
        });
        document.getElementById("btnSubmitP1").addEventListener("click", () => {
          ans1 = document.getElementById("potraiAns1").value.trim();
          if (ans1.length < 25) {
            alert("Mohon tulis jawaban minimal 25 karakter agar dapat dievaluasi.");
            return;
          }
          phase = 2;
          draw();
        });
      } else if (phase === 2) {
        clearTimer();
        document.getElementById("btnSubmitP2").addEventListener("click", () => {
          ans2 = document.getElementById("potraiAns2").value.trim();
          if (ans2.length < 15) {
            alert("Mohon tulis respons lanjutan minimal 15 karakter.");
            return;
          }
          phase = 3;
          draw();
        });
      } else {
        clearTimer();
        const btnNext = document.getElementById("btnNextPotrai");
        if (btnNext) {
          btnNext.addEventListener("click", () => {
            if (idx + 1 < pool.length) {
              idx++;
              phase = 1;
              ans1 = "";
              ans2 = "";
              draw();
            } else {
              if (state.fullFlow) nextInFlow();
              else renderReport();
            }
          });
        }
      }
    }

    function renderPotraiEval(item, a1, a2, total, currentIdx) {
      const combined = (a1 + " " + a2).toLowerCase();
      const matched = item.keywords.filter((k) => combined.includes(k));
      const wordCount = combined.split(/\s+/).filter(Boolean).length;
      const kwRatio = matched.length / Math.min(item.keywords.length, 7);
      const lengthBonus = wordCount >= 80 ? 15 : wordCount >= 45 ? 8 : 0;
      const score = Math.min(96, Math.max(45, Math.round(kwRatio * 75 + lengthBonus + 10)));

      if (!state.flowResults.potrai) state.flowResults.potrai = [];
      state.flowResults.potrai[currentIdx] = score;

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi PotrAI Simulation</strong>
              <div style="font-size:13px;color:var(--text-muted);">Panjang respons: ${wordCount} kata • Konsep kunci terpenuhi: ${matched.length} poin</div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
          <div class="tag-row">
            ${matched.map((m) => `<span class="tag">✓ ${m}</span>`).join("")}
          </div>
        </div>

        <div class="rubric-grid">
          ${item.rubric
            .map(
              (r) => `
            <div class="rubric-item">
              <label>Kompetensi Dinilai</label>
              <div style="font-size:13px;">${r}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="memo-box" style="margin-top:16px;border-left-color:var(--emerald);background:#f0fdf4;">
          <h4>Benchmark Jawaban Ideal (${gradeId})</h4>
          <p>${item.benchmark}</p>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextPotrai">
            ${currentIdx + 1 < total ? "Lanjut ke Skenario Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    draw();
  }

  // ======================== CASE STUDY - ASYNC PRESENTATION (BOD-5) ========================
  function renderCaseStudy(gradeId) {
    const data = GRADES[gradeId];
    let pool = data.casestudy;
    if (state.unitFilter !== "Semua") {
      const filtered = pool.filter((s) => s.unit.includes(state.unitFilter.split(" ")[0]));
      if (filtered.length > 0) pool = filtered;
    }
    let idx = 0;
    let stage = "prep"; // prep | present | eval
    let scriptText = "";

    function draw() {
      const item = pool[idx];
      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge emerald">${data.title} • Case Study – Asynchronous Presentation</span>
              <h2 style="font-size:20px;color:var(--primary);">${item.title}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Kasus ${idx + 1} dari ${pool.length} • Fase: <strong>${stage === "prep" ? "1. Persiapan Analisis" : stage === "present" ? "2. Penyusunan / Presentasi Asinkron" : "3. Evaluasi"}</strong></div>
            </div>
            <div class="timer-pill" id="csTimer">05:00</div>
          </div>

          <div class="memo-box">${item.brief}</div>

          ${
            stage === "prep"
              ? `
            <p style="font-weight:600;margin-bottom:8px;">Poin yang Wajib Ada dalam Presentasi Anda:</p>
            <ul style="margin-left:18px;margin-bottom:14px;font-size:14px;">
              ${item.prompts.map((p) => `<li>${p}</li>`).join("")}
            </ul>
            <textarea class="textarea-box" id="csDraft" placeholder="Catat poin-poin analisis dan hitungan Anda di sini sebelum masuk ke fase Presentasi Asinkron...">${scriptText}</textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:14px;">
              <button class="btn btn-primary" id="btnStartPresent">Masuk Fase Presentasi Asinkron</button>
            </div>
          `
              : stage === "present"
              ? `
            <div class="feedback-box info" style="margin-bottom:12px;">
              <strong>Fase Presentasi Asinkron (Simulasi Rekam / Skrip 3 Menit):</strong> Susun narasi presentasi Anda secara jelas seolah sedang berbicara di depan kamera asesor (Pembukaan → Analisis → Solusi → Penutup).
            </div>
            <textarea class="textarea-box" id="csScript" style="min-height:200px;" placeholder="Selamat pagi Bapak/Ibu Asesor. Berikut analisis saya terkait kasus...">${scriptText}</textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:14px;">
              <button class="btn btn-accent" id="btnSubmitPresent">Kirim Presentasi Asinkron</button>
            </div>
          `
              : renderCsEval(item, scriptText, pool.length, idx)
          }
        </div>
      `;

      if (stage === "prep") {
        startTimer(item.prepSec, "csTimer", () => {
          scriptText = document.getElementById("csDraft")?.value || scriptText;
          stage = "present";
          draw();
        });
        document.getElementById("btnStartPresent").addEventListener("click", () => {
          scriptText = document.getElementById("csDraft").value;
          stage = "present";
          draw();
        });
      } else if (stage === "present") {
        startTimer(item.presentSec, "csTimer", () => {
          scriptText = document.getElementById("csScript")?.value || scriptText;
          stage = "eval";
          draw();
        });
        document.getElementById("btnSubmitPresent").addEventListener("click", () => {
          scriptText = document.getElementById("csScript").value.trim();
          if (scriptText.length < 30) {
            alert("Mohon tulis skrip presentasi minimal 30 karakter.");
            return;
          }
          stage = "eval";
          draw();
        });
      } else {
        clearTimer();
        document.getElementById("btnNextCs").addEventListener("click", () => {
          if (idx + 1 < pool.length) {
            idx++;
            stage = "prep";
            scriptText = "";
            draw();
          } else {
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    function renderCsEval(item, txt, total, currentIdx) {
      const lower = txt.toLowerCase();
      const matched = item.keywords.filter((k) => lower.includes(k));
      const words = lower.split(/\s+/).filter(Boolean).length;
      const score = Math.min(95, Math.max(45, Math.round((matched.length / 7) * 70 + (words >= 70 ? 20 : 10))));
      if (!state.flowResults.casestudy) state.flowResults.casestudy = [];
      state.flowResults.casestudy[currentIdx] = score;

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong>Evaluasi Case Study – Async Presentation</strong>
              <div style="font-size:13px;color:var(--text-muted);">Jumlah kata: ${words} • Poin kunci tercakup: ${matched.length}</div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
        </div>
        <div class="rubric-grid">
          ${item.rubric.map((r) => `<div class="rubric-item"><label>Kriteria Asesor</label><div style="font-size:13px;">${r}</div></div>`).join("")}
        </div>
        <div class="memo-box" style="margin-top:16px;border-left-color:var(--emerald);background:#f0fdf4;">
          <h4>Benchmark Presentasi Ideal (BOD-5)</h4>
          <p>${item.benchmark}</p>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextCs">
            ${currentIdx + 1 < total ? "Kasus Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    draw();
  }

  // ======================== CAP (COGNITIVE & ANALYTICAL) ========================
  function renderCap(gradeId) {
    const data = GRADES[gradeId];
    const questions = data.cap;
    let idx = 0;
    let selected = null;
    let checked = false;
    let correctCount = 0;

    startTimer(questions.length * 90, "capTimer", () => {
      state.flowResults.cap = Math.round((correctCount / questions.length) * 100);
      if (state.fullFlow) nextInFlow();
      else renderReport();
    });

    function draw() {
      const q = questions[idx];
      const pct = Math.round(((idx + (checked ? 1 : 0)) / questions.length) * 100);

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">${data.title} • CAP (Cognitive &amp; Analytical)</span>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Soal ${idx + 1} dari ${questions.length} • Kategori: <strong>${q.category}</strong></div>
            </div>
            <div class="timer-pill" id="capTimer">06:00</div>
          </div>

          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>

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
                const letter = String.fromCharCode(65 + i);
                return `
                  <div class="${cls}" data-opt="${i}">
                    <div class="option-key">${letter}</div>
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
              <strong>${selected === q.answer ? "✓ Jawaban Tepat!" : "✕ Kurang Tepat."}</strong>
              <p style="margin-top:6px;">${q.explanation}</p>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnNextCap">
                ${idx + 1 < questions.length ? "Soal Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Hasil CAP"}
              </button>
            </div>
          `
              : `
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnCheckCap" ${selected === null ? "disabled" : ""}>Periksa Jawaban</button>
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
        document.getElementById("btnCheckCap").addEventListener("click", () => {
          checked = true;
          if (selected === q.answer) correctCount++;
          draw();
        });
      } else {
        document.getElementById("btnNextCap").addEventListener("click", () => {
          if (idx + 1 < questions.length) {
            idx++;
            selected = null;
            checked = false;
            draw();
          } else {
            clearTimer();
            state.flowResults.cap = Math.round((correctCount / questions.length) * 100);
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    draw();
  }

  // ======================== PERSONALITY TEST (BOD-3 & BOD-4) ========================
  function renderPersonality(gradeId) {
    clearTimer();
    const data = GRADES[gradeId];
    const items = data.personality;
    const answers = {};
    const labels = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"];

    function draw() {
      const answeredCount = Object.keys(answers).length;
      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">${data.title} • Personality Test</span>
              <h2 style="font-size:20px;color:var(--primary);">Profil Gaya Kerja &amp; Kepemimpinan Asuransi Kredit</h2>
              <div style="font-size:13px;color:var(--text-muted);">Jawablah secara jujur sesuai kecenderungan perilaku kerja Anda (${answeredCount}/${items.length} terjawab).</div>
            </div>
          </div>

          ${items
            .map(
              (it, idx) => `
            <div class="likert-row">
              <div class="likert-statement">${idx + 1}. ${it.text}</div>
              <div class="likert-scale">
                ${[1, 2, 3, 4, 5]
                  .map(
                    (val) => `
                  <button class="likert-btn ${answers[it.id] === val ? "active" : ""}" data-pid="${it.id}" data-val="${val}">
                    ${val} • ${labels[val - 1]}
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
            )
            .join("")}

          <div style="display:flex;justify-content:flex-end;margin-top:20px;">
            <button class="btn btn-primary" id="btnFinishPers" ${answeredCount < items.length ? "disabled" : ""}>
              Selesaikan Personality Test
            </button>
          </div>
        </div>
      `;

      document.querySelectorAll("[data-pid]").forEach((btn) => {
        btn.addEventListener("click", () => {
          answers[btn.getAttribute("data-pid")] = Number(btn.getAttribute("data-val"));
          draw();
        });
      });

      document.getElementById("btnFinishPers").addEventListener("click", () => {
        const dims = {};
        items.forEach((it) => {
          const raw = answers[it.id];
          const score = it.reverse ? 6 - raw : raw;
          if (!dims[it.dim]) dims[it.dim] = [];
          dims[it.dim].push(score);
        });
        const dimAvg = {};
        let total = 0;
        let count = 0;
        Object.keys(dims).forEach((d) => {
          const avg = dims[d].reduce((a, b) => a + b, 0) / dims[d].length;
          dimAvg[d] = Math.round((avg / 5) * 100);
          total += dimAvg[d];
          count++;
        });
        state.flowResults.personality = {
          overall: Math.round(total / count),
          dimensions: dimAvg
        };
        if (state.fullFlow) nextInFlow();
        else renderReport();
      });
    }

    draw();
  }

  // ======================== PSYCHOMETRIC TEST (BOD-5) ========================
  function renderPsychometric(gradeId) {
    const data = GRADES[gradeId];
    const items = data.psychometric;
    let idx = 0;
    let selected = null;
    let checked = false;
    let correctCount = 0;

    startTimer(items.length * 60, "psyTimer", () => {
      state.flowResults.psychometric = Math.round((correctCount / items.length) * 100);
      if (state.fullFlow) nextInFlow();
      else renderReport();
    });

    function draw() {
      const q = items[idx];
      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge emerald">${data.title} • Psychometric Test</span>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Butir ${idx + 1} dari ${items.length} • Tipe: <strong>${q.type.toUpperCase()}</strong></div>
            </div>
            <div class="timer-pill" id="psyTimer">04:00</div>
          </div>

          <p style="font-size:16px;font-weight:600;margin-bottom:14px;">${q.question}</p>

          <div class="option-list">
            ${(q.pairs
              ? q.pairs.map((p) => `<div><strong>Sistem:</strong> ${p.left}<br/><strong>Dokumen:</strong> ${p.right}</div>`)
              : q.options
            )
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
              <strong>${selected === q.answer ? "✓ Tepat & Teliti!" : "✕ Perlu Lebih Teliti."}</strong>
              <p style="margin-top:6px;">${q.explanation}</p>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnNextPsy">
                ${idx + 1 < items.length ? "Soal Berikutnya" : "Lihat Hasil"}
              </button>
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
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
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
    if (res.casestudy) {
      const avg = Math.round(res.casestudy.reduce((a, b) => a + b, 0) / res.casestudy.length);
      scores.push({ label: "Case Study – Async Presentation", score: avg });
    }
    if (typeof res.cap === "number") {
      scores.push({ label: "CAP (Cognitive & Analytical)", score: res.cap });
    }
    if (res.personality) {
      scores.push({ label: "Personality Profile Fit", score: res.personality.overall });
    }
    if (typeof res.psychometric === "number") {
      scores.push({ label: "Psychometric Test", score: res.psychometric });
    }

    const totalAvg = scores.length ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0;
    const status =
      totalAvg >= 80
        ? { text: "Ready Now (Direkomendasikan)", cls: "pill-green" }
        : totalAvg >= 65
        ? { text: "Ready with Development", cls: "pill-amber" }
        : { text: "Need Strengthening", cls: "pill-red" };

    if (scores.length > 0) {
      saveHistory({
        date: new Date().toLocaleString("id-ID"),
        grade: state.selectedGrade,
        unit: state.unitFilter,
        score: totalAvg,
        status: status.text,
        details: scores
      });
    }

    root.innerHTML = `
      <div class="card">
        <div class="assess-header">
          <div>
            <span class="grade-badge">${GRADES[state.selectedGrade].title}</span>
            <h2 style="font-size:22px;color:var(--primary);">Laporan Hasil Simulasi Asesmen</h2>
            <div style="font-size:13px;color:var(--text-muted);">Fokus Unit: ${state.unitFilter}</div>
          </div>
          <div style="text-align:right;">
            <div class="score-big">${totalAvg}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
            <span class="pill ${status.cls}">${status.text}</span>
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

            <div class="feedback-box info">
              <strong>Rekomendasi Pengembangan (${state.selectedGrade}):</strong>
              <p style="margin-top:6px;">
                ${
                  totalAvg >= 80
                    ? "Kesiapan Anda sangat baik. Pertahankan ketajaman analisis risiko KUR/Non-KUR dan konsistensi komunikasi lintas unit."
                    : "Perkuat latihan perhitungan rasio teknis (Loss Ratio, Combined Ratio, Recovery Subrogasi) dan pastikan setiap keputusan manajerial menyertakan mitigasi kontrol dokumen."
                }
              </p>
            </div>
          </div>

          ${
            res.personality
              ? `
            <div style="text-align:center;">
              <h3 style="font-size:16px;color:var(--primary);margin-bottom:8px;">Radar Profil Kepemimpinan</h3>
              ${buildRadarSvg(res.personality.dimensions)}
            </div>
          `
              : `
            <div class="memo-box">
              <h4>Catatan Asesor</h4>
              <p>Untuk gambaran kompetensi menyeluruh sesuai standar kantor, jalankan <strong>Simulasi Lengkap</strong> agar seluruh 3 metode pada grade ${state.selectedGrade} terukur bersamaan.</p>
            </div>
          `
          }
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
    const cx = 160,
      cy = 140,
      r = 95;
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
      const lx = cx + (r + 22) * Math.cos(a);
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
      <svg viewBox="0 0 320 280" style="max-width:340px;width:100%;">
        ${rings.join("")}
        ${axes.join("")}
        <polygon points="${dataPts}" fill="rgba(15, 44, 89, 0.25)" stroke="#0f2c59" stroke-width="2.5"/>
      </svg>
    `;
  }

  // ======================== HISTORY VIEW ========================
  function renderHistory() {
    clearTimer();
    const list = getHistory();
    root.innerHTML = `
      <div class="card">
        <div class="assess-header">
          <div>
            <h2 style="font-size:20px;color:var(--primary);">Riwayat Skor Simulasi</h2>
            <div style="font-size:13px;color:var(--text-muted);">Tersimpan otomatis di browser Anda.</div>
          </div>
          <button class="btn btn-outline-dark btn-sm" id="btnClearHist">Hapus Riwayat</button>
        </div>
        ${
          list.length === 0
            ? `<p style="color:var(--text-muted);">Belum ada riwayat simulasi. Silakan mulai latihan dari Beranda.</p>`
            : `
          <table class="data-table">
            <thead>
              <tr><th>Waktu</th><th>Grade</th><th>Unit Fokus</th><th>Skor</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${list
                .map(
                  (it) => `
                <tr>
                  <td>${it.date}</td>
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
      localStorage.removeItem("askrindo_sim_history_v1");
      renderHistory();
    });
  }

  btnHome.addEventListener("click", renderHome);
  btnResetHome.addEventListener("click", renderHome);
  btnHistory.addEventListener("click", renderHistory);

  renderHome();
})();
