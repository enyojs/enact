/**
 * Exports the {@link moonstone/Icon.Icon} and {@link moonstone/Icon.IconBase} components and the
 * {@link moonstone/Icon.IconDecorator} Higher-order Component (HOC).  The default export is
 * {@link moonstone/Icon.Icon}.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module moonstone/Icon
 */

import kind from '@enact/core/kind';
import UiIcon from '@enact/ui/Icon';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import iconList from './IconList.js';

import componentCss from './Icon.less';

/**
 * Renders a moonstone-styled icon without any behavior.
 *
 * @class IconBase
 * @memberof moonstone/Icon
 * @ui
 * @public
 */
const IconBase = kind({
	name: 'Icon',

	render: (props) => (
		<UiIcon
			{...props}
			css={componentCss}
			iconList={iconList}
		/>
	)
});

// Let's find a way to import this list directly, and bonus feature, render our icons in the docs
// next to their names.
/**
 * {@link moonstone/Icon.iconList} is an object whose keys can be used as the child of an
 * {@link moonstone/Icon.Icon} component.
 *
 * List of Icons:
 * ```
 * plus
 * minus
 * arrowhookleft
 * arrowhookright
 * ellipsis
 * check
 * circle
 * stop
 * play
 * pause
 * forward
 * backward
 * skipforward
 * skipbackward
 * pauseforward
 * pausebackward
 * pausejumpforward
 * pausejumpbackward
 * jumpforward
 * jumpbackward
 * denselist
 * bulletlist
 * list
 * drawer
 * arrowlargedown
 * arrowlargeup
 * arrowlargeleft
 * arrowlargeright
 * arrowsmallup
 * arrowsmalldown
 * arrowsmallleft
 * arrowsmallright
 * closex
 * search
 * rollforward
 * rollbackward
 * exitfullscreen
 * fullscreen
 * arrowshrinkleft
 * arrowshrinkright
 * arrowextend
 * arrowshrink
 * flag
 * funnel
 * trash
 * star
 * hollowstar
 * halfstar
 * gear
 * plug
 * lock
 * forward15
 * back15
 * continousplay
 * playlist
 * resumeplay
 * image
 * audio
 * music
 * languages
 * cc
 * ccon
 * ccoff
 * sub
 * recordings
 * livezoom
 * liveplayback
 * liveplaybackoff
 * repeat
 * repeatoff
 * series
 * repeatdownload
 * view360
 * view360off
 * info
 * ```
 *
 * @name iconList
 * @memberof moonstone/Icon
 * @constant
 * @type Object
 * @public
 */

/**
 * {@link moonstone/Icon.IconDecorator} applies Moonstone-specific behaviors to an
 * [Icon]{@link moonstone/Icon.IconBase}.
 *
 * @hoc
 * @memberof moonstone/Icon
 * @public
 */
const IconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * {@link moonstone/Icon.Icon} is a Moonstone-styled icon
 *
 * @class Icon
 * @memberof moonstone/Icon
 * @extends moonstone/Icon.IconBase
 * @mixes moonstone/Icon.IconDecorator
 * @ui
 * @public
 */
const Icon = IconDecorator(IconBase);


export default Icon;
export {
	Icon,
	IconBase,
	IconDecorator,
	iconList as icons
};
