<template>
    <div class="webworkers">{{webData}}</div>
</template>

<script>
// import "./index.js"
import Worker from "../../workers/index.worker"
export default {
    name: "my-webworkers",
    data() {
        return {
            webData: "",
        }
    },
    created() {
        let worker = new Worker()

        worker.onmessage = (e => {
            console.log("from child: -----" + e.data)
            this.webData = e.data
        })

        worker.onerror = (err => {
            console.log(err)
        })
        let timer = setInterval(() => {
            let date = new Date().toLocaleString()
            console.log(date)
            worker.postMessage(date)
        },1000)
        this.$once("hook:beforeDestroy", () => {
            clearInterval(timer)
        })
        worker.postMessage("start")
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
.webworkers {

}
</style>