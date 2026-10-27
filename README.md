# UU

**UU · 托管的收藏夹/书签** —— 直接读取 Markdown 里的书签，托管在任意 Git 仓库或静态站点。

Demo: <https://uu.netnr.eu.org>

## 使用

1. Fork 本仓库，编辑或新增 `ClientWeb/ClientUU/wwwroot/libs/*.md`
2. 构建后部署

`libs/` 下的 md 在构建时全量打进包里，不需要索引文件；卡片按文件名排序，标题就是文件名去掉 `.md`。

Markdown 约定：

```md
### 分类名
- [名称](https://example.com)
- [名称](https://example.com "备注")
```

浏览器导出的书签 HTML 可以用页面右上角「更多 → 转换书签」转成上面的格式。

## 书签文件

每个 md 里的 `# 标题`（可选）作文件标题，`### 分类` 分组，每组下面写链接；链接只接受 `http/https/mailto/tel`。

## 开发

```bash
npm install
npm run dev.uu        # 开发服务 :6065
npm run build.uu      # 产物 → ClientWeb/ClientUU/dist
npm run push.uu       # 构建并推送到 uuid 仓库
```

部署目标是 Cloudflare Workers 静态资源（`wrangler.uu.jsonc`，SPA 回退）。

## 说明

- 只渲染 Markdown 里的链接，不加载 GitHub API，不需要 Token，也没有线上/本地模式切换
- 页面注册 Service Worker，首次加载后可离线打开
