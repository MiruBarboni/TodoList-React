import React from 'react';
import Icon from '../../../../../UI/GoogleFontsIcons/Icon';

import cssStyle from './Condition.module.css';

const Condition = ({ isValid, ...props }) => {
	const validationClass = `${cssStyle.icon} ${
		isValid ? cssStyle.valid : cssStyle.invalid
	}`;
	return (
		<div className={cssStyle.container}>
			{!isValid && <Icon className={validationClass}>close</Icon>}
			{isValid && <Icon className={validationClass}>check</Icon>}
			<p>{props.children}</p>
		</div>
	);
};

export default Condition;
