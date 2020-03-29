<template>
    <div class="test3">
        <div class="inner">
            <div class="stick" ref="stick">stick</div>
        </div>
    </div>
</template>

<script>
import aCheckboxGroup from "@/components/customize/a-checkbox-group"

export default {
    name: "test2",
    mounted() {
        alert(getComputedStyle(this.$refs.stick).position)
    }
   
}
</script>

<style lang="scss" scoped>
.test3 {
    height: 100vh;
    overflow: auto;
    .inner {
        height: 2000px;
        .stick {
            margin-top: 500px;
            position: sticky;
            top: 0;
        }
    }
}
</style>