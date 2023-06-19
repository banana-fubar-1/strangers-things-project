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
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search all posts"
        value={searchQuery}
        onChange={runSearch}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white w-1/4 mb-5"
      />

      <div className="flex ">
        <div className="w-3/4 ">
          {allPosts.length ? (
            filteredPosts.map((singlePost) => {
              return (
                <div
                  key={singlePost._id}
                  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <Link to={`/posts/${singlePost._id}`}>
                    <p>{singlePost.title}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-1/4 lg:w-1/3 ">
          {isLoggedIn ? (
            <NewPostForm allPosts={allPosts} setAllPosts={setAllPosts} />
          ) : (
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Please <Link to={"/login"}>log in</Link> to add new posts
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllPosts;
