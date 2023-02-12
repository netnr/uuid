import { nrcFile } from "./nrc/nrcFile";
import { nrcShared } from "./nrc/nrcShared";
import { nrVary } from "./nrVary";

// 方法
let nrFunction = {

    isDark: () => document.documentElement.dataset.bsTheme == 'dark',

    /**
     * 设置主题
     * @param {any} theme 
     */
    setTheme: async (theme) => {
        let oldTheme = theme == "dark" ? "light" : "dark";

        document.documentElement.className = document.documentElement.className.replace(oldTheme, theme);
        document.documentElement.dataset.bsTheme = theme;

        nrcShared.cookie('.theme', theme, 1000 * 3600 * 24 * 365);
    },

    /**
     * 设置加载
     * @param {*} domBtn 
     * @param {*} isCancel 
     */
    setLoading: (domBtn, isCancel) => {
        domBtn.disabled = !isCancel;

        if (isCancel) {
            domBtn.classList.remove('nrg-loading');
            let domLoadingWait = domBtn.querySelector('.nrg-loading-wait');
            domLoadingWait && domLoadingWait.remove();
        } else {
            if (!domBtn.classList.contains('nrg-loading')) {
                domBtn.classList.add('nrg-loading');

                let domLoadingWait = document.createElement('span');
                domLoadingWait.className = "nrg-loading-wait";
                domLoadingWait.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
                domBtn.appendChild(domLoadingWait);
            }
        }
    },

    render: async () => {
        let domLayout = document.createElement("div");
        nrVary.domLayout = domLayout;
        domLayout.className = "invisible";

        domLayout.innerHTML = `
<div class="container-fluid p-lg-4 pb-lg-0 py-4">
    <div class="row">

        <div class="col-auto mb-2">
            <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" data-bs-toggle="dropdown">
                    <img class="nrg-img-avatar rounded" style="height:1.3em;width:1.3em;" src="/favicon.ico" >
                </button>
                <ul class="nrg-dd-user-info dropdown-menu"></ul>
            </div>
        </div>

        <div class="col mb-2">
            <input class="nrg-txt-filter form-control" type="search" placeholder="silent search.." data-search="" title="silent search.." />
        </div>

        <div class="col-auto mb-2">
            <div class="btn-group">
                <button class="nrg-btn-refresh btn btn-outline-success" data-action="refresh" title="刷新缓存">Refresh</button>
                <button type="button" class="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="nrg-dd-more dropdown-menu">
                    <li><button class="dropdown-item" data-action="theme">主题 Theme</button></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item" data-action="local" title="私有化部署 Privatization deployment">本地 Local</button></li>
                    <li><button class="dropdown-item" data-action="token">设置 Token</button></li>
                    <li><button class="dropdown-item" data-action="proxy" title="使用代理 use proxy">代理 Proxy</button></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item" data-action="convert" title="转换浏览器导出的 HTML 书签">转换 Convert</button></li>
                    <li><button class="dropdown-item" data-action="about">关于 About</button></li>
                </ul>
            </div>
        </div>
        <div class="col-12 position-relative">
            <div class="nrg-search border rounded d-none position-absolute"></div>
        </div>        
    </div>
    <div class="nrg-view row my-3"></div>
</div>
`;
        document.body.appendChild(domLayout);
        nrcShared.readDOM(document.body, "nrg", nrVary);
    },

    load: async () => {
        nrFunction.setLoading(nrVary.domBtnRefresh)

        await nrFunction.viewUser();
        await nrFunction.viewLink();

        nrFunction.setLoading(nrVary.domBtnRefresh, true);

        //自动刷新缓存
        try {
            let updateTime = await nrStorage.instanceUser.getItem(`${nrVary.markName}:update-time`);
            if (updateTime && Date.now() - updateTime > 1000 * 3600 * 24 * 7) {
                await nrFunction.reqUser(nrVary.markName, true);
                await nrFunction.reqLibs(nrVary.markName, nrVary.markResp, nrVary.markLibs, true);
            }
        } catch (error) { }
    },

    /**
     * 事件
     */
    bindEvent: () => {
        //全局点击
        document.body.addEventListener('click', async function (e) {
            let target = e.target;

            if (target.dataset.action) {
                //data-action
                nrFunction.bindAction(target.dataset.action, target);
            }
        });

        //搜索
        nrVary.domTxtFilter.addEventListener('keydown', function (event) {
            if (["ArrowUp", "ArrowDown"].includes(event.code)) {
                event.preventDefault();
                nrFunction.searchArrow(event.code);
            } else if (event.code == "Enter") {
                event.preventDefault();
                let domActive = nrVary.domSearch.querySelector('a.active');
                if (domActive) {
                    domActive.click();
                }
            }
        })
        nrVary.domTxtFilter.addEventListener('input', function (event) {
            nrFunction.searchLink(this.value.trim());
        });

        //全局按键
        document.body.addEventListener("keydown", function (event) {
            if (document.activeElement.nodeName != "INPUT") {
                //ctrl + q/k search
                if (event.ctrlKey && ["KeyQ", "KeyK"].includes(event.code)) {
                    event.preventDefault();
                    nrVary.domTxtFilter.focus();
                    nrVary.domTxtFilter.dataset.search = "";
                    nrVary.domTxtFilter.placeholder = nrVary.domTxtFilter.title;
                    nrFunction.searchLink("");
                } else if (event.code == "Backspace") {
                    //删除
                    event.preventDefault();
                    if (nrVary.domTxtFilter.dataset.search.length) {
                        nrVary.domTxtFilter.dataset.search = nrVary.domTxtFilter.dataset.search.slice(0, -1)
                    }
                    nrVary.domTxtFilter.placeholder = nrVary.domTxtFilter.dataset.search.length
                        ? nrVary.domTxtFilter.dataset.search
                        : nrVary.domTxtFilter.title;
                    nrFunction.searchLink(nrVary.domTxtFilter.dataset.search);
                } else if (event.code == "Enter") {
                    //确定
                    event.preventDefault();
                    if (!nrVary.domSearch.classList.contains('d-none')) {
                        let domActive = nrVary.domSearch.querySelector('a.active');
                        if (domActive) {
                            domActive.click();
                        }
                    }
                } else if (event.code == "Escape") {
                    //取消
                    event.preventDefault();
                    if (nrVary.domTxtFilter.dataset.search.length) {
                        nrVary.domTxtFilter.dataset.search = "";
                        nrVary.domTxtFilter.placeholder = nrVary.domTxtFilter.title;
                        nrFunction.searchLink("");
                    }
                } else if (["ArrowUp", "ArrowDown"].includes(event.code)) {
                    //上 下
                    event.preventDefault();
                    if (nrVary.domTxtFilter.dataset.search.length) {
                        nrFunction.searchArrow(event.code);
                    }
                } else if (/^[a-z0-9\.\_\-\/]$/i.test(event.key) && !event.ctrlKey) {
                    nrVary.domTxtFilter.value = "";
                    document.documentElement.scrollTo(0, 0);

                    nrVary.domTxtFilter.dataset.search += event.key;
                    nrVary.domTxtFilter.placeholder = nrVary.domTxtFilter.dataset.search;
                    nrFunction.searchLink(nrVary.domTxtFilter.dataset.search);
                }
            }
        })
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
                    await nrFunction.setTheme(nrFunction.isDark() ? "light" : "dark");
                }
                break;
            case "token":
                {
                    //设置 Token
                    if (nrVary.domDialogToken == null) {
                        nrVary.domDialogToken = document.createElement('div');
                        nrVary.domDialogToken.innerHTML = `
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Token（令牌）</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div>Refresh after pasting</div>
            <div>Anonymous access is limited (60 per hour)</div>
            <input class="form-control my-3" placeholder="token" />
            <div><a target="_blank" href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></div>
        </div>
    </div>
</div>`;
                        nrVary.domDialogToken.className = "modal";
                        document.body.appendChild(nrVary.domDialogToken);
                        //记录Token
                        nrVary.domDialogToken.querySelector('input').addEventListener('input', async function () {
                            let domItem = nrVary.domDdMore.querySelector('[data-action="token"]');
                            if (this.value.trim() == "") {
                                domItem.classList.remove('active');
                                nrVary.markToken = null;
                                await nrStorage.removeItem('uuid-token-github');
                            } else if (this.value.length > 10) {
                                domItem.classList.add('active');
                                nrVary.markToken = this.value.trim();
                                await nrStorage.setItem('uuid-token-github', this.value.trim());
                            }
                        });

                        nrVary.bsDialogToken = new bootstrap.Modal(nrVary.domDialogToken);
                    }
                    nrVary.domDialogToken.querySelector('input').value = nrVary.markToken;

                    nrVary.bsDialogToken.show();
                }
                break;
            case "local":
                {
                    let onlineHref = `https://github.com/${nrVary.markName}/${nrVary.markResp}`;
                    let onlineText = `线上 GitHub (<a href="${onlineHref}">${onlineHref}</a>)`;
                    let localHref = new URL(nrVary.markLocalPath, location).href;
                    let localText = `本地 Local (<a href="${localHref}">${localHref}</a>)`;
                    let toIcon = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M448 789.312V0h128v789.312l234.688-234.624L896 640l-384 384-384-384 85.312-85.312L448 789.312z" fill="currentColor"></path></svg>';

                    let msg = nrVary.markLocalUsed ? `${localText}<div class="my-2">${toIcon}</div>${onlineText}` : `${onlineText}<div class="my-2">${toIcon}</div>${localText}`;

                    if (await nrFunction.confirm(msg, '切换 switch')) {
                        nrVary.markLocalUsed = !nrVary.markLocalUsed;
                        await nrStorage.setItem('local', nrVary.markLocalUsed);
                        nrVary.domDdMore.querySelector('[data-action="local"]').classList.toggle('active');

                        location.reload();
                    }
                }
                break;
            case "proxy":
                {
                    nrVary.markProxyUsed = !nrVary.markProxyUsed;
                    await nrStorage.setItem('proxy', nrVary.markProxyUsed);
                    nrVary.domDdMore.querySelector('[data-action="proxy"]').classList.toggle('active');
                }
                break;
            case "refresh":
                {
                    //清空 user
                    let keys = await nrStorage.instanceUser.keys();
                    for (const key of keys) {
                        if (key.startsWith(`${nrVary.markName}:`)) {
                            await nrStorage.instanceUser.removeItem(key);
                        }
                    }

                    await nrFunction.load();
                }
                break;
            case "convert":
                {
                    if (nrVary.domDialogConvert == null) {
                        nrVary.domDialogConvert = document.createElement('div');
                        nrVary.domDialogConvert.innerHTML = `
<div class="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Convert HTML bookmarks（转换书签）</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-lg-6">
                    <input type="file" class="mb-2 form-control" />
                    <textarea class="form-control" style="height:calc(100vh - 145px);"></textarea>
                </div>
                <div class="col-lg-6">
                    <div class="nrg-preview overflow-auto border rounded p-3" style="height:calc(100vh - 100px);">preview</div>
                </div>
            </div>
        </div>
    </div>
</div>`;
                        nrVary.domDialogConvert.className = "modal";
                        document.body.appendChild(nrVary.domDialogConvert);

                        //选择文件
                        nrVary.domDialogConvert.querySelector('input').addEventListener('change', async function () {
                            let file = this.files[0];
                            if (file) {
                                try {
                                    let content = await nrcFile.reader(file);

                                    let mds = [];
                                    let domBookmark = document.createElement('div');
                                    domBookmark.innerHTML = content;
                                    mds.push("# " + domBookmark.querySelector('h1').innerHTML);
                                    nrFunction.convertHtml(domBookmark, mds);

                                    let val = mds.join('\r\n');
                                    nrVary.domDialogConvert.querySelector('textarea').value = val;

                                    let marked = await import('marked');
                                    nrVary.domDialogConvert.querySelector('.nrg-preview').innerHTML = marked.parse(val);
                                } catch (ex) {
                                    console.debug(ex)
                                    nrFunction.alert('转换失败');
                                }
                                this.value = "";
                            }
                        })

                        //渲染
                        nrVary.domDialogConvert.querySelector('textarea').addEventListener('input', async function () {
                            let marked = await import('marked');
                            nrVary.domDialogConvert.querySelector('.nrg-preview').innerHTML = marked.parse(this.value);
                        })

                        nrVary.bsDialogConvert = new bootstrap.Modal(nrVary.domDialogConvert);
                    }

                    nrVary.bsDialogConvert.show();
                }
                break;
            case "about":
                {
                    let html = `
<div>Source: <a href="https://github.com/netnr/uuid">https://github.com/netnr/uuid</a></div>
<div>联系打赏: <a href="https://zme.ink">https://zme.ink</a></div>
<hr/>
<div class="mt-2">缓存后可离线使用</div>
<hr/>
<div>Fork 项目，从浏览器导出书签 HTML，再转换书签为 Markdown，保存到 libs/*.md</div>
<div>私有化部署 dist 分支，再把 libs 文件夹拷贝到 dist，更新索引文件 libs/index.json，再启用 本地 Local</div>
<hr/>
<div>为缩减经费，uuid.fun 于 2028-11-09 8:00 到期，计划不再续费，启用子域名，<a href="https://uu.zme.ink">https://uu.zme.ink</a></div>
`;
                    nrFunction.alert(html, 'About 关于');
                }
                break;
        }
    },

    /**
     * 请求用户
     * @param {*} name 用户名
     * @param {*} flush 强刷
     */
    reqUser: async (name, flush) => {
        let url = `https://api.github.com/users/${name}`;

        let ckey = `${name}:${url}`;
        let result = await nrStorage.instanceUser.getItem(ckey);
        if (result == null || flush) {
            result = await nrFunction.reqServer(url);
            if (result) {
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
        let url = `https://api.github.com/repos/${name}/${resp}/contents/${libs}`;
        let ckey = `${name}:${url}`;
        let result = await nrStorage.instanceUser.getItem(ckey);
        if (result == null || flush) {
            result = await nrFunction.reqServer(url);
            if (result) {
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
        let ckey = `${nrVary.markName}:${url}`;
        let result = await nrStorage.instanceUser.getItem(ckey);
        if (result == null) {
            result = await nrFunction.reqServer(url, { type: "text" });
            if (result) {
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
                    let server = nrVary.markProxyServer[nrVary.markProxyIndex++];
                    if (nrVary.markProxyIndex == nrVary.markProxyServer.length) {
                        nrVary.markProxyIndex = 0;
                    }
                    return server;
                }
        }
    },

    convertHtml: (dom, mds) => {
        for (let i = 0; i < dom.children.length; i++) {
            let ele = dom.children[i];
            switch (ele.nodeName) {
                case "H3":
                    mds.push('');
                    mds.push("### " + ele.innerHTML);
                    break;
                case "DL":
                case "P":
                    nrFunction.convertHtml(ele, mds);
                    break;
                case "DT":
                    {
                        if (ele.children.length == 1) {
                            let domLink = ele.querySelector('a');
                            mds.push('- [' + domLink.innerHTML.replace(/`/g, '\\`') + '](' + domLink.href + ')');
                        } else {
                            nrFunction.convertHtml(ele, mds);
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
        let result;
        //本地
        if (nrVary.markLocalUsed) {
            nrVary.markLocalJson = await nrFunction.reqServer(nrVary.markLocalPath);
            result = nrVary.markLocalJson["user"] || {};
        } else {
            result = await nrFunction.reqUser(nrVary.markName);
        }

        if (result) {
            nrVary.domImgAvatar.onerror = function () {
                nrVary.domImgAvatar.src = '/favicon.ico';
                nrVary.domImgAvatar.onerror = false;
            }
            //头像
            nrVary.domImgAvatar.src = result.avatar_url;

            //个人信息
            let itemName = result.name == null ? result.login : `${result.login} (${result.name})`;
            let itemBio = result.bio == null ? '' : `<li><span class="dropdown-item-text" title="bio">${result.bio}</span></li>`;
            let itemCompany = result.company == null ? '' : `<li><span class="dropdown-item-text" title="company">${result.company}</span></li>`;
            let itemLocation = result.location == null ? '' : `<li><span class="dropdown-item-text" title="location">${result.location}</span></li>`;
            let itemBlog = result.blog == null ? '' : `<li><a class="dropdown-item" title="blog" href="${result.blog}">${result.blog}</a></li>`;

            nrVary.domDdUserInfo.innerHTML = `<li><a class="dropdown-item" title="name" href="https://github.com/${result.login}">${itemName}</a></li>
            ${itemBio}<li><hr class="dropdown-divider"></li>${itemCompany}${itemLocation}${itemBlog}
            `;

            //标题
            document.title = `${result.login} - ${nrVary.flagTitle}`;
        }
    },

    /**
     * 显示链接
     */
    viewLink: async () => {
        let listLibs;
        if (nrVary.markLocalUsed) {
            listLibs = nrVary.markLocalJson["libs"] || [];
        } else {
            listLibs = await nrFunction.reqLibs(nrVary.markName, nrVary.markResp, nrVary.markLibs);
        }
        //libs
        if (listLibs) {
            let marked = await import('marked');

            let viewHtml = [];
            let fileIndex = 0;
            for (const item of listLibs) {
                if (item.type == "file" && item.name.endsWith(nrVary.markSuffix)) {
                    let fileName = item.name.substring(0, item.name.length - nrVary.markSuffix.length);

                    //md
                    if (item.name.endsWith(nrVary.markSuffix)) {
                        let rawContent = await nrFunction.reqRaw(item.download_url);
                        if (rawContent) {
                            fileIndex++
                            viewHtml.push(`
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${fileIndex}">${fileName}</button>
    </h2>
    <div id="collapse-${fileIndex}" class="accordion-collapse collapse show">
        <div class="accordion-body">${marked.parse(rawContent)}</div>
    </div>
</div>
                            `);
                        }
                    }
                }
            }

            nrVary.domView.innerHTML = `<div class="accordion">${viewHtml.join('')}</div>`;
            nrVary.domView.dataset.ended = true;
        } else {
            nrVary.domView.innerHTML = `<div class="col-12">${nrVary.flagFailHtml}</div>`;;
        }
    },

    searchLink: (key) => {
        if (nrVary.domView.dataset.ended) {
            let html = [];
            if (key.trim() != "") {
                key = key.toLowerCase()
                let domLinks = nrVary.domView.querySelectorAll('a');
                for (let index = 0; index < domLinks.length; index++) {
                    const domLink = domLinks[index];
                    let domText = `${domLink.href},${domLink.innerText},${domLink.title || ""}`.toLowerCase();
                    if (domText.includes(key)) {
                        html.push(`<a class="d-flex px-3 py-2 border-top opacity-75" href="${domLink.href}"><span class="w-75 text-truncate">${domLink.href}</span><span class="w-25 text-truncate">${domLink.innerText}</span></a>`);
                        if (html.length > 7) {
                            break;
                        }
                    }
                }
            }
            nrVary.domSearch.innerHTML = html.join('');
            if (html.length) {
                nrVary.domSearch.classList.remove('d-none');
                nrVary.domSearch.querySelector('a').classList.add('active');
            } else {
                nrVary.domSearch.classList.add('d-none');
            }
        }
    },
    searchArrow: (arrow) => {
        if (!nrVary.domSearch.classList.contains('d-none')) {
            let domActive = nrVary.domSearch.querySelector('a.active');
            let domNew = arrow == "ArrowDown" ? domActive.nextElementSibling : domActive.previousElementSibling;
            if (domNew) {
                domActive.classList.remove('active');
                domNew.classList.add('active');
            }
        }
    },

    /**
     * 请求服务
     * @param {any} url 链接
     * @param {any} options 选项 type: text blob json(default)
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
                let proxyServer = nrFunction.getProxy("proxy");
                url = `${proxyServer}${encodeURIComponent(url)}`;
            }

            let resp = await fetch(url, options);
            nrVary.resp = resp;

            if (resp.ok) {
                switch (options.type) {
                    case "text": return await resp.text();
                    case "blob": return await resp.blob();
                    default: return await resp.json();
                }
            } else {
                if ([401, 403, 502].includes(resp.status)) {
                    nrFunction.toast("设置 Token");
                }
                return null;
            }
        } catch (error) {
            console.debug(error);
            return null;
        }
    },

    /**
     * 异常
     * @param {any} error 
     * @param {any} tips
     */
    logError: (error, tips) => {
        if (tips != null) {
            nrFunction.toast(tips);
        }
        console.debug(`${error}`);
    },

    /**
     * 消息
     * @param {any} message 
     * @returns 
     */
    toast: function (message) {
        if (nrVary.domToastContainer == null) {
            nrVary.domToastContainer = document.createElement('div');
            nrVary.domToastContainer.className = "toast-container position-fixed bottom-0 end-0 p-4";
            document.body.appendChild(nrVary.domToastContainer);
        }

        let domToast = document.createElement("div");
        domToast.innerHTML = `
<div class="toast-header">
    <img src="/favicon.ico" class="rounded me-2" height="18">
    <strong class="me-auto">消息提示</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
</div>
<div class="toast-body">${message}</div>
`;
        domToast.className = "toast";
        nrVary.domToastContainer.appendChild(domToast);
        //构建
        let bsToast = new bootstrap.Toast(domToast);
        bsToast.show();
        //移除
        domToast.addEventListener('hidden.bs.toast', function (event) {
            event.target.remove();
        })
    },

    /**
     * 提示
     * @param {any} content 内容
     * @param {any} title 标题
     * @param {any} width
     */
    alert: (content, title, width = "50em") => {
        if (nrVary.domAlert == null) {
            nrVary.domAlert = document.createElement('div');
            nrVary.domAlert.innerHTML = `
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
        </div>
    </div>
</div>
            `;
            nrVary.domAlert.className = "modal";
            document.body.appendChild(nrVary.domAlert);

            nrVary.bsAlert = new bootstrap.Modal(nrVary.domAlert);
        }
        nrVary.domAlert.querySelector('.modal-title').innerHTML = title || "消息提示";
        nrcShared.cssvar(nrVary.domAlert, '--bs-modal-width', width);

        let domBody = nrVary.domAlert.querySelector('.modal-body');
        domBody.innerHTML = "";

        try {
            let code = JSON.stringify(JSON.parse(content), null, 2);
            let dom = document.createElement("pre");
            dom.className = "m-0";
            dom.innerText = code;
            domBody.appendChild(dom);
        } catch (error) {
            domBody.innerHTML = content;
        }

        nrVary.bsAlert.show();
    },

    /**
     * 确认
     * @param {any} message 提示内容
     * @param {any} title 标题
     * @param {any} width
     */
    confirm: (message, title, width = "30em") => new Promise((resolve) => {
        if (nrVary.domConfirm == null) {
            nrVary.domConfirm = document.createElement('div');
            nrVary.domConfirm.innerHTML = `
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary flag-ok">确定</button>
        </div>
    </div>
</div>
            `;
            nrVary.domConfirm.className = "modal";
            document.body.appendChild(nrVary.domConfirm);

            nrVary.bsConfirm = new bootstrap.Modal(nrVary.domConfirm);
        }
        nrVary.domConfirm.querySelector('.modal-title').innerHTML = title || "消息提示";
        nrcShared.cssvar(nrVary.domConfirm, '--bs-modal-width', width);

        let domBody = nrVary.domConfirm.querySelector('.modal-body');
        domBody.innerHTML = message;

        //取消
        let cancelEvent = function () {
            nrVary.domConfirm.removeEventListener('hidden.bs.modal', cancelEvent);
            resolve(false);
        }
        nrVary.domConfirm.addEventListener('hidden.bs.modal', cancelEvent);

        //确定
        nrVary.domConfirm.querySelector(`.flag-ok`).onclick = () => {
            nrVary.domConfirm.removeEventListener('hidden.bs.modal', cancelEvent);
            nrVary.bsConfirm.hide();
            resolve(true);
        };

        nrVary.bsConfirm.show();
    }),
}

export { nrFunction };