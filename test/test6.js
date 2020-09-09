class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinaryTree {
    constructor() {
        this.root = null
    }

    insert(key) {
        let node = new Node(key)
        if(this.root === null) {
            this.root = node
        } else {
            insertNode(this.root, node)
        }
    }

    midOrder(callback) {
        midOrderFn(this.root, callback)
    }

    preOrder(callback) {
        preOrderFn(this.root, callback)
    }

    postOrder(callback) {
        postOrderFn(this.root, callback)
    }

    search(key) {
        searchKey(this.root, key)
    }

    min() {
        searchMin(this.root)
    }

    max() {
        searchMax(this.root)
    }

    remove(key) {
        this.root = removeNode(this.root, key)
    }
}

function removeNode(node, key) {
    if(node === null) {
        return null
    }
    if(key < node.key) {
        node.left = removeNode(node.left, key)
    } else if(key > node.key) {
        node.right = removeNode(node.right, key)
    } else {
        if(node.left === null && node.right === null) {
            node = null
        } else if(node.left === null) {
            node = node.right
        } else if(node.right === null) {
            node = node.left
        } else {
            let rightMin = minNode(node.right)
            node.key = rightMin.key
            node.right = removeNode(node.right, key)
        }
    }

    return
}

function minNode(node) {
    if(node === null) {
        return null
    }
    while(node.left) {
        node = node.left
    }
    return node
}

function searchMax(node) {
    if(node) {
        while(node.right) {
            node = node.right
        }
        return node.key
    }
    return null
}

function searchMin(node) {
    if(node) {
        while(node.left) {
            node = node.left
        }
        return node.key
    }
    return null
}

function postOrderFn(node, callback) {
    if(node === null) {
        return
    }
    postOrderFn(node.left, callback)
    postOrderFn(node.right, callback)
    callback(node.key)
}

function preOrderFn(node, callback) {
    if(node === null) {
        return 
    }
    callback(node.key)
    preOrderFn(node.left, callback)
    preOrderFn(node.right, callback)
}

function midOrderFn(node, callback) {
    if(node === null) {
        return
    }
    midOrderFn(node.left, callback)
    callback(node.key)
    midOrderFn(node.right, callback)
}

function searchKey(node, key) {
    if(node === null) {
        return false
    }

    if(node.key === key) {
        return true
    } 

    if(key < node.key) {
        return searchKey(node.left, key)
    } else {
        return searchKey(node.right, key)
    }
}

function insertNode(node, newNode) {
    if(newNode.key < node.key) {
        if(node.left === null) {
            node.left = newNode
        } else {
            insertNode(node.left, node)
        }
    } else {
        if(node.right === null) {
            node.right = newNode
        } else {
            insertNode(node.right, node)
        }
    }
}