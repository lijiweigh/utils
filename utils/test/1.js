let code = [
	{
		id: 1,
		name: "orderSerialId",
		in: "query",
		description: "orderSerialId",
		schema: {
			type: "user",
		},
		children: [
			{
				id: 8,
				name: "username",
				in: "query",
				description: "username",
				schema: {
					type: "string",
				},
			},
		],
	},
	{
		id: 2,
		name: "username",
		in: "query",
		description: "username",
		schema: {
			type: "string",
		},
    },
    {
		id: 2,
		name: "count",
		in: "query",
		description: "username",
		schema: {
			type: "number",
		},
    },
    {
		id: 2,
		name: "list",
		in: "query",
		description: "username",
		schema: {
			type: "array",
        },
        children: [
			{
				id: 8,
				name: "username",
				in: "query",
				description: "username",
				schema: {
					type: "object",
                },
                children: [
                    {
                        id: 8,
                        name: "username",
                        in: "query",
                        description: "username",
                        schema: {
                            type: "string",
                        },
                    },
                ],
            },
            {
				id: 8,
				name: "username",
				in: "query",
				description: "username",
				schema: {
					type: "object",
                },
                children: [
                    {
                        id: 8,
                        name: "username",
                        in: "query",
                        description: "username",
                        schema: {
                            type: "string",
                        },
                    },
                ],
            },
            {
				id: 8,
				name: "username",
				in: "query",
				description: "username",
				schema: {
					type: "number",
                },
                
			},
		],
	},
]

let result = "{\n"

result += setCode(code)

result += "}"

console.log(result)

function setCode(code, type) {
    let r = ""
    code.forEach(item => {
        if(type !== "array") {
            r += `"${item.name}": `
        }
        r += `${getValueByType(item.schema.type)},\n`
        if(item.children && item.children.length > 0) {
            r = r.slice(0, -3) + "\n" + setCode(item.children, item.schema.type) + r.slice(-3)
        }
    })
    return r
}

function getValueByType(type) {
    switch(type) {
        case "string": return "\"\"";
        case "number": return 0;
        case "integer": return 0;
        case "boolean": return true;
        case "array": return "[]";
        case "user": 
        case "object": return "{}";
    }
}