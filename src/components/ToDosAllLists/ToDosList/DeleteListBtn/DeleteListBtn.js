import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../../../store/ui-slice';
import { deleteList } from '../../../../api/deleteList';

import cssStyle from './DeleteListBtn.module.css';
import Icon from '../../../UI/GoogleFontsIcons/Icon';

const DeleteListBtn = ({ id }) => {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.userId);

	const deleteListHandler = () => {
		dispatch(deleteList(id, userId));
		dispatch(uiActions.hideListMenu());
	};

	return (
		<Icon onClick={deleteListHandler} className={cssStyle.deleteIcon}>
			delete<span className={cssStyle.tooltiptext}> Delete List</span>
		</Icon>
	);
};

export default DeleteListBtn;
