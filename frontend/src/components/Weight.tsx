import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useState, useEffect } from "react";
import { useAuth } from "../api/hooks/useAuthContext";

interface WeightProps {
  currentLog: iUserLog;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[]>>;
}

const Weight = ({ currentLog, setUserLogs }: WeightProps) => {
  const [userLog, setUserLog] = useState<iUserLog>({} as iUserLog);
  const { user } = useAuth();

  useEffect(() => {
    setUserLog(currentLog);
  }, [currentLog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    let weight = parseFloat(
      (e.currentTarget.elements.namedItem("weight") as HTMLInputElement).value
    ).toFixed(1);

    if (!weight) {
      weight = "0";
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
          Authorization: `Bearer ${user?.token}`,
        },
        body: generateRequestBody(),
      });
      const updatedLogResponse = await fetch(`/api/userlog/`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const updatedLogData = await updatedLogResponse.json();

      setUserLogs(updatedLogData);
    };

    const addLog = async () => {
      await fetch(`/api/userlog/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: generateRequestBody(),
      });
      const updatedLogResponse = await fetch(`/api/userlog/`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const updatedLogData = await updatedLogResponse.json();

      setUserLogs(updatedLogData);
    };
    if (!user) return;
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
          <input
            type="string"
            name="weight"
            id="weight"
            defaultValue={userLog.bodyweight}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Weight;
