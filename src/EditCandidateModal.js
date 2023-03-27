import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditCandidateModal({
  showModal,
  toggleModal,
  onFormSubmit,
  selectedCandidate,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("SOURCED");

  useEffect(() => {
    setFullName(selectedCandidate.fullName || "");
    setEmail(selectedCandidate.email || "");
    setPhoneNumber(selectedCandidate.phoneNumber || "");
    setStatus(selectedCandidate.status || "SOURCED");
  }, [selectedCandidate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({
      id: selectedCandidate.id,
      fullName,
      email,
      phoneNumber,
      status,
    });
    toggleModal();
  };

  return (
    <>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="applicationStatus">
              <Form.Label>Application Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="SOURCED">SOURCED</option>
                <option value="INTERVIEWING">INTERVIEWING</option>
                <option value="OFFER_SENT">OFFER_SENT</option>
                <option value="HIRED">HIRED</option>
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditCandidateModal;
