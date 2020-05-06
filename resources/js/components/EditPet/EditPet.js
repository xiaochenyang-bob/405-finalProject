import React from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Form, TextArea } from 'semantic-ui-react';
import axios, { post } from 'axios';
import "./EditPet.css";

export default class  PostEntry extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            PetId: props.match.params.id,
            image: "",
            species: "",
            breed:"",
            gender:"",
            age:"",
            name:"",
            description: "",
            token: JSON.parse(localStorage["appState"]).user.auth_token,
            errors:[]
        }
    }

    componentDidMount = ()=>{
        const {history} = this.props;
        const {PetId} = this.state;
        axios.get(`/api/pet/single/${PetId}?token=${this.state.token}`).then(response => {
            this.setState({
                species: response.data.pet.Species,
                breed: response.data.pet.Breed,
                gender: response.data.pet.Gender,
                age: response.data.pet.Age,
                name: response.data.pet.Name,
                description: response.data.pet.Description,
            });
          }).catch(error=>{
              history.push("/login");
        });
    }


    //handle change in text field
    handleFieldChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onImageChange = (event) =>{
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            image: e.target.result
          })
        };
        reader.readAsDataURL(file);
      }

    //when submit
    handleSubmit = (event)=>{
        event.preventDefault();
        const {id} = this.props.user;
        const {PetId,species,breed,gender,age,name, description, image} = this.state;
        let newPet;
        if (image === "")
        {
            newPet = {
                species: species,
                breed: breed,
                gender: gender,
                age: age,
                name: name,
                description: description
            }
        }
        else
        {
            newPet = {
                species: species,
                breed: breed,
                gender: gender,
                age: age,
                name: name,
                description: description,
                file: image
            }
        }
        let url = `/api/pet/edit/${PetId}?token=${this.state.token}`;
        
        return post(url, newPet)
        .then(
            (response) => {
                const {history} = this.props;
                console.log(response);
                this.props.onSuccess(`${name} is successfully edited!`);
                this.setState({
                    species: species,
                    breed: "",
                    gender: "",
                    age: "",
                    name: "",
                    description: "",
                    image: "",
                    errors: []
                });
                document.getElementById("uploadCaptureInputFile").value = "";
                history.push(`/pets/${id}`);
            }
        ).catch(error => {
            console.log(error);
            if (error !== null)
            {
                this.setState({
                    errors: error.response.data.errors
                });
            }
        });
    }

    //handle error
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
    }

    render(){
        return(
            <div className="create-pet-container">
                <Form className="create-pet-form" onSubmit = {this.handleSubmit}>
                <Form.Field>
                    <label>Species</label>
                    <input 
                        name="species" 
                        value={this.state.species}
                        className={`form-control ${this.hasErrorFor('species') ? 'is-invalid' : ''}`}
                        placeholder='What species is you pet?...' 
                        onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('species')}
                </Form.Field>
                <Form.Field>
                    <label>Breed</label>
                    <input 
                        name="breed" 
                        value={this.state.breed}
                        className={`form-control ${this.hasErrorFor('breed') ? 'is-invalid' : ''}`}
                        placeholder='What breed is you pet?...' 
                        onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('breed')}
                </Form.Field>
                <Form.Field>
                    <label>Gender</label>
                    <input 
                        name="gender" 
                        value={this.state.gender}
                        className={`form-control ${this.hasErrorFor('gender') ? 'is-invalid' : ''}`}
                        placeholder='Is your pet a boy or girl?...' 
                        onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('gender')}
                </Form.Field>
                <Form.Field>
                    <label>Age</label>
                    <input 
                        name="age" 
                        value={this.state.age}
                        className={`form-control ${this.hasErrorFor('age') ? 'is-invalid' : ''}`}
                        placeholder='How old is you pet?...' 
                        onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('age')}
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input 
                        name="name" 
                        value={this.state.name}
                        className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                        placeholder="What is your pet's name?..."
                        onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('name')}
                </Form.Field>
                <Form.Field>
                <label>Write a description</label>
                <TextArea 
                    name="description" 
                    value={this.state.description}
                    className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                    placeholder='Describe your pet!...' 
                    onChange={this.handleFieldChange}
                />
                {this.renderErrorFor('description')}
                </Form.Field>
                <Form.Field>
                    <label>Upload an image for your post!</label>
                    <input 
                      id="uploadCaptureInputFile"
                      type="file"  
                      onChange={this.onImageChange}
                    />
                </Form.Field>
                <Button type='submit' color="blue" >Edit!</Button>
                <NavLink to={`/pets/${this.props.user.id}`}>
                    <Button className="create-pet-back-button">Back</Button>
                </NavLink>
                </Form>
            </div>
        );
    }
}