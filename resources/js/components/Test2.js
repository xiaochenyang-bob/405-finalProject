import React from 'react';
import ReactDOM from 'react-dom';

export default class Test1 extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            variable: ""
        }
    }

    render(){
        return(
            <div>
                <div>This is test 2</div>
                <div>{this.props.fname}</div>
                <div>{this.props.lname}</div>
                <div>{this.props.agree}</div>
            </div>
        );
    }
}

if (document.getElementById('test2')) {
    const fname = document.getElementById('test2').getAttribute('data-fname');
    const lname = document.getElementById('test2').getAttribute('data-lname');
    const agree = document.getElementById('test2').getAttribute('data-agree');
    ReactDOM.render(<Test2  fname = {fname} lname = {lname} agree = {agree}/>, document.getElementById('test2'));
}