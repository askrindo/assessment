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
        body: `<p>Rekan Manajer, kami butuh persetujuan hari ini untuk <em>Performance Bond</em> Rp 15 M agar target premi Non-KUR tercapai. Kontraktor pernah 1x klaim macet 2 tahun lalu (subrogasi baru tertagih 40%), dan sertifikat tanah <em>counter guarantee</em> masih proses appraisal.</p>`
      },
      chat: {
        partnerName: "Relationship Manager Bank Mitra X (AI Roleplay)",
        opening: "Selamat siang Pak/Bu. Pengajuan klaim KUR Mikro batch bulan ini sudah masuk 45 berkas. Kami minta pencairan dipercepat sesuai SLA PKS ya.",
        followUp: "Kalau ditunda karena sampling dokumen usaha belum lengkap, cabang kami bisa komplain keras. Bisa dibayar dulu 50% sambil dokumen menyusul?"
      },
      call: {
        partnerName: "Analis Klaim Junior (Virtual Call)",
        prompt: "Analis Anda (baru bekerja 6 bulan) menelepon dengan nada ragu karena ditekan pihak cabang dan bank untuk meloloskan berkas yang belum lengkap. Sampaikan arahan coaching & perlindungan manajerial Anda."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Evaluasi Kapasitas SLA & Recovery Subrogasi",
        brief: "Data Unit: 4 analis menangani 200 berkas/analis/bulan (SLA turun ke 70%; kapasitas ideal 150 berkas/analis untuk SLA >=90%). Susun analisa kebutuhan SDM & rencana perbaikan."
      },
      aiHints: [
        { q: "Hitung tambahan analis yang dibutuhkan", a: "Total berkas = 4 x 200 = 800. Agar <= 150 berkas/analis, butuh 800/150 = 5,33 -> 6 analis (tambah 2 analis)." },
        { q: "Mitigasi Suretyship Rp 15M", a: "Pending hingga sisa subrogasi 60% dilunasi dan appraisal selesai, atau minta jaminan tunai/bank garansi pengganti." }
      ],
      keywords: ["pending", "tolak", "subrogasi", "appraisal", "counter guarantee", "sampling", "audit", "pks", "sla", "coaching", "pareto", "kapasitas"],
      rubric: ["Email: Ketegasan prinsip underwriting & solusi alternatif", "Chat & Call: Ketahanan tekanan mitra & coaching tim", "Documents: Analisa kapasitas beban kerja", "Integritas & Risk Governance"],
      benchmark: "Menahan Performance Bond sampai kewajiban subrogasi tuntas & appraisal selesai; menahan batch klaim KUR cacat dokumen untuk joint-audit; membimbing analis junior; serta merekomendasikan penambahan 2 analis."
    },
    {
      id: "bod4-p2",
      unit: "Bisnis & Pemasaran",
      title: "Perang Tarif Suretyship & Cross-Selling Asuransi Umum",
      durationSec: 1500,
      email: {
        from: "Koordinator Pemasaran Regional <pemasaran@asuransi-kredit.co.id>",
        subject: "Permintaan Diskon Tarif IJP Suretyship 25% Tanpa Agunan Balik",
        body: `<p>Mohon persetujuan diskon tarif IJP 25% tanpa counter-guarantee untuk 12 kontraktor proyek APBD, karena kompetitor menawarkan skema tersebut. Agen mengancam memindahkan portofolio Asuransi Umum-nya.</p>`
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
        brief: "Susun analisa mengapa perang tarif merusak Combined Ratio, serta strategi paket bundling & SLA digital."
      },
      aiHints: [
        { q: "Risiko perang tarif IJP 25%", a: "Menurunkan margin premi sementara eksposur klaim tetap 100%, dan memicu adverse selection." }
      ],
      keywords: ["tarif", "margin", "bundling", "cross-selling", "sla", "digital", "adverse selection", "car", "ear", "track record"],
      rubric: ["Disiplin Pricing & Profitabilitas", "Negosiasi Nilai Tambah", "Sinergi Pemasaran–Underwriting", "Kualitas Analisa Bisnis"],
      benchmark: "Menolak perang tarif yang merusak margin, lalu menawarkan paket bundling Suretyship + CAR/EAR dengan jaminan SLA penerbitan digital 1 hari kerja bagi kontraktor berperingkat sehat."
    },
    {
      id: "bod4-p3",
      unit: "Underwriting & Klaim",
      title: "Optimalisasi Subrogasi Pareto & Interim Payment Klaim Asuransi Umum",
      durationSec: 1500,
      email: {
        from: "Kepala Seksi Klaim Asuransi Umum <klaim.umum@asuransi-kredit.co.id>",
        subject: "Permohonan Interim Payment 50% Klaim Kebakaran Rp 4,2 Miliar & Target Subrogasi",
        body: `<p>Target recovery subrogasi unit baru 52% karena tim menagih debitur plafon kecil. Di saat sama, tertanggung Asuransi Kebakaran &amp; Pengangkutan (total Rp 4,2 M) mendesak pembayaran di muka 50% sebelum laporan final <em>loss adjuster</em> terbit.</p>`
      },
      chat: {
        partnerName: "Direktur Perusahaan Tertanggung (AI Roleplay)",
        opening: "Pabrik kami butuh dana cepat untuk perbaikan pasca kebakaran. Bisa cairkan 50% dulu minggu ini sambil tunggu loss adjuster?",
        followUp: "Kami nasabah lama dengan premi besar. Minimal berikan kepastian syarat dan jadwal pencairan interim-nya."
      },
      call: {
        partnerName: "Staf Senior Penagihan Subrogasi (Virtual Call)",
        prompt: "Staf senior mengeluh bahwa perubahan metode penagihan berbasis prioritas plafon (Pareto) mengganggu rutinitasnya. Lakukan coaching dalam panggilan ini."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Segmentasi Portofolio Subrogasi 80/20",
        brief: "Rancang klasterisasi piutang subrogasi (besar vs kecil), target recovery kuartal IV, serta SOP persetujuan interim payment."
      },
      aiHints: [
        { q: "Syarat mutlak interim payment", a: "Liability polis harus terkonfirmasi tidak ada pelanggaran warranty, serta ada rekomendasi tertulis nilai minimum kerugian dari loss adjuster independen." }
      ],
      keywords: ["pareto", "loss adjuster", "interim", "liability", "polis", "subrogasi", "segmentasi", "coaching", "agunan"],
      rubric: ["Kepatuhan Prosedur Klaim Umum", "Efektivitas Strategi Subrogasi Pareto", "Change Leadership & Coaching", "Layanan Nasabah Terukur"],
      benchmark: "Menerapkan segmentasi Pareto 80/20 untuk subrogasi dan menggandeng mitra hukum pada eksposur besar; interim payment hanya diproses setelah liability polis jelas dan ada rekomendasi tertulis loss adjuster."
    },
    {
      id: "bod4-p4",
      unit: "Manajemen Risiko",
      title: "Temuan Audit Internal atas Deviasi SLIK OJK di Cabang",
      durationSec: 1500,
      email: {
        from: "Tim Audit Internal <audit@asuransi-kredit.co.id>",
        subject: "Notisi Temuan: 18 Polis Kredit Konstruksi Terbit Tanpa SLIK OJK",
        body: `<p>Ditemukan 18 polis Kredit Konstruksi Non-KUR di Cabang Y terbit tanpa melampirkan SLIK OJK terbaru dengan alasan gangguan sistem akhir bulan. Dua debitur di antaranya mulai menunggak.</p>`
      },
      chat: {
        partnerName: "Kepala Cabang Y (AI Roleplay)",
        opening: "Mas/Mbak, waktu itu sistem lagi error dan deadline kejar target. Lagipula cabang lain juga kadang menyusulkan dokumen saat akhir bulan.",
        followUp: "Oke, saya siap perbaiki. Tapi untuk 16 polis lainnya yang masih lancar, apakah tetap perlu kami tarik SLIK-nya sekarang?"
      },
      call: {
        partnerName: "Supervisor Operasional & IT Cabang (Virtual Call)",
        prompt: "Arahkan penerapan hard-stop pada aplikasi underwriting agar polis tidak dapat diterbitkan tanpa unggahan SLIK valid."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Action Plan Tindak Lanjut Temuan Audit",
        brief: "Susun langkah remedial 18 polis bermasalah, penguatan kontrol sistem (hard-control), dan mekanisme monitoring bulanan."
      },
      aiHints: [
        { q: "Prinsip respons terhadap alasan 'cabang lain juga begitu'", a: "Tolak normalisasi penyimpangan (anti-normalization of deviance); semua polis tetap wajib tarik SLIK retroaktif dan dievaluasi risikonya." }
      ],
      keywords: ["slik", "audit", "hard-stop", "kontrol", "remedial", "retroaktif", "kepatuhan", "monitoring"],
      rubric: ["Integritas & Anti-Normalisasi Penyimpangan", "Perbaikan Kontrol Sistemik", "Penanganan Remedial Debitur", "Ketegasan Komunikasi"],
      benchmark: "Menarik SLIK retroaktif untuk seluruh 18 polis, melakukan remedial pada 2 debitur menunggak, menerapkan hard-stop sistem IT, dan memberi pembinaan tertulis tanpa menoleransi alasan kebiasaan."
    }
  ],
  cap: [
    {
      id: "bod4-cap1",
      competency: "Problem Solving & Risk-Based Decision Making",
      prompt: "Ceritakan satu situasi kerja di mana Anda harus mengambil keputusan sulit antara mengejar target bisnis/SLA dan menjaga kepatuhan/risiko (misalnya Underwriting, Klaim, atau Subrogasi).",
      indicators: ["Situasi & dilema spesifik", "Peran pribadi jelas", "Tindakan berbasis data/SOP & komunikasi efektif", "Hasil terukur"]
    },
    {
      id: "bod4-cap2",
      competency: "Developing Others & Leading Execution",
      prompt: "Ceritakan pengalaman Anda saat tim atau anggota tim Anda menghadapi tekanan target atau kendala teknis berat, dan bagaimana Anda membimbing mereka hingga mencapai hasil.",
      indicators: ["Identifikasi kendala anggota tim", "Tindakan coaching/pembagian kerja konkret", "Membangun akuntabilitas tim", "Peningkatan kinerja terukur"]
    },
    {
      id: "bod4-cap3",
      competency: "Stakeholder Management & Conflict Resolution",
      prompt: "Ceritakan pengalaman Anda menyelesaikan konflik atau perbedaan kepentingan yang tajam dengan pihak eksternal (Bank Mitra/Kontraktor) atau unit internal lain.",
      indicators: ["Memahami sudut pandang pihak lain", "Negosiasi berbasis fakta & win-win", "Menjaga prinsip tata kelola", "Hubungan kerja tetap produktif"]
    },
    {
      id: "bod4-cap4",
      competency: "Continuous Process Improvement",
      prompt: "Ceritakan inisiatif perbaikan proses kerja (SOP, alur verifikasi, atau strategi penagihan) yang Anda gagas di unit Anda dan dampak efisiensi/kualitas yang dihasilkan.",
      indicators: ["Identifikasi bottleneck operasional", "Desain solusi praktis", "Implementasi bersama tim", "Dampak terukur pada SLA/akurasi/recovery"]
    }
  ],
  personality: [
    { id: "o4-1", dim: "Openness", text: "Saya senang mencari cara-cara baru dan lebih efisien dalam memproses verifikasi klaim atau penagihan subrogasi.", reverse: false },
    { id: "o4-2", dim: "Openness", text: "Saya merasa kurang nyaman jika SOP atau sistem kerja di unit saya sering diperbarui.", reverse: true },
    { id: "o4-3", dim: "Openness", text: "Saya terbuka mempelajari teknik analisis data terbaru untuk meningkatkan akurasi underwriting.", reverse: false },
    { id: "c4-1", dim: "Conscientiousness", text: "Saya selalu memastikan setiap berkas penjaminan atau klaim memenuhi seluruh checklist kepatuhan sebelum disetujui.", reverse: false },
    { id: "c4-2", dim: "Conscientiousness", text: "Terkadang saya menunda pencatatan administrasi karena lebih fokus pada hasil cepat.", reverse: true },
    { id: "c4-3", dim: "Conscientiousness", text: "Saya memantau jadwal SLA tim setiap hari agar tidak ada berkas yang melewati batas waktu.", reverse: false },
    { id: "e4-1", dim: "Extraversion", text: "Saya proaktif membangun komunikasi dengan Bank Mitra, Cabang, dan lintas bagian untuk mempercepat penyelesaian masalah.", reverse: false },
    { id: "e4-2", dim: "Extraversion", text: "Saya lebih suka berkomunikasi lewat pesan singkat daripada berdiskusi langsung untuk menyelesaikan konflik kerja.", reverse: true },
    { id: "e4-3", dim: "Extraversion", text: "Saya merasa percaya diri saat mempresentasikan laporan kinerja unit di hadapan pimpinan.", reverse: false },
    { id: "a4-1", dim: "Agreeableness", text: "Saya mendengarkan sudut pandang tim pemasaran dan mitra dengan empati sebelum menyampaikan keputusan underwriting.", reverse: false },
    { id: "a4-2", dim: "Agreeableness", text: "Saya mudah terpancing emosi ketika ada pihak lain yang mendesak saya melanggar prosedur.", reverse: true },
    { id: "a4-3", dim: "Agreeableness", text: "Saya lebih mengutamakan solusi kolaboratif daripada mencari siapa yang salah saat terjadi kendala tim.", reverse: false },
    { id: "n4-1", dim: "Neuroticism", text: "Tumpukan target dan komplain mitra di akhir bulan sering membuat saya kewalahan secara emosional.", reverse: true },
    { id: "n4-2", dim: "Neuroticism", text: "Saya mampu menjaga ketenangan dan berpikir jernih saat menghadapi eskalasi mendadak dari atasan maupun mitra.", reverse: false },
    { id: "n4-3", dim: "Neuroticism", text: "Saya sering merasa sulit tidur atau cemas berlebihan ketika ada berkas klaim bernilai besar yang tertunda.", reverse: true }
  ]
};
