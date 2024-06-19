import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getItem, updateItem } from "../../managers/itemManager";
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";

//Header
export const EditItem = ({ loggedInUser }) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [placard, setPlacard] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItem(id).then(item => {
            setImage(item.image);
            setName(item.name);
            setPlacard(item.placard);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemData = {
            Id: id,
            Image: image,
            Name: name,
            Placard: placard,
        };
        await updateItem(id, itemData);
        navigate(`/item/details/${id}`);
    };

    const handleBack = () => {
        navigate(`/item/details/${id}`);
    };

    return (
        <>
            <Card className="transparent-card">
                <h2>Edit Item</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="placard">Placard</Label>
                        <Input
                            type="textarea"
                            id="placard"
                            value={placard}
                            onChange={(e) => setPlacard(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button type="button" onClick={handleBack}>Back</Button>
                    <Button type="submit" className="btn btn-primary">Submit</Button>

                </Form>
            </Card>
        </>
    );
}
