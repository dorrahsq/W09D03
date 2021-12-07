import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { RiPencilFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { taskss, deletee, add, update } from "../../reducers/task";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    const tasks = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/task/${state.signIn.userID}`,
      // { reqUserId: state.signIn.userID },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    const data = {
      allTasks: tasks.data,
    };
    dispatch(taskss(data));
  };

  const deleteTask = async (taskId) => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/delete`,
      { _id: taskId },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    const data = {
      taskId,
    };
    dispatch(deletee(data));
  };

  const addTask = async () => {
    const NewTaskb = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/task/create`,
      { user: state.signIn.userID, name: newTask },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    dispatch(add({ task: NewTaskb.data }));
  };

  const changeTask = async (taskId) => {
    console.log("change task");
    const updatedTaskb = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/update`,
      { _id: taskId, newName: updatedTask },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    dispatch(update({ newTask: updatedTaskb.data }));
    getAllTask();
  };

  return (
    <div className="home">
      <input
        type="text"
        placeholder="new task"
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <button onClick={addTask}> add </button>

      {!state.getTasks.allTasks.length ? (
        <h2> you dont have any tasks</h2>
      ) : (
        <div className="anim">
          {state.getTasks.allTasks.map((ele) => {
            return (
              <div key={ele._id}>
                <h3> {ele.name} </h3>
                <button
                  onClick={() => {
                    deleteTask(ele._id);
                  }}
                >
                  delete task
                </button>
                <input
                  onChange={(e) => {
                    setUpdatedTask(e.target.value);
                  }}
                />
                <RiPencilFill
                  className="editBioIcno"
                  onClick={() => {
                    changeTask(ele._id);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
