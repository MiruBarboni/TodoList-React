import { useEffect } from 'react';

export function useDebounceInput(input, callback, delay) {
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (input !== '') callback();
		}, delay);
		return () => clearTimeout(timeout);
	}, [input, callback, delay]);
}
