import { myData } from "../api-adapters";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile({ myUsername, allPosts }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await myData();
      setProfileData(result.data);
    };

    fetchData();
  }, []);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  const activePosts = profileData.posts.filter((post) => post.active);
  const filteredMessages = profileData.messages.filter(
    (message) => message.fromUser.username === myUsername
  );

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        My Profile
      </h2>
      <p className="pb-5">You are logged in as {profileData.username}</p>
      <div className="flex justify-center">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Posts
          </h2>
          {activePosts.length === 0 ? (
            <p>You have no active posts</p>
          ) : (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {activePosts.map((post) => (
                <div key={post._id}>
                  <Link to={`/posts/${post._id}`}>Title: {post.title}</Link>
                  <p>Message Count: {post.messages.length}</p>
                  {post.messages.map((message) => (
                    <div key={message._id} className="message-container">
                      <p>{message.content}</p>
                      <p className="message-username">
                        {message.fromUser.username}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div>
            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white pt-5">
              My Messages
            </h2>
            {filteredMessages.map((message) => {
              const matchingPost = allPosts.find(
                (post) => post._id === message.post._id
              );
              if (matchingPost && matchingPost.active) {
                return (
                  <div
                    key={message._id}
                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Link to={`/posts/${message.post._id}`}>
                      Post Title: {message.post.title}
                    </Link>
                    <p>Sent: {message.content}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
