import { useListActionsButtons } from '../../../../../../hooks/useListActionsButtons';
import { uiActions } from '../../../../../../store/ui-slice';

import Icon from '../../../../../UI/GoogleFontsIcons/Icon';
import ColorPalette from './ColorPalette/ColorPalette';

const ColorTheme = ({ id, ...props }) => {
	const [
		isColorPaletteOpened,
		openColorPaletteHandler,
		closeColorPaletteHandler,
		colorPaletteRef,
	] = useListActionsButtons(
		uiActions.displayColorPalette,
		uiActions.hideColorPalette
	);

	return (
		<>
			{!isColorPaletteOpened && (
				<Icon onClick={openColorPaletteHandler}>palette</Icon>
			)}

			{isColorPaletteOpened && (
				<ColorPalette
					ref={colorPaletteRef}
					closeColorPaletteHandler={closeColorPaletteHandler}
					id={id}
				/>
			)}
		</>
	);
};

export default ColorTheme;
