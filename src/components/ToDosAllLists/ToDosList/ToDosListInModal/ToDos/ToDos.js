import { useSelector } from 'react-redux';

import ToDo from './ToDo/ToDo';

import cssStyle from './ToDos.module.css';

const ToDos = ({ id, showChecked }) => {
	const { todoList } = useSelector((state) =>
		state.lists.find((list) => list.id === id)
	);

	const todos = todoList.map((todo) => {
		return (
			((!showChecked && !todo.isChecked) ||
				(showChecked && todo.isChecked)) && (
				<ToDo
					key={todo.id}
					todoId={todo.id}
					listId={id}
					showChecked={showChecked}
				></ToDo>
			)
		);
	});

	return <div className={cssStyle.container}>{todos}</div>;
};

export default ToDos;
