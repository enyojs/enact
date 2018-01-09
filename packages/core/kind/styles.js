import classnames from 'classnames/bind';

import {mergeClassNameMaps} from '../util';

import {addInternalProp} from './util';

/**
 * Merges external and internal CSS classes and style objects. Internal CSS classes can be
 * optionally mapped to alternate names (e.g. those generated by CSS modules) by including a
 * `css` parameter.
 *
 * Example:
 * ```
 *	const stylesConfig = {
 *		css: {
 *			button: 'unambiguous-button-class-name',
 *			client: 'unambiguous-button-class-name-client'
 *		},
 *		className: 'button global-class',
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
 *	const renderStyles = styles(stylesConfig);
 *	const renderStyles(props); // {className: 'unambiguous-button-class-name global-class', styles: {color: 'red', display: 'none'}}
 * ```
 *
 * @method styles
 * @param   {Object}    cfg  Configuration object containing one of `css`, `className`,
 *                           `publicClassNames`, and/or `style`
 * @returns {Function}       Function that accepts a props object and mutates it to merge class
 *                           names and style objects and provide the `styler` utility function and
 *                           `css` merged class name map
 * @public
 */
const styles = (cfg, optProps) => {
	const {className, prop = 'className', style} = cfg;
	let {publicClassNames: allowedClassNames, css} = cfg;

	if (cfg.css && allowedClassNames === true) {
		allowedClassNames = Object.keys(cfg.css);
	} else if (typeof allowedClassNames === 'string') {
		allowedClassNames = allowedClassNames.split(/\s+/);
	}

	const renderStyles = (props) => {
		if (style) {
			props.style = Object.assign({}, style, props.style);
		}

		// if the props includes a css map, merge them together now
		if (css && allowedClassNames && props.css) {
			css = mergeClassNameMaps(css, props.css, allowedClassNames);
		}

		const cn = css ? classnames.bind(css) : classnames;
		const joinedClassName = props[prop] = classnames(
			cn(className),
			props.className
		);

		addInternalProp(props, 'css', css);
		addInternalProp(props, 'styler', {
			join: cn,
			append: (...args) => cn(joinedClassName, ...args)
		});

		return props;
	};

	if (optProps) {
		return renderStyles(optProps);
	}

	return renderStyles;
};

export default styles;
export {styles};
