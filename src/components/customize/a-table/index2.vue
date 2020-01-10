<template>
    <table>
        <thead>
            <tr>
                <th v-for="(col, index) in columns" :key="index">
                    <td>{{col.title}}</td>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="(col, index2) in columns" :key="index2">
                    <render-col v-if="'render' in col" :row="row" :col="col" :index="index" :render="col.render"></render-col>
                    <template v-if="'slot' in col">
                        <slot :row="row" :col="col" :index="index" :name="col.slot"></slot>
                    </template>
                    <template v-else>
                        {{row[col.key]}}
                    </template>

                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import renderCol from "./render"
import emitter from "../../../../utils/js/emitter"
export default {
    name: "a-table",
    props: {
        columns: {

        },
        data: {

        }
    },
    data() {
        return {
            columnFields: []
        }
    },
    mixins: [emitter],
    components: {
        renderCol
    },
    created() {
        this.$on("a-table", column => {
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