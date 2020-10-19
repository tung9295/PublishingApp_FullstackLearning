import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParse from 'body-parser';
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import falcorRouter from 'falcor-router';
import routes from './routes.js';
import React from 'react';
import { createStore } from 'redux';
import { provider } from 'react-redux';
import { renderToStaticMarkup } from 'react-dom/server.js';
import ReactRouter from 'react-router';
import { RoutingContext, match } from 'react-router';
import rootReducer from '../src/reducers';
import reactRoutes from '../src/routes';
import fetchServerSide from './fetchServerSide';

// var http = require('http');
// var express = require('express');
// var cors = require('cors');
// var bodyParse = require('body-parser');
// var falcor = require('falcor');
// var falcorExpress = require('falcor-express');
// var falcorRouter = require('falcor-router');
// var routes = require('./routes.js');
// var React = require('react');
// var { createStore } = require('redux');
// var { provider } = require('react-redux');
// var { renderToStaticMarkup } = require('react-dom/server');
// var ReactRouter = require('react-router');
// var { RoutingContext, match } = require('react-router');
// var rootReducer = require('../src/reducers');
// var reactRoutes = require('../src/routes');
// var fetchServerSide = require('./fetchServerSide');

const app = express();
app.server = http.createServer(app);

const { default: model } = require('../src/falcorModel.js');

//CORS - 3rd party middleware
app.use(cors());

app.use(bodyParse.json({extended: false}));
app.use(bodyParse.urlencoded({extended: false}));
// let cache ={
//   articles: [
//     {
//       id: 987654,
//       articleTitle: 'Lorem ipsum - article one',
//       articleContent: 'Here goes the content of the article'
//     },
//     {
//       id: 123456,
//       articleTitle: 'Lorem ipsum - article two from backend',
//       articleContent: 'Sky is the limit, the content goes here.'
//     }
//   ]
// };

// var model = new falcor.Model({
//   cache: cache
// });

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  return new falcorRouter(routes);
}));

app.use(express.static('dist'));

// app.get('/', (req, res) => {
//   console.log('Client Connected')
//   Article.find((err, articlesDocs) => {
//     var ourArticles = articlesDocs.map((articleItem) => {
//       return `<h1>${articleItem.articleTitle + ' ' + articleItem.price}</h1>${articleItem.articleContent}`
//     });
//     res.send(`${ourArticles}`)
//   })
// });

app.server.listen(process.env.PORT || 3000);

module.exports = app;

