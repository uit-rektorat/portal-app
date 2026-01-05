# Auto-Generate Slug untuk Strapi Article

File ini untuk membuat slug otomatis terisi dari title di Strapi.

## 📁 Cara Pakai

1. **Copy file `strapi-lifecycles-article.js`**

2. **Paste ke folder Strapi Anda dengan path:**
   ```
   strapi/src/api/article/content-types/article/lifecycles.js
   ```

3. **Struktur folder akhir:**
   ```
   strapi/
   └── src/
       └── api/
           └── article/
               └── content-types/
                   └── article/
                       ├── schema.json
                       └── lifecycles.js  ← File baru
   ```

4. **Restart Strapi server:**
   ```bash
   npm run develop
   # atau
   yarn develop
   # atau
   pnpm develop
   ```

## ✅ Hasil

Setelah restart, ketika Anda membuat artikel baru:

**Input:**
- Title: `Universitas Indonesia Timur Raih Akreditasi A`

**Output (otomatis):**
- Slug: `universitas-indonesia-timur-raih-akreditasi-a`

Tidak perlu klik tombol "Generate" lagi! 🎉

## 📝 Konfigurasi Field Slug di Strapi

Di Content-Type Builder:
- **Type**: UID
- **Attached field**: title
- **Required field**: ✅ (centang)
- **Unique**: Otomatis (built-in untuk UID)

## 🔄 Update untuk Collection Type Lain

Jika Anda ingin auto-slug untuk collection type lain (misal: `announcement`):

1. Copy file `lifecycles.js` ini
2. Paste ke: `strapi/src/api/announcement/content-types/announcement/lifecycles.js`
3. Restart Strapi

Bisa digunakan untuk semua collection type yang memiliki field `title` dan `slug`!

---

**Dokumentasi Lengkap**: Lihat [STRAPI_GUIDE.md](./STRAPI_GUIDE.md#-auto-generate-slug-dari-title)
