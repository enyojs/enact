import CheckboxItem from '@enact/moonstone/CheckboxItem';
import ToggleItem from '@enact/moonstone/ToggleItem';
import Item, {ItemBase} from '@enact/moonstone/Item';
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, boolean, text} from '@kadira/storybook-addon-knobs';

import {mergeComponentMetadata} from '../../src/utils/propTables';

const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, ToggleItem, CheckboxItem);

storiesOf('CheckboxItem')
	.addDecorator(withKnobs)
	.addWithInfo(
		' ',
		'Basic usage of CheckboxItem',
		() => (
			<CheckboxItem
				disabled={boolean('disabled', false)}
				inline={boolean('inline', false)}
				onToggle={action('onToggle')}
			>
				{text('children', 'Hello CheckboxItem')}
			</CheckboxItem>
		),
		{propTables: [Config]}
	);
