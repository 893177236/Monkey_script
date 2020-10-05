// ==UserScript==
// @name         MT论坛
// @namespace    http://tampermonkey.net/
// @description  MT论坛优化
// @version      1.7.6.9
// @author       MT-戒酒的李白染
// @icon         https://bbs.binmt.cc/favicon.ico
// @match        *://bbs.binmt.cc/*
// @compatible   edge Beta/Dev/Candy 测试通过
// @compatible   火狐 测试通过
// @compatible   Yandex 测试通过
// @grant        none
// @supportURL   https://github.com/893177236/Monkey_script
// @require	 http://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// ==/UserScript==
// @compatible   只是测试了一下idea的push

(function() {
    'use strict';

    function Latest_publication(){
        var ele = document.createElement('li');
        var url = window.location.href;
        ele.id = "latest_publication";
        ele.innerHTML = '<a href="https:\/\/bbs.binmt.cc\/forum.php?mod=guide&view=newthread" hidefocus="true" title="最新发表">最新发表<\/a>';
        document.getElementsByClassName("wp comiis_nvbox cl")[0].children[1].appendChild(ele);
        if(url=='https:\/\/bbs.binmt.cc\/forum.php?mod=guide&view=newthread')
        {
            document.getElementById("mn_forum_10").children[0].style="background: url(";
            ele.style.cssText='background: url("https:\/\/cdn2.bbs.binmt.cc\/template\/comiis_mi\/img\/nv_a.png") repeat-x 50% -50px;';

        }
    }

    function insert_empty_title(){
        if(location.href.match(/mod=post&action=newthread&fid=50/g)!=null){
        var a = document.createElement("div");
        var b = document.querySelector("#postform > div > div:nth-child(5)");
        a.className="comiis_btnbox cl";
        a.innerHTML='<button class="comiis_btn formdialog bg_c f_f" id="postsubmit2">发表(空标题)<\/button>';
        b.parentElement.insertBefore(a,b);
        document.getElementById("postsubmit2").onclick=function()
            {
                document.getElementsByClassName("flex f17")[0].children[0].parentNode.hidden=true;
                document.getElementsByClassName("flex f17")[0].children[0].value="😊";
            }

        }
    }

    function remove_post_content_font_special(){
        var rule = /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g;
        var h_content = document.getElementsByClassName("comiis_a comiis_message_table cl");
        h_content[0].innerHTML = h_content[0].innerHTML.replace(rule,'');
    }

    function apply_none(){

        if(location.href.match(/bbs.binmt.cc\/thread/g)!=null)
        {
            var a = document.createElement("span");
            var b = document.querySelector("#fastpostform > div.comiis_post_ico.comiis_minipost_icot.f_c.cl");
            a.id = "fastpostsubmitline2";
            a.className="y";
            a.innerHTML='<input type="button" value="添加隐藏内容" class="bg_0 f_f">';
            b.appendChild(a);
            document.querySelector("#fastpostsubmitline2 > input").onclick=function ()
            {
                document.querySelector("#needmessage").value=document.querySelector("#needmessage").value+"🤣🤣🤣🤣🤣";
            }
        }
        if(location.href.match(/forum.php\?mod=post&action=reply/g)!=null)
           {
               var c = document.createElement("span");
               var d = document.getElementsByClassName("swiper-wrapper comiis_post_ico")[0];
               c.id = "fastpostsubmitline2";
               c.className="y";
               c.innerHTML='<input type="button" value="添加隐藏内容" class="bg_0 f_f">';
               d.appendChild(c);
               document.querySelector("#fastpostsubmitline2 > input").onclick=function()
               {
                   document.querySelector("#needmessage").value=document.querySelector("#needmessage").value+"🤣🤣🤣🤣🤣";
               }
           }

    }
    function set_css(){
        var a = document.createElement("style");
        var b = document.head;
	var c = document.createElement("script");
	var image = document.createElement("script");
	var file = document.createElement("script");
	c.src = "https://cdn2.bbs.binmt.cc/template/comiis_app/comiis/js/common_u.js?EPT:formatted";//可能是论坛引入的js么有加载，顾重新引入
	image.src = "https://cdn2.bbs.binmt.cc/template/comiis_app/comiis/js/buildfileupload.js?EPT"; 
	file.src="https://cdn.bbs.binmt.cc/static/js/mobile/ajaxfileupload.js?EPT";
     
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
		b.appendChild(a);//把a看成b弄错了
		b.appendChild(c);
		b.appendChild(image);
		b.appendChild(file);

    }

    function set_select_clicked(){
        document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").onclick=function(){
        var a = document.getElementsByClassName("switch_1")[0];
        var b = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;
	if(localStorage.getItem(b)){
            a.checked = true;
        }else{
            a.checked = false;
        }
        }

    }
    function set_select_change_clicked(){
    	$('.beauty-select').change(function(){
	   var select_value = $('.beauty-select').val();
           var a = document.getElementsByClassName("switch_1")[0];
	   localStorage.setItem("last",select_value);
           if(localStorage.getItem(select_value)){
                a.checked = true;
           }else{
                a.checked = false;
           }
	});

    }
    function set_checked_clicked(){
        document.getElementsByClassName("switch_1")[0].onclick=function(){
            var a = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;
            var b = localStorage.getItem(a);
	    if(b){
                localStorage.removeItem(a);
            }else{
                localStorage.setItem(a, "true");
            }
	    var c = localStorage.getItem(a);
            var d = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").selectedIndex;//当前索引值
            var e = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").options[d].text;//当前索引对应的文本
            if(c){
                iosOverlay({
                        text: e+"已开启",
                        duration: 2000,
                        icon: "https://whitesev.gitee.io/static_resource/ios_loading/img/check.png"
                    });
            }else{
                iosOverlay({
                        text: e+"已关闭",
                        duration: 2000,
                        icon: "https://whitesev.gitee.io/static_resource/ios_loading/img/check.png"
                    });
            }
            setTimeout(function(){location.reload()},2000);

        }

    }

    function set_display_last_click(){
        var a = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select");
        var b = localStorage.last;
        var c = document.getElementsByClassName("switch_1")[0];
	a.value=b;
        if(localStorage.getItem(b)){
            c.checked=true;
        }else{
            c.checked=false;
        }
    }

    function insert_tips(){
        var a = document.createElement("li");
        var b = document.querySelector("#comiis_menu_vtr_menu > ul");
        a.className="f_b";
        a.innerHTML='<p style="text-align: center;">Tip:点击按钮将自动刷新<\/p>';
        b.appendChild(a);
    }
    function insert_checked_select(){

        if(location.href.match(/bbs.binmt.cc\/(thread|forum)/g)!=null)
        {
            var c = document.createElement("li");
            var f = document.createElement("li");
            c.className="f_b";
            f.className="f_b";
            f.style="text-align: center;";
            c.innerHTML='<select style="vertical-align: top;" class="beauty-select">'+
                        '<option value="v1">移除帖子字体效果<\/option>'+
                        '<option value="v2">开启识别链接<\/option>'+
                        '<option value="v3">移除评论区字体效果<\/option>'+
                        '<option value="v4">开启回复一键隐藏<\/option>'+
                        '<option value="v5">开启灌水帖隐藏标题<\/option>'+
                        '<option value="v6">开启点评<\/option>'+
                        '<option value="v7">关闭逆向教程<\/option>'+
                        '<option value="v8">关闭资源共享<\/option>'+
                        '<option value="v9">关闭休闲灌水<\/option>'+
                        '<option value="v10">关闭求助问答<\/option>'+
                        '<option value="v11">关闭综合交流<\/option>'+
                        '<option value="v12">关闭编程开发<\/option>'+
                        '<option value="v13">关闭玩机教程<\/option>'+
                        '<option value="v14">关闭建议反馈<\/option>'+
		        '<option value="v15">显示帖子的uid<\/option>'+
		    	'<option value="v16">恢复图片宽度<\/option>'+
                        '<\/select>';
            f.innerHTML='<input type="checkbox" class="switch_1">';
            document.getElementsByClassName("comiis_memu_y bg_f nfqsqi comiis_menu_style")[0].children[0].appendChild(c);
            document.getElementsByClassName("comiis_memu_y bg_f nfqsqi comiis_menu_style")[0].children[0].appendChild(f);
            var a = document.getElementsByClassName("switch_1")[0];
            var b = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;
	    if(localStorage.getItem(b)!=null){
	        a.checked = true;
            }else{
                a.checked = false;
            }
        }
    }


    function link(){
        var clearLink, excludedTags, filter, linkMixInit, linkPack, linkify, observePage, observer, setLink, url_regexp, xpath;
        url_regexp = /((https?:\/\/|www\.)[\x21-\x7e]+[\w\/]|(\w[\w._-]+\.(com|cn|org|net|info|tv|cc))(\/[\x21-\x7e]*[\w\/])?|ed2k:\/\/[\x21-\x7e]+\|\/|thunder:\/\/[\x21-\x7e]+=)/gi;
        clearLink = function(a) {
            var b;
            a = null != (b = a.originalTarget) ? b: a.target;
            if (null != a && "a" === a.localName && -1 !== a.className.indexOf("texttolink") && (b = a.getAttribute("href"), 0 !== b.indexOf("http") && 0 !== b.indexOf("ed2k://") && 0 !== b.indexOf("thunder://"))) return a.setAttribute("href", "http://" + b)
        };
        document.addEventListener("mouseover", clearLink);
        setLink = function(a) {
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
        linkPack = function(a, b) {
            var c, d;
            if (b + 1E4 < a.snapshotLength) {
                var e = c = b;
                for (d = b + 1E4; b <= d ? c <= d: c >= d; e = b <= d ? ++c: --c) setLink(a.snapshotItem(e));
                setTimeout(function() {
                    return linkPack(a, b + 1E4)
                    },
                15)
            } else for (e = c = b, d = a.snapshotLength; b <= d ? c <= d: c >= d; e = b <= d ? ++c: --c) setLink(a.snapshotItem(e))
        };
        linkify = function(a) {
            a = document.evaluate(xpath, a, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            return linkPack(a, 0)
        };
        observePage = function(a) {
            for (a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, {
                acceptNode: function(a) {
                    if (!filter.test(a.parentNode.localName)) return NodeFilter.FILTER_ACCEPT
                }
            },
        !1); a.nextNode();) setLink(a.currentNode)
        };
        observer = new window.MutationObserver(function(a) {
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
        linkMixInit = function() {
            if (window === window.top && "" !== window.document.title) return linkify(document.body),
                observer.observe(document.body, {
                childList: !0,
                subtree: !0
            })
        };
        var clearlinkF = function(a) {
            url = a.getAttribute("href");
            if (0 !== url.indexOf("http") && 0 !== url.indexOf("ed2k://") && 0 !== url.indexOf("thunder://")) return a.setAttribute("href", "http://" + url)
        },
        clearlinkE = function() {
            for (var a = document.getElementsByClassName("texttolink"), b = 0; b < a.length; b++) clearlinkF(a[b])
        };
        setTimeout(clearlinkE, 1500);
        setTimeout(linkMixInit, 100);
    }

    function online_status(){
        var quanju = [];
        var cishu = 0;
        for(var sss = document.getElementsByClassName("pls favatar"),ll =0 ; ll<sss.length;ll++){
            var sendmessage = sss[ll].getElementsByClassName("comiis_o cl")
            if(sendmessage.length==0){}else{
                var sendmessageurl = sendmessage[0].getElementsByTagName('a')[1].href;

                let xhr = new XMLHttpRequest();
                xhr.open("GET",sendmessageurl,false);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                         let pattern = /正在.*]/g;
                         let str = xhr.responseText;
                         let newstr = str.match(pattern)[0];
                         quanju.push(newstr);}}
                xhr.send();
                if(quanju[cishu].match('离线')){
                    cishu = cishu+1;
                    var imi2 = document.createElement('img');
                    imi2.src='https:\/\/cdn2.bbs.binmt.cc\/static\/image\/smiley\/doge\/54.png';
                    imi2.smilied='1353';
                    imi2.border="0";
                    imi2.style='float:right';
                    sss[ll].insertAdjacentElement('afterbegin',imi2);}
                else{
                    cishu = cishu+1;
                    var imi = document.createElement('img');
                    imi.src='https:\/\/cdn2.bbs.binmt.cc\/static\/image/smiley\/doge\/35.png';
                    imi.smilied='1384';
                    imi.border="0";
                    imi.style='float:right';
                    sss[ll].insertAdjacentElement('afterbegin',imi);}
             }
          }
    }

    function reviews(){
            var hongbao = document.getElementsByClassName("bottom_zhan y");
            if(hongbao.length ==0){}
            else{
                var cishu2 = 0;
                var replyhref = hongbao[cishu2].getElementsByTagName('a')[1].href;
                var page = replyhref.match('&page=(.*)')[1];
                //console.log(page);
                for(cishu2 =0;cishu2<hongbao.length;cishu2++){
                    var rewardhref = hongbao[cishu2].getElementsByTagName('a')[0].href.replace('rate','comment');
                    var reviews_href = rewardhref + '&extra=page%3D1&page=' + page;
                    //console.log(rewardhref)
                    var oa = document.createElement('a');
                    var ob = document.createElement('i');
                    var lm = document.getElementsByClassName("bottom_zhan y")[cishu2];
                    oa.href = reviews_href;
                    oa.className = "f_c dialog";
                    ob.style = "content: url(https://s1.ax1x.com/2020/04/26/Jcq8VU.png);height: 15px;";
                    ob.className = "comiis_font";
                    ob.innerHTML = "";
                    oa.appendChild(ob);
                    lm.insertAdjacentElement('afterBegin',oa);
                    }
                }
    }

    function new_thread(){
        try{
        document.getElementsByClassName("comiis_mh_tit cl")[1].getElementsByTagName("a")[0].href="https://bbs.binmt.cc/page-4.html";}catch(err){}
    }
    
    function show_black(){
        var hide = document.getElementsByTagName('font');
        var i = 0;
        for(i = 0;i<hide.length;i++)
        {
            hide[i].removeAttribute('color');
            hide[i].removeAttribute('style');
            hide[i].removeAttribute('size');
        }
        
              
        var content = document.getElementsByClassName("comiis_message bg_f view_all cl message");
	var text = document.getElementsByClassName("comiis_a comiis_message_table cl");
        var rule = /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g;
        var j = 0,k=1;
        for(j=0;j<content.length;j++&k++)
        {
            content[j].innerHTML = content[j].innerHTML.replace(rule,'');
	    content[j].style="padding:0px";
            text[k].style="padding:0px 56px";
        }


        
    }
    
    function collect(){
        var own_formhash = document.querySelector("#scform > input[type=hidden]:nth-child(1)").value;
        var collect_href_id = window.location.href.match('thread-(.*?)-')[1];
        var collect_href = 'https:\/\/bbs.binmt.cc\/home.php?mod=spacecp&ac=favorite&type=thread&id='+collect_href_id+'&formhash='+own_formhash;
        var new_collect = document.createElement('span');
        var old_Suspended = document.getElementById("scrolltop");
        new_collect.innerHTML = '<a href="'+collect_href+'" id="k_favorite" onclick="showWindow(this.id, this.href, \'get\', 0);" onmouseover="this.title = $(\'favoritenumber\').innerHTML + \' 人收藏\'" ><img src="https:\/\/s1.ax1x.com\/2020\/04\/29\/JTk3lD.gif" height="26" width="26" style="position:absolute;top:10px;left:11px"><\/a>';
        old_Suspended.insertAdjacentElement('afterBegin',new_collect);
    }

    function reply_space(){
        var a = document.getElementsByClassName("fastre");
        var i =0;
        for(i=0;i<a.length;i++){
        a[i].onclick=function(){
            showWindow('reply', this.href);
            setTimeout('document.querySelector("#moreconf").innerHTML=document.querySelector("#moreconf").innerHTML+\'<button type="button" id = "insertspace" style="float: left;">一键空格<\/button>\';document.querySelector("#insertspace").onclick=function(){document.querySelector("#postmessage").value="           "}'
             ,150)}
        }


    }

    function quick_reply(){
        document.querySelector("#scrolltop > span:nth-child(2) > a").onclick=function()
        {
            showWindow('reply', this.href);var a = document.querySelector("#postsubmit");
            setTimeout(
                'document.querySelector("#moreconf").innerHTML=document.querySelector("#moreconf").innerHTML+\'<button type="button" id = "insertspace2" style="float: left;">一键空格<\/button>\';document.querySelector("#insertspace2").onclick=function(){document.querySelector("#postmessage").value=document.querySelector("#postmessage").value+"           ";}'
            ,200)}


    }

    function user_level(){
        var a = document.getElementsByClassName("pls favatar");
        var i = 0;
        var e = "0级";
        for(i=0;i<a.length;i++){
            var b = a[i].getElementsByTagName("em")[1].outerText;
            var c = a[i].getElementsByTagName("tr")[0];
            var d = document.createElement("td");
            switch(b){
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
                case "博士生":case "实习版主":case "版主":case "审核员":
                    e = "7级";
                    break;
                case "博士后":case "超级版主":case "网站编辑":
                    e = "8级";
                    break;
                case "管理员":case "信息监察员":
                    e = "9级";
                    break;


            }
            d.innerHTML = '<p><a class="dj">'+e+'<\/a><\/p>Lv';
            c.appendChild(d);
        }

    }

    function dom_modify(){
	try{var g = localStorage.blacklist.split(",");}catch(err){}
        try{
        document.addEventListener('DOMNodeInserted',function(e){
            var a = document.getElementsByClassName("forumlist_li comiis_znalist bg_f b_t b_b comiis_list_readimgs");//帖子总体
            var b = document.getElementsByClassName("forumlist_li_time");//板块总体
            var i = 0,j=0;
            for(i=0;i<a.length;i++){
                var c = b[i].textContent;
		try{var d = c.match(/休闲灌水|求助问答|逆向教程|资源共享|综合交流|编程开发|玩机教程|建议反馈/g)[0];}catch(err){}
		try{var f = a[i].getElementsByTagName("a")[0].href.match(/\d+/)[0]}catch(err){}//当前for一层的uid
                switch(d){
                    case "逆向教程":
                        if(localStorage.v7){a[i].remove()};
                        break;
                    case "资源共享":
                        if(localStorage.v8){a[i].remove()};
                        break;
                    case "休闲灌水":
                        if(localStorage.v9){a[i].remove()};
                        break;
                    case "求助问答":
                        if(localStorage.v10){a[i].remove()};
                        break;
                    case "综合交流":
                        if(localStorage.v11){a[i].remove()};
                        break;
                    case "编程开发":
                        if(localStorage.v12){a[i].remove()};
                        break;
                    case "玩机教程":
                        if(localStorage.v13){a[i].remove()};
                        break;
                    case "建议反馈":
                        if(localStorage.v14){a[i].remove()};
                        break;
                }
		    if(g.length>0){
                    	for(j=0;j<g.length;j++){
                        	if(g[j]==f){
                         	   a[i].remove()
                      			}
                    		}
               		}
       	   }//for处
        },false);//function(e)处


        }catch(err){}
    }
	function insert_blacklist(){//在个人信息页面添加一个拉黑名单
            //当前页面是否是个人信息页面
        	try{
		    var a = document.querySelector("#home > div.comiis_body > div.comiis_bodybox > form > div.comiis_crezz.comiis_input_style.mt15.b_t.bg_f.cl");
		    var b = document.createElement("li");
		    var c = document.createElement("li");
		    b.className = "comiis_stylitit bg_e b_b f_c cl";//标题
		    c.className = "comiis_styli b_b cl";//输入框
		    b.innerHTML = "黑名单";
		    c.innerHTML = `<textarea name="blacklist" id="blacklistall" class="comiis_pxs" style="width:90%;resize:none;opacity: 0.7;" placeholder="输入想要拉黑的用户的uid，多个uid用逗号分隔，如1234,5678,9231"></textarea>`;
		    a.appendChild(b);
		    a.appendChild(c);
		    document.getElementById("profilesubmitbtn").addEventListener("click",function(){var a =document.querySelector("#blacklistall").value;localStorage.setItem("blacklist", a)})//给保存追加点击事件本地保存黑名单
		    document.querySelector("#blacklistall").textContent=localStorage.blacklist;
		}catch(err){}
    }
    function uid_display(){//显示帖子人的uid
            var a = document.getElementsByClassName("comiis_verify");
            var i =0;
            for(i =0;i<a.length;i++)
            {
                var b = document.createElement("a");
                var c = document.getElementsByClassName("comiis_postli_top bg_f b_t")[i].getElementsByTagName("a")[0].href.match(/\d+/)[0];//每组uid
                b.style = `font: 13px 隶书;background: rgb(255, 118, 0);margin-left: 4px;padding: 0px 3px;color: white;float: left;margin-top: 1px;height: 14px;line-height: 15px;border-radius: 1.5px;`;
                b.innerHTML="uid："+c;
                a[i].parentElement.insertBefore(b,a[i]);
            }
    }
    function remove_blacklist_user(){
        try{
            var a = document.getElementsByClassName("comiis_postli comiis_list_readimgs nfqsqi");//所有评论本体
            var i = 0;
            for(i=0;i<a.length;i++){
                var b = a[i].getElementsByClassName("postli_top_tximg bg_e")[0].href.match(/\d+/)[0];//本体里的href里面的uid
                if(b==localStorage.blacklist){
                    a[i].remove();
                }
            }

        }catch(err){}
    }
    function replace_a(){
        var i =0;
        var a=document.getElementsByClassName("comiis_messages comiis_aimg_show cl");
        var rul = /space-uid-(.*?).html/;
        for(i =0;i<a.length;i++){
            try{
                var b=a[i].getElementsByTagName("a");//a标签
            }catch(err){}
            var j=0;
            for(j=0;j<b.length;j++){
                try{
                    var c = b[j].href.match(rul);//匹配空间链接
                    if(c){
                        b[j].href = "https://bbs.binmt.cc/home.php?mod=space&uid="+c[1]+"&do=profile&from=space";
                    }
                }catch(err){}
            }
        }

    }
    function img_width(){
        try{
            var img = $("img");
            var img_num = 0;
            var window_width = window.screen.width;
            for(img_num=0;img_num<img.length;img_num++){
                if(img[img_num].id!=""){
                    console.log(img[img_num].width);
                    if(img[img_num].width>window_width){
                        img[img_num].style.width="100%";
                    }
                }
            }
            console.log(window_width);
        }catch(err){
            console.log(err);
        }

    }
        function mobile_all_setting(){
            if(localStorage.v1){if(location.href.match(/bbs.binmt.cc\/thread-/g)){remove_post_content_font_special()}}
	    if(localStorage.v2){link()}
            if(localStorage.v3){if(location.href.match(/bbs.binmt.cc\/thread-/g)){show_black()}}
            if(localStorage.v4){apply_none()}
            if(localStorage.v5){if(location.href.match(/forum\.php\?mod=post\&action=newthread/g)){insert_empty_title()}}
            if(localStorage.v6){if(location.href.match(/bbs.binmt.cc\/thread-/g)){reviews()}}
	    if(localStorage.v15){if(location.href.match(/bbs.binmt.cc\/thread-/g)){uid_display();remove_blacklist_user();remove_blacklist_user()}}
            if(location.href.match(/bbs.binmt.cc\/page-[1-5].html|bbs.binmt.cc\/forum.php\?mod=guide/g)){dom_modify()};
            if(location.href.match(/forum.php\?mod=guide&view/g)){document.querySelector("#forum > div.comiis_body > div.comiis_bodybox > div:nth-child(2)").remove()}
            if(location.href.match(/home.php\?mod=spacecp&ac=profile&op=info/g)){insert_blacklist()}
	    if(localStorage.v16){if(location.href.match(/bbs.binmt.cc\/thread-/g)){img_width()}}
    }
    function ios_js_css(){
        var ios_js = document.createElement("script");
        var ios_css = document.createElement("link");

        ios_js.src="https://whitesev.gitee.io/static_resource/ios_loading/js/iosOverlay.js";

        ios_js.type = "text/javascript";

        ios_css.rel = "stylesheet";
        ios_css.type = "text/css";
        ios_css.href ="https://whitesev.gitee.io/static_resource/ios_loading/css/iosOverlay.css";

        document.head.appendChild(ios_js);
        document.head.appendChild(ios_css);
    }
    function set_PC_js(){
        var a = document.createElement("script");
        var b = document.createElement("script");
        a.src = "https://cdn2.bbs.binmt.cc/static/js/smilies.js?x6L";
        b.src = "https://cdn2.bbs.binmt.cc/static/js/common.js?x6L";
        a.type = "text/javascript";
        b.type = "text/javascript";
        document.head.appendChild(a);
        document.head.appendChild(b);
    }
    function np(){//这是入口
        var usa = navigator.userAgent.match('Windows');
        if(usa != null){
	    try{Latest_publication()}catch(err){console.log("Latest_publication()加载失败")}
            try{link()}catch(err){console.log("link()加载失败")}
            if(window.location.href.match(/.*:\/\/bbs.binmt.cc\/thread.*/)){
                    //online_status();//开启探测在线状态,不需要显示在线状态就注释此行,默认不开启
            }
            try{collect()}catch(err){console.log("collect()加载失败")}
            try{reply_space()}catch(err){console.log("reply_space()加载失败")}
            try{quick_reply()}catch(err){console.log("quick_reply()加载失败")}
            try{user_level()}catch(err){console.log("user_level()加载失败")}
            try{set_PC_js()}catch(err){console.log("set_PC_js()加载失败")}
        }
        else{
	    try{replace_a()}catch(err){console.log("replace_a()加载失败")}
            try{new_thread()}catch(err){console.log("new_thread()加载失败")}
            try{mobile_all_setting()}catch(err){console.log("mobile_all_setting()加载失败")}
            try{insert_checked_select()}catch(err){console.log("insert_checked_select()加载失败")}
            try{insert_tips()}catch(err){console.log("insert_tips()加载失败")}
	    try{set_css()}catch(err){console.log("set_css()加载失败")}
	    try{set_display_last_click()}catch(err){console.log("set_display_last_click()加载失败")}
            try{set_select_clicked()}catch(err){console.log("set_select_clicked()加载失败")}
            try{set_checked_clicked()}catch(err){console.log("set_checked_clicked()加载失败")}
	    try{set_select_change_clicked()}catch(err){}try{ios_js_css()}catch(err){console.log("set_select_change_clicked()加载失败")}


        }
    }//function np()的结束处
   np();

})();
