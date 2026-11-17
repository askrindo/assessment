window.DATA_BOD4 = {
  gradeId: "BOD-4",
  title: "BOD – 4 (Job Grade 12–14)",
  headcount: 523,
  roleLabel: "Kepala Bagian / Manajer Unit / Kepala Seksi Senior",
  methods: [
    { id: "potrai", name: "PotrAI Simulation (180–240 menit)", desc: "Simulasi 5 modul terintegrasi: Email, Chat Roleplay AI, Call/Virtual Meeting, Documents (Analisa Bisnis), & AI Assistant." },
    { id: "cap", name: "CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan terstruktur berbasis pengalaman kerja (Pencapaian, Tantangan, Tindakan, Hasil) & bukti perilaku." },
    { id: "personality", name: "Personality Test — OCEAN (30–40 menit)", desc: "Inventori 5 dimensi OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)." }
  ],
  potrai: [
    {
      id: "bod4-p1",
      unit: "Underwriting & Klaim",
      title: "Eskalasi Performance Bond Rp 15 Miliar & Anomali Klaim KUR Mikro",
      durationSec: 1500,
      email: {
        from: "Kepala Cabang Wilayah X <kacab.x@asuransi-kredit.co.id>",
        subject: "Mohon Approval Segera: Performance Bond Kontraktor PT Mega Konstruksi (Rp 15 M)",
        body: `
          <p>Halo Rekan Manajer Underwriting &amp; Klaim,</p>
          <p>Kami butuh persetujuan hari ini untuk penerbitan <em>Performance Bond</em> Rp 15 Miliar agar target premi Non-KUR kuartal ini tercapai. Memang kontraktor tersebut pernah mengalami 1x klaim macet 2 tahun lalu (subrogasi baru tertagih 40%), dan sertifikat tanah untuk <em>counter guarantee</em> masih proses appraisal.</p>
          <p>Mohon dibantu persetujuannya via balasan email ini.</p>
        `
      },
      chat: {
        partnerName: "Relationship Manager Bank Mitra X (AI Roleplay)",
        opening: "Selamat siang Pak/Bu. Pengajuan klaim KUR Mikro batch bulan ini sudah masuk 45 berkas. Kami minta pencairan dipercepat sesuai SLA PKS ya, karena kantor wilayah kami sedang kejar target NPF.",
        followUp: "Tapi Pak/Bu, kalau ditunda karena sampling dokumen usaha belum lengkap, nasabah dan cabang kami bisa komplain keras. Bisa dibayar dulu 50% sambil dokumen menyusul?"
      },
      call: {
        partnerName: "Analis Klaim Junior (Virtual Call)",
        prompt: "Analis Anda (baru bekerja 6 bulan) menelepon dengan nada ragu karena ditekan pihak cabang dan bank untuk meloloskan berkas yang belum lengkap. Sampaikan arahan coaching & perlindungan manajerial Anda dalam panggilan ini."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Evaluasi Kapasitas SLA & Recovery Subrogasi",
        brief: "Data Unit: Beban klaim 4 analis saat ini 200 berkas/bulan (SLA turun ke 70%; kapasitas ideal 150 berkas/analis untuk SLA >=90%). Sementara recovery subrogasi baru 52% karena fokus pada debitur kecil. Susun analisa kebutuhan SDM/proses & rencana perbaikan."
      },
      aiHints: [
        { q: "Hitung tambahan analis yang dibutuhkan", a: "Total berkas = 4 x 200 = 800 berkas. Agar <= 150 berkas/analis, butuh 800/150 = 5,33 -> 6 analis (tambah 2 analis atau terapkan triase otomatis)." },
        { q: "Langkah mitigasi Suretyship Rp 15M", a: "Pending/tolak penerbitan hingga sisa subrogasi 60% dilunasi dan appraisal agunan selesai, atau minta jaminan tunai/bank garansi pengganti." }
      ],
      keywords: ["pending", "tolak", "subrogasi", "appraisal", "counter guarantee", "sampling", "audit", "pks", "sla", "coaching", "pareto", "kapasitas"],
      rubric: [
        "Email: Ketegasan prinsip underwriting & solusi alternatif yang konstruktif",
        "Chat & Call: Ketahanan menghadapi tekanan mitra & kemampuan membimbing tim",
        "Documents: Ketepatan analisa kapasitas beban kerja (Pareto & kebutuhan analis)",
        "Integritas & Risk Governance"
      ],
      benchmark: "Menahan persetujuan Performance Bond sampai kewajiban subrogasi tuntas & appraisal agunan selesai; menahan batch klaim KUR yang cacat dokumen untuk joint-audit bersama Bank Mitra; membimbing analis junior agar objektif berbasis SOP; dan merekomendasikan penambahan 2 analis / sistem triase + strategi Pareto untuk subrogasi."
    },
    {
      id: "bod4-p2",
      unit: "Bisnis & Pemasaran",
      title: "Perang Tarif Suretyship & Cross-Selling Asuransi Umum",
      durationSec: 1500,
      email: {
        from: "Koordinator Pemasaran Regional <pemasaran@asuransi-kredit.co.id>",
        subject: "Permintaan Diskon Tarif IJP Suretyship 25% Tanpa Agunan Balik",
        body: `
          <p>Mohon persetujuan diskon tarif IJP 25% tanpa counter-guarantee untuk 12 kontraktor proyek APBD, karena kompetitor menawarkan skema tersebut. Jika ditolak, agen mengancam memindahkan portofolio Asuransi Umum-nya.</p>
        `
      },
      chat: {
        partnerName: "Mitra Agen Utama (AI Roleplay)",
        opening: "Pak/Bu, kalau perusahaan Bapak tidak bisa samakan tarif murah kompetitor, besok 12 kontraktor dan polis kebakaran saya pindah semua ya.",
        followUp: "Oke kalau tarif tidak bisa turun ekstrem, nilai tambah apa yang bisa Bapak kasih biar kontraktor saya tetap mau ambil di tempat Bapak?"
      },
      call: {
        partnerName: "Kepala Seksi Teknik / Underwriting Cabang (Virtual Call)",
        prompt: "Koordinasikan skema bundling Suretyship + Asuransi Umum (CAR/EAR) dengan percepatan SLA sertifikat digital bagi kontraktor ber-track record bersih."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Simulasi Margin Bundling Suretyship & Asuransi Umum",
        brief: "Susun analisa mengapa perang tarif merusak Combined Ratio, serta strategi paket bundling & SLA digital untuk mempertahankan agen."
      },
      aiHints: [
        { q: "Risiko perang tarif IJP 25%", a: "Menurunkan margin premi sementara eksposur klaim tetap 100%, melanggar ketentuan aktuaria/tarif sehat, dan memicu adverse selection." }
      ],
      keywords: ["tarif", "margin", "bundling", "cross-selling", "sla", "digital", "adverse selection", "car", "ear", "track record"],
      rubric: [
        "Disiplin Pricing & Profitabilitas",
        "Negosiasi Nilai Tambah dengan Agen",
        "Sinergi Pemasaran–Underwriting",
        "Kualitas Analisa Bisnis"
      ],
      benchmark: "Menolak perang tarif yang merusak margin dan memicu adverse selection, lalu menawarkan paket bundling Suretyship + CAR/EAR dengan jaminan SLA penerbitan digital 1 hari kerja bagi kontraktor berperingkat kredit sehat."
    }
  ],
  cap: [
    {
      id: "bod4-cap1",
      competency: "Problem Solving & Risk-Based Decision Making",
      prompt: "Ceritakan satu situasi kerja di mana Anda harus mengambil keputusan sulit antara mengejar target bisnis/SLA dan menjaga kepatuhan/risiko (misalnya terkait Underwriting, Klaim, atau Subrogasi).",
      indicators: ["Situasi & dilema dijelaskan spesifik", "Peran & tanggung jawab pribadi jelas", "Tindakan berbasis data/SOP & komunikasi efektif", "Hasil terukur (angka/dampak nyata)"]
    },
    {
      id: "bod4-cap2",
      competency: "Developing Others & Leading Execution",
      prompt: "Ceritakan pengalaman Anda saat tim atau anggota tim Anda menghadapi tekanan target atau kendala teknis berat, dan bagaimana Anda membimbing mereka hingga mencapai hasil.",
      indicators: ["Identifikasi kebutuhan/kendala anggota tim", "Tindakan coaching/pembagian kerja konkret", "Membangun ketahanan & akuntabilitas tim", "Peningkatan kinerja yang terukur"]
    }
  ],
  personality: [
    { id: "o4-1", dim: "Openness", text: "Saya senang mencari cara-cara baru dan lebih efisien dalam memproses verifikasi klaim atau penagihan subrogasi.", reverse: false },
    { id: "o4-2", dim: "Openness", text: "Saya merasa kurang nyaman jika SOP atau sistem kerja di unit saya sering diperbarui.", reverse: true },
    { id: "c4-1", dim: "Conscientiousness", text: "Saya selalu memastikan setiap berkas penjaminan atau klaim memenuhi seluruh checklist kepatuhan sebelum disetujui.", reverse: false },
    { id: "c4-2", dim: "Conscientiousness", text: "Terkadang saya menunda pencatatan administrasi karena lebih fokus pada hasil cepat.", reverse: true },
    { id: "e4-1", dim: "Extraversion", text: "Saya proaktif membangun komunikasi dengan Bank Mitra, Cabang, dan lintas bagian untuk mempercepat penyelesaian masalah.", reverse: false },
    { id: "e4-2", dim: "Extraversion", text: "Saya lebih suka berkomunikasi lewat pesan singkat daripada berdiskusi langsung untuk menyelesaikan konflik kerja.", reverse: true },
    { id: "a4-1", dim: "Agreeableness", text: "Saya mendengarkan sudut pandang tim pemasaran dan mitra dengan empati sebelum menyampaikan keputusan underwriting.", reverse: false },
    { id: "a4-2", dim: "Agreeableness", text: "Saya mudah terpancing emosi ketika ada pihak lain yang mendesak saya melanggar prosedur.", reverse: true },
    { id: "n4-1", dim: "Neuroticism", text: "Tumpukan target dan komplain mitra di akhir bulan sering membuat saya kewalahan secara emosional.", reverse: true },
    { id: "n4-2", dim: "Neuroticism", text: "Saya mampu menjaga ketenangan dan berpikir jernih saat menghadapi eskalasi mendadak dari atasan maupun mitra.", reverse: false }
  ]
};
