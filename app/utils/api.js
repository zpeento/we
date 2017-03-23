var Promise = require('../lib/es6-promise/es6-promise.min.js').Promise;

/**
 * 小程序对接后端API接口封装
 */
var config = {
    'host': '',
    'port': '',
    'base_url': '/index.php/',
    'api_map': {

        "msg": {
            "list" :"msg/list" // 宣讲会列表
        },
    }
};

var map = config.api_map;
var defaultPagesize = 10;

/**
 * 根据apiKey从api_map中选择接口构造链接
 *
 * @param api
 * @returns {string}
 */
function createUrl(api) {
    return 'https://' + config.host + ":" + config.port + config.base_url + api;
}

/**
 * 请求发送基础方法
 *
 * @param url
 * @param method
 * @param data
 * @returns {Promise}
 */
function send(url, method, data){
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            header: {'content-type': 'application/json'},
            method: method.toUpperCase(),
            success: function (res) {
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    });
}

module.exports = {

    'defaultPageSize' : defaultPagesize,

    "msg" : {

        /**
         * 获取宣讲会列表信息
         *
         * @param page
         * @param pagesize
         * @returns {Promise}
         */
        "list" : function(page, pagesize){
            var url = createUrl(map.msg.list);
            var method = "GET";
            var data = {};
            return send(url, method, data);
        }

    }

};