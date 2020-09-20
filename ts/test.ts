export default 333
export let m: string = "abc"

let num: number = 333

let bol: boolean = true

let str: string = "abc"

let n: null = null

let u: undefined = undefined

let v: void = u

let list: number[] = [1, 2, 3]

let list2: Array<number> = [5, 6, 7]

let x: [string, number] = ["abc", 123]

enum Color {Red, Green, Blue}

let c: Color = Color.Red

function getSome(some: string | number): string | number | null {
    return some.toString()
}

interface Person {
    name: string
    age: number
}

let tom: Person = {
    name: "tom",
    age: 22
}

interface Person2 {
    name: string
    age?: number
}

let tom2: Person2 = {
    name: "tom2"
}

interface Person3 {
    name: string
    age?: number
    [x: string]: string | number
}

let tom3 = {
    name: "tom3",
    age: 25,
    gender: "male"
}

interface Person5 {
    readonly id: string
    name: string
    age?: number,
    [x: string]: any
}
let tom5: Person5 = {
    id: "aabccc",
    name: "tom5",
    age: 26,
    gender: "male"
}

// tom5.id = "aaaa"