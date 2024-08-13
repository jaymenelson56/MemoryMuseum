import { Navigate } from "react-router-dom";

export function InactiveRoute({ loggedInUser, children }) {
  if (!loggedInUser?.isActive) {
    return <Navigate to="/inactive" replace />;
  }
  return children;
}