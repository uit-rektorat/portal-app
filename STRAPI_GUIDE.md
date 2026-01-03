# Strapi Content Types Configuration Guide

Panduan lengkap untuk membuat Content Types di Strapi yang terintegrasi dengan Portal UIT.

## 📋 Naming Convention

**Prinsip:** Display Name dalam **Bahasa Indonesia**, API ID dalam **Bahasa Inggris**

| Content Type | Display Name (ID) | API ID Singular | API ID Plural | Endpoint |
|-------------|------------------|----------------|---------------|----------|
| Berita | Berita | `article` | `articles` | `/api/articles` |
| Pengumuman | Pengumuman | `announcement` | `announcements` | `/api/announcements` |
| Agenda | Agenda | `event` | `events` | `/api/events` |
| Hero Slider | Hero | `hero` | `heroes` | `/api/heroes` |
| Akses Cepat | Akses Cepat | `quick-access` | `quick-accesses` | `/api/quick-accesses` |
| Testimoni | Testimoni | `testimonial` | `testimonials` | `/api/testimonials` |
| Pimpinan | Pimpinan | `leader` | `leaders` | `/api/leaders` |

**Catatan:**
- Strapi memerlukan singular ≠ plural untuk API ID
- Display Name bisa dalam Bahasa Indonesia untuk kemudahan admin
- API ID dalam Bahasa Inggris untuk konsistensi dengan codebase
- Endpoint otomatis menggunakan API ID (plural)

---

## 📋 Content Types yang Dibutuhkan

### 1. Heroes (Collection Type)
**API ID**: `hero`

Fields:
- `title` (Text, Required) - Judul hero slide (max 60 karakter untuk tampilan optimal)
- `subtitle` (Text, Required) - Subtitle hero slide (max 80 karakter)
- `description` (Text, Optional) - Deskripsi tambahan (max 150 karakter)
- `image` (Media - Single Image, Optional) - Gambar hero slide
- `buttonText` (Text, Optional) - Teks tombol CTA utama
- `buttonLink` (Text, Optional) - Link tombol CTA utama
- `buttonSecondaryText` (Text, Optional) - Teks tombol CTA sekunder
- `buttonSecondaryLink` (Text, Optional) - Link tombol CTA sekunder
- `layout` (Enumeration, Optional) - Variasi layout slide
  - Values: `default`, `full-image`, `centered`, `minimal`
  - Default: `default`

**Layout Variations:**
1. **default** - Text di kiri, gambar di kanan (klasik, seimbang)
2. **full-image** - Gambar full dengan text overlay (dramatis, eye-catching)
3. **centered** - Text centered tanpa gambar (fokus pada message)
4. **minimal** - Compact, simple text (profesional, clean)

**Rekomendasi Ukuran Gambar:**
- **Layout Default**: 1200x800px (ratio 3:2) - untuk gambar di samping teks
- **Layout Full-Image**: 1920x1080px (ratio 16:9) - untuk background full
- Format: JPG atau PNG
- Ukuran file: Max 500KB (gunakan compression untuk optimasi)
- Quality: 80-85% compression untuk balance antara kualitas dan kecepatan

**Tips Gambar:**
- Gunakan gambar landscape untuk layout default dan full-image
- Pastikan area penting gambar tidak tertutup text (untuk full-image)
- Hindari gambar terlalu ramai untuk full-image layout
- Gunakan gambar dengan kontras baik agar text tetap mudah dibaca

**Permissions**: 
- Public: `find`, `findOne`

**Contoh Data:**
```json
{
  "title": "Selamat Datang di UIT",
  "subtitle": "Universitas Indonesia Timur",
  "description": "Membangun Generasi Unggul dan Berkarakter",
  "layout": "centered",
  "buttonText": "Daftar Sekarang",
  "buttonLink": "/pendaftaran",
  "buttonSecondaryText": "Pelajari Lebih Lanjut",
  "buttonSecondaryLink": "/profile"
}
```

---

### 2. Quick Accesses (Collection Type)
**API ID**: `quick-access`

Fields:
- `title` (Text, Required) - Judul quick access
- `icon` (Enumeration, Required) - Icon identifier
  - Values: `user-plus`, `graduation-cap`, `book-open`, `library`, `award`, `phone`
- `link` (Text, Required) - URL tujuan

**Permissions**: 
- Public: `find`, `findOne`

---

### 3. Campus Advantages (Collection Type)
**API ID**: `campus-advantage`

Fields:
- `title` (Text, Required) - Judul keunggulan
- `description` (Text, Required) - Deskripsi keunggulan
- `icon` (Enumeration, Required) - Icon identifier
  - Values: `certificate`, `users`, `building`, `briefcase`, `star`, `heart`

**Permissions**: 
- Public: `find`, `findOne`

---

### 4. Berita / News (Collection Type)
**Display Name**: Berita  
**API ID (Singular)**: `article`  
**API ID (Plural)**: `articles`  
**Endpoint**: `/api/articles`

Fields:
- `title` (Text, Required) - Judul berita
- `excerpt` (Text, Required) - Ringkasan berita (max 200 karakter)
- `content` (Rich Text, Optional) - Isi lengkap berita dengan formatting
- `image` (Media - Single Image, Required) - Gambar thumbnail berita
- `slug` (UID attached to title, Required) - URL-friendly identifier (auto-generate dari title)
- `category` (Enumeration, Optional) - Kategori berita
  - Values: `Akademik`, `Kemahasiswaan`, `Prestasi`, `Umum`
  - Default: `Umum`
- `publishedAt` (DateTime, Required) - Tanggal publikasi
- `author` (Text, Optional) - Nama penulis/sumber berita

**Rekomendasi Ukuran Gambar:**
- 800x600px (ratio 4:3) untuk thumbnail
- Format: JPG
- Max size: 300KB

**Permissions**: 
- Public: `find`, `findOne`

**Contoh Data:**
```json
{
  "title": "Wisuda Angkatan 2025 UIT Dihadiri 500 Lulusan",
  "excerpt": "Universitas Indonesia Timur menggelar wisuda periode I tahun 2025 dengan total 500 mahasiswa dari berbagai program studi.",
  "category": "Akademik",
  "publishedAt": "2025-12-15T09:00:00.000Z",
  "author": "Humas UIT"
}
```

---

### 5. Agenda / Events (Collection Type)
**Display Name**: Agenda  
**API ID (Singular)**: `event`  
**API ID (Plural)**: `events`  
**Endpoint**: `/api/events`

Fields:
- `title` (Text, Required) - Judul agenda/event
- `description` (Text, Optional) - Deskripsi singkat agenda
- `eventDate` (DateTime, Required) - Tanggal dan waktu event
- `location` (Text, Optional) - Lokasi event (e.g., "Auditorium Kampus A")
- `category` (Enumeration, Optional) - Kategori agenda
  - Values: `Akademik`, `Seminar`, `Workshop`, `Lomba`, `Umum`
  - Default: `Umum`
- `isHighlighted` (Boolean, Optional) - Tandai agenda penting (akan ditampilkan prominent)
  - Default: false

**Permissions**: 
- Public: `find`, `findOne`

**Contoh Data:**
```json
{
  "title": "Seminar Nasional Teknologi dan Inovasi",
  "description": "Seminar dengan tema 'AI dalam Pendidikan' menghadirkan pembicara nasional",
  "eventDate": "2026-02-10T13:00:00.000Z",
  "location": "Auditorium Utama UIT",
  "category": "Seminar",
  "isHighlighted": true
}
```

---

### 6. Pengumuman / Announcements (Collection Type)
**Display Name**: Pengumuman  
**API ID (Singular)**: `announcement`  
**API ID (Plural)**: `announcements`  
**Endpoint**: `/api/announcements`

Fields:
- `title` (Text, Required) - Judul pengumuman
- `content` (Rich Text, Required) - Isi pengumuman lengkap
- `priority` (Enumeration, Optional) - Tingkat prioritas pengumuman
  - Values: `Normal`, `Penting`, `Urgent`
  - Default: `Normal`
- `publishedAt` (DateTime, Required) - Tanggal publikasi
- `expiryDate` (DateTime, Optional) - Tanggal kedaluwarsa (pengumuman tidak ditampilkan setelah tanggal ini)
- `targetAudience` (Enumeration, Optional) - Target pengumuman
  - Values: `Semua`, `Mahasiswa`, `Dosen`, `Staff`, `Calon Mahasiswa`
  - Default: `Semua`
- `isPinned` (Boolean, Optional) - Pin pengumuman di atas (selalu tampil paling atas)
  - Default: false

**Permissions**: 
- Public: `find`, `findOne`

**Contoh Data:**
```json
{
  "title": "Pendaftaran Beasiswa Prestasi Semester Genap 2025/2026",
  "content": "<p>Dibuka pendaftaran beasiswa prestasi untuk mahasiswa...</p>",
  "priority": "Penting",
  "publishedAt": "2026-01-15T08:00:00.000Z",
  "expiryDate": "2026-02-28T23:59:59.000Z",
  "targetAudience": "Mahasiswa",
  "isPinned": true
}
```

---

### 7. Articles (Collection Type) - Optional
**API ID**: `article`

Fields:
- `title` (Text, Required) - Judul artikel
- `excerpt` (Text, Required) - Ringkasan artikel
- `content` (Rich Text, Optional) - Isi lengkap artikel
- `image` (Media - Single Image, Optional) - Gambar artikel
- `slug` (UID attached to title, Required) - URL-friendly identifier
- `category` (Enumeration, Optional) - Kategori artikel
  - Values: `Opini`, `Feature`, `Liputan`, `Tutorial`
- `publishedAt` (DateTime, Required) - Tanggal publikasi

**Permissions**: 
- Public: `find`, `findOne`

---

### 8. Testimonials (Collection Type)
**Display Name**: Testimoni  
**API ID (Singular)**: `testimonial`  
**API ID (Plural)**: `testimonials`  
**Endpoint**: `/api/testimonials`

Fields:
- `name` (Text, Required) - Nama pemberi testimoni
- `role` (Text, Required) - Jabatan/status (e.g., "Alumni Teknik Informatika 2023")
- `content` (Text, Required) - Isi testimoni
- `avatar` (Media - Single Image, Optional) - Foto profil
- `rating` (Number - Integer, Required) - Rating 1-5
  - Min: 1, Max: 5

**Rekomendasi Ukuran Avatar:**
- 400x400px (square/1:1)
- Format: JPG atau PNG
- Max size: 100KB

**Permissions**: 
- Public: `find`, `findOne`

**Contoh Data:**
```json
{
  "name": "Ahmad Fauzi",
  "role": "Alumni Teknik Informatika 2023",
  "content": "UIT memberikan pengalaman belajar yang luar biasa...",
  "rating": 5
}
```

---

### 9. Leaders / Pimpinan (Collection Type)
**Display Name**: Pimpinan  
**API ID (Singular)**: `leader`  
**API ID (Plural)**: `leaders`  
**Endpoint**: `/api/leaders`

Fields:
- `name` (Text, Required) - Nama lengkap pimpinan (dengan gelar)
- `position` (Enumeration, Required) - Jabatan
  - Values: `Rektor`, `Wakil Rektor I (Bidang Akademik)`, `Wakil Rektor II (Bidang Keuangan)`, `Wakil Rektor III (Bidang Kemahasiswaan)`, `Wakil Rektor IV (Bidang Kerjasama)`
- `photo` (Media - Single Image, Optional) - Foto pimpinan
- `description` (Text, Optional) - Deskripsi singkat/bio
- `email` (Email, Optional) - Email kontak
- `order` (Number - Integer, Required) - Urutan tampilan (1 untuk Rektor, 2-5 untuk Wakil Rektor)
  - Min: 1, Max: 10

**Rekomendasi Ukuran Foto:**
- 800x800px (square/1:1)
- Format: JPG
- Max size: 300KB

**Permissions**: 
- Public: `find`, `findOne`

**Contoh Data:**
```json
{
  "name": "Prof. Dr. Ahmad Sutanto, M.Si.",
  "position": "Rektor",
  "description": "Memimpin universitas dengan visi dan komitmen untuk menghasilkan lulusan berkualitas",
  "email": "rektor@uit.ac.id",
  "order": 1
}
```

---

### 10. Profile (Single Type)
**API ID**: `profile`

Fields:
- `vision` (Text, Required) - Visi universitas
- `mission` (JSON, Required) - Array of mission statements
  ```json
  [
    "Misi pertama...",
    "Misi kedua...",
    ...
  ]
  ```
- `history` (Rich Text or Long Text, Required) - Sejarah universitas

**Permissions**: 
- Public: `find`

---

## �️ Panduan Upload dan Optimasi Gambar

### Rekomendasi Ukuran Gambar untuk Setiap Content Type

#### 1. Hero Slider Images
- **Layout Default**: 1200x800px (ratio 3:2)
- **Layout Full-Image**: 1920x1080px (ratio 16:9)
- **Format**: JPG (untuk foto), PNG (untuk grafis dengan transparansi)
- **Max Size**: 500KB per file
- **Quality**: 80-85% compression

#### 2. News Images
- **Recommended**: 800x600px (ratio 4:3)
- **Format**: JPG
- **Max Size**: 300KB per file
- **Usage**: Thumbnail untuk card berita

#### 3. Testimonial Avatar
- **Recommended**: 400x400px (square/1:1)
- **Format**: JPG atau PNG
- **Max Size**: 100KB per file

### Tools untuk Optimasi Gambar

**Online Tools (Gratis):**
- [TinyPNG](https://tinypng.com/) - Kompresi PNG & JPG
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [Compressor.io](https://compressor.io/) - Kompresi hingga 90%

**Desktop Apps:**
- Adobe Photoshop - "Save for Web"
- GIMP (Free) - Export dengan quality adjustment
- XnConvert (Free) - Batch processing

### Cara Upload Gambar di Strapi

1. **Via Content Manager:**
   - Buka Content Manager > Pilih Content Type
   - Klik "Create new entry"
   - Pada field Media, klik "Browse" atau drag & drop
   - Upload gambar yang sudah dioptimasi
   - Isi "Alternative text" untuk SEO

2. **Via Media Library:**
   - Buka Media Library di menu kiri
   - Klik "Add new assets"
   - Upload multiple images sekaligus
   - Gunakan folder untuk organisasi

### Tips Upload Gambar

✅ **DO:**
- Resize gambar sebelum upload (gunakan ukuran rekomendasi)
- Compress gambar untuk mengurangi ukuran file
- Gunakan nama file deskriptif (contoh: `kampus-uit-gedung-utama.jpg`)
- Isi alternative text untuk SEO
- Gunakan format yang tepat (JPG untuk foto, PNG untuk logo/grafis)

❌ **DON'T:**
- Upload gambar langsung dari kamera (biasanya 5-10MB)
- Gunakan nama file generic (contoh: `IMG_1234.jpg`)
- Skip alternative text
- Upload gambar dengan resolusi terlalu tinggi
- Gunakan format BMP atau TIFF

### Konfigurasi Upload di Strapi

Edit `config/plugins.js` untuk mengatur upload limits:

```javascript
module.exports = {
  upload: {
    config: {
      sizeLimit: 1000000, // 1MB in bytes
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    },
  },
};
```

Strapi akan otomatis generate multiple sizes untuk responsive images!

---

## �🔧 Cara Membuat Content Type di Strapi

### Langkah-langkah:

1. **Login ke Strapi Admin Panel**
   - Buka `http://localhost:1337/admin`
   - Login dengan credentials admin

2. **Buka Content-Type Builder**
   - Klik "Content-Type Builder" di menu kiri
   - Pilih "Create new collection type" atau "Create new single type"

3. **Buat Content Type**
   - Masukkan Display Name (e.g., "Hero", "Quick Access")
   - API ID akan dibuat otomatis
   - Klik "Continue"

4. **Tambahkan Fields**
   - Untuk setiap field, pilih tipe yang sesuai:
     - Text: Untuk teks pendek
     - Rich Text: Untuk konten panjang dengan formatting
     - Media: Untuk gambar/file
     - Enumeration: Untuk pilihan dropdown
     - Number: Untuk angka
     - DateTime: Untuk tanggal dan waktu
     - JSON: Untuk data terstruktur
     - UID: Untuk slug otomatis

5. **Konfigurasi Field**
   - Set field sebagai Required jika wajib diisi
   - Untuk UID field, attach ke field title
   - Untuk Enumeration, tambahkan semua values yang diperlukan

6. **Save dan Restart**
   - Klik "Save" setelah menambahkan semua fields
   - Strapi akan restart otomatis

7. **Set Permissions**
   - Buka "Settings" > "Users & Permissions Plugin" > "Roles"
   - Pilih "Public" role
   - Untuk setiap Content Type, centang permissions yang diperlukan:
     - `find`: Untuk mengambil semua data
     - `findOne`: Untuk mengambil satu data

8. **Tambahkan Data**
   - Buka "Content Manager" di menu kiri
   - Pilih Content Type yang ingin diisi
   - Klik "Create new entry"
   - Isi semua field yang required
   - Klik "Save" dan "Publish"

---

## 🚀 Enable GraphQL Plugin

Jika belum terinstall, jalankan:

```bash
cd backend
npm install @strapi/plugin-graphql
```

Restart Strapi server:
```bash
npm run develop
```

GraphQL Playground akan tersedia di:
`http://localhost:1337/graphql`

---

## 📝 Contoh REST API Endpoints

### Get Heroes
```
GET http://localhost:1337/api/heroes?populate=*&sort=createdAt:asc
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Selamat Datang di UIT",
      "subtitle": "Universitas Indonesia Timur",
      "description": "Membangun Generasi Unggul",
      "layout": "centered",
      "image": {
        "url": "/uploads/hero_1.jpg"
      }
    }
  ]
}
```

### Get News / Berita (with limit and sort)
```
GET http://localhost:1337/api/articles?populate=*&pagination[limit]=6&sort=publishedAt:desc
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Wisuda Angkatan 2025",
      "excerpt": "UIT menggelar wisuda...",
      "category": "Akademik",
      "publishedAt": "2025-12-15T09:00:00.000Z",
      "image": {
        "url": "/uploads/news_1.jpg"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 6,
      "pageCount": 1,
      "total": 6
    }
  }
}
```

### Get Agenda / Events (upcoming events)
```
GET http://localhost:1337/api/events?populate=*&filters[eventDate][$gte]=${todayDate}&sort=eventDate:asc&pagination[limit]=4
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Seminar Nasional",
      "description": "AI dalam Pendidikan",
      "eventDate": "2026-02-10T13:00:00.000Z",
      "location": "Auditorium Utama",
      "category": "Seminar",
      "isHighlighted": true
    }
  ]
}
```

### Get Pengumuman / Announcements (active & sorted by priority)
```
GET http://localhost:1337/api/announcements?populate=*&filters[expiryDate][$gte]=${todayDate}&sort[0]=isPinned:desc&sort[1]=priority:desc&sort[2]=publishedAt:desc&pagination[limit]=5
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Pendaftaran Beasiswa",
      "content": "<p>Dibuka pendaftaran...</p>",
      "priority": "Penting",
      "isPinned": true,
      "publishedAt": "2026-01-15T08:00:00.000Z",
      "expiryDate": "2026-02-28T23:59:59.000Z",
      "targetAudience": "Mahasiswa"
    }
  ]
}
```
### Get Testimonials
```
GET http://localhost:1337/api/testimonials?populate=*&sort=createdAt:desc
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Ahmad Fauzi",
      "role": "Alumni Teknik Informatika 2023",
      "content": "UIT memberikan pengalaman belajar yang luar biasa...",
      "rating": 5,
      "avatar": {
        "url": "/uploads/avatar_1.jpg"
      }
    }
  ]
}
```

### Get Leaders / Pimpinan (sorted by order)
```
GET http://localhost:1337/api/leaders?populate=*&sort=order:asc
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Prof. Dr. Ahmad Sutanto, M.Si.",
      "position": "Rektor",
      "description": "Memimpin universitas...",
      "email": "rektor@uit.ac.id",
      "order": 1,
      "photo": {
        "url": "/uploads/rektor.jpg"
      }
    },
    {
      "id": 2,
      "name": "Dr. Siti Aminah, M.Pd.",
      "position": "Wakil Rektor I (Bidang Akademik)",
      "order": 2
    }
  ]
}
```
### Get Profile (Single Type)
```
GET http://localhost:1337/api/profile?populate=*
```

Response:
```json
{
  "data": {
    "id": 1,
    "vision": "Menjadi universitas unggul...",
    "mission": ["Misi 1", "Misi 2", "Misi 3"],
    "history": "Universitas Indonesia Timur didirikan..."
  }
}
```

---

## 📝 Contoh Query GraphQL (Optional - jika menggunakan GraphQL)

### Get Heroes
```graphql
query {
  heroes(sort: "createdAt:asc") {
    data {
      id
      attributes {
        title
        subtitle
        description
        buttonText
        buttonLink
        buttonSecondaryText
        buttonSecondaryLink
        layout
        image {
          data {
            attributes {
              url
              alternativeText
              width
              height
            }
          }
        }
      }
    }
  }
}
```

### Get Articles (with limit and sort)
```graphql
query {
  articles(pagination: { limit: 6 }, sort: "publishedAt:desc") {
    data {
      id
      attributes {
        title
        excerpt
        slug
        category
        publishedAt
        image {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
}
```

### Get Profile (Single Type)
```graphql
query {
  profile {
    data {
      attributes {
        vision
        mission
        history
      }
    }
  }
}
```

---

## 🔗 Menghubungkan dengan Frontend

1. **Set Environment Variable**
   
   Edit file `.env` di project Astro:
   ```env
   PUBLIC_STRAPI_URL=http://localhost:1337
   ```

2. **Uncomment Strapi Imports**
   
   Di `src/pages/index.astro`:
   ```typescript
   import { 
     getHeroSlides, 
     getQuickAccess, 
     getCampusAdvantages, 
     getNews, 
     getAgenda,
     getAnnouncements,
     getTestimonials 
   } from '../lib/strapi';
   
   const heroSlides = await getHeroSlides();
   const quickAccessItems = await getQuickAccess();
   const advantages = await getCampusAdvantages();
   const news = await getNews(6);
   const agenda = await getAgenda(4);
   const announcements = await getAnnouncements(5);
   const testimonials = await getTestimonials();
   ```

3. **Pass Data ke Components**
   ```astro
   <HeroSlider slides={heroSlides} />
   <QuickAccess items={quickAccessItems} />
   <CampusAdvantages advantages={advantages} />
   <CampusInfo news={news} agenda={agenda} announcements={announcements} />
   <Testimonials testimonials={testimonials} />
   ```

---

## 🐛 Troubleshooting

### Error: REST API endpoint not found (404)
- Pastikan Content Type sudah dibuat dengan API ID yang benar
- Cek di Content-Type Builder apakah API ID sesuai (plural/singular)
- Restart Strapi server setelah membuat Content Type baru

### Error: GraphQL endpoint not found (jika pakai GraphQL)
- Pastikan GraphQL plugin sudah terinstall
- Restart Strapi server

### Error: Forbidden
- Cek permissions di Settings > Roles > Public
- Pastikan `find` dan `findOne` sudah dicentang

### Error: Cannot read property 'data'
- Pastikan sudah ada data di Strapi
- Publish entry yang sudah dibuat
- Cek response API di browser: `http://localhost:1337/api/heroes`

### Error: Image tidak muncul
- Pastikan image sudah di-populate: tambahkan `?populate=*` di URL
- Cek path image: harus `STRAPI_URL + image.url`
- Contoh: `http://localhost:1337/uploads/image_123.jpg`

### CORS Error
- Tambahkan config di `config/middlewares.js`:
  ```javascript
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:4321', 'http://localhost:3000'],
    },
  }
  ```

### Data tidak muncul di frontend (return empty array)
- Cek browser console untuk error
- Test API endpoint langsung di browser atau Postman
- Pastikan Strapi server berjalan di port 1337
- Verify PUBLIC_STRAPI_URL di file `.env`
- Cek permissions: Public role harus punya akses `find` dan `findOne`

---

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API Documentation](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi GraphQL Plugin](https://docs.strapi.io/dev-docs/plugins/graphql) (Optional)
- [Strapi Filters & Sorting](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication)
- [Strapi Population Guide](https://docs.strapi.io/dev-docs/api/rest/populate-select)

---

**Catatan Penting**: 
- Dokumentasi ini menggunakan **REST API** sebagai default (lebih simple dan praktis)
- GraphQL bersifat optional dan bisa diaktifkan jika diperlukan
- Sesuaikan structure dan fields berdasarkan kebutuhan spesifik UIT
- Pastikan selalu test endpoint setelah membuat Content Type baru

**Last Updated**: January 2026  
**API Version**: Strapi v4+ (REST API)
