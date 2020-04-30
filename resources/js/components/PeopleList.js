import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link, NavLink} from 'react-router-dom';

export default class PeopleList extends React.Component {
    constructor () {
      super()
      this.state = {
        people: []
      }
    }

    componentDidMount () {
        axios.get('http://localhost:8000/api/test').then(response => {
          this.setState({
            people: response.data
          })
        })
    }

    render(){
        const { people } = this.state;
        //console.log(people);
        return(
            <div>
                {people.map((person)=>{
                    //console.log(person);
                    return (
                        <NavLink to = {`/${person.PersonId}`} key = {person.PersonId}>
                          <p key={person.PersonId}> {person.fname} {person.lname}</p>
                        </NavLink>
                    );
                })}
            </div>
        );
    }
    
}
