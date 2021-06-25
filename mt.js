// ==UserScript==
// @name         MT论坛
// @namespace    http://tampermonkey.net/
// @description  MT论坛效果增强，如自动签到、自动展开帖子、显示uid、屏蔽用户等
// @version      2.0.8
// @author       MT-戒酒的李白染
// @icon         https://bbs.binmt.cc/favicon.ico
// @match        *://bbs.binmt.cc/*
// @compatible   edge Beta/Dev/Candy 测试通过
// @compatible   火狐 测试通过
// @compatible   Yandex 测试通过
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @run-at       document-start
// @supportURL   https://github.com/893177236/Monkey_script
// @require	     http://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// @require https://greasyfork.org/scripts/428273-nanogallery/code/nanogallery.js?version=942794
// @require https://greasyfork.org/scripts/428274-jsonp/code/jsonp.js?version=942742
// ==/UserScript==

(function () {
    'use strict';

    let mt_config = {
        dom_obj: {
            beauty_select: function () { //下拉列表对象
                return document.getElementsByClassName("beauty-select")[0];
            },
            combobox_switch: function () { //复选框对象
                return document.getElementsByClassName("switch_1")[0];
            },
            comiis_verify: function () { //帖子内各个人的信息节点【list】
                return document.getElementsByClassName("comiis_verify");
            },
            comiis_formlist: function () { //导航中最新、热门、精华、恢复、抢沙发的各个帖子【list】
                return document.getElementsByClassName("top_lev bg_a f_f");
            },
            comiis_postli: function () { //帖子内评论，包括帖子内容主体，第一个就是主体【list】
                return document.getElementsByClassName("comiis_postli comiis_list_readimgs nfqsqi")
            },
            post_bottom_controls: function () { // 帖子底部一栏控件
                return document.getElementsByClassName("comiis_znalist_bottom b_t cl")

            },
            post_list_of_comments: function () { //帖子内评论列表
                return $(".comiis_postlist.kqide");
            },
            post_next_commect: function () { //帖子内评论下一页的按钮
                return document.querySelector("div.comiis_page.bg_f>a:nth-child(3)");
            }
        },
        rexp: {
            search_url: /bbs.binmt.cc\/search.php/g, //搜索页
            home_url: /home.php\?mod=spacecp&ac=profile&op=info/g, //个人空间页
            home_kmisign_url: /bbs.binmt.cc\/(forum.php\?mod=guide&view=hot(|&mobile=2)|k_misign-sign.html)/g, //主页和签到页链接
            home_space_url: /bbs\.binmt\.cc\/home\.php\?mod=space/g, //【我的】 个人信息页链接
            home_space_pc_uid_url: /space-uid-(.*?).html/, //PC 个人空间链接uid
            reply_url: "",
            sign_url: "",
            navigation_url: "",
            forum_post: /(bbs.binmt.cc\/thread-|bbs.binmt.cc\/forum.php\?mod=viewthread)/g, //帖子链接
            forum_post_pc: /.*:\/\/bbs.binmt.cc\/thread.*/, //帖子链接-PC
            forum_guide_url: /bbs.binmt.cc\/forum.php\?mod=guide/g, // 导航链接
            forum_post_reply: /forum.php\?mod=post&action=reply/g, //帖子中回复的链接
            forum_post_page: '&page=(.*)', //帖子链接的当前所在页 page
            forum_post_pc_page: 'thread-(.*?)-', //PC帖子链接的当前所在页 page
            forum_plate_text: /休闲灌水|求助问答|逆向教程|资源共享|综合交流|编程开发|玩机教程|建议反馈/g, //各版块名称
            formhash: /formhash=(.*)&/, //论坛账号的凭证
            font_special: /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g, //帖子内特殊字体格式
            forum_post_guide_url: /bbs.binmt.cc\/page-[1-5].html|bbs.binmt.cc\/forum.php\?mod=guide/g, //帖子链接和导航链接
            mt_uid: /uid=(\d+)/,
            nologin: /member.php\?mod=logging&action=login(|&mobile=2)/g, //未登录
            pc_useragent: 'Windows', //pc识别
        }
    }


    function Latest_publication() {
        var ele = document.createElement('li');
        var url = window.location.href;
        ele.id = "latest_publication";
        ele.innerHTML = '<a href="https:\/\/bbs.binmt.cc\/forum.php?mod=guide&view=newthread" hidefocus="true" title="最新发表">最新发表<\/a>';
        document.getElementsByClassName("wp comiis_nvbox cl")[0].children[1].appendChild(ele);
        if (url == 'https:\/\/bbs.binmt.cc\/forum.php?mod=guide&view=newthread') {
            document.getElementById("mn_forum_10").children[0].style = "background: url(";
            ele.style.cssText = 'background: url("https:\/\/cdn2.bbs.binmt.cc\/template\/comiis_mi\/img\/nv_a.png") repeat-x 50% -50px;';

        }
    }

    function insert_empty_title() {
        if (location.href.match(/mod=post&action=newthread&fid=50/g) != null) {
            var a = document.createElement("div");
            var b = document.querySelector("#postform > div > div:nth-child(5)");
            a.className = "comiis_btnbox cl";
            a.innerHTML = '<button class="comiis_btn formdialog bg_c f_f" id="postsubmit2">发表(空标题)<\/button>';
            b.parentElement.insertBefore(a, b);
            document.getElementById("postsubmit2").onclick = function () {
                document.getElementsByClassName("flex f17")[0].children[0].parentNode.hidden = true;
                document.getElementsByClassName("flex f17")[0].children[0].value = "😊";
            }

        }
    }

    function remove_post_content_font_special() {
        var rule = mt_config.rexp.font_special;
        var h_content = document.getElementsByClassName("comiis_a comiis_message_table cl");
        h_content[0].innerHTML = h_content[0].innerHTML.replace(rule, '');
    }

    function getLocalTime() {
        let GM_myDate = new Date;
        let GM_year = GM_myDate.getFullYear(); //获取当前年
        let GM_mon = GM_myDate.getMonth() + 1; //获取当前月
        let GM_date = GM_myDate.getDate();
        let GM_alldate = GM_year.toString() + GM_mon.toString() + GM_date.toString();
        GM_alldate = parseInt(GM_alldate);
        return GM_alldate
    }

    function mt_getFormHash_pc() {
        let mt_formhash = document.querySelector("input[name=formhash]").value;
        return mt_formhash;
    }

    function mt_getFormHash_mobile() {
        let mt_formhash = document.querySelector("div[class=sidenv_exit]>a").href.match(mt_config.rexp.formhash)[1]
        return mt_formhash;
    }

    function auto_sign(mt_formhash) { //mt签到
        if (mt_formhash != null) {
            let GM_localTime = getLocalTime();
            $.get("/k_misign-sign.html?operation=qiandao&format=button&formhash=" + mt_formhash + "&inajax=1&ajaxtarget=midaben_sign", function (data, status) {
                console.log(data.responseText);
                GM_setValue("mt_sign", GM_localTime);
                location.reload();
            });
        } else {
            console.log("获取账号formhash失败")
        }

    }

    function add_search_history() { //搜索界面添加搜索历史记录
        $("#scform_srchtxt").attr("list", "search_history");
        var search_history_list = GM_getValue("search_history");
        var dom_datalist = document.createElement("datalist");
        dom_datalist.id = "search_history";
        var option_text = "";
        if (search_history_list) {
            for (var i = 0; i < search_history_list.length; i++) {
                option_text = option_text + '<option value="' + search_history_list[i] + '">';
            }
            dom_datalist.innerHTML = option_text;
            $(".comiis_flex").append(dom_datalist);
        }

    }

    function add_clear_history() { //搜索界面添加清理历史记录和历史记录个数
        let search_history_list = GM_getValue("search_history");
        let search_history_nums = 0;
        if (search_history_list != null) {
            search_history_nums = search_history_list.length;
        }
        let clear_history_innerHTML =
            `<div class="comiis_p12 f14 bg_f f_c b_b cl" style="padding-bottom:10px">搜索记录个数: ` +
            search_history_nums +
            `<button class="btn_clear_search_history" style="
            border: none;
            float: right;
            background: red;
            color: #fff;
            border-radius: 3px;
            font-weight: 600;
            min-width: 20vw;
            width: 20vw;
        ">清理记录</button></div>`;
        let insertdom = $(".comiis_p12.f14.bg_f.f_c.b_b.cl,.comiis_tagtit.b_b.f_c");
        insertdom.before(clear_history_innerHTML);
        $(".btn_clear_search_history").click(function () {
            GM_deleteValue("search_history");
            window.location.reload();
        })
    }

    function search_event() {
        //搜索界面增加关闭按钮事件，清空input内容
        //点击搜索保存搜索记录
        $(".ssclose.bg_e.f_e").click(function () {
            $("#scform_srchtxt").val("")

        })
        $("#scform_submit").click(function () {
            let getsearchtext = $("#scform_srchtxt").val();
            if ((getsearchtext != null) && (getsearchtext != "")) {
                let search_history_array = new Array(getsearchtext);
                let has_history = GM_getValue("search_history");
                if (has_history != null) {
                    if ($.inArray(getsearchtext, has_history) != -1) {
                        console.log("已有该搜索历史记录")
                        search_history_array = has_history
                    } else {
                        console.log("无该记录，追加");
                        search_history_array = search_history_array.concat(has_history);
                    }
                } else {
                    console.log("空记录，添加")
                }
                GM_setValue("search_history", search_history_array);
            }

        })
    }

    function apply_none() {

        if (location.href.match(mt_config.rexp.forum_post) != null) {
            var a = document.createElement("span");
            var b = document.querySelector("#fastpostform > div.comiis_post_ico.comiis_minipost_icot.f_c.cl");
            a.id = "fastpostsubmitline2";
            a.className = "y";
            a.innerHTML = '<input type="button" value="添加隐藏内容" class="bg_0 f_f">';
            b.appendChild(a);
            document.querySelector("#fastpostsubmitline2 > input").onclick = function () {
                document.querySelector("#needmessage").value = document.querySelector("#needmessage").value + "🤣🤣🤣🤣🤣";
            }
        }
        if (location.href.match(mt_config.rexp.forum_post_reply) != null) {
            var c = document.createElement("span");
            var d = document.getElementsByClassName("swiper-wrapper comiis_post_ico")[0];
            c.id = "fastpostsubmitline2";
            c.className = "y";
            c.innerHTML = '<input type="button" value="添加隐藏内容" class="bg_0 f_f">';
            d.appendChild(c);
            document.querySelector("#fastpostsubmitline2 > input").onclick = function () {
                document.querySelector("#needmessage").value = document.querySelector("#needmessage").value + "🤣🤣🤣🤣🤣";
            }
        }

    }

    function set_css() {
        var a = document.createElement("style");
        var b = document.head;
        var c = document.createElement("script");
        var image = document.createElement("script");
        var file = document.createElement("script");
        c.src = "https://cdn2.bbs.binmt.cc/template/comiis_app/comiis/js/common_u.js?EPT:formatted"; //可能是论坛引入的js么有加载，顾重新引入
        image.src = "https://cdn2.bbs.binmt.cc/template/comiis_app/comiis/js/buildfileupload.js?EPT";
        file.src = "https://cdn.bbs.binmt.cc/static/js/mobile/ajaxfileupload.js?EPT";

        a.innerHTML = `body{background:#000;margin:0;padding:0;}
 	
	.wrapper{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 400px;
		margin: 50vh auto 0;
		-ms-flex-wrap: wrap;
		    flex-wrap: wrap;
		-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
	}

	.switch_box{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		max-width: 200px;
		min-width: 200px;
		height: 200px;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
			justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
			align-items: center;
		-webkit-box-flex: 1;
		    -ms-flex: 1;
			flex: 1;
	}

	/* Switch 1 Specific Styles Start */

	.box_1{
		background: #eee;
	}

	input[type="checkbox"].switch_1{
		font-size: 14px;
		-webkit-appearance: none;
		   -moz-appearance: none;
			appearance: none;
		width: 3.5em;
		height: 1.5em;
		background: #ddd;
		border-radius: 3em;
		position: relative;
		cursor: pointer;
		outline: none;
		-webkit-transition: all .2s ease-in-out;
		transition: all .2s ease-in-out;
	  }

	  input[type="checkbox"].switch_1:checked{
		background: #0ebeff;
	  }

	  input[type="checkbox"].switch_1:after{
		position: absolute;
		content: "";
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		background: #fff;
		-webkit-box-shadow: 0 0 .25em rgba(0,0,0,.3);
			box-shadow: 0 0 .25em rgba(0,0,0,.3);
		-webkit-transform: scale(.7);
			transform: scale(.7);
		left: 0;
		-webkit-transition: all .2s ease-in-out;
		transition: all .2s ease-in-out;
	  }

	  input[type="checkbox"].switch_1:checked:after{
		left: calc(100% - 1.5em);
	  }

	/* Switch 1 Specific Style End */


	/* Switch 4 Specific Style Start */

	.box_4{
		background: #eee;
	}

	.input_wrapper{
	  width: 80px;
	  height: 40px;
	  position: relative;
	  cursor: pointer;
	}

	.input_wrapper input[type="checkbox"]{
	  width: 80px;
	  height: 40px;
	  cursor: pointer;
	  -webkit-appearance: none;
	     -moz-appearance: none;
		  appearance: none;
	  background: #315e7f;
	  border-radius: 2px;
	  position: relative;
	  outline: 0;
	  -webkit-transition: all .2s;
	  transition: all .2s;
	}

	.input_wrapper input[type="checkbox"]:after{
	  position: absolute;
	  content: "";
	  top: 3px;
	  left: 3px;
	  width: 34px;
	  height: 34px;
	  background: #dfeaec;
	  z-index: 2;
	  border-radius: 2px;
	  -webkit-transition: all .35s;
	  transition: all .35s;
	}

	.input_wrapper svg{
	  position: absolute;
	  top: 50%;
	  -webkit-transform-origin: 50% 50%;
		  transform-origin: 50% 50%;
	  fill: #fff;
	  -webkit-transition: all .35s;
	  transition: all .35s;
	  z-index: 1;
	}

	.input_wrapper .is_checked{
	  width: 18px;
	  left: 18%;
	  -webkit-transform: translateX(190%) translateY(-30%) scale(0);
		  transform: translateX(190%) translateY(-30%) scale(0);
	}

	.input_wrapper .is_unchecked{
	  width: 15px;
	  right: 10%;
	  -webkit-transform: translateX(0) translateY(-30%) scale(1);
		  transform: translateX(0) translateY(-30%) scale(1);
	}

	/* Checked State */
	.input_wrapper input[type="checkbox"]:checked{
	  background: #23da87;
	}

	.input_wrapper input[type="checkbox"]:checked:after{
	  left: calc(100% - 37px);
	}

	.input_wrapper input[type="checkbox"]:checked + .is_checked{
	  -webkit-transform: translateX(0) translateY(-30%) scale(1);
		  transform: translateX(0) translateY(-30%) scale(1);
	}

	.input_wrapper input[type="checkbox"]:checked ~ .is_unchecked{
	  -webkit-transform: translateX(-190%) translateY(-30%) scale(0);
		  transform: translateX(-190%) translateY(-30%) scale(0);
	}
	.beauty-select{
	    background-color: #fff;
	    height:28px;
	    width:180px;
	    padding:0 10px;
	    line-height:28px;
	    border: 1px solid #ececec;
	    background: url(w.png) no-repeat;
	    background-position: 95% 50%;

	    -webkit-appearance: none;  /*去掉样式 for chrome*/
			appearance:none;/*去掉样式*/
			-moz-appearance:none;/*去掉样式*/
	}

	`;
        b.appendChild(a); //把a看成b弄错了
        b.appendChild(c);
        b.appendChild(image);
        b.appendChild(file);

    }

    function set_select_clicked() {
        // document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").onclick = function () {
        mt_config.dom_obj.beauty_select().onclick = function (e) {
            // console.log(e);

            // var b = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;
            var selected_value = e.target.value;
            if (localStorage.getItem(selected_value)) {
                mt_config.dom_obj.combobox_switch().checked = true;
            } else {
                mt_config.dom_obj.combobox_switch().checked = false;
            }
        }

    }

    function set_select_change_clicked() {
        $('.beauty-select').change(function () {
            var select_value = $('.beauty-select').val();
            // var a = document.getElementsByClassName("switch_1")[0];
            localStorage.setItem("last", select_value);
            if (localStorage.getItem(select_value)) {
                mt_config.dom_obj.combobox_switch().checked = true;
            } else {
                mt_config.dom_obj.combobox_switch().checked = false;
            }
        });

    }

    function set_checked_clicked() { //设置复选框点击事件特效
        mt_config.dom_obj.combobox_switch().onclick = function () {
            // var a = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;
            var a = mt_config.dom_obj.beauty_select().value;
            var b = localStorage.getItem(a);
            if (b) {
                localStorage.removeItem(a);
            } else {
                localStorage.setItem(a, "true");
            }
            var c = localStorage.getItem(a);
            // var d = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").selectedIndex; //当前索引值
            // var e = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").options[d].text; //当前索引对应的文本
            var d = mt_config.dom_obj.beauty_select().selectedIndex;
            var e = mt_config.dom_obj.beauty_select().options[d].text;
            if (c) {
                iosOverlay({
                    text: e + "已开启",
                    duration: 2000,
                    icon: "https://whitesev.gitee.io/static_resource/ios_loading/img/check.png"
                });
            } else {
                iosOverlay({
                    text: e + "已关闭",
                    duration: 2000,
                    icon: "https://whitesev.gitee.io/static_resource/ios_loading/img/check.png"
                });
            }
            setTimeout(function () {
                location.reload()
            }, 2000);

        }

    }


    function set_display_last_click() { //初始化设置上次点击的select内容
        console.log("修改内容");
        // var a = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select");
        var last_select_value = localStorage.last;
        var combobox_switch = mt_config.dom_obj.combobox_switch();
        mt_config.dom_obj.beauty_select().value = last_select_value;
        console.log(mt_config.dom_obj.beauty_select().value)
        if (localStorage.getItem(last_select_value)) {
            combobox_switch.checked = true;
        } else {
            combobox_switch.checked = false;
        }
    }

    function insert_tips() {
        var a = document.createElement("li");
        var b = document.querySelector("#comiis_menu_vtr_menu > ul");
        a.className = "f_b";
        a.innerHTML = '<p style="text-align: center;">Tip:点击按钮将自动刷新<\/p>';
        b.appendChild(a);
    }

    function insert_checked_select() {
        if (location.href.match(mt_config.rexp.home_space_url) != null) {
            var setting_content = document.createElement("li");
            // var setting_combobox = document.createElement("li");
            setting_content.className = "f_b";
            // setting_combobox.className = "f_b";
            // setting_combobox.style = "text-align: center;";
            setting_content.innerHTML = '<select style="vertical-align:top;border-color:transparent" class="beauty-select">' +
                '<option value="v1">移除帖子字体效果<\/option>' +
                '<option value="v2">开启识别链接<\/option>' +
                '<option value="v17">开启自动签到<\/option>' +
                '<option value="v19">显示搜索历史<\/option>' +
                '<option value="v3">移除评论区字体效果<\/option>' +
                '<option value="v18">自动展开帖子<\/option>' +
                '<option value="v21">自动加载帖内评论<\/option>' +
                '<option value="v15">显示帖子的uid<\/option>' +
                '<option value="v20">导读页预览图片<\/option>' +
                '<option value="v16">恢复图片宽度<\/option>' +
                '<option value="v6">开启点评<\/option>' +
                '<option value="v4">开启回复一键隐藏<\/option>' +
                '<option value="v5">开启灌水帖隐藏标题<\/option>' +
                '<option value="v7">关闭逆向教程<\/option>' +
                '<option value="v8">关闭资源共享<\/option>' +
                '<option value="v9">关闭休闲灌水<\/option>' +
                '<option value="v10">关闭求助问答<\/option>' +
                '<option value="v11">关闭综合交流<\/option>' +
                '<option value="v12">关闭编程开发<\/option>' +
                '<option value="v13">关闭玩机教程<\/option>' +
                '<option value="v14">关闭建议反馈<\/option>' +
                '<input type="checkbox" class="switch_1" style="float:right;position:relative;margin-top: revert;">' +
                '<\/select>';
            setting_content.style = " top;padding: 8px 0px 8px 8px;margin: 0px 15px;border-top:1px solid #efefef !important;";
            // setting_combobox.innerHTML = '<input type="checkbox" class="switch_1">';
            let mt_commis_menu = document.getElementsByClassName("comiis_myinfo_list bg_f cl")[1];
            mt_commis_menu.appendChild(setting_content);
            // mt_commis_menu.appendChild(setting_combobox);
            // var setting_combobox = document.getElementsByClassName("switch_1")[0];
            var setting_selectValue = mt_config.dom_obj.beauty_select().value;
            // console.log(mt_config.dom_obj.beauty_select())
            if (localStorage.getItem(setting_selectValue) != null) {
                mt_config.dom_obj.combobox_switch().checked = true;
            } else {
                mt_config.dom_obj.combobox_switch().checked = false;
            }
        }
    }


    function link() {
        var clearLink, excludedTags, filter, linkMixInit, linkPack, linkify, observePage, observer, setLink, url_regexp,
            xpath;
        url_regexp = /((https?:\/\/|www\.)[\x21-\x7e]+[\w\/]|(\w[\w._-]+\.(com|cn|org|net|info|tv|cc))(\/[\x21-\x7e]*[\w\/])?|ed2k:\/\/[\x21-\x7e]+\|\/|thunder:\/\/[\x21-\x7e]+=)/gi;
        clearLink = function (a) {
            var b;
            a = null != (b = a.originalTarget) ? b : a.target;
            if (null != a && "a" === a.localName && -1 !== a.className.indexOf("texttolink") && (b = a.getAttribute("href"), 0 !== b.indexOf("http") && 0 !== b.indexOf("ed2k://") && 0 !== b.indexOf("thunder://"))) return a.setAttribute("href", "http://" + b)
        };
        document.addEventListener("mouseover", clearLink);
        setLink = function (a) {
            if (null != a && -1 === a.parentNode.className.indexOf("texttolink") && "#cdata-section" !== a.nodeName) {
                var b = a.textContent.replace(url_regexp, '<a target="_blank" href="$1" style="text-decoration:none;border: 1px solid #e74c3c;color: #c0392b;">$1</a>');
                if (a.textContent.length !== b.length) {
                    var c = document.createElement("span");
                    c.innerHTML = b;
                    return a.parentNode.replaceChild(c, a)
                }
            }
        };
        excludedTags = "a svg canvas applet input button area pre embed frame frameset head iframe img option map meta noscript object script style textarea code".split(" ");
        xpath = "//text()[not(ancestor::" + excludedTags.join(") and not(ancestor::") + ")]";
        filter = new RegExp("^(" + excludedTags.join("|") + ")$", "i");
        linkPack = function (a, b) {
            var c, d;
            if (b + 1E4 < a.snapshotLength) {
                var e = c = b;
                for (d = b + 1E4; b <= d ? c <= d : c >= d; e = b <= d ? ++c : --c) setLink(a.snapshotItem(e));
                setTimeout(function () {
                        return linkPack(a, b + 1E4)
                    },
                    15)
            } else
                for (e = c = b, d = a.snapshotLength; b <= d ? c <= d : c >= d; e = b <= d ? ++c : --c) setLink(a.snapshotItem(e))
        };
        linkify = function (a) {
            a = document.evaluate(xpath, a, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            return linkPack(a, 0)
        };
        observePage = function (a) {
            for (a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, {
                        acceptNode: function (a) {
                            if (!filter.test(a.parentNode.localName)) return NodeFilter.FILTER_ACCEPT
                        }
                    },
                    !1); a.nextNode();) setLink(a.currentNode)
        };
        observer = new window.MutationObserver(function (a) {
            var b, c;
            var d = 0;
            for (b = a.length; d < b; d++) {
                var e = a[d];
                if ("childList" === e.type) {
                    var g = e.addedNodes;
                    var f = 0;
                    for (c = g.length; f < c; f++) e = g[f],
                        observePage(e)
                }
            }
        });
        linkMixInit = function () {
            if (window === window.top && "" !== window.document.title) return linkify(document.body),
                observer.observe(document.body, {
                    childList: !0,
                    subtree: !0
                })
        };
        var clearlinkF = function (a) {
                url = a.getAttribute("href");
                if (0 !== url.indexOf("http") && 0 !== url.indexOf("ed2k://") && 0 !== url.indexOf("thunder://")) return a.setAttribute("href", "http://" + url)
            },
            clearlinkE = function () {
                for (var a = document.getElementsByClassName("texttolink"), b = 0; b < a.length; b++) clearlinkF(a[b])
            };
        setTimeout(clearlinkE, 1500);
        setTimeout(linkMixInit, 100);
    }

    function online_status() {
        var quanju = [];
        var cishu = 0;
        for (var sss = document.getElementsByClassName("pls favatar"), ll = 0; ll < sss.length; ll++) {
            var sendmessage = sss[ll].getElementsByClassName("comiis_o cl")
            if (sendmessage.length == 0) {} else {
                var sendmessageurl = sendmessage[0].getElementsByTagName('a')[1].href;

                let xhr = new XMLHttpRequest();
                xhr.open("GET", sendmessageurl, false);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        let pattern = /正在.*]/g;
                        let str = xhr.responseText;
                        let newstr = str.match(pattern)[0];
                        quanju.push(newstr);
                    }
                }
                xhr.send();
                if (quanju[cishu].match('离线')) {
                    cishu = cishu + 1;
                    var imi2 = document.createElement('img');
                    imi2.src = 'https:\/\/cdn2.bbs.binmt.cc\/static\/image\/smiley\/doge\/54.png';
                    imi2.smilied = '1353';
                    imi2.border = "0";
                    imi2.style = 'float:right';
                    sss[ll].insertAdjacentElement('afterbegin', imi2);
                } else {
                    cishu = cishu + 1;
                    var imi = document.createElement('img');
                    imi.src = 'https:\/\/cdn2.bbs.binmt.cc\/static\/image/smiley\/doge\/35.png';
                    imi.smilied = '1384';
                    imi.border = "0";
                    imi.style = 'float:right';
                    sss[ll].insertAdjacentElement('afterbegin', imi);
                }
            }
        }
    }

    function reviews() {
        var hongbao = document.getElementsByClassName("bottom_zhan y");
        if (hongbao.length == 0) {} else {
            var cishu2 = 0;
            var replyhref = hongbao[cishu2].getElementsByTagName('a')[0].href;
            var page = replyhref.match(mt_config.rexp.forum_post_page)[1];
            //console.log(page);
            for (cishu2 = 0; cishu2 < hongbao.length; cishu2++) {
                if (hongbao[cishu2].children.length == 1) {
                    var rewardhref = hongbao[cishu2].getElementsByTagName('a')[0].href.replace('mod=post&', 'mod=misc&');
                    rewardhref = rewardhref.replace("action=reply&", "action=comment&");
                    var reviews_href = rewardhref + '&extra=page%3D1&page=' + page;
                    let reviews_pid = hongbao[cishu2].parentElement.parentElement.id.replace("pid", "&pid=");
                    reviews_href = reviews_href + reviews_pid;
                    //console.log(rewardhref)
                    var oa = document.createElement('a');
                    var ob = document.createElement('i');
                    var lm = document.getElementsByClassName("bottom_zhan y")[cishu2];
                    oa.href = reviews_href;
                    oa.className = "f_c dialog";
                    ob.style = "content: url(https://s1.ax1x.com/2020/04/26/Jcq8VU.png);height: 15px;";
                    ob.className = "comiis_font mt_review";
                    ob.innerHTML = "";
                    oa.appendChild(ob);
                    let review_username = hongbao[cishu2].parentElement.parentElement.getElementsByClassName("top_user f_b")[0].text;
                    oa.onclick = function () {
                        let click_time = Date.now();
                        var mt_interval = setInterval(function () {
                            let run_time = parseInt((Date.now() - click_time) / 1000);
                            if (run_time >= 5) {
                                console.log("超时");
                                clearInterval(mt_interval);
                            } else if (document.querySelector("div[id=ntcmsg_popmenu]>div>span.f_c") != null) {
                                console.log("存在，清理定时器");
                                console.log("点评用户：", review_username);
                                console.log("该对象出现用时:", run_time);
                                try {
                                    document.querySelector("div[id=ntcmsg_popmenu]>div>span.f_c").innerText = "点评 " + review_username;

                                } catch (err) {
                                    console.log("修改点评失败", err);
                                }

                                clearInterval(mt_interval);
                            }

                        }, 100)


                    }
                    lm.insertAdjacentElement('afterBegin', oa);
                } else {
                    console.log("已有点评按钮，无需再次添加");
                }
            }

        }
    }
    // function reviews_all_click(){//全局监听点击事件修改点评的名字
    //     document.addEventListener("click",function(e){
    //         let click_classname = e.toElement.className;
    //         if(click_classname=="comiis_font mt_review"){
    //             console.log(e);
    //         }
    //     })

    // }


    function new_thread() {
        try {
            document.getElementsByClassName("comiis_mh_tit cl")[1].getElementsByTagName("a")[0].href = "https://bbs.binmt.cc/page-4.html";
        } catch (err) {}
    }

    function show_black() {
        var hide = document.getElementsByTagName('font');
        var i = 0;
        for (i = 0; i < hide.length; i++) {
            hide[i].removeAttribute('color');
            hide[i].removeAttribute('style');
            hide[i].removeAttribute('size');
        }
        var content = document.getElementsByClassName("comiis_message bg_f view_all cl message");
        var rule = /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g;
        var j = 0,
            k = 1;
        for (j = 0; j < content.length; j++ & k++) {
            content[j].innerHTML = content[j].innerHTML.replace(rule, '');
        }
    }

    function collect() {
        var own_formhash = document.querySelector("#scform > input[type=hidden]:nth-child(1)").value;
        var collect_href_id = window.location.href.match(mt_config.rexp.forum_post_pc_page)[1];
        var collect_href = 'https:\/\/bbs.binmt.cc\/home.php?mod=spacecp&ac=favorite&type=thread&id=' + collect_href_id + '&formhash=' + own_formhash;
        var new_collect = document.createElement('span');
        var old_Suspended = document.getElementById("scrolltop");
        new_collect.innerHTML = '<a href="' + collect_href + '" id="k_favorite" onclick="showWindow(this.id, this.href, \'get\', 0);" onmouseover="this.title = $(\'favoritenumber\').innerHTML + \' 人收藏\'" ><img src="https:\/\/s1.ax1x.com\/2020\/04\/29\/JTk3lD.gif" height="26" width="26" style="position:absolute;top:10px;left:11px"><\/a>';
        old_Suspended.insertAdjacentElement('afterBegin', new_collect);
    }

    function reply_space() {
        var a = document.getElementsByClassName("fastre");
        var i = 0;
        for (i = 0; i < a.length; i++) {
            a[i].onclick = function () {
                showWindow('reply', this.href);
                setTimeout('document.querySelector("#moreconf").innerHTML=document.querySelector("#moreconf").innerHTML+\'<button type="button" id = "insertspace" style="float: left;">一键空格<\/button>\';document.querySelector("#insertspace").onclick=function(){document.querySelector("#postmessage").value="           "}', 150)
            }
        }


    }

    function quick_reply() {
        document.querySelector("#scrolltop > span:nth-child(2) > a").onclick = function () {
            showWindow('reply', this.href);
            var a = document.querySelector("#postsubmit");
            setTimeout(
                'document.querySelector("#moreconf").innerHTML=document.querySelector("#moreconf").innerHTML+\'<button type="button" id = "insertspace2" style="float: left;">一键空格<\/button>\';document.querySelector("#insertspace2").onclick=function(){document.querySelector("#postmessage").value=document.querySelector("#postmessage").value+"           ";}', 200)
        }


    }

    function user_level() {
        var a = document.getElementsByClassName("pls favatar");
        var i = 0;
        var e = "0级";
        for (i = 0; i < a.length; i++) {
            var b = a[i].getElementsByTagName("em")[1].outerText;
            var c = a[i].getElementsByTagName("tr")[0];
            var d = document.createElement("td");
            switch (b) {
                case "幼儿园":
                    e = "1级";
                    break;
                case "小学生":
                    e = "2级";
                    break;
                case "初中生":
                    e = "3级";
                    break;
                case "高中生":
                    e = "4级";
                    break;
                case "大学生":
                    e = "5级";
                    break;
                case "硕士生":
                    e = "6级";
                    break;
                case "博士生":
                case "实习版主":
                case "版主":
                case "审核员":
                    e = "7级";
                    break;
                case "博士后":
                case "超级版主":
                case "网站编辑":
                    e = "8级";
                    break;
                case "管理员":
                case "信息监察员":
                    e = "9级";
                    break;


            }
            d.innerHTML = '<p><a class="dj">' + e + '<\/a><\/p>Lv';
            c.appendChild(d);
        }

    }

    function dom_modify() { //黑名单中需要隐藏的帖子
        try {
            var black_uid_list = localStorage.blacklist.split(",");
        } catch (err) {}

        document.addEventListener('DOMNodeInserted', function (e) {
            try {
                var form_list = document.getElementsByClassName("forumlist_li comiis_znalist bg_f b_t b_b comiis_list_readimgs"); //帖子总体
                var form_list_plate = document.getElementsByClassName("forumlist_li_time"); //板块总体
                for (let i = 0; i < form_list.length; i++) {
                    var form_list_plate_text = form_list_plate[i].textContent;
                    try {
                        var plate_name = form_list_plate_text.match(mt_config.rexp.forum_plate_text)[0];
                    } catch (err) {}
                    try {
                        var mt_uid = form_list[i].getElementsByTagName("a")[0].href.match(mt_config.rexp.mt_uid)[1]
                    } catch (err) {} //当前for一层的uid
                    switch (plate_name) {
                        case "逆向教程":
                            if (localStorage.v7) {
                                form_list[i].remove()
                            };
                            break;
                        case "资源共享":
                            if (localStorage.v8) {
                                form_list[i].remove()
                            };
                            break;
                        case "休闲灌水":
                            if (localStorage.v9) {
                                form_list[i].remove()
                            };
                            break;
                        case "求助问答":
                            if (localStorage.v10) {
                                form_list[i].remove()
                            };
                            break;
                        case "综合交流":
                            if (localStorage.v11) {
                                form_list[i].remove()
                            };
                            break;
                        case "编程开发":
                            if (localStorage.v12) {
                                form_list[i].remove()
                            };
                            break;
                        case "玩机教程":
                            if (localStorage.v13) {
                                form_list[i].remove()
                            };
                            break;
                        case "建议反馈":
                            if (localStorage.v14) {
                                form_list[i].remove()
                            };
                            break;
                    }
                    if (black_uid_list.length > 0) {
                        for (let j = 0; j < black_uid_list.length; j++) {
                            if (black_uid_list[j] == mt_uid) {
                                form_list[i].remove()
                            }
                        }
                    }
                } //for处
            } catch (err) {
                console.log("删除出错", e)
            }
        }, false); //function(e)处



    }

    function insert_blacklist() { //在个人信息页面添加一个拉黑名单
        //当前页面是否是个人信息页面
        try {
            // var a = document.querySelector("#home > div.comiis_body > div.comiis_bodybox > form > div.comiis_crezz.comiis_input_style.mt15.b_t.bg_f.cl");
            var a = document.getElementsByClassName("comiis_crezz comiis_input_style mt15 b_t bg_f cl")[0];
            var b = document.createElement("li");
            var c = document.createElement("li");
            b.className = "comiis_stylitit bg_e b_b f_c cl"; //标题
            c.className = "comiis_styli b_b cl"; //输入框
            b.innerHTML = "黑名单";
            c.innerHTML = `<textarea name="blacklist" id="blacklistall" class="comiis_pxs" style="width:90%;resize:none;opacity: 0.7;" placeholder="输入想要拉黑的用户的uid，多个uid用逗号分隔，如1234,5678,9231"></textarea>`;
            a.appendChild(b);
            a.appendChild(c);
            document.getElementById("profilesubmitbtn").addEventListener("click", function () {
                var a = document.querySelector("#blacklistall").value;
                localStorage.setItem("blacklist", a)
            }) //给保存追加点击事件本地保存黑名单
            document.querySelector("#blacklistall").textContent = localStorage.blacklist;
        } catch (err) {
            console.log("插入黑名单失败")
        }
    }

    function uid_display(mt_uid_obj, insert_option) { //显示帖子人的uid
        // var a = document.getElementsByClassName("comiis_verify");
        // var i = 0;
        // if(a.length>1){
        //     for (i = 0; i < a.length; i++) {
        //         var b = document.createElement("a");
        //         var c = document.getElementsByClassName("comiis_postli_top bg_f b_t")[i].getElementsByTagName("a")[0].href.match(/\d+/)[0]; //每组uid
        //         b.style = `font: 13px 隶书;background: rgb(255, 118, 0);margin-left: 4px;padding: 0px 3px;color: white;float: left;margin-top: 1px;height: 14px;line-height: 15px;border-radius: 1.5px;`;
        //         b.innerHTML = "uid：" + c;
        //         a[i].parentElement.insertBefore(b, a[i]);
        //     }
        // }
        for (let i = 0; i < mt_uid_obj.length; i++) {
            if (mt_uid_obj[i].parentElement.getElementsByClassName("mt_uid_set").length == 0) {
                let mt_uid_master = mt_uid_obj[i].parentElement.getElementsByTagName("a");
                let mt_uid = null;
                for (let j = 0; j < mt_uid_master.length; j++) {
                    let mt_uid_url = mt_uid_master[j].href;
                    let match_uid = mt_uid_url.match(mt_config.rexp.mt_uid);
                    if (match_uid) {
                        mt_uid = match_uid[1]
                    }
                }
                if (mt_uid == null) {
                    continue;
                }
                // let mt_uid = mt_uid_obj[i].parentElement.getElementsByTagName("a")[1].href.match(mt_config.rexp.mt_uid)[1]; //获取href中uid
                let uid_control = document.createElement("a");
                uid_control.className = "mt_uid_set";
                let uid_control_margin_top = "1px;";
                if (insert_option == "append") {
                    uid_control_margin_top = "2px;"
                }
                uid_control.style = `
                font: 13px 隶书;
                background: rgb(255, 118, 0);
                margin-left: 4px;
                padding: 0px 3px;
                color: white;
                float: left;
                margin-top: ${uid_control_margin_top}
                height: 14px;
                line-height: 15px;
                border-radius: 1.5px;`;
                uid_control.innerHTML = "UID:" + mt_uid;
                uid_control.onclick = function () {
                    try {
                        GM_setClipboard(mt_uid);
                        iosOverlay({
                            text: mt_uid + "已复制",
                            duration: 2000,
                            icon: "https://whitesev.gitee.io/static_resource/ios_loading/img/check.png"
                        });
                        console.log("复制:", mt_uid)
                    } catch (err) {
                        iosOverlay({
                            text: mt_uid + "复制失败",
                            duration: 2000,
                            icon: "https://whitesev.gitee.io/static_resource/ios_loading/img/cross.png"
                        });

                    }

                }
                if (insert_option == "append") {
                    mt_uid_obj[i].parentElement.appendChild(uid_control);
                } else {
                    mt_uid_obj[i].parentElement.insertBefore(uid_control, mt_uid_obj[i]);
                }
            }

        }


    }

    function remove_blacklist_user() {
        try {
            // var a = document.getElementsByClassName("comiis_postli comiis_list_readimgs nfqsqi"); //所有评论本体
            for (let i = 0; i < mt_config.dom_obj.comiis_postli().length; i++) {
                var mt_uid = mt_config.dom_obj.comiis_postli()[i].getElementsByClassName("postli_top_tximg bg_e")[0].href.match(mt_config.rexp.mt_uid)[1]; //本体里的href里面的uid
                if (mt_uid == localStorage.blacklist) {
                    mt_config.dom_obj.comiis_postli()[i].remove();
                }
            }

        } catch (err) {}
    }

    function replace_a() {
        var i = 0;
        var a = document.getElementsByClassName("comiis_messages comiis_aimg_show cl");
        for (i = 0; i < a.length; i++) {
            try {
                var b = a[i].getElementsByTagName("a"); //a标签
            } catch (err) {}
            var j = 0;
            for (j = 0; j < b.length; j++) {
                try {
                    var c = b[j].href.match(mt_config.rexp.home_space_pc_uid_url); //匹配空间链接
                    if (c) {
                        b[j].href = "https://bbs.binmt.cc/home.php?mod=space&uid=" + c[1] + "&do=profile&from=space";
                    }
                } catch (err) {}
            }
        }

    }

    function auto_open() { //自动展开
        var comiis_lookfulltext_box = $('.view_one .comiis_messages,div.display:first,.view_body');
        $('.comiis_lookfulltext_key,.comiis_lookfulltext_bg').remove();
        comiis_lookfulltext_box.css({
            'max-height': 'inherit',
            'overflow-y': 'inherit',
            'position': 'inherit'
        });
    }

    function img_width() { //图片宽度
        try {
            var img = $("img");
            var img_num = 0;
            var window_width = window.screen.width;
            for (img_num = 0; img_num < img.length; img_num++) {
                if (img[img_num].id != "") {
                    console.log(img[img_num].width);
                    if (img[img_num].width > window_width) {
                        img[img_num].style.width = "100%";
                    }
                }
            }
            console.log(window_width);
        } catch (err) {
            console.log(err);
        }

    }

    function preview_picture() { //在帖子外部预览帖子内高清图片
        let master_dom = mt_config.dom_obj.post_bottom_controls();
        if (master_dom.length) {
            GM_addStyle(`
            .comiis_znalist_bottom li{
                width:24% !important;
            };`);
            img_js_css();
            let pre_dom = document.createElement("div");
            pre_dom.id = "picture_review";
            document.body.append(pre_dom);
            for (var i = 0; i < master_dom.length; i++) {
                let ul_dom = master_dom[i].getElementsByTagName("ul")[0];
                let topre = document.createElement("li");
                let comiss_listimg = master_dom[i].parentElement.getElementsByClassName("comiis_pyqlist_img");
                let comiss_listimgs = master_dom[i].parentElement.getElementsByClassName("comiis_pyqlist_imgs");
                let comiss_img = null;
                if (comiss_listimg.length) {
                    comiss_img = comiss_listimg[0]
                } else if (comiss_listimgs.length) {
                    comiss_img = comiss_listimgs[0]
                } else {
                    console.log("该帖子内无图片");
                    topre.className = "f_c";
                    topre.style = "border-left:1px solid #efefef";
                    topre.innerHTML = `
                        <a class="nopicturepre">无图预览</a>
                        `;
                    ul_dom.append(topre);
                    continue;
                }
                topre.className = "f_c";
                topre.style = "border-left:1px solid #efefef";
                topre.innerHTML = `
                    <a class="topreimg">预览图片</a>
                    <div class="haspicture" style="display:none">` + comiss_img.innerHTML + `</div>
                    `;
                ul_dom.append(topre);

            }
            $(".topreimg").click(function () {
                let img_list = $(this)[0].nextElementSibling.getElementsByTagName("img");
                let img_items = [];
                let now_picture_num = 1;
                for (var k = 0; k < img_list.length; k++) {
                    let img_url = img_list[k].src;
                    let img_dict = {};
                    let full_picture = null;

                    if (img_url.match(/mt2.cn/g)) {
                        full_picture = img_url.replace(/_[\d]*_[\d]*.jpg/, "_600_1000.jpg");
                        console.log("oss图");
                    } else if (img_url.match(/forum.php/g)) {
                        full_picture = img_url.replace(/size=[\d]*x[\d]*/, "size=600x1000");
                        console.log("帖子图");
                    } else {
                        console.log("原缩略图");
                        full_picture = img_url;
                    }
                    img_dict["src"] = full_picture;
                    img_dict["srct"] = img_url;
                    img_dict["title"] = "图片" + now_picture_num.toString();
                    img_items.push(img_dict);
                    now_picture_num = now_picture_num + 1;

                }
                console.log(img_items);
                $("#picture_review").children().remove();
                jQuery("#picture_review").nanoGallery({
                    thumbnailWidth: 100,
                    thumbnailHeight: 100,
                    items: img_items
                });
                var openpicture = setInterval(function () {
                    try {
                        $(".container")[0].click();
                        clearInterval(openpicture);
                    } catch (err) {
                        console.log("图片暂未生成");
                    }

                }, 100)

            })
        }



    }

    function post_setting_js() { //帖子内需要重复加载的脚本
        if (localStorage.v6) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    reviews()
                } catch (err) {
                    console.log("插入点评错误:", err);
                }
                // reviews_all_click();
            }
        }
        if (localStorage.v2) {
            try {
                link()
            } catch (err) {
                console.log("识别链接错误:", err);
            }

        }
        if (localStorage.v15) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    uid_display(mt_config.dom_obj.comiis_verify(), "insert");
                    remove_blacklist_user();
                    remove_blacklist_user()
                } catch (err) {
                    console.log("显示UID、移除黑名单的人错误:", err);
                }

            }
            if (location.href.match(mt_config.rexp.forum_post_guide_url)) {
                try {
                    dom_modify()
                } catch (err) {
                    console.log("移除黑名单中需要隐藏的隐藏的帖子错误:", err);
                }

            }
        }
        if (localStorage.v3) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    show_black()
                } catch (err) {
                    console.log("显示黑色字体错误:", err);
                }

            }
        }
    }

    function auto_load_all_comment() { //自动加载所有的评论
        var post_comments_list = $(".comiis_page.bg_f"); //评论列表
        if (post_comments_list.length) {
            var next_page_url = $(".comiis_page.bg_f").children()[2].href;
            var isloding_flag = false;
            console.log("初始下一页url", next_page_url);
            let tip_html = `<div class="comiis_multi_box bg_f b_t" style="display:none">
            <label class="comiis_loadbtn bg_e f_d" id="loading-comment-tip"></label></div>`;
            let comment_list = $(".comiis_multi_box.bg_f.b_t.b_b.mb10"); //
            comment_list.hide();
            $(".comiis_bodybox").append($(tip_html));
            $(window).bind("scroll", function () {
                // scroll at bottom
                if (Math.ceil($(window).scrollTop() + $(window).height()) >= $(document).height()) {
                    // load data
                    if (isloding_flag == false) {
                        isloding_flag = true;
                        $("#loading-comment-tip").text("正在加载评论中...");
                        $("#loading-comment-tip")[0].parentElement.style.display = "";
                        $.get(next_page_url, function (data, status, xhr) {
                            console.log("正在请求的下一页url", next_page_url);
                            let postlist = $(data);
                            let kqideSourceNode = $(".comiis_postlist.kqide");
                            let postDOM = postlist.find(".comiis_postlist.kqide").html();
                            let get_next_page_url = postlist.find(".nxt");
                            if (get_next_page_url.length != 0) {
                                console.log("成功获取到下一页-评论");
                                next_page_url = get_next_page_url.attr("href");
                                $("#loading-comment-tip")[0].parentElement.style.display = "none";
                            } else {
                                console.log("评论全部加载完毕，关闭监听事件");
                                $("#loading-comment-tip").text("已加载完所有评论")
                                $("#loading-comment-tip")[0].parentElement.style.display = "";
                                $(window).unbind();
                            }
                            isloding_flag = false;
                            kqideSourceNode.append(postDOM);
                            post_setting_js();
                        })

                    } else {
                        console.log("正在加载中请稍后");
                    }


                }
            })
        } else {
            console.log("无多页评论");
        }
    }

    function mobile_all_setting() {
        if (location.href.match(mt_config.rexp.home_url)) {
            try {
                insert_blacklist()
            } catch (err) {
                console.log("插入黑名单错误:", err);
            }

        }
        if (localStorage.v6) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    reviews()
                } catch (err) {
                    console.log("插入点评错误:", err);
                }
                // reviews_all_click();
            }
        }
        if (localStorage.v16) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    img_width()
                } catch (err) {
                    console.log("恢复图片宽度错误:", err);
                }

            }
        }
        if (localStorage.v2) {
            try {
                link()
            } catch (err) {
                console.log("识别链接错误:", err);
            }

        }
        if (localStorage.v4) {
            try {
                apply_none()
            } catch (err) {
                console.log("添加隐藏内容错误:", err);
            }

        }
        if (localStorage.v5) {
            if (location.href.match(/forum\.php\?mod=post\&action=newthread/g)) {
                try {
                    insert_empty_title()
                } catch (err) {
                    console.log("插入空标题错误:", err);
                }

            }
        }
        if (localStorage.v15) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    uid_display(mt_config.dom_obj.comiis_verify(), "insert");
                    remove_blacklist_user();
                    remove_blacklist_user()
                } catch (err) {
                    console.log("显示UID、移除黑名单的人错误:", err);
                }

            }
            if (location.href.match(mt_config.rexp.forum_guide_url)) {
                try {
                    comiis_list_page = function () {
                        comiis_ispage = 1;
                        if (comiis_page < 12) {
                            $('.comiis_multi_box').html('<div class="comiis_loadbtn f_d">正在加载...</div>');
                            $.ajax({
                                type: 'GET',
                                url: 'forum.php?mod=guide&view=newthread&index=1&page=' + (comiis_page + 1) + '&inajax=1',
                                dataType: 'xml',
                            }).success(function (s) {
                                if (typeof (s.lastChild.firstChild.nodeValue) != "undefined") {
                                    comiis_page++;
                                    $('#list_new').append(s.lastChild.firstChild.nodeValue);
                                    uid_display(mt_config.dom_obj.comiis_formlist(), "append");
                                    remove_blacklist_user();
                                    remove_blacklist_user();
                                    if (comiis_page >= 12) {
                                        $('.comiis_multi_box').html('<div class="comiis_loadbtn f_d">亲，已经到底了！</div>');
                                    } else {
                                        $('.comiis_multi_box').html('<a href="javascript:;" onclick="comiis_list_page()" class="comiis_loadbtn bg_e f_d">点击加载更多</a>');
                                    }
                                    comiis_redata_function();
                                } else {
                                    comiis_page--;
                                    $('.comiis_multi_box').html('<a href="javascript:;" onclick="comiis_list_page()" class="comiis_loadbtn bg_e f_d">重新加载</a>');
                                }
                                comiis_ispage = 0;
                            }).error(function () {
                                comiis_page--;
                                $('.comiis_multi_box').html('<a href="javascript:;" onclick="comiis_list_page()" class="comiis_loadbtn bg_e f_d">重新加载</a>');
                                comiis_ispage = 0;
                            });
                        }
                    }
                } catch (err) {
                    console.log("当前页面不存在该方法");
                }
                try {
                    uid_display(mt_config.dom_obj.comiis_formlist(), "append");
                    remove_blacklist_user();
                    remove_blacklist_user()
                } catch (err) {
                    console.log("显示UID、移除黑名单的人错误:", err);
                }

            }
        }
        if (location.href.match(mt_config.rexp.forum_post_guide_url)) {
            try {
                dom_modify()
            } catch (err) {
                console.log("移除黑名单中需要隐藏的隐藏的帖子错误:", err);
            }

        }
        // if (location.href.match(/forum.php\?mod=guide&view/g)) {
        //     document.querySelector("#forum > div.comiis_body > div.comiis_bodybox > div:nth-child(2)").remove()
        // }
        if (localStorage.v1) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    remove_post_content_font_special()
                } catch (err) {
                    console.log("移除帖子内容特殊字体错误:", err);
                }

            }
        }

        if (localStorage.v3) {
            if (location.href.match(mt_config.rexp.forum_post)) {
                try {
                    show_black()
                } catch (err) {
                    console.log("显示黑色字体错误:", err);
                }

            }
        }
        if (localStorage.v17) {
            if (GM_getValue("mt_sign") != getLocalTime()) {
                if (location.href.match(mt_config.rexp.home_kmisign_url)) {
                    // if (document.getElementsByClassName("sidenv_user")[0].href != location.origin + "/member.php?mod=logging&action=login&mobile=2") {
                    if (document.getElementsByClassName("sidenv_user")[0].href.match(mt_config.rexp.nologin) == null) {
                        console.log("今天尚未签到，开始签到 mobile")
                        try {
                            let getMTFormHash = mt_getFormHash_mobile()
                            auto_sign(getMTFormHash)
                        } catch (err) {
                            console.log("签到失败", err)
                        }

                    } else {
                        console.log("当前账号未登录 mobile")
                    }

                } else {
                    console.log("当前不在主页 mobile")
                }

            } else {
                console.log("已签到")
            }
        } else {
            console.log("尚未开启每日自动签到")
        }
        if (localStorage.v18 && location.href.match(mt_config.rexp.forum_post)) {
            try {
                var mt_tz_loadtimes = 0;
                var mt_tz_loadInterval = setInterval(function () {
                    auto_open();
                    mt_tz_loadtimes = mt_tz_loadtimes + 1;
                    if (mt_tz_loadtimes >= 3) {
                        clearInterval(mt_tz_loadInterval);
                    }
                }, 800)
            } catch (err) {
                console.log("自动展开失败", err);
            }

        }
        if (localStorage.v19 && location.href.match(mt_config.rexp.search_url)) {
            try {
                search_event();
                add_search_history();
                add_clear_history();
            } catch (err) {
                console.log("搜索界面错误", err);
            }
        }
        if (localStorage.v20 && location.href.match(mt_config.rexp.forum_guide_url)) {
            try {
                preview_picture();
            } catch (err) {
                console.log("预览图片插件加载失败", err);
            }
        }
        if (localStorage.v21 && window.location.href.match(mt_config.rexp.forum_post_pc)) {
            try {
                auto_load_all_comment()
            } catch (err) {
                console.log("自动加载评论失败", err)
            }
        }


    }

    function img_js_css() { //加载预览图片的插件
        var img_js_nanogallery = document.createElement("script");
        var img_js_jsonp = document.createElement("script");
        var img_css = document.createElement("link");

        img_js_nanogallery.src = "https://cdn.jsdelivr.net/gh/893177236/Monkey_script/jquery.nanogallery.js";
        img_js_jsonp.src = "https://cdn.jsdelivr.net/gh/893177236/Monkey_script/jquery.jsonp.js";

        img_js_nanogallery.type = "text/javascript";
        img_js_jsonp.type = "text/javascript";

        img_css.rel = "stylesheet";
        img_css.type = "text/css";
        img_css.href = "https://cdn.jsdelivr.net/gh/893177236/Monkey_script/css/nanogallery.css";

        // document.head.appendChild(img_js_jsonp);
        // document.head.appendChild(img_js_nanogallery);
        document.head.appendChild(img_css);
    }

    function ios_js_css() {
        var ios_js = document.createElement("script");
        var ios_css = document.createElement("link");

        ios_js.src = "https://whitesev.gitee.io/static_resource/ios_loading/js/iosOverlay.js";

        ios_js.type = "text/javascript";

        ios_css.rel = "stylesheet";
        ios_css.type = "text/css";
        ios_css.href = "https://whitesev.gitee.io/static_resource/ios_loading/css/iosOverlay.css";

        document.head.appendChild(ios_js);
        document.head.appendChild(ios_css);
    }

    function set_PC_js() {
        var a = document.createElement("script");
        var b = document.createElement("script");
        a.src = "https://cdn2.bbs.binmt.cc/static/js/smilies.js?x6L";
        b.src = "https://cdn2.bbs.binmt.cc/static/js/common.js?x6L";
        a.type = "text/javascript";
        b.type = "text/javascript";
        document.head.appendChild(a);
        document.head.appendChild(b);
    }

    function np() { //这是入口
        var usa = navigator.userAgent.match(mt_config.rexp.pc_useragent);
        if (usa != null) {
            try {
                set_PC_js()
            } catch (err) {
                console.log("set_PC_js()加载失败")
            }
            $(document).ready(function () {
                try {
                    Latest_publication()
                } catch (err) {
                    console.log("Latest_publication()加载失败")
                }
                try {
                    link()
                } catch (err) {
                    console.log("link()加载失败")
                }
                if (window.location.href.match(mt_config.rexp.forum_post_pc)) {
                    //online_status();//开启探测在线状态,不需要显示在线状态就注释此行,默认不开启
                }
                try {
                    collect()
                } catch (err) {
                    console.log("collect()加载失败")
                }
                try {
                    reply_space()
                } catch (err) {
                    console.log("reply_space()加载失败")
                }
                try {
                    quick_reply()
                } catch (err) {
                    console.log("quick_reply()加载失败")
                }
                try {
                    user_level()
                } catch (err) {
                    console.log("user_level()加载失败")
                }
                try {
                    if (GM_getValue("mt_sign") != getLocalTime()) {
                        if ((location.href == location.origin + "/") || (location.href == location.origin + "/forum.php")) {
                            if (!document.querySelector("div[class=comiis_dlq]>a")) {
                                let getMTFormHash = mt_getFormHash_pc()
                                auto_sign(getMTFormHash)
                            } else {
                                console.log("当前账号尚未登录")
                            }
                        } else {
                            console.log("当前不在主页 pc")
                        }
                    } else {
                        console.log("今日已签到")
                    }
                } catch (err) {
                    console.log("auto_sign() pc执行失败")
                }
            });
        } else {
            try {
                set_css()
            } catch (err) {
                console.log("set_css()加载失败")
            }
            $(document).ready(function () {
                try {
                    replace_a()
                } catch (err) {
                    console.log("replace_a()加载失败")
                }
                try {
                    new_thread()
                } catch (err) {
                    console.log("new_thread()加载失败")
                }
                try {
                    mobile_all_setting()
                } catch (err) {
                    console.log("mobile_all_setting()加载失败");
                    console.log(err)
                }
                try {
                    insert_checked_select()
                } catch (err) {
                    console.log("insert_checked_select()加载失败")
                }
                // try {
                //     insert_tips()
                // } catch (err) {
                //     console.log("insert_tips()加载失败")
                // }
                try {
                    set_display_last_click()
                } catch (err) {
                    console.log("set_display_last_click()加载失败")
                }
                try {
                    set_select_clicked()
                } catch (err) {
                    console.log("set_select_clicked()加载失败")
                }
                try {
                    set_checked_clicked()
                } catch (err) {
                    console.log("set_checked_clicked()加载失败")
                }
                try {
                    set_select_change_clicked()
                } catch (err) {}
                try {
                    ios_js_css()
                } catch (err) {
                    console.log("set_select_change_clicked()加载失败")
                }

                try {
                    if (window.location.href.match(/bbs\.binmt\.cc\/home\.php\?mod=spacecp/g)) {
                        console.log("监听改变")
                        document.getElementsByClassName("swiper-wrapper")[0].children[2].addEventListener("click", function () {
                            console.log("修改");
                            window.location.href = "/home.php?mod=spacecp&ac=profile&op=info";
                        })
                    }


                } catch (err) {
                    console.log("添加点击事件失败insert_blacklist()");
                    console.log(err);
                }

            })

        }
    } //function np()的结束处
    GM_addStyle(`
    .f_d.y,
    .top_user.f_b,
    .comiis_a.comiis_message_table.cl,
    .f_c.dialog>i,
    .bg_f.b_ok,
    .bg_f.f_c.b_ok.comiis_openrebox>i,
    .bg_f.f_c.b_ok.comiis_openrebox>em,
    .comiis_font.f_b,
    .comiis_font.bg_e.b_l{
        font-weight:100;
    };
    .comiis_message.bg_f.view_all.cl.message{
        font-weight:100;
        padding:0px;
    }`);
    $(document).ready(function () {
        np()
    });

})();