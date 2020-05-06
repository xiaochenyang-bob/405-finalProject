import React, {useState, useEffect} from 'react';
import "./SearchPet.css";
import {Form, Button} from 'semantic-ui-react';


const SearchPet = ({searchSpecies}) =>{
    const [searchValue, setSearchValue] = useState('');
    
    return (
        <Form className="search-pet-form">
            <Form.Field>
            <label>Search for a species</label>
            <input 
                type = "text"
                placeholder='What are you looking for?...' 
                value = {searchValue}
                onChange={(event)=> setSearchValue(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? null: null}
            />
            </Form.Field>
            <Button type='submit' onClick={(event)=>searchSpecies(event, searchValue)}>Search!</Button>
        </Form>
    );
}

export default SearchPet;