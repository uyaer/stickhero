var GameScene = cc.Scene.extend({
    /**
     * @type Player
     */
    player: null,
    /**
     * @type Rope
     */
    rope: null,
    /**
     * @type GameBackgroundLayer
     */
    uiLayer: null,
    /**
     * @type Floor
     */
    currFloor: null,
    /**
     * @type Floor
     */
    nextFloor: null,
    /**
     * 下次距离
     */
    distance: 0,
    /**
     * 第一个阶段地面会移动的距离
     */
    currFloorWillMovePosX: 0,

    /**
     * 木棍增长中
     */
    ropeAdding: false,
    /**
     * 木棍长度
     */
    ropeLen: 0,
    /**
     * rope是否太短
     */
    isTooShort: false,

    ctor: function () {
        this._super();

        GameManager.instance.score = 0;
        GameManager.instance.state = GameState.ANIMATING;

        //bg
        this.uiLayer = new GameBackgroundLayer();
        this.addChild(this.uiLayer);

        //rope
        this.makeRope();
        //player
        this.makePlayer();
        //floor
        this.makeFloor(200);
        setTimeout(this.makeFloor.bind(this), 500);

        //AudioManager.instance.playBgSound();
    },

    onEnter: function () {
        this._super();

        this.scheduleUpdate();

        //event
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBeganHandler.bind(this),
            onTouchEnded: this.onTouchEndedHandler.bind(this)
        }, this);
        //event
        if (cc.sys.isNative) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: this.onKeyClicked.bind(this)
            }, this);
        }
    },

    onExit: function () {
        this._super();

        this.unscheduleUpdate();
    },

    onTouchBeganHandler: function (touch, event) {
        if (GameManager.instance.state == GameState.PLAYING) {
            this.rope.x = this.player.x + 28;
            this.rope.rotation = 0;
            this.rope.visible = true;
            this.ropeLen = 0;
            this.ropeAdding = true;
            return true;
        }
        return false;
    },

    onTouchEndedHandler: function (touch, event) {
        this.ropeAdding = false;
        GameManager.instance.state = GameState.ANIMATING;
        this.ropeDown();
    },

    update: function (dt) {
        if (this.ropeAdding) {
            this.ropeLen += dt * 250;
            this.rope.updateRopLength(this.ropeLen);
        }
    },

    /**
     * 创建角色
     */
    makePlayer: function () {
        this.player = new Player();
        this.addChild(this.player, 12);
        this.player.x = Const.WIN_W / 2;
        this.player.y = 500;
    },

    /**
     * 创建木棍
     */
    makeRope: function () {
        var rope = new Rope();
        this.addChild(rope, 11);
        rope.y = 508;
        this.rope = rope;
    },

    makeFloor: function (w) {
        //是否是第一个地面
        var isFirst = false;
        if (w)isFirst = true;
        w = w || this.randomFloorWidth();
        var oldFloor = this.currFloor;
        this.currFloor = this.nextFloor;
        this.nextFloor = new Floor(w);
        this.distance = randomFloat(0.15, 0.55) * Const.WIN_W;

        this.addChild(this.nextFloor, 10);

        if (isFirst) {
            this.nextFloor.x = (Const.WIN_W - w) / 2;
        } else {
            this.moveCurrFloor();
            this.moveNextFloor();
            if (oldFloor) {
                oldFloor.runAction(cc.sequence(
                    cc.moveTo(0.2, -Const.WIN_W, 0),
                    cc.removeSelf()
                ))
            }
        }
    },

    /**
     * 随机出地面的宽度
     * @returns {*}
     */
    randomFloorWidth: function () {
        var max = GameManager.instance.score || 1;
        max = Math.sqrt(Math.sqrt(1 / max));
        var min = max / 4;

        min *= 200;
        max *= 200;
        return randomInt(min, max);
    },

    /**
     * 移动当前界面
     */
    moveCurrFloor: function () {
        this.currFloor.stopAllActions();
        var playerWillMovePosX = Const.WIN_W * 0.175;
        var dis = playerWillMovePosX - this.player.x;
        this.currFloorWillMovePosX = this.currFloor.x + dis;
        this.currFloor.runAction(cc.moveBy(Const.FLOOR_MOVE_TIME, dis, 0));
        // player move
        this.player.runAction(cc.moveBy(Const.FLOOR_MOVE_TIME, dis, 0));
    },

    /**
     * 移动下一个地面
     */
    moveNextFloor: function () {
        this.nextFloor.x = Const.WIN_W;
        var dis = this.currFloorWillMovePosX + this.currFloor.floorWidth + this.distance;
        this.nextFloor.runAction(cc.sequence(
            cc.moveTo(Const.FLOOR_MOVE_TIME, dis, 0),
            cc.callFunc(function () {
                GameManager.instance.state = GameState.PLAYING;
            }, this)
        ));
    },
    /**
     * 木棍倒下
     */
    ropeDown: function () {
        this.player.playDown();
        this.rope.runAction(cc.sequence(
            cc.rotateBy(0.2, 90),
            cc.callFunc(this.playerMoveToNextFloor, this)
        ))
    },
    /**
     * 玩家移动(下一个平台的左边)
     */
    playerMoveToNextFloor: function () {

        this.player.playRun();

        var min = this.nextFloor.x - this.player.x - 30;
        var max = min + this.nextFloor.floorWidth;
        if (this.rope.ropeLength < min || this.rope.ropeLength > max) { //失败的移动
            this.isTooShort = this.rope.ropeLength < min;
            var dis = this.rope.ropeLength;
            var time = dis / Const.PLAYER_MOVE_SPEED;
            this.player.runAction(cc.sequence(
                cc.moveBy(time, dis, 0),
                cc.callFunc(this.playerMoveToRopeEndAndDown, this)
            ));
        } else { ///成功的移动
            // 移动位置
            var dis = this.nextFloor.x + Math.min(30, this.nextFloor.floorWidth / 2) - this.player.x;
            var time = dis / Const.PLAYER_MOVE_SPEED;
            this.player.runAction(cc.sequence(
                cc.moveBy(time, dis, 0),
                cc.callFunc(this.playerMoveToNextFloorEnd, this)
            ));
        }
    },

    /**
     * 移动到绳子最右边，然后掉落
     */
    playerMoveToRopeEndAndDown: function () {
        if (this.isTooShort) {
            this.rope.runAction(cc.sequence(
                cc.rotateBy(0.15, 75),
                cc.hide()
            ))
        }
        this.player.runAction(cc.sequence(
            cc.moveBy(0.15, 50, -500),
            cc.removeSelf(),
            cc.callFunc(this.playerDownEndAndGameOver, this)
        ))
    },

    /**
     * 玩家跌落山崖，游戏结束
     */
    playerDownEndAndGameOver: function () {
        GameManager.instance.state = GameState.OVER;

        this.addChild(new GameOverLayer(), 100);

        if (GameManager.instance.score > 10) {
            App.showCpAd();
        }
    },

    /**
     * 移动到最右边
     */
    playerMoveToNextFloorEnd: function () {
        // 分数计算
        GameManager.instance.score++;
        this.uiLayer.updateScoreShow();
        if (GameManager.instance.score > GameManager.instance.maxScore) {
            GameManager.instance.maxScore = GameManager.instance.score;
            GameManager.instance.saveData();
        }

        this.rope.updateRopLength(0);
        // 移动距离
        var floorMoveDis = (Const.WIN_W / 2 - this.nextFloor.floorWidth / 2) - this.nextFloor.x;
        var playerEndPosX = Const.WIN_W / 2 + this.nextFloor.floorWidth / 2 - Math.min(30, this.nextFloor.floorWidth / 2);
        var dis = playerEndPosX - this.player.x;
        var time = Math.abs(dis / Const.PLAYER_MOVE_SPEED);
        this.player.runAction(cc.sequence(
            cc.moveBy(time, dis, 0),
            cc.callFunc(this.playerPassSuccess, this)
        ));

        this.nextFloor.runAction(cc.moveBy(time, floorMoveDis, 0));
        this.currFloor.runAction(cc.moveBy(time, floorMoveDis, 0));
    },
    /**
     * 玩家通过完成
     */
    playerPassSuccess: function () {

        this.player.playIdle();
        this.makeFloor();
    }

})