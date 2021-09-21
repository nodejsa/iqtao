boy = 1;
$(function () {
    $("img.lazy").lazyload({effect: "fadeIn", threshold: 400});
    //reloadData();
    $("#setBoy").click(function () {
        if (boy == 2) {
            boy = 1;
            $("#setBoy").find("img").attr("src", $("#setBoy").find("img").attr("src").replace("ic_female", "ic_male"));
        } else {
            boy = 2;
            $("#setBoy").find("img").attr("src", $("#setBoy").find("img").attr("src").replace("ic_male", "ic_female"));
        }
        setCookie("BOY", boy);
        reloadData();
    })

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('.is-top').fadeIn(300);
        } else {
            $('.is-top').fadeOut(300);
        }
    })



    /*排行榜状态*/
    $('.rankList .li').click(function () {
        $('.rankList .li').removeClass('sel')
        $(this).addClass('sel')
    })
    /*分类佳作状态*/
    $('.fenleiList .ul .li').click(function () {
        $('.fenleiList .ul .li').removeClass('sel')
        $(this).addClass('sel')
    })
    /*活动弹窗*/
    /*5分钟弹一次*/

})



function rach(){
    locationHref(BASEURL+"/user/recharge/");
}

function reloadData(val, num) {
    //var curLoad = layer.load(1, {shade: 0.4});
    ajaxPost({
        url: BASEURL+'/indexs/getCommonInfo/0/' + val + '/' + num,
        subData: "",
        callback: function (res) {
            if (res.code == 200) {
                console.log('------------------------------------------------')
                //layer.close(curLoad);
                switch (val) {
                    case 4:
                        setCommendList(res.data.list);
                        break;
                    case 8:
                        setNewCommend(res.data.list);
                        break;
                    case 16:
                        setCompCommend(res.data.list);
                        break;
                    case 64:
                        setHotCommend(res.data.list);
                        break;
                }
            }
        }
    })
}

/**
 * 书籍跳转
 * @param bid
 */
function locationBook(bid) {
    locationHref(BASEURL+"/indexs/info/"+bid);
}

function downAppHtml(url) {
    var a = getCookie("DOWNLOAD");
    if(!a){
        var html ='<div class="desk" ><div onclick="locationHref(\''+url+'\')"><img src="/webroot/img/login.png" /><a>下载APP</a></div><a class="close" onclick="closeDown()">×</a></div>';
        $("body").append(html);
    }
}

function closeDown() {
    setCookie("DOWNLOAD",1,3600);
    $(".desk").fadeOut();
}

/**
 * 榜单数据
 * @param type
 */
function loadRank(type) {
    ajaxPost({
        url: BASEURL+'/indexs/rank/'+type,
        subData: {ajax:1},
        callback: function (res) {
            if (res.code == 200) {
                var html = "";
                for(var i=0;i<res.data.rank.length;i++){
                    if(i>=6){
                        break;
                    }
                    html +='<li class="li" onclick="locationBook(\'' +res.data.rank[i].bid+ '\')">\n' +
                        '                    <div class="img">\n' +
                        '                        <img src="'+res.data.rank[i].img+'"/>\n' +
                        '                    </div>\n' +
                        '                    <div class="text is-over">'+res.data.rank[i].title+'</div>\n' +
                        '                    <div class="hotNum">'+res.data.rank[i].readNum+'</div>\n' +
                        '                </li>';
                }
                $(".rankListLi").html(html);
            }
        }
    })
}
loadRank(1);

/**
 * 标签数据
 * @param tag
 */
function loadTags(tag) {
    ajaxPost({
        url: BASEURL+'/indexs/lists/0/1/0/0/'+tag+'/1/0/',
        subData: {ajax:1},
        callback: function (res) {
            if (res.code == 200) {
                var html = "";
                for(var i=0;i<res.data.infoList.length;i++){
                    if(i>=6){
                        break;
                    }
                    html +='<div class="li" onclick="locationBook(\'' +res.data.infoList[i].bid+ '\')">\n' +
                        '                            <img src="'+res.data.infoList[i].img+'"/>\n' +
                        '                            <div class="bookInfo">\n' +
                        '                                <div class="bookName is-over">'+res.data.infoList[i].title+'</div>\n' +
                        '                                <div class="about is-over">'+res.data.infoList[i].about+'</div>\n' +
                        '                                <div class="hotNum">'+res.data.infoList[i].readNum+'</div>\n' +
                        '                            </div>\n' +
                        '                        </div>';
                }
                $(".fenleiList .div").html(html);
            }
        }
    })
}
loadTags('都市');

/**
 * 广告图
 * @param datas
 */
function setBannerInfo(datas) {
    var html = '';
    for (var i = 0; i < datas.length; i++) {
        html += '<li class="sw-slide" onclick="locationHref(\'' + datas[i].url + '\')"><img src="' + datas[i].bigImg + '"  width="100%"></li>';
    }
    $("#full_feature").html('<ul class="sw-slides">' + html + '</ul>');
    $('#full_feature').swipeslider({
        sliderHeight: '60%',
        transitionDuration: 1000,
        autoPlayTimeout: 3000,
    });
}

/**
 * 小编精选
 * @param datas
 */
function setCommendList(datas) {
    var html = '';
    for (var i = 0; i < datas.length; i++) {
        let tags = datas[i].tags;
        let readNum=0;
        tags = tags.replace(",", "/")
        if(datas[i].readNum>10000){
            readNum=(datas[i].readNum/10000).toFixed(1)+'w'
        }else{
            readNum=datas[i].readNum
        }
        if (i == 0) {
            html += '<div class="li" onclick="locationHref(\'' + datas[i].url + '\')"><img src="' + datas[i].img + '"/><div class="bookInfo"><div class="bookName"><div class="name is-over">' + datas[i].title + '</div><div class="hotNum">' + readNum + '</div></div><div class="tags">' + tags + '</div>' +
                '<div class="about"><div class="is-over4">' + datas[i].about + '</div></div></div></div></div>'
        } else {
            html += '<div class="li" onclick="locationHref(\'' + datas[i].url + '\')"><img src="' + datas[i].img + '"/><div class="bookInfo"><div class="bookName"><div class="name is-over">' + datas[i].title + '</div><div class="hotNum">' + readNum+ '</div></div>' +
                '</div></div></div>'
        }
    }
    $("#comComend").html(html);
}

/**
 * 新书
 * @param datas
 */
function setNewCommend(datas) {
    var html = '';
    for (var i = 0; i < datas.length; i++) {
        let tags = datas[i].tags;
        tags = tags.replace(",", "/")
        if(datas[i].readNum>10000){
            readNum=(datas[i].readNum/10000).toFixed(1)+'w'
        }else{
            readNum=datas[i].readNum
        }
        if (i == 0) {
            html += '<div class="li" onclick="locationHref(\'' + datas[i].url + '\')"><img src="' + datas[i].img + '"/><div class="bookInfo"><div class="bookName"><div class="name is-over">' + datas[i].title + '</div><div class="hotNum">' + readNum + '</div></div><div class="tags">' + tags + '</div>' +
                '<div class="about"><div class="is-over4">' + datas[i].about + '</div></div></div></div></div>'
        } else {
            html += '<div class="li" onclick="locationHref(\'' + datas[i].url + '\')"><img src="' + datas[i].img + '"/><div class="bookInfo"><div class="bookName"><div class="name is-over">' + datas[i].title + '</div><div class="hotNum">' + readNum + '</div></div>' +
                '</div></div></div>'
        }
    }
    $("#blCommend").html(html);
}

/**
 * 完结精品
 * @param datas
 */
function setCompCommend(datas) {
    var html = '';
    for (var i = 0; i < datas.length; i++) {
        html += ' <div class="li" onclick="locationHref(\'' + datas[i].url + '\')">' +
            '   <img src="' + datas[i].bigImg + '"/>' +
            '   <div class="bookName is-over">' + datas[i].title + '</div>\n' +
            '   <div class="about is-over">' + datas[i].about + '</div>\n' +
            '</div>'
    }
    $("#hotCommend").html(html);
}

/**
 * 小编力荐
 * @param datas
 */
function setHotCommend(datas) {
    var html = '';
    for (var i = 0; i < datas.length; i++) {
        html += ' <div class="li" onclick="locationHref(\'' + datas[i].url + '\')">' +
            '   <img src="' + datas[i].bigImg + '"/>' +
            '   <div class="bookName is-over">' + datas[i].title + '</div>\n' +
            '   <div class="about is-over">' + datas[i].about + '</div>\n' +
            '</div>'
    }
    $("#xblj").html(html);
}

function closeSpringPop() {
    $(".bgg").hide().remove();
    $(".topp").hide().remove();
    $(".bottomm").hide().remove();
}

function popActivity() {
    layer.open({
        type:1,
        title:false,
        shade:0.5,
        shadeClose:true,
        closeBtn:0,
        area:'100%',
        skin:'rechargePop',
        content:'<div onclick="rach()"><img class="img" src="'+imgpath+'recharge/1.png"/></div><div onclick="layer.closeAll()"><img class="close" src="'+imgpath+'recharge/2.png"/></div>'
    })
}

function midFest(){
    layer.open({
        type:1,
        title:false,
        shade:0.5,
        shadeClose:true,
        closeBtn:0,
        skin:'midPop',
        content:'<img src="'+actpath+'midFest/img/indexAlert.png" onclick="goMid()"/>'
    })
}

function goMid(){
    layer.closeAll();
    // locationHref(BASEURL+'/act/draw/5');
    location.href = BASEURL+'/act/draw/5'
}

function goSpring() {
    location.href = BASEURL+'user/draw/1'
    closeSpringPop();
}

var pop = getCookie("POPDRAW2");
var popss=false;

if (!pop) {
    youngPop();
    setCookie("POPDRAW2", 1, 86400);
}else{
    popss=true;
}

function youngPop() {
    var html = '<div class="is-bg"><div class="youngWarp animated fast zoomIn">'+
        '<img class="img" src="/webroot/img/public/youngBg@2x.png"/>'+
        '<p class="p1">为了呵护未成年人健康成长，咪酷推出青少年模式，该模式下部分功能无法使用。<br/>\n' +
        '漫画虽然有趣，但是比不上认真学习的你~切记不要沉迷哦</p>'+
        '<p class="p2" onclick="goYoung()">进入青少年模式 ></p>'+
        '<div class="btn" onclick="closeYoungPop()">我知道了</div>'+
        '</div></div>';
    $("body").append(html);
}
function goYoung(){
    closeYoungPop();
    layer.msg('已进入青少年模式')
    popss=true;
}

function closeYoungPop(){
    $('.is-bg').hide();
    popss=true;
}
