import React from "react"
import styled, {css} from "styled-components";
import {GlobalContext} from "../Global/GlobalState";

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

const FilterItem = styled.li`
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

const FooterFilters = () => {
    const context = React.useContext(GlobalContext);

    const plural = (count:number, word: string):string => {
        return (count > 1) ? `${word}s` : word;
    };

    return (
        <Footer>
            <TodoCount>
                <TodoCountNumber>{context.state.todos.length}</TodoCountNumber> {plural(context.state.todos.length, "todo")} left
            </TodoCount>
            <Filters>
                <FilterItem>
                    <FilterItemLink
                        href="#/"
                        selected={true}>
                        All
                    </FilterItemLink>
                </FilterItem>
                {' '}
                <FilterItem>
                    <FilterItemLink
                        href="#/active"
                        selected={false}>
                        Active
                    </FilterItemLink>
                </FilterItem>
                {' '}
                <FilterItem>
                    <FilterItemLink
                        href="#/completed"
                        selected={false}>
                        Completed
                    </FilterItemLink>
                </FilterItem>
            </Filters>
        </Footer>
    );
};

export default FooterFilters;
