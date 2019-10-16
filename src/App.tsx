import React from 'react';
import {Normalize} from "styled-normalize";
import './App.css';
import styled from "styled-components";
import AddTodo from "./components/Todo/AddTodo";
import FooterFilters from "./components/Todo/FooterFilters";
import Todos from "./components/Todo/Todos";
import {GlobalStyles} from "./components/Global/GlobalStyles";
import GlobalState from "./components/Global/GlobalState";

const TodoApp = styled.section`
  background: #fff;
      margin: 130px 0 40px 0;
      position: relative;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                  0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const App = () => {
    return (
        <>
            <GlobalStyles/>
            <Normalize/>
            <TodoApp>
                <GlobalState>
                    <AddTodo/>
                    <Todos/>
                    <FooterFilters/>
                </GlobalState>
            </TodoApp>
        </>
    );
};

export default App;
