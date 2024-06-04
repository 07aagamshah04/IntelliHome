import  { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../Modules/Posts.module.css";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await fetch(
          "http://localhost:8000/api/blogs/members-token-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "just authenticating and getting token" }),
            credentials: "include",
          }
        );

        if (authResponse.ok) {
          const postsResponse = await fetch("http://localhost:8000/api/blogs/posts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await postsResponse.json();
          console.log(data);
          if (Array.isArray(data)) {
            setPosts(data);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        } else {
          const errorData = await authResponse.json();
          alert(errorData.msg);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Error fetching the data");
      }
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
      setErrorMessage("*Every field is required");
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
        "http://localhost:8000/api/blogs/members-token-verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "just authenticating and getting token" }),
          credentials: "include",
        }
      );

      if (authResponse.ok) {
        const postResponse = await fetch("http://localhost:8000/api/blogs/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(post),
        });

        if (postResponse.ok) {
          alert("Your Post has been posted");
          const updatedResponse = await fetch("http://localhost:8000/api/blogs/posts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await updatedResponse.json();
          if (Array.isArray(data)) {
            setPosts(data);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        } else {
          const errorData = await postResponse.json();
          alert(errorData.msg);
        }
      } else {
        const errorData = await authResponse.json();
        alert(errorData.msg);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }

    setPostTitle("");
    setPostText("");
    setSelectedFiles([]);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Post deleted successfully");
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        const errorData = await response.json();
        alert(errorData.msg);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className={styles.postiii}>
      <div className="container text-center">
        <blockquote className="blockquote">
          <p className="mb-0 blog-h1">{"Family is not an important thing. It's everything."}</p>
        </blockquote>
        <Button onClick={() => setShowModal(true)}>Save Your Memories</Button>
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

      <section className={styles.articles}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <article key={post._id} className={styles["article-wrapper"]}>
              <figure>
                <img src={post.file} alt={post.title} />
              </figure>
              <div className={styles["article-body"]}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2>{post.title}</h2>
                  <MdDelete
                    size={25}
                    className={styles["delete-icon"]}
                    onClick={() => handleDelete(post._id)}
                  />
                </div>
                <p>{post.text}</p>
              </div>
            </article>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </section>
    </div>
  );
};

export default Posts;
