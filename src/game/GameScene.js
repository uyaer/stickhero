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
     * @type Array
     */
    boxArr: null,
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

    ctor: function () {
        this._super();

        GameManager.instance.score = 0;

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

    },

    onTouchBeganHandler: function (touch, event) {
        if (GameManager.instance.state == GameState.PLAYING) {
            //this.rope.x =

            return true;
        }
        return false;
    },

    onTouchEndedHandler: function (touch, event) {

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
        this.rope = rope;
    },

    makeFloor: function (w) {
        //是否是第一个地面
        var isFirst = false;
        if (w)isFirst = true;
        w = w || this.randomFloorWidth();
        this.currFloor = this.nextFloor;
        this.nextFloor = new Floor(w);
        this.distance = randomFloat(0.25, 0.5) * Const.WIN_W;

        this.addChild(this.nextFloor, 10);

        if (isFirst) {
            this.nextFloor.x = (Const.WIN_W - w) / 2;
        } else {
            this.moveCurrFloor();
            this.moveNextFloor();
        }
    },

    /**
     * 随机出地面的宽度
     * @returns {*}
     */
    randomFloorWidth: function () {
        var max = GameManager.instance.score || 1;
        max = Math.sqrt(Math.sqrt(1 / max));
        var min = max / 2;

        min *= Const.WIN_W / 2;
        max *= Const.WIN_W / 2;
        return randomInt(min, max);
    },

    /**
     * 移动当前界面
     */
    moveCurrFloor: function () {
        this.currFloorWillMovePosX = Const.WIN_W * 0.2 - this.currFloor.floorWidth / 2;
        var dis = this.currFloorWillMovePosX - this.currFloor.x;
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
        this.nextFloor.runAction(cc.moveTo(Const.FLOOR_MOVE_TIME, dis, 0));
    }

})