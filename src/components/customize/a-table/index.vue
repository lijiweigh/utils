<template>
    <table>
        <thead>
            <tr>
                <th v-for="(col, index) in columnFields" :key="index">
                    <td>{{col.label}}</td>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="(col, index2) in columnFields" :key="index2">
                    <render-col :row="row" :col="col" :index="index" :prop="col.prop" :scoped="col.$scopedSlots"></render-col>
                </td>
            </tr>
        </tbody>
        <slot></slot>
    </table>
</template>

<script>
import renderCol from "../a-table-column/render"
import emitter from "../../../../utils/js/emitter"
export default {
    name: "a-table",
    props: {
        columns: {

        },
        data: {

        }
    },
    provide: {
        tableRoot: this
    },
    data() {
        return {
            columnFields: [],
            index: 0
        }
    },
    mixins: [emitter],
    components: {
        renderCol
    },
    created() {
        this.$on("on-a-table-column-add", column => {
            this.columnFields.push(column)
        })
    },
    mounted() {
        console.log(this.$scopedSlots)
        // console.log(this.$slots)
    }
}
</script>

<style lang="scss" scoped>

</style>