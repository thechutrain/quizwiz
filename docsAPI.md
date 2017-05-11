## Table Test:
----------------

### User


| HTTP Method | URL | Description |
| :---:         | :------        | :------            |
|  `GET`         | `user/id/:id`        |      Gets all info on a specific the user |
| `GET`     |  `user/all`      | Gets all user in the database |
| `POST`     |  `user/new`      | Creates a new user |
| `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |

---------------

| HTTP Method | URL | Description |
| :---:         | :------        | :------            |
|  `GET`         | `user/id/:id`        |      Gets all info on a specific the user |
| `GET`     |  `user/all`      | Gets all user in the database |
| `POST`     |  `user/new`      | Creates a new user |
| `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |


**Overview**
--------
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



**User**
----------
Returns json data about user.

* **URL**
  /users/:id

* **Method:** `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
