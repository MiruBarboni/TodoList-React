import { useReducer } from 'react';
import { checkvalidity } from '../utils/checkValidity';
import { useDebounceInput } from './useDebounceValue';

const ACTIONS = {
	USER_INPUT: 'USER_INPUT',
	USER_BLUR: 'USER_BLUR',
	USER_RESET: 'USER_RESET',
	VALIDATE_INPUT: 'VALIDATE_INPUT',
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
				};

			case ACTIONS.VALIDATE_INPUT: {
				return {
					...state,
					isTouched: true,
					isValid: checkvalidity(state.value, pattern),
				};
			}

			default:
				return { value: '', isValid: true, isTouched: false };
		}
	};

	const [inputState, dispatchInput] = useReducer(inputReducer, {
		value: initialValue,
		isValid: true,
		isTouched: false,
	});
	const dispatchCallback = () =>
		dispatchInput({ type: ACTIONS.VALIDATE_INPUT });
	useDebounceInput(inputState.value, dispatchCallback, 1000);

	const inputChangeHandler = ({ target }) => {
		dispatchInput({ type: ACTIONS.USER_INPUT, value: target.value });
	};

	const inputReset = () => {
		dispatchInput({ type: ACTIONS.USER_RESET });
	};

	return {
		inputState,
		inputChangeHandler,
		inputReset,
	};
}
