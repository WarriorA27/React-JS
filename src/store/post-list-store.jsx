import { useCallback, useEffect } from "react";
import { createContext, useReducer } from "react";
import { useState } from "react";

const DEFAULT_CONTEXT = {
  postlist: [],
  addpost: () => {},
  deletepost: () => {},
};

export const PostList = createContext(DEFAULT_CONTEXT);

const postListReducer = (currPostList, action) => {
  console.log(action);
  console.log(currPostList);
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_Initial_POST") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostlistProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    []
    //DEFAULT_POST_LIST
  );
  const [fetching, setFetching] = useState(false);

  const addpost = (post) => {
    console.log("add post called", post);
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };
  const addInitialpost = (posts) => {
    dispatchPostList({
      type: "ADD_Initial_POST",
      payload: {
        posts,
      },
    });
  };
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialpost(data.posts);
        setFetching(false);
      });
  }, []);

  const deletepost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: { postId },
      });
    },
    [dispatchPostList]
  );

  return (
    <PostList.Provider value={{ postList, fetching, addpost, deletepost }}>
      {children}
    </PostList.Provider>
  );
};
//const DEFAULT_POST_LIST = [
//  {
//    id: "1",
//    title: "GOING TO MUMBAI",
//    body: "Hey friends , I am going to mumbai . see you there.",
//    reactions: 2,
//    userID: "user-9",
//    tags: ["vacation", "Mumbai", "Enjoying"],
//  },
//  {
//    id: "2",
//    title: "New Art ",
//    body: "Just made a new Art Lets see you there.",
//    reactions: 200,
//    userID: "user-12",
//    tags: ["Art", "Sketchbook", "Handpainting"],
//  },
//];

export default PostlistProvider;
