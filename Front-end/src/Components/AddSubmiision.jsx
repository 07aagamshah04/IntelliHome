/**
 * We have to fetch file of user stored in different section using AWS or google services
 * On deleting we have delete that file from AWS and also uppdate it's count
 * Save changes button should save file to respective section and also update files on server
 */
import { useState, useRef } from "react";
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

const AddSubmiision = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [folderName, setFolderName] = useState("AADHAR CARD");
  // const [currFolderName, setCurrFolderName] = useState("");
  const [droppedFiles, setDroppedFiles] = useState([]);
  // const [files, setFiles] = useState([]);
  const [aadhar, setAadhar] = useState([]);
  const [pan, setPan] = useState([]);
  const [license, setLicense] = useState([]);
  const [voterid, setVoterId] = useState([]);
  const [marksheet, SetMarksheet] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const[toggleState] = useState(1);
  const inputFile = useRef(null);

  /* TIME PASS CODE
  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);

    // Filter out image and PDF files
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');

    setFiles(prevFiles => [...prevFiles, ...imageFiles, ...pdfFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleItemClick = async (file) => {
    try {
        const response = await fetch(file.url);
        if (!response.ok) {
            throw new Error('Failed to fetch file');
        }
        
        const blob = await response.blob();
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
        } else {
            console.error('Unsupported file type:', file.type);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);

    // Filter out image and PDF files
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');

    setFiles(prevFiles => [...prevFiles, ...imageFiles, ...pdfFiles]);
  };
  for drag and drop
    <div
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      style={{ width: '100%', height: '100vh', border: '2px dashed #aaa', textAlign: 'center' }}
    >
      <h1>Drag & Drop Image or PDF files here</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => handleItemClick(file)} style={{ cursor: 'pointer' }}>{file.name}</li>
        ))}
      </ul>
    </div>
    */

  //Functions for POP-OP
  const handleFolderSubmit = (e) => {
    e.preventDefault();
    if (
      folderName === "Folder Name" ||
      !["AADHAR CARD", "PAN CARD", "LICENSE", "MARKSHEET", "VOTER ID"].includes(
        folderName
      )
    ) {
      setErrorMessage("PLEASE ENTER A VALID FOLDER NAME!!");
    } else {
      // console.log(folderName);
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
    // console.log(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageURL = reader.result;
        const newWindow = window.open();
        newWindow.document.write(
          `<img src="${imageURL}" alt="${file.name}" />`
        );
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfURL = reader.result;
        const newWindow = window.open();
        newWindow.document.write(
          `<embed src="${pdfURL}" type="application/pdf" width="100%" height="100%" />`
        );
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFilees = Array.from(e.dataTransfer.files);

    const totalFiles = droppedFilees.length + droppedFiles.length;
    if (totalFiles > 5) {
      alert("Cannot have more than 5 files in one folder");
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
  const handelSaveChanges = (e) => {
    e.preventDefault();
    if (
      folderName === "Folder Name" ||
      !["AADHAR CARD", "PAN CARD", "LICENSE", "MARKSHEET", "VOTER ID"].includes(
        folderName
      )
    ) {
      alert("Kindly Enter The Folder Name!!");
    } else {
      if (folderName === "AADHAR CARD") {
        if (droppedFiles.length + aadhar.length > 5) {
          alert("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER");
        } else {
          // Filter out image and PDF files
          const imageFiles = droppedFiles.filter((file) =>
            file.type.startsWith("image/")
          );
          const pdfFiles = droppedFiles.filter(
            (file) => file.type === "application/pdf"
          );
          // console.log(imageFiles);
          setAadhar([...aadhar, ...imageFiles, ...pdfFiles]);
        }
      } else if (folderName === "PAN CARD") {
        if (droppedFiles.length + aadhar.length > 5) {
          alert("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER");
        } else {
          const imageFiles = droppedFiles.filter((file) =>
            file.type.startsWith("image/")
          );
          const pdfFiles = droppedFiles.filter(
            (file) => file.type === "application/pdf"
          );
          setPan([...pan, ...imageFiles, ...pdfFiles]);
        }
      } else if (folderName === "LICENSE") {
        if (droppedFiles.length + license.length > 5) {
          alert("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER");
        } else {
          const imageFiles = droppedFiles.filter((file) =>
            file.type.startsWith("image/")
          );
          const pdfFiles = droppedFiles.filter(
            (file) => file.type === "application/pdf"
          );
          setLicense([...license, ...imageFiles, ...pdfFiles]);
        }
      } else if (folderName === "VOTER ID") {
        if (droppedFiles.length + voterid.length > 5) {
          alert("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER");
        } else {
          const imageFiles = droppedFiles.filter((file) =>
            file.type.startsWith("image/")
          );
          const pdfFiles = droppedFiles.filter(
            (file) => file.type === "application/pdf"
          );
          setVoterId([...voterid, ...imageFiles, ...pdfFiles]);
        }
      } else {
        if (droppedFiles.length + marksheet.length > 5) {
          alert("CANNOT HAVE MORE THAN 5 FILES IN ONE FOLDER");
        } else {
          const imageFiles = droppedFiles.filter((file) =>
            file.type.startsWith("image/")
          );
          const pdfFiles = droppedFiles.filter(
            (file) => file.type === "application/pdf"
          );
          SetMarksheet([...marksheet, ...imageFiles, ...pdfFiles]);
        }
      }
      setDroppedFiles([]);
      setFolderName("Folder Name");
      setIsHovered(false);
    }
  };

  //Functions for delete any file from tab section
  const handleDeleteAadhar = (index) => {
    setAadhar(aadhar.filter((_, i) => i !== index));
  };
  const handleDeletePan = (index) => {
    setPan(pan.filter((_, i) => i !== index));
  };
  const handleDeleteVoterId = (index) => {
    setVoterId(voterid.filter((_, i) => i !== index));
  };
  const handleDeleteLicense = (index) => {
    setLicense(license.filter((_, i) => i !== index));
  };
  const handleDeleteMarksheet = (index) => {
    SetMarksheet(marksheet.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        style={{ margin: "6rem", border: "1px solid #ccc", padding: "20px" }}
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
                {aadhar.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      color: "grey",
                    }}
                  >
                    <CiFolderOn style={{ cursor: "pointer" }} />
                    <span
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => handleItemClick(file)}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{ marginRight: "10px" }}
                    >{`${file.size}B`}</span>
                    <BsTrash
                      onClick={() => handleDeleteAadhar(index)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <a href={URL.createObjectURL(file)} download>
                      <BsDownload style={{ cursor: "pointer" }} />
                    </a>
                  </div>
                ))}
                {aadhar.length === 0 && (
                  <p
                    style={{
                      fontSize: "1.5em",
                      color: "grey",
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
                {pan.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      color: "grey",
                    }}
                  >
                    <CiFolderOn style={{ cursor: "pointer" }} />
                    <span
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => handleItemClick(file)}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{ marginRight: "10px" }}
                    >{`${file.size}B`}</span>
                    <BsTrash
                      onClick={() => handleDeletePan(index)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                  </div>
                ))}
                {pan.length === 0 && (
                  <p style={{ fontSize: "1.5em", color: "grey" }}>
                    No Content...
                  </p>
                )}
              </Tab>
              <Tab
                eventKey="tab-3"
                title="LICENSE"
                style={{ border: "2px solid whitesmoke" }}
              >
                {license.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      color: "grey",
                    }}
                  >
                    <CiFolderOn style={{ cursor: "pointer" }} />
                    <span
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => handleItemClick(file)}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{ marginRight: "10px" }}
                    >{`${file.size}B`}</span>
                    <BsTrash
                      onClick={() => handleDeleteLicense(index)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                  </div>
                ))}
                {license.length === 0 && (
                  <p style={{ fontSize: "1.5em", color: "grey" }}>
                    No Content...
                  </p>
                )}
              </Tab>
              <Tab
                eventKey="tab-4"
                title="VOTER ID"
                style={{ border: "2px solid whitesmoke" }}
              >
                {voterid.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      color: "grey",
                    }}
                  >
                    <CiFolderOn style={{ cursor: "pointer" }} />
                    <span
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => handleItemClick(file)}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{ marginRight: "10px" }}
                    >{`${file.size}B`}</span>
                    <BsTrash
                      onClick={() => handleDeleteVoterId(index)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                  </div>
                ))}
                {voterid.length === 0 && (
                  <p style={{ fontSize: "1.5em", color: "grey" }}>
                    No Content...
                  </p>
                )}
              </Tab>
              <Tab
                eventKey="tab-5"
                title="MARKSHEET"
                style={{ border: "2px solid whitesmoke" }}
              >
                {marksheet.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      color: "grey",
                    }}
                  >
                    <CiFolderOn style={{ cursor: "pointer" }} />
                    <span
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => handleItemClick(file)}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{ marginRight: "10px" }}
                    >{`${file.size}B`}</span>
                    <BsTrash
                      onClick={() => handleDeleteMarksheet(index)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                  </div>
                ))}
                {marksheet.length === 0 && (
                  <p style={{ fontSize: "1.5em", color: "grey" }}>
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
          // background: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "70%",
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
              color: "#0D6EFD",
            }}
          >
            Add Document
          </p>
        </div>
        {isHovered && (
          <Row
            style={{
              width: "70%",
              marginBottom: "10px",
              marginLeft: "0",
              marginRight: "0",
            }}
          >
            <Col style={{ paddingLeft: "50px" }}>
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
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
              width: "70%",
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
                      <CiFolderOn size={24} style={{ borderRadius: "10px" }} />
                    </div>
                    <p
                      style={{
                        height: "70%",
                        width: "10%",
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
  );
};

export default AddSubmiision;
