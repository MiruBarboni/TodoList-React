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
import { useEmailInput } from '../../../hooks/useAuthInput/useEmailInput';
import { usePasswordInput } from '../../../hooks/useAuthInput/usePasswordInput';

import cssStyle from './AuthForm.module.css';

const AuthForm = () => {
	const dispatch = useDispatch();

	/* eslint-disable no-useless-escape */
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {
		inputState: emailState,
		inputChangeHandler: emailChangeHandler,
		inputKeyDownHandler: emailKeyDownHandler,
		inputReset: emailReset,
	} = useEmailInput(emailRegex, '');

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

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		isTouched: emailIsTouched,
		isCapsLockOn: emailIsCapsLockOn,
	} = emailState;

	const {
		value: enteredPasssword,
		isValid: passwordIsValid,
		isTouched: passwordIsTouched,
		isCapsLockOn: passwordIsCapsLockOn,
	} = passwordState;

	const { isLoginFormDisplayed } = useSelector((state) => state.auth);

	const submitHandler = (e) => {
		e.preventDefault();

		emailReset();
		passwordReset();

		if (!emailIsValid || !passwordIsValid) return;

		let URL;
		isLoginFormDisplayed
			? (URL = FIREBASE_SIGN_IN_URL)
			: (URL = FIREBASE_SIGN_UP_URL);

		dispatch(authentication(URL, enteredEmail, enteredPasssword));
	};
	return (
		<section className={cssStyle.auth}>
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
				/>
				<ControlButtons
					emailIsValid={emailIsValid && emailIsTouched}
					passwordIsValid={passwordIsValid && passwordIsTouched}
				/>
			</form>
		</section>
	);
};

export default AuthForm;
