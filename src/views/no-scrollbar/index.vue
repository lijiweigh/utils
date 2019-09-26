<template>
    <div class="no-scrollbar">
        <no-scrollbar>
            <div class="item" v-for="(item, index) in 10" :key="index"></div>
        </no-scrollbar>
    </div>
</template>

<script>
import noScrollbar from "@/components/no-scrollbar/no-scrollbar"
export default {
    name: "my-no-scrollbar",
    components: {
        noScrollbar
    }
}
</script>

<style lang="scss" scoped>
.no-scrollbar {
    width: 1000px;
    height: 800px;
    .item {
        width: 100px;
        height: 100px;
        background: orange;
        margin-bottom: 20px;
    }
}
</style>