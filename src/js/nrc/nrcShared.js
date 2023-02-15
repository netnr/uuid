let nrcShared = {
    cookie: function (key, value, ms) {
        if (arguments.length == 1) {
            let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
            if (arr != null) {
                return arr[2];
            }
            return null;
        } else {
            let kv = `${key}=${value};path=/`;
            if (ms) {
                let d = new Date();
                d.setTime(d.getTime() + ms);
                kv = `${kv};expires=${d.toGMTString()}`;
            }
            document.cookie = kv;
        }
    },

    /**
     * 生成 UUID
     * @returns 
     */
    UUID: () => window["crypto"] ? crypto.randomUUID() : URL.createObjectURL(new Blob([])).split('/').pop(),

    /**
     * 模拟雪花ID
     */
    snow: () => Number(`${Date.now()}${nrcShared.random(999).toString().padStart(3, '0')}`),

    /**
     * 随机
     * @param {*} max 最大值，默认99999
     * @param {*} min 最小值，默认0
     * @returns 
     */
    random: (max = 99999, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    /**
     * 计算hash
     * @param {*} algorithm 散列函数 SHA-1 SHA-256 SHA-384 SHA-512
     * @param {*} message 
     * @returns 
     */
    toHash: async (algorithm, message) => {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    },

    addSeconds: (date, num) => {
        date.setSeconds(date.getSeconds() + num)
        return date;
    },
    addMinutes: (date, num) => {
        date.setMinutes(date.getMinutes() + num)
        return date;
    },
    addHours: (date, num) => {
        date.setHours(date.getHours() + num)
        return date;
    },
    addDays: (date, num) => {
        date.setDate(date.getDate() + num)
        return date;
    },
    addMonths: (date, num) => {
        date.setMonth(date.getMonth() + num)
        return date;
    },
    addYears: (date, num) => {
        date.setFullYear(date.getFullYear() + num)
        return date;
    },

    //判断类型
    type: function (obj) {
        let tv = {}.toString.call(obj);
        return tv.split(' ')[1].replace(']', '');
    },

    /**
     * 等待
     * @param {any} time 毫秒
     * @returns 
     */
    sleep: (time) => new Promise(resolve => setTimeout(() => resolve(), time || 1000)),

    /**
     * 抛出错误
     */
    error: () => { throw new Error("Fake Error") },

    /**
     * 触发事件
     * @param {*} name 事件名称
     * @param {*} dom 对象，默认 window
     */
    dispatchEvent: (name, dom = window) => dom.dispatchEvent(new Event(name)),

    /**
     * 获取或设置CSS变量
     * @param {any} dom
     * @param {any} k
     * @param {any} v
     */
    cssvar: (dom, k, v) => {
        if (v == null) {
            return getComputedStyle(dom).getPropertyValue(k);
        } else {
            dom.style.setProperty(k, v);
        }
    },

    /**
     * HTML 编码
     * @param {*} html 
     * @returns 
     */
    htmlEncode: html => html.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';'),

    /**
     * HTML 解码
     * @param {*} html 
     * @returns 
     */
    htmlDecode: html => {
        let div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText;
    },

    /**
     * 数组去重
     * @param {any} arr
     */
    arrayDistinct: arr => Array.from(new Set(arr)),

    /**
     * 分组
     * @param {any} arr 
     * @param {any} f 
     * @returns 
     */
    groupBy: (arr, f) => Array.from(new Set(arr.map(f))),

    /**
     * 危险字符串
     * @param {any} txt
     */
    isDanger: (txt) => /[^a-zA-Z0-9_]+/.test(txt),

    /**
     * 危险替换：仅保留 字母、数字或下划线
     * @param {any} txt
     */
    dangerReplace: (txt) => txt.replace(/[^a-zA-Z0-9_]+/g, ""),

    /**
     * 驼峰转下划线
     * @param {*} name 
     */
    humpToUnderline: (name) => {
        let arr = [];
        for (let index = 0; index < name.length; index++) {
            let key = name[index].toLowerCase();
            let keyCode = name.charCodeAt(index);
            //A-Z
            if (keyCode >= 65 && keyCode <= 90) {
                arr.push(`_${key}`)
            } else {
                arr.push(key);
            }
        }
        return arr.join('')
    },

    /**
     * 逗号分割转为数组
     * @param {*} joins 
     */
    joinToArray: (joins) => (joins == null || joins.trim() == "") ? [] : joins.split(','),

    /**
     * 字符串长度
     * @param {any} content 
     * @returns 
     */
    byteLength: content => {
        let length = 0;
        Array.from(content).map(function (char) {
            length += char.charCodeAt(0) > 255 ? 2 : 1;
        });
        return length;
    },

    /**
     * 对象转参数
     * @param {any} obj 
     * @returns 
     */
    toParams: (obj) => {
        if (nrcShared.type(obj) == "Object") {
            for (const key in obj) {
                if (obj[key] === null) {
                    obj[key] = '';
                }
            }
        }
        return new URLSearchParams(obj).toString();
    },

    /**
     * 获取表为 JSON
     * @param {any} domForm
     */
    getFormJson: (domForm) => Object.fromEntries(nrcShared.getFormData(domForm)),

    /**
     * 获取表单数据
     * @param {*} domForm 
     * @returns 
     */
    getFormData: (domForm) => new FormData(domForm),

    /**
     * JSON 转 FormData
     * @param {*} json 
     * @returns 
     */
    jsonToFormData: (json) => {
        let fd = new FormData();
        for (const key in json) {
            let val = json[key];
            if (val !== null) {
                fd.append(key, json[key]);
            }
        }
        return fd;
    },

    /**
     * 根据样式读取DOM
     * @param {any} domContainer 容器
     * @param {any} startsWithClass 开始样式名
     * @param {any} obj 赋值对象
     */
    readDOM: (domContainer, startsWithClass, obj) => {
        domContainer.querySelectorAll('*').forEach(node => {
            if (node.classList.value.startsWith(startsWithClass)) {
                let vkey = 'dom';
                node.classList[0].substring(startsWithClass.length + 1).split('-').forEach(c => vkey += c.substring(0, 1).toUpperCase() + c.substring(1))
                if (!(vkey in obj)) {
                    obj[vkey] = node;
                }
            }
        });
    },

    /**
     * 引入远程样式
     * @param {*} src
     * @returns 
     */
    importStyle: (src) => new Promise((resolve) => {
        let isLoad = false;
        document.querySelectorAll('link').forEach(dom => {
            if (dom.href && dom.href.includes(src)) {
                isLoad = true;
            }
        })

        if (isLoad) {
            resolve();
        } else {
            let ele = document.createElement("LINK");
            ele.href = src;
            ele.rel = "stylesheet";

            if ('onload' in ele) {
                ele.onload = () => resolve();
            } else {
                resolve();
            }

            document.head.appendChild(ele);
        }
    }),

    /**
     * 引入远程脚本
     * @param {*} src 
     * @param {*} type 
     * @returns 
     */
    importScript: (src, type) => new Promise((resolve) => {
        let ds = document.scripts;
        let domSrc;
        for (let index = 0; index < ds.length; index++) {
            let si = ds[index];
            if (si.src.includes(src)) {
                domSrc = si;
                break;
            }
        }

        if (domSrc) {
            resolve();
        } else {
            let ele = document.createElement("SCRIPT");
            ele.src = src;
            ele.type = type || "text/javascript";

            document.head.appendChild(ele);
            ele.onload = ele.onreadystatechange = function () {
                if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                    resolve();
                }
            }
        }
    }),

    /**
     * 设置距离底部高度
     * @param {*} dom 
     * @param {*} height （可选）指定高度，带单位
     */
    setHeightFromBottom: (dom, height) => {
        let mtop = dom.getBoundingClientRect().top + 25;
        Object.assign(dom.style, {
            height: height || `calc(100vh - ${mtop}px)`,
            minHeight: '200px'
        })
    },

    /**
     * 可视化大小
     * @param {any} size 
     * @param {any} keep 
     * @param {any} rate 
     * @returns 
     */
    formatByteSize: function (size, keep = 2, rate = 1024) {
        if (Math.abs(size) < rate) {
            return size + ' B';
        }

        const units = rate == 1000 ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10 ** keep;

        do {
            size /= rate;
            ++u;
        } while (Math.round(Math.abs(size) * r) / r >= rate && u < units.length - 1);

        return (size.toFixed(keep) * 1).toString() + ' ' + units[u];
    },

    /**
     * 时间格式化
     * @param {any} fmt
     * @param {any} date
     */
    formatDateTime: (fmt, date) => {
        switch (nrcShared.type(date)) {
            case "String":
            case "Number":
                date = new Date(date);
                break;
            case "Date":
                break;
            default:
                date = new Date();
                break;
        }
        fmt = fmt || 'yyyy-MM-dd HH:mm:ss';

        switch (fmt) {
            case "date":
                fmt = "yyyy-MM-dd"
                break;
            case "time":
                fmt = "HH:mm:ss"
                break;
            case "datetime":
                fmt = "yyyy-MM-dd HH:mm:ss";
                break;
        }

        let result = [
            ['yyyy', date.getFullYear()],
            ['MM', date.getMonth() + 1],
            ['dd', date.getDate()],
            ['HH', date.getHours()],
            ['mm', date.getMinutes()],
            ['ss', date.getSeconds()],
            ['fff', date.getMilliseconds()],
        ].reduce((s, a) => s.replace(a[0], `${a[1]}`.padStart(a[0].length, '0')), fmt);

        return result;
    },
    // 当前时间
    now: () => nrcShared.formatDateTime("datetime"),

    /**
     * 下载
     * @param {any} content
     * @param {any} fileName
     */
    download: function (content, fileName) {
        let aTag = document.createElement('a');
        aTag.download = fileName;
        if (content.nodeType == 1) {
            aTag.href = content.toDataURL();
        } else {
            let blob = new Blob([content]);
            aTag.href = URL.createObjectURL(blob);
        }
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    },

    /**
     * 读写剪贴板
     * @param {any} content 写入内容
     */
    clipboard: async (content) => {
        let text;
        if (nrcShared.supportClipboard) {
            if (content == null) {
                text = await navigator.clipboard.readText();
            } else {
                text = await navigator.clipboard.writeText(content);
            }
            return text;
        } else if (content != null) {
            //兼容模式复制
            let textarea = document.createElement("textarea");
            textarea.value = content;
            textarea.style.position = "fixed";
            textarea.style.opacity = 0;
            document.body.appendChild(textarea);
            textarea.select();
            window.document.execCommand("Copy");
            textarea.remove();

            return content;
        } else {
            return ndkI18n.lg.unsupported;
        }
    },

    //可读写剪贴板内容
    supportClipboard: window.isSecureContext && navigator.clipboard != null,
}

export { nrcShared }