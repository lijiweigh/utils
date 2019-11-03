let worker = new Worker("/src/workers/index.js")

worker.onmessage = (e => {
    // console.log("from child: -----" + e.data)
})

worker.onerror = (err => {
    // console.log(err)
})

worker.postMessage("start")