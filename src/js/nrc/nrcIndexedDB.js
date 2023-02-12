class nrcIndexedDB {
    db = null

    name = "localforage"
    storeName = "keyvaluepairs"
    version = 2

    /**
     * 初始化
     * @param {*} option {name:"localforage", storeName:"keyvaluepairs", version:2}
     * @returns 
     */
    init(option) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this)
            } else {
                option = option || {};
                if (option.name) {
                    this.name = option.name;
                }
                if (option.storeName) {
                    this.storeName = option.storeName;
                }
                if (option.version) {
                    this.version = option.version;
                }

                let request = window.indexedDB.open(this.name, this.version);
                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    resolve(this)
                };
                request.onupgradeneeded = (event) => {
                    this.db = event.target.result;
                    if (!this.db.objectStoreNames.contains(this.storeName)) {
                        this.db.createObjectStore(this.storeName);
                    }
                };
                request.onerror = (event) => {
                    reject(event);
                }
            }
        })
    }

    setItem(key, value) {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).put(value, key);
            request.onsuccess = () => resolve(request);
            request.onerror = reject;
        })
    }

    getItem(key) {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.storeName).objectStore(this.storeName).get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        })
    }

    removeItem(key) {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).delete(key);
            request.onsuccess = () => resolve(request);
            request.onerror = reject;
        })
    }

    keys() {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.storeName).objectStore(this.storeName).getAllKeys();
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        })
    }

    clear() {
        return new Promise((resolve, reject) => {
            const request = this.db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).clear();
            request.onsuccess = () => resolve(request);
            request.onerror = reject;
        })
    }
}

export { nrcIndexedDB }