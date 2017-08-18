import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * {@link moonstone/MoonstoneDecorator.AccessibilityDecorator} is a Higher-order Component that
 * classifies an application with a target set of font sizing rules
 *
 * @class AccessibilityDecorator
 * @memberof moonstone/MoonstoneDecorator
 * @hoc
 * @public
 */
const AccessibilityDecorator = hoc((config, Wrapped) => kind({
	name: 'AccessibilityDecorator',

	propTypes: /** @lends moonstone/MoonstoneDecorator.AccessibilityDecorator.prototype */ {
		/**
		 * Set the goal size of the text. The UI library will be responsible for using this
		 * information to adjust the components' text sizes to this preset.
		 * Current presets are `'normal'` (default), and `'large'`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		highContrast: PropTypes.bool,

		/**
		 * Set the goal size of the text. The UI library will be responsible for using this
		 * information to adjust the components' text sizes to this preset.
		 * Current presets are `'normal'` (default), and `'large'`.
		 *
		 * @type {String}
		 * @default 'normal'
		 * @public
		 */
		textSize: PropTypes.oneOf(['normal', 'large'])
	},

	defaultProps: {
		highContrast: false,
		textSize: 'normal'
	},

	styles: {},	// Empty `styles` tells `kind` that we want to use `styler` later and don't have a base className.

	computed: {
		className: ({textSize, styler}) => styler.append({
			['enact-a11y-high-contrast']: config.highContrast,
			['enact-text-' + (config.textSize || textSize)]: config.textSize || textSize
		})
	},

	render: (props) => {
		delete props.highContrast;
		delete props.textSize;
		return (
			<Wrapped {...props} />
		);
	}
}));

export default AccessibilityDecorator;
export {AccessibilityDecorator};
