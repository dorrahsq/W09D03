import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiPencilFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const OneUser = () => {
  const id = useParams().id;
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    const tasks = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/task/${id}`,
      // { reqUserId: id },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setAllTasks(tasks.data);
  };

  const deleteTask = async (taskId) => {
    console.log(taskId);
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/delete`,
      { _id: taskId },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getAllTask();
  };

  const addTask = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/task/create`,
      { user: id, name: newTask },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getAllTask();
  };

  const changeTask = async (taskId) => {
    console.log("change task");
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/update`,
      { _id: taskId, newName: updatedTask },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
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

      {!allTasks.length ? (
        <h2> this user dose not have any tasks</h2>
      ) : (
        <div className="anim">
          {allTasks.map((ele) => {
            return (
              <div>
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

export default OneUser;
