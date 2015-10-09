var Rope = cc.Node.extend({
    /**
     * Éþ×Ó¿í¶È
     */
    ropeLength: 0,
    /**
     * @type cc.DrawNode
     */
    mask: null,
    ctor: function () {
        this._super();

        var clip = new cc.ClippingNode();
        clip.setAlphaThreshold(0);
        this.addChild(clip);

        var sp = new cc.Sprite("#common/rope.png");
        sp.anchorY = 0;
        clip.addChild(sp);

        this.mask = new cc.DrawNode();
        clip.stencil = this.mask;
    },

    updateRopLength: function (len) {
        this.ropeLength = len;

        this.mask.clear();
        this.mask.drawRect(cc.p(0, -10), cc.p(20, len), hex2Color(0x1), 0, hex2Color(0x1));
    }
})