import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
import data from './assets/data.json'

const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');

// start the server
app.listen(process.env.PORT || 3000 , () =>{
  console.log("App listing at port : ", process.env.PORT || 3000);
});

//setting up the initial state in the server
let initialState = {
  isFetching: false,
  apps: data
}

// server side rendered page (disable browser javascript to check)
app.get('/', (req, res) => {
  const { preloadedState, content}  = ssr(initialState)
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});

// Client side rendered page (disable browser javascript to check)
app.get('/non-ssr', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});
