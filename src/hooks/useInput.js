import { useCallback } from 'react';
import { useReducer } from 'react';
import { checkvalidity } from '../utils/checkValidity';
import { useDebounceInput } from './useDebounceValue';

const ACTIONS = {
	USER_INPUT: 'USER_INPUT',
	USER_BLUR: 'USER_BLUR',
	USER_RESET: 'USER_RESET',
	VALIDATE_INPUT: 'VALIDATE_INPUT',
	USER_KEYDOWN: 'USER_KEYDOWN',
};

export function useInput(pattern, initialValue) {
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
					isValid: true,
					isTouched: false,
					isCapsLockOn: false,
				};

			case ACTIONS.VALIDATE_INPUT: {
				return {
					...state,
					isTouched: true,
					isValid: checkvalidity(state.value, pattern),
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
					isValid: true,
					isTouched: false,
					isCapsLockOn: false,
				};
		}
	};

	const [inputState, dispatchInput] = useReducer(inputReducer, {
		value: initialValue,
		isValid: true,
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
