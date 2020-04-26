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
]

let result = "{"

code.forEach(item => {
    result += `"${item.name}": ${getValueByType(item.type)},\n`
})

result += "}"

function getValueByType(type) {
    switch(type) {
        case "string": return "";
        case "number": return "0";
        case "integer": return "0";
        case "boolean": return "true";
        case "array": return "[]";
        case "object": return "{}";
    }
}