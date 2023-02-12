import { nrcIndexedDB } from "./nrc/nrcIndexedDB";

let nrStorage = {

    init: async () => {
        //初始化默认实例
        nrStorage.localforage = await new nrcIndexedDB().init({ name: "nr-cache" });
        //用户实例
        nrStorage.instanceUser = await new nrcIndexedDB().init({ name: "nr-user" });
    },

    localforage: null,
    getItem: async (key) => await nrStorage.localforage.getItem(key),
    setItem: async (key, value) => await nrStorage.localforage.setItem(key, value),
    removeItem: async (key) => await nrStorage.localforage.removeItem(key),
    keys: async () => await nrStorage.localforage.keys(),
    clear: async () => await nrStorage.localforage.clear(),

    instanceUser: null,
}

export { nrStorage }