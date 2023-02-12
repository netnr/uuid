let nrcFile = {

    /**
     * 接收文件
     * @param {*} fn 回调
     * @param {*} fileNode 选择文件控件
     * @param {*} dragNode 拖拽区域，默认全局
     */
    init: (fn, fileNode, dragNode = document) => {
        //拖拽
        dragNode.addEventListener('dragover', (event) => {
            if (!(fileNode && fileNode.contains(event.target))) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
        dragNode.addEventListener("drop", async (event) => {
            if (!(fileNode && fileNode.contains(event.target))) {
                event.preventDefault();

                let files = await nrcFile.readDataTransferItems(event.dataTransfer.items);
                if (files.length) {
                    await fn(files, 'drag');
                }
            }
        });

        //浏览
        if (fileNode) {
            fileNode.addEventListener("change", async function () {
                let files = this.files;
                if (files.length) {
                    await fn(files, 'change');
                }
            });
        }

        //粘贴
        document.addEventListener('paste', async function (event) {
            let items = event.clipboardData.items, files = [];
            for (let index = 0; index < items.length; index++) {
                let blob = items[index].getAsFile();
                blob && files.push(blob);
            }
            if (files.length) {
                await fn(files, 'paste');
            }
        })
    },

    readDataTransferItems: async (items) => {
        let parr = [], list = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemEntry = item.webkitGetAsEntry();
            if (itemEntry != null) {
                parr.push(nrcFile.readDataTransferItemEntry(itemEntry));
            } else {
                let file = item.getAsFile();
                if (file) {
                    list.push(file);
                }
            }
        }

        let arr = await Promise.all(parr);
        arr.forEach(x => {
            if (x.length) {
                list = list.concat(x)
            } else {
                list.push(x)
            }
        })

        return list;
    },

    readDataTransferItemEntry: (itemEntry, path) => new Promise((resolve) => {
        path = path || "";

        if (itemEntry.isFile) {
            itemEntry.file(file => {
                if (path != "") {
                    file.fullPath = path + file.name; // 兼容路径丢失
                }
                resolve(file)
            })
        } else if (itemEntry.isDirectory) {
            let dirReader = itemEntry.createReader();
            dirReader.readEntries((entries) => {
                let parr = [];
                for (let i = 0; i < entries.length; i++) {
                    parr.push(nrcFile.readDataTransferItemEntry(entries[i], path + itemEntry.name + "/"))
                }
                Promise.all(parr).then((arr) => {
                    let list = [];
                    arr.forEach(x => {
                        if (x.length) {
                            list = list.concat(x)
                        } else {
                            list.push(x)
                        }
                    })
                    resolve(list)
                })
            });
        }
    }),

    /**
     * 
     * @param {*} url data:image/png;base6....
     * @param {*} fileName img.png
     * @param {*} type image/png 可选，默认从 URL 提取
     */
    base64ToFile: async (url, fileName, type) => {
        let resp = await fetch(url);
        let blob = await resp.blob();
        //从 URL 读取
        if (type == null) {
            type = url.split(';')[0].split(':').pop();
        }
        let file = new File([blob], fileName, { type })
        return file;
    },

    canvasToBlob: (domCanvas) => new Promise((resolve) => domCanvas.toBlob(resolve)),

    /**
     * 读取文件
     * @param {any} file
     * @param {any} asType Text DataURL ArrayBuffer BinaryString
     * @param {any} encoding 为 Text 时，读取编码 GBK utf-8
     */
    reader: (file, asType = "Text", encoding = "utf-8") => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject();
        if (asType == "Text") {
            reader.readAsText(file, encoding);
        } else {
            reader[`readAs${asType}`](file);
        }
    }),

}

export { nrcFile }
