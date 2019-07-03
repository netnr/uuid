/*
 * uuid
 * 2019-07
 * 
 * by netnr
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
            //个人信息接口源
            this.apiuser = ops.apiuser || "https://api.github.com/users/";
            //仓库接口源
            this.apirepos = ops.apirepos || "https://api.github.com/repos/";

            var pns = location.pathname.split('/');
            //账号
            this.name = ops.name || (pns[1] == "" ? "netnr" : pns[1]);
            //仓库
            this.reps = ops.reps || ((!pns[2] || pns[2] == "") ? "uuid" : pns[2]);
            //包
            this.libs = ops.libs || ((!pns[3] || pns[3] == "") ? "libs" : pns[3]);
            //访问路径
            this.dir = this.apirepos + this.name + "/" + this.reps + "/contents/" + this.libs;

            this.info();

            this.build();

            return this;
        },
        //个人信息
        info: function () {
            var that = this;
            var ind = document.createElement("div");
            ind.className = "mt-2 mb-4";
            this.id.appendChild(ind);
            this.downFile(this.apiuser + this.name, function (data) {
                data = JSON.parse(data);
                document.title = data.login + " - " + document.title;
                
                var indhtm = [];
                indhtm.push('<img class="uphoto" src="' + data.avatar_url + '" onerror="this.src=\'favicon.svg\';this.onerror=null;" />');
                indhtm.push('<a class="text-muted h4" href="https://github.com/' + data.login + '">' + data.login + '</a><br/>');
                if (data.blog) {
                    indhtm.push('<a class="small" href="' + data.blog + '">' + data.blog + '</a>');
                } else {
                    indhtm.push('<a class="small text-muted">no blog</a>');
                }
                ind.innerHTML = indhtm.join('');

                that.search();
            })
        },
        //搜索
        search: function () {
            var that = this;
            var sh = document.createElement("input");
            sh.className = "form-control form-control-sm mt-2";
            sh.style.width = "55%";
            sh.placeholder = "Search ...";
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
            that.id.firstChild.appendChild(sh);
        },
        //构建
        build: function () {
            var that = this;
            that.fetchContent("", function (data) {
                //缓存
                that.dataCache = {};
                that.dataCache.content = data;

                var hasfile = false;
                //遍历目录
                data.forEach(function (item) {
                    //是文件
                    if (item.type == "file") {
                        hasfile = true;

                        //card 标题，链接
                        var type = item.name.substr(0, item.name.lastIndexOf('.'));
                        var typelink = item.html_url;

                        //创建卡片
                        var card = document.createElement("div");
                        card.className = "card border-success my-3";

                        var cardhtml = [];
                        cardhtml.push('<div class="card-header border-success"><a href="' + typelink + '" >' + type + '</a></div>');
                        cardhtml.push('<div class="card-body">');
                        cardhtml.push('<p class="card-text"> loading </p>');
                        cardhtml.push('</div>');

                        card.innerHTML = cardhtml.join('');
                        //显示卡片
                        that.id.appendChild(card);

                        //加载卡片下的链接，一个卡片对应一个文件
                        that.downFile(item.download_url, function (data) {
                            var list = data.split('\n');
                            var ahtm = [];
                            //遍历每一行，解析成A标签
                            list.forEach(function (line) {
                                //满足Markdown的链接格式，有效行
                                if (/\[.*?\]\(http.*?\)/.test(line)) {
                                    //A标签显示的文本、图标、链接
                                    var atext, aicon, ahref;
                                    line.replace(/\(http.*?\)/, function (x) {
                                        ahref = x.substring(1, x.length - 1).trim();
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
                                    ahtm.push('<a href="' + ahref + '"><img data-src="' + aicon + '" src="src/net.svg"/> ' + atext + '</a>');
                                }
                            })
                            card.lastChild.innerHTML = ahtm.join('');

                            //加载图标
                            var cardimg = card.lastChild.getElementsByTagName('img');
                            for (var i = 0; i < cardimg.length; i++) {
                                var img = new Image();
                                img.that = cardimg[i];
                                img.onload = function () { this.that.src = this.src; };
                                img.onerror = function () { this.that.src = "src/net.svg"; this.onerror = null; };
                                var iconsrc = img.that.getAttribute('data-src');
                                //代理http图片请求为https
                                img.src = iconsrc.replace("http://", "https://proxy.zme.ink/");
                            }
                        });
                    }
                });
                //为空时
                if (!hasfile) {
                    that.showMessage("Is empty");
                }
            })
        },
        //显示消息
        showMessage: function (msg) {
            this.id.innerHTML = "<h2 class='text-info text-center my-5'>" + msg + "</h2>";
        },
        //获取目录
        fetchContent: function (path, callback) {
            var that = this;
            var uri = that.dir + path;
            //优先取缓存
            var cg = that.cacheGet(uri);
            if (cg.ok && cg.value) {
                callback(cg.value);
            } else {
                fetch(uri)
                    .then(x => x.json())
                    .then(function (data) {
                        callback(data);
                        that.cacheSet(uri, data);
                    }).catch(function (e) {
                        if (cg.value) {
                            callback(cg.value);
                        } else {
                            console.log(e);
                            that.showMessage("Invalid library");
                        }
                    })
            }
        },
        //获取文件内容
        downFile: function (src, callback) {
            var that = this;
            //优先取缓存
            var cg = that.cacheGet(src);
            if (cg.ok && cg.value) {
                callback(cg.value);
            } else {
                fetch(src)
                    .then(x => x.text())
                    .then(function (data) {
                        callback(data);
                        that.cacheSet(src, data);
                    }).catch(function (e) {
                        if (cg.value) {
                            callback(cg.value);
                        } else {
                            console.log(e);
                        }
                    })
            }
        },
        //获取本地存储记录
        cacheGet: function (key) {
            var result = {
                ok: false,
                value: null
            };
            var udata = localStorage.getItem("uuid_" + this.name);
            if (udata && udata != "") {
                var ujson = JSON.parse(udata);
                //缓存30分钟
                result.ok = new Date().valueOf() - ujson["__create_time__" + key] < 1000 * 60 * 30;
                //值
                result.value = ujson[key];
            }
            return result;
        },
        //设置本地存储记录
        cacheSet: function (key, value) {
            var udata = localStorage.getItem("uuid_" + this.name);
            var ujson = {};
            if (udata && udata != "") {
                ujson = JSON.parse(udata);
            }
            ujson["__create_time__" + key] = new Date().valueOf();
            ujson[key] = value;
            localStorage.setItem("uuid_" + this.name, JSON.stringify(ujson));
        },
        //清除当前用户的本地存储
        cacheClear: function () {
            localStorage.removeItem("uuid_" + this.name);
        }
    }

    uuid.fn.init.prototype = uuid.fn;

    window.uuid = uuid;

})(window);

var uu = uuid({name:"netnr"});