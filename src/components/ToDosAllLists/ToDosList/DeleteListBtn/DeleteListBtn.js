import { useDispatch } from 'react-redux';
import { listsActions } from '../../../../store/lists-slice';

import cssStyle from './DeleteListBtn.module.css';
import Icon from '../../../UI/GoogleFontsIcons/Icon';
import { uiActions } from '../../../../store/ui-slice';

const DeleteListBtn = ({ id }) => {
	const dispatch = useDispatch();

	const deleteListHandler = () => {
		dispatch(listsActions.deleteList(id));
		dispatch(uiActions.hideListMenu());
	};

	return (
		<Icon onClick={deleteListHandler} className={cssStyle.deleteIcon}>
			delete<span className={cssStyle.tooltiptext}> Delete List</span>
		</Icon>
	);
};

export default DeleteListBtn;
