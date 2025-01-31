let baseScreen,
	fontScale = 1,
	orientation,
	riRatio,
	screenType,
	workspaceBounds = {
		width: (typeof window === 'object') ? window.innerWidth : 1920,
		height: (typeof window === 'object') ? window.innerHeight : 1080
	},
	screenTypes = [{
		name: 'standard',
		pxPerRem: 16,
		width: workspaceBounds.width,
		height: workspaceBounds.height,
		aspectRatioName: 'standard',
		base: true
	}],	// Assign one sane type in case defineScreenTypes is never run.
	screenTypeObject,
	config;

/**
 * Object that stores the pixel conversion factors to each keyed unit.
 *
 * @type {Object}
 * @memberof ui/resolution
 * @public
 */
const unitToPixelFactors = {
	'rem': 12,
	'in': 96
};

const configDefaults = {
	intermediateScreenHandling: 'normal',
	matchSmallerScreenType: false,
	orientationHandling: 'normal'
};

/**
 * Update the common measured boundary object.
 *
 * This object is used as "what size screen are we looking at". Providing no arguments has no
 * effect and updates nothing.
 *
 * @function
 * @memberOf ui/resolution
 * @param {Node}    measurementNode    A standard DOM node or the `window` node.
 *
 * @returns {undefined}
 * @private
 */
const updateWorkspaceBounds = (measurementNode) => {
	if (measurementNode) {
		if (measurementNode.clientHeight || measurementNode.clientWidth) {
			workspaceBounds = {height: measurementNode.clientHeight, width: measurementNode.clientWidth};
		} else if (measurementNode.innerHeight || measurementNode.innerWidth) {
			// A backup for if measurementNode is actually `window` and not a normal node
			workspaceBounds = {height: measurementNode.innerHeight, width: measurementNode.innerWidth};
		}
	}
};

/**
 * Fetch the screenType object
 *
 * @function
 * @memberof ui/resolution
 * @param  {String}    type    The key string for the screen type object. If falsy, the current
 *                             screenType is used
 *
 * @returns {Object}           screenTypeObject
 * @private
 */
function getScreenTypeObject (type) {
	type = type || screenType;
	if (screenTypeObject && screenTypeObject.name === type) {
		return screenTypeObject;
	}
	return screenTypes.filter(function (elem) {
		return (type === elem.name);
	})[0];
}

/**
 * Sets up screen resolution scaling capabilities by defining an array of all the screens
 * being used.
 *
 * These should be listed in order from smallest to largest, according to
 * width.
 *
 * The `name`, `pxPerRem`, `width`, and `aspectRatioName` properties are required for
 * each screen type in the array. Setting `base: true` on a screen type marks it as the
 * default resolution, upon which everything else will be based.
 *
 * Executing this method also initializes the rest of the resolution-independence code.
 *
 * Example:
 * ```
 * import ri from 'enact/ui/resolution';
 *
 * ri.defineScreenTypes([
 * 	{name: 'vga',     pxPerRem: 8,  width: 640,  height: 480,  aspectRatioName: 'standard'},
 * 	{name: 'xga',     pxPerRem: 16, width: 1024, height: 768,  aspectRatioName: 'standard'},
 * 	{name: 'hd',      pxPerRem: 16, width: 1280, height: 720,  aspectRatioName: 'hdtv'},
 * 	{name: 'fhd',     pxPerRem: 24, width: 1920, height: 1080, aspectRatioName: 'hdtv', base: true},
 * 	{name: 'uw-uxga', pxPerRem: 24, width: 2560, height: 1080, aspectRatioName: 'cinema'},
 * 	{name: 'uhd',     pxPerRem: 48, width: 3840, height: 2160, aspectRatioName: 'hdtv'}
 * ]);
 * ```
 *
 * @function
 * @memberof ui/resolution
 * @param {Object[]}    types    An array of objects containing screen configuration data, as in the
 *                            preceding example.
 * @returns {undefined}
 * @public
 */
function defineScreenTypes (types) {
	if (types) screenTypes = types;
	for (let i = 0; i < screenTypes.length; i++) {
		if (screenTypes[i]['base']) baseScreen = screenTypes[i];
	}
	init();
}

/**
 * Fetches the name of the screen type that best matches the current screen size.
 *
 * The best match is defined as the screen type that is the closest to the screen resolution without
 * going over. ("The Price is Right" style.)
 *
 * @function
 * @memberof ui/resolution
 * @param {Object}    rez    Optional measurement scheme. Must include `height` and `width` properties.
 * @returns {String}         Screen type (e.g., `'fhd'`, `'uhd'`, etc.)
 * @public
 */
function getScreenType (rez) {
	rez = rez || workspaceBounds;

	const types = screenTypes;
	let bestMatch = config.matchSmallerScreenType ? types[0].name : types[types.length - 1].name; // Blindly set the first screen type, in case no matches are found later.

	orientation = 'landscape';

	if (rez.height > rez.width) {
		orientation = 'portrait';
		const swap = rez.width;
		rez.width = rez.height;
		rez.height = swap;
	}

	if (config.matchSmallerScreenType) {
		// Loop through resolutions, first->last, smallest->largest
		for (let i = 0; i <= types.length - 1; i++) {
			// Does this screenType definition fit inside the current resolution? If so, save it as the current best match.
			if (rez.height >= types[i].height && rez.width >= types[i].width) {
				bestMatch = types[i].name;
			}
		}
	} else {
		// Loop through resolutions, last->first, largest->smallest
		for (let i = types.length - 1; i >= 0; i--) {
			// Does the current resolution fit inside this screenType definition? If so, save it as the current best match.
			if (rez.height <= types[i].height && rez.width <= types[i].width) {
				bestMatch = types[i].name;
			}
		}
	}

	// Return the name of the closest fitting set of dimensions.
	return bestMatch;
}

/**
 * Calculate the base rem font size.
 *
 * This is how the magic happens. This accepts an optional `screenType` name. If one isn't provided,
 * the currently detected screen type is used. This uses the config option `orientationHandling`,
 * which when set to "scale" and the screen is in portrait orientation, will dynamically calculate
 * what the base font size should be, if the width were proportionally scaled down to fit in the portrait space.
 *
 * To use, put the following in your application code:
 * ```
 * import ri from '@enact/ui/resolution';
 *
 * ri.config.orientationHandling = 'scale';
 * ri.init();
 * ```
 *
 * This has no effect if the screen is in landscape, or if `orientationHandling` is unset.
 *
 * @function
 * @memberof ui/resolution
 * @param {String}    type    Screen type to base size the calculation on. If no
 *                            screen type is provided, the current screen type will be used.
 * @returns {String}          The calculated pixel size (with unit suffix. Ex: "24px").
 * @public
 */
function calculateFontSize (type) {
	const scrObj = getScreenTypeObject(type);
	const shouldScaleFontSize = (config.intermediateScreenHandling === 'scale') && (config.matchSmallerScreenType ? workspaceBounds.width > scrObj.width && workspaceBounds.height > scrObj.height :
		workspaceBounds.width < scrObj.width && workspaceBounds.height < scrObj.height);
	let size;

	if (orientation === 'portrait' && config.orientationHandling === 'scale') {
		size = scrObj.height / scrObj.width * (scrObj.pxPerRem * fontScale);
	} else {
		size = (scrObj.pxPerRem * fontScale);
		if (orientation === 'landscape' && shouldScaleFontSize) {
			size = parseInt(workspaceBounds.height * (scrObj.pxPerRem * fontScale) / scrObj.height);
		}
	}
	return size + 'px';
}

/**
 * @function
 * @memberof ui/resolution
 * @param {String}    size     A valid CSS measurement to be applied as the base document font size.
 * @returns {undefined}
 * @private
 */
function updateBaseFontSize (size) {
	if (typeof window === 'object') {
		document.documentElement.style.fontSize = size;
	}
}

/**
 * @function
 * @memberof ui/resolution
 * @param {Number}    fontScaleValue     The value to scale the base font size.
 * @returns {undefined}
 * @private
 */
function updateFontScale (fontScaleValue) {
	fontScale = fontScaleValue;
}

/**
 * Returns the CSS classes for the given `type`.
 *
 * @function
 * @memberof ui/resolution
 * @param {String}    type    Screen type
 * @returns {String}          CSS class names
 * @public
 */
function getResolutionClasses (type = screenType) {
	const classes = [];
	if (orientation) {
		classes.push('enact-orientation-' + orientation);
	}
	if (type) {
		classes.push('enact-res-' + type.toLowerCase());
		const scrObj = getScreenTypeObject(type);
		if (scrObj.aspectRatioName) {
			classes.push('enact-aspect-ratio-' + scrObj.aspectRatioName.toLowerCase());
		}
	}
	return classes.join(' ');
}

/**
 * Returns the ratio of pixels per rem for the given `type` to the pixels per rem for the base type.
 *
 * @function
 * @memberof ui/resolution
 * @param  {String}    type    Screen type
 *
 * @returns {Number}           ratio
 */
function getRiRatio (type = screenType) {
	if (type && baseScreen) {
		const ratio = getUnitToPixelFactors(type) / getUnitToPixelFactors(baseScreen.name);
		if (type === screenType) {
			// cache this if it's for our current screen type.
			riRatio = ratio;
		}
		return ratio;
	}
	return 1;
}

/**
 * Returns the pixels per rem for the given `type`.
 *
 * @memberof ui/resolution
 * @param {String}    type    Screen type
 *
 * @returns {Number}          pixels per rem
 */
function getUnitToPixelFactors (type = screenType) {
	if (type) {
		return getScreenTypeObject(type).pxPerRem;
	}
	return 1;
}

/**
 * Calculates the aspect ratio of the specified screen type.
 *
 * If no screen type is provided, the current screen type is used.
 *
 * @function
 * @memberof ui/resolution
 * @param {String}    type    Screen type whose aspect ratio will be calculated. If no screen
 *                            type is provided, the current screen type is used.
 * @returns {Number}          The calculated screen ratio (e.g., `1.333`, `1.777`, `2.333`, etc.)
 * @public
 */
function getAspectRatio (type) {
	const scrObj = getScreenTypeObject(type);
	if (scrObj.width && scrObj.height) {
		return (scrObj.width / scrObj.height);
	}
	return 1;
}

/**
 * Returns the name of the aspect ratio for a specified screen type, or for the default
 * screen type if none is provided.
 *
 * @function
 * @memberof ui/resolution
 * @param {String}    type    Screen type whose aspect ratio name will be returned. If no
 *                            screen type is provided, the current screen type will be used.
 * @returns {String}          The name of the screen type's aspect ratio
 * @public
 */
function getAspectRatioName (type) {
	const scrObj = getScreenTypeObject(type);
	return scrObj.aspectRatioName || 'standard';
}

/**
 * Takes a provided pixel value and performs a scaling operation based on the current
 * screen type.
 *
 * @function
 * @memberof ui/resolution
 * @param {Number}    px    The quantity of standard-resolution pixels to scale to the
 *                          current screen resolution.
 * @returns {Number}        The scaled value based on the current screen scaling factor
 * @public
 */
function scale (px) {
	return (riRatio || getRiRatio()) * px * fontScale;
}

/**
 * Convert to various unit formats.
 *
 * Useful for converting pixels to a resolution-independent
 * measurement method, like "rem". Other units are available if defined in the
 * {@link ui/resolution.unitToPixelFactors} object.
 *
 * Example:
 * ```
 * import ri from '@enact/ui/resolution';
 *
 * // Do calculations and get back the desired CSS unit.
 * var frameWidth = 250,
 *     frameWithMarginInches = ri.unit( 10 + frameWidth + 10, 'in' ), // '2.8125in' == frameWithMarginInches
 *     frameWithMarginRems = ri.unit( 10 + frameWidth + 10, 'rem' ); // '22.5rem' == frameWithMarginRems
 * ```
 *
 * @function
 * @memberof ui/resolution
 * @param {String|Number}     pixels    The pixels or math to convert to the unit ("px" suffix in String
 *                                       format is permitted. ex: `'20px'`)
 * @param {String}            toUnit    The name of the unit to convert to.
 *
 * @returns {String|undefined}          Resulting conversion in CSS safe format, in case of malformed input, `undefined`
 * @public
 */
function unit (pixels, toUnit) {
	if (!toUnit || !unitToPixelFactors[toUnit]) return;
	if (typeof pixels === 'string' && pixels.substr(-2) === 'px') pixels = parseInt(pixels.substr(0, pixels.length - 2));
	if (typeof pixels !== 'number') return;
	return (pixels / (fontScale * unitToPixelFactors[toUnit])) + '' + toUnit;
}

/**
 * Shorthand for when you know you need to scale some pixel value and have it converted to "rem" for
 * proper scaling.
 *
 * This runs {@link ui/resolution.scale} and {@link ui/resolution.unit} together.
 *
 * @function
 * @memberof ui/resolution
 * @param {Number}    pixels    The quantity of standard-resolution pixels to scale to rems
 *
 * @returns {String|undefined}  Resulting conversion or, in case of malformed input, `undefined`
 * @public
 */
const scaleToRem = (pixels) => unit(scale(pixels), 'rem');

/**
 * The default configurable options for {@link ui/resolution.selectSrc}. Additional resolutions
 * may be added.
 *
 * @typedef {Object} selectSrcOptions
 * @memberof ui/resolution
 * @property {String}    [hd]    HD / 720p Resolution image asset source URI/URL
 * @property {String}    [fhd]   FHD / 1080p Resolution image asset source URI/URL
 * @property {String}    [uhd]   UHD / 4K Resolution image asset source URI/URL
 */

/**
 * Selects the ideal image asset from a set of assets, based on various screen
 * resolutions: HD (720p), FHD (1080p), UHD (4k).
 *
 * When a `src` argument is provided, `selectSrc()` will choose the best image with
 * respect to the current screen resolution. `src` may be either the traditional
 * string, which will pass straight through, or a hash/object of screen types and
 * their asset sources (keys:screen and values:src). The image sources will be used
 * when the screen resolution is less than or equal to the provided screen types.
 *
 * Example:
 * ```
 * // Take advantage of the multi-res mode
 * import {Image} from '@enact/ui/Image';
 *
 * const src = {
 *     'hd': 'http://lorempixel.com/64/64/city/1/',
 *     'fhd': 'http://lorempixel.com/128/128/city/1/',
 *     'uhd': 'http://lorempixel.com/256/256/city/1/'
 * };
 * ...
 * <Image src={src} ... />
 * ...
 * ```
 *
 * @function
 * @memberof ui/resolution
 * @param {String|ui/resolution.selectSrcSrcOptions} src       A string containing a single image
 *                                                             source or a key/value hash/object
 *                                                             containing keys representing screen
 *                                                             types (`'hd'`, `'fhd'`, `'uhd'`,
 *                                                             etc.) and values containing the asset
 *                                                             source for that target screen
 *                                                             resolution.
 *
 * @returns {String}                                           The chosen source, given the string
 *                                                             or hash provided
 * @public
 */
function selectSrc (src) {
	if (typeof src != 'string' && src) {
		let newSrc = src.fhd || src.uhd || src.hd;
		const types = screenTypes;

		// loop through resolutions
		for (let i = types.length - 1; i >= 0; i--) {
			let t = types[i].name;
			if (screenType === t && src[t]) newSrc = src[t];
		}
		src = newSrc;
	}
	return src;
}

/**
 * This will need to be re-run any time the screen size changes, so all the values can be re-cached.
 *
 * @function
 * @memberof ui/resolution
 * @param {Object}    args    A hash of options. The key `measurementNode` is used to as the node,
 *                            typically the root element, to measure and use as the dimensions for
 *                            the `screenType`.
 *
 * @returns {undefined}
 * @public
 */
function init (args = {}) {
	const {measurementNode} = args;
	updateWorkspaceBounds(measurementNode);
	screenType = getScreenType();
	screenTypeObject = getScreenTypeObject();
	unitToPixelFactors.rem = getUnitToPixelFactors();
	riRatio = getRiRatio();
	updateBaseFontSize(calculateFontSize());
}

/**
 * The current configuration
 *
 * @type {Object}
 * @memberof ui/resolution
 * @private
 */
config = Object.assign({}, configDefaults);

export {
	calculateFontSize,
	config,
	defineScreenTypes,
	getAspectRatio,
	getAspectRatioName,
	getResolutionClasses,
	getScreenTypeObject,
	getScreenType,
	init,
	scale,
	scaleToRem,
	selectSrc,
	unit,
	unitToPixelFactors,
	updateBaseFontSize,
	updateFontScale
};
