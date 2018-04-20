import hoc from '@enact/core/hoc';
import Spottable from '@enact/spotlight/Spottable';
import React from 'react';
import PropTypes from 'prop-types';

const SpottablePicker = hoc(null, (config, Wrapped) => {
	const Joined = Spottable(Wrapped);

	return class extends React.Component {
		static displayName = 'SpottablePicker'

		static propTypes = {
			joined: PropTypes.bool,
			onSpotlightDisappear: PropTypes.func,
			onSpotlightDown: PropTypes.func,
			onSpotlightLeft: PropTypes.func,
			onSpotlightRight: PropTypes.func,
			onSpotlightUp: PropTypes.func
		}

		render () {
			const {onSpotlightDisappear, onSpotlightDown, onSpotlightLeft, onSpotlightRight, onSpotlightUp, ...rest} = this.props;
			const Component = this.props.joined ? Joined : Wrapped;
			return (
				<Component
					{...rest}
					onDecrementSpotlightDisappear={onSpotlightDisappear}
					onIncrementSpotlightDisappear={onSpotlightDisappear}
					onPickerSpotlightDown={onSpotlightDown}
					onPickerSpotlightLeft={onSpotlightLeft}
					onPickerSpotlightRight={onSpotlightRight}
					onPickerSpotlightUp={onSpotlightUp}
				/>
			);
		}
	};
});

export default SpottablePicker;
export {SpottablePicker};
