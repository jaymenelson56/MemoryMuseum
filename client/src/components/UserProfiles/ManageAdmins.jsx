import { Card, Table } from "reactstrap";

export const ManageAdmins = () => {
  return (
  <>
<Card className="transparent-card">
  <h2>User List</h2>
  <Table>
    <thead>
      <tr>
        <th>Username</th>
        <th>User Type</th>
        <th>Action</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">name</th>
        <td>admin/member</td>
        <td>promote/demote</td>
        <td>promote/demote/pending</td>
      </tr>
    </tbody>
  </Table>
</Card>
  </>
  );
};
