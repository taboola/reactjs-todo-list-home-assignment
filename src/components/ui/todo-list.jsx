import React, { useReducer, useEffect } from "react";
import { getTodos } from "../../api";
import { INITIAL_STATE } from "../../utils/constants";
import { ListContainer } from "../../utils/styles";
import { ListContext } from "../../utils/context";
import { reducer } from "../../utils/reducer";
import { TodoItem } from "./todo-item";

export const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = { state, dispatch };

  useEffect(() => {
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
  }, []);

  return (
    <ListContext.Provider value={value}>
      {state.isLoading && <div>Loading....</div>}
      {state.error === "" && !state.isLoading && (
        <ListContainer>
          {state.items.map((item, index) => (
            <TodoItem data={item} index={index} key={item.id} />
          ))}
        </ListContainer>
      )}
      {state.error !== "" && <div>Error</div>}
    </ListContext.Provider>
  );
};
