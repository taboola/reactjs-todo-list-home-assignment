export const reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "setError":
      newState.error = action.val;
      break;
    case "setIsLoading":
      newState.isLoading = action.val;
      break;
    case "setItems":
      newState.items = [...action.val];
      break;
    case "setRefreshKey":
      newState.refreshKey = action.val;
      break;
    case "setTheme":
      newState.theme = action.val;
      break;
    default:
      throw new Error("invalid action.type");
  }
  return newState;
};
