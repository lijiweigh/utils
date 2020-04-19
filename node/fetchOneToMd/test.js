const cheerio = require('cheerio')
const superagent = require('superagent')
const fs = require("fs")
const h2m = require("h2m")
const path = require("path")

let URL = "https://mp.weixin.qq.com/s/DSaLOOF0yBe8mEP5zywXng" 
let FILENAME = "浏览器的EventLoop"
let ELEMENT_SELECTOR = "#page-content"

let options = {
    overides: {
        // 思否的文章打开这个
        // img: function(node) {
        //     return `![image](https://segmentfault.com/${node.attrs["data-src"]})`
        // },

        // 微信公众号的文章打开这个
        img: function(node) {
            return `![image](${node.attrs["data-src"]})`
        },
    }
}

console.log("----------------------开始请求数据----------------------")
superagent.get(URL).then(res => {
    console.log("----------------------请求数据成功----------------------")
    console.log("----------------------开始解析数据----------------------")

    // 微信公众号的文章打开这个
    res.text = res.text.replace(/ol/g, "code").replace(/li/g, "span")

    let $ = cheerio.load(res.text, {decodeEntities: false})
    let html = $(ELEMENT_SELECTOR)
    let md = h2m(html, options)
    console.log("----------------------解析数据成功----------------------")
    let ws = fs.createWriteStream(path.resolve(__dirname, "../../articles", FILENAME + ".md"))
    ws.write(md, "UTF8")
    ws.end()
    console.log("----------------------写入数据成功----------------------")
}).catch(e => {
    console.log(e)
})