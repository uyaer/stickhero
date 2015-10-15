var Player = cc.Sprite.extend({
    ctor: function () {
        this._super();

        this.anchorY = 0;

        this.playIdle();
    },

    playIdle: function () {
        this.stopAllActions();

        this.runAction(cc.animate(cc.animationCache.getAnimation("idle")));
    },
    /**
     * 奔跑动画
     */
    playRun: function () {
        this.stopAllActions();

        this.runAction(cc.animate(cc.animationCache.getAnimation("run")));

        AudioManager.instance.playEffect(res.audio_run);
    },
    /**
     * 放下棍子
     */
    playDown: function () {
        this.stopAllActions();

        this.runAction(cc.animate(cc.animationCache.getAnimation("down")));
    }
})

Player.initSpriteFrame = function () {
    //idle
    var frameArr = [];
    for (var i = 0; i < 5; i++) {
        var row = int(i / 3);
        var col = i % 3;
        var texture = cc.textureCache.addImage(res.player_idle);
        var frame = new cc.SpriteFrame(texture, cc.rect(82 * col + 1, row * 110 + 1, 80, 108));
        cc.spriteFrameCache.addSpriteFrame(frame, "player_idle" + i);
        frameArr.push(frame);
    }

    cc.animationCache.addAnimation(new cc.Animation(frameArr, 0.2, 1000000000), "idle");

    //down
    var texture = cc.textureCache.addImage(res.player_idle);
    var frame = new cc.SpriteFrame(texture, cc.rect(165, 111, 80, 108));
    cc.spriteFrameCache.addSpriteFrame(frame, "player_down" + i);
    frameArr = [frame];
    cc.animationCache.addAnimation(new cc.Animation(frameArr, 0.2, 1000000000), "down");

    //run
    frameArr = [];
    for (var i = 0; i < 3; i++) {
        var texture = cc.textureCache.addImage(res.player_run);
        var frame = new cc.SpriteFrame(texture, cc.rect(82 * i + 1, 1, 80, 108));
        cc.spriteFrameCache.addSpriteFrame(frame, "player_run" + i);
        frameArr.push(frame);
    }

    cc.animationCache.addAnimation(new cc.Animation(frameArr, 0.2, 1000000000), "run");
}