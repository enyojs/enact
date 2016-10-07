import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';

import Button from '../Button';

import css from './ToggleButton.less';

/**
* {@link module:moonstone/Button~Button} is an {@link module:enyo/Button~Button} with Moonstone styling applied.
* The color of the button may be customized by specifying a background color.
*
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class Button
* @extends module:enyo/Button~Button
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
const ToggleButtonBase = kind({

	propTypes: {
		...Button.propTypes,
		// overriding isRequired for children since it may be generated by ToggleButton
		children: PropTypes.node,

		/**
		* Boolean indicating whether toggle button is currently in the 'on' state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		selected: PropTypes.bool, // This is overlap from button

		/**
		* Button text displayed in the 'off' state. If not specified, the
		* [content]{@link module:enyo/Control~Control#content} property will be used as button text.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		toggleOffLabel: PropTypes.string,

		/**
		* Button text displayed in the 'on' state. If not specified, the
		* [content]{@link module:enyo/Control~Control#content} property will be used as button text.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		toggleOnLabel: PropTypes.string
	},

	defaultProps: {
		...Button.defaultProps,
		toggleOffLabel: '',
		toggleOnLabel: '',
		selected: false
	},

	styles: {
		css,
		className: 'toggleButton'
	},

	computed: {
		className: ({selected, small, styler}) => styler.append({selected, small}),
		children: ({children, selected, toggleOnLabel, toggleOffLabel}) => {
			let c;
			if (!toggleOnLabel || !toggleOffLabel) {
				c = children;
			} else {
				c = selected ? toggleOnLabel : toggleOffLabel;
			}
			return c;
		}
	},

	render: (props) => {
		delete props.toggleOffLabel;
		delete props.toggleOnLabel;

		return (
			<Button {...props} />
		);
	}
});

export default ToggleButtonBase;
export {ToggleButtonBase as ToggleButton, ToggleButtonBase};
