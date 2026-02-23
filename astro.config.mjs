import { defineConfig } from 'astro/config';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

export default defineConfig({
  site: 'https://tinytooltown.com',
  output: 'static',
  markdown: {
    rehypePlugins: [
      [rehypeSanitize, {
        ...defaultSchema,
        tagNames: [...(defaultSchema.tagNames || []), 'img'],
        attributes: {
          ...defaultSchema.attributes,
          img: ['src', 'alt', 'title', 'width', 'height'],
          a: ['href', 'title'],
        },
        protocols: {
          href: ['http', 'https'],
          src: ['http', 'https'],
        },
      }],
    ],
  },
});
