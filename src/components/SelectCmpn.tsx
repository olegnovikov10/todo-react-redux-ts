import React, {FC, useEffect, useState} from 'react';
import Select, {OnChangeValue} from 'react-select'
import {CategoriesStub} from "../store/reducers/TodoSlice";


interface IOption {
    label: string;
    value: string;
}

interface IProps {
    setCategory: (value: string) => void;
    currentCategory: string

}

const options: IOption[] = CategoriesStub.AllCategories.categories.map(cat => ({
    label: cat.key,
    value: cat.value
}))

const SelectCmpn: FC<IProps> = ({currentCategory, setCategory}) => {

    useEffect(() => {
        setCategory(options[0].label)
    }, [])

    const handleChangeSelect = (newValue: OnChangeValue<IOption | any, boolean>) => {
        setCategory((newValue as IOption).label)
    }

    const getValue = () => {

        return currentCategory ? options.find(c => c.label === currentCategory) : ''
    }
    return (
        <Select onChange={handleChangeSelect} value={getValue()} options={options}/>
    );
};

export default SelectCmpn