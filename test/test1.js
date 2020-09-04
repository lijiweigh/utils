let nums = [1,3,-1,-3,5,3,6,7]
let k = 3

function maxSlidingWindow() {
    let result = []
    let deque = []
    let l = nums.length

    for(let i = 0; i < l; i++) {
        while(deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop()
        }
        deque.push(i)
        while(deque.length && deque[0] <= i - k) {
            deque.shift()
        }
        if(i >= k - 1) {
            result.push(nums[deque[0]])
        }
    }
    return result
}

// console.log(maxSlidingWindow())å

nums = [73, 74, 75, 71, 69, 72, 76, 73]

function diffTempareture() {
    let stack = []
    let l = nums.length
    let result = new Array(l).fill(0)

    for(let i = 0; i < l; i++) {
        while(stack.length && nums[stack[stack.length - 1]] < nums[i]) {
            let top = stack.pop()
            result[top] = i - top
        }
        stack.push(i)
    }
    return result
}

// console.log(diffTempareture())

function generatePatterns(n) {
    let res = []
    const generate = (cur, left, right) => {
        if(left === n && right === n) {
            res.push(cur)
            return
        }
        if(left < n) {
            generate(cur + "(", left + 1, right)
        }
        if(right < left) {
            generate(cur + ")", left, right + 1)
        }
    }
    generate("", 0, 0)
    return res
}

// console.log(generatePatterns(3))

let children = [1, 2, 3]
let cookies = [1, 2]

function findMax() {
    children = children.sort((a, b) => {
        return a - b
    })
    cookies = cookies.sort((a, b) => {
        return a - b
    })

    let max = 0
    let i = 0
    let j = 0
    let slen = children.length
    let clen = cookies.length
    while(i < slen && j < clen) {
        if(children[i] <= cookies[j]) {
            max++
            i++
            j++
            continue
        }
        j++
    }
    return max
}

// console.log(findMax())

let coins = [1, 2, 5]

// console.time("findCoins")
function findCoins(amount) {
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for(let i = 0; i <= amount; i++) {
        for(let c of coins) {
            if(i - c >= 0) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1)
            }
            
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

// console.log(findCoins(2020))
// console.timeEnd("findCoins")

function bubbles(arr) {
    for(let i = 0, l = arr.length; i < l - 1; i++) {
        for(let j = 0; j < l - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

let s = [3, 1, 6, 8, 5, 2]
// console.log(bubbles(s))

function selectSort(arr) {
    for(let i = 0, l = arr.length; i < l - 1; i++) {
        for(let j = i + 1; j < l; j++) {
            if(arr[j] < arr[i]) {
                [arr[j], arr[i]] = [arr[i], arr[j]]
            }
        }
    }
    return arr
}

// console.log(selectSort(s))

function quickSort(arr) {
    if(arr.length <= 1) {
        return arr
    }
    let midIndex = Math.floor(arr.length / 2)
    let mid = arr.splice(midIndex, 1)[0]
    let left = []
    let right = []
    for(let i = 0, l = arr.length; i < l; i++) {
        if(arr[i] < mid) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([mid], quickSort(right))
}

// console.log(quickSort(s))

function binarySearch(arr, target) {
    arr = quickSort(arr)
    let min = 0
    let max = arr.length - 1
    let mid = Math.floor((min + max) / 2)
    let midV = 0
    while(min <= max) {
        if(target > arr[mid]) {
            min = mid + 1
        } else if(target < arr[mid]) {
            max = mid - 1
        } else {
            return mid 
        }
        mid = Math.floor((min + max) / 2)
    }
    return -1
}
// console.log(binarySearch(quickSort(s), 1))