/*
 * Exports the {@link ui/resolution.ResolutionDecorator} higher-order component (HOC).
 *
 * not jsdoc module on purpose
 */

import {Component} from 'react';
import PropTypes from 'prop-types';
import hoc from '@enact/core/hoc';

import {
	init,
	calculateFontSize,
	config as riConfig,
	defineScreenTypes,
	getResolutionClasses,
	updateBaseFontSize,
	updateScreenScale
} from './resolution';

/**
 * Default config for `ResolutionDecorator`.
 *
 * @memberof ui/resolution.ResolutionDecorator
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * Attaches an event listener to the window to listen for resize events.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 * @memberof ui/resolution.ResolutionDecorator.defaultConfig
	 */
	dynamic: true,

	/**
	 * Determines how to calculate font-size.
	 * When set to `scale` and the screen is in `landscape` orientation,
	 * calculates font-size linearly based on screen resolution.
	 * When set to `normal`, the font-size will be the pxPerRem value of the best match screen type.
	 *
	 * @type {('normal'|'scale')}
	 * @default 'normal'
	 * @private
	 * @memberof ui/resolution.ResolutionDecorator.defaultConfig
	 */
	intermediateScreenHandling: 'normal',

	/**
	 * Determines how to get the best match screen type of current resolution.
	 * When set to `true`, the matched screen type will be the one that is smaller and
	 * the closest to the screen resolution.
	 * When set to `false`, the matched screen type will be the one that is greater and
	 * the closest to the screen resolution.
	 *
	 * @type {Boolean}
	 * @private
	 * @memberof ui/resolution.ResolutionDecorator.defaultConfig
	 */
	matchSmallerScreenType: false,

	/**
	 * An array of objects containing declarations for screen types to add to the list of known
	 * screen types.
	 *
	 * @type {Object[]}
	 * @default null
	 * @public
	 * @memberof ui/resolution.ResolutionDecorator.defaultConfig
	 */
	screenTypes: null
};

/**
 * A higher-order component that configures resolution support for its wrapped component tree.
 *
 * Configuration options:
 *	* `dynamic: true` - when `true`, updates the resolution classes when the window resizes
 *	* `screenTypes: null` - defines a set of screen types to support
 *
 * Example:
 * ```
 *	// Will have the resolution classes and will be updated when the window resizes
 *	const AppWithResolution = ResolutionDecorator(App);
 *	// Will have the resolution classes for the screen at the time of render only
 *	const AppWithStaticResolution = ResolutionDecorator({dynamic: false}, App);
 *	const AppWithScreenTypes = ResolutionDecorator({screenTypes: [
 *		{name: 'hd', pxPerRem: 16, width: 1280, height: 720, aspectRatioName: 'hdtv', base: true}
 *	]}, App);
 * ```
 * @class ResolutionDecorator
 * @memberof ui/resolution
 * @hoc
 * @public
 */
const ResolutionDecorator = hoc(defaultConfig, (config, Wrapped) => {
	if (config.screenTypes) {
		defineScreenTypes(config.screenTypes);
	}

	return class extends Component {
		static displayName = 'ResolutionDecorator';

		static propTypes = /** @lends ui/resolution.ResolutionDecorator.prototype */ {
			className: PropTypes.string,

			/**
			 * Screen Scale value for the large screen mode.
	 		 * Use this value to set the scale of the base font.
	 		 * This is the value that will be multiplied by pxPerRem, which is determined by the resolution.
			 *
			 * @type {Number}
			 * @default 1
			 * @public
			 */
			screenScale: PropTypes.number
		};

		static defaultProps = {
			screenScale: 1
		};

		constructor (props) {
			super(props);
			riConfig.intermediateScreenHandling = config.intermediateScreenHandling;
			riConfig.matchSmallerScreenType = config.matchSmallerScreenType;
			updateScreenScale(this.props.screenScale);
			init({measurementNode: (typeof window !== 'undefined' && window)});
			this.state = {
				resolutionClasses: ''
			};
		}

		componentDidMount () {
			if (config.dynamic) window.addEventListener('resize', this.handleResize);
			this.rootNode = document.getElementsByClassName(getResolutionClasses())?.[0] || null;
		}

		componentDidUpdate (prevProps) {
			if (prevProps.screenScale !== this.props.screenScale) updateBaseFontSize(calculateFontSize());
		}

		componentWillUnmount () {
			if (config.dynamic) window.removeEventListener('resize', this.handleResize);
		}

		handleResize = () => {
			const classNames = this.didClassesChange();

			if (classNames) {
				this.setState({resolutionClasses: classNames});
			}
		};

		/*
		 * Compare our current version of the resolved resolution class names with a fresh
		 * initialization of RI.
		 *
		 * @returns {String|undefined} A string of new class names or undefined when there is no change.
		 * @private
		 */
		didClassesChange () {
			const prevClassNames = getResolutionClasses();
			init({measurementNode: this.rootNode});
			const classNames = getResolutionClasses();
			if (prevClassNames !== classNames) {
				return classNames;
			}
		}

		render () {
			const {...rest} = this.props;

			delete rest.screenScale;

			if (this.props.screenScale) updateScreenScale(this.props.screenScale);

			// Check if the classes are different from our previous classes
			let classes = getResolutionClasses();

			if (this.props.className) classes += (classes ? ' ' : '') + this.props.className;
			return <Wrapped {...rest} className={classes} />;
		}
	};
});

export default ResolutionDecorator;
export {ResolutionDecorator};
