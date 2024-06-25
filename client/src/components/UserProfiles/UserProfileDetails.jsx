import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, ListGroup, ListGroupItem, Table } from "reactstrap"
import { getUsersById } from "../../managers/userProfileManager";
import "./UserProfile.css";

export const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getUsersById(id).then(setUserProfile);
    }, [id]);

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
                            <ListGroupItem>Name: <b>{userProfile?.fullName}</b></ListGroupItem>
                            <ListGroupItem>Address: <b>{userProfile.address}</b></ListGroupItem>
                            <ListGroupItem>Member Since: <b>{new Date(userProfile.createDateTime).toLocaleDateString()}</b></ListGroupItem>
                            <ListGroupItem>Email: <b>{userProfile.email}</b></ListGroupItem>
                        </ListGroup>
                    </CardBody>
                    <Card className="exhibits-card">
                        <CardBody>
                            <CardTitle><b>{userProfile.firstName}'s Exhibits</b></CardTitle>
                            <ul>
                                {userProfile.exhibits?.map((exhibit) => (
                                    <li key={exhibit.id}><Link to={`/exhibits/${exhibit.id}`}>{exhibit.name}</Link></li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </Card>
            </Card>
        </>
    );
};