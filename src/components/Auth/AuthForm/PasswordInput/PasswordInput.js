import React from 'react';
import { useState } from 'react';

import cssStyle from '../ControlInput.module.css';
import cssStyle2 from './PasswordInput.module.css';

import VisibilityIcon from './VisibilityIcon/VisibilityIcon';

const PasswordInput = (props) => {
	const isPasswordINVALID = props.passwordIsTouched && !props.passwordIsValid;
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
				/>
				{props.passwordIsTouched && (
					<VisibilityIcon
						onShowPassword={showPasswordHandler}
						showPassword={showPassword}
					/>
				)}
			</div>

			{isPasswordINVALID && (
				<p className={cssStyle.errorText}>Password is invalid</p>
			)}
		</div>
	);
};

export default PasswordInput;
