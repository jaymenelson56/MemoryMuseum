import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteItem, getItem } from "../../managers/itemManager";
import { Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle } from "reactstrap";

export const ItemDetails = ({ loggedInUser }) => {
    const [item, setItem] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItem(id).then(setItem);
    }, [id])

    if (!item) {
        return null
    }

    const handleEdit = () => {
        navigate(`/item/edit/${id}`);
    };

    const handleDelete = async (ItemId) => {
        if (window.confirm("Are you sure you want to delete this item")) {
            try {
                const exhibitGo = item.exhibit.id
                await deleteItem(ItemId);
                navigate(`/exhibits/${exhibitGo}`);
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    }


    return (
        <>
            <h2>{item.name}</h2>
            {loggedInUser.id === item.exhibit?.userProfileId && (
            <div>
                <Button onClick={handleEdit}>Edit Item</Button>
                <Button color="danger" onClick={() => handleDelete(item.id)}>Delete Item</Button>
            </div>
            )}
            <Card>
                <CardBody>
                    <CardImg src={item.image} alt={item.name} />
                    <CardTitle><b>In museum since: </b>{new Date(item.datePublished).toLocaleDateString()}</CardTitle>
                    <CardTitle><b>Original Owner: </b>{item.userProfile?.userName}</CardTitle>
                    <CardTitle><b>Location: </b>{item.exhibit?.name}</CardTitle>
                    <CardText>{item.placard}</CardText>
                    <CardFooter><Link to={`/exhibits/${item.exhibit?.id}`}>
                        Back to Exhibit
                    </Link></CardFooter>
                </CardBody>
            </Card>
        </>
    )
}

//In a Card, Details include Image, Name, Placard, DatePublished, Exhibit Hall, and original owner.

//A return button takes you back to exhibit