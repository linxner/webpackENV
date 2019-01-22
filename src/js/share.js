import axios from 'axios'
import wx from 'weixin-js-sdk'

function wechatShare() {
  axios.post('https://game.elloworld.cn/wxapi/index/getSignPackage').then((json) => {
    // success: function (json) {
    console.log(json)
    var res = json.data.data
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu']

    });
    wx.error(function (res) {
      // alert(JSON.stringify(res));
      console.log(res)
    });
  });
  var data = {
    title: "一城一味",
    desc: "记忆中的家乡酒味，总让你魂牵梦萦。上京东，今年让酒带你回家",
    link: 'https://h5.m.jd.com/babelDiy/Zeus/tAXvwCqZ1MjsPcT1wfbxRSs1p9D/index.html',
    imgUrl: 'https://h5.m.jd.com/babelDiy/Zeus/tAXvwCqZ1MjsPcT1wfbxRSs1p9D/plugin/images/share.png'
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


export default wechatShare;
