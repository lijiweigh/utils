function convert (num) {
    const number = ["零","一","二","三","四","五","六","七","八","九"]
    let empty = ["零","零","零","零"]
    let mid = ["千", "百", "十"]
    let big = ["","万","亿", "万", "亿", "万", "亿", "万"]
    let charCode = "\u96f6"
    // console.log(charCode)

    if(typeof num != "string") {
        num = num + ""
    }

    let [start, end] = num.split(".")
    // console.log(start.padStart(Math.ceil(start.length / 4) * 4, "0"))
    start = start.padStart(Math.ceil(start.length / 4) * 4, "0")

    let result = []
    let len = start.length
    let index = 0

    while(index < len - 1) {
        let str = start.substr(index, 4).split("")
        
        console.log(str)
        result.push(str)
        index += 4
    }
    
    let rl = result.length


    for (let i = 0; i < rl; i++) {
        result[i] = result[i].map((value, index) => {
            if (number[value] == "零") {
                return number[value] 
            } else {
                return number[value] + (mid[index] || "")
            }
            
        })

        // result[i] = result[i]

        
        // if (result[i][0] == "零") {
        //     result[i][0] = ""
        // }
        result[i] = result[i].join("").replace(/\u96f6{2,}/,"").replace(/^(\u96f6)*/, "").replace(/(\u96f6)*$/, "")

        if ((rl - i)  > 1) {
            if (result[i] != "") {
                result[i] += big[(rl - i - 1)]
            } else {
                if(result[i + 1] && result[i + 1] != ""){
                    result[i] = big[(rl - i - 1)] 
                }
            }
            
        } 
        // console.log(result[i])
        // console.log(result[i], result[i].replace(/\u96f6/g, "零"))
        // c.replace(/\u96f6/g, "1")
    }
    // console.log(result[0])
    // if (result[0][0] == "零") {
    //     result[0][0] = ""
    // }

    result = result.join("")

    if (end) {
        result += "点"
        end = end.split("").map(value => {
            return number[value]
        })

        if (end[end.length - 1] == "零") {
            end[end.length - 1] = ""
        }

        
        end = end.join("").replace(/(\u96f6)*$/, "")
        result = result + end

    }
    
    // result = result + end
    

    

    

    // console.log( end)
    // console.log( result)
    
    return result
}

console.log(convert("90000000000000.10000100000"))