// 计数器
let count = 0

// 用于重置的空函数
function noop() {}

/**
 * * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 */
function jsonp(url, query = {}, options = {}) {
    return new Promise((resolve, reject) => {
        if(!url) {
            reject(new Error("url 不能为空"))
            return
        }
    
        // 给服务器传的回调函数的键值
        let param = options.param || "callback"
        // 回调函数的前缀
        let prefix = options.prefix || "jsonp_"
        // 指定回调函数的名字
        let name = options.name
        // 超时时间
        let timeout = options.timeout || 60000
        // 回调函数
        let id = name || prefix + count++
        // 在这个标签的前面插入 script标签
        let target = document.getElementsByTagName("script")[0] || document.head
        // 超时的定时器
        let timer
        
        if(timeout) {
            timer = setTimeout(() => {
                clean()
                reject(new Error("timeout"))
            }, timeout);
        }

        url = qs(url, {
            ...query,
            [param]: id
        })

        window[id] = function(data) {
            resolve(data)
            clean()
        }

        let script = document.createElement("script")
        script.src = url
        target.parentNode.insertBefore(script, target)

        function clean() {
            window[id] = noop
            target.parentNode.removeChild(script)
            clearTimeout(timer)
        }

    })
}

function qs(url, query) {
    let p = ""
    let keys = Object.keys(query)
    for(let k of keys) {
        p += `&${k}=${query[k]}`
    }
    return url.includes("?") ? url + p : url + "?" + p.slice(1)
}

export default jsonp