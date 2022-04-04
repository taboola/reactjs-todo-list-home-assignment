import React, { useContext, useState } from "react";
import { deleteTodo, updateTodo } from "../../api";
import { ItemContainer } from "../../utils/styles";
import { ListContext } from "../../utils/context";

export const TodoItem = ({ data }) => {
  const { state, dispatch } = useContext(ListContext);

  // since the server is stateless, I must use a local state to re-render the item color onClick
  const [completed, setCompleted] = useState(data.completed);

  const clickHandler = (e) => {
    const oldState = completed;
    setCompleted((prev) => !prev);
    updateTodo(data.id, "update")
      .then((res) => {
        //if the server returned an updated list, I'd refresh the list at this point to re-render the fetched items with the updated item state
        // dispatch({ type: "setRefreshKey", val: state.refreshKey + 1 });
      })
      .catch((e) => {
        console.log(`Error: item #${data.id} status cannot be modified: ${e}`);
        setCompleted(oldState);
      });
  };
  const dbClickHandler = () => {
    const oldItems = state.items;
    deleteTodo(data.id)
      .then((res) => {
        //if the server returned an updated list, I'd refresh the list at this point to re-render the fetched items without the deleted item
        // dispatch({ type: "setRefreshKey", val: state.refreshKey + 1 });

        // instead (since I can't fetch an updated list), I'll manually update the items state
        const newItems = state.items.filter((item) => item.id !== data.id);
        dispatch({ type: "setItems", val: newItems });
      })
      .catch((e) => {
        console.log(`Error: items #${data.id} status cannot be deleted: ${e}`);
        dispatch({ type: "setItems", val: oldItems }); //roleback in case of a failure
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
