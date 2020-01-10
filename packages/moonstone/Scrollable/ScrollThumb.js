import {ScrollThumb as UiScrollThumb} from '@enact/ui/Scrollable/Scrollbar';
import PropTypes from 'prop-types';
import React, {useEffect, forwardRef} from 'react';

const nop = () => {};

/**
 * A Moonstone-styled scroll thumb with moonstone behavior
 *
 * @function ScrollThumb
 * @memberof moonstone/Scrollable
 * @extends ui/Scrollable/ScrollThumb
 * @ui
 * @private
 */
const ScrollThumb = forwardRef((props, ref) => {
	const rest = Object.assign({}, props);
	delete rest.cbAlertThumb;

	useEffect (() => {
		props.cbAlertThumb();
	});

	return <UiScrollThumb {...rest} ref={ref} />;
});

ScrollThumb.displayName = 'ScrollThumb';

ScrollThumb.propTypes = /** @lends moonstone/Scrollable.ScrollThumb.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link moonstone/Scrollable.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func
};

ScrollThumb.defaultProps = {
	cbAlertThumb: nop
};

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
