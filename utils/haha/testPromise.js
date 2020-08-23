let PENDING = "pending"
let RESOLVED = "resolved"
let REJECT = "reject"

function MyPromise(fn) {
    this.currentState = PENDING
    this.value = undefined
    this.onResolvedCallBacks = []
    this.onRejectedCallbacks = []

    this.resolve = value => {
        if(value instanceof MyPromise) {
            return value.then(this.resolve, this.reject)
        }
        setTimeout(() => {
            if(this.currentState === PENDING) {
                this.currentState = RESOLVED
                this.value = value
                this.onResolvedCallBacks.forEach(cb => cb())
            }
        });
    }

    this.reject = reason => {
        setTimeout(() => {
            if(this.currentState === PENDING) {
                this.currentState = REJECT
                this.value = reason
                this.onRejectedCallbacks.forEach(cb => cb())
            }
        });
    }

    try {
        fn(this.resolve, this.reject)
    } catch(e) {
        this.reject(e)
    }
}

MyPromise.prototype.then = function(onResolve, onReject) {
    onResolve = typeof onResolve === "function" ? onResolve : v => v
    onReject = typeof onReject === "function" ? onReject : e => { throw e }

    let promise2 = new MyPromise((resolve, reject) => {
        if(this.currentState === RESOLVED) {
            setTimeout(() => {
                try {
                    let x = onResolve(this.value)
                    resolutionPromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            });
        }

        if(this.currentState === REJECT) {
            setTimeout(() => {
                try {
                    let x = onReject(this.value)
                    resolutionPromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            });
        }

        if(this.currentState === PENDING) {
            this.onResolvedCallBacks.push(() => {
                try {
                    let x = onResolve(this.value)
                    resolutionPromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            })

            this.onRejectedCallbacks.push(() => {
                try {
                    let x = onReject(this.value)
                    resolutionPromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            })
        }
    })
    return promise2
}

function resolutionPromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError("promise2 === x"))
    }

    if(x instanceof MyPromise) {
        if(x.currentState === PENDING) {
            x.then(
                y => {
                    resolutionPromise(promise2, y, resolve, reject)
                },
                reject
            )
        } else {
            x.then(resolve, reject)
        }
        return
    }

    let called
    if(x !== null && (typeof x === "object" || typeof x === "function")) {
        try {
            let then = x.then
            if(typeof then === "function") {
                then.call(
                    x,
                    y => {
                        if(called) return
                        called = true
                        resolutionPromise(promise2, y, resolve, reject)
                    },
                    e => {
                        if(called) return
                        called = true
                        reject(e)
                    }
                )
            } else {
                resolve(x)
            }
        } catch(e) {
            if(called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

MyPromise.resolve = (value) => {
	return new MyPromise((resolve, reject) => {
		resolve(value)
	})
}

MyPromise.reject = (reason) => {
	return new MyPromise((resolve, reject) => {
		reject(reason)
	})
}

MyPromise.race = (promises) => {
	return new MyPromise((resolve, reject) => {
		promises.forEach((p) => {
			p.then(resolve, reject)
		})
	})
}

MyPromise.all = (promises) => {
	let i = 0
	let result = []
	let len = promises.length

	function process(value, index, resolve) {
		i++
		result[index] = value
		if (i === len) {
			resolve(result)
		}
	}

	return new MyPromise((resolve, reject) => {
		promises.forEach((p, index) => {
			p.then((value) => {
				process(value, index, resolve)
			}, reject)
		})
	})
}

// 测试
MyPromise.defer = MyPromise.deferred = function() {
	let dfd = {}
	dfd.promise = new MyPromise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

// npx promises-aplus-tests testPromise.js

module.exports = MyPromise