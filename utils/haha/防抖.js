let debounce =  (fn, wait = 200, immediate = true) => {
    let timer = null
    let args = []
    let canRun = immediate

    return function () {
        let context = this
        args = [...arguments]

        if (canRun) {
            canRun = false
            fn.apply(context, args)
        }

        timer && clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait);
    }
}
