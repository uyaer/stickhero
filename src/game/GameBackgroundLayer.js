var GameBackgroundLayer = cc.Scene.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    /**
     * @type ccui.Button
     */
    musicBtn: null,
    /**
     * @type ccui.Button
     */
    backBtn: null,
    /**
     * @type ccui.TextBMFont
     */
    scoreTF: null,
    ctor: function () {
        this._super();

        var scene = ccs.load(res.scene_game);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);
        doLayout(this.mainNode);

        addButtonsTouchEffect(["musicBtn", "backBtn"], this.mainNode);

        this.musicBtn = seekChildByName(this.mainNode, "musicBtn");
        this.backBtn = seekChildByName(this.mainNode, "backBtn");
        this.scoreTF = seekChildByName(this.mainNode, "scoreTF");

        //event
        this.musicBtn.addClickEventListener(this.onMusicBtnClick.bind(this));
        this.backBtn.addClickEventListener(this.onBackBtnClick.bind(this));
        this.musicShow();
    },

    onEnter: function () {
        this._super();

        //event
        if (cc.sys.isNative) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: this.onBackBtnClick.bind(this)
            }, this);
        }
    },

    /**
     * 更新分数显示
     */
    updateScoreShow: function () {
        this.scoreTF.string = GameManager.instance.score + "";
    },

    onMusicBtnClick: function () {
        AudioManager.instance.setIsAudio(!AudioManager.instance.getIsAudio());

        this.musicShow();
    },

    onBackBtnClick: function () {
        sm.runScene(IndexScene, hex2Color(0x2f79aa));
    },

    musicShow: function () {
        var uri = "common/music_on.png";
        if (!AudioManager.instance.getIsAudio()) {
            uri = "common/music_off.png";
        }
        this.musicBtn.loadTextures(uri, uri, uri, ccui.Widget.PLIST_TEXTURE);
    }
});