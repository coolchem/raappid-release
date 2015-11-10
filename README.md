# Raappid Release

[![Coverage Status](https://coveralls.io/repos/coolchem/raappid-release/badge.svg?branch=master&service=github)](https://coveralls.io/github/coolchem/raappid-release?branch=master)  [![Build Status](https://travis-ci.org/coolchem/raappid-release.svg?branch=master)](https://travis-ci.org/coolchem/raappid-release)

Raappid release is a CLI tool which is designed to help quickly release a project.

#### Supports for Projects with

- Node package manager(package.json must be at the root of the project)
- Git repository.

### Install

#### Globally

```
npm install --global raappid-release
```

#### Locally

```
npm install --save-dev raappid-release
```

### Usage

1. Change to the directory which is the root of the project.

    ```
    npm install --save-dev raappid-release
    ```

2. Make sure all the files are commited in the repository and then run the cmd below

    ```
    raappid-release patch

    //output
    will release a patch version. i.e if the perivios project version was v0,0,5 the new release version
    will be v0.0.6
    ```
    please refer to [npm version](https://docs.npmjs.com/cli/version) for types of release versioning supported currently