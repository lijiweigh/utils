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
        setInterval(() => {
            let date = new Date().toLocaleString()
            console.log(date)
            worker.postMessage(date)
        },1000)
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