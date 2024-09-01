import { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { getReports } from "../../managers/reportmanager";
import "./Report.css";

export const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports()
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);
  return (
    <>
      <Card body className="transparent-card">
        <h2>Reports</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Author</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.reportAuthor}</td>
                <td>{report.reportSubject}</td>
                <td>{report.closed ? "Closed" : "Open"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};
