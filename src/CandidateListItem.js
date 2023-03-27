
import "./CandidateListItem.css";

function CandidateListItem({
  candidate,
  onCandidateEdit,
  onCandidateDelete,
  onCandidateDetails,
}) {
  const handleDetailsClick = () => {
    onCandidateDetails(candidate);
  };

  return (
    <>
      
      <tr className="candidate-list-item">
        <td>{candidate.id}</td>
        <td>{candidate.fullName}</td>
        <td>{candidate.email}</td>
        <td>{candidate.phoneNumber}</td>
        <td>
          <button
            className="btn btn-secondary"
            onClick={() => handleDetailsClick(candidate)}
          >
            Details
          </button>
        </td>
        <td>
          <button
            className="btn btn-success"
            onClick={() =>
              onCandidateEdit(candidate)
            }
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => onCandidateDelete(candidate.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
export default CandidateListItem;
