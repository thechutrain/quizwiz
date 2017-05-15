# QuizWiz API
[![Build Status](https://travis-ci.org/thechutrain/quizwizAPI.svg?branch=master)](https://travis-ci.org/thechutrain/quizwizAPI)

> a RESTful Express.js API with built with testing.

- A refactored backend of a previous project made using `sequelize`.
- Built along with `mocha` and `chai` testing libraries.


## API Docs:
----------------------

### User

| HTTP Method | URL | Description |
| :---:         | :------        | :------            |
|  `GET`         | `user/id/:id`        |      Gets all info on a specific the user |
| `GET`     |  `user/all`      | Gets all user in the database |
| `POST`     |  `user/new`      | Creates a new user |
| `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |

---------------
### Quiz

| HTTP Method | URL | Description |
| :---:         | :------        | :------            |
| `GET`     |  `quiz/id/:id`      | Gets info on a specific quiz |
| `GET`     |  `quiz/all`      | Gets all the quizzes |
| `POST`     |  `quiz/new`      | creates a new quiz |

---------------
### Vote

| HTTP Method | URL | Description |
| :---:         | :------        | :------            |
| `POST`  |  `vote/new`      | Makes a new vote|
| `PUT`   |  `vote/update`      | Updates an already casted vote |

---------------


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
