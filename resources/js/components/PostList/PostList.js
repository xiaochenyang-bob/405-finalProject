import React, {useState, useEffect} from 'react';
import { Image, Item, Button, Icon, Confirm} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import "./PostList.css";
import axios from 'axios';


export default class PostList extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          posts: [],
          token: JSON.parse(localStorage["appState"]).user.auth_token,
        }
      }
   
    componentDidMount = () => {
        const {history} = this.props;
        axios.get(`/api/post?token=${this.state.token}`).then(response => {
          this.setState({
            posts: response.data
          })
        }).catch(error=>{
            history.push("/login");
        });
    }


    render(){
        const {posts} = this.state;
        const {user} = this .props;
        return(
            <div className="postlist-container">
            <Item.Group divided>
                {posts.map(post => {
                    //parse the time stamp
                    const formattedTimestamp = post.created_at.substring(0,10) + " " + post.created_at.substring(11,19);
                    return(
                        <Item key={post.PostId}>
                        {post.Filename?
                            <Item.Image size='small' src={`images/${post.Filename}`} />
                        :null}
                        <Item.Content>
                        <Item.Header as='a'>Post by {post.user.name}</Item.Header>
                        <Item.Meta>	
                            <span className='post-date'>{formattedTimestamp}</span>
                        </Item.Meta>
                        <Item.Description>{post.Text}</Item.Description>
                        {user.name === post.user.name?
                            <Item.Extra>
                            <NavLink to={`home/delete/${post.PostId}`}> 
                                <Button color='red' floated='right'>
                                    Delete
                                <Icon name='right chevron' />
                                </Button >
                            </NavLink> 
                           </Item.Extra>
                        :null}
                        </Item.Content>
                    </Item>
                    );
                })}

            </Item.Group>
            </div>
        );
    }
}
