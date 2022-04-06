import styled from "styled-components";

export const ListHeader = styled.h1`
  padding-left: 5px;
`;
export const ListContainer = styled.div`
  background-color: ${(props) => props.listBgColor};
  color: ${(props) => props.color};
`;
export const ItemContainer = styled.div`
  background-color: ${(props) =>
    props.completed ? props.theme.completed : props.theme.incomplete};
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  width: 500px;
`;
export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
`;
