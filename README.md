# DoorBoard

[![Server Build Status](../../workflows/Server%20Java/badge.svg)](../../actions?query=workflow%3A"Server+Java")
[![Client Build Status](../../workflows/Client%20Angular/badge.svg)](../../actions?query=workflow%3A"Client+Angular")
[![End to End Build Status](../../workflows/End-to-End/badge.svg)](../../actions?query=workflow%3AEnd-to-End)

## Contents
- [DoorBoard](#doorboard)
  - [Contents](#contents)
  - [Introduction](#introduction)
    - [Owner DoorBoard](#owner-doorboard)
    - [Viewer Page](#viewer-page)
  - [Libraries Used](#libraries-used)
    - [Client Side](#client-side)
    - [Server Side](#server-side)
    - [Database](#database)
    - [Deployment](#deployment)
  - [Resources](#resources)
  - [Known Issues](#known-issues)
  - [API](#api)
  - [Deployment](#deployment-1)


## Introduction

We were approached by a professor at the University of Minnesota Morris to create an alternative announcement system to replace the use of sticky notes posted on a door. DoorBoard allows owners to create notes to display to their viewers, accessible from anywhere. This application is currently intended to be used to announce things like “running late due to traffic” or  “Office Hours are cancelled today, my child got sick.”

Owners can create notes, edit notes,  pin written notes to the top of the page, delete notes, and view their trashcan of deleted notes to decide whether to permanently delete the notes or reuse them. Owners also have access to a button which generates a PDF containing the URL of the viewer page for their DoorBoard, as well as a QR code linking to that same URL.
Viewers can see the notes left by the owner and see the owner’s Google Calendar using the link on the viewer page.

This project is made possible by the students and faculty of CSci 3601, Software Development and Design, at the University of Minnesota Morris, and a special thanks to Rachel Johnson, Professor at the University of Minnesota Morris for being our customer for this project. 

Software Design Spring 2020 Iteration 3 <br>
Team Name: 2016 Summer Olympic Athletes from the Cayman Islands <br>
Team Members: Aaron Otten, Audrey Le Meur, Erik Rauer, Kyle Fluto, Luke Burdette, & Trent Merkins

This repository began as team Nicolai Thärichen’s code for iteration 1 of the DoorBoard app. It was then expanded upon in iteration 2 by Team Rocket. It was then used as the code base for iteration 3 by the 2016 Olympic Athletes from the Cayman Islands.

| Owner DoorBoard | Viewer Doorboard |
|-----------------|------------------|
| ![](owner_DB.jpg)    | ![](viewer_PG.jpg)    |

## Libraries Used

### Client Side
* Angular 9 is used to build the client side.
* TypeScript is the language most used on the client side.
* Jasmine and Karma are used for testing.
* Protractor is used for end to end testing
* Gradle is used to tell Javalin to orchestrate the Client Side.
* JsPDF (jspdf) is used for PDF generation.
* Kjua (kjua-svk) is used for QR code generation.
* Auth0 SDK for Single Page Applications (auth0-spa-js) is used for user authentication on the client side.
* Node.js is used for asynchronous API.

### Server Side
* Java is the language used on the Server Side.
* Javalin is used as a lightweight web framework.
* JUnit is used for testing.
* Mockito is used to mock various classes to assist in testing.
* Gradle is used to build the project.

### Database
* MongoDB is used as our database for storing notes and owners.

### Deployment
* Docker is used to contain software in its own packages and still allow it to communicate with each other.
* DigitalOcean is used as a hosting service.

## Resources
| Client | Server | Database | Deployment |
|--------|--------|:--------:|:----------:|
| <ul> <li> [Angular Documentation](https://angular.io/docs)</li> <li>[Jasmine Documentation](https://jasmine.github.io/)</li> <li>[Karma Documentation](https://karma-runner.github.io/)</li> <li>[Protractor Documentation](https://www.protractortest.org/#/api) </li> <li>[Gradle Guides](https://gradle.org/guides/)</li> <li>[JsPDF Repository](https://github.com/MrRio/jsPDF)</li> <li>[Kjua Repository](https://github.com/werthdavid/kjua)</li> <li>[Auth0 Documentation](https://auth0.com/docs/)</li> <li>[Node.js Documentation](https://nodejs.org/en/docs/)</li> </ul> | <ul> <li>[Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)</li> <li>[Javalin Documentation](https://javalin.io/documentation)</li> </ul>| <ul> <li> [MongoDB Documentation](https://docs.mongodb.com/) </li> </ul> | <ul> <li> [Docker Documentation](https://docs.docker.com/) </li> <li> [Digital Ocean Tutorials](https://www.digitalocean.com/community/tutorials) </li> </ul> |


## Known Issues

Known bugs and potential enhancements include:
* Additional client side testing: client-side testing is minimal and coverage should be increased
* Fix forced reload on owner doorboard: on certain browsers, page will repeatedly reload unnecessarily
* Jumping into the middle of the page: occasionally, page will load into the middle of the page rather than the top
* Decrease side margins in mobile



## API

 The server's API is a bit weird in places. A full description of
 the API is can be found in [HTTP_API.md](HTTP_API.md).

 ## Deployment

 As always, instructions on how to crate a DigitalOcean Droplet and setup the project are in [DEPLOYMENT.md](DEPLOYMENT.md).

 If you want to deploy this project on a new droplet, you will need to
 change the domain name in the file
 `client/src/environments/environment.prod.ts`. (Specifically, you need to
 change the value of `BASE_URL`.) This value is used to generate the link on
 the PDF; if you don't change it, the PDF will point to the webpage from
 iteration one.
