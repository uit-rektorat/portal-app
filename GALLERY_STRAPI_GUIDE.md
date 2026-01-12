# Panduan API Strapi untuk Gallery Kampus

Dokumen ini menjelaskan struktur dan implementasi API Strapi untuk fitur Gallery pada website portal kampus UIT.

## Overview

Sistem Gallery terdiri dari 3 collection types utama:
1. **Gallery** - Menyimpan item foto/gambar galeri
2. **Gallery Category** - Kategori umum untuk galeri (Umum, Prestasi, Fasilitas, Kegiatan)
3. **Program Studi** - Program studi yang terkait dengan galeri

## Collection Types

### 1. Gallery Collection

**Collection Name:** `galleries`

#### Fields Structure:

| Field Name | Field Type | Required | Description |
|------------|------------|----------|-------------|
| title | Text | Yes | Judul foto/kegiatan |
| description | Rich Text | No | Deskripsi detail foto |
| image | Media | Yes | File gambar utama |
| alt | Text | No | Alt text untuk accessibility |
| slug | UID | Yes | URL-friendly identifier |
| category | Relation | No | Relasi ke Gallery Category |
| programStudi | Relation | No | Relasi ke Program Studi |
| tags | JSON | No | Array tags untuk pencarian |
| date | Date | No | Tanggal kegiatan |
| featured | Boolean | No | Apakah ditampilkan di homepage |
| publishedAt | DateTime | Auto | Tanggal publikasi |

#### Strapi Configuration:

```json
{
  "kind": "collectionType",
  "collectionName": "galleries",
  "info": {
    "singularName": "gallery",
    "pluralName": "galleries",
    "displayName": "Gallery",
    "description": "Gallery items for campus activities and achievements"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 200
    },
    "description": {
      "type": "richtext"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "alt": {
      "type": "string",
      "maxLength": 100
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::gallery-category.gallery-category",
      "inversedBy": "galleries"
    },
    "programStudi": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::program-studi.program-studi",
      "inversedBy": "galleries"
    },
    "tags": {
      "type": "json"
    },
    "date": {
      "type": "date"
    },
    "featured": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### 2. Gallery Category Collection

**Collection Name:** `gallery-categories`

#### Fields Structure:

| Field Name | Field Type | Required | Description |
|------------|------------|----------|-------------|
| name | Text | Yes | Nama kategori |
| slug | UID | Yes | URL-friendly identifier |
| description | Rich Text | No | Deskripsi kategori |
| color | String | No | Warna untuk badge/tag |
| icon | String | No | Icon class name |
| order | Number | No | Urutan tampil |

#### Kategori Default:

1. **Umum** (umum) - Kegiatan umum kampus
2. **Prestasi** (prestasi) - Pencapaian dan prestasi
3. **Fasilitas** (fasilitas) - Fasilitas kampus
4. **Kegiatan** (kegiatan) - Kegiatan akademik dan non-akademik

#### Strapi Configuration:

```json
{
  "kind": "collectionType",
  "collectionName": "gallery_categories",
  "info": {
    "singularName": "gallery-category",
    "pluralName": "gallery-categories",
    "displayName": "Gallery Category"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "maxLength": 50
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "color": {
      "type": "string",
      "default": "#3B82F6"
    },
    "icon": {
      "type": "string"
    },
    "order": {
      "type": "integer",
      "default": 0
    },
    "galleries": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::gallery.gallery",
      "mappedBy": "category"
    }
  }
}
```

### 3. Program Studi Collection

**Collection Name:** `program-studis`

#### Fields Structure:

| Field Name | Field Type | Required | Description |
|------------|------------|----------|-------------|
| name | Text | Yes | Nama program studi |
| slug | UID | Yes | URL-friendly identifier |
| code | String | No | Kode program studi |
| fakultas | Relation | Yes | Relasi ke Fakultas |
| jenjang | Enumeration | Yes | S1, S2, S3, D3, D4 |
| akreditasi | String | No | Status akreditasi |
| description | Rich Text | No | Deskripsi program studi |

#### Strapi Configuration:

```json
{
  "kind": "collectionType",
  "collectionName": "program_studis",
  "info": {
    "singularName": "program-studi",
    "pluralName": "program-studis",
    "displayName": "Program Studi"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "code": {
      "type": "string",
      "maxLength": 10
    },
    "fakultas": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::fakultas.fakultas",
      "inversedBy": "programStudis"
    },
    "jenjang": {
      "type": "enumeration",
      "enum": ["D3", "D4", "S1", "S2", "S3"],
      "required": true
    },
    "akreditasi": {
      "type": "string",
      "maxLength": 10
    },
    "description": {
      "type": "richtext"
    },
    "galleries": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::gallery.gallery",
      "mappedBy": "programStudi"
    }
  }
}
```

## API Endpoints

### Gallery Endpoints

#### 1. Get All Gallery Items

```
GET /api/galleries
```

**Query Parameters:**
- `pagination[page]` - Page number (default: 1)
- `pagination[pageSize]` - Items per page (default: 20, max: 100)
- `populate` - Related data to include
- `sort` - Sorting criteria
- `filters` - Filtering options

**Example Request:**
```
GET /api/galleries?
  pagination[page]=1&
  pagination[pageSize]=12&
  populate=image,category,programStudi&
  sort[0]=publishedAt:desc&
  filters[category][slug][$eq]=prestasi&
  filters[featured][$eq]=true
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Juara I Kompetisi Programming Nasional",
        "description": "Mahasiswa Teknik Informatika meraih juara I...",
        "alt": "Juara Programming Nasional",
        "slug": "juara-programming-nasional",
        "tags": ["programming", "kompetisi", "nasional"],
        "date": "2024-03-15",
        "featured": true,
        "publishedAt": "2024-03-16T10:00:00.000Z",
        "image": {
          "data": {
            "attributes": {
              "url": "/uploads/programming_competition.jpg",
              "alternativeText": "Juara Programming",
              "caption": "Foto penyerahan piala"
            }
          }
        },
        "category": {
          "data": {
            "attributes": {
              "name": "Prestasi",
              "slug": "prestasi",
              "color": "#DC2626"
            }
          }
        },
        "programStudi": {
          "data": {
            "attributes": {
              "name": "Teknik Informatika",
              "slug": "teknik-informatika"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 12,
      "pageCount": 5,
      "total": 48
    }
  }
}
```

#### 2. Get Gallery Item by Slug

```
GET /api/galleries?filters[slug][$eq]={slug}&populate=image,category,programStudi
```

#### 3. Get Featured Gallery Items

```
GET /api/galleries?filters[featured][$eq]=true&populate=image,category,programStudi&sort[0]=publishedAt:desc
```

### Category Endpoints

#### 1. Get All Categories

```
GET /api/gallery-categories?sort=order:asc,name:asc
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Umum",
        "slug": "umum",
        "description": "Kegiatan umum kampus",
        "color": "#6B7280",
        "icon": "general",
        "order": 1
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "Prestasi",
        "slug": "prestasi",
        "description": "Pencapaian dan prestasi mahasiswa",
        "color": "#DC2626",
        "icon": "trophy",
        "order": 2
      }
    }
  ]
}
```

### Program Studi Endpoints

#### 1. Get All Program Studi

```
GET /api/program-studis?populate=fakultas&sort=name:asc
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Teknik Informatika",
        "slug": "teknik-informatika",
        "code": "TI",
        "jenjang": "S1",
        "akreditasi": "B",
        "fakultas": {
          "data": {
            "attributes": {
              "name": "Fakultas Teknik",
              "slug": "fakultas-teknik"
            }
          }
        }
      }
    }
  ]
}
```

## Contoh Penggunaan dalam Frontend

### 1. Homepage Gallery Carousel

```typescript
// Mengambil 6 foto terbaru untuk homepage
const latestGallery = await getLatestGallery(6);
```

### 2. Gallery Page dengan Filter

```typescript
// Gallery page dengan pencarian dan filter
const galleryResult = await getGallery(
  12,           // limit
  'prestasi',   // category
  'teknik-informatika', // programStudi
  'kompetisi',  // search term
  1             // page
);
```

### 3. Mendapatkan Data Filter

```typescript
// Untuk membuat filter dropdown/pills
const categories = await getGalleryCategories();
const programStudis = await getGalleryProgramStudi();
```

## Setup dan Konfigurasi

### 1. Buat Collection Types di Strapi Admin

1. Login ke Strapi Admin Panel
2. Navigate to Content-Types Builder
3. Create new Collection Types dengan konfigurasi di atas
4. Atur permissions untuk API endpoints

### 2. Populasi Data Initial

```javascript
// Data initial untuk Gallery Categories
const initialCategories = [
  { name: "Umum", slug: "umum", color: "#6B7280", order: 1 },
  { name: "Prestasi", slug: "prestasi", color: "#DC2626", order: 2 },
  { name: "Fasilitas", slug: "fasilitas", color: "#059669", order: 3 },
  { name: "Kegiatan", slug: "kegiatan", color: "#2563EB", order: 4 }
];

// Data initial untuk Program Studi (contoh)
const initialProgramStudis = [
  { name: "Teknik Informatika", slug: "teknik-informatika", code: "TI", jenjang: "S1" },
  { name: "Teknik Sipil", slug: "teknik-sipil", code: "TS", jenjang: "S1" },
  { name: "Manajemen", slug: "manajemen", code: "MJ", jenjang: "S1" },
  { name: "Akuntansi", slug: "akuntansi", code: "AK", jenjang: "S1" }
];
```

### 3. Permissions Setting

Di Strapi Admin → Settings → Roles & Permissions → Public:

**Gallery:**
- ✅ find
- ✅ findOne
- ❌ create (admin only)
- ❌ update (admin only)
- ❌ delete (admin only)

**Gallery-Category:**
- ✅ find
- ✅ findOne
- ❌ create (admin only)
- ❌ update (admin only)
- ❌ delete (admin only)

**Program-Studi:**
- ✅ find
- ✅ findOne
- ❌ create (admin only)
- ❌ update (admin only)
- ❌ delete (admin only)

## Media Management

### Upload Folder Structure

Disarankan untuk mengorganisir file upload sebagai berikut:

```
uploads/
├── gallery/
│   ├── 2024/
│   │   ├── 01/ (January)
│   │   ├── 02/ (February)
│   │   └── 03/ (March)
│   ├── prestasi/
│   ├── fasilitas/
│   └── kegiatan/
```

### Image Optimization

- **Format:** JPG/WebP untuk foto, PNG untuk logo/icon
- **Ukuran Maksimum:** 2MB per file
- **Dimensi:** Minimal 800x600px, optimal 1200x800px
- **Kompresi:** 85% quality untuk balance antara ukuran dan kualitas

### Alt Text Guidelines

Berikan alt text yang deskriptif untuk accessibility:
- ✅ "Mahasiswa Teknik Informatika menerima piala juara I kompetisi programming"
- ❌ "Foto juara"
- ❌ "IMG_001"

## SEO dan Performance

### 1. Slug Generation

Pastikan slug otomatis generated dari title dengan format:
- Lowercase
- Replace spaces dengan dash (-)
- Remove special characters
- Unique validation

### 2. Image Lazy Loading

Frontend menggunakan lazy loading untuk performa:

```astro
<img 
  src={item.image} 
  alt={item.alt}
  loading="lazy"
  class="gallery-image"
/>
```

### 3. Pagination

Gunakan pagination untuk menghindari load semua data sekaligus:
- Page size maksimum: 100 items
- Default: 20 items per page
- Implement infinite scroll untuk UX yang lebih baik

## Troubleshooting

### Common Issues

1. **Images not showing**
   - Check file permissions
   - Verify STRAPI_URL environment variable
   - Confirm image upload successful

2. **Filter not working**
   - Check relation setup between collections
   - Verify slug format consistency
   - Check API permissions

3. **Performance issues**
   - Implement proper pagination
   - Use image optimization
   - Add database indexing on frequently queried fields

### Debug Queries

```javascript
// Debug API call
console.log('API URL:', `${STRAPI_API_URL}/galleries?${queryString}`);

// Debug response
console.log('Gallery response:', JSON.stringify(response, null, 2));
```

## Future Enhancements

1. **Advanced Search:** Full-text search dengan Elasticsearch
2. **Image Processing:** Automatic thumbnail generation
3. **Bulk Upload:** Multiple file upload dengan drag & drop
4. **Analytics:** Track popular gallery items
5. **Social Sharing:** Share gallery items ke social media
6. **Comments:** User comments untuk gallery items
7. **Rating System:** User rating untuk gallery items

---

**Catatan:** Panduan ini diasumsikan menggunakan Strapi v4. Untuk versi lain, sesuaikan konfigurasi API dan collection structure.