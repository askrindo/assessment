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
    let activeMod = "email"; // email | chat | call | documents | eval
    let ws = createWorkspace(pool[0]);
    let ringtoneInterval = null;
    let ringAudioCtx = null;
    let callTriggerTimeout = null;
    let callDurationInterval = null;

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
      } catch {
        // ignore audio autoplay restrictions
      }
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

    let selectedVoiceName = "";

    function speakIndonesian(text) {
      try {
        if (!("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const voices = getIndonesianVoices();
        const chosen =
          (selectedVoiceName && voices.find((v) => v.name === selectedVoiceName)) || voices[0] || null;

        // Pecah per kalimat agar intonasi dan jeda terdengar alami seperti manusia
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
      } catch {
        // ignore speech errors
      }
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
      stopRingtone();
    }

    function scheduleIncomingCall(delayMs = 20000) {
      if (callTriggerTimeout) clearTimeout(callTriggerTimeout);
      if (ws.incomingCallShown || ws.callStarted || ws.callEnded || activeMod === "eval") return;
      callTriggerTimeout = setTimeout(() => {
        if (ws.incomingCallShown || ws.callStarted || ws.callEnded || activeMod === "eval") return;
        ws.incomingCallActive = true;
        ws.incomingCallShown = true;
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
        stopRingtone();
        div.remove();
        saveDrafts();
        activeMod = "call";
        ws.callStarted = true;
        if (!callDurationInterval) {
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
        draw();
        speakIndonesian(item.call.prompt);
      });

      document.getElementById("btnDismissIncoming").addEventListener("click", () => {
        ws.incomingCallActive = false;
        stopRingtone();
        div.remove();
      });
    }

    function createWorkspace(item) {
      return {
        selectedEmail: 0,
        emailReply: "",
        emailSent: false,
        chatMessages: [{ sender: item.chat.partnerName, role: "ai", text: item.chat.opening }],
        chatTurn: 0,
        incomingCallActive: false,
        incomingCallShown: false,
        callStarted: false,
        callEnded: false,
        callSeconds: 0,
        callResponse: "",
        callAiProbe: "",
        docExecSummary: "",
        docAnalysis: "",
        docActionPlan: "",
        docSavedAt: null,
        aiChat: [
          {
            role: "ai",
            text: `Halo! Saya PortrAI Assistant. Saya siap membantu Anda menganalisa skenario "${item.title}". Klik pertanyaan cepat di bawah atau ketik pertanyaan Anda.`
          }
        ]
      };
    }

    function draw() {
      const item = pool[idx];
      const emailDone = ws.emailSent || ws.emailReply.trim().length >= 25;
      const chatDone = ws.chatMessages.filter((m) => m.role === "user").length >= 2;
      const callDone = ws.callResponse.trim().length >= 25;
      const docDone = (ws.docExecSummary + ws.docAnalysis + ws.docActionPlan).trim().length >= 30;

      if (activeMod === "eval") {
        stopCallTimers();
        const pop = document.getElementById("incomingCallPopup");
        if (pop) pop.remove();
        root.innerHTML = `<div class="card">${renderEval(item)}</div>`;
        document.getElementById("btnNextPortrai").addEventListener("click", () => {
          if (idx + 1 < pool.length) {
            idx++;
            ws = createWorkspace(pool[idx]);
            activeMod = "email";
            startTimer(pool[idx].durationSec, "portraiTimer", () => {
              activeMod = "eval";
              draw();
            });
            scheduleIncomingCall(20000);
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
          <!-- Left App Rail -->
          <aside class="portrai-rail">
            <button class="rail-btn ${activeMod === "email" ? "active" : ""}" data-mod="email">
              <span class="rail-icon">✉️</span>
              <span>Email</span>
              <span class="rail-badge ${emailDone ? "done" : ""}">${emailDone ? "✓" : "1"}</span>
            </button>
            <button class="rail-btn ${activeMod === "chat" ? "active" : ""}" data-mod="chat">
              <span class="rail-icon">💬</span>
              <span>Chat</span>
              <span class="rail-badge ${chatDone ? "done" : ""}">${chatDone ? "✓" : "!"}</span>
            </button>
            <button class="rail-btn ${activeMod === "call" ? "active" : ""}" data-mod="call">
              <span class="rail-icon">📞</span>
              <span>Call</span>
              <span class="rail-badge ${callDone ? "done" : ""}">${callDone ? "✓" : "!"}</span>
            </button>
            <button class="rail-btn ${activeMod === "documents" ? "active" : ""}" data-mod="documents">
              <span class="rail-icon">📄</span>
              <span>Docs</span>
              <span class="rail-badge ${docDone ? "done" : ""}">${docDone ? "✓" : "1"}</span>
            </button>
          </aside>

          <!-- Main Virtual Workplace -->
          <section class="portrai-main">
            <div class="portrai-topbar">
              <div>
                <span class="grade-badge" style="margin-bottom:2px;">${data.title} • PortrAI Virtual Office (${idx + 1}/${pool.length})</span>
                <div style="font-weight:800;font-size:15px;color:var(--primary);">${item.title}</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;">
                <div class="timer-pill" id="portraiTimer">25:00</div>
                <button class="btn btn-emerald btn-sm" id="btnFinishPortrai">Selesai &amp; Evaluasi</button>
              </div>
            </div>

            <div class="portrai-body">
              ${renderModuleBody(item)}
            </div>
          </section>

          <!-- Docked AI Assistant Copilot -->
          <aside class="portrai-assistant">
            <div class="assistant-head">
              <span>🤖 PortrAI Assistant</span>
              <span style="font-size:11px;opacity:0.85;">Built-in Copilot</span>
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
                  <div class="chat-sender">${m.role === "ai" ? "PortrAI Assistant" : "Anda"}</div>
                  <div>${m.text}</div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="assistant-foot">
              <div style="display:flex;gap:6px;">
                <input type="text" id="aiCopilotInput" class="select-input" style="min-width:0;flex:1;padding:7px 10px;font-size:12.5px;" placeholder="Tanya AI Assistant..." />
                <button class="btn btn-primary btn-sm" id="btnAskAi">Tanya</button>
              </div>
            </div>
          </aside>
        </div>
      `;

      bindEvents(item);
    }

    function renderModuleBody(item) {
      if (activeMod === "email") {
        const emails = [
          {
            from: item.email.from,
            subject: item.email.subject,
            tag: "PRIORITAS TINGGI",
            body: item.email.body
          },
          {
            from: "Divisi Kepatuhan & Tata Kelola <compliance@asuransi-kredit.co.id>",
            subject: "FYI: Pengingat Prinsip Kehati-hatian & Batas Kewenangan POJK",
            tag: "MEMO INTERNAL",
            body: "<p>Mengingatkan seluruh pimpinan unit agar setiap persetujuan penjaminan, pembayaran klaim, dan transaksi keuangan tetap mematuhi SOP, limit kewenangan, serta kelengkapan dokumen audit.</p>"
          }
        ];
        const cur = emails[ws.selectedEmail];

        return `
          <div class="email-layout">
            <div class="email-list">
              ${emails
                .map(
                  (em, i) => `
                <div class="email-item ${ws.selectedEmail === i ? "active" : ""}" data-email-idx="${i}">
                  <div class="email-item-sender">${em.from.split("<")[0].trim()}</div>
                  <div class="email-item-subj">${em.subject}</div>
                  <span class="tag" style="margin-top:4px;display:inline-block;">${em.tag}</span>
                </div>
              `
                )
                .join("")}
            </div>
            <div>
              <div class="memo-box" style="margin-bottom:12px;">
                <div style="font-size:12px;color:var(--text-muted);"><strong>Dari:</strong> ${cur.from}</div>
                <h4 style="margin-top:4px;">${cur.subject}</h4>
                <div style="margin-top:8px;">${cur.body}</div>
              </div>
              ${
                ws.selectedEmail === 0
                  ? `
                <label style="font-weight:700;font-size:13px;display:block;margin-bottom:6px;">
                  Balasan Email Resmi Anda ${ws.emailSent ? '<span class="pill pill-green">✓ Terkirim</span>' : ""}:
                </label>
                <textarea class="textarea-box" id="emailReplyInput" placeholder="Yth. Bapak/Ibu...\n\nMenindaklanjuti email di atas, berikut keputusan dan langkah kami...">${ws.emailReply}</textarea>
                <div style="display:flex;justify-content:flex-end;margin-top:10px;">
                  <button class="btn btn-primary btn-sm" id="btnSendEmail">${ws.emailSent ? "Perbarui & Kirim Ulang" : "Kirim Balasan Email"}</button>
                </div>
              `
                  : `<div class="feedback-box info" style="margin-top:0;">Memo ini bersifat informasi (FYI). Fokuskan balasan Anda pada email pertama (Prioritas Tinggi).</div>`
              }
            </div>
          </div>
        `;
      }

      if (activeMod === "chat") {
        return `
          <div style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong style="color:var(--primary);">${item.chat.partnerName}</strong>
              <span class="pill pill-green" style="margin-left:6px;">Online</span>
            </div>
            <span style="font-size:12px;color:var(--text-muted);">Minimal 2 kali interaksi untuk bukti perilaku lengkap</span>
          </div>
          <div class="chat-box" id="chatBox" style="max-height:360px;">
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
            <input type="text" id="chatInput" class="select-input" style="flex:1;" placeholder="Ketik pesan negosiasi / role-play Anda..." />
            <button class="btn btn-primary" id="btnSendChat">Kirim</button>
          </div>
        `;
      }

      if (activeMod === "call") {
        return `
          <div class="call-stage">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <span class="pill pill-green">${ws.callStarted ? "● Live Virtual Call • <span id='callElapsedEl'>" + String(Math.floor(ws.callSeconds / 60)).padStart(2, "0") + ":" + String(ws.callSeconds % 60).padStart(2, "0") + "</span>" : "Panggilan Virtual Siap"}</span>
              <span style="font-size:12px;color:#cbd5e1;">${item.call.partnerName}</span>
            </div>
            <div class="call-tiles">
              <div class="call-tile ${ws.callStarted ? "speaking" : ""}">
                <div class="call-avatar">AI</div>
                <div style="font-weight:700;font-size:14px;">${item.call.partnerName}</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:4px;">${ws.callStarted ? "Menunggu arahan Anda..." : "Klik Mulai Panggilan"}</div>
              </div>
              <div class="call-tile">
                <div class="call-avatar" style="background:linear-gradient(135deg,#f59e0b,#d97706);">ANDA</div>
                <div style="font-weight:700;font-size:14px;">${state.currentUser ? state.currentUser.full_name : "Peserta"}</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:4px;">${gradeId}</div>
              </div>
            </div>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;align-items:center;">
              <button class="btn ${ws.callStarted ? "btn-danger" : "btn-emerald"} btn-sm" id="btnToggleCall">
                ${ws.callStarted ? "Akhiri Panggilan" : "Mulai Panggilan Virtual"}
              </button>
              <button class="btn btn-outline btn-sm" id="btnReplayVoice">🔊 Dengar Suara Rekan</button>
              <button class="btn btn-outline btn-sm" id="btnVoiceDictate">🎙️ Dikte Suara</button>
            </div>
            <div style="margin-top:10px;text-align:center;">
              <select id="voiceSelect" class="select-input" style="min-width:220px;padding:5px 10px;font-size:11.5px;background:rgba(255,255,255,0.1);color:#e2e8f0;border-color:rgba(255,255,255,0.2);">
                ${
                  getIndonesianVoices().length > 0
                    ? getIndonesianVoices()
                        .map(
                          (v) =>
                            `<option value="${v.name}" style="color:#0f172a;" ${(selectedVoiceName ? v.name === selectedVoiceName : false) ? "selected" : ""}>Suara: ${v.name}</option>`
                        )
                        .join("")
                    : `<option value="" style="color:#0f172a;">Suara Default Sistem (Buka di Edge/Chrome untuk suara Natural)</option>`
                }
              </select>
            </div>
          </div>
          <div class="memo-box" style="margin-bottom:12px;">
            <h4>Situasi Panggilan Virtual:</h4>
            <p>${item.call.prompt}</p>
          </div>
          ${ws.callAiProbe ? `<div class="feedback-box info" style="margin-bottom:12px;margin-top:0;"><strong>Tanggapan Lanjutan Rekan Call:</strong> ${ws.callAiProbe}</div>` : ""}
          <label style="font-weight:700;font-size:13px;display:block;margin-bottom:6px;">Arahan / Respon Lisan Anda dalam Call:</label>
          <textarea class="textarea-box" id="callRespInput" placeholder="Sampaikan arahan, coaching, atau keputusan Anda secara langsung...">${ws.callResponse}</textarea>
        `;
      }

      if (activeMod === "documents") {
        return `
          <div class="memo-box" style="border-left-color:var(--emerald);background:#f0fdf4;">
            <h4>${item.documents.title}</h4>
            <p>${item.documents.brief}</p>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong style="font-size:14px;color:var(--primary);">Editor Dokumen Kerja</strong>
            <span style="font-size:12px;color:var(--text-muted);">${ws.docSavedAt ? "Tersimpan pukul " + ws.docSavedAt : "Belum disimpan"}</span>
          </div>
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
        `;
      }
      return "";
    }

    function saveDrafts() {
      const em = document.getElementById("emailReplyInput");
      if (em) ws.emailReply = em.value;
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

      const btnSendEmail = document.getElementById("btnSendEmail");
      if (btnSendEmail) {
        btnSendEmail.addEventListener("click", () => {
          saveDrafts();
          if (ws.emailReply.trim().length < 20) {
            alert("Mohon tulis balasan email minimal 20 karakter.");
            return;
          }
          ws.emailSent = true;
          scheduleIncomingCall(3000);
          draw();
        });
      }

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
              aiReply = "Baik, berarti Anda menyetujui tanpa syarat tambahan ya? Bagaimana Anda mempertanggungjawabkannya jika nanti ada temuan audit internal?";
            } else {
              aiReply = "Opsi bersyarat dan solusi kolaboratif yang Anda ajukan cukup masuk akal. Pastikan detail mekanisme dan PIC-nya Anda tuangkan di Email/Documents ya.";
            }
          } else {
            aiReply = "Terima kasih. Seluruh poin negosiasi dan komitmen Anda sudah terekam dalam log diskusi.";
          }
          ws.chatMessages.push({ sender: item.chat.partnerName, role: "ai", text: aiReply });
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
          } else {
            ws.callStarted = false;
            ws.callEnded = true;
            if (ws.callResponse.trim().length >= 20 && !ws.callAiProbe) {
              ws.callAiProbe = "Baik, arahan Anda sudah jelas dan akan segera kami eksekusi sesuai koridor SOP dan target SLA.";
            }
          }
          draw();
        });
      }

      const btnReplay = document.getElementById("btnReplayVoice");
      if (btnReplay) {
        btnReplay.addEventListener("click", () => speakIndonesian(item.call.prompt));
      }

      const voiceSel = document.getElementById("voiceSelect");
      if (voiceSel) {
        voiceSel.addEventListener("change", (e) => {
          selectedVoiceName = e.target.value;
        });
      }

      const btnVoice = document.getElementById("btnVoiceDictate");
      if (btnVoice) {
        btnVoice.addEventListener("click", () => {
          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SR) {
            alert("Browser Anda belum mendukung dikte suara. Silakan ketik langsung pada kotak arahan.");
            return;
          }
          const rec = new SR();
          rec.lang = "id-ID";
          rec.onresult = (ev) => {
            const said = ev.results[0][0].transcript;
            const box = document.getElementById("callRespInput");
            if (box) box.value = (box.value ? box.value + " " : "") + said;
          };
          rec.start();
        });
      }

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
        ws.aiChat.push({ role: "user", text: q });
        const ql = q.toLowerCase();
        let ans = `Berdasarkan konteks "${item.title}", pastikan keputusan Anda menyeimbangkan prinsip kehati-hatian (SOP/risiko), SLA layanan mitra, dan solusi terukur di dokumen kerja.`;
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
        if (!ws.emailReply && !ws.callResponse && !ws.docAnalysis && !ws.docExecSummary) {
          alert("Mohon isi minimal beberapa modul kerja (Email / Chat / Call / Docs) sebelum evaluasi.");
          return;
        }
        clearTimer();
        activeMod = "eval";
        draw();
      });
    }

    function renderEval(item) {
      const userChatTxt = ws.chatMessages.filter((m) => m.role === "user").map((m) => m.text).join(" ");
      const docCombined = `${ws.docExecSummary} ${ws.docAnalysis} ${ws.docActionPlan}`;
      const combined = `${ws.emailReply} ${userChatTxt} ${ws.callResponse} ${docCombined}`.toLowerCase();
      const matched = item.keywords.filter((k) => combined.includes(k));
      const modulesCompleted = [ws.emailReply, userChatTxt, ws.callResponse, docCombined].filter((x) => x.trim().length >= 20).length;
      const score = Math.min(98, Math.max(45, Math.round((matched.length / 7) * 55 + modulesCompleted * 10 + 5)));

      if (!state.flowResults.potrai) state.flowResults.potrai = [];
      state.flowResults.potrai[idx] = score;

      const trails = [
        { name: "Operational Decision (Email)", ok: ws.emailReply.trim().length >= 20 },
        { name: "Stakeholder Role-Play (Chat AI)", ok: ws.chatMessages.filter((m) => m.role === "user").length >= 2 },
        { name: "People / Virtual Alignment (Call)", ok: ws.callResponse.trim().length >= 20 },
        { name: "Business Analysis (Documents)", ok: docCombined.trim().length >= 25 }
      ];

      return `
        <div class="feedback-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong>Evaluasi PortrAI Virtual Office — Behavioral Trails (${modulesCompleted}/4 Modul Kerja)</strong>
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
          ${item.rubric.map((r) => `<div class="rubric-item"><label>Kompetensi DDI Dinilai</label><div style="font-size:13px;">${r}</div></div>`).join("")}
        </div>
        <div class="memo-box" style="margin-top:16px;border-left-color:var(--emerald);background:#f0fdf4;">
          <h4>Benchmark Jawaban Ideal (${gradeId})</h4>
          <p>${item.benchmark}</p>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:16px;">
          <button class="btn btn-emerald" id="btnNextPortrai">
            ${idx + 1 < pool.length ? "Skenario Berikutnya" : state.fullFlow ? "Lanjut ke Metode Berikutnya" : "Lihat Ringkasan Hasil"}
          </button>
        </div>
      `;
    }

    startTimer(pool[0].durationSec, "portraiTimer", () => {
      activeMod = "eval";
      draw();
    });
    scheduleIncomingCall(20000);
    draw();
  };
})();
