(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "d7e84332-7dd9-495f-9859-456339d82296", e._sentryDebugIdIdentifier = "sentry-dbid-d7e84332-7dd9-495f-9859-456339d82296");
	} catch {}
})();
import { $76d00c5a4edb230a$export$76ccd210b9029917 as e, $76d00c5a4edb230a$export$816b5d811295e6bc as t, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as n, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as r, $76d00c5a4edb230a$export$f850895b287ef28e as i, $ea3928288112382f$export$439d29a4e110a164 as a, $fe21c36db05242bb$export$d7b12c4107be0d61 as o, ActivityMotion as s, ArtSlot as c, Button as l, ButtonLink as u, Bx as d, COVER_STATE_TITLE as f, CastPopover as p, CatalogColumnFilterChips as m, CatalogDisplayControls as h, CatalogPerformerTile as g, CatalogStudioTile as _, Checkbox as v, ChevronSortDown as y, Chip as b, CloudDownloadDialog as x, ColumnFilterAvatar as S, ColumnFilterPopover as C, ColumnFilterStudioAvatar as w, Combo as T, CoverQueue as E, DISCOVERY_METADATA_KEY as D, DISCOVERY_SORTS as ee, DISCOVERY_TABLE_ID as te, DISCOVERY_TABLE_KEYS as O, DOWNLOADS_KEY as k, DOWNLOADS_URL as A, DataTableFooter as j, DataTableFrame as M, E3 as ne, EmptyFocusButton as N, EmptyState as re, FilterActionButton as ie, FilterChoiceList as ae, FilterDropdown as oe, FilterGlassRows as se, FilterIconButton as P, FilterTagStrip as ce, FilterToolbarControls as le, Gg as ue, H7 as de, ImageWithFallback as fe, Input as pe, JAV_CATALOG_TIERS as me, JAV_LAYOUTS as he, JAV_PAGE_BODY as ge, JAV_RECOMMENDATION_GRID as _e, JAV_SELECTION_EVENT as ve, JAV_TAG_STRIP_SKELETON as ye, JZ as be, JavGlassSearch as xe, LibraryShortcuts as Se, LinkButton as Ce, ListCredits as we, M6 as F, MediaAvatarStack as Te, MenuDialog as I, Note as L, ONLINE_SORTS as Ee, ONLINE_STATUS as R, ONLINE_TABLE_ID as z, ONLINE_TABLE_KEYS as B, PHASES as V, Pagination as De, PerformerCredit as H, QueryErrorNote as Oe, RELEASE_COLUMN_VISIBILITY_KEY as U, RELEASE_COLUMN_WIDTHS_KEY as ke, RELEASE_PAGE_SIZES as Ae, RELEASE_SORTS as je, RELEASE_SORT_COLUMNS as W, SEGMENT as Me, SEGMENTED_TRACK as Ne, ScrapeSourceLabel as Pe, SegmentedRadioGroup as Fe, Segments as Ie, Select as Le, SelectItem as G, SelectionDock as Re, Shuffle as ze, SiteLabel as K, SortKeys as Be, SourceAvatar as Ve, Table as He, TableColumnControls as q, TableColumnFilter as Ue, TableColumnRange as We, TableColumnResizer as Ge, TableRangeFields as Ke, TableToolbar as qe, TaskProgress as Je, WANTS_KEY as Ye, WantMagnets as Xe, Wt as J, __toESM as Ze, activityKind as Qe, addWant as $e, apiGet as et, appSettingsStore as tt, avatarInner as nt, busyProps as rt, cachedMagnetStates as it, cardClass as at, cardRatio as ot, castPersonName as Y, catalogListSkeletonCellHtml as st, columnOrderingFeature as ct, columnRangeKinds as lt, columnRangeSummary as ut, columnValueSelected as dt, columnVisibilityFeature as ft, composingKey as pt, controlDiscoveryMetadata as mt, controlReleaseMetadata as ht, coverArrived as gt, coverFetching as _t, coverFetchingHtml as vt, coverReason as yt, coverStateAction as bt, coverUrl as xt, createColumnHelper as St, discoveryArtwork as Ct, discoveryCast as wt, discoveryColumns as Tt, discoveryKey as Et, discoveryOrder as Dt, discoveryScore as Ot, dmmPerformerName as kt, entityDisplayName as At, entityPath as jt, entityWriting as Mt, errorMessage as Nt, fetchCoverNow as Pt, fetchDiscoveries as Ft, fetchDiscoveryMetadata as It, fetchReleaseColumn as Lt, fetchReleases as Rt, fetchWants as zt, flexRender as Bt, fmtDur as Vt, gridLayout as Ht, hasSelectionModifier as Ut, invalidateWants as Wt, javContentSkeleton as Gt, javFacetTiersHtml as Kt, javLayout as qt, javSubscriptionPath as Jt, javTab as Yt, javTagPlaceholdersHtml as Xt, jobText as Zt, joinList as Qt, keepPreviousData as $t, lastSearchNote as en, leadingGraphemes as tn, librarySuggest as nn, logoUrl as rn, metadataInterval as an, onlineCatalogCardsHtml as on, onlineColumns as sn, onlineSorting as cn, onlineStatus as ln, outsideTableDateBound as un, pageWindow as dn, performerProfileHref as fn, pv as pn, qE as mn, queryClient as hn, readColumnFilters as gn, recommendationScore as _n, relayoutCovers as vn, releaseColumnSelection as yn, releaseColumnValues as bn, releaseColumns as xn, releaseDateQuery as Sn, releaseFilters as Cn, releaseKey as wn, rememberPageSize as Tn, rememberedPageSize as En, remoteCoverUrl as Dn, removeWants as On, require_jsx_runtime as kn, require_react as An, resetWants as jn, resourceSourceKey as Mn, restoreWants as Nn, rowSelectionFeature as Pn, rowSortingFeature as Fn, searchNote as In, selectRange as Ln, selectionSummary as Rn, serverLabelList as zn, setReleaseColumn as Bn, spriteGlyph as Vn, storeJavLayout as Hn, suppressShiftTextSelection as Un, t as X, tableFeatures as Wn, takeJavSelection as Gn, textLang as Kn, tierPlaceholdersHtml as qn, toggleColumnValue as Jn, useAction as Yn, useCatalogView as Xn, useDatalistSuggest as Zn, useDense as Qn, useEntityNames as $n, useFilterScope as er, useHorizontalScroller as tr, useJavAddress as nr, useQuery as rr, useQueryClient as ir, useRectangleSelection as ar, useRememberedPagination as or, useTable as sr, useTablePreferences as cr, useViewGlide as lr, useWorkContextMenu as ur, wantName as dr, wantsInterval as fr, wireHorizontalScroller as pr, withinColumnRange as mr, writeColumnFilters as hr, writeJavQuery as Z, xs as gr } from "./peach-app.js";
import { JavBatchResources as _r } from "./peach-app.jav-batch-resources-R5lmdx3J.js";
import { ErrorLine as vr } from "./peach-app.source-view-CqeSCcU2.js";
// src/react/jav/jav-selection.tsx
var Q = /* @__PURE__ */ Ze(An(), 1), $ = kn();
function yr(e) {
	return {
		id: e.id,
		code: e.code,
		title: e.title,
		performers: e.performers,
		performerRefs: e.performer_refs,
		studio: e.studio,
		release_date: e.release_date,
		cover: e.has_cover ? xt(e, 2) : e.online_cover_url || (e.cover_url ? Dn(e) : void 0)
	};
}
var br = (0, Q.createContext)(null), xr = () => (0, Q.useContext)(br);
function Sr(e) {
	let t = xr();
	return ar(e ? t?.selectRectangle : void 0, { selecting: !!t?.mode });
}
function Cr(e) {
	let t = xr()?.visible;
	(0, Q.useEffect)(() => {
		t?.(e);
	}, [e, t]);
}
function wr({ children: e, readOnly: t, receipt: n, dock: r = !0 }) {
	let i = Qn(), [a, o] = (0, Q.useState)(!1), [s, c] = (0, Q.useState)(/* @__PURE__ */ new Map()), [u, d] = (0, Q.useState)([]), [f, p] = (0, Q.useState)(null), m = (0, Q.useRef)(null), h = (0, Q.useRef)(new URLSearchParams(location.search).get("tab") || ""), g = new Set(s.keys()), _ = Rn(g, u.map((e) => e.code)), v = (0, Q.useCallback)((e) => {
		d((t) => t.length === e.length && t.every((t, n) => t === e[n]) ? t : e), c((t) => {
			let n = e.filter((e) => t.has(e.code) && t.get(e.code) !== e);
			return n.length ? new Map([...t, ...n.map((e) => [e.code, e])]) : t;
		});
	}, []), y = (0, Q.useCallback)(() => {
		o(!1), c(/* @__PURE__ */ new Map()), m.current = null;
	}, []), b = () => c((e) => {
		let t = new Map(e);
		return u.forEach((e) => _.all ? t.delete(e.code) : t.set(e.code, e)), t;
	}), x = (e, t) => {
		if (!a && !e.length) return;
		a || o(!0);
		let n = new Set(e);
		m.current = e.at(-1) ?? null, c((e) => new Map([...t ? e : [], ...u.filter((e) => n.has(e.code)).map((e) => [e.code, e])]));
	};
	(0, Q.useEffect)(() => {
		let e = (e) => {
			let t = e instanceof CustomEvent ? e.detail : void 0;
			t && t.tab !== h.current || (e.preventDefault(), a && !t?.enter ? y() : o(!0));
		};
		return window.addEventListener(ve, e), () => window.removeEventListener(ve, e);
	}, [a, y]), (0, Q.useEffect)(() => {
		Gn(location.search) && o(!0);
	}, []), (0, Q.useEffect)(() => (a || (c(/* @__PURE__ */ new Map()), m.current = null), document.getElementById("selectMode")?.setAttribute("aria-pressed", String(a)), () => document.getElementById("selectMode")?.setAttribute("aria-pressed", "false")), [a]), (0, Q.useEffect)(() => {
		if (!a) return;
		let e = (e) => {
			e.target.closest("input:not([type=\"checkbox\"],[type=\"radio\"]),textarea,[contenteditable]:not([contenteditable=\"false\"]),dialog,[role=\"dialog\"]") || (e.key === "Escape" && (e.preventDefault(), y()), (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a" && (e.preventDefault(), c((e) => new Map([...e, ...u.map((e) => [e.code, e])]))));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		a,
		y,
		u
	]);
	let S = (e, t = !1) => {
		o(!0);
		let n = m.current;
		m.current = e.code, c((r) => {
			let i = new Set(r.keys());
			Ln(i, u.map((e) => e.code), n, e.code, t);
			let a = new Map([
				...r,
				...u.map((e) => [e.code, e]),
				[e.code, e]
			]);
			return new Map([...i].map((e) => [e, a.get(e)]));
		});
	}, C = [...s.values()].filter((e) => !e.wanted && !e.asset_id), w = (() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		return {
			key: "want",
			label: X("catalog:javSelection.addToWants"),
			reversal: "undo",
			confirm: (e) => ({
				title: X("catalog:javSelection.addToWants"),
				body: X("catalog:javSelection.wantConfirm", { count: e.length })
			}),
			run: async (n) => {
				try {
					for (let r of n) if (!e.has(r.code)) {
						try {
							let e = await $e({ code: r.code });
							e?.created && t.push(e.want.id);
						} catch (t) {
							throw Error(X("catalog:javSelection.wantPartialFailed", {
								count: e.size,
								code: r.code,
								error: Nt(t)
							}));
						}
						e.add(r.code), c((e) => {
							let t = new Map(e);
							return t.delete(r.code), t;
						});
					}
				} finally {
					Wt();
				}
				return async () => {
					t.length && await On(t), await Wt();
				};
			},
			receipt: () => X("catalog:javSelection.wantAdded", { count: e.size })
		};
	})(), T = { receipt: n };
	return /* @__PURE__ */ (0, $.jsxs)(br.Provider, {
		value: {
			dense: i,
			mode: a,
			selected: g,
			toggle: S,
			visible: v,
			selectPage: b,
			selectRectangle: x,
			close: y,
			all: _.all,
			mixed: _.mixed
		},
		children: [
			/* @__PURE__ */ (0, $.jsx)("div", {
				"data-jav-selection": "",
				"data-select-mode": a ? "" : void 0,
				className: "flex min-w-0 flex-col gap-4",
				children: e
			}),
			/* @__PURE__ */ (0, $.jsxs)(Re, {
				visible: r && a,
				count: X("catalog:javSelection.selectedCount", { count: s.size }),
				label: X("catalog:javSelection.dockLabel"),
				actions: [{
					action: w,
					items: C,
					host: T,
					disabled: t
				}],
				leading: /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "secondary",
					disabled: !u.length,
					onClick: b,
					children: /* @__PURE__ */ (0, $.jsx)("span", {
						"data-copy-key": `jav.selection.page.${_.all ? "clear" : "all"}`,
						children: _.all ? X("catalog:javSelection.deselectPage") : X("catalog:javSelection.selectPage")
					})
				}),
				children: [/* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "secondary",
					disabled: !s.size,
					onClick: () => p([...s.values()].map(yr)),
					children: X("catalog:shared.searchTorrents")
				}), /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "ghost",
					onClick: y,
					children: X("catalog:javSelection.exit")
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)(_r, {
				items: f,
				close: () => p(null),
				readOnly: t,
				receipt: n
			})
		]
	});
}
// src/react/wants/want-list.tsx
var Tr = {
	code: X("catalog:wants.originManual"),
	feed: X("catalog:entityHero.subscribeNewReleases"),
	follow: X("catalog:entityHero.following")
}, Er = [
	["all", X("catalog:shared.all")],
	["available", X("catalog:wants.hasMagnet")],
	["missing", X("catalog:wants.noMagnet")]
], Dr = (e) => [
	e.release_date,
	e.studio,
	e.performers,
	Tr[e.origin]
].filter(Boolean).join(" · ");
function Or({ want: e }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "relative inline-grid w-card-cover shrink-0 aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-media-placeholder max-sm:w-24",
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: X("catalog:shared.noCover")
		}), e.cover ? /* @__PURE__ */ (0, $.jsx)(fe, {
			src: e.cover,
			alt: "",
			loading: "lazy",
			referrerPolicy: e.remote_cover ? "no-referrer" : void 0,
			className: "absolute inset-0 size-full object-cover"
		}) : null]
	});
}
function kr({ want: e, readOnly: t, busy: n, onReset: r, onRemove: i, onCloudDownload: a, downloads: o, provider: s, toast: c, picked: d }) {
	let f = ur(), [p, m] = (0, Q.useState)([]), h = e.link || (!p.length && e.code ? `https://javdb.com/search?q=${encodeURIComponent(e.code)}&f=all` : ""), g = h && URL.canParse(h) ? new URL(h).hostname.replace(/^www\./, "") : "", _ = Mn(e.follow_provider || g.split(".")[0] || ""), y = _ === "javdb" ? "JavDB" : _ === "javbus" ? "JavBus" : g, b = h && g && !p.some((e) => e.source === _) ? [{
		source: _,
		label: y,
		url: h
	}, ...p] : p, x = e.code && e.phase === "searching" ? en(e) : In(e), S = b.map((e) => ({
		id: `source:${e.source}`,
		label: e.label,
		icon: J,
		run: () => {
			window.open(e.url, "_blank", "noopener,noreferrer");
		}
	}));
	(e.phase === "searching" || e.phase === "given_up") && S.push({
		id: "resource",
		label: X("catalog:shared.searchTorrents"),
		icon: pn,
		run: a
	}), e.phase === "given_up" && S.push({
		id: "reset",
		label: X("catalog:wants.searchAgain"),
		icon: be,
		disabled: t || !!n,
		run: r
	}), d && S.push({
		id: "select",
		label: X(d.on ? "catalog:mediaActions.deselect" : "catalog:mediaActions.select"),
		icon: de,
		run: () => d.toggle(!d.on)
	}), S.push({
		id: "remove",
		label: X("catalog:shared.remove"),
		icon: F,
		danger: !0,
		disabled: t || !!n,
		run: i
	});
	let C = {
		key: e.id,
		operations: S
	};
	return /* @__PURE__ */ (0, $.jsxs)("li", {
		"data-want-id": e.id,
		"data-rectangle-key": e.id,
		onContextMenu: (e) => f.onContextMenu(e, C),
		onKeyDown: (e) => f.onKeyDown(e, C),
		className: at({ className: "flex flex-col gap-4 max-sm:p-4" }),
		children: [
			f.menu,
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 items-start gap-4 max-sm:gap-3",
				children: [
					d ? /* @__PURE__ */ (0, $.jsx)(v, {
						slot: null,
						className: "mt-1 shrink-0 self-start",
						"aria-label": X("catalog:wants.selectRow", { name: dr(e) }),
						isSelected: d.on,
						onChange: d.toggle
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(Or, { want: e }),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex min-w-0 flex-1 flex-col gap-1",
						children: [
							/* @__PURE__ */ (0, $.jsxs)("p", {
								className: "flex min-w-0 flex-wrap items-baseline gap-x-2",
								children: [/* @__PURE__ */ (0, $.jsx)("b", {
									className: "min-w-0 text-headline-medium wrap-anywhere text-text-primary",
									children: dr(e)
								}), e.code && e.title ? /* @__PURE__ */ (0, $.jsx)("span", {
									className: "min-w-0 truncate text-body-2-regular text-text-secondary",
									children: e.title
								}) : null]
							}),
							Dr(e) ? /* @__PURE__ */ (0, $.jsx)("p", {
								className: "text-body-2-regular text-text-secondary",
								children: Dr(e)
							}) : null,
							x ? /* @__PURE__ */ (0, $.jsx)("p", {
								"data-want-note": "",
								className: "text-caption-1-regular text-text-secondary",
								children: x
							}) : null,
							e.scrape_error ? /* @__PURE__ */ (0, $.jsx)(vr, {
								text: e.scrape_error,
								prefix: X("catalog:wants.metadataNotFound"),
								tone: "muted"
							}) : null,
							/* @__PURE__ */ (0, $.jsxs)("div", {
								"data-want-actions": "",
								className: "mt-1 flex flex-wrap items-center gap-2",
								children: [
									b.map((e) => /* @__PURE__ */ (0, $.jsx)(u, {
										"data-button-link": "",
										variant: "secondary",
										size: "small",
										trailingIcon: J,
										href: e.url,
										target: "_blank",
										rel: "noopener noreferrer",
										children: /* @__PURE__ */ (0, $.jsx)(Pe, {
											source: e.source,
											label: e.label
										})
									}, e.source)),
									e.phase === "given_up" ? /* @__PURE__ */ (0, $.jsx)(l, {
										variant: "secondary",
										size: "small",
										disabled: t,
										...rt(n === `reset:${e.id}`),
										onClick: r,
										children: X("catalog:wants.searchAgain")
									}) : null,
									e.phase === "searching" || e.phase === "given_up" ? /* @__PURE__ */ (0, $.jsx)(l, {
										variant: "primary",
										size: "small",
										leadingIcon: pn,
										onClick: a,
										children: X("catalog:shared.searchTorrents")
									}) : null,
									/* @__PURE__ */ (0, $.jsx)(l, {
										variant: "secondary",
										size: "small",
										leadingIcon: F,
										disabled: t,
										...rt(n === `remove:${e.id}`),
										onClick: i,
										children: X("catalog:shared.remove")
									})
								]
							})
						]
					})
				]
			}),
			e.code && (e.phase === "searching" || e.phase === "given_up") ? /* @__PURE__ */ (0, $.jsx)(Xe, {
				want: e,
				readOnly: t,
				downloads: o,
				provider: s,
				toast: c,
				onSources: m
			}) : null
		]
	});
}
function Ar({ phase: e, label: t, rows: n, row: r, onRectangle: i, selecting: a }) {
	let [s, c] = (0, Q.useState)(1), [u, d] = (0, Q.useState)(20), [f, p] = (0, Q.useState)("all"), m = it(n), h = (e) => e.has_magnets ?? m.get(e.code || "") ?? !1, g = n.filter(h), _ = e !== "searching" || f === "all" ? n : n.filter((e) => h(e) === (f === "available")), v = ar(_.length ? i : void 0, {
		selecting: a,
		start: "[data-want-items]"
	}), y = dn(_.length, u, s);
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-label": t,
		"data-want-phase": e,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsxs)("h3", {
					className: "flex items-baseline gap-2 text-title-2-medium text-text-primary",
					children: [t, /* @__PURE__ */ (0, $.jsx)("span", {
						className: "text-body-2-regular tabular-nums text-text-secondary",
						children: n.length.toLocaleString()
					})]
				}), e === "searching" ? /* @__PURE__ */ (0, $.jsx)(Fe, {
					name: "want-magnet-filter",
					"aria-label": X("catalog:wants.magnetFilter"),
					orientation: "horizontal",
					value: f,
					className: Ne,
					onChange: (e) => {
						p(e), c(1);
					},
					children: Er.map(([e, t]) => /* @__PURE__ */ (0, $.jsxs)(o, {
						value: e,
						"aria-label": t,
						className: Me,
						children: [t, /* @__PURE__ */ (0, $.jsx)("span", {
							className: "text-caption-1-regular tabular-nums text-text-tertiary",
							children: (e === "all" ? n.length : e === "available" ? g.length : n.length - g.length).toLocaleString()
						})]
					}, e))
				}) : null]
			}),
			_.length ? null : /* @__PURE__ */ (0, $.jsx)(re, {
				size: "compact",
				icon: mn,
				title: X("catalog:wants.noFilterMatches"),
				actions: /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					onClick: () => {
						p("all"), c(1);
					},
					children: X("catalog:shared.viewAll")
				}),
				children: null
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				"data-rectangle-gutter": "",
				...v,
				children: /* @__PURE__ */ (0, $.jsx)("ul", {
					"data-want-items": "",
					className: "flex flex-col gap-4",
					children: _.slice(y.start, y.end).map(r)
				})
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				"data-want-pager": "",
				children: /* @__PURE__ */ (0, $.jsx)(j, {
					label: t,
					total: y.total,
					pagination: {
						pageIndex: y.page - 1,
						pageSize: u
					},
					onChange: (e) => {
						d(e.pageSize), c(e.pageIndex + 1);
					},
					unit: X("catalog:wants.itemUnit")
				})
			})
		]
	});
}
function jr({ readOnly: e, toast: t, query: n = "", clearQuery: r }) {
	let [i, a] = (0, Q.useState)(""), [o, s] = (0, Q.useState)(null), c = Yn(), u = rr({
		queryKey: Ye,
		queryFn: ({ signal: e }) => zt(e),
		staleTime: 3e4,
		refetchInterval: fr
	}), d = () => {
		let n = i.trim();
		n && !e && c.run("add", (e) => $e({ code: n }, e), (e) => {
			t(e.created ? X("catalog:wants.added", { name: dr(e.want) }) : X("catalog:wants.alreadyAdded", { name: dr(e.want) })), a(""), Wt();
		});
	}, f = (e) => {
		e.key === "Enter" && !pt(e.nativeEvent) && (e.preventDefault(), d());
	}, p = (e) => {
		c.run(`remove:${e.id}`, (t) => On([e.id], t), () => {
			t(X("catalog:wants.removed", { name: dr(e) })), Wt();
		});
	}, m = (e) => {
		c.run(`reset:${e.id}`, (t) => jn([e.id], t), () => {
			t(X("catalog:wants.backToSearching", { name: dr(e) })), Wt();
		});
	}, h = u.data, g = (h?.items || []).filter((e) => !n || [
		e.code,
		e.title,
		e.performers
	].join(" ").toLocaleLowerCase().includes(n.toLocaleLowerCase())), _ = xr(), v = !!_?.mode, [y, b] = (0, Q.useState)(/* @__PURE__ */ new Set()), [S, C] = (0, Q.useState)(null);
	(0, Q.useEffect)(() => {
		v || b(/* @__PURE__ */ new Set());
	}, [v]);
	let w = g.filter((e) => y.has(e.id)), T = g.length > 0 && w.length === g.length, E = { receipt: t }, D = {
		key: "remove",
		label: X("catalog:shared.remove"),
		reversal: "undo",
		confirm: (e) => ({
			title: X("catalog:wants.removeMany"),
			body: X("catalog:wants.removeManyBody", { count: e.length })
		}),
		run: async (e) => {
			let { previous: t } = await On(e.map((e) => e.id));
			return await Wt(), async () => {
				await Nn(t), await Wt();
			};
		},
		receipt: (e) => X("catalog:wants.removedMany", { count: e.length })
	}, ee = {
		key: "reset",
		label: X("catalog:wants.searchAgain"),
		reversal: "undo",
		confirm: (e) => ({
			title: X("catalog:wants.searchAgainMany"),
			body: X("catalog:wants.searchAgainManyBody", { count: e.length })
		}),
		run: async (e) => {
			let { previous: t } = await jn(e.map((e) => e.id));
			return await Wt(), async () => {
				await Nn(t), await Wt();
			};
		},
		receipt: (e) => X("catalog:wants.searchAgainDone", { count: e.length })
	}, te = w.filter((e) => e.code && (e.phase === "searching" || e.phase === "given_up")), O = rr({
		queryKey: k,
		queryFn: ({ signal: e }) => et(`${A}?limit=100`, e),
		enabled: g.some((e) => e.code && (e.phase === "searching" || e.phase === "given_up"))
	}), j = O.data?.providers.filter((e) => e.configured) || [], M = j[0]?.key || "";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-busy": u.isPending,
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: at({
					padding: "none",
					className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
				}),
				children: [
					/* @__PURE__ */ (0, $.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: X("catalog:wants.addByCode")
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, $.jsx)("div", {
							className: "min-w-64 grow max-sm:min-w-0",
							children: /* @__PURE__ */ (0, $.jsx)(pe, {
								"aria-label": X("catalog:shared.code"),
								placeholder: X("catalog:wants.codePlaceholder"),
								value: i,
								isDisabled: e,
								onChange: a,
								onKeyDown: f
							})
						}), /* @__PURE__ */ (0, $.jsx)(l, {
							variant: "primary",
							disabled: e || !i.trim(),
							...rt(c.busy === "add"),
							onClick: d,
							children: X("catalog:shared.add")
						})]
					}),
					c.error ? /* @__PURE__ */ (0, $.jsx)(L, {
						tone: "error",
						title: X("catalog:wants.actionFailed"),
						children: c.error
					}) : null
				]
			}),
			u.error ? /* @__PURE__ */ (0, $.jsx)(Oe, {
				titleKey: "catalog:wants.loadFailed",
				query: u
			}) : null,
			u.isPending ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": X("catalog:wants.loading"),
				dangerouslySetInnerHTML: { __html: Gt("wants") }
			}) : null,
			h?.scraping ? /* @__PURE__ */ (0, $.jsx)(Je, {
				embedded: !0,
				kind: Qe("want-scrape"),
				label: X("catalog:wants.fetchingNew")
			}) : null,
			h?.searching ? /* @__PURE__ */ (0, $.jsx)(Je, {
				embedded: !0,
				kind: Qe("want-search"),
				label: X("catalog:wants.searchingResources")
			}) : null,
			O.error ? /* @__PURE__ */ (0, $.jsx)(Oe, {
				titleKey: "catalog:wants.downloadSettingsFailed",
				query: O
			}) : null,
			O.data && !j.length ? /* @__PURE__ */ (0, $.jsxs)(L, {
				tone: "neutral",
				children: [
					X("shell:downloadChannels.notConfigured"),
					X("shell:format.sentenceGap"),
					/* @__PURE__ */ (0, $.jsx)("a", {
						href: "/settings/downloads",
						children: X("shell:downloadChannels.settingsLink")
					})
				]
			}) : null,
			O.data && !O.data.available ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "neutral",
				children: X("catalog:wants.cloudPrimaryOnly")
			}) : null,
			h && !g.length ? /* @__PURE__ */ (0, $.jsx)(re, {
				size: "compact",
				icon: mn,
				title: X(n ? "catalog:wants.noSearchMatches" : "catalog:wants.empty"),
				actions: n && r ? /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					onClick: r,
					children: X("catalog:shared.clearSearch")
				}) : !n && !e ? /* @__PURE__ */ (0, $.jsx)(N, {
					target: `input[aria-label="${X("catalog:shared.code")}"]`,
					children: X("catalog:wants.addWork")
				}) : void 0,
				children: X(n ? "catalog:wants.tryOtherSearch" : "catalog:wants.emptyHint")
			}) : null,
			V.map(([n, r]) => {
				let i = g.filter((e) => e.phase === n);
				return i.length ? /* @__PURE__ */ (0, $.jsx)(Ar, {
					phase: n,
					label: r,
					rows: i,
					selecting: v,
					onRectangle: _ && !c.busy ? (e, t) => b((n) => /* @__PURE__ */ new Set([...t ? n : [], ...e.map(Number)])) : void 0,
					row: (n) => /* @__PURE__ */ (0, $.jsx)(kr, {
						want: n,
						readOnly: e,
						busy: c.busy,
						downloads: O.data,
						provider: M,
						toast: t,
						picked: v ? {
							on: y.has(n.id),
							toggle: (e) => b((t) => {
								let r = new Set(t);
								return e ? r.add(n.id) : r.delete(n.id), r;
							})
						} : void 0,
						onReset: () => m(n),
						onRemove: () => p(n),
						onCloudDownload: () => s({
							code: n.code || "",
							title: n.title || "",
							origin: `wishlist:${n.id}`,
							cover: n.cover || "",
							performers: n.performers || "",
							release_date: n.release_date || "",
							studio: n.studio || ""
						})
					}, n.id)
				}, n) : null;
			}),
			/* @__PURE__ */ (0, $.jsx)(x, {
				prefill: o,
				close: () => s(null),
				receipt: t,
				provider: M
			}),
			/* @__PURE__ */ (0, $.jsxs)(Re, {
				visible: v,
				label: X("catalog:wants.dockLabel"),
				count: X("catalog:javSelection.selectedCount", { count: w.length }),
				actions: [{
					action: D,
					items: w,
					host: E,
					disabled: e,
					done: () => b(/* @__PURE__ */ new Set())
				}, {
					action: ee,
					items: w.filter((e) => e.phase === "given_up"),
					host: E,
					disabled: e,
					done: () => b(/* @__PURE__ */ new Set())
				}],
				leading: /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "secondary",
					disabled: !g.length,
					onClick: () => b(T ? /* @__PURE__ */ new Set() : new Set(g.map((e) => e.id))),
					children: X(T ? "catalog:javSelection.deselectPage" : "catalog:wants.selectAll")
				}),
				children: [/* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "secondary",
					disabled: !te.length,
					onClick: () => C(te.map(({ id: e, code: t, title: n, cover: r, performers: i, studio: a, release_date: o }) => ({
						id: e,
						code: t,
						title: n || "",
						cover: r,
						performers: i,
						studio: a,
						release_date: o
					}))),
					children: X("catalog:shared.searchTorrents")
				}), /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "ghost",
					onClick: () => _?.close(),
					children: X("catalog:javSelection.exit")
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)(_r, {
				items: S,
				close: () => C(null),
				readOnly: e,
				receipt: t
			})
		]
	});
}
// src/react/jav/discovery-faces.tsx
function Mr(e) {
	return fn(e) || Jt(e.source_name || e.name);
}
function Nr({ person: e, name: t, title: n, icon: r, onFilter: i }) {
	if (!t) return null;
	let a = X("catalog:entityHero.subscribeNewReleases");
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(H, {
		name: t,
		title: n,
		href: Mr(e ?? { name: t }),
		icon: r,
		external: !!e?.source_url && !e.id,
		onFilter: i && e ? () => i(e) : void 0
	}), e?.source_url && (!e.id || i) ? /* @__PURE__ */ (0, $.jsx)("a", {
		href: Jt(e.source_name || e.name),
		"data-media-credit-action": "",
		"data-inline-action": "",
		className: "inline-flex shrink-0",
		"aria-label": `${a} · ${t}`,
		title: a,
		children: /* @__PURE__ */ (0, $.jsx)(d, {
			className: "size-4",
			"aria-hidden": !0
		})
	}) : null] });
}
function Pr({ item: e, limit: t = 5 }) {
	$n();
	let n = wt(e.performer_refs, e.performers).slice(0, t).map((t) => {
		let n = t.source_avatar && t.source_actor_id && !t.has_image && !t.has_avatar ? { children: /* @__PURE__ */ (0, $.jsx)(Ve, {
			code: e.code,
			person: t
		}) } : { dangerouslySetInnerHTML: { __html: nt(t.name, t, null) } }, r = X("catalog:javDiscovery.openActress", { name: Y(t) });
		return /* @__PURE__ */ (0, $.jsx)("a", {
			"data-media-avatar": "",
			href: Mr(t),
			"aria-label": r,
			...t.source_url && !t.id ? {
				target: "_blank",
				rel: "noopener noreferrer"
			} : {},
			...n
		}, t.dmm_id || t.name);
	});
	return /* @__PURE__ */ (0, $.jsx)(Te, { faces: n });
}
// src/react/jav/discovery-context.ts
function Fr(e, t) {
	let n = [
		{
			id: "open",
			label: X("catalog:mediaActions.open"),
			icon: ue,
			run: () => t.navigate(e.asset_id ? `/assets/${e.asset_id}` : `/works/${encodeURIComponent(e.code)}`)
		},
		{
			id: "want",
			label: X(e.asset_id ? "catalog:javWant.imported" : e.wanted ? "catalog:javWant.wanted" : "catalog:javWant.want"),
			icon: mn,
			disabled: t.readOnly || t.wanting || !!e.wanted || !!e.asset_id,
			run: t.onWant
		},
		{
			id: "resource",
			label: X("catalog:shared.searchTorrents"),
			icon: pn,
			run: t.onResource
		}
	];
	return e.link && n.push({
		id: "source",
		label: X("catalog:shared.viewOnSite"),
		icon: J,
		run: () => {
			window.open(e.link, "_blank", "noopener,noreferrer");
		}
	}), t.selection && n.push({
		id: "select",
		label: X(t.selection.selected.has(e.code) ? "catalog:mediaActions.deselect" : "catalog:mediaActions.select"),
		icon: de,
		run: () => t.selection?.toggle(e)
	}), {
		key: e.code,
		operations: n
	};
}
// src/react/jav/jav-facets.tsx
function Ir(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = new Map(t(r).map((e) => [n(e), e]));
		for (let [t, n] of e) {
			let e = i.get(t);
			e ? e.count += 1 : i.set(t, {
				id: t,
				value: n,
				count: 1
			});
		}
	}
	return [...i.values()].sort((e, t) => Number(r.includes(t.id)) - Number(r.includes(e.id)) || t.count - e.count);
}
function Lr({ person: e, count: t, pressed: n, onClick: r }) {
	$n();
	let i = Y(e);
	return /* @__PURE__ */ (0, $.jsx)(g, {
		name: i,
		pressed: n,
		onClick: r,
		ringHtml: nt(e.name, e, null),
		title: X("catalog:javReleases.facetCount", {
			name: i,
			count: t
		})
	});
}
function Rr({ studio: e }) {
	let [t, n] = (0, Q.useState)(!1);
	return e.has_logo && !t ? /* @__PURE__ */ (0, $.jsx)("img", {
		"data-list-studio-mark": "",
		src: rn(e.name, "icon", e.logo_version),
		alt: "",
		width: 16,
		height: 16,
		loading: "lazy",
		decoding: "async",
		onError: () => n(!0)
	}) : /* @__PURE__ */ (0, $.jsx)("span", {
		"data-list-studio-mark": "",
		"aria-hidden": !0,
		children: tn(e.name, 1)
	});
}
function zr({ studio: e, count: t, pressed: n, onClick: r, showCount: i = !0 }) {
	return /* @__PURE__ */ (0, $.jsx)(_, {
		name: e.name,
		logo: e.has_logo ? rn(e.name, "icon", e.logo_version) : void 0,
		fallback: tn(e.name, 2),
		pressed: n,
		onClick: r,
		title: X("catalog:javReleases.facetCount", {
			name: e.name,
			count: t
		}),
		children: i ? /* @__PURE__ */ (0, $.jsx)("span", {
			"data-count-badge": "",
			children: t
		}) : null
	});
}
function Br({ name: e, studio: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		"data-list-library": "",
		title: e,
		children: [/* @__PURE__ */ (0, $.jsx)(Rr, { studio: t || {
			name: e,
			has_logo: !1
		} }), /* @__PURE__ */ (0, $.jsx)("span", { children: e })]
	});
}
function Vr({ studio: e }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "inline-flex min-w-0 items-center gap-1.5",
		children: [/* @__PURE__ */ (0, $.jsx)(w, { studio: e }), /* @__PURE__ */ (0, $.jsx)("span", {
			className: "truncate",
			children: e.name
		})]
	});
}
function Hr({ studio: e }) {
	if (!e.entity_id) return null;
	let t = X("catalog:libraryAssistant.openLibrary");
	return /* @__PURE__ */ (0, $.jsx)(u, {
		href: jt("studio", e.name, e.entity_id),
		variant: "ghost",
		size: "small",
		iconOnly: !0,
		leadingIcon: gr,
		"aria-label": `${t} · ${e.name}`,
		title: t
	});
}
// src/react/jav/discovery-card.tsx
var Ur = (e) => ({
	...e,
	cover: e.has_cover ? xt(e, !0) : e.cover_url,
	origin: `${e.asset_id ? "asset" : "feed"}:${e.id}`
}), Wr = "relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default";
function Gr({ item: e, readOnly: t }) {
	let n = Yn(), [r, i] = (0, Q.useState)("");
	(0, Q.useSyncExternalStore)(_t.subscribe, _t.revision);
	let a = e.cover_state;
	if (!a) return /* @__PURE__ */ (0, $.jsx)("span", {
		"data-media-nopic": "",
		children: X("catalog:shared.noCover")
	});
	if (a === "fetching" || _t.has(e.code)) return /* @__PURE__ */ (0, $.jsx)("span", { dangerouslySetInnerHTML: { __html: vt() } });
	let o = () => {
		n.run("cover", (t) => Pt(e.code, t), (t) => {
			t.has_cover ? gt(e.code, t) : i(t.message || X("catalog:javDiscovery.noOfficialCover"));
		});
	}, c = r || n.error ? "missing" : a, u = n.error || r || yt(e);
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-cover-state": c,
		className: "flex max-w-full flex-col items-center gap-1.5 px-4 text-center",
		children: [
			c === "queued" ? /* @__PURE__ */ (0, $.jsx)(s, {
				kind: "clock",
				size: "card",
				still: !0
			}) : null,
			/* @__PURE__ */ (0, $.jsx)("span", {
				"data-media-nopic": "",
				children: f[c]
			}),
			u ? /* @__PURE__ */ (0, $.jsx)("span", {
				className: "line-clamp-3 text-caption-1-regular text-text-secondary",
				title: u,
				children: u
			}) : null,
			t ? null : /* @__PURE__ */ (0, $.jsx)(l, {
				size: "small",
				variant: "secondary",
				className: "mt-1",
				onClick: o,
				children: bt(c)
			})
		]
	});
}
function Kr({ item: e, layout: t, javImage: n, readOnly: r, navigate: i, tag: a = "", onTag: o, wanting: s, onWant: d, onResource: f, badge: m, onFilterPerson: h, studioFilter: g }) {
	$n();
	let _ = !!h, v = xr(), y = e.code ? v : null, b = ur(), x = !_ && d && f ? Fr(e, {
		selection: y,
		readOnly: r,
		wanting: !!s,
		navigate: i,
		onWant: d,
		onResource: f
	}) : null, S = y?.selected.has(e.code), C = !_ && !!v?.dense, w = wt(e.performer_refs, e.performers), T = Qt(w.map(Y)), E = w[0], D = E ? Y(E) : "", ee = _ && e.duration ? Vt(e.duration) : "", te = Ct(e, t, n), O = e.asset_id ? `/assets/${e.asset_id}` : e.code ? `/works/${encodeURIComponent(e.code)}` : e.link, k = !e.code && !!e.link, A = () => {
		k ? window.open(O, "_blank", "noopener") : i(O);
	}, j = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)("b", { children: e.code }),
		" ",
		e.title ? /* @__PURE__ */ (0, $.jsx)("span", {
			lang: Kn(e.title),
			children: e.title
		}) : X("catalog:javDiscovery.titleNotFound")
	] }), M = {
		href: O,
		...k ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		onClick: (e) => {
			k || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), A());
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)("article", {
		"data-media-card": "",
		"data-jav-card": "",
		"data-rectangle-key": e.code || void 0,
		"data-selected": S ? "" : void 0,
		onMouseDown: Un,
		onContextMenu: x ? (e) => b.onContextMenu(e, x) : void 0,
		onKeyDown: x ? (e) => b.onKeyDown(e, x) : void 0,
		onClickCapture: (t) => {
			t.target.closest("[data-work-context-menu], [data-cast-popover]") || y && (y.mode || Ut(t)) && (t.preventDefault(), t.stopPropagation(), y.toggle(e, t.shiftKey));
		},
		onClick: (e) => {
			e.target.closest("a,button,input,[role=\"dialog\"]") || A();
		},
		children: [
			b.menu,
			te ? /* @__PURE__ */ (0, $.jsxs)("a", {
				...M,
				"data-work-card-link": "",
				tabIndex: -1,
				"aria-label": X("catalog:javDiscovery.viewDetails", { code: e.code || e.title }),
				"data-media-pic": "",
				"data-jav-cover-box": "",
				className: Wr,
				children: [/* @__PURE__ */ (0, $.jsx)(c, {
					artwork: {
						kind: "cover",
						html: te
					},
					identity: Ct(e, "small", n),
					relayout: (e) => vn(e, t)
				}), ee ? /* @__PURE__ */ (0, $.jsx)("span", {
					"data-media-duration": "",
					children: ee
				}) : null]
			}) : /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-pic": "",
				"data-jav-cover-box": "",
				className: Wr,
				children: /* @__PURE__ */ (0, $.jsx)(Gr, {
					item: e,
					readOnly: r
				})
			}),
			y?.mode ? /* @__PURE__ */ (0, $.jsx)("button", {
				type: "button",
				"data-media-check": "",
				tabIndex: -1,
				"aria-label": X("catalog:javDiscovery.select", { code: e.code }),
				"aria-pressed": !!S,
				children: /* @__PURE__ */ (0, $.jsx)("svg", {
					viewBox: "0 0 24 24",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, $.jsx)("use", { href: "#i-check" })
				})
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)("div", {
				"data-media-meta": "",
				children: [/* @__PURE__ */ (0, $.jsx)(Pr, {
					item: e,
					limit: _ ? 3 : void 0
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-media-text": "",
					children: [
						/* @__PURE__ */ (0, $.jsx)("h3", {
							"data-jav-title": "",
							"data-media-title": "",
							title: `${e.code} · ${e.title || X("catalog:javDiscovery.titleNotFound")}`,
							children: y?.mode ? /* @__PURE__ */ (0, $.jsx)("button", {
								type: "button",
								className: "text-start focus-visible:outline-border-focus-ring",
								"aria-label": X("catalog:javDiscovery.select", { code: e.code }),
								"aria-pressed": !!S,
								children: j
							}) : /* @__PURE__ */ (0, $.jsx)("a", {
								...M,
								"data-work-card-link": "",
								className: "no-underline focus-visible:outline-border-focus-ring",
								children: j
							})
						}),
						/* @__PURE__ */ (0, $.jsxs)("div", {
							"data-media-byline": "",
							children: [
								/* @__PURE__ */ (0, $.jsx)(Nr, {
									person: E,
									name: D,
									title: T,
									onFilter: h,
									icon: !0
								}),
								/* @__PURE__ */ (0, $.jsx)(p, {
									people: w,
									total: e.performer_total,
									assetId: e.asset_id ?? void 0,
									code: e.code,
									subscribe: !0,
									onFilter: h
								}),
								e.release_date || g && e.studio_ref ? /* @__PURE__ */ (0, $.jsxs)("span", {
									"data-media-facts": "",
									children: [e.release_date ? /* @__PURE__ */ (0, $.jsxs)("time", {
										"data-media-release": "",
										dateTime: e.release_date,
										children: [/* @__PURE__ */ (0, $.jsx)("svg", {
											viewBox: "0 0 24 24",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, $.jsx)("use", { href: "#i-calendar" })
										}), e.release_date]
									}) : null, g && e.studio_ref ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("button", {
										"data-media-who": "",
										"data-inline-action": "",
										type: "button",
										"aria-pressed": g.selected,
										title: e.studio_ref.name,
										onClick: g.onPress,
										children: /* @__PURE__ */ (0, $.jsx)(Vr, { studio: e.studio_ref })
									}), /* @__PURE__ */ (0, $.jsx)(Hr, { studio: {
										name: e.studio_ref.name,
										entity_id: g.entityId
									} })] }) : null]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, $.jsxs)("div", {
							"data-jav-tags": "",
							"data-media-tags": "",
							children: [m, (e.tags || []).slice(0, 4).map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
								type: "button",
								"data-media-tag": "",
								"aria-pressed": typeof a == "string" ? a === e : a.includes(e),
								onClick: () => o?.(a === e ? "" : e),
								children: e
							}, e))]
						})
					]
				})]
			}),
			y?.mode ? null : /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-jav-actions": "",
				"data-compact": C ? "" : void 0,
				"data-has-source": e.link ? "" : void 0,
				className: "flex flex-wrap gap-2",
				children: [
					e.link ? /* @__PURE__ */ (0, $.jsx)(u, {
						"data-button-link": "",
						"data-jav-source": "",
						variant: "secondary",
						size: C ? "small" : "medium",
						iconOnly: C,
						"aria-label": X("catalog:shared.viewOnSite"),
						title: X("catalog:shared.viewOnSite"),
						leadingIcon: C ? J : void 0,
						trailingIcon: C ? void 0 : J,
						href: e.link,
						target: "_blank",
						rel: "noopener noreferrer",
						children: C ? null : _ ? /* @__PURE__ */ (0, $.jsx)(K, {
							site: "dmm",
							label: "DMM"
						}) : /* @__PURE__ */ (0, $.jsx)("span", {
							"data-external-link-label": "",
							children: X("catalog:shared.viewOnSite")
						})
					}) : null,
					d ? /* @__PURE__ */ (0, $.jsx)(l, {
						variant: "ghost",
						size: C ? "small" : "medium",
						disabled: r || e.wanted || !!e.asset_id,
						...rt(!!s),
						onClick: d,
						children: e.asset_id ? X("catalog:javWant.imported") : e.wanted ? X("catalog:javWant.wanted") : X("catalog:javWant.want")
					}) : null,
					f ? /* @__PURE__ */ (0, $.jsx)(l, {
						variant: "secondary",
						size: C ? "small" : "medium",
						onClick: f,
						children: X("catalog:shared.searchTorrents")
					}) : null
				]
			})
		]
	});
}
// src/react/jav/jav-code-filter.tsx
function qr(e) {
	return e.normalize("NFKC").toLowerCase().replace(/[\s_\-‐‑‒–—―]+/g, "");
}
function Jr(e, t) {
	return qr(e).includes(qr(t));
}
function Yr({ value: e, onChange: t }) {
	let [n, r] = (0, Q.useState)(e), i = X("catalog:columnFilter.search", { column: X("catalog:shared.code") });
	return /* @__PURE__ */ (0, $.jsxs)("form", {
		className: "flex flex-col gap-3 p-3",
		"data-copy-interact": "",
		onSubmit: (e) => {
			e.preventDefault(), qr(n) && t(n.trim());
		},
		children: [/* @__PURE__ */ (0, $.jsx)(pe, {
			size: "small",
			label: i,
			value: n,
			onChange: r,
			maxLength: 80
		}), /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, $.jsx)(l, {
				variant: "ghost",
				size: "small",
				type: "button",
				disabled: !e,
				onClick: () => t(""),
				children: X("catalog:shared.clearFilters")
			}), /* @__PURE__ */ (0, $.jsx)(l, {
				size: "small",
				type: "submit",
				disabled: !qr(n),
				children: X("follow:shared.search")
			})]
		})]
	});
}
// src/react/jav/jav-release-table.tsx
var Xr = {
	widths: ke,
	visibility: U
}, Zr = {
	...W,
	taste: "taste"
};
function Qr({ column: e, label: t, filters: n, onChange: r }) {
	let i = e === "people" ? "performer" : e === "tags" ? "tag" : "studio", a = Bn(n, i, void 0);
	return /* @__PURE__ */ (0, $.jsx)(Ue, {
		id: e,
		label: t,
		values: yn(n, i),
		load: async (t, n, r) => {
			let i = await Lt(a, e, n, r, t);
			return {
				items: i.items.map((t) => {
					let n = e === "people" ? t : null, r = n && Mt("performer", n.name, n.id);
					return {
						id: t.name,
						label: t.name,
						count: t.count,
						searchTerms: [...n?.aliases || [], ...[r?.ja, r?.zh_cn].filter((e) => !!e)],
						leading: n ? /* @__PURE__ */ (0, $.jsx)(S, { person: n }) : void 0
					};
				}),
				nextOffset: i.next_offset ?? void 0
			};
		},
		queryKey: [
			"jav-release-column",
			e,
			a.performer,
			a.studio,
			a.tag,
			a.column_filters || "",
			a.q,
			a.code || ""
		],
		onChange: (e) => r(i, e)
	});
}
function $r({ items: a, waiting: o, filters: s, discovery: u, studios: d = [], facets: m, javImage: h, readOnly: g, navigate: _, onTag: b, onFilter: x, onRange: S, onSort: C, wanting: w, onWant: T, onResource: E, selecting: D = !0, tableTop: ee }) {
	let k = xr(), A = ur(), j = (e) => Fr(e, {
		selection: k,
		readOnly: g,
		wanting: w(e),
		navigate: _,
		onWant: () => T(e),
		onResource: () => E(e)
	}), ne = cr(u ? te : "jav-releases", u ? Tt : xn, u ? O : Xr), N = ne.columns.filter((e) => e.required || ne.visibility[e.id] !== !1), re = u ? Zr : W, ie = Object.entries(re).find(([, e]) => e === (u?.sort ?? s?.sort))?.[0], ae = u?.dir ?? s?.dir, oe = gn(s?.column_filters), se = s ? bn(s, "tag") : u?.tag ? [u.tag] : [], P = X(u ? "catalog:javTabs.discover" : "catalog:javReleases.list"), ce = new Map(d.map((e) => [e.name, e])), le = (e) => (t) => {
		t.preventDefault(), k?.mode || Ut(t) ? k?.toggle(e, t.shiftKey) : _(e.asset_id ? `/assets/${e.asset_id}` : `/works/${encodeURIComponent(e.code)}`);
	}, ue = (e, t) => {
		switch (e) {
			case "name": {
				let e = Ct(t, "small", h);
				return /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-list-identity": "",
					children: [/* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-list-open": "",
						tabIndex: -1,
						"aria-hidden": "true",
						onClick: le(t),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-list-picture": "",
							children: e ? /* @__PURE__ */ (0, $.jsx)(c, {
								artwork: {
									kind: "cover",
									html: e
								},
								relayout: (e) => vn(e, "small")
							}) : /* @__PURE__ */ (0, $.jsx)("span", {
								title: yt(t) || void 0,
								children: t.cover_state ? f[t.cover_state] : X("catalog:shared.noCover")
							})
						})
					}), /* @__PURE__ */ (0, $.jsx)("span", {
						"data-list-text": "",
						children: /* @__PURE__ */ (0, $.jsxs)("button", {
							type: "button",
							"data-list-name": "",
							title: `${t.code} · ${t.title || X("catalog:javDiscovery.titleNotFound")}`,
							"aria-label": X("catalog:javDiscovery.viewDetails", { code: t.code }),
							onClick: le(t),
							children: [
								/* @__PURE__ */ (0, $.jsx)("b", { children: t.code }),
								" ",
								t.title ? /* @__PURE__ */ (0, $.jsx)("span", {
									lang: Kn(t.title),
									children: t.title
								}) : X("catalog:javDiscovery.titleNotFound")
							]
						})
					})]
				});
			}
			case "people": {
				let e = wt(t.performer_refs, t.performers), n = e[0];
				return n ? /* @__PURE__ */ (0, $.jsx)(we, {
					avatar: /* @__PURE__ */ (0, $.jsx)(Pr, { item: t }),
					cast: /* @__PURE__ */ (0, $.jsx)(p, {
						people: e,
						total: t.performer_total,
						assetId: t.asset_id ?? void 0,
						code: t.code,
						subscribe: !0
					}),
					children: /* @__PURE__ */ (0, $.jsx)(Nr, {
						person: n,
						name: Y(n),
						title: n.name
					})
				}) : "—";
			}
			case "studio": return t.studio ? /* @__PURE__ */ (0, $.jsx)(Br, {
				name: t.studio,
				studio: t.studio_ref || ce.get(t.studio)
			}) : "—";
			case "tags": return t.tags?.length ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-tags": "",
				"data-list-tags": "",
				children: t.tags.map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
					type: "button",
					"data-media-tag": "",
					"aria-pressed": se.includes(e),
					onClick: () => b(e),
					children: e
				}, e))
			}) : "—";
			case "code": return t.code;
			case "dur": return Vt(t.duration) || "—";
			case "score": return t.source_score == null ? "—" : `${t.source_score.toFixed(2)} / 5`;
			case "taste": return Ot(t.taste_score ?? t.score);
			case "release": return t.release_date || "—";
			default: return /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-release-actions": "",
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "ghost",
					disabled: g || t.wanted || !!t.asset_id,
					...rt(w(t)),
					onClick: () => T(t),
					children: t.asset_id ? X("catalog:javWant.imported") : t.wanted ? X("catalog:javWant.wanted") : X("catalog:javWant.want")
				}), /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					variant: "secondary",
					onClick: () => E(t),
					children: X("catalog:shared.searchTorrents")
				})]
			});
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-catalog-table": "",
		"data-catalog-view-mode": "list",
		"data-release-table": "",
		"data-discover-table": u ? "" : void 0,
		className: "flex min-w-0 flex-col gap-4",
		onKeyDown: (e) => {
			let t = e.target.closest("[data-release-row]"), n = t && a.find((e) => String(e.id) === t.dataset.releaseId);
			n && !o && A.onKeyDown(e, j(n), t);
		},
		children: [
			A.menu,
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex flex-wrap justify-end gap-2",
				role: "group",
				"aria-label": u ? P : X("catalog:javReleases.toolbar"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					"data-toolbar-actions": "",
					children: /* @__PURE__ */ (0, $.jsx)(q, {
						preferences: ne,
						label: P
					})
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(M, {
				ref: ee,
				follow: !0,
				preferences: ne,
				rectangleSelecting: !!k?.mode,
				onRectangle: D && !o && a.length ? k?.selectRectangle : void 0,
				onRowClick: D && !o && k?.mode ? (e) => {
					let t = a.find((t) => String(t.id) === e);
					t && k.toggle(t);
				} : void 0,
				children: /* @__PURE__ */ (0, $.jsxs)(He, {
					"aria-label": P,
					size: "sm",
					sortDescriptor: ie ? {
						column: ie,
						direction: ae === "asc" ? "ascending" : "descending"
					} : void 0,
					onSortChange: (e) => {
						let t = re[String(e.column)];
						t && C(t, e.direction === "ascending" ? "asc" : "desc");
					},
					children: [/* @__PURE__ */ (0, $.jsxs)(i, { children: [
						k?.mode ? /* @__PURE__ */ (0, $.jsx)(t, {
							id: "selection",
							width: 44,
							"aria-label": X("catalog:javReleases.selectVideos"),
							children: /* @__PURE__ */ (0, $.jsx)(v, {
								slot: null,
								"aria-label": X("catalog:catalogList.selectAllOnPage"),
								isSelected: k.all,
								isIndeterminate: k.mixed,
								isDisabled: o || !a.length,
								onChange: k.selectPage
							})
						}) : null,
						N.map((e) => /* @__PURE__ */ (0, $.jsx)(t, {
							id: e.id,
							isRowHeader: e.id === "name",
							allowsSorting: e.id in re,
							...ne.columnProps(e.id),
							children: ({ sortDirection: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("span", {
								className: "flex items-center gap-0.5",
								children: [u?.headers[e.id] ?? (s && S && (e.id === "release" || e.id === "dur" || e.id === "score") ? /* @__PURE__ */ (0, $.jsx)(We, {
									id: e.id,
									label: e.label,
									kind: lt[e.id],
									value: oe[e.id],
									rangeQuery: e.id === "release" ? Sn(s) : void 0,
									onChange: (t) => S(e.id, t)
								}) : s && m && x && [
									"people",
									"studio",
									"tags"
								].includes(e.id) ? /* @__PURE__ */ (0, $.jsx)(Qr, {
									column: e.id,
									label: e.label,
									filters: s,
									onChange: x
								}) : e.label), e.id in re ? /* @__PURE__ */ (0, $.jsx)("span", {
									"data-sort-indicator": !0,
									"data-direction": t || void 0,
									children: /* @__PURE__ */ (0, $.jsx)(y, {})
								}) : null]
							}), /* @__PURE__ */ (0, $.jsx)(Ge, {
								preferences: ne,
								id: e.id
							})] })
						}, e.id)),
						/* @__PURE__ */ (0, $.jsx)(t, {
							id: "remaining-space",
							"aria-label": X("catalog:catalogList.rowSpacer"),
							"data-table-space": "",
							width: ne.spaceWidth,
							minWidth: 0
						})
					] }), /* @__PURE__ */ (0, $.jsx)(e, {
						renderEmptyState: () => X("catalog:javReleases.noMatches"),
						children: o ? Array.from({ length: 6 }, (e, t) => /* @__PURE__ */ (0, $.jsxs)(n, {
							id: `skeleton-${t}`,
							"data-list-skeleton-row": "",
							"aria-hidden": "true",
							children: [
								k?.mode ? /* @__PURE__ */ (0, $.jsx)(r, {}) : null,
								N.map((e) => /* @__PURE__ */ (0, $.jsx)(r, { children: /* @__PURE__ */ (0, $.jsx)("span", { dangerouslySetInnerHTML: { __html: st(e.id) } }) }, e.id)),
								/* @__PURE__ */ (0, $.jsx)(r, { "data-table-space": "" })
							]
						}, `skeleton-${t}`)) : a.map((e) => /* @__PURE__ */ (0, $.jsxs)(n, {
							id: String(e.id),
							"data-catalog-row": "",
							"data-release-row": "",
							"data-release-id": e.id,
							"data-rectangle-key": e.code,
							"data-board-selected": k?.selected.has(e.code) || void 0,
							onContextMenu: (t) => A.onContextMenu(t, j(e)),
							children: [
								k?.mode ? /* @__PURE__ */ (0, $.jsx)(r, { children: /* @__PURE__ */ (0, $.jsx)(v, {
									slot: null,
									"aria-label": X("catalog:javDiscovery.select", { code: e.code }),
									isSelected: k.selected.has(e.code),
									onChange: () => k.toggle(e)
								}) }) : null,
								N.map((t) => /* @__PURE__ */ (0, $.jsx)(r, { children: ue(t.id, e) }, t.id)),
								/* @__PURE__ */ (0, $.jsx)(r, { "data-table-space": "" })
							]
						}, e.id))
					})]
				})
			})
		]
	});
}
// src/react/jav/jav-releases.tsx
var ei = `<div data-catalog-tier="performers" data-skeleton="tiers">${qn("performer")}</div><div data-catalog-tier="studios">${qn("studio")}</div>`;
function ti({ value: e }) {
	let t = _n(e);
	return /* @__PURE__ */ (0, $.jsx)("span", {
		"data-jav-taste-score": "",
		title: X("catalog:javScore.taste", { score: t.score }),
		children: /* @__PURE__ */ (0, $.jsx)(b, {
			color: t.color,
			children: t.label
		})
	});
}
var ni = (e) => Pt(e).then((t) => (t.has_cover && gt(e, t), t.has_cover));
function ri({ readOnly: e, receipt: t, resource: n, query: r, navigate: i, clearText: a }) {
	let [o, s] = (0, Q.useState)(() => Cn(location.search)), c = (0, Q.useSyncExternalStore)(tt().subscribe, () => En("jav-releases", 24));
	(0, Q.useEffect)(() => {
		new URLSearchParams(location.search).has("size") || o.size === c || (s((e) => ({
			...e,
			page: 1,
			size: c
		})), Z({ page: "" }));
	}, [o.size, c]), (0, Q.useEffect)(() => {
		r !== o.q && (s((e) => ({
			...e,
			q: r,
			page: 1
		})), Z({ page: "" }));
	}, [r, o.q]);
	let f = (e, t) => {
		let n = Bn(o, e, t);
		s(n), Z({
			[e]: "",
			column_filters: n.column_filters || "",
			page: ""
		});
	}, p = (e, t) => {
		let n = yn(o, e);
		f(e, n === void 0 ? [t] : Jn(n, t, !dt(n, t)));
	}, g = (e) => {
		s((t) => ({
			...t,
			column_filters: e,
			page: 1
		})), Z({
			column_filters: e,
			page: ""
		});
	}, _ = (e, t) => g(hr(gn(o.column_filters), e, t)), v = (e) => {
		s((t) => ({
			...t,
			code: e,
			page: 1
		})), Z({
			code: e,
			page: ""
		});
	}, y = gn(o.column_filters), b = (e, t) => ({
		active: !!y[e],
		shouldCloseOnInteractOutside: e === "release" ? un : void 0,
		render: (n) => /* @__PURE__ */ (0, $.jsx)(Ke, {
			label: t,
			kind: lt[e],
			value: y[e],
			rangeQuery: e === "release" ? Sn(o) : void 0,
			onChange: (t) => {
				_(e, t), n();
			}
		})
	}), x = (0, Q.useRef)(null), C = (0, Q.useRef)(null), T = ({ pageIndex: e, pageSize: t }) => {
		let n = e + 1, r = t !== o.size;
		r && Tn("jav-releases", t), s((e) => ({
			...e,
			page: n,
			size: t
		})), Z({
			page: n > 1 ? String(n) : "",
			...r && { size: String(t) }
		}), M !== "list" && x.current?.scrollIntoView({ block: "start" });
	}, ee = () => {
		s((e) => ({
			...e,
			performer: "",
			studio: "",
			tag: "",
			code: "",
			column_filters: "",
			q: "",
			page: 1
		})), Z({
			performer: "",
			studio: "",
			tag: "",
			code: "",
			column_filters: "",
			page: ""
		}), a();
	}, te = (e, t) => {
		s((n) => ({
			...n,
			sort: e,
			dir: t,
			seed: "",
			page: 1
		})), Z({
			sort: e === "release_date" ? "" : e,
			dir: t === "asc" ? "asc" : "",
			seed: "",
			page: ""
		});
	}, O = () => {
		let e = Math.random().toString(36).slice(2, 10);
		s((t) => ({
			...t,
			sort: "random",
			dir: "desc",
			seed: e,
			page: 1
		})), Z({
			sort: "random",
			dir: "",
			seed: e,
			page: ""
		});
	};
	(0, Q.useEffect)(() => {
		let e = [...x.current?.querySelectorAll("[data-catalog-tier],[data-filter-row=\"bottom\"]") || []].map((e) => pr(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let k = tt();
	(0, Q.useSyncExternalStore)(k.subscribe, k.version, k.version);
	let A = qt(), M = Xn(), ne = ot(Ht({
		active: !0,
		home: !1,
		portrait: !1
	})), N = rr({
		queryKey: wn(o),
		queryFn: ({ signal: e }) => Rt(o, e),
		placeholderData: $t,
		retry: !1,
		refetchOnWindowFocus: !1
	}), ae = N.data?.metadata_job, P = (0, Q.useRef)(!1);
	P.current = ae?.status === "running";
	let ue = hn.getQueryData(D)?.metadata_job, de = rr({
		queryKey: D,
		retry: !1,
		refetchOnWindowFocus: !1,
		enabled: ae?.status === "running" || ue?.status === "running",
		queryFn: ({ signal: e }) => It(e),
		refetchInterval: an(() => P.current)
	}), fe = de.data && de.dataUpdatedAt >= N.dataUpdatedAt ? de.data.metadata_job : ae, pe = fe?.status === "running", ge = (0, Q.useRef)(!1);
	(0, Q.useEffect)(() => {
		ge.current && !pe && N.refetch(), ge.current = pe;
	}, [pe, N]);
	let ve = (0, Q.useRef)(""), be = JSON.stringify([
		o.performer,
		o.studio,
		o.tag,
		o.column_filters,
		o.q,
		o.code,
		o.sort,
		o.dir,
		o.seed
	]), Se = !N.isPlaceholderData && (N.data?.metadata_unread || 0) > 0 && !pe, Ce = Yn(), we = () => void Ce.run("start", async (e) => {
		let t = await ht("start", o, "", e);
		return await hn.cancelQueries({ queryKey: D }), t;
	}, (e) => hn.setQueryData(D, e));
	(0, Q.useEffect)(() => {
		Se && !Ce.busy && ve.current !== be && (ve.current = be, we());
	}, [
		Se,
		be,
		Ce.busy
	]);
	let F = Yn(), Te = (e) => {
		F.run(String(e.id), (t) => $e({ code: e.code }, t), () => {
			t(X("catalog:javWant.added")), Wt(), N.refetch();
		});
	}, I = N.data, Ee = (I?.facets.tags || []).map((e) => ({
		id: e.name,
		label: e.name,
		count: e.count,
		selected: bn(o, "tag").includes(e.name)
	}));
	Cr(I?.items || []);
	let R = N.isPending, z = R || N.isPlaceholderData, B = z || pe && !Ee.length, V = I ? void 0 : N.error, De = Sr(!R && !N.isPlaceholderData), H = !!(o.performer || o.studio || o.tag || o.column_filters || o.q || o.code), U = Math.max(1, Math.ceil((I?.total || 0) / o.size));
	return (0, Q.useEffect)(() => {
		!I || N.isPlaceholderData || o.page <= U || (s((e) => ({
			...e,
			page: U
		})), Z({ page: U > 1 ? String(U) : "" }));
	}, [
		I,
		N.isPlaceholderData,
		o.page,
		U
	]), /* @__PURE__ */ (0, $.jsxs)("section", {
		ref: x,
		"aria-label": X("catalog:entityHero.subscribeNewReleases"),
		"aria-busy": R || N.isFetching,
		className: "flex min-w-0 scroll-mt-24 flex-col gap-4",
		children: [
			R ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-catalog-tiers": "",
				className: me,
				"aria-busy": "true",
				dangerouslySetInnerHTML: { __html: ei }
			}) : null,
			I && (I.facets.performers.length || I.facets.studios.length) ? /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-catalog-tiers": "",
				"data-release-tiers": "",
				className: me,
				children: [I.facets.performers.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					"data-catalog-tier": "performers",
					role: "group",
					"aria-label": X("catalog:javReleases.filterByActress"),
					children: I.facets.performers.map((e) => /* @__PURE__ */ (0, $.jsx)(Lr, {
						person: e,
						count: e.count,
						pressed: bn(o, "performer").includes(e.name),
						onClick: () => p("performer", e.name)
					}, e.name))
				}) : null, I.facets.studios.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					"data-catalog-tier": "studios",
					role: "group",
					"aria-label": X("catalog:javReleases.filterByLabel"),
					children: I.facets.studios.map((e) => /* @__PURE__ */ (0, $.jsx)(zr, {
						studio: e,
						count: e.count,
						pressed: bn(o, "studio").includes(e.name),
						onClick: () => p("studio", e.name)
					}, e.name))
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(se, {
				label: X("catalog:javReleases.filtersLabel"),
				topLabel: X("catalog:catalogFilter.viewsAndTags"),
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				busy: R,
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				top: B || Ee.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					"data-catalog-scroll": "",
					children: B ? /* @__PURE__ */ (0, $.jsx)("div", {
						"data-filter-tag-strip": "",
						"data-skeleton": ye,
						"data-loading": "",
						"aria-hidden": !0,
						dangerouslySetInnerHTML: { __html: Xt() }
					}) : /* @__PURE__ */ (0, $.jsx)(ce, {
						choices: Ee,
						onSelect: (e) => p("tag", e)
					})
				}) : null,
				bottom: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
					/* @__PURE__ */ (0, $.jsx)("span", {
						"data-catalog-readout": "",
						children: R ? /* @__PURE__ */ (0, $.jsx)("span", {
							"data-skeleton": "count",
							"aria-hidden": !0,
							className: "relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen"
						}) : H ? X("catalog:javReleases.matchedCount", {
							matched: I?.total || 0,
							count: I?.candidate_total || 0
						}) : X("catalog:countLabel.works", { count: I?.total || 0 })
					}),
					/* @__PURE__ */ (0, $.jsx)(xe, { tab: "releases" }),
					H ? /* @__PURE__ */ (0, $.jsx)(ie, {
						onPress: ee,
						children: X("catalog:shared.clearFilters")
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(le, {
						tools: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(ze, {
							onPress: O,
							busy: o.sort === "random" && N.isFetching
						}), /* @__PURE__ */ (0, $.jsx)(h, { cardLayout: /* @__PURE__ */ (0, $.jsx)(Ie, {
							label: X("catalog:entityFilter.javCardLayout"),
							value: A,
							options: he,
							onChange: Hn
						}) })] }),
						fields: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
							/* @__PURE__ */ (0, $.jsx)(oe, {
								id: "jav-release-performers",
								orderKey: "performer",
								label: X("catalog:shared.performers"),
								pending: z,
								error: V,
								withAvatar: !0,
								choices: (I?.facets.performers || []).map((e) => ({
									id: e.name,
									label: e.name,
									count: e.count,
									selected: bn(o, "performer").includes(e.name),
									leading: /* @__PURE__ */ (0, $.jsx)(S, { person: e })
								})),
								onSelect: (e) => p("performer", e),
								active: yn(o, "performer") !== void 0,
								onClear: yn(o, "performer") === void 0 ? void 0 : () => f("performer", void 0)
							}),
							/* @__PURE__ */ (0, $.jsx)(oe, {
								id: "jav-release-studios",
								orderKey: "studio",
								label: X("catalog:shared.label"),
								pending: z,
								error: V,
								withAvatar: !0,
								choices: (I?.facets.studios || []).map((e) => ({
									id: e.name,
									label: e.name,
									count: e.count,
									selected: bn(o, "studio").includes(e.name),
									leading: /* @__PURE__ */ (0, $.jsx)(w, { studio: e })
								})),
								onSelect: (e) => p("studio", e),
								active: yn(o, "studio") !== void 0,
								onClear: yn(o, "studio") === void 0 ? void 0 : () => f("studio", void 0)
							}),
							/* @__PURE__ */ (0, $.jsx)(oe, {
								id: "jav-release-tags",
								orderKey: "tags",
								label: X("catalog:shared.tags"),
								pending: B,
								error: V,
								choices: Ee,
								onSelect: (e) => p("tag", e),
								active: yn(o, "tag") !== void 0,
								onClear: yn(o, "tag") === void 0 ? void 0 : () => f("tag", void 0)
							})
						] }),
						sorts: /* @__PURE__ */ (0, $.jsx)(Be, {
							group: "releases",
							sorts: je.map(([e, t, n]) => ({
								key: e,
								label: t,
								ariaLabel: n,
								pressed: e === o.sort,
								dir: o.dir
							})),
							onSort: (e, t) => te(e, t),
							filters: {
								release_date: b("release", X("catalog:catalogList.releaseDate")),
								duration: b("dur", X("catalog:catalogList.duration")),
								source_score: b("score", X("catalog:javSort.siteRating")),
								taste: b("taste", X("catalog:javSort.taste")),
								code: {
									active: !!o.code,
									render: (e) => /* @__PURE__ */ (0, $.jsx)(Yr, {
										value: o.code || "",
										onChange: (t) => {
											v(t), e();
										}
									})
								}
							}
						})
					})
				] })
			}),
			M === "cards" && o.column_filters ? /* @__PURE__ */ (0, $.jsx)(m, {
				encoded: o.column_filters,
				columns: [...xn, {
					id: "taste",
					label: X("catalog:javSort.taste")
				}],
				onChange: g
			}) : null,
			R && M === "cards" ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": X("catalog:javReleases.loading"),
				dangerouslySetInnerHTML: { __html: Gt("discover", A) }
			}) : null,
			N.error ? /* @__PURE__ */ (0, $.jsx)(Oe, {
				titleKey: "catalog:javReleases.failed",
				query: N
			}) : null,
			Se && Ce.error ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "error",
				title: /* @__PURE__ */ (0, $.jsx)("span", {
					"data-copy-key": "catalog.javMetadata.requestFailed",
					children: X("catalog:javMetadata.requestFailed")
				}),
				action: /* @__PURE__ */ (0, $.jsx)(l, {
					variant: "secondary",
					size: "small",
					disabled: !!Ce.busy,
					onClick: we,
					children: X("catalog:shared.retryNow")
				}),
				children: Ce.error
			}) : null,
			pe && fe ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, $.jsx)(Je, {
					kind: Qe("jav-discovery-metadata"),
					label: X("catalog:javMetadata.loadingProgress", {
						completed: fe.completed,
						count: fe.total
					}),
					value: fe.completed,
					total: fe.total
				})
			}) : null,
			e ? null : /* @__PURE__ */ (0, $.jsx)(E, {
				scope: X("catalog:javReleases.coverQueueScope"),
				fetchOne: ni,
				codes: (I?.items || []).filter((e) => e.cover_state === "queued" && !e.cover_url).map((e) => e.code),
				settled: (e, n) => {
					t(e === n ? X("catalog:javReleases.coversFetched", { count: n }) : X("catalog:javReleases.coversPartial", {
						got: e,
						count: n
					})), N.refetch();
				}
			}),
			!R && !N.error && !I?.items.length && (M === "cards" || !H) ? /* @__PURE__ */ (0, $.jsx)(re, {
				icon: d,
				title: X(H ? "catalog:javReleases.noMatches" : "catalog:javReleases.emptyTitle"),
				actions: H ? /* @__PURE__ */ (0, $.jsx)(l, {
					size: "small",
					onClick: ee,
					children: X("catalog:shared.clearFilters")
				}) : /* @__PURE__ */ (0, $.jsx)(u, {
					size: "small",
					href: "/subscriptions?tab=add",
					children: X("catalog:javReleases.addSubscription")
				}),
				children: X(H ? "catalog:javReleases.clearFiltersHint" : "catalog:javReleases.emptyHint")
			}) : null,
			F.error ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "error",
				children: F.error
			}) : null,
			M === "list" ? R || I?.items.length || H ? /* @__PURE__ */ (0, $.jsx)($r, {
				items: I?.items || [],
				waiting: R,
				filters: o,
				tableTop: C,
				selecting: !N.isPlaceholderData,
				studios: I?.facets.studios || [],
				javImage: k.value.javImage,
				readOnly: e,
				navigate: i,
				facets: I?.facets,
				onFilter: f,
				onRange: _,
				onTag: (e) => p("tag", e),
				onSort: te,
				wanting: (e) => F.busy === String(e.id),
				onWant: Te,
				onResource: (e) => n(Ur(e))
			}) : null : /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-grid": "",
				className: _e,
				style: { "--card-ratio": ne },
				...De,
				children: (I?.items || []).map((t) => /* @__PURE__ */ (0, $.jsx)(Kr, {
					item: t,
					layout: A,
					javImage: k.value.javImage,
					readOnly: e,
					navigate: i,
					tag: bn(o, "tag"),
					onTag: (e) => p("tag", e),
					wanting: F.busy === String(t.id),
					onWant: () => Te(t),
					onResource: () => n(Ur(t)),
					badge: o.sort === "taste" || y.taste ? /* @__PURE__ */ (0, $.jsx)(ti, { value: t.taste_score }) : void 0
				}, t.id))
			}),
			I ? /* @__PURE__ */ (0, $.jsx)(j, {
				label: X("catalog:javTabs.newReleases"),
				total: I.total,
				pagination: {
					pageIndex: o.page - 1,
					pageSize: o.size
				},
				onChange: T,
				scrollTarget: M === "list" ? C : void 0,
				stickyHeader: () => x.current?.querySelector("[data-filter-frame]") ?? null,
				unit: X("catalog:catalogList.footerUnit"),
				pageUnit: X("catalog:catalogList.footerPageUnit"),
				pageSizes: Ae
			}) : null
		]
	});
}
// src/react/jav/online-catalog-table.tsx
var ii = Wn({
	rowSortingFeature: Fn,
	rowSelectionFeature: Pn,
	columnVisibilityFeature: ft,
	columnOrderingFeature: ct
}), ai = [{
	id: "select",
	label: X("catalog:javReleases.selectVideos"),
	width: 44,
	min: 44,
	max: 44,
	required: !0
}, ...sn], oi = X("catalog:javTabs.online");
function si({ items: a, waiting: o, javImage: s, maker: l, genres: u, sorting: d, headers: f, empty: m, onSort: h, onFilter: g, onStudio: _, onTag: b }) {
	let x = xr(), S = !!x?.mode, C = !o && a.some((e) => e.code), w = cr(z, ai, B), T = (0, Q.useMemo)(() => {
		let e = St();
		return e.columns(ai.map((t) => e.accessor((e) => {
			switch (t.id) {
				case "release": return e.release_date;
				case "dur": return e.duration;
				case "code": return e.code;
				default: return;
			}
		}, {
			id: t.id,
			header: t.label,
			enableSorting: Ee.some(([e]) => e === t.id)
		})));
	}, []), E = sr({
		features: ii,
		columns: T,
		data: a,
		getRowId: (e) => e.catalogId,
		manualSorting: !0,
		state: {
			sorting: [{
				id: d.sort,
				desc: d.dir === "desc"
			}],
			rowSelection: Object.fromEntries(a.filter((e) => e.code && x?.selected.has(e.code)).map((e) => [e.catalogId, !0])),
			columnOrder: w.columnOrder,
			columnVisibility: {
				...w.visibility,
				select: S
			}
		},
		onSortingChange: (e) => {
			let t = [{
				id: d.sort,
				desc: d.dir === "desc"
			}], [n] = typeof e == "function" ? e(t) : e, r = Ee.find(([e]) => e === n?.id)?.[0];
			r && n && h(r, n.desc ? "desc" : "asc");
		}
	}), D = E.getHeaderGroups()[0].headers, ee = (e, t) => {
		switch (e) {
			case "select": return t.code ? /* @__PURE__ */ (0, $.jsx)(v, {
				slot: null,
				"aria-label": X("catalog:javDiscovery.select", { code: t.code }),
				isSelected: x?.selected.has(t.code),
				onChange: () => x?.toggle(t)
			}) : null;
			case "name": {
				let e = Ct(t, "small", s), n = t.code ? `/works/${encodeURIComponent(t.code)}` : t.link, r = t.code ? {} : {
					target: "_blank",
					rel: "noopener noreferrer"
				}, i = (e) => {
					t.code && x && (S || Ut(e)) && (e.preventDefault(), x.toggle(t, e.shiftKey));
				};
				return /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-list-identity": "",
					children: [/* @__PURE__ */ (0, $.jsx)("a", {
						"data-list-open": "",
						href: n,
						onClick: i,
						tabIndex: -1,
						"aria-hidden": !0,
						...r,
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-list-picture": "",
							children: e ? /* @__PURE__ */ (0, $.jsx)(c, {
								artwork: {
									kind: "cover",
									html: e
								},
								relayout: (e) => vn(e, "small")
							}) : /* @__PURE__ */ (0, $.jsx)("span", { children: X("catalog:shared.noCover") })
						})
					}), /* @__PURE__ */ (0, $.jsx)("span", {
						"data-list-text": "",
						children: /* @__PURE__ */ (0, $.jsxs)("a", {
							"data-list-work-link": "",
							href: n,
							onClick: i,
							title: t.code ? `${t.code} · ${t.title}` : t.title,
							...r,
							children: [t.code ? /* @__PURE__ */ (0, $.jsx)("span", {
								"data-list-code": "",
								className: "text-body-2-regular text-text-primary",
								children: t.code
							}) : null, /* @__PURE__ */ (0, $.jsx)("span", {
								"data-list-name": "",
								"data-external-link-label": t.code ? void 0 : "",
								lang: Kn(t.title),
								children: t.title
							})]
						})
					})]
				});
			}
			case "people": {
				let e = wt(t.performer_refs, t.performers), n = e[0];
				if (!n) return "—";
				let r = Y(n);
				return /* @__PURE__ */ (0, $.jsx)(we, {
					avatar: /* @__PURE__ */ (0, $.jsx)(Pr, { item: t }),
					cast: /* @__PURE__ */ (0, $.jsx)(p, {
						people: e,
						code: t.code,
						subscribe: !0,
						onFilter: g
					}),
					children: /* @__PURE__ */ (0, $.jsx)(Nr, {
						person: n,
						name: r,
						title: n.name,
						onFilter: g
					})
				});
			}
			case "studio": {
				let e = t.studioOption;
				return e ? /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex min-w-0 items-center gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-inline-action": "",
						className: "min-w-0 max-w-full cursor-pointer",
						"aria-pressed": l === e.id,
						onClick: () => _(e.id),
						children: /* @__PURE__ */ (0, $.jsx)(Br, {
							name: t.studio,
							studio: e
						})
					}), /* @__PURE__ */ (0, $.jsx)(Hr, { studio: e })]
				}) : "—";
			}
			case "tags": return t.tagOptions.length ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-tags": "",
				"data-list-tags": "",
				children: t.tagOptions.map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
					type: "button",
					"data-media-tag": "",
					"aria-pressed": u.includes(e.id),
					onClick: () => b(e.id),
					children: e.name
				}, e.id))
			}) : "—";
			case "release": return /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [t.release_date ? /* @__PURE__ */ (0, $.jsx)("time", {
					dateTime: t.release_date,
					children: t.release_date
				}) : "—", t.preOrder ? /* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-caption-1-regular text-text-secondary",
					children: X("catalog:javOnline.preOrder")
				}) : null]
			});
			case "dur": return Vt(t.duration) || "—";
			case "code": return t.code || "—";
			default: return /* @__PURE__ */ (0, $.jsx)(Ce, {
				href: t.link,
				target: "_blank",
				rel: "noopener noreferrer",
				title: t.link,
				size: "small",
				trailingIcon: J,
				children: /* @__PURE__ */ (0, $.jsx)(K, {
					site: "dmm",
					label: "DMM"
				})
			});
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-catalog-view-mode": "list",
		"data-catalog-table": "",
		"data-release-table": "",
		"data-online-catalog-table": "",
		className: "flex min-w-0 flex-col gap-4",
		children: [/* @__PURE__ */ (0, $.jsx)(qe, {
			className: "flex flex-wrap justify-end gap-2",
			label: X("shell:dataTable.toolbar", { label: oi }),
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				"data-toolbar-actions": "",
				children: /* @__PURE__ */ (0, $.jsx)(q, {
					preferences: w,
					label: oi
				})
			})
		}), /* @__PURE__ */ (0, $.jsx)(M, {
			follow: !0,
			preferences: w,
			rectangleSelecting: S,
			onRectangle: C ? x?.selectRectangle : void 0,
			onRowClick: C && x ? (e, t) => {
				if (!S && !Ut(t)) return;
				let n = E.getRow(e)?.original;
				n?.code && x.toggle(n, t.shiftKey);
			} : void 0,
			children: /* @__PURE__ */ (0, $.jsxs)(He, {
				size: "sm",
				"aria-label": oi,
				sortDescriptor: {
					column: d.sort,
					direction: d.dir === "asc" ? "ascending" : "descending"
				},
				onSortChange: (e) => E.setSorting([{
					id: String(e.column),
					desc: e.direction === "descending"
				}]),
				children: [/* @__PURE__ */ (0, $.jsxs)(i, { children: [D.map((e) => {
					let n = e.id;
					return n === "select" ? /* @__PURE__ */ (0, $.jsx)(t, {
						id: n,
						"aria-label": X("catalog:javReleases.selectVideos"),
						...w.columnProps(n),
						children: /* @__PURE__ */ (0, $.jsx)(v, {
							slot: null,
							"aria-label": X("catalog:catalogList.selectAllOnPage"),
							isSelected: x?.all,
							isIndeterminate: x?.mixed,
							isDisabled: !C,
							onChange: x?.selectPage
						})
					}, n) : /* @__PURE__ */ (0, $.jsx)(t, {
						id: n,
						isRowHeader: n === "name",
						allowsSorting: e.column.getCanSort(),
						...w.columnProps(n),
						children: ({ sortDirection: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("span", {
							className: "flex items-center gap-0.5",
							children: [f[n] ?? Bt(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, $.jsx)("span", {
								"data-sort-indicator": !0,
								"data-direction": t || void 0,
								children: /* @__PURE__ */ (0, $.jsx)(y, {})
							}) : null]
						}), /* @__PURE__ */ (0, $.jsx)(Ge, {
							preferences: w,
							id: n
						})] })
					}, n);
				}), /* @__PURE__ */ (0, $.jsx)(t, {
					id: "remaining-space",
					"aria-label": X("catalog:catalogList.rowSpacer"),
					"data-table-space": "",
					width: w.spaceWidth,
					minWidth: 0
				})] }), /* @__PURE__ */ (0, $.jsx)(e, {
					renderEmptyState: () => m,
					children: o ? Array.from({ length: 6 }, (e, t) => /* @__PURE__ */ (0, $.jsxs)(n, {
						id: `skeleton-${t}`,
						"data-list-skeleton-row": "",
						"aria-hidden": "true",
						children: [D.map((e) => /* @__PURE__ */ (0, $.jsx)(r, { children: e.id === "select" ? null : /* @__PURE__ */ (0, $.jsx)("span", { dangerouslySetInnerHTML: { __html: st(e.id, !0) } }) }, e.id)), /* @__PURE__ */ (0, $.jsx)(r, { "data-table-space": "" })]
					}, t)) : E.getRowModel().rows.map((e) => /* @__PURE__ */ (0, $.jsxs)(n, {
						id: e.id,
						"data-catalog-row": "",
						"data-release-row": "",
						"data-rectangle-key": e.original.code || void 0,
						"data-rectangle-disabled": !e.original.code || void 0,
						"data-board-selected": e.getIsSelected() || void 0,
						children: [e.getVisibleCells().map((t) => /* @__PURE__ */ (0, $.jsx)(r, { children: ee(t.column.id, e.original) }, t.id)), /* @__PURE__ */ (0, $.jsx)(r, { "data-table-space": "" })]
					}, e.id))
				})]
			})
		})]
	});
}
// src/react/jav/online-catalog.tsx
var ci = nn(["performer"]), li = [];
async function ui(e, t) {
	let n = !1, r = (await Promise.all(e.items.map(async (e) => {
		if (!e.cover_url) return null;
		try {
			let n = await fetch(e.cover_url, {
				method: "HEAD",
				signal: t
			});
			if (n.ok && n.headers.get("content-type")?.startsWith("image/")) return e;
			if (n.status === 404 || n.status === 410) return null;
		} catch (e) {
			if (t.aborted) throw e;
		}
		return n = !0, null;
	}))).filter((e) => e !== null);
	return {
		...e,
		items: r,
		coverUnverified: n,
		coverOmitted: r.length < e.items.length
	};
}
function di() {
	let e = new URLSearchParams(location.search);
	return {
		performer: e.get("performer") || "",
		actress: e.get("actress") || "",
		date: e.get("date") || "",
		maker: e.get("maker") || "",
		genre: e.get("genre") || "",
		page: Math.max(1, Math.floor(Number(e.get("page"))) || 1)
	};
}
var fi = ["release", "dur"], pi = new Intl.Collator(void 0, {
	numeric: !0,
	sensitivity: "base"
});
function mi(e, { sort: t, dir: n }) {
	if (t === "release" && n === "desc") return e;
	let r = (e) => t === "dur" ? e.duration : t === "code" ? e.code : e.date;
	return [...e].sort((e, t) => {
		let i = r(e), a = r(t);
		if (!i || !a) return Number(!i) - Number(!a);
		let o = typeof i == "number" && typeof a == "number" ? i - a : pi.compare(String(i), String(a));
		return n === "asc" ? o : -o;
	});
}
function hi(e) {
	return e ? e.split(",") : [];
}
function gi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = n.get(r.name);
		(!e || !t.includes(e.id) && t.includes(r.id)) && n.set(r.name, r);
	}
	return [...n.values()];
}
function _i({ filters: e, data: t, people: n, selected: r, personLabel: i, pending: a, error: o, go: s, close: c }) {
	let [u, d] = (0, Q.useState)(i), f = Zn("online-performer", u, ci), p = (t, n) => {
		s({
			...e,
			performer: t,
			actress: n,
			page: 1
		}), c();
	};
	return /* @__PURE__ */ (0, $.jsxs)(I, {
		"aria-label": X("follow:addJavFeed.actressName"),
		className: "py-3 outline-none",
		children: [/* @__PURE__ */ (0, $.jsxs)("form", {
			className: "flex flex-col gap-3 px-3",
			onSubmit: (t) => {
				t.preventDefault();
				let n = u.trim();
				n === i ? p(e.performer, r) : p(n, "");
			},
			"data-copy-interact": "",
			children: [
				/* @__PURE__ */ (0, $.jsx)(pe, {
					size: "small",
					label: X("follow:addJavFeed.actressName"),
					value: u,
					onChange: d,
					maxLength: 120,
					ref: f.bind
				}),
				f.list,
				!a && t && t.performer_options.length > 1 ? /* @__PURE__ */ (0, $.jsx)(Le, {
					size: "sm",
					"aria-label": X("catalog:javOnline.performerPage"),
					prefix: X("catalog:javOnline.performerPage"),
					selectedKey: t.selected_actress,
					onSelectionChange: (t) => {
						t !== null && p(e.performer, String(t));
					},
					children: t.performer_options.map((e) => /* @__PURE__ */ (0, $.jsx)(G, {
						id: e.id,
						children: Y({
							...e,
							id: e.entity_id,
							dmm_id: e.id
						})
					}, e.id))
				}) : null,
				/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [e.performer || e.actress ? /* @__PURE__ */ (0, $.jsx)(l, {
						size: "small",
						variant: "ghost",
						type: "button",
						onClick: () => p("", ""),
						children: X("catalog:rangeFilter.clear")
					}) : null, /* @__PURE__ */ (0, $.jsx)(l, {
						size: "small",
						type: "submit",
						children: X("follow:shared.search")
					})]
				})
			]
		}), a || n.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "mt-2",
			children: [/* @__PURE__ */ (0, $.jsx)("p", {
				className: "mb-1 px-3 text-caption-1-regular text-text-secondary",
				children: X("catalog:javOnline.facetScope")
			}), /* @__PURE__ */ (0, $.jsx)(ae, {
				pending: a,
				withAvatar: !0,
				choices: n.map(({ id: e, value: t, count: n }) => ({
					id: e,
					count: n,
					label: Y(t),
					searchTerms: [
						t.name,
						t.source_name || "",
						t.source_zh_cn || ""
					],
					selected: e === r,
					leading: /* @__PURE__ */ (0, $.jsx)(S, { person: t })
				})),
				onSelect: (e) => {
					let t = n.find((t) => t.id === e)?.value;
					t && p(e === r ? "" : t.source_name || t.name, e === r ? "" : e);
				}
			})]
		}) : o ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: "px-3 pt-2",
			children: /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "error",
				children: Nt(o)
			})
		}) : null]
	});
}
function vi({ navigate: e, query: t = "" }) {
	let n = $n(), [r, i] = (0, Q.useState)(di), [o, s] = (0, Q.useState)(cn), [c, u] = (0, Q.useState)(() => new URLSearchParams(location.search).get("code") || ""), [d, f] = (0, Q.useState)(() => {
		let { release: e, dur: t } = gn(new URLSearchParams(location.search).get("column_filters") || void 0);
		return {
			release: e,
			dur: t
		};
	}), [p, m] = (0, Q.useState)(ln), [g, _] = (0, Q.useState)({}), [v, y] = (0, Q.useState)(""), x = tt();
	(0, Q.useSyncExternalStore)(x.subscribe, x.version, x.version);
	let S = Xn(), E = qt(), D = ot(Ht({
		active: !0,
		home: !1,
		portrait: !1
	})), ee = X("catalog:javTabs.online"), te = X("catalog:shared.performers"), O = X("catalog:shared.label"), k = X("catalog:shared.tags"), A = X("catalog:catalogList.releaseDate"), j = ir(), M = rr({
		queryKey: ["jav-catalog", r],
		retry: !1,
		refetchOnWindowFocus: !1,
		staleTime: 3e5,
		placeholderData: $t,
		queryFn: async ({ signal: e }) => ui(await et(`/api/jav/catalog?${new URLSearchParams({
			...r,
			page: String(r.page)
		})}`, e), e)
	}), N = M.isPending || M.isPlaceholderData, ie = M.isPending, ae = M.data ? void 0 : M.error;
	(0, Q.useEffect)(() => {
		let e = M.data;
		if (N || !e || e.page === r.page) return;
		let t = {
			...r,
			page: e.page
		};
		j.setQueryData(["jav-catalog", t], e), i(t), Z({ page: e.page > 1 ? String(e.page) : "" });
	}, [
		r,
		M.data,
		j,
		N
	]);
	let P = (e, t = {}) => {
		i(e), Z({
			...e,
			...t,
			page: e.page > 1 ? String(e.page) : ""
		});
	}, ue = (e, t) => {
		s({
			sort: e,
			dir: t
		}), Z({
			sort: e === "release" ? "" : e,
			dir: t === "asc" ? "asc" : ""
		});
	}, de = tr(), fe = tr(), pe = tr(), ge = (0, Q.useRef)(null), ve = (0, Q.useRef)(null), be = er(p), Se = (e) => {
		m(e), Z({ status: e === "all" ? "" : e });
	}, Ce = !!(r.performer || r.actress), we = Ce ? "online-performer" : r.maker ? "online-studio" : r.genre ? "online-tags" : "", F = v || we, Te = lr(ve, ge, "[data-glide-anchor]", F), I = (e) => ({
		anchor: F === e,
		onPointerEnter: Te.hover,
		onOpenChange: (t) => y((n) => t ? e : n === e ? "" : n)
	}), z = r.actress || (N ? "" : M.data?.selected_actress || ""), B = M.data?.items ?? li, V = (0, Q.useMemo)(() => {
		let e = t.toLocaleLowerCase();
		return e ? B.filter((t) => [
			t.code,
			t.title,
			t.studio?.name,
			t.studio?.source_name,
			...t.people.flatMap((e) => [
				e.name,
				e.source_name,
				e.source_zh_cn,
				Y(e)
			]),
			...t.tags.flatMap((e) => [e.name, e.source_name])
		].join(" ").toLocaleLowerCase().includes(e)) : B;
	}, [
		B,
		t,
		n
	]), H = hi(r.genre), Oe = Ir(V, (e) => e.people, (e) => e.dmm_id, [z]), U = Ir(V, (e) => e.studio ? [e.studio] : [], (e) => e.id, [r.maker]), ke = Ir(V, (e) => e.tags, (e) => e.id, H), Ae = /* @__PURE__ */ new Map();
	for (let { value: e } of ke) Ae.set(e.name, (Ae.get(e.name) || 0) + 1);
	let je = ke.map(({ id: e, value: t, count: n }) => ({
		id: e,
		label: t.name,
		searchTerms: [t.source_name],
		count: n,
		selected: H.includes(e),
		content: (Ae.get(t.name) || 0) > 1 && t.source_name !== t.name ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [t.name, /* @__PURE__ */ (0, $.jsx)("span", {
			className: "ml-2 text-caption-1-regular text-text-secondary",
			children: t.source_name
		})] }) : void 0
	})), W = new Set(gi(ke.map(({ value: e }) => e), H).map((e) => e.id)), Me = je.filter((e) => W.has(e.id)), Ne = Oe.find((e) => e.id === z)?.value, Pe = M.data?.performer_options.find((e) => e.id === z), Fe = Ne ? Y(Ne) : Pe ? Y({
		...Pe,
		id: Pe.entity_id,
		dmm_id: Pe.id
	}) : kt(r.performer || z), Le = U.find((e) => e.id === r.maker)?.value.name || g[`studio:${r.maker}`] || r.maker, G = (e) => ke.find((t) => t.id === e)?.value.name || g[`tag:${e}`] || e, Re = (e) => {
		let t = e.dmm_id === z;
		P({
			...r,
			performer: t ? "" : e.source_name || e.name,
			actress: t ? "" : e.dmm_id || "",
			page: 1
		});
	}, ze = (e) => {
		let t = U.find((t) => t.id === e)?.value;
		t && _((n) => ({
			...n,
			[`studio:${e}`]: t.name
		})), P({
			...r,
			maker: e === r.maker ? "" : e,
			page: 1
		});
	}, K = (e) => {
		let t = H.includes(e);
		e && !t && _((t) => ({
			...t,
			[`tag:${e}`]: G(e)
		}));
		let n = e ? t ? H.filter((t) => t !== e) : [...H, e] : [];
		P({
			...r,
			genre: n.join(","),
			page: 1
		});
	}, Ve = r.date ? { range: {
		min: r.date,
		max: r.date
	} } : d.release, He = (e, t) => {
		f(e);
		let n = { column_filters: hr({ release: e.release }, "dur", e.dur) };
		t ? P(t, n) : Z(n);
	}, q = (e, t) => {
		let n = e === "release" && t?.range.min === t?.range.max ? String(t?.range.min || "") : "";
		He({
			...d,
			[e]: n ? void 0 : t
		}, e === "release" && n !== r.date ? {
			...r,
			date: n,
			page: 1
		} : void 0);
	}, Ue = (e) => {
		u(e), Z({ code: e });
	}, Ge = (e, t) => /* @__PURE__ */ (0, $.jsx)(C, {
		id: e,
		orderKey: "performer",
		label: te,
		active: Ce,
		toolbar: t,
		view: t ? I(e) : void 0,
		children: (e) => /* @__PURE__ */ (0, $.jsx)(_i, {
			filters: r,
			data: M.data,
			people: Oe,
			selected: z,
			personLabel: Fe,
			pending: N,
			error: ae,
			go: P,
			close: e
		})
	}), qe = (e, t) => /* @__PURE__ */ (0, $.jsx)(oe, {
		id: e,
		orderKey: "studio",
		toolbar: t,
		view: t ? I(e) : void 0,
		label: O,
		active: !!r.maker,
		hint: X("catalog:javOnline.facetScope"),
		onSelect: ze,
		onClear: r.maker ? () => ze("") : void 0,
		pending: N,
		error: ae,
		withAvatar: !0,
		choices: U.map(({ id: e, value: t, count: n }) => ({
			id: e,
			label: t.name,
			searchTerms: [t.source_name],
			count: n,
			selected: e === r.maker,
			leading: /* @__PURE__ */ (0, $.jsx)(w, { studio: t })
		}))
	}), Je = (e, t) => /* @__PURE__ */ (0, $.jsx)(oe, {
		id: e,
		orderKey: "tags",
		toolbar: t,
		view: t ? I(e) : void 0,
		label: k,
		active: !!r.genre,
		hint: X("catalog:javOnline.facetScope"),
		onSelect: K,
		onClear: H.length ? () => K("") : void 0,
		pending: N,
		error: ae,
		choices: je
	}), Ye = (e) => {
		e === "performer" ? P({
			...r,
			performer: "",
			actress: "",
			page: 1
		}) : e === "maker" ? P({
			...r,
			maker: "",
			page: 1
		}) : e === "release" || e === "dur" ? q(e, void 0) : e === "code" && Ue("");
	}, Xe = [];
	Ce && Xe.push({
		kind: "clear",
		key: "performer",
		label: `${te} ${Fe}`
	}), r.maker && Xe.push({
		kind: "clear",
		key: "maker",
		label: `${O} ${Le}`
	});
	for (let e of fi) {
		let t = e === "release" ? Ve : d.dur;
		t && Xe.push({
			kind: "clear",
			key: e,
			label: `${e === "release" ? A : X("catalog:catalogList.duration")} ${ut(lt[e], t.range)}`
		});
	}
	c && Xe.push({
		kind: "clear",
		key: "code",
		label: `${X("catalog:shared.code")} ${c}`
	});
	for (let e of H) Xe.push({
		kind: "untag",
		key: e,
		label: G(e)
	});
	let J = p !== "all" || !!(c || d.dur || !r.date && d.release), Ze = (0, Q.useMemo)(() => N ? [] : mi(J ? V.filter((e) => (p === "all" || e.pre_order === (p === "preOrder")) && (!c || Jr(e.code, c)) && (r.date || !d.release || mr("date", d.release.range, e.date)) && (!d.dur || mr("duration", d.dur.range, e.duration))) : V, o).map((e, t) => {
		let n = gi(e.tags, hi(r.genre));
		return {
			id: t + 1,
			catalogId: e.id,
			code: e.code,
			title: e.title,
			performer_refs: e.people,
			performers: "",
			studio: e.studio?.name || "",
			studio_ref: e.studio || void 0,
			studioOption: e.studio,
			tagOptions: n,
			tags: n.map((e) => e.name),
			duration: e.duration,
			release_date: e.date,
			link: e.url,
			cover_url: e.cover_url,
			online_cover_url: e.cover_url,
			has_cover: !1,
			wanted: !1,
			preOrder: e.pre_order
		};
	}), [
		N,
		J,
		V,
		p,
		c,
		r.date,
		r.genre,
		d.release,
		d.dur,
		o
	]), Qe = (0, Q.useMemo)(() => Ze.filter((e) => e.code), [Ze]);
	Cr(Qe);
	let $e = Sr(!N && Qe.length > 0), nt = o.sort !== "release" || o.dir === "asc", rt = S === "list" && (N || !!M.data), it = M.data && !N && !Ze.length && !M.error && !M.data.coverUnverified ? /* @__PURE__ */ (0, $.jsx)(re, {
		icon: ne,
		title: X(V.length ? "catalog:javOnline.noPageMatches" : M.data.total ? "catalog:javOnline.noCoveredWorks" : "catalog:javOnline.noMatches"),
		actions: V.length ? /* @__PURE__ */ (0, $.jsx)(l, {
			size: "small",
			onClick: () => {
				m("all"), u(""), f({
					release: void 0,
					dur: void 0
				}), Z({
					status: "",
					code: "",
					column_filters: ""
				});
			},
			children: X("catalog:shared.clearFilters")
		}) : null,
		children: null
	}) : null;
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-label": ee,
		"aria-busy": N,
		className: "flex min-w-0 flex-col gap-4",
		children: [
			ie ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "contents",
				dangerouslySetInnerHTML: { __html: Kt() }
			}) : Oe.length || U.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-catalog-tiers": "",
				className: me,
				children: [Oe.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					ref: de,
					"data-catalog-tier": "performers",
					role: "group",
					"aria-label": X("catalog:javReleases.filterByActress"),
					children: Oe.map(({ id: e, value: t, count: n }) => /* @__PURE__ */ (0, $.jsx)(Lr, {
						person: t,
						count: n,
						pressed: e === z,
						onClick: () => Re(t)
					}, e))
				}) : null, U.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					ref: fe,
					"data-catalog-tier": "studios",
					role: "group",
					"aria-label": X("catalog:javReleases.filterByLabel"),
					children: U.map(({ id: e, value: t, count: n }) => /* @__PURE__ */ (0, $.jsx)(zr, {
						studio: t,
						count: n,
						pressed: e === r.maker,
						onClick: () => ze(e),
						showCount: !1
					}, e))
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(se, {
				label: X("catalog:catalogFilter.filterAndSort"),
				topLabel: X("catalog:catalogFilter.viewsAndTags"),
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				busy: N,
				panes: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [be.pane, /* @__PURE__ */ (0, $.jsx)("span", {
					ref: ve,
					"data-view-glide": "",
					"aria-hidden": "true"
				})] }),
				top: /* @__PURE__ */ (0, $.jsxs)("div", {
					ref: pe,
					"data-catalog-scroll": "",
					children: [be.choices(X("catalog:javOnline.pageStatus"), R.map(([e, t]) => ({
						key: e,
						label: X(t),
						attrs: { "data-online-status": e }
					})), Se), ie ? /* @__PURE__ */ (0, $.jsx)("div", {
						"data-filter-tag-strip": "",
						"data-skeleton": ye,
						"data-loading": "",
						"aria-hidden": !0,
						dangerouslySetInnerHTML: { __html: Xt() }
					}) : /* @__PURE__ */ (0, $.jsx)(ce, {
						choices: Me,
						onSelect: K
					})]
				}),
				bottom: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("span", {
					"data-catalog-summary": "",
					children: [
						/* @__PURE__ */ (0, $.jsx)("span", {
							"data-catalog-readout": "",
							children: N ? /* @__PURE__ */ (0, $.jsx)("span", {
								"data-skeleton": "count",
								"aria-hidden": !0,
								className: "skeleton-sheen inline-block h-3.5 w-28 rounded-md"
							}) : M.data && (M.data.coverOmitted || J) ? X("catalog:javOnline.coveredCount", {
								shown: Ze.length,
								total: M.data.total
							}) : X("catalog:countLabel.works", { count: M.data?.total || 0 })
						}),
						nt ? /* @__PURE__ */ (0, $.jsx)("span", {
							className: "whitespace-nowrap text-caption-1-regular text-text-secondary",
							children: X("catalog:javOnline.localSort")
						}) : null,
						J ? /* @__PURE__ */ (0, $.jsx)("span", {
							className: "whitespace-nowrap text-caption-1-regular text-text-secondary",
							children: X("catalog:javOnline.pageFilters")
						}) : null,
						/* @__PURE__ */ (0, $.jsx)(xe, { tab: "online" })
					]
				}), /* @__PURE__ */ (0, $.jsx)(le, {
					tools: /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: /* @__PURE__ */ (0, $.jsx)(h, { cardLayout: /* @__PURE__ */ (0, $.jsx)(Ie, {
						label: X("catalog:entityFilter.javCardLayout"),
						value: E,
						options: he,
						onChange: Hn
					}) }) }),
					fieldGroup: {
						ref: ge,
						role: "group",
						"aria-label": X("catalog:javDiscover.filtersLabel"),
						onPointerLeave: Te.leave
					},
					fields: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
						Ge("online-performer", !0),
						qe("online-studio", !0),
						Je("online-tags", !0)
					] }),
					sorts: /* @__PURE__ */ (0, $.jsx)(Be, {
						group: "javOnline",
						sorts: Ee.map(([e, t]) => ({
							key: e,
							label: X(t),
							ariaLabel: X(t),
							pressed: o.sort === e,
							dir: o.dir
						})),
						onSort: (e, t) => ue(e, t),
						filters: {
							release: {
								active: !!Ve,
								required: !0,
								shouldCloseOnInteractOutside: un,
								render: (e) => /* @__PURE__ */ (0, $.jsx)(Ke, {
									label: A,
									kind: "date",
									value: Ve,
									rangeValues: V.map((e) => e.date),
									onChange: (t) => {
										q("release", t), e();
									}
								})
							},
							dur: {
								active: !!d.dur,
								render: (e) => /* @__PURE__ */ (0, $.jsx)(Ke, {
									label: X("catalog:catalogList.duration"),
									kind: "duration",
									value: d.dur,
									onChange: (t) => {
										q("dur", t), e();
									}
								})
							},
							code: {
								active: !!c,
								render: (e) => /* @__PURE__ */ (0, $.jsx)(Yr, {
									value: c,
									onChange: (t) => {
										Ue(t), e();
									}
								})
							}
						}
					})
				})] })
			}),
			Xe.length ? /* @__PURE__ */ (0, $.jsx)(T, {
				items: Xe,
				hidden: !1,
				actions: {
					toggleTag: K,
					clearFilter: Ye,
					clearAll: () => {
						u(""), f({
							release: void 0,
							dur: void 0
						}), P({
							performer: "",
							actress: "",
							maker: "",
							genre: "",
							date: "",
							page: 1
						}, {
							code: "",
							column_filters: ""
						});
					}
				}
			}) : null,
			N ? /* @__PURE__ */ (0, $.jsx)(a, {
				role: "status",
				children: X("catalog:javOnline.loading")
			}) : null,
			M.error ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "error",
				title: X("catalog:javOnline.failed"),
				action: /* @__PURE__ */ (0, $.jsx)(l, {
					variant: "secondary",
					onClick: () => void M.refetch(),
					children: X("catalog:shared.retryNow")
				}),
				children: Nt(M.error)
			}) : null,
			M.data?.coverUnverified && !N ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "neutral",
				action: /* @__PURE__ */ (0, $.jsx)(l, {
					variant: "secondary",
					onClick: () => void M.refetch(),
					children: X("catalog:shared.retryNow")
				}),
				children: X("catalog:javOnline.coverUnverified")
			}) : null,
			rt ? /* @__PURE__ */ (0, $.jsx)(si, {
				items: Ze,
				waiting: N,
				javImage: x.value.javImage,
				empty: it,
				maker: r.maker,
				genres: H,
				sorting: o,
				onSort: ue,
				headers: {
					people: Ge("online-column-performer", !1),
					studio: qe("online-column-studio", !1),
					tags: Je("online-column-tags", !1),
					release: /* @__PURE__ */ (0, $.jsx)(We, {
						id: "online-column-release",
						label: A,
						kind: "date",
						value: Ve,
						rangeValues: V.map((e) => e.date),
						onChange: (e) => q("release", e)
					}),
					dur: /* @__PURE__ */ (0, $.jsx)(We, {
						id: "online-column-duration",
						label: X("catalog:catalogList.duration"),
						kind: "duration",
						value: d.dur,
						onChange: (e) => q("dur", e)
					}),
					code: /* @__PURE__ */ (0, $.jsx)(C, {
						id: "online-column-code",
						label: X("catalog:shared.code"),
						active: !!c,
						children: (e) => /* @__PURE__ */ (0, $.jsx)(Yr, {
							value: c,
							onChange: (t) => {
								Ue(t), e();
							}
						})
					})
				},
				onFilter: Re,
				onStudio: ze,
				onTag: K
			}) : it,
			S === "cards" && N ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "contents",
				dangerouslySetInnerHTML: { __html: on(D) }
			}) : null,
			S === "cards" && Ze.length > 0 ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-grid": "",
				className: _e,
				style: { "--card-ratio": D },
				...$e,
				children: Ze.map((t) => /* @__PURE__ */ (0, $.jsx)(Kr, {
					item: t,
					layout: E,
					javImage: x.value.javImage,
					readOnly: !0,
					navigate: e,
					onFilterPerson: Re,
					tag: H.map(G),
					onTag: (e) => {
						let n = t.tagOptions.find((t) => t.name === e);
						(!e || n) && K(n?.id || "");
					},
					studioFilter: t.studioOption ? {
						selected: r.maker === t.studioOption.id,
						onPress: () => ze(t.studioOption.id),
						entityId: t.studioOption.entity_id
					} : void 0,
					badge: t.preOrder ? /* @__PURE__ */ (0, $.jsx)(b, {
						variant: "caption",
						color: "neutral",
						children: X("catalog:javOnline.preOrder")
					}) : void 0
				}, t.catalogId))
			}) : null,
			M.data && !N && M.data.pages > 1 ? /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-end gap-x-4 gap-y-2",
				children: [M.data.total > M.data.pages * M.data.size ? /* @__PURE__ */ (0, $.jsx)("span", {
					"data-copy-key": "jav.online.pageLimit",
					className: "text-caption-1-regular text-text-secondary",
					children: X("catalog:javOnline.pageLimit", { count: M.data.pages })
				}) : null, /* @__PURE__ */ (0, $.jsx)(De, {
					label: ee,
					page: M.data.page,
					pages: M.data.pages,
					onPage: (e) => P({
						...r,
						page: e
					})
				})]
			}) : null
		]
	});
}
// src/react/jav/jav-page.tsx
var yi = Vn("x"), bi = Vn("refresh-cw");
function xi({ tab: e, readOnly: t, navigate: n, receipt: r }) {
	let [i, a] = (0, Q.useState)(null), o = nr(), s = new URLSearchParams(o.search), c = (0, Q.useRef)("");
	o.pathname === "/jav" && Yt(s.get("tab")) === e && (c.current = s.get("q") || "");
	let l = c.current, u = (e) => Z({ q: e });
	return /* @__PURE__ */ (0, $.jsx)(wr, {
		readOnly: t,
		receipt: r,
		dock: e !== "wants",
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			className: ge,
			children: [e === "releases" ? /* @__PURE__ */ (0, $.jsx)(ri, {
				readOnly: t,
				receipt: r,
				resource: a,
				query: l.trim(),
				navigate: n,
				clearText: () => u("")
			}) : e === "discover" ? /* @__PURE__ */ (0, $.jsx)(Ti, {
				readOnly: t,
				receipt: r,
				resource: a,
				query: l.trim(),
				navigate: n,
				clearText: () => u("")
			}) : e === "online" ? /* @__PURE__ */ (0, $.jsx)(vi, {
				navigate: n,
				query: l.trim()
			}) : /* @__PURE__ */ (0, $.jsx)(jr, {
				readOnly: t,
				toast: r,
				query: l.trim(),
				clearQuery: () => u("")
			}), /* @__PURE__ */ (0, $.jsx)(x, {
				prefill: i,
				close: () => a(null),
				receipt: r
			})]
		})
	}, e);
}
var Si = {
	release: "release_date",
	dur: "duration",
	score: "source_score",
	taste: "taste_score"
}, Ci = 24;
function wi(e) {
	return wt(e.performer_refs, e.performers).map((t) => ({
		...t,
		avatar_code: e.code
	}));
}
function Ti({ readOnly: e, receipt: t, resource: n, query: r, navigate: i, clearText: a }) {
	let o = new URLSearchParams(location.search), [s, c] = (0, Q.useState)(() => o.get("scope") === "library" ? "library" : "external"), [d, f] = (0, Q.useState)(() => o.get("tag") || ""), [p, m] = (0, Q.useState)(() => o.get("performer") || ""), [g, _] = (0, Q.useState)(() => o.get("code") || ""), [v, y] = (0, Q.useState)(() => o.get("studio") || ""), [x, T] = (0, Q.useState)(() => gn(o.get("column_filters") || void 0)), [E, O] = (0, Q.useState)(() => Dt(o).sort), [k, A] = (0, Q.useState)(() => Dt(o).direction === "asc"), M = (e = {}) => {
		f(""), m(""), y(""), _(""), T({}), Z({
			tag: "",
			performer: "",
			studio: "",
			code: "",
			column_filters: "",
			...e
		});
	}, N = (e) => {
		e !== s && (c(e), M({ scope: e === "external" ? "" : e }));
	}, ae = (e) => {
		f(e), Z({ tag: e });
	}, ue = (e) => {
		m(e), Z({ performer: e });
	}, de = (e) => {
		y(e), Z({ studio: e });
	}, fe = (e) => {
		_(e), Z({ code: e });
	}, pe = (e, t) => {
		let n = hr(x, e, t);
		T(gn(n)), Z({ column_filters: n });
	}, ge = (e, t) => {
		O(e), A(t === "asc"), Z({
			sort: e === "taste" ? "" : e,
			dir: t === "asc" ? t : ""
		});
	}, ve = (0, Q.useRef)(null), be = (0, Q.useRef)(null), Ce = tr(), we = tr(), F = lr(ve, be, "[aria-pressed=\"true\"]", s), Te = (0, Q.useRef)(null);
	(0, Q.useEffect)(() => {
		let e = [...Te.current?.querySelectorAll("[data-catalog-scroll],[data-filter-row=\"bottom\"]") || []].map((e) => pr(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let I = tt();
	(0, Q.useSyncExternalStore)(I.subscribe, I.version, I.version);
	let Ee = qt(), R = Xn(), z = (0, Q.useRef)(null), [B, V] = or(te), De = ot(Ht({
		active: !0,
		home: !1,
		portrait: !1
	})), H = k ? "asc" : "desc", U = rr({
		queryKey: Et(s, E, H),
		retry: !1,
		refetchOnWindowFocus: !1,
		queryFn: ({ signal: e }) => Ft(s, e, {
			sort: E,
			direction: H
		})
	}), ke = U.data?.metadata_job, Ae = (0, Q.useRef)(!1);
	Ae.current = ke?.status === "running";
	let je = rr({
		queryKey: D,
		retry: !1,
		refetchOnWindowFocus: !1,
		enabled: s === "external",
		queryFn: ({ signal: e }) => It(e),
		refetchInterval: an(() => Ae.current)
	}), W = je.data && je.dataUpdatedAt >= U.dataUpdatedAt ? je.data.metadata_job : ke, Me = (e) => e ? `${e.job_id}:${e.status}` : "", Ne = (0, Q.useRef)(""), Pe = (0, Q.useRef)(""), Fe = je.data?.metadata_job;
	(0, Q.useEffect)(() => {
		let e = Me(Fe), t = Pe.current.endsWith(":running") && Fe && Fe.status !== "running";
		Pe.current = e, t && e !== Ne.current && U.refetch();
	}, [Me(Fe)]);
	let Le = Yn(), G = Yn(), Re = (0, Q.useRef)("start"), ze = async (e, t) => {
		let n = await mt(e, {
			sort: E,
			direction: H,
			jobId: W?.job_id
		}, t);
		e !== "start" && await U.refetch({
			cancelRefetch: !0,
			throwOnError: !0
		}), await hn.cancelQueries({ queryKey: D }), Ne.current = Me(n.metadata_job), hn.setQueryData(D, n);
	}, K = (e) => {
		G.busy || (Re.current = e, G.run(e, (t) => ze(e === "start" ? "start" : e === "stop" ? "cancel" : "refresh", t), () => {}));
	}, Ve = (0, Q.useRef)(!1), He = s === "external" && W?.status !== "running" && (U.data?.items || []).some((e) => e.metadata_state === "pending" || e.metadata_state === "stale");
	(0, Q.useEffect)(() => {
		He && !Ve.current && (Ve.current = !0, K("start"));
	}, [He]);
	let q = U.data?.items || [], Ue = Ir(q, (e) => e.tags || [], (e) => e, [d]).map(({ id: e, count: t }) => ({
		id: e,
		label: e,
		count: t,
		selected: d === e
	})), We = Ir(q, wi, (e) => e.name, [p]), Ge = Ir(q, (e) => e.studio_ref ? [e.studio_ref] : e.studio ? [{
		name: e.studio,
		has_logo: !1
	}] : [], (e) => e.name, [v]), qe = (e) => ae(d === e ? "" : e), Ye = (e) => ue(p === e ? "" : e), Xe = (e) => de(v === e ? "" : e), J = !!(r || d || p || v || g || x.release || x.dur || x.score || x.taste), Ze = () => {
		M(), r && a();
	}, et = q.filter((e) => (!d || e.tags?.includes(d)) && (!g || Jr(e.code, g)) && (!p || wi(e).some((e) => e.name === p)) && (!v || (e.studio_ref?.name || e.studio) === v) && Object.keys(Si).every((t) => {
		let n = x[t], r = t === "taste" ? e.taste_score ?? e.score : e[Si[t]];
		return !n || mr(lt[t], n.range, r);
	}) && (!r || [
		e.code,
		e.title,
		e.performers,
		e.studio,
		...e.tags || [],
		...(e.performer_refs || []).map((e) => e.name)
	].join(" ").toLocaleLowerCase().includes(r.toLocaleLowerCase()))), nt = (e, t) => ({
		active: !!x[e],
		shouldCloseOnInteractOutside: e === "release" ? un : void 0,
		render: (n) => /* @__PURE__ */ (0, $.jsx)(Ke, {
			label: t,
			kind: lt[e],
			value: x[e],
			rangeValues: e === "release" ? q.map((e) => e.release_date) : void 0,
			onChange: (t) => {
				pe(e, t), n();
			}
		})
	}), it = (e, t) => {
		let n = nt(e, t);
		return /* @__PURE__ */ (0, $.jsx)(C, {
			id: `discover-column-${e}`,
			label: t,
			active: n.active,
			shouldCloseOnInteractOutside: n.shouldCloseOnInteractOutside,
			children: n.render
		});
	}, at = (e) => /* @__PURE__ */ (0, $.jsx)(Yr, {
		value: g,
		onChange: (t) => {
			fe(t), e();
		}
	}), Y = U.isPending, st = Y || s === "external" && !Ue.length && W?.status === "running", ct = U.data ? void 0 : U.error, ut = (e) => {
		let t = e ? "jav-discover" : "discover-column";
		return {
			people: /* @__PURE__ */ (0, $.jsx)(oe, {
				id: `${t}-performers`,
				orderKey: "performer",
				toolbar: e,
				label: X("catalog:shared.performers"),
				active: !!p,
				pending: Y,
				error: ct,
				withAvatar: !0,
				choices: We.map(({ id: e, value: t, count: n }) => ({
					id: e,
					count: n,
					label: At("performer", t.name, t.id),
					searchTerms: [t.name],
					selected: p === e,
					leading: /* @__PURE__ */ (0, $.jsx)(S, { person: t })
				})),
				onSelect: (e) => ue(p === e ? "" : e),
				onClear: p ? () => ue("") : void 0
			}),
			studio: /* @__PURE__ */ (0, $.jsx)(oe, {
				id: `${t}-studios`,
				orderKey: "studio",
				toolbar: e,
				label: X("catalog:shared.label"),
				active: !!v,
				pending: Y,
				error: ct,
				withAvatar: !0,
				choices: Ge.map(({ id: e, value: t, count: n }) => ({
					id: e,
					count: n,
					label: t.name,
					selected: v === e,
					leading: /* @__PURE__ */ (0, $.jsx)(w, { studio: t })
				})),
				onSelect: (e) => de(v === e ? "" : e),
				onClear: v ? () => de("") : void 0
			}),
			tags: /* @__PURE__ */ (0, $.jsx)(oe, {
				id: `${t}-tags`,
				orderKey: "tags",
				toolbar: e,
				label: X("catalog:shared.tags"),
				active: !!d,
				pending: st,
				error: ct,
				choices: Ue,
				onSelect: qe,
				onClear: d ? () => ae("") : void 0
			})
		};
	}, dt = ut(!0), ft = (e) => {
		Le.run(String(e.id), (t) => $e({ code: e.code }, t), () => {
			t(X("catalog:javWant.added")), Wt(), U.refetch();
		});
	}, pt = Math.max(0, Math.ceil(et.length / B.pageSize) - 1), ht = Math.min(B.pageIndex, pt), gt = ht * B.pageSize, _t = R === "list" ? et.slice(gt, gt + B.pageSize) : et;
	Cr(_t);
	let vt = Sr(!Y);
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		ref: Te,
		"aria-label": X("catalog:shared.recommendedForYou"),
		"aria-busy": Y,
		className: "flex min-w-0 flex-col gap-4",
		children: [
			Y ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "contents",
				dangerouslySetInnerHTML: { __html: Kt() }
			}) : We.length || Ge.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-catalog-tiers": "",
				"data-discover-tiers": "",
				className: me,
				children: [We.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					ref: Ce,
					"data-catalog-tier": "performers",
					role: "group",
					"aria-label": X("catalog:javReleases.filterByActress"),
					children: We.slice(0, Ci).map(({ id: e, value: t, count: n }) => /* @__PURE__ */ (0, $.jsx)(Lr, {
						person: t,
						count: n,
						pressed: p === e,
						onClick: () => Ye(e)
					}, e))
				}) : null, Ge.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					ref: we,
					"data-catalog-tier": "studios",
					role: "group",
					"aria-label": X("catalog:javReleases.filterByLabel"),
					children: Ge.slice(0, Ci).map(({ id: e, value: t, count: n }) => /* @__PURE__ */ (0, $.jsx)(zr, {
						studio: t,
						count: n,
						pressed: v === e,
						onClick: () => Xe(e)
					}, e))
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(se, {
				label: X("catalog:javDiscover.filtersLabel"),
				topLabel: X("catalog:javDiscover.scopeLabel"),
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				busy: Y,
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				panes: /* @__PURE__ */ (0, $.jsx)("span", {
					ref: ve,
					"data-view-glide": "",
					"aria-hidden": "true"
				}),
				top: /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-catalog-scroll": "",
					children: [/* @__PURE__ */ (0, $.jsxs)("div", {
						ref: be,
						role: "group",
						"aria-label": X("catalog:javDiscover.scopeLabel"),
						"data-catalog-views": "",
						onPointerLeave: F.leave,
						children: [[["external", X("catalog:javDiscover.external")], ["library", X("catalog:javDiscover.library")]].map(([e, t]) => /* @__PURE__ */ (0, $.jsx)("button", {
							type: "button",
							"data-catalog-view": e,
							"data-entity-press": "",
							"aria-pressed": s === e,
							onPointerEnter: F.hover,
							onClick: () => N(e),
							children: t
						}, e)), st || Ue.length ? /* @__PURE__ */ (0, $.jsx)("span", {
							"data-entity-sep": "",
							"aria-hidden": "true"
						}) : null]
					}), st ? /* @__PURE__ */ (0, $.jsx)("div", {
						"data-filter-tag-strip": "",
						"data-skeleton": ye,
						"data-loading": "",
						"aria-hidden": !0,
						dangerouslySetInnerHTML: { __html: Xt() }
					}) : /* @__PURE__ */ (0, $.jsx)(ce, {
						choices: Ue,
						onSelect: qe
					})]
				}),
				bottom: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
					/* @__PURE__ */ (0, $.jsxs)("span", {
						"data-catalog-summary": "",
						children: [/* @__PURE__ */ (0, $.jsx)("span", {
							"data-catalog-readout": "",
							children: Y ? /* @__PURE__ */ (0, $.jsx)("span", {
								"data-skeleton": "count",
								"aria-hidden": !0,
								className: "relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen"
							}) : X("catalog:countLabel.works", { count: et.length })
						}), /* @__PURE__ */ (0, $.jsx)(Se, { currentHref: () => location.pathname + location.search })]
					}),
					/* @__PURE__ */ (0, $.jsx)(xe, { tab: "discover" }),
					J ? /* @__PURE__ */ (0, $.jsx)(ie, {
						onPress: Ze,
						children: X("catalog:shared.clearFilters")
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(le, {
						tools: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [s === "external" ? /* @__PURE__ */ (0, $.jsx)(P, {
							"data-entity-batch": "",
							"data-jav-metadata-update": "",
							label: W?.status === "running" ? X("catalog:javDiscover.stopUpdating") : X("catalog:javDiscover.updateMetadata"),
							disabled: Y,
							"data-skeleton-action": Y ? "" : void 0,
							busy: !!G.busy,
							icon: W?.status === "running" ? yi : bi,
							onPress: () => K(W?.status === "running" ? "stop" : "update")
						}) : null, /* @__PURE__ */ (0, $.jsx)(h, { cardLayout: /* @__PURE__ */ (0, $.jsx)(Ie, {
							label: X("catalog:entityFilter.javCardLayout"),
							value: Ee,
							options: he,
							onChange: Hn
						}) })] }),
						fields: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
							dt.people,
							dt.studio,
							dt.tags
						] }),
						sorts: /* @__PURE__ */ (0, $.jsx)(Be, {
							group: "discover",
							sorts: ee.map(([e, t, n]) => ({
								key: e,
								label: t,
								ariaLabel: n,
								pressed: e === E,
								dir: H
							})),
							onSort: (e, t) => ge(e, t),
							filters: {
								release_date: nt("release", X("catalog:catalogList.releaseDate")),
								duration: nt("dur", X("catalog:catalogList.duration")),
								source_score: nt("score", X("catalog:javSort.siteRating")),
								taste: nt("taste", X("catalog:javSort.taste")),
								code: {
									active: !!g,
									render: at
								}
							}
						})
					})
				] })
			}),
			Y && R === "cards" ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": X("catalog:javDiscover.loading"),
				dangerouslySetInnerHTML: { __html: Gt("discover", Ee) }
			}) : null,
			U.error ? /* @__PURE__ */ (0, $.jsx)(Oe, {
				titleKey: "catalog:javDiscover.failed",
				query: U
			}) : null,
			s === "external" && W?.status === "running" ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, $.jsx)(Je, {
					kind: Qe("jav-discovery-metadata"),
					label: X("catalog:javMetadata.loadingProgress", {
						completed: W.completed,
						count: W.total
					}),
					value: W.completed,
					total: W.total
				})
			}) : null,
			W && W.status !== "running" && (W.status !== "complete" || W.failed > 0) ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "neutral",
				action: /* @__PURE__ */ (0, $.jsx)(l, {
					variant: "secondary",
					...rt(G.busy === "retry"),
					"aria-label": X("catalog:javMetadata.retry"),
					onClick: () => K("retry"),
					children: X("catalog:shared.retryNow")
				}),
				children: Zt(W) || X("catalog:javMetadata.progress", {
					completed: W.completed,
					count: W.total
				})
			}) : null,
			s === "external" && G.error ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "error",
				title: /* @__PURE__ */ (0, $.jsx)("span", {
					"data-copy-key": "catalog.javMetadata.requestFailed",
					children: X("catalog:javMetadata.requestFailed")
				}),
				action: /* @__PURE__ */ (0, $.jsx)(l, {
					variant: "secondary",
					size: "small",
					disabled: !!G.busy,
					onClick: () => K(Re.current),
					children: X("catalog:shared.retryNow")
				}),
				children: G.error
			}) : null,
			!Y && !U.error && !et.length ? /* @__PURE__ */ (0, $.jsx)(re, {
				icon: ne,
				title: X(J ? "catalog:javDiscover.noMatches" : "catalog:javDiscover.noTasteMatches"),
				actions: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(u, {
					size: "small",
					href: "/taste",
					variant: "secondary",
					children: X("catalog:javDiscover.viewTaste")
				}), J ? /* @__PURE__ */ (0, $.jsx)(l, {
					variant: "primary",
					size: "small",
					onClick: Ze,
					children: X("catalog:shared.clearFilters")
				}) : s === "library" ? /* @__PURE__ */ (0, $.jsx)(u, {
					variant: "primary",
					size: "small",
					href: "/",
					children: X("catalog:entityPage.browseCollection")
				}) : /* @__PURE__ */ (0, $.jsx)(u, {
					variant: "primary",
					size: "small",
					href: "/jav?tab=online",
					children: X("catalog:javTabs.online")
				})] }),
				children: X(J ? "catalog:javDiscover.clearFiltersHint" : s === "library" ? "catalog:javDiscover.libraryEmptyHint" : "catalog:javDiscover.externalEmptyHint")
			}) : null,
			Le.error ? /* @__PURE__ */ (0, $.jsx)(L, {
				tone: "error",
				children: Le.error
			}) : null,
			R === "list" ? Y || et.length > 0 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)($r, {
				items: _t,
				waiting: Y,
				tableTop: z,
				discovery: {
					sort: E,
					dir: H,
					tag: d,
					headers: {
						...ut(!1),
						release: it("release", X("catalog:catalogList.releaseDate")),
						dur: it("dur", X("catalog:catalogList.duration")),
						score: it("score", X("catalog:javSort.siteRating")),
						taste: it("taste", X("catalog:javSort.taste")),
						code: /* @__PURE__ */ (0, $.jsx)(C, {
							id: "discover-column-code",
							label: X("catalog:shared.code"),
							active: !!g,
							children: at
						})
					}
				},
				javImage: I.value.javImage,
				readOnly: e,
				navigate: i,
				onTag: qe,
				onSort: (e, t) => {
					e !== "random" && ge(e, t);
				},
				wanting: (e) => Le.busy === String(e.id),
				onWant: ft,
				onResource: (e) => n(Ur(e))
			}), Y ? null : /* @__PURE__ */ (0, $.jsx)(j, {
				label: X("catalog:javTabs.discover"),
				total: et.length,
				pagination: {
					pageIndex: ht,
					pageSize: B.pageSize
				},
				onChange: V,
				scrollTarget: z,
				stickyHeader: () => Te.current?.querySelector("[data-filter-frame]") ?? null,
				unit: X("catalog:catalogList.footerUnit"),
				pageUnit: X("catalog:catalogList.footerPageUnit")
			})] }) : null : /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-grid": "",
				className: _e,
				style: { "--card-ratio": De },
				...vt,
				children: et.map((t) => {
					let r = _n(t.taste_score ?? t.score), a = [
						r.label,
						X("catalog:javScore.taste", { score: Ot(t.taste_score ?? t.score) }),
						U.data?.ranking_method === "mmr" && t.ranking_score != null ? X("catalog:javScore.ranking", { score: Ot(t.ranking_score) }) : "",
						t.source_score == null ? "" : X("catalog:javScore.siteRating", { rating: t.source_score.toFixed(1) }),
						...zn(t.reasons, t.reason_codes, t.reason_params)
					].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, $.jsx)(Kr, {
						item: t,
						layout: Ee,
						javImage: I.value.javImage,
						readOnly: e,
						navigate: i,
						tag: d,
						onTag: ae,
						wanting: Le.busy === String(t.id),
						onWant: () => ft(t),
						onResource: () => n(Ur(t)),
						badge: /* @__PURE__ */ (0, $.jsx)("button", {
							"data-jav-taste-score": "",
							type: "button",
							title: a,
							"aria-label": X("catalog:javScore.badgeLabel", {
								score: r.score,
								label: r.label
							}),
							className: "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
							children: /* @__PURE__ */ (0, $.jsx)(b, {
								color: r.color,
								children: r.label
							})
						})
					}, t.id);
				})
			})
		]
	});
}
export { xi as JavPage };

//# debugId=d7e84332-7dd9-495f-9859-456339d82296