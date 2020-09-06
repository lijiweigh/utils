function stringAdd(a, b, base = 10) {
    let result = ""
    let up = 0
    let aIndex = a.length - 1
    let bIndex = b.length - 1

    while(aIndex >=0 || bIndex >=0) {
        let sum = (+a[aIndex] || 0) + (+b[bIndex] || 0) + up
        up = sum >= base ? 1 : 0
        result = sum % base + result
        aIndex--
        bIndex--
    }

    if(up > 0) {
        result = "1" + result
    }
    return result
}

console.log(stringAdd("99", "99", 10))