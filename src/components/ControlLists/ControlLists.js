import { useDispatch } from 'react-redux';
import { listsActions } from '../../store/lists-slice';

import ControlListBtn from './ControlListBtn/ControListBtn';

import cssStyle from './ControlLists.module.css';

const ControlLists = (props) => {
	const { id, title, category } = props;
	const dispatch = useDispatch();

	const addNewListHandler = () => {
		dispatch(
			listsActions.addList({
				id,
				title,
				category,
			})
		);
	};
	const removeAllListsHandler = () => {
		console.log('delete all lists');
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
