window.DATA_BOD4 = {
  gradeId: "BOD-4",
  title: "BOD – 4 (Job Grade 12–14)",
  headcount: 523,
  roleLabel: "Kepala Bagian / Manajer Unit / Kepala Seksi Senior",
  methods: [
    { id: "potrai", name: "PotrAI Simulation", desc: "Simulasi keputusan manajerial harian (In-Tray & Roleplay) terkait KUR, Suretyship, Klaim & Subrogasi." },
    { id: "cap", name: "CAP (Cognitive & Analytical)", desc: "Penalaran numerik, rasio klaim/subrogasi, dan logika analitis operasional manajerial." },
    { id: "personality", name: "Personality Test", desc: "Pemetaan gaya kepemimpinan manajerial, integritas, dan ketahanan menghadapi konflik." }
  ],
  potrai: [
    {
      id: "bod4-p1",
      unit: "Underwriting & Klaim",
      title: "Dilema Performance Bond Rp 15 Miliar & Lonjakan Klaim KUR Mikro",
      durationSec: 480,
      memo: `
        <h4>Inbox Manajer Underwriting & Klaim</h4>
        <p><strong>1. Eskalasi Suretyship (Non-KUR):</strong> Kepala Cabang mendesak persetujuan <em>Performance Bond</em> Rp 15 Miliar untuk kontraktor swasta yang pernah mengalami <strong>1x klaim macet</strong> 2 tahun lalu (subrogasi baru tertagih 40%). Counter guarantee berupa tanah masih dalam proses appraisal, namun proyek ini krusial untuk target premi kuartal ini.</p>
        <p><strong>2. Anomali Klaim KUR:</strong> Analis klaim menemukan lonjakan klaim KUR Mikro dari Bank Mitra X dengan pola macet seragam di bulan ke-4 dan indikasi dokumen usaha debitur kurang lengkap saat sampling. Bank Mitra meminta pencairan dipercepat sesuai SLA PKS.</p>
      `,
      question: "Rumuskan keputusan Anda untuk kedua kasus di atas, cara komunikasi Anda kepada Kepala Cabang, Tim Analis, serta Bank Mitra, dan langkah mitigasi risikonya.",
      followUpPrompt: "AI Probe (Tindak Lanjut): Kepala Cabang mengirim pesan bahwa jika Suretyship ditolak hari ini, nasabah akan pindah ke asuransi lain dan target cabang gagal. Sementara Analis Anda baru bekerja 6 bulan dan ragu menandatangani penundaan klaim KUR. Apa tindakan konkret Anda?",
      keywords: ["tolak", "tunda", "pending", "appraisal", "counter guarantee", "subrogasi", "lunas", "sla", "sampling", "audit", "investigasi", "pks", "komunikasi", "eskalasi"],
      rubric: [
        "Ketegasan Prinsip Underwriting (menolak/menunda tanpa agunan tuntas & penyelesaian subrogasi)",
        "Integritas & Kontrol Klaim KUR (verifikasi berbasis bukti & audit sampling sebelum bayar)",
        "Kepemimpinan Tim (melindungi & membimbing analis junior dalam mengambil keputusan objektif)",
        "Komunikasi Konstruktif (menjelaskan solusi alternatif ke Cabang & Bank Mitra)"
      ],
      benchmark: "Menunda/menolak penerbitan Performance Bond sampai tunggakan subrogasi lama diselesaikan dan appraisal agunan balik selesai (atau meminta jaminan tunai/bank garansi pengganti). Untuk klaim KUR, menahan pembayaran pada batch yang terindikasi cacat dokumen untuk audit bersama (joint verification) dengan Bank Mitra sambil tetap memproses klaim yang dokumennya valid."
    },
    {
      id: "bod4-p2",
      unit: "Underwriting & Klaim",
      title: "Optimalisasi Recovery Subrogasi & Penanganan Klaim Asuransi Umum",
      durationSec: 480,
      memo: `
        <h4>Laporan Kinerja Kuartalan Bagian Klaim & Subrogasi</h4>
        <p>Target <em>recovery rate</em> subrogasi di unit Anda baru tercapai 52% dari target tahunan karena tim penagihan fokus pada debitur berplafon kecil yang sulit dihubungi. Di saat yang sama, terdapat 2 pengajuan klaim Asuransi Umum (Kebakaran & Pengangkutan) senilai total Rp 4,2 Miliar yang membutuhkan <em>loss adjuster</em> independen, namun tertanggung meminta klaim dibayar di muka sebesar 50% (<em>interim payment</em>).</p>
      `,
      question: "Bagaimana Anda merestrukturisasi strategi kerja tim subrogasi dan memutuskan permohonan interim payment klaim Asuransi Umum tersebut?",
      followUpPrompt: "AI Probe: Salah satu anggota tim subrogasi senior mengeluh bahwa perubahan metode penagihan berbasis prioritas plafon (Pareto) mengganggu rutinitas kerjanya. Bagaimana Anda mengelolanya?",
      keywords: ["pareto", "prioritas", "segmentasi", "loss adjuster", "interim", "polis", "liability", "dokumen", "restrukturisasi", "coaching", "kpi", "agunan"],
      rubric: [
        "Efektivitas Operasional & Prinsip Pareto pada Subrogasi",
        "Kepatuhan Prosedur Klaim Asuransi Umum (konfirmasi liability sebelum interim)",
        "People Management & Change Leadership",
        "Orientasi Target & Kualitas Layanan"
      ],
      benchmark: "Menerapkan klasifikasi portofolio subrogasi berbasis nilai & kolektibilitas (Pareto 80/20) serta menggandeng mitra hukum/eksekusi agunan untuk eksposur besar. Untuk interim payment, hanya dapat dipertimbangkan setelah liability polis terkonfirmasi jelas dan ada rekomendasi tertulis dari loss adjuster independen."
    },
    {
      id: "bod4-p3",
      unit: "Bisnis & Pemasaran",
      title: "Persaingan Tarif Suretyship & Cross-Selling Asuransi Umum",
      durationSec: 480,
      memo: `
        <h4>Situasi Pasar Regional</h4>
        <p>Kompetitor menawarkan tarif jasa imbal jasa penjaminan (IJP) <em>Suretyship</em> 25% lebih murah tanpa syarat agunan balik untuk proyek APBD. Mitra agen pemasaran Anda meminta izin memberikan diskon tarif serupa agar tidak kehilangan 12 kontraktor loyal.</p>
      `,
      question: "Apa keputusan Anda terhadap permintaan diskon tarif ekstrem tersebut, dan strategi nilai tambah apa yang Anda tawarkan agar nasabah tetap bertahan?",
      followUpPrompt: "AI Probe: Agen mengancam akan memindahkan seluruh portofolio Asuransi Umum-nya jika tarif Suretyship tidak diturunkan. Bagaimana sikap Anda?",
      keywords: ["tarif", "ojk", "bundling", "cross-selling", "sla", "digital", "risiko", "profitabilitas", "selektif", "margin", "underwriting"],
      rubric: [
        "Disiplin Pricing & Kepatuhan Regulasi",
        "Kreativitas Bisnis (bundling, layanan cepat, digitalisasi penerbitan)",
        "Sinergi Pemasaran–Underwriting",
        "Ketegasan terhadap Tekanan Agen"
      ],
      benchmark: "Tidak ikut perang tarif yang merusak profitabilitas dan melanggar ketentuan tarif/aktuaria. Menawarkan paket bundling Suretyship + Asuransi Umum (CAR/EAR) dengan percepatan SLA penerbitan sertifikat digital bagi kontraktor dengan track record bersih."
    },
    {
      id: "bod4-p4",
      unit: "Manajemen Risiko",
      title: "Temuan Audit Internal atas Deviasi Prosedur Underwriting Cabang",
      durationSec: 480,
      memo: `
        <h4>Notisi Temuan Audit</h4>
        <p>Audit internal menemukan 18 polis Kredit Konstruksi Non-KUR di Cabang Y diterbitkan tanpa melampirkan hasil <em>BI Checking / SLIK OJK</em> terbaru dengan alasan sistem sedang gangguan saat akhir bulan. Dua di antaranya kini mulai menunggak.</p>
      `,
      question: "Langkah korektif dan preventif apa yang Anda lakukan sebagai Manajer terkait temuan ini?",
      followUpPrompt: "AI Probe: Kepala Cabang Y berdalih bahwa semua cabang lain juga kadang melakukan hal serupa saat akhir bulan. Bagaimana tanggapan Anda?",
      keywords: ["slik", "audit", "tindak lanjut", "sanksi", "sistem", "kontrol", "checklist", "blokir", "remedial", "kepatuhan"],
      rubric: [
        "Akuntabilitas & Kepatuhan Prosedur",
        "Perbaikan Sistemik (Hard-Control di aplikasi underwriting)",
        "Penanganan Debitur Bermasalah (Remedial)",
        "Komunikasi Tegas tanpa Membiarkan Normalisasi Penyimpangan"
      ],
      benchmark: "Segera lakukan penarikan SLIK retroaktif dan evaluasi ulang kolektibilitas 18 polis tersebut, berlakukan hard-stop di sistem IT agar polis tidak dapat terbit tanpa dokumen SLIK, serta lakukan pembinaan/teguran tertulis sesuai ketentuan tanpa menormalisasi pelanggaran."
    }
  ],
  cap: [
    {
      id: "bod4-c1",
      category: "Numerik Underwriting",
      question: "Sebuah cabang membukukan Premi Suretyship Rp 12 Miliar dengan Loss Ratio 45%, dan Premi KUR Rp 48 Miliar dengan Loss Ratio 75%. Berapakah total klaim yang terjadi di cabang tersebut?",
      options: [
        "Rp 41,4 Miliar",
        "Rp 36,0 Miliar",
        "Rp 42,6 Miliar",
        "Rp 39,2 Miliar"
      ],
      answer: 0,
      explanation: "Klaim Suretyship = 45% x Rp 12 M = Rp 5,4 M. Klaim KUR = 75% x Rp 48 M = Rp 36,0 M. Total Klaim = 5,4 + 36,0 = Rp 41,4 Miliar."
    },
    {
      id: "bod4-c2",
      category: "Subrogasi & Recovery",
      question: "Total klaim KUR yang telah dibayar pada tahun lalu adalah Rp 80 Miliar. Hingga kuartal III tahun ini, tim subrogasi berhasil menagih Rp 14,4 Miliar. Jika target Recovery Rate tahunan adalah 25%, berapa rupiah lagi yang harus ditagih tim pada kuartal IV?",
      options: [
        "Rp 5,6 Miliar",
        "Rp 6,4 Miliar",
        "Rp 4,8 Miliar",
        "Rp 7,2 Miliar"
      ],
      answer: 0,
      explanation: "Target 25% x Rp 80 M = Rp 20 Miliar. Sudah tertagih Rp 14,4 Miliar. Kekurangan kuartal IV = 20 - 14,4 = Rp 5,6 Miliar."
    },
    {
      id: "bod4-c3",
      category: "Kapasitas Penjaminan",
      question: "Nilai proyek konstruksi adalah Rp 60 Miliar. Nilai Performance Bond yang diminta adalah 5% dari nilai proyek, sedangkan kapasitas retensi sendiri perusahaan untuk kategori kontraktor kelas B adalah Rp 1,8 Miliar. Berapa porsi jaminan yang harus ditempatkan ke reasuransi fakultatif?",
      options: [
        "Rp 1,2 Miliar (40%)",
        "Rp 1,5 Miliar (50%)",
        "Rp 0,9 Miliar (30%)",
        "Rp 1,8 Miliar (60%)"
      ],
      answer: 0,
      explanation: "Nilai Performance Bond = 5% x Rp 60 M = Rp 3,0 Miliar. Retensi sendiri = Rp 1,8 Miliar. Sisa ke reasuransi = 3,0 - 1,8 = Rp 1,2 Miliar (atau 1,2 / 3,0 = 40%)."
    },
    {
      id: "bod4-c4",
      category: "Logika Analitis",
      question: "Semua klaim KUR yang melebihi plafon Rp 100 Juta wajib diverifikasi oleh Supervisor Klaim. Sebagian klaim dari Bank Mitra A ditolak karena dokumen agunan tambahan tidak sesuai. Klaim X berasal dari Bank Mitra A dengan plafon Rp 150 Juta dan dokumen lengkap. Apa kesimpulan yang paling tepat?",
      options: [
        "Klaim X wajib diverifikasi oleh Supervisor Klaim.",
        "Klaim X pasti disetujui dan langsung dibayar hari itu juga.",
        "Klaim X pasti ditolak karena berasal dari Bank Mitra A.",
        "Supervisor Klaim hanya memverifikasi klaim dari Bank Mitra A."
      ],
      answer: 0,
      explanation: "Karena plafon Klaim X adalah Rp 150 Juta (> Rp 100 Juta), maka syarat pertama berlaku mutlak: Klaim X wajib diverifikasi oleh Supervisor Klaim. Soal tidak menyatakan bahwa dokumen lengkap otomatis disetujui tanpa verifikasi."
    },
    {
      id: "bod4-c5",
      category: "Analisis Data Klaim",
      question: "Dalam 4 bulan berturut-turut, jumlah berkas klaim masuk per analis adalah: Bulan 1 = 120 berkas (SLA tercapai 95%), Bulan 2 = 150 berkas (SLA 90%), Bulan 3 = 180 berkas (SLA 80%), Bulan 4 = 200 berkas (SLA 70%). Jika beban ideal 1 analis agar SLA minimal 90% adalah 150 berkas/bulan, berapa tambahan analis minimal yang dibutuhkan pada Bulan 4 agar SLA kembali >= 90% dengan asumsi 1 tim saat ini berisi 4 analis?",
      options: [
        "2 analis (total 6 analis)",
        "1 analis (total 5 analis)",
        "3 analis (total 7 analis)",
        "4 analis (total 8 analis)"
      ],
      answer: 0,
      explanation: "Total berkas Bulan 4 untuk 4 analis = 4 x 200 = 800 berkas. Agar rata-rata per analis <= 150 berkas, dibutuhkan minimal 800 / 150 = 5,33 -> dibulatkan ke atas menjadi 6 analis. Jadi perlu tambahan 6 - 4 = 2 analis."
    }
  ],
  personality: [
    { id: "p4-1", dim: "Risk Prudence", text: "Saya selalu memeriksa kelengkapan dokumen underwriting secara rinci meskipun rekan bisnis meminta percepatan.", reverse: false },
    { id: "p4-2", dim: "Decisiveness", text: "Ketika menghadapi situasi ambigu antara target premi dan risiko klaim, saya menunda keputusan sampai semua atasan memberi persetujuan.", reverse: true },
    { id: "p4-3", dim: "People Leadership", text: "Saya rutin memberikan umpan balik konstruktif dan pendampingan teknis kepada staf analis di unit saya.", reverse: false },
    { id: "p4-4", dim: "Integrity", text: "Saya bersedia menolak permintaan mitra strategis apabila secara data klaim tersebut tidak memenuhi syarat polis.", reverse: false },
    { id: "p4-5", dim: "Resilience", text: "Ketika terjadi lonjakan klaim di akhir bulan, saya tetap mampu menjaga ketenangan tim dan membagi beban kerja secara adil.", reverse: false },
    { id: "p4-6", dim: "Collaboration", text: "Saya proaktif berkoordinasi dengan tim Pemasaran untuk mencari solusi penjaminan yang aman tanpa langsung berkata 'tidak'.", reverse: false },
    { id: "p4-7", dim: "Risk Prudence", text: "Dalam mengejar target akhir tahun, pelonggaran kecil pada syarat administratif adalah hal yang wajar.", reverse: true },
    { id: "p4-8", dim: "Integrity", text: "Saya mendokumentasikan setiap alasan penolakan atau persetujuan klaim secara transparan untuk kepentingan audit.", reverse: false }
  ]
};
