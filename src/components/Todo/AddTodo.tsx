import React from "react";
import styled from "styled-components";
import {TodoInput} from "./TodoInput";

const H1 = styled.h1`
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
`;


const NewTodo = styled(TodoInput)`
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;

const AddTodo = () => {
    return (
        <header className="header">
            <H1>todos</H1>
            <NewTodo
                autoFocus
                className="new-todo"
                placeholder="What needs to be done?"
            />
        </header>
    );
};

export default AddTodo;
