import React from "react";
import styled from "styled-components";
import {TodoInput} from "./TodoInput";
import {GlobalContext} from "../Global/GlobalState";
import {KEY_ENTER} from "./interfaces";
import API from "../Util/API";

const H1 = styled.h1`
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
`;


const NewTodo = styled(TodoInput)`
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;

const AddTodo = () => {

    const [todo, setTodo] = React.useState<string>("");
    const context = React.useContext(GlobalContext);

    const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(event.currentTarget.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== KEY_ENTER)
            return;

        event.preventDefault();

        if(todo) {
            context.actions.isLoading(true);
            API.post("todos", {name: todo, done: false}).then((response) => {
                context.actions.addTodo(response.data.name);
                setTodo(''); //clearing after
                context.actions.isLoading(false);
            });
        }
    };

    return (
        <header>
            <H1>todos</H1>
            <div>
                <NewTodo
                    value={todo}
                    autoFocus
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
            </div>

        </header>
    );
};

export default AddTodo;
