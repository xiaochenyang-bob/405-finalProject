import React from 'react';
import "./Pets.css";
import {Card, Button} from 'semantic-ui-react';
import PetCard from '../PetCard/PetCard';
import {NavLink} from 'react-router-dom';
import SearchPet from '../SearchPet/SearchPet';

export default class Pets extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          pets: []
        }
      }
    
      componentDidMount = () => {
        axios.get("/api/pet/all").then(response => {
          this.setState({
            pets: response.data
          })
        });
    }

    searchSpecies = (event, searchValue) => {
        event.preventDefault();
        if (searchValue === "")
        {
            axios.get("/api/pet/all").then(response => {
                this.setState({
                  pets: response.data
                })
              });
        }
        else{
            axios.get(`/api/pet/species/${searchValue}`).then(response => {
                this.setState({
                  error: '',
                  pets: response.data
                })
              }).catch(error=>{
                  this.setState({
                      error: "We don't have this species yet."
                  });
              });
        }
    }

    render(){
        const {pets} = this.state;
        const {user} = this.props;
        return (
            <div className="pets-container">
                <SearchPet searchSpecies={this.searchSpecies}/>
                {pets.length?
                <div>
                <Card.Group itemsPerRow={3}>
                    {pets.map(pet => {
                        return(
                            <PetCard key={pet.PetId} info={pet} user={user}/>
                        );
                    })}
                </Card.Group>
                </div> 
                :
                    <div>We don't have this species yet.</div>
                }
                {Object.keys(user).length === 0?
                <NavLink to = "/">
                    <Button color="blue" className="all-pet-back-button">
                        Back
                    </Button>
                </NavLink>
                :null}
            </div>
        );
    }
} 
