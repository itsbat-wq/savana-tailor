# Requirements Document

## Introduction

Dokumen ini mendefinisikan requirements untuk peningkatan UI pada website Savana Taylor Boutique. Fitur utama meliputi: penggantian Framer Motion dengan sistem animasi CSS berbasis Intersection Observer, perbaikan penempatan logo di navbar, penambahan section preview kategori di homepage, dan pembuatan admin dashboard untuk manajemen konten produk.

## Glossary

- **Animation_System**: Sistem animasi berbasis CSS transitions dan Intersection Observer API yang menggantikan library Framer Motion untuk scroll-based animations
- **ScrollReveal_Component**: Komponen React wrapper yang menggunakan Intersection Observer untuk mendeteksi elemen masuk viewport dan menerapkan CSS class animasi
- **Navbar**: Komponen navigasi fixed di bagian atas halaman yang berisi logo, nama brand, dan menu navigasi
- **Category_Preview**: Section pada homepage yang menampilkan preview konten dari setiap kategori layanan (Baju Dinas, Men, Women, Custom Tailor, Contact)
- **Admin_Dashboard**: Panel administrasi terpisah dari SPA publik untuk mengelola gambar produk dan konten website
- **Stagger_Animation**: Efek animasi berurutan dimana elemen-elemen child muncul satu per satu dengan delay bertahap
- **Product_Image**: Gambar produk yang ditampilkan di category preview dan dikelola melalui Admin Dashboard

## Requirements

### Requirement 1: Sistem Animasi CSS dengan Intersection Observer

**User Story:** Sebagai pengunjung website, saya ingin melihat animasi scroll yang halus saat elemen muncul di viewport, sehingga pengalaman browsing terasa lebih premium dan interaktif tanpa mengorbankan performa.

#### Acceptance Criteria

1. WHEN elemen dengan animasi fade-in memasuki viewport, THE Animation_System SHALL mentransisikan elemen dari opacity 0 ke opacity 1 sesuai durasi yang dikonfigurasi
2. WHEN elemen dengan animasi slide-up memasuki viewport, THE Animation_System SHALL mentransisikan elemen dari posisi 30px di bawah (translateY(30px), opacity 0) ke posisi asli (translateY(0), opacity 1) sesuai durasi yang dikonfigurasi
3. THE Animation_System SHALL mendukung stagger animation dimana elemen-elemen child muncul berurutan dengan delay antara 50ms hingga 300ms per child, maksimal 10 elemen child per grup
4. THE ScrollReveal_Component SHALL menggunakan Intersection Observer API untuk mendeteksi kapan elemen memasuki viewport, dan menjalankan animasi hanya satu kali (tidak mengulang saat elemen keluar dan masuk kembali ke viewport)
5. THE ScrollReveal_Component SHALL menerima props untuk jenis animasi (fade-in, slide-up) dengan default fade-in, delay (0ms hingga 1000ms) dengan default 0ms, dan threshold (0.1 hingga 1.0) dengan default 0.1
6. WHEN elemen memasuki viewport dengan threshold minimal 10%, THE ScrollReveal_Component SHALL menambahkan CSS class yang memicu animasi dan melakukan disconnect pada observer untuk elemen tersebut
7. THE Animation_System SHALL menggunakan CSS transitions dan transforms tanpa dependency pada library Framer Motion
8. WHEN pengguna memiliki preferensi reduced-motion aktif (prefers-reduced-motion: reduce), THE Animation_System SHALL menonaktifkan semua animasi dan menampilkan elemen langsung dalam state akhir (opacity 1, transform none) tanpa transisi
9. THE Animation_System SHALL menjalankan animasi dengan durasi antara 400ms hingga 800ms menggunakan easing cubic-bezier(0.4, 0, 0.2, 1)
10. IF browser tidak mendukung Intersection Observer API, THEN THE Animation_System SHALL menampilkan semua elemen dalam state akhir tanpa animasi
11. THE Animation_System SHALL menetapkan state awal elemen yang belum memasuki viewport sebagai tidak terlihat (opacity 0 untuk fade-in, opacity 0 dan translateY(30px) untuk slide-up) menggunakan CSS class sebelum animasi dipicu

### Requirement 2: Penempatan Logo Circular di Navbar

**User Story:** Sebagai pengunjung website, saya ingin melihat logo Savana Taylor yang berbentuk bulat di sebelah kiri teks "Savana Taylor", sehingga branding terlihat lebih profesional dan mudah dikenali.

#### Acceptance Criteria

1. THE Navbar SHALL menampilkan logo dalam bentuk circular (border-radius 50%) dengan ukuran width dan height 50px pada kondisi default, dan 40px pada kondisi scrolled
2. THE Navbar SHALL menampilkan teks "Savana Taylor" di sebelah kanan logo dengan jarak (gap) 12px
3. THE Navbar SHALL menampilkan teks "Savana Taylor" menggunakan font Playfair Display dengan warna gold (var(--color-gold)) dan ukuran font 1.25rem pada kondisi default serta 1rem pada kondisi scrolled
4. WHEN halaman di-scroll lebih dari 50px, THE Navbar SHALL mengecilkan logo dari 50px menjadi 40px dengan transisi CSS berdurasi 300ms menggunakan easing ease
5. THE Navbar SHALL mempertahankan alignment vertikal center antara logo dan teks "Savana Taylor" menggunakan flexbox align-items center
6. THE Navbar SHALL menampilkan logo dengan object-fit cover untuk memastikan gambar tidak terdistorsi dalam bentuk circular
7. IF gambar logo gagal dimuat, THEN THE Navbar SHALL tetap menampilkan teks "Savana Taylor" tanpa ruang kosong yang terlihat di posisi logo

### Requirement 3: Section Preview Kategori di Homepage

**User Story:** Sebagai pengunjung website, saya ingin melihat preview dari setiap kategori layanan di homepage, sehingga saya dapat dengan cepat memahami apa yang ditawarkan sebelum mengunjungi halaman detail.

#### Acceptance Criteria

1. THE Category_Preview SHALL menampilkan section preview untuk kategori: Baju Dinas, Men Collection, Women Collection, Custom Tailor, dan Contact
2. WHEN halaman homepage dimuat, THE Category_Preview SHALL menampilkan setiap section dengan judul kategori, deskripsi singkat (maksimal 120 karakter), dan grid gambar produk
3. THE Category_Preview SHALL menampilkan maksimal 4 gambar produk per kategori dalam layout grid responsif dengan 2 kolom pada viewport di bawah 768px dan 4 kolom pada viewport 768px ke atas
4. THE Category_Preview SHALL menampilkan tombol "Lihat Semua" pada setiap section yang mengarahkan ke halaman kategori terkait sesuai routing aplikasi (/baju-dinas, /men-collection, /women-collection, /custom-tailor, /contact)
5. WHEN gambar produk belum tersedia untuk suatu kategori, THE Category_Preview SHALL menampilkan placeholder image dengan teks "Coming Soon" sebagai pengganti grid gambar
6. THE Category_Preview SHALL menerapkan animasi scroll-reveal menggunakan ScrollReveal_Component pada setiap section
7. THE Category_Preview SHALL menggunakan layout alternating dimulai dari gambar di kiri dan teks di kanan pada section pertama, lalu bergantian pada section berikutnya
8. WHEN halaman homepage dimuat, THE Category_Preview SHALL mengambil data gambar produk dari API endpoint yang disediakan oleh backend Laravel dan menampilkan loading skeleton selama data belum diterima dengan batas waktu maksimal 10 detik
9. IF API endpoint gagal merespons atau waktu tunggu melebihi 10 detik, THEN THE Category_Preview SHALL menampilkan pesan error yang menginformasikan bahwa data tidak dapat dimuat beserta tombol "Coba Lagi" untuk mengulangi permintaan
10. WHILE data sedang dimuat dari API, THE Category_Preview SHALL menampilkan skeleton placeholder pada area grid gambar dengan dimensi yang sesuai layout grid

### Requirement 4: Admin Dashboard untuk Manajemen Konten

**User Story:** Sebagai admin website, saya ingin memiliki dashboard untuk mengelola gambar produk dan konten kategori, sehingga saya dapat memperbarui tampilan website tanpa mengubah kode.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL dapat diakses melalui URL path /admin yang terpisah dari SPA publik
2. THE Admin_Dashboard SHALL memerlukan autentikasi login dengan email dan password sebelum mengakses fitur apapun
3. IF kredensial login tidak valid, THEN THE Admin_Dashboard SHALL menampilkan pesan error yang mengindikasikan kredensial salah dan menolak akses
4. THE Admin_Dashboard SHALL menyediakan halaman untuk mengelola Product_Image per kategori (upload, hapus, ubah urutan) dengan maksimal 20 gambar per kategori
5. WHEN admin meng-upload gambar produk, THE Admin_Dashboard SHALL memvalidasi format file (JPG, PNG, WebP) dan ukuran maksimal 5MB sebelum menyimpan ke storage
6. IF file yang di-upload melebihi 5MB atau format tidak didukung, THEN THE Admin_Dashboard SHALL menampilkan pesan error yang menjelaskan batasan dan tidak menyimpan file tersebut
7. WHEN admin mengubah urutan gambar produk melalui drag-and-drop, THE Admin_Dashboard SHALL menyimpan urutan baru secara otomatis dan menampilkan indikator bahwa perubahan telah tersimpan
8. WHEN admin meng-upload gambar produk berhasil, THE Admin_Dashboard SHALL menyimpan file ke storage Laravel dan menyimpan metadata (nama file, kategori, urutan) ke database, lalu menampilkan konfirmasi keberhasilan
9. WHEN admin menghapus gambar produk, THE Admin_Dashboard SHALL menampilkan dialog konfirmasi sebelum menghapus file dari storage dan metadata dari database
10. THE Admin_Dashboard SHALL menyediakan API endpoint RESTful publik (tanpa autentikasi) yang digunakan oleh Category_Preview untuk mengambil data gambar produk berupa daftar gambar per kategori beserta urutan tampilannya
11. IF operasi upload atau hapus gagal karena error server, THEN THE Admin_Dashboard SHALL menampilkan pesan error yang mengindikasikan kegagalan operasi dan mempertahankan state data sebelumnya

### Requirement 5: Penghapusan Dependency Framer Motion

**User Story:** Sebagai developer, saya ingin menghapus package framer-motion dari project, sehingga bundle size berkurang dan tidak ada unused dependency.

#### Acceptance Criteria

1. WHEN sistem animasi CSS sesuai Requirement 1 sudah terimplementasi dan mencakup animasi fade-in, slide-up, dan stagger, THE Animation_System SHALL menggantikan seluruh penggunaan framer-motion yang ada di codebase dengan komponen ScrollReveal_Component dan CSS transitions
2. WHEN package framer-motion dihapus dari package.json, THE Animation_System SHALL memastikan tidak ada import atau require statement yang mereferensikan modul "framer-motion" tersisa di seluruh file sumber (.js, .jsx, .ts, .tsx) dalam project
3. WHEN package framer-motion dihapus dari package.json, THE Animation_System SHALL memastikan proses build (vite build) berhasil tanpa error resolusi modul terkait framer-motion
4. WHEN package framer-motion dihapus dari package.json, THE Animation_System SHALL memastikan seluruh halaman publik (HomePage, AboutPage, ContactPage, BajuDinasPage, MenCollectionPage, WomenCollectionPage, CustomTailorPage, RentalPage, ProductDetailPage) dapat dirender tanpa error di browser console dan animasi scroll-reveal tetap berjalan sesuai spesifikasi Requirement 1
5. WHEN package framer-motion dihapus dari dependencies, THE Animation_System SHALL memastikan entry framer-motion juga dihapus dari package-lock.json sehingga tidak ada artefak dependency yang tersisa
