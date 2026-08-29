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
		let primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		//#region css
		const css = [
			".jq-root{--bg-page:var(--dsw-alias-bg-layer-1,#FFFFFF);--bg-card:var(--dsw-alias-bg-layer-3,#FFFFFF);--bg-subtle:var(--dsw-alias-interactive-bg-hover,#F2F4F7);--bg-inset:var(--dsw-alias-markdown-code-block,#FAFBFC);--border-l1:var(--dsw-alias-border-l1,#E5E7EB);--border-l2:var(--dsw-alias-border-l2,#EEF0F3);--text-primary:var(--dsw-alias-label-primary,#1F2329);--text-secondary:var(--dsw-alias-label-secondary,#6B7280);--text-tertiary:var(--dsw-alias-label-tertiary,#9CA3AF);--brand:var(--dsw-alias-brand-primary,#2563EB);--brand-hover:var(--dsw-alias-button-primary-hover,#1D4ED8);--brand-bg:var(--dsw-alias-state-business-tertiary,#EFF4FF);--success:var(--dsw-alias-state-success-primary,#16A34A);--success-bg:var(--dsw-alias-state-success-tertiary,#E8F7EE);--warn:var(--dsw-alias-state-warn-primary,#D97706);--error:var(--dsw-alias-state-error-primary,#DC2626);--error-bg:var(--dsw-alias-interactive-bg-hover-danger,#FDECEC);--star:var(--dsw-alias-state-warn-primary,#F59E0B);--ring:0 0 0 2px color-mix(in srgb,var(--dsw-alias-state-business-primary,#2563EB) 20%,transparent);--switch-off:var(--dsw-alias-bg-module-platform,#C9CED6);--font-ui:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif;--font-mono:\"SF Mono\",\"JetBrains Mono\",Consolas,\"Courier New\",monospace;box-sizing:border-box;font-family:var(--font-ui);color:var(--text-primary);width:100%;max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:12px;font-size:13px;line-height:1.5}",
			".jq-root *{box-sizing:border-box}",
			".jq-card{background:var(--bg-card);border:1px solid var(--border-l2);border-radius:10px;padding:14px 16px 10px}",
			".jq-card-head{display:flex;align-items:baseline;gap:8px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border-l2)}",
			".jq-card-head-tight{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;margin-bottom:8px;padding-bottom:8px}",
			".jq-card-head-tight .jq-seg{margin-left:0}",
			".jq-card-head-tight > .jq-btn{margin-left:0;justify-self:end}",
			".jq-log-side{display:flex;align-items:center;gap:8px;min-width:0}",
			".jq-log-side-right{justify-content:flex-end}",
			".jq-card-title{font-size:13px;font-weight:600;line-height:20px}",
			".jq-tag{font-size:11px;color:var(--text-tertiary)}",
			".jq-card-head > .jq-btn{margin-left:auto}",
			".jq-card-head > .jq-seg + .jq-btn{margin-left:0}",
			".jq-dot{width:8px;height:8px;border-radius:50%;background:var(--success);box-shadow:0 0 0 3px var(--success-bg);display:inline-block}",
			".jq-badge{height:22px;padding:0 9px;border-radius:999px;font-size:11px;display:inline-flex;align-items:center;gap:4px;font-weight:500}",
			".jq-badge-success{color:var(--success);background:var(--success-bg)}",
			".jq-badge-subtle{color:var(--text-secondary);background:var(--bg-subtle)}",
			".jq-badge-dot{display:inline-flex;align-items:center;gap:6px;margin-left:auto}",
			".jq-badge-dot .jq-dot{width:7px;height:7px;box-shadow:0 0 0 2px var(--success-bg)}",
			".jq-info-line{font-size:12px;color:var(--text-secondary)}",
			".jq-info-line b{color:var(--text-primary);font-weight:600}",
			".jq-providers{font-size:12px;color:var(--text-secondary);margin-bottom:8px}",
			".jq-chip{font-family:var(--font-mono);font-size:11px;background:var(--bg-subtle);padding:1px 7px;border-radius:6px;margin-right:4px;color:var(--text-secondary)}",
			".jq-model-row{display:flex;align-items:center;gap:10px;height:36px;padding:0 10px;border-radius:8px;font-size:13px;cursor:pointer;transition:background .15s ease}",
			".jq-model-row:hover{background:var(--bg-subtle)}",
			".jq-model-name{font-family:var(--font-mono);font-size:12px;color:var(--text-primary);flex:0 0 auto}",
			".jq-model-prov{font-size:11px;color:var(--text-tertiary);flex:0 0 auto}",
			".jq-model-cost{font-family:var(--font-mono);font-size:11px;color:var(--text-tertiary);flex:0 0 auto}",
			".jq-star{color:var(--star)}",
			".jq-key{font-size:12px;color:var(--success);margin-left:auto;flex:0 0 auto}",
			".jq-key-missing{color:var(--error)}",
			".jq-switch{width:36px;height:20px;border-radius:999px;background:var(--switch-off);position:relative;transition:background .2s;flex:0 0 auto;cursor:pointer;border:none;padding:0}",
			"body[data-ds-dark-theme] .jq-switch{background:rgba(255,255,255,0.18)}",
			".jq-switch.jq-on{background:var(--dsw-alias-state-business-primary,#2563EB)}",
			"body[data-ds-dark-theme] .jq-switch.jq-on{background:var(--dsw-static-deepseek-400,#3B82F6)}",
			".jq-switch .jq-knob{width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left .2s}",
			".jq-switch.jq-on .jq-knob{left:18px}",
			".jq-section-title{font-size:12px;font-weight:600;color:var(--text-secondary);margin:8px 0 6px}",
			".jq-row{border-top:1px solid var(--border-l2);padding:10px 0;display:flex;align-items:flex-start;gap:16px}",
			".jq-label{flex:0 0 150px;font-size:13px;line-height:30px}",
			".jq-hint{font-size:11px;color:var(--text-tertiary);line-height:1.5;padding-top:2px}",
			".jq-hint-block{display:block;margin-bottom:2px}",
			".jq-dot-off{background:var(--text-tertiary);box-shadow:0 0 0 2px var(--bg-subtle)}",
			".jq-input{width:88px;height:30px;border-radius:8px;padding:0 10px;font-family:var(--font-mono);font-size:13px;border:1px solid var(--border-l1);background:var(--bg-page);color:var(--text-primary);transition:border-color .15s ease,box-shadow .15s ease}",
			".jq-input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary,#2563EB);box-shadow:var(--ring)}",
			".jq-range{font-size:10px;color:var(--text-tertiary);margin-top:2px}",
			".jq-btn{height:30px;padding:0 14px;border-radius:8px;font-size:12px;cursor:pointer;border:1px solid var(--border-l2);background:var(--bg-card);color:var(--text-secondary);transition:background .15s ease,border-color .15s ease,color .15s ease}",
			".jq-btn:hover{border-color:var(--brand);color:var(--brand)}",
			".jq-btn-primary{background:var(--dsw-alias-state-business-primary,#2563EB);border-color:var(--dsw-alias-state-business-primary,#2563EB);color:#fff}",
			".jq-btn-primary:hover{background:var(--dsw-static-deepseek-500,#1D4ED8);border-color:var(--dsw-static-deepseek-500,#1D4ED8);color:#fff}",
			".jq-btn-ghost{background:var(--bg-card);border:1px solid var(--border-l2);color:var(--text-secondary)}",
			".jq-btn-ghost:hover{border-color:var(--brand);color:var(--brand)}",
			".jq-btn-soft{background:var(--brand-bg);border:1px solid var(--border-l2);color:var(--brand)}",
			".jq-btn-soft:hover{border-color:var(--brand);color:var(--brand-hover)}",
			".jq-btn-icon{width:26px;height:26px;padding:0;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;border-radius:7px;font-size:15px;line-height:1;border:1px solid transparent;background:transparent;color:var(--text-tertiary);cursor:pointer;transition:color .15s ease,background .15s ease,border-color .15s ease,transform .15s ease}",
			".jq-btn-icon:hover{color:var(--brand);background:var(--bg-subtle);border-color:var(--border-l2);transform:rotate(90deg)}",
			".jq-btn-sm{height:24px;padding:0 10px;font-size:11.5px;border-radius:6px}",
			".jq-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding-top:4px}",
			".jq-grid-item{display:flex;flex-direction:column;gap:6px;min-width:0}",
			".jq-grid-label{font-size:12px;color:var(--text-secondary);font-weight:500}",
			".jq-grid-item .jq-input{width:100%}",
			".jq-btn:disabled{opacity:.4;cursor:not-allowed}",
			".jq-btn-row{margin-top:10px;display:flex;gap:8px}",
			".jq-toast{border-radius:8px;padding:8px 12px;font-size:12px;margin-bottom:10px;border:1px solid transparent}",
			".jq-toast-ok{color:var(--success);background:var(--success-bg);border-color:var(--success)}",
			".jq-toast-err{color:var(--error);background:var(--error-bg);border-color:var(--error)}",
			".jq-seg{display:inline-flex;padding:2px;border-radius:8px;background:var(--bg-subtle);gap:2px;margin-left:auto}",
			".jq-seg-btn{height:24px;padding:0 12px;border:none;border-radius:6px;background:transparent;color:var(--text-secondary);font-size:12px;cursor:pointer;transition:background .15s ease,color .15s ease}",
			".jq-seg-btn:hover{color:var(--text-primary)}",
			".jq-seg-btn.jq-seg-on{background:var(--bg-card);color:var(--text-primary);box-shadow:0 1px 2px rgba(0,0,0,.08)}",
			"body[data-ds-dark-theme] .jq-seg-btn.jq-seg-on{box-shadow:0 1px 2px rgba(0,0,0,.4)}",
			".jq-select{height:28px;border-radius:8px;border:1px solid var(--border-l1);background:var(--bg-page);color:var(--text-primary);font-size:12px;padding:0 6px}",
			".jq-log-box{background:var(--bg-inset);border:1px solid var(--border-l2);border-radius:8px;padding:6px 10px;max-height:220px;overflow-y:auto;font-family:var(--font-mono);font-size:11.5px;line-height:1.9}",
			".jq-log-box-tight{padding:4px 8px;max-height:280px;font-size:11px;line-height:1.75}",
			".jq-log-line{display:flex;align-items:center;gap:8px;white-space:nowrap;padding:1px 4px;border-radius:5px;transition:background .12s ease}",
			".jq-log-line:hover{background:var(--bg-subtle)}",
			".jq-log-time{color:var(--text-tertiary);flex:0 0 52px}",
			".jq-log-badge{display:inline-flex;align-items:center;gap:5px;flex:0 0 46px;font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.02em}",
			".jq-log-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:0 0 auto}",
			".jq-log-badge-info{color:var(--brand)}",
			".jq-log-badge-warn{color:var(--warn)}",
			".jq-log-badge-error{color:var(--error)}",
			".jq-log-event{flex:0 0 92px;color:var(--text-primary);font-weight:600;overflow:hidden;text-overflow:ellipsis}",
			".jq-log-detail{color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;flex:1}",
			".jq-placeholder{padding:14px 0;text-align:center;font-size:12px;color:var(--text-tertiary)}",
			".jq-route-node{display:flex;align-items:center;gap:12px;padding:0 12px;height:34px;border:1px solid var(--border-l2);border-radius:8px;margin-bottom:6px;font-family:var(--font-mono);font-size:12px;cursor:grab;background:var(--bg-card);transition:transform .2s ease,opacity .2s ease,border-color .15s ease,box-shadow .2s ease,background .15s ease}",
			".jq-route-node:hover{border-color:var(--brand);background:var(--bg-subtle)}",
			".jq-route-node.jq-dragging{opacity:.5;border-color:var(--brand);cursor:grabbing;box-shadow:0 6px 16px var(--dsw-alias-bg-mask-2);transform:scale(1.02);z-index:2}",
			".jq-route-node.jq-drag-over{border-color:var(--brand);border-style:dashed;background:var(--brand-bg)}",
			".jq-route-handle{color:var(--text-tertiary);margin-left:auto;flex:0 0 auto;font-size:14px;cursor:grab;user-select:none}",
			".jq-route-num{width:16px;height:16px;border-radius:50%;background:var(--dsw-alias-state-business-primary,#2563EB);color:#fff;font-size:10px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}",
			".jq-route-arrow{text-align:center;color:var(--text-tertiary);font-size:12px;line-height:1;margin:-4px 0 4px}",
			".jq-route-note{font-size:11px;color:var(--text-tertiary);margin-top:8px}",
			".jq-loading{padding:30px 0;text-align:center;font-size:13px;color:var(--text-tertiary)}",
			".jq-error-box{background:var(--error-bg);border:1px solid var(--error);color:var(--error);border-radius:8px;padding:12px 14px;font-size:13px;margin-bottom:12px}",
			".jq-error-box .jq-btn{margin-top:10px}",
			".jq-cred-row{display:flex;align-items:center;gap:10px;padding:8px 0 4px;flex-wrap:wrap}",
			".jq-cred-input{flex:1 1 220px;min-width:0;height:32px;border-radius:8px;padding:0 12px;font-family:var(--font-mono);font-size:12px;border:1px solid var(--border-l1);background:var(--bg-page);color:var(--text-primary);transition:border-color .15s ease,box-shadow .15s ease}",
			".jq-cred-input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary,#2563EB);box-shadow:var(--ring)}",
			".jq-btn-eye{width:32px;height:32px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid var(--border-l2);background:var(--bg-card);color:var(--text-secondary);font-size:14px;cursor:pointer;transition:border-color .15s ease,color .15s ease}",
			".jq-btn-eye:hover{border-color:var(--brand);color:var(--brand)}"
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
			const path = "/api/taishan/" + method.replace("taishan/panel/", "");
			let response;
			if (method === "taishan/panel/update" || method === "taishan/panel/reset" || method === "taishan/panel/credential") {
				response = await fetch(path, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(args || {}),
				});
			} else if (method === "taishan/panel/logs" && args) {
				const q = new URLSearchParams();
				if (args.limit) q.set("limit", String(args.limit));
				if (args.level && args.level !== "all") q.set("level", String(args.level));
				response = await fetch(path + "?" + q.toString(), { headers: { accept: "application/json" } });
			} else {
				response = await fetch(path, { headers: { accept: "application/json" } });
			}
			const payload = await response.json();
			// HTTP 端点统一返回 { ok, state } / { ok, logs };解包为组件期望的结构
			if (payload && typeof payload === "object" && payload.ok === true) {
				if (method === "taishan/panel/logs") return { logs: payload.logs || [] };
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
		function fmtCost(cost) {
			if (!cost) return "价格未知";
			return "$" + cost.input.toFixed(2) + "/$" + cost.output.toFixed(2);
		}
		function routeKey(provider, model) {
			return String(provider) + "|" + String(model);
		}
		//#endregion

		//#region cards
		function LogCard(props) {
			const [level, setLevel] = React.useState("all");
			const [logs, setLogs] = React.useState(Array.isArray(props.state && props.state.logs) ? props.state.logs : []);
			React.useEffect(() => { setLogs(Array.isArray(props.state && props.state.logs) ? props.state.logs : []); }, [props.state]);
			const refresh = () => {
				call("taishan/panel/logs", { limit: 100, level })
					.then((res) => { if (res && Array.isArray(res.logs)) setLogs(res.logs); })
					.catch(() => {});
			};
			React.useEffect(() => { refresh(); }, [level]);
			const LEVELS = [["all", "全部"], ["info", "信息"], ["warn", "警告"], ["error", "错误"]];
			const rows = (logs || []).map((e, i) => React.createElement("div", { key: i, className: "jq-log-line" },
				React.createElement("span", { className: "jq-log-time" }, String(e.t || "").slice(11, 19)),
				React.createElement("span", { className: "jq-log-badge jq-log-badge-" + (e.level || "info") },
					React.createElement("span", { className: "jq-log-dot" }),
					String(e.level || "info")),
				React.createElement("span", { className: "jq-log-event" }, String(e.event || "")),
				React.createElement("span", { className: "jq-log-detail", title: e.detail }, String(e.detail || "")),
			));
			return React.createElement("div", { className: "jq-card" },
				React.createElement("div", { className: "jq-card-head jq-card-head-tight" },
					React.createElement("div", { className: "jq-log-side" },
						React.createElement("span", { className: "jq-card-title" }, "日志"),
						React.createElement("span", { className: "jq-tag" }, "只读"),
					),
					React.createElement("div", { className: "jq-seg", role: "group", "aria-label": "日志级别筛选" },
						LEVELS.map(([val, label]) => React.createElement("button", {
							key: val,
							className: "jq-seg-btn" + (level === val ? " jq-seg-on" : ""),
							onClick: () => setLevel(val),
						}, label)),
					),
					React.createElement("div", { className: "jq-log-side jq-log-side-right" },
						React.createElement("button", {
							className: "jq-btn jq-btn-ghost jq-btn-sm", title: "刷新日志",
							onClick: refresh,
						}, "刷新"),
					),
				),
				logs.length === 0
					? React.createElement("div", { className: "jq-placeholder" }, "暂无日志,点击「刷新」查看")
					: React.createElement("div", { className: "jq-log-box jq-log-box-tight" }, rows),
			);
		}

		function ConfigCard(props) {
			const { state, call, onState } = props;
			const config = (state && state.config) || {};
			const [timeoutMs, setTimeoutMs] = React.useState(String(config.timeoutMs || 20000));
			const [maxTokens, setMaxTokens] = React.useState(String(config.maxTokens || 512));
			const [temperature, setTemperature] = React.useState(String(config.temperature != null ? config.temperature : 0.2));
			const [toast, setToast] = React.useState(null);
			const toastTimer = React.useRef(null);
			React.useEffect(() => {
				setTimeoutMs(String(config.timeoutMs != null ? config.timeoutMs : 20000));
				setMaxTokens(String(config.maxTokens != null ? config.maxTokens : 512));
				const t = config.temperature != null ? Number(config.temperature) : 0.2;
				setTemperature(String(Number.isFinite(t) ? t.toFixed(2) : "0.2"));
			}, [state]);
			const showToast = (kind, text) => {
				setToast({ kind, text });
				if (toastTimer.current) clearTimeout(toastTimer.current);
				toastTimer.current = setTimeout(() => setToast(null), kind === "ok" ? 2500 : 4000);
			};
			const update = (patch) => {
				call("taishan/panel/update", { patch })
					.then((res) => {
						if (res && res.error) { showToast("err", res.error); return; }
						if (res && res.version) onState(res);
						showToast("ok", "已生效");
					})
					.catch((e) => showToast("err", String(e && e.message ? e.message : e)));
			};
			const toggleEnabled = () => update({ enabled: !config.enabled });
			const commitNum = (field, value) => {
				const num = Number(value);
				if (value.trim() === "" || Number.isNaN(num)) return;
				const patch = {};
				patch[field] = num;
				update(patch);
			};
			return React.createElement("div", { className: "jq-card" },
				React.createElement("div", { className: "jq-card-head" },
					React.createElement("span", { className: "jq-card-title" }, "识图参数"),
					React.createElement("span", { className: "jq-tag" }, "即时生效"),
					React.createElement("button", {
						className: "jq-btn jq-btn-ghost jq-btn-sm", title: "恢复默认配置",
						onClick: () => {
							call("taishan/panel/reset", {}).then((res) => {
								if (res && res.version) onState(res);
								showToast("ok", "已恢复默认配置");
							}).catch(() => {});
						},
					}, "恢复默认"),
				),
				toast && React.createElement("div", { className: "jq-toast jq-toast-" + (toast.kind === "ok" ? "ok" : "err") }, toast.text),
				React.createElement("div", { className: "jq-row" },
					React.createElement("span", { className: "jq-label" }, "启用泰山识图"),
					React.createElement("button", {
						className: "jq-switch" + (config.enabled ? " jq-on" : ""),
						onClick: toggleEnabled,
						role: "switch",
						"aria-checked": Boolean(config.enabled),
					}, React.createElement("span", { className: "jq-knob" })),
					React.createElement("div", { className: "jq-hint" }, "关闭后暂停识图自动流程(图片通道保留);模型启停见「模型检测结果」"),
				),
				React.createElement("div", { className: "jq-grid3" },
					React.createElement("div", { className: "jq-grid-item" },
						React.createElement("div", { className: "jq-grid-label" }, "超时(ms)"),
						React.createElement("input", {
							className: "jq-input", type: "number", value: timeoutMs, step: 1,
							onChange: (e) => setTimeoutMs(e.target.value),
							onBlur: (e) => commitNum("timeoutMs", e.target.value),
						}),
						React.createElement("div", { className: "jq-range" }, "1000–60000"),
					),
					React.createElement("div", { className: "jq-grid-item" },
						React.createElement("div", { className: "jq-grid-label" }, "输出上限(token)"),
						React.createElement("input", {
							className: "jq-input", type: "number", value: maxTokens, step: 1,
							onChange: (e) => setMaxTokens(e.target.value),
							onBlur: (e) => commitNum("maxTokens", e.target.value),
						}),
						React.createElement("div", { className: "jq-range" }, "64–4096"),
					),
					React.createElement("div", { className: "jq-grid-item" },
						React.createElement("div", { className: "jq-grid-label" }, "温度"),
						React.createElement("input", {
							className: "jq-input", type: "number", value: temperature, step: 0.05,
							onChange: (e) => setTemperature(e.target.value),
							onBlur: (e) => commitNum("temperature", e.target.value),
						}),
						React.createElement("div", { className: "jq-range" }, "0–2 · 步进 0.05"),
					),
				),
			);
		}

		function RouteCard(props) {
			const { state, call, onState } = props;
			const routes = (state && state.routes) || [];
			const routeOrder = (state && state.config && state.config.routeOrder) || [];
			const [dragKey, setDragKey] = React.useState(null);
			const [overKey, setOverKey] = React.useState(null); // 当前悬停目标(虚线高亮)
			const [localRoutes, setLocalRoutes] = React.useState(null);
			const overKeyRef = React.useRef(null);
			const rowRefs = React.useRef({}); // key -> DOM 元素(FLIP 测量用)
			const prevTops = React.useRef({}); // key -> 上次 offsetTop(FLIP First 帧)
			const list = localRoutes || routes;
			const keyOf = (r) => routeKey(r.provider, r.id);
			// state 变化(提交成功/启停/重扫)后丢弃本地拖拽态
			React.useEffect(() => {
				setLocalRoutes(null); setDragKey(null); setOverKey(null); overKeyRef.current = null;
				prevTops.current = {};
			}, [state]);
			// FLIP 让位动画:重排后从旧位置平滑滑动到新位置
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
					void el.offsetHeight; // 强制 reflow,让位移先生效
					el.style.transition = "transform .22s ease";
					el.style.transform = "translateY(0)";
				}
				prevTops.current = tops;
			}, [list]);
			const commitOrder = (ordered) => {
				call("taishan/panel/update", { patch: { routeOrder: ordered.map(keyOf) } })
					.then((res) => { if (res && res.version) onState(res); setLocalRoutes(null); })
					.catch(() => setLocalRoutes(null));
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
				const from = list.findIndex((r) => keyOf(r) === dragKey);
				const to = list.findIndex((r) => keyOf(r) === key);
				if (from < 0 || to < 0) return;
				const next = list.slice();
				const [moved] = next.splice(from, 1);
				next.splice(to, 0, moved);
				setLocalRoutes(next);
			};
			const onDrop = (e) => { e.preventDefault(); overKeyRef.current = null; setOverKey(null); };
			const onDragEnd = () => {
				overKeyRef.current = null;
				setDragKey(null);
				setOverKey(null);
				if (localRoutes && localRoutes !== routes) commitOrder(localRoutes);
				else setLocalRoutes(null);
			};
			const manual = Array.isArray(routeOrder) && routeOrder.length > 0;
			const nodes = list.map((r, i) => {
				const key = keyOf(r);
				return React.createElement(React.Fragment, { key },
					i > 0 && React.createElement("div", { className: "jq-route-arrow" }, "↓"),
					React.createElement("div", {
						className: "jq-route-node" +
							(dragKey === key ? " jq-dragging" : "") +
							(overKey === key && dragKey !== key ? " jq-drag-over" : ""),
						draggable: true,
						ref: (el) => { if (el) rowRefs.current[key] = el; },
						onDragStart: (e) => onDragStart(e, key),
						onDragOver: (e) => onDragOver(e, key),
						onDrop,
						onDragEnd,
						title: "拖动调整调用顺序",
					},
						React.createElement("span", { className: "jq-route-num" }, String(i + 1)),
						React.createElement("span", { className: "jq-model-name" }, r.id),
						React.createElement("span", { className: "jq-model-prov" }, r.provider),
						React.createElement("span", { className: "jq-model-cost" }, fmtCost(r.cost)),
						React.createElement("span", { className: "jq-route-handle" }, "⠿"),
					),
				);
			});
			return React.createElement("div", { className: "jq-card" },
				React.createElement("div", { className: "jq-card-head" },
					React.createElement("span", { className: "jq-card-title" }, "识图路由"),
					React.createElement("span", { className: "jq-tag" }, manual ? "手动排序 · 拖动调整" : "按性价比自动排序 · 可拖动调整"),
					manual && React.createElement("button", {
						className: "jq-btn jq-btn-ghost jq-btn-sm", title: "恢复按性价比自动排序",
						onClick: () => commitOrder([]),
					}, "恢复自动排序"),
				),
				routes.length === 0
					? React.createElement("div", { className: "jq-placeholder" }, "没有激活的路由(模型未启用或已停用)")
					: nodes,
				React.createElement("div", { className: "jq-route-note" },
					"按顺序尝试,失败自动回退下一个;拖动可调序,不拖则按性价比排列。"),
			);
		}

		function CredentialCard(props) {
			const { state, call, onState } = props;
			const cred = (state && state.credential) || {};
			const [value, setValue] = React.useState("");
			const [show, setShow] = React.useState(false);
			const [toast, setToast] = React.useState(null);
			const toastTimer = React.useRef(null);
			const showToast = (kind, text) => {
				setToast({ kind, text });
				if (toastTimer.current) clearTimeout(toastTimer.current);
				toastTimer.current = setTimeout(() => setToast(null), kind === "ok" ? 3000 : 4500);
			};
			const save = () => {
				const v = (value || "").trim();
				if (!v) { showToast("err", "请输入 API Key"); return; }
				call("taishan/panel/credential", { value: v })
					.then((res) => {
						if (res && res.error) { showToast("err", res.error); return; }
						setValue("");
						setShow(false);
						if (res && res.version) onState(res);
						showToast("ok", "API Key 已保存,凭据立即生效");
					})
					.catch((e) => showToast("err", String(e && e.message ? e.message : e)));
			};
			const clear = () => {
				call("taishan/panel/credential", { clear: true })
					.then((res) => {
						if (res && res.error) { showToast("err", res.error); return; }
						setValue("");
						setShow(false);
						if (res && res.version) onState(res);
						showToast("ok", "API Key 已清除");
					})
					.catch((e) => showToast("err", String(e && e.message ? e.message : e)));
			};
			const canSave = (value || "").trim() !== "";
			return React.createElement("div", { className: "jq-card" },
				React.createElement("div", { className: "jq-card-head" },
					React.createElement("span", { className: "jq-card-title" }, "API Key"),
					React.createElement("span", { className: "jq-tag" }, "仅本地保存"),
					cred.configured
						? React.createElement("span", { className: "jq-badge jq-badge-success jq-badge-dot" },
							React.createElement("span", { className: "jq-dot" }),
							"已配置")
						: React.createElement("span", { className: "jq-badge jq-badge-subtle jq-badge-dot" },
							React.createElement("span", { className: "jq-dot jq-dot-off" }),
							"未配置"),
				),
				toast && React.createElement("div", { className: "jq-toast jq-toast-" + (toast.kind === "ok" ? "ok" : "err") }, toast.text),
				React.createElement("div", { className: "jq-hint jq-hint-block" },
					"密钥存于本机凭据文件,不回显明文;留空保存不改动现有 Key。"),
				React.createElement("div", { className: "jq-cred-row" },
					React.createElement("input", {
						className: "jq-cred-input", type: show ? "text" : "password", value: value,
						autoComplete: "off", spellCheck: false,
						placeholder: cred.configured ? "已配置,粘贴新 Key 可覆盖" : "粘贴 API Key",
						onChange: (e) => setValue(e.target.value),
						onKeyDown: (e) => { if (e.key === "Enter") save(); },
					}),
					React.createElement("button", {
						className: "jq-btn-eye", title: show ? "隐藏密钥" : "显示密钥",
						onClick: () => setShow(!show),
					}, show ? "🙈" : "👁"),
					React.createElement("button", {
						className: "jq-btn jq-btn-primary", onClick: save, disabled: !canSave,
					}, cred.configured ? "更新" : "保存"),
					React.createElement("button", { className: "jq-btn jq-btn-ghost", onClick: clear, disabled: !cred.configured }, "清除"),
				),
			);
		}

		function ModelsCard(props) {
			const { state, call, onState } = props;
			const scan = (state && state.scan) || {};
			const recommended = (state && state.recommended) || [];
			const vision = scan.visionModels || [];
			const routesEnabled = (state && state.config && state.config.routesEnabled) || {};
			const recSet = new Set(recommended);
			const toggle = (v) => {
				const key = routeKey(v.provider, v.id);
				const patch = {};
				patch[key] = !(routesEnabled[key] !== false);
				call("taishan/panel/update", { patch: { routesEnabled: patch } })
					.then((res) => { if (res && res.version) onState(res); })
					.catch(() => {});
			};
			const rescan = () => {
				call("taishan/panel/rescan", {})
					.then((res) => { if (res && res.version) onState(res); })
					.catch(() => {});
			};
			const rows = vision.map((v) => {
				const key = routeKey(v.provider, v.id);
				const on = routesEnabled[key] !== false;
				const cred = v.credential || {};
				const isRec = recSet.has(v.provider + "/" + v.id);
				return React.createElement("div", { key, className: "jq-model-row", onClick: () => toggle(v), title: "点击" + (on ? "停用" : "启用") + " " + v.provider + "/" + v.id },
					React.createElement("button", { className: "jq-switch" + (on ? " jq-on" : ""), onClick: (e) => { e.stopPropagation(); toggle(v); } },
						React.createElement("span", { className: "jq-knob" })),
					isRec && React.createElement("span", { className: "jq-star" }, "★"),
					React.createElement("span", { className: "jq-model-name" }, v.id),
					React.createElement("span", { className: "jq-model-prov" }, v.provider),
					cred.configured
						? React.createElement("span", { className: "jq-key" }, "Key:已配置 ✅")
						: React.createElement("span", { className: "jq-key jq-key-missing" }, "Key:未配置 ❌"),
				);
			});
			return React.createElement("div", { className: "jq-card" },
				React.createElement("div", { className: "jq-card-head" },
					React.createElement("span", { className: "jq-card-title" }, "模型检测结果"),
					React.createElement("span", { className: "jq-tag" }, "开关启停"),
					React.createElement("button", {
						className: "jq-btn jq-btn-ghost jq-btn-sm", title: "立即重新扫描模型列表",
						onClick: rescan,
					}, "重新扫描"),
				),
				React.createElement("div", { className: "jq-providers" },
					"提供方:", (scan.providers || []).map((p) => React.createElement("span", { key: p, className: "jq-chip" }, p)),
				),
				React.createElement("div", { className: "jq-section-title" }, "视觉模型(★=推荐 · 按性价比排序)"),
				vision.length === 0
					? React.createElement("div", { className: "jq-placeholder" }, "未扫描到支持识图功能的模型")
					: rows,
			);
		}

		function StatusCard(props) {
			const { state } = props;
			const scan = (state && state.scan) || {};
			const runtime = (state && state.runtime) || {};
			return React.createElement("div", { className: "jq-card" },
				React.createElement("div", { className: "jq-card-head" },
					React.createElement("span", { className: "jq-card-title" }, "状态总览"),
					React.createElement("span", { className: "jq-tag" }, "运行状态"),
					React.createElement("span", { className: "jq-badge jq-badge-success jq-badge-dot" },
						React.createElement("span", { className: "jq-dot" }),
						"运行中 · " + ((state && state.version) || "v2.0")),
					runtime.wrapActive
						? React.createElement("span", { className: "jq-badge jq-badge-success" }, "图片通道:已开启 ✅")
						: React.createElement("span", { className: "jq-badge jq-badge-subtle" }, "图片通道:未开启"),
				),
				React.createElement("div", { className: "jq-info-line" },
					"上次扫描:", " ",
					React.createElement("b", null, fmtTime(scan.scannedAt)),
					" · ", React.createElement("b", null, String((scan.providers || []).length)), " 提供方 · ",
					React.createElement("b", null, String((scan.visionModels || []).length)), " 视觉模型",
					"（重扫需手动触发）",
				),
			);
		}

		function Panel() {
			const [state, setState] = React.useState(null);
			const [phase, setPhase] = React.useState("loading");
			const [error, setError] = React.useState(null);
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
			}, [call]);
			React.useEffect(() => { load(); }, [load]);
			if (phase === "loading") {
				return React.createElement("div", { className: "jq-root" },
					React.createElement("div", { className: "jq-card" },
						React.createElement("div", { className: "jq-loading" }, "泰山识图面板加载中…"),
					),
				);
			}
			if (phase === "error") {
				return React.createElement("div", { className: "jq-root" },
					React.createElement("div", { className: "jq-error-box" },
						React.createElement("div", null, "面板加载失败:" + error),
						React.createElement("button", { className: "jq-btn jq-btn-primary", onClick: load }, "重试"),
					),
				);
			}
			return React.createElement("div", { className: "jq-root" },
				React.createElement(StatusCard, { state }),
				React.createElement(CredentialCard, { state, call, onState: setState }),
				React.createElement(ModelsCard, { state, call, onState: setState }),
				React.createElement(RouteCard, { state, call, onState: setState }),
				React.createElement(ConfigCard, { state, call, onState: setState }),
				React.createElement(LogCard, { state, call }),
			);
		}
		//#endregion

		//#region plugin body
		const inject = ["slots"];

		/**
		 * Client plugin body: register the settings section.
		 * @param ctx - client root context.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "taishan-vision",
				order: 25,
				label: "泰山识图",
			}, Panel)), "taishan: settings section");
		}
		//#endregion

		exports.apply = apply;
		exports.inject = inject;
		exports.Panel = Panel;
		return module.exports;
	}
});
