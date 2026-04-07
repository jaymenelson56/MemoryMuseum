import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";
import { PropTypes } from "prop-types"

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleNavbar = () => setOpen(!open);
  const toggleShowMore = () => setShowMore(!showMore);

  const visibleItems = [
    {
      to: `/userprofiles/${loggedInUser?.id}`,
      text: `Signed in as: ${loggedInUser?.userName}`,
    },
    { to: "/exhibits", text: "Exhibits" },
    { to: "/item", text: "Create Item" },
    { to: "/storage-room", text: "Storage Room" },
  ];

  const additionalItems = [
    { to: "/userprofiles", text: "User List" },
    ...(loggedInUser?.roles.includes("Admin")
      ? [
          { to: "/reports", text: "Reports" },
          { to: "/manage-admins", text: "Staff Room" },
        ]
      : []),
  ];

  return (
    <div>
      <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          🖼️⏲️Memory Museum
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                {visibleItems.map((item, index) => (
                  <NavItem key={index}>
                    <NavLink tag={RRNavLink} to={item.to}>
                      {item.text}
                    </NavLink>
                  </NavItem>
                ))}
                {showMore &&
                  additionalItems.map((item, index) => (
                    <NavItem key={index}>
                      <NavLink tag={RRNavLink} to={item.to}>
                        {item.text}
                      </NavLink>
                    </NavItem>
                  ))}
                <NavItem>
                  <Button color="link" onClick={toggleShowMore}>
                    {showMore ? "Show Less" : "More"}
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
NavBar.propTypes = {
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setLoggedInUser: PropTypes.func.isRequired,
};
