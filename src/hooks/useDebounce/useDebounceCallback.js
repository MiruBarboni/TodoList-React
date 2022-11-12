import { useEffect, useRef, useState } from 'react';

export function useDebounceCallback(initialValue, delay, callback) {
	const [debouncedValue, setDebouncedValue] = useState(initialValue);

	const firstUpdate = useRef(true);
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		} else {
			const timeout = setTimeout(() => {
				callback(debouncedValue);
			}, delay);
			return () => clearTimeout(timeout);
		}
	}, [debouncedValue, delay, callback]);

	return [debouncedValue, setDebouncedValue];
}
