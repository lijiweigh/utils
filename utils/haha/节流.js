let throttle = (fn, wait = 1000, immediate = true) => {
    let timer = null
    let canRun = immediate
    let args = []

    return function () {
        let context = this
        // 保证每次执行的时候参数都是最新的
        args = [...arguments]
        
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