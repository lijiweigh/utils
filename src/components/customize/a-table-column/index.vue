<template>
    <div>
        <!-- <slot :row="tableData[privateIndex]" :col="privateIndex" :index="privateIndex"></slot> -->
        <slot :row="row" :col="col" :index="index"></slot>
    </div>
</template>

<script>
import emitter from "../../../../utils/js/emitter"
export default {
    name: "a-table-column",
    inject: ["tableRoot"],
    props: {
        label: {

        },
        prop: {

        }
    },
    data() {
        return {
            // privateIndex: this.tableRoot.index
            row: {},
            col: {},
            index: {},
        }
    },
    computed: {
        tableData() {
            // return this.tableRoot.data
        },
        // colIndex() {
        //     return this.tableRoot.index
        // }
    },
    mixins: [emitter],
    created() {

    },
    mounted() {
        this.dispatch("a-table", "on-a-table-column-add", this)
        // this.tableRoot.index++
    }
}
</script>