<template>
    <input :value="currentValue" @input="handleInput" @blur="handleBlur">
</template>

<script>
import Emitter from "../../../../utils/js/emitter"

export default {
    name: "a-input",
    props: {
        value: {
            default: ""
        }
    },
    mixins: [Emitter],
    data() {
        return {
            currentValue: this.value
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
            this.$emit("input", value)
            this.dispatch("a-form-item", "on-form-item-change", value)
        },
        handleBlur(e) {
            let value = e.target.value
            this.dispatch("a-form-item", "on-form-item-blur", value)
        }
    }
}
</script>