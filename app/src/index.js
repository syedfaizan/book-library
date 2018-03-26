import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './App';
import jQuery from 'jquery';
global.jquery = jQuery;
global.$ = jQuery;

ReactDOM.render(<App />, document.getElementById('root'));
