import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';

export default class Test1 extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            fname: "",
            lname: "",
            agree: true
        }
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFnameChange = (event)=>{
        this.setState({
            fname: event.target.value
        });
    }

    handleLnameChange = (event)=>{
        this.setState({
            lname: event.target.value
        });
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('/test', {
            fname: this.state.fname,
            lname: this.state.lname,
            agree: this.state.agree
        }).then((request)=>{
            console.log(request.data);
            window.location.href = '/';
        });
    }

    handleCheckboxChange = (event)=>{
        this.setState({
            agree: event.target.checked
        });
    }



    render(){
        console.log(this.props.test_variable);
        return(

            <div>
                Hi this is just a test
            <Form onSubmit = {this.handleSubmit}>
            <Form.Field>
            <label>First Name</label>
            <input 
                name="fname" 
                value={this.state.fname}
                placeholder='First Name' 
                onChange={this.handleFnameChange}
            />
            </Form.Field>
            <Form.Field>
            <label>Last Name</label>
            <input 
                name="lname" 
                placeholder='Last Name' 
                value={this.state.lname}
                onChange={this.handleLnameChange}
            />
            </Form.Field>
            <Form.Field>
            <Checkbox 
                name="agree" 
                label='I agree to the Terms and Conditions' 
                checked={this.state.agree}
                onChange={this.handleCheckboxChange}
            />
            </Form.Field>
            <Button type='submit'>Submit</Button>
            </Form> 
            </div>
        );
    }
}

if (document.getElementById('test1')) {
    const test_variable = document.getElementById('test1').getAttribute('data-test-variable');
    ReactDOM.render(<Test1  test_variable = {test_variable}/>, document.getElementById('test1'));
}