// 二分搜索需要数组是排好序的

let { quickSort } = require ('../排序算法/快速排序')

function binarySearch (arr, item) {
    quickSort (arr)

    let min = 0
    let max = arr.length - 1
    let mid = 0
    let e = 0

    while (min <= max) {
        mid = Math.floor ((min + max) / 2)
        e = arr[mid]
        if (item > e) {
            min = mid + 1
        } else if (item < e) {
            max = mid - 1
        } else {
            return mid
        }
    }

    return -1
}

let arr = [2,1,3,6,5,9,8]
console.log(binarySearch (arr, 1))