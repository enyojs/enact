/**
 * Unstyled card components and behaviors to be customized by a theme or application.
 *
 * @module ui/Card
 * @exports Card
 * @exports CardBase
 * @exports CardDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import ForwardRef from '../ForwardRef';
import Image from '../Image';
import {Cell, Column, Row} from '../Layout';

import componentCss from './Card.module.less';

/**
 * A basic card without any behavior.
 *
 * @class CardBase
 * @memberof ui/Card
 * @ui
 * @public
 */
const CardBase = kind({
	name: 'ui:Card',

	propTypes: /** @lends ui/Card.CardBase.prototype */ {
		/**
		 * The caption displayed with the image.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Called with a reference to the root component.
		 *
		 * When using {@link ui/Card.Card}, the `ref` prop is forwarded to this component
		 * as `componentRef`
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The layout orientation of the component.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * A placeholder image to be displayed before the image is loaded.
		 *
		 * @type {String}
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * Applies a selected visual effect to the image.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * String value or object of values used to determine which image will appear on a specific
		 * screenSize.
		 *
		 * @type {String|Object}
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Determines whether the text will be placed over the image.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		textOverlay: PropTypes.bool
	},

	defaultProps: {
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'card',
		publicClassNames: true
	},

	computed: {
		className: ({orientation, selected, styler, textOverlay}) => styler.append({
			selected,
			textOverlay: textOverlay && orientation === 'vertical',
			horizontal: orientation === 'horizontal',
			vertical: orientation === 'vertical'
		})
	},

	render: ({children, componentRef, css, orientation, placeholder, src, textOverlay, ...rest}) => {
		const isHorizontal = orientation === 'horizontal';
		const istextOverlay = textOverlay && !isHorizontal;
		const Component = isHorizontal ? Row : Column;

		const Wrapped = (
			<>
				<Cell
					className={css.image}
					component={Image}
					placeholder={placeholder}
					shrink={isHorizontal}
					src={src}
				/>
				{children ? (
					<Cell
						className={css.children}
						shrink={!isHorizontal}
						// eslint-disable-next-line no-undefined
						align={isHorizontal ? 'center' : undefined}
					>
						{children}
					</Cell>
				) : null}
			</>
		);

		return (
			<Component {...rest} ref={componentRef}>
				{istextOverlay ?
					<div className={css.imageContainer}>
						{Wrapped}
					</div> : Wrapped
				}
			</Component>
		);
	}
});

/**
 * A higher-order component that adds behaviors to an {@link ui/Card.CardBase|Card}.
 *
 * @hoc
 * @memberof ui/Card
 * @mixes ui/ForwardRef.ForwardRef
 * @public
 */
const CardDecorator = compose(
	ForwardRef({prop: 'componentRef'})
);

/**
 * A minimally styled Card read for customization by a theme.
 *
 * @class Card
 * @memberof ui/Card
 * @extends ui/Card.CardBase
 * @mixes ui/Card.CardDecorator
 * @omit componentRef
 * @ui
 * @public
 */
const Card = CardDecorator(CardBase);

export default Card;
export {
	Card,
	CardBase,
	CardDecorator
};
