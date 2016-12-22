import ri from '@enact/ui/resolution';
import Item from '@enact/moonstone/Item';
import VirtualList from '@enact/moonstone/VirtualList';
import {VirtualListCore} from '@enact/moonstone/VirtualList/VirtualListBase';
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, number} from '@kadira/storybook-addon-knobs';

VirtualList.propTypes = Object.assign({}, VirtualListCore.propTypes);
VirtualList.defaultProps = Object.assign({}, VirtualListCore.defaultProps);

const
	style = {
		item: {
			position: 'absolute',
			width: '100%',
			height: ri.scale(72) + 'px',
			borderBottom: ri.scale(2) + 'px solid #202328',
			boxSizing: 'border-box'
		},
		list: {
			height: ri.scale(550) + 'px'
		}
	},
	items = [],
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({data, index}) => (<Item style={style.item}>{data[index]}</Item>);

for (let i = 0; i < 1000; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

storiesOf('VirtualList')
	.addDecorator(withKnobs)
	.addWithInfo(
		' ',
		'Basic usage of VirtualList',
		() => (
			<VirtualList
				data={items}
				dataSize={number('dataSize', items.length)}
				direction='vertical'
				itemSize={number('itemSize', ri.scale(72))}
				spacing={number('spacing', 0)}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				style={style.list}
				component={renderItem}
			/>
		)
	);
