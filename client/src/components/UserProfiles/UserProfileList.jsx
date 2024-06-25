import { useEffect, useState } from "react"
import { Card, Table } from "reactstrap"
import { getUsers } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])


    return (
        <>
            <Card className="transparent-card">
                <h2>User List</h2>
                <Table>
                    <thead><tr>
                        <th>UserName</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <th scope="row"><Link to={`/userprofiles/${u.id}`}>{u.userName}</Link></th>
                                <td>{u.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}