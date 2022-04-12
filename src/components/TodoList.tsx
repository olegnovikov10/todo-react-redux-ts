import React, {FC} from 'react';
import TodoItem from './TodoItem'
import {ITodo} from "../types/ITodo";
import {useDispatch} from "react-redux";

import {isOpenFormHandle} from '../store/reducers/TodoSlice'

interface ITodoProps {
    todos: ITodo[]
}

const TodoList: FC<ITodoProps> = ({todos}) => {
    const dispatch = useDispatch()
    return (
        <div>
            <div className="top-wrap">
                <div className="top">
                    <div className="top__name">Name</div>
                    <div className="top__name">Created</div>
                    <div className="top__name">Category</div>
                    <div className="top__name">Content</div>
                    <div className="top__name">Dates</div>
                    <div className="top__name">
                        <span className="material-icons">archive</span>
                        <span className="material-icons">delete</span>
                    </div>
                </div>
                <div className="content">
                    {todos?.filter(it=> !it.archive).map((item) => {
                        return (
                            <div className="content__item" key={item.id}>
                                <TodoItem id={item.id}
                                          archive={item.archive}
                                          category={item.category}
                                          names={item.names}
                                          text={item.text}
                                          created={item.created}
                                          dates={item.dates}
                                />
                            </div>)
                    })}
                </div>
                <div className="btn-wrapper">
                    <button onClick={() => dispatch(isOpenFormHandle())} id="isOpenFrom" type="button">Create Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;