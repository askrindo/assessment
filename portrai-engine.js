(function () {
  window.renderPortraiVirtualOffice = function ({
    root,
    gradeId,
    data,
    pool,
    state,
    startTimer,
    clearTimer,
    nextInFlow,
    renderReport
  }) {
    let idx = 0;
    let startedAssessment = false;
    let finishedReading = false;
    let activeMod = "home"; // home | email | chat | call | documents | eval
    let ws = createWorkspace(pool[0]);
    let ringtoneInterval = null;
    let ringAudioCtx = null;
    let callTriggerTimeout = null;
    let callDurationInterval = null;
    let callCamStream = null;
    let callAudioRecorder = null;
    let callAudioStream = null;
    let callSpeechRec = null;
    let isRecordingCallAudio = false;
    let selectedVoiceName = "";

    function startCallElapsedTimer() {
      if (callDurationInterval) return;
      callDurationInterval = setInterval(() => {
        ws.callSeconds++;
        const el = document.getElementById("callElapsedEl");
        if (el) {
          const mm = String(Math.floor(ws.callSeconds / 60)).padStart(2, "0");
          const ss = String(ws.callSeconds % 60).padStart(2, "0");
          el.textContent = `${mm}:${ss}`;
        }
      }, 1000);
    }

    function playRingBeep() {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        if (!ringAudioCtx) ringAudioCtx = new AC();
        if (ringAudioCtx.state === "suspended") ringAudioCtx.resume();
        const now = ringAudioCtx.currentTime;
        [0, 0.22].forEach((offset) => {
          const osc = ringAudioCtx.createOscillator();
          const gain = ringAudioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(offset === 0 ? 523.25 : 659.25, now + offset);
          gain.gain.setValueAtTime(0.08, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
          osc.connect(gain);
          gain.connect(ringAudioCtx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.19);
        });
      } catch {}
    }

    function startRingtone() {
      stopRingtone();
      playRingBeep();
      ringtoneInterval = setInterval(playRingBeep, 1800);
    }

    function stopRingtone() {
      if (ringtoneInterval) {
        clearInterval(ringtoneInterval);
        ringtoneInterval = null;
      }
    }

    function getIndonesianVoices() {
      if (!("speechSynthesis" in window)) return [];
      const all = window.speechSynthesis.getVoices() || [];
      const idVoices = all.filter((v) => /^id([-_]|$)/i.test(v.lang) || /indonesia/i.test(v.name));
      return idVoices.sort((a, b) => {
        const score = (v) =>
          (/natural/i.test(v.name) ? 40 : 0) +
          (/online/i.test(v.name) ? 30 : 0) +
          (/google/i.test(v.name) ? 20 : 0) +
          (/gadis|ardi/i.test(v.name) ? 10 : 0);
        return score(b) - score(a);
      });
    }

    if ("speechSynthesis" in window && typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
      window.speechSynthesis.onvoiceschanged = () => getIndonesianVoices();
    }

    function speakIndonesian(text) {
      try {
        if (!("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const voices = getIndonesianVoices();
        const chosen = (selectedVoiceName && voices.find((v) => v.name === selectedVoiceName)) || voices[0] || null;
        const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
        sentences.forEach((sentence) => {
          const clean = sentence.trim();
          if (!clean) return;
          const utt = new SpeechSynthesisUtterance(clean);
          utt.lang = "id-ID";
          if (chosen) utt.voice = chosen;
          utt.rate = 0.98;
          utt.pitch = 1.02;
          window.speechSynthesis.speak(utt);
        });
      } catch {}
    }

    function stopCallTimers() {
      if (callTriggerTimeout) {
        clearTimeout(callTriggerTimeout);
        callTriggerTimeout = null;
      }
      if (callDurationInterval) {
        clearInterval(callDurationInterval);
        callDurationInterval = null;
      }
      if (callCamStream) {
        callCamStream.getTracks().forEach((t) => t.stop());
        callCamStream = null;
      }
      if ("speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch {}
      }
      const pop = document.getElementById("incomingCallPopup");
      if (pop) pop.remove();
      stopRingtone();
    }

    window.cleanupPortraiEngine = stopCallTimers;

    function randomCallDelay(minMs, maxMs) {
      return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    }

    function scheduleIncomingCall(minMs = 15000, maxMs = 45000) {
      if (callTriggerTimeout) clearTimeout(callTriggerTimeout);
      if (!startedAssessment || ws.incomingCallShown || ws.callStarted || ws.callEnded || activeMod === "eval") return;
      const delayMs = randomCallDelay(minMs, maxMs);
      callTriggerTimeout = setTimeout(() => {
        if (!startedAssessment || ws.incomingCallShown || ws.callStarted || ws.callEnded || activeMod === "eval") return;
        ws.incomingCallActive = true;
        ws.incomingCallShown = true;
        ws.incomingCallShownAt = Date.now();
        startRingtone();
        renderIncomingCallPopup(pool[idx]);
      }, delayMs);
    }

    function renderIncomingCallPopup(item) {
      const existing = document.getElementById("incomingCallPopup");
      if (existing) existing.remove();
      if (!ws.incomingCallActive) return;

      const div = document.createElement("div");
      div.id = "incomingCallPopup";
      div.className = "incoming-call-toast";
      div.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div class="incoming-call-pulse">📞</div>
          <div>
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.6px;color:#7dd3fc;font-weight:700;">Panggilan Masuk Virtual</div>
            <div style="font-size:15px;font-weight:800;">${item.call.partnerName}</div>
            <div style="font-size:12px;color:#cbd5e1;">Membutuhkan arahan Anda segera</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-emerald btn-sm" style="flex:1;" id="btnAnswerIncoming">Angkat Panggilan</button>
          <button class="btn btn-danger btn-sm" id="btnDismissIncoming">Tunda</button>
        </div>
      `;
      document.body.appendChild(div);

      document.getElementById("btnAnswerIncoming").addEventListener("click", () => {
        ws.incomingCallActive = false;
        if (ws.incomingCallShownAt && ws.callPickupDelaySec === null) {
          ws.callPickupDelaySec = Math.max(1, Math.round((Date.now() - ws.incomingCallShownAt) / 1000));
        }
        stopRingtone();
        div.remove();
        saveDrafts();
        activeMod = "call";
        ws.callStarted = true;
        startCallElapsedTimer();
        draw();
        speakIndonesian(item.call.prompt);
      });

      document.getElementById("btnDismissIncoming").addEventListener("click", () => {
        ws.incomingCallActive = false;
        ws.callDismissedCount = (ws.callDismissedCount || 0) + 1;
        stopRingtone();
        div.remove();
      });
    }

    function createWorkspace(item) {
      return {
        emailTab: "inbox", // inbox | draft
        selectedEmail: 0,
        emailReplies: { 0: "", 1: "" },
        emailSentMap: { 0: false, 1: false },
        activeContact: 0,
        contacts: [
          {
            name: item.chat.partnerName,
            role: "Stakeholder Utama",
            messages: [{ sender: item.chat.partnerName, role: "ai", text: item.chat.opening }],
            turn: 0
          },
          {
            name: "Grup Koordinasi Internal",
            role: "Tim Operasional & Risiko",
            messages: [
              {
                sender: "Koordinator Tim",
                role: "ai",
                text: `Halo Pak/Bu, kami sudah membaca arahan awal terkait "${item.title}". Apa langkah prioritas yang harus tim kami eksekusi hari ini?`
              }
            ],
            turn: 0
          }
        ],
        incomingCallActive: false,
        incomingCallShown: false,
        incomingCallShownAt: null,
        callPickupDelaySec: null,
        callDismissedCount: 0,
        startedAt: Date.now(),
        chatFirstReplySec: null,
        openedFilesSet: { 0: true },
        aiPromptsCount: 0,
        callStarted: false,
        callEnded: false,
        callSeconds: 0,
        callResponse: "",
        callAudioUrl: null,
        callAudioSavedLabel: "",
        callTranscript: [{ speaker: item.call.partnerName, text: item.call.prompt }],
        docView: "files", // files | editor
        openedFileIdx: 0,
        docExecSummary: "",
        docAnalysis: "",
        docActionPlan: "",
        docSavedAt: null,
        aiChat: [
          {
            role: "ai",
            text: `Halo! Saya Your AI Assistant. Saya dapat membantu Anda memahami gambaran pekerjaan pada skenario "${item.title}".`
          }
        ]
      };
    }

    function draw() {
      const item = pool[idx];

      // SLIDE 1: HARI-H INSTRUKSI UMUM SEBELUM MULAI ASSESSMENT
      if (!startedAssessment) {
        root.innerHTML = `
          <div class="card" style="max-width:860px;margin:0 auto;">
            <div class="assess-header">
              <div>
                <div style="font-size:12px;color:var(--text-muted);font-weight:600;">Kamu siap untuk memulai simulasi test</div>
                <div style="font-size:26px;font-weight:800;color:var(--primary);font-variant-numeric:tabular-nums;">00:00:00</div>
              </div>
              <div style="display:flex;gap:10px;align-items:center;">
                <span class="pill pill-green">✓ Compatibility</span>
                <span class="pill pill-amber">✓ Instruction</span>
                <button class="btn btn-accent" id="btnStartPortraiNow" ${finishedReading ? "" : "disabled"}>Mulai Assessment</button>
              </div>
            </div>

            <div class="memo-box" style="background:#fff;border-left-color:var(--primary);padding:24px;">
              <h2 style="text-align:center;color:var(--primary);margin-bottom:14px;letter-spacing:0.5px;">INSTRUKSI UMUM</h2>
              <h4 style="margin-bottom:8px;">SELAMAT DATANG DI VIRTUAL ASSESSMENT CENTER</h4>
              <p style="margin-bottom:10px;">
                Anda akan mengikuti simulasi kerja interaktif dimana Anda berperan sebagai pemimpin (<strong>${data.roleLabel}</strong>).
                Dalam proses asesmen ini, Anda akan berinteraksi melalui <strong>Email</strong>, <strong>Chat</strong>, dan <strong>Call</strong>,
                serta menggunakan fitur <strong>Documents</strong> dan <strong>Virtual AI Assistant</strong>.
              </p>
              <p style="margin-bottom:10px;">
                <strong>Alur Pengerjaan yang Dianjurkan:</strong>
              </p>
              <ol style="margin-left:20px;margin-bottom:12px;line-height:1.7;">
                <li>Mulailah dengan membaca <strong>Message from the Executives</strong> di laman <strong>Home</strong> serta dokumen referensi pada fitur <strong>Documents</strong>.</li>
                <li>Masuk ke fitur <strong>Email</strong> dan <strong>Chat</strong> untuk membalas seluruh pesan masuk secara tepat dan berbasis data.</li>
                <li>Angkat dan berinteraksi pada simulasi <strong>Call</strong> ketika panggilan virtual berlangsung, lalu susun dokumen analisa kerja Anda.</li>
                <li>Jika seluruh masalah telah ditangani, klik <strong>Selesaikan Assessment</strong> pada pojok kanan atas.</li>
              </ol>
            </div>

            <label style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700;cursor:pointer;margin-top:10px;">
              <input type="checkbox" id="chkFinishedRead" ${finishedReading ? "checked" : ""} />
              I finished read this section (Saya telah selesai membaca instruksi umum)
            </label>
          </div>
        `;

        document.getElementById("chkFinishedRead").addEventListener("change", (e) => {
          finishedReading = e.target.checked;
          document.getElementById("btnStartPortraiNow").disabled = !finishedReading;
        });
        document.getElementById("btnStartPortraiNow").addEventListener("click", () => {
          if (!finishedReading) return;
          startedAssessment = true;
          ws.startedAt = Date.now();
          startTimer(pool[0].durationSec, "portraiTimer", () => {
            activeMod = "eval";
            draw();
          });
          scheduleIncomingCall(15000, 45000);
          draw();
        });
        return;
      }

      const emailDone = ws.emailSentMap[0] || ws.emailReplies[0].trim().length >= 25;
      const totalUserChats = ws.contacts.reduce((acc, c) => acc + c.messages.filter((m) => m.role === "user").length, 0);
      const chatDone = totalUserChats >= 2;
      const callDone = ws.callTranscript.filter((t) => t.speaker === "Anda").length >= 1 || ws.callResponse.trim().length >= 20;
      const docDone = (ws.docExecSummary + ws.docAnalysis + ws.docActionPlan).trim().length >= 30;

      if (activeMod === "eval") {
        stopCallTimers();
        root.innerHTML = `<div class="card">${renderEval(item)}</div>`;
        document.getElementById("btnNextPortrai").addEventListener("click", () => {
          if (idx + 1 < pool.length) {
            idx++;
            ws = createWorkspace(pool[idx]);
            activeMod = "home";
            startTimer(pool[idx].durationSec, "portraiTimer", () => {
              activeMod = "eval";
              draw();
            });
            scheduleIncomingCall(15000, 45000);
            draw();
          } else {
            if (state.fullFlow) nextInFlow();
            else renderReport();
          }
        });
        return;
      }

      root.innerHTML = `
        <div class="portrai-shell">
          <!-- Left App Rail (Persis Slide: Home, Chat, Email, Call, Documents) -->
          <aside class="portrai-rail">
            <button class="rail-btn ${activeMod === "home" ? "active" : ""}" data-mod="home">
              <span class="rail-icon">🏠</span>
              <span>Home</span>
            </button>
            <button class="rail-btn ${activeMod === "chat" ? "active" : ""}" data-mod="chat">
              <span class="rail-icon">💬</span>
              <span>Chat</span>
              <span class="rail-badge ${chatDone ? "done" : ""}">${chatDone ? "✓" : ws.contacts.length}</span>
            </button>
            <button class="rail-btn ${activeMod === "email" ? "active" : ""}" data-mod="email">
              <span class="rail-icon">✉️</span>
              <span>Email</span>
              <span class="rail-badge ${emailDone ? "done" : ""}">${emailDone ? "✓" : "2"}</span>
            </button>
            <button class="rail-btn ${activeMod === "call" ? "active" : ""}" data-mod="call">
              <span class="rail-icon">📞</span>
              <span>Call</span>
              <span class="rail-badge ${callDone ? "done" : ""}">${callDone ? "✓" : "!"}</span>
            </button>
            <button class="rail-btn ${activeMod === "documents" ? "active" : ""}" data-mod="documents">
              <span class="rail-icon">📁</span>
              <span>Docs</span>
              <span class="rail-badge ${docDone ? "done" : ""}">${docDone ? "✓" : "3"}</span>
            </button>
          </aside>

          <!-- Main Virtual Workplace -->
          <section class="portrai-main">
            <div class="portrai-topbar">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <span class="pill" style="background:#001B2E;color:#fff;">● Proctoring &nbsp;|&nbsp; <span style="color:#34d399;">📶 Strong</span></span>
                <span style="font-weight:800;font-size:13.5px;color:var(--primary);">${data.title} (${idx + 1}/${pool.length})</span>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <span style="font-size:11.5px;color:var(--text-muted);font-weight:600;">Assessment berakhir dalam</span>
                <div class="timer-pill" id="portraiTimer">25:00</div>
                <button class="btn btn-accent btn-sm" id="btnFinishPortrai">Selesaikan Assessment</button>
              </div>
            </div>

            <div class="portrai-body">
              ${renderModuleBody(item, emailDone, chatDone, docDone)}
            </div>
          </section>

          <!-- Docked Virtual Assistant (Slide 7: Your AI Assistant) -->
          <aside class="portrai-assistant">
            <div class="assistant-head">
              <span>🤖 Your AI Assistant</span>
              <span style="font-size:11px;opacity:0.85;">Virtual Assistant</span>
            </div>
            <div style="padding:8px 10px;border-bottom:1px solid var(--border);background:#fff;">
              <div class="tag-row" style="margin:0;">
                ${item.aiHints
                  .map((h, i) => `<button class="btn btn-outline-dark btn-sm" style="font-size:11px;padding:4px 8px;" data-ai-hint="${i}">${h.q}</button>`)
                  .join("")}
              </div>
            </div>
            <div class="assistant-messages" id="aiMessages">
              ${ws.aiChat
                .map(
                  (m) => `
                <div class="chat-msg ${m.role}" style="max-width:92%;font-size:12.5px;">
                  <div class="chat-sender">${m.role === "ai" ? "Your AI Assistant" : "Anda"}</div>
                  <div>${m.text}</div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="assistant-foot">
              <div style="display:flex;gap:6px;">
                <input type="text" id="aiCopilotInput" class="select-input" style="min-width:0;flex:1;padding:7px 10px;font-size:12.5px;" placeholder="Type your message here..." />
                <button class="btn btn-primary btn-sm" id="btnAskAi">➤</button>
              </div>
            </div>
          </aside>
        </div>
      `;

      bindEvents(item);
    }

    function renderModuleBody(item, emailDone, chatDone, docDone) {
      // SLIDE 2 & 9: HOME DASHBOARD (Message from the Executives + Notification Center)
      if (activeMod === "home") {
        const uname = state.currentUser ? state.currentUser.full_name : "Peserta";
        const simRole = gradeId === "BOD-3" ? "GM of Earth Manufacturing" : "AVP of Earth Operation";
        return `
          <div style="margin-bottom:16px;">
            <div style="font-size:13px;color:var(--text-muted);font-weight:600;">Hi ${uname}</div>
            <h2 style="font-size:22px;color:var(--primary);font-weight:800;">Welcome, ${simRole}</h2>
          </div>

          <div class="grid-2" style="grid-template-columns:1.25fr 0.85fr;align-items:start;">
            <div class="card" style="padding:0;overflow:hidden;margin-bottom:0;">
              <div style="background:linear-gradient(135deg,#002B49,#0A3D62);color:#fff;padding:12px 16px;font-weight:700;font-size:13.5px;display:flex;justify-content:space-between;">
                <span>📌 Message from the Executives</span>
                <span style="font-size:11.5px;opacity:0.85;">Page 1 / 1</span>
              </div>
              <div style="padding:18px;font-size:13.5px;line-height:1.65;">
                <div style="font-weight:800;color:var(--primary);margin-bottom:8px;">President Director — Arahan Awal Sesi</div>
                <p style="margin-bottom:10px;">Dear ${uname},</p>
                <p style="margin-bottom:10px;">
                  Selamat bergabung dalam peran Anda hari ini. Fokus utama kita adalah menangani isu strategis terkait:
                  <strong>"${item.title}"</strong> (Unit: ${item.unit}).
                </p>
                <p style="margin-bottom:10px;">
                  Mohon tinjau seluruh dokumen referensi di menu <strong>Docs</strong>, balas setiap <strong>Email</strong> dan <strong>Chat</strong> yang masuk secara tepat,
                  serta berikan arahan tegas pada sesi <strong>Call</strong> bersama rekan kerja Anda.
                </p>
                <p style="font-weight:700;color:var(--primary);">Best regards,<br/>President Director</p>
              </div>
            </div>

            <div>
              <h4 style="color:var(--primary);margin-bottom:10px;">Notification Center</h4>
              <div style="display:flex;flex-direction:column;gap:10px;">
                <div class="memo-box" style="margin:0;border-left-color:var(--primary-light);background:#fff;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>💬 Chats (${ws.contacts.length} percakapan)</strong>
                    <button class="btn btn-outline-dark btn-sm" data-mod="chat">View Chats</button>
                  </div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${item.chat.partnerName}: pesan baru menunggu respon.</div>
                </div>

                <div class="memo-box" style="margin:0;border-left-color:var(--accent);background:#fff;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>✉️ Emails (2 pesan masuk)</strong>
                    <button class="btn btn-outline-dark btn-sm" data-mod="email">View Mails</button>
                  </div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${item.email.subject}</div>
                </div>

                <div class="memo-box" style="margin:0;border-left-color:var(--emerald);background:#fff;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>📁 New Document</strong>
                    <button class="btn btn-outline-dark btn-sm" data-mod="documents">Open Docs</button>
                  </div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${item.documents.title}</div>
                </div>

                <div class="memo-box" style="margin:0;border-left-color:#ef4444;background:#fff;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>📞 Coming Up Call</strong>
                    <button class="btn btn-outline-dark btn-sm" data-mod="call">Open Call</button>
                  </div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${item.call.partnerName} siap menghubungi Anda.</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // SLIDE 3: EMAIL (Inbox & Draft tabs + Multiple Emails)
      if (activeMod === "email") {
        const emails = [
          {
            from: item.email.from,
            subject: item.email.subject,
            time: "09:15 AM",
            tag: ws.emailSentMap[0] ? "TERBALAS ✓" : "PRIORITAS TINGGI",
            body: item.email.body
          },
          {
            from: "Divisi Kepatuhan & Tata Kelola <compliance@perusahaan.co.id>",
            subject: "Konfirmasi Kepatuhan SOP & Laporan Mitigasi Risiko",
            time: "09:30 AM",
            tag: ws.emailSentMap[1] ? "TERBALAS ✓" : "PERLU RESPON",
            body: `<p>Yth. Pimpinan Unit,<br/>Mohon konfirmasi singkat langkah kontrol kepatuhan dan batas kewenangan yang Anda terapkan pada kasus "${item.title}" agar dapat kami catat dalam laporan tata kelola mingguan.</p>`
          }
        ];
        const cur = emails[ws.selectedEmail];

        return `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <div style="display:flex;gap:8px;">
              <button class="btn ${ws.emailTab === "inbox" ? "btn-primary" : "btn-outline-dark"} btn-sm" id="btnTabInbox">📥 Inbox (${emails.length})</button>
              <button class="btn ${ws.emailTab === "draft" ? "btn-primary" : "btn-outline-dark"} btn-sm" id="btnTabDraft">📝 Draft</button>
            </div>
            <span style="font-size:12px;color:var(--text-muted);">Pastikan Anda membalas seluruh email yang masuk.</span>
          </div>

          <div class="email-layout">
            <div class="email-list">
              ${emails
                .map(
                  (em, i) => `
                <div class="email-item ${ws.selectedEmail === i ? "active" : ""}" data-email-idx="${i}">
                  <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);">
                    <span class="email-item-sender">${em.from.split("<")[0].trim()}</span>
                    <span>${em.time}</span>
                  </div>
                  <div class="email-item-subj">${em.subject}</div>
                  <span class="tag" style="margin-top:4px;display:inline-block;background:${ws.emailSentMap[i] ? "var(--emerald-soft)" : "#e2e8f0"};color:${ws.emailSentMap[i] ? "#065f46" : "#1e293b"};">${em.tag}</span>
                </div>
              `
                )
                .join("")}
            </div>
            <div>
              <div class="memo-box" style="margin-bottom:12px;">
                <div style="font-size:12px;color:var(--text-muted);"><strong>Dari:</strong> ${cur.from} • ${cur.time}</div>
                <h4 style="margin-top:4px;">${cur.subject}</h4>
                <div style="margin-top:8px;">${cur.body}</div>
              </div>
              <label style="font-weight:700;font-size:13px;display:block;margin-bottom:6px;">
                Balasan Email Anda ${ws.emailSentMap[ws.selectedEmail] ? '<span class="pill pill-green">✓ Terkirim</span>' : ""}:
              </label>
              <textarea class="textarea-box" id="emailReplyInput" placeholder="Yth. Bapak/Ibu...\n\nMenindaklanjuti email di atas, berikut keputusan dan langkah kami...">${ws.emailReplies[ws.selectedEmail] || ""}</textarea>
              <div style="display:flex;justify-content:flex-end;margin-top:10px;">
                <button class="btn btn-primary btn-sm" id="btnSendEmail">${ws.emailSentMap[ws.selectedEmail] ? "Perbarui & Kirim Ulang" : "Kirim Balasan Email"}</button>
              </div>
            </div>
          </div>
        `;
      }

      // SLIDE 4: CHAT (Multi-contact sidebar + Live chat)
      if (activeMod === "chat") {
        const curC = ws.contacts[ws.activeContact];
        return `
          <div class="email-layout">
            <div class="email-list">
              <div style="padding:10px 12px;font-weight:800;font-size:12px;color:var(--primary);border-bottom:1px solid var(--border);background:#fff;">Daftar Kontak Chat</div>
              ${ws.contacts
                .map(
                  (c, i) => `
                <div class="email-item ${ws.activeContact === i ? "active" : ""}" data-contact-idx="${i}">
                  <div class="email-item-sender">${c.name}</div>
                  <div style="font-size:11.5px;color:var(--text-muted);">${c.role}</div>
                  <span class="tag" style="margin-top:4px;display:inline-block;">${c.messages.filter((m) => m.role === "user").length} balasan</span>
                </div>
              `
                )
                .join("")}
            </div>
            <div>
              <div style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <strong style="color:var(--primary);">${curC.name}</strong>
                  <span class="pill pill-green" style="margin-left:6px;">● Online</span>
                </div>
                <span style="font-size:12px;color:var(--text-muted);">Respon seluruh chat yang masuk</span>
              </div>
              <div class="chat-box" id="chatBox" style="max-height:340px;">
                ${curC.messages
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
                <input type="text" id="chatInput" class="select-input" style="flex:1;" placeholder="Type your message..." />
                <button class="btn btn-primary" id="btnSendChat">➤</button>
              </div>
            </div>
          </div>
        `;
      }

      // SLIDE 5: CALL (Left Video Tiles + Right Live Transcript)
      if (activeMod === "call") {
        return `
          <div class="grid-2" style="grid-template-columns:1.1fr 0.9fr;align-items:start;">
            <div>
              <div class="call-stage" style="margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                  <span class="pill pill-green">${ws.callStarted ? "● Live Call • <span id='callElapsedEl'>" + String(Math.floor(ws.callSeconds / 60)).padStart(2, "0") + ":" + String(ws.callSeconds % 60).padStart(2, "0") + "</span>" : "Siap Terhubung"}</span>
                  <button class="btn ${ws.callStarted ? "btn-danger" : "btn-emerald"} btn-sm" id="btnToggleCall">
                    ${ws.callStarted ? "📞 End Call" : "📞 Mulai Call"}
                  </button>
                </div>

                <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:12px;">
                  <div class="call-tile ${ws.callStarted ? "speaking" : ""}">
                    <div class="call-avatar">AI</div>
                    <div style="font-weight:700;font-size:14px;">${item.call.partnerName}</div>
                  </div>
                  <div class="call-tile">
                    ${
                      callCamStream
                        ? `<video id="callSelfCam" autoplay muted playsinline style="width:100%;max-height:110px;border-radius:8px;object-fit:cover;background:#000;margin-bottom:6px;"></video>`
                        : `<div class="call-avatar" style="background:linear-gradient(135deg,#F37021,#FF8C38);">ANDA</div>`
                    }
                    <div style="font-weight:700;font-size:14px;">${state.currentUser ? state.currentUser.full_name : "Peserta"}</div>
                  </div>
                </div>

                <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                  <button class="btn btn-outline btn-sm" id="btnToggleCallCam">${callCamStream ? "Matikan Kamera" : "📹 Kamera"}</button>
                  <button class="btn btn-outline btn-sm" id="btnReplayVoice">🔊 Dengar Suara</button>
                  <button class="btn ${isRecordingCallAudio ? "btn-danger" : "btn-outline"} btn-sm" id="btnVoiceDictate">
                    ${isRecordingCallAudio ? "⏹ Stop Rekam Suara" : "🎙️ Rekam Suara + Transkrip"}
                  </button>
                </div>
                ${
                  ws.callAudioUrl
                    ? `<div style="margin-top:8px;text-align:center;">
                         <audio controls src="${ws.callAudioUrl}" style="width:100%;height:32px;"></audio>
                         <div style="font-size:11px;color:#86efac;margin-top:3px;">${ws.callAudioSavedLabel || "✓ Rekaman suara siap"}</div>
                       </div>`
                    : ""
                }
                <div style="margin-top:8px;text-align:center;">
                  <select id="voiceSelect" class="select-input" style="min-width:200px;padding:4px 8px;font-size:11px;background:rgba(255,255,255,0.1);color:#e2e8f0;border-color:rgba(255,255,255,0.2);">
                    ${
                      getIndonesianVoices().length > 0
                        ? getIndonesianVoices()
                            .map((v) => `<option value="${v.name}" style="color:#0f172a;" ${selectedVoiceName === v.name ? "selected" : ""}>Suara: ${v.name}</option>`)
                            .join("")
                        : `<option value="" style="color:#0f172a;">Suara Default Sistem</option>`
                    }
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div class="card" style="padding:16px;margin-bottom:12px;">
                <h4 style="color:var(--primary);margin-bottom:10px;">Transcript</h4>
                <div class="chat-box" style="max-height:220px;background:#f8fafc;">
                  ${ws.callTranscript
                    .map(
                      (t) => `
                    <div style="padding:8px 10px;background:#fff;border-radius:8px;border:1px solid var(--border);font-size:12.5px;">
                      <div style="font-weight:800;color:${t.speaker === "Anda" ? "var(--accent)" : "var(--primary)"};margin-bottom:2px;">${t.speaker}</div>
                      <div>${t.text}</div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <textarea class="textarea-box" id="callRespInput" style="min-height:90px;margin-top:8px;" placeholder="Ketik atau diktekan arahan Anda dalam panggilan ini...">${ws.callResponse}</textarea>
                <div style="display:flex;justify-content:flex-end;margin-top:8px;">
                  <button class="btn btn-primary btn-sm" id="btnSendCallReply">Kirim Respon Lisan</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // SLIDE 6: DOCUMENTS (Folders + All Files Table + Working Editor)
      if (activeMod === "documents") {
        const files = [
          { name: item.documents.title, date: "Hari ini • 08:30", owner: "Executive Office", loc: "Project_X", content: item.documents.brief },
          { name: "Pedoman Tata Kelola & Batas Kewenangan", date: "Hari ini • 08:45", owner: "Compliance Div", loc: "Policy_Docs", content: "Setiap keputusan bisnis wajib mempertimbangkan keseimbangan antara target pertumbuhan, kepatuhan SOP/regulasi, serta mitigasi risiko operasional." },
          { name: "Ringkasan KPI & SLA Layanan Mitra", date: "Hari ini • 09:00", owner: "Operations", loc: "Reports", content: "Target SLA layanan minimal 90% tepat waktu dengan tingkat akurasi dokumen 100%. Eskalasi anomali wajib didokumentasikan secara tertulis." }
        ];
        const opened = files[ws.openedFileIdx];

        return `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;gap:8px;">
              <button class="btn ${ws.docView === "files" ? "btn-primary" : "btn-outline-dark"} btn-sm" id="btnDocFiles">📁 Folders &amp; All Files</button>
              <button class="btn ${ws.docView === "editor" ? "btn-primary" : "btn-outline-dark"} btn-sm" id="btnDocEditor">📝 Buat / Edit Dokumen Kerja</button>
            </div>
            <span style="font-size:12px;color:var(--text-muted);">${ws.docSavedAt ? "Tersimpan " + ws.docSavedAt : "Pastikan membaca seluruh dokumen"}</span>
          </div>

          ${
            ws.docView === "files"
              ? `
            <div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
              <div class="rubric-item" style="min-width:130px;text-align:center;">📁 <strong>Project_X</strong></div>
              <div class="rubric-item" style="min-width:130px;text-align:center;">📁 <strong>Policy_Docs</strong></div>
              <div class="rubric-item" style="min-width:130px;text-align:center;">📁 <strong>Reports</strong></div>
            </div>

            <table class="data-table">
              <thead><tr><th>File Name</th><th>Date Created</th><th>Owner</th><th>Location</th><th>Aksi</th></tr></thead>
              <tbody>
                ${files
                  .map(
                    (f, fi) => `
                  <tr style="background:${ws.openedFileIdx === fi ? "#eff6ff" : "#fff"};">
                    <td><strong>📄 ${f.name}</strong></td>
                    <td>${f.date}</td>
                    <td>${f.owner}</td>
                    <td>📁 ${f.loc}</td>
                    <td><button class="btn btn-outline-dark btn-sm" data-open-file="${fi}">Baca</button></td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="memo-box" style="margin-top:14px;border-left-color:var(--emerald);background:#f0fdf4;">
              <h4>Pratinjau Dokumen: ${opened.name}</h4>
              <p>${opened.content}</p>
            </div>
          `
              : `
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div>
                <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">1. Ringkasan Eksekutif &amp; Keputusan Utama</label>
                <textarea class="textarea-box" id="docExecInput" style="min-height:85px;" placeholder="Ringkasan keputusan strategis/manajerial Anda...">${ws.docExecSummary}</textarea>
              </div>
              <div>
                <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">2. Analisa Data, Rasio, &amp; Risiko</label>
                <textarea class="textarea-box" id="docAnalInput" style="min-height:95px;" placeholder="Analisa angka portofolio, SLA, atau kepatuhan...">${ws.docAnalysis}</textarea>
              </div>
              <div>
                <label style="font-size:12.5px;font-weight:700;display:block;margin-bottom:4px;">3. Rencana Aksi &amp; Mitigasi (PIC &amp; Timeline)</label>
                <textarea class="textarea-box" id="docPlanInput" style="min-height:95px;" placeholder="Langkah implementasi, target waktu, dan kontrol...">${ws.docActionPlan}</textarea>
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:10px;">
              <button class="btn btn-primary btn-sm" id="btnSaveDoc">Simpan Dokumen Kerja</button>
            </div>
          `
          }
        `;
      }
      return "";
    }

    function saveDrafts() {
      const em = document.getElementById("emailReplyInput");
      if (em) ws.emailReplies[ws.selectedEmail] = em.value;
      const cl = document.getElementById("callRespInput");
      if (cl) ws.callResponse = cl.value;
      const d1 = document.getElementById("docExecInput");
      if (d1) ws.docExecSummary = d1.value;
      const d2 = document.getElementById("docAnalInput");
      if (d2) ws.docAnalysis = d2.value;
      const d3 = document.getElementById("docPlanInput");
      if (d3) ws.docActionPlan = d3.value;
    }

    function bindEvents(item) {
      document.querySelectorAll("[data-mod]").forEach((b) => {
        b.addEventListener("click", () => {
          saveDrafts();
          activeMod = b.getAttribute("data-mod");
          draw();
        });
      });

      document.querySelectorAll("[data-email-idx]").forEach((el) => {
        el.addEventListener("click", () => {
          saveDrafts();
          ws.selectedEmail = Number(el.getAttribute("data-email-idx"));
          draw();
        });
      });

      const bInbox = document.getElementById("btnTabInbox");
      if (bInbox) bInbox.addEventListener("click", () => { ws.emailTab = "inbox"; draw(); });
      const bDraft = document.getElementById("btnTabDraft");
      if (bDraft) bDraft.addEventListener("click", () => { ws.emailTab = "draft"; draw(); });

      const btnSendEmail = document.getElementById("btnSendEmail");
      if (btnSendEmail) {
        btnSendEmail.addEventListener("click", () => {
          saveDrafts();
          if ((ws.emailReplies[ws.selectedEmail] || "").trim().length < 20) {
            alert("Mohon tulis balasan email minimal 20 karakter.");
            return;
          }
          ws.emailSentMap[ws.selectedEmail] = true;
          scheduleIncomingCall(3000, 12000);
          draw();
        });
      }

      document.querySelectorAll("[data-contact-idx]").forEach((el) => {
        el.addEventListener("click", () => {
          ws.activeContact = Number(el.getAttribute("data-contact-idx"));
          draw();
        });
      });

      const btnChat = document.getElementById("btnSendChat");
      if (btnChat) {
        const send = () => {
          const inp = document.getElementById("chatInput");
          const txt = inp.value.trim();
          if (!txt) return;
          const curC = ws.contacts[ws.activeContact];
          if (ws.chatFirstReplySec === null) {
            ws.chatFirstReplySec = Math.max(1, Math.round((Date.now() - (ws.startedAt || Date.now())) / 1000));
          }
          curC.messages.push({ sender: "Anda", role: "user", text: txt });
          curC.turn++;
          const lower = txt.toLowerCase();
          let aiReply = "";
          if (ws.activeContact === 0) {
            if (curC.turn === 1) aiReply = item.chat.followUp;
            else if (curC.turn === 2) {
              if (/(tolak|tunda|pending|tidak bisa|audit|sop|wajib)/.test(lower)) {
                aiReply = "Saya mengerti prinsip tata kelola yang Anda pegang. Namun apa komitmen waktu atau solusi alternatif konkret yang bisa Anda tawarkan?";
              } else if (/(setuju|oke|lanjut|langsung|cairkan)/.test(lower) && !/(syarat|audit|escrow|jaminan|verifikasi)/.test(lower)) {
                aiReply = "Baik, berarti Anda menyetujui tanpa syarat tambahan ya? Bagaimana pertanggungjawabannya jika nanti ada temuan audit?";
              } else {
                aiReply = "Opsi bersyarat dan solusi kolaboratif Anda cukup masuk akal. Pastikan detailnya Anda tuangkan di Email/Documents ya.";
              }
            } else aiReply = "Terima kasih. Seluruh poin diskusi Anda sudah kami catat.";
          } else {
            aiReply = "Siap Pak/Bu, arahan prioritas Anda sudah kami terima dan segera kami jalankan bersama tim.";
          }
          curC.messages.push({ sender: curC.name, role: "ai", text: aiReply });
          draw();
        };
        btnChat.addEventListener("click", send);
        document.getElementById("chatInput").addEventListener("keydown", (e) => {
          if (e.key === "Enter") send();
        });
      }

      const btnToggleCall = document.getElementById("btnToggleCall");
      if (btnToggleCall) {
        btnToggleCall.addEventListener("click", () => {
          saveDrafts();
          if (!ws.callStarted) {
            ws.callStarted = true;
            startCallElapsedTimer();
            draw();
            speakIndonesian(item.call.prompt);
          } else {
            ws.callStarted = false;
            ws.callEnded = true;
            if (callDurationInterval) {
              clearInterval(callDurationInterval);
              callDurationInterval = null;
            }
            draw();
          }
        });
      }

      const selfCamEl = document.getElementById("callSelfCam");
      if (selfCamEl && callCamStream) selfCamEl.srcObject = callCamStream;

      const btnCam = document.getElementById("btnToggleCallCam");
      if (btnCam) {
        btnCam.addEventListener("click", async () => {
          saveDrafts();
          if (!callCamStream) {
            try {
              callCamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
              draw();
            } catch {
              alert("Kamera tidak tersedia atau izin ditolak.");
            }
          } else {
            callCamStream.getTracks().forEach((t) => t.stop());
            callCamStream = null;
            draw();
          }
        });
      }

      const btnSendCallReply = document.getElementById("btnSendCallReply");
      if (btnSendCallReply) {
        btnSendCallReply.addEventListener("click", () => {
          saveDrafts();
          const txt = ws.callResponse.trim();
          if (txt.length < 15) {
            alert("Mohon sampaikan arahan atau respon Anda minimal 15 karakter.");
            return;
          }
          ws.callTranscript.push({ speaker: "Anda", text: txt });
          const lower = txt.toLowerCase();
          const reply = /(prioritas|coaching|sop|sla|audit|mitigasi|target|pic)/.test(lower)
            ? "Baik, arahan Anda sangat jelas. Saya akan langsung jalankan sesuai prioritas dan melaporkan progresnya sore ini."
            : "Baik saya catat, namun mohon pastikan juga pembagian prioritas dan batas waktunya agar tim kami tidak ragu saat eksekusi.";
          ws.callTranscript.push({ speaker: item.call.partnerName, text: reply });
          ws.callResponse = "";
          draw();
          speakIndonesian(reply);
        });
      }

      const btnReplay = document.getElementById("btnReplayVoice");
      if (btnReplay) btnReplay.addEventListener("click", () => speakIndonesian(item.call.prompt));

      const voiceSel = document.getElementById("voiceSelect");
      if (voiceSel) voiceSel.addEventListener("change", (e) => { selectedVoiceName = e.target.value; });

      const btnVoice = document.getElementById("btnVoiceDictate");
      if (btnVoice) {
        btnVoice.addEventListener("click", async () => {
          saveDrafts();
          if (!isRecordingCallAudio) {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              callAudioStream = stream;
              const chunks = [];
              const opts = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                ? { mimeType: "audio/webm;codecs=opus", audioBitsPerSecond: 48000 }
                : { audioBitsPerSecond: 48000 };
              callAudioRecorder = new MediaRecorder(stream, opts);
              callAudioRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) chunks.push(e.data);
              };
              callAudioRecorder.onstop = async () => {
                if (callSpeechRec) {
                  try { callSpeechRec.stop(); } catch {}
                  callSpeechRec = null;
                }
                const blob = new Blob(chunks, { type: "audio/webm" });
                ws.callAudioUrl = URL.createObjectURL(blob);
                ws.callAudioSavedLabel = "⏳ Mengunggah rekaman suara ke server...";
                stream.getTracks().forEach((t) => t.stop());
                callAudioStream = null;
                draw();

                if (window.SupabaseService && state.currentUser) {
                  const up = await window.SupabaseService.uploadMedia(blob, `call_${state.currentUser.nip}_${gradeId}.webm`);
                  if (up.ok && up.url) {
                    ws.callAudioUrl = up.url;
                    ws.callAudioSavedLabel = up.storage === "cloud" ? "✓ Rekaman suara tersimpan di Cloud Server" : "✓ Rekaman suara tersimpan di Database";
                    await window.SupabaseService.saveMediaRecord({
                      nip: state.currentUser.nip,
                      fullName: state.currentUser.full_name,
                      grade: gradeId,
                      unit: state.currentUser.unit || state.unitFilter,
                      activity: `PortrAI Call — ${item.title}`,
                      mediaType: "audio",
                      mediaUrl: up.url,
                      transcript: ws.callResponse || ws.callTranscript.filter((t) => t.speaker === "Anda").map((t) => t.text).join(" | "),
                      durationSec: ws.callSeconds,
                      score: 0,
                      aiMetrics: { pickupDelaySec: ws.callPickupDelaySec, turns: ws.callTranscript.filter((t) => t.speaker === "Anda").length }
                    });
                  } else {
                    ws.callAudioSavedLabel = "⚠ Tersimpan lokal (klik Unduh atau aktifkan bucket Storage)";
                  }
                  draw();
                }
              };
              callAudioRecorder.start();
              isRecordingCallAudio = true;

              const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
              if (SR) {
                try {
                  callSpeechRec = new SR();
                  callSpeechRec.lang = "id-ID";
                  callSpeechRec.continuous = true;
                  callSpeechRec.interimResults = false;
                  callSpeechRec.onresult = (ev) => {
                    const said = ev.results[ev.results.length - 1][0].transcript;
                    ws.callResponse = (ws.callResponse ? ws.callResponse + " " : "") + said;
                    const box = document.getElementById("callRespInput");
                    if (box) box.value = ws.callResponse;
                  };
                  callSpeechRec.start();
                } catch {}
              }
              draw();
            } catch {
              alert("Mikrofon tidak tersedia atau izin ditolak. Anda tetap dapat mengetik arahan di kotak Transcript.");
            }
          } else {
            if (callAudioRecorder && callAudioRecorder.state !== "inactive") callAudioRecorder.stop();
            isRecordingCallAudio = false;
          }
        });
      }

      const bDocF = document.getElementById("btnDocFiles");
      if (bDocF) bDocF.addEventListener("click", () => { saveDrafts(); ws.docView = "files"; draw(); });
      const bDocE = document.getElementById("btnDocEditor");
      if (bDocE) bDocE.addEventListener("click", () => { saveDrafts(); ws.docView = "editor"; draw(); });

      document.querySelectorAll("[data-open-file]").forEach((b) => {
        b.addEventListener("click", () => {
          ws.openedFileIdx = Number(b.getAttribute("data-open-file"));
          if (!ws.openedFilesSet) ws.openedFilesSet = {};
          ws.openedFilesSet[ws.openedFileIdx] = true;
          draw();
        });
      });

      const btnSaveDoc = document.getElementById("btnSaveDoc");
      if (btnSaveDoc) {
        btnSaveDoc.addEventListener("click", () => {
          saveDrafts();
          ws.docSavedAt = new Date().toLocaleTimeString("id-ID");
          draw();
        });
      }

      document.querySelectorAll("[data-ai-hint]").forEach((b) => {
        b.addEventListener("click", () => {
          ws.aiPromptsCount = (ws.aiPromptsCount || 0) + 1;
          const h = item.aiHints[Number(b.getAttribute("data-ai-hint"))];
          ws.aiChat.push({ role: "user", text: h.q });
          ws.aiChat.push({ role: "ai", text: h.a });
          draw();
        });
      });

      const btnAskAi = document.getElementById("btnAskAi");
      const askAi = () => {
        const inp = document.getElementById("aiCopilotInput");
        const q = inp.value.trim();
        if (!q) return;
        ws.aiPromptsCount = (ws.aiPromptsCount || 0) + 1;
        ws.aiChat.push({ role: "user", text: q });
        const ql = q.toLowerCase();
        let ans = `Berdasarkan konteks "${item.title}", pastikan Anda merespon seluruh Email & Chat, mengangkat Call, serta menyusun analisa data pada Documents.`;
        const hit = item.aiHints.find((h) => ql.includes("hitung") || ql.includes("rasio") || ql.includes("solusi") || ql.includes("syarat"));
        if (hit) ans = hit.a;
        ws.aiChat.push({ role: "ai", text: ans });
        draw();
      };
      btnAskAi.addEventListener("click", askAi);
      document.getElementById("aiCopilotInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") askAi();
      });

      document.getElementById("btnFinishPortrai").addEventListener("click", () => {
        saveDrafts();
        if (!confirm("Apakah Anda yakin ingin menyelesaikan sesi Assessment ini? Pastikan seluruh Email, Chat, Call, dan Documents sudah ditangani.")) return;
        clearTimer();
        activeMod = "eval";
        draw();
      });
    }

    function renderEval(item) {
      const countWords = (s) => (s || "").trim().split(/\s+/).filter(Boolean).length;

      // 1. Analisis Email Aktual
      const e1 = (ws.emailReplies[0] || "").trim();
      const e2 = (ws.emailReplies[1] || "").trim();
      const emailTxt = `${e1} ${e2}`.trim();
      const email1Words = countWords(e1);
      const email2Words = countWords(e2);
      const emailsSentCount = (ws.emailSentMap[0] ? 1 : 0) + (ws.emailSentMap[1] ? 1 : 0);
      const emailsDraftOnly = (!ws.emailSentMap[0] && e1.length >= 10 ? 1 : 0) + (!ws.emailSentMap[1] && e2.length >= 10 ? 1 : 0);
      const emailHasDecision = /(putus|rekomendasi|setuju|tolak|tunda|prioritas|strategi|langkah|tindak lanjut|eskalasi|mitigasi)/i.test(emailTxt);
      const emailHasPicTimeline = /(pic|tim|divisi|pukul|jam|hari ini|besok|minggu|target|deadline|sla|h\+\d)/i.test(emailTxt);
      const emailHasNumbers = /\d+/.test(emailTxt);

      // 2. Analisis Chat Aktual (kecepatan, jumlah kontak dibalas, panjang pesan)
      const userChatMsgs = ws.contacts.flatMap((c) => c.messages.filter((m) => m.role === "user").map((m) => m.text));
      const chatTxt = userChatMsgs.join(" ").trim();
      const chatContactsReplied = ws.contacts.filter((c) => c.messages.some((m) => m.role === "user")).length;
      const unrepliedContacts = ws.contacts.filter((c) => !c.messages.some((m) => m.role === "user")).map((c) => c.name);
      const chatAvgWords = userChatMsgs.length > 0 ? Math.round(userChatMsgs.reduce((acc, t) => acc + countWords(t), 0) / userChatMsgs.length) : 0;
      const chatFirstReplySec = ws.chatFirstReplySec;

      // 3. Analisis Call Aktual
      const callUserMsgs = ws.callTranscript.filter((t) => t.speaker === "Anda").map((t) => t.text);
      const callTxt = `${callUserMsgs.join(" ")} ${ws.callResponse || ""}`.trim();
      const callWords = countWords(callTxt);
      const callHandled = ws.callStarted || ws.callEnded || callUserMsgs.length > 0;
      const callHasAction = /(prioritas|coaching|sop|sla|audit|mitigasi|target|pic|koordinasi|evaluasi|solusi)/i.test(callTxt);

      // 4. Analisis Dokumen Kerja Aktual
      const secExec = (ws.docExecSummary || "").trim();
      const secAnal = (ws.docAnalysis || "").trim();
      const secPlan = (ws.docActionPlan || "").trim();
      const docCombined = `${secExec} ${secAnal} ${secPlan}`.trim();
      const docWords = countWords(docCombined);
      const docFilledSections = [
        secExec.length >= 15 ? "Ringkasan Eksekutif" : null,
        secAnal.length >= 15 ? "Analisa Data & Risiko" : null,
        secPlan.length >= 15 ? "Rencana Aksi & Timeline" : null
      ].filter(Boolean);
      const docMissingSections = [
        secExec.length < 15 ? "Ringkasan Eksekutif" : null,
        secAnal.length < 15 ? "Analisa Data & Risiko" : null,
        secPlan.length < 15 ? "Rencana Aksi & Timeline" : null
      ].filter(Boolean);
      const docFilesOpenedCount = ws.openedFilesSet ? Object.keys(ws.openedFilesSet).length : 1;

      // 5. Analisis Substansi, Anti-Spam & Skor Berbasis Bukti Nyata
      const combined = `${emailTxt} ${chatTxt} ${callTxt} ${docCombined}`.toLowerCase();
      const combinedWords = combined.split(/\s+/).filter(Boolean);
      const uniqueRatio = combinedWords.length > 0 ? new Set(combinedWords.map((w) => w.replace(/[^a-z0-9]/g, ""))).size / combinedWords.length : 0;
      const isSpammy = combinedWords.length >= 20 && uniqueRatio < 0.36;
      const matched = item.keywords.filter((k) => combined.includes(k.toLowerCase()));
      const missingKeywords = item.keywords.filter((k) => !combined.includes(k.toLowerCase()));
      const hasMetrics = /\d+/.test(combined);
      const elapsedSec = Math.max(1, Math.round((Date.now() - (ws.startedAt || Date.now())) / 1000));

      const emailOk = emailsSentCount >= 1 && email1Words + email2Words >= 18;
      const chatOk = chatContactsReplied >= 1 && userChatMsgs.length >= 1 && chatAvgWords >= 5;
      const callOk = callHandled && callWords >= 12;
      const docOk = docFilledSections.length >= 2 && docWords >= 25;
      const modulesCompleted = [emailOk, chatOk, callOk, docOk].filter(Boolean).length;

      // Skor benar-benar dihitung dari kualitas & kelengkapan nyata tiap modul (bukan angka asal)
      const emailScore =
        (emailsSentCount === 2 ? 12 : emailsSentCount === 1 ? 7 : emailTxt.length >= 15 ? 4 : 0) +
        (emailHasDecision ? 5 : 0) +
        (emailHasPicTimeline ? 4 : 0) +
        (emailHasNumbers ? 4 : 0); // max 25
      const chatScore =
        (chatContactsReplied === ws.contacts.length ? 10 : chatContactsReplied === 1 ? 6 : 0) +
        (userChatMsgs.length >= 2 ? 5 : userChatMsgs.length === 1 ? 3 : 0) +
        (chatAvgWords >= 6 && chatAvgWords <= 75 ? 5 : chatAvgWords > 75 ? 3 : chatAvgWords > 0 ? 2 : 0) +
        (chatFirstReplySec !== null && chatFirstReplySec <= 180 ? 5 : chatFirstReplySec !== null ? 2 : 0); // max 25
      const callScore =
        (callHandled ? 8 : 0) +
        (callUserMsgs.length >= 1 && callWords >= 12 ? 7 : callWords > 0 ? 3 : 0) +
        (callHasAction ? 5 : 0); // max 20
      const docScore =
        docFilledSections.length * 4 + // max 12
        (docWords >= 45 ? 4 : docWords >= 20 ? 2 : 0) +
        (docFilesOpenedCount >= 2 ? 2 : 0); // max 18
      const substScore = Math.min(12, Math.round((matched.length / Math.max(5, item.keywords.length * 0.6)) * 12)); // max 12

      let score = emailScore + chatScore + callScore + docScore + substScore;
      if (isSpammy) score = Math.min(score, 35);
      score = Math.min(99, Math.max(20, score));

      if (!state.flowResults.potrai) state.flowResults.potrai = [];
      state.flowResults.potrai[idx] = score;

      // Susun Kekuatan & Perbaikan 100% dari Bukti Aktual Pengerjaan Peserta
      const strengths = [];
      const improvements = [];

      // -- Evaluasi Email --
      if (emailsSentCount === 2) {
        strengths.push({
          area: "Email (Decision Making)",
          detail: `Seluruh email masuk (2/2) sudah Anda balas & kirim (${email1Words + email2Words} kata)${emailHasDecision ? " dengan arahan keputusan yang jelas" : ""}${emailHasPicTimeline ? " serta menyertakan PIC/timeline" : ""}.`
        });
      } else if (emailsSentCount === 1) {
        const missingName = !ws.emailSentMap[0] ? "Email #1 (Utama)" : "Email #2 (Tindak Lanjut)";
        improvements.push({
          area: "Email Belum Lengkap (1/2 Terkirim)",
          detail: `${missingName} belum terkirim. Pada asesmen resmi, seluruh email di Inbox wajib dibalas agar semua indikator kompetensi tercatat.`
        });
      } else {
        improvements.push({
          area: "Email Belum Terkirim (0/2)",
          detail: emailsDraftOnly > 0
            ? `Anda sempat menulis draft pada ${emailsDraftOnly} email tetapi lupa menekan tombol "Kirim Balasan". Pastikan selalu kirim sebelum mengakhiri sesi.`
            : "Belum ada email yang dibalas. Segera tanggapi email masuk dengan struktur: Keputusan → Dasar Data → Langkah Aksi + PIC/Deadline."
        });
      }
      if (emailTxt.length >= 10 && !emailHasPicTimeline) {
        improvements.push({
          area: "Struktur Tindak Lanjut Email",
          detail: "Balasan email Anda belum mencantumkan PIC atau batas waktu (jam/hari/SLA). Tambahkan siapa yang bertanggung jawab dan kapan target selesainya."
        });
      }

      // -- Evaluasi Chat --
      if (userChatMsgs.length === 0) {
        improvements.push({
          area: "Chat Belum Direspon (0 Pesan)",
          detail: `Belum ada kontak chat yang dibalas (${unrepliedContacts.join(", ")}). Saat notifikasi chat masuk, segera balas cepat dan ringkas agar stakeholder tidak menunggu.`
        });
      } else {
        if (chatContactsReplied === ws.contacts.length) {
          strengths.push({
            area: "Chat Responsif (Customer & Partnerships)",
            detail: `Anda membalas seluruh kontak chat (${chatContactsReplied}/${ws.contacts.length}, total ${userChatMsgs.length} pesan, rata-rata ${chatAvgWords} kata/pesan)${chatFirstReplySec <= 180 ? ` dengan respon awal cepat (${chatFirstReplySec} detik)` : ""}.`
          });
        } else {
          improvements.push({
            area: `Kontak Chat Terlewat (${chatContactsReplied}/${ws.contacts.length})`,
            detail: `Anda belum membalas chat dari: ${unrepliedContacts.join(", ")}. Pastikan seluruh tab kontak di menu Chat mendapat arahan.`
          });
        }
        if (chatFirstReplySec > 180) {
          improvements.push({
            area: `Kecepatan Respon Chat (${Math.round(chatFirstReplySec / 60)} menit)`,
            detail: `Chat pertama baru dibalas pada menit ke-${Math.round(chatFirstReplySec / 60)}. Pada simulasi PortrAI, biasakan merespon chat segera (idealnya < 3 menit) agar tidak dianggap lamban.`
          });
        }
        if (chatAvgWords > 80) {
          improvements.push({
            area: `Pesan Chat Terlalu Panjang (Rata-rata ${chatAvgWords} kata/pesan)`,
            detail: "Chat Anda terlalu panjang seperti format email. Gunakan kalimat ringkas 2–4 kalimat yang langsung pada komitmen aksi & jam follow-up."
          });
        } else if (chatAvgWords < 6) {
          improvements.push({
            area: `Pesan Chat Terlalu Singkat (Rata-rata ${chatAvgWords} kata/pesan)`,
            detail: "Balasan chat terlalu singkat sehingga kurang menunjukkan empati dan arah solusi. Sertakan minimal 1 langkah konkret & target waktu."
          });
        }
      }

      // -- Evaluasi Call --
      if (!callHandled) {
        improvements.push({
          area: "Telepon (Call) Tidak Diangkat",
          detail: ws.callDismissedCount > 0
            ? `Anda menunda panggilan masuk (${ws.callDismissedCount}x) dan belum mengangkatnya hingga selesai. Pada asesmen nyata, panggilan masuk wajib diangkat untuk menilai kompetensi kepemimpinan & coaching.`
            : "Anda belum melakukan interaksi pada fitur Call. Aktifkan/angkat panggilan dan sampaikan arahan prioritas secara jelas."
        });
      } else if (callUserMsgs.length === 0 || callWords < 12) {
        improvements.push({
          area: "Arahan Lisan di Call Kurang Mendalam",
          detail: `Panggilan sudah diangkat${ws.callPickupDelaySec ? ` dalam ${ws.callPickupDelaySec} detik` : ""}, namun belum ada arahan lisan konkret yang dikirim di Transcript (${callWords} kata). Sampaikan prioritas, pembagian tugas, dan batas waktu.`
        });
      } else {
        strengths.push({
          area: "Penanganan Call (Coaching & Inspiring)",
          detail: `Anda menangani panggilan masuk${ws.callPickupDelaySec ? ` (diangkat dalam ${ws.callPickupDelaySec} detik)` : ""} dengan ${callUserMsgs.length} giliran arahan (${callWords} kata)${callHasAction ? " yang memuat prioritas & langkah aksi jelas" : ""}.`
        });
      }

      // -- Evaluasi Dokumen --
      if (docFilledSections.length === 3) {
        strengths.push({
          area: "Kelengkapan Dokumen Analisa (3/3 Bagian)",
          detail: `Ketiga bagian dokumen kerja (Ringkasan Eksekutif, Analisa Data/Risiko, Rencana Aksi) terisi lengkap (${docWords} kata) dan Anda membuka ${docFilesOpenedCount}/3 file referensi.`
        });
      } else {
        improvements.push({
          area: `Dokumen Kerja Belum Lengkap (${docFilledSections.length}/3 Bagian)`,
          detail: `Bagian yang masih kosong/terlalu singkat: ${docMissingSections.join(", ")}. Lengkapi seluruh struktur agar kompetensi Planning & Organizing dinilai optimal.`
        });
      }
      if (docFilesOpenedCount < 2) {
        improvements.push({
          area: `Referensi Dokumen Kurang Dibaca (${docFilesOpenedCount}/3 File)`,
          detail: "Anda baru membuka 1 file referensi. Biasakan memeriksa Pedoman Tata Kelola dan Ringkasan KPI/SLA agar keputusan Anda tidak bertentangan dengan aturan perusahaan."
        });
      }

      // -- Evaluasi Data Kuantitatif & Konsep Kunci --
      if (hasMetrics) {
        strengths.push({
          area: "Keputusan Berbasis Data Kuantitatif",
          detail: `Respon Anda sudah menyertakan angka/metrik konkret serta memenuhi ${matched.length} kata kunci strategis (${matched.slice(0, 5).join(", ")}).`
        });
      } else {
        improvements.push({
          area: gradeId === "BOD-3" ? "Business Acumen & Driving for Results (Tanpa Angka)" : "Business Awareness & Analysis (Tanpa Angka)",
          detail: "Belum ditemukan angka/metrik kuantitatif dalam jawaban Anda. Selalu kutip angka (%, Rp, target hari SLA, kapasitas) untuk memperkuat argumentasi."
        });
      }
      if (missingKeywords.length > 0 && matched.length < 5) {
        improvements.push({
          area: "Kedalaman Substansi Kasus",
          detail: `Beberapa aspek penting pada skenario ini belum disentuh dalam jawaban Anda, antara lain: ${missingKeywords.slice(0, 4).join(", ")}.`
        });
      }

      const telemetry = {
        scenarioTitle: item.title,
        score,
        subScores: { emailScore, chatScore, callScore, docScore, substScore },
        emailsSentCount,
        emailWords: email1Words + email2Words,
        chatContactsReplied,
        chatTotalContacts: ws.contacts.length,
        chatUserMsgCount: userChatMsgs.length,
        chatAvgWords,
        chatFirstReplySec,
        unrepliedContacts,
        callHandled,
        callWords,
        callPickupDelaySec: ws.callPickupDelaySec,
        callDismissedCount: ws.callDismissedCount || 0,
        docFilledSections,
        docMissingSections,
        docWords,
        docFilesOpenedCount,
        aiPromptsCount: ws.aiPromptsCount || 0,
        hasMetrics,
        matchedKeywords: matched,
        missingKeywords: missingKeywords.slice(0, 4),
        elapsedSec,
        strengths,
        improvements
      };

      if (!state.flowResults.potraiTelemetry) state.flowResults.potraiTelemetry = [];
      state.flowResults.potraiTelemetry[idx] = telemetry;

      const trails = [
        { name: `Email (${emailsSentCount}/2 terkirim)`, ok: emailOk },
        { name: `Chat (${chatContactsReplied}/${ws.contacts.length} kontak • ${chatAvgWords} kata/psn)`, ok: chatOk },
        { name: `Call (${callOk ? "Diangkat & Arahan Jelas" : callHandled ? "Arahan Kurang" : "Tidak Diangkat"})`, ok: callOk },
        { name: `Documents (${docFilledSections.length}/3 bagian • ${docFilesOpenedCount}/3 file dibaca)`, ok: docOk }
      ];

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi Perilaku Aktual — Behavioral Trails (${modulesCompleted}/4 Modul Tuntas)</strong>
              <div style="font-size:13px;color:var(--text-muted);">
                Durasi kerja: ${Math.floor(elapsedSec / 60)} mnt ${elapsedSec % 60} dtk • Konsep kunci terdeteksi: ${matched.length}/${item.keywords.length} • Skor Sub-modul: Email ${emailScore}/25 · Chat ${chatScore}/25 · Call ${callScore}/20 · Docs ${docScore}/18 · Substansi ${substScore}/12
              </div>
            </div>
            <div class="score-big">${score}<span style="font-size:16px;color:var(--text-muted);">/100</span></div>
          </div>
          <div class="tag-row">
            ${trails.map((t) => `<span class="tag" style="background:${t.ok ? "var(--emerald-soft)" : "var(--rose-soft)"};color:${t.ok ? "#065f46" : "#991b1b"};">${t.ok ? "✓" : "✕"} ${t.name}</span>`).join("")}
          </div>
          ${matched.length > 0 ? `<div class="tag-row">${matched.map((m) => `<span class="tag">✓ ${m}</span>`).join("")}</div>` : ""}
        </div>

        <div class="grid-2" style="margin-top:14px;">
          <div class="feedback-box info" style="margin-top:0;">
            <strong>✅ Kekuatan Nyata dari Pengerjaan Anda (${gradeId}):</strong>
            <ul style="margin-left:18px;margin-top:6px;font-size:13px;line-height:1.6;">
              ${
                strengths.length > 0
                  ? strengths.map((s) => `<li><strong>${s.area}:</strong> ${s.detail}</li>`).join("")
                  : `<li>Belum ada modul yang tuntas sepenuhnya pada sesi ini. Fokus selesaikan Email, Chat, Call, dan Documents secara berurutan.</li>`
              }
            </ul>
          </div>

          <div class="feedback-box warn" style="margin-top:0;">
            <strong>🛠️ Perbaikan Spesifik Berdasarkan Aktivitas Anda:</strong>
            <ul style="margin-left:18px;margin-top:6px;font-size:13px;line-height:1.6;">
              ${
                improvements.length > 0
                  ? improvements.map((im) => `<li><strong>${im.area}:</strong> ${im.detail}</li>`).join("")
                  : `<li>Seluruh modul Email, Chat, Call, dan Dokumen Analisa sudah Anda tangani secara lengkap, cepat, dan berbasis angka!</li>`
              }
            </ul>
          </div>
        </div>

        <div class="rubric-grid">
          ${item.rubric
            .map((r) => {
              const rl = r.toLowerCase();
              const toks = rl.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length >= 4);
              const hit =
                toks.some((t) => combined.includes(t)) ||
                (/email|decision|analysis|judgment/.test(rl) && emailOk) ||
                (/chat|customer|partner/.test(rl) && chatOk) ||
                (/call|coaching|inspir/.test(rl) && callOk) ||
                (/plan|organ|work|doc/.test(rl) && docOk);
              return `<div class="rubric-item" style="border-left:3px solid ${hit ? "#10b981" : "#f59e0b"};"><label style="color:${hit ? "#047857" : "#b45309"};">${hit ? "✓ Terbukti" : "✕ Belum Tampak"} (${gradeId})</label><div style="font-size:13px;">${r}</div></div>`;
            })
            .join("")}
        </div>
        <div class="memo-box" style="margin-top:16px;border-left-color:var(--emerald);background:#f0fdf4;">
          <h4>Benchmark Jawaban Ideal (${gradeId})</h4>
          <p>${item.benchmark}</p>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextPortrai">
            ${idx + 1 < pool.length ? "Skenario Berikutnya" : state.fullFlow ? "Lanjut ke Laporan Akhir" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    draw();
  };
})();
