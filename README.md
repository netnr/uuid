# uuid
基于 GitHub 实现的收藏夹

### [更新日志](CHANGELOG)

### 使用
- Fork项目
- 修改 `libs` 目录下的 `md`文件
- 查看
    - <https://uuid.fun#{name}>，`{name}` 是你的账号，默认`netnr`
    - <https://uuid.fun#{name}/{reps}>，`{reps}` 仓库名称，默认`uuid`
    - <https://uuid.fun#{name}/{reps}/{libs}>，`{libs}` 收藏夹名称，默认`libs`

### 说明
- 可查看全局变量更多信息：`uu`
- 由于GitHub的API有速率限制，以`localStorage`作为本地存储，30分钟有效期，手动执行 `uu.cacheClear()` 方法可清理本地存储
- 域名`uuid.fun`已购买10年，放心使用（只要github+cloudflare还在）

### 收集
- 如有更多的想法和建议，记得提交`Issue`