import FastClick from 'fastclick';
import Env from './screen';
import handleEvent from './style';

var createjs = window.createjs;
var equipment = new Env();
var loadAnime=false;
var loadCompleted=false;

$('#loading').on("touchstart", function (e) {
    e.stopPropagation();
    e.preventDefault();
});

FastClick.attach(document.body);


//===== 判断客户端
if (equipment.isAppMobile) {
    // loader.init()
    handleEvent();
    console.log(equipment.isAppMobile + ":移动端");
} else {
    console.log(equipment.isAppMobile + ":网页端");
    $("#loading").hide();
    $("#site-container").hide();
    $("#fullscreen_tips").show();
}
//===== 判断是否转屏
flipEquipment();

$(window).bind('orientationchange', function (e) {
    flipEquipment();
});


function flipEquipment() {
    if (window.orientation == 0 || window.orientation == 180) {
        $("#fullscreen_tips").hide();
        $("#site-container").css("opacity", "1");
        return false;
    } else if (window.orientation == 90 || window.orientation == -90) {
        $("#fullscreen_tips").show();
        $("#site-container").css("opacity", "0");
        return false;
    }
}

//加载动画
function loaderAnimeCompleted() {
    loadAnime=true;
    console.log('动画完成');
}

var loader = {
    queue: null,
    init: function () {
        showLoading();
        var t = this;
        var imgArray = [];
        $.getJSON('asset-manifest.json', function (json, textStatus) {
            for (var i in json) {
                var path = json[i];
                imgArray.push({
                    id: i,
                    src: path
                });
            }
            t.queue = new createjs.LoadQueue();
            t.queue.installPlugin(createjs.Sound);
            t.queue.on("complete", handleComplete, this);
            t.queue.on("progress", handleFileProgress);
            t.queue.loadManifest(imgArray);
        });

        function handleFileProgress(e) {
            var percent = e.progress * 100 | 0;
            // $("#loading p").text(percent + "%");
            $('.loadProgress').css({
                width: percent + '%'
            })
        }

        var _int = 0;

        function handleComplete() {
            loadCompleted=true
            console.log('加载完成')
        }

        function showLoading() {
            $("#loading").show();
            loaderAnimeCompleted();
        }

    }
}

var timer = setInterval(() => {
    if(loadAnime&&loadCompleted){
        $("#loading").fadeOut(500, function () {
            $("#loading").empty();
        });
        handleEvent();
        clearInterval(timer)
    }
})
