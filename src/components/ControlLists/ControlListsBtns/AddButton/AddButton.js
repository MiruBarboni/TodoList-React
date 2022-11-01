import { useDispatch } from 'react-redux';

import { createList } from '../../../../api/createList';
import ControlButton from '../../../UI/ControlButton/ControlButton';

import cssStyle from './AddButton.module.css';

const AddButton = () => {
	const dispatch = useDispatch();

	const addNewListHandler = () => {
		const newList = {
			title: '',
			category: 'Select a category',
			color: '#ead2ac',
			todoList: [],
		};
		dispatch(createList(newList));
	};
	return (
		<ControlButton className={cssStyle.addBtn} onClick={addNewListHandler}>
			+ Add
		</ControlButton>
	);
};

export default AddButton;
