let list = []

function on (key, cal) {
    if (!list[key]) {
        list[key] = []
    }

    list[key].push(cal)
}

function emit (key, data) {
    let fns = list[key]
    let len = fns.length
    if (!fns || len == 0) {
        return 
    }

    // 执行顺序为后绑定的先执行
    while (len > 0) {
        fns[len--](data)
    }
}

function off (key, cal) {
    let fns = list[key]
    if (!fns || fns.length == 0) {
        return
    }

    if (!cal) {
        fns = []
    } else {
        let index = fns.indexOf(cal)
        if (index < 0) {
            return 
        }
        fns.splice(index, 1)
    }

}

