window.DATA_BOD3 = {
  gradeId: "BOD-3",
  title: "BOD – 3 (Job Grade 15–16)",
  headcount: 145,
  roleLabel: "Kepala Divisi / Kepala Wilayah / Senior Vice President",
  methods: [
    { id: "potrai", name: "PotrAI Simulation (180–240 menit)", desc: "Simulasi 5 modul terintegrasi: Email, Chat Roleplay AI, Call/Virtual Meeting, Documents (Analisa Bisnis), & AI Assistant." },
    { id: "cap", name: "CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan terstruktur berbasis pengalaman kerja (Pencapaian, Tantangan, Tindakan, Hasil) & bukti perilaku." },
    { id: "personality", name: "Personality Test — OCEAN (30–40 menit)", desc: "Inventori 5 dimensi OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)." }
  ],
  potrai: [
    {
      id: "bod3-p1",
      unit: "Underwriting & Klaim",
      title: "Penyeimbangan Loss Ratio KUR & Ekspansi Suretyship / Non-KUR",
      durationSec: 1800,
      email: {
        from: "Direktur Manajemen Risiko & Bisnis <direksi@asuransi-kredit.co.id>",
        subject: "URGENT: Kenaikan Loss Ratio KUR (89%) & Permintaan Relaksasi SLA Bank Mitra",
        body: `
          <p>Rekan Kadiv/Kawil,</p>
          <p>Dalam 3 kuartal terakhir, <em>Gross Loss Ratio</em> portofolio <strong>KUR</strong> meningkat dari 68% menjadi 89% sementara <em>recovery</em> subrogasi baru 18%. Di sisi lain, kita ditargetkan menumbuhkan premi <strong>Non-KUR (Suretyship &amp; Asuransi Umum)</strong> +35% YoY untuk menjaga RBC &gt; 180%.</p>
          <p>Pagi ini, EVP Bank Mitra Utama meminta SLA pembayaran klaim KUR dipercepat dari 14 hari menjadi 5 hari kerja dengan pelonggaran verifikasi dokumen. Mohon kirimkan keputusan dan arahan resmi Anda melalui balasan email ini.</p>
        `
      },
      chat: {
        partnerName: "EVP Bank Mitra Utama (AI Roleplay)",
        opening: "Selamat pagi Pak/Bu. Terkait surat kami, jika SLA 5 hari tanpa syarat tidak disetujui minggu ini, kami mempertimbangkan mengalihkan 30% kuota penjaminan KUR ke kompetitor. Bagaimana posisi perusahaan Anda?",
        followUp: "Baik, saya paham soal tata kelola. Tapi kalau tetap ada verifikasi dokumen, bagaimana kami yakin klaim kami tidak tertahan lama?"
      },
      call: {
        partnerName: "Kepala Bagian Underwriting & Klaim Wilayah (Virtual Call)",
        prompt: "Dalam panggilan virtual ini, bawahan Anda melaporkan tim analis kewalahan menangani backlog verifikasi klaim KUR dan sekaligus diminta mempercepat persetujuan Suretyship proyek Rp 50 Miliar. Sampaikan arahan lisan/keputusan eksekutif Anda (prioritas, delegasi, dan kontrol risiko)."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Strategi Portofolio KUR & Non-KUR",
        brief: "Data Portofolio: Premi KUR Rp 400 M (Klaim Rp 340 M, Subrogasi Rp 28 M, Biaya Rp 72 M) | Suretyship Rp 150 M (Loss Ratio 38%) | Asuransi Umum Rp 100 M (Loss Ratio 55%). Susun ringkasan analisa bisnis & rencana aksi 90 hari."
      },
      aiHints: [
        { q: "Hitung Net Combined Ratio KUR saat ini", a: "Klaim Neto = 340 - 28 = Rp 312 M. Net Loss Ratio = 312/400 = 78%. Expense Ratio = 72/400 = 18%. Net Combined Ratio = 96%." },
        { q: "Ide solusi negosiasi SLA dengan Bank Mitra", a: "Gunakan Tiered SLA (Fast-Track 5 hari khusus klaim dengan dokumen digital tervalidasi host-to-host & skor kepatuhan mitra >95%, sedangkan berkas anomali tetap 14 hari dengan audit bersama)." }
      ],
      keywords: ["sla", "tiered", "host-to-host", "subrogasi", "rbc", "non-kur", "suretyship", "reasuransi", "audit", "prudential", "delegasi", "komite"],
      rubric: [
        "Email (Operational Challenge): Ketegasan tata kelola & solusi berbasis sistem",
        "Chat & Call (Roleplay AI): Negosiasi strategis & kepemimpinan eksekutif",
        "Documents (Analisa Bisnis): Ketajaman angka portofolio & rencana aksi",
        "Integrasi Risiko vs Bisnis: Menjaga RBC & retensi mitra"
      ],
      benchmark: "Menolak pelonggaran verifikasi tanpa syarat, menawarkan Tiered SLA berbasis integrasi host-to-host, mendelegasikan triase backlog ke BOD-4 dengan koridor limit, serta menggenjot Suretyship beragunan solid & proteksi treaty untuk menjaga RBC > 180%."
    }
  ],
  cap: [
    {
      id: "bod3-cap1",
      competency: "Strategic Decision Making & Risk Governance",
      prompt: "Ceritakan pencapaian paling signifikan Anda dalam menyeimbangkan target pertumbuhan bisnis (KUR/Non-KUR) dengan pengendalian risiko/klaim di level strategis.",
      indicators: ["Mengidentifikasi risiko sistemik/portofolio", "Mengambil keputusan berbasis data & regulasi", "Membangun kesepakatan lintas pemangku kepentingan", "Dampak terukur pada Loss Ratio / RBC / Laba"]
    },
    {
      id: "bod3-cap2",
      competency: "Driving Transformation & Stakeholder Alignment",
      prompt: "Ceritakan pengalaman Anda memimpin perubahan kebijakan atau proses kerja yang awalnya ditolak oleh mitra eksternal (Bank/Obligee) atau tim internal.",
      indicators: ["Analisis akar penolakan", "Strategi persuasi & negosiasi level eksekutif", "Eksekusi bertahap & monitoring", "Hasil nyata keberlanjutan kerja sama"]
    }
  ],
  personality: [
    { id: "o3-1", dim: "Openness", text: "Saya aktif mendorong adopsi teknologi (seperti AI scoring dan integrasi host-to-host) untuk memperbarui proses bisnis lama.", reverse: false },
    { id: "o3-2", dim: "Openness", text: "Saya lebih nyaman mempertahankan pola kerja konvensional yang sudah terbukti daripada mencoba pendekatan baru.", reverse: true },
    { id: "c3-1", dim: "Conscientiousness", text: "Setiap keputusan strategis yang saya ambil selalu didasarkan pada verifikasi data, kepatuhan regulasi, dan mitigasi risiko terukur.", reverse: false },
    { id: "c3-2", dim: "Conscientiousness", text: "Dalam situasi mendesak, saya kadang mengabaikan detail dokumentasi demi mempercepat proses.", reverse: true },
    { id: "e3-1", dim: "Extraversion", text: "Saya berenergi saat memimpin negosiasi tingkat tinggi dengan Direksi, OJK, maupun pimpinan Bank Mitra.", reverse: false },
    { id: "e3-2", dim: "Extraversion", text: "Saya cenderung menghindari diskusi kelompok besar dan lebih suka bekerja sendiri di balik layar.", reverse: true },
    { id: "a3-1", dim: "Agreeableness", text: "Saya mampu menjaga hubungan kemitraan tetap harmonis meskipun harus menyampaikan penolakan klaim atau pembatasan limit.", reverse: false },
    { id: "a3-2", dim: "Agreeableness", text: "Jika rekan lintas divisi berbeda pendapat dengan saya, saya cenderung memaksakan otoritas saya.", reverse: true },
    { id: "n3-1", dim: "Neuroticism", text: "Saat terjadi lonjakan klaim besar dan tekanan target bersamaan, saya mudah merasa cemas dan kehilangan fokus.", reverse: true },
    { id: "n3-2", dim: "Neuroticism", text: "Saya tetap tenang, objektif, dan stabil secara emosional dalam menghadapi krisis bisnis atau temuan audit.", reverse: false }
  ]
};
