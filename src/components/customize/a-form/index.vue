<template>
    <div class="a-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "a-form",
    provide() {
         return {
            form: this
        }
    },
    props: {
        model: {

        },
        rules: {

        }
    },
    data() {
        return {
            fields: []
        }
    },
    created() {
        this.$on("on-form-item-add", field => {
            this.fields.push(field)
        })
        this.$on("on-form-item-remove", field => {
            let index = this.fields.indexOf(field)
            if(index !== -1) {
                this.fields.splice(index, 1)
            }
        })
    },
    methods: {
        validate(cb) {
            let isValid = true
            let count = 0
            return new Promise((resolve, reject) => {
                this.fields.forEach(field => {
                    field.validate("", valid => {
                        if(!valid) {
                            isValid = false
                        }
                        if(++count >= this.fields.length) {
                            if(cb) {
                                cb(isValid)
                            } else {
                                isValid ? resolve(isValid) : reject(isValid)
                            }
                        }
                    })
                })
            })
        },
        reset() {
            this.fields.forEach(field => {
                field.reset()
            })
        }
    }
}
</script>