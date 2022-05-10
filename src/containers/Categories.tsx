import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/hooks";
import CategoriesCount from "../components/CategoriesCount";

enum TypeCountEnum {
    isArchiveCount,
}

const Categories = () => {
    const {todos} = useAppSelector(state => state.todo)
    const [todoGroup, setTodoGroup] = useState<object>({})
    useEffect(() => {
        const groupByCategory = todos.reduce((group, item) => {
            const {category} = item;
            group[category] = group[category] ?? [];
            group[category].push(item);
            return group;
        }, {});
        setTodoGroup(groupByCategory)

    }, [todos])

    const countCategory = (cat: string, typeCount?: TypeCountEnum): number => {
        if (typeCount == TypeCountEnum.isArchiveCount) {
            return todoGroup[cat]?.filter(item => !item.archive).length ?? 0
        }

        return todoGroup[cat]?.filter(item => item.archive).length ?? 0
    }

    return (
        <div>
            <div className="category">
                <div className="category__top">
                    <div className="category__name">Note category</div>
                    <div className="category__name">Active</div>
                    <div className="category__name">Archived</div>
                </div>
                <div className="category__content">
                    {
                        Object.keys(todoGroup).map((item, i) => {
                            return (
                                <CategoriesCount key={i} category={item}
                                                 active={countCategory(item, TypeCountEnum.isArchiveCount)}
                                                 archive={countCategory(item)}
                                />

                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;