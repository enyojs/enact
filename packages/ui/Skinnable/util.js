import classnames from 'classnames';

const objectify = (arg) => {
	// undefined, null, empty string case
	// bail early
	if (!arg) return {};

	if (typeof arg === 'string') {
		// String case, convert to array for processing
		arg = arg.split(' ');
	}

	if (arg instanceof Array) {
		// Convert array values into object properties
		return arg.reduce((obj, a) => {
			obj[a] = true;
			return obj;
		}, {});
	} else if (typeof arg === 'object') {
		// Can just return objects as-is
		return arg;
	} else {
		// Invalid, return an empty object
		return {};
	}
};

const preferDefined = (a, b) => ((a != null) ? a : b);

function determineSkin (defaultSkin, authorSkin, parentSkin) {
	return authorSkin || defaultSkin || parentSkin;
}

function determineVariants (defaultVariants, allowedVariants, authorVariants, parentVariants) {
	if (!allowedVariants || !(allowedVariants instanceof Array)) {
		// There are no allowed variants, so just return an empty object, indicating that there are no viable determined variants.
		return {};
	}

	authorVariants = objectify(authorVariants);
	parentVariants = objectify(parentVariants);

	// Merge all of the variants objects, preferring values in objects from left to right.
	const mergedObj = [defaultVariants, parentVariants, authorVariants].reduce(
		(obj, a) => {
			Object.keys(a).forEach(key => {
				obj[key] = preferDefined(a[key], obj[key]);
			});

			return obj;
		},
		{}
	);

	// Clean up the merged object
	for (const key in mergedObj) {
		// Delete keys that are null or undefined and delete keys that aren't allowed
		if (mergedObj[key] == null || !allowedVariants.includes(key)) {
			delete mergedObj[key];
		}
	}


	return mergedObj;
}

function getClassName (skins, effectiveSkin, className, variants) {
	const skin = skins && skins[effectiveSkin];

	// only apply the skin class if it's set and different from the "current" skin as
	// defined by the value in context
	if (skin || variants) {
		className = classnames(skin, variants, className);
	}

	if (className) return className;
}


export {
	determineSkin,
	determineVariants,
	getClassName,
	objectify,
	preferDefined
};
