function Person (name, age) {
    this.name = name
    this.age = age
}

function create () {
    // 获取构造函数
    let Con = Array.prototype.shift.call(arguments)

    // 绑定原型
    let obj = Object.create (Con.prototype)

    // 绑定this
    Con.apply (obj, [...arguments])

    // 返回
    return obj
}

let o1 = new Person("tom", 22)
let o2 = create (Person, "mike", 33)

console.log(o1)
console.log(o2)
console.log(o1.__proto__ === o2.__proto__)