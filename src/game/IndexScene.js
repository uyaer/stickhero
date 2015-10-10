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

        this.hiscoreTF.string = "HI-SCORE:" + GameManager.instance.maxScore;
        this.playBtnOriginalPosY = this.playBtn.y;

        //event
        this.playBtn.addClickEventListener(this.onPlayBtnClick.bind(this));
        this.musicBtn.addClickEventListener(this.onMusicBtnClick.bind(this));
        this.infoBtn.addClickEventListener(this.onInfoBtnClick.bind(this));
        this.musicShow();

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

        this.playBtn.y = int(this.playBtnOriginalPosY + 30 * Math.sin(this.playBtnAnimRadius)) + 0.5;
    },

    onPlayBtnClick: function () {
        sm.runScene(GameScene, hex2Color(0x2f79aa));
    },

    onMusicBtnClick: function () {
        AudioManager.instance.setIsAudio(!AudioManager.instance.getIsAudio());

        this.musicShow();
    },

    onInfoBtnClick: function () {
        App.goHome();
    },

    musicShow: function () {
        var uri = "common/music_on.png";
        if (!AudioManager.instance.getIsAudio()) {
            uri = "common/music_off.png";
        }
        this.musicBtn.loadTextures(uri, uri, uri, ccui.Widget.PLIST_TEXTURE);
    }
});

IndexScene.isFirstEnter = true;