var customSearch;
! function (e) {
    "use strict";
    var t = 80;
    const a = e(".l_header", ".cover-wrapper");

    function o(a, o = t) {
        const n = a.href ? e(a.getAttribute("href")) : e(a);
        e("html, body").animate({
            scrollTop: n.offset().top - o
        }, 500)
    }
    a[0] && (t = a[0].clientHeight + 16), e(function () {
        var n, c;
        ! function () {
            if (!window.subData) return;
            const t = e("header .wrapper"),
                a = e(".s-comment", t),
                n = e(".s-toc", t);
            t.find(".nav-sub .logo").text(window.subData.title);
            let c = document.body.scrollTop;
            e(document, window).scroll(() => {
                const a = e(window).scrollTop(),
                    o = a - c;
                o >= 50 && a > 100 ? (c = a, t.addClass("sub")) : o <= -50 && (c = a, t.removeClass(
                    "sub"))
            });
            const s = e(".l_body .comments");
            s.length ? a.click(e => {
                e.preventDefault(), e.stopPropagation(), o(s)
            }) : a.remove();
            const l = e(".l_body .toc-wrapper");
            l.length && l.children().length ? (n.click(e => {
                e.stopPropagation(), l.toggleClass("active"), n.toggleClass("active")
            }), e(document).click(function (e) {
                l.removeClass("active"), n.removeClass("active")
            })) : n.remove()
        }(),
        function () {
            var t = e("body .navigation");
            t.find("li a.active").removeClass("active");
            var a = null,
                o = location.pathname.replace(/\/|%/g, "");
            0 == o.length && (o = "home");
            var n = o.match(/page\d{0,}$/g);
            n && (n = n[0], o = o.split(n)[0]);
            var c, s = o.match(/index.html/);
            s && (s = s[0], o = o.split(s)[0]), o && t && (a = e("#" + o, t), (c = a) && c.length && c.addClass(
                "active").siblings().removeClass("active"))
        }(), n = e(".l_header .switcher .s-menu"), c = e("body ul.menu-phone"), n.click(function (e) {
                e.stopPropagation(), c.toggleClass("show"), n.toggleClass("active")
            }), e(document).click(function (e) {
                c.removeClass("show"), n.removeClass("active")
            }),
            function () {
                var t = e(".l_header .switcher .s-search"),
                    a = e(".l_header"),
                    o = e(".l_header .m_search");
                0 !== t.length && (t.click(function (e) {
                    e.stopPropagation(), a.toggleClass("z_search-open"), o.find("input").focus(), t
                        .toggleClass("active")
                }), e(document).click(function (e) {
                    a.removeClass("z_search-open"), t.removeClass("active")
                }), o.click(function (e) {
                    e.stopPropagation()
                }), a.ready(function () {
                    a.bind("keydown", function (e) {
                        if (9 == e.keyCode) return !1;
                        var t, a, o = !!document.all;
                        o ? (t = window.event.keyCode, a = window.event) : (t = e.which, a =
                            e), 9 == t && (o ? (a.keyCode = 0, a.returnValue = !1) : (a
                            .which = 0, a.preventDefault()))
                    })
                }))
            }(),
            function () {
                const a = e(".toc-wrapper");
                if (0 === a.length) return;
                a.click(e => {
                    e.stopPropagation(), a.addClass("active")
                }), e(document).click(() => a.removeClass("active")), a.on("click", "a", t => {
                    t.preventDefault(), t.stopPropagation(), "A" === t.target.tagName ? o(t.target, 0) :
                        "SPAN" === t.target.tagName && o(t.target.parentElement, 0), a.removeClass(
                            "active");
                    const n = e(".s-toc");
                    n.length > 0 && n.removeClass("active")
                });
                const n = Array.from(a.find("li a")),
                    c = () => n.map(a => Math.floor(e(a.getAttribute("href")).offset().top - t));
                let s = c();
                const l = () => {
                    const t = e("html").scrollTop() || e("body").scrollTop();
                    if (!s) return;
                    let a, o = 0,
                        c = s.length - 1;
                    for (; o < c;) s[a = o + c + 1 >> 1] === t ? o = c = a : s[a] < t ? o = a : c = a - 1;
                    e(n).removeClass("active").eq(o).addClass("active")
                };
                e(window).resize(() => {
                    s = c(), l()
                }).scroll(() => {
                    l()
                }), l()
            }(),
            function () {
                const t = e(".menu .active"),
                    n = e(".s-top"),
                    c = e("h1.title", "#header-meta"),
                    s = e(".l_body");
                t.length && s && t.click(e => {
                    e.preventDefault(), e.stopPropagation(), o(s)
                }), c.length && s && c.click(e => {
                    e.preventDefault(), e.stopPropagation(), o(s)
                }), n.length && s && n.click(e => {
                    e.preventDefault(), e.stopPropagation(), o(s)
                });
                const l = e(".cover-wrapper");
                var r = 0;
                l[0] && (r = l[0].clientHeight - 180);
                var i = document.body.scrollTop;
                e(document, window).scroll(() => {
                    const t = e(window).scrollTop(),
                        o = t - i;
                    i = t, t > 180 ? (n.addClass("show"), o > 0 ? n.removeClass("hl") : n.addClass("hl")) :
                        n.removeClass("show").removeClass("hl"), t > r ? a.addClass("show") : a.removeClass(
                            "show")
                })
            }(), "google" === SEARCH_SERVICE ? customSearch = new GoogleCustomSearch({
                apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
                engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
                imagePath: "/img/"
            }) : "algolia" === SEARCH_SERVICE ? customSearch = new AlgoliaSearch({
                apiKey: ALGOLIA_API_KEY,
                appId: ALGOLIA_APP_ID,
                indexName: ALGOLIA_INDEX_NAME,
                imagePath: "/img/"
            }) : "hexo" === SEARCH_SERVICE ? customSearch = new HexoSearch({
                imagePath: "/img/"
            }) : "azure" === SEARCH_SERVICE ? customSearch = new AzureSearch({
                serviceName: AZURE_SERVICE_NAME,
                indexName: AZURE_INDEX_NAME,
                queryKey: AZURE_QUERY_KEY,
                imagePath: "/img/"
            }) : "baidu" === SEARCH_SERVICE && (customSearch = new BaiduSearch({
                apiId: BAIDU_API_ID,
                imagePath: "/img/"
            })),
            function () {
                const t = e(".tabs");
                if (0 === t.length) return;
                let a = t.find(".nav-tabs .tab");
                for (var o = 0; o < a.length; o++) {
                    let n = t.find(a[o].children[0]);
                    n.addClass(n.attr("href")), n.removeAttr("href"), e(".tabs .nav-tabs").on("click", "a", a =>
                        (a.preventDefault(), a.stopPropagation(), t.find(".nav-tabs .active").removeClass(
                            "active"), t.find(a.target.parentElement).addClass("active"), t.find(
                            ".tab-content .active").removeClass("active"), t.find(e(a.target).attr(
                            "class")).addClass("active"), !1))
                }
            }(), e(".scroll-down").on("click", function () {
                o(".l_body")
            }), setTimeout(function () {
                e("#loading-bar-wrapper").fadeOut(500)
            }, 300)
    })
}(jQuery);