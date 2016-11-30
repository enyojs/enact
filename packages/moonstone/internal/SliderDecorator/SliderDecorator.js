/**
 * Exports the {@link moonstone/internal/SliderDecorator.SliderDecorator} HOC
 *
 * @module moonstone/internal/SliderDecorator
 * @private
 */

import hoc from '@enact/core/hoc';
import {throttleJob} from '@enact/core/jobs';
import Spotlight from '@enact/spotlight';
import {checkDefaultBounds} from '@enact/ui/validators/PropTypeValidators';
import R from 'ramda';
import React, {PropTypes} from 'react';

import {
	computeProportionBackground,
	computeProportionProgress,
	computeBarTransform,
	computeKnobTransform
} from './util';

/**
 * Default config for {@link moonstone/SliderDecorator.SliderDecorator}.
 *
 * @memberof moonstone/internal/SliderDecorator
 * @hocconfig
 * @private
 */
const defaultConfig = {
	/**
	 * Configures the time in milliseconds to throttle consecutive change events.
	 *
	 * @type {Number}
	 * @default 20
	 * @memberof moonstone/internal/SliderDecorator.defaultConfig
	 */
	changeDelay: 20,

	/**
	 * When `true`, increment and decrement handlers are connected.
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof moonstone/internal/SliderDecorator.defaultConfig
	 */
	handlesIncrements: false
};

/**
 * {@link moonstone/internal/SliderDecorator.SliderDecorator} is a Higher-order Component that
 * provides common functionality for slider-like components. Essentially, this HOC implements a
 * performant value updating mechanism while supporting different modes such as increment mode
 * (enabled via the `increment` config), which generates increment and decrement buttons.
 *
 * @class SliderDecorator
 * @memberof moonstone/internal/SliderDecorator
 * @hoc
 * @private
 */
const SliderDecorator = hoc(defaultConfig, (config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'SliderDecorator';

		static propTypes = /** @lends moonstone/SliderDecorator.SliderDecorator.prototype */{
			/**
			 * Background progress, as a percentage.
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			backgroundPercent: PropTypes.number,

			/**
			 * Height, in standard CSS units, of the vertical slider. Only takes
			 * effect on a vertical oriented slider.
			 *
			 * @type {String}
			 * @default '300px'
			 * @public
			 */
			height: PropTypes.string,

			/**
			 * The maximum value of the slider.
			 *
			 * @type {Number}
			 * @default 100
			 * @public
			 */
			max: PropTypes.number,

			/**
			 * The minimum value of the slider.
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			min: PropTypes.number,

			/**
			 * The handler to run when the value is changed.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onChange: PropTypes.func,

			/**
			 * When `true`, a pressed visual effect is applied
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			pressed: PropTypes.bool,

			/**
			 * The amount to increment or decrement the value.
			 *
			 * @type {Number}
			 * @default 1
			 * @public
			 */
			step: PropTypes.number,

			/**
			 * The value of the slider.
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			value: checkDefaultBounds,

			/**
			 * If `true` the slider will be oriented vertically.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			vertical: PropTypes.bool
		};

		static defaultProps = {
			height: '300px',
			max: 100,
			min: 0,
			step: 1,
			pressed: false,
			value: 0,
			vertical: false
		};

		constructor (props) {
			super(props);

			this.value = props.value;
		}

		componentWillReceiveProps (nextProps) {
			if (nextProps.value !== this.props.value) {
				this.updateValue(nextProps.value);
			}
		}

		onChange = () => {
			if (this.props.onChange) {
				this.props.onChange({value: this.value});
			}
		}

		handleChange = (event) => {
			event.preventDefault();
			const value = Number.parseInt(event.target.value);
			this.updateValue(value);
		}

		updateValue = (value) => {
			throttleJob('sliderChange', () => {
				// intentionally breaking encapsulation to avoid having to specify multiple refs
				const {barNode, knobNode, loaderNode, node} = this.visibleBarNode;
				const {backgroundPercent, max, min, vertical} = this.props;
				const normalizedMax = max != null ? max : Wrapped.defaultProps.max;
				const normalizedMin = min != null ? min : Wrapped.defaultProps.min;
				const proportionBackground = computeProportionBackground({backgroundPercent});
				const proportionProgress = computeProportionProgress({value, max: normalizedMax, min: normalizedMin});

				loaderNode.style.transform = computeBarTransform(proportionBackground, vertical);
				barNode.style.transform = computeBarTransform(proportionProgress, vertical);
				knobNode.style.transform = computeKnobTransform(proportionProgress, vertical, node, knobNode.offsetHeight / 2);
				this.inputNode.value = value;
				this.value = value;
				this.onChange();
			}, config.changeDelay);
		}

		getInputNode = (node) => {
			this.inputNode = node;
		}

		getSliderNode = (node) => {
			this.sliderNode = node;
		}

		getVisibleBarNode = (node) => {
			this.visibleBarNode = node;
		}

		clickHandler = () => Spotlight.focus(this.sliderNode)

		incrementHandler = () => {
			this.changeValue(1);
		}

		decrementHandler = () => {
			this.changeValue(-1);
		}

		changeValue = (direction) => {
			const {min, max, step} = this.props;
			let value = this.value + (step * direction);

			value = R.clamp(min, max, value);
			this.updateValue(value);
		}

		render () {
			const handlers = !config.handlesIncrements ? null : {
				onIncrement: this.incrementHandler,
				onDecrement: this.decrementHandler
			};

			return (
				<Wrapped
					{...this.props}
					{...handlers}
					onChange={this.handleChange}
					onClick={this.clickHandler}
					inputRef={this.getInputNode}
					sliderRef={this.getSliderNode}
					value={this.value}
					visibleBarRef={this.getVisibleBarNode}
				/>
			);
		}
	};
});

export default SliderDecorator;
export {SliderDecorator};
