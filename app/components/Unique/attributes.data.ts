export const attributeGroups = {
	1: {
		id: "001",
		name: "Информация",
		attribute_type: "customer_group",
		handle: "customer_details",
		position: 1,
	},
	2: {
		id: "002",
		name: "Информация",
		attribute_type: "products",
		handle: "product_details",
		position: 1,
	},
	3: {
		id: "003",
		name: "Информация",
		attribute_type: "collection",
		handle: "collection_details",
		position: 1,
	},
};

export const attributeP = {
	name: {
		name: {
			en: "Name",
			ru: "Имя",
		},
		description: {
			en: "",
			ru: "",
		},
		handle: "name",
		type: "translated_text",
		required: true,
		filtrable: false,
		searchable: false,
    richText: false,
	},
	brands: {
		name: {
			en: "Brands",
			ru: "Бренды",
		},
		description: {
			en: "",
			ru: "",
		},
		handle: "brands",
		type: "dropdown",
		required: true,
		filtrable: false,
		searchable: false,
		lookups: [
			{ label: "Nike", value: 1 },
			{ label: "Adidas", value: 2 },
			{ label: "Fila", value: 3 },
		],
	},
	details: {
		name: {
			en: "Details",
			ru: "Детали",
		},
		description: {
			en: "",
			ru: "",
		},
		handle: "details",
		type: "list_field",
		required: true,
		filtrable: false,
		searchable: false,
	},
	"test-text": {
		name: {
			en: "Test text",
			ru: "Тестовый Текст",
		},
		description: {
			en: "",
			ru: "",
		},
		handle: "test-text",
		type: "text",
		required: true,
		filtrable: false,
		searchable: false,
		richText: false,
	},
	description: {
		name: {
			en: "Description",
			ru: "Описание",
		},
		description: {
			en: "",
			ru: "",
		},
		handle: "translated_text",
		type: "text",
		required: true,
		filtrable: false,
		searchable: false,
		richText: true,
	},
	count: {
		name: {
			en: "Count",
			ru: "Количество",
		},
		description: {
			en: "",
			ru: "",
		},
		handle: "count",
		type: "number",
		required: true,
		filtrable: false,
		searchable: false,
		min: 1,
		max: 1000,
	},
};

// attribute/products
// attribute/customer_group
