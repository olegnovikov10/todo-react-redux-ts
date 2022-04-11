import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {actionFormEnum, addTodo, isOpenFormHandle} from '../store/reducers/TodoSlice'
import {useAppSelector} from "../hooks/hooks"
import {CategoryEnum, ITodo} from "../types/ITodo";
import Select, {OnChangeValue} from 'react-select'


enum typesInput {
    name = 'name',
    content = 'content'
}

interface StringOption {
    label: string;
    value: string;
}


const options = Object.keys(CategoryEnum).map(key => ({

    label: key,
    // @ts-ignore
    value: CategoryEnum[key]
}));

const Forms: FC = () => {
    const {formAction, editTodo} = useAppSelector(state => state.todo)
    const [todoName, setTodoName] = useState<string>('')
    const [contentTodo, setContentTodo] = useState<string>('')
    const [currentCategory, setCurrentCategory] = useState<string>(options[0].value)
    const dispatch = useDispatch()


    useEffect(() => {
        setTodoName(todoName)
        setContentTodo(contentTodo)
    }, [editTodo])

    const handleChangeSelect = (newValue: OnChangeValue<any, any>) => {
        setContentTodo(newValue.value)
    }

    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name == typesInput.name) {
            setTodoName(e.target.value)
        }
        if (e.target.name == typesInput.content) {
            setContentTodo(e.target.value)
        }
    }

    const onClickForm = () => {
        dispatch(isOpenFormHandle(actionFormEnum.ADD))
        if (formAction == actionFormEnum.ADD) {
            const res: ITodo = {
                id: Date.now(),
                created: new Date().toLocaleString('en', {month: 'short', year: 'numeric', day: 'numeric'}),
                text: todoName,
                names: contentTodo,
                archive: true,
                category: CategoryEnum.quote,
                categoryText: 'fdsf'
            }
            //dispatch(addTodo(res))
        }


    }

    const getValue = () => {
        return currentCategory ? options.find(c => c.value === currentCategory) : ''
    }
    return <>
        <div className="form-wrapper ">
            <form action="" className="form-add-notes ">
                <div className="form-content">
                    <span className="material-icons links" id="close-form-span" onClick={() => {
                        onClickForm();
                    }}>close</span>
                    <div className="wrap-inputs">
                        <div>Categories</div>
                        <Select  value={getValue()} options={options}/>
                    </div>

                    <div className="wrap-inputs">
                        <div className="notes-name-wrapper">Name notes</div>
                        <input name={typesInput.name} className="notes-name" onChange={(e) => {
                            onChangeHandle(e)
                        }} value={todoName} type="text"/>
                    </div>
                    <div className="wrap-inputs">
                        <div>Notes content</div>
                        <textarea rows={5} name={typesInput.content} value={contentTodo} onChange={(e) => {
                            onChangeHandle(e)
                        }} className="notes-title">s</textarea>
                    </div>
                    <div className="wrap-inputs">
                        <input className="sendForm" type="button" value="Send"/>
                        <input onClick={() => {
                        }} id="closeForm" type="reset" value="cansel"/>
                    </div>
                </div>
            </form>
        </div>
    </>
}

export default Forms;