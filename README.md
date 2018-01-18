Chitt-Chatt
=====================

A client-side SPA (single-page app) built with ReactJS, Webpack, Babel, Node.js and Web Sockets. The client-side app communicates with a server via WebSockets for multi-user real-time updates. No persistent database is involved; the focus is on the client-side experience



### Usage

Install the dependencies and start the server.

1st server

```
npm install
npm start
open http://localhost:3000
```
2nd server

```
cd to `chatty_server`
npm install
npm start
open http://localhost:3000
```

### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
