import { useSelector } from 'react-redux';

import cssStyle from './CheckedToDos.module.css';

const CheckedToDos = ({ id }) => {
	const todoList = useSelector(
		(state) => state.lists.find((list) => list.id === id).todoList
	);

	const todos = todoList.filter((todo) => todo.isChecked);
	const totalNrOfCheckedToDos = todos.length;

	return (
		totalNrOfCheckedToDos > 0 && (
			<span className={cssStyle.container}>
				{totalNrOfCheckedToDos} ticked items
			</span>
		)
	);
};

export default CheckedToDos;
