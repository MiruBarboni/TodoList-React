import React from 'react';
import { useState } from 'react';

import InputInfo from '../InputInfo/InputInfo';
import VisibilityIcon from './VisibilityIcon/VisibilityIcon';

import cssStyle from '../ControlInput.module.css';
import cssStyle2 from './PasswordInput.module.css';
import PasswordConditions from './PasswordConditions/PasswordConditions';
import ForgotPasswordBtn from './ForgotPasswordBtn/ForgotPasswordBtn';

const PasswordInput = ({ passwordIsValid, passwordIsTouched, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		minLength: minLengthVal,
		upperCaseL: upperCaseLVal,
		lowerCaseL: lowerCaseLVal,
		nums: numsVal,
		specialChars: specialCharsVal,
	} = passwordIsValid;

	const passwordIsFullValid =
		minLengthVal &&
		upperCaseLVal &&
		lowerCaseLVal &&
		numsVal &&
		specialCharsVal;

	const isPasswordINVALID = passwordIsTouched && !passwordIsFullValid;

	const passwordInputClasses = isPasswordINVALID
		? `${cssStyle.control} ${cssStyle.invalid}`
		: `${cssStyle.control}`;

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

			{passwordIsTouched &&
				(props.isLogIn ? (
					<p className={cssStyle.errorText}>
						Password is invalid.It must contain at least 8 characters, 1
						uppercase, 1 number and 1 special character.
					</p>
				) : (
					<PasswordConditions passwordIsValid={passwordIsValid} />
				))}

			{props.passwordIsCapsLockOn && <InputInfo />}

			<ForgotPasswordBtn />
		</div>
	);
};

export default PasswordInput;
