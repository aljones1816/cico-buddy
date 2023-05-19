import { useEffect, useState } from "react";

// define the userlog type
interface UserLog {
  _id: string;
  username: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
  exercise: number;
  bodyweight: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const Home = () => {
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);

  useEffect(() => {
    const fetchUserLogs = async () => {
      const res = await fetch("http://localhost:5100/userlog");
      const data = await res.json();

      if (res.ok) {
        setUserLogs(data);
      }
    };

    fetchUserLogs();
  }, []);

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="user-logs">
        {userLogs &&
          userLogs.map((userLog: UserLog) => (
            <div className="user-log" key={userLog._id}>
              <h2>{userLog.username}</h2>
              <p>Breakfast: {userLog.breakfast}</p>
              <p>Lunch: {userLog.lunch}</p>
              <p>Dinner: {userLog.dinner}</p>
              <p>Snacks: {userLog.snacks}</p>
              <p>Exercise: {userLog.exercise}</p>
              <p>Bodyweight: {userLog.bodyweight}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
