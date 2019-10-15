import styled from "styled-components";

const Input = styled.input`
  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;

export const TodoInput = styled(Input)`
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;
