const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require('koa-router');
const koaStatic = require('koa-static');
const send = require('koa-send');
const vueRenderer = require("vue-server-renderer");

const resolve = file => path.resolve(__dirname, file);

// 1、创建koa koa-router实例
const app = new Koa();
const router = new Router();

// 开放dist目录
app.use(koaStatic(resolve('./dist')))

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = vueRenderer;
const bundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(resolve("./src/index.template.html"), "utf-8"),
    clientManifest: clientManifest
});

// // 第 3 步：添加一个中间件来处理所有请求
// function renderToString(context) {
//     return new Promise((resolve, reject) => {
//         renderer.renderToString(context, (err, html) => {
//             err ? reject(err) : resolve(html);
//         });
//     });
// }

// app.use(async (ctx, next) => {
//     const context = {
//         title: "ssr test",
//         url: ctx.url
//     };
//     // 将 context 数据渲染为 HTML
//     const html = await renderToString(context);
//     ctx.body = html;
// });


const render = async (ctx, next) => {
    ctx.set('Content-Type', 'text/html')

    const handleError = err => {
        if (err.code === 404) {
            ctx.status = 404
            ctx.body = '404 Page Not Found'
        } else {
            ctx.status = 500
            ctx.body = '500 Internal Server Error'
            console.error(`error during render : ${ctx.url}`)
            console.error(err.stack)
        }
    }
    const context = {
        url: ctx.url,
        title: 'vue服务器渲染组件',
        meta: `
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="" content="vue服务器渲染组件">
        `
    }
    try {
        const html = await renderer.renderToString(context);
        ctx.status = 200
        ctx.body = html;
    } catch (err) {
        handleError(err);
    }
    next();
}

// 设置静态资源文件
router.get('/static/(.*)', async (ctx, next) => {
    await send(ctx, ctx.path, { root: __dirname + '/./dist' });
});
router.get('/(.*)', render);

// 加载路由组件
app.use(router.routes()).use(router.allowedMethods());


// 第 4 步: 启动服务
app.listen(9093, () => {
    // if (err) {
    //     console.log('服仵器启动失败')
    // } else {
    //     console.log('服务器启动成功')
    // }
    console.log("server started at localhost:9093");
});
