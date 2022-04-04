import React, { useContext, useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../../api";
import { ItemContainer } from "../../utils/styles";
import { ListContext } from "../../utils/context";

export const TodoItem = ({ data }) => {
  const { state, dispatch } = useContext(ListContext);

  // since the server is stateless, I must use a local state to re-render the item color onClick
  const [completed, setCompleted] = useState(data.completed);

  /*   useEffect(() => {
    debugger;
  }, [data.completed]); */

  const clickHandler = (e) => {
    debugger;
    updateTodo(data.id, "update")
      .then((res) => {
        dispatch({ type: "setRefreshKey", val: state.refreshKey + 1 });
      })
      .catch((e) => {
        console.log(`Error: item #${data.id} status cannot be modified: ${e}`);
      });
  };
  const dbClickHandler = () => {
    const oldItems = state.items;
    deleteTodo(data.id)
      .then((res) => {
        dispatch({ type: "setRefreshKey", val: state.refreshKey + 1 });
      })
      .catch((e) => {
        console.log(`Error: items #${data.id} status cannot be deleted: ${e}`);
      });
  };
  return (
    <ItemContainer completed={completed} theme={state.theme}>
      <div onClick={clickHandler} onDoubleClick={dbClickHandler} id={data.id}>
        <div>{data.title}</div>
      </div>
    </ItemContainer>
  );
};
