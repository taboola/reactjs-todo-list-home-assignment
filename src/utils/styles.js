import styled from "styled-components";
export const ListContainer = styled.div`
  // TODO
`;
export const ItemContainer = styled.div`
  background-color: ${(props) => props.bgColor};
  display: flex;
  width: 500px;
`;
export const ItemCell = styled.div`
  color: ${(props) => props.color};
  min-width: ${(props) => props.minWidth}px;
  padding-bottom: 5px;
  padding-right: ${(props) => props.paddingRight}px;
  padding-top: 5px;
`;
