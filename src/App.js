import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateListItem from "./CandidateListItem";
import CandidateTable from "./CandidateTable";
import PageHeader from "./PageHeader";
import EditCandidateModal from './EditCandidateModal';
import CandidateDetailsModal from './CandidateDetailsModal'

export const endpoint = "http://localhost:8080/api/v1";

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [filterStatus, setFilterStatus] = useState("ALL");

  
  const handleStatusFilterChange = (status) => {
    setFilterStatus(status);
  };
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const toggleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    toggleEditModal();
  };

  const handleCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    toggleDetailsModal();
  };

  const handleEditFormSubmit = async (updatedCandidate) => {
    try {
      await axios.put(endpoint + "/candidate/" + updatedCandidate.id, updatedCandidate);
      await getCandidates();
    } catch (error) {
      console.error('Error while updating candidate:', error);
    }
  };

  const handleNewCandidate = async (formData) => {
    try {
      const response = await axios.post(endpoint + "/candidate", formData);
      const newCandidate = await response.data.data;
      setCandidates([...candidates, newCandidate]);
    } catch (error) {
      console.error("Error while saving new candidate:", error);
    }
  };
  const handleDeleteCandidate = async (id) => {
    await axios.delete(endpoint + "/candidate/" + id);
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };


  const getCandidates = async () => {
    let status = filterStatus === "ALL" ? "" : "/status/" + filterStatus;
    let result = await axios.get(endpoint + "/candidate" + status);
    await setCandidates(result.data.data);
  };

  useEffect(() => {
    const fetchData = () => {
      getCandidates();
    };

    fetchData();
  }, [filterStatus]);

  return (
    <div className="app container">
      <EditCandidateModal
        showModal={showEditModal}
        toggleModal={toggleEditModal}
        onFormSubmit={handleEditFormSubmit}
        selectedCandidate={selectedCandidate}
      />
      <CandidateDetailsModal
        showModal={showDetailsModal}
        toggleModal={toggleDetailsModal}
        candidate={selectedCandidate}
      />
      <PageHeader onCreateNewCandidate={handleNewCandidate}
        onStatusFilterChange={handleStatusFilterChange} />
      <CandidateTable onEditCandidate={handleEditCandidate}>
        {candidates.map((candidate) => (
          <CandidateListItem
            key={candidate.id}
            candidate={candidate}
            onCandidateDelete={handleDeleteCandidate}
            onCandidateEdit={handleEditCandidate}
            onCandidateDetails={() => handleCandidateDetails(candidate)}
          />
        ))}
      </CandidateTable>
    </div>
  );
};

export default App;
