var IndexScene = cc.Scene.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    /**
     * @type ccui.Button
     */
    playBtn: null,
    /**
     * @type ccui.Button
     */
    musicBtn: null,
    /**
     * @type ccui.Button
     */
    infoBtn: null,
    /**
     * @type ccui.TextBMFont
     */
    hiscoreTF: null,
    /**
     * 开始按钮动画的弧度
     */
    playBtnAnimRadius: 0,
    /**
     * 开始按钮原始位置
     * @type cc.Point
     */
    playBtnOriginalPosY: null,
    ctor: function () {
        this._super();

        var scene = ccs.load(res.scene_index);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);
        doLayout(this.mainNode);

        this.playBtn = seekChildByName(this.mainNode, "playBtn");
        this.musicBtn = seekChildByName(this.mainNode, "musicBtn");
        this.infoBtn = seekChildByName(this.mainNode, "infoBtn");
        this.hiscoreTF = seekChildByName(this.mainNode, "hiscoreTF");

        this.playBtnOriginalPosY = this.playBtn.y;

        //music
        //AudioManager.instance.playBgSound();
    },

    onEnter: function () {
        this._super();

        this.scheduleUpdate();

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

    onKeyClicked: function (code) {
        if (code == cc.KEY.back) {
            App.showConfirmClose();
        }
    },

    update: function (dt) {
        this.playBtnAnimRadius += 0.05;

        this.playBtn.y = int(this.playBtnOriginalPosY + 30 * Math.sin(this.playBtnAnimRadius))+0.5;
    }
});

IndexScene.isFirstEnter = true;