import React from 'react';

import cssStyle from '../ControlInput.module.css';

const PasswordInput = (props) => {
	const isPasswordINVALID = props.passwordIsTouched && !props.passwordIsValid;
	const passwordInputClasses = isPasswordINVALID
		? `${cssStyle.control} ${cssStyle.invalid}`
		: `${cssStyle.control}`;

	return (
		<div className={passwordInputClasses}>
			<label htmlFor='password'>Your Password</label>
			<input
				type='password'
				id='password'
				value={props.passwordState.value}
				onChange={props.passwordChangeHandler}
			/>
			{isPasswordINVALID && (
				<p className={cssStyle.errorText}>Password is invalid.</p>
			)}
		</div>
	);
};

export default PasswordInput;
