# Cyber Homepage — 科技感个人主页

一个赛博朋克风格的个人仪表盘，拥有粒子动画背景、数字时钟、多引擎搜索、快捷链接、系统终端、每日语录和快捷便签。

## ✨ 功能特性

- **Canvas 粒子背景** — 交互式粒子场，鼠标悬浮时粒子会自动避让，60fps 流畅运行
- **数字时钟** — 大尺寸发光时钟，根据当前时间段自动显示问候语
- **多引擎搜索** — 支持 Google / Bing / 百度 / DuckDuckGo 一键切换
- **快捷链接** — 可自定义的链接网格，快速访问常用网站
- **系统终端** — 实时展示当前设备的系统信息
- **每日语录** — 打字机效果展示每日灵感语录
- **快捷便签** — 基于 localStorage 的本地便签，支持新增和删除
- **专注模式** — 点击右上角太阳图标进入纯净时钟+粒子壁纸模式，适合直播背景
- **全响应式** — PC / 平板 / 手机自适应布局
- **底部数据流** — 滚动系统状态栏

## 🚀 部署方式

### 方式一：Docker 部署（推荐）

**前提条件：** 已安装 Docker 和 Docker Compose

```bash
# 1. 解压或进入项目目录
cd cyber-homepage

# 2. 构建镜像并启动容器
docker compose up -d

# 3. 打开浏览器访问
# http://localhost:8080
```

**常用命令：**

```bash
# 查看运行状态
docker compose ps

# 查看日志
docker compose logs -f

# 停止服务
docker compose down

# 重新构建并启动（修改代码后）
docker compose up -d --build
```

**自定义端口：** 修改 `docker-compose.yml` 中的 `ports` 配置，例如改为 `"3000:3000"` 即可通过 `http://localhost:3000` 访问。

---

### 方式二：GitHub Pages 部署

```bash
# 1. 创建 GitHub 仓库并推送代码
git init
git add .
git commit -m "init: cyber homepage"
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

```
# 2. 在 GitHub 仓库中操作：
#    Settings → Pages → Source 选 "Deploy from a branch"
#    Branch 选 "main"，文件夹选 "/ (root)"
#    点击 Save
```

部署成功后访问：`https://你的用户名.github.io/仓库名/`

---

### 方式三：本地直接打开

无需任何构建工具，直接双击 `index.html` 用浏览器打开即可使用。

也可以用任意静态文件服务器：

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

## 🎨 自定义配置

### 修改快捷链接

编辑 `index.html` 中的 `#linksGrid` 区域：

```html
<a href="https://你的链接" target="_blank" class="link-item" data-color="#颜色值">
  <div class="link-icon">图标符号</div>
  <span>显示名称</span>
</a>
```

### 修改主题颜色

编辑 `css/style.css` 顶部的 CSS 变量：

```css
:root {
  --cyan: #00e5ff;       /* 主色调：青色 */
  --purple: #8b5cf6;     /* 辅助色：紫色 */
  --bg-deep: #06060f;    /* 背景色：深空黑 */
}
```

### 修改每日语录

编辑 `js/app.js` 中的 `quotes` 数组，添加或替换你喜欢的语录。

## 📁 项目结构

```
cyber-homepage/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── app.js          # 交互逻辑
├── Dockerfile          # Docker 镜像构建文件
├── docker-compose.yml  # Docker Compose 编排文件
└── README.md           # 说明文档
```

## 📋 技术栈

- 纯 HTML5 + CSS3 + JavaScript，零依赖
- Canvas 2D API 粒子系统
- CSS Grid + Flexbox 响应式布局
- CSS backdrop-filter 毛玻璃效果
- Google Fonts: JetBrains Mono + Noto Sans SC

## 📄 许可证

MIT