import { useReducer } from 'react';
import { checkvalidity } from '../utils/checkValidity';

const ACTIONS = {
	USER_INPUT: 'USER_INPUT',
	USER_BLUR: 'USER_BLUR',
	USER_RESET: 'USER_RESET',
};

export function useInput(pattern, initialValue) {
	const inputReducer = (state, action) => {
		switch (action.type) {
			case ACTIONS.USER_INPUT:
				return {
					value: action.value,
					isValid: state,
					// isValid: checkvalidity(action.value, pattern),
					isTouched: true,
				};

			case ACTIONS.USER_BLUR:
				return {
					value: state.value,
					isValid: checkvalidity(state.value, pattern),
					isTouched: true,
				};

			case ACTIONS.USER_RESET:
				return {
					value: '',
					isValid: null,
					isTouchedfalse: false,
				};

			default:
				return { value: '', isValid: false, isTouched: false };
		}
	};

	const [inputState, dispatchInput] = useReducer(inputReducer, {
		value: initialValue,
		isValid: false,
		isTouched: false,
	});

	const inputChangeHandler = ({ target }) => {
		dispatchInput({ type: ACTIONS.USER_INPUT, value: target.value });
	};

	const inputBlurHandler = () => {
		dispatchInput({ type: ACTIONS.USER_BLUR });
	};

	const inputReset = () => {
		dispatchInput({ type: ACTIONS.USER_RESET });
	};

	return {
		inputState,
		inputChangeHandler,
		inputBlurHandler,
		inputReset,
	};
}
