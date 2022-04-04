import React, { useContext, useState } from "react";
import { deleteTodo, updateTodo } from "../../api";
import { ListContext } from "../../utils/context";

export const TodoItem = ({ data }) => {
  const [status, setStatus] = useState(data.completed);
  const { state, dispatch } = useContext(ListContext);

  const clickHandler = (e) => {
    setStatus((prev) => !prev); // happy path (provide immediate feedback)
    updateTodo(data.id, "update")
      .then((res) => {
        dispatch({ type: "setRefreshKey", val: state.refreshKey + 1 });
      })
      .catch((e) => {
        console.log(`Error: item #${data.id} status cannot be modified: ${e}`);
        setStatus((prev) => !prev); // rollback
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
    <div onClick={clickHandler} onDoubleClick={dbClickHandler} id={data.id}>
      <div>{data.id}</div>
      <div>{data.title}</div>
      {status && <div>Completed</div>}
      {!status && <div>Incomplete</div>}
    </div>
  );
};
