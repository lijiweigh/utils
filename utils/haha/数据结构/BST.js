/**
 * 二叉搜索树
 */

 class BinarySearchTree {
     constructor () {
         this.root = null
     }

     insert (key) {
        let node = new Node (key)

        if (this.root === null) {
            this.root = node
        } else {
            insertNode (this.root, node)
        }
     }

    //  中序遍历  从小到大访问节点，常用来对数进行排序
     inOrderTraverse (callback) {
        inOrderTraverseNode (this.root, callback)
     }

    //  先序排序  以优先于后代节点的顺序访问节点，常用来打印树的结构
     preOrderTraverse (callback) {
        preOrderTraverseNode (this.root, callback)
     }

    //  后序排序  先访问后代节点，再访问父节点，常用来统计一个目录和它的所有子目录的所有文件所占空间的大小
    postOrderTraverse (callback) {
        postOrderTraverseNode (this.root, callback)
    }

    // 搜索最小值
    min () {
        return minNode ()   
    }

    // 搜索最大值
    max () {
        return maxNode ()
    }

    // 搜索 是否有某个值
    search (key) {
        return searchNode (this.root, key)
    }

    remove (key) {
        this.root = removeNode (this.root, key)
    }

 }

 function Node (key) {
    this.key = key
    this.left = null
    this.right = null
 }

 function insertNode (node, newNode) {
    if (newNode.key < node) {
        if (node.left === null) {
            node.left = newNode
        } else {
            insertNode (node.left, newNode)
        }
    } else {
        if (node.right === null) {
            node.right = newNode
        } else {
            insertNode (node.left, newNode)
        }
    }
 }

 function inOrderTraverseNode (node, callback) {
    if (node === null) {
        return
    }

    inOrderTraverseNode (node.left, callback)
    callback (node.key) 
    inOrderTraverseNode (node.right, callback)
 }

 function preOrderTraverseNode (node, callback) {
    if (node === null) {
        return
    }

    callback (node.key)
    preOrderTraverseNode (node.left, callback)
    preOrderTraverseNode (node.right, callback)
 }

 function postOrderTraverseNode (node, callback) {
     if (node === null) {
         return
     }

     postOrderTraverseNode (node.left, callback)
     postOrderTraverseNode (node.right, callback)
     callback (node.key)
 }

 function minNode (node) {
    if (!node) {
        return null
    }
    while (node.left !== null) {
        node = node.left
    }

    return node.key
 }

 function maxNode (node) {
    if (!node) {
        return null
    }
    while (node.right !== null) {
        node = node.right
    }

    return node.key
 }

 function searchNode (node, key) {
    if (node === null) {
        return false
    }

    if (node.key === key) {
        return true
    } 

    if (key < node.key) {
        return searchNode (node.left, key)
    } else {
        return searchNode (node.right, key)
    }
    
 }  

 function removeNode (node, key) {
    if (node === null) {
        return null
    }

    if (key < node.key) {
        node.left = removeNode (node.left, key)
        return node
    } else if (key > node.key) {
        node.right = removeNode (node.right, key)
        return node
    } else {
        // 第一种情况，是一个叶节点
        if (node.left === null && node.right === null) {
            node = null
            return node
        }

        // 第二种情况，只有一个子节点
        if (node.left === null && node.right !== null) {
            node = node.right
            return node
        } else if (node.right === null && node.left !== null) {
            node = node.left
            return node
        }

        // 第三种情况，有两个子节点
        let minNodeRight = minNode (node.right)
        node.key = minNodeRight.key
        node.right = removeNode (node.right, minNodeRight.key)
        return node
           
    }
 }