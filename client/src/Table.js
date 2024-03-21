import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Table() {
  let navigate = useNavigate();

  const { state } = useLocation();

  const { tableData } = state;

  return (
    <div className="dashboard">
      <div style={{ height: 70, fontSize: 40 }}>
        All Code Submissions{" "}
        <span>
          <button onClick={() => navigate("/")}>Back</button>
        </span>{" "}
      </div>
      <table className="Table">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Programming_Language</th>
            <th>Stdin</th>
            <th>SourceCode</th>
            <th>TimeStamp</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.username}>
              <td>{data.username}</td>
              <td>{data.programming_language}</td>
              <td>{data.stdin}</td>
              <td>{data.source_code.slice(0, 100)}</td>
              <td>{data.curr_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
