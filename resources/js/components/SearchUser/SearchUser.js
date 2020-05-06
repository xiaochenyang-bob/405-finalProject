import React, {useState, useEffect} from 'react';
import "./SearchUser.css";
import {Form, Button} from 'semantic-ui-react';


const SearchUser = ({searchUser}) =>{
    const [searchValue, setSearchValue] = useState('');
    
    return (
        <Form className="search-user-form">
            <Form.Field>
            <label>Search for a user</label>
            <input 
                type = "text"
                placeholder='Who are you looking for?...' 
                value = {searchValue}
                onChange={(event)=> setSearchValue(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? null: null}
            />
            </Form.Field>
            <Button type='submit' onClick={(event)=>searchUser(event, searchValue)}>Search!</Button>
        </Form>
    );
}

export default SearchUser;