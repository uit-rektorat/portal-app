# 🎨 Hero Slider - Panduan Lengkap

Panduan komprehensif untuk menggunakan Hero Slider dengan berbagai variasi layout di Portal UIT.

---

## 📐 Variasi Layout yang Tersedia

### 1. **Default Layout** (Klasik & Seimbang)
```
┌─────────────────────────────────────┐
│  Text Area        │   Image Area    │
│  - Title          │                 │
│  - Subtitle       │   [Image]       │
│  - Description    │                 │
│  - Buttons        │                 │
└─────────────────────────────────────┘
```

**Karakteristik:**
- Text di kiri, gambar di kanan (desktop)
- Full width text di mobile
- Cocok untuk: Slide dengan balance antara informasi dan visual
- Gambar: 1200x800px (3:2 ratio)

**Kapan Digunakan:**
- Memperkenalkan program atau fasilitas dengan visual pendukung
- Slide dengan informasi penting yang perlu gambar ilustrasi
- Content yang membutuhkan keseimbangan visual

---

### 2. **Full-Image Layout** (Dramatis & Eye-Catching)
```
┌─────────────────────────────────────┐
│ ░░░░░░ Background Image ░░░░░░░░░   │
│ ▓▓▓ Overlay Gradient ▓▓▓            │
│   Text Area (Overlay)               │
│   - Large Title                     │
│   - Subtitle                        │
│   - Description                     │
│   - Buttons                         │
└─────────────────────────────────────┘
```

**Karakteristik:**
- Full-screen background image dengan text overlay
- Gradient overlay untuk readability
- Text positioning di kiri
- Cocok untuk: Slide pembuka yang impactful

**Gambar Requirements:**
- Resolusi: 1920x1080px (16:9 ratio) - PENTING!
- Area safe zone: 30% kiri untuk text
- Hindari detail penting di area text overlay
- Kontras tinggi untuk readability

**Kapan Digunakan:**
- Slide pembuka/welcome yang kuat
- Menampilkan foto kampus yang stunning
- Event atau achievement yang perlu highlight visual
- Slide dengan message singkat tapi powerful

---

### 3. **Centered Layout** (Fokus pada Message)
```
┌─────────────────────────────────────┐
│                                     │
│         ┌─────────────┐             │
│         │   Content   │             │
│         │   Centered  │             │
│         │             │             │
│         └─────────────┘             │
│                                     │
└─────────────────────────────────────┘
```

**Karakteristik:**
- Text centered, tidak ada gambar
- Fokus penuh pada message
- Background gradient UIT
- Typography besar dan bold

**Kapan Digunakan:**
- Slide dengan quote atau message penting
- Announcement atau pengumuman
- Visi/Misi statement
- Call-to-action yang kuat tanpa distraksi visual

---

### 4. **Minimal Layout** (Clean & Profesional)
```
┌─────────────────────────────────────┐
│ Title                               │
│ Subtitle                            │
│ Link →                              │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Karakteristik:**
- Compact, simple
- Text link style button
- No image
- Clean and professional

**Kapan Digunakan:**
- Slide dengan informasi singkat
- Link ke halaman lain
- Minimalist approach
- Fast-loading priority

---

## 🎯 Rekomendasi Penggunaan per Slide

### Slide 1 (Pembuka)
- **Layout**: `centered` atau `full-image`
- **Content**: Welcome message, visi singkat
- **Buttons**: 1-2 CTA buttons
- **Duration**: User akan melihat ini pertama kali!

### Slide 2-3 (Informasi)
- **Layout**: `default`
- **Content**: Program, Fasilitas, Keunggulan
- **Buttons**: 1 CTA button dengan link relevan
- **Image**: Foto kampus, mahasiswa, atau fasilitas

### Slide 4+ (Optional)
- **Layout**: `minimal` atau `default`
- **Content**: Updates, news, atau info tambahan
- **Buttons**: Optional

---

## 📏 Spesifikasi Gambar Detail

### Layout Default - Gambar Samping
```
Dimensi: 1200 x 800 pixels
Ratio: 3:2 (Landscape)
Format: JPG (Quality 80-85%)
Size: Max 500KB
Orientation: Landscape
```

**Komposisi Gambar:**
- Subject di tengah frame
- Tidak terlalu detail (akan di-resize)
- Warna yang kontras dengan green UIT

### Layout Full-Image - Background
```
Dimensi: 1920 x 1080 pixels
Ratio: 16:9 (HD)
Format: JPG (Quality 80-85%)
Size: Max 500KB
Orientation: Landscape
```

**Komposisi Gambar:**
- Area kiri (30%) harus darker atau plain untuk text overlay
- Subject utama di kanan atau tengah-kanan
- Horizon line di 1/3 atas atau bawah (rule of thirds)
- Avoid busy background di area text

**Safe Zones:**
```
┌──────────────────────────────────┐
│ TEXT │                           │
│ ZONE │    Subject Area           │
│ 30%  │       (70%)               │
│      │                           │
└──────────────────────────────────┘
```

---

## 🔧 Setup di Strapi CMS

### Step-by-Step Hero Slider Setup

#### 1. Create Hero Content Type

Di Strapi Content-Type Builder, buat Collection Type dengan fields:

```
Display Name: Hero
API ID: hero

Fields:
├── title (Text, Required)
│   └── Max Length: 60
├── subtitle (Text, Required)  
│   └── Max Length: 80
├── description (Text, Optional)
│   └── Max Length: 150
├── image (Media - Single Image)
├── buttonText (Text, Optional)
├── buttonLink (Text, Optional)
├── buttonSecondaryText (Text, Optional)
├── buttonSecondaryLink (Text, Optional)
└── layout (Enumeration, Optional)
    └── Values: default, full-image, centered, minimal
```

#### 2. Set Permissions

Settings > Users & Permissions > Roles > Public:
- ✅ hero - find
- ✅ hero - findOne

#### 3. Upload Images

Media Library > Add new assets:
- Upload gambar sesuai layout yang dipilih
- Isi alternative text untuk SEO
- Organize dalam folder "hero-slides"

#### 4. Create Hero Entries

Content Manager > Hero > Create new entry:

**Example Entry 1 (Centered):**
```yaml
Title: Selamat Datang di UIT
Subtitle: Universitas Indonesia Timur
Description: Membangun Generasi Unggul dan Berkarakter
Layout: centered
Button Text: Pelajari Lebih Lanjut
Button Link: /profile
Button Secondary Text: (kosongkan)
Image: (kosongkan untuk centered layout)
```

**Example Entry 2 (Full-Image):**
```yaml
Title: Kampus Modern & Nyaman
Subtitle: Fasilitas Lengkap untuk Pembelajaran Optimal
Description: Dengan 50+ ruang kelas ber-AC, laboratorium komputer terbaru...
Layout: full-image
Button Text: Virtual Tour
Button Link: /tour
Image: [Upload gambar kampus 1920x1080]
```

**Example Entry 3 (Default):**
```yaml
Title: Program Studi Terakreditasi
Subtitle: Pilih Masa Depan Anda
Description: 15+ program studi dengan akreditasi A dan B
Layout: default
Button Text: Lihat Program Studi
Button Link: /programs
Image: [Upload gambar mahasiswa 1200x800]
```

#### 5. Publish Entries

- Klik "Save"
- Klik "Publish"
- Repeat untuk semua hero slides

---

## 🔌 Integrasi dengan Frontend

### Enable di index.astro

Edit `src/pages/index.astro`:

```typescript
// Uncomment these lines:
import { getHeroSlides } from '../lib/strapi';
const heroSlides = await getHeroSlides();

// Pass to component:
<HeroSlider slides={heroSlides} />
```

### Environment Variable

Pastikan file `.env` sudah di-setup:

```env
PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## 🎮 Navigasi Slider

### Controls yang Tersedia

1. **Arrow Buttons** (Kiri/Kanan)
   - Visible di desktop dan mobile
   - Position: Center kiri dan kanan
   - Hover effect: Scale up

2. **Dot Navigation** (Bottom)
   - Indicate jumlah slides dan posisi aktif
   - Clickable untuk jump ke slide tertentu
   - Active dot lebih lebar

3. **Keyboard Navigation**
   - Arrow Left: Previous slide
   - Arrow Right: Next slide

4. **Auto-play**
   - Interval: 6 detik per slide
   - Pause on hover
   - Resume on mouse leave
   - Reset timer setelah manual navigation

---

## 🎨 Tips Desain & Content

### Content Writing Tips

**Title:**
- Max 60 karakter
- Gunakan action words: "Bergabung", "Temukan", "Raih"
- Hindari kalimat pasif
- Font size akan auto-adjust berdasarkan panjang

**Subtitle:**
- Max 80 karakter
- Pelengkap title, bukan repetisi
- Highlight value proposition

**Description:**
- Max 150 karakter untuk readability
- Optional - gunakan hanya jika perlu detail tambahan
- Pisahkan dengan line breaks untuk list

**Buttons:**
- Primary: Action utama yang diinginkan
- Secondary: Alternative action
- Text singkat: "Daftar", "Pelajari", "Lihat", "Jelajah"

### Visual Design Tips

**Fotografi:**
- Natural lighting lebih baik
- Hindari over-editing
- Consistent color grading across slides
- Show diversity (mahasiswa, kampus, aktivitas)

**Composition:**
- Rule of thirds
- Leading lines ke area penting
- Balanced negative space
- Avoid clutter

**Color Harmony:**
- Pilih gambar yang harmonis dengan green UIT (#009B4C)
- Warm tones atau cool tones yang complement
- Hindari warna yang clash dengan brand color

---

## 🚀 Best Practices

### Performance

✅ **DO:**
- Compress images sebelum upload
- Gunakan JPG untuk foto (bukan PNG)
- Max 3-5 slides untuk optimal loading
- Preload first slide image

❌ **DON'T:**
- Upload images langsung dari kamera (5-10MB)
- Gunakan animated GIF (terlalu berat)
- Terlalu banyak slides (>7)
- Mix portrait dan landscape images

### Content Strategy

✅ **DO:**
- Update slides sesuai semester/event
- A/B test different layouts
- Monitor engagement via analytics
- Rotate content regularly

❌ **DON'T:**
- Terlalu banyak text
- Gunakan jargon atau bahasa teknis
- Duplicate content antar slides
- Leave outdated information

### Accessibility

✅ **DO:**
- Isi alternative text untuk semua gambar
- Pastikan contrast ratio text/background min 4.5:1
- Keyboard navigation support
- Meaningful button text (bukan "click here")

---

## 📊 Testing Checklist

Sebelum publish, test hal berikut:

- [ ] Semua slides tampil dengan benar
- [ ] Gambar load dengan cepat (<3 detik)
- [ ] Text readable di semua slides
- [ ] Buttons berfungsi dan link benar
- [ ] Auto-play berjalan smooth
- [ ] Navigation arrows berfungsi
- [ ] Dot navigation clickable
- [ ] Responsive di mobile
- [ ] Keyboard navigation work
- [ ] No console errors
- [ ] Images memiliki alt text

---

## 🐛 Troubleshooting

### Gambar tidak muncul
- Check PUBLIC_STRAPI_URL di .env
- Verify image uploaded dan published di Strapi
- Check browser console untuk error

### Text tertutup gambar (full-image layout)
- Re-crop image untuk safe zone text di kiri
- Atau ganti ke layout default

### Slider tidak auto-play
- Check browser console untuk JavaScript errors
- Pastikan ada minimal 2 slides

### Navigasi terpotong
- Sudah diperbaiki dengan size yang lebih besar (w-12 h-12)
- Z-index sudah diatur (z-20)

---

## 📚 Resources

- [Strapi Media Library Docs](https://docs.strapi.io/user-docs/latest/content-manager/managing-content.html#media-library)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** January 2026
**Version:** 2.0 (Multi-layout support)
