import React, {useContext} from 'react';
import styled from "styled-components";
import {GlobalContext} from "../Global/GlobalState";

interface Disabled {
    disable: boolean;
}

const TodoApp = styled.section<Disabled>`
  background: #fff;
  opacity: ${(props: Disabled) => props.disable ? "0.25" : "1"};
  pointer-events: ${(props: Disabled) => props.disable ? "none" : "all"};;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

interface Props {
    children: React.ReactNode;
}

const Main = ({children}: Props) => {
    const context = useContext(GlobalContext);

    return (
        <TodoApp disable={context.state.loading}>
            {children}
        </TodoApp>
    );
};

export default Main;
