(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "66ebc7cf-c77b-438d-9984-f5de4967648d", e._sentryDebugIdIdentifier = "sentry-dbid-66ebc7cf-c77b-438d-9984-f5de4967648d");
	} catch {}
})();
import { ActionSpinner as e, AnimatedNumber as t, BackgroundIssues as n, Button as r, Chip as i, DataTableFooter as a, Disclosure as o, DownloadsPanel as s, EmptyState as c, Gg as l, HN as u, IndexSearch as d, IssueRow as f, LinkButton as p, NameLink as m, Note as h, OV as g, ProcessingMode as _, QueryErrorNote as v, RUNNING_POLL_MS as y, TASKS_KEY as b, TRIGGER_LABELS as x, TaskIcon as S, TaskProgress as C, TaskStage as w, __toESM as T, activityKind as E, apiGet as D, busyProps as O, cardClass as ee, codedText as te, confirmModal as ne, controlTask as k, cx as A, elapsedText as j, errorMessage as M, fetchTasks as re, fmtSize as ie, foldByKind as ae, foldRoutine as oe, followupDetail as se, followupTally as N, groupFollowups as ce, hasResultProblems as P, i2 as le, interfaceLanguage as ue, isActive as F, isRoutine as de, latestOfKind as fe, momentText as I, pollInterval as pe, problemDestination as me, progressLabel as he, progressText as L, readableErrorHeadline as R, require_jsx_runtime as ge, require_react as _e, runError as z, setTaskSpeed as ve, statusLabel as ye, summaryItems as be, t as B, taskIssues as xe, taskName as V, taskRunSectionsSkeleton as Se, taskSubject as H, uo as Ce, useMutation as U, useMutationState as we, useQuery as W, useQueryClient as Te, withBackoff as Ee } from "./peach-app.js";
import { CodeBlock as De } from "./peach-app.code-block-BdQewVJ0.js";
import { Page as Oe } from "./peach-app.page-QAncjzM1.js";
import { ErrorDetails as ke, ErrorExcerpt as Ae } from "./peach-app.error-excerpt-Ugft6I5o.js";
// src/react/activity/task-controls.tsx
var G = /* @__PURE__ */ T(_e(), 1), K = ge(), q = ["task-control"], je = {
	pause: g,
	resume: l,
	cancel: u
}, Me = {
	pause: B("manage:shared.pause"),
	resume: B("manage:shared.resume"),
	cancel: B("manage:taskControls.cancelTask")
}, Ne = {
	pause: B("manage:taskControls.pauseFollowups"),
	resume: B("manage:taskControls.resumeFollowups"),
	cancel: B("manage:taskControls.cancelFollowups")
}, Pe = (0, G.createContext)(null);
function Fe({ command: e, error: t, className: n }) {
	let r = (e.followups ? Ne : Me)[e.action];
	return /* @__PURE__ */ (0, K.jsx)(h, {
		tone: "error",
		className: n,
		title: B("manage:taskControls.actionFailed", {
			task: e.label,
			action: r
		}),
		children: M(t)
	});
}
function Ie({ children: e }) {
	let [t, n] = (0, G.useState)(() => /* @__PURE__ */ new Set()), r = (0, G.useCallback)((e) => (n((t) => new Set(t).add(e)), () => n((t) => {
		let n = new Set(t);
		return n.delete(e), n;
	})), []), i = we({
		filters: { mutationKey: q },
		select: (e) => ({
			id: e.mutationId,
			command: e.state.variables,
			status: e.state.status,
			error: e.state.error
		})
	}), a = /* @__PURE__ */ new Map();
	for (let e of i) {
		let t = e.command;
		if (!t) continue;
		let n = a.get(t.id);
		(!n || n.id < e.id) && a.set(t.id, {
			...e,
			command: t
		});
	}
	let o = new Map([...a].filter(([, e]) => e.status === "error")), s = [...o.values()].filter(({ command: e }) => e.action === "cancel" || !t.has(e.id));
	return /* @__PURE__ */ (0, K.jsxs)(Pe.Provider, {
		value: {
			failed: o,
			registerInline: r
		},
		children: [s.length ? /* @__PURE__ */ (0, K.jsx)("div", {
			"data-task-control-feedback": "",
			className: "flex min-w-0 flex-col gap-2",
			children: s.map((e) => /* @__PURE__ */ (0, K.jsx)(Fe, { ...e }, e.command.id))
		}) : null, e]
	});
}
function Le({ run: t, runs: n = [t], visible: i = !0 }) {
	let a = (0, G.useContext)(Pe), o = Te(), s = (0, G.useRef)({
		change: !1,
		cancel: !1,
		confirmation: !1
	}), c = () => {
		o.invalidateQueries({ queryKey: b });
	}, l = async (e) => {
		let t = null;
		for (let r of n) try {
			await k(r.id, e.action);
		} catch (e) {
			t ??= e;
		}
		if (t !== null) throw t;
	}, u = U({
		mutationKey: [
			...q,
			t.id,
			"change"
		],
		mutationFn: l,
		onSettled: () => {
			s.current.change = !1, c();
		}
	}), d = U({
		mutationKey: [
			...q,
			t.id,
			"cancel"
		],
		mutationFn: l,
		onSettled: () => {
			s.current.cancel = !1, c();
		}
	}), f = U({
		mutationFn: async (e) => {
			let t = (await Promise.allSettled(n.map((t) => ve(t.id, e)))).find((e) => e.status === "rejected");
			if (t?.status === "rejected") throw t.reason;
		},
		onSettled: c
	}), p = (t.control?.actions || []).filter((e) => e !== "set_speed"), m = !!(t.control?.actions.includes("set_speed") && t.control.speed_mode), g = !F(t), v = d.isPending || d.isSuccess, y = !!p.length || m, x = a?.failed.get(t.id), S = i && y, C = a?.registerInline;
	if ((0, G.useLayoutEffect)(() => {
		if (S) return C?.(t.id);
	}, [
		S,
		C,
		t.id
	]), !y) return null;
	let w = (e) => {
		let r = {
			id: t.id,
			label: V(t),
			action: e,
			followups: g
		};
		if (e === "cancel") {
			if (s.current.cancel || s.current.confirmation || d.isSuccess) return;
			s.current.confirmation = !0, ne({
				title: B(g ? "manage:taskControls.cancelFollowupsTitle" : "manage:taskControls.cancelTaskTitle", { task: V(t) }),
				body: g ? n.length > 1 ? B("manage:taskControls.cancelBatchFollowupsBody", { count: n.length }) : B("manage:taskControls.cancelFollowupsBody") : B("manage:taskControls.cancelTaskBody"),
				confirmLabel: B(g ? "manage:taskControls.cancelFollowups" : "manage:shared.cancelTask"),
				danger: !0,
				onConfirm: async () => (s.current.cancel = !0, await d.mutateAsync(r))
			}).finally(() => {
				s.current.confirmation = !1;
			});
		} else {
			if (s.current.change || s.current.cancel || v) return;
			s.current.change = !0, u.mutate(r);
		}
	};
	return /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "ml-auto min-w-0",
		"data-task-controls": t.id,
		children: [
			/* @__PURE__ */ (0, K.jsxs)("div", {
				role: "group",
				"aria-label": B(g ? "manage:taskControls.followupsGroupLabel" : "manage:taskControls.groupLabel", { task: V(t) }),
				className: "flex flex-wrap items-center justify-end gap-2",
				children: [m ? /* @__PURE__ */ (0, K.jsx)(_, {
					value: t.control.speed_mode,
					busy: f.isPending || v,
					animate: t.control?.state === "running",
					onChange: (e) => f.mutate(e)
				}) : null, p.map((t) => {
					let n = (g ? Ne : Me)[t], i = t === "cancel" ? d.isPending : u.isPending && u.variables?.action === t, a = t === "cancel" ? v : u.isPending || v;
					return /* @__PURE__ */ (0, K.jsx)(r, {
						type: "button",
						variant: "secondary",
						size: "small",
						leadingIcon: i ? e : je[t],
						"aria-label": n,
						title: n,
						...O(i),
						"aria-disabled": a || void 0,
						onClick: () => w(t),
						children: /* @__PURE__ */ (0, K.jsx)("span", {
							"data-copy-key": `tasks.control.action.${g ? "followups." : ""}${t}`,
							children: n
						})
					}, t);
				})]
			}),
			S && x && x.command.action !== "cancel" ? /* @__PURE__ */ (0, K.jsx)(Fe, {
				...x,
				className: "mt-2"
			}) : null,
			f.error ? /* @__PURE__ */ (0, K.jsx)(h, {
				tone: "error",
				children: M(f.error)
			}) : null
		]
	});
}
// src/react/activity/resource-chip.tsx
var Re = {
	blue: "bg-status-blue-text text-background-primary-default",
	purple: "bg-status-purple-text text-background-primary-default",
	cyan: "bg-status-cyan-text text-background-primary-default"
};
function ze({ color: e, high: t, ...n }) {
	return t ? /* @__PURE__ */ (0, K.jsx)("span", {
		...n,
		className: A("inline-flex items-center justify-center rounded-md px-1.5 py-1 whitespace-nowrap text-caption-1-medium", Re[e])
	}) : /* @__PURE__ */ (0, K.jsx)(i, {
		variant: "caption",
		color: e,
		...n
	});
}
// src/react/activity/task-resources.tsx
var Be = {
	cpu: {
		name: "CPU",
		color: "blue"
	},
	gpu: {
		name: "GPU",
		color: "purple"
	},
	network: {
		name: B("manage:taskResources.network"),
		color: "cyan"
	}
};
function Ve(e) {
	return e.state === "sampling" ? B("manage:taskResources.sampling") : e.via === "cloud" ? B("manage:taskResources.viaCloudDrive") : B("manage:taskResources.unavailable");
}
function He(e, t) {
	return t === 0 ? B("manage:taskResources.idle") : e === "network" ? `${ie(t)}/s` : `${t.toLocaleString(ue, { maximumFractionDigits: 1 })}%`;
}
function J({ run: e, active: n = F(e) || !!e.control }) {
	if (!n || !e.resources) return null;
	let r = e.resources;
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-task-resources": e.id,
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			"cpu",
			"gpu",
			"network"
		].map((e) => {
			let n = r[e], i = Be[e], a = e === "network" ? r.network.bytes_per_second : r[e].percent, o = n.state === "ready" && a !== null, s = o && n.high, c = o ? He(e, a) : Ve(n), l = [n.reason ? te(n, "reason") : "", s ? B("manage:taskResources.highUsage") : ""].filter(Boolean).join("\n");
			return /* @__PURE__ */ (0, K.jsx)(ze, {
				color: i.color,
				high: s,
				tabIndex: l ? 0 : void 0,
				title: l || void 0,
				"data-task-resource": e,
				"data-resource-state": n.state,
				"data-resource-via": n.via,
				"data-resource-high": s || void 0,
				"data-resource-idle": o && a === 0 || void 0,
				"data-copy-ignore": "",
				children: /* @__PURE__ */ (0, K.jsxs)("span", {
					className: "inline-flex items-baseline gap-1",
					children: [
						/* @__PURE__ */ (0, K.jsx)("span", { children: i.name }),
						" ",
						o && a !== 0 ? /* @__PURE__ */ (0, K.jsx)(t, { value: c }) : /* @__PURE__ */ (0, K.jsx)("span", { children: c })
					]
				})
			}, e);
		})
	});
}
// src/react/activity/activity-page.tsx
var Ue = Ee(pe), We = (e) => Ee(() => e ? y : !1), Ge = /* @__PURE__ */ new Set(["upgrade-repairs"]), Ke = /* @__PURE__ */ new Set(["asset_id", "name"]), qe = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "rose",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
}, Je = {
	running: B("manage:taskStatus.running"),
	pausing: B("manage:taskStatus.pausing"),
	paused: B("manage:taskStatus.paused"),
	cancelling: B("manage:taskStatus.canceling")
};
function Y({ run: e }) {
	let t = e.control?.state;
	if (t && (t !== "running" || !F(e))) return /* @__PURE__ */ (0, K.jsx)(i, {
		color: t === "running" ? "blue" : "neutral",
		children: /* @__PURE__ */ (0, K.jsx)("span", {
			"data-copy-key": `tasks.control.state.${t}`,
			children: Je[t]
		})
	});
	let n = e.status === "failed" && e.task_key === "library-processing" && e.result_summary?.outcome === "partial", r = n || e.status === "succeeded" && P(e);
	return /* @__PURE__ */ (0, K.jsx)(i, {
		color: r ? "yellow" : qe[e.status] ?? "neutral",
		children: n ? B("manage:taskStatus.partial") : r ? B("manage:taskStatus.issuesFound") : ye(e.status)
	});
}
function Ye({ rows: e, visible: t }) {
	let [n, r] = (0, G.useState)({
		pageIndex: 0,
		pageSize: 20
	}), { pageSize: i } = n, s = Math.min(n.pageIndex, Math.max(0, Math.ceil(e.length / i) - 1));
	return /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("ul", {
		className: "-mr-5 flex min-w-0 flex-col",
		children: e.slice(s * i, (s + 1) * i).map((e) => {
			let n = se(e);
			return /* @__PURE__ */ (0, K.jsxs)("li", {
				"data-status": e.status,
				"data-followup-key": e.followup_key,
				className: "flex min-w-0 flex-col gap-1 border-t border-separator-border py-2.5 pr-10 pl-5",
				children: [
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "flex min-w-0 flex-1 basis-40 flex-wrap items-center gap-x-2 gap-y-1",
							children: [
								/* @__PURE__ */ (0, K.jsx)(S, {
									taskKey: e.task_key,
									className: "size-4 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, K.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-primary",
									children: V(e)
								}),
								/* @__PURE__ */ (0, K.jsx)(Y, { run: e }),
								n ? /* @__PURE__ */ (0, K.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
									children: n
								}) : null
							]
						}), /* @__PURE__ */ (0, K.jsx)(Le, {
							run: e,
							visible: t
						})]
					}),
					/* @__PURE__ */ (0, K.jsx)(J, { run: e }),
					Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, K.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, K.jsx)(o, {
							findable: !0,
							summary: B("manage:taskCenter.technicalDetails"),
							contentClassName: "pb-2.5",
							children: /* @__PURE__ */ (0, K.jsx)(De, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: B("manage:taskCenter.taskTechnicalDetails", { task: V(e) })
							})
						})
					}) : null
				]
			}, e.id);
		})
	}), /* @__PURE__ */ (0, K.jsx)(a, {
		label: B("manage:taskCenter.taskDetails"),
		total: e.length,
		pagination: {
			...n,
			pageIndex: s
		},
		onChange: r
	})] });
}
function X({ run: e, meta: t, progress: n, children: r, error: i, issues: a, followups: s, followupTotal: c = 0, badge: l, resourceActive: u, controlled: d }) {
	let [f, p] = (0, G.useState)(!!s?.some(F)), h = (d || [e]).map((e) => e.id), g = c > (s?.length || 0), _ = W({
		queryKey: [
			...b,
			"followups",
			h
		],
		enabled: f && g,
		queryFn: async ({ signal: e }) => (await Promise.all(h.map((t) => D(`/api/tasks/${t}`, e)))).flatMap((e) => e.followups),
		refetchInterval: We(u)
	}), y = (e) => e.status === "running" ? 3 : e.status === "pending" ? 2 : +(e.status === "failed" || e.status === "interrupted"), x = [...(g ? _.data : void 0) || s || []].sort((e, t) => y(t) - y(e) || t.id - e.id), C = x.length, w = Math.max(s?.length || 0, c), T = H(e), E = String(i || "").trim(), O = R(E);
	return /* @__PURE__ */ (0, K.jsxs)("li", {
		id: `run-${e.id}`,
		"data-status": e.status,
		"data-task-key": e.task_key,
		"data-run-id": e.id,
		className: ee({
			padding: "none",
			bordered: e.status === "failed" ? "error" : void 0,
			className: "flex flex-col"
		}),
		children: [
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "flex flex-col gap-2 px-5 py-4",
				children: [
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "flex min-w-0 flex-1 basis-48 flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, K.jsx)(S, {
									taskKey: e.task_key,
									className: "size-5 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, K.jsx)("strong", {
									className: "min-w-0 break-words text-title-3-medium text-text-primary",
									children: V(e)
								}),
								l ?? /* @__PURE__ */ (0, K.jsx)(Y, { run: e })
							]
						}), /* @__PURE__ */ (0, K.jsx)(Le, {
							run: e,
							runs: d
						})]
					}),
					n,
					/* @__PURE__ */ (0, K.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: t
					}),
					/* @__PURE__ */ (0, K.jsx)(J, {
						run: e,
						active: u
					}),
					T ? /* @__PURE__ */ (0, K.jsx)(m, {
						href: T.href,
						"data-task-subject": e.id,
						title: T.label,
						className: "min-w-0 max-w-full self-start truncate text-text-primary",
						children: T.label
					}) : null,
					O ? /* @__PURE__ */ (0, K.jsx)("p", {
						"data-task-error": "",
						className: "text-caption-1-regular text-text-secondary wrap-anywhere",
						children: O
					}) : null,
					r
				]
			}),
			a ? /* @__PURE__ */ (0, K.jsx)("div", {
				className: "border-t border-separator-border",
				children: a
			}) : null,
			O && E !== O ? /* @__PURE__ */ (0, K.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, K.jsx)(o, {
					row: !0,
					findable: !0,
					summary: B("manage:taskCenter.errorDetails"),
					contentClassName: "pb-5",
					children: /* @__PURE__ */ (0, K.jsx)(ke, {
						label: B("manage:taskCenter.taskErrorDetails", { task: V(e) }),
						children: E
					})
				})
			}) : null,
			w ? /* @__PURE__ */ (0, K.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, K.jsxs)(o, {
					row: !0,
					summary: B("manage:taskCenter.taskDetailsCount", { count: w }),
					contentClassName: "pb-5",
					isOpen: f,
					onOpenChange: p,
					children: [
						_.error ? /* @__PURE__ */ (0, K.jsx)(v, {
							titleKey: "manage:taskCenter.detailLoadFailed",
							query: _
						}) : null,
						C < w ? /* @__PURE__ */ (0, K.jsx)("p", {
							className: "text-caption-1-regular text-text-secondary",
							children: B("manage:taskCenter.showingCount", { count: C })
						}) : null,
						/* @__PURE__ */ (0, K.jsx)(Ye, {
							rows: x,
							visible: f
						})
					]
				})
			}) : null,
			Object.keys(e.result_summary || {}).some((e) => !(T && Ke.has(e))) ? /* @__PURE__ */ (0, K.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, K.jsx)(o, {
					row: !0,
					findable: !0,
					summary: B("manage:taskCenter.technicalDetails"),
					contentClassName: "pb-5",
					children: /* @__PURE__ */ (0, K.jsx)(De, {
						code: JSON.stringify(e.result_summary, null, 2),
						language: "json",
						label: B("manage:taskCenter.taskTechnicalDetails", { task: V(e) })
					})
				})
			}) : null
		]
	});
}
function Xe({ run: e, followups: n, followupTotal: r }) {
	let i = e.progress_total || 0, a = e.progress_current || 0, o = e.control?.state, s = o && o !== "running", c = s ? Je[o] : he(e) || B("manage:taskCenter.inProgress"), l = i > 0 ? B("manage:taskCenter.progressItems", { progress: L(a, i) }) : "", u = `${o || e.status}:${e.progress_params?.stage || e.progress_code || ""}`, d = /* @__PURE__ */ (0, K.jsx)(w, {
		phase: u,
		children: c
	}), f = j(e.elapsed_seconds), p = [x[e.trigger] || e.trigger, f && B("manage:taskCenter.runningFor", { elapsed: f })].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, K.jsx)(X, {
		run: e,
		meta: p,
		followups: n,
		followupTotal: r,
		progress: s && !(i > 0) ? /* @__PURE__ */ (0, K.jsx)("p", {
			"data-copy-key": `tasks.control.state.${o}`,
			className: "text-caption-1-regular text-text-secondary",
			children: c
		}) : /* @__PURE__ */ (0, K.jsx)(C, {
			embedded: !0,
			kind: E(e.task_key, String(e.progress_params?.stage || "") || null),
			label: l ? `${c} · ${l}` : c,
			labelContent: l ? /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
				d,
				" · ",
				/* @__PURE__ */ (0, K.jsx)(t, { value: l })
			] }) : d,
			value: Math.min(a, i),
			total: i
		})
	});
}
function Z({ run: e, followups: t, runs: n, latest: r, followupTotal: a, followupFailed: s = 0, followupCancelled: c = 0 }) {
	let l = !!(n && n.length > 1 && a), u = l ? [B("manage:taskCenter.processedTotal", { count: a }), s ? B("manage:taskCenter.failedCount", { count: s }) : ""].filter(Boolean) : be(H(e) ? {
		...e.result_summary,
		name: ""
	} : e.result_summary).filter((t) => t !== z(e) && t !== R(z(e))), d = xe(e), m = me(e, r), h = j(e.elapsed_seconds), g = n && n.length > 1 ? n[n.length - 1] : void 0, _ = (g ? [
		x[e.trigger] || e.trigger,
		B("manage:taskCenter.lastRuns", { count: n.length }),
		`${I(g.finished_at)} – ${I(e.finished_at)}`
	] : [
		x[e.trigger] || e.trigger,
		I(e.finished_at),
		h && B("manage:taskCenter.took", { elapsed: h })
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, K.jsxs)(X, {
		run: e,
		meta: _,
		error: z(e),
		followups: t,
		followupTotal: a,
		controlled: n,
		issues: d.length ? /* @__PURE__ */ (0, K.jsx)(o, {
			row: !0,
			findable: !0,
			summary: B("manage:taskCenter.issueDetailsCount", { count: d.length }),
			contentClassName: "pb-5",
			children: /* @__PURE__ */ (0, K.jsx)(ke, {
				label: B("manage:taskCenter.issueDetails"),
				children: /* @__PURE__ */ (0, K.jsx)("ul", {
					className: "flex min-w-0 flex-col whitespace-normal",
					"data-task-issues": "",
					children: d.map((e, t) => /* @__PURE__ */ (0, K.jsx)(f, {
						title: /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [e.label, e.provider || e.kind ? /* @__PURE__ */ (0, K.jsxs)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: [" · ", [e.provider, e.kind].filter(Boolean).join(" · ")]
						}) : null] }),
						children: /* @__PURE__ */ (0, K.jsx)(Ae, {
							text: e.error,
							className: "text-caption-1-regular text-text-secondary"
						})
					}, `${e.source}-${t}`))
				})
			})
		}) : void 0,
		badge: c && e.status === "succeeded" ? /* @__PURE__ */ (0, K.jsx)(i, {
			color: "rose",
			children: /* @__PURE__ */ (0, K.jsx)("span", {
				"data-copy-key": `tasks.followups.cancelled.${c === a ? "all" : "partial"}`,
				children: B(c === a ? "manage:taskCenter.followupsCanceled" : "manage:taskCenter.someFollowupsCanceled")
			})
		}) : l && s ? /* @__PURE__ */ (0, K.jsx)(i, {
			color: "yellow",
			children: B("manage:taskStatus.issuesFound")
		}) : void 0,
		children: [
			c ? /* @__PURE__ */ (0, K.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: B("manage:taskCenter.followupsCanceledCount", { count: c })
			}) : null,
			u.length === 1 ? /* @__PURE__ */ (0, K.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: u[0]
			}) : u.length ? /* @__PURE__ */ (0, K.jsx)("ul", {
				className: "flex list-disc flex-col gap-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: u.map((e, t) => /* @__PURE__ */ (0, K.jsx)("li", { children: e }, t))
			}) : null,
			!d.length && P(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, K.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: B("manage:taskCenter.noIssueDetails")
			}) : null,
			m ? /* @__PURE__ */ (0, K.jsx)(p, {
				href: m.href,
				size: "small",
				trailingIcon: le,
				className: "self-start",
				children: m.label
			}) : null
		]
	});
}
function Ze({ runs: e, followups: n, counts: r }) {
	let a = e[0], o = e[e.length - 1], s = N(r, e), c = Math.max(s.total, n.length), l = s.total ? s.settled : n.filter((e) => !F(e)).length, u = s.total ? s.failed : n.filter((e) => e.status === "failed" || e.status === "interrupted").length, d = B("manage:taskCenter.processedProgress", { progress: L(l, c) }), f = u ? B("manage:taskCenter.failedSuffix", { count: u }) : "", p = [
		x[a.trigger] || a.trigger,
		e.length > 1 ? B("manage:taskCenter.batches", { count: e.length }) : "",
		B("manage:taskCenter.startedAt", { time: I(o.started_at || o.finished_at) })
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, K.jsx)(X, {
		run: a,
		meta: p,
		followups: n,
		followupTotal: c,
		resourceActive: !0,
		controlled: e,
		badge: a.control ? /* @__PURE__ */ (0, K.jsx)(Y, { run: a }) : /* @__PURE__ */ (0, K.jsx)(i, {
			color: "blue",
			children: B("manage:taskStatus.running")
		}),
		progress: /* @__PURE__ */ (0, K.jsx)(C, {
			embedded: !0,
			kind: E(a.task_key),
			value: l,
			total: c,
			label: d + f,
			labelContent: /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)(t, { value: d }), f] })
		})
	});
}
function Q({ title: e, action: t, children: n }) {
	let r = (0, G.useId)();
	return /* @__PURE__ */ (0, K.jsxs)("section", {
		"aria-labelledby": r,
		className: "flex min-w-0 flex-col gap-3",
		children: [t ? /* @__PURE__ */ (0, K.jsxs)("div", {
			className: "flex min-w-0 flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, K.jsx)("h3", {
				id: r,
				className: "text-title-2-medium text-text-primary",
				children: e
			}), t]
		}) : /* @__PURE__ */ (0, K.jsx)("h3", {
			id: r,
			className: "text-title-2-medium text-text-primary",
			children: e
		}), n]
	});
}
function $({ live: e = !1, paginate: t = !0, children: n }) {
	let [r, i] = (0, G.useState)({
		pageIndex: 0,
		pageSize: 20
	}), o = G.Children.toArray(n), { pageSize: s } = r, c = Math.min(r.pageIndex, Math.max(0, Math.ceil(o.length / s) - 1));
	return /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("ul", {
		"aria-live": e ? "polite" : void 0,
		className: "flex min-w-0 flex-col gap-3",
		children: t ? o.slice(c * s, (c + 1) * s) : o
	}), t ? /* @__PURE__ */ (0, K.jsx)(a, {
		label: B("manage:taskCenter.taskList"),
		total: o.length,
		pagination: {
			...r,
			pageIndex: c
		},
		onChange: i
	}) : null] });
}
function Qe() {
	return /* @__PURE__ */ (0, K.jsx)(Oe, { children: /* @__PURE__ */ (0, K.jsxs)(Ie, { children: [
		/* @__PURE__ */ (0, K.jsx)(n, {}),
		/* @__PURE__ */ (0, K.jsx)($e, {}),
		/* @__PURE__ */ (0, K.jsx)(s, {})
	] }) });
}
function $e() {
	let [e, t] = (0, G.useState)(1), [n, r] = (0, G.useState)(20), [i, o] = (0, G.useState)(""), s = W({
		queryKey: e === 1 && n === 20 && !i ? b : [
			...b,
			"page",
			e,
			n,
			i
		],
		queryFn: ({ signal: t }) => re(t, e, n, i),
		refetchInterval: Ue,
		placeholderData: (e) => e
	}), [l, u] = (0, G.useState)(s.data);
	s.data && s.data !== l && u(s.data);
	let f = s.data || l;
	if (!f) return s.error ? /* @__PURE__ */ (0, K.jsx)(v, {
		titleKey: "manage:taskCenter.loadFailed",
		query: s
	}) : /* @__PURE__ */ (0, K.jsx)("div", {
		role: "status",
		"aria-label": B("manage:manageSkeleton.loadingPage"),
		"data-skeleton": "",
		children: /* @__PURE__ */ (0, K.jsx)("div", {
			className: "flex flex-col gap-8",
			inert: !0,
			"aria-hidden": "true",
			dangerouslySetInnerHTML: { __html: Se() }
		})
	});
	let p = f.finished || [], m = f.working_parents || [], g = [
		...f.running || [],
		...f.skipped || [],
		...p,
		...m
	], _ = ce(g), y = new Set(g.map((e) => e.id)), x = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && y.has(e.parent_run_id))), S = x(p), C = f.followup_counts || {}, w = (e) => e.flatMap((e) => _.get(e.id) || []), T = [...S, ...x(m)].filter((e) => N(C, [e]).active > 0 || _.get(e.id)?.some(F)).sort((e, t) => t.id - e.id), E = x(f.running || []), D = x(f.skipped || []), O = S.filter((e) => !T.includes(e) && !D.some((t) => t.id === e.id)), ee = (e) => (_.get(e.id) || []).every((e) => e.status === "succeeded" && !P(e)) && N(C, [e]).failed === 0, te = oe(O, (e) => de(e) && (ee(e) || Ge.has(e.task_key))), ne = ae(T, (e) => e.control?.state || "").sort((e, t) => t.run.id - e.run.id), k = fe(g), A = !E.length && !T.length && !D.length && !O.length && !i;
	return /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
		s.error ? /* @__PURE__ */ (0, K.jsx)(v, {
			titleKey: "manage:taskCenter.loadFailed",
			query: s
		}) : null,
		f.available === !1 ? /* @__PURE__ */ (0, K.jsx)(h, {
			tone: "warning",
			children: f.message || B("manage:taskCenter.tableNotReady")
		}) : null,
		A ? /* @__PURE__ */ (0, K.jsx)(c, {
			icon: Ce,
			title: B("manage:taskCenter.emptyTitle"),
			children: B("manage:taskCenter.emptyText")
		}) : /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
			/* @__PURE__ */ (0, K.jsx)(Q, {
				title: B("manage:taskCenter.inProgress"),
				children: E.length || T.length ? /* @__PURE__ */ (0, K.jsxs)($, {
					live: !0,
					children: [E.map((e) => /* @__PURE__ */ (0, K.jsx)(Xe, {
						run: e,
						followups: _.get(e.id),
						followupTotal: N(C, [e]).total
					}, e.id)), ne.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, K.jsx)(Ze, {
						runs: t,
						followups: w(t),
						counts: C
					}, e.id))]
				}) : /* @__PURE__ */ (0, K.jsx)(h, {
					tone: "neutral",
					children: B("manage:taskCenter.noneRunning")
				})
			}),
			D.length ? /* @__PURE__ */ (0, K.jsx)(Q, {
				title: B("manage:taskCenter.skipped"),
				children: /* @__PURE__ */ (0, K.jsx)($, { children: D.map((e) => /* @__PURE__ */ (0, K.jsx)(Z, {
					run: e,
					latest: k.has(e.id),
					followups: _.get(e.id)
				}, e.id)) })
			}) : null,
			O.length || f.finished_total || i ? /* @__PURE__ */ (0, K.jsxs)(Q, {
				title: B("manage:taskCenter.recentlyCompleted"),
				action: /* @__PURE__ */ (0, K.jsx)(d, {
					label: B("manage:taskCenter.search"),
					value: i,
					onQuery: (e) => {
						o(e), t(1);
					}
				}),
				children: [
					i && !f.finished_total ? /* @__PURE__ */ (0, K.jsx)(h, {
						tone: "neutral",
						children: B("manage:taskCenter.noMatches")
					}) : null,
					O.length ? /* @__PURE__ */ (0, K.jsx)($, {
						paginate: !1,
						children: te.map(({ run: e, runs: t }) => {
							let n = N(C, t);
							return /* @__PURE__ */ (0, K.jsx)(Z, {
								run: e,
								runs: t,
								latest: k.has(e.id),
								followups: w(t),
								followupTotal: n.total,
								followupFailed: n.failed,
								followupCancelled: n.cancelled
							}, e.id);
						})
					}) : null,
					/* @__PURE__ */ (0, K.jsx)(a, {
						label: B("manage:taskCenter.recentlyCompleted"),
						total: f.finished_total ?? S.length,
						unit: B("manage:taskCenter.footerUnit"),
						pageUnit: B("manage:taskCenter.footerPageUnit"),
						pagination: {
							pageIndex: (f.finished_page || e) - 1,
							pageSize: n
						},
						onChange: (i) => {
							i.pageIndex + 1 === e && i.pageSize === n ? s.refetch() : (t(i.pageIndex + 1), r(i.pageSize));
						}
					})
				]
			}) : null
		] })
	] });
}
export { Qe as ActivityPage };

//# debugId=66ebc7cf-c77b-438d-9984-f5de4967648d