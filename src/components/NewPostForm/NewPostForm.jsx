import React, { useState } from "react";
import { postNewPost } from "../api-adapters";

function NewPostForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState("");
  const allPosts = props.allPosts;
  const setAllPosts = props.setAllPosts;

  const handleChecked = () => {
    setWillDeliver(!willDeliver);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await postNewPost(
        title,
        description,
        price,
        location,
        willDeliver
      );
      console.log(result);
      const allPostsCopy = [...allPosts, result.data.post];
      setAllPosts(allPostsCopy);
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
    console.log(willDeliver);
  };
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title:{" "}
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="text"
          name="title"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="text"
          name="description"
          value={description}
          required
          onChange={(event) => setDescription(event.target.value)}
        />
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Price:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="number"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <br />
          Location:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          type="text"
          name="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <label
          htmlFor="willDeliver"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2"
        >
          Will Deliver:
        </label>
        <input
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          type="checkbox"
          name="willDeliver"
          value={willDeliver}
          onChange={handleChecked}
          checked={willDeliver}
        />
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New Post
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
