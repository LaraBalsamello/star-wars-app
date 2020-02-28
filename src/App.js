import React from 'react';
import './App.css';
import Layout from './Containers/Layout';
import { Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Redirect from="**" to="/home" />
        <Route exact={false} path="/home" component={Layout}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
