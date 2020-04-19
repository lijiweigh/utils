<template>
    <div class="canvas">
        <canvas ref="canvasBg" class="canvas-bg"></canvas>
        <canvas ref="canvasFace" class="canvas-fase"></canvas>
    </div>
</template>

<script>


export default {
    name: "mycanvas",
    data() {
        return {
            
        }
    },
    mounted() {  
        let docWidth = window.innerWidth
        let docHeight = window.innerWidth
        let rounds = []
        let canvasBg = this.$refs.canvasBg
        let canvasFace = this.$refs.canvasFace
        canvasBg.width = canvasFace.width = docWidth
        canvasBg.height = canvasFace.height = docHeight
        // this.$refs.canvasFace.style.width = docWidth + "px"
        // this.$refs.canvasFace.style.height = docHeight + "px"
        let ctxBg = canvasBg.getContext("2d")
        let ctxFace = canvasFace.getContext("2d")
        ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height)

        class RoundItem {
            constructor(ctx, index, x, y) {
                // this.ctx = ctx
                this.index = index
                this.x = x
                this.y = y
                this.r = Math.random() * 2 + 1
                this.color = `rgba(255, 255, 255, ${(Math.random() * 10 + 1) / 10 / 2})`
                // this.color = "#fff"
                console.log(this.x, this.y, this.r, this.color)
                this.cache()
                // console.log(this.color)
            }
            draw() {
                // ctxFace.beginPath()
                // ctxFace.shadowBlur = this.r * 2
                // ctxFace.fillStyle = this.color
                // ctxFace.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
                // ctxFace.closePath()
                // ctxFace.fill()
                ctxFace.beginPath()
                ctxFace.drawImage(this.cacheCanvas, this.x - this.r * 3, this.y - this.r * 3)
                ctxFace.closePath()
            }
            move() {
                this.y -= 0.35
                if(this.y <= 0) {
                    this.y = docHeight + 10
                }
                this.draw()
            }
            cache() {
                this.cacheCanvas = document.createElement("canvas")
                this.cacheCanvas.width = this.r * 6
                this.cacheCanvas.height = this.r * 6
                let ctx = this.cacheCanvas.getContext("2d")
                ctx.save()
                ctx.beginPath()
                ctx.shadowBlur = this.r * 2
                ctx.fillStyle = this.color
                ctx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.fill()
                ctx.restore()
            }
        }
        
        
        /**
         * init
         */
        for(let i = 0; i < 200; i++) {
            let round = new RoundItem(ctxFace, i, Math.round(Math.random() * docWidth), Math.round(Math.random() * docHeight))
            rounds.push(round)
        }
        function animate() {
            ctxFace.clearRect(0, 0, docWidth, docHeight)
            // console.log("running")
            rounds.forEach(item => {
                item.move()
            })
            requestAnimationFrame(animate)
        }
        animate()
    },
    methods: {
        animate() {
            console.log("running")
            rounds.forEach(item => {
                item.move()
            })
            requestAnimationFrame(this.animate)
        },
        test() {
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
}
</script>

<style lang="scss" scoped>

.canvas {
    .canvas-bg {
        position: fixed;
        left: 0;
        top: 0;
        // width: 100%;
        // height: 100%;
        z-index: -1;
    }
    .canvas-fase {
        position: fixed;
        left: 0;
        top: 0;
        // width: 100%;
        // height: 100%;
    }
}
</style>