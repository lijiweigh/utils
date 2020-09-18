class CircleQueue {
    constructor(size) {
        this.data = new Array(size)
        this.head = -1
        this.tail = -1
        this.size = size
    }

    enqueue(v) {
        if(this.isFull()) {
            return false
        }
        if(this.head === -1) {
            this.head = 0
        }
        this.tail = (this.tail + 1) % this.size
        this.data[this.tail] = v
        return true
    }

    dequeue() {
        if(this.isEmpty()) {
            return false
        }
        if(this.head === this.tail) {
            this.head = -1
            this.tail = -1
            return true
        }
        this.head = (this.head + 1) % this.size
        return true
    }

    front() {
        if(this.isEmpty()) {
            return false
        }
        return this.data[this.head]
    }

    rear() {
        if(this.isEmpty()) {
            return false
        }
        return this.data[this.tail]
    }

    isEmpty() {
        return this.head === -1
    }

    isFull() {
        return (this.tail + 1) % this.size === this.head
    }
}