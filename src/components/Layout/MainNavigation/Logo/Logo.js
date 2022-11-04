import React from 'react';
import Icon from '../../../UI/GoogleFontsIcons/Icon';

import cssStyle from './Logo.module.css';
const Logo = () => {
	return (
		<div className={cssStyle.logo}>
			<Icon>checklist</Icon> ToDoList
		</div>
	);
};

export default Logo;
