import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Alert, Card } from "react-bootstrap";

function DocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/documents");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!newDocument) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("document", newDocument);
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setUploadError("User ID not found. Please log in.");
      return;
    }
    formData.append("user_id", userId);

    try {
      const response = await fetch("http://127.0.0.1:3000/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error uploading document:", errorResponse);
        throw new Error("Failed to upload document");
      }

      const savedDocument = await response.json();
      setDocuments((prevDocuments) => [...prevDocuments, savedDocument]);
      setNewDocument(null);
      setUploadError("");
    } catch (error) {
      setUploadError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this document?")) {
      try {
        const response = await fetch(`http://127.0.0.1:3000/documents/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete document");
        }

        setDocuments((prevDocuments) =>
          prevDocuments.filter((document) => document.id !== id)
        );
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const isImageFile = (filename) => {
    if (!filename) return false;
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = filename.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  const isPdfFile = (filename) => {
    if (!filename) return false;
    return filename.endsWith(".pdf");
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Documents</h1>
      <Form onSubmit={handleUpload} className="mb-4">
        <Form.Group controlId="formFile">
          <Form.Label>Upload Document</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png, .gif"
            onChange={(e) => setNewDocument(e.target.files[0])}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Upload Document</Button>
        {uploadError && <Alert variant="danger" className="mt-3">{uploadError}</Alert>}
      </Form>

      <Row>
        {documents.map((document) => {
          const completeFilePath = `http://127.0.0.1:3000${document.file_path}`;
          return (
            <Col md={4} key={document.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>User ID: {document.user_id}</Card.Title>
                  <Card.Text>File Path: {completeFilePath}</Card.Text>
                  {isImageFile(document.file_path) ? (
                    <img
                      src={completeFilePath}
                      alt="Uploaded document"
                      className="img-fluid mb-3"
                    />
                  ) : isPdfFile(document.file_path) ? (
                    <iframe
                      src={completeFilePath}
                      width="100%"
                      height="300"
                      title="Uploaded PDF"
                      style={{ border: "none" }}
                    />
                  ) : (
                    <p>File type not supported for preview.</p>
                  )}
                  <Button variant="danger" onClick={() => handleDelete(document.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default DocumentPage;
