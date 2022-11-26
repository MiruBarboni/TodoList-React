import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../../api/authentication/resetPassword';
import { useEmailInput } from '../../../hooks/useAuthInput/useEmailInput';
import Icon from '../../UI/GoogleFontsIcons/Icon';
import AuthError from '../AuthForm/AuthError/AuthError';
import EmailInput from '../AuthForm/EmailInput/EmailInput';
import Card from '../../UI/Card/Card.js';

import cssStyle from './LostPasswordForm.module.css';
import { authActions } from '../../../store/auth-slice';
import { useEffect } from 'react';

const LostPasswordForm = () => {
	const dispatch = useDispatch();
	const { error } = useSelector((state) => state.auth);

	/* eslint-disable no-useless-escape */
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {
		inputState: emailState,
		inputChangeHandler: emailChangeHandler,
		inputKeyDownHandler: emailKeyDownHandler,
	} = useEmailInput(emailRegex, '');

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		isTouched: emailIsTouched,
		isCapsLockOn: emailIsCapsLockOn,
	} = emailState;

	const ResetPasswordHandler = (e) => {
		e.preventDefault();

		dispatch(resetPassword(enteredEmail));
	};

	useEffect(() => {
		return () => error && dispatch(authActions.clearAuthError());
	}, [dispatch, error]);

	return (
		<Card className={cssStyle.container}>
			<form onSubmit={ResetPasswordHandler}>
				<Icon className={cssStyle.keyIcon}>key</Icon>
				<h1>Password Lost ?</h1>
				<p className={cssStyle.infotext}>
					No worries, we'll send you reset instructions.
				</p>
				<EmailInput
					emailState={emailState}
					emailChangeHandler={emailChangeHandler}
					emailKeyDownHandler={emailKeyDownHandler}
					emailIsValid={emailIsValid}
					emailIsTouched={emailIsTouched}
					emailIsCapsLockOn={emailIsCapsLockOn}
				/>
				{error && <AuthError error={error} />}
				<div className={cssStyle.actions}>
					<button className={cssStyle.button} onClick={ResetPasswordHandler}>
						Reset password
					</button>

					<Link to={'/auth'} className={cssStyle.link}>
						<div className={cssStyle.backContainer}>
							<Icon className={cssStyle.arrowBack}>arrow_back </Icon>
							<span> Go back to log in</span>
						</div>
					</Link>
				</div>
			</form>
		</Card>
	);
};

export default LostPasswordForm;
