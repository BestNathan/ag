var __reflect =
        (this && this.__reflect) ||
        function(t, e, i) {
            (t.__class__ = e),
                i ? i.push(e) : (i = [e]),
                (t.__types__ = t.__types__ ? i.concat(t.__types__) : i);
        },
    __extends =
        (this && this.__extends) ||
        (function() {
            var r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(t, e) {
                        t.__proto__ = e;
                    }) ||
                function(t, e) {
                    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                };
            return function(t, e) {
                function i() {
                    this.constructor = t;
                }
                r(t, e),
                    (t.prototype =
                        null === e
                            ? Object.create(e)
                            : ((i.prototype = e.prototype), new i()));
            };
        })(),
    Core;
!(function(i) {
    var t = (function(t) {
        function e() {
            return t.call(this) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.release = function() {
                this.dispatchEventWith(i.EVENT_RELEASE),
                    i.removeAllEventListener(this);
            }),
            (e.getInstance = function(t) {
                return (
                    t._instance ||
                        console.warn(
                            egret.getQualifiedClassName(t) + ' need init first'
                        ),
                    t._instance
                );
            }),
            (e.initInstance = function(t) {
                return (
                    t._instance
                        ? console.warn(
                              egret.getQualifiedClassName(t) + ' already init'
                          )
                        : (t._instance = new t()),
                    t._instance
                );
            }),
            (e.releaseInstance = function() {
                this._instance &&
                    (this._instance.release(), (this._instance = null));
            }),
            e
        );
    })(egret.EventDispatcher);
    (i.SingletonDispatcher = t),
        __reflect(t.prototype, 'Core.SingletonDispatcher');
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t._actionListenerId = 0),
                (t._actionListenerMap = new i.HashMap()),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.dispatchAction = function(e, t) {
                if (e) {
                    var i = { type: e, data: t };
                    this.dispatchEventWith(egret.Event.CHANGE, !1, i),
                        this._actionListenerMap.forEach(function(t) {
                            t.actionType === e && t.callback.call(t.thisArg, i);
                        });
                } else this.dispatchEventWith(egret.Event.CHANGE);
            }),
            (t.prototype.addActionListener = function(t, e, i) {
                return (
                    this._actionListenerId++,
                    this._actionListenerMap.set(this._actionListenerId, {
                        actionType: t,
                        callback: e,
                        thisArg: i
                    }),
                    this._actionListenerId
                );
            }),
            (t.prototype.removeActionListener = function(t) {
                this._actionListenerMap['delete'](t);
            }),
            (t.prototype.onceAction = function(t, e, i) {
                var r = this;
                this._actionListenerId++;
                var s = this._actionListenerId,
                    n = function(t) {
                        e.call(i, t), r.removeActionListener(s);
                    };
                return (
                    this._actionListenerMap.set(this._actionListenerId, {
                        actionType: t,
                        callback: n,
                        thisArg: i
                    }),
                    this._actionListenerId
                );
            }),
            t
        );
    })(i.SingletonDispatcher);
    (i.StoreBase = t), __reflect(t.prototype, 'Core.StoreBase');
})(Core || (Core = {}));
var Core;
!(function(e) {
    var t = (function(i) {
        function t() {
            var t = i.call(this) || this;
            return (
                (t.socketListMap = new e.HashMap()),
                t.getSocketList() && (t.socketList = t.getSocketList()),
                t
            );
        }
        return (
            __extends(t, i),
            Object.defineProperty(t.prototype, 'socketList', {
                get: function() {
                    return this.socketListMap.get('default');
                },
                set: function(t) {
                    this.attachSocketList('default', t);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.getSocketList = function() {
                return null;
            }),
            (t.prototype.onConnected = function(t) {
                this.onSocketConnected(t.currentTarget);
            }),
            (t.prototype.onData = function(t) {
                var e = t.data;
                this.onSocketData(e, t.currentTarget);
            }),
            (t.prototype.onConnDie = function(t) {
                this.onSocketDie(t.currentTarget);
            }),
            (t.prototype.onSocketConnected = function(t) {}),
            (t.prototype.onSocketData = function(t, e) {}),
            (t.prototype.onSocketDie = function(t) {}),
            (t.prototype.release = function() {
                var e = this;
                i.prototype.release.call(this),
                    this.socketListMap.keys.forEach(function(t) {
                        e.removeSocketList(t);
                    }, this);
            }),
            (t.prototype.attachSocketList = function(t, e) {
                e.forEach(this.setupSocket, this), this.socketListMap.set(t, e);
            }),
            (t.prototype.setupSocket = function(t) {
                t.addEventListener(egret.Event.CONNECT, this.onConnected, this),
                    t.addEventListener(
                        e.Network.EVENT_RECEIVE_PACKET,
                        this.onData,
                        this
                    ),
                    t.addEventListener(
                        e.Network.EVENT_CONN_DIE,
                        this.onConnDie,
                        this
                    );
            }),
            (t.prototype.removeSocketList = function(t) {
                var e = this.socketListMap.get(t);
                e && e.forEach(this.removeSocket, this),
                    this.socketListMap['delete'](t);
            }),
            (t.prototype.removeSocket = function(t) {
                t.removeEventListener(
                    egret.Event.CONNECT,
                    this.onConnected,
                    this
                ),
                    t.removeEventListener(
                        e.Network.EVENT_RECEIVE_PACKET,
                        this.onData,
                        this
                    ),
                    t.removeEventListener(
                        e.Network.EVENT_CONN_DIE,
                        this.onConnDie,
                        this
                    );
            }),
            t
        );
    })(e.StoreBase);
    (e.NetworkStoreBase = t), __reflect(t.prototype, 'Core.NetworkStoreBase');
})(Core || (Core = {}));
var Core;
!(function(s) {
    var t = (function(r) {
        function t() {
            var t = r.call(this) || this;
            return (
                (t.createCompleted = !1),
                t.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    t.onAddToStage,
                    t
                ),
                t.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    t.onRemoveFromStage,
                    t
                ),
                t.once(eui.UIEvent.CREATION_COMPLETE, t.onCreateComplete, t),
                t
            );
        }
        return (
            __extends(t, r),
            (t.prototype.onCreateComplete = function() {
                (this.createCompleted = !0), this.notifyChildrenInited();
            }),
            (t.prototype.onAddToStage = function() {
                var e = this;
                this.onStoreChange(null, s.t);
                var t = this.getStoreList();
                t.forEach(function(t) {
                    t.addEventListener(
                        egret.Event.CHANGE,
                        e.onStoreListChange,
                        e
                    );
                }, this),
                    this.notifyChildrenInited();
            }),
            (t.prototype.notifyChildrenInited = function() {
                !this.createCompleted || !this.stage;
            }),
            (t.prototype.onRemoveFromStage = function() {
                var e = this,
                    t = this.getStoreList();
                t.forEach(function(t) {
                    t.removeEventListener(
                        egret.Event.CHANGE,
                        e.onStoreListChange,
                        e
                    );
                }, this);
            }),
            (t.prototype.onStoreListChange = function(t) {
                if (t.data) {
                    var e = t.data;
                    this.onStoreChange(t.currentTarget, e.type, e.data);
                } else this.onStoreChange(t.currentTarget, null, null);
            }),
            (t.prototype.removeChild = function(t, e) {
                void 0 === e && (e = !0);
                var i = r.prototype.removeChild.call(this, t);
                return e && s.releaseAllChildren(t), i;
            }),
            t
        );
    })(eui.Component);
    (s.StoreView = t), __reflect(t.prototype, 'Core.StoreView');
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.skinName = t.defaultSkinName),
                (t.forceScrollbarVisible = null),
                t.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    t.onAddToStage,
                    t
                ),
                t.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    t.onRemoveFromStage,
                    t
                ),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.onAddToStage = function() {
                i.ExternalData.isPcVersion &&
                    ((this.verticalScrollBar.autoVisibility = !1),
                    this.onViewportResize(),
                    this.viewport.addEventListener(
                        egret.Event.RESIZE,
                        this.onViewportResize,
                        this
                    ),
                    i.ScrollerHelper.instance.registerWheelControl(this));
            }),
            Object.defineProperty(t.prototype, 'scrollBarVisible', {
                set: function(t) {
                    (this.forceScrollbarVisible = t),
                        i.ExternalData.isPcVersion && this.onViewportResize();
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.onViewportResize = function() {
                var t = this;
                egret.callLater(function() {
                    t.onViewportResizeUpdate();
                }, this);
            }),
            (t.prototype.onViewportResizeUpdate = function() {
                null !== this.forceScrollbarVisible
                    ? (this.verticalScrollBar.visible = this.forceScrollbarVisible)
                    : this.viewport.height < this.viewport.contentHeight
                        ? (this.verticalScrollBar.visible = !0)
                        : (this.verticalScrollBar.visible = !1);
            }),
            (t.prototype.onRemoveFromStage = function() {
                i.ExternalData.isPcVersion &&
                    (i.ScrollerHelper.instance.unregisterWheelControl(this),
                    this.viewport &&
                        this.viewport.removeEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        ));
            }),
            (t.prototype.onReleaseRefs = function() {
                i.ExternalData.isPcVersion &&
                    (i.ScrollerHelper.instance.unregisterWheelControl(this),
                    this.viewport &&
                        this.viewport.removeEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        ));
            }),
            t
        );
    })(eui.Scroller);
    (i.ScrollerBase = t), __reflect(t.prototype, 'Core.ScrollerBase');
})(Core || (Core = {}));
var Core;
!(function(s) {
    var t;
    !(function(r) {
        function t(t, e) {
            if (t && t.length >= e + 4) {
                var i = new egret.ByteArray(t.buffer.slice(e, e + 4));
                return i.readInt();
            }
            return null;
        }
        (r.EVENT_RECEIVE_PACKET = 'EVENT_RECEIVE_PACKET'),
            (r.EVENT_CONN_DIE = 'EVENT_CONN_DIE');
        var e = (function(e) {
            function t() {
                var t = e.call(this) || this;
                return (
                    (t.urlIndex = 0),
                    (t.isServerDead = !1),
                    (t.moduleRespMap = new s.HashMap()),
                    t
                );
            }
            return (
                __extends(t, e),
                Object.defineProperty(t.prototype, 'connected', {
                    get: function() {
                        return this.firstUnit && this.firstUnit.connected;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'connecting', {
                    get: function() {
                        return this.firstUnit && this.firstUnit.connecting;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'isSocketDie', {
                    get: function() {
                        return this.isServerDead;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.autoConnect = function() {
                    try {
                        if (this.urlList.length <= 0)
                            return void console.error(
                                'Check your host_config!'
                            );
                    } catch (t) {
                        return void console.error(
                            'Exception: Check your host_config!'
                        );
                    }
                    if (
                        ((this.hasValidPacket = !1),
                        (this.selectRetryCount = 0),
                        (this.singleRetryCount = 0),
                        (this.totalRetryCount = 0),
                        s.ntimer.hasInterval(this.reconnInt) ||
                            (this.reconnInt = s.ntimer.setInterval(
                                this.tryReconn,
                                this,
                                this.AUTO_PERIOD
                            )),
                        this.sortedUrlList)
                    ) {
                        if (!this.firstUnit)
                            return void console.warn(
                                'Please wait for the first response!'
                            );
                        this.firstUnit.connectByUrl(
                            this.sortedUrlList[this.urlIndex]
                        );
                    } else if (
                        ((this.sortedUrlList = r.SortedLineCache.getSortedLines(
                            this.getPort()
                        )),
                        this.sortedUrlList.length <= 0)
                    )
                        this.startSelectLine();
                    else {
                        var t = this.sortedUrlList[0];
                        (this.firstUnit = this.getUnitByUrl(t)),
                            this.setupFirstUnit(),
                            this.firstUnit.connectByUrl(t);
                    }
                }),
                (t.prototype.killSocket = function(t) {
                    var e = this;
                    this.endSelectLine(),
                        s.ntimer.clearInterval(this.reconnInt),
                        (this.hasValidPacket = !1),
                        (this.selectRetryCount = 0),
                        (this.singleRetryCount = 0),
                        (this.totalRetryCount = 0),
                        t
                            ? s.ntimer.setTimeout(
                                  function() {
                                      s.ntimer.hasInterval(e.reconnInt) ||
                                          e.close();
                                  },
                                  this,
                                  t
                              )
                            : this.close();
                }),
                (t.prototype.close = function() {
                    this.connected || this.connecting
                        ? this.firstUnit.close()
                        : console.warn('Socket already close before!');
                }),
                (t.prototype.writeBytes = function(t, e, i) {
                    this.connected
                        ? this.firstUnit.writeBytes(t, e, i)
                        : console.warn(
                              'Please check socket status before write!'
                          );
                }),
                (t.prototype.getUnitByUrl = function(t) {
                    return new r.DCSocketUnit(t, this.tag, this.respMap);
                }),
                Object.defineProperty(t.prototype, 'MAX_SELECT_RETRY_COUNT', {
                    get: function() {
                        return 5;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'MAX_SINGLE_RETRY_COUNT', {
                    get: function() {
                        return 1;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'MAX_TOTAL_RETRY_COUNT', {
                    get: function() {
                        return 5;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.getPort = function() {
                    return this.urlList[0].split(':')[2];
                }),
                (t.prototype.startSelectLine = function() {
                    var i = this;
                    this.endSelectLine(),
                        dclib(this.tag + ' start select line!'),
                        (this.sortedUrlList = []),
                        (this.unitMap = new s.HashMap()),
                        this.urlList.forEach(function(t) {
                            var e = i.getUnitByUrl(t);
                            i.unitMap.set(t, e),
                                e.once(
                                    egret.Event.CONNECT,
                                    i.onUnitConnected,
                                    i
                                ),
                                e.once(
                                    egret.IOErrorEvent.IO_ERROR,
                                    i.onUnitError,
                                    i
                                ),
                                e.once(
                                    r.EVENT_RECEIVE_PACKET,
                                    i.onUnitPacket,
                                    i
                                ),
                                e.connectByUrl(t);
                        }, this);
                }),
                (t.prototype.endSelectLine = function() {
                    this.unitMap &&
                        this.unitMap.forEach(function(t) {
                            t.close();
                        }, this);
                }),
                (t.prototype.tryReconn = function() {
                    if (!this.firstUnit)
                        return void (this.selectRetryCount >
                        this.MAX_SELECT_RETRY_COUNT
                            ? this.onServerDie()
                            : (this.startSelectLine(),
                              this.selectRetryCount++));
                    if (!this.firstUnit.connected) {
                        if (this.totalRetryCount > this.MAX_TOTAL_RETRY_COUNT)
                            return void this.onServerDie();
                        this.firstUnit.close(),
                            (!this.hasValidPacket ||
                                this.singleRetryCount >=
                                    this.MAX_SINGLE_RETRY_COUNT) &&
                                ((this.urlIndex =
                                    (this.urlIndex + 1) %
                                    this.sortedUrlList.length),
                                (this.hasValidPacket = !1),
                                (this.singleRetryCount = 0)),
                            this.firstUnit.connectByUrl(
                                this.sortedUrlList[this.urlIndex]
                            ),
                            this.singleRetryCount++,
                            this.totalRetryCount++;
                    }
                }),
                (t.prototype.onServerDie = function() {
                    this.killSocket(),
                        (this.isServerDead = !0),
                        this.dispatchEventWith(r.EVENT_CONN_DIE);
                }),
                Object.defineProperty(t.prototype, 'AUTO_PERIOD', {
                    get: function() {
                        return 1e4;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.onConnected = function(t) {
                    this.dispatchEventWith(egret.Event.CONNECT);
                }),
                (t.prototype.onClosed = function() {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }),
                (t.prototype.onIOError = function() {
                    this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }),
                (t.prototype.onReceivePacket = function(t) {
                    this.dispatchEventWith(r.EVENT_RECEIVE_PACKET, !1, t.data),
                        (this.hasValidPacket = !0);
                }),
                (t.prototype.onUnitConnected = function(t) {
                    t.currentTarget.writeBytes(
                        s.APIManager.getCMDUCGateAlive()
                    );
                }),
                (t.prototype.onUnitError = function(t) {
                    t.currentTarget.close();
                }),
                (t.prototype.onUnitPacket = function(t) {
                    var e = t.currentTarget;
                    this.sortedUrlList.length <= 0
                        ? ((this.firstUnit = e),
                          this.setupFirstUnit(),
                          this.onConnected(t))
                        : e.close(),
                        this.unitMap['delete'](e.url),
                        this.sortedUrlList.push(e.url),
                        r.SortedLineCache.setSortedLines(this.getPort(), e.url);
                }),
                (t.prototype.setupFirstUnit = function() {
                    var t = this;
                    (this.firstUnit.moduleRespMap = this.moduleRespMap),
                        this.firstUnit.addEventListener(
                            egret.Event.CONNECT,
                            this.onConnected,
                            this
                        ),
                        this.firstUnit.addEventListener(
                            egret.Event.CLOSE,
                            this.onClosed,
                            this
                        ),
                        this.firstUnit.addEventListener(
                            egret.IOErrorEvent.IO_ERROR,
                            this.onIOError,
                            this
                        ),
                        this.firstUnit.addEventListener(
                            r.EVENT_RECEIVE_PACKET,
                            this.onReceivePacket,
                            this
                        ),
                        this.firstUnit.addEventListener(
                            r.EVENT_CONN_SICK,
                            function() {
                                t.dispatchEventWith(r.EVENT_CONN_SICK);
                            },
                            this
                        ),
                        this.firstUnit.addEventListener(
                            r.EVENT_CONN_RECOVER,
                            function() {
                                t.dispatchEventWith(r.EVENT_CONN_RECOVER);
                            },
                            this
                        );
                }),
                (t.prototype.appendRespMap = function(t, e) {
                    this.moduleRespMap.set(t, e);
                }),
                (t.prototype.removeRespMap = function(t) {
                    this.moduleRespMap['delete'](t);
                }),
                t
            );
        })(s.SingletonDispatcher);
        (r.WebSocketBase = e),
            __reflect(e.prototype, 'Core.Network.WebSocketBase'),
            (r.steelInt = t);
    })((t = s.Network || (s.Network = {})));
})(Core || (Core = {}));
var VideoGameCore;
var PCPlaza;
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.localeKey = ''),
                (t.localeFunc = null),
                t.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    t.onAddToStage,
                    t
                ),
                t.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    t.onRemoveFromStage,
                    t
                ),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.onAddToStage = function() {
                this.onLangChange(),
                    (this.actionListenerId = i.LocalizeStore.instance.addActionListener(
                        i.q,
                        this.onLangChange,
                        this
                    ));
            }),
            (t.prototype.onRemoveFromStage = function() {
                i.LocalizeStore.instance.removeActionListener(
                    this.actionListenerId
                );
            }),
            (t.prototype.onLangChange = function() {
                this.localeFunc
                    ? (this.label = this.localeFunc())
                    : this.localeKey &&
                      (this.label = i.LocalizeStore.instance.translate(
                          this.localeKey
                      ));
            }),
            (t.prototype.refresh = function() {
                this.onLangChange();
            }),
            t
        );
    })(eui.Button);
    (i.LocaleButton = t), __reflect(t.prototype, 'Core.LocaleButton');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (t._shadeCount = 0), (t._popupArray = []), t;
        }
        return (
            __extends(t, e),
            Object.defineProperty(t.prototype, 'popupShade', {
                get: function() {
                    return (
                        this._popupShade ||
                            ((this._popupShade = new eui.Rect()),
                            (this._popupShade.percentWidth = 100),
                            (this._popupShade.percentHeight = 100),
                            (this._popupShade.fillAlpha = 0.7)),
                        this._popupShade
                    );
                },
                set: function(t) {
                    this._popupShade = t;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.onRemoveFromStage = function() {
                e.prototype.onRemoveFromStage.call(this),
                    (this._shadeCount = 0);
            }),
            (t.prototype.addPopup = function(t, e, i, r, s) {
                void 0 === e && (e = !1),
                    void 0 === i && (i = 0),
                    void 0 === r && (r = 0),
                    void 0 === s && (s = !0),
                    e
                        ? (this.addChild(this.popupShade),
                          (this._shadeCount = (this._shadeCount << 1) + 1))
                        : (this._shadeCount = (this._shadeCount << 1) + 0),
                    this.addChild(t),
                    this._popupArray.push(t),
                    s && ((t.horizontalCenter = i), (t.verticalCenter = r));
            }),
            (t.prototype.removePopup = function(t, e, i) {
                void 0 === e && (e = !1), void 0 === i && (i = !0);
                var r = !1;
                if (t.parent === this) {
                    this.removeChild(t, i);
                    var s = this._popupArray.indexOf(t);
                    if (s > -1) {
                        var n = this._popupArray.length - s - 1;
                        (r = (this._shadeCount >> n) % 2 == 1),
                            0 == n
                                ? (this._shadeCount = this._shadeCount >> 1)
                                : (this._shadeCount =
                                      ((this._shadeCount >> (n + 1)) << n) +
                                      (this._shadeCount % (2 * n))),
                            this._popupArray.splice(s, 1);
                    }
                }
                if (this._popupShade && this._popupShade.parent === this)
                    if (0 == this._shadeCount || 0 === this._popupArray.length)
                        this.removeChild(this._popupShade);
                    else if (r) {
                        for (
                            var o = this.getChildIndex(this.popupShade),
                                a = this._shadeCount,
                                h = this._popupArray.length - 1;
                            h >= 0;
                            h--
                        ) {
                            if (a % 2 == 1) {
                                o = this.getChildIndex(this._popupArray[h]);
                                break;
                            }
                            a >>= 1;
                        }
                        this.addChildAt(this._popupShade, o);
                    }
            }),
            (t.prototype.hasPopup = function(t) {
                if (t) {
                    for (var e = 0; e < this._popupArray.length; e++) {
                        var i = this._popupArray[e];
                        if (i instanceof t) return !0;
                    }
                    return !1;
                }
                return this._popupArray.length > 0;
            }),
            (t.prototype.clearPopup = function() {
                for (; this._popupArray.length > 0; ) {
                    var t = this._popupArray.pop();
                    this.removePopup(t, !0);
                }
            }),
            t
        );
    })(t.StoreView);
    (t.PageBase = e), __reflect(e.prototype, 'Core.PageBase');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(t) {
    var e = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.onAddToStage = function() {
                t.prototype.onAddToStage.call(this),
                    (this.scrollBarVisible = !1),
                    this.slider.setScroller(this),
                    this.slider.btnUp &&
                        this.slider.btnDown &&
                        (this.slider.btnUp.addEventListener(
                            egret.TouchEvent.TOUCH_TAP,
                            this.onTapUp,
                            this
                        ),
                        this.slider.btnDown.addEventListener(
                            egret.TouchEvent.TOUCH_TAP,
                            this.onTapDown,
                            this
                        ),
                        mouse.setButtonMode(this.slider.btnUp, !0),
                        mouse.setButtonMode(this.slider.btnDown, !0)),
                    this.slider.thumb &&
                        ((this.orgThumbSource = this.slider.thumb.source),
                        this.slider.thumb.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.thumbOver,
                            this
                        ),
                        this.slider.thumb.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.thumbOut,
                            this
                        ),
                        mouse.setButtonMode(this.slider.thumb, !0));
            }),
            (e.prototype.thumbOver = function() {
                this.slider.thumb.source = 'nav_asset_json.scroll_bar_hover';
            }),
            (e.prototype.thumbOut = function() {
                this.slider.thumb.source = this.orgThumbSource;
            }),
            (e.prototype.onTapUp = function() {
                if (this.viewport.scrollV > 0) {
                    var t =
                        this.viewport.scrollV - 80 >= 0
                            ? this.viewport.scrollV - 80
                            : 0;
                    this.setScrollV(t);
                }
            }),
            (e.prototype.onTapDown = function() {
                this.setScrollV(this.viewport.scrollV + 80);
            }),
            (e.prototype.onViewportResizeUpdate = function() {
                t.prototype.onViewportResizeUpdate.call(this),
                    this.viewport &&
                        this.slider &&
                        (this.viewport.height < this.viewport.contentHeight
                            ? ((this.slider.visible = !0),
                              (this.slider.touchEnabled = !0),
                              (this.slider.touchChildren = !0))
                            : ((this.slider.visible = !1),
                              (this.slider.touchEnabled = !1),
                              (this.slider.touchChildren = !1)));
            }),
            (e.prototype.reset = function() {
                this.setScrollV(0);
            }),
            (e.prototype.setScrollV = function(t) {
                var e = this;
                this.stopAnimation(),
                    (this.viewport.scrollV = t),
                    this.onViewportResizeUpdate(),
                    egret.callLater(function() {
                        e.slider && e.slider.setScroller(e);
                    }, this);
            }),
            (e.prototype.onReleaseRefs = function() {
                t.prototype.onReleaseRefs.call(this), (this.slider = null);
            }),
            e
        );
    })(t.ScrollerBase);
    (t.SliderScrollerBase = e),
        __reflect(e.prototype, 'Core.SliderScrollerBase');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function() {
            function t(t, e, i) {
                (this.respId = t),
                    (this.context = i),
                    (e.position = 8),
                    (this.seqNo = e.readInt()),
                    this.$(e);
            }
            return t;
        })();
        (t.ResponseBase = e),
            __reflect(e.prototype, 'Core.Network.ResponseBase');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t = (function(r) {
        function t(t) {
            var e = r.call(this) || this;
            return (
                (e.rootId = t),
                (e.domNode = new i.DOMNode(t)),
                e.domNode.mapDisplayObject(e),
                e.addEventListener(egret.Event.ADDED_TO_STAGE, e.addToStage, e),
                e.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    e.removeFromStage,
                    e
                ),
                (e.$renderNode = new egret.sys.RenderNode()),
                e
            );
        }
        return (
            __extends(t, r),
            (t.prototype.setLayerIndex = function(t) {
                this.domNode.setLayerIndex(t);
            }),
            (t.prototype.bind = function(t) {
                this.domNode.bind(t);
            }),
            (t.prototype.unbind = function() {
                this.domNode.unbind();
            }),
            (t.prototype.appendChildElement = function(t) {
                var e = this.domNode.node.parentElement;
                e.appendChild(t);
            }),
            (t.prototype.removeChildElementByClassName = function(t) {
                for (
                    var e = this.domNode.node.parentElement,
                        i = e.getElementsByClassName(t),
                        r = 0;
                    r < i.length;
                    r++
                )
                    e.removeChild(i[r]);
            }),
            (t.prototype.addToStage = function() {
                egret.Capabilities.runtimeType == egret.RuntimeType.WEB &&
                    (this.domNode.show(),
                    this.domNode.updatePosition(),
                    (this.tempStage = this.stage),
                    this.tempStage.addEventListener(
                        egret.Event.RESIZE,
                        this.onResize,
                        this
                    ));
            }),
            (t.prototype.removeFromStage = function() {
                this.tempStage &&
                    (this.tempStage.removeEventListener(
                        egret.Event.RESIZE,
                        this.onResize,
                        this
                    ),
                    this.domNode.hide(),
                    (this.tempStage = null));
            }),
            (t.prototype.onResize = function() {
                this.domNode.updatePosition();
            }),
            (t.prototype.$update = function(t, e) {
                var i = r.prototype.$update.call(this, t, e);
                return this.domNode.updatePosition(), i;
            }),
            t
        );
    })(egret.DisplayObject);
    (i.WebNode = t), __reflect(t.prototype, 'Core.WebNode');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function() {
        function t(t) {
            (this.cached = !1), (this.dataObj = t || {});
        }
        return (
            (t.prototype.set = function(t, e) {
                return 0 === t || t
                    ? ((this.dataObj['' + t] = e), (this.cached = !1), this)
                    : (console.warn('no vaild key for value:', e), this);
            }),
            (t.prototype.get = function(t) {
                return this.dataObj['' + t];
            }),
            (t.prototype.has = function(t) {
                return !!this.dataObj['' + t];
            }),
            (t.prototype['delete'] = function(t) {
                return delete this.dataObj['' + t], (this.cached = !1), this;
            }),
            Object.defineProperty(t.prototype, 'keys', {
                get: function() {
                    return this.cached || this.sortData(), this.cacheKeys;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'values', {
                get: function() {
                    return this.cached || this.sortData(), this.cacheValues;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.forEach = function(e, i) {
                var r = this;
                this.keys.forEach(function(t) {
                    e.call(i, r.dataObj[t], t);
                }, this);
            }),
            (t.prototype.getItemByProperty = function(e, i) {
                var r = [];
                return (
                    this.forEach(function(t) {
                        t[e] === i && r.push(t);
                    }, this),
                    r
                );
            }),
            (t.prototype.copy = function(t) {
                var i = this;
                return (
                    t.forEach(function(t, e) {
                        i.set(e, t);
                    }, this),
                    this
                );
            }),
            (t.prototype.sortData = function() {
                (this.cacheKeys = []), (this.cacheValues = []);
                for (var t in this.dataObj)
                    this.dataObj.hasOwnProperty(t) &&
                        (this.cacheKeys.push(this.restoreNumber(t)),
                        this.cacheValues.push(this.dataObj[t]));
                this.cached = !0;
            }),
            (t.prototype.restoreNumber = function(t) {
                var e = +t;
                return isNaN(e) ? t : e;
            }),
            t
        );
    })();
    (t.HashMap = e), __reflect(e.prototype, 'Core.HashMap');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(i) {
        var t = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.getUnitByUrl = function(t) {
                    return new i.CryptoSocketUnit(
                        t,
                        this.tag,
                        this.respMap,
                        this
                    );
                }),
                e
            );
        })(i.WebSocketBase);
        (i.CryptoWebSocket = t),
            __reflect(t.prototype, 'Core.Network.CryptoWebSocket');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(r) {
            function s(t, e) {
                void 0 === t && (t = ''), void 0 === e && (e = 0);
                var i = r.call(this) || this;
                return (
                    (i._writeMessage = ''),
                    (i._readMessage = ''),
                    (i._isReadySend = !1),
                    (i._bytesWrite = !1),
                    (i._type = s.TYPE_STRING),
                    (i._writeMessage = ''),
                    (i._readMessage = ''),
                    i
                );
            }
            return (
                __extends(s, r),
                (s.prototype.connectByUrl = function(e) {
                    var i = this;
                    if (
                        !this.socket ||
                        this.socket.url != e ||
                        0 != this.socket.readyState
                    ) {
                        this.socket &&
                            this.socket.readyState < 2 &&
                            (this._unbindEvent(), this.socket.close());
                        try {
                            (this.socket = new window.WebSocket(e)),
                                (this.socket.binaryType = 'arraybuffer'),
                                this._bindEvent();
                        } catch (t) {
                            console.error('ws error:', t),
                                setTimeout(function() {
                                    i.connectByUrl(e);
                                }, 100);
                        }
                    }
                }),
                (s.prototype.close = function() {
                    this.socket.close();
                }),
                (s.prototype.onConnect = function() {
                    this.dispatchEventWith(egret.Event.CONNECT);
                }),
                (s.prototype.onClose = function() {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }),
                (s.prototype.onError = function() {
                    this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }),
                (s.prototype.onSocketData = function(t) {
                    'string' == typeof t
                        ? (this._readMessage += t)
                        : this._readByte._writeUint8Array(new Uint8Array(t)),
                        egret.ProgressEvent.dispatchProgressEvent(
                            this,
                            egret.ProgressEvent.SOCKET_DATA
                        );
                }),
                (s.prototype.flush = function() {
                    return this.connected
                        ? (this._writeMessage &&
                              (this.socket.send(this._writeMessage),
                              (this._writeMessage = '')),
                          this._bytesWrite &&
                              (this.socket.send(this._writeByte.buffer),
                              (this._bytesWrite = !1),
                              this._writeByte.clear()),
                          void (this._isReadySend = !1))
                        : void egret.$warn(3101);
                }),
                (s.prototype.writeUTF = function(t) {
                    return this.connected
                        ? (this._type == s.TYPE_BINARY
                              ? ((this._bytesWrite = !0),
                                this._writeByte.writeUTF(t))
                              : (this._writeMessage += t),
                          void this.flush())
                        : void egret.$warn(3101);
                }),
                (s.prototype.readUTF = function() {
                    var t;
                    return (
                        this._type == s.TYPE_BINARY
                            ? ((this._readByte.position = 0),
                              (t = this._readByte.readUTF()),
                              this._readByte.clear())
                            : ((t = this._readMessage),
                              (this._readMessage = '')),
                        t
                    );
                }),
                (s.prototype.writeBytes = function(t, e, i) {
                    return (
                        void 0 === e && (e = 0),
                        void 0 === i && (i = 0),
                        this.connected
                            ? this._writeByte
                                ? ((this._bytesWrite = !0),
                                  this._writeByte.writeBytes(t, e, i),
                                  void this.flush())
                                : void egret.$warn(3102)
                            : void egret.$warn(3101)
                    );
                }),
                (s.prototype.readBytes = function(t, e, i) {
                    return (
                        void 0 === e && (e = 0),
                        void 0 === i && (i = 0),
                        this._readByte
                            ? ((this._readByte.position = 0),
                              this._readByte.readBytes(t, e, i),
                              void this._readByte.clear())
                            : void egret.$warn(3102)
                    );
                }),
                Object.defineProperty(s.prototype, 'connected', {
                    get: function() {
                        return this.socket && 1 == this.socket.readyState;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(s.prototype, 'connecting', {
                    get: function() {
                        return this.socket && 0 == this.socket.readyState;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(s.prototype, 'type', {
                    get: function() {
                        return this._type;
                    },
                    set: function(t) {
                        (this._type = t),
                            t != s.TYPE_BINARY ||
                                this._writeByte ||
                                ((this._readByte = new egret.ByteArray()),
                                (this._writeByte = new egret.ByteArray()));
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (s.prototype._bindEvent = function() {
                    var t = this.socket;
                    (t.onopen = function() {
                        this.onConnect && this.onConnect();
                    }.bind(this)),
                        (t.onclose = function(t) {
                            this.onClose && this.onClose();
                        }.bind(this)),
                        (t.onerror = function(t) {
                            this.onError && this.onError();
                        }.bind(this)),
                        (t.onmessage = function(t) {
                            this.onSocketData && this.onSocketData(t.data);
                        }.bind(this));
                }),
                (s.prototype._unbindEvent = function() {
                    var t = this.socket;
                    (t.onopen = function() {}),
                        (t.onclose = function() {}),
                        (t.onerror = function() {}),
                        (t.onmessage = function() {});
                }),
                (s.TYPE_STRING = 'webSocketTypeString'),
                (s.TYPE_BINARY = 'webSocketTypeBinary'),
                s
            );
        })(i.SingletonDispatcher);
        (t.NativeWebSocket = e),
            __reflect(e.prototype, 'Core.Network.NativeWebSocket');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var Core;
!(function(r) {
    var t = (function(e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.pageStack = []), t;
        }
        return (
            __extends(t, e),
            (t.prototype.changePage = function(t, e) {
                if (
                    (void 0 === e && (e = !1), !e && this.pageStack.length > 0)
                ) {
                    var i = this.pageStack.pop();
                    i.parent && (this.removeChild(i), r.releaseAllChildren(i));
                }
                if (e && this.pageStack.length > 0) {
                    var i = this.getTopPage();
                    i.parent && this.removeChild(i);
                }
                this.pageStack.push(t), this.addChild(t);
            }),
            (t.prototype.popPage = function(t) {
                if ((void 0 === t && (t = !0), this.pageStack.length <= 1))
                    return void console.warn(
                        '[PageNavigator] bottom page already!'
                    );
                var e = this.pageStack.pop();
                e.parent && (this.removeChild(e), r.releaseAllChildren(e)),
                    t && this.addChild(this.getTopPage());
            }),
            (t.prototype.getTopPage = function() {
                return this.pageStack.length <= 0
                    ? null
                    : this.pageStack[this.pageStack.length - 1];
            }),
            Object.defineProperty(t.prototype, 'topPageModuleName', {
                get: function() {
                    if (this.pageStack.length > 0) {
                        var t = egret.getQualifiedClassName(this.getTopPage()),
                            e = t.split('.');
                        return e.length >= 2 ? e[0] : null;
                    }
                    return null;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.popPageByModuleName = function(t, e) {
                for (
                    ;
                    this.pageStack.length > 1 && this.topPageModuleName === t;

                )
                    this.popPage(e);
            }),
            (t.prototype.getPageCount = function() {
                return this.pageStack.length;
            }),
            t
        );
    })(eui.Group);
    (r.PageNavigatorBase = t), __reflect(t.prototype, 'Core.PageNavigatorBase');
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(e) {
    var t;
    !(function(r) {
        var t = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.fetchConfig = function() {
                    var e = this;
                    if (!this.urls || 0 === this.urls.length)
                        return void console.warn(
                            egret.getQualifiedClassName(this) +
                                ' url not defined!'
                        );
                    for (var t = 0; t < this.urls.length; t++)
                        if (!this.urls[t])
                            return void console.warn(
                                egret.getQualifiedClassName(this) +
                                    ' no.' +
                                    t +
                                    ' url wrong'
                            );
                    var i = {
                        module: r.Module.HTTP,
                        sequence: r.Client.instance.sharedSequnce++,
                        method: r.Method.GET,
                        targetType: r.TargetType.XML,
                        urls: this.urls
                    };
                    r.Client.instance.sendHttpRequest(i, function(t) {
                        switch (t.status) {
                            case r.Status.SUCCESS:
                                e.onRequestSuccess(t.content);
                                break;
                            case r.Status.ERROR:
                            case r.Status.INVALID_REQUEST:
                                e.onRequestFail();
                        }
                    });
                }),
                (e.prototype.onRequestSuccess = function(t) {
                    this.parseXmlObj(t),
                        this.dispatchEventWith(
                            egret.Event.COMPLETE,
                            !1,
                            this.successEventData
                        );
                }),
                (e.prototype.onRequestFail = function() {
                    this.dispatchEventWith(
                        egret.Event.COMPLETE,
                        !1,
                        this.failEventData
                    );
                }),
                Object.defineProperty(e.prototype, 'successEventData', {
                    get: function() {
                        return !0;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, 'failEventData', {
                    get: function() {
                        return !1;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e
            );
        })(e.SingletonDispatcher);
        (r.ConfigBase = t), __reflect(t.prototype, 'Core.AGWorker.ConfigBase');
    })((t = e.AGWorker || (e.AGWorker = {})));
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (t.mouseLocaleKey = ''), (t.mouseLocaleFunc = null), t;
        }
        return (
            __extends(t, e),
            (t.prototype.onAddToStage = function() {
                e.prototype.onAddToStage.call(this),
                    this.addEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    ),
                    this.addEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    ),
                    mouse.setButtonMode(this, !0),
                    this.setupMouseTips();
            }),
            (t.prototype.onRemoveFromStage = function() {
                e.prototype.onRemoveFromStage.call(this),
                    this.removeEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    ),
                    this.removeEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    ),
                    mouse.setButtonMode(this, !1),
                    this.clearMouseTips(),
                    null !== this.mouseLocaleFunc
                        ? i.MouseTips.instance.unregisterMouseTip(this)
                        : '' !== this.mouseLocaleKey &&
                          i.MouseTips.instance.unregisterMouseTip(this);
            }),
            (t.prototype.setupMouseTips = function() {
                null !== this.mouseLocaleFunc
                    ? i.MouseTips.instance.registerMouseTip(
                          this,
                          this.mouseLocaleFunc
                      )
                    : '' !== this.mouseLocaleKey &&
                      i.MouseTips.instance.registerMouseTip(
                          this,
                          this.mouseLocaleKey
                      );
            }),
            (t.prototype.clearMouseTips = function() {
                null !== this.mouseLocaleFunc
                    ? i.MouseTips.instance.unregisterMouseTip(this)
                    : '' !== this.mouseLocaleKey &&
                      i.MouseTips.instance.unregisterMouseTip(this);
            }),
            (t.prototype.refresh = function() {
                e.prototype.refresh.call(this), this.setupMouseTips();
            }),
            (t.prototype.onMouseOver = function() {
                this.enabled &&
                    (this.skin.hasState('over')
                        ? (this.skin.currentState = 'over')
                        : this.skin.hasState('down') &&
                          (this.skin.currentState = 'down'));
            }),
            (t.prototype.onMouseOut = function() {
                this.enabled &&
                    this.skin.hasState('up') &&
                    (this.skin.currentState = 'up');
            }),
            t
        );
    })(i.LocaleButton);
    (i.PCButton = t), __reflect(t.prototype, 'Core.PCButton');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.getStoreList = function() {
                return [];
            }),
            (e.prototype.onStoreChange = function(t, e, i) {}),
            e
        );
    })(t.PageBase);
    (t.PCPageBase = e), __reflect(e.prototype, 'Core.PCPageBase');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(s) {
    var t = (function(r) {
        function t(t, e) {
            var i = r.call(this) || this;
            return (
                (i.mainBtnSkinName = ''),
                (i.msgKey = ''),
                (i.timerBtnIndex = -1),
                (i.timerCount = 0),
                (i.timerInterval = 0),
                (i.skinName = i.defaultSkinName),
                (i.msgKey = t),
                (i.optKeys = e),
                (i.scaleX = 0),
                (i.scaleY = 0),
                (i.dismissing = !1),
                i.addEventListener(egret.Event.ADDED_TO_STAGE, i.onInit, i),
                i
            );
        }
        return (
            __extends(t, r),
            (t.prototype.onInit = function() {
                var i = this;
                if (
                    (this.removeEventListener(
                        egret.Event.ADDED_TO_STAGE,
                        this.onInit,
                        this
                    ),
                    this.msgLabel && (this.msgLabel.localeKey = this.msgKey),
                    this.btnGrp)
                ) {
                    var r;
                    this.optKeys
                        ? this.optKeys.forEach(function(t, e) {
                              (r = new i.defaultBtnClass(t, e)),
                                  null != i.btnSkinNameArray &&
                                      i.btnSkinNameArray.length > e &&
                                      (r.skinName = i.btnSkinNameArray[e]),
                                  i.btnGrp.addChild(r),
                                  r.addEventListener(
                                      egret.TouchEvent.TOUCH_TAP,
                                      i.onBtnClick,
                                      i
                                  );
                          }, this)
                        : ((r = new this.defaultBtnClass(
                              this.defaultTextKey,
                              0
                          )),
                          '' != this.mainBtnSkinName &&
                              (r.skinName = this.mainBtnSkinName),
                          this.btnGrp.addChild(r),
                          r.addEventListener(
                              egret.TouchEvent.TOUCH_TAP,
                              this.dismiss,
                              this
                          ));
                }
            }),
            (t.prototype.onAddToStage = function() {
                r.prototype.onAddToStage.call(this),
                    (this.dismissing = !1),
                    egret.Tween.get(this).to(
                        { scaleX: 1, scaleY: 1 },
                        300,
                        egret.Ease.backOut
                    );
            }),
            (t.prototype.dismiss = function(t) {
                var e = this;
                void 0 === t && (t = !0),
                    this.dismissing ||
                        (egret.Tween.get(this)
                            .to(
                                { scaleX: 0, scaleY: 0 },
                                300,
                                egret.Ease.backIn
                            )
                            .call(function() {
                                (e.dismissing = !1),
                                    e.parent && e.parent.removePopup(e, !0, t);
                            }, this),
                        (this.dismissing = !0));
            }),
            (t.prototype.onBtnClick = function(t) {
                if (!this.dismissing) {
                    var e = t.target;
                    this.dispatchEventWith(
                        eui.ItemTapEvent.ITEM_TAP,
                        !1,
                        e.index
                    ),
                        this.dismiss();
                }
            }),
            (t.prototype.getMsgKey = function() {
                return this.msgKey;
            }),
            (t.prototype.startBtnTimer = function(t, e) {
                if ((void 0 === e && (e = 5), this.optKeys)) {
                    var i = this.optKeys.indexOf(t);
                    i >= 0 &&
                        ((this.timerBtnIndex = i),
                        (this.timerCount = e),
                        this.timerCount > 0 &&
                            !s.NonstopTimer.instance.hasInterval(
                                this.timerInterval
                            ) &&
                            (this.countDown(),
                            (this.timerInterval = s.NonstopTimer.instance.setInterval(
                                this.countDown,
                                this,
                                1e3
                            ))));
                }
            }),
            (t.prototype.stopBtnTimer = function() {
                (this.timerBtnIndex = -1),
                    (this.timerCount = 0),
                    s.NonstopTimer.instance.clearInterval(this.timerInterval);
            }),
            (t.prototype.countDown = function() {
                var t = this;
                if (this.timerCount > 0) {
                    this.timerCount--;
                    for (
                        var e = void 0, i = 0;
                        i < this.btnGrp.numChildren;
                        i++
                    )
                        if (
                            ((e = this.btnGrp.getChildAt(i)),
                            e.index == this.timerBtnIndex)
                        ) {
                            (e.localeKey = ''),
                                (e.localeFunc = function() {
                                    return (
                                        s.LocalizeStore.instance.translate(
                                            t.optKeys[t.timerBtnIndex]
                                        ) +
                                        '(' +
                                        String(t.timerCount) +
                                        ')'
                                    );
                                }),
                                e.refresh();
                            break;
                        }
                } else
                    this.stopBtnTimer(),
                        this.dispatchEventWith(
                            eui.ItemTapEvent.ITEM_TAP,
                            !1,
                            this.timerBtnIndex
                        ),
                        this.dismiss();
            }),
            t
        );
    })(s.StoreView);
    (s.PopupBoardBase = t), __reflect(t.prototype, 'Core.PopupBoardBase');
})(Core || (Core = {}));
var VideoGameCore;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(r) {
    var t;
    !(function(s) {
        var t = (function(i) {
            function t() {
                return (null !== i && i.apply(this, arguments)) || this;
            }
            return (
                __extends(t, i),
                Object.defineProperty(t.prototype, 'urls', {
                    get: function() {
                        var e = this,
                            t = this.versionInfo,
                            i = t.path,
                            r = [];
                        return (
                            s.VersionConfig.instance.domainList.forEach(
                                function(t) {
                                    r.push(
                                        t +
                                            e.parsePlaceHolder(i) +
                                            '?timestamp=' +
                                            Date.now()
                                    );
                                }
                            ),
                            r
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.parsePlaceHolder = function(t) {
                    var e = r.ExternalData.pid,
                        i = t.replace(/\{pid\}/g, e);
                    return i;
                }),
                Object.defineProperty(t.prototype, 'localKey', {
                    get: function() {
                        return 'CONFIG_' + this.id + '_' + r.ExternalData.pid;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'versionInfo', {
                    get: function() {
                        var t = s.VersionConfig.instance.versionInfoMap.get(
                            this.id
                        );
                        return (
                            t ||
                                console.error(
                                    this.id +
                                        ' not exist, check your version_config'
                                ),
                            t
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'configCache', {
                    get: function() {
                        if (!this._configCache) {
                            var t = r.StorageManager.instance.getItem(
                                this.localKey
                            );
                            t && (this._configCache = JSON.parse(t));
                        }
                        return this._configCache;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.fetchConfig = function() {
                    var t = this;
                    return this.versionInfo.cacheEnabled
                        ? void (this.configCache &&
                          this.configCache.version == this.versionInfo.version
                              ? (this.parseXmlObj(this.configCache.content),
                                r.ntimer.callLater(function() {
                                    t.dispatchEventWith(
                                        egret.Event.COMPLETE,
                                        !1,
                                        t.successEventData
                                    );
                                }, this))
                              : i.prototype.fetchConfig.call(this))
                        : void i.prototype.fetchConfig.call(this);
                }),
                (t.prototype.onRequestSuccess = function(t) {
                    var e = { version: this.versionInfo.version, content: t };
                    r.StorageManager.instance.setItem(
                        this.localKey,
                        JSON.stringify(e)
                    ),
                        i.prototype.onRequestSuccess.call(this, t);
                }),
                (t.prototype.onRequestFail = function() {
                    this.configCache
                        ? (console.warn(this.localKey + ' fall back to cache!'),
                          this.parseXmlObj(this.configCache.content),
                          this.dispatchEventWith(
                              egret.Event.COMPLETE,
                              !1,
                              this.successEventData
                          ))
                        : i.prototype.onRequestFail.call(this);
                }),
                Object.defineProperty(t.prototype, 'successEventData', {
                    get: function() {
                        return { success: !0, configId: this.id };
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'failEventData', {
                    get: function() {
                        return { success: !1, configId: this.id };
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t
            );
        })(r.AGWorker.ConfigBase);
        (s.CachedConfigBase = t),
            __reflect(t.prototype, 'Core.Config.CachedConfigBase');
    })((t = r.Config || (r.Config = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function() {
            function t(t) {
                this.readGameInfo(t),
                    t
                        .find(i.ExternalData.device.toLowerCase())
                        .forEach(this.readGameInfo, this);
            }
            return (
                (t.prototype.readGameInfo = function(t) {
                    (this.category =
                        !this.category || t.hasAttr('category')
                            ? t.attr('category')
                            : this.category),
                        (this.brand =
                            !this.brand || t.hasAttr('brand')
                                ? t.attr('brand')
                                : this.brand),
                        (this.platform =
                            !this.platform || t.hasAttr('platform')
                                ? t.attr('platform')
                                : this.platform),
                        (this.gameType =
                            !this.gameType || t.hasAttr('gameType')
                                ? t.attr('gameType')
                                : this.gameType),
                        (this.allowDemo =
                            void 0 == this.allowDemo || t.hasAttr('allowDemo')
                                ? t.boolAttr('allowDemo', !0)
                                : this.allowDemo),
                        (this.currencyList =
                            !this.currencyList || t.hasAttr('currency')
                                ? t.listAttr('currency')
                                : this.currencyList),
                        (this.maintaining =
                            void 0 == this.maintaining ||
                            t.hasAttr('maintaining')
                                ? t.boolAttr('maintaining', !1)
                                : this.maintaining),
                        (this.extraList =
                            !this.extraList || t.hasAttr('extra')
                                ? t.listAttr('extra')
                                : this.extraList),
                        (this.moduleName =
                            !this.moduleName || t.hasAttr('moduleName')
                                ? t.attr('moduleName')
                                : this.moduleName),
                        (this.vid =
                            !this.vid || t.hasAttr('vid')
                                ? t.attr('vid')
                                : this.vid);
                }),
                t
            );
        })();
        (t.GameInfo = e), __reflect(e.prototype, 'Core.Config.GameInfo');
    })((t = i.Config || (i.Config = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(a) {
    var t;
    !(function(n) {
        function o(t, e, i) {
            return (
                (i = i || '0'),
                (t += ''),
                t.length >= e ? t : new Array(e - t.length + 1).join(i) + t
            );
        }
        function r(t) {
            if (t.length < 12) return !1;
            var e = n.steelInt(t, 4);
            return e == t.length;
        }
        (n.EVENT_CONN_SICK = 'EVENT_CONN_SICK'),
            (n.EVENT_CONN_RECOVER = 'EVENT_CONN_RECOVER');
        var t = (function(s) {
            function t(t, e, i) {
                var r = s.call(this) || this;
                return (
                    (r.ALIVE_PERIOD = 2e4),
                    (r.isSick = !1),
                    (r.url = t),
                    (r.tag = e),
                    (r.respMap = i),
                    (r.type = n.NativeWebSocket.TYPE_BINARY),
                    (r.byteBuffer = new egret.ByteArray()),
                    r.addEventListener(
                        egret.Event.CONNECT,
                        r.onConnected,
                        r,
                        !1,
                        10
                    ),
                    r.addEventListener(egret.Event.CLOSE, r.onClosed, r),
                    r.addEventListener(
                        egret.IOErrorEvent.IO_ERROR,
                        r.onIOError,
                        r
                    ),
                    r.addEventListener(
                        egret.ProgressEvent.SOCKET_DATA,
                        r.onReceiveData,
                        r
                    ),
                    r
                );
            }
            return (
                __extends(t, s),
                Object.defineProperty(t.prototype, 'HEART_BEAT_PERIOD', {
                    get: function() {
                        return 2e3;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.writeBytes = function(t, e, i) {
                    if (this.connected)
                        try {
                            s.prototype.writeBytes.call(this, t, e, i);
                            var r = n.steelInt(t, 0);
                            a.ExternalData.showSocketLog &&
                                dclib(
                                    this.tag +
                                        ' send: 0x' +
                                        o(r.toString(16), 6) +
                                        ', length: ' +
                                        t.length
                                );
                        } catch (t) {
                            dclib(this.tag + ' WebSocketBase writeBytes fail!');
                        }
                }),
                (t.prototype.onConnected = function(t) {
                    var e = this;
                    dclib(this.tag + 'onConnected!!'),
                        (this.aliveInterval = a.ntimer.setInterval(
                            function() {
                                e.writeBytes(a.APIManager.getCMDKeepAlive());
                            },
                            this,
                            this.ALIVE_PERIOD
                        )),
                        (this.heartBeatCount = 0),
                        (this.heartBeatInterval = a.ntimer.setInterval(
                            function() {
                                2 === e.heartBeatCount &&
                                    ((e.isSick = !0),
                                    e.dispatchEventWith(n.EVENT_CONN_SICK)),
                                    e.heartBeatCount >= 3
                                        ? e.close()
                                        : (e.heartBeatCount++,
                                          e.heartBeatCount >= 2 &&
                                              e.writeBytes(
                                                  a.APIManager.getCMDUCGateAlive()
                                              ));
                            },
                            this,
                            this.HEART_BEAT_PERIOD
                        ));
                }),
                (t.prototype.handlePacket = function(t) {
                    this.dispatchEventWith(n.EVENT_RECEIVE_PACKET, !1, t),
                        (this.heartBeatCount = 0),
                        this.isSick &&
                            (this.dispatchEventWith(n.EVENT_CONN_RECOVER),
                            (this.isSick = !1));
                }),
                (t.prototype.onClosed = function(t) {
                    dclib(this.tag + 'onClosed!!'),
                        a.ntimer.clearInterval(this.aliveInterval),
                        a.ntimer.clearInterval(this.heartBeatInterval);
                }),
                (t.prototype.onIOError = function(t) {
                    dclib(this.tag + 'onIOError!!');
                }),
                (t.prototype.onReceiveData = function(t) {
                    for (
                        this.readBytes(this.byteBuffer);
                        this.byteBuffer.length >= 12;

                    ) {
                        var e = n.steelInt(this.byteBuffer, 4);
                        if (!e || this.byteBuffer.length < e) return;
                        var i = new egret.ByteArray(
                                this.byteBuffer.buffer.slice(0, e)
                            ),
                            r = this.getPacketData(i);
                        r && this.handlePacket(r),
                            this.byteBuffer.length > e
                                ? (this.byteBuffer = new egret.ByteArray(
                                      this.byteBuffer.buffer.slice(e)
                                  ))
                                : this.byteBuffer.length == e &&
                                  this.byteBuffer.clear();
                    }
                }),
                (t.prototype.getPacketData = function(t) {
                    var e = n.steelInt(t, 0),
                        i = n.steelInt(t, 4);
                    return (
                        a.ExternalData.showSocketLog &&
                            dclib(
                                this.tag +
                                    ' receive: 0x' +
                                    o(e.toString(16), 6) +
                                    ', length:' +
                                    i
                            ),
                        i != t.length ? null : this.byteArrayToResponse(t)
                    );
                }),
                (t.prototype.byteArrayToResponse = function(t) {
                    if (r(t)) {
                        var e = n.steelInt(t, 0),
                            i = this.getResponseClass(e);
                        return new i(e, t, this);
                    }
                    return null;
                }),
                (t.prototype.getResponseClass = function(i) {
                    var r;
                    return (
                        this.moduleRespMap &&
                            this.moduleRespMap.forEach(function(t) {
                                var e = t.get(i);
                                e && (r = e);
                            }, this),
                        r || (r = this.respMap.get(i)),
                        r ? r : n.pe
                    );
                }),
                t
            );
        })(n.NativeWebSocket);
        (n.DCSocketUnit = t),
            __reflect(t.prototype, 'Core.Network.DCSocketUnit');
    })((t = a.Network || (a.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var VideoGameCore;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(t) {
    var e = (function(t) {
        function e() {
            return t.call(this) || this;
        }
        return __extends(e, t), e;
    })(t.PageNavigatorBase);
    (t.PCPageNavigator = e), __reflect(e.prototype, 'Core.PCPageNavigator');
})(Core || (Core = {}));
var PCPlaza;
var VideoGameCore;
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t._localeKey = ''),
                (t._localeFunc = null),
                (t._sizeNormal = 0),
                (t._sizeEn = 0),
                t.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    t.onAddToStage,
                    t
                ),
                t.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    t.onRemoveFromStage,
                    t
                ),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.onAddToStage = function() {
                this.onLangChange(),
                    (this.actionListenerId = i.LocalizeStore.instance.addActionListener(
                        i.q,
                        this.onLangChange,
                        this
                    ));
            }),
            (t.prototype.onRemoveFromStage = function() {
                i.LocalizeStore.instance.removeActionListener(
                    this.actionListenerId
                );
            }),
            (t.prototype.onLangChange = function() {
                this.localeFunc
                    ? (this.text = this.localeFunc())
                    : this.localeKey &&
                      (this.text = i.LocalizeStore.instance.translate(
                          this.localeKey
                      )),
                    this.updateSize(i.LocalizeStore.instance.lang);
            }),
            (t.prototype.updateSize = function(t) {
                t == i.LANG_EN && 0 != this._sizeEn
                    ? (this.size = this._sizeEn)
                    : 0 != this._sizeNormal && (this.size = this._sizeNormal);
            }),
            Object.defineProperty(t.prototype, 'sizeNormal', {
                get: function() {
                    return this._sizeNormal;
                },
                set: function(t) {
                    this._sizeNormal = t;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'sizeEn', {
                get: function() {
                    return this._sizeEn;
                },
                set: function(t) {
                    (this._sizeEn = t),
                        0 == this._sizeNormal && (this._sizeNormal = this.size);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.refresh = function() {
                this.onLangChange();
            }),
            Object.defineProperty(t.prototype, 'localeKey', {
                get: function() {
                    return this._localeKey;
                },
                set: function(t) {
                    (this._localeKey = t), this.refresh();
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'localeFunc', {
                get: function() {
                    return this._localeFunc;
                },
                set: function(t) {
                    (this._localeFunc = t), this.refresh();
                },
                enumerable: !0,
                configurable: !0
            }),
            t
        );
    })(eui.Label);
    (i.LocaleLabel = t), __reflect(t.prototype, 'Core.LocaleLabel');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(t) {
    var e = (function(r) {
        function t(t, e) {
            var i = r.call(this) || this;
            return (
                (i.localeKey = t),
                (i.index = e),
                (i.skinName = i.defaultSkinName),
                i
            );
        }
        return __extends(t, r), t;
    })(t.LocaleButton);
    (t.PopupBtnBase = e), __reflect(e.prototype, 'Core.PopupBtnBase');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(i) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.onSocketData = function(t, e) {}),
            (e.prototype.enterGame = function(t) {
                return t.maintaining
                    ? void this.dispatchAction(i.Us)
                    : (i.LoginStore.instance.isReady ||
                          this.dispatchAction(i.Fs),
                      !t.allowDemo &&
                          i.LoginStore.instance.isDemoAc &&
                          this.dispatchAction(i.Ks),
                      void this.enterGameByModule(t));
            }),
            (e.prototype.enterGameByModule = function(t) {
                i.ModuleNavigator.instance.changeModule(t.moduleName, t, !0);
            }),
            e
        );
    })(i.NetworkStoreBase);
    (i.EnterGameStore = t), __reflect(t.prototype, 'Core.EnterGameStore');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(t) {
    var e = (function() {
        function t() {
            this.isPrepared = !1;
        }
        return (
            (t.prototype.prepareDataModel = function(t, e, i) {
                this.isPrepared = !0;
            }),
            (t.prototype.releaseDataModel = function() {
                this.isPrepared = !1;
            }),
            (t.prototype.startModule = function(t) {}),
            (t.prototype.endModule = function(t, e, i) {
                t.call(e, !0, i);
            }),
            t
        );
    })();
    (t.ModuleHandlerBase = e), __reflect(e.prototype, 'Core.ModuleHandlerBase');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.code = t.readInt()),
                        (this.tokenBytes = new egret.ByteArray(
                            t.buffer.slice(t.position, t.position + 16)
                        )),
                        (this.token = []),
                        this.token.push(t.readDouble()),
                        this.token.push(t.readDouble()),
                        (this.svrTime = i.readInt64FromBytes(t)),
                        (this.userFlag = t.readInt());
                }),
                Object.defineProperty(e.prototype, 'tokenString', {
                    get: function() {
                        if (2 != this.token.length) return null;
                        var t = '';
                        this.tokenBytes.position = 0;
                        for (var e = 0; 16 > e; e++) {
                            var i = 255 & this.tokenBytes.readByte(),
                                r = '0' + i.toString(16).toLowerCase();
                            t += r.substr(r.length - 2, 2);
                        }
                        return t;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e
            );
        })(t.ResponseBase);
        (t.Ln = e), __reflect(e.prototype, 'Core.Network.ClientLoginResp');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(t) {
    var e = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.show = function(t) {
                return (
                    t && (this.parentPage = t),
                    this.parentPage
                        ? void (
                              this.parent || this.parentPage.addPopup(this, !0)
                          )
                        : void console.error('Need assign a parent page first')
                );
            }),
            (e.prototype.hide = function() {
                this.parentPage && this.parentPage.removePopup(this, !0, !1);
            }),
            (e.prototype.onReleaseRefs = function() {
                this.parentPage = null;
            }),
            e
        );
    })(eui.Component);
    (t.LoadingViewBase = e), __reflect(e.prototype, 'Core.LoadingViewBase');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(s) {
        function t() {
            var t = (null !== s && s.apply(this, arguments)) || this;
            return (t.dataList = []), t;
        }
        return (
            __extends(t, s),
            (t.prototype.set = function(t, e) {
                var i = this.has(t);
                if ((s.prototype.set.call(this, t, e), i)) {
                    var r = this.keys.indexOf(t);
                    this.dataList.splice(r, 1, { key: t, value: e });
                } else this.dataList.push({ key: t, value: e });
                return this;
            }),
            (t.prototype['delete'] = function(t) {
                s.prototype['delete'].call(this, t);
                for (var e = 0; e < this.dataList.length; e++)
                    if (this.dataList[e].key === t)
                        return this.dataList.splice(e, 1), this;
                return this;
            }),
            (t.prototype.copy = function(t) {
                return s.prototype.copy.call(this, t);
            }),
            Object.defineProperty(t.prototype, 'lastValue', {
                get: function() {
                    return this.dataList.length <= 0
                        ? null
                        : this.values[this.values.length - 1];
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.sortData = function() {
                var e = this;
                (this.cacheKeys = []),
                    (this.cacheValues = []),
                    this.dataList.forEach(function(t) {
                        e.cacheKeys.push(t.key), e.cacheValues.push(t.value);
                    }, this),
                    (this.cached = !0);
            }),
            (t.prototype.toJSON = function() {
                return this.dataList;
            }),
            (t.prototype.setupByData = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    this.set(i.key, i.value);
                }
            }),
            t
        );
    })(t.HashMap);
    (t.ArrayMap = e), __reflect(e.prototype, 'Core.ArrayMap');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(i) {
        function t(t) {
            var e = i.call(this) || this;
            return (e.container = t), e;
        }
        return (
            __extends(t, i),
            (t.prototype.getStoreList = function() {
                return [];
            }),
            (t.prototype.onTouchMove = function(t) {
                i.prototype.onTouchMove.call(this, t), this.containerCheck();
            }),
            (t.prototype.onTouchEnd = function(t) {
                i.prototype.onTouchEnd.call(this, t), this.containerCheck();
            }),
            (t.prototype.containerCheck = function() {
                this.x < 0 && (this.x = 0),
                    this.x + this.width > this.container.width &&
                        (this.x = this.container.width - this.width),
                    this.y < 0 && (this.y = 0),
                    this.y + this.height > this.container.height &&
                        (this.y = this.container.height - this.height);
            }),
            t
        );
    })(eui.Panel);
    (t.MoveInContainerPanel = e),
        __reflect(e.prototype, 'Core.MoveInContainerPanel');
})(Core || (Core = {}));
var Core;
!(function(r) {
    var t = (function(i) {
        function t(t) {
            var e = i.call(this) || this;
            return (
                (e.viewHorizontalCenter = 0),
                (e.viewVerticalCenter = 0),
                (e.touchEnabled = !1),
                (e.parentPage = t),
                (e.notifyDataQueue = []),
                e
            );
        }
        return (
            __extends(t, i),
            (t.prototype.hasMsgKey = function(t) {
                var e = this.labelDisplay.localeKey == t;
                if (!e)
                    for (var i = 0; i < this.notifyDataQueue.length; i++)
                        if (
                            null != this.notifyDataQueue[i].msgKey &&
                            this.notifyDataQueue[i].msgKey == t
                        ) {
                            e = !0;
                            break;
                        }
                return e;
            }),
            (t.prototype.hasMsg = function(t) {
                var e = this.labelDisplay.text == t;
                if (!e)
                    for (var i = 0; i < this.notifyDataQueue.length; i++)
                        if (
                            null != this.notifyDataQueue[i].msg &&
                            this.notifyDataQueue[i].msg == t
                        ) {
                            e = !0;
                            break;
                        }
                return e;
            }),
            (t.prototype.hasTimeout = function(t) {
                var e = !1;
                return (
                    r.NonstopTimer.instance.hasTimeout(this.timeoutId) &&
                        (this.notifyDataQueue.push(t), (e = !0)),
                    e
                );
            }),
            (t.prototype.show = function(t) {
                this.parent ||
                    this.parentPage.addPopup(
                        this,
                        !1,
                        this.viewHorizontalCenter,
                        this.viewVerticalCenter
                    ),
                    (this.timeoutId = r.NonstopTimer.instance.setTimeout(
                        this.notifyTimeoutDo,
                        this,
                        t
                    ));
            }),
            (t.prototype.showMsgKey = function(t, e) {
                void 0 === e && (e = 2e3),
                    this.hasMsgKey(t) ||
                        this.hasTimeout({ msgKey: t, long: e }) ||
                        (this.showErrCode(),
                        (this.labelDisplay.localeKey = t),
                        this.show(e));
            }),
            (t.prototype.showMsg = function(t, e) {
                void 0 === e && (e = 2e3),
                    this.hasMsg(t) ||
                        this.hasTimeout({ msg: t, long: e }) ||
                        (this.showErrCode(),
                        (this.labelDisplay.localeKey = t),
                        this.show(e));
            }),
            (t.prototype.showErrCode = function(t) {
                if ((void 0 === t && (t = 0), this.labelErrCode)) {
                    var e = '';
                    t && (e = r.getErrorCodeStr(t)),
                        (this.labelErrCode.text = e);
                }
            }),
            (t.prototype.clearMsgQueue = function() {
                this.hide(),
                    r.NonstopTimer.instance.clearTimeout(this.timeoutId),
                    (this.notifyDataQueue = []);
            }),
            (t.prototype.notifyTimeoutDo = function() {
                r.NonstopTimer.instance.clearTimeout(this.timeoutId),
                    this.clearText(),
                    this.hide(),
                    this.notifyDataQueue.length > 0 && this.showNext();
            }),
            (t.prototype.showNext = function() {
                var t = this.notifyDataQueue.shift();
                null != t.msgKey
                    ? this.showMsgKey(t.msgKey, t['long'])
                    : this.showMsg(t.msg, t['long']);
            }),
            (t.prototype.hide = function() {
                this.parentPage && this.parentPage.removePopup(this, !1, !1);
            }),
            (t.prototype.clearText = function() {
                this.showErrCode(),
                    (this.labelDisplay.localeKey = ''),
                    (this.labelDisplay.text = '');
            }),
            (t.prototype.onReleaseRefs = function() {
                this.parentPage = null;
            }),
            t
        );
    })(eui.Component);
    (r.NotifyViewBase = t), __reflect(t.prototype, 'Core.NotifyViewBase');
})(Core || (Core = {}));
var GameBull;
var VideoGameCore;
var GameComp;
var VideoGameCore;
var VideoGameCore;
var GameLive;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var GameLive;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var GameLive;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var GameLive;
var PCEvent;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var PCEvent;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var PCPlaza;
var GameBj;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function() {
            function t(t) {
                (this.name = t.attr('name')),
                    (this.staticDomainList = t.listAttr('staticDomain'));
            }
            return t;
        })();
        (t.SpecialUserInfo = e),
            __reflect(e.prototype, 'Core.Config.SpecialUserInfo');
    })((e = t.Config || (t.Config = {})));
})(Core || (Core = {}));
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameBull;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCbac;
var GameCommon;
var GameCommon;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var Core;
!(function(r) {
    var t;
    !(function(t) {
        var e = (function(i) {
            function t(t) {
                var e = i.call(this, t) || this;
                return (
                    e.readGameInfo(t),
                    t
                        .find(r.ExternalData.device.toLowerCase())
                        .forEach(e.readGameInfo, e),
                    e
                );
            }
            return (
                __extends(t, i),
                (t.prototype.readGameInfo = function(t) {
                    i.prototype.readGameInfo.call(this, t),
                        (this.loginType = t.attr('loginType'));
                }),
                t
            );
        })(t.GameInfo);
        (t.ThirdGameInfo = e),
            __reflect(e.prototype, 'Core.Config.ThirdGameInfo');
    })((t = r.Config || (r.Config = {})));
})(Core || (Core = {}));
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameComp;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameDt;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLed;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLink;
var GameLive;
var GameLive;
var GameLive;
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function() {
            function t(t) {
                (this.id = t.attr('id')),
                    (this.version = t.intAttr('version', 0)),
                    (this.path = t.attr('path')),
                    (this.cacheEnabled = t.boolAttr('cacheEnabled'));
            }
            return t;
        })();
        (t.VersionInfo = e), __reflect(e.prototype, 'Core.Config.VersionInfo');
    })((e = t.Config || (t.Config = {})));
})(Core || (Core = {}));
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var Core;
!(function(t) {
    var e = (function() {
        function t() {}
        return (
            (t.prototype.getAsset = function(e, i, r) {
                function t(t) {
                    i.call(r, t, e);
                }
                if (RES.hasRes(e)) {
                    var s = RES.getRes(e);
                    s ? t(s) : RES.getResAsync(e, t, this);
                } else RES.getResByUrl(e, t, this, RES.ResourceItem.TYPE_IMAGE);
            }),
            t
        );
    })();
    (t.AssetAdapter = e),
        __reflect(e.prototype, 'Core.AssetAdapter', ['eui.IAssetAdapter']);
})(Core || (Core = {}));
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t._localeName = ''),
                (t._localeGroup = ''),
                (t.postfix = ''),
                (t.localeFunc = null),
                t.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    t.onAddToStage,
                    t
                ),
                t.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    t.onRemoveFromStage,
                    t
                ),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.onAddToStage = function() {
                this.onLangChange(),
                    (this.actionListenerId = i.LocalizeStore.instance.addActionListener(
                        i.q,
                        this.onLangChange,
                        this
                    ));
            }),
            (t.prototype.onRemoveFromStage = function() {
                i.LocalizeStore.instance.removeActionListener(
                    this.actionListenerId
                );
            }),
            (t.prototype.onLangChange = function() {
                this.localeFunc
                    ? (this.source = this.localeFunc())
                    : this.localeName &&
                      (this.localeGroup
                          ? (this.source = i.LocalizeStore.instance.translateRes(
                                this.localeName,
                                this.postfix,
                                this.localeGroup
                            ))
                          : (this.source = i.LocalizeStore.instance.translateRes(
                                this.localeName,
                                this.postfix
                            )));
            }),
            Object.defineProperty(t.prototype, 'localeName', {
                get: function() {
                    return this._localeName;
                },
                set: function(t) {
                    (this._localeName = t), this.refresh();
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'localeGroup', {
                get: function() {
                    return this._localeGroup;
                },
                set: function(t) {
                    (this._localeGroup = t), this.refresh();
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.refresh = function() {
                this.onLangChange();
            }),
            t
        );
    })(eui.Image);
    (i.LocaleImage = t), __reflect(t.prototype, 'Core.LocaleImage');
})(Core || (Core = {}));
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var Core;
!(function(t) {
    var e = (function() {
        function t() {}
        return (
            (t.prototype.getTheme = function(e, i, r, s) {
                function t(t) {
                    i.call(s, t);
                }
                function n(t) {
                    t.resItem.url == e &&
                        (RES.removeEventListener(
                            RES.ResourceEvent.ITEM_LOAD_ERROR,
                            n,
                            null
                        ),
                        r.call(s));
                }
                RES.addEventListener(
                    RES.ResourceEvent.ITEM_LOAD_ERROR,
                    n,
                    null
                ),
                    RES.getResByUrl(e, t, this, RES.ResourceItem.TYPE_TEXT);
            }),
            t
        );
    })();
    (t.ThemeAdapter = e),
        __reflect(e.prototype, 'Core.ThemeAdapter', ['eui.IThemeAdapter']);
})(Core || (Core = {}));
var GameLive;
var GameLive;
var GameLive;
var GameLive;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameRou;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameSbac;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameShb;
var GameThird;
var GameThird;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var GameZjh;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var Core;
!(function(n) {
    var t = (function(i) {
        function s() {
            var t = i.call(this) || this,
                e = new n.HashMap();
            return (
                n.LANG_CANDIDATE_LIST.forEach(function(t) {
                    e.set(t, new n.HashMap());
                }),
                (t.dictMap = e),
                t
            );
        }
        return (
            __extends(s, i),
            Object.defineProperty(s, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (s.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(s.prototype, 'lang', {
                get: function() {
                    if (this.forceLang) return this.forceLang;
                    if (this._lang) return this._lang;
                    var t = n.StorageManager.instance.getItem(n.LOCALKEY_LANG),
                        e = n.ExternalData.lang;
                    return (
                        n.LANG_CANDIDATE_LIST.indexOf(t) >= 0
                            ? (this._lang = t)
                            : n.LANG_CANDIDATE_LIST.indexOf(e) >= 0
                                ? (this._lang = e)
                                : (this._lang = n.LANG_DEFAULT),
                        this._lang
                    );
                },
                set: function(t) {
                    n.LANG_CANDIDATE_LIST.indexOf(t) < 0 &&
                        console.warn('language ' + t + ' not support');
                    var e = this._lang === t;
                    (this._lang = t),
                        e || this.dispatchAction(n.q),
                        n.StorageManager.instance.setItem(n.LOCALKEY_LANG, t);
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(s.prototype, 'SWLang', {
                get: function() {
                    var t = n.LocalizeStore.instance.lang;
                    switch (t) {
                        case n.LANG_HANS:
                            return 'zh';
                        case n.LANG_HANT:
                            return 'tr';
                        case n.LANG_TH:
                            return 'th';
                        case n.LANG_JA:
                            return 'ja';
                        case n.LANG_ID:
                            return 'id';
                        default:
                            return 'en';
                    }
                },
                enumerable: !0,
                configurable: !0
            }),
            (s.prototype.translate = function(t) {
                return this.findEntryByKey(t, this.lang);
            }),
            (s.prototype.substitute = function(t) {
                for (var e = [], i = 1; i < arguments.length; i++)
                    e[i - 1] = arguments[i];
                for (var r = this.translate(t), s = 0; s < e.length; s++)
                    r = r.replace(new RegExp('%' + s, 'g'), e[s]);
                return r;
            }),
            (s.prototype.translateRes = function(t, e, i) {
                void 0 === e && (e = ''), void 0 === i && (i = '');
                var r = i
                    ? i +
                      '_' +
                      s.instance.lang +
                      '_json.' +
                      t +
                      '_' +
                      this.lang +
                      e
                    : t + '_' + this.lang + e;
                return RES.hasRes(r)
                    ? r
                    : i
                        ? i +
                          '_' +
                          s.instance.lang +
                          '_json.' +
                          t +
                          '_' +
                          n.LANG_BACKUP +
                          e
                        : t + '_' + n.LANG_BACKUP + e;
            }),
            Object.defineProperty(s.prototype, 'forceLang', {
                get: function() {
                    return this._forceLang;
                },
                set: function(t) {
                    t &&
                        n.LANG_CANDIDATE_LIST.indexOf(t) < 0 &&
                        console.warn('language ' + t + ' not support'),
                        (this._forceLang = t);
                },
                enumerable: !0,
                configurable: !0
            }),
            (s.prototype.saveLocalizeRes = function(t, e, i) {
                this.dictMap.get(e).set(t, JSON.parse(i));
            }),
            (s.prototype.findEntryByKey = function(t, e) {
                var i = t.split('.'),
                    r = this.dictMap.get(e);
                r = r.get(i[0]);
                for (var s = 1; s < i.length && r; s++) r = r[i[s]];
                return r
                    ? r
                    : e != n.LANG_BACKUP
                        ? this.findEntryByKey(t, n.LANG_BACKUP)
                        : t;
            }),
            s
        );
    })(n.StoreBase);
    (n.LocalizeStore = t), __reflect(t.prototype, 'Core.LocalizeStore');
})(Core || (Core = {}));
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var PCEvent;
var Core;
!(function(n) {
    var t = (function(s) {
        function t(t, e, i) {
            void 0 === e && (e = 'Default'), void 0 === i && (i = 0);
            var r = s.call(this) || this;
            return (
                (r.grpNameList = t),
                (r.tag = e),
                (r.priority = i),
                (r.completed = !1),
                (r.loadingMap = new n.HashMap()),
                (r.progressMap = new n.HashMap()),
                r
            );
        }
        return (
            __extends(t, s),
            Object.defineProperty(t.prototype, 'isLoading', {
                get: function() {
                    return this.loadingMap.keys.length > 0;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.startLoad = function() {
                var e = this;
                if (!this.isLoading && !this.completed)
                    return (
                        RES.addEventListener(
                            RES.ResourceEvent.GROUP_COMPLETE,
                            this.onResourceLoadComplete,
                            this
                        ),
                        RES.addEventListener(
                            RES.ResourceEvent.GROUP_LOAD_ERROR,
                            this.onResourceLoadError,
                            this
                        ),
                        RES.addEventListener(
                            RES.ResourceEvent.GROUP_PROGRESS,
                            this.onResourceProgress,
                            this
                        ),
                        RES.addEventListener(
                            RES.ResourceEvent.ITEM_LOAD_ERROR,
                            this.onItemLoadError,
                            this
                        ),
                        this.grpNameList.forEach(this.setupGroup, this),
                        this.loadingMap.keys.length <= 0 &&
                            ((this.completed = !0),
                            this.dispatchEventWith(
                                n.EVENT_COMPLETE,
                                !1,
                                this.tag
                            )),
                        this.loadingMap.keys.forEach(function(t) {
                            RES.loadGroup(t, e.priority);
                        }, this),
                        this
                    );
            }),
            (t.prototype.appendGroup = function(t) {
                var e = this;
                t.forEach(function(t) {
                    e.grpNameList.indexOf(t) < 0 &&
                        (e.grpNameList.push(t), e.setupGroup(t));
                }, this),
                    t.forEach(function(t) {
                        RES.loadGroup(t, e.priority);
                    }, this);
            }),
            (t.prototype.isGrpLoading = function(t) {
                return this.loadingMap.has(t);
            }),
            (t.prototype.setupGroup = function(t) {
                var e = RES.getGroupByName(t).length;
                0 >= e ||
                    RES.isGroupLoaded(t) ||
                    (this.loadingMap.set(t, !0),
                    this.progressMap.set(t, { itemsLoaded: 0, itemTotal: e }));
            }),
            (t.prototype.onResourceLoadComplete = function(t) {
                this.loadingMap.has(t.groupName) &&
                    (this.loadingMap['delete'](t.groupName),
                    dclib('Group ' + t.groupName + ' has been loaded!'),
                    this.loadingMap.keys.length <= 0 &&
                        (RES.removeEventListener(
                            RES.ResourceEvent.GROUP_COMPLETE,
                            this.onResourceLoadComplete,
                            this
                        ),
                        RES.removeEventListener(
                            RES.ResourceEvent.GROUP_LOAD_ERROR,
                            this.onResourceLoadError,
                            this
                        ),
                        RES.removeEventListener(
                            RES.ResourceEvent.GROUP_PROGRESS,
                            this.onResourceProgress,
                            this
                        ),
                        RES.removeEventListener(
                            RES.ResourceEvent.ITEM_LOAD_ERROR,
                            this.onItemLoadError,
                            this
                        ),
                        (this.completed = !0),
                        this.dispatchEventWith(
                            n.EVENT_COMPLETE,
                            !1,
                            this.tag
                        )));
            }),
            (t.prototype.onItemLoadError = function(t) {
                this.grpNameList.indexOf(t.groupName) < 0 ||
                    console.warn(
                        'Url:' + t.resItem.url + ' has failed to load',
                        t
                    );
            }),
            (t.prototype.onResourceLoadError = function(t) {
                this.grpNameList.indexOf(t.groupName) < 0 ||
                    (console.warn(
                        'Group:' + t.groupName + ' has failed to load'
                    ),
                    this.onResourceLoadComplete(t));
            }),
            (t.prototype.onResourceProgress = function(t) {
                if (!(this.grpNameList.indexOf(t.groupName) < 0)) {
                    var e = this.progressMap.get(t.groupName);
                    e &&
                        ((e.itemsLoaded = t.itemsLoaded),
                        ExternalProgress('onprogress', this.getProgress()),
                        this.dispatchEventWith(
                            n.EVENT_PROGRESS,
                            !1,
                            this.getProgress()
                        ));
                }
            }),
            (t.prototype.getProgress = function() {
                var e = 0,
                    i = 0;
                return (
                    this.progressMap.forEach(function(t) {
                        (e += t.itemsLoaded), (i += t.itemTotal);
                    }, this),
                    0 === i ? 1 : e / i
                );
            }),
            t
        );
    })(egret.EventDispatcher);
    (n.GroupBundleLoader = t), __reflect(t.prototype, 'Core.GroupBundleLoader');
})(Core || (Core = {}));
var PCEvent;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(t) {
    (t.CDN_TIMEOUT = 8e3),
        (t.DEV_PC = 'PC'),
        (t.DEV_MOBILE = 'MOBILE'),
        (t.ENV_QA = 'QA'),
        (t.ENV_UAT = 'UAT'),
        (t.ENV_PROD = 'PROD'),
        (t.ORI_PORTRAIT = 'portrait'),
        (t.ORI_LANDSCAPE = 'landscape'),
        (t.LANG_HANS = 'hans'),
        (t.LANG_HANT = 'hant'),
        (t.LANG_EN = 'en'),
        (t.LANG_JA = 'ja'),
        (t.LANG_TH = 'th'),
        (t.LANG_KO = 'ko'),
        (t.LANG_ID = 'id'),
        (t.LANG_VI = 'vi'),
        (t.LANG_KM = 'km'),
        (t.LANG_PT = 'pt'),
        (t.LANG_CANDIDATE_LIST = [
            t.LANG_HANS,
            t.LANG_HANT,
            t.LANG_EN,
            t.LANG_KO,
            t.LANG_JA,
            t.LANG_TH,
            t.LANG_ID,
            t.LANG_VI,
            t.LANG_KM,
            t.LANG_PT
        ]),
        (t.LANG_SOUND_SUPPORTED = [
            t.LANG_HANS,
            t.LANG_HANT,
            t.LANG_EN,
            t.LANG_KO,
            t.LANG_JA
        ]),
        (t.LANG_DEFAULT = t.LANG_EN),
        (t.LANG_BACKUP = t.LANG_EN),
        (t.LANG_CNS_XML = 'lang_cns'),
        (t.LANG_CNR_XML = 'lang_cnr'),
        (t.LANG_EN_XML = 'lang_english'),
        (t.LANG_ZH_CONF = 'ZH'),
        (t.LANG_TR_CONF = 'TR'),
        (t.LANG_EN_CONF = 'EN'),
        (t.LANG_JP_CONF = 'JP'),
        (t.LANG_KR_CONF = 'KR'),
        (t.LANG_TH_CONF = 'TH'),
        (t.LANG_VT_CONF = 'VT'),
        (t.LANG_ID_CONF = 'ID'),
        (t.LANG_KM_CONF = 'KM'),
        (t.LANG_PT_CONF = 'PT'),
        (t.LANG_ANY_CONF = '*'),
        (t.LOGIN_TYPE_NORMAL = 'normal'),
        (t.LOGIN_TYPE_XIN = 'xin'),
        (t.LOGIN_TYPE_AIRLOGIN = 'airlogin'),
        (t.LOGIN_TYPE_EXWALLET = 'exwallet'),
        (t.LOGIN_TYPE_WALLET = 'wallet'),
        (t.LOGIN_TYPE_REDIRECT = 'redirect'),
        (t.LOGIN_TYPE_LINK = 'link'),
        (t.CHANNEL_TAG_BGM = '[BGM]'),
        (t.CHANNEL_TAG_GAME = '[GAME]'),
        (t.CHANNEL_TAG_LIVE = '[LIVE]'),
        (t.CHANNEL_TAG_DEFAULT = '[DEFAULT]'),
        (t.CHANNEL_TAG_EFFECT = '[EFFECT]'),
        (t.EVENT_COMPLETE = 'EVENT_COMPLETE'),
        (t.EVENT_PROGRESS = 'EVENT_PROGRESS'),
        (t.EVENT_RELEASE = 'EVENT_RELEASE'),
        (t.TAG_SILENT_LOADER = 'TAG_SILENT_LOADER'),
        (t.TAG_URGENT_LOADER = 'TAG_URGENT_LOADER'),
        (t.t = 'ACTION_INIT'),
        (t.eu = 'ACTION_INIT_CHILDREN'),
        (t.q = 'ACTION_LANG_CHANGE'),
        (t.$h = 'ACTION_LOGIN_FAILD'),
        (t.Wh = 'ACTION_LOGIN_SUCCESS'),
        (t.Qh = 'ACTION_LOGIN_PWD_INVALID'),
        (t.Xh = 'ACTION_LOGIN_USER_INVALID'),
        (t.iu = 'ACTION_ENTER_SUCCESS'),
        (t.Us = 'ACTION_ENTER_MAINTAIN'),
        (t.Fs = 'ACTION_ENTER_NEED_LOGIN'),
        (t.Ks = 'ACTION_ENTER_NO_DEMO'),
        (t.ru = 'ACTION_ENTER_CURR_UNSUPPORT'),
        (t.Ko = 'ACTION_ADD_TOP_POPUP'),
        (t.Uo = 'ACTION_ADD_TOP_POPUP_PARAM'),
        (t.Ge = 'ACTION_REMOVE_TOP_POPUP'),
        (t.Zo = 'ACTION_CLEAR_TOP_POPUP'),
        (t.su = 'ACTION_CHANGE_LANG_LOAD'),
        (t.No = 'ACTION_CHANGE_GAME_CHECK'),
        (t.Do = 'ACTION_SAVE_CHANGE_GAME_INFO'),
        (t.nu = 'ACTION_ADD_BET_HISTORY_POPUP'),
        (t.ou = 'ACTION_REMOVE_BET_HISTORY_POPUP'),
        (t.au = 'ACTION_BET_HISTORY_NEXT_PAGE'),
        (t.hu = 'ACTION_BET_HISTORY_PREVIOUS_PAGE'),
        (t.uu = 'ACTION_GET_BET_HISTORY_RECORDS_BY_DATE'),
        (t.cu = 'ACTION_SHOW_ROU_FRENCH_BET_PANEL'),
        (t.fu = 'ACTION_HIDE_ROU_FRENCH_BET_PANEL'),
        (t.Cu = 'ACTION_SHOW_MY_BETS_PANEL'),
        (t.lu = 'ACTION_HIDE_MY_BETS_PANEL'),
        (t.mu = 'ACTION_POP_VIDEO_ROU'),
        (t.du = 'ACTION_CLOSE_VIDEO_ROU'),
        (t.vu = 'ACTION_LOGIN_LIVE_PLATFORM_SESSION_SUCCESS'),
        (t.l = 'ACTION_SOCKET_WRITE_FAIL'),
        (t.CHAT_LOGIN_TYPE = 5),
        (t.CHAT_PLAZA_LOGIN_VID = 'ALL'),
        (t.LOCALKEY_LANG = 'LOCALKEY_LANG'),
        (t.LOCALKEY_LANG_SOUND = 'LOCALKEY_LANG_SOUND'),
        (t.LOCALKEY_BGM_SOUND = 'LOCALKEY_BGM_SOUND'),
        (t.LOCALKEY_EGAME_SOUND = 'LOCALKEY_EGAME_SOUND'),
        (t.LOCALKEY_LIVE_SOUND = 'LOCALKEY_LIVE_SOUND'),
        (t.LOCALKEY_VIDEO_AUTO_CHANGE = 'LOCALKEY_VIDEO_AUTO_CHANGE'),
        (t.LOCALKEY_BGM_VOLUME = 'LOCALKEY_BGM_VOLUME'),
        (t.LOCALKEY_SOUND_VOLUME = 'LOCALKEY_SOUND_VOLUME'),
        (t.LOCALKEY_GAME_VOLUME = 'LOCALKEY_GAME_VOLUME'),
        (t.LOCALKEY_LIVE_VOLUME = 'LOCALKEY_LIVE_VOLUME'),
        (t.Gu = 'ACTION_EU_TWEEN_COMPLETE'),
        (t.gn = 0),
        (t.Bn = 63),
        (t._u = 12),
        (t.la = 30),
        (t.ma = 16),
        (t.bu = 100),
        (t._n = 4),
        (t.bn = 4),
        (t.Pn = 14),
        (t.va = 4),
        (t.Fa = 6),
        (t.Pu = 12),
        (t.Vu = 8),
        (t.gu = 8),
        (t.pu = 6),
        (t.ku = 16),
        (t.wu = 30),
        (t.zu = 50),
        (t.dh = 19),
        (t.Su = 'LINK');
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(h) {
    var t = (function(e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.recordStack = []), (t.readyToChange = !0), t;
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(t.prototype, 'moduleInfoMap', {
                get: function() {
                    return this._moduleInfoMap;
                },
                set: function(t) {
                    this._moduleInfoMap = t;
                    var i = {},
                        r = {};
                    t.forEach(function(e) {
                        (i[e.name] = h.AnalyzerUtils.getDomainList()
                            .map(function(t) {
                                return [
                                    t,
                                    h.ExternalData.cdnConfig.subDomain,
                                    e.js
                                ].join('/');
                            })
                            .concat(['./' + e.js])),
                            (r[e.name] = { exports: e.name, deps: e.deps });
                    }, this),
                        require.config({ paths: i, shim: r, waitSeconds: 0 });
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'currentModuleName', {
                get: function() {
                    return this.recordStack[this.recordStack.length - 1].name;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.changeModule = function(e, i, t, r, s) {
                var n = this;
                if ((void 0 === t && (t = !1), !this.readyToChange))
                    return (
                        console.warn('Change module too fast'),
                        void (r && r.call(s, null))
                    );
                if (!t && this.recordStack.length > 0) {
                    this.readyToChange = !1;
                    var o = this.recordStack[this.recordStack.length - 1];
                    this.closeModule(
                        o.name,
                        function(t) {
                            t
                                ? (n.releaseModule(o.name),
                                  n.recordStack.pop(),
                                  n.openModule(e, i, function() {
                                      r && r.call(s, t);
                                  }))
                                : r && r.call(s, t);
                        },
                        this
                    );
                } else
                    this.openModule(e, i, function() {
                        r && r.call(s, !0);
                    });
            }),
            (t.prototype.popModule = function(e, i, t) {
                var r = this;
                if (!this.readyToChange)
                    return (
                        console.warn('Change module too fast'),
                        void (e && e.call(i, null))
                    );
                if (this.recordStack.length > 0) {
                    this.readyToChange = !1;
                    var s = this.recordStack[this.recordStack.length - 1];
                    this.closeModule(
                        s.name,
                        function(t) {
                            t &&
                                (r.releaseModule(s.name),
                                r.recordStack.pop(),
                                r.recordStack.length <= 0 && h.quit()),
                                e && e.call(i, t);
                        },
                        this,
                        t
                    );
                }
            }),
            (t.prototype.closeModule = function(e, i, r, s) {
                var n = this;
                require.defined(e)
                    ? require([e], function(t) {
                          t.moduleHandler.endModule(
                              function(t) {
                                  t ||
                                      console.warn(
                                          'module ' + e + ' cannot close'
                                      ),
                                      (n.readyToChange = !0),
                                      i.call(r, t);
                              },
                              r,
                              s
                          );
                      })
                    : (this.readyToChange = !0);
            }),
            (t.prototype.releaseModule = function(t) {
                var e = this,
                    i = this.getModuleDepsList(t);
                i.forEach(function(t) {
                    t.releaseType > 0 &&
                        require.defined(t.name) &&
                        (require([t.name], function(t) {
                            t.moduleHandler.releaseDataModel();
                        }),
                        2 === t.releaseType &&
                            e
                                .getGrpNameListByModule(t.name)
                                .forEach(function(t) {
                                    RES.destroyRes(t);
                                }, e));
                }, this);
            }),
            (t.prototype.getGrpNameListByModule = function(e) {
                var i = [e];
                return (
                    h.LANG_CANDIDATE_LIST.forEach(function(t) {
                        i.push(e + '_' + t);
                    }, this),
                    i
                );
            }),
            (t.prototype.openModule = function(r, s, n) {
                var o = this,
                    e = [],
                    a = this.getModuleDepsList(r);
                return a.length <= 0
                    ? void console.error(
                          'module ' + r + ' not exist, check module_config!'
                      )
                    : (a.forEach(function(t) {
                          e.push(t.name);
                      }, this),
                      void require(e, function() {
                          for (var t = [], e = 0; e < arguments.length; e++)
                              t[e] = arguments[e];
                          var i = t[t.length - 1];
                          o.prepareModuleList(t, s, function() {
                              h.ModuleResLoader.instance.loadResBundle(
                                  a,
                                  function() {
                                      n(),
                                          i.moduleHandler.startModule(s),
                                          o.recordStack.push({
                                              name: r,
                                              params: s
                                          });
                                  }
                              );
                          });
                      }, function(t) {
                          console.error(t);
                      }));
            }),
            (t.prototype.getModuleDepsList = function(t) {
                var e = [];
                return this.analyseDependency(t, e), e;
            }),
            (t.prototype.analyseDependency = function(t, e) {
                var i = this.moduleInfoMap.get(t);
                if (!i) return void console.warn('Depend on module not exist');
                var r = i.deps;
                if (0 === r.length) return void e.push(i);
                for (var s = 0; s < r.length; s++)
                    this.analyseDependency(r[s], e);
                e.push(i);
            }),
            (t.prototype.prepareModuleList = function(t, e, i, r) {
                var s = this;
                if ((void 0 === r && (r = 0), r >= t.length))
                    return void i.call(this);
                var n = t[r].moduleHandler;
                n.isPrepared
                    ? this.prepareModuleList(t, e, i, r + 1)
                    : n.prepareDataModel(
                          function() {
                              s.prepareModuleList(t, e, i, r + 1);
                          },
                          this,
                          e
                      );
            }),
            (t.prototype.prepareLang = function(e, i) {
                var r = this,
                    s = [];
                this.recordStack.forEach(function(t) {
                    var e = r.getModuleDepsList(t.name);
                    s = s.concat(e);
                }, this);
                var n = new h.HashMap();
                return (
                    s.forEach(function(t) {
                        t.grpName &&
                            (i
                                ? n.set(t.grpName + '_sound_' + e, !0)
                                : n.set(t.grpName + '_' + e, !0));
                    }, this),
                    h.SilentLoadManager.instance.loadAtOnce(n.keys)
                );
            }),
            t
        );
    })(h.SingletonDispatcher);
    (h.ModuleNavigator = t), __reflect(t.prototype, 'Core.ModuleNavigator');
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var qr;
!(function(n) {
    var t = (function() {
        function t(t) {
            (this.mode = n.QRMode.MODE_8BIT_BYTE),
                (this.data = t),
                (this.parsedData = []);
            for (var e = 0, i = this.data.length; i > e; e++) {
                var r = [],
                    s = this.data.charCodeAt(e);
                s > 65536
                    ? ((r[0] = 240 | ((1835008 & s) >>> 18)),
                      (r[1] = 128 | ((258048 & s) >>> 12)),
                      (r[2] = 128 | ((4032 & s) >>> 6)),
                      (r[3] = 128 | (63 & s)))
                    : s > 2048
                        ? ((r[0] = 224 | ((61440 & s) >>> 12)),
                          (r[1] = 128 | ((4032 & s) >>> 6)),
                          (r[2] = 128 | (63 & s)))
                        : s > 128
                            ? ((r[0] = 192 | ((1984 & s) >>> 6)),
                              (r[1] = 128 | (63 & s)))
                            : (r[0] = s),
                    this.parsedData.push(r);
            }
            (this.parsedData = Array.prototype.concat.apply(
                [],
                this.parsedData
            )),
                this.parsedData.length != this.data.length &&
                    (this.parsedData.unshift(191),
                    this.parsedData.unshift(187),
                    this.parsedData.unshift(239));
        }
        return (
            (t.prototype.getLength = function(t) {
                return this.parsedData.length;
            }),
            (t.prototype.write = function(t) {
                for (var e = 0, i = this.parsedData.length; i > e; e++)
                    t.put(this.parsedData[e], 8);
            }),
            t
        );
    })();
    (n.QR8bitByte = t), __reflect(t.prototype, 'qr.QR8bitByte');
})(qr || (qr = {}));
var qr;
!(function(t) {
    var e = (function() {
        function t() {
            (this.buffer = []), (this.length = 0);
        }
        return (
            (t.prototype.get = function(t) {
                var e = Math.floor(t / 8);
                return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
            }),
            (t.prototype.put = function(t, e) {
                for (var i = 0; e > i; i++)
                    this.putBit(1 == ((t >>> (e - i - 1)) & 1));
            }),
            (t.prototype.getLengthInBits = function() {
                return this.length;
            }),
            (t.prototype.putBit = function(t) {
                var e = Math.floor(this.length / 8);
                this.buffer.length <= e && this.buffer.push(0),
                    t && (this.buffer[e] |= 128 >>> this.length % 8),
                    this.length++;
            }),
            t
        );
    })();
    (t.QRBitBuffer = e), __reflect(e.prototype, 'qr.QRBitBuffer');
})(qr || (qr = {}));
var qr;
!(function(h) {
    var t = (function() {
        function a() {}
        return (
            (a.create = function(t, e, i, r, s) {
                void 0 === e && (e = 200),
                    void 0 === i && (i = 200),
                    void 0 === r && (r = 0),
                    void 0 === s && (s = 2);
                var n = {
                        width: e,
                        height: i,
                        correctLevel: h.QRErrorCorrectLevel.H,
                        color: r
                    },
                    o = new h.QRCodeModel(
                        h.QRUtil._getTypeNumber(t, n.correctLevel),
                        n.correctLevel
                    );
                return o.addData(t), o.make(), a.draw(o, n);
            }),
            (a.draw = function(t, e) {
                var i = new egret.Sprite(),
                    e = e,
                    r = t.getModuleCount(),
                    s = Math.floor(e.width / r),
                    n = Math.floor(e.height / r);
                i.graphics.beginFill(e.color);
                for (var o = 0; r > o; o++)
                    for (var a = 0; r > a; a++) {
                        var h = t.isDark(o, a);
                        h && i.graphics.drawRect(a * s, o * n, s, n);
                    }
                return i.graphics.endFill(), i;
            }),
            a
        );
    })();
    (h.QRCode = t), __reflect(t.prototype, 'qr.QRCode');
})(qr || (qr = {}));
var qr;
!(function(_) {
    var t = (function() {
        function h(t, e) {
            (this.modules = null),
                (this.moduleCount = 0),
                (this.dataCache = null),
                (this.dataList = []),
                (this.typeNumber = t),
                (this.errorCorrectLevel = e),
                (this.modules = null),
                (this.moduleCount = 0),
                (this.dataCache = null),
                (this.dataList = []);
        }
        return (
            (h.prototype.addData = function(t) {
                var e = new _.QR8bitByte(t);
                this.dataList.push(e), (this.dataCache = null);
            }),
            (h.prototype.isDark = function(t, e) {
                if (
                    0 > t ||
                    this.moduleCount <= t ||
                    0 > e ||
                    this.moduleCount <= e
                )
                    throw new Error(t + ',' + e);
                return this.modules[t][e];
            }),
            (h.prototype.getModuleCount = function() {
                return this.moduleCount;
            }),
            (h.prototype.make = function() {
                this.makeImpl(!1, this.getBestMaskPattern());
            }),
            (h.prototype.makeImpl = function(t, e) {
                (this.moduleCount = 4 * this.typeNumber + 17),
                    (this.modules = new Array(this.moduleCount));
                for (var i = 0; i < this.moduleCount; i++) {
                    this.modules[i] = new Array(this.moduleCount);
                    for (var r = 0; r < this.moduleCount; r++)
                        this.modules[i][r] = null;
                }
                this.setupPositionProbePattern(0, 0),
                    this.setupPositionProbePattern(this.moduleCount - 7, 0),
                    this.setupPositionProbePattern(0, this.moduleCount - 7),
                    this.setupPositionAdjustPattern(),
                    this.setupTimingPattern(),
                    this.setupTypeInfo(t, e),
                    this.typeNumber >= 7 && this.setupTypeNumber(t),
                    null == this.dataCache &&
                        (this.dataCache = h.createData(
                            this.typeNumber,
                            this.errorCorrectLevel,
                            this.dataList
                        )),
                    this.mapData(this.dataCache, e);
            }),
            (h.prototype.setupPositionProbePattern = function(t, e) {
                for (var i = -1; 7 >= i; i++)
                    if (!(-1 >= t + i || this.moduleCount <= t + i))
                        for (var r = -1; 7 >= r; r++)
                            -1 >= e + r ||
                                this.moduleCount <= e + r ||
                                ((i >= 0 && 6 >= i && (0 == r || 6 == r)) ||
                                (r >= 0 && 6 >= r && (0 == i || 6 == i)) ||
                                (i >= 2 && 4 >= i && r >= 2 && 4 >= r)
                                    ? (this.modules[t + i][e + r] = !0)
                                    : (this.modules[t + i][e + r] = !1));
            }),
            (h.prototype.getBestMaskPattern = function() {
                for (var t = 0, e = 0, i = 0; 8 > i; i++) {
                    this.makeImpl(!0, i);
                    var r = _.QRUtil.getLostPoint(this);
                    (0 == i || t > r) && ((t = r), (e = i));
                }
                return e;
            }),
            (h.prototype.createMovieClip = function(t, e, i) {
                var r = t.createEmptyMovieClip(e, i),
                    s = 1;
                this.make();
                for (var n = 0; n < this.modules.length; n++)
                    for (
                        var o = n * s, a = 0;
                        a < this.modules[n].length;
                        a++
                    ) {
                        var h = a * s,
                            u = this.modules[n][a];
                        u &&
                            (r.beginFill(0, 100),
                            r.moveTo(h, o),
                            r.lineTo(h + s, o),
                            r.lineTo(h + s, o + s),
                            r.lineTo(h, o + s),
                            r.endFill());
                    }
                return r;
            }),
            (h.prototype.setupTimingPattern = function() {
                for (var t = 8; t < this.moduleCount - 8; t++)
                    null == this.modules[t][6] &&
                        (this.modules[t][6] = t % 2 == 0);
                for (var e = 8; e < this.moduleCount - 8; e++)
                    null == this.modules[6][e] &&
                        (this.modules[6][e] = e % 2 == 0);
            }),
            (h.prototype.setupPositionAdjustPattern = function() {
                for (
                    var t = _.QRUtil.getPatternPosition(this.typeNumber), e = 0;
                    e < t.length;
                    e++
                )
                    for (var i = 0; i < t.length; i++) {
                        var r = t[e],
                            s = t[i];
                        if (null == this.modules[r][s])
                            for (var n = -2; 2 >= n; n++)
                                for (var o = -2; 2 >= o; o++)
                                    -2 == n ||
                                    2 == n ||
                                    -2 == o ||
                                    2 == o ||
                                    (0 == n && 0 == o)
                                        ? (this.modules[r + n][s + o] = !0)
                                        : (this.modules[r + n][s + o] = !1);
                    }
            }),
            (h.prototype.setupTypeNumber = function(t) {
                for (
                    var e = _.QRUtil.getBCHTypeNumber(this.typeNumber), i = 0;
                    18 > i;
                    i++
                ) {
                    var r = !t && 1 == ((e >> i) & 1);
                    this.modules[Math.floor(i / 3)][
                        (i % 3) + this.moduleCount - 8 - 3
                    ] = r;
                }
                for (var i = 0; 18 > i; i++) {
                    var r = !t && 1 == ((e >> i) & 1);
                    this.modules[(i % 3) + this.moduleCount - 8 - 3][
                        Math.floor(i / 3)
                    ] = r;
                }
            }),
            (h.prototype.setupTypeInfo = function(t, e) {
                for (
                    var i = (this.errorCorrectLevel << 3) | e,
                        r = _.QRUtil.getBCHTypeInfo(i),
                        s = 0;
                    15 > s;
                    s++
                ) {
                    var n = !t && 1 == ((r >> s) & 1);
                    6 > s
                        ? (this.modules[s][8] = n)
                        : 8 > s
                            ? (this.modules[s + 1][8] = n)
                            : (this.modules[this.moduleCount - 15 + s][8] = n);
                }
                for (var s = 0; 15 > s; s++) {
                    var n = !t && 1 == ((r >> s) & 1);
                    8 > s
                        ? (this.modules[8][this.moduleCount - s - 1] = n)
                        : 9 > s
                            ? (this.modules[8][15 - s - 1 + 1] = n)
                            : (this.modules[8][15 - s - 1] = n);
                }
                this.modules[this.moduleCount - 8][8] = !t;
            }),
            (h.prototype.mapData = function(t, e) {
                for (
                    var i = -1,
                        r = this.moduleCount - 1,
                        s = 7,
                        n = 0,
                        o = this.moduleCount - 1;
                    o > 0;
                    o -= 2
                )
                    for (6 == o && o--; ; ) {
                        for (var a = 0; 2 > a; a++)
                            if (null == this.modules[r][o - a]) {
                                var h = !1;
                                n < t.length && (h = 1 == ((t[n] >>> s) & 1));
                                var u = _.QRUtil.getMask(e, r, o - a);
                                u && (h = !h),
                                    (this.modules[r][o - a] = h),
                                    s--,
                                    -1 == s && (n++, (s = 7));
                            }
                        if (((r += i), 0 > r || this.moduleCount <= r)) {
                            (r -= i), (i = -i);
                            break;
                        }
                    }
            }),
            (h.createData = function(t, e, i) {
                for (
                    var r = _.QRRSBlock.getRSBlocks(t, e),
                        s = new _.QRBitBuffer(),
                        n = 0;
                    n < i.length;
                    n++
                ) {
                    var o = i[n];
                    s.put(o.mode, 4),
                        s.put(
                            o.getLength(),
                            _.QRUtil.getLengthInBits(o.mode, t)
                        ),
                        o.write(s);
                }
                for (var a = 0, n = 0; n < r.length; n++) a += r[n].dataCount;
                if (s.getLengthInBits() > 8 * a)
                    throw new Error(
                        'code length overflow. (' +
                            s.getLengthInBits() +
                            '>' +
                            8 * a +
                            ')'
                    );
                for (
                    s.getLengthInBits() + 4 <= 8 * a && s.put(0, 4);
                    s.getLengthInBits() % 8 != 0;

                )
                    s.putBit(!1);
                for (
                    ;
                    !(s.getLengthInBits() >= 8 * a) &&
                    (s.put(h.PAD0, 8), !(s.getLengthInBits() >= 8 * a));

                )
                    s.put(h.PAD1, 8);
                return h.createBytes(s, r);
            }),
            (h.createBytes = function(t, e) {
                for (
                    var i = 0,
                        r = 0,
                        s = 0,
                        n = new Array(e.length),
                        o = new Array(e.length),
                        a = 0;
                    a < e.length;
                    a++
                ) {
                    var h = e[a].dataCount,
                        u = e[a].totalCount - h;
                    (r = Math.max(r, h)),
                        (s = Math.max(s, u)),
                        (n[a] = new Array(h));
                    for (var c = 0; c < n[a].length; c++)
                        n[a][c] = 255 & t.buffer[c + i];
                    i += h;
                    var f = _.QRUtil.getErrorCorrectPolynomial(u),
                        C = new _.QRPolynomial(n[a], f.getLength() - 1),
                        l = C.mod(f);
                    o[a] = new Array(f.getLength() - 1);
                    for (var c = 0; c < o[a].length; c++) {
                        var m = c + l.getLength() - o[a].length;
                        o[a][c] = m >= 0 ? l.get(m) : 0;
                    }
                }
                for (var d = 0, c = 0; c < e.length; c++) d += e[c].totalCount;
                for (var v = new Array(d), G = 0, c = 0; r > c; c++)
                    for (var a = 0; a < e.length; a++)
                        c < n[a].length && (v[G++] = n[a][c]);
                for (var c = 0; s > c; c++)
                    for (var a = 0; a < e.length; a++)
                        c < o[a].length && (v[G++] = o[a][c]);
                return v;
            }),
            (h.PAD0 = 236),
            (h.PAD1 = 17),
            h
        );
    })();
    (_.QRCodeModel = t), __reflect(t.prototype, 'qr.QRCodeModel');
})(qr || (qr = {}));
var qr;
!(function(t) {
    var e = (function() {
        function t() {}
        return (t.L = 1), (t.M = 0), (t.Q = 3), (t.H = 2), t;
    })();
    (t.QRErrorCorrectLevel = e),
        __reflect(e.prototype, 'qr.QRErrorCorrectLevel');
})(qr || (qr = {}));
var qr;
!(function(t) {
    var e = (function() {
        function t() {}
        return (
            (t.PATTERN000 = 0),
            (t.PATTERN001 = 1),
            (t.PATTERN010 = 2),
            (t.PATTERN011 = 3),
            (t.PATTERN100 = 4),
            (t.PATTERN101 = 5),
            (t.PATTERN110 = 6),
            (t.PATTERN111 = 7),
            t
        );
    })();
    (t.QRMaskPattern = e), __reflect(e.prototype, 'qr.QRMaskPattern');
})(qr || (qr = {}));
var qr;
!(function(t) {
    var e = (function() {
        function e() {}
        return (
            (e.glog = function(t) {
                return (
                    e.isInit || e.init(),
                    1 > t && dclib('错误:n=' + t),
                    e.LOG_TABLE[t]
                );
            }),
            (e.gexp = function(t) {
                for (e.isInit || e.init(); 0 > t; ) t += 255;
                for (; t >= 256; ) t -= 255;
                return e.EXP_TABLE[t];
            }),
            (e.init = function() {
                e.isInit = !0;
                for (var t = 0; 8 > t; t++) e.EXP_TABLE[t] = 1 << t;
                for (var t = 8; 256 > t; t++)
                    e.EXP_TABLE[t] =
                        e.EXP_TABLE[t - 4] ^
                        e.EXP_TABLE[t - 5] ^
                        e.EXP_TABLE[t - 6] ^
                        e.EXP_TABLE[t - 8];
                for (var t = 0; 255 > t; t++) e.LOG_TABLE[e.EXP_TABLE[t]] = t;
            }),
            (e.EXP_TABLE = new Array(256)),
            (e.LOG_TABLE = new Array(256)),
            e
        );
    })();
    (t.QRMath = e), __reflect(e.prototype, 'qr.QRMath');
})(qr || (qr = {}));
var qr;
!(function(t) {
    var e = (function() {
        function t() {}
        return (
            (t.MODE_NUMBER = 1),
            (t.MODE_ALPHA_NUM = 2),
            (t.MODE_8BIT_BYTE = 4),
            (t.MODE_KANJI = 8),
            t
        );
    })();
    (t.QRMode = e), __reflect(e.prototype, 'qr.QRMode');
})(qr || (qr = {}));
var qr;
!(function(n) {
    var t = (function() {
        function s(t, e) {
            if (void 0 == t.length) throw new Error(t.length + '/' + e);
            for (var i = 0; i < t.length && 0 == t[i]; ) i++;
            this.num = new Array(t.length - i + e);
            for (var r = 0; r < t.length - i; r++) this.num[r] = t[r + i];
        }
        return (
            (s.prototype.get = function(t) {
                return this.num[t];
            }),
            (s.prototype.getLength = function() {
                return this.num.length;
            }),
            (s.prototype.multiply = function(t) {
                for (
                    var e = new Array(this.getLength() + t.getLength() - 1),
                        i = 0;
                    i < this.getLength();
                    i++
                )
                    for (var r = 0; r < t.getLength(); r++)
                        e[i + r] ^= n.QRMath.gexp(
                            n.QRMath.glog(this.get(i)) + n.QRMath.glog(t.get(r))
                        );
                return new s(e, 0);
            }),
            (s.prototype.mod = function(t) {
                if (this.getLength() - t.getLength() < 0) return this;
                for (
                    var e =
                            n.QRMath.glog(this.get(0)) -
                            n.QRMath.glog(t.get(0)),
                        i = new Array(this.getLength()),
                        r = 0;
                    r < this.getLength();
                    r++
                )
                    i[r] = this.get(r);
                for (var r = 0; r < t.getLength(); r++)
                    i[r] ^= n.QRMath.gexp(n.QRMath.glog(t.get(r)) + e);
                return new s(i, 0).mod(t);
            }),
            s
        );
    })();
    (n.QRPolynomial = t), __reflect(t.prototype, 'qr.QRPolynomial');
})(qr || (qr = {}));
var qr;
!(function(i) {
    var t = (function() {
        function c(t, e) {
            (this.totalCount = t), (this.dataCount = e);
        }
        return (
            (c.RS_BLOCK_TABLE = [
                [1, 26, 19],
                [1, 26, 16],
                [1, 26, 13],
                [1, 26, 9],
                [1, 44, 34],
                [1, 44, 28],
                [1, 44, 22],
                [1, 44, 16],
                [1, 70, 55],
                [1, 70, 44],
                [2, 35, 17],
                [2, 35, 13],
                [1, 100, 80],
                [2, 50, 32],
                [2, 50, 24],
                [4, 25, 9],
                [1, 134, 108],
                [2, 67, 43],
                [2, 33, 15, 2, 34, 16],
                [2, 33, 11, 2, 34, 12],
                [2, 86, 68],
                [4, 43, 27],
                [4, 43, 19],
                [4, 43, 15],
                [2, 98, 78],
                [4, 49, 31],
                [2, 32, 14, 4, 33, 15],
                [4, 39, 13, 1, 40, 14],
                [2, 121, 97],
                [2, 60, 38, 2, 61, 39],
                [4, 40, 18, 2, 41, 19],
                [4, 40, 14, 2, 41, 15],
                [2, 146, 116],
                [3, 58, 36, 2, 59, 37],
                [4, 36, 16, 4, 37, 17],
                [4, 36, 12, 4, 37, 13],
                [2, 86, 68, 2, 87, 69],
                [4, 69, 43, 1, 70, 44],
                [6, 43, 19, 2, 44, 20],
                [6, 43, 15, 2, 44, 16],
                [4, 101, 81],
                [1, 80, 50, 4, 81, 51],
                [4, 50, 22, 4, 51, 23],
                [3, 36, 12, 8, 37, 13],
                [2, 116, 92, 2, 117, 93],
                [6, 58, 36, 2, 59, 37],
                [4, 46, 20, 6, 47, 21],
                [7, 42, 14, 4, 43, 15],
                [4, 133, 107],
                [8, 59, 37, 1, 60, 38],
                [8, 44, 20, 4, 45, 21],
                [12, 33, 11, 4, 34, 12],
                [3, 145, 115, 1, 146, 116],
                [4, 64, 40, 5, 65, 41],
                [11, 36, 16, 5, 37, 17],
                [11, 36, 12, 5, 37, 13],
                [5, 109, 87, 1, 110, 88],
                [5, 65, 41, 5, 66, 42],
                [5, 54, 24, 7, 55, 25],
                [11, 36, 12],
                [5, 122, 98, 1, 123, 99],
                [7, 73, 45, 3, 74, 46],
                [15, 43, 19, 2, 44, 20],
                [3, 45, 15, 13, 46, 16],
                [1, 135, 107, 5, 136, 108],
                [10, 74, 46, 1, 75, 47],
                [1, 50, 22, 15, 51, 23],
                [2, 42, 14, 17, 43, 15],
                [5, 150, 120, 1, 151, 121],
                [9, 69, 43, 4, 70, 44],
                [17, 50, 22, 1, 51, 23],
                [2, 42, 14, 19, 43, 15],
                [3, 141, 113, 4, 142, 114],
                [3, 70, 44, 11, 71, 45],
                [17, 47, 21, 4, 48, 22],
                [9, 39, 13, 16, 40, 14],
                [3, 135, 107, 5, 136, 108],
                [3, 67, 41, 13, 68, 42],
                [15, 54, 24, 5, 55, 25],
                [15, 43, 15, 10, 44, 16],
                [4, 144, 116, 4, 145, 117],
                [17, 68, 42],
                [17, 50, 22, 6, 51, 23],
                [19, 46, 16, 6, 47, 17],
                [2, 139, 111, 7, 140, 112],
                [17, 74, 46],
                [7, 54, 24, 16, 55, 25],
                [34, 37, 13],
                [4, 151, 121, 5, 152, 122],
                [4, 75, 47, 14, 76, 48],
                [11, 54, 24, 14, 55, 25],
                [16, 45, 15, 14, 46, 16],
                [6, 147, 117, 4, 148, 118],
                [6, 73, 45, 14, 74, 46],
                [11, 54, 24, 16, 55, 25],
                [30, 46, 16, 2, 47, 17],
                [8, 132, 106, 4, 133, 107],
                [8, 75, 47, 13, 76, 48],
                [7, 54, 24, 22, 55, 25],
                [22, 45, 15, 13, 46, 16],
                [10, 142, 114, 2, 143, 115],
                [19, 74, 46, 4, 75, 47],
                [28, 50, 22, 6, 51, 23],
                [33, 46, 16, 4, 47, 17],
                [8, 152, 122, 4, 153, 123],
                [22, 73, 45, 3, 74, 46],
                [8, 53, 23, 26, 54, 24],
                [12, 45, 15, 28, 46, 16],
                [3, 147, 117, 10, 148, 118],
                [3, 73, 45, 23, 74, 46],
                [4, 54, 24, 31, 55, 25],
                [11, 45, 15, 31, 46, 16],
                [7, 146, 116, 7, 147, 117],
                [21, 73, 45, 7, 74, 46],
                [1, 53, 23, 37, 54, 24],
                [19, 45, 15, 26, 46, 16],
                [5, 145, 115, 10, 146, 116],
                [19, 75, 47, 10, 76, 48],
                [15, 54, 24, 25, 55, 25],
                [23, 45, 15, 25, 46, 16],
                [13, 145, 115, 3, 146, 116],
                [2, 74, 46, 29, 75, 47],
                [42, 54, 24, 1, 55, 25],
                [23, 45, 15, 28, 46, 16],
                [17, 145, 115],
                [10, 74, 46, 23, 75, 47],
                [10, 54, 24, 35, 55, 25],
                [19, 45, 15, 35, 46, 16],
                [17, 145, 115, 1, 146, 116],
                [14, 74, 46, 21, 75, 47],
                [29, 54, 24, 19, 55, 25],
                [11, 45, 15, 46, 46, 16],
                [13, 145, 115, 6, 146, 116],
                [14, 74, 46, 23, 75, 47],
                [44, 54, 24, 7, 55, 25],
                [59, 46, 16, 1, 47, 17],
                [12, 151, 121, 7, 152, 122],
                [12, 75, 47, 26, 76, 48],
                [39, 54, 24, 14, 55, 25],
                [22, 45, 15, 41, 46, 16],
                [6, 151, 121, 14, 152, 122],
                [6, 75, 47, 34, 76, 48],
                [46, 54, 24, 10, 55, 25],
                [2, 45, 15, 64, 46, 16],
                [17, 152, 122, 4, 153, 123],
                [29, 74, 46, 14, 75, 47],
                [49, 54, 24, 10, 55, 25],
                [24, 45, 15, 46, 46, 16],
                [4, 152, 122, 18, 153, 123],
                [13, 74, 46, 32, 75, 47],
                [48, 54, 24, 14, 55, 25],
                [42, 45, 15, 32, 46, 16],
                [20, 147, 117, 4, 148, 118],
                [40, 75, 47, 7, 76, 48],
                [43, 54, 24, 22, 55, 25],
                [10, 45, 15, 67, 46, 16],
                [19, 148, 118, 6, 149, 119],
                [18, 75, 47, 31, 76, 48],
                [34, 54, 24, 34, 55, 25],
                [20, 45, 15, 61, 46, 16]
            ]),
            (c.getRSBlocks = function(t, e) {
                var i = c.getRsBlockTable(t, e);
                if (void 0 == i)
                    throw new Error(
                        'bad rs block @ typeNumber:' +
                            t +
                            '/errorCorrectLevel:' +
                            e
                    );
                for (var r = i.length / 3, s = [], n = 0; r > n; n++)
                    for (
                        var o = i[3 * n + 0],
                            a = i[3 * n + 1],
                            h = i[3 * n + 2],
                            u = 0;
                        o > u;
                        u++
                    )
                        s.push(new c(a, h));
                return s;
            }),
            (c.getRsBlockTable = function(t, e) {
                switch (e) {
                    case i.QRErrorCorrectLevel.L:
                        return c.RS_BLOCK_TABLE[4 * (t - 1) + 0];
                    case i.QRErrorCorrectLevel.M:
                        return c.RS_BLOCK_TABLE[4 * (t - 1) + 1];
                    case i.QRErrorCorrectLevel.Q:
                        return c.RS_BLOCK_TABLE[4 * (t - 1) + 2];
                    case i.QRErrorCorrectLevel.H:
                        return c.RS_BLOCK_TABLE[4 * (t - 1) + 3];
                    default:
                        return;
                }
            }),
            c
        );
    })();
    (i.QRRSBlock = t), __reflect(t.prototype, 'qr.QRRSBlock');
})(qr || (qr = {}));
var qr;
!(function(h) {
    var t = (function() {
        function a() {}
        return (
            (a.getBCHTypeInfo = function(t) {
                for (
                    var e = t << 10;
                    a.getBCHDigit(e) - a.getBCHDigit(a.G15) >= 0;

                )
                    e ^= a.G15 << (a.getBCHDigit(e) - a.getBCHDigit(a.G15));
                return ((t << 10) | e) ^ a.G15_MASK;
            }),
            (a.getBCHTypeNumber = function(t) {
                for (
                    var e = t << 12;
                    a.getBCHDigit(e) - a.getBCHDigit(a.G18) >= 0;

                )
                    e ^= a.G18 << (a.getBCHDigit(e) - a.getBCHDigit(a.G18));
                return (t << 12) | e;
            }),
            (a.getBCHDigit = function(t) {
                for (var e = 0; 0 != t; ) e++, (t >>>= 1);
                return e;
            }),
            (a.getPatternPosition = function(t) {
                return a.PATTERN_POSITION_TABLE[t - 1];
            }),
            (a.getMask = function(t, e, i) {
                switch (t) {
                    case h.QRMaskPattern.PATTERN000:
                        return (e + i) % 2 == 0;
                    case h.QRMaskPattern.PATTERN001:
                        return e % 2 == 0;
                    case h.QRMaskPattern.PATTERN010:
                        return i % 3 == 0;
                    case h.QRMaskPattern.PATTERN011:
                        return (e + i) % 3 == 0;
                    case h.QRMaskPattern.PATTERN100:
                        return (Math.floor(e / 2) + Math.floor(i / 3)) % 2 == 0;
                    case h.QRMaskPattern.PATTERN101:
                        return ((e * i) % 2) + ((e * i) % 3) == 0;
                    case h.QRMaskPattern.PATTERN110:
                        return (((e * i) % 2) + ((e * i) % 3)) % 2 == 0;
                    case h.QRMaskPattern.PATTERN111:
                        return (((e * i) % 3) + ((e + i) % 2)) % 2 == 0;
                    default:
                        throw new Error('bad maskPattern:' + t);
                }
            }),
            (a.getErrorCorrectPolynomial = function(t) {
                for (var e = new h.QRPolynomial([1], 0), i = 0; t > i; i++)
                    e = e.multiply(
                        new h.QRPolynomial([1, h.QRMath.gexp(i)], 0)
                    );
                return e;
            }),
            (a.getLengthInBits = function(t, e) {
                if (e >= 1 && 10 > e)
                    switch (t) {
                        case h.QRMode.MODE_NUMBER:
                            return 10;
                        case h.QRMode.MODE_ALPHA_NUM:
                            return 9;
                        case h.QRMode.MODE_8BIT_BYTE:
                            return 8;
                        case h.QRMode.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error('mode:' + t);
                    }
                else if (27 > e)
                    switch (t) {
                        case h.QRMode.MODE_NUMBER:
                            return 12;
                        case h.QRMode.MODE_ALPHA_NUM:
                            return 11;
                        case h.QRMode.MODE_8BIT_BYTE:
                            return 16;
                        case h.QRMode.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error('mode:' + t);
                    }
                else {
                    if (!(41 > e)) throw new Error('type:' + e);
                    switch (t) {
                        case h.QRMode.MODE_NUMBER:
                            return 14;
                        case h.QRMode.MODE_ALPHA_NUM:
                            return 13;
                        case h.QRMode.MODE_8BIT_BYTE:
                            return 16;
                        case h.QRMode.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error('mode:' + t);
                    }
                }
            }),
            (a.getLostPoint = function(t) {
                for (var e = t.getModuleCount(), i = 0, r = 0; e > r; r++)
                    for (var s = 0; e > s; s++) {
                        for (var n = 0, o = t.isDark(r, s), a = -1; 1 >= a; a++)
                            if (!(0 > r + a || r + a >= e))
                                for (var h = -1; 1 >= h; h++)
                                    0 > s + h ||
                                        s + h >= e ||
                                        ((0 != a || 0 != h) &&
                                            o == t.isDark(r + a, s + h) &&
                                            n++);
                        n > 5 && (i += 3 + n - 5);
                    }
                for (var r = 0; e - 1 > r; r++)
                    for (var s = 0; e - 1 > s; s++) {
                        var u = 0;
                        t.isDark(r, s) && u++,
                            t.isDark(r + 1, s) && u++,
                            t.isDark(r, s + 1) && u++,
                            t.isDark(r + 1, s + 1) && u++,
                            (0 == u || 4 == u) && (i += 3);
                    }
                for (var r = 0; e > r; r++)
                    for (var s = 0; e - 6 > s; s++)
                        t.isDark(r, s) &&
                            !t.isDark(r, s + 1) &&
                            t.isDark(r, s + 2) &&
                            t.isDark(r, s + 3) &&
                            t.isDark(r, s + 4) &&
                            !t.isDark(r, s + 5) &&
                            t.isDark(r, s + 6) &&
                            (i += 40);
                for (var s = 0; e > s; s++)
                    for (var r = 0; e - 6 > r; r++)
                        t.isDark(r, s) &&
                            !t.isDark(r + 1, s) &&
                            t.isDark(r + 2, s) &&
                            t.isDark(r + 3, s) &&
                            t.isDark(r + 4, s) &&
                            !t.isDark(r + 5, s) &&
                            t.isDark(r + 6, s) &&
                            (i += 40);
                for (var c = 0, s = 0; e > s; s++)
                    for (var r = 0; e > r; r++) t.isDark(r, s) && c++;
                var f = Math.abs((100 * c) / e / e - 50) / 5;
                return (i += 10 * f);
            }),
            (a.prototype.static_isSupportCanvas = function() {
                return 'undefined' != typeof CanvasRenderingContext2D;
            }),
            (a._getTypeNumber = function(t, e) {
                for (
                    var i = 1,
                        r = a._getUTF8Length(t),
                        s = 0,
                        n = a.QRCodeLimitLength.length;
                    n >= s;
                    s++
                ) {
                    var o = 0;
                    switch (e) {
                        case h.QRErrorCorrectLevel.L:
                            o = a.QRCodeLimitLength[s][0];
                            break;
                        case h.QRErrorCorrectLevel.M:
                            o = a.QRCodeLimitLength[s][1];
                            break;
                        case h.QRErrorCorrectLevel.Q:
                            o = a.QRCodeLimitLength[s][2];
                            break;
                        case h.QRErrorCorrectLevel.H:
                            o = a.QRCodeLimitLength[s][3];
                    }
                    if (o >= r) break;
                    i++;
                }
                if (i > a.QRCodeLimitLength.length)
                    throw new Error('Too long data');
                return i;
            }),
            (a._getUTF8Length = function(t) {
                var e = encodeURI(t)
                    .toString()
                    .replace(/\%[0-9a-fA-F]{2}/g, 'a');
                return e.length + (e.length != t ? 3 : 0);
            }),
            (a.PATTERN_POSITION_TABLE = [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170]
            ]),
            (a.G15 = 1335),
            (a.G18 = 7973),
            (a.G15_MASK = 21522),
            (a.QRCodeLimitLength = [
                [17, 14, 11, 7],
                [32, 26, 20, 14],
                [53, 42, 32, 24],
                [78, 62, 46, 34],
                [106, 84, 60, 44],
                [134, 106, 74, 58],
                [154, 122, 86, 64],
                [192, 152, 108, 84],
                [230, 180, 130, 98],
                [271, 213, 151, 119],
                [321, 251, 177, 137],
                [367, 287, 203, 155],
                [425, 331, 241, 177],
                [458, 362, 258, 194],
                [520, 412, 292, 220],
                [586, 450, 322, 250],
                [644, 504, 364, 280],
                [718, 560, 394, 310],
                [792, 624, 442, 338],
                [858, 666, 482, 382],
                [929, 711, 509, 403],
                [1003, 779, 565, 439],
                [1091, 857, 611, 461],
                [1171, 911, 661, 511],
                [1273, 997, 715, 535],
                [1367, 1059, 751, 593],
                [1465, 1125, 805, 625],
                [1528, 1190, 868, 658],
                [1628, 1264, 908, 698],
                [1732, 1370, 982, 742],
                [1840, 1452, 1030, 790],
                [1952, 1538, 1112, 842],
                [2068, 1628, 1168, 898],
                [2188, 1722, 1228, 958],
                [2303, 1809, 1283, 983],
                [2431, 1911, 1351, 1051],
                [2563, 1989, 1423, 1093],
                [2699, 2099, 1499, 1139],
                [2809, 2213, 1579, 1219],
                [2953, 2331, 1663, 1273]
            ]),
            a
        );
    })();
    (h.QRUtil = t), __reflect(t.prototype, 'qr.QRUtil');
})(qr || (qr = {}));
var Core;
!(function(s) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.loadingGrpList = []), (t.loadedThemeMap = new s.HashMap()), t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            (t.prototype.loadResBundle = function(t, e) {
                var r = this;
                (this.finishCb = e),
                    t.forEach(function(t) {
                        if (t.thm && !r.loadedThemeMap.has(t.thm)) {
                            var e = s.loadTheme(
                                t.resRoot + t.thm,
                                r.onLoadComplete.bind(r, null),
                                r
                            );
                            r.loadedThemeMap.set(t.thm, e);
                        }
                    }),
                    (this.loadingGrpList = []),
                    t.forEach(function(t) {
                        if (t.resRoot) {
                            var e = t.grpName + '_' + s.getLang(),
                                i = t.grpName + '_' + s.LANG_BACKUP;
                            t.grpName &&
                                !RES.isGroupLoaded(e) &&
                                r.loadingGrpList.push(e),
                                t.grpName &&
                                    !RES.isGroupLoaded(i) &&
                                    r.loadingGrpList.push(i),
                                t.grpName &&
                                    !RES.isGroupLoaded(t.grpName) &&
                                    r.loadingGrpList.push(t.grpName);
                        }
                    }),
                    this.loadingGrpList.length > 0
                        ? ((this.gBundleLoader = s.SilentLoadManager.instance.loadAtOnce(
                              this.loadingGrpList
                          )),
                          this.gBundleLoader.addEventListener(
                              s.EVENT_PROGRESS,
                              this.onLoadProgress,
                              this
                          ),
                          this.gBundleLoader.addEventListener(
                              s.EVENT_COMPLETE,
                              this.onLoadComplete,
                              this
                          ),
                          this.gBundleLoader.startLoad())
                        : this.onLoadComplete(null);
            }),
            (t.prototype.isThemeLoaded = function() {
                var e = !0;
                return (
                    this.loadedThemeMap.forEach(function(t) {
                        t.initialized || (e = !1);
                    }),
                    e
                );
            }),
            (t.prototype.onLoadProgress = function(t) {
                this.dispatchEventWith(s.EVENT_PROGRESS, !1, t.data);
            }),
            (t.prototype.onLoadComplete = function(t) {
                t &&
                    t.currentTarget === this.gBundleLoader &&
                    (this.gBundleLoader.removeEventListener(
                        s.EVENT_PROGRESS,
                        this.onLoadProgress,
                        this
                    ),
                    this.gBundleLoader.removeEventListener(
                        s.EVENT_COMPLETE,
                        this.onLoadComplete,
                        this
                    )),
                    !this.isThemeLoaded() ||
                        (this.gBundleLoader && !this.gBundleLoader.completed) ||
                        (this.finishCb &&
                            (this.finishCb(), (this.finishCb = null)));
            }),
            t
        );
    })(s.SingletonDispatcher);
    (s.ModuleResLoader = t), __reflect(t.prototype, 'Core.ModuleResLoader');
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var Core;
!(function(r) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.index = -1),
                (t.waitingModuleNameList = r.ExternalData.silentLoad),
                t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            (t.prototype.loadAtOnce = function(t) {
                var e = this,
                    i = !1;
                return (
                    t.forEach(function(t) {
                        e.silentLoader &&
                            e.silentLoader.isGrpLoading(t) &&
                            (i = !0);
                    }, this),
                    i && this.silentLoader && !this.silentLoader.completed
                        ? (this.silentLoader.appendGroup(t), this.silentLoader)
                        : ((this.urgentLoader = new r.GroupBundleLoader(
                              t,
                              r.TAG_URGENT_LOADER,
                              10
                          )),
                          this.urgentLoader.addEventListener(
                              r.EVENT_COMPLETE,
                              this.onLoadComplete,
                              this
                          ),
                          this.urgentLoader)
                );
            }),
            (t.prototype.loadNextModule = function() {
                var t = this;
                if (
                    (this.index++,
                    this.index >= this.waitingModuleNameList.length)
                )
                    return (
                        dclib('All resource prepared!!'),
                        void ExternalProgress('prepare')
                    );
                var e = this.waitingModuleNameList[this.index],
                    i = r.Config.ModuleConfig.instance.moduleInfoMap.get(e);
                (this.loadingModuleInfo = i),
                    require(this.waitingModuleNameList, function() {
                        i.thm
                            ? r.loadTheme(
                                  i.resRoot + i.thm,
                                  t.onConfigComplete,
                                  t
                              )
                            : t.onConfigComplete();
                    });
            }),
            (t.prototype.onConfigComplete = function() {
                var t = this.loadingModuleInfo.grpName;
                (this.loadingLang = r.LocalizeStore.instance.lang),
                    (this.silentLoader = new r.GroupBundleLoader(
                        [
                            t,
                            t + '_' + this.loadingLang,
                            t + '_' + r.LANG_BACKUP
                        ],
                        r.TAG_SILENT_LOADER,
                        5
                    )),
                    this.silentLoader.addEventListener(
                        r.EVENT_COMPLETE,
                        this.onLoadComplete,
                        this
                    ),
                    this.silentLoader.startLoad();
            }),
            (t.prototype.onLoadComplete = function(t) {
                switch (t.data) {
                    case r.TAG_SILENT_LOADER:
                        this.silentLoader.removeEventListener(
                            r.EVENT_COMPLETE,
                            this.onLoadComplete,
                            this
                        ),
                            this.loadNextModule();
                        break;
                    case r.TAG_URGENT_LOADER:
                        this.urgentLoader.removeEventListener(
                            r.EVENT_COMPLETE,
                            this.onLoadComplete,
                            this
                        );
                }
                this.dispatchEventWith(r.EVENT_COMPLETE);
            }),
            t
        );
    })(r.SingletonDispatcher);
    (r.SilentLoadManager = t), __reflect(t.prototype, 'Core.SilentLoadManager');
})(Core || (Core = {}));
var Core;
!(function(m) {
    var t;
    !(function(t) {
        function e() {
            return m.getSimpleCMD(m.Protocol.KEEP_ALIVE);
        }
        function i() {
            return m.getSimpleCMD(m.Protocol.UCGATE_ALIVE);
        }
        function r() {
            var t = m.startCMD(m.Protocol.CLIENT_DEMO_LOGIN);
            return t.writeInt(0), m.endCMD(t);
        }
        function s(t, e) {
            var i = m.startCMD(m.Protocol.CLIENT_LOGIN);
            i.writeBytes(m.stringToBytes(t, m.la));
            var r = m.hexStrToBytes(e);
            return i.writeBytes(r), i.writeInt(0), m.endCMD(i);
        }
        function n(t, e) {
            var i = m.startCMD(m.Protocol.CHAT_LOGIN_SERVER);
            return (
                i.writeBytes(m.stringToBytes(t, m.la)),
                i.writeDouble(e[0]),
                i.writeDouble(e[1]),
                m.endCMD(i)
            );
        }
        function o(t, e, i) {
            var r = m.startCMD(m.Protocol.CHAT_LOGIN_SERVER_EXT);
            return (
                r.writeBytes(m.stringToBytes(i, 4)),
                r.writeBytes(m.stringToBytes(t, m.la)),
                r.writeByte(m.CHAT_LOGIN_TYPE),
                r.writeByte(0),
                r.writeByte(0),
                r.writeDouble(e[0]),
                r.writeDouble(e[1]),
                m.endCMD(r)
            );
        }
        function a(t, e, i, r) {
            var s = m.startCMD(m.Protocol.CHAT_ENTER_TABLE);
            return (
                s.writeBytes(m.stringToBytes(t, 4)),
                s.writeBytes(m.stringToBytes(e, 4)),
                s.writeInt(i),
                s.writeByte(r),
                m.endCMD(s)
            );
        }
        function h(t) {
            var e = m.startCMD(m.Protocol.CHAT_NICKNAME_CHANGE),
                i = '';
            return (
                t && t.length > 0 && (i = t),
                e.writeBytes(m.stringToBytes(i, m.ma)),
                m.endCMD(e)
            );
        }
        function u(t) {
            void 0 === t && (t = 0);
            var e = m.startCMD(m.Protocol.CHAT_QUICK_MESSAGE_LIST);
            return e.writeInt(t), m.endCMD(e);
        }
        function c(t, e, i, r) {
            var s = m.startCMD(m.Protocol.CHAT_SEND_MESSAGE);
            s.writeBytes(m.stringToBytes(t, m._n)),
                s.writeBytes(m.stringToBytes('0', 4)),
                s.writeByte(i),
                s.writeByte(1);
            var n = new egret.ByteArray();
            return (
                n.writeUTFBytes(r),
                s.writeUnsignedInt(n.length),
                s.writeBytes(m.stringToBytes(r, n.length)),
                m.endCMD(s)
            );
        }
        function f(t, e, i, r) {
            var s = m.startCMD(m.Protocol.CHAT_SEND_QUICK_MESSAGE);
            return (
                s.writeBytes(m.stringToBytes(t, m._n)),
                s.writeBytes(m.stringToBytes('0', 4)),
                s.writeByte(r),
                s.writeUnsignedInt(e),
                s.writeBytes(m.stringToBytes(i, 2)),
                m.endCMD(s)
            );
        }
        function C(t, e) {
            var i = m.startCMD(m.Protocol.CLIENT_LOGIN_LIVE_PLATFORM_SESSION);
            return (
                i.writeBytes(m.stringToBytes(t, m.la)),
                i.writeDouble(e[0]),
                i.writeDouble(e[1]),
                i.writeUnsignedInt(0),
                m.endCMD(i)
            );
        }
        function l(t, e) {
            var i = m.startCMD(m.Protocol.CRYPTO_USER_KEY_ACK);
            (t.position = 0), (e.position = 0);
            for (var r = 0; 4 > r; r++)
                i.writeByte(t.readByte() ^ e.readByte());
            return m.endCMD(i);
        }
        (t.getCMDKeepAlive = e),
            (t.getCMDUCGateAlive = i),
            (t.getCMDClientDemoLogin = r),
            (t.getCMDClientLogin = s),
            (t.getCMDChatLoginServer = n),
            (t.getCMDChatLoginServerExt = o),
            (t.getCMDChatEnterTable = a),
            (t.getCMDChatChangeNickname = h),
            (t.getCMDChatQuickMessageList = u),
            (t.getCMDChatSendMessage = c),
            (t.getCMDChatSendQuickMessage = f),
            (t.getCMDLoginLivePlatform = C),
            (t.getCMDCryptoKeyACK = l);
    })((t = m.APIManager || (m.APIManager = {})));
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        (t.KEEP_ALIVE = 1),
            (t.UCGATE_ALIVE = 8781826),
            (t.CLIENT_LOGIN = 69633),
            (t.Tu = 131073),
            (t.CLIENT_DEMO_LOGIN = 69649),
            (t.xu = 73729),
            (t.Ou = 131087),
            (t.CHAT_LOGIN_SERVER = 397313),
            (t.CHAT_LOGIN_SERVER_EXT = 401409),
            (t.Iu = 401410),
            (t.CHAT_DISABLE_KEY = 397314),
            (t.CHAT_ENTER_TABLE = 397315),
            (t.Ru = 399769),
            (t.CHAT_QUICK_MESSAGE_LIST = 397361),
            (t.Lu = 397362),
            (t.ju = 397575),
            (t.Bu = 397573),
            (t.Au = 131082),
            (t.CHAT_SEND_MESSAGE = 397386),
            (t.CHAT_SEND_QUICK_MESSAGE = 397319),
            (t.CHAT_NICKNAME_CHANGE = 397345),
            (t.CHAT_REMOVE_MESSAGE = 397577),
            (t.CLIENT_LOGIN_LIVE_PLATFORM_SESSION = 69669),
            (t.Nu = 301569),
            (t.Mu = 301584),
            (t.Du = 301825),
            (t.CRYPTO_USER_KEY_ACK = 301826),
            (t.CRYPTO_USER_SR = 301840);
    })((e = t.Protocol || (t.Protocol = {})));
})(Core || (Core = {}));
var PCPlaza;
var Core;
!(function(s) {
    var t;
    !(function(t) {
        var e = (function() {
            function r(t) {
                (this.port = t),
                    (this.sortedLines = []),
                    (this.timestamp = Date.now());
            }
            return (
                (r.prototype.isExpired = function() {
                    return Date.now() - this.timestamp > 6e5;
                }),
                (r.setSortedLines = function(t, e) {
                    this._sortedLinesMap ||
                        (this._sortedLinesMap = new s.HashMap());
                    var i = this._sortedLinesMap.get(t);
                    i || ((i = new r(t)), this._sortedLinesMap.set(t, i)),
                        i.sortedLines.push(e);
                }),
                (r.getSortedLines = function(t) {
                    if (!this._sortedLinesMap) return [];
                    var e = this._sortedLinesMap.get(t);
                    return e
                        ? e.isExpired()
                            ? (this._sortedLinesMap['delete'](t), [])
                            : e.sortedLines
                        : [];
                }),
                r
            );
        })();
        (t.SortedLineCache = e),
            __reflect(e.prototype, 'Core.Network.SortedLineCache');
    })((t = s.Network || (s.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.mobileAcountExist = 0 != t.readByte()),
                        (this.gesturePwdExist = 0 != t.readByte()),
                        (t.position += 6),
                        (this.account = t.readDouble()),
                        (this.nickname = t.readUTFBytes(i.ma).trim()),
                        (this.gender = t.readByte()),
                        (this.gameConfig = t.readInt());
                }),
                e
            );
        })(t.ResponseBase);
        (t.Hu = e), __reflect(e.prototype, 'Core.Network.ClientInfoResp');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(r) {
    var t;
    !(function(i) {
        var t = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                Object.defineProperty(e, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(e.prototype, 'urls', {
                    get: function() {
                        return [
                            r.ExternalData.webRoot + r.ExternalData.doForward
                        ];
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.prototype.fetchData = function() {
                    var e = this,
                        t = {
                            module: i.Module.HTTP,
                            sequence: i.Client.instance.sharedSequnce++,
                            method: i.Method.GET,
                            targetType: i.TargetType.JSON,
                            urls: this.urls
                        };
                    i.Client.instance.sendHttpRequest(t, function(t) {
                        switch (t.status) {
                            case i.Status.SUCCESS:
                                e.onRequestSuccess(t.content);
                                break;
                            case i.Status.ERROR:
                            case i.Status.INVALID_REQUEST:
                                e.onRequestFail();
                        }
                    });
                }),
                (e.prototype.onRequestSuccess = function(t) {
                    if (
                        ((this.info = t.info),
                        (this.msg = t.msg),
                        '0' !== t.info)
                    )
                        return void this.onRequestFail();
                    (this.ips = t.ips.slice()),
                        (this.ipdomains =
                            null != t.ipdomains ? t.ipdomains.slice() : []);
                    var e = t.msg.length;
                    (this.pwd = t.msg.substring(6, e - 4)),
                        this.dispatchEventWith(
                            egret.Event.COMPLETE,
                            !1,
                            this.successEventData
                        );
                }),
                (e.prototype.onRequestFail = function() {
                    this.dispatchEventWith(
                        egret.Event.COMPLETE,
                        !1,
                        this.failEventData
                    );
                }),
                Object.defineProperty(e.prototype, 'successEventData', {
                    get: function() {
                        return !0;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, 'failEventData', {
                    get: function() {
                        return !1;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e
            );
        })(r.SingletonDispatcher);
        (i.DoForwardFetcher = t),
            __reflect(t.prototype, 'Core.AGWorker.DoForwardFetcher');
    })((t = r.AGWorker || (r.AGWorker = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(e) {
            function t() {
                return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
                __extends(t, e),
                (t.prototype.$ = function(t) {
                    e.prototype.$.call(this, t),
                        (this.pid = t.readUTFBytes(10)),
                        (this.pcUsername = t.readUTFBytes(i.la));
                }),
                t
            );
        })(t.Ln);
        (t.Uu = e),
            __reflect(e.prototype, 'Core.Network.ClientMobileLoginResp');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        function e(t) {
            return s.ECHO <= t && t <= s.WEBSOCKET;
        }
        function i(t) {
            return n.GET <= t && t <= n.POST;
        }
        function r(t) {
            return o.TEXT <= t && t <= o.XML;
        }
        var s;
        !(function(t) {
            (t[(t.ECHO = 0)] = 'ECHO'),
                (t[(t.HTTP = 1)] = 'HTTP'),
                (t[(t.WEBSOCKET = 2)] = 'WEBSOCKET');
        })((s = t.Module || (t.Module = {}))),
            (t.isModuleValid = e);
        var n;
        !(function(t) {
            (t[(t.GET = 0)] = 'GET'), (t[(t.POST = 1)] = 'POST');
        })((n = t.Method || (t.Method = {}))),
            (t.isMethodValid = i);
        var o;
        !(function(t) {
            (t[(t.TEXT = 0)] = 'TEXT'),
                (t[(t.JSON = 1)] = 'JSON'),
                (t[(t.XML = 2)] = 'XML');
        })((o = t.TargetType || (t.TargetType = {}))),
            (t.isTargetTypeValid = r);
        var a;
        !(function(t) {
            (t[(t.SUCCESS = 0)] = 'SUCCESS'),
                (t[(t.ERROR = 1)] = 'ERROR'),
                (t[(t.INVALID_REQUEST = 2)] = 'INVALID_REQUEST');
        })((a = t.Status || (t.Status = {})));
    })((e = t.AGWorker || (t.AGWorker = {})));
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return __extends(e, t), (e.prototype.$ = function(t) {}), e;
        })(t.ResponseBase);
        (t.pe = e), __reflect(e.prototype, 'Core.Network.UnknownResp');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.loginname = t.readUTFBytes(i.la)),
                        '' === this.loginname &&
                            (this.loginname = i.LoginStore.instance.loginName),
                        (this.Code = t.readInt());
                }),
                e
            );
        })(t.ResponseBase);
        (t.Fu = e), __reflect(e.prototype, 'Core.Network.ChatDisableKeyResp');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var Core;
!(function(e) {
    function r(t) {
        var e = new RegExp('(^|&)' + t + '=([^&]*)(&|$)', 'i'),
            i = location.search.substr(1).match(e);
        return i && i.length >= 2 ? decodeURIComponent(i[2]) : null;
    }
    var t = (function() {
        function t() {}
        return (
            Object.defineProperty(t, 'device', {
                get: function() {
                    return this.getStringByName('device');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'env', {
                get: function() {
                    return this.getStringByName('env');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'useSSL', {
                get: function() {
                    return this.getBooleanByName('useSSL');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'wsProtocol', {
                get: function() {
                    return this.useSSL ? 'wss://' : 'ws://';
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'version', {
                get: function() {
                    return this.getStringByName('version');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'isProd', {
                get: function() {
                    return this.env === e.ENV_PROD;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'pid', {
                get: function() {
                    return this.getStringByName('pid', 'TST');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'username', {
                get: function() {
                    return this.getStringByName('username');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'doForward', {
                get: function() {
                    return this.getStringByName('doForward');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'lang', {
                get: function() {
                    return this.getStringByName('lang');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'directEnterId', {
                get: function() {
                    return this.getStringByName('directEnterId');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'domainName', {
                get: function() {
                    return this.getStringByName('dm');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'webRoot', {
                get: function() {
                    return location.protocol + '//' + location.host;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'cdnConfig', {
                get: function() {
                    return this.gcDataMap.get('cdn');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'showLogin', {
                get: function() {
                    return !this.getBooleanByName('hideLogin');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'cryptoEnabled', {
                get: function() {
                    return this.getBooleanByName('cryptoEnabled');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'videoCryptoEnabled', {
                get: function() {
                    return this.getBooleanByName('videoCryptoEnabled');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'urlEncrypt', {
                get: function() {
                    return this.getStringByName('urlEncrypt').split(',');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'rpEnabled', {
                get: function() {
                    return this.getBooleanByName('rpEnabled');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'rpRecordEnabled', {
                get: function() {
                    return this.getBooleanByName('rpRecordEnabled');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'testAccPrefix', {
                get: function() {
                    return this.getStringByName('testAccPrefix');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'testAccNum', {
                get: function() {
                    return this.getStringByName('testAccNum');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'showSocketLog', {
                get: function() {
                    return this.getBooleanByName('showSocketLog');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'ruleDomain', {
                get: function() {
                    return this.getStringByName('ruleDomain');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'dnsapiEnabled', {
                get: function() {
                    return (
                        this.getBooleanByName('dnsapiEnabled') && this.isProd
                    );
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'silentLoad', {
                get: function() {
                    var t = this.gcDataMap.get('silentLoad');
                    return t ? t : [];
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'password', {
                get: function() {
                    return this.getStringByName('password');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'dnsConfig', {
                get: function() {
                    return this.getStringByName('dnsConfig');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'isPcVersion', {
                get: function() {
                    return this.getBooleanByName('isPcVersion');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'nickname', {
                get: function() {
                    return this.getStringByName('nick');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'userFlag', {
                get: function() {
                    return this.getIntegerByName('userFlag');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'vType', {
                get: function() {
                    return this.getIntegerByName('vType');
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t, 'needAirLogin', {
                get: function() {
                    return this.pid && 'null' === this.gcDataMap.get('pid');
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.getStringByName = function(t, e) {
                void 0 === e && (e = '');
                var i = r(t);
                return i && 'null' !== i
                    ? i
                    : this.gcDataMap
                        ? ((i = this.gcDataMap.get(t)),
                          i && 'null' !== i ? i : e)
                        : e;
            }),
            (t.getBooleanByName = function(t) {
                var e = r(t),
                    i = this.gcDataMap && this.gcDataMap.get(t);
                return 'true' === e || !!i;
            }),
            (t.getIntegerByName = function(t, e) {
                void 0 === e && (e = 0);
                var i = r(t);
                return i && 'null' !== i
                    ? parseInt(i)
                    : this.gcDataMap
                        ? this.gcDataMap.get(t)
                        : e;
            }),
            (t.updateBalance = function(t) {
                VideoGameCore.UserStore.instance &&
                    VideoGameCore.UserStore.instance.updateBalanceFromThridGame(
                        t
                    );
            }),
            t
        );
    })();
    (e.ExternalData = t), __reflect(t.prototype, 'Core.ExternalData');
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.CmdRequest = t.readInt()), (this.Code = t.readInt());
                }),
                e
            );
        })(t.ResponseBase);
        (t.Ku = e), __reflect(e.prototype, 'Core.Network.ChatErrorResp');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.code = t.readInt()),
                        (this.vid = t.readUTFBytes(i._n)),
                        (this.deviceType = t.readByte());
                }),
                e
            );
        })(t.ResponseBase);
        (t.Yu = e),
            __reflect(e.prototype, 'Core.Network.ChatLoginServerExtResp');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(r) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.vid = t.readUTFBytes(r._n)),
                        (this.tableCode = t.readUTFBytes(r.va)),
                        (this.seatNumber = t.readByte()),
                        (this.temp_msgID = t.readInt()),
                        (this.msgID = t.readInt()),
                        (this.sender_loginname = t.readUTFBytes(r.la));
                    var e;
                    (e = t.readUTFBytes(r.ma)), (this.sender_nickname = '');
                    for (var i = 0; i < e.length; i++)
                        e.charCodeAt(i) > 0 &&
                            (this.sender_nickname =
                                this.sender_nickname + '' + e.slice(i, i + 1));
                    (this.msgCodeLen = t.readInt()),
                        (this.message = t.readUTFBytes(this.msgCodeLen)),
                        r.ExternalData.showSocketLog &&
                            dclib(egret.getQualifiedClassName(this), this);
                }),
                (e.prototype.getHex = function(t, e, i, r) {
                    void 0 === r && (r = 0), r > 0 && (t.position += r);
                    for (var s = '', n = 0; e > n; n++) {
                        var o = t.readUnsignedByte().toString(16);
                        s += (i ? '%' : '') + (1 == o.length ? 0 + o : o);
                    }
                    return i ? s.toLocaleUpperCase() : s;
                }),
                e
            );
        })(t.ResponseBase);
        (t.qu = e), __reflect(e.prototype, 'Core.Network.ChatMessageListResp');
    })((t = r.Network || (r.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.vid = t.readUTFBytes(i._n)),
                        (this.temp_msgID = t.readInt()),
                        (this.msgID = t.readInt()),
                        (this.sender_loginname = t.readUTFBytes(i.la)),
                        i.ExternalData.showSocketLog &&
                            dclib(egret.getQualifiedClassName(this), this);
                }),
                e
            );
        })(t.ResponseBase);
        (t.Wu = e),
            __reflect(e.prototype, 'Core.Network.ChatMessageRemoveResp');
    })((t = i.Network || (i.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(o) {
    var t;
    !(function(t) {
        function e(t) {
            var e = '';
            return (
                'hans' == t
                    ? (e = 'ZH')
                    : 'hant' == t
                        ? (e = 'TR')
                        : 'en' == t && (e = 'EN'),
                e
            );
        }
        var i = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    this.version = t.readInt();
                    var e = t.readInt(),
                        i = (new egret.ByteArray(), t.readUTFBytes(e));
                    this.parseConfigXML(i),
                        o.ExternalData.showSocketLog &&
                            dclib(egret.getQualifiedClassName(this), this);
                }),
                (e.prototype.parseConfigXML = function(t) {
                    var i,
                        e = [],
                        r = new o.HashMap(),
                        s = o.XMLReader.read(o.parseXML(t)).find('cmds');
                    s.length > 0 &&
                        s[0].find('cmd').forEach(function(t) {
                            (i = new n()),
                                (i.index = parseInt(t.attr('id'))),
                                (i.gameType = t.attr('gametype')),
                                t.find('lang').forEach(function(t) {
                                    var e = t.attr('value');
                                    'EN' == e
                                        ? (i.msgEn = o.pasteHtmlToString(
                                              t.attr('str')
                                          ))
                                        : 'ZH' == e
                                            ? (i.msgZh = o.pasteHtmlToString(
                                                  t.attr('str')
                                              ))
                                            : 'TR' == e &&
                                              (i.msgTr = o.pasteHtmlToString(
                                                  t.attr('str')
                                              ));
                                }, this),
                                i.gameType.split(',').forEach(function(t) {
                                    r.has(t) ? r.get(t).push(i) : r.set(t, [i]);
                                }, this),
                                e.push(i);
                        }, this),
                        (this.chatInfosMap = r),
                        (this.chatInfos = e);
                }),
                (e.prototype.getHex = function(t, e, i, r) {
                    void 0 === r && (r = 0), r > 0 && (t.position += r);
                    for (var s = '', n = 0; e > n; n++) {
                        var o = t.readUnsignedByte().toString(16);
                        s += (i ? '%' : '') + (1 == o.length ? 0 + o : o);
                    }
                    return i ? s.toLocaleUpperCase() : s;
                }),
                e
            );
        })(t.ResponseBase);
        (t.rc = i),
            __reflect(i.prototype, 'Core.Network.ChatQuickMessageConfigResp'),
            (t.languageString2Type = e);
        var n = (function() {
            function t() {}
            return (
                (t.prototype.messageByLanguageString = function(t) {
                    var e = '';
                    return (e =
                        t == o.LANG_ZH_CONF
                            ? this.msgZh
                            : t == o.LANG_TR_CONF
                                ? this.msgTr
                                : this.msgEn);
                }),
                (t.prototype.messageByLanguageType = function(t) {
                    var e = '';
                    return (e =
                        'hans' == t
                            ? this.msgZh
                            : 'hant' == t
                                ? this.msgTr
                                : this.msgEn);
                }),
                (t.prototype.typeByLanguageType = function(t) {
                    switch (t) {
                        case o.LANG_HANS:
                            return o.LANG_ZH_CONF;
                        case o.LANG_HANT:
                            return o.LANG_TR_CONF;
                        case o.LANG_EN:
                            return o.LANG_EN_CONF;
                    }
                    return o.LANG_EN_CONF;
                }),
                Object.defineProperty(t.prototype, 'message', {
                    get: function() {
                        return this.messageByLanguageType(
                            o.LocalizeStore.instance.lang
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, 'lang', {
                    get: function() {
                        return this.typeByLanguageType(
                            o.LocalizeStore.instance.lang
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t
            );
        })();
        (t.ChatQuickMessageInfo = n),
            __reflect(n.prototype, 'Core.Network.ChatQuickMessageInfo');
    })((t = o.Network || (o.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(r) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.vid = t.readUTFBytes(r._n)),
                        (this.tableCode = t.readUTFBytes(r.va)),
                        (this.seatNumber = t.readByte()),
                        (this.temp_msgID = t.readInt()),
                        (this.msgID = t.readInt()),
                        (this.sender_loginname = t.readUTFBytes(r.la));
                    var e = t.readUTFBytes(r.ma);
                    this.sender_nickname = '';
                    for (var i = 0; i < e.length; i++)
                        e.charCodeAt(i) > 0 &&
                            (this.sender_nickname =
                                this.sender_nickname + '' + e.slice(i, i + 1));
                    (this.cmdID = t.readInt()),
                        (this.lang = t.readUTFBytes(2)),
                        r.ExternalData.showSocketLog &&
                            dclib(egret.getQualifiedClassName(this), this);
                }),
                e
            );
        })(t.ResponseBase);
        (t.nc = e), __reflect(e.prototype, 'Core.Network.ChatQuickMessageResp');
    })((t = r.Network || (r.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    this.decryptKey = new egret.ByteArray();
                    for (var e = 0; 4 > e; e++)
                        this.decryptKey.writeByte(t.readByte());
                }),
                e
            );
        })(t.ResponseBase);
        (t.ac = e),
            __reflect(e.prototype, 'Core.Network.CryptoBroadcastKeyResp');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    var e = this.context.decryptBroadcastKey;
                    if (!e || 0 === e.length)
                        return void console.error('No decypt token found!');
                    this.payloadBytes = new egret.ByteArray();
                    for (var i = 0; i < t.length - 12; i++)
                        (e.position = i % e.length),
                            this.payloadBytes.writeByte(
                                t.readByte() ^ e.readByte()
                            );
                }),
                e
            );
        })(t.ResponseBase);
        (t.uc = e), __reflect(e.prototype, 'Core.Network.CryptoBrodcastResp');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    (this.type = t.readByte()),
                        (this.cryptoKey = new egret.ByteArray());
                    for (var e = 0; 4 > e; e++)
                        this.cryptoKey.writeByte(t.readByte());
                }),
                e
            );
        })(t.ResponseBase);
        (t.fc = e), __reflect(e.prototype, 'Core.Network.CryptoUserKeyResp');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                (e.prototype.$ = function(t) {
                    var e = this.context.decryptUserKey;
                    if (!e || 0 === e.length)
                        return void console.error('No decypt token found!');
                    this.payloadBytes = new egret.ByteArray();
                    for (var i = 0; i < t.length - 12; i++)
                        (e.position = i % e.length),
                            this.payloadBytes.writeByte(
                                t.readByte() ^ e.readByte()
                            );
                }),
                e
            );
        })(t.ResponseBase);
        (t.Cc = e), __reflect(e.prototype, 'Core.Network.CryptoUserResp');
    })((e = t.Network || (t.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(r) {
    var t;
    !(function(t) {
        var e = (function(e) {
            function i() {
                return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
                __extends(i, e),
                Object.defineProperty(i, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (i.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(i.prototype, 'urlList', {
                    get: function() {
                        return r.Config.HostConfig.instance.getHost('chat')
                            .urlList;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(i.prototype, 'respMap', {
                    get: function() {
                        return (
                            this._respMap ||
                                ((this._respMap = new r.HashMap()),
                                this._respMap.set(r.Protocol.Ru, t.Ku),
                                this._respMap.set(r.Protocol.Bu, t.qu),
                                this._respMap.set(r.Protocol.Lu, t.rc),
                                this._respMap.set(
                                    r.Protocol.CHAT_DISABLE_KEY,
                                    t.Fu
                                ),
                                this._respMap.set(r.Protocol.ju, t.nc),
                                this._respMap.set(
                                    r.Protocol.CHAT_REMOVE_MESSAGE,
                                    t.Wu
                                ),
                                this._respMap.set(r.Protocol.Iu, t.Yu)),
                            this._respMap
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (i.prototype.onConnected = function(t) {
                    e.prototype.onConnected.call(this, t),
                        i.instance.writeBytes(
                            r.APIManager.getCMDChatLoginServerExt(
                                r.LoginStore.instance.loginName,
                                r.LoginStore.instance.token,
                                r.CHAT_PLAZA_LOGIN_VID
                            )
                        );
                }),
                Object.defineProperty(i.prototype, 'tag', {
                    get: function() {
                        return '[ChatSocket]';
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                i
            );
        })(t.WebSocketBase);
        (t.ChatSocket = e), __reflect(e.prototype, 'Core.Network.ChatSocket');
    })((t = r.Network || (r.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var Core;
!(function(h) {
    var t;
    !(function(a) {
        var t = (function(n) {
            function t(t, e, i, r) {
                var s = n.call(this, t, e, i) || this;
                return (
                    (s.context = r),
                    h.ExternalData.cryptoEnabled &&
                        (i.set(h.Protocol.Nu, a.ac),
                        i.set(h.Protocol.Mu, a.uc),
                        i.set(h.Protocol.Du, a.fc),
                        i.set(h.Protocol.CRYPTO_USER_SR, a.Cc)),
                    s.addEventListener(a.EVENT_RECEIVE_PACKET, s.onPacket, s),
                    s
                );
            }
            return (
                __extends(t, n),
                (t.prototype.writeBytes = function(t, e, i) {
                    t.position = 0;
                    var r = t.readInt();
                    h.ExternalData.cryptoEnabled &&
                        this.context.getEncryptIDs().indexOf(r) >= 0 &&
                        (t = this.encryptPacket(t)),
                        n.prototype.writeBytes.call(this, t, e, i);
                }),
                (t.prototype.onConnected = function(t) {
                    n.prototype.onConnected.call(this, t);
                    var e = new egret.ByteArray();
                    e.writeDouble(h.LoginStore.instance.token[0]),
                        (this.encryptUserKey = new egret.ByteArray(
                            e.buffer.slice(0, 4)
                        ));
                }),
                (t.prototype.getPacketData = function(t) {
                    var e = n.prototype.getPacketData.call(this, t);
                    return h.ExternalData.cryptoEnabled &&
                        this.context.getDecryptIDs().indexOf(e.respId) >= 0
                        ? (dclib('block', e), null)
                        : e;
                }),
                (t.prototype.getPurePacketData = function(t) {
                    return n.prototype.getPacketData.call(this, t);
                }),
                (t.prototype.onPacket = function(t) {
                    var e = t.data;
                    switch (e.respId) {
                        case h.Protocol.Nu:
                            var i = e;
                            this.decryptBroadcastKey = i.decryptKey;
                            break;
                        case h.Protocol.Mu:
                            var r = e;
                            if (
                                r.payloadBytes &&
                                r.payloadBytes.length >= h._u
                            ) {
                                var s = this.getPurePacketData(r.payloadBytes);
                                s &&
                                    (dclib('decrypt broadcast', s),
                                    this.dispatchEventWith(
                                        a.EVENT_RECEIVE_PACKET,
                                        !1,
                                        s
                                    ));
                            }
                            break;
                        case h.Protocol.Du:
                            var n = e;
                            dclib('userKeyResp: ' + n.type, n),
                                0 === n.type
                                    ? (dclib(
                                          this.tag +
                                              ' session token:' +
                                              h.LoginStore.instance.tokenStr
                                      ),
                                      dclib(
                                          this.tag +
                                              ' oldkey:' +
                                              this.bytesToHexStr(
                                                  this.encryptUserKey
                                              )
                                      ),
                                      dclib(
                                          this.tag +
                                              ' newkey:' +
                                              this.bytesToHexStr(n.cryptoKey)
                                      ),
                                      this.writeBytes(
                                          h.APIManager.getCMDCryptoKeyACK(
                                              this.encryptUserKey,
                                              n.cryptoKey
                                          )
                                      ),
                                      (this.encryptUserKey = n.cryptoKey))
                                    : 1 === n.type &&
                                      (this.decryptUserKey = n.cryptoKey);
                            break;
                        case h.Protocol.CRYPTO_USER_SR:
                            var o = e;
                            if (
                                o.payloadBytes &&
                                o.payloadBytes.length >= h._u
                            ) {
                                var s = this.getPurePacketData(o.payloadBytes);
                                s &&
                                    (dclib('decrypt user', s),
                                    this.dispatchEventWith(
                                        a.EVENT_RECEIVE_PACKET,
                                        !1,
                                        s
                                    ));
                            }
                    }
                }),
                (t.prototype.encryptPacket = function(t) {
                    var e = h.startCMD(h.Protocol.CRYPTO_USER_SR),
                        i = this.encryptUserKey;
                    t.position = 0;
                    for (var r = 0; r < t.length; r++)
                        (i.position = r % i.length),
                            e.writeByte(t.readByte() ^ i.readByte());
                    return h.endCMD(e);
                }),
                (t.prototype.bytesToHexStr = function(t) {
                    var e = '';
                    t.position = 0;
                    for (var i = 0; i < t.length; i++) {
                        var r = 255 & t.readByte(),
                            s = '0' + r.toString(16).toLowerCase();
                        e += s.substr(s.length - 2, 2);
                    }
                    return e;
                }),
                t
            );
        })(a.DCSocketUnit);
        (a.CryptoSocketUnit = t),
            __reflect(t.prototype, 'Core.Network.CryptoSocketUnit');
    })((t = h.Network || (h.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                var r = t.call(this) || this;
                return (
                    (r.sharedSequnce = 0),
                    (r.jsWorker = new Worker('resource/workers/ag-worker.js')),
                    (r.callbackMap = new i.HashMap()),
                    r.jsWorker.addEventListener('message', function(t) {
                        var e = t.data,
                            i = r.callbackMap.get(e.sequence);
                        i &&
                            (i.call(null, e),
                            r.callbackMap['delete'](e.sequence));
                    }),
                    r
                );
            }
            return (
                __extends(e, t),
                (e.prototype.sendData = function(t, e) {
                    this.callbackMap.set(t.sequence, e),
                        this.jsWorker.postMessage(t);
                }),
                (e.prototype.sendHttpRequest = function(t, e) {
                    this.sendData(t, e);
                }),
                Object.defineProperty(e, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.init = function() {
                    return this.initInstance(this);
                }),
                e
            );
        })(i.SingletonDispatcher);
        (t.Client = e), __reflect(e.prototype, 'Core.AGWorker.Client');
    })((t = i.AGWorker || (i.AGWorker = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(h) {
    var t;
    !(function(o) {
        function t(t, e) {
            var i = 'connectCount';
            if (
                (e || ((e = t.url), (i = 'connectCountImg')),
                /^https{0,1}\:/.test(e))
            )
                return e;
            if (!h.ExternalData.cdnConfig || !h.ExternalData.cdnConfig.enabled)
                return e;
            if ((a(), o.domainList.length <= 0)) return e;
            var r,
                s = t[i];
            if (s) {
                if (
                    (s > 1 &&
                        ((r = o.cdnCountMap.get(s - 1) || 0),
                        r++,
                        o.cdnCountMap.set(s - 1, r)),
                    s > o.domainList.length)
                )
                    return e;
            } else s = 1;
            for (
                ;
                s <= o.domainList.length &&
                ((r = o.cdnCountMap.get(s) || 0),
                h.ExternalData.cdnConfig.maxRetry &&
                    !(r < h.ExternalData.cdnConfig.maxRetry));

            )
                s++;
            if (s > o.domainList.length) return e;
            var n = o.domainList[s - 1];
            return (
                (t[i] = s + 1),
                [n, h.ExternalData.cdnConfig.subDomain, e].join('/')
            );
        }
        function a() {
            if (!o.domainList)
                if (((o.onCDN = h.ExternalData.cdnConfig.enabled), o.onCDN)) {
                    o.domainList = h.ExternalData.cdnConfig.domainList.filter(
                        function(t) {
                            return 'https:' === location.protocol
                                ? !/^http\:/.test(t)
                                : !0;
                        }
                    );
                    for (var t = 0; t < o.domainList.length; t++) {
                        var e = o.domainList[t];
                        /^https{0,1}\:/.test(e) || (o.domainList[t] = '//' + e);
                    }
                } else o.domainList = [];
            return o.domainList;
        }
        (o.onCDN = !1),
            (o.cdnCountMap = new h.HashMap()),
            (o.getCDNResUrl = t),
            (o.getDomainList = a);
    })((t = h.AnalyzerUtils || (h.AnalyzerUtils = {})));
})(Core || (Core = {}));
var Core;
!(function(r) {
    var t;
    !(function(i) {
        var t = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                Object.defineProperty(e, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(e.prototype, 'urlList', {
                    get: function() {
                        return r.Config.HostConfig.instance.getHost('login')
                            .urlList;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, 'respMap', {
                    get: function() {
                        return (
                            this._respMap ||
                                ((this._respMap = new r.HashMap()),
                                this._respMap.set(r.Protocol.Ou, i.Hu),
                                this._respMap.set(r.Protocol.xu, i.Uu),
                                this._respMap.set(r.Protocol.Tu, i.Ln)),
                            this._respMap
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, 'tag', {
                    get: function() {
                        return '[Login]';
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e
            );
        })(i.WebSocketBase);
        (i.LoginSocket = t), __reflect(t.prototype, 'Core.Network.LoginSocket');
    })((t = r.Network || (r.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
var PCPlaza;
var PCPlaza;
var Core;
!(function(s) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.loadFile = function(t, e, i) {
                if (this.fileDic[t.name]) return void e.call(i, t);
                var r = this.getMyLoader();
                (this.resItemDic[r.$hashCode] = {
                    item: t,
                    func: e,
                    thisObject: i
                }),
                    r.load(s.AnalyzerUtils.getCDNResUrl(t));
            }),
            (e.prototype.getMyLoader = function() {
                var t = this.recycler.pop();
                return (
                    t ||
                        ((t = new s.ImageLoader()),
                        t.addEventListener(
                            egret.Event.COMPLETE,
                            this.onLoadFinish,
                            this
                        ),
                        t.addEventListener(
                            egret.IOErrorEvent.IO_ERROR,
                            this.onLoadFinish,
                            this
                        )),
                    t
                );
            }),
            e
        );
    })(RES.ImageAnalyzer);
    (s.ImageAnalyzer = t), __reflect(t.prototype, 'Core.ImageAnalyzer');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(s) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (t.crossOrigin = 'anonymous'), t;
        }
        return (
            __extends(t, e),
            (t.prototype.load = function(t) {
                var e = this;
                this.loadImage(t);
                var i = egret.setTimeout(
                        function() {
                            var t = e.currentImage;
                            t &&
                                (console.warn(t.src + ' timeout!'),
                                (t.src = ''));
                        },
                        this,
                        s.CDN_TIMEOUT
                    ),
                    r = this.currentImage.onload;
                this.currentImage.onload = function(t) {
                    egret.clearTimeout(i), r.call(this, t);
                };
            }),
            t
        );
    })(egret.ImageLoader);
    (s.ImageLoader = t), __reflect(t.prototype, 'Core.ImageLoader');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(e) {
    var t = (function() {
        function t(t) {
            void 0 === t && (t = '[Sound]'),
                (this.soundResQueue = []),
                (this.isLoading = !1),
                (this._volume = 0.5),
                (this.isLooping = !1),
                (this.tag = t);
        }
        return (
            Object.defineProperty(t.prototype, 'volume', {
                get: function() {
                    return this._volume;
                },
                set: function(t) {
                    0 > t
                        ? (this._volume = 0)
                        : t > 1
                            ? (this._volume = 1)
                            : (this._volume = t),
                        this.currentSound &&
                            this.currentSound.setVolume(this._volume);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.play = function(t) {
                return this.isLooping
                    ? void console.warn(this.tag + ' is looping, cannot play')
                    : void (this.currentSound || this.isLoading
                          ? this.soundResQueue.push(t)
                          : this.playResAsync(t));
            }),
            (t.prototype.playResAsync = function(r) {
                var s = this;
                (this.isLoading = !0),
                    (this.stopCallback = null),
                    RES.getResAsync(
                        r,
                        function(t, e) {
                            if (((s.isLoading = !1), s.stopCallback))
                                return (
                                    s.stopCallback.call(null),
                                    void (s.stopCallback = null)
                                );
                            s.currentSound = createjs.Sound.play(
                                r,
                                null,
                                null,
                                null,
                                0,
                                s.volume
                            );
                            var i = function(t) {
                                s.currentSound.off('complete', i),
                                    s.currentSound.destroy(),
                                    (s.currentSound = null),
                                    s.soundResQueue.length > 0 &&
                                        s.play(s.soundResQueue.shift());
                            };
                            s.currentSound.on('complete', i);
                        },
                        this
                    );
            }),
            (t.prototype.playLocalize = function(t) {
                this.play(e.SoundManager.instance.translateRes(t, '_mp3'));
            }),
            (t.prototype.loop = function(t, e) {
                var i = this;
                void 0 === e && (e = -1),
                    (this.isLoading = !0),
                    (this.stopCallback = null),
                    RES.getResAsync(
                        t,
                        function() {
                            return (
                                (i.isLoading = !1),
                                i.stopCallback
                                    ? (i.stopCallback.call(null),
                                      void (i.stopCallback = null))
                                    : ((i.currentSound = createjs.Sound.play(
                                          t,
                                          null,
                                          null,
                                          null,
                                          e,
                                          i.volume
                                      )),
                                      void (i.isLooping = !0))
                            );
                        },
                        this
                    );
            }),
            (t.prototype.stop = function(t) {
                void 0 === t && (t = function() {}),
                    this.isLoading
                        ? (this.stopCallback = t)
                        : (this.currentSound &&
                              (this.currentSound.stop(),
                              this.currentSound.destroy(),
                              (this.currentSound = null)),
                          t.call(null)),
                    (this.soundResQueue = []),
                    (this.isLooping = !1);
            }),
            t
        );
    })();
    (e.SoundChannel = t), __reflect(t.prototype, 'Core.SoundChannel');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(r) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.enableSound = !0),
                (t.enableBGM = !0),
                (t.enableGameSound = !1),
                (t.enableLiveSound = !0),
                (t.enableVideoSound = !1),
                (t._volume = 0.5),
                (t._bgm_volume = 0.5),
                (t._game_volume = 0.5),
                (t._live_volume = 0.5),
                (t.channelMap = new r.HashMap()),
                t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(t.prototype, 'volume', {
                get: function() {
                    return this._volume;
                },
                set: function(t) {
                    var e = this;
                    0 > t
                        ? (this._volume = 0)
                        : t > 1
                            ? (this._volume = 1)
                            : (this._volume = t),
                        this.channelMap.forEach(function(t) {
                            (t.tag == r.CHANNEL_TAG_DEFAULT ||
                                t.tag == r.CHANNEL_TAG_EFFECT) &&
                                (t.volume = e._volume);
                        }, this);
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'bgm_volume', {
                get: function() {
                    return this._bgm_volume;
                },
                set: function(t) {
                    0 > t
                        ? (this._bgm_volume = 0)
                        : t > 1
                            ? (this._bgm_volume = 1)
                            : (this._bgm_volume = t);
                    var e = this.channelMap.get(r.CHANNEL_TAG_BGM);
                    e && (e.volume = this._bgm_volume);
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'game_volume', {
                get: function() {
                    return this._game_volume;
                },
                set: function(t) {
                    0 > t
                        ? (this._game_volume = 0)
                        : t > 1
                            ? (this._game_volume = 1)
                            : (this._game_volume = t);
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'live_volume', {
                get: function() {
                    return this._live_volume;
                },
                set: function(t) {
                    0 > t
                        ? (this._live_volume = 0)
                        : t > 1
                            ? (this._live_volume = 1)
                            : (this._live_volume = t);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.setVolume = function(t, e) {
                switch ((void 0 === e && (e = r.CHANNEL_TAG_DEFAULT), e)) {
                    case r.CHANNEL_TAG_BGM:
                        this.bgm_volume = t;
                        break;
                    case r.CHANNEL_TAG_GAME:
                        this.game_volume = t;
                        break;
                    case r.CHANNEL_TAG_LIVE:
                        this.live_volume = t;
                        break;
                    default:
                        this.volume = t;
                }
            }),
            (t.prototype.getVolume = function(t) {
                switch ((void 0 === t && (t = r.CHANNEL_TAG_DEFAULT), t)) {
                    case r.CHANNEL_TAG_BGM:
                        return this.bgm_volume;
                    case r.CHANNEL_TAG_GAME:
                        return this.game_volume;
                    case r.CHANNEL_TAG_LIVE:
                        return this.live_volume;
                    default:
                        return this.volume;
                }
            }),
            (t.prototype.setBgmVolume = function(t) {
                this.setVolume(t, r.CHANNEL_TAG_BGM);
            }),
            (t.prototype.getBgmVolume = function() {
                return this.getVolume(r.CHANNEL_TAG_BGM);
            }),
            (t.prototype.setGameVolume = function(t) {
                this.setVolume(t, r.CHANNEL_TAG_GAME);
            }),
            (t.prototype.getGameVolume = function() {
                return this.getVolume(r.CHANNEL_TAG_GAME);
            }),
            (t.prototype.setLiveVolume = function(t) {
                this.setVolume(t, r.CHANNEL_TAG_LIVE);
            }),
            (t.prototype.getLiveVolume = function() {
                return this.getVolume(r.CHANNEL_TAG_LIVE);
            }),
            (t.prototype.setSoundEnable = function(t) {
                (this.enableSound = t), this.enableSound || this.stop();
            }),
            (t.prototype.getSoundEnable = function() {
                return this.enableSound;
            }),
            (t.prototype.setBGMEnable = function(t) {
                (this.enableBGM = t), this.enableBGM || this.stopBGM();
            }),
            (t.prototype.getBGMEnable = function() {
                return this.enableBGM;
            }),
            (t.prototype.setGameSoundEnable = function(t) {
                this.enableGameSound = t;
            }),
            (t.prototype.getGameSoundEnable = function() {
                return this.enableGameSound;
            }),
            (t.prototype.setLiveSoundEnable = function(t) {
                this.enableLiveSound = t;
            }),
            (t.prototype.getLiveSoundEnable = function() {
                return this.enableLiveSound;
            }),
            (t.prototype.setVideoEnable = function(t) {
                this.enableVideoSound = t;
            }),
            (t.prototype.getVideoEnable = function() {
                return this.enableVideoSound;
            }),
            (t.prototype.getChannelByTag = function(t) {
                var e = this.channelMap.get(t);
                return (
                    e ||
                        ((e = new r.SoundChannel(t)),
                        (e.volume = this.getVolume(t)),
                        this.channelMap.set(t, e)),
                    e
                );
            }),
            (t.prototype.playBGM = function(t) {
                this.enableBGM &&
                    this.getChannelByTag(r.CHANNEL_TAG_BGM).loop(t);
            }),
            (t.prototype.stopBGM = function() {
                this.stop(r.CHANNEL_TAG_BGM);
            }),
            (t.prototype.playEffect = function(t) {
                if (this.enableSound) {
                    var e = this.getChannelByTag(r.CHANNEL_TAG_EFFECT);
                    e.stop(function() {
                        e.play(t);
                    });
                }
            }),
            (t.prototype.playLocalizeEffect = function(t) {
                if (this.enableSound) {
                    var e = this.getChannelByTag(r.CHANNEL_TAG_EFFECT);
                    e.stop(function() {
                        e.playLocalize(t);
                    });
                }
            }),
            (t.prototype.play = function(t, e) {
                void 0 === e && (e = r.CHANNEL_TAG_DEFAULT),
                    this.enableSound && this.getChannelByTag(e).play(t);
            }),
            (t.prototype.playLocalize = function(t, e) {
                void 0 === e && (e = r.CHANNEL_TAG_DEFAULT),
                    this.enableSound && this.getChannelByTag(e).playLocalize(t);
            }),
            (t.prototype.stop = function(t) {
                void 0 === t && (t = r.CHANNEL_TAG_DEFAULT),
                    this.getChannelByTag(t).stop(),
                    this.channelMap['delete'](t);
            }),
            Object.defineProperty(t.prototype, 'lang', {
                get: function() {
                    if (this.forceLang) return this.forceLang;
                    if (this._lang) return this._lang;
                    var t = r.StorageManager.instance.getItem(
                            r.LOCALKEY_LANG_SOUND
                        ),
                        e = r.ExternalData.lang;
                    return (
                        r.LANG_CANDIDATE_LIST.indexOf(t) >= 0
                            ? (this._lang = t)
                            : r.LANG_CANDIDATE_LIST.indexOf(e) >= 0
                                ? (this._lang = e)
                                : (this._lang = r.LANG_DEFAULT),
                        this._lang
                    );
                },
                set: function(t) {
                    r.LANG_CANDIDATE_LIST.indexOf(t) < 0 &&
                        console.warn('language ' + t + ' not support');
                    this._lang === t;
                    (this._lang = t),
                        r.StorageManager.instance.setItem(
                            r.LOCALKEY_LANG_SOUND,
                            t
                        );
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.translateRes = function(t, e) {
                void 0 === e && (e = '');
                var i = t + '_' + this.lang + e;
                return RES.hasRes(i) ? i : t + '_' + r.LANG_BACKUP + e;
            }),
            Object.defineProperty(t.prototype, 'forceLang', {
                get: function() {
                    return this._forceLang;
                },
                set: function(t) {
                    t &&
                        r.LANG_CANDIDATE_LIST.indexOf(t) < 0 &&
                        console.warn('language ' + t + ' not support'),
                        (this._forceLang = t);
                },
                enumerable: !0,
                configurable: !0
            }),
            t
        );
    })(r.SingletonDispatcher);
    (r.SoundManager = t), __reflect(t.prototype, 'Core.SoundManager');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(m) {
    var t = (function(e) {
        function l() {
            var t = e.call(this) || this;
            return (
                (t._isReady = !1),
                (t._disKey = -1),
                (t.seatNum = 0),
                (t.messageList = []),
                (t.socketList = [m.Network.ChatSocket.init()]),
                (t.cacheChangeNickName = ''),
                m.Network.ChatSocket.instance.addEventListener(
                    egret.Event.CLOSE,
                    t.onSocketClosed,
                    t
                ),
                t
            );
        }
        return (
            __extends(l, e),
            Object.defineProperty(l, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (l.init = function() {
                return this.initInstance(this);
            }),
            (l.prototype.onSocketClosed = function() {
                m.Network.ChatSocket.instance.connected ||
                    ((this._isReady = !1),
                    this.dispatchAction(l.EVENT_UPDATE_DISKEY));
            }),
            (l.prototype.onSocketDie = function(t) {
                this.onSocketClosed();
            }),
            Object.defineProperty(l.prototype, 'isReady', {
                get: function() {
                    return this._isReady;
                },
                enumerable: !0,
                configurable: !0
            }),
            (l.prototype.onSocketData = function(t, e) {
                switch (t.respId) {
                    case m.Protocol.Iu:
                        var i = t;
                        0 == i.code &&
                            (e.writeBytes(
                                m.APIManager.getCMDChatQuickMessageList(0)
                            ),
                            this._vid &&
                                ((this._isReady = !0), this.enterTable()),
                            '' != this.cacheChangeNickName &&
                                this.changeNickname(this.cacheChangeNickName));
                        break;
                    case m.Protocol.Ru:
                        var r = t;
                        switch (r.CmdRequest) {
                            case m.Protocol.CHAT_LOGIN_SERVER:
                                0 == r.Code &&
                                    (e.writeBytes(
                                        m.APIManager.getCMDChatQuickMessageList(
                                            0
                                        )
                                    ),
                                    this._vid &&
                                        ((this._isReady = !0),
                                        this.enterTable()),
                                    '' != this.cacheChangeNickName &&
                                        this.changeNickname(
                                            this.cacheChangeNickName
                                        ));
                                break;
                            case m.Protocol.CHAT_NICKNAME_CHANGE:
                                0 !== r.Code &&
                                    (dclib('change nickname fail'),
                                    this.dispatchAction(
                                        l.EVENT_NICKNAME_ILLEGAL
                                    ));
                        }
                        break;
                    case m.Protocol.CHAT_DISABLE_KEY:
                        var s = t,
                            n = s.loginname;
                        n === m.LoginStore.instance.loginName &&
                            (this._disKey = s.Code),
                            this.dispatchAction(l.EVENT_UPDATE_DISKEY);
                        break;
                    case m.Protocol.Lu:
                        var o = t;
                        (this.chatInfos = o.chatInfos),
                            (this.chatInfosMap = o.chatInfosMap),
                            this.dispatchAction(l.EVENT_UPDATE_QUICK_MESSAGE);
                        break;
                    case m.Protocol.Bu:
                        var a = t,
                            h = a.message;
                        h &&
                            this.messageList.push(
                                new d(
                                    a.sender_loginname,
                                    a.sender_nickname,
                                    a.message,
                                    -1,
                                    a.temp_msgID,
                                    a.msgID
                                )
                            ),
                            this.dispatchAction(l.EVENT_UPDATE_MESSAGE);
                        break;
                    case m.Protocol.ju:
                        var u = t;
                        if (this.chatInfos && this.chatInfos[u.cmdID - 1]) {
                            var h = this.chatInfos[u.cmdID - 1].message;
                            this.messageList.push(
                                new d(
                                    u.sender_loginname,
                                    u.sender_nickname,
                                    h,
                                    u.cmdID - 1,
                                    u.temp_msgID,
                                    u.msgID
                                )
                            );
                        }
                        this.dispatchAction(l.EVENT_UPDATE_MESSAGE);
                        break;
                    case m.Protocol.CHAT_REMOVE_MESSAGE:
                        for (
                            var c = t, f = -1, C = 0;
                            C < this.messageList.length;
                            C++
                        )
                            this.messageList[C].temp_msgId == c.temp_msgID &&
                                this.messageList[C].msgId == c.msgID &&
                                ((this.removedMsg = this.messageList[C]),
                                (f = C));
                        -1 != f && this.messageList.splice(f, 1),
                            this.dispatchAction(l.EVENT_REMOVE_MESSAGE);
                }
            }),
            (l.prototype.connectServer = function() {
                m.Network.ChatSocket.instance.autoConnect();
            }),
            (l.prototype.disconnectServer = function(t) {
                t || (t = this._vid),
                    t &&
                        (m.Network.ChatSocket.instance.connected &&
                            this.enterTable(t, 0),
                        m.Network.ChatSocket.instance.killSocket());
            }),
            (l.prototype.enterTable = function(t, e) {
                t || (t = this._vid),
                    void 0 === e && (e = 1),
                    (this.messageList = []),
                    m.Network.ChatSocket.instance &&
                        m.Network.ChatSocket.instance.connected &&
                        m.Network.ChatSocket.instance.writeBytes(
                            m.APIManager.getCMDChatEnterTable(t, '', 1, e)
                        ),
                    this.dispatchAction(l.EVENT_ENTER_TABLE, e);
            }),
            (l.prototype.changeNickname = function(t) {
                m.Network.ChatSocket.instance &&
                    !m.Network.ChatSocket.instance.connected &&
                    m.Network.ChatSocket.instance.autoConnect(),
                    (this.cacheChangeNickName = t),
                    this.isReady &&
                        (m.Network.ChatSocket.instance.writeBytes(
                            m.APIManager.getCMDChatChangeNickname(t)
                        ),
                        (this.cacheChangeNickName = ''));
            }),
            Object.defineProperty(l.prototype, 'vid', {
                get: function() {
                    return this._vid;
                },
                set: function(t) {
                    (this.seatNum = 0),
                        (this._isReady = !1),
                        t !== this._vid &&
                            (this.disconnectServer(),
                            (this._vid = t),
                            void 0 !== this._vid &&
                                '' != this._vid &&
                                (m.Network.ChatSocket.instance.autoConnect(),
                                this.enterTable()));
                },
                enumerable: !0,
                configurable: !0
            }),
            (l.prototype.sendMsg = function(t) {
                this._vid &&
                    m.Network.ChatSocket.instance.writeBytes(
                        m.APIManager.getCMDChatSendMessage(
                            this._vid,
                            '',
                            this.seatNum,
                            t
                        )
                    );
            }),
            (l.prototype.sendQuickMsg = function(t, e) {
                this._vid &&
                    m.Network.ChatSocket.instance.writeBytes(
                        m.APIManager.getCMDChatSendQuickMessage(
                            this._vid,
                            t,
                            e,
                            this.seatNum
                        )
                    );
            }),
            (l.prototype.getQuickMessage = function(t) {
                var e = [];
                if (this.chatInfos) {
                    e = this.chatInfosMap.get('ALL');
                    var i = this.chatInfosMap.get(t);
                    i && (e = e.concat(i));
                }
                return e;
            }),
            (l.prototype.getQuickMessageByID = function(t) {
                return this.chatInfos[t].message;
            }),
            (l.prototype.addEmoji = function(t) {
                this.dispatchAction(l.EVENT_ADD_EMOJI, t);
            }),
            (l.prototype.disKey = function() {
                return this._disKey;
            }),
            (l.prototype.release = function() {
                e.prototype.release.call(this),
                    (this.messageList = []),
                    this.disconnectServer();
            }),
            (l.EVENT_UPDATE_MESSAGE = 'EVENT_UPDATE_MESSAGE'),
            (l.EVENT_UPDATE_QUICK_MESSAGE = 'EVENT_UPDATE_QUICK_MESSAGE'),
            (l.EVENT_ENTER_TABLE = 'EVENT_ENTER_TABLE'),
            (l.EVENT_ADD_EMOJI = 'EVENT_ADD_EMOJI'),
            (l.EVENT_REMOVE_MESSAGE = 'EVENT_REMOVE_MESSAGE'),
            (l.EVENT_UPDATE_DISKEY = 'EVENT_UPDATE_DISKEY'),
            (l.EVENT_NICKNAME_ILLEGAL = 'EVENT_NICKNAME_ILLEGAL'),
            l
        );
    })(m.NetworkStoreBase);
    (m.ChatStore = t), __reflect(t.prototype, 'Core.ChatStore');
    var d = (function() {
        function t(t, e, i, r, s, n) {
            void 0 === r && (r = -1),
                void 0 === s && (s = 0),
                void 0 === n && (n = 0),
                (this.nickname = e),
                (this.loginname = t),
                (this.body = i),
                (this.chatInfoIndex = r),
                (this.temp_msgId = s),
                (this.msgId = n);
        }
        return t;
    })();
    (m.Message = d), __reflect(d.prototype, 'Core.Message');
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(o) {
    var t = (function(n) {
        function t() {
            return (null !== n && n.apply(this, arguments)) || this;
        }
        return (
            __extends(t, n),
            (t.prototype.analyzeData = function(t, e) {
                n.prototype.analyzeData.call(this, t, e);
                var i = t.name.split('_');
                if (i.length >= 3) {
                    var r = i[i.length - 2];
                    if (o.LANG_CANDIDATE_LIST.indexOf(r) >= 0) {
                        var s = i.slice(0, i.length - 2).join('_');
                        o.localizeStore.saveLocalizeRes(s, r, e);
                    }
                }
            }),
            (t.prototype.loadFile = function(t, e, i) {
                if (this.fileDic[t.name]) return void e.call(i, t);
                var r = this.getRequest();
                (this.resItemDic[r.hashCode] = {
                    item: t,
                    func: e,
                    thisObject: i
                }),
                    r.open(o.AnalyzerUtils.getCDNResUrl(t)),
                    (r._xhr.timeout = o.CDN_TIMEOUT),
                    r.send();
            }),
            t
        );
    })(RES.JsonAnalyzer);
    (o.JsonAnalyzer = t), __reflect(t.prototype, 'Core.JsonAnalyzer');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            Object.defineProperty(e, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (e.init = function() {
                return this.initInstance(this);
            }),
            (e.prototype.dispatchGlobal = function(t, e) {
                this.dispatchAction(t, e);
            }),
            e
        );
    })(t.StoreBase);
    (t.GlobalStore = e), __reflect(e.prototype, 'Core.GlobalStore');
})(Core || (Core = {}));
var Core;
!(function(o) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.tokenStr = ''),
                (t.isDemoAc = !1),
                (t.balance = 0),
                (t.loginDone = !1),
                (t.livePlatfomMode = !1),
                (t.livePlatfomTokenStr = ''),
                (t.waitingForLivePlatformToken = !1),
                (t.socketList = [o.Network.LoginSocket.instance]),
                t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(t.prototype, 'isReady', {
                get: function() {
                    return this.token && 2 === this.token.length;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'loginName', {
                get: function() {
                    return o.ExternalData.pid + this.userName;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.startLogin = function(t, e, i) {
                (this.userName = t),
                    (this.password = e),
                    (this.isDemoLogin = i),
                    (this.loginDone = !1),
                    (this.waitingForLivePlatformToken = !1),
                    o.Network.LoginSocket.instance.autoConnect();
            }),
            (t.prototype.renewToken = function(t, e) {
                var i = o.Network.LoginSocket.instance;
                i.connecting ||
                    i.connected ||
                    ((this.loginDone = !1),
                    (this.waitingForLivePlatformToken = !1),
                    i.autoConnect()),
                    this.onceAction(o.Wh, t, e);
            }),
            (t.prototype.renewLivePlatformToken = function(t, e) {
                var i = o.Network.LoginSocket.instance;
                i.connecting ||
                    i.connected ||
                    ((this.loginDone = !1),
                    (this.waitingForLivePlatformToken = !1),
                    i.autoConnect()),
                    this.onceAction(o.vu, t, e);
            }),
            (t.prototype.getCurServerTime = function() {
                var t = new Date().getTime(),
                    e = t - this.serverTimeDiff;
                return e;
            }),
            (t.prototype.fetchDoForward = function() {
                var s = this;
                o.AGWorker.DoForwardFetcher.init().once(
                    egret.Event.COMPLETE,
                    function(t) {
                        if (t.data) {
                            var e = window.bindHostConfig;
                            if (e) {
                                var i = void 0;
                                (i = o.ExternalData.useSSL
                                    ? e.ipdomains
                                    : e.ips),
                                    o.Config.HostConfig.instance.replaceDomainList(
                                        i
                                    );
                            }
                            if (
                                o.ExternalData.dnsapiEnabled &&
                                e &&
                                !e.userhost
                            ) {
                                var r = void 0;
                                (r = o.ExternalData.useSSL
                                    ? o.AGWorker.DoForwardFetcher.instance
                                          .ipdomains
                                    : o.AGWorker.DoForwardFetcher.instance.ips),
                                    o.Config.HostConfig.instance.addDnsIpList(
                                        r
                                    );
                            }
                            s.startLogin(
                                o.ExternalData.username,
                                o.AGWorker.DoForwardFetcher.instance.pwd
                            );
                        } else
                            console.error('Something wrong with the network!'),
                                ExternalProgress('loginError', 5);
                    },
                    this
                ),
                    o.AGWorker.DoForwardFetcher.instance.fetchData();
            }),
            (t.prototype.onSocketConnected = function(t) {
                t === o.Network.LoginSocket.instance &&
                    (this.isDemoLogin
                        ? t.writeBytes(o.APIManager.getCMDClientDemoLogin())
                        : t.writeBytes(
                              o.APIManager.getCMDClientLogin(
                                  this.loginName,
                                  this.password
                              )
                          ));
            }),
            (t.prototype.onSocketData = function(t, e) {
                switch (t.respId) {
                    case o.Protocol.Tu:
                        var i = t;
                        0 != i.code && e.killSocket();
                        var r = this.waitingForLivePlatformToken;
                        switch (
                            ((this.waitingForLivePlatformToken = !1), i.code)
                        ) {
                            case 0:
                                r
                                    ? (dclib(
                                          'LOGIN LIVE PLATFORM SESSION SUCCESS'
                                      ),
                                      (this.livePlatfomToken = i.token),
                                      (this.livePlatfomTokenStr =
                                          i.tokenString),
                                      this.dispatchAction(o.vu))
                                    : (dclib('LOGIN SERVER SUCCESS'),
                                      (this.token = i.token),
                                      (this.tokenStr = i.tokenString),
                                      (this.isDemoAc = 1 == i.userFlag),
                                      (this.serverTimeDiff = this.getServerDiff(
                                          i.svrTime
                                      )),
                                      this.livePlatfomMode &&
                                          ((this.waitingForLivePlatformToken = !0),
                                          e.writeBytes(
                                              o.APIManager.getCMDLoginLivePlatform(
                                                  this.loginName,
                                                  this.token
                                              )
                                          )));
                                break;
                            case 3:
                                //ACTION_LOGIN_PWD_INVALID 
                                this.dispatchAction(o.Qh);
                                break;
                            case 4:
                                //ACTION_LOGIN_USER_INVALID
                                this.dispatchAction(o.Xh);
                                break;
                            default:
                                dclib('LOGIN SERVER FAIL errorCode:' + i.code),
                                    this.dispatchAction(o.$h);
                        }
                        0 != i.code && ExternalProgress('loginError', i.code),
                            this.checkNKillSocket();
                        break;
                    case o.Protocol.xu:
                        var s = t;
                        (this.token = s.token),
                            (this.userName = s.pcUsername),
                            (this.tokenStr = s.tokenString),
                            (this.serverTimeDiff = this.getServerDiff(
                                s.svrTime
                            )),
                            (this.isDemoAc = !0),
                            this.livePlatfomMode &&
                                ((this.waitingForLivePlatformToken = !0),
                                e.writeBytes(
                                    o.APIManager.getCMDLoginLivePlatform(
                                        this.loginName,
                                        this.token
                                    )
                                ));
                        break;
                    case o.Protocol.Ou:
                        var n = t;
                        (this.balance = n.account),
                            (this.nickName = n.nickname),
                            (this.loginDone = !0),
                            this.checkNKillSocket(),
                            this.dispatchAction(o.Wh);
                }
            }),
            (t.prototype.getServerDiff = function(t) {
                var e = new Date().getTime();
                return e - 1e3 * t;
            }),
            (t.prototype.checkNKillSocket = function() {
                o.Network.LoginSocket.instance.connected &&
                    this.loginDone &&
                    !this.waitingForLivePlatformToken &&
                    o.Network.LoginSocket.instance.killSocket();
            }),
            t
        );
    })(o.NetworkStoreBase);
    (o.LoginStore = t), __reflect(t.prototype, 'Core.LoginStore');
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(n) {
    var o;
    n.loadTheme = function(t, e, i, r) {
        o || (o = new n.HashMap());
        var s = o.get(t);
        return (
            s || ((s = new eui.Theme(t, r)), o.set(t, s)),
            s.initialized
                ? n.ntimer.callLater(e, i)
                : s.addEventListener(eui.UIEvent.COMPLETE, e, i),
            s
        );
    };
})(Core || (Core = {}));
var Core;
!(function(i) {
    i.EVENT_TOUCH_OUTSIDE = 'EVENT_TOUCH_OUTSIDE';
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                t.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    t.onAddToStage,
                    t
                ),
                t.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    t.onRemoveFromStage,
                    t
                ),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.onAddToStage = function() {
                this.addTouchEventListener();
            }),
            (t.prototype.onRemoveFromStage = function() {
                this.removeTouchEventListener();
            }),
            (t.prototype.addTouchEventListener = function() {
                this.stage.addEventListener(
                    egret.TouchEvent.TOUCH_BEGIN,
                    this.touchBegin,
                    this
                );
            }),
            (t.prototype.removeTouchEventListener = function() {
                this.stage.removeEventListener(
                    egret.TouchEvent.TOUCH_BEGIN,
                    this.touchBegin,
                    this
                );
            }),
            (t.prototype.touchBegin = function(t) {
                this.getTransformedBounds(this.stage).containsPoint(
                    new egret.Point(t.stageX, t.stageY)
                ) ||
                    ((this.touchPoint = new egret.Point(t.stageX, t.stageY)),
                    this.dispatchEventWith(i.EVENT_TOUCH_OUTSIDE));
            }),
            t
        );
    })(eui.Group);
    (i.AutoDisappearView = t), __reflect(t.prototype, 'Core.AutoDisappearView');
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(i) {
        function t() {
            return i.call(this) || this;
        }
        return (
            __extends(t, i),
            (t.prototype.changePage = function(t, e) {
                void 0 === e && (e = !1),
                    this.snapModuleEnd(),
                    i.prototype.changePage.call(this, t, e);
            }),
            (t.prototype.popPage = function() {
                this.snapModuleEnd(), i.prototype.popPage.call(this);
            }),
            (t.prototype.snapModule = function(t) {
                if (this.pageStack.length) {
                    for (
                        var e = void 0, i = 1;
                        i < this.pageStack.length;
                        i++
                    ) {
                        var r = this.pageStack[this.pageStack.length - i - 1];
                        if (this.getPageModuleName(r) == t) {
                            e = r;
                            break;
                        }
                    }
                    e && ((this.snappingModule = e), this.addChild(e));
                }
            }),
            (t.prototype.snapModuleEnd = function() {
                this.snappingModule &&
                    this.contains(this.snappingModule) &&
                    this.removeChild(this.snappingModule),
                    (this.snappingModule = null);
            }),
            (t.prototype.getSnappingModuleName = function() {
                return this.getPageModuleName(this.snappingModule);
            }),
            (t.prototype.getPageModuleName = function(t) {
                var e = null;
                if (t) {
                    var i = egret.getQualifiedClassName(t),
                        r = i.split('.');
                    r.length >= 2 && (e = r[0]);
                }
                return e;
            }),
            t
        );
    })(t.PCPageNavigator);
    (t.EuEvPCPageNavigator = e),
        __reflect(e.prototype, 'Core.EuEvPCPageNavigator');
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(t) {
    function e() {
        var e = RES.hasRes;
        RES.hasRes = function(t) {
            return t.indexOf('.') < 0 && (t = '.' + t), e(t);
        };
    }
    t.patchHasRes = e;
})(Core || (Core = {}));
var Core;
!(function(a) {
    var t = (function(i) {
        function r() {
            var t = i.call(this) || this;
            return (
                (t.oldSize = 0),
                (t.setTextType = 0),
                (t.minSize = 10),
                (t.targetLabelWidth = 0),
                (t.targetLineNum = 0),
                (t.labelGroup = ''),
                t
            );
        }
        return (
            __extends(r, i),
            (r.prototype.onAddToStage = function() {
                i.prototype.onAddToStage.call(this),
                    r.textLabels
                        ? this.labelGroup &&
                          (r.textLabels.has(this.labelGroup)
                              ? r.textLabels.get(this.labelGroup).push(this)
                              : r.textLabels.set(this.labelGroup, [this]))
                        : (r.textLabels = new a.HashMap());
            }),
            (r.prototype.onRemoveFromStage = function() {
                var e = this;
                if (
                    (i.prototype.onRemoveFromStage.call(this),
                    r.textLabels &&
                        this.labelGroup &&
                        r.textLabels.has(this.labelGroup))
                ) {
                    var t = r.textLabels
                        .get(this.labelGroup)
                        .filter(function(t) {
                            return t != e;
                        }, this);
                    0 != t.length
                        ? r.textLabels.set(this.labelGroup, t)
                        : r.textLabels['delete'](this.labelGroup);
                }
            }),
            (r.prototype.setFixSizeText = function(t, e, i) {
                var r = this;
                void 0 === e && (e = 0),
                    void 0 === i && (i = !1),
                    i &&
                        a.NonstopTimer.instance.setTimeout(
                            function() {
                                r.setFixSizeText(t, e, !1);
                            },
                            this,
                            1
                        );
                var s = t,
                    n = t;
                i
                    ? ((this.text = s),
                      this.stage &&
                          0 == e &&
                          this.maxWidth >= 1e4 &&
                          (this.percentWidth
                              ? (this.width =
                                    (this.parent.width * this.percentWidth) /
                                    100)
                              : (this.width = 1e4)))
                    : (this.text = s);
                var o =
                    0 == e
                        ? this.maxWidth >= 1e4
                            ? this.width
                            : this.maxWidth
                        : e;
                egret.callLater(function() {
                    for (
                        ;
                        (r.textWidth >= o || r.numLines > 1) && s.length > 1;

                    )
                        (s = s.substring(0, s.length - 1)),
                            (n = s + '...'),
                            (r.text = n);
                }, this);
            }),
            (r.prototype.setFitSizeText = function(t, e, i) {
                var r = this;
                void 0 === e && (e = 0),
                    void 0 === i && (i = !1),
                    0 === this.oldSize
                        ? (this.oldSize = this.size)
                        : this.size < this.oldSize &&
                          (this.size = this.oldSize);
                var s = t;
                this.text = s;
                var n = this.text.split('\n').length;
                i &&
                    ((this.text = s),
                    this.stage &&
                        0 == e &&
                        this.maxWidth >= 1e4 &&
                        (this.percentWidth
                            ? (this.width =
                                  (this.parent.width * this.percentWidth) / 100)
                            : (this.width = 1e4)));
                var o =
                    0 == e
                        ? this.maxWidth >= 1e4
                            ? this.width
                            : this.maxWidth
                        : e;
                (i || (0 === o && '' != this.text)) &&
                    a.NonstopTimer.instance.setTimeout(
                        function() {
                            r.setFitSizeText(t, e, !1);
                        },
                        this,
                        1
                    ),
                    0 !== o &&
                        ((this.targetLabelWidth = o),
                        (this.targetLineNum = n),
                        egret.callLater(function() {
                            var e =
                                1 == r.targetLineNum
                                    ? 0
                                    : r.textWidth * r.numLines;
                            for (
                                1 == r.targetLineNum &&
                                r.$getLinesArr().forEach(function(t) {
                                    e += t.width;
                                }, r);
                                (r.textWidth >= r.targetLabelWidth ||
                                    (r.numLines > r.targetLineNum &&
                                        e >
                                            r.targetLabelWidth *
                                                r.targetLineNum)) &&
                                ((r.size -= 0.5), !(r.size <= r.minSize));

                            )
                                1 == r.targetLineNum &&
                                    ((e = 0),
                                    r.$getLinesArr().forEach(function(t) {
                                        e += t.width;
                                    }, r));
                            r.labelGroup && r.setGroupSize();
                        }, this));
            }),
            (r.prototype.setGroupSize = function() {
                var e = 1e4,
                    t = r.textLabels.get(this.labelGroup);
                t &&
                    (t.forEach(function(t) {
                        t && t.size < e && (e = t.size);
                    }, this),
                    t.forEach(function(t) {
                        t && (t.size = e);
                    }, this));
            }),
            (r.prototype.onLangChange = function() {
                var t;
                if (
                    (this.localeFunc
                        ? (t = this.localeFunc())
                        : this.localeKey &&
                          (t = a.LocalizeStore.instance.translate(
                              this.localeKey
                          )),
                    t)
                )
                    switch (this.setTextType) {
                        case 0:
                            this.text = t;
                            break;
                        case 1:
                            this.setFixSizeText(t);
                            break;
                        case 2:
                            this.setFixSizeText(t, 0, !0);
                            break;
                        case 3:
                            this.setFitSizeText(t);
                            break;
                        case 4:
                            this.setFitSizeText(t, 0, !0);
                    }
            }),
            r
        );
    })(a.LocaleLabel);
    (a.LongTextLabel = t), __reflect(t.prototype, 'Core.LongTextLabel');
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.orientation = i.pageNavigator.orientation),
                (t._skinMap = new i.HashMap({ portrait: null })),
                t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t.prototype, 'skinMap', {
                set: function(t) {
                    this.setSkinMap(t);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.setSkinMap = function(t) {
                this._skinMap = t;
                var e = this._skinMap.get(this.orientation);
                e
                    ? (this.skinName = e)
                    : (this.skinName = this._skinMap.values[0]);
            }),
            (t.prototype.getSkinMap = function() {
                return this._skinMap;
            }),
            (t.prototype.isOrientSupported = function(t) {
                return this._skinMap.has(t);
            }),
            t
        );
    })(i.PageBase);
    (i.MobilePageBase = t), __reflect(t.prototype, 'Core.MobilePageBase');
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(e) {
    var t = (function(i) {
        function t() {
            var t = i.call(this) || this;
            return (
                (t.isOrientWarning = !1),
                t.once(
                    egret.Event.ADDED_TO_STAGE,
                    function() {
                        t.onStageResize(),
                            t.stage.addEventListener(
                                egret.Event.RESIZE,
                                t.onStageResize,
                                t
                            );
                    },
                    t
                ),
                t
            );
        }
        return (
            __extends(t, i),
            (t.prototype.changePage = function(t, e) {
                void 0 === e && (e = !1),
                    i.prototype.changePage.call(this, t, e),
                    this.checkPageOrient(t);
            }),
            (t.prototype.popPage = function() {
                i.prototype.popPage.call(this),
                    this.checkPageOrient(this.getTopPage());
            }),
            (t.prototype.addPopup = function(t) {
                console.warn('TODO to be abandoned'),
                    this.getTopPage().addPopup(t);
            }),
            (t.prototype.removePopup = function(t) {
                console.warn('TODO to be abandoned'), t.parent.removePopup(t);
            }),
            (t.prototype.onStageResize = function() {
                var t = this.stage;
                (this.orientation =
                    t.stageWidth > t.stageHeight
                        ? e.ORI_LANDSCAPE
                        : e.ORI_PORTRAIT),
                    this.checkPageOrient(this.getTopPage());
            }),
            (t.prototype.getTopPage = function() {
                return i.prototype.getTopPage.call(this);
            }),
            (t.prototype.checkPageOrient = function(t) {
                t &&
                    (t instanceof e.MobilePageBase
                        ? t.isOrientSupported(this.orientation)
                            ? (t.orientation != this.orientation &&
                                  this.changePage(new t.constructor()),
                              (this.isOrientWarning = !1))
                            : (this.isOrientWarning = !0)
                        : (this.isOrientWarning =
                              this.orientation != e.ORI_PORTRAIT),
                    this.setOrientWarningVisible(this.isOrientWarning));
            }),
            (t.prototype.setOrientWarningVisible = function(t) {
                (document.getElementById('rotateCover').style.display = t
                    ? 'inherit'
                    : 'none'),
                    (document.getElementById('rotateCover').style.zIndex = t
                        ? '10000'
                        : '0');
            }),
            t
        );
    })(e.PageNavigatorBase);
    (e.MobilePageNavigator = t),
        __reflect(t.prototype, 'Core.MobilePageNavigator');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(a) {
    var t = (function(i) {
        function t(t) {
            void 0 === t && (t = '');
            var e = i.call(this) || this;
            return (
                '' === t ? (e.tips = new a.LocaleLabel()) : (e.skinName = t), e
            );
        }
        return __extends(t, i), t;
    })(eui.Component);
    (a.Tips = t), __reflect(t.prototype, 'Core.Tips');
    var e = (function() {
        function e() {
            if (
                ((this.tipsMap = new a.HashMap()),
                (this.showTips = !1),
                (this.tips = new t()),
                (this.tips.touchEnabled = !1),
                'Windows PC' == egret.Capabilities.os ||
                    'Mac OS' == egret.Capabilities.os)
            ) {
                var r = 0,
                    s = egret.sys.TouchHandler.prototype.onTouchMove;
                egret.sys.TouchHandler.prototype.onTouchMove = function(
                    t,
                    e,
                    i
                ) {
                    1 == r && s.call(this, t, e, i);
                };
                var n = egret.sys.TouchHandler.prototype.onTouchBegin;
                egret.sys.TouchHandler.prototype.onTouchBegin = function(
                    t,
                    e,
                    i
                ) {
                    (r = 1), n.call(this, t, e, i);
                };
                var o = egret.sys.TouchHandler.prototype.onTouchEnd;
                (egret.sys.TouchHandler.prototype.onTouchEnd = function(
                    t,
                    e,
                    i
                ) {
                    (r = 1), o.call(this, t, e, i);
                }),
                    document.addEventListener('mouseup', function(t) {
                        r = 0;
                    });
            }
            mouse.enable(egret.MainContext.instance.stage),
                mouse.setMouseMoveEnabled(!0),
                (this.stage = egret.MainContext.instance.stage);
        }
        return (
            Object.defineProperty(e, 'instance', {
                get: function() {
                    return (
                        null == e._instance && (e._instance = new e()),
                        e._instance
                    );
                },
                enumerable: !0,
                configurable: !0
            }),
            (e.setTips = function(t) {
                e.instance.clearTips(),
                    (e.instance.tips = t),
                    (e.instance.tips.touchEnabled = !1);
            }),
            (e.prototype.registerMouseTip = function(t, e, i, r) {
                if (
                    (void 0 === i && (i = null),
                    void 0 === r && (r = null),
                    null != t)
                ) {
                    var s, n;
                    'string' == typeof e ? (s = e) : (n = e),
                        r && (i = i.bind(r)),
                        this.tipsMap.set(t.hashCode, {
                            hoverObj: t,
                            tipKey: s,
                            tipFunc: n,
                            callback: i
                        }),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOver,
                            this
                        ),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOut,
                            this
                        ),
                        mouse.setButtonMode(t, !0),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_MOVE,
                            this.onMouseMove,
                            this
                        );
                }
            }),
            (e.prototype.unregisterMouseTip = function(t) {
                if (null != t && this.tipsMap.has(t.hashCode)) {
                    if (this.showTips) {
                        var e = this.tipsMap.get(t.hashCode),
                            i = e.tipKey,
                            r = e.tipFunc;
                        ((null != i && '' != i) || null != r) &&
                            this.tips.tips.localeKey === i &&
                            this.tips.tips.localeFunc === r &&
                            (this.stage.removeChild(this.tips),
                            (this.showTips = !1));
                    }
                    this.tipsMap['delete'](t.hashCode),
                        t.removeEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOver,
                            this
                        ),
                        t.removeEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOut,
                            this
                        ),
                        mouse.setButtonMode(t, !1),
                        t.removeEventListener(
                            mouse.MouseEvent.MOUSE_MOVE,
                            this.onMouseMove,
                            this
                        );
                }
            }),
            (e.prototype.onMouseOver = function(t) {
                var e = this.tipsMap.get(t.currentTarget.hashCode);
                e.callback && e.callback(mouse.MouseEvent.MOUSE_OVER, t);
                var i = e.tipKey,
                    r = e.tipFunc;
                (null != i && '' != i) || null != r
                    ? ((this.tips.tips.localeKey = i),
                      (this.tips.tips.localeFunc = r),
                      this.tips.tips.refresh(),
                      this.stage.addChild(this.tips),
                      this.tips.validateNow(),
                      t.stageX > 0.5 * this.stage.stageWidth
                          ? (this.tips.anchorOffsetX = this.tips.width + 10)
                          : (this.tips.anchorOffsetX = -10),
                      t.stageY > 0.5 * this.stage.stageHeight
                          ? (this.tips.anchorOffsetY = this.tips.height + 10)
                          : (this.tips.anchorOffsetY = -10),
                      (this.tips.x = t.stageX),
                      (this.tips.y = t.stageY),
                      (this.showTips = !0))
                    : (this.showTips && this.stage.removeChild(this.tips),
                      (this.showTips = !1));
            }),
            (e.prototype.onMouseOut = function(t) {
                this.showTips &&
                    (this.stage.removeChild(this.tips), (this.showTips = !1));
                var e = this.tipsMap.get(t.currentTarget.hashCode);
                e.callback && e.callback(mouse.MouseEvent.MOUSE_OUT, t);
            }),
            (e.prototype.onMouseMove = function(t) {
                this.tips &&
                    this.showTips &&
                    ((this.tips.x = t.stageX), (this.tips.y = t.stageY));
            }),
            (e.prototype.clearTips = function() {
                this.showTips &&
                    (this.stage.removeChild(this.tips), (this.showTips = !1));
            }),
            e
        );
    })();
    (a.MouseTips = e), __reflect(e.prototype, 'Core.MouseTips');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(s) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            Object.defineProperty(e.prototype, 'recyclerImage', {
                get: function() {
                    return this.recyclerIamge;
                },
                enumerable: !0,
                configurable: !0
            }),
            (e.prototype.loadFile = function(t, e, i) {
                if (this.fileDic[t.name]) return void e.call(i, t);
                var r = this.getRequest();
                (this.resItemDic[r.hashCode] = {
                    item: t,
                    func: e,
                    thisObject: i
                }),
                    r.open(s.AnalyzerUtils.getCDNResUrl(t)),
                    (r._xhr.timeout = s.CDN_TIMEOUT),
                    r.send();
            }),
            (e.prototype.onLoadFinish = function(t) {
                t.$target.timeoutId &&
                    (egret.clearTimeout(t.$target.timeoutId),
                    (t.$target.timeoutId = null));
                var e = t.target,
                    i = this.resItemDic[e.$hashCode];
                delete this.resItemDic[e.hashCode];
                var r = i.item,
                    s = i.func;
                if (((r.loaded = t.type == egret.Event.COMPLETE), r.loaded))
                    if (e instanceof egret.HttpRequest) {
                        r.loaded = !1;
                        var n = this.analyzeConfig(r, e.response);
                        if (n)
                            return (
                                this.loadImageCDN(n, i),
                                void this.recycler.push(e)
                            );
                    } else {
                        var o = new egret.Texture();
                        o._setBitmapData(e.data), this.analyzeBitmap(r, o);
                    }
                e instanceof egret.HttpRequest
                    ? this.recycler.push(e)
                    : this.recyclerImage.push(e),
                    s.call(i.thisObject, r);
            }),
            (e.prototype.loadImageCDN = function(t, e) {
                var i = this.getMyLoader();
                this.resItemDic[i.hashCode] = e;
                var r = e.item;
                i.load(s.AnalyzerUtils.getCDNResUrl(r, t)),
                    (i.baseURL = t),
                    void 0 === i.retryCount
                        ? (i.retryCount = 0)
                        : i.retryCount++;
            }),
            (e.prototype.getMyLoader = function() {
                var t = this.recyclerImage.pop();
                return (
                    t ||
                        ((t = new s.ImageLoader()),
                        t.addEventListener(
                            egret.Event.COMPLETE,
                            this.onImageLoadFinish,
                            this
                        ),
                        t.addEventListener(
                            egret.IOErrorEvent.IO_ERROR,
                            this.onImageLoadFinish,
                            this
                        )),
                    t
                );
            }),
            (e.prototype.onImageLoadFinish = function(t) {
                t.$target.timeoutId &&
                    (egret.clearTimeout(t.$target.timeoutId),
                    (t.$target.timeoutId = null));
                var e = t.target,
                    i = this.resItemDic[e.$hashCode],
                    r = i.item;
                i.func;
                (r.loaded = t.type == egret.Event.COMPLETE),
                    r.loaded || e.retryCount >= 3
                        ? this.onLoadFinish(t)
                        : this.loadImageCDN(e.baseURL, i);
            }),
            e
        );
    })(RES.SheetAnalyzer);
    (s.SheetAnalyzer = t), __reflect(t.prototype, 'Core.SheetAnalyzer');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(a) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.loadFile = function(e, i, r) {
                var s = function(t) {
                        createjs.Sound.off('fileload', n),
                            createjs.Sound.off('fileerror', o),
                            t || createjs.Sound.removeSound(e.url, null),
                            (e.loaded = t),
                            i.call(r, e);
                    },
                    n = createjs.Sound.on('fileload', function(t) {
                        t.id === e.name && s(!0);
                    }),
                    o = createjs.Sound.on('fileerror', function(t) {
                        t.id === e.name && s(!1);
                    });
                createjs.Sound.registerSound(
                    a.AnalyzerUtils.getCDNResUrl(e),
                    e.name
                );
            }),
            (e.prototype.destroyRes = function(t) {
                return createjs.Sound.loadComplete(t)
                    ? (createjs.Sound.removeSound(t, null), !0)
                    : !1;
            }),
            e
        );
    })(RES.SoundAnalyzer);
    (a.SoundAnalyzer = t), __reflect(t.prototype, 'Core.SoundAnalyzer');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(r) {
    var t = (function(i) {
        function t() {
            var t = (null !== i && i.apply(this, arguments)) || this;
            return (t.isConfigLoaded = !1), (t.isThemeLoaded = !1), t;
        }
        return (
            __extends(t, i),
            (t.prototype.createChildren = function() {
                var e = this;
                i.prototype.createChildren.call(this),
                    r.updatePrototype(),
                    r.patchHasRes(),
                    r.NonstopTimer.init(),
                    r.StorageManager.init(),
                    r.AGWorker.Client.init(),
                    r.LocalizeStore.init(),
                    r.SoundManager.init(),
                    r.GlobalStore.init(),
                    r.setupShortcut();
                var t = new r.AssetAdapter();
                egret.registerImplementation('eui.IAssetAdapter', t),
                    egret.registerImplementation(
                        'eui.IThemeAdapter',
                        new r.ThemeAdapter()
                    ),
                    RES.registerAnalyzer('image', r.ImageAnalyzer),
                    RES.registerAnalyzer('sheet', r.SheetAnalyzer),
                    RES.registerAnalyzer('sound', r.SoundAnalyzer),
                    RES.registerAnalyzer('json', r.JsonAnalyzer),
                    r.Config.VersionConfig.init().addEventListener(
                        egret.Event.COMPLETE,
                        function(t) {
                            t.data && e.onVersionConfigLoaded();
                        },
                        this
                    ),
                    r.Config.VersionConfig.instance.fetchConfig();
            }),
            (t.prototype.onVersionConfigLoaded = function() {
                var e = this;
                r.Config.ConcurrentLoader.load(
                    [
                        r.Config.HostConfig,
                        r.Config.ModuleConfig,
                        r.Config.DirectEnterConfig
                    ],
                    function() {
                        RES.addEventListener(
                            RES.ResourceEvent.CONFIG_COMPLETE,
                            e.onConfigComplete,
                            e
                        ),
                            r.Config.ModuleConfig.instance.moduleInfoMap.forEach(
                                function(t) {
                                    var e = t.resRoot + t.res;
                                    e && RES.loadConfig(e, t.resRoot);
                                },
                                e
                            );
                        var t = r.Config.ModuleConfig.instance.getModuleInfoByName(
                            'Default'
                        );
                        r.loadTheme(
                            t.resRoot + t.thm,
                            e.onThemeLoadComplete,
                            e,
                            e.stage
                        );
                    },
                    this
                );
            }),
            (t.prototype.onConfigComplete = function() {
                RES.removeEventListener(
                    RES.ResourceEvent.CONFIG_COMPLETE,
                    this.onConfigComplete,
                    this
                ),
                    (this.isConfigLoaded = !0),
                    this.isThemeLoaded && this.startCreateScene();
            }),
            (t.prototype.onThemeLoadComplete = function() {
                (this.isThemeLoaded = !0),
                    this.isConfigLoaded && this.startCreateScene();
            }),
            (t.prototype.startCreateScene = function() {
                r.ExternalData.device === r.DEV_PC
                    ? ((r.rootPageNavigator = new r.PCPageNavigator()),
                      (r.rootPageNavigator.percentWidth = 100),
                      (r.rootPageNavigator.percentHeight = 100),
                      this.addChild(r.rootPageNavigator))
                    : ((r.pageNavigator = new r.MobilePageNavigator()),
                      this.addChild(r.pageNavigator)),
                    r.SilentLoadManager.init(),
                    r.ModuleResLoader.init(),
                    (r.moduleNavigator = r.ModuleNavigator.init()),
                    (r.moduleNavigator.moduleInfoMap =
                        r.Config.ModuleConfig.instance.moduleInfoMap);
                var t = r.Config.DirectEnterConfig.instance.gameInfoMap.get(
                        '0'
                    ),
                    e = r.Config.DirectEnterConfig.instance.gameInfoMap.get(
                        r.ExternalData.directEnterId
                    );
                e
                    ? r.ModuleNavigator.instance.changeModule(t.moduleName, e)
                    : (console.warn(
                          'Direct enter ID (' +
                              r.ExternalData.directEnterId +
                              ') not defined!'
                      ),
                      r.ModuleNavigator.instance.changeModule(t.moduleName, t));
            }),
            t
        );
    })(eui.UILayer);
    (r.Main = t), __reflect(t.prototype, 'Core.Main');
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(s) {
    var t;
    !(function(t) {
        var e = (function() {
            function t() {}
            return (
                (t.load = function(t, e, i) {
                    var r = this;
                    (this.configIdMap = new s.HashMap()),
                        (this.callback = e),
                        (this.thisArg = i),
                        t.forEach(function(t) {
                            t
                                .init()
                                .addEventListener(
                                    egret.Event.COMPLETE,
                                    r.onConfigComplete,
                                    r
                                ),
                                r.configIdMap.set(t.instance.id, null),
                                t.instance.fetchConfig();
                        }, this);
                }),
                (t.onConfigComplete = function(t) {
                    var e = t.data;
                    e.success
                        ? (this.configIdMap['delete'](e.configId),
                          0 === this.configIdMap.keys.length &&
                              this.callback.call(this.thisArg))
                        : console.error(e.configId + ' fail');
                }),
                t
            );
        })();
        (t.ConcurrentLoader = e),
            __reflect(e.prototype, 'Core.Config.ConcurrentLoader');
    })((t = s.Config || (s.Config = {})));
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(r) {
    var t;
    !(function(i) {
        var t = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                Object.defineProperty(e, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(e.prototype, 'id', {
                    get: function() {
                        return 'games_direct_enter';
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.prototype.parseXmlObj = function(t) {
                    var e = this;
                    (this.gameInfoMap = new r.HashMap()),
                        r.XMLReader.read(t)
                            .find('game')
                            .forEach(function(t) {
                                e.gameInfoMap.set(
                                    t.attr('id'),
                                    new i.GameInfo(t)
                                );
                            }, this);
                }),
                e
            );
        })(i.CachedConfigBase);
        (i.DirectEnterConfig = t),
            __reflect(t.prototype, 'Core.Config.DirectEnterConfig');
    })((t = r.Config || (r.Config = {})));
})(Core || (Core = {}));
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var Core;
!(function(s) {
    var t;
    !(function(r) {
        var t = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                Object.defineProperty(e, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.init = function() {
                    return this.initInstance(this);
                }),
                (e.prototype.getHost = function(t, e, i) {
                    void 0 === e && (e = ''), void 0 === i && (i = '');
                    var r = this.getHostList(t, e, i);
                    return r.length <= 0
                        ? (console.error(
                              'No host found, check your host_config'
                          ),
                          null)
                        : r[0];
                }),
                (e.prototype.getHostByVid = function(e) {
                    var i;
                    return (
                        this.hostList.forEach(function(t) {
                            t.vids.indexOf(e) >= 0 && (i = t);
                        }, this),
                        i
                    );
                }),
                (e.prototype.getHostByServerId = function(e, i) {
                    void 0 === i && (i = !1);
                    var r;
                    return (
                        this.hostList.forEach(function(t) {
                            t.serverid === e && t.isWatch === i && (r = t);
                        }, this),
                        r
                    );
                }),
                (e.prototype.getHostList = function(e, i, r) {
                    if (
                        (void 0 === i && (i = ''),
                        void 0 === r && (r = ''),
                        !this.hostList)
                    )
                        return [];
                    var s = [];
                    return (
                        this.hostList.forEach(function(t) {
                            t.hostType === e &&
                                t.gameType === i &&
                                t.platform === r &&
                                s.push(t);
                        }, this),
                        s
                    );
                }),
                (e.prototype.addDnsIpList = function(e) {
                    return !e || e.length <= 0
                        ? void console.warn('Empty DNSApi ips!')
                        : void this.hostList.forEach(function(t) {
                              t.domainList = e.concat(t.domainList);
                          }, this);
                }),
                (e.prototype.replaceDomainList = function(e) {
                    return !e || e.length <= 0
                        ? void console.warn('Empty user static domain!')
                        : void this.hostList.forEach(function(t) {
                              t.domainList = e.slice();
                          });
                }),
                Object.defineProperty(e.prototype, 'id', {
                    get: function() {
                        return 'host_config';
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.prototype.parseXmlObj = function(t) {
                    var i = this;
                    (this.hostList = []),
                        s.XMLReader.read(t)
                            .find('environment')
                            .forEach(function(t) {
                                t.attr('name') === s.ExternalData.env &&
                                    ((i.envDomainList = (s.ExternalData.useSSL
                                        ? t.attr('sslDomain')
                                        : t.attr('domain')
                                    ).split(' ')),
                                    t.find('host').forEach(function(t) {
                                        var e = new r.HostInfo(t);
                                        e.domainList.length <= 0 &&
                                            (e.domainList = i.envDomainList),
                                            i.hostList.push(e);
                                    }, i));
                            }, this);
                }),
                e
            );
        })(r.CachedConfigBase);
        (r.HostConfig = t), __reflect(t.prototype, 'Core.Config.HostConfig');
    })((t = s.Config || (s.Config = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t;
    !(function(t) {
        var e = (function(t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(e, t),
                Object.defineProperty(e, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.init = function() {
                    return this.initInstance(this);
                }),
                (e.prototype.getModuleNameByGameType = function(t) {
                    var e = this.moduleInfoMap.getItemByProperty('gameType', t);
                    return e.length <= 0
                        ? void console.error(
                              'No module for ' + t + ', check module_config.xml'
                          )
                        : e[0].name;
                }),
                (e.prototype.getModuleInfoByName = function(t) {
                    var e = this.moduleInfoMap.get(t);
                    return (
                        e ||
                            console.error(
                                'No module ' +
                                    t +
                                    ' exist, check module_config.xml'
                            ),
                        e
                    );
                }),
                Object.defineProperty(e.prototype, 'id', {
                    get: function() {
                        return 'module_config';
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (e.prototype.parseXmlObj = function(t) {
                    var r = this;
                    (this.moduleInfoMap = new i.HashMap()),
                        i.XMLReader.read(t)
                            .find('module')
                            .forEach(function(t) {
                                var e = t.attr('name'),
                                    i = {
                                        name: e,
                                        gameType: t.attr('gameType'),
                                        js: t.attr('js'),
                                        resRoot: t.attr('resRoot'),
                                        res: t.attr('res'),
                                        thm: t.attr('thm'),
                                        grpName: t.attr('grpName'),
                                        version: t.attr('version'),
                                        releaseType: t.intAttr('releaseType'),
                                        deps: t.listAttr('deps')
                                    };
                                r.moduleInfoMap.set(e, i);
                            }, this);
                }),
                e
            );
        })(t.CachedConfigBase);
        (t.ModuleConfig = e),
            __reflect(e.prototype, 'Core.Config.ModuleConfig');
    })((t = i.Config || (i.Config = {})));
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function() {
        function s() {
            (this.scrollerMap = new t.HashMap()),
                (this.rectMap = new t.HashMap()),
                mouse.enable(egret.MainContext.instance.stage);
        }
        return (
            Object.defineProperty(s, 'instance', {
                get: function() {
                    return (
                        null == s._instance && (s._instance = new s()),
                        s._instance
                    );
                },
                enumerable: !0,
                configurable: !0
            }),
            (s.prototype.registerWheelControl = function(t, e) {
                void 0 === e && (e = null),
                    null != t &&
                        (this.scrollerMap.set(t.hashCode, {
                            scroller: t,
                            rect: e
                        }),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOver,
                            this
                        ),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOut,
                            this
                        )),
                    null != e &&
                        (this.rectMap.set(e.hashCode, { scroller: t, rect: e }),
                        e.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOver,
                            this
                        ),
                        e.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOut,
                            this
                        ));
            }),
            (s.prototype.unregisterWheelControl = function(t, e) {
                void 0 === e && (e = null),
                    null != t &&
                        this.scrollerMap.has(t.hashCode) &&
                        (this.scrollerMap['delete'](t.hashCode),
                        t.removeEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOver,
                            this
                        ),
                        t.removeEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOut,
                            this
                        )),
                    null != e &&
                        this.rectMap.has(e.hashCode) &&
                        (this.rectMap['delete'](e.hashCode),
                        e.removeEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOver,
                            this
                        ),
                        e.removeEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOut,
                            this
                        ));
            }),
            (s.prototype.onMouseOver = function(t) {
                var e = t.currentTarget.hashCode;
                this.scrollerMap.has(e)
                    ? ((this.currentScroller = this.scrollerMap.get(
                          e
                      ).scroller),
                      document.addEventListener('wheel', this.wheelEvent))
                    : this.rectMap.has(e) &&
                      ((this.currentScroller = this.rectMap.get(e).scroller),
                      document.addEventListener('wheel', this.wheelEvent));
            }),
            (s.prototype.onMouseOut = function(t) {
                var e = t.currentTarget.hashCode;
                (this.scrollerMap.has(e) || this.rectMap.has(e)) &&
                    ((this.currentScroller = null),
                    document.removeEventListener('wheel', this.wheelEvent));
            }),
            (s.prototype.wheelEvent = function(t) {
                s.onwheel(t);
            }),
            (s.onwheel = function(t) {
                t.preventDefault();
                var e = s._instance.currentScroller,
                    i = 0;
                if (e && e.viewport) {
                    var r = e.viewport.contentHeight - e.height;
                    t.deltaY < 0 && e.viewport.scrollV > 0
                        ? ((i = e.viewport.scrollV + t.deltaY - 80),
                          0 > i && (i = 0),
                          (e.viewport.scrollV = i),
                          e.dispatchEventWith(egret.Event.CHANGE))
                        : t.deltaY > 0 &&
                          e.viewport.scrollV < r &&
                          ((i = e.viewport.scrollV + t.deltaY + 80),
                          i > r && (i = r),
                          (e.viewport.scrollV = i),
                          e.dispatchEventWith(egret.Event.CHANGE));
                }
            }),
            s
        );
    })();
    (t.ScrollerHelper = e), __reflect(e.prototype, 'Core.ScrollerHelper');
})(Core || (Core = {}));
var Core;
!(function(s) {
    var t;
    !(function(r) {
        var t = (function(e) {
            function t() {
                return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
                __extends(t, e),
                Object.defineProperty(t.prototype, 'urls', {
                    get: function() {
                        return [
                            '../config/version_config.xml?timestamp=' +
                                Date.now()
                        ];
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.prototype.onRequestSuccess = function(t) {
                    s.StorageManager.instance.setItem(
                        'CONFIG_version_config',
                        JSON.stringify(t)
                    ),
                        e.prototype.onRequestSuccess.call(this, t);
                }),
                (t.prototype.parseXmlObj = function(t) {
                    var i = this;
                    (this.domainList = []),
                        (this.versionInfoMap = new s.HashMap());
                    var e = s.XMLReader.read(t);
                    e.find('domain').forEach(function(t) {
                        i.domainList.push(t.text);
                    }),
                        e.find('file').forEach(function(t) {
                            var e = t.attr('id');
                            i.versionInfoMap.set(e, new r.VersionInfo(t));
                        });
                }),
                (t.prototype.onRequestFail = function() {
                    var t = s.StorageManager.instance.getItem(
                        'CONFIG_version_config'
                    );
                    t
                        ? (this.parseXmlObj(JSON.parse(t)),
                          this.dispatchEventWith(egret.Event.COMPLETE, !1, !0))
                        : this.dispatchEventWith(egret.Event.COMPLETE, !1, !1);
                }),
                Object.defineProperty(t, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                (t.init = function() {
                    return this.initInstance(this);
                }),
                t
            );
        })(s.AGWorker.ConfigBase);
        (r.VersionConfig = t),
            __reflect(t.prototype, 'Core.Config.VersionConfig');
    })((t = s.Config || (s.Config = {})));
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function() {
            function t() {}
            return t;
        })();
        (t.CachedConfigEvtData = e),
            __reflect(e.prototype, 'Core.Config.CachedConfigEvtData');
    })((e = t.Config || (t.Config = {})));
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(t) {
    var e = (function(t) {
        function e() {
            return t.call(this) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.setScroller = function(t) {
                this.scroller &&
                    (this.scroller.removeEventListener(
                        egret.Event.CHANGE,
                        this.updateThumb,
                        this
                    ),
                    (this.scroller = null)),
                    this.viewport &&
                        (this.viewport.removeEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        ),
                        (this.viewport = null)),
                    this.removeEventListener(
                        egret.Event.CHANGE,
                        this.onSliderValueChange,
                        this
                    ),
                    t &&
                        t.viewport &&
                        ((this.scroller = t),
                        (this.viewport = t.viewport),
                        this.scroller.addEventListener(
                            egret.Event.CHANGE,
                            this.updateThumb,
                            this
                        ),
                        this.onViewportResize(),
                        this.viewport.addEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        ),
                        this.addEventListener(
                            egret.Event.CHANGE,
                            this.onSliderValueChange,
                            this
                        ));
            }),
            (e.prototype.onSliderValueChange = function() {
                this.viewport.scrollV = this.maximum - this.value;
            }),
            (e.prototype.onViewportResize = function() {
                var e = this;
                egret.callLater(function() {
                    if (e.viewport) {
                        var t =
                            (e.viewport.height / e.viewport.contentHeight) *
                            e.height;
                        (e.thumb.height = t),
                            (e.thumbHeight = t),
                            (e.maximum =
                                e.viewport.contentHeight - e.viewport.height),
                            (e.value = e.maximum),
                            e.maximum > 0 &&
                                e.viewport.scrollV >= e.maximum &&
                                (e.viewport.scrollV = e.maximum),
                            e.updateThumb();
                    }
                }, e);
            }),
            (e.prototype.updateThumb = function() {
                var t,
                    e = this.maximum - this.viewport.scrollV;
                0 > e
                    ? (t = this.thumbHeight + e)
                    : this.viewport.scrollV < 0 &&
                      (t = this.thumbHeight + this.viewport.scrollV),
                    void 0 != t && (1 > t && (t = 1), (this.thumb.height = t)),
                    (this.value = e);
            }),
            (e.prototype.onReleaseRefs = function() {
                this.scroller &&
                    (this.scroller.removeEventListener(
                        egret.Event.CHANGE,
                        this.updateThumb,
                        this
                    ),
                    (this.scroller = null)),
                    this.viewport &&
                        (this.viewport.removeEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        ),
                        (this.viewport = null));
            }),
            e
        );
    })(eui.VSlider);
    (t.VScrollerSlider = e), __reflect(e.prototype, 'Core.VScrollerSlider');
})(Core || (Core = {}));
var Core;
!(function(G) {
    function n(t) {
        (t.style.position = 'absolute'),
            (t.style.border = '0'),
            (t.style.left = '0px'),
            (t.style.top = '0px');
    }
    var e = 'egretDOMRoot',
        i = (function() {
            function s() {}
            return (
                (s.initDOMRoot = function(t, e) {
                    var h = this,
                        u = document.getElementById(e);
                    if (null == u) {
                        var i = document.getElementsByClassName(
                            'egret-player'
                        )[0];
                        (u = document.createElement('div')),
                            n(u),
                            u.setAttribute('id', e),
                            (u.className = 'egret-dom-container'),
                            i.appendChild(u),
                            (s.tempStage = t);
                        var r = function() {
                            var t = document.getElementsByClassName(
                                    'egret-player'
                                )[0],
                                e = t.getElementsByTagName('canvas')[0],
                                i = t.getBoundingClientRect(),
                                r = e.getBoundingClientRect(),
                                s = !1,
                                n = h.tempStage.orientation;
                            n != egret.OrientationMode.AUTO &&
                                (s =
                                    (n != egret.OrientationMode.PORTRAIT &&
                                        i.height > i.width) ||
                                    (n == egret.OrientationMode.PORTRAIT &&
                                        i.width > i.height));
                            var o, a;
                            s
                                ? ((o = r.width / e.height),
                                  (a = r.height / e.width))
                                : ((o = r.width / e.width),
                                  (a = r.height / e.height)),
                                (u.style.left = e.style.left),
                                (u.style.top = e.style.top);
                        };
                        this.tempStage.addEventListener(
                            egret.Event.RESIZE,
                            r,
                            this
                        ),
                            r();
                    }
                }),
                (s.getDOMRoot = function(t) {
                    var e = document.getElementById(t);
                    return e;
                }),
                s
            );
        })();
    __reflect(i.prototype, 'DOMRoot');
    var t = (function() {
        function t(t) {
            void 0 === t && (t = e),
                (this.lastMatrix = new egret.Matrix()),
                (this.lastWidth = 0),
                (this.lastHeight = 0),
                (this.node = document.createElement('div')),
                (this.rootId = t),
                n(this.node);
        }
        return (
            (t.prototype.mapDisplayObject = function(t) {
                this.dp = t;
            }),
            (t.prototype.show = function() {
                i.initDOMRoot(this.dp.stage, this.rootId);
                var t = i.getDOMRoot(this.rootId);
                t.appendChild(this.node);
            }),
            (t.prototype.isRunInBackground = function(t) {
                void 0 === t && (t = !0);
                t ? this.setLayerIndex(10) : this.setLayerIndex(999);
            }),
            (t.prototype.setLayerIndex = function(t) {
                var e = i.getDOMRoot(this.rootId);
                e.style.zIndex = t.toString();
            }),
            (t.prototype.hide = function() {
                this.node &&
                    this.node.parentNode &&
                    this.node.parentNode.removeChild(this.node);
            }),
            (t.prototype.bind = function(t) {
                this.unbind(),
                    (this.element = t),
                    (this.element.style.width = '100%'),
                    (this.element.style.height = '100%'),
                    n(this.element),
                    this.node.appendChild(t);
            }),
            (t.prototype.unbind = function() {
                this.element &&
                    this.element.parentNode == this.node &&
                    this.node.removeChild(this.element),
                    (this.element = null);
            }),
            Object.defineProperty(t.prototype, 'width', {
                get: function() {
                    return this.element.style.width;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, 'height', {
                get: function() {
                    return this.element.style.height;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.updatePosition = function() {
                var t = this.dp;
                if (null != t.stage) {
                    if (
                        (t.$renderNode.renderVisible =
                            0 == t.$renderNode.renderAlpha)
                    ) {
                        if (this.element && this.element.parentNode)
                            return void this.element.parentNode.removeChild(
                                this.element
                            );
                    } else
                        this.element &&
                            null == this.element.parentNode &&
                            this.node.appendChild(this.element);
                    var e = t.$renderNode.renderMatrix;
                    if (
                        this.lastMatrix.a != e.a ||
                        this.lastMatrix.b != e.b ||
                        this.lastMatrix.c != e.c ||
                        this.lastMatrix.d != e.d ||
                        this.lastMatrix.tx != e.tx ||
                        this.lastMatrix.ty != e.ty
                    ) {
                        egret.web.getPrefixStyleName('transform');
                        (this.lastMatrix.a = e.a),
                            (this.lastMatrix.b = e.b),
                            (this.lastMatrix.c = e.c),
                            (this.lastMatrix.d = e.d),
                            (this.lastMatrix.tx = e.tx),
                            (this.lastMatrix.ty = e.ty);
                    }
                    var i = document.getElementsByClassName('egret-player')[0],
                        r = i.getElementsByTagName('canvas')[0],
                        s = i.getBoundingClientRect(),
                        n = r.getBoundingClientRect(),
                        o = !1,
                        a = egret.MainContext.instance.stage.orientation;
                    a != egret.OrientationMode.AUTO &&
                        (o =
                            (a != egret.OrientationMode.PORTRAIT &&
                                s.height > s.width) ||
                            (a == egret.OrientationMode.PORTRAIT &&
                                s.width > s.height));
                    var h, u;
                    G.ExternalData.gcDataMap.get('isRetina');
                    o
                        ? ((h = n.width / r.height), (u = n.height / r.width))
                        : ((h = n.width / r.width), (u = n.height / r.height));
                    var c = egret.sys.DisplayList.$canvasScaleX || 1,
                        f = egret.sys.DisplayList.$canvasScaleY || 1,
                        C = h * t.width * c;
                    this.lastWidth != C &&
                        ((this.node.style.width = C + 'px'),
                        (this.lastWidth = C));
                    var l = u * t.height * f;
                    this.lastHeight != l &&
                        ((this.node.style.height = l + 'px'),
                        (this.lastHeight = l));
                    var m = this.dp.parent.localToGlobal(),
                        d = m.x * h * c;
                    this.node.style.left = d + 'px';
                    var v = m.y * u * f;
                    this.node.style.top = v + 'px';
                }
            }),
            (t.prototype.addEventListener = function(t, e) {
                this.node.addEventListener(t, e);
            }),
            (t.prototype.removeEventListener = function(t, e) {
                this.node.removeEventListener(t, e);
            }),
            t
        );
    })();
    (G.DOMNode = t), __reflect(t.prototype, 'Core.DOMNode');
})(Core || (Core = {}));
var VideoGameCore;
var Core;
!(function(t) {
    function e() {
        return t.localizeStore.lang;
    }
    function i() {
        return [t.LANG_HANS, t.LANG_HANT].indexOf(e()) >= 0;
    }
    function r() {
        return t.soundManager.lang;
    }
    function s() {
        (t.localizeStore = t.LocalizeStore.instance),
            (t.translate = t.localizeStore.translate.bind(t.localizeStore)),
            (t.substitute = t.localizeStore.substitute.bind(t.localizeStore)),
            (t.translateRes = t.localizeStore.translateRes.bind(
                t.localizeStore
            )),
            (t.soundManager = t.SoundManager.instance),
            (t.ntimer = t.NonstopTimer.instance),
            (t.globalStore = t.GlobalStore.instance);
    }
    (t.getLang = e),
        (t.isChineseLang = i),
        (t.getLangSound = r),
        (t.setupShortcut = s);
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.iframe = document.createElement('iframe')),
                t.iframe.setAttribute('allow', 'autoplay; fullscreen'),
                t.bind(t.iframe),
                t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t.prototype, 'src', {
                get: function() {
                    return this._src;
                },
                set: function(t) {
                    (this._src = t), (this.iframe.src = t);
                },
                enumerable: !0,
                configurable: !0
            }),
            t
        );
    })(t.WebNode);
    (t.WebView = e), __reflect(e.prototype, 'Core.WebView');
})(Core || (Core = {}));
var VVJJQ3J5cHRv = (function(t) {
        'use strict';
        'v1.1.1';
        function e(t, e) {
            return t((e = { exports: {} }), e.exports), e.exports;
        }
        function s(t) {
            var e, s, n;
            return (
                (e = t.split('&')),
                (s = {}),
                (n = !0),
                e.forEach(function(t) {
                    var e = t.split('='),
                        i = e[0],
                        r = e[1];
                    i &&
                        ((n = !1),
                        (s[decodeURIComponent(i)] = r
                            ? decodeURIComponent(r)
                            : ''));
                }),
                !0 === n ? null : s
            );
        }
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
                ? global
                : 'undefined' != typeof self && self;
        var w = e(function(t, e) {
                var i, f, r, s, n, o, C, a, h, u, c, l, m;
                t.exports = i =
                    i ||
                    ((f = Math),
                    (r =
                        Object.create ||
                        (function() {
                            function i() {}
                            return function(t) {
                                var e;
                                return (
                                    (i.prototype = t),
                                    (e = new i()),
                                    (i.prototype = null),
                                    e
                                );
                            };
                        })()),
                    (n = (s = {}).lib = {}),
                    (o = n.Base = {
                        extend: function(t) {
                            var e = r(this);
                            return (
                                t && e.mixIn(t),
                                (e.hasOwnProperty('init') &&
                                    this.init !== e.init) ||
                                    (e.init = function() {
                                        e.$super.init.apply(this, arguments);
                                    }),
                                ((e.init.prototype = e).$super = this),
                                e
                            );
                        },
                        create: function() {
                            var t = this.extend();
                            return t.init.apply(t, arguments), t;
                        },
                        init: function() {},
                        mixIn: function(t) {
                            for (var e in t)
                                t.hasOwnProperty(e) && (this[e] = t[e]);
                            t.hasOwnProperty('toString') &&
                                (this.toString = t.toString);
                        },
                        clone: function() {
                            return this.init.prototype.extend(this);
                        }
                    }),
                    (C = n.WordArray = o.extend({
                        init: function(t, e) {
                            (t = this.words = t || []),
                                (this.sigBytes = null != e ? e : 4 * t.length);
                        },
                        toString: function(t) {
                            return (t || h).stringify(this);
                        },
                        concat: function(t) {
                            var e = this.words,
                                i = t.words,
                                r = this.sigBytes,
                                s = t.sigBytes;
                            if ((this.clamp(), r % 4))
                                for (var n = 0; s > n; n++) {
                                    var o =
                                        (i[n >>> 2] >>> (24 - (n % 4) * 8)) &
                                        255;
                                    e[(r + n) >>> 2] |=
                                        o << (24 - ((r + n) % 4) * 8);
                                }
                            else
                                for (var n = 0; s > n; n += 4)
                                    e[(r + n) >>> 2] = i[n >>> 2];
                            return (this.sigBytes += s), this;
                        },
                        clamp: function() {
                            var t = this.words,
                                e = this.sigBytes;
                            (t[e >>> 2] &= 4294967295 << (32 - (e % 4) * 8)),
                                (t.length = f.ceil(e / 4));
                        },
                        clone: function() {
                            var t = o.clone.call(this);
                            return (t.words = this.words.slice(0)), t;
                        },
                        random: function(t) {
                            for (
                                var e,
                                    i = [],
                                    r = function(e) {
                                        var e = e,
                                            i = 987654321,
                                            r = 4294967295;
                                        return function() {
                                            var t =
                                                (((i =
                                                    (36969 * (65535 & i) +
                                                        (i >> 16)) &
                                                    r) <<
                                                    16) +
                                                    (e =
                                                        (18e3 * (65535 & e) +
                                                            (e >> 16)) &
                                                        r)) &
                                                r;
                                            return (
                                                (t /= 4294967296),
                                                (t += 0.5) *
                                                    (0.5 < f.random() ? 1 : -1)
                                            );
                                        };
                                    },
                                    s = 0;
                                t > s;
                                s += 4
                            ) {
                                var n = r(4294967296 * (e || f.random()));
                                (e = 987654071 * n()),
                                    i.push((4294967296 * n()) | 0);
                            }
                            return new C.init(i, t);
                        }
                    })),
                    (a = s.enc = {}),
                    (h = a.Hex = {
                        stringify: function(t) {
                            for (
                                var e = t.words, i = t.sigBytes, r = [], s = 0;
                                i > s;
                                s++
                            ) {
                                var n =
                                    (e[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                                r.push((n >>> 4).toString(16)),
                                    r.push((15 & n).toString(16));
                            }
                            return r.join('');
                        },
                        parse: function(t) {
                            for (var e = t.length, i = [], r = 0; e > r; r += 2)
                                i[r >>> 3] |=
                                    parseInt(t.substr(r, 2), 16) <<
                                    (24 - (r % 8) * 4);
                            return new C.init(i, e / 2);
                        }
                    }),
                    (u = a.Latin1 = {
                        stringify: function(t) {
                            for (
                                var e = t.words, i = t.sigBytes, r = [], s = 0;
                                i > s;
                                s++
                            ) {
                                var n =
                                    (e[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                                r.push(String.fromCharCode(n));
                            }
                            return r.join('');
                        },
                        parse: function(t) {
                            for (var e = t.length, i = [], r = 0; e > r; r++)
                                i[r >>> 2] |=
                                    (255 & t.charCodeAt(r)) <<
                                    (24 - (r % 4) * 8);
                            return new C.init(i, e);
                        }
                    }),
                    (c = a.Utf8 = {
                        stringify: function(t) {
                            try {
                                return decodeURIComponent(
                                    escape(u.stringify(t))
                                );
                            } catch (t) {
                                throw new Error('Malformed UTF-8 data');
                            }
                        },
                        parse: function(t) {
                            return u.parse(unescape(encodeURIComponent(t)));
                        }
                    }),
                    (l = n.BufferedBlockAlgorithm = o.extend({
                        reset: function() {
                            (this._data = new C.init()), (this._nDataBytes = 0);
                        },
                        _append: function(t) {
                            'string' == typeof t && (t = c.parse(t)),
                                this._data.concat(t),
                                (this._nDataBytes += t.sigBytes);
                        },
                        _process: function(t) {
                            var e = this._data,
                                i = e.words,
                                r = e.sigBytes,
                                s = this.blockSize,
                                n = 4 * s,
                                o = r / n,
                                a =
                                    (o = t
                                        ? f.ceil(o)
                                        : f.max(
                                              (0 | o) - this._minBufferSize,
                                              0
                                          )) * s,
                                h = f.min(4 * a, r);
                            if (a) {
                                for (var u = 0; a > u; u += s)
                                    this._doProcessBlock(i, u);
                                var c = i.splice(0, a);
                                e.sigBytes -= h;
                            }
                            return new C.init(c, h);
                        },
                        clone: function() {
                            var t = o.clone.call(this);
                            return (t._data = this._data.clone()), t;
                        },
                        _minBufferSize: 0
                    })),
                    (n.Hasher = l.extend({
                        cfg: o.extend(),
                        init: function(t) {
                            (this.cfg = this.cfg.extend(t)), this.reset();
                        },
                        reset: function() {
                            l.reset.call(this), this._doReset();
                        },
                        update: function(t) {
                            return this._append(t), this._process(), this;
                        },
                        finalize: function(t) {
                            t && this._append(t);
                            var e = this._doFinalize();
                            return e;
                        },
                        blockSize: 16,
                        _createHelper: function(i) {
                            return function(t, e) {
                                return new i.init(e).finalize(t);
                            };
                        },
                        _createHmacHelper: function(i) {
                            return function(t, e) {
                                return new m.HMAC.init(i, e).finalize(t);
                            };
                        }
                    })),
                    (m = s.algo = {}),
                    s);
            }),
            a = (e(function(t, e) {
                var i, r, h;
                t.exports = ((h = (r = i = w).lib.WordArray),
                (r.enc.Base64 = {
                    stringify: function(t) {
                        var e = t.words,
                            i = t.sigBytes,
                            r = this._map;
                        t.clamp();
                        for (var s = [], n = 0; i > n; n += 3)
                            for (
                                var o =
                                        (((e[n >>> 2] >>> (24 - (n % 4) * 8)) &
                                            255) <<
                                            16) |
                                        (((e[(n + 1) >>> 2] >>>
                                            (24 - ((n + 1) % 4) * 8)) &
                                            255) <<
                                            8) |
                                        ((e[(n + 2) >>> 2] >>>
                                            (24 - ((n + 2) % 4) * 8)) &
                                            255),
                                    a = 0;
                                4 > a && i > n + 0.75 * a;
                                a++
                            )
                                s.push(r.charAt((o >>> (6 * (3 - a))) & 63));
                        var h = r.charAt(64);
                        if (h) for (; s.length % 4; ) s.push(h);
                        return s.join('');
                    },
                    parse: function(t) {
                        var e = t.length,
                            i = this._map,
                            r = this._reverseMap;
                        if (!r) {
                            r = this._reverseMap = [];
                            for (var s = 0; s < i.length; s++)
                                r[i.charCodeAt(s)] = s;
                        }
                        var n = i.charAt(64);
                        if (n) {
                            var o = t.indexOf(n);
                            -1 !== o && (e = o);
                        }
                        return (function(t, e, i) {
                            for (var r = [], s = 0, n = 0; e > n; n++)
                                if (n % 4) {
                                    var o =
                                            i[t.charCodeAt(n - 1)] <<
                                            ((n % 4) * 2),
                                        a =
                                            i[t.charCodeAt(n)] >>>
                                            (6 - (n % 4) * 2);
                                    (r[s >>> 2] |=
                                        (o | a) << (24 - (s % 4) * 8)),
                                        s++;
                                }
                            return h.create(r, s);
                        })(t, e, r);
                    },
                    _map:
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
                }),
                i.enc.Base64);
            }),
            e(function(t, e) {
                var o;
                t.exports = ((o = w),
                (function(c) {
                    function z(t, e, i, r, s, n, o) {
                        var a = t + ((e & i) | (~e & r)) + s + o;
                        return ((a << n) | (a >>> (32 - n))) + e;
                    }
                    function S(t, e, i, r, s, n, o) {
                        var a = t + ((e & r) | (i & ~r)) + s + o;
                        return ((a << n) | (a >>> (32 - n))) + e;
                    }
                    function y(t, e, i, r, s, n, o) {
                        var a = t + (e ^ i ^ r) + s + o;
                        return ((a << n) | (a >>> (32 - n))) + e;
                    }
                    function E(t, e, i, r, s, n, o) {
                        var a = t + (i ^ (e | ~r)) + s + o;
                        return ((a << n) | (a >>> (32 - n))) + e;
                    }
                    var t = o,
                        e = t.lib,
                        i = e.WordArray,
                        r = e.Hasher,
                        s = t.algo,
                        T = [];
                    !(function() {
                        for (var t = 0; 64 > t; t++)
                            T[t] = (4294967296 * c.abs(c.sin(t + 1))) | 0;
                    })();
                    var n = (s.MD5 = r.extend({
                        _doReset: function() {
                            this._hash = new i.init([
                                1732584193,
                                4023233417,
                                2562383102,
                                271733878
                            ]);
                        },
                        _doProcessBlock: function(t, e) {
                            for (var i = 0; 16 > i; i++) {
                                var r = e + i,
                                    s = t[r];
                                t[r] =
                                    (16711935 & ((s << 8) | (s >>> 24))) |
                                    (4278255360 & ((s << 24) | (s >>> 8)));
                            }
                            var n = this._hash.words,
                                o = t[e + 0],
                                a = t[e + 1],
                                h = t[e + 2],
                                u = t[e + 3],
                                c = t[e + 4],
                                f = t[e + 5],
                                C = t[e + 6],
                                l = t[e + 7],
                                m = t[e + 8],
                                d = t[e + 9],
                                v = t[e + 10],
                                G = t[e + 11],
                                _ = t[e + 12],
                                b = t[e + 13],
                                P = t[e + 14],
                                V = t[e + 15],
                                g = n[0],
                                p = n[1],
                                k = n[2],
                                w = n[3];
                            (p = E(
                                (p = E(
                                    (p = E(
                                        (p = E(
                                            (p = y(
                                                (p = y(
                                                    (p = y(
                                                        (p = y(
                                                            (p = S(
                                                                (p = S(
                                                                    (p = S(
                                                                        (p = S(
                                                                            (p = z(
                                                                                (p = z(
                                                                                    (p = z(
                                                                                        (p = z(
                                                                                            p,
                                                                                            (k = z(
                                                                                                k,
                                                                                                (w = z(
                                                                                                    w,
                                                                                                    (g = z(
                                                                                                        g,
                                                                                                        p,
                                                                                                        k,
                                                                                                        w,
                                                                                                        o,
                                                                                                        7,
                                                                                                        T[0]
                                                                                                    )),
                                                                                                    p,
                                                                                                    k,
                                                                                                    a,
                                                                                                    12,
                                                                                                    T[1]
                                                                                                )),
                                                                                                g,
                                                                                                p,
                                                                                                h,
                                                                                                17,
                                                                                                T[2]
                                                                                            )),
                                                                                            w,
                                                                                            g,
                                                                                            u,
                                                                                            22,
                                                                                            T[3]
                                                                                        )),
                                                                                        (k = z(
                                                                                            k,
                                                                                            (w = z(
                                                                                                w,
                                                                                                (g = z(
                                                                                                    g,
                                                                                                    p,
                                                                                                    k,
                                                                                                    w,
                                                                                                    c,
                                                                                                    7,
                                                                                                    T[4]
                                                                                                )),
                                                                                                p,
                                                                                                k,
                                                                                                f,
                                                                                                12,
                                                                                                T[5]
                                                                                            )),
                                                                                            g,
                                                                                            p,
                                                                                            C,
                                                                                            17,
                                                                                            T[6]
                                                                                        )),
                                                                                        w,
                                                                                        g,
                                                                                        l,
                                                                                        22,
                                                                                        T[7]
                                                                                    )),
                                                                                    (k = z(
                                                                                        k,
                                                                                        (w = z(
                                                                                            w,
                                                                                            (g = z(
                                                                                                g,
                                                                                                p,
                                                                                                k,
                                                                                                w,
                                                                                                m,
                                                                                                7,
                                                                                                T[8]
                                                                                            )),
                                                                                            p,
                                                                                            k,
                                                                                            d,
                                                                                            12,
                                                                                            T[9]
                                                                                        )),
                                                                                        g,
                                                                                        p,
                                                                                        v,
                                                                                        17,
                                                                                        T[10]
                                                                                    )),
                                                                                    w,
                                                                                    g,
                                                                                    G,
                                                                                    22,
                                                                                    T[11]
                                                                                )),
                                                                                (k = z(
                                                                                    k,
                                                                                    (w = z(
                                                                                        w,
                                                                                        (g = z(
                                                                                            g,
                                                                                            p,
                                                                                            k,
                                                                                            w,
                                                                                            _,
                                                                                            7,
                                                                                            T[12]
                                                                                        )),
                                                                                        p,
                                                                                        k,
                                                                                        b,
                                                                                        12,
                                                                                        T[13]
                                                                                    )),
                                                                                    g,
                                                                                    p,
                                                                                    P,
                                                                                    17,
                                                                                    T[14]
                                                                                )),
                                                                                w,
                                                                                g,
                                                                                V,
                                                                                22,
                                                                                T[15]
                                                                            )),
                                                                            (k = S(
                                                                                k,
                                                                                (w = S(
                                                                                    w,
                                                                                    (g = S(
                                                                                        g,
                                                                                        p,
                                                                                        k,
                                                                                        w,
                                                                                        a,
                                                                                        5,
                                                                                        T[16]
                                                                                    )),
                                                                                    p,
                                                                                    k,
                                                                                    C,
                                                                                    9,
                                                                                    T[17]
                                                                                )),
                                                                                g,
                                                                                p,
                                                                                G,
                                                                                14,
                                                                                T[18]
                                                                            )),
                                                                            w,
                                                                            g,
                                                                            o,
                                                                            20,
                                                                            T[19]
                                                                        )),
                                                                        (k = S(
                                                                            k,
                                                                            (w = S(
                                                                                w,
                                                                                (g = S(
                                                                                    g,
                                                                                    p,
                                                                                    k,
                                                                                    w,
                                                                                    f,
                                                                                    5,
                                                                                    T[20]
                                                                                )),
                                                                                p,
                                                                                k,
                                                                                v,
                                                                                9,
                                                                                T[21]
                                                                            )),
                                                                            g,
                                                                            p,
                                                                            V,
                                                                            14,
                                                                            T[22]
                                                                        )),
                                                                        w,
                                                                        g,
                                                                        c,
                                                                        20,
                                                                        T[23]
                                                                    )),
                                                                    (k = S(
                                                                        k,
                                                                        (w = S(
                                                                            w,
                                                                            (g = S(
                                                                                g,
                                                                                p,
                                                                                k,
                                                                                w,
                                                                                d,
                                                                                5,
                                                                                T[24]
                                                                            )),
                                                                            p,
                                                                            k,
                                                                            P,
                                                                            9,
                                                                            T[25]
                                                                        )),
                                                                        g,
                                                                        p,
                                                                        u,
                                                                        14,
                                                                        T[26]
                                                                    )),
                                                                    w,
                                                                    g,
                                                                    m,
                                                                    20,
                                                                    T[27]
                                                                )),
                                                                (k = S(
                                                                    k,
                                                                    (w = S(
                                                                        w,
                                                                        (g = S(
                                                                            g,
                                                                            p,
                                                                            k,
                                                                            w,
                                                                            b,
                                                                            5,
                                                                            T[28]
                                                                        )),
                                                                        p,
                                                                        k,
                                                                        h,
                                                                        9,
                                                                        T[29]
                                                                    )),
                                                                    g,
                                                                    p,
                                                                    l,
                                                                    14,
                                                                    T[30]
                                                                )),
                                                                w,
                                                                g,
                                                                _,
                                                                20,
                                                                T[31]
                                                            )),
                                                            (k = y(
                                                                k,
                                                                (w = y(
                                                                    w,
                                                                    (g = y(
                                                                        g,
                                                                        p,
                                                                        k,
                                                                        w,
                                                                        f,
                                                                        4,
                                                                        T[32]
                                                                    )),
                                                                    p,
                                                                    k,
                                                                    m,
                                                                    11,
                                                                    T[33]
                                                                )),
                                                                g,
                                                                p,
                                                                G,
                                                                16,
                                                                T[34]
                                                            )),
                                                            w,
                                                            g,
                                                            P,
                                                            23,
                                                            T[35]
                                                        )),
                                                        (k = y(
                                                            k,
                                                            (w = y(
                                                                w,
                                                                (g = y(
                                                                    g,
                                                                    p,
                                                                    k,
                                                                    w,
                                                                    a,
                                                                    4,
                                                                    T[36]
                                                                )),
                                                                p,
                                                                k,
                                                                c,
                                                                11,
                                                                T[37]
                                                            )),
                                                            g,
                                                            p,
                                                            l,
                                                            16,
                                                            T[38]
                                                        )),
                                                        w,
                                                        g,
                                                        v,
                                                        23,
                                                        T[39]
                                                    )),
                                                    (k = y(
                                                        k,
                                                        (w = y(
                                                            w,
                                                            (g = y(
                                                                g,
                                                                p,
                                                                k,
                                                                w,
                                                                b,
                                                                4,
                                                                T[40]
                                                            )),
                                                            p,
                                                            k,
                                                            o,
                                                            11,
                                                            T[41]
                                                        )),
                                                        g,
                                                        p,
                                                        u,
                                                        16,
                                                        T[42]
                                                    )),
                                                    w,
                                                    g,
                                                    C,
                                                    23,
                                                    T[43]
                                                )),
                                                (k = y(
                                                    k,
                                                    (w = y(
                                                        w,
                                                        (g = y(
                                                            g,
                                                            p,
                                                            k,
                                                            w,
                                                            d,
                                                            4,
                                                            T[44]
                                                        )),
                                                        p,
                                                        k,
                                                        _,
                                                        11,
                                                        T[45]
                                                    )),
                                                    g,
                                                    p,
                                                    V,
                                                    16,
                                                    T[46]
                                                )),
                                                w,
                                                g,
                                                h,
                                                23,
                                                T[47]
                                            )),
                                            (k = E(
                                                k,
                                                (w = E(
                                                    w,
                                                    (g = E(
                                                        g,
                                                        p,
                                                        k,
                                                        w,
                                                        o,
                                                        6,
                                                        T[48]
                                                    )),
                                                    p,
                                                    k,
                                                    l,
                                                    10,
                                                    T[49]
                                                )),
                                                g,
                                                p,
                                                P,
                                                15,
                                                T[50]
                                            )),
                                            w,
                                            g,
                                            f,
                                            21,
                                            T[51]
                                        )),
                                        (k = E(
                                            k,
                                            (w = E(
                                                w,
                                                (g = E(
                                                    g,
                                                    p,
                                                    k,
                                                    w,
                                                    _,
                                                    6,
                                                    T[52]
                                                )),
                                                p,
                                                k,
                                                u,
                                                10,
                                                T[53]
                                            )),
                                            g,
                                            p,
                                            v,
                                            15,
                                            T[54]
                                        )),
                                        w,
                                        g,
                                        a,
                                        21,
                                        T[55]
                                    )),
                                    (k = E(
                                        k,
                                        (w = E(
                                            w,
                                            (g = E(g, p, k, w, m, 6, T[56])),
                                            p,
                                            k,
                                            V,
                                            10,
                                            T[57]
                                        )),
                                        g,
                                        p,
                                        C,
                                        15,
                                        T[58]
                                    )),
                                    w,
                                    g,
                                    b,
                                    21,
                                    T[59]
                                )),
                                (k = E(
                                    k,
                                    (w = E(
                                        w,
                                        (g = E(g, p, k, w, c, 6, T[60])),
                                        p,
                                        k,
                                        G,
                                        10,
                                        T[61]
                                    )),
                                    g,
                                    p,
                                    h,
                                    15,
                                    T[62]
                                )),
                                w,
                                g,
                                d,
                                21,
                                T[63]
                            )),
                                (n[0] = (n[0] + g) | 0),
                                (n[1] = (n[1] + p) | 0),
                                (n[2] = (n[2] + k) | 0),
                                (n[3] = (n[3] + w) | 0);
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                e = t.words,
                                i = 8 * this._nDataBytes,
                                r = 8 * t.sigBytes;
                            e[r >>> 5] |= 128 << (24 - (r % 32));
                            var s = c.floor(i / 4294967296),
                                n = i;
                            (e[15 + (((r + 64) >>> 9) << 4)] =
                                (16711935 & ((s << 8) | (s >>> 24))) |
                                (4278255360 & ((s << 24) | (s >>> 8)))),
                                (e[14 + (((r + 64) >>> 9) << 4)] =
                                    (16711935 & ((n << 8) | (n >>> 24))) |
                                    (4278255360 & ((n << 24) | (n >>> 8)))),
                                (t.sigBytes = 4 * (e.length + 1)),
                                this._process();
                            for (
                                var o = this._hash, a = o.words, h = 0;
                                4 > h;
                                h++
                            ) {
                                var u = a[h];
                                a[h] =
                                    (16711935 & ((u << 8) | (u >>> 24))) |
                                    (4278255360 & ((u << 24) | (u >>> 8)));
                            }
                            return o;
                        },
                        clone: function() {
                            var t = r.clone.call(this);
                            return (t._hash = this._hash.clone()), t;
                        }
                    }));
                    (t.MD5 = r._createHelper(n)),
                        (t.HmacMD5 = r._createHmacHelper(n));
                })(Math),
                o.MD5);
            }),
            e(function(t, e) {
                var i, r, s, n, o, a, f, h;
                t.exports = ((s = (r = i = w).lib),
                (n = s.WordArray),
                (o = s.Hasher),
                (a = r.algo),
                (f = []),
                (h = a.SHA1 = o.extend({
                    _doReset: function() {
                        this._hash = new n.init([
                            1732584193,
                            4023233417,
                            2562383102,
                            271733878,
                            3285377520
                        ]);
                    },
                    _doProcessBlock: function(t, e) {
                        for (
                            var i = this._hash.words,
                                r = i[0],
                                s = i[1],
                                n = i[2],
                                o = i[3],
                                a = i[4],
                                h = 0;
                            80 > h;
                            h++
                        ) {
                            if (16 > h) f[h] = 0 | t[e + h];
                            else {
                                var u =
                                    f[h - 3] ^ f[h - 8] ^ f[h - 14] ^ f[h - 16];
                                f[h] = (u << 1) | (u >>> 31);
                            }
                            var c = ((r << 5) | (r >>> 27)) + a + f[h];
                            (c +=
                                20 > h
                                    ? 1518500249 + ((s & n) | (~s & o))
                                    : 40 > h
                                        ? 1859775393 + (s ^ n ^ o)
                                        : 60 > h
                                            ? ((s & n) | (s & o) | (n & o)) -
                                              1894007588
                                            : (s ^ n ^ o) - 899497514),
                                (a = o),
                                (o = n),
                                (n = (s << 30) | (s >>> 2)),
                                (s = r),
                                (r = c);
                        }
                        (i[0] = (i[0] + r) | 0),
                            (i[1] = (i[1] + s) | 0),
                            (i[2] = (i[2] + n) | 0),
                            (i[3] = (i[3] + o) | 0),
                            (i[4] = (i[4] + a) | 0);
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            e = t.words,
                            i = 8 * this._nDataBytes,
                            r = 8 * t.sigBytes;
                        return (
                            (e[r >>> 5] |= 128 << (24 - (r % 32))),
                            (e[14 + (((r + 64) >>> 9) << 4)] = Math.floor(
                                i / 4294967296
                            )),
                            (e[15 + (((r + 64) >>> 9) << 4)] = i),
                            (t.sigBytes = 4 * e.length),
                            this._process(),
                            this._hash
                        );
                    },
                    clone: function() {
                        var t = o.clone.call(this);
                        return (t._hash = this._hash.clone()), t;
                    }
                })),
                (r.SHA1 = o._createHelper(h)),
                (r.HmacSHA1 = o._createHmacHelper(h)),
                i.SHA1);
            }),
            e(function(t, e) {
                var i, r, s, n, u, o;
                t.exports = ((r = (i = w).lib),
                (s = r.Base),
                (n = i.enc),
                (u = n.Utf8),
                (o = i.algo),
                void (o.HMAC = s.extend({
                    init: function(t, e) {
                        (t = this._hasher = new t.init()),
                            'string' == typeof e && (e = u.parse(e));
                        var i = t.blockSize,
                            r = 4 * i;
                        e.sigBytes > r && (e = t.finalize(e)), e.clamp();
                        for (
                            var s = (this._oKey = e.clone()),
                                n = (this._iKey = e.clone()),
                                o = s.words,
                                a = n.words,
                                h = 0;
                            i > h;
                            h++
                        )
                            (o[h] ^= 1549556828), (a[h] ^= 909522486);
                        (s.sigBytes = n.sigBytes = r), this.reset();
                    },
                    reset: function() {
                        var t = this._hasher;
                        t.reset(), t.update(this._iKey);
                    },
                    update: function(t) {
                        return this._hasher.update(t), this;
                    },
                    finalize: function(t) {
                        var e = this._hasher,
                            i = e.finalize(t);
                        e.reset();
                        var r = e.finalize(this._oKey.clone().concat(i));
                        return r;
                    }
                })));
            }),
            e(function(t, e) {
                var i, r, s, n, c, o, a, h;
                t.exports = ((s = (r = i = w).lib),
                (n = s.Base),
                (c = s.WordArray),
                (o = r.algo),
                (a = o.MD5),
                (h = o.EvpKDF = n.extend({
                    cfg: n.extend({ keySize: 4, hasher: a, iterations: 1 }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t);
                    },
                    compute: function(t, e) {
                        for (
                            var i = this.cfg,
                                r = i.hasher.create(),
                                s = c.create(),
                                n = s.words,
                                o = i.keySize,
                                a = i.iterations;
                            n.length < o;

                        ) {
                            h && r.update(h);
                            var h = r.update(t).finalize(e);
                            r.reset();
                            for (var u = 1; a > u; u++)
                                (h = r.finalize(h)), r.reset();
                            s.concat(h);
                        }
                        return (s.sigBytes = 4 * o), s;
                    }
                })),
                (r.EvpKDF = function(t, e, i) {
                    return h.create(i).compute(t, e);
                }),
                i.EvpKDF);
            }),
            e(function(t, e) {
                var i,
                    r,
                    s,
                    n,
                    h,
                    o,
                    a,
                    u,
                    c,
                    f,
                    C,
                    l,
                    m,
                    d,
                    v,
                    G,
                    _,
                    b,
                    P,
                    V,
                    g,
                    p,
                    k;
                t.exports = void (
                    (i = w).lib.Cipher ||
                    ((s = (r = i).lib),
                    (n = s.Base),
                    (h = s.WordArray),
                    (o = s.BufferedBlockAlgorithm),
                    (a = r.enc).Utf8,
                    (u = a.Base64),
                    (c = r.algo),
                    (f = c.EvpKDF),
                    (C = s.Cipher = o.extend({
                        cfg: n.extend(),
                        createEncryptor: function(t, e) {
                            return this.create(this._ENC_XFORM_MODE, t, e);
                        },
                        createDecryptor: function(t, e) {
                            return this.create(this._DEC_XFORM_MODE, t, e);
                        },
                        init: function(t, e, i) {
                            (this.cfg = this.cfg.extend(i)),
                                (this._xformMode = t),
                                (this._key = e),
                                this.reset();
                        },
                        reset: function() {
                            o.reset.call(this), this._doReset();
                        },
                        process: function(t) {
                            return this._append(t), this._process();
                        },
                        finalize: function(t) {
                            t && this._append(t);
                            var e = this._doFinalize();
                            return e;
                        },
                        keySize: 4,
                        ivSize: 4,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: (function() {
                            function s(t) {
                                return 'string' == typeof t ? k : V;
                            }
                            return function(r) {
                                return {
                                    encrypt: function(t, e, i) {
                                        return s(e).encrypt(r, t, e, i);
                                    },
                                    decrypt: function(t, e, i) {
                                        return s(e).decrypt(r, t, e, i);
                                    }
                                };
                            };
                        })()
                    })),
                    (s.StreamCipher = C.extend({
                        _doFinalize: function() {
                            var t = this._process(!0);
                            return t;
                        },
                        blockSize: 1
                    })),
                    (l = r.mode = {}),
                    (m = s.BlockCipherMode = n.extend({
                        createEncryptor: function(t, e) {
                            return this.Encryptor.create(t, e);
                        },
                        createDecryptor: function(t, e) {
                            return this.Decryptor.create(t, e);
                        },
                        init: function(t, e) {
                            (this._cipher = t), (this._iv = e);
                        }
                    })),
                    (d = l.CBC = (function() {
                        function n(t, e, i) {
                            var r = this._iv;
                            if (r) {
                                var s = r;
                                this._iv = void 0;
                            } else var s = this._prevBlock;
                            for (var n = 0; i > n; n++) t[e + n] ^= s[n];
                        }
                        var t = m.extend();
                        return (
                            (t.Encryptor = t.extend({
                                processBlock: function(t, e) {
                                    var i = this._cipher,
                                        r = i.blockSize;
                                    n.call(this, t, e, r),
                                        i.encryptBlock(t, e),
                                        (this._prevBlock = t.slice(e, e + r));
                                }
                            })),
                            (t.Decryptor = t.extend({
                                processBlock: function(t, e) {
                                    var i = this._cipher,
                                        r = i.blockSize,
                                        s = t.slice(e, e + r);
                                    i.decryptBlock(t, e),
                                        n.call(this, t, e, r),
                                        (this._prevBlock = s);
                                }
                            })),
                            t
                        );
                    })()),
                    (v = r.pad = {}),
                    (G = v.Pkcs7 = {
                        pad: function(t, e) {
                            for (
                                var i = 4 * e,
                                    r = i - (t.sigBytes % i),
                                    s = (r << 24) | (r << 16) | (r << 8) | r,
                                    n = [],
                                    o = 0;
                                r > o;
                                o += 4
                            )
                                n.push(s);
                            var a = h.create(n, r);
                            t.concat(a);
                        },
                        unpad: function(t) {
                            var e = 255 & t.words[(t.sigBytes - 1) >>> 2];
                            t.sigBytes -= e;
                        }
                    }),
                    (s.BlockCipher = C.extend({
                        cfg: C.cfg.extend({ mode: d, padding: G }),
                        reset: function() {
                            C.reset.call(this);
                            var t = this.cfg,
                                e = t.iv,
                                i = t.mode;
                            if (this._xformMode == this._ENC_XFORM_MODE)
                                var r = i.createEncryptor;
                            else {
                                var r = i.createDecryptor;
                                this._minBufferSize = 1;
                            }
                            this._mode && this._mode.__creator == r
                                ? this._mode.init(this, e && e.words)
                                : ((this._mode = r.call(i, this, e && e.words)),
                                  (this._mode.__creator = r));
                        },
                        _doProcessBlock: function(t, e) {
                            this._mode.processBlock(t, e);
                        },
                        _doFinalize: function() {
                            var t = this.cfg.padding;
                            if (this._xformMode == this._ENC_XFORM_MODE) {
                                t.pad(this._data, this.blockSize);
                                var e = this._process(!0);
                            } else {
                                var e = this._process(!0);
                                t.unpad(e);
                            }
                            return e;
                        },
                        blockSize: 4
                    })),
                    (_ = s.CipherParams = n.extend({
                        init: function(t) {
                            this.mixIn(t);
                        },
                        toString: function(t) {
                            return (t || this.formatter).stringify(this);
                        }
                    })),
                    (b = r.format = {}),
                    (P = b.OpenSSL = {
                        stringify: function(t) {
                            var e = t.ciphertext,
                                i = t.salt;
                            if (i)
                                var r = h
                                    .create([1398893684, 1701076831])
                                    .concat(i)
                                    .concat(e);
                            else var r = e;
                            return r.toString(u);
                        },
                        parse: function(t) {
                            var e = u.parse(t),
                                i = e.words;
                            if (1398893684 == i[0] && 1701076831 == i[1]) {
                                var r = h.create(i.slice(2, 4));
                                i.splice(0, 4), (e.sigBytes -= 16);
                            }
                            return _.create({ ciphertext: e, salt: r });
                        }
                    }),
                    (V = s.SerializableCipher = n.extend({
                        cfg: n.extend({ format: P }),
                        encrypt: function(t, e, i, r) {
                            r = this.cfg.extend(r);
                            var s = t.createEncryptor(i, r),
                                n = s.finalize(e),
                                o = s.cfg;
                            return _.create({
                                ciphertext: n,
                                key: i,
                                iv: o.iv,
                                algorithm: t,
                                mode: o.mode,
                                padding: o.padding,
                                blockSize: t.blockSize,
                                formatter: r.format
                            });
                        },
                        decrypt: function(t, e, i, r) {
                            (r = this.cfg.extend(r)),
                                (e = this._parse(e, r.format));
                            var s = t
                                .createDecryptor(i, r)
                                .finalize(e.ciphertext);
                            return s;
                        },
                        _parse: function(t, e) {
                            return 'string' == typeof t ? e.parse(t, this) : t;
                        }
                    })),
                    (g = r.kdf = {}),
                    (p = g.OpenSSL = {
                        execute: function(t, e, i, r) {
                            r || (r = h.random(8));
                            var s = f.create({ keySize: e + i }).compute(t, r),
                                n = h.create(s.words.slice(e), 4 * i);
                            return (
                                (s.sigBytes = 4 * e),
                                _.create({ key: s, iv: n, salt: r })
                            );
                        }
                    }),
                    (k = s.PasswordBasedCipher = V.extend({
                        cfg: V.cfg.extend({ kdf: p }),
                        encrypt: function(t, e, i, r) {
                            var s = (r = this.cfg.extend(r)).kdf.execute(
                                i,
                                t.keySize,
                                t.ivSize
                            );
                            r.iv = s.iv;
                            var n = V.encrypt.call(this, t, e, s.key, r);
                            return n.mixIn(s), n;
                        },
                        decrypt: function(t, e, i, r) {
                            (r = this.cfg.extend(r)),
                                (e = this._parse(e, r.format));
                            var s = r.kdf.execute(
                                i,
                                t.keySize,
                                t.ivSize,
                                e.salt
                            );
                            r.iv = s.iv;
                            var n = V.decrypt.call(this, t, e, s.key, r);
                            return n;
                        }
                    })))
                );
            }),
            e(function(t, e) {
                var s;
                t.exports = ((s = w),
                (function() {
                    var t = s,
                        e = t.lib.BlockCipher,
                        i = t.algo,
                        u = [],
                        c = [],
                        f = [],
                        C = [],
                        l = [],
                        m = [],
                        d = [],
                        v = [],
                        G = [],
                        _ = [];
                    !(function() {
                        for (var t = [], e = 0; 256 > e; e++)
                            t[e] = 128 > e ? e << 1 : (e << 1) ^ 283;
                        var i = 0,
                            r = 0;
                        for (e = 0; 256 > e; e++) {
                            var s =
                                r ^ (r << 1) ^ (r << 2) ^ (r << 3) ^ (r << 4);
                            (s = (s >>> 8) ^ (255 & s) ^ 99), (u[i] = s);
                            var n = t[(c[s] = i)],
                                o = t[n],
                                a = t[o],
                                h = (257 * t[s]) ^ (16843008 * s);
                            (f[i] = (h << 24) | (h >>> 8)),
                                (C[i] = (h << 16) | (h >>> 16)),
                                (l[i] = (h << 8) | (h >>> 24)),
                                (m[i] = h),
                                (h =
                                    (16843009 * a) ^
                                    (65537 * o) ^
                                    (257 * n) ^
                                    (16843008 * i)),
                                (d[s] = (h << 24) | (h >>> 8)),
                                (v[s] = (h << 16) | (h >>> 16)),
                                (G[s] = (h << 8) | (h >>> 24)),
                                (_[s] = h),
                                i
                                    ? ((i = n ^ t[t[t[a ^ n]]]), (r ^= t[t[r]]))
                                    : (i = r = 1);
                        }
                    })();
                    var b = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                        r = (i.AES = e.extend({
                            _doReset: function() {
                                if (
                                    !this._nRounds ||
                                    this._keyPriorReset !== this._key
                                ) {
                                    for (
                                        var t = (this._keyPriorReset = this._key),
                                            e = t.words,
                                            i = t.sigBytes / 4,
                                            r =
                                                4 *
                                                ((this._nRounds = i + 6) + 1),
                                            s = (this._keySchedule = []),
                                            n = 0;
                                        r > n;
                                        n++
                                    )
                                        if (i > n) s[n] = e[n];
                                        else {
                                            var o = s[n - 1];
                                            n % i
                                                ? i > 6 &&
                                                  n % i == 4 &&
                                                  (o =
                                                      (u[o >>> 24] << 24) |
                                                      (u[(o >>> 16) & 255] <<
                                                          16) |
                                                      (u[(o >>> 8) & 255] <<
                                                          8) |
                                                      u[255 & o])
                                                : ((o =
                                                      (u[
                                                          (o =
                                                              (o << 8) |
                                                              (o >>> 24)) >>> 24
                                                      ] <<
                                                          24) |
                                                      (u[(o >>> 16) & 255] <<
                                                          16) |
                                                      (u[(o >>> 8) & 255] <<
                                                          8) |
                                                      u[255 & o]),
                                                  (o ^= b[(n / i) | 0] << 24)),
                                                (s[n] = s[n - i] ^ o);
                                        }
                                    for (
                                        var a = (this._invKeySchedule = []),
                                            h = 0;
                                        r > h;
                                        h++
                                    )
                                        (n = r - h),
                                            (o = h % 4 ? s[n] : s[n - 4]),
                                            (a[h] =
                                                4 > h || 4 >= n
                                                    ? o
                                                    : d[u[o >>> 24]] ^
                                                      v[u[(o >>> 16) & 255]] ^
                                                      G[u[(o >>> 8) & 255]] ^
                                                      _[u[255 & o]]);
                                }
                            },
                            encryptBlock: function(t, e) {
                                this._doCryptBlock(
                                    t,
                                    e,
                                    this._keySchedule,
                                    f,
                                    C,
                                    l,
                                    m,
                                    u
                                );
                            },
                            decryptBlock: function(t, e) {
                                var i = t[e + 1];
                                (t[e + 1] = t[e + 3]),
                                    (t[e + 3] = i),
                                    this._doCryptBlock(
                                        t,
                                        e,
                                        this._invKeySchedule,
                                        d,
                                        v,
                                        G,
                                        _,
                                        c
                                    ),
                                    (i = t[e + 1]),
                                    (t[e + 1] = t[e + 3]),
                                    (t[e + 3] = i);
                            },
                            _doCryptBlock: function(t, e, i, r, s, n, o, a) {
                                for (
                                    var h = this._nRounds,
                                        u = t[e] ^ i[0],
                                        c = t[e + 1] ^ i[1],
                                        f = t[e + 2] ^ i[2],
                                        C = t[e + 3] ^ i[3],
                                        l = 4,
                                        m = 1;
                                    h > m;
                                    m++
                                ) {
                                    var d =
                                            r[u >>> 24] ^
                                            s[(c >>> 16) & 255] ^
                                            n[(f >>> 8) & 255] ^
                                            o[255 & C] ^
                                            i[l++],
                                        v =
                                            r[c >>> 24] ^
                                            s[(f >>> 16) & 255] ^
                                            n[(C >>> 8) & 255] ^
                                            o[255 & u] ^
                                            i[l++],
                                        G =
                                            r[f >>> 24] ^
                                            s[(C >>> 16) & 255] ^
                                            n[(u >>> 8) & 255] ^
                                            o[255 & c] ^
                                            i[l++],
                                        _ =
                                            r[C >>> 24] ^
                                            s[(u >>> 16) & 255] ^
                                            n[(c >>> 8) & 255] ^
                                            o[255 & f] ^
                                            i[l++];
                                    (u = d), (c = v), (f = G), (C = _);
                                }
                                (d =
                                    ((a[u >>> 24] << 24) |
                                        (a[(c >>> 16) & 255] << 16) |
                                        (a[(f >>> 8) & 255] << 8) |
                                        a[255 & C]) ^
                                    i[l++]),
                                    (v =
                                        ((a[c >>> 24] << 24) |
                                            (a[(f >>> 16) & 255] << 16) |
                                            (a[(C >>> 8) & 255] << 8) |
                                            a[255 & u]) ^
                                        i[l++]),
                                    (G =
                                        ((a[f >>> 24] << 24) |
                                            (a[(C >>> 16) & 255] << 16) |
                                            (a[(u >>> 8) & 255] << 8) |
                                            a[255 & c]) ^
                                        i[l++]),
                                    (_ =
                                        ((a[C >>> 24] << 24) |
                                            (a[(u >>> 16) & 255] << 16) |
                                            (a[(c >>> 8) & 255] << 8) |
                                            a[255 & f]) ^
                                        i[l++]),
                                    (t[e] = d),
                                    (t[e + 1] = v),
                                    (t[e + 2] = G),
                                    (t[e + 3] = _);
                            },
                            keySize: 8
                        }));
                    t.AES = e._createHelper(r);
                })(),
                s.AES);
            })),
            n = (a.AES,
            e(function(t, e) {
                t.exports = w.enc.Utf8;
            }));
        return (
            n.Utf8,
            (t.e = function(t, e) {
                var i, r;
                return (
                    void 0 === e && (e = 'whatever'),
                    ((r = document.createElement('a')).href = t),
                    1 < r.search.length &&
                        (r.search =
                            '?' +
                            a.encrypt(r.search.substring(1), e).toString()),
                    (i = r.href),
                    (r = null),
                    i
                );
            }),
            (t.d = function(t, e) {
                void 0 === e && (e = 'whatever');
                var i = document.createElement('a'),
                    r = '';
                if (
                    ((i.href = t),
                    !(
                        2 <
                        (r = 0 === i.search.length ? '' : i.search.substring(1))
                            .length
                    ))
                )
                    return (i = null);
                if (
                    !(i = null) !==
                    /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
                        r
                    )
                )
                    return s(r);
                try {
                    return s((r = a.decrypt(r, e).toString(n)));
                } catch (t) {
                    return null;
                }
            }),
            (t.eData = function(t, e) {
                void 0 === e && (e = 'whatever');
                var i,
                    r = [];
                for (var s in t) {
                    var n = encodeURIComponent(s),
                        o = encodeURIComponent(t[s]);
                    r.push(n + '=' + o);
                }
                return (i = r.join('&')), a.encrypt(i, e).toString();
            }),
            t
        );
    })({}),
    Core;
!(function(r) {
    var t;
    !(function(t) {
        var e = (function() {
            function t(t) {
                (this.isWatch = !1),
                    (this.domainList = []),
                    (this.hostType = t.attr('hostType')),
                    (this.gameType = t.attr('gameType')),
                    (this.platform = t.attr('platform')),
                    (this.port = t.attr('port'));
                var e = r.ExternalData.useSSL
                    ? t.attr('sslDomain')
                    : t.attr('domain');
                e && (this.domainList = e.split(' ')),
                    (this.vids = t.listAttr('vids')),
                    (this.serverid = Number(t.attr('serverid'))),
                    (this.isWatch = '1' === t.attr('watch'));
            }
            return (
                Object.defineProperty(t.prototype, 'urlList', {
                    get: function() {
                        var e = this,
                            i = [];
                        return (
                            this.domainList.forEach(function(t) {
                                i.push(
                                    r.ExternalData.wsProtocol + t + ':' + e.port
                                );
                            }, this),
                            i
                        );
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t
            );
        })();
        (t.HostInfo = e), __reflect(e.prototype, 'Core.Config.HostInfo');
    })((t = r.Config || (r.Config = {})));
})(Core || (Core = {}));
var Core;
!(function(r) {
    function t() {
        var t = a();
        return t.indexOf(r.BROWSER_QQ) >= 0
            ? r.BROWSER_QQ
            : t.indexOf(r.BROWSER_UC) >= 0
                ? r.BROWSER_UC
                : t.indexOf(r.BROWSER_BAIDU) >= 0
                    ? r.BROWSER_BAIDU
                    : t.indexOf(r.BROWSER_BAIDU_PC) >= 0
                        ? r.BROWSER_BAIDU_PC
                        : t.indexOf(r.BROWSER_SOUGOU) >= 0
                            ? r.BROWSER_SOUGOU
                            : t.indexOf(r.BROWSER_360) >= 0
                                ? r.BROWSER_360
                                : t.indexOf(r.BROWSER_EDGE) >= 0
                                    ? r.BROWSER_EDGE
                                    : n()
                                        ? r.BROWSER_IE
                                        : t.indexOf(r.BROWSER_FIREFOX) >= 0
                                            ? r.BROWSER_FIREFOX
                                            : t.indexOf(r.BROWSER_CHROME) >=
                                                  0 || t.indexOf('CriOS') >= 0
                                                ? r.BROWSER_CHROME
                                                : t.indexOf(r.BROWSER_SAFARI) >=
                                                      0 &&
                                                  t.indexOf(r.BROWSER_CHROME) <
                                                      0
                                                    ? r.BROWSER_SAFARI
                                                    : t;
    }
    function e() {
        var t = a();
        return /windows phone/i.test(t)
            ? r.OS_WINDOWS_PHONE
            : /android/i.test(t)
                ? r.OS_ANDROID
                : /iP(hone|od|ad)/.test(t) && !window.MSStream
                    ? r.OS_IOS
                    : void 0;
    }
    function i() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return parseInt(t[1], 10) + 0.1 * parseInt(t[2], 10);
        }
        return -1;
    }
    function s() {
        for (
            var t = a(),
                e = [
                    r.BROWSER_BAIDU,
                    r.BROWSER_UC,
                    r.BROWSER_QQ,
                    r.BROWSER_BAIDU_PC,
                    r.BROWSER_SOUGOU
                ],
                i = 0;
            i < e.length;
            i++
        )
            if (t.indexOf(e[i]) >= 0) return !0;
        return !1;
    }
    function n() {
        return navigator.userAgent.indexOf('MSIE') >= 0 ||
            navigator.userAgent.indexOf('Trident') >= 0
            ? !0
            : !1;
    }
    function o() {
        return flvjs.isSupported() && !s();
    }
    function a() {
        return navigator.userAgent || navigator.vendor || window.opera;
    }
    (r.OS_IOS = 'iOS'),
        (r.OS_ANDROID = 'Android'),
        (r.OS_WINDOWS_PHONE = 'Windows Phone'),
        (r.BROWSER_SAFARI = 'Safari'),
        (r.BROWSER_CHROME = 'Chrome'),
        (r.BROWSER_FIREFOX = 'Firefox'),
        (r.BROWSER_EDGE = 'Edge'),
        (r.BROWSER_IE = 'IE'),
        (r.BROWSER_360 = '360se'),
        (r.BROWSER_SOUGOU = 'SE 2.X MetaSr 1.0'),
        (r.BROWSER_BAIDU = 'baidubrowser'),
        (r.BROWSER_BAIDU_PC = 'BIDUBrowser'),
        (r.BROWSER_UC = 'UCBrowser'),
        (r.BROWSER_QQ = 'QQBrowser'),
        (r.IE_DISABLE_REPLAY = !1),
        (r.getBrowser = t),
        (r.getMobileOS = e),
        (r.getIOSversion = i),
        (r.isFlvBlackListBrowser = s),
        (r.isIE = n),
        (r.isFlvSupported = o),
        (r.getUserAgent = a);
})(Core || (Core = {}));
var Core;
!(function(t) {
    function e(t) {
        return t + i;
    }
    var i = 60 * (new Date().getTimezoneOffset() - 240) * 1e3;
    t.getEATime = e;
})(Core || (Core = {}));
var Core;
!(function(t) {
    function i(t) {
        if (0 == t || 1 == t) return 1;
        for (var e = 1, i = 1; t >= i; i++) e *= i;
        return e;
    }
    function e(t, e) {
        return e > t ? 0 : t == e ? 1 : i(t) / (i(t - e) * i(e));
    }
    function r(t, e) {
        return e > t ? 0 : i(t) / i(t - e);
    }
    function s() {
        return Math.floor(10 * Math.random());
    }
    function n() {
        return Math.floor(4 * Math.random());
    }
    function o(t) {
        void 0 === t && (t = 10);
        var e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        return h(e).slice(0, t);
    }
    function a(t) {
        void 0 === t && (t = 80);
        for (var e = [], i = 1; 80 >= i; i++) e.push(i);
        return h(e).slice(0, t);
    }
    function h(t) {
        for (
            var e, i, r = t.length;
            r;
            e = Math.floor(Math.random() * r), i = t[--r], t[r] = t[e], t[e] = i
        );
        return t;
    }
    function u(t) {
        for (var e = [], i = 0; i < t[0].length; i++) {
            for (var r = t[0][i], s = 1; s < t.length; s++)
                t[s][i] < r && (r = t[s][i]);
            e.push(r);
        }
        return e;
    }
    function c(t) {
        var e = Math.floor(Math.round(1e4 * t) / 10) / 1e3;
        return /\d+\.\d{3,}/.test('' + e) ? e.toFixed(3) : '' + e;
    }
    function f(t) {
        var e = c(t).split('.');
        return (e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')), e.join('.');
    }
    function C(t) {
        var e = Math.floor(Math.round(1e3 * t) / 10) / 100;
        return /\d+\.\d{2,}/.test('' + e) ? e.toFixed(2) : '' + e;
    }
    function l(t) {
        var e = C(t).split('.');
        return (e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')), e.join('.');
    }
    function m(t) {
        var e = 0 > t ? '-' : '';
        return (
            0 > t && (t = Math.abs(t)),
            1e3 > t
                ? e + l(t)
                : t >= 1e3 && 1e6 > t
                    ? e + Math.floor(t / 100) / 10 + 'K'
                    : t >= 1e6 && 1e9 > t
                        ? e + Math.floor(t / 1e5) / 10 + 'M'
                        : t >= 1e9
                            ? e + Math.floor(t / 1e8) / 10 + 'B'
                            : void 0
        );
    }
    (t.factorial = i),
        (t.combination = e),
        (t.permutation = r),
        (t.randomDigit = s),
        (t.randomSide = n),
        (t.shuffleDigits = o),
        (t.shuffle80 = a),
        (t.shuffle = h),
        (t.getMinArray = u),
        (t.getStringFixed3 = c),
        (t.getStringFixed3WithComma = f),
        (t.getStringFixed2 = C),
        (t.getStringFixed2WithComma = l),
        (t.getStringShortNum = m);
})(Core || (Core = {}));
var md5 = (function() {
    function t() {
        (this.hexcase = 0), (this.b64pad = '');
    }
    return (
        (t.prototype.hex_md5 = function(t) {
            return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)));
        }),
        (t.prototype.b64_md5 = function(t) {
            return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)));
        }),
        (t.prototype.any_md5 = function(t, e) {
            return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), e);
        }),
        (t.prototype.hex_hmac_md5 = function(t, e) {
            return this.rstr2hex(
                this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e))
            );
        }),
        (t.prototype.b64_hmac_md5 = function(t, e) {
            return this.rstr2b64(
                this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e))
            );
        }),
        (t.prototype.any_hmac_md5 = function(t, e, i) {
            return this.rstr2any(
                this.rstr_hmac_md5(
                    this.str2rstr_utf8(t),
                    this.str2rstr_utf8(e)
                ),
                i
            );
        }),
        (t.prototype.md5_vm_test = function() {
            return (
                '900150983cd24fb0d6963f7d28e17f72' ==
                this.hex_md5('abc').toLowerCase()
            );
        }),
        (t.prototype.rstr_md5 = function(t) {
            return this.binl2rstr(
                this.binl_md5(this.rstr2binl(t), 8 * t.length)
            );
        }),
        (t.prototype.rstr_hmac_md5 = function(t, e) {
            var i = this.rstr2binl(t);
            i.length > 16 && (i = this.binl_md5(i, 8 * t.length));
            for (var r = Array(16), s = Array(16), n = 0; 16 > n; n++)
                (r[n] = 909522486 ^ i[n]), (s[n] = 1549556828 ^ i[n]);
            var o = this.binl_md5(
                r.concat(this.rstr2binl(e)),
                512 + 8 * e.length
            );
            return this.binl2rstr(this.binl_md5(s.concat(o), 640));
        }),
        (t.prototype.rstr2hex = function(t) {
            try {
                this.hexcase;
            } catch (t) {
                this.hexcase = 0;
            }
            for (
                var e,
                    i = this.hexcase ? '0123456789ABCDEF' : '0123456789abcdef',
                    r = '',
                    s = 0;
                s < t.length;
                s++
            )
                (e = t.charCodeAt(s)),
                    (r += i.charAt((e >>> 4) & 15) + i.charAt(15 & e));
            return r;
        }),
        (t.prototype.rstr2b64 = function(t) {
            try {
                this.b64pad;
            } catch (t) {
                this.b64pad = '';
            }
            for (
                var e =
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                    i = '',
                    r = t.length,
                    s = 0;
                r > s;
                s += 3
            )
                for (
                    var n =
                            (t.charCodeAt(s) << 16) |
                            (r > s + 1 ? t.charCodeAt(s + 1) << 8 : 0) |
                            (r > s + 2 ? t.charCodeAt(s + 2) : 0),
                        o = 0;
                    4 > o;
                    o++
                )
                    i +=
                        8 * s + 6 * o > 8 * t.length
                            ? this.b64pad
                            : e.charAt((n >>> (6 * (3 - o))) & 63);
            return i;
        }),
        (t.prototype.rstr2any = function(t, e) {
            var i,
                r,
                s,
                n,
                o,
                a = e.length,
                h = Array(Math.ceil(t.length / 2));
            for (i = 0; i < h.length; i++)
                h[i] = (t.charCodeAt(2 * i) << 8) | t.charCodeAt(2 * i + 1);
            var u = Math.ceil(
                    (8 * t.length) / (Math.log(e.length) / Math.log(2))
                ),
                c = Array(u);
            for (r = 0; u > r; r++) {
                for (o = Array(), n = 0, i = 0; i < h.length; i++)
                    (n = (n << 16) + h[i]),
                        (s = Math.floor(n / a)),
                        (n -= s * a),
                        (o.length > 0 || s > 0) && (o[o.length] = s);
                (c[r] = n), (h = o);
            }
            var f = '';
            for (i = c.length - 1; i >= 0; i--) f += e.charAt(c[i]);
            return f;
        }),
        (t.prototype.str2rstr_utf8 = function(t) {
            for (var e, i, r = '', s = -1; ++s < t.length; )
                (e = t.charCodeAt(s)),
                    (i = s + 1 < t.length ? t.charCodeAt(s + 1) : 0),
                    e >= 55296 &&
                        56319 >= e &&
                        i >= 56320 &&
                        57343 >= i &&
                        ((e = 65536 + ((1023 & e) << 10) + (1023 & i)), s++),
                    127 >= e
                        ? (r += String.fromCharCode(e))
                        : 2047 >= e
                            ? (r += String.fromCharCode(
                                  192 | ((e >>> 6) & 31),
                                  128 | (63 & e)
                              ))
                            : 65535 >= e
                                ? (r += String.fromCharCode(
                                      224 | ((e >>> 12) & 15),
                                      128 | ((e >>> 6) & 63),
                                      128 | (63 & e)
                                  ))
                                : 2097151 >= e &&
                                  (r += String.fromCharCode(
                                      240 | ((e >>> 18) & 7),
                                      128 | ((e >>> 12) & 63),
                                      128 | ((e >>> 6) & 63),
                                      128 | (63 & e)
                                  ));
            return r;
        }),
        (t.prototype.str2rstr_utf16le = function(t) {
            for (var e = '', i = 0; i < t.length; i++)
                e += String.fromCharCode(
                    255 & t.charCodeAt(i),
                    (t.charCodeAt(i) >>> 8) & 255
                );
            return e;
        }),
        (t.prototype.str2rstr_utf16be = function(t) {
            for (var e = '', i = 0; i < t.length; i++)
                e += String.fromCharCode(
                    (t.charCodeAt(i) >>> 8) & 255,
                    255 & t.charCodeAt(i)
                );
            return e;
        }),
        (t.prototype.rstr2binl = function(t) {
            for (var e = Array(t.length >> 2), i = 0; i < e.length; i++)
                e[i] = 0;
            for (var i = 0; i < 8 * t.length; i += 8)
                e[i >> 5] |= (255 & t.charCodeAt(i / 8)) << i % 32;
            return e;
        }),
        (t.prototype.binl2rstr = function(t) {
            for (var e = '', i = 0; i < 32 * t.length; i += 8)
                e += String.fromCharCode((t[i >> 5] >>> i % 32) & 255);
            return e;
        }),
        (t.prototype.binl_md5 = function(t, e) {
            (t[e >> 5] |= 128 << e % 32), (t[(((e + 64) >>> 9) << 4) + 14] = e);
            for (
                var i = 1732584193,
                    r = -271733879,
                    s = -1732584194,
                    n = 271733878,
                    o = 0;
                o < t.length;
                o += 16
            ) {
                var a = i,
                    h = r,
                    u = s,
                    c = n;
                (i = this.md5_ff(i, r, s, n, t[o + 0], 7, -680876936)),
                    (n = this.md5_ff(n, i, r, s, t[o + 1], 12, -389564586)),
                    (s = this.md5_ff(s, n, i, r, t[o + 2], 17, 606105819)),
                    (r = this.md5_ff(r, s, n, i, t[o + 3], 22, -1044525330)),
                    (i = this.md5_ff(i, r, s, n, t[o + 4], 7, -176418897)),
                    (n = this.md5_ff(n, i, r, s, t[o + 5], 12, 1200080426)),
                    (s = this.md5_ff(s, n, i, r, t[o + 6], 17, -1473231341)),
                    (r = this.md5_ff(r, s, n, i, t[o + 7], 22, -45705983)),
                    (i = this.md5_ff(i, r, s, n, t[o + 8], 7, 1770035416)),
                    (n = this.md5_ff(n, i, r, s, t[o + 9], 12, -1958414417)),
                    (s = this.md5_ff(s, n, i, r, t[o + 10], 17, -42063)),
                    (r = this.md5_ff(r, s, n, i, t[o + 11], 22, -1990404162)),
                    (i = this.md5_ff(i, r, s, n, t[o + 12], 7, 1804603682)),
                    (n = this.md5_ff(n, i, r, s, t[o + 13], 12, -40341101)),
                    (s = this.md5_ff(s, n, i, r, t[o + 14], 17, -1502002290)),
                    (r = this.md5_ff(r, s, n, i, t[o + 15], 22, 1236535329)),
                    (i = this.md5_gg(i, r, s, n, t[o + 1], 5, -165796510)),
                    (n = this.md5_gg(n, i, r, s, t[o + 6], 9, -1069501632)),
                    (s = this.md5_gg(s, n, i, r, t[o + 11], 14, 643717713)),
                    (r = this.md5_gg(r, s, n, i, t[o + 0], 20, -373897302)),
                    (i = this.md5_gg(i, r, s, n, t[o + 5], 5, -701558691)),
                    (n = this.md5_gg(n, i, r, s, t[o + 10], 9, 38016083)),
                    (s = this.md5_gg(s, n, i, r, t[o + 15], 14, -660478335)),
                    (r = this.md5_gg(r, s, n, i, t[o + 4], 20, -405537848)),
                    (i = this.md5_gg(i, r, s, n, t[o + 9], 5, 568446438)),
                    (n = this.md5_gg(n, i, r, s, t[o + 14], 9, -1019803690)),
                    (s = this.md5_gg(s, n, i, r, t[o + 3], 14, -187363961)),
                    (r = this.md5_gg(r, s, n, i, t[o + 8], 20, 1163531501)),
                    (i = this.md5_gg(i, r, s, n, t[o + 13], 5, -1444681467)),
                    (n = this.md5_gg(n, i, r, s, t[o + 2], 9, -51403784)),
                    (s = this.md5_gg(s, n, i, r, t[o + 7], 14, 1735328473)),
                    (r = this.md5_gg(r, s, n, i, t[o + 12], 20, -1926607734)),
                    (i = this.md5_hh(i, r, s, n, t[o + 5], 4, -378558)),
                    (n = this.md5_hh(n, i, r, s, t[o + 8], 11, -2022574463)),
                    (s = this.md5_hh(s, n, i, r, t[o + 11], 16, 1839030562)),
                    (r = this.md5_hh(r, s, n, i, t[o + 14], 23, -35309556)),
                    (i = this.md5_hh(i, r, s, n, t[o + 1], 4, -1530992060)),
                    (n = this.md5_hh(n, i, r, s, t[o + 4], 11, 1272893353)),
                    (s = this.md5_hh(s, n, i, r, t[o + 7], 16, -155497632)),
                    (r = this.md5_hh(r, s, n, i, t[o + 10], 23, -1094730640)),
                    (i = this.md5_hh(i, r, s, n, t[o + 13], 4, 681279174)),
                    (n = this.md5_hh(n, i, r, s, t[o + 0], 11, -358537222)),
                    (s = this.md5_hh(s, n, i, r, t[o + 3], 16, -722521979)),
                    (r = this.md5_hh(r, s, n, i, t[o + 6], 23, 76029189)),
                    (i = this.md5_hh(i, r, s, n, t[o + 9], 4, -640364487)),
                    (n = this.md5_hh(n, i, r, s, t[o + 12], 11, -421815835)),
                    (s = this.md5_hh(s, n, i, r, t[o + 15], 16, 530742520)),
                    (r = this.md5_hh(r, s, n, i, t[o + 2], 23, -995338651)),
                    (i = this.md5_ii(i, r, s, n, t[o + 0], 6, -198630844)),
                    (n = this.md5_ii(n, i, r, s, t[o + 7], 10, 1126891415)),
                    (s = this.md5_ii(s, n, i, r, t[o + 14], 15, -1416354905)),
                    (r = this.md5_ii(r, s, n, i, t[o + 5], 21, -57434055)),
                    (i = this.md5_ii(i, r, s, n, t[o + 12], 6, 1700485571)),
                    (n = this.md5_ii(n, i, r, s, t[o + 3], 10, -1894986606)),
                    (s = this.md5_ii(s, n, i, r, t[o + 10], 15, -1051523)),
                    (r = this.md5_ii(r, s, n, i, t[o + 1], 21, -2054922799)),
                    (i = this.md5_ii(i, r, s, n, t[o + 8], 6, 1873313359)),
                    (n = this.md5_ii(n, i, r, s, t[o + 15], 10, -30611744)),
                    (s = this.md5_ii(s, n, i, r, t[o + 6], 15, -1560198380)),
                    (r = this.md5_ii(r, s, n, i, t[o + 13], 21, 1309151649)),
                    (i = this.md5_ii(i, r, s, n, t[o + 4], 6, -145523070)),
                    (n = this.md5_ii(n, i, r, s, t[o + 11], 10, -1120210379)),
                    (s = this.md5_ii(s, n, i, r, t[o + 2], 15, 718787259)),
                    (r = this.md5_ii(r, s, n, i, t[o + 9], 21, -343485551)),
                    (i = this.safe_add(i, a)),
                    (r = this.safe_add(r, h)),
                    (s = this.safe_add(s, u)),
                    (n = this.safe_add(n, c));
            }
            return [i, r, s, n];
        }),
        (t.prototype.md5_cmn = function(t, e, i, r, s, n) {
            return this.safe_add(
                this.bit_rol(
                    this.safe_add(this.safe_add(e, t), this.safe_add(r, n)),
                    s
                ),
                i
            );
        }),
        (t.prototype.md5_ff = function(t, e, i, r, s, n, o) {
            return this.md5_cmn((e & i) | (~e & r), t, e, s, n, o);
        }),
        (t.prototype.md5_gg = function(t, e, i, r, s, n, o) {
            return this.md5_cmn((e & r) | (i & ~r), t, e, s, n, o);
        }),
        (t.prototype.md5_hh = function(t, e, i, r, s, n, o) {
            return this.md5_cmn(e ^ i ^ r, t, e, s, n, o);
        }),
        (t.prototype.md5_ii = function(t, e, i, r, s, n, o) {
            return this.md5_cmn(i ^ (e | ~r), t, e, s, n, o);
        }),
        (t.prototype.safe_add = function(t, e) {
            var i = (65535 & t) + (65535 & e),
                r = (t >> 16) + (e >> 16) + (i >> 16);
            return (r << 16) | (65535 & i);
        }),
        (t.prototype.bit_rol = function(t, e) {
            return (t << e) | (t >>> (32 - e));
        }),
        t
    );
})();
__reflect(md5.prototype, 'md5');
var Core;
!(function(r) {
    function t(t) {
        var e = new egret.ByteArray();
        return e.writeInt(t), e.writeInt(r._u), e.writeInt(r.gn), e;
    }
    function e(t, e) {
        void 0 === e && (e = r.gn);
        var i = new egret.ByteArray();
        return i.writeInt(t), i.writeInt(0), i.writeInt(e), i;
    }
    function i(t) {
        var e = t.position;
        return (t.position = 4), t.writeInt(e), t;
    }
    function s(t) {
        for (
            var e = t.length, i = new egret.ByteArray(), r = 0;
            e > r;
            r += 2
        ) {
            var s = parseInt(t[r], 16),
                n = parseInt(t[r + 1], 16);
            i.writeByte((s << 4) + n);
        }
        return i;
    }
    function n(t, e) {
        var i = new egret.ByteArray();
        return i.writeUTFBytes(t), (i.length = e), i;
    }
    function o(t) {
        return (t.readUnsignedInt() << 32) | t.readUnsignedInt();
    }
    function a(e, t) {
        var i = Math.floor(t),
            r = [];
        i > 4294967295
            ? ((r[0] = 0),
              (r[1] = (i >> 48) & 31),
              (r[2] = (i >> 40) & 255),
              (r[3] = (i >> 32) & 255),
              (r[4] = (i >> 24) & 255),
              (r[5] = (i >> 16) & 255),
              (r[6] = (i >> 8) & 255),
              (r[7] = 255 & i))
            : ((r[0] = 0),
              (r[1] = 0),
              (r[2] = 0),
              (r[3] = 0),
              (r[4] = (i >> 24) & 255),
              (r[5] = (i >> 16) & 255),
              (r[6] = (i >> 8) & 255),
              (r[7] = 255 & i)),
            r.forEach(function(t) {
                e.writeByte(t);
            });
    }
    (r.getSimpleCMD = t),
        (r.startCMD = e),
        (r.endCMD = i),
        (r.hexStrToBytes = s),
        (r.stringToBytes = n),
        (r.readInt64FromBytes = o),
        (r.writeInt64ToBytes = a);
})(Core || (Core = {}));
var Core;
!(function(r) {
    (r.EVENT_PAUSE = 'EVENT_PAUSE'), (r.EVENT_RESUME = 'EVENT_RESUME');
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t._isPaused = !1),
                (t.timeoutIDMap = new r.HashMap()),
                (t.intervalIDMap = new r.HashMap()),
                (egret.lifecycle.onPause = function() {
                    t.pauseTimeoutID = t.setTimeout(
                        function() {
                            (t._isPaused = !0),
                                egret.ticker.pause(),
                                t.dispatchEventWith(r.EVENT_PAUSE);
                        },
                        t,
                        108e5
                    );
                }),
                (egret.lifecycle.onResume = function() {
                    t._isPaused
                        ? (egret.ticker.resume(),
                          t.dispatchEventWith(r.EVENT_RESUME))
                        : t.clearTimeout(t.pauseTimeoutID),
                        (t._isPaused = !1);
                }),
                t
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            (t.prototype.setTimeout = function(t, e, i) {
                var r,
                    s = this,
                    n = function() {
                        s.timeoutIDMap['delete'](r), t.call(e);
                    };
                return (
                    (r = window.setTimeout(n, i)),
                    this.timeoutIDMap.set(r, !0),
                    r
                );
            }),
            (t.prototype.clearTimeout = function(t) {
                window.clearTimeout(t), this.timeoutIDMap['delete'](t);
            }),
            (t.prototype.setInterval = function(t, e, i) {
                var r = window.setInterval(t.bind(e), i);
                return this.intervalIDMap.set(r, !0), r;
            }),
            (t.prototype.clearInterval = function(t) {
                window.clearInterval(t), this.intervalIDMap['delete'](t);
            }),
            (t.prototype.hasTimeout = function(t) {
                return this.timeoutIDMap.has(t);
            }),
            (t.prototype.hasInterval = function(t) {
                return this.intervalIDMap.has(t);
            }),
            Object.defineProperty(t.prototype, 'isPaused', {
                get: function() {
                    return this._isPaused;
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.prototype.callLater = function(t, e) {
                var i = this.setTimeout(t, e, 50);
                return this.autoClearTimeout(i, e), i;
            }),
            (t.prototype.autoClearTimeout = function(t, e) {
                var i = this;
                e instanceof egret.DisplayObject
                    ? e.addEventListener(
                          egret.Event.REMOVED_FROM_STAGE,
                          function() {
                              i.clearTimeout(t);
                          },
                          this
                      )
                    : e instanceof r.SingletonDispatcher &&
                      e.addEventListener(
                          r.EVENT_RELEASE,
                          function() {
                              i.clearTimeout(t);
                          },
                          this
                      );
            }),
            t
        );
    })(r.SingletonDispatcher);
    (r.NonstopTimer = t), __reflect(t.prototype, 'Core.NonstopTimer');
})(Core || (Core = {}));
var Core;
!(function(t) {
    function e(i) {
        i = i.replace(/\<\!\-\-[\S\s]*?\-\-\>/g, '');
        var r,
            s = [],
            n = function() {
                return s.length > 0 ? s[s.length - 1] : null;
            },
            o = function(t) {
                var e = n();
                return e
                    ? (e._children || (e._children = []),
                      void e._children.push(t))
                    : void (r = t);
            },
            a = function(t) {
                var e = n();
                e && (e._text = t);
            },
            h = 0,
            u = function(t) {
                if (t.index > h) {
                    var e = i.slice(h, t.index).trim();
                    e && a(e);
                }
                (h = t.index + t.length),
                    t.selfclosing ? o(C(t)) : t.closing ? c() : s.push(C(t));
            },
            c = function() {
                var t = s.pop();
                o(t);
            },
            f = function(t, e) {
                void 0 === e && (e = null), e && (e['$' + t.key] = t.value);
            },
            C = function(t) {
                var n = { name: t.name };
                return (
                    t.full.replace(/\w+="(?:[^"\\]|\\.)*"/g, function(
                        t,
                        e,
                        i,
                        r
                    ) {
                        var s = t.indexOf('=');
                        return (
                            f(
                                {
                                    key: t.substring(0, s),
                                    value: t.substring(s + 2, t.length - 1)
                                },
                                n
                            ),
                            t
                        );
                    }),
                    n
                );
            };
        return (
            i.replace(
                /<((?:\/|\!)?(?:[a-zA-Z0-9_-]+:)?[a-zA-Z0-9_-]+)(?:\s*(?:(?:[a-zA-Z0-9_-]+:)?[a-zA-Z0-9_-]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s]+))?)*\s*(\/?)>/g,
                function(t, e, i, r) {
                    var s = '/' === e[0],
                        n = '!' === e[0];
                    return (
                        (e = s || n ? e.substring(1) : e),
                        u({
                            name: e,
                            closing: s,
                            special: n,
                            selfclosing: n || !!i,
                            index: r,
                            length: t.length,
                            full: t
                        }),
                        t
                    );
                }
            ),
            r
        );
    }
    t.parseXML = e;
})(Core || (Core = {}));
var Core;
!(function(t) {
    function e() {
        i();
    }
    function i() {
        ArrayBuffer.prototype.slice ||
            (ArrayBuffer.prototype.slice = function(t, e) {
                if (
                    (void 0 === t && (t = 0),
                    void 0 === e && (e = this.byteLength),
                    (t = Math.floor(t)),
                    (e = Math.floor(e)),
                    0 > t && (t += this.byteLength),
                    0 > e && (e += this.byteLength),
                    (t = Math.min(Math.max(0, t), this.byteLength)),
                    (e = Math.min(Math.max(0, e), this.byteLength)),
                    0 >= e - t)
                )
                    return new ArrayBuffer(0);
                var i = new ArrayBuffer(e - t),
                    r = new Uint8Array(i),
                    s = new Uint8Array(this, t, e - t);
                return r.set(s), i;
            });
    }
    t.updatePrototype = e;
})(Core || (Core = {}));
var Core;
!(function(t) {
    function r(t) {
        var e = t.numChildren;
        if (!e) return void (t.removeEventListener && n(t));
        for (var i = 0; e > i; i++) r(t.getChildAt(i));
        t.removeChildren(), n(t, [egret.Event.REMOVED_FROM_STAGE]);
    }
    function s(t) {
        if (t.$children) {
            var e = t.$children.slice(0);
            e.forEach(function(t) {
                s(t);
            });
        }
        t.$parent && t.$parent.removeChild(t);
        var i = t;
        if (i.onReleaseRefs) i.onReleaseRefs();
        else {
            if (i.$Component)
                for (var r in i.$Component) i.$Component[r] = null;
            t.$EventDispatcher && (t.$EventDispatcher[0] = null);
        }
    }
    function e(t) {
        t.$EventDispatcher && (t.$EventDispatcher[0] = null);
    }
    function n(t, e) {
        void 0 === e && (e = []);
        var i,
            r,
            s = t.$EventDispatcher[1],
            n = t.$EventDispatcher[2];
        for (var o in s)
            if (!(e.indexOf(o) >= 0) && s[o]) {
                i = s[o].slice(0);
                for (var a = 0; a < i.length; a++)
                    (r = i[a]),
                        t.removeEventListener(r.type, r.listener, r.thisObject);
                i = null;
            }
        for (var o in n)
            if (!(e.indexOf(o) >= 0) && n[o]) {
                i = n[o].slice(0);
                for (var a = 0; a < i.length; a++)
                    (r = i[a]),
                        t.removeEventListener(r.type, r.listener, r.thisObject);
                i = null;
            }
    }
    function i(t, e) {
        var i,
            r,
            s = t.$EventDispatcher[1],
            n = t.$EventDispatcher[2];
        if (s[e] && (i = s[e]))
            for (var o = 0; o < i.length; o++)
                (r = i[o]),
                    t.removeEventListener(r.type, r.listener, r.thisObject);
        if (n[e] && (i = n[e]))
            for (var o = 0; o < i.length; o++)
                (r = i[o]),
                    t.removeEventListener(r.type, r.listener, r.thisObject);
    }
    (t.freeAllChildren = r),
        (t.releaseAllChildren = s),
        (t.releaseEventDispatcher = e),
        (t.removeAllEventListener = n),
        (t.removeEventListenerByType = i);
})(Core || (Core = {}));
var Core;
!(function(t) {
    var e;
    !(function(t) {
        var e = (function() {
            function t(t) {
                this.configSubdomain = t.attr('configSubdomain');
            }
            return t;
        })();
        (t.ProductInfo = e), __reflect(e.prototype, 'Core.Config.ProductInfo');
    })((e = t.Config || (t.Config = {})));
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.storageMap = new i.HashMap()),
                (t.objectMap = new i.HashMap()),
                t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.getItem = function(t) {
                var e = this.storageMap.get(t);
                if (e) return e;
                var i = egret.localStorage.getItem(t);
                return this.storageMap.set(t, i), i;
            }),
            (t.prototype.setItem = function(t, e) {
                this.storageMap.set(t, e), egret.localStorage.setItem(t, e);
            }),
            (t.prototype.getObject = function(t, e) {
                void 0 === e && (e = {});
                var i = this.objectMap.get(t);
                if (!i) {
                    var r = this.getItem(t);
                    (i = r ? JSON.parse(r) : e), this.objectMap.set(t, i);
                }
                return i;
            }),
            (t.prototype.setObject = function(t, e) {
                this.objectMap.set(t, e);
                var i = JSON.stringify(e);
                this.setItem(t, i);
            }),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: !0,
                configurable: !0
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            t
        );
    })(i.SingletonDispatcher);
    (i.StorageManager = t), __reflect(t.prototype, 'Core.StorageManager');
})(Core || (Core = {}));
var Core;
!(function(s) {
    function t(t) {
        var e = new RegExp('(^|&)' + t + '=([^&]*)(&|$)', 'i'),
            i = location.search.substr(1).match(e);
        return i && i.length >= 2 ? decodeURIComponent(i[2]) : null;
    }
    function r(t) {
        var e,
            i = '';
        if (!t) return i;
        for (e in t) 'object' == typeof t[e] || (i += '&' + e + '=' + t[e]);
        return i.length > 0 && (i = i.substr(1)), i;
    }
    function e(t, e) {
        var i = t.split('/').pop();
        return i.indexOf('?') >= 0 ? t + '&' + r(e) : t + '?' + r(e);
    }
    function i(t, e, i, r) {
        if (i && r) {
            var s = 'height=' + r + ',width=' + i;
            return window.open(t, e, s);
        }
        return window.open(t, e);
    }
    function n(t, e, i) {
        return window.open(t, e, i);
    }
    function o(t, e, i) {
        return (
            void 0 === i && (i = !1),
            t === s.LoginStore.instance.loginName
                ? i && e.length > 8
                    ? e.substring(0, 8) + '...'
                    : e
                : e && e != t.substring(3, s.ma + 3) && e != t
                    ? i && e.length > 8
                        ? e.substring(0, 7) + '...'
                        : e
                    : e
                        ? '***' + e.slice(e.length - 3)
                        : '***' + t.substring(3, s.ma + 3).slice(s.ma - 3)
        );
    }
    function a(t) {
        for (
            var e = t.length, i = new egret.ByteArray(), r = 0;
            e > r;
            r += 2
        ) {
            var s = parseInt(t[r], 16),
                n = parseInt(t[r + 1], 16);
            i.writeByte((s << 4) + n);
        }
        return (i.position = 0), i;
    }
    function h() {
        'UAT' === s.ExternalData.env
            ? location.reload()
            : s.ExternalData.domainName
                ? (window.location.href = '//' + s.ExternalData.domainName)
                : window.history.length > 1
                    ? window.history.go(-1)
                    : (window.location.href = 'about:blank');
    }
    function u(t) {
        return t > -s.FLOAT_MIN_VALUE && t < s.FLOAT_MIN_VALUE ? !0 : !1;
    }
    function c(t) {
        var e = Math.floor(t),
            i = '';
        return (
            (i = e == t ? t.toFixed(0) : t.toFixed(2)),
            i.replace(/./g, function(t, e, i) {
                return e && '.' != t && (i.length - e) % 3 === 0 ? ',' + t : t;
            })
        );
    }
    function f(t) {
        return (t * Math.PI) / 180;
    }
    function C(t, e) {
        var i = t - e;
        return i > 0 ? !0 : !1;
    }
    function l(t) {
        return 10 >= t ? 16711680 : 16768512;
    }
    function m() {
        if (s.ExternalData.isPcVersion) {
            var t = document.getElementsByTagName('canvas');
            if (t && t.length > 0) {
                var e = t[0];
                e.style.cursor = 'default';
            }
        }
    }
    function d(t, e) {
        void 0 === e && (e = '');
        var i = '';
        if ([s.LANG_HANS, s.LANG_HANT, ''].indexOf(e) >= 0)
            i = (t.getMonth() + 1).toString();
        else {
            var r = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ];
            i = r[t.getMonth()];
        }
        return i;
    }
    function v(t, e, i) {
        void 0 === i && (i = '');
        var r = {
                'M+': d(e, i),
                'd+': e.getDate(),
                'h+': e.getHours() % 12 == 0 ? 12 : e.getHours() % 12,
                'H+': e.getHours(),
                'm+': e.getMinutes(),
                's+': e.getSeconds(),
                'q+': Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds()
            },
            s = {
                0: '/u65e5',
                1: '/u4e00',
                2: '/u4e8c',
                3: '/u4e09',
                4: '/u56db',
                5: '/u4e94',
                6: '/u516d'
            };
        /(y+)/.test(t) &&
            (t = t.replace(
                RegExp.$1,
                (e.getFullYear() + '').substr(4 - RegExp.$1.length)
            )),
            /(E+)/.test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    (RegExp.$1.length > 1
                        ? RegExp.$1.length > 2
                            ? '/u661f/u671f'
                            : '/u5468'
                        : '') + s[e.getDay() + '']
                ));
        for (var n in r)
            new RegExp('(' + n + ')').test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    1 == RegExp.$1.length
                        ? r[n]
                        : ('00' + r[n]).substr(('' + r[n]).length)
                ));
        return t;
    }
    function G() {
        return (
            s.sequence++,
            s.sequence > 99999999 && (s.sequence = 1e7),
            s.sequence
        );
    }
    function _(t, e) {
        void 0 === e && (e = 0), 0 == e && (e = s.ARRAY_NUMERIC_ASCENDING);
        var i =
            e == s.ARRAY_NUMERIC_ASCENDING ||
            e == s.ARRAY_CASEINSENSITIVE_ASCENDING;
        t.sort(function(t, e) {
            return t > e ? (i ? 1 : -1) : i ? -1 : 1;
        });
    }
    function b(t) {
        var e = document.createElement('textarea');
        (e.style.position = 'fixed'),
            (e.style.top = '0'),
            (e.style.left = '0'),
            (e.style.width = '2em'),
            (e.style.height = '2em'),
            (e.style.padding = '0'),
            (e.style.border = 'none'),
            (e.style.outline = 'none'),
            (e.style.boxShadow = 'none'),
            (e.style.background = 'transparent'),
            (e.value = t),
            document.body.appendChild(e),
            e.select();
        try {
            var i = document.execCommand('copy'),
                r = i ? 'successful' : 'unsuccessful';
            dclib('Copying text command was ' + r);
        } catch (t) {
            dclib('Oops, unable to copy');
        }
        document.body.removeChild(e);
    }
    function P(t) {
        var e = document.createElement('textarea');
        return (e.innerHTML = t), e.value;
    }
    function V(t) {
        switch (t) {
            case s.LANG_HANS:
                return s.LANG_ZH_CONF;
            case s.LANG_HANT:
                return s.LANG_TR_CONF;
            case s.LANG_EN:
                return s.LANG_EN_CONF;
            case s.LANG_JA:
                return s.LANG_JP_CONF;
            case s.LANG_KO:
                return s.LANG_KR_CONF;
            case s.LANG_TH:
                return s.LANG_TH_CONF;
            case s.LANG_KM:
                return s.LANG_KM_CONF;
            case s.LANG_PT:
                return s.LANG_PT_CONF;
        }
        return s.LANG_EN_CONF;
    }
    function g(t) {
        return (9 >= t ? '0' : '') + t;
    }
    function p(t) {
        return (
            [t.getFullYear(), g(t.getMonth() + 1), g(t.getDate())].join('-') +
            ' ' +
            [g(t.getHours()), g(t.getMinutes()), g(t.getSeconds())].join(':')
        );
    }
    function k(t) {
        t.thisArg ? t.callback.call(t.thisArg) : t.callback();
    }
    function w(t, e) {
        t.thisArg ? t.callback.call(t.thisArg, e) : t.callback(e);
    }
    function z(t) {
        void 0 === t && (t = '');
        var e = new Error();
        console.warn(t, e.stack);
    }
    function S(t, e, i) {
        for (var r, s = i ? !0 : !1, n = 0; n < t.numChildren; n++)
            (r = t.getChildAt(n)),
                (r.textColor = e),
                (r.bold = s),
                (r.background = s),
                s && (r.backgroundColor = i);
    }
    function y(t) {
        return '[' + t.toString() + ']';
    }
    (s.getUrlParams = t),
        (s.urlWithParams = e),
        (s.openUrl = i),
        (s.openUrlWithProps = n),
        (s.getAnonymousName = o),
        (s.hexStringToByteArray = a),
        (s.quit = h),
        (s.FLOAT_MIN_VALUE = 1e-6),
        (s.isZero = u),
        (s.formatNumStr = c),
        (s.degreeToRadians = f),
        (s.checkBalance = C),
        (s.getTimerColor = l),
        (s.resetMouseCursor = m),
        (s.getMonthStr = d),
        (s.patternDate = v),
        (s.sequence = 1e7),
        (s.getSequence = G),
        (s.ARRAY_NUMERIC_ASCENDING = 1),
        (s.ARRAY_NUMERIC_DESCENDING = 2),
        (s.ARRAY_CASEINSENSITIVE_ASCENDING = 3),
        (s.ARRAY_CASEINSENSITIVE_DESCENDING = 4),
        (s.arraySort = _),
        (s.copyTextToClipboard = b),
        (s.pasteHtmlToString = P),
        (s.getConfigLang = V),
        (s.pad2 = g),
        (s.formatToDatetime = p),
        (s.callCallback = k),
        (s.callCallbackParam = w),
        (s.traceStack = z),
        (s.setGrpTitleStyle = S),
        (s.getErrorCodeStr = y);
})(Core || (Core = {}));
var Core;
!(function(i) {
    var t = (function() {
        function r(t) {
            this.xmlObj = t;
        }
        return (
            (r.prototype.find = function(e) {
                var t = this.xmlObj._children;
                if (!t || t.length <= 0) return [];
                var i = [];
                return (
                    t.forEach(function(t) {
                        t.name == e && i.push(new r(t));
                    }, this),
                    i
                );
            }),
            (r.prototype.getChildren = function() {
                var t = this.xmlObj._children;
                if (!t || t.length <= 0) return new i.ArrayMap();
                var e = new i.ArrayMap();
                return (
                    t.forEach(function(t) {
                        e.set(t.name, new r(t));
                    }, this),
                    e
                );
            }),
            (r.prototype.hasAttr = function(t) {
                var e = this.xmlObj['$' + t];
                return null != e;
            }),
            (r.prototype.attr = function(t, e) {
                void 0 === e && (e = '');
                var i = this.xmlObj['$' + t];
                return i ? i : e;
            }),
            Object.defineProperty(r.prototype, 'text', {
                get: function() {
                    var t = this.xmlObj._text;
                    return t ? t : '';
                },
                enumerable: !0,
                configurable: !0
            }),
            (r.prototype.listAttr = function(t, e) {
                void 0 === e && (e = ' ');
                var i = this.attr(t);
                return i
                    ? i.split(e).filter(function(t) {
                          return '' !== t;
                      })
                    : [];
            }),
            (r.prototype.intAttr = function(t, e) {
                void 0 === e && (e = 0);
                var i = parseInt(this.attr(t));
                return isNaN(i) ? e : i;
            }),
            (r.prototype.boolAttr = function(t, e) {
                return (
                    void 0 === e && (e = !1),
                    '1' === this.attr(t, e ? '1' : '0')
                );
            }),
            (r.read = function(t) {
                return new r(t);
            }),
            r
        );
    })();
    (i.XMLReader = t), __reflect(t.prototype, 'Core.XMLReader');
})(Core || (Core = {}));
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameAbac;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var VideoGameCore;
var VideoGameCore;
var GameBac;
var VideoGameCore;
var GameBac;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var VideoGameCore;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var GameBac;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var GameBj;
var VideoGameCore;
var GameBj;
function dclib() {}
