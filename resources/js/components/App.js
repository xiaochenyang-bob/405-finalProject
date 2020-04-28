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

export default class App extends React.Component {
    // return (
    //     <div className="container">
    //         <Header as='h1'>First Header</Header>
    //         <Router>
    //             <NavLink to = "/test">
    //                 Test
    //             </NavLink>
    //             <Route path="/test">
    //                 <p>Test </p>
    //              </Route>
    //         </Router>
    //         <Button primary>Click Here</Button>
    //     </div>
    // );
    constructor () {
        super()
        this.state = {
          success: "",
          visible: false
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

    render () {
        const {success} = this.state;
        return (
          <div>
          <Router>
              {/* the alert message */}
            <Alert color="success" isOpen={this.state.visible} > 
                {success}
            </Alert>
            <div>
              Hi, I am your header
            </div>
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
            </ul>
            <Switch>
                <Route exact path='/' component={PeopleList} />
                <Route 
                    path='/create' 
                    //component={NewPerson} 
                    render={(props) => <NewPerson {...props} onSuccess = {this.onSuccess} />}
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
