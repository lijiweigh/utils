export default function copy(text) {
    try {
        let element = document.createElement("textarea")
        element.value = text
        element.setAttribute("readonly", "")
        element.style.position = "fixed"
        element.style.fontSize = "14px"
        element.style.border = "0"
        element.style.padding = "0"
        element.style.margin = "0"
        element.style.top = "-99999px"
        document.body.appendChild(element)
        element.select()
        element.setSelectionRange(0, element.value.length + 100)
        document.execCommand("copy")
        document.body.removeChild(element)
        return true
    } catch(e) {
        return false
    }
}