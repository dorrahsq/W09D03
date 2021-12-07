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
