import React from 'react';
import "./PetCard.css";
import {Card, Button, Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const PetCard = ({info, user}) =>{
    const extra = (
        <div>
        <a>
            {info.Species} Age:{info.Age}
        </a>

        {(!(Object.keys(user).length === 0) && info.user.id === user.id)?
                <div className='ui two buttons'>
                <NavLink to={`/pets/edit/${info.PetId}`}>
                    <Button basic color='green'>
                        Edit
                    </Button>
                </NavLink>
                <NavLink to={`/pets/delete/${info.PetId}`}>
                    <Button basic color='red'>
                        Remove
                    </Button>
                </NavLink>
            </div>
            :null
        }
       </div>
    );

    return(
        <Card
            image={`/images/${info.Filename}`}
            header={`${info.Name}`}
            meta={`${info.Breed} ${info.Gender}`}
            description={`${info.Description}`}
            extra={extra}

        />
    );
};

export default PetCard;