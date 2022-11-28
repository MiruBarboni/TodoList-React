import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../../api/authentication/resetPassword';
import { useInput } from '../../../hooks/useAuthInput/useInput';
import Icon from '../../UI/GoogleFontsIcons/Icon';
import AuthError from '../AuthForm/AuthError/AuthError';
import EmailInput from '../AuthForm/EmailInput/EmailInput';
import Card from '../../UI/Card/Card.js';

import cssStyle from './LostPasswordForm.module.css';
import { authActions } from '../../../store/auth-slice';
import { useEffect } from 'react';
import SuccessNotification from './SuccessNotification/SuccessNotification';

const LostPasswordForm = () => {
	const dispatch = useDispatch();
	const { error, succeededMsg } = useSelector((state) => state.auth);

	/* eslint-disable no-useless-escape */
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {
		inputState: emailState,
		inputChangeHandler: emailChangeHandler,
		inputKeyDownHandler: emailKeyDownHandler,
	} = useInput(emailRegex, '');

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		isTouched: emailIsTouched,
		isCapsLockOn: emailIsCapsLockOn,
	} = emailState;

	const ResetPasswordHandler = (e) => {
		e.preventDefault();

		dispatch(resetPassword(enteredEmail));

		dispatch(authActions.clearAuthError());
		dispatch(authActions.clearSucceededMsg());
	};

	useEffect(() => {
		return () => error && dispatch(authActions.clearAuthError());
	}, [dispatch]);

	useEffect(() => {
		return () => succeededMsg && dispatch(authActions.clearSucceededMsg());
	}, [dispatch, succeededMsg]);

	let isFormValid = false;
	if (emailIsValid && emailIsTouched) isFormValid = true;

	return (
		<Card className={cssStyle.container}>
			<form onSubmit={ResetPasswordHandler}>
				<Icon className={cssStyle.keyIcon}>key</Icon>
				<h1>Password Lost ?</h1>
				{!succeededMsg && (
					<p className={cssStyle.infotext}>
						No worries, we'll send you reset instructions.
					</p>
				)}
				{!succeededMsg && (
					<EmailInput
						emailState={emailState}
						emailChangeHandler={emailChangeHandler}
						emailKeyDownHandler={emailKeyDownHandler}
						emailIsValid={emailIsValid}
						emailIsTouched={emailIsTouched}
						emailIsCapsLockOn={emailIsCapsLockOn}
					/>
				)}
				{error && <AuthError error={error} />}

				{succeededMsg && <SuccessNotification email={enteredEmail} />}

				<div className={cssStyle.actions}>
					{!succeededMsg && (
						<button
							disabled={!isFormValid}
							className={cssStyle.button}
							onClick={ResetPasswordHandler}
						>
							Reset password
						</button>
					)}

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
