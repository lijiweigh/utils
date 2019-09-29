// self.importScripts("/src/workers/test.worker.js")

// onmessage = (e => {
//     console.log("from parent: ---" + e.data)
//     postMessage("hello---------" + e.data)
// })

self.addEventListener('message', function (e) {
    console.log("from parent: ---" + e.data)
    // console.log("hahhahahhahahh" + e.data)
    self.postMessage('You said: ' + e.data)
  }, false);

// postMessage("hello")