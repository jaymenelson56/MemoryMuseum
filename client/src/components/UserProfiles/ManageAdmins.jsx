import { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { getUsersWithRoles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export const ManageAdmins = ({ loggedInUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersWithRoles().then(setUsers);
  });

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
            {users.map((u) => (
              <tr key={u.id}>
                <th scope="row"><Link to={`/userprofiles/${u.id}`}>{u.userName}</Link></th>
                <td>admin/member</td>
                <td>promote/demote</td>
                <td>promote/demote/pending</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};
