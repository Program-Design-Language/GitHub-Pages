// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
}, function (error) {
    NProgress.done();
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    // Do something with response error
    return Promise.reject(error);
});

new Vue({
    el: '#app',
    data: {
        articleTitle: '',
        articleUrl: '',
        pjaxHtml: '',
        categories: null,
        articles: null,
        all: null,
        search: "",
        clickedCate: "",
        showPostList: true,
    },
    watch: {
        search: function (val) {
            if (val === '') {
                this.articles = this.all
                return
            }
            this.articles = this.all.filter(post => {
                var title = post.title.toUpperCase();
                var cp = val.toUpperCase();
                return title.indexOf(cp) !== -1
            });
        },
    },
    updated: function () {
        var meta = (document.getElementsByClassName('article-meta'))[0];
        var indexDom = document.getElementById('article-index-ul')

        var path = window.location.pathname;
        if (path === '/404' || path === '/') {
            meta.style.visibility = 'hidden'
            indexDom.style.visibility = 'hidden'
        } else {
            meta.style.visibility = 'visible'
            indexDom.style.visibility = 'visible'
            this.createMarkdownIndex()
        }
    },
    created: function () {
        this.showPostList = window.location.pathname === '/';
        var vm = this;
        window.onpopstate = function (e) {
            var state = e.state;
            if (state !== null) {
                document.title = state.title;
                vm.doView(state)
            } else {
                document.title = window.location.hostname;
            }
        };
    },
    mounted: function () {
        this.doCommentSection();
        var vm = this
        axios.get('/api/article-list.json').then(function (response) {
            vm.categories = response.data.categories;
            vm.articles = response.data.articles;
            vm.all = response.data.articles;
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        doView: function (item) {
            var url = item.url;
            var title = item.title;
            history.pushState({
                url: url,
                title: title
            }, title, url);
            document.title = title;
            this.doCommentSection()
            var vm = this;
            axios.get(url).then(function (res) {
                var template = document.createElement('div');
                var parts = res.data.trim().split("<!--===thisExplodePointPjax===-->")
                template.innerHTML = parts[1];
                var doc = template.getElementsByClassName('pjax-source');
                var articleDom = doc[0];
                vm.pjaxHtml = articleDom.innerHTML
            }).catch(function (error) {
                vm.pjaxHtml = '';
                console.log(error);
            });
        },
        doSetPostList: function (val) {
            this.showPostList = val;
        },
        createMarkdownIndex: function () {
            var pathName = window.location.pathname;
            //设置右侧文章内容idx
            if (pathName === '/404' || pathName === '/') {
                return
            }
            var indexDom = document.getElementById('article-index-ul')
            var tocHtml = '';
            var h2ds = document.querySelectorAll("h2,h3")
            for (var i = 0; i < h2ds.length; i++) {
                var h2d = h2ds[i];
                var someHash = this.randomString();
                h2d.setAttribute('id', someHash)
                if (h2d.tagName === "H2") {
                    tocHtml += '<li class="article-index-li article-index-h2"><i class="fa fa-line-chart"></i> <a href="#' + someHash + '" class="js-anchor-link">' + h2d.innerText + '</a></li>';
                } else {
                    tocHtml += '<li class="article-index-li article-index-h3"><i class="fa fa-superpowers"></i> <a href="#' + someHash + '" class="js-anchor-link">' + h2d.innerText + '</a></li>';
                }
            }
            indexDom.innerHTML = tocHtml
        },
        doCommentSection: function () {
            var idcomments_acct = '43b5f1195c4058c8e3297caca2d70c2a';
            var idcomments_post_title = document.title.replace(/#/, "%23");
            var idcomments_post_url = window.location.href;
            var idcomments_post_id = window.location.href;
            idcomments_post_id = encodeURIComponent(idcomments_post_id);
            idcomments_post_url = encodeURIComponent(idcomments_post_url);
            idcomments_post_title = encodeURIComponent(idcomments_post_title);
            var commentScript = document.createElement("script");
            commentScript.type = "text/javascript";
            commentScript.src = "https://intensedebate.com/js/genericCommentWrapper2.php?acct=" + idcomments_acct + "&postid=" + idcomments_post_id + "&title=" + idcomments_post_title + "&url=" + idcomments_post_url;
            document.getElementsByTagName("head")[0].appendChild(commentScript);
        },
        doChangeCate: function (val) {
            this.showPostList = true;
            this.search = '';
            this.clickedCate = val;
            if (val === "") {
                this.articles = this.all
                return
            }
            this.articles = this.all.filter(post => post.cate.toUpperCase() === val.toUpperCase());
        },
        randomString: function () {
            var ID = "",
                alphabet = "abcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 5; i++) {
                ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            return ID;
        },
        humanTime: function (timeS) {
            var date = new Date(timeS);
            var delta = Math.round((+new Date - date) / 1000);
            var minute = 60;
            var hour = minute * 60;
            var day = hour * 24;
            var week = day * 7;
            var mm = day * 31;
            var fuzzy;
            if (delta < 30) {
                fuzzy = '现在';
            } else if (delta < minute) {
                fuzzy = delta + ' 秒前';
            } else if (delta < 2 * minute) {
                fuzzy = '一分钟前'
            } else if (delta < hour) {
                fuzzy = Math.floor(delta / minute) + ' minutes ago.';
            } else if (Math.floor(delta / hour) == 1) {
                fuzzy = '一小时前'
            } else if (delta < day) {
                fuzzy = Math.floor(delta / hour) + ' 小时前';
            } else if (delta < day * 2) {
                fuzzy = '昨天';
            } else if (delta < week) {
                fuzzy = Math.floor(delta / day) + ' 天前';
            } else if (delta < mm) {
                fuzzy = Math.floor(delta / week) + ' 周前';
            } else {
                fuzzy = date.toISOString().slice(2, 10).replace('T', ' ')

            }
            return fuzzy
        }
    }
});