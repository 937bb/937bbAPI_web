<div align="center">

# 🚀 937bbAPI 网页版

[![开源协议: MIT](https://img.shields.io/badge/开源协议-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Nuxt 版本](https://img.shields.io/badge/Nuxt-3.17.5-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue 版本](https://img.shields.io/badge/Vue-3.5.16-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS 版本](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub 星标](https://img.shields.io/github/stars/937bb/937bbAPI_web?style=social)](https://github.com/937bb/937bbAPI_web/stargazers)
[![GitHub 复刻](https://img.shields.io/github/forks/937bb/937bbAPI_web?style=social)](https://github.com/937bb/937bbAPI_web/network/members)

> ✨ 一个现代化的免费API接口导航网站，提供最全、最易用的API接口服务。

[![在 VS Code 中打开](https://img.shields.io/badge/在_VS_Code_中打开-0078d7.svg?logo=visualstudiocode)](vscode://github.remotehub/open?url=https://github.com/937bb/937bbAPI_web)
[![在线演示](https://img.shields.io/badge/在线演示-4CAF50?style=for-the-badge&logo=web&logoColor=white)](https://webapi.937b.cn/)

</div>

---

## ✨ 功能亮点

<div align="center">

| 功能 | 描述 |
|------|------|
| 🚀 **全面的API接口导航** | 集成各类常用API，一站式满足开发需求 |
| 🔍 **智能搜索** | 快速定位所需API，支持模糊匹配 |
| 📱 **响应式设计** | 完美适配桌面、平板和移动设备 |
| ⚡ **极速体验** | 基于Nuxt 3的SSR渲染，首屏加载快如闪电 |
| 🎨 **现代化UI** | 使用Tailwind CSS构建的精致界面 |
| 📊 **实时统计** | 监控API调用情况，数据可视化展示 |

</div>

## 🚀 快速开始

### 环境要求

- ✅ Node.js 18+
- ⚡ pnpm 8+
- 💻 Git 2.0+

### 安装步骤

```bash
# 克隆仓库
💾 git clone https://github.com/937bb/937bbAPI_web.git

# 进入项目目录
📂 cd 937bbAPI_web

# 安装依赖 (推荐使用 pnpm)
📦 pnpm install
```

### 开发模式

```bash
# 1. 复制环境变量文件
📋 cp .env.example .env.development

# 2. 启动开发服务器
🚀 pnpm dev

# 3. 打开浏览器访问
🌐 http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
🔨 pnpm build

# 预览生产版本
👁️ pnpm preview
```

## 🛠️ 开发工具

<div align="center">

| 工具 | 用途 |
|------|------|
| VS Code | 推荐代码编辑器 |
| Vue 开发者工具 | Vue.js 调试工具 |
| Postman | API 测试工具 |
| Figma | 设计协作工具 |

</div>

## 🗂️ 项目结构

```bash
📦 937bbAPI_web
├── 📁 assets/          # 静态资源
│   └── 📁 css/         # 全局样式
├── 📁 components/      # 公共组件
│   ├── 📁 ui/          # UI组件库
│   └── 📁 layout/      # 布局组件
├── 📁 composables/     # 组合式函数
│   └── useApi.js      # API 组合式函数
├── 📁 layouts/         # 布局组件
│   ├── default.vue    # 默认布局
│   └── error.vue      # 错误页面布局
├── 📁 pages/           # 页面组件
│   ├── 📁 admin/       # 管理后台
│   ├── 📁 api/         # API相关页面
│   └── 📁 user/        # 用户相关页面
├── 📁 public/          # 公共文件
│   ├── 📁 images/      # 图片资源
│   └── favicon.ico    # 网站图标
├── 📁 server/          # 服务端API
│   └── 📁 api/         # API路由
│       ├── apis.get.ts # 获取API列表
│       └── ...         # 其他API
├── 📁 utils/           # 工具函数
│   ├── api.js         # API请求封装
│   └── helpers.js     # 辅助函数
├── 📄 app.vue         # 主应用组件
├── 📄 nuxt.config.ts  # Nuxt配置文件
└── 📄 package.json    # 项目依赖
```

## 👥 参与贡献

欢迎贡献你的力量！以下是参与步骤：

<div align="left">

```bash
# 1. Fork 项目到你的 GitHub 账户
🔀 Fork 本项目

# 2. 克隆仓库到本地
💻 git clone https://github.com/你的用户名/937bbAPI_web.git

# 3. 创建特性分支
🌿 git checkout -b feature/amazing-feature

# 4. 提交你的更改
💾 git commit -m "feat: 添加了惊人的功能"

# 5. 推送到远程仓库
🚀 git push origin feature/amazing-feature

# 6. 提交 Pull Request
🔗 在 GitHub 上提交 Pull Request
```

</div>

### 贡献指南

- 提交代码前请运行 `pnpm lint` 检查代码格式
- 确保添加适当的单元测试
- 更新相关文档
- 保持代码风格一致

## 🐛 报告问题

发现 Bug 或有功能建议？请 [提交 Issue](https://github.com/937bb/937bbAPI_web/issues/new/choose)

## 📜 开源协议

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

本项目采用 [MIT 协议](LICENSE) 开源，请自由地享受和参与开源。

</div>

## 🤝 致谢

感谢以下优秀的开源项目：

<div align="center">

| 项目 | 描述 |
|------|------|
| [Nuxt 3](https://nuxt.com/) | 全栈Web框架 |
| [Vue 3](https://vuejs.org/) | 渐进式JavaScript框架 |
| [Tailwind CSS](https://tailwindcss.com/) | 实用优先的CSS框架 |
| [Hero Icons](https://heroicons.com/) | 精美的SVG图标库 |

</div>

## 📞 联系我们

<div align="center" style="margin: 20px 0;">

[![GitHub 仓库](https://img.shields.io/badge/GitHub-937bb/937bbAPI_web-181717?logo=github)](https://github.com/937bb/937bbAPI_web)
[![问题跟踪](https://img.shields.io/github/issues/937bb/937bbAPI_web?logo=github&label=问题)](https://github.com/937bb/937bbAPI_web/issues)
[![讨论区](https://img.shields.io/badge/讨论区-5865F2?logo=discord&logoColor=white)](https://github.com/937bb/937bbAPI_web/discussions)

</div>

## ✨ 贡献者

感谢所有贡献者的付出！

<a href="https://github.com/937bb/937bbAPI_web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=937bb/937bbAPI_web" />
</a>

---

<div align="center" style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
  <h3>如果这个项目对你有帮助，请考虑给它一个 ⭐️</h3>
  <p>你的支持是我们持续更新的最大动力！</p>
  
  [![GitHub 星标](https://img.shields.io/github/stars/937bb/937bbAPI_web.svg?style=social)](https://github.com/937bb/937bbAPI_web/stargazers)
  [![GitHub 复刻](https://img.shields.io/github/forks/937bb/937bbAPI_web.svg?style=social)](https://github.com/937bb/937bbAPI_web/network/members)
</div>

## 🚀 部署指南

### 构建生产版本

```bash
# 使用 pnpm
pnpm build

# 或者使用 yarn
yarn build

# 或者使用 npm
npm run build
```

### 本地预览生产版本

```bash
# 使用 pnpm
pnpm preview

# 或者使用 yarn
yarn preview

# 或者使用 npm
npm run preview
```

### 部署到生产环境

1. 构建生产版本
2. 将 `.output` 目录部署到支持 Node.js 的服务器
3. 配置环境变量
4. 启动服务

更多部署选项，请参考 [Nuxt 部署文档](https://nuxt.com/docs/getting-started/deployment)

## 🎉 开始使用

1. 访问 [在线演示](https://your-demo-url.com) 查看效果
2. 按照上述步骤在本地运行项目
3. 探索 `pages/` 目录下的页面组件
4. 在 `server/api/` 下添加你的API接口
5. 在 `components/` 中创建可复用的UI组件

## 📱 移动端适配

项目已完全适配移动端，确保在各种设备上都能获得良好的用户体验。

## 🔒 安全性

- 所有敏感信息都存储在环境变量中
- 实现了基本的CORS策略
- 建议在生产环境中启用HTTPS

## 🤝 社区支持

如果你有任何问题或建议，欢迎：

- 提交 [GitHub Issues](https://github.com/937bb/937bbAPI_web/issues)
- 参与 [讨论区](https://github.com/937bb/937bbAPI_web/discussions)
- 发送邮件至 your-email@example.com

## 📅 更新日志

详细更新记录请查看 [CHANGELOG.md](CHANGELOG.md)
