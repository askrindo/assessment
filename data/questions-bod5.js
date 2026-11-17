window.DATA_BOD5 = {
  gradeId: "BOD-5",
  title: "BOD – 5 (Job Grade 8–11)",
  headcount: 253,
  roleLabel: "Officer / Analis Senior / Supervisor Muda",
  methods: [
    { id: "casestudy", name: "Case Study – Async Presentation", desc: "Analisis kasus operasional & penyusunan skrip/rekaman presentasi asinkron berbatas waktu." },
    { id: "cap", name: "CAP (Cognitive & Analytical)", desc: "Penalaran numerik operasional, perhitungan premi/klaim dasar, dan logika analitis." },
    { id: "psychometric", name: "Psychometric Test", desc: "Tes ketelitian verifikasi data polis/klaim, deret pola, dan sikap kerja." }
  ],
  casestudy: [
    {
      id: "bod5-cs1",
      unit: "Underwriting & Klaim",
      title: "Penanganan Backlog Verifikasi Klaim KUR & Kelengkapan Dokumen Suretyship",
      prepSec: 300,
      presentSec: 180,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Anda adalah Officer / Analis Klaim & Penjaminan (BOD-5) di Kantor Cabang. Bulan ini cabang menghadapi dua kendala operasional:</p>
        <table class="data-table">
          <thead>
            <tr><th>Jenis Produk</th><th>Jumlah Berkas Masuk</th><th>Berkas Lengkap & Valid</th><th>Berkas Tidak Lengkap</th><th>SLA Maksimal</th></tr>
          </thead>
          <tbody>
            <tr><td>Klaim KUR Mikro</td><td>240 berkas</td><td>165 berkas</td><td>75 berkas (tanpa surat tagih bank / NPF)</td><td>10 hari kerja</td></tr>
            <tr><td>Permohonan Suretyship (Bid Bond)</td><td>45 berkas</td><td>35 berkas</td><td>10 berkas (laporan keuangan belum update)</td><td>2 hari kerja</td></tr>
          </tbody>
        </table>
        <p>Saat ini hanya ada 3 analis (termasuk Anda) dan rata-rata waktu verifikasi 1 berkas adalah 25 menit. Kepala Seksi meminta Anda menyusun presentasi singkat (asinkron) maksimal 3 menit mengenai langkah penyelesaian agar SLA tetap terjaga dan tidak ada klaim salah bayar.</p>
      `,
      prompts: [
        "1. Identifikasi Masalah & Prioritas (Mana yang diproses lebih dulu dan mengapa?)",
        "2. Perhitungan Kapasitas & Pembagian Kerja Tim (Bagaimana membagi 240 + 45 berkas ke 3 analis?)",
        "3. Penanganan Berkas Tidak Lengkap (Bagaimana komunikasi ke Bank Mitra / Pemohon Suretyship?)",
        "4. Usulan Perbaikan Proses agar backlog tidak terulang bulan depan."
      ],
      keywords: ["prioritas", "bid bond", "sla", "triase", "lengkap", "pending", "tolak", "bank mitra", "checklist", "kapasitas", "template", "notifikasi", "verifikasi"],
      rubric: [
        "Struktur Presentasi (Pembukaan – Analisis Data – Solusi – Penutup)",
        "Ketepatan Prioritas SLA (Suretyship 2 hari & berkas KUR lengkap didahulukan)",
        "Kejelasan Perhitungan Beban Kerja & Solusi Operasional",
        "Kepatuhan Prosedur (Tidak meloloskan berkas cacat dokumen)"
      ],
      benchmark: "Melakukan triase berkas: (1) Memprioritaskan 35 berkas Suretyship yang lengkap (SLA 2 hari) dan 165 berkas KUR lengkap. (2) Untuk 75 berkas KUR dan 10 Suretyship yang tidak lengkap, segera terbitkan surat konfirmasi kekurangan dokumen (stop-clock SLA sesuai PKS) agar tidak menyumbat antrean. (3) Membagi beban berdasarkan spesialisasi: 1 analis fokus Suretyship, 2 analis fokus KUR lengkap, serta membuat template checklist pra-kirim untuk Bank Mitra."
    },
    {
      id: "bod5-cs2",
      unit: "Bisnis & Pemasaran",
      title: "Peningkatan Konversi Polis Asuransi Umum bagi Debitur KUR Naik Kelas",
      prepSec: 300,
      presentSec: 180,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Dari 1.200 debitur KUR Kecil di cabang Anda yang usahanya berkembang (naik kelas menjadi kredit komersial), baru <strong>12%</strong> yang memiliki proteksi Asuransi Kebakaran / Asuransi Harta Benda untuk ruko dan stok barangnya. Padahal dalam 1 tahun terakhir terjadi 9 kasus kebakaran pasar yang membuat debitur gagal bayar.</p>
      `,
      prompts: [
        "1. Apa akar masalah rendahnya penetrasi Asuransi Umum pada debitur naik kelas?",
        "2. Bagaimana skema penawaran sederhana yang mudah dipahami pelaku UMKM?",
        "3. Bagaimana koordinasi dengan Relationship Manager (RM) Bank Mitra?",
        "4. Target realistis 6 bulan ke depan dan cara memantaunya."
      ],
      keywords: ["edukasi", "bundling", "rm", "bank", "premi", "risiko", "umkm", "kebakaran", "simulasi", "target", "komisi", "monitoring"],
      rubric: [
        "Pemahaman Kebutuhan Nasabah UMKM",
        "Kreativitas Pendekatan Pemasaran & Edukasi Risiko",
        "Sinergi dengan RM Bank Mitra",
        "Kejelasan Target & Rencana Eksekusi"
      ],
      benchmark: "Mengedukasi debitur dengan ilustrasi biaya premi harian yang sangat terjangkau dibanding kerugian aset akibat kebakaran, membekali RM Bank Mitra dengan brosur 1 halaman & kalkulator premi cepat, serta memprioritaskan klaster pasar/ruko berisiko tinggi dengan target konversi bertahap dari 12% menjadi 30% dalam 6 bulan."
    }
  ],
  cap: [
    {
      id: "bod5-c1",
      category: "Numerik Operasional",
      question: "Sebuah proyek senilai Rp 8 Miliar membutuhkan Jaminan Penawaran (Bid Bond) sebesar 2% dari nilai proyek. Jika tarif IJP (Imbal Jasa Penjaminan) adalah 0,25% dari nilai jaminan dengan biaya administrasi polis Rp 50.000, berapakah total biaya yang harus dibayar kontraktor?",
      options: [
        "Rp 450.000",
        "Rp 400.000",
        "Rp 250.000",
        "Rp 500.000"
      ],
      answer: 0,
      explanation: "Nilai Bid Bond = 2% x Rp 8.000.000.000 = Rp 160.000.000. IJP = 0,25% x Rp 160.000.000 = Rp 400.000. Total biaya = Rp 400.000 + Rp 50.000 = Rp 450.000."
    },
    {
      id: "bod5-c2",
      category: "Ketelitian Klaim",
      question: "Plafon pinjaman KUR seorang debitur adalah Rp 50.000.000 dengan porsi penjaminan asuransi sebesar 70%. Saat macet, sisa pokok pinjaman (baki debet) adalah Rp 30.000.000 dan tunggakan bunga yang dijamin sesuai PKS adalah Rp 1.500.000. Berapakah nilai klaim maksimal yang dibayarkan perusahaan asuransi?",
      options: [
        "Rp 22.050.000",
        "Rp 31.500.000",
        "Rp 21.000.000",
        "Rp 35.000.000"
      ],
      answer: 0,
      explanation: "Total kewajiban macet yang dijamin = Rp 30.000.000 + Rp 1.500.000 = Rp 31.500.000. Porsi penjaminan = 70% x Rp 31.500.000 = Rp 22.050.000."
    },
    {
      id: "bod5-c3",
      category: "Logika Operasional",
      question: "Berdasarkan SOP Cabang: (1) Semua polis Asuransi Kebakaran dengan nilai pertanggungan di atas Rp 2 Miliar wajib melalui survei fisik oleh petugas teknik. (2) Polis Ruko A bernilai Rp 1,8 Miliar. (3) Polis Gudang B bernilai Rp 2,5 Miliar. Manakah pernyataan yang benar?",
      options: [
        "Polis Gudang B wajib melalui survei fisik, sedangkan Polis Ruko A tidak wajib berdasarkan aturan batas Rp 2 Miliar.",
        "Baik Polis Ruko A maupun Gudang B wajib survei fisik.",
        "Polis Ruko A tidak boleh diterbitkan tanpa survei fisik.",
        "Hanya polis di bawah Rp 2 Miliar yang wajib survei fisik."
      ],
      answer: 0,
      explanation: "Gudang B (Rp 2,5 M > Rp 2 M) wajib survei fisik. Ruko A (Rp 1,8 M <= Rp 2 M) tidak terkena kewajiban aturan batas > Rp 2 Miliar."
    },
    {
      id: "bod5-c4",
      category: "Efisiensi Kerja",
      question: "Anda memiliki waktu kerja efektif 7 jam (420 menit) hari ini. Anda harus memverifikasi 12 berkas klaim (masing-masing 20 menit) dan membuat 1 laporan rekapitulasi (90 menit). Berapa menit waktu tersisa untuk melakukan follow-up telepon subrogasi?",
      options: [
        "90 menit",
        "60 menit",
        "120 menit",
        "75 menit"
      ],
      answer: 0,
      explanation: "Verifikasi = 12 x 20 = 240 menit. Laporan = 90 menit. Total terpakai = 240 + 90 = 330 menit. Sisa waktu = 420 - 330 = 90 menit."
    }
  ],
  psychometric: [
    {
      type: "accuracy",
      id: "psy-1",
      question: "PERHATIKAN DATA POLIS: Mana pasangan data yang BENAR-BENAR IDENTIK antara Data Sistem Core dan Dokumen Fisik?",
      pairs: [
        { left: "POL-KUR-2026-08914 | PT Karya Mandiri | Rp 450.000.000", right: "POL-KUR-2026-08914 | PT Karya Mandiri | Rp 450.000.000" },
        { left: "POL-SUR-2026-04412 | CV Jaya Abadi | Rp 1.250.000.000", right: "POL-SUR-2026-04421 | CV Jaya Abadi | Rp 1.250.000.000" },
        { left: "POL-UMM-2026-01189 | Toko Sinar Baru | Rp 85.500.000", right: "POL-UMM-2026-01189 | Toko Sinar Baru | Rp 85.050.000" },
        { left: "POL-KUR-2026-07730 | UD Makmur Sentosa | Rp 120.000.000", right: "POL-KUR-2026-07730 | UD Makmur Santosa | Rp 120.000.000" }
      ],
      answer: 0,
      explanation: "Pasangan 1 identik 100%. Pasangan 2 berbeda nomor (04412 vs 04421). Pasangan 3 berbeda nominal (85.500.000 vs 85.050.000). Pasangan 4 berbeda ejaan nama (Sentosa vs Santosa)."
    },
    {
      type: "pattern",
      id: "psy-2",
      question: "Deret Angka (Analisis Pola): 4, 9, 19, 39, 79, ... Angka berikutnya adalah?",
      options: ["159", "149", "169", "139"],
      answer: 0,
      explanation: "Polanya adalah (angka x 2) + 1: (4x2)+1=9, (9x2)+1=19, (19x2)+1=39, (39x2)+1=79, (79x2)+1 = 159."
    },
    {
      type: "accuracy",
      id: "psy-3",
      question: "VERIFIKASI REKENING SUBROGASI: Manakah nomor rekening & nama bank yang TIDAK memiliki kesalahan penulisan dibanding referensi: `BNI 0845-9910-2231 a.n. Asuransi Kredit Indonesia`?",
      options: [
        "BNI 0845-9910-2231 a.n. Asuransi Kredit Indonesia",
        "BNI 0845-9910-2321 a.n. Asuransi Kredit Indonesia",
        "BNI 0845-9901-2231 a.n. Asuransi Kredit Indonesia",
        "BRI 0845-9910-2231 a.n. Asuransi Kredit Indonesia"
      ],
      answer: 0,
      explanation: "Hanya opsi pertama yang sama persis dengan referensi."
    },
    {
      type: "attitude",
      id: "psy-4",
      question: "Sikap Kerja: Saat Anda menemukan selisih Rp 250.000 pada berkas klaim yang sebenarnya sudah disetujui sistem, namun rekan Anda menyarankan untuk mengabaikannya karena nominalnya kecil, apa yang Anda lakukan?",
      options: [
        "Tetap mencatat dan mengonfirmasi selisih tersebut sesuai prosedur agar data audit akurat.",
        "Mengikuti saran rekan karena nominalnya tidak signifikan dibanding target harian.",
        "Menunda berkas tanpa melapor ke atasan sampai akhir bulan.",
        "Mengubah angka di laporan manual agar terlihat cocok."
      ],
      answer: 0,
      explanation: "Integritas dan ketelitian operasional menuntut setiap selisih tercatat dan dikonfirmasi sesuai prosedur, tanpa manipulasi data."
    }
  ]
};
