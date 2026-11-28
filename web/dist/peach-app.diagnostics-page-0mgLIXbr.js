(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "742c2573-a24b-4fb5-b9fc-8bf951747f1c", e._sentryDebugIdIdentifier = "sentry-dbid-742c2573-a24b-4fb5-b9fc-8bf951747f1c");
	} catch {}
})();
import { ActionSpinner as e, ApiError as t, BC as n, Button as r, ButtonLink as i, Chip as a, DIAGNOSTICS_KEY as o, DataTable as s, Disclosure as c, EmptyState as l, Fact as u, FactList as d, Fieldset as f, FieldsetTitle as p, Gg as m, Input as h, ItemLibrary as g, LOC as _, LinkButton as v, Note as y, QueryErrorNote as b, Section as x, SectionToc as S, SettingsCard as C, SiteMark as w, Stack as T, StartupCapture as E, TaskProgress as D, Xt as ee, Yt as te, __toESM as O, activityKind as k, apiGet as A, apiSend as j, busyProps as M, checkText$1 as N, codedText as P, configurationSection as F, cx as I, diagnosticHeaders as L, diagnosticsSkeleton as R, errorMessage as z, fetchDiagnostics as B, fmtDur as ne, fmtSize as re, interfaceLanguage as ie, queryClient as ae, require_jsx_runtime as oe, require_react as se, settingsPath as ce, stageText as V, t as H, tl as le, useAction as U, useLibraryFilterOptions as ue, useLibraryTints as de, useQuery as W, useQueryClient as fe, withBackoff as pe } from "./peach-app.js";
import { ErrorExcerpt as me } from "./peach-app.error-excerpt-Ugft6I5o.js";
import { useCheckReceipt as he } from "./peach-app.use-check-receipt-CVw_ZYdx.js";
// src/react/diagnostics/health-list.tsx
var G = /* @__PURE__ */ O(se(), 1), K = oe(), q = (e) => e.title || e.name || e.code || H("manage:healthList.videoFallback", { id: e.id }), ge = (e, t) => [[
	H("manage:shared.video"),
	H("manage:shared.code"),
	H("manage:shared.fileName"),
	H("manage:shared.library"),
	H("manage:shared.path"),
	H("manage:healthList.durationSeconds"),
	H("manage:healthList.sizeBytes")
], ...e.map((e) => [
	q(e),
	e.code ?? "",
	e.name,
	t(e),
	e.path,
	e.duration ?? "",
	e.size ?? ""
])].map((e) => e.map((e) => String(e ?? "").replace(/[\t\r\n]+/g, " ")).join("	")).join("\n");
function _e({ group: e, groupKey: t, openItem: i, receipt: a }) {
	let [u, d] = (0, G.useState)({}), [f, p] = (0, G.useState)(!1), h = fe(), x = JSON.stringify(u), S = W({
		queryKey: [
			"diagnostics-library",
			t,
			x,
			f
		],
		enabled: f || x !== "{}",
		queryFn: ({ signal: e }) => A(`/api/diagnostics/library?${new URLSearchParams({
			group: t,
			column_filters: x,
			view: f ? "ignored" : "active"
		})}`, e)
	}), C = S.data ?? (f ? {
		...e,
		items: [],
		count: e.ignored_count ?? 0
	} : e), w = ue(), E = U(), D = P(C, "label"), [O, k] = (0, G.useState)([]), N = de({ names: !0 }), F = (e) => N.get(e.library_id || "")?.name || _[e.location] || e.location, I = (e) => void E.run("copy", () => navigator.clipboard.writeText(ge(e, F)), () => a(H("manage:healthList.copied"))), L = (e) => void E.run("ignore", async (n) => {
		await j("/api/diagnostics/library/ignored", {
			group: t,
			ids: e.map((e) => e.id),
			ignore: !f
		}, "POST", n), k([]), await Promise.all([h.invalidateQueries({ queryKey: o }), h.invalidateQueries({ queryKey: ["diagnostics-library", t] })]);
	}, () => a(H(f ? "manage:healthList.restored" : "manage:healthList.ignored"))), R = H(f ? "manage:healthList.restoreIssue" : "manage:healthList.ignoreIssue"), z = [
		{
			id: "title",
			label: H("manage:shared.video"),
			value: q,
			width: 172,
			min: 160,
			render: (e) => /* @__PURE__ */ (0, K.jsxs)("span", {
				className: "flex min-w-0 flex-col items-start gap-1",
				children: [/* @__PURE__ */ (0, K.jsx)(v, {
					variant: "primary",
					title: q(e),
					"data-health-title": "",
					className: "max-w-full justify-start whitespace-normal text-left",
					onClick: () => i(e.id),
					children: /* @__PURE__ */ (0, K.jsx)("span", {
						className: "line-clamp-2 wrap-anywhere",
						children: q(e)
					})
				}), e.name && e.name !== q(e) ? /* @__PURE__ */ (0, K.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.name,
					className: "block min-w-0 max-w-full text-caption-1-regular text-text-secondary",
					children: e.name
				}) : null]
			})
		},
		{
			id: "actions",
			label: H("manage:healthList.actions"),
			width: 128,
			min: 128,
			required: !0,
			render: (e) => /* @__PURE__ */ (0, K.jsx)(r, {
				size: "small",
				variant: "secondary",
				"data-health-ignore": e.id,
				"aria-label": H(f ? "manage:healthList.restoreRow" : "manage:healthList.ignoreRow", { name: q(e) }),
				disabled: S.isFetching || !!E.busy,
				onClick: () => L([e]),
				children: R
			})
		},
		{
			id: "code",
			label: H("manage:shared.code"),
			width: 144,
			value: (e) => e.code || "",
			render: (e) => /* @__PURE__ */ (0, K.jsx)("span", {
				className: "whitespace-nowrap",
				children: e.code || H("manage:shared.unrecognized")
			})
		},
		{
			id: "location",
			label: H("manage:shared.library"),
			width: 160,
			value: F,
			filter: {
				values: (e) => e.library_id || "none",
				option: (e) => w.get(e) ?? { label: e === "none" ? H("cleanup:shared.none") : e }
			},
			render: (e) => /* @__PURE__ */ (0, K.jsx)(g, {
				libraryId: e.library_id,
				location: e.location,
				fallback: H("manage:shared.notFound")
			})
		},
		{
			id: "path",
			label: H("manage:healthList.filePath"),
			width: 320,
			min: 180,
			value: (e) => e.path,
			render: (e) => /* @__PURE__ */ (0, K.jsx)("span", {
				"data-middle-truncate": !0,
				title: e.path,
				className: "block min-w-0 w-full text-body-2-regular text-text-secondary",
				children: e.path || H("manage:shared.notFound")
			})
		},
		{
			id: "duration",
			label: H("manage:shared.duration"),
			width: 112,
			value: (e) => e.duration ?? 0,
			filter: {
				range: "duration",
				value: (e) => e.duration || null
			},
			render: (e) => e.duration && e.duration > 0 ? ne(e.duration) : H("manage:shared.notFound")
		},
		{
			id: "size",
			label: H("manage:shared.size"),
			width: 112,
			value: (e) => e.size ?? 0,
			filter: {
				range: "size",
				value: (e) => e.size
			},
			render: (e) => e.size === null ? H("manage:shared.notFound") : re(e.size)
		}
	], B = f ? e.count : C.count;
	return /* @__PURE__ */ (0, K.jsx)(c, {
		summary: B === null ? `${D} · ${H("manage:shared.notFound")}` : H("manage:healthList.groupSummary", {
			label: D,
			count: B
		}),
		children: C.count === null ? /* @__PURE__ */ (0, K.jsx)(y, {
			tone: "neutral",
			children: H("manage:healthList.listNotFound")
		}) : /* @__PURE__ */ (0, K.jsxs)(T, { children: [
			e.ignored_count || f ? /* @__PURE__ */ (0, K.jsx)(r, {
				size: "small",
				variant: "secondary",
				className: "self-start",
				disabled: E.busy === "ignore",
				onClick: () => {
					p(!f), k([]), d({});
				},
				children: f ? H("manage:healthList.showActive") : H("manage:healthList.showIgnored", { count: e.ignored_count })
			}) : null,
			E.error ? /* @__PURE__ */ (0, K.jsx)(y, {
				tone: "error",
				children: E.error
			}) : null,
			S.isError ? /* @__PURE__ */ (0, K.jsx)(b, {
				titleKey: "manage:healthList.loadFailed",
				query: S
			}) : null,
			!C.items.length && !S.isFetching && x === "{}" && !S.isError ? /* @__PURE__ */ (0, K.jsx)(l, {
				icon: le,
				title: H(f ? "manage:healthList.noIgnored" : "manage:healthList.emptyTitle"),
				size: "compact",
				children: f ? null : H("manage:healthList.emptyBody")
			}) : /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
				/* @__PURE__ */ (0, K.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [C.truncated ? /* @__PURE__ */ (0, K.jsx)("span", {
						className: "text-body-2-regular text-text-secondary",
						children: H("manage:healthList.loadedCount", {
							loaded: C.items.length,
							count: C.count
						})
					}) : null, /* @__PURE__ */ (0, K.jsx)(r, {
						size: "small",
						variant: "secondary",
						...M(E.busy === "copy"),
						onClick: () => I(C.items),
						children: H("manage:healthList.copyList")
					})]
				}),
				E.error ? /* @__PURE__ */ (0, K.jsx)(y, {
					tone: "error",
					children: E.error
				}) : null,
				S.isError ? /* @__PURE__ */ (0, K.jsx)(b, {
					titleKey: "manage:healthList.loadFailed",
					query: S
				}) : null,
				/* @__PURE__ */ (0, K.jsx)(s, {
					preferenceId: `diagnostics-health-${t}`,
					label: D,
					title: H("manage:healthList.tableTitle"),
					unit: H("manage:healthList.tableUnit"),
					panel: !1,
					busy: S.isFetching,
					filters: {
						values: u,
						facets: C.column_facets ?? {},
						onChange: d
					},
					items: C.items,
					columns: z,
					rowId: (e) => String(e.id),
					rowLabel: q,
					selected: O,
					onSelected: k,
					contextOperations: (e) => [
						{
							id: "open",
							label: H("catalog:mediaActions.open"),
							icon: m,
							run: () => i(e.id)
						},
						{
							id: "copy",
							label: H("manage:healthList.copyRow"),
							icon: n,
							disabled: E.busy === "copy",
							run: () => I([e])
						},
						{
							id: "ignore",
							label: R,
							icon: f ? ee : te,
							disabled: E.busy === "ignore" || S.isFetching,
							run: () => L([e])
						}
					],
					actions: () => [],
					controls: (e) => /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)(r, {
						size: "small",
						variant: "secondary",
						...M(E.busy === "copy"),
						onClick: () => I(e),
						children: H("manage:healthList.copySelected")
					}), /* @__PURE__ */ (0, K.jsx)(r, {
						size: "small",
						variant: "secondary",
						disabled: S.isFetching,
						...M(E.busy === "ignore"),
						onClick: () => L(e),
						children: R
					})] })
				})
			] })
		] })
	});
}
// src/react/diagnostics/scraping-export.tsx
var J = "/api/diagnostics/exports", Y = ["diagnostic-export"], ve = pe((e) => ["running", "cancelling"].includes(e?.status || "") ? 1e3 : !1);
function X({ kind: n, codes: a = "", children: o }) {
	let s = U(), c = W({
		queryKey: Y,
		queryFn: ({ signal: e }) => A(J, e),
		refetchInterval: ve
	}), l = c.data, u = s.busy === "start", d = s.busy === "cancel", f = !u && l?.kind === n ? l : void 0, p = l?.status === "running" || l?.status === "cancelling", m = f?.status === "cancelling", h = m ? 0 : f?.total, g = H(n === "support" ? "manage:diagnosticsExport.downloadReport" : "manage:diagnosticsExport.exportFetchLog"), _ = (e) => {
		ae.setQueryData(Y, e);
	}, v = () => void s.run("start", async (e) => {
		let r = await fetch(J, {
			method: "POST",
			signal: e,
			credentials: "same-origin",
			headers: {
				...await L(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				kind: n,
				codes: a
			})
		}), i = await r.json().catch(() => null);
		if (!r.ok) throw new t(i?.detail || i?.error || H("manage:diagnosticsExport.startFailed"), r.status, i);
		if (!i || !i.job_id) throw Error(H("manage:diagnosticsExport.statusNotFound"));
		return i;
	}, _), b = /* @__PURE__ */ (0, K.jsx)(r, {
		type: "button",
		variant: "secondary",
		disabled: !l || p,
		leadingIcon: u ? e : void 0,
		...M(u),
		onClick: v,
		children: g
	});
	return /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "flex w-full min-w-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [
					n === "support" ? b : null,
					f && p ? /* @__PURE__ */ (0, K.jsx)(r, {
						type: "button",
						variant: "secondary",
						disabled: m,
						leadingIcon: d ? e : void 0,
						...M(d),
						onClick: () => void s.run("cancel", (e) => j(`${J}/${f.job_id}/cancel`, {}, "POST", e), _),
						children: H("manage:diagnosticsExport.cancelExport")
					}) : null,
					f?.status === "complete" && f.download_url ? /* @__PURE__ */ (0, K.jsx)(i, {
						variant: "secondary",
						href: f.download_url,
						children: H("manage:diagnosticsExport.downloadFile")
					}) : null,
					n === "scraping" ? b : null,
					o
				]
			}),
			f && p ? /* @__PURE__ */ (0, K.jsx)(D, {
				embedded: n === "scraping",
				kind: k("diagnostic-export", f.stage_code),
				value: f.done || 0,
				total: h,
				label: h ? H("manage:diagnosticsExport.progress", {
					stage: V(f),
					done: f.done || 0,
					count: h
				}) : [
					V(f) || H("manage:diagnosticsExport.preparing"),
					!m && f.rows ? H("manage:diagnosticsExport.candidateCount", { count: f.rows }) : "",
					!m && f.files ? H("manage:diagnosticsExport.fileCount", { count: f.files }) : ""
				].filter(Boolean).join(" · ")
			}) : null,
			f?.status === "complete" ? /* @__PURE__ */ (0, K.jsx)("p", {
				role: "status",
				className: "text-right text-body-2-regular text-text-secondary",
				children: H("manage:diagnosticsExport.completedSize", { size: ((f.bytes || 0) / 1024 / 1024).toFixed(2) })
			}) : null,
			f?.status === "cancelled" ? /* @__PURE__ */ (0, K.jsx)(y, {
				tone: "neutral",
				children: H("manage:diagnosticsExport.canceled")
			}) : null,
			c.isError ? /* @__PURE__ */ (0, K.jsx)(y, {
				tone: "error",
				title: H("manage:diagnosticsExport.progressNotFound"),
				action: /* @__PURE__ */ (0, K.jsx)(r, {
					type: "button",
					variant: "secondary",
					...M(c.isFetching),
					onClick: () => {
						c.refetch();
					},
					children: H("manage:diagnosticsExport.reload")
				}),
				children: z(c.error)
			}) : null,
			s.error || f?.status === "failed" ? /* @__PURE__ */ (0, K.jsx)(y, {
				tone: "error",
				children: s.error || f?.error
			}) : null
		]
	});
}
function ye() {
	let [e, t] = (0, G.useState)("");
	return /* @__PURE__ */ (0, K.jsx)(f, {
		layout: "stack",
		labelledBy: "scraping-export-title",
		footer: /* @__PURE__ */ (0, K.jsx)(X, {
			kind: "scraping",
			codes: e
		}),
		children: /* @__PURE__ */ (0, K.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			"aria-label": H("manage:diagnosticsExport.exportFetchLog"),
			children: [
				/* @__PURE__ */ (0, K.jsx)(p, {
					id: "scraping-export-title",
					children: H("manage:diagnosticsExport.fetchLogTitle")
				}),
				/* @__PURE__ */ (0, K.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: H("manage:diagnosticsExport.fetchLogHint")
				}),
				/* @__PURE__ */ (0, K.jsx)(h, {
					label: H("manage:diagnosticsExport.codesLabel"),
					name: "scraping-codes",
					value: e,
					onChange: t,
					autoComplete: "off",
					spellCheck: "false",
					maxLength: 1300,
					placeholder: H("manage:diagnosticsExport.codesPlaceholder"),
					hint: H("manage:diagnosticsExport.codesHint")
				})
			]
		})
	});
}
// src/react/diagnostics/diagnostics-page.tsx
var be = {
	ok: H("manage:diagnostics.statusOk"),
	warning: H("manage:diagnostics.statusWarning"),
	failed: H("manage:diagnostics.statusFailed"),
	unknown: H("manage:shared.notFound"),
	disabled: H("manage:diagnostics.statusDisabled"),
	stale: H("manage:diagnostics.statusStale"),
	unchecked: H("manage:diagnostics.statusUnchecked")
}, xe = { "/tasks": H("manage:diagnostics.viewTasks") }, Se = [
	[H("manage:diagnostics.groupLibraries"), ["media_mounts", "data_root"]],
	[H("manage:diagnostics.groupDatabase"), ["database", "schema"]],
	[H("manage:diagnostics.groupTools"), ["ffmpeg"]],
	[H("manage:diagnostics.groupConfig"), [
		"configured",
		"security",
		"port",
		"version"
	]],
	[H("manage:diagnostics.groupTasks"), ["tasks"]]
], Z = (e) => new Date(e).toLocaleString(ie), Ce = /* @__PURE__ */ new Set([
	"warning",
	"failed",
	"unknown"
]);
function we({ status: e }) {
	return /* @__PURE__ */ (0, K.jsx)(a, {
		variant: "caption",
		"data-diagnostic-status": e,
		color: e === "failed" ? "rose" : e === "ok" ? "lime" : e === "warning" || e === "stale" ? "yellow" : "neutral",
		children: be[e] ?? H("manage:shared.notFound")
	});
}
function Q({ name: e, check: t, compact: n = !1 }) {
	let r = t.target === "/settings/library" && (e === "security" || e === "port") ? ce("network") : t.target, a = n ? "h4" : "h3", o = N(t);
	return /* @__PURE__ */ (0, K.jsxs)("div", {
		"data-diagnostic-check": e,
		className: I("flex flex-col gap-4 border-b border-separator-border pr-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between", n ? "py-3" : "py-5"),
		children: [/* @__PURE__ */ (0, K.jsxs)("div", {
			className: I("flex min-w-0 flex-1 flex-col", n ? "gap-1" : "gap-2"),
			children: [
				/* @__PURE__ */ (0, K.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, K.jsx)(a, {
						className: I("text-text-primary", n ? "text-body-2-medium" : "text-body-medium"),
						children: o.label
					}), /* @__PURE__ */ (0, K.jsx)(we, { status: t.status })]
				}),
				/* @__PURE__ */ (0, K.jsx)("p", {
					"data-check-reason": !0,
					className: I("text-body-2-regular break-words", n ? "text-text-secondary" : "text-text-primary"),
					children: o.reason
				}),
				o.action ? /* @__PURE__ */ (0, K.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: H("manage:diagnostics.suggestedFixText", { action: o.action })
				}) : null
			]
		}), r ? /* @__PURE__ */ (0, K.jsx)("div", {
			className: "shrink-0 self-end sm:self-auto",
			children: /* @__PURE__ */ (0, K.jsx)(i, {
				size: "small",
				variant: "secondary",
				href: r,
				children: r.startsWith("/settings/") ? H("manage:diagnostics.openSection", { section: F(r) }) : xe[r] ?? H("manage:diagnostics.openRelated")
			})
		}) : null]
	});
}
function $({ source: e }) {
	return /* @__PURE__ */ (0, K.jsx)("article", {
		"data-diagnostic-source": e.source,
		children: /* @__PURE__ */ (0, K.jsx)(C, { children: /* @__PURE__ */ (0, K.jsxs)(T, { children: [
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, K.jsxs)("h3", {
					className: "flex min-w-0 items-center gap-2 text-body-medium text-text-primary",
					children: [/* @__PURE__ */ (0, K.jsx)(w, { source: e.source }), e.label]
				}), /* @__PURE__ */ (0, K.jsx)(we, { status: e.status })]
			}),
			/* @__PURE__ */ (0, K.jsx)(me, {
				text: P(e, "reason"),
				className: "text-body-regular text-text-primary"
			}),
			/* @__PURE__ */ (0, K.jsx)(c, {
				summary: H("manage:diagnostics.sessionDetails"),
				children: /* @__PURE__ */ (0, K.jsxs)(d, { children: [
					/* @__PURE__ */ (0, K.jsx)(u, {
						term: H("manage:diagnostics.lastSuccess"),
						children: e.last_success_at ? Z(e.last_success_at) : H("manage:diagnostics.noSuccessYet")
					}),
					e.last_check_at ? /* @__PURE__ */ (0, K.jsxs)(u, {
						term: H("manage:diagnostics.lastChecked"),
						children: [Z(e.last_check_at), e.elapsed_s !== void 0 && e.elapsed_s !== null ? H("manage:diagnostics.checkDuration", { seconds: e.elapsed_s.toFixed(2) }) : ""]
					}) : null,
					/* @__PURE__ */ (0, K.jsx)(u, {
						term: H("manage:diagnostics.pausedUntil"),
						children: e.cooldown_until ? Z(e.cooldown_until) : H("manage:diagnostics.notPaused")
					})
				] })
			})
		] }) })
	});
}
function Te({ sources: e }) {
	let t = e.filter((e) => e.status === "ok" || e.status === "unchecked" || e.status === "disabled"), n = e.filter((e) => !t.includes(e));
	return /* @__PURE__ */ (0, K.jsxs)("section", {
		id: "diagnostics-sessions",
		"data-guide-target": "sessions",
		"aria-label": H("manage:diagnostics.sourceSessions"),
		className: "flex min-w-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, K.jsx)("h2", {
					className: "px-3 text-title-3-medium text-text-primary",
					children: H("manage:diagnostics.sourceSessions")
				}), /* @__PURE__ */ (0, K.jsx)(i, {
					size: "small",
					variant: "secondary",
					href: "/sources",
					children: H("manage:diagnostics.openSources")
				})]
			}),
			n.map((e) => /* @__PURE__ */ (0, K.jsx)($, { source: e }, e.source)),
			t.length ? /* @__PURE__ */ (0, K.jsx)(c, {
				findable: !0,
				summary: H("manage:diagnostics.otherSources", { count: t.length }),
				contentClassName: "gap-3",
				children: t.map((e) => /* @__PURE__ */ (0, K.jsx)($, { source: e }, e.source))
			}) : null
		]
	});
}
function Ee(t) {
	let n = W({
		queryKey: o,
		queryFn: ({ signal: e }) => B(e),
		staleTime: 1e4
	}), i = U(), { checked: a, checkFailed: s } = he(), [l, u] = (0, G.useState)(""), d = () => void i.run("refresh", async () => {
		let e = await n.refetch();
		if (e.error) throw e.error;
	}, () => {
		u(""), a(H("manage:diagnostics.reportRefreshed"));
	}, (e) => {
		let t = z(e);
		u(t), s(H("manage:diagnostics.checkAgain"), t);
	}), f = i.busy === "refresh", p = /* @__PURE__ */ (0, K.jsx)("div", {
		id: "diagnostics-report",
		"data-guide-target": "report",
		children: /* @__PURE__ */ (0, K.jsx)(X, {
			kind: "support",
			children: /* @__PURE__ */ (0, K.jsx)(r, {
				variant: "secondary",
				leadingIcon: f ? e : void 0,
				onClick: d,
				...M(f),
				children: H("manage:diagnostics.checkAgain")
			})
		})
	}), m = {
		id: "diagnostics-report",
		label: H("manage:diagnosticsExport.reportTitle")
	}, h = {
		id: "diagnostics-startup",
		label: H("manage:startupCapture.title")
	}, g = {
		id: "diagnostics-scraping",
		label: H("manage:diagnosticsExport.fetchLogTitle")
	}, _ = /* @__PURE__ */ (0, K.jsx)("div", {
		id: g.id,
		children: /* @__PURE__ */ (0, K.jsx)(ye, {})
	}), v = n.data;
	if (!v && n.isPending) return /* @__PURE__ */ (0, K.jsx)("div", {
		role: "status",
		"aria-label": H("manage:diagnostics.loading"),
		dangerouslySetInnerHTML: { __html: R() }
	});
	if (!v) return /* @__PURE__ */ (0, K.jsxs)(S, {
		inline: !0,
		label: H("settings:configurationPage.contents"),
		entries: [
			m,
			h,
			g
		],
		children: [
			p,
			/* @__PURE__ */ (0, K.jsx)(E, {}),
			/* @__PURE__ */ (0, K.jsx)(y, {
				tone: "error",
				title: H("manage:diagnostics.loadFailed"),
				children: l || (n.error ? z(n.error) : H("manage:diagnostics.reportNotFound"))
			}),
			_
		]
	});
	let b = Object.entries(v.checks).filter(([, e]) => Ce.has(e.status)), w = Object.entries(v.checks).filter(([, e]) => !Ce.has(e.status)), D = [
		m,
		...b.length ? [{
			id: "diagnostics-attention",
			label: H("manage:diagnostics.attention")
		}] : [],
		h,
		{
			id: "diagnostics-health",
			label: H("manage:diagnostics.collectionHealth")
		},
		...w.length ? [{
			id: "diagnostics-checks",
			label: H("manage:diagnostics.systemChecks")
		}] : [],
		g,
		{
			id: "diagnostics-sessions",
			label: H("manage:diagnostics.sourceSessions")
		}
	];
	return /* @__PURE__ */ (0, K.jsxs)(S, {
		inline: !0,
		label: H("settings:configurationPage.contents"),
		entries: D,
		children: [
			p,
			l ? /* @__PURE__ */ (0, K.jsx)(y, {
				tone: "error",
				children: l
			}) : null,
			b.length ? /* @__PURE__ */ (0, K.jsx)(x, {
				id: "diagnostics-attention",
				guide: "attention",
				title: H("manage:diagnostics.attentionTitle", { count: b.length }),
				children: b.map(([e, t]) => /* @__PURE__ */ (0, K.jsx)(Q, {
					name: e,
					check: t
				}, e))
			}) : null,
			/* @__PURE__ */ (0, K.jsx)(E, {}),
			/* @__PURE__ */ (0, K.jsx)(x, {
				id: "diagnostics-health",
				guide: "health",
				title: H("manage:diagnostics.collectionHealth"),
				children: /* @__PURE__ */ (0, K.jsxs)(T, { children: [v.library.issue_at ? /* @__PURE__ */ (0, K.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: H("manage:diagnostics.healthRecordedAtTime", { time: Z(v.library.issue_at) })
				}) : null, Object.entries(v.library.groups).map(([e, n]) => /* @__PURE__ */ (0, K.jsx)(_e, {
					groupKey: e,
					group: n,
					...t
				}, e))] })
			}),
			w.length ? /* @__PURE__ */ (0, K.jsx)("section", {
				id: "diagnostics-checks",
				"aria-label": H("manage:diagnostics.systemChecks"),
				children: /* @__PURE__ */ (0, K.jsx)(c, {
					findable: !0,
					summary: H("manage:diagnostics.otherChecks", { count: w.length }),
					contentClassName: "gap-5",
					children: Se.map(([e, t]) => {
						let n = w.filter(([e]) => t.some((t) => t === e));
						return n.length ? /* @__PURE__ */ (0, K.jsxs)("section", {
							"aria-label": e,
							"data-diagnostic-group": "",
							className: "flex min-w-0 flex-col gap-2",
							children: [/* @__PURE__ */ (0, K.jsxs)("h3", {
								className: "flex items-center gap-2 px-3 text-body-medium text-text-primary",
								children: [e, /* @__PURE__ */ (0, K.jsx)("span", {
									className: "text-caption-1-regular text-text-secondary",
									children: H("manage:diagnostics.groupCount", { count: n.length })
								})]
							}), /* @__PURE__ */ (0, K.jsx)(C, { children: n.map(([e, t]) => /* @__PURE__ */ (0, K.jsx)(Q, {
								name: e,
								check: t,
								compact: !0
							}, e)) })]
						}, e) : null;
					})
				})
			}) : null,
			_,
			/* @__PURE__ */ (0, K.jsx)(Te, { sources: v.sources })
		]
	});
}
export { Ee as DiagnosticsPage };

//# debugId=742c2573-a24b-4fb5-b9fc-8bf951747f1c