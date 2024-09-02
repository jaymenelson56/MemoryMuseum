import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "./Report.css";
import { useLocation, useNavigate } from "react-router-dom";
import { newReport } from "../../managers/reportmanager";

export const CreateReport = ({ loggedInUser }) => {
  const [issue, setIssue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const subjectId = location.state?.reportSubjectId;
  const subjectName = location.state?.reportSubjectName;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectId) {
      alert("Subject is required to create a report."); // or use a more user-friendly way to display the error
      return;
    }

    const reportData = {
      body: issue,
      reportAuthorId: loggedInUser.id,
      reportSubjectId: subjectId,
    };

    try {
      await newReport(reportData);
      setModalOpen(true);
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <Card className="transparent-card">
        <h2>Create Report</h2>
        <Form onSubmit={handleSubmit}>
          <CardHeader>
            <b>Author:</b> {loggedInUser.userName}
          </CardHeader>
          <CardHeader>
            <b>Subject:</b> {subjectName}
          </CardHeader>
          <FormGroup>
            <Label for="issue">
              <b>Issue:</b>
            </Label>
            <Input
              type="textarea"
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Submit Report
          </Button>
        </Form>
      </Card>

      <Modal isOpen={modalOpen} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>Report Created</ModalHeader>
        <ModalBody>
          Your report has been created. The Moderation team will review and take
          immediate action. You will be taken back to the home page.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleModalClose}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
