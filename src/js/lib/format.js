export const format = (source, ...replacements) => {
	for (const [index, replacement] of replacements.entries()) {
		source = source.replace(
			new RegExp('\\{' + index + '\\}', 'g'),
			replacement,
		);
	}

	return source;
};
