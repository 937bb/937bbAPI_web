<div align="center">
  <h1>📡 937bbAPI 导航站</h1>
  <p>最全、最易用的免费API接口导航站</p>
  <img src="https://img.shields.io/badge/Nuxt-3.0.0-00DC82?style=flat-square&logo=nuxt.js" alt="Nuxt 3">
  <img src="https://img.shields.io/badge/Vue-3.3.0-4FC08D?style=flat-square&logo=vue.js" alt="Vue 3">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
</div>

## 🌟 项目介绍

937bbAPI 是一个现代化的API接口导航网站，旨在为开发者提供便捷的API搜索和使用体验。项目采用前沿的前端技术栈构建，具有响应式设计，支持PC和移动端访问。

## ✨ 功能特性

- 🔍 强大的API搜索功能
- 📱 响应式设计，完美适配各种设备
- 🎨 现代化UI界面，提供优质用户体验
- ⚡ 基于Nuxt 3，极速加载
- 🔄 实时API状态监控
- 📊 详细的API使用统计
- 🔐 用户认证与授权
- 🌍 多语言支持（待开发）

## 🛠️ 技术栈

- **前端框架**: Nuxt 3 + Vue 3
- **UI组件**: Headless UI + Heroicons
- **样式**: Tailwind CSS 3
- **构建工具**: Vite
- **语言**: TypeScript
- **代码规范**: ESLint + Prettier
- **版本控制**: Git

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 安装依赖
pnpm install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev
```

### 生产环境

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📁 项目结构

```
937bbAPI_web/
├── assets/             # 静态资源
├── components/         # 公共组件
├── composables/        # 组合式函数
├── layouts/            # 布局组件
├── pages/              # 页面组件
│   ├── admin/         # 管理后台页面
│   ├── api/           # API相关页面
│   └── user/          # 用户相关页面
├── plugins/            # 插件
├── public/             # 公共文件
├── server/             # 服务端代码
├── utils/              # 工具函数
├── app.vue             # 应用入口
├── nuxt.config.ts      # Nuxt配置
└── tailwind.config.js  # Tailwind配置
```

## ⚙️ 环境变量配置

复制 `.env.example` 文件并重命名为 `.env.development`（开发环境）或 `.env.production`（生产环境），然后修改相应配置：

```env
# 基础配置
VITE_BASE_URL=你的API基础地址
VITE_SITE_NAME=937bbAPI
VITE_ICP=你的ICP备案号
VITE_ICP_URL=备案查询链接
VITE_AUTHOR=你的名字
VITE_USER_NODE_ENV=development
```

## 🛠️ 开发指南

### 创建新页面

1. 在 `pages` 目录下创建新的 `.vue` 文件
2. 使用以下模板开始编写：

```vue
<template>
  <div>
    <!-- 页面内容 -->
  </div>
</template>

<script setup>
// 页面逻辑
</script>

<style scoped>
/* 页面样式 */
</style>
```

### 添加新组件

1. 在 `components` 目录下创建新的组件文件
2. 使用 `defineComponent` 或 `<script setup>` 语法
3. 在需要的页面中导入并使用

## 🚀 构建与部署

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 部署

项目支持多种部署方式：

1. **Node.js 服务器**:
   ```bash
   pnpm build
   pnpm prod
   ```

2. **静态站点**:
   ```bash
   pnpm generate
   # 将 .output/public 目录部署到静态网站托管服务
   ```

3. **Docker 部署**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY . .
   RUN pnpm install --frozen-lockfile
   RUN pnpm build
   CMD ["node", ".output/server/index.mjs"]
   ```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)

---

<div align="center">
  <p>Made with ❤️ by 937bb</p>
  <p>© 2025 937bbAPI. All rights reserved.</p>
</div>
