import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";
import { newItem } from "../../managers/itemManager"
import { getExhibits } from "../../managers/exhibitManager";
import "./Item.css";

export const CreateItem = ({ loggedInUser }) => {
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [exhibitId, setExhibitId] = useState("0")
    const [placard, setPlacard] = useState("")
    const [exhibits, setExhibits] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemForm = {
            Image: image,
            Name: name,
            ExhibitId: exhibitId,
            Placard: placard,
            UserProfileId: loggedInUser.id
        };
        if (exhibitId == 0) {
            window.alert("Please Select an exhibit")
        }
        await newItem(itemForm)
        navigate(`/exhibits/${exhibitId}`);
    };

    const handleBack = () => {
        navigate('/');
    };

    useEffect(() => {
        getExhibits().then(setExhibits);
    }, []);

    return (
        <>
            <Card className="transparent-card">
                <h2> Create an Item</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Image Url</Label>
                        <Input
                            type="text"
                            value={image}
                            onChange={(e) => {
                                setImage(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Placard</Label>
                        <Input
                            type="textarea"
                            value={placard}
                            onChange={(e) => {
                                setPlacard(e.target.value);
                            }}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Exhibit</Label>
                        <Input
                            type="select"
                            value={exhibitId}
                            onChange={(e) => {
                                setExhibitId(parseInt(e.target.value));
                            }}
                        >
                            <option value={0}>Choose an Exhibit</option>
                            {exhibits.map((ex) => (
                                <option key={ex.id} value={ex.id}>{ex.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button type="submit">Submit</Button><p> </p>
                    <Button type="button" onClick={handleBack}>Back</Button>
                </Form>
            </Card>
        </>
    )
}
