window.DATA_BOD5 = {
  gradeId: "BOD-5",
  title: "BOD – 5 (Job Grade 8–11)",
  headcount: 253,
  roleLabel: "Officer / Analis Senior / Supervisor Muda",
  successProfile: [
    "Digital Savvy",
    "Customer Orientation",
    "Collaboration & Building Partnerships",
    "Applied Analysis & Problem Solving",
    "Managing Work",
    "Adaptability & Continuous Learning",
    "Work Standards",
    "Integrity & AKHLAK BUMN"
  ],
  methods: [
    { id: "psychometric", name: "Pre-Assessment 1: Psychometric Test (120 menit)", desc: "Mengukur 3 aspek: Kemampuan Berpikir (kognitif), Karakteristik Kepribadian, dan Faktor Motivasi kerja." },
    { id: "cap", name: "Pre-Assessment 2: CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan pengalaman kerja spesifik (situasi, peran, tindakan, hasil) level operasional/officer." },
    { id: "casestudy", name: "Main Assessment: Case Study + Async Presentation (190 menit)", desc: "Menjawab studi kasus tertulis lalu menyampaikan analisis & rekomendasi lewat rekaman video mandiri." }
  ],
  casestudy: [
    {
      id: "bod5-uw1",
      units: ["Underwriting", "Technical Head", "Manajemen Risiko"],
      unit: "Underwriting",
      title: "Verifikasi Kelayakan Polis Suretyship (Bid Bond & Performance Bond) Menjelang Batas SLA",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Anda adalah Officer Underwriting (BOD-5). Hari ini masuk 45 berkas permohonan <em>Suretyship (Bid Bond)</em> dengan SLA maksimal 2 hari kerja: 35 berkas lengkap &amp; valid, sedangkan 10 berkas laporan keuangannya belum <em>update</em> dan 2 di antaranya memiliki catatan tunggakan subrogasi lama.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana Anda memprioritaskan 45 berkas tersebut dan menangani 10 berkas yang tidak lengkap / punya catatan tunggakan?",
        "2. Checklist kontrol apa yang Anda usulkan kepada tim pemasaran agar berkas masuk selalu lengkap?"
      ],
      keywords: ["prioritas", "bid bond", "sla", "lengkap", "pending", "laporan keuangan", "subrogasi", "checklist", "underwriting"],
      rubric: ["Ketajaman Analisis Risiko Underwriting", "Relevansi Solusi Triase", "Kualitas Rekomendasi Checklist", "Struktur Presentasi Asinkron"],
      benchmark: "Segera proses 35 berkas lengkap agar SLA 2 hari terpenuhi; tahan 10 berkas tidak lengkap dengan notifikasi kekurangan dokumen dan blokir 2 berkas yang masih punya tunggakan subrogasi; serta terapkan checklist pra-kirim."
    },
    {
      id: "bod5-kl1",
      units: ["Klaim", "Technical Head"],
      unit: "Klaim",
      title: "Penanganan Backlog 240 Berkas Klaim KUR Mikro & Dokumen Tidak Lengkap",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Di unit Klaim Cabang terdapat 240 berkas klaim KUR Mikro masuk bulan ini (SLA 10 hari kerja): 165 berkas lengkap, dan 75 berkas tanpa surat tagih/NPF dari bank. Ada 3 analis dengan waktu verifikasi rata-rata 25 menit/berkas.</p>
      `,
      writtenQuestions: [
        "1. Hitung kebutuhan waktu verifikasi 165 berkas lengkap oleh 3 analis dan atur pembagian kerjanya.",
        "2. Bagaimana penanganan 75 berkas tidak lengkap sesuai mekanisme stop-clock SLA pada PKS?"
      ],
      keywords: ["prioritas", "sla", "triase", "lengkap", "stop-clock", "pending", "bank mitra", "kapasitas", "verifikasi"],
      rubric: ["Perhitungan Beban Kerja & SLA", "Kepatuhan Prosedur Klaim & PKS", "Koordinasi Bank Mitra", "Struktur Presentasi Asinkron"],
      benchmark: "165 berkas x 25 menit = 4.125 menit (68,75 jam total atau ~23 jam/analis, selesai dalam ~3–4 hari kerja). Prioritaskan 165 berkas lengkap, dan terbitkan konfirmasi kekurangan dokumen (stop-clock SLA) untuk 75 berkas."
    },
    {
      id: "bod5-sub1",
      units: ["Subrogasi"],
      unit: "Subrogasi",
      title: "Rekonsiliasi Selisih Data Setoran Subrogasi Rp 185 Juta & Prioritas Penagihan",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Saat rekonsiliasi bulanan dengan Bank Mitra Z, ditemukan 14 rekening debitur subrogasi yang sudah menyetor angsuran pemulihan di bank sebesar Rp 185 Juta namun belum tercatat di sistem kita, serta 40 debitur subrogasi menunggak di atas 12 bulan dengan total nilai Rp 1,4 Miliar.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana langkah verifikasi dan rekonsiliasi Anda atas selisih Rp 185 Juta tersebut?",
        "2. Bagaimana Anda menyusun prioritas penagihan 40 debitur menunggak tersebut?"
      ],
      keywords: ["rekonsiliasi", "rekening koran", "berita acara", "pareto", "prioritas", "subrogasi", "cut-off", "monitoring"],
      rubric: ["Ketelitian Rekonsiliasi Subrogasi", "Strategi Prioritas Penagihan", "Kontrol Preventif", "Kejelasan Presentasi"],
      benchmark: "Cocokkan mutasi rekening koran & bukti setor dengan Bank Mitra lalu buat Berita Acara Rekonsiliasi dan jadwal cut-off mingguan; urutkan 40 debitur berdasarkan nilai terbesar (Pareto) untuk kunjungan & penagihan intensif."
    },
    {
      id: "bod5-keu1",
      units: ["Keuangan"],
      unit: "Keuangan",
      title: "Penyelesaian Selisih Kas/Bank, Verifikasi Pembayaran Klaim, & Aging Piutang Premi",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Sebagai Officer Keuangan Cabang, Anda menemukan: (1) Terdapat 12 bukti pembayaran premi dari agen senilai Rp 240 Juta yang belum teridentifikasi nomor polisnya di rekening koran, (2) 5 berkas pembayaran klaim KUR senilai Rp 480 Juta mendesak ditransfer hari ini, namun 1 berkas nomor rekening bank mitranya berbeda dari data PKS.</p>
      `,
      writtenQuestions: [
        "1. Apa keputusan Anda terhadap 5 berkas transfer klaim (khususnya 1 berkas yang nomor rekeningnya berbeda)?",
        "2. Bagaimana langkah Anda mengidentifikasi Rp 240 Juta dana mengendap (unidentified receipt) agar pencatatan piutang premi akurat?"
      ],
      keywords: ["rekonsiliasi", "rekening koran", "unidentified", "tunda", "konfirmasi", "pks", "voucher", "piutang premi", "audit", "kontrol"],
      rubric: ["Ketelitian & Kontrol Pembayaran Keuangan", "Kepatuhan Verifikasi Rekening PKS", "Penyelesaian Unidentified Receipt", "Kejelasan Penyampaian Presentasi"],
      benchmark: "Proses transfer 4 berkas klaim yang rekeningnya cocok sesuai PKS, dan tunda 1 berkas yang berbeda rekeningnya untuk konfirmasi tertulis resmi dari Bank Mitra. Untuk Rp 240 Juta unidentified receipt, lakukan konfirmasi bukti transfer ke agen/pemasaran dan terapkan kewajiban mencantumkan nomor nota debit/polis pada berita transfer."
    },
    {
      id: "bod5-bm1",
      units: ["Branch Manager", "Bisnis & Pemasaran"],
      unit: "Bisnis & Pemasaran / Branch Manager",
      title: "Peningkatan Konversi Polis Asuransi Umum bagi Debitur KUR Naik Kelas",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Dari 1.200 debitur KUR Kecil yang naik kelas di cabang Anda, baru <strong>12%</strong> yang memiliki Asuransi Kebakaran / Harta Benda untuk ruko dan stok barang. Padahal dalam setahun terjadi 9 kasus kebakaran pasar yang menyebabkan debitur gagal bayar.</p>
      `,
      writtenQuestions: [
        "1. Jelaskan akar masalah rendahnya penetrasi Asuransi Umum pada debitur naik kelas tersebut.",
        "2. Rancang langkah konkret bersama RM Bank Mitra dan target konversi realistis untuk 6 bulan ke depan."
      ],
      keywords: ["edukasi", "bundling", "rm", "bank", "premi", "risiko", "umkm", "kebakaran", "simulasi", "target", "monitoring"],
      rubric: ["Ketajaman Analisis Kebutuhan UMKM", "Relevansi Solusi Edukasi & Simulasi Premi", "Sinergi RM Bank Mitra", "Kejelasan Struktur Presentasi"],
      benchmark: "Mengedukasi debitur dengan simulasi premi harian yang ringan dibanding risiko kerugian aset, membekali RM Bank Mitra dengan brosur 1 halaman & kalkulator premi cepat, serta memprioritaskan klaster pasar berisiko tinggi dengan target bertahap dari 12% ke 30% dalam 6 bulan."
    }
  ],
  cap: [
    {
      id: "bod5-cap1",
      competency: "Work Standards & Managing Work",
      prompt: "Ceritakan pencapaian kerja terbaik Anda saat menangani volume pekerjaan tinggi dengan tetap menjaga ketelitian, akurasi data, dan kepatuhan SOP.",
      indicators: ["Managing Work (pengaturan prioritas & waktu)", "Work Standards (ketelitian & kepatuhan SOP)", "Metode kerja sistematis", "Hasil terukur (SLA/akurasi)"]
    },
    {
      id: "bod5-cap2",
      competency: "Applied Analysis & Problem Solving",
      prompt: "Ceritakan pengalaman Anda menemukan kesalahan atau ketidaksesuaian data/dokumen/angka dalam pekerjaan, lalu bagaimana Anda menganalisis dan menyelesaikannya hingga tuntas.",
      indicators: ["Kepekaan mendeteksi anomali", "Analisis penyebab secara runtut", "Langkah perbaikan & eskalasi tepat", "Pencegahan agar tidak terulang"]
    },
    {
      id: "bod5-cap3",
      competency: "Customer Orientation & Collaboration",
      prompt: "Ceritakan pengalaman Anda membantu nasabah, mitra, atau rekan lintas unit menyelesaikan kendala layanan yang mendesak secara kolaboratif tanpa melanggar ketentuan.",
      indicators: ["Customer Orientation (responsif & empatik)", "Collaboration (koordinasi aktif dengan tim/mitra)", "Tetap patuh aturan", "Kepuasan mitra terjaga"]
    },
    {
      id: "bod5-cap4",
      competency: "Digital Savvy & Adaptability",
      prompt: "Ceritakan pengalaman Anda saat harus mempelajari aplikasi digital, sistem kerja, atau aturan baru dalam waktu singkat agar produktivitas Anda tetap optimal.",
      indicators: ["Digital Savvy (adaptif dengan perangkat digital)", "Adaptability & Continuous Learning", "Penerapan cepat di pekerjaan harian", "Hasil kerja meningkat"]
    },
    {
      id: "bod5-cap5",
      competency: "Integrity & AKHLAK BUMN",
      prompt: "Ceritakan situasi di mana Anda menghadapi tekanan untuk mengambil jalan pintas atau melonggarkan prosedur, dan bagaimana Anda mempertahankan integritas serta nilai AKHLAK.",
      indicators: ["Teguh pada nilai Amanah & Integritas", "Komunikasi sopan namun tegas", "Mencari solusi legal/sesuai SOP", "Kepercayaan atasan/mitra terjaga"]
    }
  ],
  psychometric: [
    {
      aspect: "Kemampuan Berpikir (Numerik)",
      id: "psy-1",
      question: "Sebuah proyek Rp 8 Miliar membutuhkan Bid Bond 2% dari nilai proyek. Jika tarif IJP 0,25% dari nilai jaminan dan biaya admin Rp 50.000, berapa total biaya yang dibayar kontraktor?",
      options: ["Rp 450.000", "Rp 400.000", "Rp 250.000", "Rp 500.000"],
      answer: 0,
      explanation: "Bid Bond = 2% x Rp 8 M = Rp 160 Juta. IJP = 0,25% x Rp 160 Juta = Rp 400.000. Total = Rp 450.000."
    },
    {
      aspect: "Kemampuan Berpikir (Numerik Klaim)",
      id: "psy-2",
      question: "Plafon KUR Rp 50.000.000 dengan porsi penjaminan 70%. Saat macet, sisa pokok Rp 30.000.000 dan bunga dijamin Rp 1.500.000. Berapa klaim maksimal yang dibayar?",
      options: ["Rp 22.050.000", "Rp 31.500.000", "Rp 21.000.000", "Rp 35.000.000"],
      answer: 0,
      explanation: "Total kewajiban = 30.000.000 + 1.500.000 = Rp 31.500.000. Porsi 70% = Rp 22.050.000."
    },
    {
      aspect: "Kemampuan Berpikir (Ketelitian Data)",
      id: "psy-3",
      question: "Manakah data yang 100% IDENTIK dengan referensi: `POL-KUR-2026-08914 | PT Karya Mandiri | Rp 450.000.000`?",
      options: [
        "POL-KUR-2026-08914 | PT Karya Mandiri | Rp 450.000.000",
        "POL-KUR-2026-08941 | PT Karya Mandiri | Rp 450.000.000",
        "POL-KUR-2026-08914 | PT Karya Mandri | Rp 450.000.000",
        "POL-KUR-2026-08914 | PT Karya Mandiri | Rp 45.000.000"
      ],
      answer: 0,
      explanation: "Hanya opsi pertama yang identik di nomor polis, nama, dan nominal."
    },
    {
      aspect: "Kemampuan Berpikir (Ketelitian Rekening)",
      id: "psy-4",
      question: "Manakah nomor rekening yang SAMA PERSIS dengan referensi: `BNI 0845-9910-2231 a.n. Asuransi Kredit`?",
      options: [
        "BNI 0845-9910-2231 a.n. Asuransi Kredit",
        "BNI 0845-9910-2321 a.n. Asuransi Kredit",
        "BNI 0845-9901-2231 a.n. Asuransi Kredit",
        "BRI 0845-9910-2231 a.n. Asuransi Kredit"
      ],
      answer: 0,
      explanation: "Perhatikan urutan angka 9910-2231 dan nama bank BNI."
    },
    {
      aspect: "Kemampuan Berpikir (Logika Pola)",
      id: "psy-5",
      question: "Deret angka: 4, 9, 19, 39, 79, ... Angka selanjutnya adalah?",
      options: ["159", "149", "169", "139"],
      answer: 0,
      explanation: "Pola: (angka x 2) + 1 -> (79 x 2) + 1 = 159."
    },
    {
      aspect: "Kemampuan Berpikir (Logika Deduktif)",
      id: "psy-6",
      question: "Semua polis Asuransi Kebakaran > Rp 2 M wajib survei fisik. Polis Ruko A bernilai Rp 1,8 M dan Polis Gudang B bernilai Rp 2,5 M. Kesimpulan yang pasti benar:",
      options: [
        "Polis Gudang B wajib survei fisik berdasarkan aturan batas > Rp 2 M.",
        "Baik Ruko A maupun Gudang B wajib survei fisik.",
        "Polis Ruko A dilarang terbit tanpa survei fisik.",
        "Hanya polis di bawah Rp 2 M yang wajib survei fisik."
      ],
      answer: 0,
      explanation: "Gudang B (Rp 2,5 M > Rp 2 M) memenuhi syarat wajib survei fisik."
    },
    {
      aspect: "Kemampuan Berpikir (Manajemen Waktu)",
      id: "psy-7",
      question: "Waktu kerja efektif 420 menit. Anda memverifikasi 12 berkas (@20 menit) dan membuat 1 laporan (90 menit). Berapa menit tersisa untuk follow-up subrogasi?",
      options: ["90 menit", "60 menit", "120 menit", "75 menit"],
      answer: 0,
      explanation: "Terpakai = (12 x 20) + 90 = 330 menit. Sisa = 420 - 330 = 90 menit."
    },
    {
      aspect: "Karakteristik Kepribadian (Integritas)",
      id: "psy-8",
      question: "Anda menemukan selisih Rp 250.000 pada berkas yang sudah disetujui sistem. Rekan menyarankan mengabaikannya karena kecil. Sikap Anda?",
      options: [
        "Mencatat dan mengonfirmasi selisih tersebut sesuai prosedur agar data audit akurat.",
        "Mengikuti saran rekan agar pekerjaan cepat selesai.",
        "Mengubah angka manual supaya cocok.",
        "Membiarkan berkas tanpa melapor."
      ],
      answer: 0,
      explanation: "Integritas dan akurasi data adalah standar utama operasional."
    },
    {
      aspect: "Karakteristik Kepribadian (Kerja Sama)",
      id: "psy-9",
      question: "Rekan satu tim Anda sedang sakit sehingga 20 berkasnya terancam melewati SLA hari ini. Apa yang Anda lakukan?",
      options: [
        "Berkoordinasi dengan atasan untuk membagi prioritas berkas tersebut bersama tim agar SLA unit terjaga.",
        "Fokus pada berkas sendiri saja karena itu bukan tanggung jawab Anda.",
        "Menunda semua berkas rekan tersebut hingga dia masuk kembali.",
        "Meminta mitra membatalkan pengajuan sementara."
      ],
      answer: 0,
      explanation: "Kolaborasi dan kepedulian terhadap SLA tim mencerminkan kerja sama yang solid."
    },
    {
      aspect: "Faktor Motivasi (Orientasi Prestasi & Adaptasi)",
      id: "psy-10",
      question: "Ketika sistem kerja baru diterapkan di kantor dan awalnya terasa lebih lambat bagi Anda, apa yang paling mendorong tindakan Anda?",
      options: [
        "Mempelajari alur sistem baru dan mencari cara agar target akurasi serta SLA tetap tercapai.",
        "Kembali memakai cara manual secara diam-diam agar target harian aman.",
        "Menunggu sampai rekan lain menguasainya terlebih dahulu.",
        "Mengeluhkan sistem baru karena menghambat rutinitas."
      ],
      answer: 0,
      explanation: "Motivasi berprestasi dan adaptabilitas tinggi ditunjukkan dengan kemauan menguasai sistem baru."
    }
  ]
};
