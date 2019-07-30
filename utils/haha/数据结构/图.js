let { HashMap } = require ("./散列表")
let { Queue } = require ("./队列")

class Graph {
    constructor () {
        this.vertices = []
        this.adjList = new HashMap ()
        this.time = 0
    }

    addVertice (v) {
        this.vertices.push (v)
        this.adjList.put (v, [])
    }

    addEdge (v, w) {
        // 单向图只需下面一行，双向图则需要下面两行
        this.adjList.get (v).push (w)
        // this.adjList.get (w).push (v)
    }

    toString () {
        let s = ""
        for (let i = 0; i < this.vertices.length; i++) {
            let v = this.vertices[i]
            let edges = this.adjList.get (v)
            s += v + " -> "

            for (let j = 0; j < edges.length; j++) {
                s += edges[j] + " "
            }

            s += "\n"
        }

        console.log(s)
    }

    initializeColor () {
        let color = []
        for (let i = 0; i < this.vertices.length; i++) {
            color[this.vertices[i]] = "white"
        }

        return color
    }
    
    // 广度优先算法
    bfs (v, callback) {
        let color = this.initializeColor ()
        let queue = new Queue ()
        queue.enqueue (v)

        while (!queue.isEmpty ()) {
            let u = queue.dequeue ()
            color[u] = "grey"
            let neighbors = this.adjList.get (u)
            for (let i = 0; i < neighbors.length; i ++) {
                let w = neighbors[i]
                if (color[w] === "white") {
                    color[w] = "grey"
                    queue.enqueue (w)
                }
            }
            color[u] = "black"
            callback && callback (u)
        }
    }

    // 计算所有点到 v 的距离，和每个点的前溯点
    BFS (v, callback) {
        let color = this.initializeColor ()
        let queue = new Queue ()
        let d = []
        let pred = []

        queue.enqueue (v)
        for (let i = 0; i < this.vertices.length; i++) {
            d[this.vertices[i]] = 0
            pred[this.vertices[i]] = null
        }

        while (!queue.isEmpty ()) {
            let u = queue.dequeue ()
            color[u] = "grey"
            let neighbors = this.adjList.get (u)
            for (let i = 0; i < neighbors.length; i ++) {
                let w = neighbors[i]
                if (color[w] === "white") {
                    color[w] = "grey"
                    d[w] = d[u] + 1
                    pred[w] = u
                    queue.enqueue (w)
                }
            }
            color[u] = "black"
            callback && callback (u)
        }

        return {
            d,
            pred
        }
    }

    // 深度优先算法
    bfs2 (callback) {
        let color = this.initializeColor()
        
        for (let i = 0; i < this.vertices.length; i++) {
            if (color[this.vertices[i]] === "white") {
                this.bfsVisit (this.vertices[i], color, callback)
            }
        }
    }

    bfsVisit (v, color, callback) {
        color[v] = "grey"
        callback (v)
        let neighbors = this.adjList.get (v)

        for (let i = 0; i < neighbors.length; i++) {
            if (color[neighbors[i]] === "white") {
                this.bfsVisit (neighbors[i], color, callback)
            }
        }
        color[v] = "black"
    }

    BFS2 (callback) {
        let color = this.initializeColor()
        // 节点的发现时间
        let d = []
        // 节点的完成时间
        let f = []
        // 节点的前溯点
        let p = []

        for (let i = 0; i < this.vertices.length; i++) {
            d[this.vertices[i]] = 0
            f[this.vertices[i]] = 0
            p[this.vertices[i]] = null
        }
        
        for (let i = 0; i < this.vertices.length; i++) {
            if (color[this.vertices[i]] === "white") {
                this.bfsVisit2 (this.vertices[i], color, callback, d, f, p)
            }
        }

        return {
            d,
            f,
            p
        }
    }

    bfsVisit2 (v, color, callback, d, f, p) {
        color[v] = "grey"
        d[v] = ++this.time
        callback && callback (v)
        let neighbors = this.adjList.get (v)

        for (let i = 0; i < neighbors.length; i++) {
            if (color[neighbors[i]] === "white") {
                p[neighbors[i]] = v
                this.bfsVisit2 (neighbors[i], color, callback, d, f, p)
            }
        }
        color[v] = "black"
        f[v] = ++this.time
    }
}

let g = new Graph ()

g.addVertice ("a")
g.addVertice ("b")
g.addVertice ("c")
g.addVertice ("d")
g.addVertice ("e")
g.addVertice ("f")

g.addEdge ("a", "b")
g.addEdge ("a", "c")
g.addEdge ("b", "d")
g.addEdge ("b", "e")
g.addEdge ("c", "f")

g.toString ()

// g.bfs ("a", (v) => {console.log(v)})
// let result = g.BFS ("a", (v) => {console.log(v)})
// console.log(result)

// g.bfs2 ( function (v) {console.log(v)} )
let result = g.BFS2 ()
console.log(result)