/**
 * Lifecycle hooks for Article content type
 * Auto-generate slug from title when creating or updating article
 * 
 * CARA PAKAI:
 * 1. Copy file ini ke: strapi/src/api/article/content-types/article/lifecycles.js
 * 2. Restart Strapi server
 * 3. Slug akan otomatis terisi dari title saat buat artikel baru
 */

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    
    // Auto-generate slug from title if slug is empty
    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
      console.log('✅ Auto-generated slug:', data.slug);
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    
    // Auto-generate slug from title if slug is empty and title changed
    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
      console.log('✅ Auto-generated slug:', data.slug);
    }
  },
};
