<template>
    <div class="drag">
        <div class="drag-item" draggable @dragstart="dragstart" @drag="drag" @dragend="dragend"></div>
        <div class="drop-item" @dragover.prevent="dragover" @drop.prevent="drop"></div>
    </div>
</template>

<script>
export default {
    name: "my-drag",
    methods: {
        dragstart(e) {
            e.dataTransfer.setData("text/plain","hahahha")
            e.dataTransfer.setData("text/html","<div>ahahhahhah</div>")
            e.dataTransfer.dropEffect = "copy"
            console.log("dragstart")
            console.log(e)
            console.log(e.dataTransfer)
        },
        drag(e) {
            // console.log("drag")
            // console.log(e)
        },
        dragend(e) {
            console.log("dragend")
            console.log(e)
        },
        dragover(e) {
            console.log("dragover")
        },
        drop(e) {
            console.log("drop")
            console.log(e.dataTransfer.getData("text/plain"))
            console.log(e.dataTransfer.getData("text/html"))
        },
    }
}
</script>

<style lang="scss" scoped>
.drag {
    position: relative; 
}
.drag-item {
    width: 100px;
    height: 100px;
    background: orange;
    cursor: move;
}
.drop-item {
    margin-left: 200px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
}
</style>