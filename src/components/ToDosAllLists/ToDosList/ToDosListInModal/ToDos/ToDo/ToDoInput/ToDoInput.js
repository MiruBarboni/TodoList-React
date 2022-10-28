import { useSelector } from 'react-redux';
import { useDebounceCallback } from '../../../../../../../hooks/useDebounceCallback';

import cssStyle from './ToDoInput.module.css';

const ToDoInput = ({ listId, todoId, updateTodoTextHandler }) => {
	const { todoList } = useSelector((state) =>
		state.lists.find((list) => list.id === listId)
	);
	const todo = todoList.find((todo) => todo.id === todoId);
	const todoText = todo.text;

	const [todoTextValue, setTodoTextValue] = useDebounceCallback(
		todoText,
		500,
		updateTodoTextHandler
	);

	return (
		<input
			className={cssStyle.input}
			type='text'
			value={todoTextValue}
			onChange={(e) => setTodoTextValue(e.target.value)}
		/>
	);
};

export default ToDoInput;
