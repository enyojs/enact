/**
 * Exports the {@link spotlight/SpotlightRootDecorator.SpotlightRootDecorator}
 * higher-order component.
 *
 * @module spotlight/SpotlightRootDecorator
 */

import hoc from '@enact/core/hoc';
import React from 'react';

import Spotlight from '../src/spotlight';
import {spottableClass} from '../Spottable';

import {rootContainerId} from '../src/container';

import '../styles/debug.less';

/**
 * Default configuration for SpotlightRootDecorator
 *
 * @hocconfig
 * @memberof spotlight/SpotlightRootDecorator.SpotlightRootDecorator
 */
const defaultConfig = {
	/**
	 * When `true`, the contents of the component will not receive spotlight focus after being rendered.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 * @memberof spotlight/SpotlightRootDecorator.SpotlightRootDecorator.defaultConfig
	 */
	noAutoFocus: false
};

/**
 * Constructs a higher-order component that initializes and enables Spotlight
 * 5-way navigation within an application.
 *
 * Example:
 * ```
 *	const App = SpotlightRootDecorator(ApplicationView);
 * ```
 * @param  {Object} defaultConfig Set of default configuration parameters
 * @param  {Function} higher-order component
 *
 * @returns {Function} SpotlightRootDecorator
 * @memberof spotlight/SpotlightRootDecorator
 * @hoc
 */
const SpotlightRootDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {noAutoFocus} = config;

	return class extends React.Component {
		static displayName = 'SpotlightRootDecorator';

		componentDidMount () {
			if (typeof window === 'object') {
				Spotlight.initialize({
					selector: '.' + spottableClass,
					restrict: 'none'
				});

				Spotlight.set(rootContainerId, {
					overflow: true
				});
			}

			if (!noAutoFocus) {
				Spotlight.focus();
			}
		}

		componentWillUnmount () {
			Spotlight.terminate();
		}

		navigableFilter = (elem) => {
			while (elem && elem !== document && elem.nodeType === 1) {
				if (elem.getAttribute('data-spotlight-container-disabled') === 'true') return false;
				elem = elem.parentNode;
			}
		}

		render () {
			return <Wrapped {...this.props} />;
		}
	};
});

export default SpotlightRootDecorator;
export {
	SpotlightRootDecorator
};
