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
  return <p>This posting has been deleted!</p>
}

  const renderEditButton =
    postInfo.author && postInfo.author.username === myUsername && !editMode;

  return (
    <div>
      <p>Title: {postInfo.title}</p>
      <p>Description: {postInfo.description}</p>
      <p>Price: {postInfo.price}</p>
      <p>Location: {postInfo.location}</p>
      {postInfo.author.username !== myUsername ? (
        <MessageButton
          allPosts={allPosts}
          setAllPosts={setAllPosts}
          postInfo={postInfo}
        />
      ) : null}
      {(postInfo.author.username === myUsername || myUsername === "admin")? (
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
              value={updatedPostInfo.location}
              onChange={(e) =>
                setUpdatedPostInfo({
                  ...updatedPostInfo,
                  location: e.target.value,
                })
              }
            />
          </p>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
}

export default SinglePost;
