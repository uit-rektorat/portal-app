# Quick Start: Unified Academic Units

> **⚡ Panduan Cepat Implementasi Unified Academic Units Collection**

Ikuti langkah-langkah ini untuk mulai menggunakan unified collection untuk Fakultas dan Pascasarjana.

---

## 📋 Prerequisites

- ✅ Strapi sudah running (`http://localhost:1337`)
- ✅ Frontend Astro sudah running (`http://localhost:4321`)
- ✅ Sudah login ke Strapi Admin

---

## 🚀 Langkah Implementasi (30 menit)

### STEP 1: Buat Collection Type (10 menit)

1. **Buka Strapi Admin**: http://localhost:1337/admin
2. **Content-Type Builder** → **Create new collection type**
3. **Display Name**: `Academic Unit`
4. **API ID**: `academic-unit` (singular), `academic-units` (plural)

### STEP 2: Tambahkan Fields (15 menit)

Copy struktur ini **satu per satu**:

#### A. Basic Fields
```yaml
1. unitType (Enumeration) - REQUIRED
   Values: fakultas, pascasarjana
   Default: fakultas

2. name (Text) - REQUIRED
   Short text

3. slug (UID) - REQUIRED
   Attached to: name

4. tagline (Text)
   Short text

5. profile (Rich Text) - REQUIRED
   Full editor
```

#### B. Vision & Mission
```yaml
6. vision (Rich Text) - REQUIRED
7. mission (Rich Text) - REQUIRED
```

#### C. Images
```yaml
8. logo (Media) - Single image
9. heroImage (Media) - Single image
10. profileImage (Media) - Single image
```

#### D. Layout
```yaml
11. layout (Enumeration)
    Values: modern, classic, minimal
    Default: modern
```

#### E. Components (Create new)

**Statistics** (Repeatable):
```yaml
Component name: stat
Category: shared
Fields:
  - label (Text) - REQUIRED
  - value (Text) - REQUIRED
```

**Facilities** (Repeatable):
```yaml
Component name: facility
Category: shared
Fields:
  - name (Text) - REQUIRED
  - description (Text) - REQUIRED
  - image (Media)
```

**Achievements** (Repeatable):
```yaml
Component name: achievement
Category: shared
Fields:
  - title (Text) - REQUIRED
  - description (Text) - REQUIRED
  - year (Text)
```

**Activities** (Repeatable):
```yaml
Component name: activity
Category: shared
Fields:
  - title (Text) - REQUIRED
  - description (Text) - REQUIRED
  - date (Text)
  - image (Media)
```

**Leader** (Single):
```yaml
Component name: leader
Category: shared
Fields:
  - name (Text) - REQUIRED
  - position (Text)      # "Dekan" or "Direktur"
  - title (Text)         # "Prof. Dr.", "Dr."
  - photo (Media)
  - education (Text)
```

**Assistants** (Repeatable):
```yaml
Component name: assistant
Category: shared
Fields:
  - name (Text) - REQUIRED
  - position (Text) - REQUIRED  # "Kepala Program Studi" or "Asisten Direktur"
  - title (Text)
  - program (Text)              # For Kepala Prodi only
  - photo (Media)
  - education (Text)
```

**Programs** (Repeatable):
```yaml
Component name: program
Category: shared
Fields:
  - name (Text) - REQUIRED
  - degree (Text) - REQUIRED
  - description (Rich Text)
  - accreditation (Text)
  - link (Text)
  - duration (Text)             # For Pascasarjana
  - tuition (Text)              # For Pascasarjana
  
  Sub-Component: Coordinator (Single)
    Component name: coordinator
    Category: shared
    Fields:
      - name (Text) - REQUIRED
      - title (Text)
      - photo (Media)
      - education (Text)
```

### STEP 3: Configure Permissions (2 menit)

1. **Settings** → **Roles** → **Public**
2. Scroll ke `academic-units`
3. Check: `find` ✅ dan `findOne` ✅
4. **Save**

### STEP 4: Input Sample Data (3 menit)

#### Sample Fakultas:

**Content Manager** → **Academic Units** → **Create new entry**

```yaml
unitType: fakultas
name: Fakultas Ekonomi
slug: ekonomi (auto)
tagline: Mencetak Ekonom Profesional
profile: |
  Fakultas Ekonomi UIT adalah fakultas yang fokus pada 
  pengembangan ekonomi berkelanjutan.

vision: Menjadi fakultas ekonomi terkemuka di Indonesia Timur
mission: |
  - Menyelenggarakan pendidikan berkualitas
  - Mengembangkan riset ekonomi berkelanjutan

Leader:
  name: Prof. Dr. Ahmad Budiman, S.E., M.M.
  position: Dekan
  title: Prof. Dr.

Assistants:
  - name: Dr. Siti Rahmawati, S.E., M.Si.
    position: Kepala Program Studi
    title: Dr.
    program: S1 Manajemen

Programs:
  - name: S1 Manajemen
    degree: S1
    accreditation: A
    # NO duration, tuition, coordinator for fakultas
```

**Save** → **Publish**

#### Sample Pascasarjana:

**Create new entry**

```yaml
unitType: pascasarjana
name: Program Pascasarjana UIT
slug: pascasarjana-uit (auto)
tagline: Membangun Akademisi Berkualitas Global
profile: |
  Program Pascasarjana UIT menawarkan pendidikan 
  berkualitas tinggi untuk S2 dan S3.

vision: Menjadi program pascasarjana unggul di Indonesia Timur
mission: |
  - Menghasilkan lulusan S2/S3 berkualitas
  - Mengembangkan riset terapan

Leader:
  name: Prof. Dr. Andi Mappasessu, M.Si.
  position: Direktur
  title: Prof. Dr.

Assistants:
  - name: Dr. Muhammad Yusuf, M.T.
    position: Asisten Direktur Bidang Akademik
    title: Dr.

Programs:
  - name: Magister Kesehatan Masyarakat
    degree: S2
    accreditation: A
    duration: 2 Tahun (4 Semester)
    tuition: Rp 12.000.000/semester
    Coordinator:
      name: Dr. Siti Rahmawati, M.Kes
      title: Dr.
```

**Save** → **Publish**

---

## ✅ Testing (2 menit)

### 1. Test API:

```bash
# Get all akademic units
http://localhost:1337/api/academic-units?populate=deep

# Get fakultas only
http://localhost:1337/api/academic-units?filters[unitType][$eq]=fakultas&populate=deep

# Get pascasarjana only
http://localhost:1337/api/academic-units?filters[unitType][$eq]=pascasarjana&populate=deep
```

### 2. Test Frontend:

**Fakultas:**
```
http://localhost:4321/fakultas/ekonomi
```

**Pascasarjana:**
```
http://localhost:4321/pascasarjana/pascasarjana-uit
```

✅ **Jika halaman muncul dengan data lengkap, implementasi BERHASIL!**

---

## 🎉 Selesai!

Anda sekarang memiliki unified collection yang support:
- ✅ Fakultas (Dekan + Kepala Prodi)
- ✅ Pascasarjana (Direktur + Asisten + Coordinator per program)
- ✅ URL terpisah untuk SEO
- ✅ Struktur data konsisten

---

## 📚 Next Steps

1. **Migrate Data Lama** (jika ada):
   - Lihat [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md#migration-dari-data-lama)
   
2. **Baca Guide Lengkap**:
   - [UNIFIED_ACADEMIC_UNITS_GUIDE.md](UNIFIED_ACADEMIC_UNITS_GUIDE.md)

3. **Customize Layout**:
   - Pilih layout: `modern`, `classic`, atau `minimal`
   - Upload images sesuai guidelines

---

## 🆘 Troubleshooting

### Halaman 404
- ✅ Pastikan entry sudah **Published** (bukan Draft)
- ✅ Check slug matches URL

### Data Tidak Muncul
- ✅ Check API endpoint: `/api/academic-units?populate=deep`
- ✅ Verify permissions (Public role: find & findOne)

### Images Tidak Tampil
- ✅ Check populate query include images
- ✅ Pastikan images ter-upload di Strapi

---

**Quick Start Date:** 13 Januari 2026  
**Estimated Time:** ~30 minutes  
**Difficulty:** ⭐⭐ Intermediate  
**Support:** See [UNIFIED_ACADEMIC_UNITS_GUIDE.md](UNIFIED_ACADEMIC_UNITS_GUIDE.md#support)
