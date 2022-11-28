import React, { useState } from 'react';
import { replaceCharacters } from '../../../../utils/replaceCharacters';
import cssStyle from './SuccessNotification.module.css';

const SuccessNotification = (props) => {
	const [emailToBeDisplayed] = useState(replaceCharacters(props.email));

	return (
		<p className={cssStyle.success}>
			Reset intructions have been sent to {emailToBeDisplayed}.
		</p>
	);
};

export default SuccessNotification;
