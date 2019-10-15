import React from "react"
import styled from "styled-components";
import TodoItem from "./TodoItem";


const Section = styled.section`
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
`;

const ToogleTodos = styled.input`

    text-align: center;
    border: none; /* Mobile Safari */
    opacity: 0;
    position: absolute;
    
    & + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: -52px;
        left: -13px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    
    & + label:before {
        content: "❯";
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }
    
    &:checked + label:before {
      color: #737373;
    }
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const Todos = () => {
    return (
        <Section>
            <ToogleTodos type="checkbox"/>
            <List>
                <TodoItem name="First Todo" done={true}/>
                <TodoItem name="Second Todo" done={false}/>
            </List>
        </Section>
    );
};

export default Todos;
