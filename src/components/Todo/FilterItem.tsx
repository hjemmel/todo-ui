import React from "react";
import styled, {css} from "styled-components";
import {TodoState} from "../Global/interfaces";

const LiFilterItem = styled.li`
    display: inline;
`;

interface Selectable {
    selected: boolean;
}

const FilterItemLink = styled.a<Selectable>`
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;

    &:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }

    ${(props) => {
    return props.selected && css`
        border-color: rgba(175, 47, 47, 0.2);
      `
}}
  `;

interface Props extends Selectable {
    todoState: TodoState,
    handleSelect: (todoState: TodoState) => void,
    children: React.ReactNode
}

const FilterItem = (props: Props) => {

    const handleOnClick = () => {
        props.handleSelect(props.todoState);
    };

    return (
        <LiFilterItem>
            <FilterItemLink
                href="#/"
                onClick={handleOnClick}
                selected={props.selected}>
                {props.children}
            </FilterItemLink>
        </LiFilterItem>
    );
};

export default FilterItem;
