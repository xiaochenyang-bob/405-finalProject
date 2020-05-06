import React from 'react';
import "./ContactList.css";
import {Item, Card, Button, Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

export default class ContactList extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          contacts: [],
          id: props.match.params.id,
          token: JSON.parse(localStorage["appState"]).user.auth_token
        }
      }
    
    componentDidMount = () => {
        const {history} = this.props;
        const {id} = this.state;
        axios.get(`/api/user/contact/${id}?token=${this.state.token}`).then(response => {
            console.log(response.data);
            this.setState({contacts: response.data});
        }).catch(error=>{
            history.push("/login");
        });
    }

    render(){
        const {contacts} = this.state;
        const {user} = this.props;
        return(
            <div className="contactlist-container">
            {contacts.length?
            <Item.Group divided>
                {contacts.map(contact => {
                    //parse the time stamp
                    const formattedTimestamp = contact.created_at.substring(0,10) + " " + contact.created_at.substring(11,19);
                    return(
                        <Item key={contact.id}>
                        <Item.Content>
                        <Item.Header as='a'>{contact.name}</Item.Header>
                        <Item.Meta>	
                            <span className='contact-date'>Account created at {formattedTimestamp}</span>
                        </Item.Meta>
                        <Item.Description>Email: {contact.email}</Item.Description>
                        <Item.Extra>
                        <NavLink to={`/chat?name=${user.name}&room=chatroom`}>
                        <Button color='blue' floated='right'>
                                Message {contact.name}
                            <Icon name='right chevron' />
                        </Button >
                        </NavLink>
                        </Item.Extra>
                        </Item.Content>
                    </Item>
                    );
                })}

            </Item.Group>
            :
            <div>You don't have any contacts yet</div>
            }
            </div>
        );
    }
} 