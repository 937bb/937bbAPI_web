<div align="center">

# ✨ 937bbAPI 网页版

> 一个现代化的免费API接口导航网站，提供最全、最易用的API接口服务。

<div style="margin: 20px 0;">
  <a href="vscode://github.remotehub/open?url=https://github.com/937bb/937bbAPI_web" style="margin: 0 10px;">
    <img src="https://img.shields.io/badge/在_VS_Code_中打开-0078d7?style=for-the-badge&logo=visualstudiocode" alt="在 VS Code 中打开">
  </a>
  <a href="https://webapi.937b.cn/" style="margin: 0 10px;">
    <img src="https://img.shields.io/badge/在线演示-4CAF50?style=for-the-badge&logo=web&logoColor=white" alt="在线演示">
  </a>
</div>

<div style="margin: 15px 0;">
  <a href="https://github.com/937bb/937bbAPI_web/stargazers">
    <img src="https://img.shields.io/github/stars/937bb/937bbAPI_web?style=social&logo=github" alt="GitHub 星标">
  </a>
  <a href="https://github.com/937bb/937bbAPI_web/network/members">
    <img src="https://img.shields.io/github/forks/937bb/937bbAPI_web?style=social&logo=github" alt="GitHub 复刻">
  </a>
  <a href="https://github.com/937bb/937bbAPI_web/issues">
    <img src="https://img.shields.io/github/issues/937bb/937bbAPI_web?logo=github" alt="GitHub 问题">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/开源协议-MIT-yellow.svg" alt="开源协议">
  </a>
</div>

<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 20px 0;">
  <a href="https://nuxt.com/">
    <img src="https://img.shields.io/badge/Nuxt-3.17.5-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt 版本">
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.5.16-4FC08D?logo=vue.js&logoColor=white" alt="Vue 版本">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwind-css&logoColor=white" alt="Tailwind CSS 版本">
  </a>
</div>

</div>

<style>
  /* 添加一些动画效果 */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  #header {
    animation: fadeIn 0.8s ease-out;
  }
  
  .badge-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
  }
  
  .badge-container a {
    transition: transform 0.3s ease;
  }
  
  .badge-container a:hover {
    transform: translateY(-3px);
  }
</style>

---

## 🎯 项目特色

<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">🚀</div>
    <h3>全面的API接口导航</h3>
    <p>集成各类常用API，一站式满足开发需求</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🔍</div>
    <h3>智能搜索</h3>
    <p>快速定位所需API，支持模糊匹配</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">📱</div>
    <h3>响应式设计</h3>
    <p>完美适配桌面、平板和移动设备</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <h3>极速体验</h3>
    <p>基于Nuxt 3的SSR渲染，首屏加载快如闪电</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🎨</div>
    <h3>现代化UI</h3>
    <p>使用Tailwind CSS构建的精致界面</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">📊</div>
    <h3>实时统计</h3>
    <p>监控API调用情况，数据可视化展示</p>
  </div>
</div>

<style>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;
  padding: 0 10px;
}

.feature-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
  color: #1e293b;
  margin: 0 0 12px 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.feature-card p {
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .feature-card {
    padding: 25px 20px;
  }
}
</style>

## 🚀 快速开始

<div class="quick-start">
  <div class="requirements">
    <h3>📋 环境要求</h3>
    <div class="requirement-item">
      <span class="requirement-icon">✅</span>
      <span>Node.js 18+</span>
    </div>
    <div class="requirement-item">
      <span class="requirement-icon">⚡</span>
      <span>pnpm 8+</span>
    </div>
    <div class="requirement-item">
      <span class="requirement-icon">💻</span>
      <span>Git 2.0+</span>
    </div>
  </div>

  <div class="tabs">
    <button class="tab-button active" onclick="openTab('installation')">安装</button>
    <button class="tab-button" onclick="openTab('development')">开发</button>
    <button class="tab-button" onclick="openTab('production')">生产</button>
  </div>

  <div id="installation" class="tab-content active">
    <div class="code-block">
      <div class="code-header">
        <span>终端</span>
        <button class="copy-button" onclick="copyCode('install-code')">复制</button>
      </div>
      <pre id="install-code"><code># 克隆仓库
git clone https://github.com/937bb/937bbAPI_web.git

# 进入项目目录
cd 937bbAPI_web

# 安装依赖 (推荐使用 pnpm)
pnpm install</code></pre>
    </div>
  </div>

  <div id="development" class="tab-content">
    <div class="code-block">
      <div class="code-header">
        <span>开发模式</span>
      </div>
      <pre><code># 1. 配置环境变量
cp .env.example .env

# 2. 启动开发服务器
pnpm dev

# 3. 打开浏览器访问
http://localhost:3000</code></pre>
    </div>
  </div>

  <div id="production" class="tab-content">
    <div class="code-block">
      <div class="code-header">
        <span>生产构建</span>
      </div>
      <pre><code># 构建生产版本
pnpm build

# 预览生产版本
pnpm preview</code></pre>
    </div>
  </div>
</div>

<style>
.quick-start {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 30px 0;
  border: 1px solid #e2e8f0;
}

.requirements {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}

.requirements h3 {
  margin-top: 0;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: #334155;
}

.requirement-icon {
  font-size: 1.2em;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.tab-button {
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #64748b;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #3b82f6;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-content {
  display: none;
  animation: fadeIn 0.3s ease;
}

.tab-content.active {
  display: block;
}

.code-block {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  margin: 15px 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  background: #0f172a;
  color: #94a3b8;
  font-size: 0.9em;
}

.copy-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.code-block pre {
  margin: 0 !important;
  padding: 15px !important;
  background: none !important;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.9em;
  line-height: 1.6;
}

.code-block code {
  color: #e2e8f0;
  font-family: inherit;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script>
function openTab(tabName) {
  // 隐藏所有标签内容
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }
  
  // 移除所有标签按钮的活动状态
  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }
  
  // 显示选中的标签内容
  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}

function copyCode(elementId) {
  const codeElement = document.getElementById(elementId);
  const range = document.createRange();
  range.selectNode(codeElement);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  
  // 显示复制成功提示
  const button = event.target;
  const originalText = button.textContent;
  button.textContent = '已复制！';
  button.style.background = '#10b981';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = 'rgba(255, 255, 255, 0.1)';
  }, 2000);
}
</script>

## 🛠️ 开发工具

<div align="center">

| 工具 | 用途 |
|------|------|
| VS Code | 推荐代码编辑器 |
| ApiFox | API 测试工具 |
| Nuxt 3 | 框架 |

</div>

## 🌳 项目结构

```
📦 937bbAPI_web
├── 📂 assets/                    # 静态资源
│   ├── 📂 css/                  # 全局样式
│   │   ├── 📄 _reset.css        # 样式重置
│   │   └── 📄 main.css          # 主样式文件
│   └── 📄 reset.css             # 基础重置样式
│
├── 📂 components/              # 公共组件
│   ├── 📂 admin/                # 管理后台组件
│   │   └── GroupManagementModal.vue
│   ├── 📂 layout/               # 布局组件
│   │   ├── TheFooter.vue       # 页脚
│   │   └── TheHeader.vue       # 页头
│   ├── 📂 style/                # 样式组件
│   │   └── ThemeProvider.vue   # 主题提供者
│   ├── 📂 ui/                   # UI基础组件
│   │   ├── Alert.vue           # 提示框
│   │   ├── Button.vue          # 按钮
│   │   ├── Card.vue            # 卡片
│   │   ├── Empty.vue           # 空状态
│   │   ├── Input.vue           # 输入框
│   │   ├── Loading.vue         # 加载中
│   │   ├── Modal.vue           # 模态框
│   │   └── Table.vue           # 表格
│   ├── ApiCard.vue             # API卡片
│   ├── MessageModal.vue        # 消息弹窗
│   └── NotificationContainer.vue # 通知容器
│
├── 📂 composables/            # 组合式函数
│   ├── useNotification.ts      # 通知相关逻辑
│   └── useUser.js              # 用户相关逻辑
│
├── 📂 layouts/                # 布局文件
│   ├── admin.vue               # 管理后台布局
│   └── default.vue             # 默认布局
│
├── 📂 pages/                  # 页面组件
│   ├── 📂 admin/               # 管理后台
│   │   ├── 📂 api/             # API管理
│   │   │   ├── [id].vue       # API详情
│   │   │   └── index.vue      # API列表
│   │   ├── 📂 users/           # 用户管理
│   │   │   ├── [id].vue       # 用户详情
│   │   │   └── index.vue      # 用户列表
│   │   └── index.vue          # 管理后台首页
│   └── index.vue              # 网站首页
│
├── 📂 public/                # 静态资源
│   └── favicon.ico            # 网站图标
│
├── 📂 utils/                 # 工具函数
│   ├── 📂 api/                # API相关
│   │   └── index.js           # API请求封装
│   ├── apiFetch.js            # 请求封装
│   └── globalConfig.js        # 全局配置
│
├── 📄 .env.development       # 开发环境变量
├── 📄 .env.production          # 生产环境变量
├── 📄 .gitignore              # Git忽略配置
├── 📄 app.vue                 # 应用入口
├── 📄 netlify.toml            # Netlify配置
├── 📄 nuxt.config.ts          # Nuxt配置
└── 📄 package.json            # 项目配置
```

<style>
/* 文件树样式 */
.file-tree {
  background: #1e293b;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  color: #e2e8f0;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.9em;
  line-height: 1.6;
  overflow-x: auto;
}

.file-tree pre {
  margin: 0;
  white-space: pre;
  counter-reset: line;
}

.file-tree .line {
  display: block;
  padding: 2px 0;
  position: relative;
  padding-left: 2em;
  border-left: 1px solid #334155;
  transition: all 0.2s ease;
}

.file-tree .line:hover {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: #3b82f6;
}

.file-tree .line:before {
  counter-increment: line;
  content: counter(line);
  position: absolute;
  left: 0;
  color: #64748b;
  width: 2em;
  text-align: right;
  padding-right: 0.5em;
  user-select: none;
}

.file-tree .folder {
  color: #60a5fa;
  font-weight: 500;
}

.file-tree .file {
  color: #e2e8f0;
}

.file-tree .comment {
  color: #64748b;
  font-style: italic;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .file-tree {
    font-size: 0.8em;
    padding: 1rem;
  }
}
</style>

## 👥 参与贡献

欢迎加入我们的开源社区！我们非常欢迎各种形式的贡献，包括但不限于：

<div class="contribution-types">
  <div class="contribution-card">
    <div class="contribution-icon">🐞</div>
    <h4>报告问题</h4>
    <p>发现 Bug 或有改进建议？提交 Issue 告诉我们</p>
    <a href="https://github.com/937bb/937bbAPI_web/issues/new/choose" class="contribution-button">提交 Issue</a>
  </div>
  
  <div class="contribution-card">
    <div class="contribution-icon">💻</div>
    <h4>代码贡献</h4>
    <p>提交 Pull Request 来改进项目</p>
    <a href="#开发流程" class="contribution-button">查看开发流程</a>
  </div>
  
  <div class="contribution-card">
    <div class="contribution-icon">📚</div>
    <h4>完善文档</h4>
    <p>帮助改进文档，让项目更易用</p>
    <a href="#文档贡献" class="contribution-button">查看文档指南</a>
  </div>
</div>

### 🛠️ 开发流程

<div class="contribution-steps">
  <div class="step">
    <div class="step-number">1</div>
    <h4>Fork 仓库</h4>
    <p>点击 GitHub 右上角的 Fork 按钮</p>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step">
    <div class="step-number">2</div>
    <h4>克隆仓库</h4>
    <pre><code>git clone https://github.com/你的用户名/937bbAPI_web.git</code></pre>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step">
    <div class="step-number">3</div>
    <h4>创建分支</h4>
    <pre><code>git checkout -b feature/amazing-feature</code></pre>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step">
    <div class="step-number">4</div>
    <h4>提交代码</h4>
    <pre><code>git commit -m "feat: 添加了惊人的功能"</code></pre>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step">
    <div class="step-number">5</div>
    <h4>推送更改</h4>
    <pre><code>git push origin feature/amazing-feature</code></pre>
  </div>
  
  <div class="step-arrow">→</div>
  
  <div class="step">
    <div class="step-number">6</div>
    <h4>提交 PR</h4>
    <p>在 GitHub 上提交 Pull Request</p>
  </div>
</div>

### 📜 贡献指南

<div class="guidelines">
  <div class="guideline">
    <h4>📝 代码规范</h4>
    <ul>
      <li>遵循项目中的代码风格</li>
      <li>提交前运行 <code>pnpm lint</code> 检查代码格式</li>
      <li>确保代码有适当的注释</li>
    </ul>
  </div>
  
  <div class="guideline">
    <h4>🧪 测试要求</h4>
    <ul>
      <li>为新增功能添加单元测试</li>
      <li>确保所有测试通过</li>
      <li>测试覆盖率不应低于现有水平</li>
    </ul>
  </div>
  
  <div class="guideline">
    <h4>📚 文档更新</h4>
    <ul>
      <li>更新相关文档</li>
      <li>添加必要的使用示例</li>
      <li>保持文档与代码同步</li>
    </ul>
  </div>
</div>

## 🐛 报告问题

发现 Bug 或有功能建议？请 [提交 Issue](https://github.com/937bb/937bbAPI_web/issues/new/choose)

<style>
/* 贡献类型卡片 */
.contribution-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.contribution-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contribution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border-color: #cbd5e1;
}

.contribution-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  display: inline-block;
  transition: transform 0.3s ease;
}

.contribution-card:hover .contribution-icon {
  transform: scale(1.1) rotate(5deg);
}

.contribution-card h4 {
  margin: 0 0 10px 0;
  color: #1e293b;
  font-size: 1.2rem;
}

.contribution-card p {
  color: #64748b;
  margin: 0 0 20px 0;
  flex-grow: 1;
}

.contribution-button {
  display: inline-block;
  background: #3b82f6;
  color: white !important;
  padding: 8px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.contribution-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* 贡献步骤 */
.contribution-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 40px 0;
  position: relative;
}

.step {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  width: calc(16.666% - 20px);
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.step:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.step-number {
  background: #3b82f6;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.step h4 {
  margin: 0 0 10px;
  color: #1e293b;
  font-size: 1rem;
}

.step p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.step pre {
  background: #f8fafc;
  padding: 10px !important;
  border-radius: 6px;
  margin: 10px 0 0 !important;
  font-size: 0.8rem !important;
  text-align: left;
  overflow-x: auto;
}

.step code {
  background: none;
  padding: 0;
  font-size: 0.85em;
}

.step-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  font-size: 1.5rem;
  font-weight: bold;
  width: 40px;
  align-self: center;
  position: relative;
  top: -15px;
}

/* 贡献指南 */
.guidelines {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.guideline {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.guideline:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.guideline h4 {
  margin-top: 0;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.guideline ul {
  padding-left: 1.2rem;
  margin: 15px 0 0;
  color: #475569;
}

.guideline li {
  margin-bottom: 8px;
  line-height: 1.6;
  position: relative;
}

.guideline li:before {
  content: '•';
  color: #3b82f6;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.guideline code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #1e40af;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .step {
    width: calc(33.333% - 20px);
    margin-bottom: 40px;
  }
  
  .step-arrow {
    display: none;
  }
  
  .contribution-steps {
    justify-content: flex-start;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .step {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .step:last-child {
    margin-bottom: 0;
  }
  
  .guidelines {
    grid-template-columns: 1fr;
  }
  
  .contribution-types {
    grid-template-columns: 1fr;
  }
}
</style>

## 📜 开源协议

<div class="license-section">
  <div class="license-card">
    <div class="license-icon">📜</div>
    <h3>MIT 开源协议</h3>
    <p>本项目采用 <a href="LICENSE" class="license-link">MIT 协议</a> 开源</p>
    <div class="license-badges">
      <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
      </a>
      <a href="https://github.com/937bb/937bbAPI_web/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/937bb/937bbAPI_web" alt="GitHub license">
      </a>
    </div>
    <p class="license-text">
      您可以自由地使用、修改和分发本项目的代码，但请遵守 MIT 协议的条款。
    </p>
  </div>
</div>

## 🤝 致谢

<div class="acknowledgments">
  <h3>特别感谢以下优秀的开源项目</h3>
  
  <div class="tech-stack">
    <div class="tech-card">
      <a href="https://nuxt.com/" target="_blank">
        <img src="https://api.iconify.design/logos:nuxt-icon.svg" alt="Nuxt 3">
        <span>Nuxt 3</span>
      </a>
      <p>全栈Web框架</p>
    </div>
    
    <div class="tech-card">
      <a href="https://vuejs.org/" target="_blank">
        <img src="https://api.iconify.design/logos:vue.svg" alt="Vue 3">
        <span>Vue 3</span>
      </a>
      <p>渐进式JavaScript框架</p>
    </div>
    
    <div class="tech-card">
      <a href="https://tailwindcss.com/" target="_blank">
        <img src="https://api.iconify.design/logos:tailwindcss-icon.svg" alt="Tailwind CSS">
        <span>Tailwind CSS</span>
      </a>
      <p>实用优先的CSS框架</p>
    </div>
    
    <div class="tech-card">
      <a href="https://heroicons.com/" target="_blank">
        <img src="https://api.iconify.design/logos:heroku-icon.svg" alt="Hero Icons">
        <span>Hero Icons</span>
      </a>
      <p>精美的SVG图标库</p>
    </div>
  </div>
</div>

## 👥 社区与支持

<div class="community-section">
  <div class="community-card">
    <h3>📞 联系我们</h3>
    <p>有问题或建议？我们很乐意听取您的意见！</p>
    
    <div class="contact-links">
      <a href="https://github.com/937bb/937bbAPI_web/issues" class="contact-button">
        <img src="https://api.iconify.design/mdi:github.svg" alt="GitHub Issues">
        <span>提交 Issue</span>
      </a>
      
      <a href="https://github.com/937bb/937bbAPI_web/discussions" class="contact-button">
        <img src="https://api.iconify.design/mdi:message-text-outline.svg" alt="Discussions">
        <span>参与讨论</span>
      </a>
    </div>
  </div>
  
  <div class="contributors-card">
    <h3>✨ 贡献者</h3>
    <p>感谢所有贡献者的付出！</p>
    <div class="contributors-grid">
      <a href="https://github.com/937bb/937bbAPI_web/graphs/contributors">
        <img src="https://contrib.rocks/image?repo=937bb/937bbAPI_web" alt="Contributors" />
      </a>
    </div>
  </div>
</div>

<div class="support-section">
  <div class="support-content">
    <h3>🌟 支持我们</h3>
    <p>如果这个项目对您有帮助，请考虑给我们一个 ⭐️</p>
    <p>您的支持是我们持续更新的最大动力！</p>
    
    <div class="support-buttons">
      <a href="https://github.com/937bb/937bbAPI_web/stargazers" class="star-button">
        <img src="https://api.iconify.design/mdi:star.svg" alt="Star">
        <span>Star</span>
        <span class="star-count">0</span>
      </a>
      
      <a href="https://github.com/937bb/937bbAPI_web/network/members" class="fork-button">
        <img src="https://api.iconify.design/mdi:source-fork.svg" alt="Fork">
        <span>Fork</span>
      </a>
    </div>
  </div>
</div>

<style>
/* 开源协议 */
.license-section {
  margin: 40px 0;
}

.license-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.license-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.license-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  display: inline-block;
  color: #3b82f6;
}

.license-card h3 {
  margin: 0 0 10px;
  color: #1e293b;
  font-size: 1.5rem;
}

.license-card p {
  color: #64748b;
  margin: 0 0 20px;
  line-height: 1.6;
}

.license-badges {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.license-badges img {
  transition: transform 0.2s ease;
}

.license-badges img:hover {
  transform: scale(1.05);
}

.license-text {
  font-size: 0.95em;
  color: #64748b;
  max-width: 500px;
  margin: 20px auto 0 !important;
}

.license-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.license-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* 致谢部分 */
.acknowledgments {
  margin: 60px 0 40px;
  text-align: center;
}

.acknowledgments h3 {
  color: #1e293b;
  font-size: 1.8rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.acknowledgments h3:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #3b82f6;
  margin: 10px auto 0;
  border-radius: 3px;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.tech-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border-color: #cbd5e1;
}

.tech-card img {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  display: block;
  transition: transform 0.3s ease;
}

.tech-card:hover img {
  transform: scale(1.1) rotate(5deg);
}

.tech-card a {
  text-decoration: none;
  color: #1e293b;
}

.tech-card span {
  display: block;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.tech-card p {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 社区与支持 */
.community-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 50px 0;
}

.community-card, .contributors-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.community-card:hover, .contributors-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.community-card h3, .contributors-card h3 {
  color: #1e293b;
  margin-top: 0;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.community-card p, .contributors-card p {
  color: #64748b;
  margin: 10px 0 20px;
}

.contact-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.contact-button:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.contact-button img {
  width: 18px;
  height: 18px;
}

.contributors-grid {
  margin-top: 20px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.contributors-grid img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 支持我们 */
.support-section {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 40px 20px;
  margin: 60px 0 0;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.support-content {
  max-width: 700px;
  margin: 0 auto;
}

.support-content h3 {
  color: #1e293b;
  font-size: 1.8rem;
  margin: 0 0 15px;
}

.support-content p {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0 0 25px;
  line-height: 1.6;
}

.support-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.star-button, .fork-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.star-button {
  background: #3b82f6;
  color: white;
}

.star-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.fork-button {
  background: white;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.fork-button:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.star-button img, .fork-button img {
  width: 18px;
  height: 18px;
}

.star-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-left: 4px;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .community-section {
    grid-template-columns: 1fr;
  }
  
  .tech-stack {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

@media (max-width: 768px) {
  .license-card {
    padding: 25px 20px;
  }
  
  .tech-stack {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 15px;
  }
  
  .support-content h3 {
    font-size: 1.5rem;
  }
  
  .support-content p {
    font-size: 1rem;
  }
  
  .star-button, .fork-button {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .tech-stack {
    grid-template-columns: 1fr 1fr;
  }
  
  .support-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .star-button, .fork-button {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}
</style>

<script>
// 动态获取 star 数量
fetch('https://api.github.com/repos/937bb/937bbAPI_web')
  .then(response => response.json())
  .then(data => {
    const starCount = data.stargazers_count || 0;
    const starCountElement = document.querySelector('.star-count');
    if (starCountElement) {
      starCountElement.textContent = starCount.toLocaleString();
    }
  })
  .catch(error => {
    console.error('Error fetching GitHub stars:', error);
  });
</script>

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
