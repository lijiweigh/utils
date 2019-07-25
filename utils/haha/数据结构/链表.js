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
            pre.next = null
            return cur
        } else {
            while (index !== pos) {
                pre = cur
                cur = cur.next
            }

            pre.next = cur.next
            cur.next = null
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

    isEmpty () {
        return this.length <= 0
    }

    size () {
        return this.length
    }

    getHead () {
        return this.head
    }

}


// 双向链表

class Node2 {
    constructor (element) {
        this.element = element
        this.next = null
        this.prev = null
    }
}

class DoubleLinkedList {
    constructor () {
        this.head = null
        this.tail = null
        this.length = 0
    }

    insert (pos, element) {
        if (pos < 0 || pos > this.length) {
            return false
        } else {
            let node = new Node2 (element)
            let index = 0
            let prev = null
            let cur = null

            if (pos === 0) {
                if (!this.head) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    this.head.prev = node
                    this.head = node
                }
            } else if (pos === this.length) {
                this.tail.next = node
                node.prev = this.tail
                this.tail = node
            } else {
                cur = this.head
                while (index !== pos) {
                    prev = cur
                    cur = cur.next
                }

                prev.next = node
                node.next = cur
                node.prev = prev
                cur.prev = node
            }

            this.length++
            return true
        }
    }

    removeAt (pos) {
        if (pos < 0 || pos >= this.length) {
            return null
        } else {
            if (pos === 0) {
                this.head = this.head.next
                if (this.length === 1) {
                    this.tail = null
                } else {
                    this.head.prev = null
                }
            } else if (pos === this.length) {
                this.tail = this.tail.prev
                this.tail.next = null
            } else {
                let index = 0
                let cur = this.head
                let prev = null

                while (pos !== index) {
                    prev = cur
                    cur = cur.next
                }

                prev.next = cur.next
                cur.next.prev = prev
            }

            this.length--
            return cur.element
        }
    }

}

exports.LinkedList = LinkedList
exports.DoubleLinkedList = DoubleLinkedList
