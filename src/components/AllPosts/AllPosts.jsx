import React, { useState, useEffect } from "react";
import { grabAllPosts } from "../api-adapters";
import NewPostForm from "../NewPostForm/NewPostForm";
import DeleteButton from "../DeleteButton/DeleteButton";

const AllPosts = ({ isLoggedIn, myUsername }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const results = await grabAllPosts();
        setAllPosts(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);

  const runSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <h2>All Posts: </h2>
      <input
        type="text"
        placeholder="Search all posts"
        value={searchQuery}
        onChange={runSearch}
      />
      {allPosts.length ? (
        filteredPosts.map((singlePost) => {
          return (
            <div key={singlePost._id} className="single-post-card">
              <p>Title: {singlePost.title}</p>
              <p>Description: {singlePost.description}</p>
              <p>Price: {singlePost.price}</p>
              <p>Location: {singlePost.location}</p>
              {singlePost.author.username === myUsername ? (<DeleteButton allPosts={allPosts} setAllPosts={setAllPosts} singlePost={singlePost}/>) : null }
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}

      {isLoggedIn ? (
        <NewPostForm allPosts={allPosts} setAllPosts={setAllPosts} />
      ) : (
        <p>Please log in to add new posts</p>
      )}
    </div>
  );
};

export default AllPosts;
