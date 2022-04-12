import React from 'react';
import { useAppSelector} from "../hooks/hooks";
import TodoView from '../components/TodoList'


const Todo = () => {
    const {todos} = useAppSelector(state => state.todo)
    return (
        <div>
            <TodoView todos={todos}/>
        </div>
    );
};

export default Todo;