# uuid
一个基于 Git 托管去中心化的收藏夹，书签

### Demo
https://uuid.fun  
https://uuid.netnr.eu.org

### 使用
- Fork 仓库（或者自己创建仓库）
- 修改 `libs` 目录下的 `md` 文件
    - 一行对应一个链接，包含链接、文本
- 查看（GitHub）
    - <https://uuid.fun/{name}>，`{name}` 是你的账号，默认 `netnr`
    - <https://uuid.fun/{name}/{repos}/{libs}>，`{repos}` 仓库，默认 `uuid`；`{libs}` 根文件夹，默认 `libs`
    - 如：
    - <https://uuid.fun>
    - <https://uuid.fun/netnr>
    - <https://uuid.fun/netnr/uuid>
    - <https://uuid.fun/netnr/uuid/libs>

### 说明
- 可查看全局变量更多信息：`uu`
- 以 `localStorage` 作为本地存储

### 源码
- <https://github.com/netnr/uuid>