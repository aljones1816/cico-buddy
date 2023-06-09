import { useEffect, useState } from "react";
import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useAuth } from "../api/hooks/useAuthContext";

interface CaloriesProps {
  currentLog: iUserLog;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[]>>;
}

const Calories = ({ currentLog, setUserLogs }: CaloriesProps) => {
  const [userLog, setUserLog] = useState<iUserLog>({} as iUserLog);
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

    if (isNaN(breakfast)) {
      breakfast = currentLog.breakfast;
    } else if (breakfast === 0) {
      breakfast = 0;
    }
    if (isNaN(lunch)) {
      lunch = currentLog.lunch;
    } else if (lunch === 0) {
      lunch = 0;
    }
    if (isNaN(dinner)) {
      dinner = currentLog.dinner;
    } else if (dinner === 0) {
      dinner = 0;
    }
    if (isNaN(snacks)) {
      snacks = currentLog.snacks;
    } else if (snacks === 0) {
      snacks = 0;
    }
    if (isNaN(exercise)) {
      exercise = currentLog.exercise;
    } else if (exercise === 0) {
      exercise = 0;
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
      const updatedLogResponse = await fetch(`/api/userlog/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const updatedLogData = await updatedLogResponse.json();

      setUserLogs(updatedLogData);
    };

    const addLog = async () => {
      await fetch(`/api/userlog/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: generateRequestBody(),
      });

      const updatedLogResponse = await fetch(`/api/userlog/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const updatedLogData = await updatedLogResponse.json();

      setUserLogs(updatedLogData);
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
      {user && (
        <InfoIsland
          number={
            user.calorie_goal -
            (userLog.breakfast +
              userLog.lunch +
              userLog.dinner +
              userLog.snacks -
              userLog.exercise)
          }
          string="Calories remaining"
        ></InfoIsland>
      )}
      <div className="addcalories">
        <form onSubmit={handleSubmit}>
          <label htmlFor="breakfast">Breakfast</label>
          <input
            type="number"
            name="breakfast"
            id="breakfast"
            defaultValue={userLog.breakfast}
          />
          <label htmlFor="lunch">Lunch</label>
          <input
            type="number"
            name="lunch"
            id="lunch"
            defaultValue={userLog.lunch}
          />
          <label htmlFor="dinner">Dinner</label>
          <input
            type="number"
            name="dinner"
            id="dinner"
            defaultValue={userLog.dinner}
          />
          <label htmlFor="snacks">Snacks</label>
          <input
            type="number"
            name="snacks"
            id="snacks"
            defaultValue={userLog.snacks}
          />
          <label htmlFor="exercise">Exercise</label>
          <input
            type="number"
            name="exercise"
            id="exercise"
            defaultValue={userLog.exercise}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Calories;
