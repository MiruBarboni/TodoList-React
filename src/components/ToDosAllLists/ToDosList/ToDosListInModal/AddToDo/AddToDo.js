import { useDispatch } from 'react-redux';

import { createToDo } from '../../../../../api/todoList/createToDo';

import ControlButton from '../../../../UI/ControlButton/ControlButton';

import cssStyle from './AddToDo.module.css';

const AddToDo = ({ id: listId }) => {
	const dispatch = useDispatch();

	const addToDoHandler = () => {
		const newTodo = {
			text: '',
			isChecked: false,
		};

		dispatch(createToDo(newTodo, listId));
	};
	return (
		<ControlButton className={cssStyle.addBtn} onClick={addToDoHandler}>
			+ Item
		</ControlButton>
	);
};

export default AddToDo;
