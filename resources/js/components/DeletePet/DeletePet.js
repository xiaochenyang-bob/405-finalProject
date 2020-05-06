import React from 'react';
import "./DeletePet.css";
import {NavLink} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
const DeletePet = (props) =>{
    const {id} = props.match.params; 
    
    const onDelete = () =>{
        const {user, history} = props;
        const path = "/pets/" + user.id;
        axios.post(`/api/pet/delete/${id}?token=${JSON.parse(localStorage["appState"]).user.auth_token}`).then(response => {
            console.log(response);
            history.push(path);
        }).catch(error=>{
            console.log(error);
            history.push("/login");
        });
    }

    return(
        <div className="delete-pet-container">
        <h1>Are you sure you want to remove this pet from your list?</h1>
        <NavLink to={`/pets/${props.user.id}`}> 
            <Button>
                Cancel
            </Button >
        </NavLink>
        <Button color='red' onClick={()=>onDelete()}>
            Ok
        </Button>
        </div>
    );
}

export default DeletePet;