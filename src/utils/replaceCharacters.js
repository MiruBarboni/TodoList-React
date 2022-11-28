export const replaceCharacters = (string) => {
	const startIndex = 3;
	const endIndex = string.indexOf('@', startIndex);

	const stringToBeModified = string.slice(startIndex, endIndex);

	const modifiedString = replaceWithAsteriskSymbol(stringToBeModified);

	const newString = `${string.slice(
		0,
		startIndex
	)}${modifiedString}${string.slice(endIndex)}`;

	return newString;
};

function replaceWithAsteriskSymbol(string) {
	const length = string.length;

	let newString = '';
	for (let i = 0; i < length; i++) {
		newString += '*';
	}
	return newString;
}
