class Graph {
    constructor() {
        this.vertices = []
        this.edges = new Map()
    }

    addVertice(v) {
        this.vertices.push(v)
        this.edges.set(v, [])
    }

    addEdge(v, edge) {
        this.edges.get(v).push(edge)
        this.edges.get(edge).push(v)
    }

    initColor() {
        let color = {}
        for(let v of this.vertices) {
            color[v] = "white"
        }
        return color
    }

    bfs(v, callback) {
        let queue = []
        let color = this.initColor()
        queue.unshift(v)
        while(queue.length) {
            let u = queue.pop()
            let neighbour = this.edges.get(u)
            color[u] = "grey"
            for(let w of neighbour) {
                if(color[w] === "white") {
                    color[w] = "grey"
                    queue.unshift(w)
                }
            }
            color[u] = "black"
            callback && callback(u)
        }
    }

    bfs2(v, callback) {
        let queue = []
        let color = this.initColor()
        queue.unshift(v)
        let d = {}
        let pre = {}
        for(let u of this.vertices) {
            d[u] = 0
            pre[u] = null
        }

        while(queue.length) {
            let u = queue.pop()
            let neighbours = this.edges.get(u)
            color[u] = "grey"
            for(let w of neighbours) {
                if(color[w] === "white") {
                    d[w] = d[u] + 1
                    pre[w] = u
                    color[w] = "grey"
                }
            }
            color[u] = "black"
            callback && callback(u)
        }
        
        return {
            d, 
            pre
        }
    }

    def(callback) {
        let color = this.initColor()
        for(let u of this.vertices) {
            if(color[u] === "white") {
                this.visit(u, color, callback)
            }
        }
    }

    visit(u, color, callback) {
        color[u] = "grey"
        callback(u)
        let neighbours = this.edges.get(u)
        for(let w of neighbours) {
            if(color[w] === "white") {
                this.visit(w, color, callback)
            }
        }
        color[u] = "black"
    }
}