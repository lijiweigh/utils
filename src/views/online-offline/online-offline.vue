<template>
    <div class="online-offline">
        {{status}}
    </div>
</template>

<script>
export default {
    name: "online-offline",
    data() {
        return {
            status: ""
        }
    },
    mounted() {
        this.status = `
                navigator.connection.effectiveType： ${navigator.connection.effectiveType}
                navigator.connection.rtt： ${navigator.connection.rtt}
                navigator.connection.downlink： ${navigator.connection.downlink}
            `
        window.addEventListener("online", e => {
            console.log("联网：" + JSON.stringify(navigator.connection))
        })
        window.addEventListener("offline", e => {
            console.log("断网：" + JSON.stringify(navigator.connection))
        })
        navigator.connection.addEventListener("change", e => {
            this.status = `
                navigator.connection.effectiveType： ${navigator.connection.effectiveType}
                navigator.connection.rtt： ${navigator.connection.rtt}
                navigator.connection.downlink： ${navigator.connection.downlink}
            `
            console.log("网络状态改变：" + JSON.stringify(navigator.connection.valueOf()))
        })
    }
}
</script>

<style lang="scss" scoped>
.online-offline {

}
</style>