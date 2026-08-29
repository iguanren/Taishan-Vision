# 泰山识图 Taishan Vision v1.0

让 DeepSeek Harness(DSH)的纯文本模型也能看懂图片:**智谱 GLM 免费视觉模型识图 + 当前模型推理**,无需主模型支持图像输入。

> 由开源插件「鲸晴 JingQing」魔改优化而来。推荐识别路线:智谱 GLM 免费模型(glm-4.6v-flash / glm-4.1v-thinking-flash,均免费,支持视觉)。

## ✨ 功能

- **自动识图**:用户发送图片时,自动注入识图指令,调用视觉模型返回中文描述
- **智能路由**:默认 `glm-4.6v-flash` → `glm-4.1v-thinking-flash`,失败自动降级;面板可拖拽调整顺序
- **零配置恢复**:zhipu-glm provider 声明(api/baseURL/`input:[text, image]`/contextWindow/maxTokens)已内置,配置缺失时自动补写
- **面板管理**:设置 → 泰山识图:状态总览、模型启停、路由排序、识图参数、日志查看、**API Key 直接粘贴配置**
- **夜间模式适配**:深色主题下全部组件清晰可辨
- **注入防护**:视觉模型返回内容带围栏声明,防图片内指令注入

## 📦 安装

### 方式一:GitHub 一键安装(推荐)

```bash
dsh plugin --profile web add github:iguanren/taishan-vision#v1.0.0
```

DSH 会自动安装并把插件加入 profile 组合层,**重启 DSH 后生效**(无需手动改任何配置)。不想锁定版本可去掉 `#v1.0.0` 安装最新。

> 如安装时报 pnpm 构建拦截提示,确认本插件无构建脚本时按提示放行即可(最新版通常无此问题)。

### 方式二:手动安装

1. **放包**:把 `taishan-vision` 文件夹整个复制到 DSH profile 的 node_modules 目录
   - Web 版:`~/.dsh/profiles/node_modules/`
2. **挂载**:在 web profile 的补丁文件 `~/.dsh/profiles/web/cordis.patch.yml` 中追加(若已存在旧版 jingqing 条目请替换):

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
2. DSH 设置 → **泰山识图** → 「智谱 API Key」卡片 → 粘贴 Key → 点「保存 Key」
3. 状态变为「已配置 ✅」即完成,立即生效,重启不丢

**方式 B——手工编辑凭据文件**:

在 `~/.dsh/.credentials.yaml` 中加一行(文件不存在会自动创建):

```yaml
ZHIPU_GLM_API_KEY: <你的key>
```

> Key 只存于 `~/.dsh/.credentials.yaml`,不写入设置文件、不进日志、面板永不回显明文。清除:面板点「清除」或删除该行。

## 🛠 使用

发送带图片的消息,模型会自动调用识图工具;也可让模型直接描述图片。诊断:让模型调用 `taishan_diag` 工具查看扫描快照、凭据状态、路由配置。

## ⚙️ 默认推荐模型(免费)

| 模型 | 上下文 | 最大输出 | 费用 |
|---|---|---|---|
| glm-4.6v-flash | 128K | 32K | 免费 |
| glm-4.1v-thinking-flash | 64K | 16K | 免费 |

## 🧹 卸载

- **GitHub 安装**:`dsh plugin --profile web remove taishan-vision`,重启 DSH;
- **手动安装**:删除 `~/.dsh/profiles/node_modules/taishan-vision` 目录,并把 `cordis.patch.yml` 中对应 insert 条目移除,重启 DSH。

---

MIT License