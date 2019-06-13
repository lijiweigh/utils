let throttle = (fn, wait = 1000, imediate = true) => {
    let timer = null
    let canRun = imediate

    return function () {
        let context = this
        let args = [...arguments]
        
        if (!timer) {
            if (canRun) {
                fn.apply (context, args)
                canRun = false
            }

            timer = setTimeout(() => {
                fn.apply (context, args)
                timer = null
            }, wait);
        }


    }
}