import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// This component returns a Route that either display the prop element
// or navigates to the login. If roles are provided, the route will require
// all of the roles when all is true, or any of the roles when all is false
export const AuthorizedRoute = ({ children, loggedInUser, roles, all }) => {
  let authed = false;
  
  if (loggedInUser) {
    if (roles && roles.length) {
      authed = all
        ? roles.every((r) => loggedInUser.roles.includes(r))
        : roles.some((r) => loggedInUser.roles.includes(r));
    } else {
      authed = true;
    }
  }

  return authed ? children : <Navigate to="/login" />;
};
AuthorizedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),  // optional
  all: PropTypes.bool,                          // optional
};

// Optional default for `all`
AuthorizedRoute.defaultProps = {
  roles: [],
  all: false,
};