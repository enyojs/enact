<section>

## Resolution Independence

The `@enact/ui/resolution` module provides means of designing apps and interface code that is resilient against various
screen dimensions, i.e. resolution independence, which means that a single app can be designed once and automatically
support multiple defined screen resolutions with everything remaining in proportion and to-scale. For example, screens
like HD (720p), FHD (1080p) and UHD (4k) could all be supported with a single set of measurements for just one of the
screens.

### What a Resolution Independent App Looks Like

Your app should look the same, whether it's running at HD, FHD, or UHD!

There will be more pixels at higher resolutions, of course, but the elements on screen should appear to have the same
physical size at any resolution. For example, if a button is 1-inch wide on an HD resolution screen, it should also be
1-inch wide on an FHD (or UHD) screen having the same physical dimensions.

You can use the device emulation feature in the Chrome Web Inspector to switch between HD and FHD resolutions.  If your
component or view uses JavaScript-based layout, then you will need to reload the page.

Here's a sample Moonstone Activity Panel as it appears in the Chrome Web Inspector at various resolutions, with the "Fit"
checkbox disabled:

##### No Resolution Independence Examples
|   |   |   |
|---|---|---|
|![720p/HD][hdFullThumb]|![1080p/FHD][fhdFullThumb]|![4K/UHD][uhdFullThumb]|
|*720p/HD*|*1080p/FHD*|*4K/UHD*|

##### Resolution Independence Examples
|   |   |   |
|---|---|---|
|![720p/HD][hdFitThumb]|![1080p/FHD][fhdFitThumb]|![4K/UHD][uhdFitThumb]|
|*720p/HD*|*1080p/FHD*|*4K/UHD*|

[hdFullThumb]: ./assets/resolution-independence-full-hd-thumb.png "720p/HD"
[fhdFullThumb]: ./assets/resolution-independence-full-fhd-thumb.png "1080p/FHD"
[uhdFullThumb]: ./assets/resolution-independence-full-uhd-thumb.png "4K/UHD"
[hdFitThumb]: ./assets/resolution-independence-fit-hd-thumb.png "720p/HD"
[fhdFitThumb]: ./assets/resolution-independence-fit-fhd-thumb.png "1080p/FHD"
[uhdFitThumb]: ./assets/resolution-independence-fit-uhd-thumb.png "4K/UHD"

### Writing CSS for Resolution Independence

You can continue to use FHD-based pixel measurements when writing the CSS rules in your app's `.less` files.

Behind the scenes, the framework will automatically convert your FHD-specific measurements to resolution-independent units.
You don't need to know the implementation details to use this feature, but if you're curious, you can read the section
titled "How It Works" below.

In very rare circumstances (if you're using CSS background images, for example) you may need to write a few
resolution-specific CSS rules. See "Writing CSS for Specific Resolutions" for details.

### Writing JavaScript for Resolution Independence

Ideally, your JavaScript files won't be doing a lot of layout; you should rely on built-in framework features and LESS
rules for layout wherever possible.

However, for cases where you do need to do layout in your JavaScript code, we've added a new function to make that layout
code resolution-independent.

#### scale()

The `scale()` function (found, along with other resolution-independence methods, in the `@enact/ui/resolution` module) lets
you convert FHD-based pixel values in your JavaScript code to resolution-independent equivalents.

You should use this function to wrap most of the hard-coded pixel values in your app code. For example:

```
	import {scale} from '@enact/ui/resolution';
	
	const buttonWidth = scale(60) + 'px';
	
	// use buttonWidth in your JavaScript layout code
	
	// On a 1080p FHD screen:
	// buttonWidth == '60px'
	// On a 720p HD screen:
	// buttonWidth == '40px'
	// On a 4K UHD screen:
	// buttonWidth == '120px'
```

**Note**: You should not apply `scale()` to values that you dynamically measure at runtime, since these values will
already be correct for the target resolution.

#### Specifying Image Assets for Multiple Resolutions

`@enact/moonstone/Image` supports the declaration of assets at multiple resolutions in the `src` property.

```
	const src = {
		'hd': 'http://lorempixel.com/64/64/city/1/',
		'fhd': 'http://lorempixel.com/128/128/city/1/',
		'uhd': 'http://lorempixel.com/256/256/city/1/'
	};
	
	<Image src={src} />
```

As shown in this example, you may populate `src` with a hash specifying paths to assets at different resolutions; the
framework will then select the image to use based on the current display resolution.

For the keys of the hash, use the resolution identifiers seen above--i.e., `'hd'` for 720p, `'fhd'` for 1080p, and `'uhd'` for
4K. If you don't have an image for one of the sizes, the best available image will be chosen automatically.

### Writing CSS for Specific Resolutions

In general, you should not need to write resolution-specific CSS rules. If you think you need to, there's a good chance
that something is wrong.

One exception to this rule is if you are using CSS background images. For this and similar cases, we have provided a
simple way to write resolution-specific selectors. The `@enact/ui/resolution/ResolutionDecorator` HOC applies a class to
its wrapped component (the base level `@enact/moonstone/MoonstoneDecorator` component) to represent the resolution at which your app is
currently running: `enact-res-hd` for 720p HD, `enact-res-fhd` for 1080p FHD, and `enact-res-uhd` for 4k UHD.

Here's how to use these classes to write resolution-specific selectors:

```
	/* Base rule, defaults to FHD */
	.myComponent {
		background-image: url('http://lorempixel.com/128/128/city/1/');
	}
	
	/* 720p HD-only rule */
	.myComponent.enact-res-hd {
		background-image: url('http://lorempixel.com/64/64/city/1/');
	}
	
	/* 4K UHD-only rule */
	.myComponent.enact-res-uhd {
		background-image: url('http://lorempixel.com/256/256/city/1/');
	}
```

### Writing JavaScript for Specific Resolutions

If you need your JavaScript code to behave differently for different screen types, you can use the `getScreenType()`
method. This will return one of the screen types as a string: `'hd'`, `'fhd'`, or `'uhd'`. These strings may be used in `if`
statements or `switch` statements to execute custom code for a given screen type, as in the following examples:

```
	import {getScreenType} from '@enact/ui/resolution';
	
	let columns = 0;
	
	if (getScreenType() === 'uhd') {
		columns = 5;
	} else {
		columns = 4;
	}
```

```
	import {getScreenType} from '@enact/ui/resolution';
	
	let columns = 0;
	
	switch (getScreenType()) {
		case 'hd':
			columns = 3;
			break;
		case 'uhd':
			columns = 5;
			break;
		case default:
			columns = 4;
	}
```

### How It Works

All controls are still designed and built from a 1080p/FHD perspective, but pixel measurements are converted into a new
relatively sized CSS unit called `rem`, whose size we control. Since all measurements are expressed in terms of `rem`,
when the screen size changes, we can easily scale the elements on the screen by changing the size assigned to the base
`rem` unit (or, in other words, adjusting the conversion factor between `rems` and `pixels`).

</section>