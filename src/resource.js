var res = {
    common_plist: "res/common.plist",
    common_png: "res/common.png",

    player_idle:"res/player/player_idle.png",
    player_run:"res/player/player_run.png",

    scene_index:"res/Index.json",
    scene_game:"res/GameBgLayer.json",
    layer_over:"res/GameOverLayer.json",



    logo: "res/logo/logo.png",
    logo_bg: "res/logo/logo_bg.png",
    logo_font: "res/logo/logo_font.png",
    logo_font_fnt: "res/logo/logo_font.fnt",
    logo_leaf: "res/logo/logo_leaf.png",
    logo_line: "res/logo/logo_line.png",
    logo_url: "res/logo/logo_url.png",
    logo_cir: "res/logo/logo_cir.png"

};

var g_logo = [
    res.logo,
    res.logo_bg,
    res.logo_font,
    res.logo_font_fnt,
    res.logo_leaf,
    res.logo_line,
    res.logo_cir,
    res.logo_url
];


var g_resources = [];
for (var i in res) {
    if (g_logo.indexOf(res[i]) == -1) {
        g_resources.push(res[i]);
    }
}
