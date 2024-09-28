import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  CardImg,
  CardHeader,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  approveItem,
  changeExhibit,
  deleteItem,
  getNotApprovedItems,
  getPendingItems,
  getRejectedItems,
  rejectItem,
} from "../../managers/itemManager";
import { Link } from "react-router-dom";
import { getExhibits } from "../../managers/exhibitManager";

export const StorageRoom = ({ loggedInUser }) => {
  const [pendingItems, setPendingItems] = useState([]);
  const [rejectedItems, setRejectedItems] = useState([]);
  const [notApprovedItems, setNotApprovedItems] = useState([]);
  const [exhibits, setExhibits] = useState([]);
  const [exhibitId, setExhibitId] = useState("0");

  useEffect(() => {
    getPendingItems(loggedInUser.id).then(setPendingItems);
    getRejectedItems(loggedInUser.id).then(setRejectedItems);
    getNotApprovedItems(loggedInUser.id).then(setNotApprovedItems);
    getExhibits().then(setExhibits);
  }, [loggedInUser]);

  const handleApprove = async (id) => {
    await approveItem(id);
    setPendingItems(pendingItems.filter((item) => item.id !== id));
  };

  const handleReject = async (id) => {
    await rejectItem(id);
    setPendingItems(pendingItems.filter((item) => item.id !== id));
    setRejectedItems(await getRejectedItems(loggedInUser.id));
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setRejectedItems(rejectedItems.filter((item) => item.id !== id));
    setNotApprovedItems(notApprovedItems.filter((item) => item.id !== id));
  };

  const handleChangeExhibit = async (itemId) => {
    try {
      await changeExhibit(itemId, exhibitId, loggedInUser.id);
      // Optionally refresh the rejected items after changing the exhibit
      setRejectedItems(await getRejectedItems(loggedInUser.id));
      setNotApprovedItems(await getNotApprovedItems(loggedInUser.id));
      // Reset exhibitId after the operation
      setExhibitId("0");
    } catch (error) {
      console.error("Failed to change exhibit:", error);
    }
  };

  return (
    <>
      <Card>
        <h2>Incoming Items</h2>
        {pendingItems.length === 0 ? (
          <CardBody>
            <CardText>No incoming items at this time.</CardText>
          </CardBody>
        ) : (
          pendingItems.map((item) => (
            <Card key={item.id}>
              <CardBody>
                <CardHeader>Item: {item.name}</CardHeader>
                <CardImg
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "18rem",
                  }}
                />
                <CardTitle>For Exhibit: {item.exhibit.name}</CardTitle>
                <CardTitle>
                  Original Owner:{" "}
                  <Link to={`/userprofiles/${item.userProfileId}`}>
                    {item.userProfile.userName}
                  </Link>
                </CardTitle>
                <CardText>Description: {item.placard}</CardText>
                <CardFooter>
                  <Button
                    color="success"
                    onClick={() => handleApprove(item.id)}
                  >
                    Approve
                  </Button>
                  <Button color="danger" onClick={() => handleReject(item.id)}>
                    Reject
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          ))
        )}
      </Card>
      <Card>
        <h2>Outgoing Items</h2>
        {notApprovedItems.length === 0 ? (
          <CardBody>
            <CardText>No outgoing items at this time.</CardText>
          </CardBody>
        ) : (
          notApprovedItems.map((item) => (
            <Card key={item.id}>
              <CardBody>
                <CardHeader>Item: {item.name}</CardHeader>
                <CardImg
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "18rem",
                  }}
                />
                <CardTitle>For Exhibit: {item.exhibit.name}</CardTitle>
                <CardText>
                  Status:{" "}
                  {item.needsApproval ? (
                    "Pending"
                  ) : (
                    <>
                      Rejected by{" "}
                      <Link to={`/userprofiles/${item.exhibit.userProfileId}`}>
                        {item.exhibit.userProfile.userName}
                      </Link>
                    </>
                  )}
                </CardText>
                <CardText>Description: {item.placard}</CardText>
                <CardFooter>
                  <Button color="danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          ))
        )}
      </Card>
      <Card>
        <h2>Rejected Items</h2>
        {rejectedItems.length === 0 ? (
          <CardBody>
            <CardText>No Rejected items at this time.</CardText>
          </CardBody>
        ) : (
          rejectedItems.map((item) => (
            <Card key={item.id}>
              <CardBody>
                <CardHeader>Item: {item.name}</CardHeader>
                <CardImg
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "18rem",
                  }}
                />
                <CardTitle>For Exhibit: {item.exhibit.name}</CardTitle>
                <CardText>
                  Status:{" "}
                  {item.needsApproval ? (
                    "Pending"
                  ) : (
                    <>
                      Rejected by{" "}
                      <Link to={`/userprofiles/${item.exhibit.userProfileId}`}>
                        {item.exhibit.userProfile.userName}
                      </Link>
                    </>
                  )}
                </CardText>
                <CardText>Description: {item.placard}</CardText>
                <FormGroup>
                  <Label htmlFor="exhibit">Exhibit</Label>
                  <Input
                    type="select"
                    id="exhibit"
                    value={exhibitId}
                    onChange={(e) => {
                      setExhibitId(parseInt(e.target.value));
                    }}
                  >
                    <option value={0}>Send to another Exhibit</option>
                    {exhibits.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <CardFooter>
                  <Button
                    color="primary"
                    onClick={() => handleChangeExhibit(item.id)}
                    disabled={exhibitId === "0"}
                  >
                    Change Exhibit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          ))
        )}
      </Card>
    </>
  );
};
