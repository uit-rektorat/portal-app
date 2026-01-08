# Graduate Programs (Pascasarjana) - Panduan Lengkap

Panduan lengkap untuk membuat dan mengelola halaman Program Pascasarjana di website Universitas Indonesia Timur.

---

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Setup Strapi Collection](#setup-strapi-collection)
3. [Field Structure](#field-structure)
4. [Cara Input Data](#cara-input-data)
5. [Frontend Integration](#frontend-integration)
6. [Troubleshooting](#troubleshooting)

---

## Overview

Halaman Graduate Programs dirancang khusus untuk menampilkan program-program pascasarjana (S2/S3) dengan fokus utama pada:
- **Program Studi** - Detail lengkap setiap program
- **Koordinator Program** - Informasi koordinator/ketua program
- **Informasi Akademik** - Durasi, biaya, akreditasi

**Perbedaan dengan Fakultas:**
- Fakultas fokus ke organisasi (dekan, kepala prodi, fasilitas)
- Graduate Programs fokus ke program studi individual (koordinator, durasi, biaya)

---

## Setup Strapi Collection

### Langkah 1: Buat Collection Type

1. Login ke Strapi Admin (`http://localhost:1337/admin`)
2. Klik **Content-Type Builder** di sidebar
3. Klik **Create new collection type**
4. Masukkan nama: `graduate-program` (Strapi akan pluralize jadi `graduate-programs`)
5. Klik **Continue**

### Langkah 2: Tambahkan Fields

#### Basic Information Fields

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| name | Text | Short text | ✅ Yes |
| slug | UID | Attached to: name | ✅ Yes |
| tagline | Text | Short text | ❌ No |
| description | Rich Text | Full editor | ✅ Yes |
| heroImage | Media | Single image | ❌ No |

**Cara menambahkan:**

1. **name**
   - Click **Add another field**
   - Pilih **Text**
   - Name: `name`
   - Type: Short text
   - Check **Required field**
   - Save

2. **slug**
   - Click **Add another field**
   - Pilih **UID**
   - Name: `slug`
   - Attached field: `name`
   - Check **Required field**
   - Save

3. **tagline**
   - Click **Add another field**
   - Pilih **Text**
   - Name: `tagline`
   - Type: Short text
   - Save (tidak required)

4. **description**
   - Click **Add another field**
   - Pilih **Rich Text**
   - Name: `description`
   - Check **Required field**
   - Save

5. **heroImage**
   - Click **Add another field**
   - Pilih **Media**
   - Name: `heroImage`
   - Type: Single media
   - Allowed types: Images
   - Save

#### Programs Component (Repeatable)

1. Click **Add another field**
2. Pilih **Component**
3. Name: `Programs`
4. Pilih **Create a new component**
5. Category: `graduate`
6. Name: `program-detail`
7. Klik **Configure the component**

**Fields untuk Component `program-detail`:**

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| name | Text | Short text | ✅ Yes |
| degree | Text | Short text (S2, S3, dll) | ✅ Yes |
| description | Rich Text | Full editor | ❌ No |
| accreditation | Text | Short text (A, B, C, dll) | ❌ No |
| duration | Text | Short text (2 Tahun, dll) | ❌ No |
| tuition | Text | Short text (Rp 10jt/sem) | ❌ No |

8. Setelah selesai menambahkan fields di atas, klik **Add another field to this component**
9. Pilih **Component**
10. Name: `Coordinator`
11. Pilih **Create a new component**
12. Category: `graduate`
13. Name: `coordinator`

**Fields untuk Component `coordinator`:**

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| name | Text | Short text | ✅ Yes |
| photo | Media | Single image | ❌ No |
| title | Text | Short text (Prof., Dr., dll) | ❌ No |
| education | Text | Short text | ❌ No |

14. Klik **Finish**
15. Back to `program-detail` component, set component type: **Repeatable component**
16. Klik **Finish**
17. Klik **Save** untuk menyimpan collection

### Langkah 3: Configure Permissions

1. Klik **Settings** → **Roles** → **Public**
2. Scroll ke `graduate-program`
3. Check permissions:
   - ✅ `find`
   - ✅ `findOne`
4. Klik **Save**

---

## Field Structure

### Graduate Program Structure

```typescript
{
  id: number,
  name: string,              // Nama program pascasarjana
  slug: string,              // URL slug (auto-generate dari name)
  tagline: string,           // Tagline singkat
  description: string,       // Deskripsi lengkap (Rich Text)
  heroImage: {               // Gambar header
    url: string
  },
  Programs: [                // Array program studi
    {
      name: string,          // Nama program studi
      degree: string,        // Jenjang (S2, S3)
      description: string,   // Deskripsi program (Rich Text)
      accreditation: string, // Akreditasi (A, B, C)
      duration: string,      // Durasi studi
      tuition: string,       // Biaya kuliah
      Coordinator: {         // Koordinator program
        name: string,
        photo: { url: string },
        title: string,
        education: string
      }
    }
  ]
}
```

---

## Cara Input Data

### Step 1: Buat Entry Baru

1. Klik **Content Manager** di sidebar
2. Pilih **Graduate program**
3. Klik **Create new entry**

### Step 2: Isi Data Utama

**Basic Information:**
- **Name**: Masukkan nama program pascasarjana
  - Contoh: `Program Pascasarjana UIT`
- **Slug**: Otomatis terisi dari name
  - Contoh: `program-pascasarjana-uit`
- **Tagline**: Tagline singkat (opsional)
  - Contoh: `Membangun Akademisi Berkualitas`
- **Description**: Deskripsi lengkap tentang program pascasarjana
  - Gunakan Rich Text editor untuk format bold, italic, list
  - Contoh:
    ```
    Program Pascasarjana Universitas Indonesia Timur (UIT) 
    menawarkan pendidikan berkualitas tinggi untuk jenjang 
    Magister (S2) dan Doktor (S3).
    
    **Keunggulan:**
    - Dosen berkualifikasi S3 dan Profesor
    - Fasilitas penelitian modern
    - Akreditasi unggul
    ```
- **Hero Image**: Upload gambar header (1920x400px recommended)

### Step 3: Tambahkan Program Studi

Klik **Add an entry** di section **Programs**

**Untuk setiap Program Studi:**

1. **Name**: Nama program studi
   - Contoh: `Magister Kesehatan Masyarakat`

2. **Degree**: Jenjang pendidikan
   - Contoh: `S2`, `S3`, `Magister`, `Doktor`

3. **Description**: Deskripsi program (support markdown)
   - Contoh:
     ```
     Program studi ini dirancang untuk **menghasilkan lulusan** 
     yang kompeten dalam bidang kesehatan masyarakat dengan 
     kemampuan riset yang unggul.
     ```

4. **Accreditation**: Akreditasi program
   - Contoh: `A`, `B`, `Unggul`, `Baik Sekali`

5. **Duration**: Durasi studi
   - Contoh: `2 Tahun`, `3-4 Tahun`, `4 Semester`

6. **Tuition**: Biaya kuliah
   - Contoh: `Rp 12.000.000/semester`, `Rp 24jt/tahun`

7. **Coordinator**: Klik **Add a component**
   - **Name**: Nama koordinator
     - Contoh: `Dr. Budi Santoso, M.Kes`
   - **Photo**: Upload foto koordinator (400x400px recommended)
   - **Title**: Gelar atau jabatan
     - Contoh: `Dr.`, `Prof. Dr.`, `Koordinator Program`
   - **Education**: Pendidikan terakhir
     - Contoh: `S3 Kesehatan Masyarakat - Universitas Indonesia`

Ulangi untuk setiap program studi yang ingin ditambahkan.

### Step 4: Publish

1. Klik **Save** untuk menyimpan draft
2. Klik **Publish** untuk mempublikasikan

---

## Frontend Integration

### URL Structure

Setelah data tersimpan, halaman dapat diakses di:

```
http://localhost:4321/pascasarjana/{slug}
```

**Contoh:**
- http://localhost:4321/pascasarjana/program-pascasarjana-uit

### API Endpoint

Frontend mengambil data dari:

```
GET /api/graduate-programs?populate[0]=heroImage&populate[1]=Programs.Coordinator.photo&sort=name:asc
```

**Response Structure:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Program Pascasarjana UIT",
      "slug": "program-pascasarjana-uit",
      "tagline": "Membangun Akademisi Berkualitas",
      "description": "Program Pascasarjana...",
      "heroImage": {
        "url": "/uploads/hero_pasca.jpg"
      },
      "Programs": [
        {
          "name": "Magister Kesehatan Masyarakat",
          "degree": "S2",
          "description": "Program studi ini...",
          "accreditation": "A",
          "duration": "2 Tahun",
          "tuition": "Rp 12.000.000/semester",
          "Coordinator": {
            "name": "Dr. Budi Santoso, M.Kes",
            "photo": {
              "url": "/uploads/koordinator_1.jpg"
            },
            "title": "Dr.",
            "education": "S3 Kesehatan Masyarakat - UI"
          }
        }
      ]
    }
  ]
}
```

### Komponen yang Digunakan

1. **Page**: `src/pages/pascasarjana/[slug].astro`
   - Dynamic routing berdasarkan slug
   - Generate static paths dari semua graduate programs

2. **Layout**: `src/components/pascasarjana/PascasarjanaLayout.astro`
   - Hero section dengan gradient biru
   - Program cards dengan detail lengkap
   - CTA section

3. **Functions**: `src/lib/strapi.ts`
   - `getAllPascasarjana()` - Get semua program
   - `getPascasarjana(slug)` - Get program by slug

---

## Contoh Data Lengkap

### Graduate Program: Program Pascasarjana UIT

**Basic Information:**
```
Name: Program Pascasarjana UIT
Slug: program-pascasarjana-uit
Tagline: Membangun Akademisi Berkualitas dan Berdaya Saing Global
Description: 
Program Pascasarjana Universitas Indonesia Timur (UIT) menawarkan 
pendidikan berkualitas tinggi untuk jenjang Magister (S2) dan Doktor (S3).

**Keunggulan Kami:**
- Dosen berkualifikasi S3 dan Profesor dari universitas ternama
- Fasilitas penelitian dan laboratorium modern
- Akreditasi program unggul
- Jaringan kolaborasi internasional
- Beasiswa tersedia untuk mahasiswa berprestasi
```

**Programs:**

#### Program 1: Magister Kesehatan Masyarakat
```
Name: Magister Kesehatan Masyarakat
Degree: S2
Description: 
Program studi **Magister Kesehatan Masyarakat** dirancang untuk 
menghasilkan lulusan yang kompeten dalam bidang kesehatan masyarakat 
dengan kemampuan riset yang unggul dan kepekaan terhadap isu 
kesehatan kontemporer.
Accreditation: A
Duration: 2 Tahun (4 Semester)
Tuition: Rp 12.000.000/semester
Coordinator:
  - Name: Dr. Siti Rahmawati, M.Kes
  - Title: Dr.
  - Education: S3 Kesehatan Masyarakat - Universitas Indonesia
  - Photo: [upload foto]
```

#### Program 2: Magister Manajemen
```
Name: Magister Manajemen
Degree: S2
Description: 
Program studi **Magister Manajemen** menghasilkan pemimpin bisnis 
yang inovatif, etis, dan mampu bersaing di era digital. Fokus pada 
*strategic management*, *digital transformation*, dan *entrepreneurship*.
Accreditation: A
Duration: 2 Tahun (4 Semester)
Tuition: Rp 15.000.000/semester
Coordinator:
  - Name: Prof. Dr. Ahmad Budiman, MM
  - Title: Prof. Dr.
  - Education: S3 Manajemen - Universitas Gadjah Mada
  - Photo: [upload foto]
```

#### Program 3: Magister Ilmu Hukum
```
Name: Magister Ilmu Hukum
Degree: S2
Description: 
Program **Magister Ilmu Hukum** mengembangkan kemampuan analisis 
hukum yang mendalam dengan fokus pada hukum ekonomi, hukum pidana, 
dan hukum perdata.
Accreditation: B
Duration: 2 Tahun (4 Semester)
Tuition: Rp 10.000.000/semester
Coordinator:
  - Name: Dr. Bambang Sutrisno, S.H., M.H.
  - Title: Dr.
  - Education: S3 Ilmu Hukum - Universitas Hasanuddin
  - Photo: [upload foto]
```

#### Program 4: Doktor Administrasi Negara
```
Name: Doktor Administrasi Negara
Degree: S3
Description: 
Program **Doktor Administrasi Negara** mempersiapkan peneliti dan 
akademisi di bidang administrasi publik yang mampu menghasilkan 
*research-based policy* untuk kemajuan tata kelola pemerintahan.
Accreditation: A
Duration: 3-4 Tahun (6-8 Semester)
Tuition: Rp 18.000.000/semester
Coordinator:
  - Name: Prof. Dr. Andi Mappasessu, M.Si
  - Title: Prof. Dr.
  - Education: S3 Administrasi Negara - Universitas Indonesia
  - Photo: [upload foto]
```

---

## Rich Text Formatting

### Markdown Support di Description

Frontend mendukung markdown formatting:

- **Bold**: `**text**` atau `__text__`
- *Italic*: `*text*` atau `_text_`
- ~~Strikethrough~~: `~~text~~`
- Links: `[text](url)`

**Contoh:**
```
Program studi ini menawarkan **kurikulum terkini** dengan 
*fokus pada riset*. Lulusan kami telah bekerja di 
[berbagai institusi ternama](https://example.com).
```

---

## Troubleshooting

### 1. Halaman 404 Not Found

**Penyebab:**
- Data belum di-publish di Strapi
- Slug tidak sesuai dengan URL
- Collection belum dibuat

**Solusi:**
1. Pastikan entry sudah **Published** (bukan Draft)
2. Cek slug di Strapi sesuai dengan URL yang diakses
3. Restart dev server: `pnpm dev`

### 2. Hero Image atau Photo Tidak Muncul

**Penyebab:**
- Populate query tidak lengkap
- File gambar tidak ter-upload

**Solusi:**
1. Pastikan gambar sudah diupload di Strapi
2. Cek populate query sudah include `heroImage` dan `Programs.Coordinator.photo`
3. Clear cache dan reload halaman

### 3. Description atau Program Description Tidak Format

**Penyebab:**
- Markdown tidak diparse dengan benar
- Field menggunakan Plain Text bukan Rich Text

**Solusi:**
1. Pastikan field di Strapi menggunakan **Rich Text** bukan Text
2. Gunakan markdown syntax yang benar (**bold**, *italic*)
3. Restart frontend jika perubahan tidak muncul

### 4. Coordinator Photo Tidak Muncul

**Penyebab:**
- Nested component tidak ter-populate
- Photo field kosong

**Solusi:**
1. Pastikan query populate: `Programs.Coordinator.photo`
2. Upload photo untuk setiap coordinator di Strapi
3. Format gambar harus supported (jpg, png)

### 5. Programs Tidak Tampil

**Penyebab:**
- Component tidak ditambahkan di entry
- Populate tidak mencakup Programs

**Solusi:**
1. Tambahkan minimal 1 program di section **Programs**
2. Pastikan populate query: `Programs.Coordinator.photo`
3. Save dan Publish ulang entry

---

## Tips & Best Practices

### 1. Penamaan Slug
- Gunakan huruf kecil semua
- Pisahkan kata dengan hyphen (-)
- Hindari karakter khusus
- Contoh baik: `program-pascasarjana-uit`
- Contoh buruk: `Program_Pasca 2024`

### 2. Upload Gambar
- **Hero Image**: 1920x400px, landscape
- **Coordinator Photo**: 400x400px, square atau portrait
- Format: JPG atau PNG
- Ukuran maksimal: 2MB per gambar
- Gunakan gambar berkualitas tinggi

### 3. Penulisan Deskripsi
- Gunakan paragraf pendek (2-3 kalimat)
- Highlight kata penting dengan **bold**
- Gunakan bullet points untuk list
- Jangan terlalu panjang (3-5 paragraf cukup)

### 4. Informasi Koordinator
- Cantumkan gelar lengkap
- Upload foto profesional
- Tuliskan pendidikan terakhir
- Format nama konsisten (Dr., Prof. Dr., dll)

### 5. Update Data
- Review dan update setiap semester
- Pastikan biaya kuliah selalu akurat
- Update foto koordinator jika ada perubahan
- Perbarui akreditasi jika ada perubahan

---

## Checklist Sebelum Publish

- [ ] Collection `graduate-programs` sudah dibuat di Strapi
- [ ] Permission Public untuk `find` dan `findOne` sudah di-enable
- [ ] Data utama sudah lengkap (name, slug, description)
- [ ] Minimal 1 program studi sudah ditambahkan
- [ ] Hero image sudah diupload (opsional tapi recommended)
- [ ] Coordinator photo untuk setiap program sudah diupload
- [ ] Entry sudah di-Publish (bukan Draft)
- [ ] Dev server sudah direstart setelah perubahan
- [ ] URL dapat diakses tanpa error 404

---

## Support

Jika mengalami kendala:
1. Cek console browser untuk error (F12)
2. Cek terminal untuk error backend
3. Verifikasi struktur data di Strapi API
4. Restart both Strapi dan frontend dev server

**API Test URL:**
```
http://localhost:1337/api/graduate-programs?populate=*
```

Copy response dan verifikasi struktur data sesuai dengan guide ini.

---

**Dibuat:** Januari 2026  
**Versi:** 1.0.0  
**Terakhir Update:** 7 Januari 2026
