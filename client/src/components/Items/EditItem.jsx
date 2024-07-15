import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getItem, updateItem } from "../../managers/itemManager";
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";

//Header
export const EditItem = ({ loggedInUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState("");
    const [placard, setPlacard] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItem(id).then((item) => {
            setName(item.name);
            setPlacard(item.placard);
            setImageUrl(item.image || "");
        });
    }, [id]);

    const fileSelectedHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemData = new FormData();
        if (selectedFile) {
            itemData.append("image", selectedFile);
        } else if (imageUrl) {
        itemData.append("imageUrl", imageUrl);
        }
        
        itemData.append("name", name);
        itemData.append("placard", placard);

        try {
            const response = await updateItem(id, itemData)
            console.log('Response:', response);
            navigate(`/item/details/${id}`);
        } catch (error) {
            console.error("There was an error uploading the file", error);
        }

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
                        <Label htmlFor="image">Image</Label>
                        <Input
                            type="file"
                            id="image"
                            onChange={fileSelectedHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="imageUrl">Or Enter Image URL</Label>
                        <Input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
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
