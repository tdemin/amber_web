## Amber Web

The web client for [Project Amber](/tdemin/amber), made with React,
Redux, and TypeScript.

#### Running the app locally

###### Development

Simply run:

    % yarn install --dev
    % yarn start

Set the `REACT_APP_APIURI` environment variable in case you're testing against
a local server. It should point to the base URI for all API requests, namely
`https://amber.h.tdem.in/api/v0`.

###### Docker

Run:

    % docker build . -t amber_web
    % docker run -it -p 8080:80 amber_web

If you're running your own API server, be sure to set the
`REACT_APP_APIURI` flag when building:

    % docker build . -t amber_web --build-arg REACT_APP_APIURI=https://your.tld/api

#### Development

The source code of this app is formatted automatically with Prettier. Be sure
to run `yarn beautify` and `yarn lint` before sending a pull request!

#### License

This program is MIT-licensed. See [LICENSE.txt](LICENSE.txt) for details.
