<template>
    <div class="a-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
import { findComponentsDownward } from "../../../../utils/js/findComponents"

export default {
    name: "a-checkbox-group",
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentValue: this.value,
            children: []
        }
    },
    created() {

    },
    mounted() {
        this.updateModel()
    },
    watch: {
        value(v) {
            this.updateModel()
        }
    },
    methods: {
        update(data) {
            this.currentValue = data
            this.$emit("input", data)
            this.$emit("change", data)
        },
        updateModel(update) {
            this.children = findComponentsDownward(this, "a-checkbox")
            if(this.children.length > 0) {
                children.forEach(child => {
                    child.model = this.value
                })
            }
        }
    },
}
</script>