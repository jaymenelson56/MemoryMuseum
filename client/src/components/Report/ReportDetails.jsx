import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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
  const [closeReportModal, setCloseReportModal] = useState(false);
  const [deleteReportModal, setDeleteReportModal] = useState(false);

  const toggleCloseReportModal = () => setCloseReportModal(!closeReportModal);
  const toggleDeleteReportModal = () => setDeleteReportModal(!deleteReportModal);

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
      toggleCloseReportModal();
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
              <Button color="danger" onClick={toggleDeleteReportModal}>
                Delete Ticket
              </Button>
            </div>
          ) : (
            <div>
              <Button color="info" onClick={toggleCloseReportModal}>
                Close Ticket
              </Button>
            </div>
          )}
          <CardBody>
            <CardHeader>
              Subject: <Link to={`/userprofiles/${report.reportSubjectId}`}><b>{report?.reportSubject}</b></Link>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem>
                Author: <Link to={`/userprofiles/${report.reportAuthorId}`}><b>{report?.reportAuthor}</b></Link>
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
      <Modal isOpen={closeReportModal} toggle={toggleCloseReportModal}>
        <ModalHeader toggle={toggleCloseReportModal}>Close Report</ModalHeader>
        <ModalBody>
        Are you sure you have taken appropriate action and want to close this report?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCloseReport}>Yes, Close this Report</Button>{" "}
          <Button color="secondary" onClick={toggleCloseReportModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteReportModal} toggle={toggleDeleteReportModal}>
        <ModalHeader toggle={toggleDeleteReportModal}>Delete Report</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this report from the records?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteReport}>
            Yes, Delete Report
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteReportModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
