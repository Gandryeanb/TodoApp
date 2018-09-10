# TodoApp

### Installing

Follow these instruction for using this app,
open server folder and install depedencies by type this on your terminal
```
$ npm install
```

## Running the test

to start the web app, open the server folder and run ..
```
$ npm run dev
```
and then open the client folder and run this on your terminal
```
$ live-server
```
if the magic step does'nt work, you need to install the `live-server` by type this on your terminal
```
$ sudo npm install -g live-server
```
and then run the `live-server` again
and use routes ` http://localhost:8080/ `

## VALIDATION USER

### Client Side
| Field      | validation |
| ---------- |:----------:|  
|`fname`     | required   |
|`lname`     | None       |
|`phone`     | required, unique, Min len 10, Max len 14  |
|`email`     | required, unique, email formated |
|`password`  | required, combination Min 1 Uppercase letter, Min 1 number, Min len 8  |

### Server Side
| Field      | validation |
| ---------- |:----------:|  
|`fname`     | required   |
|`lname`     | None       |
|`phone`     | required, unique |
|`email`     | required, unique |
|`password`  | required   |

## TODO API REFERENCE

### :pushpin: User - Get User data

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user`     |   GET  | Get user data          | None                                      | None        | 200              | 500            |
#### Success Response
```
{
    "data": [
        {
            "lName": null,
            "password": "facebook-gstandrianb@gmail.com",
            "facebookLogin": 1,
            "googleLogin": 0,
            "_id": "5b95907f3076841759d96686",
            "email": "gstandrianb@gmail.com",
            "fName": "Gusti Andryean",
            "phone": "facebook-gstandrianb@gmail.com",
            "createdAt": "2018-09-09T21:28:31.860Z",
            "updatedAt": "2018-09-09T21:28:31.860Z",
            "__v": 0
        }
    ]
}
```

### :pushpin: User - Get undone activities user

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/activity/undone`     |   GET  | Get undone activities user          | None                                      | None        | 200              | 500            |
#### Success Response
SORTED BY dueDate ascending
```
{
    "data": [
        [
            {
                "status": 0,
                "_id": "5b9599f8df1c6d1aea50748f",
                "userId": "5b95907f3076841759d96686",
                "name": "Make ToDo App",
                "description": "Lot a todo Mates",
                "dueDate": "2018-09-09T17:00:00.000Z",
                "createdAt": "2018-09-09T22:08:56.032Z",
                "updatedAt": "2018-09-09T22:08:56.032Z",
                "__v": 0
            },
            {
                "status": 0,
                "_id": "5b95999ddf1c6d1aea50748e",
                "userId": "5b95907f3076841759d96686",
                "name": "Learning Semantic Web",
                "description": "for the better future",
                "dueDate": "2018-09-09T17:00:00.000Z",
                "createdAt": "2018-09-09T22:07:25.287Z",
                "updatedAt": "2018-09-09T22:07:25.287Z",
                "__v": 0
            }
        ],
        [
            {
                "status": 0,
                "_id": "5b959a58df1c6d1aea507490",
                "userId": "5b95907f3076841759d96686",
                "name": "Make Button On Terminal",
                "description": "impossible on on tought",
                "dueDate": "2018-09-10T17:00:00.000Z",
                "createdAt": "2018-09-09T22:10:32.493Z",
                "updatedAt": "2018-09-09T22:10:32.493Z",
                "__v": 0
            }
        ]
    ]
}
```

### :pushpin: User - Get done activities user

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/activity/done`     |   GET  | Get done activities user          | None                                      | None        | 200              | 500            |
#### Success Response
SORTED BY dueDate ascending
```
{
    "data": [
        [
            {
                "status": 1,
                "_id": "5b959bf1df1c6d1aea507492",
                "userId": "5b95907f3076841759d96686",
                "name": "Open laptop",
                "description": "Daily task",
                "dueDate": "2018-09-08T17:00:00.000Z",
                "createdAt": "2018-09-09T22:17:21.201Z",
                "updatedAt": "2018-09-09T22:18:26.176Z",
                "__v": 0
            },
            {
                "status": 1,
                "_id": "5b959b51df1c6d1aea507491",
                "userId": "5b95907f3076841759d96686",
                "name": "Breathing",
                "description": "And Always keep breathing",
                "dueDate": "2018-09-08T17:00:00.000Z",
                "createdAt": "2018-09-09T22:14:41.962Z",
                "updatedAt": "2018-09-09T22:14:49.967Z",
                "__v": 0
            }
        ],
        [
            {
                "status": 1,
                "_id": "5b959c2adf1c6d1aea507493",
                "userId": "5b95907f3076841759d96686",
                "name": "Meet the Erorrs",
                "description": "it's keep happening",
                "dueDate": "2018-09-07T17:00:00.000Z",
                "createdAt": "2018-09-09T22:18:18.463Z",
                "updatedAt": "2018-09-09T22:18:23.011Z",
                "__v": 0
            }
        ]
    ]
}
```

### :pushpin: User - Update user activity

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/activity`     |   PUT  | Update user activity         | except `id` and, `date` alias dueDate field is optional,`name`,`description`(`date` format must be `yyyy`-`mm`-`dd`) | None        | 200              | 500            |
#### Success Response
```
{
    "message": "Updating data success",
    "userId": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTU5MDdmMzA3Njg0MTc1OWQ5NjY4NiIsImZOYW1lIjoiR3VzdGkgQW5kcnllYW4iLCJlbWFpbCI6ImdzdGFuZHJpYW5iQGdtYWlsLmNvbSIsImlhdCI6MTUzNjUzMDQ3MX0.QULDOExMzHBwiW-SdrMJ-xLCtPF8a4QGmwsyKvTmsZI",
    "updatedValues": {
        "name": "Learning Programming",
        "description": "till i die",
        "status": "1",
        "date": "2018-9-10",
        "id": "5b9599f8df1c6d1aea50748f"
    }
}
```
### :pushpin: User - Update user data

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user`     |   PUT  | Update user data         | `fname`, `lname`, `email`, `password`   | None        | 200              | 500            |
#### Success Response
```
{
    "message": "Updating data success",
    "updatedValues": {
        "fName": "Andryean",
        "lName": "Budiman"
    }
}
```

### :pushpin: User - Create User

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/register`|  POST  | Create user   | `fname`, `lname`, `email`, `phone`, `password` | None        | 200              | 500            |
#### Success Response
```
{
    "message": "success when creating new User",
    "data": {
        "fName": "harles",
        "lName": "Andryean",
        "email": "harles",
        "password": "$2b$07$DwCjdlICX402yAqG5MngQegQvzW8wAVyqthdtWTspqBYaC065dsHW"
    }
}
```

### :pushpin: User - Create user activity

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/activity`|  POST  | Create user activity | `name`, `description`, `date` alias dueDate with format `yyyy`-`mm`-`dd` | None        | 200              | 500            |
#### Success Response
```
{
    "message": "success when creating new Activity",
    "data": {
        "userId": "5b95907f3076841759d96686",
        "name": "Sleeping on time",
        "description": "For better Life",
        "dueDate": "2018-10-08T17:00:00.000Z"
    }
}
```

### :pushpin: User - Delete user activity

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/activity/:id`|  DELETE  | Delete user activity |                                   | `id`        | 200              | 500            |
#### Success Response
```
{
    "message": "Deleting activity with ID 5b95907f3076841759d96686 success"
}
```

### :pushpin: User - Login

| URL         | Method | Description            |Data Body / Requirement                    | Data Params | Success Response | Error Response |
| ----------- |:------:|:---------------------: |:-----------------------------------------:|:-----------:|:----------------:|:--------------:|
| `/user/login`|  POST  | Login                 | `email`, `password`                       |         | 200              | 500            |
#### Success Response
```
{
    "message": "login success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTU4ZmM0YmNkNmM3MTczNGNiMzQ5YSIsImZOYW1lIjoiR3VzdGkgQW5kcnllYW4iLCJlbWFpbCI6ImdzdGFuZHJ5ZWFuYkBnbWFpbC5jb20iLCJpYXQiOjE1MzY1MzQ3MDZ9.UajbGxnMGvDDYd--X_IaPJucw-lt1lm7qK27VjCCbjE"
}
```


## Built With

* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Utitilty for generate token app
* [live-server](https://www.npmjs.com/package/live-server) - Utitilty for run the server client
* [nodemailer](https://www.npmjs.com/package/mongoose) - Utility for sending an E-mail to user
* [mongoose](https://www.npmjs.com/package/mongoose) - ODM
* [express](https://www.npmjs.com/package/express) - The web framework used
* [nodemon](https://www.npmjs.com/package/nodemon) - Utility that will monitor for any changes in source and automatically restart server
* [postman](https://www.getpostman.com) - Utitilty for accessing HTTP API
* [dotenv](https://www.npmjs.com/package/dotenv) - Utitilty for loads environent variable
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Utitilty for encrypt and decrypt data user
* [axios](https://www.npmjs.com/package/axios) - Utitilty for make request to 3rd API
* [nexmo](https://www.npmjs.com/package/nexmo) - Utility for sending sms notification to user
* [cors](https://www.npmjs.com/package/cors) - Utitilty for providing a Connect/Express middleware that can be used to enable CORS with various options
* [MLab](https://www.mlab.com) - Database

## Authors

* **Gusti Andryean B** - *Hacktive8 - Student* - [gandryeanb](https://github.com/Gandryeanb)

## Acknowledgments

* Inspiration
* etc
