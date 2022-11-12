import { useCallback } from 'react';
import { useReducer } from 'react';
import { checkvalidity } from '../../utils/checkValidity';
import { useDebounceInput } from '../useDebounce/useDebounceInput';

const ACTIONS = {
	USER_INPUT: 'USER_INPUT',
	USER_BLUR: 'USER_BLUR',
	USER_RESET: 'USER_RESET',
	VALIDATE_INPUT: 'VALIDATE_INPUT',
	USER_KEYDOWN: 'USER_KEYDOWN',
};

export function usePasswordInput(pattern, initialValue) {
	const inputReducer = (state, action) => {
		switch (action.type) {
			case ACTIONS.USER_INPUT:
				return {
					...state,
					value: action.value,
				};

			case ACTIONS.USER_RESET:
				return {
					value: '',
					isValid: {
						minLength: true,
						upperCaseL: true,
						lowerCaseL: true,
						nums: true,
						specialChars: true,
					},
					isTouched: false,
					isCapsLockOn: false,
				};

			case ACTIONS.VALIDATE_INPUT: {
				return {
					...state,
					isTouched: true,
					isValid: {
						minLength: checkvalidity(state.value, pattern.minLength),
						upperCaseL: checkvalidity(state.value, pattern.uperCaseLetters),
						lowerCaseL: checkvalidity(state.value, pattern.lowerCaseLetters),
						nums: checkvalidity(state.value, pattern.numbers),
						specialChars: checkvalidity(state.value, pattern.specialChars),
					},
				};
			}
			case ACTIONS.USER_KEYDOWN: {
				return {
					...state,
					isCapsLockOn: action.value,
				};
			}

			default:
				return {
					value: '',
					isValid: {
						minLength: true,
						upperCaseL: true,
						lowerCaseL: true,
						nums: true,
						specialChars: true,
					},
					isTouched: false,
					isCapsLockOn: false,
				};
		}
	};

	const [inputState, dispatchInput] = useReducer(inputReducer, {
		value: initialValue,
		isValid: {
			minLength: true,
			upperCaseL: true,
			lowerCaseL: true,
			nums: true,
			specialChars: true,
		},
		isTouched: false,
		isCapsLockOn: false,
	});

	const dispatchCallback = useCallback(
		() => dispatchInput({ type: ACTIONS.VALIDATE_INPUT }),
		[dispatchInput]
	);
	useDebounceInput(inputState.value, dispatchCallback, 1000);

	const inputChangeHandler = ({ target }) => {
		dispatchInput({ type: ACTIONS.USER_INPUT, value: target.value });
	};

	const inputReset = () => {
		dispatchInput({ type: ACTIONS.USER_RESET });
	};

	const inputKeyDownHandler = (e) => {
		dispatchInput({
			type: ACTIONS.USER_KEYDOWN,
			value: e.getModifierState('CapsLock'),
		});
	};

	return {
		inputState,
		inputChangeHandler,
		inputReset,
		inputKeyDownHandler,
	};
}
