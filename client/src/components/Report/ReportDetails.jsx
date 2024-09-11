import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { getReport } from "../../managers/reportmanager";

export const ReportDetails = () => {
  const [report, setReport] = useState({});
  const { id } =useParams();
  
  useEffect (() => {
    getReport(id).then(setReport);
  }, [id])

  return (
    <>
      <Card className="transparent-card">
        <h2>Report</h2>
        <Card>
          <CardBody>
            <CardHeader>Subject: <b>{report?.reportSubject}</b></CardHeader>

            <ListGroup flush>
              <ListGroupItem>Author: <b>{report?.reportAuthor}</b></ListGroupItem>
              <ListGroupItem>Issue: <b>{report?.body}</b></ListGroupItem>
              <ListGroupItem>Status: <b>{report?.closed ? "Closed" : "Open"}</b></ListGroupItem>
              <ListGroupItem>Action</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Card>
    </>
  );
};
