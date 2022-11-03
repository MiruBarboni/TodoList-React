import { useListActionsButtons } from '../../../../../../hooks/useListActionsButtons';
import { uiActions } from '../../../../../../store/ui-slice';
import Icon from '../../../../../UI/GoogleFontsIcons/Icon';

import MenuListContent from './MenuListContent/MenuListContent';

const MenuList = ({ id, ...props }) => {
	const [
		isListMenuOpened,
		openListMenuHandler,
		closeListMenuHandler,
		listMenuRef,
	] = useListActionsButtons(uiActions.displayListMenu, uiActions.hideListMenu);

	return (
		<>
			{!isListMenuOpened && <Icon onClick={openListMenuHandler}>list</Icon>}
			{isListMenuOpened && (
				<MenuListContent
					ref={listMenuRef}
					closeListMenuHandler={closeListMenuHandler}
					closeModalHandler={props.closeModalHandler}
					id={id}
				/>
			)}
		</>
	);
};

export default MenuList;
