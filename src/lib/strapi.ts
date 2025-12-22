import { GraphQLClient } from 'graphql-request';

// Configure your Strapi URL here
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_GRAPHQL_ENDPOINT = `${STRAPI_URL}/graphql`;

export const strapiClient = new GraphQLClient(STRAPI_GRAPHQL_ENDPOINT, {
  headers: {},
});

// Types for your data
export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  image: {
    url: string;
    alternativeText: string;
  };
  buttonText: string;
  buttonLink: string;
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
  image: {
    url: string;
    alternativeText: string;
  };
  publishedAt: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: {
    url: string;
    alternativeText: string;
  };
  rating: number;
}

export interface Profile {
  vision: string;
  mission: string[];
  history: string;
}

// Example queries (customize based on your Strapi schema)
export const getHeroSlides = async (): Promise<Hero[]> => {
  const query = `
    query {
      heroes {
        data {
          id
          attributes {
            title
            subtitle
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            buttonText
            buttonLink
          }
        }
      }
    }
  `;

  try {
    const data: any = await strapiClient.request(query);
    return data.heroes?.data || [];
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
};

export const getQuickAccess = async (): Promise<QuickAccess[]> => {
  const query = `
    query {
      quickAccesses {
        data {
          id
          attributes {
            title
            icon
            link
          }
        }
      }
    }
  `;

  try {
    const data: any = await strapiClient.request(query);
    return data.quickAccesses?.data || [];
  } catch (error) {
    console.error('Error fetching quick access:', error);
    return [];
  }
};

export const getCampusAdvantages = async (): Promise<CampusAdvantage[]> => {
  const query = `
    query {
      campusAdvantages {
        data {
          id
          attributes {
            title
            description
            icon
          }
        }
      }
    }
  `;

  try {
    const data: any = await strapiClient.request(query);
    return data.campusAdvantages?.data || [];
  } catch (error) {
    console.error('Error fetching campus advantages:', error);
    return [];
  }
};

export const getNews = async (limit: number = 6): Promise<News[]> => {
  const query = `
    query($limit: Int!) {
      articles(pagination: { limit: $limit }, sort: "publishedAt:desc") {
        data {
          id
          attributes {
            title
            excerpt
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            publishedAt
            slug
          }
        }
      }
    }
  `;

  try {
    const data: any = await strapiClient.request(query, { limit });
    return data.articles?.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const query = `
    query {
      testimonials {
        data {
          id
          attributes {
            name
            role
            content
            avatar {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            rating
          }
        }
      }
    }
  `;

  try {
    const data: any = await strapiClient.request(query);
    return data.testimonials?.data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  const query = `
    query {
      profile {
        data {
          attributes {
            vision
            mission
            history
          }
        }
      }
    }
  `;

  try {
    const data: any = await strapiClient.request(query);
    return data.profile?.data?.attributes || null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
