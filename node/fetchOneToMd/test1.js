const h2m = require("h2m")
const fs = require("fs")
const path = require("path")

let options = {
    overides: {
        img(node) {
            return `![image](${node.attrs["src"]})`
        }
    }
}

let html = ""

const r = fs.createReadStream("source", {encoding: "utf-8"})
r.on("data", data => {
    html = data
    let md = h2m(html, options)
    let ws = fs.createWriteStream(path.resolve(__dirname, "result.md"))
    ws.write(md, "UTF8")
    ws.end()
})

// let md = h2m(html, options)

// console.log(md)

// let ws = fs.createWriteStream(path.resolve(__dirname, "../../articles", FILENAME + ".md"))
// ws.write(md, "UTF8")
// ws.end()