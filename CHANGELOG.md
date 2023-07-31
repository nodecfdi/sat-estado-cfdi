# @nodecfdi/sat-estado-cfdi ChangeLog

## 2.1.1

### fix sonar lint error

- fix sonar lint error

## 2.1.0

### Refactor lint and added method to see raw response

- Refactor lint and added method to see raw response
- Added method `CfdiStatus.getRawResponse()``
- Update config for tsup lib
- Update types exports for typescript module and commonjs
- Update to ESM
- Update dependencies
- Update CI workflow for fix pipeline to latest github changes
- Drop support to node versions < 16

## 2.0.2

### Fix types in consume method

- Fix types in consume method

## 2.0.1

### Added browser support

- Added browser support on distributable files

## 2.0.0

### Major Changes

- Change calling methods to kwnow document status prior was:
    |prior|actual|
    |-----|-----|
    | byDirectCall |cancellableByDirectCall|
    |byApproval|cancellableByApproval|
- Change interface definition in `ConsumerClientInterface` to specify Generic type.
- Change enums in his own namespace.
- Change file names to follow standar used in `@nodecfdi` group.

### Build

- Update dependencies
- Replaced bundle by rollup to microbundle.

### CI

- Added sonar cloud and new rules in linting.

## 1.0.4

- First release version
