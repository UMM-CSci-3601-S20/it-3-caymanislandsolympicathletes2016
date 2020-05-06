# Setup

Before development or deployment of this project can occur, make sure to complete the following steps:


## Prerequisites

You will need the following:
- [An Auth0 Account](https://auth0.com/)
- [A Google Account](https://support.google.com/accounts/answer/27441?hl=en)

TODO: Finish Prereqs


## Setting up Auth0

Before you can deploy or work on the project you will need to configure your Auth0 application. When you signed up, an application should have been created for you. This can be accessed from the "Applications" tab on the left part of your screen. If an application wasn't automatically created, you can simply click on the "Create Application" button to make one yourself.

Click on the application and then go to the "Settings" tab. From there you can complete the following steps:

### Configure Application URI's

Scroll down to the "Application URI" section. There you will want to set the "Allowed Callback URL", the "Allowed Logout URL" and the "Allowed Logout URL". This application is currently set up so that these are all the same. For development purposes, you should add `http://localhost:4200` to each of them.