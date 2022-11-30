// 存储
var nrStorage = {
    // 存储实例
    instanceCache: null,
    instanceUser: null,

    // 初始化
    init: (localforage) => {
        nrStorage.instanceCache = localforage.createInstance({ name: 'nr-cache' });
        nrStorage.instanceUser = localforage.createInstance({ name: 'nr-user' })
    }
}

export { nrStorage }