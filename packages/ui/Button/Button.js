/**
 * Unstyled button components and behaviors to be customized by a theme or application.
 *
 * @module ui/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import ComponentOverride from '../ComponentOverride';
import Touchable from '../Touchable';

import componentCss from './Button.module.less';

/**
 * A basic button component structure without any behaviors applied to it.
 *
 * @class ButtonBase
 * @memberof ui/Button
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'ui:Button',

	propTypes: /** @lends ui/Button.ButtonBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `button` - The root component class
		 * * `bg` - The background node of the button
		 * * `client` - The content node of the button
		 * * `hasIcon` - Applied when there is an `icon` present
		 * * `icon` - The icon node, when `icon` is set
		 * * `large` - Applied when `size` prop is `'large'`
		 * * `minWidth` - Applied when `minWidth` prop is `true`
		 * * `pressed` - Applied when `pressed` prop is `true`
		 * * `selected` - Applied when `selected` prop is `true`
		 * * `small` - Applied when `size` prop is `'small'`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Additional DOM nodes which may be necessary for decorating the Button.
		 *
		 * @type {Node}
		 * @private
		 */
		decoration: PropTypes.node,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the button is shown as disabled.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The icon displayed within the Button.
		 *
		 * The icon will be displayed before the natural reading order of the text, regardless
		 * of locale. Any string that is valid for its {@link ui/Button.Button.iconComponent} is
		 * valid here. If `icon` is specified as a string and `iconButton` is undefined, the icon is
		 * not rendered.
		 *
		 * This also supports a custom icon, in the form of a DOM node or a Component,
		 * with the caveat that if you supply a custom icon, you are responsible for sizing and
		 * locale positioning of the custom component.
		 *
		 * Setting this to `true` means the `iconComponent` will be rendered but with empty content.
		 * This may be useful if you've customized the `iconComponent` to render the icon content
		 * externally.
		 *
		 * @type {Node|Boolean}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

		/**
		 * The component used to render the [icon]{@link ui/Button.ButtonBase.icon}.
		 *
		 * This component will receive the `icon` class to customize its styling.
		 * If [icon]{@link ui/Button.ButtonBase.icon} is not assigned or is false, this component
		 * will not be rendered.
		 *
		 * If this is a component rather than an HTML element string, this component will also
		 * receive the `size` property and should be configured to handle it.
		 *
		 * @type {Component|Node}
		 * @public
		 */
		iconComponent: EnactPropTypes.componentOverride,

		/**
		 * The icon component prop passed to the {@link ui/Button.Button.iconComponent} component as props.
		 *
		 * If [icon]{@link ui/Button.ButtonBase.icon} is not assigned or is false, the icon
		 * will not be rendered.
		 *
		 * @type {Object}
		 * @public
		 */
		iconProps: PropTypes.object,

		/**
		 * Enforces a minimum width for the component.
		 *
		 * Applies the `minWidth` CSS class which can be customized by
		 * [theming]{@link /docs/developer-guide/theming/}.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		minWidth: PropTypes.bool,

		/**
		 * Indicates the component is depressed.
		 *
		 * Applies the `pressed` CSS class which can be customized by
		 * [theming]{@link /docs/developer-guide/theming/}.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		pressed: PropTypes.bool,

		/**
		 * Indicates the component is selected.
		 *
		 * Applies the `selected` CSS class which can be customized by
		 * [theming]{@link /docs/developer-guide/theming/}.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * Applies the CSS class which can be customized by
		 * [theming]{@link /docs/developer-guide/theming/}.
		 *
		 * @type {String}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.string
	},

	defaultProps: {
		disabled: false,
		minWidth: true,
		pressed: false,
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'button',
		publicClassNames: true
	},

	computed: {
		className: ({icon, minWidth, pressed, selected, size, styler}) => styler.append({
			hasIcon: (!!icon),
			minWidth,
			pressed,
			selected
		}, size),
		icon: ({css, icon, iconComponent, iconProps, size}) => {
			if (icon == null || icon === false) return;

			// Establish the base collection of props for the moost basic `iconComponent` type, an
			// HTML element string.
			const props = {
				...iconProps,
				className: css.icon,
				component: iconComponent
			};

			// Add in additional props that any Component supplied to `iconComponent` should be
			// configured to handle.
			if (typeof iconComponent !== 'string') {
				props.size = size;
			}

			return (
				<ComponentOverride {...props}>
					{icon}
				</ComponentOverride>
			);
		}
	},

	render: ({children, css, decoration, disabled, icon, ...rest}) => {
		delete rest.iconComponent;
		delete rest.iconProps;
		delete rest.minWidth;
		delete rest.pressed;
		delete rest.selected;
		delete rest.size;

		return (
			<div role="button" {...rest} aria-disabled={disabled} disabled={disabled}>
				{decoration ? (
					<div className={css.decoration}>{decoration}</div>
				) : null}
				<div className={css.bg} />
				<div className={css.client}>{icon}{children}</div>
			</div>
		);
	}
});

/**
 * A higher-order component that adds touch support to a [ButtonBase]{@link ui/Button.ButtonBase}.
 *
 * @hoc
 * @memberof ui/Button
 * @mixes ui/Touchable.Touchable
 * @public
 */
const ButtonDecorator = Touchable({activeProp: 'pressed'});

/**
 * A minimally-styled button component with touch support.
 *
 * @class Button
 * @extends ui/Button.ButtonBase
 * @memberof ui/Button
 * @mixes ui/Button.ButtonDecorator
 * @ui
 * @public
 */
const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
