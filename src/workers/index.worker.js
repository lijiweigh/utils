this.importScripts("./test.js")

onmessage = (e => {
    console.log("from parent: ---" + e.data)
    postMessage("hello---------" + e.data)
})


// postMessage("hello")