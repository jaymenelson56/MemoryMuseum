import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getItem } from "../../managers/itemManager";

const AuthorizedItemRoute = ({ children, loggedInUser }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const item = await getItem(id);
                if (item.exhibit?.userProfileId === loggedInUser.id) {
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error("Error fetching item:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthorization();
    }, [id, loggedInUser.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AuthorizedItemRoute;