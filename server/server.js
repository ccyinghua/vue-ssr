const express = require('express')
const server = express()

const fs = require('fs')
const createApp = require('./app')
const vueRenderer = require('vue-server-renderer')
// const renderer = vueRenderer.createRenderer()
const renderer = vueRenderer.createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8') // 同步读取文件
})


server.get('/mytest', (request, response) => {
    response.send("hello world " + request.url)
})

server.get('/ssr', (request, response) => {
    const context = { url: request.url }
    const app = createApp(context)
    renderer.renderToString(app, (err, doc) => {
        if (err) throw err
        response.send(doc)
    })
})

server.listen(3000, function () {
    console.log('Node app start at port 3000');
})