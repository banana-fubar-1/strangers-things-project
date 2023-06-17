const COHORT_NAME = "2304-FTB-ET-WEB-FT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    const result = await response.json();
    console.log(result);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const grabAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const translatedData = await response.json();
    return translatedData.data.posts;
  } catch (error) {
    console.log(error);
  }
};

export const postNewPost = async (title, description, price, willDeliver) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          willDeliver: willDeliver,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const postMessage = async (id, message) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message: {
          content: message,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async (postId, updatedPostInfo) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        body: {
          title: updatedPostInfo.title,
          description: updatedPostInfo.description,
          price: updatedPostInfo.price,
          willDeliver: updatedPostInfo.willDeliver,
        },
      },
    });
    const translatedData = response.json();
    return translatedData;
  } catch (error) {
    console.log(error);
  }
};

// export const grabSinglePost = async (postId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/posts`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch posts");
//     }
//     const translatedData = await response.json();
//     console.log(translatedData);
//     const filteredData = translatedData.data.posts.filter(
//       (post) => post._id === postId
//     );
//     console.log(filteredData[0]);
//     if (filteredData.length === 0) {
//       throw new Error("Post not found");
//     }
//     return filteredData[0];
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const grabSinglePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const translatedData = await response.json();
    let post = await translatedData.data.posts.filter(
      (p) => p._id === postId
    )[0];

    return post;
  } catch (error) {
    console.log(error);
  }
};
