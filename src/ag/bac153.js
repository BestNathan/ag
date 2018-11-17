var GameBac;
!(function(t) {
    function e() {
        Core.soundManager.playLocalize('1_bac');
    }
    function i() {
        Core.soundManager.playLocalize('2_bac');
    }
    function r() {
        Core.soundManager.playLocalize('3_bac');
    }
    function s() {
        Core.soundManager.playLocalize('4_bac');
    }
    function n(t) {
        Core.soundManager.playLocalize(41 + t + '_bac');
    }
    function o(t, e, i, r, s) {
        t
            ? r || s
                ? r && !s
                    ? Core.soundManager.playLocalize('8_bac')
                    : !r && s
                        ? Core.soundManager.playLocalize('9_bac')
                        : r && s && Core.soundManager.playLocalize('10_bac')
                : Core.soundManager.playLocalize('5_bac')
            : e
                ? r || s
                    ? r && !s
                        ? Core.soundManager.playLocalize('11_bac')
                        : !r && s
                            ? Core.soundManager.playLocalize('12_bac')
                            : r && s && Core.soundManager.playLocalize('13_bac')
                    : Core.soundManager.playLocalize('6_bac')
                : i &&
                  (r || s
                      ? r && !s
                          ? Core.soundManager.playLocalize('14_bac')
                          : !r && s
                              ? Core.soundManager.playLocalize('15_bac')
                              : r &&
                                s &&
                                Core.soundManager.playLocalize('16_bac')
                      : Core.soundManager.playLocalize('7_bac'));
    }
    function a(t) {
        0 === t
            ? Core.soundManager.playLocalize('95_bac')
            : Core.soundManager.playLocalize('94_bac');
    }
    function h(t, e) {
        0 === t
            ? Core.soundManager.playLocalize('26_bac')
            : Core.soundManager.playLocalize(16 + t + '_bac'),
            0 === e
                ? Core.soundManager.playLocalize('36_bac')
                : Core.soundManager.playLocalize(26 + e + '_bac');
    }
    function u() {
        Core.soundManager.stop();
    }
    (t.soundWelcome = e),
        (t.soundPleaseBet = i),
        (t.soundBetSuccess = r),
        (t.soundStopBet = s),
        (t.soundSeat = n),
        (t.soundGameResult = o),
        (t.soundSupplement = a),
        (t.soundScore = h),
        (t.stopAllGameSound = u);
})(GameBac || (GameBac = {}));
var GameBac;
!(function(n) {
    (n.GameSocket = VideoGameCore.BacGameSocket),
        (n.BacStore = VideoGameCore.BacStore),
        (n.RoomTimerStore = VideoGameCore.RoomTimerStore),
        (n.BetTableStore = VideoGameCore.BetTableStore),
        (n.PokerStore = VideoGameCore.PokerStore),
        (n.RoadMapStore = VideoGameCore.RoadMapStore),
        (n.TableSeatStore = VideoGameCore.TableSeatStore);
    var t = (function(s) {
        function t() {
            return (null !== s && s.apply(this, arguments)) || this;
        }
        return (
            __extends(t, s),
            (t.prototype.prepareDataModel = function(t, e, i) {
                s.prototype.prepareDataModel.call(this, t, e);
                var r = i.vid;
                PCPlaza.RootPageStore.instance.setVideo(r),
                    (n.GameSocket.init().vid = r),
                    (n.BacStore.init().vid = r),
                    (n.RoomTimerStore.init().vid = r),
                    (n.BetTableStore.init().vid = r),
                    (n.PokerStore.init().vid = r),
                    (n.RoadMapStore.init().vid = r),
                    (n.TableSeatStore.init().vid = r),
                    (Core.ChatStore.init().vid = r),
                    VideoGameCore.UserStore.instance.attachSocketList('bac', [
                        n.GameSocket.instance
                    ]),
                    VideoGameCore.PlazaRoadStore.instance.attachSocketList(
                        'bac',
                        [n.GameSocket.instance]
                    ),
                    t.call(e);
            }),
            (t.prototype.releaseDataModel = function() {
                s.prototype.releaseDataModel.call(this),
                    VideoGameCore.PlazaRoadStore.instance.removeSocketList(
                        'bac'
                    ),
                    VideoGameCore.UserStore.instance.removeSocketList('bac'),
                    Core.ChatStore.releaseInstance(),
                    n.TableSeatStore.releaseInstance(),
                    n.RoadMapStore.releaseInstance(),
                    n.PokerStore.releaseInstance(),
                    n.BetTableStore.releaseInstance(),
                    n.RoomTimerStore.releaseInstance(),
                    n.BacStore.releaseInstance(),
                    n.GameSocket.releaseInstance(),
                    (this.isPrepared = !1);
            }),
            (t.prototype.startModule = function(t) {
                s.prototype.startModule.call(this, t),
                    n.GameSocket.instance.autoConnect(),
                    Core.pageNavigator.changePage(
                        new n.GamePage(),
                        t.keepPrevPage
                    ),
                    Core.globalStore.dispatchGlobal(VideoGameCore.Fo);
            }),
            (t.prototype.endModule = function(t, e) {
                var i =
                    n.BetTableStore.instance.canLeaveTable ||
                    n.GameSocket.instance.isSocketDie;
                i &&
                    (n.GameSocket.instance.isSocketDie ||
                        (n.GameSocket.instance.writeBytes(
                            VideoGameCore.getCMDGameTableExit()
                        ),
                        n.GameSocket.instance.killSocket(1e3)),
                    n.stopAllGameSound(),
                    Core.pageNavigator.popPage()),
                    t.call(e, i);
            }),
            t
        );
    })(Core.ModuleHandlerBase);
    (n.ModuleHandler = t),
        __reflect(t.prototype, 'GameBac.ModuleHandler'),
        (n.moduleHandler = new t());
})(GameBac || (GameBac = {}));
var GameBac;
!(function(t) {
    var e = (function(r) {
        function t() {
            for (var t, e = r.call(this) || this, i = 0; i < e.numChildren; i++)
                (t = e.getChildAt(i)),
                    (t.width = 122),
                    (t.height = 40),
                    (t.x = e.largerBetButtonsX[i]);
            return e;
        }
        return (
            __extends(t, r),
            (t.prototype.getStoreList = function() {
                return [
                    VideoGameCore.BetTableStore.instance,
                    VideoGameCore.RoomTimerStore.instance
                ];
            }),
            (t.prototype.getBetTableStore = function() {
                return VideoGameCore.BetTableStore.instance;
            }),
            t
        );
    })(PCPlaza.BetButtonsBase);
    (t.BetButtons = e), __reflect(e.prototype, 'GameBac.BetButtons');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(o) {
    var t = (function(e) {
        function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t.BLINK_MAX_ALPHA = 0.7), (t.isBlinking = !1), t;
        }
        return (
            __extends(t, e),
            (t.prototype.getMyChipHolder = function() {
                return this.chipHolderGrp.getChildByName('playerMe');
            }),
            (t.prototype.getChipHolderBySeat = function(t) {
                var e = this.getMyChipHolder();
                return e && t === o.BetTableStore.instance.mySeatNum
                    ? e
                    : this.chipHolderGrp.getChildByName('player' + t);
            }),
            (t.prototype.childrenCreated = function() {
                var t = this;
                (this.enabled = !1),
                    this.addEventListener(
                        eui.UIEvent.RESIZE,
                        function() {
                            (t.chipHolderGrp.width = t.blinkImg.width),
                                (t.chipHolderGrp.height = t.blinkImg.height);
                        },
                        this
                    ),
                    mouse.setButtonMode(this.blinkImg, !0),
                    this.blinkImg.addEventListener(
                        mouse.MouseEvent.MOUSE_OVER,
                        this.onMouse,
                        this
                    ),
                    this.blinkImg.addEventListener(
                        mouse.MouseEvent.MOUSE_OUT,
                        this.onMouse,
                        this
                    ),
                    this.blinkImg.addEventListener(
                        egret.TouchEvent.TOUCH_TAP,
                        this.onClick,
                        this
                    ),
                    (this.blinkImg.alpha = 0),
                    this.addEventListener(
                        eui.UIEvent.RESIZE,
                        function() {
                            (t.blinkImg.x = t.x), (t.blinkImg.y = t.y);
                        },
                        this
                    );
            }),
            (t.prototype.getStoreList = function() {
                return [o.BetTableStore.instance, o.RoomTimerStore.instance];
            }),
            (t.prototype.onStoreChange = function(t, e, i) {
                switch (e) {
                    case Core.t:
                        this.blinkImg.parent === this &&
                            this.addToParent(this.blinkImg),
                            (this.playType = parseInt(
                                this.name.replace(/playType(\d+)/, '$1')
                            )),
                            this.updateAllChip(),
                            this.updateBetEnabled();
                        break;
                    case VideoGameCore.Y:
                        this.updateBetEnabled();
                        break;
                    case VideoGameCore.T:
                        this.updateAllChip(), this.updateBetEnabled();
                        break;
                    case VideoGameCore.n:
                    case VideoGameCore.o:
                    case VideoGameCore.G:
                    case VideoGameCore.r:
                    case VideoGameCore.f:
                    case VideoGameCore.C:
                        this.updateAllChip(), this.updateBetEnabled();
                        break;
                    case VideoGameCore.Z:
                        this.updateAllChip(),
                            this.stopBlink(),
                            this.updateBetEnabled();
                        break;
                    case VideoGameCore.w:
                        this.updateBetEnabled();
                        break;
                    case VideoGameCore.P:
                        if (this.getPartEnabled()) {
                            var r = i.winPlayTypes;
                            r.indexOf(this.playType) >= 0 && this.startBlink();
                        }
                        break;
                    case VideoGameCore.it:
                        this.updateAllChip(), this.stopBlink();
                }
            }),
            (t.prototype.updateBetEnabled = function() {
                var t = this.getPartEnabled();
                if (
                    ((this.blinkImg.touchEnabled =
                        o.BetTableStore.instance.betEnabled && t),
                    t)
                )
                    this.blinkImg && (this.blinkImg.filters = []),
                        this.textImg && (this.textImg.filters = []);
                else {
                    var e = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0
                    ];
                    this.blinkImg.filters = [new egret.ColorMatrixFilter(e)];
                    var i = [
                        1,
                        0,
                        0,
                        0,
                        -150,
                        0,
                        1,
                        0,
                        0,
                        -150,
                        0,
                        0,
                        1,
                        0,
                        -150,
                        0,
                        0,
                        0,
                        1,
                        0
                    ];
                    this.textImg.filters = [new egret.ColorMatrixFilter(i)];
                }
                this.blinkImg.alpha = t ? 0 : 0.7;
            }),
            (t.prototype.getPartEnabled = function() {
                return (
                    o.BetTableStore.instance
                        .getDisablePlayTypes()
                        .indexOf(this.playType) < 0
                );
            }),
            (t.prototype.onClick = function(t) {
                o.BetTableStore.instance.addChipByPlayType(this.playType);
            }),
            (t.prototype.updateAllChip = function() {
                var t = this.getMyChipHolder();
                if (t)
                    return void this.updataChipHolder(
                        t,
                        o.BetTableStore.instance.mySeatNum
                    );
                for (var e = 0; e < this.chipHolderGrp.numChildren; e++) {
                    var i = this.chipHolderGrp.getChildAt(e),
                        r = parseInt(i.name.replace(/player(\d+)/, '$1'));
                    this.updataChipHolder(i, r);
                }
            }),
            (t.prototype.updataChipHolder = function(t, e) {
                t.removeChildren();
                var i = o.BetTableStore.instance.getAmountByType(
                    this.playType,
                    e
                );
                if (i > 0) {
                    var r = e === o.BetTableStore.instance.mySeatNum,
                        s = o.BetTableStore.instance.checkConfirmedByType(
                            this.playType
                        ),
                        n = new PCPlaza.ChipHeap(VideoGameCore.GAME_BAC, r);
                    (n.filters =
                        r && s
                            ? [
                                  new egret.DropShadowFilter(
                                      2,
                                      45,
                                      16776960,
                                      1,
                                      3,
                                      3
                                  )
                              ]
                            : null),
                        t.addChild(n),
                        n.setAmount(i),
                        n.updateCurrency(
                            o.BetTableStore.instance.getCurrencyBySeatNum(e)
                        );
                }
            }),
            (t.prototype.onMouse = function(t) {
                if (this.blinkImg.touchEnabled)
                    switch (t.type) {
                        case mouse.MouseEvent.MOUSE_OVER:
                            this.blinkImg.alpha = this.BLINK_MAX_ALPHA;
                            break;
                        case mouse.MouseEvent.MOUSE_OUT:
                            this.blinkImg.alpha = 0;
                    }
            }),
            (t.prototype.startBlink = function() {
                this.getPartEnabled() &&
                    (this.isBlinking || ((this.isBlinking = !0), this.blink()));
            }),
            (t.prototype.stopBlink = function() {
                this.isBlinking &&
                    ((this.isBlinking = !1),
                    egret.Tween.removeTweens(this.blinkImg),
                    (this.blinkImg.alpha = 0));
            }),
            (t.prototype.blink = function() {
                egret.Tween.get(this.blinkImg)
                    .to(
                        { alpha: this.BLINK_MAX_ALPHA - this.blinkImg.alpha },
                        VideoGameCore.TIMEOUT.TWEEN
                    )
                    .call(this.blink, this);
            }),
            (t.prototype.addToParent = function(t) {
                var e = this.localToGlobal(t.x, t.y);
                (e = this.parent.globalToLocal(e.x, e.y)),
                    this.removeChild(t),
                    (t.x = e.x),
                    (t.y = e.y),
                    this.parent.addChildAt(t, 0);
            }),
            (t.prototype.onRemoveFromStage = function() {
                e.prototype.onRemoveFromStage.call(this),
                    (this.blinkImg.touchEnabled = !1);
            }),
            t
        );
    })(Core.StoreView);
    (o.BetPartView = t), __reflect(t.prototype, 'GameBac.BetPartView');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(m) {
    var t = (function(i) {
        function t() {
            var t = (null !== i && i.apply(this, arguments)) || this;
            return (t.isCanNoComm = !1), (t.onlyShowMePlayTypes = []), t;
        }
        return (
            __extends(t, i),
            (t.prototype.onBetAreaHandler = function(t) {
                var e = Number(t.target.name.split('playType')[1]);
                m.BetTableStore.instance.addChipByPlayType(e);
            }),
            (t.prototype.onBetAreaRollOver = function(t) {
                this.onBetAreaRollOut(), (t.target.alpha = 1);
            }),
            (t.prototype.onBetAreaRollOut = function() {
                this.forAllChildImage(this.betAreaGrp, function(t) {
                    t.alpha = 0;
                });
            }),
            (t.prototype.forAllChildImage = function(t, e) {
                for (var i, r = 0; r < t.numChildren; r++)
                    (i = t.getChildAt(r)), e(i);
            }),
            (t.prototype.playBlinkMv = function(t, e) {
                void 0 === e && (e = !1);
                var i = e ? 1 : 0,
                    r = e ? 0 : 1;
                (t.alpha = i),
                    egret.Tween.get(t)
                        .to({ alpha: r }, VideoGameCore.TIMEOUT.TWEEN)
                        .call(function() {
                            this.playBlinkMv(t, !e);
                        }, this);
            }),
            (t.prototype.showBlinkMv = function(t, e) {
                void 0 === e && (e = null), (this.blinkMv.visible = t);
                for (var i, r, s = 0; s < this.blinkMv.numChildren; s++)
                    (i = this.blinkMv.getChildAt(s)),
                        (r = !1),
                        t &&
                            (r =
                                null != e
                                    ? e.indexOf(
                                          Number(i.name.replace('playType', ''))
                                      ) >= 0
                                    : !1),
                        (i.visible = r),
                        t
                            ? this.playBlinkMv(i, t)
                            : egret.Tween.removeTweens(i);
            }),
            (t.prototype.updateAllChipHeaps = function(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = null);
                var i = !1;
                if (
                    ((null == e || e.length <= 0) &&
                        ((e = m.BetTableStore.instance.playtypes), (i = !0)),
                    null != e)
                )
                    for (
                        var r,
                            s,
                            n,
                            o,
                            a,
                            h,
                            u,
                            c = t > 0 ? t : 1,
                            f = t > 0 ? t : VideoGameCore.MAX_TABLE_SEAT,
                            C = 0;
                        C < e.length;
                        C++
                    )
                        if (
                            ((a = e[C]),
                            (n = this.chipsHolder.getChildByName(
                                'playType' + a
                            )),
                            null != n)
                        )
                            for (var l = c; f >= l; l++)
                                (r = null),
                                    (s =
                                        l ==
                                        m.BetTableStore.instance.mySeatNum),
                                    (u = l.toString()),
                                    s &&
                                        this.onlyShowMePlayTypes.indexOf(a) >=
                                            0 &&
                                        (u = 'Me'),
                                    (o = n.getChildByName('player' + u)),
                                    null != o &&
                                        (0 == o.numChildren
                                            ? ((r = new PCPlaza.ChipHeap(
                                                  VideoGameCore.GAME_BAC,
                                                  s
                                              )),
                                              o.addChild(r))
                                            : (r = o.getChildAt(0)),
                                        r.updateCurrency(
                                            m.BetTableStore.instance.getCurrencyBySeatNum(
                                                l
                                            )
                                        )),
                                    null != r &&
                                        ((h = m.BetTableStore.instance.getAmountByType(
                                            a,
                                            l
                                        )),
                                        (r.visible = h > 0),
                                        r.setAmount(h),
                                        i
                                            ? (r.filters = s
                                                  ? [
                                                        new egret.DropShadowFilter(
                                                            2,
                                                            45,
                                                            16776960,
                                                            1,
                                                            3,
                                                            3
                                                        )
                                                    ]
                                                  : null)
                                            : (r.filters = null));
            }),
            (t.prototype.showPayout = function(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = null);
                var i, r, s, n;
                if (0 == t && null == e) {
                    for (i = this.dealerChipHolder.numChildren; i > 0; i--)
                        (n = this.dealerChipHolder.getChildAt(i - 1)),
                            this.tweenChipHeapComplete(n),
                            this.dealerChipHolder.removeChild(n),
                            (n = null);
                    var o;
                    for (i = 0; i < this.chipsHolder.numChildren; i++)
                        for (
                            r = this.chipsHolder.getChildAt(i), o = 0;
                            o < r.numChildren;
                            o++
                        )
                            (s = r.getChildAt(o)),
                                s.numChildren > 0 &&
                                    ((n = s.getChildAt(0)),
                                    this.tweenChipHeapComplete(n));
                } else {
                    var a,
                        h,
                        u,
                        c = this.tweenEndTargetHolder.getChildByName(
                            'player' + t
                        );
                    for (i = 0; i < e.length; i++)
                        (a = e[i]),
                            (h = m.BetTableStore.instance.getRealPlaytype(
                                a.playtype
                            )),
                            (r = this.chipsHolder.getChildByName(
                                'playType' + h.toString()
                            )),
                            null != r &&
                                r.visible &&
                                ((u = t.toString()),
                                t == m.BetTableStore.instance.mySeatNum &&
                                    this.onlyShowMePlayTypes.indexOf(h) >= 0 &&
                                    (u = 'Me'),
                                (s = r.getChildByName('player' + u)),
                                null != s &&
                                    s.numChildren > 0 &&
                                    ((n = s.getChildAt(0)),
                                    n.visible &&
                                        this.tweenChipHeapToEndTarget(
                                            n,
                                            a.value < 0
                                                ? this.dealerChipHolder
                                                : c,
                                            a.value,
                                            a.value > 0 ? -18 : 0
                                        )));
                }
            }),
            (t.prototype.tweenChipHeapToEndTarget = function(t, e, i, r) {
                void 0 === i && (i = 0), void 0 === r && (r = 0);
                var s, n, o;
                if (null != this.stage && t && null != t.stage) {
                    if (i > 0) {
                        var a = new PCPlaza.ChipHeap(VideoGameCore.GAME_BAC);
                        a.setAmount(i),
                            this.dealerChipHolder.addChild(a),
                            (s = a),
                            (n = t.parent.localToGlobal(t.x, t.y)),
                            (n = a.parent.globalToLocal(n.x, n.y)),
                            (o = function() {
                                this.tweenChipHeapToEndTarget(a, e, 0, r),
                                    this.tweenChipHeapToEndTarget(t, e);
                            });
                    } else
                        (s = t),
                            (n = e.parent.localToGlobal(e.x, e.y)),
                            (n = t.parent.globalToLocal(n.x, n.y)),
                            (o = function() {
                                this.tweenChipHeapComplete(
                                    t,
                                    0 > i && 0 == r,
                                    0 == i
                                );
                            });
                    egret.Tween.get(s)
                        .to(
                            { x: n.x, y: n.y + r },
                            VideoGameCore.TIMEOUT.TWEEN,
                            egret.Ease.cubicOut
                        )
                        .wait(500)
                        .call(o, this);
                }
            }),
            (t.prototype.tweenChipHeapComplete = function(t, e, i) {
                void 0 === e && (e = !0),
                    void 0 === i && (i = !1),
                    egret.Tween.removeTweens(t),
                    e && ((t.x = 0), (t.y = 0)),
                    (t.visible = i);
            }),
            (t.prototype.updateNoCommBar = function() {
                (this.noCommBar.visible = m.BetTableStore.instance.noComm),
                    this.updateSkinState();
            }),
            (t.prototype.updateSkinState = function() {
                m.BetTableStore.instance.noComm && m.BetTableStore.instance.isSS
                    ? m.BetTableStore.instance.isDB
                        ? m.BetTableStore.instance.isPair
                            ? (this.currentState = 'DBSSPair')
                            : (this.currentState = 'DBSS')
                        : m.BetTableStore.instance.isPair
                            ? (this.currentState = 'SSPair')
                            : (this.currentState = 'SS')
                    : m.BetTableStore.instance.isDB
                        ? m.BetTableStore.instance.isPair
                            ? (this.currentState = 'DBPair')
                            : (this.currentState = 'DB')
                        : m.BetTableStore.instance.isPair
                            ? (this.currentState = 'Pair')
                            : (this.currentState = 'normal');
            }),
            (t.prototype.updateNoCommBtnVisible = function(t) {
                void 0 === t && (t = !0);
                var e = m.BetTableStore.instance.betEnabled,
                    i = m.BetTableStore.instance.commToggleEnabled;
                this.noCommBtn.visible = t ? e && i : !1;
            }),
            (t.prototype.updateNoCommBtnState = function() {
                m.BetTableStore.instance.noComm
                    ? (this.noCommBtn.changeState('upAndSelected'),
                      (this.bankerText.localeName = 'banker_1'))
                    : (this.noCommBtn.changeState('up'),
                      (this.bankerText.localeName = 'banker'));
            }),
            (t.prototype.onClickNoCommBtn = function() {
                m.BetTableStore.instance.noComm = !m.BetTableStore.instance
                    .noComm;
            }),
            (t.prototype.updateDisableBtn = function(t) {
                if (
                    (void 0 === t && (t = !0),
                    (this.disableAreaGrp.visible = t),
                    this.disableAreaGrp.visible)
                )
                    for (
                        var e,
                            i,
                            r,
                            s,
                            n = m.BetTableStore.instance.getDisablePlayTypes(),
                            o = 0;
                        o < m.BetTableStore.instance.playtypes.length;
                        o++
                    )
                        (e = m.BetTableStore.instance.playtypes[o]),
                            (i = this.disableAreaGrp.getChildByName(
                                'playType' + e.toString()
                            )),
                            null != i &&
                                ((r = i.getChildByName('rect')),
                                (s = i.getChildByName('img')),
                                (r.mask = s),
                                (i.visible = n.indexOf(e) >= 0));
            }),
            (t.prototype.getStoreList = function() {
                return [
                    m.BetTableStore.instance,
                    m.RoomTimerStore.instance,
                    Core.LocalizeStore.instance
                ];
            }),
            (t.prototype.childrenCreated = function() {
                i.prototype.childrenCreated.call(this);
                for (var t, e = 0; e < this.betAreaGrp.numChildren; e++)
                    (t = this.betAreaGrp.getChildAt(e)),
                        (t.alpha = 0),
                        mouse.setButtonMode(t, !0),
                        t.addEventListener(
                            egret.TouchEvent.TOUCH_TAP,
                            this.onBetAreaHandler,
                            this
                        ),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onBetAreaRollOver,
                            this
                        ),
                        t.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onBetAreaRollOut,
                            this
                        );
                this.btnPlayerDB &&
                    ((this.btnPlayerDB.mouseLocaleFunc = null),
                    (this.btnPlayerDB.mouseLocaleKey = ''),
                    Core.MouseTips.instance.unregisterMouseTip(
                        this.btnPlayerDB
                    ),
                    null != this.pDBTip &&
                        (this.btnPlayerDB.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouseOverDBPlayerTip,
                            this
                        ),
                        this.btnPlayerDB.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouseOutDBPlayerTip,
                            this
                        ))),
                    this.btnBankerDB &&
                        ((this.btnBankerDB.mouseLocaleFunc = null),
                        (this.btnBankerDB.mouseLocaleKey = ''),
                        Core.MouseTips.instance.unregisterMouseTip(
                            this.btnBankerDB
                        ),
                        null != this.bDBTip &&
                            (this.btnBankerDB.addEventListener(
                                mouse.MouseEvent.MOUSE_OVER,
                                this.onMouseOverDBBankerTip,
                                this
                            ),
                            this.btnBankerDB.addEventListener(
                                mouse.MouseEvent.MOUSE_OUT,
                                this.onMouseOutDBBankerTip,
                                this
                            )));
            }),
            (t.prototype.onStoreChange = function(t, e, i) {
                var r;
                switch (e) {
                    case Core.t:
                        (this.onlyShowMePlayTypes = []),
                            this.updateSkinState(),
                            m.BetTableStore.instance.isDB &&
                                (this.onlyShowMePlayTypes = this.onlyShowMePlayTypes.concat(
                                    [
                                        VideoGameCore.PLAYTYPE_BIG,
                                        VideoGameCore.PLAYTYPE_SMALL,
                                        VideoGameCore.PLAYTYPE_BANKER_DRAGON_BONUS,
                                        VideoGameCore.PLAYTYPE_PLAYER_DRAGON_BONUS
                                    ]
                                )),
                            m.BetTableStore.instance.isPair &&
                                (this.onlyShowMePlayTypes = this.onlyShowMePlayTypes.concat(
                                    [
                                        VideoGameCore.PLAYTYPE_BANKER_PAIR,
                                        VideoGameCore.PLAYTYPE_PLAYER_PAIR,
                                        VideoGameCore.PLAYTYPE_ANY_PAIR,
                                        VideoGameCore.PLAYTYPE_PERFECT_PAIR
                                    ]
                                )),
                            this.noCommBtn.setClickCallback(
                                this.onClickNoCommBtn
                            ),
                            this.updateNoCommBar(),
                            this.updateNoCommBtnState(),
                            this.showBlinkMv(!1),
                            this.updateNoCommBtnVisible(!1),
                            this.updateDisableBtn(!1),
                            this.langChange();
                        break;
                    case VideoGameCore.Y:
                        (this.betAreaGrp.visible =
                            m.BetTableStore.instance.betEnabled),
                            this.updateNoCommBtnVisible(),
                            this.updateNoCommBtnState(),
                            this.updateDisableBtn();
                        break;
                    case VideoGameCore.n:
                        this.addChipsSound();
                    case VideoGameCore.G:
                    case VideoGameCore.r:
                        this.updateAllChipHeaps(
                            m.BetTableStore.instance.mySeatNum,
                            i && i.playType ? [i.playType] : null
                        ),
                            this.updateNoCommBtnVisible();
                        break;
                    case VideoGameCore.o:
                        this.addChipsSound(),
                            this.updateAllChipHeaps(
                                m.BetTableStore.instance.mySeatNum,
                                i
                            ),
                            this.updateNoCommBtnVisible();
                        break;
                    case VideoGameCore.J:
                        this.updateNoCommBar(), this.updateNoCommBtnState();
                        break;
                    case VideoGameCore.f:
                        this.updateAllChipHeaps(
                            m.BetTableStore.instance.mySeatNum
                        ),
                            this.updateNoCommBtnVisible();
                        break;
                    case VideoGameCore.Z:
                        (this.betAreaGrp.visible =
                            m.BetTableStore.instance.betEnabled),
                            this.updateNoCommBtnVisible(),
                            this.updateNoCommBtnState(),
                            this.showBlinkMv(!1),
                            this.updateAllChipHeaps(),
                            this.showPayout(),
                            this.updateDisableBtn();
                        break;
                    case VideoGameCore.T:
                        var s = null != i ? i : 0;
                        this.updateAllChipHeaps(s),
                            this.updateNoCommBtnVisible();
                        break;
                    case VideoGameCore.w:
                    case VideoGameCore.it:
                        (this.betAreaGrp.visible =
                            m.BetTableStore.instance.betEnabled),
                            this.updateNoCommBtnVisible(),
                            this.updateNoCommBtnState(),
                            11 == m.RoomTimerStore.instance.gameStatus &&
                                (this.showPayout(), this.showBlinkMv(!1));
                        break;
                    case VideoGameCore.P:
                        var n,
                            o = i.winPlayTypes,
                            a = m.BetTableStore.instance.getDisablePlayTypes();
                        for (r = 0; r < a.length; r++)
                            (n = o.indexOf(a[r])), n >= 0 && o.splice(n, 1);
                        this.showBlinkMv(!0, o);
                        break;
                    case VideoGameCore.k:
                        null != i &&
                            null != i.seatNum &&
                            null != i.payouts &&
                            VideoGameCore.isValidSeatNum(i.seatNum) &&
                            this.showPayout(i.seatNum, i.payouts);
                        break;
                    case Core.q:
                        this.langChange();
                }
            }),
            (t.prototype.addChipsSound = function() {
                m.BetTableStore.instance.betEnabled && PCPlaza.soundAddChips();
            }),
            (t.prototype.onMouseOverDBBankerTip = function() {
                this.bDBTip.visible = !0;
            }),
            (t.prototype.onMouseOutDBBankerTip = function() {
                this.bDBTip.visible = !1;
            }),
            (t.prototype.onMouseOverDBPlayerTip = function() {
                this.pDBTip.visible = !0;
            }),
            (t.prototype.onMouseOutDBPlayerTip = function() {
                this.pDBTip.visible = !1;
            }),
            (t.prototype.langChange = function() {
                var t = Core.LocalizeStore.instance.lang;
                null != this.pDBTip &&
                    (this.pDBTip.skinName =
                        'en' == t
                            ? 'GameBac.DBPlayerTipEnSkin'
                            : 'GameBac.DBPlayerTipSkin'),
                    null != this.bDBTip &&
                        (this.bDBTip.skinName =
                            'en' == t
                                ? 'GameBac.DBBankerTipEnSkin'
                                : 'GameBac.DBBankerTipSkin');
            }),
            t
        );
    })(Core.StoreView);
    (m.BetTable = t), __reflect(t.prototype, 'GameBac.BetTable');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(o) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.childrenCreated = function() {
                var t = this;
                (this.hasDragonBonus = VideoGameCore.PCGameConfig.instance.checkDragonBonus(
                    o.BetTableStore.instance.vid
                )),
                    (this.hasPairs = VideoGameCore.PCGameConfig.instance.checkPairs(
                        o.BetTableStore.instance.vid
                    )),
                    (this.hasSuperSix = VideoGameCore.PCGameConfig.instance.checkSuperSix(
                        o.BetTableStore.instance.vid
                    )),
                    this.updateNoCommBtnState(),
                    VideoGameCore.PCGameConfig.instance.checkNoCommToggleSwitch()
                        ? this.noCommBtn.setClickCallback(function() {
                              (o.BetTableStore.instance.noComm = !o
                                  .BetTableStore.instance.noComm),
                                  t.updateNoCommBtnState();
                          })
                        : (this.noCommBtn.visible = !1),
                    this.hasDragonBonus &&
                        (this.hasPairs || (this.currentState = 'db'),
                        mouse.setButtonMode(this.bDBBtn, !0),
                        mouse.setButtonMode(this.pDBBtn, !0),
                        this.bDBBtn.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouse,
                            this
                        ),
                        this.bDBBtn.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouse,
                            this
                        ),
                        this.pDBBtn.addEventListener(
                            mouse.MouseEvent.MOUSE_OVER,
                            this.onMouse,
                            this
                        ),
                        this.pDBBtn.addEventListener(
                            mouse.MouseEvent.MOUSE_OUT,
                            this.onMouse,
                            this
                        )),
                    this.onLangChangeHandler(),
                    this.btnBetSetA.setShowType(
                        PCPlaza.BetButtonBase.SHOW_ON_CONFIRM_ENABLED
                    ),
                    this.btnBetSetA.setButtonVisible(
                        PCPlaza.BetButtonBase.BUTTON_CANCEL_ID,
                        !1
                    ),
                    this.btnBetSetA.setButtonVisible(
                        PCPlaza.BetButtonBase.BUTTON_REPEAT_ID,
                        !1
                    );
            }),
            (e.prototype.getStoreList = function() {
                return [
                    o.BetTableStore.instance,
                    o.RoomTimerStore.instance,
                    Core.LocalizeStore.instance
                ];
            }),
            (e.prototype.onStoreChange = function(t, e, i) {
                switch (e) {
                    case Core.t:
                        this.updateBigSmallText();
                        break;
                    case VideoGameCore.k:
                        null != i &&
                            null != i.seatNum &&
                            null != i.payouts &&
                            VideoGameCore.isValidSeatNum(i.seatNum) &&
                            this.showPayout(i.seatNum, i.payouts);
                        break;
                    case VideoGameCore.n:
                    case VideoGameCore.o:
                        this.soundAddChip();
                    case VideoGameCore.Z:
                    case VideoGameCore.Y:
                    case VideoGameCore.G:
                    case VideoGameCore.r:
                    case VideoGameCore.f:
                        this.noCommBtn.visible =
                            VideoGameCore.PCGameConfig.instance.checkNoCommToggleSwitch() &&
                            o.BetTableStore.instance.commToggleEnabled &&
                            o.BetTableStore.instance.betEnabled;
                        break;
                    case Core.q:
                        this.onLangChangeHandler();
                }
            }),
            (e.prototype.onLangChangeHandler = function() {
                if (
                    -1 ==
                    ['en', 'hant', 'hans'].indexOf(
                        Core.LocalizeStore.instance.lang
                    )
                ) {
                    var t = this.getBetPartByType(14);
                    t && ((t.textImg.height = 24), (t.textImg.width = 237));
                    var e = this.getBetPartByType(6);
                    e && ((e.textImg.height = 28), (e.textImg.width = 130));
                    var i = this.getBetPartByType(7);
                    i && ((i.textImg.height = 26), (i.textImg.width = 168)),
                        this.updateBigSmallText();
                }
            }),
            (e.prototype.updateBigSmallText = function() {
                var t = this.getBetPartByType(6);
                t && (t.textImg.localeName = 'big_drangon');
                var e = this.getBetPartByType(7);
                e && (e.textImg.localeName = 'small_drangon');
            }),
            (e.prototype.showPayout = function(s, t) {
                var n = this;
                t.forEach(function(t) {
                    var e = o.BetTableStore.instance.getRealPlaytype(
                            t.playtype
                        ),
                        i = n.getBetPartByType(e);
                    if (!i)
                        return void console.warn(
                            'BetPartView for playtype:' + e + ' does not exist!'
                        );
                    var r = i.getChipHolderBySeat(s);
                    r && r.numChildren > 0 && n.showSinglePayout(s, t, r);
                }, this);
            }),
            (e.prototype.showSinglePayout = function(e, t, i) {
                var r = this,
                    s = i.getChildAt(0);
                if (t.value > 0) {
                    var n = new PCPlaza.ChipHeap(VideoGameCore.GAME_BAC);
                    n.setAmount(t.value),
                        this.dealerChipHolder.addChild(n),
                        this.tweenChipToGrp(n, i, -70, -18)
                            .wait(500)
                            .call(function() {
                                var t = r.getSeatChipHolder(e);
                                r.dismissChipToGrp(n, t, -70, -18),
                                    r.dismissChipToGrp(s, t);
                            }, this);
                } else if (0 === t.value) {
                    var o = this.getSeatChipHolder(e);
                    this.dismissChipToGrp(s, o);
                } else this.dismissChipToGrp(s, this.dealerChipHolder);
            }),
            (e.prototype.tweenChipToGrp = function(t, e, i, r) {
                void 0 === i && (i = 0), void 0 === r && (r = 0);
                var s;
                return (
                    t.parent === e
                        ? (s = new egret.Point(0, 0))
                        : ((s = e.parent.localToGlobal(e.x, e.y)),
                          (s = t.parent.globalToLocal(s.x, s.y))),
                    egret.Tween.get(t).to(
                        { x: s.x + i, y: s.y + r },
                        VideoGameCore.TIMEOUT.TWEEN,
                        egret.Ease.cubicOut
                    )
                );
            }),
            (e.prototype.dismissChipToGrp = function(t, e, i, r) {
                return (
                    void 0 === i && (i = 0),
                    void 0 === r && (r = 0),
                    t && t.stage
                        ? void this.tweenChipToGrp(t, e, i, r)
                              .wait(500)
                              .call(function() {
                                  egret.Tween.removeTweens(t),
                                      t.parent && t.parent.removeChild(t);
                              }, this)
                        : void console.warn('chipHeap not on stage!')
                );
            }),
            (e.prototype.getSeatChipHolder = function(t) {
                return this.seatChipHolderGrp.getChildByName('player' + t);
            }),
            (e.prototype.getBetPartByType = function(t) {
                return this.betPartGrp.getChildByName('playType' + t);
            }),
            (e.prototype.onMouse = function(t) {
                var e = t.type === mouse.MouseEvent.MOUSE_OVER;
                t.currentTarget === this.bDBBtn
                    ? (this.bDBTip.visible = e)
                    : t.currentTarget === this.pDBBtn &&
                      (this.pDBTip.visible = e);
            }),
            (e.prototype.updateNoCommBtnState = function() {
                o.BetTableStore.instance.noComm
                    ? (this.hasPairs && this.hasSuperSix
                          ? (this.currentState = this.hasDragonBonus
                                ? 'db_ss'
                                : 'pair_ss')
                          : this.hasPairs && !this.hasSuperSix
                              ? (this.currentState = this.hasDragonBonus
                                    ? 'db'
                                    : 'normal')
                              : !this.hasPairs && this.hasSuperSix
                                  ? (this.currentState = this.hasDragonBonus
                                        ? 'db_ss'
                                        : 'ss')
                                  : (this.currentState = this.hasDragonBonus
                                        ? 'db'
                                        : 'normal'),
                      this.noCommBtn.changeState('upAndSelected'),
                      (this.getBetPartByType(
                          VideoGameCore.PLAYTYPE_BANKER
                      ).textImg.localeName = 'banker_1'))
                    : (this.hasPairs
                          ? (this.currentState = this.hasDragonBonus
                                ? 'db'
                                : 'normal')
                          : (this.currentState = this.hasDragonBonus
                                ? 'db'
                                : 'normal'),
                      this.noCommBtn.changeState('up'),
                      (this.getBetPartByType(
                          VideoGameCore.PLAYTYPE_BANKER
                      ).textImg.localeName = 'banker')),
                    (this.noCommBar.visible = o.BetTableStore.instance.noComm);
            }),
            (e.prototype.soundAddChip = function() {
                o.BetTableStore.instance.betEnabled && PCPlaza.soundAddChips();
            }),
            e
        );
    })(Core.StoreView);
    (o.BetTableView = t), __reflect(t.prototype, 'GameBac.BetTableView');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(n) {
    var t = (function(t) {
        function e() {
            return t.call(this) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.soundSupplement = function(t) {
                n.soundSupplement(t);
            }),
            (e.prototype.soundScore = function(t, e) {
                n.soundScore(t, e);
            }),
            (e.prototype.soundGameResult = function(t, e, i, r, s) {
                n.soundGameResult(t, e, i, r, s);
            }),
            (e.prototype.getPokerStore = function() {
                return VideoGameCore.PokerStore.instance;
            }),
            (e.prototype.getStoreList = function() {
                return [n.RoomTimerStore.instance, n.PokerStore.instance];
            }),
            e
        );
    })(PCPlaza.GameCardBase);
    (n.GameCard = t), __reflect(t.prototype, 'GameBac.GameCard');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(i) {
    var t = (function(t) {
        function e() {
            return t.call(this) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.getTableCode = function() {
                return i.BacStore.instance.tableCode;
            }),
            (e.prototype.getVid = function() {
                return i.RoomTimerStore.instance.vid;
            }),
            (e.prototype.getOverallLimitPlaytype = function() {
                return VideoGameCore.PLAYTYPE_BANKER;
            }),
            (e.prototype.getRoomTimerStore = function() {
                return i.RoomTimerStore.instance;
            }),
            (e.prototype.getBetTableStore = function() {
                return i.BetTableStore.instance;
            }),
            (e.prototype.createLimitData = function() {
                return VideoGameCore.PCGameConfig.instance.checkPairs(
                    i.BetTableStore.instance.vid
                )
                    ? [
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.banker',
                              '',
                              VideoGameCore.PLAYTYPE_BANKER
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.player',
                              '',
                              VideoGameCore.PLAYTYPE_PLAYER
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.tie',
                              '',
                              VideoGameCore.PLAYTYPE_TIE
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.b_pair',
                              '',
                              VideoGameCore.PLAYTYPE_BANKER_PAIR
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.p_pair',
                              '',
                              VideoGameCore.PLAYTYPE_PLAYER_PAIR
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.big',
                              '',
                              VideoGameCore.PLAYTYPE_BIG
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.small',
                              '',
                              VideoGameCore.PLAYTYPE_SMALL
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.b_bonus',
                              '',
                              VideoGameCore.PLAYTYPE_BANKER_DRAGON_BONUS
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.p_bonus',
                              '',
                              VideoGameCore.PLAYTYPE_PLAYER_DRAGON_BONUS
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.super_six',
                              '',
                              VideoGameCore.PLAYTYPE_SUPER_SIX
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.any_pair',
                              '',
                              VideoGameCore.PLAYTYPE_ANY_PAIR
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.perfect_pair',
                              '',
                              VideoGameCore.PLAYTYPE_PERFECT_PAIR
                          )
                      ]
                    : [
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.banker',
                              '',
                              VideoGameCore.PLAYTYPE_BANKER
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.player',
                              '',
                              VideoGameCore.PLAYTYPE_PLAYER
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.tie',
                              '',
                              VideoGameCore.PLAYTYPE_TIE
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.b_pair',
                              '',
                              VideoGameCore.PLAYTYPE_BANKER_PAIR
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.p_pair',
                              '',
                              VideoGameCore.PLAYTYPE_PLAYER_PAIR
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.big',
                              '',
                              VideoGameCore.PLAYTYPE_BIG
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.small',
                              '',
                              VideoGameCore.PLAYTYPE_SMALL
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.b_bonus',
                              '',
                              VideoGameCore.PLAYTYPE_BANKER_DRAGON_BONUS
                          ),
                          new PCPlaza.GameInfoView.BetLimitInfo(
                              'GameBac.info.p_bonus',
                              '',
                              VideoGameCore.PLAYTYPE_PLAYER_DRAGON_BONUS
                          )
                      ];
            }),
            e
        );
    })(PCPlaza.GameInfoViewBase);
    (i.GameInfoView = t), __reflect(t.prototype, 'GameBac.GameInfoView');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(i) {
    var t = (function(t) {
        function e() {
            return t.call(this) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.createInfoPanel = function() {
                var t = new PCPlaza.GameInfoPanel(
                    this.parent,
                    'GameBac.gametype'
                );
                return t.setInfoView(new i.GameInfoView()), t;
            }),
            e
        );
    })(PCPlaza.GameNavBarBase);
    (i.GameNavBar = t), __reflect(t.prototype, 'GameBac.GameNavBar');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(c) {
    var t = (function(u) {
        function t() {
            var t = u.call(this) || this;
            return (
                (t.skinName = 'GameBac.GamePageSkin'),
                VideoGameCore.PCGameConfig.instance.checkPairs(
                    c.BetTableStore.instance.vid
                ) && (t.betTable.skinName = 'GameBac.BetTablePairSkin'),
                (t.potInfo.skinName = 'GameBac.PotInfoDBViewSkin'),
                (t.flowNotifyView = new PCPlaza.FlowNotifyView(t)),
                (t.warnNotifyView = new PCPlaza.WarnNotifyView(t)),
                (t.maintainPopup = new PCPlaza.MaintainPopup(t)),
                (t.videoPanelHolder.mask = t.videoMask),
                t.configPanels(),
                t.initVideo(),
                t
            );
        }
        return (
            __extends(t, u),
            (t.prototype.initVideo = function() {
                (this.videoPanel = new PCPlaza.GameVideoPanel(
                    'GameBac.GameVideoPanelSkin'
                )),
                    (this.videoPanel.width = 1780),
                    (this.videoPanel.height = 1001),
                    this.videoPanelHolder.addChild(this.videoPanel);
            }),
            (t.prototype.configPanels = function() {
                var t = VideoGameCore.PCPlazaConfig.instance.canChat,
                    e = VideoGameCore.PCGameConfig.instance.goodRoadEnable(
                        Core.LoginStore.instance.loginName
                    );
                this.goodRoadPanel &&
                    (this.goodRoadPanel.visible =
                        e && Core.getBrowser() != Core.BROWSER_IE),
                    this.videoBetPanel && (this.videoBetPanel.visible = !t),
                    this.videoControlPanel &&
                        (this.videoControlPanel.visible = t),
                    this.chatPanel && (this.chatPanel.visible = t),
                    !this.roadMapPanel ||
                        (e && Core.getBrowser() != Core.BROWSER_IE) ||
                        (this.roadMapPanel.skinName =
                            'PCPlaza.BacRoadMapPanelLongSkin');
            }),
            (t.prototype.getStoreList = function() {
                return u.prototype.getStoreList
                    .call(this)
                    .concat([
                        c.BacStore.instance,
                        c.BetTableStore.instance,
                        c.RoomTimerStore.instance
                    ]);
            }),
            (t.prototype.killGameSocket = function() {
                c.GameSocket.instance.killSocket();
            }),
            (t.prototype.showLocalizeNotify = function(t) {
                this.flowNotifyView.showMsgKey(t);
            }),
            (t.prototype.showNotify = function(t) {
                this.flowNotifyView.showMsg(t);
            }),
            (t.prototype.onStoreChange = function(t, e, i) {
                switch ((u.prototype.onStoreChange.call(this, t, e, i), e)) {
                    case Core.t:
                        c.soundWelcome(),
                            PCPlaza.RootPageStore.instance.isChatEnabled &&
                                this.chatPanel.allowChat();
                        break;
                    case VideoGameCore.de:
                        2 === c.BacStore.instance.loginType &&
                            c.soundSeat(c.BacStore.instance.seat);
                        break;
                    case VideoGameCore.Z:
                        this.showLocalizeNotify('PCPlaza.notice.please_bet'),
                            c.soundPleaseBet();
                        break;
                    case VideoGameCore.w:
                        this.showLocalizeNotify('PCPlaza.notice.stop_bet'),
                            c.soundStopBet();
                        break;
                    case VideoGameCore.i:
                        this.warnNotifyView.showMsgKey(
                            'PCPlaza.notice.over_balance'
                        );
                        break;
                    case VideoGameCore.r:
                        this.warnNotifyView.showMsgKey(
                            'PCPlaza.notice.bet_over_limit2',
                            2e3,
                            !0
                        );
                        break;
                    case VideoGameCore.s:
                        this.warnNotifyView.showMsgKey(
                            'PCPlaza.notice.last_bet'
                        );
                        break;
                    case VideoGameCore.v:
                        var r = Core.LocalizeStore.instance.translate(
                            'PCPlaza.error.msg_' + i.toString()
                        );
                        this.showNotify(
                            Core.LocalizeStore.instance.translate(
                                'PCPlaza.notice.bet_fail'
                            ) +
                                '\n' +
                                r
                        );
                        break;
                    case VideoGameCore.G:
                        i &&
                            (c.soundBetSuccess(),
                            this.showLocalizeNotify(
                                'PCPlaza.notice.bet_success'
                            ),
                            PCPlaza.RootPageStore.instance.isChatEnabled ||
                                ((PCPlaza.RootPageStore.instance.isChatEnabled = !0),
                                this.chatPanel.allowChat()));
                        break;
                    case Core.l:
                        this.showLocalizeNotify('PCPlaza.notice.network_error');
                        break;
                    case VideoGameCore.g:
                        var s = i;
                        if (Math.abs(s) >= 0) {
                            s > 0 && PCPlaza.soundWin();
                            var n =
                                Core.LocalizeStore.instance.translate(
                                    s >= 0
                                        ? 'PCPlaza.notice.you_win'
                                        : 'PCPlaza.notice.you_lose'
                                ) + Math.abs(s);
                            this.showNotify(n);
                        }
                        break;
                    case VideoGameCore.kn:
                        var o = Core.LocalizeStore.instance.substitute(
                            'PCPlaza.common.no_bet_warn',
                            i
                        );
                        this.warnNotifyView.showMsg(
                            o,
                            PCPlaza.NO_BET_WARN_TIMEOUT
                        );
                        break;
                    case VideoGameCore.wn:
                        PCPlaza.RootPageStore.instance.backLobby();
                        break;
                    case VideoGameCore.Rn:
                        var a = i;
                        if (
                            -1 !=
                            VideoGameCore.PCGameConfig.instance.tipsConfig.indexOf(
                                VideoGameCore.GAME_BAC
                            )
                        ) {
                            var h = Core.LocalizeStore.instance.substitute(
                                'PCPlaza.tips.dealer_tips',
                                Core.getAnonymousName(a.userName, a.userName),
                                Core.getStringFixed2(
                                    VideoGameCore.convertToMyCurrency(
                                        a.amount / a.currencyRate
                                    )
                                ),
                                Core.LocalizeStore.instance.translate(
                                    0 === a.seqNo
                                        ? 'PCPlaza.tips.anchor'
                                        : 'PCPlaza.tips.dealer'
                                )
                            );
                            this.showNotify(h);
                        }
                        break;
                    case VideoGameCore.st:
                        this.updateRoomStatus();
                }
            }),
            (t.prototype.updateRoomStatus = function() {
                var t = c.BacStore.instance.vid,
                    e = VideoGameCore.RoomConfig.instance.getRoomInfoByVid(t),
                    i = VideoGameCore.VideoPlazaStore.instance.getMaintainingStatus(
                        e.platformtype,
                        t
                    ),
                    r = VideoGameCore.VideoPlazaStore.instance.getPlazaMtStatus(
                        e.platformtype
                    );
                i && 0 == r.status && this.maintainPopup.show();
            }),
            t
        );
    })(VideoGameCore.PCGamePageBase);
    (c.GamePage = t), __reflect(t.prototype, 'GameBac.GamePage');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(i) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.getRoomTimerStore = function() {
                return i.RoomTimerStore.instance;
            }),
            (e.prototype.getStoreList = function() {
                return [i.RoomTimerStore.instance];
            }),
            e
        );
    })(PCPlaza.RoomTimerBase);
    (i.RoomTimer = t), __reflect(t.prototype, 'GameBac.RoomTimer');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(o) {
    var t = (function(e) {
        function t() {
            var t = e.call(this) || this;
            return (
                (t.skinName = 'GameBac.PotInfoDBViewSkin'), t.updateText(), t
            );
        }
        return (
            __extends(t, e),
            (t.prototype.getStoreList = function() {
                return [
                    VideoGameCore.PlazaRoadStore.instance,
                    VideoGameCore.RoomTimerStore.instance
                ];
            }),
            (t.prototype.getVid = function() {
                return o.BacStore.instance.vid;
            }),
            (t.prototype.childrenCreated = function() {
                e.prototype.childrenCreated.call(this), this.checkHidden();
            }),
            (t.prototype.checkHidden = function() {
                o.BetTableStore.instance.isDB ||
                    (this.L_bBonusLabel.parent &&
                        this.L_bBonusLabel.parent.removeChild(
                            this.L_bBonusLabel
                        ),
                    this.G_bBonusLabel.parent &&
                        this.G_bBonusLabel.parent.removeChild(
                            this.G_bBonusLabel
                        ),
                    this.L_pBonusLabel.parent &&
                        this.L_pBonusLabel.parent.removeChild(
                            this.L_pBonusLabel
                        ),
                    this.G_pBonusLabel.parent &&
                        this.G_pBonusLabel.parent.removeChild(
                            this.G_pBonusLabel
                        )),
                    o.BetTableStore.instance.isPair ||
                        (this.L_SuperSix.parent &&
                            this.L_SuperSix.parent.removeChild(this.L_SuperSix),
                        this.G_SuperSix.parent &&
                            this.G_SuperSix.parent.removeChild(this.G_SuperSix),
                        this.L_AnyPair.parent &&
                            this.L_AnyPair.parent.removeChild(this.L_AnyPair),
                        this.G_AnyPair.parent &&
                            this.G_AnyPair.parent.removeChild(this.G_AnyPair),
                        this.L_PrefectPair.parent &&
                            this.L_PrefectPair.parent.removeChild(
                                this.L_PrefectPair
                            ),
                        this.G_PrefectPair.parent &&
                            this.G_PrefectPair.parent.removeChild(
                                this.G_PrefectPair
                            ));
            }),
            (t.prototype.updateText = function() {
                var t = VideoGameCore.PlazaRoadStore.instance.getRealtimeInfoExt(
                    this.getVid()
                );
                if (null != t) {
                    var e,
                        i = t.betInfoMap,
                        r = [];
                    if (
                        ((e = i.get(VideoGameCore.PLAYTYPE_BANKER)),
                        (this.bankerLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        (r[0] = e),
                        (e = i.get(VideoGameCore.PLAYTYPE_PLAYER)),
                        (this.playerLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        (r[1] = e),
                        (e = i.get(VideoGameCore.PLAYTYPE_TIE)),
                        (this.tieLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        (r[2] = e),
                        (e = i.get(VideoGameCore.PLAYTYPE_BIG)),
                        (this.bigLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        (e = i.get(VideoGameCore.PLAYTYPE_SMALL)),
                        (this.smallLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        (e = i.get(VideoGameCore.PLAYTYPE_BANKER_PAIR)),
                        (this.bPairLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        (e = i.get(VideoGameCore.PLAYTYPE_PLAYER_PAIR)),
                        (this.pPairLabel.localeKey = t
                            ? Core.getStringFixed2WithComma(
                                  e.total_jetton_cny
                              ) +
                              '/' +
                              e.total_player
                            : '0/0'),
                        o.BetTableStore.instance.isDB &&
                            this.bBonusLabel &&
                            ((e = i.get(
                                VideoGameCore.PLAYTYPE_BANKER_DRAGON_BONUS
                            )),
                            (this.bBonusLabel.localeKey = t
                                ? Core.getStringFixed2WithComma(
                                      e.total_jetton_cny
                                  ) +
                                  '/' +
                                  e.total_player
                                : '0/0')),
                        o.BetTableStore.instance.isDB &&
                            this.pBonusLabel &&
                            ((e = i.get(
                                VideoGameCore.PLAYTYPE_PLAYER_DRAGON_BONUS
                            )),
                            (this.pBonusLabel.localeKey = t
                                ? Core.getStringFixed2WithComma(
                                      e.total_jetton_cny
                                  ) +
                                  '/' +
                                  e.total_player
                                : '0/0')),
                        o.BetTableStore.instance.isPair &&
                            this.SuperSix &&
                            ((e = i.get(VideoGameCore.PLAYTYPE_SUPER_SIX)),
                            (this.SuperSix.localeKey = t
                                ? Core.getStringFixed2WithComma(
                                      e.total_jetton_cny
                                  ) +
                                  '/' +
                                  e.total_player
                                : '0/0')),
                        o.BetTableStore.instance.isPair &&
                            this.AnyPair &&
                            ((e = i.get(VideoGameCore.PLAYTYPE_ANY_PAIR)),
                            (this.AnyPair.localeKey = t
                                ? Core.getStringFixed2WithComma(
                                      e.total_jetton_cny
                                  ) +
                                  '/' +
                                  e.total_player
                                : '0/0')),
                        o.BetTableStore.instance.isPair &&
                            this.PrefectPair &&
                            ((e = i.get(VideoGameCore.PLAYTYPE_PERFECT_PAIR)),
                            (this.PrefectPair.localeKey = t
                                ? Core.getStringFixed2WithComma(
                                      e.total_jetton_cny
                                  ) +
                                  '/' +
                                  e.total_player
                                : '0/0')),
                        t &&
                            VideoGameCore.PCGameConfig.instance.statConfig
                                .showBetPool)
                    ) {
                        var s =
                                r[0].total_jetton_cny +
                                    r[1].total_jetton_cny +
                                    r[2].total_jetton_cny ===
                                0
                                    ? 1
                                    : r[0].total_jetton_cny +
                                      r[1].total_jetton_cny +
                                      r[2].total_jetton_cny,
                            n = Math.floor((100 * r[0].total_jetton_cny) / s);
                        n > 0 && 5 > n && (n = 5),
                            (this.bankerRect.percentWidth = n),
                            (n = Math.floor((100 * r[1].total_jetton_cny) / s)),
                            n > 0 && 5 > n && (n = 5),
                            (this.playerRect.percentWidth = n),
                            (n = Math.floor((100 * r[2].total_jetton_cny) / s)),
                            n > 0 && 5 > n && (n = 5),
                            (this.tieRect.percentWidth = n);
                    } else
                        (this.bankerRect.percentWidth = 0),
                            (this.playerRect.percentWidth = 0),
                            (this.tieRect.percentWidth = 0);
                }
            }),
            t
        );
    })(PCPlaza.PotInfoViewBase);
    (o.PotInfoView = t), __reflect(t.prototype, 'GameBac.PotInfoView');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(i) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.getTableSeatStore = function() {
                return i.TableSeatStore.instance;
            }),
            (e.prototype.getStoreList = function() {
                return [i.TableSeatStore.instance];
            }),
            (e.prototype.showSeatIcon = function(t, e) {
                void 0 === e && (e = !0);
                var i = this['iconSeat' + t.toString()];
                null != i && (i.visible = e);
            }),
            (e.prototype.setSeatNick = function(t, e, i, r, s) {
                void 0 === e && (e = ''),
                    void 0 === i && (i = ''),
                    void 0 === r && (r = 0),
                    void 0 === s && (s = !1);
                var n = this['txtSeat' + t.toString()];
                null != n &&
                    ('' === e
                        ? (n.text = '')
                        : ((n.textFlow = [
                              {
                                  text: Core.getAnonymousName(e, i),
                                  style: {
                                      size: 20,
                                      textColor: s ? 16576828 : 16777215
                                  }
                              },
                              {
                                  text: ' (' + Core.getStringFixed2(r) + ')',
                                  style: { size: 19, textColor: 16756224 }
                              }
                          ]),
                          (n.verticalAlign = egret.VerticalAlign.BOTTOM),
                          (n.textAlign = egret.HorizontalAlign.CENTER),
                          (n.filters = [
                              new egret.DropShadowFilter(3, 60, 0, 1, 2, 2)
                          ])));
            }),
            (e.prototype.setCurrencyFlag = function(t, e) {
                var i = this['chipFlag' + t.toString()];
                null != i &&
                    ((i.visible =
                        e &&
                        '' != e &&
                        e !=
                            VideoGameCore.VideoPlazaStore.instance
                                .currencyCode &&
                        VideoGameCore.PCPlazaConfig.instance
                            .showInGameInfoCurrency),
                    i.visible
                        ? (i.source = 'chip_json.chip_flag_' + e)
                        : (i.source = null));
            }),
            e
        );
    })(PCPlaza.TableSeatBase);
    (i.TableSeat = t), __reflect(t.prototype, 'GameBac.TableSeat');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(n) {
    var t = (function(t) {
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            __extends(e, t),
            (e.prototype.getGameStore = function() {
                return n.BacStore.instance;
            }),
            (e.prototype.getVisable = function() {
                return (
                    -1 !=
                    VideoGameCore.PCGameConfig.instance.tipsConfig.indexOf(
                        VideoGameCore.GAME_BAC
                    )
                );
            }),
            (e.prototype.getVid = function() {
                return n.BacStore.instance.vid;
            }),
            (e.prototype.sendFeeForDealer = function(t, e) {
                n.BacStore.instance.sendFeeForDealer(t, e);
            }),
            (e.prototype.requestTipsList = function(t, e, i, r, s) {
                n.BacStore.instance.requestTipsList(t, e, i, r, s);
            }),
            e
        );
    })(PCPlaza.TipsPanelBase);
    (n.TipsPanel = t), __reflect(t.prototype, 'GameBac.TipsPanel');
})(GameBac || (GameBac = {}));
var GameBac;
!(function(t) {
    var e = (function(i) {
        function t() {
            var t = i.call(this) || this;
            return (
                (t.skinName = 'GameBac.VideoBetPanelSkin'),
                t.betButtons.setShowType(PCPlaza.BetButtonBase.SHOW_ALWAYS),
                t
            );
        }
        return (
            __extends(t, i),
            (t.prototype.partAdded = function(t, e) {
                i.prototype.partAdded.call(this, t, e);
            }),
            (t.prototype.childrenCreated = function() {
                i.prototype.childrenCreated.call(this);
            }),
            t
        );
    })(eui.Component);
    (t.VideoBetPanel = e),
        __reflect(e.prototype, 'GameBac.VideoBetPanel', [
            'eui.UIComponent',
            'egret.DisplayObject'
        ]);
})(GameBac || (GameBac = {}));
