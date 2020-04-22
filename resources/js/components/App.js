import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'; 
//import { Button, Checkbox, Form } from 'semantic-ui-react';
import NewPerson from './NewPerson';
import PeopleList from './PeopleList';
import SinglePerson from './SinglePerson';

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
    render () {
        return (
          <Router>
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
                <Route path='/create' component={NewPerson} />
                <Route path='/:id' component={SinglePerson}/>
            </Switch>
          </Router>
        )
      }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
