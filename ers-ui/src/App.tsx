import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './Store';
import LoginComponent from './components/login-component/LoginContainer';
import UserPageComponent from './components/user-page-component/UserPageContainer';
import AdminPageComponent from './components/admin-page-component/AdminPageContainer';
import  FmanagerPageComponent from './components/fmanager-page-component/FmanagerPageContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
      <Switch>
      <Route path='/user' component={UserPageComponent} />
      <Route path='/login' component={LoginComponent} />
      <Route path='/admin' component={AdminPageComponent} />
      <Route path='/fmanager' component={FmanagerPageComponent} />
      <Route path='/' component={LoginComponent} />
      </Switch>      
      
      </Router>
      </Provider>

    </div>
  );
}

export default App;

