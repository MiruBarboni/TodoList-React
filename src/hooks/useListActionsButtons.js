import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from './useOnClickOutside';

export function useListActionsButtons(displayAction, hideAction) {
	const dispatch = useDispatch();
	const [state, setState] = useState(false);

	const openHandler = () => {
		setState(true);
		dispatch(displayAction());
	};

	const closeHandler = () => {
		setState(false);
		dispatch(hideAction());
	};

	const ref = useRef();
	useOnClickOutside(ref, closeHandler);

	return [state, openHandler, closeHandler, ref];
}
