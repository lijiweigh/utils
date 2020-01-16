function findComponentUpward(context, componentName) {
    let parent = context.$parent
    let name = parent.$options.name
    while(parent && (!name || componentName !== name)) {
        parent = parent.$parent
        if(parent) {
            name = parent.$options.name
        }
    }

    return parent ? parent : null
}

function findComponentsUpward(context, componentName) {
    let parents = []
    let parent = context.$parent
    if(parent) {
        if(parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}

function findComponentDownward(context, componentName) {
    let children = context.$children
    let child = null
    if(children.length > 0) {
        for(let c of children) {
            if(c.$options.name === componentName) {
                child = c
                break
            } else {
                child = findComponentDownward(child, componentName)
                if(child) break
            }
        }
    }
    return child
}

function findComponentsDownward(context, componentName) {
    let childrens = context.$children
    let children = []
    if(childrens.length > 0) {
        for(let child of childrens) {
            if(child.$options.name === componentName) {
                children.push(child)
            }
            children = children.concat(findComponentsDownward(child, componentName))
        }
    } 
    return children
}

function findBrothersComponents(context, componentName, exceptMe = true) {
    let parent = context.$parent
    let brothers = []
    if(parent) {
        brothers = parent.$children.filter(c => {
            return c.$options.name === componentName
        })
        if(exceptMe) {
            let index = brothers.findIndex(c => {
                return c._uid === context._uid
            })
            brothers.splice(index, 1)
        }

    }
    return brothers
}

export { 
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents
}

function findComponentUpward2(context, componentName) {
    let parent = context.$parent
    while(parent && (!parent.$options.name || parent.$options.name !== componentName)) {
        parent = parent.$parent
    }
    return parent
}

function findComponentsUpward2(context, componentName) {
    let parent = context.$parent
    let parents = []
    if(parent) {
        if(parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward2(parent, componentName))
    } else {
        return []
    }
}

function findComponentDownward2(context, componentName) {
    let child = null
    let children = context.$children
    for(let c of children) {
        if(c.$options.name === componentName) {
            child = c
            break;
        } else {
            child = findComponentDownward2(c, componentName)
            if(child) break;
        }
    }
    return child
}

function findComponentsDownward2(context, componentName) {
    return context.$children.reduce((childs, c) => {
        if(c.$options.name === componentName) childs.push(c)
        return childs.concat(findComponentsDownward2(c, componentName))
    }, [])
}

function findComponentsBrother(context, componentName, exceptMe = true) {
    let bros = context.$parent.$children.filter(c => {
        return c.$options.name === componentName
    })
    if(exceptMe) {
        let index = bros.findIndex(b => {
            return b._uid === context._uid
        })
        bros.splice(index, 1)
    }
    return bros
}