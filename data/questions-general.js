window.DATA_GENERAL = {
  potrai_bod3: [
    {
      id: "gen3-p1",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Krisis Rantai Pasok & Ancaman Pemutusan Kontrak Vendor Utama",
      durationSec: 1800,
      email: {
        from: "Chief Operating Officer <coo@nusantara-corp.co.id>",
        subject: "URGENT: Keterlambatan Bahan Baku 40% & Tuntutan Kenaikan Harga Vendor",
        body: `<p>Rekan Kadiv, pemasok utama kita (PT Sentra Logistik) menunda pengiriman komponen inti selama 3 minggu dan mendadak menuntut kenaikan harga kontrak +18%. Sementara itu, 2 klien korporat besar mengancam penalti Rp 4 Miliar jika jadwal pengiriman bulan ini meleset.</p>`
      },
      chat: {
        partnerName: "Direktur PT Sentra Logistik (AI Roleplay)",
        opening: "Selamat pagi. Biaya bahan baku dan logistik kami melonjak tajam. Jika penyesuaian harga +18% tidak disetujui hari ini, pengiriman batch minggu ini terpaksa kami tahan.",
        followUp: "Kami mengerti kontrak lama masih berlaku, tapi kondisi pasar berubah. Apa skema jalan tengah yang bisa Anda tawarkan?"
      },
      call: {
        partnerName: "Manajer Pengadaan & Operasional (Virtual Call)",
        prompt: "Tim pengadaan melaporkan ada 2 vendor alternatif dengan kapasitas 60% namun butuh uji kualitas 5 hari kerja. Sampaikan arahan strategis Anda untuk menyelamatkan jadwal klien VIP."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Strategi Kontingensi Rantai Pasok",
        brief: "Data: Penalti klien Rp 4 M, margin produk 22%, selisih biaya vendor +18% = Rp 2,6 M. Susun analisa keputusan finansial, mitigasi dual-sourcing, dan rencana 60 hari."
      },
      aiHints: [
        { q: "Bandingkan biaya penalti vs kenaikan harga", a: "Penalti klien Rp 4 M > tambahan biaya vendor Rp 2,6 M. Solusi terbaik: negosiasi kenaikan bertahap/parsial hanya untuk batch darurat sambil aktifkan dual-sourcing." }
      ],
      keywords: ["dual-sourcing", "penalti", "negosiasi", "kontrak", "vendor", "margin", "kualitas", "kontingensi", "prioritas"],
      rubric: ["Strategic Business Acumen", "Negosiasi Vendor Berbasis Data", "Manajemen Risiko Operasional", "Keputusan Lintas Fungsi"],
      benchmark: "Menghindari penalti Rp 4 M dengan menyetujui penyesuaian terbatas khusus pengiriman darurat (atau skema berbagi biaya sementara), sekaligus mempercepat uji kualitas 2 vendor alternatif untuk dual-sourcing."
    },
    {
      id: "gen3-p2",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Resistensi Transformasi Sistem ERP Baru di 5 Kantor Regional",
      durationSec: 1800,
      email: {
        from: "Direktur Transformasi & SDM <hrd@nusantara-corp.co.id>",
        subject: "Adopsi Sistem ERP Baru Baru 35% — Kepala Regional Meminta Penundaan",
        body: `<p>Implementasi sistem kerja digital baru sudah berjalan 2 bulan, namun tingkat pemakaian di 5 regional baru 35%. Tiga Kepala Regional mengirim surat meminta kembali ke spreadsheet manual dengan alasan target penjualan kuartal ini terganggu.</p>`
      },
      chat: {
        partnerName: "Kepala Regional Jawa Timur (AI Roleplay)",
        opening: "Jujur saja, sistem baru ini memperlambat tim kami input order. Kalau dipaksa terus, target omzet kuartal ini tidak akan tercapai.",
        followUp: "Kami bukan menolak teknologi, tapi tim kami belum sempat dilatih dengan baik di tengah kejar target."
      },
      call: {
        partnerName: "Project Manager IT & Change Management (Virtual Call)",
        prompt: "Arahkan penyusunan program pendampingan intensif (hypercare), super-user di tiap regional, dan tenggat cut-off sistem lama."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Roadmap Akselerasi Adopsi Digital 90 Hari",
        brief: "Susun strategi manajemen perubahan (komunikasi, pelatihan terfokus, KPI adopsi, dan dukungan teknis lapangan)."
      },
      aiHints: [
        { q: "Strategi mengatasi resistensi tanpa matikan omzet", a: "Jangan kembali ke manual penuh; berikan masa transisi 14 hari dengan pendampingan 'floor support' di tiap regional dan tunjuk champion lokal." }
      ],
      keywords: ["change management", "adopsi", "pelatihan", "champion", "cut-off", "resistensi", "kpi", "pendampingan", "digital"],
      rubric: ["Change Leadership", "Empati & Ketegasan Eksekutif", "Perencanaan Implementasi", "Penyelarasan Bisnis vs Sistem"],
      benchmark: "Menolak kembali ke sistem manual permanen, memberikan dukungan intensif 14 hari (floor support & local champion) agar target penjualan tetap aman, serta menetapkan tenggat cut-off bertahap."
    },
    {
      id: "gen3-p3",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Kebocoran Data Pelanggan & Krisis Kepercayaan Publik",
      durationSec: 1800,
      email: {
        from: "Head of Information Security <sec@nusantara-corp.co.id>",
        subject: "KRITIS: Indikasi Kebocoran 12.000 Data Pelanggan dari Portal Mitra",
        body: `<p>Tim keamanan mendeteksi akses tidak sah pada API portal mitra yang berpotensi mengekspos 12.000 data kontak pelanggan. Beberapa akun media sosial mulai mempertanyakan keamanan layanan kita.</p>`
      },
      chat: {
        partnerName: "Head of Corporate Communication (AI Roleplay)",
        opening: "Wartawan sudah mulai menghubungi kami menanyakan isu kebocoran data. Apakah kita sebaiknya membantah dulu atau langsung memberi pernyataan resmi?",
        followUp: "Jika kita mengakui ada insiden, manajemen khawatir saham/kepercayaan klien korporat langsung turun."
      },
      call: {
        partnerName: "Chief Information Officer / IT Lead (Virtual Call)",
        prompt: "Instruksikan langkah isolasi teknis segera, audit forensik, dan pemulihan akses aman."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Protokol Penanganan Krisis & Tata Kelola Data",
        brief: "Rumuskan langkah isolasi, komunikasi transparan ke regulator/pelanggan sesuai UU PDP, dan perbaikan keamanan jangka panjang."
      },
      aiHints: [
        { q: "Prinsip komunikasi krisis data", a: "Jangan menyangkal fakta; lakukan isolasi akses dulu, verifikasi cakupan data terdampak, lalu sampaikan pernyataan transparan beserta langkah perlindungan pelanggan." }
      ],
      keywords: ["isolasi", "transparan", "uu pdp", "forensik", "krisis", "api", "komunikasi", "kepercayaan", "audit"],
      rubric: ["Integritas & Transparansi Krisis", "Kecepatan Isolasi Risiko", "Komunikasi Publik & Regulator", "Tata Kelola Jangka Panjang"],
      benchmark: "Segera memutus/mengisolasi API terdampak dan melakukan audit forensik, menyiapkan komunikasi transparan berbasis fakta kepada pelanggan & regulator tanpa menutupi insiden, serta memperketat kontrol akses."
    },
    {
      id: "gen3-p4",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Dilema Efisiensi Anggaran 20% vs Investasi Inovasi Produk",
      durationSec: 1800,
      email: {
        from: "Direktur Utama <ceo@nusantara-corp.co.id>",
        subject: "Arahan Efisiensi Biaya Operasional 20% Tahun Berjalan",
        body: `<p>Akibat perlambatan ekonomi, Direksi meminta pemangkasan anggaran operasional sebesar 20% di seluruh divisi. Di sisi lain, kompetitor baru saja meluncurkan layanan digital yang menggerus 12% pangsa pasar segmen muda kita.</p>`
      },
      chat: {
        partnerName: "Head of Product & Marketing (AI Roleplay)",
        opening: "Jika anggaran inovasi produk dipotong 20% rata, peluncuran fitur digital kita batal dan pangsa pasar kita bakal terus tergerus.",
        followUp: "Pos anggaran mana saja yang menurut Anda bisa diefisienkan tanpa mengorbankan daya saing?"
      },
      call: {
        partnerName: "Finance Controller (Virtual Call)",
        prompt: "Diskusikan skema realokasi anggaran (zero-based budgeting) untuk memangkas biaya rutin non-prioritas demi mendanai inovasi inti."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Realokasi Anggaran Strategis 20%",
        brief: "Susun strategi pemangkasan biaya selektif (bukan potong rata), proteksi proyek strategis ber-ROI tinggi, dan KPI efisiensi."
      },
      aiHints: [
        { q: "Prinsip efisiensi strategis", a: "Hindari pemotongan rata (across-the-board cut); pangkas biaya administratif/event non-produktif 30% agar proyek digital ber-ROI tinggi tetap jalan." }
      ],
      keywords: ["efisiensi", "realokasi", "roi", "prioritas", "inovasi", "anggaran", "kompetitor", "selektif"],
      rubric: ["Visi Strategis & Prioritisasi", "Ketajaman Finansial", "Kolaborasi Lintas Divisi", "Keberanian Mengambil Keputusan"],
      benchmark: "Menerapkan efisiensi selektif berbasis ROI: memangkas biaya rutin/administratif non-esensial lebih dalam agar proyek inovasi digital penyelamat pangsa pasar tetap berjalan."
    }
  ],
  potrai_bod4: [
    {
      id: "gen4-p1",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Konflik Departemen Sales vs Operasional & Komplain Klien VIP",
      durationSec: 1500,
      email: {
        from: "Key Account Manager <sales@nusantara-corp.co.id>",
        subject: "Klien VIP Mengancam Batal Kontrak Karena Keterlambatan Tim Operasional",
        body: `<p>Tim Sales menjanjikan pengiriman khusus 3 hari kerja kepada Klien VIP senilai Rp 2,5 Miliar tanpa berkonsultasi dengan tim Operasional. Kini tim Operasional menolak memproses karena antrean reguler sudah penuh.</p>`
      },
      chat: {
        partnerName: "Manajer Operasional (AI Roleplay)",
        opening: "Tim Sales selalu asal janji ke klien tanpa cek kapasitas kami! Kalau kami dipaksa lembur terus, kualitas pengerjaan bisa rusak.",
        followUp: "Oke, saya mau bantu khusus klien VIP ini, asal ke depan ada aturan jelas supaya Sales tidak menabrak jadwal kami lagi."
      },
      call: {
        partnerName: "Perwakilan Klien VIP (Virtual Call)",
        prompt: "Hubungi Klien VIP untuk menyampaikan komitmen jadwal penyelesaian yang realistis dan menjaga kepercayaan kerja sama."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Protokol SLA Lintas Departemen (Sales–Ops)",
        brief: "Susun langkah darurat penyelesaian order Rp 2,5 M dan aturan koordinasi pra-komitmen antara Sales dan Operasional."
      },
      aiHints: [
        { q: "Langkah meredakan konflik Sales vs Ops", a: "Fokus selesaikan order VIP dulu lewat alokasi lembur terukur/prioritas, lalu terapkan sistem slot kapasitas bersama sebelum Sales berjanji ke klien." }
      ],
      keywords: ["sla", "koordinasi", "kapasitas", "klien vip", "konflik", "solusi", "komitmen", "prosedur"],
      rubric: ["Manajemen Konflik Lintas Unit", "Orientasi Pelanggan", "Perbaikan Alur Kerja", "Komunikasi Asertif"],
      benchmark: "Menyelesaikan pengiriman Klien VIP dengan realokasi kapasitas darurat dan komunikasi jujur ke klien, lalu menetapkan aturan wajib konfirmasi kapasitas ke Operasional sebelum Sales menjanjikan SLA khusus."
    },
    {
      id: "gen4-p2",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Penurunan Produktivitas Tim & Gejala Burnout Pasca-Restrukturisasi",
      durationSec: 1500,
      email: {
        from: "HR Business Partner <hrbp@nusantara-corp.co.id>",
        subject: "Tingkat Absensi & Kesalahan Kerja Tim Anda Naik 30% Bulan Ini",
        body: `<p>Setelah penggabungan dua unit kerja bulan lalu, beban kerja tim Anda meningkat. Dua staf berprestasi mulai sering lembur hingga malam, tingkat kesalahan input naik, dan salah satunya mengajukan pengunduran diri.</p>`
      },
      chat: {
        partnerName: "Staf Senior Berprestasi (AI Roleplay)",
        opening: "Jujur Pak/Bu, saya merasa kelelahan karena pekerjaan dua orang dibebankan ke saya sejak penggabungan tim, sementara arahan prioritasnya tidak jelas.",
        followUp: "Jika beban kerja dan pembagian tugasnya bisa ditata ulang, saya sebenarnya masih ingin bertahan di perusahaan ini."
      },
      call: {
        partnerName: "HR Business Partner (Virtual Call)",
        prompt: "Diskusikan penataan ulang beban kerja (workload balancing), dukungan kesejahteraan tim, dan rencana retensi talenta."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Rencana Redistribusi Beban Kerja & Retensi Tim",
        brief: "Susun pemetaan tugas prioritas vs tugas yang bisa dihentikan/diotomatisasi, serta jadwal one-on-one coaching."
      },
      aiHints: [
        { q: "Langkah cepat cegah turnover staf kunci", a: "Lakukan empati & one-on-one segera, audit dan pangkas laporan duplikat, distribusikan ulang beban kerja secara adil, dan tetapkan prioritas jelas." }
      ],
      keywords: ["burnout", "retensi", "empati", "beban kerja", "prioritas", "coaching", "one-on-one", "delegasi"],
      rubric: ["People Leadership & Empati", "Manajemen Beban Kerja", "Retensi Talenta", "Komunikasi Coaching"],
      benchmark: "Melakukan sesi one-on-one dengan empati untuk mempertahankan staf kunci, mengaudit & memangkas tugas administratif duplikat, serta meratakan beban kerja dengan indikator prioritas yang jelas."
    },
    {
      id: "gen4-p3",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Indikasi Pelanggaran Pengadaan Vendor & Tekanan Deadline Proyek",
      durationSec: 1500,
      email: {
        from: "Supervisor Pengadaan <proc@nusantara-corp.co.id>",
        subject: "Temuan: Vendor Pemenang Tender Ternyata Terafiliasi dengan Staf Proyek",
        body: `<p>Menjelang penandatanganan kontrak proyek IT senilai Rp 1,8 Miliar besok, ditemukan fakta bahwa vendor penawar terendah memiliki hubungan keluarga dengan koordinator proyek yang menyusun spesifikasi teknis.</p>`
      },
      chat: {
        partnerName: "Koordinator Proyek (AI Roleplay)",
        opening: "Pak/Bu, memang itu perusahaan saudara saya, tapi harganya paling murah dan kualitasnya bagus. Kalau dibatalkan sekarang, proyek kita molor 1 bulan.",
        followUp: "Apakah tidak bisa tetap lanjut saja dengan surat pernyataan profesionalisme?"
      },
      call: {
        partnerName: "Tim Kepatuhan & Pengadaan Pusat (Virtual Call)",
        prompt: "Koordinasikan pembatalan/evaluasi ulang proses tender sesuai prinsip conflict of interest dan rencana percepatan vendor peringkat kedua."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Penanganan Conflict of Interest & Kontingensi Proyek",
        brief: "Susun keputusan pengadaan yang berintegritas, langkah investigasi internal, serta rencana mengejar ketertinggalan jadwal proyek."
      },
      aiHints: [
        { q: "Prinsip Conflict of Interest", a: "Benturan kepentingan tidak bisa ditoleransi meski harga termurah; hentikan penunjukan langsung, evaluasi vendor peringkat 2 secara transparan, dan eskalasi ke kepatuhan." }
      ],
      keywords: ["integritas", "conflict of interest", "tender", "transparan", "batal", "kepatuhan", "audit", "vendor"],
      rubric: ["Integritas & Tata Kelola", "Ketegasan Menolak Benturan Kepentingan", "Mitigasi Jadwal Proyek", "Komunikasi Etis"],
      benchmark: "Menghentikan penandatanganan kontrak karena benturan kepentingan, menugaskan tim independen mengevaluasi vendor peringkat berikutnya agar proyek tetap jalan, dan memproses pembinaan sesuai kode etik."
    },
    {
      id: "gen4-p4",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Peluncuran Layanan Baru dengan Anggaran Terbatas & Negosiasi Mitra",
      durationSec: 1500,
      email: {
        from: "Manajer Pengembangan Bisnis <bizdev@nusantara-corp.co.id>",
        subject: "Proposal Pilot Project Layanan Digital — Anggaran Hanya Tersedia 50%",
        body: `<p>Anda ditunjuk memimpin peluncuran layanan baru di 3 kota. Namun anggaran promosi yang disetujui hanya 50% dari proposal awal, sementara target akuisisi pengguna kuartal ini tetap 10.000 pengguna.</p>`
      },
      chat: {
        partnerName: "Calon Mitra Strategis / Komunitas (AI Roleplay)",
        opening: "Kami tertarik bekerja sama mempromosikan layanan Anda ke 15.000 anggota kami, tapi kami minta biaya sponsor tunai Rp 150 Juta di muka.",
        followUp: "Jika anggaran tunai Anda terbatas, skema bagi hasil atau keuntungan bersama apa yang bisa kita sepakati?"
      },
      call: {
        partnerName: "Tim Pemasaran & Operasional (Virtual Call)",
        prompt: "Arahkan strategi pilot bertahap (MVP) di 1 kota paling potensial terlebih dahulu dengan pemasaran berbasis performa."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Strategi Go-To-Market Hemat Biaya",
        brief: "Rancang skema kemitraan revenue-sharing, prioritas segmen pengguna, dan metrik evaluasi minggu ke-4."
      },
      aiHints: [
        { q: "Solusi anggaran terbatas 50%", a: "Ganti biaya sponsor tunai di muka dengan skema revenue-sharing/insentif per pengguna aktif, dan fokuskan pilot pada 1–2 kanal konversi tertinggi." }
      ],
      keywords: ["revenue-sharing", "pilot", "efisiensi", "mitra", "konversi", "prioritas", "target", "kolaborasi"],
      rubric: ["Kreativitas Bisnis & Inovasi", "Negosiasi Kemitraan", "Fokus Eksekusi Terukur", "Pengelolaan Anggaran"],
      benchmark: "Mengubah pola sponsor tunai menjadi kemitraan berbasis performa/revenue-sharing dan memusatkan anggaran 50% pada kanal/kota dengan potensi konversi tertinggi."
    }
  ],
  casestudy_bod5: [
    {
      id: "gen5-cs1",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Penanganan Backlog 300 Tiket Komplain Pelanggan & Prioritas SLA",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Anda adalah Officer Layanan Pelanggan &amp; Operasional (BOD-5). Setelah gangguan sistem kemarin, terdapat 300 tiket komplain menumpuk: 60 tiket kategori <strong>Kritis (transaksi gagal/dana tertahan)</strong> dengan SLA 4 jam, 140 tiket kategori <strong>Menengah (perubahan data)</strong> dengan SLA 2 hari, dan 100 tiket <strong>Pertanyaan Umum</strong>. Tim Anda terdiri dari 4 staf.</p>
      `,
      writtenQuestions: [
        "1. Bagaimana Anda membagi prioritas 300 tiket tersebut dan mengatur pembagian tugas 4 staf agar SLA kategori Kritis terpenuhi?",
        "2. Langkah komunikasi proaktif dan pencegahan apa yang Anda usulkan agar backlog serupa tidak terulang?"
      ],
      keywords: ["prioritas", "kritis", "sla", "triase", "pembagian tugas", "notifikasi", "faq", "template", "monitoring"],
      rubric: ["Ketajaman Analisis Prioritas", "Relevansi Solusi Pembagian Tim", "Kualitas Rekomendasi Pencegahan", "Kejelasan Presentasi Asinkron"],
      benchmark: "Fokuskan 3 staf pada 60 tiket Kritis (rata-rata 20 tiket/staf) hingga tuntas dalam 4 jam, sementara 1 staf mengirim notifikasi massal & template jawaban FAQ untuk 100 pertanyaan umum, lalu selesaikan tiket Menengah secara paralel."
    },
    {
      id: "gen5-cs2",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Selisih Stok Gudang & Ketidakcocokan Laporan Pengiriman Mingguan",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Saat audit stok mingguan, ditemukan selisih 85 unit barang antara sistem komputer dan fisik gudang senilai Rp 127 Juta, serta 12 surat jalan pengiriman yang belum ditandatangani penerima namun sudah dicatat selesai oleh staf admin.</p>
      `,
      writtenQuestions: [
        "1. Langkah verifikasi dan penelusuran apa yang Anda lakukan terhadap selisih 85 unit dan 12 surat jalan tersebut?",
        "2. Perbaikan SOP pencatatan apa yang Anda rekomendasikan kepada atasan?"
      ],
      keywords: ["rekonsiliasi", "surat jalan", "stok opname", "verifikasi", "sop", "cut-off", "audit", "tanda tangan", "kontrol"],
      rubric: ["Ketelitian Investigasi Data", "Langkah Verifikasi Lapangan", "Usulan Kontrol SOP", "Struktur Presentasi"],
      benchmark: "Melakukan stok opname ulang dan mencocokkan mutasi keluar-masuk serta konfirmasi 12 penerima barang untuk melengkapi bukti serah terima; mengusulkan larangan menutup status pengiriman di sistem tanpa unggah foto surat jalan bertanda tangan."
    },
    {
      id: "gen5-cs3",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Tingginya Kesalahan Input Staf pada SOP & Aplikasi Baru",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Perusahaan baru menerapkan aplikasi pelaporan baru 2 minggu lalu. Namun 38% laporan yang masuk dari 15 staf operasional mengandung kesalahan format sehingga harus dikembalikan dan memperlambat laporan bulanan.</p>
      `,
      writtenQuestions: [
        "1. Apa kemungkinan akar masalah tingginya kesalahan input 38% tersebut dan bagaimana cara Anda menanganinya?",
        "2. Alat bantu atau metode pendampingan praktis apa yang bisa Anda buat dalam 3 hari?"
      ],
      keywords: ["panduan", "checklist", "pelatihan", "coaching", "validasi", "template", "akar masalah", "evaluasi"],
      rubric: ["Analisis Akar Masalah", "Solusi Praktis & Cepat", "Kolaborasi & Pendampingan Rekan", "Kejelasan Presentasi"],
      benchmark: "Mengidentifikasi kolom yang paling sering salah diisi, membuat panduan ringkas 1 halaman (cheat-sheet) + template validasi sebelum kirim, serta mengadakan sesi praktik 30 menit bersama staf."
    },
    {
      id: "gen5-cs4",
      units: ["Umum (Generik PortrAI)"],
      unit: "Umum (Generik PortrAI)",
      title: "Koordinasi Proyek Klien & Keterlambatan Vendor Pada H-3 Acara",
      prepSec: 600,
      presentSec: 240,
      brief: `
        <h4>Latar Belakang Kasus</h4>
        <p>Anda menjadi PIC proyek peluncuran layanan klien korporat yang berlangsung 3 hari lagi (H-3). Vendor percetakan dan perlengkapan utama mengabarkan mesinnya rusak sehingga hanya bisa memenuhi 50% kebutuhan tepat waktu.</p>
      `,
      writtenQuestions: [
        "1. Tindakan darurat apa yang Anda ambil pada H-3 agar acara klien tetap berjalan lancar?",
        "2. Bagaimana Anda berkomunikasi dengan vendor utama dan atasan/klien?"
      ],
      keywords: ["vendor cadangan", "prioritas", "kontingensi", "komunikasi", "eskalasi", "timeline", "solusi", "komitmen"],
      rubric: ["Kecepatan Respon Krisis", "Alternatif Solusi Praktis", "Komunikasi Terbuka ke Atasan/Klien", "Struktur Presentasi"],
      benchmark: "Meminta vendor utama menyelesaikan 50% item paling krusial sambil langsung menghubungi 2 vendor cadangan untuk sisa 50%, segera melaporkan opsi ke atasan dengan estimasi biaya, dan memantau progres per 6 jam."
    }
  ],
  psychometric_general: [
    {
      aspect: "Kemampuan Berpikir (Numerik Bisnis)",
      id: "gpsy-1",
      question: "Sebuah unit bisnis mencatat pendapatan Rp 600 Juta dengan biaya operasional Rp 450 Juta. Jika bulan depan pendapatan naik 10% dan biaya berhasil diefisienkan 10%, berapakah kenaikan laba bersihnya?",
      options: ["Rp 105 Juta", "Rp 60 Juta", "Rp 90 Juta", "Rp 150 Juta"],
      answer: 0,
      explanation: "Laba awal = 600 - 450 = Rp 150 Juta. Pendapatan baru = 660 Juta, Biaya baru = 405 Juta. Laba baru = 660 - 405 = Rp 255 Juta. Kenaikan laba = 255 - 150 = Rp 105 Juta."
    },
    {
      aspect: "Kemampuan Berpikir (Analisis Rasio)",
      id: "gpsy-2",
      question: "Dari 250 pesanan pelanggan, 225 pesanan selesai tepat waktu sesuai SLA. Jika target SLA adalah minimal 92%, berapa minimal tambahan pesanan tepat waktu yang seharusnya dicapai?",
      options: ["5 pesanan", "3 pesanan", "8 pesanan", "10 pesanan"],
      answer: 0,
      explanation: "Target 92% x 250 = 230 pesanan. Saat ini baru 225 pesanan. Kekurangan = 230 - 225 = 5 pesanan."
    },
    {
      aspect: "Kemampuan Berpikir (Ketelitian Data)",
      id: "gpsy-3",
      question: "Manakah kode & nominal faktur yang 100% IDENTIK dengan referensi: `INV-2026-09481 | PT Sinar Nusantara | Rp 148.750.000`?",
      options: [
        "INV-2026-09481 | PT Sinar Nusantara | Rp 148.750.000",
        "INV-2026-09418 | PT Sinar Nusantara | Rp 148.750.000",
        "INV-2026-09481 | PT Sinar Nusantoro | Rp 148.750.000",
        "INV-2026-09481 | PT Sinar Nusantara | Rp 148.570.000"
      ],
      answer: 0,
      explanation: "Hanya opsi pertama yang sama persis di nomor faktur, ejaan nama, dan nominal."
    },
    {
      aspect: "Kemampuan Berpikir (Logika Pola)",
      id: "gpsy-4",
      question: "Deret angka: 3, 7, 15, 31, 63, ... Angka berikutnya adalah?",
      options: ["127", "125", "119", "131"],
      answer: 0,
      explanation: "Polanya (angka x 2) + 1: (63 x 2) + 1 = 127."
    },
    {
      aspect: "Kemampuan Berpikir (Logika Deduktif)",
      id: "gpsy-5",
      question: "Semua manajer proyek wajib mengikuti pelatihan manajemen risiko. Sebagian peserta pelatihan manajemen risiko berasal dari divisi IT. Kesimpulan yang PASTI benar:",
      options: [
        "Semua manajer proyek telah atau wajib mengikuti pelatihan manajemen risiko.",
        "Semua peserta dari divisi IT adalah manajer proyek.",
        "Tidak ada staf non-IT yang menjadi manajer proyek.",
        "Divisi IT tidak memiliki manajer proyek."
      ],
      answer: 0,
      explanation: "Pernyataan pertama menegaskan kewajiban mutlak bagi semua manajer proyek."
    },
    {
      aspect: "Kemampuan Berpikir (Efisiensi Kerja)",
      id: "gpsy-6",
      question: "Seorang analis punya 6 jam kerja efektif (360 menit). Ia menyusun 2 laporan (@75 menit) dan menghadiri 1 rapat (60 menit). Berapa menit tersisa untuk memproses dokumen?",
      options: ["150 menit", "120 menit", "180 menit", "135 menit"],
      answer: 0,
      explanation: "Terpakai = (2 x 75) + 60 = 210 menit. Sisa = 360 - 210 = 150 menit."
    },
    {
      aspect: "Karakteristik Kepribadian (Integritas)",
      id: "gpsy-7",
      question: "Anda melihat kesalahan perhitungan diskon pada proposal vendor yang menguntungkan target tim Anda, namun melanggar aturan perusahaan. Apa tindakan Anda?",
      options: [
        "Melaporkan dan memperbaiki kesalahan tersebut sesuai prosedur sebelum proposal disetujui.",
        "Membiarkannya karena menguntungkan target tim bulan ini.",
        "Menunggu sampai bagian audit menemukannya sendiri.",
        "Meminta vendor menandatangani tanpa revisi."
      ],
      answer: 0,
      explanation: "Integritas profesional menuntut kepatuhan aturan di atas keuntungan jangka pendek."
    },
    {
      aspect: "Faktor Motivasi (Inisiatif & Kolaborasi)",
      id: "gpsy-8",
      question: "Saat melihat alur kerja tim Anda lambat karena banyak formulir diisi berulang kali di dua sistem berbeda, apa yang paling mungkin Anda lakukan?",
      options: [
        "Mengusulkan penyederhanaan/integrasi formulir kepada atasan beserta contoh solusinya.",
        "Tetap mengikuti cara lama karena sudah menjadi kebiasaan kantor.",
        "Mengeluhkan proses tersebut kepada rekan kerja tanpa memberi usulan.",
        "Melewatkan salah satu sistem agar pekerjaan lebih cepat selesai."
      ],
      answer: 0,
      explanation: "Inisiatif perbaikan berkelanjutan dan solusi konstruktif mencerminkan motivasi kerja yang tinggi."
    }
  ]
};
