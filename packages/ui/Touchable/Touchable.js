/**
 * Application support for gestures.
 *
 * @module ui/Touchable
 * @exports Touchable
 * @exports configure
 */

import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';

import {configure} from './config';

import {dragConfigPropType} from './Drag';
import {flickConfigPropType} from './Flick';
import {holdConfigPropType} from './Hold';
import {pinchConfigPropType} from './Pinch';
import useTouch from './useTouch';

const selectProps = (props) => {
	const {
		/* configs */
		dragConfig, flickConfig, holdConfig, pinchConfig,
		/* general props */
		disabled,
		noResume,
		/* events to be captured and forwarded by useTouch hook */
		onBlur,
		onClick,
		onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseUp,
		onTouchEnd, onTouchMove, onTouchStart,
		/* custom events to be forwarded by useTouch hook */
		onDown,
		onDrag, onDragEnd, onDragStart,
		onFlick,
		onHold, onHoldEnd, onHoldStart,
		onMove,
		onPinch, onPinchEnd, onPinchStart,
		onTap,
		onUp,
		/* rest */
		...rest
	} = props;

	return {
		configForHook: {
			/* configs */
			dragConfig, flickConfig, holdConfig, pinchConfig,
			/* general props */
			disabled,
			noResume,
			/* events to be captured and forwarded by useTouch hook */
			onBlur,
			onClick,
			onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseUp,
			onTouchEnd, onTouchMove, onTouchStart,
			/* custom events to be forwarded by useTouch hook */
			onDown,
			onDrag, onDragEnd, onDragStart,
			onFlick,
			onHold, onHoldEnd, onHoldStart,
			onMove,
			onPinch, onPinchEnd, onPinchStart,
			onTap,
			onUp
		},
		propsForWrapped: {
			disabled, // needed for both useTouch and the wrapped component
			...rest
		}
	};
};

/**
 * Default config for `Touchable`.
 *
 * @memberof ui/Touchable.Touchable
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * Configures the prop name to pass the active state to the wrapped component
	 *
	 * @type {String}
	 * @default null
	 * @memberof ui/Touchable.Touchable.defaultConfig
	 */
	activeProp: null
};

/**
 * A higher-order component that provides a consistent set of pointer events -- `onDown`, `onUp`,
 * and `onTap` -- across mouse and touch interfaces along with support for common gestures including
 * `onFlick`, `onDragStart`, `onDrag`, `onDragEnd`, `onHoldStart`, `onHold`, `onHoldEnd`,
 * `onPinchStart`, `onPinch`, and `onPinchEnd`.
 * Note: This HoC passes a number of props to the wrapped component that should be passed to the
 * main DOM node or consumed by the wrapped component.
 *
 * @class Touchable
 * @memberof ui/Touchable
 * @hoc
 * @public
 */
const Touchable = hoc(defaultConfig, (config, Wrapped) => {
	const {
		activeProp
	} = config;

	// eslint-disable-next-line no-shadow
	const Touchable = (props) => {
		const {disabled = false, noResume = false, ref, ...rest} = props;
		const {configForHook, propsForWrapped} = selectProps({disabled, noResume, ...rest});
		const hook = useTouch({getActive: !!activeProp, ...configForHook});

		Object.assign(propsForWrapped, hook.handlers);

		if (activeProp) {
			propsForWrapped[activeProp] = hook.active;
		}

		return (
			<Wrapped {...propsForWrapped} ref={ref} />
		);
	};

	Touchable.propTypes = {
		/**
		 * Disables the component.
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Instance-specific overrides of the drag configuration.
		 *
		 * @see {@link ui/Touchable.configure}
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Object}
		 * @public
		 */
		dragConfig: dragConfigPropType,

		/**
		 * Instance-specific overrides of the flick configuration.
		 *
		 * @see {@link ui/Touchable.configure}
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Object}
		 * @public
		 */
		flickConfig: flickConfigPropType,

		/**
		 * Instance-specific overrides of the hold configuration.
		 *
		 * @see {@link ui/Touchable.configure}
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Object}
		 * @public
		 */
		holdConfig: holdConfigPropType,

		/**
		 * Prevents resuming the touch events and gestures when re-entering the component.
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noResume: PropTypes.bool,

		/**
		 * Event handler for 'down' pointer events.
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onDown: PropTypes.func,

		/**
		 * Event handler for a drag gesture.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onDrag'`
		 * * `x` - Horizontal position of the drag, relative to the viewport
		 * * `y` - Vertical position of the drag, relative to the viewport
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onDrag: PropTypes.func,

		/**
		 * Event handler for the end of a drag gesture.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onDragEnd'`
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onDragEnd: PropTypes.func,

		/**
		 * Event handler for the start of a drag gesture.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onDragStart'`
		 * * `x` - Horizontal position of the drag, relative to the viewport
		 * * `y` - Vertical position of the drag, relative to the viewport
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onDragStart: PropTypes.func,

		/**
		 * Event handler for a flick gesture.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onFlick'`
		 * * `direction` - Primary direction of the flick, either `'horizontal'` or `'vertical'`
		 * * `velocity` - Velocity of flick
		 * * `velocityX` - Velocity of flick along te horizontal axis
		 * * `velocityY` - Velocity of flick along te vertical axis
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onFlick: PropTypes.func,

		/**
		 * Event handler for hold pulse events.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onHold'`
		 * * `time` - Time, in milliseconds, since the hold began
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onHold: PropTypes.func,

		/**
		 * Event handler for the end of hold events.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onHoldEnd'`
		 * * `time` - Time, in milliseconds, since the hold began
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onHoldEnd: PropTypes.func,

		/**
		 * Event handler for hold events.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onHoldStart'`
		 * * `name` - The name of the hold as configured in the events list
		 * * `time` - Time, in milliseconds, configured for this hold which may vary slightly
		 *            from time since the hold began
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onHoldStart: PropTypes.func,

		/**
		 * Event handler for 'move' pointer events.
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onMove: PropTypes.func,

		/**
		 * Event handler for a pinch gesture.
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onPinch'`
		 * * `scale` - The scale factor, calculated from the distance while pinching.
		 *             The default value is 1.0. The value would be a number between
		 *             pinchConfig.minScale and pinchConfig.maxScale.
		 * * `coords` - The coordinates array of the touch point, relative to the viewport
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onPinch: PropTypes.func,

		/**
		  * Event handler for the end of a pinch gesture.
		  *
		  * Event payload includes:
		  *
		  * * `type` - Type of event, `'onPinchEnd'`
		  *
		  * @memberof ui/Touchable.Touchable.prototype
		  * @type {Function}
		  * @public
		  */
		onPinchEnd: PropTypes.func,

		/**
		  * Event handler for the start of a pinch gesture.
		  *
		  * Event payload includes:
		  *
		  * * `type` - Type of event, `'onPinchStart'`
		  * * `coords` - The coordinates array of the touch point, relative to the viewport
		  *
		  * @memberof ui/Touchable.Touchable.prototype
		  * @type {Function}
		  * @public
		  */
		onPinchStart: PropTypes.func,

		/**
		 * Event handler for 'tap' pointer events.
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onTap: PropTypes.func,

		/**
		 * Event handler for 'up' pointer events.
		 *
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Function}
		 * @public
		 */
		onUp: PropTypes.func,

		/**
		 * Instance-specific overrides of the pinch configuration.
		 *
		 * @see {@link ui/Touchable.configure}
		 * @memberof ui/Touchable.Touchable.prototype
		 * @type {Object}
		 * @public
		 */
		pinchConfig: pinchConfigPropType,

		/**
		 * Forwards a reference to this component.
		 *
		 * @type {Object}
		 * @public
		 */
		ref: PropTypes.object
	};

	Touchable.displayName = 'Touchable';

	return Touchable;
});

export default Touchable;
export {
	configure,
	Touchable,
	useTouch
};
