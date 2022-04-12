import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import CategoriesArchives from "../components/CategoriesArchives";
import {archiveToggleTodo} from "../store/reducers/TodoSlice"

const CategoriesArchivesC = () => {
    const {todos} = useAppSelector(state => state.todo)
    const dispatch = useAppDispatch()
    const unArchive = (id: number) => {
        dispatch(archiveToggleTodo(id))
    }
    return (
        <div className="category category-archive">
            <div className="category__top">
                <div className="category__name">Name</div>
                <div className="category__name">Categories</div>
                <div className="category__name">Content</div>
                <div className="category__name">Unarchive</div>
            </div>
            <div className="category__content" id="notes-archive">
                {todos.filter(todo => todo.archive).map((item,i) => {
                    return <CategoriesArchives key={i} names={item.names} category={item.category}
                                               content={item.text}
                                               id={item.id} unArchive={unArchive}/>
                })}
            </div>
        </div>
    );
};

export default CategoriesArchivesC;