import classNames from 'classnames';
import {contextTypes} from '@enact/i18n/I18nDecorator';
import Holdable from '@enact/ui/Holdable';
import React, {Component, PropTypes} from 'react';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import {startJob, stopJob} from '@enact/core/jobs';

import IconButton from '../IconButton';

import css from './Scrollbar.less';

const HoldableIconButton = Holdable({endHold: 'onLeave'}, IconButton);

const
	verticalProperties = {
		prevButtonClass: css.scrollbarUpButton,
		nextButtonClass: css.scrollbarBottomButton,
		scrollbarClass: css.scrollbarContainerVColumn,
		thumbClass: css.scrollbarVthumb,
		sizeProperty: 'clientHeight',
		matrix: (position, scaledSize, natualSize) => (
			'matrix3d(1, 0, 0, 0, 0,' + (scaledSize / natualSize) + ', 0, 0, 0, 0, 1, 0, 0, ' + position + ', 1, 1)'
		)
	},
	horizontalProperties = {
		prevButtonClass: css.scrollbarLeftButton,
		nextButtonClass: css.scrollbarRightButton,
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
	selectIcon = (isPrev) => (isVertical, rtl) => {
		if (isVertical) {
			return (isPrev) ? 'arrowsmallup' : 'arrowsmalldown';
		} else {
			if (rtl) {
				return (isPrev) ? 'arrowsmallright' : 'arrowsmallleft';
			}
			return (isPrev) ? 'arrowsmallleft' : 'arrowsmallright';
		}
	},
	selectPrevIcon = selectIcon(true),
	selectNextIcon = selectIcon(false),
	// spotlight
	doc = (typeof window === 'object') ? window.document : {},
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
class Scrollbar extends Component {
	static propTypes = /** @lends moonstone/Scroller.Scrollbar.prototype */ {
		className: PropTypes.any,

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

	constructor (props) {
		super(props);

		this.state = {
			prevButtonDisabled: true,
			nextButtonDisabled: false
		};

		this.scrollbarInfo = {
			...((props.vertical) ? verticalProperties : horizontalProperties),
			clickPrevHandler: props.onPrevScroll,
			clickNextHandler: props.onNextScroll
		};
		this.jobName = perf.now();

		this.initContainerRef = this.initRef('containerRef');
		this.initThumbRef = this.initRef('thumbRef');
	}

	updateButtons = (bounds) => {
		const
			{prevButtonNodeRef, nextButtonNodeRef} = this,
			{prevButtonDisabled, nextButtonDisabled} = this.state,
			{vertical} = this.props,
			currentPos = vertical ? bounds.scrollTop : bounds.scrollLeft,
			maxPos = vertical ? bounds.maxTop : bounds.maxLeft,
			shouldDisablePrevButton = currentPos <= 0,
			shouldDisableNextButton = currentPos >= maxPos;

		if (prevButtonDisabled !== shouldDisablePrevButton) {
			this.setState({prevButtonDisabled: shouldDisablePrevButton});
		} else if (nextButtonDisabled !== shouldDisableNextButton) {
			this.setState({nextButtonDisabled: shouldDisableNextButton});
		}

		if (shouldDisablePrevButton && doc.activeElement === prevButtonNodeRef) {
			Spotlight.focus(nextButtonNodeRef);
		} else if (shouldDisableNextButton && doc.activeElement === nextButtonNodeRef) {
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

	initRef (prop) {
		return (ref) => {
			this[prop] = ref;
		};
	}

	render () {
		const
			{className, vertical} = this.props,
			{prevButtonDisabled, nextButtonDisabled} = this.state,
			{rtl} = this.context,
			{scrollbarClass, thumbClass,
			prevButtonClass, nextButtonClass, clickPrevHandler, clickNextHandler} = this.scrollbarInfo,
			scrollbarClassNames = classNames(className, scrollbarClass),
			prevIcon = selectPrevIcon(vertical, rtl),
			nextIcon = selectNextIcon(vertical, rtl);

		return (
			<div ref={this.initContainerRef} className={scrollbarClassNames}>
				<HoldableIconButton backgroundOpacity="transparent" small disabled={prevButtonDisabled} className={prevButtonClass} onClick={clickPrevHandler} onHoldPulse={clickPrevHandler}>
					{prevIcon}
				</HoldableIconButton>
				<HoldableIconButton backgroundOpacity="transparent" small disabled={nextButtonDisabled} className={nextButtonClass} onClick={clickNextHandler} onHoldPulse={clickNextHandler}>
					{nextIcon}
				</HoldableIconButton>
				<div ref={this.initThumbRef} className={thumbClass} />
			</div>
		);
	}
}

export default Scrollbar;
export {Scrollbar};
