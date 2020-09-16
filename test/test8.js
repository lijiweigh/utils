/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let up = 0
    let result = new ListNode(0)
    let r = result
    while(l1 || l2) {
        let left = l1 ? l1.val : 0
        let right = l2 ? l2.val : 0
        let sum = left + right + up
        r.val = sum % 10
        up = Math.floor(sum / 10)
        l1 = l1 ? l1.next : null
        l2 = l2 ? l2.next : null
        
        if(l1 || l2 || up) {
            r.next = new ListNode(0)
            if(up) {
                r.next = new ListNode(up)
            } 
            r = r.next
        }
    }
    return result
};

var spiralOrder = function(matrix) {
    let res = []
    if(matrix === null || matrix.length === 0 || matrix[0].length === 0) {
        return res
    }
    let rows = matrix.length
    let cols = matrix[0].length
    let total = rows * cols
    let cur = 0
    let r = 0
    let i = 0, j = 0
    
    while(cur < total) {
        res.push(matrix[i][j])
        cur++
        if(i === r && j < cols - r - 1) {
            j++
        } else if(j === cols - r - 1 && i < rows - r - 1) {
            i++
        } else if(i === rows - r - 1 && j > r) {
            j--
        } else if(j === r && i > r + 1) {
            i--
        } else {
            r++
            i = r
            j = r
        }
    }
    return res
};

var reverseWords = function(s) {
    
};

var maximumProduct = function(nums) {
    nums = nums.sort((a, b) => a - b)
    let length = nums.length
    return Math.max(nums[length - 1] * nums[length - 2] * nums[length - 3], nums[0] * nums[1] * nums[length - 1])
};

var oddEvenList = function(head) {
    if(head === null) {
        return null
    }
    let oddTail = head
    let even = head.next
    let evevTail = head.next
    while(evevTail && evevTail.next) {
        oddTail.next = evevTail.next
        oddTail = evevTail.next
        evevTail.next = oddTail.next
        evevTail = oddTail.next
    }
    oddTail.next = even
    return head
};

var findMin = function(nums) {
    let length = nums.length
    if(length === 1) {
        return nums[0]
    }
    let left = 0
    let right = length - 1
    let min = Infinity
    while(left <= right) {
        if(nums[left] <= nums[right]) {
            return Math.min(min, nums[left])
        }
        let mid = left + Math.floor((right - left) / 2)
        if(nums[left] <= nums[mid]) {
            min = Math.min(min, nums[left])
            left = mid + 1
        } else {
            min = Math.min(min, nums[mid])
            right = mid - 1
        }
    }
    return min
};