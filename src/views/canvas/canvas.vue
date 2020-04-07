<template>
    <div class="canvas">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
export default {
    name: "mycanvas",
    mounted() {
        let canvas = this.$refs.canvas
        let ctx = canvas.getContext("2d")
        
        canvas.width = 500
        canvas.height = 500
        // ctx.scale(2, 2)
        ctx.translate(100, 100)
        ctx.beginPath()
        ctx.arc(250, 250, 100, 0, 2 )
        ctx.closePath()
        ctx.fillStyle = "skyblue"
        ctx.fill()

        // ctx.transform(1, 0, 0, 1, 0 ,0)
        ctx.setTransform(1, 0, 0, 1, 0 ,0)

        ctx.beginPath()
        ctx.moveTo(50, 100)
        ctx.lineWidth = 10
        ctx.lineCap = "butt"
        ctx.lineTo(50, 200)
        ctx.lineJoin = "round"
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(50, 200)
        ctx.lineWidth = 10
        ctx.lineCap = "butt"
        ctx.lineJoin = "round"
        ctx.lineTo(100, 200)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        // ctx.fillStyle = "yellow"
        // ctx.fillRect(10, 20, 50, 50)
        ctx.lineWidth = 10
        ctx.strokeStyle = "pink"
        ctx.strokeRect(5, 5, 50, 50)
        ctx.closePath()

    }   
}
</script>

<style scoped>
.canvas {

}
</style>