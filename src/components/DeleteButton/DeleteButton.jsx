import React, { useState } from "react";
import { deletePost } from "../api-adapters";

function DeleteButton(props) {
const allPosts = props.allPosts
const setAllPosts = props.setAllPosts
const singlePost = props.singlePost
 const handleDelete = async () => {
    try {
     const response = await deletePost(singlePost._id)  
     const updatePosts = allPosts.filter((post) => post._id !==singlePost._id) 
     setAllPosts(updatePosts)
    } catch (error) {
      console.log(error)  
    }
 }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton