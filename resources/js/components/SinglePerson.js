import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class SinglePerson extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fname: "", 
            lname: "",
            imageFile: ""
        }
    }

    componentDidMount () {
        const {id} = this.props.match.params; 
        axios.get(`http://localhost:8000/api/test/${id}`).then(response => {
            console.log(response.data);
            this.setState({
                fname: response.data.person.fname,
                lname: response.data.person.lname
            });
            if (response.data.image.length != 0)
            {
                this.setState({
                    imageFile: response.data.image[0].filename
                });
            }
        });
    }

    render() {
        const {fname, lname, imageFile} = this.state;
        const {id} = this.props.match.params; 
        return(
            <div>
                This person's name is {fname} {lname}!
                <br/>
                {imageFile? <img src={`images/${imageFile}`} alt={`${fname}`}  width="300"/>: 
                <NavLink to = {`/upload/${id}`}>
                    Upload a photo for this person.
                </NavLink>
                }
            </div>
        );
    }
}