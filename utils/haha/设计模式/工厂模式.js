class Car {
    constructor(color) {
        this.name = "汽车"
        this.color = color
    }
}

class Ship {
    constructor(color) {
        this.name = "船"
        this.color = color
    }
}

class Plane {
    constructor(color) {
        this.name = "飞机"
        this.color = color
    }
}

class Factory {
    create(type, color) {
        switch(type) {
            case "car": return new Car(color)
            case "ship": return new Ship(color)
            case "plane": return new Plane(color)
        }
    }
}

let f = new Factory()
console.log(f.create("car", "red"))
console.log(f.create("ship", "black"))
console.log(f.create("plane", "white"))