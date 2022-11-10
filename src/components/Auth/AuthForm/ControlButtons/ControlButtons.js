import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../../../store/auth-slice';

import cssStyle from './ControlButtons.module.css';

const ControlButtons = (props) => {
	const dispatch = useDispatch();

	const { isLoginFormDisplayed } = useSelector((state) => state.auth);

	const switchAuthModeHandler = () => {
		dispatch(authActions.toggleIsLoginFormDisplayed());
	};

	let isFormValid = false;
	if (props.emailIsValid && props.passwordIsValid) isFormValid = true;

	return (
		<div className={cssStyle.actions}>
			<button disabled={!isFormValid}>
				{isLoginFormDisplayed ? 'Login' : 'Register'}
			</button>
			<button
				type='button'
				className={cssStyle.toggle}
				onClick={switchAuthModeHandler}
			>
				{isLoginFormDisplayed
					? 'Create new account'
					: 'Login with existing account'}
			</button>
		</div>
	);
};

export default ControlButtons;
