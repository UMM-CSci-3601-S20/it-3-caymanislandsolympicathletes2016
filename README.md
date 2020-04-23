# DoorBoard

[![Server Build Status](../../workflows/Server%20Java/badge.svg)](../../actions?query=workflow%3A"Server+Java")
[![Client Build Status](../../workflows/Client%20Angular/badge.svg)](../../actions?query=workflow%3A"Client+Angular")
[![End to End Build Status](../../workflows/End-to-End/badge.svg)](../../actions?query=workflow%3AEnd-to-End)

This is Team Nicolai Thärichen's iteration-one code for the DoorBoard web app,
as part of The UMM CSCI Department's "Software Design and Development" class
(Spring 2020). This code was then expanded upon in iteration two by team rocket. This codebase is currently being used for iteration three by cayman islands olympic athletes 2016. 

## Features

Features provided by this new code base are as follows:
Pinning notes
GCAL redirect
QR Code
Time stamps

## API

 🐚 The server's API is a bit weird in places. A full description of
 the API is can be found in [HTTP_API.md](HTTP_API.md).

 ## Deployment

 As always, instructions on how to crate a DigitalOcean Droplet and setup the project are in [DEPLOYMENT.md](DEPLOYMENT.md).

 🐚 If you want to deploy this project on a new droplet, you will need to
 change the domain name in the file
 `client/src/environments/environment.prod.ts`. (Specifically, you need to
 change the value of `BASE_URL`.) This value is used to generate the link on
 the PDF; if you don't change it, the PDF will point to the webpage from
 iteration one.
