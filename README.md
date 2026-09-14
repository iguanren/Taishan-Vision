# 泰山识图 v4.0

<p align="center">
  <img src="banner.png" style="width:100%; height:auto; border-radius:16px;" alt="泰山识图" />
</p>

让 DeepSeek Harness(DSH)的纯文本模型也能看图:**智谱 GLM 免费视觉模型识图 + 当前模型推理**,无需主模型支持图像输入。

![version](https://img.shields.io/badge/version-v4.0-2563EB)
![license](https://img.shields.io/badge/license-MIT-green)

---

## ✨ 功能

- **免费识图**:`glm-4.6v-flash` / `glm-4.1v-thinking-flash`,完全免费,中文识别质量好,失败自动降级
- **凭据感知**:没配 API Key 的模型默认关闭,配了才启用;无 Key 时面板/路由自动隐藏对应模型,不会反复失败
- **自动补写**:新机没配置智谱时自动添加 provider;填了 GLM Key 后立即生效,无需重启
- **面板直配**:在「设置 → 泰山识图」粘贴智谱 Key 即保存,不回显明文、重启不丢
- **注入防护**:视觉模型返回内容带围栏声明,防图片内指令注入
- **诊断工具**:`taishan_diag` 输出凭据/路由/包装全量状态
- **手动检查更新**:仅用户主动点击「检查更新」时联网检测版本,启动不自动检查
- **面板精简**(v4):状态总览与 API Key 合并为一张卡;模型行支持拖动调序;未配置 Key 时不再显示「自动识图」标签

## 📦 安装

```bash
dsh plugin --profile web add github:iguanren/taishan-vision#v4.0
```

> 环境要求:`dsh plugin` 是 pnpm 转发层,需要 PATH 中有 pnpm(`npm i -g pnpm`);GitHub 安装还需要 git。

**升级**:

```bash
dsh plugin --profile web update taishan-vision
```

**离线安装**(`taishan-vision-4.0.tgz`):

```bash
dsh plugin --profile web add file:taishan-vision-4.0.tgz
```

**手动安装**:把 `taishan-vision` 文件夹复制到 `~/.dsh/profiles/web/node_modules/`,并在 `~/.dsh/profiles/web/cordis.patch.yml` 追加:

```yaml
- insert:
    - id: taishan-vision
      name: taishan-vision
```

重启 DSH 生效。

## 🔑 配置 API Key

在 DSH 设置 → **泰山识图** 粘贴智谱 Key(`ZHIPU_GLM_API_KEY`),保存即生效。

或手动编辑 `~/.dsh/.credentials.yaml`:

```yaml
ZHIPU_GLM_API_KEY: <你的key>
```

Key 只存于凭据文件,不进日志、面板永不回显。

## 🛠 使用

发送带图片的消息,插件自动注入识图指令,模型调用 `taishan_describe_image` 工具(参数 `image_ref` 传图片附件 ID)识别;也可直接让模型"描述这张图"。

视觉模型可在「设置 → 泰山识图 → 模型检测」手动启停、拖动排序(前一个失败自动尝试下一个)。

## ⚙️ 默认推荐模型(免费)

| 模型 | 上下文 | 最大输出 |
|---|---|---|
| glm-4.6v-flash | 128K | 32K |
| glm-4.1v-thinking-flash | 64K | 16K |

## 🔧 常见问题

- **pnpm 找不到**:`npm i -g pnpm` 后重启终端
- **Git 安装失败**:`winget install Git.Git` 或从 <https://git-scm.com> 下载
- **填了 Key 没模型**:面板点「重新扫描」
- **识图超时**:默认 20s,可在「运行日志」查看具体失败原因

## 🧹 卸载

```bash
dsh plugin --profile web remove taishan-vision
```

手动安装则删除 `~/.dsh/profiles/web/node_modules/taishan-vision` 并从 `cordis.patch.yml` 移除对应条目。

## 💬 反馈

报告 Bug 时请附上:DSH 版本(`dsh --version`)、`taishan_diag` 输出、复现步骤。

- 🐛 [Bug 报告](https://github.com/iguanren/taishan-vision/issues/new/choose)
- 💡 [功能建议](https://github.com/iguanren/taishan-vision/issues/new/choose)

## 📌 更新记录

- **v4.0**:面板精简重构——状态总览与 API Key 合并;模型行拖动调序;无 Key 隐藏模型与「自动识图」标签;内置 provider 凭据探测;闪动修复;死代码清理
- **v3.0.0**:启动日志全面精简,扫描与 HTTP API 注册并行执行
- **v2.5.0**:启动速度优化
- **v2.4.0**:移除启动自动检查更新
- **v2.3.0**:凭据感知路由改进,面板新增「检查更新」
- **v2.2.1**:兼容新版 DSH session 快照 API + 附件缓存兜底
- **v2.2.0**:修复「填了 GLM Key 却看不到模型」
- **v2.1.0**:新机开箱体验优化
- **v2.0**:静态版重构,内置智谱 GLM 免费模型

---

MIT License
