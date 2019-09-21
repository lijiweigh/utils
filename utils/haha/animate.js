import tween from "./tween"

let animate = tween.Quad.easeOut

export default function (from, to, duration, callback) {
    let t = 0,
        b = from,
        c = to - from,
        d = duration,
        timer
    
    let step = function() {
        let value = animate(t, b, c, d)
        callback(value)
        t += 16.7
        if (t >= d) {
            cancelAnimationFrame(timer)
        } else {
            timer = requestAnimationFrame(step)
        }
    }
    timer = requestAnimationFrame(step)
}
