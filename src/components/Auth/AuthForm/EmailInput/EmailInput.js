import React from 'react';

import cssStyle from '../ControlInput.module.css';

const EmailInput = (props) => {
	const isEmailINVALID = props.emailIsTouched && !props.emailIsValid;

	const emailInputClasses = isEmailINVALID
		? `${cssStyle.control} ${cssStyle.invalid}`
		: `${cssStyle.control}`;

	return (
		<div className={emailInputClasses}>
			<label htmlFor='email'>Your Email</label>
			<input
				type='email'
				id='email'
				value={props.emailState.value}
				onChange={props.emailChangeHandler}
			/>

			{isEmailINVALID && (
				<p className={cssStyle.errorText}>Email is invalid.</p>
			)}
		</div>
	);
};

export default EmailInput;
