<template>
    <el-input ref="eleInput" v-model="inputvalue" v-bind="$attrs" v-on="$listeners">
        <template #append>
            <slot name="append"></slot>
        </template>
        <template #prepend>
            <slot name="prepend"></slot>
        </template>
        <template #prefix>
            <slot name="prefix"></slot>
        </template>
        <template #prefix>
            <slot name="suffix"></slot>
        </template>
    </el-input>
</template>

<script>
export default {
    name: "my-ele-input",
    props: ["eleVModel"],
    model: {
        prop: "eleVModel",
        event: "eleEmit"
    },
    data() {
        return {
            inputvalue: "",
            eleElement: {}
        }
    },
    watch: {
        inputvalue: {
            handler(v) {
                this.$emit("eleEmit", v)
            },
            immediate: true
        }
    },
    created() {
        this.inputvalue = this.eleVModel
    },
    mounted() {
        this.eleElement = this.$refs.eleInput
        this.$refs.eleInput.$el.querySelector("input").addEventListener("input", e => {
            e.target.value = e.target.value.replace(/[^\w\.]/ig, "")
            
        })
    }
}
</script>

<style lang="scss" scoped>
.my-ele-input {

}
</style>