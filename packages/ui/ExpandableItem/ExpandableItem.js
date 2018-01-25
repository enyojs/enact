/**
 * Provides unstyled expandable item components and behaviors to be customized by
 * a theme or application.
 *
 * @module ui/ExpandableItem
 * @exports ExpandableItem
 * @exports ExpandableItemBase
 */

import {extractAriaProps} from '@enact/core/util';
import kind from '@enact/core/kind';
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {Expandable, ExpandableTransitionContainer} from '../Expandable';

/**
 * {@link ui/ExpandableItem.ExpandableItemBase} is a stateless component that
 * renders a component that can be expanded to show additional contents.
 *
 * @class ExpandableItemBase
 * @memberof ui/ExpandableItem
 * @ui
 * @public
 */
const ExpandableItemBase = kind({
	name: 'ui:ExpandableItem',

	propTypes: /** @lends ui/ExpandableItem.ExpandableItemBase.prototype */ {
		/**
		 * The primary text of the item.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		text: PropTypes.string.isRequired,

		/**
		 * The contents of the expandable item displayed when `open` is `true`
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Specifies the height of the transition when `type` is set to `'clip'`.
		 *
		 * @type {Number}
		 * @default null
		 * @public
		 */
		clipHeight: PropTypes.number,

		/**
		 * The type of component to use to render the item. May be a DOM node name (e.g 'div',
		 * 'span', etc.) or a custom component.
		 *
		 * @type {Component}
		 * @default 'div'
		 * @public
		 */
		component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

		/**
		 * Sets the direction of transition. Where the component will move *to*; the destination.
		 * Supported directions are: `'up'`, `'right'`, `'down'`, `'left'`.
		 *
		 * @type {String}
		 * @default 'down'
		 * @public
		 */
		direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),

		/**
		 * Control how long the transition should take.
		 * Supported durations are: `'short'` (250ms), `'long'` (1s). `'medium'` (500ms) is default
		 * when no others are specified.
		 *
		 * @type {String}
		 * @default 'short'
		 * @public
		 */
		duration: PropTypes.oneOf(['short', 'medium', 'long']),

		/**
		 * When `true`, transition animation is disabled. When `false`, visibility changes animate.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Callback to be called when a condition occurs which should cause the expandable to close
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Callback to be called when the expandable closes
		 *
		 * @type {Function}
		 * @private
		 */
		onHide: PropTypes.func,

		/**
		 * Callback to be called when a condition occurs which should cause the expandable to open
		 *
		 * @type {Function}
		 * @public
		 */
		onOpen: PropTypes.func,

		/**
		 * Callback to be called when the expandable opens
		 *
		 * @type {Function}
		 * @private
		 */
		onShow: PropTypes.func,

		/**
		 * When `true`, the control is rendered in the expanded state, with the contents visible
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Customize the transition timing function.
		 * Supported function names are: `ease`, `ease-in`, `ease-out`, `ease-in-out`, `ease-in-quart`,
		 * `ease-out-quart`, and `linear`.
		 *
		 * @type {String}
		 * @default 'ease-out-quart'
		 * @public
		 */
		timingFunction: PropTypes.oneOf([
			'ease',
			'ease-in',
			'ease-out',
			'ease-in-out',
			'ease-in-quart',
			'ease-out-quart',
			'linear'
		]),

		/**
		 * Choose how you'd like the transition to affect the content.
		 * Supported types are: slide, clip, and fade.
		 *
		 * @type {String}
		 * @default 'clip'
		 * @public
		 */
		type: PropTypes.oneOf(['slide', 'clip', 'fade'])
	},

	defaultProps: {
		component: 'div',
		direction: 'down',
		open: false,
		timingFunction: 'ease-out-quart',
		type: 'clip'
	},

	handlers: {
		handleOpen: (ev, {onClose, onOpen, open}) => {
			if (open) {
				onClose(ev);
			} else {
				onOpen(ev);
			}
		}
	},

	render: ({
		component: Component,
		children,
		clipHeight,
		direction,
		duration,
		handleOpen,
		noAnimation,
		onHide,
		onShow,
		open,
		text,
		timingFunction,
		type,
		...rest
	}) => {
		delete rest.onClose;
		delete rest.onOpen;

		const ariaProps = extractAriaProps(rest);

		return (
			<Fragment>
				<Component
					{...ariaProps}
					{...rest}
					onClick={handleOpen}
				>
					{text}
				</Component>
				<ExpandableTransitionContainer
					clipHeight={clipHeight}
					direction={direction}
					duration={duration}
					noAnimation={noAnimation}
					onHide={onHide}
					onShow={onShow}
					timingFunction={timingFunction}
					type={type}
					visible={open}
				>
					{children}
				</ExpandableTransitionContainer>
			</Fragment>
		);
	}
});

/**
 * {@link ui/ExpandableItem.ExpandableItem} renders a component that can be expanded to show additional
 * contents.
 *
 * `ExpandableItem` maintains its open/closed state by default. The initial state can be supplied
 * using `defaultOpen`. In order to directly control the open/closed state, supply a value for
 * `open` at creation time and update its value in response to `onClose`/`onOpen` events.
 *
 * @class ExpandableItem
 * @memberof ui/ExpandableItem
 * @ui
 * @mixes ui/Expandable.Expandable
 * @public
 */
const ExpandableItem = Expandable(
	ExpandableItemBase
);

export default ExpandableItem;
export {
	ExpandableItem,
	ExpandableItemBase
};
