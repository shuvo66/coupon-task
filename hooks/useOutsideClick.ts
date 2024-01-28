import { MutableRefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
	ref: MutableRefObject<HTMLElement | null>,
	callback: (e: MouseEvent) => any,
) => {
	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current?.contains(e.target as Node)) {
				callback(e);
			}
		},
		[ref, callback],
	);

	useEffect(() => {
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [handleClick, ref]);
};
