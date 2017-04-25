import $L from '@enact/i18n/$L';
import {forKey, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import {DateComponentPicker, DateComponentRangePicker} from '../internal/DateComponentPicker';
import {ExpandableItemBase} from '../ExpandableItem';

import css from './TimePicker.less';
import {dateComponentPickers} from '../internal/DateComponentPicker/DateComponentPicker.less';

// values to use in hour picker for 24 and 12 hour locales
const hours24 = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
	'12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
];
const hours12 = [
	'12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
	'12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'
];

/**
 * {@link moonstone/TimePicker/TimePickerBase.HourPicker} is a utility component to prevent the
 * animation of the picker when the display text doesn't change for 12-hour locales.
 *
 * @class HourPicker
 * @memberof moonstone/TimePicker/TimePickerBase
 * @ui
 * @private
 */
class HourPicker extends React.Component {
	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.string),
		value: PropTypes.number
	}

	constructor () {
		super();

		this.state = {
			noAnimation: false
		};
	}

	componentWillReceiveProps (nextProps) {
		const {children, value} = this.props;
		const {children: nextChildren, value: nextValue} = nextProps;

		this.setState({
			noAnimation: children[value] === nextChildren[nextValue]
		});
	}

	render () {
		return (
			<DateComponentPicker {...this.props} {...this.state} />
		);
	}
}

/**
* {@link moonstone/TimePicker.TimePickerBase} is the stateless functional time picker
* component. Should not be used directly but may be composed within another component as it is
* within {@link moonstone/TimePicker.TimePicker}.
*
* @class TimePickerBase
* @memberof moonstone/TimePicker
* @ui
* @private
*/
const TimePickerBase = kind({
	name: 'TimePickerBase',

	propTypes: /** @lends moonstone/TimePicker.TimePickerBase.prototype */ {
		/**
		 * The `hour` component of the Date
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		hour: PropTypes.number.isRequired,

		/**
		 * The `meridiem` component of the time
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		meridiem: PropTypes.number.isRequired,

		/**
		 * Array of meridiem labels to display
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		meridiems: PropTypes.arrayOf(PropTypes.string).isRequired,

		/**
		 * The `minute` component of the time
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		minute: PropTypes.number.isRequired,

		/**
		 * The order in which the component pickers are displayed. Should be an array of 2 or 3
		 * strings containing one of `'h'`, `'k'`, `'m'`, and `'a'`.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		order: PropTypes.arrayOf(PropTypes.oneOf(['h', 'k', 'm', 'a'])).isRequired,

		/**
		 * The primary text of the item.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		title: PropTypes.string.isRequired,

		/**
		 * When `true`, omits the labels below the pickers
		 *
		 * @type {Boolean}
		 * @public
		 */
		noLabels: PropTypes.bool,

		/**
		 * Handler for changes in the `hour` component of the time
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeHour: PropTypes.func,

		/**
		 * Handler for changes in the `meridiem` component of the time
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMeridiem: PropTypes.func,

		/**
		 * Handler for changes in the `minute` component of the time
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMinute: PropTypes.func,

		/**
		 * Callback to be called when a condition occurs which should cause the expandable to close
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * The handler to run when the component is removed while retaining focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * When `true`, the component cannot be navigated using spotlight.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		spotlightDisabled: PropTypes.bool
	},

	defaultProps: {
		spotlightDisabled: false
	},

	styles: {
		css,
		className: 'timePicker'
	},

	handlers: {
		handlePickerKeyDown: handle(
			forKey('enter'),
			forward('onClose')
		)
	},

	computed: {
		hasMeridiem: ({order}) => order.indexOf('a') >= 0
	},

	render: ({handlePickerKeyDown, hasMeridiem, hour, meridiem, meridiems, minute, noLabels, onChangeHour, onChangeMeridiem, onChangeMinute, onSpotlightDisappear, order, spotlightDisabled, ...rest}) => {
		return (
			<ExpandableItemBase {...rest} showLabel="always" autoClose={false} lockBottom={false} onSpotlightDisappear={onSpotlightDisappear} spotlightDisabled={spotlightDisabled}>
				<div className={dateComponentPickers} onKeyDown={handlePickerKeyDown}>
					<div className={css.timeComponents}>
						{order.map(picker => {
							switch (picker) {
								case 'h':
								case 'k':
									return (
										<HourPicker
											className={css.hourComponents}
											key="hour-picker"
											label={noLabels ? null : $L('hour')}
											onChange={onChangeHour}
											onSpotlightDisappear={onSpotlightDisappear}
											spotlightDisabled={spotlightDisabled}
											value={hour}
											width={2}
											wrap
										>
											{hasMeridiem ? hours12 : hours24}
										</HourPicker>
									);
								case 'm':
									return (
										<DateComponentRangePicker
											className={css.minutesComponents}
											key="minute-picker"
											label={noLabels ? null : $L('minute')}
											max={59}
											min={0}
											onChange={onChangeMinute}
											onSpotlightDisappear={onSpotlightDisappear}
											spotlightDisabled={spotlightDisabled}
											padded
											value={minute}
											width={2}
											wrap
										/>
									);
								case 'a':
									return (
										<DateComponentPicker
											className={css.meridiemComponent}
											key="meridiem-picker"
											label={noLabels ? null : $L('meridiem')}
											onChange={onChangeMeridiem}
											onSpotlightDisappear={onSpotlightDisappear}
											reverse
											spotlightDisabled={spotlightDisabled}
											value={meridiem}
											width={4}
											wrap
										>
											{meridiems}
										</DateComponentPicker>
									);
							}

							return null;
						})}
					</div>
				</div>
			</ExpandableItemBase>
		);
	}
});

export default TimePickerBase;
export {TimePickerBase};
