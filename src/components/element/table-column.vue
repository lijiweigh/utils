<template>
    <el-table-column ref="eleElement" v-bind="$attrs" v-on="$listeners">
        <template #default="scope">
            <slot name="default" v-bind="scope"></slot>
        </template>
        <template #header="scope">
            <slot name="header" v-bind="scope"></slot>
        </template>
    </el-table-column>
</template>

<script>
export default {
    name: "my-ele-table-column",
    data() {
        return {
            eleElement: {}
        }
    },
    created() {
       
    },
    mounted() {
        this.eleElement = this.$refs.eleElement
        console.log(this.eleElement.$parent)
    }
}
</script>

<style lang="scss" scoped>

</style>