/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/AllPosts/AllPosts.jsx",
    "./src/components/DeleteButton/DeleteButton.jsx",
    "./src/components/Login/Login.jsx",
    "./src/components/MessageButton/MessageButton.jsx",
    "./src/components/NavBar/NavBar.jsx",
    "./src/components/NewPostForm/NewPostForm.jsx",
    "./src/components/Profile/Profile.jsx",
    "./src/components/Register/Register.jsx",
    "./src/components/SinglePost/SinglePost.jsx",
    "./src/components/App.jsx",
    "./src/Main.jsx",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        yinminBlue: "#415A77",
        silverlakeblue: "#778DA9",
        oxfordblue: "#1B263B",
        platinum: "#E0E1DD",
      },
    },
  },
  plugins: [],
};
