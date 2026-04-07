import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export function InactiveRoute({ loggedInUser, children }) {
  if (!loggedInUser?.isActive) {
    return <Navigate to="/inactive" replace />;
  }
  return children;
}
InactiveRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),  // optional
  all: PropTypes.bool,                          // optional
};
