// 单向链表

class Node {
    constructor (element) {
        this.element = element
        this.next = null
    }
}

class LinkedList {
    constructor () {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append (element) {
        let node = new Node(element)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }

        this.length++

        return this.length
    }

    insert (pos, element) {

        if (pos < 0 || pos > this.length) {
            return false
        }

        let node = new Node (element)

        if (pos === 0) {
            node.next = this.head
            this.head = node
        } else {
            let index = 0
            let previous = this.head
            let cur = this.head

            while (index !== pos) {
                previous = cur
                cur = cur.next
                index++
            }

            previous.next = node
            node.next = cur
        }

        this.length++
        return true
    }

    removeAt (pos) {
        if (pos < 0 || pos >= this.length) {
            return null
        }

        let cur = this.head
        let pre = this.head
        let index = 0

        if (pos === 0) {
            this.head = this.head.next
            return cur
        } else {
            while (index !== pos) {
                pre = cur
                cur = cur.next
            }

            pre.next = cur.next
            this.length--
            return cur
        }
    }

    indexOf (element) {
        let index = -1
        let cur = this.head

        for (let i = 0; i < this.length; i++) {
            if (cur.element === element) {
                index = i
                break
            } else {
                cur = cur.next
            }

        }

        return index
    }

    remove (element) {
        let index = this.indexOf (element) 
        return this.removeAt (index)
    }

}