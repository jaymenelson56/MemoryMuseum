import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";

export const ReportDetails = () => {
  return (
    <>
      <Card className="transparent-card">
        <h2>Report</h2>
        <Card>
          <CardBody>
            <CardHeader>Subject</CardHeader>

            <ListGroup flush>
              <ListGroupItem>
                Author
              </ListGroupItem>
              <ListGroupItem>
                Issue
              </ListGroupItem>
              <ListGroupItem>
                Open
              </ListGroupItem>
              <ListGroupItem>
                Action
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Card>
    </>
  );
};
