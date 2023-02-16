let nrVary = {
    resp: null, //最后请求对象

    markName: "netnr",
    markResp: "uuid",
    markLibs: "libs",
    markSuffix: ".md",
    markToken: null,
    markReqCount: 0, //请求中

    markLocalUsed: false,//本地模式
    markLocalPath: "/libs/index.json",
    markLocalJson: null,

    markProxyServer: ['https://cors.zme.ink/'], //代理服务
    markProxyIndex: 0,
    markProxyUsed: false, //使用代理

    flagTitle: "uuid", //站点名称

    flagPanelDefaultHtml: '<div class="spinner-border m-3" role="status"><span class="visually-hidden">Loading...</span></div>', //选项卡面板初始化内容
    flagFailHtml: '<input type="text" readonly class="form-control-plaintext" value="数据加载失败">', //表格加载失败显示
}

export { nrVary };