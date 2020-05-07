# HTTP API

Our server has the following endpoints:

# Notes


## 📩 `GET api/notes`

Get all of the notes in the database.

**Response type:** `application/json`

**Response:** A json array of all of the notes in the database.

**Status codes:**

 + `200 OK` if the notes were retrieved successfully.


## 📩 `GET api/notes/:id`

Get a single note by its Mongo ID.

**Path parameters:** `:id`, the Mongo ID of the note to get.

**Response type:** `application/json`

**Response:** A json object with two keys: `id`, whose value is a string,
the Mongo ID of the newly created note in the database; and `body`, whose value
is a string, the body of the note.

**Status codes:**

 + `200 OK` if the note was retrieved successfully.
 + `400 Bad Request` if the path parameter `:id` isn't in the form of a real
   Mongo ID. (for example, it might not be a hexidecimal number, or it might
   have the wrong number of digits.)
 + `404 Not Found` if the path parameter `:id` is a legal Mongo ID, but it
   doesn't correspond to any note in the database.


## 📮 `POST api/new/notes`

Add a new note with a given body to the database.

**Request type:** `application/json`

**Request body:** A json object with one key, `body`, whose value should be a
string. The length of this string should be between `2` and `300` characters,
inclusive.

**Response type:** `application/json`

**Response:** A json object with one key, `id`, whose value is a string, the
Mongo ID of the newly created note in the database.

**Status codes:**

 + `201 Created` if the note was added successfully. 
 + `400 Bad Request` if the request body wasn't in the right
   format. (For example, `body` may have been too long or too short; the json
   object may not have had a `body` field at all; or it may have had extra
   fields.)


## 📮 `POST api/notes/edit/:id`

Edit the contents of an existing note.

**Request type:** `application/json`

**Request body:** A json object with one key, `body`, whose value should be a
string. The length of this string should be between `2` and `300` characters,
inclusive.

**Path parameters:** `:id`, the Mongo ID of the note to edit.

**Response type:** `application/json`

**Response:** A json object with one key, `id`, whose value is a string, the
Mongo ID of the note that was edited.

**Status codes:**

 + `200 OK` if the note was successfully edited.
 + `400 Bad Request` if the request body wasn't in the right format.
 + `404 Not Found` if the path parameter `:id` is a legal Mongo ID, but it
   doesn't correspond to any note in the database.
 + `500 Internal Server Error` if the path parameter `:id` isn't in the form of
   a real Mongo ID.

## 🏌️--⛳ `PUT api/notes/pin/:id`

Pin an existing note.

This note must exist in the database in order to be pinned.

**Request Type** `application/json`

**Request Body** A json object with one key, `body`, whose value should be a
string. The length of this string should be between `2` and `300` characters,
inclusive.

**Path parameters:** `:id`, the Mongo ID of the note to pin.

**Response type:** `application/json`

**Response:** A json object with one key, `id`, whose value is a string, the
Mongo ID of the note that was edited.

**Status codes:**
 + `201 Created` if the note was added successfully. 
 + `400 Bad Request` if the request body wasn't in the right
   format. (For example, `body` may have been too long or too short; the json
   object may not have had a `body` field at all; or it may have had extra
   fields.)


## 🗑 `DELETE api/notes/pin/:id`
Unpin a note that has been pinned.

This note must exist and must be pinned.

**Path parameters:** `:id`, the Mongo ID of the note to unpin.

**Response type:** text/plain

**Response:** If the object was found, the string "deleted"; otherwise, the string "nothing deleted". This sends the note to the trash.

**Status codes:**
+ `200 OK` Note was successfully deleted. 
+ `500 Internal Server Error` if the parameter :id isn't in the form of a real Mongo ID.

## 📮 'POST api/notes/:id'
Restore a note to the doorboard.

**Request Type** `application/json`

**Request Body** A json object with one key, `body`, whose value should be a
string. The length of this string should be between `2` and `300` characters,
inclusive.

**Path parameters:** `:id`, the Mongo ID of the note to Restore.


**Response type:** `application/json`

**Response:**  A json object with one key, `id`, whose value is a string, the
Mongo ID of the note that was edited.

**Status codes:**
 + `201 Created` if the note was added successfully. 
 + `400 Bad Request` if the request body wasn't in the right
   format. (For example, `body` may have been too long or too short; the json
   object may not have had a `body` field at all; or it may have had extra
   fields.)

## 🗑 `DELETE api/notes/:id`
Trash note

**Path parameters:** `:id`, the Mongo ID of the note to Trash.

**Response type:** text/plain

**Response:** If the object was found, the string "deleted"; otherwise, the string "nothing deleted". This sends the note to the trash.

**Status codes:**
+ `200 OK` Note was successfully deleted. 
+ `500 Internal Server Error` if the parameter :id isn't in the form of a real Mongo ID.

## 🗑 `DELETE api/notes/delete/:id`
Delete the note from the database

**Path parameters:** `:id`, the Mongo ID of the note to delete.

**Response type:** text/plain

**Response:** If the object was found, the string "deleted"; otherwise, the string "nothing deleted".

**Status codes:**
+ `200 OK` Note was successfully deleted. 
+ `500 Internal Server Error` if the parameter :id isn't in the form of a real Mongo ID.

# OWNER

## 📩 `GET api/owner`
This gets a list of all owners.

**Response type:** `application/json`

**Response:** A json array of all of the owners in the database.

**Status codes:**
+ `200 OK` if the owners were retrieved successfully. If there is no id provided in the database no action is taken. 


## 📩 `GET api/owner/:id`
Get an owner by `:id`.

**Path parameters:**`:id`, the Mongo ID of the owner to get.

**Response type:** `application/json`

**Response:** A json object with two keys: `id`, whose value is a string,
the Mongo ID of the newly created owner in the database; and `name` is a string,`officeNumber` as a string, `email` as a string, `building` as string,`x500` as a string, and `gcalLink` as a string.

**Status codes:**
+ `200 OK` if the owner was retrieved successfully.
+ + `400 Bad Request` if the path parameter `:id` isn't in the form of a real
   Mongo ID. (for example, it might not be a hexidecimal number, or it might
   have the wrong number of digits.)
 + `404 Not Found` if the path parameter `:id` is a legal Mongo ID, but it
   doesn't correspond to any note in the database.

## 📩`GET api/owner/x500/:x500`
Get owner by `x500`.
**Path parameters:** `:x500`, This is the x500 string created as an id of the owner to get

**Response type:** `application/json`

**Response:** A json object `:x500` whose value is a string. The Mongo ID of the newly created owner in the database; and 'name' is a string,'officeNumber' as a string, 'email' as a string, 'building' as string,`x500` as a string, and 'gcalLink' as a string.

**Status codes:**
+ `200 OK` if the owner was retrieved successfully.
+ + `400 Bad Request` if the path parameter `:id` isn't in the form of a real
   Mongo ID. (for example, it might not be a hexidecimal number, or it might
   have the wrong number of digits.)
 + `404 Not Found` if the path parameter `:id` is a legal Mongo ID, but it
   doesn't correspond to any note in the database.

## 📮`POST api/owner/new`
Add a new owner.

**Request Type** `application/json`

**Request Body** A json object with two keys: `id`, whose value is a string,
the Mongo ID of the newly created owner in the database; and 'name' is a string,'officeNumber' as a string, 'email' as a string, 'building' as string,'x500' as a string, and 'gcalLink' as a string.

**Response type:** `application/json`

**Response:** A json object with one key, `id`, whose value is a string, the
Mongo ID of the newly created note in the database.

**Status codes:**
+ `201 Created` if the owner was added successfully.
+ + `400 Bad Request` this happens if the owner form does not fit the valid format. 