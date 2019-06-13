/**
 *    1
     1 1
    1 2 1
    ...
    输入 n ,输出数组

    假设输入 3，输出数组 [[1],[1,1],[1,2,1]]
 * 
 */

 function yang (n) {
     let result = [[1]]

     if (n == 1) {
         return result
     }

     for (let i = 1; i < n; i++) {
         let temp = []

         for (let j = 0; j <= i; j++) {
             temp.push(parse(result[i -1][j]) + parse(result[i -1][j - 1]))
         }

         result.push(temp)

     }

     return result
 }

 function parse(num) {
     if (num == undefined) {
         return 0
     }

     return num
 }


//  递归方法

function yang2 (n) {
    if (n == 1) {
        return [[1]]
    }

    let result = []
    let pre = yang2(n - 1)
    // console.log(pre)
    for (let i = 0; i < n; i++) {
        result.push(parse(pre[n - 2][i]) + parse(pre[n - 2][i - 1]))
    }

    pre.push(result)

    return pre
}


//  console.log(yang(5))
 console.log(yang2(5))