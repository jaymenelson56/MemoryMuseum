import { useState } from "react";
import { Card, Form, FormGroup } from "reactstrap";

export const CreateReport = () => {
  const [reports, setReports] = useState([]);

  return <>
  <Card>
    <h2>Create Report</h2>
    <Form>
        <FormGroup>
            <Label>Issue</Label>
        </FormGroup>
    </Form>
  </Card>
  </>;
};
