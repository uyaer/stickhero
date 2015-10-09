var Floor = cc.Node.extend({
    /**
     * µØÃæ¿í¶È
     */
    floorWidth: 0,
    ctor: function (w) {
        this._super();

        this.floorWidth = w;

        var sp = new cc.Sprite("#common/floor.png");
        sp.anchorX = 0;
        sp.anchorY = 0;
        sp.scaleX = w / sp.width;
        this.addChild(sp);
    }
})