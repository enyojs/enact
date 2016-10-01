import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';

import Item from '../Item';
import Icon from '../Icon';

import css from './ToggleItem.less';

const ToggleItemBase = kind({
	name: 'ToggleItem',

	propTypes: {
		/**
		 * The string value to be displayed as the main content of the toggle item.
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.string.isRequired,

		/**
		 * Applies a "checked" visual state to the radio item.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		checked: PropTypes.bool,

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
		 * @default () => {}
		 * @public
		 */
		onToggle: PropTypes.func,

		/**
		 * The value that will be sent to the `onToggle` handler.
		 *
		 * @type {String|Number}
		 * @default ''
		 * @public
		 */
		value: PropTypes.any
	},

	defaultProps: {
		checked: false,
		disabled: false,
		inline: false,
		onToggle: () => {},
		value: ''
	},

	styles: {
		css,
		className: 'toggleItem'
	},

	computed: {
		className: ({inline, styler}) => styler.append({inline}),
		icon: ({checked, icon, iconClasses, styler}) => {
			if (React.isValidElement(icon)) {
				return icon;
			}

			return <Icon className={styler.join(css.icon, iconClasses, {checked})}>{icon}</Icon>;
		},
		onToggle: ({onToggle, onClick, checked, value}) => {
			if (onToggle || onClick) {
				return (ev) => {
					if (onToggle) onToggle({checked: !checked, value});
					if (onClick) onClick(ev);
				};
			}
		}
	},

	render: ({children, icon, onToggle, ...rest}) => {
		delete rest.iconClasses;
		delete rest.inline;

		return (
			<Item {...rest} onClick={onToggle}>
				{icon}
				{children}
			</Item>
		);
	}
});

export default ToggleItemBase;
export {ToggleItemBase as ToggleItem, ToggleItemBase};
