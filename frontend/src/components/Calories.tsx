import { useEffect, useState } from "react";
import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";

interface CaloriesProps {
  currentLog: iUserLog;
  setCurrentLog: React.Dispatch<React.SetStateAction<iUserLog>>;
}

const Calories = ({ currentLog, setCurrentLog }: CaloriesProps) => {
  const [userLog, setUserLog] = useState<iUserLog>(currentLog);

  useEffect(() => {
    setUserLog(currentLog);
  }, [currentLog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let breakfast = parseInt(
      (e.currentTarget.elements.namedItem("breakfast") as HTMLInputElement)
        .value
    );
    let lunch = parseInt(
      (e.currentTarget.elements.namedItem("lunch") as HTMLInputElement).value
    );
    let dinner = parseInt(
      (e.currentTarget.elements.namedItem("dinner") as HTMLInputElement).value
    );
    let snacks = parseInt(
      (e.currentTarget.elements.namedItem("snacks") as HTMLInputElement).value
    );
    let exercise = parseInt(
      (e.currentTarget.elements.namedItem("exercise") as HTMLInputElement).value
    );

    if (!breakfast) {
      breakfast = currentLog.breakfast;
    }
    if (!lunch) {
      lunch = currentLog.lunch;
    }
    if (!dinner) {
      dinner = currentLog.dinner;
    }
    if (!snacks) {
      snacks = currentLog.snacks;
    }
    if (!exercise) {
      exercise = currentLog.exercise;
    }

    const generateRequestBody = () => {
      try {
        return JSON.stringify({
          email: "email@gmail.com",
          breakfast: breakfast,
          lunch: lunch,
          dinner: dinner,
          snacks: snacks,
          exercise: exercise,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const updateLog = async () => {
      await fetch(`http://localhost:5100/api/userlog/update/${userLog._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: generateRequestBody(),
      });
      const updatedLogResponse = await fetch(
        `http://localhost:5100/api/userlog/${userLog._id}`
      );
      const updatedLogData = await updatedLogResponse.json();

      setCurrentLog(updatedLogData);
    };

    const addLog = async () => {
      const request = await fetch(`http://localhost:5100/api/userlog/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: generateRequestBody(),
      });
      const userId = await request.json();
      const latestLogResponse = await fetch(
        `http://localhost:5100/api/userlog/${userId._id}`
      );
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
      <InfoIsland
        number={
          1800 -
          (userLog.breakfast +
            userLog.lunch +
            userLog.dinner +
            userLog.snacks -
            userLog.exercise)
        }
        string="Calories remaining"
      ></InfoIsland>
      <div className="addcalories">
        <h1>Calories</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="breakfast">Breakfast</label>
          <input type="number" name="breakfast" id="breakfast" />
          <label htmlFor="lunch">Lunch</label>
          <input type="number" name="lunch" id="lunch" />
          <label htmlFor="dinner">Dinner</label>
          <input type="number" name="dinner" id="dinner" />
          <label htmlFor="snacks">Snacks</label>
          <input type="number" name="snacks" id="snacks" />
          <label htmlFor="exercise">Exercise</label>
          <input type="number" name="exercise" id="exercise" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Calories;
