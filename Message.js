"use strict";
!function (e, t, a) {
    function n(e) {
        return Object.prototype.toString.call(e).toLocaleLowerCase().replace(/[\[\]]/g, "").split(" ")[1]
    }
    if (!t)
        return void console.error("lack jQuery.js");
    var i = {
        info: function (e) {
            var t = this._getConf(e);
            return t.icon = '<i class="fa fa-exclamation-circle vt-icon vt-info" aria-hidden="true"></i>',
            t.background = "info",
            this._make(t)
        },
        error: function (e) {
            var t = this._getConf(e);
            return t.icon = '<i class="fa fa-times-circle vt-icon vt-error" aria-hidden="true"></i>',
            t.background = "error",
            this._make(t)
        },
        success: function (e) {
            var t = this._getConf(e);
            return t.icon = '<i class="fa fa-check-circle vt-icon vt-success" aria-hidden="true"></i>',
            t.background = "success",
            this._make(t)
        },
        warning: function (e) {
            var t = this._getConf(e);
            return t.icon = '<i class="fa fa-exclamation-circle vt-icon vt-warning" aria-hidden="true"></i>',
            t.background = "warning",
            this._make(t)
        },
        panel: function (e) {
            return "object" != n(e) && (e = {
                    content: e
                }),
            e = Object.assign({}, {
                closable: !0,
                duration: 0,
                style: {
                    minWidth: 320
                }
            }, e),
            this._make(this._getConf(e))
        },
        _getConf: function (e) {
            var t = Object.assign({}, this._config);
            return e && "object" == n(e) ? Object.assign(t, e) : e ? Object.assign(t, {
                content: e
            }) : t
        },
        _getId: function () {
            return "VtMessageId_" + Math.floor(1e7 * Math.random())
        },
        _config: {
            duration: 2500,
            background: !1,
            color: null,
            content: "",
            onclose: null,
            icon: "",
            animate_duration: 500,
            closable: !1,
            header: !1,
            title: !1,
            footer: !1,
            confirm: function (e) {
                e()
            },
            confirm_text: "确认",
            cancel: function (e) {
                e()
            },
            cancel_text: "取消",
            area: [],
            mask: !1,
            parent: null,
            remove_parent: !1,
            offset: "vt-right-top",
            style: null
        },
        _createHeader: function (e, a) {
            if (a.header) {
                var n = t('<div class="vt-message-header">' + (a.icon + a.header) + "</div>");
                e.prepend(n)
            } else if (a.title) {
                var i = t('<div class="vt-message-header"><div class="vt-header-text">' + (a.icon + a.title) + "</div></div>");
                e.prepend(i)
            }
            this._createClose(e, e.find(".vt-message-header"), a)
        },
        _createClose: function (e, a, n) {
            var i = this;
            if (n.closable && a.length) {
                var s = t('<div class="vt-hide"><i class="fa fa-times" aria-hidden="true"></i></div>');
                a.append(s),
                s.find("i").bind("click", function () {
                    i.hide(e, n)
                })
            }
        },
        _createContent: function (e, a) {
            var n = a.header || a.title || !a.icon ? "" : a.icon;
            n += a.content;
            var i = t('<div class="vt-message-body">' + n + "</div>");
            a.header || a.title || !a.closable || this._createClose(e, i, a),
            e.append(i)
        },
        _createFooter: function (e, a) {
            var i = this;
            if (a.footer && "string" == n(a.footer))
                e.append('<div class="vt-message-footer">${conf.footer}</div>');
            else if ((a.cancel || a.confirm) && a.footer) {
                var s = t('<div class="vt-message-footer"></div>');
                if (e.append(s), a.cancel) {
                    var o = t('<button class="vt-cancel">' + a.cancel_text + "</button>");
                    s.append(o),
                    o.on("click", function () {
                        !0 === a.cancel(function () {
                            i.hide(e, a)
                        }) && i.hide(e, a)
                    })
                }
                if (a.confirm) {
                    var r = t('<button class="vt-confirm">' + a.confirm_text + "</button>");
                    s.append(r),
                    r.on("click", function () {
                        !0 === a.confirm(function () {
                            i.hide(e, a)
                        }) && i.hide(e, a)
                    })
                }
            }
        },
        _setMask: function (e, t) {
            if (t.mask) {
                var a = Math.floor(1e6 * Math.random());
                e.parent().addClass("vt-message-mask").data("mask", a),
                e.data("mask", a)
            }
        },
        hide: function (e, t) {
            e.data("mask") && e.parent().data("mask") && e.data("mask").toString() == e.parent().data("mask").toString() && e.parent().removeClass("vt-message-mask").data("mask", "0"),
            e.addClass("vt-remove");
            var a = function () {
                t.remove_parent && e.parent().remove(),
                e.remove()
            };
            t.onclose ? t.onclose(a, e, t) : setTimeout(a, t.animate_duration)
        },
        _make: function (e) {
            var a = this,
            i = this._getId(),
            s = t('<div class="vt-message"  id="' + i + '"></div>');
            return this.getContainer(e).append(s),
            e.class && s.addClass(e.class),
            e.color && s.css("color", e.color),
            e.background && (/^(#|rgb\(|rgba\()/.test(e.background) ? s.css("background-color", e.background) : s.addClass("vt-background vt-bg-" + e.background)),
            e.style && "object" == n(e.style) && s.css(e.style),
            this._createHeader(s, e),
            this._createContent(s, e),
            this._createFooter(s, e),
            e.area.length > 0 && s.css("width", e.area[0]),
            e.area.length > 1 && s.css("height", e.area[1]),
            this._setMask(s, e),
            e.offset && ("string" == n(e.offset) ? s.addClass(e.offset) : s.css("position", "absolute").css(e.offset)),
            e.duration > 0 && setTimeout(function () {
                a.hide(s, e)
            }, e.duration),
            s
        },
        getContainer: function (e) {
            var a = t(e.parent ? e.parent : ".vt-message-package");
            return a.length || (a = t('<div class="vt-message-package"></div>'), t(document.body).append(a)),
            a
        }
    };
    a && (a.Message = i),
    e.VtMessage = i
}
(window, window.jQuery, window.ViewT);
