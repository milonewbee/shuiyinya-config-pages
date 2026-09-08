# 配置站静态图

放在这里的图会由 Worker 代理出去：

```
https://analytics.milodev.cn/config/assets/<文件名>
```

**为什么要过一层 Worker**：用户的手机是自己去拉这张图的，而
`raw.githubusercontent.com` 在国内很不稳定 —— Worker 在 Cloudflare 上取它没问题，
但直接把 `qrUrl` 指向 GitHub，大部分用户会看不到图。

## 换微信群二维码

微信群二维码 **7 天过期，且没有永久码**。到期后换法：

1. 在这个目录里替换同名文件（GitHub 网页版在手机上就能传）
2. 不用改 `version.json`，不用发版
3. 边缘缓存 5 分钟；想立刻生效就换个文件名，同时改 `version.json` 里的 `qrUrl`

同时建议在 `version.json` 的那个群里填上 `qrExpiresAt`（ISO 时间），
到点客户端会自己把二维码收起来 —— **过期的微信群码照样能正常显示**，
不设这个字段，用户会对着一张看起来好好的死码扫半天。

## 限制（`src/configAssetProxy.ts` 里钉死的）

- 文件名只能是 `[a-z0-9][a-z0-9_-]{0,48}.(png|jpg|jpeg|webp)`
- 单张不超过 512KB
- 只回图片类型，不透传上游的 content-type
