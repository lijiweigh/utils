<template>
    <div class="my-table-wrap">
        <el-table ref="eleElement" v-bind="$attrs" v-on="$listeners" v-if="showTable">
            
            <template #append>
                <slot name="append"></slot>
            </template>
        </el-table>
        <slot name="default" ref="defaultSlot"></slot>
    </div>
</template>

<script>
export default {
    name: "my-ele-table",
    data() {
        return {
            eleElement: {},
            showTable: true
        }
    },
    created() {
        
    },
    mounted() {
        this.eleElement = this.$refs.eleElement
        console.log(this.$slots)
        // this.$nextTick(() => {
        //     this.showTable = true
        // })
    }
}
</script>

<style lang="scss" scoped>

</style>