# aroza-code-challenge

## frontend tasks

### Task_1
task_1 has been implemented using **React, Redux , React Router, axios** with all the required functionalities. 
live link : [https://shore-lab.github.io/countrywiki](https://shore-lab.github.io/countrywiki)
### Task_2
task_2 has been implemented using **html5, css3, bootstrap**. 
live link : [https://shore-lab.github.io/startup](https://shore-lab.github.io/startup/)


## backend tasks
backend tasks has been implemented using **express,mongoose**. It has 3 main route **user** , **movies** , **actors**.
### Route user:
#### GET /user [Public]
returns all the users in the database. 
example response-
``` 
 [{
    username: 'username',
    regDate: 'regDate',
    loginTime: 'loginTime'
 }]
 ```
#### GET /user/:username 
returns a single user against provided username.
example response-
```
 {
    username: 'username',
    regDate: 'regDate',
    loginTime: 'loginTime'
 }
 ```
#### POST /user/login
allows user to login and sends a jwt token,
example response-
```
 {
   token:'token'
 }
 ```
#### POST /user/signup
allows user to register and sends a jwt token.
example response-
```
 {
   token:'token'
 }
 ```
 
 
### Route actors [Public]:
#### GET /actors/
returns all the actors in the database. 
example response-
```
 [{
    name: 'name',
    birthday: 'birthday',
    country: 'country'
 }]
 ```
#### POST /actors/
will add a new actor in the database.
example input- 
```
 {
    name: 'name',
    birthday: 'birthday',
    country: 'country'
 }
 ```
#### GET actors/:id 
returns a single actor against provided id
example response-
```
 {
    name: 'name',
    birthday: 'birthday',
    country: 'country'
 }
 ```
#### DELETE actors/:id 
deletes an actor from the database based on the provided id


### Route movies [Protected]:
#### GET /movies/
returns all the movies in the database. 
example -
```
[{
    title: 'title',
    year: 'year',
    rating: 'rating',
    actors:[
      {
          name: 'name',
          birthday: 'birthday',
          country: 'country'
       }
    ]
 }]
 ```
#### POST /movies/
will add a new movie in the database.
example input- 
```
{
    title: 'title',
    year: 'year',
    rating: 'rating',
    actors:[
      {
          name: 'name',
          birthday: 'birthday',
          country: 'country'
       }
    ]
 }
 ```
#### GET movies/:id 
returns a single movie against provided id
```
{
    title: 'title',
    year: 'year',
    rating: 'rating',
    actors:[
      {
          name: 'name',
          birthday: 'birthday',
          country: 'country'
       }
    ]
 }
 ```
#### DELETE movies/:id 
deletes movie from the database based on the provided id