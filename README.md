# uuid
A decentralized favorites and bookmarks based on Git hosting  
一个基于 Git 托管去中心化的收藏夹，书签

### Demo 示例
<https://uuid.fun>  
<https://uuid.fun/netnr>

### Usage 使用
Fork 项目，从浏览器导出书签 HTML，再转换书签为 Markdown，保存到 `libs/*.md`  
Fork project, export bookmark HTML from browser, convert bookmark to Markdown, save to `libs/*.md`

私有化部署 `dist`，再把 `libs` 文件夹拷贝到 `dist`，更新索引文件 `libs/index.json`，再启用 本地 Local  
Deploy `dist` privately, copy the `libs` folder to `dist`, update the index file `libs/index.json`, and enable Local

### Visit 访问
https://uuid.fun/{name} `{name}` is your account, default `netnr`  
https://uuid.fun/{name}/{repos} `{repos}` repository, default `uuid`  
https://uuid.fun#{name}/{repos} offline