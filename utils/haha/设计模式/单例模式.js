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