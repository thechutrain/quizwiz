# QuizWiz API
[![Build Status](https://travis-ci.org/thechutrain/quizwizAPI.svg?branch=master)](https://travis-ci.org/thechutrain/quizwiz)

> a RESTful Express.js API built with testing.

- A refactored backend of a previous project made using `sequelize`.
- Built along with `mocha` and `chai` testing libraries.


## To Do:
----------------------

### User

| complete(y/n) | HTTP Method | URL | Description |
| :---: | :---:         | :------        | :------            |
| n |  `GET`         | `user/id/:id`        |      Gets all info on a specific the user |
| n | `GET`     |  `user/all`      | Gets all user in the database |
| n | `POST`     |  `user/new`      | Creates a new user |
| n | `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |

---------------
### Quiz

| complete(y/n) | HTTP Method | URL | Description |
| :---: | :---:         | :------        | :------            |
| n | `GET`     |  `quiz/id/:id`      | Gets all info on a specific quiz |
| n | `GET`     |  `quiz/all`      | Gets all info on the user |


---------------
### Vote

| complete(y/n) | HTTP Method | URL | Description |
| :---: | :---:         | :------        | :------            |
| n | `POST`  |  `vote/new`      | Makes a new vote|
| n | `PUT`   |  `vote/update`      | Updates an already casted vote |

---------------
### User 2
| HTTP Method | URL | Description |
| :---:         | :------        | :------            |
|  `GET`         | `user/id/:id`        |      Gets all info on a specific the user |
| `GET`     |  `user/all`      | Gets all user in the database |
| `POST`     |  `user/new`      | Creates a new user |
| `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |


## ERD
----------------------

![erd](.notes/quizwizERD1.png)
> - rows highlighted in red represent primary or composite keys
> - rows highlighted in yellow represent foreign keys


## Testing
----------------------
- Unit and intergration test of the API endpoints were written as the queries were made.
- Please submit an issue if you find any bugs. [Issues](https://github.com/thechutrain/quizwiz/issues)


## License
MIT
