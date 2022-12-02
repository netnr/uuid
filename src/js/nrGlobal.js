import { nrVary } from "./nrVary";
import { nrGrid } from "./nrGrid";
import { nrStorage } from "./nrStorage";
import { nrFunction } from "./nrFunction";

var nrGlobal = {
    init: async () => {
        //主题
        var theme = nrFunction.cookie("nr-theme") || "light";
        await nrGlobal.setTheme(theme);

        //构建
        await nrGlobal.buildDialogToken();

        //布局
        await nrGlobal.buildDom();

        //事件
        nrGlobal.bindEvent();

        //仓库路径
        var pns = (location.hash.length > 1 ? location.hash : location.pathname).substring(1).split('/');
        if (pns[0] != "") {
            nrVary.markName = pns[0];
        }
        if (pns[1] != null && pns[1] != "") {
            nrVary.markResp = pns[1];
        }
        if (pns[2] != null && pns[2] != "") {
            nrVary.markLibs = pns[2];
        }

        //存储初始化
        var localforage = await nrGlobal.getPackage("localforage");
        nrStorage.init(localforage);

        //local
        var localUsed = await nrStorage.instanceCache.getItem('local');
        if (localUsed === true) {
            nrVary.markLocalUsed = localUsed;
            nrVary.domDdMore.querySelector('[data-action="local"]').checked = true;
        }

        //token
        var token = await nrStorage.instanceCache.getItem('uuid-token-github');
        if (token != null && token.length > 10) {
            nrVary.markToken = token;
            nrVary.domDdMore.querySelector('[data-action="token"]').checked = true;
        }

        //proxy
        var proxyUsed = await nrStorage.instanceCache.getItem('proxy');
        if (proxyUsed === true) {
            nrVary.markProxyUsed = proxyUsed;
            nrVary.domDdMore.querySelector('[data-action="proxy"]').checked = true;
        }

        //呈现
        nrVary.domLoading.classList.add('d-none');
        nrVary.domLayout.classList.remove('invisible');
        document.body.style.removeProperty("background-color");
        document.body.style.removeProperty("color");

        await nrGlobal.load();
    },

    load: async () => {
        nrVary.domBtnRefresh.loading = true;

        await nrGlobal.viewUser();
        await nrGlobal.viewTable();

        nrVary.domBtnRefresh.loading = false;
        await nrGlobal.runEvent("resize")

        //自动刷新缓存
        try {
            var updateTime = await nrStorage.instanceUser.getItem(`${nrVary.markName}:update-time`);
            if (updateTime && Date.now() - updateTime > 1000 * 3600 * 24 * 7) {
                await nrGlobal.reqUser(nrVary.markName, true);
                await nrGlobal.reqLibs(nrVary.markName, nrVary.markResp, nrVary.markLibs, true);
            }
        } catch (error) { }
    },

    /**
     * 引用包
     * @param {any} name
     */
    getPackage: async (name) => {
        if (!(name in window)) {
            console.debug(`import ${name}`);
            nrGlobal.reqStatus();

            try {
                switch (name) {
                    case "bootstrap":
                        import('bootstrap/dist/css/bootstrap.css');
                        break;
                    case "marked":
                        window[name] = await import('marked');
                        break;
                    case "localforage":
                        window[name] = await import('localforage');
                        break;
                    case "shoelace":
                        import('@shoelace-style/shoelace/dist/themes/light.css');
                        import('@shoelace-style/shoelace/dist/themes/dark.css');
                        window[name] = await import('@shoelace-style/shoelace');
                        break;
                    case "agGrid":
                        import('ag-grid-enterprise/dist/styles/ag-grid.css');
                        import('ag-grid-enterprise/dist/styles/ag-theme-alpine.css');
                        import('ag-grid-enterprise/dist/styles/ag-theme-alpine-dark.css');
                        // import('ag-grid-enterprise/dist/styles/ag-theme-balham.css');
                        // import('ag-grid-enterprise/dist/styles/ag-theme-balham-dark.css');            
                        var agGrid = await import('ag-grid-enterprise');
                        window["nrGrid"] = (await import('./nrGrid')).nrGrid;
                        agGrid.LicenseManager.prototype.outputMissingLicenseKey = _ => { }
                        window[name] = agGrid;
                        break;
                }
            } catch (error) {
                nrGlobal.logError(error, `加载包 ${name} 失败`);
            }
            nrGlobal.reqStatus(true);
        }
        return window[name];
    },

    /**
     * 布局
     */
    buildDom: async () => {
        var domLayout = document.createElement("div");
        nrVary.domLayout = domLayout;
        domLayout.className = "invisible";

        domLayout.innerHTML = `
<sl-progress-bar class="nr-req-progress invisible" indeterminate style="--height: 3px;"></sl-progress-bar>
<div class="container-fluid">
    <div class="row mt-2">
        <div class="col-auto mb-2">
            <sl-dropdown class="nr-dd-user">
                <img class="nr-img-avatar rounded" slot="trigger" style="height:1.9em;width:1.9em;" src="/favicon.ico" >
                <sl-menu class="d-none"></sl-menu>
            </sl-dropdown>
        </div>
        <div class="col mb-2">
            <sl-input class="nr-txt-filter w-100" placeholder="Search.. Enter / Ctrl+Q " title="Ctrl + Q Search" size="small"></sl-input>
        </div>
        <div class="col-sm-auto">
            <sl-button class="nr-btn-expand mb-2" size="small" data-action="expand" title="展开折叠">Fold</sl-button>
            <sl-button class="nr-btn-refresh mb-2" size="small" data-action="refresh" title="刷新缓存">Refresh</sl-button>

            <sl-dropdown class="nr-dd-more">
                <sl-button class="mb-2" size="small" slot="trigger" caret>More</sl-button>
                <sl-menu>
                    <sl-menu-item data-action="theme">主题 Theme</sl-menu-item>
                    <sl-divider></sl-divider>
                    <sl-menu-item data-action="local" title="私有化部署 Privatization deployment">本地 Local</sl-menu-item>
                    <sl-menu-item data-action="token">设置 Token</sl-menu-item>
                    <sl-menu-item data-action="proxy" title="使用代理 use proxy">代理 Proxy</sl-menu-item>
                    <sl-menu-item data-action="check" title="检测链接状态 Check link status">检测 Check</sl-menu-item>
                    <sl-menu-item data-action="clear-cache" title="清理缓存 Clear cache">清理 Cache</sl-menu-item>
                    <sl-divider></sl-divider>
                    <sl-menu-item data-action="convert" title="转换浏览器导出的 HTML 书签">转换 Convert</sl-menu-item>
                    <sl-menu-item data-action="about">关于 About</sl-menu-item>
                </sl-menu>
            </sl-dropdown>
        </div>
        </div>
        <div class="nr-grid col-12 mt-1">
        </div>
    </div>
</div>
`;
        document.body.appendChild(domLayout);

        nrGlobal.buildObjNode(document.body, "nr-", nrVary);
    },

    /**
     * 构建节点对象
     * @param {any} domContainer 容器
     * @param {any} startsWithClass 开始样式名
     * @param {any} obj 赋值对象
     */
    buildObjNode: (domContainer, startsWithClass, obj) => {
        domContainer.querySelectorAll('*').forEach(node => {
            if (node.classList.value.startsWith(startsWithClass)) {
                var vkey = 'dom';
                node.classList[0].substring(3).split('-').forEach(c => vkey += c.substring(0, 1).toUpperCase() + c.substring(1))
                if (!(vkey in obj)) {
                    obj[vkey] = node;
                }
            }
        });
    },

    /**
     * 事件
     */
    bindEvent: () => {
        //全局点击
        document.body.addEventListener('click', async function (e) {
            var target = e.target;

            if (target.dataset.action) {
                //data-action
                nrGlobal.bindAction(target.dataset.action, target);
            } else if (target.dataset.href) {
                //data-href
                window.open(target.dataset.href)
            }
        });

        //全局按键
        document.body.addEventListener("keydown", function (e) {
            //ctrl + q search
            if (e.ctrlKey && e.key.toLowerCase() == 'q') {
                nrVary.domTxtFilter.focus();
            } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && document.activeElement == document.body) {
                //body ↑ ↓ focus cell
                nrVary.grid.api.setFocusedCell(0, 'libs')
            }
        })

        //自适应
        window.addEventListener('resize', () => nrGlobal.runEvent("resize"));
    },

    /**
     * 运行事件
     * @param {any} ename resize | theme
     * @param {any} args 参数
     */
    runEvent: async (ename, args) => {
        switch (ename) {
            case "resize":
                {
                    var mt = nrVary.domGrid.getBoundingClientRect().top + 15;
                    nrVary.domGrid.style.height = `calc(100vh - ${mt}px)`
                }
                break;
            case "theme":

                break;
        }
    },

    /**
     * 动作
     * @param {any} cmd 
     * @param {any} args 
     */
    bindAction: async (cmd, args) => {
        switch (cmd) {
            case "theme":
                {
                    await nrGlobal.setTheme(nrGlobal.isDark() ? "light" : "dark");
                }
                break;
            case "expand":
                {
                    if (nrVary.grid) {
                        if (nrVary.markExpand != true) {
                            nrVary.grid.api.collapseAll()
                            nrVary.markExpand = true;
                            nrVary.domBtnExpand.innerHTML = "Expand";
                        } else {
                            nrVary.grid.api.expandAll()
                            nrVary.markExpand = false;
                            nrVary.domBtnExpand.innerHTML = "Fold";
                        }
                    }
                }
                break;
            case "token":
                {
                    await nrVary.domDialogToken.show();
                }
                break;
            case "local":
                {
                    var onlineHref = `https://github.com/${nrVary.markName}/${nrVary.markResp}`;
                    var onlineText = `线上 GitHub (<a href="${onlineHref}">${onlineHref}</a>)`;
                    var localHref = new URL(nrVary.markLocalPath, location).href;
                    var localText = `本地 Local (<a href="${localHref}">${localHref}</a>)`;
                    var toIcon = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M448 789.312V0h128v789.312l234.688-234.624L896 640l-384 384-384-384 85.312-85.312L448 789.312z" fill="currentColor"></path></svg>';

                    var msg = nrVary.markLocalUsed ? `${localText}<div class="my-2">${toIcon}</div>${onlineText}` : `${onlineText}<div class="my-2">${toIcon}</div>${localText}`;

                    if (await nrFunction.confirm(msg, '切换 switch')) {
                        nrVary.markLocalUsed = !nrVary.markLocalUsed;
                        await nrStorage.instanceCache.setItem('local', nrVary.markLocalUsed);
                        nrVary.domDdMore.querySelector('[data-action="local"]').checked = nrVary.markLocalUsed;

                        location.reload();
                    }
                }
                break;
            case "proxy":
                {
                    nrVary.markProxyUsed = !nrVary.markProxyUsed;
                    await nrStorage.instanceCache.setItem('proxy', nrVary.markProxyUsed);
                    nrVary.domDdMore.querySelector('[data-action="proxy"]').checked = nrVary.markProxyUsed;
                }
                break;
            case "refresh":
                {
                    //清空 user
                    var keys = await nrStorage.instanceUser.keys();
                    for (const key of keys) {
                        if (key.startsWith(`${nrVary.markName}:`)) {
                            await nrStorage.instanceUser.removeItem(key);
                        }
                    }

                    await nrGlobal.load();
                }
                break;
            case "convert":
                {
                    await nrGlobal.buildDialogConvert();
                    await nrVary.domDialogConvert.show();
                }
                break;
            case "clear-cache":
                {
                    (await caches.keys()).forEach(cacheName => caches.delete(cacheName));
                }
                break;
            case "about":
                {
                    var html = `
<div>Source: <a href="https://github.com/netnr/uuid">https://github.com/netnr/uuid</a></div>
<div>联系打赏: <a href="https://zme.ink">https://zme.ink</a></div>
<sl-divider></sl-divider>
<div>Fork 项目，从浏览器导出书签 HTML，再转换书签为 Markdown，保存到 libs/*.md</div>
<div class="mt-2">缓存后可离线使用，表格虚拟滚动，流畅支持海量书签</div>
<sl-divider></sl-divider>
<div>私有化部署 dist，再把 libs 文件夹拷贝到 dist，更新索引文件 libs/index.json，再启用本地 Local</div>
`;
                    nrFunction.alert(html, 'About 关于');
                }
                break;
            case "check":
                {
                    if (nrVary.grid) {
                        if (nrVary.markChecking) {
                            nrVary.markChecking = false;
                        } else {
                            var rowNodes = nrVary.grid.api.getSelectedNodes();
                            if (rowNodes.length) {
                                nrVary.grid.api.expandAll()

                                nrVary.markCheckResult.ok = [];
                                nrVary.markCheckResult.bad = [];
                                nrVary.markChecking = true;
                                nrVary.domDdMore.querySelector('[data-action="check"]').checked = true;
                                var column = nrVary.grid.columnApi.getColumn('ahref');
                                for (const rowNode of rowNodes) {
                                    if (nrVary.markChecking) {
                                        nrVary.grid.api.ensureIndexVisible(rowNode.rowIndex); //滚动到行显示
                                        nrVary.grid.api.flashCells({ rowNodes: [rowNode] }); //闪烁行

                                        //检测链接
                                        var isOk = false;
                                        var result = await nrGlobal.reqCheck(rowNode.data.ahref);
                                        if (result == null || result.ok == false) {
                                            nrVary.markCheckResult.bad.push(rowNode.data.ahref);
                                        } else {
                                            isOk = true;
                                            nrVary.markCheckResult.ok.push(rowNode.data.ahref)
                                        }

                                        //更新
                                        rowNode.data.acheck = isOk;
                                        nrVary.grid.api.applyTransaction({
                                            update: [rowNode.data]
                                        })
                                        nrVary.grid.api.refreshCells({
                                            force: true,
                                            columns: [column],
                                            rowNodes: [rowNode]
                                        });
                                    } else {
                                        break;
                                    }
                                }
                                nrVary.markChecking = false;
                                nrVary.domDdMore.querySelector('[data-action="check"]').checked = false;
                                if (nrVary.markCheckResult.bad.length) {
                                    nrFunction.alert(nrVary.markCheckResult.bad.join('<br/>'), '检测异常结果')
                                } else {
                                    nrFunction.toast('链接访问正常')
                                }
                            } else {
                                nrFunction.alert("请选择多行")
                            }
                        }
                    }
                }
                break;
        }
    },

    isDark: () => document.documentElement.classList.contains('sl-theme-dark'),

    /**
     * 设置主题
     * @param {any} theme 
     */
    setTheme: async (theme) => {
        //设置 shoelace
        document.documentElement.classList.remove("sl-theme-light");
        document.documentElement.classList.remove("sl-theme-dark");
        document.documentElement.classList.add(`sl-theme-${theme}`);

        //设置 ag-grid
        var agThemeDark = `${nrVary.flagGridTheme}-dark`;
        document.querySelectorAll('div.nr-grid').forEach(item => {
            if (theme == "dark") {
                item.classList.remove(nrVary.flagGridTheme);
                item.classList.add(agThemeDark);
            } else {
                item.classList.remove(agThemeDark);
                item.classList.add(nrVary.flagGridTheme);
            }
        });

        //改变主题
        await nrGlobal.runEvent("theme", theme);

        //存储
        nrFunction.cookie('nr-theme', theme, 1000 * 3600 * 24 * 365);
    },

    /**
     * 弹层抑制隐藏：点击遮罩层、按 ESC
     * @param {any} domDialog
     */
    dialogSuppressHide: (domDialog) => {
        domDialog.addEventListener('sl-request-close', event => {
            if ("keyboard,overlay".includes(event.detail.source)) {
                event.preventDefault();
            }
        });
    },

    /**
     * 异常
     * @param {any} error 
     * @param {any} tips
     */
    logError: (error, tips) => {
        if (tips != null && window["shoelace"]) {
            nrFunction.toast(tips);
        }
        console.debug(`${error}`);
    },

    /**
     * 请求状态
     * @param {any} isEnd 结束
     */
    reqStatus: (isEnd) => {
        if (nrVary.domReqProgress) {
            if (isEnd) {
                nrVary.markReqCount > 0 && nrVary.markReqCount--;
            } else {
                nrVary.markReqCount++;
            }
            if (nrVary.markReqCount > 0) {
                nrVary.domReqProgress.classList.remove('invisible')
            } else {
                nrVary.domReqProgress.classList.add('invisible')
            }
        }
    },

    /**
     * 请求服务
     * @param {any} url 链接
     * @param {any} options 选项
     * @returns 
     */
    reqServer: async (url, options) => {
        try {
            options = options || {};
            options.cache = "no-cache";

            //token
            if (nrVary.markToken != null && nrVary.markToken.length > 10 && !url.includes("githubusercontent")) {
                options.headers = options.headers || {};
                options.headers["authorization"] = `token ${nrVary.markToken}`;
            }

            //代理线上
            if (nrVary.markProxyUsed && !nrVary.markLocalUsed) {
                var proxyServer = nrGlobal.getProxy("proxy");
                url = `${proxyServer}${encodeURIComponent(url)}`;
            }

            nrGlobal.reqStatus();
            var resp = await fetch(url, options);
            if (resp.ok == false) {
                console.debug(resp);
                nrGlobal.reqStatus(true);
                if ([401, 403, 502].includes(resp.status)) {
                    nrFunction.toast("设置 Token");
                }
                throw new Error(`${resp.status} ${resp.statusText}`);
            } else {
                var result = await resp.text();
                nrGlobal.reqStatus(true);
                return result;
            }
        } catch (error) {
            nrGlobal.reqStatus(true);
            nrGlobal.logError(error, `请求失败：${url}`);
            return null;
        }
    },

    reqHeadersWWW: headers => Object.assign({
        "content-type": "application/x-www-form-urlencoded"
    }, headers),

    /**
     * 检测死链
     * @param {*} url 
     * @returns 
     */
    reqCheck: async (url) => {
        try {
            var checkServer = nrGlobal.getProxy("check");
            var resp = await fetch(`${checkServer}${encodeURIComponent(url)}`, { cache: 'no-cache' });
            return resp;
        } catch (error) {
            nrGlobal.reqStatus(true);
            nrGlobal.logError(error, `请求失败：${url}`);
            return null;
        }
    },

    /**
     * 请求用户
     * @param {*} name 用户名
     * @param {*} flush 强刷
     */
    reqUser: async (name, flush) => {
        var url = `https://api.github.com/users/${name}`;

        var ckey = `${name}:${url}`;
        var result = await nrStorage.instanceUser.getItem(ckey);
        if (result == null || flush) {
            result = await nrGlobal.reqServer(url);
            if (result != null) {
                result = JSON.parse(result);
                await nrStorage.instanceUser.setItem(ckey, result);
                await nrStorage.instanceUser.setItem(`${name}:update-time`, Date.now());
            }
        }
        return result;
    },

    /**
     * 请求 libs
     * @param {*} name 用户名
     * @param {*} resp 仓库名
     * @param {*} libs 包名
     * @param {*} flush 强刷
     */
    reqLibs: async (name, resp, libs, flush) => {
        var url = `https://api.github.com/repos/${name}/${resp}/contents/${libs}`;
        var ckey = `${name}:${url}`;
        var result = await nrStorage.instanceUser.getItem(ckey);
        if (result == null || flush) {
            result = await nrGlobal.reqServer(url);
            if (result != null) {
                result = JSON.parse(result);
                await nrStorage.instanceUser.setItem(ckey, result);
            }
        }
        return result;
    },

    /**
     * 请求 Raw
     * @param {*} name 用户名
     * @param {*} resp 仓库名
     * @param {*} libs 包名
     */
    reqRaw: async (url) => {
        var ckey = `${nrVary.markName}:${url}`;
        var result = await nrStorage.instanceUser.getItem(ckey);
        if (result == null) {
            result = await nrGlobal.reqServer(url);
            if (result != null) {
                await nrStorage.instanceUser.setItem(ckey, result);
            }
        }
        return result;
    },

    /**
     * 获取代理
     * @param {*} type
     */
    getProxy: function (type) {
        switch (type) {
            case "proxy":
                {
                    var server = nrVary.markProxyServer[nrVary.markProxyIndex++];
                    if (nrVary.markProxyIndex == nrVary.markProxyServer.length) {
                        nrVary.markProxyIndex = 0;
                    }
                    return server;
                }
            case "check":
                {
                    var server = nrVary.markCheckServer[nrVary.markCheckIndex++];
                    if (nrVary.markCheckIndex == nrVary.markCheckServer.length) {
                        nrVary.markCheckIndex = 0;
                    }
                    return server;
                }
        }
    },

    /**
     * 设置 token
     */
    buildDialogToken: async () => {
        if (nrVary.domDialogToken == null) {
            let domDialog = document.createElement("sl-dialog");
            // domDialog.style = "--width:50em"
            domDialog.label = "Token（令牌）";
            domDialog.innerHTML = `
<div>Refresh after pasting</div>
<div>Anonymous access is limited (60 per hour)</div>
<sl-input class="my-3" placeholder="token"></sl-input>
<div><a target="_blank" href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></div>
`;
            document.body.appendChild(domDialog);
            nrVary.domDialogToken = domDialog;

            domDialog.addEventListener('sl-show', async function (event) {
                if (event.target == this) {
                    if (nrVary.markToken != null && nrVary.markToken.length > 10) {
                        domDialog.querySelector('sl-input').value = nrVary.markToken;
                    }
                }
            });

            domDialog.querySelector('sl-input').addEventListener('input', async function (event) {
                if (this.value.length > 10) {
                    nrVary.markToken = this.value;
                    nrVary.domDdMore.querySelector('[data-action="token"]').checked = true;
                    await nrStorage.instanceCache.setItem('uuid-token-github', nrVary.markToken);
                } else {
                    nrVary.markToken = null;
                    nrVary.domDdMore.querySelector('[data-action="token"]').checked = false;
                    await nrStorage.instanceCache.removeItem('uuid-token-github');
                }
            });
        }
    },

    /**
     * convert
     */
    buildDialogConvert: async () => {
        if (nrVary.domDialogConvert == null) {
            let domDialog = nrVary.domDialogConvert = document.createElement("sl-dialog");
            domDialog.style = "--width:90vw"
            domDialog.label = "Convert HTML bookmarks（转换书签）";
            domDialog.innerHTML = `
<div class="row mt-3">
    <div class="col-md-6">
        <input type="file" class="mb-2 w-100" />
        <textarea class="w-100 p-3"></textarea>
    </div>
    <div class="col-md-6">
        <div class="nr-card-preview overflow-auto"></div>
    </div>
</div>
`;
            document.body.appendChild(domDialog);

            domDialog.querySelector('.nr-card-preview').style.height = `calc(100vh - 260px)`;

            //选择文件
            domDialog.querySelector('input').addEventListener('change', async function (e) {
                var file = this.files[0];
                if (file) {
                    var content = await nrFunction.readFileContent(file);

                    var mds = [];
                    var domBookmark = document.createElement('div');
                    domBookmark.innerHTML = content;
                    mds.push("# " + domBookmark.querySelector('h1').innerHTML);
                    nrGlobal.convertHtml(domBookmark, mds);

                    var val = mds.join('\r\n');
                    domDialog.querySelector('textarea').value = val;
                    var marked = await nrGlobal.getPackage("marked");
                    domDialog.querySelector('.nr-card-preview').innerHTML = marked.parse(val);

                    this.value = "";
                }
            })

            //渲染
            domDialog.querySelector('textarea').addEventListener('input', async function () {
                var marked = await nrGlobal.getPackage("marked");
                domDialog.querySelector('.nr-card-preview').innerHTML = marked.parse(this.value);
            })

            domDialog.addEventListener('sl-show', async function (event) {
                if (event.target == this) {
                    domDialog.querySelector('textarea').style.height = `calc(100% - 55px)`
                }
            });
        }
    },

    convertHtml: (dom, mds) => {
        for (var i = 0; i < dom.children.length; i++) {
            var ele = dom.children[i];
            switch (ele.nodeName) {
                case "H3":
                    mds.push('');
                    mds.push("### " + ele.innerHTML);
                    break;
                case "DL":
                case "P":
                    nrGlobal.convertHtml(ele, mds);
                    break;
                case "DT":
                    {
                        if (ele.children.length == 1) {
                            var domA = ele.querySelector('a');
                            mds.push('- [' + domA.innerHTML.replace(/`/g, '\\`') + '](' + domA.href + ')');
                        } else {
                            nrGlobal.convertHtml(ele, mds);
                        }
                    }
                    break;
            }
        }
    },

    /**
     * 显示用户
     */
    viewUser: async () => {
        var result;
        if (nrVary.markLocalUsed) {
            var text = await nrGlobal.reqServer(nrVary.markLocalPath);
            try {
                nrVary.markLocalJson = JSON.parse(text);
                result = nrVary.markLocalJson["user"];
            } catch (error) { }
        } else {
            result = await nrGlobal.reqUser(nrVary.markName);
        }

        if (result) {
            nrVary.domImgAvatar.onerror = function () {
                nrVary.domImgAvatar.src = '/favicon.ico';
                nrVary.domImgAvatar.onerror = false;
            }
            //头像
            nrVary.domImgAvatar.src = result.avatar_url;

            //个人菜单
            var domMenu = nrVary.domImgAvatar.nextElementSibling;
            domMenu.classList.remove('d-none');

            var itemName = result.name == null ? result.login : `${result.login} (${result.name})`;
            var itemBio = result.bio == null ? '' : `<sl-menu-item title="bio">${result.bio}</sl-menu-item>`;
            var itemCompany = result.company == null ? '' : `<sl-menu-item title="company">${result.company}</sl-menu-item>`;
            var itemLocation = result.location == null ? '' : `<sl-menu-item title="location">${result.location}</sl-menu-item>`;
            var itemBlog = result.blog == null ? '' : `<sl-menu-item title="blog" data-href="${result.blog}">${result.blog}</sl-menu-item>`;
            domMenu.innerHTML = `
<sl-menu-item title="name" data-href="https://github.com/${result.login}">${itemName}</sl-menu-item>
${itemBio}
<sl-divider></sl-divider>
${itemCompany}${itemLocation}${itemBlog}
`;

            //标题
            document.title = `${result.login} - ${nrVary.flagTitle}`;
        }
    },

    /**
     * 显示表格
     */
    viewTable: async () => {
        var listLibs;
        if (nrVary.markLocalUsed) {
            try {
                listLibs = nrVary.markLocalJson["libs"] || [];
            } catch (error) { }
        } else {
            listLibs = await nrGlobal.reqLibs(nrVary.markName, nrVary.markResp, nrVary.markLibs);
        }
        //libs
        if (listLibs) {
            var marked = await nrGlobal.getPackage("marked");
            var headers = ["H1", "H2", "H3", "H4", "H5", "H6"];

            var rowData = [];
            for (const item of listLibs) {
                if (item.type == "file" && item.name.endsWith(nrVary.markSuffix)) {
                    var fileName = item.name.substring(0, item.name.length - nrVary.markSuffix.length);
                    var headName = null;

                    //md
                    if (item.name.endsWith(nrVary.markSuffix)) {
                        var rawContent = await nrGlobal.reqRaw(item.download_url);
                        if (rawContent) {
                            var domHtml = document.createElement('div');
                            domHtml.innerHTML = marked.parse(rawContent);
                            domHtml.querySelectorAll('*').forEach(ele => {
                                //head
                                if (headers.includes(ele.nodeName)) {
                                    headName = ele.innerText;
                                } else if (ele.nodeName == "A") {
                                    rowData.push({
                                        libs: fileName,
                                        head: headName,
                                        atext: ele.innerText,
                                        ahref: ele.href,
                                        atitle: ele.title
                                    });
                                }
                            })
                        }
                    }
                }
            }

            //停止检测
            if (nrVary.markChecking) {
                await nrGlobal.bindAction('check');
            }

            //grid 列
            var colDefs = [
                {
                    field: "libs", headerName: "类别", width: 240,
                    filter: true, filterParams: { buttons: ['reset'], },
                    rowGroup: true, enableRowGroup: true, cellRenderer: (params) => {
                        return `<span style="margin-left: 2.5em">${params.value}</span>`;
                    },
                },
                {
                    field: "head", headerName: "小组", width: 240,
                    filter: true, filterParams: { buttons: ['reset'], },
                    rowGroup: true, enableRowGroup: true,
                },
                { field: "atext", headerName: "名称", width: 300, filterParams: { buttons: ['reset'], }, },
                {
                    field: "ahref", headerName: "链接", minWidth: 300, flex: 1, filterParams: { buttons: ['reset'], },
                    cellStyle: (params) => {
                        if (params.data) {
                            if (params.data.acheck === true) {
                                return { color: 'var(--sl-color-success-500)' }
                            } else if (params.data.acheck === false) {
                                return { color: 'var(--sl-color-warning-500)' }
                            }
                        }
                    }
                },
                { field: "atitle", headerName: "备注", width: 300, filterParams: { buttons: ['reset'], }, },
                nrGrid.newColumnLineNumber({ headerCheckboxSelection: false, checkboxSelection: false }),
            ];

            //grid 配置
            let gridOptions = nrGrid.gridOptionsClient({
                columnDefs: colDefs,
                groupDisplayType: 'groupRows',
                groupDefaultExpanded: 2,
                rowData: rowData,
                onCellKeyDown: function (params) {
                    // enter 打开链接
                    if (params.data && params.event.key == "Enter") {
                        window.open(params.data.ahref)
                    }
                },
                onRowDoubleClicked: function (params) {
                    //双击 打开链接
                    if (params.data) {
                        window.open(params.data.ahref)
                    }
                }
            });

            //grid dom
            nrGrid.buildDom(nrVary.domGrid);

            //grid 显示
            nrVary.grid = await nrGrid.viewGrid(nrVary.domGrid, gridOptions);

            if (nrVary.domTxtFilter.getAttribute("data-bind") == null) {
                nrVary.domTxtFilter.setAttribute("data-bind", true);

                nrVary.domTxtFilter.addEventListener('input', async function () {
                    nrVary.grid.api.setQuickFilter(this.value);
                });
                nrVary.domTxtFilter.addEventListener('keydown', async function (e) {
                    if (e.keyCode == 13) {
                        nrVary.grid.api.setFocusedCell(0, 'libs')
                    }
                });
            }
        } else {
            nrVary.domGrid.innerHTML = nrVary.flagFailHtml;
        }
    },

}

export { nrGlobal };