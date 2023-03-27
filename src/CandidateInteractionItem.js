import React from "react";

const CandidateInteractionItem = ({ interaction }) => {
  return (
    <tr>
      <td>{interaction.interactionType}</td>
      <td>{interaction.content}</td>
      <td>{new Date(interaction.lastInteractionDate).toLocaleDateString()}</td>
      <td>{interaction.candidateResponded ? "Yes" : "No"}</td>
    </tr>
  );
};

export default CandidateInteractionItem;