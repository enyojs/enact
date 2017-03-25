/**
 * Exports the {@link moonstone/RadioItem.RadioItem} component.
 *
 * @module moonstone/RadioItem
 */

import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';
import Toggleable from '@enact/ui/Toggleable';

import {ToggleItemBase} from '../ToggleItem';

import css from './RadioItem.less';

/**
 * {@link moonstone/RadioItem.RadioItem} is a component that
 * combines a Toggleable radio selector and an Item. It has two selected states
 * `true` & `false`.
 *
 * @class RadioItemBase
 * @memberof moonstone/RadioItem
 * @ui
 * @public
 */
const RadioItemBase = kind({
	name: 'RadioItem',

	propTypes: /** @lends moonstone/RadioItem.RadioItemBase.prototype */ {
		/**
		 * The string to be displayed as the main content of the radio item.
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.string.isRequired,

		/**
		 * Applies a disabled visual state to the radio item.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Applies inline styling to the radio item.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		inline: PropTypes.bool,

		/**
		 * The handler to run when the radio item is toggled.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @param {String} event.selected - Selected value of item.
		 * @param {*} event.value - Value passed from `value` prop.
		 * @public
		 */
		onToggle: PropTypes.func,

		/**
		 * Applies a filled circle icon to the radio item.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The value that will be sent to the `onToggle` handler.
		 *
		 * @type {*}
		 * @default ''
		 * @public
		 */
		value: PropTypes.any
	},

	defaultProps: {
		disabled: false,
		inline: false,
		value: ''
	},

	styles: {
		css,
		className: 'radioItem'
	},

	computed: {
		icon: ({selected, styler}) => {
			const className = styler.join(css.dot, {selected});

			return (
				<div className={className} />
			);
		}
	},

	render: (props) => (
		<ToggleItemBase {...props} />
	)
});


/**
 * {@link moonstone/RadioItem.RadioItem} is a component that combines a
 * {@link ui/Toggleable.Toggleable} radio selector and an Item. It has two selected states `true` &
 * `false`.
 *
 * @class RadioItem
 * @memberof moonstone/RadioItem
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */
const RadioItem = Toggleable(
	{prop: 'selected'},
	RadioItemBase
);

export default RadioItem;
export {RadioItem, RadioItemBase};
