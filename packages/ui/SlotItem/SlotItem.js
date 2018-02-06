/**
 * Provides an unstyled item component that accepts multiple positions of children, using the usual
 * `children` prop, as well as two additional props: `overlayBefore`, and `overlayAfter`.
 * It is able to be customized by a theme or application.
 *
 * @module ui/SlotItem
 * @exports SlotItem
 * @exports SlotItemBase
 * @exports SlotItemDecorator
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import Slottable from '../Slottable';

import componentCss from './SlotItem.less';

/**
 * A ui-styled SlotItem without any behavior.
 *
 * @class SlotItemBase
 * @memberof ui/SlotItem
 * @ui
 * @public
 */
const SlotItemBase = kind({
	name: 'SlotItem',

	propTypes: /** @lends ui/SlotItem.SlotItemBase.prototype */ {
		/**
		 * The type of component to use to render the item. Must be a custom component as it needs
		 * to accept the following props: `overlayBefore`, `overlayAfter`, and `css`.
		 * A derivitive of [Item]{@link ui/Item.Item} is recommended.
		 *
		 * @type {Component}
		 * @required
		 * @public
		 */
		component: PropTypes.func.isRequired,

		/**
		 * Controls the visibility state of the overlays. One, both, or neither overlay can be
		 * shown when the item is focused. Choosing `'after'` will leave `overlayBefore` visible
		 * at all times; only `overlayAfter` will have its visibility toggled on focus.  Valid
		 * values are `'before'`, `'after'` and `'both'`. Omitting the property will result in
		 * no-auto-hiding for either overlay. They will both be present regardless of focus.
		 *
		 * @type {Boolean}
		 * @public
		 */
		autoHide: PropTypes.node,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `slotItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'slotItem',
		publicClassNames: true
	},

	computed: {
		overlayBefore: ({overlayBefore, autoHide, styler}) => ( overlayBefore ?
			<div className={styler.join('overlay', 'before', {hidden: (autoHide === 'before' || autoHide === 'both')})}>
				{overlayBefore}
			</div> : null
		),
		overlayAfter: ({overlayAfter, autoHide, styler}) => ( overlayAfter ?
			<div className={styler.join('overlay', 'after', {hidden: (autoHide === 'after' || autoHide === 'both')})}>
				{overlayAfter}
			</div> : null
		)
	},

	render: ({component: Component, css, ...rest}) => {
		delete rest.autoHide;
		return (
			<Component
				{...rest}
				css={css}
			/>
		);
	}
});

/**
 * ui-specific item with overlay behaviors to apply to [SlotItem]{@link ui/SlotItem.SlotItemBase}.
 *
 * @class SlotItemDecorator
 * @memberof ui/SlotItem
 * @mixes ui/Slottable.Slottable
 * @hoc
 * @public
 */
const SlotItemDecorator = Slottable({slots: ['overlayAfter', 'overlayBefore']});

/**
 * A ui-styled item with built-in support for overlays.
 *
 * ```
 *	<SlotItem autoHide="both">
 *		<overlayBefore>
 *			<Icon>flag</Icon>
 *			<Icon>star</Icon>
 *		</overlayBefore>
 *		An Item that will show some icons before and after this text when spotted
 *		<Icon slot="overlayAfter">trash</Icon>
 *	</SlotItem>
 * ```
 *
 * @class SlotItem
 * @memberof ui/SlotItem
 * @extends ui/SlotItem.SlotItemBase
 * @mixes ui/SlotItem.SlotItemDecorator
 * @ui
 * @public
 */
const SlotItem = SlotItemDecorator(SlotItemBase);

export default SlotItem;
export {
	SlotItem,
	SlotItemBase,
	SlotItemDecorator
};
