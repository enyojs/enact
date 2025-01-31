<section>

## UI Theming

### Overview

The `@enact/ui/moonstone` module offers controls tuned for use on smart TVs.  While you are certainly welcome to use 
these controls straight out of the box to develop your app, we know that many developers will want to adapt the look and
feel of these widgets to meet the design requirements of their particular projects. To that end, we offer two discrete
"theming" strategies.

*   *Rule-Override Theming:* Free-form overriding of rules that control styling
*   *Library-Based Theming:* Creation of new Enact kinds, extending Moonstone, or the Enact core UI

### Rule-Override Theming

Rule overrides go in your component's or app's `.less` file and are imported like other modules.  Enact makes use of the
[webpack css-loader](https://github.com/webpack/css-loader) and [CSS Modules](https://github.com/css-modules/css-modules) to provide the features of globally- and
locally-scoped selectors while making sure that `:local` selectors are the default.  Additionally, the
[classnames](https://github.com/JedWatson/classnames) module is used to provide the ability to combine multiple classNames
together.

```
import classNames from 'classnames';
import css from './Component.less';
```

The style rules are imported as an object (`css`) whose keys are the classNames defined in your `.less`.  To apply the styles
to your component, pass the object through `classNames()` and use the resulting value as the `className` property of the
component.

Let's say you want to change the color of the border that surrounds a focused input. The relevant selector in `@enact/moonstone/Input/Input.less`
is:

```
.decorator {
	...
	&:global(.focused) {
        border-color: @moon-active-border-color;
    }
	...
}
```

Now you can write a custom rule to override the default border color.  All that remains is to determine the scope of the
rule.

#### Global Overrides

#### Selective Overrides

The easiest way to selectively override a component is to supply your own `className` to it and write the rule such that
it only applies there.  For example, if your component contains an `@enact/moonstone/Input`, you might do something like
this:

```
import css from './Component.less';
...
	render () {
		<Input className={css.greenFocus} />
	}
...
```

**Note**: If you have more than one className to apply, you can use `classNames(class1, class2, ... classN)`
to correctly generate them.

The corresponding selector in `Component.less` might be:

```
.greenFocus {
    &:global(.focused) {
        border-color: #00ff00;
    }
}
```

### Library-Based Theming

</section>