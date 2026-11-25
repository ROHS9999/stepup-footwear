import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { minify } from 'html-minifier-terser'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-minification',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        async handler(html) {
          return await minify(html, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
          })
        },
      },
    },
  ],
})