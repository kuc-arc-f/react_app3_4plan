import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Navbar from './component/Layouts/Navbar';
import About from './component/About';
import Home from './component/Home';
import Test from './component/Test';
/* task */
import TaskCreate from './component/Task/Create';
import TaskIndex from './component/Task/Index';
import TaskEdit from './component/Task/Edit';
import TaskTest from './component/Task/Test';
/* users*/
import Login from './component/Users/Login';
import Logout from './component/Users/Logout';
/* Plan */
import PlanCreate from './component/Plan/Create';
import PlanIndex from './component/Plan/Index';
import PlanShow from './component/Plan/Show';
import PlanEdit from './component/Plan/Edit';
//
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/test' component={Test}/>
            <Route path='/login' component={Login}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/plan_create' component={PlanCreate}/>
            <Route path='/plan' component={PlanIndex}/>  
            <Route path='/plan_show/:id' component={PlanShow}/>
            <Route path='/plan_edit/:id' component={PlanEdit}/>

            <Route path='/task' component={TaskIndex}/>
            <Route path='/task_create' component={TaskCreate}/>
            <Route path='/task_edit/:id' component={TaskEdit}/>
            <Route path='/task_test' component={TaskTest}/>

            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
