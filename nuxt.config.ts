/*
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-23 08:44:15
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-24 16:16:58
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from 'vite'

interface VITE_ENV_CONFIG {
  VITE_BASE_URL: string,
  VITE_SITE_NAME: string,
  VITE_ICP: string,
  VITE_ICP_URL: string,
  VITE_AUTHOR: string,
  VITE_USER_NODE_ENV: string
}

const envScript = process.env.npm_lifecycle_script?.split(' ') || [];
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/main.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: 'first',
    viewer: true,
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '~/assets/main.css',
  ],
  app: {
    head: {
      title: '937bb API 文档',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '937bb API 文档' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      ...envData,
    },
  },
  typescript: {
    strict: true,
  },
  ssr: true,
  srcDir: '.',
  build: {
    transpile: [],
  },
  experimental: {
    inlineSSRStyles: false,
  },
})
