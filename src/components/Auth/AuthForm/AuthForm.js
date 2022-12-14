import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
	FIREBASE_SIGN_IN_URL,
	FIREBASE_SIGN_UP_URL,
} from '../../../constants/firebase';

import { authentication } from '../../../api/authentication/authentication';

import TitleForm from './TitleForm/TitleForm';
import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import ControlButtons from './ControlButtons/ControlButtons';
import { useInput } from '../../../hooks/useAuthInput/useInput';
import { usePasswordInput } from '../../../hooks/useAuthInput/usePasswordInput';

import cssStyle from './AuthForm.module.css';
import AuthError from './AuthError/AuthError';
import Card from '../../UI/Card/Card';
import { authActions } from '../../../store/auth-slice';
import { useEffect } from 'react';

const AuthForm = () => {
	const dispatch = useDispatch();
	const { isLoginFormDisplayed, error } = useSelector((state) => state.auth);

	/* eslint-disable no-useless-escape */
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {
		inputState: emailState,
		inputChangeHandler: emailChangeHandler,
		inputKeyDownHandler: emailKeyDownHandler,
		inputReset: emailReset,
	} = useInput(emailRegex, '');
	// miruna@yahoo.com

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		isTouched: emailIsTouched,
		isCapsLockOn: emailIsCapsLockOn,
	} = emailState;

	const passwordRegex = {
		minLength: /.{8,}/,
		lowerCaseLetters: /[a-z]/g,
		uperCaseLetters: /[A-Z]/,
		numbers: /[0-9]/g,
		specialChars: /[@$!%*#?&]/,
	};

	const {
		inputState: passwordState,
		inputChangeHandler: passwordChangeHandler,
		inputKeyDownHandler: passwordKeyDownHandler,
		inputReset: passwordReset,
	} = usePasswordInput(passwordRegex, '');
	// Password1!

	const {
		value: enteredPasssword,
		isValid: passwordIsValid,
		isTouched: passwordIsTouched,
		isCapsLockOn: passwordIsCapsLockOn,
	} = passwordState;

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

	const submitHandler = (e) => {
		e.preventDefault();

		if (!emailIsValid || !passwordIsFullValid) return;

		let URL;
		isLoginFormDisplayed
			? (URL = FIREBASE_SIGN_IN_URL)
			: (URL = FIREBASE_SIGN_UP_URL);

		dispatch(authentication(URL, enteredEmail, enteredPasssword));

		if (!emailIsValid) emailReset();
		if (!passwordIsFullValid) passwordReset();
	};

	useEffect(() => {
		return () => error && dispatch(authActions.clearAuthError());
	}, [dispatch]);

	return (
		<Card className={cssStyle.auth}>
			<form onSubmit={submitHandler}>
				<TitleForm />
				<EmailInput
					emailState={emailState}
					emailChangeHandler={emailChangeHandler}
					emailKeyDownHandler={emailKeyDownHandler}
					emailIsValid={emailIsValid}
					emailIsTouched={emailIsTouched}
					emailIsCapsLockOn={emailIsCapsLockOn}
				/>
				<PasswordInput
					passwordState={passwordState}
					passwordChangeHandler={passwordChangeHandler}
					passwordKeyDownHandler={passwordKeyDownHandler}
					passwordIsValid={passwordIsValid}
					passwordIsTouched={passwordIsTouched}
					passwordIsCapsLockOn={passwordIsCapsLockOn}
					isLogIn={isLoginFormDisplayed}
				/>
				{error && <AuthError error={error} />}

				<ControlButtons
					emailIsValid={emailIsValid && emailIsTouched}
					passwordIsValid={passwordIsFullValid && passwordIsTouched}
				/>
			</form>
		</Card>
	);
};

export default AuthForm;
