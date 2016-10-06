/* global clearTimeout, setTimeout */

import hoc from '@enact/core/hoc';
import {forward} from '@enact/core/handle';
import {contextTypes} from '@enact/i18n/I18nDecorator';
import React from 'react';

import css from './Marquee.less';

const animated = css.text + ' ' + css.animate;

/**
 * Default configuration parameters for {@link module:@enact/moonstone/Marquee~MarqueeDecorator}
 *
 * @type {Object}
 */
const defaultConfig = {
	/**
	 * Property containing the callback to stop the animation when `marqueeOnFocus` is enabled
	 *
	 * @type {String}
	 * @default 'onBlur'
	 */
	blur: 'onBlur',

	/**
	 * Optional CSS class to apply to the marqueed element
	 *
	 * @type {String}
	 * @default null
	 */
	className: null,

	/**
	 * Property containing the callback to start the animation when `marqueeOnHover` is enabled
	 *
	 * @type {String}
	 * @default 'onMouseEnter'
	 */
	enter: 'onMouseEnter',

	/**
	 * Property containing the callback to start the animation when `marqueeOnFocus` is enabled
	 *
	 * @type {String}
	 * @default 'onFocus'
	 */
	focus: 'onFocus',

	/**
	 * Property containing the callback to stop the animation when `marqueeOnHover` is enabled
	 *
	 * @type {String}
	 * @default 'onMouseLeave'
	 */
	leave: 'onMouseLeave'
};

/**
 * {@link module:@enact/moonstone/Marquee~MarqueeDecorator} is a Higher-order Component which makes
 * the Wrapped component's children marquee.
 *
 * @class MarqueeDecorator
 * @ui
 * @public
 */
const MarqueeDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {blur, className: marqueeClassName, enter, focus, leave} = config;

	// Generate functions to forward events to containers
	const forwardBlur = forward(blur);
	const forwardFocus = forward(focus);
	const forwardEnter = forward(enter);
	const forwardLeave = forward(leave);

	// pre-calc the configurable className string
	const rootClassName = css.marquee + ' ' + marqueeClassName;

	return class extends React.Component {
		static displayName = 'MarqueeDecorator'

		// Include the i18n contextTypes to make measurement decisions for RTL
		static contextTypes = contextTypes

		static propTypes = {
			/**
			 * Children to be marqueed
			 *
			 * @type {Node}
			 * @public
			 */
			children: React.PropTypes.node,

			/**
			 * Disables all marquee behavior except when `marqueeOnHover` is enabled
			 *
			 * @type {Boolean}
			 * @public
			 */
			disabled: React.PropTypes.bool,

			/**
			 * Number of milliseconds to wait before starting marquee when `marqueeOnHover` or
			 * `marqueeOnFocus` are enabled or before restarting any marquee.
			 *
			 * @type {Number}
			 * @default 1000
			 * @public
			 */
			marqueeDelay: React.PropTypes.number,

			/**
			 * Disables all marquee behavior and removes supporting markup.
			 *
			 * @type {Boolean}
			 */
			marqueeDisabled: React.PropTypes.bool,

			/**
			 * Starts the marquee when the wrapped component is focused.
			 *
			 * @type {Boolean}
			 * @default true
			 * @public
			 */
			marqueeOnFocus: React.PropTypes.bool,

			/**
			 * Starts the marquee when the wrapped component is hovered by the pointer.
			 *
			 * @type {Boolean}
			 * @public
			 */
			marqueeOnHover: React.PropTypes.bool,

			/**
			 * Starts the marquee when the wrapped component is rendered
			 *
			 * @type {Boolean}
			 * @public
			 */
			marqueeOnRender: React.PropTypes.bool,

			/**
			 * Number of milliseconds to wait before starting marquee the first time. Has no effect
			 * if `marqueeOnRender` is not enabled
			 *
			 * @type {Number}
			 * @default 1000
			 * @public
			 */
			marqueeOnRenderDelay: React.PropTypes.number,

			/**
			 * Number of milliseconds to wait before resetting the marquee after it finishes.
			 *
			 * @type {Number}
			 * @default 1000
			 * @public
			 */
			marqueeResetDelay: React.PropTypes.number,

			/**
			 * Rate of marquee measured in pixels/second.
			 *
			 * @type {Number}
			 * @default 60
			 * @public
			 */
			marqueeSpeed: React.PropTypes.number
		}

		static defaultProps = {
			marqueeDelay: 1000,
			marqueeOnFocus: true,
			marqueeOnRenderDelay: 1000,
			marqueeResetDelay: 1000,
			marqueeSpeed: 60
		}

		constructor (props) {
			super(props);
			this.distance = null;
			this.state = {
				overflow: 'ellipsis'
			};
		}

		componentDidMount () {
			if (this.props.marqueeOnRender && !this.props.disabled && !this.props.marqueeDisabled) {
				this.startAnimation(this.props.marqueeOnRenderDelay);
			}
		}

		componentWillUnmount () {
			this.clearTimeout();
		}

		/**
		 * Clears the timer
		 *
		 * @returns {undefined}
		 */
		clearTimeout () {
			clearTimeout(this.timer);
			this.timer = null;
		}

		/**
		 * Starts a new timer
		 *
		 * @param {Function} fn   Callback
		 * @param {Number}   time Delay in milliseconds
		 * @returns {undefined}
		 */
		setTimeout (fn, time) {
			this.clearTimeout();
			this.timer = setTimeout(fn, time);
		}

		/**
		* Determine if the marquee should animate
		*
		* @param {Number} [distance] Marquee distance
		* @returns {Boolean} Returns `true` if this control has enough content to animate.
		* @private
		*/
		shouldAnimate (distance) {
			distance = (distance && distance >= 0) ? distance : this.calcDistance();
			return (distance > 0);
		}

		/**
		* Determines how far the marquee needs to scroll.
		*
		* @returns {Number} Marquee distance
		* @private
		*/
		calcDistance () {
			const node = this.node;
			let rect;

			// TODO: absolute showing check (or assume that it won't be rendered if it isn't showing?)
			if (node && this.distance == null) {
				rect = node.getBoundingClientRect();
				this.distance = Math.floor(Math.abs(node.scrollWidth - rect.width));

				// if the distance is exactly 0, then the ellipsis
				// most likely are hiding the content, and marquee does not
				// need to animate
				if (this.distance === 0) {
					this.setState({overflow: 'clip'});
				} else {
					this.setState({overflow: 'ellipsis'});
				}
			}

			return this.distance;
		}

		/**
		* Starts marquee animation.
		*
		* @param {Number} [delay] Milleseconds to wait before animating
		* @returns {undefined}
		*/
		startAnimation = (delay = this.props.marqueeDelay) => {
			if (this.state.animating || this.contentFits) return;

			const distance = this.calcDistance();

			// If there is no need to animate, return early
			if (!this.shouldAnimate(distance)) {
				this.contentFits = true;
				return;
			}

			this.setTimeout(() => {
				this.setState({
					animating: true
				});
			}, delay);
		}

		/**
		 * Resets the marquee and restarts it after `marqueeDelay` millisecons.
		 *
		 * @returns {undefined}
		 */
		restartAnimation = () => {
			this.setState({
				animating: false
			});
			this.startAnimation();
		}

		/**
		 * Resets and restarts the marquee after `marqueeResetDelay` milliseconds
		 *
		 * @returns {undefined}
		 */
		resetAnimation = () => {
			this.setTimeout(this.restartAnimation, this.props.marqueeResetDelay);
		}

		/**
		 * Cancels the marquee unless `marqueeOnRender` is enabled
		 *
		 * @returns {undefined}
		 */
		cancelAnimation = () => {
			if (!this.props.marqueeOnRender) {
				this.clearTimeout();
				this.setState({
					animating: false
				});
			}
		}

		/**
		 * Alternates the direction of the transition distance for RTL
		 *
		 * @param  {Number} distance Distance in pixels
		 *
		 * @return {Number}          Distance adjusted for RTL
		 */
		adjustDistanceForRTL (distance) {
			return this.context.rtl ? distance : distance * -1;
		}

		/**
		 * Determines the inline styles for the marquee element
		 *
		 * @return {Object} Inline style object
		 */
		calcStyle () {
			const distance = this.calcDistance();
			const duration = distance / this.props.marqueeSpeed;

			const style = {
				textOverflow: this.state.overflow,
				transform: 'translateZ(0)'
			};

			if (this.state.animating) {
				style.transform = `translate3d(${this.adjustDistanceForRTL(distance)}px, 0, 0)`;
				style.transition = `transform ${duration}s linear`;
				style.WebkitTransition = `transform ${duration}s linear`;
			}

			return style;
		}

		handleTransitionEnd = (ev) => {
			this.resetAnimation();
			ev.stopPropagation();
		}

		handleFocus = (ev) => {
			this.startAnimation();
			forwardFocus(ev, this.props);
		}

		handleBlur = (ev) => {
			this.cancelAnimation();
			forwardBlur(ev, this.props);
		}

		handleEnter = (ev) => {
			this.startAnimation();
			forwardEnter(ev, this.props);
		}

		handleLeave = (ev) => {
			this.cancelAnimation();
			forwardLeave(ev, this.props);
		}

		cacheNode = (node) => {
			this.node = node;
		}

		renderMarquee () {
			const {children, disabled, marqueeOnFocus, marqueeOnHover, ...rest} = this.props;
			const style = this.calcStyle();

			if (marqueeOnFocus && !disabled) {
				rest[focus] = this.handleFocus;
				rest[blur] = this.handleBlur;
			}

			// TODO: cancel others on hover
			if ((marqueeOnHover && !this.marqueeOnFocus) || (disabled && this.marqueeOnFocus)) {
				rest[enter] = this.handleEnter;
				rest[leave] = this.handleLeave;
			}

			delete rest.marqueeDelay;
			delete rest.marqueeOnFocus;
			delete rest.marqueeOnRenderDelay;
			delete rest.marqueeResetDelay;
			delete rest.marqueeSpeed;

			return (
				<Wrapped {...rest} disabled={disabled}>
					<div className={rootClassName}>
						<div
							className={this.state.animating ? animated : css.text}
							style={style}
							ref={this.cacheNode}
							onTransitionEnd={this.handleTransitionEnd}
						>
							{children}
						</div>
					</div>
				</Wrapped>
			);
		}

		renderWrapped () {
			const props = Object.assign({}, this.props);

			delete props.marqueeDelay;
			delete props.marqueeDisabled;
			delete props.marqueeOnFocus;
			delete props.marqueeOnHover;
			delete props.marqueeOnRender;
			delete props.marqueeOnRenderDelay;
			delete props.marqueeResetDelay;
			delete props.marqueeSpeed;

			return <Wrapped {...props} />;
		}

		render () {
			if (this.props.marqueeDisabled) {
				return this.renderWrapped();
			} else {
				return this.renderMarquee();
			}
		}
	};

});

export default MarqueeDecorator;
export {MarqueeDecorator};
