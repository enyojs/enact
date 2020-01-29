/**
 * Unstyled scrollable components and behaviors to be customized by a theme or application.
 *
 * @module ui/Scrollable
 * @exports constants
 * @exports Scrollable
 * @exports ScrollableBase
 * @private
 */

import classNames from 'classnames';
import {forward, forwardWithPrevent} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {platform} from '@enact/core/platform'; // Native
import Registry from '@enact/core/internal/Registry';
import {Job} from '@enact/core/util';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';

import ForwardRef from '../ForwardRef';
import {ResizeContext} from '../Resizable';
import ri from '../resolution';
import Touchable from '../Touchable';

import useForceUpdate from './useForceUpdate';
import ScrollAnimator from './ScrollAnimator';
import utilDOM from './utilDOM';
import utilEvent from './utilEvent';

import css from './Scrollable.module.less';

const nop = () => {};

const
	constants = {
		animationDuration: 1000,
		epsilon: 1,
		flickConfig: {maxDuration: null},
		isPageDown: is('pageDown'),
		isPageUp: is('pageUp'),
		nop: () => {},
		overscrollTypeDone: 9,
		overscrollTypeHold: 1,
		overscrollTypeNone: 0,
		overscrollTypeOnce: 2,
		overscrollVelocityFactor: 300, // Native
		paginationPageMultiplier: 0.66,
		scrollStopWaiting: 200,
		scrollWheelPageMultiplierForMaxPixel: 0.2 // The ratio of the maximum distance scrolled by wheel to the size of the viewport.
	},
	{
		animationDuration,
		epsilon,
		flickConfig,
		isPageDown,
		isPageUp,
		overscrollTypeDone,
		overscrollTypeHold,
		overscrollTypeNone,
		overscrollTypeOnce,
		overscrollVelocityFactor,
		paginationPageMultiplier,
		scrollStopWaiting,
		scrollWheelPageMultiplierForMaxPixel
	} = constants;

const TouchableDiv = ForwardRef({prop: 'ref'}, Touchable('div'));

/**
 * An unstyled component that passes scrollable behavior information as its render prop's arguments.
 *
 * @function ScrollableBase
 * @memberof ui/Scrollable
 * @ui
 * @private
 */
const useScrollable = (props) => {
	const {
		decorateChildProps,
		horizontalScrollbarRef,
		scrollableContainerRef,
		setUiChildAdapter,
		type,
		uiChildAdapter,
		uiChildContainerRef,
		verticalScrollbarRef
	} = props;

	// Mutable value and Hooks

	const [, forceUpdate] = useForceUpdate();

	const context = useContext(ResizeContext);

	const [isHorizontalScrollbarVisible, setIsHorizontalScrollbarVisible] = useState(props.horizontalScrollbar === 'visible');
	const [isVerticalScrollbarVisible, setIsVerticalScrollbarVisible] = useState(props.verticalScrollbar === 'visible');

	const variables = useRef({
		overscrollEnabled: !!(props.applyOverscrollEffect),

		// Enable the early bail out of repeated scrolling to the same position
		animationInfo: null,

		resizeRegistry: null,

		// constants
		pixelPerLine: 39,
		scrollWheelMultiplierForDeltaPixel: 1.5, // The ratio of wheel 'delta' units to pixels scrolled.

		// status
		deferScrollTo: true,
		isScrollAnimationTargetAccumulated: false,
		isUpdatedScrollThumb: false,

		// overscroll
		lastInputType: null,
		overscrollStatus: {
			horizontal: {
				before: {type: overscrollTypeNone, ratio: 0},
				after: {type: overscrollTypeNone, ratio: 0}
			},
			vertical: {
				before: {type: overscrollTypeNone, ratio: 0},
				after: {type: overscrollTypeNone, ratio: 0}
			}
		},

		// bounds info
		bounds: {
			clientWidth: 0,
			clientHeight: 0,
			scrollWidth: 0,
			scrollHeight: 0,
			maxTop: 0,
			maxLeft: 0
		},

		// wheel/drag/flick info
		wheelDirection: 0,
		isDragging: false,
		isTouching: false, // Native

		// scroll info
		scrolling: false,
		scrollLeft: 0,
		scrollTop: 0,
		scrollToInfo: null,

		// scroll animator
		animator: null,

		// non-declared-variable.
		accumulatedTargetX: null,
		accumulatedTargetY: null,
		flickTarget: null,
		dragStartX: null,
		dragStartY: null,
		scrollStopJob: null,

		isScrollbarVisibleChanged: false
	});

	if (variables.current.animator == null) {
		variables.current.animator = new ScrollAnimator();
	}

	{// useEffect(() => { // FIXME
		if (props.setUiScrollableAdapter) {
			props.setUiScrollableAdapter({
				animator: variables.current.animator,
				applyOverscrollEffect,
				bounds: variables.current.bounds,
				calculateDistanceByWheel,
				canScrollHorizontally,
				canScrollVertically,
				checkAndApplyOverscrollEffect,
				getScrollBounds,
				get isDragging () {
					return variables.current.isDragging;
				},
				isScrollAnimationTargetAccumulated: variables.current.isScrollAnimationTargetAccumulated,
				get isUpdatedScrollThumb () {
					return variables.current.isUpdatedScrollThumb;
				},
				get lastInputType () {
					return variables.current.lastInputType;
				},
				set lastInputType (val) {
					variables.current.lastInputType = val;
				},
				get rtl () {
					return props.rtl;
				},
				get scrollBounds () {
					return getScrollBounds();
				},
				get scrollHeight () {
					return variables.current.bounds.scrollHeight;
				},
				get scrolling () {
					return variables.current.scrolling;
				},
				get scrollLeft () {
					return variables.current.scrollLeft;
				},
				scrollTo,
				scrollToAccumulatedTarget,
				get scrollToInfo () {
					return variables.current.scrollToInfo;
				},
				get scrollTop () {
					return variables.current.scrollTop;
				},
				setOverscrollStatus,
				showThumb,
				start,
				startHidingThumb,
				stop,
				get wheelDirection () {
					return variables.current.wheelDirection;
				},
				set wheelDirection (val) {
					variables.current.wheelDirection = val;
				}
			});
		}
	}// }, []); // FIXME

	const
		{className, noScrollByDrag, rtl, style, ...rest} = props,
		scrollableClasses = classNames(css.scrollable, className);

	delete rest.addEventListeners;
	delete rest.applyOverscrollEffect;
	delete rest.cbScrollTo;
	delete rest.clearOverscrollEffect;
	delete rest.handleResizeWindow;
	delete rest.horizontalScrollbar;
	delete rest.horizontalScrollbarRef;
	delete rest.noScrollByWheel;
	delete rest.onFlick;
	delete rest.onKeyDown;
	delete rest.onMouseDown;
	delete rest.onScroll;
	delete rest.onScrollStart;
	delete rest.onScrollStop;
	delete rest.onWheel;
	delete rest.overscrollEffectOn;
	delete rest.removeEventListeners;
	delete rest.scrollableContainerRef;
	delete rest.scrollStopOnScroll; // Native
	delete rest.scrollTo;
	delete rest.setUiChildAdapter;
	delete rest.setUiScrollableAdapter;
	delete rest.start; // Native
	delete rest.stop; // JS
	delete rest.uiChildAdapter;
	delete rest.uiChildContainerRef;
	delete rest.verticalScrollbar;
	delete rest.verticalScrollbarRef;

	// JS [[
	// TODO: consider replacing forceUpdate() by storing bounds in state rather than a non-
	// state member.
	const enqueueForceUpdate = useCallback(() => {
		uiChildAdapter.current.calculateMetrics(uiChildAdapter.current.props);
		forceUpdate();
	}, [forceUpdate, uiChildAdapter]);

	function handleResizeWindow () {
		const propsHandleResizedWindow = props.handleResizeWindow;

		// `handleSize` in `ui/resolution.ResolutionDecorator` should be executed first.
		setTimeout(() => {
			if (propsHandleResizedWindow) {
				propsHandleResizedWindow();
			}
			if (type === 'JS') {
				scrollTo({position: {x: 0, y: 0}, animate: false});
			} else {
				uiChildContainerRef.current.style.scrollBehavior = null;
				uiChildAdapter.current.scrollToPosition(0, 0);
				uiChildContainerRef.current.style.scrollBehavior = 'smooth';
			}

			enqueueForceUpdate();
		});
	} // esline-disable-line react-hooks/exhaustive-deps

	const handleResize = useCallback((ev) => {
		if (ev.action === 'invalidateBounds') {
			enqueueForceUpdate();
		}
	}, [enqueueForceUpdate]);
	// JS ]]

	if (variables.current.resizeRegistry == null) {
		variables.current.resizeRegistry = Registry.create(handleResize);
	}

	if (variables.current.scrollStopJob == null) {
		if (type === 'JS') {
			variables.current.scrollStopJob = new Job(doScrollStop, scrollStopWaiting);
		} else {
			variables.current.scrollStopJob = new Job(scrollStopOnScroll, scrollStopWaiting);
		}
	}

	// props.cbScrollTo(scrollTo); // TBD

	useEffect(() => {
		const {animator, resizeRegistry, scrolling, scrollStopJob} = variables.current;

		variables.current.resizeRegistry.parent = context;

		updateScrollbars();

		// componentWillUnmount
		return () => {
			resizeRegistry.parent = null;

			// Before call cancelAnimationFrame, you must send scrollStop Event.
			if (scrolling) {
				forwardScrollEvent('onScrollStop', getReachedEdgeInfo());
			}

			scrollStopJob.stop();

			// JS [
			if (animator.isAnimating()) {
				animator.stop();
			}
			// JS ]
		};
	}); // esline-disable-next-line react-hooks/exhaustive-deps

	useEffect(() => {
		// Need to sync calculated client size if it is different from the real size
		if (uiChildAdapter.current.syncClientSize) {
			// If we actually synced, we need to reset scroll position.
			if (uiChildAdapter.current.syncClientSize()) {
				setScrollLeft(0);
				setScrollTop(0);
			}
		}

		clampScrollPosition(); // JS

		addEventListeners();

		variables.current.isScrollbarVisibleChanged = false;

		return () => removeEventListeners();
	});

	useEffect(() => {
		const {hasDataSizeChanged} = uiChildAdapter.current;

		if (
			hasDataSizeChanged === false &&
			(isHorizontalScrollbarVisible || isVerticalScrollbarVisible)
		) {
			variables.current.isScrollbarVisibleChanged = true;
			variables.current.deferScrollTo = false;
			variables.current.isUpdatedScrollThumb = updateScrollThumbSize();
		}
	}); // esline-disable-next-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (variables.current.isScrollbarVisibleChanged === false) {
			updateScrollbars();
		}

		if (variables.current.scrollToInfo !== null) {
			if (!variables.current.deferScrollTo) {
				scrollTo(variables.current.scrollToInfo);
			}
		}

		// publish container resize changes
		variables.current.resizeRegistry.notify({});
	});

	// JS [[
	function clampScrollPosition () {
		const bounds = getScrollBounds();

		if (variables.current.scrollTop > bounds.maxTop) {
			variables.current.scrollTop = bounds.maxTop;
		}

		if (variables.current.scrollLeft > bounds.maxLeft) {
			variables.current.scrollLeft = bounds.maxLeft;
		}
	}
	// JS ]]

	// drag/flick event handlers

	function getRtlX (x) {
		return (props.rtl ? -x : x);
	}

	function onMouseDown (ev) {
		if (forwardWithPrevent('onMouseDown', ev, props)) {
			stop();
		}
	} // esline-disable-next-line react-hooks/exhaustive-deps

	// Native [[
	function onTouchStart () {
		variables.current.isTouching = true;
	}
	// Native ]]

	function onDragStart (ev) {
		if (type === 'JS' ) {
			if (ev.type === 'dragstart') return;

			forward('onDragStart', ev, props);
			stop();
			variables.current.isDragging = true;
			variables.current.dragStartX = variables.current.scrollLeft + getRtlX(ev.x);
			variables.current.dragStartY = variables.current.scrollTop + ev.y;
		} else {
			if (!variables.current.isTouching) {
				stop();
				variables.current.isDragging = true;
			}

			// these values are used also for touch inputs
			variables.current.dragStartX = variables.current.scrollLeft + getRtlX(ev.x);
			variables.current.dragStartY = variables.current.scrollTop + ev.y;
		}
	}

	function onDrag (ev) {
		if (type === 'JS') {
			if (ev.type === 'drag') {
				return;
			}

			const {direction} = props;

			variables.current.lastInputType = 'drag';

			forward('onDrag', ev, props);
			start({
				targetX: (direction === 'vertical') ? 0 : variables.current.dragStartX - getRtlX(ev.x), // 'horizontal' or 'both'
				targetY: (direction === 'horizontal') ? 0 : variables.current.dragStartY - ev.y, // 'vertical' or 'both'
				animate: false,
				overscrollEffect: props.overscrollEffectOn.drag
			});
		} else {
			const
				{direction, overscrollEffectOn} = props,
				targetX = (direction === 'vertical') ? 0 : variables.current.dragStartX - getRtlX(ev.x), // 'horizontal' or 'both'
				targetY = (direction === 'horizontal') ? 0 : variables.current.dragStartY - ev.y; // 'vertical' or 'both'

			variables.current.lastInputType = 'drag';

			if (!variables.current.isTouching) {
				start({targetX, targetY, animate: false, overscrollEffect: overscrollEffectOn.drag});
			} else if (variables.current.overscrollEnabled && overscrollEffectOn.drag) {
				checkAndApplyOverscrollEffectOnDrag(targetX, targetY, overscrollTypeHold);
			}
		}
	}

	function onDragEnd (ev) {
		if (type === 'JS') {
			if (ev.type === 'dragend') {
				return;
			}

			variables.current.isDragging = false;

			forward('onDragEnd', ev, props);
			if (variables.current.flickTarget) {
				const {targetX, targetY, duration} = variables.current.flickTarget;

				variables.current.lastInputType = 'drag';

				variables.current.isScrollAnimationTargetAccumulated = false;
				start({targetX, targetY, duration, overscrollEffect: props.overscrollEffectOn.drag});
			} else {
				stop();
			}

			if (variables.current.overscrollEnabled) { // not check props.overscrollEffectOn.drag for safety
				clearAllOverscrollEffects();
			}

			variables.current.flickTarget = null;
		} else {
			variables.current.isDragging = false;

			variables.current.lastInputType = 'drag';

			if (variables.current.flickTarget) {
				const
					{overscrollEffectOn} = props,
					{targetX, targetY} = variables.current.flickTarget;

				if (!variables.current.isTouching) {
					variables.current.isScrollAnimationTargetAccumulated = false;
					start({targetX, targetY, overscrollEffect: overscrollEffectOn.drag});
				} else if (variables.current.overscrollEnabled && overscrollEffectOn.drag) {
					checkAndApplyOverscrollEffectOnDrag(targetX, targetY, overscrollTypeOnce);
				}
			} else if (!variables.current.isTouching) {
				stop();
			}

			if (variables.current.overscrollEnabled) { // not check props.overscrollEffectOn.drag for safety
				clearAllOverscrollEffects();
			}

			variables.current.isTouching = false;
			variables.current.flickTarget = null;
		}
	}

	function onFlick (ev) {
		const {direction} = props;

		if (type === 'JS' || !variables.current.isTouching) {
			variables.current.flickTarget = variables.current.animator.simulate(
				variables.current.scrollLeft,
				variables.current.scrollTop,
				(direction !== 'vertical') ? getRtlX(-ev.velocityX) : 0,
				(direction !== 'horizontal') ? -ev.velocityY : 0
			);
		} else if (variables.current.overscrollEnabled && props.overscrollEffectOn.drag) {
			variables.current.flickTarget = {
				targetX: variables.current.scrollLeft + getRtlX(-ev.velocityX) * overscrollVelocityFactor, // 'horizontal' or 'both'
				targetY: variables.current.scrollTop + -ev.velocityY * overscrollVelocityFactor // 'vertical' or 'both'
			};
		}

		if (props.onFlick) {
			forward('onFlick', ev, props);
		}
	}

	function calculateDistanceByWheel (deltaMode, delta, maxPixel) {
		if (deltaMode === 0) {
			delta = clamp(-maxPixel, maxPixel, ri.scale(delta * variables.current.scrollWheelMultiplierForDeltaPixel));
		} else if (deltaMode === 1) { // line; firefox
			delta = clamp(-maxPixel, maxPixel, ri.scale(delta * variables.current.pixelPerLine * variables.current.scrollWheelMultiplierForDeltaPixel));
		} else if (deltaMode === 2) { // page
			delta = delta < 0 ? -maxPixel : maxPixel;
		}

		return delta;
	}

	/*
	* wheel event handler;
	* - for horizontal scroll, supports wheel action on any children nodes since web engine cannot support this
	* - for vertical scroll, supports wheel action on scrollbars only
	*/
	// esline-disable-next-line react-hooks/exhaustive-deps
	function onWheel (ev) {
		if (variables.current.isDragging) {
			ev.preventDefault();
			ev.stopPropagation();
		} else {
			const
				// Native [[
				{overscrollEffectOn} = props,
				overscrollEffectRequired = variables.current.overscrollEnabled && overscrollEffectOn.wheel,
				// Native ]]
				bounds = getScrollBounds(),
				canScrollH = canScrollHorizontally(bounds),
				canScrollV = canScrollVertically(bounds),
				eventDeltaMode = ev.deltaMode,
				eventDelta = (-ev.wheelDeltaY || ev.deltaY);
			let
				delta = 0,
				direction, // JS
				needToHideThumb = false; // Native

			variables.current.lastInputType = 'wheel';

			if (props.noScrollByWheel) {
				if (type === 'Native' && canScrollV) {
					ev.preventDefault();
				}

				return;
			}

			if (type === 'JS') {
				if (canScrollV) {
					delta = calculateDistanceByWheel(eventDeltaMode, eventDelta, bounds.clientHeight * scrollWheelPageMultiplierForMaxPixel);
				} else if (canScrollH) {
					delta = calculateDistanceByWheel(eventDeltaMode, eventDelta, bounds.clientWidth * scrollWheelPageMultiplierForMaxPixel);
				}

				direction = Math.sign(delta);

				if (direction !== variables.current.wheelDirection) {
					variables.current.isScrollAnimationTargetAccumulated = false;
					variables.current.wheelDirection = direction;
				}

				forward('onWheel', {delta, horizontalScrollbarRef, verticalScrollbarRef}, props);

				if (delta !== 0) {
					scrollToAccumulatedTarget(delta, canScrollV, props.overscrollEffectOn.wheel);
					ev.preventDefault();
					ev.stopPropagation();
				}
			} else { // Native
				if (props.onWheel) {
					forward('onWheel', ev, props);
					return;
				}

				showThumb(bounds);

				// FIXME This routine is a temporary support for horizontal wheel scroll.
				// FIXME If web engine supports horizontal wheel, this routine should be refined or removed.
				if (canScrollV) { // This routine handles wheel events on scrollbars for vertical scroll.
					if (eventDelta < 0 && variables.current.scrollTop > 0 || eventDelta > 0 && variables.current.scrollTop < bounds.maxTop) {
						// Not to check if ev.target is a descendant of a wrapped component which may have a lot of nodes in it.
						if (
							horizontalScrollbarRef.current && utilDOM().containsDangerously(horizontalScrollbarRef.current.uiScrollbarContainer, ev.target) ||
							verticalScrollbarRef.current && utilDOM().containsDangerously(verticalScrollbarRef.current.uiScrollbarContainer, ev.target)
						) {
							delta = calculateDistanceByWheel(eventDeltaMode, eventDelta, bounds.clientHeight * scrollWheelPageMultiplierForMaxPixel);
							needToHideThumb = !delta;

							ev.preventDefault();
						} else if (overscrollEffectRequired) {
							checkAndApplyOverscrollEffect('vertical', eventDelta > 0 ? 'after' : 'before', overscrollTypeOnce);
						}

						ev.stopPropagation();
					} else {
						if (overscrollEffectRequired && (eventDelta < 0 && variables.current.scrollTop <= 0 || eventDelta > 0 && variables.current.scrollTop >= bounds.maxTop)) {
							applyOverscrollEffect('vertical', eventDelta > 0 ? 'after' : 'before', overscrollTypeOnce, 1);
						}

						needToHideThumb = true;
					}
				} else if (canScrollH) { // this routine handles wheel events on any children for horizontal scroll.
					if (eventDelta < 0 && variables.current.scrollLeft > 0 || eventDelta > 0 && variables.current.scrollLeft < bounds.maxLeft) {
						delta = calculateDistanceByWheel(eventDeltaMode, eventDelta, bounds.clientWidth * scrollWheelPageMultiplierForMaxPixel);
						needToHideThumb = !delta;

						ev.preventDefault();
						ev.stopPropagation();
					} else {
						if (overscrollEffectRequired && (eventDelta < 0 && variables.current.scrollLeft <= 0 || eventDelta > 0 && variables.current.scrollLeft >= bounds.maxLeft)) {
							applyOverscrollEffect('horizontal', eventDelta > 0 ? 'after' : 'before', overscrollTypeOnce, 1);
						}

						needToHideThumb = true;
					}
				}

				if (delta !== 0) {
					direction = Math.sign(delta);
					// Not to accumulate scroll position if wheel direction is different from hold direction
					if (direction !== variables.current.wheelDirection) {
						variables.current.isScrollAnimationTargetAccumulated = false;
						variables.current.wheelDirection = direction;
					}

					scrollToAccumulatedTarget(delta, canScrollV, overscrollEffectOn.wheel);
				}

				if (needToHideThumb) {
					startHidingThumb();
				}
			}
		}
	}

	// JS [[
	function scrollByPage (keyCode) {
		const
			bounds = getScrollBounds(),
			canScrollV = canScrollVertically(bounds),
			pageDistance = (isPageUp(keyCode) ? -1 : 1) * (canScrollV ? bounds.clientHeight : bounds.clientWidth) * paginationPageMultiplier;

		variables.current.lastInputType = 'pageKey';

		scrollToAccumulatedTarget(pageDistance, canScrollV, props.overscrollEffectOn.pageKey);
	}
	// JS ]]

	// Native [[
	// esline-disable-next-line react-hooks/exhaustive-deps
	function onScroll (ev) {
		let {scrollLeft, scrollTop} = ev.target;

		const
			bounds = getScrollBounds(),
			canScrollH = canScrollHorizontally(bounds);

		if (!variables.current.scrolling) {
			scrollStartOnScroll();
		}

		if (props.rtl && canScrollH) {
			scrollLeft = (platform.ios || platform.safari) ? -scrollLeft : bounds.maxLeft - scrollLeft;
		}

		if (scrollLeft !== variables.current.scrollLeft) {
			setScrollLeft(scrollLeft);
		}
		if (scrollTop !== variables.current.scrollTop) {
			setScrollTop(scrollTop);
		}

		if (uiChildAdapter.current.didScroll) {
			uiChildAdapter.current.didScroll(variables.current.scrollLeft, variables.current.scrollTop);
		}

		forwardScrollEvent('onScroll');
		variables.current.scrollStopJob.start();
	}
	// Native ]]

	function onKeyDown (ev) {
		if (type === 'Native' || props.onKeyDown) {
			forward('onKeyDown', ev, props);
		} else if ((isPageUp(ev.keyCode) || isPageDown(ev.keyCode))) {
			scrollByPage(ev.keyCode);
		}
	} // esline-disable-line react-hooks/exhaustive-deps

	function scrollToAccumulatedTarget (delta, vertical, overscrollEffect) {
		if (!variables.current.isScrollAnimationTargetAccumulated) {
			variables.current.accumulatedTargetX = variables.current.scrollLeft;
			variables.current.accumulatedTargetY = variables.current.scrollTop;
			variables.current.isScrollAnimationTargetAccumulated = true;
		}

		if (vertical) {
			variables.current.accumulatedTargetY += delta;
		} else {
			variables.current.accumulatedTargetX += delta;
		}

		start({targetX: variables.current.accumulatedTargetX, targetY: variables.current.accumulatedTargetY, overscrollEffect});
	}

	// overscroll effect

	function getEdgeFromPosition (position, maxPosition) {
		if (position <= 0) {
			return 'before';
		/* If a scroll size or a client size is not integer,
			browser's max scroll position could be smaller than maxPos by 1 pixel.*/
		} else if (type === 'JS' && position >= maxPosition || type === 'Native' && position >= maxPosition - 1) {
			return 'after';
		} else {
			return null;
		}
	}

	function setOverscrollStatus (orientation, edge, overScrollType, ratio) {
		const status = variables.current.overscrollStatus[orientation][edge];
		status.type = overScrollType;
		status.ratio = ratio;
	}

	function getOverscrollStatus (orientation, edge) {
		return (variables.current.overscrollStatus[orientation][edge]);
	}

	function calculateOverscrollRatio (orientation, position) {
		const
			bounds = getScrollBounds(),
			isVertical = (orientation === 'vertical'),
			baseSize = isVertical ? bounds.clientHeight : bounds.clientWidth,
			maxPos = bounds[isVertical ? 'maxTop' : 'maxLeft'];
		let overDistance = 0;

		if (position < 0) {
			overDistance = -position;
		} else if (position > maxPos) {
			overDistance = position - maxPos;
		} else {
			return 0;
		}

		return Math.min(1, 2 * overDistance / baseSize);
	}

	function applyOverscrollEffect (orientation, edge, overScrollType, ratio) {
		props.applyOverscrollEffect(orientation, edge, overScrollType, ratio);
		setOverscrollStatus(orientation, edge, overScrollType === overscrollTypeOnce ? overscrollTypeDone : type, ratio);
	}

	function checkAndApplyOverscrollEffect (orientation, edge, overScrollType, ratio = 1) {
		const
			isVertical = (orientation === 'vertical'),
			curPos = isVertical ? variables.current.scrollTop : variables.current.scrollLeft,
			maxPos = getScrollBounds()[isVertical ? 'maxTop' : 'maxLeft'];

		if (
			overScrollType === 'JS' && (edge === 'before' && curPos <= 0) || (edge === 'after' && curPos >= maxPos) ||
			overScrollType === 'Native' && (edge === 'before' && curPos <= 0) || (edge === 'after' && curPos >= maxPos - 1)
		) { // Already on the edge
			applyOverscrollEffect(orientation, edge, overScrollType, ratio);
		} else {
			setOverscrollStatus(orientation, edge, overScrollType, ratio);
		}
	}

	function clearOverscrollEffect (orientation, edge) {
		if (getOverscrollStatus(orientation, edge).type !== overscrollTypeNone) {
			if (props.clearOverscrollEffect) {
				props.clearOverscrollEffect(orientation, edge);
			} else {
				applyOverscrollEffect(orientation, edge, overscrollTypeNone, 0);
			}
		}
	}

	function clearAllOverscrollEffects () {
		['horizontal', 'vertical'].forEach((orientation) => {
			['before', 'after'].forEach((edge) => {
				clearOverscrollEffect(orientation, edge);
			});
		});
	}

	function applyOverscrollEffectOnDrag (orientation, edge, targetPosition, overScrollType) {
		if (edge) {
			const
				oppositeEdge = edge === 'before' ? 'after' : 'before',
				ratio = calculateOverscrollRatio(orientation, targetPosition);

			applyOverscrollEffect(orientation, edge, overScrollType, ratio);
			clearOverscrollEffect(orientation, oppositeEdge);
		} else {
			clearOverscrollEffect(orientation, 'before');
			clearOverscrollEffect(orientation, 'after');
		}
	}

	// Native [[
	function checkAndApplyOverscrollEffectOnDrag (targetX, targetY, overScrollType) {
		const bounds = getScrollBounds();

		if (canScrollHorizontally(bounds)) {
			applyOverscrollEffectOnDrag('horizontal', getEdgeFromPosition(targetX, bounds.maxLeft), targetX, overScrollType);
		}

		if (canScrollVertically(bounds)) {
			applyOverscrollEffectOnDrag('vertical', getEdgeFromPosition(targetY, bounds.maxTop), targetY, overScrollType);
		}
	}
	// Native ]]

	function checkAndApplyOverscrollEffectOnScroll (orientation) {
		['before', 'after'].forEach((edge) => {
			const {ratio, overScrollType} = getOverscrollStatus(orientation, edge);

			if (overScrollType === overscrollTypeOnce) {
				checkAndApplyOverscrollEffect(orientation, edge, overScrollType, ratio);
			}
		});
	}

	function checkAndApplyOverscrollEffectOnStart (orientation, edge, targetPosition) {
		if (variables.current.isDragging) {
			applyOverscrollEffectOnDrag(orientation, edge, targetPosition, overscrollTypeHold);
		} else if (edge) {
			checkAndApplyOverscrollEffect(orientation, edge, overscrollTypeOnce);
		}
	}

	// call scroll callbacks

	// esline-disable-next-line react-hooks/exhaustive-deps
	function forwardScrollEvent (overScrollType, reachedEdgeInfo) {
		forward(overScrollType, {scrollLeft: variables.current.scrollLeft, scrollTop: variables.current.scrollTop, moreInfo: getMoreInfo(), reachedEdgeInfo}, props);
	}

	// Native [[
	// call scroll callbacks and update scrollbars for native scroll

	function scrollStartOnScroll () {
		variables.current.scrolling = true;
		showThumb(getScrollBounds());
		forwardScrollEvent('onScrollStart');
	}

	function scrollStopOnScroll () {
		if (props.scrollStopOnScroll) {
			props.scrollStopOnScroll();
		}
		if (variables.current.overscrollEnabled && !variables.current.isDragging) { // not check props.overscrollEffectOn for safety
			clearAllOverscrollEffects();
		}
		variables.current.lastInputType = null;
		variables.current.isScrollAnimationTargetAccumulated = false;
		variables.current.scrolling = false;
		forwardScrollEvent('onScrollStop', getReachedEdgeInfo());
		startHidingThumb();
	}
	// Native ]]

	// update scroll position

	function setScrollLeft (value) {
		const bounds = getScrollBounds();

		variables.current.scrollLeft = clamp(0, bounds.maxLeft, value);

		if (variables.current.overscrollEnabled && props.overscrollEffectOn[variables.current.lastInputType]) {
			checkAndApplyOverscrollEffectOnScroll('horizontal');
		}

		if (isHorizontalScrollbarVisible) {
			updateThumb(horizontalScrollbarRef, bounds);
		}
	}

	function setScrollTop (value) {
		const bounds = getScrollBounds();

		variables.current.scrollTop = clamp(0, bounds.maxTop, value);

		if (variables.current.overscrollEnabled && props.overscrollEffectOn[variables.current.lastInputType]) {
			checkAndApplyOverscrollEffectOnScroll('vertical');
		}

		if (isVerticalScrollbarVisible) {
			updateThumb(verticalScrollbarRef, bounds);
		}
	}

	// esline-disable-next-line react-hooks/exhaustive-deps
	function getReachedEdgeInfo () {
		const
			bounds = getScrollBounds(),
			reachedEdgeInfo = {bottom: false, left: false, right: false, top: false};

		if (canScrollHorizontally(bounds)) {
			const
				edge = getEdgeFromPosition(variables.current.scrollLeft, bounds.maxLeft);

			if (edge) { // if edge is null, no need to check which edge is reached.
				if ((edge === 'before' && !rtl) || (edge === 'after' && rtl)) {
					reachedEdgeInfo.left = true;
				} else {
					reachedEdgeInfo.right = true;
				}
			}
		}

		if (canScrollVertically(bounds)) {
			const edge = getEdgeFromPosition(variables.current.scrollTop, bounds.maxTop);

			if (edge === 'before') {
				reachedEdgeInfo.top = true;
			} else if (edge === 'after') {
				reachedEdgeInfo.bottom = true;
			}
		}

		return reachedEdgeInfo;
	}

	// scroll start/stop

	// JS [[
	function doScrollStop () {
		variables.current.scrolling = false;
		forwardScrollEvent('onScrollStop', getReachedEdgeInfo());
	}
	// JS ]]

	function start ({targetX, targetY, animate = true, duration = animationDuration, overscrollEffect = false}) {
		const
			{scrollLeft, scrollTop} = variables.current,
			bounds = getScrollBounds(),
			{maxLeft, maxTop} = bounds;

		const updatedAnimationInfo = type === 'JS' ?
			{
				sourceX: scrollLeft,
				sourceY: scrollTop,
				targetX,
				targetY,
				duration
			} :
			{
				targetX,
				targetY
			};

		// bail early when scrolling to the same position
		if (
			(type === 'JS' && variables.current.animator.isAnimating() || type === 'Native' && variables.current.scrolling) &&
			variables.current.animationInfo &&
			variables.current.animationInfo.targetX === targetX &&
			variables.current.animationInfo.targetY === targetY
		) {
			return;
		}

		variables.current.animationInfo = updatedAnimationInfo;

		if (type === 'JS') {
			variables.current.animator.stop();

			if (!variables.current.scrolling) {
				variables.current.scrolling = true;
				forwardScrollEvent('onScrollStart');
			}

			variables.current.scrollStopJob.stop();
		}

		if (Math.abs(maxLeft - targetX) < epsilon) {
			targetX = maxLeft;
		}

		if (Math.abs(maxTop - targetY) < epsilon) {
			targetY = maxTop;
		}

		if (variables.current.overscrollEnabled && overscrollEffect) {
			if (scrollLeft !== targetX && canScrollHorizontally(bounds)) {
				checkAndApplyOverscrollEffectOnStart('horizontal', getEdgeFromPosition(targetX, maxLeft), targetX);
			}
			if (scrollTop !== targetY && canScrollVertically(bounds)) {
				checkAndApplyOverscrollEffectOnStart('vertical', getEdgeFromPosition(targetY, maxTop), targetY);
			}
		}

		if (type === 'JS') {
			showThumb(bounds);

			if (animate) {
				variables.current.animator.animate(scrollAnimation(variables.current.animationInfo));
			} else {
				scroll(targetX, targetY, targetX, targetY);
				stop();
			}
		} else { // Native
			if (animate) {
				uiChildAdapter.current.scrollToPosition(targetX, targetY);
			} else {
				uiChildContainerRef.current.style.scrollBehavior = null;
				uiChildAdapter.current.scrollToPosition(targetX, targetY);
				uiChildContainerRef.current.style.scrollBehavior = 'smooth';
			}

			variables.current.scrollStopJob.start();

			if (props.start) {
				props.start(animate);
			}
		}
	}

	function stopForJS () {
		variables.current.animator.stop();
		variables.current.lastInputType = null;
		variables.current.isScrollAnimationTargetAccumulated = false;
		startHidingThumb();

		if (variables.current.overscrollEnabled && !variables.current.isDragging) { // not check props.overscrollEffectOn for safety
			clearAllOverscrollEffects();
		}

		if (props.stop) {
			props.stop();
		}

		if (variables.current.scrolling) {
			variables.current.scrollStopJob.start();
		}
	}

	function stopForNative () {
		uiChildContainerRef.current.style.scrollBehavior = null;
		uiChildAdapter.current.scrollToPosition(variables.current.scrollLeft + 0.1, variables.current.scrollTop + 0.1);
		uiChildContainerRef.current.style.scrollBehavior = 'smooth';
	}

	// esline-disable-next-line react-hooks/exhaustive-deps
	function stop () {
		if (type === 'JS') {
			stopForJS();
		} else {
			stopForNative();
		}
	}

	// JS [[
	function scrollAnimation (animationInfo) {
		return (curTime) => {
			const
				{sourceX, sourceY, targetX, targetY, duration} = animationInfo,
				bounds = getScrollBounds();

			if (curTime < duration) {
				let
					toBeContinued = false,
					curTargetX = sourceX,
					curTargetY = sourceY;

				if (canScrollHorizontally(bounds)) {
					curTargetX = variables.current.animator.timingFunction(sourceX, targetX, duration, curTime);

					if (Math.abs(curTargetX - targetX) < epsilon) {
						curTargetX = targetX;
					} else {
						toBeContinued = true;
					}
				}

				if (canScrollVertically(bounds)) {
					curTargetY = variables.current.animator.timingFunction(sourceY, targetY, duration, curTime);

					if (Math.abs(curTargetY - targetY) < epsilon) {
						curTargetY = targetY;
					} else {
						toBeContinued = true;
					}
				}

				scroll(curTargetX, curTargetY, targetX, targetY);

				if (!toBeContinued) {
					stop();
				}
			} else {
				scroll(targetX, targetY, targetX, targetY);
				stop();
			}
		};
	}

	function scroll (left, top, ...restParams) {
		if (left !== variables.current.scrollLeft) {
			setScrollLeft(left);
		}

		if (top !== variables.current.scrollTop) {
			setScrollTop(top);
		}

		uiChildAdapter.current.setScrollPosition(variables.current.scrollLeft, variables.current.scrollTop, props.rtl, ...restParams);
		forwardScrollEvent('onScroll');
	}
	// JS ]]

	// scrollTo API

	function getPositionForScrollTo (opt) {
		const
			bounds = getScrollBounds(),
			canScrollH = canScrollHorizontally(bounds),
			canScrollV = canScrollVertically(bounds);
		let
			itemPos,
			left = null,
			top = null;

		if (opt instanceof Object) {
			if (opt.position instanceof Object) {
				if (canScrollH) {
					// We need '!=' to check if opt.position.x is null or undefined
					left = opt.position.x != null ? opt.position.x : variables.current.scrollLeft;
				} else {
					left = 0;
				}

				if (canScrollV) {
					// We need '!=' to check if opt.position.y is null or undefined
					top = opt.position.y != null ? opt.position.y : variables.current.scrollTop;
				} else {
					top = 0;
				}
			} else if (typeof opt.align === 'string') {
				if (canScrollH) {
					if (opt.align.includes('left')) {
						left = 0;
					} else if (opt.align.includes('right')) {
						left = bounds.maxLeft;
					}
				}

				if (canScrollV) {
					if (opt.align.includes('top')) {
						top = 0;
					} else if (opt.align.includes('bottom')) {
						top = bounds.maxTop;
					}
				}
			} else {
				if (typeof opt.index === 'number' && typeof uiChildAdapter.current.getItemPosition === 'function') {
					itemPos = uiChildAdapter.current.getItemPosition(opt.index, opt.stickTo);
				} else if (opt.node instanceof Object) {
					if (opt.node.nodeType === 1 && typeof uiChildAdapter.current.getNodePosition === 'function') {
						itemPos = uiChildAdapter.current.getNodePosition(opt.node);
					}
				}

				if (itemPos) {
					if (canScrollH) {
						left = itemPos.left;
					}
					if (canScrollV) {
						top = itemPos.top;
					}
				}
			}
		}

		return {left, top};
	}

	// esline-disable-next-line react-hooks/exhaustive-deps
	function scrollTo (opt) {
		if (!variables.current.deferScrollTo) {
			const {left, top} = getPositionForScrollTo(opt);

			if (props.scrollTo) {
				props.scrollTo(opt);
			}

			variables.current.scrollToInfo = null;
			start({
				targetX: (left !== null) ? left : variables.current.scrollLeft,
				targetY: (top !== null) ? top : variables.current.scrollTop,
				animate: opt.animate
			});
		} else {
			variables.current.scrollToInfo = opt;
		}
	}

	function canScrollHorizontally (bounds) {
		const {direction} = props;
		return (direction === 'horizontal' || direction === 'both') && (bounds.scrollWidth > bounds.clientWidth) && !isNaN(bounds.scrollWidth);
	}

	function canScrollVertically (bounds) {
		const {direction} = props;
		return (direction === 'vertical' || direction === 'both') && (bounds.scrollHeight > bounds.clientHeight) && !isNaN(bounds.scrollHeight);
	}

	// scroll bar

	function showThumb (bounds) {
		if (isHorizontalScrollbarVisible && canScrollHorizontally(bounds) && horizontalScrollbarRef.current) {
			horizontalScrollbarRef.current.showThumb();
		}

		if (isVerticalScrollbarVisible && canScrollVertically(bounds) && verticalScrollbarRef.current) {
			verticalScrollbarRef.current.showThumb();
		}
	}

	function updateThumb (scrollbarRef, bounds) {
		scrollbarRef.current.update({
			...bounds,
			scrollLeft: variables.current.scrollLeft,
			scrollTop: variables.current.scrollTop
		});
	}

	function startHidingThumb () {
		if (isHorizontalScrollbarVisible && horizontalScrollbarRef.current) {
			horizontalScrollbarRef.current.startHidingThumb();
		}

		if (isVerticalScrollbarVisible && verticalScrollbarRef.current) {
			verticalScrollbarRef.current.startHidingThumb();
		}
	}

	// esline-disable-next-line react-hooks/exhaustive-deps
	function updateScrollbars () {
		const
			{horizontalScrollbar, verticalScrollbar} = props,
			bounds = getScrollBounds(),
			canScrollH = canScrollHorizontally(bounds),
			canScrollV = canScrollVertically(bounds),
			curHorizontalScrollbarVisible = (horizontalScrollbar === 'auto') ? canScrollH : horizontalScrollbar === 'visible',
			curVerticalScrollbarVisible = (verticalScrollbar === 'auto') ? canScrollV : verticalScrollbar === 'visible';

		// determine if we should hide or show any scrollbars
		const
			isVisibilityChanged = (
				isHorizontalScrollbarVisible !== curHorizontalScrollbarVisible ||
				isVerticalScrollbarVisible !== curVerticalScrollbarVisible
			);

		if (isVisibilityChanged) {
			// one or both scrollbars have changed visibility
			setIsHorizontalScrollbarVisible(curHorizontalScrollbarVisible);
			setIsVerticalScrollbarVisible(curVerticalScrollbarVisible);
		} else {
			variables.current.deferScrollTo = false;
			variables.current.isUpdatedScrollThumb = updateScrollThumbSize();
		}
	}

	// esline-disable-next-line react-hooks/exhaustive-deps
	function updateScrollThumbSize () {
		const
			{horizontalScrollbar, verticalScrollbar} = props,
			bounds = getScrollBounds(),
			canScrollH = canScrollHorizontally(bounds),
			canScrollV = canScrollVertically(bounds),
			curHorizontalScrollbarVisible = (horizontalScrollbar === 'auto') ? canScrollH : horizontalScrollbar === 'visible',
			curVerticalScrollbarVisible = (verticalScrollbar === 'auto') ? canScrollV : verticalScrollbar === 'visible';

		if (curHorizontalScrollbarVisible || curVerticalScrollbarVisible) {
			// no visibility change but need to notify whichever scrollbars are visible of the
			// updated bounds and scroll position
			const updatedBounds = {
				...bounds,
				scrollLeft: variables.current.scrollLeft,
				scrollTop: variables.current.scrollTop
			};

			if (curHorizontalScrollbarVisible && horizontalScrollbarRef.current) {
				horizontalScrollbarRef.current.update(updatedBounds);
			}

			if (curVerticalScrollbarVisible && verticalScrollbarRef.current) {
				verticalScrollbarRef.current.update(updatedBounds);
			}

			return true;
		}

		return false;
	}

	// ref

	function getScrollBounds () {
		if (uiChildAdapter.current && typeof uiChildAdapter.current.getScrollBounds === 'function') {
			return uiChildAdapter.current.getScrollBounds();
		}
	}

	function getMoreInfo () {
		if (uiChildAdapter.current && typeof uiChildAdapter.current.getMoreInfo === 'function') {
			return uiChildAdapter.current.getMoreInfo();
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function addEventListeners () {
		utilEvent('wheel').addEventListener(scrollableContainerRef, onWheel);
		utilEvent('keydown').addEventListener(scrollableContainerRef, onKeyDown);
		utilEvent('mousedown').addEventListener(scrollableContainerRef, onMouseDown);

		// Native [[
		if (uiChildContainerRef.current) {
			utilEvent('scroll').addEventListener(
				uiChildContainerRef,
				onScroll,
				{capture: true, passive: true}
			);

			uiChildContainerRef.current.style.scrollBehavior = 'smooth';
		}
		// Native ]]

		if (props.addEventListeners) {
			props.addEventListeners(uiChildContainerRef);
		}

		if (window) {
			utilEvent('resize').addEventListener(window, handleResizeWindow);
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function removeEventListeners () {
		utilEvent('wheel').removeEventListener(scrollableContainerRef, onWheel);
		utilEvent('keydown').removeEventListener(scrollableContainerRef, onKeyDown);
		utilEvent('mousedown').removeEventListener(scrollableContainerRef, onMouseDown);

		// Native [[
		utilEvent('scroll').removeEventListener(uiChildContainerRef, onScroll, {capture: true, passive: true});
		// Native ]]

		if (props.removeEventListeners) {
			props.removeEventListeners(uiChildContainerRef);
		}

		utilEvent('resize').removeEventListener(window, handleResizeWindow);
	}

	// render

	// JS [[
	function handleScroll () {
		// Prevent scroll by focus.
		// VirtualList and VirtualGridList DO NOT receive `onscroll` event.
		// Only Scroller could get `onscroll` event.
		if (!variables.current.animator.isAnimating() && uiChildAdapter.current && uiChildContainerRef.current && uiChildAdapter.current.getRtlPositionX) {
			// For Scroller
			uiChildContainerRef.current.scrollTop = variables.current.scrollTop;
			uiChildContainerRef.current.scrollLeft = uiChildAdapter.current.getRtlPositionX(variables.current.scrollLeft);
		}
	}
	// JS ]]

	function dangerouslyContainsInScrollable (target) {
		return utilDOM().containsDangerously(scrollableContainerRef, target);
	}

	variables.current.deferScrollTo = true;

	decorateChildProps('scrollableContainerProps', {
		className: [scrollableClasses],
		style
	});

	decorateChildProps('flexLayoutProps', {
		className: [css.flexLayout]
	});

	decorateChildProps('childWrapperProps', {
		className: type === 'JS' ? [css.content] : [css.content, css.contentNative], // Native;,
		...(!noScrollByDrag && {
			flickConfig,
			onDrag: onDrag,
			onDragEnd: onDragEnd,
			onDragStart: onDragStart,
			onFlick: onFlick,
			onTouchStart: onTouchStart // Native
		})
	});

	decorateChildProps('childProps', {
		...rest,
		cbScrollTo: scrollTo,
		className: [css.scrollableFill],
		dangerouslyContainsInScrollable,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,
		onScroll: type === 'JS' ? handleScroll : null,
		rtl,
		setUiChildAdapter,
		type
	});

	decorateChildProps('verticalScrollbarProps', {
		clientSize: props.clientSize,
		disabled: !isVerticalScrollbarVisible,
		rtl,
		vertical: true
	});

	decorateChildProps('horizontalScrollbarProps', {
		clientSize: props.clientSize,
		corner: isVerticalScrollbarVisible,
		disabled: !isHorizontalScrollbarVisible,
		rtl,
		vertical: false
	});

	decorateChildProps('resizeContextProps', {
		value: variables.current.resizeRegistry.register
	});

	return {
		childWrapper: noScrollByDrag ? 'div' : TouchableDiv,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	};
};

const ScrollableBase = {};

ScrollableBase.displayName = 'ui:ScrollableBase';

ScrollableBase.propTypes = /** @lends ui/Scrollable.Scrollable.prototype */ {
	/**
	 * Render function.
	 *
	 * @type {Function}
	 * @required
	 * @private
	 */
	containerRenderer: PropTypes.func.isRequired,

	/**
	 * Called when adding additional event listeners in a themed component.
	 *
	 * @type {Function}
	 * @private
	 */
	addEventListeners: PropTypes.func,

	/**
	 * Called to execute additional logic in a themed component to show overscroll effect.
	 *
	 * @type {Function}
	 * @private
	 */
	applyOverscrollEffect: PropTypes.func,

	/**
	 * A callback function that receives a reference to the `scrollTo` feature.
	 *
	 * Once received, the `scrollTo` method can be called as an imperative interface.
	 *
	 * The `scrollTo` function accepts the following parameters:
	 * - {position: {x, y}} - Pixel value for x and/or y position
	 * - {align} - Where the scroll area should be aligned. Values are:
	 *   `'left'`, `'right'`, `'top'`, `'bottom'`,
	 *   `'topleft'`, `'topright'`, `'bottomleft'`, and `'bottomright'`.
	 * - {index} - Index of specific item. (`0` or positive integer)
	 *   This option is available for only `VirtualList` kind.
	 * - {node} - Node to scroll into view
	 * - {animate} - When `true`, scroll occurs with animation. When `false`, no
	 *   animation occurs.
	 * - {focus} - When `true`, attempts to focus item after scroll. Only valid when scrolling
	 *   by `index` or `node`.
	 * > Note: Only specify one of: `position`, `align`, `index` or `node`
	 *
	 * Example:
	 * ```
	 *	// If you set cbScrollTo prop like below;
	 *	cbScrollTo: (fn) => {scrollTo = fn;}
	 *	// You can simply call like below;
	 *	scrollTo({align: 'top'}); // scroll to the top
	 * ```
	 *
	 * @type {Function}
	 * @public
	 */
	cbScrollTo: PropTypes.func,

	/**
	 * Called to execute additional logic in a themed component to clear overscroll effect.
	 *
	 * @type {Function}
	 * @private
	 */
	clearOverscrollEffect: PropTypes.func,

	/**
	 * Client size of the container; valid values are an object that has `clientWidth` and `clientHeight`.
	 *
	 * @type {Object}
	 * @property {Number}	clientHeight	The client height of the list.
	 * @property {Number}	clientWidth	The client width of the list.
	 * @public
	 */
	clientSize: PropTypes.shape({
		clientHeight: PropTypes.number.isRequired,
		clientWidth: PropTypes.number.isRequired
	}),

	/**
	 * Direction of the list or the scroller.
	 *
	 * `'both'` could be only used for[Scroller]{@link ui/Scroller.Scroller}.
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
	 * Called when resizing window
	 *
	 * @type {Function}
	 * @private
	 */
	handleResizeWindow: PropTypes.func,

	/**
	 * Specifies how to show horizontal scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	horizontalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

	/**
	 * Prevents scroll by dragging or flicking on the list or the scroller.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	noScrollByDrag: PropTypes.bool,

	/**
	 * Prevents scroll by wheeling on the list or the scroller.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noScrollByWheel: PropTypes.bool,

	/**
	 * Called when triggering a drag event in JavaScript scroller.
	 *
	 * @type {Function}
	 * @private
	 */
	onDrag: PropTypes.func,

	/**
	 * Called when triggering a dragend event in JavaScript scroller.
	 *
	 * @type {Function}
	 * @private
	 */
	onDragEnd: PropTypes.func,

	/**
	 * Called when triggering a dragstart event in JavaScript scroller.
	 *
	 * @type {Function}
	 * @private
	 */
	onDragStart: PropTypes.func,

	/**
	 * Called when flicking with a mouse or a touch screen.
	 *
	 * @type {Function}
	 * @private
	 */
	onFlick: PropTypes.func,

	/**
	 * Called when pressing a key.
	 *
	 * @type {Function}
	 * @private
	 */
	onKeyDown: PropTypes.func,

	/**
	 * Called when triggering a mousedown event.
	 *
	 * @type {Function}
	 * @private
	 */
	onMouseDown: PropTypes.func,

	/**
	 * Called when scrolling.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * It is not recommended to set this prop since it can cause performance degradation.
	 * Use `onScrollStart` or `onScrollStop` instead.
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScroll: PropTypes.func,

	/**
	 * Called when scroll starts.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * You can get firstVisibleIndex and lastVisibleIndex from VirtualList with `moreInfo`.
	 *
	 * Example:
	 * ```
	 * onScrollStart = ({scrollLeft, scrollTop, moreInfo}) => {
	 *	 const {firstVisibleIndex, lastVisibleIndex} = moreInfo;
	 *	 // do something with firstVisibleIndex and lastVisibleIndex
	 * }
	 *
	 * render = () => (
	 *	 <VirtualList
	 *		 ...
	 *		 onScrollStart={onScrollStart}
	 *		 ...
	 *	 />
	 * )
	 * ```
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScrollStart: PropTypes.func,

	/**
	 * Called when scroll stops.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * You can get firstVisibleIndex and lastVisibleIndex from VirtualList with `moreInfo`.
	 *
	 * Example:
	 * ```
	 * onScrollStop = ({scrollLeft, scrollTop, moreInfo}) => {
	 *	 const {firstVisibleIndex, lastVisibleIndex} = moreInfo;
	 *	 // do something with firstVisibleIndex and lastVisibleIndex
	 * }
	 *
	 * render = () => (
	 *	 <VirtualList
	 *		 ...
	 *		 onScrollStop={onScrollStop}
	 *		 ...
	 *	 />
	 * )
	 * ```
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScrollStop: PropTypes.func,

	/**
	 * Called when wheeling.
	 *
	 * @type {Function}
	 * @private
	 */
	onWheel: PropTypes.func,

	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {drag: false, pageKey: false, wheel: false}
	 * @private
	 */
	overscrollEffectOn: PropTypes.shape({
		drag: PropTypes.bool,
		pageKey: PropTypes.bool,
		wheel: PropTypes.bool
	}),

	/**
	 * Called when removing additional event listeners in a themed component.
	 *
	 * @type {Function}
	 * @private
	 */
	removeEventListeners: PropTypes.func,

	/**
	 * Indicates the content's text direction is right-to-left.
	 *
	 * @type {Boolean}
	 * @private
	 */
	rtl: PropTypes.bool,

	/**
	 * Called to execute additional logic in a themed component after scrolling in native scroller.
	 *
	 * @type {Function}
	 * @private
	 */
	scrollStopOnScroll: PropTypes.func,

	/**
	 * Called to execute additional logic in a themed component when scrollTo is called.
	 *
	 * @type {Function}
	 * @private
	 */
	scrollTo: PropTypes.func,

	/**
	 * Called to execute additional logic in a themed component when scroll starts in native scroller.
	 *
	 * @type {Function}
	 * @private
	 */
	start: PropTypes.func,

	/**
	 * Called to execute additional logic in a themed component when scroll stops.
	 *
	 * @type {Function}
	 * @private
	 */
	stop: PropTypes.func,

	/**
	 * TBD
	 */
	type: PropTypes.string,

	/**
	 * Specifies how to show vertical scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	verticalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden'])
};

ScrollableBase.defaultProps = {
	cbScrollTo: nop,
	horizontalScrollbar: 'auto',
	noScrollByDrag: false,
	noScrollByWheel: false,
	onScroll: nop,
	onScrollStart: nop,
	onScrollStop: nop,
	overscrollEffectOn: {drag: false, pageKey: false, wheel: false},
	type: 'JS',
	verticalScrollbar: 'auto'
};

const Scrollable = {};

Scrollable.displayName = 'ui:Scrollable';

Scrollable.propTypes = /** @lends ui/Scrollable.Scrollable.prototype */ {
	/**
	 * Render function.
	 *
	 * @type {Function}
	 * @required
	 * @private
	 */
	childRenderer: PropTypes.func.isRequired
};

ScrollableBase.defaultProps = {
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		scrollbarButton: false,
		wheel: true
	},
	type: 'JS'
};

export default Scrollable;
export {
	constants,
	Scrollable,
	ScrollableBase,
	useScrollable
};
