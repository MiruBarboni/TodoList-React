import React from 'react';
import { useState } from 'react';

import InputInfo from '../InputInfo/InputInfo';
import VisibilityIcon from './VisibilityIcon/VisibilityIcon';

import cssStyle from '../ControlInput.module.css';
import cssStyle2 from './PasswordInput.module.css';
import PasswordConditions from './PasswordConditions/PasswordConditions';

const PasswordInput = ({ passwordIsValid, passwordIsTouched, ...props }) => {
	const minLengthVal = passwordIsValid.minLength;
	const upperCaseLVal = passwordIsValid.upperCaseL;
	const lowerCaseLVal = passwordIsValid.lowerCaseL;
	const numsVal = passwordIsValid.nums;
	const specialCharsVal = passwordIsValid.specialChars;

	const isPasswordINVALID =
		(passwordIsTouched && !minLengthVal) ||
		!upperCaseLVal ||
		!lowerCaseLVal ||
		!numsVal ||
		!specialCharsVal;

	const passwordInputClasses = isPasswordINVALID
		? `${cssStyle.control} ${cssStyle.invalid}`
		: `${cssStyle.control}`;

	const [showPassword, setShowPassword] = useState(false);

	const showPasswordHandler = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div className={passwordInputClasses}>
			<label htmlFor='password'>Your Password</label>

			<div className={cssStyle2.container}>
				<input
					type={showPassword ? 'text' : 'password'}
					id='password'
					value={props.passwordState.value}
					onChange={props.passwordChangeHandler}
					onKeyDown={props.passwordKeyDownHandler}
				/>
				{passwordIsTouched && (
					<VisibilityIcon
						onShowPassword={showPasswordHandler}
						showPassword={showPassword}
					/>
				)}
			</div>

			{passwordIsTouched && (
				<PasswordConditions passwordIsValid={passwordIsValid} />
			)}

			{props.passwordIsCapsLockOn && <InputInfo />}
		</div>
	);
};

export default PasswordInput;
