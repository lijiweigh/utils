<template>
    <div class="webworkers">webworkers</div>
</template>

<script>
// import "./index.js"
import Worker from "../../workers/index.worker"
export default {
    name: "my-webworkers",
    created() {
        
    },
    mounted() {
        let worker = new Worker()

        worker.onmessage = (e => {
            console.log("from child: -----" + e.data)
        })

        worker.onerror = (err => {
            console.log(err)
        })

        worker.postMessage("start")
    }
}
</script>

<style lang="scss" scoped>
.webworkers {

}
</style>