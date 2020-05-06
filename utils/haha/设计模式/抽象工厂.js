// 抽象类
class Phone {
    constructor() {
        console.log(new.target)
        if(new.target === Phone) {
            throw new Error("不能直接 new 抽象类")
        }
    }
    createOS() {
        console.log("这是抽象类的方法，不能直接调用，必须重写他")
    }
    createHardWare() {
        console.log("这是抽象类的方法，不能直接调用，必须重写他")
    }
}

// 具体类
class superPhone extends Phone {
    createOS() {
        return new AndroidOS()
    }
    createHardWare() {
        return new BestHardWare() 
    }
}

// 抽象产品
class OS {
    manageSoftWare() {
        console.log("这是抽象类的方法，不能直接调用，必须重写他")
    }
}

// 具体产品
class AndroidOS extends OS {
    manageSoftWare() {
        console.log("这个手机运行安卓系统")
    }
}

// 抽象产品
class HardWare {
    manageHardWare() {
        console.log("这是抽象类的方法，不能直接调用，必须重写他")
    }
}

// 具体产品
class BestHardWare extends HardWare {
    manageHardWare() {
        console.log("这个手机有最好的硬件")
    }
}

let myPhone = new superPhone()
myPhone.createOS().manageSoftWare()
myPhone.createHardWare().manageHardWare()

// new Phone()