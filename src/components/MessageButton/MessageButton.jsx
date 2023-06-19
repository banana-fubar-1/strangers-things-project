import React, { useState } from "react";
import { postMessage } from "../api-adapters";

function MessageButton(props) {
  const [showTextBox, setShowTextBox] = useState(false);
  const [message, setMessage] = useState("");
  const { postInfo, allPosts, setAllPosts } = props;

  const handleClick = () => {
    setShowTextBox(true);
  };

  const handleSendMessage = async () => {
    try {
      const response = await postMessage(postInfo._id, message);
      const updatedPost = {
        ...postInfo,
        messages: [...postInfo.messages, response],
      };
      const updatedPosts = allPosts.map((post) =>
        post._id === postInfo._id ? updatedPost : post
      );
      setAllPosts(updatedPosts);
      setShowTextBox(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  if (showTextBox) {
    return (
      <div>
        <input type="text" value={message} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    );
  }

  return <button onClick={handleClick}>Message</button>;
}

export default MessageButton;