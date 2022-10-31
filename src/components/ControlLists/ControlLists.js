import { useDispatch } from 'react-redux';
import { listsActions } from '../../store/lists-slice';
import ControlListBtn from './ControlListBtn/ControListBtn';
import { createList } from '../../store/lists-actions';
import { v4 as uuidv4 } from 'uuid';

import cssStyle from './ControlLists.module.css';
import { getAllLists } from '../../api/listsApi';

const ControlLists = () => {
	const dispatch = useDispatch();

	const addNewListHandler = () => {
		const id = uuidv4();
		const newList = {
			id,
			title: '',
			category: 'Select a category',
			color: '#ead2ac',
			todoList: [],
		};
		dispatch(createList(newList));
	};
	const removeAllListsHandler = () => {
		dispatch(listsActions.deleteAllLists());
	};

	return (
		<section className={cssStyle.container}>
			<ControlListBtn className={cssStyle.addBtn} onClick={addNewListHandler}>
				+ Add
			</ControlListBtn>

			<ControlListBtn
				className={cssStyle.removeBtn}
				onClick={removeAllListsHandler}
			>
				Delete All
			</ControlListBtn>
		</section>
	);
};

export default ControlLists;
