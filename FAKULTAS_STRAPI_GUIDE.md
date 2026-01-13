# Panduan Setup Fakultas di Strapi

> ⚠️ **DEPRECATED - Gunakan UNIFIED_ACADEMIC_UNITS_GUIDE.md**
> 
> Guide ini sudah tidak digunakan lagi. Kami telah menggabungkan Collection "Fakultas" dan "Graduate Programs" menjadi satu collection terpadu bernama **"Academic Units"**.
> 
> **Keuntungan struktur baru:**
> - ✅ Satu collection untuk Fakultas & Pascasarjana
> - ✅ Struktur data konsisten dan mudah dikelola
> - ✅ URL tetap terpisah (`/fakultas/[slug]` dan `/pascasarjana/[slug]`)
> 
> 📖 **Silakan gunakan:** [UNIFIED_ACADEMIC_UNITS_GUIDE.md](UNIFIED_ACADEMIC_UNITS_GUIDE.md)

---

## Overview
Panduan ini menjelaskan cara membuat dan mengelola Collection Type "Fakultas" di Strapi untuk menampilkan halaman detail fakultas dengan 3 variasi layout.

## 1. Buat Collection Type "Fakultas"

Masuk ke Strapi Admin → Content-Type Builder → Create new collection type

**Display Name:** `Fakultas`
**API ID (Singular):** `fakultas`
**API ID (Plural):** `fakultas`

## 2. Field Structure

### Basic Information
| Field Name | Type | Options |
|------------|------|---------|
| `name` | Text | Required, Short text |
| `slug` | UID | Required, Attached field: name |
| `tagline` | Text | Optional, Short text |
| `profile` | Rich Text | Required, Full markdown editor |

### Vision & Mission
| Field Name | Type | Options |
|------------|------|---------|
| `vision` | Rich Text | Required, Full markdown editor |
| `mission` | Rich Text | Required, Full markdown editor |

### Images
| Field Name | Type | Options |
|------------|------|---------|
| `logo` | Media | Single image, Optional |
| `heroImage` | Media | Single image, Optional |
| `profileImage` | Media | Single image, Optional |

### Layout Configuration
| Field Name | Type | Options |
|------------|------|---------|
| `layout` | Enumeration | Values: `modern`, `classic`, `minimal` (Default: `modern`) |

### Statistics (Component - Repeatable)
**Component Name:** `stats`

Create a component with:
- `label` (Text, Required) - e.g., "Mahasiswa Aktif"
- `value` (Text, Required) - e.g., "1200+"

### Facilities (Component - Repeatable)
**Component Name:** `facilities`

Create a component with:
- `name` (Text, Required) - e.g., "Laboratorium Komputer"
- `description` (Text, Required)
- `image` (Media, Single image, Optional)

### Achievements (Component - Repeatable)
**Component Name:** `achievements`

Create a component with:
- `title` (Text, Required)
- `description` (Text, Required)
- `year` (Text, Optional) - e.g., "2024"

### Activities (Component - Repeatable)
**Component Name:** `activities`

Create a component with:
- `title` (Text, Required)
- `description` (Text, Required)
- `date` (Text, Optional)
- `image` (Media, Single image, Optional)

### Dean (Component - Single)
**Component Name:** `dean`

Create a component with:
- `name` (Text, Required)
- `title` (Text, Optional) - e.g., "Prof. Dr."
- `photo` (Media, Single image, Optional)
- `education` (Text, Optional) - e.g., "S3 Manajemen Pendidikan"

### Heads (Component - Repeatable)
**Component Name:** `heads`

Create a component with:
- `name` (Text, Required)
- `title` (Text, Optional) - e.g., "Dr."
- `program` (Text, Required) - e.g., "S1 Ilmu Komputer"
- `photo` (Media, Single image, Optional)
- `education` (Text, Optional)

### Programs (Component - Repeatable)
**Component Name:** `programs`

Create a component with:
- `name` (Text, Required) - e.g., "S1 Ilmu Komputer"
- `degree` (Text, Required) - e.g., "S1", "D3"
- `description` (Text, Optional)
- `accreditation` (Text, Optional) - e.g., "A", "B", "Unggul"
- `link` (Text, Optional) - URL ke detail prodi

## 3. Permissions

 j;jl;;l;l;;
Setelah data dibuat, halaman fakultas akan tersedia di:
- `/fakultas/ekonomi`
- `/fakultas/hukum`
- `/fakultas/ilmu-komputer`
- dst.

URL ini dibuat otomatis dari field `slug`.

## 6. Tips

### Gambar
- **Logo**: 200x200px, format PNG dengan background transparan
- **Hero Image**: 1920x600px, format JPG/WebP
- **Profile Image**: 1200x800px
- **Facility Images**: 800x600px
- **Photos**: 400x400px untuk foto profil

### Layout Guidelinesv/g/.gl jk kjkkhkkhkh,,,,,,N     jsyxyhgg gfggg
- **Modern**: Cocok untuk fakultas dengan visual yang kuat, banyak foto dan statistik
- **Classic**: Cocok untuk fakultas tradisional, fokus pada konten dan struktur organisasi
- **Minimal**: Cocok untuk fakultas dengan fokus pada kesederhanaan dan keterbacaan

### SEO
- Slug harus singkat dan deskriptif (e.g., `ekonomi`, bukan `fakultas-ekonomi-uit`)
- Profile dan description harus informatif (minimal 150 karakter)
- Gunakan heading tags yang tepat di rich text

## 7. API Endpoints

Data fakultas dapat diakses via REST API:

```bash
# Get all fakultas
GET /api/fakultas?populate=deep&sort=name:asc

# Get single fakultas by slug
GET /api/fakultas?filters[slug][$eq]=ekonomi&populate=deep
```

## 8. Testing

Setelah setup, test dengan:

1. Buat minimal 1 data fakultas lengkap
2. Pastikan slug unik dan sesuai
3. Akses `/fakultas/[slug]` di frontend
4. Coba 3 variasi layout berbeda
5. Pastikan semua komponen tampil dengan benar

## 9. Maintenance

- Update data fakultas secara berkala
- Tambahkan prestasi dan kegiatan terbaru
- Update foto struktur organisasi setiap periode
- Review dan update akreditasi program studi

---

**Catatan**: Setelah membuat collection type dan component, jangan lupa untuk melakukan "Restart Server" di Strapi agar perubahan diterapkan.
