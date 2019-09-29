<template>
    <div class="postMessaage-index">
        <span class="btn" @click="open">open</span>
        <input v-model="msg" />
        <span class="btn" @click="send">send</span>
        <div class="value">{{value}}</div>
    </div>
</template>

<script>
export default {
    name: "postMessaage-index",
    data() {
        return {
            msg: "",
            value: "",
            childWindow: {},
        }
    },
    created() {
        window.addEventListener("message", event => {
            console.log(event.origin)
            this.value = event.data
        })
    },
    methods: {
        open() {
            this.childWindow = window.open("/postMessaage-child", "_blank")
        },
        send() {
            this.childWindow.postMessage(this.msg, "*")
        }
    }
}
</script>

<style lang="scss" scoped>
.postMessaage-index {
    .btn {
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>