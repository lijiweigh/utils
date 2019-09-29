<template>
    <div class="postMessaage-child">
        <span class="btn" @click="open">open</span>
        <input v-model="msg" />
        <span class="btn" @click="send">send</span>
        <div class="value">{{value}}</div>
    </div>
</template>

<script>
export default {
    name: "postMessaage-child",
    data() {
        return {
            msg: "",
            value: "",
            parentWindow: {},
            origin: {}
        }
    },
    created() {
        window.addEventListener("message", event => {
            console.log(event.origin)
            this.value = event.data
            this.parentWindow = event.source
            this.origin = event.origin

        })
    },
    methods: {
        open() {
            window.open("/postMessaage-child", "_blank")
        },
        send() {
            this.parentWindow.postMessage(this.msg, this.origin)
        }
    }
}
</script>

<style lang="scss" scoped>
.postMessaage-child {
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