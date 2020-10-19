// import {combineReducers} from 'redux';
// import {routeReducer} from 'redux-simple-router';
// import article from './article';
var { combineReducers } = require('redux');
var { routeReducer } = require('redux-simple-router');
var article = require('./article');

export default combineReducers({
  routing: routeReducer,
  article
});