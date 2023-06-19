import { useState, useEffect } from "react";
import { grabSinglePost } from "../api-adapters";
import { useParams } from "react-router-dom";
import DeleteButton from "../DeleteButton/DeleteButton";
import { updatePost } from "../api-adapters";
import MessageButton from "../MessageButton/MessageButton.jsx";

function SinglePost({ myUsername, allPosts, setAllPosts }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedPostInfo, setUpdatedPostInfo] = useState({});
  const [postInfo, setPostInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { postId } = useParams();
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const results = await grabSinglePost(postId);

        setPostInfo(results);

        setUpdatedPostInfo(results);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchSinglePost();
  }, [postId]);

  const handleUpdate = async () => {
    try {
      await updatePost(postId, updatedPostInfo);
      setPostInfo(updatedPostInfo);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!postInfo) {
    return <p>This posting has been deleted!</p>;
  }

  const renderEditButton =
    postInfo.author && postInfo.author.username === myUsername && !editMode;

  return (
    <div className="flex justify-center ">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-1/2">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {postInfo.title}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 py-2">
          {postInfo.description}
        </p>
        <p className="py-3">Price: {postInfo.price}</p>
        <p className="pb-4">Location: {postInfo.location}</p>
        {postInfo.author.username !== myUsername ? (
          <MessageButton
            allPosts={allPosts}
            setAllPosts={setAllPosts}
            postInfo={postInfo}
          />
        ) : null}
        {postInfo.author.username === myUsername || myUsername === "admin" ? (
          <DeleteButton
            allPosts={allPosts}
            setAllPosts={setAllPosts}
            postInfo={postInfo}
          />
        ) : null}
        {renderEditButton && (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
        {editMode ? (
          <div>
            <p>
              Title:{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={updatedPostInfo.title}
                onChange={(e) =>
                  setUpdatedPostInfo({
                    ...updatedPostInfo,
                    title: e.target.value,
                  })
                }
              />
            </p>
            <p>
              Description:{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={updatedPostInfo.description}
                onChange={(e) =>
                  setUpdatedPostInfo({
                    ...updatedPostInfo,
                    description: e.target.value,
                  })
                }
              />
            </p>
            <p>
              Price:{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={updatedPostInfo.price}
                onChange={(e) =>
                  setUpdatedPostInfo({
                    ...updatedPostInfo,
                    price: e.target.value,
                  })
                }
              />
            </p>
            <p>
              Location:{" "}
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={updatedPostInfo.location}
                onChange={(e) =>
                  setUpdatedPostInfo({
                    ...updatedPostInfo,
                    location: e.target.value,
                  })
                }
              />
            </p>
            <button onClick={handleUpdate} className="mr-2 mt-2">
              Save
            </button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SinglePost;
