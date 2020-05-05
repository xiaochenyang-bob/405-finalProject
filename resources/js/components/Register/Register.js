import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Form} from 'semantic-ui-react';
import "./Register.css";

export default class Register extends React.Component{
    constructor(props){
      super(props);
      this.state ={
          email: "",
          password: "",
          name: "",
          errors: []
      }
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
    }

    handleFieldChange = (event)=>{
      this.setState({
          [event.target.name]: event.target.value
      });
    }


    registerUser = (name, email, password) => {
      const { history } = this.props;
      $("#email-login-btn")
        .attr("disabled", "disabled")
        .html(
          '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
        );
      var formData = new FormData(); 
      formData.append("password", password);
      formData.append("email", email);
      formData.append("name", name);
  
      axios
        .post("/api/user/register", formData)
        .then(response => {
          console.log(response);
          history.push('/home');
          return response;
        })
        .then(json => {
          if (json.data.success) {
            this.props.onSuccess(`Successfully registered as ${json.data.data.name} !`);
            let userData = {
              name: json.data.data.name,
              id: json.data.data.id,
              email: json.data.data.email,
              auth_token: json.data.data.auth_token,
              timestamp: new Date().toString()
            };
            let appState = {
              isLoggedIn: true,
              user: userData
            };
            // save app state with user date in local storage
            this.props.setLoggedIn(appState);
          } else {
            alert(`Registration Failed!`);
            $("#email-login-btn")
              .removeAttr("disabled")
              .html("Register");
          }
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          });
          console.log(`${formData} ${error}`);
          $("#email-login-btn")
            .removeAttr("disabled")
            .html("Register");
        });
    }

    handleRegister = (e) => {
      e.preventDefault();
      this.registerUser(this.state.name, this.state.email,this.state.password);
    }

    //handling errors
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
      return (
        <div className="register-form-container">
          <Form className="register-form" action="" onSubmit={this.handleRegister} method="post">
            <h3 className="register-form-label" style={{ padding: 15 }}>Register Form</h3>
            <Form.Field>
                <input 
                  onChange={this.handleFieldChange} 
                  value={this.state.name}
                  autoComplete="off" 
                  id="name-input" 
                  name="name" 
                  type="text" 
                  className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                  placeholder="Name" />
              {this.renderErrorFor('name')}
            </Form.Field>
            <Form.Field>
                <input 
                  onChange={this.handleFieldChange} 
                  value = {this.state.email}
                  autoComplete="off" 
                  id="email-input" 
                  name="email" 
                  type="text" 
                  className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                  placeholder="email" />
              {this.renderErrorFor('email')}
            </Form.Field>
            <Form.Field>
                <input 
                  onChange={this.handleFieldChange} 
                  value = {this.state.password}
                  autoComplete="off" 
                  id="password-input" 
                  name="password" 
                  type="password" 
                  className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                  placeholder="password" />
              {this.renderErrorFor('password')}
            </Form.Field>
            <Button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" >
              Register
            </Button>
    
            <NavLink to="/login">
              Login
            </NavLink>
          </Form>
        </div>
      );
    }
}
