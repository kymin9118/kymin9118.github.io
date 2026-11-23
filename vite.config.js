import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        → dist/ (GitHub Pages 배포용)
// `npm run build:single` → dist-single/index.html 한 파일 (미리보기 공유용)
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  build: mode === 'single'
    ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000 }
    : { outDir: 'dist' },
}));
