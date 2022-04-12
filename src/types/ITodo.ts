export interface IEditTodo {
    id: number
    text: string,
    names: string,
    category: string
}

export interface ITodo {
    id: number
    names: string,
    text: string,
    category: string,
    created: string,
    archive: boolean,
    dates?: string[]
}

export interface ITodos {
    error: string
    todos: ITodo[]
    isLoading: boolean
    editTodo: ITodo | null,
    isOpenForm: boolean
    isEdit: boolean
}


export interface ICategory {
    key: string,
    value: string

}

export interface ICategories {
    categories: ICategory[]
}


