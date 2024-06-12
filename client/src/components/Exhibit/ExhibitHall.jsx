import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardGroup, CardImg, CardLink, CardText, CardTitle } from "reactstrap";
import { getExhibit } from "../../managers/exhibitManager";

//Header
export const ExhibitHall = () => {
    const [exhibit, setExhibit] = useState();

    const { id } = useParams();

    useEffect(() => {
        getExhibit(id).then(setExhibit);
    }, [id]);

    if(!exhibit) {
        return null
    }

    return (
        <>
            <h2>{exhibit.name}</h2>
            <CardGroup>
                {exhibit.items.map((item) => (
                    <Card key={item.id}>
                        <CardBody>
                            <CardImg src={item.image} alt={item.name} />
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>{item.placard}</CardText>
                            <CardFooter>{new Date(item.datePublished).toLocaleDateString()}</CardFooter>
                        </CardBody>
                    </Card>
                ))}
            </CardGroup>
        </>
    );
};

//Welcome Message

//List Item as cards with image name and DatePublished,

//Edit and Delete button will show up beneath the item if logged in user owns the exhibit

//edit button redirects to a form, while delete will rerender the page after asking if theyre sure they want to delete

//Click on the item to bring up more details such as the original owner and placcard

//Bottom of the page allows user to rate the exhibit, if the user has already rated it they will have a thank you for rating message