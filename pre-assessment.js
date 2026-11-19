(function () {
  window.renderPreAssessmentFlow = function ({
    root,
    gradeId,
    data,
    state,
    cleanupAllSessions,
    onLaunchPersonality,
    onLaunchCap,
    onLaunchMainAssessment,
    onBackHome
  }) {
    cleanupAllSessions();

    if (!state.preFlow) {
      state.preFlow = {
        step: "profile", // profile | consent | compat | biometric | lobby
        email: localStorage.getItem("simeta_email") || "",
        dob: localStorage.getItem("simeta_dob") || "",
        consentAccepted: false,
        faceCaptured: false,
        faceDataUrl: null,
        diveStart: "-",
        diveEnd: "-",
        capStart: "-",
        capEnd: "-"
      };
    }

    let camStream = null;
    let compatStatus = { browser: true, webcamPerm: false, camera: false, env: true };

    function stopCam() {
      if (camStream) {
        camStream.getTracks().forEach((t) => t.stop());
        camStream = null;
      }
    }

    window.cleanupPreAssessmentCam = stopCam;

    function connectionBadgeHtml() {
      const online = navigator.onLine;
      return `<span class="pill ${online ? "pill-green" : "pill-red"}" style="border:1px solid currentColor;">📶 Connection: ${online ? "normal" : "terputus"}</span>`;
    }

    async function draw() {
      const pf = state.preFlow;

      // STEP 1: PERBARUI PROFIL ANDA
      if (pf.step === "profile") {
        stopCam();
        root.innerHTML = `
          <div class="card" style="max-width:620px;margin:0 auto;">
            <div class="assess-header">
              <div>
                <span class="grade-badge">TEKNIS PELAKSANAAN | PRE-ASSESSMENT (1/5)</span>
                <h2 style="font-size:21px;color:var(--primary);">Perbarui Profil Anda</h2>
                <div style="font-size:13px;color:var(--text-muted);">Silakan lengkapi kolom di bawah ini untuk memperbarui data diri sebelum memulai asesmen.</div>
              </div>
              ${connectionBadgeHtml()}
            </div>

            <div style="display:flex;flex-direction:column;gap:14px;">
              <div>
                <label style="font-size:13px;font-weight:700;display:block;margin-bottom:5px;">Nama Lengkap <span style="color:var(--rose);">*</span></label>
                <input type="text" id="pfName" class="select-input" style="width:100%;" value="${state.currentUser ? state.currentUser.full_name : ""}" />
              </div>
              <div>
                <label style="font-size:13px;font-weight:700;display:block;margin-bottom:5px;">Email</label>
                <input type="email" id="pfEmail" class="select-input" style="width:100%;" placeholder="nama@perusahaan.co.id" value="${pf.email}" />
              </div>
              <div>
                <label style="font-size:13px;font-weight:700;display:block;margin-bottom:5px;">Tanggal Lahir <span style="color:var(--rose);">*</span></label>
                <input type="date" id="pfDob" class="select-input" style="width:100%;" value="${pf.dob}" />
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;margin-top:22px;flex-wrap:wrap;gap:10px;">
              <button class="btn btn-outline-dark" id="btnPfSkip">Lewati</button>
              <button class="btn btn-accent" id="btnPfSave">Perbarui Profil →</button>
            </div>
          </div>
        `;

        document.getElementById("btnPfSkip").addEventListener("click", () => {
          pf.step = "consent";
          draw();
        });
        document.getElementById("btnPfSave").addEventListener("click", () => {
          const nm = document.getElementById("pfName").value.trim();
          const em = document.getElementById("pfEmail").value.trim();
          const dob = document.getElementById("pfDob").value;
          if (!nm || !dob) {
            alert("Mohon lengkapi Nama Lengkap dan Tanggal Lahir Anda.");
            return;
          }
          pf.email = em;
          pf.dob = dob;
          localStorage.setItem("simeta_email", em);
          localStorage.setItem("simeta_dob", dob);
          pf.step = "consent";
          draw();
        });
        return;
      }

      // STEP 2: INFORMED CONSENT
      if (pf.step === "consent") {
        stopCam();
        root.innerHTML = `
          <div class="card" style="max-width:780px;margin:0 auto;">
            <div class="assess-header">
              <div>
                <span class="grade-badge">TEKNIS PELAKSANAAN | PRE-ASSESSMENT (2/5)</span>
                <h2 style="font-size:21px;color:var(--primary);">Informed Consent — Persetujuan Peserta</h2>
              </div>
              ${connectionBadgeHtml()}
            </div>

            <div class="memo-box" style="max-height:290px;overflow-y:auto;line-height:1.65;">
              <h4>Selamat Datang di Pre-Assessment SIMETA</h4>
              <p style="margin-bottom:10px;">Sebelum memulai proses pengambilan data asesmen, Anda diharuskan membaca dan menyetujui ketentuan berikut:</p>
              <ul style="margin-left:18px;margin-bottom:10px;">
                <li><strong>Kerahasiaan Data:</strong> Seluruh data profil, rekaman, dan jawaban yang Anda berikan dijaga kerahasiaannya dan hanya digunakan untuk keperluan proses asesmen kompetensi.</li>
                <li><strong>Pertukaran Data/Informasi:</strong> Anda menyetujui penggunaan data diri serta hasil tes untuk pemetaan profil kompetensi jabatan (${data.title}).</li>
                <li><strong>Hak Atas Kekayaan Intelektual (HKI):</strong> Seluruh konten, instrumen soal, dan skenario dilindungi oleh HKI. Peserta dilarang menyebarluaskan, menyalin, atau memublikasikan materi tes tanpa izin tertulis.</li>
                <li><strong>Integritas Pengerjaan:</strong> Peserta wajib mengerjakan secara mandiri, hanya membuka tes pada <strong>satu tab browser saja</strong>, dan tidak melakukan kecurangan dalam bentuk apa pun.</li>
              </ul>
            </div>

            <label style="display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:700;cursor:pointer;margin:14px 0;">
              <input type="checkbox" id="chkConsent" ${pf.consentAccepted ? "checked" : ""} />
              Saya telah membaca dan menyetujui syarat dan ketentuan di atas
            </label>

            <div style="display:flex;justify-content:space-between;margin-top:16px;">
              <button class="btn btn-outline-dark" id="btnConsentBack">← Kembali</button>
              <button class="btn btn-accent" id="btnConsentNext" ${pf.consentAccepted ? "" : "disabled"}>Lanjutkan Aktivitas →</button>
            </div>
          </div>
        `;

        document.getElementById("chkConsent").addEventListener("change", (e) => {
          pf.consentAccepted = e.target.checked;
          document.getElementById("btnConsentNext").disabled = !pf.consentAccepted;
        });
        document.getElementById("btnConsentBack").addEventListener("click", () => {
          pf.step = "profile";
          draw();
        });
        document.getElementById("btnConsentNext").addEventListener("click", () => {
          if (!pf.consentAccepted) return;
          pf.step = "compat";
          draw();
        });
        return;
      }

      // STEP 3: PEMERIKSAAN KOMPATIBILITAS PERANGKAT
      if (pf.step === "compat") {
        root.innerHTML = `
          <div class="card" style="max-width:760px;margin:0 auto;">
            <div class="assess-header">
              <div>
                <span class="grade-badge">TEKNIS PELAKSANAAN | PRE-ASSESSMENT (3/5)</span>
                <h2 style="font-size:21px;color:var(--primary);">Persyaratan Pemeriksaan Kompatibilitas Perangkat</h2>
                <div style="font-size:13px;color:var(--text-muted);">Sistem mendeteksi kesiapan browser, izin kamera, dan pencahayaan lingkungan Anda.</div>
              </div>
              ${connectionBadgeHtml()}
            </div>

            <div class="grid-2" style="align-items:center;">
              <div style="background:#0f172a;border-radius:14px;padding:12px;text-align:center;">
                <video id="compatVideo" autoplay muted playsinline style="width:100%;max-height:220px;border-radius:10px;background:#000;object-fit:cover;"></video>
                <div id="compatCamMsg" style="font-size:12px;color:#cbd5e1;margin-top:6px;">Memeriksa kamera...</div>
              </div>
              <div>
                <h4 style="color:var(--primary);margin-bottom:10px;">Hasil Pemeriksaan Kompatibilitas</h4>
                <ul class="method-list" id="compatChecklist" style="margin-bottom:0;">
                  <li><span>Browser Kompatibel</span><span class="pill pill-green">✓ Siap</span></li>
                  <li><span>Izin Webcam</span><span class="pill pill-amber" id="stPerm">Memeriksa...</span></li>
                  <li><span>Kamera Aktif</span><span class="pill pill-amber" id="stCam">Memeriksa...</span></li>
                  <li><span>1 Wajah Terdeteksi &amp; Lingkungan Mendukung</span><span class="pill pill-amber" id="stFace">Memeriksa...</span></li>
                </ul>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;margin-top:20px;">
              <button class="btn btn-outline-dark" id="btnCompatBack">← Kembali</button>
              <button class="btn btn-accent" id="btnCompatNext">Lanjutkan →</button>
            </div>
          </div>
        `;

        try {
          if (!camStream) {
            camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          }
          const v = document.getElementById("compatVideo");
          if (v) v.srcObject = camStream;
          compatStatus.webcamPerm = true;
          compatStatus.camera = true;
          const setOk = (id, txt) => {
            const el = document.getElementById(id);
            if (el) {
              el.className = "pill pill-green";
              el.textContent = txt;
            }
          };
          setOk("stPerm", "✓ Diizinkan");
          setOk("stCam", "✓ Aktif");
          setOk("stFace", "✓ Terdeteksi");
          const msgEl = document.getElementById("compatCamMsg");
          if (msgEl) msgEl.textContent = "✓ Perangkat kamera siap digunakan.";
        } catch {
          const msgEl = document.getElementById("compatCamMsg");
          if (msgEl) msgEl.textContent = "Kamera tidak terdeteksi / izin ditolak (Anda tetap dapat melanjutkan simulasi).";
          ["stPerm", "stCam", "stFace"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
              el.className = "pill pill-amber";
              el.textContent = "Opsional (Tanpa Kamera)";
            }
          });
        }

        document.getElementById("btnCompatBack").addEventListener("click", () => {
          pf.step = "consent";
          draw();
        });
        document.getElementById("btnCompatNext").addEventListener("click", () => {
          pf.step = "biometric";
          draw();
        });
        return;
      }

      // STEP 4: DETEKSI BIOMETRIK (AMBIL DATA WAJAH)
      if (pf.step === "biometric") {
        root.innerHTML = `
          <div class="card" style="max-width:780px;margin:0 auto;">
            <div class="assess-header">
              <div>
                <span class="grade-badge">TEKNIS PELAKSANAAN | PRE-ASSESSMENT (4/5)</span>
                <h2 style="font-size:21px;color:var(--primary);">Deteksi Biometrik — Pendaftaran Wajah</h2>
                <div style="font-size:13px;color:var(--text-muted);">Pastikan hanya wajah Anda yang muncul dalam bingkai dengan pencahayaan cukup, lalu klik <strong>Ambil Gambar</strong>.</div>
              </div>
              ${connectionBadgeHtml()}
            </div>

            <div class="grid-2" style="align-items:center;">
              <div style="position:relative;background:#0f172a;border-radius:14px;padding:12px;text-align:center;">
                ${
                  pf.faceCaptured && pf.faceDataUrl
                    ? `<img src="${pf.faceDataUrl}" alt="Wajah Terdaftar" style="width:100%;max-height:230px;object-fit:cover;border-radius:10px;border:2px solid #10b981;" />`
                    : `<video id="bioVideo" autoplay muted playsinline style="width:100%;max-height:230px;border-radius:10px;background:#000;object-fit:cover;"></video>`
                }
                <canvas id="bioCanvas" style="display:none;"></canvas>
                <div style="margin-top:10px;">
                  <button class="btn btn-accent btn-sm" id="btnCaptureFace">${pf.faceCaptured ? "📷 Ambil Ulang Gambar" : "📷 Ambil Data Wajah"}</button>
                </div>
              </div>

              <div>
                <h4 style="color:var(--primary);margin-bottom:10px;">Result Deteksi Biometrik</h4>
                <ul class="method-list" style="margin-bottom:12px;">
                  <li><span>1 Wajah Terdeteksi</span><span class="pill pill-green">✓ Sesuai</span></li>
                  <li><span>Lingkungan &amp; Pencahayaan</span><span class="pill pill-green">✓ Mendukung</span></li>
                  <li><span>Status Wajah Terdaftar</span><span class="pill ${pf.faceCaptured ? "pill-green" : "pill-amber"}">${pf.faceCaptured ? "✓ Wajah Terdaftar" : "Belum Diambil"}</span></li>
                </ul>
                ${
                  pf.faceCaptured
                    ? `<div class="feedback-box" style="margin-top:0;font-size:13px;"><strong>✓ Pendaftaran Wajah Berhasil!</strong> Wajah Anda telah terdaftar untuk sesi simulasi ini.</div>`
                    : `<div class="feedback-box warn" style="margin-top:0;font-size:13px;">Klik <strong>Ambil Data Wajah</strong> untuk mendaftarkan wajah Anda sebelum melanjutkan.</div>`
                }
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;margin-top:20px;">
              <button class="btn btn-outline-dark" id="btnBioBack">← Kembali</button>
              <button class="btn btn-emerald" id="btnBioNext">${pf.faceCaptured ? "Lanjutkan ke Daftar Aktivitas →" : "Lewati & Lanjutkan →"}</button>
            </div>
          </div>
        `;

        if (!pf.faceCaptured) {
          try {
            if (!camStream) {
              camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            }
            const v = document.getElementById("bioVideo");
            if (v) v.srcObject = camStream;
          } catch {}
        }

        document.getElementById("btnCaptureFace").addEventListener("click", () => {
          if (pf.faceCaptured) {
            pf.faceCaptured = false;
            pf.faceDataUrl = null;
            draw();
            return;
          }
          const v = document.getElementById("bioVideo");
          const c = document.getElementById("bioCanvas");
          if (v && c && v.videoWidth > 0) {
            c.width = v.videoWidth;
            c.height = v.videoHeight;
            c.getContext("2d").drawImage(v, 0, 0);
            pf.faceDataUrl = c.toDataURL("image/jpeg", 0.7);
          }
          pf.faceCaptured = true;
          stopCam();
          draw();
        });

        document.getElementById("btnBioBack").addEventListener("click", () => {
          pf.step = "compat";
          draw();
        });
        document.getElementById("btnBioNext").addEventListener("click", () => {
          stopCam();
          pf.step = "lobby";
          draw();
        });
        return;
      }

      // STEP 5: DAFTAR AKTIVITAS PRE-ASSESSMENT (LOBBY ENGAGE STYLE)
      stopCam();
      const firstActDone = gradeId === "BOD-5" ? typeof state.flowResults.psychometric === "number" : state.preAssessment.personalityDone;
      const capDone = state.preAssessment.capDone;
      const bothPreDone = firstActDone && capDone;

      root.innerHTML = `
        <div class="card">
          <div class="assess-header">
            <div>
              <span class="grade-badge">TEKNIS PELAKSANAAN | DAFTAR AKTIVITAS PRE-ASSESSMENT (5/5)</span>
              <h2 style="font-size:21px;color:var(--primary);">Daftar Aktivitas — ${data.title}</h2>
              <div style="font-size:13px;color:var(--text-muted);">Klik tombol <strong>Belum Dikerjakan</strong> untuk memulai setiap subtest. Disarankan menyelesaikan seluruh rangkaian dalam satu waktu pada 1 tab browser.</div>
            </div>
            ${connectionBadgeHtml()}
          </div>

          <div class="feedback-box info" style="margin-top:0;margin-bottom:16px;font-size:13px;">
            ${
              bothPreDone
                ? "<strong>✓ Seluruh aktivitas Pre-Assessment telah berstatus Selesai!</strong> Anda sekarang dapat melanjutkan ke <strong>Main Assessment</strong>."
                : "Selesaikan kedua aktivitas Pre-Assessment di bawah ini terlebih dahulu. Hasil pengisian Anda akan memetakan kasus yang dihadapi pada Main Assessment."
            }
          </div>

          <div style="overflow-x:auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Aktivitas</th>
                  <th>Jumlah Pertanyaan</th>
                  <th>Memulai Aktivitas</th>
                  <th>Menyelesaikan Aktivitas</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>${gradeId === "BOD-5" ? "Psychometric Test (Kognitif, Kepribadian, Motivasi)" : "Disposition-Five (DIVE) Inventory V.2 (Personality OCEAN)"}</strong></td>
                  <td>${gradeId === "BOD-5" ? (state.examMode === "full" ? "10" : "6") : "15 (3 Halaman × 5)"}</td>
                  <td>${pf.diveStart}</td>
                  <td>${pf.diveEnd}</td>
                  <td>
                    ${
                      firstActDone
                        ? `<span class="pill pill-green">Selesai ✓</span>`
                        : `<button class="btn btn-outline-dark btn-sm" id="btnStartAct1">Belum Dikerjakan</button>`
                    }
                  </td>
                </tr>
                <tr>
                  <td><strong>Career Achievement Portofolio (CAP)</strong></td>
                  <td>${state.examMode === "full" ? "4" : "2"}</td>
                  <td>${pf.capStart}</td>
                  <td>${pf.capEnd}</td>
                  <td>
                    ${
                      capDone
                        ? `<span class="pill pill-green">Selesai ✓</span>`
                        : `<button class="btn btn-outline-dark btn-sm" id="btnStartAct2">Belum Dikerjakan</button>`
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;flex-wrap:wrap;gap:10px;">
            <button class="btn btn-outline-dark" id="btnLobbyHome">← Kembali ke Beranda</button>
            <button class="btn ${bothPreDone ? "btn-emerald" : "btn-primary"}" id="btnGoMainAssess" ${bothPreDone ? "" : "disabled"}>
              ${gradeId === "BOD-5" ? "Lanjut ke Main Assessment: Case Study + Async Presentation →" : "Lanjut ke Main Assessment: Simulasi PortrAI →"}
            </button>
          </div>
        </div>
      `;

      const b1 = document.getElementById("btnStartAct1");
      if (b1) {
        b1.addEventListener("click", () => {
          pf.diveStart = new Date().toLocaleString("id-ID");
          onLaunchPersonality();
        });
      }
      const b2 = document.getElementById("btnStartAct2");
      if (b2) {
        b2.addEventListener("click", () => {
          pf.capStart = new Date().toLocaleString("id-ID");
          onLaunchCap();
        });
      }
      document.getElementById("btnLobbyHome").addEventListener("click", onBackHome);
      document.getElementById("btnGoMainAssess").addEventListener("click", () => {
        if (!bothPreDone) return;
        onLaunchMainAssessment();
      });
    }

    draw();
  };
})();
