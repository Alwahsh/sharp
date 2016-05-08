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

Install NodeJS and using a terminal go to the directory of the project. You can try running vagrant up instead of installing NodeJS and then do "cd /vagrant" and follow the same next steps.

Run "npm install"

Here, you can put to use the ClientID and Client Secret you generated earlier.

Run "GOOGLE_CLIENT_ID="Your Google Client ID" GOOGLE_CLIENT_SECRET="Your Google client secret" sails lift"

Open your browser and visit "localhost:1337"

Note, for the confirmation emails, no real emails are sent out. Instead, all emails that are to be sent are stored in ".tmp/email.txt". They contain a link to confirm the email which you should visit to activate the account you register.
