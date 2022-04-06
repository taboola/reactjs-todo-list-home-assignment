import React, { useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { getTodos } from "../../api";
import { DARK_THEME, INITIAL_STATE } from "../../utils/constants";
import { ListContainer, ListHeader, SpinnerWrapper } from "../../utils/styles";
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
        <ListHeader>My List</ListHeader>
        {state.isLoading && (
          <SpinnerWrapper>
            <Spinner animation='border' role='status'></Spinner>
            <span>loading...</span>
          </SpinnerWrapper>
        )}
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
