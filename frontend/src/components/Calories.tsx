import { useEffect, useState } from "react";
import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useAuth } from "../api/hooks/useAuthContext";

interface CaloriesProps {
  currentLog: iUserLog;
  setCurrentLog: React.Dispatch<React.SetStateAction<iUserLog>>;
}

const Calories = ({ currentLog, setCurrentLog }: CaloriesProps) => {
  const [userLog, setUserLog] = useState<iUserLog>(currentLog);
  const { user } = useAuth();

  useEffect(() => {
    setUserLog(currentLog);
  }, [currentLog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

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
      await fetch(`/api/userlog/update/${userLog._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: generateRequestBody(),
      });
      const updatedLogResponse = await fetch(`/api/userlog/${userLog._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const updatedLogData = await updatedLogResponse.json();

      setCurrentLog(updatedLogData);
    };

    const addLog = async () => {
      const request = await fetch(`/api/userlog/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: generateRequestBody(),
      });
      const userId = await request.json();
      const latestLogResponse = await fetch(`/api/userlog/${userId._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
      <h1>Calories</h1>
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
