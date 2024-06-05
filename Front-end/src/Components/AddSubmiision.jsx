/* eslint-disable no-unused-vars */
/**
 * We have to fetch file of user stored in different section using AWS or google services
 * On deleting we have delete that file from AWS and also uppdate it's count
 * Save changes button should save file to respective section and also update files on server
 */
import { useState, useRef, useEffect } from "react";
import { BsChevronDown, BsChevronRight, BsDownload } from "react-icons/bs";
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Tabs,
  Tab,
  Container,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { CiFolderOn } from "react-icons/ci";
import { TbCircleArrowDownFilled } from "react-icons/tb";
import "../Modules/AddSubmiision.module.css";
import { toast } from "react-toastify";
import Loader from "./Loader";

const AddSubmiision = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [folderName, setFolderName] = useState("AADHAR CARD");
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [aadhar, setAadhar] = useState([]);
  const [pan, setPan] = useState([]);
  const [license, setLicense] = useState([]);
  const [voterid, setVoterId] = useState([]);
  const [marksheet, SetMarksheet] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputFile = useRef(null);
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = {
          message: "just verifying it.",
        };
        const response = await fetch(
          "http://localhost:8000/api/users/members-token-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
        if (!response.ok) {
          toast.error("Unauthorized Access", {
            position: toast.position,
          });
          return;
        }
        const aadharResponse = await fetch(
          "http://localhost:8000/api/users/aadhar",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!aadharResponse.ok) {
          if (aadharResponse.status == 401) {
            toast.error("You are Unauthorized!!! Kindly SignIn or Register", {
              position: toast.position,
            });
            setTimeout(() => {
              window.location.href = "/sign-in";
            }, 3000);
            return;
          } else {
            toast.error("Error fetching Aadhar data", {
              position: toast.position,
            });
            return;
          }
        }

        const aadharData = await aadharResponse.json();

        setAadhar(aadharData);

        const panResponse = await fetch("http://localhost:8000/api/users/pan", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!panResponse.ok) {
          toast.error("Error fetching pan data", {
            position: toast.position,
          });
          return;
        }

        const panData = await panResponse.json();

        setPan(panData);

        const voterIdResponse = await fetch(
          "http://localhost:8000/api/users/voterid",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!voterIdResponse.ok) {
          toast.error("Error fetching voterid data", {
            position: toast.position,
          });
          return;
        }

        const voteridData = await voterIdResponse.json();

        setVoterId(voteridData);

        const markSheetResponse = await fetch(
          "http://localhost:8000/api/users/marksheet",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!markSheetResponse.ok) {
          toast.error("Error fetching marksheet data", {
            position: toast.position,
          });
          return;
        }

        const marksheetData = await markSheetResponse.json();

        SetMarksheet(marksheetData);

        const licenseResponse = await fetch(
          "http://localhost:8000/api/users/license",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!licenseResponse.ok) {
          toast.error("Error fetching license data", {
            position: toast.position,
          });
          return;
        }

        const licenseData = await licenseResponse.json();

        setLicense(licenseData);
      } catch (err) {
        toast.error("Error fetching license data", {
          position: toast.position,
        });
        return;
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  //Functions for POP-OP
  const handleFolderSubmit = (e) => {
    e.preventDefault();
    if (
      folderName === "Folder Name" ||
      !["AADHAR CARD", "PAN CARD", "LICENSE", "MARKSHEET", "VOTER ID"].includes(
        folderName
      )
    ) {
      toast.error("PLEASE ENTER A VALID FOLDER NAME!!", {
        position: toast.position,
      });
      return;
    } else {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFolderName("Folder Name");
    setErrorMessage("");
  };

  //Functions for Drag-Drop API
  const handleDragStart = () => {
    setDragging(true);
  };
  const handleDragEnd = () => {
    setDragging(false);
  };
  const onFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setDroppedFiles([...droppedFiles, ...selectedFiles]);
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };
  const handleItemClick = (file) => {
    // Convert the base64 string back to a Blob
    const base64ToBlob = (base64, contentType) => {
      const byteCharacters = atob(base64);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    };

    // Extract the base64 string from the file data
    const base64String = file.file; // Directly use the file data

    // Check if the base64String is valid
    if (!base64String) {
      console.error("Invalid Base64 string");
      return;
    }

    // Determine the content type
    const contentType = file.type;

    // Convert the Base64 string to a Blob
    let blob;
    try {
      blob = base64ToBlob(base64String, contentType);
    } catch (error) {
      console.error("Failed to convert Base64 string to Blob:", error);
      return;
    }

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the file in a new window
    const newWindow = window.open();
    if (file.type.startsWith("image/")) {
      newWindow.document.write(`<img src="${url}" alt="${file.filename}" />`);
    } else if (file.type === "application/pdf") {
      newWindow.document.write(
        `<embed src="${url}" type="application/pdf" width="100%" height="100%" />`
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFilees = Array.from(e.dataTransfer.files);

    const totalFiles = droppedFilees.length + droppedFiles.length;
    if (totalFiles > 5) {
      toast.error("Cannot have more than 5 files in one folder", {
        position: toast.position,
      });
      return;
    }

    const imageFiles = droppedFilees.filter((file) =>
      file.type.startsWith("image/")
    );
    const pdfFiles = droppedFilees.filter(
      (file) => file.type === "application/pdf"
    );

    setDroppedFiles((prevFiles) => [...prevFiles, ...imageFiles, ...pdfFiles]);
  };

  //it is used to store the data in Base64 format
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        // Extract base64 data from the result
        const base64Data = fileReader.result.split(",")[1];
        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handelSaveChanges = async (e) => {
    e.preventDefault();
    if (
      folderName === "Folder Name" ||
      !["AADHAR CARD", "PAN CARD", "LICENSE", "MARKSHEET", "VOTER ID"].includes(
        folderName
      )
    ) {
      toast.error("Kindly Enter The Folder Name!!", {
        position: toast.position,
      });
      return;
    } else {
      if (folderName === "AADHAR CARD") {
        if (droppedFiles.length + aadhar.length > 5) {
          toast.error("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER", {
            position: toast.position,
          });
        } else {
          try {
            const fileDataArray = await Promise.all(
              droppedFiles.map(async (file) => {
                const base64Data = await convertToBase64(file);
                return {
                  file: base64Data,
                  filename: file.name,
                  type: file.type,
                  size: file.size,
                };
              })
            );

            const requestData = {
              folderName: "AADHAR CARD",
              files: fileDataArray,
            };

            const response = await fetch(
              "http://localhost:8000/api/users/intellivault",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
                credentials: "include",
              }
            );
            if (!response.ok) {
              toast.error("Network response was not ok", {
                position: toast.position,
              });
            }
            const responseData = await response.json();
            toast.success("File added successfully", {
              position: toast.position,
            });
          } catch (error) {
            toast.error("Error storing files in the database!!", {
              position: toast.position,
            });
          }
        }
      } else if (folderName === "PAN CARD") {
        if (droppedFiles.length + pan.length > 5) {
          toast.error("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER", {
            position: toast.position,
          });
        } else {
          try {
            const fileDataArray = await Promise.all(
              droppedFiles.map(async (file) => {
                const base64Data = await convertToBase64(file);
                return {
                  file: base64Data,
                  filename: file.name,
                  type: file.type,
                  size: file.size,
                };
              })
            );

            const requestData = {
              folderName: "PAN CARD",
              files: fileDataArray,
            };

            const response = await fetch(
              "http://localhost:8000/api/users/intellivault",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
                credentials: "include",
              }
            );
            if (!response.ok) {
              toast.error("Network response was not ok", {
                position: toast.position,
              });
            }
            const responseData = await response.json();
            toast.success("File added", {
              position: toast.position,
            });
            return;
          } catch (error) {
            toast.error("Error storing files in the database", {
              position: toast.position,
            });
            return;
          }
        }
      } else if (folderName === "LICENSE") {
        if (droppedFiles.length + license.length > 5) {
          toast.error("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER", {
            position: toast.position,
          });
        } else {
          try {
            const fileDataArray = await Promise.all(
              droppedFiles.map(async (file) => {
                const base64Data = await convertToBase64(file);
                return {
                  file: base64Data,
                  filename: file.name,
                  type: file.type,
                  size: file.size,
                };
              })
            );

            const requestData = {
              folderName: "LICENSE",
              files: fileDataArray,
            };

            const response = await fetch(
              "http://localhost:8000/api/users/intellivault",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
                credentials: "include",
              }
            );
            if (!response.ok) {
              toast.error("Network response was not ok", {
                position: toast.position,
              });
            }
            const responseData = await response.json();
            toast.success("Data added", {
              position: toast.position,
            });
          } catch (error) {
            toast.error("Error storing files in the database", {
              position: toast.position,
            });
          }
        }
      } else if (folderName === "VOTER ID") {
        if (droppedFiles.length + voterid.length > 5) {
          toast.error("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER", {
            position: toast.position,
          });
        } else {
          try {
            const fileDataArray = await Promise.all(
              droppedFiles.map(async (file) => {
                const base64Data = await convertToBase64(file);
                return {
                  file: base64Data,
                  filename: file.name,
                  type: file.type,
                  size: file.size,
                };
              })
            );

            const requestData = {
              folderName: "VOTER ID",
              files: fileDataArray,
            };

            const response = await fetch(
              "http://localhost:8000/api/users/intellivault",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
                credentials: "include",
              }
            );
            if (!response.ok) {
              toast.error("Network response was not ok", {
                position: toast.position,
              });
            }
            const responseData = await response.json();
            toast.success("Data Added", {
              position: toast.position,
            });
          } catch (error) {
            toast.error("Error storing files in the database", {
              position: toast.position,
            });
          }
        }
      } else {
        if (droppedFiles.length + marksheet.length > 5) {
          toast.error("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER", {
            position: toast.position,
          });
        } else {
          try {
            const fileDataArray = await Promise.all(
              droppedFiles.map(async (file) => {
                const base64Data = await convertToBase64(file);
                return {
                  file: base64Data,
                  filename: file.name,
                  type: file.type,
                  size: file.size,
                };
              })
            );

            const requestData = {
              folderName: "MARKSHEET",
              files: fileDataArray,
            };

            const response = await fetch(
              "http://localhost:8000/api/users/intellivault",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
                credentials: "include",
              }
            );
            if (!response.ok) {
              toast.error("Network response was not ok", {
                position: toast.position,
              });
            }
            const responseData = await response.json();
            toast.success("Data Added", {
              position: toast.position,
            });
          } catch (error) {
            toast.error("Error storing files in the database", {
              position: toast.position,
            });
          }
        }
      }
      setDroppedFiles([]);
      setFolderName("Folder Name");
      setIsHovered(false);
    }
  };

  //Functions for delete any file from tab section
  const handleDeleteAadhar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/aadhar/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Data deleted successfully", {
          position: toast.position,
        });
        setAadhar(aadhar.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error in deleting post", {
        position: toast.position,
      });
    }
  };
  const handleDeletePan = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/pan/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Data deleted successfully", {
          position: toast.position,
        });
        setPan(pan.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error deleting post", {
        position: toast.position,
      });
    }
  };
  const handleDeleteVoterId = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/voterid/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Data deleted successfully", {
          position: toast.position,
        });
        setVoterId(voterid.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error deleting post", {
        position: toast.position,
      });
    }
  };
  const handleDeleteLicense = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/license/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setLicense(license.filter((item) => item._id !== id));
        toast.success("Data deleted successfully", {
          position: toast.position,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error deleting post", {
        position: toast.position,
      });
    }
  };
  const handleDeleteMarksheet = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/marksheet/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        SetMarksheet(marksheet.filter((item) => item._id !== id));
        toast.success("Data deleted successfully", {
          position: toast.position,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error deleting post", {
        position: toast.position,
      });
    }
  };

  const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              margin: "1rem",
              border: "1px solid #ccc",
              padding: "0px",
              marginTop: "2.5rem",
            }}
          >
            <Container className="py-4">
              <Row className="justify-content-center">
                <Tabs
                  justify
                  variant="pills"
                  defaultActiveKey="tab-1"
                  className="mb-1 p-0"
                >
                  <Tab
                    eventKey="tab-1"
                    title="AADHAR CARD"
                    style={{ border: "2px solid whitesmoke" }}
                  >
                    {aadhar.length !== 0 &&
                      aadhar.map((file, index) => {
                        const blob = base64ToBlob(file.file, file.type);
                        const url = URL.createObjectURL(blob);

                        return (
                          <div
                            key={file._id}
                            className="document-section"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              marginLeft: "10px",
                              marginTop: "5px",
                              color: "grey",
                            }}
                          >
                            <CiFolderOn
                              className="document-folder-icon"
                              title="file"
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <span
                              title="Click to open file"
                              style={{
                                flex: 1,
                                width: "20%",
                                overflow: "hidden",
                                // overflowX:"scroll",
                                cursor: "pointer",
                              }}
                              onClick={() => handleItemClick(file)}
                            >
                              {file.filename}
                            </span>
                            <span
                              className="document-file-size"
                              title="file size in KB"
                              style={{ marginRight: "10px" }}
                            >{`${file.size}B`}</span>
                            <BsTrash
                              className="document-trash-icon"
                              title="Delete"
                              onClick={() => handleDeleteAadhar(file._id)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <a href={url} download={file.filename}>
                              <BsDownload
                                className="document-delete-icon"
                                title="Download"
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                            </a>
                          </div>
                        );
                      })}
                    {aadhar.length === 0 && (
                      <p
                        style={{
                          fontSize: "1.5em",
                          color: "grey",
                          marginLeft: "10px",
                          marginTop: "5px",
                        }}
                      >
                        No Content...
                      </p>
                    )}
                  </Tab>
                  <Tab
                    eventKey="tab-2"
                    title="PAN CARD"
                    style={{ border: "2px solid whitesmoke" }}
                  >
                    {pan.length !== 0 &&
                      pan.map((file, index) => {
                        const blob = base64ToBlob(file.file, file.type);
                        const url = URL.createObjectURL(blob);

                        return (
                          <div
                            key={file._id}
                            className="document-section"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              marginLeft: "10px",
                              marginTop: "5px",
                              color: "grey",
                            }}
                          >
                            <CiFolderOn
                              className="document-folder-icon"
                              title="file"
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <span
                              title="Click to open file"
                              style={{
                                flex: 1,
                                cursor: "pointer",
                                width: "20%",
                                overflow: "hidden",
                              }}
                              onClick={() => handleItemClick(file)}
                            >
                              {file.filename}
                            </span>
                            <span
                              className="document-file-size"
                              title="file size in KB"
                              style={{ marginRight: "10px" }}
                            >{`${file.size}B`}</span>
                            <BsTrash
                              className="document-trash-icon"
                              title="Delete"
                              onClick={() => handleDeletePan(file._id)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <a href={url} download={file.filename}>
                              <BsDownload
                                className="document-delete-icon"
                                title="Download"
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                            </a>
                          </div>
                        );
                      })}
                    {pan.length === 0 && (
                      <p
                        style={{
                          fontSize: "1.5em",
                          color: "grey",
                          marginLeft: "10px",
                          marginTop: "5px",
                        }}
                      >
                        No Content...
                      </p>
                    )}
                  </Tab>

                  <Tab
                    eventKey="tab-3"
                    title="LICENSE"
                    style={{ border: "2px solid whitesmoke" }}
                  >
                    {license.length !== 0 &&
                      license.map((file, index) => {
                        const blob = base64ToBlob(file.file, file.type);
                        const url = URL.createObjectURL(blob);

                        return (
                          <div
                            key={file._id}
                            className="document-section"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              marginLeft: "10px",
                              marginTop: "5px",
                              color: "grey",
                            }}
                          >
                            <CiFolderOn
                              className="document-folder-icon"
                              title="file"
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <span
                              title="Click to open file"
                              style={{
                                flex: 1,
                                cursor: "pointer",
                                width: "20%",
                                overflow: "hidden",
                              }}
                              onClick={() => handleItemClick(file)}
                            >
                              {file.filename}
                            </span>
                            <span
                              className="document-file-size"
                              title="file size in KB"
                              style={{ marginRight: "10px" }}
                            >{`${file.size}B`}</span>
                            <BsTrash
                              className="document-trash-icon"
                              title="Delete"
                              onClick={() => handleDeleteLicense(file._id)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <a href={url} download={file.filename}>
                              <BsDownload
                                className="document-delete-icon"
                                title="Download"
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                            </a>
                          </div>
                        );
                      })}
                    {license.length === 0 && (
                      <p
                        style={{
                          fontSize: "1.5em",
                          color: "grey",
                          marginLeft: "10px",
                          marginTop: "5px",
                        }}
                      >
                        No Content...
                      </p>
                    )}
                  </Tab>

                  <Tab
                    eventKey="tab-4"
                    title="VOTER ID"
                    style={{ border: "2px solid whitesmoke" }}
                  >
                    {voterid.length !== 0 &&
                      voterid.map((file, index) => {
                        const blob = base64ToBlob(file.file, file.type);
                        const url = URL.createObjectURL(blob);

                        return (
                          <div
                            key={file._id}
                            className="document-section"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              marginLeft: "10px",
                              marginTop: "5px",
                              color: "grey",
                            }}
                          >
                            <CiFolderOn
                              className="document-folder-icon"
                              title="file"
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <span
                              title="Click to open file"
                              style={{
                                flex: 1,
                                cursor: "pointer",
                                width: "20%",
                                overflow: "hidden",
                              }}
                              onClick={() => handleItemClick(file)}
                            >
                              {file.filename}
                            </span>
                            <span
                              className="document-file-size"
                              title="file size in KB"
                              style={{ marginRight: "10px" }}
                            >{`${file.size}B`}</span>
                            <BsTrash
                              className="document-trash-icon"
                              title="Delete"
                              onClick={() => handleDeleteVoterId(file._id)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <a href={url} download={file.filename}>
                              <BsDownload
                                className="document-delete-icon"
                                title="Download"
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                            </a>
                          </div>
                        );
                      })}
                    {voterid.length === 0 && (
                      <p
                        style={{
                          fontSize: "1.5em",
                          color: "grey",
                          marginLeft: "10px",
                          marginTop: "5px",
                        }}
                      >
                        No Content...
                      </p>
                    )}
                  </Tab>

                  <Tab
                    eventKey="tab-5"
                    title="MARKSHEET"
                    style={{ border: "2px solid whitesmoke" }}
                  >
                    {marksheet.length !== 0 &&
                      marksheet.map((file, index) => {
                        const blob = base64ToBlob(file.file, file.type);
                        const url = URL.createObjectURL(blob);

                        return (
                          <div
                            key={file._id}
                            className="document-section"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              marginLeft: "10px",
                              marginTop: "5px",
                              color: "grey",
                            }}
                          >
                            <CiFolderOn
                              className="document-folder-icon"
                              title="file"
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <span
                              title="Click to open file"
                              style={{
                                flex: 1,
                                cursor: "pointer",
                                width: "20%",
                                overflow: "hidden",
                              }}
                              onClick={() => handleItemClick(file)}
                            >
                              {file.filename}
                            </span>
                            <span
                              className="document-file-size"
                              title="file size in KB"
                              style={{ marginRight: "10px" }}
                            >{`${file.size}B`}</span>
                            <BsTrash
                              className="document-trash-icon"
                              title="Delete"
                              onClick={() => handleDeleteMarksheet(file._id)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <a href={url} download={file.filename}>
                              <BsDownload
                                className="document-delete-icon"
                                title="Download"
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                            </a>
                          </div>
                        );
                      })}
                    {marksheet.length === 0 && (
                      <p
                        style={{
                          fontSize: "1.5em",
                          color: "grey",
                          marginLeft: "10px",
                          marginTop: "5px",
                        }}
                      >
                        No Content...
                      </p>
                    )}
                  </Tab>
                </Tabs>
              </Row>
            </Container>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
              height: "100vh",
              paddingBottom: "20px",
              marginTop: "40px",
              // background: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "76%",
              }}
            >
              <Button
                variant="primary"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  backgroundColor: isHovered ? "#d9d9d9" : "white",
                  color: "black",
                  border: `2px solid ${isHovered ? "#5e97f6" : "transparent"}`,
                  marginRight: "10px",
                  position: "relative",
                  // background: "black",
                }}
                onClick={() => setIsHovered(!isHovered)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isHovered ? (
                    <BsChevronDown style={{ color: "#333333" }} />
                  ) : (
                    <BsChevronRight style={{ color: "#333333" }} />
                  )}
                </div>
              </Button>
              <p
                style={{
                  fontWeight: "bold",
                  margin: "0",
                  fontSize: "clamp(20px, 4vw, 30px)",
                  // color: "#333",
                  // color: "#0D6EFD",
                }}
              >
                Add Document
              </p>
            </div>
            {isHovered && (
              <Row
                style={{
                  width: "90%",
                  marginBottom: "10px",
                  marginLeft: "0",
                  marginRight: "0",
                  marginTop: "15px",
                }}
              >
                <Col
                  className="file-submission"
                  style={{ paddingLeft: "150px" }}
                >
                  <p style={{ margin: 0 }}>File submissions</p>
                </Col>
                <Col>
                  <p style={{ margin: 0 }}>
                    Maximum files size: 20 MB, maximum files: 5
                  </p>
                </Col>
              </Row>
            )}
            {isHovered && (
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                  <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="folderName">
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter folder name"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                    />
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleFolderSubmit}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {isHovered && (
              <Row
                style={{
                  width: "80%",
                  marginBottom: "10px",
                  marginLeft: "0",
                  marginRight: "0",
                }}
              >
                <Col>
                  <div
                    style={{
                      border: "1px solid #333",
                      padding: "10px",
                      borderRadius: "5px",
                      height: "100%",
                    }}
                  >
                    <Row>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            width: "fit-content",
                            height: "fit-content",
                            padding: "10px",
                            backgroundColor: dragging ? "lightblue" : "grey",
                            cursor: "pointer",
                            borderRadius: "8px",
                            marginRight: "10px",
                          }}
                          draggable
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          onClick={() => {
                            setShowModal(true);
                            0;
                          }}
                        >
                          <CiFolderOn
                            size={24}
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <p
                          style={{
                            height: "70%",
                            width: "50%",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {folderName}
                        </p>
                      </div>
                    </Row>
                    <hr
                      style={{
                        borderTop: "1px solid black",
                        // margin: "10px 0",
                        marginBottom: "20px",
                        width: "100%",
                        marginTop: "2%",
                      }}
                    />
                    <div
                      style={{
                        height: "7rem",
                        border: "1px dotted black",
                        overflowY: "auto",
                        ...(droppedFiles.length === 0
                          ? {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }
                          : {}),
                      }}
                      id="divii"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      {droppedFiles.map((file, index) => (
                        <p key={index}>{file.name}</p>
                      ))}
                      {droppedFiles.length === 0 && (
                        <div>
                          <input
                            type="file"
                            id="file"
                            ref={inputFile}
                            onChange={onFileInputChange}
                            style={{ display: "none" }}
                          />
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <TbCircleArrowDownFilled
                              size={40}
                              onClick={onButtonClick}
                            />
                          </p>
                          <p>Drag and Drop Here.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {isHovered && (
              // <button type="button" className="btn btn-primary">Save Changes</button>
              <button
                type="button"
                className="btn btn-dark save-changes"
                onClick={handelSaveChanges}
              >
                Save Changes
              </button>
            )}
            <hr
              style={{
                borderTop: "2px solid #d3d3d3",
                margin: "10px 0",
                width: "68%",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AddSubmiision;
