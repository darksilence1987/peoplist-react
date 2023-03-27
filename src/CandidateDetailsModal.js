import { React, useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { endpoint } from "./App";
import AddInteractionModal from "./AddInteractionModal";
import CandidateInteractionsTable from "./CandidateInteractionsTable";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const CandidateDetailsModal = ({ showModal, toggleModal, candidate }) => {
  const [interactions, setInteractions] = useState([]);
  const [showAddInteractionModal, setShowAddInteractionModal] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState(null);

  const handleEditInteraction = (interaction) => {
    setSelectedInteraction(interaction);
    toggleAddInteractionModal();
    fetchInteractions(candidate.id);
  };

  const handleDeleteInteraction = async (candidateId, interactionId) => {
    try {
      await axios.delete(
        `${endpoint}/candidate/${candidateId}/candidate-interaction/${interactionId}`
      );
      fetchInteractions(candidateId);
    } catch (error) {
      console.error("Error while deleting interaction:", error);
    }
  };
  const handleInteractionFormSubmit = async (interactionData) => {
    if (selectedInteraction) {
      try {
        await axios.put(
          `${endpoint}/candidate/${candidate.id}/candidate-interaction/${selectedInteraction.id}`,
          interactionData
        );
        setSelectedInteraction(null);
        fetchInteractions(candidate.id);
      } catch (error) {
        console.error("Error while updating interaction:", error);
      }
    } else {
      try {
        await axios.post(
          `${endpoint}/candidate/${candidate.id}/candidate-interaction`,
          interactionData
        );
        fetchInteractions(candidate.id);
      } catch (error) {
        console.error("Error while adding interaction:", error);
      }
    }
    toggleAddInteractionModal();
  };

  const toggleAddInteractionModal = () => {
    setShowAddInteractionModal(!showAddInteractionModal);
    toggleModal();
  };

  const fetchInteractions = async (candidateId) => {
    try {
      const response = await axios.get(
        `${endpoint}/candidate/${candidateId}/candidate-interaction`
      );

      setInteractions(response.data.data);
      
    } catch (error) {
      console.error("Error fetching candidate interactions:", error);
    }
  };

  useEffect(() => {
    if (candidate.id) {
      fetchInteractions(candidate.id);
    }
  }, [candidate]);


  return (
    <>
      <AddInteractionModal
        showModal={showAddInteractionModal}
        toggleModal={toggleAddInteractionModal}
        onFormSubmit={handleInteractionFormSubmit}
        candidateId={candidate.id}
        interaction={selectedInteraction}
        style={customStyles}
      />
      <Modal
        isOpen={showModal}
        style={customStyles}
        onRequestClose={toggleModal}
        contentLabel="Candidate Details Modal"
      >
        <h2>Candidate Details</h2>
        <hr />
        <div>
          <label>
            <strong>Name:</strong>
          </label>{" "}
          {candidate.fullName}
        </div>
        <div>
          <label>
            <strong>Email:</strong>
          </label>{" "}
          {candidate.email}
        </div>
        <div>
          <label>
            <strong>Phone:</strong>
          </label>{" "}
          {candidate.phoneNumber}
        </div>
        <div>
          <label>
            <strong>Status:</strong>
          </label>{" "}
          {candidate.status}
        </div>
        <div>
          <button onClick={toggleAddInteractionModal}>Add Interaction</button>
        </div>
        <CandidateInteractionsTable
          interactions={interactions}
          candidate={candidate}
          handleEditInteraction={handleEditInteraction}
          handleDeleteInteraction={handleDeleteInteraction}
        />

        <button onClick={toggleModal}>Close</button>
      </Modal>
    </>
  );
};

export default CandidateDetailsModal;
