! function() {
    "use strict";

    function e(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }

    function t(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var r, n = ["longtask", "resource"],
        o = function() {
            function r(t) {
                var o = this;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, r), this.measures = [], this.subscription = new Map, !("PerformanceObserver" in window) || !("performance" in window) || ! function() {
                        return "PerformanceObserver" in window && n.every((function(e) {
                            return PerformanceObserver.supportedEntryTypes.includes(e)
                        }))
                    }) return console.warn("Performance API not supported."), void(this.observer = {
                    observe: function() {
                        return null
                    },
                    takeRecords: function() {
                        return []
                    },
                    disconnect: function() {
                        return null
                    }
                });
                this.observer = new PerformanceObserver((function(r) {
                    r.getEntries().forEach((function(r) {
                        var n, i, s, a = [];
                        if ("longtask" === r.entryType) n = "longtask", a.push({
                            name: n,
                            startTime: r.startTime,
                            duration: r.duration,
                            detail: {
                                name: r.name
                            }
                        });
                        else {
                            var u = null == t ? void 0 : t.some((function(e) {
                                return r.name.includes(e)
                            }));
                            "script" === r.initiatorType && u ? (n = "resource_timing", a.push({
                                name: n,
                                startTime: r.fetchStart,
                                duration: r.responseEnd - r.fetchStart,
                                detail: {
                                    name: r.name
                                }
                            }), a.push({
                                name: "resource_prefetch",
                                startTime: r.domainLookupStart,
                                duration: r.requestStart - r.domainLookupStart,
                                detail: {
                                    name: r.name
                                }
                            })) : "xmlhttprequest" === r.initiatorType && u && (n = !r.responseStatus || r.responseStatus >= 200 && r.responseStatus < 400 ? "request_latency" : "request_error", a.push({
                                name: n,
                                startTime: r.fetchStart,
                                duration: r.responseEnd - r.fetchStart,
                                detail: {
                                    name: r.name,
                                    responseStatus: r.responseStatus
                                }
                            }))
                        }
                        a.length && (o.measures = [].concat(a, function(t) {
                            if (Array.isArray(t)) return e(t)
                        }(s = o.measures) || function(e) {
                            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
                        }(s) || function(t, r) {
                            if (t) {
                                if ("string" == typeof t) return e(t, r);
                                var n = Object.prototype.toString.call(t).slice(8, -1);
                                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? e(t, r) : void 0
                            }
                        }(s) || function() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()), n && o.subscription.has(n) && (null === (i = o.subscription.get(n)) || void 0 === i || i(a, r)))
                    }))
                }))
            }
            var o, i;
            return o = r, i = [{
                key: "start",
                value: function(e) {
                    var t = this,
                        r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    r ? e.forEach((function(e) {
                        t.observer.observe({
                            type: e,
                            buffered: r
                        })
                    })) : this.observer.observe({
                        entryTypes: e
                    })
                }
            }, {
                key: "stop",
                value: function() {
                    this.observer.disconnect()
                }
            }, {
                key: "get",
                value: function(e) {
                    return this.measures.filter((function(t) {
                        return t.name === e
                    }))
                }
            }, {
                key: "report",
                value: function() {
                    return this.measures
                }
            }, {
                key: "clear",
                value: function() {
                    this.measures = []
                }
            }, {
                key: "subscribe",
                value: function(e, t) {
                    this.subscription.set(e, t)
                }
            }, {
                key: "unsubscribe",
                value: function(e) {
                    this.subscription.delete(e)
                }
            }], i && t(o.prototype, i), r
        }(),
        i = function(e) {
            var t = {
                    "content.hotjar.io": "page-content-upload",
                    "verify-installation/auto": "verify-installation",
                    "vc.hotjar.io/sessions": "view-counter"
                },
                r = Object.keys(t).find((function(t) {
                    return e.includes(t)
                }));
            return r && t[r]
        },
        s = function(e) {
            e.forEach((function(e) {
                var t, r, n = (t = e.detail.name).substring(t.lastIndexOf("/") + 1).split("?")[0],
                    o = {
                        resource_timing: "resource-fetch-time",
                        resource_prefetch: "resource-prefetch-time"
                    }[e.name];
                (null == n ? void 0 : n.includes("hotjar")) ? r = "hotjar-js": (null == n ? void 0 : n.includes("modules")) && (r = "modules-js"), r && o && e.startTime > 0 && hj.metrics.timeEnd(o, {
                    tag: {
                        resource: r
                    },
                    total: e.duration,
                    type: "lab"
                })
            }))
        },
        a = function(e) {
            e.forEach((function(e) {
                var t = i(e.detail.name);
                t && e.startTime > 0 && hj.metrics.timeEnd("api-request-latency", {
                    tag: {
                        request: t
                    },
                    total: e.duration
                })
            }))
        },
        u = function(e) {
            e.forEach((function(e) {
                var t, r = i(e.detail.name);
                r && hj.metrics.count("api-request-error", {
                    tag: {
                        request: r
                    },
                    extraTags: {
                        "status-code": (null === (t = e.detail.responseStatus) || void 0 === t ? void 0 : t.toString()) || ""
                    }
                })
            }))
        };
    ! function() {
        try {
            ! function() {
                r = new o(["hotjar.com", "hotjar.io"]);
                var e = function() {
                    r.subscribe("resource_timing", s), r.subscribe("request_latency", a), r.subscribe("request_error", u), r.start(["resource"])
                };
                "requestIdleCallback" in window ? requestIdleCallback((function() {
                    return e()
                })) : "requestAnimationFrame" in window ? requestAnimationFrame((function() {
                    return e()
                })) : setTimeout((function() {
                    return e()
                }), 100)
            }()
        } catch (e) {}
    }()
}();