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
        if (ms < 0) {
            clearImmediate(id)
        } else {
            id = setTimeout(start, interval);
        }
    }
    
}

setInterval(() => {
    let j = 0
    while(j++ < 1000000000) {}
}, 0);

normal(10000)
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
        if (ms < 0) {
            clearInterval(id)
        } else {
            id = setTimeout(start, nextTime);
        }
    }
}