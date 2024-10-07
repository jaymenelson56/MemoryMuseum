import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";
import { newItem } from "../../managers/itemManager"
import { getExhibits } from "../../managers/exhibitManager";
import "./Item.css";

export const CreateItem = ({ loggedInUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("")
    const [name, setName] = useState("")
    const [exhibitId, setExhibitId] = useState("0")
    const [placard, setPlacard] = useState("")
    const [exhibits, setExhibits] = useState([])

    const navigate = useNavigate()

    const fileSelectedHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile && !imageUrl) {
            alert("Please provide either an image file or an image URL.");
            return;
        }

        const itemData = new FormData();
        if (selectedFile) {
            itemData.append("image", selectedFile);
        }
        itemData.append("imageUrl", imageUrl || "");
        itemData.append("name", name);
        itemData.append("placard", placard);
        itemData.append("exhibitId", exhibitId);
        itemData.append("userProfileId", loggedInUser.id);

        if (exhibitId == 0) {
            window.alert("Please Select an exhibit");
            return;
        }

        try {
            const response = await newItem(itemData);
            console.log('Response:', response);
            navigate(`/exhibits/${exhibitId}`);
        } catch (error) {
            console.error("There was an error creating the item", error);
        }
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
                <h2>Create an Item</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label><h4>Name</h4></Label>
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
                        <Label><h4>Image</h4></Label>
                        <Input
                            type="file"
                            onChange={fileSelectedHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label><h4>Or Enter Image URL</h4></Label>
                        <Input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label><h4>Placard</h4></Label>
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
                        <Label><h4>Exhibit</h4></Label>
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
