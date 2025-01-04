# Change Log

The following is a curated list of changes in the Enact ui module, newest changes on the top.

## [unreleased]

### Fixed

- `ui/VirtualList` to not abnormally scroll when `dataSize` and `itemSizes` changed

## [5.0.0-alpha.3] - 2024-12-02

### Fixed

- `ui/VirtualList` to re-render when the each size of variable sized items changed

## [4.9.4] - 2024-11-19

### Fixed

- `ui/VirtualList` to re-render when the each size of variable sized items changed

## [4.9.3] - 2024-10-29

No significant changes.

## [5.0.0-alpha.2] - 2024-10-08

### Added

- `ui/VirtualList.VirtualListBasic` support to read the order of items when the `listitem` role is set to items

### Fixed

- `ui/Marquee.MarqueeController` to start animation properly when `marqueeOnFocus` is set to `true` and text changed
- `ui/Scroller` and `ui/VirtualList` to have default prop when `undefined` prop is passed
- `ui/VirtualList` to update its scroll bounds when the total size of items is changed

## [4.9.2] - 2024-09-26

### Fixed

- `ui/VirtualList` to update its scroll bounds when the total size of items is changed

## [4.9.1] - 2024-09-09

### Fixed

- `ui/Scroller` and `ui/VirtualList` to have default prop when `undefined` prop is passed

## [4.7.12] - 2024-09-05

No significant changes.

## [4.9.0] - 2024-07-17

### Fixed

- `ui/Marquee.MarqueeDecorator` to start animation properly when synchronized by `ui/Marquee.MarqueeController` and text changed
- `ui/Placeholder.PlaceholderControllerDecorator` to not remount its children when it rerenders

## [5.0.0-alpha.1] - 2024-07-11

### Removed

- `ui/GridListImageItem`
- `ui/IconButton`
- `ui/Marquee.MarqueeDecorator` config `className`
- `ui/RadioDecorator`
- `ui/Scroller.ScrollerBase`
- `ui/SlotItem`
- `ui/ToggleItem`
- `ui/VirtualList.VirtualListBase`

### Changed

- `ui/Marquee.MarqueeDecorator` to use `@enact/i18n/utils.isRtlText` API to determine the text directionality

## [4.9.0-beta.1] - 2024-06-17

No significant changes.

## [4.9.0-alpha.3] - 2024-06-05

### Changed

- `ui/Placeholder.PlaceholderControllerDecorator` and `ui/ViewManager` to have sibling DOM node as alternative to findDOMNode API which will be removed in React 19

## [4.0.15] - 2024-05-28

No significant changes.

## [4.9.0-alpha.2] - 2024-05-24

No significant changes.

## [4.0.14] - 2024-05-14

No significant changes.

## [4.7.11] - 2024-05-13

No significant changes.

## [4.9.0-alpha.1] - 2024-04-09

### Added

- `ui/Layout.Cell` prop `componentCss` to support customizing the component used in `Cell`

## [4.8.0] - 2024-02-08

No significant changes.

## [4.7.9] - 2023-12-08

No significant changes.

## [4.5.6] - 2023-11-30

### Fixed

- `ui/Marquee.MarqueeDecorator` to re-render when its size changed

## [4.0.13] - 2022-11-29

### Fixed

- `ui/Marquee.MarqueeDecorator` to re-render when its size changed

## [4.7.8] - 2023-11-17

### Fixed

- `ui/Marquee.MarqueeDecorator` to re-render when its size changed

## [4.7.7] - 2023-11-09

No significant changes.

## [4.7.6] - 2023-09-20

No significant changes.

## [4.7.5] - 2023-09-12

No significant changes.

## [4.7.4] - 2023-08-31

### Fixed

- `ui/Marquee` style to avoid letters being cut off

## [4.7.3] - 2023-08-10

No significant changes.

## [4.7.2] - 2023-07-14

No significant changes.

## [4.5.4] - 2023-06-07

### Fixed

- `ui/Scroller` and `ui/VirtualList` to pass scrolling state properly to UI libraries

## [4.7.1] - 2023-06-02

No significant changes.

## [4.5.3] - 2023-04-06

No significant changes.

## [4.7.0] - 2023-04-25

### Added

- `ui/Layout.Cell` prop `grow` to expand its size to the container

### Fixed

- `ui/ViewManager` to set index prop properly when reverseTransition prop is given

## [4.6.2] - 2023-03-09

No significant changes.

## [4.6.1] - 2023-02-03

### Added

- `ui/Touchable` events `onPinch`, `onPinchStart`, `onPinchEnd`, and config `pinchConfig` to support pinch gesture

### Deprecated

- `ui/IconButton` to be removed in 5.0.0, use `ui/Button` instead
- `ui/RadioDecorator` to be removed in 5.0.0
- `ui/Scroller.ScrollerBase` to be removed in 5.0.0
- `ui/SlotItem` to be removed in 5.0.0
- `ui/ToggleItem` to be removed in 5.0.0
- `ui/VirtualList.VirtualListBase` to be removed 5.0.0

## [4.6.0] - 2022-12-05

### Fixed

- `ui/Marquee.MarqueeDecorator` to restart animation properly when `marqueeDelay` is 0

## [4.0.12] - 2022-09-16

### Fixed

- `ui/Marquee.MarqueeDecorator` to have proper spacing for bidirectional text

## [4.5.2] - 2022-08-17

### Fixed

- `ui/Marquee` to stop at the starting point after one cycle when scaled

## [4.5.1] - 2022-08-03

### Fixed

- `ui/Marquee.MarqueeDecorator` to have proper spacing for bidirectional text
- `ui/Marquee.MarqueeDecorator` to restart animation properly with React 18

## [4.5.0] - 2022-07-19

No significant changes.

## [4.5.0-rc.2] - 2022-07-06

### Fixed

- `ui/Scroller` and `ui/VirtualList` to rerender property when `clientSize` is changed

## [4.5.0-rc.1] - 2022-06-23

No significant changes.

## [4.5.0-beta.1] - 2022-05-31

### Deprecated

- `ui/GridListImageItem`, to be removed in 5.0.0. Use `ui/ImageItem` instead

### Added

- `ui/FloatingLayer` to add `detail` property containing `inputType` in `onDismiss` event payload

## [4.5.0-alpha.2] - 2022-05-09

### Deprecated

- `ui/Marquee.MarqueeDecorator` config `className` to be removed in 5.0.0

### Added

- `ui/Marquee.MarqueeDecorator` config `css` to support customizing the marquee styles

## [4.0.11] - 2022-04-25

No significant changes.

## [4.5.0-alpha.1] - 2022-04-15

### Fixed

- `ui/FloatingLayer` to stack popups always in the order in which they were opened

## [4.0.10] - 2022-04-05

No significant changes.

## [4.1.4] - 2022-03-24

### Removed

- `ui/Scroller` and `ui/VirtualList` prop `data-webos-voice-focused`, `data-webos-voice-disabled`, and `data-webos-voice-group-label`

### Added

- `ui/Marquee.MarqueeDecorator` `locale` type for `forceDirection` prop not to override the direction depending on contents

### Fixed

- `ui/Button` not to pass `icon` prop as children when `icon` is true
- `ui/Transition` to pass the event when handling transition event

## [4.1.3] - 2022-03-07

- Updated to use `forwardCustom` and add `type` when forwarding custom events

## [3.2.7] - 2022-01-17

No significant changes.

## [4.1.2] - 2021-12-22

### Fixed

- `ui/Scroller` and `ui/VirtualList` to avoid stuttering of content on drag in mobile devices
- `ui/Scroller` and `ui/VirtualList` to scroll correctly on Android platform for RTL locales

## [4.0.9] - 2021-12-15

No significant changes.

## [4.1.1] - 2021-11-30

No significant changes.

## [4.1.0] - 2021-11-04

### Fixed

- `ui/Marquee.MarqueeDecorator` to restart animation when text changed while focus retained

## [4.0.8] - 2021-10-21

### Fixed

- `ui/Marquee.MarqueeDecorator` style to render text properly when starting animation

## [4.0.7] - 2021-09-28

No significant changes.

## [4.0.6] - 2021-09-28

No significant changes.

## [4.0.5] - 2021-08-02

No significant changes.

## [4.0.4] - 2021-07-02

### Fixed

- `ui/Marquee.MarqueeDecorator` to stop marquee properly after hiding pointer when `marqueeOn` is `hover`

## [4.0.3] - 2021-06-18

No significant changes.

## [4.0.2] - 2021-05-24

No significant changes.

## [4.0.1] - 2021-05-21

No significant changes.

## [4.0.0] - 2021-03-26

### Removed

- `ui/A11yDecorator`
- `ui/Button`, `ui/Icon`, `ui/IconButton`, and `ui/LabeledIcon` default size values

### Added

- `ui/BodyText`, `ui/Button`, `ui/Group`, `ui/Heading`, `ui/Icon`, `ui/IconButton`, `ui/Image`, `ui/ImageItem`, `ui/LabeledIcon`, `ui/Layout`, `ui/ProgressBar`, `ui/Repeater`, `ui/Slider`, `ui/SlotItem`, `ui/Spinner`, `ui/ToggleIcon`, `ui/ToggleItem`, and `ui/ViewManager` support for forwarding `ref`s to the respective root component

### Changed

- `ui/Touchable` event `onHold` and `onHoldPulse` to `onHoldStart` and `onHold` respectively to match with the naming convention

### Fixed

- `ui/FloatingLayerDecorator` to render floating node properly
- `ui/Touchable' to handle touch related events only for valid targets

## [4.0.0-alpha.1] - 2021-02-24

No significant changes.

## [3.5.0] - 2021-02-05

### Deprecated

- `ui/A11yDecorator`, to be removed in 4.0.0

### Changed

- `ui/Transition` prop `duration` to support any valid CSS value for `slide` and `fade` `type`

## [3.4.11] - 2020-12-11

### Fixed

- documentation problem in styles/internal directory

## [3.4.10] - 2020-12-09

### Changed

- `ui/Media` `play` function to return promise

### Fixed

- `ui/Routable` to respect the current path on first render when using relative paths in links
- `ui/Scroller` and `ui/VirtualList` to scroll correctly on Chrome 85 or higher in RTL locales

## [3.4.9] - 2020-10-30

No significant changes.

## [3.4.8] - 2020-10-08

### Fixed

- `ui/Button` to prevent browser's default styling when pressed by touch

## [3.4.7] - 2020-09-01

### Fixed

- `ui/Scroller` and `ui/VirtualList` to call `onScrollStop` when scrollbar's visibility changed while scrolling
- `ui/ViewManager` to handle transitioning away and back to a view before a transition completes

## [3.4.6] - 2020-08-24

### Added

- `ui/MarqueeDecorator` warning against nested `Marquee`'s

## [3.4.5] - 2020-08-18

No significant changes.

## [3.4.4] - 2020-08-17

### Fixed

- `ui/FloatingLayer` and `ui/Slider` to prevent global classname leaks

## [3.4.3] - 2020-08-10

No significant changes.

## [3.4.2] - 2020-08-05

No significant changes.

## [3.4.1] - 2020-08-05

### Fixed

- `ui/Touchable` to invoke event callbacks updated during gesture

## [3.4.0] - 2020-07-29

### Added

- `ui/AnnounceDecorator.Announce` method `announce` parameter `clear` to clear previous message before setting the new message
- `ui/ViewManager` prop and `ui/ViewManager.Arranger` callback config prop `rtl` to allow arrangers to adjust animations to be locale aware

### Fixed

- `ui/Marquee` to correctly animate when scaled or when less than 1px longer than its container
- `ui/Scroller` prop `data-webos-voice-focused`, `data-webos-voice-disabled`, and `data-webos-voice-group-label`
- `ui/Scroller` and `ui/VirtualList` to re-render when its size changed
- `ui/Scroller` and `ui/VirtualList` to not fire `onScrollStop` event redundantly
- `ui/VirtualList` with scrollMode `native` to not scrollTo bottom when dataSize changed to smaller and scrollTo called with `animate: false` option

## [3.3.1] - 2020-07-20

### Changed

- `ui/Scroller` by increasing the scrollbar's inactivity timeout to 1000 ms

## [3.3.0] - 2020-07-13

### Changed

- `ui/ViewManager.TransitionGroup` to suppress `onTransition` events when a view appears or stays

## [3.3.0-alpha.15] - 2020-07-07

No significant changes.

## [3.3.0-alpha.14] - 2020-06-29

### Fixed

- `ui/Scroller` to update when `clientSize` is changed
- `ui/VirtualList` to reset scroll position when `clientSize` is changed

## [3.3.0-alpha.13] - 2020-06-22

No significant changes.

## [3.3.0-alpha.12] - 2020-06-15

### Added

- `ui/Button` prop `iconFlip` to set the `flip` prop of `iconComponent`

### Fixed

- `ui/Marquee.MarqueeDecorator` to not cause unnecessary rerenders
- `ui/Scroller` and `ui/VirtualList` to not inadvertently scroll due to click events when in RTL locales
- `ui/Skinnable` to not force all `Skinnable` children to update if a parent updates

## [3.3.0-alpha.11] - 2020-06-08

No significant changes.

## [3.3.0-alpha.10] - 2020-05-26

### Added

- `ui/Group` prop `selectedEventProp` to configure the key used to hold the value in the `onSelect` event

### Fixed

- `Toggleable` to recognize changes in `disabled` and `onToggle`

## [3.3.0-alpha.9] - 2020-05-11

No significant changes.

## [3.3.0-alpha.8] - 2020-05-04

### Fixed

- `ui/Layout` to export `Layout` by default instead of `LayoutBase`

## [3.3.0-alpha.7] - 2020-04-27

### Added

- `ui/ProgressBar` support for `orientation` type of `'radial'`
- `ui/ProgressBar` public class name `radial`
- `ui/ViewManager` events `onTransition` and `onWillTransition` payload members `index` and `previousIndex`

### Fixed

- `ui/ViewManager` to only fire `onTransition` once per transition
- `ui/Spinner` center alignment

## [3.3.0-alpha.6] - 2020-04-14

### Fixed

- `ui/Scroller` to prevent interaction with scrollbars when muted

## [3.3.0-alpha.5] - 2020-04-06

No significant changes.

## [3.3.0-alpha.4] - 2020-03-30

### Deprecated

- `ui/GridListImageItem`, use `ui/ImageItem` instead

### Added

- `ui/ImageItem` component

### Fixed

- `ui/Scroller`, `ui/VirtualList.VirtualGridList`, and `ui/VirtualList.VirtualList` to update scroll thumb position properly in nested cases

## [3.3.0-alpha.3] - 2020-03-09

### Added

- `ui/styles/mixins.less` `.position()` support for list-style arguments, in addition to the existing separated arguments
- `ui/GridListItemItem` prop `subComponents`

## [3.3.0-alpha.2] - 2020-03-09

### Changed

- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` prop `itemProps` to `childProps` for backwards compatibility

### Fixed

- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` to not suddenly jump when pressing directional keys after wheeling

## [3.3.0-alpha.1] - 2020-02-26

### Added

- `ui/Scroller`, `ui/VirtualList.VirtualGridList`, and `ui/VirtualList.VirtualList` prop `scrollMode` is added

### Changed

- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` prop `childProps` to `itemProps` for clarity

### Fixed

- `ui/Marquee` to not error when passed `null` `children` during an animation
- `ui/Button` to have more robust support for a customized `iconComponent` prop

## [3.2.6] - 2020-03-26

### Fixed

- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` to show items properly when reducing data size by updating `firstIndex` correctly
- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` not to suddenly jump when pressing directional keys after wheeling
- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` to show items properly when reducing data size

## [3.2.5] - 2019-11-14

### Fixed

- `ui/Marquee` to not double aria readout for marqueeing contents

## [3.2.4] - 2019-11-07

### Fixed

- `ui/Marquee` text alignment when content is centered

## [3.2.3] - 2019-11-01

### Fixed

- `ui/Marquee` text alignment when restarting
- `ui/Marquee` to display an ellipsis when its content changes and overflows its bounds

## [3.2.2] - 2019-10-24

No significant changes.

## [3.2.1] - 2019-10-22

### Fixed

- `ui/VirtualList.VirtualList` item rendering in RTL locales

## [3.2.0] - 2019-10-18

### Added

- `ui/Marquee` prop `marqueeSpacing` and CSS class `spacing` to configure the spacing between the repeated content

### Changed

- `ui/Marquee` to have a wrap-around effect

### Fixed

- `ui/Marquee` to start on focus when disabled

## [3.1.3] - 2019-10-09

### Fixed

- `ui/FloatingLayer` to be dismissable when `open` on mount

## [3.1.2] - 2019-09-30

### Fixed

- `ui/Button` to not require `children`
- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` to scroll smoothly when wheeling
- `ui/Scroller`, `ui/VirtualList.VirtualGridList`, and `ui/VirtualList.VirtualList` to scroll correctly after performing flick events

## [3.1.1] - 2019-09-23

### Fixed

- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` to show items properly when reducing data size

## [3.1.0] - 2019-09-16

### Added

- `ui/Routable` module
- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` prop `role` to set the ARIA `role`

## [3.0.1] - 2019-09-09

No significant changes.

## [3.0.0] - 2019-09-03

### Fixed

- `ui/Scroller` TypeScript signatures
- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` to apply `will-change` CSS property to the proper node

## [3.0.0-rc.4] - 2019-08-22

### Fixed

- `ui/styles/mixins.less` mixins: `.buildLocaleFont`, `.buildLocaleFonts`, `.buildFontFace` to properly support font-weight ranges, font-weight default values, and font-stretch values

## [3.0.0-rc.3] - 2019-08-15

### Fixed

- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` to retain the proper scroll position when updating the `itemSize` or `spacing` props
- `ui/Toggleable` TypeScript definitions

## [3.0.0-rc.2] - 2019-08-08

No significant changes.

## [3.0.0-rc.1] - 2019-07-31

### Added

- `ui/Icon`, `ui/IconButton`, and `ui/LabeledIcon` prop `flip` to flip the icon horizontally, vertically, or both

### Fixed

- `ui/Scroller`, `ui/VirtualList.VirtualGridList`, and `ui/VirtualList.VirtualList` to handle mouse down events on scrollbars

## [3.0.0-beta.2] - 2019-07-23

### Added

- `ui/ProgressBar` public class name `bar` to support customizing the background of the bar

## [3.0.0-beta.1] - 2019-07-15

### Added

- `ui/VirtualList.VirtualGridList` and `ui/VirtualList.VirtualList` support for resizing a window

### Fixed

- `ui/Icon` to support arbitrary icon name strings, like in material icons

## [3.0.0-alpha.7] - 2019-06-24

No significant changes.

## [3.0.0-alpha.6] - 2019-06-17

### Fixed

- `ui/ViewManager` to correctly arrange views when initially rendering a non-zero index

## [3.0.0-alpha.5] - 2019-06-10

### Added

- `ui/Toggleable` HOC config prop `eventProps` to allow wrapped components to specify additional event information

### Fixed

- `ui/ToggleItem` to send its `value` prop when toggled

## [3.0.0-alpha.4] - 2019-06-03

No significant changes.

## [3.0.0-alpha.3] - 2019-05-29

### Changed

- `ui/ViewManager` to use Web Animations instead of animation callbacks to improve performance resulting in API changes to `Arranger` and the pre-configured arrangers `SlideArranger`, `SlideBottomArranger`, `SlideLeftArranger`, `SlideRightArranger`, and `SlideTopArranger`

## [3.0.0-alpha.2] - 2019-05-20

No significant changes.

## [3.0.0-alpha.1] - 2019-05-15

### Added

- `ui/Button` public class `.hasIcon` which is present on the root node only when an icon has been provided
- `ui/Heading` component
- `ui/Measurable` HOC and Hook for quick and convenient measuring of simple components
- `ui/Scroller`, `ui/VirtualList.VirtualGridList`, and `ui/VirtualList.VirtualList` prop `noScrollByWheel` for preventing scroll by wheel

### Fixed

- `ui/Measurable` to remeasure after a re-layout so the measurement value is always correct
- `ui/Scroller`, `ui/VirtualList.VirtualGridList`, and `ui/VirtualList.VirtualList` not to scroll by wheel at the same time when multiple lists/scrollers are nested

### [2.6.0] - ???

### Deprecated

- `small` prop in `ui/Button.ButtonBase`, `ui/Icon.IconBase`, `ui/IconButton.IconButtonBase`, and `ui/LabeledIcon.LabeledIconBase`, which will be replaced by `size="small"` in 3.0

### Added

- `ui/Button`, `ui/Icon`, `ui/IconButton`, and `ui/LabeledIcon` prop `size`
- `ui/ToggleItem` props  `itemIcon` and `itemIconPosition` to support additional icons on ToggleItem-derived components

## [2.5.3] - 2019-06-06

### Fixed

- `ui/Scroller`, `ui/VirtualList`, and `ui/VirtualGridList` to size properly
- `ui/Scroller`, `ui/VirtualList`, and `ui/VirtualGridList` to scroll correctly on iOS and Safari
- `ui/Touchable` to not misfire a hold pulse when a drag re-enters a touch target and `cancelOnMove` is set
- `ui/ViewManager` to correctly handle transitioning quickly between two children

## [2.5.2] - 2019-04-23

### Fixed

- `ui/Skinnable` to allow overriding default `skinVariant` values
- `ui/Touchable` to prevent events firing on different nodes for the same touch action
- `ui/Touchable` to neither force focus to components nor blur components after they are touched

## [2.5.1] - 2019-04-09

### Fixed

- `ui/Touchable` to prevent doubled events in some situations on touch devices

## [2.5.0] - 2019-04-01

### Added

- `ui/Item`, `ui/Layout`, `ui/Repeater`, `ui/SlotItem`, `ui/Spinner`, `ui/ToggleItem`, and `ui/ViewManager` support for `ref` to gain access to the wrapped `component`

## [2.4.1] - 2019-03-11

### Fixed

- `ui/VirtualList` to scroll properly by `scrollTo` callback during the list is updated by prop changes

## [2.4.0] - 2019-03-04

### Added

- `ui/BodyText` prop `component` to allow customization of the tag/component used to render its base element
- `ui/Repeater` prop `component` to allow customization of its base element
- `ui/Spinner` prop `paused` to halt the animation. Previously this was hard-coded "on", but now it can be toggled.

### Changed

- `ui/Changeable` and `ui/Toggleable` to warn when both `[defaultProp]` and `[prop]` are provided

## [2.3.0] - 2019-02-11

### Added

- `ui/Skinnable` support for `skinVariants`; a way to augment a skin by adding variations of a skin to your visuals, like large text, high contrast, or grayscale
- `ui/Touchable` event `onHoldEnd` to notify when a hold has been released
- `ui/Touchable` prop `holdConfig.global` to allow a hold to continue when leaving or blurring the element

### Changed

- All content-containing LESS stylesheets (not within a `styles` directory) extensions to be `*.module.less` to retain modular context with CLI 2.x.

### Fixed

- `ui/Touchable` to continue drag events when blurring the element when `dragConfig.global` is set
- `ui/Marquee` to marquee when necessary after a locale change

## [2.2.9] - 2019-01-11

No significant changes.

## [2.2.8] - 2018-12-06

### Fixed

- `ui/Marquee` to display an ellipsis when changing to text that no longer fits within its bounds
- `ui/VirtualList`, `ui/VirtualGridList`, and `ui/Scroller` to debounce `onScrollStop` events for non-animated scrolls
- `ui/Changeable` and `ui/Toggleable` to no longer treat components as controlled if the specified prop is explicitly set to `undefined` at mount

## [2.2.7] - 2018-11-21

### Fixed

- `ui/Marquee` to avoid very small animations

## [2.2.6] - 2018-11-15

### Fixed

- `ui/Marquee` to handle contents which overflow their containers only slightly

## [2.2.5] - 2018-11-05

### Fixed

- `ui/Transition` to better support layout after changing children

## [2.2.4] - 2018-10-29

No significant changes.

## [2.2.3] - 2018-10-22

No significant changes.

## [2.2.2] - 2018-10-15

### Fixed

- `ui/Scroller` slowed scrolling behavior when repeatedly requesting a scroll to the same position

## [2.2.1] - 2018-10-09

### Fixed

- `ui/Marquee` to prevent restarting animation after blurring just before the previous animation completed

## [2.2.0] - 2018-10-02

### Added

- `ui/Marquee.MarqueeBase` prop `willAnimate` to improve app performance by deferring animation preparation styling such as composite layer promotion
- `ui/Skinnable` config option `prop` to configure the property in which to pass the current skin to the wrapped component
- `ui/Transition` prop `css` to support customizable styling

### Changed

- `ui/Cell` and `ui/Layout` to accept any type of children, since the `component` that may be set could accept any format of `children`

### Fixed

- `ui/Touchable` to correctly handle a hold cancelled from an onHold handler
- `ui/Marquee.MarqueeDecorator` to handle situations where lazily loaded CSS could cause marquee to not start correctly

## [2.1.4] - 2018-09-17

### Fixed

- `ui/ViewManager` to emit `onWillTransition` when views are either added or removed

## [2.1.3] - 2018-09-10

### Fixed

- `ui/Marquee` to stop when blurred during restart timer

## [2.1.2] - 2018-09-04

### Fixed

- `ui/GridListImageItem` to properly set `selected` style
- `ui/Marquee` positioning bug when used with CSS flexbox layouts

## [2.1.1] - 2018-08-27

No significant changes.

## [2.1.0] - 2018-08-20

### Fixed

- `ui/FloatingLayer` to apply `key`s to prevent React warnings

## [2.0.2] - 2018-08-13

### Fixed

- `ui/Image` to not display "missing image" icon when `src` fails to load
- `ui/Image` to not require `src` prop if `placeholder` is specified
- `ui/GridListImageItem` to not require `source` prop
- `ui/Scrollable` to use GPU acceleration to improve rendering performance
- `ui/Marquee` to move `position: relative` style into `animate` class to improve rendering performance

## [2.0.1] - 2018-08-01

No significant changes.

## [2.0.0] - 2018-07-30

### Added

- `ui/LabeledIcon` component for a lightweight `Icon` with a label

### Removed

- `ui/Skinnable.withSkinnableProps` higher-order component

### Fixed

- `ui/Scrollable` to ignore native drag events which interfered with touch drag support

## [2.0.0-rc.3] - 2018-07-23

No significant changes.

## [2.0.0-rc.2] - 2018-07-16

No significant changes.

## [2.0.0-rc.1] - 2018-07-09

### Removed

- `ui/FloatingLayer.contextTypes` export
- `ui/Marquee.controlContextTypes` export
- `ui/Placeholder.contextTypes` export
- `ui/Resizable.contextTypes` export

## [2.0.0-beta.9] - 2018-07-02

No significant changes.

## [2.0.0-beta.8] - 2018-06-25

### Fixed

- `ui/VirtualList` to allow scrolling on focus by default on webOS

## [2.0.0-beta.7] - 2018-06-11

### Added

- `ui/FloatingLayer.FloatingLayerBase` export

### Changed

- `ui/FloatingLayer` to call `onOpen` only after it is rendered

### Fixed

- `ui/MarqueeDecorator` to stop marqueeing when using hover and pointer hides

## [2.0.0-beta.6] - 2018-06-04

### Fixed

- `ui/FloatingLayer` to render correctly if already opened at mounting time

## [2.0.0-beta.5] - 2018-05-29

### Added

- `ui/FloatingLayerDecorator` imperative API to close all floating layers registered in the same id
- `ui/ProgressBar` and `ui/Slider` prop `progressAnchor` to configure from where in the progress bar or slider progress should begin
- `ui/Slider` prop `progressBarComponent` to support customization of progress bar within a slider
- `ui/ForwardRef` HOC to adapt `React.forwardRef` to HOC chains
- `ui/Media` component

### Fixed

- `ui/MarqueeController` to update hovered state when pointer hides
- `ui/Touchable` to end gestures when focus is lost
- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` to prevent items overlap with scroll buttons

## [2.0.0-beta.4] - 2018-05-21

### Fixed

- `ui/Touchable` to guard against null events

## [2.0.0-beta.3] - 2018-05-14

### Changed

- `ui/Marquee.MarqueeController` and `ui/Marquee.MarqueeDecorator` to prevent unnecessary focus-based updates

### Added

- `ui/Touchable` support to fire `onTap` when a `click` event occurs

### Changed

- `ui/Touchable` custom events `onDown`, `onUp`, `onMove`, and `onTap` to use the event name as the `type` rather than the shorter name (e.g. `onTap` rather than `tap`)
- `ui/Toggleable` to forward events on `activate` and `deactivate` instead of firing toggled payload. Use `toggle` to handle toggled payload from the event.

## [2.0.0-beta.2] - 2018-05-07

### Fixed

- `ui/Marquee` to always marquee when `marqueeOn` is set to `'render'`
- `ui/Item` to use its natural width rather than imposing a 100% width allowing inline Items to be the correct width
- `ui/Marquee.MarqueeDecorator` to correctly reset animation when `children` updates

## [2.0.0-beta.1] - 2018-04-29

### Changed

- `ui/Cancelable` callback `onCancel` to accept an event with a `stopPropagation` method to prevent upstream instances from handling the event instead of using the return value from the callback to prevent propagation. When a function is passed to `onCancel`, it will now receive an event and a props object instead of only the props object. When a string is passed to `onCancel`, it will now receive an event instead of no arguments. Also when a string is passed, the event will now propagate to upstream instances unless `stopPropagation` is called.
- `ui/Transition` property `duration` to now also support a numeric value representing milliseconds or a string representing any valid CSS duration value

### Fixed

- `ui/Layout.Cell` to no longer overflow when both `size` and `shrink` are set together
- `ui/Layout` to correctly support two `align` values, allowing horizontal and vertical in one property. Previously, the transverse alignment was ignored, only allowing perpendicular alignment.
- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` showing blank when `direction` prop changed after scroll position changed
- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` to support RTL by dynamic language changes

## [2.0.0-alpha.8] - 2018-04-17

### Added

- `ui/Slider` as an unstyled, base range selection component
- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` `role="list"`
- `ui/Placeholder.PlaceholderControllerDecorator` config property `thresholdFactor`

### Changed

- `ui/Transition` property `children` to not be required
- `ui/Transition` to fire `onShow` and `onHide` even when there are no `children`

### Fixed

- `ui/VirtualList.VirtualList` to re-render items when forceUpdate() called
- `ui/ViewManager` to not initially pass the wrong value for `enteringProp` when a view initiates a transition into the viewport

## [2.0.0-alpha.7] - 2018-04-03

### Removed

- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` prop `data` to eliminate the misunderstanding caused by the ambiguity of `data`

### Fixed

- `ui/Scroller` horizontal scrolling in RTL locales

## [2.0.0-alpha.6] - 2018-03-22

### Removed

- `ui/Transition` property `clipHeight`
- `ui/ProgressBar` property `vertical` and replaced it with `orientation`

### Added

- `ui/Scrollable` support for scrolling by touch
- `ui/ProgressBar` property `orientation` to accept orientation strings like `"vertical"` and `"horizontal"`

### Changed

- `ui/VirtualList.VirtualList` and `ui/VirtualList.VirtualGridList` prop `component` to be replaced by `itemRenderer`

### Fixed

- `ui/Transition` animation for `clip` for `"up"`, `"left"`, and `"right"` directions. This includes a DOM addition to the Transition markup.
- `ui/ComponentOverride` and `ui/ToggleItem` to accept HTML DOM node tag names as strings for its `component` property

## [2.0.0-alpha.5] - 2018-03-07

### Added

- `ui/Touchable` support for drag gesture
- `ui/Marquee` component
- `ui/GridListImageItem` component

### Changed

- `ui/VirtualList`, `ui/VirtualGridList`, and `ui/Scroller` components as unstyled base components to support UI libraries

### Fixed

- `ui/ViewManager` to suppress `enteringProp` for views that are rendered at mount

## [2.0.0-alpha.4] - 2018-02-13

### Added

- `ui/BodyText`, `ui/Image`, `ui/Item`, `ui/ProgressBar`, `ui/SlotItem`, `ui/Spinner`, `ui/ToggleIcon` components as unstyled base components to support UI libraries
- `ui/SlotItem` with the properties of `slotBefore` and `slotAfter` so we can easily add things like icons to an item

### Changed

- `ui/Repeater` and `ui/Group` to require a unique key for each object type data
- `ui/Toggleable` to use `'selected'` as its default `prop`, rather than `'active'`, since `'selected'` is by far the most common use case
- `ui/Touchable` to use global gesture configuration with instance override rather than component-level configuration via HOC configs with instance override

## [2.0.0-alpha.3] - 2018-01-18

### Added

- `ui/Layout` debugging aid for help with complex layouts. Simply include the `"debug"` className in your app and everything below it will show debugging lines
- `ui/Button`, `ui/Icon`, and `ui/IconButton` components to support reuse by themes
- `ui/Touchable` support for flick gestures

### Fixed

- `ui/resolution` to measure the App's rendering area instead of the entire window, and now factors-in the height as well
- `ui/Layout` prop `align` to support setting horizontal and vertical alignment in one prop, separated by a space

## [2.0.0-alpha.2] - 2017-08-29

## Added

- `ui/Scroller` and `ui/VirtualList`

## [2.0.0-alpha.1] - 2017-08-27

## Added

- `ui/Layout` which provides a technique for laying-out components on the screen using `Cells`, in rows or columns
- `ui/Touchable` to support consistent mouse and touch events along with hold gesture

## Removed

- `ui/Holdable` and `ui/Pressable` which were replaced by `ui/Touchable`

## [1.15.0] - 2018-02-28

### Fixed

- Internal method used by many components that sometimes prevented re-renders when they were needed

## [1.14.0] - 2018-02-23

### Deprecated

- `ui/Holdable` and `ui/Pressable`, to be replaced by `ui/Touchable` in 2.0.0

## [1.13.4] - 2018-07-30

No significant changes.

## [1.13.3] - 2018-01-16

No significant changes.

## [1.13.2] - 2017-12-14

### Fixed

- `ui/ViewManager` to revert 1.13.0 fix for lifecycle timing when entering a view

## [1.13.1] - 2017-12-06

No significant changes.

## [1.13.0] - 2017-11-28

### Added

- `ui/Transition` animation timing functions `ease-in`, `ease-out`, `ease-in-quart`, and `ease-out-quart` to provide prettier options for transitions that may be more suited to a specific visual style

### Fixed

- `ui/ViewManager` to prevent interaction issue with `moonstone/Scroller`

## [1.12.2] - 2017-11-15

### Fixed

- `ui/Remeasurable` to update on every trigger change
- `ui/Transition` to revert 1.12.1 change to support `clip` transition-type directions and rendering optimizations

## [1.12.1] - 2017-11-07

### Fixed

- `ui/Transition` support for all `clip` transition-type directions and made rendering optimizations

## [1.12.0] - 2017-10-27

No significant changes.

## [1.11.0] - 2017-10-24

No significant changes.

## [1.10.1] - 2017-10-16

### Fixed

- `ui/Pressable` to properly set pressed state to false on blur and release

## [1.10.0] - 2017-10-09

### Added

- `ui/Layout` which provides a technique for laying-out components on the screen using `Cells`, in rows or columns

## [1.9.3] - 2017-10-03

### Fixed

- `ui/Transition` to recalculate height when a resize occurs

## [1.9.2] - 2017-09-26

No significant changes.

## [1.9.1] - 2017-09-25

No significant changes.

## [1.9.0] - 2017-09-22

### Added

- `ui/styles/mixins.less` mixins: `.remove-margin-on-edge-children()` and `.remove-padding-on-edge-children()` to better handle edge margins on container components

### Changed

- `ui/Holdable` to cancel key hold events when the pointer moves
- `ui/Holdable` and `ui/Changeable` back to Components and moved performance improvements elsewhere

### Fixed

- `ui/FloatingLayer` to not asynchronously attach a click handler when the floating layer is removed
- `ui/ViewManager` to correctly position items when changing mid-transition

## [1.8.0] - 2017-09-07

### Changed

- `ui/Holdable` and `ui/Changeable` to be PureComponents to reduce the number of updates

## [1.7.0] - 2017-08-23

No significant changes.

## [1.6.1] - 2017-08-07

No significant changes.

## [1.6.0] - 2017-08-04

### Fixed

- `ui/PlaceholderDecorator` to update bounds of `Scroller` when the `visible` state changed

## [1.5.0] - 2017-07-19

### Fixed

- `ui/Cancelable` warning for string type cancel handler

## [1.4.1] - 2017-07-05

No significant changes.

## [1.4.0] - 2017-06-29

No significant changes.

## [1.3.1] - 2017-06-14

No significant changes.

## [1.3.0] - 2017-06-12

### Added

- `ui/ViewManager` prop `childProps` to pass static props to each child

### Fixed

- `ui/ViewManager` to have a view count of 0 specifically for `noAnimation` cases. This helps things like `spotlight` restore `focus` properly.
- `ui/Cancelable` to run modal handlers on `window` object and correctly store handlers in LIFO order

## [1.2.2] - 2017-05-31

No significant changes.

## [1.2.1] - 2017-05-25

No significant changes.

## [1.2.0] - 2017-05-17

### Added

- `ui/Skinnable` to provide themes with a way to apply a base theme styling and skins on top of that
- `ui/Transition` prop `onShow` that fires when transitioning into view a component.
- `ui/transition` callback prop `onShow` that fires when transitioning into view completes

### Changed

- `ui/View` to prevent re-renders on views leaving the `ViewManager`

## [1.1.0] - 2017-04-21

### Changed

- `ui/Slottable` to support slot-candidate tags that have multiple props, which are now forwarded directly instead of just their children

### Fixed

- `ui/Cancelable` to run modal handlers in the right order

## [1.0.0] - 2017-03-31

### Added

- `ui/Placeholder` module with `PlaceholderControllerDecorator` and `PlaceholderDecorator` HOCs which facilitate rendering placeholder components until the wrapped component would scroll into the viewport

### Changed

- `ui/Repeater` to accept an array of objects as children which are spread onto the generated components

### Removed

- `ui/validators` which was no longer used elsewhere in Enact

## [1.0.0-beta.4] - 2017-03-10

### Added

- `ui/A11yDecorator` to facilitate adding pre/post hints to components
- `ui/AnnounceDecorator` to facilitate announcing actions for accessibility

## [1.0.0-beta.3] - 2017-02-21

### Added

- `ui/Resizable` Higher-order Component to facilitate notification of resized components

## [1.0.0-beta.2] - 2017-01-30

### Added

- `ui/ViewManager` properties `enteringDelay` and `enteringProp` to aid deferred rendering of views
- `ui/resolution` function `scaleToRem` for those times when you have a size in pixels that you want to convert directly to `rem` to support automatic dynamic resizing

## [1.0.0-beta.1] - 2016-12-30

### Added

- `ui/RadioDecorator` and `ui/RadioControllerDecorator` to support radio group-style management of components
- `ui/Holdable` Higher-order Component
- `ui/ViewManager` events `onAppear`, `onEnter`, `onLeave`, `onStay`, `onTransition`, and `onWillTransition`
- `ui/FloatingLayer` `scrimType` prop value `none`
- `ui/Pressable` config option `onMouseLeave`

### Removed

- `ui/Transition` prop `fit` in favor of using `className`

### Changed

- `ui/FloatingLayer` property `autoDismiss` to handle both ESC key and click events

## [1.0.0-alpha.5] - 2016-12-16

No changes.

## [1.0.0-alpha.4] - 2016-12-2

### Added

- `ui/FloatingLayer` module with `FloatingLayer` and `FloatingLayerDecorator` components
- `fit`, `noAnimation` props to `ui/TransitionBase`
- `onHide` prop to `ui/Transition`
- LESS mixins from `@enact/moonstone` that are general purpose and can be utilized by various UI
libraries.

## [1.0.0-alpha.3] - 2016-11-8

### Added

- Selection type support to `ui/Group`

### Changed

- Renamed `ui/Group` prop `select` to `childSelect` and added prop `select` to support selection types

## [1.0.0-alpha.2] - 2016-10-21

This version includes a lot of refactoring from the previous release. Developers need to switch to the new enact-dev command-line tool.

### Added

- New components and HOCs: `ui/Cancelable`, `ui/Changeable`, `ui/Selectable`
- Support for enact-dev command-line tool.
- New options for `ui/Toggleable` HOC
- Many more unit tests

### Changed

- Removed `ui/Pickable` HOC
- Some props for UI state were renamed to have `default` prefix where state was managed by the component. (e.g. `defaultOpen`)

### Fixed

- Many components were fixed, polished, updated and documented
- Inline docs updated to be more consistent and comprehensive

## [1.0.0-alpha.1] - 2016-09-26

Initial release
