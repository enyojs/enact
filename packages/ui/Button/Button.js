/**
 * Exports the {@link moonstone/Button.Button} and {@link moonstone/Button.ButtonBase}
 * components.  The default export is {@link moonstone/Button.Button}.
 *
 * @example
 * <Button small>Click me</Button>
 *
 * @module moonstone/Button
 */

import {forProp, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import Touchable from '../Touchable';

import componentCss from './Button.less';

/**
 * {@link moonstone/Button.ButtonBase} is a stateless Button with Moonstone styling
 * applied. In most circumstances, you will want to use the Touchable and Spottable version:
 * {@link moonstone/Button.Button}
 *
 * @class ButtonBase
 * @memberof moonstone/Button
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'Button',

	propTypes: /** @lends moonstone/Button.ButtonBase.prototype */ {
		children: PropTypes.node.isRequired,

		/**
		 * When `true`, the [button]{@glossary button} is shown as disabled and does not
		 * generate `onClick` [events]{@glossary event}.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Include an [icon]{@link moonstone/Icon.Icon} in your [button]{@link moonstone/Button.Button}.
		 * The icon will be displayed before the natural reading order of the text, regardless
		 * of locale. Any string that is valid for the `Icon` component is valid here. `icon` is
		 * outside the marqueeable content so it will not scroll along with the text content of
		 * your button. This also supports a custom icon, in the form of a DOM node or a
		 * Component, with the caveat that if you supply a custom icon, you are responsible for
		 * sizing and locale positioning of the custom component.
		 *
		 * @type {Node}
		 * @public
		 */
		icon: PropTypes.node,

		iconComponent: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.func
		]),

		/**
		 * A boolean parameter affecting the minimum width of the button. When `true`,
		 * the minimum width will be set to 180px (or 130px if [small]{@link moonstone/Button.Button#small}
		 * is `true`). If `false`, the minimum width will be set to the current value of
		 * `@moon-button-height` (thus forcing the button to be no smaller than a circle with
		 * diameter `@moon-button-height`).
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		minWidth: PropTypes.bool,

		/**
		 * When `true`, a pressed visual effect is applied to the button
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		pressed: PropTypes.bool,

		/**
		 * When `true`, a selected visual effect is applied to the button
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * A boolean parameter affecting the size of the button. If `true`, the
		 * button's diameter will be set to 60px. However, the button's tap target
		 * will still have a diameter of 78px, with an invisible DOM element
		 * wrapping the small button to provide the larger tap zone.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		small: PropTypes.bool
	},

	defaultProps: {
		disabled: false,
		iconComponent: 'span',
		minWidth: true,
		pressed: false,
		small: false
	},

	styles: {
		css: componentCss,
		className: 'button',
		publicClassNames: true
	},

	computed: {
		className: ({minWidth, pressed, selected, small, styler}) => styler.append({
			pressed,
			small,
			minWidth,
			selected
		}),
		icon: ({icon, iconComponent: Icon, small}) =>
			(typeof icon === 'string' ? <Icon small={small}>{icon}</Icon> : icon)
	},

	handlers: {
		onClick: handle(
			forProp('disabled', false),
			forward('onClick')
		)
	},

	render: ({children, css, disabled, icon, ...rest}) => {
		delete rest.iconComponent;
		delete rest.minWidth;
		delete rest.pressed;
		delete rest.selected;
		delete rest.small;

		return (
			<div role="button" {...rest} aria-disabled={disabled} disabled={disabled}>
				<div className={css.bg} />
				<div className={css.client}>{icon}{children}</div>
			</div>
		);
	}
});

const ButtonDecorator = Touchable({activeProp: 'pressed'});

const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
