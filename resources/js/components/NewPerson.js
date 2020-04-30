import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';

export default class Test1 extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            fname: "",
            lname: "",
            agree: true,
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleFieldChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit = (event)=>{
        event.preventDefault();
        const { history } = this.props;

        const person = {
            fname: this.state.fname,
            lname: this.state.lname,
            agree: this.state.agree
        }

        axios.post('/api/test', person)
            .then((response)=>{
            // redirect to the homepage
            const {fname, lname} = this.state
            this.props.onSuccess(`Successfully created ${fname} ${lname}`)
            history.push('/')
        }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        });
    }

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

    handleCheckboxChange = (event)=>{
        this.setState({
            agree: event.target.checked
        });
    }

    render(){
        return(

            <div>
            <Form onSubmit = {this.handleSubmit}>
            <Form.Field>
            <label>First Name</label>
            <input 
                name="fname" 
                value={this.state.fname}
                className={`form-control ${this.hasErrorFor('fname') ? 'is-invalid' : ''}`}
                placeholder='First Name' 
                onChange={this.handleFieldChange}
            />
            {this.renderErrorFor('fname')}
            </Form.Field>
            <Form.Field>
            <label>Last Name</label>
            <input 
                name="lname" 
                className={`form-control ${this.hasErrorFor('lname') ? 'is-invalid' : ''}`}
                placeholder='Last Name' 
                value={this.state.lname}
                onChange={this.handleFieldChange}
            />
            {this.renderErrorFor('lname')}
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

// if (document.getElementById('test1')) {
//     const test_variable = document.getElementById('test1').getAttribute('data-test-variable');
//     ReactDOM.render(<Test1  test_variable = {test_variable}/>, document.getElementById('test1'));
// }