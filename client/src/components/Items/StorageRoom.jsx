import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardText, CardTitle, CardImg, CardHeader, Button } from "reactstrap";
import { approveItem, deleteItem, getPendingItems, getRejectedItems, rejectItem } from "../../managers/itemManager";

export const StorageRoom = ({ loggedInUser }) => {
    const [pendingItems, setPendingItems] = useState([]);
    const [rejectedItems, setRejectedItems] = useState([]);

    useEffect(() => {
        getPendingItems(loggedInUser.id).then(setPendingItems);
        getRejectedItems(loggedInUser.id).then(setRejectedItems);
    }, [loggedInUser]);

    const handleApprove = async (id) => {
        await approveItem(id);
        setPendingItems(pendingItems.filter(item => item.id !== id));
    };

    const handleReject = async (id) => {
        await rejectItem(id);
        setPendingItems(pendingItems.filter(item => item.id !== id));
        setRejectedItems(await getRejectedItems(loggedInUser.id));
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        setRejectedItems(rejectedItems.filter(item => item.id !== id));
    };

    return (
        <>
            <Card>
                <h2>Items Pending Approval</h2>
                {pendingItems.length === 0 ? (
                    <CardBody>
                        <CardText>No Items requiring approval at this time.</CardText>
                    </CardBody>
                ) : (
                    pendingItems.map((item) => (
                        <Card key={item.id}>
                            <CardBody>
                                <CardHeader>Item: {item.name}</CardHeader>
                                <CardImg src={item.image} alt={item.name} />
                                <CardTitle>For Exhibit: {item.exhibit.name}</CardTitle>
                                <CardTitle>Original Owner: {item.userProfile.userName}</CardTitle>
                                <CardText>Description: {item.placard}</CardText>
                                <CardFooter>
                                    <Button color="success" onClick={() => handleApprove(item.id)}>Approve</Button>
                                    <Button color="danger" onClick={() => handleReject(item.id)}>Reject</Button></CardFooter>
                            </CardBody>
                        </Card>
                    ))
                )}
            </Card>
            <Card>
                <h2>Rejected Items</h2>
                {rejectedItems.length === 0 ? (
                    <CardBody>
                        <CardText>No rejected items at this time.</CardText>
                    </CardBody>
                ) : (
                    rejectedItems.map((item) => (
                        <Card key={item.id}>
                            <CardBody>
                                <CardHeader>Item: {item.name}</CardHeader>
                                <CardImg src={item.image} alt={item.name} />
                                <CardTitle>For Exhibit: {item.exhibit.name}</CardTitle>
                                <CardTitle>Rejected By: {item.exhibit.userProfile.userName}</CardTitle>
                                <CardText>Description: {item.placard}</CardText>
                                <CardFooter>
                                    <Button color="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    ))
                )}
            </Card>
        </>
    );
};