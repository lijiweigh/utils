function mergeSort (arr) {
    return mergeSortRec (arr)
}

function mergeSortRec (arr) {
    if (arr.length === 1) {
        return arr
    }

    let mid = Math.floor (arr.length / 2)
    let left = arr.slice (0, mid)
    let right = arr.slice (mid)

    return merge (mergeSortRec (left), mergeSortRec (right))
}

function merge (left, right) {
    let result = []
    let il = 0
    let ir = 0

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push (left[il++])
        } else {
            result.push (right[ir++])
        }
    }

    while (il < left.length) {
        result.push (left[il++])
    }

    while (ir < right.length) {
        result.push (right[ir++])
    }

    return result
}

let arr = [3,2,1,9,7,6,8,0]

console.log(mergeSort (arr))