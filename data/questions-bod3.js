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
        body: `<p>Rekan Kadiv/Kawil, dalam 3 kuartal terakhir <em>Gross Loss Ratio</em> KUR naik dari 68% menjadi 89% sementara subrogasi baru 18%. Di sisi lain, premi Non-KUR ditargetkan tumbuh +35% YoY untuk menjaga RBC &gt; 180%. Pagi ini EVP Bank Mitra Utama meminta SLA klaim KUR dipercepat dari 14 hari menjadi 5 hari kerja dengan pelonggaran verifikasi. Mohon balasan keputusan Anda.</p>`
      },
      chat: {
        partnerName: "EVP Bank Mitra Utama (AI Roleplay)",
        opening: "Selamat pagi Pak/Bu. Jika SLA 5 hari tanpa syarat tidak disetujui minggu ini, kami mempertimbangkan mengalihkan 30% kuota penjaminan KUR ke kompetitor.",
        followUp: "Baik, saya paham soal tata kelola. Tapi kalau tetap ada verifikasi dokumen, bagaimana kami yakin klaim kami tidak tertahan lama?"
      },
      call: {
        partnerName: "Kepala Bagian Underwriting & Klaim Wilayah (Virtual Call)",
        prompt: "Bawahan Anda melaporkan tim analis kewalahan menangani backlog klaim KUR dan sekaligus diminta mempercepat Suretyship Rp 50 Miliar. Sampaikan arahan eksekutif Anda."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Strategi Portofolio KUR & Non-KUR",
        brief: "Data: Premi KUR Rp 400 M (Klaim Rp 340 M, Subrogasi Rp 28 M, Biaya Rp 72 M) | Suretyship Rp 150 M (LR 38%) | Asuransi Umum Rp 100 M (LR 55%). Susun analisa bisnis & rencana aksi 90 hari."
      },
      aiHints: [
        { q: "Hitung Net Combined Ratio KUR", a: "Klaim Neto = 340 - 28 = Rp 312 M. Net LR = 78%. Expense = 18%. Net Combined Ratio = 96%." },
        { q: "Ide solusi SLA Bank Mitra", a: "Terapkan Tiered SLA (5 hari khusus klaim digital host-to-host tervalidasi, 14 hari untuk berkas anomali dengan joint-audit)." }
      ],
      keywords: ["sla", "tiered", "host-to-host", "subrogasi", "rbc", "non-kur", "suretyship", "reasuransi", "audit", "prudential", "delegasi", "komite"],
      rubric: ["Email: Ketegasan tata kelola & solusi berbasis sistem", "Chat & Call: Negosiasi strategis & kepemimpinan eksekutif", "Documents: Ketajaman angka portofolio", "Integrasi Risiko vs Bisnis (RBC & retensi mitra)"],
      benchmark: "Menolak pelonggaran tanpa syarat, menawarkan Tiered SLA berbasis host-to-host, mendelegasikan triase ke BOD-4, serta menggenjot Suretyship beragunan solid & proteksi treaty untuk menjaga RBC > 180%."
    },
    {
      id: "bod3-p2",
      unit: "Manajemen Risiko",
      title: "Krisis Konsentrasi Risiko Suretyship Proyek Infrastruktur",
      durationSec: 1800,
      email: {
        from: "Komite Pemantau Risiko <risk@asuransi-kredit.co.id>",
        subject: "EWS Alert: 42% Eksposur Suretyship Terkonsentrasi di 3 Grup Kontraktor",
        body: `<p>Tiga grup kontraktor besar mengalami penundaan termin proyek pemerintah dengan potensi klaim <em>Performance Bond</em> &amp; <em>Advance Payment Bond</em> mencapai Rp 120 Miliar. Salah satu pemimpin proyek meminta perpanjangan jaminan tanpa tambahan counter-guarantee.</p>`
      },
      chat: {
        partnerName: "Direktur Utama Kontraktor Grup A (AI Roleplay)",
        opening: "Pak/Bu, termin proyek kami tertunda 3 bulan dari pemilik proyek. Kami butuh addendum perpanjangan jaminan tanpa tambah agunan karena aset kami sedang dijaminkan ke bank.",
        followUp: "Jika perusahaan Bapak menolak perpanjangan, proyek bisa diputus kontrak oleh obligee dan justru memicu pencairan klaim Rp 45 Miliar besok."
      },
      call: {
        partnerName: "Kepala Divisi Reasuransi & Aktuaria (Virtual Call)",
        prompt: "Diskusikan strategi proteksi neraca, aktivasi koordinasi reasuransi, dan syarat escrow account termin proyek dalam panggilan virtual ini."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Stress-Test Eksposur Single Obligor",
        brief: "Rumuskan langkah mitigasi jangka pendek (escrow termin, reasuransi) dan revisi kebijakan limit single-obligor agar konsentrasi tidak terulang."
      },
      aiHints: [
        { q: "Syarat addendum tanpa agunan tambahan", a: "Wajibkan penguncian rekening penampung (escrow account) termin proyek, surat pernyataan kesanggupan obligee, dan persetujuan reasuransi." }
      ],
      keywords: ["konsentrasi", "eksposur", "escrow", "reasuransi", "obligee", "single obligor", "limit", "stress-test", "addendum", "counter-guarantee"],
      rubric: ["Manajemen Risiko Konsentrasi", "Perlindungan Neraca & Reasuransi", "Negosiasi dengan Principal & Obligee", "Perbaikan Kebijakan Limit"],
      benchmark: "Melakukan stress-test eksposur, mengunci escrow account termin proyek sebagai syarat mutlak addendum, berkoordinasi dengan reasuransi, dan merevisi batas maksimum single-obligor."
    },
    {
      id: "bod3-p3",
      unit: "Bisnis & Pemasaran",
      title: "Transformasi Digital Underwriting & Mitigasi Fraud KUR Wilayah",
      durationSec: 1800,
      email: {
        from: "Kepala Audit Internal <audit@asuransi-kredit.co.id>",
        subject: "Indikasi Pola Fraud Klaim KUR Terstruktur di 2 Cabang Wilayah",
        body: `<p>Ditemukan pola pengajuan klaim KUR dari 45 debitur fiktif yang menggunakan alamat usaha sama. Di sisi lain, Direksi meminta target akuisisi premi Non-KUR tetap tercapai melalui kanal digital.</p>`
      },
      chat: {
        partnerName: "Pimpinan Wilayah Bank Penyalur (AI Roleplay)",
        opening: "Kami kaget ada temuan audit tersebut. Mohon jangan hentikan seluruh kuota penjaminan KUR di wilayah kami karena itu akan menghambat penyaluran UMKM.",
        followUp: "Kami setuju investigasi, tapi bagaimana mekanisme kontrol bersama ke depan agar tidak menghambat debitur yang benar-benar layak?"
      },
      call: {
        partnerName: "Kepala Divisi IT & Operasional (Virtual Call)",
        prompt: "Sampaikan arahan strategis terkait penerapan auto-red-flag (deteksi duplikasi alamat/NIK) dan integrasi API scoring."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Roadmap Anti-Fraud & Digital Underwriting",
        brief: "Susun kerangka tata kelola anti-fraud (preventif, detektif, represif) serta strategi pertumbuhan premi Non-KUR berbasis kanal digital."
      },
      aiHints: [
        { q: "Langkah cepat isolasi fraud", a: "Freeze sementara pencairan klaim pada klaster terindikasi untuk investigasi gabungan, tanpa menghentikan penyaluran KUR yang lolos validasi NIK/duplikasi." }
      ],
      keywords: ["fraud", "investigasi", "freeze", "duplikasi", "api", "scoring", "red-flag", "audit", "digital", "umkm", "non-kur"],
      rubric: ["Ketegasan Anti-Fraud & Integritas", "Komunikasi Kemitraan Berimbang", "Visi Digitalisasi & Kontrol Sistem", "Keberlanjutan Bisnis"],
      benchmark: "Mengisolasi klaster terindikasi fraud untuk audit investigatif & pelaporan hukum tanpa mematikan penyaluran sehat, serta membangun kontrol sistem auto-red-flag duplikasi data berbasis API."
    }
  ],
  cap: [
    {
      id: "bod3-cap1",
      competency: "Strategic Decision Making & Risk Governance",
      prompt: "Ceritakan pencapaian paling signifikan Anda dalam menyeimbangkan target pertumbuhan bisnis (KUR/Non-KUR) dengan pengendalian risiko/klaim di level strategis.",
      indicators: ["Mengidentifikasi risiko sistemik/portofolio", "Keputusan berbasis data & regulasi", "Kesepakatan lintas pemangku kepentingan", "Dampak terukur pada Loss Ratio / RBC / Laba"]
    },
    {
      id: "bod3-cap2",
      competency: "Driving Transformation & Stakeholder Alignment",
      prompt: "Ceritakan pengalaman Anda memimpin perubahan kebijakan atau proses kerja yang awalnya ditolak oleh mitra eksternal (Bank/Obligee) atau tim internal.",
      indicators: ["Analisis akar penolakan", "Strategi persuasi & negosiasi eksekutif", "Eksekusi bertahap & monitoring", "Hasil nyata keberlanjutan kerja sama"]
    },
    {
      id: "bod3-cap3",
      competency: "Crisis Management & Anti-Fraud Governance",
      prompt: "Ceritakan situasi krisis (misalnya lonjakan klaim tak terduga, potensi fraud besar, atau temuan audit kritis) yang pernah Anda tangani hingga tuntas.",
      indicators: ["Kecepatan isolasi masalah", "Koordinasi lintas divisi/eksternal", "Tindakan korektif & perbaikan sistem", "Pemulihan finansial/reputasi yang terukur"]
    },
    {
      id: "bod3-cap4",
      competency: "Building Strategic Partnerships",
      prompt: "Ceritakan bagaimana Anda membangun atau menyelamatkan kemitraan strategis (Perbankan, Reasuransi, atau Korporasi) yang berdampak besar pada kinerja perusahaan.",
      indicators: ["Pemahaman kebutuhan strategis mitra", "Solusi win-win tanpa melanggar tata kelola", "Eksekusi komitmen bersama", "Pertumbuhan premi/recovery terukur"]
    }
  ],
  personality: [
    { id: "o3-1", dim: "Openness", text: "Saya aktif mendorong adopsi teknologi (seperti AI scoring dan integrasi host-to-host) untuk memperbarui proses bisnis lama.", reverse: false },
    { id: "o3-2", dim: "Openness", text: "Saya lebih nyaman mempertahankan pola kerja konvensional yang sudah terbukti daripada mencoba pendekatan baru.", reverse: true },
    { id: "o3-3", dim: "Openness", text: "Saya sering mengeksplorasi model produk penjaminan baru dari pasar global untuk diterapkan di perusahaan.", reverse: false },
    { id: "c3-1", dim: "Conscientiousness", text: "Setiap keputusan strategis yang saya ambil selalu didasarkan pada verifikasi data, kepatuhan regulasi, dan mitigasi risiko terukur.", reverse: false },
    { id: "c3-2", dim: "Conscientiousness", text: "Dalam situasi mendesak, saya kadang mengabaikan detail dokumentasi demi mempercepat proses.", reverse: true },
    { id: "c3-3", dim: "Conscientiousness", text: "Saya menetapkan indikator peringatan dini (EWS) yang ketat agar penyimpangan portofolio terdeteksi sejak awal.", reverse: false },
    { id: "e3-1", dim: "Extraversion", text: "Saya berenergi saat memimpin negosiasi tingkat tinggi dengan Direksi, OJK, maupun pimpinan Bank Mitra.", reverse: false },
    { id: "e3-2", dim: "Extraversion", text: "Saya cenderung menghindari diskusi kelompok besar dan lebih suka bekerja sendiri di balik layar.", reverse: true },
    { id: "e3-3", dim: "Extraversion", text: "Saya proaktif membangun jejaring strategis lintas lembaga untuk membuka peluang bisnis Non-KUR.", reverse: false },
    { id: "a3-1", dim: "Agreeableness", text: "Saya mampu menjaga hubungan kemitraan tetap harmonis meskipun harus menyampaikan penolakan klaim atau pembatasan limit.", reverse: false },
    { id: "a3-2", dim: "Agreeableness", text: "Jika rekan lintas divisi berbeda pendapat dengan saya, saya cenderung memaksakan otoritas saya.", reverse: true },
    { id: "a3-3", dim: "Agreeableness", text: "Saya terbuka menerima masukan dari analis junior maupun divisi lain sebelum mengetok keputusan besar.", reverse: false },
    { id: "n3-1", dim: "Neuroticism", text: "Saat terjadi lonjakan klaim besar dan tekanan target bersamaan, saya mudah merasa cemas dan kehilangan fokus.", reverse: true },
    { id: "n3-2", dim: "Neuroticism", text: "Saya tetap tenang, objektif, dan stabil secara emosional dalam menghadapi krisis bisnis atau temuan audit.", reverse: false },
    { id: "n3-3", dim: "Neuroticism", text: "Kritik tajam dari atasan atau mitra sering membuat suasana hati saya terganggu sepanjang hari.", reverse: true }
  ]
};
