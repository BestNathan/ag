var window = {}
var navigator = {
    userAgent: 'asd'
}
function __extends(t, e) {
    function i() {
        this.constructor = t
    }
    for (var r in e)
        e.hasOwnProperty(r) && (t[r] = e[r]);
    i.prototype = e.prototype,
    t.prototype = new i
}
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
        function r() {
            this.constructor = e
        }
        t(e, i),
        e.prototype = null === i ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), __define = this.__define || function(t, e, i, r) {
    Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get: i,
        set: r
    })
}
, egret;
!function(t) {
    t.$hashCount = 1;
    var e = function() {
        function e() {
            this.$hashCode = t.$hashCount++
        }
        return Object.defineProperty(e.prototype, "hashCode", {
            get: function() {
                return this.$hashCode
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }();
    t.HashObject = e,
    __reflect(e.prototype, "egret.HashObject", ["egret.IHashObject"])
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = []
      , i = function(i) {
        function r(t, e, r, n) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === r && (r = 0),
            void 0 === n && (n = 0);
            var o = i.call(this) || this;
            return o.x = t,
            o.y = e,
            o.width = r,
            o.height = n,
            o
        }
        return __extends(r, i),
        r.release = function(t) {
            t && e.push(t)
        }
        ,
        r.create = function() {
            var t = e.pop();
            return t || (t = new r),
            t
        }
        ,
        Object.defineProperty(r.prototype, "right", {
            get: function() {
                return this.x + this.width
            },
            set: function(t) {
                this.width = t - this.x
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "bottom", {
            get: function() {
                return this.y + this.height
            },
            set: function(t) {
                this.height = t - this.y
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "left", {
            get: function() {
                return this.x
            },
            set: function(t) {
                this.width += this.x - t,
                this.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "top", {
            get: function() {
                return this.y
            },
            set: function(t) {
                this.height += this.y - t,
                this.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "topLeft", {
            get: function() {
                return new t.Point(this.left,this.top)
            },
            set: function(t) {
                this.top = t.y,
                this.left = t.x
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "bottomRight", {
            get: function() {
                return new t.Point(this.right,this.bottom)
            },
            set: function(t) {
                this.bottom = t.y,
                this.right = t.x
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.copyFrom = function(t) {
            return this.x = t.x,
            this.y = t.y,
            this.width = t.width,
            this.height = t.height,
            this
        }
        ,
        r.prototype.setTo = function(t, e, i, r) {
            return this.x = t,
            this.y = e,
            this.width = i,
            this.height = r,
            this
        }
        ,
        r.prototype.contains = function(t, e) {
            return this.x <= t && this.x + this.width >= t && this.y <= e && this.y + this.height >= e
        }
        ,
        r.prototype.intersection = function(t) {
            return this.clone().$intersectInPlace(t)
        }
        ,
        r.prototype.inflate = function(t, e) {
            this.x -= t,
            this.width += 2 * t,
            this.y -= e,
            this.height += 2 * e
        }
        ,
        r.prototype.$intersectInPlace = function(t) {
            var e = this.x
              , i = this.y
              , r = t.x
              , n = t.y
              , o = Math.max(e, r)
              , a = Math.min(e + this.width, r + t.width);
            if (a >= o) {
                var s = Math.max(i, n)
                  , h = Math.min(i + this.height, n + t.height);
                if (h >= s)
                    return this.setTo(o, s, a - o, h - s),
                    this
            }
            return this.setEmpty(),
            this
        }
        ,
        r.prototype.intersects = function(t) {
            return Math.max(this.x, t.x) <= Math.min(this.right, t.right) && Math.max(this.y, t.y) <= Math.min(this.bottom, t.bottom)
        }
        ,
        r.prototype.isEmpty = function() {
            return this.width <= 0 || this.height <= 0
        }
        ,
        r.prototype.setEmpty = function() {
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0
        }
        ,
        r.prototype.clone = function() {
            return new r(this.x,this.y,this.width,this.height)
        }
        ,
        r.prototype.containsPoint = function(t) {
            return this.x <= t.x && this.x + this.width > t.x && this.y <= t.y && this.y + this.height > t.y ? !0 : !1
        }
        ,
        r.prototype.containsRect = function(t) {
            var e = t.x + t.width
              , i = t.y + t.height
              , r = this.x + this.width
              , n = this.y + this.height;
            return t.x >= this.x && t.x < r && t.y >= this.y && t.y < n && e > this.x && r >= e && i > this.y && n >= i
        }
        ,
        r.prototype.equals = function(t) {
            return this === t ? !0 : this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height
        }
        ,
        r.prototype.inflatePoint = function(t) {
            this.inflate(t.x, t.y)
        }
        ,
        r.prototype.offset = function(t, e) {
            this.x += t,
            this.y += e
        }
        ,
        r.prototype.offsetPoint = function(t) {
            this.offset(t.x, t.y)
        }
        ,
        r.prototype.toString = function() {
            return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")"
        }
        ,
        r.prototype.union = function(t) {
            var e = this.clone();
            if (t.isEmpty())
                return e;
            if (e.isEmpty())
                return e.copyFrom(t),
                e;
            var i = Math.min(e.x, t.x)
              , r = Math.min(e.y, t.y);
            return e.setTo(i, r, Math.max(e.right, t.right) - i, Math.max(e.bottom, t.bottom) - r),
            e
        }
        ,
        r.prototype.$getBaseWidth = function(t) {
            var e = Math.abs(Math.cos(t))
              , i = Math.abs(Math.sin(t));
            return e * this.width + i * this.height
        }
        ,
        r.prototype.$getBaseHeight = function(t) {
            var e = Math.abs(Math.cos(t))
              , i = Math.abs(Math.sin(t));
            return i * this.width + e * this.height
        }
        ,
        r
    }(t.HashObject);
    t.Rectangle = i,
    __reflect(i.prototype, "egret.Rectangle"),
    t.$TempRectangle = new i
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = []
      , i = function(i) {
        function r(t) {
            void 0 === t && (t = null);
            var e = i.call(this) || this;
            return e.$EventDispatcher = {
                0: t ? t : e,
                1: {},
                2: {},
                3: 0
            },
            e
        }
        return __extends(r, i),
        r.prototype.$getEventMap = function(t) {
            var e = this.$EventDispatcher
              , i = t ? e[2] : e[1];
            return i
        }
        ,
        r.prototype.addEventListener = function(t, e, i, r, n) {
            this.$addListener(t, e, i, r, n)
        }
        ,
        r.prototype.once = function(t, e, i, r, n) {
            this.$addListener(t, e, i, r, n, !0)
        }
        ,
        r.prototype.$addListener = function(t, e, i, r, n, o) {
            var a = this.$EventDispatcher
              , s = r ? a[2] : a[1]
              , h = s[t];
            h ? 0 !== a[3] && (s[t] = h = h.concat()) : h = s[t] = [],
            this.$insertEventBin(h, t, e, i, r, n, o)
        }
        ,
        r.prototype.$insertEventBin = function(t, e, i, r, n, o, a) {
            o = 0 | +o;
            for (var s = -1, h = t.length, l = 0; h > l; l++) {
                var u = t[l];
                if (u.listener == i && u.thisObject == r && u.target == this)
                    return !1;
                -1 == s && u.priority < o && (s = l)
            }
            var c = {
                type: e,
                listener: i,
                thisObject: r,
                priority: o,
                target: this,
                useCapture: n,
                dispatchOnce: !!a
            };
            return -1 !== s ? t.splice(s, 0, c) : t.push(c),
            !0
        }
        ,
        r.prototype.removeEventListener = function(t, e, i, r) {
            var n = this.$EventDispatcher
              , o = r ? n[2] : n[1]
              , a = o[t];
            a && (0 !== n[3] && (o[t] = a = a.concat()),
            this.$removeEventBin(a, e, i),
            0 == a.length && (o[t] = null))
        }
        ,
        r.prototype.$removeEventBin = function(t, e, i) {
            for (var r = t.length, n = 0; r > n; n++) {
                var o = t[n];
                if (o.listener == e && o.thisObject == i && o.target == this)
                    return t.splice(n, 1),
                    !0
            }
            return !1
        }
        ,
        r.prototype.hasEventListener = function(t) {
            var e = this.$EventDispatcher;
            return !(!e[1][t] && !e[2][t])
        }
        ,
        r.prototype.willTrigger = function(t) {
            return this.hasEventListener(t)
        }
        ,
        r.prototype.dispatchEvent = function(t) {
            return t.$currentTarget = this.$EventDispatcher[0],
            t.$setTarget(t.$currentTarget),
            this.$notifyListener(t, !1)
        }
        ,
        r.prototype.$notifyListener = function(t, i) {
            var r = this.$EventDispatcher
              , n = i ? r[2] : r[1]
              , o = n[t.$type];
            if (!o)
                return !0;
            var a = o.length;
            if (0 == a)
                return !0;
            var s = e;
            r[3]++;
            for (var h = 0; a > h; h++) {
                var l = o[h];
                if (l.listener.call(l.thisObject, t),
                l.dispatchOnce && s.push(l),
                t.$isPropagationImmediateStopped)
                    break
            }
            for (r[3]--; s.length; ) {
                var l = s.pop();
                l.target.removeEventListener(l.type, l.listener, l.thisObject, l.useCapture)
            }
            return !t.$isDefaultPrevented
        }
        ,
        r.prototype.dispatchEventWith = function(e, i, r, n) {
            if (i || this.hasEventListener(e)) {
                var o = t.Event.create(t.Event, e, i, n);
                o.data = r;
                var a = this.dispatchEvent(o);
                return t.Event.release(o),
                a
            }
            return !0
        }
        ,
        r
    }(t.HashObject);
    t.EventDispatcher = i,
    __reflect(i.prototype, "egret.EventDispatcher", ["egret.IEventDispatcher"])
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t) {
        return t %= 360,
        t > 180 ? t -= 360 : -180 > t && (t += 360),
        t
    }
    var i = function(i) {
        function r() {
            var e = i.call(this) || this;
            return e.$children = null,
            e.$parent = null,
            e.$stage = null,
            e.$nestLevel = 0,
            e.$visible = !0,
            e.$displayList = null,
            e.$alpha = 1,
            e.$touchEnabled = r.defaultTouchEnabled,
            e.$scrollRect = null,
            e.$blendMode = 0,
            e.$maskedObject = null,
            e.$mask = null,
            e.$maskRect = null,
            e.$parentDisplayList = null,
            e.$renderNode = null,
            e.$displayFlags = 2032,
            e.$DisplayObject = {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 0,
                5: "",
                6: new t.Matrix,
                7: new t.Matrix,
                8: new t.Matrix,
                9: new t.Rectangle,
                10: new t.Rectangle,
                11: !1,
                12: 0,
                13: 0,
                14: 0 / 0,
                15: 0 / 0,
                16: 0,
                17: 0,
                18: 0,
                19: null,
                20: null
            },
            e
        }
        return __extends(r, i),
        r.prototype.$setFlags = function(t) {
            this.$displayFlags |= t
        }
        ,
        r.prototype.$removeFlags = function(t) {
            this.$displayFlags &= ~t
        }
        ,
        r.prototype.$removeFlagsUp = function(t) {
            if (this.$hasAnyFlags(t)) {
                this.$removeFlags(t);
                var e = this.$parent;
                e && e.$removeFlagsUp(t)
            }
        }
        ,
        r.prototype.$hasFlags = function(t) {
            return (this.$displayFlags & t) == t
        }
        ,
        r.prototype.$propagateFlagsUp = function(t) {
            if (!this.$hasFlags(t)) {
                this.$setFlags(t);
                var e = this.$parent;
                e && e.$propagateFlagsUp(t)
            }
        }
        ,
        r.prototype.$propagateFlagsDown = function(t) {
            this.$setFlags(t)
        }
        ,
        r.prototype.$hasAnyFlags = function(t) {
            return !!(this.$displayFlags & t)
        }
        ,
        r.prototype.$invalidateMatrix = function() {
            this.$setFlags(8),
            this.$invalidatePosition()
        }
        ,
        r.prototype.$invalidatePosition = function() {
            var t = this;
            t.$invalidateTransform(),
            t.$propagateFlagsDown(48),
            t.$parent && t.$parent.$propagateFlagsUp(4)
        }
        ,
        Object.defineProperty(r.prototype, "name", {
            get: function() {
                return this.$DisplayObject[5]
            },
            set: function(t) {
                this.$DisplayObject[5] = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "parent", {
            get: function() {
                return this.$parent
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setParent = function(t) {
            return this.$parent == t ? !1 : (this.$parent = t,
            !0)
        }
        ,
        r.prototype.$onAddToStage = function(e, i) {
            this.$stage = e,
            this.$nestLevel = i,
            this.$hasAddToStage = !0,
            t.DisplayObjectContainer.$EVENT_ADD_TO_STAGE_LIST.push(this)
        }
        ,
        r.prototype.$onRemoveFromStage = function() {
            this.$nestLevel = 0,
            t.DisplayObjectContainer.$EVENT_REMOVE_FROM_STAGE_LIST.push(this)
        }
        ,
        Object.defineProperty(r.prototype, "stage", {
            get: function() {
                return this.$stage
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "matrix", {
            get: function() {
                return this.$getMatrix().clone()
            },
            set: function(t) {
                this.$setMatrix(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getMatrix = function() {
            var t = this.$DisplayObject;
            return this.$hasFlags(8) && (t[6].$updateScaleAndRotation(t[0], t[1], t[2], t[3]),
            this.$removeFlags(8)),
            t[6]
        }
        ,
        r.prototype.$setMatrix = function(t, i) {
            void 0 === i && (i = !0);
            var r = this
              , n = r.$DisplayObject
              , o = n[6];
            return o.equals(t) ? !1 : (o.copyFrom(t),
            i && (n[0] = o.$getScaleX(),
            n[1] = o.$getScaleY(),
            n[2] = o.$getSkewX(),
            n[3] = o.$getSkewY(),
            n[16] = e(180 * n[2] / Math.PI),
            n[17] = e(180 * n[3] / Math.PI),
            n[4] = e(180 * n[3] / Math.PI)),
            r.$removeFlags(8),
            r.$invalidatePosition(),
            !0)
        }
        ,
        r.prototype.$getConcatenatedMatrix = function() {
            var e = this.$DisplayObject[7];
            if (this.$hasFlags(16)) {
                this.$parent ? this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), e) : e.copyFrom(this.$getMatrix());
                var i = this.$DisplayObject
                  , r = i[12]
                  , n = i[13]
                  , o = this.$scrollRect;
                o ? e.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -o.x - r, -o.y - n), e) : (0 != r || 0 != n) && e.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -r, -n), e),
                this.$displayList && (this.$displayList.$renderNode.moved = !0),
                this.$renderNode && (this.$renderNode.moved = !0),
                this.$removeFlags(16)
            }
            return e
        }
        ,
        r.prototype.$getInvertedConcatenatedMatrix = function() {
            var t = this.$DisplayObject;
            return this.$hasFlags(32) && (this.$getConcatenatedMatrix().$invertInto(t[8]),
            this.$removeFlags(32)),
            t[8]
        }
        ,
        Object.defineProperty(r.prototype, "x", {
            get: function() {
                return this.$getX()
            },
            set: function(t) {
                this.$setX(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getX = function() {
            return this.$DisplayObject[6].tx
        }
        ,
        r.prototype.$setX = function(t) {
            t = +t || 0;
            var e = this.$DisplayObject[6];
            return t == e.tx ? !1 : (e.tx = t,
            this.$invalidatePosition(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "y", {
            get: function() {
                return this.$getY()
            },
            set: function(t) {
                this.$setY(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getY = function() {
            return this.$DisplayObject[6].ty
        }
        ,
        r.prototype.$setY = function(t) {
            t = +t || 0;
            var e = this.$DisplayObject[6];
            return t == e.ty ? !1 : (e.ty = t,
            this.$invalidatePosition(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "scaleX", {
            get: function() {
                return this.$getScaleX()
            },
            set: function(t) {
                this.$setScaleX(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getScaleX = function() {
            return this.$DisplayObject[0]
        }
        ,
        r.prototype.$setScaleX = function(t) {
            t = +t || 0;
            var e = this.$DisplayObject;
            return t == e[0] ? !1 : (e[0] = t,
            this.$invalidateMatrix(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "scaleY", {
            get: function() {
                return this.$getScaleY()
            },
            set: function(t) {
                this.$setScaleY(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getScaleY = function() {
            return this.$DisplayObject[1]
        }
        ,
        r.prototype.$setScaleY = function(t) {
            return t = +t || 0,
            t == this.$DisplayObject[1] ? !1 : (this.$DisplayObject[1] = t,
            this.$invalidateMatrix(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "rotation", {
            get: function() {
                return this.$getRotation()
            },
            set: function(t) {
                this.$setRotation(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getRotation = function() {
            return this.$DisplayObject[4]
        }
        ,
        r.prototype.$setRotation = function(t) {
            t = +t || 0,
            t = e(t);
            var i = this.$DisplayObject;
            if (t == i[4])
                return !1;
            var r = t - i[4]
              , n = r / 180 * Math.PI;
            return i[2] += n,
            i[3] += n,
            i[4] = t,
            this.$invalidateMatrix(),
            !0
        }
        ,
        Object.defineProperty(r.prototype, "skewX", {
            get: function() {
                return this.$DisplayObject[16]
            },
            set: function(t) {
                this.$setSkewX(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setSkewX = function(t) {
            t = +t || 0;
            var i = this.$DisplayObject;
            return t == i[16] ? !1 : (i[16] = t,
            t = e(t),
            t = t / 180 * Math.PI,
            i[2] = t,
            this.$invalidateMatrix(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "skewY", {
            get: function() {
                return this.$DisplayObject[17]
            },
            set: function(t) {
                this.$setSkewY(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setSkewY = function(t) {
            t = +t || 0;
            var i = this.$DisplayObject;
            return t == i[17] ? !1 : (i[17] = t,
            t = e(t),
            t = t / 180 * Math.PI,
            i[3] = t,
            this.$invalidateMatrix(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "width", {
            get: function() {
                return this.$getWidth()
            },
            set: function(t) {
                this.$setWidth(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getWidth = function() {
            return isNaN(this.$getExplicitWidth()) ? this.$getOriginalBounds().width : this.$getExplicitWidth()
        }
        ,
        r.prototype.$getExplicitWidth = function() {
            return this.$DisplayObject[14]
        }
        ,
        r.prototype.$setWidth = function(t) {
            return this.$DisplayObject[14] = isNaN(t) ? 0 / 0 : t,
            t = +t,
            0 > t ? !1 : (this.$invalidateMatrix(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "height", {
            get: function() {
                return this.$getHeight()
            },
            set: function(t) {
                this.$setHeight(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getHeight = function() {
            return isNaN(this.$getExplicitHeight()) ? this.$getOriginalBounds().height : this.$getExplicitHeight()
        }
        ,
        r.prototype.$getExplicitHeight = function() {
            return this.$DisplayObject[15]
        }
        ,
        r.prototype.$setHeight = function(t) {
            return this.$DisplayObject[15] = isNaN(t) ? 0 / 0 : t,
            t = +t,
            0 > t ? !1 : (this.$invalidateMatrix(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "measuredWidth", {
            get: function() {
                return this.$getOriginalBounds().width
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "measuredHeight", {
            get: function() {
                return this.$getOriginalBounds().height
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "anchorOffsetX", {
            get: function() {
                return this.$DisplayObject[12]
            },
            set: function(t) {
                this.$setAnchorOffsetX(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getAnchorOffsetX = function() {
            return this.$DisplayObject[12]
        }
        ,
        r.prototype.$setAnchorOffsetX = function(t) {
            return t = +t || 0,
            t == this.$DisplayObject[12] ? !1 : (this.$DisplayObject[12] = t,
            this.$invalidatePosition(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "anchorOffsetY", {
            get: function() {
                return this.$DisplayObject[13]
            },
            set: function(t) {
                this.$setAnchorOffsetY(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getAnchorOffsetY = function() {
            return this.$DisplayObject[13]
        }
        ,
        r.prototype.$setAnchorOffsetY = function(t) {
            return t = +t || 0,
            t == this.$DisplayObject[13] ? !1 : (this.$DisplayObject[13] = t,
            this.$invalidatePosition(),
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "visible", {
            get: function() {
                return this.$visible
            },
            set: function(t) {
                this.$setVisible(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setVisible = function(t) {
            return t = !!t,
            t == this.$visible ? !1 : (this.$visible = t,
            this.$propagateFlagsDown(1024),
            this.$invalidateTransform(),
            !0)
        }
        ,
        r.prototype.$getConcatenatedVisible = function() {
            var t = this.$DisplayObject;
            if (this.$hasFlags(1024)) {
                if (this.$parent) {
                    var e = this.$parent.$getConcatenatedVisible();
                    t[19] = e && this.$visible
                } else
                    t[19] = this.$visible;
                this.$removeFlags(1024)
            }
            return t[19]
        }
        ,
        Object.defineProperty(r.prototype, "cacheAsBitmap", {
            get: function() {
                return this.$DisplayObject[11]
            },
            set: function(t) {
                t = !!t,
                this.$DisplayObject[11] = t,
                this.$setHasDisplayList(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setHasDisplayList = function(e) {
            var i = !!this.$displayList;
            if (i != e)
                if (e) {
                    var r = t.sys.DisplayList.create(this);
                    r && (this.$displayList = r,
                    this.$parentDisplayList && this.$parentDisplayList.markDirty(r),
                    this.$cacheAsBitmapChanged())
                } else
                    this.$displayList = null,
                    this.$cacheAsBitmapChanged()
        }
        ,
        r.prototype.$cacheAsBitmapChanged = function() {
            var t = this.$displayList || this.$parentDisplayList;
            this.$renderNode && t && t.markDirty(this),
            this.$propagateFlagsDown(48)
        }
        ,
        Object.defineProperty(r.prototype, "alpha", {
            get: function() {
                return this.$alpha
            },
            set: function(t) {
                this.$setAlpha(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setAlpha = function(t) {
            return t = +t || 0,
            t == this.$alpha ? !1 : (this.$alpha = t,
            this.$propagateFlagsDown(64),
            this.$invalidate(),
            !0)
        }
        ,
        r.prototype.$getConcatenatedAlpha = function() {
            var t = this.$DisplayObject;
            if (this.$hasFlags(64)) {
                if (this.$parent) {
                    var e = this.$parent.$getConcatenatedAlpha();
                    t[18] = e * this.$alpha
                } else
                    t[18] = this.$alpha;
                this.$removeFlags(64)
            }
            return t[18]
        }
        ,
        Object.defineProperty(r.prototype, "touchEnabled", {
            get: function() {
                return this.$getTouchEnabled()
            },
            set: function(t) {
                this.$setTouchEnabled(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getTouchEnabled = function() {
            return this.$touchEnabled
        }
        ,
        r.prototype.$setTouchEnabled = function(t) {
            return this.$touchEnabled == t ? !1 : (this.$touchEnabled = t,
            !0)
        }
        ,
        Object.defineProperty(r.prototype, "scrollRect", {
            get: function() {
                return this.$scrollRect
            },
            set: function(t) {
                this.$setScrollRect(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setScrollRect = function(e) {
            return e || this.$scrollRect ? (e ? (this.$scrollRect || (this.$scrollRect = new t.Rectangle),
            this.$scrollRect.copyFrom(e)) : this.$scrollRect = null,
            this.$invalidatePosition(),
            !0) : !1
        }
        ,
        Object.defineProperty(r.prototype, "blendMode", {
            get: function() {
                return t.sys.numberToBlendMode(this.$blendMode)
            },
            set: function(e) {
                var i = t.sys.blendModeToNumber(e);
                i != this.$blendMode && (this.$blendMode = i,
                this.$invalidateTransform())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "mask", {
            get: function() {
                return this.$mask ? this.$mask : this.$maskRect
            },
            set: function(t) {
                if (t !== this) {
                    if (t)
                        if (t instanceof r) {
                            if (t == this.$mask)
                                return;
                            t.$maskedObject && (t.$maskedObject.mask = null),
                            t.$maskedObject = this,
                            t.$invalidateTransform(),
                            this.$mask = t,
                            this.$maskRect = null
                        } else
                            this.$setMaskRect(t),
                            this.$mask && (this.$mask.$maskedObject = null,
                            this.$mask.$invalidateTransform()),
                            this.$mask = null;
                    else
                        this.$mask && (this.$mask.$maskedObject = null,
                        this.$mask.$invalidateTransform()),
                        this.$mask = null,
                        this.$maskRect = null;
                    this.$invalidateTransform()
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$setMaskRect = function(e) {
            return e || this.$maskRect ? (e ? (this.$maskRect || (this.$maskRect = new t.Rectangle),
            this.$maskRect.copyFrom(e)) : this.$maskRect = null,
            this.$invalidatePosition(),
            !0) : !1
        }
        ,
        Object.defineProperty(r.prototype, "filters", {
            get: function() {
                return this.$DisplayObject[20]
            },
            set: function(t) {
                var e = this.$DisplayObject[20];
                if (!e && !t)
                    return void (this.$DisplayObject[20] = t);
                if (this.$invalidateContentBounds(),
                this.$invalidate(!0),
                e && e.length)
                    for (var i = e.length, r = 0; i > r; r++)
                        e[r].$removeTarget(this);
                if (this.$DisplayObject[20] = t,
                t && t.length)
                    for (var n = t.length, r = 0; n > r; r++)
                        t[r].$addTarget(this)
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.$getFilters = function() {
            return this.$DisplayObject[20]
        }
        ,
        r.prototype.getTransformedBounds = function(t, e) {
            return t = t || this,
            this.$getTransformedBounds(t, e)
        }
        ,
        r.prototype.getBounds = function(t, e) {
            if (void 0 === e && (e = !0),
            t = this.$getTransformedBounds(this, t),
            e) {
                var i = this.$DisplayObject;
                (0 != i[12] || 0 != i[13]) && (t.x -= i[12],
                t.y -= i[13])
            }
            return t
        }
        ,
        r.prototype.$getTransformedBounds = function(e, i) {
            var r = this.$getOriginalBounds();
            if (i || (i = new t.Rectangle),
            i.copyFrom(r),
            e == this)
                return i;
            var n;
            if (e) {
                n = t.$TempMatrix;
                var o = e.$getInvertedConcatenatedMatrix();
                o.$preMultiplyInto(this.$getConcatenatedMatrix(), n)
            } else
                n = this.$getConcatenatedMatrix();
            return n.$transformBounds(i),
            i
        }
        ,
        r.prototype.globalToLocal = function(t, e, i) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0);
            var r = this.$getInvertedConcatenatedMatrix();
            return r.transformPoint(t, e, i)
        }
        ,
        r.prototype.localToGlobal = function(t, e, i) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0);
            var r = this.$getConcatenatedMatrix();
            return r.transformPoint(t, e, i)
        }
        ,
        r.prototype.$invalidateContentBounds = function() {
            this.$invalidate(),
            this.$setFlags(2),
            this.$propagateFlagsUp(4)
        }
        ,
        r.prototype.$getOriginalBounds = function() {
            var t = this.$DisplayObject[9];
            if (this.$hasFlags(4)) {
                t.copyFrom(this.$getContentBounds()),
                this.$measureChildBounds(t),
                this.$removeFlags(4),
                this.$displayList && (this.$displayList.$renderNode.moved = !0);
                var e = this.$measureFiltersOffset(!1);
                e && (t.x += e.minX,
                t.y += e.minY,
                t.width += -e.minX + e.maxX,
                t.height += -e.minY + e.maxY)
            }
            return t
        }
        ,
        r.prototype.$measureChildBounds = function(t) {}
        ,
        r.prototype.$getContentBounds = function() {
            var t = this.$DisplayObject[10];
            return this.$hasFlags(2) && (this.$measureContentBounds(t),
            this.$renderNode && (this.$renderNode.moved = !0),
            this.$removeFlags(2)),
            t
        }
        ,
        r.prototype.$measureContentBounds = function(t) {}
        ,
        r.prototype.$invalidate = function(t) {
            if (this.$renderNode && !this.$hasFlags(384)) {
                this.$setFlags(384);
                var e = this.$displayList ? this.$displayList : this.$parentDisplayList;
                e && e.markDirty(this)
            }
        }
        ,
        r.prototype.$invalidateTransform = function() {
            var t = this;
            if (!t.$hasFlags(512)) {
                t.$setFlags(512);
                var e = t.$displayList;
                (e || t.$renderNode) && t.$parentDisplayList && t.$parentDisplayList.markDirty(e || t)
            }
        }
        ,
        r.prototype.$getRenderNode = function() {
            var t = this.$renderNode;
            return t ? (128 & this.$displayFlags && (t.cleanBeforeRender(),
            this.$render(),
            this.$removeFlags(128),
            t = this.$renderNode),
            t) : null
        }
        ,
        r.prototype.$update = function(e, i) {
            var r = this;
            r.$removeFlagsUp(768);
            var n = r.$renderNode;
            n.renderAlpha = r.$getConcatenatedAlpha();
            var o = r.$getConcatenatedMatrix();
            if (e == t.DirtyRegionPolicy.OFF) {
                var a = r.$displayList || r.$parentDisplayList;
                if (!a)
                    return !1;
                var s = n.renderMatrix;
                s.copyFrom(o);
                var h = a.root;
                h !== r.$stage && r.$getConcatenatedMatrixAt(h, s)
            } else {
                var l = i || r.$getContentBounds();
                n.renderVisible = r.$getConcatenatedVisible();
                var a = r.$displayList || r.$parentDisplayList
                  , u = n.renderRegion;
                if (!a)
                    return u.setTo(0, 0, 0, 0),
                    n.moved = !1,
                    !1;
                if (!n.moved)
                    return !1;
                n.moved = !1;
                var s = n.renderMatrix;
                s.copyFrom(o);
                var h = a.root;
                h !== r.$stage && r.$getConcatenatedMatrixAt(h, s),
                u.updateRegion(l, s);
                var c = r.$measureFiltersOffset(!0);
                c && (u.minX += c.minX,
                u.minY += c.minY,
                u.maxX += c.maxX,
                u.maxY += c.maxY,
                u.updateArea())
            }
            return !0
        }
        ,
        r.prototype.$measureFiltersOffset = function(e) {
            for (var i = this, r = 0, n = 0, o = 0, a = 0; i; ) {
                var s = i.$DisplayObject[20];
                if (s && s.length)
                    for (var h = s.length, l = 0; h > l; l++) {
                        var u = s[l];
                        if ("blur" == u.type) {
                            var c = u.blurX
                              , p = u.blurY;
                            r -= c,
                            n -= p,
                            o += c,
                            a += p
                        } else if ("glow" == u.type) {
                            var c = u.blurX
                              , p = u.blurY;
                            r -= c,
                            n -= p,
                            o += c,
                            a += p;
                            var d = u.distance || 0
                              , f = u.angle || 0
                              , g = 0
                              , y = 0;
                            0 != d && (g = d * t.NumberUtils.cos(f),
                            g = g > 0 ? Math.ceil(g) : Math.floor(g),
                            y = d * t.NumberUtils.sin(f),
                            y = y > 0 ? Math.ceil(y) : Math.floor(y),
                            r += g,
                            o += g,
                            n += y,
                            a += y)
                        } else if ("custom" == u.type) {
                            var v = u.padding;
                            r -= v,
                            n -= v,
                            o += v,
                            a += v
                        }
                    }
                i = e ? i.$parent : null
            }
            return r = Math.min(r, 0),
            n = Math.min(n, 0),
            o = Math.max(o, 0),
            a = Math.max(a, 0),
            {
                minX: r,
                minY: n,
                maxX: o,
                maxY: a
            }
        }
        ,
        r.prototype.$getConcatenatedMatrixAt = function(e, i) {
            var r = e.$getInvertedConcatenatedMatrix();
            if (0 === r.a || 0 === r.d) {
                var n = this
                  , o = e.$nestLevel;
                for (i.identity(); n.$nestLevel > o; ) {
                    var a = n.$scrollRect;
                    a && i.concat(t.$TempMatrix.setTo(1, 0, 0, 1, -a.x, -a.y)),
                    i.concat(n.$getMatrix()),
                    n = n.$parent
                }
            } else
                r.$preMultiplyInto(i, i)
        }
        ,
        r.prototype.$getConcatenatedAlphaAt = function(t, e) {
            var i = t.$getConcatenatedAlpha();
            if (0 === i) {
                e = 1;
                for (var r = this, n = t.$nestLevel; r.$nestLevel > n; )
                    e *= r.$alpha,
                    r = r.$parent
            } else
                e /= i;
            return e
        }
        ,
        r.prototype.$render = function() {}
        ,
        r.prototype.$hitTest = function(t, e) {
            var i = this.$DisplayObject;
            if (!this.$renderNode || !this.$visible || 0 == i[0] || 0 == i[1])
                return null;
            var r = this.$getInvertedConcatenatedMatrix();
            if (0 == r.a && 0 == r.b && 0 == r.c && 0 == r.d)
                return null;
            var n = this.$getContentBounds()
              , o = r.a * t + r.c * e + r.tx
              , a = r.b * t + r.d * e + r.ty;
            if (n.contains(o, a)) {
                if (!this.$children) {
                    var s = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                    if (s && !s.contains(o, a))
                        return null;
                    if (this.$mask && !this.$mask.$hitTest(t, e))
                        return null
                }
                return this
            }
            return null
        }
        ,
        r.prototype.hitTestPoint = function(e, i, r) {
            if (r) {
                var n = this.$getInvertedConcatenatedMatrix()
                  , o = n.a * e + n.c * i + n.tx
                  , a = n.b * e + n.d * i + n.ty
                  , s = void 0
                  , h = this.$displayList;
                if (h) {
                    var l = h.renderBuffer;
                    try {
                        s = l.getPixels(o - h.offsetX, a - h.offsetY)
                    } catch (u) {
                        throw new Error(t.sys.tr(1039))
                    }
                } else {
                    var l = t.sys.customHitTestBuffer;
                    l.resize(3, 3);
                    var c = t.Matrix.create();
                    c.identity(),
                    c.translate(1 - o, 1 - a),
                    t.sys.systemRenderer.render(this, l, c, null, !0),
                    t.Matrix.release(c);
                    try {
                        s = l.getPixels(1, 1)
                    } catch (u) {
                        throw new Error(t.sys.tr(1039))
                    }
                }
                return 0 === s[3] ? !1 : !0
            }
            var p = this.$DisplayObject;
            if (0 == p[0] || 0 == p[1])
                return !1;
            var n = this.$getInvertedConcatenatedMatrix()
              , d = this.getBounds(null, !1)
              , o = n.a * e + n.c * i + n.tx
              , a = n.b * e + n.d * i + n.ty;
            if (d.contains(o, a)) {
                var f = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                return f && !f.contains(o, a) ? !1 : !0
            }
            return !1
        }
        ,
        r.prototype.$addListener = function(e, n, o, a, s, h) {
            i.prototype.$addListener.call(this, e, n, o, a, s, h);
            var l = e == t.Event.ENTER_FRAME;
            if (l || e == t.Event.RENDER) {
                var u = l ? r.$enterFrameCallBackList : r.$renderCallBackList;
                -1 == u.indexOf(this) && u.push(this)
            }
        }
        ,
        r.prototype.removeEventListener = function(e, n, o, a) {
            i.prototype.removeEventListener.call(this, e, n, o, a);
            var s = e == t.Event.ENTER_FRAME;
            if ((s || e == t.Event.RENDER) && !this.hasEventListener(e)) {
                var h = s ? r.$enterFrameCallBackList : r.$renderCallBackList
                  , l = h.indexOf(this);
                -1 !== l && h.splice(l, 1)
            }
        }
        ,
        r.prototype.dispatchEvent = function(t) {
            if (!t.$bubbles)
                return i.prototype.dispatchEvent.call(this, t);
            var e = this.$getPropagationList(this)
              , r = .5 * e.length;
            return t.$setTarget(this),
            this.$dispatchPropagationEvent(t, e, r),
            !t.$isDefaultPrevented
        }
        ,
        r.prototype.$getPropagationList = function(t) {
            for (var e = []; t; )
                e.push(t),
                t = t.$parent;
            var i = e.concat();
            return i.reverse(),
            e = i.concat(e)
        }
        ,
        r.prototype.$dispatchPropagationEvent = function(t, e, i) {
            for (var r = e.length, n = i - 1, o = 0; r > o; o++) {
                var a = e[o];
                if (t.$currentTarget = a,
                n > o ? t.$eventPhase = 1 : o == i || o == n ? t.$eventPhase = 2 : t.$eventPhase = 3,
                a.$notifyListener(t, i > o),
                t.$isPropagationStopped || t.$isPropagationImmediateStopped)
                    return
            }
        }
        ,
        r.prototype.willTrigger = function(t) {
            for (var e = this; e; ) {
                if (e.hasEventListener(t))
                    return !0;
                e = e.$parent
            }
            return !1
        }
        ,
        r.defaultTouchEnabled = !1,
        r.boundsForUpdate = new t.Rectangle,
        r.$enterFrameCallBackList = [],
        r.$renderCallBackList = [],
        r
    }(t.EventDispatcher);
    t.DisplayObject = i,
    __reflect(i.prototype, "egret.DisplayObject", ["egret.sys.Renderable"])
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.$touchChildren = !0,
            t.$children = [],
            t
        }
        return __extends(i, e),
        i.prototype.$propagateFlagsDown = function(t) {
            if (!this.$hasFlags(t)) {
                this.$setFlags(t);
                for (var e = this.$children, i = e.length, r = 0; i > r; r++)
                    e[r].$propagateFlagsDown(t)
            }
        }
        ,
        Object.defineProperty(i.prototype, "numChildren", {
            get: function() {
                return this.$children.length
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.addChild = function(t) {
            var e = this.$children.length;
            return t.$parent == this && e--,
            this.$doAddChild(t, e)
        }
        ,
        i.prototype.addChildAt = function(t, e) {
            return e = 0 | +e,
            (0 > e || e >= this.$children.length) && (e = this.$children.length,
            t.$parent == this && e--),
            this.$doAddChild(t, e)
        }
        ,
        i.prototype.$doAddChild = function(e, r, n) {
            void 0 === n && (n = !0);
            var o = e.$parent;
            if (o == this)
                return this.doSetChildIndex(e, r),
                e;
            o && o.removeChild(e),
            this.$children.splice(r, 0, e),
            e.$setParent(this);
            var a = this.$stage;
            if (a && e.$onAddToStage(a, this.$nestLevel + 1),
            n && e.dispatchEventWith(t.Event.ADDED, !0),
            a)
                for (var s = i.$EVENT_ADD_TO_STAGE_LIST; s.length; ) {
                    var h = s.shift();
                    h.$stage && n && h.dispatchEventWith(t.Event.ADDED_TO_STAGE)
                }
            var l = this.$displayList || this.$parentDisplayList;
            return this.assignParentDisplayList(e, l, l),
            e.$propagateFlagsDown(1648),
            this.$propagateFlagsUp(4),
            this.$childAdded(e, r),
            e
        }
        ,
        i.prototype.contains = function(t) {
            for (; t; ) {
                if (t == this)
                    return !0;
                t = t.$parent
            }
            return !1
        }
        ,
        i.prototype.getChildAt = function(t) {
            return t = 0 | +t,
            t >= 0 && t < this.$children.length ? this.$children[t] : null
        }
        ,
        i.prototype.getChildIndex = function(t) {
            return this.$children.indexOf(t)
        }
        ,
        i.prototype.getChildByName = function(t) {
            for (var e, i = this.$children, r = i.length, n = 0; r > n; n++)
                if (e = i[n],
                e.name == t)
                    return e;
            return null
        }
        ,
        i.prototype.removeChild = function(t) {
            var e = this.$children.indexOf(t);
            return e >= 0 ? this.$doRemoveChild(e) : null
        }
        ,
        i.prototype.removeChildAt = function(t) {
            return t = 0 | +t,
            t >= 0 && t < this.$children.length ? this.$doRemoveChild(t) : null
        }
        ,
        i.prototype.$doRemoveChild = function(e, r) {
            void 0 === r && (r = !0),
            e = 0 | +e;
            var n = this.$children
              , o = n[e];
            if (this.$childRemoved(o, e),
            r && o.dispatchEventWith(t.Event.REMOVED, !0),
            this.$stage) {
                o.$onRemoveFromStage();
                for (var a = i.$EVENT_REMOVE_FROM_STAGE_LIST; a.length > 0; ) {
                    var s = a.shift();
                    r && s.$hasAddToStage && (s.$hasAddToStage = !1,
                    s.dispatchEventWith(t.Event.REMOVED_FROM_STAGE)),
                    s.$hasAddToStage = !1,
                    s.$stage = null
                }
            }
            var h = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(o, h, null),
            o.$propagateFlagsDown(1648),
            o.$setParent(null);
            var l = n.indexOf(o);
            return -1 != l && n.splice(l, 1),
            this.$propagateFlagsUp(4),
            o
        }
        ,
        i.prototype.setChildIndex = function(t, e) {
            e = 0 | +e,
            (0 > e || e >= this.$children.length) && (e = this.$children.length - 1),
            this.doSetChildIndex(t, e)
        }
        ,
        i.prototype.doSetChildIndex = function(t, e) {
            var i = this.$children.indexOf(t);
            i != e && (this.$childRemoved(t, i),
            this.$children.splice(i, 1),
            this.$children.splice(e, 0, t),
            this.$childAdded(t, e),
            t.$invalidateTransform(),
            this.$propagateFlagsUp(4))
        }
        ,
        i.prototype.swapChildrenAt = function(t, e) {
            t = 0 | +t,
            e = 0 | +e,
            t >= 0 && t < this.$children.length && e >= 0 && e < this.$children.length && this.doSwapChildrenAt(t, e)
        }
        ,
        i.prototype.swapChildren = function(t, e) {
            var i = this.$children.indexOf(t)
              , r = this.$children.indexOf(e);
            -1 == i || -1 == r || this.doSwapChildrenAt(i, r)
        }
        ,
        i.prototype.doSwapChildrenAt = function(t, e) {
            if (t > e) {
                var i = e;
                e = t,
                t = i
            } else if (t == e)
                return;
            var r = this.$children
              , n = r[t]
              , o = r[e];
            this.$childRemoved(n, t),
            this.$childRemoved(o, e),
            r[t] = o,
            r[e] = n,
            this.$childAdded(o, t),
            this.$childAdded(n, e),
            n.$invalidateTransform(),
            o.$invalidateTransform(),
            this.$propagateFlagsUp(4)
        }
        ,
        i.prototype.removeChildren = function() {
            for (var t = this.$children, e = t.length - 1; e >= 0; e--)
                this.$doRemoveChild(e)
        }
        ,
        i.prototype.$childAdded = function(t, e) {}
        ,
        i.prototype.$childRemoved = function(t, e) {}
        ,
        i.prototype.$onAddToStage = function(t, i) {
            e.prototype.$onAddToStage.call(this, t, i);
            var r = this.$children
              , n = r.length;
            i++;
            for (var o = 0; n > o; o++) {
                var a = this.$children[o];
                a.$onAddToStage(t, i)
            }
        }
        ,
        i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this);
            for (var t = this.$children, i = t.length, r = 0; i > r; r++) {
                var n = t[r];
                n.$onRemoveFromStage()
            }
        }
        ,
        i.prototype.$measureChildBounds = function(e) {
            var i = this.$children
              , r = i.length;
            if (0 != r) {
                for (var n = 0, o = 0, a = 0, s = 0, h = !1, l = -1; r > l; l++) {
                    var u = -1 == l ? e : i[l].$getTransformedBounds(this, t.$TempRectangle);
                    u.isEmpty() || (h ? (n = Math.min(n, u.x),
                    o = Math.max(o, u.x + u.width),
                    a = Math.min(a, u.y),
                    s = Math.max(s, u.y + u.height)) : (h = !0,
                    n = u.x,
                    o = n + u.width,
                    a = u.y,
                    s = a + u.height))
                }
                e.setTo(n, a, o - n, s - a)
            }
        }
        ,
        Object.defineProperty(i.prototype, "touchChildren", {
            get: function() {
                return this.$getTouchChildren()
            },
            set: function(t) {
                this.$setTouchChildren(!!t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$getTouchChildren = function() {
            return this.$touchChildren
        }
        ,
        i.prototype.$setTouchChildren = function(t) {
            return this.$touchChildren == t ? !1 : (this.$touchChildren = t,
            !0)
        }
        ,
        i.prototype.$invalidate = function(t) {
            if (e.prototype.$invalidate.call(this, t),
            t) {
                var i = this.$displayList || this.$parentDisplayList
                  , r = this.$children;
                if (r)
                    for (var n = r.length - 1; n >= 0; n--)
                        this.markChildDirty(r[n], i)
            }
        }
        ,
        i.prototype.$invalidateTransform = function() {
            this.markChildDirty(this, this.$parentDisplayList)
        }
        ,
        i.prototype.markChildDirty = function(t, e) {
            if (!t.$hasFlags(512)) {
                t.$setFlags(512);
                var i = t.$displayList;
                if ((i || t.$renderNode) && e && e.markDirty(i || t),
                !i) {
                    var r = t.$children;
                    if (r)
                        for (var n = r.length - 1; n >= 0; n--)
                            this.markChildDirty(r[n], e)
                }
            }
        }
        ,
        i.prototype.$cacheAsBitmapChanged = function() {
            e.prototype.$cacheAsBitmapChanged.call(this);
            for (var t = this.$displayList || this.$parentDisplayList, i = this.$children, r = i.length - 1; r >= 0; r--)
                this.assignParentDisplayList(i[r], t, t)
        }
        ,
        i.prototype.assignParentDisplayList = function(t, e, i) {
            t.$parentDisplayList = i,
            t.$setFlags(512);
            var r = t.$displayList;
            if ((t.$renderNode || r) && e && e.markDirty(r || t),
            !r) {
                var n = t.$children;
                if (n)
                    for (var o = n.length - 1; o >= 0; o--)
                        this.assignParentDisplayList(n[o], e, i)
            }
        }
        ,
        i.prototype.$hitTest = function(t, i) {
            if (!this.$visible)
                return null;
            var r = this.$getInvertedConcatenatedMatrix()
              , n = r.a * t + r.c * i + r.tx
              , o = r.b * t + r.d * i + r.ty
              , a = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (a && !a.contains(n, o))
                return null;
            if (this.$mask && !this.$mask.$hitTest(t, i))
                return null;
            for (var s = this.$children, h = !1, l = null, u = s.length - 1; u >= 0; u--) {
                var c = s[u];
                if (!c.$maskedObject && (l = c.$hitTest(t, i))) {
                    if (h = !0,
                    l.$touchEnabled)
                        break;
                    l = null
                }
            }
            return l ? this.$touchChildren ? l : this : h ? this : e.prototype.$hitTest.call(this, t, i)
        }
        ,
        i.prototype.$setAlpha = function(t) {
            return t = +t || 0,
            t == this.$alpha ? !1 : (this.$alpha = t,
            this.$propagateFlagsDown(64),
            this.$invalidate(),
            this.$invalidateAllChildren(),
            !0)
        }
        ,
        i.prototype.$invalidateAllChildren = function() {
            var t = this.$children;
            if (t)
                for (var e = t.length - 1; e >= 0; e--) {
                    var i = t[e];
                    i.$invalidate(),
                    i.$children && i.$invalidateAllChildren()
                }
        }
        ,
        i.$EVENT_ADD_TO_STAGE_LIST = [],
        i.$EVENT_REMOVE_FROM_STAGE_LIST = [],
        i
    }(t.DisplayObject);
    t.DisplayObjectContainer = e,
    __reflect(e.prototype, "egret.DisplayObjectContainer")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.type = null,
            e.$targets = [],
            e.$uniforms = {},
            e
        }
        return __extends(e, t),
        e.prototype.$addTarget = function(t) {
            for (var e = this.$targets.length, i = 0; e > i; i++)
                if (this.$targets[i].$hashCode == t.$hashCode)
                    return;
            this.$targets.push(t)
        }
        ,
        e.prototype.$removeTarget = function(t) {
            for (var e = this.$targets.length, i = 0; e > i; i++)
                if (this.$targets[i].$hashCode == t.$hashCode)
                    return void this.$targets.splice(i, 1)
        }
        ,
        e.prototype.invalidate = function() {
            for (var t = this.$targets.length, e = 0; t > e; e++)
                this.$targets[e].$invalidateContentBounds()
        }
        ,
        e.prototype.$toJson = function() {
            return ""
        }
        ,
        e
    }(t.HashObject);
    t.Filter = e,
    __reflect(e.prototype, "egret.Filter")
}(egret || (egret = {}));
var egret;
!function(t) {
    t.$locale_strings = t.$locale_strings || {},
    t.$language = "en_US"
}(egret || (egret = {})),
function(t) {
    var e;
    !function(e) {
        function i(e) {
            for (var i = [], r = 1; r < arguments.length; r++)
                i[r - 1] = arguments[r];
            var n = t.$locale_strings[t.$language][e];
            if (!n)
                return "{" + e + "}";
            for (var o = i.length, a = 0; o > a; a++)
                n = n.replace("{" + a + "}", i[a]);
            return n
        }
        e.tr = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e, i, r, n) {
            var o = t.call(this) || this;
            return o.$eventPhase = 2,
            o.$currentTarget = null,
            o.$target = null,
            o.$isDefaultPrevented = !1,
            o.$isPropagationStopped = !1,
            o.$isPropagationImmediateStopped = !1,
            o.$type = e,
            o.$bubbles = !!i,
            o.$cancelable = !!r,
            o.data = n,
            o
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this.$type
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "bubbles", {
            get: function() {
                return this.$bubbles
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "cancelable", {
            get: function() {
                return this.$cancelable
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "eventPhase", {
            get: function() {
                return this.$eventPhase
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "currentTarget", {
            get: function() {
                return this.$currentTarget
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "target", {
            get: function() {
                return this.$target
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.$setTarget = function(t) {
            return this.$target = t,
            !0
        }
        ,
        e.prototype.isDefaultPrevented = function() {
            return this.$isDefaultPrevented
        }
        ,
        e.prototype.preventDefault = function() {
            this.$cancelable && (this.$isDefaultPrevented = !0)
        }
        ,
        e.prototype.stopPropagation = function() {
            this.$bubbles && (this.$isPropagationStopped = !0)
        }
        ,
        e.prototype.stopImmediatePropagation = function() {
            this.$bubbles && (this.$isPropagationImmediateStopped = !0)
        }
        ,
        e.prototype.clean = function() {
            this.data = this.$currentTarget = null,
            this.$setTarget(null)
        }
        ,
        e.dispatchEvent = function(t, i, r, n) {
            void 0 === r && (r = !1);
            var o = e.create(e, i, r)
              , a = e._getPropertyData(e);
            void 0 != n && (a.data = n);
            var s = t.dispatchEvent(o);
            return e.release(o),
            s
        }
        ,
        e._getPropertyData = function(t) {
            var e = t._props;
            return e || (e = t._props = {}),
            e
        }
        ,
        e.create = function(t, e, i, r) {
            var n = t.eventPool;
            if (n || (n = t.eventPool = []),
            n.length) {
                var o = n.pop();
                return o.$type = e,
                o.$bubbles = !!i,
                o.$cancelable = !!r,
                o.$isDefaultPrevented = !1,
                o.$isPropagationStopped = !1,
                o.$isPropagationImmediateStopped = !1,
                o.$eventPhase = 2,
                o
            }
            return new t(e,i,r)
        }
        ,
        e.release = function(t) {
            t.clean();
            var e = Object.getPrototypeOf(t).constructor;
            e.eventPool.push(t)
        }
        ,
        e.ADDED_TO_STAGE = "addedToStage",
        e.REMOVED_FROM_STAGE = "removedFromStage",
        e.ADDED = "added",
        e.REMOVED = "removed",
        e.ENTER_FRAME = "enterFrame",
        e.RENDER = "render",
        e.RESIZE = "resize",
        e.CHANGE = "change",
        e.CHANGING = "changing",
        e.COMPLETE = "complete",
        e.LOOP_COMPLETE = "loopComplete",
        e.FOCUS_IN = "focusIn",
        e.FOCUS_OUT = "focusOut",
        e.ENDED = "ended",
        e.ACTIVATE = "activate",
        e.DEACTIVATE = "deactivate",
        e.CLOSE = "close",
        e.CONNECT = "connect",
        e.LEAVE_STAGE = "leaveStage",
        e.SOUND_COMPLETE = "soundComplete",
        e
    }(t.HashObject);
    t.Event = e,
    __reflect(e.prototype, "egret.Event")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = []
      , i = Math.PI / 180
      , r = function(r) {
        function n(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0);
            var i = r.call(this) || this;
            return i.x = t,
            i.y = e,
            i
        }
        return __extends(n, r),
        n.release = function(t) {
            t && e.push(t)
        }
        ,
        n.create = function(t, i) {
            var r = e.pop();
            return r || (r = new n),
            r.setTo(t, i)
        }
        ,
        Object.defineProperty(n.prototype, "length", {
            get: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.setTo = function(t, e) {
            return this.x = t,
            this.y = e,
            this
        }
        ,
        n.prototype.clone = function() {
            return new n(this.x,this.y)
        }
        ,
        n.prototype.equals = function(t) {
            return this.x == t.x && this.y == t.y
        }
        ,
        n.distance = function(t, e) {
            return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
        }
        ,
        n.prototype.copyFrom = function(t) {
            this.x = t.x,
            this.y = t.y
        }
        ,
        n.prototype.add = function(t) {
            return new n(this.x + t.x,this.y + t.y)
        }
        ,
        n.interpolate = function(t, e, i) {
            var r = 1 - i;
            return new n(t.x * i + e.x * r,t.y * i + e.y * r)
        }
        ,
        n.prototype.normalize = function(t) {
            if (0 != this.x || 0 != this.y) {
                var e = t / this.length;
                this.x *= e,
                this.y *= e
            }
        }
        ,
        n.prototype.offset = function(t, e) {
            this.x += t,
            this.y += e
        }
        ,
        n.polar = function(e, r) {
            return new n(e * t.NumberUtils.cos(r / i),e * t.NumberUtils.sin(r / i))
        }
        ,
        n.prototype.subtract = function(t) {
            return new n(this.x - t.x,this.y - t.y)
        }
        ,
        n.prototype.toString = function() {
            return "(x=" + this.x + ", y=" + this.y + ")"
        }
        ,
        n
    }(t.HashObject);
    t.Point = r,
    __reflect(r.prototype, "egret.Point"),
    t.$TempPoint = new r
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(i) {
            var r = e.call(this) || this;
            return r._bitmapX = 0,
            r._bitmapY = 0,
            r._textureMap = t.createMap(),
            r.$texture = i,
            r._bitmapX = i._bitmapX - i._offsetX,
            r._bitmapY = i._bitmapY - i._offsetY,
            r
        }
        return __extends(i, e),
        i.prototype.getTexture = function(t) {
            return this._textureMap[t]
        }
        ,
        i.prototype.createTexture = function(e, i, r, n, o, a, s, h, l) {
            void 0 === a && (a = 0),
            void 0 === s && (s = 0),
            void 0 === h && (h = a + n),
            void 0 === l && (l = s + o);
            var u = new t.Texture;
            return u._bitmapData = this.$texture._bitmapData,
            u.$initData(this._bitmapX + i, this._bitmapY + r, n, o, a, s, h, l, this.$texture._sourceWidth, this.$texture._sourceHeight),
            this._textureMap[e] = u,
            u
        }
        ,
        i.prototype.dispose = function() {
            this.$texture && this.$texture.dispose()
        }
        ,
        i
    }(t.HashObject);
    t.SpriteSheet = e,
    __reflect(e.prototype, "egret.SpriteSheet")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e, i, r, n, o, a, s, h) {
            void 0 === e && (e = 16711680),
            void 0 === i && (i = 1),
            void 0 === r && (r = 6),
            void 0 === n && (n = 6),
            void 0 === o && (o = 2),
            void 0 === a && (a = 1),
            void 0 === s && (s = !1),
            void 0 === h && (h = !1);
            var l = t.call(this) || this;
            return l.type = "glow",
            l.$color = e,
            l.$blue = 255 & e,
            l.$green = (65280 & e) >> 8,
            l.$red = e >> 16,
            l.$alpha = i,
            l.$blurX = r,
            l.$blurY = n,
            l.$strength = o,
            l.$quality = a,
            l.$inner = s,
            l.$knockout = h,
            l.$uniforms.color = {
                x: l.$red / 255,
                y: l.$green / 255,
                z: l.$blue / 255,
                w: 1
            },
            l.$uniforms.alpha = i,
            l.$uniforms.blurX = r,
            l.$uniforms.blurY = n,
            l.$uniforms.strength = o,
            l.$uniforms.inner = s ? 1 : 0,
            l.$uniforms.knockout = h ? 0 : 1,
            l
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "color", {
            get: function() {
                return this.$color
            },
            set: function(t) {
                this.$color != t && (this.$color = t,
                this.$blue = 255 & t,
                this.$green = (65280 & t) >> 8,
                this.$red = t >> 16,
                this.$uniforms.color.x = this.$red / 255,
                this.$uniforms.color.y = this.$green / 255,
                this.$uniforms.color.z = this.$blue / 255,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "alpha", {
            get: function() {
                return this.$alpha
            },
            set: function(t) {
                this.$alpha != t && (this.$alpha = t,
                this.$uniforms.alpha = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "blurX", {
            get: function() {
                return this.$blurX
            },
            set: function(t) {
                this.$blurX != t && (this.$blurX = t,
                this.$uniforms.blurX = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "blurY", {
            get: function() {
                return this.$blurY
            },
            set: function(t) {
                this.$blurY != t && (this.$blurY = t,
                this.$uniforms.blurY = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "strength", {
            get: function() {
                return this.$strength
            },
            set: function(t) {
                this.$strength != t && (this.$strength = t,
                this.$uniforms.strength = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "quality", {
            get: function() {
                return this.$quality
            },
            set: function(t) {
                this.$quality != t && (this.$quality = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "inner", {
            get: function() {
                return this.$inner
            },
            set: function(t) {
                this.$inner != t && (this.$inner = t,
                this.$uniforms.inner = t ? 1 : 0,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "knockout", {
            get: function() {
                return this.$knockout
            },
            set: function(t) {
                this.$knockout != t && (this.$knockout = t,
                this.$uniforms.knockout = t ? 0 : 1,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.$toJson = function() {
            return '{"color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + "}"
        }
        ,
        e
    }(t.Filter);
    t.GlowFilter = e,
    __reflect(e.prototype, "egret.GlowFilter")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$graphics = new t.Graphics,
            i.$graphics.$setTarget(i),
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "graphics", {
            get: function() {
                return this.$graphics
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$hitTest = function(e, i) {
            if (!this.$visible)
                return null;
            var r = this.$getInvertedConcatenatedMatrix()
              , n = r.a * e + r.c * i + r.tx
              , o = r.b * e + r.d * i + r.ty
              , a = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (a && !a.contains(n, o))
                return null;
            if (this.$mask && !this.$mask.$hitTest(e, i))
                return null;
            for (var s = this.$children, h = !1, l = null, u = s.length - 1; u >= 0; u--) {
                var c = s[u];
                if (!c.$maskedObject && (l = c.$hitTest(e, i))) {
                    if (h = !0,
                    l.$touchEnabled)
                        break;
                    l = null
                }
            }
            return l ? this.$touchChildren ? l : this : h ? this : (l = t.DisplayObject.prototype.$hitTest.call(this, e, i),
            l && (l = this.$graphics.$hitTest(e, i)),
            l)
        }
        ,
        i.prototype.$measureContentBounds = function(t) {
            this.$graphics.$measureContentBounds(t)
        }
        ,
        i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this),
            this.$graphics && this.$graphics.$onRemoveFromStage()
        }
        ,
        i
    }(t.DisplayObjectContainer);
    t.Sprite = e,
    __reflect(e.prototype, "egret.Sprite")
}(egret || (egret = {}));
var egret;
!function(t) {
    t.$TextureScaleFactor = 1;
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t._bitmapX = 0,
            t._bitmapY = 0,
            t._bitmapWidth = 0,
            t._bitmapHeight = 0,
            t._offsetX = 0,
            t._offsetY = 0,
            t._textureWidth = 0,
            t._textureHeight = 0,
            t._sourceWidth = 0,
            t._sourceHeight = 0,
            t._bitmapData = null,
            t.$rotated = !1,
            t
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "textureWidth", {
            get: function() {
                return this.$getTextureWidth()
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$getTextureWidth = function() {
            return this._textureWidth
        }
        ,
        Object.defineProperty(i.prototype, "textureHeight", {
            get: function() {
                return this.$getTextureHeight()
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$getTextureHeight = function() {
            return this._textureHeight
        }
        ,
        i.prototype.$getScaleBitmapWidth = function() {
            return this._bitmapWidth * t.$TextureScaleFactor
        }
        ,
        i.prototype.$getScaleBitmapHeight = function() {
            return this._bitmapHeight * t.$TextureScaleFactor
        }
        ,
        Object.defineProperty(i.prototype, "bitmapData", {
            get: function() {
                return this._bitmapData
            },
            set: function(t) {
                this._setBitmapData(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype._setBitmapData = function(e) {
            this._bitmapData = e;
            var i = t.$TextureScaleFactor
              , r = e.width * i
              , n = e.height * i;
            this.$initData(0, 0, r, n, 0, 0, r, n, e.width, e.height)
        }
        ,
        i.prototype.$initData = function(e, i, r, n, o, a, s, h, l, u, c) {
            void 0 === c && (c = !1);
            var p = t.$TextureScaleFactor;
            this._bitmapX = e / p,
            this._bitmapY = i / p,
            this._bitmapWidth = r / p,
            this._bitmapHeight = n / p,
            this._offsetX = o,
            this._offsetY = a,
            this._textureWidth = s,
            this._textureHeight = h,
            this._sourceWidth = l,
            this._sourceHeight = u,
            this.$rotated = c,
            t.BitmapData.$invalidate(this)
        }
        ,
        i.prototype.getPixel32 = function(t, e) {
            throw new Error
        }
        ,
        i.prototype.getPixels = function(t, e, i, r) {
            throw void 0 === i && (i = 1),
            void 0 === r && (r = 1),
            new Error
        }
        ,
        i.prototype.toDataURL = function(t, e, i) {
            throw new Error
        }
        ,
        i.prototype.saveToFile = function(t, e, i) {
            throw new Error
        }
        ,
        i.prototype.dispose = function() {
            this._bitmapData && (this._bitmapData.$dispose(),
            this._bitmapData = null)
        }
        ,
        i
    }(t.HashObject);
    t.Texture = e,
    __reflect(e.prototype, "egret.Texture")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(r) {
            var n = e.call(this) || this;
            return n.$scale9Grid = null,
            n.$fillMode = "scale",
            n._pixelHitTest = !1,
            n.$renderNode = new t.sys.BitmapNode,
            n.$Bitmap = {
                0: null,
                1: null,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: i.defaultSmoothing,
                11: 0 / 0,
                12: 0 / 0,
                13: 0 / 0,
                14: 0 / 0
            },
            n.$setBitmapData(r),
            r instanceof t.Texture && (n.$renderNode.rotated = r.$rotated),
            n
        }
        return __extends(i, e),
        i.prototype.$onAddToStage = function(i, r) {
            e.prototype.$onAddToStage.call(this, i, r);
            var n = this.$Bitmap[0];
            n && t.BitmapData.$addDisplayObject(this, n)
        }
        ,
        i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this);
            var i = this.$Bitmap[0];
            i && t.BitmapData.$removeDisplayObject(this, i)
        }
        ,
        Object.defineProperty(i.prototype, "bitmapData", {
            get: function() {
                var e = this.$Bitmap[0];
                return e instanceof t.Texture ? null : e
            },
            set: function(t) {
                this.$setBitmapData(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "texture", {
            get: function() {
                var e = this.$Bitmap[0];
                return e instanceof t.Texture ? e : null
            },
            set: function(t) {
                var e = this;
                e.$setBitmapData(t),
                t && e.$renderNode && (e.$renderNode.rotated = t.$rotated)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setBitmapData = function(e) {
            var i = this.$Bitmap
              , r = i[0];
            if (e == r)
                return !1;
            if (i[0] = e,
            !e)
                return r && t.BitmapData.$removeDisplayObject(this, r),
                this.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
                this.$invalidateContentBounds(),
                !0;
            if (this.$refreshImageData(),
            this.$stage) {
                if (r) {
                    var n = void 0;
                    n = r._bitmapData && r._bitmapData.hashCode ? r._bitmapData.hashCode : r.hashCode;
                    var o = void 0;
                    if (o = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode,
                    n == o)
                        return this.$invalidateContentBounds(),
                        !0;
                    t.BitmapData.$removeDisplayObject(this, r)
                }
                t.BitmapData.$addDisplayObject(this, e)
            }
            return this.$invalidateContentBounds(),
            !0
        }
        ,
        i.prototype.$refreshImageData = function() {
            var e = this.$Bitmap
              , i = e[0];
            if (i)
                if (i instanceof t.Texture)
                    this.setImageData(i._bitmapData, i._bitmapX, i._bitmapY, i._bitmapWidth, i._bitmapHeight, i._offsetX, i._offsetY, i.$getTextureWidth(), i.$getTextureHeight(), i._sourceWidth, i._sourceHeight);
                else {
                    var r = i.width
                      , n = i.height;
                    this.setImageData(i, 0, 0, r, n, 0, 0, r, n, r, n)
                }
        }
        ,
        i.prototype.setImageData = function(t, e, i, r, n, o, a, s, h, l, u) {
            var c = this.$Bitmap;
            c[1] = t,
            c[2] = e,
            c[3] = i,
            c[4] = r,
            c[5] = n,
            c[6] = o,
            c[7] = a,
            c[8] = s,
            c[9] = h,
            c[13] = l,
            c[14] = u
        }
        ,
        Object.defineProperty(i.prototype, "scale9Grid", {
            get: function() {
                return this.$scale9Grid
            },
            set: function(t) {
                this.$scale9Grid = t,
                this.$invalidateContentBounds()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "fillMode", {
            get: function() {
                return this.$fillMode
            },
            set: function(t) {
                this.$setFillMode(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setFillMode = function(t) {
            return t == this.$fillMode ? !1 : (this.$fillMode = t,
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "smoothing", {
            get: function() {
                var t = this.$Bitmap;
                return t[10]
            },
            set: function(t) {
                t = !!t;
                var e = this.$Bitmap;
                t != e[10] && (e[10] = t,
                this.$invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setWidth = function(t) {
            var e = this.$Bitmap;
            return 0 > t || t == e[11] ? !1 : (e[11] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        i.prototype.$setHeight = function(t) {
            var e = this.$Bitmap;
            return 0 > t || t == e[12] ? !1 : (e[12] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        i.prototype.$getWidth = function() {
            var t = this.$Bitmap;
            return isNaN(t[11]) ? this.$getContentBounds().width : t[11]
        }
        ,
        i.prototype.$getHeight = function() {
            var t = this.$Bitmap;
            return isNaN(t[12]) ? this.$getContentBounds().height : t[12]
        }
        ,
        i.prototype.$measureContentBounds = function(t) {
            var e = this.$Bitmap;
            if (e[1]) {
                var i = this.$Bitmap
                  , r = isNaN(i[11]) ? i[8] : i[11]
                  , n = isNaN(i[12]) ? i[9] : i[12];
                t.setTo(0, 0, r, n)
            } else {
                var r = isNaN(e[11]) ? 0 : e[11]
                  , n = isNaN(e[12]) ? 0 : e[12];
                t.setTo(0, 0, r, n)
            }
        }
        ,
        i.prototype.$render = function() {
            var e = this.$Bitmap;
            if (e[1]) {
                var i = isNaN(e[11]) ? e[8] : e[11]
                  , r = isNaN(e[12]) ? e[9] : e[12];
                t.sys.BitmapNode.$updateTextureData(this.$renderNode, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], i, r, e[13], e[14], this.scale9Grid || e[0].scale9Grid, this.fillMode, e[10])
            }
        }
        ,
        Object.defineProperty(i.prototype, "pixelHitTest", {
            get: function() {
                return this._pixelHitTest
            },
            set: function(t) {
                this._pixelHitTest = !!t
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$hitTest = function(t, i) {
            var r = e.prototype.$hitTest.call(this, t, i);
            return r && this._pixelHitTest && (r = this.hitTestPixel(t, i)),
            r
        }
        ,
        i.prototype.hitTestPixel = function(e, i) {
            var r, n = this.$getInvertedConcatenatedMatrix(), o = n.a * e + n.c * i + n.tx, a = n.b * e + n.d * i + n.ty, s = this.$displayList;
            if (s) {
                var h = s.renderBuffer;
                try {
                    r = h.getPixels(o - s.offsetX, a - s.offsetY)
                } catch (l) {
                    throw console.log(this.$Bitmap[0]),
                    new Error(t.sys.tr(1039))
                }
            } else {
                var h = t.sys.customHitTestBuffer;
                h.resize(3, 3);
                var u = this.$getRenderNode()
                  , c = t.Matrix.create();
                c.identity(),
                c.translate(1 - o, 1 - a),
                t.sys.systemRenderer.drawNodeToBuffer(u, h, c, !0),
                t.Matrix.release(c);
                try {
                    r = h.getPixels(1, 1)
                } catch (l) {
                    throw console.log(this.$Bitmap[0]),
                    new Error(t.sys.tr(1039))
                }
            }
            return 0 === r[3] ? null : this
        }
        ,
        i.$drawImage = function(e, i, r, n, o, a, s, h, l, u, c, p, d, f, g, y, v) {
            console.warn("deprecated method : Bitmap.$drawImage,use egret.sys.BitmapNode.$drawImage instead of it"),
            t.sys.BitmapNode.$updateTextureData(e, i, r, n, o, a, s, h, l, u, c, p, d, f, g, y, v)
        }
        ,
        i.defaultSmoothing = !0,
        i
    }(t.DisplayObject);
    t.Bitmap = e,
    __reflect(e.prototype, "egret.Bitmap")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function() {
            function i() {
                this.type = 0,
                this.needRedraw = !1,
                this.renderAlpha = 1,
                this.renderVisible = !0,
                this.renderMatrix = new t.Matrix,
                this.renderRegion = new e.Region,
                this.moved = !1,
                this.drawData = [],
                this.renderCount = 0
            }
            return i.prototype.cleanBeforeRender = function() {
                this.drawData.length = 0,
                this.renderCount = 0
            }
            ,
            i.prototype.$getRenderCount = function() {
                return this.renderCount
            }
            ,
            i
        }();
        e.RenderNode = i,
        __reflect(i.prototype, "egret.sys.RenderNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = function() {
            function t() {
                this.type = 0,
                this.$commands = [],
                this.$data = [],
                this.commandPosition = 0,
                this.dataPosition = 0,
                this.$lastX = 0,
                this.$lastY = 0
            }
            return t.prototype.moveTo = function(t, e) {
                this.$commands[this.commandPosition++] = 1;
                var i = this.dataPosition;
                this.$data[i++] = t,
                this.$data[i++] = e,
                this.dataPosition = i
            }
            ,
            t.prototype.lineTo = function(t, e) {
                this.$commands[this.commandPosition++] = 2;
                var i = this.dataPosition;
                this.$data[i++] = t,
                this.$data[i++] = e,
                this.dataPosition = i
            }
            ,
            t.prototype.curveTo = function(t, e, i, r) {
                this.$commands[this.commandPosition++] = 3;
                var n = this.dataPosition;
                this.$data[n++] = t,
                this.$data[n++] = e,
                this.$data[n++] = i,
                this.$data[n++] = r,
                this.dataPosition = n
            }
            ,
            t.prototype.cubicCurveTo = function(t, e, i, r, n, o) {
                this.$commands[this.commandPosition++] = 4;
                var a = this.dataPosition;
                this.$data[a++] = t,
                this.$data[a++] = e,
                this.$data[a++] = i,
                this.$data[a++] = r,
                this.$data[a++] = n,
                this.$data[a++] = o,
                this.dataPosition = a
            }
            ,
            t.prototype.drawRect = function(t, e, i, r) {
                var n = t + i
                  , o = e + r;
                this.moveTo(t, e),
                this.lineTo(n, e),
                this.lineTo(n, o),
                this.lineTo(t, o),
                this.lineTo(t, e)
            }
            ,
            t.prototype.drawRoundRect = function(t, e, i, r, n, o) {
                var a = .5 * n | 0
                  , s = o ? .5 * o | 0 : a;
                if (!a || !s)
                    return void this.drawRect(t, e, i, r);
                var h = .5 * i
                  , l = .5 * r;
                if (a > h && (a = h),
                s > l && (s = l),
                h === a && l === s)
                    return void (a === s ? this.drawCircle(t + a, e + s, a) : this.drawEllipse(t, e, 2 * a, 2 * s));
                var u = t + i
                  , c = e + r
                  , p = t + a
                  , d = u - a
                  , f = e + s
                  , g = c - s;
                this.moveTo(u, g),
                this.curveTo(u, c, d, c),
                this.lineTo(p, c),
                this.curveTo(t, c, t, g),
                this.lineTo(t, f),
                this.curveTo(t, e, p, e),
                this.lineTo(d, e),
                this.curveTo(u, e, u, f),
                this.lineTo(u, g)
            }
            ,
            t.prototype.drawCircle = function(t, e, i) {
                this.arcToBezier(t, e, i, i, 0, 2 * Math.PI)
            }
            ,
            t.prototype.drawEllipse = function(t, e, i, r) {
                var n = .5 * i
                  , o = .5 * r;
                t += n,
                e += o,
                this.arcToBezier(t, e, n, o, 0, 2 * Math.PI)
            }
            ,
            t.prototype.drawArc = function(t, e, i, r, n, o) {
                o ? n >= r && (n -= 2 * Math.PI) : r >= n && (n += 2 * Math.PI),
                this.arcToBezier(t, e, i, i, r, n, o)
            }
            ,
            t.prototype.arcToBezier = function(t, e, i, r, n, o, a) {
                var s = .5 * Math.PI
                  , h = n
                  , l = h;
                a ? (l += -s - h % s,
                o > l && (l = o)) : (l += s - h % s,
                l > o && (l = o));
                var u = t + Math.cos(h) * i
                  , c = e + Math.sin(h) * r;
                (this.$lastX != u || this.$lastY != c) && this.moveTo(u, c);
                for (var p = Math.cos(h), d = Math.sin(h), f = 0; 4 > f; f++) {
                    var g = l - h
                      , y = 4 * Math.tan(g / 4) / 3
                      , v = u - d * y * i
                      , $ = c + p * y * r;
                    p = Math.cos(l),
                    d = Math.sin(l),
                    u = t + p * i,
                    c = e + d * r;
                    var m = u + d * y * i
                      , b = c - p * y * r;
                    if (this.cubicCurveTo(v, $, m, b, u, c),
                    l === o)
                        break;
                    h = l,
                    a ? (l = h - s,
                    o > l && (l = o)) : (l = h + s,
                    l > o && (l = o))
                }
            }
            ,
            t
        }();
        t.Path2D = e,
        __reflect(e.prototype, "egret.sys.Path2D")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    function e() {
        var t = Object.create(null);
        return t.__v8__ = void 0,
        delete t.__v8__,
        t
    }
    t.createMap = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e() {
        return ""
    }
    function i(t) {
        throw new Error("#" + t)
    }
    function r() {}
    function n() {}
    t.getString = e,
    t.$error = i,
    t.$warn = r,
    t.$markCannotUse = n
}(egret || (egret = {}));
var egret;
!function(t) {
    t.CapsStyle = {
        NONE: "none",
        ROUND: "round",
        SQUARE: "square"
    }
}(egret || (egret = {}));
var egret;
!function(t) {
    t.DirtyRegionPolicy = {
        OFF: "off",
        ON: "on"
    }
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function e() {}
        return e.compileProgram = function(i, r, n) {
            var o = e.compileFragmentShader(i, n)
              , a = e.compileVertexShader(i, r)
              , s = i.createProgram();
            return i.attachShader(s, a),
            i.attachShader(s, o),
            i.linkProgram(s),
            i.getProgramParameter(s, i.LINK_STATUS) || t.$warn(1020),
            s
        }
        ,
        e.compileFragmentShader = function(t, i) {
            return e._compileShader(t, i, t.FRAGMENT_SHADER)
        }
        ,
        e.compileVertexShader = function(t, i) {
            return e._compileShader(t, i, t.VERTEX_SHADER)
        }
        ,
        e._compileShader = function(t, e, i) {
            var r = t.createShader(i);
            return t.shaderSource(r, e),
            t.compileShader(r),
            t.getShaderParameter(r, t.COMPILE_STATUS) ? r : null
        }
        ,
        e.checkCanUseWebGL = function() {
            if (void 0 == e.canUseWebGL)
                try {
                    var t = document.createElement("canvas");
                    e.canUseWebGL = !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl"))
                } catch (i) {
                    e.canUseWebGL = !1
                }
            return e.canUseWebGL
        }
        ,
        e.deleteWebGLTexture = function(t) {
            if (t) {
                var e = t.glContext;
                e && e.deleteTexture(t)
            }
        }
        ,
        e
    }();
    t.WebGLUtils = e,
    __reflect(e.prototype, "egret.WebGLUtils")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e, i, r) {
            return void 0 === i && (i = !1),
            void 0 === r && (r = !1),
            t.call(this, e, i, r) || this
        }
        return __extends(e, t),
        e.FOCUS_IN = "focusIn",
        e.FOCUS_OUT = "focusOut",
        e
    }(t.Event);
    t.FocusEvent = e,
    __reflect(e.prototype, "egret.FocusEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        e.PERMISSION_DENIED = "permissionDenied",
        e.UNAVAILABLE = "unavailable",
        e
    }(t.Event);
    t.GeolocationEvent = e,
    __reflect(e.prototype, "egret.GeolocationEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i, r) {
            void 0 === i && (i = !1),
            void 0 === r && (r = !1);
            var n = e.call(this, t, i, r) || this;
            return n._status = 0,
            n
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "status", {
            get: function() {
                return this._status
            },
            enumerable: !0,
            configurable: !0
        }),
        i.dispatchHTTPStatusEvent = function(e, r) {
            var n = t.Event.create(i, i.HTTP_STATUS);
            n._status = r;
            var o = e.dispatchEvent(n);
            return t.Event.release(n),
            o
        }
        ,
        i.HTTP_STATUS = "httpStatus",
        i
    }(t.Event);
    t.HTTPStatusEvent = e,
    __reflect(e.prototype, "egret.HTTPStatusEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i, r) {
            return void 0 === i && (i = !1),
            void 0 === r && (r = !1),
            e.call(this, t, i, r) || this
        }
        return __extends(i, e),
        i.dispatchIOErrorEvent = function(e) {
            var r = t.Event.create(i, i.IO_ERROR)
              , n = e.dispatchEvent(r);
            return t.Event.release(r),
            n
        }
        ,
        i.IO_ERROR = "ioError",
        i
    }(t.Event);
    t.IOErrorEvent = e,
    __reflect(e.prototype, "egret.IOErrorEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        e
    }(t.Event);
    t.MotionEvent = e,
    __reflect(e.prototype, "egret.MotionEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        e
    }(t.Event);
    t.OrientationEvent = e,
    __reflect(e.prototype, "egret.OrientationEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i, r, n, o) {
            void 0 === i && (i = !1),
            void 0 === r && (r = !1),
            void 0 === n && (n = 0),
            void 0 === o && (o = 0);
            var a = e.call(this, t, i, r) || this;
            return a.bytesLoaded = 0,
            a.bytesTotal = 0,
            a.bytesLoaded = n,
            a.bytesTotal = o,
            a
        }
        return __extends(i, e),
        i.dispatchProgressEvent = function(e, r, n, o) {
            void 0 === n && (n = 0),
            void 0 === o && (o = 0);
            var a = t.Event.create(i, r);
            a.bytesLoaded = n,
            a.bytesTotal = o;
            var s = e.dispatchEvent(a);
            return t.Event.release(a),
            s
        }
        ,
        i.PROGRESS = "progress",
        i.SOCKET_DATA = "socketData",
        i
    }(t.Event);
    t.ProgressEvent = e,
    __reflect(e.prototype, "egret.ProgressEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i, r) {
            return void 0 === i && (i = !1),
            void 0 === r && (r = !1),
            e.call(this, t, i, r) || this
        }
        return __extends(i, e),
        i.dispatchStageOrientationEvent = function(e, r) {
            var n = t.Event.create(i, r)
              , o = e.dispatchEvent(n);
            return t.Event.release(n),
            o
        }
        ,
        i.ORIENTATION_CHANGE = "orientationChange",
        i
    }(t.Event);
    t.StageOrientationEvent = e,
    __reflect(e.prototype, "egret.StageOrientationEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i, r, n) {
            void 0 === i && (i = !1),
            void 0 === r && (r = !1),
            void 0 === n && (n = "");
            var o = e.call(this, t, i, r) || this;
            return o.text = n,
            o
        }
        return __extends(i, e),
        i.dispatchTextEvent = function(e, r, n) {
            var o = t.Event.create(i, r);
            o.text = n;
            var a = e.dispatchEvent(o);
            return t.Event.release(o),
            a
        }
        ,
        i.LINK = "link",
        i
    }(t.Event);
    t.TextEvent = e,
    __reflect(e.prototype, "egret.TextEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i, r) {
            return e.call(this, t, i, r) || this
        }
        return __extends(i, e),
        i.prototype.updateAfterEvent = function() {
            t.sys.$requestRenderingFlag = !0
        }
        ,
        i.dispatchTimerEvent = function(e, r, n, o) {
            var a = t.Event.create(i, r, n, o)
              , s = e.dispatchEvent(a);
            return t.Event.release(a),
            s
        }
        ,
        i.TIMER = "timer",
        i.TIMER_COMPLETE = "timerComplete",
        i
    }(t.Event);
    t.TimerEvent = e,
    __reflect(e.prototype, "egret.TimerEvent")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(t) {
            var i = e.call(this) || this;
            return i.format = "image",
            i.$deleteSource = !0,
            i.source = t,
            i.width = t.width,
            i.height = t.height,
            i
        }
        return __extends(i, e),
        i.create = function(e, r, n) {
            if (t.Capabilities.runtimeType === t.RuntimeType.WEB) {
                var o = "";
                o = "arraybuffer" === e ? t.Base64Util.encode(r) : r;
                var a = "image/png";
                "/" === o.charAt(0) ? a = "image/jpeg" : "R" === o.charAt(0) ? a = "image/gif" : "i" === o.charAt(0) && (a = "image/png");
                var s = new Image;
                s.src = "data:" + a + ";base64," + o,
                s.crossOrigin = "*";
                var h = new i(s);
                return s.onload = function() {
                    s.onload = void 0,
                    h.source = s,
                    h.height = s.height,
                    h.width = s.width,
                    n && n(h)
                }
                ,
                h
            }
            var l = null;
            l = "arraybuffer" === e ? r : t.Base64Util.decode(r);
            var u = egret_native.Texture.createTextureFromArrayBuffer(l)
              , c = new i(u);
            return n && n(c),
            c
        }
        ,
        i.prototype.$dispose = function() {
            t.Capabilities.runtimeType == t.RuntimeType.WEB && "webgl" == t.Capabilities.renderMode && this.webGLTexture && (t.WebGLUtils.deleteWebGLTexture(this.webGLTexture),
            this.webGLTexture = null),
            this.source && this.source.dispose && this.source.dispose(),
            this.source = null,
            i.$dispose(this)
        }
        ,
        i.$addDisplayObject = function(t, e) {
            var r;
            if (r = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode) {
                if (!i._displayList[r])
                    return void (i._displayList[r] = [t]);
                var n = i._displayList[r];
                n.indexOf(t) < 0 && n.push(t)
            }
        }
        ,
        i.$removeDisplayObject = function(t, e) {
            var r;
            if (r = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode,
            r && i._displayList[r]) {
                var n = i._displayList[r]
                  , o = n.indexOf(t);
                o >= 0 && n.splice(o)
            }
        }
        ,
        i.$invalidate = function(e) {
            var r;
            if (r = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode,
            r && i._displayList[r])
                for (var n = i._displayList[r], o = 0; o < n.length; o++)
                    n[o]instanceof t.Bitmap && n[o].$refreshImageData(),
                    n[o].$invalidateContentBounds()
        }
        ,
        i.$dispose = function(e) {
            var r;
            if (r = e._bitmapData && e._bitmapData.hashCode ? e._bitmapData.hashCode : e.hashCode,
            r && i._displayList[r]) {
                for (var n = i._displayList[r], o = 0, a = n; o < a.length; o++) {
                    var s = a[o];
                    s instanceof t.Bitmap && (s.$Bitmap[1] = null),
                    s.$invalidateContentBounds()
                }
                delete i._displayList[r]
            }
        }
        ,
        i._displayList = t.createMap(),
        i
    }(t.HashObject);
    t.BitmapData = e,
    __reflect(e.prototype, "egret.BitmapData")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = new t.Point
      , i = function(i) {
        function r(t, e, r, n, o, a) {
            var s = i.call(this, t, e, r) || this;
            return s.targetChanged = !0,
            s.touchDown = !1,
            s.$initTo(n, o, a),
            s
        }
        return __extends(r, i),
        r.prototype.$initTo = function(t, e, i) {
            this.touchPointID = +i || 0,
            this.$stageX = +t || 0,
            this.$stageY = +e || 0
        }
        ,
        Object.defineProperty(r.prototype, "stageX", {
            get: function() {
                return this.$stageX
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "stageY", {
            get: function() {
                return this.$stageY
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "localX", {
            get: function() {
                return this.targetChanged && this.getLocalXY(),
                this._localX
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(r.prototype, "localY", {
            get: function() {
                return this.targetChanged && this.getLocalXY(),
                this._localY
            },
            enumerable: !0,
            configurable: !0
        }),
        r.prototype.getLocalXY = function() {
            this.targetChanged = !1;
            var t = this.$target.$getInvertedConcatenatedMatrix();
            t.transformPoint(this.$stageX, this.$stageY, e),
            this._localX = e.x,
            this._localY = e.y
        }
        ,
        r.prototype.$setTarget = function(t) {
            return this.$target = t,
            this.targetChanged = !!t,
            !0
        }
        ,
        r.prototype.updateAfterEvent = function() {
            t.sys.$requestRenderingFlag = !0
        }
        ,
        r.dispatchTouchEvent = function(e, i, n, o, a, s, h, l) {
            if (void 0 === l && (l = !1),
            !n && !e.hasEventListener(i))
                return !0;
            var u = t.Event.create(r, i, n, o);
            u.$initTo(a, s, h),
            u.touchDown = l;
            var c = e.dispatchEvent(u);
            return t.Event.release(u),
            c
        }
        ,
        r.TOUCH_MOVE = "touchMove",
        r.TOUCH_BEGIN = "touchBegin",
        r.TOUCH_END = "touchEnd",
        r.TOUCH_CANCEL = "touchCancel",
        r.TOUCH_TAP = "touchTap",
        r.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside",
        r
    }(t.Event);
    t.TouchEvent = i,
    __reflect(i.prototype, "egret.TouchEvent")
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e, n, o) {
            void 0 === e && (e = 4),
            void 0 === n && (n = 4),
            void 0 === o && (o = 1);
            var a = t.call(this) || this;
            return a.type = "blur",
            a.$blurX = e,
            a.$blurY = n,
            a.$quality = o,
            a.blurXFilter = new i(e),
            a.blurYFilter = new r(n),
            a
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "blurX", {
            get: function() {
                return this.$blurX
            },
            set: function(t) {
                this.$blurX != t && (this.$blurX = t,
                this.blurXFilter.blurX = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "blurY", {
            get: function() {
                return this.$blurY
            },
            set: function(t) {
                this.$blurY != t && (this.$blurY = t,
                this.blurYFilter.blurY = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.$toJson = function() {
            return '{"blurX": ' + this.$blurX + ', "blurY": ' + this.$blurY + ', "quality": 1}'
        }
        ,
        e
    }(t.Filter);
    t.BlurFilter = e,
    __reflect(e.prototype, "egret.BlurFilter");
    var i = function(t) {
        function e(e) {
            void 0 === e && (e = 4);
            var i = t.call(this) || this;
            return i.type = "blurX",
            i.$uniforms.blur = {
                x: e,
                y: 0
            },
            i
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "blurX", {
            get: function() {
                return this.$uniforms.blur.x
            },
            set: function(t) {
                this.$uniforms.blur.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }(t.Filter);
    __reflect(i.prototype, "BlurXFilter", ["egret.IBlurXFilter"]);
    var r = function(t) {
        function e(e) {
            void 0 === e && (e = 4);
            var i = t.call(this) || this;
            return i.type = "blurY",
            i.$uniforms.blur = {
                x: 0,
                y: e
            },
            i
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "blurY", {
            get: function() {
                return this.$uniforms.blur.y
            },
            set: function(t) {
                this.$uniforms.blur.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }(t.Filter);
    __reflect(r.prototype, "BlurYFilter", ["egret.IBlurYFilter"])
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e) {
            void 0 === e && (e = null);
            var i = t.call(this) || this;
            return i.$matrix = [],
            i.matrix2 = [],
            i.type = "colorTransform",
            i.$uniforms.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            i.$uniforms.colorAdd = {
                x: 0,
                y: 0,
                z: 0,
                w: 0
            },
            i.setMatrix(e),
            i
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "matrix", {
            get: function() {
                for (var t = 0; 20 > t; t++)
                    this.matrix2[t] = this.$matrix[t];
                return this.matrix2
            },
            set: function(t) {
                this.setMatrix(t),
                this.invalidate()
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.setMatrix = function(t) {
            if (t)
                for (var e = 0; 20 > e; e++)
                    this.$matrix[e] = t[e];
            else
                for (var e = 0; 20 > e; e++)
                    this.$matrix[e] = 0 == e || 6 == e || 12 == e || 18 == e ? 1 : 0;
            for (var i = this.$matrix, r = this.$uniforms.matrix, n = this.$uniforms.colorAdd, e = 0, o = 0; e < i.length; e++)
                4 === e ? n.x = i[e] / 255 : 9 === e ? n.y = i[e] / 255 : 14 === e ? n.z = i[e] / 255 : 19 === e ? n.w = i[e] / 255 : (r[o] = i[e],
                o++)
        }
        ,
        e.prototype.$toJson = function() {
            return '{"matrix": [' + this.$matrix.toString() + "]}"
        }
        ,
        e
    }(t.Filter);
    t.ColorMatrixFilter = e,
    __reflect(e.prototype, "egret.ColorMatrixFilter")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e, i = {}, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), n = new Array(36), o = 0, a = function() {
        for (var t = 0; 36 > t; t++)
            8 === t || 13 === t || 18 === t || 23 === t ? n[t] = "-" : 14 === t ? n[t] = "4" : (2 >= o && (o = 33554432 + 16777216 * Math.random() | 0),
            e = 15 & o,
            o >>= 4,
            n[t] = r[19 === t ? 3 & e | 8 : e]);
        return n.join("")
    }, s = function(t) {
        function e(e, r, n) {
            void 0 === n && (n = {});
            var o = t.call(this) || this;
            o.padding = 0,
            o.$vertexSrc = e,
            o.$fragmentSrc = r;
            var s = e + r;
            return i[s] || (i[s] = a()),
            o.$shaderKey = i[s],
            o.$uniforms = n,
            o.type = "custom",
            o
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "uniforms", {
            get: function() {
                return this.$uniforms
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }(t.Filter);
    t.CustomFilter = s,
    __reflect(s.prototype, "egret.CustomFilter")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e, i, r, n, o, a, s, h, l, u, c) {
            void 0 === e && (e = 4),
            void 0 === i && (i = 45),
            void 0 === r && (r = 0),
            void 0 === n && (n = 1),
            void 0 === o && (o = 4),
            void 0 === a && (a = 4),
            void 0 === s && (s = 1),
            void 0 === h && (h = 1),
            void 0 === l && (l = !1),
            void 0 === u && (u = !1),
            void 0 === c && (c = !1);
            var p = t.call(this, r, n, o, a, s, h, l, u) || this;
            return p.$distance = e,
            p.$angle = i,
            p.$hideObject = c,
            p.$uniforms.dist = e,
            p.$uniforms.angle = i / 180 * Math.PI,
            p.$uniforms.hideObject = c ? 1 : 0,
            p
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "distance", {
            get: function() {
                return this.$distance
            },
            set: function(t) {
                this.$distance != t && (this.$distance = t,
                this.$uniforms.dist = t,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "angle", {
            get: function() {
                return this.$angle
            },
            set: function(t) {
                this.$angle != t && (this.$angle = t,
                this.$uniforms.angle = t / 180 * Math.PI,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "hideObject", {
            get: function() {
                return this.$hideObject
            },
            set: function(t) {
                this.$hideObject != t && (this.$hideObject = t,
                this.$uniforms.hideObject = t ? 1 : 0,
                this.invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.$toJson = function() {
            return '{"distance": ' + this.$distance + ', "angle": ' + this.$angle + ', "color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + ', "hideObject": ' + this.$hideObject + "}"
        }
        ,
        e
    }(t.GlowFilter);
    t.DropShadowFilter = e,
    __reflect(e.prototype, "egret.DropShadowFilter")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.LINEAR = "linear",
        t.RADIAL = "radial",
        t
    }();
    t.GradientType = e,
    __reflect(e.prototype, "egret.GradientType")
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t) {
        return t %= 2 * Math.PI,
        0 > t && (t += 2 * Math.PI),
        t
    }
    var i = function(i) {
        function r() {
            var e = i.call(this) || this;
            return e.lastX = 0,
            e.lastY = 0,
            e.fillPath = null,
            e.strokePath = null,
            e.topLeftStrokeWidth = 0,
            e.bottomRightStrokeWidth = 0,
            e.minX = 1 / 0,
            e.minY = 1 / 0,
            e.maxX = -(1 / 0),
            e.maxY = -(1 / 0),
            e.includeLastPosition = !0,
            e.$renderNode = new t.sys.GraphicsNode,
            e
        }
        return __extends(r, i),
        r.prototype.$setTarget = function(t) {
            this.targetDisplay && (this.targetDisplay.$renderNode = null),
            t.$renderNode = this.$renderNode,
            this.targetDisplay = t
        }
        ,
        r.prototype.setStrokeWidth = function(t) {
            switch (t) {
            case 1:
                this.topLeftStrokeWidth = 0,
                this.bottomRightStrokeWidth = 1;
                break;
            case 3:
                this.topLeftStrokeWidth = 1,
                this.bottomRightStrokeWidth = 2;
                break;
            default:
                var e = 0 | Math.ceil(.5 * t);
                this.topLeftStrokeWidth = e,
                this.bottomRightStrokeWidth = e
            }
        }
        ,
        r.prototype.beginFill = function(t, e) {
            void 0 === e && (e = 1),
            t = +t || 0,
            e = +e || 0,
            this.fillPath = this.$renderNode.beginFill(t, e, this.strokePath),
            this.$renderNode.drawData.length > 1 && this.fillPath.moveTo(this.lastX, this.lastY)
        }
        ,
        r.prototype.beginGradientFill = function(t, e, i, r, n) {
            void 0 === n && (n = null),
            this.fillPath = this.$renderNode.beginGradientFill(t, e, i, r, n, this.strokePath),
            this.$renderNode.drawData.length > 1 && this.fillPath.moveTo(this.lastX, this.lastY)
        }
        ,
        r.prototype.endFill = function() {
            this.fillPath = null
        }
        ,
        r.prototype.lineStyle = function(t, e, i, r, n, o, a, s) {
            void 0 === t && (t = 0 / 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 1),
            void 0 === r && (r = !1),
            void 0 === n && (n = "normal"),
            void 0 === o && (o = null),
            void 0 === a && (a = null),
            void 0 === s && (s = 3),
            t = +t || 0,
            0 >= t ? (this.strokePath = null,
            this.setStrokeWidth(0)) : (e = +e || 0,
            i = +i || 0,
            s = +s || 0,
            this.setStrokeWidth(t),
            this.strokePath = this.$renderNode.lineStyle(t, e, i, o, a, s),
            this.$renderNode.drawData.length > 1 && this.strokePath.moveTo(this.lastX, this.lastY))
        }
        ,
        r.prototype.drawRect = function(t, e, i, r) {
            t = +t || 0,
            e = +e || 0,
            i = +i || 0,
            r = +r || 0;
            var n = this.fillPath
              , o = this.strokePath;
            n && n.drawRect(t, e, i, r),
            o && o.drawRect(t, e, i, r),
            this.extendBoundsByPoint(t + i, e + r),
            this.updatePosition(t, e),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.drawRoundRect = function(t, e, i, r, n, o) {
            t = +t || 0,
            e = +e || 0,
            i = +i || 0,
            r = +r || 0,
            n = +n || 0,
            o = +o || 0;
            var a = this.fillPath
              , s = this.strokePath;
            a && a.drawRoundRect(t, e, i, r, n, o),
            s && s.drawRoundRect(t, e, i, r, n, o);
            var h = .5 * n | 0
              , l = o ? .5 * o | 0 : h
              , u = t + i
              , c = e + r
              , p = c - l;
            this.extendBoundsByPoint(t, e),
            this.extendBoundsByPoint(u, c),
            this.updatePosition(u, p),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.drawCircle = function(t, e, i) {
            t = +t || 0,
            e = +e || 0,
            i = +i || 0;
            var r = this.fillPath
              , n = this.strokePath;
            r && r.drawCircle(t, e, i),
            n && n.drawCircle(t, e, i),
            this.extendBoundsByPoint(t - i, e - i),
            this.extendBoundsByPoint(t + i, e + i),
            this.updatePosition(t + i, e),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.drawEllipse = function(t, e, i, r) {
            t = +t || 0,
            e = +e || 0,
            i = +i || 0,
            r = +r || 0;
            var n = this.fillPath
              , o = this.strokePath;
            n && n.drawEllipse(t, e, i, r),
            o && o.drawEllipse(t, e, i, r),
            this.extendBoundsByPoint(t, e),
            this.extendBoundsByPoint(t + i, e + r),
            this.updatePosition(t + i, e + .5 * r),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.moveTo = function(t, e) {
            t = +t || 0,
            e = +e || 0;
            var i = this.fillPath
              , r = this.strokePath;
            i && i.moveTo(t, e),
            r && r.moveTo(t, e),
            this.includeLastPosition = !1,
            this.lastX = t,
            this.lastY = e,
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.lineTo = function(t, e) {
            t = +t || 0,
            e = +e || 0;
            var i = this.fillPath
              , r = this.strokePath;
            i && i.lineTo(t, e),
            r && r.lineTo(t, e),
            this.updatePosition(t, e),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.curveTo = function(t, e, i, r) {
            t = +t || 0,
            e = +e || 0,
            i = +i || 0,
            r = +r || 0;
            var n = this.fillPath
              , o = this.strokePath;
            n && n.curveTo(t, e, i, r),
            o && o.curveTo(t, e, i, r),
            this.extendBoundsByPoint(t, e),
            this.extendBoundsByPoint(i, r),
            this.updatePosition(i, r),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.cubicCurveTo = function(t, e, i, r, n, o) {
            t = +t || 0,
            e = +e || 0,
            i = +i || 0,
            r = +r || 0,
            n = +n || 0,
            o = +o || 0;
            var a = this.fillPath
              , s = this.strokePath;
            a && a.cubicCurveTo(t, e, i, r, n, o),
            s && s.cubicCurveTo(t, e, i, r, n, o),
            this.extendBoundsByPoint(t, e),
            this.extendBoundsByPoint(i, r),
            this.extendBoundsByPoint(n, o),
            this.updatePosition(n, o),
            this.$renderNode.dirtyRender = !0
        }
        ,
        r.prototype.drawArc = function(t, i, r, n, o, a) {
            if (!(0 > r || n === o)) {
                t = +t || 0,
                i = +i || 0,
                r = +r || 0,
                n = +n || 0,
                o = +o || 0,
                a = !!a,
                n = e(n),
                o = e(o);
                var s = this.fillPath
                  , h = this.strokePath;
                s && (s.$lastX = this.lastX,
                s.$lastY = this.lastY,
                s.drawArc(t, i, r, n, o, a)),
                h && (h.$lastX = this.lastX,
                h.$lastY = this.lastY,
                h.drawArc(t, i, r, n, o, a)),
                a ? this.arcBounds(t, i, r, o, n) : this.arcBounds(t, i, r, n, o);
                var l = t + Math.cos(o) * r
                  , u = i + Math.sin(o) * r;
                this.updatePosition(l, u),
                this.$renderNode.dirtyRender = !0
            }
        }
        ,
        r.prototype.arcBounds = function(t, e, i, r, n) {
            var o = Math.PI;
            if (Math.abs(r - n) < .01)
                return this.extendBoundsByPoint(t - i, e - i),
                void this.extendBoundsByPoint(t + i, e + i);
            r > n && (n += 2 * o);
            for (var a = Math.cos(r) * i, s = Math.cos(n) * i, h = Math.min(a, s), l = Math.max(a, s), u = Math.sin(r) * i, c = Math.sin(n) * i, p = Math.min(u, c), d = Math.max(u, c), f = r / (.5 * o), g = n / (.5 * o), y = Math.ceil(f); g >= y; y++)
                switch (y % 4) {
                case 0:
                    l = i;
                    break;
                case 1:
                    d = i;
                    break;
                case 2:
                    h = -i;
                    break;
                case 3:
                    p = -i
                }
            h = Math.floor(h),
            p = Math.floor(p),
            l = Math.ceil(l),
            d = Math.ceil(d),
            this.extendBoundsByPoint(h + t, p + e),
            this.extendBoundsByPoint(l + t, d + e)
        }
        ,
        r.prototype.clear = function() {
            this.$renderNode.clear(),
            this.updatePosition(0, 0),
            this.minX = 1 / 0,
            this.minY = 1 / 0,
            this.maxX = -(1 / 0),
            this.maxY = -(1 / 0)
        }
        ,
        r.prototype.extendBoundsByPoint = function(t, e) {
            this.extendBoundsByX(t),
            this.extendBoundsByY(e)
        }
        ,
        r.prototype.extendBoundsByX = function(t) {
            this.minX = Math.min(this.minX, t - this.topLeftStrokeWidth),
            this.maxX = Math.max(this.maxX, t + this.bottomRightStrokeWidth),
            this.updateNodeBounds()
        }
        ,
        r.prototype.extendBoundsByY = function(t) {
            this.minY = Math.min(this.minY, t - this.topLeftStrokeWidth),
            this.maxY = Math.max(this.maxY, t + this.bottomRightStrokeWidth),
            this.updateNodeBounds()
        }
        ,
        r.prototype.updateNodeBounds = function() {
            var t = this.$renderNode;
            t.x = this.minX,
            t.y = this.minY,
            t.width = Math.ceil(this.maxX - this.minX),
            t.height = Math.ceil(this.maxY - this.minY)
        }
        ,
        r.prototype.updatePosition = function(t, e) {
            this.includeLastPosition || (this.extendBoundsByPoint(this.lastX, this.lastY),
            this.includeLastPosition = !0),
            this.lastX = t,
            this.lastY = e,
            this.extendBoundsByPoint(t, e),
            this.targetDisplay.$invalidateContentBounds()
        }
        ,
        r.prototype.$measureContentBounds = function(t) {
            this.minX === 1 / 0 ? t.setEmpty() : t.setTo(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
        }
        ,
        r.prototype.$hitTest = function(e, i) {
            var r = this.targetDisplay
              , n = r.$getInvertedConcatenatedMatrix()
              , o = n.a * e + n.c * i + n.tx
              , a = n.b * e + n.d * i + n.ty
              , s = t.sys.canvasHitTestBuffer;
            s.resize(3, 3);
            var h = this.$renderNode
              , l = t.Matrix.create();
            l.identity(),
            l.translate(1 - o, 1 - a),
            t.sys.canvasRenderer.drawNodeToBuffer(h, s, l, !0),
            t.Matrix.release(l);
            try {
                var u = s.getPixels(1, 1);
                if (0 === u[3])
                    return null
            } catch (c) {
                throw new Error(t.sys.tr(1039))
            }
            return r
        }
        ,
        r.prototype.$onRemoveFromStage = function() {
            this.$renderNode && this.$renderNode.clean()
        }
        ,
        r
    }(t.HashObject);
    t.Graphics = i,
    __reflect(i.prototype, "egret.Graphics")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = Math.PI
      , i = 2 * e
      , r = e / 180
      , n = []
      , o = function(o) {
        function a(t, e, i, r, n, a) {
            void 0 === t && (t = 1),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === r && (r = 1),
            void 0 === n && (n = 0),
            void 0 === a && (a = 0);
            var s = o.call(this) || this;
            return s.a = t,
            s.b = e,
            s.c = i,
            s.d = r,
            s.tx = n,
            s.ty = a,
            s
        }
        return __extends(a, o),
        a.release = function(t) {
            t && n.push(t)
        }
        ,
        a.create = function() {
            var t = n.pop();
            return t || (t = new a),
            t
        }
        ,
        a.prototype.clone = function() {
            return new a(this.a,this.b,this.c,this.d,this.tx,this.ty)
        }
        ,
        a.prototype.concat = function(t) {
            var e = this.a * t.a
              , i = 0
              , r = 0
              , n = this.d * t.d
              , o = this.tx * t.a + t.tx
              , a = this.ty * t.d + t.ty;
            (0 !== this.b || 0 !== this.c || 0 !== t.b || 0 !== t.c) && (e += this.b * t.c,
            n += this.c * t.b,
            i += this.a * t.b + this.b * t.d,
            r += this.c * t.a + this.d * t.c,
            o += this.ty * t.c,
            a += this.tx * t.b),
            this.a = e,
            this.b = i,
            this.c = r,
            this.d = n,
            this.tx = o,
            this.ty = a
        }
        ,
        a.prototype.copyFrom = function(t) {
            return this.a = t.a,
            this.b = t.b,
            this.c = t.c,
            this.d = t.d,
            this.tx = t.tx,
            this.ty = t.ty,
            this
        }
        ,
        a.prototype.identity = function() {
            this.a = this.d = 1,
            this.b = this.c = this.tx = this.ty = 0
        }
        ,
        a.prototype.invert = function() {
            this.$invertInto(this)
        }
        ,
        a.prototype.$invertInto = function(t) {
            var e = this.a
              , i = this.b
              , r = this.c
              , n = this.d
              , o = this.tx
              , a = this.ty;
            if (0 == i && 0 == r)
                return t.b = t.c = 0,
                void (0 == e || 0 == n ? t.a = t.d = t.tx = t.ty = 0 : (e = t.a = 1 / e,
                n = t.d = 1 / n,
                t.tx = -e * o,
                t.ty = -n * a));
            var s = e * n - i * r;
            if (0 == s)
                return void t.identity();
            s = 1 / s;
            var h = t.a = n * s;
            i = t.b = -i * s,
            r = t.c = -r * s,
            n = t.d = e * s,
            t.tx = -(h * o + r * a),
            t.ty = -(i * o + n * a)
        }
        ,
        a.prototype.rotate = function(e) {
            if (e = +e,
            0 !== e) {
                e /= r;
                var i = t.NumberUtils.cos(e)
                  , n = t.NumberUtils.sin(e)
                  , o = this.a
                  , a = this.b
                  , s = this.c
                  , h = this.d
                  , l = this.tx
                  , u = this.ty;
                this.a = o * i - a * n,
                this.b = o * n + a * i,
                this.c = s * i - h * n,
                this.d = s * n + h * i,
                this.tx = l * i - u * n,
                this.ty = l * n + u * i
            }
        }
        ,
        a.prototype.scale = function(t, e) {
            1 !== t && (this.a *= t,
            this.c *= t,
            this.tx *= t),
            1 !== e && (this.b *= e,
            this.d *= e,
            this.ty *= e)
        }
        ,
        a.prototype.setTo = function(t, e, i, r, n, o) {
            return this.a = t,
            this.b = e,
            this.c = i,
            this.d = r,
            this.tx = n,
            this.ty = o,
            this
        }
        ,
        a.prototype.transformPoint = function(e, i, r) {
            var n = this.a * e + this.c * i + this.tx
              , o = this.b * e + this.d * i + this.ty;
            return r ? (r.setTo(n, o),
            r) : new t.Point(n,o)
        }
        ,
        a.prototype.translate = function(t, e) {
            this.tx += t,
            this.ty += e
        }
        ,
        a.prototype.equals = function(t) {
            return this.a == t.a && this.b == t.b && this.c == t.c && this.d == t.d && this.tx == t.tx && this.ty == t.ty
        }
        ,
        a.prototype.prepend = function(t, e, i, r, n, o) {
            var a = this.tx;
            if (1 != t || 0 != e || 0 != i || 1 != r) {
                var s = this.a
                  , h = this.c;
                this.a = s * t + this.b * i,
                this.b = s * e + this.b * r,
                this.c = h * t + this.d * i,
                this.d = h * e + this.d * r
            }
            return this.tx = a * t + this.ty * i + n,
            this.ty = a * e + this.ty * r + o,
            this
        }
        ,
        a.prototype.append = function(t, e, i, r, n, o) {
            var a = this.a
              , s = this.b
              , h = this.c
              , l = this.d;
            return (1 != t || 0 != e || 0 != i || 1 != r) && (this.a = t * a + e * h,
            this.b = t * s + e * l,
            this.c = i * a + r * h,
            this.d = i * s + r * l),
            this.tx = n * a + o * h + this.tx,
            this.ty = n * s + o * l + this.ty,
            this
        }
        ,
        a.prototype.deltaTransformPoint = function(e) {
            var i = this
              , r = i.a * e.x + i.c * e.y
              , n = i.b * e.x + i.d * e.y;
            return new t.Point(r,n)
        }
        ,
        a.prototype.toString = function() {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")"
        }
        ,
        a.prototype.createBox = function(e, i, n, o, a) {
            void 0 === n && (n = 0),
            void 0 === o && (o = 0),
            void 0 === a && (a = 0);
            var s = this;
            if (0 !== n) {
                n /= r;
                var h = t.NumberUtils.cos(n)
                  , l = t.NumberUtils.sin(n);
                s.a = h * e,
                s.b = l * i,
                s.c = -l * e,
                s.d = h * i
            } else
                s.a = e,
                s.b = 0,
                s.c = 0,
                s.d = i;
            s.tx = o,
            s.ty = a
        }
        ,
        a.prototype.createGradientBox = function(t, e, i, r, n) {
            void 0 === i && (i = 0),
            void 0 === r && (r = 0),
            void 0 === n && (n = 0),
            this.createBox(t / 1638.4, e / 1638.4, i, r + t / 2, n + e / 2)
        }
        ,
        a.prototype.$transformBounds = function(t) {
            var e = this.a
              , i = this.b
              , r = this.c
              , n = this.d
              , o = this.tx
              , a = this.ty
              , s = t.x
              , h = t.y
              , l = s + t.width
              , u = h + t.height
              , c = e * s + r * h + o
              , p = i * s + n * h + a
              , d = e * l + r * h + o
              , f = i * l + n * h + a
              , g = e * l + r * u + o
              , y = i * l + n * u + a
              , v = e * s + r * u + o
              , $ = i * s + n * u + a
              , m = 0;
            c > d && (m = c,
            c = d,
            d = m),
            g > v && (m = g,
            g = v,
            v = m),
            t.x = Math.floor(g > c ? c : g),
            t.width = Math.ceil((d > v ? d : v) - t.x),
            p > f && (m = p,
            p = f,
            f = m),
            y > $ && (m = y,
            y = $,
            $ = m),
            t.y = Math.floor(y > p ? p : y),
            t.height = Math.ceil((f > $ ? f : $) - t.y)
        }
        ,
        a.prototype.getDeterminant = function() {
            return this.a * this.d - this.b * this.c
        }
        ,
        a.prototype.$getScaleX = function() {
            var t = this;
            if (1 == t.a && 0 == t.b)
                return 1;
            var e = Math.sqrt(t.a * t.a + t.b * t.b);
            return this.getDeterminant() < 0 ? -e : e
        }
        ,
        a.prototype.$getScaleY = function() {
            var t = this;
            if (0 == t.c && 1 == t.d)
                return 1;
            var e = Math.sqrt(t.c * t.c + t.d * t.d);
            return this.getDeterminant() < 0 ? -e : e
        }
        ,
        a.prototype.$getSkewX = function() {
            return Math.atan2(this.d, this.c) - e / 2
        }
        ,
        a.prototype.$getSkewY = function() {
            return Math.atan2(this.b, this.a)
        }
        ,
        a.prototype.$updateScaleAndRotation = function(e, n, o, a) {
            if (!(0 != o && o != i || 0 != a && a != i))
                return this.a = e,
                this.b = this.c = 0,
                void (this.d = n);
            o /= r,
            a /= r;
            var s = t.NumberUtils.cos(o)
              , h = t.NumberUtils.sin(o);
            o == a ? (this.a = s * e,
            this.b = h * e) : (this.a = t.NumberUtils.cos(a) * e,
            this.b = t.NumberUtils.sin(a) * e),
            this.c = -h * n,
            this.d = s * n
        }
        ,
        a.prototype.$preMultiplyInto = function(t, e) {
            var i = t.a * this.a
              , r = 0
              , n = 0
              , o = t.d * this.d
              , a = t.tx * this.a + this.tx
              , s = t.ty * this.d + this.ty;
            (0 !== t.b || 0 !== t.c || 0 !== this.b || 0 !== this.c) && (i += t.b * this.c,
            o += t.c * this.b,
            r += t.a * this.b + t.b * this.d,
            n += t.c * this.a + t.d * this.c,
            a += t.ty * this.c,
            s += t.tx * this.b),
            e.a = i,
            e.b = r,
            e.c = n,
            e.d = o,
            e.tx = a,
            e.ty = s
        }
        ,
        a
    }(t.HashObject);
    t.Matrix = o,
    __reflect(o.prototype, "egret.Matrix"),
    t.$TempMatrix = new o
}(egret || (egret = {}));
var egret;
!function(t) {
    t.JointStyle = {
        BEVEL: "bevel",
        MITER: "miter",
        ROUND: "round"
    }
}(egret || (egret = {}));
var egret;
!function(t) {
    t.$locale_strings = t.$locale_strings || {},
    t.$locale_strings.en_US = t.$locale_strings.en_US || {};
    var e = t.$locale_strings.en_US;
    e[1001] = "Could not find Egret entry class: {0}。",
    e[1002] = "Egret entry class '{0}' must inherit from egret.DisplayObject.",
    e[1003] = "Parameter {0} must be non-null.",
    e[1004] = "An object cannot be added as a child to one of it's children (or children's children, etc.).",
    e[1005] = "An object cannot be added as a child of itself.",
    e[1006] = "The supplied DisplayObject must be a child of the caller.",
    e[1007] = "An index specified for a parameter was out of range.",
    e[1008] = "Instantiate singleton error，singleton class {0} can not create multiple instances.",
    e[1009] = 'the Class {0} cannot use the property "{1}"',
    e[1010] = 'the property "{1}" of the Class "{0}" is readonly',
    e[1011] = "Stream Error. URL: {0}",
    e[1012] = "The type of parameter {0} must be Class.",
    e[1013] = "Variable assignment is NaN, please see the code!",
    e[1014] = 'the constant "{1}" of the Class "{0}" is read-only',
    e[1015] = "xml not found!",
    e[1016] = "{0}has been obsoleted",
    e[1017] = "The format of JSON file is incorrect: {0}\ndata: {1}",
    e[1018] = "the scale9Grid is not correct",
    e[1019] = "Network ab:{0}",
    e[1020] = "Cannot initialize Shader",
    e[1021] = "Current browser does not support webgl",
    e[1022] = "{0} ArgumentError",
    e[1023] = "This method is not available in the ScrollView!",
    e[1025] = "end of the file",
    e[1026] = "! EncodingError The code point {0} could not be encoded.",
    e[1027] = "DecodingError",
    e[1028] = ". called injection is not configured rule: {0}, please specify configuration during its initial years of injection rule, and then call the corresponding single case.",
    e[1029] = "Function.prototype.bind - what is trying to be bound is not callable",
    e[1033] = "Photos can not be used across domains toDataURL to convert base64",
    e[1034] = 'Music file decoding failed: "{0}", please use the standard conversion tool reconversion under mp3.',
    e[1035] = "Native does not support this feature!",
    e[1036] = "Sound has stopped, please recall Sound.play () to play the sound!",
    e[1037] = "Non-load the correct blob!",
    e[1038] = "XML format error!",
    e[1039] = "Cross domains pictures can not get pixel information!",
    e[1040] = "hitTestPoint can not detect crossOrigin images! Please check if the display object has crossOrigin elements.",
    e[1041] = "{0} is deprecated, please use {1} replace",
    e[1042] = "The parameters passed in the region needs is an integer in drawToTexture method. Otherwise, some browsers will draw abnormal.",
    e[1043] = "Compile errors in {0}, the attribute name: {1}, the attribute value: {2}.",
    e[1044] = "The current version of the Runtime does not support video playback, please use the latest version",
    e[1045] = "The resource url is not found",
    e[1046] = "BitmapText no corresponding characters: {0}, please check the configuration file",
    e[1047] = "egret.localStorage.setItem save failed,key={0}&value={1}",
    e[1048] = "Video loading failed",
    e[1049] = "In the absence of sound is not allowed to play after loading",
    e[1050] = "ExternalInterface calls the method without js registration: {0}",
    e[3e3] = "Theme configuration file failed to load: {0}",
    e[3001] = "Cannot find the skin name which is configured in Theme: {0}",
    e[3002] = 'Index:"{0}" is out of the collection element index range',
    e[3003] = "Cannot be available in this component. If this component is container, please continue to use",
    e[3004] = "addChild(){0}addElement() replace",
    e[3005] = "addChildAt(){0}addElementAt() replace",
    e[3006] = "removeChild(){0}removeElement() replace",
    e[3007] = "removeChildAt(){0}removeElementAt() replace",
    e[3008] = "setChildIndex(){0}setElementIndex() replace",
    e[3009] = "swapChildren(){0}swapElements() replace",
    e[3010] = "swapChildrenAt(){0}swapElementsAt() replace",
    e[3011] = 'Index:"{0}" is out of the visual element index range',
    e[3012] = "This method is not available in Scroller component!",
    e[3013] = "UIStage is GUI root container, and only one such instant is in the display list！",
    e[3014] = "set fullscreen error",
    e[3100] = "Current browser does not support WebSocket",
    e[3101] = "Please connect Socket firstly",
    e[3102] = "Please set the type of binary type",
    e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)",
    e[4001] = "Abstract class can not be instantiated!",
    e[4002] = "Unnamed data!",
    e[4003] = "Nonsupport version!"
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i(i) {
            var r = e.call(this, i) || this;
            return r._verticesDirty = !0,
            r._bounds = new t.Rectangle,
            r.$renderNode = new t.sys.MeshNode,
            r
        }
        return __extends(i, e),
        i.prototype.$render = function() {
            var e = this.$Bitmap
              , i = e[1];
            if (i) {
                var r = (t.$TextureScaleFactor,
                this.$renderNode);
                r.smoothing = e[10],
                r.image = i,
                r.imageWidth = e[13],
                r.imageHeight = e[14];
                var n = isNaN(e[11]) ? e[8] : e[11]
                  , o = isNaN(e[12]) ? e[9] : e[12]
                  , a = n / e[8]
                  , s = o / e[9]
                  , h = e[4]
                  , l = e[5];
                r.drawMesh(e[2], e[3], h, l, e[6] * a, e[7] * s, a * h, s * l)
            }
        }
        ,
        i.prototype.$updateVertices = function() {
            this._verticesDirty = !0,
            this.$invalidateContentBounds()
        }
        ,
        i.prototype.$measureContentBounds = function(t) {
            if (this._verticesDirty) {
                this._verticesDirty = !1;
                var e = this.$renderNode
                  , i = e.vertices;
                if (i.length) {
                    this._bounds.setTo(Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                    for (var r = 0, n = i.length; n > r; r += 2) {
                        var o = i[r]
                          , a = i[r + 1];
                        this._bounds.x > o && (this._bounds.x = o),
                        this._bounds.width < o && (this._bounds.width = o),
                        this._bounds.y > a && (this._bounds.y = a),
                        this._bounds.height < a && (this._bounds.height = a)
                    }
                    this._bounds.width -= this._bounds.x,
                    this._bounds.height -= this._bounds.y
                } else
                    this._bounds.setTo(0, 0, 0, 0);
                e.bounds.copyFrom(this._bounds)
            }
            t.copyFrom(this._bounds)
        }
        ,
        i
    }(t.Bitmap);
    t.Mesh = e,
    __reflect(e.prototype, "egret.Mesh")
}(egret || (egret = {}));
var egret;
!function(t) {
    t.$locale_strings = t.$locale_strings || {},
    t.$locale_strings.zh_CN = t.$locale_strings.zh_CN || {};
    var e = t.$locale_strings.zh_CN;
    e[1001] = "找不到Egret入口类: {0}。",
    e[1002] = "Egret入口类 {0} 必须继承自egret.DisplayObject。",
    e[1003] = "参数 {0} 不能为 null。",
    e[1004] = "无法将对象添加为它的一个子对象（或子对象的子对象等）的子对象。",
    e[1005] = "不能将对象添加为其自身的子对象。",
    e[1006] = "提供的 DisplayObject 必须是调用者的子级。",
    e[1007] = "为参数指定的索引不在范围内。",
    e[1008] = "实例化单例出错，不允许实例化多个 {0} 对象。",
    e[1009] = "类 {0} 不可以使用属性 {1}",
    e[1010] = "类 {0} 属性 {1} 是只读的",
    e[1011] = "流错误。URL: {0}",
    e[1012] = "参数 {0} 的类型必须为 Class。",
    e[1013] = "变量赋值为NaN，请查看代码！",
    e[1014] = "类 {0} 常量 {1} 是只读的",
    e[1015] = "xml not found!",
    e[1016] = "{0}已经废弃",
    e[1017] = "JSON文件格式不正确: {0}\ndata: {1}",
    e[1018] = "9宫格设置错误",
    e[1019] = "网络异常:{0}",
    e[1020] = "无法初始化着色器",
    e[1021] = "当前浏览器不支持webgl",
    e[1022] = "{0} ArgumentError",
    e[1023] = "此方法在ScrollView内不可用!",
    e[1025] = "遇到文件尾",
    e[1026] = "EncodingError! The code point {0} could not be encoded.",
    e[1027] = "DecodingError",
    e[1028] = "调用了未配置的注入规则:{0}。 请先在项目初始化里配置指定的注入规则，再调用对应单例。",
    e[1029] = "Function.prototype.bind - what is trying to be bound is not callable",
    e[1033] = "跨域图片不可以使用toDataURL来转换成base64",
    e[1034] = '音乐文件解码失败："{0}"，请使用标准的转换工具重新转换下mp3。',
    e[1035] = "Native 下暂未实现此功能！",
    e[1036] = "声音已停止，请重新调用 Sound.play() 来播放声音！",
    e[1037] = "非正确的blob加载！",
    e[1038] = "XML 格式错误!",
    e[1039] = "跨域图片不能获取像素信息!",
    e[1040] = "hitTestPoint 不能对跨域图片进行检测! 请检查该显示对象内是否含有跨域元素",
    e[1041] = "{0} 已废弃,请使用 {1} 代替",
    e[1042] = "drawToTexture方法传入的区域各个参数需要为整数,否则某些浏览器绘制会出现异常",
    e[1043] = "{0} 中存在编译错误，属性名 : {1}，属性值 : {2}",
    e[1044] = "当前的 runtime 版本不支持视频播放,请使用最新的版本",
    e[1045] = "没有设置要加载的资源地址",
    e[1046] = "BitmapText 找不到对应字符:{0}，请检查配置文件",
    e[1047] = "egret.localStorage.setItem保存失败,key={0}&value={1}",
    e[1048] = "视频加载失败",
    e[1049] = "声音在没有加载完之前不允许播放",
    e[1050] = "ExternalInterface调用了js没有注册的方法: {0}",
    e[3e3] = "主题配置文件加载失败: {0}",
    e[3001] = "找不到主题中所配置的皮肤类名: {0}",
    e[3002] = '索引:"{0}"超出集合元素索引范围',
    e[3003] = "在此组件中不可用，若此组件为容器类，请使用",
    e[3004] = "addChild(){0}addElement()代替",
    e[3005] = "addChildAt(){0}addElementAt()代替",
    e[3006] = "removeChild(){0}removeElement()代替",
    e[3007] = "removeChildAt(){0}removeElementAt()代替",
    e[3008] = "setChildIndex(){0}setElementIndex()代替",
    e[3009] = "swapChildren(){0}swapElements()代替",
    e[3010] = "swapChildrenAt(){0}swapElementsAt()代替",
    e[3011] = '索引:"{0}"超出可视元素索引范围',
    e[3012] = "此方法在Scroller组件内不可用!",
    e[3013] = "UIStage是GUI根容器，只能有一个此实例在显示列表中！",
    e[3014] = "设置全屏模式失败",
    e[3100] = "当前浏览器不支持WebSocket",
    e[3101] = "请先连接WebSocket",
    e[3102] = "请先设置type为二进制类型",
    e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)",
    e[4001] = "Abstract class can not be instantiated!",
    e[4002] = "Unnamed data!",
    e[4003] = "Nonsupport version!"
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {}(e = t.localStorage || (t.localStorage = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        function e(t) {
            r.indexOf(t) < 0 && r.push(t)
        }
        function i(t) {
            var e = r.indexOf(t);
            return e >= 0 ? (r.splice(e, 1),
            !0) : !1
        }
        var r = [];
        t.$pushSoundChannel = e,
        t.$popSoundChannel = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {})),
function(t) {}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function e() {
            this.onSuccessFunc = null,
            this.onSuccessThisObject = null,
            this.onErrorFunc = null,
            this.onErrorThisObject = null,
            this.downloadingSizeFunc = null,
            this.downloadingSizeThisObject = null,
            this.onResponseHeaderFunc = null,
            this.onResponseHeaderThisObject = null
        }
        return e.create = function() {
            return e.promiseObjectList.length ? e.promiseObjectList.pop() : new t.PromiseObject
        }
        ,
        e.prototype.onSuccess = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            this.onSuccessFunc && this.onSuccessFunc.apply(this.onSuccessThisObject, t),
            this.destroy()
        }
        ,
        e.prototype.onError = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            this.onErrorFunc && this.onErrorFunc.apply(this.onErrorThisObject, t),
            this.destroy()
        }
        ,
        e.prototype.downloadingSize = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            this.downloadingSizeFunc && this.downloadingSizeFunc.apply(this.downloadingSizeThisObject, t)
        }
        ,
        e.prototype.onResponseHeader = function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            this.onResponseHeaderFunc && this.onResponseHeaderFunc.apply(this.onResponseHeaderThisObject, t)
        }
        ,
        e.prototype.destroy = function() {
            this.onSuccessFunc = void 0,
            this.onSuccessThisObject = void 0,
            this.onErrorFunc = void 0,
            this.onErrorThisObject = void 0,
            this.downloadingSizeFunc = void 0,
            this.downloadingSizeThisObject = void 0,
            this.onResponseHeaderFunc = void 0,
            this.onResponseHeaderThisObject = void 0,
            e.promiseObjectList.push(this)
        }
        ,
        e.promiseObjectList = [],
        e
    }();
    t.PromiseObject = e,
    __reflect(e.prototype, "egret.PromiseObject")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.GET = "GET",
        t.POST = "POST",
        t
    }();
    t.HttpMethod = e,
    __reflect(e.prototype, "egret.HttpMethod")
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.TEXT = "text",
        t.ARRAY_BUFFER = "arraybuffer",
        t
    }();
    t.HttpResponseType = e,
    __reflect(e.prototype, "egret.HttpResponseType")
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        function i(t, e) {
            var i = t.minX < e.minX ? t.minX : e.minX
              , r = t.minY < e.minY ? t.minY : e.minY
              , n = t.maxX > e.maxX ? t.maxX : e.maxX
              , o = t.maxY > e.maxY ? t.maxY : e.maxY;
            return (n - i) * (o - r)
        }
        var r = function() {
            function r(e) {
                this.dirtyList = [],
                this.hasClipRect = !1,
                this.clipWidth = 0,
                this.clipHeight = 0,
                this.clipArea = 0,
                this.clipRectChanged = !1,
                this.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON,
                this.root = e
            }
            return r.prototype.setClipRect = function(t, e) {
                this.hasClipRect = !0,
                this.clipRectChanged = !0,
                this.clipWidth = Math.ceil(t),
                this.clipHeight = Math.ceil(e),
                this.clipArea = this.clipWidth * this.clipHeight
            }
            ,
            r.prototype.addRegion = function(i) {
                var r = i.minX
                  , n = i.minY
                  , o = i.maxX
                  , a = i.maxY;
                if (this.hasClipRect && (0 > r && (r = 0),
                0 > n && (n = 0),
                o > this.clipWidth && (o = this.clipWidth),
                a > this.clipHeight && (a = this.clipHeight)),
                r >= o || n >= a)
                    return !1;
                if (this.clipRectChanged)
                    return !0;
                var s = this.dirtyList
                  , h = e.Region.create();
                return s.push(h.setTo(r, n, o, a)),
                this.$dirtyRegionPolicy != t.DirtyRegionPolicy.OFF && this.mergeDirtyList(s),
                !0
            }
            ,
            r.prototype.clear = function() {
                for (var t = this.dirtyList, i = t.length, r = 0; i > r; r++)
                    e.Region.release(t[r]);
                t.length = 0
            }
            ,
            r.prototype.getDirtyRegions = function() {
                var i = this.dirtyList;
                if (this.$dirtyRegionPolicy == t.DirtyRegionPolicy.OFF) {
                    this.clipRectChanged = !0,
                    this.clear();
                    var r = e.Region.create();
                    if (this.hasClipRect)
                        i.push(r.setTo(0, 0, this.clipWidth, this.clipHeight));
                    else {
                        var n = this.root.$getOriginalBounds();
                        i.push(r.setTo(n.x, n.y, n.width, n.height))
                    }
                } else if (this.clipRectChanged) {
                    this.clipRectChanged = !1,
                    this.clear();
                    var r = e.Region.create();
                    i.push(r.setTo(0, 0, this.clipWidth, this.clipHeight))
                } else
                    for (; this.mergeDirtyList(i); )
                        ;
                var o = this.dirtyList.length;
                if (o > 0)
                    for (var a = 0; o > a; a++)
                        this.dirtyList[a].intValues();
                return this.dirtyList
            }
            ,
            r.prototype.mergeDirtyList = function(t) {
                var r = t.length;
                if (2 > r)
                    return !1;
                for (var n = this.hasClipRect, o = r > 3 ? Number.POSITIVE_INFINITY : 0, a = 0, s = 0, h = 0, l = 0; r - 1 > l; l++) {
                    var u = t[l];
                    n && (h += u.area);
                    for (var c = l + 1; r > c; c++) {
                        var p = t[c]
                          , d = i(u, p) - u.area - p.area;
                        o > d && (a = l,
                        s = c,
                        o = d)
                    }
                }
                if (n && h / this.clipArea > .95 && (this.clipRectChanged = !0),
                a != s) {
                    var f = t[s];
                    return t[a].union(f),
                    e.Region.release(f),
                    t.splice(s, 1),
                    !0
                }
                return !1
            }
            ,
            r.prototype.setDirtyRegionPolicy = function(t) {
                this.$dirtyRegionPolicy = t
            }
            ,
            r
        }();
        e.DirtyRegion = r,
        __reflect(r.prototype, "egret.sys.DirtyRegion")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function(i) {
            function r(n) {
                var o = i.call(this) || this;
                return o.isStage = !1,
                o.$renderNode = new e.BitmapNode,
                o.renderBuffer = null,
                o.offsetX = 0,
                o.offsetY = 0,
                o.offsetMatrix = new t.Matrix,
                o.isDirty = !1,
                o.needUpdateRegions = !1,
                o.dirtyNodeList = [],
                o.dirtyList = null,
                o.sizeChanged = !1,
                o.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON,
                o.root = n,
                o.dirtyRegion = new e.DirtyRegion(n),
                o.isStage = n instanceof t.Stage,
                o.dirtyNodes = t.createMap(),
                o.offsetMatrix.a = o.offsetMatrix.d = r.$pixelRatio,
                o
            }
            return __extends(r, i),
            r.create = function(i) {
                var r = new t.sys.DisplayList(i);
                try {
                    var n = new e.RenderBuffer;
                    r.renderBuffer = n
                } catch (o) {
                    return null
                }
                if (r.root = i,
                "webgl" == t.Capabilities.$renderMode) {
                    var a = t.DirtyRegionPolicy.OFF;
                    r.$dirtyRegionPolicy = a,
                    r.dirtyRegion.setDirtyRegionPolicy(a),
                    r.renderBuffer.setDirtyRegionPolicy(a)
                }
                return r
            }
            ,
            r.prototype.$getRenderNode = function() {
                return this.$renderNode
            }
            ,
            r.prototype.$update = function(e) {
                var i = this.root;
                if (null == i)
                    return !1;
                i.$removeFlagsUp(768);
                var r = this.$renderNode
                  , n = i.$getConcatenatedMatrix()
                  , o = i.$parentDisplayList;
                if (e == t.DirtyRegionPolicy.OFF) {
                    if (this.needUpdateRegions && this.updateDirtyRegions(),
                    !o)
                        return !1;
                    var a = r.renderMatrix;
                    a.copyFrom(n);
                    var s = o.root;
                    s !== i.$stage && i.$getConcatenatedMatrixAt(s, a),
                    r.renderAlpha = i.$getConcatenatedAlpha()
                } else {
                    var h = i.$getOriginalBounds()
                      , l = r.renderRegion;
                    if (this.needUpdateRegions && this.updateDirtyRegions(),
                    !o)
                        return l.setTo(0, 0, 0, 0),
                        r.moved = !1,
                        !1;
                    if (!r.moved)
                        return !1;
                    r.moved = !1;
                    var a = r.renderMatrix;
                    a.copyFrom(n);
                    var s = o.root;
                    s !== i.$stage && i.$getConcatenatedMatrixAt(s, a),
                    l.updateRegion(h, a),
                    r.renderAlpha = i.$getConcatenatedAlpha()
                }
                return !0
            }
            ,
            r.prototype.setClipRect = function(t, e) {
                this.dirtyRegion.setClipRect(t, e),
                t *= r.$pixelRatio,
                e *= r.$pixelRatio,
                this.renderBuffer.resize(t, e)
            }
            ,
            r.prototype.markDirty = function(t) {
                var e = t.$hashCode;
                if (!this.dirtyNodes[e] && (this.dirtyNodes[e] = !0,
                this.dirtyNodeList.push(t),
                !this.needUpdateRegions)) {
                    this.needUpdateRegions = !0,
                    this.isDirty = !0;
                    var i = this.root.$parentDisplayList;
                    i && i.markDirty(this)
                }
            }
            ,
            r.prototype.updateDirtyRegions = function() {
                var e = this.dirtyNodeList;
                this.dirtyNodeList = [],
                this.dirtyNodes = t.createMap(),
                this.needUpdateRegions = !1;
                for (var i = this.dirtyRegion, r = e.length, n = 0; r > n; n++) {
                    var o = e[n]
                      , a = o.$getRenderNode();
                    if (a)
                        if (a.needRedraw = !1,
                        this.isStage) {
                            a.renderAlpha > 0 && a.renderVisible && i.addRegion(a.renderRegion) && (a.needRedraw = !0);
                            var s = o.$update(this.$dirtyRegionPolicy);
                            a.renderAlpha > 0 && a.renderVisible && (s || !a.needRedraw) && i.addRegion(a.renderRegion) && (a.needRedraw = !0)
                        } else {
                            i.addRegion(a.renderRegion) && (a.needRedraw = !0);
                            var s = o.$update(this.$dirtyRegionPolicy);
                            (s || !a.needRedraw) && i.addRegion(a.renderRegion) && (a.needRedraw = !0)
                        }
                }
                return this.dirtyList = i.getDirtyRegions(),
                this.dirtyList
            }
            ,
            r.prototype.drawToSurface = function() {
                var i = 0
                  , n = this.dirtyList;
                if (n && n.length > 0) {
                    this.isStage || this.changeSurfaceSize();
                    var o = this.renderBuffer;
                    if (o.beginClip(this.dirtyList, this.offsetX, this.offsetY),
                    n = this.$dirtyRegionPolicy == t.DirtyRegionPolicy.OFF ? null : this.dirtyList,
                    i = e.systemRenderer.render(this.root, o, this.offsetMatrix, n, !this.isStage),
                    o.endClip(),
                    !this.isStage) {
                        var a = o.surface
                          , s = this.$renderNode;
                        s.drawData.length = 0;
                        var h = a.width
                          , l = a.height;
                        this.bitmapData ? (this.bitmapData.source = a,
                        this.bitmapData.width = h,
                        this.bitmapData.height = l) : this.bitmapData = new t.BitmapData(a),
                        s.image = this.bitmapData,
                        s.imageWidth = h,
                        s.imageHeight = l,
                        s.drawImage(0, 0, h, l, -this.offsetX / r.$pixelRatio, -this.offsetY / r.$pixelRatio, h / r.$pixelRatio, l / r.$pixelRatio)
                    }
                }
                return this.dirtyList = null,
                this.dirtyRegion.clear(),
                this.isDirty = !1,
                i
            }
            ,
            r.prototype.changeSurfaceSize = function() {
                var t = (this.root,
                this.offsetX)
                  , e = this.offsetY
                  , i = this.root.$getOriginalBounds()
                  , n = r.$pixelRatio
                  , o = r.$pixelRatio;
                this.offsetX = -i.x * r.$pixelRatio,
                this.offsetY = -i.y * r.$pixelRatio,
                this.offsetMatrix.setTo(this.offsetMatrix.a, 0, 0, this.offsetMatrix.d, this.offsetX, this.offsetY);
                var a = this.renderBuffer
                  , s = Math.max(257, i.width * n)
                  , h = Math.max(257, i.height * o);
                (this.offsetX != t || this.offsetY != e || a.surface.width != s || a.surface.height != h) && (this.sizeChanged ? a.resizeTo(s, h, this.offsetX - t, this.offsetY - e) : (this.sizeChanged = !0,
                a.resize(s, h)))
            }
            ,
            r.prototype.setDirtyRegionPolicy = function(t) {
                this.$dirtyRegionPolicy = t,
                this.dirtyRegion.setDirtyRegionPolicy(t),
                this.renderBuffer.setDirtyRegionPolicy(t)
            }
            ,
            r.$setDevicePixelRatio = function(t) {
                r.$pixelRatio != t && (r.$pixelRatio = t)
            }
            ,
            r.$preMultiplyInto = function(t) {
                var e = r.$pixelRatio
                  , i = t.a * e
                  , n = 0
                  , o = 0
                  , a = t.d * e
                  , s = t.tx * e
                  , h = t.ty * e;
                (0 !== t.b || 0 !== t.c) && (n += t.b * e,
                o += t.c * e),
                t.a = i,
                t.b = n,
                t.c = o,
                t.d = a,
                t.tx = s,
                t.ty = h
            }
            ,
            r.$pixelRatio = 1,
            r
        }(t.HashObject);
        e.DisplayList = i,
        __reflect(i.prototype, "egret.sys.DisplayList", ["egret.sys.Renderable"])
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        function i(i, r, n, o) {
            if (r && (t.log = function() {
                for (var t = arguments.length, i = "", r = 0; t > r; r++)
                    i += arguments[r] + " ";
                e.$logToFPS(i),
                console.log.apply(console, a(arguments))
            }
            ),
            l = o ? {} : o,
            r = !!r,
            this.showFPS = !!i,
            this.showLog = r,
            !this.fps) {
                var s = void 0 === o.x ? 0 : o.x
                  , c = void 0 === o.y ? 0 : o.y;
                h = this.fps = new FPS(this.stage,i,r,n,o),
                h.x = s,
                h.y = c;
                for (var p = u.length, d = 0; p > d; d++)
                    h.updateInfo(u[d]);
                u = null
            }
        }
        function r(t) {
            t = !!t,
            this._showPaintRect != t && (this._showPaintRect = t,
            t ? (this.stageDisplayList || (this.stageDisplayList = e.DisplayList.create(this.stage)),
            this.stage.$displayList = this.stageDisplayList) : this.stage.$displayList = this.screenDisplayList)
        }
        function n(t) {
            for (var i = t.length, r = [], n = 0; i > n; n++) {
                var o = t[n];
                r[n] = [o.minX, o.minY, o.width, o.height],
                o.width -= 1,
                o.height -= 1
            }
            var a = this.paintList;
            a.push(r),
            a.length > 1 && a.shift();
            var s = this.screenDisplayList.renderBuffer
              , h = s.context;
            h.setTransform(1, 0, 0, 1, 0, 0),
            h.clearRect(0, 0, s.surface.width, s.surface.height),
            h.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0),
            i = a.length;
            for (var n = 0; i > n; n++) {
                r = a[n];
                for (var l = r.length - 1; l >= 0; l--) {
                    var u = r[l]
                }
            }
            h.save(),
            h.beginPath(),
            i = t.length;
            for (var n = 0; i > n; n++) {
                var o = t[n]
                  , c = e.DisplayList.$pixelRatio;
                h.clearRect(o.minX * c, o.minY * c, o.width * c, o.height * c),
                h.rect(o.minX * c, o.minY * c, o.width * c, o.height * c)
            }
            h.clip(),
            h.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0),
            h.restore()
        }
        function o(t, i, r, n, o) {
            o.strokeStyle = "rgb(255,0,0)",
            o.lineWidth = 5;
            var a = e.DisplayList.$pixelRatio;
            o.strokeRect(t * a - .5, i * a - .5, r * a, n * a)
        }
        function a(t) {
            for (var e = [], i = 0; i < t.length; i++)
                e.push(t[i]);
            return e
        }
        var s = function(a) {
            function s(t, e, s) {
                var h = a.call(this) || this;
                return h.isPlaying = !1,
                h.entryClassName = s,
                h.stage = e,
                h.screenDisplayList = h.createDisplayList(e, t),
                h.showFPS = !1,
                h.showLog = !1,
                h._showPaintRect = !1,
                h.stageDisplayList = null,
                h.paintList = [],
                h.displayFPS = i,
                h.showPaintRect = r,
                h.drawPaintRect = n,
                h.drawDirtyRect = o,
                h
            }
            return __extends(s, a),
            s.prototype.createDisplayList = function(t, i) {
                var r = new e.DisplayList(t);
                return r.renderBuffer = i,
                t.$displayList = r,
                r
            }
            ,
            s.prototype.start = function() {
                !this.isPlaying && this.stage && (e.$TempStage = e.$TempStage || this.stage,
                this.isPlaying = !0,
                this.root || this.initialize(),
                t.ticker.$addPlayer(this))
            }
            ,
            s.prototype.initialize = function() {
                var e;
                if (this.entryClassName && (e = t.getDefinitionByName(this.entryClassName)),
                e) {
                    var i = new e;
                    this.root = i,
                    i instanceof t.DisplayObject && this.stage.addChild(i)
                }
            }
            ,
            s.prototype.stop = function() {
                this.pause(),
                this.stage = null
            }
            ,
            s.prototype.pause = function() {
                this.isPlaying && (this.isPlaying = !1,
                t.ticker.$removePlayer(this))
            }
            ,
            s.prototype.$render = function(e, i) {
                (this.showFPS || this.showLog) && this.stage.addChild(this.fps);
                var r = this.stage
                  , n = t.getTimer()
                  , o = r.$displayList.updateDirtyRegions()
                  , a = t.getTimer();
                o = o.concat();
                var s = r.$displayList.drawToSurface();
                this._showPaintRect && this.drawPaintRect(o);
                var h = t.getTimer();
                if (e && this.showFPS) {
                    var l = 0;
                    if (s > 0) {
                        for (var u = o.length, c = 0, p = 0; u > p; p++)
                            c += o[p].area;
                        l = Math.ceil(1e3 * c / (r.stageWidth * r.stageHeight)) / 10
                    }
                    this.fps.update(s, l, a - n, h - a, i)
                }
            }
            ,
            s.prototype.updateStageSize = function(e, i) {
                var r = this.stage;
                r.$stageWidth = e,
                r.$stageHeight = i,
                this.screenDisplayList.setClipRect(e, i),
                this.stageDisplayList && this.stageDisplayList.setClipRect(e, i),
                r.dispatchEventWith(t.Event.RESIZE),
                r.$invalidate(!0)
            }
            ,
            s
        }(t.HashObject);
        e.Player = s,
        __reflect(s.prototype, "egret.sys.Player");
        var h, l, u = [];
        e.$logToFPS = function(t) {
            return h ? void h.updateInfo(t) : void u.push(t)
        }
        ,
        FPS = function(e) {
            function i(i, r, n, o, a) {
                e.call(this),
                this.isFPS = !0,
                this.infoLines = [],
                this.totalTime = 0,
                this.totalTick = 0,
                this.lastTime = 0,
                this.drawCalls = 0,
                this.dirtyRatio = 0,
                this.costDirty = 0,
                this.costRender = 0,
                this.costTicker = 0,
                this._stage = i,
                this.showFPS = r,
                this.showLog = n,
                this.logFilter = o,
                this.touchChildren = !1,
                this.touchEnabled = !1,
                this.styles = a,
                this.fpsDisplay = new t.FPSDisplay(i,r,n,o,a),
                this.addChild(this.fpsDisplay);
                var s;
                try {
                    s = o ? new RegExp(o) : null
                } catch (h) {
                    t.log(h)
                }
                this.filter = function(t) {
                    return s ? s.test(t) : !o || 0 == t.indexOf(o)
                }
            }
            return __extends(i, e),
            i.prototype.update = function(e, i, r, n, o) {
                var a = t.getTimer();
                if (this.totalTime += a - this.lastTime,
                this.lastTime = a,
                this.totalTick++,
                this.drawCalls += e,
                this.dirtyRatio += i,
                this.costDirty += r,
                this.costRender += n,
                this.costTicker += o,
                this.totalTime >= 1e3) {
                    var s = Math.min(Math.ceil(1e3 * this.totalTick / this.totalTime), t.ticker.$frameRate)
                      , h = Math.round(this.drawCalls / this.totalTick)
                      , l = Math.round(this.dirtyRatio / this.totalTick)
                      , u = Math.round(this.costDirty / this.totalTick)
                      , c = Math.round(this.costRender / this.totalTick)
                      , p = Math.round(this.costTicker / this.totalTick);
                    this.fpsDisplay.update({
                        fps: s,
                        draw: h,
                        dirty: l,
                        costTicker: p,
                        costDirty: u,
                        costRender: c
                    }),
                    this.totalTick = 0,
                    this.totalTime = this.totalTime % 1e3,
                    this.drawCalls = 0,
                    this.dirtyRatio = 0,
                    this.costDirty = 0,
                    this.costRender = 0,
                    this.costTicker = 0
                }
            }
            ,
            i.prototype.updateInfo = function(t) {
                t && this.showLog && this.filter(t) && this.fpsDisplay.updateInfo(t)
            }
            ,
            i
        }(t.Sprite),
        t.warn = function() {
            console.warn.apply(console, a(arguments))
        }
        ,
        t.error = function() {
            console.error.apply(console, a(arguments))
        }
        ,
        t.assert = function() {
            console.assert.apply(console, a(arguments))
        }
        ,
        t.log = function() {
            console.log.apply(console, a(arguments))
        }
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    t.OrientationMode = {
        AUTO: "auto",
        PORTRAIT: "portrait",
        LANDSCAPE: "landscape",
        LANDSCAPE_FLIPPED: "landscapeFlipped"
    }
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = []
          , i = function() {
            function t() {
                this.minX = 0,
                this.minY = 0,
                this.maxX = 0,
                this.maxY = 0,
                this.width = 0,
                this.height = 0,
                this.area = 0,
                this.moved = !1
            }
            return t.release = function(t) {
                e.push(t)
            }
            ,
            t.create = function() {
                var i = e.pop();
                return i || (i = new t),
                i
            }
            ,
            t.prototype.setTo = function(t, e, i, r) {
                return this.minX = t,
                this.minY = e,
                this.maxX = i,
                this.maxY = r,
                this.updateArea(),
                this
            }
            ,
            t.prototype.intValues = function() {
                this.minX = Math.floor(this.minX),
                this.minY = Math.floor(this.minY),
                this.maxX = Math.ceil(this.maxX),
                this.maxY = Math.ceil(this.maxY),
                this.updateArea()
            }
            ,
            t.prototype.updateArea = function() {
                this.width = this.maxX - this.minX,
                this.height = this.maxY - this.minY,
                this.area = this.width * this.height
            }
            ,
            t.prototype.union = function(t) {
                this.minX > t.minX && (this.minX = t.minX),
                this.minY > t.minY && (this.minY = t.minY),
                this.maxX < t.maxX && (this.maxX = t.maxX),
                this.maxY < t.maxY && (this.maxY = t.maxY),
                this.updateArea()
            }
            ,
            t.prototype.intersect = function(t) {
                return this.minX < t.minX && (this.minX = t.minX),
                this.maxX > t.maxX && (this.maxX = t.maxX),
                this.minX >= this.maxX ? void this.setEmpty() : (this.minY < t.minY && (this.minY = t.minY),
                this.maxY > t.maxY && (this.maxY = t.maxY),
                this.minY >= this.maxY ? void this.setEmpty() : void this.updateArea())
            }
            ,
            t.prototype.setEmpty = function() {
                this.minX = 0,
                this.minY = 0,
                this.maxX = 0,
                this.maxY = 0,
                this.width = 0,
                this.height = 0,
                this.area = 0
            }
            ,
            t.prototype.isEmpty = function() {
                return this.width <= 0 || this.height <= 0
            }
            ,
            t.prototype.intersects = function(t) {
                if (this.isEmpty())
                    return !1;
                var e = this.minX > t.minX ? this.minX : t.minX
                  , i = this.maxX < t.maxX ? this.maxX : t.maxX;
                return e > i ? !1 : (e = this.minY > t.minY ? this.minY : t.minY,
                i = this.maxY < t.maxY ? this.maxY : t.maxY,
                i >= e)
            }
            ,
            t.prototype.updateRegion = function(t, e) {
                if (0 == t.width || 0 == t.height)
                    return void this.setEmpty();
                var i, r, n, o, a = e, s = a.a, h = a.b, l = a.c, u = a.d, c = a.tx, p = a.ty, d = t.x, f = t.y, g = d + t.width, y = f + t.height;
                if (1 == s && 0 == h && 0 == l && 1 == u)
                    i = d + c - 1,
                    r = f + p - 1,
                    n = g + c + 1,
                    o = y + p + 1;
                else {
                    var v = s * d + l * f + c
                      , $ = h * d + u * f + p
                      , m = s * g + l * f + c
                      , b = h * g + u * f + p
                      , x = s * g + l * y + c
                      , T = h * g + u * y + p
                      , _ = s * d + l * y + c
                      , w = h * d + u * y + p
                      , O = 0;
                    v > m && (O = v,
                    v = m,
                    m = O),
                    x > _ && (O = x,
                    x = _,
                    _ = O),
                    i = (x > v ? v : x) - 1,
                    n = (m > _ ? m : _) + 1,
                    $ > b && (O = $,
                    $ = b,
                    b = O),
                    T > w && (O = T,
                    T = w,
                    w = O),
                    r = (T > $ ? $ : T) - 1,
                    o = (b > w ? b : w) + 1
                }
                this.minX = i,
                this.minY = r,
                this.maxX = n,
                this.maxY = o,
                this.width = n - i,
                this.height = o - r,
                this.area = this.width * this.height
            }
            ,
            t
        }();
        t.Region = i,
        __reflect(i.prototype, "egret.sys.Region")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function(e) {
            function i() {
                return e.call(this) || this
            }
            return __extends(i, e),
            i.prototype.calculateStageSize = function(e, i, r, n, o) {
                var a = i
                  , s = r
                  , h = n
                  , l = o
                  , u = i / h || 0
                  , c = r / l || 0;
                switch (e) {
                case t.StageScaleMode.EXACT_FIT:
                    break;
                case t.StageScaleMode.FIXED_HEIGHT:
                    h = Math.round(i / c);
                    break;
                case t.StageScaleMode.FIXED_WIDTH:
                    l = Math.round(r / u);
                    break;
                case t.StageScaleMode.NO_BORDER:
                    u > c ? s = Math.round(l * u) : a = Math.round(h * c);
                    break;
                case t.StageScaleMode.SHOW_ALL:
                    u > c ? a = Math.round(h * c) : s = Math.round(l * u);
                    break;
                case t.StageScaleMode.FIXED_NARROW:
                    u > c ? h = Math.round(i / c) : l = Math.round(r / u);
                    break;
                case t.StageScaleMode.FIXED_WIDE:
                    u > c ? l = Math.round(r / u) : h = Math.round(i / c);
                    break;
                default:
                    h = i,
                    l = r
                }
                return h % 2 != 0 && (h += 1),
                l % 2 != 0 && (l += 1),
                a % 2 != 0 && (a += 1),
                s % 2 != 0 && (s += 1),
                {
                    stageWidth: h,
                    stageHeight: l,
                    displayWidth: a,
                    displayHeight: s
                }
            }
            ,
            i
        }(t.HashObject);
        e.DefaultScreenAdapter = i,
        __reflect(i.prototype, "egret.sys.DefaultScreenAdapter", ["egret.sys.IScreenAdapter"])
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.NO_SCALE = "noScale",
        t.SHOW_ALL = "showAll",
        t.NO_BORDER = "noBorder",
        t.EXACT_FIT = "exactFit",
        t.FIXED_WIDTH = "fixedWidth",
        t.FIXED_HEIGHT = "fixedHeight",
        t.FIXED_NARROW = "fixedNarrow",
        t.FIXED_WIDE = "fixedWide",
        t
    }();
    t.StageScaleMode = e,
    __reflect(e.prototype, "egret.StageScaleMode")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        e.$START_TIME = 0,
        e.$invalidateRenderFlag = !1,
        e.$requestRenderingFlag = !1;
        var i = function() {
            function i() {
                this.playerList = [],
                this.callBackList = [],
                this.thisObjectList = [],
                this.$frameRate = 30,
                this.lastTimeStamp = 0,
                this.costEnterFrame = 0,
                this.isPaused = !1,
                e.$START_TIME = Date.now(),
                this.frameDeltaTime = 1e3 / this.$frameRate,
                this.lastCount = this.frameInterval = Math.round(6e4 / this.$frameRate)
            }
            return i.prototype.$addPlayer = function(t) {
                -1 == this.playerList.indexOf(t) && (this.playerList = this.playerList.concat(),
                this.playerList.push(t))
            }
            ,
            i.prototype.$removePlayer = function(t) {
                var e = this.playerList.indexOf(t);
                if (-1 !== e) {
                    this.playerList = this.playerList.concat(),
                    this.playerList.splice(e, 1)
                }
            }
            ,
            i.prototype.$startTick = function(t, e) {
                var i = this.getTickIndex(t, e);
                -1 == i && (this.concatTick(),
                this.callBackList.push(t),
                this.thisObjectList.push(e))
            }
            ,
            i.prototype.$stopTick = function(t, e) {
                var i = this.getTickIndex(t, e);
                -1 != i && (this.concatTick(),
                this.callBackList.splice(i, 1),
                this.thisObjectList.splice(i, 1))
            }
            ,
            i.prototype.getTickIndex = function(t, e) {
                for (var i = this.callBackList, r = this.thisObjectList, n = i.length - 1; n >= 0; n--)
                    if (i[n] == t && r[n] == e)
                        return n;
                return -1
            }
            ,
            i.prototype.concatTick = function() {
                this.callBackList = this.callBackList.concat(),
                this.thisObjectList = this.thisObjectList.concat()
            }
            ,
            i.prototype.$setFrameRate = function(e) {
                return e = +e || 0,
                0 >= e ? !1 : this.$frameRate == e ? !1 : (this.$frameRate = e,
                e > 60 && (e = 60),
                t.Capabilities.runtimeType == t.RuntimeType.NATIVE && (egret_native.setFrameRate(e),
                e = 60),
                this.frameDeltaTime = 1e3 / e,
                this.lastCount = this.frameInterval = Math.round(6e4 / e),
                !0)
            }
            ,
            i.prototype.pause = function() {
                this.isPaused = !0
            }
            ,
            i.prototype.resume = function() {
                this.isPaused = !1
            }
            ,
            i.prototype.update = function() {
                for (var i = t.getTimer(), r = this.callBackList, n = this.thisObjectList, o = r.length, a = e.$requestRenderingFlag, s = t.getTimer(), h = t.lifecycle.contexts, l = 0, u = h; l < u.length; l++) {
                    var c = u[l];
                    c.onUpdate && c.onUpdate()
                }
                if (this.isPaused)
                    return void (this.lastTimeStamp = s);
                this.callLaterAsyncs();
                for (var p = 0; o > p; p++)
                    r[p].call(n[p], s) && (a = !0);
                var d = t.getTimer()
                  , f = s - this.lastTimeStamp;
                if (this.lastTimeStamp = s,
                f >= this.frameDeltaTime)
                    this.lastCount = this.frameInterval;
                else {
                    if (this.lastCount -= 1e3,
                    this.lastCount > 0)
                        return void (a && this.render(!1, this.costEnterFrame + d - i));
                    this.lastCount += this.frameInterval
                }
                this.render(!0, this.costEnterFrame + d - i);
                var g = t.getTimer();
                this.broadcastEnterFrame();
                var y = t.getTimer();
                this.costEnterFrame = y - g
            }
            ,
            i.prototype.render = function(t, i) {
                var r = this.playerList
                  , n = r.length;
                if (0 != n) {
                    this.callLaters(),
                    e.$invalidateRenderFlag && (this.broadcastRender(),
                    e.$invalidateRenderFlag = !1);
                    for (var o = 0; n > o; o++)
                        r[o].$render(t, i);
                    e.$requestRenderingFlag = !1
                }
            }
            ,
            i.prototype.broadcastEnterFrame = function() {
                var e = t.DisplayObject.$enterFrameCallBackList
                  , i = e.length;
                if (0 != i) {
                    e = e.concat();
                    for (var r = 0; i > r; r++)
                        e[r].dispatchEventWith(t.Event.ENTER_FRAME)
                }
            }
            ,
            i.prototype.broadcastRender = function() {
                var e = t.DisplayObject.$renderCallBackList
                  , i = e.length;
                if (0 != i) {
                    e = e.concat();
                    for (var r = 0; i > r; r++)
                        e[r].dispatchEventWith(t.Event.RENDER)
                }
            }
            ,
            i.prototype.callLaters = function() {
                var e, i, r;
                if (t.$callLaterFunctionList.length > 0 && (e = t.$callLaterFunctionList,
                t.$callLaterFunctionList = [],
                i = t.$callLaterThisList,
                t.$callLaterThisList = [],
                r = t.$callLaterArgsList,
                t.$callLaterArgsList = []),
                e)
                    for (var n = e.length, o = 0; n > o; o++) {
                        var a = e[o];
                        null != a && a.apply(i[o], r[o])
                    }
            }
            ,
            i.prototype.callLaterAsyncs = function() {
                if (t.$callAsyncFunctionList.length > 0) {
                    var e = t.$callAsyncFunctionList
                      , i = t.$callAsyncThisList
                      , r = t.$callAsyncArgsList;
                    t.$callAsyncFunctionList = [],
                    t.$callAsyncThisList = [],
                    t.$callAsyncArgsList = [];
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        null != o && o.apply(i[n], r[n])
                    }
                }
            }
            ,
            i
        }();
        e.SystemTicker = i,
        __reflect(i.prototype, "egret.sys.SystemTicker")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {})),
function(t) {
    var e;
    !function(e) {
        function i(t) {
            var i = new n;
            e.contexts.push(i),
            t(i)
        }
        e.contexts = [];
        var r = !0
          , n = function() {
            function i() {}
            return i.prototype.pause = function() {
                r && (r = !1,
                e.stage.dispatchEvent(new t.Event(t.Event.DEACTIVATE)),
                e.onPause && e.onPause())
            }
            ,
            i.prototype.resume = function() {
                r || (r = !0,
                e.stage.dispatchEvent(new t.Event(t.Event.ACTIVATE)),
                e.onResume && e.onResume())
            }
            ,
            i
        }();
        e.LifecycleContext = n,
        __reflect(n.prototype, "egret.lifecycle.LifecycleContext"),
        e.addLifecycleListener = i
    }(e = t.lifecycle || (t.lifecycle = {})),
    t.ticker = new t.sys.SystemTicker
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function(e) {
            function i(t) {
                var i = e.call(this) || this;
                return i.maxTouches = 0,
                i.useTouchesCount = 0,
                i.touchDownTarget = {},
                i.lastTouchX = -1,
                i.lastTouchY = -1,
                i.stage = t,
                i
            }
            return __extends(i, e),
            i.prototype.$initMaxTouches = function() {
                this.maxTouches = this.stage.$maxTouches
            }
            ,
            i.prototype.onTouchBegin = function(e, i, r) {
                if (!(this.useTouchesCount >= this.maxTouches)) {
                    this.lastTouchX = e,
                    this.lastTouchY = i;
                    var n = this.findTarget(e, i);
                    null == this.touchDownTarget[r] && (this.touchDownTarget[r] = n,
                    this.useTouchesCount++),
                    t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_BEGIN, !0, !0, e, i, r, !0)
                }
            }
            ,
            i.prototype.onTouchMove = function(e, i, r) {
                if (null != this.touchDownTarget[r] && (this.lastTouchX != e || this.lastTouchY != i)) {
                    this.lastTouchX = e,
                    this.lastTouchY = i;
                    var n = this.findTarget(e, i);
                    t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_MOVE, !0, !0, e, i, r, !0)
                }
            }
            ,
            i.prototype.onTouchEnd = function(e, i, r) {
                if (null != this.touchDownTarget[r]) {
                    var n = this.findTarget(e, i)
                      , o = this.touchDownTarget[r];
                    delete this.touchDownTarget[r],
                    this.useTouchesCount--,
                    t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_END, !0, !0, e, i, r, !1),
                    o == n ? t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_TAP, !0, !0, e, i, r, !1) : t.TouchEvent.dispatchTouchEvent(o, t.TouchEvent.TOUCH_RELEASE_OUTSIDE, !0, !0, e, i, r, !1)
                }
            }
            ,
            i.prototype.findTarget = function(t, e) {
                var i = this.stage.$hitTest(t, e);
                return i || (i = this.stage),
                i
            }
            ,
            i
        }(t.HashObject);
        e.TouchHandler = i,
        __reflect(i.prototype, "egret.sys.TouchHandler")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function(e) {
            function i() {
                var t = e.call(this) || this;
                return t.image = null,
                t.smoothing = !0,
                t.blendMode = null,
                t.alpha = 0 / 0,
                t.filter = null,
                t.rotated = !1,
                t.type = 1,
                t
            }
            return __extends(i, e),
            i.prototype.drawImage = function(t, e, i, r, n, o, a, s) {
                this.drawData.push(t, e, i, r, n, o, a, s),
                this.renderCount++
            }
            ,
            i.prototype.cleanBeforeRender = function() {
                e.prototype.cleanBeforeRender.call(this),
                this.image = null,
                this.matrix = null,
                this.blendMode = null,
                this.alpha = 0 / 0,
                this.filter = null
            }
            ,
            i.$updateTextureData = function(e, r, n, o, a, s, h, l, u, c, p, d, f, g, y, v, $) {
                if (r) {
                    var m = t.$TextureScaleFactor;
                    if (e.smoothing = $,
                    e.image = r,
                    e.imageWidth = f,
                    e.imageHeight = g,
                    y)
                        i.$updateTextureDataWithScale9Grid(e, y, n, o, a, s, h, l, u, c, p, d);
                    else if (v == t.BitmapFillMode.SCALE) {
                        var b = p / u * m
                          , x = d / c * m;
                        e.drawImage(n, o, a, s, b * h, x * l, b * a, x * s)
                    } else if (v == t.BitmapFillMode.CLIP) {
                        var T = Math.min(u, p)
                          , _ = Math.min(c, d)
                          , w = a * m
                          , O = s * m;
                        i.drawClipImage(e, m, n, o, w, O, h, l, T, _)
                    } else
                        for (var w = a * m, O = s * m, E = 0; p > E; E += u)
                            for (var C = 0; d > C; C += c) {
                                var T = Math.min(p - E, u)
                                  , _ = Math.min(d - C, c);
                                i.drawClipImage(e, m, n, o, w, O, h, l, T, _, E, C)
                            }
                }
            }
            ,
            i.$updateTextureDataWithScale9Grid = function(e, i, r, n, o, a, s, h, l, u, c, p) {
                var d = o
                  , f = a;
                c -= l - o * t.$TextureScaleFactor,
                p -= u - a * t.$TextureScaleFactor;
                var g = i.x - s
                  , y = i.y - h
                  , v = g / t.$TextureScaleFactor
                  , $ = y / t.$TextureScaleFactor
                  , m = i.width / t.$TextureScaleFactor
                  , b = i.height / t.$TextureScaleFactor;
                0 == b && (b = 1,
                $ >= f && $--),
                0 == m && (m = 1,
                v >= d && v--);
                var x = r
                  , T = x + v
                  , _ = T + m
                  , w = d - v - m
                  , O = n
                  , E = O + $
                  , C = E + b
                  , F = f - $ - b
                  , R = w * t.$TextureScaleFactor
                  , P = F * t.$TextureScaleFactor;
                if ((v + w) * t.$TextureScaleFactor > c || ($ + F) * t.$TextureScaleFactor > p)
                    return void e.drawImage(r, n, o, a, s, h, c, p);
                var D = s
                  , S = D + g
                  , M = D + (c - R)
                  , A = c - g - R
                  , L = h
                  , B = L + y
                  , N = L + p - P
                  , j = p - y - P;
                $ > 0 && (v > 0 && e.drawImage(x, O, v, $, D, L, g, y),
                m > 0 && e.drawImage(T, O, m, $, S, L, A, y),
                w > 0 && e.drawImage(_, O, w, $, M, L, R, y)),
                b > 0 && (v > 0 && e.drawImage(x, E, v, b, D, B, g, j),
                m > 0 && e.drawImage(T, E, m, b, S, B, A, j),
                w > 0 && e.drawImage(_, E, w, b, M, B, R, j)),
                F > 0 && (v > 0 && e.drawImage(x, C, v, F, D, N, g, P),
                m > 0 && e.drawImage(T, C, m, F, S, N, A, P),
                w > 0 && e.drawImage(_, C, w, F, M, N, R, P))
            }
            ,
            i.drawClipImage = function(t, e, i, r, n, o, a, s, h, l, u, c) {
                void 0 === u && (u = 0),
                void 0 === c && (c = 0);
                var p = a + n - h;
                p > 0 && (n -= p),
                p = s + o - l,
                p > 0 && (o -= p),
                t.drawImage(i, r, n / e, o / e, u + a, c + s, n, o)
            }
            ,
            i
        }(e.RenderNode);
        e.BitmapNode = i,
        __reflect(i.prototype, "egret.sys.BitmapNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = ["none", "round", "square"]
          , r = ["bevel", "miter", "round"]
          , n = function(n) {
            function o() {
                var t = n.call(this) || this;
                return t.dirtyRender = !0,
                t.type = 3,
                t
            }
            return __extends(o, n),
            o.prototype.beginFill = function(t, i, r) {
                void 0 === i && (i = 1);
                var n = new e.FillPath;
                if (n.fillColor = t,
                n.fillAlpha = i,
                r) {
                    var o = this.drawData.lastIndexOf(r);
                    this.drawData.splice(o, 0, n)
                } else
                    this.drawData.push(n);
                return n
            }
            ,
            o.prototype.beginGradientFill = function(i, r, n, o, a, s) {
                var h = new t.Matrix;
                a ? (h.a = 819.2 * a.a,
                h.b = 819.2 * a.b,
                h.c = 819.2 * a.c,
                h.d = 819.2 * a.d,
                h.tx = a.tx,
                h.ty = a.ty) : (h.a = 100,
                h.d = 100);
                var l = new e.GradientFillPath;
                if (l.gradientType = i,
                l.colors = r,
                l.alphas = n,
                l.ratios = o,
                l.matrix = h,
                s) {
                    var u = this.drawData.lastIndexOf(s);
                    this.drawData.splice(u, 0, l)
                } else
                    this.drawData.push(l);
                return l
            }
            ,
            o.prototype.lineStyle = function(n, o, a, s, h, l) {
                void 0 === a && (a = 1),
                void 0 === l && (l = 3),
                -1 == i.indexOf(s) && (s = "round"),
                -1 == r.indexOf(h) && (h = "round");
                var u = new e.StrokePath;
                return u.lineWidth = n,
                u.lineColor = o,
                u.lineAlpha = a,
                u.caps = s || t.CapsStyle.ROUND,
                u.joints = h,
                u.miterLimit = l,
                this.drawData.push(u),
                u
            }
            ,
            o.prototype.clear = function() {
                this.drawData.length = 0,
                this.dirtyRender = !0
            }
            ,
            o.prototype.cleanBeforeRender = function() {}
            ,
            o.prototype.clean = function() {
                this.$texture && (t.WebGLUtils.deleteWebGLTexture(this.$texture),
                this.$texture = null,
                this.dirtyRender = !0)
            }
            ,
            o
        }(e.RenderNode);
        e.GraphicsNode = n,
        __reflect(n.prototype, "egret.sys.GraphicsNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 4,
                e
            }
            return __extends(e, t),
            e.prototype.addNode = function(t) {
                this.drawData.push(t)
            }
            ,
            e.prototype.cleanBeforeRender = function() {
                for (var t = this.drawData, e = t.length - 1; e >= 0; e--)
                    t[e].cleanBeforeRender()
            }
            ,
            e.prototype.$getRenderCount = function() {
                for (var t = 0, e = this.drawData, i = e.length - 1; i >= 0; i--)
                    t += e[i].$getRenderCount();
                return t
            }
            ,
            e
        }(t.RenderNode);
        t.GroupNode = e,
        __reflect(e.prototype, "egret.sys.GroupNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function(e) {
            function i() {
                var i = e.call(this) || this;
                return i.image = null,
                i.smoothing = !0,
                i.bounds = new t.Rectangle,
                i.blendMode = null,
                i.alpha = 0 / 0,
                i.filter = null,
                i.type = 7,
                i.vertices = [],
                i.uvs = [],
                i.indices = [],
                i
            }
            return __extends(i, e),
            i.prototype.drawMesh = function(t, e, i, r, n, o, a, s) {
                this.drawData.push(t, e, i, r, n, o, a, s),
                this.renderCount++
            }
            ,
            i.prototype.cleanBeforeRender = function() {
                e.prototype.cleanBeforeRender.call(this),
                this.image = null,
                this.matrix = null
            }
            ,
            i
        }(e.RenderNode);
        e.MeshNode = i,
        __reflect(i.prototype, "egret.sys.MeshNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            i.$renderBuffer = new t.sys.RenderBuffer;
            var r = new t.BitmapData(i.$renderBuffer.surface);
            return r.$deleteSource = !1,
            i._setBitmapData(r),
            i
        }
        return __extends(i, e),
        i.prototype.drawToTexture = function(e, i, r) {
            if (void 0 === r && (r = 1),
            i && (0 == i.width || 0 == i.height))
                return !1;
            var n = i || e.$getOriginalBounds();
            if (0 == n.width || 0 == n.height)
                return !1;
            r /= t.$TextureScaleFactor;
            var o = (n.x + n.width) * r
              , a = (n.y + n.height) * r;
            i && (o = n.width * r,
            a = n.height * r);
            var s = this.$renderBuffer;
            if (!s)
                return !1;
            s.resize(o, a),
            this._bitmapData.width = o,
            this._bitmapData.height = a;
            var h = t.Matrix.create();
            return h.identity(),
            i && h.translate(-i.x, -i.y),
            h.scale(r, r),
            t.sys.systemRenderer.render(e, s, h, null, !0),
            t.Matrix.release(h),
            this.$initData(0, 0, o, a, 0, 0, o, a, o, a),
            !0
        }
        ,
        i.prototype.getPixel32 = function(e, i) {
            var r;
            if (this.$renderBuffer) {
                var n = t.$TextureScaleFactor;
                e = Math.round(e / n),
                i = Math.round(i / n),
                r = this.$renderBuffer.getPixels(e, i, 1, 1)
            }
            return r
        }
        ,
        i.prototype.dispose = function() {
            e.prototype.dispose.call(this),
            this.$renderBuffer = null
        }
        ,
        i
    }(t.Texture);
    t.RenderTexture = e,
    __reflect(e.prototype, "egret.RenderTexture")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 6,
                e
            }
            return __extends(e, t),
            e.prototype.setAlpha = function(t) {
                0 != this.drawData.length && (this.drawData.length = 0),
                this.drawData.push(t),
                this.renderCount++
            }
            ,
            e
        }(t.RenderNode);
        t.SetAlphaNode = e,
        __reflect(e.prototype, "egret.sys.SetAlphaNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(e) {
        var i = function(e) {
            function i() {
                var t = e.call(this) || this;
                return t.textColor = 16777215,
                t.strokeColor = 0,
                t.size = 30,
                t.stroke = 0,
                t.bold = !1,
                t.italic = !1,
                t.fontFamily = "Arial",
                t.dirtyRender = !0,
                t.type = 2,
                t
            }
            return __extends(i, e),
            i.prototype.drawText = function(t, e, i, r) {
                this.drawData.push(t, e, i, r),
                this.renderCount++,
                this.dirtyRender = !0
            }
            ,
            i.prototype.cleanBeforeRender = function() {
                e.prototype.cleanBeforeRender.call(this)
            }
            ,
            i.prototype.clean = function() {
                this.$texture && (t.WebGLUtils.deleteWebGLTexture(this.$texture),
                this.$texture = null,
                this.dirtyRender = !0)
            }
            ,
            i
        }(e.RenderNode);
        e.TextNode = i,
        __reflect(i.prototype, "egret.sys.TextNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 1,
                e
            }
            return __extends(e, t),
            e
        }(t.Path2D);
        t.FillPath = e,
        __reflect(e.prototype, "egret.sys.FillPath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 2,
                e
            }
            return __extends(e, t),
            e
        }(t.Path2D);
        t.GradientFillPath = e,
        __reflect(e.prototype, "egret.sys.GradientFillPath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$graphics = new t.Graphics,
            i.$graphics.$setTarget(i),
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "graphics", {
            get: function() {
                return this.$graphics
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$measureContentBounds = function(t) {
            this.$graphics.$measureContentBounds(t)
        }
        ,
        i.prototype.$hitTest = function(t, i) {
            var r = e.prototype.$hitTest.call(this, t, i);
            return r == this && (r = this.$graphics.$hitTest(t, i)),
            r
        }
        ,
        i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this),
            this.$graphics && this.$graphics.$onRemoveFromStage()
        }
        ,
        i
    }(t.DisplayObject);
    t.Shape = e,
    __reflect(e.prototype, "egret.Shape")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 3,
                e
            }
            return __extends(e, t),
            e
        }(t.Path2D);
        t.StrokePath = e,
        __reflect(e.prototype, "egret.sys.StrokePath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t, e) {
        var i = null == e.italic ? t.italic : e.italic
          , r = null == e.bold ? t.bold : e.bold
          , n = null == e.size ? t.size : e.size
          , o = e.fontFamily || t.fontFamily
          , a = i ? "italic " : "normal ";
        return a += r ? "bold " : "normal ",
        a += n + "px " + o
    }
    function i(t, e) {
        var i = t >> 16
          , r = t >> 8 & 255
          , n = 255 & t;
        return "rgba(" + i + "," + r + "," + n + "," + e + ")"
    }
    function r(e, r, n, o, a, s) {
        var h;
        h = r == t.GradientType.LINEAR ? e.createLinearGradient(-1, 0, 1, 0) : e.createRadialGradient(0, 0, 0, 0, 0, 1);
        for (var l = n.length, u = 0; l > u; u++)
            h.addColorStop(a[u] / 255, i(n[u], o[u]));
        return h
    }
    function n(t, e, i) {
        void 0 === i && (i = 0);
        for (var r = 0, n = e.length; n > r; r++)
            t[r + i] = e[r]
    }
    function o(t, e, i, r) {
        for (var n = r[0], o = r[1], a = r[2], s = r[3], h = r[4], l = r[5], u = r[6], c = r[7], p = r[8], d = r[9], f = r[10], g = r[11], y = r[12], v = r[13], $ = r[14], m = r[15], b = r[16], x = r[17], T = r[18], _ = r[19], w = 0, O = e * i * 4; O > w; w += 4) {
            var E = t[w + 0]
              , C = t[w + 1]
              , F = t[w + 2]
              , R = t[w + 3];
            t[w + 0] = n * E + o * C + a * F + s * R + h,
            t[w + 1] = l * E + u * C + c * F + p * R + d,
            t[w + 2] = f * E + g * C + y * F + v * R + $,
            t[w + 3] = m * E + b * C + x * F + T * R + _
        }
    }
    function a(t, e, i, r, n) {
        s(t, e, i, r),
        h(t, e, i, n)
    }
    function s(t, e, i, r) {
        var o;
        o = _ ? new Uint8ClampedArray(4 * e) : new Array(4 * e);
        for (var a = 4 * e, s = 2 * r + 1, h = 0; i > h; h++) {
            for (var l = h * a, u = 0, c = 0, p = 0, d = 0, f = 0, g = 0, y = 4 * -r, v = 4 * r + 4; v > y; y += 4) {
                var $ = l + y;
                l > $ || $ >= l + a || (f = t[$ + 3],
                u += t[$ + 0] * f,
                c += t[$ + 1] * f,
                p += t[$ + 2] * f,
                d += f)
            }
            for (var y = l, v = l + a, m = 0, b = y - 4 * r, x = y + 4 * (r + 1); v > y; y += 4,
            m += 4,
            x += 4,
            b += 4)
                0 === d ? (o[m + 0] = 0,
                o[m + 1] = 0,
                o[m + 2] = 0,
                o[m + 3] = 0) : (o[m + 0] = u / d,
                o[m + 1] = c / d,
                o[m + 2] = p / d,
                o[m + 3] = d / s),
                f = t[x + 3],
                g = t[b + 3],
                f || 0 == f ? g || 0 == g ? (u += t[x + 0] * f - t[b + 0] * g,
                c += t[x + 1] * f - t[b + 1] * g,
                p += t[x + 2] * f - t[b + 2] * g,
                d += f - g) : (u += t[x + 0] * f,
                c += t[x + 1] * f,
                p += t[x + 2] * f,
                d += f) : (g || 0 == g) && (u += -t[b + 0] * g,
                c += -t[b + 1] * g,
                p += -t[b + 2] * g,
                d += -g);
            _ ? t.set(o, l) : n(t, o, l)
        }
    }
    function h(t, e, i, r) {
        var n;
        n = _ ? new Uint8ClampedArray(4 * i) : new Array(4 * i);
        for (var o = 4 * e, a = 2 * r + 1, s = 0; e > s; s++) {
            for (var h = 4 * s, l = 0, u = 0, c = 0, p = 0, d = 0, f = 0, g = -r * o, y = r * o + o; y > g; g += o) {
                var v = h + g;
                h > v || v >= h + i * o || (d = t[v + 3],
                l += t[v + 0] * d,
                u += t[v + 1] * d,
                c += t[v + 2] * d,
                p += d)
            }
            for (var g = h, y = h + i * o, $ = 0, m = h - r * o, b = h + (r + 1) * o; y > g; g += o,
            $ += 4,
            b += o,
            m += o)
                0 === p ? (n[$ + 0] = 0,
                n[$ + 1] = 0,
                n[$ + 2] = 0,
                n[$ + 3] = 0) : (n[$ + 0] = l / p,
                n[$ + 1] = u / p,
                n[$ + 2] = c / p,
                n[$ + 3] = p / a),
                d = t[b + 3],
                f = t[m + 3],
                d || 0 == d ? f || 0 == f ? (l += t[b + 0] * d - t[m + 0] * f,
                u += t[b + 1] * d - t[m + 1] * f,
                c += t[b + 2] * d - t[m + 2] * f,
                p += d - f) : (l += t[b + 0] * d,
                u += t[b + 1] * d,
                c += t[b + 2] * d,
                p += d) : (f || 0 == f) && (l += -t[m + 0] * f,
                u += -t[m + 1] * f,
                c += -t[m + 2] * f,
                p += -f);
            for (var x = 4 * s, y = x + i * o, T = 0; y > x; x += o,
            T += 4)
                t[x + 0] = n[T + 0],
                t[x + 1] = n[T + 1],
                t[x + 2] = n[T + 2],
                t[x + 3] = n[T + 3]
        }
    }
    function l(t, e, i, r, o, s, h, l, f) {
        var g = u(t, r);
        c(g, e, i, h, l),
        a(g, e, i, o, s),
        p(g, f),
        d(g, t),
        t.set(g),
        _ ? t.set(g) : n(t, g)
    }
    function u(t, e) {
        e || (e = [0, 0, 0, 0]);
        var i;
        _ ? i = new Uint8ClampedArray(t) : (i = new Array(t.length),
        n(i, t));
        for (var r = e[0], o = e[1], a = e[2], s = e[3], h = 0, l = i.length; l > h; h += 4) {
            var u = i[h + 3];
            i[h + 0] = r * u,
            i[h + 1] = o * u,
            i[h + 2] = a * u,
            i[h + 3] = s * u
        }
        return i
    }
    function c(t, e, i, r, o) {
        var a, s, h = Math.sin(r) * o | 0, l = Math.cos(r) * o | 0;
        if (_) {
            a = new Int32Array(t.buffer),
            s = new Int32Array(a.length);
            for (var u = 0; i > u; u++) {
                var c = u + h;
                if (!(0 > c || c > i))
                    for (var p = 0; e > p; p++) {
                        var d = p + l;
                        0 > d || d > e || (s[c * e + d] = a[u * e + p])
                    }
            }
            a.set(s)
        } else {
            a = t,
            s = new Array(a.length);
            for (var u = 0; i > u; u++) {
                var c = u + h;
                if (!(0 > c || c > i))
                    for (var p = 0; e > p; p++) {
                        var d = p + l;
                        0 > d || d > e || (s[4 * (c * e + d) + 0] = a[4 * (u * e + p) + 0],
                        s[4 * (c * e + d) + 1] = a[4 * (u * e + p) + 1],
                        s[4 * (c * e + d) + 2] = a[4 * (u * e + p) + 2],
                        s[4 * (c * e + d) + 3] = a[4 * (u * e + p) + 3])
                    }
            }
            n(a, s)
        }
    }
    function p(t, e) {
        for (var i = 0, r = t.length; r > i; i += 4)
            t[i + 3] *= e
    }
    function d(t, e) {
        for (var i = 0, r = t.length; r > i; i += 4) {
            var n = t[i + 0]
              , o = t[i + 1]
              , a = t[i + 2]
              , s = t[i + 3] / 255
              , h = e[i + 0]
              , l = e[i + 1]
              , u = e[i + 2]
              , c = e[i + 3] / 255;
            t[i + 0] = h + n * (1 - c),
            t[i + 1] = l + o * (1 - c),
            t[i + 2] = u + a * (1 - c),
            t[i + 3] = 255 * (c + s * (1 - c))
        }
    }
    function f(t, e, i) {
        return t * (1 - i) + e * i
    }
    function g(t, e, i, r, o, a, s, h, l, u, c, p) {
        var d;
        d = _ ? new Uint8ClampedArray(t.length) : new Array(t.length);
        for (var g, y, v = r[3], $ = 0, m = 0, b = h * Math.cos(s), x = h * Math.sin(s), T = 7, w = 12, O = 3.141592653589793, E = o / T, C = a / T, F = 0; e > F; F++)
            for (var R = 0; i > R; R++) {
                for (var P = 0, D = R * e * 4 + 4 * F, S = 0, M = 0, A = t[D + 0] / 255, L = t[D + 1] / 255, B = t[D + 2] / 255, N = t[D + 3] / 255, j = 0; 2 * O >= j; j += 2 * O / w) {
                    g = Math.cos(j + P),
                    y = Math.sin(j + P);
                    for (var k = 0; T > k; k++) {
                        $ = k * E * g,
                        m = k * C * y;
                        var I = Math.round(F + $ - b)
                          , X = Math.round(R + m - x)
                          , Y = 0;
                        if (I >= e || 0 > I || 0 > X || X >= i)
                            Y = 0;
                        else {
                            var U = X * e * 4 + 4 * I;
                            Y = t[U + 3] / 255
                        }
                        S += (T - k) * Y,
                        M += T - k
                    }
                }
                N = Math.max(N, 1e-4);
                var H = S / M * l * v * (1 - u) * Math.max(Math.min(p, c), 1 - N)
                  , W = (M - S) / M * l * v * u * N;
                N = Math.max(N * c * (1 - p), 1e-4);
                var G = W / (W + N)
                  , z = f(A, r[0], G)
                  , V = f(L, r[1], G)
                  , q = f(B, r[2], G)
                  , J = H / (W + N + H)
                  , K = f(z, r[0], J)
                  , Q = f(V, r[1], J)
                  , Z = f(q, r[2], J)
                  , te = Math.min(N + H + W, 1);
                d[D + 0] = 255 * K,
                d[D + 1] = 255 * Q,
                d[D + 2] = 255 * Z,
                d[D + 3] = 255 * te
            }
        _ ? t.set(d) : n(t, d)
    }
    var y = ["source-over", "lighter", "destination-out"]
      , v = "source-over"
      , $ = "#000000"
      , m = {
        none: "butt",
        square: "square",
        round: "round"
    }
      , b = []
      , x = []
      , T = function() {
        function n() {
            this.nestLevel = 0,
            this.renderingMask = !1
        }
        return n.prototype.render = function(t, e, i, r, n) {
            this.nestLevel++;
            var o = e.context
              , a = n ? t : null
              , s = this.drawDisplayObject(t, o, r, i, null, null, a);
            if (this.nestLevel--,
            0 === this.nestLevel) {
                b.length > 6 && (b.length = 6);
                for (var h = b.length, l = 0; h > l; l++)
                    b[l].resize(0, 0);
                x.length > 1 && (x.length = 1,
                x[0].resize(0, 0))
            }
            return s
        }
        ,
        n.prototype.drawDisplayObject = function(e, i, r, n, o, a, s) {
            var h, l = 0;
            if (o && !s ? (o.isDirty && (l += o.drawToSurface()),
            h = o.$renderNode) : h = e.$getRenderNode(),
            h) {
                if (r) {
                    var u = h.renderRegion;
                    if (a && !a.intersects(u))
                        h.needRedraw = !1;
                    else if (!h.needRedraw)
                        for (var c = r.length, p = 0; c > p; p++)
                            if (u.intersects(r[p])) {
                                h.needRedraw = !0;
                                break
                            }
                } else
                    h.needRedraw = !0;
                if (h.needRedraw) {
                    var d = void 0
                      , f = void 0;
                    s ? (d = e.$getConcatenatedAlphaAt(s, e.$getConcatenatedAlpha()),
                    f = t.Matrix.create().copyFrom(e.$getConcatenatedMatrix()),
                    e.$getConcatenatedMatrixAt(s, f)) : (d = h.renderAlpha,
                    f = t.Matrix.create().copyFrom(h.renderMatrix)),
                    n.$preMultiplyInto(f, f),
                    i.setTransform(f.a, f.b, f.c, f.d, f.tx, f.ty),
                    t.Matrix.release(f),
                    i.globalAlpha = d,
                    l += this.renderNode(h, i),
                    h.needRedraw = !1
                }
            }
            if (o && !s)
                return l;
            var g = e.$children;
            if (g)
                for (var y = g.length, v = 0; y > v; v++) {
                    var $ = g[v];
                    if (!(!$.$visible || $.$alpha <= 0 || $.$maskedObject)) {
                        var m = $.$getFilters();
                        m && m.length > 0 ? l += this.drawWithFilter($, i, r, n, a, s) : 0 !== $.$blendMode || $.$mask && ($.$mask.$parentDisplayList || s) ? l += this.drawWithClip($, i, r, n, a, s) : $.$scrollRect || $.$maskRect ? l += this.drawWithScrollRect($, i, r, n, a, s) : $.isFPS ? this.drawDisplayObject($, i, r, n, $.$displayList, a, s) : l += this.drawDisplayObject($, i, r, n, $.$displayList, a, s)
                    }
                }
            return l
        }
        ,
        n.prototype.drawWithFilter = function(e, i, r, n, s, h) {
            if (t.Capabilities.runtimeType == t.RuntimeType.NATIVE) {
                var u, c = 0, p = e.$getFilters(), d = 0 !== e.$blendMode;
                d && (u = y[e.$blendMode],
                u || (u = v));
                var f = e.$getOriginalBounds();
                if (f.width <= 0 || f.height <= 0)
                    return c;
                if (1 == p.length && "colorTransform" == p[0].type && !e.$children)
                    return d && (i.globalCompositeOperation = u),
                    i.setGlobalShader(p[0]),
                    c += e.$mask && (e.$mask.$parentDisplayList || h) ? this.drawWithClip(e, i, r, n, s, h) : e.$scrollRect || e.$maskRect ? this.drawWithScrollRect(e, i, r, n, s, h) : this.drawDisplayObject(e, i, r, n, e.$displayList, s, h),
                    i.setGlobalShader(null),
                    d && (i.globalCompositeOperation = v),
                    c;
                var $ = t.Matrix.create();
                $.copyFrom(e.$getConcatenatedMatrix()),
                h && e.$getConcatenatedMatrixAt(h, $);
                var m;
                m = t.sys.Region.create(),
                m.updateRegion(f, $);
                var T = this.createRenderBuffer(m.width, m.height);
                T.context.setTransform(1, 0, 0, 1, -m.minX, -m.minY);
                var _ = t.Matrix.create().setTo(1, 0, 0, 1, -m.minX, -m.minY);
                return c += e.$mask && (e.$mask.$parentDisplayList || h) ? this.drawWithClip(e, T.context, r, _, m, h) : e.$scrollRect || e.$maskRect ? this.drawWithScrollRect(e, T.context, r, _, m, h) : this.drawDisplayObject(e, T.context, r, _, e.$displayList, m, h),
                t.Matrix.release(_),
                c > 0 && (d && (i.globalCompositeOperation = u),
                c++,
                i.globalAlpha = 1,
                i.setTransform(1, 0, 0, 1, m.minX + n.tx, m.minY + n.ty),
                i.setGlobalShader(p[0]),
                i.drawImage(T.surface, 0, 0, T.width, T.height, 0, 0, T.width, T.height),
                i.setGlobalShader(null),
                d && (i.globalCompositeOperation = v)),
                b.push(T),
                t.sys.Region.release(m),
                t.Matrix.release($),
                c
            }
            var w, O = 0, E = e.$getFilters(), C = E.length, F = 0 !== e.$blendMode;
            F && (w = y[e.$blendMode],
            w || (w = v));
            var R = e.$getOriginalBounds();
            if (R.width <= 0 || R.height <= 0)
                return O;
            var P = t.Matrix.create();
            P.copyFrom(e.$getConcatenatedMatrix()),
            h && e.$getConcatenatedMatrixAt(h, P);
            var D;
            D = t.sys.Region.create(),
            D.updateRegion(R, P);
            var S = this.createRenderBuffer(D.width * n.a, D.height * n.d, !0)
              , M = S.context;
            M.setTransform(n.a, 0, 0, n.d, -D.minX * n.a, -D.minY * n.d);
            var A = t.Matrix.create().setTo(n.a, 0, 0, n.d, -D.minX * n.a, -D.minY * n.d);
            if (O += e.$mask && (e.$mask.$parentDisplayList || h) ? this.drawWithClip(e, M, r, A, D, h) : e.$scrollRect || e.$maskRect ? this.drawWithScrollRect(e, M, r, A, D, h) : this.drawDisplayObject(e, M, r, A, e.$displayList, D, h),
            t.Matrix.release(A),
            O > 0) {
                F && (i.globalCompositeOperation = w),
                O++;
                for (var L = M.getImageData(0, 0, S.surface.width, S.surface.height), B = 0; C > B; B++) {
                    var N = E[B];
                    if ("colorTransform" == N.type)
                        o(L.data, S.surface.width, S.surface.height, N.$matrix);
                    else if ("blur" == N.type)
                        a(L.data, S.surface.width, S.surface.height, N.$blurX, N.$blurY);
                    else if ("glow" == N.type) {
                        var j = N.$red
                          , k = N.$green
                          , I = N.$blue
                          , X = N.$alpha;
                        N.$inner || N.$knockout || N.$hideObject ? g(L.data, S.surface.width, S.surface.height, [j / 255, k / 255, I / 255, X], N.$blurX, N.$blurY, N.$angle ? N.$angle / 180 * Math.PI : 0, N.$distance || 0, N.$strength, N.$inner ? 1 : 0, N.$knockout ? 0 : 1, N.$hideObject ? 1 : 0) : l(L.data, S.surface.width, S.surface.height, [j / 255, k / 255, I / 255, X], N.$blurX, N.$blurY, N.$angle ? N.$angle / 180 * Math.PI : 0, N.$distance || 0, N.$strength)
                    } else
                        "custom" == N.type
                }
                M.putImageData(L, 0, 0),
                i.globalAlpha = 1,
                i.setTransform(1, 0, 0, 1, (D.minX + n.tx) * n.a, (D.minY + n.ty) * n.d),
                i.drawImage(S.surface, 0, 0),
                F && (i.globalCompositeOperation = v)
            }
            return x.push(S),
            t.sys.Region.release(D),
            t.Matrix.release(P),
            O
        }
        ,
        n.prototype.drawWithClip = function(e, i, r, n, o, a) {
            var s, h = 0, l = 0 !== e.$blendMode;
            l && (s = y[e.$blendMode],
            s || (s = v));
            var u, c = e.$scrollRect ? e.$scrollRect : e.$maskRect, p = e.$mask;
            if (p && (u = p.$getRenderNode())) {
                var d = u.renderMatrix;
                if (0 == d.a && 0 == d.b || 0 == d.c && 0 == d.d)
                    return h
            }
            var f, g = t.Matrix.create();
            if (g.copyFrom(e.$getConcatenatedMatrix()),
            a)
                e.$getConcatenatedMatrixAt(a, g);
            else if (e.$parentDisplayList) {
                var $ = e.$parentDisplayList.root;
                $ !== e.$stage && e.$getConcatenatedMatrixAt($, g)
            }
            var m;
            if (p) {
                m = p.$getOriginalBounds(),
                f = t.sys.Region.create();
                var x = t.Matrix.create();
                x.copyFrom(p.$getConcatenatedMatrix()),
                a && p.$getConcatenatedMatrixAt(a, x),
                f.updateRegion(m, x),
                t.Matrix.release(x)
            }
            var T;
            if (c && (T = t.sys.Region.create(),
            T.updateRegion(c, g)),
            T && f ? (T.intersect(f),
            t.sys.Region.release(f)) : !T && f && (T = f),
            T) {
                if (T.isEmpty() || o && !o.intersects(T))
                    return t.sys.Region.release(T),
                    t.Matrix.release(g),
                    h
            } else
                T = t.sys.Region.create(),
                m = e.$getOriginalBounds(),
                T.updateRegion(m, g);
            if (T.width <= 0 || T.height <= 0)
                return h;
            var _ = !1;
            if (r) {
                for (var w = r.length, O = 0; w > O; O++)
                    if (T.intersects(r[O])) {
                        _ = !0;
                        break
                    }
            } else
                _ = !0;
            if (!_)
                return t.sys.Region.release(T),
                t.Matrix.release(g),
                h;
            if (!(p || e.$children && 0 != e.$children.length)) {
                if (c) {
                    var x = g;
                    i.save(),
                    n.$preMultiplyInto(x, x),
                    i.setTransform(x.a, x.b, x.c, x.d, x.tx, x.ty),
                    i.beginPath(),
                    i.rect(c.x, c.y, c.width, c.height),
                    i.clip()
                }
                return l && (i.globalCompositeOperation = s),
                h += this.drawDisplayObject(e, i, r, n, e.$displayList, o, a),
                l && (i.globalCompositeOperation = v),
                c && i.restore(),
                t.sys.Region.release(T),
                t.Matrix.release(g),
                h
            }
            if (p && t.Capabilities.$runtimeType == t.RuntimeType.WEB && (!p.$children || 0 == p.$children.length) && u && 3 == u.type && 1 == u.drawData.length && 1 == u.drawData[0].type && 1 == u.drawData[0].fillAlpha) {
                this.renderingMask = !0,
                i.save();
                var E = this.drawDisplayObject(p, i, r, n, p.$displayList, o, a);
                if (this.renderingMask = !1,
                c) {
                    var x = g;
                    n.$preMultiplyInto(x, x),
                    i.setTransform(x.a, x.b, x.c, x.d, x.tx, x.ty),
                    i.beginPath(),
                    i.rect(c.x, c.y, c.width, c.height),
                    i.clip()
                }
                return E += this.drawDisplayObject(e, i, r, n, e.$displayList, o, a),
                i.restore(),
                t.sys.Region.release(T),
                t.Matrix.release(g),
                E
            }
            var C = this.createRenderBuffer(T.width * n.a, T.height * n.d)
              , F = C.context;
            if (!F)
                return h += this.drawDisplayObject(e, i, r, n, e.$displayList, o, a),
                t.sys.Region.release(T),
                t.Matrix.release(g),
                h;
            F.setTransform(n.a, 0, 0, n.d, -T.minX * n.a, -T.minY * n.d);
            var R = t.Matrix.create().setTo(n.a, 0, 0, n.d, -T.minX * n.a, -T.minY * n.d);
            if (h += this.drawDisplayObject(e, F, r, R, e.$displayList, T, a),
            p)
                if (t.Capabilities.$runtimeType == t.RuntimeType.WEB && u && 1 == u.$getRenderCount() || p.$displayList)
                    F.globalCompositeOperation = "destination-in",
                    h += this.drawDisplayObject(p, F, r, R, p.$displayList, T, a);
                else {
                    var P = this.createRenderBuffer(T.width * n.a, T.height * n.d)
                      , D = P.context;
                    if (!D)
                        return h += this.drawDisplayObject(e, i, r, n, e.$displayList, o, a),
                        b.push(C),
                        t.sys.Region.release(T),
                        t.Matrix.release(g),
                        h;
                    D.setTransform(n.a, 0, 0, n.d, -T.minX * n.a, -T.minY * n.d),
                    R = t.Matrix.create().setTo(n.a, 0, 0, n.d, -T.minX * n.a, -T.minY * n.d),
                    h += this.drawDisplayObject(p, D, r, R, p.$displayList, T, a),
                    F.globalCompositeOperation = "destination-in",
                    F.setTransform(1, 0, 0, 1, 0, 0),
                    F.globalAlpha = 1,
                    F.drawImage(P.surface, 0, 0),
                    b.push(P)
                }
            if (t.Matrix.release(R),
            h > 0) {
                if (h++,
                l && (i.globalCompositeOperation = s),
                c) {
                    var x = g;
                    i.save(),
                    n.$preMultiplyInto(x, x),
                    i.setTransform(x.a, x.b, x.c, x.d, x.tx, x.ty),
                    i.beginPath(),
                    i.rect(c.x, c.y, c.width, c.height),
                    i.clip()
                }
                i.globalAlpha = 1,
                i.setTransform(1, 0, 0, 1, (T.minX + n.tx) * n.a, (T.minY + n.ty) * n.d),
                i.drawImage(C.surface, 0, 0),
                c && i.restore(),
                l && (i.globalCompositeOperation = v)
            }
            return b.push(C),
            t.sys.Region.release(T),
            t.Matrix.release(g),
            h
        }
        ,
        n.prototype.drawWithScrollRect = function(e, i, r, n, o, a) {
            var s = 0
              , h = e.$scrollRect ? e.$scrollRect : e.$maskRect;
            if (h.isEmpty())
                return s;
            var l = t.Matrix.create();
            if (l.copyFrom(e.$getConcatenatedMatrix()),
            a)
                e.$getConcatenatedMatrixAt(a, l);
            else if (e.$parentDisplayList) {
                var u = e.$parentDisplayList.root;
                u !== e.$stage && e.$getConcatenatedMatrixAt(u, l)
            }
            var c = t.sys.Region.create();
            if (c.updateRegion(h, l),
            c.isEmpty() || o && !o.intersects(c))
                return t.sys.Region.release(c),
                t.Matrix.release(l),
                s;
            var p = !1;
            if (r) {
                for (var d = r.length, f = 0; d > f; f++)
                    if (c.intersects(r[f])) {
                        p = !0;
                        break
                    }
            } else
                p = !0;
            return p ? (i.save(),
            n.$preMultiplyInto(l, l),
            i.setTransform(l.a, l.b, l.c, l.d, l.tx, l.ty),
            i.beginPath(),
            i.rect(h.x, h.y, h.width, h.height),
            i.clip(),
            s += this.drawDisplayObject(e, i, r, n, e.$displayList, c, a),
            i.restore(),
            t.sys.Region.release(c),
            t.Matrix.release(l),
            s) : (t.sys.Region.release(c),
            t.Matrix.release(l),
            s)
        }
        ,
        n.prototype.drawNodeToBuffer = function(t, e, i, r) {
            var n = e.context;
            n.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty),
            this.renderNode(t, n, r)
        }
        ,
        n.prototype.renderNode = function(t, e, i) {
            var r = 0;
            switch (t.type) {
            case 1:
                r = this.renderBitmap(t, e);
                break;
            case 2:
                r = 1,
                this.renderText(t, e);
                break;
            case 3:
                r = this.renderGraphics(t, e, i);
                break;
            case 4:
                r = this.renderGroup(t, e);
                break;
            case 6:
                e.globalAlpha = t.drawData[0];
                break;
            case 7:
                r = this.renderMesh(t, e)
            }
            return r
        }
        ,
        n.prototype.renderMesh = function(e, i) {
            if (t.Capabilities.runtimeType != t.RuntimeType.NATIVE)
                return 0;
            var r = e.image
              , n = e.drawData
              , o = n.length
              , a = 0
              , s = e.matrix
              , h = e.blendMode
              , l = e.alpha;
            s && (i.saveTransform(),
            i.transform(s.a, s.b, s.c, s.d, s.tx, s.ty)),
            h && (i.globalCompositeOperation = y[h]);
            var u;
            l == l && (u = i.globalAlpha,
            i.globalAlpha *= l);
            var c = 0
              , p = e.filter;
            if (p) {
                for (egret_native.Graphics.setGlobalShader(p); o > a; )
                    c++,
                    i.drawMesh(r.source, n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds);
                egret_native.Graphics.setGlobalShader(null)
            } else
                for (; o > a; )
                    c++,
                    i.drawMesh(r.source, n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds);
            return s && i.restoreTransform(),
            h && (i.globalCompositeOperation = v),
            l == l && (i.globalAlpha = u),
            1
        }
        ,
        n.prototype.renderBitmap = function(e, i) {
            var r = e.image;
            if (!r || !r.source)
                return 0;
            i.$imageSmoothingEnabled != e.smoothing && (i.imageSmoothingEnabled = e.smoothing,
            i.$imageSmoothingEnabled = e.smoothing);
            var n = e.drawData
              , a = n.length
              , s = 0
              , h = e.matrix
              , l = e.blendMode
              , u = e.alpha
              , c = !1;
            h && (i.saveTransform ? i.saveTransform() : i.save(),
            c = !0,
            i.transform(h.a, h.b, h.c, h.d, h.tx, h.ty)),
            l && (i.globalCompositeOperation = y[l]);
            var p;
            u == u && (p = i.globalAlpha,
            i.globalAlpha *= u);
            var d = 0
              , f = e.filter;
            if (f && 8 == a)
                if (t.Capabilities.runtimeType == t.RuntimeType.NATIVE) {
                    if (egret_native.Graphics.setGlobalShader(f),
                    d++,
                    e.rotated) {
                        var g = n[0]
                          , $ = n[1]
                          , m = n[2]
                          , x = n[3]
                          , T = n[4]
                          , _ = n[5]
                          , w = n[6]
                          , O = n[7];
                        i.saveTransform ? i.saveTransform() : i.save(),
                        i.transform(0, -1, 1, 0, 0, O),
                        i.drawImage(r.source, g, $, x, m, T, _, O, w),
                        i.restoreTransform ? i.restoreTransform() : i.restore()
                    } else
                        i.drawImage(r.source, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7]);
                    egret_native.Graphics.setGlobalShader(null)
                } else {
                    var g = n[0]
                      , $ = n[1]
                      , x = n[2]
                      , m = n[3]
                      , T = n[4]
                      , _ = n[5]
                      , O = n[6]
                      , w = n[7];
                    e.rotated && (x = n[3],
                    m = n[2],
                    O = n[7],
                    w = n[6]);
                    var E = this.createRenderBuffer(O, w)
                      , C = E.context;
                    d++,
                    e.rotated && i.transform(0, -1, 1, 0, 0, O),
                    C.drawImage(r.source, g, $, x, m, 0, 0, O, w),
                    d++;
                    var F = C.getImageData(0, 0, O, w);
                    o(F.data, O, w, f.$matrix),
                    C.putImageData(F, 0, 0),
                    i.drawImage(E.surface, 0, 0, O, w, T, _, O, w),
                    b.push(E)
                }
            else
                for (; a > s; )
                    if (d++,
                    e.rotated) {
                        var g = n[s++]
                          , $ = n[s++]
                          , m = n[s++]
                          , x = n[s++]
                          , T = n[s++]
                          , _ = n[s++]
                          , w = n[s++]
                          , O = n[s++];
                        i.saveTransform ? i.saveTransform() : i.save(),
                        i.transform(0, -1, 1, 0, 0, O),
                        i.drawImage(r.source, g, $, x, m, T, _, O, w),
                        i.restoreTransform ? i.restoreTransform() : i.restore()
                    } else
                        i.drawImage(r.source, n[s++], n[s++], n[s++], n[s++], n[s++], n[s++], n[s++], n[s++]);
            return c ? i.restoreTransform ? (i.restoreTransform(),
            l && (i.globalCompositeOperation = v),
            u == u && (i.globalAlpha = p)) : i.restore() : (l && (i.globalCompositeOperation = v),
            u == u && (i.globalAlpha = p)),
            d
        }
        ,
        n.prototype.renderText = function(i, r) {
            r.textAlign = "left",
            r.textBaseline = "middle",
            r.lineJoin = "round";
            for (var n = i.drawData, o = n.length, a = 0; o > a; ) {
                var s = n[a++]
                  , h = n[a++]
                  , l = n[a++]
                  , u = n[a++];
                r.font = e(i, u);
                var c = null == u.textColor ? i.textColor : u.textColor
                  , p = null == u.strokeColor ? i.strokeColor : u.strokeColor
                  , d = null == u.stroke ? i.stroke : u.stroke;
                r.fillStyle = t.toColorString(c),
                r.strokeStyle = t.toColorString(p),
                d && (r.lineWidth = 2 * d,
                r.strokeText(l, s, h)),
                r.fillText(l, s, h)
            }
        }
        ,
        n.prototype.renderGraphics = function(t, e, n) {
            var o = t.drawData
              , a = o.length;
            n = !!n;
            for (var s = 0; a > s; s++) {
                var h = o[s];
                switch (h.type) {
                case 1:
                    var l = h;
                    e.fillStyle = n ? $ : i(l.fillColor, l.fillAlpha),
                    this.renderPath(h, e),
                    this.renderingMask ? e.clip() : e.fill();
                    break;
                case 2:
                    var u = h;
                    e.fillStyle = n ? $ : r(e, u.gradientType, u.colors, u.alphas, u.ratios, u.matrix),
                    e.save();
                    var c = u.matrix;
                    this.renderPath(h, e),
                    e.transform(c.a, c.b, c.c, c.d, c.tx, c.ty),
                    e.fill(),
                    e.restore();
                    break;
                case 3:
                    var p = h
                      , d = p.lineWidth;
                    e.lineWidth = d,
                    e.strokeStyle = n ? $ : i(p.lineColor, p.lineAlpha),
                    e.lineCap = m[p.caps],
                    e.lineJoin = p.joints,
                    e.miterLimit = p.miterLimit;
                    var f = 1 === d || 3 === d;
                    f && e.translate(.5, .5),
                    this.renderPath(h, e),
                    e.stroke(),
                    f && e.translate(-.5, -.5)
                }
            }
            return 0 == a ? 0 : 1
        }
        ,
        n.prototype.renderPath = function(t, e) {
            e.beginPath();
            for (var i = t.$data, r = t.$commands, n = r.length, o = 0, a = 0; n > a; a++) {
                var s = r[a];
                switch (s) {
                case 4:
                    e.bezierCurveTo(i[o++], i[o++], i[o++], i[o++], i[o++], i[o++]);
                    break;
                case 3:
                    e.quadraticCurveTo(i[o++], i[o++], i[o++], i[o++]);
                    break;
                case 2:
                    e.lineTo(i[o++], i[o++]);
                    break;
                case 1:
                    e.moveTo(i[o++], i[o++])
                }
            }
        }
        ,
        n.prototype.renderGroup = function(t, e) {
            var i = t.matrix
              , r = !1;
            i && (e.saveTransform ? e.saveTransform() : e.save(),
            r = !0,
            e.transform(i.a, i.b, i.c, i.d, i.tx, i.ty));
            for (var n = 0, o = t.drawData, a = o.length, s = 0; a > s; s++) {
                var h = o[s];
                n += this.renderNode(h, e)
            }
            return r && (e.restoreTransform ? e.restoreTransform() : e.restore()),
            n
        }
        ,
        n.prototype.createRenderBuffer = function(e, i, r) {
            var n = r ? x.pop() : b.pop();
            return n ? n.resize(e, i, !0) : n = new t.sys.CanvasRenderBuffer(e,i),
            n
        }
        ,
        n
    }();
    t.CanvasRenderer = T,
    __reflect(T.prototype, "egret.CanvasRenderer", ["egret.sys.SystemRenderer"]);
    var _ = !1;
    try {
        _ = void 0 !== typeof Uint8ClampedArray
    } catch (w) {}
}(egret || (egret = {}));
var egret;
!function(t) {
    t.DeviceOrientation = null
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.WEB = "web",
        t.NATIVE = "native",
        t
    }();
    t.RuntimeType = e,
    __reflect(e.prototype, "egret.RuntimeType");
    var i = function() {
        function t() {}
        return Object.defineProperty(t, "language", {
            get: function() {
                return t.$language
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "isMobile", {
            get: function() {
                return t.$isMobile
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "os", {
            get: function() {
                return t.$os
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "runtimeType", {
            get: function() {
                return t.$runtimeType
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "supportVersion", {
            get: function() {
                return t.$supportVersion
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "engineVersion", {
            get: function() {
                return "5.0.8"
            },
            enumerable: !0,
            configurable: !0
        }),
        t.$setNativeCapabilities = function(e) {
            var i = e.split("-");
            if (i.length <= 4) {
                var r = i[0];
                switch (r) {
                case "android":
                    r = "Android";
                    break;
                case "ios":
                    r = "iOS"
                }
                t.$os = r;
                var n = i[2].substring(1, i[2].length);
                t.$supportVersion = n
            }
        }
        ,
        Object.defineProperty(t, "renderMode", {
            get: function() {
                return t.$renderMode
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "boundingClientWidth", {
            get: function() {
                return t.$boundingClientWidth
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t, "boundingClientHeight", {
            get: function() {
                return t.$boundingClientHeight
            },
            enumerable: !0,
            configurable: !0
        }),
        t.$language = "zh-CN",
        t.$os = "Unknown",
        t.$runtimeType = "Unknown",
        t.$supportVersion = "Unknown",
        t.$renderMode = "Unknown",
        t.$boundingClientWidth = 0,
        t.$boundingClientHeight = 0,
        t
    }();
    t.Capabilities = i,
    __reflect(i.prototype, "egret.Capabilities")
}(egret || (egret = {}));
var testDeviceType = function() {
    if (!this.navigator)
        return !0;
    var t = navigator.userAgent.toLowerCase();
    return -1 != t.indexOf("mobile") || -1 != t.indexOf("android")
}
  , testRuntimeType = function() {
    return this.navigator ? !0 : !1
};
egret.Capabilities.$isMobile = testDeviceType(),
egret.Capabilities.$runtimeType = testRuntimeType() ? egret.RuntimeType.WEB : egret.RuntimeType.NATIVE;
var egret;
!function(t) {
    t.BitmapFillMode = {
        REPEAT: "repeat",
        SCALE: "scale",
        CLIP: "clip"
    }
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t, e) {
        r[t] = e
    }
    function i(t) {
        return r[t]
    }
    var r = {};
    t.registerImplementation = e,
    t.getImplementation = i
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(t) {
        function e(e, i) {
            var r = t.call(this, e) || this;
            return r.firstCharHeight = 0,
            "string" == typeof i ? r.charList = r.parseConfig(i) : i && i.hasOwnProperty("frames") ? r.charList = i.frames : r.charList = {},
            r
        }
        return __extends(e, t),
        e.prototype.getTexture = function(t) {
            var e = this._textureMap[t];
            if (!e) {
                var i = this.charList[t];
                if (!i)
                    return null;
                e = this.createTexture(t, i.x, i.y, i.w, i.h, i.offX, i.offY, i.sourceW, i.sourceH),
                this._textureMap[t] = e
            }
            return e
        }
        ,
        e.prototype.getConfig = function(t, e) {
            return this.charList[t] ? this.charList[t][e] : 0
        }
        ,
        e.prototype._getFirstCharHeight = function() {
            if (0 == this.firstCharHeight)
                for (var t in this.charList) {
                    var e = this.charList[t];
                    if (e) {
                        var i = e.sourceH;
                        if (void 0 === i) {
                            var r = e.h;
                            void 0 === r && (r = 0);
                            var n = e.offY;
                            void 0 === n && (n = 0),
                            i = r + n
                        }
                        if (0 >= i)
                            continue;
                        this.firstCharHeight = i;
                        break
                    }
                }
            return this.firstCharHeight
        }
        ,
        e.prototype.parseConfig = function(t) {
            t = t.split("\r\n").join("\n");
            for (var e = t.split("\n"), i = this.getConfigByKey(e[3], "count"), r = {}, n = 4; 4 + i > n; n++) {
                var o = e[n]
                  , a = String.fromCharCode(this.getConfigByKey(o, "id"))
                  , s = {};
                r[a] = s,
                s.x = this.getConfigByKey(o, "x"),
                s.y = this.getConfigByKey(o, "y"),
                s.w = this.getConfigByKey(o, "width"),
                s.h = this.getConfigByKey(o, "height"),
                s.offX = this.getConfigByKey(o, "xoffset"),
                s.offY = this.getConfigByKey(o, "yoffset"),
                s.xadvance = this.getConfigByKey(o, "xadvance")
            }
            return r
        }
        ,
        e.prototype.getConfigByKey = function(t, e) {
            for (var i = t.split(" "), r = 0, n = i.length; n > r; r++) {
                var o = i[r];
                if (e == o.substring(0, e.length)) {
                    var a = o.substring(e.length + 1);
                    return parseInt(a)
                }
            }
            return 0
        }
        ,
        e
    }(t.SpriteSheet);
    t.BitmapFont = e,
    __reflect(e.prototype, "egret.BitmapFont")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$textOffsetX = 0,
            i.$textOffsetY = 0,
            i.$textStartX = 0,
            i.$textStartY = 0,
            i.textLines = [],
            i.$lineHeights = [],
            i.$renderNode = new t.sys.BitmapNode,
            i.$BitmapText = {
                0: 0 / 0,
                1: 0 / 0,
                2: "",
                3: 0,
                4: 0,
                5: null,
                6: !1,
                7: !1,
                8: !1,
                9: !1,
                10: "left",
                11: "top",
                12: t.Bitmap.defaultSmoothing
            },
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "smoothing", {
            get: function() {
                var t = this.$BitmapText;
                return t[12]
            },
            set: function(t) {
                t = !!t;
                var e = this.$BitmapText;
                t != e[12] && (e[12] = t,
                this.$invalidate())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "text", {
            get: function() {
                return this.$BitmapText[2]
            },
            set: function(t) {
                this.$setText(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setText = function(t) {
            null == t && (t = ""),
            t = String(t);
            var e = this.$BitmapText;
            return t == e[2] ? !1 : (e[2] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        i.prototype.$getWidth = function() {
            var t = this.$BitmapText[0];
            return isNaN(t) ? this.$getContentBounds().width : t
        }
        ,
        i.prototype.$setWidth = function(t) {
            var e = this.$BitmapText;
            return 0 > t || t == e[0] ? !1 : (e[0] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        i.prototype.$invalidateContentBounds = function() {
            e.prototype.$invalidateContentBounds.call(this),
            this.$BitmapText[7] = !0
        }
        ,
        i.prototype.$getHeight = function() {
            var t = this.$BitmapText[1];
            return isNaN(t) ? this.$getContentBounds().height : t
        }
        ,
        i.prototype.$setHeight = function(t) {
            var e = this.$BitmapText;
            return 0 > t || t == e[1] ? !1 : (e[1] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "font", {
            get: function() {
                return this.$BitmapText[5]
            },
            set: function(t) {
                this.$setFont(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setFont = function(t) {
            var e = this.$BitmapText;
            return e[5] == t ? !1 : (e[5] = t,
            this.$BitmapText[6] = !0,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "lineSpacing", {
            get: function() {
                return this.$BitmapText[3]
            },
            set: function(t) {
                this.$setLineSpacing(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setLineSpacing = function(t) {
            t = +t || 0;
            var e = this.$BitmapText;
            return e[3] == t ? !1 : (e[3] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "letterSpacing", {
            get: function() {
                return this.$BitmapText[4]
            },
            set: function(t) {
                this.$setLetterSpacing(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setLetterSpacing = function(t) {
            t = +t || 0;
            var e = this.$BitmapText;
            return e[4] == t ? !1 : (e[4] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "textAlign", {
            get: function() {
                return this.$BitmapText[10]
            },
            set: function(t) {
                this.$setTextAlign(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setTextAlign = function(t) {
            var e = this.$BitmapText;
            return e[10] == t ? !1 : (e[10] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        Object.defineProperty(i.prototype, "verticalAlign", {
            get: function() {
                return this.$BitmapText[11]
            },
            set: function(t) {
                this.$setVerticalAlign(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$setVerticalAlign = function(t) {
            var e = this.$BitmapText;
            return e[11] == t ? !1 : (e[11] = t,
            this.$invalidateContentBounds(),
            !0)
        }
        ,
        i.prototype.$render = function() {
            var e = this.$BitmapText
              , r = this.$getTextLines()
              , n = r.length;
            if (0 != n) {
                var o = this.$textLinesWidth
                  , a = e[5]
                  , s = this.$renderNode;
                a.$texture && (s.image = a.$texture._bitmapData),
                s.smoothing = e[12];
                for (var h = a._getFirstCharHeight(), l = Math.ceil(h * i.EMPTY_FACTOR), u = !isNaN(e[1]), c = e[8], p = e[0], d = e[1], f = e[10], g = this.$textOffsetY + this.$textStartY, y = this.$lineHeights, v = 0; n > v; v++) {
                    var $ = y[v];
                    if (u && v > 0 && g + $ > d)
                        break;
                    var m = r[v]
                      , b = m.length
                      , x = this.$textOffsetX;
                    if (f != t.HorizontalAlign.LEFT) {
                        var T = p > c ? p : c;
                        f == t.HorizontalAlign.RIGHT ? x += T - o[v] : f == t.HorizontalAlign.CENTER && (x += Math.floor((T - o[v]) / 2))
                    }
                    for (var _ = 0; b > _; _++) {
                        var w = m.charAt(_)
                          , O = a.getTexture(w);
                        if (O) {
                            var E = O._bitmapWidth
                              , C = O._bitmapHeight;
                            s.imageWidth = O._sourceWidth,
                            s.imageHeight = O._sourceHeight,
                            s.drawImage(O._bitmapX, O._bitmapY, E, C, x + O._offsetX, g + O._offsetY, O.$getScaleBitmapWidth(), O.$getScaleBitmapHeight()),
                            x += (a.getConfig(w, "xadvance") || O.$getTextureWidth()) + e[4]
                        } else
                            " " == w ? x += l : t.$warn(1046, w)
                    }
                    g += $ + e[3]
                }
            }
        }
        ,
        i.prototype.$measureContentBounds = function(t) {
            var e = this.$getTextLines();
            0 == e.length ? t.setEmpty() : t.setTo(this.$textOffsetX + this.$textStartX, this.$textOffsetY + this.$textStartY, this.$BitmapText[8] - this.$textOffsetX, this.$BitmapText[9] - this.$textOffsetY)
        }
        ,
        Object.defineProperty(i.prototype, "textWidth", {
            get: function() {
                return this.$getTextLines(),
                this.$BitmapText[8]
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "textHeight", {
            get: function() {
                return this.$getTextLines(),
                this.$BitmapText[9]
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.$getTextLines = function() {
            function e(t) {
                return m && n.length > 0 && f > m ? !1 : (f += l + c,
                s || h || (u -= p),
                n.push(t),
                a.push(l),
                o.push(u),
                d = Math.max(u, d),
                !0)
            }
            var r = this.$BitmapText;
            if (!r[7])
                return this.textLines;
            var n = [];
            this.textLines = n;
            var o = [];
            this.$textLinesWidth = o,
            r[7] = !1;
            var a = [];
            if (this.$lineHeights = a,
            !r[2] || !r[5])
                return n;
            for (var s, h, l, u, c = r[3], p = r[4], d = 0, f = 0, g = 0, y = 0, v = !isNaN(r[0]), $ = r[0], m = r[1], b = r[5], x = b._getFirstCharHeight(), T = Math.ceil(x * i.EMPTY_FACTOR), _ = r[2], w = _.split(/(?:\r\n|\r|\n)/), O = w.length, E = !0, C = 0; O > C; C++) {
                var F = w[C]
                  , R = F.length;
                l = 0,
                u = 0,
                s = !0,
                h = !1;
                for (var P = 0; R > P; P++) {
                    s || (u += p);
                    var D = F.charAt(P)
                      , S = void 0
                      , M = void 0
                      , A = 0
                      , L = 0
                      , B = b.getTexture(D);
                    if (B)
                        S = B.$getTextureWidth(),
                        M = B.$getTextureHeight(),
                        A = B._offsetX,
                        L = B._offsetY;
                    else {
                        if (" " != D) {
                            t.$warn(1046, D),
                            s && (s = !1);
                            continue
                        }
                        S = T,
                        M = x
                    }
                    if (s && (s = !1,
                    g = Math.min(A, g)),
                    E && (E = !1,
                    y = Math.min(L, y)),
                    v && P > 0 && u + S > $) {
                        if (!e(F.substring(0, P)))
                            break;
                        F = F.substring(P),
                        R = F.length,
                        P = 0,
                        u = P == R - 1 ? S : b.getConfig(D, "xadvance") || S,
                        l = M
                    } else
                        u += P == R - 1 ? S : b.getConfig(D, "xadvance") || S,
                        l = Math.max(M, l)
                }
                if (m && C > 0 && f > m)
                    break;
                if (h = !0,
                !e(F))
                    break
            }
            f -= c,
            r[8] = d,
            r[9] = f,
            this.$textOffsetX = g,
            this.$textOffsetY = y,
            this.$textStartX = 0,
            this.$textStartY = 0;
            var N;
            return $ > d && (N = r[10],
            N == t.HorizontalAlign.RIGHT ? this.$textStartX = $ - d : N == t.HorizontalAlign.CENTER && (this.$textStartX = Math.floor(($ - d) / 2))),
            m > f && (N = r[11],
            N == t.VerticalAlign.BOTTOM ? this.$textStartY = m - f : N == t.VerticalAlign.MIDDLE && (this.$textStartY = Math.floor((m - f) / 2))),
            n
        }
        ,
        i.EMPTY_FACTOR = .33,
        i
    }(t.DisplayObject);
    t.BitmapText = e,
    __reflect(e.prototype, "egret.BitmapText")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.LEFT = "left",
        t.RIGHT = "right",
        t.CENTER = "center",
        t.JUSTIFY = "justify",
        t.CONTENT_JUSTIFY = "contentJustify",
        t
    }();
    t.HorizontalAlign = e,
    __reflect(e.prototype, "egret.HorizontalAlign")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function e() {
            this.replaceArr = [],
            this.resutlArr = [],
            this.initReplaceArr()
        }
        return e.prototype.initReplaceArr = function() {
            this.replaceArr = [],
            this.replaceArr.push([/&lt;/g, "<"]),
            this.replaceArr.push([/&gt;/g, ">"]),
            this.replaceArr.push([/&amp;/g, "&"]),
            this.replaceArr.push([/&quot;/g, '"']),
            this.replaceArr.push([/&apos;/g, "'"])
        }
        ,
        e.prototype.replaceSpecial = function(t) {
            for (var e = 0; e < this.replaceArr.length; e++) {
                var i = this.replaceArr[e][0]
                  , r = this.replaceArr[e][1];
                t = t.replace(i, r)
            }
            return t
        }
        ,
        e.prototype.parse = function(e) {
            this.stackArray = [],
            this.resutlArr = [];
            for (var i = 0, r = e.length; r > i; ) {
                var n = e.indexOf("<", i);
                if (0 > n)
                    this.addToResultArr(e.substring(i)),
                    i = r;
                else {
                    this.addToResultArr(e.substring(i, n));
                    var o = e.indexOf(">", n);
                    -1 == o ? (t.$error(1038),
                    o = n) : "/" == e.charAt(n + 1) ? this.stackArray.pop() : this.addToArray(e.substring(n + 1, o)),
                    i = o + 1
                }
            }
            return this.resutlArr
        }
        ,
        e.prototype.parser = function(t) {
            return this.parse(t)
        }
        ,
        e.prototype.addToResultArr = function(t) {
            "" != t && (t = this.replaceSpecial(t),
            this.stackArray.length > 0 ? this.resutlArr.push({
                text: t,
                style: this.stackArray[this.stackArray.length - 1]
            }) : this.resutlArr.push({
                text: t
            }))
        }
        ,
        e.prototype.changeStringToObject = function(t) {
            t = t.trim();
            var e = {}
              , i = [];
            if ("i" == t.charAt(0) || "b" == t.charAt(0) || "u" == t.charAt(0))
                this.addProperty(e, t, "true");
            else if (i = t.match(/^(font|a)\s/)) {
                t = t.substring(i[0].length).trim();
                for (var r = 0, n = void 0; n = t.match(this.getHeadReg()); ) {
                    var o = n[0]
                      , a = "";
                    t = t.substring(o.length).trim(),
                    '"' == t.charAt(0) ? (r = t.indexOf('"', 1),
                    a = t.substring(1, r),
                    r += 1) : "'" == t.charAt(0) ? (r = t.indexOf("'", 1),
                    a = t.substring(1, r),
                    r += 1) : (a = t.match(/(\S)+/)[0],
                    r = a.length),
                    this.addProperty(e, o.substring(0, o.length - 1).trim(), a.trim()),
                    t = t.substring(r).trim()
                }
            }
            return e
        }
        ,
        e.prototype.getHeadReg = function() {
            return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/
        }
        ,
        e.prototype.addProperty = function(t, e, i) {
            switch (e.toLowerCase()) {
            case "color":
            case "textcolor":
                i = i.replace(/#/, "0x"),
                t.textColor = parseInt(i);
                break;
            case "strokecolor":
                i = i.replace(/#/, "0x"),
                t.strokeColor = parseInt(i);
                break;
            case "stroke":
                t.stroke = parseInt(i);
                break;
            case "b":
            case "bold":
                t.bold = "true" == i;
                break;
            case "u":
                t.underline = "true" == i;
                break;
            case "i":
            case "italic":
                t.italic = "true" == i;
                break;
            case "size":
                t.size = parseInt(i);
                break;
            case "fontfamily":
                t.fontFamily = i;
                break;
            case "href":
                t.href = this.replaceSpecial(i);
                break;
            case "target":
                t.target = this.replaceSpecial(i)
            }
        }
        ,
        e.prototype.addToArray = function(t) {
            var e = this.changeStringToObject(t);
            if (0 == this.stackArray.length)
                this.stackArray.push(e);
            else {
                var i = this.stackArray[this.stackArray.length - 1];
                for (var r in i)
                    null == e[r] && (e[r] = i[r]);
                this.stackArray.push(e)
            }
        }
        ,
        e
    }();
    t.HtmlTextParser = e,
    __reflect(e.prototype, "egret.HtmlTextParser")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.stageTextAdded = !1,
            t._text = null,
            t._isFocus = !1,
            t
        }
        return __extends(i, e),
        i.prototype.init = function(e) {
            this._text = e,
            this.stageText = new t.StageText,
            this.stageText.$setTextField(this._text)
        }
        ,
        i.prototype._addStageText = function() {
            this.stageTextAdded || (this._text.$inputEnabled || (this._text.$touchEnabled = !0),
            this.tempStage = this._text.stage,
            this.stageText.$addToStage(),
            this.stageText.addEventListener("updateText", this.updateTextHandler, this),
            this._text.addEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this),
            this.stageText.addEventListener("blur", this.blurHandler, this),
            this.stageText.addEventListener("focus", this.focusHandler, this),
            this.stageTextAdded = !0)
        }
        ,
        i.prototype._removeStageText = function() {
            this.stageTextAdded && (this._text.$inputEnabled || (this._text.$touchEnabled = !1),
            this.stageText.$removeFromStage(),
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this),
            this._text.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this),
            this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this),
            this.stageText.removeEventListener("blur", this.blurHandler, this),
            this.stageText.removeEventListener("focus", this.focusHandler, this),
            this.stageTextAdded = !1)
        }
        ,
        i.prototype._getText = function() {
            return this.stageText.$getText()
        }
        ,
        i.prototype._setText = function(t) {
            this.stageText.$setText(t)
        }
        ,
        i.prototype._setColor = function(t) {
            this.stageText.$setColor(t)
        }
        ,
        i.prototype.focusHandler = function(e) {
            this._isFocus || (this._isFocus = !0,
            e.showing || (this._text.$isTyping = !0),
            this._text.$invalidateContentBounds(),
            this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_IN,!0)))
        }
        ,
        i.prototype.blurHandler = function(e) {
            this._isFocus && (this._isFocus = !1,
            this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this),
            this._text.$isTyping = !1,
            this._text.$invalidateContentBounds(),
            this.stageText.$onBlur(),
            this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_OUT,!0)))
        }
        ,
        i.prototype.onMouseDownHandler = function(t) {
            this.$onFocus()
        }
        ,
        i.prototype.$onFocus = function() {
            var e = this;
            this._text.visible && (this._isFocus || (this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this),
            t.callLater(function() {
                e.tempStage.addEventListener(t.TouchEvent.TOUCH_BEGIN, e.onStageDownHandler, e)
            }, this),
            this.stageText.$show()))
        }
        ,
        i.prototype.onStageDownHandler = function(t) {
            t.$target != this._text && this.stageText.$hide()
        }
        ,
        i.prototype.updateTextHandler = function(e) {
            var i, r, n = this._text.$TextField, o = this.stageText.$getText(), a = !1;
            null != n[35] && (i = new RegExp("[" + n[35] + "]","g"),
            r = o.match(i),
            o = r ? r.join("") : "",
            a = !0),
            null != n[36] && (i = new RegExp("[^" + n[36] + "]","g"),
            r = o.match(i),
            o = r ? r.join("") : "",
            a = !0),
            a && this.stageText.$getText() != o && this.stageText.$setText(o),
            this.resetText(),
            this._text.dispatchEvent(new t.Event(t.Event.CHANGE,!0))
        }
        ,
        i.prototype.resetText = function() {
            this._text.$setBaseText(this.stageText.$getText())
        }
        ,
        i.prototype._hideInput = function() {
            this.stageText.$removeFromStage()
        }
        ,
        i.prototype.updateInput = function() {
            !this._text.$visible && this.stageText && this._hideInput()
        }
        ,
        i.prototype._updateProperties = function() {
            if (this._isFocus)
                return this.stageText.$resetStageText(),
                void this.updateInput();
            var t = this._text.$stage;
            if (null == t)
                ;
            else
                for (var e = this._text, i = e.$visible; ; ) {
                    if (!i)
                        break;
                    if (e = e.parent,
                    e == t)
                        break;
                    i = e.$visible
                }
            this.stageText.$setText(this._text.$TextField[13]),
            this.stageText.$resetStageText(),
            this.updateInput()
        }
        ,
        i
    }(t.HashObject);
    t.InputController = e,
    __reflect(e.prototype, "egret.InputController")
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e, i, n) {
        n = n || {};
        var o = null == n.italic ? i[16] : n.italic
          , a = null == n.bold ? i[15] : n.bold
          , s = null == n.size ? i[0] : n.size
          , h = n.fontFamily || i[8] || r.default_fontFamily;
        return t.sys.measureText(e, h, s, a, o)
    }
    var i = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])")
      , r = function(r) {
        function n() {
            var e = r.call(this) || this;
            e.$inputEnabled = !1,
            e.inputUtils = null,
            e.graphicsNode = null,
            e.isFlow = !1,
            e.textArr = [],
            e.linesArr = [],
            e.$isTyping = !1;
            var i = new t.sys.TextNode;
            return i.fontFamily = n.default_fontFamily,
            e.textNode = i,
            e.$renderNode = i,
            e.$TextField = {
                0: n.default_size,
                1: 0,
                2: n.default_textColor,
                3: 0 / 0,
                4: 0 / 0,
                5: 0,
                6: 0,
                7: 0,
                8: n.default_fontFamily,
                9: "left",
                10: "top",
                11: "#ffffff",
                12: "",
                13: "",
                14: [],
                15: !1,
                16: !1,
                17: !0,
                18: !1,
                19: !1,
                20: !1,
                21: 0,
                22: 0,
                23: 0,
                24: t.TextFieldType.DYNAMIC,
                25: 0,
                26: "#000000",
                27: 0,
                28: -1,
                29: 0,
                30: !1,
                31: !1,
                32: 0,
                33: !1,
                34: 16777215,
                35: null,
                36: null,
                37: t.TextFieldInputType.TEXT
            },
            e
        }
        return __extends(n, r),
        n.prototype.isInput = function() {
            return this.$TextField[24] == t.TextFieldType.INPUT
        }
        ,
        n.prototype.$setTouchEnabled = function(t) {
            var e = r.prototype.$setTouchEnabled.call(this, t);
            return this.isInput() && (this.$inputEnabled = !0),
            e
        }
        ,
        Object.defineProperty(n.prototype, "fontFamily", {
            get: function() {
                return this.$TextField[8]
            },
            set: function(t) {
                this.$setFontFamily(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setFontFamily = function(t) {
            var e = this.$TextField;
            return e[8] == t ? !1 : (e[8] = t,
            this.invalidateFontString(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "size", {
            get: function() {
                return this.$TextField[0]
            },
            set: function(t) {
                this.$setSize(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setSize = function(t) {
            t = +t || 0;
            var e = this.$TextField;
            return e[0] == t ? !1 : (e[0] = t,
            this.invalidateFontString(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "bold", {
            get: function() {
                return this.$TextField[15]
            },
            set: function(t) {
                this.$setBold(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setBold = function(t) {
            t = !!t;
            var e = this.$TextField;
            return t == e[15] ? !1 : (e[15] = t,
            this.invalidateFontString(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "italic", {
            get: function() {
                return this.$TextField[16]
            },
            set: function(t) {
                this.$setItalic(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setItalic = function(t) {
            t = !!t;
            var e = this.$TextField;
            return t == e[16] ? !1 : (e[16] = t,
            this.invalidateFontString(),
            !0)
        }
        ,
        n.prototype.invalidateFontString = function() {
            this.$TextField[17] = !0,
            this.$invalidateTextField()
        }
        ,
        Object.defineProperty(n.prototype, "textAlign", {
            get: function() {
                return this.$TextField[9]
            },
            set: function(t) {
                this.$setTextAlign(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setTextAlign = function(t) {
            var e = this.$TextField;
            return e[9] == t ? !1 : (e[9] = t,
            this.$invalidateTextField(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "verticalAlign", {
            get: function() {
                return this.$TextField[10]
            },
            set: function(t) {
                this.$setVerticalAlign(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setVerticalAlign = function(t) {
            var e = this.$TextField;
            return e[10] == t ? !1 : (e[10] = t,
            this.$invalidateTextField(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "lineSpacing", {
            get: function() {
                return this.$TextField[1]
            },
            set: function(t) {
                this.$setLineSpacing(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setLineSpacing = function(t) {
            t = +t || 0;
            var e = this.$TextField;
            return e[1] == t ? !1 : (e[1] = t,
            this.$invalidateTextField(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "textColor", {
            get: function() {
                return this.$TextField[2]
            },
            set: function(t) {
                this.$setTextColor(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setTextColor = function(t) {
            t = 0 | +t;
            var e = this.$TextField;
            return e[2] == t ? !1 : (e[2] = t,
            this.inputUtils && this.inputUtils._setColor(this.$TextField[2]),
            this.$invalidate(),
            !0)
        }
        ,
        Object.defineProperty(n.prototype, "wordWrap", {
            get: function() {
                return this.$TextField[19]
            },
            set: function(t) {
                this.$setWordWrap(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setWordWrap = function(t) {
            t = !!t;
            var e = this.$TextField;
            t != e[19] && (e[20] || (e[19] = t,
            this.$invalidateTextField()))
        }
        ,
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return this.$TextField[24]
            },
            set: function(t) {
                this.$setType(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setType = function(e) {
            var i = this.$TextField;
            return i[24] != e ? (i[24] = e,
            e == t.TextFieldType.INPUT ? (isNaN(i[3]) && this.$setWidth(100),
            isNaN(i[4]) && this.$setHeight(30),
            this.$setTouchEnabled(!0),
            null == this.inputUtils && (this.inputUtils = new t.InputController),
            this.inputUtils.init(this),
            this.$invalidateTextField(),
            this.$stage && this.inputUtils._addStageText()) : (this.inputUtils && (this.inputUtils._removeStageText(),
            this.inputUtils = null),
            this.$setTouchEnabled(!1)),
            !0) : !1
        }
        ,
        Object.defineProperty(n.prototype, "inputType", {
            get: function() {
                return this.$TextField[37]
            },
            set: function(t) {
                this.$TextField[37] = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "text", {
            get: function() {
                return this.$getText()
            },
            set: function(t) {
                this.$setText(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$getText = function() {
            return this.$TextField[24] == t.TextFieldType.INPUT ? this.inputUtils._getText() : this.$TextField[13]
        }
        ,
        n.prototype.$setBaseText = function(t) {
            null == t && (t = ""),
            t = t.toString(),
            this.isFlow = !1;
            var e = this.$TextField;
            if (e[13] != t) {
                this.$invalidateTextField(),
                e[13] = t;
                var i = "";
                return i = e[20] ? this.changeToPassText(t) : t,
                this.setMiddleStyle([{
                    text: i
                }]),
                !0
            }
            return !1
        }
        ,
        n.prototype.$setText = function(t) {
            null == t && (t = "");
            var e = this.$setBaseText(t);
            return this.inputUtils && this.inputUtils._setText(this.$TextField[13]),
            e
        }
        ,
        Object.defineProperty(n.prototype, "displayAsPassword", {
            get: function() {
                return this.$TextField[20]
            },
            set: function(t) {
                this.$setDisplayAsPassword(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setDisplayAsPassword = function(t) {
            var e = this.$TextField;
            if (e[20] != t) {
                e[20] = t,
                this.$invalidateTextField();
                var i = "";
                return i = t ? this.changeToPassText(e[13]) : e[13],
                this.setMiddleStyle([{
                    text: i
                }]),
                !0
            }
            return !1
        }
        ,
        Object.defineProperty(n.prototype, "strokeColor", {
            get: function() {
                return this.$TextField[25]
            },
            set: function(t) {
                t = +t || 0,
                this.$setStrokeColor(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setStrokeColor = function(e) {
            var i = this.$TextField;
            return i[25] != e ? (this.$invalidateTextField(),
            i[25] = e,
            i[26] = t.toColorString(e),
            !0) : !1
        }
        ,
        Object.defineProperty(n.prototype, "stroke", {
            get: function() {
                return this.$TextField[27]
            },
            set: function(t) {
                this.$setStroke(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setStroke = function(t) {
            return this.$TextField[27] != t ? (this.$invalidateTextField(),
            this.$TextField[27] = t,
            !0) : !1
        }
        ,
        Object.defineProperty(n.prototype, "maxChars", {
            get: function() {
                return this.$TextField[21]
            },
            set: function(t) {
                this.$setMaxChars(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setMaxChars = function(t) {
            return this.$TextField[21] != t ? (this.$TextField[21] = t,
            !0) : !1
        }
        ,
        Object.defineProperty(n.prototype, "scrollV", {
            get: function() {
                return Math.min(Math.max(this.$TextField[28], 1), this.maxScrollV)
            },
            set: function(t) {
                this.$TextField[28] = Math.max(t, 1),
                this.$invalidateTextField()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "maxScrollV", {
            get: function() {
                return this.$getLinesArr(),
                Math.max(this.$TextField[29] - t.TextFieldUtils.$getScrollNum(this) + 1, 1)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "selectionBeginIndex", {
            get: function() {
                return 0
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "selectionEndIndex", {
            get: function() {
                return 0
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "caretIndex", {
            get: function() {
                return 0
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setSelection = function(t, e) {
            return !1
        }
        ,
        n.prototype.$getLineHeight = function() {
            return this.$TextField[1] + this.$TextField[0]
        }
        ,
        Object.defineProperty(n.prototype, "numLines", {
            get: function() {
                return this.$getLinesArr(),
                this.$TextField[29]
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "multiline", {
            get: function() {
                return this.$TextField[30]
            },
            set: function(t) {
                this.$setMultiline(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setMultiline = function(t) {
            return this.$TextField[30] = t,
            this.$invalidateTextField(),
            !0
        }
        ,
        Object.defineProperty(n.prototype, "restrict", {
            get: function() {
                var t = this.$TextField
                  , e = null;
                return null != t[35] && (e = t[35]),
                null != t[36] && (null == e && (e = ""),
                e += "^" + t[36]),
                e
            },
            set: function(t) {
                var e = this.$TextField;
                if (null == t)
                    e[35] = null,
                    e[36] = null;
                else {
                    for (var i = -1; i < t.length && (i = t.indexOf("^", i),
                    0 != i) && i > 0 && "\\" == t.charAt(i - 1); )
                        i++;
                    0 == i ? (e[35] = null,
                    e[36] = t.substring(i + 1)) : i > 0 ? (e[35] = t.substring(0, i),
                    e[36] = t.substring(i + 1)) : (e[35] = t,
                    e[36] = null)
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setWidth = function(t) {
            var e = this.$TextField;
            if (isNaN(t)) {
                if (isNaN(e[3]))
                    return !1;
                e[3] = 0 / 0
            } else {
                if (e[3] == t)
                    return !1;
                e[3] = t
            }
            return t = +t,
            0 > t ? !1 : (this.$invalidateTextField(),
            !0)
        }
        ,
        n.prototype.$setHeight = function(t) {
            var e = this.$TextField;
            if (isNaN(t)) {
                if (isNaN(e[4]))
                    return !1;
                e[4] = 0 / 0
            } else {
                if (e[4] == t)
                    return !1;
                e[4] = t
            }
            return t = +t,
            0 > t ? !1 : (this.$invalidateTextField(),
            !0)
        }
        ,
        n.prototype.$getWidth = function() {
            var t = this.$TextField;
            return isNaN(t[3]) ? this.$getContentBounds().width : t[3]
        }
        ,
        n.prototype.$getHeight = function() {
            var t = this.$TextField;
            return isNaN(t[4]) ? this.$getContentBounds().height : t[4]
        }
        ,
        Object.defineProperty(n.prototype, "border", {
            get: function() {
                return this.$TextField[31]
            },
            set: function(t) {
                this.$setBorder(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setBorder = function(t) {
            this.$TextField[31] = !!t,
            this.$invalidate()
        }
        ,
        Object.defineProperty(n.prototype, "borderColor", {
            get: function() {
                return this.$TextField[32]
            },
            set: function(t) {
                this.$setBorderColor(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setBorderColor = function(t) {
            this.$TextField[32] = +t || 0,
            this.$invalidate()
        }
        ,
        Object.defineProperty(n.prototype, "background", {
            get: function() {
                return this.$TextField[33]
            },
            set: function(t) {
                this.$setBackground(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setBackground = function(t) {
            this.$TextField[33] = t,
            this.$invalidate()
        }
        ,
        Object.defineProperty(n.prototype, "backgroundColor", {
            get: function() {
                return this.$TextField[34]
            },
            set: function(t) {
                this.$setBackgroundColor(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.$setBackgroundColor = function(t) {
            this.$TextField[34] = t,
            this.$invalidate()
        }
        ,
        n.prototype.fillBackground = function(e) {
            var i = this.graphicsNode;
            i && i.clear();
            var r = this.$TextField;
            if (r[33] || r[31] || e && e.length > 0) {
                if (!i) {
                    i = this.graphicsNode = new t.sys.GraphicsNode;
                    var n = new t.sys.GroupNode;
                    n.addNode(i),
                    n.addNode(this.textNode),
                    this.$renderNode = n
                }
                var o = void 0
                  , a = void 0;
                if (r[33] && (o = i.beginFill(r[34]),
                o.drawRect(0, 0, this.$getWidth(), this.$getHeight())),
                r[31] && (a = i.lineStyle(1, r[32]),
                a.drawRect(0, 0, this.$getWidth() - 1, this.$getHeight() - 1)),
                e && e.length > 0)
                    for (var s = r[2], h = -1, l = e.length, u = 0; l > u; u += 4) {
                        var c = e[u]
                          , p = e[u + 1]
                          , d = e[u + 2]
                          , f = e[u + 3] || s;
                        (0 > h || h != f) && (h = f,
                        a = i.lineStyle(2, f, 1, t.CapsStyle.NONE)),
                        a.moveTo(c, p),
                        a.lineTo(c + d, p)
                    }
            }
            if (i) {
                var g = this.$getRenderBounds();
                i.x = g.x,
                i.y = g.y,
                i.width = g.width,
                i.height = g.height,
                t.Rectangle.release(g)
            }
        }
        ,
        n.prototype.setFocus = function() {
            this.type == t.TextFieldType.INPUT && this.$stage && this.inputUtils.$onFocus()
        }
        ,
        n.prototype.$onRemoveFromStage = function() {
            r.prototype.$onRemoveFromStage.call(this),
            this.removeEvent(),
            this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._removeStageText(),
            this.textNode && this.textNode.clean()
        }
        ,
        n.prototype.$onAddToStage = function(e, i) {
            r.prototype.$onAddToStage.call(this, e, i),
            this.addEvent(),
            this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._addStageText()
        }
        ,
        n.prototype.$invalidateTextField = function() {
            this.$invalidateContentBounds(),
            this.$TextField[18] = !0
        }
        ,
        n.prototype.$update = function(e, i) {
            var n = this.$getRenderBounds()
              , o = r.prototype.$update.call(this, e, n);
            return t.Rectangle.release(n),
            o
        }
        ,
        n.prototype.$getRenderBounds = function() {
            var e = this.$getContentBounds()
              , i = t.Rectangle.create();
            i.copyFrom(e),
            this.$TextField[31] && (i.width += 2,
            i.height += 2);
            var r = 2 * this.$TextField[27];
            return r > 0 && (i.width += 2 * r,
            i.height += 2 * r),
            i.x -= r + 2,
            i.y -= r + 2,
            i.width = Math.ceil(i.width) + 4,
            i.height = Math.ceil(i.height) + 4,
            i
        }
        ,
        n.prototype.$measureContentBounds = function(e) {
            this.$getLinesArr();
            var i = isNaN(this.$TextField[3]) ? this.$TextField[5] : this.$TextField[3]
              , r = isNaN(this.$TextField[4]) ? t.TextFieldUtils.$getTextHeight(this) : this.$TextField[4];
            e.setTo(0, 0, i, r)
        }
        ,
        n.prototype.$render = function() {
            if (this.$TextField[24] == t.TextFieldType.INPUT) {
                if ((this.$hasAnyFlags(2032) || this.$hasAnyFlags(1648)) && this.inputUtils._updateProperties(),
                this.$isTyping)
                    return void this.fillBackground()
            } else if (0 == this.$TextField[3])
                return;
            var e = this.drawText();
            this.fillBackground(e);
            var i = this.$getRenderBounds()
              , r = this.textNode;
            r.x = i.x,
            r.y = i.y,
            r.width = Math.ceil(i.width),
            r.height = Math.ceil(i.height),
            t.Rectangle.release(i)
        }
        ,
        Object.defineProperty(n.prototype, "textFlow", {
            get: function() {
                return this.textArr
            },
            set: function(t) {
                this.isFlow = !0;
                var e = "";
                null == t && (t = []);
                for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    e += r.text
                }
                this.$TextField[20] ? this.$setBaseText(e) : (this.$TextField[13] = e,
                this.setMiddleStyle(t))
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.changeToPassText = function(t) {
            if (this.$TextField[20]) {
                for (var e = "", i = 0, r = t.length; r > i; i++)
                    switch (t.charAt(i)) {
                    case "\n":
                        e += "\n";
                        break;
                    case "\r":
                        break;
                    default:
                        e += "*"
                    }
                return e
            }
            return t
        }
        ,
        n.prototype.setMiddleStyle = function(t) {
            this.$TextField[18] = !0,
            this.textArr = t,
            this.$invalidateTextField()
        }
        ,
        Object.defineProperty(n.prototype, "textWidth", {
            get: function() {
                return this.$getLinesArr(),
                this.$TextField[5]
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "textHeight", {
            get: function() {
                return this.$getLinesArr(),
                t.TextFieldUtils.$getTextHeight(this)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.appendText = function(t) {
            this.appendElement({
                text: t
            })
        }
        ,
        n.prototype.appendElement = function(t) {
            var e = this.$TextField[13] + t.text;
            this.$TextField[20] ? this.$setBaseText(e) : (this.$TextField[13] = e,
            this.textArr.push(t),
            this.setMiddleStyle(this.textArr))
        }
        ,
        n.prototype.$getLinesArr = function() {
            var r = this.$TextField;
            if (!r[18])
                return this.linesArr;
            r[18] = !1;
            var n = this.textArr;
            this.linesArr.length = 0,
            r[6] = 0,
            r[5] = 0;
            var o = r[3];
            if (!isNaN(o) && 0 == o)
                return r[29] = 0,
                [{
                    width: 0,
                    height: 0,
                    charNum: 0,
                    elements: [],
                    hasNextLine: !1
                }];
            for (var a, s = this.linesArr, h = 0, l = 0, u = 0, c = 0, p = 0, d = n.length; d > p; p++) {
                var f = n[p];
                if (f.text) {
                    f.style = f.style || {};
                    for (var g = f.text.toString(), y = g.split(/(?:\r\n|\r|\n)/), v = 0, $ = y.length; $ > v; v++) {
                        null == s[c] && (a = {
                            width: 0,
                            height: 0,
                            elements: [],
                            charNum: 0,
                            hasNextLine: !1
                        },
                        s[c] = a,
                        h = 0,
                        u = 0,
                        l = 0),
                        u = r[24] == t.TextFieldType.INPUT ? r[0] : Math.max(u, f.style.size || r[0]);
                        var m = !0;
                        if ("" == y[v])
                            v == $ - 1 && (m = !1);
                        else {
                            var b = e(y[v], r, f.style);
                            if (isNaN(o))
                                h += b,
                                l += y[v].length,
                                a.elements.push({
                                    width: b,
                                    text: y[v],
                                    style: f.style
                                }),
                                v == $ - 1 && (m = !1);
                            else if (o >= h + b)
                                a.elements.push({
                                    width: b,
                                    text: y[v],
                                    style: f.style
                                }),
                                h += b,
                                l += y[v].length,
                                v == $ - 1 && (m = !1);
                            else {
                                var x = 0
                                  , T = 0
                                  , _ = y[v]
                                  , w = void 0;
                                w = r[19] ? _.split(i) : _.match(/./g);
                                for (var O = w.length, E = 0; O > x; x++) {
                                    var C = w[x].length
                                      , F = !1;
                                    if (1 == C && O - 1 > x) {
                                        var R = w[x].charCodeAt(0)
                                          , P = w[x + 1].charCodeAt(0);
                                        if (R >= 55296 && 56319 >= R && 56320 == (64512 & P)) {
                                            var D = w[x] + w[x + 1];
                                            C = 2,
                                            F = !0,
                                            b = e(D, r, f.style)
                                        } else
                                            b = e(w[x], r, f.style)
                                    } else
                                        b = e(w[x], r, f.style);
                                    if (0 != h && h + b > o && h + x != 0)
                                        break;
                                    if (T + b > o)
                                        for (var S = w[x].match(/./g), M = 0, A = S.length; A > M; M++) {
                                            var C = S[M].length
                                              , L = !1;
                                            if (1 == C && A - 1 > M) {
                                                var R = S[M].charCodeAt(0)
                                                  , P = S[M + 1].charCodeAt(0);
                                                if (R >= 55296 && 56319 >= R && 56320 == (64512 & P)) {
                                                    var D = S[M] + S[M + 1];
                                                    C = 2,
                                                    L = !0,
                                                    b = e(D, r, f.style)
                                                } else
                                                    b = e(S[M], r, f.style)
                                            } else
                                                b = e(S[M], r, f.style);
                                            if (M > 0 && h + b > o)
                                                break;
                                            E += C,
                                            T += b,
                                            h += b,
                                            l += E,
                                            L && M++
                                        }
                                    else
                                        E += C,
                                        T += b,
                                        h += b,
                                        l += E;
                                    F && x++
                                }
                                if (x > 0) {
                                    a.elements.push({
                                        width: T,
                                        text: _.substring(0, E),
                                        style: f.style
                                    });
                                    var B = _.substring(E)
                                      , N = void 0
                                      , j = B.length;
                                    for (N = 0; j > N && " " == B.charAt(N); N++)
                                        ;
                                    y[v] = B.substring(N)
                                }
                                "" != y[v] && (v--,
                                m = !1)
                            }
                        }
                        m && (l++,
                        a.hasNextLine = !0),
                        v < y.length - 1 && (a.width = h,
                        a.height = u,
                        a.charNum = l,
                        r[5] = Math.max(r[5], h),
                        r[6] += u,
                        c++)
                    }
                    p == n.length - 1 && a && (a.width = h,
                    a.height = u,
                    a.charNum = l,
                    r[5] = Math.max(r[5], h),
                    r[6] += u)
                } else
                    a && (a.width = h,
                    a.height = u,
                    a.charNum = l,
                    r[5] = Math.max(r[5], h),
                    r[6] += u)
            }
            return r[29] = s.length,
            s
        }
        ,
        n.prototype.drawText = function() {
            var e = this.textNode
              , i = this.$TextField;
            e.bold = i[15],
            e.fontFamily = i[8] || n.default_fontFamily,
            e.italic = i[16],
            e.size = i[0],
            e.stroke = i[27],
            e.strokeColor = i[25],
            e.textColor = i[2];
            var r = this.$getLinesArr();
            if (0 == i[5])
                return [];
            var o = isNaN(i[3]) ? i[5] : i[3]
              , a = t.TextFieldUtils.$getTextHeight(this)
              , s = 0
              , h = t.TextFieldUtils.$getStartLine(this)
              , l = i[4];
            if (!isNaN(l) && l > a) {
                var u = t.TextFieldUtils.$getValign(this);
                s += u * (l - a)
            }
            s = Math.round(s);
            for (var c = t.TextFieldUtils.$getHalign(this), p = 0, d = [], f = h, g = i[29]; g > f; f++) {
                var y = r[f]
                  , v = y.height;
                if (s += v / 2,
                f != h) {
                    if (i[24] == t.TextFieldType.INPUT && !i[30])
                        break;
                    if (!isNaN(l) && s > l)
                        break
                }
                p = Math.round((o - y.width) * c);
                for (var $ = 0, m = y.elements.length; m > $; $++) {
                    var b = y.elements[$]
                      , x = b.style.size || i[0];
                    e.drawText(p, s + (v - x) / 2, b.text, b.style),
                    b.style.underline && d.push(p, s + v / 2, b.width, b.style.textColor),
                    p += b.width
                }
                s += v / 2 + i[1]
            }
            return d
        }
        ,
        n.prototype.addEvent = function() {
            this.addEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
        }
        ,
        n.prototype.removeEvent = function() {
            this.removeEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
        }
        ,
        n.prototype.onTapHandler = function(e) {
            if (this.$TextField[24] != t.TextFieldType.INPUT) {
                var i = t.TextFieldUtils.$getTextElement(this, e.localX, e.localY);
                if (null != i) {
                    var r = i.style;
                    if (r && r.href)
                        if (r.href.match(/^event:/)) {
                            var n = r.href.match(/^event:/)[0];
                            t.TextEvent.dispatchTextEvent(this, t.TextEvent.LINK, r.href.substring(n.length))
                        } else
                            open(r.href, r.target || "_blank")
                }
            }
        }
        ,
        n.default_fontFamily = "Arial",
        n.default_size = 30,
        n.default_textColor = 16777215,
        n
    }(t.DisplayObject);
    t.TextField = r,
    __reflect(r.prototype, "egret.TextField")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.TEXT = "text",
        t.TEL = "tel",
        t.PASSWORD = "password",
        t
    }();
    t.TextFieldInputType = e,
    __reflect(e.prototype, "egret.TextFieldInputType")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.DYNAMIC = "dynamic",
        t.INPUT = "input",
        t
    }();
    t.TextFieldType = e,
    __reflect(e.prototype, "egret.TextFieldType")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function e() {}
        return e.$getStartLine = function(t) {
            var i = t.$TextField
              , r = e.$getTextHeight(t)
              , n = 0
              , o = i[4];
            return isNaN(o) || (o > r || r > o && (n = Math.max(i[28] - 1, 0),
            n = Math.min(i[29] - 1, n)),
            i[30] || (n = Math.max(i[28] - 1, 0),
            i[29] > 0 && (n = Math.min(i[29] - 1, n)))),
            n
        }
        ,
        e.$getHalign = function(e) {
            var i = e.$getLinesArr()
              , r = 0;
            return e.$TextField[9] == t.HorizontalAlign.CENTER ? r = .5 : e.$TextField[9] == t.HorizontalAlign.RIGHT && (r = 1),
            e.$TextField[24] == t.TextFieldType.INPUT && !e.$TextField[30] && i.length > 1 && (r = 0),
            r
        }
        ,
        e.$getTextHeight = function(e) {
            var i = t.TextFieldType.INPUT != e.$TextField[24] || e.$TextField[30] ? e.$TextField[6] + (e.$TextField[29] - 1) * e.$TextField[1] : e.$TextField[0];
            return i
        }
        ,
        e.$getValign = function(i) {
            var r = e.$getTextHeight(i)
              , n = i.$TextField[4];
            if (!isNaN(n) && n > r) {
                var o = 0;
                return i.$TextField[10] == t.VerticalAlign.MIDDLE ? o = .5 : i.$TextField[10] == t.VerticalAlign.BOTTOM && (o = 1),
                o
            }
            return 0
        }
        ,
        e.$getTextElement = function(t, i, r) {
            var n = e.$getHit(t, i, r)
              , o = t.$getLinesArr();
            return n && o[n.lineIndex] && o[n.lineIndex].elements[n.textElementIndex] ? o[n.lineIndex].elements[n.textElementIndex] : null
        }
        ,
        e.$getHit = function(t, i, r) {
            var n = t.$getLinesArr();
            if (0 == t.$TextField[3])
                return null;
            var o = 0
              , a = e.$getTextHeight(t)
              , s = 0
              , h = t.$TextField[4];
            if (!isNaN(h) && h > a) {
                var l = e.$getValign(t);
                s = l * (h - a),
                0 != s && (r -= s)
            }
            for (var u = e.$getStartLine(t), c = 0, p = u; p < n.length; p++) {
                var d = n[p];
                if (c + d.height >= r) {
                    r > c && (o = p + 1);
                    break
                }
                if (c += d.height,
                c + t.$TextField[1] > r)
                    return null;
                c += t.$TextField[1]
            }
            if (0 == o)
                return null;
            var f = n[o - 1]
              , g = t.$TextField[3];
            isNaN(g) && (g = t.textWidth);
            var y = e.$getHalign(t);
            i -= y * (g - f.width);
            for (var v = 0, p = 0; p < f.elements.length; p++) {
                var $ = f.elements[p];
                if (v + $.width <= i)
                    v += $.width;
                else if (i > v)
                    return {
                        lineIndex: o - 1,
                        textElementIndex: p
                    }
            }
            return null
        }
        ,
        e.$getScrollNum = function(t) {
            var e = 1;
            if (t.$TextField[30]) {
                var i = t.height
                  , r = t.size
                  , n = t.lineSpacing;
                e = Math.floor(i / (r + n));
                var o = i - (r + n) * e;
                o > r / 2 && e++
            }
            return e
        }
        ,
        e
    }();
    t.TextFieldUtils = e,
    __reflect(e.prototype, "egret.TextFieldUtils")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e;
    !function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.TOP = "top",
        t.BOTTOM = "bottom",
        t.MIDDLE = "middle",
        t.JUSTIFY = "justify",
        t.CONTENT_JUSTIFY = "contentJustify",
        t
    }();
    t.VerticalAlign = e,
    __reflect(e.prototype, "egret.VerticalAlign")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.encode = function(t) {
            for (var e = new Uint8Array(t), i = e.length, r = "", n = 0; i > n; n += 3)
                r += chars[e[n] >> 2],
                r += chars[(3 & e[n]) << 4 | e[n + 1] >> 4],
                r += chars[(15 & e[n + 1]) << 2 | e[n + 2] >> 6],
                r += chars[63 & e[n + 2]];
            return i % 3 === 2 ? r = r.substring(0, r.length - 1) + "=" : i % 3 === 1 && (r = r.substring(0, r.length - 2) + "=="),
            r
        }
        ,
        t.decode = function(t) {
            var e = .75 * t.length
              , i = t.length
              , r = 0
              , n = 0
              , o = 0
              , a = 0
              , s = 0;
            "=" === t[t.length - 1] && (e--,
            "=" === t[t.length - 2] && e--);
            for (var h = new ArrayBuffer(e), l = new Uint8Array(h), u = 0; i > u; u += 4)
                n = lookup[t.charCodeAt(u)],
                o = lookup[t.charCodeAt(u + 1)],
                a = lookup[t.charCodeAt(u + 2)],
                s = lookup[t.charCodeAt(u + 3)],
                l[r++] = n << 2 | o >> 4,
                l[r++] = (15 & o) << 4 | a >> 2,
                l[r++] = (3 & a) << 6 | 63 & s;
            return h
        }
        ,
        t
    }();
    t.Base64Util = e,
    __reflect(e.prototype, "egret.Base64Util")
}(egret || (egret = {}));
for (var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup = new Uint8Array(256), i = 0; i < chars.length; i++)
    lookup[chars.charCodeAt(i)] = i;
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.LITTLE_ENDIAN = "littleEndian",
        t.BIG_ENDIAN = "bigEndian",
        t
    }();
    t.Endian = e,
    __reflect(e.prototype, "egret.Endian");
    var i = function() {
        function i(t, i) {
            void 0 === i && (i = 0),
            this.bufferExtSize = 0,
            this.EOF_byte = 0,
            this.EOF_code_point = -1,
            0 > i && (i = 0),
            this.bufferExtSize = i;
            var r, n = 0;
            if (t) {
                var o = void 0;
                if (t instanceof Uint8Array ? (o = t,
                n = t.length) : (n = t.byteLength,
                o = new Uint8Array(t)),
                0 == i)
                    r = new Uint8Array(n);
                else {
                    var a = (n / i | 0) + 1;
                    r = new Uint8Array(a * i)
                }
                r.set(o)
            } else
                r = new Uint8Array(i);
            this.write_position = n,
            this._position = 0,
            this._bytes = r,
            this.data = new DataView(r.buffer),
            this.endian = e.BIG_ENDIAN
        }
        return Object.defineProperty(i.prototype, "endian", {
            get: function() {
                return 0 == this.$endian ? e.LITTLE_ENDIAN : e.BIG_ENDIAN
            },
            set: function(t) {
                this.$endian = t == e.LITTLE_ENDIAN ? 0 : 1
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setArrayBuffer = function(t) {}
        ,
        Object.defineProperty(i.prototype, "readAvailable", {
            get: function() {
                return this.write_position - this._position
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "buffer", {
            get: function() {
                return this.data.buffer.slice(0, this.write_position)
            },
            set: function(t) {
                var e, i = t.byteLength, r = new Uint8Array(t), n = this.bufferExtSize;
                if (0 == n)
                    e = new Uint8Array(i);
                else {
                    var o = (i / n | 0) + 1;
                    e = new Uint8Array(o * n)
                }
                e.set(r),
                this.write_position = i,
                this._bytes = e,
                this.data = new DataView(e.buffer)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "rawBuffer", {
            get: function() {
                return this.data.buffer
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "bytes", {
            get: function() {
                return this._bytes
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "dataView", {
            get: function() {
                return this.data
            },
            set: function(t) {
                this.buffer = t.buffer
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "bufferOffset", {
            get: function() {
                return this.data.byteOffset
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "position", {
            get: function() {
                return this._position
            },
            set: function(t) {
                this._position = t,
                t > this.write_position && (this.write_position = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "length", {
            get: function() {
                return this.write_position
            },
            set: function(t) {
                this.write_position = t,
                this.data.byteLength > t && (this._position = t),
                this._validateBuffer(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype._validateBuffer = function(t) {
            if (this.data.byteLength < t) {
                var e = this.bufferExtSize
                  , i = void 0;
                if (0 == e)
                    i = new Uint8Array(t);
                else {
                    var r = ((t / e >> 0) + 1) * e;
                    i = new Uint8Array(r)
                }
                i.set(this._bytes),
                this._bytes = i,
                this.data = new DataView(i.buffer)
            }
        }
        ,
        Object.defineProperty(i.prototype, "bytesAvailable", {
            get: function() {
                return this.data.byteLength - this._position
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.clear = function() {
            var t = new ArrayBuffer(this.bufferExtSize);
            this.data = new DataView(t),
            this._bytes = new Uint8Array(t),
            this._position = 0,
            this.write_position = 0
        }
        ,
        i.prototype.readBoolean = function() {
            return this.validate(1) ? !!this._bytes[this.position++] : void 0
        }
        ,
        i.prototype.readByte = function() {
            return this.validate(1) ? this.data.getInt8(this.position++) : void 0
        }
        ,
        i.prototype.readBytes = function(e, i, r) {
            if (void 0 === i && (i = 0),
            void 0 === r && (r = 0),
            e) {
                var n = this._position
                  , o = this.write_position - n;
                if (0 > o)
                    return void t.$error(1025);
                if (0 == r)
                    r = o;
                else if (r > o)
                    return void t.$error(1025);
                e.validateBuffer(i + r),
                e._bytes.set(this._bytes.subarray(n, n + r), i),
                this.position += r
            }
        }
        ,
        i.prototype.readDouble = function() {
            if (this.validate(8)) {
                var t = this.data.getFloat64(this._position, 0 == this.$endian);
                return this.position += 8,
                t
            }
        }
        ,
        i.prototype.readFloat = function() {
            if (this.validate(4)) {
                var t = this.data.getFloat32(this._position, 0 == this.$endian);
                return this.position += 4,
                t
            }
        }
        ,
        i.prototype.readInt = function() {
            if (this.validate(4)) {
                var t = this.data.getInt32(this._position, 0 == this.$endian);
                return this.position += 4,
                t
            }
        }
        ,
        i.prototype.readShort = function() {
            if (this.validate(2)) {
                var t = this.data.getInt16(this._position, 0 == this.$endian);
                return this.position += 2,
                t
            }
        }
        ,
        i.prototype.readUnsignedByte = function() {
            return this.validate(1) ? this._bytes[this.position++] : void 0
        }
        ,
        i.prototype.readUnsignedInt = function() {
            if (this.validate(4)) {
                var t = this.data.getUint32(this._position, 0 == this.$endian);
                return this.position += 4,
                t
            }
        }
        ,
        i.prototype.readUnsignedShort = function() {
            if (this.validate(2)) {
                var t = this.data.getUint16(this._position, 0 == this.$endian);
                return this.position += 2,
                t
            }
        }
        ,
        i.prototype.readUTF = function() {
            var t = this.readUnsignedShort();
            return t > 0 ? this.readUTFBytes(t) : ""
        }
        ,
        i.prototype.readUTFBytes = function(t) {
            if (this.validate(t)) {
                var e = this.data
                  , i = new Uint8Array(e.buffer,e.byteOffset + this._position,t);
                return this.position += t,
                this.decodeUTF8(i)
            }
        }
        ,
        i.prototype.writeBoolean = function(t) {
            this.validateBuffer(1),
            this._bytes[this.position++] = +t
        }
        ,
        i.prototype.writeByte = function(t) {
            this.validateBuffer(1),
            this._bytes[this.position++] = 255 & t
        }
        ,
        i.prototype.writeBytes = function(t, e, i) {
            void 0 === e && (e = 0),
            void 0 === i && (i = 0);
            var r;
            0 > e || 0 > i || (r = 0 == i ? t.length - e : Math.min(t.length - e, i),
            r > 0 && (this.validateBuffer(r),
            this._bytes.set(t._bytes.subarray(e, e + r), this._position),
            this.position = this._position + r))
        }
        ,
        i.prototype.writeDouble = function(t) {
            this.validateBuffer(8),
            this.data.setFloat64(this._position, t, 0 == this.$endian),
            this.position += 8
        }
        ,
        i.prototype.writeFloat = function(t) {
            this.validateBuffer(4),
            this.data.setFloat32(this._position, t, 0 == this.$endian),
            this.position += 4
        }
        ,
        i.prototype.writeInt = function(t) {
            this.validateBuffer(4),
            this.data.setInt32(this._position, t, 0 == this.$endian),
            this.position += 4
        }
        ,
        i.prototype.writeShort = function(t) {
            this.validateBuffer(2),
            this.data.setInt16(this._position, t, 0 == this.$endian),
            this.position += 2
        }
        ,
        i.prototype.writeUnsignedInt = function(t) {
            this.validateBuffer(4),
            this.data.setUint32(this._position, t, 0 == this.$endian),
            this.position += 4
        }
        ,
        i.prototype.writeUnsignedShort = function(t) {
            this.validateBuffer(2),
            this.data.setUint16(this._position, t, 0 == this.$endian),
            this.position += 2
        }
        ,
        i.prototype.writeUTF = function(t) {
            var e = this.encodeUTF8(t)
              , i = e.length;
            this.validateBuffer(2 + i),
            this.data.setUint16(this._position, i, 0 == this.$endian),
            this.position += 2,
            this._writeUint8Array(e, !1)
        }
        ,
        i.prototype.writeUTFBytes = function(t) {
            this._writeUint8Array(this.encodeUTF8(t))
        }
        ,
        i.prototype.toString = function() {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable
        }
        ,
        i.prototype._writeUint8Array = function(t, e) {
            void 0 === e && (e = !0);
            var i = this._position
              , r = i + t.length;
            e && this.validateBuffer(r),
            this.bytes.set(t, i),
            this.position = r
        }
        ,
        i.prototype.validate = function(e) {
            var i = this._bytes.length;
            return i > 0 && this._position + e <= i ? !0 : void t.$error(1025)
        }
        ,
        i.prototype.validateBuffer = function(t) {
            this.write_position = t > this.write_position ? t : this.write_position,
            t += this._position,
            this._validateBuffer(t)
        }
        ,
        i.prototype.encodeUTF8 = function(t) {
            for (var e = 0, i = this.stringToCodePoints(t), r = []; i.length > e; ) {
                var n = i[e++];
                if (this.inRange(n, 55296, 57343))
                    this.encoderError(n);
                else if (this.inRange(n, 0, 127))
                    r.push(n);
                else {
                    var o = void 0
                      , a = void 0;
                    for (this.inRange(n, 128, 2047) ? (o = 1,
                    a = 192) : this.inRange(n, 2048, 65535) ? (o = 2,
                    a = 224) : this.inRange(n, 65536, 1114111) && (o = 3,
                    a = 240),
                    r.push(this.div(n, Math.pow(64, o)) + a); o > 0; ) {
                        var s = this.div(n, Math.pow(64, o - 1));
                        r.push(128 + s % 64),
                        o -= 1
                    }
                }
            }
            return new Uint8Array(r)
        }
        ,
        i.prototype.decodeUTF8 = function(t) {
            for (var e, i = !1, r = 0, n = "", o = 0, a = 0, s = 0, h = 0; t.length > r; ) {
                var l = t[r++];
                if (l == this.EOF_byte)
                    return n;
                if (0 == a)
                    this.inRange(l, 0, 127) ? e = l : (this.inRange(l, 194, 223) ? (a = 1,
                    h = 128,
                    o = l - 192) : this.inRange(l, 224, 239) ? (a = 2,
                    h = 2048,
                    o = l - 224) : this.inRange(l, 240, 244) ? (a = 3,
                    h = 65536,
                    o = l - 240) : this.decoderError(i),
                    o *= Math.pow(64, a),
                    e = null);
                else if (this.inRange(l, 128, 191))
                    if (s += 1,
                    o += (l - 128) * Math.pow(64, a - s),
                    s !== a)
                        e = null;
                    else {
                        var u = o
                          , c = h;
                        o = 0,
                        a = 0,
                        s = 0,
                        h = 0,
                        e = this.inRange(u, c, 1114111) && !this.inRange(u, 55296, 57343) ? u : this.decoderError(i, l)
                    }
                else
                    o = 0,
                    a = 0,
                    s = 0,
                    h = 0,
                    r--,
                    e = this.decoderError(i, l);
                null !== e && e !== this.EOF_code_point && (65535 >= e ? e > 0 && (n += String.fromCharCode(e)) : (e -= 65536,
                n += String.fromCharCode(55296 + (e >> 10 & 1023)),
                n += String.fromCharCode(56320 + (1023 & e))))
            }
            return n
        }
        ,
        i.prototype.encoderError = function(e) {
            t.$error(1026, e)
        }
        ,
        i.prototype.decoderError = function(e, i) {
            return e && t.$error(1027),
            i || 65533
        }
        ,
        i.prototype.inRange = function(t, e, i) {
            return t >= e && i >= t
        }
        ,
        i.prototype.div = function(t, e) {
            return Math.floor(t / e)
        }
        ,
        i.prototype.stringToCodePoints = function(t) {
            for (var e = [], i = 0, r = t.length; i < t.length; ) {
                var n = t.charCodeAt(i);
                if (this.inRange(n, 55296, 57343))
                    if (this.inRange(n, 56320, 57343))
                        e.push(65533);
                    else if (i == r - 1)
                        e.push(65533);
                    else {
                        var o = t.charCodeAt(i + 1);
                        if (this.inRange(o, 56320, 57343)) {
                            var a = 1023 & n
                              , s = 1023 & o;
                            i += 1,
                            e.push(65536 + (a << 10) + s)
                        } else
                            e.push(65533)
                    }
                else
                    e.push(n);
                i += 1
            }
            return e
        }
        ,
        i
    }();
    t.ByteArray = i,
    __reflect(i.prototype, "egret.ByteArray")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.NORMAL = "normal",
        t.ADD = "add",
        t.ERASE = "erase",
        t
    }();
    t.BlendMode = e,
    __reflect(e.prototype, "egret.BlendMode")
}(egret || (egret = {})),
function(t) {
    var e;
    !function(t) {
        function e(t) {
            var e = n[t];
            return void 0 === e ? 0 : e
        }
        function i(t) {
            var e = r[t];
            return void 0 === e ? "normal" : e
        }
        for (var r = ["normal", "add", "erase"], n = {}, o = r.length, a = 0; o > a; a++) {
            var s = r[a];
            n[s] = a
        }
        t.blendModeToNumber = e,
        t.numberToBlendMode = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e, i) {
        t.useFontMapping = !0,
        t.fontMapping[e] = i
    }
    t.fontMapping = {},
    t.useFontMapping = !1,
    t.registerFontMapping = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t, e, i) {
        var r = t.prototype;
        r.__class__ = e;
        var n = [e];
        i && (n = n.concat(i));
        var o = r.__types__;
        if (r.__types__)
            for (var a = o.length, s = 0; a > s; s++) {
                var h = o[s];
                -1 == n.indexOf(h) && n.push(h)
            }
        r.__types__ = n
    }
    t.registerClass = e
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$stageWidth = 0,
            i.$stageHeight = 0,
            i.$scaleMode = t.StageScaleMode.SHOW_ALL,
            i.$orientation = t.OrientationMode.AUTO,
            i.$maxTouches = 99,
            i.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON,
            i.$stage = i,
            i.$nestLevel = 1,
            i
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "frameRate", {
            get: function() {
                return t.ticker.$frameRate
            },
            set: function(e) {
                t.ticker.$setFrameRate(e)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "stageWidth", {
            get: function() {
                return this.$stageWidth
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "stageHeight", {
            get: function() {
                return this.$stageHeight
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.invalidate = function() {
            t.sys.$invalidateRenderFlag = !0
        }
        ,
        i.prototype.registerImplementation = function(e, i) {
            t.registerImplementation(e, i)
        }
        ,
        i.prototype.getImplementation = function(e) {
            return t.getImplementation(e)
        }
        ,
        Object.defineProperty(i.prototype, "scaleMode", {
            get: function() {
                return this.$scaleMode
            },
            set: function(t) {
                this.$scaleMode != t && (this.$scaleMode = t,
                this.$screen.updateScreenSize())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "orientation", {
            get: function() {
                return this.$orientation
            },
            set: function(t) {
                this.$orientation != t && (this.$orientation = t,
                this.$screen.updateScreenSize())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "textureScaleFactor", {
            get: function() {
                return t.$TextureScaleFactor
            },
            set: function(e) {
                t.$TextureScaleFactor = e
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "maxTouches", {
            get: function() {
                return this.$maxTouches
            },
            set: function(t) {
                this.$maxTouches != t && (this.$maxTouches = t,
                this.$screen.updateMaxTouches())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "dirtyRegionPolicy", {
            get: function() {
                return this.$dirtyRegionPolicy
            },
            set: function(t) {
                this.$dirtyRegionPolicy != t && (this.$dirtyRegionPolicy = t,
                this.$displayList.setDirtyRegionPolicy(t))
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setContentSize = function(t, e) {
            this.$screen.setContentSize(t, e)
        }
        ,
        i
    }(t.DisplayObjectContainer);
    t.Stage = e,
    __reflect(e.prototype, "egret.Stage")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return Object.defineProperty(t, "logLevel", {
            set: function(t) {},
            enumerable: !0,
            configurable: !0
        }),
        t.ALL = "all",
        t.DEBUG = "debug",
        t.INFO = "info",
        t.WARN = "warn",
        t.ERROR = "error",
        t.OFF = "off",
        t
    }();
    t.Logger = e,
    __reflect(e.prototype, "egret.Logger")
}(egret || (egret = {}));
var egret;
!function(t) {
    var e = function() {
        function t() {}
        return t.isNumber = function(t) {
            return "number" == typeof t && !isNaN(t)
        }
        ,
        t.sin = function(e) {
            var i = Math.floor(e)
              , r = i + 1
              , n = t.sinInt(i);
            if (i == e)
                return n;
            var o = t.sinInt(r);
            return (e - i) * o + (r - e) * n
        }
        ,
        t.sinInt = function(t) {
            return t %= 360,
            0 > t && (t += 360),
            egret_sin_map[t]
        }
        ,
        t.cos = function(e) {
            var i = Math.floor(e)
              , r = i + 1
              , n = t.cosInt(i);
            if (i == e)
                return n;
            var o = t.cosInt(r);
            return (e - i) * o + (r - e) * n
        }
        ,
        t.cosInt = function(t) {
            return t %= 360,
            0 > t && (t += 360),
            egret_cos_map[t]
        }
        ,
        t
    }();
    t.NumberUtils = e,
    __reflect(e.prototype, "egret.NumberUtils")
}(egret || (egret = {}));
for (var egret_sin_map = {}, egret_cos_map = {}, DEG_TO_RAD = Math.PI / 180, NumberUtils_i = 0; 360 > NumberUtils_i; NumberUtils_i++)
    egret_sin_map[NumberUtils_i] = Math.sin(NumberUtils_i * DEG_TO_RAD),
    egret_cos_map[NumberUtils_i] = Math.cos(NumberUtils_i * DEG_TO_RAD);
egret_sin_map[90] = 1,
egret_cos_map[90] = 0,
egret_sin_map[180] = 0,
egret_cos_map[180] = -1,
egret_sin_map[270] = -1,
egret_cos_map[270] = 0,
Function.prototype.bind || (Function.prototype.bind = function(t) {
    "function" != typeof this && egret.$error(1029);
    var e = Array.prototype.slice.call(arguments, 1)
      , i = this
      , r = function() {}
      , n = function() {
        return i.apply(this instanceof r && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
    };
    return r.prototype = this.prototype,
    n.prototype = new r,
    n
}
);
var egret;
!function(t) {
    var e = function(e) {
        function i(t, i) {
            void 0 === i && (i = 0);
            var r = e.call(this) || this;
            return r._delay = 0,
            r._currentCount = 0,
            r._running = !1,
            r.updateInterval = 1e3,
            r.lastCount = 1e3,
            r.lastTimeStamp = 0,
            r.delay = t,
            r.repeatCount = 0 | +i,
            r
        }
        return __extends(i, e),
        Object.defineProperty(i.prototype, "delay", {
            get: function() {
                return this._delay
            },
            set: function(t) {
                1 > t && (t = 1),
                this._delay != t && (this._delay = t,
                this.lastCount = this.updateInterval = Math.round(60 * t))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "currentCount", {
            get: function() {
                return this._currentCount
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "running", {
            get: function() {
                return this._running
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.reset = function() {
            this.stop(),
            this._currentCount = 0
        }
        ,
        i.prototype.start = function() {
            this._running || (this.lastCount = this.updateInterval,
            this.lastTimeStamp = t.getTimer(),
            t.ticker.$startTick(this.$update, this),
            this._running = !0)
        }
        ,
        i.prototype.stop = function() {
            this._running && (t.stopTick(this.$update, this),
            this._running = !1)
        }
        ,
        i.prototype.$update = function(e) {
            var i = e - this.lastTimeStamp;
            if (i >= this._delay)
                this.lastCount = this.updateInterval;
            else {
                if (this.lastCount -= 1e3,
                this.lastCount > 0)
                    return !1;
                this.lastCount += this.updateInterval
            }
            this.lastTimeStamp = e,
            this._currentCount++;
            var r = this.repeatCount > 0 && this._currentCount >= this.repeatCount;
            return t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER),
            r && (this.stop(),
            t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER_COMPLETE)),
            !1
        }
        ,
        i
    }(t.EventDispatcher);
    t.Timer = e,
    __reflect(e.prototype, "egret.Timer")
}(egret || (egret = {}));
var egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e, i) {
        for (var r = [], n = 2; n < arguments.length; n++)
            r[n - 2] = arguments[n];
        t.$callLaterFunctionList.push(e),
        t.$callLaterThisList.push(i),
        t.$callLaterArgsList.push(r)
    }
    function i(e, i) {
        for (var r = [], n = 2; n < arguments.length; n++)
            r[n - 2] = arguments[n];
        t.$callAsyncFunctionList.push(e),
        t.$callAsyncThisList.push(i),
        t.$callAsyncArgsList.push(r)
    }
    t.$callLaterFunctionList = [],
    t.$callLaterThisList = [],
    t.$callLaterArgsList = [],
    t.callLater = e,
    t.$callAsyncFunctionList = [],
    t.$callAsyncThisList = [],
    t.$callAsyncArgsList = [],
    t.$callAsync = i
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t, e, i) {
        for (var r = [], n = 3; n < arguments.length; n++)
            r[n - 3] = arguments[n];
        var o, a = t.prototype;
        t.hasOwnProperty("__sets__") || Object.defineProperty(t, "__sets__", {
            value: {}
        }),
        o = t.__sets__;
        var s = o[i];
        if (s)
            return s.apply(e, r);
        var h = Object.getPrototypeOf(a);
        if (null != h) {
            for (; !h.hasOwnProperty(i); )
                if (h = Object.getPrototypeOf(h),
                null == h)
                    return;
            s = Object.getOwnPropertyDescriptor(h, i).set,
            o[i] = s,
            s.apply(e, r)
        }
    }
    function i(t, e, i) {
        var r, n = t.prototype;
        t.hasOwnProperty("__gets__") || Object.defineProperty(t, "__gets__", {
            value: {}
        }),
        r = t.__gets__;
        var o = r[i];
        if (o)
            return o.call(e);
        var a = Object.getPrototypeOf(n);
        if (null != a) {
            for (; !a.hasOwnProperty(i); )
                if (a = Object.getPrototypeOf(a),
                null == a)
                    return;
            return o = Object.getOwnPropertyDescriptor(a, i).get,
            r[i] = o,
            o.call(e)
        }
    }
    t.superSetter = e,
    t.superGetter = i
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t) {
        if (!t)
            return null;
        var e = i[t];
        if (e)
            return e;
        var r = t.split(".")
          , n = r.length;
        e = __global;
        for (var o = 0; n > o; o++) {
            var a = r[o];
            if (e = e[a],
            !e)
                return null
        }
        return i[t] = e,
        e
    }
    var i = {};
    t.getDefinitionByName = e
}(egret || (egret = {}));
var __global = this.__global || this, egret;
!function(t) {}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t) {
        var e = typeof t;
        if (!t || "object" != e && !t.prototype)
            return e;
        var i = t.prototype ? t.prototype : Object.getPrototypeOf(t);
        if (i.hasOwnProperty("__class__"))
            return i.__class__;
        var r = i.constructor.toString().trim()
          , n = r.indexOf("(")
          , o = r.substring(9, n);
        return Object.defineProperty(i, "__class__", {
            value: o,
            enumerable: !1,
            writable: !0
        }),
        o
    }
    t.getQualifiedClassName = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e) {
        if (!e || "object" != typeof e && !e.prototype)
            return null;
        var i = e.prototype ? e.prototype : Object.getPrototypeOf(e)
          , r = Object.getPrototypeOf(i);
        if (!r)
            return null;
        var n = t.getQualifiedClassName(r.constructor);
        return n ? n : null
    }
    t.getQualifiedSuperclassName = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e() {
        return Date.now() - t.sys.$START_TIME
    }
    t.getTimer = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e) {
        var i = t.getDefinitionByName(e);
        return i ? !0 : !1
    }
    t.hasDefinition = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t, e) {
        if (!t || "object" != typeof t)
            return !1;
        var i = Object.getPrototypeOf(t)
          , r = i ? i.__types__ : null;
        return r ? -1 !== r.indexOf(e) : !1
    }
    t.is = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e, i) {
        t.ticker.$startTick(e, i)
    }
    t.startTick = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(e, i) {
        t.ticker.$stopTick(e, i)
    }
    t.stopTick = e
}(egret || (egret = {}));
var egret;
!function(t) {
    function e(t) {
        0 > t && (t = 0),
        t > 16777215 && (t = 16777215);
        for (var e = t.toString(16).toUpperCase(); e.length > 6; )
            e = e.slice(1, e.length);
        for (; e.length < 6; )
            e = "0" + e;
        return "#" + e
    }
    t.toColorString = e
}(egret || (egret = {}));

var __reflect = this && this.__reflect || function(e, t, r) {
    e.__class__ = t,
    r ? r.push(t) : r = [t],
    e.__types__ = e.__types__ ? r.concat(e.__types__) : r
}
, __extends = this && this.__extends || function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var r in t)
            t.hasOwnProperty(r) && (e[r] = t[r])
    }
    ;
    return function(t, r) {
        function i() {
            this.constructor = t
        }
        e(t, r),
        t.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype,
        new i)
    }
}(), egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r(r, i, n, a, o) {
                var s = t.call(this) || this;
                if (s.showPanle = !0,
                s.fpsHeight = 0,
                s.WIDTH = 101,
                s.HEIGHT = 20,
                s.bgCanvasColor = "#18304b",
                s.fpsFrontColor = "#18fefe",
                s.WIDTH_COST = 33,
                s.cost1Color = "#18fefe",
                s.cost2Color = "#ffff00",
                s.cost3Color = "#ff0000",
                s.arrFps = [],
                s.arrCost = [],
                s.arrLog = [],
                i || n) {
                    "canvas" == e.Capabilities.renderMode ? s.renderMode = "Canvas" : s.renderMode = "WebGL",
                    s.panelX = void 0 === o.x ? 0 : parseInt(o.x),
                    s.panelY = void 0 === o.y ? 0 : parseInt(o.y),
                    s.fontColor = void 0 === o.textColor ? "#ffffff" : o.textColor.replace("0x", "#"),
                    s.fontSize = void 0 === o.size ? 12 : parseInt(o.size),
                    e.Capabilities.isMobile && (s.fontSize -= 2);
                    var l = document.createElement("div");
                    l.style.position = "absolute",
                    l.style.background = "rgba(0,0,0," + o.bgAlpha + ")",
                    l.style.left = s.panelX + "px",
                    l.style.top = s.panelY + "px",
                    l.style.pointerEvents = "none",
                    document.body.appendChild(l);
                    var h = document.createElement("div");
                    h.style.color = s.fontColor,
                    h.style.fontSize = s.fontSize + "px",
                    h.style.lineHeight = s.fontSize + "px",
                    h.style.margin = "4px 4px 4px 4px",
                    s.container = h,
                    l.appendChild(h),
                    i && s.addFps(),
                    n && s.addLog()
                }
                return s
            }
            return __extends(r, t),
            r.prototype.addFps = function() {
                var e = document.createElement("div");
                e.style.display = "inline-block",
                this.containerFps = e,
                this.container.appendChild(e);
                var t = document.createElement("div");
                t.style.paddingBottom = "2px",
                this.fps = t,
                this.containerFps.appendChild(t),
                t.innerHTML = "0 FPS " + this.renderMode + "<br/>min0 max0 avg0";
                var r = document.createElement("canvas");
                this.containerFps.appendChild(r),
                r.width = this.WIDTH,
                r.height = this.HEIGHT,
                this.canvasFps = r;
                var i = r.getContext("2d");
                this.contextFps = i,
                i.fillStyle = this.bgCanvasColor,
                i.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                var n = document.createElement("div");
                this.divDatas = n,
                this.containerFps.appendChild(n);
                var a = document.createElement("div");
                a.style["float"] = "left",
                a.innerHTML = "Draw<br/>Dirty<br/>Cost",
                n.appendChild(a);
                var o = document.createElement("div");
                o.style.paddingLeft = a.offsetWidth + 20 + "px",
                n.appendChild(o);
                var s = document.createElement("div");
                this.divDraw = s,
                s.innerHTML = "0<br/>0<br/>",
                o.appendChild(s);
                var l = document.createElement("div");
                this.divCost = l,
                l.innerHTML = '<font  style="color:' + this.cost1Color + '">0<font/> <font  style="color:' + this.cost2Color + '">0<font/> <font  style="color:' + this.cost3Color + '">0<font/>',
                o.appendChild(l),
                r = document.createElement("canvas"),
                this.canvasCost = r,
                this.containerFps.appendChild(r),
                r.width = this.WIDTH,
                r.height = this.HEIGHT,
                i = r.getContext("2d"),
                this.contextCost = i,
                i.fillStyle = this.bgCanvasColor,
                i.fillRect(0, 0, this.WIDTH, this.HEIGHT),
                i.fillStyle = "#000000",
                i.fillRect(this.WIDTH_COST, 0, 1, this.HEIGHT),
                i.fillRect(2 * this.WIDTH_COST + 1, 0, 1, this.HEIGHT),
                this.fpsHeight = this.container.offsetHeight
            }
            ,
            r.prototype.addLog = function() {
                var e = document.createElement("div");
                e.style.maxWidth = document.body.clientWidth - 8 - this.panelX + "px",
                e.style.wordWrap = "break-word",
                this.log = e,
                this.container.appendChild(e)
            }
            ,
            r.prototype.update = function(e, t) {
                void 0 === t && (t = !1);
                var r, i, n, a;
                t ? (r = this.arrFps[this.arrFps.length - 1],
                i = this.arrCost[this.arrCost.length - 1][0],
                n = this.arrCost[this.arrCost.length - 1][1],
                a = this.arrCost[this.arrCost.length - 1][2]) : (r = e.fps,
                i = e.costTicker,
                n = e.costDirty,
                a = e.costRender,
                this.lastNumDraw = e.draw,
                this.lastNumDirty = e.dirty,
                this.arrFps.push(r),
                this.arrCost.push([i, n, a]));
                var o = 0
                  , s = this.arrFps.length;
                s > 101 && (s = 101,
                this.arrFps.shift(),
                this.arrCost.shift());
                for (var l = this.arrFps[0], h = this.arrFps[0], c = 0; s > c; c++) {
                    var u = this.arrFps[c];
                    o += u,
                    l > u ? l = u : u > h && (h = u)
                }
                var d = this.WIDTH
                  , p = this.HEIGHT
                  , f = this.contextFps;
                f.drawImage(this.canvasFps, 1, 0, d - 1, p, 0, 0, d - 1, p),
                f.fillStyle = this.bgCanvasColor,
                f.fillRect(d - 1, 0, 1, p);
                var g = Math.floor(r / 60 * 20);
                1 > g && (g = 1),
                f.fillStyle = this.fpsFrontColor,
                f.fillRect(d - 1, 20 - g, 1, g);
                var v = this.WIDTH_COST;
                f = this.contextCost,
                f.drawImage(this.canvasCost, 1, 0, v - 1, p, 0, 0, v - 1, p),
                f.drawImage(this.canvasCost, v + 2, 0, v - 1, p, v + 1, 0, v - 1, p),
                f.drawImage(this.canvasCost, 2 * v + 3, 0, v - 1, p, 2 * v + 2, 0, v - 1, p);
                var m = Math.floor(i / 2);
                1 > m ? m = 1 : m > 20 && (m = 20);
                var y = Math.floor(n / 2);
                1 > y ? y = 1 : y > 20 && (y = 20);
                var x = Math.floor(a / 2);
                1 > x ? x = 1 : x > 20 && (x = 20),
                f.fillStyle = this.bgCanvasColor,
                f.fillRect(v - 1, 0, 1, p),
                f.fillRect(2 * v, 0, 1, p),
                f.fillRect(3 * v + 1, 0, 1, p),
                f.fillStyle = this.cost1Color,
                f.fillRect(v - 1, 20 - m, 1, m),
                f.fillStyle = this.cost2Color,
                f.fillRect(2 * v, 20 - y, 1, y),
                f.fillStyle = this.cost3Color,
                f.fillRect(3 * v + 1, 20 - x, 1, x);
                var b = Math.floor(o / s)
                  , w = r + " FPS " + this.renderMode;
                this.showPanle && (w += "<br/>min" + l + " max" + h + " avg" + b,
                this.divDraw.innerHTML = this.lastNumDraw + "<br/>" + this.lastNumDirty + "%<br/>",
                this.divCost.innerHTML = '<font  style="color:#18fefe">' + i + '<font/> <font  style="color:#ffff00">' + n + '<font/> <font  style="color:#ff0000">' + a + "<font/>"),
                this.fps.innerHTML = w
            }
            ,
            r.prototype.updateInfo = function(e) {
                for (this.arrLog.push(e),
                this.log.innerHTML = this.arrLog.join("<br/>"); document.body.clientHeight < this.log.offsetHeight + this.fpsHeight + this.panelY + 2 * this.fontSize; )
                    this.arrLog.shift(),
                    this.log.innerHTML = this.arrLog.join("<br/>")
            }
            ,
            r
        }(e.DisplayObject);
        t.WebFps = r,
        __reflect(r.prototype, "egret.web.WebFps", ["egret.FPSDisplay", "egret.DisplayObject"]),
        e.FPSDisplay = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = "egret.BitmapData";
        var temp = function Temp(){};
        e.registerClass(temp, r),
        e.registerClass(temp, r),
        e.registerClass(temp, r)
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})),
function(e) {
    function t(t) {
        return t.hashCode = t.$hashCode = e.$hashCount++,
        t
    }
    e.$toBitmapData = t
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r;
        !function(r) {
            function i(e) {
                return window.localStorage.getItem(e)
            }
            function n(t, r) {
                try {
                    return window.localStorage.setItem(t, r),
                    !0
                } catch (i) {
                    return e.$warn(1047, t, r),
                    !1
                }
            }
            function a(e) {
                window.localStorage.removeItem(e)
            }
            function o() {
                window.localStorage.clear()
            }
            t.getItem = i,
            t.setItem = n,
            t.removeItem = a,
            t.clear = o
        }(r = t.web || (t.web = {}))
    }(t = e.localStorage || (e.localStorage = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(r) {
            function i() {
                var e = r.call(this) || this;
                return e.loaded = !1,
                e
            }
            return __extends(i, r),
            Object.defineProperty(i.prototype, "length", {
                get: function() {
                    if (this.originAudio)
                        return this.originAudio.duration;
                    throw new Error("sound not loaded!")
                },
                enumerable: !0,
                configurable: !0
            }),
            i.prototype.load = function(t) {
                function r() {
                    a(),
                    l.indexOf("firefox") >= 0 && (s.pause(),
                    s.muted = !1),
                    o.loaded = !0,
                    o.dispatchEventWith(e.Event.COMPLETE)
                }
                function n() {
                    a(),
                    o.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }
                function a() {
                    s.removeEventListener("canplaythrough", r),
                    s.removeEventListener("error", n)
                }
                var o = this;
                this.url = t;
                var s = new Audio(t);
                s.addEventListener("canplaythrough", r),
                s.addEventListener("error", n);
                var l = navigator.userAgent.toLowerCase();
                l.indexOf("firefox") >= 0 && (s.autoplay = !0,
                s.muted = !0),
                s.load(),
                this.originAudio = s,
                i.clearAudios[this.url] && delete i.clearAudios[this.url],
                i.$recycle(this.url, s)
            }
            ,
            i.prototype.play = function(r, n) {
                r = +r || 0,
                n = +n || 0;
                var a = i.$pop(this.url);
                null == a && (a = this.originAudio.cloneNode()),
                a.autoplay = !0;
                var o = new t.HtmlSoundChannel(a);
                return o.$url = this.url,
                o.$loops = n,
                o.$startTime = r,
                o.$play(),
                e.sys.$pushSoundChannel(o),
                o
            }
            ,
            i.prototype.close = function() {
                0 == this.loaded && this.originAudio && (this.originAudio.src = ""),
                this.originAudio && (this.originAudio = null),
                i.$clear(this.url)
            }
            ,
            i.$clear = function(e) {
                i.clearAudios[e] = !0;
                var t = i.audios[e];
                t && (t.length = 0)
            }
            ,
            i.$pop = function(e) {
                var t = i.audios[e];
                return t && t.length > 0 ? t.pop() : null
            }
            ,
            i.$recycle = function(e, t) {
                if (!i.clearAudios[e]) {
                    var r = i.audios[e];
                    null == i.audios[e] && (r = i.audios[e] = []),
                    r.push(t)
                }
            }
            ,
            i.MUSIC = "music",
            i.EFFECT = "effect",
            i.audios = {},
            i.clearAudios = {},
            i
        }(e.EventDispatcher);
        t.HtmlSound = r,
        __reflect(r.prototype, "egret.web.HtmlSound", ["egret.Sound"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(r) {
            function i(t) {
                var i = r.call(this) || this;
                return i.$startTime = 0,
                i.audio = null,
                i.isStopped = !1,
                i.canPlay = function() {
                    i.audio.removeEventListener("canplay", i.canPlay);
                    try {
                        i.audio.currentTime = i.$startTime
                    } catch (e) {} finally {
                        i.audio.play()
                    }
                }
                ,
                i.onPlayEnd = function() {
                    return 1 == i.$loops ? (i.stop(),
                    void i.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (i.$loops > 0 && i.$loops--,
                    void i.$play())
                }
                ,
                i._volume = 1,
                t.addEventListener("ended", i.onPlayEnd),
                i.audio = t,
                i
            }
            return __extends(i, r),
            i.prototype.$play = function() {
                if (this.isStopped)
                    return void e.$error(1036);
                try {
                    this.audio.volume = this._volume,
                    this.audio.currentTime = this.$startTime
                } catch (t) {
                    return void this.audio.addEventListener("canplay", this.canPlay)
                }
                this.audio.play()
            }
            ,
            i.prototype.stop = function() {
                if (this.audio) {
                    this.isStopped || e.sys.$popSoundChannel(this),
                    this.isStopped = !0;
                    var r = this.audio;
                    r.removeEventListener("ended", this.onPlayEnd),
                    r.volume = 0,
                    this._volume = 0,
                    this.audio = null;
                    var i = this.$url;
                    window.setTimeout(function() {
                        r.pause(),
                        t.HtmlSound.$recycle(i, r)
                    }, 200)
                }
            }
            ,
            Object.defineProperty(i.prototype, "volume", {
                get: function() {
                    return this._volume
                },
                set: function(t) {
                    return this.isStopped ? void e.$error(1036) : (this._volume = t,
                    void (this.audio && (this.audio.volume = t)))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "position", {
                get: function() {
                    return this.audio ? this.audio.currentTime : 0
                },
                enumerable: !0,
                configurable: !0
            }),
            i
        }(e.EventDispatcher);
        t.HtmlSoundChannel = r,
        __reflect(r.prototype, "egret.web.HtmlSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function() {
            function e() {}
            return e.decodeAudios = function() {
                if (!(e.decodeArr.length <= 0 || e.isDecoding)) {
                    e.isDecoding = !0;
                    var t = e.decodeArr.shift();
                    e.ctx.decodeAudioData(t.buffer, function(r) {
                        t.self.audioBuffer = r,
                        t.success && t.success(),
                        e.isDecoding = !1,
                        e.decodeAudios()
                    }, function() {
                        alert("sound decode error: " + t.url + "！\nsee http://edn.egret.com/cn/docs/page/156"),
                        t.fail && t.fail(),
                        e.isDecoding = !1,
                        e.decodeAudios()
                    })
                }
            }
            ,
            e.decodeArr = [],
            e.isDecoding = !1,
            e
        }();
        t.WebAudioDecode = r,
        __reflect(r.prototype, "egret.web.WebAudioDecode");
        var i = function(i) {
            function n() {
                var e = i.call(this) || this;
                return e.loaded = !1,
                e
            }
            return __extends(n, i),
            Object.defineProperty(n.prototype, "length", {
                get: function() {
                    if (this.audioBuffer)
                        return this.audioBuffer.duration;
                    throw new Error("sound not loaded!")
                },
                enumerable: !0,
                configurable: !0
            }),
            n.prototype.load = function(t) {
                function i() {
                    a.loaded = !0,
                    a.dispatchEventWith(e.Event.COMPLETE)
                }
                function n() {
                    a.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }
                var a = this;
                this.url = t;
                var o = new XMLHttpRequest;
                o.open("GET", t, !0),
                o.responseType = "arraybuffer",
                o.onreadystatechange = function() {
                    if (4 == o.readyState) {
                        var t = o.status >= 400 || 0 == o.status;
                        t ? a.dispatchEventWith(e.IOErrorEvent.IO_ERROR) : (r.decodeArr.push({
                            buffer: o.response,
                            success: i,
                            fail: n,
                            self: a,
                            url: a.url
                        }),
                        r.decodeAudios())
                    }
                }
                ,
                o.send()
            }
            ,
            n.prototype.play = function(r, i) {
                r = +r || 0,
                i = +i || 0;
                var n = new t.WebAudioSoundChannel;
                return n.$url = this.url,
                n.$loops = i,
                n.$audioBuffer = this.audioBuffer,
                n.$startTime = r,
                n.$play(),
                e.sys.$pushSoundChannel(n),
                n
            }
            ,
            n.prototype.close = function() {}
            ,
            n.MUSIC = "music",
            n.EFFECT = "effect",
            n
        }(e.EventDispatcher);
        t.WebAudioSound = i,
        __reflect(i.prototype, "egret.web.WebAudioSound", ["egret.Sound"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(r) {
            function i() {
                var i = r.call(this) || this;
                return i.$startTime = 0,
                i.bufferSource = null,
                i.context = t.WebAudioDecode.ctx,
                i.isStopped = !1,
                i._currentTime = 0,
                i._volume = 1,
                i.onPlayEnd = function() {
                    return 1 == i.$loops ? (i.stop(),
                    void i.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (i.$loops > 0 && i.$loops--,
                    void i.$play())
                }
                ,
                i._startTime = 0,
                i.context.createGain ? i.gain = i.context.createGain() : i.gain = i.context.createGainNode(),
                i
            }
            return __extends(i, r),
            i.prototype.$play = function() {
                if (this.isStopped)
                    return void e.$error(1036);
                this.bufferSource && (this.bufferSource.onended = null,
                this.bufferSource = null);
                var t = this.context
                  , r = this.gain
                  , i = t.createBufferSource();
                this.bufferSource = i,
                i.buffer = this.$audioBuffer,
                i.connect(r),
                r.connect(t.destination),
                i.onended = this.onPlayEnd,
                this._startTime = Date.now(),
                this.gain.gain.value = this._volume,
                i.start(0, this.$startTime),
                this._currentTime = 0
            }
            ,
            i.prototype.stop = function() {
                if (this.bufferSource) {
                    var t = this.bufferSource;
                    t.stop ? t.stop(0) : t.noteOff(0),
                    t.onended = null,
                    t.disconnect(),
                    this.bufferSource = null,
                    this.$audioBuffer = null
                }
                this.isStopped || e.sys.$popSoundChannel(this),
                this.isStopped = !0
            }
            ,
            Object.defineProperty(i.prototype, "volume", {
                get: function() {
                    return this._volume
                },
                set: function(t) {
                    return this.isStopped ? void e.$error(1036) : (this._volume = t,
                    void (this.gain.gain.value = t))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(i.prototype, "position", {
                get: function() {
                    return this.bufferSource ? (Date.now() - this._startTime) / 1e3 + this.$startTime : 0
                },
                enumerable: !0,
                configurable: !0
            }),
            i
        }(e.EventDispatcher);
        t.WebAudioSoundChannel = r,
        __reflect(r.prototype, "egret.web.WebAudioSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r(r, i) {
                void 0 === i && (i = !0);
                var n = t.call(this) || this;
                return n.loaded = !1,
                n.closed = !1,
                n.heightSet = 0 / 0,
                n.widthSet = 0 / 0,
                n.waiting = !1,
                n.userPause = !1,
                n.userPlay = !1,
                n.isPlayed = !1,
                n.screenChanged = function(t) {
                    var r = document.fullscreenEnabled || document.webkitIsFullScreen;
                    r || (n.checkFullScreen(!1),
                    e.Capabilities.isMobile || (n._fullscreen = r))
                }
                ,
                n._fullscreen = !0,
                n.onVideoLoaded = function() {
                    n.video.removeEventListener("canplay", n.onVideoLoaded);
                    var t = n.video;
                    n.loaded = !0,
                    n.posterData && (n.posterData.width = n.getPlayWidth(),
                    n.posterData.height = n.getPlayHeight()),
                    t.width = t.videoWidth,
                    t.height = t.videoHeight,
                    n.$invalidateContentBounds(),
                    window.setTimeout(function() {
                        n.dispatchEventWith(e.Event.COMPLETE)
                    }, 200)
                }
                ,
                n.$renderNode = new e.sys.BitmapNode,
                n.src = r,
                n.once(e.Event.ADDED_TO_STAGE, n.loadPoster, n),
                r && n.load(),
                n
            }
            return __extends(r, t),
            r.prototype.load = function(t, r) {
                var i = this;
                if (void 0 === r && (r = !0),
                t = t || this.src,
                this.src = t,
                !this.video || this.video.src != t) {
                    var n;
                    !this.video || e.Capabilities.isMobile ? (n = document.createElement("video"),
                    this.video = n,
                    n.controls = null) : n = this.video,
                    n.src = t,
                    n.setAttribute("autoplay", "autoplay"),
                    n.setAttribute("webkit-playsinline", "true"),
                    n.addEventListener("canplay", this.onVideoLoaded),
                    n.addEventListener("error", function() {
                        return i.onVideoError()
                    }),
                    n.addEventListener("ended", function() {
                        return i.onVideoEnded()
                    });
                    var a = !1;
                    n.addEventListener("canplay", function() {
                        i.waiting = !1,
                        a ? i.userPause ? i.pause() : i.userPlay && i.play() : (a = !0,
                        n.pause())
                    }),
                    n.addEventListener("waiting", function() {
                        i.waiting = !0
                    }),
                    n.load(),
                    this.videoPlay(),
                    n.style.position = "absolute",
                    n.style.top = "0px",
                    n.style.zIndex = "-88888",
                    n.style.left = "0px",
                    n.height = 1,
                    n.width = 1
                }
            }
            ,
            r.prototype.play = function(t, r) {
                var i = this;
                if (void 0 === r && (r = !1),
                0 == this.loaded)
                    return this.load(this.src),
                    void this.once(e.Event.COMPLETE, function(e) {
                        return i.play(t, r)
                    }, this);
                this.isPlayed = !0;
                var n = this.video;
                void 0 != t && (n.currentTime = +t || 0),
                n.loop = !!r,
                e.Capabilities.isMobile ? n.style.zIndex = "-88888" : n.style.zIndex = "9999",
                n.style.position = "absolute",
                n.style.top = "0px",
                n.style.left = "0px",
                n.height = n.videoHeight,
                n.width = n.videoWidth,
                "Windows PC" != e.Capabilities.os && "Mac OS" != e.Capabilities.os && window.setTimeout(function() {
                    n.width = 0
                }, 1e3),
                this.checkFullScreen(this._fullscreen)
            }
            ,
            r.prototype.videoPlay = function() {
                return this.userPause = !1,
                this.waiting ? void (this.userPlay = !0) : (this.userPlay = !1,
                void this.video.play())
            }
            ,
            r.prototype.checkFullScreen = function(t) {
                var r = this.video;
                if (t)
                    null == r.parentElement && (r.removeAttribute("webkit-playsinline"),
                    document.body.appendChild(r)),
                    e.stopTick(this.markDirty, this),
                    this.goFullscreen();
                else if (null != r.parentElement && r.parentElement.removeChild(r),
                r.setAttribute("webkit-playsinline", "true"),
                this.setFullScreenMonitor(!1),
                e.startTick(this.markDirty, this),
                e.Capabilities.isMobile)
                    return this.video.currentTime = 0,
                    void this.onVideoEnded();
                this.videoPlay()
            }
            ,
            r.prototype.goFullscreen = function() {
                var t, r = this.video;
                return t = e.web.getPrefixStyleName("requestFullscreen", r),
                r[t] || (t = e.web.getPrefixStyleName("requestFullScreen", r),
                r[t]) ? (r.removeAttribute("webkit-playsinline"),
                r[t](),
                this.setFullScreenMonitor(!0),
                !0) : !0
            }
            ,
            r.prototype.setFullScreenMonitor = function(e) {
                var t = this.video;
                e ? (t.addEventListener("mozfullscreenchange", this.screenChanged),
                t.addEventListener("webkitfullscreenchange", this.screenChanged),
                t.addEventListener("mozfullscreenerror", this.screenError),
                t.addEventListener("webkitfullscreenerror", this.screenError)) : (t.removeEventListener("mozfullscreenchange", this.screenChanged),
                t.removeEventListener("webkitfullscreenchange", this.screenChanged),
                t.removeEventListener("mozfullscreenerror", this.screenError),
                t.removeEventListener("webkitfullscreenerror", this.screenError))
            }
            ,
            r.prototype.screenError = function() {
                e.$error(3014)
            }
            ,
            r.prototype.exitFullscreen = function() {
                document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.oCancelFullScreen ? document.oCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
            }
            ,
            r.prototype.onVideoEnded = function() {
                this.pause(),
                this.isPlayed = !1,
                this.$invalidateContentBounds(),
                this.dispatchEventWith(e.Event.ENDED)
            }
            ,
            r.prototype.onVideoError = function() {
                this.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
            }
            ,
            r.prototype.close = function() {
                var e = this;
                this.closed = !0,
                this.video.removeEventListener("canplay", this.onVideoLoaded),
                this.video.removeEventListener("error", function() {
                    return e.onVideoError()
                }),
                this.video.removeEventListener("ended", function() {
                    return e.onVideoEnded()
                }),
                this.pause(),
                0 == this.loaded && this.video && (this.video.src = ""),
                this.video && this.video.parentElement && (this.video.parentElement.removeChild(this.video),
                this.video = null),
                this.loaded = !1
            }
            ,
            r.prototype.pause = function() {
                return this.userPlay = !1,
                this.waiting ? void (this.userPause = !0) : (this.userPause = !1,
                e.stopTick(this.markDirty, this),
                void this.$invalidate())
            }
            ,
            Object.defineProperty(r.prototype, "volume", {
                get: function() {
                    return this.video ? this.video.volume : 1
                },
                set: function(e) {
                    this.video && (this.video.volume = e)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "position", {
                get: function() {
                    return this.video ? this.video.currentTime : 0
                },
                set: function(e) {
                    this.video && (this.video.currentTime = e)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "fullscreen", {
                get: function() {
                    return this._fullscreen
                },
                set: function(t) {
                    e.Capabilities.isMobile || (this._fullscreen = !!t,
                    this.video && 0 == this.video.paused && this.checkFullScreen(this._fullscreen))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "bitmapData", {
                get: function() {
                    return this.video && this.loaded ? (this._bitmapData || (this.video.width = this.video.videoWidth,
                    this.video.height = this.video.videoHeight,
                    this._bitmapData = new e.BitmapData(this.video),
                    this._bitmapData.$deleteSource = !1),
                    this._bitmapData) : null
                },
                enumerable: !0,
                configurable: !0
            }),
            r.prototype.loadPoster = function() {
                var t = this
                  , r = this.poster;
                if (r) {
                    var i = new e.ImageLoader;
                    i.once(e.Event.COMPLETE, function(e) {
                        i.data;
                        t.posterData = i.data,
                        t.posterData.width = t.getPlayWidth(),
                        t.posterData.height = t.getPlayHeight(),
                        t.$invalidateContentBounds()
                    }, this),
                    i.load(r)
                }
            }
            ,
            r.prototype.$measureContentBounds = function(e) {
                var t = this.bitmapData
                  , r = this.posterData;
                t ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : r ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : e.setEmpty()
            }
            ,
            r.prototype.getPlayWidth = function() {
                return isNaN(this.widthSet) ? this.bitmapData ? this.bitmapData.width : this.posterData ? this.posterData.width : 0 / 0 : this.widthSet
            }
            ,
            r.prototype.getPlayHeight = function() {
                return isNaN(this.heightSet) ? this.bitmapData ? this.bitmapData.height : this.posterData ? this.posterData.height : 0 / 0 : this.heightSet
            }
            ,
            r.prototype.$render = function() {
                var t = this.$renderNode
                  , r = this.bitmapData
                  , i = this.posterData
                  , n = this.getPlayWidth()
                  , a = this.getPlayHeight();
                this.isPlayed && !e.Capabilities.isMobile || !i ? this.isPlayed && r && (t.image = r,
                t.imageWidth = r.width,
                t.imageHeight = r.height,
                e.WebGLUtils.deleteWebGLTexture(r.webGLTexture),
                r.webGLTexture = null,
                t.drawImage(0, 0, r.width, r.height, 0, 0, n, a)) : (t.image = i,
                t.imageWidth = n,
                t.imageHeight = a,
                t.drawImage(0, 0, i.width, i.height, 0, 0, n, a))
            }
            ,
            r.prototype.markDirty = function() {
                return this.$invalidate(),
                !0
            }
            ,
            r.prototype.$setHeight = function(e) {
                return this.heightSet = +e || 0,
                this.$invalidate(),
                this.$invalidateContentBounds(),
                t.prototype.$setHeight.call(this, e)
            }
            ,
            r.prototype.$setWidth = function(e) {
                return this.widthSet = +e || 0,
                this.$invalidate(),
                this.$invalidateContentBounds(),
                t.prototype.$setWidth.call(this, e)
            }
            ,
            Object.defineProperty(r.prototype, "paused", {
                get: function() {
                    return this.video ? this.video.paused : !0
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "length", {
                get: function() {
                    if (this.video)
                        return this.video.duration;
                    throw new Error("Video not loaded!")
                },
                enumerable: !0,
                configurable: !0
            }),
            r
        }(e.DisplayObject);
        t.WebVideo = r,
        __reflect(r.prototype, "egret.web.WebVideo", ["egret.Video", "egret.DisplayObject"]),
        e.Video = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r() {
                var e = t.call(this) || this;
                return e._url = "",
                e._method = "",
                e
            }
            return __extends(r, t),
            Object.defineProperty(r.prototype, "response", {
                get: function() {
                    if (!this._xhr)
                        return null;
                    if (void 0 != this._xhr.response)
                        return this._xhr.response;
                    if ("text" == this._responseType)
                        return this._xhr.responseText;
                    if ("arraybuffer" == this._responseType && /msie 9.0/i.test(navigator.userAgent)) {
                        var e = window;
                        return e.convertResponseBodyToText(this._xhr.responseBody)
                    }
                    return "document" == this._responseType ? this._xhr.responseXML : null
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "responseType", {
                get: function() {
                    return this._responseType
                },
                set: function(e) {
                    this._responseType = e
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(r.prototype, "withCredentials", {
                get: function() {
                    return this._withCredentials
                },
                set: function(e) {
                    this._withCredentials = e
                },
                enumerable: !0,
                configurable: !0
            }),
            r.prototype.getXHR = function() {
                return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
            }
            ,
            r.prototype.open = function(e, t) {
                void 0 === t && (t = "GET"),
                this._url = e,
                this._method = t,
                this._xhr && (this._xhr.abort(),
                this._xhr = null),
                this._xhr = this.getXHR(),
                this._xhr.onreadystatechange = this.onReadyStateChange.bind(this),
                this._xhr.onprogress = this.updateProgress.bind(this),
                this._xhr.open(this._method, this._url, !0)
            }
            ,
            r.prototype.send = function(e) {
                if (null != this._responseType && (this._xhr.responseType = this._responseType),
                null != this._withCredentials && (this._xhr.withCredentials = this._withCredentials),
                this.headerObj)
                    for (var t in this.headerObj)
                        this._xhr.setRequestHeader(t, this.headerObj[t]);
                this._xhr.send(e)
            }
            ,
            r.prototype.abort = function() {
                this._xhr && this._xhr.abort()
            }
            ,
            r.prototype.getAllResponseHeaders = function() {
                if (!this._xhr)
                    return null;
                var e = this._xhr.getAllResponseHeaders();
                return e ? e : ""
            }
            ,
            r.prototype.setRequestHeader = function(e, t) {
                this.headerObj || (this.headerObj = {}),
                this.headerObj[e] = t
            }
            ,
            r.prototype.getResponseHeader = function(e) {
                if (!this._xhr)
                    return null;
                var t = this._xhr.getResponseHeader(e);
                return t ? t : ""
            }
            ,
            r.prototype.onReadyStateChange = function() {
                var t = this._xhr;
                if (4 == t.readyState) {
                    var r = t.status >= 400 || 0 == t.status
                      , i = (this._url,
                    this);
                    window.setTimeout(function() {
                        r ? i.dispatchEventWith(e.IOErrorEvent.IO_ERROR) : i.dispatchEventWith(e.Event.COMPLETE)
                    }, 0)
                }
            }
            ,
            r.prototype.updateProgress = function(t) {
                t.lengthComputable && e.ProgressEvent.dispatchProgressEvent(this, e.ProgressEvent.PROGRESS, t.loaded, t.total)
            }
            ,
            r
        }(e.EventDispatcher);
        t.WebHttpRequest = r,
        __reflect(r.prototype, "egret.web.WebHttpRequest", ["egret.HttpRequest"]),
        e.HttpRequest = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = 'asd'
          , i = function(i) {
            function n() {
                var e = null !== i && i.apply(this, arguments) || this;
                return e.data = null,
                e._crossOrigin = null,
                e._hasCrossOriginSet = !1,
                e.currentImage = null,
                e.request = null,
                e
            }
            return __extends(n, i),
            Object.defineProperty(n.prototype, "crossOrigin", {
                get: function() {
                    return this._crossOrigin
                },
                set: function(e) {
                    this._hasCrossOriginSet = !0,
                    this._crossOrigin = e
                },
                enumerable: !0,
                configurable: !0
            }),
            n.prototype.load = function(r) {
                if (t.Html5Capatibility._canUseBlob && 0 != r.indexOf("wxLocalResource:") && 0 != r.indexOf("data:") && 0 != r.indexOf("http:") && 0 != r.indexOf("https:")) {
                    var i = this.request;
                    i || (i = this.request = new e.web.WebHttpRequest,
                    i.addEventListener(e.Event.COMPLETE, this.onBlobLoaded, this),
                    i.addEventListener(e.IOErrorEvent.IO_ERROR, this.onBlobError, this),
                    i.responseType = "blob"),
                    i.open(r),
                    i.send()
                } else
                    this.loadImage(r)
            }
            ,
            n.prototype.onBlobLoaded = function(e) {
                var t = this.request.response;
                this.request = void 0,
                this.loadImage(r.createObjectURL(t))
            }
            ,
            n.prototype.onBlobError = function(e) {
                this.dispatchIOError(this.currentURL),
                this.request = void 0
            }
            ,
            n.prototype.loadImage = function(e) {
                var t = new Image;
                this.data = null,
                this.currentImage = t,
                this._hasCrossOriginSet ? this._crossOrigin && (t.crossOrigin = this._crossOrigin) : n.crossOrigin && (t.crossOrigin = n.crossOrigin),
                t.onload = this.onImageComplete.bind(this),
                t.onerror = this.onLoadError.bind(this),
                t.src = e
            }
            ,
            n.prototype.onImageComplete = function(t) {
                var r = this.getImage(t);
                if (r) {
                    this.data = new e.BitmapData(r);
                    var i = this;
                    window.setTimeout(function() {
                        i.dispatchEventWith(e.Event.COMPLETE)
                    }, 0)
                }
            }
            ,
            n.prototype.onLoadError = function(e) {
                var t = this.getImage(e);
                t && this.dispatchIOError(t.src)
            }
            ,
            n.prototype.dispatchIOError = function(t) {
                var r = this;
                window.setTimeout(function() {
                    r.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }, 0)
            }
            ,
            n.prototype.getImage = function(t) {
                var i = t.target
                  , n = i.src;
                if (0 == n.indexOf("blob:"))
                    try {
                        r.revokeObjectURL(i.src)
                    } catch (a) {
                        e.$warn(1037)
                    }
                return i.onerror = null,
                i.onload = null,
                this.currentImage !== i ? null : (this.currentImage = null,
                i)
            }
            ,
            n.crossOrigin = null,
            n
        }(e.EventDispatcher);
        t.WebImageLoader = i,
        __reflect(i.prototype, "egret.web.WebImageLoader", ["egret.ImageLoader"]),
        e.ImageLoader = i
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(r) {
            function i() {
                var e = r.call(this) || this;
                return e._isNeedShow = !1,
                e.inputElement = null,
                e.inputDiv = null,
                e._gscaleX = 0,
                e._gscaleY = 0,
                e.textValue = "",
                e.colorValue = 16777215,
                e._styleInfoes = {},
                e
            }
            return __extends(i, r),
            i.prototype.$setTextField = function(e) {
                return this.$textfield = e,
                !0
            }
            ,
            i.prototype.$addToStage = function() {
                this.htmlInput = e.web.$getTextAdapter(this.$textfield)
            }
            ,
            i.prototype._initElement = function() {
                var t = this.$textfield.localToGlobal(0, 0)
                  , r = t.x
                  , i = t.y
                  , n = this.htmlInput.$scaleX
                  , a = this.htmlInput.$scaleY;
                this.inputDiv.style.left = r * n + "px",
                this.inputDiv.style.top = i * a + "px",
                this.$textfield.multiline && this.$textfield.height > this.$textfield.size ? (this.inputDiv.style.top = i * a + "px",
                this.inputElement.style.top = -this.$textfield.lineSpacing / 2 * a + "px") : (this.inputDiv.style.top = i * a + "px",
                this.inputElement.style.top = "0px");
                for (var o = this.$textfield, s = 1, l = 1, h = 0; o.parent; )
                    s *= o.scaleX,
                    l *= o.scaleY,
                    h += o.rotation,
                    o = o.parent;
                var c = e.web.getPrefixStyleName("transform");
                this.inputDiv.style[c] = "rotate(" + h + "deg)",
                this._gscaleX = n * s,
                this._gscaleY = a * l
            }
            ,
            i.prototype.$show = function() {
                this.htmlInput.isCurrentStageText(this) ? this.inputElement.onblur = null : (this.inputElement = this.htmlInput.getInputElement(this),
                this.$textfield.multiline ? this.inputElement.type = "text" : this.inputElement.type = this.$textfield.inputType,
                this.inputDiv = this.htmlInput._inputDIV),
                this.htmlInput._needShow = !0,
                this._isNeedShow = !0,
                this._initElement()
            }
            ,
            i.prototype.onBlurHandler = function() {
                this.htmlInput.clearInputElement(),
                window.scrollTo(0, 0)
            }
            ,
            i.prototype.executeShow = function() {
                this.inputElement.value = this.$getText(),
                null == this.inputElement.onblur && (this.inputElement.onblur = this.onBlurHandler.bind(this)),
                this.$resetStageText(),
                this.$textfield.maxChars > 0 ? this.inputElement.setAttribute("maxlength", this.$textfield.maxChars) : this.inputElement.removeAttribute("maxlength"),
                this.inputElement.selectionStart = this.inputElement.value.length,
                this.inputElement.selectionEnd = this.inputElement.value.length,
                this.inputElement.focus()
            }
            ,
            i.prototype.$hide = function() {
                this.htmlInput && this.htmlInput.disconnectStageText(this)
            }
            ,
            i.prototype.$getText = function() {
                return this.textValue || (this.textValue = ""),
                this.textValue
            }
            ,
            i.prototype.$setText = function(e) {
                return this.textValue = e,
                this.resetText(),
                !0
            }
            ,
            i.prototype.resetText = function() {
                this.inputElement && (this.inputElement.value = this.textValue)
            }
            ,
            i.prototype.$setColor = function(e) {
                return this.colorValue = e,
                this.resetColor(),
                !0
            }
            ,
            i.prototype.resetColor = function() {
                this.inputElement && this.setElementStyle("color", e.toColorString(this.colorValue))
            }
            ,
            i.prototype.$onBlur = function() {
                t.Html5Capatibility._System_OS == t.SystemOSType.WPHONE && e.Event.dispatchEvent(this, "updateText", !1)
            }
            ,
            i.prototype._onInput = function() {
                var r = this;
                if (t.Html5Capatibility._System_OS == t.SystemOSType.WPHONE) {
                    var i = this.$textfield.$TextField;
                    null == i[35] && null == i[36] ? (r.textValue = r.inputElement.value,
                    e.Event.dispatchEvent(r, "updateText", !1)) : window.setTimeout(function() {
                        r.inputElement && r.inputElement.selectionStart && r.inputElement.selectionEnd && r.inputElement.selectionStart == r.inputElement.selectionEnd && (r.textValue = r.inputElement.value,
                        e.Event.dispatchEvent(r, "updateText", !1))
                    }, 0)
                } else
                    window.setTimeout(function() {
                        r.inputElement && r.inputElement.selectionStart == r.inputElement.selectionEnd && (r.textValue = r.inputElement.value,
                        e.Event.dispatchEvent(r, "updateText", !1))
                    }, 0)
            }
            ,
            i.prototype.setAreaHeight = function() {
                var t = this.$textfield;
                if (t.multiline) {
                    var r = e.TextFieldUtils.$getTextHeight(t);
                    if (t.height <= t.size)
                        this.setElementStyle("height", t.size * this._gscaleY + "px"),
                        this.setElementStyle("padding", "0px"),
                        this.setElementStyle("lineHeight", t.size * this._gscaleY + "px");
                    else if (t.height < r)
                        this.setElementStyle("height", t.height * this._gscaleY + "px"),
                        this.setElementStyle("padding", "0px"),
                        this.setElementStyle("lineHeight", (t.size + t.lineSpacing) * this._gscaleY + "px");
                    else {
                        this.setElementStyle("height", (r + t.lineSpacing) * this._gscaleY + "px");
                        var i = (t.height - r) * this._gscaleY
                          , n = e.TextFieldUtils.$getValign(t)
                          , a = i * n
                          , o = i - a;
                        this.setElementStyle("padding", a + "px 0px " + o + "px 0px"),
                        this.setElementStyle("lineHeight", (t.size + t.lineSpacing) * this._gscaleY + "px")
                    }
                }
            }
            ,
            i.prototype._onClickHandler = function(t) {
                this._isNeedShow && (t.stopImmediatePropagation(),
                this._isNeedShow = !1,
                this.executeShow(),
                this.dispatchEvent(new e.Event("focus")))
            }
            ,
            i.prototype._onDisconnect = function() {
                this.inputElement = null,
                this.dispatchEvent(new e.Event("blur"))
            }
            ,
            i.prototype.setElementStyle = function(e, t) {
                this.inputElement && this._styleInfoes[e] != t && (this.inputElement.style[e] = t)
            }
            ,
            i.prototype.$removeFromStage = function() {
                this.inputElement && this.htmlInput.disconnectStageText(this)
            }
            ,
            i.prototype.$resetStageText = function() {
                if (this.inputElement) {
                    var t = this.$textfield;
                    this.setElementStyle("fontFamily", t.fontFamily),
                    this.setElementStyle("fontStyle", t.italic ? "italic" : "normal"),
                    this.setElementStyle("fontWeight", t.bold ? "bold" : "normal"),
                    this.setElementStyle("textAlign", t.textAlign),
                    this.setElementStyle("fontSize", t.size * this._gscaleY + "px"),
                    this.setElementStyle("color", e.toColorString(t.textColor));
                    var r = void 0;
                    if (t.stage ? (r = t.localToGlobal(0, 0).x,
                    r = Math.min(t.width, t.stage.stageWidth - r)) : r = t.width,
                    this.setElementStyle("width", r * this._gscaleX + "px"),
                    this.setElementStyle("verticalAlign", t.verticalAlign),
                    t.multiline)
                        this.setAreaHeight();
                    else if (this.setElementStyle("lineHeight", t.size * this._gscaleY + "px"),
                    t.height < t.size) {
                        this.setElementStyle("height", t.size * this._gscaleY + "px");
                        var i = t.size / 2 * this._gscaleY;
                        this.setElementStyle("padding", "0px 0px " + i + "px 0px")
                    } else {
                        this.setElementStyle("height", t.size * this._gscaleY + "px");
                        var n = (t.height - t.size) * this._gscaleY
                          , a = e.TextFieldUtils.$getValign(t)
                          , o = n * a
                          , i = n - o;
                        i < t.size / 2 * this._gscaleY && (i = t.size / 2 * this._gscaleY),
                        this.setElementStyle("padding", o + "px 0px " + i + "px 0px")
                    }
                    this.inputDiv.style.clip = "rect(0px " + t.width * this._gscaleX + "px " + t.height * this._gscaleY + "px 0px)",
                    this.inputDiv.style.height = t.height * this._gscaleY + "px",
                    this.inputDiv.style.width = r * this._gscaleX + "px"
                }
            }
            ,
            i
        }(e.EventDispatcher);
        t.HTML5StageText = r,
        __reflect(r.prototype, "egret.web.HTML5StageText", ["egret.StageText"]),
        e.StageText = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})),
function(e) {
    var t;
    !function(t) {
        var r = function() {
            function t() {
                this._needShow = !1,
                this.$scaleX = 1,
                this.$scaleY = 1
            }
            return t.prototype.isInputOn = function() {
                return null != this._stageText
            }
            ,
            t.prototype.isCurrentStageText = function(e) {
                return this._stageText == e
            }
            ,
            t.prototype.initValue = function(e) {
                e.style.position = "absolute",
                e.style.left = "0px",
                e.style.top = "0px",
                e.style.border = "none",
                e.style.padding = "0"
            }
            ,
            t.prototype.$updateSize = function() {
                if (this.canvas) {
                    var t = this.canvas.width
                      , r = this.canvas.height
                      , i = this.canvas.style.width.split("px")[0]
                      , n = this.canvas.style.height.split("px")[0];
                    this.$scaleX = i / t,
                    this.$scaleY = n / r,
                    this.StageDelegateDiv.style.left = this.canvas.style.left,
                    this.StageDelegateDiv.style.top = this.canvas.style.top;
                    var a = e.web.getPrefixStyleName("transform");
                    this.StageDelegateDiv.style[a] = this.canvas.style[a],
                    this.StageDelegateDiv.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px"
                }
            }
            ,
            t.prototype._initStageDelegateDiv = function(t, r) {
                this.canvas = r;
                var i, n = this;
                i || (i = document.createElement("div"),
                this.StageDelegateDiv = i,
                i.id = "StageDelegateDiv",
                t.appendChild(i),
                n.initValue(i),
                n._inputDIV = document.createElement("div"),
                n.initValue(n._inputDIV),
                n._inputDIV.style.width = "0px",
                n._inputDIV.style.height = "0px",
                n._inputDIV.style.left = "0px",
                n._inputDIV.style.top = "-100px",
                n._inputDIV.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px",
                i.appendChild(n._inputDIV),
                this.canvas.addEventListener("click", function(e) {
                    n._needShow ? (n._needShow = !1,
                    n._stageText._onClickHandler(e),
                    n.show()) : n._inputElement && (n.clearInputElement(),
                    n._inputElement.blur(),
                    n._inputElement = null)
                }),
                n.initInputElement(!0),
                n.initInputElement(!1))
            }
            ,
            t.prototype.initInputElement = function(e) {
                var t, r = this;
                e ? (t = document.createElement("textarea"),
                t.style.resize = "none",
                r._multiElement = t,
                t.id = "egretTextarea") : (t = document.createElement("input"),
                r._simpleElement = t,
                t.id = "egretInput"),
                t.type = "text",
                r._inputDIV.appendChild(t),
                t.setAttribute("tabindex", "-1"),
                t.style.width = "1px",
                t.style.height = "12px",
                r.initValue(t),
                t.style.outline = "thin",
                t.style.background = "none",
                t.style.overflow = "hidden",
                t.style.wordBreak = "break-all",
                t.style.opacity = 0,
                t.oninput = function() {
                    r._stageText && r._stageText._onInput()
                }
            }
            ,
            t.prototype.show = function() {
                var t = this
                  , r = t._inputElement;
                e.$callAsync(function() {
                    r.style.opacity = 1
                }, t)
            }
            ,
            t.prototype.disconnectStageText = function(e) {
                (null == this._stageText || this._stageText == e) && (this.clearInputElement(),
                this._inputElement && this._inputElement.blur())
            }
            ,
            t.prototype.clearInputElement = function() {
                var e = this;
                if (e._inputElement) {
                    e._inputElement.value = "",
                    e._inputElement.onblur = null,
                    e._inputElement.style.width = "1px",
                    e._inputElement.style.height = "12px",
                    e._inputElement.style.left = "0px",
                    e._inputElement.style.top = "0px",
                    e._inputElement.style.opacity = 0;
                    var t = void 0;
                    t = e._simpleElement == e._inputElement ? e._multiElement : e._simpleElement,
                    t.style.display = "block",
                    e._inputDIV.style.left = "0px",
                    e._inputDIV.style.top = "-100px",
                    e._inputDIV.style.height = "0px",
                    e._inputDIV.style.width = "0px"
                }
                e._stageText && (e._stageText._onDisconnect(),
                e._stageText = null,
                this.canvas.userTyping = !1)
            }
            ,
            t.prototype.getInputElement = function(e) {
                var t = this;
                t.clearInputElement(),
                t._stageText = e,
                this.canvas.userTyping = !0,
                t._stageText.$textfield.multiline ? t._inputElement = t._multiElement : t._inputElement = t._simpleElement;
                var r;
                return r = t._simpleElement == t._inputElement ? t._multiElement : t._simpleElement,
                r.style.display = "none",
                t._inputElement
            }
            ,
            t
        }();
        t.HTMLInput = r,
        __reflect(r.prototype, "egret.web.HTMLInput")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})),
function(e) {
    var t;
    !function(e) {
        function t(e) {
            var t = e.stage ? e.stage.$hashCode : 0
              , r = i[t]
              , o = n[t]
              , s = a[t];
            return o && s && (delete n[t],
            delete a[t]),
            r
        }
        function r(e, t, r, o) {
            e._initStageDelegateDiv(r, o),
            i[t.$hashCode] = e,
            n[t.$hashCode] = o,
            a[t.$hashCode] = r
        }
        var i = {}
          , n = {}
          , a = {};
        e.$getTextAdapter = t,
        e.$cacheTextAdapter = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e, t, r, a, o) {
            n || i();
            var s = "";
            return o && (s += "italic "),
            a && (s += "bold "),
            s += (r || 12) + "px ",
            s += t || "Arial",
            n.font = s,
            n.measureText(e).width
        }
        function i() {
            n = e.sys.canvasHitTestBuffer.context,
            n.textAlign = "left",
            n.textBaseline = "middle"
        }
        var n = null;
        e.sys.measureText = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e, t) {
            var r = document.createElement("canvas");
            isNaN(e) || isNaN(t) || (r.width = e,
            r.height = t);
            var i = r.getContext("2d");
            if (void 0 === i.imageSmoothingEnabled) {
                for (var n, a = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"], o = a.length - 1; o >= 0 && (n = a[o],
                void 0 === i[n]); o--)
                    ;
                try {
                    Object.defineProperty(i, "imageSmoothingEnabled", {
                        get: function() {
                            return this[n]
                        },
                        set: function(e) {
                            this[n] = e
                        }
                    })
                } catch (s) {
                    i.imageSmoothingEnabled = i[n]
                }
            }
            return r
        }
        var i, n = function() {
            function t(e, t, i) {
                this.surface = r(e, t),
                this.context = this.surface.getContext("2d")
            }
            return Object.defineProperty(t.prototype, "width", {
                get: function() {
                    return this.surface.width
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "height", {
                get: function() {
                    return this.surface.height
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.resize = function(e, t, r) {
                var i = this.surface;
                if (r) {
                    var n = !1;
                    i.width < e && (i.width = e,
                    n = !0),
                    i.height < t && (i.height = t,
                    n = !0),
                    n || (this.context.globalCompositeOperation = "source-over",
                    this.context.setTransform(1, 0, 0, 1, 0, 0),
                    this.context.globalAlpha = 1)
                } else
                    i.width != e && (i.width = e),
                    i.height != t && (i.height = t);
                this.clear()
            }
            ,
            t.prototype.resizeTo = function(e, t, n, a) {
                i || (i = r());
                var o = (this.context,
                this.surface)
                  , s = i
                  , l = s.getContext("2d");
                i = o,
                this.context = l,
                this.surface = s,
                s.width = Math.max(e, 257),
                s.height = Math.max(t, 257),
                l.setTransform(1, 0, 0, 1, 0, 0),
                l.drawImage(o, n, a),
                o.height = 1,
                o.width = 1
            }
            ,
            t.prototype.setDirtyRegionPolicy = function(e) {}
            ,
            t.prototype.beginClip = function(t, r, i) {
                r = +r || 0,
                i = +i || 0;
                var n = e.sys.DisplayList.$pixelRatio
                  , a = this.context;
                a.save(),
                a.beginPath(),
                a.setTransform(1, 0, 0, 1, r, i);
                for (var o = t.length, s = 0; o > s; s++) {
                    var l = t[s];
                    a.clearRect(l.minX * n, l.minY * n, l.width * n, l.height * n),
                    a.rect(l.minX * n, l.minY * n, l.width * n, l.height * n)
                }
                a.clip()
            }
            ,
            t.prototype.endClip = function() {
                this.context.restore()
            }
            ,
            t.prototype.getPixels = function(e, t, r, i) {
                return void 0 === r && (r = 1),
                void 0 === i && (i = 1),
                this.context.getImageData(e, t, r, i).data
            }
            ,
            t.prototype.toDataURL = function(e, t) {
                return this.surface.toDataURL(e, t)
            }
            ,
            t.prototype.clear = function() {
                this.context.setTransform(1, 0, 0, 1, 0, 0),
                this.context.clearRect(0, 0, this.surface.width, this.surface.height)
            }
            ,
            t.prototype.destroy = function() {
                this.surface.width = this.surface.height = 0
            }
            ,
            t
        }();
        t.CanvasRenderBuffer = n,
        __reflect(n.prototype, "egret.web.CanvasRenderBuffer", ["egret.sys.RenderBuffer"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r(r, i) {
                var n = t.call(this) || this;
                return n.onTouchBegin = function(e) {
                    var t = n.getLocation(e);
                    n.touch.onTouchBegin(t.x, t.y, e.identifier)
                }
                ,
                n.onTouchMove = function(e) {
                    var t = n.getLocation(e);
                    n.touch.onTouchMove(t.x, t.y, e.identifier)
                }
                ,
                n.onTouchEnd = function(e) {
                    var t = n.getLocation(e);
                    n.touch.onTouchEnd(t.x, t.y, e.identifier)
                }
                ,
                n.scaleX = 1,
                n.scaleY = 1,
                n.rotation = 0,
                n.canvas = i,
                n.touch = new e.sys.TouchHandler(r),
                n.addListeners(),
                n
            }
            return __extends(r, t),
            r.prototype.addListeners = function() {
                var t = this;
                window.navigator.msPointerEnabled ? (this.canvas.addEventListener("MSPointerDown", function(e) {
                    e.identifier = e.pointerId,
                    t.onTouchBegin(e),
                    t.prevent(e)
                }, !1),
                this.canvas.addEventListener("MSPointerMove", function(e) {
                    e.identifier = e.pointerId,
                    t.onTouchMove(e),
                    t.prevent(e)
                }, !1),
                this.canvas.addEventListener("MSPointerUp", function(e) {
                    e.identifier = e.pointerId,
                    t.onTouchEnd(e),
                    t.prevent(e)
                }, !1)) : (e.Capabilities.$isMobile || this.addMouseListener(),
                this.addTouchListener())
            }
            ,
            r.prototype.addMouseListener = function() {
                this.canvas.addEventListener("mousedown", this.onTouchBegin),
                this.canvas.addEventListener("mousemove", this.onTouchMove),
                this.canvas.addEventListener("mouseup", this.onTouchEnd)
            }
            ,
            r.prototype.addTouchListener = function() {
                var e = this;
                this.canvas.addEventListener("touchstart", function(t) {
                    for (var r = t.changedTouches.length, i = 0; r > i; i++)
                        e.onTouchBegin(t.changedTouches[i]);
                    e.prevent(t)
                }, !1),
                this.canvas.addEventListener("touchmove", function(t) {
                    for (var r = t.changedTouches.length, i = 0; r > i; i++)
                        e.onTouchMove(t.changedTouches[i]);
                    e.prevent(t)
                }, !1),
                this.canvas.addEventListener("touchend", function(t) {
                    for (var r = t.changedTouches.length, i = 0; r > i; i++)
                        e.onTouchEnd(t.changedTouches[i]);
                    e.prevent(t)
                }, !1),
                this.canvas.addEventListener("touchcancel", function(t) {
                    for (var r = t.changedTouches.length, i = 0; r > i; i++)
                        e.onTouchEnd(t.changedTouches[i]);
                    e.prevent(t)
                }, !1)
            }
            ,
            r.prototype.prevent = function(e) {
                e.stopPropagation(),
                1 == e.isScroll || this.canvas.userTyping || e.preventDefault()
            }
            ,
            r.prototype.getLocation = function(t) {
                t.identifier = +t.identifier || 0;
                var r = document.documentElement
                  , i = this.canvas.getBoundingClientRect()
                  , n = i.left + window.pageXOffset - r.clientLeft
                  , a = i.top + window.pageYOffset - r.clientTop
                  , o = t.pageX - n
                  , s = o
                  , l = t.pageY - a
                  , h = l;
                return 90 == this.rotation ? (s = l,
                h = i.width - o) : -90 == this.rotation && (s = i.height - l,
                h = o),
                s /= this.scaleX,
                h /= this.scaleY,
                e.$TempPoint.setTo(Math.round(s), Math.round(h))
            }
            ,
            r.prototype.updateScaleMode = function(e, t, r) {
                this.scaleX = e,
                this.scaleY = t,
                this.rotation = r
            }
            ,
            r.prototype.$updateMaxTouches = function() {
                this.touch.$initMaxTouches()
            }
            ,
            r
        }(e.HashObject);
        t.WebTouchHandler = r,
        __reflect(r.prototype, "egret.web.WebTouchHandler")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        e.WebLifeCycleHandler = function(e) {
            var t = function() {
                document[r] ? e.pause() : e.resume()
            };
            window.addEventListener("focus", e.resume, !1),
            window.addEventListener("blur", e.pause, !1);
            var r, i;
            "undefined" != typeof document.hidden ? (r = "hidden",
            i = "visibilitychange") : "undefined" != typeof document.mozHidden ? (r = "mozHidden",
            i = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (r = "msHidden",
            i = "msvisibilitychange") : "undefined" != typeof document.webkitHidden ? (r = "webkitHidden",
            i = "webkitvisibilitychange") : "undefined" != typeof document.oHidden && (r = "oHidden",
            i = "ovisibilitychange"),
            "onpageshow"in window && "onpagehide"in window && (window.addEventListener("pageshow", e.resume, !1),
            window.addEventListener("pagehide", e.pause, !1)),
            r && i && document.addEventListener(i, t, !1);
            var n = navigator.userAgent
              , a = /micromessenger/gi.test(n)
              , o = /mqq/gi.test(n)
              , s = /mobile.*qq/gi.test(n);
            if ((s || a) && (o = !1),
            o) {
                var l = window.browser || {};
                l.execWebFn = l.execWebFn || {},
                l.execWebFn.postX5GamePlayerMessage = function(t) {
                    var r = t.type;
                    "app_enter_background" == r ? e.pause() : "app_enter_foreground" == r && e.resume()
                }
                ,
                window.browser = l
            }
        }
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e, t) {
            var r = "";
            if (null != t)
                r = i(e, t);
            else {
                if (null == s) {
                    var n = document.createElement("div").style;
                    s = i("transform", n)
                }
                r = s
            }
            return "" == r ? e : r + e.charAt(0).toUpperCase() + e.substring(1, e.length)
        }
        function i(e, t) {
            if (e in t)
                return "";
            e = e.charAt(0).toUpperCase() + e.substring(1, e.length);
            for (var r = ["webkit", "ms", "Moz", "O"], i = 0; i < r.length; i++) {
                var n = r[i] + e;
                if (n in t)
                    return r[i]
            }
            return ""
        }
        var n = function() {
            function e() {}
            return e.WEB_AUDIO = 2,
            e.HTML5_AUDIO = 3,
            e
        }();
        t.AudioType = n,
        __reflect(n.prototype, "egret.web.AudioType");
        var a = function() {
            function e() {}
            return e.WPHONE = 1,
            e.IOS = 2,
            e.ADNROID = 3,
            e
        }();
        t.SystemOSType = a,
        __reflect(a.prototype, "egret.web.SystemOSType");
        var o = function(r) {
            function i() {
                return r.call(this) || this
            }
            return __extends(i, r),
            i.$init = function() {
                var r = navigator.userAgent.toLowerCase();
                i.ua = r,
                e.Capabilities.$isMobile = -1 != r.indexOf("mobile") || -1 != r.indexOf("android"),
                i._canUseBlob = !1;
                var o = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
                if (o)
                    try {
                        t.WebAudioDecode.ctx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)
                    } catch (s) {
                        o = !1
                    }
                var l, h = i._audioType;
                h == n.WEB_AUDIO && o || h == n.HTML5_AUDIO ? (l = !1,
                i.setAudioType(h)) : (l = !0,
                i.setAudioType(n.HTML5_AUDIO)),
                r.indexOf("windows phone") >= 0 ? (i._System_OS = a.WPHONE,
                e.Capabilities.$os = "Windows Phone") : r.indexOf("android") >= 0 ? (e.Capabilities.$os = "Android",
                i._System_OS = a.ADNROID,
                l && o && i.setAudioType(n.WEB_AUDIO)) : r.indexOf("iphone") >= 0 || r.indexOf("ipad") >= 0 || r.indexOf("ipod") >= 0 ? (e.Capabilities.$os = "iOS",
                i._System_OS = a.IOS,
                i.getIOSVersion() >= 7 && (i._canUseBlob = !0,
                l && o && i.setAudioType(n.WEB_AUDIO))) : -1 != r.indexOf("windows nt") ? e.Capabilities.$os = "Windows PC" : -1 != r.indexOf("mac os") && (e.Capabilities.$os = "Mac OS");
                var c = window.URL || window.webkitURL;
                c || (i._canUseBlob = !1),
                r.indexOf("egretnative") >= 0 && (i.setAudioType(n.HTML5_AUDIO),
                i._canUseBlob = !0),
                e.Sound = i._AudioClass
            }
            ,
            i.setAudioType = function(t) {
                switch (i._audioType = t,
                t) {
                case n.WEB_AUDIO:
                    i._AudioClass = e.web.WebAudioSound;
                    break;
                case n.HTML5_AUDIO:
                    i._AudioClass = e.web.HtmlSound
                }
            }
            ,
            i.getIOSVersion = function() {
                var e = i.ua.toLowerCase().match(/cpu [^\d]*\d.*like mac os x/)[0];
                return parseInt(e.match(/\d+(_\d)*/)[0]) || 0
            }
            ,
            i.checkHtml5Support = function() {
                var t = (navigator.language || navigator.browserLanguage).toLowerCase()
                  , r = t.split("-");
                r.length > 1 && (r[1] = r[1].toUpperCase()),
                e.Capabilities.$language = r.join("-")
            }
            ,
            i._canUseBlob = !1,
            i._audioType = 0,
            i._System_OS = 0,
            i.ua = "",
            i
        }(e.HashObject);
        t.Html5Capatibility = o,
        __reflect(o.prototype, "egret.web.Html5Capatibility");
        var s = null;
        t.getPrefixStyleName = r,
        t.getPrefix = i
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e) {
            e.onStart(h),
            l = e
        }
        function i() {
            if (c)
                for (var e = document.querySelectorAll(".egret-player"), t = e.length, r = 0; t > r; r++) {
                    var i = e[r]
                      , n = i["egret-player"];
                    n.updateScreenSize()
                }
        }
        function n(r) {
            if (!c) {
                if (c = !0,
                r || (r = {}),
                t.Html5Capatibility._audioType = r.audioType,
                t.Html5Capatibility.$init(),
                "webgl" == r.renderMode) {
                    var i = r.antialias;
                    t.WebGLRenderContext.antialias = !!i
                }
                if (e.sys.CanvasRenderBuffer = t.CanvasRenderBuffer,
                a(r.renderMode),
                r.retina) {
                    var n = e.sys.canvasHitTestBuffer.context
                      , l = n.backingStorePixelRatio || n.webkitBackingStorePixelRatio || n.mozBackingStorePixelRatio || n.msBackingStorePixelRatio || n.oBackingStorePixelRatio || n.backingStorePixelRatio || 1;
                    e.sys.DisplayList.$setDevicePixelRatio((window.devicePixelRatio || 1) / l)
                }
                var h = e.ticker;
                o(h),
                r.screenAdapter ? e.sys.screenAdapter = r.screenAdapter : e.sys.screenAdapter || (e.sys.screenAdapter = new e.sys.DefaultScreenAdapter);
                for (var d = document.querySelectorAll(".egret-player"), p = d.length, f = 0; p > f; f++) {
                    var g = d[f]
                      , v = new t.WebPlayer(g,r);
                    g["egret-player"] = v,
                    "webgl" == e.Capabilities.$renderMode && (v.stage.dirtyRegionPolicy = e.DirtyRegionPolicy.OFF)
                }
                "webgl" == e.Capabilities.$renderMode && (e.sys.DisplayList.prototype.setDirtyRegionPolicy = function() {}
                ),
                window.addEventListener("resize", function() {
                    isNaN(u) && (u = window.setTimeout(s, 300))
                })
            }
        }
        function a(r) {
            "webgl" == r && e.WebGLUtils.checkCanUseWebGL() ? (e.sys.RenderBuffer = t.WebGLRenderBuffer,
            e.sys.systemRenderer = new t.WebGLRenderer,
            e.sys.canvasRenderer = new e.CanvasRenderer,
            e.sys.customHitTestBuffer = new t.WebGLRenderBuffer(3,3),
            e.sys.canvasHitTestBuffer = new t.CanvasRenderBuffer(3,3),
            e.Capabilities.$renderMode = "webgl") : (e.sys.RenderBuffer = t.CanvasRenderBuffer,
            e.sys.systemRenderer = new e.CanvasRenderer,
            e.sys.canvasRenderer = e.sys.systemRenderer,
            e.sys.customHitTestBuffer = new t.CanvasRenderBuffer(3,3),
            e.sys.canvasHitTestBuffer = e.sys.customHitTestBuffer,
            e.Capabilities.$renderMode = "canvas")
        }
        function o(e) {
            function t() {
                l && l.onRender(h),
                e.update(),
                r(t)
            }
            var r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            r || (r = function(e) {
                return window.setTimeout(e, 1e3 / 60)
            }
            ),
            r(t)
        }
        function s() {
            u = 0 / 0,
            e.updateAllScreens(),
            l && l.onResize(h)
        }
        var l, h = {
            setAutoClear: function(e) {
                t.WebGLRenderBuffer.autoClear = e
            },
            save: function() {},
            restore: function() {
                var e = t.WebGLRenderContext.getInstance(0, 0)
                  , r = e.context;
                r.bindBuffer(r.ARRAY_BUFFER, e.vertexBuffer),
                r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, e.indexBuffer),
                r.activeTexture(r.TEXTURE0),
                e.currentProgram = null,
                e.bindIndices = !1;
                var i = e.$bufferStack[1];
                e.activateBuffer(i),
                r.enable(r.BLEND),
                e.setBlendMode("source-over")
            }
        };
        e.setRendererContext = r;
        var c = !1;
        window.isNaN = function(e) {
            return e = +e,
            e !== e
        }
        ,
        e.runEgret = n,
        e.updateAllScreens = i;
        var u = 0 / 0
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var language, egret;
!function(e) {
    var t;
    !function(t) {
        var r = function() {
            function t() {}
            return t.detect = function() {
                var r = e.Capabilities
                  , i = 'android';
                r.$isMobile = -1 != i.indexOf("mobile") || -1 != i.indexOf("android"),
                r.$isMobile ? i.indexOf("windows") < 0 && (-1 != i.indexOf("iphone") || -1 != i.indexOf("ipad") || -1 != i.indexOf("ipod")) ? r.$os = "iOS" : -1 != i.indexOf("android") && -1 != i.indexOf("linux") ? r.$os = "Android" : -1 != i.indexOf("windows") && (r.$os = "Windows Phone") : -1 != i.indexOf("windows nt") ? r.$os = "Windows PC" : -1 != i.indexOf("mac os") && (r.$os = "Mac OS");
                var n = (navigator.language || '123')
                  , a = n.split("-");
                a.length > 1 && (a[1] = a[1].toUpperCase()),
                r.$language = a.join("-"),
                t.injectUIntFixOnIE9()
            }
            ,
            t.injectUIntFixOnIE9 = function() {
                if (/msie 9.0/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
                    var e = "<!-- IEBinaryToArray_ByteStr -->\r\n<script type='text/vbscript' language='VBScript'>\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last = \"\"\r\n   End If\r\nEnd Function\r\n</script>\r\n<!-- convertResponseBodyToText -->\r\n<script>\r\nlet convertResponseBodyToText = function (binary) {\r\n   let byteMapping = {};\r\n   for ( let i = 0; i < 256; i++ ) {\r\n       for ( let j = 0; j < 256; j++ ) {\r\n           byteMapping[ String.fromCharCode( i + j * 256 ) ] =\r\n           String.fromCharCode(i) + String.fromCharCode(j);\r\n       }\r\n   }\r\n   let rawBytes = IEBinaryToArray_ByteStr(binary);\r\n   let lastChr = IEBinaryToArray_ByteStr_Last(binary);\r\n   return rawBytes.replace(/[\\s\\S]/g,                           function( match ) { return byteMapping[match]; }) + lastChr;\r\n};\r\n</script>\r\n";
                    document.write(e)
                }
            }
            ,
            t
        }();
        t.WebCapability = r,
        __reflect(r.prototype, "egret.web.WebCapability"),
        r.detect()
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function() {
            function e() {}
            return e.call = function(e, t) {}
            ,
            e.addCallback = function(e, t) {}
            ,
            e
        }();
        t.WebExternalInterface = r,
        __reflect(r.prototype, "egret.web.WebExternalInterface", ["egret.ExternalInterface"]);
        var i = navigator.userAgent.toLowerCase();
        i.indexOf("egretnative") < 0 && (e.ExternalInterface = r)
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})),
function(e) {
    var t;
    !function(t) {
        function r(t) {
            var r = JSON.parse(t)
              , n = r.functionName
              , a = i[n];
            if (a) {
                var o = r.value;
                a.call(null, o)
            } else
                e.$warn(1050, n)
        }
        var i = {}
          , n = function() {
            function e() {}
            return e.call = function(e, t) {
                var r = {};
                r.functionName = e,
                r.value = t,
                egret_native.sendInfoToPlugin(JSON.stringify(r))
            }
            ,
            e.addCallback = function(e, t) {
                i[e] = t
            }
            ,
            e
        }();
        t.NativeExternalInterface = n,
        __reflect(n.prototype, "egret.web.NativeExternalInterface", ["egret.ExternalInterface"]);
        var a = navigator.userAgent.toLowerCase();
        a.indexOf("egretnative") >= 0 && (e.ExternalInterface = n,
        egret_native.receivedPluginInfo = r)
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e) {
            if (window.location) {
                var t = location.search;
                if ("" == t)
                    return "";
                t = t.slice(1);
                for (var r = t.split("&"), i = r.length, n = 0; i > n; n++) {
                    var a = r[n]
                      , o = a.split("=");
                    if (o[0] == e)
                        return o[1]
                }
            }
            return ""
        }
        t.getOption = r,
        e.getOption = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(r) {
            function i(e, t) {
                var i = r.call(this) || this;
                return i.init(e, t),
                i.initOrientation(),
                i
            }
            return __extends(i, r),
            i.prototype.init = function(r, i) {
                var n = this.readOption(r, i)
                  , a = new e.Stage;
                a.$screen = this,
                a.$scaleMode = n.scaleMode,
                a.$orientation = n.orientation,
                a.$maxTouches = n.maxTouches,
                a.frameRate = n.frameRate,
                a.textureScaleFactor = n.textureScaleFactor;
                var o = new e.sys.RenderBuffer(void 0,void 0,!0)
                  , s = o.surface;
                this.attachCanvas(r, s);
                var l = new t.WebTouchHandler(a,s)
                  , h = new e.sys.Player(o,a,n.entryClassName);
                e.lifecycle.stage = a,
                e.lifecycle.addLifecycleListener(t.WebLifeCycleHandler);
                var c = new t.HTMLInput;
                h.showPaintRect(n.showPaintRect),
                (n.showFPS || n.showLog) && h.displayFPS(n.showFPS, n.showLog, n.logFilter, n.fpsStyles),
                this.playerOption = n,
                this.container = r,
                this.canvas = s,
                this.stage = a,
                this.player = h,
                this.webTouchHandler = l,
                this.webInput = c,
                e.web.$cacheTextAdapter(c, a, r, s),
                this.updateScreenSize(),
                this.updateMaxTouches(),
                h.start()
            }
            ,
            i.prototype.initOrientation = function() {
                var t = this;
                window.addEventListener("orientationchange", function() {
                    window.setTimeout(function() {
                        e.StageOrientationEvent.dispatchStageOrientationEvent(t.stage, e.StageOrientationEvent.ORIENTATION_CHANGE)
                    }, 350)
                })
            }
            ,
            i.prototype.readOption = function(t, r) {
                var i = {};
                i.entryClassName = t.getAttribute("data-entry-class"),
                i.scaleMode = t.getAttribute("data-scale-mode") || e.StageScaleMode.NO_SCALE,
                i.frameRate = +t.getAttribute("data-frame-rate") || 30,
                i.contentWidth = +t.getAttribute("data-content-width") || 480,
                i.contentHeight = +t.getAttribute("data-content-height") || 800,
                i.orientation = t.getAttribute("data-orientation") || e.OrientationMode.AUTO,
                i.maxTouches = +t.getAttribute("data-multi-fingered") || 2,
                i.textureScaleFactor = +t.getAttribute("texture-scale-factor") || 1,
                "webgl" == r.renderMode ? i.showPaintRect = !1 : i.showPaintRect = "true" == t.getAttribute("data-show-paint-rect"),
                i.showFPS = "true" == t.getAttribute("data-show-fps");
                for (var n = t.getAttribute("data-show-fps-style") || "", a = n.split(","), o = {}, s = 0; s < a.length; s++) {
                    var l = a[s].split(":");
                    o[l[0]] = l[1]
                }
                return i.fpsStyles = o,
                i.showLog = "true" == t.getAttribute("data-show-log"),
                i.logFilter = t.getAttribute("data-log-filter"),
                i
            }
            ,
            i.prototype.attachCanvas = function(e, t) {
                var r = t.style;
                r.cursor = "inherit",
                r.position = "absolute",
                r.top = "0",
                r.bottom = "0",
                r.left = "0",
                r.right = "0",
                e.appendChild(t),
                r = e.style,
                r.overflow = "hidden",
                r.position = "absolute"
            }
            ,
            i.prototype.updateScreenSize = function() {
                var t = this.canvas;
                if (!t.userTyping) {
                    var r = this.playerOption
                      , i = this.container.getBoundingClientRect()
                      , n = 0
                      , a = i.width
                      , o = i.height;
                    i.top < 0 && (o += i.top,
                    n = -i.top);
                    var s = !1
                      , l = this.stage.$orientation;
                    l != e.OrientationMode.AUTO && (s = l != e.OrientationMode.PORTRAIT && o > a || l == e.OrientationMode.PORTRAIT && a > o);
                    var h = s ? o : a
                      , c = s ? a : o;
                    e.Capabilities.$boundingClientWidth = h,
                    e.Capabilities.$boundingClientHeight = c;
                    var u = e.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, h, c, r.contentWidth, r.contentHeight)
                      , d = u.stageWidth
                      , p = u.stageHeight
                      , f = u.displayWidth
                      , g = u.displayHeight;
                    t.width !== d && (t.width = d),
                    t.height !== p && (t.height = p),
                    t.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px",
                    t.style.width = f + "px",
                    t.style.height = g + "px";
                    var v = 0;
                    s ? l == e.OrientationMode.LANDSCAPE ? (v = 90,
                    t.style.top = n + (o - f) / 2 + "px",
                    t.style.left = (a + g) / 2 + "px") : (v = -90,
                    t.style.top = n + (o + f) / 2 + "px",
                    t.style.left = (a - g) / 2 + "px") : (t.style.top = n + (o - g) / 2 + "px",
                    t.style.left = (a - f) / 2 + "px");
                    var m = "rotate(" + v + "deg)";
                    t.style[e.web.getPrefixStyleName("transform")] = m;
                    var y = f / d
                      , x = g / p;
                    this.webTouchHandler.updateScaleMode(y, x, v),
                    this.webInput.$updateSize(),
                    this.player.updateStageSize(d, p)
                }
            }
            ,
            i.prototype.setContentSize = function(e, t) {
                var r = this.playerOption;
                r.contentWidth = e,
                r.contentHeight = t,
                this.updateScreenSize()
            }
            ,
            i.prototype.updateMaxTouches = function() {
                this.webTouchHandler.$updateMaxTouches()
            }
            ,
            i
        }(e.HashObject);
        t.WebPlayer = r,
        __reflect(r.prototype, "egret.web.WebPlayer", ["egret.sys.Screen"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(t, r) {
            s || (s = document.createElement("canvas"),
            l = s.getContext("2d"));
            var i = t.$getTextureWidth()
              , n = t.$getTextureHeight();
            null == r && (r = e.$TempRectangle,
            r.x = 0,
            r.y = 0,
            r.width = i,
            r.height = n),
            r.x = Math.min(r.x, i - 1),
            r.y = Math.min(r.y, n - 1),
            r.width = Math.min(r.width, i - r.x),
            r.height = Math.min(r.height, n - r.y);
            var a = r.width
              , o = r.height
              , h = s;
            if (h.style.width = a + "px",
            h.style.height = o + "px",
            s.width = a,
            s.height = o,
            "webgl" == e.Capabilities.$renderMode) {
                var c = void 0;
                t.$renderBuffer ? c = t : (c = new e.RenderTexture,
                c.drawToTexture(new e.Bitmap(t)));
                for (var u = c.$renderBuffer.getPixels(r.x, r.y, a, o), d = new ImageData(a,o), p = 0; p < u.length; p++)
                    d.data[p] = u[p];
                return l.putImageData(d, 0, 0),
                t.$renderBuffer || c.dispose(),
                h
            }
            var f = t
              , g = Math.round(f._offsetX)
              , v = Math.round(f._offsetY)
              , m = f._bitmapWidth
              , y = f._bitmapHeight;
            return l.drawImage(f._bitmapData.source, f._bitmapX + r.x / e.$TextureScaleFactor, f._bitmapY + r.y / e.$TextureScaleFactor, m * r.width / i, y * r.height / n, g, v, r.width, r.height),
            h
        }
        function i(t, i, n) {
            try {
                var a = r(this, i)
                  , o = a.toDataURL(t, n);
                return o
            } catch (s) {
                e.$error(1033)
            }
            return null
        }
        function n(e, t, r, n) {
            var a = i.call(this, e, r, n);
            if (null != a) {
                var o = a.replace(/^data:image[^;]*/, "data:image/octet-stream")
                  , s = document.createElement("a");
                s.download = t,
                s.href = o;
                var l = document.createEvent("MouseEvents");
                l.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
                s.dispatchEvent(l)
            }
        }
        function a(t, r) {
            return e.$warn(1041, "getPixel32", "getPixels"),
            this.getPixels(t, r)
        }
        function o(t, i, n, a) {
            void 0 === n && (n = 1),
            void 0 === a && (a = 1);
            try {
                var o = (r(this),
                l.getImageData(t, i, n, a).data);
                return o
            } catch (s) {
                e.$error(1039)
            }
        }
        var s, l;
        e.Texture.prototype.toDataURL = i,
        e.Texture.prototype.saveToFile = n,
        e.Texture.prototype.getPixel32 = a,
        e.Texture.prototype.getPixels = o
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e) {
            for (var t = s.parseFromString(e, "text/xml"), r = t.childNodes.length, n = 0; r > n; n++) {
                var a = t.childNodes[n];
                if (1 == a.nodeType)
                    return i(a, null)
            }
            return null
        }
        function i(e, t) {
            if ("parsererror" == e.localName)
                throw new Error(e.textContent);
            for (var r = new a(e.localName,t,e.prefix,e.namespaceURI,e.nodeName), n = e.attributes, s = r.attributes, l = n.length, h = 0; l > h; h++) {
                var c = n[h]
                  , u = c.name;
                0 != u.indexOf("xmlns:") && (s[u] = c.value,
                r["$" + u] = c.value)
            }
            var d = e.childNodes;
            l = d.length;
            for (var p = r.children, h = 0; l > h; h++) {
                var f = d[h]
                  , g = f.nodeType
                  , v = null;
                if (1 == g)
                    v = i(f, r);
                else if (3 == g) {
                    var m = f.textContent.trim();
                    m && (v = new o(m,r))
                }
                v && p.push(v)
            }
            return r
        }
        var n = function() {
            function e(e, t) {
                this.nodeType = e,
                this.parent = t
            }
            return e
        }();
        t.XMLNode = n,
        __reflect(n.prototype, "egret.web.XMLNode");
        var a = function(e) {
            function t(t, r, i, n, a) {
                var o = e.call(this, 1, r) || this;
                return o.attributes = {},
                o.children = [],
                o.localName = t,
                o.prefix = i,
                o.namespace = n,
                o.name = a,
                o
            }
            return __extends(t, e),
            t
        }(n);
        t.XML = a,
        __reflect(a.prototype, "egret.web.XML");
        var o = function(e) {
            function t(t, r) {
                var i = e.call(this, 3, r) || this;
                return i.text = t,
                i
            }
            return __extends(t, e),
            t
        }(n);
        t.XMLText = o,
        __reflect(o.prototype, "egret.web.XMLText");
        var s = {};
        e.XML = {
            parse: r
        }
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r() {
                var r = null !== t && t.apply(this, arguments) || this;
                return r.onChange = function(t) {
                    var i = new e.OrientationEvent(e.Event.CHANGE);
                    i.beta = t.beta,
                    i.gamma = t.gamma,
                    i.alpha = t.alpha,
                    r.dispatchEvent(i)
                }
                ,
                r
            }
            return __extends(r, t),
            r.prototype.start = function() {
                window.addEventListener("deviceorientation", this.onChange)
            }
            ,
            r.prototype.stop = function() {
                window.removeEventListener("deviceorientation", this.onChange)
            }
            ,
            r
        }(e.EventDispatcher);
        t.WebDeviceOrientation = r,
        __reflect(r.prototype, "egret.web.WebDeviceOrientation", ["egret.DeviceOrientation"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})),
egret.DeviceOrientation = egret.web.WebDeviceOrientation;
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r(r) {
                var i = t.call(this) || this;
                return i.onUpdate = function(t) {
                    var r = new e.GeolocationEvent(e.Event.CHANGE)
                      , n = t.coords;
                    r.altitude = n.altitude,
                    r.heading = n.heading,
                    r.accuracy = n.accuracy,
                    r.latitude = n.latitude,
                    r.longitude = n.longitude,
                    r.speed = n.speed,
                    r.altitudeAccuracy = n.altitudeAccuracy,
                    i.dispatchEvent(r)
                }
                ,
                i.onError = function(t) {
                    var r = e.GeolocationEvent.UNAVAILABLE;
                    t.code == t.PERMISSION_DENIED && (r = e.GeolocationEvent.PERMISSION_DENIED);
                    var n = new e.GeolocationEvent(e.IOErrorEvent.IO_ERROR);
                    n.errorType = r,
                    n.errorMessage = t.message,
                    i.dispatchEvent(n)
                }
                ,
                i.geolocation = navigator.geolocation,
                i
            }
            return __extends(r, t),
            r.prototype.start = function() {
                var t = this.geolocation;
                t ? this.watchId = t.watchPosition(this.onUpdate, this.onError) : this.onError({
                    code: 2,
                    message: e.sys.tr(3004),
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2
                })
            }
            ,
            r.prototype.stop = function() {
                var e = this.geolocation;
                e.clearWatch(this.watchId)
            }
            ,
            r
        }(e.EventDispatcher);
        t.WebGeolocation = r,
        __reflect(r.prototype, "egret.web.WebGeolocation", ["egret.Geolocation"]),
        e.Geolocation = e.web.WebGeolocation
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(t) {
            function r() {
                var r = null !== t && t.apply(this, arguments) || this;
                return r.onChange = function(t) {
                    var i = new e.MotionEvent(e.Event.CHANGE)
                      , n = {
                        x: t.acceleration.x,
                        y: t.acceleration.y,
                        z: t.acceleration.z
                    }
                      , a = {
                        x: t.accelerationIncludingGravity.x,
                        y: t.accelerationIncludingGravity.y,
                        z: t.accelerationIncludingGravity.z
                    }
                      , o = {
                        alpha: t.rotationRate.alpha,
                        beta: t.rotationRate.beta,
                        gamma: t.rotationRate.gamma
                    };
                    i.acceleration = n,
                    i.accelerationIncludingGravity = a,
                    i.rotationRate = o,
                    r.dispatchEvent(i)
                }
                ,
                r
            }
            return __extends(r, t),
            r.prototype.start = function() {
                window.addEventListener("devicemotion", this.onChange)
            }
            ,
            r.prototype.stop = function() {
                window.removeEventListener("devicemotion", this.onChange)
            }
            ,
            r
        }(e.EventDispatcher);
        t.WebMotion = r,
        __reflect(r.prototype, "egret.web.WebMotion", ["egret.Motion"]),
        e.Motion = e.web.WebMotion
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {}(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        var t = function() {
            function e() {
                this.drawData = [],
                this.drawDataLen = 0
            }
            return e.prototype.pushDrawRect = function() {
                if (0 == this.drawDataLen || 1 != this.drawData[this.drawDataLen - 1].type) {
                    var e = this.drawData[this.drawDataLen] || {};
                    e.type = 1,
                    e.count = 0,
                    this.drawData[this.drawDataLen] = e,
                    this.drawDataLen++
                }
                this.drawData[this.drawDataLen - 1].count += 2
            }
            ,
            e.prototype.pushDrawTexture = function(e, t, r, i, n) {
                if (void 0 === t && (t = 2),
                r) {
                    var a = this.drawData[this.drawDataLen] || {};
                    a.type = 0,
                    a.texture = e,
                    a.filter = r,
                    a.count = t,
                    a.textureWidth = i,
                    a.textureHeight = n,
                    this.drawData[this.drawDataLen] = a,
                    this.drawDataLen++
                } else {
                    if (0 == this.drawDataLen || 0 != this.drawData[this.drawDataLen - 1].type || e != this.drawData[this.drawDataLen - 1].texture || this.drawData[this.drawDataLen - 1].filter) {
                        var a = this.drawData[this.drawDataLen] || {};
                        a.type = 0,
                        a.texture = e,
                        a.count = 0,
                        this.drawData[this.drawDataLen] = a,
                        this.drawDataLen++
                    }
                    this.drawData[this.drawDataLen - 1].count += t
                }
            }
            ,
            e.prototype.pushChangeSmoothing = function(e, t) {
                e.smoothing = t;
                var r = this.drawData[this.drawDataLen] || {};
                r.type = 10,
                r.texture = e,
                r.smoothing = t,
                this.drawData[this.drawDataLen] = r,
                this.drawDataLen++
            }
            ,
            e.prototype.pushPushMask = function(e) {
                void 0 === e && (e = 1);
                var t = this.drawData[this.drawDataLen] || {};
                t.type = 2,
                t.count = 2 * e,
                this.drawData[this.drawDataLen] = t,
                this.drawDataLen++
            }
            ,
            e.prototype.pushPopMask = function(e) {
                void 0 === e && (e = 1);
                var t = this.drawData[this.drawDataLen] || {};
                t.type = 3,
                t.count = 2 * e,
                this.drawData[this.drawDataLen] = t,
                this.drawDataLen++
            }
            ,
            e.prototype.pushSetBlend = function(e) {
                for (var t = this.drawDataLen, r = !1, i = t - 1; i >= 0; i--) {
                    var n = this.drawData[i];
                    if (n) {
                        if ((0 == n.type || 1 == n.type) && (r = !0),
                        !r && 4 == n.type) {
                            this.drawData.splice(i, 1),
                            this.drawDataLen--;
                            continue
                        }
                        if (4 == n.type) {
                            if (n.value == e)
                                return;
                            break
                        }
                    }
                }
                var a = this.drawData[this.drawDataLen] || {};
                a.type = 4,
                a.value = e,
                this.drawData[this.drawDataLen] = a,
                this.drawDataLen++
            }
            ,
            e.prototype.pushResize = function(e, t, r) {
                var i = this.drawData[this.drawDataLen] || {};
                i.type = 5,
                i.buffer = e,
                i.width = t,
                i.height = r,
                this.drawData[this.drawDataLen] = i,
                this.drawDataLen++
            }
            ,
            e.prototype.pushClearColor = function() {
                var e = this.drawData[this.drawDataLen] || {};
                e.type = 6,
                this.drawData[this.drawDataLen] = e,
                this.drawDataLen++
            }
            ,
            e.prototype.pushActivateBuffer = function(e) {
                for (var t = this.drawDataLen, r = !1, i = t - 1; i >= 0; i--) {
                    var n = this.drawData[i];
                    !n || (4 != n.type && 7 != n.type && (r = !0),
                    r || 7 != n.type) || (this.drawData.splice(i, 1),
                    this.drawDataLen--)
                }
                var a = this.drawData[this.drawDataLen] || {};
                a.type = 7,
                a.buffer = e,
                a.width = e.rootRenderTarget.width,
                a.height = e.rootRenderTarget.height,
                this.drawData[this.drawDataLen] = a,
                this.drawDataLen++
            }
            ,
            e.prototype.pushEnableScissor = function(e, t, r, i) {
                var n = this.drawData[this.drawDataLen] || {};
                n.type = 8,
                n.x = e,
                n.y = t,
                n.width = r,
                n.height = i,
                this.drawData[this.drawDataLen] = n,
                this.drawDataLen++
            }
            ,
            e.prototype.pushDisableScissor = function() {
                var e = this.drawData[this.drawDataLen] || {};
                e.type = 9,
                this.drawData[this.drawDataLen] = e,
                this.drawDataLen++
            }
            ,
            e.prototype.clear = function() {
                for (var e = 0; e < this.drawDataLen; e++) {
                    var t = this.drawData[e];
                    t.type = 0,
                    t.count = 0,
                    t.texture = null,
                    t.filter = null,
                    t.uv = null,
                    t.value = "",
                    t.buffer = null,
                    t.width = 0,
                    t.height = 0
                }
                this.drawDataLen = 0
            }
            ,
            e
        }();
        e.WebGLDrawCmdManager = t,
        __reflect(t.prototype, "egret.web.WebGLDrawCmdManager")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        var t = function() {
            function e() {
                this.size = 2e3,
                this.vertexMaxSize = 4 * this.size,
                this.indicesMaxSize = 6 * this.size,
                this.vertSize = 5,
                this.vertices = null,
                this.indices = null,
                this.indicesForMesh = null,
                this.vertexIndex = 0,
                this.indexIndex = 0,
                this.hasMesh = !1;
                var e = this.vertexMaxSize * this.vertSize
                  , t = this.indicesMaxSize;
                this.vertices = new Float32Array(e),
                this.indices = new Uint16Array(t),
                this.indicesForMesh = new Uint16Array(t);
                for (var r = 0, i = 0; t > r; r += 6,
                i += 4)
                    this.indices[r + 0] = i + 0,
                    this.indices[r + 1] = i + 1,
                    this.indices[r + 2] = i + 2,
                    this.indices[r + 3] = i + 0,
                    this.indices[r + 4] = i + 2,
                    this.indices[r + 5] = i + 3
            }
            return e.prototype.reachMaxSize = function(e, t) {
                return void 0 === e && (e = 4),
                void 0 === t && (t = 6),
                this.vertexIndex > this.vertexMaxSize - e || this.indexIndex > this.indicesMaxSize - t
            }
            ,
            e.prototype.getVertices = function() {
                var e = this.vertices.subarray(0, this.vertexIndex * this.vertSize);
                return e
            }
            ,
            e.prototype.getIndices = function() {
                return this.indices
            }
            ,
            e.prototype.getMeshIndices = function() {
                return this.indicesForMesh
            }
            ,
            e.prototype.changeToMeshIndices = function() {
                if (!this.hasMesh) {
                    for (var e = 0, t = this.indexIndex; t > e; ++e)
                        this.indicesForMesh[e] = this.indices[e];
                    this.hasMesh = !0
                }
            }
            ,
            e.prototype.isMesh = function() {
                return this.hasMesh
            }
            ,
            e.prototype.cacheArrays = function(e, t, r, i, n, a, o, s, l, h, c, u, d, p, f, g) {
                var v = e
                  , m = v.a
                  , y = v.b
                  , x = v.c
                  , b = v.d
                  , w = v.tx
                  , E = v.ty;
                (0 != o || 0 != s) && v.append(1, 0, 0, 1, o, s),
                (n / l != 1 || a / h != 1) && v.append(l / n, 0, 0, h / a, 0, 0);
                var T = v.a
                  , _ = v.b
                  , S = v.c
                  , C = v.d
                  , R = v.tx
                  , L = v.ty;
                if (v.a = m,
                v.b = y,
                v.c = x,
                v.d = b,
                v.tx = w,
                v.ty = E,
                p) {
                    var A = this.vertices
                      , D = this.vertexIndex * this.vertSize
                      , O = 0
                      , I = 0
                      , M = 0
                      , B = 0
                      , $ = 0
                      , P = 0
                      , F = 0;
                    for (O = 0,
                    M = d.length; M > O; O += 2)
                        I = 5 * O / 2,
                        P = p[O],
                        F = p[O + 1],
                        B = d[O],
                        $ = d[O + 1],
                        A[D + I + 0] = T * P + S * F + R,
                        A[D + I + 1] = _ * P + C * F + L,
                        A[D + I + 2] = (r + B * n) / c,
                        A[D + I + 3] = (i + $ * a) / u,
                        A[D + I + 4] = t;
                    if (this.hasMesh)
                        for (var G = 0, W = f.length; W > G; ++G)
                            this.indicesForMesh[this.indexIndex + G] = f[G] + this.vertexIndex;
                    this.vertexIndex += d.length / 2,
                    this.indexIndex += f.length
                } else {
                    var N = c
                      , H = u
                      , U = n
                      , k = a;
                    r /= N,
                    i /= H;
                    var A = this.vertices
                      , D = this.vertexIndex * this.vertSize;
                    if (g) {
                        var V = n;
                        n = a / N,
                        a = V / H,
                        A[D++] = R,
                        A[D++] = L,
                        A[D++] = n + r,
                        A[D++] = i,
                        A[D++] = t,
                        A[D++] = T * U + R,
                        A[D++] = _ * U + L,
                        A[D++] = n + r,
                        A[D++] = a + i,
                        A[D++] = t,
                        A[D++] = T * U + S * k + R,
                        A[D++] = C * k + _ * U + L,
                        A[D++] = r,
                        A[D++] = a + i,
                        A[D++] = t,
                        A[D++] = S * k + R,
                        A[D++] = C * k + L,
                        A[D++] = r,
                        A[D++] = i,
                        A[D++] = t
                    } else
                        n /= N,
                        a /= H,
                        A[D++] = R,
                        A[D++] = L,
                        A[D++] = r,
                        A[D++] = i,
                        A[D++] = t,
                        A[D++] = T * U + R,
                        A[D++] = _ * U + L,
                        A[D++] = n + r,
                        A[D++] = i,
                        A[D++] = t,
                        A[D++] = T * U + S * k + R,
                        A[D++] = C * k + _ * U + L,
                        A[D++] = n + r,
                        A[D++] = a + i,
                        A[D++] = t,
                        A[D++] = S * k + R,
                        A[D++] = C * k + L,
                        A[D++] = r,
                        A[D++] = a + i,
                        A[D++] = t;
                    if (this.hasMesh) {
                        var z = this.indicesForMesh;
                        z[this.indexIndex + 0] = 0 + this.vertexIndex,
                        z[this.indexIndex + 1] = 1 + this.vertexIndex,
                        z[this.indexIndex + 2] = 2 + this.vertexIndex,
                        z[this.indexIndex + 3] = 0 + this.vertexIndex,
                        z[this.indexIndex + 4] = 2 + this.vertexIndex,
                        z[this.indexIndex + 5] = 3 + this.vertexIndex
                    }
                    this.vertexIndex += 4,
                    this.indexIndex += 6
                }
            }
            ,
            e.prototype.clear = function() {
                this.hasMesh = !1,
                this.vertexIndex = 0,
                this.indexIndex = 0
            }
            ,
            e
        }();
        e.WebGLVertexArrayObject = t,
        __reflect(t.prototype, "egret.web.WebGLVertexArrayObject")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(e) {
            function t(t, r, i) {
                var n = e.call(this) || this;
                return n.clearColor = [0, 0, 0, 0],
                n.useFrameBuffer = !0,
                n.gl = t,
                n.width = r || 1,
                n.height = i || 1,
                n
            }
            return __extends(t, e),
            t.prototype.resize = function(e, t) {
                var r = this.gl;
                this.width = e,
                this.height = t,
                this.frameBuffer && (r.bindTexture(r.TEXTURE_2D, this.texture),
                r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, t, 0, r.RGBA, r.UNSIGNED_BYTE, null)),
                this.stencilBuffer && (r.deleteRenderbuffer(this.stencilBuffer),
                this.stencilBuffer = null)
            }
            ,
            t.prototype.activate = function() {
                var e = this.gl;
                e.bindFramebuffer(e.FRAMEBUFFER, this.getFrameBuffer())
            }
            ,
            t.prototype.getFrameBuffer = function() {
                return this.useFrameBuffer ? this.frameBuffer : null
            }
            ,
            t.prototype.initFrameBuffer = function() {
                if (!this.frameBuffer) {
                    var e = this.gl;
                    this.texture = this.createTexture(),
                    this.frameBuffer = e.createFramebuffer(),
                    e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer),
                    e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture, 0)
                }
            }
            ,
            t.prototype.createTexture = function() {
                var e = this.gl
                  , t = e.createTexture();
                return e.bindTexture(e.TEXTURE_2D, t),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, null),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                t
            }
            ,
            t.prototype.clear = function(e) {
                var t = this.gl;
                e && this.activate(),
                t.colorMask(!0, !0, !0, !0),
                t.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]),
                t.clear(t.COLOR_BUFFER_BIT)
            }
            ,
            t.prototype.enabledStencil = function() {
                if (this.frameBuffer && !this.stencilBuffer) {
                    var e = this.gl;
                    e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer),
                    this.stencilBuffer = e.createRenderbuffer(),
                    e.bindRenderbuffer(e.RENDERBUFFER, this.stencilBuffer),
                    e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, this.width, this.height),
                    e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, this.stencilBuffer)
                }
            }
            ,
            t
        }(e.HashObject);
        t.WebGLRenderTarget = r,
        __reflect(r.prototype, "egret.web.WebGLRenderTarget")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        function r(e, t) {
            var r = document.createElement("canvas");
            return isNaN(e) || isNaN(t) || (r.width = e,
            r.height = t),
            r
        }
        var i = function() {
            function i(e, i) {
                this.glID = null,
                this.projectionX = 0 / 0,
                this.projectionY = 0 / 0,
                this.contextLost = !1,
                this.$scissorState = !1,
                this.vertSize = 5,
                this.surface = r(e, i),
                this.initWebGL(),
                this.$bufferStack = [];
                var n = this.context;
                this.vertexBuffer = n.createBuffer(),
                this.indexBuffer = n.createBuffer(),
                n.bindBuffer(n.ARRAY_BUFFER, this.vertexBuffer),
                n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
                this.drawCmdManager = new t.WebGLDrawCmdManager,
                this.vao = new t.WebGLVertexArrayObject,
                this.setGlobalCompositeOperation("source-over")
            }
            return i.getInstance = function(e, t) {
                return this.instance ? this.instance : (this.instance = new i(e,t),
                this.instance)
            }
            ,
            i.prototype.pushBuffer = function(e) {
                this.$bufferStack.push(e),
                e != this.currentBuffer && (this.currentBuffer,
                this.drawCmdManager.pushActivateBuffer(e)),
                this.currentBuffer = e
            }
            ,
            i.prototype.popBuffer = function() {
                if (!(this.$bufferStack.length <= 1)) {
                    var e = this.$bufferStack.pop()
                      , t = this.$bufferStack[this.$bufferStack.length - 1];
                    e != t && this.drawCmdManager.pushActivateBuffer(t),
                    this.currentBuffer = t
                }
            }
            ,
            i.prototype.activateBuffer = function(e) {
                e.rootRenderTarget.activate(),
                this.bindIndices || this.uploadIndicesArray(this.vao.getIndices()),
                e.restoreStencil(),
                e.restoreScissor(),
                this.onResize(e.width, e.height)
            }
            ,
            i.prototype.uploadVerticesArray = function(e) {
                var t = this.context;
                t.bufferData(t.ARRAY_BUFFER, e, t.STREAM_DRAW)
            }
            ,
            i.prototype.uploadIndicesArray = function(e) {
                var t = this.context;
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.STATIC_DRAW),
                this.bindIndices = !0
            }
            ,
            i.prototype.destroy = function() {
                this.surface.width = this.surface.height = 0
            }
            ,
            i.prototype.onResize = function(e, t) {
                e = e || this.surface.width,
                t = t || this.surface.height,
                this.projectionX = e / 2,
                this.projectionY = -t / 2,
                this.context && this.context.viewport(0, 0, e, t)
            }
            ,
            i.prototype.resize = function(e, t, r) {
                var i = this.surface;
                r ? (i.width < e && (i.width = e),
                i.height < t && (i.height = t)) : (i.width != e && (i.width = e),
                i.height != t && (i.height = t)),
                this.onResize()
            }
            ,
            i.prototype.initWebGL = function() {
                this.onResize(),
                this.surface.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1),
                this.surface.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), !1),
                this.getWebGLContext();
                var e = this.context;
                this.$maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE)
            }
            ,
            i.prototype.handleContextLost = function() {
                this.contextLost = !0
            }
            ,
            i.prototype.handleContextRestored = function() {
                this.initWebGL(),
                this.contextLost = !1
            }
            ,
            i.prototype.getWebGLContext = function() {
                for (var t, r = {
                    antialias: i.antialias,
                    stencil: !0
                }, n = ["webgl", "experimental-webgl"], a = 0; a < n.length; a++) {
                    try {
                        t = this.surface.getContext(n[a], r)
                    } catch (o) {}
                    if (t)
                        break
                }
                t || e.$error(1021),
                this.setContext(t)
            }
            ,
            i.prototype.setContext = function(e) {
                this.context = e,
                e.id = i.glContextId++,
                this.glID = e.id,
                e.disable(e.DEPTH_TEST),
                e.disable(e.CULL_FACE),
                e.enable(e.BLEND),
                e.colorMask(!0, !0, !0, !0),
                e.activeTexture(e.TEXTURE0)
            }
            ,
            i.prototype.enableStencilTest = function() {
                var e = this.context;
                e.enable(e.STENCIL_TEST)
            }
            ,
            i.prototype.disableStencilTest = function() {
                var e = this.context;
                e.disable(e.STENCIL_TEST)
            }
            ,
            i.prototype.enableScissorTest = function(e) {
                var t = this.context;
                t.enable(t.SCISSOR_TEST),
                t.scissor(e.x, e.y, e.width, e.height)
            }
            ,
            i.prototype.disableScissorTest = function() {
                var e = this.context;
                e.disable(e.SCISSOR_TEST)
            }
            ,
            i.prototype.getPixels = function(e, t, r, i, n) {
                var a = this.context;
                a.readPixels(e, t, r, i, a.RGBA, a.UNSIGNED_BYTE, n)
            }
            ,
            i.prototype.createTexture = function(e) {
                var t = this.context
                  , r = t.createTexture();
                return r ? (r.glContext = t,
                t.bindTexture(t.TEXTURE_2D, r),
                t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                r) : void (this.contextLost = !0)
            }
            ,
            i.prototype.createTextureFromCompressedData = function(e, t, r, i, n) {
                return null
            }
            ,
            i.prototype.updateTexture = function(e, t) {
                var r = this.context;
                r.bindTexture(r.TEXTURE_2D, e),
                r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t)
            }
            ,
            i.prototype.getWebGLTexture = function(e) {
                return e.webGLTexture || ("image" == e.format ? e.webGLTexture = this.createTexture(e.source) : "pvr" == e.format && (e.webGLTexture = this.createTextureFromCompressedData(e.source.pvrtcData, e.width, e.height, e.source.mipmapsCount, e.source.format)),
                e.$deleteSource && e.webGLTexture && (e.source = null),
                e.webGLTexture.smoothing = !0),
                e.webGLTexture
            }
            ,
            i.prototype.clearRect = function(e, t, r, i) {
                if (0 != e || 0 != t || r != this.surface.width || i != this.surface.height) {
                    var n = this.currentBuffer;
                    if (n.$hasScissor)
                        this.setGlobalCompositeOperation("destination-out"),
                        this.drawRect(e, t, r, i),
                        this.setGlobalCompositeOperation("source-over");
                    else {
                        var a = n.globalMatrix;
                        0 == a.b && 0 == a.c ? (e = e * a.a + a.tx,
                        t = t * a.d + a.ty,
                        r *= a.a,
                        i *= a.d,
                        this.enableScissor(e, -t - i + n.height, r, i),
                        this.clear(),
                        this.disableScissor()) : (this.setGlobalCompositeOperation("destination-out"),
                        this.drawRect(e, t, r, i),
                        this.setGlobalCompositeOperation("source-over"))
                    }
                } else
                    this.clear()
            }
            ,
            i.prototype.setGlobalCompositeOperation = function(e) {
                this.drawCmdManager.pushSetBlend(e)
            }
            ,
            i.prototype.drawImage = function(e, t, r, i, n, a, o, s, l, h, c, u, d) {
                var p = this.currentBuffer;
                if (!this.contextLost && e && p) {
                    var f;
                    if (e.texture || e.source && e.source.texture)
                        f = e.texture || e.source.texture,
                        p.saveTransform(),
                        p.transform(1, 0, 0, -1, 0, l + 2 * o);
                    else {
                        if (!e.source && !e.webGLTexture)
                            return;
                        f = this.getWebGLTexture(e)
                    }
                    f && (this.drawTexture(f, t, r, i, n, a, o, s, l, h, c, void 0, void 0, void 0, void 0, u, d),
                    e.source && e.source.texture && p.restoreTransform())
                }
            }
            ,
            i.prototype.drawMesh = function(e, t, r, i, n, a, o, s, l, h, c, u, d, p, f, g) {
                var v = this.currentBuffer;
                if (!this.contextLost && e && v) {
                    var m;
                    if (e.texture || e.source && e.source.texture)
                        m = e.texture || e.source.texture,
                        v.saveTransform(),
                        v.transform(1, 0, 0, -1, 0, l + 2 * o);
                    else {
                        if (!e.source && !e.webGLTexture)
                            return;
                        m = this.getWebGLTexture(e)
                    }
                    m && (this.drawTexture(m, t, r, i, n, a, o, s, l, h, c, u, d, p, f, g),
                    (e.texture || e.source && e.source.texture) && v.restoreTransform())
                }
            }
            ,
            i.prototype.drawTexture = function(e, t, r, i, n, a, o, s, l, h, c, u, d, p, f, g, v) {
                var m = this.currentBuffer;
                if (!this.contextLost && e && m) {
                    d && p ? this.vao.reachMaxSize(d.length / 2, p.length) && this.$drawWebGL() : this.vao.reachMaxSize() && this.$drawWebGL(),
                    void 0 != v && e.smoothing != v && this.drawCmdManager.pushChangeSmoothing(e, v),
                    u && this.vao.changeToMeshIndices();
                    var y = m.globalMatrix
                      , x = m.globalAlpha
                      , b = p ? p.length / 3 : 2;
                    this.drawCmdManager.pushDrawTexture(e, b, this.$filter),
                    this.vao.cacheArrays(y, x, t, r, i, n, a, o, s, l, h, c, u, d, p, g)
                }
            }
            ,
            i.prototype.drawRect = function(e, t, r, i) {
                var n = this.currentBuffer;
                !this.contextLost && n && (this.vao.reachMaxSize() && this.$drawWebGL(),
                this.drawCmdManager.pushDrawRect(),
                this.vao.cacheArrays(n.globalMatrix, n.globalAlpha, 0, 0, r, i, e, t, r, i, r, i))
            }
            ,
            i.prototype.pushMask = function(e) {
                var t = this.currentBuffer;
                if (!this.contextLost && t) {
                    t.$stencilList.push(e),
                    this.vao.reachMaxSize() && this.$drawWebGL();
                    var r = e.length;
                    if (r) {
                        this.drawCmdManager.pushPushMask(r);
                        for (var i = 0; r > i; i++) {
                            var n = e[i];
                            this.vao.cacheArrays(t.globalMatrix, t.globalAlpha, 0, 0, n.width, n.height, n.minX, n.minY, n.width, n.height, n.width, n.height)
                        }
                    } else
                        this.drawCmdManager.pushPushMask(),
                        this.vao.cacheArrays(t.globalMatrix, t.globalAlpha, 0, 0, e.width, e.height, e.x, e.y, e.width, e.height, e.width, e.height)
                }
            }
            ,
            i.prototype.popMask = function() {
                var e = this.currentBuffer;
                if (!this.contextLost && e) {
                    var t = e.$stencilList.pop();
                    this.vao.reachMaxSize() && this.$drawWebGL();
                    var r = t.length;
                    if (r) {
                        this.drawCmdManager.pushPopMask(r);
                        for (var i = 0; r > i; i++) {
                            var n = t[i];
                            this.vao.cacheArrays(e.globalMatrix, e.globalAlpha, 0, 0, n.width, n.height, n.minX, n.minY, n.width, n.height, n.width, n.height)
                        }
                    } else
                        this.drawCmdManager.pushPopMask(),
                        this.vao.cacheArrays(e.globalMatrix, e.globalAlpha, 0, 0, t.width, t.height, t.x, t.y, t.width, t.height, t.width, t.height)
                }
            }
            ,
            i.prototype.clear = function() {
                this.drawCmdManager.pushClearColor()
            }
            ,
            i.prototype.enableScissor = function(e, t, r, i) {
                var n = this.currentBuffer;
                this.drawCmdManager.pushEnableScissor(e, t, r, i),
                n.$hasScissor = !0
            }
            ,
            i.prototype.disableScissor = function() {
                var e = this.currentBuffer;
                this.drawCmdManager.pushDisableScissor(),
                e.$hasScissor = !1
            }
            ,
            i.prototype.$drawWebGL = function() {
                if (0 != this.drawCmdManager.drawDataLen && !this.contextLost) {
                    this.uploadVerticesArray(this.vao.getVertices()),
                    this.vao.isMesh() && this.uploadIndicesArray(this.vao.getMeshIndices());
                    for (var e = this.drawCmdManager.drawDataLen, t = 0, r = 0; e > r; r++) {
                        var i = this.drawCmdManager.drawData[r];
                        t = this.drawData(i, t),
                        7 == i.type && (this.activatedBuffer = i.buffer),
                        (0 == i.type || 1 == i.type || 2 == i.type || 3 == i.type) && this.activatedBuffer && this.activatedBuffer.$computeDrawCall && this.activatedBuffer.$drawCalls++
                    }
                    this.vao.isMesh() && this.uploadIndicesArray(this.vao.getIndices()),
                    this.drawCmdManager.clear(),
                    this.vao.clear()
                }
            }
            ,
            i.prototype.drawData = function(e, r) {
                if (e) {
                    var i, n = this.context, a = e.filter;
                    switch (e.type) {
                    case 0:
                        a ? "custom" === a.type ? i = t.EgretWebGLProgram.getProgram(n, a.$vertexSrc, a.$fragmentSrc, a.$shaderKey) : "colorTransform" === a.type ? i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.colorTransform_frag, "colorTransform") : "blurX" === a.type ? i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.blur_frag, "blur") : "blurY" === a.type ? i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.blur_frag, "blur") : "glow" === a.type && (i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.glow_frag, "glow")) : i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.texture_frag, "texture"),
                        this.activeProgram(n, i),
                        this.syncUniforms(i, a, e.textureWidth, e.textureHeight),
                        r += this.drawTextureElements(e, r);
                        break;
                    case 1:
                        i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"),
                        this.activeProgram(n, i),
                        this.syncUniforms(i, a, e.textureWidth, e.textureHeight),
                        r += this.drawRectElements(e, r);
                        break;
                    case 2:
                        i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"),
                        this.activeProgram(n, i),
                        this.syncUniforms(i, a, e.textureWidth, e.textureHeight),
                        r += this.drawPushMaskElements(e, r);
                        break;
                    case 3:
                        i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"),
                        this.activeProgram(n, i),
                        this.syncUniforms(i, a, e.textureWidth, e.textureHeight),
                        r += this.drawPopMaskElements(e, r);
                        break;
                    case 4:
                        this.setBlendMode(e.value);
                        break;
                    case 5:
                        e.buffer.rootRenderTarget.resize(e.width, e.height),
                        this.onResize(e.width, e.height);
                        break;
                    case 6:
                        if (this.activatedBuffer) {
                            var o = this.activatedBuffer.rootRenderTarget;
                            (0 != o.width || 0 != o.height) && o.clear(!0)
                        }
                        break;
                    case 7:
                        this.activateBuffer(e.buffer);
                        break;
                    case 8:
                        var s = this.activatedBuffer;
                        s && (s.rootRenderTarget && s.rootRenderTarget.enabledStencil(),
                        s.enableScissor(e.x, e.y, e.width, e.height));
                        break;
                    case 9:
                        s = this.activatedBuffer,
                        s && s.disableScissor();
                        break;
                    case 10:
                        n.bindTexture(n.TEXTURE_2D, e.texture),
                        e.smoothing ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR),
                        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR)) : (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST),
                        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST))
                    }
                    return r
                }
            }
            ,
            i.prototype.activeProgram = function(e, t) {
                if (t != this.currentProgram) {
                    e.useProgram(t.id);
                    var r = t.attributes;
                    for (var i in r)
                        "aVertexPosition" === i ? (e.vertexAttribPointer(r.aVertexPosition.location, 2, e.FLOAT, !1, 20, 0),
                        e.enableVertexAttribArray(r.aVertexPosition.location)) : "aTextureCoord" === i ? (e.vertexAttribPointer(r.aTextureCoord.location, 2, e.FLOAT, !1, 20, 8),
                        e.enableVertexAttribArray(r.aTextureCoord.location)) : "aColor" === i && (e.vertexAttribPointer(r.aColor.location, 1, e.FLOAT, !1, 20, 16),
                        e.enableVertexAttribArray(r.aColor.location));
                    this.currentProgram = t
                }
            }
            ,
            i.prototype.syncUniforms = function(e, t, r, i) {
                var n = e.uniforms;
                t && "custom" === t.type;
                for (var a in n)
                    if ("projectionVector" === a)
                        n[a].setValue({
                            x: this.projectionX,
                            y: this.projectionY
                        });
                    else if ("uTextureSize" === a)
                        n[a].setValue({
                            x: r,
                            y: i
                        });
                    else if ("uSampler" === a)
                        ;
                    else {
                        var o = t.$uniforms[a];
                        void 0 !== o && n[a].setValue(o)
                    }
            }
            ,
            i.prototype.drawTextureElements = function(e, t) {
                var r = this.context;
                r.bindTexture(r.TEXTURE_2D, e.texture);
                var i = 3 * e.count;
                return r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t),
                i
            }
            ,
            i.prototype.drawRectElements = function(e, t) {
                var r = this.context
                  , i = 3 * e.count;
                return r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t),
                i
            }
            ,
            i.prototype.drawPushMaskElements = function(e, t) {
                var r = this.context
                  , i = 3 * e.count
                  , n = this.activatedBuffer;
                if (n) {
                    n.rootRenderTarget && n.rootRenderTarget.enabledStencil(),
                    0 == n.stencilHandleCount && (n.enableStencil(),
                    r.clear(r.STENCIL_BUFFER_BIT));
                    var a = n.stencilHandleCount;
                    n.stencilHandleCount++,
                    r.colorMask(!1, !1, !1, !1),
                    r.stencilFunc(r.EQUAL, a, 255),
                    r.stencilOp(r.KEEP, r.KEEP, r.INCR),
                    r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t),
                    r.stencilFunc(r.EQUAL, a + 1, 255),
                    r.colorMask(!0, !0, !0, !0),
                    r.stencilOp(r.KEEP, r.KEEP, r.KEEP)
                }
                return i
            }
            ,
            i.prototype.drawPopMaskElements = function(e, t) {
                var r = this.context
                  , i = 3 * e.count
                  , n = this.activatedBuffer;
                if (n)
                    if (n.stencilHandleCount--,
                    0 == n.stencilHandleCount)
                        n.disableStencil();
                    else {
                        var a = n.stencilHandleCount;
                        r.colorMask(!1, !1, !1, !1),
                        r.stencilFunc(r.EQUAL, a + 1, 255),
                        r.stencilOp(r.KEEP, r.KEEP, r.DECR),
                        r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t),
                        r.stencilFunc(r.EQUAL, a, 255),
                        r.colorMask(!0, !0, !0, !0),
                        r.stencilOp(r.KEEP, r.KEEP, r.KEEP)
                    }
                return i
            }
            ,
            i.prototype.setBlendMode = function(e) {
                var t = this.context
                  , r = i.blendModesForGL[e];
                r && t.blendFunc(r[0], r[1])
            }
            ,
            i.prototype.drawTargetWidthFilters = function(e, r) {
                var i, n = r, a = e.length;
                if (a > 1)
                    for (var o = 0; a - 1 > o; o++) {
                        var s = e[o]
                          , l = r.rootRenderTarget.width
                          , h = r.rootRenderTarget.height;
                        i = t.WebGLRenderBuffer.create(l, h),
                        i.setTransform(1, 0, 0, 1, 0, 0),
                        i.globalAlpha = 1,
                        this.drawToRenderTarget(s, r, i),
                        r != n && t.WebGLRenderBuffer.release(r),
                        r = i
                    }
                var c = e[a - 1];
                this.drawToRenderTarget(c, r, this.currentBuffer),
                r != n && t.WebGLRenderBuffer.release(r)
            }
            ,
            i.prototype.drawToRenderTarget = function(e, r, i) {
                if (!this.contextLost) {
                    this.vao.reachMaxSize() && this.$drawWebGL(),
                    this.pushBuffer(i);
                    var n, a = r, o = r.rootRenderTarget.width, s = r.rootRenderTarget.height;
                    if ("blur" == e.type) {
                        var l = e.blurXFilter
                          , h = e.blurYFilter;
                        0 != l.blurX && 0 != h.blurY ? (n = t.WebGLRenderBuffer.create(o, s),
                        n.setTransform(1, 0, 0, 1, 0, 0),
                        n.globalAlpha = 1,
                        this.drawToRenderTarget(e.blurXFilter, r, n),
                        r != a && t.WebGLRenderBuffer.release(r),
                        r = n,
                        e = h) : e = 0 === l.blurX ? h : l
                    }
                    i.saveTransform(),
                    i.transform(1, 0, 0, -1, 0, s),
                    this.vao.cacheArrays(i.globalMatrix, i.globalAlpha, 0, 0, o, s, 0, 0, o, s, o, s),
                    i.restoreTransform(),
                    this.drawCmdManager.pushDrawTexture(r.rootRenderTarget.texture, 2, e, o, s),
                    r != a && t.WebGLRenderBuffer.release(r),
                    this.popBuffer()
                }
            }
            ,
            i.initBlendMode = function() {
                i.blendModesForGL = {},
                i.blendModesForGL["source-over"] = [1, 771],
                i.blendModesForGL.lighter = [1, 1],
                i.blendModesForGL["lighter-in"] = [770, 771],
                i.blendModesForGL["destination-out"] = [0, 771],
                i.blendModesForGL["destination-in"] = [0, 770]
            }
            ,
            i.glContextId = 0,
            i.blendModesForGL = null,
            i
        }();
        t.WebGLRenderContext = i,
        __reflect(i.prototype, "egret.web.WebGLRenderContext"),
        i.initBlendMode()
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = function(r) {
            function n(i, n, a) {
                var o = r.call(this) || this;
                if (o.globalAlpha = 1,
                o.stencilState = !1,
                o.$stencilList = [],
                o.stencilHandleCount = 0,
                o.$scissorState = !1,
                o.scissorRect = new e.Rectangle,
                o.$hasScissor = !1,
                o.dirtyRegionPolicy = !0,
                o._dirtyRegionPolicy = !0,
                o.$drawCalls = 0,
                o.$computeDrawCall = !1,
                o.globalMatrix = new e.Matrix,
                o.savedGlobalMatrix = new e.Matrix,
                o.context = t.WebGLRenderContext.getInstance(i, n),
                o.rootRenderTarget = new t.WebGLRenderTarget(o.context.context,3,3),
                i && n && o.resize(i, n),
                o.root = a,
                o.root)
                    o.context.pushBuffer(o),
                    o.surface = o.context.surface;
                else {
                    var s = o.context.activatedBuffer;
                    s && s.rootRenderTarget.activate(),
                    o.rootRenderTarget.initFrameBuffer(),
                    o.surface = o.rootRenderTarget
                }
                return o
            }
            return __extends(n, r),
            n.prototype.enableStencil = function() {
                this.stencilState || (this.context.enableStencilTest(),
                this.stencilState = !0)
            }
            ,
            n.prototype.disableStencil = function() {
                this.stencilState && (this.context.disableStencilTest(),
                this.stencilState = !1)
            }
            ,
            n.prototype.restoreStencil = function() {
                this.stencilState ? this.context.enableStencilTest() : this.context.disableStencilTest()
            }
            ,
            n.prototype.enableScissor = function(e, t, r, i) {
                this.$scissorState || (this.$scissorState = !0,
                this.scissorRect.setTo(e, t, r, i),
                this.context.enableScissorTest(this.scissorRect))
            }
            ,
            n.prototype.disableScissor = function() {
                this.$scissorState && (this.$scissorState = !1,
                this.scissorRect.setEmpty(),
                this.context.disableScissorTest())
            }
            ,
            n.prototype.restoreScissor = function() {
                this.$scissorState ? this.context.enableScissorTest(this.scissorRect) : this.context.disableScissorTest()
            }
            ,
            Object.defineProperty(n.prototype, "width", {
                get: function() {
                    return this.rootRenderTarget.width
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "height", {
                get: function() {
                    return this.rootRenderTarget.height
                },
                enumerable: !0,
                configurable: !0
            }),
            n.prototype.resize = function(e, t, r) {
                this.context.pushBuffer(this),
                e = e || 1,
                t = t || 1,
                (e != this.rootRenderTarget.width || t != this.rootRenderTarget.height) && (this.context.drawCmdManager.pushResize(this, e, t),
                this.rootRenderTarget.width = e,
                this.rootRenderTarget.height = t),
                this.root && this.context.resize(e, t, r),
                this.context.clear(),
                this.context.popBuffer()
            }
            ,
            n.prototype.resizeTo = function(e, t, r, i) {
                this.context.pushBuffer(this);
                var a = this.rootRenderTarget.width
                  , o = this.rootRenderTarget.height
                  , s = n.create(a, o);
                this.context.pushBuffer(s),
                this.context.drawImage(this.rootRenderTarget, 0, 0, a, o, 0, 0, a, o, a, o, !1),
                this.context.popBuffer(),
                this.resize(e, t),
                this.setTransform(1, 0, 0, 1, 0, 0),
                this.context.drawImage(s.rootRenderTarget, 0, 0, a, o, r, i, a, o, a, o, !1),
                n.release(s),
                this.context.popBuffer()
            }
            ,
            n.prototype.setDirtyRegionPolicy = function(e) {
                this.dirtyRegionPolicy = "on" == e
            }
            ,
            n.prototype.beginClip = function(e, t, r) {
                this.context.pushBuffer(this),
                this.root && (this._dirtyRegionPolicy ? (this.rootRenderTarget.useFrameBuffer = !0,
                this.rootRenderTarget.activate()) : (this.rootRenderTarget.useFrameBuffer = !1,
                this.rootRenderTarget.activate(),
                n.autoClear && this.context.clear())),
                t = +t || 0,
                r = +r || 0,
                this.setTransform(1, 0, 0, 1, t, r);
                e.length;
                this.maskPushed = !1,
                this.rootRenderTarget.useFrameBuffer && this.context.clear(),
                this.context.popBuffer()
            }
            ,
            n.prototype.endClip = function() {
                (this.maskPushed || this.scissorEnabled) && (this.context.pushBuffer(this),
                this.maskPushed && (this.setTransform(1, 0, 0, 1, this.offsetX, this.offsetY),
                this.context.popMask()),
                this.scissorEnabled && this.context.disableScissor(),
                this.context.popBuffer())
            }
            ,
            n.prototype.getPixels = function(e, t, r, i) {
                void 0 === r && (r = 1),
                void 0 === i && (i = 1);
                var n = new Uint8Array(4 * r * i)
                  , a = this.rootRenderTarget.useFrameBuffer;
                this.rootRenderTarget.useFrameBuffer = !0,
                this.rootRenderTarget.activate(),
                this.context.getPixels(e, t, r, i, n),
                this.rootRenderTarget.useFrameBuffer = a,
                this.rootRenderTarget.activate();
                for (var o = new Uint8Array(4 * r * i), s = 0; i > s; s++)
                    for (var l = 0; r > l; l++)
                        o[4 * (r * (i - s - 1) + l)] = n[4 * (r * s + l)],
                        o[4 * (r * (i - s - 1) + l) + 1] = n[4 * (r * s + l) + 1],
                        o[4 * (r * (i - s - 1) + l) + 2] = n[4 * (r * s + l) + 2],
                        o[4 * (r * (i - s - 1) + l) + 3] = n[4 * (r * s + l) + 3];
                return o
            }
            ,
            n.prototype.toDataURL = function(e, t) {
                return this.context.surface.toDataURL(e, t)
            }
            ,
            n.prototype.destroy = function() {
                this.context.destroy()
            }
            ,
            n.prototype.onRenderFinish = function() {
                this.$drawCalls = 0,
                this.root && (!this._dirtyRegionPolicy && this.dirtyRegionPolicy && this.drawSurfaceToFrameBuffer(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, !0),
                this._dirtyRegionPolicy && this.drawFrameBufferToSurface(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height),
                this._dirtyRegionPolicy = this.dirtyRegionPolicy)
            }
            ,
            n.prototype.drawFrameBufferToSurface = function(e, t, r, i, n, a, o, s, l) {
                void 0 === l && (l = !1),
                this.rootRenderTarget.useFrameBuffer = !1,
                this.rootRenderTarget.activate(),
                this.context.disableStencilTest(),
                this.context.disableScissorTest(),
                this.setTransform(1, 0, 0, 1, 0, 0),
                this.globalAlpha = 1,
                this.context.setGlobalCompositeOperation("source-over"),
                l && this.context.clear(),
                this.context.drawImage(this.rootRenderTarget, e, t, r, i, n, a, o, s, r, i, !1),
                this.context.$drawWebGL(),
                this.rootRenderTarget.useFrameBuffer = !0,
                this.rootRenderTarget.activate(),
                this.restoreStencil(),
                this.restoreScissor()
            }
            ,
            n.prototype.drawSurfaceToFrameBuffer = function(e, t, r, i, n, a, o, s, l) {
                void 0 === l && (l = !1),
                this.rootRenderTarget.useFrameBuffer = !0,
                this.rootRenderTarget.activate(),
                this.context.disableStencilTest(),
                this.context.disableScissorTest(),
                this.setTransform(1, 0, 0, 1, 0, 0),
                this.globalAlpha = 1,
                this.context.setGlobalCompositeOperation("source-over"),
                l && this.context.clear(),
                this.context.drawImage(this.context.surface, e, t, r, i, n, a, o, s, r, i, !1),
                this.context.$drawWebGL(),
                this.rootRenderTarget.useFrameBuffer = !1,
                this.rootRenderTarget.activate(),
                this.restoreStencil(),
                this.restoreScissor()
            }
            ,
            n.prototype.clear = function() {
                this.context.clear()
            }
            ,
            n.prototype.setTransform = function(e, t, r, i, n, a) {
                var o = this.globalMatrix;
                o.a = e,
                o.b = t,
                o.c = r,
                o.d = i,
                o.tx = n,
                o.ty = a
            }
            ,
            n.prototype.transform = function(e, t, r, i, n, a) {
                var o = this.globalMatrix
                  , s = o.a
                  , l = o.b
                  , h = o.c
                  , c = o.d;
                (1 != e || 0 != t || 0 != r || 1 != i) && (o.a = e * s + t * h,
                o.b = e * l + t * c,
                o.c = r * s + i * h,
                o.d = r * l + i * c),
                o.tx = n * s + a * h + o.tx,
                o.ty = n * l + a * c + o.ty
            }
            ,
            n.prototype.translate = function(e, t) {
                var r = this.globalMatrix;
                r.tx += e,
                r.ty += t
            }
            ,
            n.prototype.saveTransform = function() {
                var e = this.globalMatrix
                  , t = this.savedGlobalMatrix;
                t.a = e.a,
                t.b = e.b,
                t.c = e.c,
                t.d = e.d,
                t.tx = e.tx,
                t.ty = e.ty
            }
            ,
            n.prototype.restoreTransform = function() {
                var e = this.globalMatrix
                  , t = this.savedGlobalMatrix;
                e.a = t.a,
                e.b = t.b,
                e.c = t.c,
                e.d = t.d,
                e.tx = t.tx,
                e.ty = t.ty
            }
            ,
            n.create = function(e, t) {
                var r = i.pop();
                if (r) {
                    r.resize(e, t);
                    var a = r.globalMatrix;
                    a.a = 1,
                    a.b = 0,
                    a.c = 0,
                    a.d = 1,
                    a.tx = 0,
                    a.ty = 0
                } else
                    r = new n(e,t),
                    r.$computeDrawCall = !1;
                return r
            }
            ,
            n.release = function(e) {
                i.push(e)
            }
            ,
            n.autoClear = !0,
            n
        }(e.HashObject);
        t.WebGLRenderBuffer = r,
        __reflect(r.prototype, "egret.web.WebGLRenderBuffer", ["egret.sys.RenderBuffer"]);
        var i = []
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(t) {
        var r = ["source-over", "lighter", "destination-out"]
          , i = "source-over"
          , n = []
          , a = function() {
            function a() {
                this.nestLevel = 0
            }
            return a.prototype.render = function(e, t, r, i, a) {
                this.nestLevel++;
                var o = t
                  , s = o.context
                  , l = a ? e : null;
                s.pushBuffer(o),
                this.drawDisplayObject(e, o, i, r, null, null, l),
                s.$drawWebGL();
                var h = o.$drawCalls;
                if (o.onRenderFinish(),
                s.popBuffer(),
                this.nestLevel--,
                0 === this.nestLevel) {
                    n.length > 6 && (n.length = 6);
                    for (var c = n.length, u = 0; c > u; u++)
                        n[u].resize(0, 0)
                }
                return h
            }
            ,
            a.prototype.drawDisplayObject = function(t, r, i, n, a, o, s) {
                var l, h = 0;
                if (a && !s ? (a.isDirty && (h += a.drawToSurface()),
                l = a.$renderNode) : l = t.$getRenderNode(),
                l) {
                    if (i) {
                        var c = l.renderRegion;
                        if (o && !o.intersects(c))
                            l.needRedraw = !1;
                        else if (!l.needRedraw)
                            for (var u = i.length, d = 0; u > d; d++)
                                if (c.intersects(i[d])) {
                                    l.needRedraw = !0;
                                    break
                                }
                    } else
                        l.needRedraw = !0;
                    if (l.needRedraw) {
                        h++;
                        var p = void 0
                          , f = void 0;
                        s ? (p = t.$getConcatenatedAlphaAt(s, t.$getConcatenatedAlpha()),
                        f = e.Matrix.create().copyFrom(t.$getConcatenatedMatrix()),
                        t.$getConcatenatedMatrixAt(s, f)) : (p = l.renderAlpha,
                        f = e.Matrix.create().copyFrom(l.renderMatrix)),
                        n.$preMultiplyInto(f, f),
                        r.setTransform(f.a, f.b, f.c, f.d, f.tx, f.ty),
                        e.Matrix.release(f),
                        r.globalAlpha = p,
                        this.renderNode(l, r),
                        l.needRedraw = !1
                    }
                }
                if (a && !s)
                    return h;
                var g = t.$children;
                if (g)
                    for (var v = g.length, m = 0; v > m; m++) {
                        var y = g[m];
                        if (!(!y.$visible || y.$alpha <= 0 || y.$maskedObject)) {
                            var x = y.$getFilters();
                            x && x.length > 0 ? h += this.drawWithFilter(y, r, i, n, o, s) : 0 !== y.$blendMode || y.$mask && (y.$mask.$parentDisplayList || s) ? h += this.drawWithClip(y, r, i, n, o, s) : y.$scrollRect || y.$maskRect ? h += this.drawWithScrollRect(y, r, i, n, o, s) : y.isFPS ? (r.context.$drawWebGL(),
                            r.$computeDrawCall = !1,
                            this.drawDisplayObject(y, r, i, n, y.$displayList, o, s),
                            r.context.$drawWebGL(),
                            r.$computeDrawCall = !0) : h += this.drawDisplayObject(y, r, i, n, y.$displayList, o, s)
                        }
                    }
                return h
            }
            ,
            a.prototype.drawWithFilter = function(t, a, o, s, l, h) {
                var c = 0;
                if (!t.$children || 0 != t.$children.length || t.$renderNode && 0 != t.$renderNode.$getRenderCount()) {
                    var u, d = t.$getFilters(), p = 0 !== t.$blendMode;
                    p && (u = r[t.$blendMode],
                    u || (u = i));
                    var f = t.$getOriginalBounds();
                    if (f.width <= 0 || f.height <= 0)
                        return c;
                    if (!t.mask && 1 == d.length && ("colorTransform" == d[0].type || "custom" === d[0].type && 0 === d[0].padding)) {
                        var g = this.getRenderCount(t);
                        if (!t.$children || 1 == g)
                            return p && a.context.setGlobalCompositeOperation(u),
                            a.context.$filter = d[0],
                            c += t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, a, o, s, l, h) : this.drawDisplayObject(t, a, o, s, t.$displayList, l, h),
                            a.context.$filter = null,
                            p && a.context.setGlobalCompositeOperation(i),
                            c
                    }
                    var v = e.Matrix.create();
                    v.copyFrom(t.$getConcatenatedMatrix()),
                    h && t.$getConcatenatedMatrixAt(h, v);
                    var m;
                    m = e.sys.Region.create(),
                    m.updateRegion(f, v);
                    var y = this.createRenderBuffer(m.width * s.a, m.height * s.d);
                    y.context.pushBuffer(y),
                    y.setTransform(s.a, 0, 0, s.d, -m.minX * s.a, -m.minY * s.d);
                    var x = e.Matrix.create().setTo(s.a, 0, 0, s.d, -m.minX * s.a, -m.minY * s.d);
                    return c += t.$mask && (t.$mask.$parentDisplayList || h) ? this.drawWithClip(t, y, o, x, m, h) : t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, y, o, x, m, h) : this.drawDisplayObject(t, y, o, x, t.$displayList, m, h),
                    e.Matrix.release(x),
                    y.context.popBuffer(),
                    c > 0 && (p && a.context.setGlobalCompositeOperation(u),
                    c++,
                    a.globalAlpha = 1,
                    a.setTransform(1, 0, 0, 1, (m.minX + s.tx) * s.a, (m.minY + s.ty) * s.d),
                    a.context.drawTargetWidthFilters(d, y),
                    p && a.context.setGlobalCompositeOperation(i)),
                    n.push(y),
                    e.sys.Region.release(m),
                    e.Matrix.release(v),
                    c
                }
            }
            ,
            a.prototype.getRenderCount = function(e) {
                var t = 0;
                if (e.$children)
                    for (var r = 0, i = e.$children; r < i.length; r++) {
                        var n = i[r]
                          , a = n.$getRenderNode();
                        a && (t += a.$getRenderCount()),
                        n.$children && (t += this.getRenderCount(n))
                    }
                return t
            }
            ,
            a.prototype.drawWithClip = function(t, a, o, s, l, h) {
                var c, u = 0, d = 0 !== t.$blendMode;
                d && (c = r[t.$blendMode],
                c || (c = i));
                var p = t.$scrollRect ? t.$scrollRect : t.$maskRect
                  , f = t.$mask;
                if (f) {
                    var g = f.$getRenderNode();
                    if (g) {
                        var v = g.renderMatrix;
                        if (0 == v.a && 0 == v.b || 0 == v.c && 0 == v.d)
                            return u
                    }
                }
                var m, y = e.Matrix.create();
                if (y.copyFrom(t.$getConcatenatedMatrix()),
                h)
                    t.$getConcatenatedMatrixAt(h, y);
                else if (t.$parentDisplayList) {
                    var x = t.$parentDisplayList.root;
                    x !== t.$stage && t.$getConcatenatedMatrixAt(x, y)
                }
                var b;
                if (f) {
                    b = f.$getOriginalBounds(),
                    m = e.sys.Region.create();
                    var w = e.Matrix.create();
                    w.copyFrom(f.$getConcatenatedMatrix()),
                    h && f.$getConcatenatedMatrixAt(h, w),
                    m.updateRegion(b, w),
                    e.Matrix.release(w)
                }
                var E;
                if (p && (E = e.sys.Region.create(),
                E.updateRegion(p, y)),
                E && m ? (E.intersect(m),
                e.sys.Region.release(m)) : !E && m && (E = m),
                E) {
                    if (E.isEmpty() || l && !l.intersects(E))
                        return e.sys.Region.release(E),
                        e.Matrix.release(y),
                        u
                } else
                    E = e.sys.Region.create(),
                    b = t.$getOriginalBounds(),
                    E.updateRegion(b, y);
                if (E.width <= 0 || E.height <= 0)
                    return u;
                var T = !1;
                if (o) {
                    for (var _ = o.length, S = 0; _ > S; S++)
                        if (E.intersects(o[S])) {
                            T = !0;
                            break
                        }
                } else
                    T = !0;
                if (!T)
                    return e.sys.Region.release(E),
                    e.Matrix.release(y),
                    u;
                if (f || t.$children && 0 != t.$children.length) {
                    var C = this.createRenderBuffer(E.width * s.a, E.height * s.d);
                    C.context.pushBuffer(C),
                    C.setTransform(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d);
                    var R = e.Matrix.create().setTo(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d);
                    if (u += this.drawDisplayObject(t, C, o, R, t.$displayList, E, h),
                    f) {
                        var L = this.createRenderBuffer(E.width * s.a, E.height * s.d);
                        L.context.pushBuffer(L),
                        L.setTransform(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d),
                        R = e.Matrix.create().setTo(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d),
                        u += this.drawDisplayObject(f, L, o, R, f.$displayList, E, h),
                        L.context.popBuffer(),
                        C.context.setGlobalCompositeOperation("destination-in"),
                        C.setTransform(1, 0, 0, -1, 0, L.height),
                        C.globalAlpha = 1;
                        var A = L.rootRenderTarget.width
                          , D = L.rootRenderTarget.height;
                        C.context.drawTexture(L.rootRenderTarget.texture, 0, 0, A, D, 0, 0, A, D, A, D),
                        C.context.setGlobalCompositeOperation("source-over"),
                        n.push(L)
                    }
                    if (e.Matrix.release(R),
                    C.context.setGlobalCompositeOperation(i),
                    C.context.popBuffer(),
                    u > 0) {
                        if (u++,
                        d && a.context.setGlobalCompositeOperation(c),
                        p) {
                            var w = y;
                            s.$preMultiplyInto(w, w),
                            C.setTransform(w.a, w.b, w.c, w.d, w.tx, w.ty),
                            C.context.pushMask(p)
                        }
                        a.globalAlpha = 1,
                        a.setTransform(1, 0, 0, -1, (E.minX + s.tx) * s.a, (E.minY + s.ty) * s.d + C.height);
                        var O = C.rootRenderTarget.width
                          , I = C.rootRenderTarget.height;
                        a.context.drawTexture(C.rootRenderTarget.texture, 0, 0, O, I, 0, 0, O, I, O, I),
                        p && C.context.popMask(),
                        d && a.context.setGlobalCompositeOperation(i)
                    }
                    return n.push(C),
                    e.sys.Region.release(E),
                    e.Matrix.release(y),
                    u
                }
                if (p) {
                    var w = y;
                    a.setTransform(w.a, w.b, w.c, w.d, w.tx, w.ty),
                    a.context.pushMask(p)
                }
                return d && a.context.setGlobalCompositeOperation(c),
                u += this.drawDisplayObject(t, a, o, s, t.$displayList, l, h),
                d && a.context.setGlobalCompositeOperation(i),
                p && a.context.popMask(),
                e.sys.Region.release(E),
                e.Matrix.release(y),
                u
            }
            ,
            a.prototype.drawWithScrollRect = function(t, r, i, n, a, o) {
                var s = 0
                  , l = t.$scrollRect ? t.$scrollRect : t.$maskRect;
                if (l.isEmpty())
                    return s;
                var h = e.Matrix.create();
                if (h.copyFrom(t.$getConcatenatedMatrix()),
                o)
                    t.$getConcatenatedMatrixAt(o, h);
                else if (t.$parentDisplayList) {
                    var c = t.$parentDisplayList.root;
                    c !== t.$stage && t.$getConcatenatedMatrixAt(c, h)
                }
                var u = e.sys.Region.create();
                if (u.updateRegion(l, h),
                u.isEmpty() || a && !a.intersects(u))
                    return e.sys.Region.release(u),
                    e.Matrix.release(h),
                    s;
                var d = !1;
                if (i) {
                    for (var p = i.length, f = 0; p > f; f++)
                        if (u.intersects(i[f])) {
                            d = !0;
                            break
                        }
                } else
                    d = !0;
                if (!d)
                    return e.sys.Region.release(u),
                    e.Matrix.release(h),
                    s;
                n.$preMultiplyInto(h, h),
                r.setTransform(h.a, h.b, h.c, h.d, h.tx, h.ty);
                var g = r.context
                  , v = !1;
                if (r.$hasScissor || 0 != h.b || 0 != h.c)
                    g.pushMask(l);
                else {
                    var m = h.a
                      , y = h.d
                      , x = h.tx
                      , b = h.ty
                      , w = l.x
                      , E = l.y
                      , T = w + l.width
                      , _ = E + l.height
                      , S = void 0
                      , C = void 0
                      , R = void 0
                      , L = void 0;
                    if (1 == m && 1 == y)
                        S = w + x,
                        C = E + b,
                        R = T + x,
                        L = _ + b;
                    else {
                        var A = m * w + x
                          , D = y * E + b
                          , O = m * T + x
                          , I = y * E + b
                          , M = m * T + x
                          , B = y * _ + b
                          , $ = m * w + x
                          , P = y * _ + b
                          , F = 0;
                        A > O && (F = A,
                        A = O,
                        O = F),
                        M > $ && (F = M,
                        M = $,
                        $ = F),
                        S = M > A ? A : M,
                        R = O > $ ? O : $,
                        D > I && (F = D,
                        D = I,
                        I = F),
                        B > P && (F = B,
                        B = P,
                        P = F),
                        C = B > D ? D : B,
                        L = I > P ? I : P
                    }
                    g.enableScissor(S, -L + r.height, R - S, L - C),
                    v = !0
                }
                return s += this.drawDisplayObject(t, r, i, n, t.$displayList, u, o),
                r.setTransform(h.a, h.b, h.c, h.d, h.tx + n.tx, h.ty + n.ty),
                v ? g.disableScissor() : g.popMask(),
                e.sys.Region.release(u),
                e.Matrix.release(h),
                s
            }
            ,
            a.prototype.drawNodeToBuffer = function(e, t, r, i) {
                var n = t;
                n.context.pushBuffer(n),
                n.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty),
                this.renderNode(e, t, i),
                n.context.$drawWebGL(),
                n.onRenderFinish(),
                n.context.popBuffer()
            }
            ,
            a.prototype.renderNode = function(e, t, r) {
                switch (e.type) {
                case 1:
                    this.renderBitmap(e, t);
                    break;
                case 2:
                    this.renderText(e, t);
                    break;
                case 3:
                    this.renderGraphics(e, t, r);
                    break;
                case 4:
                    this.renderGroup(e, t);
                    break;
                case 6:
                    t.globalAlpha = e.drawData[0];
                    break;
                case 7:
                    this.renderMesh(e, t)
                }
            }
            ,
            a.prototype.renderBitmap = function(e, t) {
                var n = e.image;
                if (n) {
                    var a = e.drawData
                      , o = a.length
                      , s = 0
                      , l = e.matrix
                      , h = e.blendMode
                      , c = e.alpha;
                    l && (t.saveTransform(),
                    t.transform(l.a, l.b, l.c, l.d, l.tx, l.ty)),
                    h && t.context.setGlobalCompositeOperation(r[h]);
                    var u;
                    if (c == c && (u = t.globalAlpha,
                    t.globalAlpha *= c),
                    e.filter) {
                        for (t.context.$filter = e.filter; o > s; )
                            t.context.drawImage(n, a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], e.imageWidth, e.imageHeight, e.rotated, e.smoothing);
                        t.context.$filter = null
                    } else
                        for (; o > s; )
                            t.context.drawImage(n, a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], e.imageWidth, e.imageHeight, e.rotated, e.smoothing);
                    h && t.context.setGlobalCompositeOperation(i),
                    c == c && (t.globalAlpha = u),
                    l && t.restoreTransform()
                }
            }
            ,
            a.prototype.renderMesh = function(e, t) {
                var n = e.image
                  , a = e.drawData
                  , o = a.length
                  , s = 0
                  , l = e.matrix
                  , h = e.blendMode
                  , c = e.alpha;
                l && (t.saveTransform(),
                t.transform(l.a, l.b, l.c, l.d, l.tx, l.ty)),
                h && t.context.setGlobalCompositeOperation(r[h]);
                var u;
                if (c == c && (u = t.globalAlpha,
                t.globalAlpha *= c),
                e.filter) {
                    for (t.context.$filter = e.filter; o > s; )
                        t.context.drawMesh(n, a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds, e.smoothing);
                    t.context.$filter = null
                } else
                    for (; o > s; )
                        t.context.drawMesh(n, a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], a[s++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds, e.smoothing);
                h && t.context.setGlobalCompositeOperation(i),
                c == c && (t.globalAlpha = u),
                l && t.restoreTransform()
            }
            ,
            a.prototype.renderText = function(r, i) {
                var n = r.width - r.x
                  , a = r.height - r.y
                  , o = e.sys.DisplayList.$pixelRatio
                  , s = i.context.$maxTextureSize;
                (n * o > s || a * o > s) && (o *= n * o > a * o ? s / (n * o) : s / (a * o)),
                n *= o,
                a *= o;
                var l = r.x * o
                  , h = r.y * o;
                if (0 != r.drawData.length && (this.canvasRenderBuffer && this.canvasRenderBuffer.context ? r.dirtyRender && this.canvasRenderBuffer.resize(n, a) : (this.canvasRenderer = new e.CanvasRenderer,
                this.canvasRenderBuffer = new t.CanvasRenderBuffer(n,a),
                1 != o && this.canvasRenderBuffer.context.setTransform(o, 0, 0, o, 0, 0)),
                this.canvasRenderBuffer.context)) {
                    if ((l || h) && (r.dirtyRender && this.canvasRenderBuffer.context.setTransform(o, 0, 0, o, -l, -h),
                    i.transform(1, 0, 0, 1, l / o, h / o)),
                    r.dirtyRender) {
                        var c = this.canvasRenderBuffer.surface;
                        this.canvasRenderer.renderText(r, this.canvasRenderBuffer.context);
                        var u = r.$texture;
                        u ? i.context.updateTexture(u, c) : (u = i.context.createTexture(c),
                        r.$texture = u),
                        r.$textureWidth = c.width,
                        r.$textureHeight = c.height
                    }
                    var d = r.$textureWidth
                      , p = r.$textureHeight;
                    i.context.drawTexture(r.$texture, 0, 0, d, p, 0, 0, d / o, p / o, d, p),
                    (l || h) && (r.dirtyRender && this.canvasRenderBuffer.context.setTransform(o, 0, 0, o, 0, 0),
                    i.transform(1, 0, 0, 1, -l / o, -h / o)),
                    r.dirtyRender = !1
                }
            }
            ,
            a.prototype.renderGraphics = function(r, i, n) {
                var a = r.width
                  , o = r.height;
                if (!(0 >= a || 0 >= o) && a && o && 0 != r.drawData.length && (this.canvasRenderBuffer && this.canvasRenderBuffer.context ? (r.dirtyRender || n) && this.canvasRenderBuffer.resize(a, o) : (this.canvasRenderer = new e.CanvasRenderer,
                this.canvasRenderBuffer = new t.CanvasRenderBuffer(a,o)),
                this.canvasRenderBuffer.context)) {
                    (r.x || r.y) && ((r.dirtyRender || n) && this.canvasRenderBuffer.context.translate(-r.x, -r.y),
                    i.transform(1, 0, 0, 1, r.x, r.y));
                    var s = this.canvasRenderBuffer.surface;
                    if (n) {
                        this.canvasRenderer.renderGraphics(r, this.canvasRenderBuffer.context, !0),
                        e.WebGLUtils.deleteWebGLTexture(s);
                        var l = i.context.getWebGLTexture(s);
                        i.context.drawTexture(l, 0, 0, a, o, 0, 0, a, o, s.width, s.height)
                    } else {
                        if (r.dirtyRender) {
                            this.canvasRenderer.renderGraphics(r, this.canvasRenderBuffer.context);
                            var l = r.$texture;
                            l ? i.context.updateTexture(l, s) : (l = i.context.createTexture(s),
                            r.$texture = l),
                            r.$textureWidth = s.width,
                            r.$textureHeight = s.height
                        }
                        var h = r.$textureWidth
                          , c = r.$textureHeight;
                        i.context.drawTexture(r.$texture, 0, 0, h, c, 0, 0, h, c, h, c)
                    }
                    (r.x || r.y) && ((r.dirtyRender || n) && this.canvasRenderBuffer.context.translate(r.x, r.y),
                    i.transform(1, 0, 0, 1, -r.x, -r.y)),
                    n || (r.dirtyRender = !1)
                }
            }
            ,
            a.prototype.renderGroup = function(e, t) {
                var r = e.matrix;
                r && (t.saveTransform(),
                t.transform(r.a, r.b, r.c, r.d, r.tx, r.ty));
                for (var i = e.drawData, n = i.length, a = 0; n > a; a++) {
                    var o = i[a];
                    this.renderNode(o, t)
                }
                r && t.restoreTransform()
            }
            ,
            a.prototype.createRenderBuffer = function(e, r) {
                var i = n.pop();
                return i ? i.resize(e, r) : (i = new t.WebGLRenderBuffer(e,r),
                i.$computeDrawCall = !1),
                i
            }
            ,
            a
        }();
        t.WebGLRenderer = a,
        __reflect(a.prototype, "egret.web.WebGLRenderer", ["egret.sys.SystemRenderer"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        var t;
        !function(e) {
            e[e.FLOAT_VEC2 = 35664] = "FLOAT_VEC2",
            e[e.FLOAT_VEC3 = 35665] = "FLOAT_VEC3",
            e[e.FLOAT_VEC4 = 35666] = "FLOAT_VEC4",
            e[e.FLOAT = 5126] = "FLOAT",
            e[e.BYTE = 65535] = "BYTE",
            e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE",
            e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT"
        }(t = e.WEBGL_ATTRIBUTE_TYPE || (e.WEBGL_ATTRIBUTE_TYPE = {}));
        var r = function() {
            function e(e, t, r) {
                this.gl = e,
                this.name = r.name,
                this.type = r.type,
                this.size = r.size,
                this.location = e.getAttribLocation(t, this.name),
                this.count = 0,
                this.initCount(e),
                this.format = e.FLOAT,
                this.initFormat(e)
            }
            return e.prototype.initCount = function(e) {
                var r = this.type;
                switch (r) {
                case t.FLOAT:
                case t.BYTE:
                case t.UNSIGNED_BYTE:
                case t.UNSIGNED_SHORT:
                    this.count = 1;
                    break;
                case t.FLOAT_VEC2:
                    this.count = 2;
                    break;
                case t.FLOAT_VEC3:
                    this.count = 3;
                    break;
                case t.FLOAT_VEC4:
                    this.count = 4
                }
            }
            ,
            e.prototype.initFormat = function(e) {
                var r = this.type;
                switch (r) {
                case t.FLOAT:
                case t.FLOAT_VEC2:
                case t.FLOAT_VEC3:
                case t.FLOAT_VEC4:
                    this.format = e.FLOAT;
                    break;
                case t.UNSIGNED_BYTE:
                    this.format = e.UNSIGNED_BYTE;
                    break;
                case t.UNSIGNED_SHORT:
                    this.format = e.UNSIGNED_SHORT;
                    break;
                case t.BYTE:
                    this.format = e.BYTE
                }
            }
            ,
            e
        }();
        e.EgretWebGLAttribute = r,
        __reflect(r.prototype, "egret.web.EgretWebGLAttribute")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        function t(e, t, r) {
            var i = e.createShader(t);
            e.shaderSource(i, r),
            e.compileShader(i);
            var n = e.getShaderParameter(i, e.COMPILE_STATUS);
            return n || (console.log("shader not compiled!"),
            console.log(e.getShaderInfoLog(i))),
            i
        }
        function r(e, t, r) {
            var i = e.createProgram();
            return e.attachShader(i, t),
            e.attachShader(i, r),
            e.linkProgram(i),
            i
        }
        function i(t, r) {
            for (var i = {}, n = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES), a = 0; n > a; a++) {
                var o = t.getActiveAttrib(r, a)
                  , s = o.name
                  , l = new e.EgretWebGLAttribute(t,r,o);
                i[s] = l
            }
            return i
        }
        function n(t, r) {
            for (var i = {}, n = t.getProgramParameter(r, t.ACTIVE_UNIFORMS), a = 0; n > a; a++) {
                var o = t.getActiveUniform(r, a)
                  , s = o.name
                  , l = new e.EgretWebGLUniform(t,r,o);
                i[s] = l
            }
            return i
        }
        var a = function() {
            function e(e, a, o) {
                this.vshaderSource = a,
                this.fshaderSource = o,
                this.vertexShader = t(e, e.VERTEX_SHADER, this.vshaderSource),
                this.fragmentShader = t(e, e.FRAGMENT_SHADER, this.fshaderSource),
                this.id = r(e, this.vertexShader, this.fragmentShader),
                this.uniforms = n(e, this.id),
                this.attributes = i(e, this.id)
            }
            return e.getProgram = function(t, r, i, n) {
                return this.programCache[n] || (this.programCache[n] = new e(t,r,i)),
                this.programCache[n]
            }
            ,
            e.deleteProgram = function(e, t, r, i) {}
            ,
            e.programCache = {},
            e
        }();
        e.EgretWebGLProgram = a,
        __reflect(a.prototype, "egret.web.EgretWebGLProgram")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        var t;
        !function(e) {
            e[e.FLOAT_VEC2 = 35664] = "FLOAT_VEC2",
            e[e.FLOAT_VEC3 = 35665] = "FLOAT_VEC3",
            e[e.FLOAT_VEC4 = 35666] = "FLOAT_VEC4",
            e[e.INT_VEC2 = 35667] = "INT_VEC2",
            e[e.INT_VEC3 = 35668] = "INT_VEC3",
            e[e.INT_VEC4 = 35669] = "INT_VEC4",
            e[e.BOOL = 35670] = "BOOL",
            e[e.BOOL_VEC2 = 35671] = "BOOL_VEC2",
            e[e.BOOL_VEC3 = 35672] = "BOOL_VEC3",
            e[e.BOOL_VEC4 = 35673] = "BOOL_VEC4",
            e[e.FLOAT_MAT2 = 35674] = "FLOAT_MAT2",
            e[e.FLOAT_MAT3 = 35675] = "FLOAT_MAT3",
            e[e.FLOAT_MAT4 = 35676] = "FLOAT_MAT4",
            e[e.SAMPLER_2D = 35678] = "SAMPLER_2D",
            e[e.SAMPLER_CUBE = 35680] = "SAMPLER_CUBE",
            e[e.BYTE = 65535] = "BYTE",
            e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE",
            e[e.SHORT = 5122] = "SHORT",
            e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT",
            e[e.INT = 5124] = "INT",
            e[e.UNSIGNED_INT = 5125] = "UNSIGNED_INT",
            e[e.FLOAT = 5126] = "FLOAT"
        }(t = e.WEBGL_UNIFORM_TYPE || (e.WEBGL_UNIFORM_TYPE = {}));
        var r = function() {
            function e(e, t, r) {
                this.gl = e,
                this.name = r.name,
                this.type = r.type,
                this.size = r.size,
                this.location = e.getUniformLocation(t, this.name),
                this.setDefaultValue(),
                this.generateSetValue(),
                this.generateUpload()
            }
            return e.prototype.setDefaultValue = function() {
                var e = this.type;
                switch (e) {
                case t.FLOAT:
                case t.SAMPLER_2D:
                case t.SAMPLER_CUBE:
                case t.BOOL:
                case t.INT:
                    this.value = 0;
                    break;
                case t.FLOAT_VEC2:
                case t.BOOL_VEC2:
                case t.INT_VEC2:
                    this.value = [0, 0];
                    break;
                case t.FLOAT_VEC3:
                case t.BOOL_VEC3:
                case t.INT_VEC3:
                    this.value = [0, 0, 0];
                    break;
                case t.FLOAT_VEC4:
                case t.BOOL_VEC4:
                case t.INT_VEC4:
                    this.value = [0, 0, 0, 0];
                    break;
                case t.FLOAT_MAT2:
                    this.value = new Float32Array([1, 0, 0, 1]);
                    break;
                case t.FLOAT_MAT3:
                    this.value = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                    break;
                case t.FLOAT_MAT4:
                    this.value = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            }
            ,
            e.prototype.generateSetValue = function() {
                var e = this.type;
                switch (e) {
                case t.FLOAT:
                case t.SAMPLER_2D:
                case t.SAMPLER_CUBE:
                case t.BOOL:
                case t.INT:
                    this.setValue = function(e) {
                        var t = this.value !== e;
                        this.value = e,
                        t && this.upload()
                    }
                    ;
                    break;
                case t.FLOAT_VEC2:
                case t.BOOL_VEC2:
                case t.INT_VEC2:
                    this.setValue = function(e) {
                        var t = this.value[0] !== e.x || this.value[1] !== e.y;
                        this.value[0] = e.x,
                        this.value[1] = e.y,
                        t && this.upload()
                    }
                    ;
                    break;
                case t.FLOAT_VEC3:
                case t.BOOL_VEC3:
                case t.INT_VEC3:
                    this.setValue = function(e) {
                        this.value[0] = e.x,
                        this.value[1] = e.y,
                        this.value[2] = e.z,
                        this.upload()
                    }
                    ;
                    break;
                case t.FLOAT_VEC4:
                case t.BOOL_VEC4:
                case t.INT_VEC4:
                    this.setValue = function(e) {
                        this.value[0] = e.x,
                        this.value[1] = e.y,
                        this.value[2] = e.z,
                        this.value[3] = e.w,
                        this.upload()
                    }
                    ;
                    break;
                case t.FLOAT_MAT2:
                case t.FLOAT_MAT3:
                case t.FLOAT_MAT4:
                    this.setValue = function(e) {
                        this.value.set(e),
                        this.upload()
                    }
                }
            }
            ,
            e.prototype.generateUpload = function() {
                var e = this.gl
                  , r = this.type
                  , i = this.location;
                switch (r) {
                case t.FLOAT:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform1f(i, t)
                    }
                    ;
                    break;
                case t.FLOAT_VEC2:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform2f(i, t[0], t[1])
                    }
                    ;
                    break;
                case t.FLOAT_VEC3:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform3f(i, t[0], t[1], t[2])
                    }
                    ;
                    break;
                case t.FLOAT_VEC4:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform4f(i, t[0], t[1], t[2], t[3])
                    }
                    ;
                    break;
                case t.SAMPLER_2D:
                case t.SAMPLER_CUBE:
                case t.BOOL:
                case t.INT:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform1i(i, t)
                    }
                    ;
                    break;
                case t.BOOL_VEC2:
                case t.INT_VEC2:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform2i(i, t[0], t[1])
                    }
                    ;
                    break;
                case t.BOOL_VEC3:
                case t.INT_VEC3:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform3i(i, t[0], t[1], t[2])
                    }
                    ;
                    break;
                case t.BOOL_VEC4:
                case t.INT_VEC4:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform4i(i, t[0], t[1], t[2], t[3])
                    }
                    ;
                    break;
                case t.FLOAT_MAT2:
                    this.upload = function() {
                        var t = this.value;
                        e.uniformMatrix2fv(i, !1, t)
                    }
                    ;
                    break;
                case t.FLOAT_MAT3:
                    this.upload = function() {
                        var t = this.value;
                        e.uniformMatrix3fv(i, !1, t)
                    }
                    ;
                    break;
                case t.FLOAT_MAT4:
                    this.upload = function() {
                        var t = this.value;
                        e.uniformMatrix4fv(i, !1, t)
                    }
                }
            }
            ,
            e
        }();
        e.EgretWebGLUniform = r,
        __reflect(r.prototype, "egret.web.EgretWebGLUniform")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function(e) {
    var t;
    !function(e) {
        var t = function() {
            function e() {}
            return e.blur_frag = "precision mediump float;\nuniform vec2 blur;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\nuniform vec2 uTextureSize;\nvoid main()\n{\n    const int sampleRadius = 5;\n    const int samples = sampleRadius * 2 + 1;\n    vec2 blurUv = blur / uTextureSize;\n    vec4 color = vec4(0, 0, 0, 0);\n    vec2 uv = vec2(0.0, 0.0);\n    blurUv /= float(sampleRadius);\n    for (int i = -sampleRadius; i <= sampleRadius; i++) {\n        uv.x = vTextureCoord.x + float(i) * blurUv.x;\n        uv.y = vTextureCoord.y + float(i) * blurUv.y;\n        color += texture2D(uSampler, uv);\n    }\n    color /= float(samples);\n    gl_FragColor = color;\n}",
            e.colorTransform_frag = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\n    vec4 texColor = texture2D(uSampler, vTextureCoord);\n    if(texColor.a > 0.) {\n        texColor = vec4(texColor.rgb / texColor.a, texColor.a);\n    }\n    vec4 locColor = clamp(texColor * matrix + colorAdd, 0., 1.);\n    gl_FragColor = vColor * vec4(locColor.rgb * locColor.a, locColor.a);\n}",
            e.default_vert = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}",
            e.glow_frag = "precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float dist;\nuniform float angle;\nuniform vec4 color;\nuniform float alpha;\nuniform float blurX;\nuniform float blurY;\nuniform float strength;\nuniform float inner;\nuniform float knockout;\nuniform float hideObject;\nuniform vec2 uTextureSize;\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\nvoid main(void) {\n    vec2 px = vec2(1.0 / uTextureSize.x, 1.0 / uTextureSize.y);\n    const float linearSamplingTimes = 7.0;\n    const float circleSamplingTimes = 12.0;\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float totalAlpha = 0.0;\n    float maxTotalAlpha = 0.0;\n    float curDistanceX = 0.0;\n    float curDistanceY = 0.0;\n    float offsetX = dist * cos(angle) * px.x;\n    float offsetY = dist * sin(angle) * px.y;\n    const float PI = 3.14159265358979323846264;\n    float cosAngle;\n    float sinAngle;\n    float offset = PI * 2.0 / circleSamplingTimes * random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    float stepX = blurX * px.x / linearSamplingTimes;\n    float stepY = blurY * px.y / linearSamplingTimes;\n    for (float a = 0.0; a <= PI * 2.0; a += PI * 2.0 / circleSamplingTimes) {\n        cosAngle = cos(a + offset);\n        sinAngle = sin(a + offset);\n        for (float i = 1.0; i <= linearSamplingTimes; i++) {\n            curDistanceX = i * stepX * cosAngle;\n            curDistanceY = i * stepY * sinAngle;\n            \n            curColor = texture2D(uSampler, vec2(vTextureCoord.x + curDistanceX - offsetX, vTextureCoord.y + curDistanceY + offsetY));\n            totalAlpha += (linearSamplingTimes - i) * curColor.a;\n            maxTotalAlpha += (linearSamplingTimes - i);\n        }\n    }\n    ownColor.a = max(ownColor.a, 0.0001);\n    ownColor.rgb = ownColor.rgb / ownColor.a;\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * max(min(hideObject, knockout), 1. - ownColor.a);\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * ownColor.a;\n    ownColor.a = max(ownColor.a * knockout * (1. - hideObject), 0.0001);\n    vec3 mix1 = mix(ownColor.rgb, color.rgb, innerGlowAlpha / (innerGlowAlpha + ownColor.a));\n    vec3 mix2 = mix(mix1, color.rgb, outerGlowAlpha / (innerGlowAlpha + ownColor.a + outerGlowAlpha));\n    float resultAlpha = min(ownColor.a + outerGlowAlpha + innerGlowAlpha, 1.);\n    gl_FragColor = vec4(mix2 * resultAlpha, resultAlpha);\n}",
            e.primitive_frag = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvoid main(void) {\n    gl_FragColor = vColor;\n}",
            e.texture_frag = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n}",
            e
        }();
        e.EgretShaderLib = t,
        __reflect(t.prototype, "egret.web.EgretShaderLib")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));


module.exports = egret;