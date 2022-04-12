import React from 'react';
import Todo from "./containers/Todo";
import Forms from './modal/forms';
import Categories from "./containers/Categories";
import CategoriesArchivesC from "./containers/CategoriesArchives";
import {useAppSelector} from "./hooks/hooks";

import './App.scss'
import 'material-icons/iconfont/material-icons.css';

const App: React.FC = () => {
    const {isOpenForm} = useAppSelector(state => state.todo)
    return (
        <div className="container">
            <Todo/>
            {
                isOpenForm && <Forms/>
            }
            <Categories/>
            <CategoriesArchivesC/>
        </div>
    );
}

export default App;
