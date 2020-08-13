class MyPromise {
	constructor(executer) {
		this.state = "pending"
		this.value = undefined
		this.reason = undefined
		this.onResolvedCb = []
		this.onRejectedCb = []

		let resolve = (value) => {
			if (this.state === "pending") {
				this.state = "fulfilled"
				this.value = value
				this.onResolvedCb.forEach((fn) => fn())
			}
		}

		let reject = (reason) => {
			if (this.state === "pending") {
				this.state = "rejected"
				this.reason = reason
				this.onRejectedCb.forEach((fn) => fn())
			}
		}

		try {
			executer(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}

	then(onResolve, onReject) {
		onResolve = typeof onResolve === "function" ? onResolve : (value) => value
		onReject =
			typeof onReject === "function"
				? onReject
				: (err) => {
						throw err
				  }

		let promise2 = new MyPromise((resolve, reject) => {
			if (this.state === "fulfilled") {
				setTimeout(() => {
					try {
						let x = onResolve(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}

			if (this.state === "rejected") {
				setTimeout(() => {
					try {
						let x = onReject(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}

			if (this.state === "pending") {
				this.onResolvedCb.push(() => {
					setTimeout(() => {
						try {
							let x = onResolve(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				})

				this.onRejectedCb.push(() => {
					setTimeout(() => {
						try {
							let x = onReject(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				})
			}
		})

		return promise2
	}

	catch(fn) {
		return this.then(null, fn)
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

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError("Chaining cycle detected for promise"))
	}

	// 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
	if (x instanceof MyPromise) {
		if (x.state === "pending") {
			// 再次调用该函数是为了确认 x resolve 的
			// 参数是什么类型，如果是基本类型就再次 resolve
			// 把值传给下个 then
			x.then((value) => {
				resolvePromise(promise2, value, resolve, reject)
			}, reject)
		} else {
			x.then(resolve, reject)
		}

		return
	}

	let called
	if (x !== null && (typeof x === "object" || typeof x === "function")) {
		try {
			let then = x.then
			if (typeof then === "function") {
				then.call(
					x,
					(y) => {
						if (called) return
						called = true
						resolvePromise(promise2, y, resolve, reject)
					},
					(err) => {
						if (called) return
						called = true
						reject(err)
					}
				)
			} else {
				// if (called) return
				// called = true
				resolve(x)
			}
		} catch (e) {
			if (called) return
			called = true
			reject(e)
		}
	} else {
		resolve(x)
	}
}

MyPromise.defer = MyPromise.deferred = function() {
	let dfd = {}
	dfd.promise = new MyPromise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

module.exports = MyPromise

let p = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(
			new MyPromise((resolve, reject) => {
				setTimeout(() => {
					resolve(
						new MyPromise((resolve, reject) => {
							setTimeout(() => {
								resolve(6000)
							}, 3000)
						})
					)
				}, 2000)
			})
		)
	}, 1000)
})

p.then((data) => {
	console.log(data)
})
