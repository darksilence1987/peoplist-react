import React from "react";

const CandidateInteractionsTable = ({
  interactions,
  candidate,
  handleEditInteraction,
  handleDeleteInteraction,
}) => {
  return (
    <table className="table table-hover text-center">
      <thead>
        <tr>
          <th>Interaction Type</th>
          <th>Content</th>
          <th>Last Interaction Date</th>
          <th>Is Candidate Responded</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {interactions.map((interaction) => (
          <tr key={interaction.id}>
            <td>{interaction.interactionType}</td>
            <td>{interaction.content}</td>
            <td>{new Date(interaction.updatedDate).toLocaleTimeString()
            +" "+ new Date(interaction.updatedDate).toLocaleDateString()}</td>
            <td>{interaction.candidateResponded ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => {
                handleEditInteraction(interaction);
                }}>
                Edit
              </button>
            </td>
            <td>
              <button onClick={() => {
                handleDeleteInteraction(candidate.id, interaction.id);
                }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateInteractionsTable;
