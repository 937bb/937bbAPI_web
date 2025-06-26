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

- 🔍 **强大的API搜索**：快速找到您需要的API接口
- 📱 **响应式设计**：完美适配各种设备尺寸
- 🎨 **现代化UI**：简洁美观的用户界面
- ⚡ **极速加载**：基于Nuxt 3的快速渲染
- 🔄 **实时监控**：API状态实时监控
- 📊 **使用统计**：详细的API调用统计
- 🔒 **用户认证**：安全的用户认证与授权
- 🌍 **多语言支持**：国际化支持（开发中）

## 🛠️ 技术栈

- **前端框架**: Nuxt 3 + Vue 3
- **UI组件**: Headless UI + Heroicons
- **样式**: Tailwind CSS 3
- **构建工具**: Vite
- **编程语言**: TypeScript
- **代码规范**: ESLint + Prettier
- **版本控制**: Git

---

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
├── .nuxt/                  # Nuxt 自动生成的文件
├── .output/               # 构建输出目录
├── .vscode/               # VS Code 配置
├── assets/                # 静态资源
│   ├── css/               # 全局样式
│   └── images/            # 图片资源
├── components/            # 公共组件
│   ├── layout/            # 布局组件
│   ├── ui/                # UI 基础组件
│   └── icons/             # 图标组件
├── composables/           # 组合式函数
├── content/               # 内容文件（如 Markdown）
├── layouts/               # 布局文件
│   └── default.vue        # 默认布局
├── middleware/            # 中间件
├── node_modules/          # 项目依赖
├── pages/                 # 页面组件
│   ├── api/               # API 相关页面
│   ├── index.vue          # 首页
│   └── [...slug].vue      # 动态路由
├── plugins/               # 插件
├── public/                # 静态文件（直接复制到根目录）
├── server/                # 服务端代码
│   ├── api/               # API 路由
│   └── middleware/        # 服务端中间件
├── static/                # 静态资源（直接映射到根路径）
├── stores/                # 状态管理
├── types/                 # TypeScript 类型定义
├── utils/                 # 工具函数
├── .editorconfig          # 编辑器配置
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── .eslintrc.js           # ESLint 配置
├── .gitignore             # Git 忽略文件
├── app.vue                # 应用入口
├── nuxt.config.ts         # Nuxt 配置文件
├── package.json           # 项目配置
├── pnpm-lock.yaml         # 依赖版本锁文件
├── README.md              # 项目说明
└── tsconfig.json          # TypeScript 配置

## ⚙️ 环境变量配置

使用`.env.development`（开发环境）或 `.env.production`（生产环境），然后修改相应配置：

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

## 👥 贡献者

感谢所有为项目做出贡献的开发者！

<div align="center">
  <a href="https://github.com/937bb" target="_blank">
    <img src="https://avatars.githubusercontent.com/u/937bb?s=200" width="100" height="100" alt="937bb" style="border-radius: 50%; border: 3px solid #e2e8f0;">
    <br>
    <strong>937bb</strong>
    <br>
    <small>项目维护者</small>
  </a>
</div>

想要成为贡献者？请阅读我们的 [贡献指南](#-贡献指南)

<div style="margin: 3rem 0; padding: 2rem; background-color: #f8f9fa; border-radius: 0.5rem;">
  <h2 style="color: #2d3748; margin-top: 0; margin-bottom: 1.5rem; text-align: center;">🔗 相关项目</h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    <div style="background: white; border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
        <div style="width: 48px; height: 48px; background-color: #e9ecef; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin-right: 1rem; flex-shrink: 0;">
          <span style="font-size: 1.5rem;">📦</span>
        </div>
        <h3 style="margin: 0; color: #2d3748;">API 管理后台</h3>
      </div>
      <p style="color: #4a5568; margin-bottom: 1.25rem; line-height: 1.6;">
        一个功能完整的API管理后台，提供API的创建、管理、监控和权限控制等功能。
      </p>
      <div style="display: flex; align-items: center;">
        <a href="https://github.com/937bb/apiManagement" target="_blank" style="display: inline-flex; align-items: center; background-color: #4299e1; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500; transition: background-color 0.2s;">
          <svg style="width: 1rem; height: 1rem; margin-right: 0.5rem;" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 1 1 0 001.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
          </svg>
          查看项目
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

*   [Nuxt 3](https://nuxt.com/) - 直观的 Vue 框架
*   [Vue 3](https://v3.vuejs.org/) - 渐进式 JavaScript 框架
*   [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
*   [Vite](https://vitejs.dev/) - 下一代前端工具链
*   [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

## 📊 项目统计

[![GitHub stars](https://img.shields.io/github/stars/937bb/937bbAPI_web?style=for-the-badge)](https://github.com/937bb/937bbAPI_web/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/937bb/937bbAPI_web?style=for-the-badge)](https://github.com/937bb/937bbAPI_web/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/937bb/937bbAPI_web?style=for-the-badge)](https://github.com/937bb/937bbAPI_web/watchers)
[![License](https://img.shields.io/github/license/937bb/937bbAPI_web?style=for-the-badge)](https://github.com/937bb/937bbAPI_web/blob/main/LICENSE)

---

Made with ❤️ by 937bb

© 2025 937bbAPI. All rights reserved.
