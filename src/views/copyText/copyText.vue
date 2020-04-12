<template>
    <div class="copyText">
        <div>
            <input type="text" ref="input">
            <button @click="copyInput">复制</button>
        </div>
        <div>
            <div ref="div">啊啊士大夫健身房可视对讲风口浪尖风口浪尖</div>
            <button @click="copyDiv">复制</button>
        </div>
        <div>
            <textarea></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: "copyText",
    methods: {
        copyInput() {
            this.$refs.input.select()
            this.$refs.input.setSelectionRange(0, 9999999)
            document.execCommand("copy")
        },
        copyDiv() {
            let v = this.$refs.div.innerHTML
            let input = document.createElement("input")
            input.setAttribute("readonly", true)
            input.setAttribute("value", v)
            document.body.appendChild(input)
            input.style.position = "fixed"
            input.style.left = 0
            input.style.top = 0
            input.style.zIndex = -1
            input.focus()
            input.select()
            input.setSelectionRange(0, 9999999)
            document.execCommand("copy")
            document.body.removeChild(input)
        },
    }
}
</script>

<style lang="scss" scoped>
.copyText {

}
</style>