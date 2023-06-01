import { iUserLog } from "../api/models/userlog.interface";

interface HistoryProps {
  userLogs: iUserLog[];
}

const History = ({ userLogs }: HistoryProps) => {
  return (
    <>
      <h1>History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Calories</th>
            <th>Weight</th>
          </tr>
        </thead>

        <tbody>
          {userLogs.map((userLog: iUserLog, index) => (
            <tr key={index}>
              <td>{new Date(userLog.date).toDateString()}</td>
              <td>
                {userLog.breakfast +
                  userLog.lunch +
                  userLog.dinner +
                  userLog.snacks -
                  userLog.exercise}
              </td>
              <td>{userLog.bodyweight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default History;
