import R from 'ramda';
import classnames from 'classnames';

import {addInternalProp} from './util';

// Joins two strings in a className-friendly way
const joinClasses = R.curryN(2, (a, b) => a + ' ' + b);

// Creates a function accepting two arguments. When both are truthy, calls fn with both. If either
// is falsey, returns the truthy one or the first if both are falsey.
const bothOrEither = (fn) => R.ifElse(R.and, fn, R.or);

// Returns either the value for the property or the property name itself
const propOrSelf = R.curryN(2, (b, a) => R.propOr(a, a, b));

// Takes a string (multiple classes can be space-delimited) and a css-modules object and resolves
// the class names to their css-modules name
const resolveClassNames = R.useWith(R.compose(R.join(' '), R.map), [propOrSelf, R.split(' ')]);

// If css and classes are truthy, resolve the classes. Otherwise, return classes defaulted to ''
const resolveOrSelf = R.ifElse(R.and, resolveClassNames, R.flip(R.defaultTo('')));

// Takes a styles config object and either resolves `classes` with `css` or `classes` iself
const localClassName = R.compose(R.apply(resolveOrSelf), R.props(['css', 'classes']));

// Merges the locally-resolved classes and the className from the props
const mergeClassName = R.useWith(bothOrEither(joinClasses), [localClassName, R.prop('className')]);

// Merges the local style object and the style object from the props
const mergeStyle = R.useWith(bothOrEither(R.merge), [R.prop('style'), R.prop('style')]);

/**
 * Creates the `join()` method of the styler
 *
 * @param {Object} cfg styles configuration object
 * @param {Object} props Render props
 * @returns {Function} `join()`
 * @method join
 */
const join = (cfg) => {
	if (cfg.css) {
		return R.compose(resolveClassNames(cfg.css), classnames);
	}

	return classnames;
};

/**
 * Creates the `append()` method of the styler
 *
 * @param {Object} props Render props updated by styles with `classes` and `styler.join`
 * @returns {Function} `append()`
 * @method append
 */
const append = (props) => {
	const j = props.styler.join;
	return props.classes ? R.compose(joinClasses(props.classes), j) : j;
};

/**
 * Merges external and internal CSS classes and style objects. Internal CSS classes can be
 * optionally mapped to alternate names (e.g. those generated by CSS modules) by including a
 * `css` parameter.
 *
 * @example
 *	const stylesConfig = {
 *		css: {
 *			button: 'unambiguous-button-class-name',
 *			client: 'unambiguous-button-class-name-client'
 *		},
 *		classes: 'button global-class',
 *		style: {
 *			color: 'red'
 *		}
 *	};
 *
 *	const props = {
 *		className: 'my-button',
 *		style: {
 *			display: 'none'
 *		}
 *	};
 *
 *	styles(stylesConfig, props); // {className: 'unambiguous-button-class-name global-class', styles: {color: 'red', display: 'none'}}
 *
 * @method styles
 * @param {Object} cfg Configuration object containing one of `css`, `classes`, and/or `style`
 * @param {Object} props Render props
 * @returns {Function} Function accepting props and returning update props with computed properties
 * @public
 */
const styles = (cfg, props) => {
	props.style = mergeStyle(cfg, props);

	// classes and styler should not be automatically spread onto children
	addInternalProp(props, 'classes', mergeClassName(cfg, props));
	addInternalProp(props, 'styler', {
		join: join(cfg)
	});

	// append requires the computed classes property so it is built off the updated props rather
	// than the provided props
	props.styler.append = append(props);
	return props;
};

export default styles;
export {styles};
