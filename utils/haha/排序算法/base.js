function swap (arr, a, b) {
    // let temp = arr[a]
    // arr[a] = arr[b]
    // arr[b] = temp
    // return arr

    [arr[a], arr[b]] = [arr[b], arr[a]]
    return arr
}

exports.swap = swap