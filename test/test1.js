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
let nums = [2, 7, 11, 15]
let target = 9

function getSum() {
    let map = {}

    for(let i = 0, len = nums.length; i < len; i++) {
        if(map[target - nums[i]] !== undefined) {
            return [map[target - nums[i]], i]
        }
        map[nums[i]] = i
    }
}

console.log(getSum())

nums = [-1, 0, 1, 2, -1, -4]

function getSum2() {
    let result = []
    nums = nums.sort((a, b) => {
        return a - b
    })
    let len = nums.length

    for(let i = 0; i < len - 2; i++) {
        if(i > 0 && nums[i] === nums[i -1]) {
            continue
        }

        let j = i + 1
        let k = len - 1

        while(j < k) {
            if(nums[i] + nums[j] + nums[k] > 0) {
                k--
                while(j < k && nums[k] === nums[k + 1]) {
                    k--
                }
            } else if(nums[i] + nums[j] + nums[k] < 0) {
                j++
                while(j < k && nums[j] === nums[j - 1]) {
                    j++
                }
            } else {
                result.push([nums[i], nums[j], nums[k]])
                j++
                while(j < k && nums[j] === nums[j - 1]) {
                    j++
                }
                k--
                while(j < k && nums[k] === nums[k + 1]) {
                    k--
                }
            }
        }
    }
    return result
}

console.log(getSum2())

nums = [1,8,6,2,5,4,8,3,7]

function getSum3() {
    let max = 0
    let i = 0
    let j = nums.length - 1
    while(i < j) {
        let minHeight = Math.min(nums[i], nums[j])
        max = Math.max((j - i) * minHeight, max)
        if(nums[i] < nums[j]) {
            i++
        } else {
            j--
        }
    }
    return max
}

console.log(getSum3())
