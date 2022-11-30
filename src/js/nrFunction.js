import { nrVary } from "./nrVary";

// 方法
var nrFunction = {

    cookie: function (key, value, ms) {
        if (arguments.length == 1) {
            var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
            if (arr != null) {
                return arr[2];
            }
            return null;
        } else {
            var kv = key + "=" + value + ";path=/";
            if (ms) {
                var d = new Date();
                d.setTime(d.getTime() + ms);
                kv += ";expires=" + d.toGMTString();
            }
            document.cookie = kv;
        }
    },

    /**
     * html 编码 SO#18749591
     * @param {any} html 
     * @returns 
     */
    htmlEncode: html => html.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';'),

    /**
     * JSON 转参数
     * @param {any} obj 
     * @returns 
     */
    toQueryString: (obj) => {
        if (nrFunction.type(obj) == "Object") {
            for (const key in obj) {
                if (obj[key] === null) {
                    obj[key] = '';
                }
            }
        }
        return new URLSearchParams(obj).toString();
    },

    /**
     * 表单转 JSON
     * @param {any} domForm
     */
    toQueryJson: (domForm) => Object.fromEntries(new FormData(domForm)),

    /**
     * 设置表单值
     * @param {any} domForm 表单元素
     * @param {any} obj 键值对
     */
    setFormValue: (domForm, obj) => {
        for (const key in obj) {
            var val = obj[key];
            val = val === null ? '' : `${val}`;
            var dom = domForm.querySelector(`[name="${key}"]`);
            if (dom) {
                dom.value = `${val}`;
            }
        }
    },

    /**
     * 设置表单禁用
     * @param {any} domForm
     * @param {any} isDisabled
     * @param {any} nameJoin
     */
    setFormDisabled: (domForm, isDisabled, nameJoin) => {
        var names = (nameJoin || "").split(',');
        domForm.querySelectorAll('[name]').forEach(dom => {
            if (nameJoin == null || names.includes(dom.name)) {
                dom.disabled = isDisabled;
            }
        })
    },

    /**
     * 设置元素处于加载状态
     * @param {any} domCard 
     * @param {any} isLoading 
     */
    setElementLoading: (domCard, isLoading) => {
        domCard.querySelectorAll('sl-button,sl-input,sl-select').forEach(dom => {
            if (dom.nodeName == "SL-BUTTON" && dom.variant != "text") {
                dom.loading = isLoading;
            } else {
                dom.readonly = isLoading;
            }
        })
    },

    /**
     * 构建 select
     * @param {*} valueText
     * @param {*} domSelect 
     * @param {*} defaultItem 
     */
    buildSelect: (valueText, domSelect, defaultItem) => {
        var html = valueText.map(item => `<sl-menu-item value="${item.value}">${item.text}</sl-menu-item>`)
        if (defaultItem) {
            html.unshift(`<sl-menu-item value="${defaultItem.value}">${defaultItem.text}</sl-menu-item>`)
        }
        domSelect.innerHTML = html.join('');

        if (defaultItem) {
            domSelect.value = defaultItem.value;
        }
    },

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
     * 类型判断
     * @param {any} obj 
     * @returns 
     */
    type: function (obj) {
        var tv = {}.toString.call(obj);
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
     * 危险替换：仅保留 字母、数字或下划线
     * @param {any} txt
     */
    dangerReplace: (txt) => txt.replace(/[^a-zA-Z0-9_]+/g, ""),

    regexDanger: /[^a-zA-Z0-9_]+/,
    /**
     * 危险字符串
     * @param {any} txt
     */
    isDanger: (txt) => nrFunction.regexDanger.test(txt),

    /**
     * 15-50 位的整数或小数，小数精度1-4位
     * 支持 {"a":1..16, "b":1..16.1234, "c":1..18}
     * 不支持纯数组（这种格式较少，匹配得越多耗时越多，取舍） [1..16, 1..17]
     */
    regexBigNumber: /":\s*((-?\d{15,50})[,}]|(-?\d{15,50}\.\d{1,4}))/gm,

    /**
     * 解析 大数字 JSON 转为字符串，超过 Number.MAX_SAFE_INTEGER=9007199254740991
     * @param {any} text
     */
    parseBigNumberJSON: (text) => {
        text = text.replace(nrFunction.regexBigNumber, function (a, b) {
            var end = a.includes('.') ? "" : a.slice(-1);
            a = `":"${a.slice(2, -1)}"${end}`
            return a;
        });
        var res = JSON.parse(text);
        console.debug(res);
        return res;
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
     * 字符串长度
     * @param {any} content 
     * @returns 
     */
    byteLength: content => {
        var length = 0;
        Array.from(content).map(function (char) {
            length += char.charCodeAt(0) > 255 ? 2 : 1;
        });
        return length;
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
        switch (nrFunction.type(date)) {
            case "String":
            case "Number":
                date = new Date(date);
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

        var result = [
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
    now: () => nrFunction.formatDateTime("datetime"),

    /**
     * 消息
     * @param {any} message 
     * @param {any} type 
     * @param {any} icon 
     * @param {any} duration 
     * @returns 
     */
    toast: function (message, type = 'primary', icon = 'info-circle', duration = 6000) {
        const alert = Object.assign(document.createElement('sl-alert'), {
            type: type,
            closable: true,
            duration: duration,
            innerHTML: `<sl-icon name="${icon}" slot="icon"></sl-icon><div class="text-break">${message}</div>`
        });

        document.body.append(alert);
        if (alert.toast) {
            return alert.toast();
        }
    },

    /**
     * 提示
     * @param {any} content 内容
     * @param {any} title 标题
     * @param {any} width
     */
    alert: (content, title, width = "50em") => {
        if (nrVary.domAlert == null) {
            nrVary.domAlert = document.createElement('sl-dialog');
            document.body.appendChild(nrVary.domAlert);

            //关闭
            nrVary.domAlert.addEventListener('click', function (e) {
                if (e.target.getAttribute('variant') == "primary") {
                    nrVary.domAlert.hide();
                }
            }, false)
        }
        nrVary.domAlert.label = title || "";

        if (width == "full") {
            width = "98vw";
        }
        nrVary.domAlert.setAttribute('style', `--width:${width}`);

        nrVary.domAlert.innerHTML = '<div></div><sl-button slot="footer" variant="primary">关闭</sl-button>';
        try {
            var code = JSON.stringify(JSON.parse(content), null, 2);
            var dom = document.createElement("pre");
            dom.className = "m-0";
            dom.innerText = code;
            nrVary.domAlert.firstElementChild.appendChild(dom);
        } catch (error) {
            nrVary.domAlert.firstElementChild.innerHTML = content;
        }

        if (nrVary.domAlert.show) {
            nrVary.domAlert.show();
        }
    },

    /**
     * 确认
     * @param {any} message 提示内容
     * @param {any} title 标题
     * @param {any} width
     */
    confirm: (message, title, width = "50em") => new Promise((resolve) => {
        if (nrVary.domConfirm == null) {
            nrVary.domConfirm = document.createElement('sl-dialog');
            nrVary.domConfirm.innerHTML = `<div class="na-confirm-message"></div>
            <sl-button class="na-confirm-cancel" slot="footer">取消</sl-button>
            <sl-button class="na-confirm-ok" slot="footer" variant="primary">确定</sl-button>`;
            document.body.appendChild(nrVary.domConfirm);
        }
        nrVary.domConfirm.label = title || "确认";
        nrVary.domConfirm.setAttribute('style', `--width:${width}`);
        nrVary.domConfirm.querySelector('div.nr-confirm-message').innerHTML = message;

        //取消
        var cancelEvent = function () {
            nrVary.domConfirm.removeEventListener('sl-request-close', cancelEvent);

            nrVary.domConfirm.hide();
            resolve(false);
        }
        nrVary.domConfirm.addEventListener('sl-request-close', cancelEvent);

        //关闭
        nrVary.domConfirm.querySelector('sl-button.nr-confirm-cancel').onclick = () => {
            nrVary.domConfirm.hide();
            resolve(false);
        };

        //确定
        nrVary.domConfirm.querySelector('sl-button.nr-confirm-ok').onclick = () => {
            nrVary.domConfirm.hide();
            resolve(true);
        };

        nrVary.domConfirm.show();
    }),

    /**
     * 生成 UUID
     * @returns 
     */
    UUID: () => {
        if (window["crypto"]) {
            return crypto.randomUUID();
        } else {
            return URL.createObjectURL(new Blob([])).split('/').pop();
        }
    },

    /**
     * 下载
     * @param {any} content
     * @param {any} filename
     */
    download: function (content, filename) {
        var aTag = document.createElement('a');
        var blob = new Blob([content]);
        aTag.download = filename;
        aTag.href = URL.createObjectURL(blob);
        document.body.appendChild(aTag);
        aTag.click();
        URL.revokeObjectURL(blob);
        aTag.remove();
    },

    /**
     * 读取文件内容（可指定编码）
     * @param {any} file
     * @param {any} encoding GBK 或 utf-8
     */
    readFileContent: (file, encoding = "utf-8") => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject();
        reader.readAsText(file, encoding);
    }),

    /**
     * 读写剪贴板
     * @param {any} content 写入内容
     */
    clipboard: async (content) => {
        var text;
        if (nrFunction.supportClipboard) {
            if (content == null) {
                text = await navigator.clipboard.readText();
            } else {
                text = await navigator.clipboard.writeText(content);
            }
            return text;
        } else if (content != null) {
            //兼容模式复制
            var textarea = document.createElement("textarea");
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

export { nrFunction };