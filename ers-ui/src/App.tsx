import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './Store';
import LoginComponent from './components/login-component/LoginContainer';
import UserPageComponent from './components/user-page-component/UserPageContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
      <Switch>
      <Route path='/user' component={UserPageComponent} />
      <Route path='/login' component={LoginComponent} />
      <Route path='/' component={LoginComponent} />
      </Switch>      
      <p>這是一個沒有用的網頁</p>
      </Router>
      </Provider>
      






    </div>
  );
}

export default App;
