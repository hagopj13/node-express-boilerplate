# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.7.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.6.0...v1.7.0) (2021-03-30)

### Features

- add email verification feature ([#78](https://github.com/hagopj13/node-express-boilerplate/pull/78)) ([9dae3f2](https://github.com/hagopj13/node-express-boilerplate/commit/9dae3f27df371103b6a9f96924980d2d8d7ba14e))

## [1.6.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.5.0...v1.6.0) (2020-12-27)

### Features

- add script to create app using npm init ([acf6fdf](https://github.com/hagopj13/node-express-boilerplate/commit/acf6fdfd105bba476efb171f8cd92d752ecad691))
- disable docs in production ([#59](https://github.com/hagopj13/node-express-boilerplate/pull/59)) ([68d1e33](https://github.com/hagopj13/node-express-boilerplate/commit/68d1e33194c46df93fc99d6e65ecf5feeecd354b))
- add populate feature to the paginate plugin ([#45](https://github.com/hagopj13/node-express-boilerplate/pull/45)) ([9cf9535](https://github.com/hagopj13/node-express-boilerplate/commit/9cf953553556bc5060821dc630a2d2d5e12da37f))
- add nested private fields feature to the toJSON plugin ([#47](https://github.com/hagopj13/node-express-boilerplate/pull/47)) ([5ba8628](https://github.com/hagopj13/node-express-boilerplate/commit/5ba8628ea18ffc90d39f0b8bb1241bebdb6cf675))

## [1.5.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.4.1...v1.5.0) (2020-09-28)

### Features

- add sorting by multiple criteria option ([677ee12](https://github.com/hagopj13/node-express-boilerplate/commit/677ee12808ba1cf02e422498ae464159345dc76f)), closes [#29](https://github.com/hagopj13/node-express-boilerplate/issues/29)

## [1.4.1](https://github.com/hagopj13/node-express-boilerplate/compare/v1.4.0...v1.4.1) (2020-09-14)

### Bug Fixes

- upgrade mongoose to solve vulnerability issue ([1650bdf](https://github.com/hagopj13/node-express-boilerplate/commit/1650bdf1bf36ce13597c0ed3503c7b4abef01ee5))
- add type to token payloads ([eb5de2c](https://github.com/hagopj13/node-express-boilerplate/commit/eb5de2c7523ac166ca933bff83ef1e87274f3478)), closes [#28](https://github.com/hagopj13/node-express-boilerplate/issues/28)

## [1.4.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.3.0...v1.4.0) (2020-08-22)

### Features

- use native functions instead of Lodash ([66c9e33](https://github.com/hagopj13/node-express-boilerplate/commit/66c9e33d65c88989634fc485e89b396645670730)), closes [#18](https://github.com/hagopj13/node-express-boilerplate/issues/18)
- add logout endpoint ([750feb5](https://github.com/hagopj13/node-express-boilerplate/commit/750feb5b1ddadb4da6742b445cdb1112a615ace4)), closes [#19](https://github.com/hagopj13/node-express-boilerplate/issues/19)

## [1.3.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.2.0...v1.3.0) (2020-05-17)

### Features

- add toJSON custom mongoose schema plugin ([f8ba3f6](https://github.com/hagopj13/node-express-boilerplate/commit/f8ba3f619ac42f2030c358fb44095b72fb37013b))
- add paginate custom mongoose schema plugin ([97fef4c](https://github.com/hagopj13/node-express-boilerplate/commit/97fef4cac91c86e4d33e9010705775fa9f160e96)), closes [#13](https://github.com/hagopj13/node-express-boilerplate/issues/13)

## [1.2.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.1.3...v1.2.0) (2020-05-13)

### Features

- add api documentation ([#12](https://github.com/hagopj13/node-express-boilerplate/pull/12)) ([0777889](https://github.com/hagopj13/node-express-boilerplate/commit/07778894b706ef94e35f87046db112b39b58316c)), closes [#3](https://github.com/hagopj13/node-express-boilerplate/issues/3)

### Bug Fixes

- run app with a non-root user inside docker ([#10](https://github.com/hagopj13/node-express-boilerplate/pull/10)) ([1e3195d](https://github.com/hagopj13/node-express-boilerplate/commit/1e3195d547510d51804028d4ab447cbc53372e48))

## [1.1.3](https://github.com/hagopj13/node-express-boilerplate/compare/v1.1.2...v1.1.3) (2020-03-14)

### Bug Fixes

- fix vulnerability issues by upgrading dependencies ([9c15650](https://github.com/hagopj13/node-express-boilerplate/commit/9c15650acfb0d991b621abc60ba534c904fd3fd1))

## [1.1.2](https://github.com/hagopj13/node-express-boilerplate/compare/v1.1.1...v1.1.2) (2020-02-16)

### Bug Fixes

- fix issue with incorrect stack for errors that are not of type AppError ([48d1a5a](https://github.com/hagopj13/node-express-boilerplate/commit/48d1a5ada5e5fe0975a17b521d3d7a6e1f4cab3b))

## [1.1.1](https://github.com/hagopj13/node-express-boilerplate/compare/v1.1.0...v1.1.1) (2019-12-04)

### Bug Fixes

- use JWT iat as seconds from epoch instead of milliseconds ([#4](https://github.com/hagopj13/node-express-boilerplate/pull/4)) ([c4e1a84](https://github.com/hagopj13/node-express-boilerplate/commit/c4e1a8487c6d41cc20944a081a13a2a1990de0cd))

## [1.1.0](https://github.com/hagopj13/node-express-boilerplate/compare/v1.0.0...v1.1.0) (2019-11-23)

### Features

- add docker support ([3401449](https://github.com/hagopj13/node-express-boilerplate/commit/340144979cf5e84abb047a891a0b908b01af3645)), closes [#2](https://github.com/hagopj13/node-express-boilerplate/issues/2)
- verify connection to email server at startup ([f38d86a](https://github.com/hagopj13/node-express-boilerplate/commit/f38d86a181f1816d720e009aa94619e25ef4bf93))

## 1.0.0 (2019-11-22)

### Features

- initial release
