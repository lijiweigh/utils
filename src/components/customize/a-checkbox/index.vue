<template>
    <label>
        <span>
            <input 
                v-if="isGroup"
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue" 
                @change="changeBox"
                >
            <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="changeBox"
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
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Boolean, String, Number],
            default: false
        },
        trueValue: {
            type: [Boolean, String, Number],
            default: true
        },
        falseValue: {
            type: [Boolean, String, Number],
            default: false
        },
        label: {
            type: [Boolean, String, Number]
        }
    },
    mixins: [Emitter],
    data() {
        return {
            currentValue: this.value,
            isGroup: false,
            model: [],
            parent: null
        }
    },
    mounted() {
        this.parent = findComponentUpward(this, "a-checkbox-group")
        if(this.parent) {
            this.isGroup = true
        }
    },
    watch: {
        value(v) {
            if(v === this.trueValue || v === this.falseValue) {
                this.updateModel()
            } else {
                throw new Error("value must be trueValue or falseValue")
            }
        }
    },
    methods: {
        changeBox(e) {
            if(this.disabled) {
                return false
            }
            this.currentValue = e.target.value
            let value = this.currentValue ? this.trueValue : this.falseValue
            if(this.isGroup) {
                this.parent.update(this.model)
            } else {
                
            }
            this.$emit("change", value)
            this.$emit("input", value)
            this.dispatch("a-form-item", "on-form-item-change", value)
        },
        updateModel() {
            this.currentValue = v === this.trueValue
        }
    }
}
</script>