var GameManager = {};
GameManager.instance = {

    state: GameState.UN_START,
    /**
     * 当前关卡分数
     */
    score: 0,
    /**
     * 最大分数
     */
    maxScore: 0,

    /**
     * init data
     */
    init: function () {
        this.loadCfg();
        this.loadData();
    },

    loadCfg: function () {
        var str = cc.sys.localStorage.getItem(Const.STORE_CFG_KEY);
        if (str) {
            var json = JSON.parse(str);
            AudioManager.instance.setIsAudio(json["isAudio"]);
        }
    },
    saveCfg: function () {
        var data = {
            "isAudio": AudioManager.instance.getIsAudio()
        }
        cc.sys.localStorage.setItem(Const.STORE_CFG_KEY, JSON.stringify(data));
    },


    loadData: function () {
        var str = cc.sys.localStorage.getItem(Const.STORE_KEY);
        if (str) {
            var json = JSON.parse(str);
            var vertify1 = json["vertify"];
            var data = json["data"];
            str = JSON.stringify(data);
            var vertify2 = md5(str, Const.VERTIFY_KEY);
            if (vertify1 == vertify2) {
                this.maxScore = data["maxScore"] || 0;
            } else {
                this.useInitFullData();
            }
        } else {
            this.useInitFullData();
        }
    },

    /**
     * delay save id
     */
    _saveCfgDelayId: 0,
    /**
     *delay save count
     */
    _saveCfgDelayCount: 0,

    saveData: function () {
        this._saveCfgDelayCount++;
        clearTimeout(this._saveCfgDelayId);
        this._saveCfgDelayId = setTimeout(this._saveDataDelay.bind(this), 1000);
        //当大于10的时候才会保存
        if (this._saveCfgDelayCount > 10) {
            this._saveDataDelay();
        }
    },

    _saveDataDelay: function () {
        this._saveCfgDelayCount = 0;
        var data = {
            "maxScore": this.maxScore
        };
        var dataStr = JSON.stringify(data);
        var vertify = md5(dataStr, Const.VERTIFY_KEY);
        var game_data = {
            "vertify": vertify,
            "data": data
        }
        cc.sys.localStorage.setItem(Const.STORE_KEY, JSON.stringify(game_data));
    },

    /**
     * 默认值
     */
    useInitFullData: function () {
        this.maxScore = 0;
    }

};

this["GameManager"] = GameManager;