import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const AddInteractionModal = ({
    showModal,
    toggleModal,
    onFormSubmit,
    style,
    interaction,
    candidateId
    
  }) => {
    const [interactionType, setInteractionType] = useState(
      interaction ? interaction.interactionType : "EMAIL"
    );
    const [content, setContent] = useState(interaction ? interaction.content : "");
    const [updatedDate, setUpdatedDate] = useState(
      interaction ? interaction.updatedDate : new Date()
    );
    const [candidateResponded, setCandidateResponded] = useState(
      interaction ? interaction.candidateResponded : false
    );
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onFormSubmit({
          interactionType,
          content,
          updatedDate,
          candidateResponded,
          candidateId
        });
      };
      useEffect(() => {
        if (interaction) {
          setInteractionType(interaction.interactionType);
          setContent(interaction.content);
          setUpdatedDate(interaction.updatedDate);
          setCandidateResponded(interaction.candidateResponded);
        } else {
          setInteractionType("EMAIL");
          setContent("");
          setUpdatedDate(new Date());
          setCandidateResponded(false);
        }
      }, [interaction]);

  return (
    <Modal style={style} isOpen={showModal} onRequestClose={toggleModal} contentLabel="Add Interaction Modal">
      <h2>Add Interaction</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Interaction Type:
          <select value={interactionType} onChange={(e) => setInteractionType(e.target.value)}>
            <option value="">Select interaction type</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone</option>
            <option value="MEETING">Meeting</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <label>
          Responded?
          <input
            type="checkbox"
            checked={candidateResponded}
            onChange={(e) => setCandidateResponded(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={toggleModal}>Close</button>
    </Modal>
  );
};

export default AddInteractionModal;
