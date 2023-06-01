import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useState } from "react";

interface WeightProps {
  userlog: iUserLog;
  setCurrentLog: React.Dispatch<React.SetStateAction<iUserLog>>;
}

const Weight = ({ userlog, setCurrentLog }: WeightProps) => {
  const [userLog, setUserLog] = useState<iUserLog>(userlog);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let weight = parseInt(
      (e.currentTarget.elements.namedItem("weight") as HTMLInputElement).value
    );

    if (!weight) {
      weight = 0;
    }

    const generateResponseBody = () => {
      try {
        return JSON.stringify({
          bodyweight: weight,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const updateLog = async () => {
      const response = await fetch(
        `http://localhost:5100/api/userlog/update/${userLog._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: generateResponseBody(),
        }
      );
      const data = await response.json();
      console.log(data);
    };

    updateLog();

    setUserLog({ ...userLog, bodyweight: weight });

    setCurrentLog({ ...userLog, bodyweight: weight });
  };

  return (
    <>
      <InfoIsland number={userLog.bodyweight} string="Weight" />
      <div className="addweight">
        <h1>Weight</h1>
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
