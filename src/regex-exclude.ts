export type RegexFilters = [string, string][];

export function shouldExclude(text: string, regexFilters: RegexFilters) {
	return (regexFilters || []).some((pattern) => {
		try {
			const regex = new RegExp(pattern[0], pattern[1]);
			return regex.test(text);
		} catch (e) {
			console.error(`Invalid regex pattern: ${pattern}`);
			return false;
		}
	});
}
