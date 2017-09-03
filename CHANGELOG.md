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

## [0.0.4] - 2017-04-05
### Added
- chatHttp tests, for testing routes. All user & quiz endpoints have tests!
- new routes for quizzesTaken, yet to make tests
### Fixes
- linting error with expect statements, using 'dirty-chai' now
- vote query, now updates prior votes
### Bugs
- no foreign key constraint on madeBy

## [0.1.0] - 2017-04-29
### Added
- eslinting, cleaner project set up with `server/`

## [0.1.1] - 2017-04-29
### Added
- added api docs sheet
- Simple unit tests now check for empty tables in the "before" hook

# Version 2
--------------
## [2.0.0] - 2017-05-11
### Added
- changed from mysql to postgres database
- set up testing on travis ci postgres 9.6

## [2.0.1] - 2017-05-11
### Added
- changed config.js so it can be deployed to heroku

## [2.0.2] - 2017-05-12
### Added
- unit tests for user, quiz, and userquiz table
- added an integration test for all 4 "/user/" routes

## [2.0.3] - 2017-05-15
### Added
- unit test for vote, question table
- added "addQuestion" query

## [2.0.3] - 2017-05-18
### Added
- added intergration test for vote table
- added routes for the vote query

## [2.0.5] - 2017-05-18
## Changed
- changed Question table's column for choices from a JSON datatype to an array of strings
## Added
- added a route for posting a new question & updating previous questions


# Version 3
--------------
## [3.0.1] - 2017-08-31   
## changed
- upgraded to V4 of sequelize, undid previous migrations, made new database `quizwiz_v3_database`
- changed how class methods & instance methods were defined in my models, to work with V4

## [3.0.2] - 2017-08-31
## changed
- changed queryAPI so it will have an index file & everything else will be imported from it
- removed `queryApi/apiQuery` file and instead decoupled queries by tables and am importing them into `index.js` which exports them
## updated
- updated all the tests that were using `queryAPI/apiQuery` to use specified query files.
## Added
- added a `test/helper.js` file, abstracts out the code that checks if all the tables are empty

## [3.0.3] - 2017-09-03
## changed
- updated & fixed readme
- changed url to `api/v3`, and updated integration test routes
## Added
- `documentation.html` file which is just a static html file server on `/` root of my api, that documents the API
