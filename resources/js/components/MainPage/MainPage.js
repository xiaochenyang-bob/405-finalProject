import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'; 
import logo from "./image/website-logo.png";
import {Header, Image, Menu, Button} from 'semantic-ui-react';
import "./MainPage.css";

const MainPage = (props) =>{
    const [activeItem, setActiveItem] = useState('home');
    //console.log(props);
    const {redirectAllPets, redirectHome, redirectMyPets, redirectReset, redirectUsers, redirectContacts, user, logoutUser} = props;
    useEffect(()=>{
        //to d0
        redirectReset();
        if (activeItem === 'logout')
        {
            logoutUser();
        }
    },[activeItem]);

    const handleItemClick = (e, { name }) => 
    {
        const {id} = user;
        setActiveItem(name);
        if (name==='home')
        {
            redirectHome();
        }
        else if (name === "my pets")
        {
            redirectMyPets();
        }
        else if (name === "all pets")
        {
            redirectAllPets();
        }
        else if (name === "people")
        {
            redirectUsers();
        }
        else if (name === "contacts")
        {
            redirectContacts();
        }
    }

    return(
        <div className="main-page-container">
            <div className="main-page-header">
                <div className="main-page-content">
                <Header as='h1' textAlign="left">
                    <Image src={logo} alt='logo'/> Muddy Paws Rescue
                </Header>
                <Header as='h2' textAlign="right">
                    Welcome, {user.name}!
                </Header>
                </div>
            </div>

            <div className="main-page-menu">
                <Menu pointing secondary>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='all pets'
                        active={activeItem === 'all pets'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='people'
                        active={activeItem === 'people'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='my pets'
                        active={activeItem === 'my pets'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='contacts'
                        active={activeItem === 'contacts'}
                        onClick={handleItemClick}
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        </div>
    );
}

export default MainPage;