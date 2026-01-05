// Configure your Strapi URL here
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

// Helper function to fetch from Strapi REST API
async function fetchStrapi(endpoint: string) {
  const response = await fetch(`${STRAPI_API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return response.json();
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
        publishedAt: attrs.publishedAt || new Date().toISOString(),
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
      publishedAt: attrs.publishedAt || new Date().toISOString(),
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
