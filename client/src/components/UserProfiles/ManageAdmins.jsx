import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    getUsersWithRoles().then(setUsers);
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  const handleRequest = async (userId, adminApproved, userName, roles) => {
    if (userId === loggedInUser.id) {
      showModal("alert", "Administrators cannot demote themselves.");
      return;
    }
    if (adminApproved) {
      showModal("alert", "There is already a request for this action pending.");
      return;
    }

    const confirmMessage = roles.includes("Admin")
      ? `You are about to make a request to demote a user. Another Administrator will have to approve your request. Are you sure you want to request relieving ${userName} of their administrative duties?`
      : `You are about to make a request to promote a user. Another Administrator will have to approve your request. Are you sure you want to request promoting ${userName} to administrator?`;

    setConfirmAction(() => async () => {
      await requestUser(userId, loggedInUser.id);
      showModal("alert", "Request submitted successfully.");
      refresh();
    });
    showModal("confirm", confirmMessage);
  };
  
  const approvePromotion = async (userIdNumber, userId) => {
    try {
      await promoteUser(userIdNumber, userId);
    } catch (error) {
      showModal("alert", "Failed to promote user. Please try again later.");
    }
  };

  const approveDemotion = async (userIdNumber, userId) => {
    try {
      await demoteUser(userIdNumber, userId);
    } catch (error) {
      console.error("Error demoting user:", error);
      showModal("alert", "Failed to demote user. Please try again later.");
    }
  };

  const handleApproval = async (userIdNumber, userId, userName, roles) => {
    const confirmMessage = roles.includes("Admin")
      ? `Are you sure you want to approve relieving ${userName} of their administrative duties?`
      : `Are you sure you want to approve promoting ${userName} to Administrator?`;

    setConfirmAction(() => async () => {
      if (roles.includes("Admin")) {
        await approveDemotion(userIdNumber, userId);
        showModal(
          "alert",
          `${userName} has been relieved of their administrative duties.`
        );
      } else {
        await approvePromotion(userIdNumber, userId);
        showModal("alert", `${userName} has been promoted successfully.`);
      }
      refresh();
    });
    showModal("confirm", confirmMessage);
  };

  const handleDeny = async (userId, roles, userName) => {
    const confirmMessage = roles.includes("Admin")
      ? `Are you sure you want to deny ${userName}'s relief from their administrative duties?`
      : `Are you sure you want to deny ${userName}'s promotion to Administrator?`;

    setConfirmAction(() => async () => {
      await denyUser(userId);
      showModal("alert", `You have denied the request.`);
      refresh();
    });
    showModal("confirm", confirmMessage);
  };
  const showModal = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setConfirmAction(null);
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
                <td>
                  {u.adminApproved ? (
                    u.adminApprovedId !== loggedInUser.id &&
                    u.id !== loggedInUser.id ? (
                      <div>
                        <Button
                          color="primary"
                          onClick={() =>
                            handleApproval(
                              u.identityUserId,
                              u.id,
                              u.userName,
                              u.roles
                            )
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          color="warning"
                          onClick={() => handleDeny(u.id, u.roles, u.userName)}
                        >
                          Deny
                        </Button>
                      </div>
                    ) : (
                      "pending"
                    )
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Modal isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>
          {modalType === "confirm" ? "Confirm Action" : "Notice"}
        </ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          {modalType === "confirm" ? (
            <>
              <Button color="primary" onClick={confirmAction}>
                Yes
              </Button>{" "}
              <Button color="secondary" onClick={closeModal}>
                No
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={closeModal}>
              OK
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};
