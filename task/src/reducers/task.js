const initialState = {
  allTasks: [],
};
const getTasks = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { allTasks } = payload;
      return { allTasks };

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
