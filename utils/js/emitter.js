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


function broadcast2(componentName, eventName, params) {
    let children = this.$children
    children.some(child => {
        if(child.$options.name === componentName) {
            child.$emit.apply(child, eventName.concat[params])
            return true
        } else {
            broadcast2.apply(child, [componentName, eventName].concat(params))
        }
    })
}

function dispatch2(componentName, eventName, params) {
    let parent = this.$parent || this.$root
    while(parent && (!parent.$options.name || parent.$options.name !== componentName)) {
        parent = parent.$parent
    }
    if(parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
    }
}