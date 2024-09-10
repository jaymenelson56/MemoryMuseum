import { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
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
              <th>Issue</th>
              <th>Status</th>
            
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <Link to={`/userprofiles/${report.reportAuthorId}`}>
                    {" "}
                    {report.reportAuthor}
                  </Link>
                </td>
                <td>
                  <Link to={`/userprofiles/${report.reportSubjectId}`}>
                    {report.reportSubject}
                  </Link>
                </td>
                <td><Link to={`/reports/${report.id}`}>Details</Link></td>
                <td>{report.closed ? "Closed" : "Open"}</td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};
