const initialState = {
  allTasks: [],
};
const getTasks = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { allTasks } = payload;
      return { allTasks };

    case "DELETE":
      const { taskId } = payload;
      return {
        allTasks: state.allTasks.filter((item) => item._id !== taskId),
      };

    case "ADD":
      const { task } = payload;
      return {
        allTasks: [...state.allTasks, task],
      };

    case "UPDATE":
      const { newTask } = payload;
      return {
        ...state,
        allTasks: state.allTasks.map((ele) =>
          ele._id == newTask[0]._id ? { ...ele, name: newTask[0].name } : ele
        ),
      };

    default:
      return state;
  }
};

export default getTasks;

export const taskss = (data) => {
  return {
    type: "GET",
    payload: data,
  };
};

export const deletee = (data) => {
  return {
    type: "DELETE",
    payload: data,
  };
};

export const add = (data) => {
  return {
    type: "ADD",
    payload: data,
  };
};

export const update = (data) => {
  return {
    type: "UPDATE",
    payload: data,
  };
};
