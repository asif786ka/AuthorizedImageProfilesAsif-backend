
# AuthorizedImageProfilesAsif Backend

This is the backend for the AuthorizedImageProfilesAsif application. The backend handles user registration, login, profile management, and avatar updates.

## Deployment

## Endpoints

### 1. Register a New User

**Endpoint:** `/register`  
**Method:** `POST`

**Description:** Registers a new user with an email and password.

**Request Body (JSON):**
```json
{
  "email": "newuser@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "message": "User registered successfully",
  "userid": "user-<unique_id>"
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/register
Method: POST
Body: raw JSON
Body Content:
json
Copy code
{
  "email": "newuser@example.com",
  "password": "password123"
}

cURL Command:
bash
Copy code
curl -X POST https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/register \
-H "Content-Type: application/json" \
-d '{"email":"newuser@example.com", "password":"password123"}'

2. Log in an Existing User
Endpoint: /sessions/new
Method: POST

Description: Logs in an existing user by verifying their email and password. Returns a session token and the user's ID.

Request Body (JSON):

json
Copy code
{
  "email": "newuser@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "userid": "user-<unique_id>",
  "token": "token-<generated_token>"
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/sessions/new
Method: POST
Body: raw JSON
Body Content:
json
Copy code
{
  "email": "newuser@example.com",
  "password": "password123"
}

cURL Command:
bash
Copy code
curl -X POST https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/sessions/new \
-H "Content-Type: application/json" \
-d '{"email":"newuser@example.com", "password":"password123"}'


Here's an expanded version of the README file with descriptions for all endpoints, following the format you requested:

README.md
markdown
Copy code
# AuthorizedImageProfilesAsif Backend

This is the backend for the AuthorizedImageProfilesAsif application. The backend handles user registration, login, profile management, and avatar updates.

## Deployment

This backend is deployed on Heroku. You can access it at:

https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com

makefile
Copy code

## Endpoints

### 1. Register a New User

**Endpoint:** `/register`  
**Method:** `POST`

**Description:** Registers a new user with an email and password.

**Request Body (JSON):**
```json
{
  "email": "newuser@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "message": "User registered successfully",
  "userid": "user-<unique_id>"
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/register
Method: POST
Body: raw JSON
Body Content:
json
Copy code
{
  "email": "newuser@example.com",
  "password": "password123"
}
cURL Command:
bash
Copy code
curl -X POST https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/register \
-H "Content-Type: application/json" \
-d '{"email":"newuser@example.com", "password":"password123"}'
2. Log in an Existing User
Endpoint: /sessions/new
Method: POST

Description: Logs in an existing user by verifying their email and password. Returns a session token and the user's ID.

Request Body (JSON):

json
Copy code
{
  "email": "newuser@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "userid": "user-<unique_id>",
  "token": "token-<generated_token>"
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/sessions/new
Method: POST
Body: raw JSON
Body Content:
json
Copy code
{
  "email": "newuser@example.com",
  "password": "password123"
}

cURL Command:
bash
Copy code
curl -X POST https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/sessions/new \
-H "Content-Type: application/json" \
-d '{"email":"newuser@example.com", "password":"password123"}'
3. Fetch User Profile
Endpoint: /users/:userid
Method: GET

Description: Fetches the profile of a user identified by their userid. Requires a valid session token.

Headers:

Authorization: Bearer <token>
Response:

json
Copy code
{
  "email": "newuser@example.com",
  "avatar_url": ""
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/users/user-<unique_id>
Method: GET
Headers:
Authorization: Bearer <token>

cURL Command:
bash
Copy code
curl -X GET https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/users/user-<unique_id> \
-H "Authorization: Bearer <token>"
4. Update User Avatar
Endpoint: /users/:userid/avatar
Method: POST

Description: Updates the avatar of a user identified by their userid. Requires a valid session token.

Headers:

Authorization: Bearer <token>
Request Body (JSON):

json
Copy code
{
  "avatar": "base64_encoded_image_data"
}
Response:

json
Copy code
{
  "avatar_url": "base64_encoded_image_data"
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/users/user-<unique_id>/avatar
Method: POST
Headers:
Authorization: Bearer <token>
Body: raw JSON
Body Content:
json
Copy code
{
  "avatar": "base64_encoded_image_data"
}

cURL Command:
bash
Copy code
curl -X POST https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/users/user-<unique_id>/avatar \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"avatar":"base64_encoded_image_data"}'
5. Log out User
Endpoint: /sessions/logout
Method: DELETE

Description: Logs out a user by invalidating their session token.

Request Body (JSON):

json
Copy code
{
  "userid": "user-<unique_id>"
}
Response:

json
Copy code
{
  "message": "Logged out successfully"
}
Postman Request:
URL: https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/sessions/logout
Method: DELETE
Body: raw JSON
Body Content:
json
Copy code
{
  "userid": "user-<unique_id>"
}
cURL Command:
bash
Copy code
curl -X DELETE https://authorizedimageprofilesasif-fb449ed181c9.herokuapp.com/sessions/logout \
-H "Content-Type: application/json" \
-d '{"userid":"user-<unique_id>"}'

