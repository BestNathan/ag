var egret = require('./egret')

var __reflect = this && this.__reflect || function(t, e, i) {
    t.__class__ = e,
    i ? i.push(e) : i = [e],
    t.__types__ = t.__types__ ? i.concat(t.__types__) : i
}
, __extends = this && this.__extends || function() {
    var t = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] = e[i])
    }
    ;
    return function(e, i) {
        function n() {
            this.constructor = e
        }
        t(e, i),
        e.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype,
        new n)
    }
}(), eui;
!function(t) {
    var e;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.targetLevel = Number.POSITIVE_INFINITY,
                e.invalidatePropertiesFlag = !1,
                e.invalidateClientPropertiesFlag = !1,
                e.invalidatePropertiesQueue = new i,
                e.invalidateSizeFlag = !1,
                e.invalidateClientSizeFlag = !1,
                e.invalidateSizeQueue = new i,
                e.invalidateDisplayListFlag = !1,
                e.invalidateDisplayListQueue = new i,
                e.eventDisplay = new egret.Bitmap,
                e.listenersAttached = !1,
                e
            }
            return __extends(e, t),
            e.prototype.invalidateProperties = function(t) {
                this.invalidatePropertiesFlag || (this.invalidatePropertiesFlag = !0,
                this.listenersAttached || this.attachListeners()),
                this.targetLevel <= t.$nestLevel && (this.invalidateClientPropertiesFlag = !0),
                this.invalidatePropertiesQueue.insert(t)
            }
            ,
            e.prototype.validateProperties = function() {
                for (var t = this.invalidatePropertiesQueue, e = t.shift(); e; )
                    e.$stage && e.validateProperties(),
                    e = t.shift();
                t.isEmpty() && (this.invalidatePropertiesFlag = !1)
            }
            ,
            e.prototype.invalidateSize = function(t) {
                this.invalidateSizeFlag || (this.invalidateSizeFlag = !0,
                this.listenersAttached || this.attachListeners()),
                this.targetLevel <= t.$nestLevel && (this.invalidateClientSizeFlag = !0),
                this.invalidateSizeQueue.insert(t)
            }
            ,
            e.prototype.validateSize = function() {
                for (var t = this.invalidateSizeQueue, e = t.pop(); e; )
                    e.$stage && e.validateSize(),
                    e = t.pop();
                t.isEmpty() && (this.invalidateSizeFlag = !1)
            }
            ,
            e.prototype.invalidateDisplayList = function(t) {
                this.invalidateDisplayListFlag || (this.invalidateDisplayListFlag = !0,
                this.listenersAttached || this.attachListeners()),
                this.invalidateDisplayListQueue.insert(t)
            }
            ,
            e.prototype.validateDisplayList = function() {
                for (var t = this.invalidateDisplayListQueue, e = t.shift(); e; )
                    e.$stage && e.validateDisplayList(),
                    e = t.shift();
                t.isEmpty() && (this.invalidateDisplayListFlag = !1)
            }
            ,
            e.prototype.attachListeners = function() {
                this.eventDisplay.addEventListener(egret.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this),
                this.eventDisplay.addEventListener(egret.Event.RENDER, this.doPhasedInstantiationCallBack, this),
                egret.sys.$invalidateRenderFlag = !0,
                this.listenersAttached = !0
            }
            ,
            e.prototype.doPhasedInstantiationCallBack = function(t) {
                this.eventDisplay.removeEventListener(egret.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this),
                this.eventDisplay.removeEventListener(egret.Event.RENDER, this.doPhasedInstantiationCallBack, this),
                this.doPhasedInstantiation()
            }
            ,
            e.prototype.doPhasedInstantiation = function() {
                this.invalidatePropertiesFlag && this.validateProperties(),
                this.invalidateSizeFlag && this.validateSize(),
                this.invalidateDisplayListFlag && this.validateDisplayList(),
                this.invalidatePropertiesFlag || this.invalidateSizeFlag || this.invalidateDisplayListFlag ? this.attachListeners() : this.listenersAttached = !1
            }
            ,
            e.prototype.validateClient = function(t) {
                var e, i = !1, n = this.targetLevel;
                this.targetLevel === Number.POSITIVE_INFINITY && (this.targetLevel = t.$nestLevel);
                for (var r = this.invalidatePropertiesQueue, o = this.invalidateSizeQueue, s = this.invalidateDisplayListQueue; !i; ) {
                    for (i = !0,
                    e = r.removeSmallestChild(t); e; )
                        e.$stage && e.validateProperties(),
                        e = r.removeSmallestChild(t);
                    for (r.isEmpty() && (this.invalidatePropertiesFlag = !1),
                    this.invalidateClientPropertiesFlag = !1,
                    e = o.removeLargestChild(t); e; ) {
                        if (e.$stage && e.validateSize(),
                        this.invalidateClientPropertiesFlag && (e = r.removeSmallestChild(t))) {
                            r.insert(e),
                            i = !1;
                            break
                        }
                        e = o.removeLargestChild(t)
                    }
                    for (o.isEmpty() && (this.invalidateSizeFlag = !1),
                    this.invalidateClientPropertiesFlag = !1,
                    this.invalidateClientSizeFlag = !1,
                    e = s.removeSmallestChild(t); e; ) {
                        if (e.$stage && e.validateDisplayList(),
                        this.invalidateClientPropertiesFlag && (e = r.removeSmallestChild(t))) {
                            r.insert(e),
                            i = !1;
                            break
                        }
                        if (this.invalidateClientSizeFlag && (e = o.removeLargestChild(t))) {
                            o.insert(e),
                            i = !1;
                            break
                        }
                        e = s.removeSmallestChild(t)
                    }
                    s.isEmpty() && (this.invalidateDisplayListFlag = !1)
                }
                n === Number.POSITIVE_INFINITY && (this.targetLevel = Number.POSITIVE_INFINITY)
            }
            ,
            e
        }(egret.EventDispatcher);
        t.Validator = e,
        __reflect(e.prototype, "eui.sys.Validator");
        var i = function() {
            function t() {
                this.depthBins = {},
                this.minDepth = 0,
                this.maxDepth = -1
            }
            return t.prototype.insert = function(t) {
                var e = t.$nestLevel;
                this.maxDepth < this.minDepth ? this.minDepth = this.maxDepth = e : (e < this.minDepth && (this.minDepth = e),
                e > this.maxDepth && (this.maxDepth = e));
                var i = this.depthBins[e];
                i || (i = this.depthBins[e] = new n),
                i.insert(t)
            }
            ,
            t.prototype.pop = function() {
                var t, e = this.minDepth;
                if (e <= this.maxDepth) {
                    for (var i = this.depthBins[this.maxDepth]; !i || 0 === i.length; ) {
                        if (this.maxDepth--,
                        this.maxDepth < e)
                            return null;
                        i = this.depthBins[this.maxDepth]
                    }
                    for (t = i.pop(); !(i && 0 != i.length || (this.maxDepth--,
                    this.maxDepth < e)); )
                        i = this.depthBins[this.maxDepth]
                }
                return t
            }
            ,
            t.prototype.shift = function() {
                var t, e = this.maxDepth;
                if (this.minDepth <= e) {
                    for (var i = this.depthBins[this.minDepth]; !i || 0 === i.length; ) {
                        if (this.minDepth++,
                        this.minDepth > e)
                            return null;
                        i = this.depthBins[this.minDepth]
                    }
                    for (t = i.pop(); !(i && 0 != i.length || (this.minDepth++,
                    this.minDepth > e)); )
                        i = this.depthBins[this.minDepth]
                }
                return t
            }
            ,
            t.prototype.removeLargestChild = function(t) {
                for (var e = t.$hashCode, i = t.$nestLevel, n = this.maxDepth, r = i; n >= r; ) {
                    var o = this.depthBins[n];
                    if (o && o.length > 0) {
                        if (n === i) {
                            if (o.map[e])
                                return o.remove(t),
                                t
                        } else {
                            if (!egret.is(t, "egret.DisplayObjectContainer"))
                                break;
                            for (var s = o.items, a = o.length, h = 0; a > h; h++) {
                                var l = s[h];
                                if (t.contains(l))
                                    return o.remove(l),
                                    l
                            }
                        }
                        n--
                    } else if (n == this.maxDepth && this.maxDepth--,
                    n--,
                    r > n)
                        break
                }
                return null
            }
            ,
            t.prototype.removeSmallestChild = function(t) {
                for (var e = t.$nestLevel, i = e, n = this.maxDepth, r = t.$hashCode; n >= i; ) {
                    var o = this.depthBins[i];
                    if (o && o.length > 0) {
                        if (i === e) {
                            if (o.map[r])
                                return o.remove(t),
                                t
                        } else {
                            if (!egret.is(t, "egret.DisplayObjectContainer"))
                                break;
                            for (var s = o.items, a = o.length, h = 0; a > h; h++) {
                                var l = s[h];
                                if (t.contains(l))
                                    return o.remove(l),
                                    l
                            }
                        }
                        i++
                    } else if (i == this.minDepth && this.minDepth++,
                    i++,
                    i > n)
                        break
                }
                return null
            }
            ,
            t.prototype.isEmpty = function() {
                return this.minDepth > this.maxDepth
            }
            ,
            t
        }();
        __reflect(i.prototype, "DepthQueue");
        var n = function() {
            function t() {
                this.map = {},
                this.items = [],
                this.length = 0
            }
            return t.prototype.insert = function(t) {
                var e = t.$hashCode;
                this.map[e] || (this.map[e] = !0,
                this.length++,
                this.items.push(t))
            }
            ,
            t.prototype.pop = function() {
                var t = this.items.pop();
                return t && (this.length--,
                0 === this.length ? this.map = {} : this.map[t.$hashCode] = !1),
                t
            }
            ,
            t.prototype.remove = function(t) {
                var e = this.items.indexOf(t);
                e >= 0 && (this.items.splice(e, 1),
                this.length--,
                0 === this.length ? this.map = {} : this.map[t.$hashCode] = !1)
            }
            ,
            t
        }();
        __reflect(n.prototype, "DepthBin")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    function e(t, e, i, n) {
        var r = t.prototype;
        r.__meta__ = r.__meta__ || {},
        r.__meta__[e] = i,
        n && (r.__defaultProperty__ = e)
    }
    t.registerProperty = e
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i(t, i) {
            void 0 === i && (i = []);
            var n = e.call(this) || this;
            return n.name = t,
            n.overrides = i,
            n
        }
        return __extends(i, e),
        i.prototype.initialize = function(e, i) {
            for (var n = this.overrides, r = n.length, o = 0; r > o; o++) {
                var s = n[o];
                if (s instanceof t.AddItems) {
                    var a = e[s.target];
                    a && a instanceof t.Image && !a.$parent && (i.addChild(a),
                    i.removeChild(a))
                }
            }
        }
        ,
        i
    }(egret.HashObject);
    t.State = e,
    __reflect(e.prototype, "eui.State")
}(eui || (eui = {})),
function(t) {
    var e;
    !function(t) {
        var e = function() {
            function t() {}
            return Object.defineProperty(t.prototype, "states", {
                get: function() {
                    return this.$stateValues.states
                },
                set: function(t) {
                    t || (t = []);
                    var e = this.$stateValues;
                    e.states = t;
                    for (var i = {}, n = t.length, r = 0; n > r; r++) {
                        var o = t[r];
                        i[o.name] = o
                    }
                    e.statesMap = i,
                    e.parent && this.commitCurrentState()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "currentState", {
                get: function() {
                    return this.$stateValues.currentState
                },
                set: function(t) {
                    var e = this.$stateValues;
                    e.explicitState = t,
                    e.currentState = t,
                    this.commitCurrentState()
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.commitCurrentState = function() {
                var t = this.$stateValues;
                if (t.parent) {
                    var e = t.statesMap[t.currentState];
                    if (!e) {
                        if (!(t.states.length > 0))
                            return;
                        t.currentState = t.states[0].name
                    }
                    if (t.oldState != t.currentState) {
                        var i = t.parent
                          , n = t.statesMap[t.oldState];
                        if (n)
                            for (var r = n.overrides, o = r.length, s = 0; o > s; s++)
                                r[s].remove(this, i);
                        if (t.oldState = t.currentState,
                        n = t.statesMap[t.currentState])
                            for (var r = n.overrides, a = r.length, s = 0; a > s; s++)
                                r[s].apply(this, i)
                    }
                }
            }
            ,
            t.prototype.hasState = function(t) {
                return !!this.$stateValues.statesMap[t]
            }
            ,
            t.prototype.initializeStates = function(t) {
                this.$stateValues.intialized = !0;
                for (var e = this.states, i = e.length, n = 0; i > n; n++)
                    e[n].initialize(this, t)
            }
            ,
            t
        }();
        t.StateClient = e,
        __reflect(e.prototype, "eui.sys.StateClient");
        var i = function() {
            function t() {
                this.intialized = !1,
                this.statesMap = {},
                this.states = [],
                this.oldState = null,
                this.explicitState = null,
                this.currentState = null,
                this.parent = null,
                this.stateIsDirty = !1
            }
            return t
        }();
        t.StateValues = i,
        __reflect(i.prototype, "eui.sys.StateValues")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    function e(e, i) {
        var n = egret.getImplementation("eui.IAssetAdapter");
        n || (n = new t.DefaultAssetAdapter),
        n.getAsset(e, function(t) {
            i(t)
        }, this)
    }
    function i(e, i) {
        var n = egret.getImplementation("eui.IThemeAdapter");
        n || (n = new t.DefaultThemeAdapter),
        n.getTheme(e, function(t) {
            i(t)
        }, function(t) {
            console.log(t)
        }, this)
    }
    t.getAssets = e,
    t.getTheme = i
}(eui || (eui = {})),
function(t) {
    var e;
    !function(e) {
        function i(t) {
            return 1 === t.a && 0 === t.b && 0 === t.c && 1 === t.d
        }
        function n(t, e) {
            if ("function" != typeof t[e])
                return !1;
            var i = t[e].toString()
              , n = i.indexOf("{")
              , r = i.lastIndexOf("}");
            return i = i.substring(n + 1, r),
            "" == i.trim()
        }
        function r(t, e) {
            for (var i in e)
                "prototype" != i && e.hasOwnProperty(i) && (t[i] = e[i]);
            for (var r = t.prototype, o = e.prototype, s = Object.keys(o), a = s.length, h = 0; a > h; h++) {
                var l = s[h];
                if ("__meta__" != l && (!r.hasOwnProperty(l) || n(r, l))) {
                    var u = Object.getOwnPropertyDescriptor(o, l);
                    Object.defineProperty(r, l, u)
                }
            }
        }
        function o(e, i, n) {
            r(e, h);
            var o = e.prototype;
            o.$super = i.prototype,
            t.registerProperty(e, "left", "Percentage"),
            t.registerProperty(e, "right", "Percentage"),
            t.registerProperty(e, "top", "Percentage"),
            t.registerProperty(e, "bottom", "Percentage"),
            t.registerProperty(e, "horizontalCenter", "Percentage"),
            t.registerProperty(e, "verticalCenter", "Percentage"),
            n && (o.$childAdded = function(t, e) {
                this.invalidateSize(),
                this.invalidateDisplayList()
            }
            ,
            o.$childRemoved = function(t, e) {
                this.invalidateSize(),
                this.invalidateDisplayList()
            }
            )
        }
        var s = "eui.UIComponent"
          , a = new e.Validator
          , h = function(n) {
            function r() {
                var t = n.call(this) || this;
                return t.initializeUIValues(),
                t
            }
            return __extends(r, n),
            r.prototype.initializeUIValues = function() {
                this.$UIComponent = {
                    0: 0 / 0,
                    1: 0 / 0,
                    2: 0 / 0,
                    3: 0 / 0,
                    4: 0 / 0,
                    5: 0 / 0,
                    6: 0 / 0,
                    7: 0 / 0,
                    8: 0 / 0,
                    9: 0 / 0,
                    10: 0,
                    11: 0,
                    12: 0,
                    13: 1e5,
                    14: 0,
                    15: 1e5,
                    16: 0,
                    17: 0,
                    18: 0 / 0,
                    19: 0 / 0,
                    20: 0,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: !0,
                    25: !0,
                    26: !0,
                    27: !1,
                    28: !1,
                    29: !1
                },
                this.$includeInLayout = !0,
                this.$touchEnabled = !0
            }
            ,
            r.prototype.createChildren = function() {}
            ,
            r.prototype.childrenCreated = function() {}
            ,
            r.prototype.commitProperties = function() {
                var e = this.$UIComponent;
                (e[22] != e[10] || e[23] != e[11]) && (this.dispatchEventWith(egret.Event.RESIZE),
                e[22] = e[10],
                e[23] = e[11]),
                (e[20] != this.$getX() || e[21] != this.$getY()) && (t.UIEvent.dispatchUIEvent(this, t.UIEvent.MOVE),
                e[20] = this.$getX(),
                e[21] = this.$getY())
            }
            ,
            r.prototype.measure = function() {}
            ,
            r.prototype.updateDisplayList = function(t, e) {}
            ,
            Object.defineProperty(r.prototype, "includeInLayout", {
                get: function() {
                    return this.$includeInLayout
                },
                set: function(t) {
                    t = !!t,
                    this.$includeInLayout !== t && (this.$includeInLayout = !0,
                    this.invalidateParentLayout(),
                    this.$includeInLayout = t)
                },
                enumerable: !0,
                configurable: !0
            }),
            r.prototype.$onAddToStage = function(e, i) {
                this.$super.$onAddToStage.call(this, e, i),
                this.checkInvalidateFlag();
                var n = this.$UIComponent;
                n[29] || (n[29] = !0,
                this.createChildren(),
                this.childrenCreated(),
                t.UIEvent.dispatchUIEvent(this, t.UIEvent.CREATION_COMPLETE))
            }
            ,
            r.prototype.checkInvalidateFlag = function(t) {
                var e = this.$UIComponent;
                e[24] && a.invalidateProperties(this),
                e[25] && a.invalidateSize(this),
                e[26] && a.invalidateDisplayList(this)
            }
            ,
            Object.defineProperty(r.prototype, "left", {
                get: function() {
                    return this.$UIComponent[0]
                },
                set: function(t) {
                    t = t && "number" != typeof t ? t.toString().trim() : +t;
                    var e = this.$UIComponent;
                    e[0] !== t && (e[0] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "right", {
                get: function() {
                    return this.$UIComponent[1]
                },
                set: function(t) {
                    t = t && "number" != typeof t ? t.toString().trim() : +t;
                    var e = this.$UIComponent;
                    e[1] !== t && (e[1] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "top", {
                get: function() {
                    return this.$UIComponent[2]
                },
                set: function(t) {
                    t = t && "number" != typeof t ? t.toString().trim() : +t;
                    var e = this.$UIComponent;
                    e[2] !== t && (e[2] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "bottom", {
                get: function() {
                    return this.$UIComponent[3]
                },
                set: function(t) {
                    t = t && "number" != typeof t ? t.toString().trim() : +t;
                    var e = this.$UIComponent;
                    e[3] != t && (e[3] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "horizontalCenter", {
                get: function() {
                    return this.$UIComponent[4]
                },
                set: function(t) {
                    t = t && "number" != typeof t ? t.toString().trim() : +t;
                    var e = this.$UIComponent;
                    e[4] !== t && (e[4] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "verticalCenter", {
                get: function() {
                    return this.$UIComponent[5]
                },
                set: function(t) {
                    t = t && "number" != typeof t ? t.toString().trim() : +t;
                    var e = this.$UIComponent;
                    e[5] !== t && (e[5] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "percentWidth", {
                get: function() {
                    return this.$UIComponent[6]
                },
                set: function(t) {
                    t = +t;
                    var e = this.$UIComponent;
                    e[6] !== t && (e[6] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "percentHeight", {
                get: function() {
                    return this.$UIComponent[7]
                },
                set: function(t) {
                    t = +t;
                    var e = this.$UIComponent;
                    e[7] !== t && (e[7] = t,
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "explicitWidth", {
                get: function() {
                    return this.$UIComponent[8]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "explicitHeight", {
                get: function() {
                    return this.$UIComponent[9]
                },
                enumerable: !0,
                configurable: !0
            }),
            r.prototype.$getWidth = function() {
                return this.validateSizeNow(),
                this.$UIComponent[10]
            }
            ,
            r.prototype.$setWidth = function(t) {
                t = +t;
                var e = this.$UIComponent;
                return 0 > t || e[10] === t && e[8] === t ? !1 : (e[8] = t,
                isNaN(t) && this.invalidateSize(),
                this.invalidateProperties(),
                this.invalidateDisplayList(),
                this.invalidateParentLayout(),
                !0)
            }
            ,
            r.prototype.validateSizeNow = function() {
                this.validateSize(!0),
                this.updateFinalSize()
            }
            ,
            r.prototype.$getHeight = function() {
                return this.validateSizeNow(),
                this.$UIComponent[11]
            }
            ,
            r.prototype.$setHeight = function(t) {
                t = +t;
                var e = this.$UIComponent;
                return 0 > t || e[11] === t && e[9] === t ? !1 : (e[9] = t,
                isNaN(t) && this.invalidateSize(),
                this.invalidateProperties(),
                this.invalidateDisplayList(),
                this.invalidateParentLayout(),
                !0)
            }
            ,
            Object.defineProperty(r.prototype, "minWidth", {
                get: function() {
                    return this.$UIComponent[12]
                },
                set: function(t) {
                    t = +t || 0;
                    var e = this.$UIComponent;
                    0 > t || e[12] === t || (e[12] = t,
                    this.invalidateSize(),
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "maxWidth", {
                get: function() {
                    return this.$UIComponent[13]
                },
                set: function(t) {
                    t = +t || 0;
                    var e = this.$UIComponent;
                    0 > t || e[13] === t || (e[13] = t,
                    this.invalidateSize(),
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "minHeight", {
                get: function() {
                    return this.$UIComponent[14]
                },
                set: function(t) {
                    t = +t || 0;
                    var e = this.$UIComponent;
                    0 > t || e[14] === t || (e[14] = t,
                    this.invalidateSize(),
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "maxHeight", {
                get: function() {
                    return this.$UIComponent[15]
                },
                set: function(t) {
                    t = +t || 0;
                    var e = this.$UIComponent;
                    0 > t || e[15] === t || (e[15] = t,
                    this.invalidateSize(),
                    this.invalidateParentLayout())
                },
                enumerable: !0,
                configurable: !0
            }),
            r.prototype.setMeasuredSize = function(t, e) {
                var i = this.$UIComponent;
                i[16] = Math.ceil(+t || 0),
                i[17] = Math.ceil(+e || 0)
            }
            ,
            r.prototype.setActualSize = function(t, e) {
                var i = !1
                  , n = this.$UIComponent;
                n[10] !== t && (n[10] = t,
                i = !0),
                n[11] !== e && (n[11] = e,
                i = !0),
                i && (this.invalidateDisplayList(),
                this.dispatchEventWith(egret.Event.RESIZE))
            }
            ,
            r.prototype.$invalidateMatrix = function() {
                this.$super.$invalidateMatrix.call(this),
                this.invalidateParentLayout()
            }
            ,
            r.prototype.$setMatrix = function(t, e) {
                return void 0 === e && (e = !0),
                this.$super.$setMatrix.call(this, t, e),
                this.invalidateParentLayout(),
                !0
            }
            ,
            r.prototype.$setAnchorOffsetX = function(t) {
                return this.$super.$setAnchorOffsetX.call(this, t),
                this.invalidateParentLayout(),
                !0
            }
            ,
            r.prototype.$setAnchorOffsetY = function(t) {
                return this.$super.$setAnchorOffsetY.call(this, t),
                this.invalidateParentLayout(),
                !0
            }
            ,
            r.prototype.$setX = function(t) {
                var e = this.$super.$setX.call(this, t);
                return e && (this.invalidateParentLayout(),
                this.invalidateProperties()),
                e
            }
            ,
            r.prototype.$setY = function(t) {
                var e = this.$super.$setY.call(this, t);
                return e && (this.invalidateParentLayout(),
                this.invalidateProperties()),
                e
            }
            ,
            r.prototype.invalidateProperties = function() {
                var t = this.$UIComponent;
                t[24] || (t[24] = !0,
                this.$stage && a.invalidateProperties(this))
            }
            ,
            r.prototype.validateProperties = function() {
                var t = this.$UIComponent;
                t[24] && (this.commitProperties(),
                t[24] = !1)
            }
            ,
            r.prototype.invalidateSize = function() {
                var t = this.$UIComponent;
                t[25] || (t[25] = !0,
                this.$stage && a.invalidateSize(this))
            }
            ,
            r.prototype.validateSize = function(t) {
                if (t) {
                    var e = this.$children;
                    if (e)
                        for (var i = e.length, n = 0; i > n; n++) {
                            var r = e[n];
                            egret.is(r, s) && r.validateSize(!0)
                        }
                }
                var o = this.$UIComponent;
                if (o[25]) {
                    var a = this.measureSizes();
                    a && (this.invalidateDisplayList(),
                    this.invalidateParentLayout()),
                    o[25] = !1
                }
            }
            ,
            r.prototype.measureSizes = function() {
                var t = !1
                  , e = this.$UIComponent;
                if (!e[25])
                    return t;
                (isNaN(e[8]) || isNaN(e[9])) && (this.measure(),
                e[16] < e[12] && (e[16] = e[12]),
                e[16] > e[13] && (e[16] = e[13]),
                e[17] < e[14] && (e[17] = e[14]),
                e[17] > e[15] && (e[17] = e[15]));
                var i = this.getPreferredUWidth()
                  , n = this.getPreferredUHeight();
                return (i !== e[18] || n !== e[19]) && (e[18] = i,
                e[19] = n,
                t = !0),
                t
            }
            ,
            r.prototype.invalidateDisplayList = function() {
                var t = this.$UIComponent;
                t[26] || (t[26] = !0,
                this.$stage && a.invalidateDisplayList(this))
            }
            ,
            r.prototype.validateDisplayList = function() {
                var t = this.$UIComponent;
                t[26] && (this.updateFinalSize(),
                this.updateDisplayList(t[10], t[11]),
                t[26] = !1)
            }
            ,
            r.prototype.updateFinalSize = function() {
                var t = 0
                  , e = 0
                  , i = this.$UIComponent;
                t = i[27] ? i[10] : isNaN(i[8]) ? i[16] : i[8],
                e = i[28] ? i[11] : isNaN(i[9]) ? i[17] : i[9],
                this.setActualSize(t, e)
            }
            ,
            r.prototype.validateNow = function() {
                this.$stage && a.validateClient(this)
            }
            ,
            r.prototype.invalidateParentLayout = function() {
                var t = this.$parent;
                t && this.$includeInLayout && egret.is(t, s) && (t.invalidateSize(),
                t.invalidateDisplayList())
            }
            ,
            r.prototype.setLayoutBoundsSize = function(t, n) {
                if (n = +n,
                t = +t,
                !(0 > n || 0 > t)) {
                    var r, o, s = this.$UIComponent, a = s[13], h = s[15], l = Math.min(s[12], a), u = Math.min(s[14], h);
                    isNaN(t) ? (s[27] = !1,
                    r = this.getPreferredUWidth()) : (s[27] = !0,
                    r = Math.max(l, Math.min(a, t))),
                    isNaN(n) ? (s[28] = !1,
                    o = this.getPreferredUHeight()) : (s[28] = !0,
                    o = Math.max(u, Math.min(h, n)));
                    var p = this.getAnchorMatrix();
                    if (i(p))
                        return void this.setActualSize(r, o);
                    var c = e.MatrixUtil.fitBounds(t, n, p, s[8], s[9], this.getPreferredUWidth(), this.getPreferredUHeight(), l, u, a, h);
                    c || (c = egret.Point.create(l, u)),
                    this.setActualSize(c.x, c.y),
                    egret.Point.release(c)
                }
            }
            ,
            r.prototype.setLayoutBoundsPosition = function(e, n) {
                var r = this.$getMatrix();
                if (!i(r) || 0 != this.anchorOffsetX || 0 != this.anchorOffsetY) {
                    var o = egret.$TempRectangle;
                    this.getLayoutBounds(o),
                    e += this.$getX() - o.x,
                    n += this.$getY() - o.y
                }
                var s = this.$super.$setX.call(this, e);
                (this.$super.$setY.call(this, n) || s) && t.UIEvent.dispatchUIEvent(this, t.UIEvent.MOVE)
            }
            ,
            r.prototype.getLayoutBounds = function(t) {
                var e, i = this.$UIComponent;
                e = i[27] ? i[10] : isNaN(i[8]) ? i[16] : i[8];
                var n;
                n = i[28] ? i[11] : isNaN(i[9]) ? i[17] : i[9],
                this.applyMatrix(t, e, n)
            }
            ,
            r.prototype.getPreferredUWidth = function() {
                var t = this.$UIComponent;
                return isNaN(t[8]) ? t[16] : t[8]
            }
            ,
            r.prototype.getPreferredUHeight = function() {
                var t = this.$UIComponent;
                return isNaN(t[9]) ? t[17] : t[9]
            }
            ,
            r.prototype.getPreferredBounds = function(t) {
                var e = this.getPreferredUWidth()
                  , i = this.getPreferredUHeight();
                this.applyMatrix(t, e, i)
            }
            ,
            r.prototype.applyMatrix = function(t, e, n) {
                t.setTo(0, 0, e, n);
                var r = this.getAnchorMatrix();
                i(r) ? (t.x += r.tx,
                t.y += r.ty) : r.$transformBounds(t)
            }
            ,
            r.prototype.getAnchorMatrix = function() {
                var t = this.$getMatrix()
                  , e = this.anchorOffsetX
                  , i = this.anchorOffsetY;
                if (0 != e || 0 != i) {
                    var n = egret.$TempMatrix;
                    return t.$preMultiplyInto(n.setTo(1, 0, 0, 1, -e, -i), n),
                    n
                }
                return t
            }
            ,
            r
        }(egret.DisplayObject);
        e.UIComponentImpl = h,
        __reflect(h.prototype, "eui.sys.UIComponentImpl", ["eui.UIComponent", "egret.DisplayObject"]),
        e.mixin = r,
        e.implementUIComponent = o
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$layout = null,
            i.$stateValues = new t.sys.StateValues,
            i.initializeUIValues(),
            i.$Group = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: !1,
                5: !1
            },
            i.$stateValues.parent = i,
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "elementsContent", {
            set: function(t) {
                if (t)
                    for (var e = t.length, i = 0; e > i; i++)
                        this.addChild(t[i])
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "layout", {
            get: function() {
                return this.$layout
            },
            set: function(t) {
                this.$setLayout(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setLayout = function(t) {
            return this.$layout == t ? !1 : (this.$layout && (this.$layout.target = null),
            this.$layout = t,
            t && (t.target = this),
            this.invalidateSize(),
            this.invalidateDisplayList(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "contentWidth", {
            get: function() {
                return this.$Group[0]
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "contentHeight", {
            get: function() {
                return this.$Group[1]
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setContentSize = function(e, i) {
            e = Math.ceil(+e || 0),
            i = Math.ceil(+i || 0);
            var n = this.$Group
              , r = n[0] !== e
              , o = n[1] !== i;
            (r || o) && (n[0] = e,
            n[1] = i,
            r && t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "contentWidth"),
            o && t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "contentHeight"))
        }
        ,
        Object.defineProperty(i.prototype, "scrollEnabled", {
            get: function() {
                return this.$Group[4]
            },
            set: function(t) {
                t = !!t;
                var e = this.$Group;
                t !== e[4] && (e[4] = t,
                this.updateScrollRect())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "scrollH", {
            get: function() {
                return this.$Group[2]
            },
            set: function(e) {
                e = +e || 0;
                var i = this.$Group;
                e !== i[2] && (i[2] = e,
                this.updateScrollRect() && this.$layout && this.$layout.scrollPositionChanged(),
                t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "scrollH"))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "scrollV", {
            get: function() {
                return this.$Group[3]
            },
            set: function(e) {
                e = +e || 0;
                var i = this.$Group;
                e != i[3] && (i[3] = e,
                this.updateScrollRect() && this.$layout && this.$layout.scrollPositionChanged(),
                t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "scrollV"))
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.updateScrollRect = function() {
            var t = this.$Group
              , e = t[4];
            if (e) {
                var i = this.$UIComponent;
                this.scrollRect = egret.$TempRectangle.setTo(t[2], t[3], i[10], i[11])
            } else
                this.$scrollRect && (this.scrollRect = null);
            return e
        }
        ,
        Object.defineProperty(i.prototype, "numElements", {
            get: function() {
                return this.$children.length
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.getElementAt = function(t) {
            return this.$children[t]
        }
        ,
        i.prototype.getVirtualElementAt = function(t) {
            return this.getElementAt(t)
        }
        ,
        i.prototype.setVirtualElementIndicesInView = function(t, e) {}
        ,
        Object.defineProperty(i.prototype, "touchThrough", {
            get: function() {
                return this.$Group[5]
            },
            set: function(t) {
                this.$Group[5] = !!t
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$hitTest = function(t, i) {
            var n = e.prototype.$hitTest.call(this, t, i);
            if (n || this.$Group[5])
                return n;
            if (!this.$visible || !this.touchEnabled)
                return null;
            var r = this.globalToLocal(t, i, egret.$TempPoint)
              , o = this.$UIComponent
              , s = egret.$TempRectangle.setTo(0, 0, o[10], o[11])
              , a = this.$scrollRect;
            return a && (s.x = a.x,
            s.y = a.y),
            s.contains(r.x, r.y) ? this : null
        }
        ,
        i.prototype.invalidateState = function() {
            var t = this.$stateValues;
            t.stateIsDirty || (t.stateIsDirty = !0,
            this.invalidateProperties())
        }
        ,
        i.prototype.getCurrentState = function() {
            return ""
        }
        ,
        i.prototype.createChildren = function() {
            this.$layout || this.$setLayout(new t.BasicLayout),
            this.initializeStates(this.$stage)
        }
        ,
        i.prototype.childrenCreated = function() {}
        ,
        i.prototype.commitProperties = function() {
            t.sys.UIComponentImpl.prototype.commitProperties.call(this);
            var e = this.$stateValues;
            e.stateIsDirty && (e.stateIsDirty = !1,
            e.explicitState || (e.currentState = this.getCurrentState(),
            this.commitCurrentState()))
        }
        ,
        i.prototype.measure = function() {
            return this.$layout ? void this.$layout.measure() : void this.setMeasuredSize(0, 0)
        }
        ,
        i.prototype.updateDisplayList = function(t, e) {
            this.$layout && this.$layout.updateDisplayList(t, e),
            this.updateScrollRect()
        }
        ,
        i.prototype.invalidateParentLayout = function() {}
        ,
        i.prototype.setMeasuredSize = function(t, e) {}
        ,
        i.prototype.invalidateProperties = function() {}
        ,
        i.prototype.validateProperties = function() {}
        ,
        i.prototype.invalidateSize = function() {}
        ,
        i.prototype.validateSize = function(t) {}
        ,
        i.prototype.invalidateDisplayList = function() {}
        ,
        i.prototype.validateDisplayList = function() {}
        ,
        i.prototype.validateNow = function() {}
        ,
        i.prototype.setLayoutBoundsSize = function(t, e) {}
        ,
        i.prototype.setLayoutBoundsPosition = function(t, e) {}
        ,
        i.prototype.getLayoutBounds = function(t) {}
        ,
        i.prototype.getPreferredBounds = function(t) {}
        ,
        i
    }(egret.DisplayObjectContainer);
    t.Group = e,
    __reflect(e.prototype, "eui.Group", ["eui.IViewport", "eui.UIComponent", "egret.DisplayObject"]),
    t.sys.implementUIComponent(e, egret.DisplayObjectContainer, !0),
    t.sys.mixin(e, t.sys.StateClient),
    t.registerProperty(e, "elementsContent", "Array", !0),
    t.registerProperty(e, "states", "State[]")
}(eui || (eui = {}));
var eui;
!function(t) {
    function e(t, e) {
        if (t.hasOwnProperty(i))
            t[i].push(e);
        else {
            var n = [e];
            t[i] && (n = t[i].concat(n)),
            t[i] = n
        }
    }
    var i = "__bindables__";
    t.registerBindable = e
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.initializeUIValues(),
            t.$Component = {
                0: null,
                1: null,
                2: "",
                3: !0,
                4: !1,
                5: !1,
                6: !0,
                7: !0,
                8: null
            },
            t.$touchEnabled = !0,
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "hostComponentKey", {
            get: function() {
                return this.$Component[0]
            },
            set: function(t) {
                this.$Component[0] = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "skinName", {
            get: function() {
                return this.$Component[1]
            },
            set: function(t) {
                var e = this.$Component;
                if (e[5] = !0,
                e[1] != t) {
                    if (t)
                        e[1] = t;
                    else {
                        var i = egret.getImplementation("eui.Theme");
                        if (i) {
                            var n = i.getSkinName(this);
                            n && (e[1] = n)
                        }
                    }
                    this.$parseSkinName()
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$parseSkinName = function() {
            var t, e = this.skinName;
            if (e)
                if (e.prototype)
                    t = new e;
                else if ("string" == typeof e) {
                    var i = void 0
                      , n = e.trim();
                    if ("<" == n.charAt(0))
                        i = EXML.parse(n);
                    else if (i = egret.getDefinitionByName(e),
                    !i && -1 != n.toLowerCase().indexOf(".exml"))
                        return void EXML.load(e, this.onExmlLoaded, this, !0);
                    i && (t = new i)
                } else
                    t = e;
            this.setSkin(t)
        }
        ,
        i.prototype.onExmlLoaded = function(t, e) {
            if (this.skinName == e) {
                var i = new t;
                this.setSkin(i)
            }
        }
        ,
        Object.defineProperty(i.prototype, "skin", {
            get: function() {
                return this.$Component[8]
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setSkin = function(e) {
            !e || e instanceof t.Skin || (e = null);
            var i = this.$Component
              , n = i[8];
            if (n) {
                for (var r = n.skinParts, o = r.length, s = 0; o > s; s++) {
                    var a = r[s];
                    this[a] && this.setSkinPart(a, null)
                }
                var h = n.$elementsContent;
                if (h) {
                    o = h.length;
                    for (var s = 0; o > s; s++) {
                        var l = h[s];
                        l.$parent == this && this.removeChild(l)
                    }
                }
                n.hostComponent = null
            }
            if (i[8] = e,
            e) {
                for (var r = e.skinParts, u = r.length, s = 0; u > s; s++) {
                    var a = r[s]
                      , p = e[a];
                    p && this.setSkinPart(a, p)
                }
                var h = e.$elementsContent;
                if (h)
                    for (var s = h.length - 1; s >= 0; s--)
                        this.addChildAt(h[s], 0);
                e.hostComponent = this
            }
            this.invalidateSize(),
            this.invalidateDisplayList(),
            this.dispatchEventWith(egret.Event.COMPLETE)
        }
        ,
        i.prototype.setSkinPart = function(t, e) {
            var i = this[t];
            i && this.partRemoved(t, i),
            this[t] = e,
            e && this.partAdded(t, e)
        }
        ,
        i.prototype.partAdded = function(t, e) {}
        ,
        i.prototype.partRemoved = function(t, e) {}
        ,
        i.prototype.$setTouchChildren = function(t) {
            t = !!t;
            var i = this.$Component;
            return i[6] = t,
            i[3] ? (i[6] = t,
            e.prototype.$setTouchChildren.call(this, t)) : !0
        }
        ,
        i.prototype.$setTouchEnabled = function(t) {
            t = !!t;
            var i = this.$Component;
            return i[7] = t,
            i[3] ? e.prototype.$setTouchEnabled.call(this, t) : !0
        }
        ,
        Object.defineProperty(i.prototype, "enabled", {
            get: function() {
                return this.$Component[3]
            },
            set: function(t) {
                t = !!t,
                this.$setEnabled(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setEnabled = function(t) {
            var e = this.$Component;
            return t === e[3] ? !1 : (e[3] = t,
            t ? (this.$touchEnabled = e[7],
            this.$touchChildren = e[6]) : (this.$touchEnabled = !1,
            this.$touchChildren = !1),
            this.invalidateState(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "currentState", {
            get: function() {
                var t = this.$Component;
                return t[2] ? t[2] : this.getCurrentState()
            },
            set: function(t) {
                var e = this.$Component;
                t != e[2] && (e[2] = t,
                this.invalidateState())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.invalidateState = function() {
            var t = this.$Component;
            t[4] || (t[4] = !0,
            this.invalidateProperties())
        }
        ,
        i.prototype.getCurrentState = function() {
            return ""
        }
        ,
        i.prototype.createChildren = function() {
            var t = this.$Component;
            if (!t[1]) {
                var e = egret.getImplementation("eui.Theme");
                if (e) {
                    var i = e.getSkinName(this);
                    i && (t[1] = i,
                    this.$parseSkinName())
                }
            }
        }
        ,
        i.prototype.childrenCreated = function() {}
        ,
        i.prototype.commitProperties = function() {
            t.sys.UIComponentImpl.prototype.commitProperties.call(this);
            var e = this.$Component;
            e[4] && (e[4] = !1,
            e[8] && (e[8].currentState = this.currentState))
        }
        ,
        i.prototype.measure = function() {
            t.sys.measure(this);
            var e = this.$Component[8];
            if (e) {
                var i = this.$UIComponent;
                isNaN(e.width) ? (i[16] < e.minWidth && (i[16] = e.minWidth),
                i[16] > e.maxWidth && (i[16] = e.maxWidth)) : i[16] = e.width,
                isNaN(e.height) ? (i[17] < e.minHeight && (i[17] = e.minHeight),
                i[17] > e.maxHeight && (i[17] = e.maxHeight)) : i[17] = e.height
            }
        }
        ,
        i.prototype.updateDisplayList = function(e, i) {
            t.sys.updateDisplayList(this, e, i)
        }
        ,
        i.prototype.invalidateParentLayout = function() {}
        ,
        i.prototype.setMeasuredSize = function(t, e) {}
        ,
        i.prototype.invalidateProperties = function() {}
        ,
        i.prototype.validateProperties = function() {}
        ,
        i.prototype.invalidateSize = function() {}
        ,
        i.prototype.validateSize = function(t) {}
        ,
        i.prototype.invalidateDisplayList = function() {}
        ,
        i.prototype.validateDisplayList = function() {}
        ,
        i.prototype.validateNow = function() {}
        ,
        i.prototype.setLayoutBoundsSize = function(t, e) {}
        ,
        i.prototype.setLayoutBoundsPosition = function(t, e) {}
        ,
        i.prototype.getLayoutBounds = function(t) {}
        ,
        i.prototype.getPreferredBounds = function(t) {}
        ,
        i
    }(egret.DisplayObjectContainer);
    t.Component = e,
    __reflect(e.prototype, "eui.Component", ["eui.UIComponent", "egret.DisplayObject"]),
    t.registerProperty(e, "skinName", "Class"),
    t.sys.implementUIComponent(e, egret.DisplayObjectContainer, !0)
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.$dataProviderChanged = !1,
            t.$dataProvider = null,
            t.$indexToRenderer = [],
            t.$DataGroup = {
                0: !0,
                1: !1,
                2: {},
                3: {},
                4: !1,
                5: !1,
                6: null,
                7: null,
                8: !1,
                9: null,
                10: !1,
                11: !1,
                12: null,
                13: null,
                14: !1
            },
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "useVirtualLayout", {
            get: function() {
                return this.$layout ? this.$layout.$useVirtualLayout : this.$DataGroup[0]
            },
            set: function(t) {
                t = !!t;
                var e = this.$DataGroup;
                t !== e[0] && (e[0] = t,
                this.$layout && (this.$layout.useVirtualLayout = t))
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setLayout = function(t) {
            if (t == this.$layout)
                return !1;
            this.$layout && (this.$layout.setTypicalSize(0, 0),
            this.$layout.removeEventListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this)),
            this.$layout && t && this.$layout.$useVirtualLayout != t.$useVirtualLayout && this.onUseVirtualLayoutChanged();
            var i = e.prototype.$setLayout.call(this, t);
            if (t) {
                var n = this.$DataGroup[9];
                n && t.setTypicalSize(n.width, n.height),
                t.useVirtualLayout = this.$DataGroup[0],
                t.addEventListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this)
            }
            return i
        }
        ,
        i.prototype.onUseVirtualLayoutChanged = function(t) {
            var e = this.$DataGroup;
            e[1] = !0,
            e[10] = !0,
            this.removeDataProviderListener(),
            this.invalidateProperties()
        }
        ,
        i.prototype.setVirtualElementIndicesInView = function(t, e) {
            if (this.$layout && this.$layout.$useVirtualLayout)
                for (var i = this.$indexToRenderer, n = Object.keys(i), r = n.length, o = 0; r > o; o++) {
                    var s = +n[o];
                    (t > s || s > e) && this.freeRendererByIndex(s)
                }
        }
        ,
        i.prototype.getElementAt = function(t) {
            return this.$indexToRenderer[t]
        }
        ,
        i.prototype.getVirtualElementAt = function(t) {
            if (t = 0 | +t,
            0 > t || t >= this.$dataProvider.length)
                return null;
            var e = this.$indexToRenderer[t];
            if (!e) {
                var i = this.$dataProvider.getItemAt(t);
                e = this.createVirtualRenderer(i),
                this.$indexToRenderer[t] = e,
                this.updateRenderer(e, t, i);
                var n = this.$DataGroup;
                n[4] && (e.validateNow(),
                n[4] = !1,
                this.rendererAdded(e, t, i))
            }
            return e
        }
        ,
        i.prototype.freeRendererByIndex = function(t) {
            var e = this.$indexToRenderer[t];
            e && (delete this.$indexToRenderer[t],
            this.doFreeRenderer(e))
        }
        ,
        i.prototype.doFreeRenderer = function(t) {
            var e = this.$DataGroup
              , i = e[2][t.$hashCode]
              , n = i.$hashCode;
            e[3][n] || (e[3][n] = []),
            e[3][n].push(t),
            t.visible = !1
        }
        ,
        i.prototype.invalidateSize = function() {
            this.$DataGroup[4] || e.prototype.invalidateSize.call(this)
        }
        ,
        i.prototype.createVirtualRenderer = function(t) {
            var e, i = this.itemToRendererClass(t), n = i.$hashCode, r = this.$DataGroup, o = r[3];
            return o[n] && o[n].length > 0 ? (e = o[n].pop(),
            e.visible = !0,
            this.invalidateDisplayList(),
            e) : (r[4] = !0,
            this.createOneRenderer(i))
        }
        ,
        i.prototype.createOneRenderer = function(t) {
            var e = new t
              , i = this.$DataGroup;
            return i[2][e.$hashCode] = t,
            egret.is(e, "eui.IItemRenderer") ? (i[13] && this.setItemRenderSkinName(e, i[13]),
            this.addChild(e),
            e) : null
        }
        ,
        i.prototype.setItemRenderSkinName = function(e, i) {
            if (e && e instanceof t.Component) {
                var n = e;
                n.$Component[5] || (n.skinName = i,
                n.$Component[5] = !1)
            }
        }
        ,
        Object.defineProperty(i.prototype, "dataProvider", {
            get: function() {
                return this.$dataProvider
            },
            set: function(t) {
                this.$setDataProvider(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setDataProvider = function(t) {
            return this.$dataProvider == t || t && !t.getItemAt ? !1 : (this.removeDataProviderListener(),
            this.$dataProvider = t,
            this.$dataProviderChanged = !0,
            this.$DataGroup[10] = !0,
            this.invalidateProperties(),
            this.invalidateSize(),
            this.invalidateDisplayList(),
            !0)
        }
        ,
        i.prototype.removeDataProviderListener = function() {
            this.$dataProvider && this.$dataProvider.removeEventListener(t.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this)
        }
        ,
        i.prototype.onCollectionChange = function(e) {
            switch (e.kind) {
            case t.CollectionEventKind.ADD:
                this.itemAddedHandler(e.items, e.location);
                break;
            case t.CollectionEventKind.REMOVE:
                this.itemRemovedHandler(e.items, e.location);
                break;
            case t.CollectionEventKind.UPDATE:
            case t.CollectionEventKind.REPLACE:
                this.itemUpdatedHandler(e.items[0], e.location);
                break;
            case t.CollectionEventKind.RESET:
            case t.CollectionEventKind.REFRESH:
                if (this.$layout && this.$layout.$useVirtualLayout)
                    for (var i = this.$indexToRenderer, n = Object.keys(i), r = n.length, o = r - 1; o >= 0; o--) {
                        var s = +n[o];
                        this.freeRendererByIndex(s)
                    }
                this.$dataProviderChanged = !0,
                this.invalidateProperties()
            }
            this.invalidateSize(),
            this.invalidateDisplayList()
        }
        ,
        i.prototype.itemAddedHandler = function(t, e) {
            for (var i = t.length, n = 0; i > n; n++)
                this.itemAdded(t[n], e + n);
            this.resetRenderersIndices()
        }
        ,
        i.prototype.itemRemovedHandler = function(t, e) {
            for (var i = t.length, n = i - 1; n >= 0; n--)
                this.itemRemoved(t[n], e + n);
            this.resetRenderersIndices()
        }
        ,
        i.prototype.itemAdded = function(t, e) {
            if (this.$layout && this.$layout.elementAdded(e),
            this.$layout && this.$layout.$useVirtualLayout)
                return void this.$indexToRenderer.splice(e, 0, null);
            var i = this.createVirtualRenderer(t);
            if (this.$indexToRenderer.splice(e, 0, i),
            i) {
                this.updateRenderer(i, e, t);
                var n = this.$DataGroup;
                n[4] && (n[4] = !1,
                this.rendererAdded(i, e, t))
            }
        }
        ,
        i.prototype.itemRemoved = function(t, e) {
            this.$layout && this.$layout.elementRemoved(e);
            var i = this.$indexToRenderer[e];
            this.$indexToRenderer.length > e && this.$indexToRenderer.splice(e, 1),
            i && (this.$layout && this.$layout.$useVirtualLayout ? this.doFreeRenderer(i) : (this.rendererRemoved(i, e, t),
            this.removeChild(i)))
        }
        ,
        i.prototype.resetRenderersIndices = function() {
            var t = this.$indexToRenderer;
            if (0 != t.length)
                if (this.$layout && this.$layout.$useVirtualLayout)
                    for (var e = Object.keys(t), i = e.length, n = 0; i > n; n++) {
                        var r = +e[n];
                        this.resetRendererItemIndex(r)
                    }
                else
                    for (var o = t.length, r = 0; o > r; r++)
                        this.resetRendererItemIndex(r)
        }
        ,
        i.prototype.itemUpdatedHandler = function(t, e) {
            if (!this.$DataGroup[11]) {
                var i = this.$indexToRenderer[e];
                i && this.updateRenderer(i, e, t)
            }
        }
        ,
        i.prototype.resetRendererItemIndex = function(t) {
            var e = this.$indexToRenderer[t];
            e && (e.itemIndex = t)
        }
        ,
        Object.defineProperty(i.prototype, "itemRenderer", {
            get: function() {
                return this.$DataGroup[6]
            },
            set: function(t) {
                var e = this.$DataGroup;
                e[6] != t && (e[6] = t,
                e[5] = !0,
                e[8] = !0,
                e[10] = !0,
                this.removeDataProviderListener(),
                this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "itemRendererSkinName", {
            get: function() {
                return this.$DataGroup[13]
            },
            set: function(t) {
                var e = this.$DataGroup;
                e[13] != t && (e[13] = t,
                this.$UIComponent[29] && (e[14] = !0,
                this.invalidateProperties()))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "itemRendererFunction", {
            get: function() {
                return this.$DataGroup[7]
            },
            set: function(t) {
                var e = this.$DataGroup;
                e[7] != t && (e[7] = t,
                e[5] = !0,
                e[8] = !0,
                this.removeDataProviderListener(),
                this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.itemToRendererClass = function(e) {
            var i, n = this.$DataGroup;
            return n[7] && (i = n[7](e)),
            i || (i = n[6]),
            i || (i = t.ItemRenderer),
            i.$hashCode || (i.$hashCode = egret.$hashCount++),
            i
        }
        ,
        i.prototype.createChildren = function() {
            if (!this.$layout) {
                var i = new t.VerticalLayout;
                i.gap = 0,
                i.horizontalAlign = t.JustifyAlign.CONTENT_JUSTIFY,
                this.$setLayout(i)
            }
            e.prototype.createChildren.call(this)
        }
        ,
        i.prototype.commitProperties = function() {
            var i = this.$DataGroup;
            if ((i[5] || this.$dataProviderChanged || i[1]) && (this.removeAllRenderers(),
            this.$layout && this.$layout.clearVirtualLayoutCache(),
            this.setTypicalLayoutRect(null),
            i[1] = !1,
            i[5] = !1,
            this.$dataProvider && this.$dataProvider.addEventListener(t.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this),
            this.$layout && this.$layout.$useVirtualLayout ? (this.invalidateSize(),
            this.invalidateDisplayList()) : this.createRenderers(),
            this.$dataProviderChanged && (this.$dataProviderChanged = !1,
            this.scrollV = this.scrollH = 0)),
            e.prototype.commitProperties.call(this),
            i[8] && (i[8] = !1,
            this.$dataProvider && this.$dataProvider.length > 0 && (i[12] = this.$dataProvider.getItemAt(0),
            this.measureRendererSize())),
            i[14]) {
                i[14] = !1;
                for (var n = i[13], r = this.$indexToRenderer, o = Object.keys(r), s = o.length, a = 0; s > a; a++) {
                    var h = o[a];
                    this.setItemRenderSkinName(r[h], n)
                }
                var l = i[3];
                o = Object.keys(l),
                s = o.length;
                for (var a = 0; s > a; a++)
                    for (var u = o[a], p = l[u], c = p.length, d = 0; c > d; d++)
                        this.setItemRenderSkinName(p[d], n)
            }
        }
        ,
        i.prototype.measure = function() {
            this.$layout && this.$layout.$useVirtualLayout && this.ensureTypicalLayoutElement(),
            e.prototype.measure.call(this)
        }
        ,
        i.prototype.updateDisplayList = function(t, i) {
            var n = this.$layout && this.$layout.$useVirtualLayout;
            n && this.ensureTypicalLayoutElement(),
            e.prototype.updateDisplayList.call(this, t, i);
            var r = this.$DataGroup;
            if (n) {
                var o = r[9];
                if (o) {
                    var s = this.$indexToRenderer[0];
                    if (s) {
                        var a = egret.$TempRectangle;
                        s.getPreferredBounds(a),
                        (a.width != o.width || a.height != o.height) && (r[9] = null)
                    }
                }
            }
        }
        ,
        i.prototype.ensureTypicalLayoutElement = function() {
            this.$DataGroup[9] || this.$dataProvider && this.$dataProvider.length > 0 && (this.$DataGroup[12] = this.$dataProvider.getItemAt(0),
            this.measureRendererSize())
        }
        ,
        i.prototype.measureRendererSize = function() {
            var t = this.$DataGroup;
            if (!t[12])
                return void this.setTypicalLayoutRect(null);
            var e = this.createVirtualRenderer(t[12]);
            if (!e)
                return void this.setTypicalLayoutRect(null);
            this.updateRenderer(e, 0, t[12]),
            e.validateNow();
            var i = egret.$TempRectangle;
            e.getPreferredBounds(i);
            var n = new egret.Rectangle(0,0,i.width,i.height);
            this.$layout && this.$layout.$useVirtualLayout ? (t[4] && this.rendererAdded(e, 0, t[12]),
            this.doFreeRenderer(e)) : this.removeChild(e),
            this.setTypicalLayoutRect(n),
            t[4] = !1
        }
        ,
        i.prototype.setTypicalLayoutRect = function(t) {
            this.$DataGroup[9] = t,
            this.$layout && (t ? this.$layout.setTypicalSize(t.width, t.height) : this.$layout.setTypicalSize(0, 0))
        }
        ,
        i.prototype.removeAllRenderers = function() {
            for (var t = this.$indexToRenderer, e = Object.keys(t), i = e.length, n = 0; i > n; n++) {
                var r = e[n]
                  , o = t[r];
                o && (this.rendererRemoved(o, o.itemIndex, o.data),
                this.removeChild(o))
            }
            this.$indexToRenderer = [];
            var s = this.$DataGroup;
            if (s[10]) {
                for (var a = s[3], h = Object.keys(a), l = h.length, n = 0; l > n; n++)
                    for (var u = h[n], p = a[u], c = p.length, d = 0; c > d; d++) {
                        var o = p[d];
                        this.rendererRemoved(o, o.itemIndex, o.data),
                        this.removeChild(o)
                    }
                s[3] = {},
                s[2] = {},
                s[10] = !1
            }
        }
        ,
        i.prototype.createRenderers = function() {
            if (this.$dataProvider)
                for (var t = 0, e = this.$dataProvider.length, i = 0; e > i; i++) {
                    var n = this.$dataProvider.getItemAt(i)
                      , r = this.itemToRendererClass(n)
                      , o = this.createOneRenderer(r);
                    o && (this.$indexToRenderer[t] = o,
                    this.updateRenderer(o, t, n),
                    this.rendererAdded(o, t, n),
                    t++)
                }
        }
        ,
        i.prototype.updateRenderer = function(t, e, i) {
            var n = this.$DataGroup;
            return n[11] = !0,
            t.itemIndex = e,
            t.parent == this && this.setChildIndex(t, e),
            t.data = i,
            n[11] = !1,
            t
        }
        ,
        Object.defineProperty(i.prototype, "numElements", {
            get: function() {
                return this.$dataProvider ? this.$dataProvider.length : 0
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.rendererAdded = function(t, e, i) {}
        ,
        i.prototype.rendererRemoved = function(t, e, i) {}
        ,
        i
    }(t.Group);
    t.DataGroup = e,
    __reflect(e.prototype, "eui.DataGroup"),
    t.registerProperty(e, "itemRenderer", "Class"),
    t.registerProperty(e, "itemRendererSkinName", "Class"),
    t.registerProperty(e, "dataProvider", "eui.ICollection", !0)
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.labelDisplay = null,
            e._label = "",
            e.iconDisplay = null,
            e._icon = null,
            e.touchCaptured = !1,
            e.touchChildren = !1,
            e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, e.onTouchBegin, e),
            e
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "label", {
            get: function() {
                return this._label
            },
            set: function(t) {
                this._label = t,
                this.labelDisplay && (this.labelDisplay.text = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "icon", {
            get: function() {
                return this._icon
            },
            set: function(t) {
                this._icon = t,
                this.iconDisplay && (this.iconDisplay.source = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.onTouchCancle = function(t) {
            var e = t.$currentTarget;
            e.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this),
            e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            this.touchCaptured = !1,
            this.invalidateState()
        }
        ,
        e.prototype.onTouchBegin = function(t) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this),
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            this.touchCaptured = !0,
            this.invalidateState(),
            t.updateAfterEvent()
        }
        ,
        e.prototype.onStageTouchEnd = function(t) {
            var e = t.$currentTarget;
            e.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this),
            e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            this.contains(t.target) && this.buttonReleased(),
            this.touchCaptured = !1,
            this.invalidateState()
        }
        ,
        e.prototype.getCurrentState = function() {
            return this.enabled ? this.touchCaptured ? "down" : "up" : "disabled"
        }
        ,
        e.prototype.partAdded = function(t, e) {
            e === this.labelDisplay ? this.labelDisplay.text = this._label : e == this.iconDisplay && (this.iconDisplay.source = this._icon)
        }
        ,
        e.prototype.buttonReleased = function() {}
        ,
        e
    }(t.Component);
    t.Button = e,
    __reflect(e.prototype, "eui.Button")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.$Range = {
                0: 100,
                1: !1,
                2: 0,
                3: !1,
                4: 0,
                5: 0,
                6: !1,
                7: 1,
                8: !1,
                9: !1
            },
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "maximum", {
            get: function() {
                return this.$Range[0]
            },
            set: function(t) {
                t = +t || 0;
                var e = this.$Range;
                t !== e[0] && (e[0] = t,
                e[1] = !0,
                this.invalidateProperties(),
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "minimum", {
            get: function() {
                return this.$Range[2]
            },
            set: function(t) {
                t = +t || 0;
                var e = this.$Range;
                t !== e[2] && (e[2] = t,
                e[3] = !0,
                this.invalidateProperties(),
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "value", {
            get: function() {
                var t = this.$Range;
                return t[6] ? t[5] : t[4]
            },
            set: function(t) {
                t = +t || 0,
                this.$setValue(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setValue = function(t) {
            if (t === this.value)
                return !1;
            var e = this.$Range;
            return e[5] = t,
            e[6] = !0,
            this.invalidateProperties(),
            !0
        }
        ,
        Object.defineProperty(i.prototype, "snapInterval", {
            get: function() {
                return this.$Range[7]
            },
            set: function(t) {
                var e = this.$Range;
                e[9] = !0,
                t = +t || 0,
                t !== e[7] && (isNaN(t) ? (e[7] = 1,
                e[9] = !1) : e[7] = t,
                e[8] = !0,
                this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.commitProperties = function() {
            e.prototype.commitProperties.call(this);
            var t = this.$Range;
            if (t[2] > t[0] && (t[1] ? t[0] = t[2] : t[2] = t[0]),
            t[6] || t[1] || t[3] || t[8]) {
                var i = t[6] ? t[5] : t[4];
                t[6] = !1,
                t[1] = !1,
                t[3] = !1,
                t[8] = !1,
                this.setValue(this.nearestValidValue(i, t[7]))
            }
        }
        ,
        i.prototype.nearestValidSize = function(t) {
            var e = this.snapInterval;
            if (0 == e)
                return t;
            var i = Math.round(t / e) * e;
            return Math.abs(i) < e ? e : i
        }
        ,
        i.prototype.nearestValidValue = function(t, e) {
            var i = this.$Range;
            if (0 == e)
                return Math.max(i[2], Math.min(i[0], t));
            var n = i[0] - i[2]
              , r = 1;
            if (t -= i[2],
            e != Math.round(e)) {
                var o = (1 + e).toString().split(".");
                r = Math.pow(10, o[1].length),
                n *= r,
                t = Math.round(t * r),
                e = Math.round(e * r)
            }
            var s = Math.max(0, Math.floor(t / e) * e)
              , a = Math.min(n, Math.floor((t + e) / e) * e)
              , h = t - s >= (a - s) / 2 ? a : s;
            return h / r + i[2]
        }
        ,
        i.prototype.setValue = function(e) {
            var i = this.$Range;
            i[4] !== e && (i[0] > i[2] ? i[4] = Math.min(i[0], Math.max(i[2], e)) : i[4] = e,
            i[6] = !1,
            this.invalidateDisplayList(),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "value"))
        }
        ,
        i.prototype.updateDisplayList = function(t, i) {
            e.prototype.updateDisplayList.call(this, t, i),
            this.updateSkinDisplayList()
        }
        ,
        i.prototype.updateSkinDisplayList = function() {}
        ,
        i
    }(t.Component);
    t.Range = e,
    __reflect(e.prototype, "eui.Range"),
    t.registerBindable(e.prototype, "value")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.$target = null,
            e.$useVirtualLayout = !1,
            e.$typicalWidth = 71,
            e.$typicalHeight = 22,
            e
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "target", {
            get: function() {
                return this.$target
            },
            set: function(t) {
                this.$target !== t && (this.$target = t,
                this.clearVirtualLayoutCache())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "useVirtualLayout", {
            get: function() {
                return this.$useVirtualLayout
            },
            set: function(t) {
                t = !!t,
                this.$useVirtualLayout != t && (this.$useVirtualLayout = t,
                this.dispatchEventWith("useVirtualLayoutChanged"),
                this.$useVirtualLayout && !t && this.clearVirtualLayoutCache(),
                this.target && this.target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.setTypicalSize = function(t, e) {
            t = +t || 71,
            e = +e || 22,
            (t !== this.$typicalWidth || e !== this.$typicalHeight) && (this.$typicalWidth = t,
            this.$typicalHeight = e,
            this.$target && this.$target.invalidateSize())
        }
        ,
        e.prototype.scrollPositionChanged = function() {}
        ,
        e.prototype.clearVirtualLayoutCache = function() {}
        ,
        e.prototype.elementAdded = function(t) {}
        ,
        e.prototype.elementRemoved = function(t) {}
        ,
        e.prototype.getElementIndicesInView = function() {
            return null
        }
        ,
        e.prototype.measure = function() {}
        ,
        e.prototype.updateDisplayList = function(t, e) {}
        ,
        e
    }(egret.EventDispatcher);
    t.LayoutBase = e,
    __reflect(e.prototype, "eui.LayoutBase")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.$ListBase = {
                0: !1,
                1: !1,
                2: -2,
                3: -1,
                4: !1,
                5: void 0,
                6: !1,
                7: null,
                8: !1
            },
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "requireSelection", {
            get: function() {
                return this.$ListBase[0]
            },
            set: function(t) {
                t = !!t;
                var e = this.$ListBase;
                t !== e[0] && (e[0] = t,
                t && (e[1] = !0,
                this.invalidateProperties()))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "selectedIndex", {
            get: function() {
                return this.$getSelectedIndex()
            },
            set: function(t) {
                t = 0 | +t,
                this.setSelectedIndex(t, !1)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$getSelectedIndex = function() {
            var t = this.$ListBase;
            return t[2] != i.NO_PROPOSED_SELECTION ? t[2] : t[3]
        }
        ,
        i.prototype.setSelectedIndex = function(t, e) {
            if (t != this.selectedIndex) {
                var i = this.$ListBase;
                e && (i[4] = i[4] || e),
                i[2] = t,
                this.invalidateProperties()
            }
        }
        ,
        Object.defineProperty(i.prototype, "selectedItem", {
            get: function() {
                var t = this.$ListBase;
                if (void 0 !== t[5])
                    return t[5];
                var e = this.$getSelectedIndex();
                if (e != i.NO_SELECTION && null != this.$dataProvider)
                    return this.$dataProvider.length > e ? this.$dataProvider.getItemAt(e) : void 0
            },
            set: function(t) {
                this.setSelectedItem(t, !1)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setSelectedItem = function(t, e) {
            if (void 0 === e && (e = !1),
            this.selectedItem !== t) {
                var i = this.$ListBase;
                e && (i[4] = i[4] || e),
                i[5] = t,
                this.invalidateProperties()
            }
        }
        ,
        i.prototype.commitProperties = function() {
            var n = this.$dataProviderChanged;
            e.prototype.commitProperties.call(this);
            var r = this.$ListBase
              , o = this.$getSelectedIndex()
              , s = this.$dataProvider;
            n && (o >= 0 && s && o < s.length ? this.itemSelected(o, !0) : this.requireSelection ? r[2] = 0 : this.setSelectedIndex(-1, !1)),
            r[1] && (r[1] = !1,
            r[0] && o == i.NO_SELECTION && s && s.length > 0 && (r[2] = 0)),
            void 0 !== r[5] && (s ? r[2] = s.getItemIndex(r[5]) : r[2] = i.NO_SELECTION,
            r[5] = void 0);
            var a = !1;
            r[2] != i.NO_PROPOSED_SELECTION && (a = this.commitSelection()),
            r[6] && (r[6] = !1,
            a || t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedIndex"))
        }
        ,
        i.prototype.updateRenderer = function(t, i, n) {
            return this.itemSelected(i, this.$isItemIndexSelected(i)),
            e.prototype.updateRenderer.call(this, t, i, n)
        }
        ,
        i.prototype.itemSelected = function(t, e) {
            var i = this.$indexToRenderer[t];
            i && (i.selected = e)
        }
        ,
        i.prototype.$isItemIndexSelected = function(t) {
            return t == this.selectedIndex
        }
        ,
        i.prototype.commitSelection = function(e) {
            void 0 === e && (e = !0);
            var n = this.$dataProvider
              , r = this.$ListBase
              , o = n ? n.length - 1 : -1
              , s = r[3]
              , a = r[2];
            if (a < i.NO_SELECTION && (a = i.NO_SELECTION),
            a > o && (a = o),
            r[0] && a == i.NO_SELECTION && n && n.length > 0)
                return r[2] = i.NO_PROPOSED_SELECTION,
                r[4] = !1,
                !1;
            if (r[4]) {
                var h = this.dispatchEventWith(egret.Event.CHANGING, !1, !0, !0);
                if (!h)
                    return this.itemSelected(r[2], !1),
                    r[2] = i.NO_PROPOSED_SELECTION,
                    r[4] = !1,
                    !1
            }
            return r[3] = a,
            r[2] = i.NO_PROPOSED_SELECTION,
            s != i.NO_SELECTION && this.itemSelected(s, !1),
            r[3] != i.NO_SELECTION && this.itemSelected(r[3], !0),
            e && (r[4] && (this.dispatchEventWith(egret.Event.CHANGE),
            r[4] = !1),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedIndex"),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedItem")),
            !0
        }
        ,
        i.prototype.adjustSelection = function(t, e) {
            void 0 === e && (e = !1);
            var n = this.$ListBase;
            n[2] != i.NO_PROPOSED_SELECTION ? n[2] = t : n[3] = t,
            n[6] = !0,
            this.invalidateProperties()
        }
        ,
        i.prototype.itemAdded = function(t, n) {
            e.prototype.itemAdded.call(this, t, n);
            var r = this.$getSelectedIndex();
            r == i.NO_SELECTION ? this.$ListBase[0] && this.adjustSelection(n, !0) : r >= n && this.adjustSelection(r + 1, !0)
        }
        ,
        i.prototype.itemRemoved = function(t, n) {
            if (e.prototype.itemRemoved.call(this, t, n),
            this.selectedIndex != i.NO_SELECTION) {
                var r = this.$getSelectedIndex();
                n == r ? this.requireSelection && this.$dataProvider && this.$dataProvider.length > 0 ? 0 == n ? (this.$ListBase[2] = 0,
                this.invalidateProperties()) : this.setSelectedIndex(0, !1) : this.adjustSelection(-1, !1) : r > n && this.adjustSelection(r - 1, !1)
            }
        }
        ,
        i.prototype.onCollectionChange = function(n) {
            e.prototype.onCollectionChange.call(this, n),
            n.kind == t.CollectionEventKind.RESET ? 0 == this.$dataProvider.length && this.setSelectedIndex(i.NO_SELECTION, !1) : n.kind == t.CollectionEventKind.REFRESH && this.dataProviderRefreshed()
        }
        ,
        i.prototype.dataProviderRefreshed = function() {
            this.setSelectedIndex(i.NO_SELECTION, !1)
        }
        ,
        i.prototype.rendererAdded = function(t, e, i) {
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this),
            t.addEventListener(egret.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this),
            t.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onRendererTouchCancle, this)
        }
        ,
        i.prototype.rendererRemoved = function(t, e, i) {
            t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this),
            t.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this),
            t.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onRendererTouchCancle, this)
        }
        ,
        i.prototype.onRendererTouchBegin = function(t) {
            var e = this.$ListBase;
            t.$isDefaultPrevented || (e[8] = !1,
            e[7] = t.$currentTarget,
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this))
        }
        ,
        i.prototype.onRendererTouchCancle = function(t) {
            var e = this.$ListBase;
            e[7] = null,
            e[8] = !0,
            this.$stage && this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this)
        }
        ,
        i.prototype.onRendererTouchEnd = function(e) {
            var i = this.$ListBase
              , n = e.$currentTarget
              , r = i[7];
            n == r && (i[8] || (this.setSelectedIndex(n.itemIndex, !0),
            t.ItemTapEvent.dispatchItemTapEvent(this, t.ItemTapEvent.ITEM_TAP, n)),
            i[8] = !1)
        }
        ,
        i.prototype.stage_touchEndHandler = function(t) {
            var e = t.$currentTarget;
            e.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this),
            this.$ListBase[7] = null
        }
        ,
        i.NO_SELECTION = -1,
        i.NO_PROPOSED_SELECTION = -2,
        i
    }(t.DataGroup);
    t.ListBase = e,
    __reflect(e.prototype, "eui.ListBase"),
    t.registerBindable(e.prototype, "selectedIndex"),
    t.registerBindable(e.prototype, "selectedItem")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.thumb = null,
            t.$viewport = null,
            t.autoVisibility = !0,
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "viewport", {
            get: function() {
                return this.$viewport
            },
            set: function(e) {
                if (e != this.$viewport) {
                    var i = this.$viewport;
                    i && (i.removeEventListener(t.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged, this),
                    i.removeEventListener(egret.Event.RESIZE, this.onViewportResize, this)),
                    this.$viewport = e,
                    e && (e.addEventListener(t.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged, this),
                    e.addEventListener(egret.Event.RESIZE, this.onViewportResize, this)),
                    this.invalidateDisplayList()
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.onViewportResize = function(t) {
            this.invalidateDisplayList()
        }
        ,
        i.prototype.onPropertyChanged = function(t) {}
        ,
        i
    }(t.Component);
    t.ScrollBarBase = e,
    __reflect(e.prototype, "eui.ScrollBarBase")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.trackHighlight = null,
            t.thumb = null,
            t.track = null,
            t.$SliderBase = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: null,
                5: null,
                6: 300,
                7: 0,
                8: 0,
                9: !0
            },
            t.maximum = 10,
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t),
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "slideDuration", {
            get: function() {
                return this.$SliderBase[6]
            },
            set: function(t) {
                this.$SliderBase[6] = +t || 0
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.pointToValue = function(t, e) {
            return this.minimum
        }
        ,
        Object.defineProperty(i.prototype, "liveDragging", {
            get: function() {
                return this.$SliderBase[9]
            },
            set: function(t) {
                this.$SliderBase[9] = !!t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "pendingValue", {
            get: function() {
                return this.$SliderBase[7]
            },
            set: function(t) {
                t = +t || 0;
                var e = this.$SliderBase;
                t !== e[7] && (e[7] = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setValue = function(t) {
            this.$SliderBase[7] = t,
            e.prototype.setValue.call(this, t)
        }
        ,
        i.prototype.partAdded = function(t, i) {
            e.prototype.partAdded.call(this, t, i),
            i == this.thumb ? (this.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this),
            this.thumb.addEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this)) : i == this.track ? (this.track.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this),
            this.track.addEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this)) : i === this.trackHighlight && (this.trackHighlight.touchEnabled = !1,
            egret.is(this.trackHighlight, "egret.DisplayObjectContainer") && (this.trackHighlight.touchChildren = !1))
        }
        ,
        i.prototype.partRemoved = function(t, i) {
            e.prototype.partRemoved.call(this, t, i),
            i == this.thumb ? (this.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this),
            this.thumb.removeEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this)) : i == this.track && (this.track.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this),
            this.track.removeEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this))
        }
        ,
        i.prototype.onTrackOrThumbResize = function(t) {
            this.updateSkinDisplayList()
        }
        ,
        i.prototype.onThumbTouchBegin = function(e) {
            var i = this.$SliderBase;
            i[5] && i[5].isPlaying && this.stopAnimation();
            var n = this.$stage;
            n.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this),
            n.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            var r = this.thumb.globalToLocal(e.stageX, e.stageY, egret.$TempPoint);
            i[0] = r.x,
            i[1] = r.y,
            t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_START)
        }
        ,
        i.prototype.onStageTouchMove = function(t) {
            var e = this.$SliderBase;
            e[2] = t.$stageX,
            e[3] = t.$stageY;
            var i = this.track;
            if (i) {
                var n = i.globalToLocal(e[2], e[3], egret.$TempPoint)
                  , r = this.pointToValue(n.x - e[0], n.y - e[1]);
                r = this.nearestValidValue(r, this.snapInterval),
                this.updateWhenTouchMove(r),
                t.updateAfterEvent()
            }
        }
        ,
        i.prototype.updateWhenTouchMove = function(t) {
            t != this.$SliderBase[7] && (this.liveDragging ? (this.setValue(t),
            this.dispatchEventWith(egret.Event.CHANGE)) : this.pendingValue = t)
        }
        ,
        i.prototype.onStageTouchEnd = function(e) {
            var i = e.$currentTarget;
            i.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this),
            i.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_END);
            var n = this.$SliderBase;
            this.liveDragging || this.value == n[7] || (this.setValue(n[7]),
            this.dispatchEventWith(egret.Event.CHANGE))
        }
        ,
        i.prototype.onTouchBegin = function(t) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this),
            this.$SliderBase[4] = t.$target
        }
        ,
        i.prototype.stageTouchEndHandler = function(t) {
            var e = t.$target
              , i = this.$SliderBase;
            t.$currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this),
            i[4] != e && this.contains(e) && egret.TouchEvent.dispatchTouchEvent(this, egret.TouchEvent.TOUCH_TAP, !0, !0, t.$stageX, t.$stageY, t.touchPointID),
            i[4] = null
        }
        ,
        i.prototype.$animationUpdateHandler = function(t) {
            this.pendingValue = t.currentValue
        }
        ,
        i.prototype.animationEndHandler = function(e) {
            this.setValue(this.$SliderBase[8]),
            this.dispatchEventWith(egret.Event.CHANGE),
            t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_END)
        }
        ,
        i.prototype.stopAnimation = function() {
            this.$SliderBase[5].stop(),
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval)),
            this.dispatchEventWith(egret.Event.CHANGE),
            t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_END)
        }
        ,
        i.prototype.onTrackTouchBegin = function(e) {
            var i = this.thumb ? this.thumb.width : 0
              , n = this.thumb ? this.thumb.height : 0
              , r = e.$stageX - i / 2
              , o = e.$stageY - n / 2
              , s = this.track.globalToLocal(r, o, egret.$TempPoint)
              , a = this.$Range
              , h = this.pointToValue(s.x, s.y);
            h = this.nearestValidValue(h, a[7]);
            var l = this.$SliderBase;
            if (h != l[7])
                if (0 != l[6]) {
                    l[5] || (l[5] = new t.sys.Animation(this.$animationUpdateHandler,this),
                    l[5].endFunction = this.animationEndHandler);
                    var u = l[5];
                    u.isPlaying && this.stopAnimation(),
                    l[8] = h,
                    u.duration = l[6] * (Math.abs(l[7] - l[8]) / (a[0] - a[2])),
                    u.from = l[7],
                    u.to = l[8],
                    t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_START),
                    u.play()
                } else
                    this.setValue(h),
                    this.dispatchEventWith(egret.Event.CHANGE)
        }
        ,
        i
    }(t.Range);
    t.SliderBase = e,
    __reflect(e.prototype, "eui.SliderBase")
}(eui || (eui = {}));
var eui;
!function(eui) {
    var sys;
    !function(sys) {
        function getRepeatedIds(t) {
            var e = [];
            return this.repeatedIdMap = {},
            this.getIds(t, e),
            e
        }
        function getIds(t, e) {
            if (t.namespace != sys.NS_W && t.attributes.id) {
                var i = t.attributes.id;
                this.repeatedIdMap[i] ? e.push(toXMLString(t)) : this.repeatedIdMap[i] = !0
            }
            var n = t.children;
            if (n)
                for (var r = n.length, o = 0; r > o; o++) {
                    var s = n[o];
                    1 !== s.nodeType || this.isInnerClass(s) || this.getIds(s, e)
                }
        }
        function toXMLString(t) {
            if (!t)
                return "";
            for (var e = "  at <" + t.name, i = t.attributes, n = Object.keys(i), r = n.length, o = 0; r > o; o++) {
                var s = n[o]
                  , a = i[s];
                ("id" != s || "__" != a.substring(0, 2)) && (e += " " + s + '="' + a + '"')
            }
            return e += 0 == t.children.length ? "/>" : ">"
        }
        function checkDeclarations(t, e) {
            if (t) {
                var i = t.children;
                if (i)
                    for (var n = i.length, r = 0; n > r; r++) {
                        var o = i[r];
                        1 == o.nodeType && (o.attributes.includeIn && e.push(toXMLString(o)),
                        o.attributes.excludeFrom && e.push(toXMLString(o)),
                        checkDeclarations(o, e))
                    }
            }
        }
        function getPropertyStr(t) {
            var e = toXMLString(t.parent)
              , i = toXMLString(t).substring(5);
            return e + "\n      	" + i
        }
        var exmlParserPool = []
          , parsedClasses = {}
          , innerClassCount = 1
          , HOST_COMPONENT = "hostComponent"
          , SKIN_CLASS = "eui.Skin"
          , DECLARATIONS = "Declarations"
          , RECTANGLE = "egret.Rectangle"
          , TYPE_CLASS = "Class"
          , TYPE_ARRAY = "Array"
          , TYPE_PERCENTAGE = "Percentage"
          , TYPE_STATE = "State[]"
          , SKIN_NAME = "skinName"
          , ELEMENTS_CONTENT = "elementsContent"
          , basicTypes = [TYPE_ARRAY, "boolean", "string", "number"]
          , wingKeys = ["id", "locked", "includeIn", "excludeFrom"]
          , htmlEntities = [["<", "&lt;"], [">", "&gt;"], ["&", "&amp;"], ['"', "&quot;"], ["'", "&apos;"]]
          , jsKeyWords = ["null", "NaN", "undefined", "true", "false"]
          , EXMLParser = function() {
            function EXMLParser() {
                this.delayAssignmentDic = {}
            }
            return EXMLParser.prototype.$parseCode = function(codeText, classStr) {
                var className = classStr ? classStr : "$exmlClass" + innerClassCount++
                  , clazz = eval(codeText)
                  , hasClass = !0;
                if (hasClass && clazz) {
                    egret.registerClass(clazz, className);
                    for (var paths = className.split("."), length_15 = paths.length, definition = __global, i = 0; length_15 - 1 > i; i++) {
                        var path = paths[i];
                        definition = definition[path] || (definition[path] = {})
                    }
                    definition[paths[length_15 - 1]] || (definition[paths[length_15 - 1]] = clazz)
                }
                return clazz
            }
            ,
            EXMLParser.prototype.parse = function(text) {
                var xmlData = null;
                xmlData = egret.XML.parse(text);
                var hasClass = !1
                  , className = "";
                xmlData.attributes["class"] ? (className = xmlData.attributes["class"],
                delete xmlData.attributes["class"],
                hasClass = !!className) : className = "$exmlClass" + innerClassCount++;
                var exClass = this.parseClass(xmlData, className)
                  , code = exClass.toCode()
                  , clazz = null;
                if (clazz = eval(code),
                hasClass && clazz) {
                    egret.registerClass(clazz, className);
                    for (var paths = className.split("."), length_16 = paths.length, definition = __global, i = 0; length_16 - 1 > i; i++) {
                        var path = paths[i];
                        definition = definition[path] || (definition[path] = {})
                    }
                    definition[paths[length_16 - 1]] || (definition[paths[length_16 - 1]] = clazz)
                }
                return clazz
            }
            ,
            EXMLParser.prototype.parseClass = function(t, e) {
                sys.exmlConfig || (sys.exmlConfig = new sys.EXMLConfig),
                this.currentXML = t,
                this.currentClassName = e,
                this.delayAssignmentDic = {},
                this.idDic = {},
                this.stateCode = [],
                this.stateNames = [],
                this.skinParts = [],
                this.bindings = [],
                this.declarations = null,
                this.currentClass = new sys.EXClass,
                this.stateIds = [];
                var i = e.lastIndexOf(".");
                -1 != i ? this.currentClass.className = e.substring(i + 1) : this.currentClass.className = e,
                this.startCompile();
                var n = this.currentClass;
                return this.currentClass = null,
                n
            }
            ,
            EXMLParser.prototype.startCompile = function() {
                var t = this.getClassNameOfNode(this.currentXML);
                this.isSkinClass = t == SKIN_CLASS,
                this.currentClass.superClass = t,
                this.getStateNames();
                var e = this.currentXML.children;
                if (e)
                    for (var i = e.length, n = 0; i > n; n++) {
                        var r = e[n];
                        if (1 === r.nodeType && r.namespace == sys.NS_W && r.localName == DECLARATIONS) {
                            this.declarations = r;
                            break
                        }
                    }
                this.currentXML.namespace && (this.addIds(this.currentXML.children),
                this.createConstructFunc())
            }
            ,
            EXMLParser.prototype.addIds = function(t) {
                if (t)
                    for (var e = t.length, i = 0; e > i; i++) {
                        var n = t[i];
                        if (1 == n.nodeType && n.namespace && !this.isInnerClass(n))
                            if (this.addIds(n.children),
                            n.namespace != sys.NS_W && n.localName) {
                                if (this.isProperty(n)) {
                                    var r = n.localName
                                      , o = r.indexOf(".")
                                      , s = n.children;
                                    if (-1 == o || !s || 0 == s.length)
                                        continue;
                                    var a = s[0];
                                    this.stateIds.push(a.attributes.id)
                                } else if (1 === n.nodeType) {
                                    var h = n.attributes.id;
                                    if (h) {
                                        var l = new RegExp("^[a-zA-Z_$]{1}[a-z0-9A-Z_$]*");
                                        null == h.match(l) && egret.$warn(2022, h),
                                        -1 == this.skinParts.indexOf(h) && this.skinParts.push(h),
                                        this.createVarForNode(n),
                                        this.isStateNode(n) && this.stateIds.push(h)
                                    } else
                                        this.createIdForNode(n),
                                        this.isStateNode(n) && this.stateIds.push(n.attributes.id)
                                }
                            } else
                                ;
                    }
            }
            ,
            EXMLParser.prototype.isInnerClass = function(t) {
                if (t.hasOwnProperty("isInnerClass"))
                    return t.isInnerClass;
                var e = "Skin" == t.localName && t.namespace == sys.NS_S;
                if (!e)
                    if (this.isProperty(t))
                        e = !1;
                    else {
                        var i = void 0
                          , n = t.parent;
                        if (this.isProperty(n)) {
                            i = n.localName;
                            var r = i.indexOf(".");
                            if (-1 != r) {
                                i.substring(r + 1);
                                i = i.substring(0, r)
                            }
                            n = n.parent
                        } else
                            i = sys.exmlConfig.getDefaultPropById(n.localName, n.namespace);
                        var o = sys.exmlConfig.getClassNameById(n.localName, n.namespace);
                        e = sys.exmlConfig.getPropertyType(i, o) == TYPE_CLASS
                    }
                return t.isInnerClass = e,
                e
            }
            ,
            EXMLParser.prototype.containsState = function(t) {
                var e = t.attributes;
                if (e.includeIn || e.excludeFrom)
                    return !0;
                for (var i = Object.keys(e), n = i.length, r = 0; n > r; r++) {
                    var o = i[r];
                    if (-1 != o.indexOf("."))
                        return !0
                }
                return !1
            }
            ,
            EXMLParser.prototype.createIdForNode = function(t) {
                var e = this.getNodeId(t);
                this.idDic[e] ? this.idDic[e]++ : this.idDic[e] = 1,
                e += this.idDic[e],
                t.attributes.id = e
            }
            ,
            EXMLParser.prototype.getNodeId = function(t) {
                return t.attributes.id ? t.attributes.id : "_" + t.localName
            }
            ,
            EXMLParser.prototype.createVarForNode = function(t) {
                var e = this.getClassNameOfNode(t);
                "" != e && (this.currentClass.getVariableByName(t.attributes.id) || this.currentClass.addVariable(new sys.EXVariable(t.attributes.id)))
            }
            ,
            EXMLParser.prototype.createFuncForNode = function(t) {
                var e = t.localName
                  , i = this.isBasicTypeData(e);
                if (i)
                    return this.createBasicTypeForNode(t);
                var n = this.getClassNameOfNode(t)
                  , r = new sys.EXFunction
                  , o = "_i"
                  , s = t.attributes.id;
                r.name = s + o,
                this.currentClass.addFunction(r);
                var a = new sys.EXCodeBlock;
                r.codeBlock = a;
                var h = "t";
                "Object" == e ? a.addVar(h, "{}") : a.addVar(h, "new " + n + "()");
                var l = !!this.currentClass.getVariableByName(s);
                l && a.addAssignment("this." + s, h),
                this.addAttributesToCodeBlock(a, h, t),
                this.initlizeChildNode(t, a, h);
                var u = this.delayAssignmentDic[s];
                if (u)
                    for (var p = u.length, c = 0; p > c; c++) {
                        var d = u[c];
                        a.concat(d)
                    }
                return a.addReturn(h),
                "this." + r.name + "()"
            }
            ,
            EXMLParser.prototype.isBasicTypeData = function(t) {
                return -1 != basicTypes.indexOf(t)
            }
            ,
            EXMLParser.prototype.createBasicTypeForNode = function(t) {
                var e = t.localName
                  , i = ""
                  , n = this.currentClass.getVariableByName(t.attributes.id)
                  , r = t.children
                  , o = "";
                if (r && r.length > 0) {
                    var s = r[0];
                    3 == s.nodeType && (o = s.text.trim())
                }
                switch (e) {
                case TYPE_ARRAY:
                    var a = [];
                    if (r)
                        for (var h = r.length, l = 0; h > l; l++) {
                            var u = r[l];
                            1 == u.nodeType && a.push(this.createFuncForNode(u))
                        }
                    i = "[" + a.join(",") + "]";
                    break;
                case "boolean":
                    i = "false" != o && o ? "true" : "false";
                    break;
                case "number":
                    i = o,
                    -1 != i.indexOf("%") && (i = i.substring(0, i.length - 1));
                    break;
                case "string":
                    i = this.formatString(o)
                }
                return n && (n.defaultValue = i),
                i
            }
            ,
            EXMLParser.prototype.addAttributesToCodeBlock = function(t, e, i) {
                var n, r, o = i.attributes, s = Object.keys(o);
                s.sort();
                for (var a = s.length, h = 0; a > h; h++)
                    if (n = s[h],
                    this.isNormalKey(n) && (r = o[n],
                    n = this.formatKey(n, r),
                    r = this.formatValue(n, r, i))) {
                        if (this.currentClass.getVariableByName(r)) {
                            var l = "this."
                              , u = o.id
                              , p = l + u + " = t;";
                            this.currentClass.getVariableByName(u) || this.createVarForNode(i),
                            t.containsCodeLine(p) || t.addCodeLineAt(p, 1);
                            var c = new sys.EXCodeBlock;
                            "this" == e ? c.addAssignment(e, l + r, n) : (c.startIf(l + u),
                            c.addAssignment(l + u, l + r, n),
                            c.endBlock()),
                            this.delayAssignmentDic[r] || (this.delayAssignmentDic[r] = []),
                            this.delayAssignmentDic[r].push(c),
                            r = l + r
                        }
                        t.addAssignment(e, r, n)
                    }
            }
            ,
            EXMLParser.prototype.initlizeChildNode = function(t, e, i) {
                var n = t.children;
                if (n && 0 != n.length) {
                    for (var r, o = sys.exmlConfig.getClassNameById(t.localName, t.namespace), s = [], a = n.length, h = [], l = 0; a > l; l++) {
                        var u = n[l];
                        if (1 == u.nodeType && u.namespace != sys.NS_W)
                            if (this.isInnerClass(u)) {
                                if ("Skin" == u.localName) {
                                    var p = this.parseInnerClass(u)
                                      , c = sys.exmlConfig.getPropertyType(SKIN_NAME, o);
                                    c ? e.addAssignment(i, p, SKIN_NAME) : egret.$error(2005, this.currentClassName, SKIN_NAME, getPropertyStr(u))
                                }
                            } else {
                                var d = u.localName;
                                if (this.isProperty(u)) {
                                    if (!this.isNormalKey(d))
                                        continue;
                                    var c = sys.exmlConfig.getPropertyType(u.localName, o);
                                    if (!c)
                                        continue;
                                    if (!u.children || 0 == u.children.length)
                                        continue;
                                    this.addChildrenToProp(u.children, c, d, e, i, r, h, t)
                                } else
                                    s.push(u)
                            }
                    }
                    if (0 != s.length) {
                        var f = sys.exmlConfig.getDefaultPropById(t.localName, t.namespace)
                          , y = sys.exmlConfig.getPropertyType(f, o);
                        f && y && this.addChildrenToProp(s, y, f, e, i, r, h, t)
                    }
                }
            }
            ,
            EXMLParser.prototype.parseInnerClass = function(t) {
                var e = exmlParserPool.pop();
                e || (e = new EXMLParser);
                var i = this.currentClass.className + "$" + t.localName + innerClassCount++
                  , n = e.parseClass(t, i);
                return this.currentClass.addInnerClass(n),
                exmlParserPool.push(e),
                i
            }
            ,
            EXMLParser.prototype.addChildrenToProp = function(t, e, i, n, r, o, s, a) {
                var h = ""
                  , l = t.length;
                if (l > 1) {
                    if (e != TYPE_ARRAY)
                        return;
                    for (var u = [], p = 0; l > p; p++) {
                        var c = t[p];
                        if (1 == c.nodeType) {
                            h = this.createFuncForNode(c);
                            this.getClassNameOfNode(c);
                            this.isStateNode(c) || u.push(h)
                        }
                    }
                    h = "[" + u.join(",") + "]"
                } else {
                    var d = t[0];
                    if (e == TYPE_ARRAY)
                        if (d.localName == TYPE_ARRAY) {
                            var u = [];
                            if (d.children)
                                for (var f = d.children.length, y = 0; f > y; y++) {
                                    var c = d.children[y];
                                    if (1 == c.nodeType) {
                                        h = this.createFuncForNode(c);
                                        this.getClassNameOfNode(c);
                                        this.isStateNode(c) || u.push(h)
                                    }
                                }
                            h = "[" + u.join(",") + "]"
                        } else {
                            h = this.createFuncForNode(d);
                            this.getClassNameOfNode(d);
                            h = this.isStateNode(d) ? "[]" : "[" + h + "]"
                        }
                    else if (1 == d.nodeType)
                        if (e == TYPE_CLASS) {
                            if (l > 1)
                                return;
                            h = this.parseInnerClass(t[0])
                        } else {
                            this.getClassNameOfNode(d);
                            h = this.createFuncForNode(d)
                        }
                    else
                        h = this.formatValue(i, d.text, a)
                }
                "" != h && (-1 == h.indexOf("()") && (i = this.formatKey(i, h)),
                -1 == s.indexOf(i) && s.push(i),
                n.addAssignment(r, h, i))
            }
            ,
            EXMLParser.prototype.isProperty = function(t) {
                if (t.hasOwnProperty("isProperty"))
                    return t.isProperty;
                var e, i = t.localName;
                if (i && 1 === t.nodeType && t.parent && !this.isBasicTypeData(i)) {
                    var n = t.parent
                      , r = i.indexOf(".");
                    -1 != r && (i = i.substr(0, r));
                    var o = sys.exmlConfig.getClassNameById(n.localName, n.namespace);
                    e = !!sys.exmlConfig.getPropertyType(i, o)
                } else
                    e = !1;
                return t.isProperty = e,
                e
            }
            ,
            EXMLParser.prototype.isNormalKey = function(t) {
                return t && -1 == t.indexOf(".") && -1 == t.indexOf(":") && -1 == wingKeys.indexOf(t) ? !0 : !1
            }
            ,
            EXMLParser.prototype.formatKey = function(t, e) {
                return -1 != e.indexOf("%") && ("height" == t ? t = "percentHeight" : "width" == t && (t = "percentWidth")),
                t
            }
            ,
            EXMLParser.prototype.formatValue = function(t, e, i) {
                e || (e = "");
                var n = e;
                e = e.trim();
                var r = this.getClassNameOfNode(i)
                  , o = sys.exmlConfig.getPropertyType(t, r)
                  , s = this.formatBinding(t, e, i);
                if (s) {
                    this.checkIdForState(i);
                    var a = "this";
                    i !== this.currentXML && (a += "." + i.attributes.id),
                    this.bindings.push(new sys.EXBinding(a,t,s.templates,s.chainIndex)),
                    e = ""
                } else if (o == RECTANGLE) {
                    e = "new " + RECTANGLE + "(" + e + ")"
                } else if (o == TYPE_PERCENTAGE)
                    -1 != e.indexOf("%") && (e = this.formatString(e));
                else {
                    switch (o) {
                    case TYPE_CLASS:
                        t == SKIN_NAME && (e = this.formatString(n));
                        break;
                    case "number":
                        0 == e.indexOf("#") ? e = "0x" + e.substring(1) : -1 != e.indexOf("%") && (e = parseFloat(e.substr(0, e.length - 1)).toString());
                        break;
                    case "boolean":
                        e = "false" != e && e ? "true" : "false";
                        break;
                    case "string":
                    case "any":
                        e = this.formatString(n)
                    }
                }
                return e
            }
            ,
            EXMLParser.prototype.formatString = function(t) {
                return t = this.unescapeHTMLEntity(t),
                t = t.split("\n").join("\\n"),
                t = t.split("\r").join("\\n"),
                t = t.split('"').join('\\"'),
                t = '"' + t + '"'
            }
            ,
            EXMLParser.prototype.formatBinding = function(t, e, i) {
                if (!e)
                    return null;
                if (e = e.trim(),
                "{" != e.charAt(0) || "}" != e.charAt(e.length - 1))
                    return null;
                e = e.substring(1, e.length - 1).trim();
                for (var n = -1 == e.indexOf("+") ? [e] : this.parseTemplates(e), r = [], o = n.length, s = 0; o > s; s++) {
                    var a = n[s].trim();
                    if (a) {
                        var h = a.charAt(0);
                        if (!("'" == h || '"' == h || h >= "0" && "9" >= h || "-" == h || -1 == a.indexOf(".") && -1 != jsKeyWords.indexOf(a))) {
                            0 == a.indexOf("this.") && (a = a.substring(5));
                            var l = a.split(".")[0];
                            l != HOST_COMPONENT && -1 == this.skinParts.indexOf(l) && (a = HOST_COMPONENT + "." + a),
                            n[s] = '"' + a + '"',
                            r.push(s)
                        }
                    } else
                        n.splice(s, 1),
                        s--,
                        o--
                }
                return {
                    templates: n,
                    chainIndex: r
                }
            }
            ,
            EXMLParser.prototype.parseTemplates = function(t) {
                if (-1 == t.indexOf("'"))
                    return t.split("+");
                var e = !1
                  , i = "";
                for (t = t.split("\\'").join("0"); t.length > 0; ) {
                    var n = t.indexOf("'");
                    if (-1 == n) {
                        i += t;
                        break
                    }
                    i += t.substring(0, n + 1),
                    t = t.substring(n + 1),
                    n = t.indexOf("'"),
                    -1 == n && (n = t.length - 1,
                    e = !0);
                    var r = t.substring(0, n + 1);
                    i += r.split("+").join("1"),
                    t = t.substring(n + 1)
                }
                t = i.split("0").join("\\'"),
                e && (t += "'");
                for (var o = t.split("+"), s = o.length, a = 0; s > a; a++)
                    o[a] = o[a].split("1").join("+");
                return o
            }
            ,
            EXMLParser.prototype.unescapeHTMLEntity = function(t) {
                if (!t)
                    return "";
                for (var e = htmlEntities.length, i = 0; e > i; i++) {
                    var n = htmlEntities[i]
                      , r = n[0]
                      , o = n[1];
                    t = t.split(o).join(r)
                }
                return t
            }
            ,
            EXMLParser.prototype.createConstructFunc = function() {
                var t = new sys.EXCodeBlock;
                t.addEmptyLine();
                var e = "this";
                if (this.addAttributesToCodeBlock(t, e, this.currentXML),
                this.declarations) {
                    var i = this.declarations.children;
                    if (i && i.length > 0)
                        for (var n = i.length, r = 0; n > r; r++) {
                            var o = i[r];
                            if (1 == o.nodeType) {
                                var s = this.createFuncForNode(o);
                                s && t.addCodeLine(s + ";")
                            }
                        }
                }
                this.initlizeChildNode(this.currentXML, t, e);
                var a, h, l = this.stateIds;
                if (l.length > 0) {
                    h = l.length;
                    for (var r = 0; h > r; r++)
                        a = l[r],
                        t.addCodeLine("this." + a + "_i();");
                    t.addEmptyLine()
                }
                var u = this.skinParts
                  , p = "[]";
                if (h = u.length,
                h > 0) {
                    for (var r = 0; h > r; r++)
                        u[r] = '"' + u[r] + '"';
                    p = "[" + u.join(",") + "]"
                }
                var c = new sys.EXFunction;
                c.name = "skinParts",
                c.isGet = !0;
                var d = new sys.EXCodeBlock;
                d.addReturn(p),
                c.codeBlock = d,
                this.currentClass.addFunction(c),
                this.currentXML.attributes.id = "",
                this.createStates(this.currentXML);
                for (var f, y = this.currentXML, g = (this.getClassNameOfNode(y),
                y.attributes), v = Object.keys(g), m = v.length, $ = 0; m > $; $++) {
                    var E = v[$]
                      , C = g[E]
                      , _ = E.indexOf(".");
                    if (-1 != _) {
                        var S = E.substring(0, _);
                        S = this.formatKey(S, C);
                        var T = this.formatValue(S, C, y);
                        if (!T)
                            continue;
                        var P = E.substr(_ + 1);
                        f = this.getStateByName(P, y);
                        var b = f.length;
                        if (b > 0)
                            for (var r = 0; b > r; r++) {
                                var x = f[r];
                                x.addOverride(new sys.EXSetProperty("",S,T))
                            }
                    }
                }
                var I = this.stateCode;
                if (h = I.length,
                h > 0) {
                    var L = "	";
                    t.addCodeLine("this.states = [");
                    for (var N = !0, r = 0; h > r; r++) {
                        var x = I[r];
                        N ? N = !1 : t.addCodeLine(L + ",");
                        for (var O = x.toCode().split("\n"), A = 0; A < O.length; ) {
                            var M = O[A];
                            M && t.addCodeLine(L + M),
                            A++
                        }
                    }
                    t.addCodeLine("];")
                }
                var B = this.bindings;
                if (h = B.length,
                h > 0) {
                    t.addEmptyLine();
                    for (var r = 0; h > r; r++) {
                        var D = B[r];
                        t.addCodeLine(D.toCode())
                    }
                }
                this.currentClass.constructCode = t
            }
            ,
            EXMLParser.prototype.isStateNode = function(t) {
                var e = t.attributes;
                return e.hasOwnProperty("includeIn") || e.hasOwnProperty("excludeFrom")
            }
            ,
            EXMLParser.prototype.getStateNames = function() {
                var t = this.currentXML
                  , e = sys.exmlConfig.getClassNameById(t.localName, t.namespace)
                  , i = sys.exmlConfig.getPropertyType("states", e);
                if (i == TYPE_STATE) {
                    var n = t.attributes.states;
                    n && delete t.attributes.states;
                    var r, o, s = this.stateNames, a = t.children;
                    if (a)
                        for (var h = a.length, l = 0; h > l; l++)
                            if (o = a[l],
                            1 == o.nodeType && "states" == o.localName) {
                                o.namespace = sys.NS_W,
                                r = o.children;
                                break
                            }
                    if (r || n)
                        if (n)
                            for (var u = n.split(","), p = u.length, l = 0; p > l; l++) {
                                var c = u[l].trim();
                                c && (-1 == s.indexOf(c) && s.push(c),
                                this.stateCode.push(new sys.EXState(c)))
                            }
                        else
                            for (var d = r.length, l = 0; d > l; l++) {
                                var f = r[l];
                                if (1 == f.nodeType) {
                                    var y = []
                                      , g = f.attributes;
                                    if (g.stateGroups)
                                        for (var v = g.stateGroups.split(","), m = v.length, $ = 0; m > $; $++) {
                                            var E = v[$].trim();
                                            E && (-1 == s.indexOf(E) && s.push(E),
                                            y.push(E))
                                        }
                                    var c = g.name;
                                    -1 == s.indexOf(c) && s.push(c),
                                    this.stateCode.push(new sys.EXState(c,y))
                                }
                            }
                }
            }
            ,
            EXMLParser.prototype.createStates = function(t) {
                var e = t.children;
                if (e)
                    for (var i = e.length, n = 0; i > n; n++) {
                        var r = e[n];
                        if (1 == r.nodeType && !this.isInnerClass(r) && (this.createStates(r),
                        r.namespace != sys.NS_W && r.localName))
                            if (this.isProperty(r)) {
                                var o = r.localName
                                  , s = o.indexOf(".")
                                  , a = r.children;
                                if (-1 == s || !a || 0 == a.length)
                                    continue;
                                var h = o.substring(s + 1);
                                o = o.substring(0, s);
                                var l = this.getClassNameOfNode(t)
                                  , u = (sys.exmlConfig.getPropertyType(o, l),
                                a[0])
                                  , p = void 0;
                                1 == u.nodeType ? (this.createFuncForNode(u),
                                this.checkIdForState(u),
                                p = "this." + u.attributes.id) : p = this.formatValue(o, u.text, t);
                                var c = this.getStateByName(h, r)
                                  , d = c.length;
                                if (d > 0)
                                    for (var f = 0; d > f; f++) {
                                        var y = c[f];
                                        y.addOverride(new sys.EXSetProperty(t.attributes.id,o,p))
                                    }
                            } else if (this.containsState(r)) {
                                var g = r.attributes
                                  , v = g.id;
                                this.getClassNameOfNode(r);
                                this.checkIdForState(r);
                                var h = void 0
                                  , c = void 0
                                  , y = void 0;
                                if (this.isStateNode(r)) {
                                    var m = ""
                                      , $ = r.parent;
                                    $.localName == TYPE_ARRAY && ($ = $.parent),
                                    $ && $.parent && this.isProperty($) && ($ = $.parent),
                                    $ && $ != this.currentXML && (m = $.attributes.id,
                                    this.checkIdForState($));
                                    var E = this.findNearNodeId(r)
                                      , C = [];
                                    if (g.includeIn)
                                        C = g.includeIn.split(",");
                                    else {
                                        for (var _ = g.excludeFrom.split(","), S = _.length, f = 0; S > f; f++) {
                                            var T = _[f];
                                            this.getStateByName(T, r)
                                        }
                                        S = this.stateCode.length;
                                        for (var f = 0; S > f; f++)
                                            y = this.stateCode[f],
                                            -1 == _.indexOf(y.name) && C.push(y.name)
                                    }
                                    for (var P = C.length, b = 0; P > b; b++)
                                        if (h = C[b],
                                        c = this.getStateByName(h, r),
                                        c.length > 0)
                                            for (var d = c.length, f = 0; d > f; f++)
                                                y = c[f],
                                                y.addOverride(new sys.EXAddItems(v,m,E.position,E.relativeTo))
                                }
                                for (var x = Object.keys(g), I = x.length, L = 0; I > L; L++) {
                                    var N = x[L]
                                      , p = g[N]
                                      , s = N.indexOf(".");
                                    if (-1 != s) {
                                        var O = N.substring(0, s);
                                        O = this.formatKey(O, p);
                                        var A = this.formatBinding(O, p, r);
                                        if (!A && (p = this.formatValue(O, p, r),
                                        !p))
                                            continue;
                                        h = N.substr(s + 1),
                                        c = this.getStateByName(h, r);
                                        var d = c.length;
                                        if (d > 0)
                                            for (var f = 0; d > f; f++)
                                                y = c[f],
                                                A ? y.addOverride(new sys.EXSetStateProperty(v,O,A.templates,A.chainIndex)) : y.addOverride(new sys.EXSetProperty(v,O,p))
                                    }
                                }
                            }
                    }
            }
            ,
            EXMLParser.prototype.checkIdForState = function(t) {
                if (t && !this.currentClass.getVariableByName(t.attributes.id)) {
                    this.createVarForNode(t);
                    var e = t.attributes.id
                      , i = e + "_i"
                      , n = this.currentClass.getFuncByName(i);
                    if (n) {
                        var r = "this." + e + " = t;"
                          , o = n.codeBlock;
                        o && (o.containsCodeLine(r) || o.addCodeLineAt(r, 1))
                    }
                }
            }
            ,
            EXMLParser.prototype.getStateByName = function(t, e) {
                for (var i = [], n = this.stateCode, r = n.length, o = 0; r > o; o++) {
                    var s = n[o];
                    if (s.name == t)
                        -1 == i.indexOf(s) && i.push(s);
                    else if (s.stateGroups.length > 0) {
                        for (var a = !1, h = s.stateGroups.length, l = 0; h > l; l++) {
                            var u = s.stateGroups[l];
                            if (u == t) {
                                a = !0;
                                break
                            }
                        }
                        a && -1 == i.indexOf(s) && i.push(s)
                    }
                }
                return i
            }
            ,
            EXMLParser.prototype.findNearNodeId = function(t) {
                for (var e, i, n, r = t.parent, o = "", s = -1, a = !1, h = r.children, l = h.length, u = 0; l > u; u++) {
                    var p = h[u];
                    this.isProperty(p) || (p == t ? (a = !0,
                    s = u) : !a || n || this.isStateNode(p) || (n = p),
                    a || this.isStateNode(p) || (i = p))
                }
                return 0 == s ? (e = 0,
                {
                    position: e,
                    relativeTo: o
                }) : s == l - 1 ? (e = 1,
                {
                    position: e,
                    relativeTo: o
                }) : n && (e = 2,
                o = n.attributes.id) ? (this.checkIdForState(n),
                {
                    position: e,
                    relativeTo: o
                }) : {
                    position: 1,
                    relativeTo: o
                }
            }
            ,
            EXMLParser.prototype.getClassNameOfNode = function(t) {
                var e = sys.exmlConfig.getClassNameById(t.localName, t.namespace);
                return e
            }
            ,
            EXMLParser
        }();
        sys.EXMLParser = EXMLParser,
        __reflect(EXMLParser.prototype, "eui.sys.EXMLParser")
    }(sys = eui.sys || (eui.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.$selected = !1,
            t.$autoSelected = !0,
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "selected", {
            get: function() {
                return this.$selected
            },
            set: function(t) {
                this.$setSelected(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setSelected = function(e) {
            return e = !!e,
            e === this.$selected ? !1 : (this.$selected = e,
            this.invalidateState(),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selected"),
            !0)
        }
        ,
        i.prototype.getCurrentState = function() {
            var t = e.prototype.getCurrentState.call(this);
            if (this.$selected) {
                var i = t + "AndSelected"
                  , n = this.skin;
                return n && n.hasState(i) ? i : "disabled" == t ? "disabled" : "down"
            }
            return t
        }
        ,
        i.prototype.buttonReleased = function() {
            this.$autoSelected && (this.selected = !this.$selected,
            this.dispatchEventWith(egret.Event.CHANGE))
        }
        ,
        i
    }(t.Button);
    t.ToggleButton = e,
    __reflect(e.prototype, "eui.ToggleButton"),
    t.registerBindable(e.prototype, "selected")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.$horizontalAlign = "left",
            e.$verticalAlign = "top",
            e.$gap = 6,
            e.$paddingLeft = 0,
            e.$paddingRight = 0,
            e.$paddingTop = 0,
            e.$paddingBottom = 0,
            e.elementSizeTable = [],
            e.startIndex = -1,
            e.endIndex = -1,
            e.indexInViewCalculated = !1,
            e.maxElementSize = 0,
            e
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "horizontalAlign", {
            get: function() {
                return this.$horizontalAlign
            },
            set: function(t) {
                this.$horizontalAlign != t && (this.$horizontalAlign = t,
                this.$target && this.$target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "verticalAlign", {
            get: function() {
                return this.$verticalAlign
            },
            set: function(t) {
                this.$verticalAlign != t && (this.$verticalAlign = t,
                this.$target && this.$target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "gap", {
            get: function() {
                return this.$gap
            },
            set: function(t) {
                t = +t || 0,
                this.$gap !== t && (this.$gap = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "paddingLeft", {
            get: function() {
                return this.$paddingLeft
            },
            set: function(t) {
                t = +t || 0,
                this.$paddingLeft !== t && (this.$paddingLeft = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "paddingRight", {
            get: function() {
                return this.$paddingRight
            },
            set: function(t) {
                t = +t || 0,
                this.$paddingRight !== t && (this.$paddingRight = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "paddingTop", {
            get: function() {
                return this.$paddingTop
            },
            set: function(t) {
                t = +t || 0,
                this.$paddingTop !== t && (this.$paddingTop = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "paddingBottom", {
            get: function() {
                return this.$paddingBottom
            },
            set: function(t) {
                t = +t || 0,
                this.$paddingBottom !== t && (this.$paddingBottom = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.invalidateTargetLayout = function() {
            var t = this.$target;
            t && (t.invalidateSize(),
            t.invalidateDisplayList())
        }
        ,
        e.prototype.measure = function() {
            this.$target && (this.$useVirtualLayout ? this.measureVirtual() : this.measureReal())
        }
        ,
        e.prototype.measureReal = function() {}
        ,
        e.prototype.measureVirtual = function() {}
        ,
        e.prototype.updateDisplayList = function(t, e) {
            var i = this.$target;
            if (i)
                return 0 == i.numElements ? void i.setContentSize(Math.ceil(this.$paddingLeft + this.$paddingRight), Math.ceil(this.$paddingTop + this.$paddingBottom)) : void (this.$useVirtualLayout ? this.updateDisplayListVirtual(t, e) : this.updateDisplayListReal(t, e))
        }
        ,
        e.prototype.getStartPosition = function(t) {
            return 0
        }
        ,
        e.prototype.getElementSize = function(t) {
            return 0
        }
        ,
        e.prototype.getElementTotalSize = function() {
            return 0
        }
        ,
        e.prototype.elementRemoved = function(e) {
            this.$useVirtualLayout && (t.prototype.elementRemoved.call(this, e),
            this.elementSizeTable.splice(e, 1))
        }
        ,
        e.prototype.clearVirtualLayoutCache = function() {
            this.$useVirtualLayout && (this.elementSizeTable = [],
            this.maxElementSize = 0)
        }
        ,
        e.prototype.findIndexAt = function(t, e, i) {
            var n = .5 * (e + i) | 0
              , r = this.getStartPosition(n)
              , o = this.getElementSize(n);
            return t >= r && t < r + o + this.$gap ? n : e == i ? -1 : r > t ? this.findIndexAt(t, e, Math.max(e, n - 1)) : this.findIndexAt(t, Math.min(n + 1, i), i)
        }
        ,
        e.prototype.scrollPositionChanged = function() {
            if (t.prototype.scrollPositionChanged.call(this),
            this.$useVirtualLayout) {
                var e = this.getIndexInView();
                e && (this.indexInViewCalculated = !0,
                this.target.invalidateDisplayList())
            }
        }
        ,
        e.prototype.getIndexInView = function() {
            return !1
        }
        ,
        e.prototype.updateDisplayListVirtual = function(t, e) {}
        ,
        e.prototype.updateDisplayListReal = function(t, e) {}
        ,
        e.prototype.flexChildrenProportionally = function(t, e, i, n) {
            var r, o = n.length;
            do {
                r = !0;
                var s = e - t * i / 100;
                s > 0 ? e -= s : s = 0;
                for (var a = e / i, h = 0; o > h; h++) {
                    var l = n[h]
                      , u = l.percent * a;
                    if (u < l.min) {
                        var p = l.min;
                        l.size = p,
                        n[h] = n[--o],
                        n[o] = l,
                        i -= l.percent,
                        s >= p ? s -= p : (e -= p - s,
                        s = 0),
                        r = !1;
                        break
                    }
                    if (u > l.max) {
                        var c = l.max;
                        l.size = c,
                        n[h] = n[--o],
                        n[o] = l,
                        i -= l.percent,
                        s >= c ? s -= c : (e -= c - s,
                        s = 0),
                        r = !1;
                        break
                    }
                    l.size = u
                }
            } while (!r)
        }
        ,
        e
    }(t.LayoutBase);
    t.LinearLayoutBase = e,
    __reflect(e.prototype, "eui.LinearLayoutBase")
}(eui || (eui = {})),
function(t) {
    var e;
    !function(t) {
        var e = function() {
            function t() {
                this.layoutElement = null,
                this.size = 0,
                this.percent = 0 / 0,
                this.min = 0 / 0,
                this.max = 0 / 0
            }
            return t
        }();
        t.ChildInfo = e,
        __reflect(e.prototype, "eui.sys.ChildInfo")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            return t.call(this) || this
        }
        return __extends(e, t),
        e.prototype.pointToValue = function(t, e) {
            if (!this.thumb || !this.track)
                return 0;
            var i = this.$Range
              , n = i[0] - i[2]
              , r = this.getThumbRange();
            return i[2] + (0 != r ? t / r * n : 0)
        }
        ,
        e.prototype.getThumbRange = function() {
            var t = egret.$TempRectangle;
            this.track.getLayoutBounds(t);
            var e = t.width;
            return this.thumb.getLayoutBounds(t),
            e - t.width
        }
        ,
        e.prototype.updateSkinDisplayList = function() {
            if (this.thumb && this.track) {
                var t = this.$Range
                  , e = this.getThumbRange()
                  , i = t[0] - t[2]
                  , n = i > 0 ? (this.pendingValue - t[2]) / i * e : 0
                  , r = this.track.localToGlobal(n, 0, egret.$TempPoint)
                  , o = r.x
                  , s = r.y
                  , a = this.thumb.$parent.globalToLocal(o, s, egret.$TempPoint).x
                  , h = egret.$TempRectangle;
                if (this.thumb.getLayoutBounds(h),
                this.thumb.setLayoutBoundsPosition(Math.round(a), h.y),
                this.trackHighlight && this.trackHighlight.$parent) {
                    var l = this.trackHighlight.$parent.globalToLocal(o, s, egret.$TempPoint).x - n;
                    this.trackHighlight.x = Math.round(l),
                    this.trackHighlight.width = Math.round(n)
                }
            }
        }
        ,
        e
    }(t.SliderBase);
    t.HSlider = e,
    __reflect(e.prototype, "eui.HSlider")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = []
      , i = {}
      , n = {}
      , r = function() {
        function t() {}
        return t.prototype.getAsset = function(t, r, o) {
            var s = i[t];
            if (s)
                return void s.push([r, o]);
            var a = e.pop();
            a || (a = new egret.ImageLoader),
            i[t] = [[r, o]],
            n[a.$hashCode] = t,
            a.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this),
            a.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this),
            a.load(t)
        }
        ,
        t.prototype.onLoadFinish = function(t) {
            var r = t.currentTarget;
            r.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this),
            r.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            var o;
            t.$type == egret.Event.COMPLETE && (o = new egret.Texture,
            o._setBitmapData(r.data),
            r.data = null),
            e.push(r);
            var s = n[r.$hashCode];
            delete n[r.$hashCode];
            var a = i[s];
            delete i[s];
            for (var h = a.length, l = 0; h > l; l++) {
                var u = a[l];
                u[0].call(u[1], o, s)
            }
        }
        ,
        t
    }();
    t.DefaultAssetAdapter = r,
    __reflect(r.prototype, "eui.DefaultAssetAdapter", ["eui.IAssetAdapter"])
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i(t) {
            var i = e.call(this) || this;
            return i.sourceChanged = !1,
            i._source = null,
            i.initializeUIValues(),
            t && (i.source = t),
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "scale9Grid", {
            get: function() {
                return this.$scale9Grid
            },
            set: function(t) {
                this.$scale9Grid = t,
                this.$invalidateContentBounds(),
                this.invalidateDisplayList()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "fillMode", {
            get: function() {
                return this.$fillMode
            },
            set: function(t) {
                t != this.$fillMode && (this.$fillMode = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setFillMode = function(t) {
            var i = e.prototype.$setFillMode.call(this, t);
            return this.invalidateDisplayList(),
            i
        }
        ,
        Object.defineProperty(i.prototype, "source", {
            get: function() {
                return this._source
            },
            set: function(t) {
                t != this._source && (this._source = t,
                this.$stage ? this.parseSource() : (this.sourceChanged = !0,
                this.invalidateProperties()))
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setBitmapData = function(t) {
            if (t == this.$Bitmap[0])
                return !1;
            var i = e.prototype.$setBitmapData.call(this, t);
            return this.sourceChanged = !1,
            this.invalidateSize(),
            this.invalidateDisplayList(),
            i
        }
        ,
        i.prototype.parseSource = function() {
            var e = this;
            this.sourceChanged = !1;
            var i = this._source;
            i && "string" == typeof i ? t.getAssets(this._source, function(t) {
                i === e._source && egret.is(t, "egret.Texture") && (e.$setBitmapData(t),
                t && e.dispatchEventWith(egret.Event.COMPLETE))
            }) : this.$setBitmapData(i)
        }
        ,
        i.prototype.$measureContentBounds = function(t) {
            var e = (this.$Bitmap,
            this.$Bitmap[0]);
            if (e) {
                var i = this.$UIComponent
                  , n = i[10]
                  , r = i[11];
                if (isNaN(n) || isNaN(r))
                    return void t.setEmpty();
                "clip" == this.$fillMode && (n > e.$getTextureWidth() && (n = e.$getTextureWidth()),
                r > e.$getTextureHeight() && (r = e.$getTextureHeight())),
                t.setTo(0, 0, n, r)
            } else
                t.setEmpty()
        }
        ,
        i.prototype.$render = function() {
            var t = this.$Bitmap[0];
            if (t) {
                var e = this.$UIComponent
                  , i = e[10]
                  , n = e[11];
                if (0 !== i && 0 !== n) {
                    var r = this.$Bitmap;
                    egret.sys.BitmapNode.$updateTextureData(this.$renderNode, r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], i, n, r[13], r[14], this.scale9Grid || r[0].scale9Grid, this.$fillMode, r[10])
                }
            }
        }
        ,
        i.prototype.createChildren = function() {
            this.sourceChanged && this.parseSource()
        }
        ,
        i.prototype.childrenCreated = function() {}
        ,
        i.prototype.commitProperties = function() {
            t.sys.UIComponentImpl.prototype.commitProperties.call(this),
            this.sourceChanged && this.parseSource()
        }
        ,
        i.prototype.measure = function() {
            var t = this.$Bitmap[0];
            t ? this.setMeasuredSize(t.$getTextureWidth(), t.$getTextureHeight()) : this.setMeasuredSize(0, 0)
        }
        ,
        i.prototype.updateDisplayList = function(t, e) {
            this.$invalidateContentBounds()
        }
        ,
        i.prototype.invalidateParentLayout = function() {}
        ,
        i.prototype.setMeasuredSize = function(t, e) {}
        ,
        i.prototype.invalidateProperties = function() {}
        ,
        i.prototype.validateProperties = function() {}
        ,
        i.prototype.invalidateSize = function() {}
        ,
        i.prototype.validateSize = function(t) {}
        ,
        i.prototype.invalidateDisplayList = function() {}
        ,
        i.prototype.validateDisplayList = function() {}
        ,
        i.prototype.validateNow = function() {}
        ,
        i.prototype.setLayoutBoundsSize = function(t, e) {}
        ,
        i.prototype.setLayoutBoundsPosition = function(t, e) {}
        ,
        i.prototype.getLayoutBounds = function(t) {}
        ,
        i.prototype.getPreferredBounds = function(t) {}
        ,
        i
    }(egret.Bitmap);
    t.Image = e,
    __reflect(e.prototype, "eui.Image", ["eui.UIComponent", "egret.DisplayObject"]),
    t.sys.implementUIComponent(e, egret.Bitmap),
    t.registerProperty(e, "scale9Grid", "egret.Rectangle")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t._data = null,
            t._selected = !1,
            t.itemIndex = -1,
            t.touchCaptured = !1,
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t),
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "data", {
            get: function() {
                return this._data
            },
            set: function(e) {
                this._data = e,
                t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "data"),
                this.dataChanged()
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.dataChanged = function() {}
        ,
        Object.defineProperty(i.prototype, "selected", {
            get: function() {
                return this._selected
            },
            set: function(t) {
                this._selected != t && (this._selected = t,
                this.invalidateState())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.onTouchCancle = function(t) {
            this.touchCaptured = !1;
            var e = t.$currentTarget;
            e.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this),
            e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            this.invalidateState()
        }
        ,
        i.prototype.onTouchBegin = function(t) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this),
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            this.touchCaptured = !0,
            this.invalidateState(),
            t.updateAfterEvent()
        }
        ,
        i.prototype.onStageTouchEnd = function(t) {
            var e = t.$currentTarget;
            e.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this),
            e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this),
            this.touchCaptured = !1,
            this.invalidateState()
        }
        ,
        i.prototype.getCurrentState = function() {
            var t = "up";
            if (this.enabled || (t = "disabled"),
            this.touchCaptured && (t = "down"),
            this._selected) {
                var e = t + "AndSelected"
                  , i = this.skin;
                return i && i.hasState(e) ? e : "disabled" == t ? "disabled" : "down"
            }
            return t
        }
        ,
        i
    }(t.Component);
    t.ItemRenderer = e,
    __reflect(e.prototype, "eui.ItemRenderer", ["eui.IItemRenderer"]),
    t.registerBindable(e.prototype, "data")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = t.sys.UIComponentImpl
      , i = function(i) {
        function n(t) {
            var e = i.call(this) || this;
            return e.$styleSetMap = {
                fontFamily: !0,
                size: !0,
                bold: !0,
                italic: !0,
                textAlign: !0,
                verticalAlign: !0,
                lineSpacing: !0,
                textColor: !0,
                wordWrap: !0,
                displayAsPassword: !0,
                strokeColor: !0,
                stroke: !0,
                maxChars: !0,
                multiline: !0,
                border: !0,
                borderColor: !0,
                background: !0,
                backgroundColor: !0
            },
            e.$revertStyle = {},
            e.$style = null,
            e.$changeFromStyle = !1,
            e._widthConstraint = 0 / 0,
            e.initializeUIValues(),
            e.text = t,
            e
        }
        return __extends(n, i),
        Object.defineProperty(n.prototype, "style", {
            get: function() {
                return this.$style
            },
            set: function(t) {
                this.$setStyle(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setStyle = function(t) {
            if (this.$style != t) {
                this.$style = t;
                var e = egret.getImplementation("eui.Theme");
                if (e) {
                    this.$changeFromStyle = !0;
                    for (var i in this.$revertStyle)
                        this[i] = this.$revertStyle[i];
                    if (this.$revertStyle = {},
                    null == t)
                        return void (this.$changeFromStyle = !1);
                    for (var n = t.split(","), r = 0; r < n.length; r++) {
                        var o = e.$getStyleConfig(n[r]);
                        if (o)
                            for (var i in o)
                                if (this.$styleSetMap[i]) {
                                    var s = this[i];
                                    this[i] = o[i],
                                    this.$revertStyle[i] = s
                                }
                    }
                    this.$changeFromStyle = !1
                }
            }
        }
        ,
        n.prototype.$setFontFamily = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.fontFanily,
            this.$styleSetMap.fontFanily = !1),
            i.prototype.$setFontFamily.call(this, t)
        }
        ,
        n.prototype.$setSize = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.size,
            this.$styleSetMap.size = !1),
            i.prototype.$setSize.call(this, t)
        }
        ,
        n.prototype.$setBold = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.bold,
            this.$styleSetMap.bold = !1),
            i.prototype.$setBold.call(this, t)
        }
        ,
        n.prototype.$setItalic = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.italic,
            this.$styleSetMap.italic = !1),
            i.prototype.$setItalic.call(this, t)
        }
        ,
        n.prototype.$setTextAlign = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.textAlign,
            this.$styleSetMap.textAlign = !1),
            i.prototype.$setTextAlign.call(this, t)
        }
        ,
        n.prototype.$setVerticalAlign = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.verticalAlign,
            this.$styleSetMap.verticalAlign = !1),
            i.prototype.$setVerticalAlign.call(this, t)
        }
        ,
        n.prototype.$setLineSpacing = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.lineSpacing,
            this.$styleSetMap.lineSpacing = !1),
            i.prototype.$setLineSpacing.call(this, t)
        }
        ,
        n.prototype.$setTextColor = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.textColor,
            this.$styleSetMap.textColor = !1),
            i.prototype.$setTextColor.call(this, t)
        }
        ,
        n.prototype.$setWordWrap = function(t) {
            this.$changeFromStyle || (delete this.$revertStyle.wordWrap,
            this.$styleSetMap.wordWrap = !1),
            i.prototype.$setWordWrap.call(this, t)
        }
        ,
        n.prototype.$setDisplayAsPassword = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.displayAsPassword,
            this.$styleSetMap.displayAsPassword = !1),
            i.prototype.$setDisplayAsPassword.call(this, t)
        }
        ,
        n.prototype.$setStrokeColor = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.strokeColor,
            this.$styleSetMap.strokeColor = !1),
            i.prototype.$setStrokeColor.call(this, t)
        }
        ,
        n.prototype.$setStroke = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.stroke,
            this.$styleSetMap.stroke = !1),
            i.prototype.$setStroke.call(this, t)
        }
        ,
        n.prototype.$setMaxChars = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.maxChars,
            this.$styleSetMap.maxChars = !1),
            i.prototype.$setMaxChars.call(this, t)
        }
        ,
        n.prototype.$setMultiline = function(t) {
            return this.$changeFromStyle || (delete this.$revertStyle.multiline,
            this.$styleSetMap.multiline = !1),
            i.prototype.$setMultiline.call(this, t)
        }
        ,
        n.prototype.$setBorder = function(t) {
            this.$changeFromStyle || (delete this.$revertStyle.border,
            this.$styleSetMap.border = !1),
            i.prototype.$setBorder.call(this, t)
        }
        ,
        n.prototype.$setBorderColor = function(t) {
            this.$changeFromStyle || (delete this.$revertStyle.borderColor,
            this.$styleSetMap.borderColor = !1),
            i.prototype.$setBorderColor.call(this, t)
        }
        ,
        n.prototype.$setBackground = function(t) {
            this.$changeFromStyle || (delete this.$revertStyle.background,
            this.$styleSetMap.background = !1),
            i.prototype.$setBackground.call(this, t)
        }
        ,
        n.prototype.$setBackgroundColor = function(t) {
            this.$changeFromStyle || (delete this.$revertStyle.backgroundColor,
            this.$styleSetMap.backgroundColor = !1),
            i.prototype.$setBackgroundColor.call(this, t)
        }
        ,
        n.prototype.$invalidateContentBounds = function() {
            i.prototype.$invalidateContentBounds.call(this),
            this.invalidateSize()
        }
        ,
        n.prototype.$setWidth = function(t) {
            var n = i.prototype.$setWidth.call(this, t)
              , r = e.prototype.$setWidth.call(this, t);
            return n && r
        }
        ,
        n.prototype.$setHeight = function(t) {
            var n = i.prototype.$setHeight.call(this, t)
              , r = e.prototype.$setHeight.call(this, t);
            return n && r
        }
        ,
        n.prototype.$setText = function(e) {
            var n = i.prototype.$setText.call(this, e);
            return t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "text"),
            n
        }
        ,
        n.prototype.createChildren = function() {}
        ,
        n.prototype.childrenCreated = function() {}
        ,
        n.prototype.commitProperties = function() {}
        ,
        n.prototype.measure = function() {
            var t = this.$UIComponent
              , e = this.$TextField
              , n = e[3]
              , r = 0 / 0;
            isNaN(this._widthConstraint) ? isNaN(t[8]) ? 1e5 != t[13] && (r = t[13]) : r = t[8] : (r = this._widthConstraint,
            this._widthConstraint = 0 / 0),
            i.prototype.$setWidth.call(this, r),
            this.setMeasuredSize(this.textWidth, this.textHeight),
            i.prototype.$setWidth.call(this, n)
        }
        ,
        n.prototype.updateDisplayList = function(t, e) {
            i.prototype.$setWidth.call(this, t),
            i.prototype.$setHeight.call(this, e)
        }
        ,
        n.prototype.invalidateParentLayout = function() {}
        ,
        n.prototype.setMeasuredSize = function(t, e) {}
        ,
        n.prototype.invalidateProperties = function() {}
        ,
        n.prototype.validateProperties = function() {}
        ,
        n.prototype.invalidateSize = function() {}
        ,
        n.prototype.validateSize = function(t) {}
        ,
        n.prototype.invalidateDisplayList = function() {}
        ,
        n.prototype.validateDisplayList = function() {}
        ,
        n.prototype.validateNow = function() {}
        ,
        n.prototype.setLayoutBoundsSize = function(t, i) {
            if (e.prototype.setLayoutBoundsSize.call(this, t, i),
            isNaN(t) || t === this._widthConstraint || 0 == t)
                return void (this._widthConstraint = t);
            this._widthConstraint = t;
            var n = this.$UIComponent;
            isNaN(n[9]) && t != n[16] && this.invalidateSize()
        }
        ,
        n.prototype.setLayoutBoundsPosition = function(t, e) {}
        ,
        n.prototype.getLayoutBounds = function(t) {}
        ,
        n.prototype.getPreferredBounds = function(t) {}
        ,
        n
    }(egret.TextField);
    t.Label = i,
    __reflect(i.prototype, "eui.Label", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]),
    t.sys.implementUIComponent(i, egret.TextField),
    t.registerBindable(i.prototype, "text")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.allowMultipleSelection = !1,
            t._selectedIndices = [],
            t.isValidIndex = function(e, i, n) {
                return t.$dataProvider && e >= 0 && e < t.$dataProvider.length && e % 1 == 0
            }
            ,
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "selectedIndices", {
            get: function() {
                return this._proposedSelectedIndices ? this._proposedSelectedIndices : this._selectedIndices
            },
            set: function(t) {
                this.setSelectedIndices(t, !1)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "selectedIndex", {
            get: function() {
                return this._proposedSelectedIndices ? this._proposedSelectedIndices.length > 0 ? this._proposedSelectedIndices[0] : -1 : this.$getSelectedIndex()
            },
            set: function(t) {
                this.setSelectedIndex(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "selectedItems", {
            get: function() {
                var t = []
                  , e = this.selectedIndices;
                if (e)
                    for (var i = e.length, n = 0; i > n; n++)
                        t[n] = this.$dataProvider.getItemAt(e[n]);
                return t
            },
            set: function(t) {
                var e = [];
                if (t)
                    for (var i = t.length, n = 0; i > n; n++) {
                        var r = this.$dataProvider.getItemIndex(t[n]);
                        if (-1 != r && e.splice(0, 0, r),
                        -1 == r) {
                            e = [];
                            break
                        }
                    }
                this.setSelectedIndices(e, !1)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setSelectedIndices = function(t, e) {
            var i = this.$ListBase;
            e && (i[4] = i[4] || e),
            t ? this._proposedSelectedIndices = t : this._proposedSelectedIndices = [],
            this.invalidateProperties()
        }
        ,
        i.prototype.commitProperties = function() {
            e.prototype.commitProperties.call(this),
            this._proposedSelectedIndices && this.commitSelection()
        }
        ,
        i.prototype.commitSelection = function(i) {
            void 0 === i && (i = !0);
            var n = this.$ListBase
              , r = n[3];
            if (this._proposedSelectedIndices) {
                if (this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex),
                !this.allowMultipleSelection && this._proposedSelectedIndices.length > 0) {
                    var o = [];
                    o.push(this._proposedSelectedIndices[0]),
                    this._proposedSelectedIndices = o
                }
                this._proposedSelectedIndices.length > 0 ? n[2] = this._proposedSelectedIndices[0] : n[2] = -1
            }
            var s = e.prototype.commitSelection.call(this, !1);
            if (!s)
                return this._proposedSelectedIndices = null,
                !1;
            var a = this.$getSelectedIndex();
            return a > t.ListBase.NO_SELECTION && (this._proposedSelectedIndices ? -1 == this._proposedSelectedIndices.indexOf(a) && this._proposedSelectedIndices.push(a) : this._proposedSelectedIndices = [a]),
            this._proposedSelectedIndices && (-1 != this._proposedSelectedIndices.indexOf(r) && this.itemSelected(r, !0),
            this.commitMultipleSelection()),
            i && s && (n[4] && (this.dispatchEventWith(egret.Event.CHANGE),
            n[4] = !1),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedIndex"),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedItem")),
            s
        }
        ,
        i.prototype.commitMultipleSelection = function() {
            var t, e, i = [], n = [], r = this._selectedIndices, o = this._proposedSelectedIndices;
            if (r.length > 0 && o.length > 0) {
                for (e = o.length,
                t = 0; e > t; t++)
                    -1 == r.indexOf(o[t]) && n.push(o[t]);
                for (e = r.length,
                t = 0; e > t; t++)
                    -1 == o.indexOf(r[t]) && i.push(r[t])
            } else
                r.length > 0 ? i = r : o.length > 0 && (n = o);
            if (this._selectedIndices = o,
            i.length > 0)
                for (e = i.length,
                t = 0; e > t; t++)
                    this.itemSelected(i[t], !1);
            if (n.length > 0)
                for (e = n.length,
                t = 0; e > t; t++)
                    this.itemSelected(n[t], !0);
            this._proposedSelectedIndices = null
        }
        ,
        i.prototype.$isItemIndexSelected = function(t) {
            return this.allowMultipleSelection ? -1 != this._selectedIndices.indexOf(t) : e.prototype.$isItemIndexSelected.call(this, t)
        }
        ,
        i.prototype.dataProviderRefreshed = function() {
            this.allowMultipleSelection || e.prototype.dataProviderRefreshed.call(this)
        }
        ,
        i.prototype.calculateSelectedIndices = function(t) {
            var e = []
              , i = this._selectedIndices
              , n = i.length;
            if (n > 0) {
                if (1 == n && i[0] == t)
                    return this.$ListBase[0] ? (e.splice(0, 0, i[0]),
                    e) : e;
                for (var r = !1, o = 0; n > o; o++)
                    i[o] == t ? r = !0 : i[o] != t && e.splice(0, 0, i[o]);
                return r || e.splice(0, 0, t),
                e
            }
            return e.splice(0, 0, t),
            e
        }
        ,
        i.prototype.onRendererTouchEnd = function(i) {
            if (this.allowMultipleSelection) {
                var n = i.currentTarget
                  , r = this.$ListBase[7];
                if (n != r)
                    return;
                this.setSelectedIndices(this.calculateSelectedIndices(n.itemIndex), !0),
                t.ItemTapEvent.dispatchItemTapEvent(this, t.ItemTapEvent.ITEM_TAP, n)
            } else
                e.prototype.onRendererTouchEnd.call(this, i)
        }
        ,
        i
    }(t.ListBase);
    t.List = e,
    __reflect(e.prototype, "eui.List")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.closeButton = null,
            t.moveArea = null,
            t.titleDisplay = null,
            t._title = "",
            t.offsetPointX = 0,
            t.offsetPointY = 0,
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, t.onWindowTouchBegin, t, !1, 100),
            t
        }
        return __extends(i, e),
        i.prototype.onWindowTouchBegin = function(t) {
            this.$parent.addChild(this)
        }
        ,
        Object.defineProperty(i.prototype, "elementsContent", {
            set: function(t) {
                if (t)
                    for (var e = t.length, i = 0; e > i; i++)
                        this.addChild(t[i])
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "title", {
            get: function() {
                return this._title
            },
            set: function(t) {
                this._title = t,
                this.titleDisplay && (this.titleDisplay.text = this.title)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.partAdded = function(t, i) {
            e.prototype.partAdded.call(this, t, i),
            i == this.titleDisplay ? this.titleDisplay.text = this._title : i == this.moveArea ? this.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this) : i == this.closeButton && this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this)
        }
        ,
        i.prototype.partRemoved = function(t, i) {
            e.prototype.partRemoved.call(this, t, i),
            i == this.moveArea ? this.moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this) : i == this.closeButton && this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this)
        }
        ,
        i.prototype.onCloseButtonClick = function(e) {
            t.UIEvent.dispatchUIEvent(this, t.UIEvent.CLOSING, !0, !0) && this.close()
        }
        ,
        i.prototype.close = function() {
            this.$parent && this.$parent.removeChild(this)
        }
        ,
        i.prototype.onTouchBegin = function(t) {
            this.$includeInLayout = !1,
            this.offsetPointX = this.x - t.$stageX,
            this.offsetPointY = this.y - t.$stageY,
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
        }
        ,
        i.prototype.onTouchMove = function(t) {
            this.x = t.$stageX + this.offsetPointX,
            this.y = t.$stageY + this.offsetPointY
        }
        ,
        i.prototype.onTouchEnd = function(t) {
            var e = t.$currentTarget;
            e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
            e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
        }
        ,
        i
    }(t.Component);
    t.Panel = e,
    __reflect(e.prototype, "eui.Panel"),
    t.registerProperty(e, "elementsContent", "Array", !0)
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.thumb = null,
            i.labelDisplay = null,
            i._labelFunction = null,
            i._slideDuration = 500,
            i._direction = t.Direction.LTR,
            i.slideToValue = 0,
            i.animationValue = 0,
            i.thumbInitX = 0,
            i.thumbInitY = 0,
            i.animation = new t.sys.Animation(i.animationUpdateHandler,i),
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "labelFunction", {
            get: function() {
                return this._labelFunction
            },
            set: function(t) {
                this._labelFunction != t && (this._labelFunction = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.valueToLabel = function(t, e) {
            return null != this.labelFunction ? this._labelFunction(t, e) : t + " / " + e
        }
        ,
        Object.defineProperty(i.prototype, "slideDuration", {
            get: function() {
                return this._slideDuration
            },
            set: function(t) {
                t = 0 | +t,
                this._slideDuration !== t && (this._slideDuration = t,
                this.animation.isPlaying && (this.animation.stop(),
                this.setValue(this.slideToValue)))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "direction", {
            get: function() {
                return this._direction
            },
            set: function(t) {
                this._direction != t && (this.thumb && (this.thumb.x = this.thumbInitX),
                this.thumb && (this.thumb.y = this.thumbInitY),
                this._direction = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setValue = function(t) {
            if (this.value === t)
                return !1;
            var i = this.$Range
              , n = e.prototype.$setValue.call(this, t);
            if (this._slideDuration > 0 && this.$stage) {
                this.validateProperties();
                var r = this.animation;
                if (r.isPlaying && (this.animationValue = this.slideToValue,
                this.invalidateDisplayList(),
                r.stop()),
                this.slideToValue = this.nearestValidValue(t, i[7]),
                this.slideToValue === this.animationValue)
                    return n;
                var o = this._slideDuration * (Math.abs(this.animationValue - this.slideToValue) / (i[0] - i[2]));
                r.duration = o === 1 / 0 ? 0 : o,
                r.from = this.animationValue,
                r.to = this.slideToValue,
                r.play()
            } else
                this.animationValue = this.value;
            return n
        }
        ,
        i.prototype.animationUpdateHandler = function(t) {
            var e = this.$Range
              , i = this.nearestValidValue(t.currentValue, e[7]);
            this.animationValue = Math.min(e[0], Math.max(e[2], i)),
            this.invalidateDisplayList()
        }
        ,
        i.prototype.partAdded = function(t, i) {
            e.prototype.partAdded.call(this, t, i),
            i === this.thumb && (this.thumb.x && (this.thumbInitX = this.thumb.x),
            this.thumb.y && (this.thumbInitY = this.thumb.y),
            this.thumb.addEventListener(egret.Event.RESIZE, this.onThumbResize, this))
        }
        ,
        i.prototype.partRemoved = function(t, i) {
            e.prototype.partRemoved.call(this, t, i),
            i === this.thumb && this.thumb.removeEventListener(egret.Event.RESIZE, this.onThumbResize, this)
        }
        ,
        i.prototype.onThumbResize = function(t) {
            this.updateSkinDisplayList()
        }
        ,
        i.prototype.updateSkinDisplayList = function() {
            var e = this.animation.isPlaying ? this.animationValue : this.value
              , i = this.maximum
              , n = this.thumb;
            if (n) {
                var r = n.width
                  , o = n.height
                  , s = Math.round(e / i * r);
                (0 > s || s === 1 / 0) && (s = 0);
                var a = Math.round(e / i * o);
                (0 > a || a === 1 / 0) && (a = 0);
                var h = n.$scrollRect;
                h || (h = egret.$TempRectangle),
                h.setTo(0, 0, r, o);
                var l = n.x - h.x
                  , u = n.y - h.y;
                switch (this._direction) {
                case t.Direction.LTR:
                    h.width = s,
                    n.x = l;
                    break;
                case t.Direction.RTL:
                    h.width = s,
                    h.x = r - s,
                    n.x = h.x;
                    break;
                case t.Direction.TTB:
                    h.height = a,
                    n.y = u;
                    break;
                case t.Direction.BTT:
                    h.height = a,
                    h.y = o - a,
                    n.y = h.y
                }
                n.scrollRect = h
            }
            this.labelDisplay && (this.labelDisplay.text = this.valueToLabel(e, i))
        }
        ,
        i
    }(t.Range);
    t.ProgressBar = e,
    __reflect(e.prototype, "eui.ProgressBar")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = {}
      , i = function(i) {
        function n() {
            var t = i.call(this) || this;
            return t.$indexNumber = 0,
            t.$radioButtonGroup = null,
            t._group = null,
            t.groupChanged = !1,
            t._groupName = "radioGroup",
            t._value = null,
            t.groupName = "radioGroup",
            t
        }
        return __extends(n, i),
        Object.defineProperty(n.prototype, "enabled", {
            get: function() {
                return this.$Component[3] ? !this.$radioButtonGroup || this.$radioButtonGroup.$enabled : !1
            },
            set: function(t) {
                this.$setEnabled(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "group", {
            get: function() {
                if (!this._group && this._groupName) {
                    var i = e[this._groupName];
                    i || (i = new t.RadioButtonGroup,
                    i.$name = this._groupName,
                    e[this._groupName] = i),
                    this._group = i
                }
                return this._group
            },
            set: function(t) {
                this._group != t && (this.$radioButtonGroup && this.$radioButtonGroup.$removeInstance(this, !1),
                this._group = t,
                this._groupName = t ? this.group.$name : "radioGroup",
                this.groupChanged = !0,
                this.invalidateProperties(),
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "groupName", {
            get: function() {
                return this._groupName
            },
            set: function(t) {
                t && "" != t && (this._groupName = t,
                this.$radioButtonGroup && this.$radioButtonGroup.$removeInstance(this, !1),
                this._group = null,
                this.groupChanged = !0,
                this.invalidateProperties(),
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setSelected = function(t) {
            var e = i.prototype.$setSelected.call(this, t);
            return this.invalidateDisplayList(),
            e
        }
        ,
        Object.defineProperty(n.prototype, "value", {
            get: function() {
                return this._value
            },
            set: function(e) {
                this._value != e && (this._value = e,
                this.$selected && this.group && t.PropertyEvent.dispatchPropertyEvent(this.group, t.PropertyEvent.PROPERTY_CHANGE, "selectedValue"))
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.commitProperties = function() {
            this.groupChanged && (this.addToGroup(),
            this.groupChanged = !1),
            i.prototype.commitProperties.call(this)
        }
        ,
        n.prototype.updateDisplayList = function(t, e) {
            i.prototype.updateDisplayList.call(this, t, e),
            this.group && (this.$selected ? this._group.$setSelection(this, !1) : this.group.selection == this && this._group.$setSelection(null, !1))
        }
        ,
        n.prototype.buttonReleased = function() {
            this.enabled && !this.selected && (this.$radioButtonGroup || this.addToGroup(),
            i.prototype.buttonReleased.call(this),
            this.group.$setSelection(this, !0))
        }
        ,
        n.prototype.addToGroup = function() {
            var t = this.group;
            return t && t.$addInstance(this),
            t
        }
        ,
        n
    }(t.ToggleButton);
    t.RadioButton = i,
    __reflect(i.prototype, "eui.RadioButton")
}(eui || (eui = {}));
var eui;
!function(t) {
    function e(t, i) {
        var n = t.parent
          , r = i.parent;
        if (!n || !r)
            return 0;
        var o = t.$nestLevel
          , s = i.$nestLevel
          , a = 0
          , h = 0;
        return n == r && (a = n.getChildIndex(t),
        h = r.getChildIndex(i)),
        o > s || a > h ? 1 : s > o || h > a ? -1 : t == i ? 0 : e(n, r)
    }
    var i = 0
      , n = function(n) {
        function r() {
            var t = n.call(this) || this;
            return t.$name = null,
            t.radioButtons = [],
            t.$enabled = !0,
            t._selectedValue = null,
            t._selection = null,
            t.$name = "_radioButtonGroup" + i++,
            t
        }
        return __extends(r, n),
        r.prototype.getRadioButtonAt = function(t) {
            return this.radioButtons[t]
        }
        ,
        Object.defineProperty(r.prototype, "enabled", {
            get: function() {
                return this.$enabled
            },
            set: function(t) {
                if (t = !!t,
                this.$enabled !== t) {
                    this.$enabled = t;
                    for (var e = this.radioButtons, i = e.length, n = 0; i > n; n++)
                        e[n].invalidateState()
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "numRadioButtons", {
            get: function() {
                return this.radioButtons.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "selectedValue", {
            get: function() {
                return this.selection ? null != this.selection.value ? this.selection.value : this.selection.label : null
            },
            set: function(e) {
                if (this._selectedValue = e,
                null == e)
                    return void this.$setSelection(null, !1);
                for (var i = this.numRadioButtons, n = 0; i > n; n++) {
                    var r = this.radioButtons[n];
                    if (r.value == e || r.label == e) {
                        this.changeSelection(n, !1),
                        this._selectedValue = null,
                        t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
                        break
                    }
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "selection", {
            get: function() {
                return this._selection
            },
            set: function(t) {
                this._selection != t && this.$setSelection(t, !1)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$addInstance = function(t) {
            t.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedHandler, this);
            var i = this.radioButtons;
            i.push(t),
            i.sort(e);
            for (var n = i.length, r = 0; n > r; r++)
                i[r].$indexNumber = r;
            this._selectedValue && (this.selectedValue = this._selectedValue),
            1 == t.selected && (this.selection = t),
            t.$radioButtonGroup = this,
            t.invalidateState()
        }
        ,
        r.prototype.$removeInstance = function(t, e) {
            if (t)
                for (var i = !1, n = this.radioButtons, r = n.length, o = 0; r > o; o++) {
                    var s = n[o];
                    i ? s.$indexNumber = s.$indexNumber - 1 : s == t && (e && t.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedHandler, this),
                    t == this._selection && (this._selection = null),
                    t.$radioButtonGroup = null,
                    t.invalidateState(),
                    this.radioButtons.splice(o, 1),
                    i = !0,
                    o--,
                    r--)
                }
        }
        ,
        r.prototype.$setSelection = function(e, i) {
            if (this._selection == e)
                return !1;
            if (e) {
                for (var n = this.numRadioButtons, r = 0; n > r; r++)
                    if (e == this.getRadioButtonAt(r)) {
                        this.changeSelection(r, i);
                        break
                    }
            } else
                this._selection && (this._selection.selected = !1,
                this._selection = null,
                i && this.dispatchEventWith(egret.Event.CHANGE));
            return t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedValue"),
            !0
        }
        ,
        r.prototype.changeSelection = function(t, e) {
            var i = this.getRadioButtonAt(t);
            i && i != this._selection && (this._selection && (this._selection.selected = !1),
            this._selection = i,
            this._selection.selected = !0,
            e && this.dispatchEventWith(egret.Event.CHANGE))
        }
        ,
        r.prototype.addedHandler = function(t) {
            var e = t.target;
            e == t.currentTarget && (e.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedHandler, this),
            this.$addInstance(e))
        }
        ,
        r.prototype.removedHandler = function(t) {
            var e = t.target;
            e == t.currentTarget && (e.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedHandler, this),
            this.$removeInstance(e, !0))
        }
        ,
        r
    }(egret.EventDispatcher);
    t.RadioButtonGroup = n,
    __reflect(n.prototype, "eui.RadioButtonGroup"),
    t.registerBindable(n.prototype, "selectedValue")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e(e, i, n) {
            var r = t.call(this) || this;
            return r.$fillColor = 0,
            r.$fillAlpha = 1,
            r.$strokeColor = 4473924,
            r.$strokeAlpha = 1,
            r.$strokeWeight = 0,
            r.$ellipseWidth = 0,
            r.$ellipseHeight = 0,
            r.touchChildren = !1,
            r.$graphics = new egret.Graphics,
            r.$graphics.$setTarget(r),
            r.width = e,
            r.height = i,
            r.fillColor = n,
            r
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "graphics", {
            get: function() {
                return this.$graphics
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.$measureContentBounds = function(t) {
            this.$graphics && t.setTo(0, 0, this.width, this.height)
        }
        ,
        Object.defineProperty(e.prototype, "fillColor", {
            get: function() {
                return this.$fillColor
            },
            set: function(t) {
                void 0 != t && this.$fillColor != t && (this.$fillColor = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "fillAlpha", {
            get: function() {
                return this.$fillAlpha
            },
            set: function(t) {
                this.$fillAlpha != t && (this.$fillAlpha = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "strokeColor", {
            get: function() {
                return this.$strokeColor
            },
            set: function(t) {
                this.$strokeColor != t && (this.$strokeColor = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "strokeAlpha", {
            get: function() {
                return this.$strokeAlpha
            },
            set: function(t) {
                this.$strokeAlpha != t && (this.$strokeAlpha = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "strokeWeight", {
            get: function() {
                return this.$strokeWeight
            },
            set: function(t) {
                this.$strokeWeight != t && (this.$strokeWeight = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "ellipseWidth", {
            get: function() {
                return this.$ellipseWidth
            },
            set: function(t) {
                this.$ellipseWidth != t && (this.$ellipseWidth = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "ellipseHeight", {
            get: function() {
                return this.$ellipseHeight
            },
            set: function(t) {
                this.$ellipseHeight != t && (this.$ellipseHeight = t,
                this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.updateDisplayList = function(t, e) {
            var i = this.graphics;
            i.clear(),
            this.$strokeWeight > 0 && (i.beginFill(this.$fillColor, 0),
            i.lineStyle(this.$strokeWeight, this.$strokeColor, this.$strokeAlpha, !0, "normal", "square", "miter"),
            0 == this.$ellipseWidth && 0 == this.$ellipseHeight ? i.drawRect(this.$strokeWeight / 2, this.$strokeWeight / 2, t - this.$strokeWeight, e - this.$strokeWeight) : i.drawRoundRect(this.$strokeWeight / 2, this.$strokeWeight / 2, t - this.$strokeWeight, e - this.$strokeWeight, this.$ellipseWidth, this.$ellipseHeight),
            i.endFill()),
            i.beginFill(this.$fillColor, this.$fillAlpha),
            i.lineStyle(this.$strokeWeight, this.$strokeColor, 0, !0, "normal", "square", "miter"),
            0 == this.$ellipseWidth && 0 == this.$ellipseHeight ? i.drawRect(this.$strokeWeight, this.$strokeWeight, t - 2 * this.$strokeWeight, e - 2 * this.$strokeWeight) : i.drawRoundRect(this.$strokeWeight, this.$strokeWeight, t - 2 * this.$strokeWeight, e - 2 * this.$strokeWeight, this.$ellipseWidth, this.$ellipseHeight),
            i.endFill(),
            this.$invalidateContentBounds()
        }
        ,
        e
    }(t.Component);
    t.Rect = e,
    __reflect(e.prototype, "eui.Rect")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e, i = function(i) {
        function n() {
            var e = i.call(this) || this;
            e.$bounces = !0,
            e.horizontalScrollBar = null,
            e.verticalScrollBar = null;
            var n = new t.sys.TouchScroll(e.horizontalUpdateHandler,e.horizontalEndHandler,e)
              , r = new t.sys.TouchScroll(e.verticalUpdateHandler,e.verticalEndHanlder,e);
            return e.$Scroller = {
                0: "auto",
                1: "auto",
                2: null,
                3: 0,
                4: 0,
                5: !1,
                6: !1,
                7: !1,
                8: n,
                9: r,
                10: null,
                11: !1,
                12: !1
            },
            e
        }
        return __extends(n, i),
        Object.defineProperty(n.prototype, "bounces", {
            get: function() {
                return this.$bounces
            },
            set: function(t) {
                this.$bounces = !!t;
                var e = this.$Scroller[8];
                e && (e.$bounces = this.$bounces);
                var i = this.$Scroller[9];
                i && (i.$bounces = this.$bounces)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "throwSpeed", {
            get: function() {
                return this.$Scroller[8].$scrollFactor
            },
            set: function(t) {
                t = +t,
                0 > t && (t = 0),
                this.$Scroller[8].$scrollFactor = t,
                this.$Scroller[9].$scrollFactor = t
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$getThrowInfo = function(i, n) {
            return e ? (e.currentPos = i,
            e.toPos = n) : e = new t.ScrollerThrowEvent(t.ScrollerThrowEvent.THROW,!1,!1,i,n),
            e
        }
        ,
        Object.defineProperty(n.prototype, "scrollPolicyV", {
            get: function() {
                return this.$Scroller[0]
            },
            set: function(t) {
                var e = this.$Scroller;
                e[0] != t && (e[0] = t,
                this.checkScrollPolicy())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "scrollPolicyH", {
            get: function() {
                return this.$Scroller[1]
            },
            set: function(t) {
                var e = this.$Scroller;
                e[1] != t && (e[1] = t,
                this.checkScrollPolicy())
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.stopAnimation = function() {
            var e = this.$Scroller
              , i = e[9]
              , n = e[8];
            i.animation.isPlaying ? t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_END) : n.animation.isPlaying && t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_END),
            i.stop(),
            n.stop();
            var r = this.verticalScrollBar
              , o = this.horizontalScrollBar;
            r && r.autoVisibility && (r.visible = !1),
            o && o.autoVisibility && (o.visible = !1)
        }
        ,
        Object.defineProperty(n.prototype, "viewport", {
            get: function() {
                return this.$Scroller[10]
            },
            set: function(t) {
                var e = this.$Scroller;
                t != e[10] && (this.uninstallViewport(),
                e[10] = t,
                e[11] = !1,
                this.installViewport())
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.installViewport = function() {
            var t = this.viewport;
            t && (this.addChildAt(t, 0),
            t.scrollEnabled = !0,
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, !0),
            t.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, !0),
            t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapCapture, this, !0),
            t.addEventListener(egret.Event.REMOVED, this.onViewPortRemove, this)),
            this.horizontalScrollBar && (this.horizontalScrollBar.viewport = t),
            this.verticalScrollBar && (this.verticalScrollBar.viewport = t)
        }
        ,
        n.prototype.uninstallViewport = function() {
            this.horizontalScrollBar && (this.horizontalScrollBar.viewport = null),
            this.verticalScrollBar && (this.verticalScrollBar.viewport = null);
            var t = this.viewport;
            t && (t.scrollEnabled = !1,
            t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, !0),
            t.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, !0),
            t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapCapture, this, !0),
            t.removeEventListener(egret.Event.REMOVED, this.onViewPortRemove, this),
            0 == this.$Scroller[11] && this.removeChild(t))
        }
        ,
        n.prototype.onViewPortRemove = function(t) {
            t.target == this.viewport && (this.$Scroller[11] = !0,
            this.viewport = null)
        }
        ,
        n.prototype.setSkin = function(t) {
            i.prototype.setSkin.call(this, t);
            var e = this.viewport;
            e && this.addChildAt(e, 0)
        }
        ,
        n.prototype.onTouchBeginCapture = function(t) {
            this.$Scroller[12] = !1;
            var e = this.checkScrollPolicy();
            e && this.onTouchBegin(t)
        }
        ,
        n.prototype.onTouchEndCapture = function(t) {
            this.$Scroller[12] && (t.$bubbles = !1,
            this.dispatchBubbleEvent(t),
            t.$bubbles = !0,
            t.stopPropagation(),
            this.onTouchEnd(t))
        }
        ,
        n.prototype.onTouchTapCapture = function(t) {
            this.$Scroller[12] && (t.$bubbles = !1,
            this.dispatchBubbleEvent(t),
            t.$bubbles = !0,
            t.stopPropagation())
        }
        ,
        n.prototype.checkScrollPolicy = function() {
            var t = this.$Scroller
              , e = t[10];
            if (!e)
                return !1;
            var i, n = e.$UIComponent;
            switch (t[1]) {
            case "auto":
                i = e.contentWidth > n[10] || 0 !== e.scrollH ? !0 : !1;
                break;
            case "on":
                i = !0;
                break;
            case "off":
                i = !1
            }
            t[6] = i;
            var r;
            switch (t[0]) {
            case "auto":
                r = e.contentHeight > n[11] || 0 !== e.scrollV ? !0 : !1;
                break;
            case "on":
                r = !0;
                break;
            case "off":
                r = !1
            }
            return t[7] = r,
            i || r
        }
        ,
        n.prototype.onTouchBegin = function(t) {
            if (!t.isDefaultPrevented() && this.checkScrollPolicy()) {
                this.downTarget = t.target;
                var e = this.$Scroller;
                this.stopAnimation(),
                e[3] = t.$stageX,
                e[4] = t.$stageY,
                e[6] && e[8].start(t.$stageX),
                e[7] && e[9].start(t.$stageY);
                var i = this.$stage;
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
                i.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, !0),
                this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this),
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveListeners, this),
                this.tempStage = i
            }
        }
        ,
        n.prototype.onTouchMove = function(e) {
            if (!e.isDefaultPrevented()) {
                var i = this.$Scroller;
                if (!i[5]) {
                    var r = void 0;
                    r = Math.abs(i[3] - e.$stageX) < n.scrollThreshold ? !1 : !0;
                    var o = void 0;
                    if (o = Math.abs(i[4] - e.$stageY) < n.scrollThreshold ? !1 : !0,
                    !r && !o)
                        return;
                    if (!o && r && "off" == i[1])
                        return;
                    if (!r && o && "off" == i[0])
                        return;
                    i[12] = !0,
                    i[5] = !0,
                    this.dispatchCancelEvent(e);
                    var s = this.horizontalScrollBar
                      , a = this.verticalScrollBar;
                    s && s.autoVisibility && i[6] && (s.visible = !0),
                    a && a.autoVisibility && i[7] && (a.visible = !0),
                    i[2] && i[2].reset(),
                    t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_START),
                    this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this)
                }
                e.preventDefault();
                var h = i[10]
                  , l = h.$UIComponent;
                i[6] && i[8].update(e.$stageX, h.contentWidth - l[10], h.scrollH),
                i[7] && i[9].update(e.$stageY, h.contentHeight - l[11], h.scrollV)
            }
        }
        ,
        n.prototype.onTouchCancel = function(t) {
            this.$Scroller[5] || this.onRemoveListeners()
        }
        ,
        n.prototype.dispatchBubbleEvent = function(t) {
            var e = this.$Scroller[10];
            if (e) {
                var i = egret.Event.create(egret.TouchEvent, t.type, t.bubbles, t.cancelable);
                i.$initTo(t.$stageX, t.$stageY, t.touchPointID);
                var n = this.downTarget;
                i.$setTarget(n);
                for (var r = this.$getPropagationList(n), o = r.length, s = .5 * r.length, a = -1, h = 0; o > h; h++)
                    if (r[h] === e) {
                        a = h;
                        break
                    }
                r.splice(0, r.length - a + 1),
                s = 0,
                this.$dispatchPropagationEvent(i, r, s),
                egret.Event.release(i)
            }
        }
        ,
        n.prototype.dispatchCancelEvent = function(t) {
            var e = this.$Scroller[10];
            if (e) {
                var i = egret.Event.create(egret.TouchEvent, egret.TouchEvent.TOUCH_CANCEL, t.bubbles, t.cancelable);
                i.$initTo(t.$stageX, t.$stageY, t.touchPointID);
                var n = this.downTarget;
                i.$setTarget(n);
                for (var r = this.$getPropagationList(n), o = r.length, s = .5 * r.length, a = -1, h = 0; o > h; h++)
                    if (r[h] === e) {
                        a = h;
                        break
                    }
                r.splice(0, a + 1 - 2),
                r.splice(r.length - 1 - a + 2, a + 1 - 2),
                s -= a + 1,
                this.$dispatchPropagationEvent(i, r, s),
                egret.Event.release(i)
            }
        }
        ,
        n.prototype.onTouchEnd = function(t) {
            var e = this.$Scroller;
            e[5] = !1,
            this.onRemoveListeners();
            var i = e[10]
              , n = i.$UIComponent;
            e[8].isStarted() && e[8].finish(i.scrollH, i.contentWidth - n[10]),
            e[9].isStarted() && e[9].finish(i.scrollV, i.contentHeight - n[11])
        }
        ,
        n.prototype.onRemoveListeners = function() {
            var t = this.tempStage || this.$stage;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
            t.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, !0),
            t.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this),
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveListeners, this)
        }
        ,
        n.prototype.horizontalUpdateHandler = function(t) {
            this.$Scroller && this.$Scroller[10] && (this.$Scroller[10].scrollH = t,
            this.dispatchEventWith(egret.Event.CHANGE))
        }
        ,
        n.prototype.verticalUpdateHandler = function(t) {
            this.$Scroller && this.$Scroller[10] && (this.$Scroller[10].scrollV = t,
            this.dispatchEventWith(egret.Event.CHANGE))
        }
        ,
        n.prototype.horizontalEndHandler = function() {
            this.$Scroller[9].isPlaying() || this.onChangeEnd()
        }
        ,
        n.prototype.verticalEndHanlder = function() {
            this.$Scroller[8].isPlaying() || this.onChangeEnd()
        }
        ,
        n.prototype.onChangeEnd = function() {
            var e = this.$Scroller
              , i = this.horizontalScrollBar
              , n = this.verticalScrollBar;
            (i && i.visible || n && n.visible) && (e[2] || (e[2] = new egret.Timer(200,1),
            e[2].addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoHideTimer, this)),
            e[2].reset(),
            e[2].start()),
            t.UIEvent.dispatchUIEvent(this, t.UIEvent.CHANGE_END)
        }
        ,
        n.prototype.onAutoHideTimer = function(t) {
            var e = this.horizontalScrollBar
              , i = this.verticalScrollBar;
            e && e.autoVisibility && (e.visible = !1),
            i && i.autoVisibility && (i.visible = !1)
        }
        ,
        n.prototype.updateDisplayList = function(t, e) {
            i.prototype.updateDisplayList.call(this, t, e);
            var n = this.viewport;
            n && (n.setLayoutBoundsSize(t, e),
            n.setLayoutBoundsPosition(0, 0))
        }
        ,
        n.prototype.partAdded = function(t, e) {
            i.prototype.partAdded.call(this, t, e),
            e == this.horizontalScrollBar ? (this.horizontalScrollBar.touchChildren = !1,
            this.horizontalScrollBar.touchEnabled = !1,
            this.horizontalScrollBar.viewport = this.viewport,
            this.horizontalScrollBar.autoVisibility && (this.horizontalScrollBar.visible = !1)) : e == this.verticalScrollBar && (this.verticalScrollBar.touchChildren = !1,
            this.verticalScrollBar.touchEnabled = !1,
            this.verticalScrollBar.viewport = this.viewport,
            this.verticalScrollBar.autoVisibility && (this.verticalScrollBar.visible = !1))
        }
        ,
        n.scrollThreshold = 5,
        n
    }(t.Component);
    t.Scroller = i,
    __reflect(i.prototype, "eui.Scroller"),
    t.registerProperty(i, "viewport", "eui.IViewport", !0)
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var i = null !== e && e.apply(this, arguments) || this;
            return i.maxWidth = 1e5,
            i.minWidth = 0,
            i.maxHeight = 1e5,
            i.minHeight = 0,
            i.width = 0 / 0,
            i.height = 0 / 0,
            i.$elementsContent = [],
            i._hostComponent = null,
            i.$stateValues = new t.sys.StateValues,
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "elementsContent", {
            set: function(t) {
                this.$elementsContent = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "hostComponent", {
            get: function() {
                return this._hostComponent
            },
            set: function(e) {
                if (this._hostComponent != e) {
                    this._hostComponent && this._hostComponent.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this),
                    this._hostComponent = e;
                    var i = this.$stateValues;
                    i.parent = e,
                    e && (this.commitCurrentState(),
                    this.$stateValues.intialized || (e.$stage ? this.initializeStates(e.$stage) : e.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this))),
                    t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "hostComponent")
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.onAddedToStage = function(t) {
            this.initializeStates(this._hostComponent.$stage)
        }
        ,
        i
    }(egret.EventDispatcher);
    t.Skin = e,
    __reflect(e.prototype, "eui.Skin"),
    t.sys.mixin(e, t.sys.StateClient),
    t.registerProperty(e, "elementsContent", "Array", !0),
    t.registerProperty(e, "states", "State[]"),
    t.registerBindable(e.prototype, "hostComponent")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.indexBeingUpdated = !1,
            t.requireSelection = !0,
            t.useVirtualLayout = !1,
            t
        }
        return __extends(i, e),
        i.prototype.createChildren = function() {
            if (!this.$layout) {
                var i = new t.HorizontalLayout;
                i.gap = 0,
                i.horizontalAlign = t.JustifyAlign.JUSTIFY,
                i.verticalAlign = t.JustifyAlign.CONTENT_JUSTIFY,
                this.$setLayout(i)
            }
            e.prototype.createChildren.call(this)
        }
        ,
        i.prototype.$setDataProvider = function(i) {
            var n = this.$dataProvider;
            return n && n instanceof t.ViewStack && (n.removeEventListener(t.PropertyEvent.PROPERTY_CHANGE, this.onViewStackIndexChange, this),
            this.removeEventListener(egret.Event.CHANGE, this.onIndexChanged, this)),
            i && i instanceof t.ViewStack && (i.addEventListener(t.PropertyEvent.PROPERTY_CHANGE, this.onViewStackIndexChange, this),
            this.addEventListener(egret.Event.CHANGE, this.onIndexChanged, this)),
            e.prototype.$setDataProvider.call(this, i)
        }
        ,
        i.prototype.onIndexChanged = function(t) {
            this.indexBeingUpdated = !0,
            this.$dataProvider.selectedIndex = this.selectedIndex,
            this.indexBeingUpdated = !1
        }
        ,
        i.prototype.onViewStackIndexChange = function(t) {
            "selectedIndex" != t.property || this.indexBeingUpdated || this.setSelectedIndex(this.$dataProvider.selectedIndex, !1)
        }
        ,
        i
    }(t.ListBase);
    t.TabBar = e,
    __reflect(e.prototype, "eui.TabBar")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = egret.FocusEvent
      , i = function(i) {
        function n() {
            var t = i.call(this) || this;
            return t.isFocus = !1,
            t.$TextInput = {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: "",
                7: null,
                8: egret.TextFieldInputType.TEXT
            },
            t
        }
        return __extends(n, i),
        Object.defineProperty(n.prototype, "prompt", {
            get: function() {
                return this.promptDisplay ? this.promptDisplay.text : this.$TextInput[0]
            },
            set: function(t) {
                this.$TextInput[0] = t,
                this.promptDisplay && (this.promptDisplay.text = t),
                this.invalidateProperties(),
                this.invalidateState()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "displayAsPassword", {
            get: function() {
                if (this.textDisplay)
                    return this.textDisplay.displayAsPassword;
                var t = this.$TextInput[1];
                return t ? t : !1
            },
            set: function(t) {
                this.$TextInput[1] = t,
                this.textDisplay && (this.textDisplay.displayAsPassword = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "inputType", {
            get: function() {
                return this.textDisplay ? this.textDisplay.inputType : this.$TextInput[8]
            },
            set: function(t) {
                this.$TextInput[8] = t,
                this.textDisplay && (this.textDisplay.inputType = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "textColor", {
            get: function() {
                return this.textDisplay ? this.textDisplay.textColor : this.$TextInput[2]
            },
            set: function(t) {
                this.$TextInput[2] = t,
                this.textDisplay && (this.textDisplay.textColor = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "maxChars", {
            get: function() {
                if (this.textDisplay)
                    return this.textDisplay.maxChars;
                var t = this.$TextInput[3];
                return t ? t : 0
            },
            set: function(t) {
                this.$TextInput[3] = t,
                this.textDisplay && (this.textDisplay.maxChars = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "maxWidth", {
            get: function() {
                if (this.textDisplay)
                    return this.textDisplay.maxWidth;
                var t = this.$TextInput[4];
                return t ? t : 1e5
            },
            set: function(t) {
                this.$TextInput[4] = t,
                this.textDisplay && (this.textDisplay.maxWidth = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "maxHeight", {
            get: function() {
                this.textDisplay;
                var t = this.$TextInput[5];
                return t ? t : 1e5
            },
            set: function(t) {
                this.$TextInput[5] = t,
                this.textDisplay && (this.textDisplay.maxHeight = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "text", {
            get: function() {
                return this.textDisplay ? this.textDisplay.text : this.$TextInput[6]
            },
            set: function(t) {
                this.$TextInput[6] = t,
                this.textDisplay && (this.textDisplay.text = t),
                this.invalidateProperties(),
                this.invalidateState()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "restrict", {
            get: function() {
                return this.textDisplay ? this.textDisplay.restrict : this.$TextInput[7]
            },
            set: function(t) {
                this.$TextInput[7] = t,
                this.textDisplay && (this.textDisplay.restrict = t),
                this.invalidateProperties()
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.focusInHandler = function(t) {
            this.isFocus = !0,
            this.invalidateState()
        }
        ,
        n.prototype.focusOutHandler = function(t) {
            this.isFocus = !1,
            this.invalidateState()
        }
        ,
        n.prototype.getCurrentState = function() {
            var t = this.skin;
            return !this.prompt || this.isFocus || this.text ? this.enabled ? "normal" : "disabled" : this.enabled && t.hasState("normalWithPrompt") ? "normalWithPrompt" : !this.enabled && t.hasState("disabledWithPrompt") ? "disabledWithPrompt" : void 0
        }
        ,
        n.prototype.partAdded = function(n, r) {
            i.prototype.partAdded.call(this, n, r);
            var o = this.$TextInput;
            r == this.textDisplay ? (this.textDisplayAdded(),
            this.textDisplay instanceof t.EditableText && (this.textDisplay.addEventListener(e.FOCUS_IN, this.focusInHandler, this),
            this.textDisplay.addEventListener(e.FOCUS_OUT, this.focusOutHandler, this))) : r == this.promptDisplay && o[0] && (this.promptDisplay.text = o[0])
        }
        ,
        n.prototype.partRemoved = function(n, r) {
            i.prototype.partRemoved.call(this, n, r),
            r == this.textDisplay ? (this.textDisplayRemoved(),
            this.textDisplay instanceof t.EditableText && (this.textDisplay.removeEventListener(e.FOCUS_IN, this.focusInHandler, this),
            this.textDisplay.removeEventListener(e.FOCUS_OUT, this.focusOutHandler, this))) : r == this.promptDisplay && (this.$TextInput[0] = this.promptDisplay.text)
        }
        ,
        n.prototype.textDisplayAdded = function() {
            var t = this.$TextInput;
            t[1] && (this.textDisplay.displayAsPassword = t[1]),
            t[2] && (this.textDisplay.textColor = t[2]),
            t[3] && (this.textDisplay.maxChars = t[3]),
            t[4] && (this.textDisplay.maxWidth = t[4]),
            t[5] && (this.textDisplay.maxHeight = t[5]),
            t[6] && (this.textDisplay.text = t[6]),
            t[7] && (this.textDisplay.restrict = t[7]),
            t[8] && (this.textDisplay.inputType = t[8])
        }
        ,
        n.prototype.textDisplayRemoved = function() {
            var t = this.$TextInput;
            t[1] = this.textDisplay.displayAsPassword,
            t[2] = this.textDisplay.textColor,
            t[3] = this.textDisplay.maxChars,
            t[4] = this.textDisplay.maxWidth,
            t[5] = this.textDisplay.maxHeight,
            t[6] = this.textDisplay.text,
            t[7] = this.textDisplay.restrict,
            t[8] = this.textDisplay.inputType
        }
        ,
        n
    }(t.Component);
    t.TextInput = i,
    __reflect(i.prototype, "eui.TextInput")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            return t.call(this) || this
        }
        return __extends(e, t),
        e
    }(t.ToggleButton);
    t.CheckBox = e,
    __reflect(e.prototype, "eui.CheckBox")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            return t.call(this) || this
        }
        return __extends(e, t),
        e
    }(t.ToggleButton);
    t.ToggleSwitch = e,
    __reflect(e.prototype, "eui.ToggleSwitch")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.addEventListener(egret.Event.ADDED_TO_STAGE, e.onAddToStage, e),
            e.addEventListener(egret.Event.REMOVED_FROM_STAGE, e.onRemoveFromStage, e),
            e
        }
        return __extends(e, t),
        e.prototype.onAddToStage = function(t) {
            this.$stage.addEventListener(egret.Event.RESIZE, this.onResize, this),
            this.onResize()
        }
        ,
        e.prototype.onRemoveFromStage = function(t) {
            this.$stage.removeEventListener(egret.Event.RESIZE, this.onResize, this)
        }
        ,
        e.prototype.onResize = function(t) {
            var e = this.$stage;
            this.$setWidth(e.$stageWidth),
            this.$setHeight(e.$stageHeight)
        }
        ,
        e
    }(t.Group);
    t.UILayer = e,
    __reflect(e.prototype, "eui.UILayer")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        e.prototype.updateDisplayList = function(e, i) {
            t.prototype.updateDisplayList.call(this, e, i);
            var n = this.thumb
              , r = this.$viewport;
            if (n && r) {
                var o = egret.$TempRectangle;
                n.getPreferredBounds(o);
                var s = o.height
                  , a = o.x
                  , h = r.scrollV
                  , l = r.contentHeight
                  , u = r.height;
                if (0 >= h) {
                    var p = s * (1 - -h / (.5 * u));
                    p = Math.max(5, Math.round(p)),
                    n.setLayoutBoundsSize(0 / 0, p),
                    n.setLayoutBoundsPosition(a, 0)
                } else if (h >= l - u) {
                    var p = s * (1 - (h - l + u) / (.5 * u));
                    p = Math.max(5, Math.round(p)),
                    n.setLayoutBoundsSize(0 / 0, p),
                    n.setLayoutBoundsPosition(a, i - p)
                } else {
                    var c = (i - s) * h / (l - u);
                    n.setLayoutBoundsSize(0 / 0, 0 / 0),
                    n.setLayoutBoundsPosition(a, c)
                }
            }
        }
        ,
        e.prototype.onPropertyChanged = function(t) {
            switch (t.property) {
            case "scrollV":
            case "contentHeight":
                this.invalidateDisplayList()
            }
        }
        ,
        e
    }(t.ScrollBarBase);
    t.VScrollBar = e,
    __reflect(e.prototype, "eui.VScrollBar")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            return t.call(this) || this
        }
        return __extends(e, t),
        e.prototype.pointToValue = function(t, e) {
            if (!this.thumb || !this.track)
                return 0;
            var i = this.$Range
              , n = i[0] - i[2]
              , r = this.getThumbRange();
            return i[2] + (0 != r ? (r - e) / r * n : 0)
        }
        ,
        e.prototype.getThumbRange = function() {
            var t = egret.$TempRectangle;
            this.track.getLayoutBounds(t);
            var e = t.height;
            return this.thumb.getLayoutBounds(t),
            e - t.height
        }
        ,
        e.prototype.updateSkinDisplayList = function() {
            if (this.thumb && this.track) {
                var t = this.$Range
                  , e = this.getThumbRange()
                  , i = t[0] - t[2]
                  , n = i > 0 ? e - (this.pendingValue - t[2]) / i * e : 0
                  , r = this.track.localToGlobal(0, n, egret.$TempPoint)
                  , o = r.x
                  , s = r.y
                  , a = this.thumb.$parent.globalToLocal(o, s, egret.$TempPoint).y
                  , h = egret.$TempRectangle
                  , l = h.height;
                if (this.thumb.getLayoutBounds(h),
                this.thumb.setLayoutBoundsPosition(h.x, Math.round(a)),
                this.trackHighlight) {
                    var u = this.trackHighlight.$parent.globalToLocal(o, s, egret.$TempPoint).y;
                    this.trackHighlight.y = Math.round(u + l),
                    this.trackHighlight.height = Math.round(e - u)
                }
            }
        }
        ,
        e
    }(t.SliderBase);
    t.VSlider = e,
    __reflect(e.prototype, "eui.VSlider")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i._selectedChild = null,
            i.proposedSelectedIndex = t.ListBase.NO_PROPOSED_SELECTION,
            i._selectedIndex = -1,
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "layout", {
            get: function() {
                return this.$layout
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "selectedChild", {
            get: function() {
                var t = this.selectedIndex;
                return t >= 0 && t < this.numChildren ? this.getChildAt(t) : null
            },
            set: function(t) {
                var e = this.getChildIndex(t);
                e >= 0 && e < this.numChildren && this.setSelectedIndex(e)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "selectedIndex", {
            get: function() {
                return this.proposedSelectedIndex != t.ListBase.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex
            },
            set: function(t) {
                t = 0 | +t,
                this.setSelectedIndex(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setSelectedIndex = function(e) {
            e != this.selectedIndex && (this.proposedSelectedIndex = e,
            this.invalidateProperties(),
            t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "selectedIndex"))
        }
        ,
        i.prototype.$childAdded = function(i, n) {
            e.prototype.$childAdded.call(this, i, n),
            this.showOrHide(i, !1);
            var r = this.selectedIndex;
            -1 == r ? this.setSelectedIndex(n) : n <= this.selectedIndex && this.$stage && this.setSelectedIndex(r + 1),
            t.CollectionEvent.dispatchCollectionEvent(this, t.CollectionEvent.COLLECTION_CHANGE, t.CollectionEventKind.ADD, n, -1, [i.name])
        }
        ,
        i.prototype.$childRemoved = function(i, n) {
            e.prototype.$childRemoved.call(this, i, n),
            this.showOrHide(i, !0);
            var r = this.selectedIndex;
            n == r ? this.numChildren > 0 ? 0 == n ? (this.proposedSelectedIndex = 0,
            this.invalidateProperties()) : this.setSelectedIndex(0) : this.setSelectedIndex(-1) : r > n && this.setSelectedIndex(r - 1),
            t.CollectionEvent.dispatchCollectionEvent(this, t.CollectionEvent.COLLECTION_CHANGE, t.CollectionEventKind.REMOVE, n, -1, [i.name])
        }
        ,
        i.prototype.commitProperties = function() {
            e.prototype.commitProperties.call(this),
            this.proposedSelectedIndex != t.ListBase.NO_PROPOSED_SELECTION && (this.commitSelection(this.proposedSelectedIndex),
            this.proposedSelectedIndex = t.ListBase.NO_PROPOSED_SELECTION)
        }
        ,
        i.prototype.commitSelection = function(t) {
            t >= 0 && t < this.numChildren ? (this._selectedIndex = t,
            this._selectedChild && this.showOrHide(this._selectedChild, !1),
            this._selectedChild = this.getElementAt(this._selectedIndex),
            this.showOrHide(this._selectedChild, !0)) : (this._selectedChild = null,
            this._selectedIndex = -1),
            this.invalidateSize(),
            this.invalidateDisplayList()
        }
        ,
        i.prototype.showOrHide = function(t, e) {
            egret.is(t, "eui.UIComponent") && (t.includeInLayout = e),
            t.visible = e
        }
        ,
        Object.defineProperty(i.prototype, "length", {
            get: function() {
                return this.$children.length
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.getItemAt = function(t) {
            var e = this.$children[t];
            return e ? e.name : ""
        }
        ,
        i.prototype.getItemIndex = function(t) {
            for (var e = this.$children, i = e.length, n = 0; i > n; n++)
                if (e[n].name == t)
                    return n;
            return -1
        }
        ,
        i
    }(t.Group);
    t.ViewStack = e,
    __reflect(e.prototype, "eui.ViewStack", ["eui.ICollection", "egret.IEventDispatcher"]),
    t.registerBindable(e.prototype, "selectedIndex")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e;
    !function(t) {
        function e(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        }
        var i = function() {
            function t(t, i) {
                this.easerFunction = e,
                this.isPlaying = !1,
                this.duration = 500,
                this.currentValue = 0,
                this.from = 0,
                this.to = 0,
                this.startTime = 0,
                this.endFunction = null,
                this.updateFunction = t,
                this.thisObject = i
            }
            return t.prototype.play = function() {
                this.stop(),
                this.start()
            }
            ,
            t.prototype.start = function() {
                this.isPlaying = !1,
                this.currentValue = 0,
                this.startTime = egret.getTimer(),
                this.doInterval(this.startTime),
                egret.startTick(this.doInterval, this)
            }
            ,
            t.prototype.stop = function() {
                this.isPlaying = !1,
                this.startTime = 0,
                egret.stopTick(this.doInterval, this)
            }
            ,
            t.prototype.doInterval = function(t) {
                var e = t - this.startTime;
                this.isPlaying || (this.isPlaying = !0);
                var i = this.duration
                  , n = 0 == i ? 1 : Math.min(e, i) / i;
                this.easerFunction && (n = this.easerFunction(n)),
                this.currentValue = this.from + (this.to - this.from) * n,
                this.updateFunction && this.updateFunction.call(this.thisObject, this);
                var r = e >= i;
                return r && this.stop(),
                r && this.endFunction && this.endFunction.call(this.thisObject, this),
                !0
            }
            ,
            t
        }();
        t.Animation = i,
        __reflect(i.prototype, "eui.sys.Animation")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.prototype.getTheme = function(t, e, i, n) {
            function r(t) {
                var i = t.target;
                e.call(n, i.response)
            }
            function o(t) {
                i.call(n)
            }
            var s = new egret.HttpRequest;
            s.addEventListener(egret.Event.COMPLETE, r, n),
            s.addEventListener(egret.IOErrorEvent.IO_ERROR, o, n),
            s.responseType = egret.HttpResponseType.TEXT,
            s.open(t),
            s.send()
        }
        ,
        t
    }();
    t.DefaultThemeAdapter = e,
    __reflect(e.prototype, "eui.DefaultThemeAdapter", ["eui.IThemeAdapter"])
}(eui || (eui = {}));
var eui;
!function(t) {
    function e(t, i) {
        var n = Object.getOwnPropertyDescriptor(t, i);
        if (n)
            return n;
        var r = Object.getPrototypeOf(t);
        return r ? e(r, i) : null
    }
    function i(t, e) {
        for (var i = t[n], r = i.length, o = 0; r > o; o += 2) {
            var s = i[o]
              , a = i[o + 1];
            s.call(a, e)
        }
    }
    var n = "__listeners__"
      , r = "__bindables__"
      , o = 0
      , s = function() {
        function s(t, e, i, n) {
            this.isExecuting = !1,
            this.property = t,
            this.handler = e,
            this.next = n,
            this.thisObject = i
        }
        return s.watch = function(t, e, i, n) {
            if (e.length > 0) {
                var r = e.shift()
                  , o = s.watch(null, e, i, n)
                  , a = new s(r,i,n,o);
                return a.reset(t),
                a
            }
            return null
        }
        ,
        s.checkBindable = function(s, a) {
            var h = s[r];
            if (h && -1 != h.indexOf(a))
                return !0;
            var l = egret.is(s, "egret.IEventDispatcher");
            l || s[n] || (s[n] = []);
            var u = e(s, a);
            if (u && u.set && u.get) {
                var p = u.set;
                u.set = function(e) {
                    this[a] != e && (p.call(this, e),
                    l ? t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, a) : i(this, a))
                }
            } else {
                if (u && (u.get || u.set))
                    return !1;
                o++;
                var c = "_" + o + a;
                s[c] = u ? u.value : null,
                u = {
                    enumerable: !0,
                    configurable: !0
                },
                u.get = function() {
                    return this[c]
                }
                ,
                u.set = function(e) {
                    this[c] != e && (this[c] = e,
                    l ? t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, a) : i(this, a))
                }
            }
            Object.defineProperty(s, a, u),
            t.registerBindable(s, a)
        }
        ,
        s.prototype.unwatch = function() {
            this.reset(null),
            this.handler = null,
            this.next && (this.next.handler = null)
        }
        ,
        s.prototype.getValue = function() {
            return this.next ? this.next.getValue() : this.getHostPropertyValue()
        }
        ,
        s.prototype.setHandler = function(t, e) {
            this.handler = t,
            this.thisObject = e,
            this.next && this.next.setHandler(t, e)
        }
        ,
        s.prototype.reset = function(e) {
            var i = this.host;
            if (i)
                if (egret.is(i, "egret.IEventDispatcher"))
                    i.removeEventListener(t.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this);
                else {
                    var r = i[n]
                      , o = r.indexOf(this);
                    r.splice(o - 1, 2)
                }
            if (this.host = e,
            e)
                if (s.checkBindable(e, this.property),
                egret.is(e, "egret.IEventDispatcher"))
                    e.addEventListener(t.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this, !1, 100);
                else {
                    var r = e[n];
                    r.push(this.onPropertyChange),
                    r.push(this)
                }
            this.next && this.next.reset(this.getHostPropertyValue())
        }
        ,
        s.prototype.getHostPropertyValue = function() {
            return this.host ? this.host[this.property] : null
        }
        ,
        s.prototype.wrapHandler = function(t) {
            this.onPropertyChange(t.property)
        }
        ,
        s.prototype.onPropertyChange = function(t) {
            if (t == this.property && !this.isExecuting)
                try {
                    this.isExecuting = !0,
                    this.next && this.next.reset(this.getHostPropertyValue()),
                    this.handler.call(this.thisObject, this.getValue())
                } finally {
                    this.isExecuting = !1
                }
        }
        ,
        s
    }();
    t.Watcher = s,
    __reflect(s.prototype, "eui.Watcher")
}(eui || (eui = {}));
var eui;
!function(t) {
    function e(e) {
        for (var i = e[0], n = i instanceof t.Watcher ? i.getValue() : i, r = e.length, o = 1; r > o; o++) {
            var s = e[o];
            s instanceof t.Watcher && (s = s.getValue()),
            n += s
        }
        return n
    }
    var i = function() {
        function i() {}
        return i.bindProperty = function(e, i, n, r) {
            var o = t.Watcher.watch(e, i, null, null);
            if (o) {
                var s = function(t) {
                    n[r] = t
                };
                o.setHandler(s, null),
                s(o.getValue())
            }
            return o
        }
        ,
        i.bindHandler = function(e, i, n, r) {
            var o = t.Watcher.watch(e, i, n, r);
            return o && n.call(r, o.getValue()),
            o
        }
        ,
        i.$bindProperties = function(n, r, o, s, a) {
            if (1 == r.length && 1 == o.length)
                return i.bindProperty(n, r[0].split("."), s, a);
            for (var h, l = function() {
                s[a] = e(r)
            }, u = o.length, p = 0; u > p; p++) {
                var c = o[p]
                  , d = r[c].split(".");
                h = t.Watcher.watch(n, d, null, null),
                h && (r[c] = h,
                h.setHandler(l, null))
            }
            return l(),
            h
        }
        ,
        i
    }();
    t.Binding = i,
    __reflect(i.prototype, "eui.Binding")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i(t) {
            var i = e.call(this) || this;
            return t ? i._source = t : i._source = [],
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "source", {
            get: function() {
                return this._source
            },
            set: function(e) {
                e || (e = []),
                this._source = e,
                this.dispatchCoEvent(t.CollectionEventKind.RESET)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.refresh = function() {
            this.dispatchCoEvent(t.CollectionEventKind.REFRESH)
        }
        ,
        Object.defineProperty(i.prototype, "length", {
            get: function() {
                return this._source.length
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.addItem = function(e) {
            this._source.push(e),
            this.dispatchCoEvent(t.CollectionEventKind.ADD, this._source.length - 1, -1, [e])
        }
        ,
        i.prototype.addItemAt = function(e, i) {
            0 > i || i > this._source.length,
            this._source.splice(i, 0, e),
            this.dispatchCoEvent(t.CollectionEventKind.ADD, i, -1, [e])
        }
        ,
        i.prototype.getItemAt = function(t) {
            return this._source[t]
        }
        ,
        i.prototype.getItemIndex = function(t) {
            for (var e = this._source.length, i = 0; e > i; i++)
                if (this._source[i] === t)
                    return i;
            return -1
        }
        ,
        i.prototype.itemUpdated = function(e) {
            var i = this.getItemIndex(e);
            -1 != i && this.dispatchCoEvent(t.CollectionEventKind.UPDATE, i, -1, [e])
        }
        ,
        i.prototype.removeAll = function() {
            var e = this._source.concat();
            this._source = [],
            this.dispatchCoEvent(t.CollectionEventKind.REMOVE, 0, -1, e)
        }
        ,
        i.prototype.removeItemAt = function(e) {
            if (!(0 > e || e >= this._source.length)) {
                var i = this._source.splice(e, 1)[0];
                return this.dispatchCoEvent(t.CollectionEventKind.REMOVE, e, -1, [i]),
                i
            }
        }
        ,
        i.prototype.replaceItemAt = function(e, i) {
            if (!(0 > i || i >= this._source.length)) {
                var n = this._source.splice(i, 1, e)[0];
                return this.dispatchCoEvent(t.CollectionEventKind.REPLACE, i, -1, [e], [n]),
                n
            }
        }
        ,
        i.prototype.replaceAll = function(t) {
            t || (t = []);
            for (var e = t.length, i = this._source.length, n = e; i > n; n++)
                this.removeItemAt(e);
            for (var n = 0; e > n; n++)
                n >= i ? this.addItemAt(t[n], n) : this.replaceItemAt(t[n], n);
            this._source = t
        }
        ,
        i.prototype.dispatchCoEvent = function(e, i, n, r, o) {
            t.CollectionEvent.dispatchCollectionEvent(this, t.CollectionEvent.COLLECTION_CHANGE, e, i, n, r, o)
        }
        ,
        i
    }(egret.EventDispatcher);
    t.ArrayCollection = e,
    __reflect(e.prototype, "eui.ArrayCollection", ["eui.ICollection", "egret.IEventDispatcher"]),
    t.registerProperty(e, "source", "Array", !0)
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = t.sys.UIComponentImpl
      , i = function(i) {
        function n() {
            var t = i.call(this) || this;
            return t._widthConstraint = 0 / 0,
            t.$isShowPrompt = !1,
            t.$promptColor = 6710886,
            t.$isFocusIn = !1,
            t.initializeUIValues(),
            t.type = egret.TextFieldType.INPUT,
            t.$EditableText = {
                0: null,
                1: 16777215,
                2: !1
            },
            t
        }
        return __extends(n, i),
        n.prototype.$invalidateContentBounds = function() {
            i.prototype.$invalidateContentBounds.call(this),
            this.invalidateSize()
        }
        ,
        n.prototype.$setWidth = function(t) {
            var n = i.prototype.$setWidth.call(this, t)
              , r = e.prototype.$setWidth.call(this, t);
            return n && r
        }
        ,
        n.prototype.$setHeight = function(t) {
            var n = i.prototype.$setHeight.call(this, t)
              , r = e.prototype.$setHeight.call(this, t);
            return n && r
        }
        ,
        n.prototype.$getText = function() {
            var t = i.prototype.$getText.call(this);
            return t == this.$EditableText[0] && (t = ""),
            t
        }
        ,
        n.prototype.$setText = function(e) {
            var n = this.$EditableText[0];
            (n != e || null == n) && (this.$isShowPrompt = !1,
            this.textColor = this.$EditableText[1],
            this.displayAsPassword = this.$EditableText[2]),
            this.$isFocusIn || ("" == e || null == e) && (e = n,
            this.$isShowPrompt = !0,
            i.prototype.$setTextColor.call(this, this.$promptColor),
            i.prototype.$setDisplayAsPassword.call(this, !1));
            var r = i.prototype.$setText.call(this, e);
            return t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "text"),
            r
        }
        ,
        n.prototype.$onAddToStage = function(e, i) {
            t.sys.UIComponentImpl.prototype.$onAddToStage.call(this, e, i),
            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onfocusIn, this),
            this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onfocusOut, this)
        }
        ,
        n.prototype.$onRemoveFromStage = function() {
            t.sys.UIComponentImpl.prototype.$onRemoveFromStage.call(this),
            this.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onfocusIn, this),
            this.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onfocusOut, this)
        }
        ,
        Object.defineProperty(n.prototype, "prompt", {
            get: function() {
                return this.$EditableText[0]
            },
            set: function(t) {
                var e = this.$EditableText
                  , i = e[0];
                if (i != t) {
                    e[0] = t;
                    var n = this.text;
                    n && n != i || this.showPromptText()
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "promptColor", {
            get: function() {
                return this.$promptColor
            },
            set: function(t) {
                if (t = 0 | +t,
                this.$promptColor != t) {
                    this.$promptColor = t;
                    var e = this.text;
                    e && e != this.$EditableText[0] || this.showPromptText()
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.onfocusOut = function() {
            this.$isFocusIn = !1,
            this.text || this.showPromptText()
        }
        ,
        n.prototype.onfocusIn = function() {
            this.$isFocusIn = !0,
            this.$isShowPrompt = !1,
            this.displayAsPassword = this.$EditableText[2];
            var t = this.$EditableText
              , e = this.text;
            e && e != t[0] || (this.textColor = t[1],
            this.text = "")
        }
        ,
        n.prototype.showPromptText = function() {
            var t = this.$EditableText;
            this.$isShowPrompt = !0,
            i.prototype.$setTextColor.call(this, this.$promptColor),
            i.prototype.$setDisplayAsPassword.call(this, !1),
            this.text = t[0]
        }
        ,
        n.prototype.$setTextColor = function(t) {
            return t = 0 | +t,
            this.$EditableText[1] = t,
            this.$isShowPrompt || i.prototype.$setTextColor.call(this, t),
            !0
        }
        ,
        n.prototype.$setDisplayAsPassword = function(t) {
            return this.$EditableText[2] = t,
            this.$isShowPrompt || i.prototype.$setDisplayAsPassword.call(this, t),
            !0
        }
        ,
        n.prototype.createChildren = function() {
            this.onfocusOut()
        }
        ,
        n.prototype.childrenCreated = function() {}
        ,
        n.prototype.commitProperties = function() {}
        ,
        n.prototype.measure = function() {
            var t = this.$UIComponent
              , e = this.$TextField
              , n = e[3]
              , r = 0 / 0;
            isNaN(this._widthConstraint) ? isNaN(t[8]) ? 1e5 != t[13] && (r = t[13]) : r = t[8] : (r = this._widthConstraint,
            this._widthConstraint = 0 / 0),
            i.prototype.$setWidth.call(this, r),
            this.setMeasuredSize(this.textWidth, this.textHeight),
            i.prototype.$setWidth.call(this, n)
        }
        ,
        n.prototype.updateDisplayList = function(t, e) {
            i.prototype.$setWidth.call(this, t),
            i.prototype.$setHeight.call(this, e)
        }
        ,
        n.prototype.invalidateParentLayout = function() {}
        ,
        n.prototype.setMeasuredSize = function(t, e) {}
        ,
        n.prototype.invalidateProperties = function() {}
        ,
        n.prototype.validateProperties = function() {}
        ,
        n.prototype.invalidateSize = function() {}
        ,
        n.prototype.validateSize = function(t) {}
        ,
        n.prototype.invalidateDisplayList = function() {}
        ,
        n.prototype.validateDisplayList = function() {}
        ,
        n.prototype.validateNow = function() {}
        ,
        n.prototype.setLayoutBoundsSize = function(t, i) {
            if (e.prototype.setLayoutBoundsSize.call(this, t, i),
            !isNaN(t) && t !== this._widthConstraint && 0 != t) {
                var n = this.$UIComponent;
                isNaN(n[9]) && t != n[16] && (this._widthConstraint = t,
                this.invalidateSize())
            }
        }
        ,
        n.prototype.setLayoutBoundsPosition = function(t, e) {}
        ,
        n.prototype.getLayoutBounds = function(t) {}
        ,
        n.prototype.getPreferredBounds = function(t) {}
        ,
        n
    }(egret.TextField);
    t.EditableText = i,
    __reflect(i.prototype, "eui.EditableText", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]),
    t.sys.implementUIComponent(i, egret.TextField),
    t.registerBindable(i.prototype, "text")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e;
    !function(t) {
        function e(t) {
            var e = t - 1;
            return e * e * e + 1
        }
        var i = 4
          , n = [1, 1.33, 1.66, 2]
          , r = 2.33
          , o = .02
          , s = .998
          , a = .95
          , h = Math.log(s)
          , l = function() {
            function l(i, n, r) {
                this.$scrollFactor = 1,
                this.previousTime = 0,
                this.velocity = 0,
                this.previousVelocity = [],
                this.currentPosition = 0,
                this.previousPosition = 0,
                this.currentScrollPos = 0,
                this.maxScrollPos = 0,
                this.offsetPoint = 0,
                this.$bounces = !0,
                this.started = !0,
                this.updateFunction = i,
                this.endFunction = n,
                this.target = r,
                this.animation = new t.Animation(this.onScrollingUpdate,this),
                this.animation.endFunction = this.finishScrolling,
                this.animation.easerFunction = e
            }
            return l.prototype.isPlaying = function() {
                return this.animation.isPlaying
            }
            ,
            l.prototype.stop = function() {
                this.animation.stop(),
                egret.stopTick(this.onTick, this),
                this.started = !1
            }
            ,
            l.prototype.isStarted = function() {
                return this.started
            }
            ,
            l.prototype.start = function(t) {
                this.started = !0,
                this.velocity = 0,
                this.previousVelocity.length = 0,
                this.previousTime = egret.getTimer(),
                this.previousPosition = this.currentPosition = t,
                this.offsetPoint = t,
                egret.startTick(this.onTick, this)
            }
            ,
            l.prototype.update = function(t, e, i) {
                e = Math.max(e, 0),
                this.currentPosition = t,
                this.maxScrollPos = e;
                var n = this.offsetPoint - t
                  , r = n + i;
                this.offsetPoint = t,
                0 > r && (this.$bounces ? r -= .5 * n : r = 0),
                r > e && (this.$bounces ? r -= .5 * n : r = e),
                this.currentScrollPos = r,
                this.updateFunction.call(this.target, r)
            }
            ,
            l.prototype.finish = function(t, e) {
                egret.stopTick(this.onTick, this),
                this.started = !1;
                for (var i = this.velocity * r, l = this.previousVelocity, u = l.length, p = r, c = 0; u > c; c++) {
                    var d = n[c];
                    i += l[0] * d,
                    p += d
                }
                var f = i / p
                  , y = Math.abs(f)
                  , g = 0
                  , v = 0;
                if (y > o)
                    if (v = t + (f - o) / h * 2 * this.$scrollFactor,
                    0 > v || v > e)
                        for (v = t; Math.abs(f) > o; )
                            v -= f,
                            f *= 0 > v || v > e ? s * a : s,
                            g++;
                    else
                        g = Math.log(o / y) / h;
                else
                    v = t;
                if (this.target.$getThrowInfo) {
                    var m = this.target.$getThrowInfo(t, v);
                    v = m.toPos
                }
                g > 0 ? (this.$bounces || (0 > v ? v = 0 : v > e && (v = e)),
                this.throwTo(v, g)) : this.finishScrolling()
            }
            ,
            l.prototype.onTick = function(t) {
                var e = t - this.previousTime;
                if (e > 10) {
                    var n = this.previousVelocity;
                    n.length >= i && n.shift(),
                    this.velocity = (this.currentPosition - this.previousPosition) / e,
                    n.push(this.velocity),
                    this.previousTime = t,
                    this.previousPosition = this.currentPosition
                }
                return !0
            }
            ,
            l.prototype.finishScrolling = function(t) {
                var e = this.currentScrollPos
                  , i = this.maxScrollPos
                  , n = e;
                0 > e && (n = 0),
                e > i && (n = i),
                this.throwTo(n, 300)
            }
            ,
            l.prototype.throwTo = function(t, e) {
                void 0 === e && (e = 500);
                var i = this.currentScrollPos;
                if (i == t)
                    return void this.endFunction.call(this.target);
                var n = this.animation;
                n.duration = e,
                n.from = i,
                n.to = t,
                n.play()
            }
            ,
            l.prototype.onScrollingUpdate = function(t) {
                this.currentScrollPos = t.currentValue,
                this.updateFunction.call(this.target, t.currentValue)
            }
            ,
            l
        }();
        t.TouchScroll = l,
        __reflect(l.prototype, "eui.sys.TouchScroll")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.LTR = "ltr",
        t.RTL = "rtl",
        t.TTB = "ttb",
        t.BTT = "btt",
        t
    }();
    t.Direction = e,
    __reflect(e.prototype, "eui.Direction")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.AUTO = "auto",
        t.OFF = "off",
        t.ON = "on",
        t
    }();
    t.ScrollPolicy = e,
    __reflect(e.prototype, "eui.ScrollPolicy")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i(t, i) {
            var n = e.call(this) || this;
            return n.delayList = [],
            n.skinMap = {},
            n.$styles = {},
            n.initialized = !t,
            i && egret.registerImplementation("eui.Theme", n),
            n.$configURL = t,
            n.load(t),
            n
        }
        return __extends(i, e),
        i.prototype.load = function(e) {
            var i = this;
            t.getTheme(e, function(t) {
                return i.onConfigLoaded(t)
            })
        }
        ,
        i.prototype.onConfigLoaded = function(t) {
            var e;
            if ("string" == typeof t)
                try {
                    e = JSON.parse(t)
                } catch (i) {
                    egret.$error(3e3)
                }
            else
                e = t;
            if (e && e.skins)
                for (var n = this.skinMap, r = e.skins, o = Object.keys(r), s = o.length, a = 0; s > a; a++) {
                    var h = o[a];
                    n[h] || this.mapSkin(h, r[h])
                }
            e.styles && (this.$styles = e.styles),
            e.exmls && 0 != e.exmls.length ? e.exmls[0].gjs ? (e.exmls.forEach(function(t) {
                return EXML.$parseURLContentAsJs(t.path, t.gjs, t.className)
            }),
            this.onLoaded()) : e.exmls[0].content ? (e.exmls.forEach(function(t) {
                return EXML.$parseURLContent(t.path, t.content)
            }),
            this.onLoaded()) : EXML.$loadAll(e.exmls, this.onLoaded, this, !0) : this.onLoaded()
        }
        ,
        i.prototype.onLoaded = function(t, e) {
            this.initialized = !0,
            this.handleDelayList(),
            this.dispatchEventWith(egret.Event.COMPLETE)
        }
        ,
        i.prototype.handleDelayList = function() {
            for (var t = this.delayList, e = t.length, i = 0; e > i; i++) {
                var n = t[i];
                if (!n.$Component[5]) {
                    var r = this.getSkinName(n);
                    r && (n.$Component[1] = r,
                    n.$parseSkinName())
                }
            }
            t.length = 0
        }
        ,
        i.prototype.getSkinName = function(t) {
            if (!this.initialized)
                return -1 == this.delayList.indexOf(t) && this.delayList.push(t),
                "";
            var e = this.skinMap
              , i = e[t.hostComponentKey];
            return i || (i = this.findSkinName(t)),
            i
        }
        ,
        i.prototype.findSkinName = function(t) {
            if (!t)
                return "";
            var e = t.__class__;
            if (void 0 === e)
                return "";
            var i = this.skinMap[e];
            return i || "eui.Component" == e ? i : this.findSkinName(Object.getPrototypeOf(t))
        }
        ,
        i.prototype.mapSkin = function(t, e) {
            this.skinMap[t] = e
        }
        ,
        i.prototype.$getStyleConfig = function(t) {
            return this.$styles[t]
        }
        ,
        i
    }(egret.EventDispatcher);
    t.Theme = e,
    __reflect(e.prototype, "eui.Theme")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e(e, i, n, r, o, s, a, h) {
            var l = t.call(this, e, i, n) || this;
            return l.$initTo(r, o, s, a, h),
            l
        }
        return __extends(e, t),
        e.prototype.$initTo = function(t, e, i, n, r) {
            this.kind = t,
            this.location = 0 | +e,
            this.oldLocation = 0 | +i,
            this.items = n || [],
            this.oldItems = r || []
        }
        ,
        e.prototype.clean = function() {
            t.prototype.clean.call(this),
            this.items = this.oldItems = null
        }
        ,
        e.dispatchCollectionEvent = function(t, i, n, r, o, s, a) {
            if (!t.hasEventListener(i))
                return !0;
            var h = egret.Event.create(e, i);
            h.$initTo(n, r, o, s, a);
            var l = t.dispatchEvent(h);
            return egret.Event.release(h),
            l
        }
        ,
        e.COLLECTION_CHANGE = "collectionChange",
        e
    }(egret.Event);
    t.CollectionEvent = e,
    __reflect(e.prototype, "eui.CollectionEvent")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.ADD = "add",
        t.REFRESH = "refresh",
        t.REMOVE = "remove",
        t.REPLACE = "replace",
        t.RESET = "reset",
        t.UPDATE = "update",
        t
    }();
    t.CollectionEventKind = e,
    __reflect(e.prototype, "eui.CollectionEventKind")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.item = null,
            e.itemRenderer = null,
            e.itemIndex = -1,
            e
        }
        return __extends(e, t),
        e.prototype.clean = function() {
            t.prototype.clean.call(this),
            this.item = this.itemRenderer = null
        }
        ,
        e.dispatchItemTapEvent = function(t, i, n) {
            if (!t.hasEventListener(i))
                return !0;
            var r = egret.Event.create(e, i);
            r.item = n.data,
            r.itemIndex = n.itemIndex,
            r.itemRenderer = n;
            var o = t.dispatchEvent(r);
            return egret.Event.release(r),
            o
        }
        ,
        e.ITEM_TAP = "itemTap",
        e
    }(egret.Event);
    t.ItemTapEvent = e,
    __reflect(e.prototype, "eui.ItemTapEvent")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e(e, i, n, r) {
            var o = t.call(this, e, i, n) || this;
            return o.property = r,
            o
        }
        return __extends(e, t),
        e.dispatchPropertyEvent = function(t, i, n) {
            if (!t.hasEventListener(i))
                return !0;
            var r = egret.Event.create(e, i);
            r.property = n;
            var o = t.dispatchEvent(r);
            return egret.Event.release(r),
            o
        }
        ,
        e.PROPERTY_CHANGE = "propertyChange",
        e
    }(egret.Event);
    t.PropertyEvent = e,
    __reflect(e.prototype, "eui.PropertyEvent")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e(e, i, n, r, o) {
            var s = t.call(this, e, i, n) || this;
            return r = +r,
            o = +o,
            s.currentPos = r,
            s.toPos = o,
            s
        }
        return __extends(e, t),
        e.THROW = "throw",
        e
    }(egret.Event);
    t.ScrollerThrowEvent = e,
    __reflect(e.prototype, "eui.ScrollerThrowEvent")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e(e, i, n) {
            return t.call(this, e, i, n) || this
        }
        return __extends(e, t),
        e.dispatchUIEvent = function(t, i, n, r) {
            if (!t.hasEventListener(i))
                return !0;
            var o = egret.Event.create(e, i, n, r)
              , s = t.dispatchEvent(o);
            return egret.Event.release(o),
            s
        }
        ,
        e.CREATION_COMPLETE = "creationComplete",
        e.CHANGE_END = "changeEnd",
        e.CHANGE_START = "changeStart",
        e.CLOSING = "closing",
        e.MOVE = "move",
        e
    }(egret.Event);
    t.UIEvent = e,
    __reflect(e.prototype, "eui.UIEvent")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e;
    !function(t) {
        var e = "eui.State"
          , i = "eui.AddItems"
          , n = "eui.SetProperty"
          , r = "eui.SetStateProperty"
          , o = "eui.Binding.$bindProperties"
          , s = function() {
            function t() {
                this.indent = 0
            }
            return t.prototype.toCode = function() {
                return ""
            }
            ,
            t.prototype.getIndent = function(t) {
                void 0 === t && (t = this.indent);
                for (var e = "", i = 0; t > i; i++)
                    e += "	";
                return e
            }
            ,
            t
        }();
        t.CodeBase = s,
        __reflect(s.prototype, "eui.sys.CodeBase");
        var a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.className = "",
                e.superClass = "",
                e.innerClassBlock = [],
                e.variableBlock = [],
                e.functionBlock = [],
                e
            }
            return __extends(e, t),
            e.prototype.addInnerClass = function(t) {
                -1 == this.innerClassBlock.indexOf(t) && this.innerClassBlock.push(t)
            }
            ,
            e.prototype.addVariable = function(t) {
                -1 == this.variableBlock.indexOf(t) && this.variableBlock.push(t)
            }
            ,
            e.prototype.getVariableByName = function(t) {
                for (var e = this.variableBlock, i = e.length, n = 0; i > n; n++) {
                    var r = e[n];
                    if (r.name == t)
                        return r
                }
                return null
            }
            ,
            e.prototype.addFunction = function(t) {
                -1 == this.functionBlock.indexOf(t) && this.functionBlock.push(t)
            }
            ,
            e.prototype.getFuncByName = function(t) {
                for (var e = this.functionBlock, i = e.length, n = 0; i > n; n++) {
                    var r = e[n];
                    if (r.name == t)
                        return r
                }
                return null
            }
            ,
            e.prototype.toCode = function() {
                var t = this.indent
                  , e = this.getIndent(t)
                  , i = this.getIndent(t + 1)
                  , n = this.getIndent(t + 2)
                  , r = e + "(function (";
                r += this.superClass ? "_super) {\n" + i + "__extends(" + this.className + ", _super);\n" : ") {\n";
                for (var o = this.innerClassBlock, s = o.length, a = 0; s > a; a++) {
                    var h = o[a];
                    h.indent = t + 1,
                    r += i + "var " + h.className + " = " + h.toCode() + "\n\n"
                }
                r += i + "function " + this.className + "() {\n",
                this.superClass && (r += n + "_super.call(this);\n");
                var l = this.variableBlock;
                s = l.length;
                for (var a = 0; s > a; a++) {
                    var u = l[a];
                    u.defaultValue && (r += n + u.toCode() + "\n")
                }
                if (this.constructCode) {
                    var p = this.constructCode.toCode().split("\n");
                    s = p.length;
                    for (var a = 0; s > a; a++) {
                        var c = p[a];
                        r += n + c + "\n"
                    }
                }
                r += i + "}\n",
                r += i + "var _proto = " + this.className + ".prototype;\n\n";
                var d = this.functionBlock;
                s = d.length;
                for (var a = 0; s > a; a++) {
                    var f = d[a];
                    f.indent = t + 1,
                    r += f.toCode() + "\n"
                }
                return r += i + "return " + this.className + ";\n" + e,
                r += this.superClass ? "})(" + this.superClass + ");" : "})();"
            }
            ,
            e
        }(s);
        t.EXClass = a,
        __reflect(a.prototype, "eui.sys.EXClass");
        var h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.lines = [],
                e
            }
            return __extends(e, t),
            e.prototype.addVar = function(t, e) {
                var i = e ? " = " + e : "";
                this.addCodeLine("var " + t + i + ";")
            }
            ,
            e.prototype.addAssignment = function(t, e, i) {
                var n = i ? "." + i : "";
                this.addCodeLine(t + n + " = " + e + ";")
            }
            ,
            e.prototype.addReturn = function(t) {
                this.addCodeLine("return " + t + ";")
            }
            ,
            e.prototype.addEmptyLine = function() {
                this.addCodeLine("")
            }
            ,
            e.prototype.startIf = function(t) {
                this.addCodeLine("if(" + t + ")"),
                this.startBlock()
            }
            ,
            e.prototype.startElse = function() {
                this.addCodeLine("else"),
                this.startBlock()
            }
            ,
            e.prototype.startElseIf = function(t) {
                this.addCodeLine("else if(" + t + ")"),
                this.startBlock()
            }
            ,
            e.prototype.startBlock = function() {
                this.addCodeLine("{"),
                this.indent++
            }
            ,
            e.prototype.endBlock = function() {
                this.indent--,
                this.addCodeLine("}")
            }
            ,
            e.prototype.doFunction = function(t, e) {
                var i = e.join(",");
                this.addCodeLine(t + "(" + i + ")")
            }
            ,
            e.prototype.addCodeLine = function(t) {
                this.lines.push(this.getIndent() + t)
            }
            ,
            e.prototype.addCodeLineAt = function(t, e) {
                this.lines.splice(e, 0, this.getIndent() + t)
            }
            ,
            e.prototype.containsCodeLine = function(t) {
                return -1 != this.lines.indexOf(t)
            }
            ,
            e.prototype.concat = function(t) {
                this.lines = this.lines.concat(t.lines)
            }
            ,
            e.prototype.toCode = function() {
                return this.lines.join("\n")
            }
            ,
            e
        }(s);
        t.EXCodeBlock = h,
        __reflect(h.prototype, "eui.sys.EXCodeBlock");
        var l = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.codeBlock = null,
                e.isGet = !1,
                e.name = "",
                e
            }
            return __extends(e, t),
            e.prototype.toCode = function() {
                var t, e = this.getIndent(), i = this.getIndent(this.indent + 1), n = e;
                if (this.isGet ? (t = this.getIndent(this.indent + 2),
                n += 'Object.defineProperty(_proto, "skinParts", {\n',
                n += i + "get: function () {\n") : (t = i,
                n += "_proto." + this.name + " = function () {\n"),
                this.codeBlock)
                    for (var r = this.codeBlock.toCode().split("\n"), o = r.length, s = 0; o > s; s++) {
                        var a = r[s];
                        n += t + a + "\n"
                    }
                return n += this.isGet ? i + "},\n" + i + "enumerable: true,\n" + i + "configurable: true\n" + e + "});" : e + "};"
            }
            ,
            e
        }(s);
        t.EXFunction = l,
        __reflect(l.prototype, "eui.sys.EXFunction");
        var u = function(t) {
            function e(e, i) {
                var n = t.call(this) || this;
                return n.indent = 2,
                n.name = e,
                n.defaultValue = i,
                n
            }
            return __extends(e, t),
            e.prototype.toCode = function() {
                return this.defaultValue ? "this." + this.name + " = " + this.defaultValue + ";" : ""
            }
            ,
            e
        }(s);
        t.EXVariable = u,
        __reflect(u.prototype, "eui.sys.EXVariable");
        var p = function(t) {
            function i(e, i) {
                var n = t.call(this) || this;
                return n.name = "",
                n.stateGroups = [],
                n.addItems = [],
                n.setProperty = [],
                n.name = e,
                i && (n.stateGroups = i),
                n
            }
            return __extends(i, t),
            i.prototype.addOverride = function(t) {
                t instanceof c ? this.addItems.push(t) : this.setProperty.push(t)
            }
            ,
            i.prototype.toCode = function() {
                for (var t = this.getIndent(1), i = "new " + e + ' ("' + this.name + '",\n' + t + "[\n", n = 0, r = !0, o = this.addItems.concat(this.setProperty); n < o.length; ) {
                    r ? r = !1 : i += ",\n";
                    for (var s = o[n], a = s.toCode().split("\n"), h = a.length, l = 0; h > l; l++) {
                        var u = a[l];
                        a[l] = t + t + u
                    }
                    i += a.join("\n"),
                    n++
                }
                return i += "\n" + t + "])"
            }
            ,
            i
        }(s);
        t.EXState = p,
        __reflect(p.prototype, "eui.sys.EXState");
        var c = function(t) {
            function e(e, i, n, r) {
                var o = t.call(this) || this;
                return o.target = e,
                o.property = i,
                o.position = n,
                o.relativeTo = r,
                o
            }
            return __extends(e, t),
            e.prototype.toCode = function() {
                var t = "new " + i + '("' + this.target + '","' + this.property + '",' + this.position + ',"' + this.relativeTo + '")';
                return t
            }
            ,
            e
        }(s);
        t.EXAddItems = c,
        __reflect(c.prototype, "eui.sys.EXAddItems");
        var d = function(t) {
            function e(e, i, n) {
                var r = t.call(this) || this;
                return r.target = e,
                r.name = i,
                r.value = n,
                r
            }
            return __extends(e, t),
            e.prototype.toCode = function() {
                return "new " + n + '("' + this.target + '","' + this.name + '",' + this.value + ")"
            }
            ,
            e
        }(s);
        t.EXSetProperty = d,
        __reflect(d.prototype, "eui.sys.EXSetProperty");
        var f = function(t) {
            function e(e, i, n, r) {
                var o = t.call(this) || this;
                return e = e ? "this." + e : "this",
                o.target = e,
                o.property = i,
                o.templates = n,
                o.chainIndex = r,
                o
            }
            return __extends(e, t),
            e.prototype.toCode = function() {
                var t = this.templates.join(",")
                  , e = this.chainIndex.join(",");
                return "new " + r + "(this, [" + t + "],[" + e + "]," + this.target + ',"' + this.property + '")'
            }
            ,
            e
        }(s);
        t.EXSetStateProperty = f,
        __reflect(f.prototype, "eui.sys.EXSetStateProperty");
        var y = function(t) {
            function e(e, i, n, r) {
                var o = t.call(this) || this;
                return o.target = e,
                o.property = i,
                o.templates = n,
                o.chainIndex = r,
                o
            }
            return __extends(e, t),
            e.prototype.toCode = function() {
                var t = this.templates.join(",")
                  , e = this.chainIndex.join(",");
                return o + "(this, [" + t + "],[" + e + "]," + this.target + ',"' + this.property + '")'
            }
            ,
            e
        }(s);
        t.EXBinding = y,
        __reflect(y.prototype, "eui.sys.EXBinding")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = t.sys.UIComponentImpl
      , i = function(i) {
        function n(t) {
            var e = i.call(this) || this;
            return e.$createChildrenCalled = !1,
            e.$fontChanged = !1,
            e._widthConstraint = 0 / 0,
            e._heightConstraint = 0 / 0,
            e.initializeUIValues(),
            e.text = t,
            e
        }
        return __extends(n, i),
        n.prototype.$invalidateContentBounds = function() {
            i.prototype.$invalidateContentBounds.call(this),
            this.invalidateSize()
        }
        ,
        n.prototype.$setWidth = function(t) {
            var n = i.prototype.$setWidth.call(this, t)
              , r = e.prototype.$setWidth.call(this, t);
            return n && r
        }
        ,
        n.prototype.$setHeight = function(t) {
            var n = i.prototype.$setHeight.call(this, t)
              , r = e.prototype.$setHeight.call(this, t);
            return n && r
        }
        ,
        n.prototype.$setText = function(e) {
            var n = i.prototype.$setText.call(this, e);
            return t.PropertyEvent.dispatchPropertyEvent(this, t.PropertyEvent.PROPERTY_CHANGE, "text"),
            n
        }
        ,
        n.prototype.$setFont = function(t) {
            this.$BitmapText;
            return this.$font == t ? !1 : (this.$font = t,
            this.$createChildrenCalled ? this.$parseFont() : this.$fontChanged = !0,
            this.$BitmapText[6] = !0,
            !0)
        }
        ,
        n.prototype.$parseFont = function() {
            var e = this;
            this.$fontChanged = !1;
            var i = this.$font;
            "string" == typeof i ? t.getAssets(i, function(t) {
                e.$setFontData(t)
            }) : this.$setFontData(i)
        }
        ,
        n.prototype.$setFontData = function(t) {
            return t == this.$BitmapText[5] ? !1 : (this.$BitmapText[5] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        n.prototype.createChildren = function() {
            this.$fontChanged && this.$parseFont(),
            this.$createChildrenCalled = !0
        }
        ,
        n.prototype.childrenCreated = function() {}
        ,
        n.prototype.commitProperties = function() {}
        ,
        n.prototype.measure = function() {
            var t = this.$UIComponent
              , e = this.$BitmapText
              , n = e[0]
              , r = e[1]
              , o = 0 / 0;
            isNaN(this._widthConstraint) ? isNaN(t[8]) ? 1e5 != t[13] && (o = t[13]) : o = t[8] : (o = this._widthConstraint,
            this._widthConstraint = 0 / 0),
            i.prototype.$setWidth.call(this, o);
            var s = 0 / 0;
            isNaN(this._heightConstraint) ? isNaN(t[9]) ? 1e5 != t[15] && (s = t[15]) : s = t[9] : (s = this._heightConstraint,
            this._heightConstraint = 0 / 0),
            i.prototype.$setHeight.call(this, s),
            this.setMeasuredSize(this.textWidth, this.textHeight),
            i.prototype.$setWidth.call(this, n),
            i.prototype.$setHeight.call(this, r)
        }
        ,
        n.prototype.updateDisplayList = function(t, e) {
            i.prototype.$setWidth.call(this, t),
            i.prototype.$setHeight.call(this, e)
        }
        ,
        n.prototype.invalidateParentLayout = function() {}
        ,
        n.prototype.setMeasuredSize = function(t, e) {}
        ,
        n.prototype.invalidateProperties = function() {}
        ,
        n.prototype.validateProperties = function() {}
        ,
        n.prototype.invalidateSize = function() {}
        ,
        n.prototype.validateSize = function(t) {}
        ,
        n.prototype.invalidateDisplayList = function() {}
        ,
        n.prototype.validateDisplayList = function() {}
        ,
        n.prototype.validateNow = function() {}
        ,
        n.prototype.setLayoutBoundsSize = function(t, i) {
            if (e.prototype.setLayoutBoundsSize.call(this, t, i),
            !isNaN(t) && t !== this._widthConstraint && 0 != t) {
                var n = this.$UIComponent;
                isNaN(n[9]) && t != n[16] && (this._widthConstraint = t,
                this._heightConstraint = i,
                this.invalidateSize())
            }
        }
        ,
        n.prototype.setLayoutBoundsPosition = function(t, e) {}
        ,
        n.prototype.getLayoutBounds = function(t) {}
        ,
        n.prototype.getPreferredBounds = function(t) {}
        ,
        n
    }(egret.BitmapText);
    t.BitmapLabel = i,
    __reflect(i.prototype, "eui.BitmapLabel", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]),
    t.sys.implementUIComponent(i, egret.BitmapText),
    t.registerBindable(i.prototype, "text")
}(eui || (eui = {}));
var EXML;
!function(t) {
    function e(t) {
        return h.parse(t)
    }
    function i(t, e, i, n) {
        if (void 0 === n && (n = !1),
        n && t in u)
            return void (e && e.call(i, u[t], t));
        var r = l[t];
        return r ? void r.push([e, i]) : (l[t] = [[e, i]],
        void a(t, s))
    }
    function n(t, e, i, n) {
        if (void 0 === n && (n = !1),
        !t || 0 == t.length)
            return void (e && e.call(i, [], t));
        var o = [];
        t.forEach(function(s) {
            var h = function(n, s) {
                o[n] = s,
                o.push(n),
                o.length == t.length && r(t, o, e, i)
            };
            return n && s in u ? void h(s, "") : void a(s, h)
        })
    }
    function r(t, e, i, n) {
        var r = [];
        t.forEach(function(t, i) {
            if (t in u && !e[t])
                return void (r[i] = u[t]);
            var n = e[t]
              , o = s(t, n);
            r[i] = o
        }),
        i && i.call(n, r, t)
    }
    function o(t, e, i) {
        var n = null;
        if (e && (n = h.$parseCode(e, i)),
        t) {
            u[t] = n;
            var r = l[t];
            delete l[t];
            for (var o = r ? r.length : 0, s = 0; o > s; s++) {
                var a = r[s];
                a[0] && a[1] && a[0].call(a[1], n, t)
            }
        }
        return n
    }
    function s(t, i) {
        var n = null;
        if (i)
            try {
                n = e(i)
            } catch (r) {
                console.error(t + "\n" + r.message)
            }
        if (t) {
            u[t] = n;
            var o = l[t];
            delete l[t];
            for (var s = o ? o.length : 0, a = 0; s > a; a++) {
                var h = o[a];
                h[0] && h[1] && h[0].call(h[1], n, t)
            }
        }
        return n
    }
    function a(t, e) {
        var i = t;
        -1 == t.indexOf("://") && (i = p + t);
        var n = function(i) {
            i || (i = ""),
            e(t, i)
        };
        eui.getTheme(i, n)
    }
    var h = new eui.sys.EXMLParser
      , l = {}
      , u = {}
      , p = "";
    Object.defineProperty(t, "prefixURL", {
        get: function() {
            return p
        },
        set: function(t) {
            p = t
        },
        enumerable: !0,
        configurable: !0
    }),
    t.parse = e,
    t.load = i,
    t.$loadAll = n,
    t.$parseURLContentAsJs = o,
    t.$parseURLContent = s
}(EXML || (EXML = {}));
var eui;
!function(t) {
    var e;
    !function(t) {
        function e(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
        function i(t) {
            var e = egret.getDefinitionByName(t);
            return e ? e.prototype : null
        }
        function n(t) {
            if (!t)
                return null;
            var e;
            return e = new t
        }
        t.NS_S = "http://ns.egret.com/eui",
        t.NS_W = "http://ns.egret.com/wing";
        var r = ["Point", "Matrix", "Rectangle"]
          , o = ["Array", "boolean", "string", "number"]
          , s = "eui."
          , a = 0
          , h = {}
          , l = function() {
            function l() {}
            return l.prototype.$describe = function(t) {
                if (!t)
                    return null;
                var i = Object.getPrototypeOf(t);
                if (!i)
                    return null;
                var r;
                if (i.hasOwnProperty("__hashCode__") && (r = h[i.__hashCode__]))
                    return r;
                var s = Object.getPrototypeOf(i);
                if (!s)
                    return null;
                var l = n(s.constructor)
                  , u = this.$describe(l);
                if (u) {
                    var p = function() {};
                    p.prototype = u,
                    r = new p
                } else
                    r = {};
                for (var c = Object.keys(i).concat(Object.keys(t)), d = c.length, f = t.__meta__, y = 0; d > y; y++) {
                    var g = c[y];
                    if ("constructor" != g && "_" != g.charAt(0) && "$" != g.charAt(0)) {
                        var v = void 0;
                        if (f && f[g])
                            v = f[g];
                        else if (e(t[g]))
                            v = "Array";
                        else {
                            if (v = typeof t[g],
                            "function" == v)
                                continue;
                            -1 == o.indexOf(v) && (v = "any")
                        }
                        r[g] = v
                    }
                }
                return Object.getPrototypeOf(s) && (i.__hashCode__ = a++,
                h[i.__hashCode__] = r),
                r
            }
            ,
            l.prototype.getClassNameById = function(e, n) {
                if (n == t.NS_S) {
                    if ("Object" == e)
                        return e;
                    if (-1 != r.indexOf(e))
                        return "egret." + e
                }
                var a = "";
                return -1 != o.indexOf(e) ? e : (n == t.NS_W || (a = n && n != t.NS_S ? n.substring(0, n.length - 1) + e : s + e),
                i(a) || (a = ""),
                a)
            }
            ,
            l.prototype.getDefaultPropById = function(t, e) {
                var n, r = this.getClassNameById(t, e), o = i(r);
                return o && (n = o.__defaultProperty__),
                n ? n : ""
            }
            ,
            l.prototype.getPropertyType = function(t, e) {
                if ("Object" == e)
                    return "any";
                var r = ""
                  , o = i(e);
                if (o) {
                    if (!o.hasOwnProperty("__hashCode__")) {
                        var s = egret.getDefinitionByName(e)
                          , a = n(s);
                        if (!a)
                            return r;
                        this.$describe(a)
                    }
                    var l = h[o.__hashCode__];
                    l && (r = l[t])
                }
                return r
            }
            ,
            l
        }();
        t.EXMLConfig = l,
        __reflect(l.prototype, "eui.sys.EXMLConfig")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    egret.$locale_strings = egret.$locale_strings || {},
    egret.$locale_strings.en_US = egret.$locale_strings.en_US || {};
    var e = egret.$locale_strings.en_US;
    e[2001] = "EXML parsing error {0}: EXML file can't be found ",
    e[2002] = "EXML parsing error : invalid XML file:\n{0}",
    e[2003] = "EXML parsing error {0}: the class definitions corresponding to nodes can't be found  \n {1}",
    e[2004] = "EXML parsing error {0}: nodes cannot contain id property with the same name \n {1}",
    e[2005] = "EXML parsing error {0}: property with the name of '{1}' does not exist on the node, or the property does not have a default value: \n {2}",
    e[2006] = "EXML parsing error {0}: undefined view state name: '{1}' \n {2}",
    e[2007] = "EXML parsing error {0}: only UIComponent objects within the container can use the includeIn and excludeFrom properties\n {1}",
    e[2008] = "EXML parsing error {0}: fail to assign values of '{1}' class to property: '{2}' \n {3}",
    e[2009] = "EXML parsing error {0}: only one ID can be referenced in the node property value '{}' label; and complex expression is not allowed to use \n {1}",
    e[2010] = "EXML parsing error {0}: ID referenced by property: '{1}':  '{2}' does not exist \n {3}",
    e[2011] = "EXML parsing error {0}: fail to assign more than one child nodes to the same property: '{1}' \n {2}",
    e[2012] = "EXML parsing error {0}: no default property exists on the node; and you must explicitly declare the property name that the child node  is assigned to \n {1}",
    e[2013] = "EXML parsing error {0}: view state grammar is not allowed to use on property nodes of Array class \n {1} ",
    e[2014] = "EXML parsing error {0}: assigning the skin class itself to the node property is not allowed \n {1}",
    e[2015] = "EXML parsing error {0}: class definition referenced by node: {1} does not exist \n {2}",
    e[2016] = "EXML parsing error {0}: format error of 'scale9Grid' property value on the node: {1}",
    e[2017] = "EXML parsing error {0}: namespace prefix missing on the node: {1}",
    e[2018] = "EXML parsing error {0}: format error of 'skinName' property value on the node: {1}",
    e[2019] = "EXML parsing error {0}: the container’s child item must be visible nodes: {1}",
    e[2020] = "EXML parsing error {0}: for child nodes in w: Declarations, the includeIn and excludeFrom properties are not allowed to use \n {1}",
    e[2021] = "Compile errors in {0}, the attribute name: {1}, the attribute value: {2}.",
    e[2022] = "EXML parsing error: there contains illegal characters in the id `{0}`",
    e[2101] = "EXML parsing warnning : fail to register the class property : {0},there is already a class with the same name in the global,please try to rename the class name for the exml. \n {1}",
    e[2102] = "EXML parsing warnning {0}: no child node can be found on the property code \n {1}",
    e[2103] = "EXML parsing warnning {0}: the same property '{1}' on the node is assigned multiple times \n {2}",
    e[2104] = "EXML parsing warnning, Instantiate class {0} error，the parameters of its constructor method must be empty.",
    e[2201] = "BasicLayout doesn't support virtualization.",
    e[2202] = "parse skinName error，the parsing result of skinName must be a instance of eui.Skin.",
    e[2203] = "Could not find the skin class '{0}'。",
    e[2301] = "parse source failed，could not find asset from URL：{0} ."
}(eui || (eui = {}));
var eui;
!function(t) {
    egret.$locale_strings = egret.$locale_strings || {},
    egret.$locale_strings.zh_CN = egret.$locale_strings.zh_CN || {};
    var e = egret.$locale_strings.zh_CN;
    e[2001] = "EXML解析错误 {0}: 找不到EXML文件",
    e[2002] = "EXML解析错误: 不是有效的XML文件:\n{0}",
    e[2003] = "EXML解析错误 {0}: 无法找到节点所对应的类定义\n{1}",
    e[2004] = "EXML解析错误 {0}: 节点不能含有同名的id属性\n{1}",
    e[2005] = "EXML解析错误 {0}: 节点上不存在名为'{1}'的属性，或者该属性没有初始值:\n{2}",
    e[2006] = "EXML解析错误 {0}: 未定义的视图状态名称:'{1}'\n{2}",
    e[2007] = "EXML解析错误 {0}: 只有处于容器内的 UIComponent 对象可以使用includeIn和excludeFrom属性\n{1}",
    e[2008] = "EXML解析错误 {0}: 无法将'{1}'类型的值赋给属性:'{2}'\n{3}",
    e[2009] = "EXML解析错误 {0}: 在节点属性值的‘{}’标签内只能引用一个ID，不允许使用复杂表达式\n{1}",
    e[2010] = "EXML解析错误 {0}: 属性:'{1}'所引用的ID: '{2}'不存在\n{3}",
    e[2011] = "EXML解析错误 {0}: 无法将多个子节点赋值给同一个属性:'{1}'\n{2}",
    e[2012] = "EXML解析错误 {0}: 节点上不存在默认属性，必须显式声明子节点要赋值到的属性名\n{1}",
    e[2013] = "EXML解析错误 {0}: 类型为Array的属性节点上不允许使用视图状态语法\n{1}",
    e[2014] = "EXML解析错误 {0}: 不允许将皮肤类自身赋值给节点属性\n{1}",
    e[2015] = "EXML解析错误 {0}: 节点引用的类定义:{1}不存在\n{2}",
    e[2016] = "EXML解析错误 {0}: 节点上'scale9Grid'属性值的格式错误:{1}",
    e[2017] = "EXML解析错误 {0}: 节点上缺少命名空间前缀:{1}",
    e[2018] = "EXML解析错误 {0}: 节点上'skinName'属性值的格式错误:{1}",
    e[2019] = "EXML解析错误 {0}: 容器的子项必须是可视节点:{1}",
    e[2020] = "EXML解析错误 {0}: 在w:Declarations内的子节点，不允许使用includeIn和excludeFrom属性\n{1}",
    e[2021] = "{0} 中存在编译错误，属性名 : {1}，属性值 : {2}",
    e[2022] = "EXML解析错误: id `{0}` 中含有非法字符",
    e[2101] = "EXML解析警告: 在EXML根节点上声明的 class 属性: {0} 注册失败，所对应的类已经存在，请尝试重命名要注册的类名。\n{1}",
    e[2102] = "EXML解析警告 {0}: 在属性节点上找不到任何子节点\n{1}",
    e[2103] = "EXML解析警告 {0}: 节点上的同一个属性'{1}'被多次赋值\n{2}",
    e[2104] = "EXML解析警告，无法直接实例化自定义组件：{0} ，在EXML中使用的自定义组件必须要能直接被实例化，否则可能导致后续EXML解析报错。",
    e[2201] = "BasicLayout 不支持虚拟化。",
    e[2202] = "皮肤解析出错，属性 skinName 的值必须要能够解析为一个 eui.Skin 的实例。",
    e[2203] = "找不到指定的皮肤类 '{0}'。",
    e[2301] = "素材解析失败，找不到URL：{0} 所对应的资源。"
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(e) {
        function i() {
            return e.call(this) || this
        }
        return __extends(i, e),
        i.prototype.measure = function() {
            e.prototype.measure.call(this),
            t.sys.measure(this.$target)
        }
        ,
        i.prototype.updateDisplayList = function(i, n) {
            e.prototype.updateDisplayList.call(this, i, n);
            var r = this.$target
              , o = t.sys.updateDisplayList(r, i, n);
            r.setContentSize(Math.ceil(o.x), Math.ceil(o.y))
        }
        ,
        i
    }(t.LayoutBase);
    t.BasicLayout = e,
    __reflect(e.prototype, "eui.BasicLayout")
}(eui || (eui = {})),
function(t) {
    var e;
    !function(t) {
        function e(t, e) {
            if (!t || "number" == typeof t)
                return t;
            var i = t
              , n = i.indexOf("%");
            if (-1 == n)
                return +i;
            var r = +i.substring(0, n);
            return .01 * r * e
        }
        function i(t) {
            if (t) {
                for (var e = 0, i = 0, n = egret.$TempRectangle, o = t.numChildren, s = 0; o > s; s++) {
                    var a = t.getChildAt(s);
                    if (egret.is(a, r) && a.$includeInLayout) {
                        var h = a.$UIComponent
                          , l = +h[4]
                          , u = +h[5]
                          , p = +h[0]
                          , c = +h[1]
                          , d = +h[2]
                          , f = +h[3]
                          , y = void 0
                          , g = void 0;
                        a.getPreferredBounds(n),
                        isNaN(p) || isNaN(c) ? isNaN(l) ? isNaN(p) && isNaN(c) ? y = n.x : (y = isNaN(p) ? 0 : p,
                        y += isNaN(c) ? 0 : c) : y = 2 * Math.abs(l) : y = p + c,
                        isNaN(d) || isNaN(f) ? isNaN(u) ? isNaN(d) && isNaN(f) ? g = n.y : (g = isNaN(d) ? 0 : d,
                        g += isNaN(f) ? 0 : f) : g = 2 * Math.abs(u) : g = d + f;
                        var v = n.width
                          , m = n.height;
                        e = Math.ceil(Math.max(e, y + v)),
                        i = Math.ceil(Math.max(i, g + m))
                    }
                }
                t.setMeasuredSize(e, i)
            }
        }
        function n(t, i, n) {
            if (t) {
                for (var o = t.numChildren, s = 0, a = 0, h = egret.$TempRectangle, l = 0; o > l; l++) {
                    var u = t.getChildAt(l);
                    if (egret.is(u, r) && u.$includeInLayout) {
                        var p = u.$UIComponent
                          , c = e(p[4], .5 * i)
                          , d = e(p[5], .5 * n)
                          , f = e(p[0], i)
                          , y = e(p[1], i)
                          , g = e(p[2], n)
                          , v = e(p[3], n)
                          , m = p[6]
                          , $ = p[7]
                          , E = 0 / 0
                          , C = 0 / 0;
                        isNaN(f) || isNaN(y) ? isNaN(m) || (E = Math.round(i * Math.min(.01 * m, 1))) : E = i - y - f,
                        isNaN(g) || isNaN(v) ? isNaN($) || (C = Math.round(n * Math.min(.01 * $, 1))) : C = n - v - g,
                        u.setLayoutBoundsSize(E, C),
                        u.getLayoutBounds(h);
                        var _ = h.width
                          , S = h.height
                          , T = 0 / 0
                          , P = 0 / 0;
                        T = isNaN(c) ? isNaN(f) ? isNaN(y) ? h.x : i - _ - y : f : Math.round((i - _) / 2 + c),
                        P = isNaN(d) ? isNaN(g) ? isNaN(v) ? h.y : n - S - v : g : Math.round((n - S) / 2 + d),
                        u.setLayoutBoundsPosition(T, P),
                        s = Math.max(s, T + _),
                        a = Math.max(a, P + S)
                    }
                }
                return egret.$TempPoint.setTo(s, a)
            }
        }
        var r = "eui.UIComponent";
        t.measure = i,
        t.updateDisplayList = n
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.LEFT = "left",
        t.JUSTIFY_USING_GAP = "justifyUsingGap",
        t.JUSTIFY_USING_WIDTH = "justifyUsingWidth",
        t
    }();
    t.ColumnAlign = e,
    __reflect(e.prototype, "eui.ColumnAlign")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = "eui.UIComponent"
      , i = function(i) {
        function n() {
            return null !== i && i.apply(this, arguments) || this
        }
        return __extends(n, i),
        n.prototype.measureReal = function() {
            for (var t = this.$target, i = t.numElements, n = i, r = 0, o = 0, s = egret.$TempRectangle, a = 0; i > a; a++) {
                var h = t.getElementAt(a);
                egret.is(h, e) && h.$includeInLayout ? (h.getPreferredBounds(s),
                r += s.width,
                o = Math.max(o, s.height)) : n--
            }
            r += (n - 1) * this.$gap;
            var l = this.$paddingLeft + this.$paddingRight
              , u = this.$paddingTop + this.$paddingBottom;
            t.setMeasuredSize(r + l, o + u)
        }
        ,
        n.prototype.measureVirtual = function() {
            for (var t = this.$target, i = this.$typicalWidth, n = this.getElementTotalSize(), r = Math.max(this.maxElementSize, this.$typicalHeight), o = egret.$TempRectangle, s = this.endIndex, a = this.elementSizeTable, h = this.startIndex; s > h; h++) {
                var l = t.getElementAt(h);
                egret.is(l, e) && l.$includeInLayout && (l.getPreferredBounds(o),
                n += o.width,
                n -= isNaN(a[h]) ? i : a[h],
                r = Math.max(r, o.height))
            }
            var u = this.$paddingLeft + this.$paddingRight
              , p = this.$paddingTop + this.$paddingBottom;
            t.setMeasuredSize(n + u, r + p)
        }
        ,
        n.prototype.updateDisplayListReal = function(i, n) {
            var r = this.$target
              , o = this.$paddingLeft
              , s = this.$paddingRight
              , a = this.$paddingTop
              , h = this.$paddingBottom
              , l = this.$gap
              , u = Math.max(0, i - o - s)
              , p = Math.max(0, n - a - h)
              , c = this.$horizontalAlign == t.JustifyAlign.JUSTIFY
              , d = this.$verticalAlign == t.JustifyAlign.JUSTIFY || this.$verticalAlign == t.JustifyAlign.CONTENT_JUSTIFY
              , f = 0;
            d || (this.$verticalAlign == egret.VerticalAlign.MIDDLE ? f = .5 : this.$verticalAlign == egret.VerticalAlign.BOTTOM && (f = 1));
            var y, g, v, m = r.numElements, $ = m, E = o, C = a, _ = 0, S = 0, T = [], P = u, b = this.maxElementSize, x = egret.$TempRectangle;
            for (y = 0; m > y; y++) {
                var I = r.getElementAt(y);
                if (egret.is(I, e) && I.$includeInLayout)
                    if (I.getPreferredBounds(x),
                    b = Math.max(b, x.height),
                    c)
                        _ += x.width;
                    else {
                        var L = I.$UIComponent;
                        isNaN(L[6]) ? P -= x.width : (S += L[6],
                        v = new t.sys.ChildInfo,
                        v.layoutElement = I,
                        v.percent = L[6],
                        v.min = L[12],
                        v.max = L[13],
                        T.push(v))
                    }
                else
                    $--
            }
            P -= l * ($ - 1),
            P = P > 0 ? P : 0;
            var N, O = u - _ - l * ($ - 1), A = $, M = {};
            if (c) {
                if (0 > O) {
                    for (N = P / $,
                    y = 0; m > y; y++)
                        g = r.getElementAt(y),
                        egret.is(g, e) && g.$includeInLayout && (g.getPreferredBounds(x),
                        x.width <= N && (P -= x.width,
                        A--));
                    P = P > 0 ? P : 0
                }
            } else if (S > 0) {
                this.flexChildrenProportionally(u, P, S, T);
                var B = 0
                  , D = T.length;
                for (y = 0; D > y; y++) {
                    v = T[y];
                    var R = Math.round(v.size + B);
                    B += v.size - R,
                    M[v.layoutElement.$hashCode] = R,
                    P -= R
                }
                P = P > 0 ? P : 0
            }
            this.$horizontalAlign == egret.HorizontalAlign.CENTER ? E = o + .5 * P : this.$horizontalAlign == egret.HorizontalAlign.RIGHT && (E = o + P);
            var w = o
              , V = a
              , z = 0
              , H = 0
              , U = Math.ceil(p);
            this.$verticalAlign == t.JustifyAlign.CONTENT_JUSTIFY && (U = Math.ceil(Math.max(p, b)));
            var k, F, G = 0;
            for (y = 0; m > y; y++) {
                var j = 0;
                if (g = r.getElementAt(y),
                egret.is(g, e) && g.$includeInLayout) {
                    if (g.getPreferredBounds(x),
                    k = 0 / 0,
                    c ? (F = 0 / 0,
                    O > 0 ? F = P * x.width / _ : 0 > O && x.width > N && (F = P / A),
                    isNaN(F) || (k = Math.round(F + G),
                    G += F - k)) : k = M[g.$hashCode],
                    d)
                        C = a,
                        g.setLayoutBoundsSize(k, U),
                        g.getLayoutBounds(x);
                    else {
                        var X = 0 / 0
                          , L = g.$UIComponent;
                        if (!isNaN(g.percentHeight)) {
                            var W = Math.min(100, L[7]);
                            X = Math.round(p * W * .01)
                        }
                        g.setLayoutBoundsSize(k, X),
                        g.getLayoutBounds(x),
                        j = (p - x.height) * f,
                        j = j > 0 ? j : 0,
                        C = a + j
                    }
                    g.setLayoutBoundsPosition(Math.round(E), Math.round(C)),
                    z = Math.ceil(x.width),
                    H = Math.ceil(x.height),
                    w = Math.max(w, E + z),
                    V = Math.max(V, C + H),
                    E += z + l
                }
            }
            this.maxElementSize = b,
            r.setContentSize(w + s, V + h)
        }
        ,
        n.prototype.updateDisplayListVirtual = function(i, n) {
            var r = this.$target;
            this.indexInViewCalculated ? this.indexInViewCalculated = !1 : this.getIndexInView();
            var o, s = this.$paddingRight, a = this.$paddingTop, h = this.$paddingBottom, l = this.$gap, u = r.numElements;
            if (-1 == this.startIndex || -1 == this.endIndex)
                return o = this.getStartPosition(u) - l + s,
                void r.setContentSize(o, r.contentHeight);
            var p = this.endIndex;
            r.setVirtualElementIndicesInView(this.startIndex, p);
            var c = this.$verticalAlign == t.JustifyAlign.JUSTIFY || this.$verticalAlign == t.JustifyAlign.CONTENT_JUSTIFY
              , d = this.$verticalAlign == t.JustifyAlign.CONTENT_JUSTIFY
              , f = 0;
            c || (this.$verticalAlign == egret.VerticalAlign.MIDDLE ? f = .5 : this.$verticalAlign == egret.VerticalAlign.BOTTOM && (f = 1));
            var y, g = egret.$TempRectangle, v = Math.max(0, n - a - h), m = Math.ceil(v), $ = this.$typicalHeight, E = this.$typicalWidth, C = this.maxElementSize, _ = Math.max($, this.maxElementSize);
            if (d) {
                for (var S = this.startIndex; p >= S; S++)
                    y = r.getVirtualElementAt(S),
                    egret.is(y, e) && y.$includeInLayout && (y.getPreferredBounds(g),
                    C = Math.max(C, g.height));
                m = Math.ceil(Math.max(v, C))
            }
            for (var T, P = 0, b = 0, x = 0, I = !1, L = this.elementSizeTable, N = this.startIndex; p >= N; N++) {
                var O = 0;
                y = r.getVirtualElementAt(N),
                egret.is(y, e) && y.$includeInLayout && (y.getPreferredBounds(g),
                d || (C = Math.max(C, g.height)),
                c ? (b = a,
                y.setLayoutBoundsSize(0 / 0, m),
                y.getLayoutBounds(g)) : (y.getLayoutBounds(g),
                O = (v - g.height) * f,
                O = O > 0 ? O : 0,
                b = a + O),
                x = Math.max(x, g.height),
                I || (T = isNaN(L[N]) ? E : L[N],
                T != g.width && (I = !0)),
                L[N] = g.width,
                P = this.getStartPosition(N),
                y.setLayoutBoundsPosition(Math.round(P), Math.round(b)))
            }
            x += a + h,
            o = this.getStartPosition(u) - l + s,
            this.maxElementSize = C,
            r.setContentSize(o, x),
            (I || _ < this.maxElementSize) && r.invalidateSize()
        }
        ,
        n.prototype.getStartPosition = function(t) {
            if (!this.$useVirtualLayout && this.$target) {
                var e = this.$target.getElementAt(t);
                if (e)
                    return e.x
            }
            for (var i = this.$typicalWidth, n = this.$paddingLeft, r = this.$gap, o = this.elementSizeTable, s = 0; t > s; s++) {
                var a = o[s];
                isNaN(a) && (a = i),
                n += a + r
            }
            return n
        }
        ,
        n.prototype.getElementSize = function(t) {
            if (this.$useVirtualLayout) {
                var e = this.elementSizeTable[t];
                return isNaN(e) && (e = this.$typicalWidth),
                e
            }
            return this.$target ? this.$target.getElementAt(t).width : 0
        }
        ,
        n.prototype.getElementTotalSize = function() {
            for (var t = this.$typicalWidth, e = this.$gap, i = 0, n = this.$target.numElements, r = this.elementSizeTable, o = 0; n > o; o++) {
                var s = r[o];
                isNaN(s) && (s = t),
                i += s + e
            }
            return i -= e
        }
        ,
        n.prototype.elementAdded = function(t) {
            this.useVirtualLayout && (i.prototype.elementAdded.call(this, t),
            this.elementSizeTable.splice(t, 0, this.$typicalWidth))
        }
        ,
        n.prototype.getIndexInView = function() {
            var t = this.$target;
            if (!t || 0 == t.numElements)
                return this.startIndex = this.endIndex = -1,
                !1;
            var e = t.$UIComponent;
            if (e[10] <= 0 || e[11] <= 0)
                return this.startIndex = this.endIndex = -1,
                !1;
            var i = t.numElements
              , n = this.getStartPosition(i - 1) + this.elementSizeTable[i - 1] + this.$paddingRight
              , r = t.scrollH;
            if (r > n - this.$paddingRight)
                return this.startIndex = -1,
                this.endIndex = -1,
                !1;
            var o = t.scrollH + e[10];
            if (o < this.$paddingLeft)
                return this.startIndex = -1,
                this.endIndex = -1,
                !1;
            var s = this.startIndex
              , a = this.endIndex;
            return this.startIndex = this.findIndexAt(r, 0, i - 1),
            -1 == this.startIndex && (this.startIndex = 0),
            this.endIndex = this.findIndexAt(o, 0, i - 1),
            -1 == this.endIndex && (this.endIndex = i - 1),
            s != this.startIndex || a != this.endIndex
        }
        ,
        n
    }(t.LinearLayoutBase);
    t.HorizontalLayout = i,
    __reflect(i.prototype, "eui.HorizontalLayout")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.JUSTIFY = "justify",
        t.CONTENT_JUSTIFY = "contentJustify",
        t
    }();
    t.JustifyAlign = e,
    __reflect(e.prototype, "eui.JustifyAlign")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.TOP = "top",
        t.JUSTIFY_USING_GAP = "justifyUsingGap",
        t.JUSTIFY_USING_HEIGHT = "justifyUsingHeight",
        t
    }();
    t.RowAlign = e,
    __reflect(e.prototype, "eui.RowAlign")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = "eui.UIComponent"
      , i = function(i) {
        function n() {
            var e = i.call(this) || this;
            return e.explicitHorizontalGap = 0 / 0,
            e._horizontalGap = 6,
            e.explicitVerticalGap = 0 / 0,
            e._verticalGap = 6,
            e._columnCount = -1,
            e._requestedColumnCount = 0,
            e._rowCount = -1,
            e._requestedRowCount = 0,
            e.explicitColumnWidth = 0 / 0,
            e._columnWidth = 0 / 0,
            e.explicitRowHeight = 0 / 0,
            e._rowHeight = 0 / 0,
            e._paddingLeft = 0,
            e._paddingRight = 0,
            e._paddingTop = 0,
            e._paddingBottom = 0,
            e._horizontalAlign = t.JustifyAlign.JUSTIFY,
            e._verticalAlign = t.JustifyAlign.JUSTIFY,
            e._columnAlign = t.ColumnAlign.LEFT,
            e._rowAlign = t.RowAlign.TOP,
            e._orientation = t.TileOrientation.ROWS,
            e.maxElementWidth = 0,
            e.maxElementHeight = 0,
            e.startIndex = -1,
            e.endIndex = -1,
            e.indexInViewCalculated = !1,
            e
        }
        return __extends(n, i),
        Object.defineProperty(n.prototype, "horizontalGap", {
            get: function() {
                return this._horizontalGap
            },
            set: function(t) {
                t = +t,
                t !== this._horizontalGap && (this.explicitHorizontalGap = t,
                this._horizontalGap = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "verticalGap", {
            get: function() {
                return this._verticalGap
            },
            set: function(t) {
                t = +t,
                t !== this._verticalGap && (this.explicitVerticalGap = t,
                this._verticalGap = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "columnCount", {
            get: function() {
                return this._columnCount
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "requestedColumnCount", {
            get: function() {
                return this._requestedColumnCount
            },
            set: function(t) {
                t = +t || 0,
                this._requestedColumnCount !== t && (this._requestedColumnCount = t,
                this._columnCount = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "rowCount", {
            get: function() {
                return this._rowCount
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "requestedRowCount", {
            get: function() {
                return this._requestedRowCount
            },
            set: function(t) {
                t = +t || 0,
                this._requestedRowCount != t && (this._requestedRowCount = t,
                this._rowCount = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "columnWidth", {
            get: function() {
                return this._columnWidth
            },
            set: function(t) {
                t = +t,
                t !== this._columnWidth && (this.explicitColumnWidth = t,
                this._columnWidth = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "rowHeight", {
            get: function() {
                return this._rowHeight
            },
            set: function(t) {
                t = +t,
                t !== this._rowHeight && (this.explicitRowHeight = t,
                this._rowHeight = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "paddingLeft", {
            get: function() {
                return this._paddingLeft
            },
            set: function(t) {
                t = +t || 0,
                this._paddingLeft != t && (this._paddingLeft = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "paddingRight", {
            get: function() {
                return this._paddingRight
            },
            set: function(t) {
                t = +t || 0,
                this._paddingRight !== t && (this._paddingRight = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "paddingTop", {
            get: function() {
                return this._paddingTop
            },
            set: function(t) {
                t = +t || 0,
                this._paddingTop != t && (this._paddingTop = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "paddingBottom", {
            get: function() {
                return this._paddingBottom
            },
            set: function(t) {
                t = +t || 0,
                this._paddingBottom !== t && (this._paddingBottom = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "horizontalAlign", {
            get: function() {
                return this._horizontalAlign
            },
            set: function(t) {
                this._horizontalAlign != t && (this._horizontalAlign = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign
            },
            set: function(t) {
                this._verticalAlign != t && (this._verticalAlign = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "columnAlign", {
            get: function() {
                return this._columnAlign
            },
            set: function(t) {
                this._columnAlign != t && (this._columnAlign = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "rowAlign", {
            get: function() {
                return this._rowAlign
            },
            set: function(t) {
                this._rowAlign != t && (this._rowAlign = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "orientation", {
            get: function() {
                return this._orientation
            },
            set: function(t) {
                this._orientation != t && (this._orientation = t,
                this.invalidateTargetLayout())
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.invalidateTargetLayout = function() {
            var t = this.$target;
            t && (t.invalidateSize(),
            t.invalidateDisplayList())
        }
        ,
        n.prototype.measure = function() {
            var t = this.$target;
            if (t) {
                var e = this._columnCount
                  , i = this._rowCount
                  , n = this._columnWidth
                  , r = this._rowHeight
                  , o = 0
                  , s = 0
                  , a = t.$UIComponent;
                this.calculateRowAndColumn(a[8], a[9]);
                var h = this._requestedColumnCount > 0 ? this._requestedColumnCount : this._columnCount
                  , l = this._requestedRowCount > 0 ? this._requestedRowCount : this._rowCount
                  , u = isNaN(this._horizontalGap) ? 0 : this._horizontalGap
                  , p = isNaN(this._verticalGap) ? 0 : this._verticalGap;
                h > 0 && (o = h * (this._columnWidth + u) - u),
                l > 0 && (s = l * (this._rowHeight + p) - p);
                var c = this._paddingLeft + this._paddingRight
                  , d = this._paddingTop + this._paddingBottom;
                t.setMeasuredSize(o + c, s + d),
                this._columnCount = e,
                this._rowCount = i,
                this._columnWidth = n,
                this._rowHeight = r
            }
        }
        ,
        n.prototype.calculateRowAndColumn = function(i, n) {
            var r = this.$target
              , o = isNaN(this._horizontalGap) ? 0 : this._horizontalGap
              , s = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            for (var a = r.numElements, h = a, l = 0; h > l; l++) {
                var u = r.getElementAt(l);
                !u || egret.is(u, e) && u.$includeInLayout || a--
            }
            if (0 == a)
                return void (this._rowCount = this._columnCount = 0);
            (isNaN(this.explicitColumnWidth) || isNaN(this.explicitRowHeight)) && this.updateMaxElementSize(),
            isNaN(this.explicitColumnWidth) ? this._columnWidth = this.maxElementWidth : this._columnWidth = this.explicitColumnWidth,
            isNaN(this.explicitRowHeight) ? this._rowHeight = this.maxElementHeight : this._rowHeight = this.explicitRowHeight;
            var p = this._columnWidth + o;
            0 >= p && (p = 1);
            var c = this._rowHeight + s;
            0 >= c && (c = 1);
            var d = this._orientation == t.TileOrientation.COLUMNS
              , f = !isNaN(i)
              , y = !isNaN(n)
              , g = this._paddingLeft
              , v = this._paddingRight
              , m = this._paddingTop
              , $ = this._paddingBottom;
            if (this._requestedColumnCount > 0 || this._requestedRowCount > 0)
                this._requestedRowCount > 0 && (this._rowCount = Math.min(this._requestedRowCount, a)),
                this._requestedColumnCount > 0 && (this._columnCount = Math.min(this._requestedColumnCount, a));
            else if (f || y)
                if (!f || y && d) {
                    var E = Math.max(0, n - m - $);
                    this._rowCount = Math.floor((E + s) / c),
                    this._rowCount = Math.max(1, Math.min(this._rowCount, a))
                } else {
                    var C = Math.max(0, i - g - v);
                    this._columnCount = Math.floor((C + o) / p),
                    this._columnCount = Math.max(1, Math.min(this._columnCount, a))
                }
            else {
                var _ = Math.sqrt(a * p * c);
                d ? this._rowCount = Math.max(1, Math.round(_ / c)) : this._columnCount = Math.max(1, Math.round(_ / p))
            }
            -1 == this._rowCount && (this._rowCount = Math.max(1, Math.ceil(a / this._columnCount))),
            -1 == this._columnCount && (this._columnCount = Math.max(1, Math.ceil(a / this._rowCount))),
            this._requestedColumnCount > 0 && this._requestedRowCount > 0 && (this._orientation == t.TileOrientation.ROWS ? this._rowCount = Math.max(1, Math.ceil(a / this._requestedColumnCount)) : this._columnCount = Math.max(1, Math.ceil(a / this._requestedRowCount)))
        }
        ,
        n.prototype.updateMaxElementSize = function() {
            this.$target && (this.$useVirtualLayout ? (this.maxElementWidth = Math.max(this.maxElementWidth, this.$typicalWidth),
            this.maxElementHeight = Math.max(this.maxElementHeight, this.$typicalHeight),
            this.doUpdateMaxElementSize(this.startIndex, this.endIndex)) : this.doUpdateMaxElementSize(0, this.$target.numElements - 1))
        }
        ,
        n.prototype.doUpdateMaxElementSize = function(t, i) {
            var n = this.maxElementWidth
              , r = this.maxElementHeight
              , o = egret.$TempRectangle
              , s = this.$target;
            if (-1 != t && -1 != i)
                for (var a = t; i >= a; a++) {
                    var h = s.getVirtualElementAt(a);
                    egret.is(h, e) && h.$includeInLayout && (h.getPreferredBounds(o),
                    n = Math.max(n, o.width),
                    r = Math.max(r, o.height))
                }
            this.maxElementWidth = n,
            this.maxElementHeight = r
        }
        ,
        n.prototype.clearVirtualLayoutCache = function() {
            i.prototype.clearVirtualLayoutCache.call(this),
            this.maxElementWidth = 0,
            this.maxElementHeight = 0
        }
        ,
        n.prototype.scrollPositionChanged = function() {
            if (this.$useVirtualLayout) {
                var t = this.getIndexInView();
                t && (this.indexInViewCalculated = !0,
                this.$target.invalidateDisplayList())
            }
        }
        ,
        n.prototype.getIndexInView = function() {
            if (!this.$target || 0 == this.$target.numElements)
                return this.startIndex = this.endIndex = -1,
                !1;
            var e = this.$target
              , i = e.numElements;
            if (!this.$useVirtualLayout)
                return this.startIndex = 0,
                this.endIndex = i - 1,
                !1;
            var n = e.$UIComponent;
            if (0 == n[10] || 0 == n[11])
                return this.startIndex = this.endIndex = -1,
                !1;
            var r = this.startIndex
              , o = this.endIndex
              , s = this._paddingLeft
              , a = this._paddingTop
              , h = isNaN(this._horizontalGap) ? 0 : this._horizontalGap
              , l = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (this._orientation == t.TileOrientation.COLUMNS) {
                var u = this._columnWidth + h;
                if (0 >= u)
                    return this.startIndex = 0,
                    this.endIndex = i - 1,
                    !1;
                var p = e.scrollH
                  , c = p + n[10]
                  , d = Math.floor((p - s) / u);
                0 > d && (d = 0);
                var f = Math.ceil((c - s) / u);
                0 > f && (f = 0),
                this.startIndex = Math.min(i - 1, Math.max(0, d * this._rowCount)),
                this.endIndex = Math.min(i - 1, Math.max(0, f * this._rowCount - 1))
            } else {
                var y = this._rowHeight + l;
                if (0 >= y)
                    return this.startIndex = 0,
                    this.endIndex = i - 1,
                    !1;
                var g = e.scrollV
                  , v = g + n[11]
                  , m = Math.floor((g - a) / y);
                0 > m && (m = 0);
                var $ = Math.ceil((v - a) / y);
                0 > $ && ($ = 0),
                this.startIndex = Math.min(i - 1, Math.max(0, m * this._columnCount)),
                this.endIndex = Math.min(i - 1, Math.max(0, $ * this._columnCount - 1))
            }
            return this.startIndex != r || this.endIndex != o
        }
        ,
        n.prototype.updateDisplayList = function(n, r) {
            if (i.prototype.updateDisplayList.call(this, n, r),
            this.$target) {
                var o = this.$target
                  , s = this._paddingLeft
                  , a = this._paddingRight
                  , h = this._paddingTop
                  , l = this._paddingBottom;
                if (this.indexInViewCalculated)
                    this.indexInViewCalculated = !1;
                else {
                    if (this.calculateRowAndColumn(n, r),
                    0 == this._rowCount || 0 == this._columnCount)
                        return void o.setContentSize(s + a, h + l);
                    this.adjustForJustify(n, r),
                    this.getIndexInView()
                }
                if (this.$useVirtualLayout && (this.calculateRowAndColumn(n, r),
                this.adjustForJustify(n, r)),
                -1 == this.startIndex || -1 == this.endIndex)
                    return void o.setContentSize(0, 0);
                var u = this.endIndex;
                o.setVirtualElementIndicesInView(this.startIndex, u);
                for (var p, c, d, f, y, g = this._orientation == t.TileOrientation.COLUMNS, v = this.startIndex, m = isNaN(this._horizontalGap) ? 0 : this._horizontalGap, $ = isNaN(this._verticalGap) ? 0 : this._verticalGap, E = this._rowCount, C = this._columnCount, _ = this._columnWidth, S = this._rowHeight, T = this.startIndex; u >= T; T++)
                    if (p = this.$useVirtualLayout ? this.target.getVirtualElementAt(T) : this.target.getElementAt(T),
                    egret.is(p, e) && p.$includeInLayout) {
                        switch (g ? (f = Math.ceil((v + 1) / E) - 1,
                        y = Math.ceil((v + 1) % E) - 1,
                        -1 == y && (y = E - 1)) : (f = Math.ceil((v + 1) % C) - 1,
                        -1 == f && (f = C - 1),
                        y = Math.ceil((v + 1) / C) - 1),
                        this._horizontalAlign) {
                        case egret.HorizontalAlign.RIGHT:
                            c = n - (f + 1) * (_ + m) + m - a;
                            break;
                        case egret.HorizontalAlign.LEFT:
                            c = f * (_ + m) + s;
                            break;
                        default:
                            c = f * (_ + m) + s
                        }
                        switch (this._verticalAlign) {
                        case egret.VerticalAlign.TOP:
                            d = y * (S + $) + h;
                            break;
                        case egret.VerticalAlign.BOTTOM:
                            d = r - (y + 1) * (S + $) + $ - l;
                            break;
                        default:
                            d = y * (S + $) + h
                        }
                        this.sizeAndPositionElement(p, c, d, _, S),
                        v++
                    }
                var P = s + a
                  , b = h + l
                  , x = (_ + m) * C - m
                  , I = (S + $) * E - $;
                o.setContentSize(x + P, I + b)
            }
        }
        ,
        n.prototype.sizeAndPositionElement = function(e, i, n, r, o) {
            var s = 0 / 0
              , a = 0 / 0
              , h = e.$UIComponent;
            this._horizontalAlign == t.JustifyAlign.JUSTIFY ? s = r : isNaN(h[6]) || (s = r * h[6] * .01),
            this._verticalAlign == t.JustifyAlign.JUSTIFY ? a = o : isNaN(h[7]) || (a = o * h[7] * .01),
            e.setLayoutBoundsSize(Math.round(s), Math.round(a));
            var l = i
              , u = egret.$TempRectangle;
            switch (e.getLayoutBounds(u),
            this._horizontalAlign) {
            case egret.HorizontalAlign.RIGHT:
                l += r - u.width;
                break;
            case egret.HorizontalAlign.CENTER:
                l = i + (r - u.width) / 2
            }
            var p = n;
            switch (this._verticalAlign) {
            case egret.VerticalAlign.BOTTOM:
                p += o - u.height;
                break;
            case egret.VerticalAlign.MIDDLE:
                p += (o - u.height) / 2
            }
            e.setLayoutBoundsPosition(Math.round(l), Math.round(p))
        }
        ,
        n.prototype.adjustForJustify = function(e, i) {
            var n = this._paddingLeft
              , r = this._paddingRight
              , o = this._paddingTop
              , s = this._paddingBottom
              , a = Math.max(0, e - n - r)
              , h = Math.max(0, i - o - s);
            isNaN(this.explicitVerticalGap) || (this._verticalGap = this.explicitVerticalGap),
            isNaN(this.explicitHorizontalGap) || (this._horizontalGap = this.explicitHorizontalGap),
            this._verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap,
            this._horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var l, u = h - this._rowHeight * this._rowCount, p = a - this._columnWidth * this._columnCount;
            u > 0 && (this._rowAlign == t.RowAlign.JUSTIFY_USING_GAP ? (l = Math.max(1, this._rowCount - 1),
            this._verticalGap = u / l) : this._rowAlign == t.RowAlign.JUSTIFY_USING_HEIGHT && this._rowCount > 0 && (this._rowHeight += (u - (this._rowCount - 1) * this._verticalGap) / this._rowCount)),
            p > 0 && (this._columnAlign == t.ColumnAlign.JUSTIFY_USING_GAP ? (l = Math.max(1, this._columnCount - 1),
            this._horizontalGap = p / l) : this._columnAlign == t.ColumnAlign.JUSTIFY_USING_WIDTH && this._columnCount > 0 && (this._columnWidth += (p - (this._columnCount - 1) * this._horizontalGap) / this._columnCount))
        }
        ,
        n
    }(t.LayoutBase);
    t.TileLayout = i,
    __reflect(i.prototype, "eui.TileLayout")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t() {}
        return t.ROWS = "rows",
        t.COLUMNS = "columns",
        t
    }();
    t.TileOrientation = e,
    __reflect(e.prototype, "eui.TileOrientation")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = "eui.UIComponent"
      , i = function(i) {
        function n() {
            return null !== i && i.apply(this, arguments) || this
        }
        return __extends(n, i),
        n.prototype.measureReal = function() {
            for (var t = this.$target, i = t.numElements, n = i, r = 0, o = 0, s = egret.$TempRectangle, a = 0; i > a; a++) {
                var h = t.getElementAt(a);
                egret.is(h, e) && h.$includeInLayout ? (h.getPreferredBounds(s),
                o += s.height,
                r = Math.max(r, s.width)) : n--
            }
            o += (n - 1) * this.$gap;
            var l = this.$paddingLeft + this.$paddingRight
              , u = this.$paddingTop + this.$paddingBottom;
            t.setMeasuredSize(r + l, o + u)
        }
        ,
        n.prototype.measureVirtual = function() {
            for (var t = this.$target, i = this.$typicalHeight, n = this.getElementTotalSize(), r = Math.max(this.maxElementSize, this.$typicalWidth), o = egret.$TempRectangle, s = this.endIndex, a = this.elementSizeTable, h = this.startIndex; s > h; h++) {
                var l = t.getElementAt(h);
                egret.is(l, e) && l.$includeInLayout && (l.getPreferredBounds(o),
                n += o.height,
                n -= isNaN(a[h]) ? i : a[h],
                r = Math.max(r, o.width))
            }
            var u = this.$paddingLeft + this.$paddingRight
              , p = this.$paddingTop + this.$paddingBottom;
            t.setMeasuredSize(r + u, n + p)
        }
        ,
        n.prototype.updateDisplayListReal = function(i, n) {
            var r = this.$target
              , o = this.$paddingLeft
              , s = this.$paddingRight
              , a = this.$paddingTop
              , h = this.$paddingBottom
              , l = this.$gap
              , u = Math.max(0, i - o - s)
              , p = Math.max(0, n - a - h)
              , c = this.$verticalAlign == t.JustifyAlign.JUSTIFY
              , d = this.$horizontalAlign == t.JustifyAlign.JUSTIFY || this.$horizontalAlign == t.JustifyAlign.CONTENT_JUSTIFY
              , f = 0;
            d || (this.$horizontalAlign == egret.HorizontalAlign.CENTER ? f = .5 : this.$horizontalAlign == egret.HorizontalAlign.RIGHT && (f = 1));
            var y, g, v, m = r.numElements, $ = m, E = o, C = a, _ = 0, S = 0, T = [], P = p, b = this.maxElementSize, x = egret.$TempRectangle;
            for (y = 0; m > y; y++) {
                var I = r.getElementAt(y);
                if (egret.is(I, e) && I.$includeInLayout)
                    if (I.getPreferredBounds(x),
                    b = Math.max(b, x.width),
                    c)
                        _ += x.height;
                    else {
                        var L = I.$UIComponent;
                        isNaN(L[7]) ? P -= x.height : (S += L[7],
                        v = new t.sys.ChildInfo,
                        v.layoutElement = I,
                        v.percent = L[7],
                        v.min = L[14],
                        v.max = L[15],
                        T.push(v))
                    }
                else
                    $--
            }
            P -= l * ($ - 1),
            P = P > 0 ? P : 0;
            var N, O = p - _ - l * ($ - 1), A = $, M = {};
            if (c) {
                if (0 > O) {
                    for (N = P / $,
                    y = 0; m > y; y++)
                        g = r.getElementAt(y),
                        egret.is(g, e) && g.$includeInLayout && (g.getPreferredBounds(x),
                        x.height <= N && (P -= x.height,
                        A--));
                    P = P > 0 ? P : 0
                }
            } else if (S > 0) {
                this.flexChildrenProportionally(p, P, S, T);
                var B = 0
                  , D = T.length;
                for (y = 0; D > y; y++) {
                    v = T[y];
                    var R = Math.round(v.size + B);
                    B += v.size - R,
                    M[v.layoutElement.$hashCode] = R,
                    P -= R
                }
                P = P > 0 ? P : 0
            }
            this.$verticalAlign == egret.VerticalAlign.MIDDLE ? C = a + .5 * P : this.$verticalAlign == egret.VerticalAlign.BOTTOM && (C = a + P);
            var w = o
              , V = a
              , z = 0
              , H = 0
              , U = Math.ceil(u);
            this.$horizontalAlign == t.JustifyAlign.CONTENT_JUSTIFY && (U = Math.ceil(Math.max(u, b)));
            var k, F, G = 0;
            for (y = 0; m > y; y++) {
                var j = 0;
                if (g = r.getElementAt(y),
                egret.is(g, e) && g.$includeInLayout) {
                    if (g.getPreferredBounds(x),
                    k = 0 / 0,
                    c ? (F = 0 / 0,
                    O > 0 ? F = P * x.height / _ : 0 > O && x.height > N && (F = P / A),
                    isNaN(F) || (k = Math.round(F + G),
                    G += F - k)) : k = M[g.$hashCode],
                    d)
                        E = o,
                        g.setLayoutBoundsSize(U, k),
                        g.getLayoutBounds(x);
                    else {
                        var X = 0 / 0
                          , L = g.$UIComponent;
                        if (!isNaN(L[6])) {
                            var W = Math.min(100, L[6]);
                            X = Math.round(u * W * .01)
                        }
                        g.setLayoutBoundsSize(X, k),
                        g.getLayoutBounds(x),
                        j = (u - x.width) * f,
                        j = j > 0 ? j : 0,
                        E = o + j
                    }
                    g.setLayoutBoundsPosition(Math.round(E), Math.round(C)),
                    z = Math.ceil(x.width),
                    H = Math.ceil(x.height),
                    w = Math.max(w, E + z),
                    V = Math.max(V, C + H),
                    C += H + l
                }
            }
            this.maxElementSize = b,
            r.setContentSize(w + s, V + h)
        }
        ,
        n.prototype.updateDisplayListVirtual = function(i, n) {
            var r = this.$target;
            this.indexInViewCalculated ? this.indexInViewCalculated = !1 : this.getIndexInView();
            var o, s = this.$paddingBottom, a = this.$paddingLeft, h = this.$paddingRight, l = this.$gap, u = r.numElements;
            if (-1 == this.startIndex || -1 == this.endIndex)
                return o = this.getStartPosition(u) - l + s,
                void r.setContentSize(r.contentWidth, o);
            var p = this.endIndex;
            r.setVirtualElementIndicesInView(this.startIndex, p);
            var c = this.$horizontalAlign == t.JustifyAlign.JUSTIFY || this.$horizontalAlign == t.JustifyAlign.CONTENT_JUSTIFY
              , d = this.$horizontalAlign == t.JustifyAlign.CONTENT_JUSTIFY
              , f = 0;
            c || (this.$horizontalAlign == egret.HorizontalAlign.CENTER ? f = .5 : this.$horizontalAlign == egret.HorizontalAlign.RIGHT && (f = 1));
            var y, g = egret.$TempRectangle, v = Math.max(0, i - a - h), m = Math.ceil(v), $ = this.$typicalHeight, E = this.$typicalWidth, C = this.maxElementSize, _ = Math.max(E, this.maxElementSize);
            if (d) {
                for (var S = this.startIndex; p >= S; S++)
                    y = r.getVirtualElementAt(S),
                    egret.is(y, e) && y.$includeInLayout && (y.getPreferredBounds(g),
                    C = Math.max(C, g.width));
                m = Math.ceil(Math.max(v, C))
            }
            for (var T, P = 0, b = 0, x = 0, I = !1, L = this.elementSizeTable, N = this.startIndex; p >= N; N++) {
                var O = 0;
                y = r.getVirtualElementAt(N),
                egret.is(y, e) && y.$includeInLayout && (y.getPreferredBounds(g),
                d || (C = Math.max(C, g.width)),
                c ? (P = a,
                y.setLayoutBoundsSize(m, 0 / 0),
                y.getLayoutBounds(g)) : (y.getLayoutBounds(g),
                O = (v - g.width) * f,
                O = O > 0 ? O : 0,
                P = a + O),
                x = Math.max(x, g.width),
                I || (T = isNaN(L[N]) ? $ : L[N],
                T != g.height && (I = !0)),
                L[N] = g.height,
                b = this.getStartPosition(N),
                y.setLayoutBoundsPosition(Math.round(P), Math.round(b)))
            }
            x += a + h,
            o = this.getStartPosition(u) - l + s,
            this.maxElementSize = C,
            r.setContentSize(x, o),
            (I || _ < this.maxElementSize) && r.invalidateSize()
        }
        ,
        n.prototype.getStartPosition = function(t) {
            if (!this.$useVirtualLayout && this.$target) {
                var e = this.$target.getElementAt(t);
                if (e)
                    return e.y
            }
            for (var i = this.$typicalHeight, n = this.$paddingTop, r = this.$gap, o = this.elementSizeTable, s = 0; t > s; s++) {
                var a = o[s];
                isNaN(a) && (a = i),
                n += a + r
            }
            return n
        }
        ,
        n.prototype.getElementSize = function(t) {
            if (this.$useVirtualLayout) {
                var e = this.elementSizeTable[t];
                return isNaN(e) && (e = this.$typicalHeight),
                e
            }
            return this.$target ? this.$target.getElementAt(t).height : 0
        }
        ,
        n.prototype.getElementTotalSize = function() {
            for (var t = this.$typicalHeight, e = this.$gap, i = 0, n = this.$target.numElements, r = this.elementSizeTable, o = 0; n > o; o++) {
                var s = r[o];
                isNaN(s) && (s = t),
                i += s + e
            }
            return i -= e
        }
        ,
        n.prototype.elementAdded = function(t) {
            this.$useVirtualLayout && (i.prototype.elementAdded.call(this, t),
            this.elementSizeTable.splice(t, 0, this.$typicalHeight))
        }
        ,
        n.prototype.getIndexInView = function() {
            var t = this.$target;
            if (!t || 0 == t.numElements)
                return this.startIndex = this.endIndex = -1,
                !1;
            var e = t.$UIComponent;
            if (0 == e[10] || 0 == e[11])
                return this.startIndex = this.endIndex = -1,
                !1;
            var i = t.numElements
              , n = this.getStartPosition(i - 1) + this.elementSizeTable[i - 1] + this.$paddingBottom
              , r = t.scrollV;
            if (r > n - this.$paddingBottom)
                return this.startIndex = -1,
                this.endIndex = -1,
                !1;
            var o = t.scrollV + e[11];
            if (o < this.$paddingTop)
                return this.startIndex = -1,
                this.endIndex = -1,
                !1;
            var s = this.startIndex
              , a = this.endIndex;
            return this.startIndex = this.findIndexAt(r, 0, i - 1),
            -1 == this.startIndex && (this.startIndex = 0),
            this.endIndex = this.findIndexAt(o, 0, i - 1),
            -1 == this.endIndex && (this.endIndex = i - 1),
            s != this.startIndex || a != this.endIndex
        }
        ,
        n
    }(t.LinearLayoutBase);
    t.VerticalLayout = i,
    __reflect(i.prototype, "eui.VerticalLayout")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        e.prototype.updateDisplayList = function(e, i) {
            t.prototype.updateDisplayList.call(this, e, i);
            var n = this.thumb
              , r = this.$viewport;
            if (n && r) {
                var o = egret.$TempRectangle;
                n.getPreferredBounds(o);
                var s = o.width
                  , a = o.y
                  , h = r.scrollH
                  , l = r.contentWidth
                  , u = r.width;
                if (0 >= h) {
                    var p = s * (1 - -h / (.5 * u));
                    p = Math.max(5, Math.round(p)),
                    n.setLayoutBoundsSize(p, 0 / 0),
                    n.setLayoutBoundsPosition(0, a)
                } else if (h >= l - u) {
                    var p = s * (1 - (h - l + u) / (.5 * u));
                    p = Math.max(5, Math.round(p)),
                    n.setLayoutBoundsSize(p, 0 / 0),
                    n.setLayoutBoundsPosition(e - p, a)
                } else {
                    var c = (e - s) * h / (l - u);
                    n.setLayoutBoundsSize(0 / 0, 0 / 0),
                    n.setLayoutBoundsPosition(c, a)
                }
            }
        }
        ,
        e.prototype.onPropertyChanged = function(t) {
            switch (t.property) {
            case "scrollH":
            case "contentWidth":
                this.invalidateDisplayList()
            }
        }
        ,
        e
    }(t.ScrollBarBase);
    t.HScrollBar = e,
    __reflect(e.prototype, "eui.HScrollBar")
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t(t, e, i, n) {
            this.target = t,
            this.propertyName = e,
            this.position = i,
            this.relativeTo = n
        }
        return t.prototype.apply = function(t, e) {
            var i, n = t[this.relativeTo], r = t[this.target], o = this.propertyName ? t[this.propertyName] : e;
            if (r && o) {
                switch (this.position) {
                case 0:
                    i = 0;
                    break;
                case 1:
                    i = -1;
                    break;
                case 2:
                    i = o.getChildIndex(n);
                    break;
                case 3:
                    i = o.getChildIndex(n) + 1
                }
                -1 == i && (i = o.numChildren),
                egret.is(o, "eui.Component") && o.$Component[8].$elementsContent.push(r),
                o.addChildAt(r, i)
            }
        }
        ,
        t.prototype.remove = function(t, e) {
            var i = this.propertyName ? t[this.propertyName] : e
              , n = t[this.target];
            if (n && i && (n.$parent === i && i.removeChild(n),
            egret.is(i, "eui.Component"))) {
                var r = i.$Component[8].$elementsContent
                  , o = r.indexOf(n);
                o > -1 && r.splice(o, 1)
            }
        }
        ,
        t
    }();
    t.AddItems = e,
    __reflect(e.prototype, "eui.AddItems", ["eui.IOverride"])
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function t(t, e, i) {
            this.target = t,
            this.name = e,
            this.value = i
        }
        return t.prototype.apply = function(t, e) {
            var i = this.target ? t[this.target] : t;
            i && (this.oldValue = i[this.name],
            this.setPropertyValue(i, this.name, this.value, this.oldValue))
        }
        ,
        t.prototype.remove = function(t, e) {
            var i = this.target ? t[this.target] : t;
            i && (this.setPropertyValue(i, this.name, this.oldValue, this.oldValue),
            this.oldValue = null)
        }
        ,
        t.prototype.setPropertyValue = function(t, e, i, n) {
            void 0 === i || null === i ? t[e] = i : "number" == typeof n ? t[e] = +i : "boolean" == typeof n ? t[e] = this.toBoolean(i) : t[e] = i
        }
        ,
        t.prototype.toBoolean = function(t) {
            return "string" == typeof t ? "true" == t.toLowerCase() : 0 != t
        }
        ,
        t
    }();
    t.SetProperty = e,
    __reflect(e.prototype, "eui.SetProperty", ["eui.IOverride"])
}(eui || (eui = {}));
var eui;
!function(t) {
    var e = function() {
        function e(t, e, i, n, r) {
            this.host = t,
            this.templates = e,
            this.chainIndex = i,
            this.target = n,
            this.prop = r
        }
        return e.prototype.apply = function(e, i) {
            if (this.target) {
                var n = this.target[this.prop];
                this.oldValue && this.setPropertyValue(this.target, this.prop, this.oldValue, this.oldValue),
                n && (this.oldValue = n),
                t.Binding.$bindProperties(this.host, this.templates.concat(), this.chainIndex.concat(), this.target, this.prop)
            }
        }
        ,
        e.prototype.remove = function(t, e) {
            if (this.target) {
                var i = this.oldValue;
                this.target[this.prop] && (this.oldValue = this.target[this.prop]),
                i && this.setPropertyValue(this.target, this.prop, i, i)
            }
        }
        ,
        e.prototype.setPropertyValue = function(t, e, i, n) {
            void 0 === i || null === i ? t[e] = i : "number" == typeof n ? t[e] = +i : "boolean" == typeof n ? t[e] = this.toBoolean(i) : t[e] = i
        }
        ,
        e.prototype.toBoolean = function(t) {
            return "string" == typeof t ? "true" == t.toLowerCase() : 0 != t
        }
        ,
        e
    }();
    t.SetStateProperty = e,
    __reflect(e.prototype, "eui.SetStateProperty", ["eui.IOverride"])
}(eui || (eui = {}));
var eui;
!function(t) {
    var e;
    !function(t) {
        function e(t, e, i, n, o, s, a, h, l, u) {
            var p;
            if (!isNaN(i) && isNaN(n)) {
                if (p = r(t, e, i, s, i, h, i, u))
                    return p
            } else if (isNaN(i) && !isNaN(n) && (p = r(t, e, o, n, a, n, l, n)))
                return p;
            return p = r(t, e, o, s, a, h, l, u)
        }
        function i(t, e, i, r, o, s, a, h, l, u) {
            var p;
            if (!isNaN(i) && isNaN(r)) {
                if (p = n(t, e, i, s, i, h, i, u))
                    return p
            } else if (isNaN(i) && !isNaN(r) && (p = n(t, e, o, r, a, r, l, r)))
                return p;
            return p = n(t, e, o, s, a, h, l, u)
        }
        function n(t, e, i, n, r, s, h, l) {
            var u = e.b
              , p = e.d;
            if (u > -1e-9 && 1e-9 > u && (u = 0),
            p > -1e-9 && 1e-9 > p && (p = 0),
            0 == u && 0 == p)
                return null;
            if (0 == u && 0 == p)
                return null;
            if (0 == u)
                return egret.Point.create(i, t / Math.abs(p));
            if (0 == p)
                return egret.Point.create(t / Math.abs(u), n);
            var c, d, f, y = u * p >= 0 ? p : -p;
            if (0 != y && i > 0) {
                var g = 1 / y;
                i = Math.max(r, Math.min(h, i)),
                d = i,
                f = (t - u * d) * g,
                f >= s && l >= f && u * d + y * f >= 0 && (c = egret.Point.create(d, f)),
                f = (-t - u * d) * g,
                f >= s && l >= f && 0 > u * d + y * f && (!c || a(c.x, c.y, e).width > a(d, f, e).width) && (egret.Point.release(c),
                c = egret.Point.create(d, f))
            }
            if (0 != u && n > 0) {
                var v = 1 / u;
                n = Math.max(s, Math.min(l, n)),
                f = n,
                d = (t - y * f) * v,
                d >= r && h >= d && u * d + y * f >= 0 && (!c || a(c.x, c.y, e).width > a(d, f, e).width) && (c = egret.Point.create(d, f)),
                d = (-t - y * f) * v,
                d >= r && h >= d && 0 > u * d + y * f && (!c || a(c.x, c.y, e).width > a(d, f, e).width) && (egret.Point.release(c),
                c = egret.Point.create(d, f))
            }
            if (c)
                return c;
            var m = e.a
              , $ = e.c
              , E = m * $ >= 0 ? $ : -$;
            return o(u, y, t, r, s, h, l, m, E)
        }
        function r(t, e, i, n, r, s, h, l) {
            var u = e.a
              , p = e.c;
            if (u > -1e-9 && 1e-9 > u && (u = 0),
            p > -1e-9 && 1e-9 > p && (p = 0),
            0 == u && 0 == p)
                return null;
            if (0 == u)
                return egret.Point.create(i, t / Math.abs(p));
            if (0 == p)
                return egret.Point.create(t / Math.abs(u), n);
            var c, d, f, y = u * p >= 0 ? p : -p;
            if (0 != y && i > 0) {
                var g = 1 / y;
                i = Math.max(r, Math.min(h, i)),
                d = i,
                f = (t - u * d) * g,
                f >= s && l >= f && u * d + y * f >= 0 && (c = egret.Point.create(d, f)),
                f = (-t - u * d) * g,
                f >= s && l >= f && 0 > u * d + y * f && (!c || a(c.x, c.y, e).height > a(d, f, e).height) && (egret.Point.release(c),
                c = egret.Point.create(d, f))
            }
            if (0 != u && n > 0) {
                var v = 1 / u;
                n = Math.max(s, Math.min(l, n)),
                f = n,
                d = (t - y * f) * v,
                d >= r && h >= d && u * d + y * f >= 0 && (!c || a(c.x, c.y, e).height > a(d, f, e).height) && (egret.Point.release(c),
                c = egret.Point.create(d, f)),
                d = (-t - y * f) * v,
                d >= r && h >= d && 0 > u * d + y * f && (!c || a(c.x, c.y, e).height > a(d, f, e).height) && (egret.Point.release(c),
                c = egret.Point.create(d, f))
            }
            if (c)
                return c;
            var m = e.b
              , $ = e.d
              , E = m * $ >= 0 ? $ : -$;
            return o(u, y, t, r, s, h, l, m, E)
        }
        function o(t, e, i, n, r, o, s, a, h) {
            if (0 == t || 0 == e)
                return null;
            var l, u, p = (i - n * t) / e, c = (i - o * t) / e, d = Math.max(r, Math.min(p, c)), f = Math.min(s, Math.max(p, c)), y = a * e - t * h;
            return f >= d ? (u = Math.abs(y) < 1e-9 ? i / (t + e) : a * i / y,
            u = Math.max(d, Math.min(u, f)),
            l = (i - e * u) / t,
            egret.Point.create(l, u)) : (p = -(n * t + i) / e,
            c = -(o * t + i) / e,
            d = Math.max(r, Math.min(p, c)),
            f = Math.min(s, Math.max(p, c)),
            f >= d ? (u = Math.abs(y) < 1e-9 ? -i / (t + e) : -a * i / y,
            u = Math.max(d, Math.min(u, f)),
            l = (-i - e * u) / t,
            egret.Point.create(l, u)) : null)
        }
        function s(t, e, i, n, r, s, a) {
            var l = i.a
              , u = i.b
              , p = i.c
              , c = i.d;
            if (l > -1e-9 && 1e-9 > l && (l = 0),
            u > -1e-9 && 1e-9 > u && (u = 0),
            p > -1e-9 && 1e-9 > p && (p = 0),
            c > -1e-9 && 1e-9 > c && (c = 0),
            0 == u && 0 == p)
                return 0 == l || 0 == c ? null : egret.Point.create(t / Math.abs(l), e / Math.abs(c));
            if (0 == l && 0 == c)
                return 0 == u || 0 == p ? null : egret.Point.create(e / Math.abs(u), t / Math.abs(p));
            var d = l * p >= 0 ? p : -p
              , f = u * c >= 0 ? c : -c
              , y = l * f - u * d;
            if (Math.abs(y) < 1e-9)
                return 0 == d || 0 == l || l == -d ? null : Math.abs(l * e - u * t) > 1e-9 ? null : o(l, d, t, n, n, s, a, u, f);
            var g = 1 / y;
            t *= g,
            e *= g;
            var v;
            return v = h(l, d, u, f, t, e),
            v && n <= v.x && v.x <= s && r <= v.y && v.y <= a && l * v.x + d * v.x >= 0 && u * v.x + f * v.y >= 0 ? v : (v = h(l, d, u, f, t, -e),
            v && n <= v.x && v.x <= s && r <= v.y && v.y <= a && l * v.x + d * v.x >= 0 && u * v.x + f * v.y < 0 ? v : (v = h(l, d, u, f, -t, e),
            v && n <= v.x && v.x <= s && r <= v.y && v.y <= a && l * v.x + d * v.x < 0 && u * v.x + f * v.y >= 0 ? v : (v = h(l, d, u, f, -t, -e),
            v && n <= v.x && v.x <= s && r <= v.y && v.y <= a && l * v.x + d * v.x < 0 && u * v.x + f * v.y < 0 ? v : (egret.Point.release(v),
            null))))
        }
        function a(t, e, i) {
            var n = egret.$TempRectangle.setTo(0, 0, t, e);
            return i.$transformBounds(n),
            n
        }
        function h(t, e, i, n, r, o) {
            return egret.Point.create(n * r - e * o, t * o - i * r)
        }
        var l = .1
          , u = .1
          , p = function() {
            function t() {}
            return t.fitBounds = function(t, n, r, o, h, p, c, d, f, y, g) {
                if (isNaN(t) && isNaN(n))
                    return egret.Point.create(p, c);
                var v, m = u > d ? 0 : d - u, $ = u > f ? 0 : f - u, E = y + u, C = g + u;
                if (isNaN(t) || isNaN(n))
                    return isNaN(t) ? i(n, r, o, h, p, c, m, $, E, C) : e(t, r, o, h, p, c, m, $, E, C);
                if (v = s(t, n, r, m, $, E, C),
                !v) {
                    var _ = void 0;
                    if (_ = e(t, r, o, h, p, c, m, $, E, C)) {
                        var S = a(_.x, _.y, r).height;
                        S - l > n && (egret.Point.release(_),
                        _ = null)
                    }
                    var T = void 0;
                    if (T = i(n, r, o, h, p, c, m, $, E, C)) {
                        var P = a(T.x, T.y, r).width;
                        P - l > t && (egret.Point.release(T),
                        T = null)
                    }
                    v = _ && T ? _.x * _.y > T.x * T.y ? _ : T : _ ? _ : T,
                    egret.Point.release(_),
                    egret.Point.release(T)
                }
                return v
            }
            ,
            t
        }();
        t.MatrixUtil = p,
        __reflect(p.prototype, "eui.sys.MatrixUtil")
    }(e = t.sys || (t.sys = {}))
}(eui || (eui = {}));

module.exports = eui