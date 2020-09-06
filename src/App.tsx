import React from "react";
import { Normalize } from "styled-normalize";
import "./App.css";
import styled from "styled-components";
import AddTodo from "./components/Todo/AddTodo";
import FooterFilters from "./components/Todo/FooterFilters";
import Todos from "./components/Todo/Todos";
import { GlobalStyles } from "./components/Global/GlobalStyles";
import GlobalState from "./components/Global/GlobalState";
import Main from "./components/Todo/Main";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Normalize />
      <GlobalState>
        <Main>
          <AddTodo />
          <Todos />
          <FooterFilters />
        </Main>
      </GlobalState>
    </>
  );
};

export default App;
