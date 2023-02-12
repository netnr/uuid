import 'bootstrap/dist/css/bootstrap.css';

// css
require.context('../css', true, /.css$/);

import { nrVary } from "./nrVary";
import { nrStorage } from "./nrStorage";
import { nrFunction } from "./nrFunction";
import { nrcShared } from "./nrc/nrcShared";

let init = async () => {
    //注册 sw
    if (!window["webpackHotUpdateuuid"]) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.debug('SW registered: ', registration);
        }).catch(registrationError => {
            console.debug('SW registration failed: ', registrationError);
        });
    }

    //主题
    await nrFunction.setTheme(nrcShared.cookie(".theme") || "light");

    //资源依赖
    const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle");
    Object.assign(window, { bootstrap, nrVary, nrStorage, nrcShared, nrFunction });

    //存储
    await nrStorage.init();

    //渲染
    await nrFunction.render();

    //事件
    nrFunction.bindEvent();

    //仓库路径
    let pns = (location.hash.length > 1 ? location.hash : location.pathname).substring(1).split('/');
    if (pns[0] != "") {
        nrVary.markName = pns[0];
    }
    if (pns[1] != null && pns[1] != "") {
        nrVary.markResp = pns[1];
    }
    if (pns[2] != null && pns[2] != "") {
        nrVary.markLibs = pns[2];
    }

    //local
    let localUsed = await nrStorage.getItem('local');
    if (localUsed === true) {
        nrVary.markLocalUsed = localUsed;
        document.querySelector('[data-action="local"]').classList.add('active');
    }

    //token
    let token = await nrStorage.getItem('uuid-token-github');
    if (token != null && token.length > 10) {
        nrVary.markToken = token;
        document.querySelector('[data-action="token"]').classList.add('active');
    }

    //proxy
    let proxyUsed = await nrStorage.getItem('proxy');
    if (proxyUsed === true) {
        nrVary.markProxyUsed = proxyUsed;
        document.querySelector('[data-action="proxy"]').classList.add('active');
    }

    //呈现
    nrVary.domLoading0.classList.add('d-none');
    nrVary.domLayout.classList.remove('invisible');

    await nrFunction.load();
}
document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", init) : init();