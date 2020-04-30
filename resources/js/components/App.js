import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'; 
//import { Button, Checkbox, Form } from 'semantic-ui-react';
import NewPerson from './NewPerson';
import PeopleList from './PeopleList';
import SinglePerson from './SinglePerson';
import FileUploadComponent from './FileUploadComponent';
//import Alert from 'react-bootstrap/Alert'
import { Alert } from 'reactstrap';
//import { findDOMNode } from 'react-dom';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          success: "",
          visible: false,
          isLoggedIn: false,
          user: {},
          //errors:[]
        }
    }

    onSuccess = (message) =>{
        this.setState({visible:true},()=>{
            window.setTimeout(()=>{
              this.setState({visible:false})
            },2000)
        });
        this.setState({
            success: message
        })
    }

    setLoggedIn = (appState) =>{
      localStorage["appState"] = JSON.stringify(appState);
      this.setState({
          isLoggedIn: appState.isLoggedIn,
          user: appState.user
      });
    }

    //log out the user
    _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.onSuccess(`Successfully logged out!`);
    };


    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }
    

    render () {
        const {user, success, isLoggedIn} = this.state;
        return (
          <div>
          <Router>
              {/* the alert message */}
            <Alert color="success" isOpen={this.state.visible} > 
                {success}
            </Alert>
            {!(Object.keys(user).length === 0 && user.constructor === Object)? <div>You are now logged in as {user.name}</div>: ""}
            <ul>
                <li>
                    <NavLink to = "/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to = "/create">
                        Create
                    </NavLink>
                </li>
                {!isLoggedIn?
                <div>
                    <li>
                        <NavLink to = "/register">
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/login">
                            Login
                        </NavLink>
                    </li> 
                </div>
                :
                <li>
                    <NavLink to = "/home">
                        All Users
                    </NavLink>
                </li>
                }
            </ul>
            <Switch>
                <Route exact path='/' component={PeopleList} />
                <Route 
                    path='/create' 
                    //component={NewPerson} 
                    render={(props) => <NewPerson {...props} onSuccess = {this.onSuccess} />}
                />
                <Route
                    path="/register"
                    render={(props) => <Register {...props} 
                                          onSuccess = {this.onSuccess} 
                                          setLoggedIn = {this.setLoggedIn}
                                      />}
                />
                <Route
                    path="/home"
                    render={(props) => <Home {...props} logoutUser = {this._logoutUser}/>}
                />
                <Route
                    path="/login"
                    render={(props) => <Login {...props} 
                                          onSuccess = {this.onSuccess} 
                                          setLoggedIn = {this.setLoggedIn}
                                      />}
                />
                <Route 
                    path='/upload/:id' 
                    //component={FileUploadComponent}
                    render={(props) => <FileUploadComponent {...props} onSuccess = {this.onSuccess}/>}
                />
                <Route path='/:id' component={SinglePerson}/>
            </Switch>
          </Router>
          </div>
        )
      }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
