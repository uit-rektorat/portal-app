# Portal UIT - Universitas Indonesia Timur

Website profile kampus Universitas Indonesia Timur (UIT) yang dibangun dengan Astro Framework, Tailwind CSS, dan integrasi Strapi Headless CMS.

## 🚀 Fitur

- **Mobile-First Design**: Responsif di semua perangkat
- **Modern & Professional**: Tampilan modern dengan warna resmi UIT
- **Hero Slider with Multiple Layouts**: 4 variasi layout slider (default, full-image, centered, minimal)
- **Gallery System**: Sistem galeri dengan search, filter, dan lightbox
- **Modular Components**: Komponen yang dapat digunakan kembali
- **Strapi CMS Integration**: Content management dengan Strapi REST API
- **Social Media Integration**: YouTube, Instagram, Facebook di header
- **Optimized Images**: Auto-responsive dengan breakpoints
- **Keyboard Navigation**: Support keyboard untuk slider
- **Auto-play Slider**: Smooth transition dengan pause on hover

## 📁 Struktur Proyek

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── home/       # Home page specific components
│   │   │   ├── HeroSlider.astro
│   │   │   ├── QuickAccess.astro
│   │   │   ├── CampusAdvantages.astro
│   │   │   ├── CampusInfo.astro
│   │   │   ├── Gallery.astro
│   │   │   └── Testimonials.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   ├── lib/            # Utilities and API clients
│   │   └── strapi.ts   # Strapi REST API client
│   ├── pages/          # Page routes
│   │   ├── index.astro      # Home page (Beranda)
│   │   ├── profile.astro    # Profile page
│   │   └── gallery/
│   │       └── index.astro  # Gallery page
│   └── styles/         # Global styles
│       └── global.css  # Tailwind CSS imports
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🎨 Halaman

### 1. Beranda (Home)
Halaman utama dengan section:
- **Hero/Slider**: Banner utama dengan 4 variasi layout:
  - `default`: Text + Image side-by-side
  - `full-image`: Full background image dengan text overlay
  - `centered`: Text centered tanpa image
  - `minimal`: Compact text dengan link style
- **Quick Access**: Akses cepat ke berbagai layanan kampus
- **Keunggulan Kampus**: Showcase keunggulan UIT
- **Berita/Pengumuman**: Informasi terkini
- **Gallery**: Galeri foto kegiatan kampus dengan slider interaktif
- **Testimoni**: Testimoni dari alumni dan mahasiswa

### 2. Gallery
Halaman galeri lengkap dengan:
- **Search Bar**: Pencarian foto berdasarkan judul atau deskripsi
- **Category Filter**: Filter berdasarkan kategori (Umum, Prestasi, Fasilitas, Kegiatan)
- **Program Studi Filter**: Filter berdasarkan program studi
- **Grid Layout**: Layout responsif 1-4 kolom tergantung ukuran layar
- **Lightbox**: Preview foto dengan navigasi dan informasi detail
- **Pagination**: Navigasi halaman untuk performa optimal

### 3. Profil
Halaman profil dengan:
- **Visi**: Visi UIT
- **Misi**: Daftar misi UIT
- **Sejarah**: Sejarah singkat universitas

## 🛠️ Teknologi

- **[Astro](https://astro.build/)**: Web framework
- **[Tailwind CSS](https://tailwindcss.com/)**: Styling
- **[TypeScript](https://www.typescriptlang.org/)**: Type safety
- **[GraphQL Request](https://github.com/jasonkuhrt/graphql-request)**: API client untuk Strapi

## 📚 Panduan API

- **[STRAPI_GUIDE.md](./STRAPI_GUIDE.md)**: Panduan lengkap setup Strapi CMS
- **[GALLERY_STRAPI_GUIDE.md](./GALLERY_STRAPI_GUIDE.md)**: Panduan API Strapi untuk Gallery

## 📦 Instalasi & Menjalankan

1. Install dependencies (sudah dilakukan)
```bash
pnpm install
```

2. Setup environment variables
```bash
cp .env.example .env
```

3. Jalankan development server
```bash
pnpm dev
```

Website akan berjalan di `http://localhost:4321`

## 🔗 Integrasi Strapi

### Setup Strapi Backend

1. Install Strapi
```bash
npx create-strapi-app@latest backend --quickstart
```

2. Buat Content Types di Strapi sesuai dengan struktur data yang dibutuhkan:
   - **Heroes** (Hero Slider) - Lihat [HERO_SLIDER_GUIDE.md](HERO_SLIDER_GUIDE.md)
   - **Quick Accesses** (Quick Access)
   - **Campus Advantages** (Keunggulan Kampus)
   - **Articles** (Berita/Pengumuman)
   - **Testimonials** (Testimoni)
   - **Profile** (Single Type untuk Visi-Misi)

3. Enable GraphQL plugin di Strapi
```bash
npm install @strapi/plugin-graphql
```

4. Konfigurasi permissions untuk public access di Strapi admin panel

**Dokumentasi Lengkap:**
- 📖 [STRAPI_GUIDE.md](STRAPI_GUIDE.md) - Setup Strapi & Content Types
- 🎨 [HERO_SLIDER_GUIDE.md](HERO_SLIDER_GUIDE.md) - Panduan Hero Slider dengan variasi layout

### Mengaktifkan Data dari Strapi

Di file `src/pages/index.astro` dan `src/pages/profile.astro`, uncomment bagian import Strapi dan pass data ke components.

**Example:**
```typescript
// Uncomment these lines
import { getHeroSlides } from '../lib/strapi';
const heroSlides = await getHeroSlides();

// Pass to component
<HeroSlider slides={heroSlides} />
```

## 🖼️ Rekomendasi Gambar

### Hero Slider
- **Default Layout**: 1200x800px (3:2 ratio) - JPG, max 500KB
- **Full-Image Layout**: 1920x1080px (16:9 ratio) - JPG, max 500KB
- **Tools**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

### Articles/News
- **Size**: 800x600px (4:3 ratio) - JPG, max 300KB

### Testimonials Avatar
- **Size**: 400x400px (1:1 ratio) - JPG, max 100KB

**Lihat detail lengkap di [HERO_SLIDER_GUIDE.md](HERO_SLIDER_GUIDE.md)**

## 🎨 Customization

### Social Media Links
Update link social media di `src/components/Footer.astro`:
```astro
<a href="https://facebook.com/uit" ...>
<a href="https://instagram.com/uit" ...>
<a href="https://youtube.com/@uit" ...>
```

### Logo & Konten
- Logo: Edit di `src/components/Header.astro` dan `src/components/Footer.astro`
- Konten: Konten default sudah tersedia di setiap component

## 📱 Responsive Design

Website ini didesain dengan konsep mobile-first:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📧 Contact

Universitas Indonesia Timur
- Email: info@uit.ac.id
- Phone: (0411) 123-4567
- Address: Jl. Pendidikan No. 123, Makassar, Sulawesi Selatan

---

Built with ❤️ using [Astro](https://astro.build/) & [Tailwind CSS](https://tailwindcss.com/)
