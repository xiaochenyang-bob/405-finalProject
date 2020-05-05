import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'; 
//import { Button, Checkbox, Form } from 'semantic-ui-react';
import NewPerson from './NewPerson';
import PeopleList from './PeopleList';
import SinglePerson from './SinglePerson';
import FileUploadComponent from './FileUploadComponent';
//import Alert from 'react-bootstrap/Alert'
import { Alert } from 'reactstrap';
//import { findDOMNode } from 'react-dom';
import Home from "./Home";
//used for real project
import HomePage from "./HomePage/HomePage";
import About from './About/About';
import Login from "./Login/Login";
import Register from "./Register/Register";
import MainPage from "./MainPage/MainPage";
import Pets from "./Pets/Pets";
import Posts from "./Posts/Posts";
import DeletePost from "./DeletePost/DeletePost";

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          success: "",
          visible: false,
          isLoggedIn: false,
          user: {},
          redirect: false
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
        const{history} = this.props;
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.onSuccess(`Successfully logged out!`);
        this.setState({redirect:true});
    };


    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }
    

    render () {
        const {user, success, isLoggedIn, redirect} = this.state;
        return (
          //the header and menu for mainpage
          <Router>
            {/* the alert message */}
            <Alert color="success" isOpen={this.state.visible} > 
                {success}
            </Alert>
            {redirect?<Redirect to="/"/>:null}
            {/* show the header and menu is logged in */}
            {!(Object.keys(user).length === 0 && user.constructor === Object)
            ? 
            (
                <MainPage user={user} logoutUser = {this._logoutUser}/>
            )
            : null}
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/about' component={About}/>
                {/* <Route 
                    path='/mainpage'
                    render={(props) => <MainPage {...props} user={user} logoutUser = {this._logoutUser}/>}
                /> */}
                <Route exact path="/pets" component={Pets} />
                <Route exact path="/home"
                       render={(props) => <Posts {...props} 
                                                user = {user} 
                                                onSuccess = {this.onSuccess} 
                                            />}
                />
                <Route 
                    path='/home/delete/:id'
                    render={(props) => <DeletePost {...props}
                                                onSucess = {this.onSuccess}
                                        />}
                />
                {/* <Route 
                    path='/create' 
                    render={(props) => <NewPerson {...props} onSuccess = {this.onSuccess} />}
                /> */}
                <Route
                    path="/register"
                    render={(props) => <Register {...props} 
                                          onSuccess = {this.onSuccess} 
                                          setLoggedIn = {this.setLoggedIn}
                                      />}
                />
                {/* <Route
                    path="/home"
                    render={(props) => <Home {...props} logoutUser = {this._logoutUser}/>}
                /> */}
                <Route
                    path="/login"
                    render={(props) => <Login {...props} 
                                          onSuccess = {this.onSuccess} 
                                          setLoggedIn = {this.setLoggedIn}
                                      />}
                />
                {/* <Route 
                    path='/upload/:id' 
                    //component={FileUploadComponent}
                    render={(props) => <FileUploadComponent {...props} onSuccess = {this.onSuccess}/>}
                />
                <Route path='/:id' component={SinglePerson}/> */}
            </Switch>
          </Router>
        )
      }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
