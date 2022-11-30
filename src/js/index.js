// css
require.context('../css', true, /.css$/);

import { nrVary } from "./nrVary";
import { nrGlobal } from './nrGlobal';
import { nrStorage } from "./nrStorage";
import { nrFunction } from "./nrFunction";

Object.assign(window, { nrGlobal, nrVary, nrStorage, nrFunction });

window.addEventListener("DOMContentLoaded", async function () {
    //注册 sw
    if (!this.window["webpackHotUpdateuuid"]) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.debug('SW registered: ', registration);
        }).catch(registrationError => {
            console.debug('SW registration failed: ', registrationError);
        });
    }

    //资源依赖
    await Promise.all([nrGlobal.getPackage("shoelace"), nrGlobal.getPackage("bootstrap")]);
    await nrGlobal.init();
});