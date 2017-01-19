import {findDOMNode} from 'react-dom';
import {forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import invariant from 'invariant';
import React from 'react';
import Spotlight from '@enact/spotlight';

import css from './Panels.less';

const spotPanel = ({view}) => {
	// eslint-disable-next-line react/no-find-dom-node
	const node = findDOMNode(view);
	if (node) {
		const body = node.querySelector('section .spottable');
		const header = node.querySelector('header .spottable');
		const spottable = body || header;

		if (spottable) {
			Spotlight.focus(spottable);
		}
	}
};

/**
 * The container for a set of Panels
 *
 * @class Viewport
 * @private
 */
const ViewportBase = kind({
	name: 'Viewport',

	propTypes: /** @lends Viewport.prototype */ {
		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport
		 *
		 * @type {Arranger}
		 */
		arranger: shape,

		/**
		 * Panels to be rendered
		 *
		 * @type {Panel}
		 */
		children: React.PropTypes.node,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 */
		index: React.PropTypes.number,

		/**
		 * Disable panel transitions
		 *
		 * @type {Boolean}
		 * @default false
		 */
		noAnimation: React.PropTypes.bool
	},

	defaultProps: {
		index: 0,
		noAnimation: false
	},

	styles: {
		css,
		className: 'viewport'
	},

	handlers: {
		onAppear: handle(forward('onAppear'), spotPanel),
		onEnter: handle(forward('onEnter'), spotPanel),
		onTransition: handle(forward('onTransition'), Spotlight.resume),
		onWillTransition: handle(forward('onWillTransition'), Spotlight.pause)
	},

	computed: {
		children: ({children}) => React.Children.map(children, (child, index) => {
			return React.cloneElement(child, {'data-index': index});
		})
	},

	render: ({arranger, children, index, noAnimation, ...rest}) => {
		const count = React.Children.count(children);
		invariant(
			index === 0 && count === 0 || index < count,
			`Panels index, ${index}, is invalid for number of children, ${count}`
		);

		return (
			<ViewManager
				{...rest}
				noAnimation={noAnimation}
				arranger={arranger}
				duration={200}
				index={index}
				component="main"
			>
				{children}
			</ViewManager>
		);
	}
});

export default ViewportBase;
export {ViewportBase as Viewport, ViewportBase};
