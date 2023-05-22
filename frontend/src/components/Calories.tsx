import { useState } from "react";
import InfoIsland from "./InfoIsland";
import { UserLog } from "../api/models/userlog";

interface CaloriesProps {
  userlog: UserLog;
  setCurrentLog: React.Dispatch<React.SetStateAction<UserLog | undefined>>;
}

const Calories = ({ userlog, setCurrentLog }: CaloriesProps) => {
  const [userLog, setUserLog] = useState<UserLog>(userlog);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      breakfast = userLog.breakfast;
    }
    if (!lunch) {
      lunch = userLog.lunch;
    }
    if (!dinner) {
      dinner = userLog.dinner;
    }
    if (!snacks) {
      snacks = userLog.snacks;
    }
    if (!exercise) {
      exercise = userLog.exercise;
    }

    const generateResponseBody = () => {
      try {
        return JSON.stringify({
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
      const response = await fetch(
        `http://localhost:5100/userlog/update/${userLog._id}`,
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
    setUserLog({
      ...userLog,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snacks: snacks,
      exercise: exercise,
    });

    setCurrentLog({
      ...userLog,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snacks: snacks,
      exercise: exercise,
    });
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
        string="Calories"
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
