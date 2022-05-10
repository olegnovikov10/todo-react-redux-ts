import {createSlice, PayloadAction, current} from "@reduxjs/toolkit";
import {ICategory, ICategories, ITodo, IEditTodo, ITodos} from '../../types/ITodo'


export class CategoriesStub {
    static task: ICategory = {key: 'Task', value: 'task'}
    static random: ICategory = {key: 'Random Thought', value: 'random'}
    static idea: ICategory = {key: 'Idea', value: 'idea'}
    static quote: ICategory = {key: 'Quote', value: 'quote'}
    static AllCategories: ICategories = {categories: [CategoriesStub.task, CategoriesStub.random, CategoriesStub.idea, CategoriesStub.quote]}
}


const initialState: ITodos = {
    todos: [{
        id: 1,
        created: new Date().toDateString(),
        archive: false,
        category: CategoriesStub.task.key,
        names: 'Name',
        text: 'Text'
    }, {
        id: 2,
        created: new Date().toDateString(),
        archive: false,
        category: CategoriesStub.task.key,
        names: 'Name',
        text: 'Text'
    },{
        id: 3,
        created: new Date().toDateString(),
        archive: false,
        category: CategoriesStub.quote.key,
        names: 'Name',
        text: 'Text'
    }],
    isLoading: false,
    error: '',
    editTodo: null,
    isEdit: false,
    isOpenForm: false,
}

export const todoSlice = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {

        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload)
            state.isOpenForm = !state.isOpenForm
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        archiveToggleTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.map(todo => {
                if (todo.id == action.payload) {
                    todo.archive = !todo.archive
                    return todo
                }
                return todo
            })
        },
        editTodoItem: (state, action: PayloadAction<number>) => {
            const res = state.todos.filter(todo => todo.id === action.payload)
            state.editTodo = res[0]
            state.isOpenForm = !state.isOpenForm
            state.isEdit = true
        },
        editTodoAction: (state, action: PayloadAction<IEditTodo>) => {
            state.todos = state.todos.map(item => {
                if (item.id == action.payload.id) {
                    item = {...item, ...action.payload}
                    return item
                }
                return item
            })
            state.editTodo = null
            state.isEdit = false
            state.isOpenForm = !state.isOpenForm

        },
        isOpenFormHandle: state => {
            if (state.isEdit) {
                state.isEdit = !state.isEdit
                state.editTodo = null
            }
            state.isOpenForm = !state.isOpenForm
        },
    }
})


export const {editTodoItem, editTodoAction, deleteTodo, archiveToggleTodo, addTodo, isOpenFormHandle} = todoSlice.actions