/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../Modules/Posts.module.css";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      urls.push(url);
    }
    setImageUrls(urls);
  };

  const handleSubmit = () => {
    if (postTitle === "" || postText === "" || imageUrls[0] === undefined) {
      setErrorMessage("*Every field is required");
    } else {
      const post = {
        title: postTitle,
        text: postText,
        image: imageUrls[0],
      };
      setPosts([...posts, post]);

      setPostTitle("");
      setPostText("");
      setImageUrls([]);
      setShowModal(false);
    }
  };

  const handleDelete = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.postiii}>
      <div className="container  text-center">
        <blockquote className="blockquote">
          <p className="mb-0 blog-h1">
            "Family is not an important thing. It's everything."
          </p>
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
            multiple
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
        {posts.map((post, index) => (
          <article key={index} className={styles["article-wrapper"]}>
            <figure>
              <img src={post.image} alt="" />
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
                  onClick={() => handleDelete(index)}
                />
              </div>
              <p>{post.text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Posts;
