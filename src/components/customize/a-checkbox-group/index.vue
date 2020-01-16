<template>
    <div @focusout="onBlur">
        <slot></slot>
    </div>
</template>

<script>
import Emitter from "../../../../utils/js/emitter"
import { findComponentsDownward } from "../../../../utils/js/findComponents"

export default {
    name: "a-checkbox-group",
    props: {
        value: {
            default() {
                return []
            }
        }
    },
    mixins: [Emitter],
    data() {
        return {
            currentValue: this.value,
            children: []
        }
    },
    watch: {
        value: {
            handler(v) {
                this.currentValue = v
                this.updateModel()
            },
            deep: true,
            immediate: true
        }
    },
    created() {

    },
    mounted() {
        this.children = findComponentsDownward(this, "a-checkbox")
        this.updateModel()
    },
    methods: {
        updateModel() {
            this.children.forEach(child => {
                child.model = this.value
            })
        },
        update(model) {
            this.currentValue = model
            this.$emit("input", this.currentValue)
            this.$emit("change", this.currentValue)
            this.dispatch("a-form-item", "on-form-item-change", this.currentValue)
        },
        onBlur() {
            this.dispatch("a-form-item", "on-form-item-blur", this.currentValue)
        }
    }
}
</script>