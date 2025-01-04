# Change Log

The following is a curated list of changes in the Enact spotlight module, newest changes on the top.

## [unreleased]

### Added

- `spotlight` an optional `options.preventScroll` parameter to `focus` function to prevent scrolling by focus

## [5.0.0-alpha.3] - 2024-12-02

No significant changes.

## [4.9.4] - 2024-11-19

No significant changes.

## [4.9.3] - 2024-10-29

No significant changes.

## [5.0.0-alpha.2] - 2024-10-08

### Fixed

- `spotlight` to not require `less` dependency

## [4.9.2] - 2024-09-26

No significant changes.

## [4.9.1] - 2024-09-09

No significant changes.

## [4.7.12] - 2024-09-05

No significant changes.

## [4.9.0] - 2024-07-17

### Fixed

- `spotlight/Spotlight.disableSelector` to properly update the `selectorDisabled` container config

## [5.0.0-alpha.1] - 2024-07-11

### Added

- `spotlight/SpotlightRootDecorator` config `rootId` to specify React DOM tree root for global event handlers

## [4.9.0-beta.1] - 2024-06-17

No significant changes.

## [4.9.0-alpha.3] - 2024-06-05

### Changed

- `spotlight/Spottable` to have sibling DOM node as alternative to findDOMNode API which will be removed in React 19

## [4.0.15] - 2024-05-28

No significant changes.

## [4.9.0-alpha.2] - 2024-05-24

No significant changes.

## [4.0.14] - 2024-05-14

No significant changes.

## [4.7.11] - 2024-05-13

No significant changes.

## [4.9.0-alpha.1] - 2024-04-09

### Fixed

- `spotlight` navigation from the focused element clipped by an overflow container

## [4.7.10] - 2024-03-05

### Fixed

- `spotlight` navigation from the focused element clipped by an overflow container

## [4.8.0] - 2024-02-08

No significant changes.

## [4.7.9] - 2023-12-08

No significant changes.

## [4.5.6] - 2023-11-30

No significant changes.

## [4.0.13] - 2022-11-29

No significant changes.

## [4.7.8] - 2023-11-17

No significant changes.

## [4.7.7] - 2023-11-09

No significant changes.

## [4.7.6] - 2023-09-20

No significant changes.

## [4.7.5] - 2023-09-12

No significant changes.

## [4.7.4] - 2023-08-31

No significant changes.

## [4.7.3] - 2023-08-10

### Added

- `spotlight/SpotlightContainerDecorator` config option `leaveFor` to direct which element receives focus when the focus is leaving

## [4.7.2] - 2023-07-14

### Fixed

- `spotlight` to not show the focus effect when pointer mode is changed to `false` by touch while an app is loading

## [4.5.4] - 2023-06-07

No significant changes.

## [4.7.1] - 2023-06-02

No significant changes.

## [4.5.3] - 2023-04-06

No significant changes.

## [4.7.0] - 2023-04-25

### Fixed

- `spotlight` to show the focus effect when pointer mode is changed to `false` while an app is loading

## [4.6.2] - 2023-03-09

No significant changes.

## [4.6.1] - 2023-02-03

No significant changes.

## [4.6.0] - 2022-12-05

No significant changes.

## [4.0.12] - 2022-09-16

No significant changes.

## [4.5.2] - 2022-08-17

No significant changes.

## [4.5.1] - 2022-08-03

No significant changes.

## [4.5.0] - 2022-07-19

No significant changes.

## [4.5.0-rc.2] - 2022-07-06

### Fixed

- `spotlight` to not leave the restrict container after returning from another app

## [4.5.0-rc.1] - 2022-06-23

No significant changes.

## [4.5.0-beta.1] - 2022-05-31

### Added

- `spotlight` an optional `containerOption.toOuterContainer` parameter to `focus` function to search target recursively to outer container

## [4.5.0-alpha.2] - 2022-05-09

### Changed

- `spotlight` to not focus on an invisible element

## [4.0.11] - 2022-04-25

No significant changes.

## [4.5.0-alpha.1] - 2022-04-15

No significant changes.

## [4.0.10] - 2022-04-05

No significant changes.

## [4.1.4] - 2022-03-24

No significant changes.

## [4.1.3] - 2022-03-07

- Updated to use `forwardCustom` and add `type` when forwarding custom events

### Fixed

- `spotlight` to correctly control focus when boundaries of an element are not integers
- Styles for `debug spotlight` option in samplers to work properly

## [3.2.7] - 2022-01-17

No significant changes.

## [4.1.2] - 2021-12-22

No significant changes.

## [4.0.9] - 2021-12-15

No significant changes.

## [4.1.1] - 2021-11-30

No significant changes.

## [4.1.0] - 2021-11-04

### Fixed

- `spotlight/SpotlightRootDecorator` to show focus effect after initial loading

## [4.0.8] - 2021-10-21

No significant changes.

## [4.0.7] - 2021-09-28

No significant changes.

## [4.0.6] - 2021-09-28

No significant changes.

## [4.0.5] - 2021-08-02

### Fixed

- `spotlight/SpotlightRootDecorator` not to add locale specific classes in the wrong DOM after isomorphic build with multi locales

## [4.0.4] - 2021-07-02

No significant changes.

## [4.0.3] - 2021-06-18

### Added

- `spotlight` an optional `containerOption` parameter to `focus` function

## [4.0.2] - 2021-05-24

### Fixed

- `spotlight/SpotlightRootDecorator` not to fail in isomorphic build

## [4.0.1] - 2021-05-21

### Changed

- `spotlight/SpotlightRootDecorator` to remove focus effect when touching up

## [4.0.0] - 2021-03-26

No significant changes.

## [4.0.0-alpha.1] - 2021-02-24

### Fixed

- `spotlight/SpotlightContainerDecorator` to properly save the last-focused element with React 17

## [3.5.0] - 2021-02-05

No significant changes.

## [3.4.11] - 2020-12-11

No significant changes.

## [3.4.10] - 2020-12-09

No significant changes.

## [3.4.9] - 2020-10-30

No significant changes.

## [3.4.8] - 2020-10-08

No significant changes.

## [3.4.7] - 2020-09-01

No significant changes.

## [3.4.6] - 2020-08-24

### Fixed

- `spotlight` to correctly prioritize next spottable elements when wrapped by a container that does not also wrap the currently focused element
- `spotlight` to restore focus to last focused elements in an overflow container if they are visible

## [3.4.5] - 2020-08-18

### Fixed

- `spotlight/SpotlightContainerDecorator` to allow use of `ref`

## [3.4.4] - 2020-08-17

No significant changes.

## [3.4.3] - 2020-08-10

No significant changes.

## [3.4.2] - 2020-08-05

No significant changes.

## [3.4.1] - 2020-08-05

No significant changes.

## [3.4.0] - 2020-07-29

No significant changes.

## [3.3.1] - 2020-07-20

### Fixed

- `spotlight/Spottable` to correctly control focus when elements move under a stationary pointer

## [3.3.0] - 2020-07-13

No significant changes.

## [3.3.0-alpha.15] - 2020-07-07

No significant changes.

## [3.3.0-alpha.14] - 2020-06-29

No significant changes.

## [3.3.0-alpha.13] - 2020-06-22

### Fixed

- `spotlight` to trigger `onLeaveContainerFail` when `leaveFor` prevents navigation
- `spotlight` to correctly maintain pointer mode on webOS

## [3.3.0-alpha.12] - 2020-06-15

No significant changes.

## [3.3.0-alpha.11] - 2020-06-08

No significant changes.

## [3.3.0-alpha.10] - 2020-05-26

No significant changes.

## [3.3.0-alpha.9] - 2020-05-11

No significant changes.

## [3.3.0-alpha.8] - 2020-05-04

No significant changes.

## [3.3.0-alpha.7] - 2020-04-27

No significant changes.

## [3.3.0-alpha.6] - 2020-04-14

No significant changes.

## [3.3.0-alpha.5] - 2020-04-06

No significant changes.

## [3.3.0-alpha.4] - 2020-03-30

No significant changes.

## [3.3.0-alpha.3] - 2020-03-17

No significant changes.

## [3.3.0-alpha.2] - 2020-03-09

No significant changes.

## [3.3.0-alpha.1] - 2020-02-26

No significant changes.

## [3.2.6] - 2020-03-26

No significant changes.

## [3.2.5] - 2019-11-14

No significant changes.

## [3.2.4] - 2019-11-07

No significant changes.

## [3.2.3] - 2019-11-01

No significant changes.

## [3.2.2] - 2019-10-24

No significant changes.

## [3.2.1] - 2019-10-22

No significant changes.

## [3.2.0] - 2019-10-18

No significant changes.

## [3.1.3] - 2019-10-09

No significant changes.

## [3.1.2] - 2019-09-30

No significant changes.

## [3.1.1] - 2019-09-23

No significant changes.

## [3.1.0] - 2019-09-16

### Added

- `spotlight` support for passing a spottable node or a container node or selector to `Spotlight.focus()`

## [3.0.1] - 2019-09-09

No significant changes.

## [3.0.0] - 2019-09-03

### Fixed

- `spotlight` TypeScript signatures

## [3.0.0-rc.4] - 2019-08-22

No significant changes.

## [3.0.0-rc.3] - 2019-08-15

### Fixed

- `spotlight` to attempt to restore focus to an element nearest the pointer position when the pointer hides within an overflow container

## [3.0.0-rc.2] - 2019-08-08

No significant changes.

## [3.0.0-rc.1] - 2019-07-31

### Changed

- `spotlight` containers to include nodes identified on the `aria-owns` attribute of the container node as candidates within that container

### Fixed

- `spotlight` to attempt to restore focus through ancestor containers when the pointer hides

## [3.0.0-beta.2] - 2019-07-23

No significant changes.

## [3.0.0-beta.1] - 2019-07-15

### Fixed

- `spotlight/SpotlightContainerDecorator` to correctly forward `onFocusCapture` and `onBlurCapture` events

## [3.0.0-alpha.7] - 2019-06-24

No significant changes.

## [3.0.0-alpha.6] - 2019-06-17

No significant changes.

## [3.0.0-alpha.5] - 2019-06-10

No significant changes.

## [3.0.0-alpha.4] - 2019-06-03

No significant changes.

## [3.0.0-alpha.3] - 2019-05-29

No significant changes.

## [3.0.0-alpha.2] - 2019-05-20

No significant changes.

## [3.0.0-alpha.1] - 2019-05-15

### Changed

- `spotlight/Spottable` to allow disabled items to be focused

## [2.6.0] - ???

### Fixed

- `spotlight` to unspot the current element when tapping on non-spottable target on touch platforms

## [2.5.3] - 2019-06-06

No significant changes.

## [2.5.2] - 2019-04-23

No significant changes.

## [2.5.1] - 2019-04-09

No significant changes.

## [2.5.0] - 2019-04-01

### Fixed

- `spotlight` to guard against runtime errors caused by attempting to access containers that do not exist
- `spotlight/Spottable` to prevent unnecessary updates due to focus and blur changes

## [2.4.1] - 2019-03-11

### Fixed

- `spotlight` to remain in pointer mode when any 'cancel' key (e.g. Escape or back button) is pressed

## [2.4.0] - 2019-03-04

### Fixed

- `spotlight/Spottable` to prevent unnecessary updates due to focus changes

## [2.3.0] - 2019-02-11

### Added

- `spotlight/Spottable` property `selectionKeys`

### Fixed

- `spotlight` to improve prioritization of the contents of spotlight containers within overflow containers
- `spotlight/Spottable` and `spotlight/SpotlightContainerDecorator` to prevent focus when `spotlightDisabled` is set
- `spotlight/Spottable` to prevent emitting multiple click events when certain node types are selected via 5-way enter

## [2.2.9] - 2019-01-11

No significant changes.

## [2.2.8] - 2018-12-06

### Fixed

- `spotlight` to focus correctly within an overflow container in which the first element is another container without spottable children

## [2.2.7] - 2018-11-21

No significant changes.

## [2.2.6] - 2018-11-15

No significant changes.

## [2.2.5] - 2018-11-05

No significant changes.

## [2.2.4] - 2018-10-29

No significant changes.

## [2.2.3] - 2018-10-22

### Fixed

- `spotlight` selection of elements clipped by an overflow container

## [2.2.2] - 2018-10-15

No significant changes.

## [2.2.1] - 2018-10-09

### Fixed

- `spotlight` navigation into an overflow container which contains elements or containers larger than the container's bounds

## [2.2.0] - 2018-10-02

### Changed

- `spotlight` to not explicitly `blur()` the currently focused element when focusing another, allowing the platform to manage blurring before focus

### Fixed

- `spotlight` to correctly set focus when the window is activated
- `spotlight` to correctly set focus when entering a restricted container

## [2.1.4] - 2018-09-17

### Fixed

- `spotlight/Spottable` to respect paused state when it becomes enabled

## [2.1.3] - 2018-09-10

No significant changes.

## [2.1.2] - 2018-09-04

### Fixed

- `spotlight` to prevent default browser scrolling behavior when focusing elements within a spotlight container configured with `overflow: true`

## [2.1.1] - 2018-08-27

### Fixed

- `spotlight` to correctly handle focus with `'self-only'` containers
- `spotlight/SpotlightContainerDecorator` to unmount config instead of remove when spotlightId is changed if it preserves id

## [2.1.0] - 2018-08-20

No significant changes.

## [2.0.2] - 2018-08-13

### Fixed

- `spotlight` to update pointer mode after hiding webOS VKB

## [2.0.1] - 2018-08-01

### Fixed

- `spotlight` to not blur when pointer leaves floating webOS app while paused

## [2.0.0] - 2018-07-30

### Changed

- `spotlight` to default to 5-way mode on initialization

### Fixed

- `spotlight` to blur when pointer leaves floating webOS app
- `spotlight` to prevent changing the active container when the currently active container is restricted is "self-only"

## [2.0.0-rc.3] - 2018-07-23

### Fixed

- `spotlight` to track pointer mode while paused

## [2.0.0-rc.2] - 2018-07-16

### Added

- `spotlight` debugging to visualize which components will be targeted as the next component for any 5-way direction

## [2.0.0-rc.1] - 2018-07-09

No significant changes.

## [2.0.0-beta.9] - 2018-07-02

No significant changes.

## [2.0.0-beta.8] - 2018-06-25

### Fixed

- `spotlight/Spottable` to retain focus for disabled component after updates
- `spotlight/Spottable` to emulate `onMouseUp` events that occur immediately after a non-enter key press
- `spotlight/Spottable` to prevent scroll on focus on webOS

## [2.0.0-beta.7] - 2018-06-11

No significant changes.

## [2.0.0-beta.6] - 2018-06-04

### Fixed

- `spotlight` to provide more natural 5-way behavior
- `spotlight` to handle pointer events only when pointer has moved
- `spotlight` to update the last focused container when unable to set focus within that container
- `spotlight/Spottable` to not trigger a scroll on focus on webOS

## [2.0.0-beta.5] - 2018-05-29

No significant changes.

## [2.0.0-beta.4] - 2018-05-21

### Fixed

- `spotlight/Spottable` to not make components spottable when `spotlightDisabled` is set

## [2.0.0-beta.3] - 2018-05-14

### Fixed

- `spotlight` to retry setting focus when the window is activated
- `spotlight` handling of 5-way events after the pointer hides

## [2.0.0-beta.2] - 2018-05-07

### Fixed

- `spotlight/Spottable` to not add a focused state when a component had already been set as disabled

## [2.0.0-beta.1] - 2018-04-29

### Changed

- `spotlight/Spottable` to retain focus on a component when it becomes disabled while focused

## [2.0.0-alpha.8] - 2018-04-17

No significant changes.

## [2.0.0-alpha.7 - 2018-04-03]

### Fixed

- `spotlight` to partition and prioritize next spottable elements for more natural 5-way behavior

## [2.0.0-alpha.6] - 2018-03-22

### Removed

- `spotlight/SpotlightContainerDecorator` prop `containerId`, to be replaced by `spotlightId`

### Added

- `spotlight/Pause` module which acts as a semaphore for spotlight pause state
- `spotlight/Spottable` prop `spotlightId` to simplify focusing components

### Changed

- `spotlight/Spotlight.focus` to support focusing by `spotlightId`
- `spotlight` container attributes `data-container-disabled` and `data-container-muted` to be `data-spotlight-container-disabled` and `data-spotlight-container-muted`, respectively

## [2.0.0-alpha.5] - 2018-03-07

No significant changes.

## [2.0.0-alpha.4] - 2018-02-13

### Fixed

- `spotlight/Spottable` to not remove `tabindex` from unspottable components to allow blur events to propagate as expected when a component becomes disabled
- `spotlight/Spottable` to prevent unnecessary updates due to focus changes

## [2.0.0-alpha.3] - 2018-01-18

No significant changes.

## [2.0.0-alpha.2] - 2017-08-29

No significant changes.

## [2.0.0-alpha.1] - 2017-08-27

No significant changes.

## [1.15.0] - 2018-02-28

No significant changes.

## [1.14.0] - 2018-02-23

No significant changes.

## [1.13.4] - 2018-07-30

No significant changes.

## [1.13.3] - 2018-01-16

No significant changes.

## [1.13.2] - 2017-12-14

### Fixed

- `spotlight` to guard against accessing unconfigured container configurations

## [1.13.1] - 2017-12-06

No significant changes.

## [1.13.0] - 2017-11-28

No significant changes.

## [1.12.2] - 2017-11-15

### Fixed

- `spotlight` to handle non-5-way keys correctly to focus on next 5-way keys
- `spotlight/Spottable` to forward `onMouseEnter` and `onMouseLeave`

## [1.12.1] - 2017-11-07

No significant changes.

## [1.12.0] - 2017-10-27

### Fixed

- `spotlight` to focus enabled items that were hovered while disabled
- `spotlight` to not access non-existent container configurations
- `spotlight/Spottable` to not block next enter key when focus is moved while pressing enter

## [1.11.0] - 2017-10-24

### Changed

- `spotlight` to handle key events to preserve pointer mode for specific keys

### Fixed

- `spotlight` to not require multiple 5-way key presses in order to change focus after the window regains focus

## [1.10.1] - 2017-10-16

### Fixed

- `spotlight.Spotlight` method `focus()` to prevent focusing components within containers that are being removed

## [1.10.0] - 2017-10-09

### Fixed

- `spotlight.Spotlight` method `focus()` to verify that the target element matches its container's selector rules prior to setting focus

## [1.9.3] - 2017-10-03

- `spotlight.Spotlight` method `focus()` to verify that the target element matches its container's selector rules prior to setting focus

## [1.9.2] - 2017-09-26

No significant changes.

## [1.9.1] - 2017-09-25

No significant changes.

## [1.9.0] - 2017-09-22

### Changed

- `spotlight` to block handling repeated key down events that were interrupted by a pointer event

### Fixed

- `spotlight` to not try to focus something when the window is activated unless the window has been previously blurred
- `spotlight` to prevent containers that have been unmounted from being considered potential targets

## [1.8.0] - 2017-09-07

### Fixed

- `spotlight/Spottable` to clean up internal spotted state when blurred within `onSpotlightDisappear` handler

## [1.7.0] - 2017-08-23

### Added

- `spotlight/SpotlightContainerDecorator` config option `continue5WayHold` to support moving focus to the next spottable element on 5-way hold key
- `spotlight/Spottable` ability to restore focus when an initially disabled component becomes enabled

### Fixed

- `spotlight` to correctly restore focus to a spotlight container in another container
- `spotlight` to not try to focus something when the window is activated if focus is already set

## [1.6.1] - 2017-08-07

No significant changes.

## [1.6.0] - 2017-08-04

### Changed

- `spotlight` containers using a `restrict` value of `'self-only'` will ignore `leaveFor` directives when attempting to leave the container via 5-way

### Fixed

- `spotlight` to not blur and re-focus an element that is already focused

## [1.5.0] - 2017-07-19

### Changed

- `spotlight` 5-way target selection to ignore empty containers
- `spotlight` containers to support an array of selectors for `defaultElement`

## [1.4.1] - 2017-07-05

### Changed

- `spotlight/Spottable` to remove focus from a component when it becomes disabled and move it to another component if not explicitly moved during the `onSpotlightDisappear` event callback

## [1.4.0] - 2017-06-29

### Added

- `spotlight` handlers for window focus events

### Fixed

- `spotlight` navigation through spottable components while holding down a directional key
- `spotlight` support for preventing 5-way navigation out of a container using an empty selector
- `spotlight` container support for default elements within subcontainers

## [1.3.1] - 2017-06-14

### Fixed

- `spotlight` incorrectly focusing components within spotlight containers with `data-container-disabled` set to `false`
- `spotlight` failing to focus the default element configured for a container

## [1.3.0] - 2017-06-12

### Added

- `spotlight/styles/mixins.less` mixins which allow state-selector-rules (muted, spottable, focus, disabled) to be applied to the parent instead of the component's self. This provides much more flexibility without extra mixins to memorize.

### Changed

- `spotlight` submodules to significantly improve testability

### Fixed

- `spotlight` navigation to elements that are hidden within an overflow container (e.g. a `Scroller`)

## [1.2.2] - 2017-05-31

No significant changes.

## [1.2.1] - 2017-05-25

No significant changes.

## [1.2.0] - 2017-05-17

### Deprecated

- `spotlight/SpotlightRootDecorator.spotlightRootContainerName` to be removed in 2.0.0

### Added

- `spotlight/styles/mixins.less` which includes several mixins (`.focus`, `.disabled`, `.muted`, and `.mutedFocus`) to make it a little easier to target specific spotlight states

### Changed

- `spotlight/SpotlightContainerDecorator` config property, `enterTo`, default value to be `null` rather than `'last-focused'`
- `spotlight` container handling to address known issues and improve testability

## [1.1.0] - 2017-04-21

### Added

- `spotlight/SpotlightRootDecorator` config option: `noAutoFocus` to support prevention of setting automatic focus after render
- `spotlight.Spotlight` method `getSpottableDescendants()`

### Changed

- `spotlight/SpotlightContainerDecorator` to have no default for `spotlightRestrict`

### Fixed

- `spotlight.Spotlight` to consider nested containers when adjusting focus

## [1.0.0] - 2017-03-31

### Removed

- `spotlight.Spottable` replaced by `spotlight/Spottable`
- `spotlight.spottableClass` replaced by `spotlight/Spottable.spottableClass`
- `spotlight.SpotlightContainerDecorator` replaced by `spotlight/SpotlightContainerDecorator`
- `spotlight.spotlightDefaultClass` replaced by `spotlight/SpotlightContainerDecorator.spotlightDefaultClass`
- `spotlight.SpotlightRootDecorator` replaced by `spotlight/SpotlightRootDecorator`

### Fixed

- `spotlight.Spotlight` `set()` to properly update the container config
- `spotlight.Spotlight` to properly save the last-focused element for nested containers

## [1.0.0-beta.4] - 2017-03-10

### Changed

- `spotlight.Spottable` to prevent emulating mouse events for repeated key events

### Fixed

- `spotlight.Spotlight` pointer behavior where upon immediately entering pointer-mode, hovering over a spottable component may result in the component not receiving focus

## [1.0.0-beta.3] - 2017-02-21

### Fixed

- `spotlight.Spotlight` behavior to follow container config rules when navigating between containers
- `spotlight.Spotlight` behavior to not set focus on spottable components animating past the pointer when not in pointer-mode
- `spotlight.Spotlight` 5-way behavior where selecting a spottable component may require multiple attempts before performing actions
- `spotlight.Spotlight` to not unfocus elements on scroll

## [1.0.0-beta.2] - 2017-01-30

### Added

- `spotlight.SpotlightContainerDecorator` support for `spotlightDisabled` prop
- `spotlight.Spottable` support for `onSpotlightDown`, `onSpotlightLeft`, `onSpotlightRight`, and `onSpotlightUp` properties
- `spotlight.Spotlight` method `getDirection()` to replace `spotlightDirections`

### Removed

- `spotlight.Spotlight` `spotlightDirections`

## [1.0.0-beta.1] - 2016-12-30

### Added

- `spotlight.Spotlight` methods `isPaused()`, `isSpottable()`, `getCurrent()`, and `isMuted()`
- `spotlight.SpotlightContainerDecorator` property `spotlightMuted`
- `spotlight.spotlightDirections` export

## [1.0.0-alpha.5] - 2016-12-16

No changes.

## [1.0.0-alpha.4] - 2016-12-2

### Added

- `setPointerMode()` and `setActiveContainer()` methods

## [1.0.0-alpha.3] - 2016-11-8

### Added

- `spotlightDefaultClass` to `@enact/spotlight` export. Applying this class to an item in a
	container will cause it to be the default spotted item in that container.

### Changed

- Spotlight containers to spot the last focused element by default

### Removed

- `decorated` prop from `@enact/spotlight/focusable` as this relationship is managed
	implicitly by the component decorated by `@enact/spotlight/focusable`.

### Fixed

- Spotlight stops at container boundaries when 5-way key held down
- Several issues related to spotting controls in edge cases

## [1.0.0-alpha.2] - 2016-10-21

This version includes a lot of refactoring from the previous release. Developers need to switch to the new enact-dev command-line tool.

### Fixed

- Update spotlight container handling
- Inline docs updated to be more consistent and comprehensive

## [1.0.0-alpha.1] - 2016-09-26

Initial release
