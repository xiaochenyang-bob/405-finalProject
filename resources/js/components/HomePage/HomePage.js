import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from "./image/website-logo.png";
import background from "./image/background.jpeg";
import { Button} from 'semantic-ui-react';
import "./HomePage.css";

const HomePage = () =>(
    <div className="homepage-container">
        <div className="homepage-background"><img alt="background" src={background}/></div>
        <NavLink to={`/about`}>
            <img className="logo" alt="logo" src={logo}/>
        </NavLink>
        <div className="clearfloat"></div>
        <div className="homepage-main">
            <div className="clear-float"></div>
            <NavLink to={`/pets/all`}>
                <Button type="submit" color='blue'>Check out our pets!</Button>
            </NavLink>
            <NavLink to={`/register`}>
                <Button type="submit" color='blue'>Register today!</Button>
            </NavLink> 
            <NavLink to = "/login">
                <Button type="submit" color='blue'>Already have an account!</Button>
            </NavLink>
        </div>
    </div>
);

export default HomePage;
