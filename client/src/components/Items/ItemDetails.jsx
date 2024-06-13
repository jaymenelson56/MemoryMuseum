import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getItem } from "../../managers/itemManager";
import { Card, CardBody, CardFooter, CardImg, CardText, CardTitle } from "reactstrap";

export const ItemDetails = (loggedInUser) => {
    const [item, setItem] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItem(id).then(setItem);
    }, [id])

    if (!item) {
        return null
    }


    return (
        <>
        <h2>{item.name}</h2>
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