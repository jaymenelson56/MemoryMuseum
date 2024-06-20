import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { newExhibit } from "../../managers/exhibitManager";
import { Card } from "reactstrap";

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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>
                        Back
                    </button>
                </form>
            </Card>
        </>
    )
}


