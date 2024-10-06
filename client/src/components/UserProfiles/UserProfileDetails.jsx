import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import {
  getUsersById,
  toggleUserIsActive,
} from "../../managers/userProfileManager";
import "./UserProfile.css";

export const UserProfileDetails = ({ loggedInUser }) => {
  const [userProfile, setUserProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUsersById(id).then(setUserProfile);
  }, [id]);
  const isAdmin =
    Array.isArray(userProfile.roles) && userProfile.roles.includes("Admin");
  const userType = isAdmin ? "Administrator" : "Member";
  const isActive = userProfile.isActive;
  const isUserAdmin =
    Array.isArray(loggedInUser.roles) && loggedInUser.roles.includes("Admin");
  const isSelf = loggedInUser.id === userProfile.id;
  const toggleModal = () => setModalOpen(!modalOpen);

  const handleToggleStatus = async () => {
    try {
      if (isAdmin && isActive) {
        alert("Unable to deactivate admins. You must demote admins before deactivating them.");
        return;
      }
      await toggleUserIsActive(id);

      const updatedProfile = await getUsersById(id);
      setUserProfile(updatedProfile);
      toggleModal();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleReportUser = () => {
    navigate("/reports/create", {
      state: {
        reportSubjectId: userProfile.id,
        reportSubjectName: userProfile.userName,
      },
    });
  };

  if (!userProfile) {
    return null;
  }

  return (
    <>
      <Card className="transparent-card">
        <h2>{userProfile.userName}</h2>
        <div className="right-align">
          <Button onClick={handleReportUser}>Report User</Button>
        </div>
        <Card className="main-card">
          <CardBody>
            <CardHeader>
              Name: <b>{userProfile?.fullName}</b>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem>
                Address: <b>{userProfile.address}</b>
              </ListGroupItem>
              <ListGroupItem>
                Member Since:{" "}
                <b>
                  {new Date(userProfile.createDateTime).toLocaleDateString()}
                </b>
              </ListGroupItem>
              <ListGroupItem>
                Email: <b>{userProfile.email}</b>
              </ListGroupItem>
              <ListGroupItem>
                User Type: <b>{userType}</b>
              </ListGroupItem>
              <ListGroupItem>
                Status:
                {isUserAdmin && !isSelf ? (
                  <>
                    <Button
                      color={isActive ? "success" : "danger"}
                      onClick={toggleModal}
                    >
                      {isActive ? "Active" : "Deactivated"}
                    </Button>
                    <Modal isOpen={modalOpen} toggle={toggleModal}>
                      <ModalHeader toggle={toggleModal}>
                        Confirm Status Change
                      </ModalHeader>
                      <ModalBody>
                        Are you sure you want to{" "}
                        {isActive ? "deactivate" : "activate"} this user?
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={handleToggleStatus}>
                          Yes
                        </Button>{" "}
                        <Button color="secondary" onClick={toggleModal}>
                          No
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </>
                ) : (
                  <b> {isActive ? "Active" : "Deactivated"}</b>
                )}
              </ListGroupItem>
              <ListGroupItem>
                <b>List of Exhibits</b>:
                <ul className="centered-list">
                  {userProfile.exhibits?.map((exhibit) => (
                    <li key={exhibit.id}>
                      <Link to={`/exhibits/${exhibit.id}`}>{exhibit.name}</Link>
                    </li>
                  ))}
                </ul>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Card>
    </>
  );
};
