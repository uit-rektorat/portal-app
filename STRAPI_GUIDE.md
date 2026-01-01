# Strapi Content Types Configuration Guide

Panduan lengkap untuk membuat Content Types di Strapi yang terintegrasi dengan Portal UIT.

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

### 4. Articles (Collection Type)
**API ID**: `article`

Fields:
- `title` (Text, Required) - Judul artikel/berita
- `excerpt` (Text, Required) - Ringkasan artikel
- `content` (Rich Text, Optional) - Isi lengkap artikel
- `image` (Media - Single Image, Optional) - Gambar artikel
- `slug` (UID attached to title, Required) - URL-friendly identifier
- `category` (Enumeration, Optional) - Kategori artikel
  - Values: `Pengumuman`, `Kegiatan`, `Prestasi`, `Berita`
- `publishedAt` (DateTime, Required) - Tanggal publikasi

**Permissions**: 
- Public: `find`, `findOne`

---

### 5. Testimonials (Collection Type)
**API ID**: `testimonial`

Fields:
- `name` (Text, Required) - Nama pemberi testimoni
- `role` (Text, Required) - Jabatan/status (e.g., "Alumni Teknik Informatika 2023")
- `content` (Text, Required) - Isi testimoni
- `avatar` (Media - Single Image, Optional) - Foto profil
- `rating` (Number - Integer, Required) - Rating 1-5
  - Min: 1, Max: 5

**Permissions**: 
- Public: `find`, `findOne`

---

### 6. Profile (Single Type)
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

#### 2. News/Article Images
- **Recommended**: 800x600px (ratio 4:3)
- **Format**: JPG atau PNG
- **Max Size**: 300KB per file

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

## 📝 Contoh Query GraphQL

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
   import { getHeroSlides, getQuickAccess, getCampusAdvantages, getNews, getTestimonials } from '../lib/strapi';
   const heroSlides = await getHeroSlides();
   const quickAccessItems = await getQuickAccess();
   const advantages = await getCampusAdvantages();
   const news = await getNews(6);
   const testimonials = await getTestimonials();
   ```

3. **Pass Data ke Components**
   ```astro
   <HeroSlider slides={heroSlides} />
   <QuickAccess items={quickAccessItems} />
   <CampusAdvantages advantages={advantages} />
   <NewsSection news={news} />
   <Testimonials testimonials={testimonials} />
   ```

---

## 🐛 Troubleshooting

### Error: GraphQL endpoint not found
- Pastikan GraphQL plugin sudah terinstall
- Restart Strapi server

### Error: Forbidden
- Cek permissions di Settings > Roles > Public
- Pastikan `find` dan `findOne` sudah dicentang

### Error: Cannot read property 'data'
- Pastikan sudah ada data di Strapi
- Publish entry yang sudah dibuat

### CORS Error
- Tambahkan config di `config/middlewares.js`:
  ```javascript
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:4321'],
    },
  }
  ```

---

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi GraphQL Plugin](https://docs.strapi.io/dev-docs/plugins/graphql)
- [GraphQL Request Documentation](https://github.com/jasonkuhrt/graphql-request)

---

**Catatan**: Sesuaikan structure dan fields berdasarkan kebutuhan spesifik UIT. File ini adalah panduan awal yang dapat dikustomisasi.
