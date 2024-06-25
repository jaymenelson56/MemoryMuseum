import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, ListGroup, ListGroupItem, Table } from "reactstrap"
import { getUsersById } from "../../managers/userProfileManager";
import "./UserProfile.css";

export const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getUsersById(id).then(setUserProfile)
    }, [id])

    if (!userProfile) {
        return null
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
                            <ListGroupItem>Address: <b>{userProfile?.address}</b></ListGroupItem>
                            <ListGroupItem>Member Since: <b>{new Date(userProfile?.createDateTime).toLocaleDateString()}</b></ListGroupItem>
                            <ListGroupItem>Email: <b>{userProfile?.email}</b></ListGroupItem>
                        </ListGroup>
                    </CardBody>
                    <Card className="exhibits-card">
                        <CardTitle><b>{userProfile.firstName}'s exhibits</b></CardTitle>
                        {userProfile.exhibits.map((exhibit) => (
                            <ul><li key={exhibit.id}>{exhibit.name}</li></ul>
                        ))}</Card>
                </Card>
            </Card>
        </>
    )
}