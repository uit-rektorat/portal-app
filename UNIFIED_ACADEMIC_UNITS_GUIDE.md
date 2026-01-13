# Unified Academic Units - Panduan Lengkap

> **🎯 Collection Terpadu untuk Fakultas & Pascasarjana**

Panduan ini menjelaskan struktur Collection Type **"Academic Units"** yang menyatukan data Fakultas dan Program Pascasarjana dalam satu collection untuk konsistensi dan kemudahan pengelolaan.

---

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Mengapa Unified Collection?](#mengapa-unified-collection)
3. [Setup Strapi Collection](#setup-strapi-collection)
4. [Field Structure](#field-structure)
5. [Cara Input Data](#cara-input-data)
6. [Frontend Integration](#frontend-integration)
7. [Migration dari Structure Lama](#migration-dari-structure-lama)
8. [Troubleshooting](#troubleshooting)

---

## Overview

**Academic Units** adalah collection type terpadu yang menggabungkan:
- **Fakultas** (Faculty) - Unit akademik S1/D3
- **Pascasarjana** (Graduate Programs) - Unit akademik S2/S3

### Keuntungan Unified Collection:
✅ **Konsistensi Data** - Struktur seragam untuk semua unit akademik  
✅ **Mudah Dikelola** - Satu collection untuk semua  
✅ **Fleksibel** - Mudah menambahkan tipe unit baru  
✅ **SEO Friendly** - URL tetap terpisah: `/fakultas/[slug]` dan `/pascasarjana/[slug]`

---

## Mengapa Unified Collection?

### Persamaan Fakultas & Pascasarjana:
- ✅ Keduanya adalah **unit akademik** di universitas
- ✅ Memiliki **profil**, **visi-misi**, dan **program studi**
- ✅ Dipimpin oleh **pejabat struktural** (Dekan/Direktur)
- ✅ Memiliki **statistik**, **fasilitas**, **prestasi**

### Perbedaan yang Diakomodasi:
| Aspek | Fakultas | Pascasarjana |
|-------|----------|--------------|
| **Pemimpin** | Dekan | Direktur |
| **Asisten** | Kepala Prodi | Asisten Direktur |
| **Program** | S1, D3, D4 | S2, S3 |
| **URL** | `/fakultas/[slug]` | `/pascasarjana/[slug]` |
| **Field Khusus** | - | Durasi, Biaya per program |

---

## Setup Strapi Collection

### Langkah 1: Buat Collection Type Baru

1. Login ke Strapi Admin (`http://localhost:1337/admin`)
2. Klik **Content-Type Builder** di sidebar
3. Klik **Create new collection type**
4. **Display Name**: `Academic Unit`
5. **API ID (Singular)**: `academic-unit`
6. **API ID (Plural)**: `academic-units`
7. Klik **Continue**

### Langkah 2: Tambahkan Fields

#### 1. Basic Information

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| `unitType` | Enumeration | Values: `fakultas`, `pascasarjana` | ✅ Yes |
| `name` | Text | Short text | ✅ Yes |
| `slug` | UID | Attached to: name | ✅ Yes |
| `tagline` | Text | Short text | ❌ No |
| `profile` | Rich Text | Full markdown editor | ✅ Yes |

**Cara tambah field `unitType`:**
1. Click **Add another field**
2. Pilih **Enumeration**
3. Name: `unitType`
4. Values: 
   - `fakultas` (label: Fakultas)
   - `pascasarjana` (label: Pascasarjana)
5. Default value: `fakultas`
6. Check **Required field**
7. Save

#### 2. Vision & Mission

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| `vision` | Rich Text | Full markdown editor | ✅ Yes |
| `mission` | Rich Text | Full markdown editor | ✅ Yes |

#### 3. Images

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| `logo` | Media | Single image | ❌ No |
| `heroImage` | Media | Single image | ❌ No |
| `profileImage` | Media | Single image | ❌ No |

#### 4. Layout Configuration

| Field Name | Type | Options | Required |
|-----------|------|---------|----------|
| `layout` | Enumeration | Values: `modern`, `classic`, `minimal` | ❌ No |

Default: `modern`

#### 5. Statistics (Component - Repeatable)

1. Click **Add another field** → **Component**
2. Name: `Statistics`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `stat`

**Fields untuk Component `stat`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `label` | Text | ✅ Yes |
| `value` | Text | ✅ Yes |

Example: label="Mahasiswa Aktif", value="1200+"

#### 6. Facilities (Component - Repeatable)

1. Click **Add another field** → **Component**
2. Name: `Facilities`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `facility`

**Fields untuk Component `facility`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `name` | Text | ✅ Yes |
| `description` | Text | ✅ Yes |
| `image` | Media | ❌ No |

#### 7. Achievements (Component - Repeatable)

1. Click **Add another field** → **Component**
2. Name: `Achievements`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `achievement`

**Fields untuk Component `achievement`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `title` | Text | ✅ Yes |
| `description` | Text | ✅ Yes |
| `year` | Text | ❌ No |

#### 8. Activities (Component - Repeatable)

1. Click **Add another field** → **Component**
2. Name: `Activities`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `activity`

**Fields untuk Component `activity`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `title` | Text | ✅ Yes |
| `description` | Text | ✅ Yes |
| `date` | Text | ❌ No |
| `image` | Media | ❌ No |

#### 9. Leader (Component - Single)

> **Leader bisa Dekan (untuk Fakultas) atau Direktur (untuk Pascasarjana)**

1. Click **Add another field** → **Component**
2. Name: `Leader`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `leader`
6. Type: **Single component** (not repeatable)

**Fields untuk Component `leader`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `name` | Text | ✅ Yes |
| `position` | Text | ❌ No |
| `title` | Text | ❌ No |
| `photo` | Media | ❌ No |
| `education` | Text | ❌ No |

**Contoh Data:**
- Fakultas: name="Prof. Dr. Ahmad", position="Dekan"
- Pascasarjana: name="Dr. Budi", position="Direktur"

#### 10. Assistants (Component - Repeatable)

> **Assistants bisa Kepala Prodi (Fakultas) atau Asisten Direktur (Pascasarjana)**

1. Click **Add another field** → **Component**
2. Name: `Assistants`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `assistant`
6. Type: **Repeatable component**

**Fields untuk Component `assistant`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `name` | Text | ✅ Yes |
| `position` | Text | ✅ Yes |
| `title` | Text | ❌ No |
| `program` | Text | ❌ No |
| `photo` | Media | ❌ No |
| `education` | Text | ❌ No |

**Contoh Data:**
- Fakultas: name="Dr. Siti", position="Kepala Prodi", program="S1 Ilmu Komputer"
- Pascasarjana: name="Dr. Bambang", position="Asisten Direktur Bidang Akademik"

#### 11. Programs (Component - Repeatable)

> **Ini adalah komponen paling kompleks, support Fakultas dan Pascasarjana**

1. Click **Add another field** → **Component**
2. Name: `Programs`
3. Select **Create a new component**
4. Category: `shared`
5. Name: `program`
6. Type: **Repeatable component**

**Fields untuk Component `program`:**

| Field Name | Type | Required | Notes |
|-----------|------|----------|-------|
| `name` | Text | ✅ Yes | Nama program studi |
| `degree` | Text | ✅ Yes | S1, S2, S3, D3, D4 |
| `description` | Rich Text | ❌ No | Deskripsi program |
| `accreditation` | Text | ❌ No | A, B, Unggul, dll |
| `link` | Text | ❌ No | URL detail program |
| `duration` | Text | ❌ No | Khusus Pascasarjana |
| `tuition` | Text | ❌ No | Khusus Pascasarjana |

**Tambahkan Sub-Component Coordinator:**
1. Dalam `program` component, klik **Add another field to this component**
2. Pilih **Component**
3. Name: `Coordinator`
4. Select **Create a new component**
5. Category: `shared`
6. Name: `coordinator`
7. Type: **Single component**

**Fields untuk Component `coordinator`:**

| Field Name | Type | Required |
|-----------|------|----------|
| `name` | Text | ✅ Yes |
| `title` | Text | ❌ No |
| `photo` | Media | ❌ No |
| `education` | Text | ❌ No |

### Langkah 3: Configure Permissions

1. Klik **Settings** → **Roles** → **Public**
2. Scroll ke `academic-units`
3. Check permissions:
   - ✅ `find`
   - ✅ `findOne`
4. Klik **Save**

---

## Field Structure

### Complete TypeScript Interface

```typescript
export interface AcademicUnit {
  id: string;
  unitType: 'fakultas' | 'pascasarjana';
  name: string;
  slug: string;
  tagline?: string;
  profile: string;
  vision: string;
  mission: string;
  logo?: string;
  heroImage?: string;
  profileImage?: string;
  layout?: 'modern' | 'classic' | 'minimal';
  
  // Components
  stats?: Array<{
    label: string;
    value: string;
  }>;
  
  facilities?: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
  
  achievements?: Array<{
    title: string;
    description: string;
    year?: string;
  }>;
  
  activities?: Array<{
    title: string;
    description: string;
    date?: string;
    image?: string;
  }>;
  
  leader?: {
    name: string;
    position?: string; // "Dekan" or "Direktur"
    title?: string;    // "Prof. Dr.", "Dr."
    photo?: string;
    education?: string;
  };
  
  assistants?: Array<{
    name: string;
    position: string;  // "Kepala Prodi" or "Asisten Direktur"
    title?: string;
    program?: string;  // For Kepala Prodi
    photo?: string;
    education?: string;
  }>;
  
  programs?: Array<{
    name: string;
    degree: string;
    description?: string;
    accreditation?: string;
    link?: string;
    duration?: string;    // For Pascasarjana
    tuition?: string;     // For Pascasarjana
    coordinator?: {       // For Pascasarjana
      name: string;
      title?: string;
      photo?: string;
      education?: string;
    };
  }>;
}
```

---

## Cara Input Data

### A. Input Data Fakultas

#### Step 1: Buat Entry Baru

1. Klik **Content Manager** → **Academic Units**
2. Klik **Create new entry**

#### Step 2: Isi Basic Information

- **Unit Type**: Pilih `fakultas` ✅
- **Name**: `Fakultas Ekonomi`
- **Slug**: `ekonomi` (auto-generated)
- **Tagline**: `Mencetak Ekonom Profesional`
- **Profile**: 
  ```
  Fakultas Ekonomi UIT adalah fakultas yang fokus pada pengembangan 
  ekonomi berkelanjutan dengan pendekatan modern dan inovatif.
  ```

#### Step 3: Isi Vision & Mission

- **Vision**: `Menjadi fakultas ekonomi terkemuka di Indonesia Timur`
- **Mission**: 
  ```
  - Menyelenggarakan pendidikan berkualitas
  - Mengembangkan riset ekonomi berkelanjutan
  - Mengabdi kepada masyarakat
  ```

#### Step 4: Upload Images

- **Logo**: Upload logo fakultas (200x200px)
- **Hero Image**: Upload hero image (1920x600px)
- **Profile Image**: Upload profile image (1200x800px)

#### Step 5: Pilih Layout

- **Layout**: Pilih `modern`, `classic`, atau `minimal`

#### Step 6: Tambahkan Statistics

Klik **Add an entry** di **Statistics**:
- Label: `Mahasiswa Aktif`, Value: `1200+`
- Label: `Dosen`, Value: `45`
- Label: `Akreditasi`, Value: `A`

#### Step 7: Tambahkan Facilities

Klik **Add an entry** di **Facilities**:
- Name: `Laboratorium Akuntansi`
- Description: `Lab dengan software akuntansi terkini`
- Image: Upload gambar lab

#### Step 8: Tambahkan Leader (Dekan)

Klik **Add a component** di **Leader**:
- Name: `Prof. Dr. Ahmad Budiman, S.E., M.M.`
- Position: `Dekan`
- Title: `Prof. Dr.`
- Photo: Upload foto dekan
- Education: `S3 Manajemen - Universitas Gadjah Mada`

#### Step 9: Tambahkan Assistants (Kepala Prodi)

Klik **Add an entry** di **Assistants**:

**Assistant 1:**
- Name: `Dr. Siti Rahmawati, S.E., M.Si.`
- Position: `Kepala Program Studi`
- Title: `Dr.`
- Program: `S1 Manajemen`
- Photo: Upload foto
- Education: `S3 Manajemen - Universitas Indonesia`

**Assistant 2:**
- Name: `Dr. Bambang Sutrisno, S.E., M.Ak.`
- Position: `Kepala Program Studi`
- Title: `Dr.`
- Program: `S1 Akuntansi`
- Photo: Upload foto
- Education: `S3 Akuntansi - Universitas Padjadjaran`

#### Step 10: Tambahkan Programs

Klik **Add an entry** di **Programs**:

**Program 1:**
- Name: `S1 Manajemen`
- Degree: `S1`
- Description: `Program studi manajemen yang fokus pada...`
- Accreditation: `A`
- Link: `/prodi/manajemen` (optional)
- ~~Duration~~: Kosongkan (khusus pascasarjana)
- ~~Tuition~~: Kosongkan (khusus pascasarjana)
- ~~Coordinator~~: Tidak perlu (khusus pascasarjana)

**Program 2:**
- Name: `S1 Akuntansi`
- Degree: `S1`
- Description: `Program studi akuntansi yang...`
- Accreditation: `A`

#### Step 11: Publish

1. Klik **Save**
2. Klik **Publish**

---

### B. Input Data Pascasarjana

#### Step 1: Buat Entry Baru

1. Klik **Content Manager** → **Academic Units**
2. Klik **Create new entry**

#### Step 2: Isi Basic Information

- **Unit Type**: Pilih `pascasarjana` ✅
- **Name**: `Program Pascasarjana UIT`
- **Slug**: `pascasarjana-uit` (auto-generated)
- **Tagline**: `Membangun Akademisi Berkualitas Global`
- **Profile**: 
  ```
  Program Pascasarjana UIT menawarkan pendidikan berkualitas tinggi 
  untuk jenjang Magister (S2) dan Doktor (S3).
  ```

#### Step 3: Isi Vision & Mission

- **Vision**: `Menjadi program pascasarjana unggul di Indonesia Timur`
- **Mission**: 
  ```
  - Menghasilkan lulusan S2/S3 berkualitas
  - Mengembangkan riset terapan
  - Berkontribusi pada pembangunan daerah
  ```

#### Step 4: Tambahkan Leader (Direktur)

Klik **Add a component** di **Leader**:
- Name: `Prof. Dr. Andi Mappasessu, M.Si.`
- Position: `Direktur`
- Title: `Prof. Dr.`
- Photo: Upload foto direktur
- Education: `S3 Administrasi Negara - Universitas Indonesia`

#### Step 5: Tambahkan Assistants (Asisten Direktur)

Klik **Add an entry** di **Assistants**:

**Assistant 1:**
- Name: `Dr. Ir. Muhammad Yusuf, M.T.`
- Position: `Asisten Direktur Bidang Akademik`
- Title: `Dr. Ir.`
- Program: *(kosongkan, karena bukan kepala prodi)*
- Photo: Upload foto
- Education: `S3 Teknik Sipil - ITB`

**Assistant 2:**
- Name: `Dr. Fatimah Zahra, S.H., M.H.`
- Position: `Asisten Direktur Bidang Kemahasiswaan`
- Title: `Dr.`
- Program: *(kosongkan)*
- Photo: Upload foto
- Education: `S3 Ilmu Hukum - Universitas Hasanuddin`

#### Step 6: Tambahkan Programs (dengan Coordinator)

Klik **Add an entry** di **Programs**:

**Program 1: Magister Kesehatan Masyarakat**
- Name: `Magister Kesehatan Masyarakat`
- Degree: `S2`
- Description: `Program studi yang dirancang untuk menghasilkan...`
- Accreditation: `A`
- Link: *(optional)*
- **Duration**: `2 Tahun (4 Semester)` ✅
- **Tuition**: `Rp 12.000.000/semester` ✅
- **Coordinator**: Klik **Add a component**
  - Name: `Dr. Siti Rahmawati, M.Kes`
  - Title: `Dr.`
  - Photo: Upload foto koordinator
  - Education: `S3 Kesehatan Masyarakat - Universitas Indonesia`

**Program 2: Magister Manajemen**
- Name: `Magister Manajemen`
- Degree: `S2`
- Description: `Program fokus pada strategic management...`
- Accreditation: `A`
- **Duration**: `2 Tahun (4 Semester)`
- **Tuition**: `Rp 15.000.000/semester`
- **Coordinator**: 
  - Name: `Prof. Dr. Ahmad Budiman, MM`
  - Title: `Prof. Dr.`
  - Photo: Upload foto
  - Education: `S3 Manajemen - Universitas Gadjah Mada`

**Program 3: Doktor Administrasi Negara**
- Name: `Doktor Administrasi Negara`
- Degree: `S3`
- Description: `Program doktoral yang mempersiapkan peneliti...`
- Accreditation: `A`
- **Duration**: `3-4 Tahun (6-8 Semester)`
- **Tuition**: `Rp 18.000.000/semester`
- **Coordinator**:
  - Name: `Prof. Dr. Andi Mappasessu, M.Si`
  - Title: `Prof. Dr.`
  - Photo: Upload foto
  - Education: `S3 Administrasi Negara - Universitas Indonesia`

#### Step 7: Publish

1. Klik **Save**
2. Klik **Publish**

---

## Frontend Integration

### URL Structure

Meskipun menggunakan satu collection, URL tetap terpisah:

**Fakultas:**
```
/fakultas/ekonomi
/fakultas/hukum
/fakultas/ilmu-komputer
```

**Pascasarjana:**
```
/pascasarjana/pascasarjana-uit
```

### API Endpoints

#### Get All Fakultas

```
GET /api/academic-units?filters[unitType][$eq]=fakultas&populate=deep&sort=name:asc
```

#### Get All Pascasarjana

```
GET /api/academic-units?filters[unitType][$eq]=pascasarjana&populate=deep&sort=name:asc
```

#### Get Single by Slug

```
GET /api/academic-units?filters[slug][$eq]=ekonomi&populate=deep
```

### Populate Query Detail

```
?populate[0]=logo
&populate[1]=heroImage
&populate[2]=profileImage
&populate[3]=Statistics
&populate[4]=Facilities.image
&populate[5]=Achievements
&populate[6]=Activities.image
&populate[7]=Leader.photo
&populate[8]=Assistants.photo
&populate[9]=Programs.Coordinator.photo
```

---

## Migration dari Structure Lama

### Jika Sudah Ada Data Lama

#### Option 1: Manual Migration (Recommended untuk data sedikit)

1. **Ekspor data lama** dari Strapi Admin
2. **Buat entry baru** di Academic Units
3. **Copy-paste data** sesuai mapping
4. **Verifikasi** semua data sudah benar
5. **Unpublish** entry lama
6. **Hapus** collection lama setelah yakin

#### Option 2: Script Migration (untuk data banyak)

Buat script Node.js untuk migrate data:

```javascript
// migrate-to-unified.js
const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'your-api-token';

async function migrateFakultas() {
  // 1. Fetch old fakultas
  const oldFakultas = await axios.get(
    `${STRAPI_URL}/api/faculties?populate=deep`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  );
  
  // 2. Transform & create new academic-units
  for (const fak of oldFakultas.data.data) {
    const attrs = fak.attributes;
    
    const newUnit = {
      data: {
        unitType: 'fakultas',
        name: attrs.name,
        slug: attrs.slug,
        tagline: attrs.tagline,
        profile: attrs.profile,
        vision: attrs.vision,
        mission: attrs.mission,
        layout: attrs.layout,
        Statistics: attrs.Statistics,
        Facilities: attrs.Facilities,
        Achievements: attrs.Achievements,
        Activities: attrs.Activities,
        Leader: attrs.Dean ? {
          name: attrs.Dean.name,
          position: 'Dekan',
          title: attrs.Dean.title,
          photo: attrs.Dean.photo,
          education: attrs.Dean.education
        } : null,
        Assistants: attrs.Heads?.map(h => ({
          name: h.name,
          position: 'Kepala Program Studi',
          title: h.title,
          program: h.program,
          photo: h.photo,
          education: h.education
        })),
        Programs: attrs.Programs
      }
    };
    
    await axios.post(
      `${STRAPI_URL}/api/academic-units`,
      newUnit,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } }
    );
  }
}

async function migratePascasarjana() {
  // Similar logic for graduate-programs
  const oldPasca = await axios.get(
    `${STRAPI_URL}/api/graduate-programs?populate=deep`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  );
  
  for (const pasca of oldPasca.data.data) {
    const attrs = pasca.attributes;
    
    const newUnit = {
      data: {
        unitType: 'pascasarjana',
        name: attrs.name,
        slug: attrs.slug,
        tagline: attrs.tagline,
        profile: attrs.description,
        Programs: attrs.Programs?.map(p => ({
          name: p.name,
          degree: p.degree,
          description: p.description,
          accreditation: p.accreditation,
          duration: p.duration,
          tuition: p.tuition,
          Coordinator: p.Coordinator
        }))
      }
    };
    
    await axios.post(
      `${STRAPI_URL}/api/academic-units`,
      newUnit,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } }
    );
  }
}

// Run migration
(async () => {
  await migrateFakultas();
  await migratePascasarjana();
  console.log('Migration complete!');
})();
```

Run: `node migrate-to-unified.js`

---

## Troubleshooting

### 1. Field Tidak Muncul di Frontend

**Penyebab:** Populate query tidak lengkap

**Solusi:**
```typescript
// Pastikan populate mencakup semua nested components
const query = `
  ?filters[unitType][$eq]=fakultas
  &populate[0]=logo
  &populate[1]=heroImage
  &populate[2]=profileImage
  &populate[3]=Statistics
  &populate[4]=Facilities.image
  &populate[5]=Achievements
  &populate[6]=Activities.image
  &populate[7]=Leader.photo
  &populate[8]=Assistants.photo
  &populate[9]=Programs.Coordinator.photo
`;
```

### 2. URL Tidak Sesuai (Fakultas muncul di /pascasarjana)

**Penyebab:** Filter unitType salah

**Solusi:**
```typescript
// Di src/pages/fakultas/[slug].astro
export async function getStaticPaths() {
  const units = await getAllAcademicUnits();
  const fakultas = units.filter(u => u.unitType === 'fakultas'); // Filter!
  return fakultas.map(f => ({
    params: { slug: f.slug },
    props: { unit: f }
  }));
}
```

### 3. Coordinator Tidak Muncul untuk Pascasarjana

**Penyebab:** Coordinator tidak diisi atau populate salah

**Solusi:**
1. Pastikan setiap program pascasarjana memiliki Coordinator
2. Check populate: `Programs.Coordinator.photo`
3. Verifikasi di Strapi API response

### 4. Position Label Tidak Tepat

**Penyebab:** Field position tidak diisi atau salah

**Solusi:**
- **Fakultas Leader**: Position = "Dekan"
- **Pascasarjana Leader**: Position = "Direktur"
- **Fakultas Assistant**: Position = "Kepala Program Studi"
- **Pascasarjana Assistant**: Position = "Asisten Direktur ..."

---

## Tips & Best Practices

### 1. Penamaan Konsisten

**Fakultas:**
- Leader Position: `Dekan`
- Assistant Position: `Kepala Program Studi`

**Pascasarjana:**
- Leader Position: `Direktur`
- Assistant Position: `Asisten Direktur Bidang Akademik`

### 2. Program Studi vs Program Pascasarjana

**Fakultas (S1/D3):**
- ✅ Isi: name, degree, description, accreditation
- ❌ Kosongkan: duration, tuition, coordinator

**Pascasarjana (S2/S3):**
- ✅ Isi: name, degree, description, accreditation, duration, tuition
- ✅ **Wajib isi Coordinator** untuk setiap program

### 3. Layout Selection

| Layout | Best For |
|--------|----------|
| **Modern** | Unit dengan visual kuat, banyak foto |
| **Classic** | Unit tradisional, fokus konten |
| **Minimal** | Unit dengan profil singkat |

### 4. Image Guidelines

**Logo**: 200x200px, PNG transparent  
**Hero Image**: 1920x600px, JPG/WebP  
**Profile Image**: 1200x800px  
**Photos**: 400x400px, square/portrait  
**Facility Images**: 800x600px

### 5. SEO Optimization

- **Slug**: Singkat dan deskriptif (`ekonomi`, bukan `fakultas-ekonomi-uit`)
- **Profile**: Minimal 150 karakter, informatif
- **Tagline**: Maksimal 80 karakter
- **Alt text**: Tambahkan deskripsi gambar

---

## Checklist Sebelum Publish

### Untuk Fakultas:
- [ ] unitType = `fakultas` ✅
- [ ] Basic info lengkap (name, slug, profile, vision, mission)
- [ ] Leader (Dekan) sudah diisi dengan position="Dekan"
- [ ] Assistants (Kepala Prodi) minimal 1, dengan field `program` diisi
- [ ] Programs minimal 1, tanpa duration/tuition/coordinator
- [ ] Images (logo, hero, profile) sudah diupload
- [ ] Layout sudah dipilih
- [ ] Entry sudah di-Publish

### Untuk Pascasarjana:
- [ ] unitType = `pascasarjana` ✅
- [ ] Basic info lengkap
- [ ] Leader (Direktur) sudah diisi dengan position="Direktur"
- [ ] Assistants (Asisten Direktur) minimal 1
- [ ] Programs minimal 1, **dengan duration, tuition, dan coordinator**
- [ ] Setiap program punya Coordinator dengan foto
- [ ] Images sudah diupload
- [ ] Entry sudah di-Publish

---

## Support & Testing

### Test URLs:

**Fakultas:**
```
http://localhost:4321/fakultas/ekonomi
http://localhost:4321/fakultas/hukum
```

**Pascasarjana:**
```
http://localhost:4321/pascasarjana/pascasarjana-uit
```

### API Test:

```bash
# Get all fakultas
curl "http://localhost:1337/api/academic-units?filters[unitType][$eq]=fakultas&populate=deep"

# Get all pascasarjana
curl "http://localhost:1337/api/academic-units?filters[unitType][$eq]=pascasarjana&populate=deep"
```

---

## Kesimpulan

Dengan **Unified Academic Units Collection**, Anda mendapatkan:

✅ **Satu sumber data** untuk Fakultas dan Pascasarjana  
✅ **Struktur konsisten** namun fleksibel  
✅ **URL tetap terpisah** untuk SEO  
✅ **Mudah maintain** dan scalable  
✅ **Support berbagai layout** dan customization  

---

**Dibuat:** Januari 2026  
**Versi:** 1.0.0  
**Compatibility:** Strapi v4, Astro v4+  

**Next Steps:**
1. Buat Collection di Strapi sesuai guide
2. Input sample data (1 fakultas + 1 pascasarjana)
3. Update frontend code (lihat guide berikutnya)
4. Test di localhost
5. Deploy to production
