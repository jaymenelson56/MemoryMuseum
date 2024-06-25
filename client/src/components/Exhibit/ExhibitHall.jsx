import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardColumns, CardFooter, CardGroup, CardImg, CardLink, CardText, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";
import { NewRating, deleteExhibit, getExhibit } from "../../managers/exhibitManager";
import { getRatings } from "../../managers/ratingManager";
import "./Exhibit.css";


export const ExhibitHall = ({ loggedInUser }) => {
    const [exhibit, setExhibit] = useState();
    const [ratings, setRatings] = useState([])
    const [selectedRating, setSelectedRating] = useState(null);
    const [buttonPressed, setButtonPressed] = useState(false)

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getExhibit(id).then(setExhibit);
        getRatings().then(setRatings)
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

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
    };

    const handleRatingSubmit = async (e) => {
        e.preventDefault();
        const ratingForm = {
            ExhibitId: exhibit.id,
            RatingId: selectedRating,
            userProfileId: loggedInUser.id
        };
        await NewRating(ratingForm)
        setButtonPressed(true)
        getExhibit(id).then(setExhibit);
    }

    return (
        <>
            <Card className="transparent-card">
                <h2>Welcome to {exhibit.name}</h2>

                {loggedInUser.id === exhibit.userProfileId && (
                    <div className="right-align">
                        <Button color="danger" onClick={() => handleDelete(exhibit.id)}>Delete Exhibit</Button>
                    </div>
                )}
            </Card>
            <CardColumns>
                {exhibit.items.map((item) => (
                    <Card key={item.id} className="transparent-card">
                        <CardBody className="card-content">
                            <CardImg src={item.image} alt={item.name} style={{
                                width: '18rem'
                            }} />
                            <CardTitle>{item.name}</CardTitle>
                            <Card body
                                className="text-start my-2" style={{
                                    width: '18rem'
                                }}>{item.placard}</Card>
                            <CardFooter><Link to={`/item/details/${item.id}`}>
                                More Info
                            </Link></CardFooter>
                        </CardBody>
                    </Card>
                ))}
            </CardColumns>

            <footer>
                {loggedInUser.id === exhibit.userProfileId ? (
                    <Card className="transparent-card">
                        <CardBody>
                            <CardTitle>Your Exhibit's Average Rating: {exhibit.exhibitRatings.length > 0
                                ? `${exhibit.averageRating.toFixed(1)} out of 5`
                                : "No ratings"
                            }</CardTitle>
                        </CardBody>
                    </Card>

                ) : (

                    <Card body
                        className="text-start my-2 transparent-card center-flex"

                    >
                        {buttonPressed ? (
                            <CardBody>
                                <CardTitle>Thank you! Your opinion has been recorded.</CardTitle>
                            </CardBody>
                        ) : (
                            <Card style={{
                                width: '18rem'
                            }}>
                                <Form onSubmit={handleRatingSubmit}>
                                    <Label>Rate the exhibit</Label>
                                    <FormGroup>
                                        {ratings.map((r) => (
                                            <FormGroup check key={r.id}>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="rating"
                                                        value={r.id}
                                                        checked={selectedRating === r.id}
                                                        onChange={handleRatingChange}
                                                    />
                                                    {r.ratingName}
                                                </Label>
                                            </FormGroup>
                                        ))}
                                    </FormGroup>
                                    <Button type="submit" color="primary" disabled={!selectedRating}>Submit Rating</Button>
                                </Form>
                            </Card>
                        )}
                    </Card>
                )}
            </footer>

        </>
    );
};
