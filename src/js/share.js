import wx from 'weixin-js-sdk';

function shareContent() {

    var data = {
        title: "时光大厦建筑实录",
        desc: "一座时光大厦，带你回到过去 感恩有你，见证美好时光",
        link: "http://client.elloworld.cn/rongsheng35years",
        imgUrl: "http://client.elloworld.cn/rongsheng/img/logo.jpg"
    }

    console.log(data);


    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: ['getNetworkType', 'previewImage'],
            success: function (res) {
                console.log(JSON.stringify(res));
            }
        });

        wx.onMenuShareTimeline({
            title: data.title,
            desc: data.title,
            link: data.link,
            imgUrl: data.imgUrl,
            success: function (res) {
                console.log("已分享");
            },
            cancel: function (res) {
                console.log("已取消")
            }
        });
        wx.onMenuShareAppMessage({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            trigger: function (res) {
                console.log('用户点击发送给朋友');
            },
            success: function (res) {
                console.log('已分享');
            },
            cancel: function (res) {
                console.log('已取消');
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });
    })
}
function wechatShare() {
    console.log("微信分享");
    $.ajax({
        url: 'http://client.elloworld.cn/Thirdpart/Index/getWeixinAuthor',
        type: "GET",
        dataType: 'json',
        cache: false,
        success: function (json) {
            wx.config({
                debug: false,
                appId: json.appid,
                timestamp: json.timestamp,
                nonceStr: json.noncestr,
                signature: json.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
            });

            wx.error(function (res) {
                alert(JSON.stringify(res));
            });

        }
    });
    shareContent()
}
export default wechatShare;