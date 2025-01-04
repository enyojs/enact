/* global globalThis */
/**
 * Utilities for detecting basic platform capabilities.
 *
 * @module core/platform
 * @exports detect
 * @exports platform
 * @public
 */

import deprecate from '../internal/deprecate';

// Refer the following for more details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
const browserEnvironment = () => !!globalThis.window;

// Note: Always true for Chrome v70 or higher: https://chromestatus.com/feature/4764225348042752
const featureTouchEvent = () => browserEnvironment() && ('TouchEvent' in globalThis);

// Refer https://patrickhlauke.github.io/touch/touchscreen-detection/
const deviceTouchScreen = () => browserEnvironment() && (
	// check if maxTouchPoints is greater than 0 first
	globalThis.navigator?.maxTouchPoints > 0 ||
	// check for any-pointer: coarse which mostly means touchscreen
	globalThis.matchMedia?.("(any-pointer: coarse)")?.matches
);

// Refer https://www.whatismybrowser.com/guides/the-latest-user-agent/ for latest user agents of major browsers
const userAgentPatterns = [
	// Normal cases except iOS
	{browserName: 'safari',  regex: /\s+Version\/(\d+)(?:\.(\d+))?\s+Safari/},
	{browserName: 'chrome',  regex: /\s+Chrome\/(\d+)[.\d]+/},
	{browserName: 'firefox', regex: /\s+Firefox\/(\d+)[.\d]+/},
	// iOS
	{browserName: 'safari',  regex: /\((?:iPhone|iPad);.+\sOS\s(\d+)_(\d+)/}
];

// The base supported versions: Used in DEPRECATED warning
const supportedVersions = {safari: 16.4, chrome: 119, firefox: 128};

const parseUserAgent = (userAgent) => {
	const detectedInfo = {
		type: 'unknown',
		browserName: 'unknown',
		browserVersion: 0
	};
	let index;

	for (index = 0; index < userAgentPatterns.length; index++) {
		const testPlatform = userAgentPatterns[index];
		const match = testPlatform.regex.exec(userAgent);

		if (match) {
			detectedInfo.browserName = testPlatform.browserName;
			detectedInfo.browserVersion = Number(`${match[1]}.${match[2] || 0}`);
			break;
		}
	}

	if (index < userAgentPatterns.length) {
		if (userAgent.includes('Web0S;')) {
			detectedInfo.type = 'webos';
		} else if (userAgent.includes(' Mobile')) {
			// Note that we don't catch 'Tablet' of Firefox as it can't be normalized with other browsers
			detectedInfo.type = 'mobile';
		} else {
			detectedInfo.type = 'desktop';
		}

		detectedInfo[detectedInfo.browserName] = detectedInfo.browserVersion;
	}

	// deprecation warning for browser versions older than our support policy
	if (supportedVersions[detectedInfo.browserName] > detectedInfo.browserVersion) {
		deprecate({name: `supporting ${detectedInfo.browserName} version older than ${supportedVersions[detectedInfo.browserName]}`, until: '5.0.0'});
	}

	return detectedInfo;
};

/**
 * @typedef {Object} PlatformDescription
 * @property {String} browserName - The name of the detected browser
 * @property {Number} browserVersion - The version of the detected browser
 * @property {Number} chrome - The version of the detected browser, if chrome browser is detected
 * @property {Number} firefox - The version of the detected browser, if firefox browser is detected
 * @property {Number} safari - The version of the detected browser, if safari browser is detected
 * @property {Boolean} touchEvent - `true` if the browser has native touch events
 * @property {Boolean} touchScreen - `true` if the platform has a touch screen
 * @property {String} type - The type of the detected platform. One of 'desktop', 'mobile', 'webos', 'node', or 'unknown'
 *
 * @memberof core/platform
 * @public
 */
let detectedPlatform = null;

/**
 * Returns the {@link core/platform.platform} object.
 *
 * @function detect
 * @returns {PlatformDescription}     The {@link core/platform.platform} object
 * @memberof core/platform
 * @public
 */
const detect = () => {
	if (detectedPlatform !== null && !__DEV__) {
		// once detected, don't bother detecting again
		return detectedPlatform;
	}

	// Parse User Agent string first
	if (browserEnvironment()) {
		detectedPlatform = parseUserAgent(globalThis.navigator?.userAgent || '');
	} else {
		// node or compatible environment (e.g. prerendering or snapshot runs)
		detectedPlatform = {
			type: 'node',
			browserName: 'unknown',
			browserVersion: 0 /* magic number for unknown */
		};
	}

	// Detect features
	detectedPlatform.touchEvent = featureTouchEvent();

	// Detect devices
	detectedPlatform.touchScreen = deviceTouchScreen();

	return detectedPlatform;
};

/**
 * Provides basic information about the running platform.
 *
 * @type {PlatformDescription}
 * @memberof core/platform
 * @public
 */
const platform = {};

[
	'browserName',
	'browserVersion',
	'chrome',
	'firefox',
	'safari',
	'touchEvent',
	'touchScreen',
	'type'
].forEach(name => {
	Object.defineProperty(platform, name, {
		enumerable: true,
		get: () => {
			const p = detect();
			return p[name];
		}
	});
});

export default platform;
export {
	detect,
	parseUserAgent,
	platform
};
