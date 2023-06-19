import React, { useState, useEffect } from "react";
import { grabAllPosts } from "../api-adapters";
import NewPostForm from "../NewPostForm/NewPostForm";
import { Link, useParams } from "react-router-dom";

const AllPosts = ({ isLoggedIn, myUsername }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { postId } = useParams();
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
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link to={`/posts/${singlePost._id}`}>
                <p>{singlePost.title}</p>
              </Link>
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
