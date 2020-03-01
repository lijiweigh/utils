class Promise {
    constructor(executor) {
        this.state = "pending"
        this.value = undefined
        this.reason = undefined
        this.resolveCallbacks = []
        this.rejectCallbacks = []

        let resolve = value => {
            if(this.state === "pending") {
                this.state = "fulfilled"
                this.value = value
                this.resolveCallbacks.forEach(fn => fn())
            }
        }

        let reject = reason => {
            if(this.state === "pending") {
                this.state = "rejected"
                this.reason = reason
                this.rejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfill, onReject) {
        onFulfill = typeof onFulfill === "function" ? onFulfill : value => value
        onReject = typeof onReject === "function" ? onReject : err => {throw err}

        let promise2 = new Promise((resolve, reject) => {
            if(this.state === "fulfilled") {
                setTimeout(() => {
                    try {
                        let x = onFulfill(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0);
            }

            if(this.state === "rejected") {
                setTimeout(() => {
                    try {
                        let x = onReject(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0);
            }

            if(this.state === "pending") {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfill(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                    
                })

                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onReject(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                    
                })
                
            }
        })
        
        return promise2
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject( new Error("promise2 === x"))
    }
    if(x !== null && (typeof x === "object" || typeof x === "function") ) {
        try {
            let then = x.then
            let called
            if(typeof then === "function") {
                then.call(x, y => {
                    if(called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, e => {
                    if(called) {
                        return
                    } 
                    called = true
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch(err) {
            reject(err)
        }
    } else {
        resolve(x)
    }
}