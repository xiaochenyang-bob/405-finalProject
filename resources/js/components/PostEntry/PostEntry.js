import React from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Form, TextArea } from 'semantic-ui-react';
import axios, { post } from 'axios';
import "./PostEntry.css";

export default class  PostEntry extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            text: "",
            image: "",
            token: JSON.parse(localStorage["appState"]).user.auth_token,
            errors:[]
        }
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
        const {history} = this.props;
        const {id, name} = this.props.user;
        const {text, image} = this.state;
        let userPost;
        if (image === "")
        {
            userPost = {
                text:text
            }
        }
        else
        {
            userPost = {
                text: text,
                file: image
            }
        }
        let url = `/api/post/${id}?token=${this.state.token}`;
        
        return post(url, userPost)
        .then(
            (response) => {
                const {history} = this.props;
                console.log(response);
                this.props.onSuccess(`${name} made a post!`);
                this.setState({
                    text: "",
                    image: "",
                    errors: []
                });
                document.getElementById("uploadCaptureInputFile").value = "";
                window.location = "/home";
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
            <div className="postentry-container">
                <Form className="postentry-form" onSubmit = {this.handleSubmit}>
                <Form.Field>
                <label>Write a post</label>
                <TextArea 
                    name="text" 
                    value={this.state.text}
                    className={`form-control ${this.hasErrorFor('text') ? 'is-invalid' : ''}`}
                    placeholder='What is in your mind? ... ' 
                    onChange={this.handleFieldChange}
                />
                {this.renderErrorFor('text')}
                </Form.Field>
                <Form.Field>
                    <label>Upload an image for your post!</label>
                    <input 
                      id="uploadCaptureInputFile"
                      type="file"  
                      onChange={this.onImageChange}
                    />
                </Form.Field>
                <Button type='submit' color="blue" >Post!</Button>
                </Form>
            </div>
        );
    }
}
