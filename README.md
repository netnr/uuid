# uuid
A decentralized favorites and bookmarks based on Git hosting  
一个基于 Git 托管去中心化的收藏夹，书签

> 为缩减经费，uuid.fun 于 2028-11-09 8:00 到期，计划不再续费  
> 启用子域名，https://uu.zme.ink

### Demo 示例
<https://uu.zme.ink>  
<https://uu.zme.ink/netnr>

### Usage 使用
Fork 项目，从浏览器导出书签 HTML，再转换书签为 Markdown，保存到 `libs/*.md`  
Fork project, export bookmark HTML from browser, convert bookmark to Markdown, save to `libs/*.md`

私有化部署 `dist` 分支，再把 `libs` 文件夹拷贝到 `dist`，更新索引文件 `libs/index.json`，再启用 本地 Local  
Privately deploy the `dist` branch, then copy the `libs` folder to `dist`, update the index file `libs/index.json`, and then enable the local Local

### Visit 访问
https://uu.zme.ink/{name} `{name}` is your account, default `netnr`  
https://uu.zme.ink/{name}/{repos} `{repos}` repository, default `uuid`  
https://uu.zme.ink#{name}/{repos} offline