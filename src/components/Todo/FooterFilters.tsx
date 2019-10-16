import React from "react"
import styled from "styled-components";
import {GlobalContext} from "../Global/GlobalState";
import {TodoState} from "../Global/interfaces";
import FilterItem from "./FilterItem";

const Footer = styled.footer`
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;

    &:before {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      overflow: hidden;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                  0 8px 0 -3px #f6f6f6,
                  0 9px 1px -3px rgba(0, 0, 0, 0.2),
                  0 16px 0 -6px #f6f6f6,
                  0 17px 2px -6px rgba(0, 0, 0, 0.2); 
    }
`;

const TodoCount = styled.span`
    float: left;
    text-align: left;
`;

const TodoCountNumber = styled.strong`
    font-weight: 300;
`;

const Filters = styled.ul`
    margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
    left: 0;

    @media (max-width: 430px) {
      bottom: 10px;
    }
`;

const FooterFilters = () => {
    const context = React.useContext(GlobalContext);

    const plural = (count: number, word: string): string => {
        return (count > 1) ? `${word}s` : word;
    };

    const handleSelect = (todoState: TodoState) => {
        context.actions.filterTodos(todoState);
    };

    if(context.state.todos.length > 0) {
        return (
            <Footer>
                <TodoCount>
                    <TodoCountNumber>{context.state.filteredTodos.length}</TodoCountNumber> {plural(context.state.todos.length, "todo")}
                </TodoCount>
                <Filters>
                    <FilterItem
                        todoState="ALL"
                        selected={context.state.todoState === "ALL"}
                        handleSelect={handleSelect}
                    >
                        All
                    </FilterItem>
                    <FilterItem
                        todoState="ACTIVE"
                        selected={context.state.todoState === "ACTIVE"}
                        handleSelect={handleSelect}
                    >
                        Active
                    </FilterItem>
                    <FilterItem
                        todoState="COMPLETED"
                        selected={context.state.todoState === "COMPLETED"}
                        handleSelect={handleSelect}
                    >
                        Completed
                    </FilterItem>
                </Filters>
            </Footer>
        );
    } else {return null}
};

export default FooterFilters;
