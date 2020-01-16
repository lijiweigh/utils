<template>
    <input class="a-input" :value="value" type="text" @input="handleInput" @blur="handleBlur">
</template>

<script>
import Emitter from "../../../../utils/js/emitter"
export default {
    name: "a-input",
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        value: {
            default: ""
        }
    },
    mixins: [Emitter],
    data() {
        return {
            currentValue: this.value,
        }
    },
    watch: {
        value(v) {
            this.currentValue = v
        }
    },
    methods: {
        handleInput(e) {
            let value = e.target.value
            this.currentValue = value
            this.$emit("input", value)
            this.dispatch("a-form-item", "on-form-item-change", value)
        },
        handleBlur(e) {
            this.dispatch("a-form-item", "on-form-item-blur", this.currentValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.a-input {

}
</style>