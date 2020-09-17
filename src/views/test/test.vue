<template>
    <div class="my-ele-test">
        <!-- <my-input ref="myInput" v-model="value" :clearable="true" :show-word-limit="true" placeholder="adfaffsafdsfds" style="width: 420px" @change="handleInput">
            <template #append>
                append
            </template>
            <template #prepend>
                prepend
            </template>
        </my-input>

        <my-table :data="tableData">
            <template #default>
                <my-table-column prop="date" label="日期" width="180"></my-table-column>
                <my-table-column prop="name" label="姓名" width="180"></my-table-column>
                <my-table-column prop="address" label="地址"></my-table-column>
            </template>
        </my-table> -->
        <div class="direction" v-html="inputValuec"></div>
        <!-- <input class="direction" v-model="inputValuec" /> -->
        <br/>
        <input class="input" v-model="inputValue" />

        <div>{{count[0]}}</div>
        <button @click="click">click</button>
    </div>
</template>

<script>
import myInput from "@/components/element/input"
import myTable from "@/components/element/table"
import myTableColumn from "@/components/element/table-column"
import jsonp from "../../../utils/js/jsonp"

export default {
    name: "my-ele-test",
    data() {
        return {
            value: "aa",
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            inputValue: "",
            inputValuec: "",
            count: [2]
        }
    },
    components: {
        myInput,
        myTable,
        myTableColumn,
    },
    methods: {
        handleInput(v) {
            // console.log(v)
        },
        click() {
            // this.count[0] = this.count[0] + 1
            this.$set(this.count, 0, this.count[0] + 1)
        }
    },
    mounted() {
        // console.log(this.$refs.myInput.eleElement)
        console.log("mounted")
        jsonp("https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=GTA5&req=2&csor=4&pwd=121&_=1597215314884", {}, {param: "cb"})
            .then(res => {
                console.log(res)
            })
    },
    watch: {
        value(v) {
            console.log(v)
        },
        inputValue(v) {
            this.inputValuec = v + "&#x200E;"
        }
    }
}

</script>

<style lang="scss" scoped>
.my-ele-test {
    padding-bottom: env(safe-area-inset-bottom);
}

.direction {
    direction: rtl;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 30px;
}

.input {
    width: 200px;
    height: 30px;
}
</style>