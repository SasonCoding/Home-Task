import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [postBody, setPostBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const effectRan = useRef(false); //Using this hook to prevent our useEffect from calling the api twice because of the strict mode.

  useEffect(() => {
    if (effectRan.current === false) {
      const handleUsers = async () => {
        try {
          setIsLoading(true);
          const postsResponse = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
          );
          const [...postsData] = postsResponse?.data;
          setPosts(postsData);
          setIsLoading(false);
          localStorage.setItem('postsData', postsData);
        } catch (error) {
          console.log(error?.response?.data);
        }
      };
      handleUsers();

      return () => {
        effectRan.current = true;
      }; //Clean up.
    }
  }, []);

  return (
    <div>
      <u>
        <h2>Posts: </h2>
      </u>
      <br></br>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        posts.slice(0, 10).map((post, postKey) => {
          return (
            <h2
              key={postKey}
              onClick={() => {
                setPostBody(post.body);
              }}
            >
              {post.title}
            </h2>
          );
        })
      )}
      <br></br>
      <u>
        <h2>Post Body:</h2>
      </u>
      <b>{postBody}</b>
    </div>
  );
};

export default Blogs;
