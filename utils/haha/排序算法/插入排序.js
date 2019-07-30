function insertSort (arr) {
    let temp = 0
    let j = 0
    let length = arr.length
    for (let i = 1; i < length; i ++) {
        j = i
        temp = arr[i]
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = temp
    }
    return arr
}

let arr = [3,2,1,9,7,6,8,0]

console.log(insertSort (arr))