'use strict';
/** @type {function(!Function, string, !Array): undefined} */
var __reflect =
    (this && this.__reflect) ||
    function(d, name, start) {
        /** @type {string} */
        d.__class__ = name;
        if (start) {
            start.push(name);
        } else {
            /** @type {!Array} */
            start = [name];
        }
        d.__types__ = d.__types__ ? start.concat(d.__types__) : start;
    };
var __extends =
    (this && this.__extends) ||
    (function() {
        /** @type {function(!Object, ?): !Object} */
        var bind =
            Object.setPrototypeOf ||
            ({
                __proto__: []
            } instanceof Array &&
                function(object, proto) {
                    /** @type {!Object} */
                    object.__proto__ = proto;
                }) ||
            function(result, object) {
                var name;
                for (name in object) {
                    if (object.hasOwnProperty(name)) {
                        result[name] = object[name];
                    }
                }
            };
        return function(d, func) {
            /**
             * @return {undefined}
             */
            function proxy() {
                /** @type {!Function} */
                this.constructor = d;
            }
            bind(d, func);
            d.prototype =
                null === func
                    ? Object.create(func)
                    : ((proxy.prototype = func.prototype), new proxy());
        };
    })();
var Core;
!(function(GestureDetector) {
    var touch = (function(Base) {
        /**
         * @return {?}
         */
        function Store() {
            return Base.call(this) || this;
        }
        return (
            __extends(Store, Base),
            (Store.prototype.release = function() {
                this.dispatchEventWith(GestureDetector.EVENT_RELEASE);
                GestureDetector.removeAllEventListener(this);
            }),
            (Store.getInstance = function(name) {
                return (
                    name._instance ||
                        console.warn(
                            egret.getQualifiedClassName(name) +
                                ' need init first'
                        ),
                    name._instance
                );
            }),
            (Store.initInstance = function(cls) {
                return (
                    cls._instance
                        ? console.warn(
                              egret.getQualifiedClassName(cls) + ' already init'
                          )
                        : (cls._instance = new cls()),
                    cls._instance
                );
            }),
            (Store.releaseInstance = function() {
                if (this._instance) {
                    this._instance.release();
                    /** @type {null} */
                    this._instance = null;
                }
            }),
            Store
        );
    })(egret.EventDispatcher);
    GestureDetector.SingletonDispatcher = touch;
    __reflect(touch.prototype, 'Core.SingletonDispatcher');
})(Core || (Core = {}));
!(function(exports) {
    var SegmentTree = (function(Base) {
        /**
         * @return {?}
         */
        function Store() {
            var t = Base.call(this) || this;
            return (
                (t._actionListenerId = 0),
                (t._actionListenerMap = new exports.HashMap()),
                t
            );
        }
        return (
            __extends(Store, Base),
            (Store.prototype.dispatchAction = function(actionName, event) {
                if (actionName) {
                    var i = {
                        type: actionName,
                        data: event
                    };
                    this.dispatchEventWith(egret.Event.CHANGE, false, i);
                    this._actionListenerMap.forEach(function(action) {
                        if (action.actionType === actionName) {
                            action.callback.call(action.thisArg, i);
                        }
                    });
                } else {
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
            }),
            (Store.prototype.addActionListener = function(
                action,
                listener,
                type
            ) {
                return (
                    this._actionListenerId++,
                    this._actionListenerMap.set(this._actionListenerId, {
                        actionType: action,
                        callback: listener,
                        thisArg: type
                    }),
                    this._actionListenerId
                );
            }),
            (Store.prototype.removeActionListener = function(listener) {
                this._actionListenerMap['delete'](listener);
            }),
            (Store.prototype.onceAction = function(name, val, ctx) {
                var component = this;
                this._actionListenerId++;
                var s = this._actionListenerId;
                /**
                 * @param {?} data
                 * @return {undefined}
                 */
                var completeCb = function(data) {
                    val.call(ctx, data);
                    component.removeActionListener(s);
                };
                return (
                    this._actionListenerMap.set(this._actionListenerId, {
                        actionType: name,
                        callback: completeCb,
                        thisArg: ctx
                    }),
                    this._actionListenerId
                );
            }),
            Store
        );
    })(exports.SingletonDispatcher);
    exports.StoreBase = SegmentTree;
    __reflect(SegmentTree.prototype, 'Core.StoreBase');
})(Core || (Core = {}));
!(function(exports) {
    var Resolute = (function(Signal) {
        /**
         * @return {?}
         */
        function self() {
            var self = Signal.call(this) || this;
            return (
                (self.socketListMap = new exports.HashMap()),
                self.getSocketList() &&
                    (self.socketList = self.getSocketList()),
                self
            );
        }
        return (
            __extends(self, Signal),
            Object.defineProperty(self.prototype, 'socketList', {
                get: function() {
                    return this.socketListMap.get('default');
                },
                set: function(obj) {
                    this.attachSocketList('default', obj);
                },
                enumerable: true,
                configurable: true
            }),
            (self.prototype.getSocketList = function() {
                return null;
            }),
            (self.prototype.onConnected = function(event) {
                this.onSocketConnected(event.currentTarget);
            }),
            (self.prototype.onData = function(event) {
                var e = event.data;
                this.onSocketData(e, event.currentTarget);
            }),
            (self.prototype.onConnDie = function(event) {
                this.onSocketDie(event.currentTarget);
            }),
            (self.prototype.onSocketConnected = function(socket) {}),
            (self.prototype.onSocketData = function(message, data) {}),
            (self.prototype.onSocketDie = function(canCreateDiscussions) {}),
            (self.prototype.release = function() {
                var haproxyStats = this;
                Signal.prototype.release.call(this);
                this.socketListMap.keys.forEach(function(stat) {
                    haproxyStats.removeSocketList(stat);
                }, this);
            }),
            (self.prototype.attachSocketList = function(a, func) {
                func.forEach(this.setupSocket, this);
                this.socketListMap.set(a, func);
            }),
            (self.prototype.setupSocket = function(socket) {
                socket.addEventListener(
                    egret.Event.CONNECT,
                    this.onConnected,
                    this
                );
                socket.addEventListener(
                    exports.Network.EVENT_RECEIVE_PACKET,
                    this.onData,
                    this
                );
                socket.addEventListener(
                    exports.Network.EVENT_CONN_DIE,
                    this.onConnDie,
                    this
                );
            }),
            (self.prototype.removeSocketList = function(type) {
                var typelist = this.socketListMap.get(type);
                if (typelist) {
                    typelist.forEach(this.removeSocket, this);
                }
                this.socketListMap['delete'](type);
            }),
            (self.prototype.removeSocket = function(socket) {
                socket.removeEventListener(
                    egret.Event.CONNECT,
                    this.onConnected,
                    this
                );
                socket.removeEventListener(
                    exports.Network.EVENT_RECEIVE_PACKET,
                    this.onData,
                    this
                );
                socket.removeEventListener(
                    exports.Network.EVENT_CONN_DIE,
                    this.onConnDie,
                    this
                );
            }),
            self
        );
    })(exports.StoreBase);
    exports.NetworkStoreBase = Resolute;
    __reflect(Resolute.prototype, 'Core.NetworkStoreBase');
})(Core || (Core = {}));
!(function(tmp) {
    var Refresh = (function(parent) {
        /**
         * @return {?}
         */
        function ScrollList() {
            var self = parent.call(this) || this;
            return (
                (self.createCompleted = false),
                self.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    self.onAddToStage,
                    self
                ),
                self.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    self.onRemoveFromStage,
                    self
                ),
                self.once(
                    eui.UIEvent.CREATION_COMPLETE,
                    self.onCreateComplete,
                    self
                ),
                self
            );
        }
        return (
            __extends(ScrollList, parent),
            (ScrollList.prototype.onCreateComplete = function() {
                /** @type {boolean} */
                this.createCompleted = true;
                this.notifyChildrenInited();
            }),
            (ScrollList.prototype.onAddToStage = function() {
                var vm = this;
                this.onStoreChange(null, tmp.t);
                var pipelets = this.getStoreList();
                pipelets.forEach(function(template) {
                    template.addEventListener(
                        egret.Event.CHANGE,
                        vm.onStoreListChange,
                        vm
                    );
                }, this);
                this.notifyChildrenInited();
            }),
            (ScrollList.prototype.notifyChildrenInited = function() {
                if (!!this.createCompleted) {
                    !this.stage;
                }
            }),
            (ScrollList.prototype.onRemoveFromStage = function() {
                var context = this;
                var pipelets = this.getStoreList();
                pipelets.forEach(function(self) {
                    self.removeEventListener(
                        egret.Event.CHANGE,
                        context.onStoreListChange,
                        context
                    );
                }, this);
            }),
            (ScrollList.prototype.onStoreListChange = function(event) {
                if (event.data) {
                    var _event$data = event.data;
                    this.onStoreChange(
                        event.currentTarget,
                        _event$data.type,
                        _event$data.data
                    );
                } else {
                    this.onStoreChange(event.currentTarget, null, null);
                }
            }),
            (ScrollList.prototype.removeChild = function(id, element) {
                if (void 0 === element) {
                    /** @type {boolean} */
                    element = true;
                }
                var currentUserIds = parent.prototype.removeChild.call(
                    this,
                    id
                );
                return element && tmp.releaseAllChildren(id), currentUserIds;
            }),
            ScrollList
        );
    })(eui.Component);
    tmp.StoreView = Refresh;
    __reflect(Refresh.prototype, 'Core.StoreView');
})(Core || (Core = {}));
var VideoGameCore;
!(function(module) {
    var ColorReplaceFilter = (function(Base) {
        /**
         * @return {?}
         */
        function ScrollList() {
            var editor = Base.call(this) || this;
            return (
                (editor.skinName = editor.defaultSkinName),
                (editor.forceScrollbarVisible = null),
                editor.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    editor.onAddToStage,
                    editor
                ),
                editor.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    editor.onRemoveFromStage,
                    editor
                ),
                editor
            );
        }
        return (
            __extends(ScrollList, Base),
            (ScrollList.prototype.onAddToStage = function() {
                if (module.ExternalData.isPcVersion) {
                    /** @type {boolean} */
                    this.verticalScrollBar.autoVisibility = false;
                    this.onViewportResize();
                    this.viewport.addEventListener(
                        egret.Event.RESIZE,
                        this.onViewportResize,
                        this
                    );
                    module.ScrollerHelper.instance.registerWheelControl(this);
                }
            }),
            Object.defineProperty(ScrollList.prototype, 'scrollBarVisible', {
                set: function(num) {
                    /** @type {!Object} */
                    this.forceScrollbarVisible = num;
                    if (module.ExternalData.isPcVersion) {
                        this.onViewportResize();
                    }
                },
                enumerable: true,
                configurable: true
            }),
            (ScrollList.prototype.onViewportResize = function() {
                var t = this;
                egret.callLater(function() {
                    t.onViewportResizeUpdate();
                }, this);
            }),
            (ScrollList.prototype.onViewportResizeUpdate = function() {
                if (null !== this.forceScrollbarVisible) {
                    this.verticalScrollBar.visible = this.forceScrollbarVisible;
                } else {
                    if (this.viewport.height < this.viewport.contentHeight) {
                        /** @type {boolean} */
                        this.verticalScrollBar.visible = true;
                    } else {
                        /** @type {boolean} */
                        this.verticalScrollBar.visible = false;
                    }
                }
            }),
            (ScrollList.prototype.onRemoveFromStage = function() {
                if (module.ExternalData.isPcVersion) {
                    module.ScrollerHelper.instance.unregisterWheelControl(this);
                    if (this.viewport) {
                        this.viewport.removeEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        );
                    }
                }
            }),
            (ScrollList.prototype.onReleaseRefs = function() {
                if (module.ExternalData.isPcVersion) {
                    module.ScrollerHelper.instance.unregisterWheelControl(this);
                    if (this.viewport) {
                        this.viewport.removeEventListener(
                            egret.Event.RESIZE,
                            this.onViewportResize,
                            this
                        );
                    }
                }
            }),
            ScrollList
        );
    })(eui.Scroller);
    module.ScrollerBase = ColorReplaceFilter;
    __reflect(ColorReplaceFilter.prototype, 'Core.ScrollerBase');
})(Core || (Core = {}));
!(function(SIP) {
    var t;
    !(function(that) {
        /**
         * @param {!Object} args
         * @param {number} index
         * @return {?}
         */
        function start(args, index) {
            if (args && args.length >= index + 4) {
                var source = new egret.ByteArray(
                    args.buffer.slice(index, index + 4)
                );
                return source.readInt();
            }
            return null;
        }
        /** @type {string} */
        that.EVENT_RECEIVE_PACKET = 'EVENT_RECEIVE_PACKET';
        /** @type {string} */
        that.EVENT_CONN_DIE = 'EVENT_CONN_DIE';
        var e = (function(Base) {
            /**
             * @return {?}
             */
            function self() {
                var imageCollector = Base.call(this) || this;
                return (
                    (imageCollector.urlIndex = 0),
                    (imageCollector.isServerDead = false),
                    (imageCollector.moduleRespMap = new SIP.HashMap()),
                    imageCollector
                );
            }
            return (
                __extends(self, Base),
                Object.defineProperty(self.prototype, 'connected', {
                    get: function() {
                        return this.firstUnit && this.firstUnit.connected;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(self.prototype, 'connecting', {
                    get: function() {
                        return this.firstUnit && this.firstUnit.connecting;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(self.prototype, 'isSocketDie', {
                    get: function() {
                        return this.isServerDead;
                    },
                    enumerable: true,
                    configurable: true
                }),
                (self.prototype.autoConnect = function() {
                    try {
                        if (this.urlList.length <= 0) {
                            return void console.error(
                                'Check your host_config!'
                            );
                        }
                    } catch (t) {
                        return void console.error(
                            'Exception: Check your host_config!'
                        );
                    }
                    if (
                        ((this.hasValidPacket = false),
                        (this.selectRetryCount = 0),
                        (this.singleRetryCount = 0),
                        (this.totalRetryCount = 0),
                        SIP.ntimer.hasInterval(this.reconnInt) ||
                            (this.reconnInt = SIP.ntimer.setInterval(
                                this.tryReconn,
                                this,
                                this.AUTO_PERIOD
                            )),
                        this.sortedUrlList)
                    ) {
                        if (!this.firstUnit) {
                            return void console.warn(
                                'Please wait for the first response!'
                            );
                        }
                        this.firstUnit.connectByUrl(
                            this.sortedUrlList[this.urlIndex]
                        );
                    } else {
                        if (
                            ((this.sortedUrlList = that.SortedLineCache.getSortedLines(
                                this.getPort()
                            )),
                            this.sortedUrlList.length <= 0)
                        ) {
                            this.startSelectLine();
                        } else {
                            var url = this.sortedUrlList[0];
                            this.firstUnit = this.getUnitByUrl(url);
                            this.setupFirstUnit();
                            this.firstUnit.connectByUrl(url);
                        }
                    }
                }),
                (self.prototype.killSocket = function(a) {
                    var interval = this;
                    this.endSelectLine();
                    SIP.ntimer.clearInterval(this.reconnInt);
                    /** @type {boolean} */
                    this.hasValidPacket = false;
                    /** @type {number} */
                    this.selectRetryCount = 0;
                    /** @type {number} */
                    this.singleRetryCount = 0;
                    /** @type {number} */
                    this.totalRetryCount = 0;
                    if (a) {
                        SIP.ntimer.setTimeout(
                            function() {
                                if (
                                    !SIP.ntimer.hasInterval(interval.reconnInt)
                                ) {
                                    interval.close();
                                }
                            },
                            this,
                            a
                        );
                    } else {
                        this.close();
                    }
                }),
                (self.prototype.close = function() {
                    if (this.connected || this.connecting) {
                        this.firstUnit.close();
                    } else {
                        console.warn('Socket already close before!');
                    }
                }),
                (self.prototype.writeBytes = function(data, offset, length) {
                    if (this.connected) {
                        this.firstUnit.writeBytes(data, offset, length);
                    } else {
                        console.warn(
                            'Please check socket status before write!'
                        );
                    }
                }),
                (self.prototype.getUnitByUrl = function(data) {
                    return new that.DCSocketUnit(data, this.tag, this.respMap);
                }),
                Object.defineProperty(
                    self.prototype,
                    'MAX_SELECT_RETRY_COUNT',
                    {
                        get: function() {
                            return 5;
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                Object.defineProperty(
                    self.prototype,
                    'MAX_SINGLE_RETRY_COUNT',
                    {
                        get: function() {
                            return 1;
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                Object.defineProperty(self.prototype, 'MAX_TOTAL_RETRY_COUNT', {
                    get: function() {
                        return 5;
                    },
                    enumerable: true,
                    configurable: true
                }),
                (self.prototype.getPort = function() {
                    return this.urlList[0].split(':')[2];
                }),
                (self.prototype.startSelectLine = function() {
                    var handler = this;
                    this.endSelectLine();
                    dclib(this.tag + ' start select line!');
                    /** @type {!Array} */
                    this.sortedUrlList = [];
                    this.unitMap = new SIP.HashMap();
                    this.urlList.forEach(function(element) {
                        var self = handler.getUnitByUrl(element);
                        handler.unitMap.set(element, self);
                        self.once(
                            egret.Event.CONNECT,
                            handler.onUnitConnected,
                            handler
                        );
                        self.once(
                            egret.IOErrorEvent.IO_ERROR,
                            handler.onUnitError,
                            handler
                        );
                        self.once(
                            that.EVENT_RECEIVE_PACKET,
                            handler.onUnitPacket,
                            handler
                        );
                        self.connectByUrl(element);
                    }, this);
                }),
                (self.prototype.endSelectLine = function() {
                    if (this.unitMap) {
                        this.unitMap.forEach(function(DijitPopup) {
                            DijitPopup.close();
                        }, this);
                    }
                }),
                (self.prototype.tryReconn = function() {
                    if (!this.firstUnit) {
                        return void (this.selectRetryCount >
                        this.MAX_SELECT_RETRY_COUNT
                            ? this.onServerDie()
                            : (this.startSelectLine(),
                              this.selectRetryCount++));
                    }
                    if (!this.firstUnit.connected) {
                        if (this.totalRetryCount > this.MAX_TOTAL_RETRY_COUNT) {
                            return void this.onServerDie();
                        }
                        this.firstUnit.close();
                        if (
                            !this.hasValidPacket ||
                            this.singleRetryCount >= this.MAX_SINGLE_RETRY_COUNT
                        ) {
                            /** @type {number} */
                            this.urlIndex =
                                (this.urlIndex + 1) % this.sortedUrlList.length;
                            /** @type {boolean} */
                            this.hasValidPacket = false;
                            /** @type {number} */
                            this.singleRetryCount = 0;
                        }
                        this.firstUnit.connectByUrl(
                            this.sortedUrlList[this.urlIndex]
                        );
                        this.singleRetryCount++;
                        this.totalRetryCount++;
                    }
                }),
                (self.prototype.onServerDie = function() {
                    this.killSocket();
                    /** @type {boolean} */
                    this.isServerDead = true;
                    this.dispatchEventWith(that.EVENT_CONN_DIE);
                }),
                Object.defineProperty(self.prototype, 'AUTO_PERIOD', {
                    get: function() {
                        return 1e4;
                    },
                    enumerable: true,
                    configurable: true
                }),
                (self.prototype.onConnected = function(event) {
                    this.dispatchEventWith(egret.Event.CONNECT);
                }),
                (self.prototype.onClosed = function() {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }),
                (self.prototype.onIOError = function() {
                    this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }),
                (self.prototype.onReceivePacket = function(event) {
                    this.dispatchEventWith(
                        that.EVENT_RECEIVE_PACKET,
                        false,
                        event.data
                    );
                    /** @type {boolean} */
                    this.hasValidPacket = true;
                }),
                (self.prototype.onUnitConnected = function(that) {
                    that.currentTarget.writeBytes(
                        SIP.APIManager.getCMDUCGateAlive()
                    );
                }),
                (self.prototype.onUnitError = function(event) {
                    event.currentTarget.close();
                }),
                (self.prototype.onUnitPacket = function(e) {
                    var request = e.currentTarget;
                    if (this.sortedUrlList.length <= 0) {
                        this.firstUnit = request;
                        this.setupFirstUnit();
                        this.onConnected(e);
                    } else {
                        request.close();
                    }
                    this.unitMap['delete'](request.url);
                    this.sortedUrlList.push(request.url);
                    that.SortedLineCache.setSortedLines(
                        this.getPort(),
                        request.url
                    );
                }),
                (self.prototype.setupFirstUnit = function() {
                    var loader = this;
                    this.firstUnit.moduleRespMap = this.moduleRespMap;
                    this.firstUnit.addEventListener(
                        egret.Event.CONNECT,
                        this.onConnected,
                        this
                    );
                    this.firstUnit.addEventListener(
                        egret.Event.CLOSE,
                        this.onClosed,
                        this
                    );
                    this.firstUnit.addEventListener(
                        egret.IOErrorEvent.IO_ERROR,
                        this.onIOError,
                        this
                    );
                    this.firstUnit.addEventListener(
                        that.EVENT_RECEIVE_PACKET,
                        this.onReceivePacket,
                        this
                    );
                    this.firstUnit.addEventListener(
                        that.EVENT_CONN_SICK,
                        function() {
                            loader.dispatchEventWith(that.EVENT_CONN_SICK);
                        },
                        this
                    );
                    this.firstUnit.addEventListener(
                        that.EVENT_CONN_RECOVER,
                        function() {
                            loader.dispatchEventWith(that.EVENT_CONN_RECOVER);
                        },
                        this
                    );
                }),
                (self.prototype.appendRespMap = function(element, e) {
                    this.moduleRespMap.set(element, e);
                }),
                (self.prototype.removeRespMap = function(key) {
                    this.moduleRespMap['delete'](key);
                }),
                self
            );
        })(SIP.SingletonDispatcher);
        that.WebSocketBase = e;
        __reflect(e.prototype, 'Core.Network.WebSocketBase');
        /** @type {function(!Object, number): ?} */
        that.steelInt = start;
    })((t = SIP.Network || (SIP.Network = {})));
})(Core || (Core = {}));
var PCPlaza;
!(function(state) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function ScrollList() {
            var target = Base.call(this) || this;
            return (
                (target.localeKey = ''),
                (target.localeFunc = null),
                target.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    target.onAddToStage,
                    target
                ),
                target.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    target.onRemoveFromStage,
                    target
                ),
                target
            );
        }
        return (
            __extends(ScrollList, Base),
            (ScrollList.prototype.onAddToStage = function() {
                this.onLangChange();
                this.actionListenerId = state.LocalizeStore.instance.addActionListener(
                    state.q,
                    this.onLangChange,
                    this
                );
            }),
            (ScrollList.prototype.onRemoveFromStage = function() {
                state.LocalizeStore.instance.removeActionListener(
                    this.actionListenerId
                );
            }),
            (ScrollList.prototype.onLangChange = function() {
                if (this.localeFunc) {
                    this.label = this.localeFunc();
                } else {
                    if (this.localeKey) {
                        this.label = state.LocalizeStore.instance.translate(
                            this.localeKey
                        );
                    }
                }
            }),
            (ScrollList.prototype.refresh = function() {
                this.onLangChange();
            }),
            ScrollList
        );
    })(eui.Button);
    state.LocaleButton = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.LocaleButton');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function self() {
            var t = Base.call(this) || this;
            return (t._shadeCount = 0), (t._popupArray = []), t;
        }
        return (
            __extends(self, Base),
            Object.defineProperty(self.prototype, 'popupShade', {
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
                set: function(num) {
                    /** @type {number} */
                    this._popupShade = num;
                },
                enumerable: true,
                configurable: true
            }),
            (self.prototype.onRemoveFromStage = function() {
                Base.prototype.onRemoveFromStage.call(this);
                /** @type {number} */
                this._shadeCount = 0;
            }),
            (self.prototype.addPopup = function(
                text,
                id,
                object,
                title,
                section
            ) {
                if (void 0 === id) {
                    /** @type {boolean} */
                    id = false;
                }
                if (void 0 === object) {
                    /** @type {number} */
                    object = 0;
                }
                if (void 0 === title) {
                    /** @type {number} */
                    title = 0;
                }
                if (void 0 === section) {
                    /** @type {boolean} */
                    section = true;
                }
                if (id) {
                    this.addChild(this.popupShade);
                    /** @type {number} */
                    this._shadeCount = (this._shadeCount << 1) + 1;
                } else {
                    /** @type {number} */
                    this._shadeCount = (this._shadeCount << 1) + 0;
                }
                this.addChild(text);
                this._popupArray.push(text);
                if (section) {
                    /** @type {number} */
                    text.horizontalCenter = object;
                    /** @type {number} */
                    text.verticalCenter = title;
                }
            }),
            (self.prototype.removePopup = function(feature, popup, id) {
                if (void 0 === popup) {
                    /** @type {boolean} */
                    popup = false;
                }
                if (void 0 === id) {
                    /** @type {boolean} */
                    id = true;
                }
                /** @type {boolean} */
                var r = false;
                if (feature.parent === this) {
                    this.removeChild(feature, id);
                    var bb = this._popupArray.indexOf(feature);
                    if (bb > -1) {
                        /** @type {number} */
                        var n = this._popupArray.length - bb - 1;
                        /** @type {boolean} */
                        r = (this._shadeCount >> n) % 2 == 1;
                        if (0 == n) {
                            /** @type {number} */
                            this._shadeCount = this._shadeCount >> 1;
                        } else {
                            /** @type {number} */
                            this._shadeCount =
                                ((this._shadeCount >> (n + 1)) << n) +
                                (this._shadeCount % (2 * n));
                        }
                        this._popupArray.splice(bb, 1);
                    }
                }
                if (this._popupShade && this._popupShade.parent === this) {
                    if (
                        0 == this._shadeCount ||
                        0 === this._popupArray.length
                    ) {
                        this.removeChild(this._popupShade);
                    } else {
                        if (r) {
                            var index = this.getChildIndex(this.popupShade);
                            var i = this._shadeCount;
                            /** @type {number} */
                            var j = this._popupArray.length - 1;
                            for (; j >= 0; j--) {
                                if (i % 2 == 1) {
                                    index = this.getChildIndex(
                                        this._popupArray[j]
                                    );
                                    break;
                                }
                                /** @type {number} */
                                i = i >> 1;
                            }
                            this.addChildAt(this._popupShade, index);
                        }
                    }
                }
            }),
            (self.prototype.hasPopup = function(ArcGISDynamicMapServiceLayer) {
                if (ArcGISDynamicMapServiceLayer) {
                    /** @type {number} */
                    var layer_i = 0;
                    for (; layer_i < this._popupArray.length; layer_i++) {
                        var layer = this._popupArray[layer_i];
                        if (layer instanceof ArcGISDynamicMapServiceLayer) {
                            return true;
                        }
                    }
                    return false;
                }
                return this._popupArray.length > 0;
            }),
            (self.prototype.clearPopup = function() {
                for (; this._popupArray.length > 0; ) {
                    var subEyeName = this._popupArray.pop();
                    this.removePopup(subEyeName, true);
                }
            }),
            self
        );
    })(HTMLSectionBuilder.StoreView);
    HTMLSectionBuilder.PageBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.PageBase');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.onAddToStage = function() {
                Base.prototype.onAddToStage.call(this);
                /** @type {boolean} */
                this.scrollBarVisible = false;
                this.slider.setScroller(this);
                if (this.slider.btnUp && this.slider.btnDown) {
                    this.slider.btnUp.addEventListener(
                        egret.TouchEvent.TOUCH_TAP,
                        this.onTapUp,
                        this
                    );
                    this.slider.btnDown.addEventListener(
                        egret.TouchEvent.TOUCH_TAP,
                        this.onTapDown,
                        this
                    );
                    mouse.setButtonMode(this.slider.btnUp, true);
                    mouse.setButtonMode(this.slider.btnDown, true);
                }
                if (this.slider.thumb) {
                    this.orgThumbSource = this.slider.thumb.source;
                    this.slider.thumb.addEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.thumbOver,
                        this
                    );
                    this.slider.thumb.addEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.thumbOut,
                        this
                    );
                    mouse.setButtonMode(this.slider.thumb, true);
                }
            }),
            (WorkerDomAdapter.prototype.thumbOver = function() {
                /** @type {string} */
                this.slider.thumb.source = 'nav_asset_json.scroll_bar_hover';
            }),
            (WorkerDomAdapter.prototype.thumbOut = function() {
                this.slider.thumb.source = this.orgThumbSource;
            }),
            (WorkerDomAdapter.prototype.onTapUp = function() {
                if (this.viewport.scrollV > 0) {
                    /** @type {number} */
                    var tAnimationSprite =
                        this.viewport.scrollV - 80 >= 0
                            ? this.viewport.scrollV - 80
                            : 0;
                    this.setScrollV(tAnimationSprite);
                }
            }),
            (WorkerDomAdapter.prototype.onTapDown = function() {
                this.setScrollV(this.viewport.scrollV + 80);
            }),
            (WorkerDomAdapter.prototype.onViewportResizeUpdate = function() {
                Base.prototype.onViewportResizeUpdate.call(this);
                if (this.viewport && this.slider) {
                    if (this.viewport.height < this.viewport.contentHeight) {
                        /** @type {boolean} */
                        this.slider.visible = true;
                        /** @type {boolean} */
                        this.slider.touchEnabled = true;
                        /** @type {boolean} */
                        this.slider.touchChildren = true;
                    } else {
                        /** @type {boolean} */
                        this.slider.visible = false;
                        /** @type {boolean} */
                        this.slider.touchEnabled = false;
                        /** @type {boolean} */
                        this.slider.touchChildren = false;
                    }
                }
            }),
            (WorkerDomAdapter.prototype.reset = function() {
                this.setScrollV(0);
            }),
            (WorkerDomAdapter.prototype.setScrollV = function(sprite) {
                var _this2 = this;
                this.stopAnimation();
                /** @type {number} */
                this.viewport.scrollV = sprite;
                this.onViewportResizeUpdate();
                egret.callLater(function() {
                    if (_this2.slider) {
                        _this2.slider.setScroller(_this2);
                    }
                }, this);
            }),
            (WorkerDomAdapter.prototype.onReleaseRefs = function() {
                Base.prototype.onReleaseRefs.call(this);
                /** @type {null} */
                this.slider = null;
            }),
            WorkerDomAdapter
        );
    })(HTMLSectionBuilder.ScrollerBase);
    HTMLSectionBuilder.SliderScrollerBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.SliderScrollerBase');
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @param {?} _wid_attr
             * @param {!Object} data
             * @param {!Object} selector
             * @return {undefined}
             */
            function init(_wid_attr, data, selector) {
                this.respId = _wid_attr;
                /** @type {!Object} */
                this.context = selector;
                /** @type {number} */
                data.position = 8;
                this.seqNo = data.readInt();
                this.$(data);
            }
            return init;
        })();
        HTMLSectionBuilder.ResponseBase = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ResponseBase');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Group) {
        /**
         * @param {number} id
         * @return {?}
         */
        function View(id) {
            var self = Group.call(this) || this;
            return (
                (self.rootId = id),
                (self.domNode = new HTMLSectionBuilder.DOMNode(id)),
                self.domNode.mapDisplayObject(self),
                self.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    self.addToStage,
                    self
                ),
                self.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    self.removeFromStage,
                    self
                ),
                (self.$renderNode = new egret.sys.RenderNode()),
                self
            );
        }
        return (
            __extends(View, Group),
            (View.prototype.setLayerIndex = function(layer) {
                this.domNode.setLayerIndex(layer);
            }),
            (View.prototype.bind = function(data) {
                this.domNode.bind(data);
            }),
            (View.prototype.unbind = function() {
                this.domNode.unbind();
            }),
            (View.prototype.appendChildElement = function(el) {
                var parent_el = this.domNode.node.parentElement;
                parent_el.appendChild(el);
            }),
            (View.prototype.removeChildElementByClassName = function(node) {
                var parent = this.domNode.node.parentElement;
                var childNodes = parent.getElementsByClassName(node);
                /** @type {number} */
                var i = 0;
                for (; i < childNodes.length; i++) {
                    parent.removeChild(childNodes[i]);
                }
            }),
            (View.prototype.addToStage = function() {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    this.domNode.show();
                    this.domNode.updatePosition();
                    this.tempStage = this.stage;
                    this.tempStage.addEventListener(
                        egret.Event.RESIZE,
                        this.onResize,
                        this
                    );
                }
            }),
            (View.prototype.removeFromStage = function() {
                if (this.tempStage) {
                    this.tempStage.removeEventListener(
                        egret.Event.RESIZE,
                        this.onResize,
                        this
                    );
                    this.domNode.hide();
                    /** @type {null} */
                    this.tempStage = null;
                }
            }),
            (View.prototype.onResize = function() {
                this.domNode.updatePosition();
            }),
            (View.prototype.$update = function(e, data) {
                var overEvent = Group.prototype.$update.call(this, e, data);
                return this.domNode.updatePosition(), overEvent;
            }),
            View
        );
    })(egret.DisplayObject);
    HTMLSectionBuilder.WebNode = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.WebNode');
})(Core || (Core = {}));
!(function(parent) {
    var HashMap = (function() {
        /**
         * @param {!Object} itemConstructor
         * @return {undefined}
         */
        function List(itemConstructor) {
            /** @type {boolean} */
            this.cached = false;
            this.dataObj = itemConstructor || {};
        }
        return (
            (List.prototype.set = function(b, object) {
                return 0 === b || b
                    ? ((this.dataObj['' + b] = object),
                      (this.cached = false),
                      this)
                    : (console.warn('no vaild key for value:', object), this);
            }),
            (List.prototype.get = function(name) {
                return this.dataObj['' + name];
            }),
            (List.prototype.has = function(elem) {
                return !!this.dataObj['' + elem];
            }),
            (List.prototype['delete'] = function(picSize) {
                return (
                    delete this.dataObj['' + picSize],
                    (this.cached = false),
                    this
                );
            }),
            Object.defineProperty(List.prototype, 'keys', {
                get: function() {
                    return this.cached || this.sortData(), this.cacheKeys;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(List.prototype, 'values', {
                get: function() {
                    return this.cached || this.sortData(), this.cacheValues;
                },
                enumerable: true,
                configurable: true
            }),
            (List.prototype.forEach = function(callback, obj) {
                var s = this;
                this.keys.forEach(function(i) {
                    callback.call(obj, s.dataObj[i], i);
                }, this);
            }),
            (List.prototype.getItemByProperty = function(k, i) {
                /** @type {!Array} */
                var _watchableTools = [];
                return (
                    this.forEach(function(t) {
                        if (t[k] === i) {
                            _watchableTools.push(t);
                        }
                    }, this),
                    _watchableTools
                );
            }),
            (List.prototype.copy = function(uids) {
                var _self = this;
                return (
                    uids.forEach(function(range, element) {
                        _self.set(element, range);
                    }, this),
                    this
                );
            }),
            (List.prototype.sortData = function() {
                /** @type {!Array} */
                this.cacheKeys = [];
                /** @type {!Array} */
                this.cacheValues = [];
                var t;
                for (t in this.dataObj) {
                    if (this.dataObj.hasOwnProperty(t)) {
                        this.cacheKeys.push(this.restoreNumber(t));
                        this.cacheValues.push(this.dataObj[t]);
                    }
                }
                /** @type {boolean} */
                this.cached = true;
            }),
            (List.prototype.restoreNumber = function(y) {
                /** @type {number} */
                var a = +y;
                return isNaN(a) ? y : a;
            }),
            List
        );
    })();
    parent.HashMap = HashMap;
    __reflect(HashMap.prototype, 'Core.HashMap');
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(i) {
        var widget = (function(Base) {
            /**
             * @return {?}
             */
            function WorkerDomAdapter() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(WorkerDomAdapter, Base),
                (WorkerDomAdapter.prototype.getUnitByUrl = function(context) {
                    return new i.CryptoSocketUnit(
                        context,
                        this.tag,
                        this.respMap,
                        this
                    );
                }),
                WorkerDomAdapter
            );
        })(i.WebSocketBase);
        i.CryptoWebSocket = widget;
        __reflect(widget.prototype, 'Core.Network.CryptoWebSocket');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(options) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @param {number} url
             * @param {number} s
             * @return {?}
             */
            function WebSocket(url, s) {
                if (void 0 === url) {
                    /** @type {string} */
                    url = '';
                }
                if (void 0 === s) {
                    /** @type {number} */
                    s = 0;
                }
                var self = Base.call(this) || this;
                return (
                    (self._writeMessage = ''),
                    (self._readMessage = ''),
                    (self._isReadySend = false),
                    (self._bytesWrite = false),
                    (self._type = WebSocket.TYPE_STRING),
                    (self._writeMessage = ''),
                    (self._readMessage = ''),
                    self
                );
            }
            return (
                __extends(WebSocket, Base),
                (WebSocket.prototype.connectByUrl = function(url) {
                    var socket = this;
                    if (
                        !this.socket ||
                        this.socket.url != url ||
                        0 != this.socket.readyState
                    ) {
                        if (this.socket && this.socket.readyState < 2) {
                            this._unbindEvent();
                            this.socket.close();
                        }
                        try {
                            this.socket = new window.WebSocket(url);
                            /** @type {string} */
                            this.socket.binaryType = 'arraybuffer';
                            this._bindEvent();
                        } catch (ChangeSetName) {
                            console.error('ws error:', ChangeSetName);
                            setTimeout(function() {
                                socket.connectByUrl(url);
                            }, 100);
                        }
                    }
                }),
                (WebSocket.prototype.close = function() {
                    this.socket.close();
                }),
                (WebSocket.prototype.onConnect = function() {
                    this.dispatchEventWith(egret.Event.CONNECT);
                }),
                (WebSocket.prototype.onClose = function() {
                    this.dispatchEventWith(egret.Event.CLOSE);
                }),
                (WebSocket.prototype.onError = function() {
                    this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }),
                (WebSocket.prototype.onSocketData = function(message) {
                    if ('string' == typeof message) {
                        this._readMessage += message;
                    } else {
                        this._readByte._writeUint8Array(
                            new Uint8Array(message)
                        );
                    }
                    egret.ProgressEvent.dispatchProgressEvent(
                        this,
                        egret.ProgressEvent.SOCKET_DATA
                    );
                }),
                (WebSocket.prototype.flush = function() {
                    return this.connected
                        ? (this._writeMessage &&
                              (this.socket.send(this._writeMessage),
                              (this._writeMessage = '')),
                          this._bytesWrite &&
                              (this.socket.send(this._writeByte.buffer),
                              (this._bytesWrite = false),
                              this._writeByte.clear()),
                          void (this._isReadySend = false))
                        : void egret.$warn(3101);
                }),
                (WebSocket.prototype.writeUTF = function(message) {
                    return this.connected
                        ? (this._type == WebSocket.TYPE_BINARY
                              ? ((this._bytesWrite = true),
                                this._writeByte.writeUTF(message))
                              : (this._writeMessage += message),
                          void this.flush())
                        : void egret.$warn(3101);
                }),
                (WebSocket.prototype.readUTF = function() {
                    var message;
                    return (
                        this._type == WebSocket.TYPE_BINARY
                            ? ((this._readByte.position = 0),
                              (message = this._readByte.readUTF()),
                              this._readByte.clear())
                            : ((message = this._readMessage),
                              (this._readMessage = '')),
                        message
                    );
                }),
                (WebSocket.prototype.writeBytes = function(
                    bytes,
                    offset,
                    length
                ) {
                    return (
                        void 0 === offset && (offset = 0),
                        void 0 === length && (length = 0),
                        this.connected
                            ? this._writeByte
                                ? ((this._bytesWrite = true),
                                  this._writeByte.writeBytes(
                                      bytes,
                                      offset,
                                      length
                                  ),
                                  void this.flush())
                                : void egret.$warn(3102)
                            : void egret.$warn(3101)
                    );
                }),
                (WebSocket.prototype.readBytes = function(
                    bytes,
                    offset,
                    length
                ) {
                    return (
                        void 0 === offset && (offset = 0),
                        void 0 === length && (length = 0),
                        this._readByte
                            ? ((this._readByte.position = 0),
                              this._readByte.readBytes(bytes, offset, length),
                              void this._readByte.clear())
                            : void egret.$warn(3102)
                    );
                }),
                Object.defineProperty(WebSocket.prototype, 'connected', {
                    get: function() {
                        return this.socket && 1 == this.socket.readyState;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(WebSocket.prototype, 'connecting', {
                    get: function() {
                        return this.socket && 0 == this.socket.readyState;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(WebSocket.prototype, 'type', {
                    get: function() {
                        return this._type;
                    },
                    set: function(value) {
                        /** @type {!Object} */
                        this._type = value;
                        if (
                            !(value != WebSocket.TYPE_BINARY || this._writeByte)
                        ) {
                            this._readByte = new egret.ByteArray();
                            this._writeByte = new egret.ByteArray();
                        }
                    },
                    enumerable: true,
                    configurable: true
                }),
                (WebSocket.prototype._bindEvent = function() {
                    var socket = this.socket;
                    socket.onopen = function() {
                        if (this.onConnect) {
                            this.onConnect();
                        }
                    }.bind(this);
                    socket.onclose = function(canCreateDiscussions) {
                        if (this.onClose) {
                            this.onClose();
                        }
                    }.bind(this);
                    socket.onerror = function(canCreateDiscussions) {
                        if (this.onError) {
                            this.onError();
                        }
                    }.bind(this);
                    socket.onmessage = function(simpleselect) {
                        if (this.onSocketData) {
                            this.onSocketData(simpleselect.data);
                        }
                    }.bind(this);
                }),
                (WebSocket.prototype._unbindEvent = function() {
                    var socket = this.socket;
                    /**
                     * @return {undefined}
                     */
                    socket.onopen = function() {};
                    /**
                     * @return {undefined}
                     */
                    socket.onclose = function() {};
                    /**
                     * @return {undefined}
                     */
                    socket.onerror = function() {};
                    /**
                     * @return {undefined}
                     */
                    socket.onmessage = function() {};
                }),
                (WebSocket.TYPE_STRING = 'webSocketTypeString'),
                (WebSocket.TYPE_BINARY = 'webSocketTypeBinary'),
                WebSocket
            );
        })(options.SingletonDispatcher);
        HTMLSectionBuilder.NativeWebSocket = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.NativeWebSocket');
    })((t = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(scene) {
    var parent = (function(Base) {
        /**
         * @return {?}
         */
        function Document() {
            var pageService =
                (null !== Base && Base.apply(this, arguments)) || this;
            return (pageService.pageStack = []), pageService;
        }
        return (
            __extends(Document, Base),
            (Document.prototype.changePage = function(options, name) {
                if (
                    (void 0 === name && (name = false),
                    !name && this.pageStack.length > 0)
                ) {
                    var child = this.pageStack.pop();
                    if (child.parent) {
                        this.removeChild(child);
                        scene.releaseAllChildren(child);
                    }
                }
                if (name && this.pageStack.length > 0) {
                    child = this.getTopPage();
                    if (child.parent) {
                        this.removeChild(child);
                    }
                }
                this.pageStack.push(options);
                this.addChild(options);
            }),
            (Document.prototype.popPage = function(withHashes) {
                if (
                    (void 0 === withHashes && (withHashes = true),
                    this.pageStack.length <= 1)
                ) {
                    return void console.warn(
                        '[PageNavigator] bottom page already!'
                    );
                }
                var child = this.pageStack.pop();
                if (child.parent) {
                    this.removeChild(child);
                    scene.releaseAllChildren(child);
                }
                if (withHashes) {
                    this.addChild(this.getTopPage());
                }
            }),
            (Document.prototype.getTopPage = function() {
                return this.pageStack.length <= 0
                    ? null
                    : this.pageStack[this.pageStack.length - 1];
            }),
            Object.defineProperty(Document.prototype, 'topPageModuleName', {
                get: function() {
                    if (this.pageStack.length > 0) {
                        var componentsStr = egret.getQualifiedClassName(
                            this.getTopPage()
                        );
                        var expRecords = componentsStr.split('.');
                        return expRecords.length >= 2 ? expRecords[0] : null;
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            }),
            (Document.prototype.popPageByModuleName = function(
                database2,
                options
            ) {
                for (
                    ;
                    this.pageStack.length > 1 &&
                    this.topPageModuleName === database2;

                ) {
                    this.popPage(options);
                }
            }),
            (Document.prototype.getPageCount = function() {
                return this.pageStack.length;
            }),
            Document
        );
    })(eui.Group);
    scene.PageNavigatorBase = parent;
    __reflect(parent.prototype, 'Core.PageNavigatorBase');
})(Core || (Core = {}));
!(function(canCreateDiscussions) {
    var t;
    !(function(self) {
        var t = (function(Base) {
            /**
             * @return {?}
             */
            function WorkerDomAdapter() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(WorkerDomAdapter, Base),
                (WorkerDomAdapter.prototype.fetchConfig = function() {
                    var session = this;
                    if (!this.urls || 0 === this.urls.length) {
                        return void console.warn(
                            egret.getQualifiedClassName(this) +
                                ' url not defined!'
                        );
                    }
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.urls.length; i++) {
                        if (!this.urls[i]) {
                            return void console.warn(
                                egret.getQualifiedClassName(this) +
                                    ' no.' +
                                    i +
                                    ' url wrong'
                            );
                        }
                    }
                    var result = {
                        module: self.Module.HTTP,
                        sequence: self.Client.instance.sharedSequnce++,
                        method: self.Method.GET,
                        targetType: self.TargetType.XML,
                        urls: this.urls
                    };
                    self.Client.instance.sendHttpRequest(result, function(
                        global
                    ) {
                        switch (global.status) {
                            case self.Status.SUCCESS:
                                session.onRequestSuccess(global.content);
                                break;
                            case self.Status.ERROR:
                            case self.Status.INVALID_REQUEST:
                                session.onRequestFail();
                        }
                    });
                }),
                (WorkerDomAdapter.prototype.onRequestSuccess = function(
                    result
                ) {
                    this.parseXmlObj(result);
                    this.dispatchEventWith(
                        egret.Event.COMPLETE,
                        false,
                        this.successEventData
                    );
                }),
                (WorkerDomAdapter.prototype.onRequestFail = function() {
                    this.dispatchEventWith(
                        egret.Event.COMPLETE,
                        false,
                        this.failEventData
                    );
                }),
                Object.defineProperty(
                    WorkerDomAdapter.prototype,
                    'successEventData',
                    {
                        get: function() {
                            return true;
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                Object.defineProperty(
                    WorkerDomAdapter.prototype,
                    'failEventData',
                    {
                        get: function() {
                            return false;
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                WorkerDomAdapter
            );
        })(canCreateDiscussions.SingletonDispatcher);
        self.ConfigBase = t;
        __reflect(t.prototype, 'Core.AGWorker.ConfigBase');
    })(
        (t =
            canCreateDiscussions.AGWorker ||
            (canCreateDiscussions.AGWorker = {}))
    );
})(Core || (Core = {}));
!(function(module) {
    var ColorReplaceFilter = (function(Base) {
        /**
         * @return {?}
         */
        function App() {
            var onPlanet = Base.call(this) || this;
            return (
                (onPlanet.mouseLocaleKey = ''),
                (onPlanet.mouseLocaleFunc = null),
                onPlanet
            );
        }
        return (
            __extends(App, Base),
            (App.prototype.onAddToStage = function() {
                Base.prototype.onAddToStage.call(this);
                this.addEventListener(
                    mouse.MouseEvent.MOUSE_OVER,
                    this.onMouseOver,
                    this
                );
                this.addEventListener(
                    mouse.MouseEvent.MOUSE_OUT,
                    this.onMouseOut,
                    this
                );
                mouse.setButtonMode(this, true);
                this.setupMouseTips();
            }),
            (App.prototype.onRemoveFromStage = function() {
                Base.prototype.onRemoveFromStage.call(this);
                this.removeEventListener(
                    mouse.MouseEvent.MOUSE_OVER,
                    this.onMouseOver,
                    this
                );
                this.removeEventListener(
                    mouse.MouseEvent.MOUSE_OUT,
                    this.onMouseOut,
                    this
                );
                mouse.setButtonMode(this, false);
                this.clearMouseTips();
                if (null !== this.mouseLocaleFunc) {
                    module.MouseTips.instance.unregisterMouseTip(this);
                } else {
                    if ('' !== this.mouseLocaleKey) {
                        module.MouseTips.instance.unregisterMouseTip(this);
                    }
                }
            }),
            (App.prototype.setupMouseTips = function() {
                if (null !== this.mouseLocaleFunc) {
                    module.MouseTips.instance.registerMouseTip(
                        this,
                        this.mouseLocaleFunc
                    );
                } else {
                    if ('' !== this.mouseLocaleKey) {
                        module.MouseTips.instance.registerMouseTip(
                            this,
                            this.mouseLocaleKey
                        );
                    }
                }
            }),
            (App.prototype.clearMouseTips = function() {
                if (null !== this.mouseLocaleFunc) {
                    module.MouseTips.instance.unregisterMouseTip(this);
                } else {
                    if ('' !== this.mouseLocaleKey) {
                        module.MouseTips.instance.unregisterMouseTip(this);
                    }
                }
            }),
            (App.prototype.refresh = function() {
                Base.prototype.refresh.call(this);
                this.setupMouseTips();
            }),
            (App.prototype.onMouseOver = function() {
                if (this.enabled) {
                    if (this.skin.hasState('over')) {
                        /** @type {string} */
                        this.skin.currentState = 'over';
                    } else {
                        if (this.skin.hasState('down')) {
                            /** @type {string} */
                            this.skin.currentState = 'down';
                        }
                    }
                }
            }),
            (App.prototype.onMouseOut = function() {
                if (this.enabled && this.skin.hasState('up')) {
                    /** @type {string} */
                    this.skin.currentState = 'up';
                }
            }),
            App
        );
    })(module.LocaleButton);
    module.PCButton = ColorReplaceFilter;
    __reflect(ColorReplaceFilter.prototype, 'Core.PCButton');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.getStoreList = function() {
                return [];
            }),
            (WorkerDomAdapter.prototype.onStoreChange = function(
                store,
                oldStore,
                newStore
            ) {}),
            WorkerDomAdapter
        );
    })(HTMLSectionBuilder.PageBase);
    HTMLSectionBuilder.PCPageBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.PCPageBase');
})(Core || (Core = {}));
!(function(module) {
    var ColorReplaceFilter = (function(Base) {
        /**
         * @param {?} path
         * @param {!Object} params
         * @return {?}
         */
        function component(path, params) {
            var me = Base.call(this) || this;
            return (
                (me.mainBtnSkinName = ''),
                (me.msgKey = ''),
                (me.timerBtnIndex = -1),
                (me.timerCount = 0),
                (me.timerInterval = 0),
                (me.skinName = me.defaultSkinName),
                (me.msgKey = path),
                (me.optKeys = params),
                (me.scaleX = 0),
                (me.scaleY = 0),
                (me.dismissing = false),
                me.addEventListener(egret.Event.ADDED_TO_STAGE, me.onInit, me),
                me
            );
        }
        return (
            __extends(component, Base),
            (component.prototype.onInit = function() {
                var self = this;
                if (
                    (this.removeEventListener(
                        egret.Event.ADDED_TO_STAGE,
                        this.onInit,
                        this
                    ),
                    this.msgLabel && (this.msgLabel.localeKey = this.msgKey),
                    this.btnGrp)
                ) {
                    var item;
                    if (this.optKeys) {
                        this.optKeys.forEach(function(name, i) {
                            item = new self.defaultBtnClass(name, i);
                            if (
                                null != self.btnSkinNameArray &&
                                self.btnSkinNameArray.length > i
                            ) {
                                item.skinName = self.btnSkinNameArray[i];
                            }
                            self.btnGrp.addChild(item);
                            item.addEventListener(
                                egret.TouchEvent.TOUCH_TAP,
                                self.onBtnClick,
                                self
                            );
                        }, this);
                    } else {
                        item = new this.defaultBtnClass(this.defaultTextKey, 0);
                        if ('' != this.mainBtnSkinName) {
                            item.skinName = this.mainBtnSkinName;
                        }
                        this.btnGrp.addChild(item);
                        item.addEventListener(
                            egret.TouchEvent.TOUCH_TAP,
                            this.dismiss,
                            this
                        );
                    }
                }
            }),
            (component.prototype.onAddToStage = function() {
                Base.prototype.onAddToStage.call(this);
                /** @type {boolean} */
                this.dismissing = false;
                egret.Tween.get(this).to(
                    {
                        scaleX: 1,
                        scaleY: 1
                    },
                    300,
                    egret.Ease.backOut
                );
            }),
            (component.prototype.dismiss = function(sender) {
                var feature = this;
                if (void 0 === sender) {
                    /** @type {boolean} */
                    sender = true;
                }
                if (!this.dismissing) {
                    egret.Tween.get(this)
                        .to(
                            {
                                scaleX: 0,
                                scaleY: 0
                            },
                            300,
                            egret.Ease.backIn
                        )
                        .call(function() {
                            /** @type {boolean} */
                            feature.dismissing = false;
                            if (feature.parent) {
                                feature.parent.removePopup(
                                    feature,
                                    true,
                                    sender
                                );
                            }
                        }, this);
                    /** @type {boolean} */
                    this.dismissing = true;
                }
            }),
            (component.prototype.onBtnClick = function(event) {
                if (!this.dismissing) {
                    var e = event.target;
                    this.dispatchEventWith(
                        eui.ItemTapEvent.ITEM_TAP,
                        false,
                        e.index
                    );
                    this.dismiss();
                }
            }),
            (component.prototype.getMsgKey = function() {
                return this.msgKey;
            }),
            (component.prototype.startBtnTimer = function(
                connection,
                accessPointObj
            ) {
                if (
                    (void 0 === accessPointObj && (accessPointObj = 5),
                    this.optKeys)
                ) {
                    var result = this.optKeys.indexOf(connection);
                    if (result >= 0) {
                        this.timerBtnIndex = result;
                        /** @type {number} */
                        this.timerCount = accessPointObj;
                        if (
                            this.timerCount > 0 &&
                            !module.NonstopTimer.instance.hasInterval(
                                this.timerInterval
                            )
                        ) {
                            this.countDown();
                            this.timerInterval = module.NonstopTimer.instance.setInterval(
                                this.countDown,
                                this,
                                1e3
                            );
                        }
                    }
                }
            }),
            (component.prototype.stopBtnTimer = function() {
                /** @type {number} */
                this.timerBtnIndex = -1;
                /** @type {number} */
                this.timerCount = 0;
                module.NonstopTimer.instance.clearInterval(this.timerInterval);
            }),
            (component.prototype.countDown = function() {
                var workspace = this;
                if (this.timerCount > 0) {
                    this.timerCount--;
                    var cmd = void 0;
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.btnGrp.numChildren; i++) {
                        if (
                            ((cmd = this.btnGrp.getChildAt(i)),
                            cmd.index == this.timerBtnIndex)
                        ) {
                            /** @type {string} */
                            cmd.localeKey = '';
                            /**
                             * @return {?}
                             */
                            cmd.localeFunc = function() {
                                return (
                                    module.LocalizeStore.instance.translate(
                                        workspace.optKeys[
                                            workspace.timerBtnIndex
                                        ]
                                    ) +
                                    '(' +
                                    String(workspace.timerCount) +
                                    ')'
                                );
                            };
                            cmd.refresh();
                            break;
                        }
                    }
                } else {
                    this.stopBtnTimer();
                    this.dispatchEventWith(
                        eui.ItemTapEvent.ITEM_TAP,
                        false,
                        this.timerBtnIndex
                    );
                    this.dismiss();
                }
            }),
            component
        );
    })(module.StoreView);
    module.PopupBoardBase = ColorReplaceFilter;
    __reflect(ColorReplaceFilter.prototype, 'Core.PopupBoardBase');
})(Core || (Core = {}));
!(function(options) {
    var t;
    !(function(module) {
        var ColorReplaceFilter = (function(Base) {
            /**
             * @return {?}
             */
            function WorkerDomAdapter() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(WorkerDomAdapter, Base),
                Object.defineProperty(WorkerDomAdapter.prototype, 'urls', {
                    get: function() {
                        var spotifyApi = this;
                        var info = this.versionInfo;
                        var query = info.path;
                        /** @type {!Array} */
                        var r = [];
                        return (
                            module.VersionConfig.instance.domainList.forEach(
                                function(url) {
                                    r.push(
                                        url +
                                            spotifyApi.parsePlaceHolder(query) +
                                            '?timestamp=' +
                                            Date.now()
                                    );
                                }
                            ),
                            r
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                (WorkerDomAdapter.prototype.parsePlaceHolder = function(
                    module
                ) {
                    var pid = options.ExternalData.pid;
                    var completeFunc = module.replace(/\{pid\}/g, pid);
                    return completeFunc;
                }),
                Object.defineProperty(WorkerDomAdapter.prototype, 'localKey', {
                    get: function() {
                        return (
                            'CONFIG_' + this.id + '_' + options.ExternalData.pid
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(
                    WorkerDomAdapter.prototype,
                    'versionInfo',
                    {
                        get: function() {
                            var thisWidgetSettings = module.VersionConfig.instance.versionInfoMap.get(
                                this.id
                            );
                            return (
                                thisWidgetSettings ||
                                    console.error(
                                        this.id +
                                            ' not exist, check your version_config'
                                    ),
                                thisWidgetSettings
                            );
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                Object.defineProperty(
                    WorkerDomAdapter.prototype,
                    'configCache',
                    {
                        get: function() {
                            if (!this._configCache) {
                                var t = options.StorageManager.instance.getItem(
                                    this.localKey
                                );
                                if (t) {
                                    /** @type {*} */
                                    this._configCache = JSON.parse(t);
                                }
                            }
                            return this._configCache;
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                (WorkerDomAdapter.prototype.fetchConfig = function() {
                    var self = this;
                    return this.versionInfo.cacheEnabled
                        ? void (this.configCache &&
                          this.configCache.version == this.versionInfo.version
                              ? (this.parseXmlObj(this.configCache.content),
                                options.ntimer.callLater(function() {
                                    self.dispatchEventWith(
                                        egret.Event.COMPLETE,
                                        false,
                                        self.successEventData
                                    );
                                }, this))
                              : Base.prototype.fetchConfig.call(this))
                        : void Base.prototype.fetchConfig.call(this);
                }),
                (WorkerDomAdapter.prototype.onRequestSuccess = function(e) {
                    var result = {
                        version: this.versionInfo.version,
                        content: e
                    };
                    options.StorageManager.instance.setItem(
                        this.localKey,
                        JSON.stringify(result)
                    );
                    Base.prototype.onRequestSuccess.call(this, e);
                }),
                (WorkerDomAdapter.prototype.onRequestFail = function() {
                    if (this.configCache) {
                        console.warn(this.localKey + ' fall back to cache!');
                        this.parseXmlObj(this.configCache.content);
                        this.dispatchEventWith(
                            egret.Event.COMPLETE,
                            false,
                            this.successEventData
                        );
                    } else {
                        Base.prototype.onRequestFail.call(this);
                    }
                }),
                Object.defineProperty(
                    WorkerDomAdapter.prototype,
                    'successEventData',
                    {
                        get: function() {
                            return {
                                success: true,
                                configId: this.id
                            };
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                Object.defineProperty(
                    WorkerDomAdapter.prototype,
                    'failEventData',
                    {
                        get: function() {
                            return {
                                success: false,
                                configId: this.id
                            };
                        },
                        enumerable: true,
                        configurable: true
                    }
                ),
                WorkerDomAdapter
            );
        })(options.AGWorker.ConfigBase);
        module.CachedConfigBase = ColorReplaceFilter;
        __reflect(ColorReplaceFilter.prototype, 'Core.Config.CachedConfigBase');
    })((t = options.Config || (options.Config = {})));
})(Core || (Core = {}));
!(function(result) {
    var t;
    !(function(scope) {
        var GameInfo = (function() {
            /**
             * @param {!Object} t
             * @return {undefined}
             */
            function t(t) {
                this.readGameInfo(t);
                t.find(result.ExternalData.device.toLowerCase()).forEach(
                    this.readGameInfo,
                    this
                );
            }
            return (
                (t.prototype.readGameInfo = function(self) {
                    this.category =
                        !this.category || self.hasAttr('category')
                            ? self.attr('category')
                            : this.category;
                    this.brand =
                        !this.brand || self.hasAttr('brand')
                            ? self.attr('brand')
                            : this.brand;
                    this.platform =
                        !this.platform || self.hasAttr('platform')
                            ? self.attr('platform')
                            : this.platform;
                    this.gameType =
                        !this.gameType || self.hasAttr('gameType')
                            ? self.attr('gameType')
                            : this.gameType;
                    this.allowDemo =
                        void 0 == this.allowDemo || self.hasAttr('allowDemo')
                            ? self.boolAttr('allowDemo', true)
                            : this.allowDemo;
                    this.currencyList =
                        !this.currencyList || self.hasAttr('currency')
                            ? self.listAttr('currency')
                            : this.currencyList;
                    this.maintaining =
                        void 0 == this.maintaining ||
                        self.hasAttr('maintaining')
                            ? self.boolAttr('maintaining', false)
                            : this.maintaining;
                    this.extraList =
                        !this.extraList || self.hasAttr('extra')
                            ? self.listAttr('extra')
                            : this.extraList;
                    this.moduleName =
                        !this.moduleName || self.hasAttr('moduleName')
                            ? self.attr('moduleName')
                            : this.moduleName;
                    this.vid =
                        !this.vid || self.hasAttr('vid')
                            ? self.attr('vid')
                            : this.vid;
                }),
                t
            );
        })();
        scope.GameInfo = GameInfo;
        __reflect(GameInfo.prototype, 'Core.Config.GameInfo');
    })((t = result.Config || (result.Config = {})));
})(Core || (Core = {}));
!(function(Notifier) {
    var t;
    !(function(v) {
        /**
         * @param {string} value
         * @param {number} length
         * @param {!Object} fill
         * @return {?}
         */
        function set(value, length, fill) {
            return (
                (fill = fill || '0'),
                (value = value + ''),
                value.length >= length
                    ? value
                    : new Array(length - value.length + 1).join(fill) + value
            );
        }
        /**
         * @param {!Object} m
         * @return {?}
         */
        function r(m) {
            if (m.length < 12) {
                return false;
            }
            var j = v.steelInt(m, 4);
            return j == m.length;
        }
        /** @type {string} */
        v.EVENT_CONN_SICK = 'EVENT_CONN_SICK';
        /** @type {string} */
        v.EVENT_CONN_RECOVER = 'EVENT_CONN_RECOVER';
        var destination = (function(Base) {
            /**
             * @param {string} options
             * @param {number} name
             * @param {string} val
             * @return {?}
             */
            function self(options, name, val) {
                var self = Base.call(this) || this;
                return (
                    (self.ALIVE_PERIOD = 2e4),
                    (self.isSick = false),
                    (self.url = options),
                    (self.tag = name),
                    (self.respMap = val),
                    (self.type = v.NativeWebSocket.TYPE_BINARY),
                    (self.byteBuffer = new egret.ByteArray()),
                    self.addEventListener(
                        egret.Event.CONNECT,
                        self.onConnected,
                        self,
                        false,
                        10
                    ),
                    self.addEventListener(
                        egret.Event.CLOSE,
                        self.onClosed,
                        self
                    ),
                    self.addEventListener(
                        egret.IOErrorEvent.IO_ERROR,
                        self.onIOError,
                        self
                    ),
                    self.addEventListener(
                        egret.ProgressEvent.SOCKET_DATA,
                        self.onReceiveData,
                        self
                    ),
                    self
                );
            }
            return (
                __extends(self, Base),
                Object.defineProperty(self.prototype, 'HEART_BEAT_PERIOD', {
                    get: function() {
                        return 2e3;
                    },
                    enumerable: true,
                    configurable: true
                }),
                (self.prototype.writeBytes = function(array, length, offset) {
                    if (this.connected) {
                        try {
                            Base.prototype.writeBytes.call(
                                this,
                                array,
                                length,
                                offset
                            );
                            var remnant = v.steelInt(array, 0);
                            if (Notifier.ExternalData.showSocketLog) {
                                dclib(
                                    this.tag +
                                        ' send: 0x' +
                                        set(remnant.toString(16), 6) +
                                        ', length: ' +
                                        array.length
                                );
                            }
                        } catch (t) {
                            dclib(this.tag + ' WebSocketBase writeBytes fail!');
                        }
                    }
                }),
                (self.prototype.onConnected = function(event) {
                    var _this = this;
                    dclib(this.tag + 'onConnected!!');
                    this.aliveInterval = Notifier.ntimer.setInterval(
                        function() {
                            _this.writeBytes(
                                Notifier.APIManager.getCMDKeepAlive()
                            );
                        },
                        this,
                        this.ALIVE_PERIOD
                    );
                    /** @type {number} */
                    this.heartBeatCount = 0;
                    this.heartBeatInterval = Notifier.ntimer.setInterval(
                        function() {
                            if (2 === _this.heartBeatCount) {
                                /** @type {boolean} */
                                _this.isSick = true;
                                _this.dispatchEventWith(v.EVENT_CONN_SICK);
                            }
                            if (_this.heartBeatCount >= 3) {
                                _this.close();
                            } else {
                                _this.heartBeatCount++;
                                if (_this.heartBeatCount >= 2) {
                                    _this.writeBytes(
                                        Notifier.APIManager.getCMDUCGateAlive()
                                    );
                                }
                            }
                        },
                        this,
                        this.HEART_BEAT_PERIOD
                    );
                }),
                (self.prototype.handlePacket = function(packet) {
                    this.dispatchEventWith(
                        v.EVENT_RECEIVE_PACKET,
                        false,
                        packet
                    );
                    /** @type {number} */
                    this.heartBeatCount = 0;
                    if (this.isSick) {
                        this.dispatchEventWith(v.EVENT_CONN_RECOVER);
                        /** @type {boolean} */
                        this.isSick = false;
                    }
                }),
                (self.prototype.onClosed = function(callback) {
                    dclib(this.tag + 'onClosed!!');
                    Notifier.ntimer.clearInterval(this.aliveInterval);
                    Notifier.ntimer.clearInterval(this.heartBeatInterval);
                }),
                (self.prototype.onIOError = function(type) {
                    dclib(this.tag + 'onIOError!!');
                }),
                (self.prototype.onReceiveData = function(name) {
                    this.readBytes(this.byteBuffer);
                    for (; this.byteBuffer.length >= 12; ) {
                        var majoritySize = v.steelInt(this.byteBuffer, 4);
                        if (
                            !majoritySize ||
                            this.byteBuffer.length < majoritySize
                        ) {
                            return;
                        }
                        var data = new egret.ByteArray(
                            this.byteBuffer.buffer.slice(0, majoritySize)
                        );
                        var packet = this.getPacketData(data);
                        if (packet) {
                            this.handlePacket(packet);
                        }
                        if (this.byteBuffer.length > majoritySize) {
                            this.byteBuffer = new egret.ByteArray(
                                this.byteBuffer.buffer.slice(majoritySize)
                            );
                        } else {
                            if (this.byteBuffer.length == majoritySize) {
                                this.byteBuffer.clear();
                            }
                        }
                    }
                }),
                (self.prototype.getPacketData = function(t) {
                    var actual = v.steelInt(t, 0);
                    var idx = v.steelInt(t, 4);
                    return (
                        Notifier.ExternalData.showSocketLog &&
                            dclib(
                                this.tag +
                                    ' receive: 0x' +
                                    set(actual.toString(16), 6) +
                                    ', length:' +
                                    idx
                            ),
                        idx != t.length ? null : this.byteArrayToResponse(t)
                    );
                }),
                (self.prototype.byteArrayToResponse = function(data) {
                    if (r(data)) {
                        var item = v.steelInt(data, 0);
                        var cls = this.getResponseClass(item);
                        return new cls(item, data, this);
                    }
                    return null;
                }),
                (self.prototype.getResponseClass = function(b) {
                    var children;
                    return (
                        this.moduleRespMap &&
                            this.moduleRespMap.forEach(function(bsResult) {
                                var c = bsResult.get(b);
                                if (c) {
                                    children = c;
                                }
                            }, this),
                        children || (children = this.respMap.get(b)),
                        children ? children : v.pe
                    );
                }),
                self
            );
        })(v.NativeWebSocket);
        v.DCSocketUnit = destination;
        __reflect(destination.prototype, 'Core.Network.DCSocketUnit');
    })((t = Notifier.Network || (Notifier.Network = {})));
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(array) {
        /**
         * @return {?}
         */
        function result() {
            return array.call(this) || this;
        }
        return __extends(result, array), result;
    })(HTMLSectionBuilder.PageNavigatorBase);
    HTMLSectionBuilder.PCPageNavigator = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.PCPageNavigator');
})(Core || (Core = {}));
!(function(state) {
    var HTMLSectionBuilder = (function(Base) {
        /**
         * @return {?}
         */
        function self() {
            var target = Base.call(this) || this;
            return (
                (target._localeKey = ''),
                (target._localeFunc = null),
                (target._sizeNormal = 0),
                (target._sizeEn = 0),
                target.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    target.onAddToStage,
                    target
                ),
                target.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    target.onRemoveFromStage,
                    target
                ),
                target
            );
        }
        return (
            __extends(self, Base),
            (self.prototype.onAddToStage = function() {
                this.onLangChange();
                this.actionListenerId = state.LocalizeStore.instance.addActionListener(
                    state.q,
                    this.onLangChange,
                    this
                );
            }),
            (self.prototype.onRemoveFromStage = function() {
                state.LocalizeStore.instance.removeActionListener(
                    this.actionListenerId
                );
            }),
            (self.prototype.onLangChange = function() {
                if (this.localeFunc) {
                    this.text = this.localeFunc();
                } else {
                    if (this.localeKey) {
                        this.text = state.LocalizeStore.instance.translate(
                            this.localeKey
                        );
                    }
                }
                this.updateSize(state.LocalizeStore.instance.lang);
            }),
            (self.prototype.updateSize = function(p) {
                if (p == state.LANG_EN && 0 != this._sizeEn) {
                    this.size = this._sizeEn;
                } else {
                    if (0 != this._sizeNormal) {
                        this.size = this._sizeNormal;
                    }
                }
            }),
            Object.defineProperty(self.prototype, 'sizeNormal', {
                get: function() {
                    return this._sizeNormal;
                },
                set: function(num) {
                    /** @type {number} */
                    this._sizeNormal = num;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self.prototype, 'sizeEn', {
                get: function() {
                    return this._sizeEn;
                },
                set: function(num) {
                    /** @type {number} */
                    this._sizeEn = num;
                    if (0 == this._sizeNormal) {
                        this._sizeNormal = this.size;
                    }
                },
                enumerable: true,
                configurable: true
            }),
            (self.prototype.refresh = function() {
                this.onLangChange();
            }),
            Object.defineProperty(self.prototype, 'localeKey', {
                get: function() {
                    return this._localeKey;
                },
                set: function(num) {
                    /** @type {!Object} */
                    this._localeKey = num;
                    this.refresh();
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self.prototype, 'localeFunc', {
                get: function() {
                    return this._localeFunc;
                },
                set: function(num) {
                    /** @type {!Object} */
                    this._localeFunc = num;
                    this.refresh();
                },
                enumerable: true,
                configurable: true
            }),
            self
        );
    })(eui.Label);
    state.LocaleLabel = HTMLSectionBuilder;
    __reflect(HTMLSectionBuilder.prototype, 'Core.LocaleLabel');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(array) {
        /**
         * @param {?} key
         * @param {number} index
         * @return {?}
         */
        function result(key, index) {
            var config = array.call(this) || this;
            return (
                (config.localeKey = key),
                (config.index = index),
                (config.skinName = config.defaultSkinName),
                config
            );
        }
        return __extends(result, array), result;
    })(HTMLSectionBuilder.LocaleButton);
    HTMLSectionBuilder.PopupBtnBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.PopupBtnBase');
})(Core || (Core = {}));
!(function(params) {
    var t = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.onSocketData = function(
                message,
                data
            ) {}),
            (WorkerDomAdapter.prototype.enterGame = function(pool_size) {
                return pool_size.maintaining
                    ? void this.dispatchAction(params.Us)
                    : (params.LoginStore.instance.isReady ||
                          this.dispatchAction(params.Fs),
                      !pool_size.allowDemo &&
                          params.LoginStore.instance.isDemoAc &&
                          this.dispatchAction(params.Ks),
                      void this.enterGameByModule(pool_size));
            }),
            (WorkerDomAdapter.prototype.enterGameByModule = function(prop) {
                params.ModuleNavigator.instance.changeModule(
                    prop.moduleName,
                    prop,
                    true
                );
            }),
            WorkerDomAdapter
        );
    })(params.NetworkStoreBase);
    params.EnterGameStore = t;
    __reflect(t.prototype, 'Core.EnterGameStore');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function SurfaceShape() {
            /** @type {boolean} */
            this.isPrepared = false;
        }
        return (
            (SurfaceShape.prototype.prepareDataModel = function(
                clickRepeater,
                e,
                acc
            ) {
                /** @type {boolean} */
                this.isPrepared = true;
            }),
            (SurfaceShape.prototype.releaseDataModel = function() {
                /** @type {boolean} */
                this.isPrepared = false;
            }),
            (SurfaceShape.prototype.startModule = function(options) {}),
            (SurfaceShape.prototype.endModule = function(
                options,
                response,
                name
            ) {
                options.call(response, true, name);
            }),
            SurfaceShape
        );
    })();
    HTMLSectionBuilder.ModuleHandlerBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.ModuleHandlerBase');
})(Core || (Core = {}));
!(function(options) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.code = stream.readInt();
                    this.tokenBytes = new egret.ByteArray(
                        stream.buffer.slice(
                            stream.position,
                            stream.position + 16
                        )
                    );
                    /** @type {!Array} */
                    this.token = [];
                    this.token.push(stream.readDouble());
                    this.token.push(stream.readDouble());
                    this.svrTime = options.readInt64FromBytes(stream);
                    this.userFlag = stream.readInt();
                }),
                Object.defineProperty(Page.prototype, 'tokenString', {
                    get: function() {
                        if (2 != this.token.length) {
                            return null;
                        }
                        /** @type {string} */
                        var names = '';
                        /** @type {number} */
                        this.tokenBytes.position = 0;
                        /** @type {number} */
                        var e = 0;
                        for (; 16 > e; e++) {
                            /** @type {number} */
                            var default_favicon =
                                255 & this.tokenBytes.readByte();
                            /** @type {string} */
                            var a_embed =
                                '0' +
                                default_favicon.toString(16).toLowerCase();
                            /** @type {string} */
                            names =
                                names + a_embed.substr(a_embed.length - 2, 2);
                        }
                        return names;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Page
            );
        })(HTMLSectionBuilder.ResponseBase);
        HTMLSectionBuilder.Ln = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ClientLoginResp');
    })((t = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.show = function(n) {
                return (
                    n && (this.parentPage = n),
                    this.parentPage
                        ? void (
                              this.parent ||
                              this.parentPage.addPopup(this, true)
                          )
                        : void console.error('Need assign a parent page first')
                );
            }),
            (WorkerDomAdapter.prototype.hide = function() {
                if (this.parentPage) {
                    this.parentPage.removePopup(this, true, false);
                }
            }),
            (WorkerDomAdapter.prototype.onReleaseRefs = function() {
                /** @type {null} */
                this.parentPage = null;
            }),
            WorkerDomAdapter
        );
    })(eui.Component);
    HTMLSectionBuilder.LoadingViewBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.LoadingViewBase');
})(Core || (Core = {}));
!(function(exports) {
    var Resolute = (function(Model) {
        /**
         * @return {?}
         */
        function List() {
            var input =
                (null !== Model && Model.apply(this, arguments)) || this;
            return (input.dataList = []), input;
        }
        return (
            __extends(List, Model),
            (List.prototype.set = function(key, value) {
                var didExist = this.has(key);
                if ((Model.prototype.set.call(this, key, value), didExist)) {
                    var index = this.keys.indexOf(key);
                    this.dataList.splice(index, 1, {
                        key: key,
                        value: value
                    });
                } else {
                    this.dataList.push({
                        key: key,
                        value: value
                    });
                }
                return this;
            }),
            (List.prototype['delete'] = function(name) {
                Model.prototype['delete'].call(this, name);
                /** @type {number} */
                var i = 0;
                for (; i < this.dataList.length; i++) {
                    if (this.dataList[i].key === name) {
                        return this.dataList.splice(i, 1), this;
                    }
                }
                return this;
            }),
            (List.prototype.copy = function(inputdir) {
                return Model.prototype.copy.call(this, inputdir);
            }),
            Object.defineProperty(List.prototype, 'lastValue', {
                get: function() {
                    return this.dataList.length <= 0
                        ? null
                        : this.values[this.values.length - 1];
                },
                enumerable: true,
                configurable: true
            }),
            (List.prototype.sortData = function() {
                var subDef = this;
                /** @type {!Array} */
                this.cacheKeys = [];
                /** @type {!Array} */
                this.cacheValues = [];
                this.dataList.forEach(function(t) {
                    subDef.cacheKeys.push(t.key);
                    subDef.cacheValues.push(t.value);
                }, this);
                /** @type {boolean} */
                this.cached = true;
            }),
            (List.prototype.toJSON = function() {
                return this.dataList;
            }),
            (List.prototype.setupByData = function(nodeEvents) {
                /** @type {number} */
                var e = 0;
                for (; e < nodeEvents.length; e++) {
                    var event = nodeEvents[e];
                    this.set(event.key, event.value);
                }
            }),
            List
        );
    })(exports.HashMap);
    exports.ArrayMap = Resolute;
    __reflect(Resolute.prototype, 'Core.ArrayMap');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Drag) {
        /**
         * @param {!Element} id
         * @return {?}
         */
        function View(id) {
            var o = Drag.call(this) || this;
            return (o.container = id), o;
        }
        return (
            __extends(View, Drag),
            (View.prototype.getStoreList = function() {
                return [];
            }),
            (View.prototype.onTouchMove = function(event) {
                Drag.prototype.onTouchMove.call(this, event);
                this.containerCheck();
            }),
            (View.prototype.onTouchEnd = function(event) {
                Drag.prototype.onTouchEnd.call(this, event);
                this.containerCheck();
            }),
            (View.prototype.containerCheck = function() {
                if (this.x < 0) {
                    /** @type {number} */
                    this.x = 0;
                }
                if (this.x + this.width > this.container.width) {
                    /** @type {number} */
                    this.x = this.container.width - this.width;
                }
                if (this.y < 0) {
                    /** @type {number} */
                    this.y = 0;
                }
                if (this.y + this.height > this.container.height) {
                    /** @type {number} */
                    this.y = this.container.height - this.height;
                }
            }),
            View
        );
    })(eui.Panel);
    HTMLSectionBuilder.MoveInContainerPanel = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.MoveInContainerPanel');
})(Core || (Core = {}));
!(function(aurelia_dependency_injection_1) {
    var HTMLSection = (function(Base) {
        /**
         * @param {string} data
         * @return {?}
         */
        function App(data) {
            var d = Base.call(this) || this;
            return (
                (d.viewHorizontalCenter = 0),
                (d.viewVerticalCenter = 0),
                (d.touchEnabled = false),
                (d.parentPage = data),
                (d.notifyDataQueue = []),
                d
            );
        }
        return (
            __extends(App, Base),
            (App.prototype.hasMsgKey = function(real) {
                /** @type {boolean} */
                var withRealValue = this.labelDisplay.localeKey == real;
                if (!withRealValue) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.notifyDataQueue.length; i++) {
                        if (
                            null != this.notifyDataQueue[i].msgKey &&
                            this.notifyDataQueue[i].msgKey == real
                        ) {
                            /** @type {boolean} */
                            withRealValue = true;
                            break;
                        }
                    }
                }
                return withRealValue;
            }),
            (App.prototype.hasMsg = function(name) {
                /** @type {boolean} */
                var nameLooksRight = this.labelDisplay.text == name;
                if (!nameLooksRight) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.notifyDataQueue.length; i++) {
                        if (
                            null != this.notifyDataQueue[i].msg &&
                            this.notifyDataQueue[i].msg == name
                        ) {
                            /** @type {boolean} */
                            nameLooksRight = true;
                            break;
                        }
                    }
                }
                return nameLooksRight;
            }),
            (App.prototype.hasTimeout = function(id) {
                /** @type {boolean} */
                var xInvert = false;
                return (
                    aurelia_dependency_injection_1.NonstopTimer.instance.hasTimeout(
                        this.timeoutId
                    ) && (this.notifyDataQueue.push(id), (xInvert = true)),
                    xInvert
                );
            }),
            (App.prototype.show = function(callback) {
                if (!this.parent) {
                    this.parentPage.addPopup(
                        this,
                        false,
                        this.viewHorizontalCenter,
                        this.viewVerticalCenter
                    );
                }
                this.timeoutId = aurelia_dependency_injection_1.NonstopTimer.instance.setTimeout(
                    this.notifyTimeoutDo,
                    this,
                    callback
                );
            }),
            (App.prototype.showMsgKey = function(value, str) {
                if (void 0 === str) {
                    /** @type {number} */
                    str = 2e3;
                }
                if (
                    !(
                        this.hasMsgKey(value) ||
                        this.hasTimeout({
                            msgKey: value,
                            long: str
                        })
                    )
                ) {
                    this.showErrCode();
                    this.labelDisplay.localeKey = value;
                    this.show(str);
                }
            }),
            (App.prototype.showMsg = function(m, str) {
                if (void 0 === str) {
                    /** @type {number} */
                    str = 2e3;
                }
                if (
                    !(
                        this.hasMsg(m) ||
                        this.hasTimeout({
                            msg: m,
                            long: str
                        })
                    )
                ) {
                    this.showErrCode();
                    /** @type {!Object} */
                    this.labelDisplay.localeKey = m;
                    this.show(str);
                }
            }),
            (App.prototype.showErrCode = function(Element) {
                if ((void 0 === Element && (Element = 0), this.labelErrCode)) {
                    /** @type {string} */
                    var srcTxt = '';
                    if (Element) {
                        srcTxt = aurelia_dependency_injection_1.getErrorCodeStr(
                            Element
                        );
                    }
                    this.labelErrCode.text = srcTxt;
                }
            }),
            (App.prototype.clearMsgQueue = function() {
                this.hide();
                aurelia_dependency_injection_1.NonstopTimer.instance.clearTimeout(
                    this.timeoutId
                );
                /** @type {!Array} */
                this.notifyDataQueue = [];
            }),
            (App.prototype.notifyTimeoutDo = function() {
                aurelia_dependency_injection_1.NonstopTimer.instance.clearTimeout(
                    this.timeoutId
                );
                this.clearText();
                this.hide();
                if (this.notifyDataQueue.length > 0) {
                    this.showNext();
                }
            }),
            (App.prototype.showNext = function() {
                var params = this.notifyDataQueue.shift();
                if (null != params.msgKey) {
                    this.showMsgKey(params.msgKey, params['long']);
                } else {
                    this.showMsg(params.msg, params['long']);
                }
            }),
            (App.prototype.hide = function() {
                if (this.parentPage) {
                    this.parentPage.removePopup(this, false, false);
                }
            }),
            (App.prototype.clearText = function() {
                this.showErrCode();
                /** @type {string} */
                this.labelDisplay.localeKey = '';
                /** @type {string} */
                this.labelDisplay.text = '';
            }),
            (App.prototype.onReleaseRefs = function() {
                /** @type {null} */
                this.parentPage = null;
            }),
            App
        );
    })(eui.Component);
    aurelia_dependency_injection_1.NotifyViewBase = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.NotifyViewBase');
})(Core || (Core = {}));
var GameBull;
var GameComp;
var GameLive;
var PCEvent;
var GameBj;
!(function(ScriptConfig_1) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @param {!Object} output
             * @return {undefined}
             */
            function walkArgs(output) {
                this.name = output.attr('name');
                this.staticDomainList = output.listAttr('staticDomain');
            }
            return walkArgs;
        })();
        HTMLSectionBuilder.SpecialUserInfo = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.SpecialUserInfo');
    })((e = ScriptConfig_1.Config || (ScriptConfig_1.Config = {})));
})(Core || (Core = {}));
var GameCbac;
var GameCommon;
!(function(result) {
    var t;
    !(function(scope) {
        var GridStack = (function(Base) {
            /**
             * @param {!Object} name
             * @return {?}
             */
            function t(name) {
                var conf = Base.call(this, name) || this;
                return (
                    conf.readGameInfo(name),
                    name
                        .find(result.ExternalData.device.toLowerCase())
                        .forEach(conf.readGameInfo, conf),
                    conf
                );
            }
            return (
                __extends(t, Base),
                (t.prototype.readGameInfo = function(target) {
                    Base.prototype.readGameInfo.call(this, target);
                    this.loginType = target.attr('loginType');
                }),
                t
            );
        })(scope.GameInfo);
        scope.ThirdGameInfo = GridStack;
        __reflect(GridStack.prototype, 'Core.Config.ThirdGameInfo');
    })((t = result.Config || (result.Config = {})));
})(Core || (Core = {}));
var GameDt;
var GameLed;
var GameLink;
!(function(ScriptConfig_1) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @param {!Object} options
             * @return {undefined}
             */
            function Manifest(options) {
                this.id = options.attr('id');
                this.version = options.intAttr('version', 0);
                this.path = options.attr('path');
                this.cacheEnabled = options.boolAttr('cacheEnabled');
            }
            return Manifest;
        })();
        HTMLSectionBuilder.VersionInfo = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.VersionInfo');
    })((e = ScriptConfig_1.Config || (ScriptConfig_1.Config = {})));
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function self() {}
        return (
            (self.prototype.getAsset = function(res, path, url) {
                /**
                 * @param {?} key
                 * @return {undefined}
                 */
                function onload(key) {
                    path.call(url, key, res);
                }
                if (RES.hasRes(res)) {
                    var img = RES.getRes(res);
                    if (img) {
                        onload(img);
                    } else {
                        RES.getResAsync(res, onload, this);
                    }
                } else {
                    RES.getResByUrl(
                        res,
                        onload,
                        this,
                        RES.ResourceItem.TYPE_IMAGE
                    );
                }
            }),
            self
        );
    })();
    HTMLSectionBuilder.AssetAdapter = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.AssetAdapter', [
        'eui.IAssetAdapter'
    ]);
})(Core || (Core = {}));
!(function(state) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function init() {
            var obj = Base.call(this) || this;
            return (
                (obj._localeName = ''),
                (obj._localeGroup = ''),
                (obj.postfix = ''),
                (obj.localeFunc = null),
                obj.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    obj.onAddToStage,
                    obj
                ),
                obj.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    obj.onRemoveFromStage,
                    obj
                ),
                obj
            );
        }
        return (
            __extends(init, Base),
            (init.prototype.onAddToStage = function() {
                this.onLangChange();
                this.actionListenerId = state.LocalizeStore.instance.addActionListener(
                    state.q,
                    this.onLangChange,
                    this
                );
            }),
            (init.prototype.onRemoveFromStage = function() {
                state.LocalizeStore.instance.removeActionListener(
                    this.actionListenerId
                );
            }),
            (init.prototype.onLangChange = function() {
                if (this.localeFunc) {
                    this.source = this.localeFunc();
                } else {
                    if (this.localeName) {
                        if (this.localeGroup) {
                            this.source = state.LocalizeStore.instance.translateRes(
                                this.localeName,
                                this.postfix,
                                this.localeGroup
                            );
                        } else {
                            this.source = state.LocalizeStore.instance.translateRes(
                                this.localeName,
                                this.postfix
                            );
                        }
                    }
                }
            }),
            Object.defineProperty(init.prototype, 'localeName', {
                get: function() {
                    return this._localeName;
                },
                set: function(num) {
                    /** @type {!Object} */
                    this._localeName = num;
                    this.refresh();
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(init.prototype, 'localeGroup', {
                get: function() {
                    return this._localeGroup;
                },
                set: function(num) {
                    /** @type {!Object} */
                    this._localeGroup = num;
                    this.refresh();
                },
                enumerable: true,
                configurable: true
            }),
            (init.prototype.refresh = function() {
                this.onLangChange();
            }),
            init
        );
    })(eui.Image);
    state.LocaleImage = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.LocaleImage');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function Minder() {}
        return (
            (Minder.prototype.getTheme = function(
                res,
                callback,
                errorCallback,
                ex
            ) {
                /**
                 * @param {?} args
                 * @return {undefined}
                 */
                function args(args) {
                    callback.call(ex, args);
                }
                /**
                 * @param {?} section
                 * @return {undefined}
                 */
                function n(section) {
                    if (section.resItem.url == res) {
                        RES.removeEventListener(
                            RES.ResourceEvent.ITEM_LOAD_ERROR,
                            n,
                            null
                        );
                        errorCallback.call(ex);
                    }
                }
                RES.addEventListener(
                    RES.ResourceEvent.ITEM_LOAD_ERROR,
                    n,
                    null
                );
                RES.getResByUrl(res, args, this, RES.ResourceItem.TYPE_TEXT);
            }),
            Minder
        );
    })();
    HTMLSectionBuilder.ThemeAdapter = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.ThemeAdapter', [
        'eui.IThemeAdapter'
    ]);
})(Core || (Core = {}));
var GameRou;
var GameSbac;
var GameShb;
var GameThird;
var GameZjh;
!(function(self) {
    var t = (function(Base) {
        /**
         * @return {?}
         */
        function exports() {
            var state = Base.call(this) || this;
            var e = new self.HashMap();
            return (
                self.LANG_CANDIDATE_LIST.forEach(function(element) {
                    e.set(element, new self.HashMap());
                }),
                (state.dictMap = e),
                state
            );
        }
        return (
            __extends(exports, Base),
            Object.defineProperty(exports, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (exports.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(exports.prototype, 'lang', {
                get: function() {
                    if (this.forceLang) {
                        return this.forceLang;
                    }
                    if (this._lang) {
                        return this._lang;
                    }
                    var syntax = self.StorageManager.instance.getItem(
                        self.LOCALKEY_LANG
                    );
                    var lang = self.ExternalData.lang;
                    return (
                        self.LANG_CANDIDATE_LIST.indexOf(syntax) >= 0
                            ? (this._lang = syntax)
                            : self.LANG_CANDIDATE_LIST.indexOf(lang) >= 0
                                ? (this._lang = lang)
                                : (this._lang = self.LANG_DEFAULT),
                        this._lang
                    );
                },
                set: function(name) {
                    if (self.LANG_CANDIDATE_LIST.indexOf(name) < 0) {
                        console.warn('language ' + name + ' not support');
                    }
                    /** @type {boolean} */
                    var username_match = this._lang === name;
                    /** @type {string} */
                    this._lang = name;
                    if (!username_match) {
                        this.dispatchAction(self.q);
                    }
                    self.StorageManager.instance.setItem(
                        self.LOCALKEY_LANG,
                        name
                    );
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(exports.prototype, 'SWLang', {
                get: function() {
                    var lang = self.LocalizeStore.instance.lang;
                    switch (lang) {
                        case self.LANG_HANS:
                            return 'zh';
                        case self.LANG_HANT:
                            return 'tr';
                        case self.LANG_TH:
                            return 'th';
                        case self.LANG_JA:
                            return 'ja';
                        case self.LANG_ID:
                            return 'id';
                        default:
                            return 'en';
                    }
                },
                enumerable: true,
                configurable: true
            }),
            (exports.prototype.translate = function(t) {
                return this.findEntryByKey(t, this.lang);
            }),
            (exports.prototype.substitute = function(template) {
                /** @type {!Array} */
                var params = [];
                /** @type {number} */
                var i = 1;
                for (; i < arguments.length; i++) {
                    params[i - 1] = arguments[i];
                }
                var result = this.translate(template);
                /** @type {number} */
                var k = 0;
                for (; k < params.length; k++) {
                    result = result.replace(
                        new RegExp('%' + k, 'g'),
                        params[k]
                    );
                }
                return result;
            }),
            (exports.prototype.translateRes = function(res, key, prev) {
                if (void 0 === key) {
                    /** @type {string} */
                    key = '';
                }
                if (void 0 === prev) {
                    /** @type {string} */
                    prev = '';
                }
                /** @type {string} */
                var p = prev
                    ? prev +
                      '_' +
                      exports.instance.lang +
                      '_json.' +
                      res +
                      '_' +
                      this.lang +
                      key
                    : res + '_' + this.lang + key;
                return RES.hasRes(p)
                    ? p
                    : prev
                        ? prev +
                          '_' +
                          exports.instance.lang +
                          '_json.' +
                          res +
                          '_' +
                          self.LANG_BACKUP +
                          key
                        : res + '_' + self.LANG_BACKUP + key;
            }),
            Object.defineProperty(exports.prototype, 'forceLang', {
                get: function() {
                    return this._forceLang;
                },
                set: function(obj) {
                    if (obj && self.LANG_CANDIDATE_LIST.indexOf(obj) < 0) {
                        console.warn('language ' + obj + ' not support');
                    }
                    /** @type {!Object} */
                    this._forceLang = obj;
                },
                enumerable: true,
                configurable: true
            }),
            (exports.prototype.saveLocalizeRes = function(key, prop, msg) {
                this.dictMap.get(prop).set(key, JSON.parse(msg));
            }),
            (exports.prototype.findEntryByKey = function(img, name) {
                var a = img.split('.');
                var r = this.dictMap.get(name);
                r = r.get(a[0]);
                /** @type {number} */
                var i = 1;
                for (; i < a.length && r; i++) {
                    r = r[a[i]];
                }
                return r
                    ? r
                    : name != self.LANG_BACKUP
                        ? this.findEntryByKey(img, self.LANG_BACKUP)
                        : img;
            }),
            exports
        );
    })(self.StoreBase);
    self.LocalizeStore = t;
    __reflect(t.prototype, 'Core.LocalizeStore');
})(Core || (Core = {}));
!(function(evt) {
    var data = (function(Base) {
        /**
         * @param {!Object} key
         * @param {number} value
         * @param {number} index
         * @return {?}
         */
        function init(key, value, index) {
            if (void 0 === value) {
                /** @type {string} */
                value = 'Default';
            }
            if (void 0 === index) {
                /** @type {number} */
                index = 0;
            }
            var r = Base.call(this) || this;
            return (
                (r.grpNameList = key),
                (r.tag = value),
                (r.priority = index),
                (r.completed = false),
                (r.loadingMap = new evt.HashMap()),
                (r.progressMap = new evt.HashMap()),
                r
            );
        }
        return (
            __extends(init, Base),
            Object.defineProperty(init.prototype, 'isLoading', {
                get: function() {
                    return this.loadingMap.keys.length > 0;
                },
                enumerable: true,
                configurable: true
            }),
            (init.prototype.startLoad = function() {
                var entryarray = this;
                if (!this.isLoading && !this.completed) {
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
                            ((this.completed = true),
                            this.dispatchEventWith(
                                evt.EVENT_COMPLETE,
                                false,
                                this.tag
                            )),
                        this.loadingMap.keys.forEach(function(res) {
                            RES.loadGroup(res, entryarray.priority);
                        }, this),
                        this
                    );
                }
            }),
            (init.prototype.appendGroup = function(name) {
                var self = this;
                name.forEach(function(t) {
                    if (self.grpNameList.indexOf(t) < 0) {
                        self.grpNameList.push(t);
                        self.setupGroup(t);
                    }
                }, this);
                name.forEach(function(res) {
                    RES.loadGroup(res, self.priority);
                }, this);
            }),
            (init.prototype.isGrpLoading = function(fixture) {
                return this.loadingMap.has(fixture);
            }),
            (init.prototype.setupGroup = function(res) {
                var readersLength = RES.getGroupByName(res).length;
                if (!(0 >= readersLength || RES.isGroupLoaded(res))) {
                    this.loadingMap.set(res, true);
                    this.progressMap.set(res, {
                        itemsLoaded: 0,
                        itemTotal: readersLength
                    });
                }
            }),
            (init.prototype.onResourceLoadComplete = function(a) {
                if (this.loadingMap.has(a.groupName)) {
                    this.loadingMap['delete'](a.groupName);
                    dclib('Group ' + a.groupName + ' has been loaded!');
                    if (this.loadingMap.keys.length <= 0) {
                        RES.removeEventListener(
                            RES.ResourceEvent.GROUP_COMPLETE,
                            this.onResourceLoadComplete,
                            this
                        );
                        RES.removeEventListener(
                            RES.ResourceEvent.GROUP_LOAD_ERROR,
                            this.onResourceLoadError,
                            this
                        );
                        RES.removeEventListener(
                            RES.ResourceEvent.GROUP_PROGRESS,
                            this.onResourceProgress,
                            this
                        );
                        RES.removeEventListener(
                            RES.ResourceEvent.ITEM_LOAD_ERROR,
                            this.onItemLoadError,
                            this
                        );
                        /** @type {boolean} */
                        this.completed = true;
                        this.dispatchEventWith(
                            evt.EVENT_COMPLETE,
                            false,
                            this.tag
                        );
                    }
                }
            }),
            (init.prototype.onItemLoadError = function(section) {
                if (!(this.grpNameList.indexOf(section.groupName) < 0)) {
                    console.warn(
                        'Url:' + section.resItem.url + ' has failed to load',
                        section
                    );
                }
            }),
            (init.prototype.onResourceLoadError = function(params) {
                if (!(this.grpNameList.indexOf(params.groupName) < 0)) {
                    console.warn(
                        'Group:' + params.groupName + ' has failed to load'
                    );
                    this.onResourceLoadComplete(params);
                }
            }),
            (init.prototype.onResourceProgress = function(data) {
                if (!(this.grpNameList.indexOf(data.groupName) < 0)) {
                    var SonosWeb = this.progressMap.get(data.groupName);
                    if (SonosWeb) {
                        SonosWeb.itemsLoaded = data.itemsLoaded;
                        ExternalProgress('onprogress', this.getProgress());
                        this.dispatchEventWith(
                            evt.EVENT_PROGRESS,
                            false,
                            this.getProgress()
                        );
                    }
                }
            }),
            (init.prototype.getProgress = function() {
                /** @type {number} */
                var delta = 0;
                /** @type {number} */
                var sDivisor = 0;
                return (
                    this.progressMap.forEach(function(array) {
                        delta = delta + array.itemsLoaded;
                        sDivisor = sDivisor + array.itemTotal;
                    }, this),
                    0 === sDivisor ? 1 : delta / sDivisor
                );
            }),
            init
        );
    })(egret.EventDispatcher);
    evt.GroupBundleLoader = data;
    __reflect(data.prototype, 'Core.GroupBundleLoader');
})(Core || (Core = {}));
!(function(data) {
    /** @type {number} */
    data.CDN_TIMEOUT = 8e3;
    /** @type {string} */
    data.DEV_PC = 'PC';
    /** @type {string} */
    data.DEV_MOBILE = 'MOBILE';
    /** @type {string} */
    data.ENV_QA = 'QA';
    /** @type {string} */
    data.ENV_UAT = 'UAT';
    /** @type {string} */
    data.ENV_PROD = 'PROD';
    /** @type {string} */
    data.ORI_PORTRAIT = 'portrait';
    /** @type {string} */
    data.ORI_LANDSCAPE = 'landscape';
    /** @type {string} */
    data.LANG_HANS = 'hans';
    /** @type {string} */
    data.LANG_HANT = 'hant';
    /** @type {string} */
    data.LANG_EN = 'en';
    /** @type {string} */
    data.LANG_JA = 'ja';
    /** @type {string} */
    data.LANG_TH = 'th';
    /** @type {string} */
    data.LANG_KO = 'ko';
    /** @type {string} */
    data.LANG_ID = 'id';
    /** @type {string} */
    data.LANG_VI = 'vi';
    /** @type {string} */
    data.LANG_KM = 'km';
    /** @type {string} */
    data.LANG_PT = 'pt';
    /** @type {!Array} */
    data.LANG_CANDIDATE_LIST = [
        data.LANG_HANS,
        data.LANG_HANT,
        data.LANG_EN,
        data.LANG_KO,
        data.LANG_JA,
        data.LANG_TH,
        data.LANG_ID,
        data.LANG_VI,
        data.LANG_KM,
        data.LANG_PT
    ];
    /** @type {!Array} */
    data.LANG_SOUND_SUPPORTED = [
        data.LANG_HANS,
        data.LANG_HANT,
        data.LANG_EN,
        data.LANG_KO,
        data.LANG_JA
    ];
    /** @type {string} */
    data.LANG_DEFAULT = data.LANG_EN;
    /** @type {string} */
    data.LANG_BACKUP = data.LANG_EN;
    /** @type {string} */
    data.LANG_CNS_XML = 'lang_cns';
    /** @type {string} */
    data.LANG_CNR_XML = 'lang_cnr';
    /** @type {string} */
    data.LANG_EN_XML = 'lang_english';
    /** @type {string} */
    data.LANG_ZH_CONF = 'ZH';
    /** @type {string} */
    data.LANG_TR_CONF = 'TR';
    /** @type {string} */
    data.LANG_EN_CONF = 'EN';
    /** @type {string} */
    data.LANG_JP_CONF = 'JP';
    /** @type {string} */
    data.LANG_KR_CONF = 'KR';
    /** @type {string} */
    data.LANG_TH_CONF = 'TH';
    /** @type {string} */
    data.LANG_VT_CONF = 'VT';
    /** @type {string} */
    data.LANG_ID_CONF = 'ID';
    /** @type {string} */
    data.LANG_KM_CONF = 'KM';
    /** @type {string} */
    data.LANG_PT_CONF = 'PT';
    /** @type {string} */
    data.LANG_ANY_CONF = '*';
    /** @type {string} */
    data.LOGIN_TYPE_NORMAL = 'normal';
    /** @type {string} */
    data.LOGIN_TYPE_XIN = 'xin';
    /** @type {string} */
    data.LOGIN_TYPE_AIRLOGIN = 'airlogin';
    /** @type {string} */
    data.LOGIN_TYPE_EXWALLET = 'exwallet';
    /** @type {string} */
    data.LOGIN_TYPE_WALLET = 'wallet';
    /** @type {string} */
    data.LOGIN_TYPE_REDIRECT = 'redirect';
    /** @type {string} */
    data.LOGIN_TYPE_LINK = 'link';
    /** @type {string} */
    data.CHANNEL_TAG_BGM = '[BGM]';
    /** @type {string} */
    data.CHANNEL_TAG_GAME = '[GAME]';
    /** @type {string} */
    data.CHANNEL_TAG_LIVE = '[LIVE]';
    /** @type {string} */
    data.CHANNEL_TAG_DEFAULT = '[DEFAULT]';
    /** @type {string} */
    data.CHANNEL_TAG_EFFECT = '[EFFECT]';
    /** @type {string} */
    data.EVENT_COMPLETE = 'EVENT_COMPLETE';
    /** @type {string} */
    data.EVENT_PROGRESS = 'EVENT_PROGRESS';
    /** @type {string} */
    data.EVENT_RELEASE = 'EVENT_RELEASE';
    /** @type {string} */
    data.TAG_SILENT_LOADER = 'TAG_SILENT_LOADER';
    /** @type {string} */
    data.TAG_URGENT_LOADER = 'TAG_URGENT_LOADER';
    /** @type {string} */
    data.t = 'ACTION_INIT';
    /** @type {string} */
    data.eu = 'ACTION_INIT_CHILDREN';
    /** @type {string} */
    data.q = 'ACTION_LANG_CHANGE';
    /** @type {string} */
    data.$h = 'ACTION_LOGIN_FAILD';
    /** @type {string} */
    data.Wh = 'ACTION_LOGIN_SUCCESS';
    /** @type {string} */
    data.Qh = 'ACTION_LOGIN_PWD_INVALID';
    /** @type {string} */
    data.Xh = 'ACTION_LOGIN_USER_INVALID';
    /** @type {string} */
    data.iu = 'ACTION_ENTER_SUCCESS';
    /** @type {string} */
    data.Us = 'ACTION_ENTER_MAINTAIN';
    /** @type {string} */
    data.Fs = 'ACTION_ENTER_NEED_LOGIN';
    /** @type {string} */
    data.Ks = 'ACTION_ENTER_NO_DEMO';
    /** @type {string} */
    data.ru = 'ACTION_ENTER_CURR_UNSUPPORT';
    /** @type {string} */
    data.Ko = 'ACTION_ADD_TOP_POPUP';
    /** @type {string} */
    data.Uo = 'ACTION_ADD_TOP_POPUP_PARAM';
    /** @type {string} */
    data.Ge = 'ACTION_REMOVE_TOP_POPUP';
    /** @type {string} */
    data.Zo = 'ACTION_CLEAR_TOP_POPUP';
    /** @type {string} */
    data.su = 'ACTION_CHANGE_LANG_LOAD';
    /** @type {string} */
    data.No = 'ACTION_CHANGE_GAME_CHECK';
    /** @type {string} */
    data.Do = 'ACTION_SAVE_CHANGE_GAME_INFO';
    /** @type {string} */
    data.nu = 'ACTION_ADD_BET_HISTORY_POPUP';
    /** @type {string} */
    data.ou = 'ACTION_REMOVE_BET_HISTORY_POPUP';
    /** @type {string} */
    data.au = 'ACTION_BET_HISTORY_NEXT_PAGE';
    /** @type {string} */
    data.hu = 'ACTION_BET_HISTORY_PREVIOUS_PAGE';
    /** @type {string} */
    data.uu = 'ACTION_GET_BET_HISTORY_RECORDS_BY_DATE';
    /** @type {string} */
    data.cu = 'ACTION_SHOW_ROU_FRENCH_BET_PANEL';
    /** @type {string} */
    data.fu = 'ACTION_HIDE_ROU_FRENCH_BET_PANEL';
    /** @type {string} */
    data.Cu = 'ACTION_SHOW_MY_BETS_PANEL';
    /** @type {string} */
    data.lu = 'ACTION_HIDE_MY_BETS_PANEL';
    /** @type {string} */
    data.mu = 'ACTION_POP_VIDEO_ROU';
    /** @type {string} */
    data.du = 'ACTION_CLOSE_VIDEO_ROU';
    /** @type {string} */
    data.vu = 'ACTION_LOGIN_LIVE_PLATFORM_SESSION_SUCCESS';
    /** @type {string} */
    data.l = 'ACTION_SOCKET_WRITE_FAIL';
    /** @type {number} */
    data.CHAT_LOGIN_TYPE = 5;
    /** @type {string} */
    data.CHAT_PLAZA_LOGIN_VID = 'ALL';
    /** @type {string} */
    data.LOCALKEY_LANG = 'LOCALKEY_LANG';
    /** @type {string} */
    data.LOCALKEY_LANG_SOUND = 'LOCALKEY_LANG_SOUND';
    /** @type {string} */
    data.LOCALKEY_BGM_SOUND = 'LOCALKEY_BGM_SOUND';
    /** @type {string} */
    data.LOCALKEY_EGAME_SOUND = 'LOCALKEY_EGAME_SOUND';
    /** @type {string} */
    data.LOCALKEY_LIVE_SOUND = 'LOCALKEY_LIVE_SOUND';
    /** @type {string} */
    data.LOCALKEY_VIDEO_AUTO_CHANGE = 'LOCALKEY_VIDEO_AUTO_CHANGE';
    /** @type {string} */
    data.LOCALKEY_BGM_VOLUME = 'LOCALKEY_BGM_VOLUME';
    /** @type {string} */
    data.LOCALKEY_SOUND_VOLUME = 'LOCALKEY_SOUND_VOLUME';
    /** @type {string} */
    data.LOCALKEY_GAME_VOLUME = 'LOCALKEY_GAME_VOLUME';
    /** @type {string} */
    data.LOCALKEY_LIVE_VOLUME = 'LOCALKEY_LIVE_VOLUME';
    /** @type {string} */
    data.Gu = 'ACTION_EU_TWEEN_COMPLETE';
    /** @type {number} */
    data.gn = 0;
    /** @type {number} */
    data.Bn = 63;
    /** @type {number} */
    data._u = 12;
    /** @type {number} */
    data.la = 30;
    /** @type {number} */
    data.ma = 16;
    /** @type {number} */
    data.bu = 100;
    /** @type {number} */
    data._n = 4;
    /** @type {number} */
    data.bn = 4;
    /** @type {number} */
    data.Pn = 14;
    /** @type {number} */
    data.va = 4;
    /** @type {number} */
    data.Fa = 6;
    /** @type {number} */
    data.Pu = 12;
    /** @type {number} */
    data.Vu = 8;
    /** @type {number} */
    data.gu = 8;
    /** @type {number} */
    data.pu = 6;
    /** @type {number} */
    data.ku = 16;
    /** @type {number} */
    data.wu = 30;
    /** @type {number} */
    data.zu = 50;
    /** @type {number} */
    data.dh = 19;
    /** @type {string} */
    data.Su = 'LINK';
})(Core || (Core = {}));
!(function(exports) {
    var Resolute = (function(Base) {
        /**
         * @return {?}
         */
        function Agent() {
            var result = (null !== Base && Base.apply(this, arguments)) || this;
            return (
                (result.recordStack = []), (result.readyToChange = true), result
            );
        }
        return (
            __extends(Agent, Base),
            Object.defineProperty(Agent, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (Agent.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(Agent.prototype, 'moduleInfoMap', {
                get: function() {
                    return this._moduleInfoMap;
                },
                set: function(arr) {
                    /** @type {!Object} */
                    this._moduleInfoMap = arr;
                    var paths = {};
                    var cache = {};
                    arr.forEach(function(options) {
                        paths[
                            options.name
                        ] = exports.AnalyzerUtils.getDomainList()
                            .map(function(dataDisplayName) {
                                return [
                                    dataDisplayName,
                                    exports.ExternalData.cdnConfig.subDomain,
                                    options.js
                                ].join('/');
                            })
                            .concat(['./' + options.js]);
                        cache[options.name] = {
                            exports: options.name,
                            deps: options.deps
                        };
                    }, this);
                    require.config({
                        paths: paths,
                        shim: cache,
                        waitSeconds: 0
                    });
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(Agent.prototype, 'currentModuleName', {
                get: function() {
                    return this.recordStack[this.recordStack.length - 1].name;
                },
                enumerable: true,
                configurable: true
            }),
            (Agent.prototype.changeModule = function(
                moveTo,
                dir,
                version,
                map,
                name
            ) {
                var result = this;
                if (
                    (void 0 === version && (version = false),
                    !this.readyToChange)
                ) {
                    return (
                        console.warn('Change module too fast'),
                        void (map && map.call(name, null))
                    );
                }
                if (!version && this.recordStack.length > 0) {
                    /** @type {boolean} */
                    this.readyToChange = false;
                    var func = this.recordStack[this.recordStack.length - 1];
                    this.closeModule(
                        func.name,
                        function(t) {
                            if (t) {
                                result.releaseModule(func.name);
                                result.recordStack.pop();
                                result.openModule(moveTo, dir, function() {
                                    if (map) {
                                        map.call(name, t);
                                    }
                                });
                            } else {
                                if (map) {
                                    map.call(name, t);
                                }
                            }
                        },
                        this
                    );
                } else {
                    this.openModule(moveTo, dir, function() {
                        if (map) {
                            map.call(name, true);
                        }
                    });
                }
            }),
            (Agent.prototype.popModule = function(
                action,
                options,
                blockArguments
            ) {
                var result = this;
                if (!this.readyToChange) {
                    return (
                        console.warn('Change module too fast'),
                        void (action && action.call(options, null))
                    );
                }
                if (this.recordStack.length > 0) {
                    /** @type {boolean} */
                    this.readyToChange = false;
                    var func = this.recordStack[this.recordStack.length - 1];
                    this.closeModule(
                        func.name,
                        function(begin) {
                            if (begin) {
                                result.releaseModule(func.name);
                                result.recordStack.pop();
                                if (result.recordStack.length <= 0) {
                                    exports.quit();
                                }
                            }
                            if (action) {
                                action.call(options, begin);
                            }
                        },
                        this,
                        blockArguments
                    );
                }
            }),
            (Agent.prototype.closeModule = function(
                url,
                webAuth,
                options,
                morph
            ) {
                var n = this;
                if (require.defined(url)) {
                    require([url], function(proto) {
                        proto.moduleHandler.endModule(
                            function(p1__3354_SHARP_) {
                                if (!p1__3354_SHARP_) {
                                    console.warn(
                                        'module ' + url + ' cannot close'
                                    );
                                }
                                /** @type {boolean} */
                                n.readyToChange = true;
                                webAuth.call(options, p1__3354_SHARP_);
                            },
                            options,
                            morph
                        );
                    });
                } else {
                    /** @type {boolean} */
                    this.readyToChange = true;
                }
            }),
            (Agent.prototype.releaseModule = function($http) {
                var e = this;
                var stories = this.getModuleDepsList($http);
                stories.forEach(function(options) {
                    if (
                        options.releaseType > 0 &&
                        require.defined(options.name)
                    ) {
                        require([options.name], function(proto) {
                            proto.moduleHandler.releaseDataModel();
                        });
                        if (2 === options.releaseType) {
                            e.getGrpNameListByModule(options.name).forEach(
                                function(res) {
                                    RES.destroyRes(res);
                                },
                                e
                            );
                        }
                    }
                }, this);
            }),
            (Agent.prototype.getGrpNameListByModule = function(css) {
                /** @type {!Array} */
                var figuresIds = [css];
                return (
                    exports.LANG_CANDIDATE_LIST.forEach(function(x) {
                        figuresIds.push(css + '_' + x);
                    }, this),
                    figuresIds
                );
            }),
            (Agent.prototype.openModule = function(modName, data, filterfunc) {
                var options = this;
                /** @type {!Array} */
                var e = [];
                var src = this.getModuleDepsList(modName);
                return src.length <= 0
                    ? void console.error(
                          'module ' +
                              modName +
                              ' not exist, check module_config!'
                      )
                    : (src.forEach(function(data) {
                          e.push(data.name);
                      }, this),
                      void require(e, function() {
                          /** @type {!Array} */
                          var m = [];
                          /** @type {number} */
                          var i = 0;
                          for (; i < arguments.length; i++) {
                              m[i] = arguments[i];
                          }
                          var proto = m[m.length - 1];
                          options.prepareModuleList(m, data, function() {
                              exports.ModuleResLoader.instance.loadResBundle(
                                  src,
                                  function() {
                                      filterfunc();
                                      proto.moduleHandler.startModule(data);
                                      options.recordStack.push({
                                          name: modName,
                                          params: data
                                      });
                                  }
                              );
                          });
                      }, function(_errorThrown) {
                          console.error(_errorThrown);
                      }));
            }),
            (Agent.prototype.getModuleDepsList = function(name) {
                /** @type {!Array} */
                var value = [];
                return this.analyseDependency(name, value), value;
            }),
            (Agent.prototype.analyseDependency = function(host, image) {
                var obj = this.moduleInfoMap.get(host);
                if (!obj) {
                    return void console.warn('Depend on module not exist');
                }
                var depNames = obj.deps;
                if (0 === depNames.length) {
                    return void image.push(obj);
                }
                /** @type {number} */
                var i = 0;
                for (; i < depNames.length; i++) {
                    this.analyseDependency(depNames[i], image);
                }
                image.push(obj);
            }),
            (Agent.prototype.prepareModuleList = function(s, v, message, x) {
                var ret = this;
                if ((void 0 === x && (x = 0), x >= s.length)) {
                    return void message.call(this);
                }
                var c = s[x].moduleHandler;
                if (c.isPrepared) {
                    this.prepareModuleList(s, v, message, x + 1);
                } else {
                    c.prepareDataModel(
                        function() {
                            ret.prepareModuleList(s, v, message, x + 1);
                        },
                        this,
                        v
                    );
                }
            }),
            (Agent.prototype.prepareLang = function(tab, withSnapshot) {
                var moduleTasks = this;
                /** @type {!Array} */
                var s = [];
                this.recordStack.forEach(function(module) {
                    var e = moduleTasks.getModuleDepsList(module.name);
                    s = s.concat(e);
                }, this);
                var n = new exports.HashMap();
                return (
                    s.forEach(function(oParentGroup) {
                        if (oParentGroup.grpName) {
                            if (withSnapshot) {
                                n.set(
                                    oParentGroup.grpName + '_sound_' + tab,
                                    true
                                );
                            } else {
                                n.set(oParentGroup.grpName + '_' + tab, true);
                            }
                        }
                    }, this),
                    exports.SilentLoadManager.instance.loadAtOnce(n.keys)
                );
            }),
            Agent
        );
    })(exports.SingletonDispatcher);
    exports.ModuleNavigator = Resolute;
    __reflect(Resolute.prototype, 'Core.ModuleNavigator');
})(Core || (Core = {}));
var qr;
!(function(QRCode) {
    var QRErrorCorrectLevel = (function() {
        /**
         * @param {!Object} data
         * @return {undefined}
         */
        function QR8bitByte(data) {
            this.mode = QRCode.QRMode.MODE_8BIT_BYTE;
            /** @type {!Object} */
            this.data = data;
            /** @type {!Array} */
            this.parsedData = [];
            /** @type {number} */
            var index = 0;
            var length = this.data.length;
            for (; length > index; index++) {
                /** @type {!Array} */
                var byteArray = [];
                var i = this.data.charCodeAt(index);
                if (i > 65536) {
                    /** @type {number} */
                    byteArray[0] = 240 | ((1835008 & i) >>> 18);
                    /** @type {number} */
                    byteArray[1] = 128 | ((258048 & i) >>> 12);
                    /** @type {number} */
                    byteArray[2] = 128 | ((4032 & i) >>> 6);
                    /** @type {number} */
                    byteArray[3] = 128 | (63 & i);
                } else {
                    if (i > 2048) {
                        /** @type {number} */
                        byteArray[0] = 224 | ((61440 & i) >>> 12);
                        /** @type {number} */
                        byteArray[1] = 128 | ((4032 & i) >>> 6);
                        /** @type {number} */
                        byteArray[2] = 128 | (63 & i);
                    } else {
                        if (i > 128) {
                            /** @type {number} */
                            byteArray[0] = 192 | ((1984 & i) >>> 6);
                            /** @type {number} */
                            byteArray[1] = 128 | (63 & i);
                        } else {
                            byteArray[0] = i;
                        }
                    }
                }
                this.parsedData.push(byteArray);
            }
            /** @type {!Array<?>} */
            this.parsedData = Array.prototype.concat.apply([], this.parsedData);
            if (this.parsedData.length != this.data.length) {
                this.parsedData.unshift(191);
                this.parsedData.unshift(187);
                this.parsedData.unshift(239);
            }
        }
        return (
            (QR8bitByte.prototype.getLength = function(withUnit) {
                return this.parsedData.length;
            }),
            (QR8bitByte.prototype.write = function(buffer) {
                /** @type {number} */
                var i = 0;
                var l = this.parsedData.length;
                for (; l > i; i++) {
                    buffer.put(this.parsedData[i], 8);
                }
            }),
            QR8bitByte
        );
    })();
    QRCode.QR8bitByte = QRErrorCorrectLevel;
    __reflect(QRErrorCorrectLevel.prototype, 'qr.QR8bitByte');
})(qr || (qr = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function QRBitBuffer() {
            /** @type {!Array} */
            this.buffer = [];
            /** @type {number} */
            this.length = 0;
        }
        return (
            (QRBitBuffer.prototype.get = function(key) {
                /** @type {number} */
                var index_original = Math.floor(key / 8);
                return (
                    1 == ((this.buffer[index_original] >>> (7 - (key % 8))) & 1)
                );
            }),
            (QRBitBuffer.prototype.put = function(pixel, e) {
                /** @type {number} */
                var bias = 0;
                for (; e > bias; bias++) {
                    this.putBit(1 == ((pixel >>> (e - bias - 1)) & 1));
                }
            }),
            (QRBitBuffer.prototype.getLengthInBits = function() {
                return this.length;
            }),
            (QRBitBuffer.prototype.putBit = function(bit) {
                /** @type {number} */
                var bufIndex = Math.floor(this.length / 8);
                if (this.buffer.length <= bufIndex) {
                    this.buffer.push(0);
                }
                if (bit) {
                    this.buffer[bufIndex] |= 128 >>> this.length % 8;
                }
                this.length++;
            }),
            QRBitBuffer
        );
    })();
    HTMLSectionBuilder.QRBitBuffer = HTMLSection;
    __reflect(HTMLSection.prototype, 'qr.QRBitBuffer');
})(qr || (qr = {}));
!(function(exports) {
    var QRCode = (function() {
        /**
         * @return {undefined}
         */
        function instance() {}
        return (
            (instance.create = function(key, s, e, rng, callback) {
                if (void 0 === s) {
                    /** @type {number} */
                    s = 200;
                }
                if (void 0 === e) {
                    /** @type {number} */
                    e = 200;
                }
                if (void 0 === rng) {
                    /** @type {number} */
                    rng = 0;
                }
                if (void 0 === callback) {
                    /** @type {number} */
                    callback = 2;
                }
                var options = {
                    width: s,
                    height: e,
                    correctLevel: exports.QRErrorCorrectLevel.H,
                    color: rng
                };
                var _this = new exports.QRCodeModel(
                    exports.QRUtil._getTypeNumber(key, options.correctLevel),
                    options.correctLevel
                );
                return (
                    _this.addData(key),
                    _this.make(),
                    instance.draw(_this, options)
                );
            }),
            (instance.draw = function(self, style) {
                var s = new egret.Sprite();
                /** @type {!Object} */
                style = style;
                var scale = self.getModuleCount();
                /** @type {number} */
                var w = Math.floor(style.width / scale);
                /** @type {number} */
                var lineHeight = Math.floor(style.height / scale);
                s.graphics.beginFill(style.color);
                /** @type {number} */
                var i = 0;
                for (; scale > i; i++) {
                    /** @type {number} */
                    var col = 0;
                    for (; scale > col; col++) {
                        var dayEl = self.isDark(i, col);
                        if (dayEl) {
                            s.graphics.drawRect(
                                col * w,
                                i * lineHeight,
                                w,
                                lineHeight
                            );
                        }
                    }
                }
                return s.graphics.endFill(), s;
            }),
            instance
        );
    })();
    exports.QRCode = QRCode;
    __reflect(QRCode.prototype, 'qr.QRCode');
})(qr || (qr = {}));
!(function(qr) {
    var text = (function() {
        /**
         * @param {number} typeNumber
         * @param {number} errorCorrectLevel
         * @return {undefined}
         */
        function QRCode(typeNumber, errorCorrectLevel) {
            /** @type {null} */
            this.modules = null;
            /** @type {number} */
            this.moduleCount = 0;
            /** @type {null} */
            this.dataCache = null;
            /** @type {!Array} */
            this.dataList = [];
            /** @type {number} */
            this.typeNumber = typeNumber;
            /** @type {number} */
            this.errorCorrectLevel = errorCorrectLevel;
            /** @type {null} */
            this.modules = null;
            /** @type {number} */
            this.moduleCount = 0;
            /** @type {null} */
            this.dataCache = null;
            /** @type {!Array} */
            this.dataList = [];
        }
        return (
            (QRCode.prototype.addData = function(data) {
                var newData = new qr.QR8bitByte(data);
                this.dataList.push(newData);
                /** @type {null} */
                this.dataCache = null;
            }),
            (QRCode.prototype.isDark = function(col, row) {
                if (
                    0 > col ||
                    this.moduleCount <= col ||
                    0 > row ||
                    this.moduleCount <= row
                ) {
                    throw new Error(col + ',' + row);
                }
                return this.modules[col][row];
            }),
            (QRCode.prototype.getModuleCount = function() {
                return this.moduleCount;
            }),
            (QRCode.prototype.make = function() {
                this.makeImpl(false, this.getBestMaskPattern());
            }),
            (QRCode.prototype.makeImpl = function(test, maskPattern) {
                /** @type {number} */
                this.moduleCount = 4 * this.typeNumber + 17;
                /** @type {!Array} */
                this.modules = new Array(this.moduleCount);
                /** @type {number} */
                var row = 0;
                for (; row < this.moduleCount; row++) {
                    /** @type {!Array} */
                    this.modules[row] = new Array(this.moduleCount);
                    /** @type {number} */
                    var col = 0;
                    for (; col < this.moduleCount; col++) {
                        /** @type {null} */
                        this.modules[row][col] = null;
                    }
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount - 7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test, maskPattern);
                if (this.typeNumber >= 7) {
                    this.setupTypeNumber(test);
                }
                if (null == this.dataCache) {
                    this.dataCache = QRCode.createData(
                        this.typeNumber,
                        this.errorCorrectLevel,
                        this.dataList
                    );
                }
                this.mapData(this.dataCache, maskPattern);
            }),
            (QRCode.prototype.setupPositionProbePattern = function(row, col) {
                /** @type {number} */
                var r = -1;
                for (; 7 >= r; r++) {
                    if (!(-1 >= row + r || this.moduleCount <= row + r)) {
                        /** @type {number} */
                        var c = -1;
                        for (; 7 >= c; c++) {
                            if (
                                !(-1 >= col + c || this.moduleCount <= col + c)
                            ) {
                                if (
                                    (r >= 0 && 6 >= r && (0 == c || 6 == c)) ||
                                    (c >= 0 && 6 >= c && (0 == r || 6 == r)) ||
                                    (r >= 2 && 4 >= r && c >= 2 && 4 >= c)
                                ) {
                                    /** @type {boolean} */
                                    this.modules[row + r][col + c] = true;
                                } else {
                                    /** @type {boolean} */
                                    this.modules[row + r][col + c] = false;
                                }
                            }
                        }
                    }
                }
            }),
            (QRCode.prototype.getBestMaskPattern = function() {
                /** @type {number} */
                var x = 0;
                /** @type {number} */
                var pattern = 0;
                /** @type {number} */
                var i = 0;
                for (; 8 > i; i++) {
                    this.makeImpl(true, i);
                    var rightConstraint = qr.QRUtil.getLostPoint(this);
                    if (0 == i || x > rightConstraint) {
                        x = rightConstraint;
                        /** @type {number} */
                        pattern = i;
                    }
                }
                return pattern;
            }),
            (QRCode.prototype.createMovieClip = function(
                target_mc,
                instance_name,
                depth
            ) {
                var qr_mc = target_mc.createEmptyMovieClip(
                    instance_name,
                    depth
                );
                /** @type {number} */
                var cs = 1;
                this.make();
                /** @type {number} */
                var row = 0;
                for (; row < this.modules.length; row++) {
                    /** @type {number} */
                    var y = row * cs;
                    /** @type {number} */
                    var col = 0;
                    for (; col < this.modules[row].length; col++) {
                        /** @type {number} */
                        var x = col * cs;
                        var classVar = this.modules[row][col];
                        if (classVar) {
                            qr_mc.beginFill(0, 100);
                            qr_mc.moveTo(x, y);
                            qr_mc.lineTo(x + cs, y);
                            qr_mc.lineTo(x + cs, y + cs);
                            qr_mc.lineTo(x, y + cs);
                            qr_mc.endFill();
                        }
                    }
                }
                return qr_mc;
            }),
            (QRCode.prototype.setupTimingPattern = function() {
                /** @type {number} */
                var r = 8;
                for (; r < this.moduleCount - 8; r++) {
                    if (null == this.modules[r][6]) {
                        /** @type {boolean} */
                        this.modules[r][6] = r % 2 == 0;
                    }
                }
                /** @type {number} */
                var c = 8;
                for (; c < this.moduleCount - 8; c++) {
                    if (null == this.modules[6][c]) {
                        /** @type {boolean} */
                        this.modules[6][c] = c % 2 == 0;
                    }
                }
            }),
            (QRCode.prototype.setupPositionAdjustPattern = function() {
                var pos = qr.QRUtil.getPatternPosition(this.typeNumber);
                /** @type {number} */
                var i = 0;
                for (; i < pos.length; i++) {
                    /** @type {number} */
                    var j = 0;
                    for (; j < pos.length; j++) {
                        var row = pos[i];
                        var col = pos[j];
                        if (null == this.modules[row][col]) {
                            /** @type {number} */
                            var r = -2;
                            for (; 2 >= r; r++) {
                                /** @type {number} */
                                var c = -2;
                                for (; 2 >= c; c++) {
                                    if (
                                        -2 == r ||
                                        2 == r ||
                                        -2 == c ||
                                        2 == c ||
                                        (0 == r && 0 == c)
                                    ) {
                                        /** @type {boolean} */
                                        this.modules[row + r][col + c] = true;
                                    } else {
                                        /** @type {boolean} */
                                        this.modules[row + r][col + c] = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }),
            (QRCode.prototype.setupTypeNumber = function(test) {
                var bits = qr.QRUtil.getBCHTypeNumber(this.typeNumber);
                /** @type {number} */
                var i = 0;
                for (; 18 > i; i++) {
                    /** @type {boolean} */
                    var r = !test && 1 == ((bits >> i) & 1);
                    /** @type {boolean} */
                    this.modules[Math.floor(i / 3)][
                        (i % 3) + this.moduleCount - 8 - 3
                    ] = r;
                }
                /** @type {number} */
                i = 0;
                for (; 18 > i; i++) {
                    /** @type {boolean} */
                    r = !test && 1 == ((bits >> i) & 1);
                    /** @type {boolean} */
                    this.modules[(i % 3) + this.moduleCount - 8 - 3][
                        Math.floor(i / 3)
                    ] = r;
                }
            }),
            (QRCode.prototype.setupTypeInfo = function(test, maskPattern) {
                /** @type {number} */
                var data = (this.errorCorrectLevel << 3) | maskPattern;
                var bits = qr.QRUtil.getBCHTypeInfo(data);
                /** @type {number} */
                var i = 0;
                for (; 15 > i; i++) {
                    /** @type {boolean} */
                    var n = !test && 1 == ((bits >> i) & 1);
                    if (6 > i) {
                        /** @type {boolean} */
                        this.modules[i][8] = n;
                    } else {
                        if (8 > i) {
                            /** @type {boolean} */
                            this.modules[i + 1][8] = n;
                        } else {
                            /** @type {boolean} */
                            this.modules[this.moduleCount - 15 + i][8] = n;
                        }
                    }
                }
                /** @type {number} */
                i = 0;
                for (; 15 > i; i++) {
                    /** @type {boolean} */
                    n = !test && 1 == ((bits >> i) & 1);
                    if (8 > i) {
                        /** @type {boolean} */
                        this.modules[8][this.moduleCount - i - 1] = n;
                    } else {
                        if (9 > i) {
                            /** @type {boolean} */
                            this.modules[8][15 - i - 1 + 1] = n;
                        } else {
                            /** @type {boolean} */
                            this.modules[8][15 - i - 1] = n;
                        }
                    }
                }
                /** @type {boolean} */
                this.modules[this.moduleCount - 8][8] = !test;
            }),
            (QRCode.prototype.mapData = function(data, maskPattern) {
                /** @type {number} */
                var inc = -1;
                /** @type {number} */
                var row = this.moduleCount - 1;
                /** @type {number} */
                var bitIndex = 7;
                /** @type {number} */
                var byteIndex = 0;
                /** @type {number} */
                var col = this.moduleCount - 1;
                for (; col > 0; col = col - 2) {
                    if (6 == col) {
                        col--;
                    }
                    for (;;) {
                        /** @type {number} */
                        var c = 0;
                        for (; 2 > c; c++) {
                            if (null == this.modules[row][col - c]) {
                                /** @type {boolean} */
                                var h = false;
                                if (byteIndex < data.length) {
                                    /** @type {boolean} */
                                    h =
                                        1 ==
                                        ((data[byteIndex] >>> bitIndex) & 1);
                                }
                                var mask = qr.QRUtil.getMask(
                                    maskPattern,
                                    row,
                                    col - c
                                );
                                if (mask) {
                                    /** @type {boolean} */
                                    h = !h;
                                }
                                /** @type {boolean} */
                                this.modules[row][col - c] = h;
                                bitIndex--;
                                if (-1 == bitIndex) {
                                    byteIndex++;
                                    /** @type {number} */
                                    bitIndex = 7;
                                }
                            }
                        }
                        if (
                            ((row = row + inc),
                            0 > row || this.moduleCount <= row)
                        ) {
                            /** @type {number} */
                            row = row - inc;
                            /** @type {number} */
                            inc = -inc;
                            break;
                        }
                    }
                }
            }),
            (QRCode.createData = function(
                typeNumber,
                errorCorrectLevel,
                dataList
            ) {
                var rsBlocks = qr.QRRSBlock.getRSBlocks(
                    typeNumber,
                    errorCorrectLevel
                );
                var buffer = new qr.QRBitBuffer();
                /** @type {number} */
                var i = 0;
                for (; i < dataList.length; i++) {
                    var data = dataList[i];
                    buffer.put(data.mode, 4);
                    buffer.put(
                        data.getLength(),
                        qr.QRUtil.getLengthInBits(data.mode, typeNumber)
                    );
                    data.write(buffer);
                }
                /** @type {number} */
                var totalDataCount = 0;
                /** @type {number} */
                i = 0;
                for (; i < rsBlocks.length; i++) {
                    totalDataCount = totalDataCount + rsBlocks[i].dataCount;
                }
                if (buffer.getLengthInBits() > 8 * totalDataCount) {
                    throw new Error(
                        'code length overflow. (' +
                            buffer.getLengthInBits() +
                            '>' +
                            8 * totalDataCount +
                            ')'
                    );
                }
                if (buffer.getLengthInBits() + 4 <= 8 * totalDataCount) {
                    buffer.put(0, 4);
                }
                for (; buffer.getLengthInBits() % 8 != 0; ) {
                    buffer.putBit(false);
                }
                for (
                    ;
                    !(buffer.getLengthInBits() >= 8 * totalDataCount) &&
                    (buffer.put(QRCode.PAD0, 8),
                    !(buffer.getLengthInBits() >= 8 * totalDataCount));

                ) {
                    buffer.put(QRCode.PAD1, 8);
                }
                return QRCode.createBytes(buffer, rsBlocks);
            }),
            (QRCode.createBytes = function(buffer, rsBlocks) {
                /** @type {number} */
                var offset = 0;
                /** @type {number} */
                var maxDcCount = 0;
                /** @type {number} */
                var maxEcCount = 0;
                /** @type {!Array} */
                var dcdata = new Array(rsBlocks.length);
                /** @type {!Array} */
                var ixs = new Array(rsBlocks.length);
                /** @type {number} */
                var r = 0;
                for (; r < rsBlocks.length; r++) {
                    var dcCount = rsBlocks[r].dataCount;
                    /** @type {number} */
                    var ecCount = rsBlocks[r].totalCount - dcCount;
                    /** @type {number} */
                    maxDcCount = Math.max(maxDcCount, dcCount);
                    /** @type {number} */
                    maxEcCount = Math.max(maxEcCount, ecCount);
                    /** @type {!Array} */
                    dcdata[r] = new Array(dcCount);
                    /** @type {number} */
                    var i = 0;
                    for (; i < dcdata[r].length; i++) {
                        /** @type {number} */
                        dcdata[r][i] = 255 & buffer.buffer[i + offset];
                    }
                    offset = offset + dcCount;
                    var rsPoly = qr.QRUtil.getErrorCorrectPolynomial(ecCount);
                    var rawPoly = new qr.QRPolynomial(
                        dcdata[r],
                        rsPoly.getLength() - 1
                    );
                    var modPoly = rawPoly.mod(rsPoly);
                    /** @type {!Array} */
                    ixs[r] = new Array(rsPoly.getLength() - 1);
                    /** @type {number} */
                    i = 0;
                    for (; i < ixs[r].length; i++) {
                        /** @type {number} */
                        var length = i + modPoly.getLength() - ixs[r].length;
                        ixs[r][i] = length >= 0 ? modPoly.get(length) : 0;
                    }
                }
                /** @type {number} */
                var totalCodeCount = 0;
                /** @type {number} */
                i = 0;
                for (; i < rsBlocks.length; i++) {
                    totalCodeCount = totalCodeCount + rsBlocks[i].totalCount;
                }
                /** @type {!Array} */
                var data = new Array(totalCodeCount);
                /** @type {number} */
                var dataPosition = 0;
                /** @type {number} */
                i = 0;
                for (; maxDcCount > i; i++) {
                    /** @type {number} */
                    r = 0;
                    for (; r < rsBlocks.length; r++) {
                        if (i < dcdata[r].length) {
                            data[dataPosition++] = dcdata[r][i];
                        }
                    }
                }
                /** @type {number} */
                i = 0;
                for (; maxEcCount > i; i++) {
                    /** @type {number} */
                    r = 0;
                    for (; r < rsBlocks.length; r++) {
                        if (i < ixs[r].length) {
                            data[dataPosition++] = ixs[r][i];
                        }
                    }
                }
                return data;
            }),
            (QRCode.PAD0 = 236),
            (QRCode.PAD1 = 17),
            QRCode
        );
    })();
    qr.QRCodeModel = text;
    __reflect(text.prototype, 'qr.QRCodeModel');
})(qr || (qr = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function QRErrorCorrectLevel() {}
        return (
            (QRErrorCorrectLevel.L = 1),
            (QRErrorCorrectLevel.M = 0),
            (QRErrorCorrectLevel.Q = 3),
            (QRErrorCorrectLevel.H = 2),
            QRErrorCorrectLevel
        );
    })();
    HTMLSectionBuilder.QRErrorCorrectLevel = HTMLSection;
    __reflect(HTMLSection.prototype, 'qr.QRErrorCorrectLevel');
})(qr || (qr = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function QRMaskPattern() {}
        return (
            (QRMaskPattern.PATTERN000 = 0),
            (QRMaskPattern.PATTERN001 = 1),
            (QRMaskPattern.PATTERN010 = 2),
            (QRMaskPattern.PATTERN011 = 3),
            (QRMaskPattern.PATTERN100 = 4),
            (QRMaskPattern.PATTERN101 = 5),
            (QRMaskPattern.PATTERN110 = 6),
            (QRMaskPattern.PATTERN111 = 7),
            QRMaskPattern
        );
    })();
    HTMLSectionBuilder.QRMaskPattern = HTMLSection;
    __reflect(HTMLSection.prototype, 'qr.QRMaskPattern');
})(qr || (qr = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function QRMath() {}
        return (
            (QRMath.glog = function(n) {
                return (
                    QRMath.isInit || QRMath.init(),
                    1 > n && dclib('\u9519\u8bef:n=' + n),
                    QRMath.LOG_TABLE[n]
                );
            }),
            (QRMath.gexp = function(n) {
                if (!QRMath.isInit) {
                    QRMath.init();
                }
                for (; 0 > n; ) {
                    n = n + 255;
                }
                for (; n >= 256; ) {
                    /** @type {number} */
                    n = n - 255;
                }
                return QRMath.EXP_TABLE[n];
            }),
            (QRMath.init = function() {
                /** @type {boolean} */
                QRMath.isInit = true;
                /** @type {number} */
                var i = 0;
                for (; 8 > i; i++) {
                    /** @type {number} */
                    QRMath.EXP_TABLE[i] = 1 << i;
                }
                /** @type {number} */
                i = 8;
                for (; 256 > i; i++) {
                    /** @type {number} */
                    QRMath.EXP_TABLE[i] =
                        QRMath.EXP_TABLE[i - 4] ^
                        QRMath.EXP_TABLE[i - 5] ^
                        QRMath.EXP_TABLE[i - 6] ^
                        QRMath.EXP_TABLE[i - 8];
                }
                /** @type {number} */
                i = 0;
                for (; 255 > i; i++) {
                    /** @type {number} */
                    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
                }
            }),
            (QRMath.EXP_TABLE = new Array(256)),
            (QRMath.LOG_TABLE = new Array(256)),
            QRMath
        );
    })();
    HTMLSectionBuilder.QRMath = HTMLSection;
    __reflect(HTMLSection.prototype, 'qr.QRMath');
})(qr || (qr = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function() {
        /**
         * @return {undefined}
         */
        function QRMode() {}
        return (
            (QRMode.MODE_NUMBER = 1),
            (QRMode.MODE_ALPHA_NUM = 2),
            (QRMode.MODE_8BIT_BYTE = 4),
            (QRMode.MODE_KANJI = 8),
            QRMode
        );
    })();
    HTMLSectionBuilder.QRMode = HTMLSection;
    __reflect(HTMLSection.prototype, 'qr.QRMode');
})(qr || (qr = {}));
!(function(QRCode) {
    var QRErrorCorrectLevel = (function() {
        /**
         * @param {!Array} num
         * @param {number} shift
         * @return {undefined}
         */
        function QRPolynomial(num, shift) {
            if (void 0 == num.length) {
                throw new Error(num.length + '/' + shift);
            }
            /** @type {number} */
            var offset = 0;
            for (; offset < num.length && 0 == num[offset]; ) {
                offset++;
            }
            /** @type {!Array} */
            this.num = new Array(num.length - offset + shift);
            /** @type {number} */
            var i = 0;
            for (; i < num.length - offset; i++) {
                this.num[i] = num[i + offset];
            }
        }
        return (
            (QRPolynomial.prototype.get = function(name) {
                return this.num[name];
            }),
            (QRPolynomial.prototype.getLength = function() {
                return this.num.length;
            }),
            (QRPolynomial.prototype.multiply = function(c) {
                /** @type {!Array} */
                var num = new Array(this.getLength() + c.getLength() - 1);
                /** @type {number} */
                var i = 0;
                for (; i < this.getLength(); i++) {
                    /** @type {number} */
                    var j = 0;
                    for (; j < c.getLength(); j++) {
                        num[i + j] ^= QRCode.QRMath.gexp(
                            QRCode.QRMath.glog(this.get(i)) +
                                QRCode.QRMath.glog(c.get(j))
                        );
                    }
                }
                return new QRPolynomial(num, 0);
            }),
            (QRPolynomial.prototype.mod = function(e) {
                if (this.getLength() - e.getLength() < 0) {
                    return this;
                }
                /** @type {number} */
                var ratio =
                    QRCode.QRMath.glog(this.get(0)) -
                    QRCode.QRMath.glog(e.get(0));
                /** @type {!Array} */
                var num = new Array(this.getLength());
                /** @type {number} */
                var i = 0;
                for (; i < this.getLength(); i++) {
                    num[i] = this.get(i);
                }
                /** @type {number} */
                i = 0;
                for (; i < e.getLength(); i++) {
                    num[i] ^= QRCode.QRMath.gexp(
                        QRCode.QRMath.glog(e.get(i)) + ratio
                    );
                }
                return new QRPolynomial(num, 0).mod(e);
            }),
            QRPolynomial
        );
    })();
    QRCode.QRPolynomial = QRErrorCorrectLevel;
    __reflect(QRErrorCorrectLevel.prototype, 'qr.QRPolynomial');
})(qr || (qr = {}));
!(function(QRCode) {
    var QRErrorCorrectLevel = (function() {
        /**
         * @param {(Array|string)} totalCount
         * @param {number} dataCount
         * @return {undefined}
         */
        function QRRSBlock(totalCount, dataCount) {
            /** @type {(Array|string)} */
            this.totalCount = totalCount;
            /** @type {number} */
            this.dataCount = dataCount;
        }
        return (
            (QRRSBlock.RS_BLOCK_TABLE = [
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
            (QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
                var rsBlock = QRRSBlock.getRsBlockTable(
                    typeNumber,
                    errorCorrectLevel
                );
                if (void 0 == rsBlock) {
                    throw new Error(
                        'bad rs block @ typeNumber:' +
                            typeNumber +
                            '/errorCorrectLevel:' +
                            errorCorrectLevel
                    );
                }
                /** @type {number} */
                var r = rsBlock.length / 3;
                /** @type {!Array} */
                var list = [];
                /** @type {number} */
                var MIN_HEIGHT = 0;
                for (; r > MIN_HEIGHT; MIN_HEIGHT++) {
                    var count = rsBlock[3 * MIN_HEIGHT + 0];
                    var totalCount = rsBlock[3 * MIN_HEIGHT + 1];
                    var dataCount = rsBlock[3 * MIN_HEIGHT + 2];
                    /** @type {number} */
                    var minTasksBeforeBot = 0;
                    for (; count > minTasksBeforeBot; minTasksBeforeBot++) {
                        list.push(new QRRSBlock(totalCount, dataCount));
                    }
                }
                return list;
            }),
            (QRRSBlock.getRsBlockTable = function(
                typeNumber,
                errorCorrectLevel
            ) {
                switch (errorCorrectLevel) {
                    case QRCode.QRErrorCorrectLevel.L:
                        return QRRSBlock.RS_BLOCK_TABLE[
                            4 * (typeNumber - 1) + 0
                        ];
                    case QRCode.QRErrorCorrectLevel.M:
                        return QRRSBlock.RS_BLOCK_TABLE[
                            4 * (typeNumber - 1) + 1
                        ];
                    case QRCode.QRErrorCorrectLevel.Q:
                        return QRRSBlock.RS_BLOCK_TABLE[
                            4 * (typeNumber - 1) + 2
                        ];
                    case QRCode.QRErrorCorrectLevel.H:
                        return QRRSBlock.RS_BLOCK_TABLE[
                            4 * (typeNumber - 1) + 3
                        ];
                    default:
                        return;
                }
            }),
            QRRSBlock
        );
    })();
    QRCode.QRRSBlock = QRErrorCorrectLevel;
    __reflect(QRErrorCorrectLevel.prototype, 'qr.QRRSBlock');
})(qr || (qr = {}));
!(function(QRCode) {
    var QRErrorCorrectLevel = (function() {
        /**
         * @return {undefined}
         */
        function QRUtil() {}
        return (
            (QRUtil.getBCHTypeInfo = function(data) {
                /** @type {number} */
                var d = data << 10;
                for (
                    ;
                    QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0;

                ) {
                    /** @type {number} */
                    d =
                        d ^
                        (QRUtil.G15 <<
                            (QRUtil.getBCHDigit(d) -
                                QRUtil.getBCHDigit(QRUtil.G15)));
                }
                return ((data << 10) | d) ^ QRUtil.G15_MASK;
            }),
            (QRUtil.getBCHTypeNumber = function(data) {
                /** @type {number} */
                var d = data << 12;
                for (
                    ;
                    QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0;

                ) {
                    /** @type {number} */
                    d =
                        d ^
                        (QRUtil.G18 <<
                            (QRUtil.getBCHDigit(d) -
                                QRUtil.getBCHDigit(QRUtil.G18)));
                }
                return (data << 12) | d;
            }),
            (QRUtil.getBCHDigit = function(data) {
                /** @type {number} */
                var digit = 0;
                for (; 0 != data; ) {
                    digit++;
                    /** @type {number} */
                    data = data >>> 1;
                }
                return digit;
            }),
            (QRUtil.getPatternPosition = function(typeNumber) {
                return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
            }),
            (QRUtil.getMask = function(maskPattern, i, j) {
                switch (maskPattern) {
                    case QRCode.QRMaskPattern.PATTERN000:
                        return (i + j) % 2 == 0;
                    case QRCode.QRMaskPattern.PATTERN001:
                        return i % 2 == 0;
                    case QRCode.QRMaskPattern.PATTERN010:
                        return j % 3 == 0;
                    case QRCode.QRMaskPattern.PATTERN011:
                        return (i + j) % 3 == 0;
                    case QRCode.QRMaskPattern.PATTERN100:
                        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                    case QRCode.QRMaskPattern.PATTERN101:
                        return ((i * j) % 2) + ((i * j) % 3) == 0;
                    case QRCode.QRMaskPattern.PATTERN110:
                        return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
                    case QRCode.QRMaskPattern.PATTERN111:
                        return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
                    default:
                        throw new Error('bad maskPattern:' + maskPattern);
                }
            }),
            (QRUtil.getErrorCorrectPolynomial = function(errorCorrectLength) {
                var a = new QRCode.QRPolynomial([1], 0);
                /** @type {number} */
                var i = 0;
                for (; errorCorrectLength > i; i++) {
                    a = a.multiply(
                        new QRCode.QRPolynomial([1, QRCode.QRMath.gexp(i)], 0)
                    );
                }
                return a;
            }),
            (QRUtil.getLengthInBits = function(type, mode) {
                if (mode >= 1 && 10 > mode) {
                    switch (type) {
                        case QRCode.QRMode.MODE_NUMBER:
                            return 10;
                        case QRCode.QRMode.MODE_ALPHA_NUM:
                            return 9;
                        case QRCode.QRMode.MODE_8BIT_BYTE:
                            return 8;
                        case QRCode.QRMode.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error('mode:' + type);
                    }
                } else {
                    if (27 > mode) {
                        switch (type) {
                            case QRCode.QRMode.MODE_NUMBER:
                                return 12;
                            case QRCode.QRMode.MODE_ALPHA_NUM:
                                return 11;
                            case QRCode.QRMode.MODE_8BIT_BYTE:
                                return 16;
                            case QRCode.QRMode.MODE_KANJI:
                                return 10;
                            default:
                                throw new Error('mode:' + type);
                        }
                    } else {
                        if (!(41 > mode)) {
                            throw new Error('type:' + mode);
                        }
                        switch (type) {
                            case QRCode.QRMode.MODE_NUMBER:
                                return 14;
                            case QRCode.QRMode.MODE_ALPHA_NUM:
                                return 13;
                            case QRCode.QRMode.MODE_8BIT_BYTE:
                                return 16;
                            case QRCode.QRMode.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error('mode:' + type);
                        }
                    }
                }
            }),
            (QRUtil.getLostPoint = function(qrCode) {
                var cols = qrCode.getModuleCount();
                /** @type {number} */
                var viewerN = 0;
                /** @type {number} */
                var row = 0;
                for (; cols > row; row++) {
                    /** @type {number} */
                    var col = 0;
                    for (; cols > col; col++) {
                        /** @type {number} */
                        var n = 0;
                        var hexId = qrCode.isDark(row, col);
                        /** @type {number} */
                        var r = -1;
                        for (; 1 >= r; r++) {
                            if (!(0 > row + r || row + r >= cols)) {
                                /** @type {number} */
                                var c = -1;
                                for (; 1 >= c; c++) {
                                    if (!(0 > col + c || col + c >= cols)) {
                                        if (
                                            (0 != r || 0 != c) &&
                                            hexId ==
                                                qrCode.isDark(row + r, col + c)
                                        ) {
                                            n++;
                                        }
                                    }
                                }
                            }
                        }
                        if (n > 5) {
                            /** @type {number} */
                            viewerN = viewerN + (3 + n - 5);
                        }
                    }
                }
                /** @type {number} */
                row = 0;
                for (; cols - 1 > row; row++) {
                    /** @type {number} */
                    col = 0;
                    for (; cols - 1 > col; col++) {
                        /** @type {number} */
                        var u = 0;
                        if (qrCode.isDark(row, col)) {
                            u++;
                        }
                        if (qrCode.isDark(row + 1, col)) {
                            u++;
                        }
                        if (qrCode.isDark(row, col + 1)) {
                            u++;
                        }
                        if (qrCode.isDark(row + 1, col + 1)) {
                            u++;
                        }
                        if (0 == u || 4 == u) {
                            /** @type {number} */
                            viewerN = viewerN + 3;
                        }
                    }
                }
                /** @type {number} */
                row = 0;
                for (; cols > row; row++) {
                    /** @type {number} */
                    col = 0;
                    for (; cols - 6 > col; col++) {
                        if (
                            qrCode.isDark(row, col) &&
                            !qrCode.isDark(row, col + 1) &&
                            qrCode.isDark(row, col + 2) &&
                            qrCode.isDark(row, col + 3) &&
                            qrCode.isDark(row, col + 4) &&
                            !qrCode.isDark(row, col + 5) &&
                            qrCode.isDark(row, col + 6)
                        ) {
                            /** @type {number} */
                            viewerN = viewerN + 40;
                        }
                    }
                }
                /** @type {number} */
                col = 0;
                for (; cols > col; col++) {
                    /** @type {number} */
                    row = 0;
                    for (; cols - 6 > row; row++) {
                        if (
                            qrCode.isDark(row, col) &&
                            !qrCode.isDark(row + 1, col) &&
                            qrCode.isDark(row + 2, col) &&
                            qrCode.isDark(row + 3, col) &&
                            qrCode.isDark(row + 4, col) &&
                            !qrCode.isDark(row + 5, col) &&
                            qrCode.isDark(row + 6, col)
                        ) {
                            /** @type {number} */
                            viewerN = viewerN + 40;
                        }
                    }
                }
                /** @type {number} */
                var itemInc = 0;
                /** @type {number} */
                col = 0;
                for (; cols > col; col++) {
                    /** @type {number} */
                    row = 0;
                    for (; cols > row; row++) {
                        if (qrCode.isDark(row, col)) {
                            itemInc++;
                        }
                    }
                }
                /** @type {number} */
                var inc = Math.abs((100 * itemInc) / cols / cols - 50) / 5;
                return (viewerN = viewerN + 10 * inc);
            }),
            (QRUtil.prototype.static_isSupportCanvas = function() {
                return 'undefined' != typeof CanvasRenderingContext2D;
            }),
            (QRUtil._getTypeNumber = function(sText, nCorrectLevel) {
                /** @type {number} */
                var nType = 1;
                var length = QRUtil._getUTF8Length(sText);
                /** @type {number} */
                var animals_count = 0;
                /** @type {number} */
                var i = QRUtil.QRCodeLimitLength.length;
                for (; i >= animals_count; animals_count++) {
                    /** @type {number} */
                    var _endIndex = 0;
                    switch (nCorrectLevel) {
                        case QRCode.QRErrorCorrectLevel.L:
                            _endIndex =
                                QRUtil.QRCodeLimitLength[animals_count][0];
                            break;
                        case QRCode.QRErrorCorrectLevel.M:
                            _endIndex =
                                QRUtil.QRCodeLimitLength[animals_count][1];
                            break;
                        case QRCode.QRErrorCorrectLevel.Q:
                            _endIndex =
                                QRUtil.QRCodeLimitLength[animals_count][2];
                            break;
                        case QRCode.QRErrorCorrectLevel.H:
                            _endIndex =
                                QRUtil.QRCodeLimitLength[animals_count][3];
                    }
                    if (_endIndex >= length) {
                        break;
                    }
                    nType++;
                }
                if (nType > QRUtil.QRCodeLimitLength.length) {
                    throw new Error('Too long data');
                }
                return nType;
            }),
            (QRUtil._getUTF8Length = function(sText) {
                /** @type {string} */
                var replacedText = encodeURI(sText)
                    .toString()
                    .replace(/%[0-9a-fA-F]{2}/g, 'a');
                return (
                    replacedText.length + (replacedText.length != sText ? 3 : 0)
                );
            }),
            (QRUtil.PATTERN_POSITION_TABLE = [
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
            (QRUtil.G15 = 1335),
            (QRUtil.G18 = 7973),
            (QRUtil.G15_MASK = 21522),
            (QRUtil.QRCodeLimitLength = [
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
            QRUtil
        );
    })();
    QRCode.QRUtil = QRErrorCorrectLevel;
    __reflect(QRErrorCorrectLevel.prototype, 'qr.QRUtil');
})(qr || (qr = {}));
!(function(evt) {
    var data = (function(m) {
        /**
         * @return {?}
         */
        function e() {
            var t = m.call(this) || this;
            return (
                (t.loadingGrpList = []),
                (t.loadedThemeMap = new evt.HashMap()),
                t
            );
        }
        return (
            __extends(e, m),
            Object.defineProperty(e, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (e.init = function() {
                return this.initInstance(this);
            }),
            (e.prototype.loadResBundle = function(appPath, done) {
                var self = this;
                /** @type {!Function} */
                this.finishCb = done;
                appPath.forEach(function(result) {
                    if (result.thm && !self.loadedThemeMap.has(result.thm)) {
                        var type = evt.loadTheme(
                            result.resRoot + result.thm,
                            self.onLoadComplete.bind(self, null),
                            self
                        );
                        self.loadedThemeMap.set(result.thm, type);
                    }
                });
                /** @type {!Array} */
                this.loadingGrpList = [];
                appPath.forEach(function(t) {
                    if (t.resRoot) {
                        /** @type {string} */
                        var res = t.grpName + '_' + evt.getLang();
                        /** @type {string} */
                        var falseySection = t.grpName + '_' + evt.LANG_BACKUP;
                        if (t.grpName && !RES.isGroupLoaded(res)) {
                            self.loadingGrpList.push(res);
                        }
                        if (t.grpName && !RES.isGroupLoaded(falseySection)) {
                            self.loadingGrpList.push(falseySection);
                        }
                        if (t.grpName && !RES.isGroupLoaded(t.grpName)) {
                            self.loadingGrpList.push(t.grpName);
                        }
                    }
                });
                if (this.loadingGrpList.length > 0) {
                    this.gBundleLoader = evt.SilentLoadManager.instance.loadAtOnce(
                        this.loadingGrpList
                    );
                    this.gBundleLoader.addEventListener(
                        evt.EVENT_PROGRESS,
                        this.onLoadProgress,
                        this
                    );
                    this.gBundleLoader.addEventListener(
                        evt.EVENT_COMPLETE,
                        this.onLoadComplete,
                        this
                    );
                    this.gBundleLoader.startLoad();
                } else {
                    this.onLoadComplete(null);
                }
            }),
            (e.prototype.isThemeLoaded = function() {
                /** @type {boolean} */
                var e = true;
                return (
                    this.loadedThemeMap.forEach(function(fx) {
                        if (!fx.initialized) {
                            /** @type {boolean} */
                            e = false;
                        }
                    }),
                    e
                );
            }),
            (e.prototype.onLoadProgress = function(status) {
                this.dispatchEventWith(evt.EVENT_PROGRESS, false, status.data);
            }),
            (e.prototype.onLoadComplete = function(data) {
                if (data && data.currentTarget === this.gBundleLoader) {
                    this.gBundleLoader.removeEventListener(
                        evt.EVENT_PROGRESS,
                        this.onLoadProgress,
                        this
                    );
                    this.gBundleLoader.removeEventListener(
                        evt.EVENT_COMPLETE,
                        this.onLoadComplete,
                        this
                    );
                }
                if (
                    !(
                        !this.isThemeLoaded() ||
                        (this.gBundleLoader && !this.gBundleLoader.completed)
                    )
                ) {
                    if (this.finishCb) {
                        this.finishCb();
                        /** @type {null} */
                        this.finishCb = null;
                    }
                }
            }),
            e
        );
    })(evt.SingletonDispatcher);
    evt.ModuleResLoader = data;
    __reflect(data.prototype, 'Core.ModuleResLoader');
})(Core || (Core = {}));
!(function(self) {
    var data = (function(m) {
        /**
         * @return {?}
         */
        function e() {
            var triggerPublishSeed = m.call(this) || this;
            return (
                (triggerPublishSeed.index = -1),
                (triggerPublishSeed.waitingModuleNameList =
                    self.ExternalData.silentLoad),
                triggerPublishSeed
            );
        }
        return (
            __extends(e, m),
            Object.defineProperty(e, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (e.init = function() {
                return this.initInstance(this);
            }),
            (e.prototype.loadAtOnce = function(name) {
                var arg = this;
                /** @type {boolean} */
                var i = false;
                return (
                    name.forEach(function(val) {
                        if (
                            arg.silentLoader &&
                            arg.silentLoader.isGrpLoading(val)
                        ) {
                            /** @type {boolean} */
                            i = true;
                        }
                    }, this),
                    i && this.silentLoader && !this.silentLoader.completed
                        ? (this.silentLoader.appendGroup(name),
                          this.silentLoader)
                        : ((this.urgentLoader = new self.GroupBundleLoader(
                              name,
                              self.TAG_URGENT_LOADER,
                              10
                          )),
                          this.urgentLoader.addEventListener(
                              self.EVENT_COMPLETE,
                              this.onLoadComplete,
                              this
                          ),
                          this.urgentLoader)
                );
            }),
            (e.prototype.loadNextModule = function() {
                var args = this;
                if (
                    (this.index++,
                    this.index >= this.waitingModuleNameList.length)
                ) {
                    return (
                        dclib('All resource prepared!!'),
                        void ExternalProgress('prepare')
                    );
                }
                var track = this.waitingModuleNameList[this.index];
                var result = self.Config.ModuleConfig.instance.moduleInfoMap.get(
                    track
                );
                this.loadingModuleInfo = result;
                require(this.waitingModuleNameList, function() {
                    if (result.thm) {
                        self.loadTheme(
                            result.resRoot + result.thm,
                            args.onConfigComplete,
                            args
                        );
                    } else {
                        args.onConfigComplete();
                    }
                });
            }),
            (e.prototype.onConfigComplete = function() {
                var _currentFrame = this.loadingModuleInfo.grpName;
                this.loadingLang = self.LocalizeStore.instance.lang;
                this.silentLoader = new self.GroupBundleLoader(
                    [
                        _currentFrame,
                        _currentFrame + '_' + this.loadingLang,
                        _currentFrame + '_' + self.LANG_BACKUP
                    ],
                    self.TAG_SILENT_LOADER,
                    5
                );
                this.silentLoader.addEventListener(
                    self.EVENT_COMPLETE,
                    this.onLoadComplete,
                    this
                );
                this.silentLoader.startLoad();
            }),
            (e.prototype.onLoadComplete = function(results) {
                switch (results.data) {
                    case self.TAG_SILENT_LOADER:
                        this.silentLoader.removeEventListener(
                            self.EVENT_COMPLETE,
                            this.onLoadComplete,
                            this
                        );
                        this.loadNextModule();
                        break;
                    case self.TAG_URGENT_LOADER:
                        this.urgentLoader.removeEventListener(
                            self.EVENT_COMPLETE,
                            this.onLoadComplete,
                            this
                        );
                }
                this.dispatchEventWith(self.EVENT_COMPLETE);
            }),
            e
        );
    })(self.SingletonDispatcher);
    self.SilentLoadManager = data;
    __reflect(data.prototype, 'Core.SilentLoadManager');
})(Core || (Core = {}));
!(function(self) {
    var t;
    !(function(event) {
        /**
         * @return {?}
         */
        function callback() {
            return self.getSimpleCMD(self.Protocol.KEEP_ALIVE);
        }
        /**
         * @return {?}
         */
        function MOUSE_POINTER_ID() {
            return self.getSimpleCMD(self.Protocol.UCGATE_ALIVE);
        }
        /**
         * @return {?}
         */
        function relSet() {
            var buffer = self.startCMD(self.Protocol.CLIENT_DEMO_LOGIN);
            return buffer.writeInt(0), self.endCMD(buffer);
        }
        /**
         * @param {string} key
         * @param {!Array} e
         * @return {?}
         */
        function connect(key, e) {
            var writer = self.startCMD(self.Protocol.CLIENT_LOGIN);
            writer.writeBytes(self.stringToBytes(key, self.la));
            var data = self.hexStrToBytes(e);
            return (
                writer.writeBytes(data), writer.writeInt(0), self.endCMD(writer)
            );
        }
        /**
         * @param {string} data
         * @param {!Object} arr
         * @return {?}
         */
        function adler32(data, arr) {
            var stream = self.startCMD(self.Protocol.CHAT_LOGIN_SERVER);
            return (
                stream.writeBytes(self.stringToBytes(data, self.la)),
                stream.writeDouble(arr[0]),
                stream.writeDouble(arr[1]),
                self.endCMD(stream)
            );
        }
        /**
         * @param {string} key
         * @param {!Object} arr
         * @param {string} data
         * @return {?}
         */
        function value(key, arr, data) {
            var stream = self.startCMD(self.Protocol.CHAT_LOGIN_SERVER_EXT);
            return (
                stream.writeBytes(self.stringToBytes(data, 4)),
                stream.writeBytes(self.stringToBytes(key, self.la)),
                stream.writeByte(self.CHAT_LOGIN_TYPE),
                stream.writeByte(0),
                stream.writeByte(0),
                stream.writeDouble(arr[0]),
                stream.writeDouble(arr[1]),
                self.endCMD(stream)
            );
        }
        /**
         * @param {string} data
         * @param {string} key
         * @param {number} message
         * @param {number} type
         * @return {?}
         */
        function serialize(data, key, message, type) {
            var writer = self.startCMD(self.Protocol.CHAT_ENTER_TABLE);
            return (
                writer.writeBytes(self.stringToBytes(data, 4)),
                writer.writeBytes(self.stringToBytes(key, 4)),
                writer.writeInt(message),
                writer.writeByte(type),
                self.endCMD(writer)
            );
        }
        /**
         * @param {string} res
         * @return {?}
         */
        function sha1(res) {
            var script = self.startCMD(self.Protocol.CHAT_NICKNAME_CHANGE);
            /** @type {string} */
            var data = '';
            return (
                res && res.length > 0 && (data = res),
                script.writeBytes(self.stringToBytes(data, self.ma)),
                self.endCMD(script)
            );
        }
        /**
         * @param {number} type
         * @return {?}
         */
        function explicitType(type) {
            if (void 0 === type) {
                /** @type {number} */
                type = 0;
            }
            var buffer = self.startCMD(self.Protocol.CHAT_QUICK_MESSAGE_LIST);
            return buffer.writeInt(type), self.endCMD(buffer);
        }
        /**
         * @param {string} data
         * @param {string} callback
         * @param {?} offset
         * @param {string} str
         * @return {?}
         */
        function start(data, callback, offset, str) {
            var stream = self.startCMD(self.Protocol.CHAT_SEND_MESSAGE);
            stream.writeBytes(self.stringToBytes(data, self._n));
            stream.writeBytes(self.stringToBytes('0', 4));
            stream.writeByte(offset);
            stream.writeByte(1);
            var range = new egret.ByteArray();
            return (
                range.writeUTFBytes(str),
                stream.writeUnsignedInt(range.length),
                stream.writeBytes(self.stringToBytes(str, range.length)),
                self.endCMD(stream)
            );
        }
        /**
         * @param {string} data
         * @param {?} id
         * @param {string} key
         * @param {?} flags
         * @return {?}
         */
        function copy(data, id, key, flags) {
            var buf = self.startCMD(self.Protocol.CHAT_SEND_QUICK_MESSAGE);
            return (
                buf.writeBytes(self.stringToBytes(data, self._n)),
                buf.writeBytes(self.stringToBytes('0', 4)),
                buf.writeByte(flags),
                buf.writeUnsignedInt(id),
                buf.writeBytes(self.stringToBytes(key, 2)),
                self.endCMD(buf)
            );
        }
        /**
         * @param {string} data
         * @param {!Object} arr
         * @return {?}
         */
        function encodeArray(data, arr) {
            var stream = self.startCMD(
                self.Protocol.CLIENT_LOGIN_LIVE_PLATFORM_SESSION
            );
            return (
                stream.writeBytes(self.stringToBytes(data, self.la)),
                stream.writeDouble(arr[0]),
                stream.writeDouble(arr[1]),
                stream.writeUnsignedInt(0),
                self.endCMD(stream)
            );
        }
        /**
         * @param {!Object} stream
         * @param {!Object} properties
         * @return {?}
         */
        function sendMessage(stream, properties) {
            var buf = self.startCMD(self.Protocol.CRYPTO_USER_KEY_ACK);
            /** @type {number} */
            stream.position = 0;
            /** @type {number} */
            properties.position = 0;
            /** @type {number} */
            var r = 0;
            for (; 4 > r; r++) {
                buf.writeByte(stream.readByte() ^ properties.readByte());
            }
            return self.endCMD(buf);
        }
        /** @type {function(): ?} */
        event.getCMDKeepAlive = callback;
        /** @type {function(): ?} */
        event.getCMDUCGateAlive = MOUSE_POINTER_ID;
        /** @type {function(): ?} */
        event.getCMDClientDemoLogin = relSet;
        /** @type {function(string, !Array): ?} */
        event.getCMDClientLogin = connect;
        /** @type {function(string, !Object): ?} */
        event.getCMDChatLoginServer = adler32;
        /** @type {function(string, !Object, string): ?} */
        event.getCMDChatLoginServerExt = value;
        /** @type {function(string, string, number, number): ?} */
        event.getCMDChatEnterTable = serialize;
        /** @type {function(string): ?} */
        event.getCMDChatChangeNickname = sha1;
        /** @type {function(number): ?} */
        event.getCMDChatQuickMessageList = explicitType;
        /** @type {function(string, string, ?, string): ?} */
        event.getCMDChatSendMessage = start;
        /** @type {function(string, ?, string, ?): ?} */
        event.getCMDChatSendQuickMessage = copy;
        /** @type {function(string, !Object): ?} */
        event.getCMDLoginLivePlatform = encodeArray;
        /** @type {function(!Object, !Object): ?} */
        event.getCMDCryptoKeyACK = sendMessage;
    })((t = self.APIManager || (self.APIManager = {})));
})(Core || (Core = {}));
!(function(session) {
    var e;
    !(function(Step) {
        /** @type {number} */
        Step.KEEP_ALIVE = 1;
        /** @type {number} */
        Step.UCGATE_ALIVE = 8781826;
        /** @type {number} */
        Step.CLIENT_LOGIN = 69633;
        /** @type {number} */
        Step.Tu = 131073;
        /** @type {number} */
        Step.CLIENT_DEMO_LOGIN = 69649;
        /** @type {number} */
        Step.xu = 73729;
        /** @type {number} */
        Step.Ou = 131087;
        /** @type {number} */
        Step.CHAT_LOGIN_SERVER = 397313;
        /** @type {number} */
        Step.CHAT_LOGIN_SERVER_EXT = 401409;
        /** @type {number} */
        Step.Iu = 401410;
        /** @type {number} */
        Step.CHAT_DISABLE_KEY = 397314;
        /** @type {number} */
        Step.CHAT_ENTER_TABLE = 397315;
        /** @type {number} */
        Step.Ru = 399769;
        /** @type {number} */
        Step.CHAT_QUICK_MESSAGE_LIST = 397361;
        /** @type {number} */
        Step.Lu = 397362;
        /** @type {number} */
        Step.ju = 397575;
        /** @type {number} */
        Step.Bu = 397573;
        /** @type {number} */
        Step.Au = 131082;
        /** @type {number} */
        Step.CHAT_SEND_MESSAGE = 397386;
        /** @type {number} */
        Step.CHAT_SEND_QUICK_MESSAGE = 397319;
        /** @type {number} */
        Step.CHAT_NICKNAME_CHANGE = 397345;
        /** @type {number} */
        Step.CHAT_REMOVE_MESSAGE = 397577;
        /** @type {number} */
        Step.CLIENT_LOGIN_LIVE_PLATFORM_SESSION = 69669;
        /** @type {number} */
        Step.Nu = 301569;
        /** @type {number} */
        Step.Mu = 301584;
        /** @type {number} */
        Step.Du = 301825;
        /** @type {number} */
        Step.CRYPTO_USER_KEY_ACK = 301826;
        /** @type {number} */
        Step.CRYPTO_USER_SR = 301840;
    })((e = session.Protocol || (session.Protocol = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @param {number} type
             * @return {undefined}
             */
            function Message(type) {
                /** @type {number} */
                this.port = type;
                /** @type {!Array} */
                this.sortedLines = [];
                /** @type {number} */
                this.timestamp = Date.now();
            }
            return (
                (Message.prototype.isExpired = function() {
                    return Date.now() - this.timestamp > 6e5;
                }),
                (Message.setSortedLines = function(data, e) {
                    if (!this._sortedLinesMap) {
                        this._sortedLinesMap = new exports.HashMap();
                    }
                    var m = this._sortedLinesMap.get(data);
                    if (!m) {
                        m = new Message(data);
                        this._sortedLinesMap.set(data, m);
                    }
                    m.sortedLines.push(e);
                }),
                (Message.getSortedLines = function(key) {
                    if (!this._sortedLinesMap) {
                        return [];
                    }
                    var session = this._sortedLinesMap.get(key);
                    return session
                        ? session.isExpired()
                            ? (this._sortedLinesMap['delete'](key), [])
                            : session.sortedLines
                        : [];
                }),
                Message
            );
        })();
        HTMLSectionBuilder.SortedLineCache = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.SortedLineCache');
    })((t = exports.Network || (exports.Network = {})));
})(Core || (Core = {}));
!(function(val) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    /** @type {boolean} */
                    this.mobileAcountExist = 0 != stream.readByte();
                    /** @type {boolean} */
                    this.gesturePwdExist = 0 != stream.readByte();
                    stream.position += 6;
                    this.account = stream.readDouble();
                    this.nickname = stream.readUTFBytes(val.ma).trim();
                    this.gender = stream.readByte();
                    this.gameConfig = stream.readInt();
                }),
                Page
            );
        })(HTMLSectionBuilder.ResponseBase);
        HTMLSectionBuilder.Hu = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ClientInfoResp');
    })((t = val.Network || (val.Network = {})));
})(Core || (Core = {}));
!(function(Server) {
    var t;
    !(function(self) {
        var t = (function(Base) {
            /**
             * @return {?}
             */
            function Agent() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Agent, Base),
                Object.defineProperty(Agent, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(Agent.prototype, 'urls', {
                    get: function() {
                        return [
                            Server.ExternalData.webRoot +
                                Server.ExternalData.doForward
                        ];
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.prototype.fetchData = function() {
                    var session = this;
                    var result = {
                        module: self.Module.HTTP,
                        sequence: self.Client.instance.sharedSequnce++,
                        method: self.Method.GET,
                        targetType: self.TargetType.JSON,
                        urls: this.urls
                    };
                    self.Client.instance.sendHttpRequest(result, function(
                        global
                    ) {
                        switch (global.status) {
                            case self.Status.SUCCESS:
                                session.onRequestSuccess(global.content);
                                break;
                            case self.Status.ERROR:
                            case self.Status.INVALID_REQUEST:
                                session.onRequestFail();
                        }
                    });
                }),
                (Agent.prototype.onRequestSuccess = function(options) {
                    if (
                        ((this.info = options.info),
                        (this.msg = options.msg),
                        '0' !== options.info)
                    ) {
                        return void this.onRequestFail();
                    }
                    this.ips = options.ips.slice();
                    this.ipdomains =
                        null != options.ipdomains
                            ? options.ipdomains.slice()
                            : [];
                    var objectNameLen = options.msg.length;
                    this.pwd = options.msg.substring(6, objectNameLen - 4);
                    this.dispatchEventWith(
                        egret.Event.COMPLETE,
                        false,
                        this.successEventData
                    );
                }),
                (Agent.prototype.onRequestFail = function() {
                    this.dispatchEventWith(
                        egret.Event.COMPLETE,
                        false,
                        this.failEventData
                    );
                }),
                Object.defineProperty(Agent.prototype, 'successEventData', {
                    get: function() {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(Agent.prototype, 'failEventData', {
                    get: function() {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Agent
            );
        })(Server.SingletonDispatcher);
        self.DoForwardFetcher = t;
        __reflect(t.prototype, 'Core.AGWorker.DoForwardFetcher');
    })((t = Server.AGWorker || (Server.AGWorker = {})));
})(Core || (Core = {}));
!(function(obj) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(parent) {
            /**
             * @return {?}
             */
            function Page() {
                return (
                    (null !== parent && parent.apply(this, arguments)) || this
                );
            }
            return (
                __extends(Page, parent),
                (Page.prototype.$ = function(stream) {
                    parent.prototype.$.call(this, stream);
                    this.pid = stream.readUTFBytes(10);
                    this.pcUsername = stream.readUTFBytes(obj.la);
                }),
                Page
            );
        })(HTMLSectionBuilder.Ln);
        HTMLSectionBuilder.Uu = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ClientMobileLoginResp');
    })((t = obj.Network || (obj.Network = {})));
})(Core || (Core = {}));
!(function(canCreateDiscussions) {
    var e;
    !(function(types) {
        /**
         * @param {?} code
         * @return {?}
         */
        function TclResult(code) {
            return Event.ECHO <= code && code <= Event.WEBSOCKET;
        }
        /**
         * @param {?} ch
         * @return {?}
         */
        function genResource(ch) {
            return wrappedLineExtent.GET <= ch && ch <= wrappedLineExtent.POST;
        }
        /**
         * @param {?} r
         * @return {?}
         */
        function start(r) {
            return s.TEXT <= r && r <= s.XML;
        }
        var Event;
        !(function(ErrorType) {
            /** @type {string} */
            ErrorType[(ErrorType.ECHO = 0)] = 'ECHO';
            /** @type {string} */
            ErrorType[(ErrorType.HTTP = 1)] = 'HTTP';
            /** @type {string} */
            ErrorType[(ErrorType.WEBSOCKET = 2)] = 'WEBSOCKET';
        })((Event = types.Module || (types.Module = {})));
        /** @type {function(?): ?} */
        types.isModuleValid = TclResult;
        var wrappedLineExtent;
        !(function(options) {
            /** @type {string} */
            options[(options.GET = 0)] = 'GET';
            /** @type {string} */
            options[(options.POST = 1)] = 'POST';
        })((wrappedLineExtent = types.Method || (types.Method = {})));
        /** @type {function(?): ?} */
        types.isMethodValid = genResource;
        var s;
        !(function(ContentType) {
            /** @type {string} */
            ContentType[(ContentType.TEXT = 0)] = 'TEXT';
            /** @type {string} */
            ContentType[(ContentType.JSON = 1)] = 'JSON';
            /** @type {string} */
            ContentType[(ContentType.XML = 2)] = 'XML';
        })((s = types.TargetType || (types.TargetType = {})));
        /** @type {function(?): ?} */
        types.isTargetTypeValid = start;
        var a;
        !(function(exports) {
            /** @type {string} */
            exports[(exports.SUCCESS = 0)] = 'SUCCESS';
            /** @type {string} */
            exports[(exports.ERROR = 1)] = 'ERROR';
            /** @type {string} */
            exports[(exports.INVALID_REQUEST = 2)] = 'INVALID_REQUEST';
        })((a = types.Status || (types.Status = {})));
    })(
        (e =
            canCreateDiscussions.AGWorker ||
            (canCreateDiscussions.AGWorker = {}))
    );
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(selector) {}),
                Page
            );
        })(HTMLSectionBuilder.ResponseBase);
        HTMLSectionBuilder.pe = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.UnknownResp');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(value) {
    var t;
    !(function(Step) {
        var Side = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.loginname = stream.readUTFBytes(value.la);
                    if ('' === this.loginname) {
                        this.loginname = value.LoginStore.instance.loginName;
                    }
                    this.Code = stream.readInt();
                }),
                Page
            );
        })(Step.ResponseBase);
        Step.Fu = Side;
        __reflect(Side.prototype, 'Core.Network.ChatDisableKeyResp');
    })((t = value.Network || (value.Network = {})));
})(Core || (Core = {}));
!(function(scope) {
    /**
     * @param {!Object} name
     * @return {?}
     */
    function query(name) {
        /** @type {!RegExp} */
        var e = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        /** @type {(Array<string>|null)} */
        var m = location.search.substr(1).match(e);
        return m && m.length >= 2 ? decodeURIComponent(m[2]) : null;
    }
    var GridStack = (function() {
        /**
         * @return {undefined}
         */
        function self() {}
        return (
            Object.defineProperty(self, 'device', {
                get: function() {
                    return this.getStringByName('device');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'env', {
                get: function() {
                    return this.getStringByName('env');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'useSSL', {
                get: function() {
                    return this.getBooleanByName('useSSL');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'wsProtocol', {
                get: function() {
                    return this.useSSL ? 'wss://' : 'ws://';
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'version', {
                get: function() {
                    return this.getStringByName('version');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'isProd', {
                get: function() {
                    return this.env === scope.ENV_PROD;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'pid', {
                get: function() {
                    return this.getStringByName('pid', 'TST');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'username', {
                get: function() {
                    return this.getStringByName('username');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'doForward', {
                get: function() {
                    return this.getStringByName('doForward');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'lang', {
                get: function() {
                    return this.getStringByName('lang');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'directEnterId', {
                get: function() {
                    return this.getStringByName('directEnterId');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'domainName', {
                get: function() {
                    return this.getStringByName('dm');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'webRoot', {
                get: function() {
                    return location.protocol + '//' + location.host;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'cdnConfig', {
                get: function() {
                    return this.gcDataMap.get('cdn');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'showLogin', {
                get: function() {
                    return !this.getBooleanByName('hideLogin');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'cryptoEnabled', {
                get: function() {
                    return this.getBooleanByName('cryptoEnabled');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'videoCryptoEnabled', {
                get: function() {
                    return this.getBooleanByName('videoCryptoEnabled');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'urlEncrypt', {
                get: function() {
                    return this.getStringByName('urlEncrypt').split(',');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'rpEnabled', {
                get: function() {
                    return this.getBooleanByName('rpEnabled');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'rpRecordEnabled', {
                get: function() {
                    return this.getBooleanByName('rpRecordEnabled');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'testAccPrefix', {
                get: function() {
                    return this.getStringByName('testAccPrefix');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'testAccNum', {
                get: function() {
                    return this.getStringByName('testAccNum');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'showSocketLog', {
                get: function() {
                    return this.getBooleanByName('showSocketLog');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'ruleDomain', {
                get: function() {
                    return this.getStringByName('ruleDomain');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'dnsapiEnabled', {
                get: function() {
                    return (
                        this.getBooleanByName('dnsapiEnabled') && this.isProd
                    );
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'silentLoad', {
                get: function() {
                    var end = this.gcDataMap.get('silentLoad');
                    return end ? end : [];
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'password', {
                get: function() {
                    return this.getStringByName('password');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'dnsConfig', {
                get: function() {
                    return this.getStringByName('dnsConfig');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'isPcVersion', {
                get: function() {
                    return this.getBooleanByName('isPcVersion');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'nickname', {
                get: function() {
                    return this.getStringByName('nick');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'userFlag', {
                get: function() {
                    return this.getIntegerByName('userFlag');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'vType', {
                get: function() {
                    return this.getIntegerByName('vType');
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(self, 'needAirLogin', {
                get: function() {
                    return this.pid && 'null' === this.gcDataMap.get('pid');
                },
                enumerable: true,
                configurable: true
            }),
            (self.getStringByName = function(name, decimal) {
                if (void 0 === decimal) {
                    /** @type {string} */
                    decimal = '';
                }
                var prev = query(name);
                return prev && 'null' !== prev
                    ? prev
                    : this.gcDataMap
                        ? ((prev = this.gcDataMap.get(name)),
                          prev && 'null' !== prev ? prev : decimal)
                        : decimal;
            }),
            (self.getBooleanByName = function(key) {
                var x = query(key);
                var i = this.gcDataMap && this.gcDataMap.get(key);
                return 'true' === x || !!i;
            }),
            (self.getIntegerByName = function(method, submethods) {
                if (void 0 === submethods) {
                    /** @type {number} */
                    submethods = 0;
                }
                var value = query(method);
                return value && 'null' !== value
                    ? parseInt(value)
                    : this.gcDataMap
                        ? this.gcDataMap.get(method)
                        : submethods;
            }),
            (self.updateBalance = function(balance) {
                if (VideoGameCore.UserStore.instance) {
                    VideoGameCore.UserStore.instance.updateBalanceFromThridGame(
                        balance
                    );
                }
            }),
            self
        );
    })();
    scope.ExternalData = GridStack;
    __reflect(GridStack.prototype, 'Core.ExternalData');
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.CmdRequest = stream.readInt();
                    this.Code = stream.readInt();
                }),
                Page
            );
        })(HTMLSectionBuilder.ResponseBase);
        HTMLSectionBuilder.Ku = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ChatErrorResp');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(obj) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.code = stream.readInt();
                    this.vid = stream.readUTFBytes(obj._n);
                    this.deviceType = stream.readByte();
                }),
                Page
            );
        })(HTMLSectionBuilder.ResponseBase);
        HTMLSectionBuilder.Yu = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ChatLoginServerExtResp');
    })((t = obj.Network || (obj.Network = {})));
})(Core || (Core = {}));
!(function(obj) {
    var t;
    !(function(ns) {
        var BaseRouter = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.vid = stream.readUTFBytes(obj._n);
                    this.tableCode = stream.readUTFBytes(obj.va);
                    this.seatNumber = stream.readByte();
                    this.temp_msgID = stream.readInt();
                    this.msgID = stream.readInt();
                    this.sender_loginname = stream.readUTFBytes(obj.la);
                    var board;
                    board = stream.readUTFBytes(obj.ma);
                    /** @type {string} */
                    this.sender_nickname = '';
                    /** @type {number} */
                    var y = 0;
                    for (; y < board.length; y++) {
                        if (board.charCodeAt(y) > 0) {
                            this.sender_nickname =
                                this.sender_nickname +
                                '' +
                                board.slice(y, y + 1);
                        }
                    }
                    this.msgCodeLen = stream.readInt();
                    this.message = stream.readUTFBytes(this.msgCodeLen);
                    if (obj.ExternalData.showSocketLog) {
                        dclib(egret.getQualifiedClassName(this), this);
                    }
                }),
                (Page.prototype.getHex = function(data, db, q, size) {
                    if (void 0 === size) {
                        /** @type {number} */
                        size = 0;
                    }
                    if (size > 0) {
                        data.position += size;
                    }
                    /** @type {string} */
                    var s = '';
                    /** @type {number} */
                    var threshold = 0;
                    for (; db > threshold; threshold++) {
                        var number = data.readUnsignedByte().toString(16);
                        /** @type {string} */
                        s =
                            s +
                            ((q ? '%' : '') +
                                (1 == number.length ? 0 + number : number));
                    }
                    return q ? s.toLocaleUpperCase() : s;
                }),
                Page
            );
        })(ns.ResponseBase);
        ns.qu = BaseRouter;
        __reflect(BaseRouter.prototype, 'Core.Network.ChatMessageListResp');
    })((t = obj.Network || (obj.Network = {})));
})(Core || (Core = {}));
!(function(obj) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.vid = stream.readUTFBytes(obj._n);
                    this.temp_msgID = stream.readInt();
                    this.msgID = stream.readInt();
                    this.sender_loginname = stream.readUTFBytes(obj.la);
                    if (obj.ExternalData.showSocketLog) {
                        dclib(egret.getQualifiedClassName(this), this);
                    }
                }),
                Page
            );
        })(HTMLSectionBuilder.ResponseBase);
        HTMLSectionBuilder.Wu = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Network.ChatMessageRemoveResp');
    })((t = obj.Network || (obj.Network = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(data) {
        /**
         * @param {string} locale
         * @return {?}
         */
        function init(locale) {
            /** @type {string} */
            var prefix = '';
            return (
                'hans' == locale
                    ? (prefix = 'ZH')
                    : 'hant' == locale
                        ? (prefix = 'TR')
                        : 'en' == locale && (prefix = 'EN'),
                prefix
            );
        }
        var Gift = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.version = stream.readInt();
                    var len = stream.readInt();
                    var tranDuration = (new egret.ByteArray(),
                    stream.readUTFBytes(len));
                    this.parseConfigXML(tranDuration);
                    if (exports.ExternalData.showSocketLog) {
                        dclib(egret.getQualifiedClassName(this), this);
                    }
                }),
                (Page.prototype.parseConfigXML = function(str) {
                    var b;
                    /** @type {!Array} */
                    var new_broadcasts = [];
                    var mm = new exports.HashMap();
                    var result = exports.XMLReader.read(
                        exports.parseXML(str)
                    ).find('cmds');
                    if (result.length > 0) {
                        result[0].find('cmd').forEach(function(t) {
                            b = new Bundle();
                            /** @type {number} */
                            b.index = parseInt(t.attr('id'));
                            b.gameType = t.attr('gametype');
                            t.find('lang').forEach(function(t) {
                                var oldCondition = t.attr('value');
                                if ('EN' == oldCondition) {
                                    b.msgEn = exports.pasteHtmlToString(
                                        t.attr('str')
                                    );
                                } else {
                                    if ('ZH' == oldCondition) {
                                        b.msgZh = exports.pasteHtmlToString(
                                            t.attr('str')
                                        );
                                    } else {
                                        if ('TR' == oldCondition) {
                                            b.msgTr = exports.pasteHtmlToString(
                                                t.attr('str')
                                            );
                                        }
                                    }
                                }
                            }, this);
                            b.gameType.split(',').forEach(function(a) {
                                if (mm.has(a)) {
                                    mm.get(a).push(b);
                                } else {
                                    mm.set(a, [b]);
                                }
                            }, this);
                            new_broadcasts.push(b);
                        }, this);
                    }
                    this.chatInfosMap = mm;
                    /** @type {!Array} */
                    this.chatInfos = new_broadcasts;
                }),
                (Page.prototype.getHex = function(data, db, q, size) {
                    if (void 0 === size) {
                        /** @type {number} */
                        size = 0;
                    }
                    if (size > 0) {
                        data.position += size;
                    }
                    /** @type {string} */
                    var s = '';
                    /** @type {number} */
                    var threshold = 0;
                    for (; db > threshold; threshold++) {
                        var number = data.readUnsignedByte().toString(16);
                        /** @type {string} */
                        s =
                            s +
                            ((q ? '%' : '') +
                                (1 == number.length ? 0 + number : number));
                    }
                    return q ? s.toLocaleUpperCase() : s;
                }),
                Page
            );
        })(data.ResponseBase);
        data.rc = Gift;
        __reflect(Gift.prototype, 'Core.Network.ChatQuickMessageConfigResp');
        /** @type {function(string): ?} */
        data.languageString2Type = init;
        var Bundle = (function() {
            /**
             * @return {undefined}
             */
            function WorkerDomAdapter() {}
            return (
                (WorkerDomAdapter.prototype.messageByLanguageString = function(
                    i
                ) {
                    /** @type {string} */
                    var th_field = '';
                    return (th_field =
                        i == exports.LANG_ZH_CONF
                            ? this.msgZh
                            : i == exports.LANG_TR_CONF
                                ? this.msgTr
                                : this.msgEn);
                }),
                (WorkerDomAdapter.prototype.messageByLanguageType = function(
                    canCreateDiscussions
                ) {
                    /** @type {string} */
                    var th_field = '';
                    return (th_field =
                        'hans' == canCreateDiscussions
                            ? this.msgZh
                            : 'hant' == canCreateDiscussions
                                ? this.msgTr
                                : this.msgEn);
                }),
                (WorkerDomAdapter.prototype.typeByLanguageType = function(
                    canCreateDiscussions
                ) {
                    switch (canCreateDiscussions) {
                        case exports.LANG_HANS:
                            return exports.LANG_ZH_CONF;
                        case exports.LANG_HANT:
                            return exports.LANG_TR_CONF;
                        case exports.LANG_EN:
                            return exports.LANG_EN_CONF;
                    }
                    return exports.LANG_EN_CONF;
                }),
                Object.defineProperty(WorkerDomAdapter.prototype, 'message', {
                    get: function() {
                        return this.messageByLanguageType(
                            exports.LocalizeStore.instance.lang
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(WorkerDomAdapter.prototype, 'lang', {
                    get: function() {
                        return this.typeByLanguageType(
                            exports.LocalizeStore.instance.lang
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                WorkerDomAdapter
            );
        })();
        data.ChatQuickMessageInfo = Bundle;
        __reflect(Bundle.prototype, 'Core.Network.ChatQuickMessageInfo');
    })((t = exports.Network || (exports.Network = {})));
})(Core || (Core = {}));
!(function(obj) {
    var t;
    !(function(options) {
        var MultipleSelection = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.vid = stream.readUTFBytes(obj._n);
                    this.tableCode = stream.readUTFBytes(obj.va);
                    this.seatNumber = stream.readByte();
                    this.temp_msgID = stream.readInt();
                    this.msgID = stream.readInt();
                    this.sender_loginname = stream.readUTFBytes(obj.la);
                    var board = stream.readUTFBytes(obj.ma);
                    /** @type {string} */
                    this.sender_nickname = '';
                    /** @type {number} */
                    var y = 0;
                    for (; y < board.length; y++) {
                        if (board.charCodeAt(y) > 0) {
                            this.sender_nickname =
                                this.sender_nickname +
                                '' +
                                board.slice(y, y + 1);
                        }
                    }
                    this.cmdID = stream.readInt();
                    this.lang = stream.readUTFBytes(2);
                    if (obj.ExternalData.showSocketLog) {
                        dclib(egret.getQualifiedClassName(this), this);
                    }
                }),
                Page
            );
        })(options.ResponseBase);
        options.nc = MultipleSelection;
        __reflect(
            MultipleSelection.prototype,
            'Core.Network.ChatQuickMessageResp'
        );
    })((t = obj.Network || (obj.Network = {})));
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(options) {
        var type = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.decryptKey = new egret.ByteArray();
                    /** @type {number} */
                    var e = 0;
                    for (; 4 > e; e++) {
                        this.decryptKey.writeByte(stream.readByte());
                    }
                }),
                Page
            );
        })(options.ResponseBase);
        options.ac = type;
        __reflect(type.prototype, 'Core.Network.CryptoBroadcastKeyResp');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(browser) {
        var Baidu = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(s) {
                    var self = this.context.decryptBroadcastKey;
                    if (!self || 0 === self.length) {
                        return void console.error('No decypt token found!');
                    }
                    this.payloadBytes = new egret.ByteArray();
                    /** @type {number} */
                    var slideIndex = 0;
                    for (; slideIndex < s.length - 12; slideIndex++) {
                        /** @type {number} */
                        self.position = slideIndex % self.length;
                        this.payloadBytes.writeByte(
                            s.readByte() ^ self.readByte()
                        );
                    }
                }),
                Page
            );
        })(browser.ResponseBase);
        browser.uc = Baidu;
        __reflect(Baidu.prototype, 'Core.Network.CryptoBrodcastResp');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(resp) {
        var OK = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(stream) {
                    this.type = stream.readByte();
                    this.cryptoKey = new egret.ByteArray();
                    /** @type {number} */
                    var e = 0;
                    for (; 4 > e; e++) {
                        this.cryptoKey.writeByte(stream.readByte());
                    }
                }),
                Page
            );
        })(resp.ResponseBase);
        resp.fc = OK;
        __reflect(OK.prototype, 'Core.Network.CryptoUserKeyResp');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(options) {
    var e;
    !(function(msg) {
        var cc = (function(Base) {
            /**
             * @return {?}
             */
            function Page() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Page, Base),
                (Page.prototype.$ = function(s) {
                    var self = this.context.decryptUserKey;
                    if (!self || 0 === self.length) {
                        return void console.error('No decypt token found!');
                    }
                    this.payloadBytes = new egret.ByteArray();
                    /** @type {number} */
                    var slideIndex = 0;
                    for (; slideIndex < s.length - 12; slideIndex++) {
                        /** @type {number} */
                        self.position = slideIndex % self.length;
                        this.payloadBytes.writeByte(
                            s.readByte() ^ self.readByte()
                        );
                    }
                }),
                Page
            );
        })(msg.ResponseBase);
        msg.Cc = cc;
        __reflect(cc.prototype, 'Core.Network.CryptoUserResp');
    })((e = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(params) {
        var e = (function(self) {
            /**
             * @return {?}
             */
            function d() {
                return (null !== self && self.apply(this, arguments)) || this;
            }
            return (
                __extends(d, self),
                Object.defineProperty(d, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (d.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(d.prototype, 'urlList', {
                    get: function() {
                        return exports.Config.HostConfig.instance.getHost(
                            'chat'
                        ).urlList;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(d.prototype, 'respMap', {
                    get: function() {
                        return (
                            this._respMap ||
                                ((this._respMap = new exports.HashMap()),
                                this._respMap.set(
                                    exports.Protocol.Ru,
                                    params.Ku
                                ),
                                this._respMap.set(
                                    exports.Protocol.Bu,
                                    params.qu
                                ),
                                this._respMap.set(
                                    exports.Protocol.Lu,
                                    params.rc
                                ),
                                this._respMap.set(
                                    exports.Protocol.CHAT_DISABLE_KEY,
                                    params.Fu
                                ),
                                this._respMap.set(
                                    exports.Protocol.ju,
                                    params.nc
                                ),
                                this._respMap.set(
                                    exports.Protocol.CHAT_REMOVE_MESSAGE,
                                    params.Wu
                                ),
                                this._respMap.set(
                                    exports.Protocol.Iu,
                                    params.Yu
                                )),
                            this._respMap
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                (d.prototype.onConnected = function(event) {
                    self.prototype.onConnected.call(this, event);
                    d.instance.writeBytes(
                        exports.APIManager.getCMDChatLoginServerExt(
                            exports.LoginStore.instance.loginName,
                            exports.LoginStore.instance.token,
                            exports.CHAT_PLAZA_LOGIN_VID
                        )
                    );
                }),
                Object.defineProperty(d.prototype, 'tag', {
                    get: function() {
                        return '[ChatSocket]';
                    },
                    enumerable: true,
                    configurable: true
                }),
                d
            );
        })(params.WebSocketBase);
        params.ChatSocket = e;
        __reflect(e.prototype, 'Core.Network.ChatSocket');
    })((t = exports.Network || (exports.Network = {})));
})(Core || (Core = {}));
!(function(options) {
    var t;
    !(function(state) {
        var t = (function(Connection) {
            /**
             * @param {?} callback
             * @param {?} user
             * @param {!Object} cb
             * @param {!Object} value
             * @return {?}
             */
            function self(callback, user, cb, value) {
                var self = Connection.call(this, callback, user, cb) || this;
                return (
                    (self.context = value),
                    options.ExternalData.cryptoEnabled &&
                        (cb.set(options.Protocol.Nu, state.ac),
                        cb.set(options.Protocol.Mu, state.uc),
                        cb.set(options.Protocol.Du, state.fc),
                        cb.set(options.Protocol.CRYPTO_USER_SR, state.Cc)),
                    self.addEventListener(
                        state.EVENT_RECEIVE_PACKET,
                        self.onPacket,
                        self
                    ),
                    self
                );
            }
            return (
                __extends(self, Connection),
                (self.prototype.writeBytes = function(data, length, offset) {
                    /** @type {number} */
                    data.position = 0;
                    var sceneUid = data.readInt();
                    if (
                        options.ExternalData.cryptoEnabled &&
                        this.context.getEncryptIDs().indexOf(sceneUid) >= 0
                    ) {
                        data = this.encryptPacket(data);
                    }
                    Connection.prototype.writeBytes.call(
                        this,
                        data,
                        length,
                        offset
                    );
                }),
                (self.prototype.onConnected = function(event) {
                    Connection.prototype.onConnected.call(this, event);
                    var stream = new egret.ByteArray();
                    stream.writeDouble(options.LoginStore.instance.token[0]);
                    this.encryptUserKey = new egret.ByteArray(
                        stream.buffer.slice(0, 4)
                    );
                }),
                (self.prototype.getPacketData = function(init) {
                    var hook = Connection.prototype.getPacketData.call(
                        this,
                        init
                    );
                    return options.ExternalData.cryptoEnabled &&
                        this.context.getDecryptIDs().indexOf(hook.respId) >= 0
                        ? (dclib('block', hook), null)
                        : hook;
                }),
                (self.prototype.getPurePacketData = function(p1__3354_SHARP_) {
                    return Connection.prototype.getPacketData.call(
                        this,
                        p1__3354_SHARP_
                    );
                }),
                (self.prototype.onPacket = function(packet) {
                    var msg = packet.data;
                    switch (msg.respId) {
                        case options.Protocol.Nu:
                            var facade = msg;
                            this.decryptBroadcastKey = facade.decryptKey;
                            break;
                        case options.Protocol.Mu:
                            var message = msg;
                            if (
                                message.payloadBytes &&
                                message.payloadBytes.length >= options._u
                            ) {
                                var artistTrack = this.getPurePacketData(
                                    message.payloadBytes
                                );
                                if (artistTrack) {
                                    dclib('decrypt broadcast', artistTrack);
                                    this.dispatchEventWith(
                                        state.EVENT_RECEIVE_PACKET,
                                        false,
                                        artistTrack
                                    );
                                }
                            }
                            break;
                        case options.Protocol.Du:
                            var newMsg = msg;
                            dclib('userKeyResp: ' + newMsg.type, newMsg);
                            if (0 === newMsg.type) {
                                dclib(
                                    this.tag +
                                        ' session token:' +
                                        options.LoginStore.instance.tokenStr
                                );
                                dclib(
                                    this.tag +
                                        ' oldkey:' +
                                        this.bytesToHexStr(this.encryptUserKey)
                                );
                                dclib(
                                    this.tag +
                                        ' newkey:' +
                                        this.bytesToHexStr(newMsg.cryptoKey)
                                );
                                this.writeBytes(
                                    options.APIManager.getCMDCryptoKeyACK(
                                        this.encryptUserKey,
                                        newMsg.cryptoKey
                                    )
                                );
                                this.encryptUserKey = newMsg.cryptoKey;
                            } else {
                                if (1 === newMsg.type) {
                                    this.decryptUserKey = newMsg.cryptoKey;
                                }
                            }
                            break;
                        case options.Protocol.CRYPTO_USER_SR:
                            var obj = msg;
                            if (
                                obj.payloadBytes &&
                                obj.payloadBytes.length >= options._u
                            ) {
                                artistTrack = this.getPurePacketData(
                                    obj.payloadBytes
                                );
                                if (artistTrack) {
                                    dclib('decrypt user', artistTrack);
                                    this.dispatchEventWith(
                                        state.EVENT_RECEIVE_PACKET,
                                        false,
                                        artistTrack
                                    );
                                }
                            }
                    }
                }),
                (self.prototype.encryptPacket = function(bytes) {
                    var self = options.startCMD(
                        options.Protocol.CRYPTO_USER_SR
                    );
                    var s = this.encryptUserKey;
                    /** @type {number} */
                    bytes.position = 0;
                    /** @type {number} */
                    var i = 0;
                    for (; i < bytes.length; i++) {
                        /** @type {number} */
                        s.position = i % s.length;
                        self.writeByte(bytes.readByte() ^ s.readByte());
                    }
                    return options.endCMD(self);
                }),
                (self.prototype.bytesToHexStr = function(source) {
                    /** @type {string} */
                    var pix_color = '';
                    /** @type {number} */
                    source.position = 0;
                    /** @type {number} */
                    var last = 0;
                    for (; last < source.length; last++) {
                        /** @type {number} */
                        var default_favicon = 255 & source.readByte();
                        /** @type {string} */
                        var s =
                            '0' + default_favicon.toString(16).toLowerCase();
                        /** @type {string} */
                        pix_color = pix_color + s.substr(s.length - 2, 2);
                    }
                    return pix_color;
                }),
                self
            );
        })(state.DCSocketUnit);
        state.CryptoSocketUnit = t;
        __reflect(t.prototype, 'Core.Network.CryptoSocketUnit');
    })((t = options.Network || (options.Network = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(Knex) {
        var Client = (function(Base) {
            /**
             * @return {?}
             */
            function exports() {
                var self = Base.call(this) || this;
                return (
                    (self.sharedSequnce = 0),
                    (self.jsWorker = new Worker(
                        'resource/workers/ag-worker.js'
                    )),
                    (self.callbackMap = new exports.HashMap()),
                    self.jsWorker.addEventListener('message', function(s) {
                        var op = s.data;
                        var originalHandleOplogEntryQuerying = self.callbackMap.get(
                            op.sequence
                        );
                        if (originalHandleOplogEntryQuerying) {
                            originalHandleOplogEntryQuerying.call(null, op);
                            self.callbackMap['delete'](op.sequence);
                        }
                    }),
                    self
                );
            }
            return (
                __extends(exports, Base),
                (exports.prototype.sendData = function(value, param) {
                    this.callbackMap.set(value.sequence, param);
                    this.jsWorker.postMessage(value);
                }),
                (exports.prototype.sendHttpRequest = function(url, message) {
                    this.sendData(url, message);
                }),
                Object.defineProperty(exports, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (exports.init = function() {
                    return this.initInstance(this);
                }),
                exports
            );
        })(exports.SingletonDispatcher);
        Knex.Client = Client;
        __reflect(Client.prototype, 'Core.AGWorker.Client');
    })((t = exports.AGWorker || (exports.AGWorker = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function($scope) {
        /**
         * @param {!Object} obj
         * @param {string} url
         * @return {?}
         */
        function link(obj, url) {
            /** @type {string} */
            var id = 'connectCount';
            if (
                (url || ((url = obj.url), (id = 'connectCountImg')),
                /^https{0,1}:/.test(url))
            ) {
                return url;
            }
            if (
                !exports.ExternalData.cdnConfig ||
                !exports.ExternalData.cdnConfig.enabled
            ) {
                return url;
            }
            if ((start(), $scope.domainList.length <= 0)) {
                return url;
            }
            var r;
            var i = obj[id];
            if (i) {
                if (
                    (i > 1 &&
                        ((r = $scope.cdnCountMap.get(i - 1) || 0),
                        r++,
                        $scope.cdnCountMap.set(i - 1, r)),
                    i > $scope.domainList.length)
                ) {
                    return url;
                }
            } else {
                /** @type {number} */
                i = 1;
            }
            for (
                ;
                i <= $scope.domainList.length &&
                ((r = $scope.cdnCountMap.get(i) || 0),
                exports.ExternalData.cdnConfig.maxRetry &&
                    !(r < exports.ExternalData.cdnConfig.maxRetry));

            ) {
                i++;
            }
            if (i > $scope.domainList.length) {
                return url;
            }
            var $mime_type = $scope.domainList[i - 1];
            return (
                (obj[id] = i + 1),
                [
                    $mime_type,
                    exports.ExternalData.cdnConfig.subDomain,
                    url
                ].join('/')
            );
        }
        /**
         * @return {?}
         */
        function start() {
            if (!$scope.domainList) {
                if (
                    (($scope.onCDN = exports.ExternalData.cdnConfig.enabled),
                    $scope.onCDN)
                ) {
                    $scope.domainList = exports.ExternalData.cdnConfig.domainList.filter(
                        function(pathToDestinationFile) {
                            return 'https:' === location.protocol
                                ? !/^http:/.test(pathToDestinationFile)
                                : true;
                        }
                    );
                    /** @type {number} */
                    var k = 0;
                    for (; k < $scope.domainList.length; k++) {
                        var e = $scope.domainList[k];
                        if (!/^https{0,1}:/.test(e)) {
                            /** @type {string} */
                            $scope.domainList[k] = '//' + e;
                        }
                    }
                } else {
                    /** @type {!Array} */
                    $scope.domainList = [];
                }
            }
            return $scope.domainList;
        }
        /** @type {boolean} */
        $scope.onCDN = false;
        $scope.cdnCountMap = new exports.HashMap();
        /** @type {function(!Object, string): ?} */
        $scope.getCDNResUrl = link;
        /** @type {function(): ?} */
        $scope.getDomainList = start;
    })((t = exports.AnalyzerUtils || (exports.AnalyzerUtils = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(result) {
        var model = (function(Base) {
            /**
             * @return {?}
             */
            function Agent() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Agent, Base),
                Object.defineProperty(Agent, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(Agent.prototype, 'urlList', {
                    get: function() {
                        return exports.Config.HostConfig.instance.getHost(
                            'login'
                        ).urlList;
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(Agent.prototype, 'respMap', {
                    get: function() {
                        return (
                            this._respMap ||
                                ((this._respMap = new exports.HashMap()),
                                this._respMap.set(
                                    exports.Protocol.Ou,
                                    result.Hu
                                ),
                                this._respMap.set(
                                    exports.Protocol.xu,
                                    result.Uu
                                ),
                                this._respMap.set(
                                    exports.Protocol.Tu,
                                    result.Ln
                                )),
                            this._respMap
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                Object.defineProperty(Agent.prototype, 'tag', {
                    get: function() {
                        return '[Login]';
                    },
                    enumerable: true,
                    configurable: true
                }),
                Agent
            );
        })(result.WebSocketBase);
        result.LoginSocket = model;
        __reflect(model.prototype, 'Core.Network.LoginSocket');
    })((t = exports.Network || (exports.Network = {})));
})(Core || (Core = {}));
!(function($) {
    var $mol_set_shim = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.loadFile = function(p, f, i) {
                if (this.fileDic[p.name]) {
                    return void f.call(i, p);
                }
                var ImageManager = this.getMyLoader();
                this.resItemDic[ImageManager.$hashCode] = {
                    item: p,
                    func: f,
                    thisObject: i
                };
                ImageManager.load($.AnalyzerUtils.getCDNResUrl(p));
            }),
            (WorkerDomAdapter.prototype.getMyLoader = function() {
                var httpLoader = this.recycler.pop();
                return (
                    httpLoader ||
                        ((httpLoader = new $.ImageLoader()),
                        httpLoader.addEventListener(
                            egret.Event.COMPLETE,
                            this.onLoadFinish,
                            this
                        ),
                        httpLoader.addEventListener(
                            egret.IOErrorEvent.IO_ERROR,
                            this.onLoadFinish,
                            this
                        )),
                    httpLoader
                );
            }),
            WorkerDomAdapter
        );
    })(RES.ImageAnalyzer);
    $.ImageAnalyzer = $mol_set_shim;
    __reflect($mol_set_shim.prototype, 'Core.ImageAnalyzer');
})(Core || (Core = {}));
!(function(window) {
    var ImageLoader = (function(Base) {
        /**
         * @return {?}
         */
        function IE9CSSLoader() {
            var elImage = Base.call(this) || this;
            return (elImage.crossOrigin = 'anonymous'), elImage;
        }
        return (
            __extends(IE9CSSLoader, Base),
            (IE9CSSLoader.prototype.load = function(file) {
                var undoManager = this;
                this.loadImage(file);
                var request = egret.setTimeout(
                    function() {
                        var fullArticle = undoManager.currentImage;
                        if (fullArticle) {
                            console.warn(fullArticle.src + ' timeout!');
                            /** @type {string} */
                            fullArticle.src = '';
                        }
                    },
                    this,
                    window.CDN_TIMEOUT
                );
                var onload = this.currentImage.onload;
                /**
                 * @param {?} image
                 * @return {undefined}
                 */
                this.currentImage.onload = function(image) {
                    egret.clearTimeout(request);
                    onload.call(this, image);
                };
            }),
            IE9CSSLoader
        );
    })(egret.ImageLoader);
    window.ImageLoader = ImageLoader;
    __reflect(ImageLoader.prototype, 'Core.ImageLoader');
})(Core || (Core = {}));
!(function(window) {
    var YM = (function() {
        /**
         * @param {number} value
         * @return {undefined}
         */
        function s(value) {
            if (void 0 === value) {
                /** @type {string} */
                value = '[Sound]';
            }
            /** @type {!Array} */
            this.soundResQueue = [];
            /** @type {boolean} */
            this.isLoading = false;
            /** @type {number} */
            this._volume = 0.5;
            /** @type {boolean} */
            this.isLooping = false;
            /** @type {number} */
            this.tag = value;
        }
        return (
            Object.defineProperty(s.prototype, 'volume', {
                get: function() {
                    return this._volume;
                },
                set: function(value) {
                    if (0 > value) {
                        /** @type {number} */
                        this._volume = 0;
                    } else {
                        if (value > 1) {
                            /** @type {number} */
                            this._volume = 1;
                        } else {
                            /** @type {number} */
                            this._volume = value;
                        }
                    }
                    if (this.currentSound) {
                        this.currentSound.setVolume(this._volume);
                    }
                },
                enumerable: true,
                configurable: true
            }),
            (s.prototype.play = function(fun) {
                return this.isLooping
                    ? void console.warn(this.tag + ' is looping, cannot play')
                    : void (this.currentSound || this.isLoading
                          ? this.soundResQueue.push(fun)
                          : this.playResAsync(fun));
            }),
            (s.prototype.playResAsync = function(callback) {
                var self = this;
                /** @type {boolean} */
                this.isLoading = true;
                /** @type {null} */
                this.stopCallback = null;
                RES.getResAsync(
                    callback,
                    function(canCreateDiscussions, isSlidingUp) {
                        if (((self.isLoading = false), self.stopCallback)) {
                            return (
                                self.stopCallback.call(null),
                                void (self.stopCallback = null)
                            );
                        }
                        self.currentSound = createjs.Sound.play(
                            callback,
                            null,
                            null,
                            null,
                            0,
                            self.volume
                        );
                        /**
                         * @param {?} retu_data
                         * @return {undefined}
                         */
                        var success = function(retu_data) {
                            self.currentSound.off('complete', success);
                            self.currentSound.destroy();
                            /** @type {null} */
                            self.currentSound = null;
                            if (self.soundResQueue.length > 0) {
                                self.play(self.soundResQueue.shift());
                            }
                        };
                        self.currentSound.on('complete', success);
                    },
                    this
                );
            }),
            (s.prototype.playLocalize = function(res) {
                this.play(
                    window.SoundManager.instance.translateRes(res, '_mp3')
                );
            }),
            (s.prototype.loop = function(t, dt) {
                var options = this;
                if (void 0 === dt) {
                    /** @type {number} */
                    dt = -1;
                }
                /** @type {boolean} */
                this.isLoading = true;
                /** @type {null} */
                this.stopCallback = null;
                RES.getResAsync(
                    t,
                    function() {
                        return (
                            (options.isLoading = false),
                            options.stopCallback
                                ? (options.stopCallback.call(null),
                                  void (options.stopCallback = null))
                                : ((options.currentSound = createjs.Sound.play(
                                      t,
                                      null,
                                      null,
                                      null,
                                      dt,
                                      options.volume
                                  )),
                                  void (options.isLooping = true))
                        );
                    },
                    this
                );
            }),
            (s.prototype.stop = function(callback) {
                if (void 0 === callback) {
                    /**
                     * @return {undefined}
                     */
                    callback = function() {};
                }
                if (this.isLoading) {
                    /** @type {string} */
                    this.stopCallback = callback;
                } else {
                    if (this.currentSound) {
                        this.currentSound.stop();
                        this.currentSound.destroy();
                        /** @type {null} */
                        this.currentSound = null;
                    }
                    callback.call(null);
                }
                /** @type {!Array} */
                this.soundResQueue = [];
                /** @type {boolean} */
                this.isLooping = false;
            }),
            s
        );
    })();
    window.SoundChannel = YM;
    __reflect(YM.prototype, 'Core.SoundChannel');
})(Core || (Core = {}));
!(function(data) {
    var SoundManager = (function(Base) {
        /**
         * @return {?}
         */
        function data() {
            var self = Base.call(this) || this;
            return (
                (self.enableSound = true),
                (self.enableBGM = true),
                (self.enableGameSound = false),
                (self.enableLiveSound = true),
                (self.enableVideoSound = false),
                (self._volume = 0.5),
                (self._bgm_volume = 0.5),
                (self._game_volume = 0.5),
                (self._live_volume = 0.5),
                (self.channelMap = new data.HashMap()),
                self
            );
        }
        return (
            __extends(data, Base),
            Object.defineProperty(data, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (data.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(data.prototype, 'volume', {
                get: function() {
                    return this._volume;
                },
                set: function(value) {
                    var that = this;
                    if (0 > value) {
                        /** @type {number} */
                        this._volume = 0;
                    } else {
                        if (value > 1) {
                            /** @type {number} */
                            this._volume = 1;
                        } else {
                            /** @type {number} */
                            this._volume = value;
                        }
                    }
                    this.channelMap.forEach(function(self) {
                        if (
                            self.tag == data.CHANNEL_TAG_DEFAULT ||
                            self.tag == data.CHANNEL_TAG_EFFECT
                        ) {
                            self.volume = that._volume;
                        }
                    }, this);
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(data.prototype, 'bgm_volume', {
                get: function() {
                    return this._bgm_volume;
                },
                set: function(num) {
                    if (0 > num) {
                        /** @type {number} */
                        this._bgm_volume = 0;
                    } else {
                        if (num > 1) {
                            /** @type {number} */
                            this._bgm_volume = 1;
                        } else {
                            /** @type {number} */
                            this._bgm_volume = num;
                        }
                    }
                    var cslItem = this.channelMap.get(data.CHANNEL_TAG_BGM);
                    if (cslItem) {
                        cslItem.volume = this._bgm_volume;
                    }
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(data.prototype, 'game_volume', {
                get: function() {
                    return this._game_volume;
                },
                set: function(num) {
                    if (0 > num) {
                        /** @type {number} */
                        this._game_volume = 0;
                    } else {
                        if (num > 1) {
                            /** @type {number} */
                            this._game_volume = 1;
                        } else {
                            /** @type {number} */
                            this._game_volume = num;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(data.prototype, 'live_volume', {
                get: function() {
                    return this._live_volume;
                },
                set: function(num) {
                    if (0 > num) {
                        /** @type {number} */
                        this._live_volume = 0;
                    } else {
                        if (num > 1) {
                            /** @type {number} */
                            this._live_volume = 1;
                        } else {
                            /** @type {number} */
                            this._live_volume = num;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            }),
            (data.prototype.setVolume = function(value, options) {
                switch (
                    (void 0 === options && (options = data.CHANNEL_TAG_DEFAULT),
                    options)
                ) {
                    case data.CHANNEL_TAG_BGM:
                        /** @type {number} */
                        this.bgm_volume = value;
                        break;
                    case data.CHANNEL_TAG_GAME:
                        /** @type {number} */
                        this.game_volume = value;
                        break;
                    case data.CHANNEL_TAG_LIVE:
                        /** @type {number} */
                        this.live_volume = value;
                        break;
                    default:
                        /** @type {number} */
                        this.volume = value;
                }
            }),
            (data.prototype.getVolume = function(name) {
                switch (
                    (void 0 === name && (name = data.CHANNEL_TAG_DEFAULT), name)
                ) {
                    case data.CHANNEL_TAG_BGM:
                        return this.bgm_volume;
                    case data.CHANNEL_TAG_GAME:
                        return this.game_volume;
                    case data.CHANNEL_TAG_LIVE:
                        return this.live_volume;
                    default:
                        return this.volume;
                }
            }),
            (data.prototype.setBgmVolume = function(value) {
                this.setVolume(value, data.CHANNEL_TAG_BGM);
            }),
            (data.prototype.getBgmVolume = function() {
                return this.getVolume(data.CHANNEL_TAG_BGM);
            }),
            (data.prototype.setGameVolume = function(value) {
                this.setVolume(value, data.CHANNEL_TAG_GAME);
            }),
            (data.prototype.getGameVolume = function() {
                return this.getVolume(data.CHANNEL_TAG_GAME);
            }),
            (data.prototype.setLiveVolume = function(value) {
                this.setVolume(value, data.CHANNEL_TAG_LIVE);
            }),
            (data.prototype.getLiveVolume = function() {
                return this.getVolume(data.CHANNEL_TAG_LIVE);
            }),
            (data.prototype.setSoundEnable = function(enable) {
                /** @type {boolean} */
                this.enableSound = enable;
                if (!this.enableSound) {
                    this.stop();
                }
            }),
            (data.prototype.getSoundEnable = function() {
                return this.enableSound;
            }),
            (data.prototype.setBGMEnable = function(canCreateDiscussions) {
                /** @type {boolean} */
                this.enableBGM = canCreateDiscussions;
                if (!this.enableBGM) {
                    this.stopBGM();
                }
            }),
            (data.prototype.getBGMEnable = function() {
                return this.enableBGM;
            }),
            (data.prototype.setGameSoundEnable = function(
                canCreateDiscussions
            ) {
                /** @type {boolean} */
                this.enableGameSound = canCreateDiscussions;
            }),
            (data.prototype.getGameSoundEnable = function() {
                return this.enableGameSound;
            }),
            (data.prototype.setLiveSoundEnable = function(
                canCreateDiscussions
            ) {
                /** @type {boolean} */
                this.enableLiveSound = canCreateDiscussions;
            }),
            (data.prototype.getLiveSoundEnable = function() {
                return this.enableLiveSound;
            }),
            (data.prototype.setVideoEnable = function(canCreateDiscussions) {
                /** @type {boolean} */
                this.enableVideoSound = canCreateDiscussions;
            }),
            (data.prototype.getVideoEnable = function() {
                return this.enableVideoSound;
            }),
            (data.prototype.getChannelByTag = function(value) {
                var result = this.channelMap.get(value);
                return (
                    result ||
                        ((result = new data.SoundChannel(value)),
                        (result.volume = this.getVolume(value)),
                        this.channelMap.set(value, result)),
                    result
                );
            }),
            (data.prototype.playBGM = function(value) {
                if (this.enableBGM) {
                    this.getChannelByTag(data.CHANNEL_TAG_BGM).loop(value);
                }
            }),
            (data.prototype.stopBGM = function() {
                this.stop(data.CHANNEL_TAG_BGM);
            }),
            (data.prototype.playEffect = function(x) {
                if (this.enableSound) {
                    var e = this.getChannelByTag(data.CHANNEL_TAG_EFFECT);
                    e.stop(function() {
                        e.play(x);
                    });
                }
            }),
            (data.prototype.playLocalizeEffect = function(t) {
                if (this.enableSound) {
                    var e = this.getChannelByTag(data.CHANNEL_TAG_EFFECT);
                    e.stop(function() {
                        e.playLocalize(t);
                    });
                }
            }),
            (data.prototype.play = function(fun, id) {
                if (void 0 === id) {
                    id = data.CHANNEL_TAG_DEFAULT;
                }
                if (this.enableSound) {
                    this.getChannelByTag(id).play(fun);
                }
            }),
            (data.prototype.playLocalize = function(file, uploadingObject) {
                if (void 0 === uploadingObject) {
                    uploadingObject = data.CHANNEL_TAG_DEFAULT;
                }
                if (this.enableSound) {
                    this.getChannelByTag(uploadingObject).playLocalize(file);
                }
            }),
            (data.prototype.stop = function(key) {
                if (void 0 === key) {
                    key = data.CHANNEL_TAG_DEFAULT;
                }
                this.getChannelByTag(key).stop();
                this.channelMap['delete'](key);
            }),
            Object.defineProperty(data.prototype, 'lang', {
                get: function() {
                    if (this.forceLang) {
                        return this.forceLang;
                    }
                    if (this._lang) {
                        return this._lang;
                    }
                    var syntax = data.StorageManager.instance.getItem(
                        data.LOCALKEY_LANG_SOUND
                    );
                    var lang = data.ExternalData.lang;
                    return (
                        data.LANG_CANDIDATE_LIST.indexOf(syntax) >= 0
                            ? (this._lang = syntax)
                            : data.LANG_CANDIDATE_LIST.indexOf(lang) >= 0
                                ? (this._lang = lang)
                                : (this._lang = data.LANG_DEFAULT),
                        this._lang
                    );
                },
                set: function(name) {
                    if (data.LANG_CANDIDATE_LIST.indexOf(name) < 0) {
                        console.warn('language ' + name + ' not support');
                    }
                    this._lang === name;
                    /** @type {string} */
                    this._lang = name;
                    data.StorageManager.instance.setItem(
                        data.LOCALKEY_LANG_SOUND,
                        name
                    );
                },
                enumerable: true,
                configurable: true
            }),
            (data.prototype.translateRes = function(value, min) {
                if (void 0 === min) {
                    /** @type {string} */
                    min = '';
                }
                /** @type {string} */
                var val = value + '_' + this.lang + min;
                return RES.hasRes(val)
                    ? val
                    : value + '_' + data.LANG_BACKUP + min;
            }),
            Object.defineProperty(data.prototype, 'forceLang', {
                get: function() {
                    return this._forceLang;
                },
                set: function(obj) {
                    if (obj && data.LANG_CANDIDATE_LIST.indexOf(obj) < 0) {
                        console.warn('language ' + obj + ' not support');
                    }
                    /** @type {!Object} */
                    this._forceLang = obj;
                },
                enumerable: true,
                configurable: true
            }),
            data
        );
    })(data.SingletonDispatcher);
    data.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, 'Core.SoundManager');
})(Core || (Core = {}));
!(function(exports) {
    var ChatStore = (function(Signal) {
        /**
         * @return {?}
         */
        function Controller() {
            var self = Signal.call(this) || this;
            return (
                (self._isReady = false),
                (self._disKey = -1),
                (self.seatNum = 0),
                (self.messageList = []),
                (self.socketList = [exports.Network.ChatSocket.init()]),
                (self.cacheChangeNickName = ''),
                exports.Network.ChatSocket.instance.addEventListener(
                    egret.Event.CLOSE,
                    self.onSocketClosed,
                    self
                ),
                self
            );
        }
        return (
            __extends(Controller, Signal),
            Object.defineProperty(Controller, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (Controller.init = function() {
                return this.initInstance(this);
            }),
            (Controller.prototype.onSocketClosed = function() {
                if (!exports.Network.ChatSocket.instance.connected) {
                    /** @type {boolean} */
                    this._isReady = false;
                    this.dispatchAction(Controller.EVENT_UPDATE_DISKEY);
                }
            }),
            (Controller.prototype.onSocketDie = function(canCreateDiscussions) {
                this.onSocketClosed();
            }),
            Object.defineProperty(Controller.prototype, 'isReady', {
                get: function() {
                    return this._isReady;
                },
                enumerable: true,
                configurable: true
            }),
            (Controller.prototype.onSocketData = function(msg, tag) {
                switch (msg.respId) {
                    case exports.Protocol.Iu:
                        /** @type {string} */
                        var code = msg;
                        if (0 == code.code) {
                            tag.writeBytes(
                                exports.APIManager.getCMDChatQuickMessageList(0)
                            );
                            if (this._vid) {
                                /** @type {boolean} */
                                this._isReady = true;
                                this.enterTable();
                            }
                            if ('' != this.cacheChangeNickName) {
                                this.changeNickname(this.cacheChangeNickName);
                            }
                        }
                        break;
                    case exports.Protocol.Ru:
                        /** @type {string} */
                        var state = msg;
                        switch (state.CmdRequest) {
                            case exports.Protocol.CHAT_LOGIN_SERVER:
                                if (0 == state.Code) {
                                    tag.writeBytes(
                                        exports.APIManager.getCMDChatQuickMessageList(
                                            0
                                        )
                                    );
                                    if (this._vid) {
                                        /** @type {boolean} */
                                        this._isReady = true;
                                        this.enterTable();
                                    }
                                    if ('' != this.cacheChangeNickName) {
                                        this.changeNickname(
                                            this.cacheChangeNickName
                                        );
                                    }
                                }
                                break;
                            case exports.Protocol.CHAT_NICKNAME_CHANGE:
                                if (0 !== state.Code) {
                                    dclib('change nickname fail');
                                    this.dispatchAction(
                                        Controller.EVENT_NICKNAME_ILLEGAL
                                    );
                                }
                        }
                        break;
                    case exports.Protocol.CHAT_DISABLE_KEY:
                        /** @type {string} */
                        var result = msg;
                        var courseSections = result.loginname;
                        if (
                            courseSections ===
                            exports.LoginStore.instance.loginName
                        ) {
                            this._disKey = result.Code;
                        }
                        this.dispatchAction(Controller.EVENT_UPDATE_DISKEY);
                        break;
                    case exports.Protocol.Lu:
                        /** @type {string} */
                        var _MESSAGE_TAG = msg;
                        this.chatInfos = _MESSAGE_TAG.chatInfos;
                        this.chatInfosMap = _MESSAGE_TAG.chatInfosMap;
                        this.dispatchAction(
                            Controller.EVENT_UPDATE_QUICK_MESSAGE
                        );
                        break;
                    case exports.Protocol.Bu:
                        /** @type {string} */
                        var message = msg;
                        var data = message.message;
                        if (data) {
                            this.messageList.push(
                                new Message(
                                    message.sender_loginname,
                                    message.sender_nickname,
                                    message.message,
                                    -1,
                                    message.temp_msgID,
                                    message.msgID
                                )
                            );
                        }
                        this.dispatchAction(Controller.EVENT_UPDATE_MESSAGE);
                        break;
                    case exports.Protocol.ju:
                        /** @type {string} */
                        var options = msg;
                        if (
                            this.chatInfos &&
                            this.chatInfos[options.cmdID - 1]
                        ) {
                            data = this.chatInfos[options.cmdID - 1].message;
                            this.messageList.push(
                                new Message(
                                    options.sender_loginname,
                                    options.sender_nickname,
                                    data,
                                    options.cmdID - 1,
                                    options.temp_msgID,
                                    options.msgID
                                )
                            );
                        }
                        this.dispatchAction(Controller.EVENT_UPDATE_MESSAGE);
                        break;
                    case exports.Protocol.CHAT_REMOVE_MESSAGE:
                        /** @type {string} */
                        var m = msg;
                        /** @type {number} */
                        var nClauseIdx = -1;
                        /** @type {number} */
                        var i = 0;
                        for (; i < this.messageList.length; i++) {
                            if (
                                this.messageList[i].temp_msgId ==
                                    m.temp_msgID &&
                                this.messageList[i].msgId == m.msgID
                            ) {
                                this.removedMsg = this.messageList[i];
                                /** @type {number} */
                                nClauseIdx = i;
                            }
                        }
                        if (-1 != nClauseIdx) {
                            this.messageList.splice(nClauseIdx, 1);
                        }
                        this.dispatchAction(Controller.EVENT_REMOVE_MESSAGE);
                }
            }),
            (Controller.prototype.connectServer = function() {
                exports.Network.ChatSocket.instance.autoConnect();
            }),
            (Controller.prototype.disconnectServer = function(query) {
                if (!query) {
                    query = this._vid;
                }
                if (query) {
                    if (exports.Network.ChatSocket.instance.connected) {
                        this.enterTable(query, 0);
                    }
                    exports.Network.ChatSocket.instance.killSocket();
                }
            }),
            (Controller.prototype.enterTable = function(script, event) {
                if (!script) {
                    script = this._vid;
                }
                if (void 0 === event) {
                    /** @type {number} */
                    event = 1;
                }
                /** @type {!Array} */
                this.messageList = [];
                if (
                    exports.Network.ChatSocket.instance &&
                    exports.Network.ChatSocket.instance.connected
                ) {
                    exports.Network.ChatSocket.instance.writeBytes(
                        exports.APIManager.getCMDChatEnterTable(
                            script,
                            '',
                            1,
                            event
                        )
                    );
                }
                this.dispatchAction(Controller.EVENT_ENTER_TABLE, event);
            }),
            (Controller.prototype.changeNickname = function(signature) {
                if (
                    exports.Network.ChatSocket.instance &&
                    !exports.Network.ChatSocket.instance.connected
                ) {
                    exports.Network.ChatSocket.instance.autoConnect();
                }
                /** @type {string} */
                this.cacheChangeNickName = signature;
                if (this.isReady) {
                    exports.Network.ChatSocket.instance.writeBytes(
                        exports.APIManager.getCMDChatChangeNickname(signature)
                    );
                    /** @type {string} */
                    this.cacheChangeNickName = '';
                }
            }),
            Object.defineProperty(Controller.prototype, 'vid', {
                get: function() {
                    return this._vid;
                },
                set: function(num) {
                    /** @type {number} */
                    this.seatNum = 0;
                    /** @type {boolean} */
                    this._isReady = false;
                    if (num !== this._vid) {
                        this.disconnectServer();
                        /** @type {string} */
                        this._vid = num;
                        if (void 0 !== this._vid && '' != this._vid) {
                            exports.Network.ChatSocket.instance.autoConnect();
                            this.enterTable();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            }),
            (Controller.prototype.sendMsg = function(text) {
                if (this._vid) {
                    exports.Network.ChatSocket.instance.writeBytes(
                        exports.APIManager.getCMDChatSendMessage(
                            this._vid,
                            '',
                            this.seatNum,
                            text
                        )
                    );
                }
            }),
            (Controller.prototype.sendQuickMsg = function(sender, type) {
                if (this._vid) {
                    exports.Network.ChatSocket.instance.writeBytes(
                        exports.APIManager.getCMDChatSendQuickMessage(
                            this._vid,
                            sender,
                            type,
                            this.seatNum
                        )
                    );
                }
            }),
            (Controller.prototype.getQuickMessage = function(t) {
                /** @type {!Array} */
                var devices = [];
                if (this.chatInfos) {
                    devices = this.chatInfosMap.get('ALL');
                    var i = this.chatInfosMap.get(t);
                    if (i) {
                        devices = devices.concat(i);
                    }
                }
                return devices;
            }),
            (Controller.prototype.getQuickMessageByID = function(rps) {
                return this.chatInfos[rps].message;
            }),
            (Controller.prototype.addEmoji = function(event) {
                this.dispatchAction(Controller.EVENT_ADD_EMOJI, event);
            }),
            (Controller.prototype.disKey = function() {
                return this._disKey;
            }),
            (Controller.prototype.release = function() {
                Signal.prototype.release.call(this);
                /** @type {!Array} */
                this.messageList = [];
                this.disconnectServer();
            }),
            (Controller.EVENT_UPDATE_MESSAGE = 'EVENT_UPDATE_MESSAGE'),
            (Controller.EVENT_UPDATE_QUICK_MESSAGE =
                'EVENT_UPDATE_QUICK_MESSAGE'),
            (Controller.EVENT_ENTER_TABLE = 'EVENT_ENTER_TABLE'),
            (Controller.EVENT_ADD_EMOJI = 'EVENT_ADD_EMOJI'),
            (Controller.EVENT_REMOVE_MESSAGE = 'EVENT_REMOVE_MESSAGE'),
            (Controller.EVENT_UPDATE_DISKEY = 'EVENT_UPDATE_DISKEY'),
            (Controller.EVENT_NICKNAME_ILLEGAL = 'EVENT_NICKNAME_ILLEGAL'),
            Controller
        );
    })(exports.NetworkStoreBase);
    exports.ChatStore = ChatStore;
    __reflect(ChatStore.prototype, 'Core.ChatStore');
    var Message = (function() {
        /**
         * @param {string} users
         * @param {string} name
         * @param {!Function} body
         * @param {number} comments
         * @param {number} callback
         * @param {string} id
         * @return {undefined}
         */
        function init(users, name, body, comments, callback, id) {
            if (void 0 === comments) {
                /** @type {number} */
                comments = -1;
            }
            if (void 0 === callback) {
                /** @type {number} */
                callback = 0;
            }
            if (void 0 === id) {
                /** @type {number} */
                id = 0;
            }
            /** @type {string} */
            this.nickname = name;
            /** @type {string} */
            this.loginname = users;
            /** @type {!Function} */
            this.body = body;
            /** @type {number} */
            this.chatInfoIndex = comments;
            /** @type {number} */
            this.temp_msgId = callback;
            /** @type {string} */
            this.msgId = id;
        }
        return init;
    })();
    exports.Message = Message;
    __reflect(Message.prototype, 'Core.Message');
})(Core || (Core = {}));
!(function(options) {
    var MultipleSelection = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.analyzeData = function(options, state) {
                Base.prototype.analyzeData.call(this, options, state);
                var columns = options.name.split('_');
                if (columns.length >= 3) {
                    var col = columns[columns.length - 2];
                    if (options.LANG_CANDIDATE_LIST.indexOf(col) >= 0) {
                        var s = columns.slice(0, columns.length - 2).join('_');
                        options.localizeStore.saveLocalizeRes(s, col, state);
                    }
                }
            }),
            (WorkerDomAdapter.prototype.loadFile = function(el, e, i) {
                if (this.fileDic[el.name]) {
                    return void e.call(i, el);
                }
                var self = this.getRequest();
                this.resItemDic[self.hashCode] = {
                    item: el,
                    func: e,
                    thisObject: i
                };
                self.open(options.AnalyzerUtils.getCDNResUrl(el));
                self._xhr.timeout = options.CDN_TIMEOUT;
                self.send();
            }),
            WorkerDomAdapter
        );
    })(RES.JsonAnalyzer);
    options.JsonAnalyzer = MultipleSelection;
    __reflect(MultipleSelection.prototype, 'Core.JsonAnalyzer');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(m) {
        /**
         * @return {?}
         */
        function e() {
            return (null !== m && m.apply(this, arguments)) || this;
        }
        return (
            __extends(e, m),
            Object.defineProperty(e, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (e.init = function() {
                return this.initInstance(this);
            }),
            (e.prototype.dispatchGlobal = function(action, event) {
                this.dispatchAction(action, event);
            }),
            e
        );
    })(HTMLSectionBuilder.StoreBase);
    HTMLSectionBuilder.GlobalStore = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.GlobalStore');
})(Core || (Core = {}));
!(function($scope) {
    var t = (function(e) {
        /**
         * @return {?}
         */
        function t() {
            var state = e.call(this) || this;
            return (
                (state.tokenStr = ''),
                (state.isDemoAc = false),
                (state.balance = 0),
                (state.loginDone = false),
                (state.livePlatfomMode = false),
                (state.livePlatfomTokenStr = ''),
                (state.waitingForLivePlatformToken = false),
                (state.socketList = [$scope.Network.LoginSocket.instance]),
                state
            );
        }
        return (
            __extends(t, e),
            Object.defineProperty(t, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (t.init = function() {
                return this.initInstance(this);
            }),
            Object.defineProperty(t.prototype, 'isReady', {
                get: function() {
                    return this.token && 2 === this.token.length;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(t.prototype, 'loginName', {
                get: function() {
                    return $scope.ExternalData.pid + this.userName;
                },
                enumerable: true,
                configurable: true
            }),
            (t.prototype.startLogin = function(
                username,
                options,
                suggestedVariableValueCallback
            ) {
                /** @type {string} */
                this.userName = username;
                /** @type {!Object} */
                this.password = options;
                this.isDemoLogin = suggestedVariableValueCallback;
                /** @type {boolean} */
                this.loginDone = false;
                /** @type {boolean} */
                this.waitingForLivePlatformToken = false;
                $scope.Network.LoginSocket.instance.autoConnect();
            }),
            (t.prototype.renewToken = function(token, cb) {
                var settings = $scope.Network.LoginSocket.instance;
                if (!(settings.connecting || settings.connected)) {
                    /** @type {boolean} */
                    this.loginDone = false;
                    /** @type {boolean} */
                    this.waitingForLivePlatformToken = false;
                    settings.autoConnect();
                }
                this.onceAction($scope.Wh, token, cb);
            }),
            (t.prototype.renewLivePlatformToken = function(type, pass) {
                var settings = $scope.Network.LoginSocket.instance;
                if (!(settings.connecting || settings.connected)) {
                    /** @type {boolean} */
                    this.loginDone = false;
                    /** @type {boolean} */
                    this.waitingForLivePlatformToken = false;
                    settings.autoConnect();
                }
                this.onceAction($scope.vu, type, pass);
            }),
            (t.prototype.getCurServerTime = function() {
                /** @type {number} */
                var groupsize = new Date().getTime();
                /** @type {number} */
                var dragstocreate = groupsize - this.serverTimeDiff;
                return dragstocreate;
            }),
            (t.prototype.fetchDoForward = function() {
                var test = this;
                $scope.AGWorker.DoForwardFetcher.init().once(
                    egret.Event.COMPLETE,
                    function(simpleselect) {
                        if (simpleselect.data) {
                            var n = window.bindHostConfig;
                            if (n) {
                                var executableCode = void 0;
                                executableCode = $scope.ExternalData.useSSL
                                    ? n.ipdomains
                                    : n.ips;
                                $scope.Config.HostConfig.instance.replaceDomainList(
                                    executableCode
                                );
                            }
                            if (
                                $scope.ExternalData.dnsapiEnabled &&
                                n &&
                                !n.userhost
                            ) {
                                var uboard = void 0;
                                uboard = $scope.ExternalData.useSSL
                                    ? $scope.AGWorker.DoForwardFetcher.instance
                                          .ipdomains
                                    : $scope.AGWorker.DoForwardFetcher.instance
                                          .ips;
                                $scope.Config.HostConfig.instance.addDnsIpList(
                                    uboard
                                );
                            }
                            test.startLogin(
                                $scope.ExternalData.username,
                                $scope.AGWorker.DoForwardFetcher.instance.pwd
                            );
                        } else {
                            console.error('Something wrong with the network!');
                            ExternalProgress('loginError', 5);
                        }
                    },
                    this
                );
                $scope.AGWorker.DoForwardFetcher.instance.fetchData();
            }),
            (t.prototype.onSocketConnected = function(tag) {
                if (tag === $scope.Network.LoginSocket.instance) {
                    if (this.isDemoLogin) {
                        tag.writeBytes(
                            $scope.APIManager.getCMDClientDemoLogin()
                        );
                    } else {
                        tag.writeBytes(
                            $scope.APIManager.getCMDClientLogin(
                                this.loginName,
                                this.password
                            )
                        );
                    }
                }
            }),
            (t.prototype.onSocketData = function(message, data) {
                switch (message.respId) {
                    case $scope.Protocol.Tu:
                        /** @type {!Object} */
                        var info = message;
                        if (0 != info.code) {
                            data.killSocket();
                        }
                        var r = this.waitingForLivePlatformToken;
                        switch (
                            ((this.waitingForLivePlatformToken = false),
                            info.code)
                        ) {
                            case 0:
                                if (r) {
                                    dclib(
                                        'LOGIN LIVE PLATFORM SESSION SUCCESS'
                                    );
                                    this.livePlatfomToken = info.token;
                                    this.livePlatfomTokenStr = info.tokenString;
                                    this.dispatchAction($scope.vu);
                                } else {
                                    dclib('LOGIN SERVER SUCCESS');
                                    this.token = info.token;
                                    this.tokenStr = info.tokenString;
                                    /** @type {boolean} */
                                    this.isDemoAc = 1 == info.userFlag;
                                    this.serverTimeDiff = this.getServerDiff(
                                        info.svrTime
                                    );
                                    if (this.livePlatfomMode) {
                                        /** @type {boolean} */
                                        this.waitingForLivePlatformToken = true;
                                        data.writeBytes(
                                            $scope.APIManager.getCMDLoginLivePlatform(
                                                this.loginName,
                                                this.token
                                            )
                                        );
                                    }
                                }
                                break;
                            case 3:
                                this.dispatchAction($scope.Qh);
                                break;
                            case 4:
                                this.dispatchAction($scope.Xh);
                                break;
                            default:
                                dclib(
                                    'LOGIN SERVER FAIL errorCode:' + info.code
                                );
                                this.dispatchAction($scope.$h);
                        }
                        if (0 != info.code) {
                            ExternalProgress('loginError', info.code);
                        }
                        this.checkNKillSocket();
                        break;
                    case $scope.Protocol.xu:
                        /** @type {!Object} */
                        var data = message;
                        this.token = data.token;
                        this.userName = data.pcUsername;
                        this.tokenStr = data.tokenString;
                        this.serverTimeDiff = this.getServerDiff(data.svrTime);
                        /** @type {boolean} */
                        this.isDemoAc = true;
                        if (this.livePlatfomMode) {
                            /** @type {boolean} */
                            this.waitingForLivePlatformToken = true;
                            data.writeBytes(
                                $scope.APIManager.getCMDLoginLivePlatform(
                                    this.loginName,
                                    this.token
                                )
                            );
                        }
                        break;
                    case $scope.Protocol.Ou:
                        /** @type {!Object} */
                        var body = message;
                        this.balance = body.account;
                        this.nickName = body.nickname;
                        /** @type {boolean} */
                        this.loginDone = true;
                        this.checkNKillSocket();
                        this.dispatchAction($scope.Wh);
                }
            }),
            (t.prototype.getServerDiff = function(scroll_margin) {
                /** @type {number} */
                var container_dim = new Date().getTime();
                return container_dim - 1e3 * scroll_margin;
            }),
            (t.prototype.checkNKillSocket = function() {
                if (
                    $scope.Network.LoginSocket.instance.connected &&
                    this.loginDone &&
                    !this.waitingForLivePlatformToken
                ) {
                    $scope.Network.LoginSocket.instance.killSocket();
                }
            }),
            t
        );
    })($scope.NetworkStoreBase);
    $scope.LoginStore = t;
    __reflect(t.prototype, 'Core.LoginStore');
})(Core || (Core = {}));
!(function(exports) {
    var agent;
    /**
     * @param {undefined} key
     * @param {!Function} n
     * @param {!Array} callback
     * @param {!HTMLDocument} name
     * @return {?}
     */
    exports.loadTheme = function(key, n, callback, name) {
        if (!agent) {
            agent = new exports.HashMap();
        }
        var s = agent.get(key);
        return (
            s || ((s = new eui.Theme(key, name)), agent.set(key, s)),
            s.initialized
                ? exports.ntimer.callLater(n, callback)
                : s.addEventListener(eui.UIEvent.COMPLETE, n, callback),
            s
        );
    };
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    /** @type {string} */
    HTMLSectionBuilder.EVENT_TOUCH_OUTSIDE = 'EVENT_TOUCH_OUTSIDE';
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function ScrollList() {
            var self = Base.call(this) || this;
            return (
                self.addEventListener(
                    egret.Event.ADDED_TO_STAGE,
                    self.onAddToStage,
                    self
                ),
                self.addEventListener(
                    egret.Event.REMOVED_FROM_STAGE,
                    self.onRemoveFromStage,
                    self
                ),
                self
            );
        }
        return (
            __extends(ScrollList, Base),
            (ScrollList.prototype.onAddToStage = function() {
                this.addTouchEventListener();
            }),
            (ScrollList.prototype.onRemoveFromStage = function() {
                this.removeTouchEventListener();
            }),
            (ScrollList.prototype.addTouchEventListener = function() {
                this.stage.addEventListener(
                    egret.TouchEvent.TOUCH_BEGIN,
                    this.touchBegin,
                    this
                );
            }),
            (ScrollList.prototype.removeTouchEventListener = function() {
                this.stage.removeEventListener(
                    egret.TouchEvent.TOUCH_BEGIN,
                    this.touchBegin,
                    this
                );
            }),
            (ScrollList.prototype.touchBegin = function(event) {
                if (
                    !this.getTransformedBounds(this.stage).containsPoint(
                        new egret.Point(event.stageX, event.stageY)
                    )
                ) {
                    this.touchPoint = new egret.Point(
                        event.stageX,
                        event.stageY
                    );
                    this.dispatchEventWith(
                        HTMLSectionBuilder.EVENT_TOUCH_OUTSIDE
                    );
                }
            }),
            ScrollList
        );
    })(eui.Group);
    HTMLSectionBuilder.AutoDisappearView = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.AutoDisappearView');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function PaginationComponent() {
            return Base.call(this) || this;
        }
        return (
            __extends(PaginationComponent, Base),
            (PaginationComponent.prototype.changePage = function(e, name) {
                if (void 0 === name) {
                    /** @type {boolean} */
                    name = false;
                }
                this.snapModuleEnd();
                Base.prototype.changePage.call(this, e, name);
            }),
            (PaginationComponent.prototype.popPage = function() {
                this.snapModuleEnd();
                Base.prototype.popPage.call(this);
            }),
            (PaginationComponent.prototype.snapModule = function(boardManager) {
                if (this.pageStack.length) {
                    var tlabel2 = void 0;
                    /** @type {number} */
                    var numberModifier = 1;
                    for (
                        ;
                        numberModifier < this.pageStack.length;
                        numberModifier++
                    ) {
                        var alwaysDownload = this.pageStack[
                            this.pageStack.length - numberModifier - 1
                        ];
                        if (
                            this.getPageModuleName(alwaysDownload) ==
                            boardManager
                        ) {
                            tlabel2 = alwaysDownload;
                            break;
                        }
                    }
                    if (tlabel2) {
                        this.snappingModule = tlabel2;
                        this.addChild(tlabel2);
                    }
                }
            }),
            (PaginationComponent.prototype.snapModuleEnd = function() {
                if (this.snappingModule && this.contains(this.snappingModule)) {
                    this.removeChild(this.snappingModule);
                }
                /** @type {null} */
                this.snappingModule = null;
            }),
            (PaginationComponent.prototype.getSnappingModuleName = function() {
                return this.getPageModuleName(this.snappingModule);
            }),
            (PaginationComponent.prototype.getPageModuleName = function(
                alwaysDownload
            ) {
                /** @type {null} */
                var group_rule = null;
                if (alwaysDownload) {
                    var debugLevel = egret.getQualifiedClassName(
                        alwaysDownload
                    );
                    var a_group_rules = debugLevel.split('.');
                    if (a_group_rules.length >= 2) {
                        group_rule = a_group_rules[0];
                    }
                }
                return group_rule;
            }),
            PaginationComponent
        );
    })(HTMLSectionBuilder.PCPageNavigator);
    HTMLSectionBuilder.EuEvPCPageNavigator = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.EuEvPCPageNavigator');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    /**
     * @return {undefined}
     */
    function HTMLSection() {
        /** @type {function(string): ?} */
        var completeStack = RES.hasRes;
        /**
         * @param {string} to
         * @return {?}
         */
        RES.hasRes = function(to) {
            return to.indexOf('.') < 0 && (to = '.' + to), completeStack(to);
        };
    }
    /** @type {function(): undefined} */
    HTMLSectionBuilder.patchHasRes = HTMLSection;
})(Core || (Core = {}));
!(function(module) {
    var ColorReplaceFilter = (function(Base) {
        /**
         * @return {?}
         */
        function List() {
            var me = Base.call(this) || this;
            return (
                (me.oldSize = 0),
                (me.setTextType = 0),
                (me.minSize = 10),
                (me.targetLabelWidth = 0),
                (me.targetLineNum = 0),
                (me.labelGroup = ''),
                me
            );
        }
        return (
            __extends(List, Base),
            (List.prototype.onAddToStage = function() {
                Base.prototype.onAddToStage.call(this);
                if (List.textLabels) {
                    if (this.labelGroup) {
                        if (List.textLabels.has(this.labelGroup)) {
                            List.textLabels.get(this.labelGroup).push(this);
                        } else {
                            List.textLabels.set(this.labelGroup, [this]);
                        }
                    }
                } else {
                    List.textLabels = new module.HashMap();
                }
            }),
            (List.prototype.onRemoveFromStage = function() {
                var moused_on = this;
                if (
                    (Base.prototype.onRemoveFromStage.call(this),
                    List.textLabels &&
                        this.labelGroup &&
                        List.textLabels.has(this.labelGroup))
                ) {
                    var t = List.textLabels
                        .get(this.labelGroup)
                        .filter(function(i) {
                            return i != moused_on;
                        }, this);
                    if (0 != t.length) {
                        List.textLabels.set(this.labelGroup, t);
                    } else {
                        List.textLabels['delete'](this.labelGroup);
                    }
                }
            }),
            (List.prototype.setFixSizeText = function(json, e, noSize) {
                var options = this;
                if (void 0 === e) {
                    /** @type {number} */
                    e = 0;
                }
                if (void 0 === noSize) {
                    /** @type {boolean} */
                    noSize = false;
                }
                if (noSize) {
                    module.NonstopTimer.instance.setTimeout(
                        function() {
                            options.setFixSizeText(json, e, false);
                        },
                        this,
                        1
                    );
                }
                /** @type {!Object} */
                var value = json;
                /** @type {!Object} */
                var result = json;
                if (noSize) {
                    this.text = value;
                    if (this.stage && 0 == e && this.maxWidth >= 1e4) {
                        if (this.percentWidth) {
                            /** @type {number} */
                            this.width =
                                (this.parent.width * this.percentWidth) / 100;
                        } else {
                            /** @type {number} */
                            this.width = 1e4;
                        }
                    }
                } else {
                    this.text = value;
                }
                var first =
                    0 == e
                        ? this.maxWidth >= 1e4
                            ? this.width
                            : this.maxWidth
                        : e;
                egret.callLater(function() {
                    for (
                        ;
                        (options.textWidth >= first || options.numLines > 1) &&
                        value.length > 1;

                    ) {
                        value = value.substring(0, value.length - 1);
                        /** @type {string} */
                        result = value + '...';
                        /** @type {string} */
                        options.text = result;
                    }
                }, this);
            }),
            (List.prototype.setFitSizeText = function(
                value,
                key,
                isUniqueSeparator
            ) {
                var options = this;
                if (void 0 === key) {
                    /** @type {number} */
                    key = 0;
                }
                if (void 0 === isUniqueSeparator) {
                    /** @type {boolean} */
                    isUniqueSeparator = false;
                }
                if (0 === this.oldSize) {
                    this.oldSize = this.size;
                } else {
                    if (this.size < this.oldSize) {
                        this.size = this.oldSize;
                    }
                }
                /** @type {!Object} */
                var text = value;
                this.text = text;
                var readersLength = this.text.split('\n').length;
                if (isUniqueSeparator) {
                    this.text = text;
                    if (this.stage && 0 == key && this.maxWidth >= 1e4) {
                        if (this.percentWidth) {
                            /** @type {number} */
                            this.width =
                                (this.parent.width * this.percentWidth) / 100;
                        } else {
                            /** @type {number} */
                            this.width = 1e4;
                        }
                    }
                }
                var newElKey =
                    0 == key
                        ? this.maxWidth >= 1e4
                            ? this.width
                            : this.maxWidth
                        : key;
                if (isUniqueSeparator || (0 === newElKey && '' != this.text)) {
                    module.NonstopTimer.instance.setTimeout(
                        function() {
                            options.setFitSizeText(value, key, false);
                        },
                        this,
                        1
                    );
                }
                if (0 !== newElKey) {
                    this.targetLabelWidth = newElKey;
                    this.targetLineNum = readersLength;
                    egret.callLater(function() {
                        /** @type {number} */
                        var s =
                            1 == options.targetLineNum
                                ? 0
                                : options.textWidth * options.numLines;
                        if (1 == options.targetLineNum) {
                            options.$getLinesArr().forEach(function(data) {
                                s = s + data.width;
                            }, options);
                        }
                        for (
                            ;
                            (options.textWidth >= options.targetLabelWidth ||
                                (options.numLines > options.targetLineNum &&
                                    s >
                                        options.targetLabelWidth *
                                            options.targetLineNum)) &&
                            ((options.size -= 0.5),
                            !(options.size <= options.minSize));

                        ) {
                            if (1 == options.targetLineNum) {
                                /** @type {number} */
                                s = 0;
                                options.$getLinesArr().forEach(function(data) {
                                    s = s + data.width;
                                }, options);
                            }
                        }
                        if (options.labelGroup) {
                            options.setGroupSize();
                        }
                    }, this);
                }
            }),
            (List.prototype.setGroupSize = function() {
                /** @type {number} */
                var size_min = 1e4;
                var pipelets = List.textLabels.get(this.labelGroup);
                if (pipelets) {
                    pipelets.forEach(function(clean) {
                        if (clean && clean.size < size_min) {
                            size_min = clean.size;
                        }
                    }, this);
                    pipelets.forEach(function(clean) {
                        if (clean) {
                            clean.size = size_min;
                        }
                    }, this);
                }
            }),
            (List.prototype.onLangChange = function() {
                var value;
                if (
                    (this.localeFunc
                        ? (value = this.localeFunc())
                        : this.localeKey &&
                          (value = module.LocalizeStore.instance.translate(
                              this.localeKey
                          )),
                    value)
                ) {
                    switch (this.setTextType) {
                        case 0:
                            this.text = value;
                            break;
                        case 1:
                            this.setFixSizeText(value);
                            break;
                        case 2:
                            this.setFixSizeText(value, 0, true);
                            break;
                        case 3:
                            this.setFitSizeText(value);
                            break;
                        case 4:
                            this.setFitSizeText(value, 0, true);
                    }
                }
            }),
            List
        );
    })(module.LocaleLabel);
    module.LongTextLabel = ColorReplaceFilter;
    __reflect(ColorReplaceFilter.prototype, 'Core.LongTextLabel');
})(Core || (Core = {}));
!(function(parent) {
    var abc = (function(Base) {
        /**
         * @return {?}
         */
        function AbstractListValidationRule() {
            var step = Base.call(this) || this;
            return (
                (step.orientation = parent.pageNavigator.orientation),
                (step._skinMap = new parent.HashMap({
                    portrait: null
                })),
                step
            );
        }
        return (
            __extends(AbstractListValidationRule, Base),
            Object.defineProperty(
                AbstractListValidationRule.prototype,
                'skinMap',
                {
                    set: function(element) {
                        this.setSkinMap(element);
                    },
                    enumerable: true,
                    configurable: true
                }
            ),
            (AbstractListValidationRule.prototype.setSkinMap = function(
                value_in_code
            ) {
                /** @type {!Object} */
                this._skinMap = value_in_code;
                var axis = this._skinMap.get(this.orientation);
                if (axis) {
                    this.skinName = axis;
                } else {
                    this.skinName = this._skinMap.values[0];
                }
            }),
            (AbstractListValidationRule.prototype.getSkinMap = function() {
                return this._skinMap;
            }),
            (AbstractListValidationRule.prototype.isOrientSupported = function(
                t
            ) {
                return this._skinMap.has(t);
            }),
            AbstractListValidationRule
        );
    })(parent.PageBase);
    parent.MobilePageBase = abc;
    __reflect(abc.prototype, 'Core.MobilePageBase');
})(Core || (Core = {}));
!(function(value) {
    var On = (function(Base) {
        /**
         * @return {?}
         */
        function init() {
            var self = Base.call(this) || this;
            return (
                (self.isOrientWarning = false),
                self.once(
                    egret.Event.ADDED_TO_STAGE,
                    function() {
                        self.onStageResize();
                        self.stage.addEventListener(
                            egret.Event.RESIZE,
                            self.onStageResize,
                            self
                        );
                    },
                    self
                ),
                self
            );
        }
        return (
            __extends(init, Base),
            (init.prototype.changePage = function(e, name) {
                if (void 0 === name) {
                    /** @type {boolean} */
                    name = false;
                }
                Base.prototype.changePage.call(this, e, name);
                this.checkPageOrient(e);
            }),
            (init.prototype.popPage = function() {
                Base.prototype.popPage.call(this);
                this.checkPageOrient(this.getTopPage());
            }),
            (init.prototype.addPopup = function(popup) {
                console.warn('TODO to be abandoned');
                this.getTopPage().addPopup(popup);
            }),
            (init.prototype.removePopup = function(feature) {
                console.warn('TODO to be abandoned');
                feature.parent.removePopup(feature);
            }),
            (init.prototype.onStageResize = function() {
                var data = this.stage;
                this.orientation =
                    data.stageWidth > data.stageHeight
                        ? value.ORI_LANDSCAPE
                        : value.ORI_PORTRAIT;
                this.checkPageOrient(this.getTopPage());
            }),
            (init.prototype.getTopPage = function() {
                return Base.prototype.getTopPage.call(this);
            }),
            (init.prototype.checkPageOrient = function(dest) {
                if (dest) {
                    if (dest instanceof value.MobilePageBase) {
                        if (dest.isOrientSupported(this.orientation)) {
                            if (dest.orientation != this.orientation) {
                                this.changePage(new dest.constructor());
                            }
                            /** @type {boolean} */
                            this.isOrientWarning = false;
                        } else {
                            /** @type {boolean} */
                            this.isOrientWarning = true;
                        }
                    } else {
                        /** @type {boolean} */
                        this.isOrientWarning =
                            this.orientation != value.ORI_PORTRAIT;
                    }
                    this.setOrientWarningVisible(this.isOrientWarning);
                }
            }),
            (init.prototype.setOrientWarningVisible = function(value) {
                /** @type {string} */
                document.getElementById('rotateCover').style.display = value
                    ? 'inherit'
                    : 'none';
                /** @type {string} */
                document.getElementById('rotateCover').style.zIndex = value
                    ? '10000'
                    : '0';
            }),
            init
        );
    })(value.PageNavigatorBase);
    value.MobilePageNavigator = On;
    __reflect(On.prototype, 'Core.MobilePageNavigator');
})(Core || (Core = {}));
!(function(cont) {
    var RenderableList = (function(array) {
        /**
         * @param {string} val
         * @return {?}
         */
        function result(val) {
            if (void 0 === val) {
                /** @type {string} */
                val = '';
            }
            var me = array.call(this) || this;
            return (
                '' === val
                    ? (me.tips = new cont.LocaleLabel())
                    : (me.skinName = val),
                me
            );
        }
        return __extends(result, array), result;
    })(eui.Component);
    cont.Tips = RenderableList;
    __reflect(RenderableList.prototype, 'Core.Tips');
    var h = (function() {
        /**
         * @return {undefined}
         */
        function init() {
            if (
                ((this.tipsMap = new cont.HashMap()),
                (this.showTips = false),
                (this.tips = new RenderableList()),
                (this.tips.touchEnabled = false),
                'Windows PC' == egret.Capabilities.os ||
                    'Mac OS' == egret.Capabilities.os)
            ) {
                /** @type {number} */
                var r = 0;
                var logger = egret.sys.TouchHandler.prototype.onTouchMove;
                /**
                 * @param {?} e
                 * @param {?} node
                 * @param {?} event
                 * @return {undefined}
                 */
                egret.sys.TouchHandler.prototype.onTouchMove = function(
                    e,
                    node,
                    event
                ) {
                    if (1 == r) {
                        logger.call(this, e, node, event);
                    }
                };
                var events = egret.sys.TouchHandler.prototype.onTouchBegin;
                /**
                 * @param {?} json
                 * @param {?} e
                 * @param {?} f
                 * @return {undefined}
                 */
                egret.sys.TouchHandler.prototype.onTouchBegin = function(
                    json,
                    e,
                    f
                ) {
                    /** @type {number} */
                    r = 1;
                    events.call(this, json, e, f);
                };
                var ts = egret.sys.TouchHandler.prototype.onTouchEnd;
                /**
                 * @param {?} y
                 * @param {?} event
                 * @param {?} pos
                 * @return {undefined}
                 */
                egret.sys.TouchHandler.prototype.onTouchEnd = function(
                    y,
                    event,
                    pos
                ) {
                    /** @type {number} */
                    r = 1;
                    ts.call(this, y, event, pos);
                };
                document.addEventListener('mouseup', function(
                    canCreateDiscussions
                ) {
                    /** @type {number} */
                    r = 0;
                });
            }
            mouse.enable(egret.MainContext.instance.stage);
            mouse.setMouseMoveEnabled(true);
            this.stage = egret.MainContext.instance.stage;
        }
        return (
            Object.defineProperty(init, 'instance', {
                get: function() {
                    return (
                        null == init._instance && (init._instance = new init()),
                        init._instance
                    );
                },
                enumerable: true,
                configurable: true
            }),
            (init.setTips = function(val) {
                init.instance.clearTips();
                /** @type {boolean} */
                init.instance.tips = val;
                /** @type {boolean} */
                init.instance.tips.touchEnabled = false;
            }),
            (init.prototype.registerMouseTip = function(evt, e, w, i) {
                if (
                    (void 0 === w && (w = null),
                    void 0 === i && (i = null),
                    null != evt)
                ) {
                    var eventMark;
                    var _cble;
                    if ('string' == typeof e) {
                        /** @type {number} */
                        eventMark = e;
                    } else {
                        /** @type {number} */
                        _cble = e;
                    }
                    if (i) {
                        w = w.bind(i);
                    }
                    this.tipsMap.set(evt.hashCode, {
                        hoverObj: evt,
                        tipKey: eventMark,
                        tipFunc: _cble,
                        callback: w
                    });
                    evt.addEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    );
                    evt.addEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    );
                    mouse.setButtonMode(evt, true);
                    evt.addEventListener(
                        mouse.MouseEvent.MOUSE_MOVE,
                        this.onMouseMove,
                        this
                    );
                }
            }),
            (init.prototype.unregisterMouseTip = function(evt) {
                if (null != evt && this.tipsMap.has(evt.hashCode)) {
                    if (this.showTips) {
                        var e = this.tipsMap.get(evt.hashCode);
                        var time = e.tipKey;
                        var pubDateEl = e.tipFunc;
                        if (
                            ((null != time && '' != time) ||
                                null != pubDateEl) &&
                            this.tips.tips.localeKey === time &&
                            this.tips.tips.localeFunc === pubDateEl
                        ) {
                            this.stage.removeChild(this.tips);
                            /** @type {boolean} */
                            this.showTips = false;
                        }
                    }
                    this.tipsMap['delete'](evt.hashCode);
                    evt.removeEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    );
                    evt.removeEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    );
                    mouse.setButtonMode(evt, false);
                    evt.removeEventListener(
                        mouse.MouseEvent.MOUSE_MOVE,
                        this.onMouseMove,
                        this
                    );
                }
            }),
            (init.prototype.onMouseOver = function(e) {
                var that = this.tipsMap.get(e.currentTarget.hashCode);
                if (that.callback) {
                    that.callback(mouse.MouseEvent.MOUSE_OVER, e);
                }
                var time = that.tipKey;
                var malakh = that.tipFunc;
                if ((null != time && '' != time) || null != malakh) {
                    this.tips.tips.localeKey = time;
                    this.tips.tips.localeFunc = malakh;
                    this.tips.tips.refresh();
                    this.stage.addChild(this.tips);
                    this.tips.validateNow();
                    if (e.stageX > 0.5 * this.stage.stageWidth) {
                        this.tips.anchorOffsetX = this.tips.width + 10;
                    } else {
                        /** @type {number} */
                        this.tips.anchorOffsetX = -10;
                    }
                    if (e.stageY > 0.5 * this.stage.stageHeight) {
                        this.tips.anchorOffsetY = this.tips.height + 10;
                    } else {
                        /** @type {number} */
                        this.tips.anchorOffsetY = -10;
                    }
                    this.tips.x = e.stageX;
                    this.tips.y = e.stageY;
                    /** @type {boolean} */
                    this.showTips = true;
                } else {
                    if (this.showTips) {
                        this.stage.removeChild(this.tips);
                    }
                    /** @type {boolean} */
                    this.showTips = false;
                }
            }),
            (init.prototype.onMouseOut = function(e) {
                if (this.showTips) {
                    this.stage.removeChild(this.tips);
                    /** @type {boolean} */
                    this.showTips = false;
                }
                var s = this.tipsMap.get(e.currentTarget.hashCode);
                if (s.callback) {
                    s.callback(mouse.MouseEvent.MOUSE_OUT, e);
                }
            }),
            (init.prototype.onMouseMove = function(event) {
                if (this.tips && this.showTips) {
                    this.tips.x = event.stageX;
                    this.tips.y = event.stageY;
                }
            }),
            (init.prototype.clearTips = function() {
                if (this.showTips) {
                    this.stage.removeChild(this.tips);
                    /** @type {boolean} */
                    this.showTips = false;
                }
            }),
            init
        );
    })();
    cont.MouseTips = h;
    __reflect(h.prototype, 'Core.MouseTips');
})(Core || (Core = {}));
!(function(context) {
    var WjsProto = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            Object.defineProperty(WorkerDomAdapter.prototype, 'recyclerImage', {
                get: function() {
                    return this.recyclerIamge;
                },
                enumerable: true,
                configurable: true
            }),
            (WorkerDomAdapter.prototype.loadFile = function(el, e, i) {
                if (this.fileDic[el.name]) {
                    return void e.call(i, el);
                }
                var self = this.getRequest();
                this.resItemDic[self.hashCode] = {
                    item: el,
                    func: e,
                    thisObject: i
                };
                self.open(context.AnalyzerUtils.getCDNResUrl(el));
                self._xhr.timeout = context.CDN_TIMEOUT;
                self.send();
            }),
            (WorkerDomAdapter.prototype.onLoadFinish = function(self) {
                if (self.$target.timeoutId) {
                    egret.clearTimeout(self.$target.timeoutId);
                    /** @type {null} */
                    self.$target.timeoutId = null;
                }
                var context = self.target;
                var options = this.resItemDic[context.$hashCode];
                delete this.resItemDic[context.hashCode];
                var el = options.item;
                var fn = options.func;
                if (
                    ((el.loaded = self.type == egret.Event.COMPLETE), el.loaded)
                ) {
                    if (context instanceof egret.HttpRequest) {
                        /** @type {boolean} */
                        el.loaded = false;
                        var elObj = this.analyzeConfig(el, context.response);
                        if (elObj) {
                            return (
                                this.loadImageCDN(elObj, options),
                                void this.recycler.push(context)
                            );
                        }
                    } else {
                        var texture = new egret.Texture();
                        texture._setBitmapData(context.data);
                        this.analyzeBitmap(el, texture);
                    }
                }
                if (context instanceof egret.HttpRequest) {
                    this.recycler.push(context);
                } else {
                    this.recyclerImage.push(context);
                }
                fn.call(options.thisObject, el);
            }),
            (WorkerDomAdapter.prototype.loadImageCDN = function(
                options,
                value
            ) {
                var self = this.getMyLoader();
                /** @type {!Object} */
                this.resItemDic[self.hashCode] = value;
                var i = value.item;
                self.load(context.AnalyzerUtils.getCDNResUrl(i, options));
                /** @type {string} */
                self.baseURL = options;
                if (void 0 === self.retryCount) {
                    /** @type {number} */
                    self.retryCount = 0;
                } else {
                    self.retryCount++;
                }
            }),
            (WorkerDomAdapter.prototype.getMyLoader = function() {
                var httpLoader = this.recyclerImage.pop();
                return (
                    httpLoader ||
                        ((httpLoader = new context.ImageLoader()),
                        httpLoader.addEventListener(
                            egret.Event.COMPLETE,
                            this.onImageLoadFinish,
                            this
                        ),
                        httpLoader.addEventListener(
                            egret.IOErrorEvent.IO_ERROR,
                            this.onImageLoadFinish,
                            this
                        )),
                    httpLoader
                );
            }),
            (WorkerDomAdapter.prototype.onImageLoadFinish = function(self) {
                if (self.$target.timeoutId) {
                    egret.clearTimeout(self.$target.timeoutId);
                    /** @type {null} */
                    self.$target.timeoutId = null;
                }
                var request = self.target;
                var i = this.resItemDic[request.$hashCode];
                var o = i.item;
                i.func;
                /** @type {boolean} */
                o.loaded = self.type == egret.Event.COMPLETE;
                if (o.loaded || request.retryCount >= 3) {
                    this.onLoadFinish(self);
                } else {
                    this.loadImageCDN(request.baseURL, i);
                }
            }),
            WorkerDomAdapter
        );
    })(RES.SheetAnalyzer);
    context.SheetAnalyzer = WjsProto;
    __reflect(WjsProto.prototype, 'Core.SheetAnalyzer');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            return (null !== Base && Base.apply(this, arguments)) || this;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.loadFile = function(e, r, i) {
                /**
                 * @param {string} a
                 * @return {undefined}
                 */
                var success = function(a) {
                    createjs.Sound.off('fileload', mousedownEventHandler);
                    createjs.Sound.off('fileerror', debouncedUpdateResize);
                    if (!a) {
                        createjs.Sound.removeSound(e.url, null);
                    }
                    /** @type {string} */
                    e.loaded = a;
                    r.call(i, e);
                };
                var mousedownEventHandler = createjs.Sound.on(
                    'fileload',
                    function(data) {
                        if (data.id === e.name) {
                            success(true);
                        }
                    }
                );
                var debouncedUpdateResize = createjs.Sound.on(
                    'fileerror',
                    function(data) {
                        if (data.id === e.name) {
                            success(false);
                        }
                    }
                );
                createjs.Sound.registerSound(
                    HTMLSectionBuilder.AnalyzerUtils.getCDNResUrl(e),
                    e.name
                );
            }),
            (WorkerDomAdapter.prototype.destroyRes = function(o) {
                return createjs.Sound.loadComplete(o)
                    ? (createjs.Sound.removeSound(o, null), true)
                    : false;
            }),
            WorkerDomAdapter
        );
    })(RES.SoundAnalyzer);
    HTMLSectionBuilder.SoundAnalyzer = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.SoundAnalyzer');
})(Core || (Core = {}));
!(function(exports) {
    var Editor = (function(Base) {
        /**
         * @return {?}
         */
        function WorkerDomAdapter() {
            var t = (null !== Base && Base.apply(this, arguments)) || this;
            return (t.isConfigLoaded = false), (t.isThemeLoaded = false), t;
        }
        return (
            __extends(WorkerDomAdapter, Base),
            (WorkerDomAdapter.prototype.createChildren = function() {
                var e = this;
                Base.prototype.createChildren.call(this);
                exports.updatePrototype();
                exports.patchHasRes();
                exports.NonstopTimer.init();
                exports.StorageManager.init();
                exports.AGWorker.Client.init();
                exports.LocalizeStore.init();
                exports.SoundManager.init();
                exports.GlobalStore.init();
                exports.setupShortcut();
                var implementation = new exports.AssetAdapter();
                egret.registerImplementation(
                    'eui.IAssetAdapter',
                    implementation
                );
                egret.registerImplementation(
                    'eui.IThemeAdapter',
                    new exports.ThemeAdapter()
                );
                RES.registerAnalyzer('image', exports.ImageAnalyzer);
                RES.registerAnalyzer('sheet', exports.SheetAnalyzer);
                RES.registerAnalyzer('sound', exports.SoundAnalyzer);
                RES.registerAnalyzer('json', exports.JsonAnalyzer);
                exports.Config.VersionConfig.init().addEventListener(
                    egret.Event.COMPLETE,
                    function(simpleselect) {
                        if (simpleselect.data) {
                            e.onVersionConfigLoaded();
                        }
                    },
                    this
                );
                exports.Config.VersionConfig.instance.fetchConfig();
            }),
            (WorkerDomAdapter.prototype.onVersionConfigLoaded = function() {
                var options = this;
                exports.Config.ConcurrentLoader.load(
                    [
                        exports.Config.HostConfig,
                        exports.Config.ModuleConfig,
                        exports.Config.DirectEnterConfig
                    ],
                    function() {
                        RES.addEventListener(
                            RES.ResourceEvent.CONFIG_COMPLETE,
                            options.onConfigComplete,
                            options
                        );
                        exports.Config.ModuleConfig.instance.moduleInfoMap.forEach(
                            function(action) {
                                var descriptor = action.resRoot + action.res;
                                if (descriptor) {
                                    RES.loadConfig(descriptor, action.resRoot);
                                }
                            },
                            options
                        );
                        var group = exports.Config.ModuleConfig.instance.getModuleInfoByName(
                            'Default'
                        );
                        exports.loadTheme(
                            group.resRoot + group.thm,
                            options.onThemeLoadComplete,
                            options,
                            options.stage
                        );
                    },
                    this
                );
            }),
            (WorkerDomAdapter.prototype.onConfigComplete = function() {
                RES.removeEventListener(
                    RES.ResourceEvent.CONFIG_COMPLETE,
                    this.onConfigComplete,
                    this
                );
                /** @type {boolean} */
                this.isConfigLoaded = true;
                if (this.isThemeLoaded) {
                    this.startCreateScene();
                }
            }),
            (WorkerDomAdapter.prototype.onThemeLoadComplete = function() {
                /** @type {boolean} */
                this.isThemeLoaded = true;
                if (this.isConfigLoaded) {
                    this.startCreateScene();
                }
            }),
            (WorkerDomAdapter.prototype.startCreateScene = function() {
                if (exports.ExternalData.device === exports.DEV_PC) {
                    exports.rootPageNavigator = new exports.PCPageNavigator();
                    /** @type {number} */
                    exports.rootPageNavigator.percentWidth = 100;
                    /** @type {number} */
                    exports.rootPageNavigator.percentHeight = 100;
                    this.addChild(exports.rootPageNavigator);
                } else {
                    exports.pageNavigator = new exports.MobilePageNavigator();
                    this.addChild(exports.pageNavigator);
                }
                exports.SilentLoadManager.init();
                exports.ModuleResLoader.init();
                exports.moduleNavigator = exports.ModuleNavigator.init();
                exports.moduleNavigator.moduleInfoMap =
                    exports.Config.ModuleConfig.instance.moduleInfoMap;
                var parsed = exports.Config.DirectEnterConfig.instance.gameInfoMap.get(
                    '0'
                );
                var outFull = exports.Config.DirectEnterConfig.instance.gameInfoMap.get(
                    exports.ExternalData.directEnterId
                );
                if (outFull) {
                    exports.ModuleNavigator.instance.changeModule(
                        parsed.moduleName,
                        outFull
                    );
                } else {
                    console.warn(
                        'Direct enter ID (' +
                            exports.ExternalData.directEnterId +
                            ') not defined!'
                    );
                    exports.ModuleNavigator.instance.changeModule(
                        parsed.moduleName,
                        parsed
                    );
                }
            }),
            WorkerDomAdapter
        );
    })(eui.UILayer);
    exports.Main = Editor;
    __reflect(Editor.prototype, 'Core.Main');
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @return {undefined}
             */
            function mockObjectLoader() {}
            return (
                (mockObjectLoader.load = function(t, cb, thisArg) {
                    var vm = this;
                    this.configIdMap = new exports.HashMap();
                    /** @type {!Object} */
                    this.callback = cb;
                    /** @type {!Object} */
                    this.thisArg = thisArg;
                    t.forEach(function(ent) {
                        ent.init().addEventListener(
                            egret.Event.COMPLETE,
                            vm.onConfigComplete,
                            vm
                        );
                        vm.configIdMap.set(ent.instance.id, null);
                        ent.instance.fetchConfig();
                    }, this);
                }),
                (mockObjectLoader.onConfigComplete = function(viz) {
                    var config = viz.data;
                    if (config.success) {
                        this.configIdMap['delete'](config.configId);
                        if (0 === this.configIdMap.keys.length) {
                            this.callback.call(this.thisArg);
                        }
                    } else {
                        console.error(config.configId + ' fail');
                    }
                }),
                mockObjectLoader
            );
        })();
        HTMLSectionBuilder.ConcurrentLoader = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.ConcurrentLoader');
    })((t = exports.Config || (exports.Config = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(exports) {
        var SegmentTree = (function(Base) {
            /**
             * @return {?}
             */
            function Agent() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Agent, Base),
                Object.defineProperty(Agent, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.init = function() {
                    return this.initInstance(this);
                }),
                Object.defineProperty(Agent.prototype, 'id', {
                    get: function() {
                        return 'games_direct_enter';
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.prototype.parseXmlObj = function(data) {
                    var LacesArray = this;
                    this.gameInfoMap = new exports.HashMap();
                    exports.XMLReader.read(data)
                        .find('game')
                        .forEach(function(script) {
                            LacesArray.gameInfoMap.set(
                                script.attr('id'),
                                new exports.GameInfo(script)
                            );
                        }, this);
                }),
                Agent
            );
        })(exports.CachedConfigBase);
        exports.DirectEnterConfig = SegmentTree;
        __reflect(SegmentTree.prototype, 'Core.Config.DirectEnterConfig');
    })((t = exports.Config || (exports.Config = {})));
})(Core || (Core = {}));
!(function(context) {
    var t;
    !(function(FBL) {
        var HttpRequestObserver = (function(Base) {
            /**
             * @return {?}
             */
            function Agent() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Agent, Base),
                Object.defineProperty(Agent, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.init = function() {
                    return this.initInstance(this);
                }),
                (Agent.prototype.getHost = function(name, id, url) {
                    if (void 0 === id) {
                        /** @type {string} */
                        id = '';
                    }
                    if (void 0 === url) {
                        /** @type {string} */
                        url = '';
                    }
                    var code = this.getHostList(name, id, url);
                    return code.length <= 0
                        ? (console.error(
                              'No host found, check your host_config'
                          ),
                          null)
                        : code[0];
                }),
                (Agent.prototype.getHostByVid = function(sceneUid) {
                    var Face;
                    return (
                        this.hostList.forEach(function(face) {
                            if (face.vids.indexOf(sceneUid) >= 0) {
                                Face = face;
                            }
                        }, this),
                        Face
                    );
                }),
                (Agent.prototype.getHostByServerId = function(string, limit) {
                    if (void 0 === limit) {
                        /** @type {boolean} */
                        limit = false;
                    }
                    var RoxyFilemanConf;
                    return (
                        this.hostList.forEach(function(data) {
                            if (
                                data.serverid === string &&
                                data.isWatch === limit
                            ) {
                                RoxyFilemanConf = data;
                            }
                        }, this),
                        RoxyFilemanConf
                    );
                }),
                (Agent.prototype.getHostList = function(callback, type, name) {
                    if (
                        (void 0 === type && (type = ''),
                        void 0 === name && (name = ''),
                        !this.hostList)
                    ) {
                        return [];
                    }
                    /** @type {!Array} */
                    var c1StateEvts = [];
                    return (
                        this.hostList.forEach(function(info) {
                            if (
                                info.hostType === callback &&
                                info.gameType === type &&
                                info.platform === name
                            ) {
                                c1StateEvts.push(info);
                            }
                        }, this),
                        c1StateEvts
                    );
                }),
                (Agent.prototype.addDnsIpList = function(e) {
                    return !e || e.length <= 0
                        ? void console.warn('Empty DNSApi ips!')
                        : void this.hostList.forEach(function(n) {
                              n.domainList = e.concat(n.domainList);
                          }, this);
                }),
                (Agent.prototype.replaceDomainList = function(code) {
                    return !code || code.length <= 0
                        ? void console.warn('Empty user static domain!')
                        : void this.hostList.forEach(function(user) {
                              user.domainList = code.slice();
                          });
                }),
                Object.defineProperty(Agent.prototype, 'id', {
                    get: function() {
                        return 'host_config';
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.prototype.parseXmlObj = function(root) {
                    var data = this;
                    /** @type {!Array} */
                    this.hostList = [];
                    context.XMLReader.read(root)
                        .find('environment')
                        .forEach(function(t) {
                            if (t.attr('name') === context.ExternalData.env) {
                                data.envDomainList = (context.ExternalData
                                    .useSSL
                                    ? t.attr('sslDomain')
                                    : t.attr('domain')
                                ).split(' ');
                                t.find('host').forEach(function(msg) {
                                    var user = new FBL.HostInfo(msg);
                                    if (user.domainList.length <= 0) {
                                        user.domainList = data.envDomainList;
                                    }
                                    data.hostList.push(user);
                                }, data);
                            }
                        }, this);
                }),
                Agent
            );
        })(FBL.CachedConfigBase);
        FBL.HostConfig = HttpRequestObserver;
        __reflect(HttpRequestObserver.prototype, 'Core.Config.HostConfig');
    })((t = context.Config || (context.Config = {})));
})(Core || (Core = {}));
!(function(exports) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function(Base) {
            /**
             * @return {?}
             */
            function Agent() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(Agent, Base),
                Object.defineProperty(Agent, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.init = function() {
                    return this.initInstance(this);
                }),
                (Agent.prototype.getModuleNameByGameType = function(div) {
                    var missingElements = this.moduleInfoMap.getItemByProperty(
                        'gameType',
                        div
                    );
                    return missingElements.length <= 0
                        ? void console.error(
                              'No module for ' +
                                  div +
                                  ', check module_config.xml'
                          )
                        : missingElements[0].name;
                }),
                (Agent.prototype.getModuleInfoByName = function(name) {
                    var e = this.moduleInfoMap.get(name);
                    return (
                        e ||
                            console.error(
                                'No module ' +
                                    name +
                                    ' exist, check module_config.xml'
                            ),
                        e
                    );
                }),
                Object.defineProperty(Agent.prototype, 'id', {
                    get: function() {
                        return 'module_config';
                    },
                    enumerable: true,
                    configurable: true
                }),
                (Agent.prototype.parseXmlObj = function(data) {
                    var LacesArray = this;
                    this.moduleInfoMap = new exports.HashMap();
                    exports.XMLReader.read(data)
                        .find('module')
                        .forEach(function(path) {
                            var element = path.attr('name');
                            var data = {
                                name: element,
                                gameType: path.attr('gameType'),
                                js: path.attr('js'),
                                resRoot: path.attr('resRoot'),
                                res: path.attr('res'),
                                thm: path.attr('thm'),
                                grpName: path.attr('grpName'),
                                version: path.attr('version'),
                                releaseType: path.intAttr('releaseType'),
                                deps: path.listAttr('deps')
                            };
                            LacesArray.moduleInfoMap.set(element, data);
                        }, this);
                }),
                Agent
            );
        })(HTMLSectionBuilder.CachedConfigBase);
        HTMLSectionBuilder.ModuleConfig = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.ModuleConfig');
    })((t = exports.Config || (exports.Config = {})));
})(Core || (Core = {}));
!(function(exports) {
    var Resolute = (function() {
        /**
         * @return {undefined}
         */
        function Controller() {
            this.scrollerMap = new exports.HashMap();
            this.rectMap = new exports.HashMap();
            mouse.enable(egret.MainContext.instance.stage);
        }
        return (
            Object.defineProperty(Controller, 'instance', {
                get: function() {
                    return (
                        null == Controller._instance &&
                            (Controller._instance = new Controller()),
                        Controller._instance
                    );
                },
                enumerable: true,
                configurable: true
            }),
            (Controller.prototype.registerWheelControl = function(obj, rect) {
                if (void 0 === rect) {
                    /** @type {null} */
                    rect = null;
                }
                if (null != obj) {
                    this.scrollerMap.set(obj.hashCode, {
                        scroller: obj,
                        rect: rect
                    });
                    obj.addEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    );
                    obj.addEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    );
                }
                if (null != rect) {
                    this.rectMap.set(rect.hashCode, {
                        scroller: obj,
                        rect: rect
                    });
                    rect.addEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    );
                    rect.addEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    );
                }
            }),
            (Controller.prototype.unregisterWheelControl = function(evt, op) {
                if (void 0 === op) {
                    /** @type {null} */
                    op = null;
                }
                if (null != evt && this.scrollerMap.has(evt.hashCode)) {
                    this.scrollerMap['delete'](evt.hashCode);
                    evt.removeEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    );
                    evt.removeEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    );
                }
                if (null != op && this.rectMap.has(op.hashCode)) {
                    this.rectMap['delete'](op.hashCode);
                    op.removeEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouseOver,
                        this
                    );
                    op.removeEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouseOut,
                        this
                    );
                }
            }),
            (Controller.prototype.onMouseOver = function(event) {
                var content = event.currentTarget.hashCode;
                if (this.scrollerMap.has(content)) {
                    this.currentScroller = this.scrollerMap.get(
                        content
                    ).scroller;
                    document.addEventListener('wheel', this.wheelEvent);
                } else {
                    if (this.rectMap.has(content)) {
                        this.currentScroller = this.rectMap.get(
                            content
                        ).scroller;
                        document.addEventListener('wheel', this.wheelEvent);
                    }
                }
            }),
            (Controller.prototype.onMouseOut = function(event) {
                var f = event.currentTarget.hashCode;
                if (this.scrollerMap.has(f) || this.rectMap.has(f)) {
                    /** @type {null} */
                    this.currentScroller = null;
                    document.removeEventListener('wheel', this.wheelEvent);
                }
            }),
            (Controller.prototype.wheelEvent = function(e) {
                Controller.onwheel(e);
            }),
            (Controller.onwheel = function(event) {
                event.preventDefault();
                var _this = Controller._instance.currentScroller;
                /** @type {number} */
                var lastAvarage = 0;
                if (_this && _this.viewport) {
                    /** @type {number} */
                    var avarage = _this.viewport.contentHeight - _this.height;
                    if (event.deltaY < 0 && _this.viewport.scrollV > 0) {
                        /** @type {number} */
                        lastAvarage =
                            _this.viewport.scrollV + event.deltaY - 80;
                        if (0 > lastAvarage) {
                            /** @type {number} */
                            lastAvarage = 0;
                        }
                        /** @type {number} */
                        _this.viewport.scrollV = lastAvarage;
                        _this.dispatchEventWith(egret.Event.CHANGE);
                    } else {
                        if (
                            event.deltaY > 0 &&
                            _this.viewport.scrollV < avarage
                        ) {
                            lastAvarage =
                                _this.viewport.scrollV + event.deltaY + 80;
                            if (lastAvarage > avarage) {
                                /** @type {number} */
                                lastAvarage = avarage;
                            }
                            _this.viewport.scrollV = lastAvarage;
                            _this.dispatchEventWith(egret.Event.CHANGE);
                        }
                    }
                }
            }),
            Controller
        );
    })();
    exports.ScrollerHelper = Resolute;
    __reflect(Resolute.prototype, 'Core.ScrollerHelper');
})(Core || (Core = {}));
!(function(options) {
    var t;
    !(function(exports) {
        var SegmentTree = (function(Base) {
            /**
             * @return {?}
             */
            function t() {
                return (null !== Base && Base.apply(this, arguments)) || this;
            }
            return (
                __extends(t, Base),
                Object.defineProperty(t.prototype, 'urls', {
                    get: function() {
                        return [
                            '../config/version_config.xml?timestamp=' +
                                Date.now()
                        ];
                    },
                    enumerable: true,
                    configurable: true
                }),
                (t.prototype.onRequestSuccess = function(result) {
                    options.StorageManager.instance.setItem(
                        'CONFIG_version_config',
                        JSON.stringify(result)
                    );
                    Base.prototype.onRequestSuccess.call(this, result);
                }),
                (t.prototype.parseXmlObj = function(data) {
                    var user = this;
                    /** @type {!Array} */
                    this.domainList = [];
                    this.versionInfoMap = new options.HashMap();
                    var e = options.XMLReader.read(data);
                    e.find('domain').forEach(function(t) {
                        user.domainList.push(t.text);
                    });
                    e.find('file').forEach(function(script) {
                        var element = script.attr('id');
                        user.versionInfoMap.set(
                            element,
                            new exports.VersionInfo(script)
                        );
                    });
                }),
                (t.prototype.onRequestFail = function() {
                    var t = options.StorageManager.instance.getItem(
                        'CONFIG_version_config'
                    );
                    if (t) {
                        this.parseXmlObj(JSON.parse(t));
                        this.dispatchEventWith(
                            egret.Event.COMPLETE,
                            false,
                            true
                        );
                    } else {
                        this.dispatchEventWith(
                            egret.Event.COMPLETE,
                            false,
                            false
                        );
                    }
                }),
                Object.defineProperty(t, 'instance', {
                    get: function() {
                        return this.getInstance(this);
                    },
                    enumerable: true,
                    configurable: true
                }),
                (t.init = function() {
                    return this.initInstance(this);
                }),
                t
            );
        })(options.AGWorker.ConfigBase);
        exports.VersionConfig = SegmentTree;
        __reflect(SegmentTree.prototype, 'Core.Config.VersionConfig');
    })((t = options.Config || (options.Config = {})));
})(Core || (Core = {}));
!(function(ScriptConfig_1) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @return {undefined}
             */
            function t() {}
            return t;
        })();
        HTMLSectionBuilder.CachedConfigEvtData = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.CachedConfigEvtData');
    })((e = ScriptConfig_1.Config || (ScriptConfig_1.Config = {})));
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function QueryLanguageComponent() {
            return Base.call(this) || this;
        }
        return (
            __extends(QueryLanguageComponent, Base),
            (QueryLanguageComponent.prototype.setScroller = function(options) {
                if (this.scroller) {
                    this.scroller.removeEventListener(
                        egret.Event.CHANGE,
                        this.updateThumb,
                        this
                    );
                    /** @type {null} */
                    this.scroller = null;
                }
                if (this.viewport) {
                    this.viewport.removeEventListener(
                        egret.Event.RESIZE,
                        this.onViewportResize,
                        this
                    );
                    /** @type {null} */
                    this.viewport = null;
                }
                this.removeEventListener(
                    egret.Event.CHANGE,
                    this.onSliderValueChange,
                    this
                );
                if (options && options.viewport) {
                    /** @type {!Object} */
                    this.scroller = options;
                    this.viewport = options.viewport;
                    this.scroller.addEventListener(
                        egret.Event.CHANGE,
                        this.updateThumb,
                        this
                    );
                    this.onViewportResize();
                    this.viewport.addEventListener(
                        egret.Event.RESIZE,
                        this.onViewportResize,
                        this
                    );
                    this.addEventListener(
                        egret.Event.CHANGE,
                        this.onSliderValueChange,
                        this
                    );
                }
            }),
            (QueryLanguageComponent.prototype.onSliderValueChange = function() {
                /** @type {number} */
                this.viewport.scrollV = this.maximum - this.value;
            }),
            (QueryLanguageComponent.prototype.onViewportResize = function() {
                var self = this;
                egret.callLater(function() {
                    if (self.viewport) {
                        /** @type {number} */
                        var view_h =
                            (self.viewport.height /
                                self.viewport.contentHeight) *
                            self.height;
                        /** @type {number} */
                        self.thumb.height = view_h;
                        /** @type {number} */
                        self.thumbHeight = view_h;
                        /** @type {number} */
                        self.maximum =
                            self.viewport.contentHeight - self.viewport.height;
                        /** @type {number} */
                        self.value = self.maximum;
                        if (
                            self.maximum > 0 &&
                            self.viewport.scrollV >= self.maximum
                        ) {
                            /** @type {number} */
                            self.viewport.scrollV = self.maximum;
                        }
                        self.updateThumb();
                    }
                }, self);
            }),
            (QueryLanguageComponent.prototype.updateThumb = function() {
                var total;
                /** @type {number} */
                var value = this.maximum - this.viewport.scrollV;
                if (0 > value) {
                    total = this.thumbHeight + value;
                } else {
                    if (this.viewport.scrollV < 0) {
                        total = this.thumbHeight + this.viewport.scrollV;
                    }
                }
                if (void 0 != total) {
                    if (1 > total) {
                        /** @type {number} */
                        total = 1;
                    }
                    /** @type {number} */
                    this.thumb.height = total;
                }
                /** @type {number} */
                this.value = value;
            }),
            (QueryLanguageComponent.prototype.onReleaseRefs = function() {
                if (this.scroller) {
                    this.scroller.removeEventListener(
                        egret.Event.CHANGE,
                        this.updateThumb,
                        this
                    );
                    /** @type {null} */
                    this.scroller = null;
                }
                if (this.viewport) {
                    this.viewport.removeEventListener(
                        egret.Event.RESIZE,
                        this.onViewportResize,
                        this
                    );
                    /** @type {null} */
                    this.viewport = null;
                }
            }),
            QueryLanguageComponent
        );
    })(eui.VSlider);
    HTMLSectionBuilder.VScrollerSlider = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.VScrollerSlider');
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    /**
     * @param {!Element} el
     * @return {undefined}
     */
    function getStyle(el) {
        /** @type {string} */
        el.style.position = 'absolute';
        /** @type {string} */
        el.style.border = '0';
        /** @type {string} */
        el.style.left = '0px';
        /** @type {string} */
        el.style.top = '0px';
    }
    /** @type {string} */
    var sequence_values = 'egretDOMRoot';
    var timer = (function() {
        /**
         * @return {undefined}
         */
        function siteEntry() {}
        return (
            (siteEntry.initDOMRoot = function(size, name) {
                var layoutOut = this;
                /** @type {(Element|null)} */
                var title = document.getElementById(name);
                if (null == title) {
                    /** @type {!Element} */
                    var mainLink = document.getElementsByClassName(
                        'egret-player'
                    )[0];
                    /** @type {!Element} */
                    title = document.createElement('div');
                    getStyle(title);
                    title.setAttribute('id', name);
                    /** @type {string} */
                    title.className = 'egret-dom-container';
                    mainLink.appendChild(title);
                    /** @type {!Object} */
                    siteEntry.tempStage = size;
                    /**
                     * @return {undefined}
                     */
                    var init = function() {
                        /** @type {!Element} */
                        var t = document.getElementsByClassName(
                            'egret-player'
                        )[0];
                        /** @type {!Element} */
                        var view = t.getElementsByTagName('canvas')[0];
                        /** @type {!ClientRect} */
                        var viewportSize = t.getBoundingClientRect();
                        /** @type {!ClientRect} */
                        var crop = view.getBoundingClientRect();
                        /** @type {boolean} */
                        var s = false;
                        var orientation = layoutOut.tempStage.orientation;
                        if (orientation != egret.OrientationMode.AUTO) {
                            /** @type {boolean} */
                            s =
                                (orientation !=
                                    egret.OrientationMode.PORTRAIT &&
                                    viewportSize.height > viewportSize.width) ||
                                (orientation ==
                                    egret.OrientationMode.PORTRAIT &&
                                    viewportSize.width > viewportSize.height);
                        }
                        var o;
                        var a;
                        if (s) {
                            /** @type {number} */
                            o = crop.width / view.height;
                            /** @type {number} */
                            a = crop.height / view.width;
                        } else {
                            /** @type {number} */
                            o = crop.width / view.width;
                            /** @type {number} */
                            a = crop.height / view.height;
                        }
                        /** @type {string} */
                        title.style.left = view.style.left;
                        /** @type {string} */
                        title.style.top = view.style.top;
                    };
                    this.tempStage.addEventListener(
                        egret.Event.RESIZE,
                        init,
                        this
                    );
                    init();
                }
            }),
            (siteEntry.getDOMRoot = function(switchTextDiv) {
                /** @type {(Element|null)} */
                var text = document.getElementById(switchTextDiv);
                return text;
            }),
            siteEntry
        );
    })();
    __reflect(timer.prototype, 'DOMRoot');
    var HTMLSection = (function() {
        /**
         * @param {!Array} value
         * @return {undefined}
         */
        function Element(value) {
            if (void 0 === value) {
                /** @type {string} */
                value = sequence_values;
            }
            this.lastMatrix = new egret.Matrix();
            /** @type {number} */
            this.lastWidth = 0;
            /** @type {number} */
            this.lastHeight = 0;
            /** @type {!Element} */
            this.node = document.createElement('div');
            /** @type {!Array} */
            this.rootId = value;
            getStyle(this.node);
        }
        return (
            (Element.prototype.mapDisplayObject = function(datepicker) {
                /** @type {!Object} */
                this.dp = datepicker;
            }),
            (Element.prototype.show = function() {
                timer.initDOMRoot(this.dp.stage, this.rootId);
                var container = timer.getDOMRoot(this.rootId);
                container.appendChild(this.node);
            }),
            (Element.prototype.isRunInBackground = function(
                canCreateDiscussions
            ) {
                if (void 0 === canCreateDiscussions) {
                    /** @type {boolean} */
                    canCreateDiscussions = true;
                }
                if (canCreateDiscussions) {
                    this.setLayerIndex(10);
                } else {
                    this.setLayerIndex(999);
                }
            }),
            (Element.prototype.setLayerIndex = function(layer) {
                var container = timer.getDOMRoot(this.rootId);
                container.style.zIndex = layer.toString();
            }),
            (Element.prototype.hide = function() {
                if (this.node && this.node.parentNode) {
                    this.node.parentNode.removeChild(this.node);
                }
            }),
            (Element.prototype.bind = function(el) {
                this.unbind();
                /** @type {!Object} */
                this.element = el;
                /** @type {string} */
                this.element.style.width = '100%';
                /** @type {string} */
                this.element.style.height = '100%';
                getStyle(this.element);
                this.node.appendChild(el);
            }),
            (Element.prototype.unbind = function() {
                if (this.element && this.element.parentNode == this.node) {
                    this.node.removeChild(this.element);
                }
                /** @type {null} */
                this.element = null;
            }),
            Object.defineProperty(Element.prototype, 'width', {
                get: function() {
                    return this.element.style.width;
                },
                enumerable: true,
                configurable: true
            }),
            Object.defineProperty(Element.prototype, 'height', {
                get: function() {
                    return this.element.style.height;
                },
                enumerable: true,
                configurable: true
            }),
            (Element.prototype.updatePosition = function() {
                var self = this.dp;
                if (null != self.stage) {
                    if (
                        (self.$renderNode.renderVisible =
                            0 == self.$renderNode.renderAlpha)
                    ) {
                        if (this.element && this.element.parentNode) {
                            return void this.element.parentNode.removeChild(
                                this.element
                            );
                        }
                    } else {
                        if (this.element && null == this.element.parentNode) {
                            this.node.appendChild(this.element);
                        }
                    }
                    var displayTransform = self.$renderNode.renderMatrix;
                    if (
                        this.lastMatrix.a != displayTransform.a ||
                        this.lastMatrix.b != displayTransform.b ||
                        this.lastMatrix.c != displayTransform.c ||
                        this.lastMatrix.d != displayTransform.d ||
                        this.lastMatrix.tx != displayTransform.tx ||
                        this.lastMatrix.ty != displayTransform.ty
                    ) {
                        egret.web.getPrefixStyleName('transform');
                        this.lastMatrix.a = displayTransform.a;
                        this.lastMatrix.b = displayTransform.b;
                        this.lastMatrix.c = displayTransform.c;
                        this.lastMatrix.d = displayTransform.d;
                        this.lastMatrix.tx = displayTransform.tx;
                        this.lastMatrix.ty = displayTransform.ty;
                    }
                    /** @type {!Element} */
                    var dom_node = document.getElementsByClassName(
                        'egret-player'
                    )[0];
                    /** @type {!Element} */
                    var object = dom_node.getElementsByTagName('canvas')[0];
                    /** @type {!ClientRect} */
                    var viewportSize = dom_node.getBoundingClientRect();
                    /** @type {!ClientRect} */
                    var patternSource = object.getBoundingClientRect();
                    /** @type {boolean} */
                    var o = false;
                    var orientation =
                        egret.MainContext.instance.stage.orientation;
                    if (orientation != egret.OrientationMode.AUTO) {
                        /** @type {boolean} */
                        o =
                            (orientation != egret.OrientationMode.PORTRAIT &&
                                viewportSize.height > viewportSize.width) ||
                            (orientation == egret.OrientationMode.PORTRAIT &&
                                viewportSize.width > viewportSize.height);
                    }
                    var delta;
                    var scale;
                    HTMLSectionBuilder.ExternalData.gcDataMap.get('isRetina');
                    if (o) {
                        /** @type {number} */
                        delta = patternSource.width / object.height;
                        /** @type {number} */
                        scale = patternSource.height / object.width;
                    } else {
                        /** @type {number} */
                        delta = patternSource.width / object.width;
                        /** @type {number} */
                        scale = patternSource.height / object.height;
                    }
                    var dir = egret.sys.DisplayList.$canvasScaleX || 1;
                    var shape = egret.sys.DisplayList.$canvasScaleY || 1;
                    /** @type {number} */
                    var w = delta * self.width * dir;
                    if (this.lastWidth != w) {
                        /** @type {string} */
                        this.node.style.width = w + 'px';
                        /** @type {number} */
                        this.lastWidth = w;
                    }
                    /** @type {number} */
                    var h = scale * self.height * shape;
                    if (this.lastHeight != h) {
                        /** @type {string} */
                        this.node.style.height = h + 'px';
                        /** @type {number} */
                        this.lastHeight = h;
                    }
                    var b = this.dp.parent.localToGlobal();
                    /** @type {number} */
                    var pos = b.x * delta * dir;
                    /** @type {string} */
                    this.node.style.left = pos + 'px';
                    /** @type {number} */
                    var y_body_bottom = b.y * scale * shape;
                    /** @type {string} */
                    this.node.style.top = y_body_bottom + 'px';
                }
            }),
            (Element.prototype.addEventListener = function(eventName, cb) {
                this.node.addEventListener(eventName, cb);
            }),
            (Element.prototype.removeEventListener = function(type, handler) {
                this.node.removeEventListener(type, handler);
            }),
            Element
        );
    })();
    HTMLSectionBuilder.DOMNode = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.DOMNode');
})(Core || (Core = {}));
!(function(self) {
    /**
     * @return {?}
     */
    function last() {
        return self.localizeStore.lang;
    }
    /**
     * @return {?}
     */
    function change() {
        return [self.LANG_HANS, self.LANG_HANT].indexOf(last()) >= 0;
    }
    /**
     * @return {?}
     */
    function language() {
        return self.soundManager.lang;
    }
    /**
     * @return {undefined}
     */
    function middleware() {
        self.localizeStore = self.LocalizeStore.instance;
        self.translate = self.localizeStore.translate.bind(self.localizeStore);
        self.substitute = self.localizeStore.substitute.bind(
            self.localizeStore
        );
        self.translateRes = self.localizeStore.translateRes.bind(
            self.localizeStore
        );
        self.soundManager = self.SoundManager.instance;
        self.ntimer = self.NonstopTimer.instance;
        self.globalStore = self.GlobalStore.instance;
    }
    /** @type {function(): ?} */
    self.getLang = last;
    /** @type {function(): ?} */
    self.isChineseLang = change;
    /** @type {function(): ?} */
    self.getLangSound = language;
    /** @type {function(): undefined} */
    self.setupShortcut = middleware;
})(Core || (Core = {}));
!(function(HTMLSectionBuilder) {
    var HTMLSection = (function(Base) {
        /**
         * @return {?}
         */
        function check() {
            var self = Base.call(this) || this;
            return (
                (self.iframe = document.createElement('iframe')),
                self.iframe.setAttribute('allow', 'autoplay; fullscreen'),
                self.bind(self.iframe),
                self
            );
        }
        return (
            __extends(check, Base),
            Object.defineProperty(check.prototype, 'src', {
                get: function() {
                    return this._src;
                },
                set: function(url) {
                    /** @type {string} */
                    this._src = url;
                    /** @type {string} */
                    this.iframe.src = url;
                },
                enumerable: true,
                configurable: true
            }),
            check
        );
    })(HTMLSectionBuilder.WebNode);
    HTMLSectionBuilder.WebView = HTMLSection;
    __reflect(HTMLSection.prototype, 'Core.WebView');
})(Core || (Core = {}));
var VVJJQ3J5cHRv = (function(t) {
    /**
     * @param {!Function} func
     * @param {!Object} module
     * @return {?}
     */
    function factory(func, module) {
        return (
            func(
                (module = {
                    exports: {}
                }),
                module.exports
            ),
            module.exports
        );
    }
    /**
     * @param {string} text
     * @return {?}
     */
    function parse(text) {
        var pipelets;
        var obj;
        var String;
        return (
            (pipelets = text.split('&')),
            (obj = {}),
            (String = true),
            pipelets.forEach(function(clusterShardData) {
                var row = clusterShardData.split('=');
                var str = row[0];
                var val = row[1];
                if (str) {
                    /** @type {boolean} */
                    String = false;
                    /** @type {string} */
                    obj[decodeURIComponent(str)] = val
                        ? decodeURIComponent(val)
                        : '';
                }
            }),
            true === String ? null : obj
        );
    }
    ('v1.1.1');
    if ('undefined' != typeof window) {
        window;
    } else {
        if ('undefined' != typeof global) {
            global;
        } else {
            if ('undefined' != typeof self) {
                self;
            }
        }
    }
    var a = factory(function(module, canCreateDiscussions) {
        var RestfulModelCollection;
        var e;
        var n;
        var p;
        var j;
        var f;
        var WordArray;
        var b;
        var Hex;
        var g;
        var primParser;
        var k;
        var s;
        module.exports = RestfulModelCollection =
            RestfulModelCollection ||
            ((e = Math),
            (n =
                Object.create ||
                (function() {
                    /**
                     * @return {undefined}
                     */
                    function shader() {}
                    return function(material) {
                        var shobj;
                        return (
                            (shader.prototype = material),
                            (shobj = new shader()),
                            (shader.prototype = null),
                            shobj
                        );
                    };
                })()),
            (j = (p = {}).lib = {}),
            (f = j.Base = {
                extend: function(opts) {
                    var c = n(this);
                    return (
                        opts && c.mixIn(opts),
                        (c.hasOwnProperty('init') && this.init !== c.init) ||
                            (c.init = function() {
                                c.$super.init.apply(this, arguments);
                            }),
                        ((c.init.prototype = c).$super = this),
                        c
                    );
                },
                create: function() {
                    var res = this.extend();
                    return res.init.apply(res, arguments), res;
                },
                init: function() {},
                mixIn: function(properties) {
                    var property;
                    for (property in properties) {
                        if (properties.hasOwnProperty(property)) {
                            this[property] = properties[property];
                        }
                    }
                    if (properties.hasOwnProperty('toString')) {
                        this.toString = properties.toString;
                    }
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            }),
            (WordArray = j.WordArray = f.extend({
                init: function(a, e) {
                    a = this.words = a || [];
                    this.sigBytes = null != e ? e : 4 * a.length;
                },
                toString: function(encoder) {
                    return (encoder || Hex).stringify(this);
                },
                concat: function(data) {
                    var thisWords = this.words;
                    var thatWords = data.words;
                    var c = this.sigBytes;
                    var dataSigBytes = data.sigBytes;
                    if ((this.clamp(), c % 4)) {
                        /** @type {number} */
                        var i = 0;
                        for (; dataSigBytes > i; i++) {
                            /** @type {number} */
                            var thatByte =
                                (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) &
                                255;
                            thisWords[(c + i) >>> 2] |=
                                thatByte << (24 - ((c + i) % 4) * 8);
                        }
                    } else {
                        /** @type {number} */
                        i = 0;
                        for (; dataSigBytes > i; i = i + 4) {
                            thisWords[(c + i) >>> 2] = thatWords[i >>> 2];
                        }
                    }
                    return (this.sigBytes += dataSigBytes), this;
                },
                clamp: function() {
                    var a = this.words;
                    var c = this.sigBytes;
                    a[c >>> 2] &= 4294967295 << (32 - (c % 4) * 8);
                    a.length = e.ceil(c / 4);
                },
                clone: function() {
                    var transformedMasterKey = f.clone.call(this);
                    return (
                        (transformedMasterKey.words = this.words.slice(0)),
                        transformedMasterKey
                    );
                },
                random: function(nBytes) {
                    var M;
                    /** @type {!Array} */
                    var hashWords = [];
                    /**
                     * @param {number} m_w
                     * @return {?}
                     */
                    var r = function(m_w) {
                        m_w = m_w;
                        /** @type {number} */
                        var nxt = 987654321;
                        /** @type {number} */
                        var mask = 4294967295;
                        return function() {
                            /** @type {number} */
                            var result =
                                (((nxt =
                                    (36969 * (65535 & nxt) + (nxt >> 16)) &
                                    mask) <<
                                    16) +
                                    (m_w =
                                        (18e3 * (65535 & m_w) + (m_w >> 16)) &
                                        mask)) &
                                mask;
                            return (
                                (result = result / 4294967296),
                                (result = result + 0.5) *
                                    (0.5 < e.random() ? 1 : -1)
                            );
                        };
                    };
                    /** @type {number} */
                    var ret = 0;
                    for (; nBytes > ret; ret = ret + 4) {
                        var _r = r(4294967296 * (M || e.random()));
                        /** @type {number} */
                        M = 987654071 * _r();
                        hashWords.push((4294967296 * _r()) | 0);
                    }
                    return new WordArray.init(hashWords, nBytes);
                }
            })),
            (b = p.enc = {}),
            (Hex = b.Hex = {
                stringify: function(a) {
                    var q = a.words;
                    var c = a.sigBytes;
                    /** @type {!Array} */
                    var outChance = [];
                    /** @type {number} */
                    var b = 0;
                    for (; c > b; b++) {
                        /** @type {number} */
                        var a = (q[b >>> 2] >>> (24 - (b % 4) * 8)) & 255;
                        outChance.push((a >>> 4).toString(16));
                        outChance.push((15 & a).toString(16));
                    }
                    return outChance.join('');
                },
                parse: function(txt) {
                    var hexStrLength = txt.length;
                    /** @type {!Array} */
                    var words = [];
                    /** @type {number} */
                    var i = 0;
                    for (; hexStrLength > i; i = i + 2) {
                        words[i >>> 3] |=
                            parseInt(txt.substr(i, 2), 16) <<
                            (24 - (i % 8) * 4);
                    }
                    return new WordArray.init(words, hexStrLength / 2);
                }
            }),
            (g = b.Latin1 = {
                stringify: function(a) {
                    var q = a.words;
                    var c = a.sigBytes;
                    /** @type {!Array} */
                    var element_array = [];
                    /** @type {number} */
                    var b = 0;
                    for (; c > b; b++) {
                        /** @type {number} */
                        var n = (q[b >>> 2] >>> (24 - (b % 4) * 8)) & 255;
                        element_array.push(String.fromCharCode(n));
                    }
                    return element_array.join('');
                },
                parse: function(txt) {
                    var l = txt.length;
                    /** @type {!Array} */
                    var words = [];
                    /** @type {number} */
                    var i = 0;
                    for (; l > i; i++) {
                        words[i >>> 2] |=
                            (255 & txt.charCodeAt(i)) << (24 - (i % 4) * 8);
                    }
                    return new WordArray.init(words, l);
                }
            }),
            (primParser = b.Utf8 = {
                stringify: function(val) {
                    try {
                        return decodeURIComponent(escape(g.stringify(val)));
                    } catch (t) {
                        throw new Error('Malformed UTF-8 data');
                    }
                },
                parse: function(message) {
                    return g.parse(unescape(encodeURIComponent(message)));
                }
            }),
            (k = j.BufferedBlockAlgorithm = f.extend({
                reset: function() {
                    this._data = new WordArray.init();
                    /** @type {number} */
                    this._nDataBytes = 0;
                },
                _append: function(data) {
                    if ('string' == typeof data) {
                        data = primParser.parse(data);
                    }
                    this._data.concat(data);
                    this._nDataBytes += data.sigBytes;
                },
                _process: function(doFlush) {
                    var data = this._data;
                    var dataWords = data.words;
                    var dataSigBytes = data.sigBytes;
                    var blockSize = this.blockSize;
                    /** @type {number} */
                    var blockSizeBytes = 4 * blockSize;
                    /** @type {number} */
                    var nBlocksReady = dataSigBytes / blockSizeBytes;
                    /** @type {number} */
                    var nWordsReady =
                        (nBlocksReady = doFlush
                            ? e.ceil(nBlocksReady)
                            : e.max(
                                  (0 | nBlocksReady) - this._minBufferSize,
                                  0
                              )) * blockSize;
                    var nBytesReady = e.min(4 * nWordsReady, dataSigBytes);
                    if (nWordsReady) {
                        /** @type {number} */
                        var offset = 0;
                        for (
                            ;
                            nWordsReady > offset;
                            offset = offset + blockSize
                        ) {
                            this._doProcessBlock(dataWords, offset);
                        }
                        var processedWords = dataWords.splice(0, nWordsReady);
                        data.sigBytes -= nBytesReady;
                    }
                    return new WordArray.init(processedWords, nBytesReady);
                },
                clone: function() {
                    var funcThread = f.clone.call(this);
                    return (funcThread._data = this._data.clone()), funcThread;
                },
                _minBufferSize: 0
            })),
            (j.Hasher = k.extend({
                cfg: f.extend(),
                init: function(cfg) {
                    this.cfg = this.cfg.extend(cfg);
                    this.reset();
                },
                reset: function() {
                    k.reset.call(this);
                    this._doReset();
                },
                update: function(buffer) {
                    return this._append(buffer), this._process(), this;
                },
                finalize: function(a) {
                    if (a) {
                        this._append(a);
                    }
                    var finalProcessedData = this._doFinalize();
                    return finalProcessedData;
                },
                blockSize: 16,
                _createHelper: function(hasher) {
                    return function(b, cfg) {
                        return new hasher.init(cfg).finalize(b);
                    };
                },
                _createHmacHelper: function(hasher) {
                    return function(b, f) {
                        return new s.HMAC.init(hasher, f).finalize(b);
                    };
                }
            })),
            (s = p.algo = {}),
            p);
    });
    var crypto = (factory(function(mixin, canCreateDiscussions) {
        var C;
        var crypto;
        var stubs;
        mixin.exports = ((stubs = (crypto = C = a).lib.WordArray),
        (crypto.enc.Base64 = {
            stringify: function(data) {
                var dataWords = data.words;
                var l = data.sigBytes;
                var map = this._map;
                data.clamp();
                /** @type {!Array} */
                var s = [];
                /** @type {number} */
                var i = 0;
                for (; l > i; i = i + 3) {
                    /** @type {number} */
                    var o =
                        (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) <<
                            16) |
                        (((dataWords[(i + 1) >>> 2] >>>
                            (24 - ((i + 1) % 4) * 8)) &
                            255) <<
                            8) |
                        ((dataWords[(i + 2) >>> 2] >>>
                            (24 - ((i + 2) % 4) * 8)) &
                            255);
                    /** @type {number} */
                    var w = 0;
                    for (; 4 > w && l > i + 0.75 * w; w++) {
                        s.push(map.charAt((o >>> (6 * (3 - w))) & 63));
                    }
                }
                var e = map.charAt(64);
                if (e) {
                    for (; s.length % 4; ) {
                        s.push(e);
                    }
                }
                return s.join('');
            },
            parse: function(f) {
                var e = f.length;
                var m = this._map;
                var reverseMap = this._reverseMap;
                if (!reverseMap) {
                    /** @type {!Array} */
                    reverseMap = this._reverseMap = [];
                    /** @type {number} */
                    var j = 0;
                    for (; j < m.length; j++) {
                        /** @type {number} */
                        reverseMap[m.charCodeAt(j)] = j;
                    }
                }
                var n = m.charAt(64);
                if (n) {
                    var s = f.indexOf(n);
                    if (-1 !== s) {
                        e = s;
                    }
                }
                return (function(data, b, reverseMap) {
                    /** @type {!Array} */
                    var b = [];
                    /** @type {number} */
                    var d = 0;
                    /** @type {number} */
                    var i = 0;
                    for (; b > i; i++) {
                        if (i % 4) {
                            /** @type {number} */
                            var o =
                                reverseMap[data.charCodeAt(i - 1)] <<
                                ((i % 4) * 2);
                            /** @type {number} */
                            var c4 =
                                reverseMap[data.charCodeAt(i)] >>>
                                (6 - (i % 4) * 2);
                            b[d >>> 2] |= (o | c4) << (24 - (d % 4) * 8);
                            d++;
                        }
                    }
                    return stubs.create(b, d);
                })(f, e, reverseMap);
            },
            _map:
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        }),
        C.enc.Base64);
    }),
    factory(function(mixin, canCreateDiscussions) {
        var CryptoJS;
        mixin.exports = ((CryptoJS = a),
        (function(Math) {
            /**
             * @param {number} c
             * @param {number} d
             * @param {number} a
             * @param {number} b
             * @param {?} x
             * @param {number} s
             * @param {?} t
             * @return {?}
             */
            function HH(c, d, a, b, x, s, t) {
                var n = c + ((d & a) | (~d & b)) + x + t;
                return ((n << s) | (n >>> (32 - s))) + d;
            }
            /**
             * @param {number} c
             * @param {number} d
             * @param {number} a
             * @param {number} b
             * @param {?} x
             * @param {number} s
             * @param {?} t
             * @return {?}
             */
            function GG(c, d, a, b, x, s, t) {
                var n = c + ((d & b) | (a & ~b)) + x + t;
                return ((n << s) | (n >>> (32 - s))) + d;
            }
            /**
             * @param {number} a
             * @param {number} b
             * @param {number} c
             * @param {number} d
             * @param {?} x
             * @param {number} s
             * @param {?} t
             * @return {?}
             */
            function II(a, b, c, d, x, s, t) {
                var n = a + (b ^ c ^ d) + x + t;
                return ((n << s) | (n >>> (32 - s))) + b;
            }
            /**
             * @param {number} a
             * @param {number} b
             * @param {?} c
             * @param {?} d
             * @param {?} x
             * @param {number} s
             * @param {?} t
             * @return {?}
             */
            function FF(a, b, c, d, x, s, t) {
                var n = a + (c ^ (b | ~d)) + x + t;
                return ((n << s) | (n >>> (32 - s))) + b;
            }
            var C = CryptoJS;
            var m = C.lib;
            var p = m.WordArray;
            var j = m.Hasher;
            var C_algo = C.algo;
            /** @type {!Array} */
            var T = [];
            !(function() {
                /** @type {number} */
                var i = 0;
                for (; 64 > i; i++) {
                    /** @type {number} */
                    T[i] = (4294967296 * Math.abs(Math.sin(i + 1))) | 0;
                }
            })();
            var MD5 = (C_algo.MD5 = j.extend({
                _doReset: function() {
                    this._hash = new p.init([
                        1732584193,
                        4023233417,
                        2562383102,
                        271733878
                    ]);
                },
                _doProcessBlock: function(M, offset) {
                    /** @type {number} */
                    var chunk = 0;
                    for (; 16 > chunk; chunk++) {
                        var l = offset + chunk;
                        var m = M[l];
                        /** @type {number} */
                        M[l] =
                            (16711935 & ((m << 8) | (m >>> 24))) |
                            (4278255360 & ((m << 24) | (m >>> 8)));
                    }
                    var H = this._hash.words;
                    var M_offset_0 = M[offset + 0];
                    var M_offset_5 = M[offset + 1];
                    var M_offset_2 = M[offset + 2];
                    var M_offset_3 = M[offset + 3];
                    var M_offset_8 = M[offset + 4];
                    var M_offset_9 = M[offset + 5];
                    var M_offset_6 = M[offset + 6];
                    var M_offset_7 = M[offset + 7];
                    var M_offset_1 = M[offset + 8];
                    var M_offset_12 = M[offset + 9];
                    var M_offset_10 = M[offset + 10];
                    var M_offset_11 = M[offset + 11];
                    var M_offset_13 = M[offset + 12];
                    var M_offset_4 = M[offset + 13];
                    var M_offset_14 = M[offset + 14];
                    var M_offset_15 = M[offset + 15];
                    var a = H[0];
                    var b = H[1];
                    var c = H[2];
                    var d = H[3];
                    b = FF(
                        (b = FF(
                            (b = FF(
                                (b = FF(
                                    (b = II(
                                        (b = II(
                                            (b = II(
                                                (b = II(
                                                    (b = GG(
                                                        (b = GG(
                                                            (b = GG(
                                                                (b = GG(
                                                                    (b = HH(
                                                                        (b = HH(
                                                                            (b = HH(
                                                                                (b = HH(
                                                                                    b,
                                                                                    (c = HH(
                                                                                        c,
                                                                                        (d = HH(
                                                                                            d,
                                                                                            (a = HH(
                                                                                                a,
                                                                                                b,
                                                                                                c,
                                                                                                d,
                                                                                                M_offset_0,
                                                                                                7,
                                                                                                T[0]
                                                                                            )),
                                                                                            b,
                                                                                            c,
                                                                                            M_offset_5,
                                                                                            12,
                                                                                            T[1]
                                                                                        )),
                                                                                        a,
                                                                                        b,
                                                                                        M_offset_2,
                                                                                        17,
                                                                                        T[2]
                                                                                    )),
                                                                                    d,
                                                                                    a,
                                                                                    M_offset_3,
                                                                                    22,
                                                                                    T[3]
                                                                                )),
                                                                                (c = HH(
                                                                                    c,
                                                                                    (d = HH(
                                                                                        d,
                                                                                        (a = HH(
                                                                                            a,
                                                                                            b,
                                                                                            c,
                                                                                            d,
                                                                                            M_offset_8,
                                                                                            7,
                                                                                            T[4]
                                                                                        )),
                                                                                        b,
                                                                                        c,
                                                                                        M_offset_9,
                                                                                        12,
                                                                                        T[5]
                                                                                    )),
                                                                                    a,
                                                                                    b,
                                                                                    M_offset_6,
                                                                                    17,
                                                                                    T[6]
                                                                                )),
                                                                                d,
                                                                                a,
                                                                                M_offset_7,
                                                                                22,
                                                                                T[7]
                                                                            )),
                                                                            (c = HH(
                                                                                c,
                                                                                (d = HH(
                                                                                    d,
                                                                                    (a = HH(
                                                                                        a,
                                                                                        b,
                                                                                        c,
                                                                                        d,
                                                                                        M_offset_1,
                                                                                        7,
                                                                                        T[8]
                                                                                    )),
                                                                                    b,
                                                                                    c,
                                                                                    M_offset_12,
                                                                                    12,
                                                                                    T[9]
                                                                                )),
                                                                                a,
                                                                                b,
                                                                                M_offset_10,
                                                                                17,
                                                                                T[10]
                                                                            )),
                                                                            d,
                                                                            a,
                                                                            M_offset_11,
                                                                            22,
                                                                            T[11]
                                                                        )),
                                                                        (c = HH(
                                                                            c,
                                                                            (d = HH(
                                                                                d,
                                                                                (a = HH(
                                                                                    a,
                                                                                    b,
                                                                                    c,
                                                                                    d,
                                                                                    M_offset_13,
                                                                                    7,
                                                                                    T[12]
                                                                                )),
                                                                                b,
                                                                                c,
                                                                                M_offset_4,
                                                                                12,
                                                                                T[13]
                                                                            )),
                                                                            a,
                                                                            b,
                                                                            M_offset_14,
                                                                            17,
                                                                            T[14]
                                                                        )),
                                                                        d,
                                                                        a,
                                                                        M_offset_15,
                                                                        22,
                                                                        T[15]
                                                                    )),
                                                                    (c = GG(
                                                                        c,
                                                                        (d = GG(
                                                                            d,
                                                                            (a = GG(
                                                                                a,
                                                                                b,
                                                                                c,
                                                                                d,
                                                                                M_offset_5,
                                                                                5,
                                                                                T[16]
                                                                            )),
                                                                            b,
                                                                            c,
                                                                            M_offset_6,
                                                                            9,
                                                                            T[17]
                                                                        )),
                                                                        a,
                                                                        b,
                                                                        M_offset_11,
                                                                        14,
                                                                        T[18]
                                                                    )),
                                                                    d,
                                                                    a,
                                                                    M_offset_0,
                                                                    20,
                                                                    T[19]
                                                                )),
                                                                (c = GG(
                                                                    c,
                                                                    (d = GG(
                                                                        d,
                                                                        (a = GG(
                                                                            a,
                                                                            b,
                                                                            c,
                                                                            d,
                                                                            M_offset_9,
                                                                            5,
                                                                            T[20]
                                                                        )),
                                                                        b,
                                                                        c,
                                                                        M_offset_10,
                                                                        9,
                                                                        T[21]
                                                                    )),
                                                                    a,
                                                                    b,
                                                                    M_offset_15,
                                                                    14,
                                                                    T[22]
                                                                )),
                                                                d,
                                                                a,
                                                                M_offset_8,
                                                                20,
                                                                T[23]
                                                            )),
                                                            (c = GG(
                                                                c,
                                                                (d = GG(
                                                                    d,
                                                                    (a = GG(
                                                                        a,
                                                                        b,
                                                                        c,
                                                                        d,
                                                                        M_offset_12,
                                                                        5,
                                                                        T[24]
                                                                    )),
                                                                    b,
                                                                    c,
                                                                    M_offset_14,
                                                                    9,
                                                                    T[25]
                                                                )),
                                                                a,
                                                                b,
                                                                M_offset_3,
                                                                14,
                                                                T[26]
                                                            )),
                                                            d,
                                                            a,
                                                            M_offset_1,
                                                            20,
                                                            T[27]
                                                        )),
                                                        (c = GG(
                                                            c,
                                                            (d = GG(
                                                                d,
                                                                (a = GG(
                                                                    a,
                                                                    b,
                                                                    c,
                                                                    d,
                                                                    M_offset_4,
                                                                    5,
                                                                    T[28]
                                                                )),
                                                                b,
                                                                c,
                                                                M_offset_2,
                                                                9,
                                                                T[29]
                                                            )),
                                                            a,
                                                            b,
                                                            M_offset_7,
                                                            14,
                                                            T[30]
                                                        )),
                                                        d,
                                                        a,
                                                        M_offset_13,
                                                        20,
                                                        T[31]
                                                    )),
                                                    (c = II(
                                                        c,
                                                        (d = II(
                                                            d,
                                                            (a = II(
                                                                a,
                                                                b,
                                                                c,
                                                                d,
                                                                M_offset_9,
                                                                4,
                                                                T[32]
                                                            )),
                                                            b,
                                                            c,
                                                            M_offset_1,
                                                            11,
                                                            T[33]
                                                        )),
                                                        a,
                                                        b,
                                                        M_offset_11,
                                                        16,
                                                        T[34]
                                                    )),
                                                    d,
                                                    a,
                                                    M_offset_14,
                                                    23,
                                                    T[35]
                                                )),
                                                (c = II(
                                                    c,
                                                    (d = II(
                                                        d,
                                                        (a = II(
                                                            a,
                                                            b,
                                                            c,
                                                            d,
                                                            M_offset_5,
                                                            4,
                                                            T[36]
                                                        )),
                                                        b,
                                                        c,
                                                        M_offset_8,
                                                        11,
                                                        T[37]
                                                    )),
                                                    a,
                                                    b,
                                                    M_offset_7,
                                                    16,
                                                    T[38]
                                                )),
                                                d,
                                                a,
                                                M_offset_10,
                                                23,
                                                T[39]
                                            )),
                                            (c = II(
                                                c,
                                                (d = II(
                                                    d,
                                                    (a = II(
                                                        a,
                                                        b,
                                                        c,
                                                        d,
                                                        M_offset_4,
                                                        4,
                                                        T[40]
                                                    )),
                                                    b,
                                                    c,
                                                    M_offset_0,
                                                    11,
                                                    T[41]
                                                )),
                                                a,
                                                b,
                                                M_offset_3,
                                                16,
                                                T[42]
                                            )),
                                            d,
                                            a,
                                            M_offset_6,
                                            23,
                                            T[43]
                                        )),
                                        (c = II(
                                            c,
                                            (d = II(
                                                d,
                                                (a = II(
                                                    a,
                                                    b,
                                                    c,
                                                    d,
                                                    M_offset_12,
                                                    4,
                                                    T[44]
                                                )),
                                                b,
                                                c,
                                                M_offset_13,
                                                11,
                                                T[45]
                                            )),
                                            a,
                                            b,
                                            M_offset_15,
                                            16,
                                            T[46]
                                        )),
                                        d,
                                        a,
                                        M_offset_2,
                                        23,
                                        T[47]
                                    )),
                                    (c = FF(
                                        c,
                                        (d = FF(
                                            d,
                                            (a = FF(
                                                a,
                                                b,
                                                c,
                                                d,
                                                M_offset_0,
                                                6,
                                                T[48]
                                            )),
                                            b,
                                            c,
                                            M_offset_7,
                                            10,
                                            T[49]
                                        )),
                                        a,
                                        b,
                                        M_offset_14,
                                        15,
                                        T[50]
                                    )),
                                    d,
                                    a,
                                    M_offset_9,
                                    21,
                                    T[51]
                                )),
                                (c = FF(
                                    c,
                                    (d = FF(
                                        d,
                                        (a = FF(
                                            a,
                                            b,
                                            c,
                                            d,
                                            M_offset_13,
                                            6,
                                            T[52]
                                        )),
                                        b,
                                        c,
                                        M_offset_3,
                                        10,
                                        T[53]
                                    )),
                                    a,
                                    b,
                                    M_offset_10,
                                    15,
                                    T[54]
                                )),
                                d,
                                a,
                                M_offset_5,
                                21,
                                T[55]
                            )),
                            (c = FF(
                                c,
                                (d = FF(
                                    d,
                                    (a = FF(a, b, c, d, M_offset_1, 6, T[56])),
                                    b,
                                    c,
                                    M_offset_15,
                                    10,
                                    T[57]
                                )),
                                a,
                                b,
                                M_offset_6,
                                15,
                                T[58]
                            )),
                            d,
                            a,
                            M_offset_4,
                            21,
                            T[59]
                        )),
                        (c = FF(
                            c,
                            (d = FF(
                                d,
                                (a = FF(a, b, c, d, M_offset_8, 6, T[60])),
                                b,
                                c,
                                M_offset_11,
                                10,
                                T[61]
                            )),
                            a,
                            b,
                            M_offset_2,
                            15,
                            T[62]
                        )),
                        d,
                        a,
                        M_offset_12,
                        21,
                        T[63]
                    );
                    /** @type {number} */
                    H[0] = (H[0] + a) | 0;
                    /** @type {number} */
                    H[1] = (H[1] + b) | 0;
                    /** @type {number} */
                    H[2] = (H[2] + c) | 0;
                    /** @type {number} */
                    H[3] = (H[3] + d) | 0;
                },
                _doFinalize: function() {
                    var e = this._data;
                    var q = e.words;
                    /** @type {number} */
                    var d = 8 * this._nDataBytes;
                    /** @type {number} */
                    var b = 8 * e.sigBytes;
                    q[b >>> 5] |= 128 << (24 - (b % 32));
                    /** @type {number} */
                    var s = Math.floor(d / 4294967296);
                    /** @type {number} */
                    var u = d;
                    /** @type {number} */
                    q[15 + (((b + 64) >>> 9) << 4)] =
                        (16711935 & ((s << 8) | (s >>> 24))) |
                        (4278255360 & ((s << 24) | (s >>> 8)));
                    /** @type {number} */
                    q[14 + (((b + 64) >>> 9) << 4)] =
                        (16711935 & ((u << 8) | (u >>> 24))) |
                        (4278255360 & ((u << 24) | (u >>> 8)));
                    /** @type {number} */
                    e.sigBytes = 4 * (q.length + 1);
                    this._process();
                    var hash = this._hash;
                    var H = hash.words;
                    /** @type {number} */
                    var j = 0;
                    for (; 4 > j; j++) {
                        var a = H[j];
                        /** @type {number} */
                        H[j] =
                            (16711935 & ((a << 8) | (a >>> 24))) |
                            (4278255360 & ((a << 24) | (a >>> 8)));
                    }
                    return hash;
                },
                clone: function() {
                    var _this = j.clone.call(this);
                    return (_this._hash = this._hash.clone()), _this;
                }
            }));
            C.MD5 = j._createHelper(MD5);
            C.HmacMD5 = j._createHmacHelper(MD5);
        })(Math),
        CryptoJS.MD5);
    }),
    factory(function(mixin, canCreateDiscussions) {
        var i;
        var e;
        var b;
        var c;
        var j;
        var _ref;
        var l;
        var m;
        mixin.exports = ((b = (e = i = a).lib),
        (c = b.WordArray),
        (j = b.Hasher),
        (_ref = e.algo),
        (l = []),
        (m = _ref.SHA1 = j.extend({
            _doReset: function() {
                this._hash = new c.init([
                    1732584193,
                    4023233417,
                    2562383102,
                    271733878,
                    3285377520
                ]);
            },
            _doProcessBlock: function(M, offset) {
                var b = this._hash.words;
                var h = b[0];
                var g = b[1];
                var e = b[2];
                var k = b[3];
                var j = b[4];
                /** @type {number} */
                var i = 0;
                for (; 80 > i; i++) {
                    if (16 > i) {
                        /** @type {number} */
                        l[i] = 0 | M[offset + i];
                    } else {
                        /** @type {number} */
                        var u = l[i - 3] ^ l[i - 8] ^ l[i - 14] ^ l[i - 16];
                        /** @type {number} */
                        l[i] = (u << 1) | (u >>> 31);
                    }
                    var deltaY = ((h << 5) | (h >>> 27)) + j + l[i];
                    deltaY =
                        deltaY +
                        (20 > i
                            ? 1518500249 + ((g & e) | (~g & k))
                            : 40 > i
                                ? 1859775393 + (g ^ e ^ k)
                                : 60 > i
                                    ? ((g & e) | (g & k) | (e & k)) - 1894007588
                                    : (g ^ e ^ k) - 899497514);
                    j = k;
                    k = e;
                    /** @type {number} */
                    e = (g << 30) | (g >>> 2);
                    g = h;
                    h = deltaY;
                }
                /** @type {number} */
                b[0] = (b[0] + h) | 0;
                /** @type {number} */
                b[1] = (b[1] + g) | 0;
                /** @type {number} */
                b[2] = (b[2] + e) | 0;
                /** @type {number} */
                b[3] = (b[3] + k) | 0;
                /** @type {number} */
                b[4] = (b[4] + j) | 0;
            },
            _doFinalize: function() {
                var f = this._data;
                var d = f.words;
                /** @type {number} */
                var b = 8 * this._nDataBytes;
                /** @type {number} */
                var c = 8 * f.sigBytes;
                return (
                    (d[c >>> 5] |= 128 << (24 - (c % 32))),
                    (d[14 + (((c + 64) >>> 9) << 4)] = Math.floor(
                        b / 4294967296
                    )),
                    (d[15 + (((c + 64) >>> 9) << 4)] = b),
                    (f.sigBytes = 4 * d.length),
                    this._process(),
                    this._hash
                );
            },
            clone: function() {
                var _this = j.clone.call(this);
                return (_this._hash = this._hash.clone()), _this;
            }
        })),
        (e.SHA1 = j._createHelper(m)),
        (e.HmacSHA1 = j._createHmacHelper(m)),
        i.SHA1);
    }),
    factory(function(mixin, canCreateDiscussions) {
        var e;
        var _ref;
        var Base;
        var o;
        var u;
        var cs;
        mixin.exports = ((_ref = (e = a).lib),
        (Base = _ref.Base),
        (o = e.enc),
        (u = o.Utf8),
        (cs = e.algo),
        void (cs.HMAC = Base.extend({
            init: function(e, f) {
                e = this._hasher = new e.init();
                if ('string' == typeof f) {
                    f = u.parse(f);
                }
                var i = e.blockSize;
                /** @type {number} */
                var k = 4 * i;
                if (f.sigBytes > k) {
                    f = e.finalize(f);
                }
                f.clamp();
                var oKey = (this._oKey = f.clone());
                var d = (this._iKey = f.clone());
                var oKeyWords = oKey.words;
                var q = d.words;
                /** @type {number} */
                var j = 0;
                for (; i > j; j++) {
                    oKeyWords[j] ^= 1549556828;
                    q[j] ^= 909522486;
                }
                /** @type {number} */
                oKey.sigBytes = d.sigBytes = k;
                this.reset();
            },
            reset: function() {
                var hasher = this._hasher;
                hasher.reset();
                hasher.update(this._iKey);
            },
            update: function(buf) {
                return this._hasher.update(buf), this;
            },
            finalize: function(obj) {
                var f = this._hasher;
                var e = f.finalize(obj);
                f.reset();
                var reduced = f.finalize(this._oKey.clone().concat(e));
                return reduced;
            }
        })));
    }),
    factory(function(mixin, canCreateDiscussions) {
        var C;
        var CryptoJS;
        var _ref;
        var Base;
        var WordArray;
        var C_algo;
        var SHA1;
        var PBKDF1;
        mixin.exports = ((_ref = (CryptoJS = C = a).lib),
        (Base = _ref.Base),
        (WordArray = _ref.WordArray),
        (C_algo = CryptoJS.algo),
        (SHA1 = C_algo.MD5),
        (PBKDF1 = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
                keySize: 4,
                hasher: SHA1,
                iterations: 1
            }),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
            },
            compute: function(data, key) {
                var cfg = this.cfg;
                var sha256 = cfg.hasher.create();
                var a = WordArray.create();
                var derivedKeyWords = a.words;
                var keySize = cfg.keySize;
                var iterations = cfg.iterations;
                for (; derivedKeyWords.length < keySize; ) {
                    if (b) {
                        sha256.update(b);
                    }
                    var b = sha256.update(data).finalize(key);
                    sha256.reset();
                    /** @type {number} */
                    var max = 1;
                    for (; iterations > max; max++) {
                        b = sha256.finalize(b);
                        sha256.reset();
                    }
                    a.concat(b);
                }
                return (a.sigBytes = 4 * keySize), a;
            }
        })),
        (CryptoJS.EvpKDF = function(password, salt, cfg) {
            return PBKDF1.create(cfg).compute(password, salt);
        }),
        C.EvpKDF);
    }),
    factory(function(mixin, canCreateDiscussions) {
        var tmp2;
        var C;
        var C_lib;
        var Base;
        var WordArray;
        var BufferedBlockAlgorithm;
        var global;
        var Base64;
        var algorithm;
        var EvpKDF;
        var Cipher;
        var C_mode;
        var BufferedNode;
        var MODE_DRAWING_LINE;
        var C_pad;
        var padding;
        var CipherParams;
        var C_format;
        var sourceFormat;
        var SerializableCipher;
        var C_kdf;
        var OpenSSLKdf;
        var index;
        mixin.exports = void (
            (tmp2 = a).lib.Cipher ||
            ((C_lib = (C = tmp2).lib),
            (Base = C_lib.Base),
            (WordArray = C_lib.WordArray),
            (BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm),
            (global = C.enc).Utf8,
            (Base64 = global.Base64),
            (algorithm = C.algo),
            (EvpKDF = algorithm.EvpKDF),
            (Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
                cfg: Base.extend(),
                createEncryptor: function(key, cfg) {
                    return this.create(this._ENC_XFORM_MODE, key, cfg);
                },
                createDecryptor: function(key, cfg) {
                    return this.create(this._DEC_XFORM_MODE, key, cfg);
                },
                init: function(xformMode, key, cfg) {
                    this.cfg = this.cfg.extend(cfg);
                    /** @type {number} */
                    this._xformMode = xformMode;
                    /** @type {string} */
                    this._key = key;
                    this.reset();
                },
                reset: function() {
                    BufferedBlockAlgorithm.reset.call(this);
                    this._doReset();
                },
                process: function(dataUpdate) {
                    return this._append(dataUpdate), this._process();
                },
                finalize: function(a) {
                    if (a) {
                        this._append(a);
                    }
                    var finalProcessedData = this._doFinalize();
                    return finalProcessedData;
                },
                keySize: 4,
                ivSize: 4,
                _ENC_XFORM_MODE: 1,
                _DEC_XFORM_MODE: 2,
                _createHelper: (function() {
                    /**
                     * @param {!Function} key
                     * @return {?}
                     */
                    function selectCipherStrategy(key) {
                        return 'string' == typeof key
                            ? index
                            : SerializableCipher;
                    }
                    return function(message) {
                        return {
                            encrypt: function(data, key, cfg) {
                                return selectCipherStrategy(key).encrypt(
                                    message,
                                    data,
                                    key,
                                    cfg
                                );
                            },
                            decrypt: function(cipher, key, cfg) {
                                return selectCipherStrategy(key).decrypt(
                                    message,
                                    cipher,
                                    key,
                                    cfg
                                );
                            }
                        };
                    };
                })()
            })),
            (C_lib.StreamCipher = Cipher.extend({
                _doFinalize: function() {
                    var finalProcessedBlocks = this._process(true);
                    return finalProcessedBlocks;
                },
                blockSize: 1
            })),
            (C_mode = C.mode = {}),
            (BufferedNode = C_lib.BlockCipherMode = Base.extend({
                createEncryptor: function(cipher, iv) {
                    return this.Encryptor.create(cipher, iv);
                },
                createDecryptor: function(cipher, iv) {
                    return this.Decryptor.create(cipher, iv);
                },
                init: function(cipher, iv) {
                    /** @type {!Object} */
                    this._cipher = cipher;
                    /** @type {!Array} */
                    this._iv = iv;
                }
            })),
            (MODE_DRAWING_LINE = C_mode.CBC = (function() {
                /**
                 * @param {?} words
                 * @param {number} offset
                 * @param {number} length
                 * @return {undefined}
                 */
                function generateKeystreamAndEncrypt(words, offset, length) {
                    var iv = this._iv;
                    if (iv) {
                        var block = iv;
                        this._iv = void 0;
                    } else {
                        block = this._prevBlock;
                    }
                    /** @type {number} */
                    var i = 0;
                    for (; length > i; i++) {
                        words[offset + i] ^= block[i];
                    }
                }
                var CTRGladman = BufferedNode.extend();
                return (
                    (CTRGladman.Encryptor = CTRGladman.extend({
                        processBlock: function(words, offset) {
                            var cipher = this._cipher;
                            var blockSize = cipher.blockSize;
                            generateKeystreamAndEncrypt.call(
                                this,
                                words,
                                offset,
                                blockSize
                            );
                            cipher.encryptBlock(words, offset);
                            this._prevBlock = words.slice(
                                offset,
                                offset + blockSize
                            );
                        }
                    })),
                    (CTRGladman.Decryptor = CTRGladman.extend({
                        processBlock: function(words, offset) {
                            var cipher = this._cipher;
                            var blockSize = cipher.blockSize;
                            var thisBlock = words.slice(
                                offset,
                                offset + blockSize
                            );
                            cipher.decryptBlock(words, offset);
                            generateKeystreamAndEncrypt.call(
                                this,
                                words,
                                offset,
                                blockSize
                            );
                            this._prevBlock = thisBlock;
                        }
                    })),
                    CTRGladman
                );
            })()),
            (C_pad = C.pad = {}),
            (padding = C_pad.Pkcs7 = {
                pad: function(data, callback) {
                    /** @type {number} */
                    var blockSizeBytes = 4 * callback;
                    /** @type {number} */
                    var nPaddingBytes =
                        blockSizeBytes - (data.sigBytes % blockSizeBytes);
                    /** @type {number} */
                    var paddingWord =
                        (nPaddingBytes << 24) |
                        (nPaddingBytes << 16) |
                        (nPaddingBytes << 8) |
                        nPaddingBytes;
                    /** @type {!Array} */
                    var paddingWords = [];
                    /** @type {number} */
                    var order = 0;
                    for (; nPaddingBytes > order; order = order + 4) {
                        paddingWords.push(paddingWord);
                    }
                    var padding = WordArray.create(paddingWords, nPaddingBytes);
                    data.concat(padding);
                },
                unpad: function(data) {
                    /** @type {number} */
                    var nBytesReady =
                        255 & data.words[(data.sigBytes - 1) >>> 2];
                    data.sigBytes -= nBytesReady;
                }
            }),
            (C_lib.BlockCipher = Cipher.extend({
                cfg: Cipher.cfg.extend({
                    mode: MODE_DRAWING_LINE,
                    padding: padding
                }),
                reset: function() {
                    Cipher.reset.call(this);
                    var cfg = this.cfg;
                    var iv = cfg.iv;
                    var mode = cfg.mode;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                        var modeCreator = mode.createEncryptor;
                    } else {
                        modeCreator = mode.createDecryptor;
                        /** @type {number} */
                        this._minBufferSize = 1;
                    }
                    if (this._mode && this._mode.__creator == modeCreator) {
                        this._mode.init(this, iv && iv.words);
                    } else {
                        this._mode = modeCreator.call(
                            mode,
                            this,
                            iv && iv.words
                        );
                        this._mode.__creator = modeCreator;
                    }
                },
                _doProcessBlock: function(words, offset) {
                    this._mode.processBlock(words, offset);
                },
                _doFinalize: function() {
                    var padding = this.cfg.padding;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                        padding.pad(this._data, this.blockSize);
                        var finalProcessedBlocks = this._process(true);
                    } else {
                        finalProcessedBlocks = this._process(true);
                        padding.unpad(finalProcessedBlocks);
                    }
                    return finalProcessedBlocks;
                },
                blockSize: 4
            })),
            (CipherParams = C_lib.CipherParams = Base.extend({
                init: function(cipherParams) {
                    this.mixIn(cipherParams);
                },
                toString: function(formatter) {
                    return (formatter || this.formatter).stringify(this);
                }
            })),
            (C_format = C.format = {}),
            (sourceFormat = C_format.OpenSSL = {
                stringify: function(v) {
                    var ciphertext = v.ciphertext;
                    var salt = v.salt;
                    if (salt) {
                        var wordArray = WordArray.create([
                            1398893684,
                            1701076831
                        ])
                            .concat(salt)
                            .concat(ciphertext);
                    } else {
                        wordArray = ciphertext;
                    }
                    return wordArray.toString(Base64);
                },
                parse: function(t) {
                    var a = Base64.parse(t);
                    var k = a.words;
                    if (1398893684 == k[0] && 1701076831 == k[1]) {
                        var generatedSalt = WordArray.create(k.slice(2, 4));
                        k.splice(0, 4);
                        a.sigBytes -= 16;
                    }
                    return CipherParams.create({
                        ciphertext: a,
                        salt: generatedSalt
                    });
                }
            }),
            (SerializableCipher = C_lib.SerializableCipher = Base.extend({
                cfg: Base.extend({
                    format: sourceFormat
                }),
                encrypt: function(cipher, message, key, cfg) {
                    cfg = this.cfg.extend(cfg);
                    var encryptor = cipher.createEncryptor(key, cfg);
                    var ciphertext = encryptor.finalize(message);
                    var cipherCfg = encryptor.cfg;
                    return CipherParams.create({
                        ciphertext: ciphertext,
                        key: key,
                        iv: cipherCfg.iv,
                        algorithm: cipher,
                        mode: cipherCfg.mode,
                        padding: cipherCfg.padding,
                        blockSize: cipher.blockSize,
                        formatter: cfg.format
                    });
                },
                decrypt: function(cipher, ciphertext, key, cfg) {
                    cfg = this.cfg.extend(cfg);
                    ciphertext = this._parse(ciphertext, cfg.format);
                    var outStream = cipher
                        .createDecryptor(key, cfg)
                        .finalize(ciphertext.ciphertext);
                    return outStream;
                },
                _parse: function(a, f) {
                    return 'string' == typeof a ? f.parse(a, this) : a;
                }
            })),
            (C_kdf = C.kdf = {}),
            (OpenSSLKdf = C_kdf.OpenSSL = {
                execute: function(password, keySize, ivSize, salt) {
                    if (!salt) {
                        salt = WordArray.random(8);
                    }
                    var hash = EvpKDF.create({
                        keySize: keySize + ivSize
                    }).compute(password, salt);
                    var iv = WordArray.create(
                        hash.words.slice(keySize),
                        4 * ivSize
                    );
                    return (
                        (hash.sigBytes = 4 * keySize),
                        CipherParams.create({
                            key: hash,
                            iv: iv,
                            salt: salt
                        })
                    );
                }
            }),
            (index = C_lib.PasswordBasedCipher = SerializableCipher.extend({
                cfg: SerializableCipher.cfg.extend({
                    kdf: OpenSSLKdf
                }),
                encrypt: function(cipher, message, password, cfg) {
                    var derivedParams = (cfg = this.cfg.extend(
                        cfg
                    )).kdf.execute(password, cipher.keySize, cipher.ivSize);
                    cfg.iv = derivedParams.iv;
                    var ciphertext = SerializableCipher.encrypt.call(
                        this,
                        cipher,
                        message,
                        derivedParams.key,
                        cfg
                    );
                    return ciphertext.mixIn(derivedParams), ciphertext;
                },
                decrypt: function(cipher, ciphertext, key, cfg) {
                    cfg = this.cfg.extend(cfg);
                    ciphertext = this._parse(ciphertext, cfg.format);
                    var res = cfg.kdf.execute(
                        key,
                        cipher.keySize,
                        cipher.ivSize,
                        ciphertext.salt
                    );
                    cfg.iv = res.iv;
                    var plaintext = SerializableCipher.decrypt.call(
                        this,
                        cipher,
                        ciphertext,
                        res.key,
                        cfg
                    );
                    return plaintext;
                }
            })))
        );
    }),
    factory(function(mixin, canCreateDiscussions) {
        var CryptoJS;
        mixin.exports = ((CryptoJS = a),
        (function() {
            var C = CryptoJS;
            var BlockCipher = C.lib.BlockCipher;
            var C_algo = C.algo;
            /** @type {!Array} */
            var SBOX = [];
            /** @type {!Array} */
            var INV_SBOX = [];
            /** @type {!Array} */
            var SUB_MIX_0 = [];
            /** @type {!Array} */
            var SUB_MIX_1 = [];
            /** @type {!Array} */
            var SUB_MIX_2 = [];
            /** @type {!Array} */
            var SUB_MIX_3 = [];
            /** @type {!Array} */
            var INV_SUB_MIX_0 = [];
            /** @type {!Array} */
            var INV_SUB_MIX_1 = [];
            /** @type {!Array} */
            var INV_SUB_MIX_2 = [];
            /** @type {!Array} */
            var INV_SUB_MIX_3 = [];
            !(function() {
                /** @type {!Array} */
                var d = [];
                /** @type {number} */
                var search_lemma = 0;
                for (; 256 > search_lemma; search_lemma++) {
                    /** @type {number} */
                    d[search_lemma] =
                        128 > search_lemma
                            ? search_lemma << 1
                            : (search_lemma << 1) ^ 283;
                }
                /** @type {number} */
                var x = 0;
                /** @type {number} */
                var xi = 0;
                /** @type {number} */
                search_lemma = 0;
                for (; 256 > search_lemma; search_lemma++) {
                    /** @type {number} */
                    var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
                    /** @type {number} */
                    sx = (sx >>> 8) ^ (255 & sx) ^ 99;
                    /** @type {number} */
                    SBOX[x] = sx;
                    var x2 = d[(INV_SBOX[sx] = x)];
                    var x4 = d[x2];
                    var x8 = d[x4];
                    /** @type {number} */
                    var t = (257 * d[sx]) ^ (16843008 * sx);
                    /** @type {number} */
                    SUB_MIX_0[x] = (t << 24) | (t >>> 8);
                    /** @type {number} */
                    SUB_MIX_1[x] = (t << 16) | (t >>> 16);
                    /** @type {number} */
                    SUB_MIX_2[x] = (t << 8) | (t >>> 24);
                    /** @type {number} */
                    SUB_MIX_3[x] = t;
                    /** @type {number} */
                    t =
                        (16843009 * x8) ^
                        (65537 * x4) ^
                        (257 * x2) ^
                        (16843008 * x);
                    /** @type {number} */
                    INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
                    /** @type {number} */
                    INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
                    /** @type {number} */
                    INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
                    /** @type {number} */
                    INV_SUB_MIX_3[sx] = t;
                    if (x) {
                        /** @type {number} */
                        x = x2 ^ d[d[d[x8 ^ x2]]];
                        /** @type {number} */
                        xi = xi ^ d[d[xi]];
                    } else {
                        /** @type {number} */
                        x = xi = 1;
                    }
                }
            })();
            /** @type {!Array} */
            var b = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
            var AES = (C_algo.AES = BlockCipher.extend({
                _doReset: function() {
                    if (!this._nRounds || this._keyPriorReset !== this._key) {
                        var b = (this._keyPriorReset = this._key);
                        var c = b.words;
                        /** @type {number} */
                        var n = b.sigBytes / 4;
                        /** @type {number} */
                        var len = 4 * ((this._nRounds = n + 6) + 1);
                        /** @type {!Array} */
                        var a = (this._keySchedule = []);
                        /** @type {number} */
                        var i = 0;
                        for (; len > i; i++) {
                            if (n > i) {
                                a[i] = c[i];
                            } else {
                                var key = a[i - 1];
                                if (i % n) {
                                    if (n > 6 && i % n == 4) {
                                        /** @type {number} */
                                        key =
                                            (SBOX[key >>> 24] << 24) |
                                            (SBOX[(key >>> 16) & 255] << 16) |
                                            (SBOX[(key >>> 8) & 255] << 8) |
                                            SBOX[255 & key];
                                    }
                                } else {
                                    /** @type {number} */
                                    key =
                                        (SBOX[
                                            (key =
                                                (key << 8) | (key >>> 24)) >>>
                                                24
                                        ] <<
                                            24) |
                                        (SBOX[(key >>> 16) & 255] << 16) |
                                        (SBOX[(key >>> 8) & 255] << 8) |
                                        SBOX[255 & key];
                                    /** @type {number} */
                                    key = key ^ (b[(i / n) | 0] << 24);
                                }
                                /** @type {number} */
                                a[i] = a[i - n] ^ key;
                            }
                        }
                        /** @type {!Array} */
                        var data = (this._invKeySchedule = []);
                        /** @type {number} */
                        var l = 0;
                        for (; len > l; l++) {
                            /** @type {number} */
                            i = len - l;
                            key = l % 4 ? a[i] : a[i - 4];
                            data[l] =
                                4 > l || 4 >= i
                                    ? key
                                    : INV_SUB_MIX_0[SBOX[key >>> 24]] ^
                                      INV_SUB_MIX_1[SBOX[(key >>> 16) & 255]] ^
                                      INV_SUB_MIX_2[SBOX[(key >>> 8) & 255]] ^
                                      INV_SUB_MIX_3[SBOX[255 & key]];
                        }
                    }
                },
                encryptBlock: function(M, offset) {
                    this._doCryptBlock(
                        M,
                        offset,
                        this._keySchedule,
                        SUB_MIX_0,
                        SUB_MIX_1,
                        SUB_MIX_2,
                        SUB_MIX_3,
                        SBOX
                    );
                },
                decryptBlock: function(M, offset) {
                    var t = M[offset + 1];
                    M[offset + 1] = M[offset + 3];
                    M[offset + 3] = t;
                    this._doCryptBlock(
                        M,
                        offset,
                        this._invKeySchedule,
                        INV_SUB_MIX_0,
                        INV_SUB_MIX_1,
                        INV_SUB_MIX_2,
                        INV_SUB_MIX_3,
                        INV_SBOX
                    );
                    t = M[offset + 1];
                    M[offset + 1] = M[offset + 3];
                    M[offset + 3] = t;
                },
                _doCryptBlock: function(
                    M,
                    offset,
                    keySchedule,
                    SUB_MIX_0,
                    SUB_MIX_1,
                    SUB_MIX_2,
                    SUB_MIX_3,
                    SBOX
                ) {
                    var costSum = this._nRounds;
                    /** @type {number} */
                    var s1 = M[offset] ^ keySchedule[0];
                    /** @type {number} */
                    var s2 = M[offset + 1] ^ keySchedule[1];
                    /** @type {number} */
                    var s3 = M[offset + 2] ^ keySchedule[2];
                    /** @type {number} */
                    var s0 = M[offset + 3] ^ keySchedule[3];
                    /** @type {number} */
                    var ksRow = 4;
                    /** @type {number} */
                    var gasSum = 1;
                    for (; costSum > gasSum; gasSum++) {
                        /** @type {number} */
                        var t =
                            SUB_MIX_0[s1 >>> 24] ^
                            SUB_MIX_1[(s2 >>> 16) & 255] ^
                            SUB_MIX_2[(s3 >>> 8) & 255] ^
                            SUB_MIX_3[255 & s0] ^
                            keySchedule[ksRow++];
                        /** @type {number} */
                        var t2 =
                            SUB_MIX_0[s2 >>> 24] ^
                            SUB_MIX_1[(s3 >>> 16) & 255] ^
                            SUB_MIX_2[(s0 >>> 8) & 255] ^
                            SUB_MIX_3[255 & s1] ^
                            keySchedule[ksRow++];
                        /** @type {number} */
                        var t3 =
                            SUB_MIX_0[s3 >>> 24] ^
                            SUB_MIX_1[(s0 >>> 16) & 255] ^
                            SUB_MIX_2[(s1 >>> 8) & 255] ^
                            SUB_MIX_3[255 & s2] ^
                            keySchedule[ksRow++];
                        /** @type {number} */
                        var t0 =
                            SUB_MIX_0[s0 >>> 24] ^
                            SUB_MIX_1[(s1 >>> 16) & 255] ^
                            SUB_MIX_2[(s2 >>> 8) & 255] ^
                            SUB_MIX_3[255 & s3] ^
                            keySchedule[ksRow++];
                        /** @type {number} */
                        s1 = t;
                        /** @type {number} */
                        s2 = t2;
                        /** @type {number} */
                        s3 = t3;
                        /** @type {number} */
                        s0 = t0;
                    }
                    /** @type {number} */
                    t =
                        ((SBOX[s1 >>> 24] << 24) |
                            (SBOX[(s2 >>> 16) & 255] << 16) |
                            (SBOX[(s3 >>> 8) & 255] << 8) |
                            SBOX[255 & s0]) ^
                        keySchedule[ksRow++];
                    /** @type {number} */
                    t2 =
                        ((SBOX[s2 >>> 24] << 24) |
                            (SBOX[(s3 >>> 16) & 255] << 16) |
                            (SBOX[(s0 >>> 8) & 255] << 8) |
                            SBOX[255 & s1]) ^
                        keySchedule[ksRow++];
                    /** @type {number} */
                    t3 =
                        ((SBOX[s3 >>> 24] << 24) |
                            (SBOX[(s0 >>> 16) & 255] << 16) |
                            (SBOX[(s1 >>> 8) & 255] << 8) |
                            SBOX[255 & s2]) ^
                        keySchedule[ksRow++];
                    /** @type {number} */
                    t0 =
                        ((SBOX[s0 >>> 24] << 24) |
                            (SBOX[(s1 >>> 16) & 255] << 16) |
                            (SBOX[(s2 >>> 8) & 255] << 8) |
                            SBOX[255 & s3]) ^
                        keySchedule[ksRow++];
                    /** @type {number} */
                    M[offset] = t;
                    /** @type {number} */
                    M[offset + 1] = t2;
                    /** @type {number} */
                    M[offset + 2] = t3;
                    /** @type {number} */
                    M[offset + 3] = t0;
                },
                keySize: 8
            }));
            C.AES = BlockCipher._createHelper(AES);
        })(),
        CryptoJS.AES);
    }));
    var Hex = (crypto.AES,
    factory(function(mixin, canCreateDiscussions) {
        mixin.exports = a.enc.Utf8;
    }));
    return (
        Hex.Utf8,
        (t.e = function(value, message) {
            var j;
            var target;
            return (
                void 0 === message && (message = 'whatever'),
                ((target = document.createElement('a')).href = value),
                1 < target.search.length &&
                    (target.search =
                        '?' +
                        crypto
                            .encrypt(target.search.substring(1), message)
                            .toString()),
                (j = target.href),
                (target = null),
                j
            );
        }),
        (t.d = function(value, key) {
            if (void 0 === key) {
                /** @type {string} */
                key = 'whatever';
            }
            /** @type {!Element} */
            var style = document.createElement('a');
            /** @type {string} */
            var message = '';
            if (
                ((style.href = value),
                !(
                    2 <
                    (message =
                        0 === style.search.length
                            ? ''
                            : style.search.substring(1)).length
                ))
            ) {
                return (style = null);
            }
            if (
                !(style = null) !==
                /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
                    message
                )
            ) {
                return parse(message);
            }
            try {
                return parse(
                    (message = crypto.decrypt(message, key).toString(Hex))
                );
            } catch (t) {
                return null;
            }
        }),
        (t.eData = function(options, secret) {
            if (void 0 === secret) {
                /** @type {string} */
                secret = 'whatever';
            }
            var key;
            /** @type {!Array} */
            var parseFunctionTableItems = [];
            var i;
            for (i in options) {
                /** @type {string} */
                var n = encodeURIComponent(i);
                /** @type {string} */
                var name = encodeURIComponent(options[i]);
                parseFunctionTableItems.push(n + '=' + name);
            }
            return (
                (key = parseFunctionTableItems.join('&')),
                crypto.encrypt(key, secret).toString()
            );
        }),
        t
    );
})({});
!(function(ScriptConfig_1) {
    var t;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @param {!Object} data
             * @return {undefined}
             */
            function init(data) {
                /** @type {boolean} */
                this.isWatch = false;
                /** @type {!Array} */
                this.domainList = [];
                this.hostType = data.attr('hostType');
                this.gameType = data.attr('gameType');
                this.platform = data.attr('platform');
                this.port = data.attr('port');
                var componentsStr = ScriptConfig_1.ExternalData.useSSL
                    ? data.attr('sslDomain')
                    : data.attr('domain');
                if (componentsStr) {
                    this.domainList = componentsStr.split(' ');
                }
                this.vids = data.listAttr('vids');
                /** @type {number} */
                this.serverid = Number(data.attr('serverid'));
                /** @type {boolean} */
                this.isWatch = '1' === data.attr('watch');
            }
            return (
                Object.defineProperty(init.prototype, 'urlList', {
                    get: function() {
                        var websocketConf = this;
                        /** @type {!Array} */
                        var newNodeLists = [];
                        return (
                            this.domainList.forEach(function(
                                canCreateDiscussions
                            ) {
                                newNodeLists.push(
                                    ScriptConfig_1.ExternalData.wsProtocol +
                                        canCreateDiscussions +
                                        ':' +
                                        websocketConf.port
                                );
                            },
                            this),
                            newNodeLists
                        );
                    },
                    enumerable: true,
                    configurable: true
                }),
                init
            );
        })();
        HTMLSectionBuilder.HostInfo = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.HostInfo');
    })((t = ScriptConfig_1.Config || (ScriptConfig_1.Config = {})));
})(Core || (Core = {}));
!(function(Browser) {
    /**
     * @return {?}
     */
    function addListener() {
        var tested = test();
        return tested.indexOf(Browser.BROWSER_QQ) >= 0
            ? Browser.BROWSER_QQ
            : tested.indexOf(Browser.BROWSER_UC) >= 0
                ? Browser.BROWSER_UC
                : tested.indexOf(Browser.BROWSER_BAIDU) >= 0
                    ? Browser.BROWSER_BAIDU
                    : tested.indexOf(Browser.BROWSER_BAIDU_PC) >= 0
                        ? Browser.BROWSER_BAIDU_PC
                        : tested.indexOf(Browser.BROWSER_SOUGOU) >= 0
                            ? Browser.BROWSER_SOUGOU
                            : tested.indexOf(Browser.BROWSER_360) >= 0
                                ? Browser.BROWSER_360
                                : tested.indexOf(Browser.BROWSER_EDGE) >= 0
                                    ? Browser.BROWSER_EDGE
                                    : isIE()
                                        ? Browser.BROWSER_IE
                                        : tested.indexOf(
                                              Browser.BROWSER_FIREFOX
                                          ) >= 0
                                            ? Browser.BROWSER_FIREFOX
                                            : tested.indexOf(
                                                  Browser.BROWSER_CHROME
                                              ) >= 0 ||
                                              tested.indexOf('CriOS') >= 0
                                                ? Browser.BROWSER_CHROME
                                                : tested.indexOf(
                                                      Browser.BROWSER_SAFARI
                                                  ) >= 0 &&
                                                  tested.indexOf(
                                                      Browser.BROWSER_CHROME
                                                  ) < 0
                                                    ? Browser.BROWSER_SAFARI
                                                    : tested;
    }
    /**
     * @return {?}
     */
    function _initSys() {
        var match = test();
        return /windows phone/i.test(match)
            ? Browser.OS_WINDOWS_PHONE
            : /android/i.test(match)
                ? Browser.OS_ANDROID
                : /iP(hone|od|ad)/.test(match) && !window.MSStream
                    ? Browser.OS_IOS
                    : void 0;
    }
    /**
     * @return {?}
     */
    function iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            /** @type {(Array<string>|null)} */
            var sArrDayId = navigator.appVersion.match(
                /OS (\d+)_(\d+)_?(\d+)?/
            );
            return (
                parseInt(sArrDayId[1], 10) + 0.1 * parseInt(sArrDayId[2], 10)
            );
        }
        return -1;
    }
    /**
     * @return {?}
     */
    function isSupported() {
        var found = test();
        /** @type {!Array} */
        var commands = [
            Browser.BROWSER_BAIDU,
            Browser.BROWSER_UC,
            Browser.BROWSER_QQ,
            Browser.BROWSER_BAIDU_PC,
            Browser.BROWSER_SOUGOU
        ];
        /** @type {number} */
        var i = 0;
        for (; i < commands.length; i++) {
            if (found.indexOf(commands[i]) >= 0) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    function isIE() {
        return navigator.userAgent.indexOf('MSIE') >= 0 ||
            navigator.userAgent.indexOf('Trident') >= 0
            ? true
            : false;
    }
    /**
     * @return {?}
     */
    function expectSupport() {
        return flvjs.isSupported() && !isSupported();
    }
    /**
     * @return {?}
     */
    function test() {
        return navigator.userAgent || navigator.vendor || window.opera;
    }
    /** @type {string} */
    Browser.OS_IOS = 'iOS';
    /** @type {string} */
    Browser.OS_ANDROID = 'Android';
    /** @type {string} */
    Browser.OS_WINDOWS_PHONE = 'Windows Phone';
    /** @type {string} */
    Browser.BROWSER_SAFARI = 'Safari';
    /** @type {string} */
    Browser.BROWSER_CHROME = 'Chrome';
    /** @type {string} */
    Browser.BROWSER_FIREFOX = 'Firefox';
    /** @type {string} */
    Browser.BROWSER_EDGE = 'Edge';
    /** @type {string} */
    Browser.BROWSER_IE = 'IE';
    /** @type {string} */
    Browser.BROWSER_360 = '360se';
    /** @type {string} */
    Browser.BROWSER_SOUGOU = 'SE 2.X MetaSr 1.0';
    /** @type {string} */
    Browser.BROWSER_BAIDU = 'baidubrowser';
    /** @type {string} */
    Browser.BROWSER_BAIDU_PC = 'BIDUBrowser';
    /** @type {string} */
    Browser.BROWSER_UC = 'UCBrowser';
    /** @type {string} */
    Browser.BROWSER_QQ = 'QQBrowser';
    /** @type {boolean} */
    Browser.IE_DISABLE_REPLAY = false;
    /** @type {function(): ?} */
    Browser.getBrowser = addListener;
    /** @type {function(): ?} */
    Browser.getMobileOS = _initSys;
    /** @type {function(): ?} */
    Browser.getIOSversion = iOSversion;
    /** @type {function(): ?} */
    Browser.isFlvBlackListBrowser = isSupported;
    /** @type {function(): ?} */
    Browser.isIE = isIE;
    /** @type {function(): ?} */
    Browser.isFlvSupported = expectSupport;
    /** @type {function(): ?} */
    Browser.getUserAgent = test;
})(Core || (Core = {}));
!(function(state) {
    /**
     * @param {number} n
     * @return {?}
     */
    function size(n) {
        return n + nadd;
    }
    /** @type {number} */
    var nadd = 60 * (new Date().getTimezoneOffset() - 240) * 1e3;
    /** @type {function(number): ?} */
    state.getEATime = size;
})(Core || (Core = {}));
!(function(self) {
    /**
     * @param {number} n
     * @return {?}
     */
    function factorial(n) {
        if (0 == n || 1 == n) {
            return 1;
        }
        /** @type {number} */
        var factorial = 1;
        /** @type {number} */
        var j = 1;
        for (; n >= j; j++) {
            /** @type {number} */
            factorial = factorial * j;
        }
        return factorial;
    }
    /**
     * @param {number} n
     * @param {number} k
     * @return {?}
     */
    function P(n, k) {
        return k > n
            ? 0
            : n == k
                ? 1
                : factorial(n) / (factorial(n - k) * factorial(k));
    }
    /**
     * @param {number} n
     * @param {number} k
     * @return {?}
     */
    function C(n, k) {
        return k > n ? 0 : factorial(n) / factorial(n - k);
    }
    /**
     * @return {?}
     */
    function n() {
        return Math.floor(10 * Math.random());
    }
    /**
     * @return {?}
     */
    function rendomNumber() {
        return Math.floor(4 * Math.random());
    }
    /**
     * @param {number} Index
     * @return {?}
     */
    function sort(Index) {
        if (void 0 === Index) {
            /** @type {number} */
            Index = 10;
        }
        /** @type {!Array} */
        var collection = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        return shuffle(collection).slice(0, Index);
    }
    /**
     * @param {number} end
     * @return {?}
     */
    function next(end) {
        if (void 0 === end) {
            /** @type {number} */
            end = 80;
        }
        /** @type {!Array} */
        var collection = [];
        /** @type {number} */
        var slice_1 = 1;
        for (; 80 >= slice_1; slice_1++) {
            collection.push(slice_1);
        }
        return shuffle(collection).slice(0, end);
    }
    /**
     * @param {!Array} items
     * @return {?}
     */
    function shuffle(items) {
        var name;
        var value;
        var i = items.length;
        for (
            ;
            i;
            name = Math.floor(Math.random() * i),
                value = items[--i],
                items[i] = items[name],
                items[name] = value
        ) {}
        return items;
    }
    /**
     * @param {!Object} val
     * @return {?}
     */
    function u(val) {
        /** @type {!Array} */
        var t_chksum = [];
        /** @type {number} */
        var i = 0;
        for (; i < val[0].length; i++) {
            var r = val[0][i];
            /** @type {number} */
            var j = 1;
            for (; j < val.length; j++) {
                if (val[j][i] < r) {
                    r = val[j][i];
                }
            }
            t_chksum.push(r);
        }
        return t_chksum;
    }
    /**
     * @param {number} n
     * @return {?}
     */
    function c(n) {
        /** @type {number} */
        var num = Math.floor(Math.round(1e4 * n) / 10) / 1e3;
        return /\d+\.\d{3,}/.test('' + num) ? num.toFixed(3) : '' + num;
    }
    /**
     * @param {undefined} e
     * @return {?}
     */
    function f(e) {
        var cookieDataArray = c(e).split('.');
        return (
            (cookieDataArray[0] = cookieDataArray[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
            )),
            cookieDataArray.join('.')
        );
    }
    /**
     * @param {number} t
     * @return {?}
     */
    function add(t) {
        /** @type {number} */
        var num = Math.floor(Math.round(1e3 * t) / 10) / 100;
        return /\d+\.\d{2,}/.test('' + num) ? num.toFixed(2) : '' + num;
    }
    /**
     * @param {number} i
     * @return {?}
     */
    function recurse(i) {
        var cookieDataArray = add(i).split('.');
        return (
            (cookieDataArray[0] = cookieDataArray[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
            )),
            cookieDataArray.join('.')
        );
    }
    /**
     * @param {number} i
     * @return {?}
     */
    function parse(i) {
        /** @type {string} */
        var prefix = 0 > i ? '-' : '';
        return (
            0 > i && (i = Math.abs(i)),
            1e3 > i
                ? prefix + recurse(i)
                : i >= 1e3 && 1e6 > i
                    ? prefix + Math.floor(i / 100) / 10 + 'K'
                    : i >= 1e6 && 1e9 > i
                        ? prefix + Math.floor(i / 1e5) / 10 + 'M'
                        : i >= 1e9
                            ? prefix + Math.floor(i / 1e8) / 10 + 'B'
                            : void 0
        );
    }
    /** @type {function(number): ?} */
    self.factorial = factorial;
    /** @type {function(number, number): ?} */
    self.combination = P;
    /** @type {function(number, number): ?} */
    self.permutation = C;
    /** @type {function(): ?} */
    self.randomDigit = n;
    /** @type {function(): ?} */
    self.randomSide = rendomNumber;
    /** @type {function(number): ?} */
    self.shuffleDigits = sort;
    /** @type {function(number): ?} */
    self.shuffle80 = next;
    /** @type {function(!Array): ?} */
    self.shuffle = shuffle;
    /** @type {function(!Object): ?} */
    self.getMinArray = u;
    /** @type {function(number): ?} */
    self.getStringFixed3 = c;
    /** @type {function(undefined): ?} */
    self.getStringFixed3WithComma = f;
    /** @type {function(number): ?} */
    self.getStringFixed2 = add;
    /** @type {function(number): ?} */
    self.getStringFixed2WithComma = recurse;
    /** @type {function(number): ?} */
    self.getStringShortNum = parse;
})(Core || (Core = {}));
var md5 = (function() {
    /**
     * @return {undefined}
     */
    function BlueImpMD5() {
        /** @type {number} */
        this.hexcase = 0;
        /** @type {string} */
        this.b64pad = '';
    }
    return (
        (BlueImpMD5.prototype.hex_md5 = function(s) {
            return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s)));
        }),
        (BlueImpMD5.prototype.b64_md5 = function(s) {
            return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s)));
        }),
        (BlueImpMD5.prototype.any_md5 = function(s, e) {
            return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e);
        }),
        (BlueImpMD5.prototype.hex_hmac_md5 = function(k, d) {
            return this.rstr2hex(
                this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))
            );
        }),
        (BlueImpMD5.prototype.b64_hmac_md5 = function(k, d) {
            return this.rstr2b64(
                this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))
            );
        }),
        (BlueImpMD5.prototype.any_hmac_md5 = function(k, d, e) {
            return this.rstr2any(
                this.rstr_hmac_md5(
                    this.str2rstr_utf8(k),
                    this.str2rstr_utf8(d)
                ),
                e
            );
        }),
        (BlueImpMD5.prototype.md5_vm_test = function() {
            return (
                '900150983cd24fb0d6963f7d28e17f72' ==
                this.hex_md5('abc').toLowerCase()
            );
        }),
        (BlueImpMD5.prototype.rstr_md5 = function(s) {
            return this.binl2rstr(
                this.binl_md5(this.rstr2binl(s), 8 * s.length)
            );
        }),
        (BlueImpMD5.prototype.rstr_hmac_md5 = function(key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16) {
                bkey = this.binl_md5(bkey, 8 * key.length);
            }
            /** @type {!Array} */
            var ipad = Array(16);
            /** @type {!Array} */
            var userList = Array(16);
            /** @type {number} */
            var i = 0;
            for (; 16 > i; i++) {
                /** @type {number} */
                ipad[i] = 909522486 ^ bkey[i];
                /** @type {number} */
                userList[i] = 1549556828 ^ bkey[i];
            }
            var newOption = this.binl_md5(
                ipad.concat(this.rstr2binl(data)),
                512 + 8 * data.length
            );
            return this.binl2rstr(
                this.binl_md5(userList.concat(newOption), 640)
            );
        }),
        (BlueImpMD5.prototype.rstr2hex = function(input) {
            try {
                this.hexcase;
            } catch (t) {
                /** @type {number} */
                this.hexcase = 0;
            }
            var a;
            /** @type {string} */
            var s = this.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
            /** @type {string} */
            var output = '';
            /** @type {number} */
            var i = 0;
            for (; i < input.length; i++) {
                a = input.charCodeAt(i);
                /** @type {string} */
                output = output + (s.charAt((a >>> 4) & 15) + s.charAt(15 & a));
            }
            return output;
        }),
        (BlueImpMD5.prototype.rstr2b64 = function(input) {
            try {
                this.b64pad;
            } catch (t) {
                /** @type {string} */
                this.b64pad = '';
            }
            /** @type {string} */
            var raw_composed_type =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            /** @type {string} */
            var output = '';
            var l = input.length;
            /** @type {number} */
            var i = 0;
            for (; l > i; i = i + 3) {
                /** @type {number} */
                var n =
                    (input.charCodeAt(i) << 16) |
                    (l > i + 1 ? input.charCodeAt(i + 1) << 8 : 0) |
                    (l > i + 2 ? input.charCodeAt(i + 2) : 0);
                /** @type {number} */
                var j = 0;
                for (; 4 > j; j++) {
                    /** @type {string} */
                    output =
                        output +
                        (8 * i + 6 * j > 8 * input.length
                            ? this.b64pad
                            : raw_composed_type.charAt(
                                  (n >>> (6 * (3 - j))) & 63
                              ));
                }
            }
            return output;
        }),
        (BlueImpMD5.prototype.rstr2any = function(input, encoding) {
            var i;
            var j;
            var q;
            var x;
            var quotient;
            var divisor = encoding.length;
            /** @type {!Array} */
            var dividend = Array(Math.ceil(input.length / 2));
            /** @type {number} */
            i = 0;
            for (; i < dividend.length; i++) {
                /** @type {number} */
                dividend[i] =
                    (input.charCodeAt(2 * i) << 8) |
                    input.charCodeAt(2 * i + 1);
            }
            /** @type {number} */
            var length = Math.ceil(
                (8 * input.length) / (Math.log(encoding.length) / Math.log(2))
            );
            /** @type {!Array} */
            var remainders = Array(length);
            /** @type {number} */
            j = 0;
            for (; length > j; j++) {
                /** @type {!Array} */
                quotient = Array();
                /** @type {number} */
                x = 0;
                /** @type {number} */
                i = 0;
                for (; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    /** @type {number} */
                    q = Math.floor(x / divisor);
                    /** @type {number} */
                    x = x - q * divisor;
                    if (quotient.length > 0 || q > 0) {
                        /** @type {number} */
                        quotient[quotient.length] = q;
                    }
                }
                remainders[j] = x;
                /** @type {!Array} */
                dividend = quotient;
            }
            /** @type {string} */
            var output = '';
            /** @type {number} */
            i = remainders.length - 1;
            for (; i >= 0; i--) {
                output = output + encoding.charAt(remainders[i]);
            }
            return output;
        }),
        (BlueImpMD5.prototype.str2rstr_utf8 = function(input) {
            var chr1;
            var s;
            /** @type {string} */
            var output = '';
            /** @type {number} */
            var i = -1;
            for (; ++i < input.length; ) {
                chr1 = input.charCodeAt(i);
                s = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (
                    chr1 >= 55296 &&
                    56319 >= chr1 &&
                    s >= 56320 &&
                    57343 >= s
                ) {
                    /** @type {number} */
                    chr1 = 65536 + ((1023 & chr1) << 10) + (1023 & s);
                    i++;
                }
                if (127 >= chr1) {
                    /** @type {string} */
                    output = output + String.fromCharCode(chr1);
                } else {
                    if (2047 >= chr1) {
                        /** @type {string} */
                        output =
                            output +
                            String.fromCharCode(
                                192 | ((chr1 >>> 6) & 31),
                                128 | (63 & chr1)
                            );
                    } else {
                        if (65535 >= chr1) {
                            /** @type {string} */
                            output =
                                output +
                                String.fromCharCode(
                                    224 | ((chr1 >>> 12) & 15),
                                    128 | ((chr1 >>> 6) & 63),
                                    128 | (63 & chr1)
                                );
                        } else {
                            if (2097151 >= chr1) {
                                /** @type {string} */
                                output =
                                    output +
                                    String.fromCharCode(
                                        240 | ((chr1 >>> 18) & 7),
                                        128 | ((chr1 >>> 12) & 63),
                                        128 | ((chr1 >>> 6) & 63),
                                        128 | (63 & chr1)
                                    );
                            }
                        }
                    }
                }
            }
            return output;
        }),
        (BlueImpMD5.prototype.str2rstr_utf16le = function(input) {
            /** @type {string} */
            var output = '';
            /** @type {number} */
            var i = 0;
            for (; i < input.length; i++) {
                /** @type {string} */
                output =
                    output +
                    String.fromCharCode(
                        255 & input.charCodeAt(i),
                        (input.charCodeAt(i) >>> 8) & 255
                    );
            }
            return output;
        }),
        (BlueImpMD5.prototype.str2rstr_utf16be = function(input) {
            /** @type {string} */
            var output = '';
            /** @type {number} */
            var i = 0;
            for (; i < input.length; i++) {
                /** @type {string} */
                output =
                    output +
                    String.fromCharCode(
                        (input.charCodeAt(i) >>> 8) & 255,
                        255 & input.charCodeAt(i)
                    );
            }
            return output;
        }),
        (BlueImpMD5.prototype.rstr2binl = function(input) {
            /** @type {!Array} */
            var output = Array(input.length >> 2);
            /** @type {number} */
            var i = 0;
            for (; i < output.length; i++) {
                /** @type {number} */
                output[i] = 0;
            }
            /** @type {number} */
            i = 0;
            for (; i < 8 * input.length; i = i + 8) {
                output[i >> 5] |= (255 & input.charCodeAt(i / 8)) << i % 32;
            }
            return output;
        }),
        (BlueImpMD5.prototype.binl2rstr = function(input) {
            /** @type {string} */
            var output = '';
            /** @type {number} */
            var i = 0;
            for (; i < 32 * input.length; i = i + 8) {
                /** @type {string} */
                output =
                    output +
                    String.fromCharCode((input[i >> 5] >>> i % 32) & 255);
            }
            return output;
        }),
        (BlueImpMD5.prototype.binl_md5 = function(x, len) {
            x[len >> 5] |= 128 << len % 32;
            /** @type {number} */
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            /** @type {number} */
            var c = 1732584193;
            /** @type {number} */
            var d = -271733879;
            /** @type {number} */
            var a = -1732584194;
            /** @type {number} */
            var b = 271733878;
            /** @type {number} */
            var i = 0;
            for (; i < x.length; i = i + 16) {
                var oldc = c;
                var oldd = d;
                var olda = a;
                var oldb = b;
                c = this.md5_ff(c, d, a, b, x[i + 0], 7, -680876936);
                b = this.md5_ff(b, c, d, a, x[i + 1], 12, -389564586);
                a = this.md5_ff(a, b, c, d, x[i + 2], 17, 606105819);
                d = this.md5_ff(d, a, b, c, x[i + 3], 22, -1044525330);
                c = this.md5_ff(c, d, a, b, x[i + 4], 7, -176418897);
                b = this.md5_ff(b, c, d, a, x[i + 5], 12, 1200080426);
                a = this.md5_ff(a, b, c, d, x[i + 6], 17, -1473231341);
                d = this.md5_ff(d, a, b, c, x[i + 7], 22, -45705983);
                c = this.md5_ff(c, d, a, b, x[i + 8], 7, 1770035416);
                b = this.md5_ff(b, c, d, a, x[i + 9], 12, -1958414417);
                a = this.md5_ff(a, b, c, d, x[i + 10], 17, -42063);
                d = this.md5_ff(d, a, b, c, x[i + 11], 22, -1990404162);
                c = this.md5_ff(c, d, a, b, x[i + 12], 7, 1804603682);
                b = this.md5_ff(b, c, d, a, x[i + 13], 12, -40341101);
                a = this.md5_ff(a, b, c, d, x[i + 14], 17, -1502002290);
                d = this.md5_ff(d, a, b, c, x[i + 15], 22, 1236535329);
                c = this.md5_gg(c, d, a, b, x[i + 1], 5, -165796510);
                b = this.md5_gg(b, c, d, a, x[i + 6], 9, -1069501632);
                a = this.md5_gg(a, b, c, d, x[i + 11], 14, 643717713);
                d = this.md5_gg(d, a, b, c, x[i + 0], 20, -373897302);
                c = this.md5_gg(c, d, a, b, x[i + 5], 5, -701558691);
                b = this.md5_gg(b, c, d, a, x[i + 10], 9, 38016083);
                a = this.md5_gg(a, b, c, d, x[i + 15], 14, -660478335);
                d = this.md5_gg(d, a, b, c, x[i + 4], 20, -405537848);
                c = this.md5_gg(c, d, a, b, x[i + 9], 5, 568446438);
                b = this.md5_gg(b, c, d, a, x[i + 14], 9, -1019803690);
                a = this.md5_gg(a, b, c, d, x[i + 3], 14, -187363961);
                d = this.md5_gg(d, a, b, c, x[i + 8], 20, 1163531501);
                c = this.md5_gg(c, d, a, b, x[i + 13], 5, -1444681467);
                b = this.md5_gg(b, c, d, a, x[i + 2], 9, -51403784);
                a = this.md5_gg(a, b, c, d, x[i + 7], 14, 1735328473);
                d = this.md5_gg(d, a, b, c, x[i + 12], 20, -1926607734);
                c = this.md5_hh(c, d, a, b, x[i + 5], 4, -378558);
                b = this.md5_hh(b, c, d, a, x[i + 8], 11, -2022574463);
                a = this.md5_hh(a, b, c, d, x[i + 11], 16, 1839030562);
                d = this.md5_hh(d, a, b, c, x[i + 14], 23, -35309556);
                c = this.md5_hh(c, d, a, b, x[i + 1], 4, -1530992060);
                b = this.md5_hh(b, c, d, a, x[i + 4], 11, 1272893353);
                a = this.md5_hh(a, b, c, d, x[i + 7], 16, -155497632);
                d = this.md5_hh(d, a, b, c, x[i + 10], 23, -1094730640);
                c = this.md5_hh(c, d, a, b, x[i + 13], 4, 681279174);
                b = this.md5_hh(b, c, d, a, x[i + 0], 11, -358537222);
                a = this.md5_hh(a, b, c, d, x[i + 3], 16, -722521979);
                d = this.md5_hh(d, a, b, c, x[i + 6], 23, 76029189);
                c = this.md5_hh(c, d, a, b, x[i + 9], 4, -640364487);
                b = this.md5_hh(b, c, d, a, x[i + 12], 11, -421815835);
                a = this.md5_hh(a, b, c, d, x[i + 15], 16, 530742520);
                d = this.md5_hh(d, a, b, c, x[i + 2], 23, -995338651);
                c = this.md5_ii(c, d, a, b, x[i + 0], 6, -198630844);
                b = this.md5_ii(b, c, d, a, x[i + 7], 10, 1126891415);
                a = this.md5_ii(a, b, c, d, x[i + 14], 15, -1416354905);
                d = this.md5_ii(d, a, b, c, x[i + 5], 21, -57434055);
                c = this.md5_ii(c, d, a, b, x[i + 12], 6, 1700485571);
                b = this.md5_ii(b, c, d, a, x[i + 3], 10, -1894986606);
                a = this.md5_ii(a, b, c, d, x[i + 10], 15, -1051523);
                d = this.md5_ii(d, a, b, c, x[i + 1], 21, -2054922799);
                c = this.md5_ii(c, d, a, b, x[i + 8], 6, 1873313359);
                b = this.md5_ii(b, c, d, a, x[i + 15], 10, -30611744);
                a = this.md5_ii(a, b, c, d, x[i + 6], 15, -1560198380);
                d = this.md5_ii(d, a, b, c, x[i + 13], 21, 1309151649);
                c = this.md5_ii(c, d, a, b, x[i + 4], 6, -145523070);
                b = this.md5_ii(b, c, d, a, x[i + 11], 10, -1120210379);
                a = this.md5_ii(a, b, c, d, x[i + 2], 15, 718787259);
                d = this.md5_ii(d, a, b, c, x[i + 9], 21, -343485551);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
            }
            return [c, d, a, b];
        }),
        (BlueImpMD5.prototype.md5_cmn = function(q, a, b, x, s, t) {
            return this.safe_add(
                this.bit_rol(
                    this.safe_add(this.safe_add(a, q), this.safe_add(x, t)),
                    s
                ),
                b
            );
        }),
        (BlueImpMD5.prototype.md5_ff = function(c, d, a, b, x, s, t) {
            return this.md5_cmn((d & a) | (~d & b), c, d, x, s, t);
        }),
        (BlueImpMD5.prototype.md5_gg = function(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
        }),
        (BlueImpMD5.prototype.md5_hh = function(a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }),
        (BlueImpMD5.prototype.md5_ii = function(a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | ~d), a, b, x, s, t);
        }),
        (BlueImpMD5.prototype.safe_add = function(x, y) {
            /** @type {number} */
            var nextByte = (65535 & x) + (65535 & y);
            /** @type {number} */
            var charCode = (x >> 16) + (y >> 16) + (nextByte >> 16);
            return (charCode << 16) | (65535 & nextByte);
        }),
        (BlueImpMD5.prototype.bit_rol = function(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }),
        BlueImpMD5
    );
})();
__reflect(md5.prototype, 'md5');
!(function(x) {
    /**
     * @param {?} type
     * @return {?}
     */
    function serialize(type) {
        var buffer = new egret.ByteArray();
        return (
            buffer.writeInt(type),
            buffer.writeInt(x._u),
            buffer.writeInt(x.gn),
            buffer
        );
    }
    /**
     * @param {?} val
     * @param {number} len
     * @return {?}
     */
    function s(val, len) {
        if (void 0 === len) {
            len = x.gn;
        }
        var buffer = new egret.ByteArray();
        return (
            buffer.writeInt(val),
            buffer.writeInt(0),
            buffer.writeInt(len),
            buffer
        );
    }
    /**
     * @param {!Object} target
     * @return {?}
     */
    function value(target) {
        var val = target.position;
        return (target.position = 4), target.writeInt(val), target;
    }
    /**
     * @param {!Array} o
     * @return {?}
     */
    function encode(o) {
        var y = o.length;
        var bytes = new egret.ByteArray();
        /** @type {number} */
        var x = 0;
        for (; y > x; x = x + 2) {
            /** @type {number} */
            var i = parseInt(o[x], 16);
            /** @type {number} */
            var j = parseInt(o[x + 1], 16);
            bytes.writeByte((i << 4) + j);
        }
        return bytes;
    }
    /**
     * @param {string} str
     * @param {number} limit
     * @return {?}
     */
    function start(str, limit) {
        var stream = new egret.ByteArray();
        return stream.writeUTFBytes(str), (stream.length = limit), stream;
    }
    /**
     * @param {!Object} data
     * @return {?}
     */
    function parseIlstAtom(data) {
        return (data.readUnsignedInt() << 32) | data.readUnsignedInt();
    }
    /**
     * @param {?} stream
     * @param {?} value
     * @return {undefined}
     */
    function step(stream, value) {
        /** @type {number} */
        var label = Math.floor(value);
        /** @type {!Array} */
        var data = [];
        if (label > 4294967295) {
            /** @type {number} */
            data[0] = 0;
            /** @type {number} */
            data[1] = (label >> 48) & 31;
            /** @type {number} */
            data[2] = (label >> 40) & 255;
            /** @type {number} */
            data[3] = (label >> 32) & 255;
            /** @type {number} */
            data[4] = (label >> 24) & 255;
            /** @type {number} */
            data[5] = (label >> 16) & 255;
            /** @type {number} */
            data[6] = (label >> 8) & 255;
            /** @type {number} */
            data[7] = 255 & label;
        } else {
            /** @type {number} */
            data[0] = 0;
            /** @type {number} */
            data[1] = 0;
            /** @type {number} */
            data[2] = 0;
            /** @type {number} */
            data[3] = 0;
            /** @type {number} */
            data[4] = (label >> 24) & 255;
            /** @type {number} */
            data[5] = (label >> 16) & 255;
            /** @type {number} */
            data[6] = (label >> 8) & 255;
            /** @type {number} */
            data[7] = 255 & label;
        }
        data.forEach(function(b) {
            stream.writeByte(b);
        });
    }
    /** @type {function(?): ?} */
    x.getSimpleCMD = serialize;
    /** @type {function(?, number): ?} */
    x.startCMD = s;
    /** @type {function(!Object): ?} */
    x.endCMD = value;
    /** @type {function(!Array): ?} */
    x.hexStrToBytes = encode;
    /** @type {function(string, number): ?} */
    x.stringToBytes = start;
    /** @type {function(!Object): ?} */
    x.readInt64FromBytes = parseIlstAtom;
    /** @type {function(?, ?): undefined} */
    x.writeInt64ToBytes = step;
})(Core || (Core = {}));
!(function(item) {
    /** @type {string} */
    item.EVENT_PAUSE = 'EVENT_PAUSE';
    /** @type {string} */
    item.EVENT_RESUME = 'EVENT_RESUME';
    var service = (function(Base) {
        /**
         * @return {?}
         */
        function Page() {
            var self = Base.call(this) || this;
            return (
                (self._isPaused = false),
                (self.timeoutIDMap = new item.HashMap()),
                (self.intervalIDMap = new item.HashMap()),
                (egret.lifecycle.onPause = function() {
                    self.pauseTimeoutID = self.setTimeout(
                        function() {
                            /** @type {boolean} */
                            self._isPaused = true;
                            egret.ticker.pause();
                            self.dispatchEventWith(item.EVENT_PAUSE);
                        },
                        self,
                        108e5
                    );
                }),
                (egret.lifecycle.onResume = function() {
                    if (self._isPaused) {
                        egret.ticker.resume();
                        self.dispatchEventWith(item.EVENT_RESUME);
                    } else {
                        self.clearTimeout(self.pauseTimeoutID);
                    }
                    /** @type {boolean} */
                    self._isPaused = false;
                }),
                self
            );
        }
        return (
            __extends(Page, Base),
            Object.defineProperty(Page, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            (Page.init = function() {
                return this.initInstance(this);
            }),
            (Page.prototype.setTimeout = function(value, callback, name) {
                var result;
                var rias = this;
                /**
                 * @return {undefined}
                 */
                var check = function() {
                    rias.timeoutIDMap['delete'](result);
                    value.call(callback);
                };
                return (
                    (result = window.setTimeout(check, name)),
                    this.timeoutIDMap.set(result, true),
                    result
                );
            }),
            (Page.prototype.clearTimeout = function(id) {
                window.clearTimeout(id);
                this.timeoutIDMap['delete'](id);
            }),
            (Page.prototype.setInterval = function(_, fn, delay) {
                var obj = window.setInterval(_.bind(fn), delay);
                return this.intervalIDMap.set(obj, true), obj;
            }),
            (Page.prototype.clearInterval = function(id) {
                window.clearInterval(id);
                this.intervalIDMap['delete'](id);
            }),
            (Page.prototype.hasTimeout = function(id) {
                return this.timeoutIDMap.has(id);
            }),
            (Page.prototype.hasInterval = function(id) {
                return this.intervalIDMap.has(id);
            }),
            Object.defineProperty(Page.prototype, 'isPaused', {
                get: function() {
                    return this._isPaused;
                },
                enumerable: true,
                configurable: true
            }),
            (Page.prototype.callLater = function(data, a) {
                var n = this.setTimeout(data, a, 50);
                return this.autoClearTimeout(n, a), n;
            }),
            (Page.prototype.autoClearTimeout = function(x, o) {
                var fwd = this;
                if (o instanceof egret.DisplayObject) {
                    o.addEventListener(
                        egret.Event.REMOVED_FROM_STAGE,
                        function() {
                            fwd.clearTimeout(x);
                        },
                        this
                    );
                } else {
                    if (o instanceof item.SingletonDispatcher) {
                        o.addEventListener(
                            item.EVENT_RELEASE,
                            function() {
                                fwd.clearTimeout(x);
                            },
                            this
                        );
                    }
                }
            }),
            Page
        );
    })(item.SingletonDispatcher);
    item.NonstopTimer = service;
    __reflect(service.prototype, 'Core.NonstopTimer');
})(Core || (Core = {}));
!(function(self) {
    /**
     * @param {string} val
     * @return {?}
     */
    function load(val) {
        val = val.replace(/<!\-\-[\S\s]*?\-\->/g, '');
        var validationVM;
        /** @type {!Array} */
        var results = [];
        /**
         * @return {?}
         */
        var $ = function() {
            return results.length > 0 ? results[results.length - 1] : null;
        };
        /**
         * @param {?} v
         * @return {?}
         */
        var cb = function(v) {
            var parent = $();
            return parent
                ? (parent._children || (parent._children = []),
                  void parent._children.push(v))
                : void (validationVM = v);
        };
        /**
         * @param {string} text
         * @return {undefined}
         */
        var update = function(text) {
            var item = $();
            if (item) {
                /** @type {string} */
                item._text = text;
            }
        };
        /** @type {number} */
        var pos = 0;
        /**
         * @param {!Object} range
         * @return {undefined}
         */
        var render = function(range) {
            if (range.index > pos) {
                var cur = val.slice(pos, range.index).trim();
                if (cur) {
                    update(cur);
                }
            }
            pos = range.index + range.length;
            if (range.selfclosing) {
                cb(handler(range));
            } else {
                if (range.closing) {
                    c();
                } else {
                    results.push(handler(range));
                }
            }
        };
        /**
         * @return {undefined}
         */
        var c = function() {
            var elem = results.pop();
            cb(elem);
        };
        /**
         * @param {!Object} data
         * @param {?} result
         * @return {undefined}
         */
        var write = function(data, result) {
            if (void 0 === result) {
                /** @type {null} */
                result = null;
            }
            if (result) {
                result['$' + data.key] = data.value;
            }
        };
        /**
         * @param {!Object} options
         * @return {?}
         */
        var handler = function(options) {
            var t = {
                name: options.name
            };
            return (
                options.full.replace(/\w+="(?:[^"\\]|\\.)*"/g, function(
                    n,
                    canCreateDiscussions,
                    i,
                    isSlidingUp
                ) {
                    var j = n.indexOf('=');
                    return (
                        write(
                            {
                                key: n.substring(0, j),
                                value: n.substring(j + 2, n.length - 1)
                            },
                            t
                        ),
                        n
                    );
                }),
                t
            );
        };
        return (
            val.replace(
                /<((?:\/|!)?(?:[a-zA-Z0-9_-]+:)?[a-zA-Z0-9_-]+)(?:\s*(?:(?:[a-zA-Z0-9_-]+:)?[a-zA-Z0-9_-]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s]+))?)*\s*(\/?)>/g,
                function(s, appName, i, index) {
                    /** @type {boolean} */
                    var t256color = '/' === appName[0];
                    /** @type {boolean} */
                    var tTrueColor = '!' === appName[0];
                    return (
                        (appName =
                            t256color || tTrueColor
                                ? appName.substring(1)
                                : appName),
                        render({
                            name: appName,
                            closing: t256color,
                            special: tTrueColor,
                            selfclosing: tTrueColor || !!i,
                            index: index,
                            length: s.length,
                            full: s
                        }),
                        s
                    );
                }
            ),
            validationVM
        );
    }
    /** @type {function(string): ?} */
    self.parseXML = load;
})(Core || (Core = {}));
!(function(type) {
    /**
     * @return {undefined}
     */
    function render() {
        List();
    }
    /**
     * @return {undefined}
     */
    function List() {
        if (!ArrayBuffer.prototype.slice) {
            /**
             * @param {number} begin
             * @param {number=} end
             * @return {!ArrayBuffer}
             */
            ArrayBuffer.prototype.slice = function(begin, end) {
                if (
                    (void 0 === begin && (begin = 0),
                    void 0 === end && (end = this.byteLength),
                    (begin = Math.floor(begin)),
                    (end = Math.floor(end)),
                    0 > begin && (begin = begin + this.byteLength),
                    0 > end && (end = end + this.byteLength),
                    (begin = Math.min(Math.max(0, begin), this.byteLength)),
                    (end = Math.min(Math.max(0, end), this.byteLength)),
                    0 >= end - begin)
                ) {
                    return new ArrayBuffer(0);
                }
                /** @type {!ArrayBuffer} */
                var a = new ArrayBuffer(end - begin);
                /** @type {!Uint8Array} */
                var result = new Uint8Array(a);
                /** @type {!Uint8Array} */
                var x = new Uint8Array(this, begin, end - begin);
                return result.set(x), a;
            };
        }
    }
    /** @type {function(): undefined} */
    type.updatePrototype = render;
})(Core || (Core = {}));
!(function(module) {
    /**
     * @param {?} node
     * @return {?}
     */
    function callback(node) {
        var index = node.numChildren;
        if (!index) {
            return void (node.removeEventListener && getData(node));
        }
        /** @type {number} */
        var i = 0;
        for (; index > i; i++) {
            callback(node.getChildAt(i));
        }
        node.removeChildren();
        getData(node, [egret.Event.REMOVED_FROM_STAGE]);
    }
    /**
     * @param {(Node|Window)} item
     * @return {undefined}
     */
    function remove(item) {
        if (item.$children) {
            var pipelets = item.$children.slice(0);
            pipelets.forEach(function(station) {
                remove(station);
            });
        }
        if (item.$parent) {
            item.$parent.removeChild(item);
        }
        /** @type {(Node|Window)} */
        var data = item;
        if (data.onReleaseRefs) {
            data.onReleaseRefs();
        } else {
            if (data.$Component) {
                var fogID;
                for (fogID in data.$Component) {
                    /** @type {null} */
                    data.$Component[fogID] = null;
                }
            }
            if (item.$EventDispatcher) {
                /** @type {null} */
                item.$EventDispatcher[0] = null;
            }
        }
    }
    /**
     * @param {?} callback
     * @return {undefined}
     */
    function sightglass(callback) {
        if (callback.$EventDispatcher) {
            /** @type {null} */
            callback.$EventDispatcher[0] = null;
        }
    }
    /**
     * @param {!Object} el
     * @param {!Array} items
     * @return {undefined}
     */
    function getData(el, items) {
        if (void 0 === items) {
            /** @type {!Array} */
            items = [];
        }
        var listeners;
        var listener;
        var po_array = el.$EventDispatcher[1];
        var n = el.$EventDispatcher[2];
        var j;
        for (j in po_array) {
            if (!(items.indexOf(j) >= 0) && po_array[j]) {
                listeners = po_array[j].slice(0);
                /** @type {number} */
                var i = 0;
                for (; i < listeners.length; i++) {
                    listener = listeners[i];
                    el.removeEventListener(
                        listener.type,
                        listener.listener,
                        listener.thisObject
                    );
                }
                /** @type {null} */
                listeners = null;
            }
        }
        for (j in n) {
            if (!(items.indexOf(j) >= 0) && n[j]) {
                listeners = n[j].slice(0);
                /** @type {number} */
                i = 0;
                for (; i < listeners.length; i++) {
                    listener = listeners[i];
                    el.removeEventListener(
                        listener.type,
                        listener.listener,
                        listener.thisObject
                    );
                }
                /** @type {null} */
                listeners = null;
            }
        }
    }
    /**
     * @param {!Element} s
     * @param {?} c
     * @return {undefined}
     */
    function getCharPath(s, c) {
        var f;
        var l;
        var v = s.$EventDispatcher[1];
        var p = s.$EventDispatcher[2];
        if (v[c] && (f = v[c])) {
            /** @type {number} */
            var i = 0;
            for (; i < f.length; i++) {
                l = f[i];
                s.removeEventListener(l.type, l.listener, l.thisObject);
            }
        }
        if (p[c] && (f = p[c])) {
            /** @type {number} */
            i = 0;
            for (; i < f.length; i++) {
                l = f[i];
                s.removeEventListener(l.type, l.listener, l.thisObject);
            }
        }
    }
    /** @type {function(?): ?} */
    module.freeAllChildren = callback;
    /** @type {function((Node|Window)): undefined} */
    module.releaseAllChildren = remove;
    /** @type {function(?): undefined} */
    module.releaseEventDispatcher = sightglass;
    /** @type {function(!Object, !Array): undefined} */
    module.removeAllEventListener = getData;
    /** @type {function(!Element, ?): undefined} */
    module.removeEventListenerByType = getCharPath;
})(Core || (Core = {}));
!(function(ScriptConfig_1) {
    var e;
    !(function(HTMLSectionBuilder) {
        var HTMLSection = (function() {
            /**
             * @param {!Object} output
             * @return {undefined}
             */
            function writeSearchEntry(output) {
                this.configSubdomain = output.attr('configSubdomain');
            }
            return writeSearchEntry;
        })();
        HTMLSectionBuilder.ProductInfo = HTMLSection;
        __reflect(HTMLSection.prototype, 'Core.Config.ProductInfo');
    })((e = ScriptConfig_1.Config || (ScriptConfig_1.Config = {})));
})(Core || (Core = {}));
!(function(exports) {
    var Resolute = (function(Base) {
        /**
         * @return {?}
         */
        function $() {
            var data = Base.call(this) || this;
            return (
                (data.storageMap = new exports.HashMap()),
                (data.objectMap = new exports.HashMap()),
                data
            );
        }
        return (
            __extends($, Base),
            ($.prototype.getItem = function(n) {
                var result = this.storageMap.get(n);
                if (result) {
                    return result;
                }
                var i = egret.localStorage.getItem(n);
                return this.storageMap.set(n, i), i;
            }),
            ($.prototype.setItem = function(value, key) {
                this.storageMap.set(value, key);
                egret.localStorage.setItem(value, key);
            }),
            ($.prototype.getObject = function(key, data) {
                if (void 0 === data) {
                    data = {};
                }
                var result = this.objectMap.get(key);
                if (!result) {
                    var value = this.getItem(key);
                    /** @type {*} */
                    result = value ? JSON.parse(value) : data;
                    this.objectMap.set(key, result);
                }
                return result;
            }),
            ($.prototype.setObject = function(key, item) {
                this.objectMap.set(key, item);
                /** @type {string} */
                var id = JSON.stringify(item);
                this.setItem(key, id);
            }),
            Object.defineProperty($, 'instance', {
                get: function() {
                    return this.getInstance(this);
                },
                enumerable: true,
                configurable: true
            }),
            ($.init = function() {
                return this.initInstance(this);
            }),
            $
        );
    })(exports.SingletonDispatcher);
    exports.StorageManager = Resolute;
    __reflect(Resolute.prototype, 'Core.StorageManager');
})(Core || (Core = {}));
!(function(self) {
    /**
     * @param {string} gotoEnd
     * @return {?}
     */
    function t(gotoEnd) {
        /** @type {!RegExp} */
        var e = new RegExp('(^|&)' + gotoEnd + '=([^&]*)(&|$)', 'i');
        /** @type {(Array<string>|null)} */
        var m = location.search.substr(1).match(e);
        return m && m.length >= 2 ? decodeURIComponent(m[2]) : null;
    }
    /**
     * @param {!Array} t
     * @return {?}
     */
    function match(t) {
        var tb;
        /** @type {string} */
        var returned = '';
        if (!t) {
            return returned;
        }
        for (tb in t) {
            if (!('object' == typeof t[tb])) {
                /** @type {string} */
                returned = returned + ('&' + tb + '=' + t[tb]);
            }
        }
        return returned.length > 0 && (returned = returned.substr(1)), returned;
    }
    /**
     * @param {string} val
     * @param {!Array} n
     * @return {?}
     */
    function e(val, n) {
        var related_node_ids = val.split('/').pop();
        return related_node_ids.indexOf('?') >= 0
            ? val + '&' + match(n)
            : val + '?' + match(n);
    }
    /**
     * @param {?} url
     * @param {?} title
     * @param {string} items
     * @param {string} options
     * @return {?}
     */
    function openModal(url, title, items, options) {
        if (items && options) {
            /** @type {string} */
            var link_options = 'height=' + options + ',width=' + items;
            return window.open(url, title, link_options);
        }
        return window.open(url, title);
    }
    /**
     * @param {?} url
     * @param {?} name
     * @param {?} params
     * @return {?}
     */
    function toggle(url, name, params) {
        return window.open(url, name, params);
    }
    /**
     * @param {string} b
     * @param {string} a
     * @param {number} o
     * @return {?}
     */
    function o(b, a, o) {
        return (
            void 0 === o && (o = false),
            b === self.LoginStore.instance.loginName
                ? o && a.length > 8
                    ? a.substring(0, 8) + '...'
                    : a
                : a && a != b.substring(3, self.ma + 3) && a != b
                    ? o && a.length > 8
                        ? a.substring(0, 7) + '...'
                        : a
                    : a
                        ? '***' + a.slice(a.length - 3)
                        : '***' + b.substring(3, self.ma + 3).slice(self.ma - 3)
        );
    }
    /**
     * @param {!Array} nodes
     * @return {?}
     */
    function serialize(nodes) {
        var x = nodes.length;
        var tag = new egret.ByteArray();
        /** @type {number} */
        var key = 0;
        for (; x > key; key = key + 2) {
            /** @type {number} */
            var commaMiles = parseInt(nodes[key], 16);
            /** @type {number} */
            var i = parseInt(nodes[key + 1], 16);
            tag.writeByte((commaMiles << 4) + i);
        }
        return (tag.position = 0), tag;
    }
    /**
     * @return {undefined}
     */
    function update() {
        if ('UAT' === self.ExternalData.env) {
            location.reload();
        } else {
            if (self.ExternalData.domainName) {
                /** @type {string} */
                window.location.href = '//' + self.ExternalData.domainName;
            } else {
                if (window.history.length > 1) {
                    window.history.go(-1);
                } else {
                    /** @type {string} */
                    window.location.href = 'about:blank';
                }
            }
        }
    }
    /**
     * @param {number} width
     * @return {?}
     */
    function justinImageSize(width) {
        return width > -self.FLOAT_MIN_VALUE && width < self.FLOAT_MIN_VALUE
            ? true
            : false;
    }
    /**
     * @param {number} y
     * @return {?}
     */
    function c(y) {
        /** @type {number} */
        var nm = Math.floor(y);
        /** @type {string} */
        var latestLineText = '';
        return (
            (latestLineText = nm == y ? y.toFixed(0) : y.toFixed(2)),
            latestLineText.replace(/./g, function(unload, i, foldMarkers) {
                return i && '.' != unload && (foldMarkers.length - i) % 3 === 0
                    ? ',' + unload
                    : unload;
            })
        );
    }
    /**
     * @param {number} startAngleDegrees
     * @return {?}
     */
    function getBlackHoleSolution(startAngleDegrees) {
        return (startAngleDegrees * Math.PI) / 180;
    }
    /**
     * @param {(boolean|number|string)} last
     * @param {(boolean|number|string)} first
     * @return {?}
     */
    function passChains(last, first) {
        /** @type {number} */
        var delta = last - first;
        return delta > 0 ? true : false;
    }
    /**
     * @param {number} insertedIndex
     * @return {?}
     */
    function l(insertedIndex) {
        return 10 >= insertedIndex ? 16711680 : 16768512;
    }
    /**
     * @return {undefined}
     */
    function componentFadeIn() {
        if (self.ExternalData.isPcVersion) {
            /** @type {!NodeList<Element>} */
            var t = document.getElementsByTagName('canvas');
            if (t && t.length > 0) {
                /** @type {!Element} */
                var obj = t[0];
                /** @type {string} */
                obj.style.cursor = 'default';
            }
        }
    }
    /**
     * @param {!Date} date
     * @param {number} format
     * @return {?}
     */
    function formatDate(date, format) {
        if (void 0 === format) {
            /** @type {string} */
            format = '';
        }
        /** @type {string} */
        var ret = '';
        if ([self.LANG_HANS, self.LANG_HANT, ''].indexOf(format) >= 0) {
            ret = (date.getMonth() + 1).toString();
        } else {
            /** @type {!Array} */
            var months = [
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
            ret = months[date.getMonth()];
        }
        return ret;
    }
    /**
     * @param {string} fmt
     * @param {!Date} date
     * @param {number} format
     * @return {?}
     */
    function format(fmt, date, format) {
        if (void 0 === format) {
            /** @type {string} */
            format = '';
        }
        var fields = {
            'M+': formatDate(date, format),
            'd+': date.getDate(),
            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        var paths = {
            0: '/u65e5',
            1: '/u4e00',
            2: '/u4e8c',
            3: '/u4e09',
            4: '/u56db',
            5: '/u4e94',
            6: '/u516d'
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (RegExp.$1.length > 1
                    ? RegExp.$1.length > 2
                        ? '/u661f/u671f'
                        : '/u5468'
                    : '') + paths[date.getDay() + '']
            );
        }
        var i;
        for (i in fields) {
            if (new RegExp('(' + i + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    1 == RegExp.$1.length
                        ? fields[i]
                        : ('00' + fields[i]).substr(('' + fields[i]).length)
                );
            }
        }
        return fmt;
    }
    /**
     * @return {?}
     */
    function modifyEvent() {
        return (
            self.sequence++,
            self.sequence > 99999999 && (self.sequence = 1e7),
            self.sequence
        );
    }
    /**
     * @param {!Array} column
     * @param {number} settings
     * @return {undefined}
     */
    function _(column, settings) {
        if (void 0 === settings) {
            /** @type {number} */
            settings = 0;
        }
        if (0 == settings) {
            settings = self.ARRAY_NUMERIC_ASCENDING;
        }
        /** @type {boolean} */
        var isDownList =
            settings == self.ARRAY_NUMERIC_ASCENDING ||
            settings == self.ARRAY_CASEINSENSITIVE_ASCENDING;
        column.sort(function(direction, RIGHT) {
            return direction > RIGHT
                ? isDownList
                    ? 1
                    : -1
                : isDownList
                    ? -1
                    : 1;
        });
    }
    /**
     * @param {number} text
     * @return {undefined}
     */
    function copyTextToClipboard(text) {
        /** @type {!Element} */
        var textarea = document.createElement('textarea');
        /** @type {string} */
        textarea.style.position = 'fixed';
        /** @type {string} */
        textarea.style.top = '0';
        /** @type {string} */
        textarea.style.left = '0';
        /** @type {string} */
        textarea.style.width = '2em';
        /** @type {string} */
        textarea.style.height = '2em';
        /** @type {string} */
        textarea.style.padding = '0';
        /** @type {string} */
        textarea.style.border = 'none';
        /** @type {string} */
        textarea.style.outline = 'none';
        /** @type {string} */
        textarea.style.boxShadow = 'none';
        /** @type {string} */
        textarea.style.background = 'transparent';
        /** @type {number} */
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            var successful = document.execCommand('copy');
            /** @type {string} */
            var msg = successful ? 'successful' : 'unsuccessful';
            dclib('Copying text command was ' + msg);
        } catch (t) {
            dclib('Oops, unable to copy');
        }
        document.body.removeChild(textarea);
    }
    /**
     * @param {string} content
     * @return {?}
     */
    function calculateTextareaHeight(content) {
        /** @type {!Element} */
        var e = document.createElement('textarea');
        return (e.innerHTML = content), e.value;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    function extractPresetLocal(callback) {
        switch (callback) {
            case self.LANG_HANS:
                return self.LANG_ZH_CONF;
            case self.LANG_HANT:
                return self.LANG_TR_CONF;
            case self.LANG_EN:
                return self.LANG_EN_CONF;
            case self.LANG_JA:
                return self.LANG_JP_CONF;
            case self.LANG_KO:
                return self.LANG_KR_CONF;
            case self.LANG_TH:
                return self.LANG_TH_CONF;
            case self.LANG_KM:
                return self.LANG_KM_CONF;
            case self.LANG_PT:
                return self.LANG_PT_CONF;
        }
        return self.LANG_EN_CONF;
    }
    /**
     * @param {number} i
     * @return {?}
     */
    function slice(i) {
        return (9 >= i ? '0' : '') + i;
    }
    /**
     * @param {!Date} value
     * @return {?}
     */
    function prepareCriterion(value) {
        return (
            [
                value.getFullYear(),
                slice(value.getMonth() + 1),
                slice(value.getDate())
            ].join('-') +
            ' ' +
            [
                slice(value.getHours()),
                slice(value.getMinutes()),
                slice(value.getSeconds())
            ].join(':')
        );
    }
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    function script(data) {
        if (data.thisArg) {
            data.callback.call(data.thisArg);
        } else {
            data.callback();
        }
    }
    /**
     * @param {!Object} options
     * @param {?} value
     * @return {undefined}
     */
    function stub(options, value) {
        if (options.thisArg) {
            options.callback.call(options.thisArg, value);
        } else {
            options.callback(value);
        }
    }
    /**
     * @param {number} username
     * @return {undefined}
     */
    function userFollowQuery(username) {
        if (void 0 === username) {
            /** @type {string} */
            username = '';
        }
        /** @type {!Error} */
        var error = new Error();
        console.warn(username, error.stack);
    }
    /**
     * @param {?} item
     * @param {!Object} text
     * @param {string} value
     * @return {undefined}
     */
    function render(item, text, value) {
        var style;
        /** @type {boolean} */
        var id = value ? true : false;
        /** @type {number} */
        var i = 0;
        for (; i < item.numChildren; i++) {
            style = item.getChildAt(i);
            /** @type {!Object} */
            style.textColor = text;
            /** @type {boolean} */
            style.bold = id;
            /** @type {boolean} */
            style.background = id;
            if (id) {
                /** @type {string} */
                style.backgroundColor = value;
            }
        }
    }
    /**
     * @param {number} callback
     * @return {?}
     */
    function y(callback) {
        return '[' + callback.toString() + ']';
    }
    /** @type {function(string): ?} */
    self.getUrlParams = t;
    /** @type {function(string, !Array): ?} */
    self.urlWithParams = e;
    /** @type {function(?, ?, string, string): ?} */
    self.openUrl = openModal;
    /** @type {function(?, ?, ?): ?} */
    self.openUrlWithProps = toggle;
    /** @type {function(string, string, number): ?} */
    self.getAnonymousName = o;
    /** @type {function(!Array): ?} */
    self.hexStringToByteArray = serialize;
    /** @type {function(): undefined} */
    self.quit = update;
    /** @type {number} */
    self.FLOAT_MIN_VALUE = 1e-6;
    /** @type {function(number): ?} */
    self.isZero = justinImageSize;
    /** @type {function(number): ?} */
    self.formatNumStr = c;
    /** @type {function(number): ?} */
    self.degreeToRadians = getBlackHoleSolution;
    /** @type {function((boolean|number|string), (boolean|number|string)): ?} */
    self.checkBalance = passChains;
    /** @type {function(number): ?} */
    self.getTimerColor = l;
    /** @type {function(): undefined} */
    self.resetMouseCursor = componentFadeIn;
    /** @type {function(!Date, number): ?} */
    self.getMonthStr = formatDate;
    /** @type {function(string, !Date, number): ?} */
    self.patternDate = format;
    /** @type {number} */
    self.sequence = 1e7;
    /** @type {function(): ?} */
    self.getSequence = modifyEvent;
    /** @type {number} */
    self.ARRAY_NUMERIC_ASCENDING = 1;
    /** @type {number} */
    self.ARRAY_NUMERIC_DESCENDING = 2;
    /** @type {number} */
    self.ARRAY_CASEINSENSITIVE_ASCENDING = 3;
    /** @type {number} */
    self.ARRAY_CASEINSENSITIVE_DESCENDING = 4;
    /** @type {function(!Array, number): undefined} */
    self.arraySort = _;
    /** @type {function(number): undefined} */
    self.copyTextToClipboard = copyTextToClipboard;
    /** @type {function(string): ?} */
    self.pasteHtmlToString = calculateTextareaHeight;
    /** @type {function(?): ?} */
    self.getConfigLang = extractPresetLocal;
    /** @type {function(number): ?} */
    self.pad2 = slice;
    /** @type {function(!Date): ?} */
    self.formatToDatetime = prepareCriterion;
    /** @type {function(!Object): undefined} */
    self.callCallback = script;
    /** @type {function(!Object, ?): undefined} */
    self.callCallbackParam = stub;
    /** @type {function(number): undefined} */
    self.traceStack = userFollowQuery;
    /** @type {function(?, !Object, string): undefined} */
    self.setGrpTitleStyle = render;
    /** @type {function(number): ?} */
    self.getErrorCodeStr = y;
})(Core || (Core = {}));
!(function(exports) {
    var XMLReader = (function() {
        /**
         * @param {number} object
         * @return {undefined}
         */
        function type(object) {
            /** @type {number} */
            this.xmlObj = object;
        }
        return (
            (type.prototype.find = function(name) {
                var children = this.xmlObj._children;
                if (!children || children.length <= 0) {
                    return [];
                }
                /** @type {!Array} */
                var outEvents = [];
                return (
                    children.forEach(function(key) {
                        if (key.name == name) {
                            outEvents.push(new type(key));
                        }
                    }, this),
                    outEvents
                );
            }),
            (type.prototype.getChildren = function() {
                var children = this.xmlObj._children;
                if (!children || children.length <= 0) {
                    return new exports.ArrayMap();
                }
                var self = new exports.ArrayMap();
                return (
                    children.forEach(function(data) {
                        self.set(data.name, new type(data));
                    }, this),
                    self
                );
            }),
            (type.prototype.hasAttr = function(key) {
                var e = this.xmlObj['$' + key];
                return null != e;
            }),
            (type.prototype.attr = function(key, e) {
                if (void 0 === e) {
                    /** @type {string} */
                    e = '';
                }
                var n = this.xmlObj['$' + key];
                return n ? n : e;
            }),
            Object.defineProperty(type.prototype, 'text', {
                get: function() {
                    var text = this.xmlObj._text;
                    return text ? text : '';
                },
                enumerable: true,
                configurable: true
            }),
            (type.prototype.listAttr = function(key, index) {
                if (void 0 === index) {
                    /** @type {string} */
                    index = ' ';
                }
                var val = this.attr(key);
                return val
                    ? val.split(index).filter(function(value) {
                          return '' !== value;
                      })
                    : [];
            }),
            (type.prototype.intAttr = function(attr, elem) {
                if (void 0 === elem) {
                    /** @type {number} */
                    elem = 0;
                }
                /** @type {number} */
                var majorGraduationTextSize = parseInt(this.attr(attr));
                return isNaN(majorGraduationTextSize)
                    ? elem
                    : majorGraduationTextSize;
            }),
            (type.prototype.boolAttr = function(attr, elem) {
                return (
                    void 0 === elem && (elem = false),
                    '1' === this.attr(attr, elem ? '1' : '0')
                );
            }),
            (type.read = function(key) {
                return new type(key);
            }),
            type
        );
    })();
    exports.XMLReader = XMLReader;
    __reflect(XMLReader.prototype, 'Core.XMLReader');
})(Core || (Core = {}));
var GameAbac;
var GameBac;
/**
 * @return {undefined}
 */
function dclib() {}
