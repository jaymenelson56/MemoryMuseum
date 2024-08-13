import { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { getUsers, getInactiveUsers } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { isAdmin } from "../../managers/authManager";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [showInactive, setShowInactive] = useState(false);

    useEffect(() => {
        getUsers().then(setUsers);
        isAdmin().then((isAdminUser) => {
            if (isAdminUser) {
                setShowInactive(true);
                getInactiveUsers().then(setInactiveUsers);
            }
        });
    }, []);

    return (
        <>
            <Card className="transparent-card">
                <h2>User List</h2>
                <Table>
                    <thead>
                        <tr>
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

            {showInactive && (
                <Card className="transparent-card">
                    <h2>Inactive User List</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>UserName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inactiveUsers.map((u) => (
                                <tr key={u.id}>
                                    <th scope="row"><Link to={`/userprofiles/${u.id}`}>{u.userName}</Link></th>
                                    <td>{u.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
      )}
    </>
  );
};
