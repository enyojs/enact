/**
 * Exports the {@link ui/Remeasurable.RemeasurableDecorator} Higher-order Component (HOC).
 * Adds a the ability to broadcast remeasure changes based on a callback. The default export is {@link ui/Remeasurable.Remeasurable}.
 *
 * @module ui/Remeasurable
 * @private
 */
import React from 'react';
import hoc from '@enact/core/hoc';
import {Broadcast, Subscriber} from '../Broadcast';

const defaultConfig = {
	/**
	 * Configures the event name that triggers the component
	 *
	 * @type {String}
	 * @memberof ui/Remeasurable.Remeasurable.defaultConfig
	 */
	trigger: ''
};

// Used to get most recent update.
const perfNow = function () {
	if (typeof window === 'object') {
		return window.performance.now();
	} else {
		return Date.now();
	}
};

/**
 * {@link ui/Remeasurable.RemeasurableDecorator} is a Higher-order Component which
 * Adds a the ability to broadcast remeasure changes based on a callback.
 *
 * @class RemeasurableDecorator
 * @memberof ui/Remeasurable
 * @hoc
 * @private
 */
const RemeasurableDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {trigger} = config;
	return class extends React.Component {
		static displayName = 'RemeasurableDecorator'

		constructor (props) {
			super(props);
			this.state = {
				remeasure: perfNow()
			};
		}

		triggerRemeasure = () => {
			this.setState({remeasure: perfNow()});
		}

		render () {
			const props = Object.assign({}, this.props);
			props[trigger] = this.triggerRemeasure;

			return (
				<Subscriber channel="remeasure">
					{(value) => (
						<Broadcast channel="remeasure" value={this.state.remeasure > value ? this.state.remeasure : value}>
							<Wrapped {...props} />
						</Broadcast>
					)}
				</Subscriber>
			);
		}
	};
});


/**
 * {@link ui/Remeasurable.Remeasurable} is a Higher-order Component which
 * notifies a child of a change in size from parent. This can then be used to trigger
 * a new measurement. A `remeasure` prop will be passed down to the wrapped component.
 *
 * @class Remeasurable
 * @memberof ui/Remeasurable
 * @hoc
 * @private
 */
const Remeasurable = (Wrapped) => {
	return class extends React.Component {
		static displayName = 'Remeasurable'

		constructor (props) {
			super(props);
		}

		render () {
			return (
				<Subscriber channel="remeasure">
					{(value) => <Wrapped {...this.props} remeasure={value} />}
				</Subscriber>
			);
		}
	};
};

/**
 * {@link ui/Remeasurable.Remeasurable} is a Higher-order Component which
 * notifies a child of a change in size from parent. This can then be used to trigger
 * a new measurement. A `remeasure` prop will be passed down to the wrapped component.
 *
 * @class Remeasurable
 * @memberof ui/Remeasurable
 * @hoc
 * @private
 */

export default Remeasurable;
export {Remeasurable, RemeasurableDecorator};
