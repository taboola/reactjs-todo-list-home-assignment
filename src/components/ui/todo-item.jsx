import React, { useContext } from "react";
import { deleteTodo } from "../../api";
import { ListContext } from "../../utils/context";

export const TodoItem = ({ data, index }) => {
  const status = data.completed ? "Completed" : "Incomplete";
  const { state, dispatch } = useContext(ListContext);
  const dbClickHandler = (e) => {
    deleteTodo(data.id)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "setRefreshKey", val: state.refreshKey + 1 });
        }
      })
      .catch();
    /* console.log(e);
    debugger; */
  };
  return (
    <div
      onDoubleClick={(e) => {
        dbClickHandler(e);
      }}
      id={data.id}
    >
      <div>{data.id}</div>
      <div>{data.title}</div>
      <div>{status}</div>
    </div>
  );
};
