# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [0.0.0] - 2017-03-31
### Added
- changelog to keep track of changes in commit
- user & quiz migration, and unit tests for each model

## [0.0.1] - 2017-03-31
### Added
- userquiz table (migration), created models/userquiz, and made 3 tests
- basic vote migration, queries and tests
- cleaned up repo of sqlite, HOLD folder
### Fixes
- fixed readme.md

## [0.0.2] - 2017-04-04
### Added
- validator middleware; checks required and optional parameters in request

## [0.0.3] - 2017-04-04
### Added
- ERD of databases
- added a 'join' in the find user query
### Fixes
- weird naming on the quiz table
- separated concerns in the api queries
