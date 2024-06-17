import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { ExhibitList } from "./Exhibit/ExhibitList";
import { ExhibitHall } from "./Exhibit/ExhibitHall";
import { CreateExhibit } from "./Exhibit/CreateExhibit";
import { CreateItem } from "./Items/CreateItem";
import { ItemDetails } from "./Items/ItemDetails";
import { EditItem } from "./Items/EditItem";
import AuthorizedItemRoute from "./auth/AuthorizedItemRoute";
import Unauthorized from "./auth/Unauthorized";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="/exhibits">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ExhibitList />
            </AuthorizedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ExhibitHall loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateExhibit loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="/item">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateItem loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="details/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ItemDetails loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <AuthorizedItemRoute loggedInUser={loggedInUser}>
              <EditItem loggedInUser={loggedInUser} />
            </AuthorizedItemRoute>
          }
        />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
