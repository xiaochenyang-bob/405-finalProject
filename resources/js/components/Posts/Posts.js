import React from 'react';
import "./Posts.css";
import PostEntry from '../PostEntry/PostEntry';
import PostList from '../PostList/PostList';


const Posts = (props) =>(
    <div>
    <PostEntry {...props} user={props.user} onSuccess={props.onSuccess}/>
    <PostList {...props} user={props.user}/>
    </div>
);

export default Posts;