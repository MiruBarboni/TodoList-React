export function checkvalidity(inputValue, pattern) {
	return pattern.test(inputValue.trim());
}
