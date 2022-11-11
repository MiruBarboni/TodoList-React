import React from 'react';
import Icon from '../../../UI/GoogleFontsIcons/Icon';

import cssStyle from './InputInfo.module.css';
const InputInfo = () => {
	return (
		<div className={cssStyle.container}>
			<Icon className={cssStyle.icon}>info</Icon>
			<p>Caps Lock is on </p>
		</div>
	);
};

export default InputInfo;
