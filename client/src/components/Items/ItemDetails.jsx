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
            <Card className="transparent-card">
                <h2>{item.name}</h2>
                {loggedInUser.id === item.exhibit?.userProfileId && (
                    <div className="right-align">
                        <Button color="info" onClick={handleEdit} style={{ marginRight: '10px' }}>Edit Item</Button>
                        <Button color="danger" onClick={() => handleDelete(item.id)}>Delete Item</Button>
                    </div>
                )}

                <CardBody className="card-content">
                    <CardImg src={item.image} alt={item.name} style={{
                        width: '30rem'
                    }} />
                    <CardTitle><b>In museum since: </b>{new Date(item.datePublished).toLocaleDateString()}</CardTitle>
                    <CardTitle><b>Original Owner: </b><Link to={`/userprofiles/${item.userProfileId}`}>{item.userProfile?.userName}</Link></CardTitle> 
                    <CardTitle><b>Location: </b>{item.exhibit?.name}</CardTitle>
                    <Card className="placard-text" style={{
                        width: '30rem'
                    }}>{item.placard}</Card>
                    <CardFooter><Link to={`/exhibits/${item.exhibit?.id}`}>
                        Back to Exhibit
                    </Link></CardFooter>
                </CardBody>
            </Card>
        </>
    )
}

