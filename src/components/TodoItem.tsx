import React, {FC} from 'react';
import {ITodo} from "../types/ITodo";
import {useAppDispatch} from "../hooks/hooks";
import {deleteTodo, editTodoItem, archiveToggleTodo} from '../store/reducers/TodoSlice'

const TodoItem: FC<ITodo> = ({id, created, category, archive, names, text, dates}) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <div className='content__name'>{names}</div>
            <div className='content__name'>{created}</div>
            <div className='content__name'>{category}</div>
            <div className='content__name'>{text}</div>
            <div className='content__name'>{dates?.map(item => item + ' ')} </div>
            <div className="content__name">
                <span onClick={() => {
                    dispatch(editTodoItem(id))
                }} className="material-icons links">edit</span>
                <span onClick={() => {
                    dispatch(archiveToggleTodo(id))
                }} className="material-icons links">archive</span>
                <span onClick={() => {
                    dispatch(deleteTodo(id))
                }} className="material-icons links">delete</span>
            </div>
        </>
    );
};

export default TodoItem;