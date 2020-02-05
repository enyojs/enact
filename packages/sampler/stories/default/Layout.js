import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/ui/Button';
import Item from '@enact/ui/Item';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import ri from '@enact/ui/resolution';
import {storiesOf} from '@storybook/react';

Layout.displayName = 'Layout';
Cell.displayName = 'Cell';

storiesOf('UI', module)
	.add(
		'Layout',
		() => (
			<div className="debug" style={{height: ri.unit(399, 'rem')}}>
				<Layout
					align={select('align', ['start', 'center', 'stretch', 'end'], Layout, 'start')}
					orientation={select('orientation', ['horizontal', 'vertical'], Layout, 'horizontal')}
				>
					<Cell size={number('cell size', Cell, {range: true, min: 0, max: 300, step: 5}, 100) + 'px'} shrink>
						<Button>First</Button>
					</Cell>
					<Cell shrink={boolean('shrinkable cell', Cell)}>
						<Button>Second</Button>
					</Cell>
					<Cell>
						<Item>Third</Item>
					</Cell>
					<Cell shrink>
						<Button>Last</Button>
					</Cell>
				</Layout>
			</div>
		),
		{
			info: {
				text: 'Basic usage of Layout'
			}
		}
	);
