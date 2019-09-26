/*
 * uuid
 * 2019-07
 * 
 * by netnr
 * 
 * https://gitee.com/netnr/uuid
 * https://github.com/netnr/uuid
 */

(function (window) {

    var uuid = function (ops) {
        return new uuid.fn.init(ops);
    }

    uuid.fn = uuid.prototype = {
        //初始化
        init: function (ops) {
            ops = ops || {};
            //容器
            this.id = ops.id || document.querySelector(".uuidbox");
            //git托管
            this.githost = ops.githost;
            if (!this.githost) {
                var hts = location.host.split('.');
                if (hts.length == 3) {
                    this.githost = hts[0];
                }
            }
            if (["github", "gitee"].indexOf(this.githost) == -1) {
                this.githost = "github";
            }
            //缓存
            this.dataCache = {};

            //token
            this.token = localStorage.getItem("uuid-token");

            var lpn = location.pathname;
            switch (lpn) {
                //fork
                case "/_fork":
                    this.nr = uuid.defaultRepos;
                    this.forkList();
                    break;
                //token
                case "/_token":
                    this.tokens();
                    break;
                default:
                    var pns = lpn.split('/');
                    //账号
                    this.name = uuid.setDv(ops.name || pns[1], 'netnr');
                    //仓库
                    this.repos = uuid.setDv(ops.repos || pns[2], 'uuid');
                    //包
                    this.libs = uuid.setDv(ops.libs || pns[3], 'libs');

                    this.nr = this.name + "/" + this.repos;

                    this.info();
            }

            this.jump();

            return this;
        },
        //获取用户
        getUser: function (callback) {
            var src = "https://api.github.com/users/" + this.name;
            switch (this.githost) {
                case "gitee":
                    src = "https://gitee.com/api/v5/users/" + this.name;
                    break;
            }
            uuid.fetch(this, src, callback, "text");
        },
        //获取仓库
        getRepos: function (callback) {
            var that = this;
            var src = "https://api.github.com/repos" + uuid.defaultRepos;
            switch (this.githost) {
                case "gitee":
                    src = "https://gitee.com/api/v5/repos" + uuid.defaultRepos;
                    break;
            }

            var cacheRepos = uuid.cacheGet(that.name, src);
            uuid.fetch(this, src, function (data) {
                //仓库未更新
                var nochange = cacheRepos.ok && cacheRepos.value.updated_at == data.updated_at;
                var udata = localStorage.getItem("uuid_" + that.name);
                if (udata && udata != "") {
                    var ujson = JSON.parse(udata);
                    for (var i in ujson) {
                        if (i.indexOf("__create_time__") == 0) {
                            if (i.indexOf("/contents/") >= 0 || i.indexOf("/git/trees/master?recursive=1") >= 0) {
                                //未更新，延长缓存过期；已更新，设置超出缓存时间
                                ujson[i] = nochange ? new Date().valueOf() : 946656000000;
                            }
                        }
                    }
                    localStorage.setItem("uuid_" + that.name, JSON.stringify(ujson));
                }

                if (nochange) {
                    var udata = localStorage.getItem("uuid_" + that.name);
                    if (udata && udata != "") {
                        var ujson = JSON.parse(udata);
                        for (var i in ujson) {
                            if (i.indexOf("__create_time__") == 0) {
                                if (i.indexOf("/contents/") >= 0 || i.indexOf("/git/trees/master?recursive=1") >= 0) {
                                    ujson[i] = new Date().valueOf();
                                }
                            }
                        }
                        localStorage.setItem("uuid_" + that.name, JSON.stringify(ujson));
                    }
                }
                callback(data);
            }, 'json', function () {
                that.showMessage("Not found");
            })
        },
        //获取目录
        getDir: function (callback) {
            var that = this;
            var src = "https://api.github.com/repos/" + this.nr + "/contents/" + this.libs;
            switch (this.githost) {
                case "gitee":
                    src = "https://gitee.com/api/v5/repos/" + this.nr + "/git/trees/master?recursive=1";
                    break;
            }
            uuid.fetch(this, src, callback, 'json', function () {
                that.showMessage("Not found");
            })
        },
        //获取分支
        getFork: function (callback) {
            var that = this;
            var src = "https://api.github.com/repos" + uuid.defaultRepos + "/forks";
            switch (this.githost) {
                case "gitee":
                    src = "https://gitee.com/api/v5/repos" + uuid.defaultRepos + "/forks?sort=newest&page=1&per_page=30";
                    break;
            }
            uuid.fetch(this, src, callback, 'json', function () {
                that.showMessage("Not found");
            })
        },
        //显示fork列表
        forkList: function () {
            var that = this;
            document.title += "-fork";
            this.getFork(function (data) {

                if (data.length) {
                    that.id.innerHTML = '<h2 class="text-center mt-3">Fork</h2><hr/>';
                }

                data.forEach(function (item) {
                    var icon = item.owner.avatar_url;
                    var name = item.owner.login;

                    var cf = document.createElement("div");
                    cf.className = "card-fork";
                    cf.innerHTML = '<a href="' + location.origin + '/' + name + '"><img data-src="' + icon + '" src="' + uuid.defaultFavicon + '" /><br/>' + name + '</a>';
                    that.id.appendChild(cf);

                    var cfimg = cf.getElementsByTagName('img')[0];
                    var img = new Image();
                    img.src = cfimg.getAttribute('data-src');
                    img.onload = function () { cfimg.src = this.src }
                })

                if (data.length) {
                    var morefork = "https://github.com/" + that.nr + "/network/members";
                    switch (that.githost) {
                        case "gitee":
                            morefork = "https://gitee.com/" + that.nr + "/members";
                            break;
                    }

                    var cf = document.createElement("div");
                    cf.className = "card-fork";
                    cf.innerHTML = '<a href="' + morefork + '"><img src="/favicon.svg" /><br/>More fork</a>';
                    that.id.appendChild(cf);

                    that.showCacheInfo();
                } else {
                    that.showMessage('No fork')
                }
            })
        },
        //个人信息
        info: function () {
            var that = this;
            var ind = document.createElement("div");
            ind.className = "mt-3 mb-4";
            this.id.appendChild(ind);
            this.getUser(function (data) {
                data = JSON.parse(data);
                if (!data.login) {
                    return;
                }

                document.title += "-" + data.login;

                var nhref = "https://" + that.githost + ".com/";

                var indhtm = [];
                indhtm.push('<img class="uphoto" src="' + data.avatar_url + '" onerror="this.src=\'/favicon.svg\';this.onerror=null;" />');
                indhtm.push('<a class="text-muted h4" href="' + nhref + data.login + '">' + data.login + '</a><br/>');
                var blog = data.blog;
                if (blog) {
                    blog = blog.indexOf('//') > 0 ? blog : ('http://' + blog);
                    indhtm.push('<a class="small" href="' + blog + '">' + data.blog + '</a>');
                } else {
                    indhtm.push('<a class="small text-muted">no blog</a>');
                }
                ind.innerHTML = indhtm.join('');

                that.search();

                //token按钮
                var btn = document.createElement('a');
                btn.href = location.origin + "/_token";
                btn.className = "badge badge-" + (that.token ? "success" : "dark") + " float-right mr-2";
                btn.title = that.token ? "已设置token" : "未设置token，访问速率受限制";
                btn.style.fontSize = "1rem";
                btn.innerHTML = 'token';
                ind.insertBefore(btn, ind.firstChild);

                //fork按钮
                that.getRepos(function (data) {
                    var btn = document.createElement('a');
                    btn.href = location.origin + "/_fork";
                    btn.className = "badge badge-info float-right";
                    btn.style.fontSize = "1rem";
                    btn.innerHTML = 'Fork &nbsp;' + data.forks_count;
                    ind.insertBefore(btn, ind.firstChild);
                })

                that.build();
            })
        },
        //搜索
        search: function () {
            var that = this;
            var ig = document.createElement('div');
            ig.className = "input-group mt-2";
            ig.style.width = "55%";
            ig.innerHTML = '<div class="input-group-prepend">'
                + '<select class="custom-select custom-select-sm" style="width:120px;" id="seGroup">'
                + '<option value="">全部</option>'
                + '</select>';
            var sh = document.createElement("input");
            sh.className = "form-control form-control-sm";
            sh.style.width = "55%";
            sh.placeholder = "搜索，支持静默搜索";
            sh.oninput = function () {
                var key = this.value.toLowerCase();
                var cb = that.id.getElementsByClassName('card-body');
                for (var i = 0; i < cb.length; i++) {
                    var anode = cb[i].getElementsByTagName('a'), hasa = 0;
                    for (var j = 0; j < anode.length; j++) {
                        var anj = anode[j];
                        if (anj.href.toLowerCase().indexOf(key) >= 0 || anj.innerHTML.toLowerCase().indexOf(key) >= 0) {
                            anj.style.display = "";
                            hasa = 1;
                        } else {
                            anj.style.display = "none";
                        }
                    }
                    cb[i].parentNode.style.display = hasa ? "" : "none";
                }
            }
            sh.title = "静默搜索，支持快捷方式：Esc、↑、↓、Enter，可直达网址";

            ig.appendChild(sh)
            that.id.firstChild.appendChild(ig);

            //分类选择
            document.getElementById('seGroup').onchange = function () {
                var cards = document.querySelectorAll('.card');
                for (var i = 0; i < cards.length; i++) {
                    var ci = cards[i];
                    var type = ci.children[0].children[0].innerHTML;
                    ci.className = ci.className.replace(" d-none", "");
                    if (this.value != "" && this.value != type) {
                        ci.className += " d-none";
                    }
                }
            }
        },
        //跳转
        jump: function () {
            var that = this;
            //静默搜索
            that.dataCache.jumpkey = that.dataCache.jumpkey || "";

            window.addEventListener('keypress', function (e) {
                if (document.activeElement.nodeName != "INPUT") {
                    if (that.dataCache.jumpkey.length < 28) {
                        that.dataCache.jumpkey += String.fromCharCode(e.keyCode);
                    }
                    that.jumpView();
                }
            });
            window.addEventListener('keydown', function (e) {
                if (document.activeElement.nodeName != "INPUT") {
                    switch (e.keyCode) {
                        //退格
                        case 8:
                            if (that.dataCache.jumpkey != "") {
                                that.dataCache.jumpkey = that.dataCache.jumpkey.substring(0, that.dataCache.jumpkey.length - 1);
                            }
                            that.jumpView();
                            uuid.stopDefault(e);
                            break;
                        //回车
                        case 13:
                            var openuri = that.jumpnode.firstChild.innerText;
                            var ali = that.jumpnode.getElementsByClassName('active')[0];
                            if (ali) {
                                openuri = ali.firstChild.innerText;
                            }
                            if (openuri.indexOf('.') == -1) {
                                var dq = that.dataCache.config.searchapi || uuid.defaultSearch;
                                openuri = dq + encodeURIComponent(openuri);
                            } else if (openuri.toLowerCase().indexOf("http") != 0) {
                                openuri = "http://" + openuri;
                            }
                            that.dataCache.jumpkey = "";
                            that.jumpView();
                            uuid.stopDefault(e);
                            window.open(openuri.trim());
                            break;
                        //ESC
                        case 27:
                            that.dataCache.jumpkey = "";
                            that.jumpView();
                            uuid.stopDefault(e);
                            break;
                        //up
                        case 38:
                        //down
                        case 40:
                            if (that.jumpnode) {
                                var ali = that.jumpnode.getElementsByClassName('active')[0];
                                if (ali) {
                                    var newli;
                                    e.keyCode == 38 && (newli = ali.previousSibling);
                                    e.keyCode == 40 && (newli = ali.nextSibling);
                                    if (newli) {
                                        newli.className = "active";
                                        ali.className = "";
                                    }
                                    uuid.stopDefault(e);
                                }
                            }
                            break;
                    }
                }
            })
        },
        //跳转显示
        jumpView: function () {
            var that = this;
            if (!that.jumpnode) {
                var jv = document.createElement('div');
                jv.className = "uuidjump";
                document.body.appendChild(jv);
                jv.onclick = function (e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    var lis = this.getElementsByTagName('li');
                    for (var j = 0; j < lis.length; j++) {
                        if (lis[j].contains(target)) {
                            window.open(lis[j].firstChild.innerText.trim());
                            that.dataCache.jumpkey = "";
                            that.jumpView();
                            break;
                        }
                    }
                }
                jv.autopost = function () {
                    jv.style.left = (document.documentElement.clientWidth / 2 - jv.clientWidth / 2) + "px";
                };
                jv.autopost();
                window.addEventListener('resize', jv.autopost);
                that.jumpnode = jv;
            }
            if (that.dataCache.jumpkey.trim() != "") {
                that.jumpnode.style.display = "";
                var htm = [], cn = 0;
                for (var i = 0; i < document.links.length; i++) {
                    if (cn > 6) {
                        break;
                    }
                    var link = document.links[i];
                    if (link.href.toLowerCase().indexOf(that.dataCache.jumpkey.toLowerCase()) >= 0 || link.innerText.toLowerCase().indexOf(that.dataCache.jumpkey.toLowerCase()) >= 0) {
                        cn++;
                        if (htm.length) {
                            htm.push('<li>')
                        } else {
                            htm.push('<li class="active">')
                        }
                        var jicon = link.firstChild.src || uuid.defaultFavicon;
                        htm.push('<div class="text-info"><img src="' + jicon + '" onerror="this.src=\'' + uuid.defaultFavicon + '\';this.onerror=null;" />' + link.href + '</div>')
                        htm.push('<div>' + link.innerText + '</div>')
                        htm.push('</li>')
                    }
                }
                var jnhtml = '<div class="h4 py-1 px-3">' + that.dataCache.jumpkey + '</div>';
                if (htm.length) {
                    jnhtml = jnhtml + "<ul>" + htm.join('') + "</ul>";
                }
                that.jumpnode.innerHTML = jnhtml;
                that.jumpnode.autopost();
            } else {
                that.jumpnode.style.display = "none";
                that.jumpnode.innerHTML = "";
            }
        },
        se: function (s) {
            return s.replace(/"/g, "&quot;").replace(/'/g, "");
        },
        //构建
        build: function () {
            var that = this;
            that.getDir(function (data) {
                //缓存
                that.dataCache.dir = data;
                switch (that.githost) {
                    case "gitee":
                        data = data.tree;
                        break;
                }

                var hasfile = false;
                //遍历目录
                data.forEach(function (item) {
                    //是配置文件                    
                    if (item.path == that.libs + "/" + uuid.defaultConfig) {
                        that.configUrl = item.url;
                    } else {
                        //是文件
                        var isfile = false;
                        switch (that.githost) {
                            case "github":
                                isfile = item.type == "file";
                                break;
                            case "gitee":
                                isfile = (item.type == "blob" && item.path.indexOf(that.libs + "/") == 0);
                                break;
                        }
                        if (isfile) {
                            hasfile = true;

                            //card 标题，标题链接,文件链接
                            var type, typelink, filesrc;
                            switch (that.githost) {
                                case "github":
                                    type = item.name.substr(0, item.name.lastIndexOf('.'));
                                    typelink = item.html_url;
                                    filesrc = item.url;
                                    break;
                                case "gitee":
                                    type = item.path.substr(0, item.path.lastIndexOf('.')).substring(that.libs.length + 1);
                                    typelink = "https://gitee.com/" + that.name + "/" + that.repos + "/blob/master/" + that.libs + "/" + type + ".md";
                                    filesrc = item.url;
                                    break;
                            }

                            //创建卡片
                            var card = document.createElement("div");
                            card.className = "card border-success my-3";

                            var cardhtml = [
                                '<div class="card-header border-success"><a href="' + typelink + '" >' + type + '</a></div>',
                                '<div class="card-body">',
                                '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
                                '</div>'
                            ];

                            card.innerHTML = cardhtml.join('');
                            //显示卡片
                            that.id.appendChild(card);
                            //卡片追加到选择框
                            var seg = document.getElementById('seGroup');

                            seg.add(new Option(type));

                            //加载卡片下的链接，一个卡片对应一个文件
                            uuid.fetch(that, filesrc, function (data) {
                                data = decodeURIComponent(escape(atob(data.content)));

                                var list = data.split('\n');
                                var ahtm = [];
                                //遍历每一行，解析成A标签
                                list.forEach(function (line) {
                                    //满足Markdown的链接格式，有效行
                                    if (/\[.*?\]\(http.*?\)/.test(line)) {
                                        //A标签显示的文本、图标、链接
                                        var atext, aicon, ahref, atitle = '';
                                        line.replace(/\(http.*?\)/, function (x) {
                                            if (/\(http.*?\ /.test(x)) {
                                                line.replace(/\(http.*?\ /, function (y) {
                                                    ahref = y.substring(1).trim();
                                                    atitle = x.replace(y, "");
                                                    atitle = atitle.substring(1, atitle.length - 2).trim();
                                                })
                                            } else {
                                                ahref = x.substring(1, x.length - 1).trim();
                                            }
                                        })
                                        line.replace(/\[.*?\]/, function (x) {
                                            atext = x.substring(1, x.length - 1).trim();
                                        })
                                        atext.replace(/ http.*/, function (x) {
                                            atext = atext.replace(x, "");
                                            aicon = x.trim();
                                        })
                                        if (!aicon) {
                                            var hrefs = ahref.split('/');
                                            aicon = hrefs[0] + "//" + hrefs[2] + "/favicon.ico";
                                        }
                                        ahtm.push('<a href="' + ahref + '" title="' + that.se(atitle) + '"><img data-src="' + aicon + '" src="' + uuid.defaultFavicon + '"/> ' + atext + '</a>');
                                    }
                                })
                                card.lastChild.innerHTML = ahtm.join('');

                                //加载图标
                                var cardimg = card.lastChild.getElementsByTagName('img');
                                for (var i = 0; i < cardimg.length; i++) {
                                    var ci = cardimg[i], iconsrc = ci.getAttribute('data-src');
                                    //仅加载https
                                    if (iconsrc.indexOf("http://") == -1) {
                                        var img = new Image();
                                        img.that = ci;
                                        img.onload = function () { this.that.src = this.src; };
                                        img.src = iconsrc;
                                    } else {
                                        console.log(iconsrc)
                                    }
                                }
                            }, 'json');
                        }
                    }
                });
                //为空时
                if (!hasfile) {
                    that.showMessage("Is empty");
                }

                that.showCacheInfo();

                //载入配置
                if (that.configUrl) {
                    uuid.fetch(that, that.configUrl, function (data) {
                        that.dataCache.config = data = JSON.parse(decodeURIComponent(escape(atob(data.content))));

                        //背景图片
                        var bgi = uuid.getJSONValue(data, 'theme:background-image');
                        if (bgi) {
                            var img = new Image();
                            img.src = bgi;
                            img.onload = function () {
                                document.body.style.backgroundImage = "url('" + this.src + "')";
                            }
                        }
                    }, 'json')
                }
            })
        },
        //设置token
        tokens: function () {
            document.title += "-token";
            var dr = document.createElement("div");
            dr.style.cssText = "max-width:500px;margin:5% auto";
            var htm = [
                '<h4 class="py-3">Personal access tokens（令牌）</h4>',
                '<div class="form-group">',
                '<input class="form-control form-control-lg" placeholder="粘贴 空token，长度40位" maxlength="40">',
                '</div>',
                '<div>',
                '粘贴后，刷新你的uuid</br>',
                '匿名访问有速率限制（GitHub每小时60次）</br>',
                '如果超出限制会返回 <code>403</code> 错误</br>',
                '需要设置令牌（Personal access tokens）</br>',
                '创建一个命名为 <code>empty</code> 的 <code>空令牌</code> （不用勾选任何项）</br>',
                '链接：<a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a>',
                '</div>'
            ];

            dr.innerHTML = htm.join('');
            var inp = dr.getElementsByTagName('input')[0];
            inp.oninput = function () {
                if (this.value.length == 40) {
                    localStorage.setItem("uuid-token", this.value);
                } else {
                    localStorage.removeItem("uuid-token");
                }
            }
            inp.onblur = function () {
                if (this.value.length != 40) {
                    this.value = '';
                }
            }
            if (this.token && this.token.length == 40) {
                inp.value = this.token;
            }

            this.id.appendChild(dr);
        },
        //显示消息
        showMessage: function (msg) {
            var h2 = document.createElement('h2');
            h2.className = "text-danger text-center my-5";
            h2.innerHTML = msg;
            this.id.appendChild(h2)
        },
        //显示缓存信息
        showCacheInfo: function () {
            var cp = document.createElement("p");
            cp.className = "small text-muted";
            cp.style.clear = "both";
            cp.style.opacity = .7;
            if (this.iscache) {
                cp.innerHTML = '当前信息从本地读取，<span class="text-primary" style="cursor:pointer" onclick="uu.cacheClear()">刷新</span>';
            }
            this.id.appendChild(cp);
        },
        //清除当前用户的本地存储
        cacheClear: function () {
            uuid.cacheClear(this.name);
        }
    }

    uuid.fn.init.prototype = uuid.fn;

    //默认的图标
    uuid.defaultFavicon = "/src/net.svg";
    //默认源仓库
    uuid.defaultRepos = "/netnr/uuid";
    //默认配置文件
    uuid.defaultConfig = "config.json";
    //默认搜索
    uuid.defaultSearch = "https://www.baidu.com/s?&wd=";

    /**
     * 赋值默认值
     * @param {any} val 值
     * @param {any} dv 默认值
     */
    uuid.setDv = function (val, dv) {
        if (!val || val == "" || val == "index.html") {
            val = dv;
        }
        return val;
    }

    /**
     * 获取JSON的值
     * @param {any} data 数据源
     * @param {any} keyPath 键路径
     */
    uuid.getJSONValue = function (data, keyPath) {
        var kps = keyPath.split(':'), di = 0, val;
        while (di < kps.length && data && typeof data == "object") {
            val = (val || data)[kps[di++]];
        }
        return val;
    }

    /**
     * 阻止默认行为
     * @param {any} e
     */
    uuid.stopDefault = function (e) {
        if (e && e.preventDefault) {
            e.preventDefault()
        } else {
            window.event.returnValue = false
        }
    };

    /**
     * 获取本地存储记录
     * @param {any} name 账号
     * @param {any} key 键
     */
    uuid.cacheGet = function (name, key) {
        var result = { ok: false, value: null };

        var udata = localStorage.getItem("uuid_" + name);
        if (udata && udata != "") {
            var ujson = JSON.parse(udata);
            //缓存3天
            result.ok = new Date().valueOf() - ujson["__create_time__" + key] < 1000 * 3600 * 24 * 3;
            //值
            result.value = ujson[key];
        }
        return result;
    };

    /**
     * 设置本地存储记录
     * @param {any} name 账号
     * @param {any} key 键
     * @param {any} value 值
     */
    uuid.cacheSet = function (name, key, value) {
        var udata = localStorage.getItem("uuid_" + name);
        var ujson = {};
        if (udata && udata != "") {
            ujson = JSON.parse(udata);
        }
        ujson["__create_time__" + key] = new Date().valueOf();
        ujson[key] = value;
        localStorage.setItem("uuid_" + name, JSON.stringify(ujson));
    };

    /**
     * 清除当前用户的本地存储
     * @param {any} name 账号
     */
    uuid.cacheClear = function (name) {
        localStorage.removeItem("uuid_" + name);
        location.reload(false);
    }

    /**
     * 请求
     * @param {any} uu uuid对象
     * @param {any} src 链接
     * @param {any} callback 回调
     * @param {any} dataType 数据类型
     * @param {any} error 错误回调
     */
    uuid.fetch = function (uu, src, callback, dataType, error) {
        //优先取缓存
        var cg = uuid.cacheGet(uu.name, src);
        if (cg.ok && cg.value) {
            uu.iscache = true;
            callback(cg.value);
        } else {
            var init = {};
            if (uu.githost == "github" && uu.token && uu.token.length == 40) {
                init["headers"] = {
                    "Authorization": "token " + uu.token,
                }
            }
            if (uu.islimit) {
                return
            }
            fetch(src, init).then(function (res) {
                if (res.ok) {
                    return res[dataType]();
                } else {
                    if (res.status == 403) {
                        if (!uu.islimit) {
                            var htm = [
                                res.statusText + "(" + res.status + ")</br><hr/>",
                                '<div class="small text-muted">受限制，',
                                '<a href="/_token">设置token</a></div>'
                            ];
                            uu.showMessage(htm.join(''));
                        }
                        uu.islimit = true;
                    } else {
                        throw new Error(res)
                    }
                }
            }).then(function (data) {
                uu.iscache = false;
                callback(data);
                uuid.cacheSet(uu.name, src, data);
            }).catch(function (e) {
                if (cg.value) {
                    uu.iscache = true;
                    callback(cg.value);
                } else if (!uu.islimit) {
                    error && error(e)
                }
            })
        }
    }

    window.uuid = uuid;

})(window);

var uu = uuid();