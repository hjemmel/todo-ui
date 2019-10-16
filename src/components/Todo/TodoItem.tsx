import React, {useEffect} from "react"
import styled, {css} from "styled-components";
import {ITodo, KEY_ENTER, KEY_ESCAPE} from "./interfaces";
import {TodoInput} from "./TodoInput";
import {GlobalContext} from "../Global/GlobalState";
import API from "../Util/API";

interface DoneLabel {
    done: boolean;
}

const Label = styled.label<DoneLabel>`
    word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
	
	${({done}) =>
    done && `& {
            color: #d9d9d9;
            text-decoration: line-through;
        }
     `
};

`;

export const
    InputCheckbox = styled.input`
    cursor: pointer;
    text-align: center;
    width: 40px;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    opacity: 0;
    
    &:checked + ${Label}{
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
    }
    
    & + ${Label} { {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center left;
    }
`;


interface Editing {
    editing: boolean
}

const Item = styled.li<Editing>`
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    
    &:last-child {
      border-bottom: none;
    }
    
    ${(props) => {
    return props.editing && css`
        border-bottom: none;
        padding: 0;

        &:last-child {
          margin-bottom: -1px;
        }
      `
}}

`;

var RemoveButton = styled.button`
    display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
    transition: color 0.2s ease-out;
    cursor: pointer;

    &:hover {
      color: #af5b5e;
    }

    &:after {
      content: '×';
    }
  
    ${Item}:hover & {
      display: block;
    }
 `;

const EditTodo = styled(TodoInput)`
    display: block;
    width: 506px;
    padding: 12px 16px;
    margin: 0 0 0 43px;
`;

interface Props {
    todo: ITodo;
}

const TodoItem = (props: Props) => {
    const [editing, setEditing] = React.useState(false);
    const context = React.useContext(GlobalContext);
    const [text, setText] = React.useState('');

    const handleDoubleClick = () => {
        setEditing(true);
    };

    const updateName = (text: string) => {
        updateTodo({...props.todo, name: text.trim()});
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === KEY_ESCAPE) {
            setEditing(false);
        } else if (event.key === KEY_ENTER) {
            updateName(text);
            setEditing(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value;
        if (editing) {
            setText(name);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const name = event.currentTarget.value.trim();
        if (name && name !== props.todo.name) {
            setText(name);
        } else {
            setEditing(false);
        }
    };

    const handleClick = () => {
        context.actions.isLoading(true);
        API.delete(`todos/${props.todo.id}`).then((response) => {
            context.actions.addAll(response.data);
        });
    };

    const handleDone = () => {
        updateTodo({...props.todo, done: !props.todo.done});
    };

    const updateTodo = (todo: ITodo) => {
        context.actions.isLoading(true);
        API.put(`todos/${todo.id}`, todo).then((response) => {
            context.actions.updateTodo(response.data);
        });

    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.currentTarget.select();
    };

    useEffect(()=>{
        setText(props.todo.name);
    }, [props.todo.name] );

    return (
        <Item editing={editing}>
            <div>
                {editing ?
                    (<EditTodo
                        autoFocus
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={text}
                        onKeyDown={handleKeyDown}
                    />) :
                    (
                        <>
                            <InputCheckbox type="checkbox"
                                           onChange={handleDone}
                                           checked={props.todo.done}/>
                            <Label done={props.todo.done} onDoubleClick={handleDoubleClick}>{props.todo.name}</Label>
                            <RemoveButton onClick={handleClick}/>
                        </>
                    )}

            </div>
        </Item>
    );
};

export default TodoItem;
