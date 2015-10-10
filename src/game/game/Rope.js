var Rope = cc.Node.extend({
    /**
     * ���ӿ��
     */
    ropeLength: 0,
    /**
     * @type cc.Sprite
     */
    sp: null,
    ctor: function () {
        this._super();

        var sp = new cc.Sprite("#common/rope.png");
        sp.anchorY = 0;
        this.addChild(sp);
        this.sp = sp;
    },

    updateRopLength: function (len) {
        this.ropeLength = len;

        this.sp.scaleY = len/800;
    }
})