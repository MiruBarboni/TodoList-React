import { useDispatch } from 'react-redux';

import { listsActions } from '../../../../../store/lists-slice';

import ControlListBtn from '../../../../ControlLists/ControlListBtn/ControListBtn';

import cssStyle from './AddToDo.module.css';

const AddToDo = ({ id: listId }) => {
	const dispatch = useDispatch();

	const addToDoHandler = () => {
		dispatch(listsActions.addTodo(listId));
	};
	return (
		<ControlListBtn className={cssStyle.addBtn} onClick={addToDoHandler}>
			+ Item
		</ControlListBtn>
	);
};

export default AddToDo;
