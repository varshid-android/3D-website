import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import chatHandler from './api/chat';

function localApiChatPlugin(env: Record<string, string>) {
  return {
    name: 'local-api-chat-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/chat', async (req: any, res: any) => {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch {
            req.body = {};
          }

          // Ensure env vars are passed into process.env
          if (env.OPENROUTER_API_KEY) {
            process.env.OPENROUTER_API_KEY = env.OPENROUTER_API_KEY;
          }
          if (env.OPENROUTER_MODEL) {
            process.env.OPENROUTER_MODEL = env.OPENROUTER_MODEL;
          }

          res.status = (code: number) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          try {
            await chatHandler(req, res);
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), localApiChatPlugin(env)],
    server: {
      port: 3000,
      open: false,
      host: true,
    },
    build: {
      target: 'esnext',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three'],
            'react-three': ['@react-three/fiber', '@react-three/drei'],
            vendor: ['react', 'react-dom', 'gsap'],
          },
        },
      },
    },
  };
});
