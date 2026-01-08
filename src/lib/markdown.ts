/**
 * Markdown Utility Functions
 * Helper functions to parse and render markdown content from Strapi
 */

import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
});

/**
 * Parse markdown string to HTML
 * @param markdown - The markdown string to parse
 * @returns HTML string
 */
export function parseMarkdown(markdown: string | undefined | null): string {
  if (!markdown) return '';
  
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return markdown;
  }
}

/**
 * Parse markdown with custom renderer for better styling
 * @param markdown - The markdown string to parse
 * @returns HTML string with custom classes
 */
export function parseMarkdownWithClasses(markdown: string | undefined | null): string {
  if (!markdown) return '';
  
  try {
    // Custom renderer for adding classes
    const renderer = new marked.Renderer();
    
    // Override heading renderer
    renderer.heading = ({ text, depth }) => {
      const headingClasses = {
        1: 'text-3xl font-bold text-gray-900 mt-8 mb-4',
        2: 'text-2xl font-bold text-gray-900 mt-6 mb-3',
        3: 'text-xl font-semibold text-gray-900 mt-4 mb-2',
        4: 'text-lg font-semibold text-gray-800 mt-3 mb-2',
        5: 'text-base font-semibold text-gray-800 mt-2 mb-1',
        6: 'text-sm font-semibold text-gray-700 mt-2 mb-1',
      };
      
      const className = headingClasses[depth as keyof typeof headingClasses] || '';
      return `<h${depth} class="${className}">${text}</h${depth}>`;
    };
    
    // Override paragraph renderer
    renderer.paragraph = ({ text }) => {
      return `<p class="mb-4 leading-relaxed">${text}</p>`;
    };
    
    // Override list renderer
    renderer.list = ({ ordered, start, items }) => {
      const tag = ordered ? 'ol' : 'ul';
      const className = ordered 
        ? 'list-decimal list-inside mb-4 space-y-2' 
        : 'list-disc list-inside mb-4 space-y-2';
      const startAttr = (ordered && start !== 1) ? ` start="${start}"` : '';
      return `<${tag} class="${className}"${startAttr}>${items}</${tag}>`;
    };
    
    // Override list item renderer
    renderer.listitem = ({ text }) => {
      return `<li class="ml-4">${text}</li>`;
    };
    
    // Override link renderer
    renderer.link = ({ href, title, text }) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}" class="text-uit-green hover:text-uit-green-dark underline"${titleAttr}>${text}</a>`;
    };
    
    // Override blockquote renderer
    renderer.blockquote = ({ text }) => {
      return `<blockquote class="border-l-4 border-uit-green pl-4 italic text-gray-700 my-4">${text}</blockquote>`;
    };
    
    // Override code block renderer
    renderer.code = ({ text, lang }) => {
      const language = lang || 'text';
      return `<pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4"><code class="language-${language}">${text}</code></pre>`;
    };
    
    // Override inline code renderer
    renderer.codespan = ({ text }) => {
      return `<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">${text}</code>`;
    };
    
    // Override image renderer
    renderer.image = ({ href, title, text }) => {
      const titleAttr = title ? ` title="${title}"` : '';
      const altAttr = text || '';
      return `<img src="${href}" alt="${altAttr}"${titleAttr} class="rounded-lg shadow-md my-4 max-w-full h-auto" />`;
    };
    
    marked.use({ renderer });
    
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Error parsing markdown with classes:', error);
    return markdown;
  }
}

/**
 * Strip HTML tags and return plain text (for excerpts)
 * @param html - HTML string
 * @param maxLength - Maximum length of output
 * @returns Plain text string
 */
export function stripHtml(html: string | undefined | null, maxLength?: number): string {
  if (!html) return '';
  
  let text = html.replace(/<[^>]*>/g, '');
  
  if (maxLength && text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }
  
  return text;
}
