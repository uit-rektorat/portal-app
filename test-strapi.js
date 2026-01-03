// Quick test script to verify Strapi data fetching
const STRAPI_URL = 'http://localhost:1337';

async function testHeroFetch() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/heroes?populate=*`);
    const data = await response.json();
    
    console.log('✅ API Response:', JSON.stringify(data, null, 2));
    
    if (data.data && data.data.length > 0) {
      console.log('\n✅ Found', data.data.length, 'hero slides');
      
      // Transform data like in strapi.ts
      const heroes = data.data.map((item) => {
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
      });
      
      console.log('\n✅ Transformed data:', JSON.stringify(heroes, null, 2));
    } else {
      console.log('⚠️ No hero data found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testHeroFetch();
