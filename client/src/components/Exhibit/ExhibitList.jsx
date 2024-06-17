

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { getExhibitList } from "../../managers/exhibitManager";
import { Button, Table } from "reactstrap";

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
                            <td>{e.userProfile.userName}</td>
                            <td>
                                {e.exhibitRatings.length > 0
                                    ? `${e.averageRating} out of 5`
                                    : "No ratings"
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>)
}
