window.DATA_BOD3 = {
  gradeId: "BOD-3",
  title: "BOD – 3 (Job Grade 15–16)",
  headcount: 145,
  roleLabel: "Kepala Divisi / Kepala Wilayah / Senior Vice President",
  successProfile: [
    "Digital Savvy",
    "Business Acumen",
    "Customer Orientation",
    "Building Partnerships",
    "Decision Making",
    "Planning & Organizing",
    "Innovation",
    "Coaching and Developing Others",
    "Facilitating Change",
    "Creating an Inclusive Environment",
    "Driving for Results",
    "Inspiring Others"
  ],
  methods: [
    { id: "personality", name: "Pre-Assessment 1: Personality Test — OCEAN (30–40 menit)", desc: "Drag & drop 5 pernyataan per halaman ke kotak Paling Menggambarkan (1), Netral (3), & Paling Sedikit (1)." },
    { id: "cap", name: "Pre-Assessment 2: CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan pengalaman kerja spesifik (situasi, peran, tindakan, hasil) untuk memetakan kasus simulasi." },
    { id: "potrai", name: "Main Assessment: Simulasi PortrAI (180–240 menit)", desc: "Virtual Office 5 modul (Email, Chat AI, Call, Docs, AI Assistant) adaptif sesuai hasil Pre-Assessment." }
  ],
  potrai: [
    {
      id: "bod3-uw1",
      units: ["Underwriting", "Technical Head"],
      unit: "Underwriting / Technical Head",
      title: "Pengetatan Seleksi Risiko Suretyship & Kapasitas Treaty Reasuransi",
      durationSec: 1800,
      email: {
        from: "Direktur Teknik <dirtek@asuransi-kredit.co.id>",
        subject: "Evaluasi Kapasitas Treaty Suretyship & Proyek Infrastruktur Risiko Tinggi",
        body: `<p>Rekan Kadiv/Technical Head, rasio klaim Suretyship proyek konstruksi swasta naik ke 58% karena beberapa kontraktor mengalami gagal bayar termin. Di sisi lain, ada pengajuan <em>Performance Bond</em> Rp 85 Miliar yang melebihi kapasitas treaty otomatis. Mohon keputusan underwriting &amp; strategi penempatan reasuransi fakultatifnya.</p>`
      },
      chat: {
        partnerName: "Broker / Pimpinan Reasuransi (AI Roleplay)",
        opening: "Selamat pagi. Untuk risiko Rp 85 Miliar ini, kami hanya bersedia masuk 40% jika ada counter-guarantee aset likuid minimal 50%.",
        followUp: "Jika aset masih berupa sertifikat tanah non-likuid, apa mitigasi tambahan yang Anda tawarkan agar kami tetap mau cover?"
      },
      call: {
        partnerName: "Kepala Bagian Underwriting (Virtual Call)",
        prompt: "Berikan arahan teknis mengenai pengetatan skoring kontraktor, limit single obligor, dan syarat agunan balik."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Revisi Pedoman Underwriting Suretyship",
        brief: "Susun matriks limit kewenangan underwriting, skema retensi vs fakultatif, dan kriteria kontraktor layak jamin."
      },
      aiHints: [
        { q: "Alternatif agunan likuid", a: "Kombinasikan blokir deposito/bank garansi 25% + pengikatan fidusia/escrow account termin proyek dari obligee." }
      ],
      keywords: ["treaty", "fakultatif", "retensi", "counter-guarantee", "escrow", "single obligor", "skoring", "underwriting", "limit"],
      rubric: ["Ketajaman Analisa Risiko Teknik", "Negosiasi Reasuransi", "Kepemimpinan Underwriting", "Kualitas Pedoman Risiko"],
      benchmark: "Menempatkan kelebihan kapasitas ke reasuransi fakultatif dengan syarat escrow termin proyek & agunan balik memadai, serta memperketat skoring keuangan kontraktor."
    },
    {
      id: "bod3-kl1",
      units: ["Klaim", "Technical Head"],
      unit: "Klaim / Technical Head",
      title: "Lonjakan Klaim KUR (LR 89%) & Negosiasi Tiered SLA Bank Mitra Utama",
      durationSec: 1800,
      email: {
        from: "Direktur Manajemen Risiko <dirmr@asuransi-kredit.co.id>",
        subject: "URGENT: Gross Loss Ratio KUR 89% & Tuntutan SLA 5 Hari Bank Mitra",
        body: `<p>Dalam 3 kuartal terakhir <em>Gross Loss Ratio</em> KUR naik dari 68% ke 89%. Pagi ini EVP Bank Mitra Utama menuntut SLA pembayaran klaim dipercepat dari 14 hari menjadi 5 hari kerja dengan pelonggaran verifikasi dokumen.</p>`
      },
      chat: {
        partnerName: "EVP Bank Mitra Utama (AI Roleplay)",
        opening: "Jika SLA 5 hari tanpa syarat tidak disetujui minggu ini, kami akan alihkan 30% kuota penjaminan KUR ke kompetitor.",
        followUp: "Kalau tetap ada verifikasi dokumen, bagaimana kami yakin klaim kami tidak tertahan lama?"
      },
      call: {
        partnerName: "Kepala Bagian Klaim Wilayah (Virtual Call)",
        prompt: "Tim klaim kewalahan menghadapi backlog 1.200 berkas KUR. Sampaikan strategi triase & otomasi verifikasi Anda."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Transformasi SLA & Kontrol Klaim KUR",
        brief: "Data: Premi KUR Rp 400 M, Klaim Bruto Rp 340 M, Subrogasi Rp 28 M, Biaya Rp 72 M. Hitung Net Combined Ratio & susun strategi Tiered SLA."
      },
      aiHints: [
        { q: "Hitung Net Combined Ratio KUR", a: "Klaim Neto = 312 M (78%). Expense = 18%. Net Combined Ratio = 96%." }
      ],
      keywords: ["sla", "tiered", "host-to-host", "triase", "sampling", "audit", "combined ratio", "verifikasi", "pks"],
      rubric: ["Tata Kelola Klaim & Kepatuhan PKS", "Negosiasi SLA Berjenjang", "Efisiensi Operasional Klaim", "Analisa Rasio Portofolio"],
      benchmark: "Menolak pelonggaran tanpa syarat, menawarkan Tiered SLA (Fast-Track 5 hari khusus berkas digital host-to-host tervalidasi) sambil melakukan joint-audit berkas anomali."
    },
    {
      id: "bod3-sub1",
      units: ["Subrogasi"],
      unit: "Subrogasi",
      title: "Strategi Akselerasi Recovery Subrogasi Nasional & Eksekusi Agunan",
      durationSec: 1800,
      email: {
        from: "Direktur Keuangan & Operasional <dirkeu@asuransi-kredit.co.id>",
        subject: "Realisasi Subrogasi Baru 18% — Perlu Terobosan Strategis Kuartal IV",
        body: `<p>Total piutang subrogasi KUR &amp; Suretyship mencapai Rp 620 Miliar, namun recovery baru 18%. Sebanyak Rp 240 Miliar berasal dari klaim Suretyship yang agunannya belum dieksekusi karena kendala hukum.</p>`
      },
      chat: {
        partnerName: "Kepala Divisi Hukum & Remedial Bank Mitra (AI Roleplay)",
        opening: "Kami kesulitan menagih debitur KUR yang sudah hapus buku karena keterbatasan petugas lapangan kami.",
        followUp: "Jika kita pakai pihak ketiga (agensi penagihan) atau skema keringanan denda, bagaimana pembagian biayanya?"
      },
      call: {
        partnerName: "Kepala Bagian Subrogasi Pusat (Virtual Call)",
        prompt: "Arahkan pemetaan portofolio subrogasi berbasis klaster (Pareto nilai besar vs ritel) dan target eksekusi agunan."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Roadmap Recovery Subrogasi +15% YoY",
        brief: "Rancang skema segmentasi piutang subrogasi, kerja sama tim hukum/balai lelang, dan insentif penagihan berbasis recovery."
      },
      aiHints: [
        { q: "Prioritas eksekusi piutang Rp 620 M", a: "Fokuskan tim hukum pada Rp 240 M klaim Suretyship beragunan (quick-win nilai besar) dan digitalisasi reminder/keringanan pokok untuk klaster KUR mikro." }
      ],
      keywords: ["subrogasi", "recovery", "pareto", "agunan", "eksekusi", "lelang", "bank mitra", "hukum", "restrukturisasi", "klaster"],
      rubric: ["Strategi Recovery Berbasis Nilai", "Sinergi Hukum & Perbankan", "Inovasi Penagihan", "Proyeksi Dampak Kas"],
      benchmark: "Mengelompokkan piutang secara Pareto: akselerasi eksekusi/lelang agunan Suretyship Rp 240M melalui tim hukum, dan skema restrukturisasi/digital collection bersama Bank Mitra untuk KUR."
    },
    {
      id: "bod3-keu1",
      units: ["Keuangan"],
      unit: "Keuangan",
      title: "Manajemen Likuiditas Klaim, Cadangan Teknis PSAK 74, & Kesehatan RBC",
      durationSec: 1800,
      email: {
        from: "Direktur Keuangan <dirkeu@asuransi-kredit.co.id>",
        subject: "Tekanan Arus Kas Pembayaran Klaim KUR & Proyeksi RBC < 150%",
        body: `<p>Lonjakan klaim KUR menyebabkan arus kas keluar kuartal ini meningkat Rp 180 Miliar, sementara jatuh tempo deposito jangka panjang masih 4 bulan lagi. Di sisi lain, peningkatan cadangan teknis (IBNR &amp; premi belum merupakan pendapatan) menekan rasio <em>Risk-Based Capital (RBC)</em> mendekati batas internal 150%.</p>`
      },
      chat: {
        partnerName: "Kepala Divisi Investasi & Treasury (AI Roleplay)",
        opening: "Jika kita mencairkan obligasi pemerintah sekarang sebelum jatuh tempo, ada potensi kerugian mark-to-market sekitar Rp 6 Miliar.",
        followUp: "Opsi lain adalah mempercepat penagihan piutang premi & reasuransi (cash call). Mana yang lebih optimal?"
      },
      call: {
        partnerName: "Kepala Bagian Akuntansi & Pelaporan OJK (Virtual Call)",
        prompt: "Diskusikan dampak pencadangan teknis PSAK 74 terhadap laba/ekuitas dan langkah menjaga RBC di atas batas sehat."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Rencana Penguatan Likuiditas & RBC 180%",
        brief: "Susun strategi ALM (Asset Liability Management), akselerasi cash-call reasuransi, penagihan piutang premi, dan optimalisasi biaya operasional."
      },
      aiHints: [
        { q: "Langkah menghindari rugi jual obligasi", a: "Aktifkan repo obligasi jangka pendek, percepat cash-call recovery reasuransi, dan tagih piutang premi aging > 60 hari." }
      ],
      keywords: ["rbc", "likuiditas", "alm", "cadangan teknis", "ibnr", "psak 74", "cash call", "reasuransi", "piutang premi", "repo", "investasi"],
      rubric: ["Pengelolaan Likuiditas & ALM", "Pemahaman Regulasi RBC & PSAK 74", "Efisiensi Biaya & Penagihan Piutang", "Komunikasi Strategis Keuangan"],
      benchmark: "Menghindari cut-loss obligasi dengan skema repo/fasilitas likuiditas, mempercepat cash-call reasuransi dan penagihan piutang premi, serta mengoptimalkan bauran aset likuid untuk menjaga RBC > 180%."
    },
    {
      id: "bod3-bm1",
      units: ["Branch Manager", "Bisnis & Pemasaran"],
      unit: "Branch Manager / Bisnis & Pemasaran",
      title: "Turnaround Kinerja Kantor Wilayah / Cabang Utama (Premi vs Loss Ratio)",
      durationSec: 1800,
      email: {
        from: "Direktur Utama <dirut@asuransi-kredit.co.id>",
        subject: "Evaluasi Kinerja Wilayah: Target Premi Non-KUR Tercapai 62%, Loss Ratio 84%",
        body: `<p>Sebagai pimpinan wilayah/cabang utama, Anda menghadapi ketertinggalan target premi Non-KUR (Suretyship &amp; Asuransi Umum) sementara tim pemasaran dan teknik saling menyalahkan atas lamanya SLA penerbitan polis.</p>`
      },
      chat: {
        partnerName: "Pemimpin Cabang Bank BUMN Mitra (AI Roleplay)",
        opening: "Tim Anda lambat menerbitkan sertifikat Suretyship dan polis Asuransi Kebakaran debitur komersial kami, sehingga nasabah lari ke asuransi lain.",
        followUp: "Kalau SLA penerbitan bisa dijamin maksimal 2 hari kerja untuk berkas lengkap, kami siap alihkan seluruh debitur komersial ke Anda."
      },
      call: {
        partnerName: "Technical Head & Koordinator Pemasaran Wilayah (Virtual Call)",
        prompt: "Pimpin rapat sinkronisasi antara tim Pemasaran dan Underwriting/Klaim untuk mengakhiri silo dan menetapkan SLA bersama."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Rencana Turnaround Wilayah 100 Hari",
        brief: "Rumuskan target akuisisi Non-KUR, perbaikan SLA lintas fungsi (Pemasaran–Teknik–Keuangan), dan pengendalian Loss Ratio."
      },
      aiHints: [
        { q: "Cara menghilangkan silo Pemasaran vs Teknik", a: "Buat SLA bersama (joint KPI): Pemasaran wajib pakai checklist kelengkapan awal, Teknik wajib proses berkas lengkap maksimal 2 hari." }
      ],
      keywords: ["sla", "non-kur", "suretyship", "asuransi umum", "joint kpi", "silo", "bank mitra", "loss ratio", "turnaround", "cabang"],
      rubric: ["Kepemimpinan Lintas Fungsi", "Strategi Pertumbuhan Non-KUR", "Orientasi Layanan Mitra", "Pengendalian Profitabilitas Wilayah"],
      benchmark: "Menyelaraskan Pemasaran dan Teknik melalui joint KPI dan checklist pra-pengajuan, menjamin SLA 2 hari untuk berkas lengkap ke Bank Mitra, serta memfokuskan ekspansi pada segmen Asuransi Umum & Suretyship bermargin sehat."
    },
    {
      id: "bod3-mr1",
      units: ["Manajemen Risiko"],
      unit: "Manajemen Risiko",
      title: "Krisis Konsentrasi Risiko Suretyship & Early Warning System (EWS)",
      durationSec: 1800,
      email: {
        from: "Komite Pemantau Risiko <risk@asuransi-kredit.co.id>",
        subject: "EWS Alert: 42% Eksposur Suretyship Terkonsentrasi di 3 Grup Kontraktor",
        body: `<p>Tiga grup kontraktor besar mengalami penundaan termin proyek dengan potensi klaim mencapai Rp 120 Miliar. Salah satu pemimpin proyek meminta addendum perpanjangan jaminan tanpa tambahan counter-guarantee.</p>`
      },
      chat: {
        partnerName: "Direktur Utama Kontraktor Grup A (AI Roleplay)",
        opening: "Termin proyek kami tertunda 3 bulan. Kami butuh addendum perpanjangan jaminan tanpa tambah agunan.",
        followUp: "Jika ditolak, proyek bisa diputus kontrak dan langsung memicu klaim Rp 45 Miliar besok."
      },
      call: {
        partnerName: "Kepala Divisi Reasuransi & Aktuaria (Virtual Call)",
        prompt: "Diskusikan stress-test eksposur, aktivasi reasuransi, dan penguncian escrow account termin proyek."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Stress-Test Single Obligor & Mitigasi Risiko",
        brief: "Susun langkah mitigasi jangka pendek dan revisi kebijakan batas maksimum konsentrasi obligor."
      },
      aiHints: [
        { q: "Syarat addendum aman", a: "Wajibkan penguncian escrow account termin proyek dan persetujuan tertulis reasuransi." }
      ],
      keywords: ["konsentrasi", "eksposur", "escrow", "reasuransi", "single obligor", "limit", "stress-test", "ews", "addendum"],
      rubric: ["Manajemen Risiko Konsentrasi", "Perlindungan Neraca", "Negosiasi Berbasis Risiko", "Penguatan Kebijakan Limit"],
      benchmark: "Melakukan stress-test, mewajibkan escrow account termin proyek sebagai syarat addendum, berkoordinasi dengan reasuransi, dan merevisi batas single-obligor."
    }
  ],
  cap: [
    {
      id: "bod3-cap1",
      competency: "Decision Making & Business Acumen",
      prompt: "Dalam melakukan tugas dan tanggung jawab pekerjaan Anda, coba tuliskan satu keputusan baik yang pernah Anda buat dan satu keputusan yang kurang baik. Apa yang Anda lakukan berbeda dalam membuat masing-masing keputusan tersebut?",
      indicators: ["Business Acumen (membaca dampak finansial & pasar)", "Decision Making berbasis data & alternatif terukur", "Refleksi perbaikan dari keputusan kurang baik", "Dampak nyata pada kinerja unit/perusahaan"]
    },
    {
      id: "bod3-cap2",
      competency: "Digital Savvy & Innovation",
      prompt: "Ceritakan inisiatif pemanfaatan teknologi digital atau inovasi proses/produk baru yang Anda dorong untuk meningkatkan daya saing dan efisiensi organisasi.",
      indicators: ["Digital Savvy (memanfaatkan data/otomasi/AI/host-to-host)", "Innovation (solusi baru di luar kebiasaan lama)", "Adopsi oleh tim/mitra", "Peningkatan efisiensi/SLA yang terukur"]
    },
    {
      id: "bod3-cap3",
      competency: "Customer Orientation & Building Partnerships",
      prompt: "Ceritakan bagaimana Anda membangun atau menyelamatkan kemitraan strategis dengan pelanggan utama/Bank Mitra/regulator yang berdampak besar pada bisnis.",
      indicators: ["Customer Orientation (memahami kebutuhan inti mitra/nasabah)", "Building Partnerships (solusi win-win jangka panjang)", "Menjaga tata kelola & kepercayaan", "Pertumbuhan bisnis/retensi mitra terukur"]
    },
    {
      id: "bod3-cap4",
      competency: "Planning & Organizing & Driving for Results",
      prompt: "Ceritakan pengalaman Anda merancang rencana kerja besar lintas unit yang memiliki tenggat ketat, bagaimana Anda mengalokasikan sumber daya dan memastikan target terlampaui.",
      indicators: ["Planning & Organizing (prioritas, milestone, & alokasi sumber daya)", "Driving for Results (monitoring KPI & mengatasi hambatan)", "Eksekusi disiplin lintas fungsi", "Target tercapai atau terlampaui secara terukur"]
    },
    {
      id: "bod3-cap5",
      competency: "Coaching and Developing Others & Inspiring Others",
      prompt: "Ceritakan pengalaman Anda membimbing manajer/pimpinan di bawah Anda yang sedang menghadapi tekanan berat sehingga mereka berkembang dan terinspirasi mencapai performa puncak.",
      indicators: ["Coaching and Developing Others (umpan balik & pengembangan kapabilitas)", "Inspiring Others (membangun visi & semangat tim)", "Pendelegasian yang memberdayakan", "Peningkatan kinerja/kesiapan suksesor yang nyata"]
    },
    {
      id: "bod3-cap6",
      competency: "Facilitating Change & Creating an Inclusive Environment",
      prompt: "Ceritakan pengalaman Anda memimpin perubahan kebijakan atau transformasi kerja yang awalnya ditolak, sambil tetap merangkul keberagaman pandangan dari berbagai unit/generasi.",
      indicators: ["Facilitating Change (mengatasi resistensi & komunikasi perubahan)", "Creating an Inclusive Environment (menghargai perspektif beragam secara adil)", "Membangun rasa aman psikologis untuk berpendapat", "Keberhasilan adopsi perubahan secara berkelanjutan"]
    }
  ],
  personality: [
    { id: "o3-1", dim: "Openness", text: "Saya aktif mendorong adopsi teknologi (seperti AI scoring dan integrasi host-to-host) untuk memperbarui proses bisnis lama.", reverse: false },
    { id: "o3-2", dim: "Openness", text: "Saya lebih nyaman mempertahankan pola kerja konvensional yang sudah terbukti daripada mencoba pendekatan baru.", reverse: true },
    { id: "o3-3", dim: "Openness", text: "Saya sering mengeksplorasi model produk penjaminan atau pengelolaan keuangan baru untuk diterapkan di perusahaan.", reverse: false },
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
