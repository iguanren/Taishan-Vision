# 泰山识图 Taishan Vision v3.0.0

<p align="center">
  <img src="banner.png" style="width:100%; height:auto; border-radius:16px;" alt="泰山识图" />
</p>

让 DeepSeek Harness(DSH)的纯文本模型也能看图:**智谱 GLM 免费视觉模型识图 + 当前模型推理**,无需主模型支持图像输入。

![version](https://img.shields.io/badge/version-v3.0.0-2563EB)
![license](https://img.shields.io/badge/license-MIT-green)

---

## ✨ 功能

- **免费识图**:`glm-4.6v-flash` / `glm-4.1v-thinking-flash`,完全免费,中文识别质量好,失败自动降级
- **凭据感知**:没配 API Key 的模型默认关闭,配了才启用,不会出现反复失败的调用
- **自动补写**:新机没配置智谱时自动添加 provider;填了 GLM Key 后立即生效,无需重启
- **面板直配**:在「设置 → 泰山识图 → API Key」粘贴 Key 即保存,不回显明文、重启不丢
- **注入防护**:视觉模型返回内容带围栏声明,防图片内指令注入
- **诊断工具**:`taishan_diag` 输出凭据/路由/包装全量状态
- **手动检查更新**:仅用户主动点击「检查更新」时才会联网检测版本,启动不再自动检查

## 📦 安装

```bash
dsh plugin --profile web add github:iguanren/taishan-vision#v3.0.0
```

> 环境要求:`dsh plugin` 是 pnpm 转发层,需要 PATH 中有 pnpm(`npm i -g pnpm`);GitHub 安装还需要 git。

**升级**:

```bash
dsh plugin --profile web update taishan-vision          # 升级到最新
dsh plugin --profile web add github:iguanren/taishan-vision#v3.0.0  # 锁指定版本
```

**离线安装**(`taishan-vision-3.0.0.tgz`):

```bash
dsh plugin --profile web add file:taishan-vision-2.4.0.tgz
```

**手动安装**:把 `taishan-vision` 文件夹复制到 `~/.dsh/profiles/web/node_modules/`,并在 `~/.dsh/profiles/web/cordis.patch.yml` 追加:

```yaml
- insert:
    - id: taishan-vision
      name: taishan-vision
```

重启 DSH 生效。

## 🔑 配置 API Key

在 DSH 设置 → **泰山识图** → 「API Key」卡片粘贴智谱 Key(`ZHIPU_GLM_API_KEY`),点保存即生效。

或手动编辑 `~/.dsh/.credentials.yaml`:

```yaml
ZHIPU_GLM_API_KEY: <你的key>
```

Key 只存于凭据文件,不进日志、面板永不回显。

## 🛠 使用

发送带图片的消息,插件自动注入识图指令,模型调用 `taishan_describe_image` 工具(参数 `image_ref` 传图片附件 ID)识别;也可直接让模型"描述这张图"。

视觉模型按性价比自动排序(免费 GLM 最优先),失败自动降级;可在「设置 → 泰山识图 → 模型检测结果」手动启停、拖动排序。

## ⚙️ 默认推荐模型(免费)

| 模型 | 上下文 | 最大输出 |
|---|---|---|
| glm-4.6v-flash | 128K | 32K |
| glm-4.1v-thinking-flash | 64K | 16K |

## 🔧 常见问题

- **pnpm 找不到**:`npm i -g pnpm` 后重启终端
- **Git 安装失败**:`winget install Git.Git` 或从 <https://git-scm.com> 下载
- **填了 Key 没模型**:确保 v2.2.0+,面板点「重新扫描」
- **找不到附件**:升级到 **v2.2.1**+(已兼容新版 DSH session API)
- **识图超时**:在面板调大超时(默认 20s)与输出上限

## 🧹 卸载

```bash
dsh plugin --profile web remove taishan-vision
```

手动安装则删除 `~/.dsh/profiles/web/node_modules/taishan-vision` 并从 `cordis.patch.yml` 移除对应条目。

## 💬 反馈

报告 Bug 时请附上:DSH 版本(`dsh --version`)、`taishan_diag` 输出、复现步骤。

- 🐛 [Bug 报告](https://github.com/iguanren/taishan-vision/issues/new/choose)
- 💡 [功能建议](https://github.com/iguanren/taishan-vision/issues/new/choose)
- 🗣 [讨论交流](https://github.com/iguanren/taishan-vision/discussions)

## 📌 更新记录

- **v3.0.0**:启动日志全面精简——移除所有启动时 INFO 日志,仅在 warn/error 时输出;优化扫描与 HTTP API 注册并行执行,面板加载更快;版本升级为 3.0.0
- **v2.5.0**:优化启动速度——扫描与HTTP API注册并行执行,面板加载更快
- **v2.4.0**:移除启动自动检查更新——现在仅用户点击面板「检查更新」时才联网检测版本,启动更轻快
- **v2.3.0**:凭据感知路由改进——未配置 API Key 的模型默认关闭(`configured===true` 才启用);扫描完成后自动检测凭据变化并启停路由;面板新增「检查更新」功能;适配 DSH **0.1.5-rc.1**。
- **v2.2.1**:修复「找不到附件」——兼容 dsh session 快照 API + pre-step 步骤级附件缓存兜底。
- **v2.2.0**:修复「填了 GLM Key 却看不到模型」——自动补写触发条件放宽为「无可用视觉模型 或 已配 GLM Key」;填 Key 即出模型。
- **v2.1.0**:修复新机器开箱体验——补写后立即可重扫;引导文案指向面板直配。
- **v2.0**:静态版重构,内置智谱 GLM 免费模型、面板直配、诊断工具。

---

MIT License
