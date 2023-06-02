import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useState, useEffect } from "react";

interface WeightProps {
  currentLog: iUserLog;
  setCurrentLog: React.Dispatch<React.SetStateAction<iUserLog>>;
}

const Weight = ({ currentLog, setCurrentLog }: WeightProps) => {
  const [userLog, setUserLog] = useState<iUserLog>(currentLog);

  useEffect(() => {
    setUserLog(currentLog);
  }, [currentLog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let weight = parseInt(
      (e.currentTarget.elements.namedItem("weight") as HTMLInputElement).value
    );

    if (!weight) {
      weight = 0;
    }

    const generateRequestBody = () => {
      try {
        return JSON.stringify({
          email: "email@mymail.com",
          bodyweight: weight,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const updateLog = async () => {
      await fetch(`/api/userlog/update/${userLog._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: generateRequestBody(),
      });
      const updatedLogResponse = await fetch(`/api/userlog/${userLog._id}`);
      const updatedLogData = await updatedLogResponse.json();

      setCurrentLog(updatedLogData);
    };

    const addLog = async () => {
      const request = await fetch(`/api/userlog/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: generateRequestBody(),
      });
      const userId = await request.json();
      const latestLogResponse = await fetch(`/api/userlog/${userId._id}`);
      const latestLogData = await latestLogResponse.json();

      setCurrentLog(latestLogData);
    };

    if (currentLog._id) {
      await updateLog();
    } else {
      await addLog();
    }
  };

  return (
    <>
      <h1>Weight</h1>
      <InfoIsland number={userLog.bodyweight} string="Weight" />
      <div className="addweight">
        <form onSubmit={handleSubmit}>
          <label htmlFor="weight">Weight</label>
          <input type="number" name="weight" id="weight" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Weight;
