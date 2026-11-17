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
        <p>Anda adalah Officer / Analis Klaim &amp; Penjaminan (BOD-5) di Kantor Cabang. Bulan ini cabang menghadapi kendala operasional berikut:</p>
        <table class="data-table">
          <thead>
            <tr><th>Jenis Produk</th><th>Berkas Masuk</th><th>Lengkap &amp; Valid</th><th>Tidak Lengkap</th><th>SLA Maksimal</th></tr>
          </thead>
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
      rubric: [
        "Ketajaman Analisis (perhitungan beban & identifikasi bottleneck SLA)",
        "Relevansi Solusi (triase berkas lengkap vs stop-clock berkas cacat)",
        "Kualitas Rekomendasi (checklist pra-kirim & koordinasi Bank Mitra)",
        "Penyampaian Terstruktur & Jelas pada Presentasi Asinkron"
      ],
      benchmark: "Prioritaskan 35 Bid Bond lengkap (SLA 2 hari) terlebih dahulu, lalu 165 KUR lengkap. Terbitkan surat konfirmasi kekurangan dokumen (stop-clock SLA sesuai PKS) untuk 75 KUR & 10 Suretyship yang tidak lengkap. Bagi 1 analis untuk Suretyship dan 2 analis untuk KUR, serta buat checklist pra-kirim bagi Bank Mitra."
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
      rubric: [
        "Ketajaman Analisis Kebutuhan UMKM",
        "Relevansi Solusi Edukasi & Simulasi Premi",
        "Kualitas Rekomendasi Sinergi RM Bank",
        "Kejelasan Struktur Presentasi"
      ],
      benchmark: "Mengedukasi debitur dengan simulasi premi harian yang ringan dibanding risiko kerugian aset, membekali RM Bank Mitra dengan brosur 1 halaman & kalkulator premi cepat, serta memprioritaskan klaster pasar berisiko tinggi dengan target bertahap dari 12% ke 30% dalam 6 bulan."
    }
  ],
  cap: [
    {
      id: "bod5-cap1",
      competency: "Execution Excellence & Quality Orientation",
      prompt: "Ceritakan pencapaian kerja terbaik Anda saat menangani volume pekerjaan tinggi (misalnya backlog verifikasi klaim/polis, penagihan subrogasi, atau target pemasaran) dengan tetap menjaga ketelitian dan kepatuhan SOP.",
      indicators: ["Situasi/beban kerja tergambar jelas", "Inisiatif/metode kerja sistematis", "Ketelitian & kepatuhan prosedur terjaga", "Hasil terukur (SLA/akurasi/pencapaian)"]
    },
    {
      id: "bod5-cap2",
      competency: "Problem Solving & Collaboration",
      prompt: "Ceritakan pengalaman Anda menemukan kesalahan atau ketidaksesuaian data/dokumen dalam pekerjaan, lalu bagaimana Anda mengatasinya bersama tim atau mitra terkait.",
      indicators: ["Kepekaan mendeteksi anomali", "Langkah verifikasi & eskalasi yang tepat", "Komunikasi kooperatif dengan tim/mitra", "Pencegahan agar tidak terulang"]
    }
  ],
  psychometric: [
    {
      aspect: "Kemampuan Berpikir (Numerik)",
      id: "psy-1",
      question: "Sebuah proyek Rp 8 Miliar membutuhkan Bid Bond 2% dari nilai proyek. Jika tarif IJP 0,25% dari nilai jaminan dan biaya admin Rp 50.000, berapa total biaya yang dibayar kontraktor?",
      options: ["Rp 450.000", "Rp 400.000", "Rp 250.000", "Rp 500.000"],
      answer: 0,
      explanation: "Bid Bond = 2% x Rp 8 M = Rp 160 Juta. IJP = 0,25% x Rp 160 Juta = Rp 400.000. Total = Rp 400.000 + Rp 50.000 = Rp 450.000."
    },
    {
      aspect: "Kemampuan Berpikir (Ketelitian Data)",
      id: "psy-2",
      question: "Manakah data yang 100% IDENTIK dengan referensi: `POL-KUR-2026-08914 | PT Karya Mandiri | Rp 450.000.000`?",
      options: [
        "POL-KUR-2026-08914 | PT Karya Mandiri | Rp 450.000.000",
        "POL-KUR-2026-08941 | PT Karya Mandiri | Rp 450.000.000",
        "POL-KUR-2026-08914 | PT Karya Mandri | Rp 450.000.000",
        "POL-KUR-2026-08914 | PT Karya Mandiri | Rp 45.000.000"
      ],
      answer: 0,
      explanation: "Hanya opsi A yang sama persis di nomor polis, nama perusahaan, dan nominal."
    },
    {
      aspect: "Kemampuan Berpikir (Logika Pola)",
      id: "psy-3",
      question: "Deret angka: 4, 9, 19, 39, 79, ... Angka selanjutnya adalah?",
      options: ["159", "149", "169", "139"],
      answer: 0,
      explanation: "Pola: (angka x 2) + 1 -> (79 x 2) + 1 = 159."
    },
    {
      aspect: "Karakteristik Kepribadian (Integritas & Ketelitian)",
      id: "psy-4",
      question: "Anda menemukan selisih Rp 250.000 pada berkas klaim yang sudah disetujui sistem. Rekan menyarankan mengabaikannya karena kecil. Sikap Anda?",
      options: [
        "Mencatat dan mengonfirmasi selisih tersebut sesuai prosedur agar data audit akurat.",
        "Mengikuti saran rekan agar pekerjaan cepat selesai.",
        "Mengubah angka manual supaya cocok.",
        "Membiarkan berkas tanpa melapor."
      ],
      answer: 0,
      explanation: "Kepatuhan prosedur dan akurasi data adalah standar utama fungsi operasional asuransi."
    },
    {
      aspect: "Faktor Motivasi (Orientasi Prestasi & Layanan)",
      id: "psy-5",
      question: "Ketika sistem verifikasi baru diterapkan di kantor dan awalnya terasa lebih lambat bagi Anda, apa yang paling mendorong tindakan Anda?",
      options: [
        "Mempelajari alur sistem baru dan mencari cara agar target akurasi serta SLA tetap tercapai.",
        "Kembali memakai cara manual secara diam-diam agar target harian aman.",
        "Menunggu sampai rekan lain menguasainya terlebih dahulu.",
        "Mengeluhkan sistem baru karena menghambat rutinitas."
      ],
      answer: 0,
      explanation: "Motivasi berprestasi dan adaptabilitas tinggi ditunjukkan dengan kemauan belajar sistem baru demi kualitas layanan."
    }
  ]
};
