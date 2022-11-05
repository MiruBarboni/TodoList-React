import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { createList } from '../../../../../../../api/createList';

import Icon from '../../../../../../UI/GoogleFontsIcons/Icon';
import MenuListBtn from '../MenuListBtn/MenuListBtn';
import Notification from '../../../../../../UI/Notification/Notification';

import cssStyle from './CopyBtn.module.css';
import { uiActions } from '../../../../../../../store/ui-slice';

const CopyBtn = ({ id, closeModalHandler }) => {
	const [isCopied, setIsCopied] = useState(false);
	const dispatch = useDispatch();

	const list = useSelector((state) =>
		state.lists.find((list) => list.id === id)
	);
	const userId = useSelector((state) => state.auth.userId);

	const copyListHandler = () => {
		const deepCopyList = _.cloneDeep(list);

		deepCopyList.title
			? (deepCopyList.title = `Copy of ${deepCopyList.title}`)
			: (deepCopyList.title = 'Copy of Untitle List');

		dispatch(uiActions.setOpenModalOnCopy(true));
		dispatch(uiActions.hideListMenu());
		dispatch(createList(deepCopyList, userId));

		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
			closeModalHandler();
			dispatch(uiActions.setOpenModalOnCopy(false));
		}, 2000);
	};
	return (
		<>
			<MenuListBtn className={cssStyle.copyBtn} onClick={copyListHandler}>
				<Icon>content_copy</Icon> Copy
			</MenuListBtn>
			{isCopied && <Notification>Copied</Notification>}
		</>
	);
};

export default CopyBtn;
