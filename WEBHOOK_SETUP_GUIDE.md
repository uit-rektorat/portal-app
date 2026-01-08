# Panduan Setup Webhook Strapi untuk Auto-Rebuild

## Mengapa Menggunakan Webhook?

Dengan mode **static** yang sudah dikonfigurasi, website akan:
- ✅ **Load super cepat** - Halaman sudah di-build
- ✅ **Biaya hosting murah** - Bisa deploy gratis di Vercel/Netlify
- ✅ **Reliable** - Tidak bergantung pada Strapi untuk serving

Namun, data tidak otomatis ter-update saat ada perubahan di Strapi. **Webhook** adalah solusinya!

## Cara Kerja Webhook

```
Editor Update Berita di Strapi
         ↓
Strapi Kirim Webhook ke CI/CD
         ↓
CI/CD Trigger Rebuild Otomatis
         ↓
Website Ter-update (1-3 menit)
```

---

## Setup Webhook di Platform Hosting

### **Option 1: Vercel (Recommended)**

#### 1. Deploy ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy project
cd d:\app\uit\portal\app
vercel
```

#### 2. Dapatkan Deploy Hook URL
1. Buka dashboard Vercel: https://vercel.com/dashboard
2. Pilih project Anda
3. Masuk ke **Settings** → **Git** → **Deploy Hooks**
4. Klik **Create Hook**
   - **Name**: `Strapi Content Update`
   - **Branch**: `main` (atau branch production Anda)
5. **Copy** URL yang diberikan (format: `https://api.vercel.com/v1/integrations/deploy/...`)

#### 3. Setup Webhook di Strapi
1. Login ke Strapi Admin: `http://localhost:1337/admin`
2. Masuk ke **Settings** → **Webhooks**
3. Klik **Add new webhook**
4. Isi form:
   - **Name**: `Vercel Auto Deploy`
   - **Url**: Paste URL dari Vercel (step 2)
   - **Headers**: (kosongkan)
   - **Events**: Pilih events yang akan trigger rebuild:
     - ✅ `entry.create`
     - ✅ `entry.update`
     - ✅ `entry.delete`
     - ✅ `entry.publish`
     - ✅ `entry.unpublish`
5. Klik **Save**

#### 4. Test Webhook
1. Edit atau publish berita di Strapi
2. Cek di Vercel Dashboard → **Deployments**
3. Harusnya ada deployment baru yang triggered
4. Tunggu 1-3 menit, website akan ter-update!

---

### **Option 2: Netlify**

#### 1. Deploy ke Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy project
cd d:\app\uit\portal\app
netlify deploy --prod
```

#### 2. Dapatkan Build Hook URL
1. Buka dashboard Netlify: https://app.netlify.com
2. Pilih site Anda
3. Masuk ke **Site settings** → **Build & deploy** → **Build hooks**
4. Klik **Add build hook**
   - **Hook name**: `Strapi Content Update`
   - **Branch to build**: `main`
5. **Copy** URL yang diberikan

#### 3. Setup Webhook di Strapi
Ikuti langkah yang sama seperti Vercel (poin 3 di atas), tapi gunakan URL dari Netlify.

---

### **Option 3: Cloudflare Pages**

#### 1. Setup Deploy Hook
1. Buka Cloudflare Pages dashboard
2. Pilih project → **Settings** → **Builds & deployments**
3. Scroll ke **Deploy hooks** → **Add deploy hook**
4. **Copy** URL yang diberikan

#### 2. Setup Webhook di Strapi
Ikuti langkah yang sama, gunakan URL dari Cloudflare.

---

## Testing Webhook

### Test di Strapi
1. Masuk ke **Settings** → **Webhooks**
2. Klik webhook yang sudah dibuat
3. Scroll ke **Recent Deliveries**
4. Klik **Trigger** untuk test manual
5. Harusnya status `200 OK` jika berhasil

### Test Real Case
1. Buat berita baru di Strapi
2. Cek di dashboard hosting (Vercel/Netlify)
3. Harusnya ada deployment baru
4. Tunggu selesai, cek website → berita baru muncul!

---

## Troubleshooting

### Webhook Tidak Trigger
- ✅ Cek URL webhook sudah benar
- ✅ Pastikan events sudah dipilih (entry.create, entry.update, dll)
- ✅ Cek di Strapi Recent Deliveries untuk error log

### Build Gagal
- ✅ Cek build log di dashboard hosting
- ✅ Pastikan Strapi API accessible dari internet
- ✅ Cek environment variable `PUBLIC_STRAPI_URL` sudah diset

### Data Tidak Update
- ✅ Tunggu 1-3 menit (rebuild membutuhkan waktu)
- ✅ Hard refresh browser (Ctrl + Shift + R)
- ✅ Cek field `published` di Strapi sudah terisi

---

## Environment Variables

Pastikan set di hosting platform:

```env
PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

**Vercel:**
- Settings → Environment Variables

**Netlify:**
- Site settings → Environment variables

**Cloudflare Pages:**
- Settings → Environment variables

---

## Field Tanggal di Strapi

Saat ini menggunakan field **`published`** sebagai tanggal berita:

```typescript
// src/lib/strapi.ts
publishedAt: attrs.published || attrs.createdAt || new Date().toISOString(),
```

Untuk kembali ke sistem default `publishedAt`, uncomment baris ini:

```typescript
// publishedAt: attrs.publishedAt || attrs.createdAt || new Date().toISOString(),
```

---

## Best Practices

1. **Deploy ke Production Server**
   - Jangan gunakan `localhost:1337` untuk `PUBLIC_STRAPI_URL`
   - Deploy Strapi ke VPS/cloud (Heroku, Railway, DigitalOcean, dll)

2. **Webhook Security** (Optional tapi recommended)
   - Di Strapi webhook settings, tambah **Headers**:
     ```
     X-Webhook-Secret: your-secret-key-here
     ```
   - Di hosting platform, validasi header ini di build script

3. **Rate Limiting**
   - Jangan terlalu sering publish (spam webhook)
   - Webhook biasanya ada limit (misal: 100 per jam)

4. **Monitoring**
   - Cek webhook logs secara berkala
   - Monitor build success rate di dashboard

---

## Estimasi Waktu Update

| Platform | Rata-rata Waktu |
|----------|----------------|
| Vercel | 1-2 menit |
| Netlify | 2-3 menit |
| Cloudflare Pages | 1-2 menit |

---

## Kontak Support

Jika ada masalah dengan setup webhook:
1. Cek dokumentasi hosting platform
2. Cek Strapi webhook logs
3. Cek build logs di dashboard hosting

---

**Happy Deploying! 🚀**
