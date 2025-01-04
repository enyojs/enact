---
title: Creating Components the Enact Way
---

The Enact framework is built upon the foundation of [React](https://reactjs.org).
As a result, any component that is built for React can be used in Enact and any of the patterns for
creating a component in React can also be used in Enact. To address some of the common use cases we
encountered, we've included a few modules with `@enact/core` that standardize the "Enact way" for
and provide some 'sugar' to reduce developer boilerplate.

## Creating Stateless Functional Components

We've found that Stateless Functional Components (SFCs) are a great way to decompose your
application. A primary role of a user interface component is to provide a mapping of the
Computer's model into the User's mental model. SFCs are a pure implementation of this
responsibility. They accept an object of properties and map them into a component hierarchy using
JSX.

In very simple components, a single function is sufficient to perform that mapping. However, as
components grow more complex, you often find that you need to merge incoming data with fixed data or
transform incoming data into other formats. This often leads you to decompose logic out of your main
render method for improved clarity and maintainability. This process led us to create
`@enact/core/kind`.

The `kind()` factory creates SFCs from a configuration object. It adds declarative sugar for setting
the display name, merging incoming `className` and `style` properties with component values, and computing property
values, allowing you to merge or transform incoming data outside of your render function.

Unlike simple functions which must be declared before any metadata can be attached, `kind()`
components encourage a consistent ordering of keys for top-down readability:

> The `name` component accepts these `propTypes`, which have the following default values,
> `defaultProps`. It is formatted according to the CSS modules map and `className` in `styles`. That
> data is used to produce several `computed` properties which ultimately are provided to `render` to
> create the final component hierarchy.

For the following sample, the `'Badge'` component accepts the `children` and `greeting` properties, with
`greeting` having a default of `'Hello, my name is ...'`. It applies the `'badge'` `className` (combined
with any passed-in `className`), it computes a new value for `children` and renders the result.

```js
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

const Badge = kind({
	name: 'Badge',

	propTypes: {
		children: PropTypes.string.isRequired,
		greeting: PropTypes.string,
	},

	defaultProps: {
		greeting: 'Hello, my name is ...'
	},

	styles: {
		css,
		className: 'badge'
	},

	computed: {
		children: ({children, greeting}) => `${greeting} ${children}`
	},

	render: ({children, ...rest}) => {
		delete rest.greeting;

		return (
			<div {...rest}>
				{children}
			</div>
		);
	}
});
```

> Note: You should be sure to delete any properties that are only used in calculations to avoid warnings during rendering.

## SFCs Compared with React Components

While SFCs have some important benefits, not every problem can be effectively solved with them
alone. Sometimes creating component instances that extend `React.Component` is necessary. Here are a
few possible reasons:

* You need access to the [component lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle)
* You need to maintain some component state (and it's not managed by something like Redux)
* You need consistent event handler references to prevent unnecessary renders
* You need to expose imperative APIs (though you should always avoid this when possible)

The way in which you would achieve each of these is beyond the scope of this discussion but each are
valid reasons to create a custom instance of `React.Component`. However, these reasons do not
preclude you from creating an SFC for the primary render logic. Your `React.Component` can do
whatever work it needs to do and defer the property-to-user-interface mapping to the SFC.

## Higher-Order Components

Higher-Order Components (HOCs) are useful for adding behavior or chrome UI around other independent
components. In the general sense, they are functions that accept a component (a native DOM node like
`div`, an SFC, or a `React.Component`), decorate that component in some way, and return either the
original component or a new component that wraps the original component.

Enact provides several HOCs within `@enact/ui` and `@enact/sandstone` that allow us to provide consistent
behaviors across components. All of these HOCs were created using the `hoc()` factory from
`@enact/core/hoc`. This factory gives them a couple key features:

* HOCs can be configurable by passing an object with parameters to the HOC function. This object is
  merged with a set of default configuration parameters.
* HOCs are flexible in their usage. They can:
  * Accept a configuration object and a component
    ```javascript
    const ToggleableWidget = Toggleable({toggle: 'onClick', prop: 'selected'}, Widget);
    ```
  * Accept only a component and use the default configuration:
    ```javascript
    const ToggleableWidget = Toggleable(Widget);
    ```
  * Accept a configuration object in one invocation and a component in a second invocation. This
    allows you to reuse a pre-configured HOC on multiple components:
    ```javascript
    const ToggleDecorator = Toggleable({toggle: 'onClick', prop: 'selected'});
    const ToggleableWidget = ToggleDecorator(Widget);
    const ToggleableFrob = ToggleDecorator(Frob);
    ```

If you need to create your own HOCs, you can import the `hoc()` factory to take advantage of these
features. The factory accepts an optional default configuration object and a function. The
function will receive the merged configuration object and the Wrapped component and should return
a component.

Here's a simple example to illustrate:

```js
import {Component} from 'react';

const Countable = hoc({prop: 'data-count'}, (config, Wrapped) => {
	return class extends Component {
		constructor (props) {
			super(props);
			this.state = {
				count: 0
			};
		},
		inc = () => this.setState({count: this.state.count + 1}),
		render () {
			const props = Object.assign({}, this.props, {
				[config.prop]: this.state.count,
				onClick: this.inc
			});
			return <Wrapped {...props} />
		}
	}
});

const CountableAsDataNumber = Countable({prop: 'data-number'});
const CountableDiv = Countable('div');
const CountableDivAsDataNumber = CountableAsDataNumber('div');
```

## Customizing Components at Design-Time

Occasionally, you'll want to modify the appearance of an Enact component, and usually, simply applying external styling to the outer-most element of the component, via `className` or `style` will work just fine. However, what if you need to customize one of the deeper child elements?

We've got you covered! Since Enact 2.0 we've added a built-in theming capability to make this significantly easier and even safer. Using the [theming system](./theming.md) is as straight-forward as importing your CSS/LESS file and passing it to the `css` prop on the component you want to customize. The class names defined in your CSS file that match the published class names of the target component will be applied directly to the internal elements of the component. They will be applied in addition to the existing class names, not in lieu of, so you can simply add your customizations, rather than repeat the existing styling. Each customizable component will include documentation for the `css` prop, which will list what classes are available and a brief description of what role they play.

How about an example to make this more clear. Let's customize the background color of a [`sandstone/Button`](https://github.com/enactjs/sandstone/tree/master/Button). `Button` exposes several classes for customization: 'button', 'bg', 'small', and 'selected', and in this case we're interested in 'button' and 'bg'.  In our customized component LESS file, the following should do the trick:

```css
// CustomButton.less
//
@import '~@enact/sandstone/styles/skin.less';

.button {
	.applySkins({
		.bg {
			background-color: orange;
		}
	});
}
```

*The `.applySkins` is added here because Sandstone uses our skinning system too, which is in charge of applying colors independent from measurements, layout, and metrics.*

Then, in our component we'll just apply the imported LESS file to the component with the `css` property.

```js
import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';

import css from './CustomButton.less';

const CustomButton = kind({
	name: 'CustomizedButton',

	render: ({children, ...rest}) => (
		<Button {...rest} css={css}>{children}</Button>
	)
});

export default CustomButton;
```

Now, all we do in our app is import this `CustomButton` like any other, and it will be styled with our custom styling.

```js
import CustomButton from './CustomButton';

...

	<CustomButton>Our Orange Button</CustomButton>
```

For more details and advanced theming features and recommendations, see our [Theming Guide](./theming.md).

## Customizing Sandstone skin at Runtime

Sometimes, you might want to change the appearance of components even after the application is built, for example, changing the color of the text in components or the background color of focused components globally.

As we mentioned earlier, Enact provides several ways to customize the appearance of components but these methods are at design time. Since Sandstone 2.1, we've added Sandstone skin customization feature to support runtime customization. Thanks to this feature, you can customize the appearance of Sandstone components after the application is built. It allows you to customize the skin of your app without code modification. Moreover, you can even let app users define skin customization for your app.

You might wonder how does this work? 
We've made a list of CSS variables and made those variables can override the Sandstone skin. This approach makes style changes work properly and safely after the build. As of now, we support colors but we hope we could expand this feature beyond that.

All you need to do is build your app with `--custom-skin` option and add a CSS file named `custom_skin.css` which includes a preset of colors, under the `customizations` folder in the build result like below. Make sure you've installed Enact CLI 5.1.0 or later.

```bash
enact pack --custom-skin
```

```none
my-app/
  README.md
  .gitignore
  package.json
  dist/
    customizations/
      custom_skin.css
    main.css
    main.js
    ...
  node_modules/
  src/
  resources/
  webos-meta/
```

You can make `custom_skin.css` file from the [Sandstone custom-skin sample](https://github.com/enactjs/samples/tree/master/sandstone/custom-skin). The sample also supports a preview of your customized skin. Pressing `SHOW OUTPUT` button will pop up the customized CSS and `DOWNLOAD` button will download your customized `custom_skin.css` file. The content of an example of `custom_skin.css` file looks like this:

```css
// custom_skin.css
//
.sandstone-theme {
	--sand-bg-color: #000000;
	--sand-text-color: #E6E6E6;
	--sand-component-text-color: #E6E6E6;
	--sand-component-bg-color: #7D848C;
	--sand-component-active-indicator-bg-color: #E6E6E6;
	--sand-component-inactive-indicator-bg-color: #9DA2A7;
}
```
