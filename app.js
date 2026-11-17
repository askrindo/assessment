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
    view: "home",
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
    const key = "askrindo_sim_history_v2";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.unshift(entry);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
  }

  function getHistory() {
    return JSON.parse(localStorage.getItem("askrindo_sim_history_v2") || "[]");
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
        <h1>Simulasi Asesmen Terpadu — Asuransi Kredit Indonesia</h1>
        <p>
          Disesuaikan dengan format resmi <strong>PotrAI (Email, Chat, Call, Documents, AI Assistant)</strong>,
          <strong>Case Study + Asynchronous Presentation</strong>, <strong>Career Achievement Portfolio (CAP / STAR)</strong>,
          <strong>Personality Test (5 Dimensi OCEAN)</strong>, dan <strong>Psychometric Test</strong> untuk portofolio <strong>KUR &amp; Non-KUR (Suretyship &amp; Asuransi Umum)</strong>.
        </p>
        <div class="filter-bar">
          <label for="unitSelect">Fokus Unit / Bidang:</label>
          <select id="unitSelect" class="select-input">
            <option value="Semua" ${state.unitFilter === "Semua" ? "selected" : ""}>Semua Bidang (Campuran)</option>
            <option value="Underwriting & Klaim" ${state.unitFilter === "Underwriting & Klaim" ? "selected" : ""}>Underwriting / Penjaminan / Klaim &amp; Subrogasi</option>
            <option value="Bisnis & Pemasaran" ${state.unitFilter === "Bisnis & Pemasaran" ? "selected" : ""}>Bisnis / Pemasaran (KUR, Suretyship, Umum)</option>
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
    launchMethod(state.selectedGrade, state.flowQueue.shift());
  }

  function launchMethod(gradeId, methodId) {
    if (methodId === "potrai") renderPotrai(gradeId);
    else if (methodId === "casestudy") renderCaseStudy(gradeId);
    else if (methodId === "cap") renderCapStar(gradeId);
    else if (methodId === "personality") renderOceanPersonality(gradeId);
    else if (methodId === "psychometric") renderPsychometric(gradeId);
  }

  // ======================== POTRAI 5-MODUL WORKSPACE (BOD-3 & BOD-4) ========================
  function renderPotrai(gradeId) {
    const data = GRADES[gradeId];
    let pool = data.potrai;
    if (state.unitFilter !== "Semua") {
      const filtered = pool.filter((s) => s.unit.includes(state.unitFilter.split(" ")[0]));
      if (filtered.length > 0) pool = filtered;
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
          const aiReply =
            ws.chatTurn === 1
              ? item.chat.followUp
              : "Terima kasih atas penjelasannya. Posisi dan solusi Anda sudah saya catat untuk ditindaklanjuti.";
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

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi PotrAI Simulation (${modulesCompleted}/4 Modul Kerja Diisi)</strong>
              <div style="font-size:13px;color:var(--text-muted);">Indikator kunci terpenuhi: ${matched.length} poin</div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
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

  // ======================== CASE STUDY + ASYNC PRESENTATION (BOD-5) ========================
  function renderCaseStudy(gradeId) {
    const data = GRADES[gradeId];
    let pool = data.casestudy;
    if (state.unitFilter !== "Semua") {
      const filtered = pool.filter((s) => s.unit.includes(state.unitFilter.split(" ")[0]));
      if (filtered.length > 0) pool = filtered;
    }
    let idx = 0;
    let stage = "written"; // written | present | eval
    let writtenAnswers = [];
    let scriptText = "";
    let recordedAudioUrl = null;
    let mediaRecorder = null;
    let isRecording = false;

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
              <button class="btn btn-primary" id="btnToPresent">Lanjut ke Presentasi Asinkron</button>
            </div>
          `
              : stage === "present"
              ? `
            <div class="feedback-box info" style="margin-top:0;margin-bottom:14px;">
              <strong>Bagian B — Asynchronous Presentation:</strong> Sampaikan hasil analisis &amp; rekomendasi Anda secara terstruktur (Pembukaan → Analisis → Rekomendasi → Penutup). Anda dapat merekam suara langsung atau menulis skrip presentasi.
            </div>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <button class="btn ${isRecording ? "btn-danger" : "btn-outline-dark"}" id="btnRecAudio">
                ${isRecording ? "Stop Rekaman Suara" : "Rekam Audio Presentasi (Opsional)"}
              </button>
              ${recordedAudioUrl ? `<audio controls src="${recordedAudioUrl}" style="height:36px;"></audio>` : ""}
            </div>
            <textarea class="textarea-box" id="csScript" style="min-height:170px;" placeholder="Tuliskan narasi / skrip presentasi Anda di sini...">${scriptText}</textarea>
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
          stage = "present";
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
          stage = "present";
          draw();
        });
      } else if (stage === "present") {
        startTimer(item.presentSec, "csTimer", () => {
          stage = "eval";
          draw();
        });
        const btnRec = document.getElementById("btnRecAudio");
        btnRec.addEventListener("click", async () => {
          if (!isRecording) {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              const chunks = [];
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
              mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                recordedAudioUrl = URL.createObjectURL(blob);
                stream.getTracks().forEach((t) => t.stop());
                draw();
              };
              mediaRecorder.start();
              isRecording = true;
              draw();
            } catch {
              alert("Mikrofon tidak tersedia atau izin ditolak. Anda tetap dapat menggunakan skrip presentasi.");
            }
          } else {
            mediaRecorder.stop();
            isRecording = false;
          }
        });

        document.getElementById("btnSubmitPresent").addEventListener("click", () => {
          scriptText = document.getElementById("csScript").value.trim();
          if (scriptText.length < 25 && !recordedAudioUrl) {
            alert("Mohon tulis skrip presentasi atau rekam audio terlebih dahulu.");
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
            draw();
          } else {
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    function renderCsEval(item) {
      const combined = (writtenAnswers.join(" ") + " " + scriptText).toLowerCase();
      const matched = item.keywords.filter((k) => combined.includes(k));
      const words = combined.split(/\s+/).filter(Boolean).length;
      const audioBonus = recordedAudioUrl ? 8 : 0;
      const score = Math.min(97, Math.max(48, Math.round((matched.length / 7) * 65 + (words >= 75 ? 20 : 10) + audioBonus)));
      if (!state.flowResults.casestudy) state.flowResults.casestudy = [];
      state.flowResults.casestudy[idx] = score;

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong>Evaluasi Case Study + Async Presentation</strong>
              <div style="font-size:13px;color:var(--text-muted);">Total kata: ${words} • Poin kunci: ${matched.length} ${recordedAudioUrl ? "• Rekaman Audio Terlampir ✓" : ""}</div>
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

  // ======================== CAP — CAREER ACHIEVEMENT PORTFOLIO (STAR) ========================
  function renderCapStar(gradeId) {
    clearTimer();
    const data = GRADES[gradeId];
    const items = data.cap;
    let idx = 0;
    let star = { s: "", t: "", a: "", r: "" };
    let evaluated = false;
    let scores = [];

    startTimer(items.length * 900, "capTimer", () => {
      state.flowResults.cap = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 65;
      if (state.fullFlow) nextInFlow();
      else renderReport();
    });

    function draw() {
      const item = items[idx];
      const pct = Math.round(((idx + (evaluated ? 1 : 0)) / items.length) * 100);

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">${data.title} • CAP (Career Achievement Portfolio)</span>
              <h2 style="font-size:20px;color:var(--primary);">Kompetensi: ${item.competency}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Pertanyaan ${idx + 1} dari ${items.length} • Format terstruktur berbasis pengalaman kerja (STAR)</div>
            </div>
            <div class="timer-pill" id="capTimer">30:00</div>
          </div>

          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>

          <div class="memo-box">
            <h4>Pertanyaan Pengalaman Kerja:</h4>
            <p>${item.prompt}</p>
          </div>

          ${
            !evaluated
              ? `
            <div class="star-grid">
              <div class="star-field">
                <label>1. Situation &amp; Challenge (Situasi &amp; Tantangan yang Dihadapi)</label>
                <textarea class="textarea-box" id="starS" placeholder="Kapan/di mana terjadi, konteks KUR/Non-KUR, dan tantangan utamanya...">${star.s}</textarea>
              </div>
              <div class="star-field">
                <label>2. Task (Peran &amp; Tanggung Jawab Anda)</label>
                <textarea class="textarea-box" id="starT" placeholder="Apa target atau tanggung jawab spesifik Anda pada situasi tersebut...">${star.t}</textarea>
              </div>
              <div class="star-field">
                <label>3. Action (Tindakan Nyata yang Anda Lakukan)</label>
                <textarea class="textarea-box" id="starA" placeholder="Langkah konkret yang Anda ambil (gunakan kata 'Saya', bukan hanya 'Kami')...">${star.a}</textarea>
              </div>
              <div class="star-field">
                <label>4. Result &amp; Achievement (Hasil &amp; Pencapaian Terukur)</label>
                <textarea class="textarea-box" id="starR" placeholder="Dampak nyata (angka Loss Ratio, SLA, recovery subrogasi, atau perbaikan sistem)...">${star.r}</textarea>
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:16px;">
              <button class="btn btn-primary" id="btnEvalCap">Analisis Bukti Perilaku (AI Assessor)</button>
            </div>
          `
              : renderCapEval(item)
          }
        </div>
      `;

      if (!evaluated) {
        document.getElementById("btnEvalCap").addEventListener("click", () => {
          star = {
            s: document.getElementById("starS").value.trim(),
            t: document.getElementById("starT").value.trim(),
            a: document.getElementById("starA").value.trim(),
            r: document.getElementById("starR").value.trim()
          };
          if (!star.s || !star.a || !star.r) {
            alert("Mohon lengkapi minimal bagian Situation, Action, dan Result agar bukti perilaku dapat dievaluasi.");
            return;
          }
          evaluated = true;
          draw();
        });
      } else {
        document.getElementById("btnNextCap").addEventListener("click", () => {
          if (idx + 1 < items.length) {
            idx++;
            star = { s: "", t: "", a: "", r: "" };
            evaluated = false;
            draw();
          } else {
            clearTimer();
            state.flowResults.cap = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
      }
    }

    function renderCapEval(item) {
      const hasFirstPerson = /\bsaya\b/i.test(star.a);
      const hasNumbers = /\d+/.test(star.r);
      const totalWords = `${star.s} ${star.t} ${star.a} ${star.r}`.split(/\s+/).filter(Boolean).length;
      const completeness = [star.s, star.t, star.a, star.r].filter((x) => x.length >= 20).length;
      const score = Math.min(96, Math.max(50, completeness * 16 + (hasFirstPerson ? 12 : 4) + (hasNumbers ? 12 : 4) + (totalWords >= 80 ? 8 : 2)));
      scores[idx] = score;

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi Bukti Perilaku CAP (STAR)</strong>
              <div style="font-size:13px;color:var(--text-muted);">
                Kelengkapan STAR: ${completeness}/4 • Kepemilikan tindakan ("Saya"): ${hasFirstPerson ? "Jelas ✓" : "Perlu dipertegas"} • Hasil terukur (angka): ${hasNumbers ? "Ada ✓" : "Tambahkan metrik"}
              </div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
        </div>
        <div class="rubric-grid">
          ${item.indicators.map((ind) => `<div class="rubric-item"><label>Indikator Kompetensi</label><div style="font-size:13px;">${ind}</div></div>`).join("")}
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextCap">
            ${idx + 1 < items.length ? "Pertanyaan CAP Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    draw();
  }

  // ======================== PERSONALITY TEST — 5 DIMENSI OCEAN ========================
  function renderOceanPersonality(gradeId) {
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
              <span class="grade-badge">${data.title} • Personality Test (5 Dimensi OCEAN)</span>
              <h2 style="font-size:20px;color:var(--primary);">Inventori Kepribadian Big Five (OCEAN)</h2>
              <div style="font-size:13px;color:var(--text-muted);">Mengukur Openness, Conscientiousness, Extraversion, Agreeableness, dan Neuroticism (${answeredCount}/${items.length} terjawab).</div>
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
              Selesaikan Personality Test (OCEAN)
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
        const dims = { Openness: [], Conscientiousness: [], Extraversion: [], Agreeableness: [], Neuroticism: [] };
        items.forEach((it) => {
          const raw = answers[it.id];
          const val = it.reverse ? 6 - raw : raw;
          dims[it.dim].push(val);
        });
        const dimScore = {};
        let total = 0;
        Object.keys(dims).forEach((d) => {
          const avg = dims[d].reduce((a, b) => a + b, 0) / dims[d].length;
          dimScore[d === "Neuroticism" ? "Emotional Stability" : d] = Math.round((avg / 5) * 100);
          total += Math.round((avg / 5) * 100);
        });
        state.flowResults.personality = {
          overall: Math.round(total / 5),
          dimensions: dimScore
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

    startTimer(items.length * 90, "psyTimer", () => {
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
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Butir ${idx + 1}/${items.length} • Aspek: <strong>${q.aspect}</strong></div>
            </div>
            <div class="timer-pill" id="psyTimer">07:30</div>
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
      scores.push({ label: "Case Study + Async Presentation", score: avg });
    }
    if (typeof res.cap === "number") {
      scores.push({ label: "CAP (Career Achievement Portfolio)", score: res.cap });
    }
    if (res.personality) {
      scores.push({ label: "Personality Test (OCEAN Fit)", score: res.personality.overall });
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
              <strong>Rekomendasi Persiapan (${state.selectedGrade}):</strong>
              <p style="margin-top:6px;">
                ${
                  totalAvg >= 80
                    ? "Kesiapan Anda sangat baik. Pertahankan ketajaman bukti perilaku STAR pada CAP dan keseimbangan Risk Governance vs Bisnis pada PotrAI/Case Study."
                    : "Perkuat penggunaan metode STAR dengan angka pencapaian konkret pada CAP, dan pastikan seluruh modul kerja pada PotrAI (Email, Chat, Call, Documents) terisi konsisten."
                }
              </p>
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
      localStorage.removeItem("askrindo_sim_history_v2");
      renderHistory();
    });
  }

  btnHome.addEventListener("click", renderHome);
  btnResetHome.addEventListener("click", renderHome);
  btnHistory.addEventListener("click", renderHistory);

  renderHome();
})();
