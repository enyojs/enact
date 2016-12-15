import hoc from '@enact/core/hoc';
import React from 'react';

/**
 * The `contextTypes` published by {@link ui/RadioDecorator.RadioContainerDecorator} to interact
 * with {@link ui/RadioDecorator.RadioDecorator} instances.
 *
 * @type {Object}
 * @private
 */
const contextTypes = {
	/**
	 * Called by a {@link ui/RadioDecorator.RadioDecorator} when it is activated
	 *
	 * @type {Function}
	 */
	activateRadioItem: React.PropTypes.func,

	/**
	 * Called by a {@link ui/RadioDecorator.RadioDecorator} when it is deactivated
	 *
	 * @type {Function}
	 */
	deactivateRadioItem: React.PropTypes.func,

	/**
	 * Called by a {@link ui/RadioDecorator.RadioDecorator} when it is mounted to register it for
	 * deactivations.
	 *
	 * @type {Function}
	 */
	registerRadioItem: React.PropTypes.func,

	/**
	 * Called by a {@link ui/RadioDecorator.RadioDecorator} when it will be unmouned to deregister
	 * it for deactivations.
	 *
	 * @type {Function}
	 */
	unregisterRadioItem: React.PropTypes.func
};

/**
 * {@link ui/RadioDecorator.RadioContainerDecorator} is a Higher-order Component that establishes
 * a radio group context for its descendants. Any descendants that are wrapped by
 * {@link ui/RadioDecorator.RadioDecorator} will be mutually exlusive.
 *
 * @class RadioContainerDecorator
 * @memberof ui/RadioDecorator
 * @hoc
 * @public
 */
const RadioContainerDecorator = hoc((config, Wrapped) => {

	return class extends React.Component {
		static displayName = 'RadioContainerDecorator'

		static childContextTypes = contextTypes

		static propTypes = /** @lends ui/RadioDecorator.RadioContainerDecorator.prototype */ {
			/**
			 * Controls whether the component is disabled.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			disabled: React.PropTypes.bool	// eslint-disable-line react/sort-prop-types
		}

		constructor (props) {
			super(props);

			this.active = null;
			this.radioItems = [];
		}

		getChildContext () {
			return {
				activateRadioItem: this.activate,
				deactivateRadioItem: this.deactivate,
				registerRadioItem: this.register,
				unregisterRadioItem: this.unregister
			};
		}

		activate = (item) => {
			// if the active radio item isn't item and item is active, try to deactivate all the
			// other radio items
			if (this.active && this.active !== item) {
				this.radioItems.forEach(radioItem => {
					if (radioItem !== item && typeof radioItem.deactivate === 'function') {
						radioItem.deactivate();
					}
				});
			}

			this.active = item;
		}

		deactivate = (item) => {
			if (this.active === item) {
				this.active = null;
			}
		}

		register = (item) => {
			if (this.radioItems.indexOf(item) === -1) {
				this.radioItems.push(item);
			}
		}

		unregister = (item) => {
			const index = this.radioItems.indexOf(item);
			if (index !== -1) {
				this.radioItems.splice(index, 1);
			}
		}

		render () {
			return <Wrapped {...this.props} />;
		}
	};
});

export default RadioContainerDecorator;
export {
	contextTypes,
	RadioContainerDecorator
};
