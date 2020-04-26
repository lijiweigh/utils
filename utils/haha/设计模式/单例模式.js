let getInstance = (function () {

    let instance = null

    return function () {
        if (!instance) {
            instance = init()
        }

        return instance
    }

}) ()

function init () {
    let privateName = "tom"

    let privateFunction = function () {
        console.log("privateFunction")
    }

    return {
        getName () {
            return privateName
        },
        publicVariable: "hello"
    }
}


const singleTon = (function() {
    function Car() {
        console.log("singleTon inner")
    }
    let instance
    return {
        getInstance() {
            if(!instance) {
                instance = new Car()
            }
            return instance
        }
    }
})()

let s = singleTon.getInstance()
let s2 = singleTon.getInstance()

console.log(s === s2)