export default {
    name: "a-table-column-render",
    functional: true,
    props: {
        row: {

        },
        col: {

        },
        index: {

        },
        render: {

        }
    },
    render(h, ctx) {
        let params = {
            row: ctx.props.row,
            col: ctx.props.col,
            index: ctx.props.index
        }
        return ctx.props.render(h, params)
    },
}