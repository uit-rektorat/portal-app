// Configure your Strapi URL here
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

// Helper function to fetch from Strapi REST API
async function fetchStrapi(endpoint: string) {
  const url = `${STRAPI_API_URL}${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const body = await response.text().catch(() => '<no body>');
      throw new Error(`Failed to fetch ${url} (status ${response.status} ${response.statusText}): ${body}`);
    }
    return response.json();
  } catch (err: any) {
    throw new Error(`Network error fetching ${url}: ${err?.message ?? String(err)}`);
  }
}

// Types for your data
export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image?: string; // Changed from object to string (URL)
  buttonText?: string;
  buttonLink?: string;
  buttonSecondaryText?: string;
  buttonSecondaryLink?: string;
  layout?: 'default' | 'full-image' | 'centered' | 'minimal';
}

export interface QuickAccess {
  id: string;
  title: string;
  icon: string;
  link: string;
}

export interface CampusAdvantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  image?: string; // URL to image
  publishedAt: string;
  slug: string;
  category?: string;
  author?: string;
  readTime?: string;
  content?: string;
  tags?: string[];
}

export interface Agenda {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  location?: string;
  category?: string;
  isHighlighted?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority?: 'Normal' | 'Penting' | 'Urgent';
  publishedAt: string;
  expiryDate?: string;
  targetAudience?: string;
  isPinned?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  photo?: string;
  description?: string;
  email?: string;
  order: number;
}

export interface Profile {
  vision: string;
  mission: string[];
  history: string;
}

export interface Fakultas {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  profile: string;
  vision: string;
  mission: string;
  logo?: string;
  heroImage?: string;
  profileImage?: string;
  layout?: 'modern' | 'classic' | 'minimal';
  stats?: Array<{
    label: string;
    value: string;
  }>;
  facilities?: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
  achievements?: Array<{
    title: string;
    description: string;
    year?: string;
  }>;
  activities?: Array<{
    title: string;
    description: string;
    date?: string;
    image?: string;
  }>;
  dean?: {
    name: string;
    title?: string;
    photo?: string;
    education?: string;
  };
  heads?: Array<{
    name: string;
    title?: string;
    program: string;
    photo?: string;
    education?: string;
  }>;
  programs?: Array<{
    name: string;
    degree: string;
    description?: string;
    accreditation?: string;
    link?: string;
  }>;
}

export interface Pascasarjana {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  heroImage?: string;
  programs: Array<{
    name: string;
    degree: string;
    description?: string;
    accreditation?: string;
    duration?: string;
    tuition?: string;
    coordinator?: {
      name: string;
      photo?: string;
      title?: string;
      education?: string;
    };
  }>;
}

// Fetch Hero Slides from Strapi REST API
export const getHeroSlides = async (): Promise<Hero[]> => {
  try {
    const data = await fetchStrapi('/heroes?populate=*&sort=createdAt:asc');

    const heroes = data.data?.map((item: any) => {
      return {
        id: item.id.toString(),
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : undefined,
        buttonText: item.buttonText,
        buttonLink: item.buttonLink,
        buttonSecondaryText: item.buttonSecondaryText,
        buttonSecondaryLink: item.buttonSecondaryLink,
        layout: item.layout || 'default'
      };
    }) || [];

    return heroes;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
};

export const getQuickAccess = async (): Promise<QuickAccess[]> => {
  try {
    const data = await fetchStrapi('/quick-accesses?populate=*');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching quick access:', error);
    return [];
  }
};

export const getCampusAdvantages = async (): Promise<CampusAdvantage[]> => {
  try {
    const data = await fetchStrapi('/campus-advantages?populate=*');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching campus advantages:', error);
    return [];
  }
};

export const getNews = async (limit: number = 6): Promise<News[]> => {
  try {
    const data = await fetchStrapi(`/articles?populate=*&pagination[limit]=${limit}&sort=publishedAt:desc`);

    const news = data.data?.map((item: any) => {
      const attrs = item.attributes || item;
      const imagePath = attrs.image?.data?.attributes?.url || attrs.image?.url;

      // Generate slug from title if not exists
      const generateSlug = (title: string): string => {
        return title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/-+/g, '-')       // Replace multiple hyphens with single
          .trim();
      };

      const title = attrs.title || '';
      const slug = attrs.slug || attrs.Slug || (title ? generateSlug(title) : `article-${item.id}`);

      // Map with fallback to handle different Strapi response structures
      return {
        id: item.id?.toString() || '',
        title: title,
        excerpt: attrs.excerpt || '',
        image: imagePath ? `${STRAPI_URL}${imagePath}` : undefined,
        // Using custom 'published' field for news date (for initial launch)
        publishedAt: attrs.published || attrs.createdAt || new Date().toISOString(),
        // FUTURE: Uncomment below when switching back to system publishedAt
        // publishedAt: attrs.publishedAt || attrs.createdAt || new Date().toISOString(),
        slug: slug,
        category: attrs.category || attrs.Category || 'Berita',
        author: attrs.author?.data?.attributes?.name || attrs.author?.name || attrs.author || 'Admin',
        readTime: attrs.readTime || attrs.ReadTime || '5 menit',
        content: attrs.content || attrs.Content || '',
        tags: attrs.tags?.data ? attrs.tags.data.map((t: any) => t.attributes?.name || t.attributes?.title || '') : []
      };
    }) || [];

    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const getNewsBySlug = async (slug: string): Promise<News | null> => {
  try {
    const data = await fetchStrapi(`/articles?filters[slug][$eq]=${slug}&populate=*`);

    const item = data.data?.[0];
    if (!item) return null;

    const attrs = item.attributes || item;
    const imagePath = attrs.image?.data?.attributes?.url || attrs.image?.url;

    // Generate slug from title if not exists
    const generateSlug = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    const title = attrs.title || '';
    const itemSlug = attrs.slug || attrs.Slug || (title ? generateSlug(title) : `article-${item.id}`);

    return {
      id: item.id?.toString() || '',
      title: title,
      excerpt: attrs.excerpt || '',
      image: imagePath ? `${STRAPI_URL}${imagePath}` : undefined,
      // Using custom 'published' field for news date (for initial launch)
      publishedAt: attrs.published || attrs.createdAt || new Date().toISOString(),
      // FUTURE: Uncomment below when switching back to system publishedAt
      // publishedAt: attrs.publishedAt || attrs.createdAt || new Date().toISOString(),
      slug: itemSlug,
      category: attrs.category || attrs.Category || 'Berita',
      author: attrs.author?.data?.attributes?.name || attrs.author?.name || attrs.author || 'Admin',
      readTime: attrs.readTime || attrs.ReadTime || '5 menit',
      content: attrs.content || attrs.Content || '',
      tags: attrs.tags?.data ? attrs.tags.data.map((t: any) => t.attributes?.name || t.attributes?.title || '') : []
    };
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
};

export const getAgenda = async (limit: number = 4): Promise<Agenda[]> => {
  try {
    const today = new Date().toISOString();
    const data = await fetchStrapi(`/events?populate=*&filters[eventDate][$gte]=${today}&sort=eventDate:asc&pagination[limit]=${limit}`);

    const agenda = data.data?.map((item: any) => {
      return {
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        eventDate: item.eventDate,
        location: item.location,
        category: item.category,
        isHighlighted: item.isHighlighted || false
      };
    }) || [];

    return agenda;
  } catch (error) {
    console.error('Error fetching agenda:', error);
    return [];
  }
};

export const getAnnouncements = async (limit: number = 5): Promise<Announcement[]> => {
  try {
    const today = new Date().toISOString();
    const data = await fetchStrapi(`/announcements?populate=*&filters[$or][0][expiryDate][$gte]=${today}&filters[$or][1][expiryDate][$null]=true&sort[0]=isPinned:desc&sort[1]=priority:desc&sort[2]=publishedAt:desc&pagination[limit]=${limit}`);

    const announcements = data.data?.map((item: any) => {
      return {
        id: item.id.toString(),
        title: item.title,
        content: item.content,
        priority: item.priority || 'Normal',
        publishedAt: item.publishedAt,
        expiryDate: item.expiryDate,
        targetAudience: item.targetAudience,
        isPinned: item.isPinned || false
      };
    }) || [];

    return announcements;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const data = await fetchStrapi('/testimonials?populate=*&sort=createdAt:desc');

    const testimonials = data.data?.map((item: any) => {
      const attrs = item.attributes || item;
      // Support multiple possible media shapes
      const avatarPath = attrs.avatar?.url || attrs.avatar?.data?.attributes?.url || attrs.avatar?.data?.attributes?.formats?.thumbnail?.url;
      return {
        id: item.id?.toString() || attrs.id?.toString(),
        name: attrs.name || attrs.title || 'Anonymous',
        role: attrs.role || attrs.position || '',
        content: attrs.content || attrs.message || '',
        avatar: avatarPath ? `${STRAPI_URL}${avatarPath}` : undefined,
        rating: Number(attrs.rating || 5),
      };
    }) || [];

    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const getLeaders = async (): Promise<Leader[]> => {
  try {
    const data = await fetchStrapi('/leaders?populate=*&sort=order:asc');

    const leaders = data.data?.map((item: any) => {
      const attrs = item.attributes || item;
      // Support multiple possible photo shapes
      const photoPath = attrs.photo?.url || attrs.photo?.data?.attributes?.url || attrs.photo?.data?.attributes?.formats?.medium?.url;
      return {
        id: item.id?.toString() || attrs.id?.toString(),
        name: attrs.name || '',
        position: attrs.position || '',
        photo: photoPath ? `${STRAPI_URL}${photoPath}` : undefined,
        description: attrs.description || '',
        email: attrs.email || '',
        order: Number(attrs.order || 99),
      };
    }) || [];

    return leaders;
  } catch (error) {
    console.error('Error fetching leaders:', error);
    return [];
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const data = await fetchStrapi('/profile?populate=*');

    // Single Type returns data.attributes directly
    const attrs = data?.data?.attributes || data?.data || {};

    return {
      vision: attrs.vision || '',
      mission: attrs.mission || [],
      history: attrs.history || '',
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Fetch all Fakultas
export const getAllFakultas = async (): Promise<Fakultas[]> => {
  try {
    const data = await fetchStrapi('/faculties?populate[0]=logo&populate[1]=heroImage&populate[2]=profileImage&populate[3]=Statistics&populate[4]=Facilities.image&populate[5]=Achievements&populate[6]=Activities.image&populate[7]=Dean.photo&populate[8]=Heads.photo&populate[9]=Programs&sort=name:asc');

    const fakultas = data.data?.map((item: any) => {
      const attrs = item.attributes || item;

      // Helper to get image URL
      const getImageUrl = (image: any) => {
        if (!image) return undefined;
        const url = image?.url || image?.data?.attributes?.url;
        return url ? `${STRAPI_URL}${url}` : undefined;
      };

      return {
        id: item.id.toString(),
        name: attrs.name || item.name || '',
        slug: attrs.slug || item.slug || '',
        tagline: attrs.tagline || item.tagline || '',
        profile: attrs.profile || item.profile || '',
        vision: attrs.vision || item.vision || '',
        mission: attrs.mission || item.mission || '',
        logo: getImageUrl(attrs.logo || item.logo),
        heroImage: getImageUrl(attrs.heroImage || item.heroImage),
        profileImage: getImageUrl(attrs.profileImage || item.profileImage),
        layout: attrs.layout || item.layout || 'modern',
        stats: attrs.Statistics || attrs.stats || item.Statistics || [],
        facilities: (attrs.Facilities || attrs.facilities || item.Facilities || []).map((f: any) => ({
          name: f.name || '',
          description: f.description || '',
          image: getImageUrl(f.image),
        })),
        achievements: (attrs.Achievements || attrs.achievements || item.Achievements || []).map((a: any) => ({
          title: a.title || '',
          description: a.description || '',
          year: a.year || '',
        })),
        activities: (attrs.Activities || attrs.activities || item.Activities || []).map((act: any) => ({
          title: act.title || '',
          description: act.description || '',
          date: act.date || '',
          image: getImageUrl(act.image),
        })),
        dean: (attrs.Dean || attrs.dean || item.Dean) ? {
          name: (attrs.Dean || attrs.dean || item.Dean).name || '',
          title: (attrs.Dean || attrs.dean || item.Dean).title || '',
          photo: getImageUrl((attrs.Dean || attrs.dean || item.Dean).photo),
          education: (attrs.Dean || attrs.dean || item.Dean).education || '',
        } : undefined,
        heads: (attrs.Heads || attrs.heads || item.Heads || []).map((h: any) => ({
          name: h.name || '',
          title: h.title || '',
          program: h.program || '',
          photo: getImageUrl(h.photo),
          education: h.education || '',
        })),
        programs: (attrs.Programs || attrs.programs || item.Programs || []).map((p: any) => ({
          name: p.name || '',
          degree: p.degree || '',
          description: p.description || '',
          accreditation: p.accreditation || '',
          link: p.link || '',
        })),
      };
    }) || [];

    return fakultas;
  } catch (error) {
    console.error('Error fetching fakultas:', error);
    return [];
  }
};

// Fetch single Fakultas by slug
export const getFakultas = async (slug: string): Promise<Fakultas | null> => {
  try {
    const data = await fetchStrapi(`/faculties?filters[slug][$eq]=${slug}&populate[0]=logo&populate[1]=heroImage&populate[2]=profileImage&populate[3]=Statistics&populate[4]=Facilities.image&populate[5]=Achievements&populate[6]=Activities.image&populate[7]=Dean.photo&populate[8]=Heads.photo&populate[9]=Programs`);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const item = data.data[0];
    const attrs = item.attributes || item;

    // Helper to get image URL
    const getImageUrl = (image: any) => {
      if (!image) return undefined;
      const url = image?.url || image?.data?.attributes?.url;
      return url ? `${STRAPI_URL}${url}` : undefined;
    };

    return {
      id: item.id.toString(),
      name: attrs.name || item.name || '',
      slug: attrs.slug || item.slug || '',
      tagline: attrs.tagline || item.tagline || '',
      profile: attrs.profile || item.profile || '',
      vision: attrs.vision || item.vision || '',
      mission: attrs.mission || item.mission || '',
      logo: getImageUrl(attrs.logo || item.logo),
      heroImage: getImageUrl(attrs.heroImage || item.heroImage),
      profileImage: getImageUrl(attrs.profileImage || item.profileImage),
      layout: attrs.layout || item.layout || 'modern',
      stats: attrs.Statistics || attrs.stats || item.Statistics || [],
      facilities: (attrs.Facilities || attrs.facilities || item.Facilities || []).map((f: any) => ({
        name: f.name || '',
        description: f.description || '',
        image: getImageUrl(f.image),
      })),
      achievements: (attrs.Achievements || attrs.achievements || item.Achievements || []).map((a: any) => ({
        title: a.title || '',
        description: a.description || '',
        year: a.year || '',
      })),
      activities: (attrs.Activities || attrs.activities || item.Activities || []).map((act: any) => ({
        title: act.title || '',
        description: act.description || '',
        date: act.date || '',
        image: getImageUrl(act.image),
      })),
      dean: (attrs.Dean || attrs.dean || item.Dean) ? {
        name: (attrs.Dean || attrs.dean || item.Dean).name || '',
        title: (attrs.Dean || attrs.dean || item.Dean).title || '',
        photo: getImageUrl((attrs.Dean || attrs.dean || item.Dean).photo),
        education: (attrs.Dean || attrs.dean || item.Dean).education || '',
      } : undefined,
      heads: (attrs.Heads || attrs.heads || item.Heads || []).map((h: any) => ({
        name: h.name || '',
        title: h.title || '',
        program: h.program || '',
        photo: getImageUrl(h.photo),
        education: h.education || '',
      })),
      programs: (attrs.Programs || attrs.programs || item.Programs || []).map((p: any) => ({
        name: p.name || '',
        degree: p.degree || '',
        description: p.description || '',
        accreditation: p.accreditation || '',
        link: p.link || '',
      })),
    };
  } catch (error) {
    console.error('Error fetching fakultas:', error);
    return null;
  }
};

// Fetch all Pascasarjana
export const getAllPascasarjana = async (): Promise<Pascasarjana[]> => {
  try {
    const data = await fetchStrapi('/graduate-programs?populate[0]=heroImage&populate[1]=Programs.Coordinator.photo&sort=name:asc');

    const pascasarjana = data.data?.map((item: any) => {
      const attrs = item.attributes || item;

      // Helper to get image URL
      const getImageUrl = (image: any) => {
        if (!image) return undefined;
        const url = image?.url || image?.data?.attributes?.url;
        return url ? `${STRAPI_URL}${url}` : undefined;
      };

      return {
        id: item.id.toString(),
        name: attrs.name || item.name || '',
        slug: attrs.slug || item.slug || '',
        tagline: attrs.tagline || item.tagline || '',
        description: attrs.description || item.description || '',
        heroImage: getImageUrl(attrs.heroImage || item.heroImage),
        programs: (attrs.Programs || attrs.programs || item.Programs || []).map((p: any) => ({
          name: p.name || '',
          degree: p.degree || '',
          description: p.description || '',
          accreditation: p.accreditation || '',
          duration: p.duration || '',
          tuition: p.tuition || '',
          coordinator: (p.Coordinator || p.coordinator) ? {
            name: (p.Coordinator || p.coordinator).name || '',
            photo: getImageUrl((p.Coordinator || p.coordinator).photo),
            title: (p.Coordinator || p.coordinator).title || '',
            education: (p.Coordinator || p.coordinator).education || '',
          } : undefined,
        })),
      };
    }) || [];

    return pascasarjana;
  } catch (error) {
    console.error('Error fetching pascasarjana:', error);
    return [];
  }
};

// Fetch single Pascasarjana by slug
export const getPascasarjana = async (slug: string): Promise<Pascasarjana | null> => {
  try {
    const data = await fetchStrapi(`/graduate-programs?filters[slug][$eq]=${slug}&populate[0]=heroImage&populate[1]=Programs.Coordinator.photo`);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const item = data.data[0];
    const attrs = item.attributes || item;

    // Helper to get image URL
    const getImageUrl = (image: any) => {
      if (!image) return undefined;
      const url = image?.url || image?.data?.attributes?.url;
      return url ? `${STRAPI_URL}${url}` : undefined;
    };

    return {
      id: item.id.toString(),
      name: attrs.name || item.name || '',
      slug: attrs.slug || item.slug || '',
      tagline: attrs.tagline || item.tagline || '',
      description: attrs.description || item.description || '',
      heroImage: getImageUrl(attrs.heroImage || item.heroImage),
      programs: (attrs.Programs || attrs.programs || item.Programs || []).map((p: any) => ({
        name: p.name || '',
        degree: p.degree || '',
        description: p.description || '',
        accreditation: p.accreditation || '',
        duration: p.duration || '',
        tuition: p.tuition || '',
        coordinator: (p.Coordinator || p.coordinator) ? {
          name: (p.Coordinator || p.coordinator).name || '',
          photo: getImageUrl((p.Coordinator || p.coordinator).photo),
          title: (p.Coordinator || p.coordinator).title || '',
          education: (p.Coordinator || p.coordinator).education || '',
        } : undefined,
      })),
    };
  } catch (error) {
    console.error('Error fetching pascasarjana:', error);
    return null;
  }
};

// Gallery Types
export interface Gallery {
  id: string;
  title: string;
  description?: string;
  image: string;
  alt?: string;
  category?: string;
  programStudi?: string;
  tags?: string[];
  date?: string;
  publishedAt?: string;
  slug?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface ProgramStudi {
  id: string;
  name: string;
  slug: string;
  fakultas?: string;
  description?: string;
  count?: number;
}

// Gallery Functions

/**
 * Get gallery items with optional filtering
 * @param limit - Number of items to fetch (default: 20)
 * @param category - Filter by category slug
 * @param programStudi - Filter by program studi slug
 * @param search - Search term for title/description
 * @param page - Page number for pagination (default: 1)
 */
export const getGallery = async (
  limit: number = 20,
  category?: string,
  programStudi?: string,
  search?: string,
  page: number = 1
): Promise<{ data: Gallery[], total: number, page: number, pageCount: number }> => {
  try {
    console.log('========================================');
    console.log('[getGallery] Called with params:', { limit, category, programStudi, search, page });
    
    // Build query parameters
    const params = new URLSearchParams();

    // Pagination
    params.append('pagination[page]', page.toString());
    params.append('pagination[pageSize]', limit.toString());

    // Populate all related data
    params.append('populate', '*');

    // Sorting by date (newest first)
    params.append('sort[0]', 'publishedAt:desc');

    // Filters
    if (category && category !== 'semua') {
      params.append('filters[category][slug][$eq]', category);
      console.log('[getGallery] Adding category filter:', category);
    }

    if (programStudi) {
      params.append('filters[prodi][slug][$eq]', programStudi);
      console.log('[getGallery] Adding prodi filter:', programStudi);
    }

    if (search) {
      params.append('filters[$or][0][title][$containsi]', search);
      params.append('filters[$or][1][description][$containsi]', search);
      console.log('[getGallery] Adding search filter:', search);
    }

    const queryString = params.toString();
    const fullUrl = `/galleries?${queryString}`;
    console.log('[getGallery] Query string:', queryString);
    console.log('[getGallery] Full URL:', `${STRAPI_API_URL}${fullUrl}`);
    
    const response = await fetchStrapi(fullUrl);

    console.log('[getGallery] Response received:', {
      dataCount: response.data?.length || 0,
      total: response.meta?.pagination?.total || 0,
      page: response.meta?.pagination?.page || 0,
      pageCount: response.meta?.pagination?.pageCount || 0
    });
    
    // Log first item to see structure
    if (response.data?.[0]) {
      const firstItem = response.data[0];
      console.log('[getGallery] First item raw data:', JSON.stringify(firstItem, null, 2));
    }

    const galleryItems: Gallery[] = response.data?.map((item: any) => {
      // Handle both Strapi v4 (with attributes) and v5 (flat) structures
      const attrs = item.attributes || item;
      const imagePath = attrs.image?.data?.attributes?.url || attrs.image?.url;

      // Handle category relation (could be nested in data.attributes)
      const categoryData = attrs.category?.data?.attributes || attrs.category?.data || attrs.category;
      const prodiData = attrs.prodi?.data?.attributes || attrs.prodi?.data || attrs.prodi;

      const mappedItem = {
        id: item.id.toString(),
        title: attrs.title || '',
        description: attrs.description || '',
        image: imagePath ? `${STRAPI_URL}${imagePath}` : '/images/gallery/default.jpg',
        alt: attrs.alt || attrs.title,
        category: categoryData?.slug || '',
        programStudi: prodiData?.slug || '',
        tags: attrs.tags || [],
        date: attrs.date || attrs.publishedAt,
        publishedAt: attrs.publishedAt,
        slug: attrs.slug || item.id.toString(),
      };
      
      // Log each mapped item
      console.log('[getGallery] Mapped item:', {
        id: mappedItem.id,
        title: mappedItem.title,
        category: mappedItem.category,
        programStudi: mappedItem.programStudi,
        image: mappedItem.image
      });
      
      return mappedItem;
    }) || [];

    console.log('[getGallery] Total items mapped:', galleryItems.length);
    console.log('========================================');

    return {
      data: galleryItems,
      total: response.meta?.pagination?.total || 0,
      page: response.meta?.pagination?.page || 1,
      pageCount: response.meta?.pagination?.pageCount || 1,
    };
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return {
      data: [],
      total: 0,
      page: 1,
      pageCount: 1,
    };
  }
};

/**
 * Get gallery categories
 */
export const getGalleryCategories = async (): Promise<GalleryCategory[]> => {
  try {
    const response = await fetchStrapi('/gallery-categories?sort=name:asc');

    return response.data?.map((item: any) => {
      // Handle both Strapi v4 (with attributes) and v5 (flat) structures
      const attrs = item.attributes || item;
      return {
        id: item.id.toString(),
        name: attrs.name || '',
        slug: attrs.slug || '',
        description: attrs.description || '',
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    return [];
  }
};

/**
 * Get program studi list for gallery filtering
 */
export const getGalleryProgramStudi = async (): Promise<ProgramStudi[]> => {
  try {
    const response = await fetchStrapi('/program-studis?sort=name:asc');

    return response.data?.map((item: any) => {
      // Handle both Strapi v4 (with attributes) and v5 (flat) structures
      const attrs = item.attributes || item;
      return {
        id: item.id.toString(),
        name: attrs.name || '',
        slug: attrs.slug || '',
        description: attrs.description || '',
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching program studi:', error);
    return [];
  }
};

/**
 * Get latest gallery items for homepage
 */
export const getLatestGallery = async (limit: number = 6): Promise<Gallery[]> => {
  const result = await getGallery(limit);
  return result.data;
};

/**
 * Get gallery item by slug
 */
export const getGalleryBySlug = async (slug: string): Promise<Gallery | null> => {
  try {
    const response = await fetchStrapi(`/galleries?filters[slug][$eq]=${slug}&populate=*`);

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const item = response.data[0];
    // Handle both Strapi v4 (with attributes) and v5 (flat) structures  
    const attrs = item.attributes || item;
    const imagePath = attrs.image?.data?.attributes?.url || attrs.image?.url;

    return {
      id: item.id.toString(),
      title: attrs.title || '',
      description: attrs.description || '',
      image: imagePath ? `${STRAPI_URL}${imagePath}` : '/images/gallery/default.jpg',
      alt: attrs.alt || attrs.title,
      category: attrs.galeri_kategori?.slug || '',
      programStudi: attrs.prodi?.slug || '',
      tags: attrs.tags || [],
      date: attrs.date || attrs.publishedAt,
      publishedAt: attrs.publishedAt,
      slug: attrs.slug || item.id.toString(),
    };
  } catch (error) {
    console.error('Error fetching gallery by slug:', error);
    return null;
  }
};
