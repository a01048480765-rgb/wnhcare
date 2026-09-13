import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function dynamicOgPlugin(): Plugin {
  const defaultOrigin = 'https://wnhcare.com';

  return {
    name: 'dynamic-og-meta',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || '/';
        const pathname = rawUrl.split('?')[0];
        
        // Intercept requests for HTML entry
        if (pathname === '/' || pathname === '/index.html') {
          try {
            const xHost = req.headers['x-forwarded-host'] || req.headers['host'] || '';
            const hostStr = Array.isArray(xHost) ? xHost[0] : xHost;
            
            let origin = defaultOrigin;
            if (hostStr && !hostStr.includes('localhost:3000') && !hostStr.includes('127.0.0.1:3000')) {
              const cleanHost = hostStr.split(',')[0].trim();
              origin = `https://${cleanHost}`;
            }
            let html = await fs.promises.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
            html = await server.transformIndexHtml(rawUrl, html);

            const ogImageUrl = 'https://i.imgur.com/FadLgcQ.png';
            const canonicalUrl = `${origin}/`;

            html = html
              .replace(/__OG_IMAGE_URL__/g, ogImageUrl)
              .replace(/__CANONICAL_URL__/g, canonicalUrl)
              .replace(/__ORIGIN_URL__/g, origin);

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
            return;
          } catch (err) {
            return next(err);
          }
        }
        next();
      });
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // During build (when ctx.server is not present), apply default origin
        if (!ctx || !ctx.server) {
          const ogImageUrl = 'https://i.imgur.com/FadLgcQ.png';
          const canonicalUrl = `${defaultOrigin}/`;

          return html
            .replace(/__OG_IMAGE_URL__/g, ogImageUrl)
            .replace(/__CANONICAL_URL__/g, canonicalUrl)
            .replace(/__ORIGIN_URL__/g, defaultOrigin);
        }
        return html;
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), dynamicOgPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
