/**
 * function Stach(){}
 * 
 * prop
 *      items []
 * 
 * method
 *      push()
 *      pop()
 *      peek()
 *      isEmpty()
 *      clear()
 *      size()   
 * 
 */

 class Stack {
    constructor () {
        this.items = []
    }

    push (item) {
        this.items.push(item)
        // this.item[length] = item
        return this.items.length
    }

    pop () {
        return this.items.pop()
        // return this.items.splice(this.items.length - 1, 1)
    }

    peek () {
        return this.items[this.items.length - 1]
    }

    isEmpty () {
        return this.items.length === 0
    }

    clear () {
        this.items = []
    }

    size () {
        return this.items.length
    }
 }

//  10进制转任意进制

function transfer (num, base) {
    let result = ""
    let trans = "0123456789ABCDFG"
    let temp = 0
    let stack = new Stack()

    while (num > 0) {
        temp = num % base
        stack.push(temp)
        num = Math.floor (num / base)
    }

    while (stack.size()) {
        result += trans[stack.pop()]
    }

    return result

}

console.log(transfer(3333333, 16))
let num = 3333333
console.log(num.toString(16))

console.log(parseInt("32dcd5", 16))