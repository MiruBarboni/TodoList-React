import React from 'react';

import cssStyle from '../ControlInput.module.css';

const PasswordInput = ({ passwordInputRef }) => {
	return (
		<div className={cssStyle.control}>
			<label htmlFor='password'>Your Password</label>
			<input ref={passwordInputRef} type='password' id='password' />
		</div>
	);
};

export default PasswordInput;
