# Deployment Checklist untuk Portal UIT

## 📋 Pre-Deployment Checklist

### Content & Branding
- [ ] Ganti logo UIT di Header dan Footer
- [ ] Update social media links dengan akun resmi UIT
- [ ] Update kontak informasi (email, telepon, alamat)
- [ ] Tambahkan favicon UIT
- [ ] Review dan update semua teks/konten default

### Images & Assets
- [ ] Siapkan hero images untuk slider
- [ ] Siapkan placeholder images untuk berita
- [ ] Siapkan logo/favicon dalam berbagai ukuran
- [ ] Optimize semua gambar (WebP format recommended)

### SEO & Meta Tags
- [ ] Update meta descriptions di setiap page
- [ ] Tambahkan Open Graph images
- [ ] Setup sitemap.xml
- [ ] Setup robots.txt
- [ ] Verify Google Search Console

### Configuration
- [ ] Set production STRAPI_URL di environment variables
- [ ] Update base URL di astro.config.mjs (jika perlu)
- [ ] Configure CORS di Strapi untuk production domain
- [ ] Enable production mode di Strapi

### Testing
- [ ] Test semua links dan navigation
- [ ] Test mobile responsiveness
- [ ] Test di berbagai browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test form submissions (jika ada)
- [ ] Test loading speed (PageSpeed Insights)

### Security
- [ ] Remove .env dari version control
- [ ] Secure Strapi admin panel
- [ ] Enable HTTPS
- [ ] Setup rate limiting (jika perlu)
- [ ] Review permissions di Strapi

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Astro
   - Add environment variables:
     - `PUBLIC_STRAPI_URL`: Your production Strapi URL
   - Click "Deploy"

3. **Custom Domain**
   - Add domain di Vercel dashboard
   - Update DNS settings
   - Enable SSL (automatic)

---

### Option 2: Netlify

1. **Push code to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect GitHub repository
   - Build settings:
     - Build command: `pnpm build`
     - Publish directory: `dist`
   - Add environment variables:
     - `PUBLIC_STRAPI_URL`: Your production Strapi URL
   - Click "Deploy"

3. **Custom Domain**
   - Domain settings di Netlify dashboard
   - Update DNS
   - SSL automatic

---

### Option 3: Cloudflare Pages

1. **Push code to GitHub** (same as above)

2. **Deploy to Cloudflare Pages**
   - Go to https://pages.cloudflare.com
   - Create new project
   - Connect GitHub repository
   - Build settings:
     - Build command: `pnpm build`
     - Output directory: `dist`
   - Add environment variables:
     - `PUBLIC_STRAPI_URL`: Your production Strapi URL
   - Click "Save and Deploy"

---

## 🗄️ Strapi Backend Deployment

### Option 1: Railway

1. **Create account** di https://railway.app

2. **Deploy Strapi**
   - New Project > Deploy from GitHub
   - Select your Strapi repository
   - Railway will auto-detect and deploy
   - Add PostgreSQL database (recommended)

3. **Configure**
   - Add environment variables
   - Setup domain
   - Enable automatic deployments

### Option 2: DigitalOcean App Platform

1. **Create account** di https://digitalocean.com

2. **Create App**
   - Select Strapi repository
   - Choose PostgreSQL database
   - Configure environment
   - Deploy

### Option 3: VPS (Manual)

Requirements:
- Ubuntu 20.04+ or similar
- Node.js 18+
- PostgreSQL or MySQL
- Nginx
- PM2 for process management

Steps:
1. Setup server
2. Install dependencies
3. Configure database
4. Clone Strapi repository
5. Setup environment variables
6. Build Strapi
7. Configure Nginx as reverse proxy
8. Setup SSL with Let's Encrypt
9. Start with PM2

---

## 🔄 CI/CD Setup

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build
      run: pnpm build
      env:
        PUBLIC_STRAPI_URL: ${{ secrets.PUBLIC_STRAPI_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./
```

---

## 📊 Post-Deployment

### Monitoring
- [ ] Setup Google Analytics atau alternative
- [ ] Setup error tracking (Sentry)
- [ ] Monitor uptime (UptimeRobot)
- [ ] Monitor performance

### Maintenance
- [ ] Schedule regular backups (Strapi database)
- [ ] Setup staging environment
- [ ] Document deployment process
- [ ] Create rollback plan

### Marketing
- [ ] Submit to search engines
- [ ] Setup Google My Business
- [ ] Share di social media
- [ ] Email announcement

---

## 🆘 Troubleshooting

### Build Errors
1. Clear cache: `pnpm store prune`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall: `pnpm install`
4. Check Node version: `node -v` (should be 18+)

### Strapi Connection Issues
1. Verify STRAPI_URL environment variable
2. Check CORS settings in Strapi
3. Verify GraphQL endpoint: `{STRAPI_URL}/graphql`
4. Check Strapi logs

### Performance Issues
1. Enable caching in Astro config
2. Optimize images (use webp format)
3. Enable CDN (Cloudflare)
4. Minimize CSS/JS bundle

---

## 📚 Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

## ✅ Final Checklist

Before going live:
- [ ] All content reviewed and approved
- [ ] All links working
- [ ] Mobile responsive tested
- [ ] SEO optimized
- [ ] Performance tested (90+ score on PageSpeed)
- [ ] Security headers configured
- [ ] Analytics setup
- [ ] Backup strategy in place
- [ ] Team trained on content updates
- [ ] Documentation complete

---

**Good luck with the deployment! 🚀**
