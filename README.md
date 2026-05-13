# Savana Taylor Boutique - Headless Web Application

Proyek ini adalah sebuah aplikasi web e-commerce *headless* yang dirancang khusus untuk Savana Taylor Boutique. Dibangun menggunakan arsitektur modern di mana backend dan frontend berjalan secara terpisah namun terintegrasi via API.

## 🛠️ Teknologi yang Digunakan

*   **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, Framer Motion, Zustand, React Query.
*   **Backend:** Laravel 11/13, PHP 8.3+, MySQL/MariaDB, Laravel Sanctum (Token-based Auth).
*   **Arsitektur:** Monorepo (Frontend Next.js berada di dalam folder `frontend/` dari repositori Laravel utama).

---

## 📋 Persyaratan Sistem (Prerequisites)

Sebelum mulai menjalankan proyek ini, pastikan sistem Anda sudah terinstal perangkat lunak berikut:

*   **PHP:** Versi 8.2 atau 8.3 (Sangat direkomendasikan PHP 8.3).
*   **Node.js:** Versi 18.x atau yang lebih baru.
*   **Composer:** Manajer dependensi untuk PHP.
*   **MySQL / MariaDB:** Database server (contoh: bisa menggunakan Laragon/XAMPP).
*   **Git:** Untuk version control.

---

## 🚀 Cara Menjalankan Proyek di Lingkungan Lokal (Development)

Proyek ini terdiri dari dua bagian (Backend dan Frontend) yang harus dijalankan secara bersamaan. Ikuti langkah-langkah berikut secara berurutan.

### Tahap 1: Setup Backend (Laravel API)

1.  Buka terminal/command prompt dan arahkan ke direktori root proyek (`savana-tailor`).
2.  Instal dependensi PHP menggunakan Composer:
    ```bash
    composer install
    ```
3.  Salin file konfigurasi environment:
    ```bash
    cp .env.example .env
    ```
4.  Buka file `.env` dan atur koneksi database Anda:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=savana
    DB_USERNAME=root
    DB_PASSWORD=
    ```
5.  Generate *Application Key* Laravel:
    ```bash
    php artisan key:generate
    ```
6.  Jalankan migrasi database dan *seeding* (membuat tabel dan mengisi data awal/dummy):
    ```bash
    php artisan migrate:fresh --seed
    ```
7.  Jalankan server backend Laravel (secara default berjalan di port 8000):
    ```bash
    php artisan serve
    ```
    *(Biarkan terminal ini tetap terbuka).*

---

### Tahap 2: Setup Frontend (Next.js)

1.  Buka tab/jendela terminal **baru** (jangan tutup terminal Laravel).
2.  Arahkan ke folder frontend:
    ```bash
    cd frontend
    ```
3.  Instal dependensi Node.js menggunakan NPM:
    ```bash
    npm install
    ```
4.  Pastikan ada file `.env.local` di dalam folder `frontend/` dengan isi:
    ```env
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
    NEXT_PUBLIC_STORAGE_URL=http://127.0.0.1:8000
    ```
5.  Jalankan server pengembangan Next.js (berjalan di port 3000): **pastikan cd frontend dahulu**
    ```bash
    npm run dev
    ```
    *(Biarkan terminal ini tetap terbuka).*

---

## 💻 Cara Mengakses Aplikasi

Setelah kedua server di atas berjalan, Anda dapat mengakses proyek melalui browser:

*   **Website Publik (Frontend):** `http://localhost:3000`
*   **Admin Panel (Frontend):** `http://localhost:3000/admin/login`
*   **Backend API Endpoint:** `http://127.0.0.1:8000/api`

# Danger!!!!
bawah yg d comment 
<!-- ### Kredensial Admin Default
Karena Anda telah menjalankan `php artisan migrate --seed`, akun admin berikut telah otomatis dibuat:

*   **Email:** `admin@savanataylor.com`
*   **Password:** `savana2026` -->

---

## 📁 Struktur Direktori Utama

```text
savana-tailor/
│
├── app/                  # Logika aplikasi Laravel (Models, Controllers)
├── routes/
│   └── api.php           # Semua endpoint API untuk Next.js terdaftar di sini
├── database/
│   ├── migrations/       # Skema database
│   └── seeders/          # Data dummy (Kategori, Produk, Admin, Pengaturan)
│
├── frontend/             # ⬅️ FOLDER NEXT.JS (FRONTEND)
│   ├── src/
│   │   ├── app/          # Halaman dan Routing Next.js (App Router)
│   │   ├── components/   # Komponen UI React (Navbar, ProductCard, AdminShell, dll)
│   │   ├── lib/          # Konfigurasi Axios API (api.js)
│   │   └── stores/       # State Management (Zustand authStore)
│   ├── public/           # Aset statis (Foto Produk, Logo)
│   └── package.json      # Dependensi Next.js
│
└── .env                  # Konfigurasi Backend Laravel
```
