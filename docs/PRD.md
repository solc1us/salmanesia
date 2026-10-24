# Salmanesia — Product Requirements Document (PRD)

**Product Name:** Salmanesia  
**Product Type:** Event Discovery, Registration & Management Platform  
**Version:** 1.0  
**Status:** Final — UTS MVP  
**Date:** 22 Oktober 2026  
**Team Size:** 5 anggota  
**Estimated Development:** 1–2 minggu

---

## 1. Product Overview

### 1.1 Deskripsi Produk

Salmanesia adalah aplikasi web berbasis React yang memungkinkan pengguna menemukan dan mendaftar event secara gratis, memperoleh tiket digital berbasis QR code, serta memungkinkan penyelenggara membuat event, mengelola peserta, dan melakukan check-in.

Salmanesia dirancang sebagai platform event management dengan dua mode penggunaan:

1. **Attendee:** Pengguna yang mencari event, melakukan registrasi, dan memperoleh tiket.
2. **Event Creator:** Pengguna yang membuat event, mengelola peserta, memantau statistik, dan memverifikasi kehadiran.

Versi awal Salmanesia merupakan Minimum Viable Product (MVP) yang berfokus pada implementasi frontend untuk memenuhi Tugas Besar I (UTS) mata kuliah Perancangan dan Pemrograman Web.

Aplikasi menggunakan mock data dan penyimpanan lokal tanpa backend maupun autentikasi sungguhan. Meskipun demikian, alur utama dirancang menyerupai sistem event management nyata agar dapat dikembangkan menjadi aplikasi full-stack di masa mendatang.

### 1.2 Problem Statement

Informasi event sering tersebar di berbagai media, sehingga calon peserta membutuhkan tempat terpusat untuk menemukan event, memahami informasi kegiatan, dan melakukan registrasi.

Di sisi lain, penyelenggara membutuhkan cara yang sederhana untuk mempublikasikan event, mengatur kapasitas, melihat peserta terdaftar, dan mencatat kehadiran.

Salmanesia menawarkan satu antarmuka terintegrasi yang menghubungkan kebutuhan pengunjung dan penyelenggara event.

### 1.3 Product Goals

1. Menyediakan platform pencarian dan eksplorasi event dari berbagai kategori.
2. Memungkinkan registrasi event gratis melalui formulir sederhana.
3. Menghasilkan tiket digital dengan QR code unik untuk setiap registrasi.
4. Memungkinkan penyelenggara membuat dan mengelola event beserta kapasitasnya.
5. Mendukung verifikasi tiket dan pencatatan kehadiran melalui QR scanner.
6. Menampilkan statistik dasar event berdasarkan data registrasi dan check-in.
7. Menghasilkan antarmuka yang responsif, accessible, dan mudah digunakan.
8. Menyediakan implementasi frontend yang sederhana, mudah dijelaskan, dan memungkinkan pengembangan backend di kemudian hari.

### 1.4 Product Success Criteria

MVP dinyatakan berhasil apabila:

- Seluruh tujuh halaman utama dapat diakses dan terhubung melalui navigasi.
- Data awal event berhasil ditampilkan melalui Fetch API.
- Pengunjung dapat melakukan registrasi dan memperoleh tiket dengan QR code valid.
- QR code dapat dibaca menggunakan scanner berbasis kamera atau gambar.
- Penyelenggara dapat membuat, mengedit, dan menghapus event.
- Kapasitas event membatasi jumlah registrasi.
- Check-in memperbarui status peserta dan statistik event.
- Perubahan data tetap tersimpan setelah halaman di-refresh.
- Aplikasi dapat digunakan pada tampilan desktop dan mobile.
- Form validation, conditional rendering, loading state, dan error state dapat didemonstrasikan.

---

## 2. Target Users & User Roles

### 2.1 Attendee

Pengguna umum yang tertarik mengikuti kegiatan seperti seminar, workshop, konser, festival, kompetisi, kegiatan komunitas, dan kategori event lainnya.

**Kebutuhan utama:**

- Menemukan event yang relevan.
- Mendapatkan informasi event yang jelas.
- Melakukan registrasi dengan mudah.
- Melihat tiket yang telah diperoleh.
- Menunjukkan QR code untuk verifikasi kehadiran.

### 2.2 Event Creator

Individu atau organisasi yang menyelenggarakan event dan membutuhkan sarana pengelolaan sederhana.

**Kebutuhan utama:**

- Membuat dan mempublikasikan event.
- Mengubah atau menghapus informasi event.
- Mengatur kapasitas peserta.
- Melihat daftar registrasi.
- Memverifikasi tiket melalui QR scanner.
- Memantau jumlah pendaftaran dan kehadiran.

### 2.3 Demo Mode

Pada MVP, Salmanesia tidak menggunakan autentikasi.

Pengguna dapat berpindah antara mode Attendee dan Event Creator melalui kontrol **Switch Mode** pada navigasi.

Ketentuan:

- Tidak tersedia halaman login atau registrasi akun.
- Pergantian mode tidak membutuhkan password.
- Event Creator dapat mengelola seluruh event dalam data demo.
- Data kedua mode menggunakan sumber penyimpanan lokal yang sama.
- Identitas peserta diperoleh dari formulir registrasi, bukan dari akun.
- Mode dan izin akses tidak memberikan keamanan atau pemisahan hak akses sungguhan.

Demo Mode hanya ditujukan untuk demonstrasi frontend dan bukan mekanisme autentikasi produksi.

---

## 3. Product Scope

### 3.1 Must Have (UTS MVP)

Seluruh fitur berikut wajib tersedia.

| ID    | Feature                 | Requirement                                                           |
| ----- | ----------------------- | --------------------------------------------------------------------- |
| FR-01 | Landing Page            | Menampilkan pengenalan Salmanesia dan navigasi ke fitur utama.        |
| FR-02 | Event Discovery         | Menampilkan daftar event dari data yang di-fetch.                     |
| FR-03 | Search & Filter         | Mencari event berdasarkan judul dan menyaring berdasarkan kategori.   |
| FR-04 | Event Detail            | Menampilkan informasi lengkap event dan ketersediaan kapasitas.       |
| FR-05 | Event Registration      | Mendaftarkan peserta melalui formulir nama dan email.                 |
| FR-06 | Registration Validation | Memvalidasi input, duplikasi peserta, dan kapasitas event.            |
| FR-07 | Digital Ticket          | Membuat tiket dengan ID unik dan QR code.                             |
| FR-08 | My Tickets              | Menampilkan daftar tiket yang diperoleh dalam lingkungan demo.        |
| FR-09 | Mode Switching          | Berpindah antara Attendee dan Event Creator tanpa login.              |
| FR-10 | Event CRUD              | Membuat, melihat, mengedit, dan menghapus event.                      |
| FR-11 | Delete Confirmation     | Menampilkan dialog konfirmasi sebelum penghapusan event.              |
| FR-12 | Event Capacity          | Membatasi registrasi berdasarkan kapasitas event.                     |
| FR-13 | Creator Dashboard       | Menampilkan daftar event dan statistik dasar.                         |
| FR-14 | Participant Management  | Menampilkan daftar peserta dan status kehadiran.                      |
| FR-15 | QR Scanner              | Membaca QR melalui kamera browser atau gambar.                        |
| FR-16 | Ticket Verification     | Memvalidasi hasil scan terhadap data tiket lokal.                     |
| FR-17 | Attendance Check-in     | Mengubah status tiket menjadi Checked In setelah verifikasi berhasil. |
| FR-18 | Data Persistence        | Menyimpan perubahan event, registrasi, dan check-in di localStorage.  |
| FR-19 | UI States               | Menampilkan loading, error, empty, dan success states sesuai kondisi. |
| FR-20 | Responsive UI           | Mendukung tampilan desktop dan mobile.                                |
| FR-21 | Basic Accessibility     | Menggunakan semantic HTML, label form, dan navigasi keyboard dasar.   |

### 3.2 Should Have

Fitur tambahan yang dikerjakan apabila Must Have telah selesai.

| ID    | Feature         | Description                                                         |
| ----- | --------------- | ------------------------------------------------------------------- |
| SH-01 | Reset Demo Data | Mengembalikan seluruh data ke kondisi awal.                         |
| SH-02 | Event Sorting   | Mengurutkan event berdasarkan tanggal.                              |
| SH-03 | Manual Check-in | Memverifikasi tiket melalui input kode jika scanner tidak tersedia. |
| SH-04 | Download Ticket | Mengunduh QR code atau tiket sebagai gambar.                        |

### 3.3 Could Have

Fitur opsional untuk iterasi setelah UTS.

- Filter event berdasarkan kota atau lokasi.
- Preview gambar saat membuat event.
- Statistik event dengan visualisasi chart.
- Event favorit atau bookmark.
- Kategori event populer.
- Pagination daftar event.

### 3.4 Out of Scope

Fitur berikut tidak dikembangkan dalam MVP:

- Autentikasi dan manajemen akun sungguhan.
- Backend server dan database.
- Payment gateway dan tiket berbayar.
- Pengiriman email tiket.
- Integrasi layanan notifikasi.
- Manajemen banyak organisasi atau creator.
- Sistem permission dan ownership.
- Tiket dengan beberapa kategori harga atau kelas.
- Event online dan hybrid.
- Sinkronisasi data antarperangkat.
- Sistem keamanan tiket untuk penggunaan produksi.
- Analitik dan pelaporan tingkat lanjut.

---

## 4. Information Architecture & Pages

Salmanesia memiliki **7 halaman utama**.

### Page 1 — Landing Page

**Route:** `/`  
**Access:** Public / Attendee

**Purpose:** Memperkenalkan Salmanesia dan mengarahkan pengguna untuk mengeksplorasi event.

**Main Components:**

- Navigation bar dengan logo Salmanesia.
- Hero section dengan headline dan deskripsi singkat.
- Tombol CTA "Explore Events".
- Featured Events yang mengambil sebagian data event tersedia.
- Category highlights.
- Section informasi platform.
- CTA untuk beralih ke Event Creator.
- Footer.

**Expected Behavior:**

- Tombol Explore Events mengarahkan ke halaman daftar event.
- Event card mengarahkan ke detail event.
- CTA Event Creator mengubah mode dan membuka dashboard.
- Featured Events ditampilkan berdasarkan mock data, bukan daftar yang ditulis langsung di komponen.

### Page 2 — Explore Events

**Route:** `/events`  
**Access:** Attendee

**Purpose:** Memungkinkan pengguna menemukan event yang ingin diikuti.

**Main Components:**

- Search bar.
- Category filter.
- Event card grid.
- Empty state.
- Loading dan error state.

**Event Card Information:**

- Cover image.
- Event title.
- Category.
- Date and time.
- Location.
- Availability status.
- Free ticket label.

**Expected Behavior:**

- Daftar event diambil melalui Fetch API saat data awal dimuat.
- Pencarian menggunakan judul event.
- Filter menggunakan kategori event.
- Search dan filter dapat digunakan bersamaan.
- Event yang tidak sesuai filter disembunyikan.
- Ketika tidak ditemukan hasil, empty state ditampilkan.
- Klik event card membuka halaman Event Detail.

### Page 3 — Event Detail

**Route:** `/events/:eventId`  
**Access:** Attendee

**Purpose:** Menampilkan informasi lengkap dan menyediakan proses registrasi.

**Main Components:**

- Event cover image.
- Event title dan category.
- Date and time.
- Location.
- Event description.
- Capacity information.
- Registration CTA.
- Registration form/modal.

**Registration Fields:**

| Field     | Validation                                    |
| --------- | --------------------------------------------- |
| Full Name | Wajib diisi dan tidak boleh hanya whitespace. |
| Email     | Wajib diisi dengan format email valid.        |

**Expected Behavior:**

1. Pengguna membuka detail event.
2. Sistem menampilkan informasi dan sisa kapasitas.
3. Pengguna menekan tombol Register.
4. Form registrasi ditampilkan.
5. Sistem memvalidasi input.
6. Sistem memeriksa kapasitas dan duplikasi email pada event yang sama.
7. Jika valid, registrasi dibuat dan tiket diterbitkan.
8. Success state muncul dengan navigasi ke My Tickets.

Registrasi tidak dapat dilakukan apabila event sudah berlangsung lewat tanggal yang dijadwalkan atau kapasitas telah penuh.

### Page 4 — My Tickets

**Route:** `/tickets`  
**Access:** Attendee

**Purpose:** Menampilkan tiket digital dari registrasi yang dilakukan melalui browser demo.

**Main Components:**

- Ticket list.
- Ticket detail.
- Event information.
- Unique ticket ID.
- QR code.
- Attendance status.

**Ticket Information:**

- Ticket ID.
- Event title.
- Participant name.
- Participant email.
- Event date.
- Event location.
- QR code.
- Check-in status.

**Expected Behavior:**

- Registrasi baru langsung terlihat pada My Tickets.
- QR code dihasilkan dari ticket ID yang unik.
- Tiket dapat dibuka untuk memperbesar QR code.
- Status awal tiket adalah `Registered`.
- Setelah check-in berhasil, status menjadi `Checked In`.
- Apabila belum ada tiket, tampilkan empty state dengan CTA Explore Events.

My Tickets pada MVP menampilkan registrasi yang tersimpan di browser demo, bukan tiket yang terikat pada akun pengguna.

### Page 5 — Creator Dashboard

**Route:** `/creator`  
**Access:** Event Creator

**Purpose:** Memberikan ringkasan aktivitas dan pengelolaan event.

**Main Components:**

- Dashboard heading.
- Statistics cards.
- Event list/table.
- Create Event button.
- Edit action.
- Delete action.
- View Participants action.
- Delete confirmation dialog.

**Statistics:**

| Metric              | Definition                            |
| ------------------- | ------------------------------------- |
| Total Events        | Jumlah seluruh event yang tersedia.   |
| Total Registrations | Total peserta yang telah mendaftar.   |
| Total Checked In    | Total peserta yang berhasil check-in. |
| Total Capacity      | Akumulasi kapasitas seluruh event.    |

Setiap event pada daftar juga menampilkan jumlah registrasi, kapasitas, dan kehadiran masing-masing.

**Expected Behavior:**

- Statistik dihitung dari data aktual yang tersimpan.
- Create Event membuka Event Editor dalam mode create.
- Edit membuka Event Editor dalam mode edit.
- Delete memunculkan dialog konfirmasi.
- Penghapusan hanya dilakukan ketika pengguna mengonfirmasi.
- View Participants membuka halaman Participants & Check-in.
- Statistik berubah ketika event, registrasi, atau check-in berubah.

### Page 6 — Event Editor

**Routes:**

- `/creator/events/new`
- `/creator/events/:eventId/edit`

**Access:** Event Creator

**Purpose:** Menyediakan satu halaman form yang dapat digunakan untuk membuat dan mengedit event.

**Form Fields:**

| Field            | Validation                                                                              |
| ---------------- | --------------------------------------------------------------------------------------- |
| Event Title      | Wajib diisi.                                                                            |
| Category         | Wajib memilih kategori.                                                                 |
| Description      | Wajib diisi.                                                                            |
| Location / Venue | Wajib diisi.                                                                            |
| City             | Wajib diisi.                                                                            |
| Event Date       | Wajib diisi dengan tanggal yang belum lewat.                                            |
| Start Time       | Wajib diisi.                                                                            |
| Cover Image      | URL atau pilihan gambar lokal yang disediakan aplikasi; opsional dengan gambar default. |
| Capacity         | Bilangan bulat positif.                                                                 |

**Expected Behavior:**

- Mode create menampilkan form kosong dengan nilai default yang diperlukan.
- Mode edit memuat data event yang dipilih.
- Form menggunakan client-side validation.
- Submit valid menyimpan perubahan.
- Event baru memperoleh ID unik.
- Event yang dibuat langsung muncul pada Explore Events dan Creator Dashboard.
- Edit kapasitas tidak boleh menghasilkan kapasitas lebih kecil daripada jumlah peserta yang sudah terdaftar.
- Setelah penyimpanan berhasil, pengguna diarahkan kembali ke Creator Dashboard.

Kedua route menggunakan halaman dan komponen form yang sama untuk menghindari duplikasi kode.

### Page 7 — Participants & Check-in

**Route:** `/creator/events/:eventId/participants`  
**Access:** Event Creator

**Purpose:** Mengelola registrasi dan mencatat kehadiran peserta.

**Main Components:**

- Event summary.
- Participant statistics.
- Participant table.
- Participant search.
- Attendance status.
- QR scanner.
- Check-in feedback.

**Participant Table Columns:**

- Participant Name.
- Email.
- Ticket ID.
- Registration Date.
- Check-in Status.
- Check-in Time.

**QR Scanner Behavior:**

1. Creator memilih event yang ingin dikelola.
2. Creator membuka fitur Scan QR.
3. Browser meminta izin kamera.
4. Kamera membaca QR code yang ditampilkan Attendee.
5. Sistem memperoleh ticket ID dari hasil scan.
6. Sistem mencari tiket tersebut pada data registrasi event aktif.
7. Jika tiket valid dan belum check-in, kehadiran dicatat.
8. Status peserta dan statistik diperbarui.

Scanner juga mendukung pembacaan QR dari gambar sebagai alternatif ketika kamera tidak tersedia atau tidak dapat digunakan.

**Verification States:**

| Condition                       | Result                                     |
| ------------------------------- | ------------------------------------------ |
| Ticket valid dan belum check-in | Success — Checked In                       |
| Ticket ID tidak ditemukan       | Error — Invalid Ticket                     |
| Ticket bukan milik event aktif  | Error — Wrong Event                        |
| Ticket sudah check-in           | Error — Already Checked In                 |
| QR tidak dapat dibaca           | Error — Invalid QR                         |
| Kamera tidak tersedia/ditolak   | Informasi error dan alternatif scan gambar |

QR yang berhasil dibaca tidak otomatis dianggap valid. Status kehadiran hanya diubah setelah verifikasi data berhasil.

---

## 5. Core User Flows

### 5.1 Attendee — Event Registration

1. Pengguna membuka Landing Page.
2. Pengguna memilih Explore Events.
3. Pengguna mencari atau memilih event.
4. Pengguna membuka Event Detail.
5. Pengguna menekan Register.
6. Pengguna mengisi nama dan email.
7. Sistem memvalidasi formulir.
8. Sistem memeriksa kapasitas dan duplikasi registrasi.
9. Sistem menyimpan registrasi dan menerbitkan tiket.
10. Pengguna membuka My Tickets untuk melihat QR code.

### 5.2 Creator — Event Management

1. Pengguna memilih mode Event Creator.
2. Sistem membuka Creator Dashboard.
3. Creator memilih Create Event.
4. Creator mengisi formulir event.
5. Sistem memvalidasi input.
6. Event baru disimpan.
7. Dashboard dan Explore Events menampilkan event tersebut.
8. Creator dapat kembali mengedit atau menghapus event.

### 5.3 Creator — Delete Event

1. Creator memilih Delete pada event tertentu.
2. Sistem menampilkan dialog konfirmasi secara kondisional.
3. Creator dapat memilih Cancel atau Delete.
4. Cancel menutup dialog tanpa mengubah data.
5. Delete menghapus event beserta registrasi dan tiket yang terkait.
6. Daftar dan statistik diperbarui.

### 5.4 Ticket Verification & Check-in

1. Attendee membuka tiket digital.
2. QR code menampilkan identitas tiket.
3. Creator membuka halaman Participants & Check-in.
4. Creator melakukan scan QR menggunakan kamera atau gambar.
5. Sistem membaca ticket ID.
6. Sistem melakukan verifikasi terhadap data lokal.
7. Jika valid, sistem mencatat waktu check-in.
8. Status tiket menjadi Checked In.
9. Daftar peserta dan statistik dashboard diperbarui.
10. Pemindaian berulang terhadap tiket yang sama ditolak.

---

## 6. Business Rules

| ID    | Rule                                                                                      |
| ----- | ----------------------------------------------------------------------------------------- |
| BR-01 | Setiap event memiliki ID unik.                                                            |
| BR-02 | Setiap registrasi menghasilkan satu tiket dengan ID unik.                                 |
| BR-03 | Seluruh event pada MVP bersifat gratis.                                                   |
| BR-04 | Satu email hanya dapat terdaftar satu kali pada event yang sama.                          |
| BR-05 | Email yang sama boleh mendaftar pada event berbeda.                                       |
| BR-06 | Registrasi tidak boleh melebihi kapasitas event.                                          |
| BR-07 | Event dengan kapasitas penuh tidak menerima registrasi baru.                              |
| BR-08 | Registrasi tidak tersedia untuk event yang tanggalnya sudah lewat.                        |
| BR-09 | Kapasitas event tidak boleh diubah menjadi lebih kecil daripada jumlah peserta terdaftar. |
| BR-10 | Tiket hanya berlaku untuk event asalnya.                                                  |
| BR-11 | Setiap tiket hanya dapat berhasil check-in satu kali.                                     |
| BR-12 | QR menyimpan ticket ID, bukan data pribadi peserta.                                       |
| BR-13 | Check-in berhasil menyimpan status dan timestamp.                                         |
| BR-14 | Penghapusan event memerlukan konfirmasi.                                                  |
| BR-15 | Penghapusan event juga menghapus data registrasi/tiket terkait dalam demo.                |
| BR-16 | Statistik selalu dihitung berdasarkan data event dan registrasi terkini.                  |
| BR-17 | Data dalam localStorage berlaku untuk lingkungan browser yang sama.                       |
| BR-18 | Seluruh event dapat dikelola dari Creator Mode selama MVP belum memiliki autentikasi.     |

---

## 7. Data Requirements

### 7.1 Data Source Strategy

Salmanesia menggunakan dua sumber data:

**Mock JSON**

Berfungsi sebagai sumber data awal event yang dimuat menggunakan Fetch API.

**localStorage**

Berfungsi menyimpan kondisi aplikasi setelah terjadi perubahan seperti:

- Pembuatan event.
- Pengeditan event.
- Penghapusan event.
- Registrasi peserta.
- Penerbitan tiket.
- Check-in peserta.

### 7.2 Data Initialization

1. Saat aplikasi dibuka, sistem melakukan fetch terhadap file mock JSON.
2. Jika belum ada data aplikasi yang tersimpan, data hasil fetch digunakan sebagai data awal.
3. Jika sudah ada data tersimpan, state aplikasi menggunakan data localStorage tersebut.
4. Semua perubahan berikutnya disimpan kembali ke localStorage.
5. Data tidak di-reset otomatis saat refresh.
6. Apabila pengambilan data awal gagal dan belum ada data tersimpan, sistem menampilkan error state dengan opsi mencoba kembali.

Data event awal setidaknya mencakup beberapa kategori berbeda agar fitur discovery dapat didemonstrasikan.

### 7.3 Conceptual Data Entities

**Event**

| Field       | Description             |
| ----------- | ----------------------- |
| id          | Unique event identifier |
| title       | Event name              |
| category    | Event category          |
| description | Event description       |
| location    | Venue name              |
| city        | City                    |
| date        | Event date              |
| startTime   | Start time              |
| image       | Cover image reference   |
| capacity    | Maximum participants    |

**Registration / Ticket**

| Field            | Description                    |
| ---------------- | ------------------------------ |
| id               | Unique registration identifier |
| eventId          | Reference to event             |
| ticketId         | Unique ticket identifier       |
| participantName  | Registered name                |
| participantEmail | Registered email               |
| registeredAt     | Registration timestamp         |
| status           | Registered / Checked In        |
| checkedInAt      | Check-in timestamp or null     |

Untuk MVP, tiket tidak memerlukan entitas penyimpanan terpisah. Satu record registrasi sudah menyimpan informasi yang dibutuhkan untuk menghasilkan tiket digital.

### 7.4 Data Consistency

- Semua halaman menggunakan sumber data aplikasi yang konsisten.
- Registrasi baru memperbarui kapasitas tersisa.
- Check-in memperbarui status tiket dan statistik.
- Perubahan event langsung tercermin pada daftar event.
- Penghapusan event membersihkan registrasi terkait.
- Tidak diperlukan sinkronisasi antarperangkat pada MVP.

### 7.5 Demo Limitations

localStorage tidak menyediakan database bersama.

Karena itu, tiket yang dibuat pada satu browser tidak otomatis tersedia pada browser atau perangkat lain.

Untuk demonstrasi check-in end-to-end, registrasi harus terlebih dahulu tersedia dalam data browser yang digunakan Creator untuk verifikasi. QR dapat ditampilkan melalui screenshot atau layar kedua, kemudian dibaca menggunakan kamera pada perangkat demo. Alternatifnya, QR dapat dipindai melalui file gambar di browser yang sama.

Batasan ini merupakan bagian dari Demo Mode dan tidak dianggap sebagai fitur multi-user produksi.

---

## 8. UI/UX Requirements

### 8.1 Visual Direction

Desain Salmanesia mengacu pada gaya visual modern platform seperti Eventbrite, dengan identitas visual Salmanesia sendiri.

**Design Principles:**

- Clean and modern interface.
- Visual hierarchy yang jelas.
- Event cards dengan gambar dominan.
- Typography mudah dibaca.
- Spacing konsisten.
- Navigasi sederhana dan mudah dipahami.
- CTA utama terlihat jelas.
- Konsistensi komponen antarhalaman.

### 8.2 Responsive Design

Antarmuka wajib mendukung:

- Desktop.
- Tablet.
- Mobile.

Penyesuaian responsif meliputi:

- Grid event cards.
- Navigation bar.
- Form layout.
- Dashboard statistics.
- Participant table.
- QR scanner interface.

Pada layar kecil, komponen dapat disusun secara vertikal dan tabel dapat menggunakan horizontal scrolling apabila diperlukan.

### 8.3 UI States & Conditional Rendering

Aplikasi wajib mendemonstrasikan conditional rendering pada kondisi berikut:

| State                | Expected UI                                           |
| -------------------- | ----------------------------------------------------- |
| Loading              | Loading indicator atau skeleton sederhana.            |
| Fetch Error          | Pesan error dan tombol retry.                         |
| Empty Events         | Informasi bahwa tidak ada event.                      |
| Search No Results    | Informasi hasil pencarian tidak ditemukan.            |
| Empty Tickets        | CTA untuk mengeksplorasi event.                       |
| Registration Success | Pesan sukses dan tautan ke My Tickets.                |
| Form Invalid         | Pesan validasi pada field terkait.                    |
| Event Full           | Tombol registrasi disabled dan label Full.            |
| Delete Confirmation  | Dialog ditampilkan ketika tombol Delete dipilih.      |
| Scan Success         | Informasi tiket berhasil check-in.                    |
| Scan Error           | Pesan kegagalan verifikasi yang sesuai.               |
| Camera Error         | Pesan izin/ketersediaan kamera dan metode alternatif. |

### 8.4 Accessibility

- Menggunakan semantic HTML5.
- Input memiliki label yang jelas.
- Tombol menggunakan elemen button.
- Gambar informatif memiliki alt text.
- Seluruh fungsi dasar dapat diakses dengan keyboard.
- Focus indicator terlihat.
- Dialog konfirmasi dapat ditutup dan dioperasikan menggunakan keyboard.
- Warna teks dan latar belakang memiliki kontras yang layak.
- Error form ditampilkan melalui teks, bukan warna saja.

---

## 9. Technical Constraints

### 9.1 Technology Stack

| Layer                | Technology                            |
| -------------------- | ------------------------------------- |
| Frontend             | React.js                              |
| Build Tool           | Vite                                  |
| Programming Language | JavaScript ES6+                       |
| Styling              | Tailwind CSS                          |
| Layout               | Flexbox, CSS Grid, Media Queries      |
| Routing              | React Router                          |
| Data Fetching        | Native Fetch API                      |
| Initial Data         | Local Mock JSON                       |
| Persistence          | Browser localStorage                  |
| QR Generation        | Lightweight QR generation library     |
| QR Scanning          | Browser-compatible QR scanner library |
| Backend              | Not implemented                       |
| Authentication       | Demo Mode                             |

Library tambahan hanya digunakan ketika diperlukan, khususnya untuk routing, pembuatan QR, dan pembacaan QR.

Tidak diperlukan global state management library, UI framework besar, atau arsitektur backend untuk MVP.

### 9.2 QR Scanning Constraints

- QR code harus dapat dibaca oleh scanner sungguhan, bukan hanya gambar dekoratif.
- QR scanner menggunakan kamera browser jika tersedia.
- Aplikasi menyediakan alternatif membaca QR dari gambar.
- Browser harus memperoleh izin sebelum mengakses kamera.
- Penggunaan kamera mengikuti persyaratan browser untuk secure context, seperti `localhost` atau HTTPS.
- Scanner hanya bertanggung jawab membaca kode.
- Verifikasi tiket dan pencatatan kehadiran dilakukan menggunakan data aplikasi lokal.
- Scanner harus dihentikan atau dinonaktifkan setelah hasil scan diproses untuk menghindari pemrosesan berulang.
- Tidak diperlukan backend untuk menyelesaikan proses check-in pada Demo Mode.

### 9.3 Implementation Principles

- Gunakan komponen React fungsional.
- Gunakan React hooks sesuai kebutuhan.
- Hindari duplikasi komponen dan logika.
- Gunakan satu form untuk create dan edit event.
- Gunakan komponen reusable hanya untuk elemen yang memang digunakan berulang.
- Pisahkan UI dari operasi penyimpanan data secara sederhana.
- Utamakan logika yang mudah dibaca dan dijelaskan.
- Hindari dependency atau abstraction yang tidak memiliki kebutuhan nyata.
- Tidak melakukan optimasi prematur.
- Tidak menggunakan TypeScript untuk MVP.

Struktur folder dan detail implementasi akan didefinisikan pada Technical Specification terpisah.

---

## 10. Non-Functional Requirements

| ID     | Category        | Requirement                                                                                |
| ------ | --------------- | ------------------------------------------------------------------------------------------ |
| NFR-01 | Responsiveness  | Seluruh halaman dapat digunakan pada desktop dan mobile tanpa kerusakan layout utama.      |
| NFR-02 | Accessibility   | Komponen utama memenuhi accessibility dasar.                                               |
| NFR-03 | Usability       | Navigasi dan aksi penting dapat dipahami tanpa instruksi teknis.                           |
| NFR-04 | Reliability     | Refresh halaman tidak menghapus perubahan yang tersimpan.                                  |
| NFR-05 | Error Handling  | Kesalahan data, form, dan scanner menghasilkan feedback yang jelas.                        |
| NFR-06 | Maintainability | Komponen dan logika terorganisasi dengan tanggung jawab yang jelas.                        |
| NFR-07 | Compatibility   | Aplikasi berjalan pada browser modern dengan dukungan React dan Web APIs yang diperlukan.  |
| NFR-08 | Performance     | Pencarian/filter dan perpindahan halaman berjalan responsif pada skala mock data kecil.    |
| NFR-09 | Privacy         | Data pribadi peserta tidak dimasukkan langsung ke payload QR.                              |
| NFR-10 | Demo Safety     | Aplikasi tidak mengklaim memiliki autentikasi, sinkronisasi, atau keamanan tiket produksi. |

---

## 11. Acceptance Criteria

### 11.1 Navigation & Discovery

- [ ] Ketujuh halaman utama dapat diakses melalui navigasi aplikasi.
- [ ] Landing Page memiliki CTA yang berfungsi.
- [ ] Data event dimuat melalui Fetch API.
- [ ] Pencarian menampilkan event berdasarkan judul.
- [ ] Filter kategori menampilkan event yang sesuai.
- [ ] Event card membuka detail event yang benar.
- [ ] Loading, empty, dan error state ditampilkan sesuai kondisi.

### 11.2 Registration & Ticketing

- [ ] Form menolak nama kosong dan email tidak valid.
- [ ] Registrasi berhasil menambah satu peserta.
- [ ] Registrasi dengan email yang sama pada event sama ditolak.
- [ ] Registrasi ditolak ketika kapasitas penuh.
- [ ] Sisa kapasitas berubah setelah registrasi.
- [ ] Tiket dengan ID unik berhasil dibuat.
- [ ] QR code berisi ticket ID yang dapat dibaca.
- [ ] Tiket tampil di My Tickets.

### 11.3 Event Management

- [ ] Creator dapat membuat event baru.
- [ ] Creator dapat mengedit event.
- [ ] Creator dapat menghapus event setelah konfirmasi.
- [ ] Membatalkan dialog delete tidak mengubah data.
- [ ] Form event menampilkan pesan validasi.
- [ ] Kapasitas tidak dapat diturunkan di bawah jumlah peserta terdaftar.
- [ ] Event hasil create/edit langsung tercermin pada daftar.
- [ ] Statistik dashboard diperbarui berdasarkan perubahan data.

### 11.4 QR Scanning & Check-in

- [ ] Scanner dapat meminta izin dan membaca QR menggunakan kamera pada browser yang mendukung.
- [ ] Scanner dapat membaca QR dari gambar.
- [ ] QR valid berhasil diverifikasi terhadap event yang dipilih.
- [ ] QR tidak valid menampilkan pesan error.
- [ ] QR dari event berbeda ditolak.
- [ ] Check-in ulang terhadap tiket yang sama ditolak.
- [ ] Check-in berhasil menyimpan timestamp.
- [ ] Status tiket dan jumlah kehadiran diperbarui.
- [ ] Kegagalan akses kamera tidak menyebabkan aplikasi crash.

### 11.5 Persistence, UI & Accessibility

- [ ] Data event dan registrasi bertahan setelah refresh.
- [ ] Status check-in bertahan setelah refresh.
- [ ] Mode Attendee dan Creator dapat digunakan tanpa login.
- [ ] Seluruh halaman utama responsif.
- [ ] Tombol, form, dan dialog penting dapat digunakan dengan keyboard.
- [ ] Tidak terdapat error JavaScript yang menghambat alur utama.

---

## 12. Development Plan

### 12.1 Team Responsibilities

| Member   | Primary Responsibility                      |
| -------- | ------------------------------------------- |
| Member 1 | Landing Page, Explore Events, navigation    |
| Member 2 | Event Detail, registration, validation      |
| Member 3 | My Tickets, QR generation                   |
| Member 4 | Creator Dashboard, Event Editor, event CRUD |
| Member 5 | Participants, QR scanner, check-in          |

Pembagian tugas dapat disesuaikan menurut kompleksitas aktual. Anggota yang bertanggung jawab terhadap suatu halaman juga bertanggung jawab terhadap responsivitas dan pengujian dasar halaman tersebut.

Seluruh anggota menggunakan kontrak data dan pola komponen yang telah disepakati bersama.

### 12.2 Development Phases

**Phase 1 — Foundation**

- Inisialisasi React + Vite.
- Konfigurasi Tailwind CSS.
- Routing dan layout utama.
- Kontrak data event dan registrasi.
- Mock JSON dan mekanisme localStorage.
- Pembagian pekerjaan tim.

**Phase 2 — Core Features**

- Landing dan event discovery.
- Event detail dan registrasi.
- Tiket digital dan QR generation.
- Creator dashboard dan event CRUD.
- Participant management.

**Phase 3 — QR Check-in & Integration**

- QR scanner.
- Verifikasi tiket.
- Status kehadiran.
- Sinkronisasi state antarhalaman.
- Pengujian alur end-to-end.

**Phase 4 — Quality Assurance & Submission**

- Responsive testing.
- Form validation testing.
- Loading dan error state testing.
- Accessibility review.
- Perbaikan bug.
- Screenshot dan dokumentasi tugas besar.
- Persiapan demonstrasi dan presentasi.

---

## 13. Definition of Done

MVP Salmanesia dianggap selesai apabila:

1. Seluruh Must Have telah diimplementasikan.
2. Ketujuh halaman utama dapat digunakan.
3. User flow registrasi hingga check-in berjalan secara end-to-end.
4. Data awal diambil menggunakan Fetch API.
5. Perubahan data disimpan melalui localStorage.
6. QR generation dan scanning bekerja sesuai batasan Demo Mode.
7. Form validation dan conditional rendering dapat didemonstrasikan.
8. UI responsif pada desktop dan mobile.
9. Seluruh acceptance criteria utama telah diverifikasi.
10. Proyek dapat dijalankan secara lokal dengan instruksi setup yang jelas.
11. Tidak terdapat error yang menghalangi demonstrasi alur utama.
12. Laporan kelompok dan bukti kontribusi individu telah disiapkan sesuai ketentuan tugas.

---

## 14. Future Development

Setelah UTS, Salmanesia dapat dikembangkan menjadi sistem full-stack melalui beberapa peningkatan berikut:

1. **Backend & Database:** Menggantikan mock JSON dan localStorage sebagai penyimpanan utama.
2. **Authentication:** Menambahkan akun Attendee dan Event Creator.
3. **Authorization:** Memastikan setiap Creator hanya dapat mengelola event miliknya.
4. **Real Ticket Verification:** Memindahkan validasi dan check-in ke backend agar dapat digunakan lintas perangkat.
5. **Ticketing Expansion:** Mendukung tiket berbayar dan kategori tiket berbeda.
6. **Notification System:** Mengirimkan tiket dan pengingat event melalui email.
7. **Advanced Analytics:** Statistik penjualan, registrasi, dan kehadiran yang lebih lengkap.

Pengembangan tersebut berada di luar MVP UTS dan tidak menjadi dependensi implementasi saat ini.

---

## 15. Final Product Boundary

Salmanesia UTS adalah **frontend MVP dengan simulasi alur event management end-to-end**, bukan platform ticketing produksi.

Fokus implementasi:

**Discover Event → Register → Generate Ticket → Scan QR → Verify Ticket → Check-in → Update Dashboard**

Seluruh fitur dikembangkan menggunakan pendekatan sederhana, perubahan terlokalisasi, dependency minimum, dan kode yang mudah dipahami oleh seluruh anggota tim.

PRD ini menjadi acuan kebutuhan produk. Detail arsitektur, struktur folder, kontrak data teknis, library QR, dan strategi implementasi didefinisikan dalam Technical Specification terpisah.
