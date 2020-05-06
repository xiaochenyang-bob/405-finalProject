import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Form} from 'semantic-ui-react';
import { Alert } from 'reactstrap';
import "./Login.css";

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state ={
        email: "",
        password: "",
        visible:false,
        errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loginFailed = () =>{
    this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },2000)
    });
}

  handleFieldChange = (event)=>{
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  loginUser = (email, password) => {
    const { history } = this.props;
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("/api/user/login", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.props.onSuccess(`Successfully logged in as ${json.data.data.name} !`);
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
          history.push('/home');
        } 
        else 
        {
            this.loginFailed();
        }
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        });
      });
  }

  handleLogin = (e) => {
      e.preventDefault();
      this.loginUser(this.state.email,this.state.password);
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
        <div className="login-form-container">
          <Form className="login-form" action="" onSubmit={this.handleLogin} method="get">
            <h3 className="login-form-label" style={{ padding: 15 }}>Login Form</h3>
            <Alert color="warning" isOpen={this.state.visible} > 
                Login Failed 
            </Alert>
            <Form.Field>
                <input 
                  onChange={this.handleFieldChange} 
                  value={this.state.email}
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
                  value={this.state.password}  
                  autoComplete="off" 
                  id="password-input" 
                  name="password" 
                  type="password" 
                  className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                  placeholder="password" />
                {this.renderErrorFor('password')}
            </Form.Field>
            <Button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn">
              Login
            </Button>
    
            <NavLink to="/register">
              Register
            </NavLink>
          </Form>
        </div>
      );
  }
}
