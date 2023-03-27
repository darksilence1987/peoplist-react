function CandidateTable(props) {
  return (
    <>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </>
  );
}

export default CandidateTable;
