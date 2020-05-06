import React from 'react';
import "./DeletePost.css";
import {NavLink} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
const DeletePost = (props) =>{
    const {id} = props.match.params; 
    
    const onDelete = () =>{
        const {history} = props;
        axios.post(`/api/post/delete/${id}?token=${JSON.parse(localStorage["appState"]).user.auth_token}`).then(response => {
            console.log(response);
            history.push('/home');
        }).catch(error=>{
            console.log(error);
            history.push("/login");
        });
    }

    return(
        <div className="delete-post-container">
        <h1>Are you sure you want to delete this post?</h1>
        <NavLink to={`/home`}> 
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

export default DeletePost;