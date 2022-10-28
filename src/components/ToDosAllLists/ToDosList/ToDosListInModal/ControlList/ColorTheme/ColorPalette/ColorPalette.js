import React from 'react';

import Color from './Color/Color';

import cssStyle from './ColorPalette.module.css';

const DUMMY_colors = [
	{ color: '#fcd5ce' },
	{ color: '#ffd7ba' },
	{ color: '#fbf8cc' },
	{ color: '#c9e4ca' },
	{ color: '#aed9e0' },
];
const ColorPalette = React.forwardRef((props, ColorPaletteRef) => {
	const colors = DUMMY_colors.map((c) => {
		return <Color key={c.color} color={c.color} id={props.id}></Color>;
	});

	return (
		<div ref={ColorPaletteRef} className={cssStyle.colorsContainer}>
			{colors}
		</div>
	);
});

export default ColorPalette;
