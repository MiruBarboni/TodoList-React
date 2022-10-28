import { useDispatch } from 'react-redux';
import { listsActions } from '../../../../../../../store/lists-slice';
import { uiActions } from '../../../../../../../store/ui-slice';
import MenuListBtn from '../MenuListBtn/MenuListBtn';

import Icon from '../../../../../../UI/GoogleFontsIcons/Icon';

import cssStyle from './DeleteBtn.module.css';

const DeleteBtn = ({ id }) => {
	const dispatch = useDispatch();

	const deleteListHandler = () => {
		dispatch(listsActions.deleteList(id));
		dispatch(uiActions.hideListMenu());
	};
	return (
		<>
			<MenuListBtn className={cssStyle.deleteBtn} onClick={deleteListHandler}>
				<Icon>delete</Icon>
				Delete
			</MenuListBtn>
		</>
	);
};

export default DeleteBtn;
