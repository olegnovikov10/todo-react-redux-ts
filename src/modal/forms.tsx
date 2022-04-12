import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addTodo, isOpenFormHandle, editTodoAction} from '../store/reducers/TodoSlice'
import {useAppSelector} from "../hooks/hooks"
import {ITodo} from "../types/ITodo";
import SelectCmpn from "../components/SelectCmpn";


enum typesInput {
    name = 'name',
    content = 'content'
}

const Forms: FC = () => {
    const regDate = '^([0-9]||[0-2][0-9]||3[0-1])/([0-9]||0[0-9]||1[0-1])/([0-9][0-9])?[0-9][0-9]$'
    const {isEdit, editTodo} = useAppSelector(state => state.todo)
    const [todoName, setTodoName] = useState<string>('')
    const [contentTodo, setContentTodo] = useState<string>('')
    const [currentCategory, setCurrentCategory] = useState<string>('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (editTodo) {
            setTodoName(editTodo.names)
            setContentTodo(editTodo.text)
            setCurrentCategory(editTodo.category)
        }

    }, [editTodo])

    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name == typesInput.name) {
            setTodoName(e.target.value)
        }
        if (e.target.name == typesInput.content) {
            setContentTodo(e.target.value)
        }
    }
    const closeForm = () => {
        setTodoName('editTodo.names')
        setContentTodo('')
        setCurrentCategory('')
        dispatch(isOpenFormHandle())
    }

    const parseDate = (): string[] => {
        let datesArr: string[] = []
        let reg = /[\r\n]+/g;

        let titleSplit = contentTodo.replace(reg, " ").split(' ')

        titleSplit.forEach((item) => {
            if (item.match(regDate)) {
                datesArr.push(item)
            }
        })

        if (datesArr.length > 0) {
            return [...datesArr]
        } else {
            return []
        }
    }

    const onClickForm = (e) => {
        if (contentTodo.length < 1) {
            return false
        }

        if (!isEdit) {
            const res: ITodo = {
                id: Date.now(),
                created: new Date().toLocaleString('en', {month: 'short', year: 'numeric', day: 'numeric'}),
                names: todoName,
                text: contentTodo,
                archive: false,
                category: currentCategory,
                dates: parseDate()
            }
            dispatch(addTodo(res))

        }

        if (isEdit) {
            if (editTodo) {
                const result: ITodo = {
                    ...editTodo,
                    dates: parseDate(),
                    text: contentTodo,
                    names: todoName,
                    category: currentCategory,
                }
                dispatch(editTodoAction(result))
            }
        }
    }


    return <>
        <div className="form-wrapper ">
            <form action="" className="form-add-notes ">
                <div className="form-content">
                    <span className="material-icons links" id="close-form-span" onClick={closeForm}>close</span>
                    <div className="wrap-inputs">
                        <div>Categories</div>
                        <SelectCmpn currentCategory={currentCategory} setCategory={setCurrentCategory}/>
                    </div>

                    <div className="wrap-inputs">
                        <div className="notes-name-wrapper">Name notes</div>
                        <input required minLength={3} name={typesInput.name} className="notes-name" onChange={(e) => {
                            onChangeHandle(e)
                        }} value={todoName} type="text"/>
                    </div>
                    <div className="wrap-inputs">
                        <div>Notes content</div>
                        <textarea minLength={3} required rows={5} name={typesInput.content} value={contentTodo} onChange={(e) => {
                            onChangeHandle(e)
                        }} className="notes-title">s</textarea>
                    </div>
                    <div className="wrap-inputs">
                        <input onClick={onClickForm} className="sendForm" type="submit" value="Send"/>
                        <input onClick={closeForm} id="closeForm" type="reset" value="cansel"/>
                    </div>
                </div>
            </form>
        </div>
    </>
}

export default Forms;