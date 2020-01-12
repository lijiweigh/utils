<template>
    <div class="a-form">
        <slot></slot>
    </div>
</template>

<script>
import Emitter from "../../../../utils/js/emitter"
export default {
    name: "a-form",
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    provide() {
        return {
            form: this
        }
    },
    data() {
        return {
            fields: []
        }
    },
    mixins: [Emitter],
    created() {
        this.$on("on-form-item-add", (field) => {
            this.fields.push(field)
        })
        this.$on("on-form-item-destroy", (field) => {
            this.fields.splice(this.fields.indexOf(field), 1)
        })
    },
    methods: {
        resetFields() {
            this.fields.forEach(field => {
                field.resetField()
            })
        },
        validate(callback) {
            let valid = true
            let count = 0
            let length = this.fields.length
            return new Promise((resolve) => {
                this.fields.forEach(field => {
                    field.validate("", errors => {
                        if(errors) {
                            valid = false
                        }
                        if(++count === length) {
                            resolve(valid)
                            callback && callback(valid)
                        }
                    })
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.a-form {

}
</style>