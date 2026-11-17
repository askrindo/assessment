window.DATA_BOD3 = {
  gradeId: "BOD-3",
  title: "BOD – 3 (Job Grade 15–16)",
  headcount: 145,
  roleLabel: "Kepala Divisi / Kepala Wilayah / Senior Vice President",
  methods: [
    { id: "potrai", name: "PotrAI Simulation", desc: "Simulasi kepemimpinan strategis, tata kelola risiko, dan negosiasi tingkat eksekutif." },
    { id: "cap", name: "CAP (Cognitive & Analytical)", desc: "Analisis portofolio makro KUR/Non-KUR, solvabilitas (RBC), dan logika strategis." },
    { id: "personality", name: "Personality Test", desc: "Pemetaan profil kepemimpinan eksekutif, ketahanan keputusan, dan tata kelola." }
  ],
  potrai: [
    {
      id: "bod3-p1",
      unit: "Underwriting & Klaim",
      title: "Strategi Penyeimbangan Loss Ratio KUR & Ekspansi Non-KUR",
      durationSec: 600,
      memo: `
        <h4>Memo Direksi & Komite Risiko</h4>
        <p>Sepanjang 3 kuartal terakhir, portofolio <strong>KUR</strong> mencatat kenaikan <em>Gross Loss Ratio</em> dari 68% menjadi 89% akibat perlambatan sektor perdagangan mikro di beberapa wilayah, sementara pencairan subrogasi baru mencapai 18% dari target.</p>
        <p>Di sisi lain, Direksi menargetkan pertumbuhan premi <strong>Non-KUR (Suretyship & Asuransi Umum)</strong> sebesar +35% YoY untuk menjaga margin dan <em>Risk-Based Capital (RBC)</em> di atas 180%. Namun, dua bank BUMN mitra utama meminta pelonggaran syarat verifikasi klaim KUR agar SLA pembayaran turun dari 14 hari menjadi 5 hari kerja.</p>
      `,
      question: "Sebagai Kepala Divisi / Wilayah (BOD-3), rumuskan keputusan strategis Anda dalam 3 aspek: (1) Kebijakan SLA & verifikasi klaim KUR terhadap bank mitra, (2) Strategi akselerasi subrogasi & seleksi risiko Non-KUR, dan (3) Pola komunikasi ke Direksi & Bank Mitra.",
      followUpPrompt: "AI Probe (Simulasi Lanjutan): Salah satu bank mitra mengancam akan mengalihkan 30% kuota penjaminan KUR ke kompetitor jika SLA 5 hari tidak disetujui tanpa syarat. Bagaimana respons negosiasi Anda?",
      keywords: ["sla", "subrogasi", "risk-based", "sampling", "audit", "non-kur", "suretyship", "collateral", "rbc", "reinsurance", "treaty", "komite", "win-win", "digital"],
      rubric: [
        "Risk Governance & Kepatuhan (menjaga prudential principle & RBC)",
        "Business Acumen (menyeimbangkan retensi mitra vs profitabilitas)",
        "Strategic Problem Solving (solusi berbasis data/sistem, mis. auto-verify bertingkat)",
        "Executive Communication (negosiasi konstruktif dengan Bank Mitra & Direksi)"
      ],
      benchmark: "Menolak pelonggaran membabi buta, namun menawarkan skema SLA berjenjang (Tiered SLA / Fast-Track berbasis skor historis & kelengkapan dokumen digital/host-to-host). Untuk Non-KUR, menerapkan selective underwriting pada Suretyship beragunan solid & proteksi reasuransi/treaty, serta membentuk taskforce subrogasi berbasis klaster kolektibilitas."
    },
    {
      id: "bod3-p2",
      unit: "Manajemen Risiko & Bisnis",
      title: "Krisis Konsentrasi Risiko Suretyship Proyek Infrastruktur",
      durationSec: 600,
      memo: `
        <h4>Laporan Early Warning System (EWS)</h4>
        <p>Tiga grup kontraktor besar yang memegang 42% total eksposur <em>Performance Bond</em> dan <em>Advance Payment Bond</em> di wilayah Anda mengalami penurunan arus kas tajam akibat penundaan termin proyek pemerintah. Potensi klaim potensial mencapai Rp 120 Miliar.</p>
      `,
      question: "Apa langkah strategis jangka pendek dan menengah yang Anda ambil untuk melindungi neraca perusahaan sekaligus menjaga reputasi di hadapan obligee (pemilik proyek)?",
      followUpPrompt: "AI Probe: Salah satu pemimpin proyek meminta perpanjangan masa berlaku jaminan (addendum) tanpa tambahan counter-guarantee. Apa syarat mutlak yang Anda ajukan?",
      keywords: ["konsentrasi", "eksposur", "reasuransi", "restrukturisasi", "counter", "agunan", "obligee", "termin", "escrow", "limit", "mitigasi"],
      rubric: [
        "Manajemen Risiko Konsentrasi & Eksposur",
        "Perlindungan Neraca & Koordinasi Reasuransi",
        "Negosiasi dengan Obligee & Principal",
        "Perbaikan Kebijakan Limit & Single Obligor"
      ],
      benchmark: "Segera lakukan stress-test eksposur per obligor, aktifkan koordinasi dengan reasuransi, kunci skema escrow account untuk termin proyek yang cair sebagai sumber pembayaran premi/subrogasi, dan evaluasi ulang limit single-obligor serta persyaratan counter-guarantee likuid."
    }
  ],
  cap: [
    {
      id: "bod3-c1",
      category: "Numerik & Portofolio",
      question: "Portofolio KUR memiliki Premi Bruto Rp 400 Miliar dengan Klaim Bruto Rp 340 Miliar dan Biaya Akuisisi & Operasional Rp 72 Miliar. Jika Subrogasi yang berhasil ditagih sebesar Rp 28 Miliar, berapakah Net Combined Ratio portofolio tersebut?",
      options: [
        "96,0%",
        "103,0%",
        "110,0%",
        "92,5%"
      ],
      answer: 0,
      explanation: "Klaim Neto = Klaim Bruto - Subrogasi = 340 - 28 = Rp 312 Miliar. Net Loss Ratio = 312 / 400 = 78,0%. Expense Ratio = 72 / 400 = 18,0%. Net Combined Ratio = 78,0% + 18,0% = 96,0%."
    },
    {
      id: "bod3-c2",
      category: "Strategi Reasuransi & RBC",
      question: "Perusahaan menanggung risiko Suretyship senilai Rp 50 Miliar dengan skema Quota Share 40% Retensi Sendiri dan 60% Reasuransi. Jika terjadi klaim penuh Rp 50 Miliar dan biaya survei klaim Rp 500 Juta ditanggung proporsional sesuai share, berapa beban neto perusahaan (sebelum agunan balik)?",
      options: [
        "Rp 20,2 Miliar",
        "Rp 20,5 Miliar",
        "Rp 30,3 Miliar",
        "Rp 20,0 Miliar"
      ],
      answer: 0,
      explanation: "Share perusahaan = 40%. Beban klaim = 40% x Rp 50 M = Rp 20 M. Beban biaya survei = 40% x Rp 500 Juta = Rp 200 Juta. Total beban neto = Rp 20,2 Miliar."
    },
    {
      id: "bod3-c3",
      category: "Logika Strategis",
      question: "Jika seluruh polis Suretyship di atas Rp 10 Miliar wajib disetujui Komite Underwriting Pusat, dan beberapa polis Proyek Strategis Nasional (PSN) bernilai di atas Rp 10 Miliar diterbitkan oleh Cabang Utama, manakah kesimpulan yang PASTI benar?",
      options: [
        "Seluruh polis PSN yang diterbitkan Cabang Utama telah mendapat persetujuan Komite Underwriting Pusat.",
        "Sebagian polis yang disetujui Komite Underwriting Pusat adalah polis PSN bernilai di atas Rp 10 Miliar.",
        "Cabang Utama tidak boleh menerbitkan polis Suretyship di bawah Rp 10 Miliar.",
        "Tidak ada polis Non-PSN yang memerlukan persetujuan Komite Underwriting Pusat."
      ],
      answer: 1,
      explanation: "Karena 'beberapa polis PSN bernilai di atas Rp 10 Miliar' dan 'seluruh polis di atas Rp 10 Miliar wajib disetujui Komite Underwriting Pusat', maka pasti ada sebagian polis yang disetujui Komite Pusat yang merupakan polis PSN > Rp 10 Miliar."
    },
    {
      id: "bod3-c4",
      category: "Interpretasi Data",
      question: "Segmen A (KUR): Premi Rp 500 M, Loss Ratio 82%. Segmen B (Suretyship): Premi Rp 150 M, Loss Ratio 38%. Segmen C (Asuransi Umum): Premi Rp 100 M, Loss Ratio 55%. Berapakah rata-rata tertimbang Loss Ratio perusahaan secara keseluruhan?",
      options: [
        "69,6%",
        "58,3%",
        "72,4%",
        "65,0%"
      ],
      answer: 0,
      explanation: "Total Premi = 500 + 150 + 100 = Rp 750 M. Total Klaim = (500 x 82%) + (150 x 38%) + (100 x 55%) = 410 + 57 + 55 = Rp 522 M. Weighted Loss Ratio = 522 / 750 = 69,6%."
    }
  ],
  personality: [
    { id: "p3-1", dim: "Risk Governance", text: "Saya lebih memilih kehilangan target premi jangka pendek daripada meloloskan penjaminan yang melanggar batas toleransi risiko perusahaan.", reverse: false },
    { id: "p3-2", dim: "Strategic Vision", text: "Dalam rapat eksekutif, saya rutin memetakan dampak tren makroekonomi terhadap kualitas portofolio KUR 12 bulan ke depan.", reverse: false },
    { id: "p3-3", dim: "Stakeholder Influence", text: "Saya merasa kesulitan mempertahankan posisi perusahaan ketika berhadapan dengan mitra perbankan besar yang menuntut pengecualian prosedur.", reverse: true },
    { id: "p3-4", dim: "People Leadership", text: "Saya mendelegasikan keputusan teknis harian kepada BOD-4 sambil menetapkan koridor kontrol dan indikator peringatan dini.", reverse: false },
    { id: "p3-5", dim: "Resilience", text: "Tekanan target RBC dan lonjakan klaim secara bersamaan justru membuat saya semakin fokus menyusun prioritas taktis.", reverse: false },
    { id: "p3-6", dim: "Integrity", text: "Jika terdapat indikasi kecurangan (fraud) pada dokumen klaim mitra strategis, saya tetap memproses eskalasi audit sesuai tata kelola tanpa kompromi.", reverse: false },
    { id: "p3-7", dim: "Strategic Vision", text: "Saya lebih nyaman menggunakan metode underwriting konvensional daripada mengadopsi skoring otomatis berbasis data.", reverse: true },
    { id: "p3-8", dim: "People Leadership", text: "Saya secara aktif melatih manajer di bawah saya untuk membaca laporan aktuaria dan analisis subrogasi.", reverse: false }
  ]
};
