import {
	calculateFontSize,
	config,
	defineScreenTypes,
	getScreenType,
	getScreenTypeObject,
	scale,
	unit,
	updateWorkspaceBounds
} from '../resolution.js';

describe('Resolution Specs', () => {
	const screenTypes = [
		{name: 'vga', pxPerRem: 8, width: 640, height: 480, aspectRatioName: 'standard'},
		{name: 'xga', pxPerRem: 16, width: 1024, height: 768, aspectRatioName: 'standard'},
		{name: 'hd', pxPerRem: 16, width: 1280, height: 720, aspectRatioName: 'hdtv'},
		{name: 'fhd', pxPerRem: 24, width: 1920, height: 1080, aspectRatioName: 'hdtv'},
		{name: 'uw-uxga', pxPerRem: 24, width: 2560, height: 1080, aspectRatioName: 'cinema'},
		{name: 'qhd', pxPerRem: 32, width: 2560, height: 1440, aspectRatioName: 'hdtv'},
		{name: 'wqhd', pxPerRem: 32, width: 3440, height: 1440, aspectRatioName: 'cinema'},
		{name: 'uhd', pxPerRem: 48, width: 3840, height: 2160, aspectRatioName: 'hdtv', base: true},
		{name: 'uhd2', pxPerRem: 96, width: 7680, height: 4320, aspectRatioName: 'hdtv'}
	];
	const VGA = {width: 640, height: 480};
	const XGA = {width: 1024, height: 768};
	const HD = {width: 1280, height: 720};
	const FHD = {width: 1920, height: 1080};
	const UWUXGA = {width: 2560, height: 1080};
	const QHD = {width: 2560, height: 1440};
	const WQHD = {width: 3440, height: 1440};
	const UHD = {width: 3840, height: 2160};
	const UHD2 = {width: 7680, height: 4320};

	defineScreenTypes(screenTypes);

	describe('Matching Screen Types', () => {
		test('should select screen type whose dimensions are same with the screen if exist', () => {
			expect(getScreenType(VGA)).toBe('vga');
			expect(getScreenType(XGA)).toBe('xga');
			expect(getScreenType(HD)).toBe('hd');
			expect(getScreenType(FHD)).toBe('fhd');
			expect(getScreenType(UWUXGA)).toBe('uw-uxga');
			expect(getScreenType(QHD)).toBe('qhd');
			expect(getScreenType(WQHD)).toBe('wqhd');
			expect(getScreenType(UHD)).toBe('uhd');
			expect(getScreenType(UHD2)).toBe('uhd2');
		});

		test('should select screen type whose height and width are both smaller than or same with the screen if `matchSmallerScreenType` true', () => {
			config.matchSmallerScreenType = true;

			// if width or height of screen is smaller than the smallest screen type, select the smallest screen type
			expect(getScreenType({width: VGA.width - 1, height: VGA.height - 1})).toBe('vga');
			expect(getScreenType({width: VGA.width + 1, height: VGA.height - 1})).toBe('vga');
			expect(getScreenType({width: VGA.width - 1, height: VGA.height + 1})).toBe('vga');

			// VGA
			expect(getScreenType({width: VGA.width + 1, height: VGA.height + 1})).toBe('vga');

			expect(getScreenType({width: XGA.width - 1, height: XGA.height - 1})).toBe('vga');
			expect(getScreenType({width: XGA.width + 1, height: XGA.height - 1})).toBe('vga');
			expect(getScreenType({width: XGA.width - 1, height: XGA.height + 1})).toBe('vga');

			expect(getScreenType({width: HD.width - 1, height: HD.height - 1})).toBe('vga');
			expect(getScreenType({width: HD.width + 1, height: HD.height - 1})).toBe('vga');
			expect(getScreenType({width: HD.width - 1, height: HD.height + 1})).toBe('vga');

			expect(getScreenType({width: XGA.width, height: HD.height})).toBe('vga');
			expect(getScreenType({width: XGA.width - 1, height: HD.height - 1})).toBe('vga');
			expect(getScreenType({width: XGA.width + 1, height: HD.height - 1})).toBe('vga');
			expect(getScreenType({width: XGA.width - 1, height: HD.height + 1})).toBe('vga');
			expect(getScreenType({width: XGA.width + 1, height: HD.height + 1})).toBe('vga');

			expect(getScreenType({width: HD.width - 1, height: XGA.height - 1})).toBe('vga');

			// XGA
			expect(getScreenType({width: XGA.width + 1, height: XGA.height + 1})).toBe('xga');
			expect(getScreenType({width: HD.width - 1, height: XGA.height + 1})).toBe('xga');

			// HD
			expect(getScreenType({width: HD.width + 1, height: HD.height + 1})).toBe('hd');

			expect(getScreenType({width: HD.width, height: XGA.height})).toBe('hd');
			expect(getScreenType({width: HD.width + 1, height: XGA.height - 1})).toBe('hd');
			expect(getScreenType({width: HD.width + 1, height: XGA.height + 1})).toBe('hd');

			expect(getScreenType({width: FHD.width - 1, height: FHD.height - 1})).toBe('hd');
			expect(getScreenType({width: FHD.width + 1, height: FHD.height - 1})).toBe('hd');
			expect(getScreenType({width: FHD.width - 1, height: FHD.height + 1})).toBe('hd');

			expect(getScreenType({width: UWUXGA.width - 1, height: UWUXGA.height - 1})).toBe('hd');  // {height: FHD.height - 1, width: UWUXGA.width - 1}
			expect(getScreenType({width: UWUXGA.width + 1, height: UWUXGA.height - 1})).toBe('hd');  // {height: FHD.height - 1, width: UWUXGA.width + 1}

			// FHD
			expect(getScreenType({width: FHD.width + 1, height: FHD.height + 1})).toBe('fhd');

			expect(getScreenType({width: UWUXGA.width - 1, height: UWUXGA.height + 1})).toBe('fhd');  // {height: FHD.height + 1, width: UWUXGA.width - 1}

			expect(getScreenType({width: QHD.width - 1, height: QHD.height - 1})).toBe('fhd');  // {height: QHD.height - 1, width: UWUXGA.width - 1}
			expect(getScreenType({width: QHD.width - 1, height: QHD.height + 1})).toBe('fhd');  // {height: QHD.height + 1, width: UWUXGA.width - 1}

			// UWUXGA
			expect(getScreenType({width: UWUXGA.width + 1, height: UWUXGA.height + 1})).toBe('uw-uxga');  // {height: FHD.height + 1, width: UWUXGA.width + 1}

			expect(getScreenType({width: QHD.width + 1, height: QHD.height - 1})).toBe('uw-uxga');  // {height: QHD.height - 1, width: UWUXGA.width + 1}

			expect(getScreenType({width: WQHD.width - 1, height: WQHD.height - 1})).toBe('uw-uxga');  // {height: QHD.height - 1, width: WQHD.width - 1}
			expect(getScreenType({width: WQHD.width + 1, height: WQHD.height - 1})).toBe('uw-uxga');  // {height: QHD.height - 1, width: WQHD.width + 1}

			// QHD
			expect(getScreenType({width: QHD.width + 1, height: QHD.height + 1})).toBe('qhd');  // {height: QHD.height + 1, width: UWUXGA.width + 1}

			expect(getScreenType({width: WQHD.width - 1, height: WQHD.height + 1})).toBe('qhd');  // {height: QHD.height + 1, width: WQHD.width - 1}

			// WQHD
			expect(getScreenType({width: WQHD.width + 1, height: WQHD.height + 1})).toBe('wqhd');  // {height: QHD.height + 1, width: WQHD.width + 1}

			expect(getScreenType({width: UHD.width - 1, height: UHD.height - 1})).toBe('wqhd');
			expect(getScreenType({width: UHD.width + 1, height: UHD.height - 1})).toBe('wqhd');
			expect(getScreenType({width: UHD.width - 1, height: UHD.height + 1})).toBe('wqhd');

			// UHD
			expect(getScreenType({width: UHD.width + 1, height: UHD.height + 1})).toBe('uhd');

			expect(getScreenType({width: UHD2.width - 1, height: UHD2.height - 1})).toBe('uhd');
			expect(getScreenType({width: UHD2.width + 1, height: UHD2.height - 1})).toBe('uhd');
			expect(getScreenType({width: UHD2.width - 1, height: UHD2.height + 1})).toBe('uhd');

			// UHD2
			expect(getScreenType({width: UHD2.width + 1, height: UHD2.height + 1})).toBe('uhd2');
		});

		test('should select screen type whose height and width are both bigger than or same with the screen if `matchSmallerScreenType` false', () => {
			config.matchSmallerScreenType = false;

			// VGA
			expect(getScreenType({width: VGA.width - 1, height: VGA.height - 1})).toBe('vga');

			// XGA
			expect(getScreenType({width: VGA.width + 1, height: VGA.height - 1})).toBe('xga');
			expect(getScreenType({width: VGA.width - 1, height: VGA.height + 1})).toBe('xga');
			expect(getScreenType({width: VGA.width + 1, height: VGA.height + 1})).toBe('xga');

			expect(getScreenType({width: XGA.width - 1, height: XGA.height - 1})).toBe('xga');

			expect(getScreenType({width: XGA.width, height: HD.height})).toBe('xga');
			expect(getScreenType({width: XGA.width - 1, height: HD.height - 1})).toBe('xga');
			expect(getScreenType({width: XGA.width - 1, height: HD.height + 1})).toBe('xga');

			// HD
			expect(getScreenType({width: XGA.width + 1, height: HD.height - 1})).toBe('hd');

			expect(getScreenType({width: HD.width - 1, height: HD.height - 1})).toBe('hd');

			// FHD
			expect(getScreenType({width: XGA.width + 1, height: XGA.height - 1})).toBe('fhd');
			expect(getScreenType({width: XGA.width - 1, height: XGA.height + 1})).toBe('fhd');
			expect(getScreenType({width: XGA.width + 1, height: XGA.height + 1})).toBe('fhd');

			expect(getScreenType({width: HD.width, height: XGA.height})).toBe('fhd');
			expect(getScreenType({width: HD.width - 1, height: XGA.height - 1})).toBe('fhd');
			expect(getScreenType({width: HD.width + 1, height: XGA.height - 1})).toBe('fhd');
			expect(getScreenType({width: HD.width - 1, height: XGA.height + 1})).toBe('fhd');
			expect(getScreenType({width: HD.width + 1, height: XGA.height + 1})).toBe('fhd');

			expect(getScreenType({width: XGA.width + 1, height: HD.height + 1})).toBe('fhd');

			expect(getScreenType({width: HD.width + 1, height: HD.height - 1})).toBe('fhd');
			expect(getScreenType({width: HD.width - 1, height: HD.height + 1})).toBe('fhd');
			expect(getScreenType({width: HD.width + 1, height: HD.height + 1})).toBe('fhd');

			expect(getScreenType({width: FHD.width - 1, height: FHD.height - 1})).toBe('fhd');

			// UWUXGA
			expect(getScreenType({width: UWUXGA.width - 1, height: UWUXGA.height - 1})).toBe('uw-uxga');  // {height: FHD.height - 1, width: UWUXGA.width - 1}

			expect(getScreenType({width: FHD.width + 1, height: FHD.height - 1})).toBe('uw-uxga');

			// QHD
			expect(getScreenType({width: UWUXGA.width - 1, height: UWUXGA.height + 1})).toBe('qhd');  // {height: FHD.height + 1, width: UWUXGA.width - 1}

			expect(getScreenType({width: QHD.width - 1, height: QHD.height - 1})).toBe('qhd');  // {height: QHD.height - 1, width: UWUXGA.width - 1}

			expect(getScreenType({width: FHD.width - 1, height: FHD.height + 1})).toBe('qhd');
			expect(getScreenType({width: FHD.width + 1, height: FHD.height + 1})).toBe('qhd');

			// WQHD
			expect(getScreenType({width: UWUXGA.width + 1, height: UWUXGA.height - 1})).toBe('wqhd');  // {height: FHD.height - 1, width: UWUXGA.width + 1}
			expect(getScreenType({width: UWUXGA.width + 1, height: UWUXGA.height + 1})).toBe('wqhd');  // {height: FHD.height + 1, width: UWUXGA.width + 1}

			expect(getScreenType({width: QHD.width + 1, height: QHD.height - 1})).toBe('wqhd');  // {height: QHD.height - 1, width: UWUXGA.width + 1}

			expect(getScreenType({width: WQHD.width - 1, height: WQHD.height - 1})).toBe('wqhd');  // {height: QHD.height - 1, width: WQHD.width - 1}

			// UHD
			expect(getScreenType({width: QHD.width - 1, height: QHD.height + 1})).toBe('uhd');  // {height: QHD.height + 1, width: UWUXGA.width - 1}
			expect(getScreenType({width: QHD.width + 1, height: QHD.height + 1})).toBe('uhd');  // {height: QHD.height + 1, width: UWUXGA.width + 1}

			expect(getScreenType({width: WQHD.width + 1, height: WQHD.height - 1})).toBe('uhd');  // {height: QHD.height - 1, width: WQHD.width + 1}
			expect(getScreenType({width: WQHD.width - 1, height: WQHD.height + 1})).toBe('uhd');  // {height: QHD.height + 1, width: WQHD.width - 1}
			expect(getScreenType({width: WQHD.width + 1, height: WQHD.height + 1})).toBe('uhd');  // {height: QHD.height + 1, width: WQHD.width + 1}

			expect(getScreenType({width: UHD.width - 1, height: UHD.height - 1})).toBe('uhd');

			// UHD2
			expect(getScreenType({width: UHD.width + 1, height: UHD.height - 1})).toBe('uhd2');
			expect(getScreenType({width: UHD.width - 1, height: UHD.height + 1})).toBe('uhd2');
			expect(getScreenType({width: UHD.width + 1, height: UHD.height + 1})).toBe('uhd2');

			expect(getScreenType({width: UHD2.width - 1, height: UHD2.height - 1})).toBe('uhd2');

			// if width or height of screen is bigger than the biggest screen type, select the biggest screen type
			expect(getScreenType({width: UHD2.width + 1, height: UHD2.height - 1})).toBe('uhd2');
			expect(getScreenType({width: UHD2.width - 1, height: UHD2.height + 1})).toBe('uhd2');
			expect(getScreenType({width: UHD2.width + 1, height: UHD2.height + 1})).toBe('uhd2');
		});
	});

	test('should detect portrait orientation', () => {
		const fhdPortrait = {
			height: 1920,
			width: 1080
		};

		defineScreenTypes(screenTypes);

		const expected = 'fhd';
		const actual = getScreenType(fhdPortrait);

		expect(actual).toBe(expected);
	});

	test(
		'should calculate the base font size for the given screen type',
		() => {
			const expectedUHD = '48px';
			const actualUHD = calculateFontSize('uhd');

			const expectedQHD = '32px';
			const actualQHD = calculateFontSize('qhd');

			const expectedFHD = '24px';
			const actualFHD = calculateFontSize('fhd');

			const expectedHD = '16px';
			const actualHD = calculateFontSize('hd');

			expect(actualUHD).toBe(expectedUHD);
			expect(actualQHD).toBe(expectedQHD);
			expect(actualFHD).toBe(expectedFHD);
			expect(actualHD).toBe(expectedHD);
		}
	);

	test('should scale pixel measurements for the current screen', () => {
		const expectedFHD = 24 / 6;
		const actualFHD = scale(24);

		const expectedHD = 16 / 6;
		const actualHD = scale(16);

		expect(actualFHD).toBe(expectedFHD);
		expect(actualHD).toBe(expectedHD);
	});

	test('should convert pixels to units', () => {
		const expectedFHD = '3rem';
		const actualFHD = unit(24, 'rem');

		const expectedHD = '2rem';
		const actualHD = unit(16, 'rem');

		expect(actualFHD).toBe(expectedFHD);
		expect(actualHD).toBe(expectedHD);
	});

	test('should calculate font size when orientation is landscape and shouldScaleFontSize value is true', () => {
		config.intermediateScreenHandling = 'scale';
		config.matchSmallerScreenType = true;

		window.innerWidth = 1920;
		window.innerHeight = 1080;

		// update workspaceBounds
		updateWorkspaceBounds(window);
		// update orientation
		getScreenType();
		const size = calculateFontSize();
		const expected = '18px';

		expect(size).toBe(expected);

		// clear window inner size
		window.innerWidth = 640;
		window.innerHeight = 480;
	});

	test('should calculate font size when orientation is portrait and config.orientationHandling is scale', () => {
		config.orientationHandling = 'scale';
		const fhdPortrait = {width: 1080, height: 1920};
		getScreenType(fhdPortrait);

		const size = calculateFontSize();
		const scrObj = getScreenTypeObject();
		const screenScale = 1;
		const expected = scrObj.height / (scrObj.width * scrObj.pxPerRem * screenScale) + 'px';

		expect(size).toBe(expected);

	});

	// NOTE: Currently tough to test selectSrc because it relies on a global variable for screenType
	test.skip('should select source for the current screen type', function () {

	});

});
