import React from 'react';
import "./MyPets.css";
import {NavLink} from 'react-router-dom';
import {Card, Button} from 'semantic-ui-react';
import PetCard from '../PetCard/PetCard';

export default class MyPets extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          pets: [],
          id: props.match.params.id,
          token: JSON.parse(localStorage["appState"]).user.auth_token
        }
      }
    
      componentDidMount = () => {
        const {history} = this.props;
        const {id} = this.state;
        axios.get(`/api/pet/get/${id}?token=${this.state.token}`).then(response => {
          this.setState({
            pets: response.data
          })
        }).catch(error=>{
            history.push("/login");
        });
    }

    render(){
        const {id, pets} = this.state;
        const {user} = this.props;
        return (
            <div className="my-pets-container">
                {pets.length!==0?
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
                <div>You haven't uploaded any pets yet.</div>
                }
                <div className="my-pets-button">  
                <NavLink to={`/pets/create/${id}`}>
                    <Button color='green'>
                        Add a pet!
                    </Button>
                </NavLink>
                </div>
            </div>
        );
    }
} 