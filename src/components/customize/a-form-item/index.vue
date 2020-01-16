<template>
    <div class="a-form-item">
        <div :class="{isRequired: isRequired}">
            <label v-if="label">{{label}}</label>
            <slot></slot>
        </div>
        <div v-show="validateState === 'fail'" style="color: red">{{validateMessage}}</div>
    </div>
</template>

<script>
import Emitter from "../../../../utils/js/emitter"
import AsyncValidator from 'async-validator'

export default {
    name: "a-form-item",
    inject: ["form"],
    props: {
        prop: {

        },
        label: {

        }
    },
    data() {
        return {
            validateState: "",
            validateMessage: "",
            initValue: "",
            isRequired: false
        }
    },
    mixins: [Emitter],
    computed: {
        fieldValue() {
            return this.form.model[this.prop]
        }
    },
    created() {
        this.$on("on-form-item-change", this.onChange)
        this.$on("on-form-item-blur", this.onBlur)
        this.isRequired = this.getRules().some(rule => rule.required)
        this.initValue = this.fieldValue
    },
    mounted() {
        if(this.prop) {
            this.dispatch("a-form", "on-form-item-add", this)
        }
    },
    methods: {
        onChange(v) {
            this.validate("change", () => {})
        },
        onBlur(v) {
            this.validate("blur", () => {})
        },
        getRules() {
            let rules = this.form.rules
            if(rules) {
                rules = rules[this.prop]
            }
            return [].concat(rules || [])
        },
        filterRules(trigger) {
            let rules = this.getRules()
            rules = rules.filter(rule => {
                return !rule.trigger || rule.trigger.indexOf(trigger) !== -1
            })
            return rules
        },
        validate(trigger, cb) {
            let rules = this.filterRules(trigger)
            if(!rules || rules.length < 1) {
                if(cb) {
                    return cb(true)
                } else {
                    return Promise.resolve(true)
                }
            }
            this.validateState = "validating"
            return new Promise((resolve, reject) => {
                let describtor = {}
                describtor[this.prop] = rules
                let model = {}
                model[this.prop] = this.fieldValue
                let validator = new AsyncValidator(describtor)
                validator.validate(model, {firstFields: true}, errors => {
                    if(errors) {
                        cb ? cb(false) : reject(false)
                        this.validateState = "fail"
                        this.validateMessage = errors[0].message
                    } else {
                        cb ? cb(true) : resolve(true)
                        this.validateState = "success"
                        this.validateMessage = ""
                    }
                })
            })
        },
        reset() {
            this.validateState = ""
            this.validateMessage = ""
            this.$set(this.form.model, this.prop, this.initValue)
        }
    },
    beforeDestroy() {
        if(this.prop) {
            this.dispatch("a-form", "on-form-item-remove", this)
        }
    }
}
</script>

<style lang="scss" scoped>
.isRequired {
    position: relative;
    &::before {
        content: "*";
        color: red;
    }
}
</style>