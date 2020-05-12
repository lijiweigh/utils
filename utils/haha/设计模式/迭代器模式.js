function iterator(list) {
    let index = 0
    let len = list.length

    return {
        next() {
            let done = index >= len
            let value = done ? undefined : list[index++]
            return {
                done,
                value
            }
        }
    }
}