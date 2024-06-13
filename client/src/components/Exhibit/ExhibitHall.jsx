import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardLink, CardText, CardTitle } from "reactstrap";
import { deleteExhibit, getExhibit } from "../../managers/exhibitManager";


export const ExhibitHall = ({ loggedInUser }) => {
    const [exhibit, setExhibit] = useState();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getExhibit(id).then(setExhibit);
    }, [id]);

    if (!exhibit) {
        return null
    }

    const handleDelete = async (exhibitId) => {
        if (window.confirm("If you delete the exhibit, all the items within will also be deleted. Are you sure you want to delete the exhibit? ")) {
            try {
                await deleteExhibit(exhibitId);
                navigate("/exhibits");
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    }

    return (
        <>
            <h2>{exhibit.name}</h2>
            {loggedInUser.id === exhibit.userProfileId && (
                <div>
                    <Button color="danger" onClick={() => handleDelete(exhibit.id)}>Delete Exhibit</Button>
                </div>
            )}
            <CardGroup>
                {exhibit.items.map((item) => (
                    <Card key={item.id}>
                        <CardBody>
                            <CardImg src={item.image} alt={item.name} />
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>{item.placard}</CardText>
                            <CardFooter><Link to={`/item/details/${item.id}`}>
                                More Info
                            </Link></CardFooter>
                        </CardBody>
                    </Card>
                ))}
            </CardGroup>
        </>
    );
};


//Edit and Delete button will show up beneath the item if logged in user owns the exhibit

//edit button redirects to a form, while delete will rerender the page after asking if theyre sure they want to delete

//Click on the item to bring up more details such as the original owner and placcard

//Bottom of the page allows user to rate the exhibit, if the user has already rated it they will have a thank you for rating message

//{new Date(item.datePublished).toLocaleDateString()}