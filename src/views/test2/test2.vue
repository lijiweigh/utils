<template>
    <div class="test2">
        <a-form :model="formItem" :rules="rules" ref="aForm">
            <a-form-item label="姓名" prop="name">
                <a-input v-model="formItem.name"></a-input>
            </a-form-item>
            <a-form-item label="地址" prop="address">
                <a-input v-model="formItem.address"></a-input>
            </a-form-item>
        </a-form>
        <button @click="validate">验证</button>
        <button @click="reset">重置</button>
    </div>
</template>

<script>
import aForm from "@/components/customize/a-form"
import aFormItem from "@/components/customize/a-form-item"
import aInput from "@/components/customize/a-input"
export default {
    name: "test2",
    data() {
        return {
            formItem: {
                name: "abc"
            },
            rules: {
                name: [
                    {required: true, trigger: "change", message: "不能为空"}
                ],
                address: [
                    {required: true, trigger: "blur", message: "测测试试"}
                ]
            }
        }
    },
    created() {
        
    },
    components: {
        aForm,
        aFormItem,
        aInput,
    },
    methods: {
        validate() {
            this.$refs.aForm.validate((valid) => {
                console.log("valid: " + valid)
            })
        },
        reset() {
            this.$refs.aForm.resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>
.test2 {

}
</style>