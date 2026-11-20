window.DATA_BOD5 = {
  gradeId: "BOD-5",
  title: "BOD – 5 (Job Grade 8–11)",
  headcount: 253,
  roleLabel: "Officer / Analis Senior / Supervisor Muda",
  successProfile: [
    "Digital Awareness",
    "Business Acumen",
    "Customer Orientation",
    "Fostering Collaboration",
    "Analysis & Judgment",
    "Managing Work",
    "Continuous Improvement",
    "Adaptability",
    "Valuing Differences",
    "Quality Orientation"
  ],
  methods: [
    { id: "psychometric", name: "Pre-Assessment 1: Psychometric Test (120 menit)", desc: "Mengukur 3 aspek: Kemampuan Berpikir (kognitif), Karakteristik Kepribadian, dan Faktor Motivasi sesuai 10 Kompetensi IFG BOD-5." },
    { id: "cap", name: "Pre-Assessment 2: CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan pengalaman kerja spesifik (situasi, peran, tindakan, hasil) merujuk pada 10 Kompetensi IFG BOD-5." },
    { id: "casestudy", name: "Main Assessment: Case Study + Async Presentation (190 menit)", desc: "Menjawab studi kasus jabatan di perusahaan fiktif secara tertulis lalu menyampaikan analisis & rekomendasi lewat rekaman video mandiri." }
  ],
  casestudy: [
    {
      id: "bod5-gen1",
      units: ["Umum (Generik PortrAI)", "Semua"],
      unit: "Umum (Generik PortrAI)",
      title: "Officer Operasional Layanan — PT Nusantara Logistik Digital: Backlog Pesanan, Error Input Manual, & Komplain Mitra",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Peran &amp; Latar Belakang Kasus (Perusahaan Fiktif)</h4>
        <p>Anda menjabat sebagai <strong>Operations &amp; Service Officer (BOD-5)</strong> di <strong>PT Nusantara Logistik Digital</strong>. Minggu ini perusahaan baru saja memigrasikan sistem pencatatan pesanan ke aplikasi web baru, namun terjadi lonjakan 240 pesanan korporat (SLA 2 hari kerja): <strong>165 pesanan datanya lengkap</strong>, sedangkan <strong>75 pesanan tidak lengkap/duplikat</strong> akibat mitra masih mengirim format Excel lama.</p>
        <p>Di tim Anda terdapat 3 staf dengan latar belakang berbeda (1 staf senior yang terbiasa cara manual dan skeptis terhadap aplikasi baru, 1 staf junior yang sangat mahir digital namun kurang teliti, serta 1 staf lapangan). Tingkat kesalahan input (<em>error rate</em>) naik menjadi 9% (standar kualitas &lt; 1%) dan biaya lembur melonjak 28%, sementara 2 klien utama sudah mengirim komplain keterlambatan.</p>
      `,
      writtenQuestions: [
        "1. (Analysis & Judgment + Managing Work + Business Acumen) Bagaimana Anda menganalisis akar masalah, membagi prioritas 165 pesanan lengkap vs 75 pesanan tidak lengkap, serta menekan biaya lembur 28%?",
        "2. (Customer Orientation + Quality Orientation) Langkah konkret apa yang Anda ambil untuk menangani komplain 2 klien utama dan menurunkan error rate dari 9% ke < 1%?",
        "3. (Digital Awareness + Continuous Improvement + Fostering Collaboration + Valuing Differences + Adaptability) Bagaimana Anda menyatukan gaya kerja 3 staf yang berbeda agar adaptif terhadap aplikasi baru dan mencegah masalah berulang?"
      ],
      keywords: ["prioritas", "sla", "triase", "klien", "komplain", "error", "standar", "kualitas", "checklist", "digital", "otomatisasi", "efisiensi", "lembur", "kolaborasi", "senior", "junior", "adaptasi", "perbaikan"],
      rubric: [
        "Analysis & Judgment + Managing Work (Triase & Prioritas SLA)",
        "Business Acumen & Quality Orientation (Efisiensi Biaya & Error < 1%)",
        "Customer Orientation (Penanganan Komplain & Nilai Tambah Klien)",
        "Digital Awareness & Continuous Improvement (Optimalisasi Sistem Baru)",
        "Fostering Collaboration, Valuing Differences & Adaptability (Sinergi Tim Beragam)"
      ],
      benchmark: "Prioritaskan 165 pesanan lengkap agar SLA 2 hari terjaga, sambil mengirim notifikasi standar format ke mitra untuk 75 pesanan tidak lengkap (Managing Work & Customer Orientation). Pasangkan staf senior yang teliti dengan staf junior yang mahir digital untuk saling mendampingi (Valuing Differences & Fostering Collaboration), terapkan template validasi otomatis + double-check (Digital Awareness, Continuous Improvement & Quality Orientation) untuk menekan error < 1% dan memangkas lembur 28% (Business Acumen)."
    },
    {
      id: "bod5-gen2",
      units: ["Umum (Generik PortrAI)", "Semua"],
      unit: "Umum (Generik PortrAI)",
      title: "Senior Business Analyst — PT Terra Retail Indonesia: Penurunan Efisiensi Cabang & Perubahan Kebijakan Mendadak",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Peran &amp; Latar Belakang Kasus (Perusahaan Fiktif)</h4>
        <p>Anda menjabat sebagai <strong>Senior Analyst (BOD-5)</strong> di <strong>PT Terra Retail Indonesia</strong>. Manajemen tiba-tiba mempercepat peluncuran program layanan <em>Same-Day Delivery</em> dari bulan depan menjadi minggu depan karena pergerakan kompetitor. Dari data 6 gerai, ditemukan: biaya operasional naik 15% akibat stok tidak akurat (selisih pencatatan 6%), tingkat kepuasan pelanggan turun dari 92% ke 81%, dan tim gudang merasa tidak dilibatkan oleh tim pemasaran.</p>
      `,
      writtenQuestions: [
        "1. (Analysis & Judgment + Business Acumen) Berdasarkan data di atas, apa akar masalah utama dan bagaimana prioritas efisiensi biaya 15% sebelum peluncuran minggu depan?",
        "2. (Adaptability + Managing Work + Quality Orientation) Bagaimana rencana kerja 7 hari Anda menghadapi percepatan jadwal mendadak tanpa mengorbankan akurasi stok?",
        "3. (Fostering Collaboration + Valuing Differences + Customer Orientation + Digital Awareness + Continuous Improvement) Bagaimana Anda menjembatani tim gudang dan tim pemasaran serta memanfaatkan alat digital untuk menaikkan kepuasan pelanggan kembali ke > 90%?"
      ],
      keywords: ["akar masalah", "efisiensi", "biaya", "stok", "akurasi", "adaptasi", "timeline", "kolaborasi", "gudang", "pemasaran", "pelanggan", "kepuasan", "digital", "dashboard", "perbaikan", "standar"],
      rubric: [
        "Analysis & Judgment & Business Acumen (Analisis Data & Efisiensi 15%)",
        "Adaptability & Managing Work (Rencana Kerja Cepat 7 Hari)",
        "Quality Orientation (Akurasi Stok & Standar Layanan)",
        "Fostering Collaboration & Valuing Differences (Sinergi Gudang–Pemasaran)",
        "Customer Orientation, Digital Awareness & Continuous Improvement"
      ],
      benchmark: "Lakukan audit cepat stok berbasis dashboard real-time di 6 gerai (Digital Awareness & Quality Orientation) untuk memangkas selisih 6% dan kebocoran biaya 15% (Business Acumen). Gelar sinkronisasi lintas fungsi gudang & pemasaran dengan menghargai masukan operasional lapangan (Fostering Collaboration & Valuing Differences), susun checklist peluncuran 7 hari yang realistis (Adaptability & Managing Work), serta aktifkan notifikasi status pesanan transparan untuk memulihkan kepuasan pelanggan > 90% (Customer Orientation & Continuous Improvement)."
    },
    {
      id: "bod5-uw1",
      units: ["Underwriting", "Technical Head", "Manajemen Risiko"],
      unit: "Underwriting",
      title: "Verifikasi Kelayakan Dokumen Menjelang Batas SLA & Kontrol Kualitas Data",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Anda adalah Officer Underwriting (BOD-5). Hari ini masuk 45 berkas permohonan penjaminan dengan SLA maksimal 2 hari kerja: 35 berkas lengkap &amp; valid, sedangkan 10 berkas laporan keuangannya belum <em>update</em> dan 2 di antaranya memiliki catatan tunggakan lama.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana Anda memprioritaskan 45 berkas tersebut dan menangani 10 berkas yang tidak lengkap / punya catatan tunggakan?",
        "2. Perbaikan proses digital dan checklist kontrol kualitas apa yang Anda usulkan bersama tim pemasaran agar berkas masuk selalu lengkap?"
      ],
      keywords: ["prioritas", "sla", "lengkap", "pending", "laporan keuangan", "tunggakan", "checklist", "digital", "kolaborasi", "kualitas"],
      rubric: ["Analysis & Judgment", "Managing Work & Quality Orientation", "Digital Awareness & Continuous Improvement", "Fostering Collaboration & Customer Orientation"],
      benchmark: "Segera proses 35 berkas lengkap agar SLA 2 hari terpenuhi; tahan 10 berkas tidak lengkap dengan notifikasi kekurangan dokumen dan blokir 2 berkas yang masih punya tunggakan; serta terapkan checklist digital pra-kirim bersama tim pemasaran."
    },
    {
      id: "bod5-kl1",
      units: ["Klaim", "Technical Head"],
      unit: "Klaim",
      title: "Penanganan Backlog 240 Berkas Klaim & Koordinasi Dokumen Tidak Lengkap",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Di unit Klaim Cabang terdapat 240 berkas masuk bulan ini (SLA 10 hari kerja): 165 berkas lengkap, dan 75 berkas kurang dokumen pendukung. Ada 3 analis dengan waktu verifikasi rata-rata 25 menit/berkas.</p>
      `,
      writtenQuestions: [
        "1. Hitung kebutuhan waktu verifikasi 165 berkas lengkap oleh 3 analis dan atur pembagian kerjanya.",
        "2. Bagaimana penanganan 75 berkas tidak lengkap secara transparan bersama mitra sesuai SLA?"
      ],
      keywords: ["prioritas", "sla", "triase", "lengkap", "stop-clock", "pending", "mitra", "kapasitas", "verifikasi", "kualitas"],
      rubric: ["Analysis & Judgment & Managing Work", "Quality Orientation", "Customer Orientation & Fostering Collaboration", "Continuous Improvement"],
      benchmark: "165 berkas x 25 menit = 4.125 menit (68,75 jam total atau ~23 jam/analis, selesai dalam ~3–4 hari kerja). Prioritaskan 165 berkas lengkap, dan terbitkan konfirmasi kekurangan dokumen (stop-clock SLA) untuk 75 berkas disertai panduan kelengkapan digital."
    },
    {
      id: "bod5-sub1",
      units: ["Subrogasi", "Keuangan"],
      unit: "Subrogasi / Keuangan",
      title: "Rekonsiliasi Selisih Data Setoran Rp 185 Juta & Prioritas Penagihan",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Saat rekonsiliasi bulanan dengan Mitra Z, ditemukan 14 rekening yang sudah menyetor sebesar Rp 185 Juta namun belum tercatat di sistem kita, serta 40 akun menunggak di atas 12 bulan dengan total nilai Rp 1,4 Miliar.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana langkah verifikasi dan rekonsiliasi Anda atas selisih Rp 185 Juta tersebut?",
        "2. Bagaimana Anda menyusun prioritas penagihan 40 akun menunggak serta perbaikan sistem pencatatannya?"
      ],
      keywords: ["rekonsiliasi", "rekening koran", "berita acara", "pareto", "prioritas", "cut-off", "monitoring", "digital", "efisiensi", "kualitas"],
      rubric: ["Quality Orientation & Analysis & Judgment", "Business Acumen & Managing Work", "Digital Awareness & Continuous Improvement", "Fostering Collaboration"],
      benchmark: "Cocokkan mutasi rekening koran & bukti setor lalu buat Berita Acara Rekonsiliasi dan jadwal cut-off mingguan otomatis; urutkan 40 akun berdasarkan nilai terbesar (Pareto) untuk penagihan intensif guna memaksimalkan pemulihan kas."
    },
    {
      id: "bod5-bm1",
      units: ["Branch Manager", "Bisnis & Pemasaran"],
      unit: "Bisnis & Pemasaran / Branch Manager",
      title: "Peningkatan Konversi Layanan & Optimalisasi Kemitraan",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Dari 1.200 klien potensial di wilayah Anda, baru <strong>12%</strong> yang memanfaatkan layanan perlindungan lanjutan. Padahal dalam setahun terakhir banyak klien mengalami gangguan operasional yang berdampak pada kelancaran usaha mereka.</p>
      `,
      writtenQuestions: [
        "1. Jelaskan akar masalah rendahnya konversi tersebut berdasarkan kebutuhan klien.",
        "2. Rancang langkah konkret berbasis digital bersama tim mitra dengan target realistis 6 bulan ke depan."
      ],
      keywords: ["edukasi", "bundling", "mitra", "risiko", "simulasi", "target", "monitoring", "digital", "kolaborasi", "pelanggan"],
      rubric: ["Business Acumen & Analysis & Judgment", "Customer Orientation", "Digital Awareness & Continuous Improvement", "Fostering Collaboration & Managing Work"],
      benchmark: "Edukasi klien dengan simulasi manfaat yang mudah dipahami, bekali tim mitra dengan kalkulator digital 1 halaman, serta prioritaskan klaster berisiko tinggi dengan target bertahap dari 12% ke 30% dalam 6 bulan."
    }
  ],
  cap: [
    {
      id: "bod5-cap1",
      competency: "Digital Awareness & Continuous Improvement",
      prompt: "Ceritakan pengalaman nyata Anda ketika memanfaatkan teknologi digital, aplikasi, atau perangkat baru untuk memperbaiki proses kerja yang sebelumnya lambat/manual hingga efektivitas tim meningkat.",
      indicators: [
        "Digital Awareness (memahami & menerapkan teknologi digital dalam pekerjaan)",
        "Continuous Improvement (mengidentifikasi peluang perbaikan & menerapkan solusi)",
        "Tindakan pribadi jelas ('Saya...')",
        "Hasil efisiensi waktu/biaya terukur"
      ]
    },
    {
      id: "bod5-cap2",
      competency: "Business Acumen & Analysis & Judgment",
      prompt: "Ceritakan pengalaman Anda mengumpulkan dan menganalisis data/informasi untuk memecahkan masalah operasional serta mengoptimalkan penggunaan sumber daya atau meningkatkan efisiensi/keuntungan unit kerja.",
      indicators: [
        "Analysis & Judgment (mengumpulkan data, menganalisis akar masalah & memilih alternatif tepat)",
        "Business Acumen (mengoptimalkan sumber daya, efisiensi & nilai bisnis)",
        "Dasar pertimbangan logis & kuantitatif",
        "Dampak bisnis/efisiensi terukur"
      ]
    },
    {
      id: "bod5-cap3",
      competency: "Customer Orientation & Quality Orientation",
      prompt: "Ceritakan pengalaman Anda menangani kebutuhan atau keluhan pelanggan/mitra yang menuntut layanan cepat, namun Anda tetap memastikan ketelitian, ketepatan, dan kesesuaian standar kualitas pekerjaan.",
      indicators: [
        "Customer Orientation (memahami kebutuhan pelanggan & memberi solusi bernilai tambah)",
        "Quality Orientation (memastikan ketelitian, ketepatan & kepatuhan standar kualitas)",
        "Langkah pengecekan kualitas yang sistematis",
        "Kepuasan pelanggan & zero-error terukur"
      ]
    },
    {
      id: "bod5-cap4",
      competency: "Managing Work & Adaptability",
      prompt: "Ceritakan situasi ketika terjadi perubahan mendadak pada target, aturan, atau situasi pekerjaan Anda, dan bagaimana Anda menyesuaikan diri serta mengatur ulang prioritas, waktu, dan sumber daya agar target tetap tercapai.",
      indicators: [
        "Managing Work (mengatur prioritas, waktu & sumber daya efektif)",
        "Adaptability (menyesuaikan diri secara efektif terhadap perubahan situasi/tuntutan)",
        "Tetap tenang & produktif di bawah tekanan perubahan",
        "Target selesai tepat waktu (SLA tercapai)"
      ]
    },
    {
      id: "bod5-cap5",
      competency: "Fostering Collaboration & Valuing Differences",
      prompt: "Ceritakan pengalaman Anda bekerja sama dengan rekan atau pihak lintas unit yang memiliki latar belakang, sudut pandang, atau gaya kerja berbeda dari Anda untuk menyelesaikan suatu target bersama.",
      indicators: [
        "Fostering Collaboration (membangun kerja sama, melibatkan pihak lain & berkontribusi aktif)",
        "Valuing Differences (menghargai & memanfaatkan perbedaan latar belakang/perspektif individu)",
        "Komunikasi inklusif & menjembatani perbedaan",
        "Tujuan bersama berhasil tercapai"
      ]
    }
  ],
  psychometric: [
    {
      aspect: "Business Acumen & Numerik Efisiensi",
      id: "psy-1",
      question: "Sebuah unit menghabiskan biaya operasional Rp 80.000.000/bulan. Setelah menerapkan sistem otomatis, biaya turun 15% namun ada biaya langganan software Rp 2.500.000/bulan. Berapa penghematan bersih per bulan?",
      options: ["Rp 9.500.000", "Rp 12.000.000", "Rp 14.500.000", "Rp 8.000.000"],
      answer: 0,
      explanation: "Penurunan 15% × Rp 80 Juta = Rp 12.000.000. Dikurangi biaya software Rp 2.500.000 = penghematan bersih Rp 9.500.000/bulan."
    },
    {
      aspect: "Analysis & Judgment (Numerik Kapasitas)",
      id: "psy-2",
      question: "Sebuah tim berisi 3 analis memproses 180 dokumen dengan rata-rata 20 menit/dokumen. Jika waktu kerja efektif 6 jam/hari per analis, berapa hari kerja yang dibutuhkan untuk menyelesaikan seluruh dokumen?",
      options: ["3,33 hari (4 hari kerja)", "2 hari kerja", "5 hari kerja", "6 hari kerja"],
      answer: 0,
      explanation: "Total waktu = 180 × 20 = 3.600 menit (60 jam). Kapasitas tim/hari = 3 × 6 = 18 jam/hari. Waktu = 60 / 18 = 3,33 hari kerja."
    },
    {
      aspect: "Quality Orientation (Ketelitian Data)",
      id: "psy-3",
      question: "Manakah data yang 100% IDENTIK dengan referensi: `INV-NLD-2026-08914 | PT Karya Mandiri | Rp 450.000.000`?",
      options: [
        "INV-NLD-2026-08914 | PT Karya Mandiri | Rp 450.000.000",
        "INV-NLD-2026-08941 | PT Karya Mandiri | Rp 450.000.000",
        "INV-NLD-2026-08914 | PT Karya Mandri | Rp 450.000.000",
        "INV-NLD-2026-08914 | PT Karya Mandiri | Rp 45.000.000"
      ],
      answer: 0,
      explanation: "Quality Orientation menuntut ketelitian penuh: hanya opsi pertama yang identik pada nomor dokumen, nama perusahaan, dan nominal."
    },
    {
      aspect: "Quality Orientation (Ketelitian Rekening)",
      id: "psy-4",
      question: "Manakah nomor rekening yang SAMA PERSIS dengan referensi: `BANK-M 0845-9910-2231 a.n. Nusantara Logistik`?",
      options: [
        "BANK-M 0845-9910-2231 a.n. Nusantara Logistik",
        "BANK-M 0845-9910-2321 a.n. Nusantara Logistik",
        "BANK-M 0845-9901-2231 a.n. Nusantara Logistik",
        "BANK-N 0845-9910-2231 a.n. Nusantara Logistik"
      ],
      answer: 0,
      explanation: "Perhatikan urutan angka 9910-2231 serta kode bank BANK-M yang persis sesuai referensi."
    },
    {
      aspect: "Analysis & Judgment (Logika Pola)",
      id: "psy-5",
      question: "Deret angka: 4, 9, 19, 39, 79, ... Angka selanjutnya adalah?",
      options: ["159", "149", "169", "139"],
      answer: 0,
      explanation: "Pola: (angka × 2) + 1 → (79 × 2) + 1 = 159."
    },
    {
      aspect: "Analysis & Judgment (Logika Deduktif)",
      id: "psy-6",
      question: "Semua pengadaan di atas Rp 200 Juta wajib melalui evaluasi komite. Proyek A bernilai Rp 180 Juta dan Proyek B bernilai Rp 250 Juta. Kesimpulan yang pasti benar:",
      options: [
        "Proyek B wajib melalui evaluasi komite sesuai ketentuan batas > Rp 200 Juta.",
        "Baik Proyek A maupun Proyek B wajib melalui evaluasi komite.",
        "Proyek A tidak boleh dikerjakan tanpa evaluasi komite.",
        "Hanya proyek di bawah Rp 200 Juta yang wajib evaluasi komite."
      ],
      answer: 0,
      explanation: "Proyek B (Rp 250 Juta > Rp 200 Juta) memenuhi syarat wajib evaluasi komite."
    },
    {
      aspect: "Managing Work (Manajemen Waktu & Prioritas)",
      id: "psy-7",
      question: "Waktu kerja efektif 420 menit. Anda memverifikasi 12 berkas (@20 menit) dan membuat 1 laporan evaluasi (90 menit). Berapa menit tersisa untuk rapat koordinasi?",
      options: ["90 menit", "60 menit", "120 menit", "75 menit"],
      answer: 0,
      explanation: "Terpakai = (12 × 20) + 90 = 330 menit. Sisa waktu = 420 - 330 = 90 menit."
    },
    {
      aspect: "Digital Awareness & Continuous Improvement",
      id: "psy-8",
      question: "Proses rekap laporan mingguan di unit Anda masih memakan waktu 6 jam secara manual dan sering salah hitung. Anda melihat fitur otomatisasi di aplikasi perusahaan yang belum dipakai tim. Sikap terbaik Anda?",
      options: [
        "Mencoba menyusun template otomatisasi di aplikasi tersebut, mengujinya agar akurat, lalu membagikannya ke tim untuk memangkas waktu kerja.",
        "Tetap memakai cara manual agar tidak perlu repot mengubah kebiasaan tim.",
        "Menunggu sampai divisi IT membuatkan sistem baru meski belum ada jadwalnya.",
        "Memakai fitur baru hanya untuk pekerjaan pribadi tanpa memberi tahu rekan lain."
      ],
      answer: 0,
      explanation: "Menggabungkan Digital Awareness dan Continuous Improvement: proaktif memanfaatkan teknologi digital untuk meningkatkan efektivitas kerja bersama."
    },
    {
      aspect: "Fostering Collaboration & Valuing Differences",
      id: "psy-9",
      question: "Dalam rapat proyek lintas unit, seorang rekan dari divisi lain yang jauh lebih junior mengusulkan pendekatan berbeda dari kebiasaan lama tim Anda. Bagaimana respon terbaik Anda?",
      options: [
        "Mendengarkan perspektifnya secara terbuka, menggali kelebihan usulannya, dan memadukannya dengan pengalaman tim untuk solusi terbaik.",
        "Langsung menolak karena merasa pengalaman tim lama jauh lebih teruji.",
        "Mengabaikan usulannya agar rapat cepat selesai.",
        "Meminta rekan tersebut mengerjakan sendiri idenya di luar koordinasi tim."
      ],
      answer: 0,
      explanation: "Valuing Differences & Fostering Collaboration ditunjukkan dengan menghargai keragaman perspektif/latar belakang dan merangkulnya demi tujuan bersama."
    },
    {
      aspect: "Customer Orientation & Adaptability",
      id: "psy-10",
      question: "Dua jam sebelum jadwal pengiriman laporan ke pelanggan utama, pelanggan meminta penambahan ringkasan perbandingan biaya secara mendadak. Apa tindakan terbaik Anda?",
      options: [
        "Menyesuaikan prioritas segera, mengonfirmasi ruang lingkup yang dibutuhkan pelanggan, dan menyiapkan ringkasan akurat tepat waktu tanpa mengorbankan kualitas data.",
        "Menolak permintaan tersebut karena tidak ada dalam jadwal awal.",
        "Mengirimkan angka perkiraan kasar tanpa dicek ulang agar cepat selesai.",
        "Menunda pengiriman seluruh laporan sampai minggu depan tanpa memberi kabar."
      ],
      answer: 0,
      explanation: "Mencerminkan Adaptability, Customer Orientation, dan Quality Orientation secara seimbang: responsif terhadap perubahan kebutuhan pelanggan dengan tetap menjaga ketelitian."
    }
  ]
};
