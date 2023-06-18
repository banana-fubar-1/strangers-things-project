import React, { useState } from "react";
import { postNewPost } from "../api-adapters";

function NewPostForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState("")
 const allPosts = props.allPosts
 const setAllPosts = props.setAllPosts

 const handleChecked = () => {
  setWillDeliver(!willDeliver)
 }
 
 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await postNewPost(title, description, price, location, willDeliver);
      console.log(result)
      const allPostsCopy = [...allPosts, result.data.post]
      setAllPosts(allPostsCopy)
    } catch (error) {
      console.log(error);
    } 
    setTitle("")
    setDescription("")
    setPrice("")
    setWillDeliver(false)
    console.log(willDeliver)

  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="description">Description: </label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <label htmlFor="price">Price: </label>
      <input
        type="text"
        name="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
        <label htmlFor="location">Location: </label>
      <input
        type="text"
        name="location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
      <label htmlFor="willDeliver">Will Deliver: </label>
      <input
        type="checkbox"
        name="willDeliver"
        value={willDeliver}
        onChange = {handleChecked}
        checked={willDeliver}
      />
      <button type="submit">Add New Post</button>
    </form>
  );
}

export default NewPostForm;
