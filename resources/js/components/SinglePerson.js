import React from 'react';
import axios from 'axios';

export default class SinglePerson extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fname: "", 
            lname: ""
        }
    }

    componentDidMount () {
        const {id} = this.props.match.params; 
        axios.get(`/api/test/${id}`).then(response => {
            this.setState({
                fname: response.data.fname,
                lname: response.data.lname
            });
        });
    }

    render() {
        const {fname, lname} = this.state;
        return(
            <div>
                This person's name is {fname} {lname}!
            </div>
        );
    }
}