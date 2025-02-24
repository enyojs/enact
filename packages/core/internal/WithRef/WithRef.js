import {useId, useImperativeHandle, useRef} from 'react';

const WithRef = (WrappedComponent) => {
	const HoC = function (props) {
		const {['data-withref-id']: givenId, outermostRef, ref, referrerName, ...rest} = props;
		const divRef = useRef();
		const generatedId = useId();
		const id = givenId || generatedId;

		useImperativeHandle(outermostRef, () => {
			const refNode = divRef.current;
			const attributeSelector = `[data-withref-id="${refNode.getAttribute('data-withref-target')}"]`;
			/* The intended code is to search for the referrer element via a single querySelector call. But unit tests cannot handle :has() properly.
			const selector = `:scope ${attributeSelector}, :scope :has(${attributeSelector})`;
			return refNode?.parentElement?.querySelector(selector) || null;
			*/
			const targetNode = refNode?.parentElement?.querySelector(attributeSelector) || null;
			for (let current = targetNode; current; current = current.parentElement) {
				if (current?.parentElement === refNode?.parentElement) {
					return current;
				}
			}
			return null;
		}, []);

		return (
			<>
				<WrappedComponent {...rest} data-withref-id={id} ref={ref} />
				<div data-withref-target={id} data-withref-referrer={referrerName} ref={divRef} style={{display: 'none'}} />
			</>
		);
	};

	HoC.displayName = 'WithRef';

	return HoC;
};

export default WithRef;
export {WithRef};
