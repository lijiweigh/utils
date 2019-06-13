/**
 * 解析：快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。
 * 然后递归调用，在两边都实行快速排序。
 */

 function sort(arr) {

    if (arr.length <= 1) {
        return arr
    }

    let midIndex = Math.floor(arr.length / 2)
    let mid = arr.splice(midIndex, 1)[0]

    let left = []
    let right = []

    for (let i = 0; i < arr.length; i++)  {
        if (arr[i] > mid) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }

    return sort(left).concat([mid], sort(right))

 }

 let s = [3,1,6,8,5,2,6,7]

 s = sort(s)
 
  console.log(s)