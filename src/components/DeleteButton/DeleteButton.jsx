import React, { useState } from "react";
import { deletePost } from "../api-adapters";
import { useNavigate } from "react-router-dom";

function DeleteButton(props) {
  const allPosts = props.allPosts;
  const setAllPosts = props.setAllPosts;
  const postInfo = props.postInfo;
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await deletePost(postInfo._id);
      const updatePosts = allPosts.filter((post) => post._id !== postInfo._id);
      setAllPosts(updatePosts);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={handleDelete} className="mr-2 mb-3">
      Delete
    </button>
  );
}

export default DeleteButton;
