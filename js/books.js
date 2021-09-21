var page = 1;
var loadingPage = false;
var edit = false;
var edit1 = false;
var selectId = [];
var selectAll = [];
var index = 0;
$(function () {

    /*选择*/
    $('.read_title .left div').click(function () {
        $('.read_title .left div').removeClass('curs')
        $(this).addClass('curs')
        index = $(this).index();

        if (index == 0) {
            $(".is-read-log").hide();
            $(".listss").show();
            $('.empty p').html('主人, 您最近没有收藏过书籍哦~')
        } else {
            $(".is-read-log").show();
            $(".listss").hide();
            $('.empty p').html('主人, 您最近没有阅读过书籍哦~')
        }

        rel = 1;
        edit = false;
        edit1 = false;
        selectId = [];
        $('.edit-btn').html("编辑");
        $('.edit-btn').removeClass("edit-btns");
        $(".del-bar").hide();
        $(".selBg .select").removeClass("selectSel");
        $(".select-all").removeClass("selectSel");
        $('.my-books').addClass('relPad');
        $('.selBg').hide();

        page = 1;
        loadingPage = false;
        $(".empty").hide();
        loadPage();
    })

    $("img.lazy").lazyload({effect: "fadeIn", threshold: 400});


    $(".select-del").click(function () {
        if (selectId.length > 0) {
            var curload = layer.load(1, {shade: 0.5});
            if (index == 0) {
                ajaxPost({
                    url: BASEURL + '/user/delAtten/',
                    subData: {selectId: selectId},
                    callback: function (res) {
                        if (res.code == 200) {
                        }
                    }
                })
            } else {
                ajaxPost({
                    url: BASEURL + '/user/delReadLog/',
                    subData: {selectId: selectId},
                    callback: function (res) {
                        if (res.code == 200) {
                        }
                    }
                })
            }
            layer.close(curload);
            $(".del-bar").hide();
            rel = 1;
            edit = false;
            edit1 = false;
            selectId = [];
            loadPage();
            layer.msg("删除成功!");
            selectAll = [];
            selectId = [];
            page = 1;
            loadingPage = false;
            $(".edit-btn").html("编辑");
            $(".edit-btn").removeClass("edit-btns");
            $('.del-bar .select-all').removeClass('selectSel');
        } else {
            layer.msg("请选择书籍!");
        }
    })
    var rel = $('.edit-btn').attr('rel');


    $(".edit-btn").click(function () {
        if (rel == 1) {
            edit = true;
            edit1 = true;
            rel = 2;
            $(this).addClass("edit-btns");
            $(this).html("完成");
            if (index == 0) {//收藏
                $('.selBg').show();
                $('.my-books').addClass('relPad');
            } else {
                $(".li-read").hide();
                $(".select").show();
                $('.is-read-log .jixu').hide();
                $('.my-books').addClass('relPad');
                $(".nn").css('display', 'none');
            }

            $(".del-bar").show();
            $('.del-bar .select-del').html('删除');
        } else {
            rel = 1;
            edit = false;
            edit1 = false;
            selectId = [];
            $(this).html("编辑");
            $(this).removeClass("edit-btns");
            $(".del-bar").hide();
            if (index == 0) {
                $(".selBg .select").removeClass("selectSel");
                $(".select-all").removeClass("selectSel");
                $('.my-books').addClass('relPad');
                $('.selBg').hide();
            } else {
                $(".select").removeClass("selectSel");
                $(".select").addClass("is-select");
                $(".li-read").show();
                $(".select").hide();
                $('.is-read-log .jixu').show();
                $('.my-books').removeClass('relPad');
                $(".select-all").removeClass("selectSel");
                $(".nn").css('display', 'block');
            }
        }
        $(this).attr('rel', rel);

    })


    $(".listss").on("click", "li", function () {
        var curId = $(this).attr("rel");
        if (rel != 1) {
            if (edit) {
                if (!$(this).find(".select").not().hasClass('selectSel')) {
                    $(this).find(".select").show();
                    $(this).find(".select").addClass('selectSel');
                    selectId.push(curId);
                    $('.del-bar .select-del').html('删除');
                } else {
                    selectId = removeData(selectId, curId);
                    $(this).find(".select").removeClass('selectSel');
                    $('.del-bar .select-del').html('删除');
                }
            }
        } else {
            edit = false;
            rel = 1;
            console.log(1111)
        }
    })

    $(".is-read-log").on("click", "li", function () {
        // console.log('000')
        if (edit1) {
            var curId = $(this).attr("rel");
            if ($(this).find(".select").hasClass("is-select")) {
                $(this).find(".select").addClass("selectSel");
                $(this).find(".select").removeClass("is-select");
                selectId.push(curId);
                $('.del-bar .select-del').html('删除');
            } else {
                $(this).find(".select").addClass("is-select");
                $(this).find(".select").removeClass("selectSel");
                selectId = removeData(selectId, curId);
                $('.del-bar .select-del').html('删除');
            }
        }
    })
    //全选
    $(".select-all").click(function () {
        if ($(this).hasClass("selectSel")) {
            $(this).removeClass("selectSel");
            $(".listss").find('.select').removeClass('selectSel');
            $(".select").addClass("is-select");
            $(".select").removeClass("selectSel");
            selectId = [];
            $('.del-bar .select-del').html('删除');
        } else {
            $(this).addClass("selectSel")
            $(".select").addClass("selectSel");
            $(".listss").find('.select').addClass('selectSel');
            $(".select").removeClass("is-select");
            selectId = selectAll;
            $('.del-bar .select-del').html('删除');
        }
    })

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight >= scrollHeight - 60) {
            loadPage();
        }
    })

})
loadPage();

function loadPage() {
    if (loadingPage) {
        return false
    }
    loadingPage = true;

    if (index == 0) {
        ajaxPost({
            url: BASEURL + '/user/ajaxBooks/' + page, subData: "", callback: function (res) {
                if (res.code == 200) {
                    var lists = res.data.infoList;
                    var html = '';
                    for (var i = 0; i < lists.length; i++) {
                        selectAll.push(lists[i].bid);

                        html += '<li rel="' + lists[i].bid + '" class="li-3" onclick="locationH(\'' + lists[i].url + '\')">\n' +
                            '         <div class="li-img">\n'

                        if (lists[i].update) {
                            html += '<span class="tips-new"></span>'
                        }
                        if(edit){
                            html += '<img data-original="' + lists[i].img + '" class="lazy lazyIn" /><div class="selBg" style="display: block"><span class="select"></span></div>\n' +
                                '    </div>\n' +
                                '    <h4 class="bookName is-over">' + lists[i].title + '</h4>\n' +
                                '    <div class="li-info is-over">\n' +
                                '          <span>第' + lists[i].msgId + '话/第' + lists[i].sectionNum + '话</span>\n' +
                                '    </div>\n' +
                                '</li>';
                        }else{
                            html += '<img data-original="' + lists[i].img + '" class="lazy lazyIn" /><div class="selBg"><span class="select"></span></div>\n' +
                                '    </div>\n' +
                                '    <h4 class="bookName is-over">' + lists[i].title + '</h4>\n' +
                                '    <div class="li-info is-over">\n' +
                                '          <span>第' + lists[i].msgId + '话/第' + lists[i].sectionNum + '话</span>\n' +
                                '    </div>\n' +
                                '</li>';
                        }

                    }
                    if (lists.length == 0) {
                        $(".is-loading").hide();
                        $(".empty").show();
                    }
                    if (page == 1) {
                        $(".listss ul").html("");
                    } else {
                        $(".empty").hide();
                    }
                    $(".listss ul").append(html);
                    if (lists.length >= 20) {
                        loadingPage = false;
                    } else {
                        $(".is-loading").hide();
                    }
                    $("img.lazyIn").lazyload({effect: "fadeIn"});
                    $(".lazy").removeClass("lazyIn");
                    page = page + 1;
                } else {
                    loadingPage = false;
                }

            }
        })
    } else {
        ajaxPost({
            url: BASEURL + '/user/ajaxReadLog/' + page, subData: "", callback: function (res) {
                if (res.code == 200) {
                    var lists = res.data.infoList;
                    var html = '';
                    var tags = [];
                    var status = '';
                    for (var i = 0; i < lists.length; i++) {
                        selectAll.push(lists[i].bid);
                        tags = lists[i].tags.split(',')
                        html += '<li rel="' + lists[i].bid + '" >\n' +
                            '<div class="is-select select"></div><div class="aaa-div" onclick="locationH(\'' + lists[i].url + '\')"><img data-original="' + lists[i].img + '" class="lazy lazyIn"/>\n' +
                            '</div><div class="bookTitle"><div class="aaaa is-over">' + lists[i].title + '</div><div class="tags">\n'

                        for (var n = 0; n < tags.length; n++) {
                            if (tags.length > 1 && n < tags.length - 1) {
                                html += '<div>' + tags[n] + '/</div>'
                            } else {
                                html += '<div>' + tags[n] + '</div>'
                            }
                        }

                        if (lists[i].status == 2) {
                            status = '已完结'
                        } else {
                            status = '连载中'
                        }

                        html += '</div><div class="prev_du">已阅读：第' + lists[i].msgId + '话' + '</div>\n' +
                            '<div class="status">' + status + '：第' + lists[i].sectionNum + '话</div>' +
                            '<div class="uptime">' + lists[i].upTime + '</div></div></div>' +
                            '<div class="jixu" onclick="locationH(\'' + lists[i].readUrl + '\')">续看</div>\n' +
                            '</li>';
                    }

                    if (lists.length == 0) {
                        $(".is-loading").hide();
                        $(".empty").show();
                    }

                    if (page == 1) {
                        $(".is-read-log ul").html("");
                    }

                    $(".is-read-log ul").append(html);
                    if (lists.length >= 20) {
                        loadingPage = false;
                    } else {
                        $(".is-loading").hide();
                    }
                    $("img.lazyIn").lazyload({effect: "fadeIn"});
                    $(".lazy").removeClass("lazyIn");
                    page = page + 1;
                } else {
                    loadingPage = false;
                }

            }
        })

    }

}

function locationH(url) {
    if (!edit) {
        locationHref(url);
    }
}

