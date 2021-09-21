var submits = false;


function log(title) {
    console.log(title);
}

function formatSeconds(value) {
    var theTime = parseInt(value);// 需要转换的时间秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    var theTime3 = 0;// 天
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            if(theTime2 > 24){
                //大于24小时
                theTime3 = parseInt(theTime2/24);
                theTime2 = parseInt(theTime2%24);
            }
        }
    }
    var result = '';
    if(theTime > 0){
        if(theTime<10){
            result = "0"+parseInt(theTime)+"秒";
        }else{
            result = ""+parseInt(theTime)+"秒";
        }
    }
    if(theTime1 > 0) {
        if(theTime1<10){
            result = "0"+parseInt(theTime1)+"分"+result;
        }else{
            result = ""+parseInt(theTime1)+"分"+result;
        }
    }
    if(theTime2 > 0) {
        if(theTime2<10){
            result = "0"+parseInt(theTime2)+"小时"+result;
        }else{
            result = ""+parseInt(theTime2)+"小时"+result;
        }
    }
    if(theTime3 > 0) {
        if(theTime3<10){
            result = "0"+parseInt(theTime3)+"天"+result;
        }else{
            result = ""+parseInt(theTime3)+"天"+result;
        }
    }
    return result;
}
/*整数转换为时分秒*/
function secondToTimeStr(t) {
    if (t < 60) {
        return "00:00:" + (parseInt(i = t) < 10 ? "0" + parseInt(i) : parseInt(i))
    } else if (t < 3600) {
        return "00:" + ((a = parseInt(t / 60)) < 10 ? "0" + a : a) + ":" + ((i = t % 60) < 10 ? "0" + parseInt(i) : parseInt(i));
    } else if (3600 <= t) {
        var a, i, e = parseInt(t / 3600);
        return (e < 10 ? "0" + e : e) + ":" + ((a = parseInt(t % 3600 / 60)) < 10 ? "0" + a : a) + ":" + (parseInt(i = t % 60) < 10 ? "0" + i : i);
    }
}


function getNowDate() {
    var date = new Date();
    var year = (date.getFullYear() < 1000) ? date.getFullYear() + 1900 : date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = date.getDate();
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;
}

/*日期天数差*/
function getDifferDate(firstDate, secondDate, differ) {
    //1)将两个日期字符串转化为日期对象
    var startDate = new Date(firstDate);
    var endDate = new Date(secondDate);
    //2)计算两个日期相差的毫秒数
    var msecNum = endDate.getTime() - startDate.getTime();
    //3)计算两个日期相差的天数
    var dayNum = Math.floor(msecNum / getDifferScale(differ));
    return dayNum;
}

/*计算俩个日期相差天数*/
function getDifferScale(value) {
    var format;
    //获取转化比（天数跟毫秒数的比例）
    if (value == 1) {
        format = parseFloat(24 * 60 * 60 * 1000);
    }
    //获取转化比（小时数跟毫秒数的比例）
    else if (value == 2) {
        format = parseFloat(60 * 60 * 1000);
    }
    //获取转化比（分钟数跟毫秒数的比例）
    else if (value == 3) {
        format = parseFloat(60 * 1000);
    }
    //获取转化比（秒数跟毫秒数的比例）
    else if (value == 4) {
        format = parseFloat(1000);
    }
    return format;
}

/** 用于判断手机号段是否合法 */
function isMobileNum(number) {
    if (/^(1[0-9])\d{9}$/.test(number)) {
        return true;
    }
    return false;
}

/** 过虑左右空格 */
function trim(str) {
    return str.replace(/(^s\s*)|(\s*$)/g, "");
}

function isNull(str) {
    if (str == undefined || str == "" || str == null || str == "null" || str == "undefined") {
        return true;
    }
    return false;
}

var locations = true;

function locationHref(url, rep) {
    //if(locations){
    /*if(loading){
        layer.open({type: 2,content: '加载中'});
    }*/
    //locations = false;
    if(!url){
        return false;
    }
    var host = window.location.host;
    if (host == "app.guangfaxy.top") {
        //alert(url);
        uni.postMessage({
                data: {
                    fun: 'href',
                    msg: "href",
                    data: url
                }
            }
        );
    } else {
        var token = getQueryVariable("token");
        if (token) {
            if(url.indexOf("token=") <0 ){
                if(url.indexOf("?") <0 ){
                    url += '?token=' + token;
                }else{
                    url += '&token=' + token;
                }
            }
        }

        if (rep) {
            location.replace(url);
        } else {
            location.href = url;
        }
    }

    //}

}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value, Days) {
    if (!Days) {
        Days = 30;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}


function setCookieRech(name, value, Days) {
    if (!Days) {
        Days = 30;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function movieTop() {
    $("html,body").animate({scrollTop: 0}, 500);
}

function oppenAtten() {
    layer.open({
        title: [
            '关注公众号',
            'background-color: #FF4351; color:#fff;'
        ]
        ,
        content: '<div style="text-align: center"><img style="margin: 0px auto" width="100%" src="/webroot/img/hbook.jpg"/></div>'
    });

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

/**
 * ajax请求
 * @param url
 * @param subData 上传参数
 * @param locationHref 跳转url
 * @param success 成功返回
 * @param error 失败返回
 */
function ajaxPost(arg) {

    var url = arg.url;
    var subData = arg.subData;
    var locationHref = arg.locationHref;
    var success = arg.success;
    var error = arg.error;
    var callback = arg.callback;
    var token = getQueryVariable("token");
    if (token) {
        if(url.indexOf("token=") <0 ){
            if(url.indexOf("?") <0 ){
                url += '?token=' + token;
            }else{
                url += '&token=' + token;
            }
        }
    }
    $.ajax({
        url: url,
        type: "post",
        data: subData,
        dataType: 'json',
        success: function (data) {
            //openclose(loading);
            if (callback) {
                callback(data);
                return true;
            }
            if (data.code == 200) {
                if (locationHref == '/') {
                    setTimeout("location.reload()", 1000);
                } else if (locationHref) {
                    setTimeout(location.href = locationHref, 1000);
                }
            } else {
            }
        },
        error: function (e) {
            if (callback) {
                callback(e);
                return true;
            }
        }
    })
}

/**
 * 随机数据
 */
function randBook(id, cls, num) {
    ajaxPost({
        url: BASEURL + "/indexs/getRandAjax/" + num,
        callback: function (ret) {
            if (ret.code == 200) {
                var html = template(id, ret.data);
                $(cls).html(html);
            }
        }
    })
}

function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}

/**
 * 添加评论
 */

function toAddMsg(bid, num) {
    var val = $('.pingLunInput input').val();
    if (submits) {
        return false;
    }
    if (!val) {
        layer.msg("请输入内容！", {time: 3000, shift: 5, offset: ["66%", "30%"]}, function () {
        });
        return false;
    }

    if (strlen(val) < 10) {
        layer.msg("评论至少5个字", {time: 3000, shift: 5, offset: ["66%", "30%"]}, function () {
        });
        return false;
    }
    submits = true;

    ajaxPost({
        url: BASEURL + '/indexs/addBackMsg',
        subData: {bid: bid, msg: val},
        callback: function (ret) {
            val = $('.pingLunInput input').val('');
            if (ret.code == 200) {
                layer.msg("评论成功");
            } else {
                submits = false;
                layer.msg("评论失败:" + ret.msg);
                if (num != '1') {
                    setTimeout(function () {
                        $('.plll').hide();
                        $('.footer-btn').show();
                    }, 350);
                }
            }
            window.location.reload();
        }
    })

}

function openAddMsg(bid) {
    var curPop = layer.prompt({
        formType: 2
        , skin: 'is-layui-prop '
        , title: '我要评论'
        , value: ''
    }, function (value, index, elem) {
        if (submits) {
            return false;
        }
        if (!value) {
            return false;
        }

        if (strlen(value) < 10) {

            layer.msg("评论至少5个字");

            return false;
        }
        submits = true;

        layer.close(curPop);
        ajaxPost({
            url: BASEURL + '/indexs/addBackMsg',
            subData: {bid: bid, msg: value},
            callback: function (ret) {
                if (ret.code == 200) {
                    layer.msg("评论成功");
                    var html = '<li><div class="user-info"><img class="user-img is-fl" src="' + ret.data.headImg + '" ><div class="user-name is-fl is-f11">' + ret.data.nick + '<br><a class="is-c999 is-f11">' + ret.data.ctime + '</a> </div> <span class="is-frr is-c999 is-f11" onclick="addMsgCommend(this,' + ret.data.msgId + ',0)"><span style="display: block;float: right;margin-top:0.1rem">0<i class="is-icons"></i></div><div class="user-msg is-c333 is-f11">' + ret.data.msg + '</div></li>';
                    $(".lists-msg-pop").prepend(html);
                } else {
                    submits = false;
                    layer.msg("评论失败:" + ret.msg);
                }
            }
        })
    })
}

/**
 * 加入收藏
 * @param bid
 */
function addAtten(bid) {
    ajaxPost({
        url: BASEURL + "/user/addAtten/" + bid,
        callback: function (res) {
            if (res.code == 200) {
                //alert("加入书架成功")
                layer.msg("加入收藏成功")
                $('.footer-btn .is-fl span,.setting .is-cell .shoucang').addClass('collect_sel');
                $('.scText').css('color', '#15D1A2');
                $('.scText,.footer-btn .left .div div').html('已收藏');
            }
        }
    })
}

function mulitAddAtten() {
    var bids = '';
    $(".bind-bid").each(function () {
        bids += $(this).attr("rel") + '-';
    })
    ajaxPost({
        url: BASEURL + "/user/addAtten/" + bids,
        callback: function (res) {
            if (res.code == 200) {
                //alert("加入书架成功")
                layer.msg("加入收藏成功")
            }
        }
    })
}

function addMsgCommend(cur, msgId, oldNum) {
    var that = cur;
    var submits = false;
    var type = 1;
    if (submits) {
        return false;
    }
    oldNum = parseInt($(that).html());
    if (getCommend(msgId)) {
        type = 0;
        removeCommend(msgId);
        //console.log("has commend");
    } else {
        //console.log("add commend");
        setCommend(msgId);
    }
    //return false;
    submits = true;
    ajaxPost({
        url: BASEURL + "/indexs/addMsgCommend/" + msgId,
        subData: {type: type},
        callback: function (res) {
            submits = false;
            console.log('111', res)

            if (res.code == 200) {

                if (type == 1) {
                    $(that).html(oldNum + 1);
                    $(that).addClass("zanSel");
                } else {
                    if (oldNum > 0) {
                        $(that).removeClass("zanSel");
                        $(that).html(oldNum - 1);
                    }
                }

            }
        }
    })
}

function setCommend(msgId) {
    var key = getCookie("UCOMMEND");
    console.info(key);
    if (key) {
        key = key.split(',');
    } else {
        key = [];
    }
    key.push(msgId);
    setCookie("UCOMMEND", key.join(','));
}

function removeCommend(msgId) {
    var key = getCookie("UCOMMEND");
    if (key) {
        key = key.split(',');
    } else {
        key = [];
    }

    console.log("+++++++");
    console.info(key);

    var index = key.indexOf(msgId.toString());
    key.splice(index, 1);

    setCookie("UCOMMEND", key.join(','));
}


function getCommend(msgId) {
    var key = getCookie("UCOMMEND");
    if (key) {
        key = key.split(',');
    } else {
        key = [];
    }
    if (key.length > 0) {
        var index = key.indexOf(msgId.toString());
        if (index >= 0) {
            return true;
        } else {
            return false;
        }
        //console.info(key);
        //console.log("--"+msgId+"--"+key.indexOf(msgId));
    } else {
        //console.log("======"+msgId+"===="+key.indexOf(msgId));
        //console.info(key);
        return false;
    }
}


function goBack(url) {
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE
        if (history.length > 0) {
            window.history.go(-1);
        } else {
            location.href = url;
        }
    } else { //非IE浏览器
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0) {

            if (window.history.length > 1) {
                window.history.go(-1);
            } else {
                location.href = url;
            }
        } else { //未知的浏览器
            window.history.go(-1);
        }
    }
}

function closePop() {
    $(".is-bg").remove();
    $(".award_pop").remove();
    location.reload();
}

function removeData(arr, val) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function iphoneNumber(val) {
    var phone = $(val).val();
    var reg = /^1[345678]\d{9}$/;
    if (!reg.test(phone)) {
        layer.msg('请输入正确的手机号')
        return '1';
    }
}


