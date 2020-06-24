// ==UserScript==
// @name         MT论坛
// @namespace    http://tampermonkey.net/
// @description  为导航栏新添加一个最新发表标签
// @version      0.6.8.6
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
        document.querySelector("#needsubject").onclick=function()
            {
                document.getElementsByClassName("flex f17")[0].children[0].parentNode.hidden=true;
                document.getElementsByClassName("flex f17")[0].children[0].value="😊";
            }
        }
    }

    function test(){
        if(location.href.match(/bbs.binmt.cc\/thread/g)!=null)
        {
            var a = document.createElement("li");
            a.className="f_b";
            a.innerHTML='<p>去除帖子字体效果(未开启)</p><input type="checkbox" name="vehicle" value="postfont"style="zoom:120%;width: 110px;">';
            document.getElementsByClassName("comiis_memu_y bg_f nfqsqi comiis_menu_style")[0].children[0].appendChild(a);
            if(localStorage.checked!=null)//判断复选框点击状态
            {
                document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > input[type=checkbox]").checked=true;
                document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > p").innerText="去除帖子字体效果(已开启)";
                var rule = /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g;//字体正则
                var h_content = document.getElementsByClassName("comiis_a comiis_message_table cl");//定位到复选框js路径
                h_content[0].innerHTML = h_content[0].innerHTML.replace(rule,'');//清除帖子里的字体效果
            }
            document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > input[type=checkbox]").onclick=function()
            {

                Storage.set = function(name, val)
                {
                    localStorage.setItem(name, val);
                }//定义函数用于设置localStorge
                Storage.get = function(name)
                {
                    return localStorage.getItem(name);
                }//定义函数用户获取localStorge

                if(document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > input[type=checkbox]").checked)
                {
                    var rule = /<br>|&nbsp;|<font.*?>|<\/font>|<strike>|<strong>|<i>|<u>|align=".*?"/g;//字体正则
                    var h_content = document.getElementsByClassName("comiis_a comiis_message_table cl");//定位到复选框js路径
                    h_content[0].innerHTML = h_content[0].innerHTML.replace(rule,'');//清除帖子里的字体效果
                    document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > p").innerText="去除帖子字体效果(已开启)";
                    Storage.set("checked","true");
                }else
                {
                    document.querySelector("#comiis_menu_vtr_menu > ul > li:nth-child(6) > p").innerText="关闭，刷新网页";
                    localStorage.removeItem('checked');
                    location.reload();//刷新网页

                }
            };
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
        }
        else{
            //手机功能
            //link();//开启链接识别
            reviews();//开启点评
            new_thread();//开启替换
            show_black();//开启显示隐藏
            test();//自定义设置（在帖子里右上角）
            insert_empty_title();//发表水贴无需标题
        }
    }//function np()的结束处
   np();

})();
