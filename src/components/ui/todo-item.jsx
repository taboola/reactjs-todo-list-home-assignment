import React from "react";
import { ItemCell, ItemContainer } from "../../utils/styles";

export const TodoItem = ({ data, index }) => {
  const status = data.completed ? "Completed" : "Incomplete";
  const bgColor = index % 2 === 0 ? "#e6e6e6" : "white";
  const color = data.completed ? "green" : "red";
  return (
    <ItemContainer bgColor={bgColor}>
      <ItemCell minWidth={30} paddingRight={20}>
        {data.id}
      </ItemCell>
      <ItemCell minWidth={500} paddingRight={20}>
        {data.title}
      </ItemCell>
      <ItemCell color={color}>{status}</ItemCell>
    </ItemContainer>
  );
};
