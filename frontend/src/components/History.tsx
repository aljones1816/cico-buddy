import { iUserLog } from "../api/models/userlog.interface";
import { Card, CardBody, CardHeader } from "@chakra-ui/react";

interface HistoryProps {
  userLogs: iUserLog[];
}

const History = ({ userLogs }: HistoryProps) => {
  return (
    <>
      {userLogs.map((userLog: iUserLog, index) => (
        <Card w="100%" key={index}>
          <CardHeader>{new Date(userLog.date).toDateString()}</CardHeader>
          <CardBody>
            <p>
              Calories eaten:
              {userLog.breakfast +
                userLog.lunch +
                userLog.dinner +
                userLog.snacks}
            </p>
            <p>Exercise: {userLog.exercise}</p>
            <p>Bodyweight: {userLog.bodyweight}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default History;
