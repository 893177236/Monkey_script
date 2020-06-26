// ==UserScript==
// @name         MT论坛
// @namespace    http://tampermonkey.net/
// @description  为导航栏新添加一个最新发表标签
// @version      0.7.1.1
// @author       MT-戒酒的李白染
// @icon         https://bbs.binmt.cc/favicon.ico
// @match        *://bbs.binmt.cc/*
// @compatible        edge Beta/Dev/Candy 测试通过
// @compatible        火狐 测试通过
// @grant        none
// @supportURL   https://github.com/893177236/Monkey_script
// ==/UserScript==



(function() {
    'use strict';

    function Latest_publication(){//这是添加最新发表（电脑专用）
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
    }//这是function Latest_publication()结尾处

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
                document.getElementsByClassName("flex f17")[0].children[0].value="🤣";
            }

        }
    }

    function remove_post_content_font_special(){//去除帖子内容字体特效
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
    function set_css(){//实现复选框的css样式
        var a = document.createElement("style");
        var b = document.getElementsByTagName("style")[0];
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


/* Switch 2 Specific Style Start */

.box_2{
	background: #666;
}

input[type="checkbox"].switch_2{
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  width: 100px;
  height: 8px;
  background: #444;
  border-radius: 5px;
  position: relative;
  outline: 0;
  cursor: pointer;
}

input[type="checkbox"].switch_2:before,
input[type="checkbox"].switch_2:after{
  position: absolute;
  content: "";
  -webkit-transition: all .25s;
  transition: all .25s;
}

input[type="checkbox"].switch_2:before{
  width: 40px;
  height: 40px;
  background: #ccc;
  border: 5px solid #666;
  border-radius: 50%;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}

input[type="checkbox"].switch_2:after{
  width: 30px;
  height: 30px;
  background: #666;
  border-radius: 50%;
  top: 50%;
  left: 10px;
  -webkit-transform: scale(1) translateY(-50%);
          transform: scale(1) translateY(-50%);
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
}

input[type="checkbox"].switch_2:checked:before{
  left: calc(100% - 35px);
}

input[type="checkbox"].switch_2:checked:after{
  left: 75px;
  -webkit-transform: scale(0);
          transform: scale(0);
}

/* Switch 2 Specific Style End */


/* Switch 3 Specific Style Start */

.box_3{
	background: #19232b;
}

.toggle_switch{
  width: 100px;
  height: 45px;
  position: relative;
}

input[type="checkbox"].switch_3{
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  outline: 0;
  z-index: 1;
}

svg.checkbox .outer-ring{
  stroke-dasharray: 375;
  stroke-dashoffset: 375;
  -webkit-animation: resetRing .35s ease-in-out forwards;
          animation: resetRing .35s ease-in-out forwards;
}

input[type="checkbox"].switch_3:checked + svg.checkbox .outer-ring{
  -webkit-animation: animateRing .35s ease-in-out forwards;
          animation: animateRing .35s ease-in-out forwards;
}

input[type="checkbox"].switch_3:checked + svg.checkbox .is_checked{
  opacity: 1;
  -webkit-transform: translateX(0) rotate(0deg);
          transform: translateX(0) rotate(0deg);
}

input[type="checkbox"].switch_3:checked + svg.checkbox .is_unchecked{
  opacity: 0;
  -webkit-transform: translateX(-200%) rotate(180deg);
          transform: translateX(-200%) rotate(180deg);
}


svg.checkbox{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

svg.checkbox .is_checked{
  opacity: 0;
  fill: yellow;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  -webkit-transform: translateX(200%) rotate(45deg);
          transform: translateX(200%) rotate(45deg);
  -webkit-transition: all .35s;
  transition: all .35s;
}

svg.checkbox .is_unchecked{
  opacity: 1;
  fill: #fff;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  -webkit-transform: translateX(0) rotate(0deg);
          transform: translateX(0) rotate(0deg);
  -webkit-transition: all .35s;
  transition: all .35s;
}

@-webkit-keyframes animateRing{
  to{
    stroke-dashoffset: 0;
    stroke: #b0aa28;
  }
}

@keyframes animateRing{
  to{
    stroke-dashoffset: 0;
    stroke: #b0aa28;
  }
}

@-webkit-keyframes resetRing{
  to{
    stroke-dashoffset: 0;
    stroke: #233043;
  }
}

@keyframes resetRing{
  to{
    stroke-dashoffset: 0;
    stroke: #233043;
  }
}

/* Switch 3 Specific Style End */


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
        b.parentElement.insertBefore(a,b);


    }

    function set_select_clicked(){//设置下拉列表点击事件
        document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").onclick=function(){
        var a = document.getElementsByClassName("switch_1")[0];//获取复选框位置
        var b = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;//获取下拉列表value
        switch(b){
            case "v1":
                if(localStorage.v1!=null){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
                break;
            case "v2":
                if(localStorage.v2!=null){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
                break;
            case "v3":
                if(localStorage.v3!=null){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
                break;
            case "v4":
                if(localStorage.v4!=null){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
                break;
            case "v5":
                if(localStorage.v5!=null){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
                break;
            case "v6":
                if(localStorage.v6!=null){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
                break;
        }
        }

    }

    function set_checked_clicked(){//设置复选框点击事件
        document.getElementsByClassName("switch_1")[0].onclick=function(){
            var a = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;//获取当前下拉列表value
            var b = localStorage.getItem(a);//获取本地数据
            switch(a){
                case "v1":
                    if(b){
                        localStorage.removeItem('v1');
                    }else{
                        localStorage.setItem("v1", "true");
                    }
                    localStorage.setItem("last","v1");
                    break;
                case "v2":
                    if(b){
                        localStorage.removeItem('v2');
                    }else{
                        localStorage.setItem("v2", "true");
                    }
                    localStorage.setItem("last","v2");
                    break;
                case "v3":
                    if(b){
                        localStorage.removeItem('v3');
                    }else{
                        localStorage.setItem("v3", "true");
                    }
                    localStorage.setItem("last","v3");
                    break;
                case "v4":
                    if(b){
                        localStorage.removeItem('v4');
                    }else{
                        localStorage.setItem("v4", "true");
                    }
                    localStorage.setItem("last","v4");
                    break;
                case "v5":
                    if(b){
                        localStorage.removeItem('v5');
                    }else{
                        localStorage.setItem("v5", "true");
                    }
                    localStorage.setItem("last","v5");
                    break;
                case "v6":
                    if(b){
                        localStorage.removeItem('v6');
                    }else{
                        localStorage.setItem("v6", "true");
                    }
                    localStorage.setItem("last","v6");
                    break;

            }
            location.reload();

        }

    }

    function set_display_last_click(){
        var a = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select");
        var b = localStorage.last;
        var c = document.getElementsByClassName("switch_1")[0];
        switch(b){
            case "v1":
                a.value=b;
                if(localStorage.v1){c.checked=true;}else{c.checked=false;};
                break;
            case "v2":
                a.value=b;
                if(localStorage.v2){c.checked=true;}else{c.checked=false;};
                break;
            case "v3":
                a.value=b;
                if(localStorage.v3){c.checked=true;}else{c.checked=false;};
                break;
            case "v4":
                a.value=b;
                if(localStorage.v4){c.checked=true;}else{c.checked=false;};
                break;
            case "v5":
                a.value=b;
                if(localStorage.v5){c.checked=true;}else{c.checked=false;};
                break;
            case "v6":
                a.value=b;
                if(localStorage.v6){c.checked=true;}else{c.checked=false;};
                break;

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

        if(location.href.match(/bbs.binmt.cc\/thread/g)!=null)
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
                        '<option value="v6">开启点评<\/option><\/select>';
            f.innerHTML='<input type="checkbox" class="switch_1">';
            document.getElementsByClassName("comiis_memu_y bg_f nfqsqi comiis_menu_style")[0].children[0].appendChild(c);
            document.getElementsByClassName("comiis_memu_y bg_f nfqsqi comiis_menu_style")[0].children[0].appendChild(f);
            var a = document.getElementsByClassName("switch_1")[0];//获取复选框位置
            var b = document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > select").value;//获取下拉列表value
            switch(b){
                case "v1":
                    if(localStorage.v1!=null){
                        a.checked = true;
                    }else{
                        a.checked = false;
                    }
                    break;
                case "v2":
                    if(localStorage.v2!=null){
                        a.checked = true;
                    }else{
                        a.checked = false;
                    }
                    break;
                case "v3":
                    if(localStorage.v3!=null){
                        a.checked = true;
                    }else{
                        a.checked = false;
                    }
                    break;
                case "v4":
                    if(localStorage.v4!=null){
                        a.checked = true;
                    }else{
                        a.checked = false;
                    }
                    break;
                case "v5":
                    if(localStorage.v5!=null){
                        a.checked = true;
                    }else{
                        a.checked = false;
                    }
                    break;
                case "v6":
                    if(localStorage.v6!=null){
                        a.checked = true;
                    }else{
                        a.checked = false;
                    }
                    break;
        }

        }
    }


    function link(){//这是把链接点亮（手机电脑都可）
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
    }//这里是function link()结尾处

    function online_status(){//这是添加在线状态（电脑专用）
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
                        //显示请求结果
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
    }//这是function online_status()结尾处

    function reviews(){//这是添加点评（手机专用）
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
                    }//这是for的结束处
                }//这是 if(hongbao.length ==0)的else结束处
    }

    function new_thread(){//这是替换链接
        try{
        document.getElementsByClassName("comiis_mh_tit cl")[1].getElementsByTagName("a")[0].href="https://bbs.binmt.cc/page-4.html";}catch(err){}
    }
    
    function show_black(){//这是将bbs代码让别人看不显示看见
        var hide = document.getElementsByTagName('font');
        var i = 0;
        for(i = 0;i<hide.length;i++)
        {
            hide[i].removeAttribute('color');
            hide[i].removeAttribute('style');
            hide[i].removeAttribute('size');
        }//颜色
        
              
        var content = document.getElementsByClassName("comiis_message bg_f view_all cl message");
        var rule = /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g;
        var j = 0;
        for(j=0;j<content.length;j++)
        {
            content[j].innerHTML = content[j].innerHTML.replace(rule,'');

        }//评论区的字体效果


        
    }
    
    function collect(){//这是添加收藏按钮
        var own_formhash = document.querySelector("#scform > input[type=hidden]:nth-child(1)").value;
        var collect_href_id = window.location.href.match('thread-(.*?)-')[1];
        var collect_href = 'https:\/\/bbs.binmt.cc\/home.php?mod=spacecp&ac=favorite&type=thread&id='+collect_href_id+'&formhash='+own_formhash;
        var new_collect = document.createElement('span');
        var old_Suspended = document.getElementById("scrolltop");
        new_collect.innerHTML = '<a href="'+collect_href+'" id="k_favorite" onclick="showWindow(this.id, this.href, \'get\', 0);" onmouseover="this.title = $(\'favoritenumber\').innerHTML + \' 人收藏\'" ><img src="https:\/\/s1.ax1x.com\/2020\/04\/29\/JTk3lD.gif" height="26" width="26" style="position:absolute;top:10px;left:11px"><\/a>';
        old_Suspended.insertAdjacentElement('afterBegin',new_collect);
    }

    function reply_space(){//这是回复别人添加一键空格
        var a = document.getElementsByClassName("fastre");
        var i =0;
        for(i=0;i<a.length;i++){
        a[i].onclick=function(){
            showWindow('reply', this.href);
            setTimeout('document.querySelector("#moreconf").innerHTML=document.querySelector("#moreconf").innerHTML+\'<button type="button" id = "insertspace" style="float: left;">一键空格<\/button>\';document.querySelector("#insertspace").onclick=function(){document.querySelector("#postmessage").value="           "}'
             ,150)}
        }


    }

    function quick_reply(){//用于帖子快速回复添加一键空格
        document.querySelector("#scrolltop > span:nth-child(2) > a").onclick=function()
        {
            showWindow('reply', this.href);var a = document.querySelector("#postsubmit");
            setTimeout(
                'document.querySelector("#moreconf").innerHTML=document.querySelector("#moreconf").innerHTML+\'<button type="button" id = "insertspace2" style="float: left;">一键空格<\/button>\';document.querySelector("#insertspace2").onclick=function(){document.querySelector("#postmessage").value=document.querySelector("#postmessage").value+"           ";}'
            ,200)}


    }

    function user_level(){//在积分旁边显示用户等级
        var a = document.getElementsByClassName("pls favatar");
        var i = 0;
        var e = "0级";
        for(i=0;i<a.length;i++){
            var b = a[i].getElementsByTagName("em")[1].outerText;//获取用户组
            var c = a[i].getElementsByTagName("tr")[0];//获取新建元素位置
            var d = document.createElement("td");//创建新建元素
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
        function mobile_all_setting(){
        if(localStorage.v1){if(location.href.match(/bbs.binmt.cc\/thread-/g)){remove_post_content_font_special();}}
        if(localStorage.v2){link();}
        if(localStorage.v3){if(location.href.match(/bbs.binmt.cc\/thread-/g)){show_black();}}
        if(localStorage.v4){apply_none();}
        if(localStorage.v5){if(location.href.match(/forum\.php\?mod=post\&action=newthread/g)){insert_empty_title();}}
        if(localStorage.v6){if(location.href.match(/bbs.binmt.cc\/thread-/g)){reviews();}}

    }
    function np(){//这是入口
        var usa = navigator.userAgent.match('Windows');
        if(usa != null){
            //电脑功能
            Latest_publication();//开启最新发表标签
            link();//开启链接识别
            if(window.location.href.match(/.*:\/\/bbs.binmt.cc\/thread.*/)){
                    //online_status();//开启探测在线状态,不需要显示在线状态就注释此行,默认不开启
            }
            collect();//开启收藏按钮
            reply_space();//开启回复框加一键空格
            quick_reply();//开启快速回复框一键空格
            user_level();//开启识别用户等级
        }
        else{
            //手机功能
            //
            new_thread();//开启替换
            mobile_all_setting();
            //插入元素
            insert_checked_select();//自定义设置（在帖子里右上角）
            set_display_last_click();
            insert_tips();//提示
            //插入元素

            //设置点击事件和css
            set_css();
            set_select_clicked();
            set_checked_clicked();


        }
    }//function np()的结束处
   np();

})();
