import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {
  const { addpost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    /*userIdElement.current.value = "";
    postBodyElement.current.value = "";
    postTitleElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";*/

    console.log("Sending Post to server");
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        userId: userId,
        body: postBody,
        reactions: reactions,
        tags: tags,

        /* other post data */
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        console.log("Got response from server", post);
        addpost(post); //resObj is post
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter Your User Id
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="Your User Id"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="title"
          placeholder="Tell us more about it"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>

      <div className="mb-3">
        <label htmlFor="action" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="people reacted"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>

      <div className="mb-3">
        <label htmlFor="action" className="form-label">
          Tags
        </label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="Enter tags"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
