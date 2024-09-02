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
import { StorageRoom } from "./Items/StorageRoom";
import { UserProfileList } from "./UserProfiles/UserProfileList";
import { UserProfileDetails } from "./UserProfiles/UserProfileDetails";
import { InactiveRoute } from "./auth/InActiveRoute";
import { InactivePage } from "./auth/InActivePage";
import { ReportList } from "./Report/ReportList";
import { ReportDetails } from "./Report/ReportDetails";
import { CreateReport } from "./Report/CreateReport";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <Home />
              </InactiveRoute>
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
              <InactiveRoute loggedInUser={loggedInUser}>
                <ExhibitList />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <ExhibitHall loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
        <Route
          path="create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <CreateExhibit loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="/item">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <CreateItem loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
        <Route
          path="details/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <ItemDetails loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <AuthorizedItemRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <EditItem loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedItemRoute>
          }
        />
      </Route>
      <Route
        path="storage-room"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <InactiveRoute loggedInUser={loggedInUser}>
              <StorageRoom loggedInUser={loggedInUser} />
            </InactiveRoute>
          </AuthorizedRoute>
        }
      />
      <Route
        path="userprofiles"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <InactiveRoute loggedInUser={loggedInUser}>
              <UserProfileList />
            </InactiveRoute>
          </AuthorizedRoute>
        }
      />
      <Route
        path="userprofiles/:id"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <InactiveRoute loggedInUser={loggedInUser}>
              <UserProfileDetails loggedInUser={loggedInUser} />
            </InactiveRoute>
          </AuthorizedRoute>
        }
      />
      <Route path="/reports">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AuthorizedItemRoute
                loggedInUser={loggedInUser}
                roles={["Admin"]}
              >
                <InactiveRoute loggedInUser={loggedInUser}>
                  <ReportList />
                </InactiveRoute>
              </AuthorizedItemRoute>
            </AuthorizedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <ReportDetails loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
        <Route
          path="create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InactiveRoute loggedInUser={loggedInUser}>
                <CreateReport loggedInUser={loggedInUser} />
              </InactiveRoute>
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="/inactive" element={<InactivePage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
