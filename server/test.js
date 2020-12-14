const Vue = require("vue");
const vueRenderer = require("vue-server-renderer");
const fs = require("fs");

const app = new Vue({
    // 创建一个 Vue 实例
    template: `<div>Hello World</div>`
});

//const renderer = vueRenderer.createRenderer()
const renderer = vueRenderer.createRenderer({
    template: fs.readFileSync("./index.template.html", "utf-8") // 同步读取文件
});

// 通过 renderToString 将 Vue 实例渲染为 HTML
// 函数签名: renderer.renderToString(vm, context?, callback?): ?Promise<string>
renderer.renderToString(app, (err, doc) => {
    if (err) throw err;
    console.log(doc);
});


const bundleRenderer = vueRenderer.createBundleRenderer("./../package.json");
console.log("bundleRenderer", bundleRenderer);
