import React, { useState } from "react";
import CreateNewCandidateModal from "./CreateNewCandidateModal";

function PageHeader({ onCreateNewCandidate: saveNewCandidate, onStatusFilterChange }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleStatusChange = (e) => {
    onStatusFilterChange(e.target.value);
  };
  return (
    <div className="row">
      <CreateNewCandidateModal
        showModal={showModal}
        toggleModal={toggleModal}
        onFormSubmit={saveNewCandidate}
      />
      <div className="col-md-8">
        <h1 style={{ textAlign: "center" }}>Peoplist</h1>
      </div>
      <div className="col-md-2">
        <select style={{ margin: "10px" }} className="form-select" onChange={handleStatusChange}>
          <option value="ALL">All</option>
          <option value="SOURCED">Sourced</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER_SENT">Offer Sent</option>
          <option value="HIRED">Hired</option>
        </select>
      </div>
      <div className="col-md-2">
        <button
          style={{ margin: "10px" }}
          onClick={toggleModal}
          className="btn btn-primary"
        >
          Add Candidate
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
