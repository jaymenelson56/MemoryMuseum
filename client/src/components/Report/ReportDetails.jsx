import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  closeReport,
  deleteReport,
  getReport,
} from "../../managers/reportmanager";

export const ReportDetails = () => {
  const [report, setReport] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getReport(id).then(setReport);
  }, [id]);

  const handleCloseReport = async () => {
    try {
      await closeReport(id);
      setReport((prevReport) => ({
        ...prevReport,
        closed: true,
      }));
    } catch (error) {
      console.error("Failed to close the report", error);
    }
  };

  const handleDeleteReport = async () => {
    try {
      await deleteReport(id);
      navigate("/reports");
    } catch (error) {
      console.error("Failed to delete the report", error);
    }
  };

  return (
    <>
      <Card className="transparent-card">
        <h2>Report</h2>
        <Card>
          {report?.closed ? (
            <div>
              <Button color="danger" onClick={handleDeleteReport}>
                Delete Ticket
              </Button>
            </div>
          ) : (
            <div>
              <Button color="info" onClick={handleCloseReport}>
                Close Ticket
              </Button>
            </div>
          )}
          <CardBody>
            <CardHeader>
              Subject: <b>{report?.reportSubject}</b>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem>
                Author: <b>{report?.reportAuthor}</b>
              </ListGroupItem>
              <ListGroupItem>
                Issue: <b>{report?.body}</b>
              </ListGroupItem>
              <ListGroupItem>
                Status:{" "}
                <b>
                  {report?.closed ? "Issue Resolved" : "Issue Requires Action"}
                </b>
              </ListGroupItem>
            </ListGroup>
            <CardFooter>
              <Button color="secondary" onClick={() => navigate("/reports")}>
                Back to Report List
              </Button>
            </CardFooter>
          </CardBody>
        </Card>
      </Card>
    </>
  );
};
