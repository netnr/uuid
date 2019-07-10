# uuid
一个基于Git托管去中心化的收藏夹，书签，Public collection

### [更新日志](CHANGELOG.md)

### 使用
- Fork仓库（或者自己创建仓库）
- 修改 `libs` 目录下的 `md`文件
    - 一行对应一个链接，包含链接、文本、图标
    - 图标默认取链接主域名+favicon.ico，或在文本后面以空格+`http`开头的自定义图标地址
- 查看（GitHub）
    - <https://uuid.fun/{name}>，`{name}` 是你的账号，默认`netnr`
    - <https://uuid.fun/{name}/{repos}/{libs}>，`{repos}` 仓库，默认`uuid`；`{libs}`根文件夹，默认`libs`
    - 如：
    - <https://uuid.fun>
    - <https://uuid.fun/netnr>
    - <https://uuid.fun/netnr/uuid>
    - <https://uuid.fun/netnr/uuid/libs>
- 查看（Gitee）
    - <https://gitee.uuid.fun>
    - <https://gitee.uuid.fun/netnr>
    - <https://gitee.uuid.fun/{name}/{repos}/{libs}>

### 说明
- 可查看全局变量更多信息：`uu`
- 以`localStorage`作为本地存储，30分钟有效期
- 域名`uuid.fun`已购买10年，只要github+cloudflare还在

### 收集
- 如有更多的想法和建议，记得提交`Issue`

### 源码
- <https://gitee.com/netnr/uuid>
- <https://github.com/netnr/uuid>