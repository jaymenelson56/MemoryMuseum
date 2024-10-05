import { useEffect, useState } from "react";
import { Button, Card, Table } from "reactstrap";
import {
  demoteUser,
  denyUser,
  getUsersWithRoles,
  promoteUser,
  requestUser,
} from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export const ManageAdmins = ({ loggedInUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersWithRoles().then(setUsers);
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  const handleRequest = async (userId, adminApproved, userName, roles) => {
    try {
      let confirmMessage = "";

      if (roles.includes("Admin")) {
        confirmMessage = `Are you sure you want to request demoting ${userName} to regular member?`;
      } else {
        confirmMessage = `Are you sure you want to request promoting ${userName} to admin?`;
      }

      if (userId === loggedInUser.id) {
        alert("Admins cannot demote themselves.");
        return;
      }
      if (adminApproved) {
        alert("There is already a request for this action pending.");
        return;
      }
      if (!window.confirm(confirmMessage)) {
        return;
      }
      await requestUser(userId, loggedInUser.id);
      alert("Request submitted successfully.");
      refresh();
    } catch (error) {
      console.error("Error requesting user:", error);
      alert("Failed to submit request. Please try again later.");
    }
  };
  const approvePromotion = async (userIdNumber, userId) => {
    try {
      await promoteUser(userIdNumber, userId);
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user. Please try again later.");
    }
  };
  const approveDemotion = async (userIdNumber, userId) => {
    try {
      await demoteUser(userIdNumber, userId);
    } catch (error) {
      console.error("Error demoting user:", error);
      alert("Failed to demote user. Please try again later.");
    }
  };

  const handleApproval = async (userIdNumber, userId, userName, roles) => {
    try {
      let confirmMessage = "";

      if (roles.includes("Admin")) {
        confirmMessage = `Are you sure you want to approve demotion of ${userName} from Admin to Member?`;
      } else {
        confirmMessage = `Are you sure you want to approve promotion of ${userName} to Admin?`;
      }

      if (!window.confirm(confirmMessage)) {
        return;
      }

      if (roles.includes("Admin")) {
        await approveDemotion(userIdNumber, userId);
        alert(`${userName} has been demoted successfully.`);
      } else {
        await approvePromotion(userIdNumber, userId);
        alert(`${userName} has been promoted successfully.`);
      }

      refresh();
    } catch (error) {
      console.error("Error Approving user:", error);
      alert("Failed to submit approval. Please try again later.");
    }
  };

  const handleDeny = async (userId) => {
    try {
      await denyUser(userId);
      alert(`it has been denied successfully.`);
      refresh();
    } catch (error) {
      
    }
  };
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
              <th>Final Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <th scope="row">
                  <Link to={`/userprofiles/${u.id}`}>{u.userName}</Link>
                </th>
                <td>{u.roles.includes("Admin") ? "Admin" : "Member"}</td>
                <td>
                  {u.roles.includes("Admin") ? (
                    <Button
                      color="danger"
                      onClick={() =>
                        handleRequest(
                          u.id,
                          u.adminApproved,
                          u.userName,
                          u.roles
                        )
                      }
                    >
                      Demote
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      onClick={() =>
                        handleRequest(
                          u.id,
                          u.adminApproved,
                          u.userName,
                          u.roles
                        )
                      }
                    >
                      Promote
                    </Button>
                  )}
                </td>
                <td>{u.adminApproved ? "Pending" : ""}</td>
                <td>
                  {u.adminApproved && u.adminApprovedId !== loggedInUser.id && u.id !== loggedInUser.id && (
                    <div>
                    <Button
                      color="primary"
                      onClick={() =>
                        handleApproval(
                          u.identityUserId,
                          loggedInUser.id,
                          u.userName,
                          u.roles
                        )
                      }
                    >
                      Approve
                    </Button>
                     
                    <Button
                    color="primary"
                    onClick={() =>
                      handleDeny(u.id)
                    }
                  >
                    Deny
                  </Button>
                  </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};
