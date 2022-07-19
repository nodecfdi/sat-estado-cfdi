# @nodecfdi/sat-estado-cfdi ChangeLog

## 2.0.1

### Patch Changes

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
