"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6767], {
        24468: function(t, e, i) {
            i.d(e, {
                De: function() {
                    return he
                },
                Dx: function() {
                    return ce
                },
                ST: function() {
                    return w
                },
                f$: function() {
                    return Ee
                },
                jn: function() {
                    return ie
                },
                kL: function() {
                    return Yt
                },
                od: function() {
                    return ne
                },
                u: function() {
                    return Se
                },
                uw: function() {
                    return Ae
                }
            });
            var s = i(69784);
            class n {
                constructor() {
                    this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0
                }
                _notify(t, e, i, s) {
                    const n = e.listeners[s],
                        o = e.duration;
                    n.forEach((s => s({
                        chart: t,
                        initial: e.initial,
                        numSteps: o,
                        currentStep: Math.min(i - e.start, o)
                    })))
                }
                _refresh() {
                    this._request || (this._running = !0, this._request = s.r.call(window, (() => {
                        this._update(), this._request = null, this._running && this._refresh()
                    })))
                }
                _update(t = Date.now()) {
                    let e = 0;
                    this._charts.forEach(((i, s) => {
                        if (!i.running || !i.items.length) return;
                        const n = i.items;
                        let o, a = n.length - 1,
                            r = !1;
                        for (; a >= 0; --a) o = n[a], o._active ? (o._total > i.duration && (i.duration = o._total), o.tick(t), r = !0) : (n[a] = n[n.length - 1], n.pop());
                        r && (s.draw(), this._notify(s, i, t, "progress")), n.length || (i.running = !1, this._notify(s, i, t, "complete"), i.initial = !1), e += n.length
                    })), this._lastDate = t, 0 === e && (this._running = !1)
                }
                _getAnims(t) {
                    const e = this._charts;
                    let i = e.get(t);
                    return i || (i = {
                        running: !1,
                        initial: !0,
                        items: [],
                        listeners: {
                            complete: [],
                            progress: []
                        }
                    }, e.set(t, i)), i
                }
                listen(t, e, i) {
                    this._getAnims(t).listeners[e].push(i)
                }
                add(t, e) {
                    e && e.length && this._getAnims(t).items.push(...e)
                }
                has(t) {
                    return this._getAnims(t).items.length > 0
                }
                start(t) {
                    const e = this._charts.get(t);
                    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce(((t, e) => Math.max(t, e._duration)), 0), this._refresh())
                }
                running(t) {
                    if (!this._running) return !1;
                    const e = this._charts.get(t);
                    return !!(e && e.running && e.items.length)
                }
                stop(t) {
                    const e = this._charts.get(t);
                    if (!e || !e.items.length) return;
                    const i = e.items;
                    let s = i.length - 1;
                    for (; s >= 0; --s) i[s].cancel();
                    e.items = [], this._notify(t, e, Date.now(), "complete")
                }
                remove(t) {
                    return this._charts.delete(t)
                }
            }
            var o = new n;
            const a = "transparent",
                r = {
                    boolean: (t, e, i) => i > .5 ? e : t,
                    color(t, e, i) {
                        const n = (0, s.c)(t || a),
                            o = n.valid && (0, s.c)(e || a);
                        return o && o.valid ? o.mix(n, i).hexString() : e
                    },
                    number: (t, e, i) => t + (e - t) * i
                };
            class h {
                constructor(t, e, i, n) {
                    const o = e[i];
                    n = (0, s.a)([t.to, n, o, t.from]);
                    const a = (0, s.a)([t.from, o, n]);
                    this._active = !0, this._fn = t.fn || r[t.type || typeof a], this._easing = s.e[t.easing] || s.e.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = i, this._from = a, this._to = n, this._promises = void 0
                }
                active() {
                    return this._active
                }
                update(t, e, i) {
                    if (this._active) {
                        this._notify(!1);
                        const n = this._target[this._prop],
                            o = i - this._start,
                            a = this._duration - o;
                        this._start = i, this._duration = Math.floor(Math.max(a, t.duration)), this._total += o, this._loop = !!t.loop, this._to = (0, s.a)([t.to, e, n, t.from]), this._from = (0, s.a)([t.from, n, e])
                    }
                }
                cancel() {
                    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1))
                }
                tick(t) {
                    const e = t - this._start,
                        i = this._duration,
                        s = this._prop,
                        n = this._from,
                        o = this._loop,
                        a = this._to;
                    let r;
                    if (this._active = n !== a && (o || e < i), !this._active) return this._target[s] = a, void this._notify(!0);
                    e < 0 ? this._target[s] = n : (r = e / i % 2, r = o && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[s] = this._fn(n, a, r))
                }
                wait() {
                    const t = this._promises || (this._promises = []);
                    return new Promise(((e, i) => {
                        t.push({
                            res: e,
                            rej: i
                        })
                    }))
                }
                _notify(t) {
                    const e = t ? "res" : "rej",
                        i = this._promises || [];
                    for (let s = 0; s < i.length; s++) i[s][e]()
                }
            }
            class l {
                constructor(t, e) {
                    this._chart = t, this._properties = new Map, this.configure(e)
                }
                configure(t) {
                    if (!(0, s.i)(t)) return;
                    const e = Object.keys(s.d.animation),
                        i = this._properties;
                    Object.getOwnPropertyNames(t).forEach((n => {
                        const o = t[n];
                        if (!(0, s.i)(o)) return;
                        const a = {};
                        for (const t of e) a[t] = o[t];
                        ((0, s.b)(o.properties) && o.properties || [n]).forEach((t => {
                            t !== n && i.has(t) || i.set(t, a)
                        }))
                    }))
                }
                _animateOptions(t, e) {
                    const i = e.options,
                        s = function(t, e) {
                            if (!e) return;
                            let i = t.options;
                            if (!i) return void(t.options = e);
                            i.$shared && (t.options = i = Object.assign({}, i, {
                                $shared: !1,
                                $animations: {}
                            }));
                            return i
                        }(t, i);
                    if (!s) return [];
                    const n = this._createAnimations(s, i);
                    return i.$shared && function(t, e) {
                        const i = [],
                            s = Object.keys(e);
                        for (let n = 0; n < s.length; n++) {
                            const e = t[s[n]];
                            e && e.active() && i.push(e.wait())
                        }
                        return Promise.all(i)
                    }(t.options.$animations, i).then((() => {
                        t.options = i
                    }), (() => {})), n
                }
                _createAnimations(t, e) {
                    const i = this._properties,
                        s = [],
                        n = t.$animations || (t.$animations = {}),
                        o = Object.keys(e),
                        a = Date.now();
                    let r;
                    for (r = o.length - 1; r >= 0; --r) {
                        const l = o[r];
                        if ("$" === l.charAt(0)) continue;
                        if ("options" === l) {
                            s.push(...this._animateOptions(t, e));
                            continue
                        }
                        const c = e[l];
                        let d = n[l];
                        const u = i.get(l);
                        if (d) {
                            if (u && d.active()) {
                                d.update(u, c, a);
                                continue
                            }
                            d.cancel()
                        }
                        u && u.duration ? (n[l] = d = new h(u, t, l, c), s.push(d)) : t[l] = c
                    }
                    return s
                }
                update(t, e) {
                    if (0 === this._properties.size) return void Object.assign(t, e);
                    const i = this._createAnimations(t, e);
                    return i.length ? (o.add(this._chart, i), !0) : void 0
                }
            }

            function c(t, e) {
                const i = t && t.options || {},
                    s = i.reverse,
                    n = void 0 === i.min ? e : 0,
                    o = void 0 === i.max ? e : 0;
                return {
                    start: s ? o : n,
                    end: s ? n : o
                }
            }

            function d(t, e) {
                const i = [],
                    s = t._getSortedDatasetMetas(e);
                let n, o;
                for (n = 0, o = s.length; n < o; ++n) i.push(s[n].index);
                return i
            }

            function u(t, e, i, n = {}) {
                const o = t.keys,
                    a = "single" === n.mode;
                let r, h, l, c;
                if (null !== e) {
                    for (r = 0, h = o.length; r < h; ++r) {
                        if (l = +o[r], l === i) {
                            if (n.all) continue;
                            break
                        }
                        c = t.values[l], (0, s.g)(c) && (a || 0 === e || (0, s.s)(e) === (0, s.s)(c)) && (e += c)
                    }
                    return e
                }
            }

            function g(t, e) {
                const i = t && t.options.stacked;
                return i || void 0 === i && void 0 !== e.stack
            }

            function p(t, e, i) {
                const s = t[e] || (t[e] = {});
                return s[i] || (s[i] = {})
            }

            function f(t, e, i, s) {
                for (const n of e.getMatchingVisibleMetas(s).reverse()) {
                    const e = t[n.index];
                    if (i && e > 0 || !i && e < 0) return n.index
                }
                return null
            }

            function m(t, e) {
                const {
                    chart: i,
                    _cachedMeta: s
                } = t, n = i._stacks || (i._stacks = {}), {
                    iScale: o,
                    vScale: a,
                    index: r
                } = s, h = o.axis, l = a.axis, c = function(t, e, i) {
                    return `${t.id}.${e.id}.${i.stack||i.type}`
                }(o, a, s), d = e.length;
                let u;
                for (let g = 0; g < d; ++g) {
                    const t = e[g],
                        {
                            [h]: i,
                            [l]: o
                        } = t;
                    u = (t._stacks || (t._stacks = {}))[l] = p(n, c, i), u[r] = o, u._top = f(u, a, !0, s.type), u._bottom = f(u, a, !1, s.type);
                    (u._visualValues || (u._visualValues = {}))[r] = o
                }
            }

            function x(t, e) {
                const i = t.scales;
                return Object.keys(i).filter((t => i[t].axis === e)).shift()
            }

            function _(t, e) {
                const i = t.controller.index,
                    s = t.vScale && t.vScale.axis;
                if (s) {
                    e = e || t._parsed;
                    for (const t of e) {
                        const e = t._stacks;
                        if (!e || void 0 === e[s] || void 0 === e[s][i]) return;
                        delete e[s][i], void 0 !== e[s]._visualValues && void 0 !== e[s]._visualValues[i] && delete e[s]._visualValues[i]
                    }
                }
            }
            const b = t => "reset" === t || "none" === t,
                v = (t, e) => e ? t : Object.assign({}, t);
            class y {
                static defaults = {};
                static datasetElementType = null;
                static dataElementType = null;
                constructor(t, e) {
                    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize()
                }
                initialize() {
                    const t = this._cachedMeta;
                    this.configure(), this.linkScales(), t._stacked = g(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")
                }
                updateIndex(t) {
                    this.index !== t && _(this._cachedMeta), this.index = t
                }
                linkScales() {
                    const t = this.chart,
                        e = this._cachedMeta,
                        i = this.getDataset(),
                        n = (t, e, i, s) => "x" === t ? e : "r" === t ? s : i,
                        o = e.xAxisID = (0, s.v)(i.xAxisID, x(t, "x")),
                        a = e.yAxisID = (0, s.v)(i.yAxisID, x(t, "y")),
                        r = e.rAxisID = (0, s.v)(i.rAxisID, x(t, "r")),
                        h = e.indexAxis,
                        l = e.iAxisID = n(h, o, a, r),
                        c = e.vAxisID = n(h, a, o, r);
                    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(a), e.rScale = this.getScaleForId(r), e.iScale = this.getScaleForId(l), e.vScale = this.getScaleForId(c)
                }
                getDataset() {
                    return this.chart.data.datasets[this.index]
                }
                getMeta() {
                    return this.chart.getDatasetMeta(this.index)
                }
                getScaleForId(t) {
                    return this.chart.scales[t]
                }
                _getOtherScale(t) {
                    const e = this._cachedMeta;
                    return t === e.iScale ? e.vScale : e.iScale
                }
                reset() {
                    this._update("reset")
                }
                _destroy() {
                    const t = this._cachedMeta;
                    this._data && (0, s.u)(this._data, this), t._stacked && _(t)
                }
                _dataCheck() {
                    const t = this.getDataset(),
                        e = t.data || (t.data = []),
                        i = this._data;
                    if ((0, s.i)(e)) this._data = function(t) {
                        const e = Object.keys(t),
                            i = new Array(e.length);
                        let s, n, o;
                        for (s = 0, n = e.length; s < n; ++s) o = e[s], i[s] = {
                            x: o,
                            y: t[o]
                        };
                        return i
                    }(e);
                    else if (i !== e) {
                        if (i) {
                            (0, s.u)(i, this);
                            const t = this._cachedMeta;
                            _(t), t._parsed = []
                        }
                        e && Object.isExtensible(e) && (0, s.l)(e, this), this._syncList = [], this._data = e
                    }
                }
                addElements() {
                    const t = this._cachedMeta;
                    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType)
                }
                buildOrUpdateElements(t) {
                    const e = this._cachedMeta,
                        i = this.getDataset();
                    let s = !1;
                    this._dataCheck();
                    const n = e._stacked;
                    e._stacked = g(e.vScale, e), e.stack !== i.stack && (s = !0, _(e), e.stack = i.stack), this._resyncElements(t), (s || n !== e._stacked) && m(this, e._parsed)
                }
                configure() {
                    const t = this.chart.config,
                        e = t.datasetScopeKeys(this._type),
                        i = t.getOptionScopes(this.getDataset(), e, !0);
                    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {}
                }
                parse(t, e) {
                    const {
                        _cachedMeta: i,
                        _data: n
                    } = this, {
                        iScale: o,
                        _stacked: a
                    } = i, r = o.axis;
                    let h, l, c, d = 0 === t && e === n.length || i._sorted,
                        u = t > 0 && i._parsed[t - 1];
                    if (!1 === this._parsing) i._parsed = n, i._sorted = !0, c = n;
                    else {
                        c = (0, s.b)(n[t]) ? this.parseArrayData(i, n, t, e) : (0, s.i)(n[t]) ? this.parseObjectData(i, n, t, e) : this.parsePrimitiveData(i, n, t, e);
                        const o = () => null === l[r] || u && l[r] < u[r];
                        for (h = 0; h < e; ++h) i._parsed[h + t] = l = c[h], d && (o() && (d = !1), u = l);
                        i._sorted = d
                    }
                    a && m(this, c)
                }
                parsePrimitiveData(t, e, i, s) {
                    const {
                        iScale: n,
                        vScale: o
                    } = t, a = n.axis, r = o.axis, h = n.getLabels(), l = n === o, c = new Array(s);
                    let d, u, g;
                    for (d = 0, u = s; d < u; ++d) g = d + i, c[d] = {
                        [a]: l || n.parse(h[g], g),
                        [r]: o.parse(e[g], g)
                    };
                    return c
                }
                parseArrayData(t, e, i, s) {
                    const {
                        xScale: n,
                        yScale: o
                    } = t, a = new Array(s);
                    let r, h, l, c;
                    for (r = 0, h = s; r < h; ++r) l = r + i, c = e[l], a[r] = {
                        x: n.parse(c[0], l),
                        y: o.parse(c[1], l)
                    };
                    return a
                }
                parseObjectData(t, e, i, n) {
                    const {
                        xScale: o,
                        yScale: a
                    } = t, {
                        xAxisKey: r = "x",
                        yAxisKey: h = "y"
                    } = this._parsing, l = new Array(n);
                    let c, d, u, g;
                    for (c = 0, d = n; c < d; ++c) u = c + i, g = e[u], l[c] = {
                        x: o.parse((0, s.f)(g, r), u),
                        y: a.parse((0, s.f)(g, h), u)
                    };
                    return l
                }
                getParsed(t) {
                    return this._cachedMeta._parsed[t]
                }
                getDataElement(t) {
                    return this._cachedMeta.data[t]
                }
                applyStack(t, e, i) {
                    const s = this.chart,
                        n = this._cachedMeta,
                        o = e[t.axis];
                    return u({
                        keys: d(s, !0),
                        values: e._stacks[t.axis]._visualValues
                    }, o, n.index, {
                        mode: i
                    })
                }
                updateRangeFromParsed(t, e, i, s) {
                    const n = i[e.axis];
                    let o = null === n ? NaN : n;
                    const a = s && i._stacks[e.axis];
                    s && a && (s.values = a, o = u(s, n, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o)
                }
                getMinMax(t, e) {
                    const i = this._cachedMeta,
                        n = i._parsed,
                        o = i._sorted && t === i.iScale,
                        a = n.length,
                        r = this._getOtherScale(t),
                        h = ((t, e, i) => t && !e.hidden && e._stacked && {
                            keys: d(i, !0),
                            values: null
                        })(e, i, this.chart),
                        l = {
                            min: Number.POSITIVE_INFINITY,
                            max: Number.NEGATIVE_INFINITY
                        },
                        {
                            min: c,
                            max: u
                        } = function(t) {
                            const {
                                min: e,
                                max: i,
                                minDefined: s,
                                maxDefined: n
                            } = t.getUserBounds();
                            return {
                                min: s ? e : Number.NEGATIVE_INFINITY,
                                max: n ? i : Number.POSITIVE_INFINITY
                            }
                        }(r);
                    let g, p;

                    function f() {
                        p = n[g];
                        const e = p[r.axis];
                        return !(0, s.g)(p[t.axis]) || c > e || u < e
                    }
                    for (g = 0; g < a && (f() || (this.updateRangeFromParsed(l, t, p, h), !o)); ++g);
                    if (o)
                        for (g = a - 1; g >= 0; --g)
                            if (!f()) {
                                this.updateRangeFromParsed(l, t, p, h);
                                break
                            }
                    return l
                }
                getAllParsedValues(t) {
                    const e = this._cachedMeta._parsed,
                        i = [];
                    let n, o, a;
                    for (n = 0, o = e.length; n < o; ++n) a = e[n][t.axis], (0, s.g)(a) && i.push(a);
                    return i
                }
                getMaxOverflow() {
                    return !1
                }
                getLabelAndValue(t) {
                    const e = this._cachedMeta,
                        i = e.iScale,
                        s = e.vScale,
                        n = this.getParsed(t);
                    return {
                        label: i ? "" + i.getLabelForValue(n[i.axis]) : "",
                        value: s ? "" + s.getLabelForValue(n[s.axis]) : ""
                    }
                }
                _update(t) {
                    const e = this._cachedMeta;
                    this.update(t || "default"), e._clip = function(t) {
                        let e, i, n, o;
                        return (0, s.i)(t) ? (e = t.top, i = t.right, n = t.bottom, o = t.left) : e = i = n = o = t, {
                            top: e,
                            right: i,
                            bottom: n,
                            left: o,
                            disabled: !1 === t
                        }
                    }((0, s.v)(this.options.clip, function(t, e, i) {
                        if (!1 === i) return !1;
                        const s = c(t, i),
                            n = c(e, i);
                        return {
                            top: n.end,
                            right: s.end,
                            bottom: n.start,
                            left: s.start
                        }
                    }(e.xScale, e.yScale, this.getMaxOverflow())))
                }
                update(t) {}
                draw() {
                    const t = this._ctx,
                        e = this.chart,
                        i = this._cachedMeta,
                        s = i.data || [],
                        n = e.chartArea,
                        o = [],
                        a = this._drawStart || 0,
                        r = this._drawCount || s.length - a,
                        h = this.options.drawActiveElementsOnTop;
                    let l;
                    for (i.dataset && i.dataset.draw(t, n, a, r), l = a; l < a + r; ++l) {
                        const e = s[l];
                        e.hidden || (e.active && h ? o.push(e) : e.draw(t, n))
                    }
                    for (l = 0; l < o.length; ++l) o[l].draw(t, n)
                }
                getStyle(t, e) {
                    const i = e ? "active" : "default";
                    return void 0 === t && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i)
                }
                getContext(t, e, i) {
                    const n = this.getDataset();
                    let o;
                    if (t >= 0 && t < this._cachedMeta.data.length) {
                        const e = this._cachedMeta.data[t];
                        o = e.$context || (e.$context = function(t, e, i) {
                            return (0, s.j)(t, {
                                active: !1,
                                dataIndex: e,
                                parsed: void 0,
                                raw: void 0,
                                element: i,
                                index: e,
                                mode: "default",
                                type: "data"
                            })
                        }(this.getContext(), t, e)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t
                    } else o = this.$context || (this.$context = function(t, e) {
                        return (0, s.j)(t, {
                            active: !1,
                            dataset: void 0,
                            datasetIndex: e,
                            index: e,
                            mode: "default",
                            type: "dataset"
                        })
                    }(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
                    return o.active = !!e, o.mode = i, o
                }
                resolveDatasetElementOptions(t) {
                    return this._resolveElementOptions(this.datasetElementType.id, t)
                }
                resolveDataElementOptions(t, e) {
                    return this._resolveElementOptions(this.dataElementType.id, e, t)
                }
                _resolveElementOptions(t, e = "default", i) {
                    const n = "active" === e,
                        o = this._cachedDataOpts,
                        a = t + "-" + e,
                        r = o[a],
                        h = this.enableOptionSharing && (0, s.h)(i);
                    if (r) return v(r, h);
                    const l = this.chart.config,
                        c = l.datasetElementScopeKeys(this._type, t),
                        d = n ? [`${t}Hover`, "hover", t, ""] : [t, ""],
                        u = l.getOptionScopes(this.getDataset(), c),
                        g = Object.keys(s.d.elements[t]),
                        p = l.resolveNamedOptions(u, g, (() => this.getContext(i, n, e)), d);
                    return p.$shared && (p.$shared = h, o[a] = Object.freeze(v(p, h))), p
                }
                _resolveAnimations(t, e, i) {
                    const s = this.chart,
                        n = this._cachedDataOpts,
                        o = `animation-${e}`,
                        a = n[o];
                    if (a) return a;
                    let r;
                    if (!1 !== s.options.animation) {
                        const s = this.chart.config,
                            n = s.datasetAnimationScopeKeys(this._type, e),
                            o = s.getOptionScopes(this.getDataset(), n);
                        r = s.createResolver(o, this.getContext(t, i, e))
                    }
                    const h = new l(s, r && r.animations);
                    return r && r._cacheable && (n[o] = Object.freeze(h)), h
                }
                getSharedOptions(t) {
                    if (t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
                }
                includeOptions(t, e) {
                    return !e || b(t) || this.chart._animationsDisabled
                }
                _getSharedOptions(t, e) {
                    const i = this.resolveDataElementOptions(t, e),
                        s = this._sharedOptions,
                        n = this.getSharedOptions(i),
                        o = this.includeOptions(e, n) || n !== s;
                    return this.updateSharedOptions(n, e, i), {
                        sharedOptions: n,
                        includeOptions: o
                    }
                }
                updateElement(t, e, i, s) {
                    b(s) ? Object.assign(t, i) : this._resolveAnimations(e, s).update(t, i)
                }
                updateSharedOptions(t, e, i) {
                    t && !b(e) && this._resolveAnimations(void 0, e).update(t, i)
                }
                _setStyle(t, e, i, s) {
                    t.active = s;
                    const n = this.getStyle(e, s);
                    this._resolveAnimations(e, i, s).update(t, {
                        options: !s && this.getSharedOptions(n) || n
                    })
                }
                removeHoverStyle(t, e, i) {
                    this._setStyle(t, i, "active", !1)
                }
                setHoverStyle(t, e, i) {
                    this._setStyle(t, i, "active", !0)
                }
                _removeDatasetHoverStyle() {
                    const t = this._cachedMeta.dataset;
                    t && this._setStyle(t, void 0, "active", !1)
                }
                _setDatasetHoverStyle() {
                    const t = this._cachedMeta.dataset;
                    t && this._setStyle(t, void 0, "active", !0)
                }
                _resyncElements(t) {
                    const e = this._data,
                        i = this._cachedMeta.data;
                    for (const [a, r, h] of this._syncList) this[a](r, h);
                    this._syncList = [];
                    const s = i.length,
                        n = e.length,
                        o = Math.min(n, s);
                    o && this.parse(0, o), n > s ? this._insertElements(s, n - s, t) : n < s && this._removeElements(n, s - n)
                }
                _insertElements(t, e, i = !0) {
                    const s = this._cachedMeta,
                        n = s.data,
                        o = t + e;
                    let a;
                    const r = t => {
                        for (t.length += e, a = t.length - 1; a >= o; a--) t[a] = t[a - e]
                    };
                    for (r(n), a = t; a < o; ++a) n[a] = new this.dataElementType;
                    this._parsing && r(s._parsed), this.parse(t, e), i && this.updateElements(n, t, e, "reset")
                }
                updateElements(t, e, i, s) {}
                _removeElements(t, e) {
                    const i = this._cachedMeta;
                    if (this._parsing) {
                        const s = i._parsed.splice(t, e);
                        i._stacked && _(i, s)
                    }
                    i.data.splice(t, e)
                }
                _sync(t) {
                    if (this._parsing) this._syncList.push(t);
                    else {
                        const [e, i, s] = t;
                        this[e](i, s)
                    }
                    this.chart._dataChanges.push([this.index, ...t])
                }
                _onDataPush() {
                    const t = arguments.length;
                    this._sync(["_insertElements", this.getDataset().data.length - t, t])
                }
                _onDataPop() {
                    this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1])
                }
                _onDataShift() {
                    this._sync(["_removeElements", 0, 1])
                }
                _onDataSplice(t, e) {
                    e && this._sync(["_removeElements", t, e]);
                    const i = arguments.length - 2;
                    i && this._sync(["_insertElements", t, i])
                }
                _onDataUnshift() {
                    this._sync(["_insertElements", 0, arguments.length])
                }
            }
            class w extends y {
                static id = "line";
                static defaults = {
                    datasetElementType: "line",
                    dataElementType: "point",
                    showLine: !0,
                    spanGaps: !1
                };
                static overrides = {
                    scales: {
                        _index_: {
                            type: "category"
                        },
                        _value_: {
                            type: "linear"
                        }
                    }
                };
                initialize() {
                    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize()
                }
                update(t) {
                    const e = this._cachedMeta,
                        {
                            dataset: i,
                            data: n = [],
                            _dataset: o
                        } = e,
                        a = this.chart._animationsDisabled;
                    let {
                        start: r,
                        count: h
                    } = (0, s.q)(e, n, a);
                    this._drawStart = r, this._drawCount = h, (0, s.w)(e) && (r = 0, h = n.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!o._decimated, i.points = n;
                    const l = this.resolveDatasetElementOptions(t);
                    this.options.showLine || (l.borderWidth = 0), l.segment = this.options.segment, this.updateElement(i, void 0, {
                        animated: !a,
                        options: l
                    }, t), this.updateElements(n, r, h, t)
                }
                updateElements(t, e, i, n) {
                    const o = "reset" === n,
                        {
                            iScale: a,
                            vScale: r,
                            _stacked: h,
                            _dataset: l
                        } = this._cachedMeta,
                        {
                            sharedOptions: c,
                            includeOptions: d
                        } = this._getSharedOptions(e, n),
                        u = a.axis,
                        g = r.axis,
                        {
                            spanGaps: p,
                            segment: f
                        } = this.options,
                        m = (0, s.x)(p) ? p : Number.POSITIVE_INFINITY,
                        x = this.chart._animationsDisabled || o || "none" === n,
                        _ = e + i,
                        b = t.length;
                    let v = e > 0 && this.getParsed(e - 1);
                    for (let y = 0; y < b; ++y) {
                        const i = t[y],
                            p = x ? i : {};
                        if (y < e || y >= _) {
                            p.skip = !0;
                            continue
                        }
                        const b = this.getParsed(y),
                            w = (0, s.k)(b[g]),
                            k = p[u] = a.getPixelForValue(b[u], y),
                            M = p[g] = o || w ? r.getBasePixel() : r.getPixelForValue(h ? this.applyStack(r, b, h) : b[g], y);
                        p.skip = isNaN(k) || isNaN(M) || w, p.stop = y > 0 && Math.abs(b[u] - v[u]) > m, f && (p.parsed = b, p.raw = l.data[y]), d && (p.options = c || this.resolveDataElementOptions(y, i.active ? "active" : n)), x || this.updateElement(i, y, p, n), v = b
                    }
                }
                getMaxOverflow() {
                    const t = this._cachedMeta,
                        e = t.dataset,
                        i = e.options && e.options.borderWidth || 0,
                        s = t.data || [];
                    if (!s.length) return i;
                    const n = s[0].size(this.resolveDataElementOptions(0)),
                        o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
                    return Math.max(i, n, o) / 2
                }
                draw() {
                    const t = this._cachedMeta;
                    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw()
                }
            }

            function k(t, e, i, n) {
                const {
                    controller: o,
                    data: a,
                    _sorted: r
                } = t, h = o._cachedMeta.iScale;
                if (h && e === h.axis && "r" !== e && r && a.length) {
                    const t = h._reversePixels ? s.A : s.B;
                    if (!n) return t(a, e, i);
                    if (o._sharedOptions) {
                        const s = a[0],
                            n = "function" === typeof s.getRange && s.getRange(e);
                        if (n) {
                            const s = t(a, e, i - n),
                                o = t(a, e, i + n);
                            return {
                                lo: s.lo,
                                hi: o.hi
                            }
                        }
                    }
                }
                return {
                    lo: 0,
                    hi: a.length - 1
                }
            }

            function M(t, e, i, s, n) {
                const o = t.getSortedVisibleDatasetMetas(),
                    a = i[e];
                for (let r = 0, h = o.length; r < h; ++r) {
                    const {
                        index: t,
                        data: i
                    } = o[r], {
                        lo: h,
                        hi: l
                    } = k(o[r], e, a, n);
                    for (let e = h; e <= l; ++e) {
                        const n = i[e];
                        n.skip || s(n, t, e)
                    }
                }
            }

            function S(t, e, i, n, o) {
                const a = [];
                if (!o && !t.isPointInArea(e)) return a;
                return M(t, i, e, (function(i, r, h) {
                    (o || (0, s.C)(i, t.chartArea, 0)) && i.inRange(e.x, e.y, n) && a.push({
                        element: i,
                        datasetIndex: r,
                        index: h
                    })
                }), !0), a
            }

            function D(t, e, i, s, n, o) {
                let a = [];
                const r = function(t) {
                    const e = -1 !== t.indexOf("x"),
                        i = -1 !== t.indexOf("y");
                    return function(t, s) {
                        const n = e ? Math.abs(t.x - s.x) : 0,
                            o = i ? Math.abs(t.y - s.y) : 0;
                        return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2))
                    }
                }(i);
                let h = Number.POSITIVE_INFINITY;
                return M(t, i, e, (function(i, l, c) {
                    const d = i.inRange(e.x, e.y, n);
                    if (s && !d) return;
                    const u = i.getCenterPoint(n);
                    if (!(!!o || t.isPointInArea(u)) && !d) return;
                    const g = r(e, u);
                    g < h ? (a = [{
                        element: i,
                        datasetIndex: l,
                        index: c
                    }], h = g) : g === h && a.push({
                        element: i,
                        datasetIndex: l,
                        index: c
                    })
                })), a
            }

            function C(t, e, i, n, o, a) {
                return a || t.isPointInArea(e) ? "r" !== i || n ? D(t, e, i, n, o, a) : function(t, e, i, n) {
                    let o = [];
                    return M(t, i, e, (function(t, i, a) {
                        const {
                            startAngle: r,
                            endAngle: h
                        } = t.getProps(["startAngle", "endAngle"], n), {
                            angle: l
                        } = (0, s.D)(t, {
                            x: e.x,
                            y: e.y
                        });
                        (0, s.p)(l, r, h) && o.push({
                            element: t,
                            datasetIndex: i,
                            index: a
                        })
                    })), o
                }(t, e, i, o) : []
            }

            function A(t, e, i, s, n) {
                const o = [],
                    a = "x" === i ? "inXRange" : "inYRange";
                let r = !1;
                return M(t, i, e, ((t, s, h) => {
                    t[a](e[i], n) && (o.push({
                        element: t,
                        datasetIndex: s,
                        index: h
                    }), r = r || t.inRange(e.x, e.y, n))
                })), s && !r ? [] : o
            }
            var P = {
                evaluateInteractionItems: M,
                modes: {
                    index(t, e, i, n) {
                        const o = (0, s.z)(e, t),
                            a = i.axis || "x",
                            r = i.includeInvisible || !1,
                            h = i.intersect ? S(t, o, a, n, r) : C(t, o, a, !1, n, r),
                            l = [];
                        return h.length ? (t.getSortedVisibleDatasetMetas().forEach((t => {
                            const e = h[0].index,
                                i = t.data[e];
                            i && !i.skip && l.push({
                                element: i,
                                datasetIndex: t.index,
                                index: e
                            })
                        })), l) : []
                    },
                    dataset(t, e, i, n) {
                        const o = (0, s.z)(e, t),
                            a = i.axis || "xy",
                            r = i.includeInvisible || !1;
                        let h = i.intersect ? S(t, o, a, n, r) : C(t, o, a, !1, n, r);
                        if (h.length > 0) {
                            const e = h[0].datasetIndex,
                                i = t.getDatasetMeta(e).data;
                            h = [];
                            for (let t = 0; t < i.length; ++t) h.push({
                                element: i[t],
                                datasetIndex: e,
                                index: t
                            })
                        }
                        return h
                    },
                    point: (t, e, i, n) => S(t, (0, s.z)(e, t), i.axis || "xy", n, i.includeInvisible || !1),
                    nearest(t, e, i, n) {
                        const o = (0, s.z)(e, t),
                            a = i.axis || "xy",
                            r = i.includeInvisible || !1;
                        return C(t, o, a, i.intersect, n, r)
                    },
                    x: (t, e, i, n) => A(t, (0, s.z)(e, t), "x", i.intersect, n),
                    y: (t, e, i, n) => A(t, (0, s.z)(e, t), "y", i.intersect, n)
                }
            };
            const O = ["left", "top", "right", "bottom"];

            function E(t, e) {
                return t.filter((t => t.pos === e))
            }

            function I(t, e) {
                return t.filter((t => -1 === O.indexOf(t.pos) && t.box.axis === e))
            }

            function L(t, e) {
                return t.sort(((t, i) => {
                    const s = e ? i : t,
                        n = e ? t : i;
                    return s.weight === n.weight ? s.index - n.index : s.weight - n.weight
                }))
            }

            function T(t, e) {
                const i = function(t) {
                        const e = {};
                        for (const i of t) {
                            const {
                                stack: t,
                                pos: s,
                                stackWeight: n
                            } = i;
                            if (!t || !O.includes(s)) continue;
                            const o = e[t] || (e[t] = {
                                count: 0,
                                placed: 0,
                                weight: 0,
                                size: 0
                            });
                            o.count++, o.weight += n
                        }
                        return e
                    }(t),
                    {
                        vBoxMaxWidth: s,
                        hBoxMaxHeight: n
                    } = e;
                let o, a, r;
                for (o = 0, a = t.length; o < a; ++o) {
                    r = t[o];
                    const {
                        fullSize: a
                    } = r.box, h = i[r.stack], l = h && r.stackWeight / h.weight;
                    r.horizontal ? (r.width = l ? l * s : a && e.availableWidth, r.height = n) : (r.width = s, r.height = l ? l * n : a && e.availableHeight)
                }
                return i
            }

            function z(t, e, i, s) {
                return Math.max(t[i], e[i]) + Math.max(t[s], e[s])
            }

            function F(t, e) {
                t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right)
            }

            function R(t, e, i, n) {
                const {
                    pos: o,
                    box: a
                } = i, r = t.maxPadding;
                if (!(0, s.i)(o)) {
                    i.size && (t[o] -= i.size);
                    const e = n[i.stack] || {
                        size: 0,
                        count: 1
                    };
                    e.size = Math.max(e.size, i.horizontal ? a.height : a.width), i.size = e.size / e.count, t[o] += i.size
                }
                a.getPadding && F(r, a.getPadding());
                const h = Math.max(0, e.outerWidth - z(r, t, "left", "right")),
                    l = Math.max(0, e.outerHeight - z(r, t, "top", "bottom")),
                    c = h !== t.w,
                    d = l !== t.h;
                return t.w = h, t.h = l, i.horizontal ? {
                    same: c,
                    other: d
                } : {
                    same: d,
                    other: c
                }
            }

            function H(t, e) {
                const i = e.maxPadding;

                function s(t) {
                    const s = {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    };
                    return t.forEach((t => {
                        s[t] = Math.max(e[t], i[t])
                    })), s
                }
                return s(t ? ["left", "right"] : ["top", "bottom"])
            }

            function B(t, e, i, s) {
                const n = [];
                let o, a, r, h, l, c;
                for (o = 0, a = t.length, l = 0; o < a; ++o) {
                    r = t[o], h = r.box, h.update(r.width || e.w, r.height || e.h, H(r.horizontal, e));
                    const {
                        same: a,
                        other: d
                    } = R(e, i, r, s);
                    l |= a && n.length, c = c || d, h.fullSize || n.push(r)
                }
                return l && B(n, e, i, s) || c
            }

            function W(t, e, i, s, n) {
                t.top = i, t.left = e, t.right = e + s, t.bottom = i + n, t.width = s, t.height = n
            }

            function V(t, e, i, n) {
                const o = i.padding;
                let {
                    x: a,
                    y: r
                } = e;
                for (const h of t) {
                    const t = h.box,
                        l = n[h.stack] || {
                            count: 1,
                            placed: 0,
                            weight: 1
                        },
                        c = h.stackWeight / l.weight || 1;
                    if (h.horizontal) {
                        const n = e.w * c,
                            a = l.size || t.height;
                        (0, s.h)(l.start) && (r = l.start), t.fullSize ? W(t, o.left, r, i.outerWidth - o.right - o.left, a) : W(t, e.left + l.placed, r, n, a), l.start = r, l.placed += n, r = t.bottom
                    } else {
                        const n = e.h * c,
                            r = l.size || t.width;
                        (0, s.h)(l.start) && (a = l.start), t.fullSize ? W(t, a, o.top, r, i.outerHeight - o.bottom - o.top) : W(t, a, e.top + l.placed, r, n), l.start = a, l.placed += n, a = t.right
                    }
                }
                e.x = a, e.y = r
            }
            var j = {
                addBox(t, e) {
                    t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
                        return [{
                            z: 0,
                            draw(t) {
                                e.draw(t)
                            }
                        }]
                    }, t.boxes.push(e)
                },
                removeBox(t, e) {
                    const i = t.boxes ? t.boxes.indexOf(e) : -1; - 1 !== i && t.boxes.splice(i, 1)
                },
                configure(t, e, i) {
                    e.fullSize = i.fullSize, e.position = i.position, e.weight = i.weight
                },
                update(t, e, i, n) {
                    if (!t) return;
                    const o = (0, s.E)(t.options.layout.padding),
                        a = Math.max(e - o.width, 0),
                        r = Math.max(i - o.height, 0),
                        h = function(t) {
                            const e = function(t) {
                                    const e = [];
                                    let i, s, n, o, a, r;
                                    for (i = 0, s = (t || []).length; i < s; ++i) n = t[i], ({
                                        position: o,
                                        options: {
                                            stack: a,
                                            stackWeight: r = 1
                                        }
                                    } = n), e.push({
                                        index: i,
                                        box: n,
                                        pos: o,
                                        horizontal: n.isHorizontal(),
                                        weight: n.weight,
                                        stack: a && o + a,
                                        stackWeight: r
                                    });
                                    return e
                                }(t),
                                i = L(e.filter((t => t.box.fullSize)), !0),
                                s = L(E(e, "left"), !0),
                                n = L(E(e, "right")),
                                o = L(E(e, "top"), !0),
                                a = L(E(e, "bottom")),
                                r = I(e, "x"),
                                h = I(e, "y");
                            return {
                                fullSize: i,
                                leftAndTop: s.concat(o),
                                rightAndBottom: n.concat(h).concat(a).concat(r),
                                chartArea: E(e, "chartArea"),
                                vertical: s.concat(n).concat(h),
                                horizontal: o.concat(a).concat(r)
                            }
                        }(t.boxes),
                        l = h.vertical,
                        c = h.horizontal;
                    (0, s.F)(t.boxes, (t => {
                        "function" === typeof t.beforeLayout && t.beforeLayout()
                    }));
                    const d = l.reduce(((t, e) => e.box.options && !1 === e.box.options.display ? t : t + 1), 0) || 1,
                        u = Object.freeze({
                            outerWidth: e,
                            outerHeight: i,
                            padding: o,
                            availableWidth: a,
                            availableHeight: r,
                            vBoxMaxWidth: a / 2 / d,
                            hBoxMaxHeight: r / 2
                        }),
                        g = Object.assign({}, o);
                    F(g, (0, s.E)(n));
                    const p = Object.assign({
                            maxPadding: g,
                            w: a,
                            h: r,
                            x: o.left,
                            y: o.top
                        }, o),
                        f = T(l.concat(c), u);
                    B(h.fullSize, p, u, f), B(l, p, u, f), B(c, p, u, f) && B(l, p, u, f),
                        function(t) {
                            const e = t.maxPadding;

                            function i(i) {
                                const s = Math.max(e[i] - t[i], 0);
                                return t[i] += s, s
                            }
                            t.y += i("top"), t.x += i("left"), i("right"), i("bottom")
                        }(p), V(h.leftAndTop, p, u, f), p.x += p.w, p.y += p.h, V(h.rightAndBottom, p, u, f), t.chartArea = {
                            left: p.left,
                            top: p.top,
                            right: p.left + p.w,
                            bottom: p.top + p.h,
                            height: p.h,
                            width: p.w
                        }, (0, s.F)(h.chartArea, (e => {
                            const i = e.box;
                            Object.assign(i, t.chartArea), i.update(p.w, p.h, {
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            })
                        }))
                }
            };
            class $ {
                acquireContext(t, e) {}
                releaseContext(t) {
                    return !1
                }
                addEventListener(t, e, i) {}
                removeEventListener(t, e, i) {}
                getDevicePixelRatio() {
                    return 1
                }
                getMaximumSize(t, e, i, s) {
                    return e = Math.max(0, e || t.width), i = i || t.height, {
                        width: e,
                        height: Math.max(0, s ? Math.floor(e / s) : i)
                    }
                }
                isAttached(t) {
                    return !0
                }
                updateConfig(t) {}
            }
            class N extends $ {
                acquireContext(t) {
                    return t && t.getContext && t.getContext("2d") || null
                }
                updateConfig(t) {
                    t.options.animation = !1
                }
            }
            const U = {
                    touchstart: "mousedown",
                    touchmove: "mousemove",
                    touchend: "mouseup",
                    pointerenter: "mouseenter",
                    pointerdown: "mousedown",
                    pointermove: "mousemove",
                    pointerup: "mouseup",
                    pointerleave: "mouseout",
                    pointerout: "mouseout"
                },
                Y = t => null === t || "" === t;
            const Q = !!s.K && {
                passive: !0
            };

            function X(t, e, i) {
                t.canvas.removeEventListener(e, i, Q)
            }

            function K(t, e) {
                for (const i of t)
                    if (i === e || i.contains(e)) return !0
            }

            function q(t, e, i) {
                const s = t.canvas,
                    n = new MutationObserver((t => {
                        let e = !1;
                        for (const i of t) e = e || K(i.addedNodes, s), e = e && !K(i.removedNodes, s);
                        e && i()
                    }));
                return n.observe(document, {
                    childList: !0,
                    subtree: !0
                }), n
            }

            function G(t, e, i) {
                const s = t.canvas,
                    n = new MutationObserver((t => {
                        let e = !1;
                        for (const i of t) e = e || K(i.removedNodes, s), e = e && !K(i.addedNodes, s);
                        e && i()
                    }));
                return n.observe(document, {
                    childList: !0,
                    subtree: !0
                }), n
            }
            const J = new Map;
            let Z = 0;

            function tt() {
                const t = window.devicePixelRatio;
                t !== Z && (Z = t, J.forEach(((e, i) => {
                    i.currentDevicePixelRatio !== t && e()
                })))
            }

            function et(t, e, i) {
                const n = t.canvas,
                    o = n && (0, s.I)(n);
                if (!o) return;
                const a = (0, s.L)(((t, e) => {
                        const s = o.clientWidth;
                        i(t, e), s < o.clientWidth && i()
                    }), window),
                    r = new ResizeObserver((t => {
                        const e = t[0],
                            i = e.contentRect.width,
                            s = e.contentRect.height;
                        0 === i && 0 === s || a(i, s)
                    }));
                return r.observe(o),
                    function(t, e) {
                        J.size || window.addEventListener("resize", tt), J.set(t, e)
                    }(t, a), r
            }

            function it(t, e, i) {
                i && i.disconnect(), "resize" === e && function(t) {
                    J.delete(t), J.size || window.removeEventListener("resize", tt)
                }(t)
            }

            function st(t, e, i) {
                const n = t.canvas,
                    o = (0, s.L)((e => {
                        null !== t.ctx && i(function(t, e) {
                            const i = U[t.type] || t.type,
                                {
                                    x: n,
                                    y: o
                                } = (0, s.z)(t, e);
                            return {
                                type: i,
                                chart: e,
                                native: t,
                                x: void 0 !== n ? n : null,
                                y: void 0 !== o ? o : null
                            }
                        }(e, t))
                    }), t);
                return function(t, e, i) {
                    t.addEventListener(e, i, Q)
                }(n, e, o), o
            }
            class nt extends $ {
                acquireContext(t, e) {
                    const i = t && t.getContext && t.getContext("2d");
                    return i && i.canvas === t ? (function(t, e) {
                        const i = t.style,
                            n = t.getAttribute("height"),
                            o = t.getAttribute("width");
                        if (t.$chartjs = {
                                initial: {
                                    height: n,
                                    width: o,
                                    style: {
                                        display: i.display,
                                        height: i.height,
                                        width: i.width
                                    }
                                }
                            }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", Y(o)) {
                            const e = (0, s.J)(t, "width");
                            void 0 !== e && (t.width = e)
                        }
                        if (Y(n))
                            if ("" === t.style.height) t.height = t.width / (e || 2);
                            else {
                                const e = (0, s.J)(t, "height");
                                void 0 !== e && (t.height = e)
                            }
                    }(t, e), i) : null
                }
                releaseContext(t) {
                    const e = t.canvas;
                    if (!e.$chartjs) return !1;
                    const i = e.$chartjs.initial;
                    ["height", "width"].forEach((t => {
                        const n = i[t];
                        (0, s.k)(n) ? e.removeAttribute(t): e.setAttribute(t, n)
                    }));
                    const n = i.style || {};
                    return Object.keys(n).forEach((t => {
                        e.style[t] = n[t]
                    })), e.width = e.width, delete e.$chartjs, !0
                }
                addEventListener(t, e, i) {
                    this.removeEventListener(t, e);
                    const s = t.$proxies || (t.$proxies = {}),
                        n = {
                            attach: q,
                            detach: G,
                            resize: et
                        }[e] || st;
                    s[e] = n(t, e, i)
                }
                removeEventListener(t, e) {
                    const i = t.$proxies || (t.$proxies = {}),
                        s = i[e];
                    if (!s) return;
                    ({
                        attach: it,
                        detach: it,
                        resize: it
                    }[e] || X)(t, e, s), i[e] = void 0
                }
                getDevicePixelRatio() {
                    return window.devicePixelRatio
                }
                getMaximumSize(t, e, i, n) {
                    return (0, s.G)(t, e, i, n)
                }
                isAttached(t) {
                    const e = (0, s.I)(t);
                    return !(!e || !e.isConnected)
                }
            }
            class ot {
                static defaults = {};
                static defaultRoutes = void 0;
                x;
                y;
                active = !1;
                options;
                $animations;
                tooltipPosition(t) {
                    const {
                        x: e,
                        y: i
                    } = this.getProps(["x", "y"], t);
                    return {
                        x: e,
                        y: i
                    }
                }
                hasValue() {
                    return (0, s.x)(this.x) && (0, s.x)(this.y)
                }
                getProps(t, e) {
                    const i = this.$animations;
                    if (!e || !i) return this;
                    const s = {};
                    return t.forEach((t => {
                        s[t] = i[t] && i[t].active() ? i[t]._to : this[t]
                    })), s
                }
            }

            function at(t, e) {
                const i = t.options.ticks,
                    n = function(t) {
                        const e = t.options.offset,
                            i = t._tickSize(),
                            s = t._length / i + (e ? 0 : 1),
                            n = t._maxLength / i;
                        return Math.floor(Math.min(s, n))
                    }(t),
                    o = Math.min(i.maxTicksLimit || n, n),
                    a = i.major.enabled ? function(t) {
                        const e = [];
                        let i, s;
                        for (i = 0, s = t.length; i < s; i++) t[i].major && e.push(i);
                        return e
                    }(e) : [],
                    r = a.length,
                    h = a[0],
                    l = a[r - 1],
                    c = [];
                if (r > o) return function(t, e, i, s) {
                    let n, o = 0,
                        a = i[0];
                    for (s = Math.ceil(s), n = 0; n < t.length; n++) n === a && (e.push(t[n]), o++, a = i[o * s])
                }(e, c, a, r / o), c;
                const d = function(t, e, i) {
                    const n = function(t) {
                            const e = t.length;
                            let i, s;
                            if (e < 2) return !1;
                            for (s = t[0], i = 1; i < e; ++i)
                                if (t[i] - t[i - 1] !== s) return !1;
                            return s
                        }(t),
                        o = e.length / i;
                    if (!n) return Math.max(o, 1);
                    const a = (0, s.N)(n);
                    for (let s = 0, r = a.length - 1; s < r; s++) {
                        const t = a[s];
                        if (t > o) return t
                    }
                    return Math.max(o, 1)
                }(a, e, o);
                if (r > 0) {
                    let t, i;
                    const n = r > 1 ? Math.round((l - h) / (r - 1)) : null;
                    for (rt(e, c, d, (0, s.k)(n) ? 0 : h - n, h), t = 0, i = r - 1; t < i; t++) rt(e, c, d, a[t], a[t + 1]);
                    return rt(e, c, d, l, (0, s.k)(n) ? e.length : l + n), c
                }
                return rt(e, c, d), c
            }

            function rt(t, e, i, n, o) {
                const a = (0, s.v)(n, 0),
                    r = Math.min((0, s.v)(o, t.length), t.length);
                let h, l, c, d = 0;
                for (i = Math.ceil(i), o && (h = o - n, i = h / Math.floor(h / i)), c = a; c < 0;) d++, c = Math.round(a + d * i);
                for (l = Math.max(a, 0); l < r; l++) l === c && (e.push(t[l]), d++, c = Math.round(a + d * i))
            }
            const ht = (t, e, i) => "top" === e || "left" === e ? t[e] + i : t[e] - i,
                lt = (t, e) => Math.min(e || t, t);

            function ct(t, e) {
                const i = [],
                    s = t.length / e,
                    n = t.length;
                let o = 0;
                for (; o < n; o += s) i.push(t[Math.floor(o)]);
                return i
            }

            function dt(t, e, i) {
                const s = t.ticks.length,
                    n = Math.min(e, s - 1),
                    o = t._startPixel,
                    a = t._endPixel,
                    r = 1e-6;
                let h, l = t.getPixelForTick(n);
                if (!(i && (h = 1 === s ? Math.max(l - o, a - l) : 0 === e ? (t.getPixelForTick(1) - l) / 2 : (l - t.getPixelForTick(n - 1)) / 2, l += n < e ? h : -h, l < o - r || l > a + r))) return l
            }

            function ut(t) {
                return t.drawTicks ? t.tickLength : 0
            }

            function gt(t, e) {
                if (!t.display) return 0;
                const i = (0, s.a0)(t.font, e),
                    n = (0, s.E)(t.padding);
                return ((0, s.b)(t.text) ? t.text.length : 1) * i.lineHeight + n.height
            }

            function pt(t, e, i) {
                let n = (0, s.a1)(t);
                return (i && "right" !== e || !i && "right" === e) && (n = (t => "left" === t ? "right" : "right" === t ? "left" : t)(n)), n
            }
            class ft extends ot {
                constructor(t) {
                    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0
                }
                init(t) {
                    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax)
                }
                parse(t, e) {
                    return t
                }
                getUserBounds() {
                    let {
                        _userMin: t,
                        _userMax: e,
                        _suggestedMin: i,
                        _suggestedMax: n
                    } = this;
                    return t = (0, s.O)(t, Number.POSITIVE_INFINITY), e = (0, s.O)(e, Number.NEGATIVE_INFINITY), i = (0, s.O)(i, Number.POSITIVE_INFINITY), n = (0, s.O)(n, Number.NEGATIVE_INFINITY), {
                        min: (0, s.O)(t, i),
                        max: (0, s.O)(e, n),
                        minDefined: (0, s.g)(t),
                        maxDefined: (0, s.g)(e)
                    }
                }
                getMinMax(t) {
                    let e, {
                        min: i,
                        max: n,
                        minDefined: o,
                        maxDefined: a
                    } = this.getUserBounds();
                    if (o && a) return {
                        min: i,
                        max: n
                    };
                    const r = this.getMatchingVisibleMetas();
                    for (let s = 0, h = r.length; s < h; ++s) e = r[s].controller.getMinMax(this, t), o || (i = Math.min(i, e.min)), a || (n = Math.max(n, e.max));
                    return i = a && i > n ? n : i, n = o && i > n ? i : n, {
                        min: (0, s.O)(i, (0, s.O)(n, i)),
                        max: (0, s.O)(n, (0, s.O)(i, n))
                    }
                }
                getPadding() {
                    return {
                        left: this.paddingLeft || 0,
                        top: this.paddingTop || 0,
                        right: this.paddingRight || 0,
                        bottom: this.paddingBottom || 0
                    }
                }
                getTicks() {
                    return this.ticks
                }
                getLabels() {
                    const t = this.chart.data;
                    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || []
                }
                getLabelItems(t = this.chart.chartArea) {
                    return this._labelItems || (this._labelItems = this._computeLabelItems(t))
                }
                beforeLayout() {
                    this._cache = {}, this._dataLimitsCached = !1
                }
                beforeUpdate() {
                    (0, s.Q)(this.options.beforeUpdate, [this])
                }
                update(t, e, i) {
                    const {
                        beginAtZero: n,
                        grace: o,
                        ticks: a
                    } = this.options, r = a.sampleSize;
                    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = i = Object.assign({
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = (0, s.R)(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
                    const h = r < this.ticks.length;
                    this._convertTicksToLabels(h ? ct(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || "auto" === a.source) && (this.ticks = at(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), h && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate()
                }
                configure() {
                    let t, e, i = this.options.reverse;
                    this.isHorizontal() ? (t = this.left, e = this.right) : (t = this.top, e = this.bottom, i = !i), this._startPixel = t, this._endPixel = e, this._reversePixels = i, this._length = e - t, this._alignToPixels = this.options.alignToPixels
                }
                afterUpdate() {
                    (0, s.Q)(this.options.afterUpdate, [this])
                }
                beforeSetDimensions() {
                    (0, s.Q)(this.options.beforeSetDimensions, [this])
                }
                setDimensions() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0
                }
                afterSetDimensions() {
                    (0, s.Q)(this.options.afterSetDimensions, [this])
                }
                _callHooks(t) {
                    this.chart.notifyPlugins(t, this.getContext()), (0, s.Q)(this.options[t], [this])
                }
                beforeDataLimits() {
                    this._callHooks("beforeDataLimits")
                }
                determineDataLimits() {}
                afterDataLimits() {
                    this._callHooks("afterDataLimits")
                }
                beforeBuildTicks() {
                    this._callHooks("beforeBuildTicks")
                }
                buildTicks() {
                    return []
                }
                afterBuildTicks() {
                    this._callHooks("afterBuildTicks")
                }
                beforeTickToLabelConversion() {
                    (0, s.Q)(this.options.beforeTickToLabelConversion, [this])
                }
                generateTickLabels(t) {
                    const e = this.options.ticks;
                    let i, n, o;
                    for (i = 0, n = t.length; i < n; i++) o = t[i], o.label = (0, s.Q)(e.callback, [o.value, i, t], this)
                }
                afterTickToLabelConversion() {
                    (0, s.Q)(this.options.afterTickToLabelConversion, [this])
                }
                beforeCalculateLabelRotation() {
                    (0, s.Q)(this.options.beforeCalculateLabelRotation, [this])
                }
                calculateLabelRotation() {
                    const t = this.options,
                        e = t.ticks,
                        i = lt(this.ticks.length, t.ticks.maxTicksLimit),
                        n = e.minRotation || 0,
                        o = e.maxRotation;
                    let a, r, h, l = n;
                    if (!this._isVisible() || !e.display || n >= o || i <= 1 || !this.isHorizontal()) return void(this.labelRotation = n);
                    const c = this._getLabelSizes(),
                        d = c.widest.width,
                        u = c.highest.height,
                        g = (0, s.S)(this.chart.width - d, 0, this.maxWidth);
                    a = t.offset ? this.maxWidth / i : g / (i - 1), d + 6 > a && (a = g / (i - (t.offset ? .5 : 1)), r = this.maxHeight - ut(t.grid) - e.padding - gt(t.title, this.chart.options.font), h = Math.sqrt(d * d + u * u), l = (0, s.U)(Math.min(Math.asin((0, s.S)((c.highest.height + 6) / a, -1, 1)), Math.asin((0, s.S)(r / h, -1, 1)) - Math.asin((0, s.S)(u / h, -1, 1)))), l = Math.max(n, Math.min(o, l))), this.labelRotation = l
                }
                afterCalculateLabelRotation() {
                    (0, s.Q)(this.options.afterCalculateLabelRotation, [this])
                }
                afterAutoSkip() {}
                beforeFit() {
                    (0, s.Q)(this.options.beforeFit, [this])
                }
                fit() {
                    const t = {
                            width: 0,
                            height: 0
                        },
                        {
                            chart: e,
                            options: {
                                ticks: i,
                                title: n,
                                grid: o
                            }
                        } = this,
                        a = this._isVisible(),
                        r = this.isHorizontal();
                    if (a) {
                        const a = gt(n, e.options.font);
                        if (r ? (t.width = this.maxWidth, t.height = ut(o) + a) : (t.height = this.maxHeight, t.width = ut(o) + a), i.display && this.ticks.length) {
                            const {
                                first: e,
                                last: n,
                                widest: o,
                                highest: a
                            } = this._getLabelSizes(), h = 2 * i.padding, l = (0, s.t)(this.labelRotation), c = Math.cos(l), d = Math.sin(l);
                            if (r) {
                                const e = i.mirror ? 0 : d * o.width + c * a.height;
                                t.height = Math.min(this.maxHeight, t.height + e + h)
                            } else {
                                const e = i.mirror ? 0 : c * o.width + d * a.height;
                                t.width = Math.min(this.maxWidth, t.width + e + h)
                            }
                            this._calculatePadding(e, n, d, c)
                        }
                    }
                    this._handleMargins(), r ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom)
                }
                _calculatePadding(t, e, i, s) {
                    const {
                        ticks: {
                            align: n,
                            padding: o
                        },
                        position: a
                    } = this.options, r = 0 !== this.labelRotation, h = "top" !== a && "x" === this.axis;
                    if (this.isHorizontal()) {
                        const a = this.getPixelForTick(0) - this.left,
                            l = this.right - this.getPixelForTick(this.ticks.length - 1);
                        let c = 0,
                            d = 0;
                        r ? h ? (c = s * t.width, d = i * e.height) : (c = i * t.height, d = s * e.width) : "start" === n ? d = e.width : "end" === n ? c = t.width : "inner" !== n && (c = t.width / 2, d = e.width / 2), this.paddingLeft = Math.max((c - a + o) * this.width / (this.width - a), 0), this.paddingRight = Math.max((d - l + o) * this.width / (this.width - l), 0)
                    } else {
                        let i = e.height / 2,
                            s = t.height / 2;
                        "start" === n ? (i = 0, s = t.height) : "end" === n && (i = e.height, s = 0), this.paddingTop = i + o, this.paddingBottom = s + o
                    }
                }
                _handleMargins() {
                    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom))
                }
                afterFit() {
                    (0, s.Q)(this.options.afterFit, [this])
                }
                isHorizontal() {
                    const {
                        axis: t,
                        position: e
                    } = this.options;
                    return "top" === e || "bottom" === e || "x" === t
                }
                isFullSize() {
                    return this.options.fullSize
                }
                _convertTicksToLabels(t) {
                    let e, i;
                    for (this.beforeTickToLabelConversion(), this.generateTickLabels(t), e = 0, i = t.length; e < i; e++)(0, s.k)(t[e].label) && (t.splice(e, 1), i--, e--);
                    this.afterTickToLabelConversion()
                }
                _getLabelSizes() {
                    let t = this._labelSizes;
                    if (!t) {
                        const e = this.options.ticks.sampleSize;
                        let i = this.ticks;
                        e < i.length && (i = ct(i, e)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit)
                    }
                    return t
                }
                _computeLabelSizes(t, e, i) {
                    const {
                        ctx: n,
                        _longestTextCache: o
                    } = this, a = [], r = [], h = Math.floor(e / lt(e, i));
                    let l, c, d, u, g, p, f, m, x, _, b, v = 0,
                        y = 0;
                    for (l = 0; l < e; l += h) {
                        if (u = t[l].label, g = this._resolveTickFontOptions(l), n.font = p = g.string, f = o[p] = o[p] || {
                                data: {},
                                gc: []
                            }, m = g.lineHeight, x = _ = 0, (0, s.k)(u) || (0, s.b)(u)) {
                            if ((0, s.b)(u))
                                for (c = 0, d = u.length; c < d; ++c) b = u[c], (0, s.k)(b) || (0, s.b)(b) || (x = (0, s.V)(n, f.data, f.gc, x, b), _ += m)
                        } else x = (0, s.V)(n, f.data, f.gc, x, u), _ = m;
                        a.push(x), r.push(_), v = Math.max(x, v), y = Math.max(_, y)
                    }! function(t, e) {
                        (0, s.F)(t, (t => {
                            const i = t.gc,
                                s = i.length / 2;
                            let n;
                            if (s > e) {
                                for (n = 0; n < s; ++n) delete t.data[i[n]];
                                i.splice(0, s)
                            }
                        }))
                    }(o, e);
                    const w = a.indexOf(v),
                        k = r.indexOf(y),
                        M = t => ({
                            width: a[t] || 0,
                            height: r[t] || 0
                        });
                    return {
                        first: M(0),
                        last: M(e - 1),
                        widest: M(w),
                        highest: M(k),
                        widths: a,
                        heights: r
                    }
                }
                getLabelForValue(t) {
                    return t
                }
                getPixelForValue(t, e) {
                    return NaN
                }
                getValueForPixel(t) {}
                getPixelForTick(t) {
                    const e = this.ticks;
                    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value)
                }
                getPixelForDecimal(t) {
                    this._reversePixels && (t = 1 - t);
                    const e = this._startPixel + t * this._length;
                    return (0, s.W)(this._alignToPixels ? (0, s.X)(this.chart, e, 0) : e)
                }
                getDecimalForPixel(t) {
                    const e = (t - this._startPixel) / this._length;
                    return this._reversePixels ? 1 - e : e
                }
                getBasePixel() {
                    return this.getPixelForValue(this.getBaseValue())
                }
                getBaseValue() {
                    const {
                        min: t,
                        max: e
                    } = this;
                    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
                }
                getContext(t) {
                    const e = this.ticks || [];
                    if (t >= 0 && t < e.length) {
                        const i = e[t];
                        return i.$context || (i.$context = function(t, e, i) {
                            return (0, s.j)(t, {
                                tick: i,
                                index: e,
                                type: "tick"
                            })
                        }(this.getContext(), t, i))
                    }
                    return this.$context || (this.$context = (i = this.chart.getContext(), n = this, (0, s.j)(i, {
                        scale: n,
                        type: "scale"
                    })));
                    var i, n
                }
                _tickSize() {
                    const t = this.options.ticks,
                        e = (0, s.t)(this.labelRotation),
                        i = Math.abs(Math.cos(e)),
                        n = Math.abs(Math.sin(e)),
                        o = this._getLabelSizes(),
                        a = t.autoSkipPadding || 0,
                        r = o ? o.widest.width + a : 0,
                        h = o ? o.highest.height + a : 0;
                    return this.isHorizontal() ? h * i > r * n ? r / i : h / n : h * n < r * i ? h / i : r / n
                }
                _isVisible() {
                    const t = this.options.display;
                    return "auto" !== t ? !!t : this.getMatchingVisibleMetas().length > 0
                }
                _computeGridLineItems(t) {
                    const e = this.axis,
                        i = this.chart,
                        n = this.options,
                        {
                            grid: o,
                            position: a,
                            border: r
                        } = n,
                        h = o.offset,
                        l = this.isHorizontal(),
                        c = this.ticks.length + (h ? 1 : 0),
                        d = ut(o),
                        u = [],
                        g = r.setContext(this.getContext()),
                        p = g.display ? g.width : 0,
                        f = p / 2,
                        m = function(t) {
                            return (0, s.X)(i, t, p)
                        };
                    let x, _, b, v, y, w, k, M, S, D, C, A;
                    if ("top" === a) x = m(this.bottom), w = this.bottom - d, M = x - f, D = m(t.top) + f, A = t.bottom;
                    else if ("bottom" === a) x = m(this.top), D = t.top, A = m(t.bottom) - f, w = x + f, M = this.top + d;
                    else if ("left" === a) x = m(this.right), y = this.right - d, k = x - f, S = m(t.left) + f, C = t.right;
                    else if ("right" === a) x = m(this.left), S = t.left, C = m(t.right) - f, y = x + f, k = this.left + d;
                    else if ("x" === e) {
                        if ("center" === a) x = m((t.top + t.bottom) / 2 + .5);
                        else if ((0, s.i)(a)) {
                            const t = Object.keys(a)[0],
                                e = a[t];
                            x = m(this.chart.scales[t].getPixelForValue(e))
                        }
                        D = t.top, A = t.bottom, w = x + f, M = w + d
                    } else if ("y" === e) {
                        if ("center" === a) x = m((t.left + t.right) / 2);
                        else if ((0, s.i)(a)) {
                            const t = Object.keys(a)[0],
                                e = a[t];
                            x = m(this.chart.scales[t].getPixelForValue(e))
                        }
                        y = x - f, k = y - d, S = t.left, C = t.right
                    }
                    const P = (0, s.v)(n.ticks.maxTicksLimit, c),
                        O = Math.max(1, Math.ceil(c / P));
                    for (_ = 0; _ < c; _ += O) {
                        const t = this.getContext(_),
                            e = o.setContext(t),
                            n = r.setContext(t),
                            a = e.lineWidth,
                            c = e.color,
                            d = n.dash || [],
                            g = n.dashOffset,
                            p = e.tickWidth,
                            f = e.tickColor,
                            m = e.tickBorderDash || [],
                            x = e.tickBorderDashOffset;
                        b = dt(this, _, h), void 0 !== b && (v = (0, s.X)(i, b, a), l ? y = k = S = C = v : w = M = D = A = v, u.push({
                            tx1: y,
                            ty1: w,
                            tx2: k,
                            ty2: M,
                            x1: S,
                            y1: D,
                            x2: C,
                            y2: A,
                            width: a,
                            color: c,
                            borderDash: d,
                            borderDashOffset: g,
                            tickWidth: p,
                            tickColor: f,
                            tickBorderDash: m,
                            tickBorderDashOffset: x
                        }))
                    }
                    return this._ticksLength = c, this._borderValue = x, u
                }
                _computeLabelItems(t) {
                    const e = this.axis,
                        i = this.options,
                        {
                            position: n,
                            ticks: o
                        } = i,
                        a = this.isHorizontal(),
                        r = this.ticks,
                        {
                            align: h,
                            crossAlign: l,
                            padding: c,
                            mirror: d
                        } = o,
                        u = ut(i.grid),
                        g = u + c,
                        p = d ? -c : g,
                        f = -(0, s.t)(this.labelRotation),
                        m = [];
                    let x, _, b, v, y, w, k, M, S, D, C, A, P = "middle";
                    if ("top" === n) w = this.bottom - p, k = this._getXAxisLabelAlignment();
                    else if ("bottom" === n) w = this.top + p, k = this._getXAxisLabelAlignment();
                    else if ("left" === n) {
                        const t = this._getYAxisLabelAlignment(u);
                        k = t.textAlign, y = t.x
                    } else if ("right" === n) {
                        const t = this._getYAxisLabelAlignment(u);
                        k = t.textAlign, y = t.x
                    } else if ("x" === e) {
                        if ("center" === n) w = (t.top + t.bottom) / 2 + g;
                        else if ((0, s.i)(n)) {
                            const t = Object.keys(n)[0],
                                e = n[t];
                            w = this.chart.scales[t].getPixelForValue(e) + g
                        }
                        k = this._getXAxisLabelAlignment()
                    } else if ("y" === e) {
                        if ("center" === n) y = (t.left + t.right) / 2 - g;
                        else if ((0, s.i)(n)) {
                            const t = Object.keys(n)[0],
                                e = n[t];
                            y = this.chart.scales[t].getPixelForValue(e)
                        }
                        k = this._getYAxisLabelAlignment(u).textAlign
                    }
                    "y" === e && ("start" === h ? P = "top" : "end" === h && (P = "bottom"));
                    const O = this._getLabelSizes();
                    for (x = 0, _ = r.length; x < _; ++x) {
                        b = r[x], v = b.label;
                        const t = o.setContext(this.getContext(x));
                        M = this.getPixelForTick(x) + o.labelOffset, S = this._resolveTickFontOptions(x), D = S.lineHeight, C = (0, s.b)(v) ? v.length : 1;
                        const e = C / 2,
                            i = t.color,
                            h = t.textStrokeColor,
                            c = t.textStrokeWidth;
                        let u, g = k;
                        if (a ? (y = M, "inner" === k && (g = x === _ - 1 ? this.options.reverse ? "left" : "right" : 0 === x ? this.options.reverse ? "right" : "left" : "center"), A = "top" === n ? "near" === l || 0 !== f ? -C * D + D / 2 : "center" === l ? -O.highest.height / 2 - e * D + D : -O.highest.height + D / 2 : "near" === l || 0 !== f ? D / 2 : "center" === l ? O.highest.height / 2 - e * D : O.highest.height - C * D, d && (A *= -1), 0 === f || t.showLabelBackdrop || (y += D / 2 * Math.sin(f))) : (w = M, A = (1 - C) * D / 2), t.showLabelBackdrop) {
                            const e = (0, s.E)(t.backdropPadding),
                                i = O.heights[x],
                                n = O.widths[x];
                            let o = A - e.top,
                                a = 0 - e.left;
                            switch (P) {
                                case "middle":
                                    o -= i / 2;
                                    break;
                                case "bottom":
                                    o -= i
                            }
                            switch (k) {
                                case "center":
                                    a -= n / 2;
                                    break;
                                case "right":
                                    a -= n
                            }
                            u = {
                                left: a,
                                top: o,
                                width: n + e.width,
                                height: i + e.height,
                                color: t.backdropColor
                            }
                        }
                        m.push({
                            label: v,
                            font: S,
                            textOffset: A,
                            options: {
                                rotation: f,
                                color: i,
                                strokeColor: h,
                                strokeWidth: c,
                                textAlign: g,
                                textBaseline: P,
                                translation: [y, w],
                                backdrop: u
                            }
                        })
                    }
                    return m
                }
                _getXAxisLabelAlignment() {
                    const {
                        position: t,
                        ticks: e
                    } = this.options;
                    if (-(0, s.t)(this.labelRotation)) return "top" === t ? "left" : "right";
                    let i = "center";
                    return "start" === e.align ? i = "left" : "end" === e.align ? i = "right" : "inner" === e.align && (i = "inner"), i
                }
                _getYAxisLabelAlignment(t) {
                    const {
                        position: e,
                        ticks: {
                            crossAlign: i,
                            mirror: s,
                            padding: n
                        }
                    } = this.options, o = t + n, a = this._getLabelSizes().widest.width;
                    let r, h;
                    return "left" === e ? s ? (h = this.right + n, "near" === i ? r = "left" : "center" === i ? (r = "center", h += a / 2) : (r = "right", h += a)) : (h = this.right - o, "near" === i ? r = "right" : "center" === i ? (r = "center", h -= a / 2) : (r = "left", h = this.left)) : "right" === e ? s ? (h = this.left + n, "near" === i ? r = "right" : "center" === i ? (r = "center", h -= a / 2) : (r = "left", h -= a)) : (h = this.left + o, "near" === i ? r = "left" : "center" === i ? (r = "center", h += a / 2) : (r = "right", h = this.right)) : r = "right", {
                        textAlign: r,
                        x: h
                    }
                }
                _computeLabelArea() {
                    if (this.options.ticks.mirror) return;
                    const t = this.chart,
                        e = this.options.position;
                    return "left" === e || "right" === e ? {
                        top: 0,
                        left: this.left,
                        bottom: t.height,
                        right: this.right
                    } : "top" === e || "bottom" === e ? {
                        top: this.top,
                        left: 0,
                        bottom: this.bottom,
                        right: t.width
                    } : void 0
                }
                drawBackground() {
                    const {
                        ctx: t,
                        options: {
                            backgroundColor: e
                        },
                        left: i,
                        top: s,
                        width: n,
                        height: o
                    } = this;
                    e && (t.save(), t.fillStyle = e, t.fillRect(i, s, n, o), t.restore())
                }
                getLineWidthForValue(t) {
                    const e = this.options.grid;
                    if (!this._isVisible() || !e.display) return 0;
                    const i = this.ticks.findIndex((e => e.value === t));
                    if (i >= 0) {
                        return e.setContext(this.getContext(i)).lineWidth
                    }
                    return 0
                }
                drawGrid(t) {
                    const e = this.options.grid,
                        i = this.ctx,
                        s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
                    let n, o;
                    const a = (t, e, s) => {
                        s.width && s.color && (i.save(), i.lineWidth = s.width, i.strokeStyle = s.color, i.setLineDash(s.borderDash || []), i.lineDashOffset = s.borderDashOffset, i.beginPath(), i.moveTo(t.x, t.y), i.lineTo(e.x, e.y), i.stroke(), i.restore())
                    };
                    if (e.display)
                        for (n = 0, o = s.length; n < o; ++n) {
                            const t = s[n];
                            e.drawOnChartArea && a({
                                x: t.x1,
                                y: t.y1
                            }, {
                                x: t.x2,
                                y: t.y2
                            }, t), e.drawTicks && a({
                                x: t.tx1,
                                y: t.ty1
                            }, {
                                x: t.tx2,
                                y: t.ty2
                            }, {
                                color: t.tickColor,
                                width: t.tickWidth,
                                borderDash: t.tickBorderDash,
                                borderDashOffset: t.tickBorderDashOffset
                            })
                        }
                }
                drawBorder() {
                    const {
                        chart: t,
                        ctx: e,
                        options: {
                            border: i,
                            grid: n
                        }
                    } = this, o = i.setContext(this.getContext()), a = i.display ? o.width : 0;
                    if (!a) return;
                    const r = n.setContext(this.getContext(0)).lineWidth,
                        h = this._borderValue;
                    let l, c, d, u;
                    this.isHorizontal() ? (l = (0, s.X)(t, this.left, a) - a / 2, c = (0, s.X)(t, this.right, r) + r / 2, d = u = h) : (d = (0, s.X)(t, this.top, a) - a / 2, u = (0, s.X)(t, this.bottom, r) + r / 2, l = c = h), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(l, d), e.lineTo(c, u), e.stroke(), e.restore()
                }
                drawLabels(t) {
                    if (!this.options.ticks.display) return;
                    const e = this.ctx,
                        i = this._computeLabelArea();
                    i && (0, s.Y)(e, i);
                    const n = this.getLabelItems(t);
                    for (const o of n) {
                        const t = o.options,
                            i = o.font,
                            n = o.label,
                            a = o.textOffset;
                        (0, s.Z)(e, n, 0, a, i, t)
                    }
                    i && (0, s.$)(e)
                }
                drawTitle() {
                    const {
                        ctx: t,
                        options: {
                            position: e,
                            title: i,
                            reverse: n
                        }
                    } = this;
                    if (!i.display) return;
                    const o = (0, s.a0)(i.font),
                        a = (0, s.E)(i.padding),
                        r = i.align;
                    let h = o.lineHeight / 2;
                    "bottom" === e || "center" === e || (0, s.i)(e) ? (h += a.bottom, (0, s.b)(i.text) && (h += o.lineHeight * (i.text.length - 1))) : h += a.top;
                    const {
                        titleX: l,
                        titleY: c,
                        maxWidth: d,
                        rotation: u
                    } = function(t, e, i, n) {
                        const {
                            top: o,
                            left: a,
                            bottom: r,
                            right: h,
                            chart: l
                        } = t, {
                            chartArea: c,
                            scales: d
                        } = l;
                        let u, g, p, f = 0;
                        const m = r - o,
                            x = h - a;
                        if (t.isHorizontal()) {
                            if (g = (0, s.a2)(n, a, h), (0, s.i)(i)) {
                                const t = Object.keys(i)[0],
                                    s = i[t];
                                p = d[t].getPixelForValue(s) + m - e
                            } else p = "center" === i ? (c.bottom + c.top) / 2 + m - e : ht(t, i, e);
                            u = h - a
                        } else {
                            if ((0, s.i)(i)) {
                                const t = Object.keys(i)[0],
                                    s = i[t];
                                g = d[t].getPixelForValue(s) - x + e
                            } else g = "center" === i ? (c.left + c.right) / 2 - x + e : ht(t, i, e);
                            p = (0, s.a2)(n, r, o), f = "left" === i ? -s.H : s.H
                        }
                        return {
                            titleX: g,
                            titleY: p,
                            maxWidth: u,
                            rotation: f
                        }
                    }(this, h, e, r);
                    (0, s.Z)(t, i.text, 0, 0, o, {
                        color: i.color,
                        maxWidth: d,
                        rotation: u,
                        textAlign: pt(r, e, n),
                        textBaseline: "middle",
                        translation: [l, c]
                    })
                }
                draw(t) {
                    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t))
                }
                _layers() {
                    const t = this.options,
                        e = t.ticks && t.ticks.z || 0,
                        i = (0, s.v)(t.grid && t.grid.z, -1),
                        n = (0, s.v)(t.border && t.border.z, 0);
                    return this._isVisible() && this.draw === ft.prototype.draw ? [{
                        z: i,
                        draw: t => {
                            this.drawBackground(), this.drawGrid(t), this.drawTitle()
                        }
                    }, {
                        z: n,
                        draw: () => {
                            this.drawBorder()
                        }
                    }, {
                        z: e,
                        draw: t => {
                            this.drawLabels(t)
                        }
                    }] : [{
                        z: e,
                        draw: t => {
                            this.draw(t)
                        }
                    }]
                }
                getMatchingVisibleMetas(t) {
                    const e = this.chart.getSortedVisibleDatasetMetas(),
                        i = this.axis + "AxisID",
                        s = [];
                    let n, o;
                    for (n = 0, o = e.length; n < o; ++n) {
                        const o = e[n];
                        o[i] !== this.id || t && o.type !== t || s.push(o)
                    }
                    return s
                }
                _resolveTickFontOptions(t) {
                    const e = this.options.ticks.setContext(this.getContext(t));
                    return (0, s.a0)(e.font)
                }
                _maxDigits() {
                    const t = this._resolveTickFontOptions(0).lineHeight;
                    return (this.isHorizontal() ? this.width : this.height) / t
                }
            }
            class mt {
                constructor(t, e, i) {
                    this.type = t, this.scope = e, this.override = i, this.items = Object.create(null)
                }
                isForType(t) {
                    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype)
                }
                register(t) {
                    const e = Object.getPrototypeOf(t);
                    let i;
                    (function(t) {
                        return "id" in t && "defaults" in t
                    })(e) && (i = this.register(e));
                    const n = this.items,
                        o = t.id,
                        a = this.scope + "." + o;
                    if (!o) throw new Error("class does not have id: " + t);
                    return o in n || (n[o] = t, function(t, e, i) {
                        const n = (0, s.a4)(Object.create(null), [i ? s.d.get(i) : {}, s.d.get(e), t.defaults]);
                        s.d.set(e, n), t.defaultRoutes && function(t, e) {
                            Object.keys(e).forEach((i => {
                                const n = i.split("."),
                                    o = n.pop(),
                                    a = [t].concat(n).join("."),
                                    r = e[i].split("."),
                                    h = r.pop(),
                                    l = r.join(".");
                                s.d.route(a, o, l, h)
                            }))
                        }(e, t.defaultRoutes);
                        t.descriptors && s.d.describe(e, t.descriptors)
                    }(t, a, i), this.override && s.d.override(t.id, t.overrides)), a
                }
                get(t) {
                    return this.items[t]
                }
                unregister(t) {
                    const e = this.items,
                        i = t.id,
                        n = this.scope;
                    i in e && delete e[i], n && i in s.d[n] && (delete s.d[n][i], this.override && delete s.a3[i])
                }
            }
            class xt {
                constructor() {
                    this.controllers = new mt(y, "datasets", !0), this.elements = new mt(ot, "elements"), this.plugins = new mt(Object, "plugins"), this.scales = new mt(ft, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements]
                }
                add(...t) {
                    this._each("register", t)
                }
                remove(...t) {
                    this._each("unregister", t)
                }
                addControllers(...t) {
                    this._each("register", t, this.controllers)
                }
                addElements(...t) {
                    this._each("register", t, this.elements)
                }
                addPlugins(...t) {
                    this._each("register", t, this.plugins)
                }
                addScales(...t) {
                    this._each("register", t, this.scales)
                }
                getController(t) {
                    return this._get(t, this.controllers, "controller")
                }
                getElement(t) {
                    return this._get(t, this.elements, "element")
                }
                getPlugin(t) {
                    return this._get(t, this.plugins, "plugin")
                }
                getScale(t) {
                    return this._get(t, this.scales, "scale")
                }
                removeControllers(...t) {
                    this._each("unregister", t, this.controllers)
                }
                removeElements(...t) {
                    this._each("unregister", t, this.elements)
                }
                removePlugins(...t) {
                    this._each("unregister", t, this.plugins)
                }
                removeScales(...t) {
                    this._each("unregister", t, this.scales)
                }
                _each(t, e, i) {
                    [...e].forEach((e => {
                        const n = i || this._getRegistryForType(e);
                        i || n.isForType(e) || n === this.plugins && e.id ? this._exec(t, n, e) : (0, s.F)(e, (e => {
                            const s = i || this._getRegistryForType(e);
                            this._exec(t, s, e)
                        }))
                    }))
                }
                _exec(t, e, i) {
                    const n = (0, s.a5)(t);
                    (0, s.Q)(i["before" + n], [], i), e[t](i), (0, s.Q)(i["after" + n], [], i)
                }
                _getRegistryForType(t) {
                    for (let e = 0; e < this._typedRegistries.length; e++) {
                        const i = this._typedRegistries[e];
                        if (i.isForType(t)) return i
                    }
                    return this.plugins
                }
                _get(t, e, i) {
                    const s = e.get(t);
                    if (void 0 === s) throw new Error('"' + t + '" is not a registered ' + i + ".");
                    return s
                }
            }
            var _t = new xt;
            class bt {
                constructor() {
                    this._init = []
                }
                notify(t, e, i, s) {
                    "beforeInit" === e && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
                    const n = s ? this._descriptors(t).filter(s) : this._descriptors(t),
                        o = this._notify(n, t, e, i);
                    return "afterDestroy" === e && (this._notify(n, t, "stop"), this._notify(this._init, t, "uninstall")), o
                }
                _notify(t, e, i, n) {
                    n = n || {};
                    for (const o of t) {
                        const t = o.plugin,
                            a = t[i],
                            r = [e, n, o.options];
                        if (!1 === (0, s.Q)(a, r, t) && n.cancelable) return !1
                    }
                    return !0
                }
                invalidate() {
                    (0, s.k)(this._cache) || (this._oldCache = this._cache, this._cache = void 0)
                }
                _descriptors(t) {
                    if (this._cache) return this._cache;
                    const e = this._cache = this._createDescriptors(t);
                    return this._notifyStateChanges(t), e
                }
                _createDescriptors(t, e) {
                    const i = t && t.config,
                        n = (0, s.v)(i.options && i.options.plugins, {}),
                        o = function(t) {
                            const e = {},
                                i = [],
                                s = Object.keys(_t.plugins.items);
                            for (let o = 0; o < s.length; o++) i.push(_t.getPlugin(s[o]));
                            const n = t.plugins || [];
                            for (let o = 0; o < n.length; o++) {
                                const t = n[o]; - 1 === i.indexOf(t) && (i.push(t), e[t.id] = !0)
                            }
                            return {
                                plugins: i,
                                localIds: e
                            }
                        }(i);
                    return !1 !== n || e ? function(t, {
                        plugins: e,
                        localIds: i
                    }, s, n) {
                        const o = [],
                            a = t.getContext();
                        for (const r of e) {
                            const e = r.id,
                                h = vt(s[e], n);
                            null !== h && o.push({
                                plugin: r,
                                options: yt(t.config, {
                                    plugin: r,
                                    local: i[e]
                                }, h, a)
                            })
                        }
                        return o
                    }(t, o, n, e) : []
                }
                _notifyStateChanges(t) {
                    const e = this._oldCache || [],
                        i = this._cache,
                        s = (t, e) => t.filter((t => !e.some((e => t.plugin.id === e.plugin.id))));
                    this._notify(s(e, i), t, "stop"), this._notify(s(i, e), t, "start")
                }
            }

            function vt(t, e) {
                return e || !1 !== t ? !0 === t ? {} : t : null
            }

            function yt(t, {
                plugin: e,
                local: i
            }, s, n) {
                const o = t.pluginScopeKeys(e),
                    a = t.getOptionScopes(s, o);
                return i && e.defaults && a.push(e.defaults), t.createResolver(a, n, [""], {
                    scriptable: !1,
                    indexable: !1,
                    allKeys: !0
                })
            }

            function wt(t, e) {
                const i = s.d.datasets[t] || {};
                return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x"
            }

            function kt(t) {
                if ("x" === t || "y" === t || "r" === t) return t
            }

            function Mt(t, ...e) {
                if (kt(t)) return t;
                for (const s of e) {
                    const e = s.axis || ("top" === (i = s.position) || "bottom" === i ? "x" : "left" === i || "right" === i ? "y" : void 0) || t.length > 1 && kt(t[0].toLowerCase());
                    if (e) return e
                }
                var i;
                throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`)
            }

            function St(t, e, i) {
                if (i[e + "AxisID"] === t) return {
                    axis: e
                }
            }

            function Dt(t, e) {
                const i = s.a3[t.type] || {
                        scales: {}
                    },
                    n = e.scales || {},
                    o = wt(t.type, e),
                    a = Object.create(null);
                return Object.keys(n).forEach((e => {
                    const r = n[e];
                    if (!(0, s.i)(r)) return console.error(`Invalid scale configuration for scale: ${e}`);
                    if (r._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${e}`);
                    const h = Mt(e, r, function(t, e) {
                            if (e.data && e.data.datasets) {
                                const i = e.data.datasets.filter((e => e.xAxisID === t || e.yAxisID === t));
                                if (i.length) return St(t, "x", i[0]) || St(t, "y", i[0])
                            }
                            return {}
                        }(e, t), s.d.scales[r.type]),
                        l = function(t, e) {
                            return t === e ? "_index_" : "_value_"
                        }(h, o),
                        c = i.scales || {};
                    a[e] = (0, s.ab)(Object.create(null), [{
                        axis: h
                    }, r, c[h], c[l]])
                })), t.data.datasets.forEach((i => {
                    const o = i.type || t.type,
                        r = i.indexAxis || wt(o, e),
                        h = (s.a3[o] || {}).scales || {};
                    Object.keys(h).forEach((t => {
                        const e = function(t, e) {
                                let i = t;
                                return "_index_" === t ? i = e : "_value_" === t && (i = "x" === e ? "y" : "x"), i
                            }(t, r),
                            o = i[e + "AxisID"] || e;
                        a[o] = a[o] || Object.create(null), (0, s.ab)(a[o], [{
                            axis: e
                        }, n[o], h[t]])
                    }))
                })), Object.keys(a).forEach((t => {
                    const e = a[t];
                    (0, s.ab)(e, [s.d.scales[e.type], s.d.scale])
                })), a
            }

            function Ct(t) {
                const e = t.options || (t.options = {});
                e.plugins = (0, s.v)(e.plugins, {}), e.scales = Dt(t, e)
            }

            function At(t) {
                return (t = t || {}).datasets = t.datasets || [], t.labels = t.labels || [], t
            }
            const Pt = new Map,
                Ot = new Set;

            function Et(t, e) {
                let i = Pt.get(t);
                return i || (i = e(), Pt.set(t, i), Ot.add(i)), i
            }
            const It = (t, e, i) => {
                const n = (0, s.f)(e, i);
                void 0 !== n && t.add(n)
            };
            class Lt {
                constructor(t) {
                    this._config = function(t) {
                        return (t = t || {}).data = At(t.data), Ct(t), t
                    }(t), this._scopeCache = new Map, this._resolverCache = new Map
                }
                get platform() {
                    return this._config.platform
                }
                get type() {
                    return this._config.type
                }
                set type(t) {
                    this._config.type = t
                }
                get data() {
                    return this._config.data
                }
                set data(t) {
                    this._config.data = At(t)
                }
                get options() {
                    return this._config.options
                }
                set options(t) {
                    this._config.options = t
                }
                get plugins() {
                    return this._config.plugins
                }
                update() {
                    const t = this._config;
                    this.clearCache(), Ct(t)
                }
                clearCache() {
                    this._scopeCache.clear(), this._resolverCache.clear()
                }
                datasetScopeKeys(t) {
                    return Et(t, (() => [
                        [`datasets.${t}`, ""]
                    ]))
                }
                datasetAnimationScopeKeys(t, e) {
                    return Et(`${t}.transition.${e}`, (() => [
                        [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
                        [`datasets.${t}`, ""]
                    ]))
                }
                datasetElementScopeKeys(t, e) {
                    return Et(`${t}-${e}`, (() => [
                        [`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, ""]
                    ]))
                }
                pluginScopeKeys(t) {
                    const e = t.id;
                    return Et(`${this.type}-plugin-${e}`, (() => [
                        [`plugins.${e}`, ...t.additionalOptionScopes || []]
                    ]))
                }
                _cachedScopes(t, e) {
                    const i = this._scopeCache;
                    let s = i.get(t);
                    return s && !e || (s = new Map, i.set(t, s)), s
                }
                getOptionScopes(t, e, i) {
                    const {
                        options: n,
                        type: o
                    } = this, a = this._cachedScopes(t, i), r = a.get(e);
                    if (r) return r;
                    const h = new Set;
                    e.forEach((e => {
                        t && (h.add(t), e.forEach((e => It(h, t, e)))), e.forEach((t => It(h, n, t))), e.forEach((t => It(h, s.a3[o] || {}, t))), e.forEach((t => It(h, s.d, t))), e.forEach((t => It(h, s.a6, t)))
                    }));
                    const l = Array.from(h);
                    return 0 === l.length && l.push(Object.create(null)), Ot.has(e) && a.set(e, l), l
                }
                chartOptionScopes() {
                    const {
                        options: t,
                        type: e
                    } = this;
                    return [t, s.a3[e] || {}, s.d.datasets[e] || {}, {
                        type: e
                    }, s.d, s.a6]
                }
                resolveNamedOptions(t, e, i, n = [""]) {
                    const o = {
                            $shared: !0
                        },
                        {
                            resolver: a,
                            subPrefixes: r
                        } = Tt(this._resolverCache, t, n);
                    let h = a;
                    if (function(t, e) {
                            const {
                                isScriptable: i,
                                isIndexable: n
                            } = (0, s.aa)(t);
                            for (const o of e) {
                                const e = i(o),
                                    a = n(o),
                                    r = (a || e) && t[o];
                                if (e && ((0, s.a7)(r) || zt(r)) || a && (0, s.b)(r)) return !0
                            }
                            return !1
                        }(a, e)) {
                        o.$shared = !1, i = (0, s.a7)(i) ? i() : i;
                        const e = this.createResolver(t, i, r);
                        h = (0, s.a8)(a, i, e)
                    }
                    for (const s of e) o[s] = h[s];
                    return o
                }
                createResolver(t, e, i = [""], n) {
                    const {
                        resolver: o
                    } = Tt(this._resolverCache, t, i);
                    return (0, s.i)(e) ? (0, s.a8)(o, e, void 0, n) : o
                }
            }

            function Tt(t, e, i) {
                let n = t.get(e);
                n || (n = new Map, t.set(e, n));
                const o = i.join();
                let a = n.get(o);
                if (!a) {
                    a = {
                        resolver: (0, s.a9)(e, i),
                        subPrefixes: i.filter((t => !t.toLowerCase().includes("hover")))
                    }, n.set(o, a)
                }
                return a
            }
            const zt = t => (0, s.i)(t) && Object.getOwnPropertyNames(t).reduce(((e, i) => e || (0, s.a7)(t[i])), !1);
            const Ft = ["top", "bottom", "left", "right", "chartArea"];

            function Rt(t, e) {
                return "top" === t || "bottom" === t || -1 === Ft.indexOf(t) && "x" === e
            }

            function Ht(t, e) {
                return function(i, s) {
                    return i[t] === s[t] ? i[e] - s[e] : i[t] - s[t]
                }
            }

            function Bt(t) {
                const e = t.chart,
                    i = e.options.animation;
                e.notifyPlugins("afterRender"), (0, s.Q)(i && i.onComplete, [t], e)
            }

            function Wt(t) {
                const e = t.chart,
                    i = e.options.animation;
                (0, s.Q)(i && i.onProgress, [t], e)
            }

            function Vt(t) {
                return (0, s.M)() && "string" === typeof t ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t
            }
            const jt = {},
                $t = t => {
                    const e = Vt(t);
                    return Object.values(jt).filter((t => t.canvas === e)).pop()
                };

            function Nt(t, e, i) {
                const s = Object.keys(t);
                for (const n of s) {
                    const s = +n;
                    if (s >= e) {
                        const o = t[n];
                        delete t[n], (i > 0 || s > e) && (t[s + i] = o)
                    }
                }
            }

            function Ut(t, e, i) {
                return t.options.clip ? t[i] : e[i]
            }
            class Yt {
                static defaults = s.d;
                static instances = jt;
                static overrides = s.a3;
                static registry = _t;
                static version = "4.4.0";
                static getChart = $t;
                static register(...t) {
                    _t.add(...t), Qt()
                }
                static unregister(...t) {
                    _t.remove(...t), Qt()
                }
                constructor(t, e) {
                    const i = this.config = new Lt(e),
                        n = Vt(t),
                        a = $t(n);
                    if (a) throw new Error("Canvas is already in use. Chart with ID '" + a.id + "' must be destroyed before the canvas with ID '" + a.canvas.id + "' can be reused.");
                    const r = i.createResolver(i.chartOptionScopes(), this.getContext());
                    this.platform = new(i.platform || function(t) {
                        return !(0, s.M)() || "undefined" !== typeof OffscreenCanvas && t instanceof OffscreenCanvas ? N : nt
                    }(n)), this.platform.updateConfig(i);
                    const h = this.platform.acquireContext(n, r.aspectRatio),
                        l = h && h.canvas,
                        c = l && l.height,
                        d = l && l.width;
                    this.id = (0, s.ac)(), this.ctx = h, this.canvas = l, this.width = d, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new bt, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = (0, s.ad)((t => this.update(t)), r.resizeDelay || 0), this._dataChanges = [], jt[this.id] = this, h && l ? (o.listen(this, "complete", Bt), o.listen(this, "progress", Wt), this._initialize(), this.attached && this.update()) : console.error("Failed to create chart: can't acquire context from the given item")
                }
                get aspectRatio() {
                    const {
                        options: {
                            aspectRatio: t,
                            maintainAspectRatio: e
                        },
                        width: i,
                        height: n,
                        _aspectRatio: o
                    } = this;
                    return (0, s.k)(t) ? e && o ? o : n ? i / n : null : t
                }
                get data() {
                    return this.config.data
                }
                set data(t) {
                    this.config.data = t
                }
                get options() {
                    return this._options
                }
                set options(t) {
                    this.config.options = t
                }
                get registry() {
                    return _t
                }
                _initialize() {
                    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : (0, s.ae)(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this
                }
                clear() {
                    return (0, s.af)(this.canvas, this.ctx), this
                }
                stop() {
                    return o.stop(this), this
                }
                resize(t, e) {
                    o.running(this) ? this._resizeBeforeDraw = {
                        width: t,
                        height: e
                    } : this._resize(t, e)
                }
                _resize(t, e) {
                    const i = this.options,
                        n = this.canvas,
                        o = i.maintainAspectRatio && this.aspectRatio,
                        a = this.platform.getMaximumSize(n, t, e, o),
                        r = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
                        h = this.width ? "resize" : "attach";
                    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, (0, s.ae)(this, r, !0) && (this.notifyPlugins("resize", {
                        size: a
                    }), (0, s.Q)(i.onResize, [this, a], this), this.attached && this._doResize(h) && this.render())
                }
                ensureScalesHaveIDs() {
                    const t = this.options.scales || {};
                    (0, s.F)(t, ((t, e) => {
                        t.id = e
                    }))
                }
                buildOrUpdateScales() {
                    const t = this.options,
                        e = t.scales,
                        i = this.scales,
                        n = Object.keys(i).reduce(((t, e) => (t[e] = !1, t)), {});
                    let o = [];
                    e && (o = o.concat(Object.keys(e).map((t => {
                        const i = e[t],
                            s = Mt(t, i),
                            n = "r" === s,
                            o = "x" === s;
                        return {
                            options: i,
                            dposition: n ? "chartArea" : o ? "bottom" : "left",
                            dtype: n ? "radialLinear" : o ? "category" : "linear"
                        }
                    })))), (0, s.F)(o, (e => {
                        const o = e.options,
                            a = o.id,
                            r = Mt(a, o),
                            h = (0, s.v)(o.type, e.dtype);
                        void 0 !== o.position && Rt(o.position, r) === Rt(e.dposition) || (o.position = e.dposition), n[a] = !0;
                        let l = null;
                        if (a in i && i[a].type === h) l = i[a];
                        else {
                            l = new(_t.getScale(h))({
                                id: a,
                                type: h,
                                ctx: this.ctx,
                                chart: this
                            }), i[l.id] = l
                        }
                        l.init(o, t)
                    })), (0, s.F)(n, ((t, e) => {
                        t || delete i[e]
                    })), (0, s.F)(i, (t => {
                        j.configure(this, t, t.options), j.addBox(this, t)
                    }))
                }
                _updateMetasets() {
                    const t = this._metasets,
                        e = this.data.datasets.length,
                        i = t.length;
                    if (t.sort(((t, e) => t.index - e.index)), i > e) {
                        for (let t = e; t < i; ++t) this._destroyDatasetMeta(t);
                        t.splice(e, i - e)
                    }
                    this._sortedMetasets = t.slice(0).sort(Ht("order", "index"))
                }
                _removeUnreferencedMetasets() {
                    const {
                        _metasets: t,
                        data: {
                            datasets: e
                        }
                    } = this;
                    t.length > e.length && delete this._stacks, t.forEach(((t, i) => {
                        0 === e.filter((e => e === t._dataset)).length && this._destroyDatasetMeta(i)
                    }))
                }
                buildOrUpdateControllers() {
                    const t = [],
                        e = this.data.datasets;
                    let i, n;
                    for (this._removeUnreferencedMetasets(), i = 0, n = e.length; i < n; i++) {
                        const n = e[i];
                        let o = this.getDatasetMeta(i);
                        const a = n.type || this.config.type;
                        if (o.type && o.type !== a && (this._destroyDatasetMeta(i), o = this.getDatasetMeta(i)), o.type = a, o.indexAxis = n.indexAxis || wt(a, this.options), o.order = n.order || 0, o.index = i, o.label = "" + n.label, o.visible = this.isDatasetVisible(i), o.controller) o.controller.updateIndex(i), o.controller.linkScales();
                        else {
                            const e = _t.getController(a),
                                {
                                    datasetElementType: n,
                                    dataElementType: r
                                } = s.d.datasets[a];
                            Object.assign(e, {
                                dataElementType: _t.getElement(r),
                                datasetElementType: n && _t.getElement(n)
                            }), o.controller = new e(this, i), t.push(o.controller)
                        }
                    }
                    return this._updateMetasets(), t
                }
                _resetElements() {
                    (0, s.F)(this.data.datasets, ((t, e) => {
                        this.getDatasetMeta(e).controller.reset()
                    }), this)
                }
                reset() {
                    this._resetElements(), this.notifyPlugins("reset")
                }
                update(t) {
                    const e = this.config;
                    e.update();
                    const i = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()),
                        n = this._animationsDisabled = !i.animation;
                    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), !1 === this.notifyPlugins("beforeUpdate", {
                            mode: t,
                            cancelable: !0
                        })) return;
                    const o = this.buildOrUpdateControllers();
                    this.notifyPlugins("beforeElementsUpdate");
                    let a = 0;
                    for (let s = 0, l = this.data.datasets.length; s < l; s++) {
                        const {
                            controller: t
                        } = this.getDatasetMeta(s), e = !n && -1 === o.indexOf(t);
                        t.buildOrUpdateElements(e), a = Math.max(+t.getMaxOverflow(), a)
                    }
                    a = this._minPadding = i.layout.autoPadding ? a : 0, this._updateLayout(a), n || (0, s.F)(o, (t => {
                        t.reset()
                    })), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
                        mode: t
                    }), this._layers.sort(Ht("z", "_idx"));
                    const {
                        _active: r,
                        _lastEvent: h
                    } = this;
                    h ? this._eventHandler(h, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render()
                }
                _updateScales() {
                    (0, s.F)(this.scales, (t => {
                        j.removeBox(this, t)
                    })), this.ensureScalesHaveIDs(), this.buildOrUpdateScales()
                }
                _checkEventBindings() {
                    const t = this.options,
                        e = new Set(Object.keys(this._listeners)),
                        i = new Set(t.events);
                    (0, s.ag)(e, i) && !!this._responsiveListeners === t.responsive || (this.unbindEvents(), this.bindEvents())
                }
                _updateHiddenIndices() {
                    const {
                        _hiddenIndices: t
                    } = this, e = this._getUniformDataChanges() || [];
                    for (const {
                            method: i,
                            start: s,
                            count: n
                        } of e) {
                        Nt(t, s, "_removeElements" === i ? -n : n)
                    }
                }
                _getUniformDataChanges() {
                    const t = this._dataChanges;
                    if (!t || !t.length) return;
                    this._dataChanges = [];
                    const e = this.data.datasets.length,
                        i = e => new Set(t.filter((t => t[0] === e)).map(((t, e) => e + "," + t.splice(1).join(",")))),
                        n = i(0);
                    for (let o = 1; o < e; o++)
                        if (!(0, s.ag)(n, i(o))) return;
                    return Array.from(n).map((t => t.split(","))).map((t => ({
                        method: t[1],
                        start: +t[2],
                        count: +t[3]
                    })))
                }
                _updateLayout(t) {
                    if (!1 === this.notifyPlugins("beforeLayout", {
                            cancelable: !0
                        })) return;
                    j.update(this, this.width, this.height, t);
                    const e = this.chartArea,
                        i = e.width <= 0 || e.height <= 0;
                    this._layers = [], (0, s.F)(this.boxes, (t => {
                        i && "chartArea" === t.position || (t.configure && t.configure(), this._layers.push(...t._layers()))
                    }), this), this._layers.forEach(((t, e) => {
                        t._idx = e
                    })), this.notifyPlugins("afterLayout")
                }
                _updateDatasets(t) {
                    if (!1 !== this.notifyPlugins("beforeDatasetsUpdate", {
                            mode: t,
                            cancelable: !0
                        })) {
                        for (let t = 0, e = this.data.datasets.length; t < e; ++t) this.getDatasetMeta(t).controller.configure();
                        for (let e = 0, i = this.data.datasets.length; e < i; ++e) this._updateDataset(e, (0, s.a7)(t) ? t({
                            datasetIndex: e
                        }) : t);
                        this.notifyPlugins("afterDatasetsUpdate", {
                            mode: t
                        })
                    }
                }
                _updateDataset(t, e) {
                    const i = this.getDatasetMeta(t),
                        s = {
                            meta: i,
                            index: t,
                            mode: e,
                            cancelable: !0
                        };
                    !1 !== this.notifyPlugins("beforeDatasetUpdate", s) && (i.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s))
                }
                render() {
                    !1 !== this.notifyPlugins("beforeRender", {
                        cancelable: !0
                    }) && (o.has(this) ? this.attached && !o.running(this) && o.start(this) : (this.draw(), Bt({
                        chart: this
                    })))
                }
                draw() {
                    let t;
                    if (this._resizeBeforeDraw) {
                        const {
                            width: t,
                            height: e
                        } = this._resizeBeforeDraw;
                        this._resize(t, e), this._resizeBeforeDraw = null
                    }
                    if (this.clear(), this.width <= 0 || this.height <= 0) return;
                    if (!1 === this.notifyPlugins("beforeDraw", {
                            cancelable: !0
                        })) return;
                    const e = this._layers;
                    for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
                    for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
                    this.notifyPlugins("afterDraw")
                }
                _getSortedDatasetMetas(t) {
                    const e = this._sortedMetasets,
                        i = [];
                    let s, n;
                    for (s = 0, n = e.length; s < n; ++s) {
                        const n = e[s];
                        t && !n.visible || i.push(n)
                    }
                    return i
                }
                getSortedVisibleDatasetMetas() {
                    return this._getSortedDatasetMetas(!0)
                }
                _drawDatasets() {
                    if (!1 === this.notifyPlugins("beforeDatasetsDraw", {
                            cancelable: !0
                        })) return;
                    const t = this.getSortedVisibleDatasetMetas();
                    for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
                    this.notifyPlugins("afterDatasetsDraw")
                }
                _drawDataset(t) {
                    const e = this.ctx,
                        i = t._clip,
                        n = !i.disabled,
                        o = function(t, e) {
                            const {
                                xScale: i,
                                yScale: s
                            } = t;
                            return i && s ? {
                                left: Ut(i, e, "left"),
                                right: Ut(i, e, "right"),
                                top: Ut(s, e, "top"),
                                bottom: Ut(s, e, "bottom")
                            } : e
                        }(t, this.chartArea),
                        a = {
                            meta: t,
                            index: t.index,
                            cancelable: !0
                        };
                    !1 !== this.notifyPlugins("beforeDatasetDraw", a) && (n && (0, s.Y)(e, {
                        left: !1 === i.left ? 0 : o.left - i.left,
                        right: !1 === i.right ? this.width : o.right + i.right,
                        top: !1 === i.top ? 0 : o.top - i.top,
                        bottom: !1 === i.bottom ? this.height : o.bottom + i.bottom
                    }), t.controller.draw(), n && (0, s.$)(e), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a))
                }
                isPointInArea(t) {
                    return (0, s.C)(t, this.chartArea, this._minPadding)
                }
                getElementsAtEventForMode(t, e, i, s) {
                    const n = P.modes[e];
                    return "function" === typeof n ? n(this, t, i, s) : []
                }
                getDatasetMeta(t) {
                    const e = this.data.datasets[t],
                        i = this._metasets;
                    let s = i.filter((t => t && t._dataset === e)).pop();
                    return s || (s = {
                        type: null,
                        data: [],
                        dataset: null,
                        controller: null,
                        hidden: null,
                        xAxisID: null,
                        yAxisID: null,
                        order: e && e.order || 0,
                        index: t,
                        _dataset: e,
                        _parsed: [],
                        _sorted: !1
                    }, i.push(s)), s
                }
                getContext() {
                    return this.$context || (this.$context = (0, s.j)(null, {
                        chart: this,
                        type: "chart"
                    }))
                }
                getVisibleDatasetCount() {
                    return this.getSortedVisibleDatasetMetas().length
                }
                isDatasetVisible(t) {
                    const e = this.data.datasets[t];
                    if (!e) return !1;
                    const i = this.getDatasetMeta(t);
                    return "boolean" === typeof i.hidden ? !i.hidden : !e.hidden
                }
                setDatasetVisibility(t, e) {
                    this.getDatasetMeta(t).hidden = !e
                }
                toggleDataVisibility(t) {
                    this._hiddenIndices[t] = !this._hiddenIndices[t]
                }
                getDataVisibility(t) {
                    return !this._hiddenIndices[t]
                }
                _updateVisibility(t, e, i) {
                    const n = i ? "show" : "hide",
                        o = this.getDatasetMeta(t),
                        a = o.controller._resolveAnimations(void 0, n);
                    (0, s.h)(e) ? (o.data[e].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), a.update(o, {
                        visible: i
                    }), this.update((e => e.datasetIndex === t ? n : void 0)))
                }
                hide(t, e) {
                    this._updateVisibility(t, e, !1)
                }
                show(t, e) {
                    this._updateVisibility(t, e, !0)
                }
                _destroyDatasetMeta(t) {
                    const e = this._metasets[t];
                    e && e.controller && e.controller._destroy(), delete this._metasets[t]
                }
                _stop() {
                    let t, e;
                    for (this.stop(), o.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t) this._destroyDatasetMeta(t)
                }
                destroy() {
                    this.notifyPlugins("beforeDestroy");
                    const {
                        canvas: t,
                        ctx: e
                    } = this;
                    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), (0, s.af)(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete jt[this.id], this.notifyPlugins("afterDestroy")
                }
                toBase64Image(...t) {
                    return this.canvas.toDataURL(...t)
                }
                bindEvents() {
                    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0
                }
                bindUserEvents() {
                    const t = this._listeners,
                        e = this.platform,
                        i = (i, s) => {
                            e.addEventListener(this, i, s), t[i] = s
                        },
                        n = (t, e, i) => {
                            t.offsetX = e, t.offsetY = i, this._eventHandler(t)
                        };
                    (0, s.F)(this.options.events, (t => i(t, n)))
                }
                bindResponsiveEvents() {
                    this._responsiveListeners || (this._responsiveListeners = {});
                    const t = this._responsiveListeners,
                        e = this.platform,
                        i = (i, s) => {
                            e.addEventListener(this, i, s), t[i] = s
                        },
                        s = (i, s) => {
                            t[i] && (e.removeEventListener(this, i, s), delete t[i])
                        },
                        n = (t, e) => {
                            this.canvas && this.resize(t, e)
                        };
                    let o;
                    const a = () => {
                        s("attach", a), this.attached = !0, this.resize(), i("resize", n), i("detach", o)
                    };
                    o = () => {
                        this.attached = !1, s("resize", n), this._stop(), this._resize(0, 0), i("attach", a)
                    }, e.isAttached(this.canvas) ? a() : o()
                }
                unbindEvents() {
                    (0, s.F)(this._listeners, ((t, e) => {
                        this.platform.removeEventListener(this, e, t)
                    })), this._listeners = {}, (0, s.F)(this._responsiveListeners, ((t, e) => {
                        this.platform.removeEventListener(this, e, t)
                    })), this._responsiveListeners = void 0
                }
                updateHoverStyle(t, e, i) {
                    const s = i ? "set" : "remove";
                    let n, o, a, r;
                    for ("dataset" === e && (n = this.getDatasetMeta(t[0].datasetIndex), n.controller["_" + s + "DatasetHoverStyle"]()), a = 0, r = t.length; a < r; ++a) {
                        o = t[a];
                        const e = o && this.getDatasetMeta(o.datasetIndex).controller;
                        e && e[s + "HoverStyle"](o.element, o.datasetIndex, o.index)
                    }
                }
                getActiveElements() {
                    return this._active || []
                }
                setActiveElements(t) {
                    const e = this._active || [],
                        i = t.map((({
                            datasetIndex: t,
                            index: e
                        }) => {
                            const i = this.getDatasetMeta(t);
                            if (!i) throw new Error("No dataset found at index " + t);
                            return {
                                datasetIndex: t,
                                element: i.data[e],
                                index: e
                            }
                        }));
                    !(0, s.ah)(i, e) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, e))
                }
                notifyPlugins(t, e, i) {
                    return this._plugins.notify(this, t, e, i)
                }
                isPluginEnabled(t) {
                    return 1 === this._plugins._cache.filter((e => e.plugin.id === t)).length
                }
                _updateHoverStyles(t, e, i) {
                    const s = this.options.hover,
                        n = (t, e) => t.filter((t => !e.some((e => t.datasetIndex === e.datasetIndex && t.index === e.index)))),
                        o = n(e, t),
                        a = i ? t : n(t, e);
                    o.length && this.updateHoverStyle(o, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0)
                }
                _eventHandler(t, e) {
                    const i = {
                            event: t,
                            replay: e,
                            cancelable: !0,
                            inChartArea: this.isPointInArea(t)
                        },
                        s = e => (e.options.events || this.options.events).includes(t.native.type);
                    if (!1 === this.notifyPlugins("beforeEvent", i, s)) return;
                    const n = this._handleEvent(t, e, i.inChartArea);
                    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (n || i.changed) && this.render(), this
                }
                _handleEvent(t, e, i) {
                    const {
                        _active: n = [],
                        options: o
                    } = this, a = e, r = this._getActiveElements(t, n, i, a), h = (0, s.ai)(t), l = function(t, e, i, s) {
                        return i && "mouseout" !== t.type ? s ? e : t : null
                    }(t, this._lastEvent, i, h);
                    i && (this._lastEvent = null, (0, s.Q)(o.onHover, [t, r, this], this), h && (0, s.Q)(o.onClick, [t, r, this], this));
                    const c = !(0, s.ah)(r, n);
                    return (c || e) && (this._active = r, this._updateHoverStyles(r, n, e)), this._lastEvent = l, c
                }
                _getActiveElements(t, e, i, s) {
                    if ("mouseout" === t.type) return [];
                    if (!i) return e;
                    const n = this.options.hover;
                    return this.getElementsAtEventForMode(t, n.mode, n, s)
                }
            }

            function Qt() {
                return (0, s.F)(Yt.instances, (t => t._plugins.invalidate()))
            }

            function Xt(t, e, i = e) {
                t.lineCap = (0, s.v)(i.borderCapStyle, e.borderCapStyle), t.setLineDash((0, s.v)(i.borderDash, e.borderDash)), t.lineDashOffset = (0, s.v)(i.borderDashOffset, e.borderDashOffset), t.lineJoin = (0, s.v)(i.borderJoinStyle, e.borderJoinStyle), t.lineWidth = (0, s.v)(i.borderWidth, e.borderWidth), t.strokeStyle = (0, s.v)(i.borderColor, e.borderColor)
            }

            function Kt(t, e, i) {
                t.lineTo(i.x, i.y)
            }

            function qt(t, e, i = {}) {
                const s = t.length,
                    {
                        start: n = 0,
                        end: o = s - 1
                    } = i,
                    {
                        start: a,
                        end: r
                    } = e,
                    h = Math.max(n, a),
                    l = Math.min(o, r),
                    c = n < a && o < a || n > r && o > r;
                return {
                    count: s,
                    start: h,
                    loop: e.loop,
                    ilen: l < h && !c ? s + l - h : l - h
                }
            }

            function Gt(t, e, i, n) {
                const {
                    points: o,
                    options: a
                } = e, {
                    count: r,
                    start: h,
                    loop: l,
                    ilen: c
                } = qt(o, i, n), d = function(t) {
                    return t.stepped ? s.ar : t.tension || "monotone" === t.cubicInterpolationMode ? s.as : Kt
                }(a);
                let u, g, p, {
                    move: f = !0,
                    reverse: m
                } = n || {};
                for (u = 0; u <= c; ++u) g = o[(h + (m ? c - u : u)) % r], g.skip || (f ? (t.moveTo(g.x, g.y), f = !1) : d(t, p, g, m, a.stepped), p = g);
                return l && (g = o[(h + (m ? c : 0)) % r], d(t, p, g, m, a.stepped)), !!l
            }

            function Jt(t, e, i, s) {
                const n = e.points,
                    {
                        count: o,
                        start: a,
                        ilen: r
                    } = qt(n, i, s),
                    {
                        move: h = !0,
                        reverse: l
                    } = s || {};
                let c, d, u, g, p, f, m = 0,
                    x = 0;
                const _ = t => (a + (l ? r - t : t)) % o,
                    b = () => {
                        g !== p && (t.lineTo(m, p), t.lineTo(m, g), t.lineTo(m, f))
                    };
                for (h && (d = n[_(0)], t.moveTo(d.x, d.y)), c = 0; c <= r; ++c) {
                    if (d = n[_(c)], d.skip) continue;
                    const e = d.x,
                        i = d.y,
                        s = 0 | e;
                    s === u ? (i < g ? g = i : i > p && (p = i), m = (x * m + e) / ++x) : (b(), t.lineTo(e, i), u = s, x = 0, g = p = i), f = i
                }
                b()
            }

            function Zt(t) {
                const e = t.options,
                    i = e.borderDash && e.borderDash.length;
                return !t._decimated && !t._loop && !e.tension && "monotone" !== e.cubicInterpolationMode && !e.stepped && !i ? Jt : Gt
            }
            const te = "function" === typeof Path2D;

            function ee(t, e, i, s) {
                te && !e.options.segment ? function(t, e, i, s) {
                    let n = e._path;
                    n || (n = e._path = new Path2D, e.path(n, i, s) && n.closePath()), Xt(t, e.options), t.stroke(n)
                }(t, e, i, s) : function(t, e, i, s) {
                    const {
                        segments: n,
                        options: o
                    } = e, a = Zt(e);
                    for (const r of n) Xt(t, o, r.style), t.beginPath(), a(t, e, r, {
                        start: i,
                        end: i + s - 1
                    }) && t.closePath(), t.stroke()
                }(t, e, i, s)
            }
            class ie extends ot {
                static id = "line";
                static defaults = {
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0,
                    borderJoinStyle: "miter",
                    borderWidth: 3,
                    capBezierPoints: !0,
                    cubicInterpolationMode: "default",
                    fill: !1,
                    spanGaps: !1,
                    stepped: !1,
                    tension: 0
                };
                static defaultRoutes = {
                    backgroundColor: "backgroundColor",
                    borderColor: "borderColor"
                };
                static descriptors = {
                    _scriptable: !0,
                    _indexable: t => "borderDash" !== t && "fill" !== t
                };
                constructor(t) {
                    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t)
                }
                updateControlPoints(t, e) {
                    const i = this.options;
                    if ((i.tension || "monotone" === i.cubicInterpolationMode) && !i.stepped && !this._pointsUpdated) {
                        const n = i.spanGaps ? this._loop : this._fullLoop;
                        (0, s.al)(this._points, i, t, n, e), this._pointsUpdated = !0
                    }
                }
                set points(t) {
                    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1
                }
                get points() {
                    return this._points
                }
                get segments() {
                    return this._segments || (this._segments = (0, s.am)(this, this.options.segment))
                }
                first() {
                    const t = this.segments,
                        e = this.points;
                    return t.length && e[t[0].start]
                }
                last() {
                    const t = this.segments,
                        e = this.points,
                        i = t.length;
                    return i && e[t[i - 1].end]
                }
                interpolate(t, e) {
                    const i = this.options,
                        n = t[e],
                        o = this.points,
                        a = (0, s.an)(this, {
                            property: e,
                            start: n,
                            end: n
                        });
                    if (!a.length) return;
                    const r = [],
                        h = function(t) {
                            return t.stepped ? s.ao : t.tension || "monotone" === t.cubicInterpolationMode ? s.ap : s.aq
                        }(i);
                    let l, c;
                    for (l = 0, c = a.length; l < c; ++l) {
                        const {
                            start: s,
                            end: c
                        } = a[l], d = o[s], u = o[c];
                        if (d === u) {
                            r.push(d);
                            continue
                        }
                        const g = h(d, u, Math.abs((n - d[e]) / (u[e] - d[e])), i.stepped);
                        g[e] = t[e], r.push(g)
                    }
                    return 1 === r.length ? r[0] : r
                }
                pathSegment(t, e, i) {
                    return Zt(this)(t, this, e, i)
                }
                path(t, e, i) {
                    const s = this.segments,
                        n = Zt(this);
                    let o = this._loop;
                    e = e || 0, i = i || this.points.length - e;
                    for (const a of s) o &= n(t, this, a, {
                        start: e,
                        end: e + i - 1
                    });
                    return !!o
                }
                draw(t, e, i, s) {
                    const n = this.options || {};
                    (this.points || []).length && n.borderWidth && (t.save(), ee(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0)
                }
            }

            function se(t, e, i, s) {
                const n = t.options,
                    {
                        [i]: o
                    } = t.getProps([i], s);
                return Math.abs(e - o) < n.radius + n.hitRadius
            }
            class ne extends ot {
                static id = "point";
                parsed;
                skip;
                stop;
                static defaults = {
                    borderWidth: 1,
                    hitRadius: 1,
                    hoverBorderWidth: 1,
                    hoverRadius: 4,
                    pointStyle: "circle",
                    radius: 3,
                    rotation: 0
                };
                static defaultRoutes = {
                    backgroundColor: "backgroundColor",
                    borderColor: "borderColor"
                };
                constructor(t) {
                    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t)
                }
                inRange(t, e, i) {
                    const s = this.options,
                        {
                            x: n,
                            y: o
                        } = this.getProps(["x", "y"], i);
                    return Math.pow(t - n, 2) + Math.pow(e - o, 2) < Math.pow(s.hitRadius + s.radius, 2)
                }
                inXRange(t, e) {
                    return se(this, t, "x", e)
                }
                inYRange(t, e) {
                    return se(this, t, "y", e)
                }
                getCenterPoint(t) {
                    const {
                        x: e,
                        y: i
                    } = this.getProps(["x", "y"], t);
                    return {
                        x: e,
                        y: i
                    }
                }
                size(t) {
                    let e = (t = t || this.options || {}).radius || 0;
                    e = Math.max(e, e && t.hoverRadius || 0);
                    return 2 * (e + (e && t.borderWidth || 0))
                }
                draw(t, e) {
                    const i = this.options;
                    this.skip || i.radius < .1 || !(0, s.C)(this, e, this.size(i) / 2) || (t.strokeStyle = i.borderColor, t.lineWidth = i.borderWidth, t.fillStyle = i.backgroundColor, (0, s.at)(t, i, this.x, this.y))
                }
                getRange() {
                    const t = this.options || {};
                    return t.radius + t.hitRadius
                }
            }
            const oe = (t, e) => {
                let {
                    boxHeight: i = e,
                    boxWidth: s = e
                } = t;
                return t.usePointStyle && (i = Math.min(i, e), s = t.pointStyleWidth || Math.min(s, e)), {
                    boxWidth: s,
                    boxHeight: i,
                    itemHeight: Math.max(e, i)
                }
            };
            class ae extends ot {
                constructor(t) {
                    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0
                }
                update(t, e, i) {
                    this.maxWidth = t, this.maxHeight = e, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit()
                }
                setDimensions() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height)
                }
                buildLabels() {
                    const t = this.options.labels || {};
                    let e = (0, s.Q)(t.generateLabels, [this.chart], this) || [];
                    t.filter && (e = e.filter((e => t.filter(e, this.chart.data)))), t.sort && (e = e.sort(((e, i) => t.sort(e, i, this.chart.data)))), this.options.reverse && e.reverse(), this.legendItems = e
                }
                fit() {
                    const {
                        options: t,
                        ctx: e
                    } = this;
                    if (!t.display) return void(this.width = this.height = 0);
                    const i = t.labels,
                        n = (0, s.a0)(i.font),
                        o = n.size,
                        a = this._computeTitleHeight(),
                        {
                            boxWidth: r,
                            itemHeight: h
                        } = oe(i, o);
                    let l, c;
                    e.font = n.string, this.isHorizontal() ? (l = this.maxWidth, c = this._fitRows(a, o, r, h) + 10) : (c = this.maxHeight, l = this._fitCols(a, n, r, h) + 10), this.width = Math.min(l, t.maxWidth || this.maxWidth), this.height = Math.min(c, t.maxHeight || this.maxHeight)
                }
                _fitRows(t, e, i, s) {
                    const {
                        ctx: n,
                        maxWidth: o,
                        options: {
                            labels: {
                                padding: a
                            }
                        }
                    } = this, r = this.legendHitBoxes = [], h = this.lineWidths = [0], l = s + a;
                    let c = t;
                    n.textAlign = "left", n.textBaseline = "middle";
                    let d = -1,
                        u = -l;
                    return this.legendItems.forEach(((t, g) => {
                        const p = i + e / 2 + n.measureText(t.text).width;
                        (0 === g || h[h.length - 1] + p + 2 * a > o) && (c += l, h[h.length - (g > 0 ? 0 : 1)] = 0, u += l, d++), r[g] = {
                            left: 0,
                            top: u,
                            row: d,
                            width: p,
                            height: s
                        }, h[h.length - 1] += p + a
                    })), c
                }
                _fitCols(t, e, i, s) {
                    const {
                        ctx: n,
                        maxHeight: o,
                        options: {
                            labels: {
                                padding: a
                            }
                        }
                    } = this, r = this.legendHitBoxes = [], h = this.columnSizes = [], l = o - t;
                    let c = a,
                        d = 0,
                        u = 0,
                        g = 0,
                        p = 0;
                    return this.legendItems.forEach(((t, o) => {
                        const {
                            itemWidth: f,
                            itemHeight: m
                        } = function(t, e, i, s, n) {
                            const o = function(t, e, i, s) {
                                    let n = t.text;
                                    n && "string" !== typeof n && (n = n.reduce(((t, e) => t.length > e.length ? t : e)));
                                    return e + i.size / 2 + s.measureText(n).width
                                }(s, t, e, i),
                                a = function(t, e, i) {
                                    let s = t;
                                    "string" !== typeof e.text && (s = re(e, i));
                                    return s
                                }(n, s, e.lineHeight);
                            return {
                                itemWidth: o,
                                itemHeight: a
                            }
                        }(i, e, n, t, s);
                        o > 0 && u + m + 2 * a > l && (c += d + a, h.push({
                            width: d,
                            height: u
                        }), g += d + a, p++, d = u = 0), r[o] = {
                            left: g,
                            top: u,
                            col: p,
                            width: f,
                            height: m
                        }, d = Math.max(d, f), u += m + a
                    })), c += d, h.push({
                        width: d,
                        height: u
                    }), c
                }
                adjustHitBoxes() {
                    if (!this.options.display) return;
                    const t = this._computeTitleHeight(),
                        {
                            legendHitBoxes: e,
                            options: {
                                align: i,
                                labels: {
                                    padding: n
                                },
                                rtl: o
                            }
                        } = this,
                        a = (0, s.az)(o, this.left, this.width);
                    if (this.isHorizontal()) {
                        let o = 0,
                            r = (0, s.a2)(i, this.left + n, this.right - this.lineWidths[o]);
                        for (const h of e) o !== h.row && (o = h.row, r = (0, s.a2)(i, this.left + n, this.right - this.lineWidths[o])), h.top += this.top + t + n, h.left = a.leftForLtr(a.x(r), h.width), r += h.width + n
                    } else {
                        let o = 0,
                            r = (0, s.a2)(i, this.top + t + n, this.bottom - this.columnSizes[o].height);
                        for (const h of e) h.col !== o && (o = h.col, r = (0, s.a2)(i, this.top + t + n, this.bottom - this.columnSizes[o].height)), h.top = r, h.left += this.left + n, h.left = a.leftForLtr(a.x(h.left), h.width), r += h.height + n
                    }
                }
                isHorizontal() {
                    return "top" === this.options.position || "bottom" === this.options.position
                }
                draw() {
                    if (this.options.display) {
                        const t = this.ctx;
                        (0, s.Y)(t, this), this._draw(), (0, s.$)(t)
                    }
                }
                _draw() {
                    const {
                        options: t,
                        columnSizes: e,
                        lineWidths: i,
                        ctx: n
                    } = this, {
                        align: o,
                        labels: a
                    } = t, r = s.d.color, h = (0, s.az)(t.rtl, this.left, this.width), l = (0, s.a0)(a.font), {
                        padding: c
                    } = a, d = l.size, u = d / 2;
                    let g;
                    this.drawTitle(), n.textAlign = h.textAlign("left"), n.textBaseline = "middle", n.lineWidth = .5, n.font = l.string;
                    const {
                        boxWidth: p,
                        boxHeight: f,
                        itemHeight: m
                    } = oe(a, d), x = this.isHorizontal(), _ = this._computeTitleHeight();
                    g = x ? {
                        x: (0, s.a2)(o, this.left + c, this.right - i[0]),
                        y: this.top + c + _,
                        line: 0
                    } : {
                        x: this.left + c,
                        y: (0, s.a2)(o, this.top + _ + c, this.bottom - e[0].height),
                        line: 0
                    }, (0, s.aA)(this.ctx, t.textDirection);
                    const b = m + c;
                    this.legendItems.forEach(((v, y) => {
                        n.strokeStyle = v.fontColor, n.fillStyle = v.fontColor;
                        const w = n.measureText(v.text).width,
                            k = h.textAlign(v.textAlign || (v.textAlign = a.textAlign)),
                            M = p + u + w;
                        let S = g.x,
                            D = g.y;
                        h.setWidth(this.width), x ? y > 0 && S + M + c > this.right && (D = g.y += b, g.line++, S = g.x = (0, s.a2)(o, this.left + c, this.right - i[g.line])) : y > 0 && D + b > this.bottom && (S = g.x = S + e[g.line].width + c, g.line++, D = g.y = (0, s.a2)(o, this.top + _ + c, this.bottom - e[g.line].height));
                        if (function(t, e, i) {
                                if (isNaN(p) || p <= 0 || isNaN(f) || f < 0) return;
                                n.save();
                                const o = (0, s.v)(i.lineWidth, 1);
                                if (n.fillStyle = (0, s.v)(i.fillStyle, r), n.lineCap = (0, s.v)(i.lineCap, "butt"), n.lineDashOffset = (0, s.v)(i.lineDashOffset, 0), n.lineJoin = (0, s.v)(i.lineJoin, "miter"), n.lineWidth = o, n.strokeStyle = (0, s.v)(i.strokeStyle, r), n.setLineDash((0, s.v)(i.lineDash, [])), a.usePointStyle) {
                                    const r = {
                                            radius: f * Math.SQRT2 / 2,
                                            pointStyle: i.pointStyle,
                                            rotation: i.rotation,
                                            borderWidth: o
                                        },
                                        l = h.xPlus(t, p / 2),
                                        c = e + u;
                                    (0, s.aD)(n, r, l, c, a.pointStyleWidth && p)
                                } else {
                                    const a = e + Math.max((d - f) / 2, 0),
                                        r = h.leftForLtr(t, p),
                                        l = (0, s.aw)(i.borderRadius);
                                    n.beginPath(), Object.values(l).some((t => 0 !== t)) ? (0, s.au)(n, {
                                        x: r,
                                        y: a,
                                        w: p,
                                        h: f,
                                        radius: l
                                    }) : n.rect(r, a, p, f), n.fill(), 0 !== o && n.stroke()
                                }
                                n.restore()
                            }(h.x(S), D, v), S = (0, s.aB)(k, S + p + u, x ? S + M : this.right, t.rtl), function(t, e, i) {
                                (0, s.Z)(n, i.text, t, e + m / 2, l, {
                                    strikethrough: i.hidden,
                                    textAlign: h.textAlign(i.textAlign)
                                })
                            }(h.x(S), D, v), x) g.x += M + c;
                        else if ("string" !== typeof v.text) {
                            const t = l.lineHeight;
                            g.y += re(v, t) + c
                        } else g.y += b
                    })), (0, s.aC)(this.ctx, t.textDirection)
                }
                drawTitle() {
                    const t = this.options,
                        e = t.title,
                        i = (0, s.a0)(e.font),
                        n = (0, s.E)(e.padding);
                    if (!e.display) return;
                    const o = (0, s.az)(t.rtl, this.left, this.width),
                        a = this.ctx,
                        r = e.position,
                        h = i.size / 2,
                        l = n.top + h;
                    let c, d = this.left,
                        u = this.width;
                    if (this.isHorizontal()) u = Math.max(...this.lineWidths), c = this.top + l, d = (0, s.a2)(t.align, d, this.right - u);
                    else {
                        const e = this.columnSizes.reduce(((t, e) => Math.max(t, e.height)), 0);
                        c = l + (0, s.a2)(t.align, this.top, this.bottom - e - t.labels.padding - this._computeTitleHeight())
                    }
                    const g = (0, s.a2)(r, d, d + u);
                    a.textAlign = o.textAlign((0, s.a1)(r)), a.textBaseline = "middle", a.strokeStyle = e.color, a.fillStyle = e.color, a.font = i.string, (0, s.Z)(a, e.text, g, c, i)
                }
                _computeTitleHeight() {
                    const t = this.options.title,
                        e = (0, s.a0)(t.font),
                        i = (0, s.E)(t.padding);
                    return t.display ? e.lineHeight + i.height : 0
                }
                _getLegendItemAt(t, e) {
                    let i, n, o;
                    if ((0, s.aj)(t, this.left, this.right) && (0, s.aj)(e, this.top, this.bottom))
                        for (o = this.legendHitBoxes, i = 0; i < o.length; ++i)
                            if (n = o[i], (0, s.aj)(t, n.left, n.left + n.width) && (0, s.aj)(e, n.top, n.top + n.height)) return this.legendItems[i];
                    return null
                }
                handleEvent(t) {
                    const e = this.options;
                    if (! function(t, e) {
                            if (("mousemove" === t || "mouseout" === t) && (e.onHover || e.onLeave)) return !0;
                            if (e.onClick && ("click" === t || "mouseup" === t)) return !0;
                            return !1
                        }(t.type, e)) return;
                    const i = this._getLegendItemAt(t.x, t.y);
                    if ("mousemove" === t.type || "mouseout" === t.type) {
                        const a = this._hoveredItem,
                            r = (o = i, null !== (n = a) && null !== o && n.datasetIndex === o.datasetIndex && n.index === o.index);
                        a && !r && (0, s.Q)(e.onLeave, [t, a, this], this), this._hoveredItem = i, i && !r && (0, s.Q)(e.onHover, [t, i, this], this)
                    } else i && (0, s.Q)(e.onClick, [t, i, this], this);
                    var n, o
                }
            }

            function re(t, e) {
                return e * (t.text ? t.text.length : 0)
            }
            var he = {
                id: "legend",
                _element: ae,
                start(t, e, i) {
                    const s = t.legend = new ae({
                        ctx: t.ctx,
                        options: i,
                        chart: t
                    });
                    j.configure(t, s, i), j.addBox(t, s)
                },
                stop(t) {
                    j.removeBox(t, t.legend), delete t.legend
                },
                beforeUpdate(t, e, i) {
                    const s = t.legend;
                    j.configure(t, s, i), s.options = i
                },
                afterUpdate(t) {
                    const e = t.legend;
                    e.buildLabels(), e.adjustHitBoxes()
                },
                afterEvent(t, e) {
                    e.replay || t.legend.handleEvent(e.event)
                },
                defaults: {
                    display: !0,
                    position: "top",
                    align: "center",
                    fullSize: !0,
                    reverse: !1,
                    weight: 1e3,
                    onClick(t, e, i) {
                        const s = e.datasetIndex,
                            n = i.chart;
                        n.isDatasetVisible(s) ? (n.hide(s), e.hidden = !0) : (n.show(s), e.hidden = !1)
                    },
                    onHover: null,
                    onLeave: null,
                    labels: {
                        color: t => t.chart.options.color,
                        boxWidth: 40,
                        padding: 10,
                        generateLabels(t) {
                            const e = t.data.datasets,
                                {
                                    labels: {
                                        usePointStyle: i,
                                        pointStyle: n,
                                        textAlign: o,
                                        color: a,
                                        useBorderRadius: r,
                                        borderRadius: h
                                    }
                                } = t.legend.options;
                            return t._getSortedDatasetMetas().map((t => {
                                const l = t.controller.getStyle(i ? 0 : void 0),
                                    c = (0, s.E)(l.borderWidth);
                                return {
                                    text: e[t.index].label,
                                    fillStyle: l.backgroundColor,
                                    fontColor: a,
                                    hidden: !t.visible,
                                    lineCap: l.borderCapStyle,
                                    lineDash: l.borderDash,
                                    lineDashOffset: l.borderDashOffset,
                                    lineJoin: l.borderJoinStyle,
                                    lineWidth: (c.width + c.height) / 4,
                                    strokeStyle: l.borderColor,
                                    pointStyle: n || l.pointStyle,
                                    rotation: l.rotation,
                                    textAlign: o || l.textAlign,
                                    borderRadius: r && (h || l.borderRadius),
                                    datasetIndex: t.index
                                }
                            }), this)
                        }
                    },
                    title: {
                        color: t => t.chart.options.color,
                        display: !1,
                        position: "center",
                        text: ""
                    }
                },
                descriptors: {
                    _scriptable: t => !t.startsWith("on"),
                    labels: {
                        _scriptable: t => !["generateLabels", "filter", "sort"].includes(t)
                    }
                }
            };
            class le extends ot {
                constructor(t) {
                    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0
                }
                update(t, e) {
                    const i = this.options;
                    if (this.left = 0, this.top = 0, !i.display) return void(this.width = this.height = this.right = this.bottom = 0);
                    this.width = this.right = t, this.height = this.bottom = e;
                    const n = (0, s.b)(i.text) ? i.text.length : 1;
                    this._padding = (0, s.E)(i.padding);
                    const o = n * (0, s.a0)(i.font).lineHeight + this._padding.height;
                    this.isHorizontal() ? this.height = o : this.width = o
                }
                isHorizontal() {
                    const t = this.options.position;
                    return "top" === t || "bottom" === t
                }
                _drawArgs(t) {
                    const {
                        top: e,
                        left: i,
                        bottom: n,
                        right: o,
                        options: a
                    } = this, r = a.align;
                    let h, l, c, d = 0;
                    return this.isHorizontal() ? (l = (0, s.a2)(r, i, o), c = e + t, h = o - i) : ("left" === a.position ? (l = i + t, c = (0, s.a2)(r, n, e), d = -.5 * s.P) : (l = o - t, c = (0, s.a2)(r, e, n), d = .5 * s.P), h = n - e), {
                        titleX: l,
                        titleY: c,
                        maxWidth: h,
                        rotation: d
                    }
                }
                draw() {
                    const t = this.ctx,
                        e = this.options;
                    if (!e.display) return;
                    const i = (0, s.a0)(e.font),
                        n = i.lineHeight / 2 + this._padding.top,
                        {
                            titleX: o,
                            titleY: a,
                            maxWidth: r,
                            rotation: h
                        } = this._drawArgs(n);
                    (0, s.Z)(t, e.text, 0, 0, i, {
                        color: e.color,
                        maxWidth: r,
                        rotation: h,
                        textAlign: (0, s.a1)(e.align),
                        textBaseline: "middle",
                        translation: [o, a]
                    })
                }
            }
            var ce = {
                id: "title",
                _element: le,
                start(t, e, i) {
                    ! function(t, e) {
                        const i = new le({
                            ctx: t.ctx,
                            options: e,
                            chart: t
                        });
                        j.configure(t, i, e), j.addBox(t, i), t.titleBlock = i
                    }(t, i)
                },
                stop(t) {
                    const e = t.titleBlock;
                    j.removeBox(t, e), delete t.titleBlock
                },
                beforeUpdate(t, e, i) {
                    const s = t.titleBlock;
                    j.configure(t, s, i), s.options = i
                },
                defaults: {
                    align: "center",
                    display: !1,
                    font: {
                        weight: "bold"
                    },
                    fullSize: !0,
                    padding: 10,
                    position: "top",
                    text: "",
                    weight: 2e3
                },
                defaultRoutes: {
                    color: "color"
                },
                descriptors: {
                    _scriptable: !0,
                    _indexable: !1
                }
            };
            new WeakMap;
            const de = {
                average(t) {
                    if (!t.length) return !1;
                    let e, i, s = 0,
                        n = 0,
                        o = 0;
                    for (e = 0, i = t.length; e < i; ++e) {
                        const i = t[e].element;
                        if (i && i.hasValue()) {
                            const t = i.tooltipPosition();
                            s += t.x, n += t.y, ++o
                        }
                    }
                    return {
                        x: s / o,
                        y: n / o
                    }
                },
                nearest(t, e) {
                    if (!t.length) return !1;
                    let i, n, o, a = e.x,
                        r = e.y,
                        h = Number.POSITIVE_INFINITY;
                    for (i = 0, n = t.length; i < n; ++i) {
                        const n = t[i].element;
                        if (n && n.hasValue()) {
                            const t = n.getCenterPoint(),
                                i = (0, s.aE)(e, t);
                            i < h && (h = i, o = n)
                        }
                    }
                    if (o) {
                        const t = o.tooltipPosition();
                        a = t.x, r = t.y
                    }
                    return {
                        x: a,
                        y: r
                    }
                }
            };

            function ue(t, e) {
                return e && ((0, s.b)(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
            }

            function ge(t) {
                return ("string" === typeof t || t instanceof String) && t.indexOf("\n") > -1 ? t.split("\n") : t
            }

            function pe(t, e) {
                const {
                    element: i,
                    datasetIndex: s,
                    index: n
                } = e, o = t.getDatasetMeta(s).controller, {
                    label: a,
                    value: r
                } = o.getLabelAndValue(n);
                return {
                    chart: t,
                    label: a,
                    parsed: o.getParsed(n),
                    raw: t.data.datasets[s].data[n],
                    formattedValue: r,
                    dataset: o.getDataset(),
                    dataIndex: n,
                    datasetIndex: s,
                    element: i
                }
            }

            function fe(t, e) {
                const i = t.chart.ctx,
                    {
                        body: n,
                        footer: o,
                        title: a
                    } = t,
                    {
                        boxWidth: r,
                        boxHeight: h
                    } = e,
                    l = (0, s.a0)(e.bodyFont),
                    c = (0, s.a0)(e.titleFont),
                    d = (0, s.a0)(e.footerFont),
                    u = a.length,
                    g = o.length,
                    p = n.length,
                    f = (0, s.E)(e.padding);
                let m = f.height,
                    x = 0,
                    _ = n.reduce(((t, e) => t + e.before.length + e.lines.length + e.after.length), 0);
                if (_ += t.beforeBody.length + t.afterBody.length, u && (m += u * c.lineHeight + (u - 1) * e.titleSpacing + e.titleMarginBottom), _) {
                    m += p * (e.displayColors ? Math.max(h, l.lineHeight) : l.lineHeight) + (_ - p) * l.lineHeight + (_ - 1) * e.bodySpacing
                }
                g && (m += e.footerMarginTop + g * d.lineHeight + (g - 1) * e.footerSpacing);
                let b = 0;
                const v = function(t) {
                    x = Math.max(x, i.measureText(t).width + b)
                };
                return i.save(), i.font = c.string, (0, s.F)(t.title, v), i.font = l.string, (0, s.F)(t.beforeBody.concat(t.afterBody), v), b = e.displayColors ? r + 2 + e.boxPadding : 0, (0, s.F)(n, (t => {
                    (0, s.F)(t.before, v), (0, s.F)(t.lines, v), (0, s.F)(t.after, v)
                })), b = 0, i.font = d.string, (0, s.F)(t.footer, v), i.restore(), x += f.width, {
                    width: x,
                    height: m
                }
            }

            function me(t, e, i, s) {
                const {
                    x: n,
                    width: o
                } = i, {
                    width: a,
                    chartArea: {
                        left: r,
                        right: h
                    }
                } = t;
                let l = "center";
                return "center" === s ? l = n <= (r + h) / 2 ? "left" : "right" : n <= o / 2 ? l = "left" : n >= a - o / 2 && (l = "right"),
                    function(t, e, i, s) {
                        const {
                            x: n,
                            width: o
                        } = s, a = i.caretSize + i.caretPadding;
                        return "left" === t && n + o + a > e.width || "right" === t && n - o - a < 0 || void 0
                    }(l, t, e, i) && (l = "center"), l
            }

            function xe(t, e, i) {
                const s = i.yAlign || e.yAlign || function(t, e) {
                    const {
                        y: i,
                        height: s
                    } = e;
                    return i < s / 2 ? "top" : i > t.height - s / 2 ? "bottom" : "center"
                }(t, i);
                return {
                    xAlign: i.xAlign || e.xAlign || me(t, e, i, s),
                    yAlign: s
                }
            }

            function _e(t, e, i, n) {
                const {
                    caretSize: o,
                    caretPadding: a,
                    cornerRadius: r
                } = t, {
                    xAlign: h,
                    yAlign: l
                } = i, c = o + a, {
                    topLeft: d,
                    topRight: u,
                    bottomLeft: g,
                    bottomRight: p
                } = (0, s.aw)(r);
                let f = function(t, e) {
                    let {
                        x: i,
                        width: s
                    } = t;
                    return "right" === e ? i -= s : "center" === e && (i -= s / 2), i
                }(e, h);
                const m = function(t, e, i) {
                    let {
                        y: s,
                        height: n
                    } = t;
                    return "top" === e ? s += i : s -= "bottom" === e ? n + i : n / 2, s
                }(e, l, c);
                return "center" === l ? "left" === h ? f += c : "right" === h && (f -= c) : "left" === h ? f -= Math.max(d, g) + o : "right" === h && (f += Math.max(u, p) + o), {
                    x: (0, s.S)(f, 0, n.width - e.width),
                    y: (0, s.S)(m, 0, n.height - e.height)
                }
            }

            function be(t, e, i) {
                const n = (0, s.E)(i.padding);
                return "center" === e ? t.x + t.width / 2 : "right" === e ? t.x + t.width - n.right : t.x + n.left
            }

            function ve(t) {
                return ue([], ge(t))
            }

            function ye(t, e) {
                const i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
                return i ? t.override(i) : t
            }
            const we = {
                beforeTitle: s.aF,
                title(t) {
                    if (t.length > 0) {
                        const e = t[0],
                            i = e.chart.data.labels,
                            s = i ? i.length : 0;
                        if (this && this.options && "dataset" === this.options.mode) return e.dataset.label || "";
                        if (e.label) return e.label;
                        if (s > 0 && e.dataIndex < s) return i[e.dataIndex]
                    }
                    return ""
                },
                afterTitle: s.aF,
                beforeBody: s.aF,
                beforeLabel: s.aF,
                label(t) {
                    if (this && this.options && "dataset" === this.options.mode) return t.label + ": " + t.formattedValue || t.formattedValue;
                    let e = t.dataset.label || "";
                    e && (e += ": ");
                    const i = t.formattedValue;
                    return (0, s.k)(i) || (e += i), e
                },
                labelColor(t) {
                    const e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
                    return {
                        borderColor: e.borderColor,
                        backgroundColor: e.backgroundColor,
                        borderWidth: e.borderWidth,
                        borderDash: e.borderDash,
                        borderDashOffset: e.borderDashOffset,
                        borderRadius: 0
                    }
                },
                labelTextColor() {
                    return this.options.bodyColor
                },
                labelPointStyle(t) {
                    const e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
                    return {
                        pointStyle: e.pointStyle,
                        rotation: e.rotation
                    }
                },
                afterLabel: s.aF,
                afterBody: s.aF,
                beforeFooter: s.aF,
                footer: s.aF,
                afterFooter: s.aF
            };

            function ke(t, e, i, s) {
                const n = t[e].call(i, s);
                return "undefined" === typeof n ? we[e].call(i, s) : n
            }
            class Me extends ot {
                static positioners = de;
                constructor(t) {
                    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0
                }
                initialize(t) {
                    this.options = t, this._cachedAnimations = void 0, this.$context = void 0
                }
                _resolveAnimations() {
                    const t = this._cachedAnimations;
                    if (t) return t;
                    const e = this.chart,
                        i = this.options.setContext(this.getContext()),
                        s = i.enabled && e.options.animation && i.animations,
                        n = new l(this.chart, s);
                    return s._cacheable && (this._cachedAnimations = Object.freeze(n)), n
                }
                getContext() {
                    return this.$context || (this.$context = (t = this.chart.getContext(), e = this, i = this._tooltipItems, (0, s.j)(t, {
                        tooltip: e,
                        tooltipItems: i,
                        type: "tooltip"
                    })));
                    var t, e, i
                }
                getTitle(t, e) {
                    const {
                        callbacks: i
                    } = e, s = ke(i, "beforeTitle", this, t), n = ke(i, "title", this, t), o = ke(i, "afterTitle", this, t);
                    let a = [];
                    return a = ue(a, ge(s)), a = ue(a, ge(n)), a = ue(a, ge(o)), a
                }
                getBeforeBody(t, e) {
                    return ve(ke(e.callbacks, "beforeBody", this, t))
                }
                getBody(t, e) {
                    const {
                        callbacks: i
                    } = e, n = [];
                    return (0, s.F)(t, (t => {
                        const e = {
                                before: [],
                                lines: [],
                                after: []
                            },
                            s = ye(i, t);
                        ue(e.before, ge(ke(s, "beforeLabel", this, t))), ue(e.lines, ke(s, "label", this, t)), ue(e.after, ge(ke(s, "afterLabel", this, t))), n.push(e)
                    })), n
                }
                getAfterBody(t, e) {
                    return ve(ke(e.callbacks, "afterBody", this, t))
                }
                getFooter(t, e) {
                    const {
                        callbacks: i
                    } = e, s = ke(i, "beforeFooter", this, t), n = ke(i, "footer", this, t), o = ke(i, "afterFooter", this, t);
                    let a = [];
                    return a = ue(a, ge(s)), a = ue(a, ge(n)), a = ue(a, ge(o)), a
                }
                _createItems(t) {
                    const e = this._active,
                        i = this.chart.data,
                        n = [],
                        o = [],
                        a = [];
                    let r, h, l = [];
                    for (r = 0, h = e.length; r < h; ++r) l.push(pe(this.chart, e[r]));
                    return t.filter && (l = l.filter(((e, s, n) => t.filter(e, s, n, i)))), t.itemSort && (l = l.sort(((e, s) => t.itemSort(e, s, i)))), (0, s.F)(l, (e => {
                        const i = ye(t.callbacks, e);
                        n.push(ke(i, "labelColor", this, e)), o.push(ke(i, "labelPointStyle", this, e)), a.push(ke(i, "labelTextColor", this, e))
                    })), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = a, this.dataPoints = l, l
                }
                update(t, e) {
                    const i = this.options.setContext(this.getContext()),
                        s = this._active;
                    let n, o = [];
                    if (s.length) {
                        const t = de[i.position].call(this, s, this._eventPosition);
                        o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
                        const e = this._size = fe(this, i),
                            a = Object.assign({}, t, e),
                            r = xe(this.chart, i, a),
                            h = _e(i, a, r, this.chart);
                        this.xAlign = r.xAlign, this.yAlign = r.yAlign, n = {
                            opacity: 1,
                            x: h.x,
                            y: h.y,
                            width: e.width,
                            height: e.height,
                            caretX: t.x,
                            caretY: t.y
                        }
                    } else 0 !== this.opacity && (n = {
                        opacity: 0
                    });
                    this._tooltipItems = o, this.$context = void 0, n && this._resolveAnimations().update(this, n), t && i.external && i.external.call(this, {
                        chart: this.chart,
                        tooltip: this,
                        replay: e
                    })
                }
                drawCaret(t, e, i, s) {
                    const n = this.getCaretPosition(t, i, s);
                    e.lineTo(n.x1, n.y1), e.lineTo(n.x2, n.y2), e.lineTo(n.x3, n.y3)
                }
                getCaretPosition(t, e, i) {
                    const {
                        xAlign: n,
                        yAlign: o
                    } = this, {
                        caretSize: a,
                        cornerRadius: r
                    } = i, {
                        topLeft: h,
                        topRight: l,
                        bottomLeft: c,
                        bottomRight: d
                    } = (0, s.aw)(r), {
                        x: u,
                        y: g
                    } = t, {
                        width: p,
                        height: f
                    } = e;
                    let m, x, _, b, v, y;
                    return "center" === o ? (v = g + f / 2, "left" === n ? (m = u, x = m - a, b = v + a, y = v - a) : (m = u + p, x = m + a, b = v - a, y = v + a), _ = m) : (x = "left" === n ? u + Math.max(h, c) + a : "right" === n ? u + p - Math.max(l, d) - a : this.caretX, "top" === o ? (b = g, v = b - a, m = x - a, _ = x + a) : (b = g + f, v = b + a, m = x + a, _ = x - a), y = b), {
                        x1: m,
                        x2: x,
                        x3: _,
                        y1: b,
                        y2: v,
                        y3: y
                    }
                }
                drawTitle(t, e, i) {
                    const n = this.title,
                        o = n.length;
                    let a, r, h;
                    if (o) {
                        const l = (0, s.az)(i.rtl, this.x, this.width);
                        for (t.x = be(this, i.titleAlign, i), e.textAlign = l.textAlign(i.titleAlign), e.textBaseline = "middle", a = (0, s.a0)(i.titleFont), r = i.titleSpacing, e.fillStyle = i.titleColor, e.font = a.string, h = 0; h < o; ++h) e.fillText(n[h], l.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + r, h + 1 === o && (t.y += i.titleMarginBottom - r)
                    }
                }
                _drawColorBox(t, e, i, n, o) {
                    const a = this.labelColors[i],
                        r = this.labelPointStyles[i],
                        {
                            boxHeight: h,
                            boxWidth: l
                        } = o,
                        c = (0, s.a0)(o.bodyFont),
                        d = be(this, "left", o),
                        u = n.x(d),
                        g = h < c.lineHeight ? (c.lineHeight - h) / 2 : 0,
                        p = e.y + g;
                    if (o.usePointStyle) {
                        const e = {
                                radius: Math.min(l, h) / 2,
                                pointStyle: r.pointStyle,
                                rotation: r.rotation,
                                borderWidth: 1
                            },
                            i = n.leftForLtr(u, l) + l / 2,
                            c = p + h / 2;
                        t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, (0, s.at)(t, e, i, c), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, (0, s.at)(t, e, i, c)
                    } else {
                        t.lineWidth = (0, s.i)(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, t.strokeStyle = a.borderColor, t.setLineDash(a.borderDash || []), t.lineDashOffset = a.borderDashOffset || 0;
                        const e = n.leftForLtr(u, l),
                            i = n.leftForLtr(n.xPlus(u, 1), l - 2),
                            r = (0, s.aw)(a.borderRadius);
                        Object.values(r).some((t => 0 !== t)) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, (0, s.au)(t, {
                            x: e,
                            y: p,
                            w: l,
                            h: h,
                            radius: r
                        }), t.fill(), t.stroke(), t.fillStyle = a.backgroundColor, t.beginPath(), (0, s.au)(t, {
                            x: i,
                            y: p + 1,
                            w: l - 2,
                            h: h - 2,
                            radius: r
                        }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(e, p, l, h), t.strokeRect(e, p, l, h), t.fillStyle = a.backgroundColor, t.fillRect(i, p + 1, l - 2, h - 2))
                    }
                    t.fillStyle = this.labelTextColors[i]
                }
                drawBody(t, e, i) {
                    const {
                        body: n
                    } = this, {
                        bodySpacing: o,
                        bodyAlign: a,
                        displayColors: r,
                        boxHeight: h,
                        boxWidth: l,
                        boxPadding: c
                    } = i, d = (0, s.a0)(i.bodyFont);
                    let u = d.lineHeight,
                        g = 0;
                    const p = (0, s.az)(i.rtl, this.x, this.width),
                        f = function(i) {
                            e.fillText(i, p.x(t.x + g), t.y + u / 2), t.y += u + o
                        },
                        m = p.textAlign(a);
                    let x, _, b, v, y, w, k;
                    for (e.textAlign = a, e.textBaseline = "middle", e.font = d.string, t.x = be(this, m, i), e.fillStyle = i.bodyColor, (0, s.F)(this.beforeBody, f), g = r && "right" !== m ? "center" === a ? l / 2 + c : l + 2 + c : 0, v = 0, w = n.length; v < w; ++v) {
                        for (x = n[v], _ = this.labelTextColors[v], e.fillStyle = _, (0, s.F)(x.before, f), b = x.lines, r && b.length && (this._drawColorBox(e, t, v, p, i), u = Math.max(d.lineHeight, h)), y = 0, k = b.length; y < k; ++y) f(b[y]), u = d.lineHeight;
                        (0, s.F)(x.after, f)
                    }
                    g = 0, u = d.lineHeight, (0, s.F)(this.afterBody, f), t.y -= o
                }
                drawFooter(t, e, i) {
                    const n = this.footer,
                        o = n.length;
                    let a, r;
                    if (o) {
                        const h = (0, s.az)(i.rtl, this.x, this.width);
                        for (t.x = be(this, i.footerAlign, i), t.y += i.footerMarginTop, e.textAlign = h.textAlign(i.footerAlign), e.textBaseline = "middle", a = (0, s.a0)(i.footerFont), e.fillStyle = i.footerColor, e.font = a.string, r = 0; r < o; ++r) e.fillText(n[r], h.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + i.footerSpacing
                    }
                }
                drawBackground(t, e, i, n) {
                    const {
                        xAlign: o,
                        yAlign: a
                    } = this, {
                        x: r,
                        y: h
                    } = t, {
                        width: l,
                        height: c
                    } = i, {
                        topLeft: d,
                        topRight: u,
                        bottomLeft: g,
                        bottomRight: p
                    } = (0, s.aw)(n.cornerRadius);
                    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(r + d, h), "top" === a && this.drawCaret(t, e, i, n), e.lineTo(r + l - u, h), e.quadraticCurveTo(r + l, h, r + l, h + u), "center" === a && "right" === o && this.drawCaret(t, e, i, n), e.lineTo(r + l, h + c - p), e.quadraticCurveTo(r + l, h + c, r + l - p, h + c), "bottom" === a && this.drawCaret(t, e, i, n), e.lineTo(r + g, h + c), e.quadraticCurveTo(r, h + c, r, h + c - g), "center" === a && "left" === o && this.drawCaret(t, e, i, n), e.lineTo(r, h + d), e.quadraticCurveTo(r, h, r + d, h), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke()
                }
                _updateAnimationTarget(t) {
                    const e = this.chart,
                        i = this.$animations,
                        s = i && i.x,
                        n = i && i.y;
                    if (s || n) {
                        const i = de[t.position].call(this, this._active, this._eventPosition);
                        if (!i) return;
                        const o = this._size = fe(this, t),
                            a = Object.assign({}, i, this._size),
                            r = xe(e, t, a),
                            h = _e(t, a, r, e);
                        s._to === h.x && n._to === h.y || (this.xAlign = r.xAlign, this.yAlign = r.yAlign, this.width = o.width, this.height = o.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, h))
                    }
                }
                _willRender() {
                    return !!this.opacity
                }
                draw(t) {
                    const e = this.options.setContext(this.getContext());
                    let i = this.opacity;
                    if (!i) return;
                    this._updateAnimationTarget(e);
                    const n = {
                            width: this.width,
                            height: this.height
                        },
                        o = {
                            x: this.x,
                            y: this.y
                        };
                    i = Math.abs(i) < .001 ? 0 : i;
                    const a = (0, s.E)(e.padding),
                        r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
                    e.enabled && r && (t.save(), t.globalAlpha = i, this.drawBackground(o, t, n, e), (0, s.aA)(t, e.textDirection), o.y += a.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), (0, s.aC)(t, e.textDirection), t.restore())
                }
                getActiveElements() {
                    return this._active || []
                }
                setActiveElements(t, e) {
                    const i = this._active,
                        n = t.map((({
                            datasetIndex: t,
                            index: e
                        }) => {
                            const i = this.chart.getDatasetMeta(t);
                            if (!i) throw new Error("Cannot find a dataset at index " + t);
                            return {
                                datasetIndex: t,
                                element: i.data[e],
                                index: e
                            }
                        })),
                        o = !(0, s.ah)(i, n),
                        a = this._positionChanged(n, e);
                    (o || a) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0))
                }
                handleEvent(t, e, i = !0) {
                    if (e && this._ignoreReplayEvents) return !1;
                    this._ignoreReplayEvents = !1;
                    const n = this.options,
                        o = this._active || [],
                        a = this._getActiveElements(t, o, e, i),
                        r = this._positionChanged(a, t),
                        h = e || !(0, s.ah)(a, o) || r;
                    return h && (this._active = a, (n.enabled || n.external) && (this._eventPosition = {
                        x: t.x,
                        y: t.y
                    }, this.update(!0, e))), h
                }
                _getActiveElements(t, e, i, s) {
                    const n = this.options;
                    if ("mouseout" === t.type) return [];
                    if (!s) return e;
                    const o = this.chart.getElementsAtEventForMode(t, n.mode, n, i);
                    return n.reverse && o.reverse(), o
                }
                _positionChanged(t, e) {
                    const {
                        caretX: i,
                        caretY: s,
                        options: n
                    } = this, o = de[n.position].call(this, t, e);
                    return !1 !== o && (i !== o.x || s !== o.y)
                }
            }
            var Se = {
                id: "tooltip",
                _element: Me,
                positioners: de,
                afterInit(t, e, i) {
                    i && (t.tooltip = new Me({
                        chart: t,
                        options: i
                    }))
                },
                beforeUpdate(t, e, i) {
                    t.tooltip && t.tooltip.initialize(i)
                },
                reset(t, e, i) {
                    t.tooltip && t.tooltip.initialize(i)
                },
                afterDraw(t) {
                    const e = t.tooltip;
                    if (e && e._willRender()) {
                        const i = {
                            tooltip: e
                        };
                        if (!1 === t.notifyPlugins("beforeTooltipDraw", { ...i,
                                cancelable: !0
                            })) return;
                        e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i)
                    }
                },
                afterEvent(t, e) {
                    if (t.tooltip) {
                        const i = e.replay;
                        t.tooltip.handleEvent(e.event, i, e.inChartArea) && (e.changed = !0)
                    }
                },
                defaults: {
                    enabled: !0,
                    external: null,
                    position: "average",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleColor: "#fff",
                    titleFont: {
                        weight: "bold"
                    },
                    titleSpacing: 2,
                    titleMarginBottom: 6,
                    titleAlign: "left",
                    bodyColor: "#fff",
                    bodySpacing: 2,
                    bodyFont: {},
                    bodyAlign: "left",
                    footerColor: "#fff",
                    footerSpacing: 2,
                    footerMarginTop: 6,
                    footerFont: {
                        weight: "bold"
                    },
                    footerAlign: "left",
                    padding: 6,
                    caretPadding: 2,
                    caretSize: 5,
                    cornerRadius: 6,
                    boxHeight: (t, e) => e.bodyFont.size,
                    boxWidth: (t, e) => e.bodyFont.size,
                    multiKeyBackground: "#fff",
                    displayColors: !0,
                    boxPadding: 0,
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    animation: {
                        duration: 400,
                        easing: "easeOutQuart"
                    },
                    animations: {
                        numbers: {
                            type: "number",
                            properties: ["x", "y", "width", "height", "caretX", "caretY"]
                        },
                        opacity: {
                            easing: "linear",
                            duration: 200
                        }
                    },
                    callbacks: we
                },
                defaultRoutes: {
                    bodyFont: "font",
                    footerFont: "font",
                    titleFont: "font"
                },
                descriptors: {
                    _scriptable: t => "filter" !== t && "itemSort" !== t && "external" !== t,
                    _indexable: !1,
                    callbacks: {
                        _scriptable: !1,
                        _indexable: !1
                    },
                    animation: {
                        _fallback: !1
                    },
                    animations: {
                        _fallback: "animation"
                    }
                },
                additionalOptionScopes: ["interaction"]
            };

            function De(t, e, i, s) {
                const n = t.indexOf(e);
                if (-1 === n) return ((t, e, i, s) => ("string" === typeof e ? (i = t.push(e) - 1, s.unshift({
                    index: i,
                    label: e
                })) : isNaN(e) && (i = null), i))(t, e, i, s);
                return n !== t.lastIndexOf(e) ? i : n
            }

            function Ce(t) {
                const e = this.getLabels();
                return t >= 0 && t < e.length ? e[t] : t
            }
            class Ae extends ft {
                static id = "category";
                static defaults = {
                    ticks: {
                        callback: Ce
                    }
                };
                constructor(t) {
                    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = []
                }
                init(t) {
                    const e = this._addedLabels;
                    if (e.length) {
                        const t = this.getLabels();
                        for (const {
                                index: i,
                                label: s
                            } of e) t[i] === s && t.splice(i, 1);
                        this._addedLabels = []
                    }
                    super.init(t)
                }
                parse(t, e) {
                    if ((0, s.k)(t)) return null;
                    const i = this.getLabels();
                    return ((t, e) => null === t ? null : (0, s.S)(Math.round(t), 0, e))(e = isFinite(e) && i[e] === t ? e : De(i, t, (0, s.v)(e, t), this._addedLabels), i.length - 1)
                }
                determineDataLimits() {
                    const {
                        minDefined: t,
                        maxDefined: e
                    } = this.getUserBounds();
                    let {
                        min: i,
                        max: s
                    } = this.getMinMax(!0);
                    "ticks" === this.options.bounds && (t || (i = 0), e || (s = this.getLabels().length - 1)), this.min = i, this.max = s
                }
                buildTicks() {
                    const t = this.min,
                        e = this.max,
                        i = this.options.offset,
                        s = [];
                    let n = this.getLabels();
                    n = 0 === t && e === n.length - 1 ? n : n.slice(t, e + 1), this._valueRange = Math.max(n.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? .5 : 0);
                    for (let o = t; o <= e; o++) s.push({
                        value: o
                    });
                    return s
                }
                getLabelForValue(t) {
                    return Ce.call(this, t)
                }
                configure() {
                    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels)
                }
                getPixelForValue(t) {
                    return "number" !== typeof t && (t = this.parse(t)), null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
                }
                getPixelForTick(t) {
                    const e = this.ticks;
                    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value)
                }
                getValueForPixel(t) {
                    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange)
                }
                getBasePixel() {
                    return this.bottom
                }
            }

            function Pe(t, e, {
                horizontal: i,
                minRotation: n
            }) {
                const o = (0, s.t)(n),
                    a = (i ? Math.sin(o) : Math.cos(o)) || .001,
                    r = .75 * e * ("" + t).length;
                return Math.min(e / a, r)
            }
            class Oe extends ft {
                constructor(t) {
                    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0
                }
                parse(t, e) {
                    return (0, s.k)(t) || ("number" === typeof t || t instanceof Number) && !isFinite(+t) ? null : +t
                }
                handleTickRangeOptions() {
                    const {
                        beginAtZero: t
                    } = this.options, {
                        minDefined: e,
                        maxDefined: i
                    } = this.getUserBounds();
                    let {
                        min: n,
                        max: o
                    } = this;
                    const a = t => n = e ? n : t,
                        r = t => o = i ? o : t;
                    if (t) {
                        const t = (0, s.s)(n),
                            e = (0, s.s)(o);
                        t < 0 && e < 0 ? r(0) : t > 0 && e > 0 && a(0)
                    }
                    if (n === o) {
                        let e = 0 === o ? 1 : Math.abs(.05 * o);
                        r(o + e), t || a(n - e)
                    }
                    this.min = n, this.max = o
                }
                getTickLimit() {
                    const t = this.options.ticks;
                    let e, {
                        maxTicksLimit: i,
                        stepSize: s
                    } = t;
                    return s ? (e = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, e > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${e} ticks. Limiting to 1000.`), e = 1e3)) : (e = this.computeTickLimit(), i = i || 11), i && (e = Math.min(i, e)), e
                }
                computeTickLimit() {
                    return Number.POSITIVE_INFINITY
                }
                buildTicks() {
                    const t = this.options,
                        e = t.ticks;
                    let i = this.getTickLimit();
                    i = Math.max(2, i);
                    const n = function(t, e) {
                        const i = [],
                            {
                                bounds: n,
                                step: o,
                                min: a,
                                max: r,
                                precision: h,
                                count: l,
                                maxTicks: c,
                                maxDigits: d,
                                includeBounds: u
                            } = t,
                            g = o || 1,
                            p = c - 1,
                            {
                                min: f,
                                max: m
                            } = e,
                            x = !(0, s.k)(a),
                            _ = !(0, s.k)(r),
                            b = !(0, s.k)(l),
                            v = (m - f) / (d + 1);
                        let y, w, k, M, S = (0, s.aH)((m - f) / p / g) * g;
                        if (S < 1e-14 && !x && !_) return [{
                            value: f
                        }, {
                            value: m
                        }];
                        M = Math.ceil(m / S) - Math.floor(f / S), M > p && (S = (0, s.aH)(M * S / p / g) * g), (0, s.k)(h) || (y = Math.pow(10, h), S = Math.ceil(S * y) / y), "ticks" === n ? (w = Math.floor(f / S) * S, k = Math.ceil(m / S) * S) : (w = f, k = m), x && _ && o && (0, s.aI)((r - a) / o, S / 1e3) ? (M = Math.round(Math.min((r - a) / S, c)), S = (r - a) / M, w = a, k = r) : b ? (w = x ? a : w, k = _ ? r : k, M = l - 1, S = (k - w) / M) : (M = (k - w) / S, M = (0, s.aJ)(M, Math.round(M), S / 1e3) ? Math.round(M) : Math.ceil(M));
                        const D = Math.max((0, s.aK)(S), (0, s.aK)(w));
                        y = Math.pow(10, (0, s.k)(h) ? D : h), w = Math.round(w * y) / y, k = Math.round(k * y) / y;
                        let C = 0;
                        for (x && (u && w !== a ? (i.push({
                                value: a
                            }), w < a && C++, (0, s.aJ)(Math.round((w + C * S) * y) / y, a, Pe(a, v, t)) && C++) : w < a && C++); C < M; ++C) {
                            const t = Math.round((w + C * S) * y) / y;
                            if (_ && t > r) break;
                            i.push({
                                value: t
                            })
                        }
                        return _ && u && k !== r ? i.length && (0, s.aJ)(i[i.length - 1].value, r, Pe(r, v, t)) ? i[i.length - 1].value = r : i.push({
                            value: r
                        }) : _ && k !== r || i.push({
                            value: k
                        }), i
                    }({
                        maxTicks: i,
                        bounds: t.bounds,
                        min: t.min,
                        max: t.max,
                        precision: e.precision,
                        step: e.stepSize,
                        count: e.count,
                        maxDigits: this._maxDigits(),
                        horizontal: this.isHorizontal(),
                        minRotation: e.minRotation || 0,
                        includeBounds: !1 !== e.includeBounds
                    }, this._range || this);
                    return "ticks" === t.bounds && (0, s.aG)(n, this, "value"), t.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n
                }
                configure() {
                    const t = this.ticks;
                    let e = this.min,
                        i = this.max;
                    if (super.configure(), this.options.offset && t.length) {
                        const s = (i - e) / Math.max(t.length - 1, 1) / 2;
                        e -= s, i += s
                    }
                    this._startValue = e, this._endValue = i, this._valueRange = i - e
                }
                getLabelForValue(t) {
                    return (0, s.o)(t, this.chart.options.locale, this.options.ticks.format)
                }
            }
            class Ee extends Oe {
                static id = "linear";
                static defaults = {
                    ticks: {
                        callback: s.aL.formatters.numeric
                    }
                };
                determineDataLimits() {
                    const {
                        min: t,
                        max: e
                    } = this.getMinMax(!0);
                    this.min = (0, s.g)(t) ? t : 0, this.max = (0, s.g)(e) ? e : 1, this.handleTickRangeOptions()
                }
                computeTickLimit() {
                    const t = this.isHorizontal(),
                        e = t ? this.width : this.height,
                        i = (0, s.t)(this.options.ticks.minRotation),
                        n = (t ? Math.sin(i) : Math.cos(i)) || .001,
                        o = this._resolveTickFontOptions(0);
                    return Math.ceil(e / Math.min(40, o.lineHeight / n))
                }
                getPixelForValue(t) {
                    return null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
                }
                getValueForPixel(t) {
                    return this._startValue + this.getDecimalForPixel(t) * this._valueRange
                }
            }
            s.aL.formatters.logarithmic;
            s.aL.formatters.numeric
        }
    }
]);
//# sourceMappingURL=buildstatic/chunks/2272ea81-45527eae36504000.js.map