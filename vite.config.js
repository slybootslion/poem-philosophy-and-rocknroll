import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [VarletUIResolver()]
    })],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
})
