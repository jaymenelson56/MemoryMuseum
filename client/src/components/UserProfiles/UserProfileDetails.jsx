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
  Table,
} from "reactstrap";
import { getUsersById, toggleUserIsActive } from "../../managers/userProfileManager";
import "./UserProfile.css";

export const UserProfileDetails = ({ loggedInUser }) => {
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUsersById(id).then(setUserProfile);
  }, [id]);
  const isAdmin =
    Array.isArray(userProfile.roles) && userProfile.roles.includes("Admin");
  const userType = isAdmin ? "Administrator" : "Member";
  const isActive = userProfile.isActive;
  const isUserAdmin =
    Array.isArray(loggedInUser.roles) && loggedInUser.roles.includes("Admin");

  const handleToggleStatus = async () => {
    try {
      await toggleUserIsActive(id);
      // Reload user profile after status change
      const updatedProfile = await getUsersById(id);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <>
      <Card className="transparent-card">
        <h2>{userProfile.userName}'s Profile</h2>
        <Card className="main-card">
          <CardBody>
            <CardHeader>{userProfile.userName}</CardHeader>

            <ListGroup flush>
              <ListGroupItem>
                Name: <b>{userProfile?.fullName}</b>
              </ListGroupItem>
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
                {isUserAdmin ? (
                  <Button
                    color={isActive ? "success" : "danger"}
                    onClick={handleToggleStatus}
                  >
                    {isActive ? "Active" : "Deactivated"}
                  </Button>
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
