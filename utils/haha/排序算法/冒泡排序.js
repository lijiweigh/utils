/**
 * 解析：1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。

    　　　2.第一轮的时候最后一个元素应该是最大的一个。

    　　　3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。
 */

 function sort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j  < arr.length - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }

        }

    }

    return arr
 }

 let s = [3,1,6,8,5,2]

sort(s)

 console.log(s)