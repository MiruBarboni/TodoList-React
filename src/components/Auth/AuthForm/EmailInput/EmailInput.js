import React from 'react';

import InputInfo from '../InputInfo/InputInfo';

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
				onKeyDown={props.emailKeyDownHandler}
			/>

			{isEmailINVALID && (
				<p className={cssStyle.errorText}>Email is invalid.</p>
			)}

			{props.emailIsCapsLockOn && <InputInfo />}
		</div>
	);
};

export default EmailInput;
