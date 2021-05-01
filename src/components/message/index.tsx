import styled from "styled-components";

export const Message = styled.div<{ error?: boolean }>`
  height: 5px;
  font-size: 10px;
  color: ${(props: any) => (props.error ? "#b30c0c" : "#0052cc")};
  font-weight: 600;
`;
