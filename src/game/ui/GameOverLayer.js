var GameOverLayer = cc.Scene.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    ctor: function () {
        this._super();

        var scene = ccs.load(res.layer_over);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);
        doLayout(this.mainNode);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function () {
                sm.runScene(IndexScene, hex2Color(0x2f79aa));
                return true;
            }
        }, this);
    }

});