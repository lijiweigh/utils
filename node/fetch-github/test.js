const cheerio = require('cheerio')
const superagent = require('superagent')
const fs = require("fs")
const h2m = require("h2m")
const path = require("path")

let options = {
    overides: {
        img: function(node) {
            return `![image](${node.attrs.src})`
        }
    }
}
let bodyElement = ".markdown-body"

superagent.get("https://github.com/ljianshu/Blog").then(res => {

    let $ = cheerio.load(res.text, {decodeEntities: false})
    
    let h3 = $(".markdown-body h3")
    h3.each((index, item) => {
        // console.log("--------------")
        let id = $(item).find("a").eq(0).attr("id")
        let dirName = id.slice(id.lastIndexOf("-") + 1)
        
        // console.log(dirName)
        let h4 = $(item).nextUntil("h3", "h4")
        if(h4.length > 0) {
            fs.mkdirSync(path.resolve(__dirname, "../../articles", dirName), { recursive: true })
            let promises = []
            h4.each((index2, item2) => {
                // console.log($(item2).text())
                let fileName = $(item2).text()
                fileName = fileName.replace(/\s/g,"")
                fileName = fileName.replace(/\//g,"-")
                let url = $(item2).find("a").eq(1).attr("href")
                // console.log(fileName, url)
                let p = superagent.get(url).then(res => {
                    let content = cheerio.load(res.text, {decodeEntities: false})
                    let html = content(bodyElement)
                    let md = h2m(html, options)
                    let w = fs.createWriteStream(path.resolve(__dirname, "../../articles", dirName, fileName + ".md"))
                    w.write(md,"UTF8")
                    w.end()
                }).catch(err => {
                    console.log(err)
                })
                promises.push(p)
            })
            Promise.all(promises).then(res => {
                console.log(`${dirName}----成功`)
            }).catch(err => {
                console.log(err)
            })
        }
        
    })
})


