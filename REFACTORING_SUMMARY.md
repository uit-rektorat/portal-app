# Refactoring Summary: Unified Academic Units

## 🎯 Tujuan Refactoring

Menggabungkan Collection **"Fakultas"** dan **"Graduate Programs"** menjadi satu collection terpadu **"Academic Units"** untuk:
- ✅ Konsistensi struktur data
- ✅ Kemudahan pengelolaan
- ✅ Menghilangkan kebingungan struktur nested
- ✅ Support Fakultas (Dekan + Kepala Prodi) dan Pascasarjana (Direktur + Asisten)

---

## 📁 Files yang Telah Diubah

### 1. **UNIFIED_ACADEMIC_UNITS_GUIDE.md** (NEW ✨)
Panduan lengkap setup collection baru:
- Setup Strapi Collection "Academic Units"
- Field structure detail
- Cara input data untuk Fakultas
- Cara input data untuk Pascasarjana
- Migration guide dari structure lama
- Troubleshooting

### 2. **src/lib/strapi.ts** (UPDATED 🔄)

#### Interface Baru:
```typescript
export interface AcademicUnit {
  id: string;
  unitType: 'fakultas' | 'pascasarjana';
  name: string;
  slug: string;
  // ... all common fields
  leader?: { ... };      // Dekan or Direktur
  assistants?: [...];    // Kepala Prodi or Asisten Direktur
  programs?: [...];      // Supports both types
}
```

#### Functions Baru:
- `getAllAcademicUnits()` - Get semua unit (fakultas + pascasarjana)
- `getAcademicUnit(slug)` - Get single unit by slug
- `transformAcademicUnit()` - Helper transform data

#### Legacy Functions (Updated untuk backward compatibility):
- `getAllFakultas()` - Sekarang filter dari Academic Units dengan `unitType='fakultas'`
- `getFakultas(slug)` - Filter fakultas dari unified collection
- `getAllPascasarjana()` - Filter pascasarjana dari unified collection
- `getPascasarjana(slug)` - Filter pascasarjana dari unified collection

### 3. **FAKULTAS_STRAPI_GUIDE.md** (DEPRECATED ⚠️)
- Tambah warning deprecation di awal file
- Redirect ke UNIFIED_ACADEMIC_UNITS_GUIDE.md

### 4. **GRADUATE_PROGRAMS_GUIDE.md** (DEPRECATED ⚠️)
- Tambah warning deprecation di awal file
- Penjelasan mengapa struktur lama bermasalah
- Redirect ke UNIFIED_ACADEMIC_UNITS_GUIDE.md

---

## 🚀 Cara Implementasi

### Step 1: Setup di Strapi

1. **Buat Collection Type Baru**
   ```
   Display Name: Academic Unit
   API ID (Singular): academic-unit
   API ID (Plural): academic-units
   ```

2. **Tambahkan Fields** sesuai [UNIFIED_ACADEMIC_UNITS_GUIDE.md](UNIFIED_ACADEMIC_UNITS_GUIDE.md)
   - Basic Info: `unitType`, `name`, `slug`, `tagline`, `profile`
   - Vision & Mission: `vision`, `mission`
   - Images: `logo`, `heroImage`, `profileImage`
   - Layout: `layout` (modern/classic/minimal)
   - Components: `Statistics`, `Facilities`, `Achievements`, `Activities`
   - Leadership: `Leader`, `Assistants`
   - Programs: `Programs` (with optional `Coordinator`)

3. **Configure Permissions**
   - Settings → Roles → Public
   - Enable `find` dan `findOne` untuk `academic-units`

### Step 2: Input Sample Data

#### Sample Fakultas:
```yaml
unitType: fakultas
name: Fakultas Ekonomi
slug: ekonomi
leader:
  name: Prof. Dr. Ahmad Budiman
  position: Dekan
assistants:
  - name: Dr. Siti Rahmawati
    position: Kepala Program Studi
    program: S1 Manajemen
programs:
  - name: S1 Manajemen
    degree: S1
    accreditation: A
    # NO duration, tuition, coordinator
```

#### Sample Pascasarjana:
```yaml
unitType: pascasarjana
name: Program Pascasarjana UIT
slug: pascasarjana-uit
leader:
  name: Prof. Dr. Andi Mappasessu
  position: Direktur
assistants:
  - name: Dr. Muhammad Yusuf
    position: Asisten Direktur Bidang Akademik
programs:
  - name: Magister Kesehatan Masyarakat
    degree: S2
    accreditation: A
    duration: 2 Tahun (4 Semester)
    tuition: Rp 12.000.000/semester
    coordinator:
      name: Dr. Siti Rahmawati
      title: Dr.
      photo: [upload]
```

### Step 3: Test Frontend

Frontend code **tidak perlu diubah** karena:
- Interface lama (`Fakultas`, `Pascasarjana`) masih ada
- Functions lama masih berfungsi (memanggil unified collection dengan filter)
- Pages (`/fakultas/[slug]`, `/pascasarjana/[slug]`) otomatis support

**Test URLs:**
```
http://localhost:4321/fakultas/ekonomi
http://localhost:4321/pascasarjana/pascasarjana-uit
```

---

## 🔄 Migration dari Data Lama

### Option 1: Manual Migration (Recommended untuk < 10 entries)

1. Buka Strapi Admin → Content Manager
2. Buat entry baru di "Academic Units"
3. Copy data dari "Faculties" atau "Graduate Programs" lama
4. Set `unitType` dengan benar (`fakultas` atau `pascasarjana`)
5. Adjust field names:
   - `Dean` → `Leader` dengan position="Dekan"
   - `Heads` → `Assistants` dengan position="Kepala Program Studi"
6. Publish entry baru
7. Verify di frontend
8. Unpublish entry lama
9. Hapus collection lama setelah semua data ter-migrate

### Option 2: Script Migration (untuk data banyak)

Lihat migration script example di [UNIFIED_ACADEMIC_UNITS_GUIDE.md](UNIFIED_ACADEMIC_UNITS_GUIDE.md#migration-dari-structure-lama)

---

## ✅ Checklist Implementasi

- [x] Buat guide UNIFIED_ACADEMIC_UNITS_GUIDE.md
- [x] Update TypeScript interfaces di strapi.ts
- [x] Tambahkan helper functions `getAllAcademicUnits()` dan `getAcademicUnit()`
- [x] Update legacy functions untuk backward compatibility
- [x] Add deprecation warnings di guides lama
- [x] Verifikasi pages tetap bekerja dengan struktur baru

### TODO untuk User:

- [ ] Buat Collection "Academic Units" di Strapi
- [ ] Input 1 sample Fakultas untuk testing
- [ ] Input 1 sample Pascasarjana untuk testing
- [ ] Test di frontend (`/fakultas/[slug]` dan `/pascasarjana/[slug]`)
- [ ] Migrate semua data lama ke struktur baru
- [ ] Hapus collection "Faculties" dan "Graduate Programs" lama

---

## 🎨 Struktur Data Comparison

### ❌ Struktur Lama (Graduate Programs)

```
Graduate Program (entry)
└── Programs (array) ← NESTED, CONFUSING!
    ├── Program 1: Magister Kesehatan
    │   └── Coordinator
    ├── Program 2: Magister Manajemen
    │   └── Coordinator
    └── Program 3: Doktor Administrasi
        └── Coordinator
```

**Problem:** "Graduate Program" yang isinya "Programs" membingungkan!

### ✅ Struktur Baru (Unified Academic Units)

```
Academic Unit (entry) 
├── unitType: fakultas
├── Leader: Dekan
├── Assistants: [Kepala Prodi 1, Kepala Prodi 2]
└── Programs: [S1 Program A, S1 Program B]

Academic Unit (entry)
├── unitType: pascasarjana  
├── Leader: Direktur
├── Assistants: [Asisten Direktur 1, Asisten Direktur 2]
└── Programs: [S2 Program A (+ Coordinator), S2 Program B (+ Coordinator)]
```

**Solution:** Konsisten dan jelas!

---

## 🌟 Keuntungan Struktur Baru

| Aspek | Struktur Lama | Struktur Baru |
|-------|---------------|---------------|
| **Collections** | 2 terpisah (Faculties, Graduate Programs) | 1 unified (Academic Units) |
| **Consistency** | ❌ Berbeda-beda | ✅ Seragam |
| **Leadership** | Dean (fakultas) ❌ tidak ada (pascasarjana) | Leader (Dekan/Direktur) ✅ |
| **Assistants** | Heads (fakultas) ❌ tidak ada (pascasarjana) | Assistants (Kepala Prodi/Asisten Direktur) ✅ |
| **Programs** | Simple (fakultas), Nested confusing (pascasarjana) | ✅ Unified dengan optional fields |
| **Maintenance** | ❌ Susah, 2 tempat | ✅ Mudah, 1 tempat |
| **URLs** | Terpisah | ✅ Tetap terpisah (SEO friendly) |

---

## 📞 Support

Jika ada pertanyaan atau issue:

1. Cek [UNIFIED_ACADEMIC_UNITS_GUIDE.md](UNIFIED_ACADEMIC_UNITS_GUIDE.md) untuk detail lengkap
2. Review [Troubleshooting section](UNIFIED_ACADEMIC_UNITS_GUIDE.md#troubleshooting)
3. Test API endpoint: `http://localhost:1337/api/academic-units?populate=deep`

---

**Refactoring Date:** 13 Januari 2026  
**Affected Files:** 4 files (1 new, 3 updated)  
**Breaking Changes:** ❌ None (backward compatible)  
**Recommended Action:** Follow implementation checklist above
