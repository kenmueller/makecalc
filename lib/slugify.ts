const slugify = (string: string) =>
	string
		.trim()
		.replace(/[\s\-\+\_]+/g, '-')
		.toLowerCase()

export default slugify
