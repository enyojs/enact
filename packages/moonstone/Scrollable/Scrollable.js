/**
 * Provides Moonstone-themed scrollable components and behaviors.
 *
 * @module moonstone/Scrollable
 * @exports Scrollable
 * @private
 */

import platform from '@enact/core/platform';

import {useScrollable} from '@enact/ui/Scrollable';
import {useChildAdapter as useUiChildAdapter} from '@enact/ui/Scrollable/useChildAdapter';
import useDecorateChildProps from '@enact/ui/Scrollable/useDecorateChildProps';
import useScrollableAdapter from '@enact/ui/Scrollable/useScrollableAdapter';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';

import $L from '../internal/$L';

import useChildAdapter from './useChildAdapter';
import {dataIndexAttribute, useSpottable} from './useSpottable';

import overscrollCss from './OverscrollEffect.module.less';

/**
 * A Moonstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @function ScrollableBase
 * @memberof moonstone/Scrollable
 * @extends ui/Scrollable.ScrollableBase
 * @ui
 * @public
 */
const useScrollableComponentizable = (props) => {
	const {
		childRenderer,
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		focusableScrollbar,
		preventBubblingOnKeyDown,
		scrollDownAriaLabel,
		scrollLeftAriaLabel,
		scrollRightAriaLabel,
		scrollUpAriaLabel,
		type,
		...rest
	} = props;

	// Refs

	const scrollableContainerRef = useRef();
	const childContainerRef = useRef();

	const overscrollRefs = {
		horizontal: React.useRef(),
		vertical: React.useRef()
	};

	const horizontalScrollbarRef = useRef();
	const verticalScrollbarRef = useRef();

	// Adapters

	const [childAdapter, setChildAdapter] = useChildAdapter();

	const [uiScrollableAdapter, setUiScrollableAdapter] = useScrollableAdapter();

	const [uiChildAdapter, setUiChildAdapter] = useUiChildAdapter();

	// Hooks

	const instance = {
		// Ref
		scrollableContainerRef,
		childContainerRef,
		overscrollRefs,
		horizontalScrollbarRef,
		verticalScrollbarRef,

		// Adapter
		childAdapter,
		uiScrollableAdapter,
		uiChildAdapter
	};

	const
		decoratedChildProps = {},
		decorateChildProps = useDecorateChildProps(decoratedChildProps);

	const {
		addEventListeners,
		applyOverscrollEffect,
		clearOverscrollEffect,
		handleFlick,
		handleKeyDown,
		handleMouseDown,
		handleResizeWindow,
		handleScroll,
		handleScrollerUpdate,
		handleTouchStart,
		handleWheel,
		removeEventListeners,
		scrollAndFocusScrollbarButton,
		scrollbarProps,
		scrollStopOnScroll, // Native
		scrollTo,
		start, // Native
		stop // JS
	} = useSpottable(props, instance, {type});

	// Render

	const
		downButtonAriaLabel = scrollDownAriaLabel == null ? $L('scroll down') : scrollDownAriaLabel,
		upButtonAriaLabel = scrollUpAriaLabel == null ? $L('scroll up') : scrollUpAriaLabel,
		rightButtonAriaLabel = scrollRightAriaLabel == null ? $L('scroll right') : scrollRightAriaLabel,
		leftButtonAriaLabel = scrollLeftAriaLabel == null ? $L('scroll left') : scrollLeftAriaLabel,
		scrollableBaseProp = {};

	if (type === 'JS') {
		scrollableBaseProp.stop = stop;
	} else {
		scrollableBaseProp.scrollStopOnScroll = scrollStopOnScroll;
		scrollableBaseProp.start = start;
	}

	decorateChildProps('scrollableContainerProps', {
		className: [overscrollCss.scrollable],
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		onTouchStart: handleTouchStart
	});

	decorateChildProps('flexLayoutProps', {
		className: [overscrollCss.overscrollFrame, overscrollCss.vertical]
	});

	decorateChildProps('childWrapperProps', {
		className: [overscrollCss.overscrollFrame, overscrollCss.horizontal]
	});

	decorateChildProps('childProps', {
		onUpdate: handleScrollerUpdate,
		scrollAndFocusScrollbarButton,
		setChildAdapter,
		spotlightId,
		uiScrollableAdapter,
	});

	decorateChildProps('verticalScrollbarProps', {
		...scrollbarProps,
		focusableScrollButtons: focusableScrollbar,
		nextButtonAriaLabel: downButtonAriaLabel,
		onKeyDownButton: handleKeyDown,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel: upButtonAriaLabel
	});

	decorateChildProps('horizontalScrollbarProps', {
		...scrollbarProps,
		focusableScrollButtons: focusableScrollbar,
		nextButtonAriaLabel: rightButtonAriaLabel,
		onKeyDownButton: handleKeyDown,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel: leftButtonAriaLabel
	});

	const {
		childWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	} = useScrollable({
		...rest,
		...scrollableBaseProp,
		decorateChildProps,
		noScrollByDrag: !platform.touchscreen,
		addEventListeners: addEventListeners,
		applyOverscrollEffect: applyOverscrollEffect,
		clearOverscrollEffect: clearOverscrollEffect,
		handleResizeWindow: handleResizeWindow,
		horizontalScrollbarRef,
		onFlick: handleFlick,
		onKeyDown: handleKeyDown,
		onMouseDown: handleMouseDown,
		onScroll: handleScroll,
		onWheel: handleWheel,
		removeEventListeners,
		scrollableContainerRef,
		scrollTo: scrollTo,
		setUiChildAdapter,
		setUiScrollableAdapter,
		type,
		uiChildAdapter,
		verticalScrollbarRef
	});

	decorateChildProps('flexLayoutProps', {
		className: [...(isHorizontalScrollbarVisible ? overscrollCss.horizontalScrollbarVisible : [])]
	});

	decorateChildProps('scrollableContainerProps', {ref: scrollableContainerRef});
	decorateChildProps('flexLayoutProps', {ref: scrollableContainerRef});
	decorateChildProps('childWrapperProps', {ref: overscrollRefs.vertical});
	decorateChildProps('childProps', {uiChildAdapter: uiChildAdapter});
	decorateChildProps('verticalScrollbarProps', {ref: verticalScrollbarRef});
	decorateChildProps('horizontalScrollbarProp', {ref: horizontalScrollbarRef});

	return {
		...decoratedChildProps,
		childWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	};
};

const ScrollableBase = {};

ScrollableBase.displayName = 'Scrollable';

ScrollableBase.propTypes = /** @lends moonstone/Scrollable.Scrollable.prototype */ {
	/**
	 * Render function.
	 *
	 * @type {Function}
	 * @required
	 * @private
	 */
	childRenderer: PropTypes.func.isRequired,

	/**
	 * This is set to `true` by SpotlightContainerDecorator
	 *
	 * @type {Boolean}
	 * @private
	 */
	'data-spotlight-container': PropTypes.bool,

	/**
	 * `false` if the content of the list or the scroller could get focus
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	'data-spotlight-container-disabled': PropTypes.bool,

	/**
	 * This is passed onto the wrapped component to allow
	 * it to customize the spotlight container for its use case.
	 *
	 * @type {String}
	 * @private
	 */
	'data-spotlight-id': PropTypes.string,

	/**
	 * Direction of the list or the scroller.
	 * `'both'` could be only used for[Scroller]{@link moonstone/Scroller.Scroller}.
	 *
	 * Valid values are:
	 * * `'both'`,
	 * * `'horizontal'`, and
	 * * `'vertical'`.
	 *
	 * @type {String}
	 * @private
	 */
	direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

	/**
	 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
	 * not move focus to the scrollbar controls.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	focusableScrollbar: PropTypes.bool,

	/**
	 * A unique identifier for the scrollable component.
	 *
	 * When specified and when the scrollable is within a SharedStateDecorator, the scroll
	 * position will be shared and restored on mount if the component is destroyed and
	 * recreated.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {
	 *	arrowKey: false,
	 *	drag: false,
	 *	pageKey: false,
	 *	scrollbarButton: false,
	 *	wheel: true
	 * }
	 * @private
	 */
	overscrollEffectOn: PropTypes.shape({
		arrowKey: PropTypes.bool,
		drag: PropTypes.bool,
		pageKey: PropTypes.bool,
		scrollbarButton: PropTypes.bool,
		wheel: PropTypes.bool
	}),

	/**
	 * Specifies preventing keydown events from bubbling up to applications.
	 * Valid values are `'none'`, and `'programmatic'`.
	 *
	 * When it is `'none'`, every keydown event is bubbled.
	 * When it is `'programmatic'`, an event bubbling is not allowed for a keydown input
	 * which invokes programmatic spotlight moving.
	 *
	 * @type {String}
	 * @default 'none'
	 * @private
	 */
	preventBubblingOnKeyDown: PropTypes.oneOf(['none', 'programmatic']),

	/**
	 * Sets the hint string read when focusing the next button in the vertical scroll bar.
	 *
	 * @type {String}
	 * @default $L('scroll down')
	 * @public
	 */
	scrollDownAriaLabel: PropTypes.string,

	/**
	 * Sets the hint string read when focusing the previous button in the horizontal scroll bar.
	 *
	 * @type {String}
	 * @default $L('scroll left')
	 * @public
	 */
	scrollLeftAriaLabel: PropTypes.string,

	/**
	 * Sets the hint string read when focusing the next button in the horizontal scroll bar.
	 *
	 * @type {String}
	 * @default $L('scroll right')
	 * @public
	 */
	scrollRightAriaLabel: PropTypes.string,

	/**
	 * Sets the hint string read when focusing the previous button in the vertical scroll bar.
	 *
	 * @type {String}
	 * @default $L('scroll up')
	 * @public
	 */
	scrollUpAriaLabel: PropTypes.string,

	/**
	 * TBD
	 */
	type: PropTypes.string
};

ScrollableBase.defaultProps = {
	'data-spotlight-container-disabled': false,
	focusableScrollbar: false,
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		scrollbarButton: false,
		wheel: true
	},
	preventBubblingOnKeyDown: 'none',
	type: 'JS'
};

/**
 * A Moonstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class Scrollable
 * @memberof moonstone/Scrollable
 * @mixes spotlight/SpotlightContainerDecorator
 * @extends moonstone/Scrollable.ScrollableBase
 * @ui
 * @public
 */
const Scrollable = {};

export default Scrollable;
export {
	dataIndexAttribute,
	ScrollableBase as Scrollable,
	ScrollableBase,
	useScrollableComponentizable
};
