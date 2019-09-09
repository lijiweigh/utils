<template>
    <div class="drag">
        <div class="drop-item" @dragover.prevent.stop="dragover" @drop.prevent.stop="drop"></div>
        <div ref="drag-item" class="drag-item" draggable @dragstart.stop="dragstart" @drag.stop="drag" @dragend.stop="dragend"></div>
    </div>
</template>

<script>
export default {
    name: "my-drag",
    data() {
        return {
            draggingEle: {},
            parentOffset: {},
            transformMatrix: /matrix\(\d+, \d+, \d+, \d+, (-?\d+), (-?\d+)\)/,
        }
    },
    methods: {
        dragstart(e) {
            e.dataTransfer.setData("text/plain","hahahha")
            e.dataTransfer.setData("text/html","<div>ahahhahhah</div>")
            e.dataTransfer.dropEffect = "copy"
            this.draggingEle = {
                target: e.target.cloneNode(true),
                w: e.target.offsetWidth,
                h: e.target.offsetHeight,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
            }
            // console.log("dragstart")
            // console.log(e)
            // console.log(e.dataTransfer)
        },
        drag(e) {
            // console.log("drag")
            // console.log(e)
        },
        dragend(e) {
            // console.log("dragend")
            // console.log(e)
            this.draggingEle = {}
        },
        dragover(e) {
            // console.log("dragover")
        },
        drop(e) {
            // console.log("drop")
            // console.log(e)
            let wraper = e.target
            let child = this.draggingEle.target
            if (!child) {
                return
            }
            child.setAttribute("draggable","false")
            this.initMouseMove(child)
            let offsetX = e.offsetX
            let offsetY = e.offsetY
            child.style.position = "absolute"
            child.style.left = offsetX - this.draggingEle.offsetX + "px"
            child.style.top = offsetY - this.draggingEle.offsetY + "px"
            wraper.appendChild(child)
            console.log(e.offsetX, e.offsetY)
            // console.log(e.dataTransfer.getData("text/plain"))
            // console.log(e.dataTransfer.getData("text/html"))
        },
        initMouseMove(el) {
            let initX, initY
            let fn1 = (event1) => {
                initX = event1.pageX
                initY = event1.pageY
                this.transformMatrix.test(getComputedStyle(el).transform)
                document.addEventListener("mousemove", fn2)
                el.addEventListener("mouseup", fn3)
            }
            let fn2 = (event2) => {
                let ox = event2.pageX - initX
                let oy = event2.pageY - initY
                el.style.transform = `translate(${ox + Number(RegExp.$1)}px, ${oy + Number(RegExp.$2)}px)`

            }
            let fn3 = (event2) => {
                // el.removeEventListener("mousedown", fn1)
                document.removeEventListener("mousemove", fn2)
                el.removeEventListener("mousedown", fn3)
            }
            el.addEventListener("mousedown", fn1)
                
            
            
        },
        getOffsetOfPage(el) {
            let x = 0
            let y = 0
           
            let w = parseInt(getComputedStyle(el)["width"])
            let h = parseInt(getComputedStyle(el)["height"])
            
            let parent = el.offsetParent
            while(parent) {
                x += el.offsetLeft
                y += el.offsetTop
                el = parent
                parent = parent.offsetParent
            }
            
            return {
                x,
                y,
                w,
                h,
            }
        }
    },
    mounted() {
        // console.log(this.getOffsetOfPage(this.$refs["drag-item"]))
        // console.log(getComputedStyle(this.$refs["drag-item"]))
        this.parentOffset = this.getOffsetOfPage(this.$refs["drag-item"])
    },  
    directives: {
        drap: {
            inserted(el,binding,vnode) {
                console.log("v-drap")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.drag {
    position: relative;
}
.drag-item {
    display: inline-block;
    width: 100px;
    height: 100px;
    background: orange;
    cursor: move;
}
.drop-item {
    display: inline-block;
    position: relative;
    margin-right: 200px;
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
}
</style>