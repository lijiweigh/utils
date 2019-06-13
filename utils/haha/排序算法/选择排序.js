/**
 * 解析:首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，
 * 然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
 */

 function sort(arr) {
     

     for (let i = 0; i < arr.length - 1; i++) {
        let index = i

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[index]) {
                index = j
            }
        }

        [arr[i], arr[index]] = [arr[index], arr[i]]

     }

     return arr
 }

 let s = [3,1,6,8,5,2,6,7]

 sort(s)
 
  console.log(s)