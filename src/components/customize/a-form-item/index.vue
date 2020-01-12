<template>
    <div class="a-form-item">
        <label class="a-form-item-label" :class="{isRequired: isRequired}" v-if="label">{{label}}</label>
        <div>
            <slot></slot>
            <div class="error-msg" v-show="validateState === 'error'">{{validateMessage}}</div>
        </div>
    </div>
</template>

<script>
import Emitter from "../../../../utils/js/emitter"
import AsyncValidator from 'async-validator'

export default {
    name: "a-form-item",
    props: {
        prop: {
            type: String
        },
        label: {
            type: String
        }
    },
    data() {
        return {
            validateState: "",
            validateMessage: "",
            initialValue: "",
            isRequired: false
        }
    },
    computed: {
        fieldValue() {
            return this.form.model[this.prop]
        }
    },
    inject: ["form"],
    mixins: [Emitter],
    created() {

    },
    mounted() {
        if(this.prop) {
            this.dispatch("a-form", "on-form-item-add", this)
            this.initialValue = this.fieldValue
            let rules = this.getRules()
            if(rules.length > 0) {
                this.isRequired = rules.some(rule => {
                    return rule.required
                })
            }
            this.setRules()
        }
    },
    methods: {
        setRules() {
            this.$on("on-form-item-change", (v) => {
                this.validate("change")
            })
            this.$on("on-form-item-blur", (v) => {
                this.validate("blur")
            })
        },
        getRules() {
            let formRules = this.form.rules
            formRules = formRules ? formRules[this.prop] : []
            return [].concat(formRules || [])
        },
        getFilteredRules(trigger) {
            const rules = this.getRules()
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
        },
        validate(trigger, callback = function() {}) {
            let rule = this.getFilteredRules(trigger)
            if(!rule || rule.length === 0) {
                return true
            }
            let describtor = {}
            let field = {}
            field[this.prop] = this.fieldValue
            describtor[this.prop] = rule
            let validator = new AsyncValidator(describtor)

            this.validateState = "validating"
            validator.validate(field, {firstFields: true}, (errors) => {
                this.validateState = errors ? "error" : "success"
                this.validateMessage = errors ? errors[0].message : ""
                callback(this.validateMessage)
            })
        },
        resetField() {
            this.validateState = ""
            this.validateMessage = ""
            this.form.model[this.prop] = this.initialValue
        }
    },
    beforeDestroy() {
        if(this.prop) {
            this.dispatch("a-form", "on-form-item-destroy", this)
        }
    }
}
</script>

<style lang="scss" scoped>
.a-form-item {
    .a-form-item-label {
        &.isRequired {
            &::before {
                content: "*";
                color: red;
            }
        }
    }
    .error-msg {
        color: red;
    }
}
</style>