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