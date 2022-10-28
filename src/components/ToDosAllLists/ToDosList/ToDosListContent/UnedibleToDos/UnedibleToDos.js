import React from 'react';
import { useSelector } from 'react-redux';

const UnedibleToDos = React.memo(({ id }) => {
	const todosItems = useSelector(
		(state) => state.lists.find((list) => list.id === id).todoList
	);

	const uncheckedToDos = todosItems
		.filter((item) => item.isChecked === false)
		.map((filteredItem) => <li key={filteredItem.id}>{filteredItem.text}</li>);

	const totalNrOfCheckedToDos = todosItems.filter(
		(item) => item.isChecked === true
	).length;

	return (
		<>
			{uncheckedToDos && <ul>{uncheckedToDos}</ul>}
			{totalNrOfCheckedToDos !== 0 && (
				<span>+ {totalNrOfCheckedToDos} checked items</span>
			)}
		</>
	);
});

export default UnedibleToDos;
