import React from 'react';

import cssStyle from '../ControlInput.module.css';

const EmailInput = ({ emailInputRef }) => {
	return (
		<div className={cssStyle.control}>
			<label htmlFor='email'>Your Email</label>
			<input ref={emailInputRef} type='email' id='email' />
		</div>
	);
};

export default EmailInput;
