function convert(number, radix) {
    let result = ""
    while(number > 0) {
        result = number % radix + result
        number = Math.floor(number / radix)
    }
    return result
}

console.log(convert(4, 2))