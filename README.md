<p align="center">
  <img src="https://github.com/enactjs/enact/assets/4288375/25a32c12-6a9b-44d4-80b3-a8f82ddcc643">
</p>

<h1 align="center">Enact</h1>

<h2>An app development framework built atop React that’s easy to use, performant and customizable.</h2>
Enact is to provide the building blocks for creating robust and maintainable applications. To that end, we’ve pulled together the best solutions for internationalization (i18n), accessibility (a11y), focus management, linting, testing and building. Then, we created a set of reusable components and behaviors on top of that. We combined these pieces and ensured that they work together seamlessly, allowing developers to focus on implementation.
<br><br>

[![Travis](https://img.shields.io/travis/com/enactjs/enact/master?style=flat-square)](https://app.travis-ci.com/github/enactjs/enact) [![npm (scoped)](https://img.shields.io/npm/v/@enact/core.svg?style=flat-square)](https://www.npmjs.com/package/@enact/core) [![license](https://img.shields.io/github/license/enactjs/enact.svg?style=flat-square)](http://www.apache.org/licenses/LICENSE-2.0) [![Gitter](https://img.shields.io/gitter/room/EnactJS/Lobby.svg?style=flat-square)](https://gitter.im/EnactJS/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://enactjs.com/docs/developer-guide/contributing)

> A mono-repo containing Enact framework modules

* [core](./packages/core/) The set of essential building blocks for an Enact-based application.
* [ui](./packages/ui) A set of reusable behaviors and a library of unstyled components for creating Enact themes.
* [spotlight](./packages/spotlight) An extensible library for 5-way navigation and focus control.
* [i18n](./packages/i18n) Internationalization library based on iLib.
* [webos](./packages/webos) Utility functions for working with webOS devices.

Enact uses lerna to manage the individual modules within this repo.

## Getting Started

Developers should use the individual npm modules hosted under the `@enact` namespace.

For local framework development, this mono-repo can be setup using the `bootstrap` command:

```
npm run bootstrap
```

Alternatively, if you wish to install and setup package dependencies for global usage on a system, the `bootstrap-link` command can be used:
```
npm run bootstrap-link
```
That command will `npm link` the packages into global NPM userspace, for use in other projects via `npm link <package>` or `enact link`.

## Documentation

* [Tutorials](https://enactjs.com/docs/tutorials)
* [API Docs](https://enactjs.com/docs/modules)
* [Developer Guide](https://enactjs.com/docs/developer-guide)
* [Contribution Guide](https://enactjs.com/docs/developer-guide/contributing)

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
