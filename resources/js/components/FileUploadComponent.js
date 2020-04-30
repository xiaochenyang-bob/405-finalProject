import React, { Component } from 'react';
import axios, { post } from 'axios';
import { Button, Form, FormField } from 'semantic-ui-react';

export default class FileUploadComponent extends Component
{
   constructor(props) {
      super(props);
      this.state ={
        image: ''
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
      e.preventDefault() 
      this.fileUpload(this.state.image);
    }
    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
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
      fileUpload(image){
        const {id} = this.props.match.params;
        const { history } = this.props;
        let url = `/api/upload/${id}`;
        const formData = {file: this.state.image}
        return  post(url, formData)
                .then(
                    (response) => {
                        console.log(response);
                        this.props.onSuccess(`Successfully uploaded image`);
                        history.push(`/${id}`);
                    }
                )
      }

     render()
     {
        return(
  
           <Form onSubmit={this.onFormSubmit}>
               <Form.Field>
                    <label>File upload</label>
                    <input 
                      type="file"  
                      onChange={this.onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <button type="submit">Upload</button>
                </Form.Field>
        </Form>
        )
     }
  }