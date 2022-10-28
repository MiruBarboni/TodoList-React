import { useEffect } from 'react';

export function useOnClickOutside(ref, callbackFct) {
	useEffect(() => {
		const eventListener = (e) => {
			if (!ref.current || ref.current.contains(e.target)) {
				return;
			}

			callbackFct(e);
		};

		document.addEventListener('mousedown', eventListener);

		return () => {
			document.removeEventListener('mousedown', eventListener);
		};
	}, [ref, callbackFct]);
}
