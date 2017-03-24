import Changeable from '@enact/ui/Changeable';
import IncrementSlider, {IncrementSliderBase} from '@enact/moonstone/IncrementSlider';
import {decrementIcons, incrementIcons} from './icons';
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, boolean, number, select} from '@kadira/storybook-addon-knobs';

import {mergeComponentMetadata} from '../../src/utils/propTables';

const ChangeableSlider = Changeable(IncrementSlider);
ChangeableSlider.displayName = 'Changeable(IncrementSlider)';

const Config = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);

storiesOf('IncrementSlider')
	.addDecorator(withKnobs)
	.addWithInfo(
		' ',
		'Basic usage of IncrementSlider',
		() => (
			<ChangeableSlider
				backgroundProgress={number('backgroundProgress', ChangeableSlider.defaultProps.backgroundProgress, {range: true, min: 0, max: 1, step: 0.01})}
				incrementIcon={select('incrementIcon', ['', ...incrementIcons])}
				decrementIcon={select('decrementIcon', ['', ...decrementIcons])}
				disabled={boolean('disabled', ChangeableSlider.defaultProps.disabled)}
				knobStep={number('knobStep')}
				max={number('max', ChangeableSlider.defaultProps.max)}
				min={number('min', ChangeableSlider.defaultProps.min)}
				onChange={action('onChange')}
				step={number('step', ChangeableSlider.defaultProps.step)}
				tooltip={boolean('tooltip', ChangeableSlider.defaultProps.tooltip)}
				tooltipAsPercent={boolean('tooltipAsPercent', ChangeableSlider.defaultProps.tooltipAsPercent)}
				tooltipForceSide={boolean('tooltipForceSide', ChangeableSlider.defaultProps.tooltipForceSide)}
				tooltipSide={select('tooltipSide', ['before', 'after'], 'after')}
				vertical={boolean('vertical', ChangeableSlider.defaultProps.vertical)}
			/>
		),
		{propTables: [Config]}
	);
