import { useAuth } from "../api/hooks/useAuthContext";
import { useState } from "react";
import { useLogout } from "../api/hooks/useLogout";
import { Button } from "@chakra-ui/react";
import { IconArrowBigLeftFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, login } = useAuth();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { handleLogout } = useLogout();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedUser = {
      name: formData.get("name"),
      age: formData.get("age"),
      calorie_goal: formData.get("calorie_goal"),
    };

    try {
      const res = await fetch(`/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      if (data) {
        login(data);
        // change the user in local storage
        localStorage.setItem("user", JSON.stringify(data));
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <div>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user.name}
              />
              <label htmlFor="age">Age</label>
              <input type="age" name="age" id="age" defaultValue={user.age} />
              <label htmlFor="calorie_goal">Calorie Goal</label>
              <input
                type="number"
                name="calorie_goal"
                id="calorie_goal"
                defaultValue={user.calorie_goal}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <Link to="/">
                <IconArrowBigLeftFilled />
              </Link>

              <h2>Hi, {user.name}!</h2>
              <p>Your daily calorie goal is: {user.calorie_goal}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </>
  );
};

export default Profile;
