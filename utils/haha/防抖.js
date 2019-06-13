let debounce =  (fn, wait = 200, imediate = true) => {
    let timer = null

    return function () {
        let context = this
        let args = [...arguments]

        if (imediate && !timer) {
            fn.apply(context, args)
        }

        timer && clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait);
    }
}





