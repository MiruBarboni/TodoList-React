import React from 'react';
import Icon from '../../../../UI/GoogleFontsIcons/Icon';

import cssStyle from './VisibilityIcon.module.css';

const VisibilityIcon = (props) => {
	let iconContent;
	props.showPassword
		? (iconContent = 'visibility_off')
		: (iconContent = 'visibility');

	return (
		<Icon className={cssStyle.icon} onClick={props.onShowPassword}>
			{iconContent}
		</Icon>
	);
};

export default VisibilityIcon;
