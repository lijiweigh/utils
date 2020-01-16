<template>
    <label>
        <span>
            <input 
                v-if="!group"
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="onChange"
                @blur="onBlur"
            >
            <input 
                v-else
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="onChange"
            >
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from "../../../../utils/js/emitter"
import { findComponentUpward } from "../../../../utils/js/findComponents"
export default {
    name: "a-checkbox",
    props: {
        value: {

        },
        trueValue: {
            default: true
        },
        falseValue: {
            default: false
        },
        disabled: {
            default: false
        },
        label: {

        }
    },
    data() {
        return {
            currentValue: this.value === this.trueValue,
            group: false,
            parent: null,
            model: []
        }
    },
    mixins: [Emitter],
    created() {
        this.parent = findComponentUpward(this, "a-checkbox-group")
        if(this.parent) {
            this.group = true
        }
    },
    methods: {
        onChange(e) {
            if(this.group) {
                this.parent.update(this.model)
            } else {
                let checked = e.target.checked
                this.currentValue = checked
                let value = checked ? this.trueValue : this.falseValue
                this.$emit("input", value)
                this.$emit("change", value)
                this.dispatch("a-form-item", "on-form-item-change", value)
            }
        },
        onBlur(e) {
            let checked = e.target.checked
            let value = checked ? this.trueValue : this.falseValue
            this.dispatch("a-form-item", "on-form-item-blur", value)
        }
    }
}
</script>

<style lang="scss" scoped>
label {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>