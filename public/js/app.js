import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Dashboard from './dashboard';
import TodoForm from './todoForm';
import TodoList from './todoList';

class App extends Component {
  render() {
    return (
      <Router history={ hashHistory }>
          <Route path="/" component={Dashboard}></Route>
          <Route path="/items" component={TodoList}></Route>
          <Route path="/additem" component={TodoForm}></Route>
      </Router>
    );
  }
}

export default App;
