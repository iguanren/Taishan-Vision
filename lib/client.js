/**
 * 泰山识图 Taishan Vision · 静态 Client 半区(浏览器)
 * ============================================================
 * 标准 dsh 客户端模块格式:window.__ModuleLoader__.load({ id, factory })。
 * factory 内 require('react') 等,exports.apply/inject 提供插件主体。
 * 通过 package.json 的 dsh.client 声明 + exports["./client"] 被发现,
 * 由 dsh-client-modules 扫描加载 —— 重启后 UI 永久存在。
 */
window.__ModuleLoader__.load({
	id: "taishan-vision",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		let React = require("react");


		//#region css
		// ── 「插件配置」卡片壳(与 DSH 内置 PluginCard 同风格:16px 圆角 / hover / 展开切换) ──
		const css = [
			".jq-pcard{border:.5px solid var(--dsw-alias-border-l4,#E5E7EB);background:var(--dsw-alias-bg-layer-3,#FFFFFF);border-radius:16px;list-style:none;transition:border-color .16s,background .16s;margin:0}",
			".jq-pcard:hover{border-color:var(--dsw-alias-label-dimmed,var(--dsw-alias-border-l4,#E5E7EB))}",
			".jq-pcard-open{background:var(--dsw-alias-bg-layer-2,#FFFFFF);border-color:var(--dsw-alias-label-dimmed,var(--dsw-alias-border-l4,#E5E7EB))}",
			".jq-pcard-header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:flex-start;gap:12px;padding:14px 16px;display:flex}",
			".jq-pcard-header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#2563EB);outline-offset:-2px}",
			".jq-pcard-head{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}",
			".jq-pcard-name{color:var(--dsw-alias-label-primary,#1F2329);font-size:15px;font-weight:600;line-height:1.4;margin-top:2px}",
			// 折叠头第二行:描述 + 识图通道徽标 + 检查更新,同行基线对齐
			".jq-pcard-subrow{display:flex;align-items:center;gap:10px;min-width:0;flex-wrap:wrap;margin-top:0}",
			".jq-pcard-desc{color:var(--dsw-alias-label-tertiary,#9CA3AF);font-size:13px;line-height:1.5;flex:1 1 auto;min-width:0}",
			".jq-pcard-status{display:inline-flex;align-items:center;gap:8px;flex:none;margin-left:0}",
			".jq-pcard-chevron{color:var(--dsw-alias-label-tertiary,#9CA3AF);flex:none;transition:transform .16s;margin-top:4px}",
			".jq-pcard-chevron-open{transform:rotate(180deg)}",
			// 展开体:折叠/展开平滑动画(max-height + opacity 过渡),折叠时隐藏边框
			".jq-pcard-body{border-top:.5px solid transparent;max-height:0;overflow:hidden;opacity:0;transition:max-height .22s ease,opacity .18s ease,border-color .18s ease;box-sizing:border-box}",
			".jq-pcard-open .jq-pcard-body{border-top:.5px solid var(--dsw-alias-border-l2,#EEF0F3);margin:0 16px;max-height:520px;opacity:1;padding:0 0 8px;overflow-y:auto}",
			// ── 展开体字段(与内置 ValueField/SecretField 同款) ──
			".jq-field{flex-direction:column;gap:8px;padding:14px 0;display:flex}",
			".jq-field+.jq-field{border-top:.5px solid var(--dsw-alias-border-l2,#EEF0F3)}",
			".jq-field-head{align-items:center;gap:8px;display:flex;flex-wrap:wrap;row-gap:8px}",
			".jq-field-label{min-width:0;color:var(--dsw-alias-label-primary,#1F2329);flex:1;font-size:13px;font-weight:500;line-height:1.5}",
			".jq-field-hint{color:var(--dsw-alias-label-tertiary,#9CA3AF);margin:0;font-size:12px;line-height:1.5}",
			".jq-input{border:.5px solid var(--dsw-alias-border-l4,#E5E7EB);background:var(--dsw-alias-bg-layer-3,#FFFFFF);height:34px;font:inherit;color:var(--dsw-alias-label-primary,#1F2329);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5;width:100%;max-width:280px;font-family:'SF Mono','JetBrains Mono',Consolas,'Courier New',monospace}",
			".jq-input:focus-visible{border-color:var(--dsw-alias-brand-primary,#2563EB);outline:none}",
			".jq-input:disabled{color:var(--dsw-alias-label-tertiary,#9CA3AF);cursor:default}",
			// 模型行(勾选框 + 名称 + provider + Key 状态 + 拖拽点)
			".jq-model{display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:8px;font-size:13px;transition:background .15s ease,opacity .2s ease;cursor:default}",
			".jq-model:hover{background:var(--dsw-alias-interactive-bg-hover,#F2F4F7)}",
			".jq-model.jq-dragging{opacity:.5;background:var(--dsw-alias-interactive-bg-hover,#F2F4F7);cursor:grabbing}",
			".jq-model.jq-drag-over{border-left:2px solid var(--dsw-alias-state-business-primary,#2563EB)}",
			".jq-check{width:16px;height:16px;flex:0 0 auto;cursor:pointer;accent-color:var(--dsw-alias-state-business-primary,#2563EB)}",
			".jq-model-name{font-family:'SF Mono','JetBrains Mono',Consolas,'Courier New',monospace;font-size:12px;color:var(--dsw-alias-label-primary,#1F2329);flex:0 0 auto}",
			".jq-model-prov{font-size:11px;color:var(--dsw-alias-label-tertiary,#9CA3AF);flex:0 0 auto}",
			".jq-model-key{font-size:12px;color:var(--dsw-alias-state-success-primary,#16A34A);flex:0 0 auto;margin-left:auto}",
			".jq-model-key-missing{color:var(--dsw-alias-state-error-primary,#DC2626)}",
			".jq-drag-handle{color:var(--dsw-alias-label-tertiary,#9CA3AF);font-size:14px;cursor:grab;user-select:none;flex:0 0 auto;line-height:1}",
			".jq-drag-handle:active{cursor:grabbing}",
			".jq-model-list{display:flex;flex-direction:column;gap:2px}",
			".jq-key-actions{display:flex;align-items:center;gap:6px;flex:0 0 auto;margin-left:auto}",
			".jq-info-sep{color:var(--dsw-alias-label-tertiary,#9CA3AF);flex:0 0 auto}",
			// 按钮(普通按钮 hover 浅灰填充,主按钮 hover 变品牌蓝,与 DSW 官方按钮一致)
			".jq-btn{appearance:none;font:inherit;cursor:pointer;border:1px solid var(--dsw-alias-border-l2,#EEF0F3);border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5;background:0 0;color:var(--dsw-alias-label-secondary,#6B7280);transition:color .15s ease,border-color .15s ease,background .15s ease}",
			".jq-btn:not(.jq-btn-primary):not(:disabled):hover{color:var(--dsw-alias-label-primary,#1F2329);border-color:var(--dsw-alias-label-dimmed,var(--dsw-alias-border-l4,#E5E7EB));background:var(--dsw-alias-interactive-bg-hover,#F2F4F7)}",
			".jq-btn-primary{background:var(--dsw-alias-label-primary,#1F2329);border-color:var(--dsw-alias-label-primary,#1F2329);color:var(--dsw-alias-bg-layer-3,#FFFFFF);transition:background .15s ease,border-color .15s ease,box-shadow .15s ease}",
			".jq-btn-primary:not(:disabled):hover{background:var(--dsw-alias-state-business-primary,#2563EB);border-color:var(--dsw-alias-state-business-primary,#2563EB)}",
			".jq-btn:disabled{opacity:.4;cursor:not-allowed}",
			".jq-btn:disabled:hover{background:0 0}",
			".jq-btn-sm{height:24px;padding:0 10px;font-size:11.5px;border-radius:6px}",
			// 轻提示 / 错误
			".jq-toast{border-radius:8px;padding:8px 12px;font-size:12px;margin-bottom:10px;border:1px solid transparent}",
			".jq-toast-ok{color:var(--dsw-alias-state-success-primary,#16A34A);background:var(--dsw-alias-state-success-tertiary,#E8F7EE);border-color:var(--dsw-alias-state-success-primary,#16A34A)}",
			".jq-toast-err{color:var(--dsw-alias-state-error-primary,#DC2626);background:var(--dsw-alias-interactive-bg-hover-danger,#FDECEC);border-color:var(--dsw-alias-state-error-primary,#DC2626)}",
			// 加载 / 错误占位
			".jq-loading{padding:30px 0;text-align:center;font-size:13px;color:var(--dsw-alias-label-tertiary,#9CA3AF)}",
			".jq-empty{padding:14px 0;text-align:center;font-size:12px;color:var(--dsw-alias-label-tertiary,#9CA3AF)}",
			".jq-error{color:var(--dsw-alias-state-error-primary,#DC2626);margin:0;font-size:13px;line-height:1.5}",
			// 信息行(各段之间 10px 间距,用 · 分隔更成句)
			".jq-info{font-size:12px;color:var(--dsw-alias-label-secondary,#6B7280);display:flex;align-items:center;column-gap:10px;row-gap:4px;flex-wrap:wrap}",
			".jq-info b{color:var(--dsw-alias-label-primary,#1F2329);font-weight:600}",
		].join("\n");
		// CSS 注入:设置页打开前将样式表插入页面(与 dsh-usage-stats 同机制)
		const cssTagId = "taishan-vision/Taishan.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=\"" + cssTagId + "\"]") === null) {
			const tag = document.createElement("style");
			tag.setAttribute("data-plugin-css", cssTagId);
			tag.textContent = css;
			document.head.append(tag);
		}
		//#endregion

		//#region helpers
		/** 静态 Client 数据通道:同源 fetch 调用 Host 的 /api/taishan/* 端点 */
		async function call(method, args) {
			// panel/* 端点剥 "taishan/panel/" 前缀,其余端点剥 "taishan/" 前缀,
			// 统一拼到 /api/taishan/<name>(check-update/upgrade 等非 panel 端点不能漏拼)
			const tail = method.startsWith("taishan/panel/")
				? method.slice("taishan/panel/".length)
				: method.replace(/^taishan\//, "");
			const path = "/api/taishan/" + tail;
			let response;
			if (method === "taishan/panel/update" || method === "taishan/panel/reset" || method === "taishan/panel/credential") {
				response = await fetch(path, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(args || {}),
				});
			} else {
				response = await fetch(path, { headers: { accept: "application/json" } });
			}
			const payload = await response.json();
			// HTTP 端点统一返回 { ok, state } / { ok, ...更新信息 };解包为组件期望的结构
			if (payload && typeof payload === "object" && payload.ok === true) {
				if ("state" in payload) return payload.state;
				return payload;
			}
			throw new Error((payload && payload.error) || ("HTTP " + response.status));
		}
		function fmtTime(ts) {
			if (!ts) return "—";
			const d = new Date(ts);
			const p = (n) => String(n).padStart(2, "0");
			return p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
		}
		function routeKey(provider, model) {
			return String(provider) + "|" + String(model);
		}
		//#endregion

		//#region panel

		// (ModelsCard / StatusCard / LogCard 已被原生单卡片 Panel 取代,逻辑内联到 Panel)

		/**
		 * Panel: 「插件配置」原生单卡片(与 DSH 内置 PluginCard 同风格)。
		 * 一张可折叠卡片,展开体直接平铺 3 个字段(总开关 / API Key / 可用视觉模型),
		 * 没有内部卡片头;状态徽标挂在折叠头右侧。排障走 taishan_diag 工具。
		 */
		function Panel() {
			const [state, setState] = React.useState(null);
			const [phase, setPhase] = React.useState("idle");
			const [error, setError] = React.useState(null);
			const [open, setOpen] = React.useState(false);
			const [keyValue, setKeyValue] = React.useState("");
			const [keyToast, setKeyToast] = React.useState(null);
			const keyToastTimer = React.useRef(null);
			const [checking, setChecking] = React.useState(false);
			const [scanning, setScanning] = React.useState(false);

			// 整体替换:面板数据端点返回完整 state,直接整包覆盖
			const onState = React.useCallback((res) => { setState(res); }, []);
			const scan = (state && state.scan) || {};
			const config = (state && state.config) || {};
			const cred = (state && state.credential) || {};
			const routesEnabled = config.routesEnabled || {};
			const routeOrder = config.routeOrder || [];

			// 首次展开才拉数据(折叠时零请求),与 modsearch 卡片懒加载模式一致
			const load = React.useCallback(() => {
				setPhase("loading");
				setError(null);
				call("taishan/panel/state", {})
					.then((res) => {
						if (res && res.error) throw new Error(res.error);
						setState(res);
						setPhase("ready");
					})
					.catch((e) => { setError(String(e && e.message ? e.message : e)); setPhase("error"); });
			}, []);
			React.useEffect(() => {
				if (open && phase === "idle") load();
			}, [open, phase, load]);

			// ── 操作 ──
			const toggleEnabled = () => {
				call("taishan/panel/update", { patch: { enabled: !config.enabled } })
					.then((res) => { if (res && res.version) onState(res); })
					.catch(() => {});
			};
			const rescan = () => {
				setScanning(true);
				call("taishan/panel/rescan", {})
					.then((res) => { if (res && res.version) onState(res); })
					.catch(() => {})
					.finally(() => setScanning(false));
			};
			const keyShowToast = (kind, text) => {
				setKeyToast({ kind, text });
				if (keyToastTimer.current) clearTimeout(keyToastTimer.current);
				keyToastTimer.current = setTimeout(() => setKeyToast(null), kind === "ok" ? 2500 : 4000);
			};
			const saveKey = () => {
				const v = (keyValue || "").trim();
				if (!v) { keyShowToast("err", "请输入 API Key"); return; }
				call("taishan/panel/credential", { value: v })
					.then((res) => {
						if (res && res.error) { keyShowToast("err", res.error); return; }
						setKeyValue("");
						if (res && res.version) onState(res);
						keyShowToast("ok", "API Key 已保存,立即生效");
					})
					.catch((e) => keyShowToast("err", String(e && e.message ? e.message : e)));
			};
			const clearKey = () => {
				call("taishan/panel/credential", { clear: true })
					.then((res) => {
						if (res && res.error) { keyShowToast("err", res.error); return; }
						setKeyValue("");
						if (res && res.version) onState(res);
						keyShowToast("ok", "API Key 已清除");
					})
					.catch((e) => keyShowToast("err", String(e && e.message ? e.message : e)));
			};
			const checkUpdate = () => {
				setChecking(true);
				call("taishan/check-update", {})
					.then((res) => {
						if (res && res.checkedAt) {
							if (res.error) { keyShowToast("err", "检查更新失败:" + res.error); return; }
							keyShowToast("ok", res.hasUpdate ? ("发现新版本 v" + res.latest + ",可到 GitHub Releases 下载") : "已是最新版本 v" + (res.current || "v5.0"));
						}
					})
					.catch((e) => keyShowToast("err", "检查更新失败:" + String(e && e.message ? e.message : e)))
					.finally(() => setChecking(false));
			};

			// ── 模型列表(勾选 = 生效) ──
			const vision = scan.visionModels || [];
			const keyOf = (v) => routeKey(v.provider, v.id);
			const byKey = new Map(vision.map((v) => [keyOf(v), v]));
			const ordered = [];
			for (const key of routeOrder) {
				if (byKey.has(key)) { ordered.push(byKey.get(key)); byKey.delete(key); }
			}
			for (const v of byKey.values()) ordered.push(v);
			const list = ordered;
			const [dragKey, setDragKey] = React.useState(null);
			const [overKey, setOverKey] = React.useState(null);
			const [localList, setLocalList] = React.useState(null);
			const overKeyRef = React.useRef(null);
			const rowRefs = React.useRef({});
			const prevTops = React.useRef({});
			const shown = localList || list;
			React.useEffect(() => {
				setLocalList(null); setDragKey(null); setOverKey(null); overKeyRef.current = null;
				prevTops.current = {};
			}, [state]);
			React.useEffect(() => {
				const tops = {};
				for (const key of Object.keys(rowRefs.current)) {
					const el = rowRefs.current[key];
					if (el) tops[key] = el.offsetTop;
				}
				for (const key of Object.keys(tops)) {
					const prev = prevTops.current[key];
					if (prev === undefined || prev === tops[key]) continue;
					const el = rowRefs.current[key];
					const dy = prev - tops[key];
					el.style.transition = "none";
					el.style.transform = "translateY(" + dy + "px)";
					void el.offsetHeight;
					el.style.transition = "transform .22s ease";
					el.style.transform = "translateY(0)";
				}
				prevTops.current = tops;
			}, [shown]);
			const commitOrder = (orderedList) => {
				call("taishan/panel/update", { patch: { routeOrder: orderedList.map(keyOf) } })
					.then((res) => { if (res && res.version) onState(res); setLocalList(null); })
					.catch(() => setLocalList(null));
			};
			const onDragStart = (e, key) => {
				setDragKey(key);
				e.dataTransfer.effectAllowed = "move";
				try { e.dataTransfer.setData("text/plain", key); } catch (_) {}
			};
			const onDragOver = (e, key) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "move";
				if (!dragKey || dragKey === key || overKeyRef.current === key) return;
				overKeyRef.current = key;
				setOverKey(key);
				const from = shown.findIndex((r) => keyOf(r) === dragKey);
				const to = shown.findIndex((r) => keyOf(r) === key);
				if (from < 0 || to < 0) return;
				const next = shown.slice();
				const [moved] = next.splice(from, 1);
				next.splice(to, 0, moved);
				setLocalList(next);
			};
			const onDrop = (e) => { e.preventDefault(); overKeyRef.current = null; setOverKey(null); };
			const onDragEnd = () => {
				overKeyRef.current = null;
				setDragKey(null);
				setOverKey(null);
				if (localList && localList !== list) commitOrder(localList);
				else setLocalList(null);
			};
			const toggleModel = (v) => {
				const key = keyOf(v);
				const patch = {};
				patch[key] = !(routesEnabled[key] !== false);
				call("taishan/panel/update", { patch: { routesEnabled: patch } })
					.then((res) => { if (res && res.version) onState(res); })
					.catch(() => {});
			};
			const modelRows = shown.map((v) => {
				const key = keyOf(v);
				const on = routesEnabled[key] !== false;
				const mCred = v.credential || {};
				return React.createElement("div", {
					key,
					className: "jq-model" +
						(dragKey === key ? " jq-dragging" : "") +
						(overKey === key && dragKey !== key ? " jq-drag-over" : ""),
					ref: (el) => { if (el) rowRefs.current[key] = el; },
					onDragOver: (e) => onDragOver(e, key),
					onDrop,
				},
					React.createElement("input", {
						type: "checkbox",
						className: "jq-check",
						checked: on,
						onChange: () => toggleModel(v),
						title: "勾选后该模型生效;失败时自动尝试下一个",
						"aria-label": (on ? "停用 " : "启用 ") + v.provider + "/" + v.id,
					}),
					React.createElement("span", { className: "jq-model-name" }, v.id),
					React.createElement("span", { className: "jq-model-prov" }, v.provider),
					mCred.configured
						? React.createElement("span", { className: "jq-model-key" }, "Key 已配置")
						: React.createElement("span", { className: "jq-model-key jq-model-key-missing" }, "Key 未配置"),
					// 拖拽点(Key 状态后面,⠿ 六个点)
					React.createElement("span", {
						className: "jq-drag-handle",
						draggable: true,
						onDragStart: (e) => onDragStart(e, key),
						onDragEnd,
						title: "拖动调整调用顺序",
					}, "⠿"),
				);
			});

			// ── 展开体内容 ──
			const bodyContent = () => {
				if (phase === "loading") {
					return React.createElement("div", { className: "jq-loading" }, "加载面板数据…");
				}
				if (phase === "error") {
					return React.createElement(React.Fragment, null,
						React.createElement("p", { className: "jq-error" }, "面板加载失败:" + error),
						React.createElement("button", { className: "jq-btn jq-btn-sm jq-btn-primary", onClick: load }, "重试"),
					);
				}
				return React.createElement(React.Fragment, null,
					// 字段①:版本信息(左)+ 启停按钮(右),按开关状态显示「停用」或「启用」
					React.createElement("div", { className: "jq-field" },
						React.createElement("div", { className: "jq-field-head" },
							React.createElement("span", { className: "jq-info" },
								React.createElement("span", null, "版本 " + ((state && state.version) || "v5.0")),
								React.createElement("span", { className: "jq-info-sep" }, "·"),
								React.createElement("span", null, "上次扫描 " + fmtTime(scan.scannedAt)),
								React.createElement("span", { className: "jq-info-sep" }, "·"),
								React.createElement("span", null, String((scan.providers || []).length) + " 个提供方"),
								React.createElement("span", { className: "jq-info-sep" }, "·"),
								React.createElement("span", null, String((scan.visionModels || []).length) + " 个视觉模型"),
							),
							React.createElement("button", {
								type: "button",
								className: "jq-btn jq-btn-sm" + (config.enabled ? "" : " jq-btn-primary"),
								onClick: toggleEnabled,
								style: { marginLeft: "auto" },
							}, config.enabled ? "停用" : "启用"),
						),
					),
					// 字段②:智谱 API KEY(标签 + 输入框 + 保存/清除按钮,同一行)
					React.createElement("div", { className: "jq-field" },
						React.createElement("div", { className: "jq-field-head" },
							React.createElement("span", { className: "jq-field-label" }, "配置智谱 API KEY"),
							React.createElement("input", {
								className: "jq-input",
								style: { width: "320px", flex: "0 0 auto" },
								type: "password",
								value: keyValue,
								autoComplete: "off", spellCheck: false,
								placeholder: cred.configured ? "已配置(粘贴新 Key 可覆盖)" : "粘贴 API Key",
								onChange: (e) => setKeyValue(e.target.value),
								onKeyDown: (e) => { if (e.key === "Enter") saveKey(); },
							}),
							React.createElement("div", { className: "jq-key-actions" },
								React.createElement("button", { className: "jq-btn jq-btn-sm jq-btn-primary", onClick: saveKey, disabled: (keyValue || "").trim() === "" }, "保存"),
								React.createElement("button", { className: "jq-btn jq-btn-sm", onClick: clearKey, disabled: !cred.configured }, "清除"),
							),
						),
						keyToast && React.createElement("div", { className: "jq-toast jq-toast-" + (keyToast.kind === "ok" ? "ok" : "err") }, keyToast.text),
						React.createElement("p", { className: "jq-field-hint" },
							"打开 https://open.bigmodel.cn 注册登录并申请 API KEY 填入上方保存即可,立即生效,无需重启"),
					),
					// 字段③:可用视觉模型
					React.createElement("div", { className: "jq-field" },
						React.createElement("div", { className: "jq-field-head" },
							React.createElement("span", { className: "jq-field-label" }, "可用视觉模型"),
							// 重新扫描按钮(纯文字,无旋转图标;扫描中文字变「扫描中…」)
							React.createElement("button", {
								className: "jq-btn jq-btn-sm",
								onClick: rescan, title: "立即重新扫描模型列表",
							}, scanning ? "扫描中…" : "重新扫描"),
						),
						vision.length === 0
							? React.createElement("div", { className: "jq-empty" }, "未扫描到支持识图功能的模型")
							: React.createElement("div", { className: "jq-model-list" }, modelRows),
					),
				);
			};

			return React.createElement("li", { className: "jq-pcard" + (open ? " jq-pcard-open" : "") },
				React.createElement("button", {
					type: "button",
					className: "jq-pcard-header",
					"aria-expanded": open,
					"aria-label": (open ? "收起 " : "展开 ") + "泰山识图",
					onClick: () => setOpen(!open),
				},
					React.createElement("span", { className: "jq-pcard-head" },
						React.createElement("span", { className: "jq-pcard-name" }, "泰山识图"),
						// 副行:描述文字 + 检查更新按钮,同行基线对齐
						React.createElement("span", { className: "jq-pcard-subrow" },
							React.createElement("span", { className: "jq-pcard-desc" },
								"基于GLM免费视觉识别+当前模型推理"),
							React.createElement("span", { className: "jq-pcard-status" },
								React.createElement("button", {
									type: "button",
									className: "jq-btn jq-btn-sm",
									disabled: checking,
									title: "检查新版本",
									onClick: (e) => { e.stopPropagation(); checkUpdate(); },
								}, checking ? "检查中…" : "检查更新"),
							),
						),
					),
					React.createElement("svg", {
						className: "jq-pcard-chevron" + (open ? " jq-pcard-chevron-open" : ""),
						width: 14, height: 14, viewBox: "0 0 14 14",
						"aria-hidden": "true",
					},
						React.createElement("path", {
							d: "M3.5 5.25l3.5 3.5 3.5-3.5",
							fill: "none", stroke: "currentColor",
							strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
						}),
					),
				),
				// 展开体常驻渲染,折叠/展开走 CSS max-height+opacity 平滑动画
				React.createElement("div", { className: "jq-pcard-body" },
					bodyContent(),
				),
			);
		}
		//#endregion

		//#region plugin body
		// 与 modsearch 完全一致:顶层 inject 声明为空,全部依赖走 scoped
		// ctx.inject(在 apply 内按需包裹)。这样宿主端没有的服务不会
		// 导致 DSH 启动失败("Failed to load plugins")。
		const inject = [];

		/**
		 * Client plugin body: 把泰山识图面板注册为「插件配置」页的一张卡片。
		 *
		 * 与 modsearch 完全相同的机制:
		 *  - 注册到 settings.plugin.item 插槽,id + key 双字段
		 *    (key 必须与 Host 端注册的 settings 命名空间 "taishan-vision" 一致,
		 *    否则「插件配置」页按命名空间分发卡片时分发不到,静默不渲染);
		 *  - Host 端 index.js 已注册 taishan-vision settings 命名空间
		 *    (passthrough,和 modsearch 一样)。
		 *
		 * @param ctx - client root context.
		 */
		function apply(ctx) {
			if (typeof ctx.inject === "function") {
				// modsearch 同款:scoped ctx.inject(['slots']),闭包在服务真正
				// 可用时执行;里面用生成器 function* + yield 做注册
				// (rc.6 list 槽认 id,rc.7 keyed 槽认 key,两个都带,一份客户端
				//  服务两种槽型)。
				ctx.inject(["slots"], (scope) => {
					try {
						scope.slots.inject("settings.plugin.item", function* () {
							yield scope.slots.register({
								name: "settings.plugin.item",
								id: "taishan-vision",
								key: "taishan-vision",
							}, Panel);
						});
					} catch (e) {
						if (typeof window !== "undefined") window.__TAISHAN_REG_ERROR__ = String(e && e.stack ? e.stack : e);
					}
				});
			} else if (ctx.slots) {
				// 兜底:ctx.inject 不可用时退回顶层直用
				try {
					ctx.slots.inject("settings.plugin.item", function* () {
						yield ctx.slots.register({
							name: "settings.plugin.item",
							id: "taishan-vision",
							key: "taishan-vision",
						}, Panel);
					});
				} catch (e) {
					if (typeof window !== "undefined") window.__TAISHAN_REG_ERROR__ = String(e && e.stack ? e.stack : e);
				}
			}
			// 诊断:读回 settings.plugin.item 槽账本(所有已注册条目),
			// 确认卡片条目是否真的进账本了。浏览器 Console 执行
			// JSON.stringify({slot: window.__TAISHAN_SLOT__, err: window.__TAISHAN_REG_ERROR__})
			const readLedger = () => {
				try {
					const entries = ctx.slots.entries("settings.plugin.item") || [];
					window.__TAISHAN_SLOT__ = entries.map((en) => ({
						id: en.options && en.options.id,
						key: en.options && en.options.key,
					}));
				} catch (e) {
					window.__TAISHAN_SLOT__ = "entries() failed: " + String(e);
				}
			};
			readLedger();
			setTimeout(readLedger, 3000); // 3 秒后再读一次稳定状态
			if (typeof window !== "undefined") window.__TAISHAN_APPLIED__ = true;
		}
		//#endregion

		exports.apply = apply;
		exports.inject = inject;
		exports.Panel = Panel;
		return module.exports;
	}
});
