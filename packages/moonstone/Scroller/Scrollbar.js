import {$L} from '@enact/i18n';
import {Announce} from '@enact/ui/AnnounceDecorator';
import classNames from 'classnames';
import {contextTypes} from '@enact/i18n/I18nDecorator';
import React, {Component, PropTypes} from 'react';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import {startJob, stopJob} from '@enact/core/jobs';

import ScrollButton from './ScrollButton';
import css from './Scrollbar.less';

const
	verticalProperties = {
		scrollbarClass: css.scrollbarContainerVColumn,
		thumbClass: css.scrollbarVthumb,
		sizeProperty: 'clientHeight',
		matrix: (position, scaledSize, natualSize) => (
			'matrix3d(1, 0, 0, 0, 0,' + (scaledSize / natualSize) + ', 0, 0, 0, 0, 1, 0, 0, ' + position + ', 1, 1)'
		)
	},
	horizontalProperties = {
		scrollbarClass: css.scrollbarContainerHColumn,
		thumbClass: css.scrollerHthumb,
		sizeProperty: 'clientWidth',
		matrix: (position, scaledSize, natualSize) => (
			'matrix3d(' + (scaledSize / natualSize) + ', 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + position + ', 0, 1, 1)'
		)
	},
	autoHideDelay = 200,
	nop = () => {},
	minThumbSize = ri.scale(4),
	prepareButton = (isPrev) => (isVertical, rtl) => {
		let direction;

		if (isVertical) {
			direction = (isPrev) ? 'up' : 'down';
		} else { /* if rtl is true, arrows are replaced each other. So, rtl XOR isPrev: right arrow, otherwise left arrow */
			direction = (rtl === isPrev) ? 'right' : 'left';
		}

		return 'arrowsmall' + direction;
	},
	preparePrevButton = prepareButton(true),
	prepareNextButton = prepareButton(false),

	// spotlight
	perf = (typeof window === 'object') ? window.performance : {now: Date.now};

/**
 * {@link moonstone/Scroller.Scrollbar} is a Scrollbar with Moonstone styling.
 * It is used in {@link moonstone/Scrollable.Scrollable}.
 *
 * @class Scrollbar
 * @memberof moonstone/Scroller
 * @ui
 * @private
 */
class ScrollbarBase extends Component {
	static propTypes = /** @lends moonstone/Scroller.Scrollbar.prototype */ {
		announce: PropTypes.func,

		className: PropTypes.any,

		/**
		 * Specifies to reflect scrollbar's disabled property to the paging controls.
		 * When it is `true`, both prev/next buttons are going to be disabled.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when the scrollbar's down/right button is pressed.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextScroll: PropTypes.func,

		/**
		 * Called when the scrollbar's up/left button is pressed.
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevScroll: PropTypes.func,

		/**
		 * If `true`, the scrollbar will be oriented vertically.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		vertical: PropTypes.bool
	}

	static contextTypes = contextTypes

	static defaultProps = {
		onNextScroll: nop,
		onPrevScroll: nop,
		vertical: true
	}

	constructor (props) {
		super(props);

		const
			{vertical} = props,
			{scrollbarClass, thumbClass, sizeProperty, matrix} = ((vertical) ? verticalProperties : horizontalProperties);

		this.state = {
			prevButtonDisabled: true,
			nextButtonDisabled: true
		};

		this.scrollbarInfo = {scrollbarClass, thumbClass, sizeProperty, matrix};

		this.jobName = perf.now();

		this.initAnnounceRef = this.initRef('announceRef');
		this.initContainerRef = this.initRef('containerRef');
		this.initThumbRef = this.initRef('thumbRef');
	}

	componentDidMount () {
		const {containerRef} = this;

		this.calculateMetrics();
		this.prevButtonNodeRef = containerRef.children[0];
		this.nextButtonNodeRef = containerRef.children[1];
	}

	componentDidUpdate () {
		this.calculateMetrics();
	}

	componentWillUnmount () {
		stopJob(this.jobName);
	}

	autoHide = true
	thumbSize = 0
	minThumbSizeRatio = 0
	trackSize = 0
	jobName = ''

	// component refs
	containerRef = null
	thumbRef = null
	prevButtonNodeRef = null
	nextButtonNodeRef = null

	updateButtons = (bounds) => {
		const
			{prevButtonNodeRef, nextButtonNodeRef} = this,
			{prevButtonDisabled, nextButtonDisabled} = this.state,
			{vertical} = this.props,
			currentPos = vertical ? bounds.scrollTop : bounds.scrollLeft,
			maxPos = vertical ? bounds.maxTop : bounds.maxLeft,
			shouldDisablePrevButton = currentPos <= 0,
			shouldDisableNextButton = currentPos >= maxPos,
			spotItem = window.document.activeElement;

		if (prevButtonDisabled !== shouldDisablePrevButton) {
			this.setState({prevButtonDisabled: shouldDisablePrevButton});
		} else if (nextButtonDisabled !== shouldDisableNextButton) {
			this.setState({nextButtonDisabled: shouldDisableNextButton});
		}

		if (shouldDisablePrevButton && spotItem === prevButtonNodeRef) {
			Spotlight.focus(nextButtonNodeRef);
		} else if (shouldDisableNextButton && spotItem === nextButtonNodeRef) {
			Spotlight.focus(prevButtonNodeRef);
		}
	}

	update (bounds) {
		const
			{trackSize, minThumbSizeRatio} = this,
			{vertical} = this.props,
			{rtl} = this.context,
			{clientWidth, clientHeight, scrollWidth, scrollHeight, scrollLeft, scrollTop} = bounds,
			scrollLeftRtl = rtl ? (scrollWidth - clientWidth - scrollLeft) : scrollLeft,
			thumbSizeRatioBase = vertical ?
				Math.min(1, clientHeight / scrollHeight) :
				Math.min(1, clientWidth / scrollWidth);
		let
			thumbSizeRatio = Math.max(minThumbSizeRatio, thumbSizeRatioBase),
			thumbPositionRatio = vertical ?
				scrollTop / (scrollHeight - clientHeight) :
				scrollLeftRtl / (scrollWidth - clientWidth),
			thumbSize, thumbPosition;

		// overscroll cases
		if (thumbPositionRatio < 0) {
			thumbSizeRatio = Math.max(minThumbSizeRatio, thumbSizeRatio + thumbPositionRatio);
			thumbPositionRatio = 0;
		} else if (thumbPositionRatio > 1) {
			thumbSizeRatio = Math.max(minThumbSizeRatio, thumbSizeRatio + (1 - thumbPositionRatio));
			thumbPositionRatio = 1;
		}

		thumbSize = Math.round(thumbSizeRatio * trackSize);
		thumbPositionRatio = (vertical || !rtl) ? (thumbPositionRatio * (1 - thumbSizeRatio)) : (thumbPositionRatio * (1 - thumbSizeRatio) - 1);
		thumbPosition = Math.round(thumbPositionRatio * trackSize);

		this.thumbRef.style.transform = this.scrollbarInfo.matrix(thumbPosition, thumbSize, this.thumbSize);
		this.updateButtons(bounds);
	}

	showThumb () {
		stopJob(this.jobName);
		this.thumbRef.classList.add(css.thumbShown);
		this.thumbRef.classList.remove(css.thumbHidden);
	}

	startHidingThumb () {
		stopJob(this.jobName);

		if (this.autoHide) {
			startJob(this.jobName, () => {
				this.hideThumb();
			}, autoHideDelay);
		}
	}

	hideThumb () {
		this.thumbRef.classList.add(css.thumbHidden);
		this.thumbRef.classList.remove(css.thumbShown);
	}

	calculateMetrics () {
		this.thumbSize = this.thumbRef[this.scrollbarInfo.sizeProperty];
		this.trackSize = this.containerRef[this.scrollbarInfo.sizeProperty];
		this.minThumbSizeRatio = minThumbSize / this.trackSize;
	}

	initRef (prop) {
		return (ref) => {
			this[prop] = ref;
		};
	}

	handlePrevScroll = (ev) => {
		const {onPrevScroll, vertical} = this.props;
		onPrevScroll(ev);
		if (this.announceRef) this.announceRef.announce($L(vertical ? 'UP' : 'LEFT'));
	}

	handleNextScroll = (ev) => {
		const {onNextScroll, vertical} = this.props;
		onNextScroll(ev);
		if (this.announceRef) this.announceRef.announce($L(vertical ? 'DOWN' : 'RIGHT'));
	}

	render () {
		const
			{className, disabled, onNextScroll, onPrevScroll, vertical} = this.props,
			{prevButtonDisabled, nextButtonDisabled} = this.state,
			{rtl} = this.context,
			{scrollbarClass, thumbClass} = this.scrollbarInfo,
			scrollbarClassNames = classNames(className, scrollbarClass),
			prevIcon = preparePrevButton(vertical, rtl),
			nextIcon = prepareNextButton(vertical, rtl);

		return (
			<div ref={this.initContainerRef} className={scrollbarClassNames}>
				<ScrollButton
					direction={vertical ? 'up' : 'left'}
					disabled={disabled || prevButtonDisabled}
					onClick={this.handlePrevScroll}
					onHoldPulse={onPrevScroll}
				>
					{prevIcon}
				</ScrollButton>
				<ScrollButton
					direction={vertical ? 'down' : 'right'}
					disabled={disabled || nextButtonDisabled}
					onClick={this.handleNextScroll}
					onHoldPulse={onNextScroll}
				>
					{nextIcon}
				</ScrollButton>
				<div ref={this.initThumbRef} className={thumbClass} />
				<Announce ref={this.initAnnounceRef} />
			</div>
		);
	}
}

export default ScrollbarBase;
export {
	ScrollbarBase as Scrollbar,
	ScrollbarBase
};
