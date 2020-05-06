import React from 'react';
import { Image, Item, Button, Icon, Confirm, Label} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import "./UserList.css";
import axios from 'axios';
import SearchUser from '../SearchUser/SearchUser';


export default class UserList extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          users: [],
          token: JSON.parse(localStorage["appState"]).user.auth_token,
          currentContacts:[],
        }
      }
   
    componentDidMount = () => {
        const {currentUser, history} = this.props;
        
        axios
        .get(`/api/user/name/select/${currentUser.name}?token=${this.state.token}`)
        .then(response => {
            this.setState({ currentContacts: response.data.contacts});
        })
        .catch(error => {
            history.push("/login");
        });

        axios
        .get(`/api/users/list?token=${this.state.token}`)
        .then(response => {
            //this.getCurrentUser(currentUser.name);
            return response;
        })
        .then(json => {
            if (json.data.success) {
            this.setState({ users: json.data.data });
            } else alert("Login Failed!");
        })
        .catch(error => {
            history.push("/login");
        });

    }

    searchUser = (event, searchValue) => {
        event.preventDefault();
        if (searchValue === "")
        {
            const {history} = this.props;
            axios
            .get(`/api/users/list?token=${this.state.token}`)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.success) {
                this.setState({ users: json.data.data });
                } else alert("Login Failed!");
            })
            .catch(error => {
                history.push("/login");
            });
        }
        else{
            axios.get(`/api/user/name/${searchValue}?token=${this.state.token}`).then(response => {
                this.setState({
                  error: '',
                  users: response.data
                })
              }).catch(error=>{
                  this.setState({
                      error: "We can't find this user"
                  });
              });
        }
    }

    // getCurrentUser = (name)=>{
    //     const {history} = this.props;
        
    // }

    addContact = (id1, id2)=>{
        const {history} = this.props;
        console.log(id1);
        console.log(id2);
        axios
        .post(`/api/contacts/add/${id1}/${id2}/?token=${this.state.token}`)
        .then(response => {
            this.props.onSuccess(`Successfully created contacts!`);
            const path = "/users/" + id1;
            history.push(path);
            return response;
        })
        .catch(error => {
            history.push('/login');
        });

    }

    inContacts = (contacts, user)=>{
        const {currentUser} = this.props;
        let i;
        for (i = 0; i < contacts.length; i++) {
            if (contacts[i].name === user.name)
            {
                return (
                    <Label>
                        Already in my contacts.
                    </Label>
                );
            }
            else
            {
                continue;
            }
        }
        return (
            <Button color='green' floated='right' onClick={(event)=>this.addContact(currentUser.id, user.id)}>
                Add {user.name} as contact!
                <Icon name='right chevron' />
            </Button >
        );
    }


    render(){
        const {users, currentContacts} = this.state;
        const {currentUser} = this.props;
        console.log(currentContacts);
        return(
            <div className="userlist-container">
            <SearchUser className="userlist-search-bar" searchUser={this.searchUser}/>
            {users.length?
            <Item.Group divided>
                {users.map(user => {
                    //parse the time stamp
                    const formattedTimestamp = user.created_at.substring(0,10) + " " + user.created_at.substring(11,19);
                    return(
                        <Item key={user.id}>
                        <Item.Content>
                        <Item.Header as='a'>{user.name}</Item.Header>
                        <Item.Meta>	
                            <span className='user-date'>Account created at {formattedTimestamp}</span>
                        </Item.Meta>
                        <Item.Description>Email: {user.email}</Item.Description>
                        {!(currentUser.name === user.name)?
                            <Item.Extra>
                            {this.inContacts(currentContacts, user)}
                           </Item.Extra>
                        :null}
                        </Item.Content>
                    </Item>
                    );
                })}

            </Item.Group>
            :
            <div>We don't have user with this name.</div>
            }
            </div>
        );
    }
}