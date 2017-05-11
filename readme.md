# QuizWiz API
[![Build Status](https://travis-ci.org/thechutrain/quizwizAPI.svg?branch=master)](https://travis-ci.org/thechutrain/quizwiz)

> a RESTful Express.js API built with testing.

- A refactored backend of a previous project made using `sequelize`.
- Built along with `mocha` and `chai` testing libraries.


## To Do:
#### User

| Status | HTTP      | URL  | description     |
| : ----: | : ----: | :------------| ---------------|
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `GET`     |  `user/id/:id`      | Gets all info on a specific the user |
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `GET`     |  `user/all`      | Gets all user in the database |
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `POST`     |  `user/new`      | Creates a new user |
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |
----------------------
#### Quiz

| Status | HTTP      | URL  | description     |
| : ----: | : ----: | :------------| ---------------|
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `GET`     |  `quiz/id/:id`      | Gets all info on a specific quiz |
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `GET`     |  `quiz/all`      | Gets all info on the user |

----------------------

#### Vote
| Status | HTTP      | URL  | description     |
| : ----: | : ----: | :------------| ---------------|
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `POST`  |  `vote/new`      | Makes a new vote|
| <ul><li>[ ] Written?</li><li>[ ] Tests?</li></ul> | `PUT`   |  `vote/update`      | Updates an already casted vote |

----------------------


## ERD

![erd](.notes/quizwizERD1.png)
> - rows highlighted in red represent primary or composite keys
> - rows highlighted in yellow represent foreign keys


## Testing
- Unit and intergration test of the API endpoints were written as the queries were made.
- Please submit an issue if you find any bugs. [Issues](https://github.com/thechutrain/quizwiz/issues)


## License
MIT
