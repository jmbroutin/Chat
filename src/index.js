import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Chat from './components/Chat';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/chat/:userName" component={Chat} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))