import ri from '@enact/ui/resolution';
import Icon from '@enact/moonstone/Icon';
import {VirtualVariableList} from '@enact/moonstone/VirtualVariableList';
import clamp from 'ramda/src/clamp';
import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, boolean, number} from '@kadira/storybook-addon-knobs';

const
	channelWidth = 400,
	channelLength = 200,
	timeWidth = 200,
	itemHeight = 80,
	clientWidth = timeWidth * 5,
	clientHeight = itemHeight * 6,
	maxVariableScrollSize = ri.scale(3600); // 400 ( width per 1 hour ) * 9 hr

// Inline style
const
	style = {
		epg: {
			position: 'absolute',
			width: ri.scale(channelWidth + clientWidth) + 'px',
			height: ri.scale(itemHeight + clientHeight) + 'px',
			padding: ri.scale(32) + 'px 0',
			color: 'white'
		},
		itemWrapper: {
			position: 'absolute',
			border: ri.scale(3) + 'px solid black',
			boxSizing: 'border-box',
			overflow: 'hidden'
		},
		// Today
		itemToday: {
			background: 'black',
			width: ri.scale(channelWidth) + 'px',
			padding: ri.scale(40) + 'px  0 ' + ri.scale(4) + 'px',
			fontSize: ri.scale(27) + 'px',
			WebkitUserSelect: 'none',
			userSelect: 'none'
		},
		// Timeline
		itemTimeline: {
			background: 'black',
			position: 'absolute',
			width: ri.scale(timeWidth) + 'px',
			height: ri.scale(itemHeight) + 'px',
			padding: ri.scale(40) + 'px ' + ri.scale(10) + 'px ' + ri.scale(10) + 'px',
			borderLeft: ri.scale(2) + 'px solid #333',
			boxSizing: 'border-box',
			fontSize: ri.scale(27) + 'px',
			WebkitUserSelect: 'none',
			userSelect: 'none'
		},
		// ChannelInfo
		itemChannelInfo: {
			width: ri.scale(channelWidth - 6) + 'px',
			height: ri.scale(itemHeight - 6) + 'px',
			color: '#CACACA',
			fontSize: ri.scale(27) + 'px',
			lineHeight: ri.scale(58) + 'px',
			WebkitUserSelect: 'none',
			userSelect: 'none'
		},
		// Programs
		itemProgram: {
			height: '100%',
			fontSize: ri.scale(33) + 'px',
			lineHeight: ri.scale(78) + 'px',
			WebkitUserSelect: 'none',
			userSelect: 'none'
		}
	};

// CSS
let sheet = document.createElement('style');
sheet.innerHTML = '.channelInfo:not(:focus) {background: #2C2E35;}' +
	'.program:not(:focus) {background: #141416;}';
document.body.appendChild(sheet);

// Data
const
	// ChannelInfo
	channelInfoData = [
		'A&E',
		'Adult Swim',
		'AMC',
		'Audience',
		'AXS TV',
		'BBC America',
		'BET',
		'Centric',
		'Chiller',
		'Cloo',
		'CMT',
		'Comedy Central',
		'Comedy.tv',
		'Discovery Channel',
		'Es.tv',
		'FIDO',
		'FX',
		'FXX',
		'GSN',
		'History'
	],
	// Timeline
	timelineData = [
		'06:00 AM', '06:30 AM',
		'07:00 AM', '07:30 AM',
		'08:00 AM', '08:30 AM',
		'09:00 AM', '09:30 AM',
		'10:00 AM', '10:30 AM',
		'11:00 AM', '11:30 AM',
		'12:00 PM', '12:30 PM',
		'01:00 PM', '01:30 PM',
		'02:00 PM', '02:30 PM'
	],
	// Programs
	programName = [
		'On Demand',
		'To Be Announced',
		'Newsedge',
		'TMZ',
		'Dish Nation',
		'Access Hollywood',
		'The Wendy Williams Show',
		'Harry',
		'Extra',
		'Dish Nation',
		'TMZ',
		'FOX 2 News Morning',
		'Secrets of the Dead',
		'SciTech Now',
		'Under the Radar Michigan',
		'Tavis Smiley',
		'Charlie Rose',
		'Nature',
		'NOVA',
		'Secrets of the Dead'
	],
	getRandomWidth = () => {
		return ri.scale((parseInt(Math.random() * 20) + 1) * 100);
	},
	programData = (function() {
		const data = [];

		for (let i = 0; i < channelLength; i++) {
			data[i] = [];
			for (let j = 0; j < timelineData.length; j++) {
				data[i][j] = {
					programName: ('00' + i).slice(-3) + '/' + ('00' + j).slice(-3) + ' - ' + programName[(i + j) % 20],
					width: getRandomWidth()
				};
			}
		}

		return data;
	})();

// Story
const
	getItemLength = ({data, index}) => {
		return data[index.row].length;
	},
	getItemWidth = ({data, index}) => {
		return data[index.row][index.col].width;
	},
	renderRowHeaderItem = ({data, index, key}) => {
		// ChannelInfo
		return (
			<div key={key} className={'channelInfo'} style={style.itemWrapper}>
				<div style={style.itemChannelInfo}>
					{data[index % 20]}
				</div>
			</div>
		);
	},
	renderColHeaderItem = ({data, index, key}) => {
		// Timeline
		return (
			<div key={key} style={style.itemTimeline}>
				{data[index % 20]}
			</div>
		);
	},
	renderItem = ({data, index, key}) => {
		// Programs
		return (
			<div key={key} className={'program'} style={style.itemWrapper}>
				<div style={style.itemProgram}>
					{data[index.row][index.col].programName}
				</div>
			</div>
		);
	};

storiesOf('VirtualVariableList')
	.addDecorator(withKnobs)
	.addWithInfo(
		' ',
		'Basic usage of VirtualVariableList',
		() => (
			<div style={style.epg}>
				<VirtualVariableList
					data={{
						item: programData,
						rowHeader: channelInfoData,
						colHeader: timelineData
					}}
					dataSize={{
						row: programData.length,
						col: getItemLength,
						rowHeader: channelLength,
						colHeader: timelineData.length
					}}
					hideScrollbars
					itemSize={{
						row: ri.scale(itemHeight),
						col: getItemWidth,
						rowHeader: ri.scale(channelWidth),
						colHeader: ri.scale(timeWidth)
					}}
					lockHeaders="both"
					maxVariableScrollSize={maxVariableScrollSize}
					// posX={posX}
					// posY={posY}
					variableAxis="row"
					component={{
						item: renderItem,
						rowHeader: renderRowHeaderItem,
						colHeader: renderColHeaderItem
					}}
				>
					<div style={style.itemToday}>Today</div>
				</VirtualVariableList>
				<Icon
					small
					// eslint-disable-next-line react/jsx-no-bind
					// onClick={() => this.scrollTo('up')}
					className={style.itemProgram}
					style={{position: 'absolute', left: '50%', top: '0', transform: 'translate3d(-50%, 0, 0)', WebkitUserSelect: 'none', userSelect: 'none'}}
				>arrowsmallup</Icon>
				<Icon
					small
					// eslint-disable-next-line react/jsx-no-bind
					// onClick={() => this.scrollTo('down')}
					style={{position: 'absolute', left: '50%', bottom: '0', transform: 'translate3d(-50%, 0, 0)', WebkitUserSelect: 'none', userSelect: 'none'}}
				>arrowsmalldown</Icon>
				<Icon
					small
					// eslint-disable-next-line react/jsx-no-bind
					// onClick={() => this.scrollTo('left')}
					style={{position: 'absolute', left: '0', top: '0', transform: 'translateZ(0)', WebkitUserSelect: 'none', userSelect: 'none'}}
				>arrowsmallleft</Icon>
				<Icon
					small
					// eslint-disable-next-line react/jsx-no-bind
					// onClick={() => this.scrollTo('right')}
					style={{position: 'absolute', right: '0', top: '0', transform: 'translateZ(0)', WebkitUserSelect: 'none', userSelect: 'none'}}
				>arrowsmallright</Icon>
			</div>
		)
	);
