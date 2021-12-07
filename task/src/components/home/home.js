import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { RiPencilFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { taskss, deletee, add, update , completeRedu , unCompleteRedu } from "../../reducers/task";
import Try from "../try/try";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");
  const [text, setText] = useState("");
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
    if (updatedTask.length == 0 || updatedTask.trim().length == 0) {
      console.log("you cant");
      setText("you need to write somthing");
    } else {
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
      setText("");
    }
  };

  const complete = async (taskId) => {
    const updatedTaskb = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/complete`,
      { _id: taskId },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    dispatch(completeRedu({ taskID: updatedTaskb.data._id }));
  };

  const unComplete = async (taskId) => {
    const updatedTaskb = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/unComplete`,
      { _id: taskId },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    dispatch(unCompleteRedu({ TaskId: taskId}));

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
                {/* <Try name = {ele.name}/> */}
                {ele.isCompleted ? (
                  <h3 className="completed" onClick={()=>unComplete(ele._id)}> {ele.name} </h3>
                ) : (
                  <h3 onClick={() => complete(ele._id)}> {ele.name} </h3>
                )}

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
          {text}
        </div>
      )}
    </div>
  );
};

export default Home;
