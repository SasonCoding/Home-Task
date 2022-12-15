import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userTask, setUserTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const effectRan = useRef(false); //Using this hook to prevent our useEffect from calling the api twice because of the strict mode.

  useEffect(() => {
    if (effectRan.current === false) {
      setIsLoading(true);
      const handleUsers = async () => {
        try {
          const usersResponse = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          const [...usersData] = usersResponse?.data;
          setUsers(usersData);
          setIsLoading(false);
          localStorage.setItem("UsersData", usersData)
        } catch (error) {
          console.log(error?.response?.data);
        }
      };
      handleUsers();

      return () => {
        effectRan.current = true;
      }; //Clean up.
    }
  }, []);

  const handleTasks = async (userId) => {
    const TaskResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      { params: { id: userId } }
    );
    let [taskData] = TaskResponse?.data;
    taskData.completed = taskData.completed.toString();
    setUserTask(taskData);
  };

  return (
    <div>
      <u>
        <h2>Users:</h2>
      </u>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        users.map((user, index) => {
          return (
            <h2
              onClick={() => {
                handleTasks(user.id);
              }}
              key={index}
            >
              {user.name}
            </h2>
          );
        })
      )}
      <br></br>
      <u>
        <h2>User Todos</h2>
      </u>
      <b>Title: {userTask.title}</b>
      <br></br>
      <br></br>
      <b>completed: {userTask.completed}</b>
    </div>
  );
};

export default Users;
