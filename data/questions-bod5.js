window.DATA_BOD5 = {
  gradeId: "BOD-5",
  title: "BOD – 5 (Job Grade 8–11)",
  headcount: 253,
  roleLabel: "Officer / Analis Senior / Supervisor Muda",
  methods: [
    { id: "casestudy", name: "Case Study + Async Presentation (190 menit)", desc: "Menjawab pertanyaan studi kasus secara tertulis, lalu menyampaikan analisis & rekomendasi melalui presentasi rekaman mandiri." },
    { id: "cap", name: "CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan terstruktur berbasis pengalaman kerja (Pencapaian, Tantangan, Tindakan, Hasil) level operasional/officer." },
    { id: "psychometric", name: "Psychometric Test (120 menit)", desc: "Mengukur 3 aspek: Kemampuan Berpikir (kognitif), Karakteristik Kepribadian, dan Faktor Motivasi kerja." }
  ],
  casestudy: [
    {
      id: "bod5-cs1",
      unit: "Underwriting & Klaim",
      title: "Penanganan Backlog Verifikasi Klaim KUR & Kelengkapan Dokumen Suretyship",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Anda adalah Officer / Analis Klaim &amp; Penjaminan (BOD-5) di Kantor Cabang. Bulan ini cabang menghadapi kendala operasional:</p>
        <table class="data-table">
          <thead><tr><th>Jenis Produk</th><th>Berkas Masuk</th><th>Lengkap &amp; Valid</th><th>Tidak Lengkap</th><th>SLA Maksimal</th></tr></thead>
          <tbody>
            <tr><td>Klaim KUR Mikro</td><td>240 berkas</td><td>165 berkas</td><td>75 berkas (tanpa surat tagih/NPF)</td><td>10 hari kerja</td></tr>
            <tr><td>Suretyship (Bid Bond)</td><td>45 berkas</td><td>35 berkas</td><td>10 berkas (lap. keuangan belum update)</td><td>2 hari kerja</td></tr>
          </tbody>
        </table>
        <p>Terdapat 3 analis (termasuk Anda) dengan waktu verifikasi rata-rata 25 menit/berkas.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana Anda menentukan prioritas pemrosesan berkas dan membagi beban kerja 3 analis agar SLA Bid Bond (2 hari) & KUR (10 hari) terjaga?",
        "2. Apa tindakan Anda terhadap 75 berkas KUR dan 10 berkas Suretyship yang tidak lengkap agar tidak terjadi salah bayar maupun penumpukan antrean?"
      ],
      keywords: ["prioritas", "bid bond", "sla", "triase", "lengkap", "stop-clock", "pending", "bank mitra", "checklist", "kapasitas", "template", "verifikasi"],
      rubric: ["Ketajaman Analisis beban & SLA", "Relevansi Solusi triase & stop-clock", "Kualitas Rekomendasi checklist pra-kirim", "Penyampaian Terstruktur & Jelas"],
      benchmark: "Prioritaskan 35 Bid Bond lengkap (SLA 2 hari) terlebih dahulu, lalu 165 KUR lengkap. Terbitkan surat konfirmasi kekurangan dokumen (stop-clock SLA sesuai PKS) untuk berkas tidak lengkap. Bagi 1 analis untuk Suretyship dan 2 analis untuk KUR, serta buat checklist pra-kirim bagi Bank Mitra."
    },
    {
      id: "bod5-cs2",
      unit: "Bisnis & Pemasaran",
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
      rubric: ["Ketajaman Analisis Kebutuhan UMKM", "Relevansi Solusi Edukasi & Simulasi Premi", "Kualitas Rekomendasi Sinergi RM Bank", "Kejelasan Struktur Presentasi"],
      benchmark: "Mengedukasi debitur dengan simulasi premi harian yang ringan dibanding risiko kerugian aset, membekali RM Bank Mitra dengan brosur 1 halaman & kalkulator premi cepat, serta memprioritaskan klaster pasar berisiko tinggi dengan target bertahap dari 12% ke 30% dalam 6 bulan."
    },
    {
      id: "bod5-cs3",
      unit: "Underwriting & Klaim",
      title: "Rekonsiliasi Selisih Data Subrogasi & Pencegahan Klaim Ganda",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Saat rekonsiliasi bulanan dengan Bank Mitra Z, ditemukan 14 rekening debitur subrogasi yang sudah menyetor angsuran pemulihan di rekening bank sebesar Rp 185 Juta namun belum tercatat di sistem kita, serta 3 berkas klaim KUR yang diajukan dua kali dengan nomor registrasi berbeda.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana langkah verifikasi dan rekonsiliasi Anda atas selisih Rp 185 Juta dan 3 berkas klaim ganda tersebut?",
        "2. Kontrol operasional apa yang Anda usulkan agar kejadian serupa tidak terulang?"
      ],
      keywords: ["rekonsiliasi", "rekening koran", "nik", "duplikasi", "tolak", "berita acara", "sistem", "cut-off", "monitoring", "audit"],
      rubric: ["Ketelitian Rekonsiliasi Keuangan", "Kepekaan Deteksi Klaim Ganda", "Usulan Kontrol Preventif", "Kejelasan Penyampaian Presentasi"],
      benchmark: "Melakukan pencocokan mutasi rekening koran & bukti setor dengan Bank Mitra lalu menuangkannya dalam Berita Acara Rekonsiliasi; menolak 3 pengajuan klaim ganda berbasis cek NIK/nomor PK kredit; serta mengusulkan jadwal cut-off rekonsiliasi mingguan."
    }
  ],
  cap: [
    {
      id: "bod5-cap1",
      competency: "Execution Excellence & Quality Orientation",
      prompt: "Ceritakan pencapaian kerja terbaik Anda saat menangani volume pekerjaan tinggi (misalnya backlog verifikasi klaim/polis, penagihan subrogasi, atau target pemasaran) dengan tetap menjaga ketelitian dan kepatuhan SOP.",
      indicators: ["Situasi/beban kerja jelas", "Metode kerja sistematis", "Ketelitian & kepatuhan SOP terjaga", "Hasil terukur (SLA/akurasi)"]
    },
    {
      id: "bod5-cap2",
      competency: "Problem Solving & Collaboration",
      prompt: "Ceritakan pengalaman Anda menemukan kesalahan atau ketidaksesuaian data/dokumen dalam pekerjaan, lalu bagaimana Anda mengatasinya bersama tim atau mitra terkait.",
      indicators: ["Kepekaan mendeteksi anomali", "Langkah verifikasi & eskalasi tepat", "Komunikasi kooperatif", "Pencegahan agar tidak terulang"]
    },
    {
      id: "bod5-cap3",
      competency: "Service Orientation & Partner Coordination",
      prompt: "Ceritakan pengalaman Anda membantu nasabah, kontraktor, atau Bank Mitra menyelesaikan kendala layanan yang mendesak tanpa melanggar ketentuan perusahaan.",
      indicators: ["Responsif terhadap kebutuhan mitra", "Komunikasi jelas & solutif", "Tetap patuh aturan", "Kepuasan mitra terjaga"]
    },
    {
      id: "bod5-cap4",
      competency: "Adaptability & Continuous Learning",
      prompt: "Ceritakan pengalaman Anda saat harus mempelajari sistem, produk, atau aturan baru dalam waktu singkat agar pekerjaan Anda tetap berjalan optimal.",
      indicators: ["Sikap terbuka terhadap perubahan", "Usaha belajar mandiri/bertanya", "Penerapan cepat di pekerjaan", "Hasil kerja meningkat"]
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
      question: "Anda menemukan selisih Rp 250.000 pada berkas klaim yang sudah disetujui sistem. Rekan menyarankan mengabaikannya karena kecil. Sikap Anda?",
      options: [
        "Mencatat dan mengonfirmasi selisih tersebut sesuai prosedur agar data audit akurat.",
        "Mengikuti saran rekan agar pekerjaan cepat selesai.",
        "Mengubah angka manual supaya cocok.",
        "Membiarkan berkas tanpa melapor."
      ],
      answer: 0,
      explanation: "Integritas dan akurasi data adalah standar utama operasional asuransi."
    },
    {
      aspect: "Karakteristik Kepribadian (Kerja Sama)",
      id: "psy-9",
      question: "Rekan satu tim Anda sedang sakit sehingga 20 berkas klaimnya terancam melewati SLA hari ini. Apa yang Anda lakukan?",
      options: [
        "Berkoordinasi dengan atasan untuk membagi prioritas berkas tersebut bersama tim agar SLA unit terjaga.",
        "Fokus pada berkas sendiri saja karena itu bukan tanggung jawab Anda.",
        "Menunda semua berkas rekan tersebut hingga dia masuk kembali.",
        "Meminta Bank Mitra membatalkan pengajuan sementara."
      ],
      answer: 0,
      explanation: "Kolaborasi dan kepedulian terhadap SLA tim mencerminkan kerja sama yang solid."
    },
    {
      aspect: "Faktor Motivasi (Orientasi Prestasi & Adaptasi)",
      id: "psy-10",
      question: "Ketika sistem verifikasi baru diterapkan di kantor dan awalnya terasa lebih lambat bagi Anda, apa yang paling mendorong tindakan Anda?",
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
