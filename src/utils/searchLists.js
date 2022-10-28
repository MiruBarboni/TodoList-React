const findTodo = (list, searchedValue) => {
	let isFound = false;
	list.todoList.forEach((todo) => {
		if (
			!todo.isChecked &&
			todo.text.toLowerCase().indexOf(searchedValue) > -1
		) {
			isFound = true;
		}
	});
	return isFound;
};

export const filterList = (list, searchedValue = '') => {
	const titles = list.title.toLowerCase();

	const categories = list.category.toLowerCase();

	if (
		titles.indexOf(searchedValue) === -1 &&
		categories.indexOf(searchedValue) === -1 &&
		!findTodo(list, searchedValue)
	) {
		return false;
	} else {
		return true;
	}
};
