import React, { useReducer, useEffect } from "react";
import { getTodos } from "../../api";
import { DARK_THEME, INITIAL_STATE } from "../../utils/constants";
import { ListContainer } from "../../utils/styles";
import { ListContext } from "../../utils/context";
import { reducer } from "../../utils/reducer";
import { TodoItem } from "./todo-item";

export const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = { state, dispatch };
  const getItemsHandler = () => {
    dispatch({ type: "setIsLoading", val: true });
    getTodos()
      .then((res) => {
        dispatch({ type: "setItems", val: res });
      })
      .catch((e) => {
        dispatch({ type: "setError", val: e });
      })
      .finally(() => {
        dispatch({ type: "setIsLoading", val: false });
      });
  };

  useEffect(() => {
    //should call this if the server were to return an updated list of items
    // getItemsHandler();
  }, [state.refreshKey]);

  useEffect(() => {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkTheme) {
      dispatch({ type: "setTheme", val: DARK_THEME });
    }

    // instead - I'm fetching just once from the server
    getItemsHandler();
  }, []);

  return (
    <ListContext.Provider value={value}>
      <ListContainer
        color={state.theme.color}
        listBgColor={state.theme.listBgColor}
      >
        <h1>My List</h1>
        {state.isLoading && <div>Loading....</div>}
        {state.error === "" && !state.isLoading && (
          <div>
            {state.items.map((item) => (
              <TodoItem data={item} key={item.id} />
            ))}
          </div>
        )}
        {state.error !== "" && <div>Error</div>}
      </ListContainer>
    </ListContext.Provider>
  );
};
