import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { getExhibitList } from "../../managers/exhibitManager";
import { Button, Card, Table } from "reactstrap";

export const ExhibitList = () => {
    const [exhibits, setExhibits] = useState([]);

    const navigate = useNavigate()

    const getExhibits = () => {
        getExhibitList().then(setExhibits);
    };

    useEffect(() => {
        getExhibits();
    }, [])

    const handleCreateButton = () => {
        navigate("/exhibits/create");
    };


    return (
        <>
            <Card className="transparent-card">
                <h2>Exhibit List</h2>
                <Button onClick={handleCreateButton}>Create Exhibit</Button>
                <Table>
                    <thead><tr>
                        <th>Exhibit</th>
                        <th>Owned by</th>
                        <th>Rating Average</th>
                    </tr>
                    </thead>
                    <tbody>
                        {exhibits.map((e) => (
                            <tr key={e.id}>
                                <th scope="row"><Link to={`/exhibits/${e.id}`}>{e.name}</Link></th>
                                <td><Link to={`/userprofiles/${e.userProfileId}`}>{e.userProfile.userName}</Link></td>
                                <td>
                                    {e.exhibitRatings.length > 0
                                        ? `${e.averageRating.toFixed(1)} out of 5`
                                        : "No ratings"
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>)
}
