# Panduan Implementasi Strapi CMS untuk Section Informasi Kampus

## Daftar Isi
1. [Struktur Content Types Strapi](#struktur-content-types-strapi)
2. [Setup Collection Types](#setup-collection-types)
3. [Konfigurasi Fields](#konfigurasi-fields)
4. [Implementasi API Functions](#implementasi-api-functions)
5. [Update Component dengan Data Strapi](#update-component-dengan-data-strapi)
6. [Testing dan Deployment](#testing-dan-deployment)

---

## 1. Struktur Content Types Strapi

Section "Informasi Kampus" membutuhkan 3 Collection Types di Strapi:

### A. News (Berita)
### B. Agenda
### C. Announcement (Pengumuman)

---

## 2. Setup Collection Types

### A. Collection Type: News

**Display Name:** `News`  
**API ID:** `news`  
**API ID (plural):** `newses`

#### Fields:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| title | Text | ✓ | Short text - Judul berita |
| slug | UID | ✓ | Attached to title |
| excerpt | Text | ✓ | Long text - Ringkasan berita |
| content | Rich Text | ✓ | Konten lengkap berita |
| image | Media | ✓ | Single media - Gambar utama berita |
| category | Text | ✓ | Short text - Kategori (Prestasi, Akademik, Event, dll) |
| publishedDate | Date | ✓ | Date only |
| author | Text | - | Short text - Penulis berita |
| featured | Boolean | - | Default: false - Untuk highlight berita penting |

**Cara Membuat di Strapi:**

1. Login ke Strapi Admin Panel
2. Klik **Content-Types Builder** di sidebar
3. Klik **Create new collection type**
4. Isi:
   - Display name: `News`
   - API ID (singular): `news`
   - API ID (plural): `newses`
5. Klik **Continue**
6. Tambahkan fields satu per satu:

**Field: title**
- Select field: `Text`
- Name: `title`
- Type: `Short text`
- ✓ Required field
- Klik **Finish**

**Field: slug**
- Select field: `UID`
- Name: `slug`
- Attached field: `title`
- ✓ Required field
- Klik **Finish**

**Field: excerpt**
- Select field: `Text`
- Name: `excerpt`
- Type: `Long text`
- ✓ Required field
- Klik **Finish**

**Field: content**
- Select field: `Rich text`
- Name: `content`
- ✓ Required field
- Klik **Finish**

**Field: image**
- Select field: `Media`
- Name: `image`
- Type: `Single media`
- ✓ Required field
- Allowed types: `images`
- Klik **Finish**

**Field: category**
- Select field: `Text`
- Name: `category`
- Type: `Short text`
- ✓ Required field
- Klik **Finish**

**Field: publishedDate**
- Select field: `Date`
- Name: `publishedDate`
- Type: `date` (without time)
- ✓ Required field
- Klik **Finish**

**Field: author**
- Select field: `Text`
- Name: `author`
- Type: `Short text`
- Klik **Finish**

**Field: featured**
- Select field: `Boolean`
- Name: `featured`
- Default value: `false`
- Klik **Finish**

7. Klik **Save** untuk menyimpan Content Type

---

### B. Collection Type: Agenda

**Display Name:** `Agenda`  
**API ID:** `agenda`  
**API ID (plural):** `agenda`

#### Fields:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| title | Text | ✓ | Short text - Judul agenda |
| description | Text | ✓ | Long text - Deskripsi agenda |
| eventDate | Date | ✓ | Date only - Tanggal acara |
| startTime | Text | ✓ | Short text - Format: "08:00 WIB" |
| endTime | Text | ✓ | Short text - Format: "12:00 WIB" |
| location | Text | ✓ | Short text - Lokasi acara |
| organizer | Text | - | Short text - Penyelenggara |
| registrationUrl | Text | - | Short text - Link pendaftaran (jika ada) |
| image | Media | - | Single media - Gambar/poster acara |

**Cara Membuat:**

1. Klik **Content-Types Builder** > **Create new collection type**
2. Display name: `Agenda`
3. Tambahkan fields sesuai tabel di atas dengan cara yang sama seperti News
4. Klik **Save**

---

### C. Collection Type: Announcement

**Display Name:** `Announcement`  
**API ID:** `announcement`  
**API ID (plural):** `announcements`

#### Fields:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| title | Text | ✓ | Short text - Judul pengumuman |
| slug | UID | ✓ | Attached to title |
| excerpt | Text | ✓ | Long text - Ringkasan pengumuman |
| content | Rich Text | ✓ | Konten lengkap pengumuman |
| publishedDate | Date | ✓ | Date only |
| priority | Enumeration | ✓ | Values: "high", "normal" |
| validUntil | Date | - | Date only - Batas waktu pengumuman |
| targetAudience | Text | - | Short text - Target (Mahasiswa, Dosen, Umum) |
| attachment | Media | - | Single media - File lampiran |

**Field: priority (Enumeration)**
- Select field: `Enumeration`
- Name: `priority`
- Values: 
  - `high`
  - `normal`
- Default value: `normal`
- ✓ Required field
- Klik **Finish**

---

## 3. Konfigurasi Permissions (Roles & Permissions)

Setelah membuat Collection Types, atur permissions agar data bisa diakses dari frontend:

1. Klik **Settings** di sidebar
2. Klik **Roles** under USERS & PERMISSIONS PLUGIN
3. Klik **Public** role
4. Scroll ke section News, Agenda, dan Announcement
5. Centang checkbox berikut untuk masing-masing collection:
   - ✓ `find` (Get multiple entries)
   - ✓ `findOne` (Get one entry)
6. Klik **Save**

---

## 4. Implementasi API Functions

Update file `src/lib/strapi.ts` untuk menambahkan fungsi API:

```typescript
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}

// ===== NEWS API =====

export interface NewsAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  category: string;
  publishedDate: string;
  author?: string;
  featured?: boolean;
}

export async function getNews(limit: number = 6): Promise<any[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/newses?` +
      `populate=image&` +
      `sort=publishedDate:desc&` +
      `pagination[limit]=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data: StrapiResponse<NewsAttributes> = await response.json();
    
    return data.data.map(item => ({
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      image: item.attributes.image?.data?.attributes?.url 
        ? `${STRAPI_URL}${item.attributes.image.data.attributes.url}`
        : '/images/news/default.jpg',
      category: item.attributes.category,
      date: item.attributes.publishedDate,
      author: item.attributes.author,
      featured: item.attributes.featured
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<any | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/newses?` +
      `filters[slug][$eq]=${slug}&` +
      `populate=image`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data: StrapiResponse<NewsAttributes> = await response.json();
    
    if (data.data.length === 0) {
      return null;
    }
    
    const item = data.data[0];
    return {
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      image: item.attributes.image?.data?.attributes?.url 
        ? `${STRAPI_URL}${item.attributes.image.data.attributes.url}`
        : '/images/news/default.jpg',
      category: item.attributes.category,
      date: item.attributes.publishedDate,
      author: item.attributes.author,
      featured: item.attributes.featured
    };
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

// ===== AGENDA API =====

export interface AgendaAttributes {
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer?: string;
  registrationUrl?: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export async function getAgenda(limit: number = 4): Promise<any[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/agenda?` +
      `populate=image&` +
      `sort=eventDate:asc&` +
      `pagination[limit]=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch agenda');
    }
    
    const data: StrapiResponse<AgendaAttributes> = await response.json();
    
    return data.data.map(item => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      date: item.attributes.eventDate,
      time: `${item.attributes.startTime} - ${item.attributes.endTime}`,
      location: item.attributes.location,
      organizer: item.attributes.organizer,
      registrationUrl: item.attributes.registrationUrl,
      image: item.attributes.image?.data?.attributes?.url 
        ? `${STRAPI_URL}${item.attributes.image.data.attributes.url}`
        : null
    }));
  } catch (error) {
    console.error('Error fetching agenda:', error);
    return [];
  }
}

// ===== ANNOUNCEMENTS API =====

export interface AnnouncementAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  priority: 'high' | 'normal';
  validUntil?: string;
  targetAudience?: string;
  attachment?: {
    data: {
      attributes: {
        url: string;
        name: string;
      };
    };
  };
}

export async function getAnnouncements(limit: number = 5): Promise<any[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/announcements?` +
      `populate=attachment&` +
      `sort=publishedDate:desc&` +
      `pagination[limit]=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    
    const data: StrapiResponse<AnnouncementAttributes> = await response.json();
    
    return data.data.map(item => ({
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      date: item.attributes.publishedDate,
      priority: item.attributes.priority,
      validUntil: item.attributes.validUntil,
      targetAudience: item.attributes.targetAudience,
      attachment: item.attributes.attachment?.data?.attributes 
        ? {
            url: `${STRAPI_URL}${item.attributes.attachment.data.attributes.url}`,
            name: item.attributes.attachment.data.attributes.name
          }
        : null
    }));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
}

export async function getAnnouncementBySlug(slug: string): Promise<any | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/announcements?` +
      `filters[slug][$eq]=${slug}&` +
      `populate=attachment`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch announcement');
    }
    
    const data: StrapiResponse<AnnouncementAttributes> = await response.json();
    
    if (data.data.length === 0) {
      return null;
    }
    
    const item = data.data[0];
    return {
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      date: item.attributes.publishedDate,
      priority: item.attributes.priority,
      validUntil: item.attributes.validUntil,
      targetAudience: item.attributes.targetAudience,
      attachment: item.attributes.attachment?.data?.attributes 
        ? {
            url: `${STRAPI_URL}${item.attributes.attachment.data.attributes.url}`,
            name: item.attributes.attachment.data.attributes.name
          }
        : null
    };
  } catch (error) {
    console.error('Error fetching announcement by slug:', error);
    return null;
  }
}
```

---

## 5. Update Component dengan Data Strapi

### A. Update CampusInfo.astro Component

Modifikasi bagian props dan data handling di `src/components/home/CampusInfo.astro`:

```astro
---
/**
 * CampusInfo Component
 * Displays Campus Information with tabs: Berita (News), Agenda, and Pengumuman (Announcements)
 * Features a carousel for news items showing 3 at a time from 6 total
 */

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

interface AgendaItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface AnnouncementItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  priority: 'high' | 'normal';
  slug: string;
}

// Props dari parent component
interface Props {
  newsItems?: NewsItem[];
  agendaItems?: AgendaItem[];
  announcements?: AnnouncementItem[];
}

const { newsItems, agendaItems, announcements } = Astro.props;

// Fallback data jika tidak ada data dari Strapi
const defaultNewsItems: NewsItem[] = [
  // ... data default yang sudah ada ...
];

const defaultAgendaItems: AgendaItem[] = [
  // ... data default yang sudah ada ...
];

const defaultAnnouncements: AnnouncementItem[] = [
  // ... data default yang sudah ada ...
];

// Gunakan data dari props atau fallback ke default
const displayNews = newsItems || defaultNewsItems;
const displayAgenda = agendaItems || defaultAgendaItems;
const displayAnnouncements = announcements || defaultAnnouncements;

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('id-ID', options);
}
---

<!-- Kemudian gunakan displayNews, displayAgenda, displayAnnouncements di template -->
```

### B. Update index.astro

Modifikasi `src/pages/index.astro` untuk fetch dan pass data:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import HeroSlider from "../components/home/HeroSlider.astro";
import QuickAccess from "../components/home/QuickAccess.astro";
import CampusAdvantages from "../components/home/CampusAdvantages.astro";
import CampusInfo from "../components/home/CampusInfo.astro";
import Testimonials from "../components/home/Testimonials.astro";

// Import Strapi functions
import { 
  getNews, 
  getAgenda, 
  getAnnouncements 
} from '../lib/strapi';

// Fetch data from Strapi
let newsItems = [];
let agendaItems = [];
let announcements = [];

try {
  newsItems = await getNews(6);
  agendaItems = await getAgenda(4);
  announcements = await getAnnouncements(5);
} catch (error) {
  console.error('Error fetching Strapi data:', error);
  // Component akan menggunakan default data jika fetch gagal
}
---

<BaseLayout
  title="Beranda - Universitas Indonesia Timur"
  description="Universitas Indonesia Timur - Membangun Generasi Unggul dan Berkarakter untuk Indonesia yang Lebih Baik"
>
  <Header slot="header" />

  <HeroSlider />
  <QuickAccess />
  <CampusAdvantages />
  
  <!-- Pass Strapi data ke CampusInfo component -->
  <CampusInfo 
    newsItems={newsItems}
    agendaItems={agendaItems}
    announcements={announcements}
  />
  
  <Testimonials />

  <Footer slot="footer" />
</BaseLayout>
```

---

## 6. Environment Variables

Buat file `.env` di root project dan tambahkan:

```env
# Strapi Configuration
PUBLIC_STRAPI_URL=http://localhost:1337

# For production, replace with your production Strapi URL:
# PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

---

## 7. Testing dan Deployment

### Testing Lokal:

1. **Jalankan Strapi:**
   ```bash
   cd strapi-backend
   npm run develop
   ```

2. **Login ke Strapi Admin:**
   - Buka: http://localhost:1337/admin
   - Login dengan credentials admin

3. **Tambahkan Content:**
   - Klik **Content Manager**
   - Pilih collection (News, Agenda, atau Announcement)
   - Klik **Create new entry**
   - Isi semua fields yang required
   - Klik **Save** dan **Publish**

4. **Jalankan Astro Frontend:**
   ```bash
   npm run dev
   ```

5. **Test di Browser:**
   - Buka: http://localhost:4321
   - Periksa section "Informasi Kampus"
   - Test tab switching
   - Test carousel navigation
   - Verify data dari Strapi muncul

### Troubleshooting:

**Problem:** Data tidak muncul dari Strapi

**Solution:**
1. Check Strapi console untuk errors
2. Verify permissions di Strapi (Settings > Roles > Public)
3. Check browser console untuk network errors
4. Verify STRAPI_URL di `.env` sudah benar
5. Pastikan data sudah di-publish di Strapi

**Problem:** CORS Error

**Solution:**
Update `config/middlewares.js` di Strapi:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http://localhost:4321'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:4321', 'http://localhost:3000'],
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## 8. Deployment Production

### Strapi Backend:

1. Deploy Strapi ke:
   - Railway
   - Heroku
   - DigitalOcean
   - AWS
   - Atau hosting lain yang support Node.js

2. Setup Database Production (PostgreSQL/MySQL recommended)

3. Configure environment variables:
   ```
   DATABASE_URL=your-production-database-url
   JWT_SECRET=your-jwt-secret
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   API_TOKEN_SALT=your-api-token-salt
   ```

### Astro Frontend:

1. Update `.env.production`:
   ```env
   PUBLIC_STRAPI_URL=https://your-production-strapi-url.com
   ```

2. Build Astro:
   ```bash
   npm run build
   ```

3. Deploy ke:
   - Vercel
   - Netlify
   - Cloudflare Pages
   - Atau static hosting lain

---

## 9. Best Practices

### A. Caching Strategy

Implementasikan caching untuk performance:

```typescript
// src/lib/strapi.ts
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

export async function getNews(limit: number = 6): Promise<any[]> {
  const cacheKey = `news-${limit}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    // ... fetch logic ...
    const result = // ... processed data
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    // ... error handling
  }
}
```

### B. Error Handling

Always provide fallback data:

```astro
---
let newsItems = [];
try {
  newsItems = await getNews(6);
} catch (error) {
  console.error('Failed to fetch news:', error);
  // Component will use default data
}
---
```

### C. Image Optimization

Gunakan Astro Image untuk optimize images:

```astro
---
import { Image } from 'astro:assets';
---

<Image 
  src={news.image} 
  alt={news.title} 
  width={400}
  height={300}
  loading="lazy"
  class="news-image"
/>
```

---

## 10. Content Management Tips

### Untuk Admin Strapi:

1. **News Management:**
   - Upload gambar dengan resolusi optimal (1200x800px)
   - Tulis excerpt yang menarik (max 200 karakter)
   - Gunakan kategori yang konsisten
   - Set featured=true untuk berita penting

2. **Agenda Management:**
   - Selalu update eventDate dengan tanggal yang benar
   - Format waktu konsisten: "HH:MM WIB"
   - Lokasi jelas dan lengkap

3. **Announcement Management:**
   - Gunakan priority="high" hanya untuk pengumuman urgent
   - Set validUntil untuk pengumuman yang ada batas waktu
   - Lampirkan file jika ada dokumen pendukung

---

## 11. Maintenance Checklist

### Weekly:
- [ ] Review dan publish konten baru
- [ ] Hapus berita/agenda yang sudah lewat (opsional)
- [ ] Check broken images

### Monthly:
- [ ] Backup Strapi database
- [ ] Review dan update kategori
- [ ] Analyze content performance

### Quarterly:
- [ ] Update Strapi version
- [ ] Review API performance
- [ ] Optimize database

---

## Support & Documentation

- **Strapi Documentation:** https://docs.strapi.io
- **Astro Documentation:** https://docs.astro.build
- **API Reference:** Lihat file `src/lib/strapi.ts`

---

**Created:** January 2026  
**Last Updated:** January 2026  
**Version:** 1.0.0
