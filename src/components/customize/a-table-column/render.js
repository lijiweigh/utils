export default {
    functional: true,
    props: {
        row: {

        },
        col: {

        },
        index: {

        },
        prop: {

        },
        scoped: {

        },
    },
    render(h, ctx) {
        if(ctx.props.scoped.default) {
            return h("div", [ctx.props.scoped.default({
                row: ctx.props.row,
                col: ctx.props.col,
                index: ctx.props.index,
            })])
        } else {
            return h("div", ctx.props.row[ctx.props.prop])
        }
    }
}