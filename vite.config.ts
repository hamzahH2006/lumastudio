import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import {defineConfig, type Plugin} from 'vite';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const safeName = (name: string): string => {
  const base = name.replace(/\.{2,}|\/|\\|\0/g, '-').trim();
  return base.length > 0 ? base : 'file';
};

const safeSlug = (slug: string): string => {
  const s = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'app';
};

// Lightweight "GitHub-style" asset pipeline. During `vite dev` and `vite preview`,
// POST /__luma/upload writes a base64 payload into public/apps/<slug>/<folder>/
// and returns the public URL so the committed repo keeps copied assets live.
const lumaAssetsPlugin = (): Plugin => {
  const handleUpload = (req: IncomingMessage, rawUrl: string, res: ServerResponse) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const slug = safeSlug(String(payload.slug || 'app'));
        const folder = String(payload.folder || 'files').replace(/[^a-z0-9-]/g, '');
        const filename = safeName(String(payload.filename || 'file'));
        const content = String(payload.content || '');

        if (!SLUG_RE.test(slug)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Invalid slug' }));
          return;
        }

        const match = content.match(/^data:([^;]+);base64,(.+)$/s);
        if (!match) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Expected a base64 data URL' }));
          return;
        }

        const dir = path.resolve(__dirname, 'public', 'apps', slug, folder);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, filename), Buffer.from(match[2], 'base64'));

        const url = `/apps/${slug}/${folder}/${filename}`;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true, url }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: String(err) }));
      }
    });
  };

  return {
    name: 'luma-assets-uploader',
    configureServer(server) {
      server.middlewares.use('/__luma/upload', (req, res) => {
        handleUpload(req, req.url || '', res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/__luma/upload', (req, res) => {
        handleUpload(req, req.url || '', res);
      });
    },
  };
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), lumaAssetsPlugin()],
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