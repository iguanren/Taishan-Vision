# 泰山识图 Taishan Vision v2.2.1

<p align="center">
  <img src="banner.png" style="width:100%; height:auto; border-radius:16px;" alt="泰山识图" />
</p>

![version](https://img.shields.io/badge/version-v2.2.1-2563EB)
![license](https://img.shields.io/badge/license-MIT-green)
![models](https://img.shields.io/badge/识别模型-GLM%20免费-16A34A)
![install](https://img.shields.io/badge/install-dsh%20plugin-8B5CF6)

让 DeepSeek Harness(DSH)的纯文本模型也能看懂图片:**智谱 GLM 免费视觉模型识图 + 当前模型推理**,无需主模型支持图像输入。

> 由开源插件「鲸晴 JingQing」深度魔改而来,针对可用性、通用性与体验做了系统性重构(见下方对比表)。

## ✨ 功能亮点

- **免费识图**:默认 `glm-4.6v-flash` → `glm-4.1v-thinking-flash`,均**完全免费**,失败自动降级,中文识别质量好
- **任何视觉模型都可用**:插件扫描 DSH 中所有支持图像输入的模型,不绑定任何厂商;自带模型用户开箱即用
- **凭据感知路由**:未配置 API Key 的模型默认停用,自动优先使用已配置的模型,不会出现反复失败的调用
- **API Key 面板直配**:设置页内粘贴即保存,写入本机凭据文件,不回显明文、重启不丢
- **零配置恢复**:zhipu-glm provider 声明(api/baseURL/`input:[text, image]`/contextWindow/maxTokens)完全内置;**没有可用视觉模型**或**你已配置 GLM API Key** 时自动补写,填 Key 即出模型,无需手工建 provider
- **适配新版 DSH(0.1.2-rc.1)**:核对 llm-pi-ai/settings/credentials/`agent/pre-step` 接口;附件解析兼容新版 `dsh-session` 快照 API,并带步骤级缓存兜底
- **原生风格面板**:全部组件跟随 DSH 主题,深浅色模式清晰可辨
- **注入防护**:视觉模型返回内容带围栏声明,防图片内指令注入

## 🏆 对比「鲸晴 JingQing」的改进

| 维度 | 鲸晴 JingQing | 泰山识图 Taishan Vision | 改进 |
|---|---|---|---|
| 默认模型 | 小米 MiMo(约 $0.14/$0.28 每百万 token) | **智谱 GLM 免费**(glm-4.6v-flash / glm-4.1v-thinking-flash,$0) | ✅ **免费,识别成本归零** |
| 模型规格内置 | 无 | 上下文/最大输出/成本表/接口地址全部内置 | ✅ 无需记忆模型参数 |
| 多模型支持 | 内置推荐仅小米,引导文只讲小米 | **扫描任意 provider 的视觉模型**,引导文通用 | ✅ 自带模型用户开箱即用 |
| 凭据配置 | 手写 `~/.dsh/.credentials.yaml` | **面板直接粘贴保存**(密码框 + 显隐) | ✅ 零门槛 |
| 凭据感知启停 | 无 key 的模型也默认启用,先失败再降级 | **无 key 默认停用**,有 key 自动启用 | ✅ 无无效调用 |
| Provider 声明恢复 | 无 | 内置 zhipu-glm 完整声明,缺失时**自动补写** | ✅ 配置重置不慌 |
| API 密度 | 面板较松散、调试角标 | 头部操作按钮化、三栏/参数并排布局、高密度日志 | ✅ 空间利用率高 |
| 夜间模式 | 部分硬编码浅色,深色下刺眼 | **全量主题变量**,深浅模式统一 | ✅ 夜间不辣眼 |
| 深色下按钮/开关 | 白底白字或白块 | 品牌蓝渐变 / 双主题覆盖 | ✅ 可见性修复 |
| 界面风格 | 自定义大标题 + 渐变装饰 | **原生 DSH 风格**,与官方设置页一致 | ✅ 融入度高 |
| 引导文案 | 只讲小米 MiMo | 通用化:任意视觉模型 + 智谱快速方案 | ✅ 对新人友好 |
| 诊断能力 | 基础快照 | `taishan_diag` 输出凭据/路由/包装全量状态 | ✅ 排障更快 |
| 安全性 | — | 凭据端点 env 白名单、Origin 校验、密钥永不回读 | ✅ 更稳 |

## 📦 安装

> **环境要求**:`dsh plugin` 是 pnpm 的转发层,需要 PATH 中有 pnpm(`npm i -g pnpm` 即可);GitHub 安装还需要 git(用于 clone 仓库)。

### 方式一:GitHub 一键安装(推荐)

```bash
dsh plugin --profile web add github:iguanren/taishan-vision#v2.2.1
```

DSH 会自动安装并把插件加入 profile 组合层,**重启 DSH 后生效**(无需手动改任何配置)。不想锁定版本可去掉 `#v2.2.1` 安装最新。

**升级到新版本**:

```bash
dsh plugin --profile web update taishan-vision      # 跟随仓库最新提交
dsh plugin --profile web add github:iguanren/taishan-vision#v2.2.1   # 或锁指定版本重装
```

> 如安装时报 pnpm 构建拦截提示,确认本插件无构建脚本时按提示放行即可(最新版通常无此问题)。

### 方式二:本地打包安装(离线 / 分发)

直接用发布产物 `taishan-vision-2.2.1.tgz`(或先解压 zip):

```bash
dsh plugin --profile web add file:taishan-vision-2.2.1.tgz
```

### 方式三:手动复制

1. **放包**:把 `taishan-vision` 文件夹整个复制到 web profile 的 node_modules:
   - `~/.dsh/profiles/web/node_modules/taishan-vision`
2. **挂载**:在补丁文件 `~/.dsh/profiles/web/cordis.patch.yml` 中追加(若已存在旧版 jingqing 条目请替换):

   ```yaml
   - insert:
       - id: taishan-vision
         name: taishan-vision
   ```

3. **重启 DSH**

## 🔑 配置 API Key(唯一需要手动做的事)

DSH 的凭据是"环境变量引用"机制,插件只认 `ZHIPU_GLM_API_KEY` 这个名字:

**方式 A(推荐)——面板粘贴**:

1. 打开智谱开放平台 <https://open.bigmodel.cn> 注册并创建 API Key(免费额度即可用 GLM 视觉模型)
2. DSH 设置 → **泰山识图** → 「API Key」卡片 → 粘贴 Key → 点「保存」
3. 状态变为「已配置 ✅」即完成,立即生效,重启不丢

**方式 B——手工编辑凭据文件**:

在 `~/.dsh/.credentials.yaml` 中加一行(文件不存在会自动创建):

```yaml
ZHIPU_GLM_API_KEY: <你的key>
```

> Key 只存于 `~/.dsh/.credentials.yaml`,不写入设置文件、不进日志、面板永不回显明文。清除:面板点「清除」或删除该行。

## 🛠 使用

发送带图片的消息,插件检测到当前模型不支持直接看图时会自动注入识图指令,模型会调用 `taishan_describe_image` 工具(参数 `image_ref` 传图片附件 ID)识别图片;也可直接让模型"描述这张图"。

- **路由策略**:视觉模型按性价比自动排序(免费 GLM 最优先),失败自动降级到下一个可用模型;可在「设置 → 泰山识图 → 模型检测结果」手动启停、在「识图路由」拖动排序
- **诊断**:让模型调用 **`taishan_diag`** 工具查看扫描快照、凭据状态、准入包装、路由配置

## ⚙️ 默认推荐模型(免费)

| 模型 | 上下文 | 最大输出 | 费用 |
|---|---|---|---|
| glm-4.6v-flash | 128K | 32K | 免费 |
| glm-4.1v-thinking-flash | 64K | 16K | 免费 |

## 🧹 卸载

- **GitHub 安装**:`dsh plugin --profile web remove taishan-vision`,重启 DSH;
- **手动安装**:删除 `~/.dsh/profiles/web/node_modules/taishan-vision` 目录,并把 `~/.dsh/profiles/web/cordis.patch.yml` 中对应 insert 条目移除,重启 DSH。

## 🔧 常见问题

- **`dsh plugin` 报 pnpm 找不到 / pnpm failed**:`npm i -g pnpm` 后**重启终端**再试(pnpm 加入 PATH 需要新会话);
- **GitHub 安装失败**:需先安装 git 并加入 PATH;本插件无构建脚本,报 allowBuilds 提示可放行或忽略;
- **填了 GLM API Key 却没模型**:至少升级到 **v2.2.0**(配置 Key 会自动补写并重扫,无需重启);若仍无,在面板点「重新扫描」并留意日志;
- **识图工具报"找不到附件"**:升级到 **v2.2.1**(已兼容新版 DSH 的 session 快照 API + 步骤级附件缓存兜底);
- **识图失败/超时**:在「设置 → 泰山识图」调大超时(默认 20s)与输出上限;先跑一次 `taishan_diag` 看凭据与路由状态,再报障。

## 💬 反馈与支持

遇到问题先试一步诊断:在对话中让模型调用 **`taishan_diag`** 工具,会输出模型扫描快照、凭据状态、准入包装、路由配置——把这份输出连同报错信息一起提交,定位会快很多。

- 🐛 **Bug 报告**:点击 [New Issue](https://github.com/iguanren/taishan-vision/issues/new/choose),选择 Bug report 模板(已内置 taishan_diag 输出占位)
- 💡 **功能建议**:点击 [New Issue](https://github.com/iguanren/taishan-vision/issues/new/choose),选择 Feature request 模板
- 🗣 **讨论交流**:访问 [Discussions](https://github.com/iguanren/taishan-vision/discussions)

报告 Bug 时请附上:DSH 版本(`dsh --version`)、操作系统、复现步骤、`taishan_diag` 输出、相关截图。

## 📌 更新记录

- **v2.2.1**:修复「调用识图工具报找不到附件」——dsh 0.1.2-rc.1 起 `dsh-session` 不再暴露 `.events` 数组(改为 `snapshotEvents()` 快照 API),旧解析必然落空;改为「快照 API → 旧版数组 → **pre-step 步骤级附件缓存**」三重兜底,并做 `sha256:` 前缀归一比较;另修推荐模型显示 `provider/undefined`(扫描日志与面板改取 `.id`)。
- **v2.2.0**:修复「填了 GLM API Key 却看不到任何识图模型」——自动补写触发条件从"完全没有视觉模型"放宽为「没有可用视觉模型」或「用户已配置 `ZHIPU_GLM_API_KEY`」(此前只要 DSH 自带任意视觉模型,如 deepseek-v4-flash-vision-exp,zhipu-glm 就永远不会被声明,key 无处生效);填/改/清 Key 后立即补写+重扫,无需重启。
- **v2.1.0**:修复新机器(未配置智谱)开箱体验——自动补写 `zhipu-glm` 提供方声明后**立即重扫**,不再停留于"未检测到识图模型"的引导态;引导文案改为指向「设置 → 泰山识图 → API Key」面板直配;适配 DSH 0.1.2-rc.1(核对 llm-pi-ai/settings/credentials/pre-step 接口)。
- **v2.0.1**:README 修订。
- **v2.0**:静态版重构(鲸晴魔改),内置智谱 GLM 免费视觉模型、凭据感知路由、API Key 面板直配、诊断工具。

---

MIT License
