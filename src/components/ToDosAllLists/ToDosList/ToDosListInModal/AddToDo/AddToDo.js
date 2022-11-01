import { useDispatch } from 'react-redux';

import { listsActions } from '../../../../../store/lists-slice';

import ControlButton from '../../../../UI/ControlButton/ControlButton';

import cssStyle from './AddToDo.module.css';

const AddToDo = ({ id: listId }) => {
	const dispatch = useDispatch();

	const addToDoHandler = () => {
		dispatch(listsActions.addTodo(listId));
	};
	return (
		<ControlButton className={cssStyle.addBtn} onClick={addToDoHandler}>
			+ Item
		</ControlButton>
	);
};

export default AddToDo;
