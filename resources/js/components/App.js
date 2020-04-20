import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'; 
import { Header, Button } from 'semantic-ui-react';

function App() {
    return (
        <div className="container">
            <Header as='h1'>First Header</Header>
            <Router>
                <NavLink to = "/test">
                    Test
                </NavLink>
                <Route path="/test">
                    <p>Test </p>
                 </Route>
            </Router>
            <Button primary>Click Here</Button>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
