# @enact/spotlight [![npm (scoped)](https://img.shields.io/npm/v/@enact/spotlight.svg?style=flat-square)](https://www.npmjs.com/package/@enact/spotlight)

> An extensible library for 5-way navigation and focus control.

An extensible utility that enables users to navigate
applications using a keyboard or television remote control.  Responding to input
from the **UP**, **DOWN**, **LEFT**, **RIGHT**, and **RETURN** keys, Spotlight
provides a navigation experience that compares favorably to that of a
computer-with-mouse.

## Usage

```
import kind from '@enact/core/kind';
import SpotlightRootDecorator from '@enact/spotlight/SpotlightRootDecorator'
import Spottable from '@enact/spotlight/Spottable'

const MySpottableComponent = Spottable('div');

const MyApp = kind({
	name: 'MyApp',
	render: () => (<MySpottableComponent>Hello, Enact!</MySpottableComponent>)
});
const MySpotlightApp = SpotlightRootDecorator(MyApp);

export default MySpotlightApp;
```

See the [docs](docs/) for more information.

## Additional Information

When using `@enact/sandstone`, the `SpotlightRootDecorator` is applied automatically by
`@enact/sandstone/ThemeDecorator`.

## Acknowledgments

Spotlight is based on a fork of [JavaScript SpatialNavigation](https://github.com/luke-chang/js-spatial-navigation)
(c) 2016 Luke Chang, under the terms of the [Mozilla Public License](https://www.mozilla.org/en-US/MPL/2.0/).

## Copyright and License Information

Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2012-2025 LG Electronics

Unless otherwise specified or set forth in the NOTICE file, all content,
including all source code files and documentation files in this repository are:
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this content except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
