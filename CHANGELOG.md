# Changelog - Portal UIT

All notable changes to this project will be documented in this file.

---

## [3.0.0] - January 13, 2026 - Unified Academic Units Refactoring 🎓

### 🔄 **Major Refactoring** - Academic Units Collection

#### Breaking Changes (Backend Only - Frontend Compatible)
- **Merged Collections**: Gabungkan "Faculties" dan "Graduate Programs" menjadi "Academic Units"
- **New Collection**: `academic-units` dengan field `unitType` (`fakultas` | `pascasarjana`)
- **Unified Leadership**: Field `Leader` menggantikan `Dean` (fakultas) dan baru untuk pascasarjana
- **Unified Assistants**: Field `Assistants` menggantikan `Heads` (fakultas) dan baru untuk pascasarjana

#### What's New
✅ **One Collection for All** - Fakultas dan Pascasarjana dalam satu tempat  
✅ **Consistent Structure** - Struktur data seragam dan mudah dipahami  
✅ **Flexible Leadership** - Leader bisa Dekan (fakultas) atau Direktur (pascasarjana)  
✅ **Better Programs** - Support koordinator untuk program pascasarjana  
✅ **Backward Compatible** - Frontend code tidak perlu diubah  

#### New Interface: `AcademicUnit`
```typescript
export interface AcademicUnit {
  unitType: 'fakultas' | 'pascasarjana';
  leader?: { name, position, title, photo, education };
  assistants?: [{ name, position, title, program?, photo, education }];
  programs?: [{ 
    name, degree, description, accreditation,
    duration?, tuition?, coordinator?  // For pascasarjana
  }];
  // ... + all common fields
}
```

#### New Functions
- `getAllAcademicUnits()` - Fetch semua unit (fakultas + pascasarjana)
- `getAcademicUnit(slug)` - Fetch single unit by slug
- `transformAcademicUnit()` - Helper untuk transform data

#### Updated Functions (Backward Compatible)
- `getAllFakultas()` - Sekarang filter dari `academic-units` dengan `unitType='fakultas'`
- `getFakultas(slug)` - Filter fakultas dari unified collection
- `getAllPascasarjana()` - Filter dari `academic-units` dengan `unitType='pascasarjana'`
- `getPascasarjana(slug)` - Filter pascasarjana dari unified collection

### 📚 Documentation

#### New Guides
- ✨ **UNIFIED_ACADEMIC_UNITS_GUIDE.md** - Complete guide untuk unified collection
- ✨ **REFACTORING_SUMMARY.md** - Summary lengkap refactoring & migration guide

#### Updated Guides
- ⚠️ **FAKULTAS_STRAPI_GUIDE.md** - Added deprecation warning
- ⚠️ **GRADUATE_PROGRAMS_GUIDE.md** - Added deprecation warning

### 🔧 Migration Required

**Old Structure (Deprecated):**
```
Collections: "faculties" + "graduate-programs" (2 collections)
Graduate Program → Programs (nested, confusing)
```

**New Structure (Recommended):**
```
Collection: "academic-units" (1 unified collection)
unitType field untuk membedakan fakultas vs pascasarjana
```

**Migration Steps:**
1. Create "Academic Units" collection di Strapi (follow UNIFIED_ACADEMIC_UNITS_GUIDE.md)
2. Input sample data (1 fakultas + 1 pascasarjana)
3. Test di frontend: `/fakultas/[slug]` dan `/pascasarjana/[slug]`
4. Migrate all data dari old collections
5. Delete old "faculties" and "graduate-programs" collections

### 🎯 Benefits

| Feature | Before | After |
|---------|--------|-------|
| Collections | 2 (Faculties, Graduate Programs) | 1 (Academic Units) |
| Consistency | ❌ Different structures | ✅ Unified structure |
| Pascasarjana Leader | ❌ Not supported | ✅ Direktur + Asisten |
| Program Coordinator | ❌ Nested confusing | ✅ Clean optional field |
| Maintenance | ❌ 2 places | ✅ 1 place |
| URLs | Separate (good for SEO) | ✅ Still separate |

### 📁 Files Changed
- `src/lib/strapi.ts` - Added unified interfaces & functions
- `UNIFIED_ACADEMIC_UNITS_GUIDE.md` - New comprehensive guide
- `REFACTORING_SUMMARY.md` - New migration summary
- `FAKULTAS_STRAPI_GUIDE.md` - Deprecated with warning
- `GRADUATE_PROGRAMS_GUIDE.md` - Deprecated with warning

---

## [2.0.0] - January 2026 - Hero Slider Enhancement

### 🎨 Added - Hero Slider Multi-Layout System

#### New Layout Variations
- **Default Layout**: Text + Image side-by-side (1200x800px)
- **Full-Image Layout**: Full background image dengan text overlay (1920x1080px)
- **Centered Layout**: Text centered tanpa image
- **Minimal Layout**: Compact text dengan link style

#### Enhanced Navigation
- Added arrow buttons (kiri/kanan) dengan size lebih besar
- Improved dot indicators dengan better visibility
- Added keyboard navigation support (Arrow Left/Right)
- Auto-play dengan pause on hover functionality
- Smooth transitions dan animations

#### New Features
- Support untuk secondary CTA button
- Description field untuk konten tambahan
- Layout selection via Strapi enum field
- Responsive image handling dengan breakpoints
- Better typography hierarchy per layout

### 📱 Added - Social Media Integration

- Instagram dan YouTube icons di top bar header
- Contact info (email & phone) di top bar
- Hover effects dengan warna UIT
- Responsive display (hide on mobile untuk contact)

### 🎨 Enhanced - Warna UIT Standardization

#### Custom Tailwind Colors
```css
--color-uit-green: #009B4C;       /* Primary */
--color-uit-green-dark: #007A3C;  /* Dark/Secondary */
--color-uit-green-light: #2BB673; /* Light/Accent */
--color-uit-bg: #F5F7F6;          /* Light Gray BG */
--color-uit-text: #4A4A4A;        /* Text Gray */
```

#### Updated Components
- ✅ Header: Logo, links, buttons dengan warna UIT
- ✅ Footer: Gradient gelap UIT, icons hijau
- ✅ HeroSlider: Gradient UIT di background
- ✅ QuickAccess: Icons dan hover hijau UIT
- ✅ CampusAdvantages: Icons gradient UIT
- ✅ NewsSection: Category badges dan links UIT
- ✅ Testimonials: Gradient gelap UIT
- ✅ Profile Page: All sections dengan warna UIT

### 🔘 Modified - Tombol Pendaftaran

Semua tombol pendaftaran dikomentar dengan instruksi uncomment:
- Header Desktop & Mobile menu
- Hero Slider default slide pertama
- QuickAccess item pertama
- Profile CTA section

Mudah diaktifkan kembali saat periode PMB dibuka.

### 📚 Added - Comprehensive Documentation

#### New Guides
- **HERO_SLIDER_GUIDE.md**: Panduan lengkap hero slider
  - Penjelasan semua layout variations
  - Rekomendasi ukuran gambar per layout
  - Tips komposisi dan fotografi
  - Strapi setup step-by-step
  - Best practices dan troubleshooting

#### Updated Guides
- **STRAPI_GUIDE.md**:
  - Updated hero Content Type dengan field baru
  - Added image optimization guide
  - Upload recommendations dan tools
  - Tips DO's and DON'Ts
  - Strapi configuration untuk image sizes

- **README.md**:
  - Updated features list
  - Added image recommendations section
  - Links ke HERO_SLIDER_GUIDE.md

### 🔧 Technical Changes

#### Strapi Integration
```typescript
// Updated Hero interface
interface Hero {
  id: string;
  title: string;
  subtitle: string;
  description?: string;        // NEW
  image?: { url: string; };
  buttonText?: string;
  buttonLink?: string;
  buttonSecondaryText?: string;  // NEW
  buttonSecondaryLink?: string;  // NEW
  layout?: 'default' | 'full-image' | 'centered' | 'minimal'; // NEW
}
```

#### GraphQL Query Enhanced
- Added `description` field
- Added `buttonSecondary` fields
- Added `layout` enum
- Added image dimensions (width, height)
- Added proper URL construction with STRAPI_URL

#### Component Props
- HeroSlider now accepts complex slide objects
- Support untuk conditional rendering per layout
- Better TypeScript typing

### 🎨 Style Improvements

#### Animations
- Added `fadeInRight` animation untuk images
- Improved `fadeIn` timing (0.6s dari 0.5s)
- Smooth scale transitions on buttons

#### Responsive Design
- Better breakpoints untuk navigation
- Improved mobile text sizing
- Fixed image aspect ratios
- Enhanced touch targets (min 44x44px)

### 🐛 Bug Fixes

- Fixed navigation dots terpotong (increased size to w-12 h-12)
- Fixed z-index layering untuk navigation (z-20)
- Fixed auto-play pause/resume mechanism
- Fixed slide transition timing
- Fixed responsive image overflow

### 📈 Performance

- Image optimization recommendations added
- Lazy loading support prepared
- Efficient CSS with Tailwind purge
- Minimized JavaScript bundle
- Breakpoints untuk responsive images

---

## [1.1.0] - December 2025 - Initial Color Standardization

### Changed
- Implemented UIT official colors across all components
- Updated gradients to use UIT color palette
- Consistent hover states and transitions

---

## [1.0.0] - December 2025 - Initial Release

### Added
- Initial project setup dengan Astro Framework
- Tailwind CSS 4.x integration
- Basic page structure (Home, Profile)
- All main components
- Strapi GraphQL client
- Comprehensive documentation

### Components
- Header with navigation
- Footer with social links
- Hero Slider (basic)
- Quick Access grid
- Campus Advantages
- News Section
- Testimonials carousel

### Documentation
- README.md
- STRAPI_GUIDE.md
- DEPLOYMENT.md
- SUMMARY.md

---

## Future Roadmap

### Planned Features
- [ ] Multi-language support (Indonesian/English)
- [ ] Dark mode toggle
- [ ] Program Studi detail pages
- [ ] Event calendar integration
- [ ] Student portal integration
- [ ] Online registration system
- [ ] Virtual campus tour 360°
- [ ] Alumni directory
- [ ] Research publications showcase
- [ ] Blog/Article detail pages

### Technical Improvements
- [ ] Add automated image optimization pipeline
- [ ] Implement service worker for offline support
- [ ] Add analytics integration
- [ ] SEO meta tags optimization
- [ ] Structured data for rich snippets
- [ ] Performance monitoring
- [ ] A/B testing framework

---

**Legend:**
- 🎨 Visual/Design changes
- 📱 Mobile/Responsive improvements
- 🔧 Technical changes
- 🐛 Bug fixes
- 📚 Documentation
- 📈 Performance improvements
- 🔘 Feature modifications
