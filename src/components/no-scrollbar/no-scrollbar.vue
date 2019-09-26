<template>
    <div class="no-scroll-bar">
        <div class="scroll-element">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "no-scroll-bar"
}
</script>

<style lang="scss" scoped>
.no-scroll-bar {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .scroll-element {
        width: 100%;
        height: 100%;
        overflow: scroll;
        padding-right: 20px;
        padding-bottom: 20px;
    }
}
</style>