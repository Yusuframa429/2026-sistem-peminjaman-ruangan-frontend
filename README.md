# Sistem Peminjaman Ruangan - Frontend

Repository ini berisi source code frontend untuk Sistem Peminjaman Ruangan. Aplikasi ini dibangun menggunakan React, TypeScript, dan Vite sebagai build tool, serta Tailwind CSS untuk styling antarmuka.

## Deskripsi Proyek

Aplikasi ini berfungsi sebagai antarmuka pengguna (Client-side) untuk mengelola proses peminjaman ruangan. Aplikasi ini berinteraksi dengan REST API Backend untuk melakukan operasi CRUD (Create, Read, Update, Delete), pencarian data, penyaringan status, dan pengurutan data peminjaman.

## Fitur Utama

Aplikasi ini mencakup fungsionalitas berikut:

* **Manajemen Data Peminjaman:** Pengguna dapat melihat daftar peminjaman, mengajukan peminjaman baru, serta mengubah atau menghapus data peminjaman.
* **Pencarian Lanjut (Advanced Search):** Fitur pencarian data berdasarkan nama peminjam atau keperluan kegiatan secara real-time.
* **Penyaringan Data (Filtering):** Kemampuan untuk menyaring daftar peminjaman berdasarkan status (Menunggu, Disetujui, Ditolak).
* **Pengurutan Data (Sorting):** Fitur pengurutan data berdasarkan tanggal (terbaru/terlama) dan nama peminjam (A-Z/Z-A).
* **Manajemen Status:** Admin dapat melakukan validasi (persetujuan atau penolakan) terhadap pengajuan peminjaman.

## Teknologi yang Digunakan

* **Core:** React (v18+), TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Routing:** React Router DOM
* **Linting:** ESLint

## Prasyarat (Prerequisites)

Sebelum menjalankan aplikasi ini, pastikan sistem Anda memiliki:

1.  **Node.js** (Versi 18.0.0 atau lebih baru)
2.  **npm** (Node Package Manager)
3.  **Backend Service:** Pastikan repository Backend sudah dijalankan pada port yang sesuai.

## Panduan Instalasi dan Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal:

### 1. Clone Repository
Unduh source code ke dalam mesin lokal Anda.

```bash
git clone [https://github.com/Yusuframa429/2026-sistem-peminjaman-ruangan-frontend.git](https://github.com/Yusuframa429/2026-sistem-peminjaman-ruangan-frontend.git)
cd 2026-sistem-peminjaman-ruangan-frontend
