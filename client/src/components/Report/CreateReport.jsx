import { useState } from "react";
import { Button, Card, CardHeader, Form, FormGroup, Input, Label } from "reactstrap";
import "./Report.css";
import { useLocation, useNavigate } from "react-router-dom";
import { newReport } from "../../managers/reportmanager";

export const CreateReport = ({ loggedInUser }) => {
  const [issue, setIssue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const subjectId = location.state?.reportSubjectId;
  const subjectName = location.state?.reportSubjectName;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      body: issue,
      reportAuthorId: loggedInUser.id,
      reportSubjectId: subjectId,
    };

    try {
      await newReport(reportData);
      // Redirect to another page or give feedback to the user
      navigate("/reports"); // Example redirection
    } catch (error) {
      console.error("Error creating report:", error);
    }
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
            <Label for="issue"><b>Issue:</b></Label>
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
    </>
  );
};
