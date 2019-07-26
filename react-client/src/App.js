import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Jokes from './components/Jokes';

function App() {
  return (
    <Router>
      <Route 
        exact
        path='/'
        render={props => {
          if (localStorage.getItem('token')) {
            return (
              <Jokes {...props} />
            );
          } else {
            return <Redirect to='/register' />
          }
        }}
      />
      <Route 
        path='/register'
        render={props => <Form {...props} type='register' />}
      />
      <Route 
        path='/login'
        render={props => <Form {...props} type='login' />}
      />
    </Router>
  );
}

export default App;
