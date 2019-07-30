function search (arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (item === arr[i]) {
            return i
        }
    }

    return -1
}

let arr = [2,1,3,6,5,9,8]
console.log(search (arr, 1))