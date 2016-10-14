/**
 * Exports the {@link module:@enact/moonstone/VirtualList/GridListImageItem~GridListImageItem} and
 * {@link module:@enact/moonstone/VirtualList/GridListImageItem~GridListImageItemBase} components. The default export is
 * {@link module:@enact/moonstone/VirtualList/GridListImageItem~GridListImageItem}.
 *
 * @module @enact/moonstone/VirtualList/GridListImageItem
 */

import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';
import {Spottable} from '@enact/spotlight';

import Icon from '../Icon';
import {ItemBase} from '../Item';

import css from './GridListImageItem.less';

const defaultPlaceholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cmVjdCB3aWR0aD0iMTAw' +
	'JSIgaGVpZ2h0PSIxMDAlIiBzdHlsZT0ic3Ryb2tlOiAjNDQ0OyBzdHJva2Utd2lkdGg6IDE7IGZpbGw6ICNhYW' +
	'E7IiAvPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHlsZT0ic3Ryb2tlOiAjNDQ0' +
	'OyBzdHJva2Utd2lkdGg6IDE7IiAvPjxsaW5lIHgxPSIxMDAlIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAlIiBzdH' +
	'lsZT0ic3Ryb2tlOiAjNDQ0OyBzdHJva2Utd2lkdGg6IDE7IiAvPjwvc3ZnPg==';

/**
 * {@link module:@enact/moonstone/VirtualList/GridListImageItem~GridListImageItemBase} is a stateless GridListImageItem with Moonstone styling
 * applied.
 *
 * @class GridListImageItemBase
 * @ui
 * @public
 */
const GridListImageItemBase = kind({
	name: 'GridListImageItem',

	propTypes: {
		/**
		 * The primary caption to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		caption: PropTypes.string,

		/**
		 * A globally accessible data URL that describes a simple
		 * placeholder image that may be used in samples and applications
		 * until final graphics are provided. As an SVG image, it will
		 * expand to fill the desired width and height set in the style.
		 *
		 * @type {String}
		 * @default defaultPlaceholder
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * Applies a selected visual effect to the image of selectionEnabled
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Set this to `true` to enable selection support. Selection support adds the styling for a centered icon
		 * that can be shown when the `selected` value is `true`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selectionOverlayShowing: PropTypes.bool,

		/**
		 * The absolute URL path to the image.
		 *
		 * @type {String}
		 * @public
		 */
		source: PropTypes.string,

		/**
		 * The second caption line to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		subCaption: PropTypes.string
	},

	defaultProps: {
		placeholder: defaultPlaceholder,
		selected: false,
		selectionOverlayShowing: false
	},

	styles: {
		css,
		className: 'gridListImageItem'
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected}),
		source: ({placeholder, source}) => (source ? source : placeholder)
	},

	render: ({caption, source, subCaption, selectionOverlayShowing, ...rest}) => {
		delete rest.selected;
		delete rest.placeholder;

		return (
			<ItemBase {...rest}>
				<div className={css.image}>
					<img src={source} draggable={false} />
					{
						selectionOverlayShowing ? (
							<div className={css.overlayContainer}>
								<div className={css.overlayComponent}>
									<Icon className={css.icon}>check</Icon>
								</div>
							</div>
						) : null
					}
				</div>
				{caption ? (<div className={css.caption}>{caption}</div>) : null}
				{subCaption ? (<div className={css.subCaption}>{subCaption}</div>) : null}
			</ItemBase>
		);
	}
});

/**
 * {@link module:@enact/moonstone/VirtualList/GridListImageItem~GridListImageItem} is a GridListImageItem with Moonstone styling, Spottable
 * applied.
 *
 * Usage:
 * ```
 * <GridListImageItem source="http://placehold.it/300x300/9037ab/ffffff&text=Image0" caption="image0" subCaption="sub-image0" />
 * ```
 *
 * @class GridListImageItem
 * @mixes module:@enact/spotlight/Spottable
 * @see module:@enact/moonstone/VirtualList/GridListImageItem~GridListImageItemBase
 * @ui
 * @public
 */
const GridListImageItem = Spottable(GridListImageItemBase);

export default GridListImageItem;
export {GridListImageItem, GridListImageItemBase};
