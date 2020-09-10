function fn(digits) {
    let map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    let res = []
    let len = digits.length
    function g(i, str) {
        if(i === len) {
            res.push(str)
            return
        }
        let chars = map[digits[i]]
        for(let c of chars) {
            g(i + 1, str + c)
        }
    }
    g(0, "")
    return res
}

// console.log(fn("235"))

let intervals = [[1,3],[2,6],[8,10],[15,18]]

function fn3(arr) {
    let res = []
    arr = arr.sort((a, b) => a[0] - b[0])
    let len = arr.length
    for(let i = 0; i < len; i++) {
        if(res.length === 0 || res[res.length - 1][1] < arr[i][0]) {
            res.push([arr[i][0], arr[i][1]])
        } else {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], arr[i][1])
        }
    }
    return res
}

// console.log(fn3(intervals))

function fn5(nums) {
    let str = nums + ""
    if(str.length === 0) return 0
    let result = 1
    let l = str.length
    let i = 1
    while(i < l) {
        result++
        let tem = str.substr(i - 1, 2)
        if(tem <= 25) {
            result++
        }
        i++
    }
    return result
}

function fn6(nums) {
    let str = "" + nums
    if(!str) {
        return 0
    }
    if(str.length === 1) {
        return 1
    }
    if(str.length === 2) {
        if(str >= 10 && str <= 25) {
            return 2
        } else {
            return 1
        }
    }
    return fn6(str.slice(1)) + fn6(str.slice(2))
}

console.log(fn6(12258))