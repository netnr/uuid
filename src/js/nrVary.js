var nrVary = {
    markName: "netnr",
    markResp: "uuid",
    markLibs: "libs",
    markSuffix: ".md",
    markToken: null,
    markReqCount: 0, //请求中

    markLocalUsed: false,//本地模式
    markLocalPath: "/libs/index.json",
    markLocalJson: null,

    markCheckServer: ['https://thingproxy.freeboard.io/fetch/'], //检测服务
    markCheckIndex: 0,
    markChecking: false, //死链检测中
    markCheckResult: { ok: [], bad: [] }, //死链检测结果

    markProxyServer: ['https://thingproxy.freeboard.io/fetch/'], //代理服务
    markProxyIndex: 0,
    markProxyUsed: false, //使用代理

    flagTitle: "uuid", //站点名称

    flagTheme: "light", // light dark
    flagGridTheme: "ag-theme-alpine", //ag-grid theme

    flagPanelDefaultHtml: '<sl-spinner class="fs-3 m-3"></sl-spinner>', //选项卡面板初始化内容
    flagFailHtml: '<sl-button variant="text">加载数据失败</sl-button>', //表格加载失败显示
    flagGridRowHeight: 32, //表格行高
    flagGridPageSize: 30, //表格分页大小
}

export { nrVary };