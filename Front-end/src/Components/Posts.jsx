/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../Modules/Posts.module.css";
import PostCard from "./PostCard";
import Loader from "./Loader"; // Import the Loader component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const authResponse = await fetch(
          "https://backend-intellihome-api.onrender.com/api/blogs/members-token-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "just authenticating and getting token",
            }),
            credentials: "include",
          }
        );

        if (authResponse.ok) {
          const postsResponse = await fetch(
            "https://backend-intellihome-api.onrender.com/api/blogs/posts",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          if (postsResponse.status === 401) {
            toast.error("You are Unauthorized!!! Kindly SignIn or Register", {
              position: "top-right",
            });
            setTimeout(() => {
              window.location.href = "/sign-in";
            }, 3000);
          } else {
            const data = await postsResponse.json();
            if (Array.isArray(data)) {
              setPosts(data);
            } else {
              toast.error("Fetched data is not an array", {
                position: "top-right",
              });
            }
          }
        } else {
          const errorData = await authResponse.json();
          toast.error(errorData.msg, {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("Error fetching posts", {
          position: "top-right",
        });
      }
      setLoading(false); // Set loading to false when fetching is done
    };

    fetchData();
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postTitle === "" || postText === "" || selectedFiles.length === 0) {
      toast.error("Every field is required", {
        position: "top-right",
      });
      return;
    }

    try {
      const base64 = await convertToBase64(selectedFiles[0]);
      const post = {
        file: base64,
        title: postTitle,
        text: postText,
      };

      const authResponse = await fetch(
        "https://backend-intellihome-api.onrender.com/api/blogs/members-token-verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "just authenticating and getting token",
          }),
          credentials: "include",
        }
      );

      if (authResponse.ok) {
        const postResponse = await fetch(
          "https://backend-intellihome-api.onrender.com/api/blogs/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(post),
          }
        );

        if (postResponse.ok) {
          toast.success("Your Post has been posted", {
            position: "top-right",
          });
          // const updatedResponse = await fetch(
          //   "https://backend-intellihome-api.onrender.com/api/blogs/posts",
          //   {
          //     method: "GET",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     credentials: "include",
          //   }
          // );
          // const data = await updatedResponse.json();
          // if (Array.isArray(data)) {
          //   setPosts(data);
          // } else {
          //   toast.error("Error fetching the updated posts", {
          //     position: "top-right",
          //   });
          // }
          setPosts((posts) => [...posts, post]);
        } else {
          const errorData = await postResponse.json();
          toast.error(errorData.msg, {
            position: "top-right",
          });
        }
      } else {
        const errorData = await authResponse.json();
        toast.error(errorData.msg, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error adding post", {
        position: "top-right",
      });
    }

    setPostTitle("");
    setPostText("");
    setSelectedFiles([]);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://backend-intellihome-api.onrender.com/api/blogs/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Post deleted successfully", {
          position: "top-right",
        });
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error deleting post", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.postiii}>
      <div className="container text-center">
        <blockquote className="blockquote">
          <p className="mb-0 blog-h1">
            {
              "The bond that links your true family is not one of blood, but of respect and joy in each other's life. - Richard Bach"
            }
          </p>
        </blockquote>
        <Button
          style={{ background: "#01B965", border: "none" }}
          onClick={() => setShowModal(true)}
        >
          Save Your Memories
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Post Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Post Text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleFileInputChange}
            accept=".jpeg, .png, .jpg"
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Post
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container marketing" style={{ marginTop: "20px" }}>
        {loading ? (
          <Loader /> // Show loader when loading is true
        ) : Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              head={post.title}
              body={post.text}
              image={post.file}
              id={post._id}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
