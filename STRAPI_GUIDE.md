# Strapi Content Types Configuration Guide

Panduan lengkap untuk membuat Content Types di Strapi yang terintegrasi dengan Portal UIT.

## 📋 Content Types yang Dibutuhkan

### 1. Heroes (Collection Type)
**API ID**: `hero`

Fields:
- `title` (Text, Required) - Judul hero slide
- `subtitle` (Text, Required) - Subtitle hero slide
- `image` (Media - Single Image, Optional) - Gambar background
- `buttonText` (Text, Optional) - Teks tombol CTA
- `buttonLink` (Text, Optional) - Link tombol CTA

**Permissions**: 
- Public: `find`, `findOne`

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

## 🔧 Cara Membuat Content Type di Strapi

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
  heroes {
    data {
      id
      attributes {
        title
        subtitle
        buttonText
        buttonLink
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
