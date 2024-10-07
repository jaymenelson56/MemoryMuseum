import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { newExhibit } from "../../managers/exhibitManager";
import { Card, Form, FormGroup, Input, Label } from "reactstrap";

//Header
export const CreateExhibit = ({ loggedInUser }) => {
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exhibitForm = {
            Name: name,
            UserProfileId: loggedInUser.id
        };
        await newExhibit(exhibitForm)
        navigate('/exhibits');
    };

    const handleBack = () => {
        navigate('/exhibits');
    };


    return (
        <>
            <Card className="transparent-card">
                <h2>Create New Exhibit</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className ="d-flex flex-column align-items-center">
                    <div><Label htmlFor="name" className="me-2"><h4>Name:</h4></Label></div>
                    <div className="col-6">
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </div>
                    </FormGroup>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>
                        Back
                    </button>
                </Form>
            </Card>
        </>
    )
}


