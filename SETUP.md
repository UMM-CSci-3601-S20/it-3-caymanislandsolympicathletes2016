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

### Verify JWT Signature Algorithm

Scroll down some more until you reach the bottom of the page, then click on "Advanced Settings". From there go to the "OAuth" page and make sure that the "JsonWebToken Signature Algorithm" is set to `RS256` and that the "OIDC Conformant" is enabled. For more info on the different signing algorithms, click [here](https://auth0.com/docs/tokens/concepts/signing-algorithms).

Finally click on the "Save Changes" button.

### Create an Auth0 API

On the left side of your screen, navigate to the "APIs" tab. Once there, click "Create API". Enter a name and an identifier for your API. Finally, make sure the "Signing Algorithm" is set to `RS256` and click "Create".

![Create API Screen](https://cdn2.auth0.com/docs/media/articles/api-auth/create-api.png)