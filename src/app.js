//////////////////////////////////////
///////////////  plus ///////////////////////
////////////////         //////////////////////
/////////////////             /////////////////////
var App = {};
App.__android_class = "org/cocos2dx/javascript/AppActivity";

/**
 * 检查签名是否被篡改
 * @returns {boolean}
 */
App.checkAppVertify = function () {
    if (cc.sys.isNative && cc.sys.isMobile) {
        var uri = jsb.reflection.callStaticMethod(App.__android_class, "getPackageURI", "()Ljava/lang/String;");
        if (uri == "com.uyaer.stickhero") {
            return true;
        }
        return false;
    } else {
        return true;
    }
}

/**
 * 向android端发送请求关闭
 */
App.showConfirmClose = function () {
    jsb.reflection.callStaticMethod(App.__android_class, "confirmClose", "()V");
}
/**
 * 关闭应用
 */
App.closeApp = function () {
    cc.director.end();
}

App.showShare = function () {
    var lang = Const.LANG;

    var url = "http://uyaer.qiniudn.com/share.html?lang=" + lang +
        "&icon=_games/stickhero/icon512.png" +
        "&name=" + (lang == "zh" ? "棍子英雄" : "stick hero") +
        "&pic=http://uyaer.qiniudn.com/images/9.png" +
        "&title=" + (lang == "zh" ? "很好玩的游戏" : "A fun game with you!") +
        "&desc=" + (lang == "zh" ? "棍子英雄，测试你的掌控力和节奏感" : "Stick hero! very fun oh!") +
        "&r=" + Date.now() +
        "&url=http://uyaer.qiniudn.com/?v" + Date.now() + (lang == "zh" ? "#game-9" : "#game-10");

    App.openURL(url);
}

App.openURL = function (url) {
    if (cc.sys.isNative) {
        jsb.reflection.callStaticMethod(App.__android_class, "openURL", "(Ljava/lang/String;)V", url);
    } else {
        window.open(url);
    }
}

App.goHome = function () {
    App.openURL("http://www.uyaer.com");
}

App.showCpAd = function () {

}