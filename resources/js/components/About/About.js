import React from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import "./About.css";

const About = () =>(
    <div className="about-container">
        <div className="about-main">
        <h1>About</h1>
        <p>
            This website is an internet platform for pets to find their future parents. 
            People can share information about pets who yet have a family or adopt a pet. 
        </p>
        <NavLink to = "/">
            <Button type="submit">Home</Button>
        </NavLink>
        </div>
    </div>
);

export default About;