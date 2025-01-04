# Change Log

The following is a curated list of changes in the Enact core module, newest changes on the top.

## [unreleased]

### Changed

- `core/platform` to support `safari` 16.4, `chrome` 119, and `firefox` 128 or later

## [5.0.0-alpha.3] - 2024-12-02

No significant changes.

## [4.9.4] - 2024-11-19

No significant changes.

## [4.9.3] - 2024-10-29

No significant changes.

## [5.0.0-alpha.2] - 2024-10-08

### Added

- `core/util` function `setDefaultProps` to set props that are missing or `undefined` to default values

## [4.9.2] - 2024-09-26

No significant changes.

## [4.9.1] - 2024-09-09

### Added

- `core/util` function `setDefaultProps` to set props that are missing or `undefined` to default values

## [4.7.12] - 2024-09-05

No significant changes.

## [4.9.0] - 2024-07-17

No significant changes.

## [5.0.0-alpha.1] - 2024-07-11

### Removed

- `core/platform` member `windowsPhone`, `edge`, `androidChrome`, `android`, `ie`, `ios`, `webos`, `androidFirefox`, `firefoxOS`, `blackberry`, and `tizen`
- `core/platform` member `gesture`, `node`, `platformName`, and `unknown`
- `core/platform` member `touch` and `touchscreen`

## [4.9.0-beta.1] - 2024-06-17

No significant changes.

## [4.9.0-alpha.3] - 2024-06-05

No significant changes.

## [4.0.15] - 2024-05-28

No significant changes.

## [4.9.0-alpha.2] - 2024-05-24

No significant changes.

## [4.0.14] - 2024-05-14

No significant changes.

## [4.7.11] - 2024-05-13

No significant changes.

## [4.9.0-alpha.1] - 2024-04-09

### Deprecated

- `core/platform` member `windowsPhone`, `edge`, `androidChrome`, `android`, `ie`, `ios`, `webos`, `androidFirefox`, `firefoxOS`, `blackberry`, and `tizen`, to be removed in 5.0.0
- `core/platform` member `gesture`, `node`, `platformName`, and `unknown`, to be removed in 5.0.0
- `core/platform` member `touch` and `touchscreen`, to be removed in 5.0.0

### Added

- `core/platform` member `type` to detect a platform like 'desktop', 'mobile', 'webos', and 'node'
- `core/platform` member `browserName` and `browserVersion` to detect the compatible major browser name and version
- `core/platform` member `touchEvent` and `touchScreen` replacing legacy `touch` and `touchscreen` respectively

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

No significant changes.

## [4.7.2] - 2023-07-14

### Fixed

- `core/handle.forwardCustom` and `core/handle.forwardCustomWithPrevent` to bind an adapter function properly

## [4.5.4] - 2023-06-07

No significant changes.

## [4.7.1] - 2023-06-02

No significant changes.

## [4.5.3] - 2023-04-06

No significant changes.

## [4.7.0] - 2023-04-25

### Deprecated

- `windowsPhone` platform in `core/platform.platforms` to be removed in 5.0.0

## [4.6.2] - 2023-03-09

No significant changes.

## [4.6.1] - 2023-02-03

No significant changes.

## [4.6.0] - 2022-12-05

### Fixed

- `core/dispatcher` to set the default target for event listeners properly when built with the snapshot option

## [4.0.12] - 2022-09-16

No significant changes.

## [4.5.2] - 2022-08-17

No significant changes.

## [4.5.1] - 2022-08-03

No significant changes.

## [4.5.0] - 2022-07-19

No significant changes.

## [4.5.0-rc.2] - 2022-07-06

### Changed

- `core/handle.forwardCustom` handler to include `preventDefault` and `stopPropagation` methods in the forwarded event payload

## [4.5.0-rc.1] - 2022-06-23

No significant changes.

## [4.5.0-beta.1] - 2022-05-31

No significant changes.

## [4.5.0-alpha.2] - 2022-05-09

No significant changes.

## [4.0.11] - 2022-04-25

No significant changes.

## [4.5.0-alpha.1] - 2022-04-15

No significant changes.

## [4.0.10] - 2022-04-05

No significant changes.

## [4.1.4] - 2022-03-24

No significant changes.

## [4.1.3] - 2022-03-07

No significant changes.

## [3.2.7] - 2022-01-17

No significant changes.

## [4.1.2] - 2021-12-22

No significant changes.

## [4.0.9] - 2021-12-15

No significant changes.

## [4.1.1] - 2021-11-30

No significant changes.

## [4.1.0] - 2021-11-04

No significant changes.

## [4.0.8] - 2021-10-21

No significant changes.

## [4.0.7] - 2021-09-28

No significant changes.

## [4.0.6] - 2021-09-28

No significant changes.

## [4.0.5] - 2021-08-02

No significant changes.

## [4.0.4] - 2021-07-02

No significant changes.

## [4.0.3] - 2021-06-18

No significant changes.

## [4.0.2] - 2021-05-24

No significant changes.

## [4.0.1] - 2021-05-21

### Fixed

- `core/platform` to detect chromium version for webOS

## [4.0.0] - 2021-03-26

No significant changes.

## [4.0.0-alpha.1] - 2021-02-24

No significant changes.

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

No significant changes.

## [3.4.5] - 2020-08-18

No significant changes.

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

No significant changes.

## [3.3.0] - 2020-07-13

No significant changes.

## [3.3.0-alpha.15] - 2020-07-07

No significant changes.

## [3.3.0-alpha.14] - 2020-06-29

### Added

- `core/util` function `mapAndFilterChildren` to safely iterate over React `children`

## [3.3.0-alpha.13] - 2020-06-22

No significant changes.

## [3.3.0-alpha.12] - 2020-06-15

No significant changes.

## [3.3.0-alpha.11] - 2020-06-08

### Added

- `core/handle.forwardCustom` handler to simplify forwarding custom events from components

## [3.3.0-alpha.10] - 2020-05-26

No significant changes.

## [3.3.0-alpha.9] - 2020-05-11

No significant changes.

## [3.3.0-alpha.8] - 2020-05-04

### Added

- `core/kind` option `functional` to return a functional component, suitable for use with React hooks, instead of a class component

## [3.3.0-alpha.7] - 2020-04-27

No significant changes.

## [3.3.0-alpha.6] - 2020-04-14

No significant changes.

## [3.3.0-alpha.5] - 2020-04-06

### Added

- `core/handle.not` to return the logical complement of the value returned from the handler

## [3.3.0-alpha.4] - 2020-03-30

No significant changes.

## [3.3.0-alpha.3] - 2020-03-17

### Fixed

- `core/util.mergeClassNames` to mirror class names when used in unit tests

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

### Fixed

- `core/handle` documentation for even better Typescript output

## [3.1.1] - 2019-09-23

### Fixed

- `core/kind` documentation of `handlers` and `computed` functions to support better Typescript definitions

## [3.1.0] - 2019-09-16

### Added

- `core/platform` member `touchscreen` to detect the presence of a touchscreen separately from support for touch events

### Fixed

- `core/kind` and `core/handle` documentation to support better Typescript definitions
- `core/platform` touch event detection

## [3.0.1] - 2019-09-09

No significant changes.

## [3.0.0] - 2019-09-03

No significant changes.

## [3.0.0-rc.4] - 2019-08-22

No significant changes.

## [3.0.0-rc.3] - 2019-08-15

No significant changes.

## [3.0.0-rc.2] - 2019-08-08

No significant changes.

## [3.0.0-rc.1] - 2019-07-31

No significant changes.

## [3.0.0-beta.2] - 2019-07-23

No significant changes.

## [3.0.0-beta.1] - 2019-07-15

### Removed

- `core/kind` config property `contextTypes`

### Fixed

- `core/platform` logic for webOS detection

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

### Added

- `core/util.clamp` to safely clamp a value between min and max bounds

## [2.5.3] - 2019-06-06

No significant changes.

## [2.5.2] - 2019-04-23

No significant changes.

## [2.5.1] - 2019-04-09

### Fixed

- `core/kind` to address warnings raised in React 16.8.6

## [2.5.0] - 2019-04-01

No significant changes.

## [2.4.1] - 2019-03-11

### Fixed

- `core/util.isRenderable` to treat values returned by `React.lazy()`, `React.memo()`, and `React.forwardRef()` as renderable
- `core/hoc` to support wrapping components returned by `React.lazy()`, `React.memo()`, and `React.forwardRef()`

## [2.4.0] - 2019-03-04

No significant changes.

## [2.3.0] - 2019-02-11

### Deprecated

- `core/kind` config property `contextTypes`, to be removed in 3.0.

### Added

- `core/kind` config property `contextType` replacing legacy `contextTypes` property

## [2.2.9] - 2019-01-11

No significant changes.

## [2.2.8] - 2018-12-06

No significant changes.

## [2.2.7] - 2018-11-21

No significant changes.

## [2.2.6] - 2018-11-15

No significant changes.

## [2.2.5] - 2018-11-05

No significant changes.

## [2.2.4] - 2018-10-29

No significant changes.

## [2.2.3] - 2018-10-22

No significant changes.

## [2.2.2] - 2018-10-15

### Fixed

- `core/util.Job` to cancel existing scheduled `idle()` jobs before scheduling another

## [2.2.1] - 2018-10-09

No significant changes.

## [2.2.0] - 2018-10-02

No significant changes.

## [2.1.4] - 2018-09-17

No significant changes.

## [2.1.3] - 2018-09-10

No significant changes.

## [2.1.2] - 2018-09-04

No significant changes.

## [2.1.1] - 2018-08-27

No significant changes.

## [2.1.0] - 2018-08-20

No significant changes.

## [2.0.2] - 2018-08-13

No significant changes.

## [2.0.1] - 2018-08-01

No significant changes.

## [2.0.0] - 2018-07-30

No significant changes.

## [2.0.0-rc.3] - 2018-07-23

No significant changes.

## [2.0.0-rc.2] - 2018-07-16

No significant changes.

## [2.0.0-rc.1] - 2018-07-09

### Removed

- `core/util.withContextFromProps` function

## [2.0.0-beta.9] - 2018-07-02

No significant changes.

## [2.0.0-beta.8] - 2018-06-25

No significant changes.

## [2.0.0-beta.7] - 2018-06-11

No significant changes.

## [2.0.0-beta.6] - 2018-06-04

No significant changes.

## [2.0.0-beta.5] - 2018-05-29

No significant changes.

## [2.0.0-beta.4] - 2018-05-21

### Added

- `core/handle.handle` utility `bindAs` to facilitate debugging and binding handlers to component instances

## [2.0.0-beta.3] - 2018-05-14

No significant changes.

## [2.0.0-beta.2] - 2018-05-07

### Fixed

- `core/dispatcher.on` to not add duplicate event handlers

## [2.0.0-beta.1] - 2018-04-29

### Added

- `core/snapshot` module with `isWindowReady` method to check the window state and `onWindowReady` method to queue window-dependent callbacks for snapshot builds

### Fixed

- `core/util.memoize` to forward all args to memoized function

## [2.0.0-alpha.8] - 2018-04-17

### Added

- `core/handle.adaptEvent` to adapt event payload before passing to subsequent handler
- `core/handle.call` to invoke a named method on a bound handler

## [2.0.0-alpha.7] - 2018-04-03

No significant changes.

## [2.0.0-alpha.6] - 2018-03-22

### Removed

- `core/factory` module, replaced by the `css` override feature

## [2.0.0-alpha.5] - 2018-03-07

### Removed

- `core/util.childrenEquals` which was no longer supported by React 16

### Added

- `core/util.memoize` method to optimize the execution of expensive functions

## [2.0.0-alpha.4] - 2018-02-13

### Changed

- `core/kind` to always return a component rather than either a component or an SFC depending upon the configuration

## [2.0.0-alpha.3] - 2018-01-18

No significant changes.

## [2.0.0-alpha.2] - 2017-08-29

No significant changes.

## [2.0.0-alpha.1] - 2017-08-27

No significant changes.

## [1.15.0] - 2018-02-28

### Deprecated

- `core/util/childrenEquals`, to be removed in 2.0.0

## [1.14.0] - 2018-02-23

### Deprecated

- `core/factory`, to be removed in 2.0.0

## [1.13.4] - 2018-07-30

No significant changes.

## [1.13.3] - 2018-01-16

### Fixed

- `core/kind` and `core/hoc` public documentation to be visible

## [1.13.2] - 2017-12-14

No significant changes.

## [1.13.1] - 2017-12-06

No significant changes.

## [1.13.0] - 2017-11-28

No significant changes.

## [1.12.2] - 2017-11-15

No significant changes.

## [1.12.1] - 2017-11-07

No significant changes.

## [1.12.0] - 2017-10-27

### Added

- `core/util.Job` APIs `idle`, `idleUntil`, `startRaf` and `startRafAfter`

## [1.11.0] - 2017-10-24

No significant changes.

## [1.10.1] - 2017-10-16

No significant changes.

## [1.10.0] - 2017-10-09

No significant changes.

## [1.9.3] - 2017-10-03

No significant changes.

## [1.9.2] - 2017-09-26

No significant changes.

## [1.9.1] - 2017-09-25

No significant changes.

## [1.9.0] - 2017-09-22

No significant changes.

## [1.8.0] - 2017-09-07

No significant changes.

## [1.7.0] - 2017-08-23

No significant changes.

## [1.6.1] - 2017-08-07

No significant changes.

## [1.6.0] - 2017-08-04

No significant changes.

## [1.5.0] - 2017-07-19

### Changed

- `@core/handle.preventDefault` (and, subsequently, `forwardWithPrevent`) to also call `preventDefault()` on the originating event

## [1.4.1] - 2017-07-05

No significant changes.

## [1.4.0] - 2017-06-29

No significant changes.

## [1.3.1] - 2017-06-14

No significant changes.

## [1.3.0] - 2017-06-12

### Added

- `core/platform` to support platform detection across multiple browsers

## [1.2.2] - 2017-05-31

No significant changes.

## [1.2.1] - 2017-05-25

No significant changes.

## [1.2.0] - 2017-05-17

### Added

- `core/handle.oneOf` to support branching event handlers

## [1.1.0] - 2017-04-21

### Added

- `core/util` documentation

### Fixed

- `core/util.childrenEquals` to work with mixed components and text

## [1.0.0] - 2017-03-31

### Added

- `core/util.Job` to replace `core/jobs` with an API that reduced the chance of job name collisions

### Removed

- `core/jobs` and replaced it with `core/util.Job`
- `core/selection`, which was only used internally by `ui/GroupItem`
- `kind` and `hoc` named exports from root module. Should be directly imported via `@enact/core/kind` and `@enact/core/hoc`, respectively.
- `core/fetch` which was no longer used by Enact

## [1.0.0-beta.4] - 2017-03-10

### Added

- `core/kind` support for `contextTypes`
- `core/utils` function `extractAriaProps()` for redirecting ARIA props when the root node of a component isn't focusable

### Changed

- `core/handle` to allow binding to components. This also introduces a breaking change in the return value of handle methods.

## [1.0.0-beta.3] - 2017-02-21

### Added

- `core/handle` function `forEventProp` to test properties on an event

## [1.0.0-beta.2] - 2017-01-30

### Added

- Support for a new `handlers` block for components created with `core/kind` to allow cached event handlers
- `core/handle` handler `forKey`
- `core/keymap` module to abstract keyboard key codes behind common names (e.g. 'up' and 'down')

### Removed

- `core/handle.withArgs` helper function which is no longer needed with the addition of the `handlers` support in `kind()`

## [1.0.0-beta.1] - 2016-12-30

### Added

- `core/factory` which provides the means to support design-time customization of components

## [1.0.0-alpha.5] - 2016-12-16

### Fixed

- `core/dispatcher` to support pre-rendering

## [1.0.0-alpha.4] - 2016-12-2

No developer-facing changes.

## [1.0.0-alpha.3] - 2016-11-8

### Added

- `core/dispatcher` - an event dispatcher for global events (e.g. `window` and `document` events) that fire outside of the React tree

## [1.0.0-alpha.2] - 2016-10-21

This version includes a lot of refactoring from the previous release. Developers need to switch to the new enact-dev command-line tool.

### Added

- `stopImmediate` to `core/handle`
- Many more unit tests

### Changed

- Computed properties in `kind()` no longer mutate props. In other words, changing the value of a prop in one computed property does not affect the value of that prop in another computed property.

### Fixed

- Inline docs updated to be more consistent and comprehensive

## [1.0.0-alpha.1] - 2016-09-26

Initial release
