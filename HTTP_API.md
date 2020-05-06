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


## 📮 `POST api/notes/new`

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

## 'PIN api/notes/pin:id'

Pin an existing note.

This note must exist in the database in order to be pinned.

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**


## 'UNPIN api/notes/pin/:id'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

## 'RESTORE api/notes/:id'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

## 'TRASH api/notes/:id'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

## 'DELETE api/notes/delete/:id'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

# OWNER

## 'GET OWNER api/owner'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

## 'GET SINGLE OWNER api/owner/:id'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

## 'GET x500 OWNER api/owner/x500/:x500'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**

## 'ADD OWNER api/owner/new'

**Path parameters:**

**Response type:**

**Response:**

**Status codes:**