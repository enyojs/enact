import classNames from 'classnames';
import {Job} from '@enact/core/util';
import PropTypes from 'prop-types';
import React, {forwardRef, memo, useEffect, useImperativeHandle, useRef} from 'react';
import ReactDOM from 'react-dom';

import ri from '../resolution';

import ScrollThumb from './ScrollThumb';

import componentCss from './Scrollbar.module.less';

const
	minThumbSize = 18, // Size in pixels
	thumbHidingDelay = 400; // in milliseconds

const addClass = (element, className) => {
	ReactDOM.findDOMNode(element).classList.add(className); // eslint-disable-line react/no-find-dom-node
};

const removeClass = (element, className) => {
	ReactDOM.findDOMNode(element).classList.remove(className); // eslint-disable-line react/no-find-dom-node
};

/*
 * Set CSS Varaible value.
 *
 * @method
 * @param {Node} element - Node.
 * @param {String} variable - CSS Variable property.
 * @param {String} value - CSS Variable value.
 */
const setCSSVariable = (element, variable, value) => {
	ReactDOM.findDOMNode(element).style.setProperty(variable, value); // eslint-disable-line react/no-find-dom-node
};

/**
 * An unstyled base component for a scroll bar. It is used in [Scrollable]{@link ui/Scrollable.Scrollable}.
 *
 * @function ScrollbarBase
 * @memberof ui/Scrollable
 * @ui
 * @private
 */
const ScrollbarBase = memo(forwardRef((props, ref) => {
	// Refs
	const containerRef = useRef();
	const thumbRef = useRef();
	const hideThumbJob = useRef(new Job(hideThumb, thumbHidingDelay));
	// Render
	const
		{childRenderer, className, corner, css, vertical, ...rest} = props,
		containerClassName = classNames(
			className,
			css.scrollbar,
			corner && css.corner,
			vertical ? css.vertical : css.horizontal
		);

	delete rest.clientSize;

	function hideThumb () {
		removeClass(thumbRef.current, css.thumbShown);
	}

	useEffect(() => {
		const job = hideThumbJob.current;
		return () => {
			job.stop();
		};
	}, []);

	useImperativeHandle(ref, () => ({
		getContainerRef: () => (containerRef),
		showThumb: () => {
			hideThumbJob.current.stop();
			addClass(thumbRef.current, css.thumbShown);
		},
		startHidingThumb: () => {
			hideThumbJob.current.start();
		},
		update: (bounds) => {
			const
				{clientSize} = props,
				primaryDimenstion = vertical ? 'clientHeight' : 'clientWidth',
				trackSize = clientSize ? clientSize[primaryDimenstion] : containerRef.current[primaryDimenstion],
				scrollViewSize = vertical ? bounds.clientHeight : bounds.clientWidth,
				scrollContentSize = vertical ? bounds.scrollHeight : bounds.scrollWidth,
				scrollOrigin = vertical ? bounds.scrollTop : bounds.scrollLeft,
				thumbSizeRatioBase = (scrollViewSize / scrollContentSize),
				scrollThumbPositionRatio = (scrollOrigin / (scrollContentSize - scrollViewSize)),
				scrollThumbSizeRatio = Math.max(ri.scale(minThumbSize) / trackSize, Math.min(1, thumbSizeRatioBase));

			setCSSVariable(thumbRef.current, '--scrollbar-size-ratio', scrollThumbSizeRatio);
			setCSSVariable(thumbRef.current, '--scrollbar-progress-ratio', scrollThumbPositionRatio);
		}
	}));

	return (
		<div {...rest} className={containerClassName} ref={containerRef}>
			{childRenderer({thumbRef})}
		</div>
	);
}));

ScrollbarBase.displayName = 'ui:Scrollbar';

ScrollbarBase.propTypes = /** @lends ui/Scrollable.Scrollbar.prototype */ {
	/**
	 * The render function for child.
	 *
	 * @type {Function}
	 * @required
	 * @private
	 */
	childRenderer: PropTypes.func.isRequired,

	/**
	 * Client size of the container; valid values are an object that has `clientWidth` and `clientHeight`.
	 *
	 * @type {Object}
	 * @property {Number}    clientHeight    The client height of the list.
	 * @property {Number}    clientWidth    The client width of the list.
	 * @public
	 */
	clientSize: PropTypes.shape({
		clientHeight: PropTypes.number.isRequired,
		clientWidth: PropTypes.number.isRequired
	}),

	/**
	 * If `true`, add the corner between vertical and horizontal scrollbars.
	 *
	 * @type {Booelan}
	 * @default false
	 * @public
	 */
	corner: PropTypes.bool,

	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal Elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `scrollbar` - The scrollbar component class
	 *
	 * @type {Object}
	 * @public
	 */
	css: PropTypes.object,

	/**
	 * If `true`, the scrollbar will be oriented vertically.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	vertical: PropTypes.bool
};

ScrollbarBase.defaultProps = {
	corner: false,
	css: componentCss,
	vertical: true
};

/**
 * An unstyled scroll bar. It is used in [Scrollable]{@link ui/Scrollable.Scrollable}.
 *
 * @class Scrollbar
 * @memberof ui/Scrollable
 * @ui
 * @private
 */
const Scrollbar = forwardRef((props, ref) => {
	const scrollbarBaseRef = useRef(null);

	useImperativeHandle(ref, () => {
		if (scrollbarBaseRef.current) {
			const {getContainerRef, showThumb, startHidingThumb, update} = scrollbarBaseRef.current;

			return {
				getContainerRef,
				showThumb,
				startHidingThumb,
				update
			};
		}
	}, [scrollbarBaseRef]);

	return (
		<ScrollbarBase
			{...props}
			ref={scrollbarBaseRef}
			childRenderer={({thumbRef}) => { // eslint-disable-line react/jsx-no-bind
				return (
					<ScrollThumb
						key="thumb"
						ref={thumbRef}
						vertical={props.vertical}
					/>
				);
			}}
		/>
	);
});

Scrollbar.propTypes = /** @lends ui/Scrollable.Scrollbar.prototype */ {
	/**
	 * If `true`, the scrollbar will be oriented vertically.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	vertical: PropTypes.bool
};

Scrollbar.defaultProps = {
	vertical: true
};

export default Scrollbar;
export {
	Scrollbar,
	ScrollbarBase,
	ScrollThumb
};
