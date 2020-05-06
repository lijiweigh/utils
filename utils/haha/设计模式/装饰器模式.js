// @myDecorator
class Test {
    // @methodDecorator
    saySomething() {

    }
}

function myDecorator(target) {
    target.value = "aaaa"
    target.prototype = {...target.prototype, Foo: () => {console.log(this.value)}}
    return target
}

function methodDecorator(target, name, descriptor) {
    let value = descriptor.value
    descriptor.value = function() {
        console.log("装饰器装饰的方法")
        return value.apply(this, arguments)
    }
}

new Test().Foo()