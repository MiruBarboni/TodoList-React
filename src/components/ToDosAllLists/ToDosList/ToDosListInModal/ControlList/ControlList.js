import { useSelector } from 'react-redux';

import ColorTheme from './ColorTheme/ColorTheme';
import MenuList from './MenuList/MenuList';

import cssStyle from './ControlList.module.css';

const ControlList = ({ id, ...props }) => {
	const isColorPaletteActive = useSelector(
		(state) => state.ui.isColorPaletteActive
	);

	const isListMenuActive = useSelector((state) => state.ui.isListMenuActive);

	return (
		<section className={cssStyle.container}>
			{!isListMenuActive && <ColorTheme id={id} />}
			{!isColorPaletteActive && <MenuList id={id} />}
		</section>
	);
};

export default ControlList;
