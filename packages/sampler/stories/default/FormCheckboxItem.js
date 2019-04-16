import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {boolean, select, text} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

const Config = mergeComponentMetadata('FormCheckboxItem', FormCheckboxItem);

storiesOf('Moonstone', module)
	.add(
		'FormCheckboxItem',
		() => (
			<FormCheckboxItem
				disabled={boolean('disabled', Config)}
				iconPosition={select('iconPosition', ['before', 'after'], Config, 'before')}
				inline={boolean('inline', Config)}
				onToggle={action('onToggle')}
			>
				{text('children', Config, 'A Checkbox for a form')}
			</FormCheckboxItem>
		),
		{
			info: {
				text: 'Basic usage of FormCheckboxItem'
			}
		}
	);
