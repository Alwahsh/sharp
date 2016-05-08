# sharp

a [Sails](http://sailsjs.org) application

You should run it as follows:

Go to https://console.developers.google.com

Create a new project with any name.

From Social APIs, choose Google+ API.

Enable the API and create new Credentials of type OAuth client ID.

For the Authorized JavaScript origins, put http://localhost:1337

For the Authorized redirect URIs, put http://localhost:1337/auth/google/callback?next=/user/me

Press "Create".

You should see 2 values, ClientID and Client Secret, copy both values as you'd need them to start the server later.

Install NodeJS and using a terminal go to the directory of the project.

Run "npm install"

Here, you can put to use the ClientID and Client Secret you generated earlier.

Run "GOOGLE_CLIENT_ID="Your Google Client ID" GOOGLE_CLIENT_SECRET="Your Google client secret" sails lift"

Open your browser and visit "localhost:1337"
