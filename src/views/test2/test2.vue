<template>
    <div class="test2">
        <a-form :model="formItem" :rules="rules" ref="aForm">
            <a-form-item label="姓名" prop="name">
                <a-input v-model="formItem.name"></a-input>
            </a-form-item>
            <a-form-item label="地址" prop="address">
                <a-input v-model="formItem.address"></a-input>
            </a-form-item>
            <a-form-item label="hahah" prop="singleCheckbox">
                <a-checkbox v-model="formItem.singleCheckbox" trueValue="1" falseValue="0">singleCheckbox</a-checkbox>
            </a-form-item>
            <a-form-item label="heiehieehi" prop="multiCheckbox">
                <a-checkbox-group v-model="formItem.multiCheckbox">
                    <a-checkbox label="aaa">aaa</a-checkbox>
                    <a-checkbox label="bbb">bbb</a-checkbox>
                    <a-checkbox label="ccc">ccc</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
        </a-form>
        <button @click="validate">验证</button>
        <button @click="reset">重置</button>

        <!-- <a-table :columns="columns" :data="data"></a-table> -->
        <a-table :columns="columnsSlot" :data="data">
            <!-- <template #name="{row, col, index}">
                {{row.name}}
            </template>
            <template #birthday="{row, col, index}">
                {{new Date(parseInt(row.birthday)).toLocaleString()}}
                <input v-model="row.birthday"/>
            </template> -->
            <a-table-column label="姓名" prop="name">
                <template #default="{row}">
                    <input type="text" v-model="row.name">
                </template>
            </a-table-column>
            <a-table-column label="生日" prop="birthday"></a-table-column>
        </a-table>
    </div>
</template>

<script>
import aForm from "@/components/customize/a-form"
import aFormItem from "@/components/customize/a-form-item"
import aInput from "@/components/customize/a-input"
import aTable from "@/components/customize/a-table"
import aTableColumn from "@/components/customize/a-table-column/index.vue"
import aCheckbox from "@/components/customize/a-checkbox"
import aCheckboxGroup from "@/components/customize/a-checkbox-group"

export default {
    name: "test2",
    data() {
        return {
            formItem: {
                name: "abc",
                multiCheckbox: []
                // singleCheckbox: "0"
            },
            rules: {
                name: [
                    {required: true, trigger: "change", message: "不能为空"}
                ],
                address: [
                    {required: true, trigger: "blur", message: "测测试试"}
                ],
                singleCheckbox: [
                    {required: true, trigger: "blur", message: "测测试试"}
                ],
                multiCheckbox: [
                    {required: true, type: "array", trigger: "blur", message: "测测试试"}
                ]
            },
            columns: [
                {
                    title: "名字",
                    key: "name"
                },
                {
                    title: "生日",
                    key: "birthday",
                    render(h, {row, col, index}) {
                        return h("div", new Date(parseInt(row.birthday)).toLocaleString())
                    },
                }
            ],
            columnsSlot: [
                {
                    title: "名字",
                    slot: "name"
                },
                {
                    title: "生日",
                    slot: "birthday"
                }
            ],
            data: [
                {
                    name: "哈哈哈",
                    birthday: new Date().getTime()
                },
                {
                    name: "hehhehe",
                    birthday: new Date().getTime() + 2132313231323
                },
                {
                    name: "dfssfdsfds",
                    birthday: new Date().getTime() - 323423423423
                },
            ],
            singleCheckbox: "1"
        }
    },
    created() {
        
    },
    mounted() {
        // console.log(this.$scopedSlots)
        // console.log(this.$slots)
    },
    components: {
        aForm,
        aFormItem,
        aInput,
        aTable,
        aTableColumn,
        aCheckbox,
        aCheckboxGroup,
    },
    methods: {
        validate() {
            this.$refs.aForm.validate((valid) => {
                console.log("valid: " + valid)
            })
        },
        reset() {
            this.$refs.aForm.reset()
        }
    }
}
</script>

<style lang="scss" scoped>
.test2 {

}
</style>