const { TimeSelect } = require("element-ui");

function normal (ms, interval = 1000) {
    let id
    let count = 0
    let curTime = new Date().getTime()
    let offset = 0

    id = setTimeout(start, interval);
    
    function start () {
        count++
        offset = new Date().getTime() - (count * interval + curTime) 
        console.log(offset)
        ms = ms - interval
        if (ms <= 0) {
            clearTimeout(id)
        } else {
            id = setTimeout(start, interval);
        }
    }
    
}

// setInterval(() => {
//     let j = 0
//     while(j++ < 1000000000) {}
// }, 0);

exact2(10000)
// exact(10000)


function exact(ms, interval = 1000) {
    let count = 0
    let curTime = new Date().getTime()

    let id = setTimeout(start, interval);

    function start() {
        count++
        let offset = new Date().getTime() - (count * interval + curTime)
        let nextTime = interval - offset
        ms = ms - interval
        if (nextTime < 0) {
            nextTime = 0
        }

        console.log(`offset: ${offset}, nextTime: ${nextTime}, ms: ${ms}`)
        if (ms <= 0) {
            clearTimeout(id)
        } else {
            id = setTimeout(start, nextTime);
        }
    }
}

function exact2 (ms, interval = 1000) {
    let id 
    let count = 0
    let curTime = new Date().getTime()

    id = setTimeout(start, interval)

    function start () {
        count++
        let offset = new Date().getTime() - count * interval - curTime
        let nextTime = interval - offset
        ms = ms - interval

        if (nextTime < 0) {
            nextTime = 0
        }

        console.log(`offset: ${offset}, nextTime: ${nextTime}, ms: ${ms}`)

        if (ms <= 0) {
            clearTimeout(id)
        } else {
            id = setTimeout(start, interval);
        }

    }
}

class CountDown {
    constructor({end, interval = 1000, immediate = true} = {}, cb = () => {}, onEnd = () => {}) {
        this.id = null
        this.pre = 0
        this.end = +new Date(end)
        this.interval = interval
        this.cb = cb
        this.onEnd = onEnd
        
    }
    start() {
        if(this.immediate) {
            this.cb()
        }
        this.run()
    }
    run() {
        let now = +new Date()
        if(now >= this.end) {
            this.onEnd()
            return
        }
        this.timeDiff = now - this.pre
        let next = 2 * this.interval - this.timeDiff
        if(next < 0) {
            next = 0
        }
        if(next > this.interval) {
            next = this.interval
        }
        
        this.id = setTimeout(() => {
            this.cb
            this.run()
        }, next);
    }
    stop() {
        clearTimeout(this.id)
    }
}