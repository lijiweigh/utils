(function rem (win, doc) {
    
    const ev = "orientationchange" in win ? "orientationchange" : "resize"

    function setRem() {
        let clientW = doc.documentElement.clientWidth
        doc.documentElement.style.fontSize = clientW / 375 * 50 + "px"
    }
    
    win.addEventListener(ev, setRem)
    doc.addEventListener("DOMContentLoaded", setRem)
    
})(window, document)