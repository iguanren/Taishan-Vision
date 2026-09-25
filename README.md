# 泰山识图 v5.0

<p align="center">
  <img src="banner.png" style="width:100%; height:auto; border-radius:16px;" alt="泰山识图" />
</p>

让 DeepSeek Harness(DSH)的纯文本模型也能看图:**智谱 GLM 免费视觉模型识图 + 当前模型推理**,无需主模型支持图像输入。

![version](https://img.shields.io/badge/version-v5.0-2563EB)
![license](https://img.shields.io/badge/license-MIT-green)

---

## ✨ 功能

- **免费识图**:`glm-4.6v-flash` / `glm-4.1v-thinking-flash` 两个智谱 GLM 视觉模型,完全免费,中文识别质量好，支持自动降级
- **原生卡片面板(v5 新)**:面板从左侧一级栏挪进 DSH「设置 → 插件 → 插件配置」卡片区,与 DSH 内置卡片(终端 / Agent 循环 / 网页搜索)同款样式,可折叠
- **一键启停(v5 新)**:卡片内「启用 / 停用」按钮切换整个自动识图流程,不用再翻开关
- **API Key 直配**:卡片里粘贴智谱 Key 即保存,不回显明文、重启不丢;「保存 / 清除」与输入框同行
- **模型勾选 + 拖拽调序(v5 新)**:可用视觉模型列表用勾选框控制启停,⠿ 拖动手柄调整调用顺序
- **凭据感知**:没配 API Key 的模型默认关闭,配了才启用;无 Key 时面板/路由自动隐藏对应模型,不会反复失败
- **自动补写**:新机没配置智谱时自动补写 provider 声明;填了 GLM Key 后立即生效,无需重启 DSH
- **注入防护**:视觉模型返回内容带围栏声明,防图片内指令注入
- **诊断工具**:`taishan_diag` 输出凭据/路由/包装全量状态,排障一键查
- **手动检查更新**:折叠头「检查更新」按钮主动联网检测,启动不自动检查

<p align="center">
  <img src="https://community.codewave.163.com:443/upload/app/afaec238-82f5-4996-8fdd-0aae42f393de/msedge_otGQ8CI3Pp_afaec238-82f5-4996-8fdd-0aae42f393de_efp2CBT4_20260925123119018.png" style="width:100%; height:auto; border-radius:16px;" alt="插件配置面板" />
</p>

## 📦 安装

前置:PATH 里有 pnpm(`npm i -g pnpm`);GitHub 安装还需要 git。

```bash
dsh plugin --profile web add github:iguanren/taishan-vision#v5.0
```

**升级**:

```bash
dsh plugin --profile web update taishan-vision
```

**离线安装**(`taishan-vision-5.0.tgz`):

```bash
dsh plugin --profile web add file:taishan-vision-5.0.tgz
```

**手动安装**:把 `taishan-vision` 文件夹复制到 `~/.dsh/profiles/web/node_modules/`,并在 `~/.dsh/profiles/web/cordis.patch.yml` 追加:

```yaml
- insert:
    - id: taishan-vision
      name: taishan-vision
```

重启 DSH 生效。

## 🔑 配置 API Key

方式一(推荐):打开「设置 → 插件 → 插件配置」,展开 **泰山识图** 卡片,在「配置智谱 API KEY」行粘贴 Key,点「保存」。

方式二:手动编辑 `~/.dsh/.credentials.yaml`:

```yaml
ZHIPU_GLM_API_KEY: <你的key>
```

申请 Key:打开 https://open.bigmodel.cn 注册登录并申请 API KEY,粘贴上方保存即可,立即生效,无需重启。

Key 只存于凭据文件,不进日志、面板永不回显。

## 🛠 使用

1. 发送带图片的消息,插件自动注入识图指令
2. 当前模型(纯文本也能看)调用 `taishan_describe_image` 工具(参数 `image_ref` 传图片附件 ID)拿到图片描述,再基于描述回答你
3. 也可直接让模型"描述这张图"

模型管理:「设置 → 插件 → 插件配置 → 泰山识图」卡片内:

- **启用 / 停用** 按钮:整个识图自动流程的总开关
- **可用视觉模型** 区:勾选框控制单个模型启停,⠿ 拖动调整调用顺序(前一个失败自动尝试下一个)
- **重新扫描**:改了模型配置或换了 Key 后点一下刷新列表

## ⚙️ 默认推荐模型(免费)

| 模型 | 上下文 | 最大输出 |
|---|---|---|
| glm-4.6v-flash | 128K | 32K |
| glm-4.1v-thinking-flash | 64K | 16K |

## 🔧 常见问题

- **pnpm 找不到**:`npm i -g pnpm` 后重启终端
- **Git 安装失败**:`winget install Git.Git` 或从 <https://git-scm.com> 下载
- **卡片没出现在「插件配置」**:重启 DSH + 浏览器强刷(Ctrl+Shift+R);仍无则在 DSH 终端找 `[泰山识图]` 日志,或让模型调 `taishan_diag`
- **填了 Key 没模型**:卡片点「重新扫描」
- **识图失败**:DSH 终端看 `[泰山识图]` 日志,或让模型调用 `taishan_diag` 输出全量状态

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

- **v5.0**:面板大重构——从左侧一级栏迁入「插件配置」卡片区(原生可折叠卡片,与 DSH 内置卡片同风格);启停改为「启用/停用」按钮;API Key 行标签+输入框+保存/清除同行;模型行勾选框+⠿拖拽调序;修复宿主 ESM 升级端点 require bug、客户端端点路径拼接 bug;全面清理死代码;tgz 加 files 白名单瘦身
- **v4.0**:面板精简重构——状态总览与 API Key 合并;模型行拖动调序;无 Key 隐藏模型与「自动识图」标签;内置 provider 凭据探测;闪动修复;死代码清理

---

MIT License
