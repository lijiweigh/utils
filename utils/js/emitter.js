function broadcast(componentName, event, params) {
    this.$children.forEach(child => {
        let name = child.$options.name
        if(name === componentName) {
            child.$emit.apply(child, [event].concat([params]))
        } else {
            broadcast.apply(child, [componentName, event].concat([params]))
        }
    })
}

export default {
    methods: {
        dispatch(componentName, event, params) {
            let parent = this.$parent || $root
            let name = parent.$options.name
            while(parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if(parent) {
                    name = parent.$options.name
                }
            }
            if(parent) {
                parent.$emit.apply(parent, [event].concat([params]))
            }
        },
        broadcast(componentName, event, params) {
            broadcast.call(this, componentName, event, params)
        }
    },
}