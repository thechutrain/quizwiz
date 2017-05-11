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

| complete | HTTP Method | URL | Description |
| :---: | :---:         | :------        | :------            |
| n |  `GET`         | `user/id/:id`        |      Gets all info on a specific the user |
| n | `GET`     |  `user/all`      | Gets all user in the database |
| n | `POST`     |  `user/new`      | Creates a new user |
| n | `POST`     |  `user/take-quiz`      | Creates a new userquiz instance. |





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
