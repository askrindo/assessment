window.DATA_BOD4 = {
  gradeId: "BOD-4",
  title: "BOD – 4 (Job Grade 12–14)",
  headcount: 523,
  roleLabel: "Kepala Bagian / Manajer Unit / Technical Head / Branch Manager",
  successProfile: [
    "Digital Savvy",
    "Business Awareness",
    "Customer Orientation",
    "Building Partnerships",
    "Analysis & Judgment",
    "Managing Work",
    "Continuous Improvement",
    "Coaching",
    "Adaptability",
    "Valuing Differences",
    "Work Standards"
  ],
  methods: [
    { id: "potrai", name: "PotrAI Simulation (180–240 menit)", desc: "Simulasi 5 modul terintegrasi: Email, Chat Roleplay AI, Call/Virtual Meeting, Documents (Analisa Bisnis), & AI Assistant." },
    { id: "cap", name: "CAP — Career Achievement Portfolio (60–75 menit)", desc: "Pertanyaan terstruktur berbasis pengalaman kerja (Pencapaian, Tantangan, Tindakan, Hasil) & bukti perilaku." },
    { id: "personality", name: "Personality Test — OCEAN (30–40 menit)", desc: "Inventori 5 dimensi OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)." }
  ],
  potrai: [
    {
      id: "bod4-uw1",
      units: ["Underwriting", "Technical Head"],
      unit: "Underwriting / Technical Head",
      title: "Dilema Approval Performance Bond Rp 15 Miliar & Counter-Guarantee",
      durationSec: 1500,
      email: {
        from: "Kepala Cabang Wilayah X <kacab.x@asuransi-kredit.co.id>",
        subject: "Mohon Approval Segera: Performance Bond Kontraktor PT Mega Konstruksi (Rp 15 M)",
        body: `<p>Rekan Manajer Underwriting/Technical Head, kami butuh persetujuan hari ini untuk <em>Performance Bond</em> Rp 15 M agar target premi Non-KUR tercapai. Kontraktor pernah 1x klaim macet 2 tahun lalu (subrogasi baru tertagih 40%), dan sertifikat tanah <em>counter guarantee</em> masih proses appraisal.</p>`
      },
      chat: {
        partnerName: "Kepala Cabang / Agen Pemasaran (AI Roleplay)",
        opening: "Kalau ditolak hari ini, kontraktor akan pindah ke asuransi lain dan target premi Non-KUR cabang kita gagal.",
        followUp: "Baik, kalau tidak bisa langsung disetujui, syarat apa yang bisa dipenuhi hari ini supaya polis tetap bisa diproses?"
      },
      call: {
        partnerName: "Analis Underwriting Junior (Virtual Call)",
        prompt: "Analis Anda ragu karena ditekan pihak pemasaran untuk meloloskan berkas sebelum appraisal selesai. Berikan arahan dan coaching yang tegas."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Matriks Kelayakan Suretyship & Reasuransi",
        brief: "Susun analisa risiko penerbitan Performance Bond Rp 15 M (retensi sendiri Rp 5 M, reasuransi Rp 10 M) dan opsi agunan balik pengganti."
      },
      aiHints: [
        { q: "Alternatif syarat cepat", a: "Pending penerbitan sampai sisa subrogasi 60% dilunasi dan appraisal selesai, atau minta jaminan tunai/bank garansi sementara." }
      ],
      keywords: ["pending", "tolak", "subrogasi", "appraisal", "counter guarantee", "reasuransi", "retensi", "coaching", "underwriting"],
      rubric: ["Ketegasan Prinsip Underwriting", "Solusi Alternatif Bisnis yang Aman", "Coaching & Perlindungan Analis", "Analisa Kapasitas Risiko"],
      benchmark: "Menahan penerbitan Performance Bond sampai kewajiban subrogasi tuntas dan appraisal agunan selesai (atau meminta bank garansi/cash collateral pengganti), serta membimbing analis agar tetap objektif."
    },
    {
      id: "bod4-uw2",
      units: ["Underwriting", "Technical Head"],
      unit: "Underwriting / Technical Head",
      title: "Perang Tarif Suretyship & Seleksi Risiko Asuransi Umum",
      durationSec: 1500,
      email: {
        from: "Koordinator Pemasaran <pemasaran@asuransi-kredit.co.id>",
        subject: "Permintaan Diskon Tarif IJP 25% Tanpa Agunan Balik untuk 12 Kontraktor",
        body: `<p>Kompetitor menawarkan tarif IJP 25% lebih murah tanpa agunan balik. Agen meminta diskon serupa atau mengancam memindahkan polis Asuransi Kebakaran &amp; CAR-nya.</p>`
      },
      chat: {
        partnerName: "Mitra Agen Utama (AI Roleplay)",
        opening: "Kalau tarif tidak disamakan dengan kompetitor, besok 12 kontraktor dan polis Asuransi Umum saya pindah semua ya.",
        followUp: "Selain tarif, layanan apa yang bisa Bapak berikan agar kontraktor saya tetap memilih perusahaan Bapak?"
      },
      call: {
        partnerName: "Supervisor Teknik Cabang (Virtual Call)",
        prompt: "Koordinasikan paket bundling Suretyship + CAR/EAR dengan percepatan SLA sertifikat digital 1 hari kerja."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Simulasi Margin Bundling vs Perang Tarif",
        brief: "Jelaskan dampak perang tarif terhadap Combined Ratio & adverse selection, serta skema bundling bermargin sehat."
      },
      aiHints: [
        { q: "Dampak perang tarif", a: "Menurunkan premi sementara eksposur klaim tetap 100%, memicu adverse selection (kontraktor berisiko tinggi masuk)." }
      ],
      keywords: ["tarif", "margin", "bundling", "sla", "digital", "adverse selection", "car", "ear", "track record"],
      rubric: ["Disiplin Pricing & Aktuaria", "Negosiasi Nilai Tambah", "Sinergi Pemasaran–Teknik", "Analisa Combined Ratio"],
      benchmark: "Menolak perang tarif yang merusak margin, lalu menawarkan paket bundling Suretyship + CAR/EAR dengan SLA penerbitan digital cepat untuk kontraktor sehat."
    },
    {
      id: "bod4-kl1",
      units: ["Klaim", "Technical Head"],
      unit: "Klaim / Technical Head",
      title: "Anomali Klaim KUR Mikro & Pengelolaan Beban Analis Klaim",
      durationSec: 1500,
      email: {
        from: "Supervisor Verifikasi Klaim <verifikasi@asuransi-kredit.co.id>",
        subject: "Lonjakan Klaim KUR Mikro Bank Mitra X (Macet Seragam Bulan ke-4)",
        body: `<p>Terdapat 45 berkas klaim KUR Mikro dari Bank Mitra X dengan pola macet seragam di bulan ke-4 dan indikasi dokumen usaha tidak lengkap saat sampling. Sementara beban 4 analis mencapai 200 berkas/analis/bulan sehingga SLA turun ke 70%.</p>`
      },
      chat: {
        partnerName: "Relationship Manager Bank Mitra X (AI Roleplay)",
        opening: "Kami minta pencairan 45 klaim KUR bulan ini dipercepat sesuai SLA PKS karena cabang kami sedang kejar target NPF.",
        followUp: "Kalau ditunda karena sampling dokumen, nasabah dan cabang kami komplain. Bisa dibayar dulu 50% sambil dokumen menyusul?"
      },
      call: {
        partnerName: "Analis Klaim Junior (Virtual Call)",
        prompt: "Bimbing analis Anda dalam melakukan verifikasi berbasis bukti dan memisahkan berkas valid dari berkas anomali."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Triase Klaim & Kapasitas Analis SLA >= 90%",
        brief: "Kapasitas ideal 1 analis = 150 berkas/bulan. Hitung kebutuhan tambahan analis dari 800 total berkas dan susun SOP joint-audit."
      },
      aiHints: [
        { q: "Hitung tambahan analis", a: "800 / 150 = 5,33 -> butuh 6 analis (tambah 2 analis baru atau terapkan auto-triase)." }
      ],
      keywords: ["sampling", "audit", "pks", "sla", "triase", "kapasitas", "valid", "pending", "coaching"],
      rubric: ["Kontrol Kepatuhan Klaim", "Negosiasi PKS dengan Bank", "Perencanaan Kapasitas Tim", "Coaching Analis"],
      benchmark: "Memproses klaim yang dokumennya valid, menahan batch anomali untuk joint-audit bersama Bank Mitra, serta menambah 2 analis / menerapkan triase agar SLA kembali >= 90%."
    },
    {
      id: "bod4-kl2",
      units: ["Klaim", "Technical Head"],
      unit: "Klaim / Technical Head",
      title: "Permohonan Interim Payment 50% Klaim Kebakaran & Pengangkutan Rp 4,2 M",
      durationSec: 1500,
      email: {
        from: "Klaim Officer Asuransi Umum <klaim.umum@asuransi-kredit.co.id>",
        subject: "Desakan Interim Payment 50% Tertanggung Kebakaran Pabrik",
        body: `<p>Tertanggung Asuransi Kebakaran &amp; Pengangkutan (total klaim Rp 4,2 Miliar) mendesak pembayaran di muka 50% sebelum laporan final <em>loss adjuster</em> independen terbit, dengan alasan butuh dana renovasi cepat.</p>`
      },
      chat: {
        partnerName: "Direktur Perusahaan Tertanggung (AI Roleplay)",
        opening: "Kami nasabah lama dengan premi besar. Tolong cairkan 50% dulu minggu ini supaya pabrik bisa segera beroperasi.",
        followUp: "Oke, apa saja syarat dokumen yang harus kami penuhi agar interim payment bisa disetujui?"
      },
      call: {
        partnerName: "Loss Adjuster Independen (Virtual Call)",
        prompt: "Konfirmasikan status liability polis, kepatuhan warranty proteksi kebakaran, dan estimasi nilai minimum kerugian."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: SOP Persetujuan Interim Payment Asuransi Umum",
        brief: "Susun syarat kelayakan interim payment, batas maksimal persentase aman, dan jadwal penyelesaian final."
      },
      aiHints: [
        { q: "Syarat mutlak interim payment", a: "Liability polis terkonfirmasi jelas + rekomendasi tertulis nilai minimum kerugian dari loss adjuster." }
      ],
      keywords: ["interim", "loss adjuster", "liability", "polis", "warranty", "estimasi", "klaim", "prosedur"],
      rubric: ["Kepatuhan Polis Asuransi Umum", "Komunikasi Empatik & Tegas ke Nasabah", "Koordinasi Loss Adjuster", "Kualitas SOP Klaim"],
      benchmark: "Hanya memproses interim payment setelah liability polis terkonfirmasi tidak ada pelanggaran warranty dan terdapat rekomendasi tertulis nilai minimum kerugian dari loss adjuster."
    },
    {
      id: "bod4-sub1",
      units: ["Subrogasi"],
      unit: "Subrogasi",
      title: "Optimalisasi Recovery Subrogasi Berbasis Pareto 80/20",
      durationSec: 1500,
      email: {
        from: "Kepala Bagian Keuangan & Akuntansi <keuangan@asuransi-kredit.co.id>",
        subject: "Realisasi Recovery Subrogasi Baru 52% — Evaluasi Strategi Penagihan",
        body: `<p>Hingga Kuartal III, tim subrogasi baru menagih Rp 14,4 Miliar dari target tahunan Rp 20 Miliar (25% dari total klaim Rp 80 M). Tim terlalu banyak menghabiskan waktu pada debitur berplafon kecil yang sulit dihubungi.</p>`
      },
      chat: {
        partnerName: "Staf Senior Subrogasi (AI Roleplay)",
        opening: "Pak/Bu, selama ini kami menagih urut sesuai tanggal masuk berkas. Kalau diubah jadi prioritas plafon besar (Pareto), pekerjaan rutin kami jadi berantakan.",
        followUp: "Baik, kalau dibagi klaster, bagaimana pembagian target antara yang plafon besar dan kecil?"
      },
      call: {
        partnerName: "Petugas Remedial Bank Mitra (Virtual Call)",
        prompt: "Koordinasikan jadwal penagihan bersama (joint collection) dan pencocokan mutasi setoran subrogasi."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Rencana Aksi Mengejar Kekurangan Rp 5,6 M Kuartal IV",
        brief: "Susun strategi segmentasi Pareto 80/20, eksekusi agunan eksposur besar, dan target mingguan tim."
      },
      aiHints: [
        { q: "Kekurangan target Kuartal IV", a: "Target Rp 20 M - Rp 14,4 M = Rp 5,6 Miliar yang harus dikejar dari debitur klaster prioritas." }
      ],
      keywords: ["pareto", "subrogasi", "recovery", "segmentasi", "joint collection", "agunan", "coaching", "kpi", "5,6"],
      rubric: ["Strategi Prioritas Pareto", "Change Leadership & Coaching Staf", "Sinergi Penagihan Bank Mitra", "Ketajaman Target Kuantitatif"],
      benchmark: "Menerapkan segmentasi Pareto 80/20 untuk mengejar kekurangan Rp 5,6 M dari debitur eksposur besar & eksekusi agunan, serta melakukan coaching kepada staf senior."
    },
    {
      id: "bod4-sub2",
      units: ["Subrogasi"],
      unit: "Subrogasi",
      title: "Penyelesaian Sengketa Eksekusi Counter-Guarantee Suretyship Macet",
      durationSec: 1500,
      email: {
        from: "Divisi Hukum <hukum@asuransi-kredit.co.id>",
        subject: "Kontraktor Menolak Penyerahan Agunan Balik Klaim Rp 6,5 Miliar",
        body: `<p>Setelah perusahaan membayar klaim Performance Bond Rp 6,5 Miliar, pihak kontraktor (principal) menunda penyerahan agunan balik dan meminta restrukturisasi cicilan selama 5 tahun tanpa bunga.</p>`
      },
      chat: {
        partnerName: "Direktur Kontraktor / Principal (AI Roleplay)",
        opening: "Arus kas kami sedang seret. Kami mau bayar subrogasi Rp 6,5 Miliar tapi dicicil 5 tahun tanpa bunga dan tanpa sita aset.",
        followUp: "Kalau perusahaan Bapak memaksa eksekusi aset sekarang, kami akan ajukan gugatan perdata."
      },
      call: {
        partnerName: "Tim Legal & Appraisal Internal (Virtual Call)",
        prompt: "Evaluasi kekuatan hukum perjanjian ganti rugi (indemnity agreement) dan siapkan skema negosiasi restrukturisasi yang aman."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Opsi Restrukturisasi vs Eksekusi Agunan",
        brief: "Bandingkan NPV restrukturisasi maksimal 24 bulan dengan pengikatan hak tanggungan vs biaya & waktu eksekusi lelang."
      },
      aiHints: [
        { q: "Syarat jika menyetujui cicilan", a: "Wajib ada pengakuan utang notariil, pengikatan agunan sempurna (HT/Fidusia), uang muka minimal 20%, dan tenor maksimal 24 bulan." }
      ],
      keywords: ["subrogasi", "indemnity", "agunan", "restrukturisasi", "notariil", "hak tanggungan", "lelang", "npv"],
      rubric: ["Ketegasan Hukum & Perlindungan Aset", "Negosiasi Penyelesaian Utang", "Analisa Finansial Pemulihan", "Koordinasi Legal"],
      benchmark: "Menolak tenor 5 tahun tanpa jaminan; menawarkan restrukturisasi maksimal 24 bulan hanya jika disertai akta pengakuan utang notariil, uang muka, dan pengikatan agunan sempurna, atau lanjut eksekusi hukum."
    },
    {
      id: "bod4-keu1",
      units: ["Keuangan"],
      unit: "Keuangan",
      title: "Rekonsiliasi Piutang Premi, Cash-Call Reasuransi, & Efisiensi Biaya",
      durationSec: 1500,
      email: {
        from: "Kepala Divisi Keuangan <kadiv.keu@asuransi-kredit.co.id>",
        subject: "Piutang Premi Aging > 90 Hari Rp 18 Miliar & Pembayaran Klaim Mendesak",
        body: `<p>Terdapat piutang premi Suretyship &amp; Asuransi Umum berumur &gt; 90 hari sebesar Rp 18 Miliar yang belum tertagih dari cabang/broker, sementara klaim jatuh tempo minggu ini Rp 24 Miliar. Di sisi lain, <em>cash-call</em> ke reasuransi senilai Rp 9 Miliar belum ditindaklanjuti.</p>`
      },
      chat: {
        partnerName: "Kepala Cabang / Koordinator Broker (AI Roleplay)",
        opening: "Nasabah kontraktor belum bayar premi karena proyeknya belum cair terminnya. Bisa tunggu 2 bulan lagi sebelum polis dibatalkan?",
        followUp: "Kalau polis langsung dibatalkan sesuai klausul PPC (Premium Payment Clause), hubungan kita dengan agen bisa rusak."
      },
      call: {
        partnerName: "Staf Treasury & Akuntansi Reasuransi (Virtual Call)",
        prompt: "Instruksikan percepatan penagihan cash-call reasuransi Rp 9 Miliar dan penyusunan proyeksi arus kas 30 hari."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Manajemen Arus Kas & Aging Piutang Premi",
        brief: "Susun prioritas penagihan piutang premi (penerapan Premium Payment Clause / PPC), percepatan cash-call reasuransi, dan efisiensi biaya operasional."
      },
      aiHints: [
        { q: "Risiko piutang premi > 90 hari", a: "Tidak diakui sebagai aset yang diperkenankan (non-admitted asset) dalam perhitungan RBC, dan melanggar ketentuan PPC." }
      ],
      keywords: ["piutang premi", "aging", "ppc", "cash call", "reasuransi", "arus kas", "likuiditas", "rbc", "admitted asset"],
      rubric: ["Pengendalian Arus Kas & Likuiditas", "Kepatuhan Klausul PPC & Regulasi RBC", "Koordinasi Penagihan dengan Cabang/Reasuransi", "Ketajaman Analisa Keuangan"],
      benchmark: "Segera menagih cash-call reasuransi Rp 9 Miliar untuk menutup klaim minggu ini, menerapkan klausul PPC secara disiplin pada piutang > 90 hari (peringatan tertulis & penjadwalan bayar), serta menjaga rasio aset lancar."
    },
    {
      id: "bod4-keu2",
      units: ["Keuangan"],
      unit: "Keuangan",
      title: "Optimalisasi Anggaran Operasional Cabang & Rekonsiliasi Mutasi Bank",
      durationSec: 1500,
      email: {
        from: "Tim Audit & Kontrol Keuangan <kontrol.keu@asuransi-kredit.co.id>",
        subject: "Realisasi Biaya Akuisisi & Operasional Melebihi RKAP +22% & Selisih Rekon",
        body: `<p>Biaya akuisisi dan operasional unit melebihi anggaran RKAP sebesar +22% akibat komisi agen tidak seragam dan lembur berlebih. Selain itu, terdapat selisih pencatatan mutasi rekening penampung subrogasi sebesar Rp 320 Juta yang belum direkonsiliasi.</p>`
      },
      chat: {
        partnerName: "Manajer Pemasaran (AI Roleplay)",
        opening: "Kami terpaksa menaikkan biaya entertain dan fee pemasaran supaya target premi Non-KUR tercapai. Jangan dipotong anggarannya ya.",
        followUp: "Kalau dibatasi sesuai RKAP, bagaimana kami bisa tetap menjaga motivasi agen?"
      },
      call: {
        partnerName: "Supervisor Akuntansi & Perbendaharaan (Virtual Call)",
        prompt: "Arahkan penyelesaian rekonsiliasi selisih Rp 320 Juta dalam 48 jam dan pengetatan verifikasi pengeluaran."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Rencana Pengendalian Expense Ratio & Rekonsiliasi",
        brief: "Susun strategi menurunkan Expense Ratio kembali ke target RKAP dan SOP cut-off rekonsiliasi bank mingguan."
      },
      aiHints: [
        { q: "Solusi agar pemasaran tetap termotivasi tanpa langgar RKAP", a: "Alihkan anggaran ke skema insentif berbasis kualitas (premi lunas + loss ratio rendah) bukan biaya entertain tanpa kontrol." }
      ],
      keywords: ["rkap", "expense ratio", "rekonsiliasi", "mutasi", "anggaran", "komisi", "efisiensi", "cut-off", "audit"],
      rubric: ["Disiplin Anggaran RKAP", "Ketelitian Rekonsiliasi Keuangan", "Negosiasi Lintas Unit (Keuangan vs Pemasaran)", "Perbaikan Kontrol Pengeluaran"],
      benchmark: "Menyelesaikan rekonsiliasi Rp 320 Juta dalam 48 jam dengan cut-off mingguan, mengunci plafon biaya sesuai RKAP, dan mengarahkan anggaran pemasaran ke insentif berbasis premi tertagih & kualitas risiko."
    },
    {
      id: "bod4-bm1",
      units: ["Branch Manager"],
      unit: "Branch Manager",
      title: "Manajemen Cabang Terpadu: Target Premi, SLA Teknik, & Konflik Tim",
      durationSec: 1500,
      email: {
        from: "Kepala Wilayah <kawil@asuransi-kredit.co.id>",
        subject: "Cabang Anda Peringkat Terbawah Pencapaian Non-KUR & Banyak Komplain SLA",
        body: `<p>Sebagai Branch Manager baru, Anda mendapati tim Pemasaran dan tim Teknik (Underwriting/Klaim) di cabang saling menyalahkan, piutang premi menumpuk, dan Bank Mitra mengancam mengurangi porsi bisnis karena SLA lambat.</p>`
      },
      chat: {
        partnerName: "Pimpinan Cabang Bank Mitra (AI Roleplay)",
        opening: "Sudah 2 minggu permohonan Suretyship & Asuransi Kebakaran nasabah kami belum terbit dari cabang Anda. Kami kecewa sekali.",
        followUp: "Kami butuh komitmen tanggal pasti dan PIC yang jelas kalau ada kekurangan dokumen."
      },
      call: {
        partnerName: "Seluruh Kepala Seksi Cabang (Pemasaran, Teknik, Keuangan) (Virtual Call)",
        prompt: "Pimpin briefing cabang untuk menghentikan saling menyalahkan dan menetapkan alur kerja harian bersama."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Program Kerja 60 Hari Cabang",
        brief: "Susun target mingguan pencapaian Non-KUR, penyelesaian tunggakan SLA, dan penagihan piutang premi cabang."
      },
      aiHints: [
        { q: "Langkah cepat 7 hari pertama Branch Manager", a: "Lakukan morning briefing harian 15 menit (Pemasaran–Teknik–Keuangan), selesaikan backlog berkas lengkap, dan kunjungi langsung Bank Mitra." }
      ],
      keywords: ["branch", "cabang", "sla", "non-kur", "bank mitra", "koordinasi", "backlog", "piutang", "kepemimpinan"],
      rubric: ["Kepemimpinan Cabang Lintas Fungsi", "Pemulihan Kepercayaan Bank Mitra", "Eksekusi Target Bisnis & Teknik", "Penyelesaian Konflik Tim"],
      benchmark: "Mengunjungi langsung Bank Mitra untuk komitmen SLA berbasis kelengkapan dokumen, menyatukan Pemasaran–Teknik–Keuangan lewat daily huddle dan checklist bersama, serta memonitor penyelesaian backlog tiap minggu."
    },
    {
      id: "bod4-mr1",
      units: ["Manajemen Risiko"],
      unit: "Manajemen Risiko",
      title: "Temuan Audit Internal atas Deviasi SLIK OJK di Cabang",
      durationSec: 1500,
      email: {
        from: "Tim Audit Internal <audit@asuransi-kredit.co.id>",
        subject: "Notisi Temuan: 18 Polis Kredit Konstruksi Terbit Tanpa SLIK OJK",
        body: `<p>Ditemukan 18 polis Kredit Konstruksi Non-KUR di Cabang Y terbit tanpa melampirkan SLIK OJK terbaru dengan alasan gangguan sistem akhir bulan. Dua debitur mulai menunggak.</p>`
      },
      chat: {
        partnerName: "Kepala Cabang Y (AI Roleplay)",
        opening: "Waktu itu sistem lagi error dan deadline kejar target. Lagipula cabang lain juga kadang menyusulkan dokumen saat akhir bulan.",
        followUp: "Oke, tapi untuk 16 polis lainnya yang masih lancar, apakah tetap perlu kami tarik SLIK-nya sekarang?"
      },
      call: {
        partnerName: "Supervisor Operasional & IT (Virtual Call)",
        prompt: "Arahkan penerapan hard-stop pada aplikasi underwriting agar polis tidak bisa terbit tanpa unggahan SLIK valid."
      },
      documents: {
        title: "Dokumen Analisa Bisnis: Action Plan Tindak Lanjut Temuan Audit",
        brief: "Susun langkah remedial 18 polis bermasalah, penguatan kontrol sistem (hard-control), dan monitoring bulanan."
      },
      aiHints: [
        { q: "Prinsip respons", a: "Tolak normalisasi penyimpangan; semua 18 polis wajib tarik SLIK retroaktif dan dievaluasi risikonya." }
      ],
      keywords: ["slik", "audit", "hard-stop", "kontrol", "remedial", "retroaktif", "kepatuhan", "monitoring"],
      rubric: ["Integritas & Kepatuhan", "Perbaikan Kontrol Sistemik", "Penanganan Remedial", "Ketegasan Komunikasi"],
      benchmark: "Menarik SLIK retroaktif seluruh 18 polis, melakukan remedial 2 debitur menunggak, menerapkan hard-stop sistem IT, dan melakukan pembinaan tertulis."
    }
  ],
  cap: [
    {
      id: "bod4-cap1",
      competency: "Analysis & Judgment & Business Awareness",
      prompt: "Ceritakan satu situasi kompleks di mana Anda harus menganalisis data secara mendalam dan mengambil keputusan tepat antara target bisnis dan risiko/kepatuhan.",
      indicators: ["Analysis & Judgment (mengurai akar masalah & opsi logis)", "Business Awareness (memahami dampak bisnis & profitabilitas)", "Keputusan tepat waktu berbasis fakta", "Dampak terukur pada kinerja unit"]
    },
    {
      id: "bod4-cap2",
      competency: "Customer Orientation & Building Partnerships",
      prompt: "Ceritakan pengalaman Anda menangani keluhan atau perbedaan kepentingan yang tajam dengan pelanggan/Bank Mitra/unit lain hingga tercapai solusi kerja sama yang saling menguntungkan.",
      indicators: ["Customer Orientation (responsif & fokus solusi nasabah/mitra)", "Building Partnerships (kolaborasi lintas unit/eksternal)", "Menjaga kepatuhan tanpa merusak relasi", "Kepuasan mitra/retensi bisnis meningkat"]
    },
    {
      id: "bod4-cap3",
      competency: "Digital Savvy & Continuous Improvement",
      prompt: "Ceritakan inisiatif perbaikan proses kerja atau pemanfaatan perangkat/sistem digital yang Anda lakukan di unit Anda untuk memangkas hambatan operasional.",
      indicators: ["Digital Savvy (memanfaatkan sistem/data/otomasi kerja)", "Continuous Improvement (mengidentifikasi & memperbaiki bottleneck)", "Penerapan konsisten di tim", "Efisiensi waktu/SLA/akurasi terukur"]
    },
    {
      id: "bod4-cap4",
      competency: "Managing Work & Work Standards",
      prompt: "Ceritakan bagaimana Anda mengelola beban kerja tinggi dengan tenggat ketat di unit Anda sambil memastikan standar kualitas dan kepatuhan (zero defect/audit) tetap terjaga.",
      indicators: ["Managing Work (penjadwalan prioritas & alokasi tugas tim)", "Work Standards (tidak berkompromi pada kualitas/SOP)", "Monitoring progres harian", "SLA dan standar mutu tercapai"]
    },
    {
      id: "bod4-cap5",
      competency: "Coaching & Valuing Differences",
      prompt: "Ceritakan pengalaman Anda membimbing anggota tim dengan latar belakang/gaya kerja yang beragam saat mereka mengalami kendala kinerja atau konflik internal.",
      indicators: ["Coaching (membimbing langkah teknis & memberi umpan balik konstruktif)", "Valuing Differences (menghargai keberagaman karakter & ide tim)", "Menciptakan kolaborasi yang harmonis", "Peningkatan kompetensi & performa staf"]
    },
    {
      id: "bod4-cap6",
      competency: "Adaptability",
      prompt: "Ceritakan situasi ketika terjadi perubahan mendadak (kebijakan baru, sistem baru, atau pergeseran target mendadak) dan bagaimana Anda menyesuaikan strategi tim dengan cepat.",
      indicators: ["Adaptability (tetap tenang & fleksibel menghadapi perubahan)", "Cepat menyesuaikan rencana kerja", "Membantu tim beradaptasi tanpa panik", "Target tetap tercapai di tengah perubahan"]
    }
  ],
  personality: [
    { id: "o4-1", dim: "Openness", text: "Saya senang mencari cara-cara baru dan lebih efisien dalam menjalankan tugas di unit saya.", reverse: false },
    { id: "o4-2", dim: "Openness", text: "Saya merasa kurang nyaman jika SOP atau sistem kerja di unit saya sering diperbarui.", reverse: true },
    { id: "o4-3", dim: "Openness", text: "Saya terbuka mempelajari teknik analisis data terbaru untuk meningkatkan kualitas keputusan kerja.", reverse: false },
    { id: "c4-1", dim: "Conscientiousness", text: "Saya selalu memastikan setiap berkas atau transaksi memenuhi seluruh checklist kepatuhan sebelum disetujui.", reverse: false },
    { id: "c4-2", dim: "Conscientiousness", text: "Terkadang saya menunda pencatatan administrasi karena lebih fokus pada hasil cepat.", reverse: true },
    { id: "c4-3", dim: "Conscientiousness", text: "Saya memantau jadwal SLA dan target tim setiap hari agar tidak ada pekerjaan yang melewati batas waktu.", reverse: false },
    { id: "e4-1", dim: "Extraversion", text: "Saya proaktif membangun komunikasi dengan Bank Mitra, Cabang, dan lintas bagian untuk mempercepat penyelesaian masalah.", reverse: false },
    { id: "e4-2", dim: "Extraversion", text: "Saya lebih suka berkomunikasi lewat pesan singkat daripada berdiskusi langsung untuk menyelesaikan konflik kerja.", reverse: true },
    { id: "e4-3", dim: "Extraversion", text: "Saya merasa percaya diri saat mempresentasikan laporan kinerja unit di hadapan pimpinan.", reverse: false },
    { id: "a4-1", dim: "Agreeableness", text: "Saya mendengarkan sudut pandang rekan lintas unit dengan empati sebelum menyampaikan keputusan tegas.", reverse: false },
    { id: "a4-2", dim: "Agreeableness", text: "Saya mudah terpancing emosi ketika ada pihak lain yang mendesak saya melanggar prosedur.", reverse: true },
    { id: "a4-3", dim: "Agreeableness", text: "Saya lebih mengutamakan solusi kolaboratif daripada mencari siapa yang salah saat terjadi kendala tim.", reverse: false },
    { id: "n4-1", dim: "Neuroticism", text: "Tumpukan target dan komplain mitra di akhir bulan sering membuat saya kewalahan secara emosional.", reverse: true },
    { id: "n4-2", dim: "Neuroticism", text: "Saya mampu menjaga ketenangan dan berpikir jernih saat menghadapi eskalasi mendadak dari atasan maupun mitra.", reverse: false },
    { id: "n4-3", dim: "Neuroticism", text: "Saya sering merasa cemas berlebihan ketika ada pekerjaan bernilai besar yang tertunda.", reverse: true }
  ]
};
