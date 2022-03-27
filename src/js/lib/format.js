export const format = (source, ...replacements) => {
	for (const [index, replacement] of replacements.entries()) {
		const placeholderRegExp = new RegExp('\\{' + index + '\\}', 'g');
		source = source.replace(placeholderRegExp, replacement);
	}

	return source;
};
